// 使用 node 启动临时服务器
const server = require('pushstate-server')

server.start({
  port: 5008,
  directory: './dist'
})
