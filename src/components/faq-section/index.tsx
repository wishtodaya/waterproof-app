// components/faq-section/index.tsx
import { useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import type { FAQ } from '../../types'
import './index.scss'

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
  onFAQOpen?: (index: number) => void
  onFAQClose?: (index: number) => void
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = '常见问题',
  className = '',
  onFAQOpen,
  onFAQClose
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prevIndex => {
      const newIndex = prevIndex === index ? null : index
      if (newIndex === null) {
        onFAQClose?.(index)
      } else {
        onFAQOpen?.(index)
      }
      return newIndex
    })
  }, [onFAQOpen, onFAQClose])

  if (!Array.isArray(faqs) || !faqs.length) return null

  return (
    <View className={`faq-section ${className}`}>
      <View className='section-title'>{title}</View>
      <View className='faq-list'>
        {faqs.map((faq, index) => (
          <View 
            key={faq.id} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <View 
              className='faq-header'
              onClick={() => handleToggle(index)}
            >
              <View className='header-content'>
                <Text className='question'>{faq.question}</Text>
                {faq.category && (
                  <Text className='category'>{faq.category}</Text>
                )}
              </View>
              <View className='arrow' />
            </View>
            {openIndex === index && (
              <View className='faq-content'>
                <Text className='answer'>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}