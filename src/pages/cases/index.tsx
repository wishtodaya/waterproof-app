import { useState, useCallback, useEffect, useRef } from "react"
import { View, Text, ScrollView } from "@tarojs/components"
import Taro, { useDidShow, useShareAppMessage } from "@tarojs/taro"
import { SearchBar } from "../../components/search-bar"
import { TabBar } from "../../components/tab-bar"
import { CaseCard } from "../../components/case-card"
import { CaseDetailModal } from "../../components/case-detail-modal"
import { casesApi } from "../../services/cases/api"
import { handleError } from "../../utils/error"
import type { CaseData } from "../../components/case-card/types"
import "./index.scss"

const CASES_TYPES = [
  { title: "全部", value: "all" },
  { title: "地下防水", value: "地下防水" },
  { title: "外墙防水", value: "外墙防水" },
  { title: "屋面防水", value: "屋面防水" },
]

const PAGE_SIZE = 10

export default function Cases() {
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [cases, setCases] = useState<CaseData[]>([])
  const [currentType, setCurrentType] = useState<string | number>("all")
  const [keyword, setKeyword] = useState("")
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const searchTimer = useRef<NodeJS.Timeout>()
  const loadingRef = useRef(false)

  useShareAppMessage(() => ({
    title: "防水工程案例展示",
    path: "/pages/cases/index",
  }))

  const loadCases = useCallback(
    async (isRefresh = false) => {
      if (loadingRef.current) return
      loadingRef.current = true

      try {
        const currentPage = isRefresh ? 1 : page
        !refreshing && setLoading(true)

        const res = await casesApi.getCases({
          type: currentType.toString(),
          keyword,
          page: currentPage,
          pageSize: PAGE_SIZE,
        })

        setCases((prev) => (isRefresh ? res.data : [...prev, ...res.data]))
        setHasMore(res.data.length === PAGE_SIZE)
        isRefresh && setPage(1)
      } catch (err) {
        Taro.showToast({
          title: handleError(err),
          icon: "none",
          duration: 2000,
        })
      } finally {
        setLoading(false)
        setRefreshing(false)
        loadingRef.current = false
      }
    },
    [currentType, keyword, page, refreshing],
  )

  useEffect(() => {
    setPage(1)
    loadCases(true)
  }, [currentType, keyword, loadCases])

  useDidShow(() => {
    !loading && loadCases(true)
  })

  const handleSearch = useCallback(
    (value: string) => {
      setKeyword(value)
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
      searchTimer.current = setTimeout(() => {
        setPage(1)
        loadCases(true)
      }, 500)
    },
    [loadCases],
  )

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadCases(true)
    Taro.stopPullDownRefresh()
  }, [loadCases])

  const handleReachBottom = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1)
      loadCases()
    }
  }, [hasMore, loading, loadCases])

  const handleCaseClick = useCallback(async (id: number) => {
    try {
      setLoading(true)
      const res = await casesApi.getCaseDetail(id)
      setSelectedCase(res.data)
      setShowDetail(true)
    } catch (err) {
      Taro.showToast({
        title: handleError(err),
        icon: "none",
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const handleBook = useCallback(async (data: CaseData) => {
    try {
      await Taro.setStorage({
        key: "selected_case",
        data,
      })
      await Taro.switchTab({
        url: "/pages/contact/index",
      })
    } catch (err) {
      Taro.showToast({
        title: handleError(err),
        icon: "none",
        duration: 2000,
      })
    }
  }, [])

  return (
    <View className="cases">
      <View className="cases__header">
        <SearchBar value={keyword} placeholder="搜索工程案例" onChange={handleSearch} loading={loading} />
        <TabBar tabs={CASES_TYPES} activeTab={currentType} onChange={(value) => setCurrentType(value)} />
      </View>

      <ScrollView
        className="cases__content"
        scrollY
        onScrollToLower={handleReachBottom}
        enableBackToTop
        enhanced
        bounces
        showScrollbar={false}
      >
        <View className="cases__wrapper">
          {loading && page === 1 ? (
            <View className="cases__loading">
              {[1, 2].map((i) => (
                <View key={i} className="case-card case-card--loading">
                  <View className="case-card__images">
                    <View className="case-card__image case-card__skeleton" />
                    <View className="case-card__image case-card__skeleton" />
                  </View>
                  <View className="case-card__content">
                    <View className="case-card__header">
                      <View className="case-card__title case-card__skeleton" />
                      <View className="case-card__type case-card__skeleton" />
                    </View>
                    <View className="case-card__desc case-card__skeleton" />
                    <View className="case-card__meta">
                      <View className="case-card__meta-item case-card__skeleton" />
                      <View className="case-card__meta-item case-card__skeleton" />
                      <View className="case-card__meta-item case-card__skeleton" />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : cases.length > 0 ? (
            <View className="cases__list">
              {cases.map((item, index) => (
                <View key={item.id} className={`cases__item cases__item-${index + 1}`}>
                  <CaseCard data={item} onClick={() => handleCaseClick(item.id)} />
                </View>
              ))}
            </View>
          ) : (
            <View className="cases__empty">
              <Text>暂无相关案例</Text>
            </View>
          )}

          {loading && page > 1 && (
            <View className="cases__loading-more">
              <Text>加载中...</Text>
            </View>
          )}

          {!loading && !hasMore && cases.length > 0 && (
            <View className="cases__no-more">
              <Text>已经到底啦</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CaseDetailModal
        isOpen={showDetail}
        data={selectedCase}
        onClose={() => setShowDetail(false)}
        onBook={handleBook}
      />
      <View className="cases__safe-area" />
    </View>
  )
}