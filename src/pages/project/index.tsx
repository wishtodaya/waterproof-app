// pages/project/index.tsx
import { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { SearchSection } from '../../components/search-section'
import { CategoryTabs } from '../../components/category-tabs'
import { ServiceCard } from '../../components/service-card'
import { FAQSection } from '../../components/faq-section'
import { BookingModal } from '../../components/booking-modal'
import { projectApi } from '../../services/project-api'
import { handleError } from '../../utils/error'
import type { ServiceItem, ServiceCategory, FAQ } from '../../types'
import './index.scss'

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { title: '全部', value: 'all' },
  { title: '家庭防水', value: 'home' },
  { title: '室外防水', value: 'outdoor' },
  { title: '工业防水', value: 'industrial' }
]

export default function Project() {
  // 基础状态
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 数据状态
  const [services, setServices] = useState<ServiceItem[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  
  // UI 状态
  const [searchText, setSearchText] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  // Refs
  const searchTimer = useRef<NodeJS.Timeout>()
  const mounted = useRef(false)

  // 数据加载
  const loadData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true)
      }
      setError(null)

      const type = SERVICE_CATEGORIES[currentTab].value
      const [servicesData, faqsData] = await Promise.all([
        searchText 
          ? projectApi.searchServices(searchText)
          : projectApi.getServicesByType(type),
        projectApi.getFaqs()
      ])

      if (mounted.current) {
        setServices(servicesData.data)
        setFaqs(faqsData.data)
      }
    } catch (err) {
      console.error('加载数据失败:', err)
      if (mounted.current) {
        setError(handleError(err))
      }
    } finally {
      if (mounted.current) {
        setLoading(false)
        setSearching(false)
      }
    }
  }, [currentTab, searchText])

  // 搜索处理
  const handleSearch = useCallback((value: string) => {
    setSearchText(value)
    setSearching(true)
    setExpandedService(null)

    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    if (!value.trim()) {
      setSearching(false)
      loadData(false)
      return
    }

    searchTimer.current = setTimeout(() => {
      loadData(false)
    }, 500)
  }, [loadData])

  // 分类切换
  const handleTabChange = useCallback((index: number) => {
    if (index === currentTab) return
    
    setCurrentTab(index)
    setExpandedService(null)
    // 如果有搜索内容，清空搜索
    if (searchText) {
      setSearchText('')
    }
    setLoading(true)
    
    loadData()
  }, [currentTab, searchText, loadData])

  // 服务展开/收起
  const handleServiceExpand = useCallback((serviceId: number) => {
    if (loading || searching) return
    
    setExpandedService(prev => prev === serviceId ? null : serviceId)
  }, [loading, searching])

  // 预约处理
  const handleBooking = useCallback((service: ServiceItem) => {
    try {
      setSelectedService(service)
      setShowBookingModal(true)
    } catch (error) {
      console.error('预约失败:', error)
      Taro.showToast({
        title: '预约失败，请重试',
        icon: 'none'
      })
    }
  }, [])

  // 生命周期
  useEffect(() => {
    mounted.current = true
    loadData()
    
    return () => {
      mounted.current = false
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
    }
  }, [loadData])

  useDidShow(() => {
    if (!loading && !searching) {
      loadData(false)
    }
  })

  return (
    <View className='project'>
      {/* 搜索区域 */}
      <SearchSection
        value={searchText}
        onChange={handleSearch}
        loading={searching}
      />

      {/* 分类标签 */}
      <CategoryTabs
        categories={SERVICE_CATEGORIES}
        current={currentTab}
        onChange={handleTabChange}
      />

      <View className='main-content'>
        {/* 加载状态 */}
        {loading && (
          <View className='skeleton-list'>
            {Array(3).fill(null).map((_, index) => (
              <View key={index} className='skeleton-item'>
                <View className='skeleton-header' />
                <View className='skeleton-content'>
                  <View className='skeleton-line' />
                  <View className='skeleton-line' />
                  <View className='skeleton-line short' />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* 错误状态 */}
        {!loading && error && (
          <View className='error-state'>
            <View className='error-message'>
              <Text>{error}</Text>
            </View>
            <View className='retry-btn' onClick={() => loadData()}>
              <Text>重试</Text>
            </View>
          </View>
        )}

        {/* 空状态 */}
        {!loading && !error && services.length === 0 && (
          <View className='empty-state'>
            <Text className='empty-text'>没有找到相关服务</Text>
          </View>
        )}

        {/* 服务列表 */}
        {!loading && !error && services.length > 0 && (
          <View className='service-list'>
            {services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                expanded={expandedService === service.id}
                onToggle={handleServiceExpand}
                onBook={handleBooking}
              />
            ))}
          </View>
        )}

        {/* FAQ部分 */}
        {!loading && !error && <FAQSection faqs={faqs} />}
      </View>

      {/* 预约弹窗 */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false)
          setSelectedService(null)
        }}
      />
    </View>
  )
}