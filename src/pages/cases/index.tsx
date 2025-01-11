
// pages/contact/index.tsx
import { View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function Contact() {
  const [loading, setLoading] = useState(false)

  return (
    <View className='contact'>
      {/* 表单区域 */}
      <View className='form-section'>
      </View>

      {/* 联系信息 */}
      <View className='contact-info'>
      </View>
    </View>
  )
}