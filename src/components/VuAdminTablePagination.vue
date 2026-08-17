<template>
  <nav v-if="!config.pagination.hidden" aria-label="Page navigation" class="mt-2 d-flex flex-wrap align-items-center justify-content-between gap-2">

    <div class="d-flex align-items-center">
      <span v-cloak v-show="config.pagination.from > 0" class="mx-1 small">
        <strong>{{ config.pagination.from }}-{{ config.pagination.to }}</strong>
        <span v-if="config.pagination.total">
          / {{ config.pagination.total }}
        </span>
      </span>

      <div class="dropdown d-none d-md-inline-block m-1" v-if="config.pagination.limits">
        <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <strong>{{ config.pagination.limit }}</strong>
          <small class="ms-1">{{ translate('row') }}/{{ translate('page') }}</small>
        </button>
        <ul class="dropdown-menu text-end">
          <li>
            <span class="dropdown-item cursor-pointer" v-for="limit in config.pagination.limits" :key="limit" :class="{ selected: config.pagination.limit == limit }"
              @click="setPageLimit(limit)">
              <strong>{{ limit }}</strong>
              <small class="ms-2">{{ translate('row') }}/{{ translate('page') }}</small>
              <i v-if="config.pagination.limit == limit" class="bi bi-check-circle-fill ms-2"></i>
              <i v-if="config.pagination.limit != limit" class="bi bi-circle ms-2"></i>
            </span>
          </li>
        </ul>
      </div>
      <div v-show="ui && ui.wait.table" class="spinner-border spinner-border-sm mx-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <ul class="pagination pagination-sm m-1">
      <li class="page-item">
        <a class="page-link cursor-pointer" :class="{ disabled: firstDisabled() }" @click="setPage(1)" :aria-label="translate('First')">
          <span aria-hidden="true" class="d-none d-md-inline" v-html="translate('First')"></span>
          <i aria-hidden="true" class="bi bi-chevron-double-left d-md-none"></i>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link cursor-pointer" :class="{ disabled: prevDisabled() }" @click="setPage(config.pagination.page - 1)" :aria-label="translate('Prev')">
          <span aria-hidden="true" class="d-none d-md-inline" v-html="translate('Prev')"></span>
          <i aria-hidden="true" class="bi bi-chevron-left d-md-none"></i>
        </a>
      </li>
      <li v-for="number in visiblePageNumbers()" :key="number" class="page-item">
        <a class="page-link cursor-pointer" :class="{
          disabled: number > config.pagination.pages,
          current: number == config.pagination.page,
        }" @click="setPage(number)">{{ number }}</a>
      </li>

      <li class="page-item">
        <a class="page-link cursor-pointer" :class="{ disabled: nextDisabled() }" @click="setPage(config.pagination.page + 1)" :aria-label="translate('Next')">
          <span aria-hidden="true" class="d-none d-md-inline" v-html="translate('Next')"></span>
          <i aria-hidden="true" class="bi bi-chevron-right d-md-none"></i>
        </a>
      </li>
      <li class="page-item" v-if="config.pagination.total">
        <a class="page-link cursor-pointer" :class="{ disabled: lastDisabled() }" @click="setPage(config.pagination.pages)" :aria-label="translate('Last')">
          <span aria-hidden="true" class="d-none d-md-inline" v-html="translate('Last')"></span>
          <i aria-hidden="true" class="bi bi-chevron-double-right d-md-none"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { translate } from "./helpers";

export default {
  name: "VuAdminTablePagination",
  emits: ["setPage", "setPageLimit", "translate"],
  props: {
    config: Object,
    settings: Object,
    ui: Object,
  },
  data() {
    return {
      isMobile: typeof window !== "undefined" ? window.matchMedia("(max-width: 767.98px)").matches : false,
    };
  },
  mounted() {
    if (typeof window === "undefined") {
      return;
    }
    this._mq = window.matchMedia("(max-width: 767.98px)");
    this._mqHandler = (event) => {
      this.isMobile = event.matches;
    };
    this._mq.addEventListener("change", this._mqHandler);
  },
  beforeUnmount() {
    if (this._mq) {
      this._mq.removeEventListener("change", this._mqHandler);
    }
  },
  methods: {
    visiblePageNumbers() {
      const numbers = this.config.pagination.numbers;

      if (!this.isMobile || !numbers || numbers.length <= 3) {
        return numbers;
      }

      let start = numbers.indexOf(this.config.pagination.page) - 1;

      if (start < 0) {
        start = 0;
      }

      if (start + 3 > numbers.length) {
        start = numbers.length - 3;
      }

      return numbers.slice(start, start + 3);
    },

    setPage(page) {
      this.$emit("setPage", page);
    },
    setPageLimit(limit) {
      this.$emit("setPageLimit", limit);
    },
    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },
    firstDisabled() {
      return this.config.pagination.page <= 1;
    },
    prevDisabled() {
      return this.config.pagination.page <= 1;
    },
    nextDisabled() {
      if (!this.config.pagination.pages) {
        return this.config.pagination.items < this.config.pagination.limit;
      }

      return this.config.pagination.page + 1 > this.config.pagination.pages;
    },
    lastDisabled() {
      return this.config.pagination.page == this.config.pagination.pages;
    },
  },
  components: {},
};
</script>

<style lang="scss">
.vu-admin {
  nav {
    user-select: none;

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
}
</style>