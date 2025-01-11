// pages/cases/index.tsx
import { View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function Cases() {
  const [loading, setLoading] = useState(false)

  return (
    <View className='cases'>
      {/* 搜索区域 */}
      <View className='search-section'>
      </View>

      {/* 分类筛选 */}
      <View className='filter-section'>
      </View>

      {/* 案例列表 */}
      <View className='case-list'>
      </View>
    </View>
  )
}