// components/service-card/index.tsx
import { memo, useCallback } from 'react'
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

export const ServiceCard = memo(({
  service,
  loading = false,
  expanded = false,
  className = '',
  onToggle,
  onBook
}: ServiceCardProps) => {

  const handleToggle = useCallback(() => {
    if (service) {
      onToggle?.(service.id)
    }
  }, [service, onToggle])

  const handleBook = useCallback((e: any) => {
    e.stopPropagation()
    if (service) {
      onBook?.(service)
    }
  }, [service, onBook])

  // 加载状态
  if (loading) {
    return (
      <View className='service-card service-card--loading'>
        <View className='service-card__skeleton'>
          <View className='service-card__skeleton-line' style='width: 60%' />
          <View className='service-card__skeleton-line' style='width: 40%' />
          <View className='service-card__skeleton-line' style='width: 90%' />
        </View>
      </View>
    )
  }

  // 无数据状态
  if (!service) return null

  return (
    <View className={`service-card ${expanded ? 'service-card--expanded' : ''} ${className}`}>
      {/* 主要内容区 */}
      <View className='service-card__main' onClick={handleToggle}>
        {/* 头部信息 */}
        <View className='service-card__header'>
          <View className='service-card__title-wrap'>
            <Text className='service-card__title'>{service.title}</Text>
            {service.warranty && (
              <Text className='service-card__warranty'>{service.warranty}</Text>
            )}
          </View>

          <View className='service-card__price-wrap'>
            <Text className='service-card__price'>¥{service.price}</Text>
            <Text className='service-card__unit'>/{service.unit}</Text>
          </View>
        </View>

        {/* 特性标签 */}
        {service.features?.length > 0 && (
          <View className='service-card__features'>
            {service.features.map((feature, index) => (
              <Text
                key={`${service.id}-feature-${index}`}
                className='service-card__feature-tag'
              >
                {feature}
              </Text>
            ))}
          </View>
        )}

        {/* 描述文本 */}
        <Text className='service-card__desc'>{service.description}</Text>
        
        {/* 展开指示器 */}
        <View className='service-card__arrow' />
      </View>

      {/* 展开内容区 */}
      <View className='service-card__expand'>
        {/* 基本信息 */}
        <View className='service-card__info'>
          {service.estimatedDuration && (
            <View className='service-card__info-item'>
              <Text className='service-card__info-label'>预计工期</Text>
              <Text className='service-card__info-value'>
                {service.estimatedDuration}
              </Text>
            </View>
          )}
          
          {(service.minArea || service.maxArea) && (
            <View className='service-card__info-item'>
              <Text className='service-card__info-label'>适用面积</Text>
              <Text className='service-card__info-value'>
                {service.minArea && service.maxArea
                  ? `${service.minArea}-${service.maxArea}㎡`
                  : service.minArea
                    ? `≥${service.minArea}㎡`
                    : `≤${service.maxArea}㎡`
                }
              </Text>
            </View>
          )}
        </View>

        {/* 服务流程 */}
        {service.process?.length > 0 && (
          <View className='service-card__process'>
            <Text className='service-card__process-title'>服务流程</Text>
            <View className='service-card__process-steps'>
              {service.process.map((step, index) => (
                <View
                  key={`${service.id}-step-${index}`}
                  className='service-card__process-step'
                >
                  <View className='service-card__step-number'>{index + 1}</View>
                  <Text className='service-card__step-title'>{step.title}</Text>
                  <Text className='service-card__step-desc'>{step.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 预约按钮 */}
        <View className='service-card__book' onClick={handleBook}>
          立即预约
        </View>
      </View>
    </View>
  )
})

export default ServiceCard