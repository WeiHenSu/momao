<template>
  <!-- 讀取效果 -->
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="rootCoupon p-5 my-5">
      <h3 class="rootPageTitle fw-bolder">優惠券管理</h3>
      <div class="text-end">
          <button class="btn sty3" type="button" @click="openCouponModal(true)">
              建立新的優惠券
          </button>
      </div>
      <table class="rootTable table mt-4">
          <thead>
              <tr>
                  <th width="120">優惠碼</th>
                  <th class="rootCouponname">折扣百分比</th>
                  <th width="120">到期日</th>
                  <th width="100">是否啟用</th>
                  <th width="200">編輯</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="item in coupons" :key="item">
                  <td width="120" data-title="優惠碼：">{{ item.title }}</td>
                  <td class="rootCouponname" data-title="折扣百分比：">{{ item.percent }} %</td>
                  <td width="120" data-title="到期日：">{{ (new Date(item.due_date * 1000)).toLocaleDateString() }}</td>
                  <td width="100" data-title="是否啟用：">
                      <span class="text-success" v-if="item.is_enabled">啟用</span>
                      <span class="text-danger" v-else>未啟用</span>
                  </td>
                  <td width="200" data-title="編輯：">
                      <div class="btn-group">
                      <button class="btn sty3 btn-sm btnMargin" @click="openCouponModal(false, item)">編輯</button>
                      <button class="btn sty6 btn-sm" @click="openDelCouponModal(item)">刪除</button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
      <PagenationComponent :pages="pagination" @emit-pages="getCoupons"></PagenationComponent>
      <CouponModal ref="cModal"
      :coupon="tempCoupon"
      @update-coupon="updateCoupon"></CouponModal>
      <DelModal ref="dModal"
      :item="tempCoupon"
      @del-product="delCoupon"></DelModal>
  </div>
</template>

<script>
import PagenationComponent from '../components/PagenationComponent.vue'
import CouponModal from '../components/CouponModal.vue'
import DelModal from '../components/DelModal.vue'
export default {
  data () {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  components: {
    CouponModal,
    DelModal,
    PagenationComponent
  },
  inject: ['emitter'],
  methods: {
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.cModal.showModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.dModal
      delComponent.showModal()
    },
    getCoupons (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(url, this.tempProduct).then((res) => {
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
        this.isLoading = false
        console.log('getCoupons', res.data)
      })
    },
    updateCoupon (tempCoupon) {
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          console.log(res, tempCoupon)
          if (res.data.success) {
            this.emitter.emit('push-message', {
              style: 'success',
              title: '新增成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、')
            })
          }
          this.getCoupons()
          this.$refs.cModal.hideModal()
        })
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.emitter.emit('push-message', {
              style: 'success',
              title: '編輯成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '編輯失敗',
              content: res.data.message.join('、')
            })
          }
          this.getCoupons()
          this.$refs.cModal.hideModal()
        })
      }
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        console.log(res, this.tempCoupon)
        this.isLoading = false
        if (res.data.success) {
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
        const delComponent = this.$refs.dModal
        delComponent.hideModal()
        this.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
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
  .rootCoupon {
    box-shadow: 2px 2px 8px 2px #ccc;
    background-color: #fff;
  }
  .rootPageTitle {
    color: #23316E;
  }
  @media(max-width:990px) {
    .rootCoupon th {
        display: none;
    }
    .rootCoupon td {
      width: 100%;
    }
    .rootCoupon tbody tr {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        margin-bottom: 25px;
    }
    .rootCoupon tbody tr td:before{
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
