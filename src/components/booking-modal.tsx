import { memo, useState, useCallback } from 'react'
import { Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtForm, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import { api } from '../services/index-api'
import { handleError, AppError } from '../utils/error'
import type { BookingForm, FormErrors } from '../types'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialForm: BookingForm = {
  name: '',
  phone: '',
  address: '',
  remark: ''
}

export const BookingModal = memo(function BookingModal({
  isOpen,
  onClose
}: BookingModalProps) {
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormInput = useCallback((field: keyof BookingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }, [])

  const validateForm = useCallback((form: BookingForm): FormErrors => {
    const errors: FormErrors = {}

    if (!form.name?.trim()) {
      errors.name = '请输入姓名'
    } else if (form.name.length > 20) {
      errors.name = '姓名不能超过20个字符'
    }

    if (!form.phone?.trim()) {
      errors.phone = '请输入手机号'
    } else {
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(form.phone)) {
        errors.phone = '请输入正确的手机号'
      }
    }

    if (form.address && form.address.length > 100) {
      errors.address = '地址不能超过100个字符'
    }

    if (form.remark && form.remark.length > 200) {
      errors.remark = '备注不能超过200个字符'
    }

    return errors
  }, [])

  const handleSubmit = async () => {
    const formErrors = validateForm(form)
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      const firstError = Object.values(formErrors)[0]
      Taro.showToast({
        title: firstError || '请检查输入',
        icon: 'none'
      })
      return
    }
    
    try {
      setIsSubmitting(true)
      const response = await api.submitBooking(form)
    
      if (response.code === 0) {
        Taro.showToast({
          title: '预约成功',
          icon: 'success'
        })
        handleClose()
      } else {
        throw new AppError(response.code, response.message)
      }
    } catch (error) {
      console.error('预约失败:', error)
      Taro.showToast({
        title: handleError(error),
        icon: 'none'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setForm(initialForm)
      setErrors({})
      onClose()
    }
  }, [isSubmitting, onClose])

  return (
    <AtModal
      isOpened={isOpen}
      onClose={handleClose}
    >
      <AtModalHeader>快速预约</AtModalHeader>
      <AtModalContent>
        <AtForm>
          <AtInput
            name='name'
            title='姓名'
            type='text'
            placeholder='请输入姓名'
            value={form.name}
            onChange={(value) => handleFormInput('name', String(value))}
            error={!!errors.name}
            disabled={isSubmitting}
            maxLength={20}
          />
          <AtInput
            name='phone'
            title='电话'
            type='phone'
            placeholder='请输入联系电话'
            value={form.phone}
            onChange={(value) => handleFormInput('phone', String(value))}
            error={!!errors.phone}
            disabled={isSubmitting}
            maxLength={11}
          />
          <AtInput
            name='address'
            title='地址'
            type='text'
            placeholder='请输入服务地址（选填）'
            value={form.address || ''}
            onChange={(value) => handleFormInput('address', String(value))}
            error={!!errors.address}
            disabled={isSubmitting}
            maxLength={100}
          />
          <AtInput
            name='remark'
            title='备注'
            type='text'
            placeholder='请输入备注信息（选填）'
            value={form.remark || ''}
            onChange={(value) => handleFormInput('remark', String(value))}
            error={!!errors.remark}
            disabled={isSubmitting}
            maxLength={200}
          />
        </AtForm>
      </AtModalContent>
      <AtModalAction>
        <Button onClick={handleClose} disabled={isSubmitting}>
          取消
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className={`submit-btn ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? '提交中...' : '提交'}
        </Button>
      </AtModalAction>
    </AtModal>
  )
})