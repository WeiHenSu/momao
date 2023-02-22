<template>
    <!-- 版頭 -->
    <RNavbarComponent></RNavbarComponent>
    <!-- 內容 -->
    <div class="rootBackground py-5">
        <div class="container-xl mt-3 position-relative">
            <ToastMessages></ToastMessages>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import RNavbarComponent from '@/components/RNavbarComponent.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '../methods/emitter'

export default {
  components: {
    RNavbarComponent,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    // 檢查用戶是否仍持續登入 參考文件:https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    const token = document.cookie.split('; ').find((row) => row.startsWith('loginToken='))?.split('=')[1]
    // console.log(token)
    // Global axios defaults 參考文件:https://github.com/axios/axios
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.axios.post(api).then((res) => {
      console.log('Root：', res.data.success)
      if (!res.data.success) {
        alert('您已登出，請重新登入')
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style>
  .rootBackground {
    background-image: url('../assets/img/background2.jpg');
    background-repeat: repeat;
  }
</style>
