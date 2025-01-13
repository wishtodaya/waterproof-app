// components/search-bar/index.tsx
import { useState, useCallback, useEffect, useMemo } from 'react'
import { View, Input } from '@tarojs/components'
import debounce from 'lodash/debounce'
import './index.scss'

interface SearchBarProps {
  value: string
  placeholder?: string
  className?: string
  loading?: boolean
  delay?: number  // 防抖延迟时间
  maxLength?: number
  onChange: (value: string) => void
  onSearch?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder = '搜索',
  className = '',
  loading = false,
  delay = 500,
  maxLength = 100,
  onChange,
  onSearch,
  onFocus,
  onBlur,
  onClear
}) => {
  // 状态管理
  const [isFocused, setIsFocused] = useState(false)
  const [innerValue, setInnerValue] = useState(value)

  // 同步外部value变化
  useEffect(() => {
    setInnerValue(value)
  }, [value])

  // 防抖处理
  const debouncedChange = useMemo(
    () => debounce((value: string) => {
      onChange(value)
    }, delay),
    [onChange, delay]
  )

  // 清理防抖
  useEffect(() => {
    return () => {
      debouncedChange.cancel()
    }
  }, [debouncedChange])

  // 输入处理
  const handleInput = useCallback((e: any) => {
    const newValue = e.detail.value.trim()
    setInnerValue(newValue)
    debouncedChange(newValue)
  }, [debouncedChange])

  // 清除处理
  const handleClear = useCallback(() => {
    setInnerValue('')
    onChange('')
    onClear?.()
  }, [onChange, onClear])

  // 搜索处理
  const handleSearch = useCallback(() => {
    if (!innerValue) return
    onSearch?.(innerValue)
  }, [innerValue, onSearch])

  // 聚焦处理
  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()
  }, [onFocus])

  // 失焦处理
  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  return (
    <View className={`search-bar ${className} ${isFocused ? 'is-focused' : ''} ${loading ? 'is-loading' : ''}`}>
      <View className='search-input-wrap'>
        {/* 搜索图标 */}
        <View className='search-icon'>
          {loading ? (
            <View className='loading-icon' />
          ) : (
            <>
              <View className='icon-circle' />
              <View className='icon-line' />
            </>
          )}
        </View>

        {/* 输入框 */}
        <Input
          className='search-input'
          type='text'
          value={innerValue}
          placeholder={placeholder}
          placeholderClass='placeholder'
          maxlength={maxLength}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          confirmType='search'
          onConfirm={handleSearch}
          disabled={loading}
        />

        {/* 清除按钮 */}
        {innerValue && !loading && (
          <View className='clear-btn' onClick={handleClear}>
            <View className='clear-icon' />
          </View>
        )}
      </View>

      {/* 搜索按钮 */}
      <View 
        className={`search-btn ${innerValue ? 'active' : ''} ${loading ? 'disabled' : ''}`}
        onClick={handleSearch}
      >
        搜索
      </View>
    </View>
  )
}