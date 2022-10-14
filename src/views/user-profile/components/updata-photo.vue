<template>
  <div class="updata-photo">
    <img class="img" :src="img" ref="img">

    <div class="toolbar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updataUserPhoto } from '@/api/user'
export default {
  name: 'UpdataPhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      // 基于服务端的裁切使用 getData() 方法获取裁切参数
      //  console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas() 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updataUserPhoto(blob)
      })
    },
    async updataUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中……',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 错误用法
      // 如果接口要求 Content-Type 是 application/json
      // 则传递普通 JavaScript 对象
      // updataUserPhoto({
      //   photo:blob
      // })

        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则你必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await updataUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')

        // 更新视图
        this.$emit('updata-photo', data.data.photo)
        // 提示更新成功
        this.$toast.success('更新成功')
      } catch (err) {
        // 提示更新失败
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
   .updata-photo{
    background-color: #000;
    height: 100%;
    .toolbar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel,.confirm{
            width: 90px;
            height: 90px;
            font-size: 30px;
            display:flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

    }
   }
   .img{
    max-width: 100%;
    display: block;
    }

</style>
