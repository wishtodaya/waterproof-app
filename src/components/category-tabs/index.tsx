// components/category-tabs/index.tsx
import { memo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import type { ServiceCategory } from '../../types'
import './index.scss'

interface CategoryTabsProps {
  categories: ServiceCategory[]
  current: number
  onChange: (index: number) => void
}

export const CategoryTabs = memo(function CategoryTabs({
  categories,
  current,
  onChange
}: CategoryTabsProps) {
  return (
    <View className='category-tabs'>
      <View className='category-container'>
        <ScrollView 
          scrollX 
          enhanced
          showScrollbar={false}
          className='category-scroll'
        >
          <View className='category-content'>
            {categories.map((cat, index) => (
              <View
                key={cat.value}
                className={`category-item ${current === index ? 'active' : ''}`}
                onClick={() => onChange(index)}
              >
                <Text className='category-title'>{cat.title}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
})