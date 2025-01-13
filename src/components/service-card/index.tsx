// components/service-card/index.tsx
import { memo, useMemo, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import type { ServiceItem } from '../../types'
import './index.scss'

interface ServiceCardProps {
  service?: ServiceItem
  loading?: boolean
  expanded?: boolean
  className?: string
  onToggle?: (id: number) => void
  onBook?: (service: ServiceItem) => void
}

export const ServiceCard = memo(function ServiceCard({
  service,
  loading = false,
  expanded = false,
  className = '',
  onToggle,
  onBook
}: ServiceCardProps) {
  
  // 加载状态
  if (loading) {
    return (
      <View className={`service-card is-loading ${className}`}>
        <View className='skeleton-content'>
          <View className='skeleton-line' style='width: 60%' />
          <View className='skeleton-line' style='width: 40%' />
          <View className='skeleton-line' style='width: 90%' />
        </View>
      </View>
    )
  }

  // 确保服务数据存在
  if (!service) return null

  // 格式化价格
  const formattedPrice = useMemo(() => {
    return typeof service.price === 'number' 
      ? service.price.toLocaleString('zh-CN')
      : service.price
  }, [service.price])

  // 构建应用区域信息
  const applicationArea = useMemo(() => {
    if (!service.minArea && !service.maxArea) return null
    if (service.minArea && service.maxArea) {
      return `${service.minArea}-${service.maxArea}㎡`
    }
    if (service.minArea) return `≥${service.minArea}㎡`
    return `≤${service.maxArea}㎡`
  }, [service.minArea, service.maxArea])

  // 展开/收起处理
  const handleToggle = useCallback((e: any) => {
    e.stopPropagation()
    onToggle?.(service.id)
  }, [service.id, onToggle])

  // 预约处理
  const handleBook = useCallback((e: any) => {
    e.stopPropagation()
    onBook?.(service)
  }, [service, onBook])

  return (
    <View className={`service-card ${expanded ? 'is-expanded' : ''} ${className}`}>
      {/* 卡片主体，点击展开/收起 */}
      <View className='card-main' onClick={handleToggle}>
        {/* 头部信息 */}
        <View className='card-header'>
          <View className='title-wrap'>
            <Text className='title'>{service.title}</Text>
            {service.warranty && (
              <Text className='warranty'>{service.warranty}</Text>
            )}
          </View>
          <View className='price-wrap'>
            <Text className='price'>¥{formattedPrice}</Text>
            <Text className='unit'>/{service.unit}</Text>
          </View>
        </View>

        {/* 特点标签 */}
        {service.features?.length > 0 && (
          <View className='features'>
            {service.features.map((feature, index) => (
              <Text 
                key={`${service.id}-feature-${index}`} 
                className='feature-tag'
              >
                {feature}
              </Text>
            ))}
          </View>
        )}

        {/* 简介 */}
        <Text className='description'>{service.description}</Text>

        {/* 展开/收起图标 */}
        <View className={`expand-icon ${expanded ? 'expanded' : ''}`}>
          <View className='icon-arrow' />
        </View>
      </View>

      {/* 展开内容 */}
      <View className={`card-expand ${expanded ? 'expanded' : ''}`}>
        {/* 服务信息 */}
        <View className='info-box'>
          {service.estimatedDuration && (
            <View className='info-item'>
              <Text className='label'>预计工期</Text>
              <Text className='value'>{service.estimatedDuration}</Text>
            </View>
          )}
          {applicationArea && (
            <View className='info-item'>
              <Text className='label'>适用面积</Text>
              <Text className='value'>{applicationArea}</Text>
            </View>
          )}
        </View>

        {/* 服务流程 */}
        {service.process?.length > 0 && (
          <View className='process-box'>
            <Text className='process-title'>服务流程</Text>
            <View className='process-steps'>
              {service.process.map((step, index) => (
                <View 
                  key={`${service.id}-step-${index}`} 
                  className='step-item'
                >
                  <View className='step-number'>{index + 1}</View>
                  <View className='step-content'>
                    <Text className='step-title'>{step.title}</Text>
                    <Text className='step-desc'>{step.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 预约按钮 */}
        <View className='book-btn' onClick={handleBook}>
          立即预约
        </View>
      </View>
    </View>
  )
})