import { memo } from "react"
import { View, Image, Text } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import type { CaseData } from "./types"
import "./index.scss"

export interface CaseCardProps {
  data: CaseData
  onClick?: (data: CaseData) => void
}

export const CaseCard = memo(({ data, onClick }: CaseCardProps) => {
  const { beforeImage, afterImage, title, type, area, date, location, description } = data

  return (
    <View className="case-card" onClick={() => onClick?.(data)}>
      <View className="case-card__images">
        <Image className="case-card__image" src={beforeImage || "/placeholder.svg"} mode="aspectFill" lazyLoad />
        <View className="case-card__image-divider">
          <AtIcon value="arrow-right" size="12" color="#fff" />
        </View>
        <Image className="case-card__image" src={afterImage || "/placeholder.svg"} mode="aspectFill" lazyLoad />
      </View>

      <View className="case-card__content">
        <View className="case-card__header">
          <Text className="case-card__title">{title}</Text>
          <Text className="case-card__type">{type}</Text>
        </View>

        <Text className="case-card__desc">{description}</Text>

        <View className="case-card__meta">
          <View className="case-card__meta-item">
            <AtIcon value="map-pin" size="14" color="#666" />
            <Text>{location}</Text>
          </View>
          <View className="case-card__meta-item">
            <AtIcon value="bookmark" size="14" color="#666" />
            <Text>{area}</Text>
          </View>
          <View className="case-card__meta-item">
            <AtIcon value="calendar" size="14" color="#666" />
            <Text>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  )
})

CaseCard.displayName = "CaseCard"