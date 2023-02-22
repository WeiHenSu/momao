<template>
  <!-- 版頭 -->
  <NavbarComponent></NavbarComponent>
  <!-- 內頁Banner -->
  <PagebannerComponent></PagebannerComponent>
  <!-- 內容 -->
  <div class="container pt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
  <!-- 版腳 -->
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import PagebannerComponent from '@/components/PagebannerComponent.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '../methods/emitter'

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    PagebannerComponent,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style>
  .breadcrumb-item a {
    color: #23316E;
    text-decoration: none;
  }
  .breadcrumb-item a:hover {
    color: #ED7120;
    transition: 0.3s ease all;
  }
</style>
