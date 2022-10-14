const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true

})
// const { defineConfig } = require('@vue/cli-service');
// const path = require('path');
// module.exports = defineConfig({
//     transpileDependencies: true,
//     chainWebpack: config => {
//         config.resolve.alias.set('@src', path.resolve(__dirname, 'src'));
//     },
//     pluginOptions: {
//         'style-resources-loader': {
//             preProcessor: 'less',
//             patterns: [path.resolve(__dirname, 'src/assets/less/mixins.less')],
//         },
//     },
// });
