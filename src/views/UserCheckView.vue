<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <!-- 進度條 -->
  <div class="noteList row py-4">
      <div class="progress px-0">
          <div class="progress-bar barBackground progress-bar-striped" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div class="col-4">
          <div class="notes d-flex flex-column align-items-center">
          <div class="notesItem active mb-2">
              <span>1</span>
          </div>
          <p class="notesTitle">
              確認商品
          </p>
          </div>
      </div>
      <div class="col-4">
          <div class="notes d-flex flex-column align-items-center">
          <div class="notesItem mb-2">
              <span>2</span>
          </div>
          <p class="notesTitle">
              填寫資料
          </p>
          </div>
      </div>
      <div class="col-4">
          <div class="notes d-flex flex-column align-items-center">
          <div class="notesItem mb-2">
              <span>3</span>
          </div>
          <p class="notesTitle">
              完成訂單
          </p>
          </div>
      </div>
  </div>
  <!-- 確認商品 -->
  <div class="checkTitle mb-4">
      <h2>確認商品</h2>
  </div>
  <!-- 商品表 -->
  <div class="row py-4">
      <table class="table tableBox">
          <thead>
              <tr class="text-light tableBackground text-center">
                  <th width="61%">
                      品項
                  </th>
                  <th width="13%">
                      數量
                  </th>
                  <th width="13%">
                      價格
                  </th>
                  <th width="13%">
                      編輯
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="text-center" v-for="(item, index) in cartInfo" :key="item.id">
                  <td data-title="品項：">
                      <img :src="item.product.imageUrl" style="width: 72px; height: 72px; object-fit: cover;">
                      <p class="mb-0 fw-bold ps-3">
                          {{ item.product.title }}
                      </p>
                  </td>
                  <td data-title="數量：">
                      <div class="inputRWD">
                          <div class="input-group align-items-center">
                              <div class="input-group-prepend">
                                  <button class="countBtn btn btn-muted btn-sm" id="minus-btn" @click="minusQty(item, index)">
                                      <i class="bi bi-dash"></i>
                                  </button>
                              </div>
                              <input type="number" class="form-control form-control-sm text-center" min="1" v-model="item.qty" ref="inputQty" @change="updateCart(item)">
                              <div class="input-group-prepend">
                                  <button class="countBtn btn btn-muted btn-sm" id="plus-btn" @click="addQty(item, index)">
                                      <i class="bi bi-plus"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </td>
                  <td data-title="價格：">
                      <span class="fw-bold" v-if="!couponValid">$ {{ item.total }}</span>
                      <span class="fw-bold" v-else>
                          <span class="d-block"><del><small>NT $ {{ item.total }}</small></del></span>
                          <span class="text-success">NT $ {{ item.final_total }}</span>
                      </span>
                  </td>
                  <td data-title="編輯：">
                      <a href="#" @click.prevent="delCartItem(item)">
                          <i class="bi bi-trash"></i>
                      </a>
                  </td>
              </tr>
          </tbody>
      </table>
      <div class="couponInput py-3 text-end">
          <span class="fw-bold">折扣碼輸入：</span>
          <input type="text" ref="couponCode">
          <button type="button" class="btn small btn-sm" @click="checkCoupon">
              檢查
          </button>
      </div>
      <div class="finalPrice text-end mb-5">
          <p class="fw-bold fs-5" v-if="!couponValid">總金額：NT $ {{ oTotal }}</p>
          <p class="fw-bold fs-5" v-else>
              <span class="d-block"><del><small>原價：NT $ {{ oTotal }}</small></del></span>
              <span class="text-success">折扣後：NT $ {{ fTotal }}</span>
          </p>
      </div>
      <div class="text-end">
          <div class="btnBox">
              <button type="button" class="btn sty5" @click="toCheck2">
                  下一步
              </button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartInfo: {},
      fTotal: 0,
      oTotal: 0,
      couponValid: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getCarts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.cartInfo = res.data.data.carts
          this.fTotal = res.data.data.final_total
          this.oTotal = res.data.data.total
          console.log('cartInfo', this.cartInfo)
        }
      })
    },
    delCartItem (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          console.log('delCartItem', res.data)
          this.emitter.emit('connectCart')
          this.getCarts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除商品成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '新增商品失敗'
          })
        }
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.$http.put(api, { data: cart }).then((res) => {
        if (res.data.success) {
          console.log('updateItem', res.data)
          this.emitter.emit('connectCart')
          this.getCarts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新商品成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新商品失敗'
          })
        }
      })
    },
    addQty (item, i) {
      item.qty = Number(this.$refs.inputQty[i].value) + 1
      this.updateCart(item)
    },
    minusQty (item, i) {
      item.qty = Number(this.$refs.inputQty[i].value) - 1
      this.updateCart(item)
    },
    toCheck2 () {
      this.$router.push('/userboard/checkout2')
    },
    checkCoupon () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const inputCode = this.$refs.couponCode.value
      console.log(inputCode)
      const coupon = {
        code: inputCode
      }
      this.$http.post(api, { data: coupon }).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.getCarts()
          this.couponValid = true
          this.emitter.emit('connectCoupon', {
            couponValid: true
          })
          this.emitter.emit('push-message', {
            style: 'success',
            title: '套用優惠券成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'success',
            title: '套用優惠券失敗'
          })
        }
        console.log('checkcoupon', res.data)
      })
    }
  },
  created () {
    this.getCarts()
    this.emitter.on('connectCheckout', () => {
      this.getCarts()
    })
  }
}
</script>

<style>
  .noteList {
    position: relative;
  }
  .progress {
    position: absolute;
    top: 27%;
    z-index: -1;
  }
  .barBackground {
    background-color: #ED7120;
  }
  .notesItem {
    background-color: #fff;
    border-radius: 50%;
    padding: 6px 15px;
    border: 2px solid #ED7120;
  }
  .notesItem span {
    color: #ED7120;
    font-weight: bold;
    font-size: 20px;
    border: unset;
  }
  .notesItem.active {
    background-color: #ED7120;
    border: 2px solid #fff;
  }
  .notesItem.active span {
    color: #fff;
  }
  .notesTitle {
    color: #ED7120;
    font-weight: bolder;
    font-size: 20px;
  }
  .checkTitle {
    font-weight: bold;
    color: #23316E;
    border-bottom: 2px solid #ccc;
  }
  .tableBackground {
    background-color: #23316E;
  }
  .tableBox tr th{
    border-right: 1px solid #fff;
  }
  .tableBox tr td {
    vertical-align: middle;
    border: 1px solid #ccc;
    border-top: unset;
    width: 13%;
  }
  .tableBox tr td a{
    color: #23316E;
  }
  .tableBox tr td:first-child {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    border-right: unset;
    width: 100%;
  }
  .countBtn i {
    font-size: 18px;
  }
  .btn.small {
    background-color:#23316E;
    color: #fff;
    padding: 5px 15px;
    margin-left: 5px;
  }
  .btn.small:hover{
    opacity: 0.7;
    transition: 0.3s ease all;
  }
  .btn.sty5 {
    background-color: #23316E;
    color: #fff;
    width: 150px;
  }
  .btn.sty5:hover {
    opacity: 0.7;
    transition: 0.3s ease all;
  }
  .couponInput input {
    border-top: unset;
    border-left: unset;
    border-right: unset;
    border-bottom: 2px solid #ccc;
  }
  @media(max-width: 990px) {
    .tableBox thead tr{
      border: unset;
    }
    .tableBox tr th{
      display: none;
    }
    .tableBox tr {
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
    }
    .tableBox tr td{
        width: 100%;
        text-align: left;
    }
    .tableBox tr td:first-child {
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        background-color: #f3f3f3;
    }
    .tableBox tr td:before{
        content: attr(data-title);
        display: inline-block;
        font-weight: bold;
        padding-right: 5px;
    }
    .inputRWD {
        width: 150px;
        display: inline-block;
    }
  }
  @media(max-width:576px) {
    .finalPrice {
        margin-bottom: 15px !important;
    }
    .btn.sty5 {
        width: 100%;
    }
  }
</style>
