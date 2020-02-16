const path = require('path')
const isPro = process.env.NODE_ENV === 'production'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    productionSourceMap: false,
    
    
    chainWebpack: config => {
        config.resolve.alias
            .set('_views', path.resolve(__dirname, './src/views'))
    },

    configureWebpack: config => {
        if (isPro) {
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        // 文件名
                        filename: '[path].gz[query]',
                        // 使用gzip
                        algorithm: 'gzip',
                        // 处理css和js文件
                        test: new RegExp('\\.(js|css)$'),
                        // 处理大小
                        threshold: 10240,
                        // 最小压缩比达到0.8才会被压缩
                        minRatio: 0.8,
                    })
                ]
            }
        }
    }
}