// components/search-bar/index.tsx
import { useState, useCallback, memo } from 'react'
import { View, Input } from '@tarojs/components'
import { SearchBarProps } from '../../types'
import './index.scss'

export const SearchBar = memo(({
  value,
  placeholder = '搜索',
  loading = false,
  className = '',
  onChange,
  onSearch,
  onFocus,
  onBlur,
  onClear
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleInput = useCallback((e: any) => {
    onChange(e.detail.value)
  }, [onChange])

  const handleClear = useCallback(() => {
    onChange('')
    onClear?.()
  }, [onChange, onClear])

  const handleSearch = useCallback(() => {
    if (!value.trim()) return
    onSearch?.(value)
  }, [value, onSearch])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  return (
    <View className={`search-bar ${isFocused ? 'search-bar--focused' : ''} ${loading ? 'search-bar--loading' : ''} ${className}`}>
      <View className='search-bar__input-wrap'>
        <View className='search-bar__icon'>
          {loading ? (
            <View className='search-bar__loading' />
          ) : (
            <>
              <View className='search-bar__circle' />
              <View className='search-bar__line' />
            </>
          )}
        </View>

        <Input
          className='search-bar__input'
          type='text'
          value={value}
          placeholder={placeholder}
          placeholderClass='search-bar__placeholder'
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          confirmType='search'
          onConfirm={handleSearch}
          disabled={loading}
        />

        {value && !loading && (
          <View className='search-bar__clear' onClick={handleClear}>
            <View className='search-bar__clear-icon' />
          </View>
        )}
      </View>

      <View 
        className={`search-bar__action ${value ? 'search-bar__action--active' : ''} ${loading ? 'search-bar__action--disabled' : ''}`}
        onClick={handleSearch}
      >
        搜索
      </View>
    </View>
  )
})