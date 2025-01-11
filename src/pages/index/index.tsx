import { useEffect, useState, useCallback } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { api } from '../../services/index-api'
import { config } from '../../config'
import { handleError } from '../../utils/error'
import { CaseDetailModal } from '../../components/case-detail-modal'
import { BookingModal } from '../../components/booking-modal'
import type { Banner, ServiceCase, ServiceAdvantage } from '../../types'
import './index.scss'

export default function Index() {
  // State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [banners, setBanners] = useState<Banner[]>([])
  const [cases, setCases] = useState<ServiceCase[]>([])
  const [advantages, setAdvantages] = useState<ServiceAdvantage[]>([])
  const [selectedCase, setSelectedCase] = useState<ServiceCase | null>(null)
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Data fetching
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const results = await Promise.allSettled([
        api.getBanners(),
        api.getCases(),
        api.getAdvantages()
      ])

      const errors = results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason)

      if (errors.length > 0) {
        console.error('数据加载错误:', errors)
        throw new Error('部分数据加载失败')
      }

      const [bannerResult, caseResult, advantageResult] = results as PromiseFulfilledResult<any>[]

      setBanners(bannerResult.value.data)
      setCases(caseResult.value.data)
      setAdvantages(advantageResult.value.data)
    } catch (err) {
      console.error('初始化数据失败:', err)
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Event handlers
  const handleRefresh = useCallback(async () => {
    try {
      Taro.startPullDownRefresh()
      await fetchData()
    } finally {
      Taro.stopPullDownRefresh()
    }
  }, [fetchData])

  const handleCall = useCallback(() => {
    Taro.makePhoneCall({
      phoneNumber: config.contact.phone,
      success: () => {
        console.log('电话拨打成功')
      },
      fail: (err) => {
        // 用户取消不提示错误
        if (err.errMsg.includes('fail cancel')) {
          return
        }
        // 其他错误才提示
        Taro.showToast({
          title: '拨号失败，请稍后重试',
          icon: 'none'
        })
      },
      complete: () => {
        console.log('电话拨打操作结束')
      }
    })
  }, [])

  const handleWechat = useCallback(() => {
    try {
      Taro.setClipboardData({
        data: config.contact.wechat,
        success: () => {
          Taro.showToast({
            title: `微信号"${config.contact.wechat}"已复制，请打开微信添加`,
            icon: 'none',
            duration: 3000
          })
        },
        fail: () => {
          Taro.showToast({
            title: '复制失败，请稍后重试',
            icon: 'none'
          })
        }
      })
    } catch (error) {
      console.error('复制异常:', error)
      Taro.showToast({
        title: handleError(error),
        icon: 'none'
      })
    }
  }, [])

  const handleCaseClick = useCallback(async (caseItem: ServiceCase) => {
    try {
      const response = await api.getCaseDetail(caseItem.id)
      setSelectedCase(response.data)
      setShowCaseModal(true)
    } catch (error) {
      console.error('获取案例详情失败:', error)
      Taro.showToast({
        title: handleError(error),
        icon: 'none'
      })
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <View className='loading'>
        <Text>加载中...</Text>
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View className='error'>
        <Text>{error}</Text>
        <AtButton onClick={handleRefresh}>重试</AtButton>
      </View>
    )
  }

  return (
    <View className='index'>
      {/* Banner */}
      <Swiper
        className='banner'
        circular
        indicatorDots
        autoplay
        interval={config.ui.banner.interval}
        duration={config.ui.banner.duration}
      >
        {banners.map(banner => (
          <SwiperItem key={banner.id}>
            <Image 
              src={banner.imageUrl}
              className='banner-image'
              mode='aspectFill'
              lazyLoad
            />
            <View className='banner-text'>
              <Text className='banner-title'>{banner.title}</Text>
              <Text className='banner-subtitle'>{banner.subtitle}</Text>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className='content-container'>
        {/* Service Introduction */}
        <View className='service-intro card'>
          <View className='card-title'>专业防水服务</View>
          <View className='card-desc'>一站式解决您的渗漏问题</View>
          <View className='btn-group'>
            <AtButton type='primary' onClick={handleCall}>电话咨询</AtButton>
            <AtButton type='secondary' onClick={handleWechat}>微信咨询</AtButton>
          </View>
        </View>

        {/* Cases */}
        <View className='cases card'>
          <View className='card-title'>精选案例</View>
          <Swiper
            className='case-swiper'
            circular
            autoplay
            interval={config.ui.cases.interval}
            duration={config.ui.cases.duration}
            previousMargin='30px'
            nextMargin='30px'
          >
            {cases.map(item => (
              <SwiperItem key={item.id}>
                <View 
                  className='case-item'
                  onClick={() => handleCaseClick(item)}
                >
                  <Image 
                    src={item.imageUrl}
                    className='case-image'
                    mode='aspectFill'
                    lazyLoad
                  />
                  <View className='case-content'>
                    <Text className='case-title'>{item.title}</Text>
                    <Text className='case-desc'>{item.description}</Text>
                    <View className='case-meta'>
                      <Text>{item.type}</Text>
                      <Text>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>

        {/* Advantages */}
        <View className='advantages card'>
          <View className='card-title'>我们的优势</View>
          <View className='advantage-grid'>
            {advantages.map(item => (
              <View key={item.id} className='advantage-item'>
                <Text className='advantage-icon'>{item.icon}</Text>
                <Text className='advantage-value'>{item.value}</Text>
                <Text className='advantage-label'>{item.label}</Text>
              </View>
            ))}
          </View>
          <AtButton 
            type='primary' 
            className='book-btn'
            onClick={() => setShowBookingModal(true)}
          >
            快速预约
          </AtButton>
        </View>
      </View>

      {/* Modals */}
      <CaseDetailModal
        isOpen={showCaseModal}
        onClose={() => setShowCaseModal(false)}
        data={selectedCase}
      />
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </View>
  )
}

