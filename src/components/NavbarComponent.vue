<template>
    <header>
        <div class="nav-fixed w-100" :class="{ fixed : checkActive}">
            <!-- 跑馬燈 -->
            <Vue3Marquee :duration="40">
              <span class="marqueeText fw-bold text-white py-2 ms-5">輸入優惠碼：elden ring 即享40%優惠！！</span>
            </Vue3Marquee>
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
                            <!-- 全部商品 -->
                            <li class="nav-item">
                                <router-link to="/userboard/productlist" class="nav-link fw-bold" aria-current="page" href="#">全部商品</router-link>
                            </li>
                            <!-- 查詢訂單 -->
                            <li class="nav-item">
                                <router-link to="/userboard/search" class="nav-link fw-bold" aria-current="page" href="#">查詢訂單</router-link>
                            </li>
                            <!-- 常見問題 -->
                            <li class="nav-item">
                                <router-link to="/userboard/qa" class="nav-link fw-bold" aria-current="page" href="#">常見問題</router-link>
                            </li>
                            <!-- 關於momao -->
                            <li class="nav-item">
                                <router-link to="/userboard/about" class="nav-link fw-bold" aria-current="page" href="#">關於摸毛</router-link>
                            </li>
                            <!-- 登入 -->
                            <li class="nav-item mob">
                                <router-link to="/login" class="nav-link fw-bold" aria-current="page" href="#">登入</router-link>
                            </li>
                            <!-- 購物車 -->
                            <li class="nav-item mob">
                              <NavCart></NavCart>
                            </li>
                        </ul>
                        <div class="iconArea d-flex">
                            <router-link to="/login" href="#" class="icon text-secondary">
                                <i class="bi bi-person-circle"></i>
                            </router-link>
                            <NavCart></NavCart>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import emitter from '../methods/emitter'
import NavCart from './NavCart.vue'
export default {
  data () {
    return {
      checkActive: false
    }
  },
  components: {
    NavCart
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.checkActive = window.scrollY > 0
    }
  }
}
</script>

<style>
  .marquee {
    background-color: #333;
  }
  .marqueeText {
    font-size: 12px;
  }
  .logo {
    width: 100px
  }
  .icon i{
    font-size: 24px
  }
  .nav-fixed{
    position: fixed;
    z-index: 999;
    transition: 0.3s ease all;
  }
  .nav-fixed.fixed {
    background-color: #fff;
  }
  .nav-item.mob {
    display: none;
  }
  @media(max-width:990px){
    .nav-fixed{
      background-color: #fff;
    }
    .iconArea {
      display: none !important;
    }
    .nav-item {
      border-bottom: 1px solid #ccc;
      text-align: center;
    }
    .nav-item:first-child {
      border-top: 1px solid #ccc;
    }
    .nav-item.mob {
      display: block;
    }
  }
</style>
