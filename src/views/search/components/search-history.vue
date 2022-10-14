<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- 全部删除按钮绑定事件，触发自定义事件 -->
      <span @click="$emit('clear-search-histories')">全部删除</span>
      &nbsp;
      <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <!-- 每个van-cell点击的时候删除 -->
    <van-cell
    :title="item"
    v-for="(item,index) in searchHistories"
    :key="index"
    @click="onHistoryClick(item,index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // 搜索历史，接收外部传入数据
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false,
      mySearchHistories: this.searchHistories
    }
  },
  methods: {
    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        // 删除历史记录
        this.mySearchHistories.splice(index, 1)
      } else {
        // 执行搜索操作
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
