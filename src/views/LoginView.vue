<template>
    <div class="container mt-5">
        <form class="row justify-content-center" @submit.prevent="signIn">
        <div class="loginBox col-md-6 p-4">
            <div class="logo mx-auto pb-4">
                <router-link to="/">
                    <img src="../assets/logo3.png" class="w-100 h-auto">
                </router-link>
            </div>
            <div class="mb-3">
            <label for="inputEmail" class="sr-only mb-2">帳號 （電子郵件）</label>
            <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="請輸入電子信箱"
                required
                autofocus
                v-model="user.username"
            />
            <span v-if="checkPassword >= 1" class="text-danger ms-1"><small>帳號或密碼錯誤</small></span>
            </div>
            <div class="mb-2">
            <label for="inputPassword" class="sr-only mb-2">密碼</label>
            <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="請輸入密碼"
                required
                v-model="user.password"
            />
            </div>
            <div class="mt-4">
                <button class="btn sty2" type="submit">登入</button>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      checkPassword: 0
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user).then((res) => {
        console.log('login回應：', res.data)
        if (res.data.success) {
        // cookie參考文件 https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `loginToken=${token}; expires=${new Date(expired)}; SameSite=None; Secure`
          this.$router.push('/rootboard/rootproductlist')
        } else {
          if (this.checkPassword < 3) {
            alert('帳號密碼錯誤')
            this.checkPassword += 1
          } else {
            alert('錯誤次數過多，跳轉回首頁')
            this.checkPassword = 0
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>

<style>
  .logo {
    width: 150px;
  }
  .loginBox {
    box-shadow: 2px 2px 8px 2px #ccc;
  }
  .btn.sty2 {
    display: block;
    background-color: #23316E;
    color: #fff;
    padding: 5px 15px;
    margin: 0 auto;
    font-weight: bold;
  }
  .btn.sty2:hover {
    color: #23316E;
    border: 1px solid #23316E;
    transition: 0.3s ease all;
  }
</style>
