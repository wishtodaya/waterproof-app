import type { Banner, ServiceCase, ServiceAdvantage } from '../../types'

export const mockBanners: Banner[] = [
  {
    id: 1,
    title: '品质服务保障',
    subtitle: '十年质保 终身维护',
    imageUrl: require('../../assets/banner/banner1.png')
  },
  {
    id: 2,
    title: '专业防水服务',
    subtitle: '一站式解决您的渗漏问题',
    imageUrl: require('../../assets/banner/banner2.png')
  }
]

export const mockCases: ServiceCase[] = [
  {
    id: 1,
    title: '地铁站防水工程',
    description: '为北京新建地铁站提供防水保护',
    imageUrl: require('../../assets/case/case1.png'),
    content: '本项目是为北京市政新建地铁站提供的整体防水解决方案。采用了最新的防水材料和工艺，确保地铁站在使用寿命内不会出现渗漏问题。项目包括防水设计、材料选型、施工和验收等全过程服务。',
    type: '基础设施',
    date: '2024-01-06',
    views: 1280
  },
  {
    id: 2,
    title: '商业建筑防水工程',
    description: '为上海某商业建筑提供全面防水解决方案',
    imageUrl: require('../../assets/case/case2.png'),
    content: '该项目是为上海某大型商业综合体提供的防水维护服务。主要解决了建筑外墙渗水、地下车库渗漏等问题。采用了环保型防水材料，确保了防水效果的同时也保护了环境。',
    type: '商业建筑',
    date: '2024-01-05',
    views: 960
  },
  {
    id: 3,
    title: '住宅小区防水工程',
    description: '为广州某高档住宅小区提供屋面防水服务',
    imageUrl: require('../../assets/case/case2.png'),
    content: '本项目为广州某高档住宅小区提供整体屋面防水服务。采用了先进的防水技术和材料，解决了房屋渗漏问题，提高了居民的生活质量。项目获得了业主的一致好评。',
    type: '住宅建筑',
    date: '2024-01-04',
    views: 756
  }
]

export const mockAdvantages: ServiceAdvantage[] = [
  {
    id: 1,
    icon: '🏅',
    value: '100+',
    label: '专业认证'
  },
  {
    id: 2,
    icon: '⏱️',
    value: '30分钟',
    label: '快速响应'
  },
  {
    id: 3,
    icon: '📊',
    value: '1000+',
    label: '成功案例'
  },
  {
    id: 4,
    icon: '😊',
    value: '99%',
    label: '客户满意'
  }
]

