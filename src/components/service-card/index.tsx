// components/service-card/index.tsx
import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTag } from 'taro-ui'
import type { ServiceItem } from '../../types'
import { ProcessSteps } from '../process-steps'
import './index.scss'

interface ServiceCardProps {
  service: ServiceItem
  expanded: boolean
  onToggle: (id: number) => void
  onBook: (service: ServiceItem) => void
}

export const ServiceCard = memo(function ServiceCard({
  service,
  expanded,
  onToggle,
  onBook
}: ServiceCardProps) {
  // 处理预约点击，阻止冒泡
  const handleBookClick = (e: any) => {
    e.stopPropagation()
    onBook(service)
  }

  return (
    <View 
      className={`service-card ${expanded ? 'expanded' : ''}`}
      onClick={() => onToggle(service.id)}
    >
      {/* Header */}
      <View className='service-header'>
        <View className='service-title'>
          <Text>{service.title}</Text>
          {service.warranty && (
            <Text className='warranty-tag'>{service.warranty}</Text>
          )}
        </View>
        <View className='service-price'>
          <Text className='price'>¥{service.price}</Text>
          <Text className='unit'>/{service.unit}</Text>
        </View>
      </View>

      {/* Features */}
      <View className='service-features'>
        {service.features.map((feature, index) => (
          <AtTag 
            key={index}
            size='small'
            className='feature-tag'
          >
            {feature}
          </AtTag>
        ))}
      </View>

      {/* Description */}
      <Text className='service-description'>{service.description}</Text>

      {/* Expanded Content - 使用绝对定位避免展开时的跳动 */}
      <View className={`service-detail ${expanded ? 'expanded' : ''}`}>
        {/* Service Info */}
        <View className='info-section'>
          {service.estimatedDuration && (
            <View className='info-item'>
              <Text className='label'>预计工期</Text>
              <Text className='value'>{service.estimatedDuration}</Text>
            </View>
          )}
          {service.minArea && service.maxArea && (
            <View className='info-item'>
              <Text className='label'>适用面积</Text>
              <Text className='value'>
                {service.minArea}-{service.maxArea}㎡
              </Text>
            </View>
          )}
        </View>

        {/* Process Steps */}
        <ProcessSteps steps={service.process} />

        {/* Booking Button */}
        <AtButton
          type='primary'
          className='booking-btn'
          onClick={handleBookClick}
        >
          立即预约
        </AtButton>
      </View>
    </View>
  )
})