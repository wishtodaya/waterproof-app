// components/about-us/index.tsx
import { View, Text } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import type { AboutUsProps } from "./types"
import "./index.scss"

interface InfoCard {
  icon: string
  label: string
  value: string
  color: string
}

export default function AboutUs({ description, phone, wechat, address, businessHours }: AboutUsProps) {
  const infoCards: InfoCard[] = [
    {
      icon: "phone",
      label: "电话咨询",
      value: phone,
      color: "rgb(2, 132, 199)",
    },
    {
      icon: "message",
      label: "微信咨询",
      value: wechat,
      color: "rgb(5, 150, 105)",
    },
    {
      icon: "clock",
      label: "营业时间",
      value: businessHours,
      color: "rgb(147, 51, 234)",
    },
    {
      icon: "map-pin",
      label: "公司地址",
      value: address,
      color: "rgb(220, 38, 38)",
    },
  ]

  return (
    <View className="about-us">
      <View className="about-us__intro">
        <Text className="about-us__desc">{description}</Text>
      </View>

      <View className="about-us__grid">
        {infoCards.map(({ icon, label, value, color }) => (
          <View
            key={icon}
            className="grid-item"
            style={
              {
                "--card-color": color,
              } as React.CSSProperties
            }
          >
            <View className="grid-item__icon">
              <AtIcon value={icon} size={26} color={color} />
            </View>
            <View className="grid-item__content">
              <Text className="grid-item__label">{label}</Text>
              <Text className="grid-item__value">{value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}