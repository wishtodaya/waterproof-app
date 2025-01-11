// app.tsx
import { PropsWithChildren } from 'react'
import { useLaunch, useError, getStorageSync, setStorageSync, onNetworkStatusChange } from '@tarojs/taro'
import './styles/custom-theme.scss'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    initApp()
  })

  useError((error) => {
    console.error('App Error:', error)
  })

  const initApp = async () => {
    try {
      // 初始化日志
      const logs = getStorageSync('logs') || []
      logs.unshift(Date.now())
      setStorageSync('logs', logs)

      // 网络状态监听
      onNetworkStatusChange((res) => {
        console.log('network status:', res.isConnected)
      })

    } catch (error) {
      console.error('App initialization failed:', error)
    }
  }

  return children
}

export default App