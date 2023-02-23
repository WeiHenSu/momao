<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <!-- 麵包屑 -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">查詢訂單</li>
    </ol>
  </nav>
  <div class="pageTitle fs-4 py-2 mb-4 fw-bolder">
      查詢訂單
  </div>
  <table v-if="showOrder" class="orderTable table my-4">
    <thead>
        <tr>
            <th width="20%">訂單編號</th>
            <th width="10%">訂購日期</th>
            <th width="20%">訂購商品</th>
            <th width="20%">訂購人資訊</th>
            <th width="10%">是否付款</th>
            <th width="10%">總額</th>
            <th width="10%">備註</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="20%" data-title="訂單編號：">{{ orderInfo.id }}</td>
            <td width="10%" data-title="訂購日期：">{{ (new Date(orderInfo.create_at * 1000)).toLocaleDateString() }}</td>
            <td width="20%" data-title="訂購商品：">
                <div class="productList" v-for="i in orderInfo.products" :key="i.id">
                    {{ i.product.title }} / {{ i.qty }} {{ i.product.unit }}
                </div>
            </td>
            <td width="20%" data-title="訂購人資訊：">
                <div class="userInfo" v-for="i in orderInfo.user" :key="i.name">
                    {{ i }}
                </div>
            </td>
            <td width="10%" data-title="是否付款：">
                <span class="text-success" v-if="orderInfo.is_paid">付款</span>
                <span class="text-danger" v-else>未付款</span>
            </td>
            <td width="10%" data-title="總額：">${{ orderInfo.total }}</td>
            <td width="10%" data-title="備註：">
            <p class="remark">{{ orderInfo.message }}</p>
            </td>
        </tr>
    </tbody>
  </table>
  <div class="inputSearch mb-5">
    <input type="text" ref="searchId" placeholder="請輸入訂單編號" class="w-50">
    <button type="button" class="btn searchBtn mt-3" @click="goSearch">
        查詢
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderId: '',
      orderInfo: {},
      showOrder: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    goSearch () {
      this.isLoading = true
      this.orderId = this.$refs.searchId.value
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.order === null) {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '查無此訂單'
          })
        } else {
          this.orderInfo = res.data.order
          this.showOrder = true
          console.log(this.orderInfo)
          this.emitter.emit('push-message', {
            style: 'success',
            title: '查詢訂單成功'
          })
        }
      })
    }
  }
}
</script>

<style>
    .pageTitle {
      color: #23316E;
      border-bottom: 2px solid #23316E;
    }
    .inputSearch input {
        padding: 5px 0 5px 5px;
        border-radius: 8px;
        border: 2px solid #ccc;
    }
    .searchBtn {
        background-color: #23316E;
        color: #fff;
        display: block;
        padding: 5px 15px;
    }
    .searchBtn:hover {
        opacity: 0.7;
        transition: 0.3s ease all;
    }
    .remark {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
    @media(max-width:990px) {
        .orderTable th {
            display: none;
        }
        .orderTable td {
            width: 100%;
        }
        .orderTable tbody tr {
            display: flex;
            flex-direction: column;
            border: 1px solid #ccc;
            margin-bottom: 25px;
        }
        .orderTable tbody tr td:before{
            content: attr(data-title);
            display: inline-block;
            font-weight: bold;
            padding-right: 5px;
        }
    }
</style>
