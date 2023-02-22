<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="rootOrder p-5 my-5">
      <h3 class="rootPageTitle fw-bolder">訂單管理</h3>
      <table class="rootTable table mt-4">
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
              <tr v-for="item in orders" :key="item.id">
              <td width="20%" data-title="訂單編號：">{{ item.id }}</td>
              <td width="10%" data-title="訂購日期：">{{ (new Date(item.create_at * 1000)).toLocaleDateString() }}</td>
              <td width="20%" data-title="訂購商品：">
                  <div class="productList" v-for="i in item.products" :key="i.id">
                      {{ i.product.title }} / {{ i.qty }} {{ i.product.unit }}
                  </div>
              </td>
              <td width="20%" data-title="訂購人資訊：">
                  <div class="userInfo" v-for="i in item.user" :key="i.name">
                      {{ i }}
                  </div>
              </td>
              <td width="10%" data-title="是否付款：">
                  <span class="text-success" v-if="item.is_paid">付款</span>
                  <span class="text-danger" v-else>未付款</span>
              </td>
              <td width="10%" data-title="總額：">${{ item.total }}</td>
              <td width="10%" data-title="備註：">
                <p class="remark">{{ item.message }}</p>
              </td>
              </tr>
          </tbody>
      </table>
      <PagenationComponent
      :pages="pagination"
      @emit-pages="getCarts"></PagenationComponent>
  </div>
</template>

<script>
import PagenationComponent from '../components/PagenationComponent.vue'

export default {
  data () {
    return {
      orders: [],
      pagination: {},
      tempProduct: {},
      isLoading: false
    }
  },
  inject: ['emitter'],
  components: {
    PagenationComponent
  },
  methods: {
    // 取訂單列表
    getCarts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          console.log(res.data)
          this.orders = res.data.orders
        }
      })
    }
  },
  created () {
    this.getCarts()
  }
}
</script>

<style>
  .btn.sty3 {
    color: #23316E;
    border: 1px solid #23316E;
    padding: 5px 15px;
  }
  .btn.sty3:hover {
    background-color: #23316E;
    color: #fff;
  }
  .btn.sty6 {
    color: #ED7120;
    border: 1px solid #ED7120;
    padding: 5px 15px;
  }
  .btn.sty6:hover {
    background-color: #ED7120;
    color: #fff;
  }
  .rootOrder {
    box-shadow: 2px 2px 8px 2px #ccc;
    background-color: #fff;
  }
  .rootPageTitle {
    color: #23316E;
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
    .rootOrder th {
        display: none;
    }
    .rootOrder td {
        width: 100%;
    }
    .rootOrder tbody tr {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        margin-bottom: 25px;
    }
    .rootOrder tbody tr td:before{
        content: attr(data-title);
        display: inline-block;
        font-weight: bold;
        padding-right: 5px;
    }
    .btnMargin {
      margin-right: 5px;
    }
  }
</style>
