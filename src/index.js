class A {
  constructor() {
  }
}

console.log('111')

// 增加以下代码才能保证HMR不刷新整个页面，只有dev模式下开启
if(isDev && module && module.hot) {
  module.hot.accept()
}
