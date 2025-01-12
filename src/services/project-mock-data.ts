// services/project-mock-data.ts
export const mockServices = [
  {
    id: 1,
    title: '卫生间防水',
    price: 100,
    unit: '平米起',
    type: 'home',
    description: '专业卫生间防水施工，解决渗漏问题',
    features: ['耐候耐磨', '持久防护', '无缝施工'],
    process: [
      { step: 1, title: '问题诊断', description: '专业检测漏水原因' },
      { step: 2, title: '制定方案', description: '根据具体情况定制解决方案' },
      { step: 3, title: '规范施工', description: '按标准流程进行施工' },
      { step: 4, title: '成效检验', description: '严格验收确保效果' }
    ],
    estimatedDuration: '1-2天',
    minArea: 1,
    maxArea: 20,
    warranty: '十年质保'
  },
  {
    id: 2,
    title: '外墙防水',
    price: 150,
    unit: '平米起',
    type: 'outdoor',
    description: '全方位外墙防水，根治渗漏难题',
    features: ['高空作业', '全面防护', '防紫外线'],
    process: [
      { step: 1, title: '现场勘察', description: '专业评估渗漏范围' },
      { step: 2, title: '方案设计', description: '定制专业解决方案' },
      { step: 3, title: '精细施工', description: '标准化施工流程' },
      { step: 4, title: '质量验收', description: '多重检验标准' }
    ],
    estimatedDuration: '3-5天',
    minArea: 50,
    maxArea: 1000,
    warranty: '五年质保'
  },
  {
    id: 3,
    title: '地下室防水',
    price: 200,
    unit: '平米起',
    type: 'industrial',
    description: '专业地下室防水工程，彻底解决渗水问题',
    features: ['防积水', '耐腐蚀', '抗压防渗'],
    process: [
      { step: 1, title: '渗漏检测', description: '全面排查隐患' },
      { step: 2, title: '工程设计', description: '系统解决方案' },
      { step: 3, title: '专业施工', description: '工艺流程标准化' },
      { step: 4, title: '竣工验收', description: '确保施工质量' }
    ],
    estimatedDuration: '5-7天',
    minArea: 100,
    maxArea: 2000,
    warranty: '八年质保'
  }
  // ... 更多服务
];

export const mockFaqs = [
  {
    id: 1,
    question: '防水工程需要多久才能完工？',
    answer: '工期取决于面积和施工难度，一般小面积(20㎡内)1-2天，大面积3-7天。',
    category: '施工周期'
  },
  {
    id: 2,
    question: '防水材料有哪些品牌可以选择？',
    answer: '我们使用国际知名品牌防水材料，包括XX、YY等，可根据需求选择。',
    category: '材料选择'
  },
  {
    id: 3,
    question: '施工后多久可以正常使用？',
    answer: '一般建议24-48小时后可以正常使用，具体时间视材料和天气情况而定。',
    category: '使用说明'
  },
  {
    id: 4,
    question: '防水工程的质保期是多久？',
    answer: '根据不同项目提供5-10年不等的质保服务，具体以合同约定为准。',
    category: '售后保障'
  }
  // ... 更多FAQ
];