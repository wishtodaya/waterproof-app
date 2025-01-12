// components/faq-section/index.tsx
import { memo, useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import type { FAQ } from '../../types'
import './index.scss'

interface FAQSectionProps {
  faqs: FAQ[]
}

export const FAQSection = memo(function FAQSection({
  faqs
}: FAQSectionProps) {
  const [activeId, setActiveId] = useState<number | null>(null)

  const handleToggle = useCallback((id: number) => {
    setActiveId(current => current === id ? null : id)
  }, [])

  return (
    <View className='faq-section'>
      <Text className='section-title'>常见问题</Text>
      <View className='faq-list'>
        {faqs.map(faq => (
          <View 
            key={faq.id}
            className={`faq-item ${activeId === faq.id ? 'expanded' : ''}`}
            onClick={() => handleToggle(faq.id)}
          >
            <View className='faq-header'>
              <View className='question-wrap'>
                <Text className='faq-question'>{faq.question}</Text>
                {faq.category && (
                  <Text className='faq-category'>{faq.category}</Text>
                )}
              </View>
              <View className='expand-icon' />
            </View>
            <View className='faq-content'>
              <Text className='faq-answer'>{faq.answer}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
})