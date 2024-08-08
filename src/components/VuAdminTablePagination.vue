<template>
  <nav
    v-if="!config.pagination.hidden"
    aria-label="Page navigation"
    class="mt-2 d-flex align-items-center justify-content-between"
  >
    <div>
      <div class="dropdown d-inline-block m-1">
        <button
          type="button"
          class="btn btn-sm btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span v-cloak v-show="config.pagination.from > 0" class="mx-1">
            <strong
              >${ config.pagination.from }-${ config.pagination.to }</strong
            >
            <span v-if="config.pagination.total">
              / ${ config.pagination.total }
            </span>
          </span>
        </button>
        <ul class="dropdown-menu text-end">
          <li>
            <span
              class="dropdown-item cursor-pointer"
              v-for="limit in config.pagination.limits"
              :key="limit"
              :class="{ selected: config.pagination.limit == limit }"
              @click="setPageLimit(limit)"
            >
              <strong>${ limit }</strong>
              <small class="ms-2"
                >${ translate('row') }/${ translate('page') }</small
              >
              <i
                v-if="config.pagination.limit == limit"
                class="bi bi-check-circle ms-2 text-info"
              ></i>
              <i
                v-if="config.pagination.limit != limit"
                class="bi bi-circle ms-2 text-muted"
              ></i>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <ul class="pagination pagination-sm m-1">
      <li class="page-item" v-if="config.pagination.total">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: firstDisabled() }"
          @click="setPage(1)"
          aria-label="${ translate('First') }"
        >
          <span aria-hidden="true">${ translate('First') }</span>
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: prevDisabled() }"
          @click="setPage(config.pagination.page - 1)"
          aria-label="${ translate('Prev') }"
        >
          <span aria-hidden="true">${ translate('Prev') }</span>
        </a>
      </li>
      <li
        v-for="number in config.pagination.numbers"
        :key="number"
        class="page-item"
      >
        <a
          class="page-link cursor-pointer"
          :class="{
            disabled: number > config.pagination.pages,
            current: number == config.pagination.page,
          }"
          @click="setPage(number)"
          >${ number }</a
        >
      </li>

      <li class="page-item">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: nextDisabled() }"
          @click="setPage(config.pagination.page + 1)"
          aria-label="${ translate('Next') }"
        >
          <span aria-hidden="true"
            ><span aria-hidden="true">${ translate('Next') }</span></span
          >
        </a>
      </li>
      <li class="page-item" v-if="config.pagination.total">
        <a
          class="page-link cursor-pointer"
          :class="{ disabled: lastDisabled() }"
          @click="setPage(config.pagination.total)"
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
  emits: ["setPage", "setPageLimit", "translate"],
  props: {
    config: Object,
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