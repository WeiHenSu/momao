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
          <div class="notesItem active mb-2">
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
  <div class="row flex-lg-row flex-column-reverse">
    <div class="col-lg-8 col-md-12">
      <VForm class="p-4" v-slot="{ errors }" @submit="createOrder">
          <div class="checkTitle mb-4">
              <h3 class="fw-bold">填寫資料</h3>
          </div>
          <div class="checkTitle mb-3">
              <label for="email" class="form-label">Email</label>
              <VField id="email" name="email" type="email" class="form-control"
                      :class="{ 'is-invalid': errors['email'] }"
                      placeholder="請輸入電子郵件" rules="email|required"
                      v-model="form.user.email"></VField>
              <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="checkTitle mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <VField id="name" name="姓名" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名" rules="required"
                      v-model="form.user.name"></VField>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="checkTitle mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <VField id="tel" name="電話" type="tel" class="form-control"
                      :class="{ 'is-invalid': errors['電話'] }"
                      placeholder="請輸入電話" rules="required"
                      v-model="form.user.tel"></VField>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="checkTitle mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <VField id="address" name="地址" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['地址'] }"
                      placeholder="請輸入地址" rules="required"
                      v-model="form.user.address"></VField>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="checkTitle mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea name="" id="message" class="form-control" cols="30" rows="10"
                          v-model="form.message"></textarea>
          </div>
          <div class="buttonArea d-flex justify-content-end">
            <div>
              <button class="btn sty7" @click.prevent="goBack">上一步</button>
            </div>
            <div class="ms-3">
              <button class="btn sty7">送出訂單</button>
            </div>
          </div>
      </VForm>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="checkOrder mt-4 p-4">
        <p class="fw-bold fs-4">我的訂單</p>
        <div class="item d-flex mb-1" v-for="item in cart" :key="item.id">
          <div class="itemImg">
            <img :src="item.product.imageUrl" style="width: 50px; height: 50px; object-fit: cover;">
          </div>
          <div class="d-flex w-100 ps-3 justify-content-between align-items-center">
            <div class="itemGroup mb-1 d-flex flex-column">
              <div class="itemTitle">
                <span class="fw-bold">{{ item.product.title }}</span>
              </div>
              <div class="itemUnit">
                <span class="fw-bold">{{ item.qty }} {{ item.product.unit }}</span>
              </div>
            </div>
            <div class="itemPrice">
                <span class="">$ {{ item.total }}</span>
              </div>
          </div>
        </div>
        <div class="totalPrice pt-3 mt-3">
          <p class="text-success pw-bold fs-4 d-flex justify-content-between">
            <span>總結： </span>
            <span>NT$ {{ fTotal }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {},
      fTotal: 0,
      oTotal: 0,
      isLoading: false
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.cart = res.data.data.carts
          this.fTotal = res.data.data.final_total
          this.oTotal = res.data.data.total
          console.log('check2', this.cart)
        }
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const info = {
        user: {
          name: this.form.user.name,
          email: this.form.user.email,
          tel: this.form.user.tel,
          address: this.form.user.address
        },
        message: this.form.message
      }
      this.$http.post(api, { data: info }).then((res) => {
        if (res.data.success) {
          const orderId = res.data.orderId
          this.$router.push(`/userboard/checkout3/${orderId}`)
        }
      })
    },
    goBack () {
      this.$router.back()
    }
  },
  created () {
    this.getCart()
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
  .checkOrder {
    box-shadow: 2px 2px 8px 2px #ccc;
    background-color: #fff;
    position: sticky;
    top: 69px;
    left: 0;
  }
  .checkTitle {
    color: #23316E;
    font-weight: bold;
  }
  .totalPrice {
    border-top: 1px solid #ccc;
  }
  .btn.sty7 {
    background-color: #23316E;
    color: #fff;
    font-weight: bold;
  }
  .btn.sty7:hover {
    opacity: 0.7;
    transition: 0.3s ease all;
  }
  .itemGroup {
    width: 70%;
  }
  .itemPrice {
    width: 20%;
  }
  @media(max-width:990px) {
    .checkOrder {
      box-shadow: unset;
    }
  }
</style>
