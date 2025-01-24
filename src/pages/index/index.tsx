import { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import type { SwiperProps } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro, { useDidShow } from '@tarojs/taro'
import { api } from '../../services/index/index-api'
import { config } from '../../config'
import { handleError } from '../../utils/error'
import { CaseDetailModal } from '../../components/case-detail-modal'
import type { Banner, ServiceCase, ServiceAdvantage } from '../../types'
import './index.scss'

export default function Index() {
  // 状态管理
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [banners, setBanners] = useState<Banner[]>([])
  const [cases, setCases] = useState<ServiceCase[]>([])
  const [advantages, setAdvantages] = useState<ServiceAdvantage[]>([])
  const [selectedCase, setSelectedCase] = useState<ServiceCase | null>(null)
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)

  // Refs
  const refreshing = useRef(false)
  const mounted = useRef(false)

  // 数据加载
  const fetchData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true)
      setError(null)

      // 并行获取数据
      const [bannerRes, caseRes, advantageRes] = await Promise.all([
        api.getBanners(),
        api.getCases(),
        api.getAdvantages()
      ])

      if (mounted.current) {
        setBanners(bannerRes.data)
        setCases(caseRes.data)
        setAdvantages(advantageRes.data)
      }
    } catch (err) {
      if (mounted.current) {
        setError(handleError(err))
      }
    } finally {
      if (showLoading && mounted.current) {
        setLoading(false)
      }
      refreshing.current = false
    }
  }, [])

  // 初始化
  useEffect(() => {
    mounted.current = true
    fetchData()
    return () => {
      mounted.current = false
    }
  }, [fetchData])

  // 页面显示时刷新
  useDidShow(() => {
    if (!refreshing.current) {
      fetchData(false)
    }
  })

  // 下拉刷新
  const handleRefresh = useCallback(async () => {
    if (refreshing.current) return
    refreshing.current = true
    
    try {
      await fetchData(false)
      Taro.showToast({ title: '刷新成功', icon: 'success' })
    } catch (error) {
      Taro.showToast({
        title: handleError(error),
        icon: 'none'
      })
    } finally {
      Taro.stopPullDownRefresh()
    }
  }, [fetchData])

  // 电话咨询
  const handleCall = useCallback(() => {
    Taro.makePhoneCall({
      phoneNumber: config.contact.phone
    }).catch(err => {
      if (!err.errMsg?.includes('cancel')) {
        Taro.showToast({ title: '拨号失败', icon: 'none' })
      }
    })
  }, [])

  // 复制微信号
  const handleWechat = useCallback(() => {
    Taro.setClipboardData({
      data: config.contact.wechat,
      success: () => {
        Taro.showToast({
          title: '微信号已复制',
          icon: 'none'
        })
      }
    })
  }, [])

  // 查看案例详情
  const handleCaseClick = useCallback((caseItem: ServiceCase) => {
    setSelectedCase(caseItem)
    setShowCaseModal(true)
  }, [])

  // 预约按钮
  const handleBooking = useCallback(() => {
    Taro.switchTab({ url: '/pages/contact/index' })
  }, [])

  // 案例滑动
  const handleCaseChange: SwiperProps['onChange'] = useCallback((e) => {
    setCurrentCaseIndex(e.detail.current)
  }, [])

  // 加载状态
  if (loading) {
    return (
      <View className='loading'>
        <Text>加载中...</Text>
      </View>
    )
  }

  // 错误状态
  if (error) {
    return (
      <View className='error'>
        <Text>{error}</Text>
        <AtButton type='primary' onClick={handleRefresh}>重试</AtButton>
      </View>
    )
  }

  return (
    <View className='index'>
      {/* Banner区域 */}
      <View className='index__header'>
        <Swiper
          className='swiper'
          circular
          autoplay
          interval={3000}
          duration={500}
          indicatorDots
          indicatorColor='rgba(255, 255, 255, 0.4)'
          indicatorActiveColor='#ffffff'
        >
          {banners.map(banner => (
            <SwiperItem key={banner.id} className='swiper-item'>
              <View className='index__banner-item'>
                <Image 
                  src={banner.imageUrl}
                  className='index__banner-image'
                  mode='aspectFill'
                  lazyLoad
                />
                <View className='index__banner-text'>
                  <Text className='index__banner-title'>{banner.title}</Text>
                  <Text className='index__banner-subtitle'>{banner.subtitle}</Text>
                </View>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className='index__content'>
        {/* 服务介绍 */}
        <View className='index__service-intro'>
          <View className='index__title'>专业防水服务</View>
          <View className='index__btn-group'>
            <AtButton type='primary' onClick={handleCall}>📞电话咨询</AtButton>
            <AtButton type='secondary' onClick={handleWechat}>💬微信咨询</AtButton>
          </View>
        </View>

        {/* 案例展示 */}
        <View className='index__cases'>
          <View className='index__title'>精选案例</View>
          <Swiper
            className='index__case-swiper'
            circular
            autoplay={!showCaseModal}
            interval={4000}
            duration={500}
            previousMargin='30px'
            nextMargin='30px'
            onChange={handleCaseChange}
          >
            {cases.map((item, index) => (
              <SwiperItem key={item.id}>
                <View 
                  className={`index__case-item ${
                    index === currentCaseIndex ? 'index__case-item--active' : ''
                  }`}
                  onClick={() => handleCaseClick(item)}
                >
                  <Image 
                    src={item.imageUrl}
                    className='index__case-image'
                    mode='aspectFill'
                    lazyLoad
                  />
                  <View className='index__case-content'>
                    <Text className='index__case-title'>{item.title}</Text>
                    <Text className='index__case-desc'>{item.description}</Text>
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>

        {/* 服务优势 */}
        <View className='index__advantages'>
          <View className='index__title'>我们的优势</View>
          <View className='index__advantages-grid'>
            {advantages.map(item => (
              <View key={item.id} className='index__advantages-item'>
                <Text className='index__advantage-icon'>{item.icon}</Text>
                <Text className='index__advantage-value'>{item.value}</Text>
                <Text className='index__advantage-label'>{item.label}</Text>
              </View>
            ))}
          </View>
          <AtButton 
            type='primary'
            className='index__book-btn'
            onClick={handleBooking}
          >
            快速预约
          </AtButton>
        </View>
      </View>

      {/* 案例详情弹窗 */}
      <CaseDetailModal
        isOpen={showCaseModal}
        onClose={() => setShowCaseModal(false)}
        data={selectedCase}
      />
    </View>
  )
}