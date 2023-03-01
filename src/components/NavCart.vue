<template>
  <div class="dropdown ml-auto">
      <button class="cartPc btn btn-cart icon text-secondary p-0 ms-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
          aria-expanded="false">
          <i class="bi bi-cart-fill"></i>
          <span class="badge badge-pill badge-danger">{{ cartLength }}</span>
      </button>
      <button class="cartMobile btn btn-cart icon text-secondary p-0 ms-lg-2 ms-md-0 dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
          aria-expanded="false">
          購物車
      </button>
      <div class="dropdown-menu dropdown-menu-right m-0" aria-labelledby="dropdownMenuButton" ref="dropdown">
          <div class="p-3">
              <div class="cartTitle" v-show="!checkCart">
                  <p>購物車還是空的哦</p>
              </div>
              <div class="cartTitle" v-show="checkCart">
                  <p>已選擇商品</p>
              </div>
              <table class="cartTable table table-sm">
                  <thead>
                      <tr>
                          <th width="10%"></th>
                          <th width="40%">
                              商品名稱
                          </th>
                          <th width="20%">
                              單位
                          </th>
                          <th width="30%">
                              價格
                          </th>
                      </tr>
                  </thead>
                  <tbody class="controlScroll">
                      <tr v-for="item in cartInfo" :key="item.id">
                          <td width="10%">
                              <a href="#" @click.prevent.stop="delCartItem(item)">
                                  <i class="bi bi-trash"></i>
                              </a>
                          </td>
                          <td width="40%" class="productTitle">{{ item.product.title }}</td>
                          <td width="20%">
                              <input type="number" class="inputQty" v-model="item.qty" min="1" @change="updateCart(item)">
                                / {{ item.product.unit }}
                          </td>
                          <td width="30%">${{ item.total }}</td>
                      </tr>
                  </tbody>
              </table>
              <div class="finalTotal text-end text-success me-3">
                  <p v-if="!couponValid">合計： $ {{ fTotal }}</p>
                  <p v-else>
                      <span class="d-block"><del><small>原價：NT $ {{ oTotal }}</small></del></span>
                      折扣後：NT $ {{ fTotal }}
                  </p>
              </div>
              <div class="text-end">
                  <a href="#" class="btn sty4 btn-block btn-sm me-3" @click.prevent="goCheckout">
                      前往結帳
                  </a>
              </div>
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
      checkCart: false,
      couponValid: false,
      cartLength: 0
    }
  },
  inject: ['emitter'],
  methods: {
    getCarts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log('carts', res.data)
          this.cartInfo = res.data.data.carts
          this.fTotal = res.data.data.final_total
          this.oTotal = res.data.data.total
          this.cartLength = this.cartInfo.length
          if (this.cartInfo.length > 1) {
            this.checkCart = true
          }
        }
      })
    },
    delCartItem (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          console.log('delCartItem', res.data)
          this.getCarts()
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
        console.log('updateItem', res.data)
        this.getCarts()
        this.emitter.emit('connectCheckout')
      })
    },
    goCheckout () {
      this.$router.push('/userboard/checkout')
    }
  },
  created () {
    this.getCarts()
    this.emitter.on('triggerCart', () => {
      this.getCarts()
    })
    this.emitter.on('connectCart', () => {
      this.getCarts()
    })
    this.emitter.on('connectCoupon', (i) => {
      this.couponValid = i
    })
  },
  mounted () {
    const dropdown = this.$refs.dropdown
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation()
    })
  }
}
</script>

<style>
  .btn-cart{
    position: relative;
  }
  .dropdown-menu-right{
    min-width: 600px;
    position: absolute;
    left: unset !important;
    right: 0;
    transform: translateX(0%);
  }
  .btn-cart .badge{
    position: absolute;
    top: 15px;
    right: 0px;
    background-color: #eb4040;
  }
  .cartTitle {
    font-weight: bold;
    color: #333;
  }
  .cartTable {
    border: unset;
  }
  .cartTable tr{
    border: 1px solid #ccc;
    border-top: unset;
  }
  .cartTable thead tr{
    border-top: 1px solid #ccc;
    border-bottom: unset;
  }
  .cartTable th {
    text-align: center;
  }
  .cartTable td {
    text-align: center;
  }
  .cartTable td a {
    color: #333;
  }
  .btn.sty4 {
    color: #fff;
    background-color: #23316E;
  }
  .btn.sty4:hover {
    opacity: 0.7;
    transition: 0.3s ease all;
  }
  .productTitle {
    color: #23316E;
    text-align: left !important;
  }
  .cartMobile{
    display: none;
  }
  .controlScroll {
    display: block;
    height: 180px;
    overflow: auto;
  }
  .controlScroll::-webkit-scrollbar {
    width: 8px;
  }
  .controlScroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0, 0.3);
    background-color: #ccc;
  }
  .cartTable thead, tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .inputQty {
    width: 50px;
  }
  @media(max-width:990px) {
    .cartPc {
        display: none;
    }
    .cartMobile {
        display: block;
        padding: 8px 0 !important;
        font-weight: bold;
    }
    .dropdown-menu-right {
        width: 100%;
        min-width: unset;
        border-top: unset;
        border-bottom: unset;
        border-radius: unset;
    }
    .controlScroll {
        display: block;
        height: 100px;
        overflow: auto;
    }
  }
  @media(max-width:768px) {

  }
</style>
