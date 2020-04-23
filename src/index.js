class A {
  constructor() {
  }
}

console.log('111')

// 增加以下代码才能保证HMR不刷新整个页面
if(module && module.hot) {
  module.hot.accept()
}
