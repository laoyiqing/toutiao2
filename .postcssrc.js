// postcss 配置文件
module.exports = {
  //  配置要使用的postcss插件
  plugins: {
    //  配置使用autoprefixer插件
    //  作用：生成浏览器css样式规则前缀
    // VueCli 内部已经配置了autoprefixer插件
    //  所以又配置一次冲突了，所以产生了冲突
    // 'autoprefixer': {
    //  配置到兼容的环境信息
    // browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    //  配置使用postcss-pxtorem插件
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 如果是vant的样式，就按照37.5来转换
        // 如果是我们自己的样式，就按照75来转换
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 75,
      // *表示所有
      // 表示所有属性都得转
      propList: ['*'],

      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
