// services/contact-mock-data.ts
import type { ServiceTypeOption } from '../../components/booking-form/types'
import type { AboutUsProps } from '../../components/about-us/types'
export const mockServiceTypes: ServiceTypeOption[] = [
    {
      label: "卫生间防水",
      value: "bathroom"
    },
    {
      label: "房屋防水",
      value: "house"
    },
    {
      label: "外墙防水",
      value: "wall"
    },
    {
      label: "地下室防水", 
      value: "basement"
    },
    {
      label: "阳台防水",
      value: "balcony"
    },
    {
      label: "屋顶防水",
      value: "roof"
    }
  ]

export const mockContactInfo: AboutUsProps = {
  description: "我们是专业从事建筑防水工程的专业服务公司，拥有十年以上从业经验，为商业和住宅客户提供全方位的防水解决方案。我们的团队持有专业资质证书，采用优质材料，确保施工质量。",
  phone: "1234567890",
  wechat: "company_waterproof",
  businessHours: "09:00-18:00",
  address: "北京市朝阳区xx路xx号"
}