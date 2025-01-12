// components/process-steps/index.tsx
import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import type { ProcessStep } from '../../types'
import './index.scss'

interface ProcessStepsProps {
  steps: ProcessStep[]
}

export const ProcessSteps = memo(function ProcessSteps({
  steps
}: ProcessStepsProps) {
  return (
    <View className='process-steps'>
      {/* 标题 */}
      <View className='process-title'>
        <Text>服务流程</Text>
      </View>

      {/* 步骤列表 */}
      <View className='steps-container'>
        {steps.map((step, index) => (
          <View key={step.step} className='step-item'>
            {/* 步骤序号 */}
            <View className='step-number'>
              <Text>{step.step}</Text>
            </View>
            
            {/* 步骤标题 */}
            <Text className='step-title'>{step.title}</Text>
            
            {/* 步骤描述 */}
            <Text className='step-desc'>{step.description}</Text>
            
            {/* 连接线 - 除了最后一个步骤都显示 */}
            {index < steps.length - 1 && (
              <View className='step-connector' />
            )}
          </View>
        ))}
      </View>
    </View>
  )
})