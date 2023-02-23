<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="rootProduct p-5 my-5">
      <h3 class="rootPageTitle fw-bolder">產品管理</h3>
      <div class="text-end">
          <button class="btn sty3" type="button" @click="openModal(true)">
              增加產品
          </button>
      </div>
      <table class="rootTable table mt-4">
          <thead>
              <tr>
                  <th width="120">品牌</th>
                  <th class="rootProductname">產品名稱</th>
                  <th width="120">原價</th>
                  <th width="120">售價</th>
                  <th width="100">是否啟用</th>
                  <th width="200">編輯</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="item in products" :key="item.id">
              <td width="120" data-title="品牌：">{{ item.category }}</td>
              <td class="rootProductname" data-title="產品名稱：">{{ item.title }}</td>
              <td width="120" data-title="原價：" class="text-right">
                  {{ item.origin_price }}
              </td>
              <td width="120" data-title="售價：" class="text-right">
                  {{ item.price }}
              </td>
              <td width="100" data-title="是否啟用：">
                  <span class="text-success" v-if="item.is_enabled">啟用</span>
                  <span class="text-danger" v-else>未啟用</span>
              </td>
              <td width="200" data-title="編輯：">
                  <div class="btn-group">
                  <button class="btn sty3 btn-sm btnMargin" @click="openModal(false, item)">編輯</button>
                  <button class="btn sty6 btn-sm" @click="openDelModal(item)">刪除</button>
                  </div>
              </td>
              </tr>
          </tbody>
      </table>
      <PagenationComponent
      :pages="pagination"
      @emit-pages="getProducts"></PagenationComponent>
      <ProductModal ref="pModal"
      :product="tempProduct"
      @update-product="updateProducts"></ProductModal>
      <DelModal ref="dModal"
      :item="tempProduct"
      @del-product="delProducts"></DelModal>
  </div>
</template>

<script>
import ProductModal from '../components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import PagenationComponent from '../components/PagenationComponent.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  components: {
    ProductModal,
    PagenationComponent,
    DelModal
  },
  methods: {
    // 取商品列表
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.axios.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    // 新增與編輯商品 isNew判斷是否為新商品
    // => 若是新商品tempProduct為空 若是編輯要將點選到的該內容(item)copy給tempProduct
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        console.log('新增')
      } else {
        this.tempProduct = { ...item }
        console.log('編輯')
      }
      const productComponent = this.$refs.pModal
      productComponent.showModal()
      this.isNew = isNew
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.dModal
      delComponent.showModal()
    },
    updateProducts (item) {
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.pModal
      this.axios[httpMethod](api, { data: this.tempProduct }).then((res) => {
        console.log(res)
        productComponent.hideModal()
        if (res.data.success) {
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、')
          })
        }
      })
    },
    delProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '刪除失敗',
            content: res.data.message.join('、')
          })
        }
        const delC = this.$refs.dModal
        delC.hideModal()
      })
    }
  },
  created () {
    this.getProducts()
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
  .rootProduct {
    box-shadow: 2px 2px 8px 2px #ccc;
    background-color: #fff;
  }
  .rootPageTitle {
    color: #23316E;
  }
  @media(max-width:990px) {
    .rootProduct th {
        display: none;
    }
    .rootProduct td {
        width: 100%;
    }
    .rootProduct tbody tr {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        margin-bottom: 25px;
    }
    .rootProduct tbody tr td:before{
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
