<template>
  <nav
    v-if="page.all"
    aria-label="Page navigation"
    class="d-flex align-items-center justify-content-between"
  >
    <div>
      <div class="dropdown d-inline-block m-1">
        <button
          type="button"
          class="btn btn-sm btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span v-cloak v-show="page.from > 0" class="mx-1">
            <strong>${ page.from }-${ page.to }</strong> / ${ page.items }
          </span>
        </button>
        <ul class="dropdown-menu text-end">
          <li>
            <span
              class="dropdown-item cursor-pointer"
              v-for="limit in settings.table.page.limits"
              :key="limit"
              :class="{ selected: page.limit == limit }"
              @click="setPageLimit(limit)"
            >
              <strong>${ limit }</strong>
              <small class="ms-2">${ translate('row') }/${ translate('page') }</small>
              <i
                v-if="page.limit == limit"
                class="bi bi-check-circle ms-2 text-info"
              ></i>
              <i
                v-if="page.limit != limit"
                class="bi bi-circle ms-2 text-muted"
              ></i>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <ul class="pagination pagination-sm m-1">
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: page.current == 1 }"
          @click="setPage(1)"
          aria-label="${ translate('First') }"
        >
          <span aria-hidden="true">${ translate('First') }</span>
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: page.current == 1 }"
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
            disabled: number > page.all,
            current: number == page.current,
          }"
          @click="setPage(number)"
          >${ number }</a
        >
      </li>

      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: page.current + 1 > page.all }"
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
          :class="{ disabled: page.current == page.all }"
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
    setPageLimit(limit) {
      this.$emit("setPageLimit", limit);
    },
    translate(key) {
      return translate(key, this.settings.translate);
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
nav {
  user-select: none;
}

.cursor-pointer {
  cursor: pointer;
}

[data-bs-theme="light"] {
  nav {
    // background-color: var(--bs-dark);
    // color: var(--bs-light);

    li a {
      background-color: var(--bs-light);
      color: var(--bs-dark);

      &.disabled {
        opacity: 0.42;
        background-color: var(--bs-light);
        color: var(--bs-secondary);
      }

      &.current {
        background-color: var(--bs-secondary);
        color: var(--bs-light);
      }
    }
  }
}

[data-bs-theme="dark"] {
  nav {
    background-color: var(--bs-dark);
    color: var(--bs-light);

    li a {
      background-color: var(--bs-dark);
      color: var(--bs-light);

      &.disabled {
        opacity: 0.42;
        background-color: var(--bs-secondary);
        color: var(--bs-light);
      }

      &.current {
        background-color: var(--bs-light);
        color: var(--bs-secondary);
      }
    }
  }
}
</style>