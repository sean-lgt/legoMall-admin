export default {
  // 判断当前运行环境  设置域名
  development: {
    baseUrl: '/api' // 测试接口域名
  },
  beta: {
    baseUrl:"http://mobile.seantao5.xyz/server/api/v1/api/admin"

    // baseUrl: ' http://backend-api-02.newbee.ltd/manage-api/v1' // 测试接口域名
  },
  release: {
    // baseUrl: 'http://backend-api-02.newbee.ltd/manage-api/v1' // 正式接口域名
    baseUrl:"http://mobile.seantao5.xyz/server/api/v1/api/admin"
  }
}