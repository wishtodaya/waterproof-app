// pages/project/index.tsx
import {Text, View } from '@tarojs/components'
import Taro, { useDidShow, useLoad, usePullDownRefresh } from '@tarojs/taro'
import { SearchBar } from '../../components/search-bar'
import { ServiceCard } from '../../components/service-card'
import { FAQSection } from '../../components/faq-section'
import { projectApi } from '../../services/project-api'
import { handleError } from '../../utils/error'
import type { ServiceItem, FAQ, ServiceType } from '../../types'
import { useState, useCallback, useRef, useEffect } from 'react'
import './index.scss'

const TAB_LIST = [
  { title: '全部', value: 'all' },
  { title: '家庭防水', value: 'home' },
  { title: '室外防水', value: 'outdoor' },
  { title: '工业防水', value: 'industrial' }
] as const

interface State {
  loading: boolean
  services: ServiceItem[]
  faqs: FAQ[]
  searchValue: string
  currentTab: number
  expandedService: number | null
  error: string | null
  initialized: boolean
}

const initialState: State = {
  loading: false,
  services: [],
  faqs: [],
  searchValue: '',
  currentTab: 0,
  expandedService: null,
  error: null,
  initialized: false
}

export default function ProjectPage() {
  const [state, setState] = useState<State>(initialState)
  const mounted = useRef(false)
  const searchTimer = useRef<NodeJS.Timeout>()
  const requestCount = useRef(0)

  // 状态更新函数
  const updateState = useCallback((updates: Partial<State>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  // 加载服务数据
  const loadServices = useCallback(async (showLoading = true) => {
    const currentRequest = ++requestCount.current
    
    try {
      if (showLoading) {
        updateState({ loading: true, error: null })
      }

      const type = TAB_LIST[state.currentTab].value as ServiceType
      const response = await projectApi.searchServices(
        state.searchValue,
        type
      )

      // 确保是最新请求
      if (currentRequest === requestCount.current && mounted.current) {
        updateState({ services: response.data })
      }
    } catch (err) {
      console.error('加载服务失败:', err)
      if (currentRequest === requestCount.current && mounted.current) {
        const errorMsg = handleError(err)
        updateState({ error: errorMsg })
        Taro.showToast({ title: errorMsg, icon: 'none' })
      }
    } finally {
      if (currentRequest === requestCount.current && mounted.current) {
        updateState({ loading: false })
      }
    }
  }, [state.currentTab, state.searchValue])

  // 加载FAQ数据
  const loadFaqs = useCallback(async () => {
    try {
      const response = await projectApi.getFaqs()
      if (mounted.current) {
        updateState({ faqs: response.data })
      }
    } catch (err) {
      console.error('加载FAQ失败:', err)
    }
  }, [])

  // 初始化加载
  const initializeData = useCallback(async () => {
    if (!state.initialized) {
      await Promise.all([loadServices(), loadFaqs()])
      updateState({ initialized: true })
    }
  }, [state.initialized, loadServices, loadFaqs])

  // 搜索处理
  const handleSearch = useCallback((value: string) => {
    updateState({ searchValue: value })

    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    searchTimer.current = setTimeout(() => {
      loadServices()
    }, 500)
  }, [loadServices])

  // Tab切换处理
  const handleTabChange = useCallback((index: number) => {
    if (state.currentTab !== index) {
      updateState({
        currentTab: index,
        expandedService: null // 只重置展开状态
      })
      loadServices()
    }
  }, [state.currentTab, loadServices])

  // 服务展开处理
  const handleServiceToggle = useCallback((id: number) => {
    updateState({
      expandedService: state.expandedService === id ? null : id
    })
  }, [state.expandedService])

  // 预约处理
  const handleBooking = useCallback((service: ServiceItem) => {
    Taro.switchTab({
      url: '/pages/contact/index',
      success: () => {
        Taro.setStorage({
          key: 'selected_service',
          data: {
            id: service.id,
            title: service.title,
            price: service.price,
            unit: service.unit
          }
        })
      }
    })
  }, [])

  // 生命周期
  useLoad(() => {
    mounted.current = true
    initializeData()
  })

  useDidShow(() => {
    if (state.initialized && !state.loading) {
      loadServices(false)
    }
  })

  // 下拉刷新
  usePullDownRefresh(() => {
    Promise.all([loadServices(false), loadFaqs()]).finally(() => {
      Taro.stopPullDownRefresh()
    })
  })

  // 清理副作用
  useEffect(() => {
    return () => {
      mounted.current = false
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
    }
  }, [])

  return (
    <View className='project'>
      <View className='header'>
        <SearchBar
          value={state.searchValue}
          onChange={handleSearch}
          onSearch={handleSearch}
          loading={state.loading}
          placeholder='搜索服务项目'
        />

        <View className='tabs'>
          {TAB_LIST.map((tab, index) => (
            <View
              key={tab.value}
              className={`tab-item ${state.currentTab === index ? 'active' : ''}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.title}
            </View>
          ))}
        </View>
      </View>

      <View className='content'>
        {/* 加载状态 */}
        {state.loading && (
        <View className='loading-state'>
          {Array(3).fill(null).map((_, index) => (
            <ServiceCard 
              key={`skeleton-${index}`}
              loading 
              className='skeleton-card'
            />
          ))}
        </View>
      )}

        {/* 错误状态 */}
        {!state.loading && !state.error && state.services.length > 0 && (
      <View className='service-list'>
        {state.services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            expanded={state.expandedService === service.id}
            onToggle={handleServiceToggle}
            onBook={handleBooking}
          />
        ))}
      </View>
    )}

        {/* 空状态 */}
        {!state.loading && !state.error && state.services.length === 0 && (
          <View className='empty-state'>
            <Text className='empty-text'>
              {state.searchValue ? '未找到相关服务' : '暂无服务内容'}
            </Text>
          </View>
        )}

        {/* 服务列表 */}
        {!state.loading && !state.error && state.services.length > 0 && (
          <>
            <View className='service-list'>
              {state.services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  expanded={state.expandedService === service.id}
                  onToggle={handleServiceToggle}
                  onBook={handleBooking}
                />
              ))}
            </View>

            {/* FAQ部分 */}
            {state.faqs.length > 0 && (
              <FAQSection 
                faqs={state.faqs}
                title='常见问题'
                className='faq-section'
              />
            )}
          </>
        )}
      </View>
    </View>
  )
}