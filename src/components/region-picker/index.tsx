// components/region-picker/index.tsx
import { View, Text, Picker } from '@tarojs/components'
import type { RegionPickerProps } from './types'
import type { BaseEventOrig } from '@tarojs/components/types/common'
import type { PickerRegionProps } from '@tarojs/components/types/Picker'
import './index.scss'

export default function RegionPicker({
  value = [],
  onChange,
  error = false,
  onBlur,
  disabled = false,
  className = ''
}: RegionPickerProps) {
  // 获取显示文本
  const getDisplayText = () => {
    if (!value || value.length === 0) {
      return '请选择所在地区'
    }
    return value.join(' ')
  }

  // 处理选择器变化
  const handlePickerChange = (e: BaseEventOrig<{ value: string[] }>) => {
    onChange(e.detail.value)
  }

  return (
    <View className={`region-picker ${className}`}>
      <Picker
        mode='region'
        value={value}
        disabled={disabled}
        onChange={handlePickerChange}
      >
        <View 
          className={`region-picker__selector ${
            error ? 'region-picker__selector--error' : ''
          } ${disabled ? 'region-picker__selector--disabled' : ''}`}
          onClick={onBlur} // 将onBlur改为onClick事件
        >
          <Text 
            className={`region-picker__text ${
              !value?.length ? 'region-picker__text--placeholder' : ''
            }`}
          >
            {getDisplayText()}
          </Text>
          <View className='region-picker__arrow' />
        </View>
      </Picker>
    </View>
  )
}