// pages/project/index.tsx
import { useCallback, useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { SearchBar } from '../../components/search-bar'
import { TabBar } from '../../components/tab-bar'
import { ServiceCard } from '../../components/service-card'
import { FAQSection } from '../../components/faq-section'
import { projectApi } from '../../services/project/api'
import { handleError } from '../../utils/error'
import type { ServiceItem, FAQ, ServiceType } from '../../types'
import './index.scss'

const TABS = [
  { title: '全部', value: 'all' },
  { title: '家庭防水', value: 'home' },
  { title: '室外防水', value: 'outdoor' },
  { title: '工业防水', value: 'industrial' }
]

export default function ProjectPage() {
  // 页面状态
  const [services, setServices] = useState<ServiceItem[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(false)
  
  // UI状态
  const [currentTab, setCurrentTab] = useState<ServiceType>('all')
  const [searchValue, setSearchValue] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  // 防抖定时器
  const searchTimer = useRef<NodeJS.Timeout>()

  // 加载服务列表
  const loadServices = useCallback(async () => {
    try {
      setLoading(true)
      const keyword = searchValue.trim()
      
      const response = await (keyword 
        ? projectApi.searchServices(keyword, currentTab)
        : projectApi.getServicesByType(currentTab)
      )

      setServices(response.data)
    } catch (err) {
      Taro.showToast({
        title: handleError(err),
        icon: 'none'
      })
      setServices([])
    } finally {
      setLoading(false)
    }
  }, [currentTab, searchValue])

  // 加载FAQ
  const loadFaqs = useCallback(async () => {
    try {
      const response = await projectApi.getFaqs()
      setFaqs(response.data)
    } catch (err) {
      console.error('加载FAQ失败:', err)
    }
  }, [])

  // 搜索变化处理
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
    
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    searchTimer.current = setTimeout(() => {
      loadServices()
    }, 300)
  }, [loadServices])

  // 搜索按钮点击
  const handleSearch = useCallback(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }
    loadServices()
  }, [loadServices])

  // Tab切换处理
  const handleTabChange = useCallback((value: string | number) => {
    setCurrentTab(value as ServiceType)
    setSearchValue('') // 清空搜索内容
    setExpandedId(null) // 重置展开状态
    
    // 切换分类立即加载
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }
    loadServices()
  }, [loadServices])

  // 展开/收起处理
  const handleToggle = useCallback((id: number) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  // 预约处理
  const handleBook = useCallback(async (service: ServiceItem) => {
    try {
      await Taro.setStorage({
        key: 'selected_service',
        data: service
      })
      await Taro.navigateTo({
        url: '/pages/contact/index'
      })
    } catch {
      Taro.showToast({
        title: '预约失败，请重试',
        icon: 'none'
      })
    }
  }, [])

  // 初始化加载
  useEffect(() => {
    loadServices()
    loadFaqs()
  }, [loadServices, loadFaqs])

  // 处理返回刷新
  useDidShow(() => {
    loadServices()
  })

  // 清理定时器
  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
    }
  }, [])

  return (
    <View className='project'>
      <View className='project__header'>
        <SearchBar
          value={searchValue}
          placeholder={`搜索${currentTab === 'all' ? '' : TABS.find(tab => tab.value === currentTab)?.title}服务`}
          loading={loading}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          onClear={() => handleSearchChange('')}
        />
        <TabBar
          tabs={TABS}
          activeTab={currentTab}
          onChange={handleTabChange}
        />
      </View>

      <View className='project__content'>
        <View className='project__services'>
          {loading ? (
            <View className='project__skeleton'>
              {Array(3).fill(null).map((_, index) => (
                <ServiceCard key={index} loading />
              ))}
            </View>
          ) : services.length ? (
            <View className='project__list'>
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  expanded={expandedId === service.id}
                  onToggle={handleToggle}
                  onBook={handleBook}
                />
              ))}
            </View>
          ) : (
            <View className='project__empty'>
              {searchValue ? '未找到相关服务' : '暂无服务内容'}
            </View>
          )}
        </View>

        {faqs.length > 0 && (
          <View className='project__faq'>
            <FAQSection faqs={faqs} />
          </View>
        )}
      </View>
    </View>
  )
}