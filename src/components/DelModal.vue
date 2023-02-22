<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl" role="document" >
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                      <span>刪除 {{ item.title }}</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="pt-3">
                            <p class="fs-5">是否刪除 {{ item.title }} ？</p>
                            <p class="text-danger">( 刪除後將無法恢復 )</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary"
                            data-bs-dismiss="modal">取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="$emit('del-product')">確認刪除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  data () {
    return {
      modal: ''
    }
  },
  props: {
    item: {}
  },
  mixins: [modalMixin]
}

</script>
