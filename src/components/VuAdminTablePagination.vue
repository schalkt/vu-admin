<template>
  <nav v-if="!config.pagination.hidden" aria-label="Page navigation" class="mt-2 d-flex align-items-center justify-content-between">

    <div>
      <div class="dropdown d-inline-block m-1">
        <button type="button" class="btn btn-sm btn-secondary" :class="{'dropdown-toggle' : config.pagination.limits}" data-bs-toggle="dropdown" aria-expanded="false">
          <span v-cloak v-show="config.pagination.from > 0" class="mx-1">
            <strong>{{ config.pagination.from }}-{{ config.pagination.to }}</strong>
            <span v-if="config.pagination.total">
              / {{ config.pagination.total }}
            </span>
          </span>
        </button>
        <ul v-if="config.pagination.limits" class="dropdown-menu text-end">
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
        <a class="page-link cursor-pointer" :class="{ disabled: firstDisabled() }" @click="setPage(1)" aria-label="{{  translate('First')  }}">
          <span aria-hidden="true" v-html="translate('First')"></span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link cursor-pointer" :class="{ disabled: prevDisabled() }" @click="setPage(config.pagination.page - 1)" aria-label="{{ translate('Prev')  }}">
          <span aria-hidden="true" v-html="translate('Prev')"></span>
        </a>
      </li>
      <li v-for="number in config.pagination.numbers" :key="number" class="page-item">
        <a class="page-link cursor-pointer" :class="{
          disabled: number > config.pagination.pages,
          current: number == config.pagination.page,
        }" @click="setPage(number)">{{ number }}</a>
      </li>

      <li class="page-item">
        <a class="page-link cursor-pointer" :class="{ disabled: nextDisabled() }" @click="setPage(config.pagination.page + 1)" aria-label="{{  translate('Next')  }}">
          <span aria-hidden="true" v-html="translate('Next')"></span>
        </a>
      </li>
      <li class="page-item" v-if="config.pagination.total">
        <a class="page-link cursor-pointer" :class="{ disabled: lastDisabled() }" @click="setPage(config.pagination.total)" aria-label="{{  translate('Last')  }}">
          <span aria-hidden="true" v-html="translate('Last')"></span>
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
  methods: {
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