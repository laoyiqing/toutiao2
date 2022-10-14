<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-var"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
    />
    <!-- /导航栏 -->

      <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
      >

    <!-- 个人信息 -->
    <van-cell
    title="头像"
    is-link
    center
    @click="$refs.file.click()"
    >
        <van-image
            class="avatar"
            fit="cover"
            round
            :src="user.photo"
        />
    </van-cell>
    <van-cell
    title="昵称"
    :value="user.name"
    is-link
    @click="isUpdataNameShow = true"
    />
    <van-cell
    title="性别"
    :value="user.gender === 0 ? '男' : '女'"
    is-link
    @click="isUpdataGenderShow = true"
    />
    <van-cell
    title="生日"
    :value="user.birthday"
    is-link
    @click="isUpdataBirthdayShow = true"
    />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup
    v-model="isUpdataNameShow"
    style="height:100%;"
    position="bottom"
    >
      <updata-name
      v-if="isUpdataNameShow"
      @close="isUpdataNameShow = false"
      v-model="user.name"
      />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup
    v-model="isUpdataGenderShow"
    position="bottom"
    >
     <updata-gender
     v-if="isUpdataGenderShow"
     v-model="user.gender"
     @close="isUpdataGenderShow = false"
     />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
    v-model="isUpdataBirthdayShow"
    position="bottom"
    >
    <updata-birthday
    v-if="isUpdataBirthdayShow"
    v-model="user.birthday"
    @close="isUpdataBirthdayShow = false"
    />
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup
    v-model="isUpdataPhotoShow"
    position="bottom"
    style="height:100%;"
    >
    <updata-photo
    v-model="isUpdataPhotoShow"
    :img="img"
    @close="isUpdataPhotoShow = false"
    @updata-photo="user.photo = $event"
    />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdataName from './components/updata-name'
import UpdataGender from './components/updata-gender'
import UpdataBirthday from './components/updata-birthday'
import UpdataPhoto from './components/updata-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataPhoto

  },
  data () {
    return {
      user: {}, // 个人信息
      isUpdataNameShow: false,
      isUpdataGenderShow: false,
      isUpdataBirthdayShow: false,
      isUpdataPhotoShow: false,
      img: null // 预览的图片
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)

      // 展示预览图片弹出层
      this.isUpdataPhotoShow = true

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决方法就是每次使用完毕以后，把它的 value 清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
    .user-profile{
        .avatar{
            width: 60px;
            height: 60px;
        }

        .van-popup{
          background-color: #f5f7f9;
        }
    }
</style>
