import type { CaseData } from '../../components/case-card/types'

// 使用相对路径引用图片
const IMAGES = {
    BEFORE: require('../../assets/case/case_before.png'),
    AFTER: require('../../assets/case/case_after.png'),
    DETAIL: require('../../assets/case/case_detail.png')
  }

export const mockCases: CaseData[] = [
  {
    id: 1,
    title: '某小区地下车库防水工程',
    type: '地下防水',
    description: '解决地下车库长期渗水问题，采用双重防水层设计，彻底解决渗漏',
    beforeImage: IMAGES.BEFORE,
    afterImage: IMAGES.AFTER,
    area: '2000㎡',
    location: '北京市朝阳区',
    date: '2024-01',
    duration: '15天',
    solution: '1. 采用环保型双组份聚氨酯防水涂料\n2. 加强型SBS改性沥青防水卷材\n3. 设计科学的排水系统\n4. HDPE防水板加固保护',
    process: [
      '现场勘察检测',
      '基层处理找平',
      '防水材料施工',
      '排水系统安装',
      '细部节点处理',
      '养护及验收'
    ],
    images: [
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '车库出入口渗漏点修复'
      },
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '顶板裂缝渗水处理'
      }
    ]
  },
  {
    id: 2,
    title: '高层住宅外墙防水施工',
    type: '外墙防水',
    description: '针对高层建筑外墙渗水、保温层受损等问题进行系统性修复',
    beforeImage: IMAGES.BEFORE,
    afterImage: IMAGES.AFTER,
    area: '3500㎡',
    location: '上海市浦东新区',
    date: '2024-02',
    duration: '20天',
    solution: '1. 外墙裂缝修补\n2. 防水涂料喷涂\n3. 保温层修复\n4. 装饰面层施工',
    process: [
      '外墙清洗除锈',
      '裂缝修补加固',
      '防水层施工',
      '保温层修复',
      '面层装饰施工',
      '整体验收'
    ],
    images: [
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '外墙裂缝修补'
      },
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '窗户周边防水处理'
      }
    ]
  },
  {
    id: 3,
    title: '工业厂房屋面防水工程',
    type: '屋面防水',
    description: '大型工业厂房屋面防水改造，解决漏雨、保温等综合问题',
    beforeImage: IMAGES.BEFORE,
    afterImage: IMAGES.AFTER,
    area: '5000㎡',
    location: '广州市番禺区',
    date: '2024-03',
    duration: '25天',
    solution: '1. 原有防水层清理\n2. 基层找平整修\n3. 专业防水卷材铺设\n4. 保温隔热层施工',
    process: [
      '屋面清理除锈',
      '基层修复找平',
      '防水卷材铺设',
      '节点细部处理',
      '保温层施工',
      '总体验收'
    ],
    images: [
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '屋面防水层铺设'
      },
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '天窗周边防水处理'
      }
    ]
  },
  {
    id: 4,
    title: '地下室防水堵漏工程',
    type: '地下防水',
    description: '商业大厦地下室渗水治理，采用综合防水方案确保干爽',
    beforeImage: IMAGES.BEFORE,
    afterImage: IMAGES.AFTER,
    area: '1800㎡',
    location: '深圳市南山区',
    date: '2024-03',
    duration: '18天',
    solution: '1. 渗漏点定位处理\n2. 注浆防水施工\n3. 防水层铺设\n4. 排水系统优化',
    process: [
      '渗漏点检测',
      '注浆堵漏',
      '防水层施工',
      '排水沟改造',
      '细部防水',
      '效果验收'
    ],
    images: [
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '地下室墙面防水'
      },
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '电梯井防水处理'
      }
    ]
  },
  {
    id: 5,
    title: '屋顶花园防水工程',
    type: '屋面防水',
    description: '别墅屋顶花园防水改造，确保绿化环境与建筑防水性能',
    beforeImage: IMAGES.BEFORE,
    afterImage: IMAGES.AFTER,
    area: '300㎡',
    location: '杭州市西湖区',
    date: '2024-04',
    duration: '12天',
    solution: '1. 种植屋面系统设计\n2. 防根穿刺层施工\n3. 排水系统优化\n4. 种植土改良',
    process: [
      '原有层清理',
      '防水层施工',
      '隔根层铺设',
      '排水层施工',
      '种植土铺设',
      '绿化验收'
    ],
    images: [
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '屋顶防水层施工'
      },
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '排水系统安装'
      }
    ]
  },
  {
    id: 6,
    title: '游泳池防水维修工程',
    type: '特种防水',
    description: '大型室外游泳池防水层老化修复，提升防水性能',
    beforeImage: IMAGES.BEFORE,
    afterImage: IMAGES.AFTER,
    area: '800㎡',
    location: '成都市武侯区',
    date: '2024-04',
    duration: '16天',
    solution: '1. 专业防水涂料施工\n2. 环保型防水材料\n3. 接缝处理加强\n4. 防滑层施工',
    process: [
      '池体清理',
      '裂缝修补',
      '防水层施工',
      '细部处理',
      '防滑层施工',
      '蓄水试验'
    ],
    images: [
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '池体防水施工'
      },
      {
        beforeImage: IMAGES.DETAIL,
        afterImage: IMAGES.DETAIL,
        description: '防滑层处理'
      }
    ]
  }
]