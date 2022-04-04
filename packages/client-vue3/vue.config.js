const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.output.libraryTarget('system')
    // config.output.filename('./[name].js')
    // config.output.chunkFilename('./[name].js')
  },
  devServer: {
    port: 9002
  }
})
