// pages/project/index.tsx
import { View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function Project() {
  const [loading, setLoading] = useState(false)

  return (
    <View className='project'>
      {/* 搜索栏 */}
      <View className='search-section'>
      </View>

      {/* 分类导航 */}
      <View className='category-section'>
      </View>

      {/* 服务列表 */}
      <View className='service-list'>
      </View>

      {/* FAQ */}
      <View className='faq-section'>
      </View>
    </View>
  )
}