// types.ts
export interface CaseImage {
    beforeImage: string
    afterImage: string
    description: string
  }
  
  export interface CaseData {
    id: number
    title: string
    type: string
    description: string
    beforeImage: string
    afterImage: string
    area: string
    location: string
    date: string
    duration: string
    solution: string
    process: string[]
    images: CaseImage[]
  }
  
  export interface CaseFilterOption {
    label: string
    value: string
  }
  
  export interface CasePageState {
    cases: CaseData[]
    loading: boolean
    error: string | null
    currentType: string
    searchValue: string
    showDetail: boolean
    selectedCase: CaseData | null
    page: number
    hasMore: boolean
  }