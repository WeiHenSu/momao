<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <!-- 進度條 -->
  <div class="noteList row py-4">
      <div class="progress px-0">
          <div class="progress-bar barBackground progress-bar-striped" role="progressbar" style="width: 100%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
          <div class="notesItem active mb-2">
              <span>3</span>
          </div>
          <p class="notesTitle">
              完成訂單
          </p>
          </div>
      </div>
  </div>
  <div class="row flex-lg-row flex-column-reverse mb-5">
    <div class="col-lg-8 col-md-12">
      <table class="check3Table table">
        <thead>
          <tr>
            <th class="fs-5">聯絡資訊</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <th width="15%">訂購時間：</th>
              <td>{{ (new Date(order.create_at * 1000)).toLocaleDateString() }}</td>
          </tr>
          <tr>
              <th width="15%" class="orderId">訂單編號：</th>
              <td>
                  <div class="d-flex justify-content-between align-items-center">
                      <span ref="copyId">{{ order.id }}</span>
                      <button type="button" class="btn sty7" @click.prevent="copyBtn">Copy</button>
                  </div>
              </td>
          </tr>
          <tr>
              <th width="15%">Email：</th>
              <td>{{ order.user.email }}</td>
          </tr>
          <tr>
              <th width="15%">收件人姓名：</th>
              <td>{{ order.user.name }}</td>
          </tr>
          <tr>
              <th width="15%">收件人電話：</th>
              <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
              <th width="15%">收件人地址：</th>
              <td>{{ order.user.address }}</td>
          </tr>
          <tr>
              <th width="15%">付款狀態：</th>
              <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="checkOrder p-4">
        <p class="fw-bold fs-4">我的訂單</p>
        <div class="item d-flex mb-1" v-for="item in order.products" :key="item.id">
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
        <div class="text-end">
          <button class="btn sty7 w-100 mt-3" v-if="order.is_paid === false" @click.prevent="payOrder">確認付款去</button>
          <button class="btn sty7 w-100 mt-3" v-else @click.prevent="this.$router.push('/')">回首頁</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      fTotal: 0,
      tempOrder: [],
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            this.order = res.data.order
            this.fTotal = res.data.order.total
            console.log('getOrder', this.order)
          }
        })
    },
    payOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.isLoading = false
            this.getOrder()
          }
        })
    },
    copyBtn () {
      navigator.clipboard.writeText(this.$refs.copyId.innerText)
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已複製至剪貼簿'
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
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
  .check3Table {
    border: 1px solid #ccc;
  }
  .check3Table thead {
    background-color: #23316E;
    color: #fff;
  }
  .orderId {
    vertical-align: middle;
  }
  @media(max-width:990px) {
    .checkOrder {
      box-shadow: unset;
    }
  }
  @media(max-width:768px) {
    .check3Table th {
      width:30%
    }
  }
</style>
