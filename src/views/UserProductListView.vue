<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <!-- 麵包屑 -->
  <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">全部商品</li>
      </ol>
  </nav>
  <div class="row mt-5 flex-lg-row flex-md-column">
      <div class="pLeft col-lg-3 col-md-12">
          <div class="productLeft">
              <div class="leftTitle py-2 ps-2 d-flex align-items-center">
                  <i class="bi bi-handbag"></i>
                  <p class="fw-bolder fs-5 mb-0">產品類型</p>
              </div>
              <ul class="leftList ps-0">
                  <li :class="checkAll ? 'active' : ''">
                      <a href="#" @click.prevent="changeALL">全部</a>
                  </li>
                  <li :class="(category === title) ? 'active' : ''" v-for="category in allCategory" :key="category">
                      <a href="#" @click.prevent="changeCategory(category)">{{ category }}</a>
                  </li>
              </ul>
          </div>
      </div>
      <div class="pRight col-lg-9 col-md-12">
          <div class="pageTitle fs-4 py-2 mb-4 fw-bolder">
              {{ title }}
          </div>
          <!-- 全部 -->
          <div class="productList row" v-if="checkAll">
              <div class="product col-md-4 col-sm-6 mb-4" v-for="item in tempProducts" :key="item.id">
                  <a href="#" @click.prevent="getProduct(item.id)">
                      <img :src="item.imageUrl">
                  </a>
                  <div class="productText my-2">
                      <p class="category mb-1 fw-bold"><small>{{ item.category }}</small></p>
                      <a href="#">
                          <p class="mb-1">{{ item.title }}</p>
                      </a>
                      <p class="price origin fst-italic text-muted mb-1" v-if="item.origin_price !== item.price"><del><small>NT${{ item.origin_price }}</small></del></p>
                      <p class="price">NT${{ item.price }}</p>
                  </div>
              </div>
          </div>
          <!-- 篩選後 -->
          <div class="productList row" v-else>
              <div class="product col-md-4 col-sm-6 mb-4" v-for="item in tempPage.disData" :key="item.id">
                  <a href="#" @click.prevent="getProduct(item.id)">
                      <img :src="item.imageUrl">
                  </a>
                  <div class="productText my-2">
                      <p class="category mb-1 fw-bold"><small>{{ item.category }}</small></p>
                      <a href="#">
                          <p class="mb-1">{{ item.title }}</p>
                      </a>
                      <p class="price origin fst-italic text-muted mb-1" v-if="item.origin_price !== item.price"><del><small>NT${{ item.origin_price }}</small></del></p>
                      <p class="price">NT${{ item.price }}</p>
                  </div>
              </div>
          </div>
          <PagenationComponent
          :pages="tempPagination"
          @emit-pages="getProducts"></PagenationComponent>
      </div>
  </div>
</template>

<script>
import PagenationComponent from '@/components/PagenationComponent.vue'
export default {
  data () {
    return {
      products: [],
      allProducts: [],
      pagination: {},
      tempPagination: {},
      allCategory: [],
      tempProducts: [],
      tempPage: {
        // 品牌總資料
        cateData: [],
        // 篩選品牌總數
        dataTotal: 0,
        // 幾個換頁
        perpage: 10,
        // 總頁數
        pageTotal: 0,
        // 當前頁
        currentPage: 1,
        // 最小
        minData: 0,
        // 最大
        maxData: 0,
        // 品牌顯示資料
        disData: [],
        hasPre: false,
        hasNext: false
      },
      title: '全部',
      checkAll: true,
      isLoading: false
    }
  },
  components: {
    PagenationComponent
  },
  methods: {
    getALLProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.allProducts = res.data.products
        }
      })
    },
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.tempPagination = this.pagination
          this.tempProducts = { ...this.products }
          console.log('product', res.data)
        }
      })
    },
    getProduct (id) {
      this.$router.push(`product/${id}`)
    },
    getCategory () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          res.data.products.forEach((item) => {
            if (this.allCategory.indexOf(item.category) === -1) {
              this.allCategory.push(item.category)
            }
          })
        }
      })
    },
    changeCategory (i) {
      //   清空
      this.tempPage.cateData = []
      this.tempPage.disData = []
      this.title = i
      this.tempPage.cateData = this.allProducts.filter((item) => {
        return item.category === i
      })
      console.log(this.title, '的長度有', this.tempPage.cateData.length)
      this.tempPage.dataTotal = this.tempPage.cateData.length
      //   總頁數
      this.tempPage.pageTotal = Math.ceil(this.tempPage.dataTotal / this.tempPage.perpage)
      //   從第一頁開始
      this.pagination.currentPage = 1
      this.minData = this.tempPage.currentPage * this.tempPage.perpage - this.tempPage.perpage + 1
      this.maxData = this.tempPage.currentPage * this.tempPage.perpage
      //   push資料
      this.tempPage.cateData.forEach((item, index) => {
        // 需要索引判斷當前頁的最小值與最大值
        const num = index + 1
        // push 1~10筆
        if (num >= this.minData && num <= this.maxData) {
          this.tempPage.disData.push(item)
        }
      })
      // 判斷有無上一頁
      if (this.tempPage.currentPage > 1) {
        this.tempPage.hasPre = true
      } else {
        this.tempPage.hasPre = false
      }
      // 判斷有無下一頁
      if (this.tempPage.currentPage + 1 < this.tempPage.pageTotal) {
        this.tempPage.hasNext = true
      } else {
        this.tempPage.hasNext = false
      }
      this.tempPagination = {
        currentPage: this.tempPage.currentPage,
        has_next: this.tempPage.hasNext,
        has_pre: this.tempPage.hasPre,
        total_pages: this.tempPage.pageTotal
      }
      this.checkAll = false
    },
    changeALL () {
      this.title = '全部'
      this.tempProducts = { ...this.products }
      this.tempPagination = this.pagination
      this.checkAll = true
    }
  },
  created () {
    this.getALLProducts()
    this.getProducts()
    this.getCategory()
  }
}
</script>

<style>
    ul li {
      list-style-type: none;
    }
    ul li a {
      text-decoration: none;
    }
    /* 左側 */
    .leftTitle {
        background-color: #23316E;
        color: #fff;
    }
    .leftTitle i {
        font-size: 16px;
        margin-right: 5px;
    }
    .leftList a {
        display: block;
        padding: 8px 0px 8px 15px;
        color: #23316E;
        font-weight: bold;
    }
    .leftList a::after {
      content: '';
      position: absolute;
      right: 0;
      height: 18px;
      width: 2px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #23316E;
    }
    .leftList a:hover {
        color: #fff;
        background-color: #23316E;
        transition: 0.3s ease all;
    }
    .leftList li{
        margin-bottom: 10px;
    }
    .leftList li.active a{
        color: #fff;
        background-color: #23316E;
    }
    /* 右側 */
    .pageTitle {
        color: #23316E;
        border-bottom: 2px solid #23316E;
    }
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
    .category {
        color: #23316E;
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
    @media (max-width:1280px) {
        .productText a {
            font-size: 16px;
        }
    }
    @media (max-width:990px){
        .leftTitle {
            display: none !important;
        }
        .leftList {
            display: flex;
            flex-flow: row wrap;
        }
        .leftList li {
            width: 33.3%;
            position: relative;
        }
        .leftList li:first-child::before{
            content: '';
            position: absolute;
            height: 18px;
            width: 2px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: #23316E;
        }
        .leftList li a {
            padding: 8px 0;
            text-align: center;
        }
    }
    @media (max-width:576px){
        .productList {
            margin: 0;
            padding: 0;
        }
        .leftList li a {
            font-size: 14px;
        }
        .pLeft {
            padding: 0 !important;
        }
    }
</style>
