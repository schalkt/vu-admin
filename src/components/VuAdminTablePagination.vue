<template>
  <nav
    v-if="page.all"
    aria-label="Page navigation"
    class="d-flex align-items-center justify-content-center"
  >
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ 'disabled opacity-25': page.current == 1 }"
          @click="setPage(1)"
          aria-label="${ translate('First') }"
        >
          <span aria-hidden="true">${ translate('First') }</span>
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ 'disabled opacity-25': page.current == 1 }"
          @click="setPage(page.current - 1)"
          aria-label="${ translate('Prev') }"
        >
          <span aria-hidden="true">${ translate('Prev') }</span>
        </a>
      </li>
      <li v-for="number in page.numbers" :key="number" class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{
            'disabled opacity-25': number > page.all,
            'text-dark bg-light': number == page.current,
          }"
          @click="setPage(number)"
          >${ number }</a
        >
      </li>
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ 'disabled opacity-25': page.current + 1 > page.all }"
          @click="setPage(page.current + 1)"
          aria-label="${ translate('Next') }"
        >
          <span aria-hidden="true"
            ><span aria-hidden="true">${ translate('Next') }</span></span
          >
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ 'disabled opacity-25': page.current == page.all }"
          @click="setPage(page.all)"
          aria-label="${ translate('Last') }"
        >
          <span aria-hidden="true">${ translate('Last') }</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { translate } from "./helpers";

export default {
  name: "VuAdminTablePagination",
  props: {
    page: Object,
    settings: Object,
  },
  methods: {
    setPage(page) {
      this.$emit("setPage", page);
    },
    translate(key) {
      return translate(key, this.settings.translate);
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>