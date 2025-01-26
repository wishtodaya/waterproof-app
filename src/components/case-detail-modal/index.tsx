import { memo, useState } from "react"
import { View, Text, Button, Swiper, SwiperItem } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import { ImageComparison } from "../image-comparison"
import type { CaseData } from "../case-card/types"
import "./index.scss"

interface CaseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  data: CaseData | null
  onBook?: (data: CaseData) => void
}

export const CaseDetailModal = memo(({ isOpen, onClose, data, onBook }: CaseDetailModalProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  if (!isOpen || !data) return null

  return (
    <View className={`case-detail ${isOpen ? "case-detail--open" : ""}`}>
      <View className="case-detail__header">
        <View className="case-detail__back" onClick={onClose}>
          <AtIcon value="chevron-left" size="20" />
        </View>
        <Text className="case-detail__title">{data.title}</Text>
        <Text className="case-detail__type">{data.type}</Text>
      </View>

      <View className="case-detail__content">
        <View className="case-detail__swiper-wrap">
          <Swiper
            className="case-detail__swiper"
            onChange={(e) => setCurrentImage(e.detail.current)}
            circular
            indicatorDots
            indicatorColor="rgba(255, 255, 255, 0.3)"
            indicatorActiveColor="#ffffff"
          >
            {data.images.map((image, index) => (
              <SwiperItem key={index} className="case-detail__swiper-item">
                <ImageComparison
                  beforeImage={image.beforeImage}
                  afterImage={image.afterImage}
                  description={image.description}
                  height={440}
                />
              </SwiperItem>
            ))}
          </Swiper>
        </View>

        <View className="case-detail__main">
          <View className="case-detail__info-grid">
            <View className="case-detail__info-item">
              <AtIcon value="calendar" size="20" color="var(--color-brand)" />
              <Text className="case-detail__info-label">施工周期</Text>
              <Text className="case-detail__info-value">{data.duration}</Text>
            </View>
            <View className="case-detail__info-item">
              <AtIcon value="map-pin" size="20" color="var(--color-brand)" />
              <Text className="case-detail__info-label">项目地点</Text>
              <Text className="case-detail__info-value">{data.location}</Text>
            </View>
            <View className="case-detail__info-item">
              <AtIcon value="bookmark" size="20" color="var(--color-brand)" />
              <Text className="case-detail__info-label">施工面积</Text>
              <Text className="case-detail__info-value">{data.area}</Text>
            </View>
          </View>

          <View className="case-detail__sections">
            <View className="case-detail__section">
              <View className="case-detail__section-header">
                <View className="case-detail__section-line" />
                <Text className="case-detail__section-title">项目介绍</Text>
              </View>
              <Text className="case-detail__section-content">{data.description}</Text>
            </View>

            <View className="case-detail__section">
              <View className="case-detail__section-header">
                <View className="case-detail__section-line" />
                <Text className="case-detail__section-title">解决方案</Text>
              </View>
              <Text className="case-detail__section-content">{data.solution}</Text>
            </View>

            <View className="case-detail__section">
              <View className="case-detail__section-header">
                <View className="case-detail__section-line" />
                <Text className="case-detail__section-title">施工流程</Text>
              </View>
              <View className="case-detail__process">
                {data.process.map((step, index) => (
                  <View key={index} className="case-detail__process-item">
                    <View className="case-detail__process-number">{index + 1}</View>
                    <Text className="case-detail__process-text">{step}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="case-detail__footer safe-area-bottom">
        <Button className="case-detail__action" onClick={onClose}>
          返回列表
        </Button>
        <Button className="case-detail__action case-detail__action--primary" onClick={() => onBook?.(data)}>
          在线预约
        </Button>
      </View>
    </View>
  )
})

CaseDetailModal.displayName = "CaseDetailModal"