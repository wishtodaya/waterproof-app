// app.config.ts
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/project/index',
    'pages/cases/index',
    'pages/contact/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '防水服务',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f6f6f6'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#2563eb',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tab-bar/home.png',
        selectedIconPath: 'assets/tab-bar/home-active.png'
      },
      {
        pagePath: 'pages/project/index',
        text: '服务',
        iconPath: 'assets/tab-bar/service.png',
        selectedIconPath: 'assets/tab-bar/service-active.png'
      },
      {
        pagePath: 'pages/cases/index',
        text: '案例',
        iconPath: 'assets/tab-bar/case.png',
        selectedIconPath: 'assets/tab-bar/case-active.png'
      },
      {
        pagePath: 'pages/contact/index',
        text: '联系我们',
        iconPath: 'assets/tab-bar/contact.png',
        selectedIconPath: 'assets/tab-bar/contact-active.png'
      }
    ]
  }
})