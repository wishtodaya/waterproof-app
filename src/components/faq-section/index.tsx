// components/faq-section/index.tsx
import { useState, useCallback, memo } from 'react'
import { View, Text } from '@tarojs/components'
import type { FAQ } from '../../types'
import './index.scss'

interface FAQItemProps {
  faq: FAQ
  isOpen: boolean
  onToggle: (id: number) => void
}

const FAQItem = memo(({ faq, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = useCallback(() => {
    onToggle(faq.id)
  }, [faq.id, onToggle])

  return (
    <View className={`faq-item ${isOpen ? 'faq-item--active' : ''}`}>
      <View className='faq-item__header' onClick={handleClick}>
        <View className='faq-item__main'>
          <Text className='faq-item__question'>{faq.question}</Text>
          {faq.category && (
            <Text className='faq-item__category'>{faq.category}</Text>
          )}
        </View>
        <View className='faq-item__arrow' />
      </View>

      <View className='faq-item__content'>
        <Text className='faq-item__answer'>{faq.answer}</Text>
      </View>
    </View>
  )
})

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
  defaultOpenIds?: number[]
  onFAQOpen?: (id: number) => void
  onFAQClose?: (id: number) => void
}

export const FAQSection = memo(({
  faqs,
  title = '常见问题',
  className = '',
  defaultOpenIds = [],
  onFAQOpen,
  onFAQClose
}: FAQSectionProps) => {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(() => 
    new Set(defaultOpenIds)
  )

  const handleToggle = useCallback((id: number) => {
    setOpenFAQs(prev => {
      const newOpenFAQs = new Set(prev)
      if (newOpenFAQs.has(id)) {
        newOpenFAQs.delete(id)
        onFAQClose?.(id)
      } else {
        newOpenFAQs.add(id)
        onFAQOpen?.(id)
      }
      return newOpenFAQs
    })
  }, [onFAQOpen, onFAQClose])

  if (!faqs?.length) return null

  return (
    <View className={`faq-section ${className}`}>
      <Text className='faq-section__title'>{title}</Text>
      <View className='faq-section__list'>
        {faqs.map(faq => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openFAQs.has(faq.id)}
            onToggle={handleToggle}
          />
        ))}
      </View>
    </View>
  )
})

export default FAQSection