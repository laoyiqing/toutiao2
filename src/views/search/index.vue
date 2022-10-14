<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
        Tips: 在 van-search 外层增加 form 标签，
        且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
    -->
    <form class="search-form" action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          background="#3296fa"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultShow = false"
        />
      </form>
       <!-- /搜索栏 -->

      <!-- 搜索结果 -->
      <search-result
      v-if="isResultShow"
      :search-text="searchText"
      />
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      />
      <!-- /联想建议 -->

       <!-- 搜索历史记录 -->
       <search-history
       :search-histories="searchHistories"
       @clear-search-histories="searchHistories = []"
       @search="onSearch"
       v-else/>
       <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('search-histories') || [] // 初始化时的时候从本地存储获取数据 || 用来存储历史记录
    }
  },
  watch: {
    searchHistories (val) {
      // 同步到本地存储
      setItem('search-histories', val)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史计略
      // 要求：不要重复历史记录、最新的排在前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
    .search-container{
      padding-top:108px ;
        .van-search__action{
           color: #fff;
        }
        .search-form{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
    }
</style>
