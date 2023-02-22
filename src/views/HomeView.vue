<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <!-- 版頭 -->
  <NavbarComponent></NavbarComponent>
  <!-- 輪播區 -->
  <div class="swiperArea">
    <swiper class="swiper" :modules="modules" navigation :pagination="{ clickable: true }">
      <swiper-slide class="slide">
        <div class="pcBanner">
          <img src="../assets/img/banner2.webp">
        </div>
        <div class="mobileBanner">
          <img src="../assets/img/mbanner2.webp">
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class="pcBanner">
          <img src="../assets/img/banner3.webp">
        </div>
        <div class="mobileBanner">
          <img src="../assets/img/mbanner3.webp">
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <!-- ShopNow區 -->
  <div class="goShopArea row w-100 mx-0">
    <div class="goShop go1 col-lg-4 col-sm-12">
      <div class="goShopBtn">
        <router-link to="/userboard/productlist" href="#">SHOP NOW</router-link>
      </div>
    </div>
    <div class="goShop go2 col-lg-4 col-sm-12">
      <div class="goShopBtn">
        <router-link to="/userboard/productlist" href="#">SHOP NOW</router-link>
      </div>
    </div>
    <div class="goShop go3 col-lg-4 col-sm-12">
      <div class="goShopBtn">
        <router-link to="/userboard/productlist" href="#">SHOP NOW</router-link>
      </div>
    </div>
  </div>
  <!-- 新品上市區 -->
  <div class="container">
    <!-- 標題 -->
    <h3 class="indexTitle py-5 d-flex align-items-center">
      <span class="decoLine"></span>
      <p class="fw-bolder my-0 px-4">新品上市 The Latest</p>
      <span class="decoLine"></span>
    </h3>
    <div class="productList row">
      <div class="product col-lg-3 col-md-4 col-sm-6 mb-4" v-for="item in newProducts" :key="item.id">
        <router-link :to="`/userboard/product/${item.id}`">
          <img :src="item.imageUrl">
        </router-link>
        <div class="productText my-2">
            <p class="category mb-1 fw-bold"><small>{{ item.category }}</small></p>
            <router-link :to="`/userboard/product/${item.id}`">
                <p class="mb-1">{{ item.title }}</p>
            </router-link>
            <p class="price origin fst-italic text-muted mb-1" v-if="item.origin_price !== item.price"><del><small>NT${{ item.origin_price }}</small></del></p>
            <p class="price">NT${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 首頁背景區 -->
  <div class="backgroundArea mt-5">
    <div class="container">
      <div class="row py-5">
        <div class="backgroundtextArea col-lg-6 col-md-12 py-5 px-5">
          <p class="fs-2">Momaó - purrre台灣總代理</p>
          <p class="my-3 fs-4">「這個時代，寵物注定是非凡的」</p>
          <p class="fs-6">purrre於2019年創立，是以寵物原創設計用品為核心的寵物品牌，致力於探索，讓設計不只是好看而已，還賦予了對寵物的功能性，以一種革新的方式，將寵物用品融入生活。</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 購物須知區 -->
  <div class="container">
    <h3 class="indexTitle py-5 d-flex align-items-center">
      <span class="decoLine"></span>
      <p class="fw-bolder my-0 px-4">購物須知 Shopping Notes</p>
      <span class="decoLine"></span>
    </h3>
    <div class="noteList row py-4">
      <div class="col-lg-4 col-sm-4">
        <div class="notes d-flex flex-column align-items-center">
          <div class="notesHover mb-2">
            <i class="bi bi-bag"></i>
          </div>
          <p class="notesTitle">
            現貨商品
          </p>
          <p class="notesBrief text-center">
            賣場商品皆為現貨，可直接下單
          </p>
        </div>
      </div>
      <div class="col-lg-4 col-sm-4">
        <div class="notes d-flex flex-column align-items-center">
          <div class="notesHover mb-2">
            <i class="bi bi-box-seam"></i>
          </div>
          <p class="notesTitle">
            快速出貨
          </p>
          <p class="notesBrief text-center">
            下單後皆於24hr內快速出貨
          </p>
        </div>
      </div>
      <div class="col-lg-4 col-sm-4">
        <div class="notes d-flex flex-column align-items-center">
          <div class="notesHover mb-2">
            <i class="bi bi-arrow-repeat"></i>
          </div>
          <p class="notesTitle">
            退換守則
          </p>
          <p class="notesBrief text-center">
            您享有商品到貨七天猶豫期，
            <br>隨時可解約退貨之權益。
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- 首頁背景區 -->
  <div class="backgroundArea sty2">
    <div class="container">
      <div class="row py-5">
        <div class="backgroundSubsArea col-lg-6 col-md-12">
          <h3 class="fw-bolder">SIGNUP FOR NEWSLETTER</h3>
          <div class="form">
            <form class="w-100">
              <input id="email-member" type="email" class="form-control formInput w-100 my-3" placeholder="請輸入電子信箱" name="email">
              <div class="formBtnArea input-group-append">
                <button class="btn formBtn" type="submit">訂閱</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 版腳 -->
  <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  name: 'HomeView',
  data () {
    return {
      newProducts: [],
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          res.data.products.forEach((i, index) => {
            if (index < 8) {
              this.newProducts.push(i)
            }
          })
          console.log(this.newProducts)
        }
      })
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    NavbarComponent,
    Swiper,
    SwiperSlide,
    FooterComponent
  },
  setup () {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination]
    }
  }
}
</script>

<style scoped>
  /* 輪播樣式 */
  .pcBanner {
    display: block;
  }
  .mobileBanner {
    display: none;
  }
  .swiper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  :deep .swiper-pagination-bullet.swiper-pagination-bullet-active{
    background-color: #ED7120;
  }
  :deep .swiper-pagination-bullet{
    background-color: #ED7120;
  }
  :deep .swiper-button-prev{
    color: #A0A0A0;
    border-radius: 50%;
    border: 2px solid #A0A0A0;
    width: 40px;
    height: 40px;
    transition: 0.3s ease all;
  }
  :deep .swiper-button-prev::after{
    font-size: 15px;
    font-weight: bold;
  }
  :deep .swiper-button-prev:hover{
    background-color: #ED7120;
    border-radius: 50%;
    border: unset
  }
  :deep .swiper-button-prev:hover::after{
    color: #fff;
  }
  :deep .swiper-button-next{
    color: #A0A0A0;
    border-radius: 50%;
    border: 2px solid #A0A0A0;
    width: 40px;
    height: 40px;
    transition: 0.3s ease all;
  }
  :deep .swiper-button-next::after{
    font-size: 15px;
    font-weight: bold;
  }
  :deep .swiper-button-next:hover{
    background-color: #ED7120;
    border-radius: 50%;
    border: unset
  }
  :deep .swiper-button-next:hover::after{
    color: #fff;
  }
  /* goShop樣式 */
  .goShopArea {
    overflow: hidden;
  }
  .goShop {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 400px;
    position: relative;
    z-index: 1;
  }
  .goShop:hover{
    opacity: 0.8;
    transform: scale(1.1, 1.1);
    transition: opacity 0.5s, transform 0.5s;
    z-index: 0;
  }
  .goShop.go1{
    background-image: url('../assets/img/cat1.jpg');
  }
  .goShop.go2{
    background-image: url('../assets/img/dog1.jpg');
  }
  .goShop.go3{
    background-image: url('../assets/img/cat2.jpg');
  }
  .goShop:hover .goShopBtn{
    top: 50%;
    /* left: 40%; */
    transition: 0.5s ease all;
  }
  .goShop:hover .goShopBtn a{
    font-size: 16px;
  }
  .goShopBtn {
    position: absolute;
    top: 70%;
    left: 10%;
  }
  .goShopBtn:hover a {
    color: #23316E;
    background-color: #fff;
    border: unset;
  }
  .goShopBtn a {
    color: #fff;
    border: 2px solid #fff;
    border-radius: 12px;
    padding: 5px 10px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s ease all;
    font-size: 13px;
  }
  /* 首頁標題 */
  .indexTitle .decoLine {
    background-color: #23316E;
    flex: 1;
    height: 2px;
  }
  .indexTitle p {
    color: #23316E;
  }

  /* 新品上市 */
  .productList {
    width: 100%;
  }
  .product a{
    display: block;
    overflow: hidden;
  }
  .product a img {
    width: 100%;
    height: auto;
  }
  .product a:hover img {
    opacity: 0.8;
    transform: scale(1.1);
    transition: 0.5s ease all;
  }
  .productText a{
    text-decoration: none;
    color: #ED7120;
    display: block;
    font-weight: bold;
    font-size: 18px;
  }
  .productText a:hover{
    color: #23316E;
    transition: 0.3s ease all;
  }
  /* 首頁背景區 */
  .backgroundArea {
    background-image: url('../assets/img/background.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-position: 50% 65%;
    opacity: 0.8;
  }
  .backgroundArea.sty2 {
    background-image: url('../assets/img/background2.jpg');
    background-size: contain;
    background-repeat: repeat;
    background-attachment: unset;
  }
  .backgroundtextArea {
    background-color: rgba(0,0,0,0.5);
    border: 1px solid #fff;
  }
  .backgroundtextArea p {
    color: #fff;
    text-align: left;
    font-weight: bold;
    line-height: 1.5;
  }
  .formInput {
    border: 1px solid #23316E;
  }
  .formBtn {
    background-color: #23316E;
    color: #fff;
    padding: 5px 15px;
  }
  .formBtn:hover {
    border: 1px solid #23316E;
    background-color: #fff;
    color: #23316E;
    transition: 0.3s ease all;
  }
  .backgroundSubsArea h3 {
    color: #23316E;
  }
  /* 購物須知 */
  .notesHover {
    background-color: #fff;
    border-radius: 50%;
    padding: 5px 12px;
    font-size: 28px;
    border: 2px solid #ED7120;
  }
  .notesHover i {
    color: #ED7120;
    border: unset;
  }
  .notesHover:hover {
    transition: 0.3s ease all;
    background-color: #ED7120;
  }
  .notesHover:hover i {
    color: #fff;
  }
  .notesTitle {
    color: #ED7120;
    font-weight: bolder;
    font-size: 20px;
  }
  .notesBrief {
    color: #A0A0A0;
  }
  @media (max-width:1280px) {
    .productText a {
      font-size: 16px;
    }
  }
  @media (max-width:990px) {
    .swiperArea{
      padding-top: 68px;
    }
    .pcBanner {
      display: none;
    }
    .mobileBanner {
      display: block;
    }
    .goShop {
      background-position: 50% 42%;
    }
    .backgroundtextArea p {
      text-align: center;
    }
    .notesTitle {
      margin-bottom: 10px;
    }
    .notesBrief {
      text-align: left;
    }
  }
  @media (max-width:768px){
    .notesHover {
      padding: 5px 12px;
      font-size: 24px;
      border: 1px solid #ED7120;
    }
    .notesTitle {
      font-size: 18px;
    }
    .notesBrief {
      font-size: 14px;
    }
  }
  @media (max-width:576px){
    .productList {
      margin: 0;
      padding: 0;
    }
    .notesHover {
      padding: 5px 15px;
      font-size: 42px;
      border: 2px solid #ED7120;
    }
    .notesTitle {
      font-size: 24px;
    }
    .notesBrief {
      font-size: 16px;
    }
    .notes {
      margin-bottom: 25px;
    }
    .backgroundSubsArea h3 {
      text-align: center;
    }
    .formBtnArea {
      text-align: center;
    }
  }
  @media(max-width:425px){
    .indexTitle {
      justify-content: center;
    }
    .decoLine {
      display: none;
    }
  }
</style>
