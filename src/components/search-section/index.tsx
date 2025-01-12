// components/search-section/index.tsx
import { memo, useState, useCallback } from 'react'
import { View, Input } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

interface SearchSectionProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  loading?: boolean
}

export const SearchSection = memo(function SearchSection({
  value,
  onChange,
  placeholder = '搜索服务',
  loading = false
}: SearchSectionProps) {
  // 内部维护一个输入状态，只有停止输入一段时间后才触发外部onChange
  const [inputValue, setInputValue] = useState(value)
  let searchTimer: any = null

  const handleInput = useCallback((e) => {
    const newValue = e?.detail?.value
    if (typeof newValue === 'string') {
      setInputValue(newValue)
      // 清除之前的定时器
      if (searchTimer) clearTimeout(searchTimer)
      // 设置新的定时器
      searchTimer = setTimeout(() => {
        onChange(newValue)
      }, 500) // 等待500ms后才触发搜索
    }
  }, [onChange])

  // 清除搜索
  const handleClear = useCallback(() => {
    setInputValue('')
    onChange('')
  }, [onChange])

  return (
    <View className='search-section'>
      <View className='search-input-wrapper'>
        <AtIcon 
          value='search' 
          size='18' 
          color='#94a3b8'
          className='search-icon'
        />
        <Input
          className='search-input'
          type='text'
          value={inputValue}
          placeholder={placeholder}
          onInput={handleInput}
          placeholderClass='search-placeholder'
          disabled={loading}
        />
        {inputValue && !loading && (
          <AtIcon 
            value='close-circle' 
            size='16' 
            color='#94a3b8'
            className='clear-icon'
            onClick={handleClear}
          />
        )}
        {loading && (
          <View className='search-loading'>
            <AtIcon value='loading-2' size='18' color='#94a3b8' />
          </View>
        )}
      </View>
    </View>
  )
})