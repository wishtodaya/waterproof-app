// components/region-picker/types.ts
export interface RegionPickerProps {
  /**
   * 选择的地区值 [省, 市, 区]
   */
  value: string[]
  
  /**
   * 值变化时的回调函数
   * 注意：这里修改为直接接收 string[] 类型的参数
   */
  onChange: (value: string[]) => void
  
  /**
   * 是否处于错误状态
   */
  error?: boolean
  
  /**
   * 失焦/点击事件回调
   */
  onBlur?: () => void
  
  /**
   * 是否禁用
   */
  disabled?: boolean
  
  /**
   * 自定义类名
   */
  className?: string

  /**
   * 占位符文本
   */
  placeholder?: string
}