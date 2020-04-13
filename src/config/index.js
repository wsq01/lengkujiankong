export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '冷库监控平台',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    csrc: '//www.sscs58.com:8012',
    rt: '//www.sscs58.com:8013',
    hd: '//www.sscs58.com:8014'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home'
}
