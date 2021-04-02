const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('progress')
    config.plugins.delete('prefetch')
    config
      .plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [
        {
          format: 'minimal', // options are minimal, compact, expanded, verbose
        },
      ])
    config.plugin('preload').tap((options) => {
      options[0].include = 'allChunks'
      return options
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              return `npm.${packageName.replace('@', '')}`
            },
          },
        },
      },
    },
    plugins: [new CompressionWebpackPlugin()],
  },
  css: {
    sourceMap: true,
  },
  devServer: {
    port: 3000,
    disableHostCheck: true, // process.env.NODE_ENV === 'development'
    useLocalIp: false,
    progress: false,
  },
  publicPath: '/',
  transpileDependencies: ['resize-detector', 'vuex-persist'],
}
