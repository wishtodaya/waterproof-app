// components/booking-form/index.tsx
import { useState, useCallback } from 'react'
import { View, Text, Input, Textarea, Picker, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import RegionPicker from '../region-picker'
import type { BookingFormData, BookingFormProps, FormErrors } from './types'
import './index.scss'

const DEFAULT_FORM: BookingFormData = {
 name: '',
 phone: '',
 area: '',
 serviceType: '',
 region: [],
 address: '',
 remark: ''
}

export default function BookingForm({
 loading = false,
 serviceTypes = [],
 onSubmit
}: BookingFormProps) {
 const [form, setForm] = useState<BookingFormData>(DEFAULT_FORM)
 const [errors, setErrors] = useState<FormErrors>({})
 const [touched, setTouched] = useState<Record<string, boolean>>({})

 // 表单验证
 const validateField = useCallback((name: string, value: any): string => {
   switch(name) {
     case 'name':
       if (!value) return '请输入联系人姓名'
       if (value.length < 2) return '姓名至少2个字符'
       if (value.length > 20) return '姓名不能超过20个字符'
       return ''
     case 'phone':
       if (!value) return '请输入手机号码'
       if (!/^1[3-9]\d{9}$/.test(value)) return '请输入正确的手机号'
       return ''
     case 'area':
       if (!value) return '请输入施工面积'
       const areaNum = parseFloat(value)
       if (isNaN(areaNum) || areaNum <= 0) return '请输入有效的面积'
       if (areaNum > 10000) return '面积不能超过10000平方米'
       return ''
     case 'serviceType':
       if (!value) return '请选择服务类型'
       return ''
     case 'region':
       if (!value?.length) return '请选择所在地区'
       return ''
     case 'address':
       if (!value) return '请输入详细地址'
       if (value.length < 5) return '详细地址至少5个字符'
       if (value.length > 100) return '详细地址不能超过100个字符'
       return ''
     default:
       return ''
   }
 }, [])

 // 处理输入变化
 const handleInput = useCallback((name: keyof BookingFormData, event: any) => {
   const value = event?.detail?.value ?? event
   setForm(prev => ({ ...prev, [name]: value }))
   setTouched(prev => ({ ...prev, [name]: true }))

   const error = validateField(name, value)
   setErrors(prev => ({ ...prev, [name]: error }))
 }, [validateField])

 // 处理提交
 const handleSubmit = useCallback(async () => {
   if (loading) return

   const allTouched: Record<string, boolean> = {}
   const newErrors: FormErrors = {}
   let hasError = false

   Object.keys(form).forEach(key => {
     allTouched[key] = true
     if (key !== 'remark') {
       const error = validateField(key, form[key as keyof BookingFormData])
       if (error) {
         newErrors[key] = error
         hasError = true
       }
     }
   })

   setTouched(allTouched)
   setErrors(newErrors)

   if (!hasError) {
     try {
       await Taro.vibrateShort()
       await onSubmit(form)
     } catch (error) {
       console.error('Submit error:', error)
       Taro.showToast({
         title: '提交失败，请重试',
         icon: 'none',
         duration: 2000
       })
     }
   } else {
     Taro.showToast({
       title: '请完善必填信息',
       icon: 'none',
       duration: 2000
     })
   }
 }, [form, loading, onSubmit, validateField])

 return (
   <View className='booking-form'>
     <View className='booking-form__content'>
       {/* 联系人姓名 */}
       <View className='booking-form__form-item'>
         <View className='booking-form__label'>
           <Text className='booking-form__label-required'>*</Text>
           <Text className='booking-form__label-text'>联系人姓名</Text>
         </View>
         <Input
           className={`booking-form__input ${touched.name && errors.name ? 'booking-form__input--error' : ''}`}
           placeholder='请输入姓名'
           maxlength={20}
           value={form.name}
           onInput={e => handleInput('name', e)}
           onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
         />
         {touched.name && errors.name && (
           <Text className='booking-form__error'>{errors.name}</Text>
         )}
       </View>

       {/* 联系电话 */}
       <View className='booking-form__form-item'>
         <View className='booking-form__label'>
           <Text className='booking-form__label-required'>*</Text>
           <Text className='booking-form__label-text'>联系电话</Text>
         </View>
         <Input
           className={`booking-form__input ${touched.phone && errors.phone ? 'booking-form__input--error' : ''}`}
           type='number'
           maxlength={11}
           placeholder='请输入手机号码'
           value={form.phone}
           onInput={e => handleInput('phone', e)}
           onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
         />
         {touched.phone && errors.phone && (
           <Text className='booking-form__error'>{errors.phone}</Text>
         )}
       </View>

       {/* 施工面积 */}
       <View className='booking-form__form-item'>
         <View className='booking-form__label'>
           <Text className='booking-form__label-required'>*</Text>
           <Text className='booking-form__label-text'>施工面积</Text>
           <Text className='booking-form__label-unit'>（㎡）</Text>
         </View>
         <Input
           className={`booking-form__input ${touched.area && errors.area ? 'booking-form__input--error' : ''}`}
           type='digit'
           placeholder='请输入面积'
           value={form.area}
           onInput={e => handleInput('area', e)}
           onBlur={() => setTouched(prev => ({ ...prev, area: true }))}
         />
         {touched.area && errors.area && (
           <Text className='booking-form__error'>{errors.area}</Text>
         )}
       </View>

       {/* 服务类型 */}
       <View className='booking-form__form-item'>
  <View className='booking-form__label'>
    <Text className='booking-form__label-required'>*</Text>
    <Text className='booking-form__label-text'>服务类型</Text>
  </View>
  <View className={`booking-form__picker ${touched.serviceType && errors.serviceType ? 'booking-form__picker--error' : ''}`}>
    <Picker
      mode='selector'
      range={serviceTypes}
      rangeKey='label'
      onChange={e => {
        const index = Number(e.detail.value)
        handleInput('serviceType', serviceTypes[index].value)
        setTouched(prev => ({ ...prev, serviceType: true }))
      }}
    >
      <View className='booking-form__picker-inner'>
        <Text className={form.serviceType ? 'booking-form__picker-text' : 'booking-form__picker-placeholder'}>
          {form.serviceType 
            ? serviceTypes.find(item => item.value === form.serviceType)?.label 
            : '请选择服务类型'
          }
        </Text>
        <View className='booking-form__picker-arrow' />
      </View>
    </Picker>
  </View>
  {touched.serviceType && errors.serviceType && (
    <Text className='booking-form__error'>{errors.serviceType}</Text>
  )}
</View>

       {/* 所在地区 */}
       <View className='booking-form__form-item'>
         <View className='booking-form__label'>
           <Text className='booking-form__label-required'>*</Text>
           <Text className='booking-form__label-text'>所在地区</Text>
         </View>
         <RegionPicker
           value={form.region}
           onChange={value => {
             handleInput('region', value)
             setTouched(prev => ({ ...prev, region: true }))
           }}
           error={touched.region && !!errors.region}
         />
         {touched.region && errors.region && (
           <Text className='booking-form__error'>{errors.region}</Text>
         )}
       </View>

       {/* 详细地址 */}
       <View className='booking-form__form-item'>
         <View className='booking-form__label'>
           <Text className='booking-form__label-required'>*</Text>
           <Text className='booking-form__label-text'>详细地址</Text>
         </View>
         <Input
           className={`booking-form__input ${touched.address && errors.address ? 'booking-form__input--error' : ''}`}
           placeholder='请输入详细地址'
           maxlength={100}
           value={form.address}
           onInput={e => handleInput('address', e)}
           onBlur={() => setTouched(prev => ({ ...prev, address: true }))}
         />
         {touched.address && errors.address && (
           <Text className='booking-form__error'>{errors.address}</Text>
         )}
       </View>

       {/* 补充说明 */}
       <View className='booking-form__form-item'>
         <View className='booking-form__label'>
           <Text className='booking-form__label-text'>补充说明</Text>
         </View>
         <Textarea
           className='booking-form__input'
           placeholder='请输入您的具体需求或其他说明（选填）'
           maxlength={200}
           value={form.remark}
           onInput={e => handleInput('remark', e)}
         />
       </View>

       {/* 提交按钮 */}
       <View className='booking-form__submit safe-area-bottom'>
         <Button
           className={`submit-button ${loading ? 'submit-button--loading' : ''}`}
           loading={loading}
           onClick={handleSubmit}
           hoverClass='submit-button--hover'
         >
           立即预约 {loading ? '' : '›'}
         </Button>
       </View>
     </View>
   </View>
 )
}