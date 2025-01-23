// pages/contact/index.tsx
import { View } from "@tarojs/components"
import { useShareAppMessage } from "@tarojs/taro"
import AboutUs from "../../components/about-us"
import BookingForm from "../../components/booking-form"
import "./index.scss"

const SERVICE_TYPES = [
  {
    label: "卫生间防水",
    value: "bathroom",
    icon: "🚽",
  },
  {
    label: "房屋防水",
    value: "house",
    icon: "🏠",
  },
  {
    label: "外墙防水",
    value: "wall",
    icon: "🧱",
  },
  {
    label: "地下室防水",
    value: "basement",
    icon: "🏗️",
  },
  {
    label: "阳台防水",
    value: "balcony",
    icon: "🏛️",
  },
  {
    label: "屋顶防水",
    value: "roof",
    icon: "🏘️",
  },
]

export default function ContactPage() {
  useShareAppMessage(() => ({
    title: "专业防水工程服务 - 免费上门勘测",
    path: "/pages/contact/index",
    imageUrl: "../../assets/share/contact.png",
  }))

  const handleSubmit = async (data) => {
    console.log("Form submitted:", data)
    // TODO: 提交表单逻辑
  }

  return (
    <View className="contact-page">
      <View className="contact-page__content">
        <View className="contact-page__section contact-page__section--booking">
          <View className="contact-page__section-header">
            <View className="contact-page__section-title">预约服务</View>
            <View className="contact-page__section-subtitle">填写信息免费上门勘测</View>
          </View>
          <BookingForm serviceTypes={SERVICE_TYPES} onSubmit={handleSubmit} />
        </View>

        <View className="contact-page__section contact-page__section--about">
          <View className="contact-page__section-header">
            <View className="contact-page__section-title">关于我们</View>
            <View className="contact-page__section-subtitle">专业防水服务十年</View>
          </View>
          <AboutUs
            description="我们是专业从事建筑防水工程的专业服务公司，拥有十年以上从业经验，为商业和住宅客户提供全方位的防水解决方案。我们的团队持有专业资质证书，采用优质材料，确保施工质量。"
            phone="1234567890"
            wechat="company_waterproof"
            businessHours="09:00-18:00"
            address="北京市朝阳区xx路xx号"
          />
        </View>
      </View>
    </View>
  )
}

