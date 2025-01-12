import { memo } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import type { ServiceCase } from '../../types'

interface CaseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  data: ServiceCase | null
}

export const CaseDetailModal = memo(function CaseDetailModal({
  isOpen,
  onClose,
  data
}: CaseDetailModalProps) {
  if (!data) return null

  return (
    <AtModal
      isOpened={isOpen}
      onClose={onClose}
    >
      <AtModalHeader>{data.title}</AtModalHeader>
      <AtModalContent>
        <View className='case-detail'>
          <Image
            src={data.imageUrl}
            mode='aspectFill'
            className='case-detail__image'
            lazyLoad
          />
          <View className='case-detail__content'>
            <Text className='case-detail__desc'>{data.description}</Text>
            {data.content && (
              <View className='case-detail__full-content'>{data.content}</View>
            )}
            <View className='case-detail__meta'>
              <Text className='case-detail__type'>类型：{data.type}</Text>
              <Text className='case-detail__date'>日期：{data.date}</Text>
              <Text className='case-detail__views'>浏览：{data.views}</Text>
            </View>
          </View>
        </View>
      </AtModalContent>
      <AtModalAction>
        <Button onClick={onClose}>关闭</Button>
      </AtModalAction>
    </AtModal>
  )
})

