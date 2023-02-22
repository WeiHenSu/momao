<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" v-show="pages.has_pre">
          <a class="page-link sty2" href="#" aria-label="Previous" @click.prevent="updatePage(curPage - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{ 'active': page === pages.current_page }"
        v-show="pages.total_pages > 1">
          <a class="page-link sty2" href="#" @click.prevent="updatePage(page)">
            {{ page }}
          </a>
        </li>
        <li class="page-item" v-show="pages.has_next">
          <a class="page-link sty2" href="#" aria-label="Next" @click.prevent="updatePage(curPage + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      curPage: 1
    }
  },
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
      this.curPage = page
    }
  },
  created () {
    console.log('page', this.pages)
  }
}
</script>

<style>
  .page-link.sty2 {
    border: 1px solid #23316E;
    color: #23316E;
  }
  .page-link.sty2:hover {
    color: #fff;
    background-color: #23316E;
  }
  .page-item.active > .page-link.sty2 {
    color: #fff;
    background-color: #23316E;
  }
</style>
