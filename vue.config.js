const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/dev-api': {
        target: 'http://localhost:8088', // 后端服务地址
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': '', // 将 '/dev-api' 替换为空
        },
      },
    },
    port: 80, // 前端开发服务器端口
  },
});
