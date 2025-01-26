import { View, Image, Text } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import "./index.scss"

export interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
  description?: string
  beforeLabel?: string
  afterLabel?: string
  height?: number
}

export const ImageComparison = ({
  beforeImage,
  afterImage,
  description = "",
  beforeLabel = "施工前",
  afterLabel = "施工后",
  height = 400,
}: ImageComparisonProps) => {
  return (
    <View className="image-comparison">
      <View className="image-comparison__container" style={{ height: `${height}px` }}>
        <View className="image-comparison__item">
          <Image
            className="image-comparison__image"
            src={beforeImage || "/placeholder.svg"}
            mode="aspectFill"
            lazyLoad
          />
          <View className="image-comparison__label">
            <AtIcon value="clock" size="12" color="#fff" />
            <Text>{beforeLabel}</Text>
          </View>
        </View>

        <View className="image-comparison__divider">
          <AtIcon value="arrow-right" size="16" color="#fff" />
        </View>

        <View className="image-comparison__item">
          <Image
            className="image-comparison__image"
            src={afterImage || "/placeholder.svg"}
            mode="aspectFill"
            lazyLoad
          />
          <View className="image-comparison__label">
            <AtIcon value="check" size="12" color="#fff" />
            <Text>{afterLabel}</Text>
          </View>
        </View>
      </View>

      {description && <Text className="image-comparison__desc">{description}</Text>}
    </View>
  )
}