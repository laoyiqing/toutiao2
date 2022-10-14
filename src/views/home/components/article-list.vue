<template>
  <div class='article-list'>
    <van-pull-refresh
    v-model=" isreFreshLoading"
    :success-text= "refreshSucceText"
    :success-duration = "1500"
    @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
        v-for="(article,index) in list"
        :key="index"
        :article="article"
        />
       <!-- <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title" /> -->
       </van-list>
    </van-pull-refresh>
  </div>
  </template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      refreshSucceText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          // timestamp 简单理解就是请求数据的页码
          // 请求第1页数据：当前最新时间戳
          // 用于请求之后的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的情状
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }

        // 2.把请求结果数据放到 list 数组中
        const { results } = data.data
        // 数组的展示操作符，它会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3.本次数据加载结束以后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将finished 设置为true，不再load加载更多
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true

        // 请求失败了，loading也需要关闭了
        this.loading = false
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 下拉刷新每次请求最新数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的情状
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajndjsa')
        // }
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的loading 状态
        this.isreFreshLoading = false
        // 更新下拉刷新成功提示文本
        this.refreshSucceText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.refreshSucceText = '刷新失败'
      }
    }
  },
  mounted () {}
}
</script>
  <style lang='less' scoped>
    .article-list{
      height: 79vh;
      overflow-y: auto;
    }
  </style>
