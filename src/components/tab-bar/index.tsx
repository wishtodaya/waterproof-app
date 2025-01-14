// components/tab-bar/index.tsx
import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface TabItem {
  title: string
  value: string | number
}

interface TabBarProps {
  tabs: TabItem[]
  activeTab: string | number
  className?: string
  onChange: (value: string | number) => void
}

export const TabBar = memo(({
  tabs,
  activeTab,
  className = '',
  onChange
}: TabBarProps) => {
  if (!tabs?.length) return null

  return (
    <View className={`tab-bar ${className}`}>
      {tabs.map(tab => (
        <View
          key={tab.value}
          className={`tab-bar__item ${activeTab === tab.value ? 'tab-bar__item--active' : ''}`}
          onClick={() => onChange(tab.value)}
        >
          <Text className='tab-bar__text'>{tab.title}</Text>
        </View>
      ))}
    </View>
  )
})

export default TabBar