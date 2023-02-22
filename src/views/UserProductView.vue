<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <!-- 麵包屑 -->
  <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
          <li class="breadcrumb-item"><router-link to="/userboard/productlist">全部商品</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ info.title }}</li>
      </ol>
  </nav>
  <div class="row justify-content-center">
      <div class="productImg col-lg-5 col-md-12 my-md-3">
          <img :src="info.imageUrl" alt="" class="img-fluid mb-3">
      </div>
  <div class="col-lg-7 col-md-12 px-lg-4 my-md-5">
      <h2 class="title fw-bold mb-3">{{ info.title }}</h2>
      <div class="descripton mb-4">{{ info.description }}</div>
      <div class="h5" v-if="!info.price">{{ info.origin_price }} 元</div>
          <del class="h6" v-if="info.price">NT$ {{ info.origin_price }} </del>
          <div class="h5 fw-bold" v-if="info.price"> NT${{ info.price }} </div>
          <div class="inputSty">
              <p class="mt-4 mb-2">數量：</p>
              <div class="input-group align-items-center">
                  <div class="input-group-prepend">
                      <button class="countBtn btn btn-muted btn-sm btn-dark text-white me-2" id="minus-btn" @click="minusQty">
                          <i class="bi bi-dash"></i>
                      </button>
                  </div>
                  <input type="number" class="form-control text-center" min="1" v-model="tempQty">
                  <div class="input-group-prepend">
                      <button class="countBtn btn btn-muted btn-sm btn-dark text-white ms-2" id="plus-btn" @click="addQty">
                          <i class="bi bi-plus"></i>
                      </button>
                  </div>
              </div>
          </div>
          <hr>
          <button type="button" class="btn sty2"
                  @click="addToCart(info.id)">
          加到購物車
          </button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {},
      data: {},
      tempQty: 1,
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getOneProduct (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.info = res.data.product
        // console.log(res.data)
      })
    },
    addToCart (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty: this.tempQty
      }
      this.$http.post(api, { data: cart }).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          console.log('addcart', res.data)
          this.emitter.emit('triggerCart')
          this.emitter.emit('push-message', {
            style: 'success',
            title: '新增購物車成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '新增購物車失敗'
          })
        }
      })
    },
    addQty () {
      this.tempQty = this.tempQty + 1
    },
    minusQty () {
      this.tempQty = this.tempQty - 1
    }
  },
  created () {
    // console.log(this.$route.params.productId)
    this.getOneProduct(this.$route.params.productId)
  }
}
</script>

<style>
  .title {
    color: #23316E;
  }
  .inputSty {
    width: 250px;
  }
  .inputText {
    background-color: #fff;
  }
  .btn.sty2 {
    border: 1px solid #ED7120;
    color: #ED7120;
    font-weight: bold;
  }
  .btn.sty2:hover {
    background-color: #ED7120;
    border: unset;
    color: #fff;
    transition: 0.3s ease all;
  }
  .descripton {
    font-size: 18px;
    line-height: 2;
  }
  @media(max-width:990px) {
    .descripton {
        font-size: 16px;
    }
  }
  @media(max-width:576px) {
    .descripton {
        line-height: 1.5;
    }
    .inputSty {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 15px 0;
    }
    .inputSty p {
      margin: 0 !important;
    }
    .inputSty .input-group {
        width: 50%;
    }
  }
</style>
