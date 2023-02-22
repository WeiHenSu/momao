<template>
    <header>
        <div class="nav">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <router-link to="/" class="navbar-brand logo">
                        <img src="../assets/logo3.png" class="w-100 h-auto">
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <!-- 產品 -->
                            <li class="nav-item">
                                <router-link to="/rootboard/rootproductlist" class="nav-link fw-bold" aria-current="page">產品</router-link>
                            </li>
                            <!-- 訂單 -->
                            <li class="nav-item">
                                <router-link to="/rootboard/rootorderlist" class="nav-link fw-bold" aria-current="page">訂單</router-link>
                            </li>
                            <!-- 優惠券 -->
                            <li class="nav-item">
                                <router-link to="/rootboard/rootcouponlist" class="nav-link fw-bold" aria-current="page">優惠券</router-link>
                            </li>
                            <!-- 登出 -->
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click.prevent="logout">登出</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>

export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api).then((res) => {
        console.log('logout', res.data.success)
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style>
  .logo {
    width: 100px
  }
  .icon i{
    font-size: 24px
  }
  .nav {
    border-bottom: 1px solid #ccc;
  }
</style>
