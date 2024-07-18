<template>
  <div v-cloak v-if="settings && settings.table" class="table-container">
    <div class="table-title">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-inline-block">
          <h5 class="card-title d-inline">${ settings.table.title }</h5>

          <div
            v-show="wait.table"
            class="spinner-border spinner-border-sm text-info mx-2"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div class="d-inline-block" v-if="messages.length">
          <small
            class="border rounded px-1 mx-1 fw-light text-info"
            v-for="msg in messages"
            :key="msg"
          >
            ${ msg.msg }
          </small>
        </div>
      </div>

      <div class="table-header" :class="[settings.table.header.class]">
        <div class="d-inline-block">
          <div class="dropdown m-1 d-inline-block">
            <button
              type="button"
              class="btn btn-sm btn-dark dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span v-cloak v-show="page.from > 0" class="text-muted mx-1"
                >${ page.from }-${ page.to }
              </span>
              <span class="text-light mx-1"
                >( ${ translate('all') }
                <strong>${ page.items }</strong> )</span
              >
              ${ page.limit }
              <span class="text-muted">/ ${ translate('page') }</span>
            </button>
            <ul class="dropdown-menu text-end">
              <li>
                <span
                  class="dropdown-item cursor-pointer"
                  v-for="limit in settings.table.page.limits"
                  :key="limit"
                  :class="{ 'fw-bold text-white': page.limit == limit }"
                  @click="setPageLimit(limit)"
                  >${ limit }
                </span>
              </li>
            </ul>
          </div>

          <div class="dropdown m-1 d-inline-block">
            <button
              type="button"
              class="btn btn-sm btn-outline-dark dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span
                v-cloak
                v-show="settings.table.columns.length > 0"
                class="mx-1"
                >${ translate('Columns') }</span
              >
            </button>
            <ul class="dropdown-menu text-end">
              <li>
                <span
                  class="dropdown-item cursor-pointer"
                  v-for="column in settings.table.columns"
                  :key="column"
                  @click="toggleColumn(column)"
                >
                  <small class="badge text-secondary">${ column.name }</small>${
                  column.title }
                  <i v-if="!column.hidden" class="bi bi-check text-info"></i>
                  <i v-if="column.hidden" class="bi bi-x text-danger"></i>
                </span>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <span
                  class="dropdown-item cursor-pointer"
                  @click="toggleColumn(true)"
                  >${ translate('Visible all') }</span
                >
              </li>
              <li>
                <span
                  class="dropdown-item cursor-pointer"
                  @click="toggleColumn(false)"
                  >${ translate('Hidden all') }</span
                >
              </li>
            </ul>
          </div>
        </div>

        <span v-if="settings.table.header">
          <button
            v-for="button in settings.table.header.buttons"
            :key="button.action"
            type="button"
            :class="[button.class]"
            @click="tableAction(button.action, item, index, $event)"
          >
            <i :class="[button.icon]"></i> ${ button.title }
          </button>
        </span>
      </div>
    </div>

    <table
      v-if="settings.table"
      class="table table-hover table-responsive table-sm my-4"
    >
      <thead>
        <tr>
          <th
            class=""
            v-for="column in settings.table.columns"
            :style="[column.hidden ? 'display: none' : '']"
            :key="column"
            :width="column.width"
            :class="column.class"
          >
            <span
              class="d-block no-select text-nowrap"
              :class="{ 'cursor-pointer': isSortable(column) }"
              @click="sortTable(column)"
              >${ column.title }
              <span
                class="badge bg-dark p-1"
                v-if="
                  page.order[column.name] &&
                  page.order[column.name].dir === 'ASC'
                "
                :class="{
                  'text-light': page.order[column.name].fixed,
                  'text-warning': !page.order[column.name].fixed,
                }"
              >
                <i class="bi bi-arrow-down"></i>${ page.order[column.name].idx +
                1 }
              </span>
              <span
                class="badge bg-dark p-1"
                v-if="
                  page.order[column.name] &&
                  page.order[column.name].dir === 'DESC'
                "
                :class="{
                  'text-light': page.order[column.name].fixed,
                  'text-warning': !page.order[column.name].fixed,
                }"
              >
                <i class="bi bi-arrow-up"></i>${ page.order[column.name].idx + 1
                }
              </span>
            </span>

            <span v-if="column.headerbuttons">
              <span v-for="button in column.headerbuttons" :key="button.action">
                <button
                  type="button"
                  :class="[button.class]"
                  @click="tableAction(button.action, item, index, $event)"
                >
                  <i :class="[button.icon]"></i> ${ button.title }
                </button>
              </span>
            </span>
          </th>
        </tr>
        <tr>
          <th
            v-for="column in settings.table.columns"
            :style="[column.hidden ? 'display: none' : '']"
            :key="column"
            :width="column.width"
            :class="column.class"
          >
            <div class="d-inline-block w-100 px-1" v-if="column.index">
              <span
                v-if="column.index"
                class="cursor-pointer badge border text-secondary py-1 px-2 me-1 my-2 w-100"
                v-cloak
                :class="{ 'bg-info text-dark': selected.length > 0 }"
                @click="toggleSelectedAll()"
              >
                ${ selected.length ? selected.length : '' }
                <i v-show="!selected.length" class="bi bi-check-all"></i>
              </span>
            </div>

            <div class="d-inline-block" v-if="column.filter">
              <div
                v-if="column.filter.type == 'text'"
                class="input-group input-group-sm my-1"
              >
                <input
                  type="text"
                  class="form-control form-control-sm text-warning"
                  v-model="column.filter.value"
                  @keyup.enter="reloadTable()"
                />

                <button
                  class="btn btn-outline-secondary"
                  :disabled="!column.filter.value"
                  @click="
                    column.filter.value = undefined;
                    reloadTable();
                  "
                >
                  <i
                    class="bi bi-x"
                    :class="{ 'text-warning': column.filter.value }"
                  ></i>
                </button>
              </div>

              <div
                v-if="column.filter.type == 'number'"
                class="input-group input-group-sm my-1"
              >
                <select
                  v-if="column.filter.operators == true"
                  v-model="column.filter.operator"
                  @change="reloadTable()"
                  class="form-select form-select-sm"
                >
                  <option value="=">${ translate('=') }</option>
                  <option value=">">${ translate('>') }</option>
                  <option value="<">${ translate('<') }</option>
                </select>

                <select
                  v-if="
                    column.filter.operators &&
                    column.filter.operators.length > 0
                  "
                  v-model="column.filter.operator"
                  @change="reloadTable()"
                  class="form-select form-select-sm"
                >
                  <option
                    v-for="operator in column.filter.operators"
                    :key="operator"
                    :value="operator.value"
                  >
                    ${ operator.label }
                  </option>
                </select>

                <input
                  type="number"
                  class="form-control text-warning"
                  v-model="column.filter.value"
                  @keyup.enter="reloadTable()"
                />

                <button
                  v-if="column.filter.buttonx && column.filter.buttonx != false"
                  class="btn btn-outline-secondary"
                  :disabled="!column.filter.value"
                  @click="
                    column.filter.value = undefined;
                    reloadTable();
                  "
                >
                  <i
                    class="bi bi-x"
                    :class="{ 'text-warning': column.filter.value }"
                  ></i>
                </button>
              </div>

              <div v-if="column.filter.type == 'select'">
                <select
                  v-model="column.filter.value"
                  @change="reloadTable()"
                  class="form-select form-select-sm my-1 text-warning"
                >
                  <option
                    v-for="option in column.filter.options"
                    :key="option"
                    :value="option.value"
                  >
                    ${ option.label }
                  </option>
                </select>
              </div>
            </div>

            <span v-if="column.filterbuttons">
              <span v-for="button in column.filterbuttons" :key="button.action">
                <button
                  type="button"
                  :class="[button.class]"
                  @click="tableAction(button.action, item, index, $event)"
                >
                  <i :class="[button.icon]"></i> ${ button.title }
                </button>
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in this.items" :key="item.id">
          <tr class="align-middle">
            <td
              v-for="column in settings.table.columns"
              :style="[column.hidden ? 'display: none' : '']"
              :key="column.name"
              :data-label="column.title"
              :width="column.width"
              :class="column.class"
              @click="tableAction(column.click, item, index, $event)"
            >
              <div class="d-inline-block w-100 px-1" v-if="column.index">
                <span
                  class="cursor-pointer badge border text-secondary p-1 w-100"
                  :class="{
                    'border-info text-info':
                      selected.indexOf(item[settings.pkey]) >= 0,
                  }"
                  v-html="index + 1 + (page.current - 1) * page.limit"
                ></span>
              </div>

              <span v-if="!column.template && !column.input">
                ${ tableCellValue(column.name, item, index) }
              </span>
              <span
                v-if="column.template"
                v-html="tableCellTemplate(column.template, item, index)"
              >
              </span>
              <span v-if="column.input">
                <input
                  v-if="['text', 'number'].indexOf(column.input.type) >= 0"
                  type="column.input.type"
                  class="form-control form-control-sm text-info"
                  @change="
                    onInputChange(item[column.name], column, item, index)
                  "
                  v-model="item[column.name]"
                />

                <select
                  v-if="column.input.type == 'select'"
                  class="form-select form-select-sm text-info"
                  @change="
                    onInputChange(item[column.name], column, item, index)
                  "
                  v-model="item[column.name]"
                >
                  <option
                    v-for="option in column.input.options"
                    :value="option.value"
                    :key="option"
                  >
                    ${ option.label }
                  </option>
                </select>
              </span>

              <span v-if="column.rowbuttons">
                <span v-for="button in column.rowbuttons" :key="button.action">
                  <button
                    type="button"
                    :class="[button.class]"
                    @click="tableAction(button.action, item, index, $event)"
                  >
                    <i v-if="button.icon" :class="[button.icon]"></i>

                    <span
                      v-if="button.template"
                      v-html="tableCellTemplate(button.template, item, index)"
                    ></span>
                    <span v-else>${ button.title }</span>
                  </button>
                </span>
              </span>
            </td>
          </tr>
          <tr
            v-if="
              settings.table.details &&
              details.indexOf(item[settings.pkey]) >= 0
            "
          >
            <td
              :class="[settings.table.details.class]"
              :colspan="settings.table.columns.length"
            >
              <div
                class="m-0"
                v-for="field in settings.table.details.fields"
                :key="field"
              >
                <div class="row g-3 align-items-center">
                  <div class="col-5 text-end">
                    <label class="col-form-label">${ field.label }</label>
                  </div>
                  <div class="col-7">
                    <input
                      :type="field.input.type"
                      v-if="['select'].indexOf(field.input.type) < 0"
                      class="form-control form-control-sm text-info"
                      v-model="item[field.name]"
                      @change="
                        onInputChange(item[field.name], field, item, index)
                      "
                    />

                    <select
                      v-if="field.input.type == 'select'"
                      class="form-select form-select-sm text-info"
                      v-model="item[field.name]"
                      @change="
                        onInputChange(item[field.name], field, item, index)
                      "
                    >
                      <option
                        v-for="option in field.input.options"
                        :value="option.value"
                        :key="option"
                      >
                        ${ option.label }
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <span v-html="settings.table.details.raw(item)"></span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <VuAdminTablePagination
      :settings="settings"
      :page="page"
      @setPage="setPage"
      @translate="translate"
    ></VuAdminTablePagination>

    <div class="modal shadow" :id="modalId" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content h-100">
          <form
            ref="form"
            v-cloak
            v-if="item"
            :id="formId"
            class="form"
            @submit.prevent="submitItem"
            :class="{ wait: wait.form }"
          >
            <div class="modal-header">
              <h5 class="modal-title">
                Szerkesztés
                <span v-cloak v-if="item" class="text-muted"
                  >( <span class="text-info">${ item.id }</span> )</span
                >
                <div
                  v-show="wait.form"
                  class="spinner-border spinner-border-sm text-info mx-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <small v-if="errors">
                  <a
                    class="text-danger link-underline link-underline-opacity-0 fs-6 ms-3"
                    :href="'#' + formId + '_errors'"
                  >
                    <i class="bi bi-exclamation-circle"></i>
                    Hiba történt
                    <i class="bi bi-arrow-down"></i>
                  </a>
                </small>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body custom-scroll">
              <div class="row" v-if="settings.form">
                <div
                  class="pb-5"
                  :class="[group.class ? group.class : 'col-md-12']"
                  v-for="group in settings.form.groups"
                  :key="group"
                >
                  <h2 class="form-row-title mb-4 fw-lighter">
                    ${ group.title }
                  </h2>

                  <VuAdminFormGroup
                    v-cloak
                    v-if="item && group"
                    v-model="item"
                    :group="group"
                    :formid="formId"
                  ></VuAdminFormGroup>
                </div>
              </div>

              <div class="mt-3 mb-3" :id="formId + '_errors'" v-if="errors">
                <div class="mb-3">
                  <hr class="text-danger" />
                  <strong class="text-danger">
                    <i class="bi bi-exclamation-circle"></i>
                    Hiba történt
                  </strong>
                </div>

                <div v-for="errorgroup in errors" :key="errorgroup">
                  <div v-for="error in errorgroup" :key="error">
                    <span class="text-danger"> ${ error.message } </span>
                  </div>
                </div>
              </div>

              <div class="mt-3 mb-3"></div>

              <pre>
${ item }
</pre
              >
            </div>
            <div
              class="modal-footer d-flex justify-content-between"
              v-cloak
              v-if="item"
            >
              <div>
                <button
                  type="button"
                  class="btn btn-outline-secondary m-1"
                  @click="reloadItem()"
                  :disabled="!item.id"
                >
                  <i class="bi bi-arrow-clockwise"></i> Újratöltés
                </button>

                <button
                  type="button"
                  class="btn btn-outline-warning m-1"
                  @click="createItem()"
                >
                  <i class="bi bi-plus-circle"></i> Új
                </button>

                <button
                  type="button"
                  class="btn btn-outline-warning m-1"
                  @click="copyItem()"
                >
                  <i class="bi bi-copy"></i> Másolat
                </button>

                <button
                  type="button"
                  class="btn btn-danger m-1"
                  @click="deleteItem()"
                  :disabled="!item.id"
                >
                  <i class="bi bi-trash"></i> Törlés
                </button>
              </div>

              <div>
                <button
                  type="button"
                  class="btn btn-secondary m-1"
                  data-bs-dismiss="modal"
                >
                  <i class="bi bi-x"></i> Bezárás
                </button>

                <button type="submit" class="btn btn-primary m-1">
                  <i class="bi bi-save"></i> Mentés
                </button>

                <button
                  type="button"
                  class="btn btn-success m-1"
                  @click="submitAndClose"
                >
                  <i class="bi bi-save"></i> Ment és bezár
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import {
  getResponseErrors,
  getResponseJson,
  prepareFetchOptions,
  flattenArrayObjects,
  flattenObject,
  unflattenObject,
  translate,
} from "./helpers";
import { VuAdminFormGroup } from "./VuAdminFormGroup.vue";
import VuAdminTablePagination from "./VuAdminTablePagination.vue";

export default {
  name: "VuAdminTable",
  props: {
    settings: Object,
  },
  components: {
    // VuAdminFormGroup,
    VuAdminTablePagination,
  },
  data() {
    return {
      item: {},
      items: {},
      selected: [],
      details: [],
      page: {
        current: 1,
        limit: 10,
        pagination: 10,
        all: null,
        items: null,
        numbers: [],
        order: {},
        filter: {},
        orderIndex: 1,
      },
      wait: {
        table: false,
        form: false,
      },
      modalId: null,
      modalElement: null,
      modalWindow: null,
      messages: [],
    };
  },

  created() {
    // console.log(this.page, this.settings.table.page);

    if (!this.settings.table) {
      // console.log(window.entities, this.settings.entity, this.settings.table);
      return false;
    }

    if (this.settings.table.page) {
      this.page.pagination = this.settings.table.page.pagination;
    } else {
      this.settings.table.page = {};
    }

    if (!this.settings.table.page.limits) {
      this.settings.table.page.limits = [10, 20, 50, 100];
    }

    if (!this.settings.table.header) {
      this.settings.table.header = {};
    }

    if (!this.settings.table.header || !this.settings.table.header.class) {
      this.settings.table.header.class =
        "d-flex align-items-center justify-content-between bg-secondary border rounded";
    }

    // this.modalElement.addEventListener('hide.bs.modal', event => {

    // 	if (!this.wait.form && this.itemIsModified()) {

    // 		const confirmed = confirm('Are you sure?');

    // 		if (!confirmed) {
    // 			event.preventDefault();
    // 		}

    // 	}

    // })

    let uid = Math.round(Math.random() * 100000);

    this.formId = "form_" + this.settings.entity + "_" + uid;
    this.modalId = "modal_" + this.settings.entity + "_" + uid;

    this.resetTable();
  },
  mounted() {
    this.modalElement = document.getElementById(this.modalId);
    this.modalWindow = new Modal(this.modalElement);
  },

  methods: {
    resetTable() {
      this.page.limit = this.settings.table.page.limit;

      // console.log(this.page, this.settings.table.page);

      this.resetFilter();
      this.resetOrder(true);
    },

    resetFilter(reload) {
      for (let column of this.settings.table.columns) {
        if (column.filter) {
          column.filter.value =
            column.filter.default !== undefined
              ? column.filter.default
              : undefined;
        }
      }

      if (reload) {
        this.reloadTable();
        this.calcPage();
      }
    },

    resetOrder(reload) {
      if (this.settings.table.order) {
        this.page.order = Object.assign({}, this.settings.table.order);
      }

      if (reload) {
        this.reloadTable();
        this.calcPage();
      }
    },

    reloadTable() {
      this.fetchTable({ entity: this.settings.entity });
    },

    calcPage() {
      let from = Math.floor((this.page.pagination - 1) / 2);
      let start = this.page.current - from;

      if (this.page.all !== null) {
        if (this.page.current > this.page.all) {
          this.page.current = this.page.all;
        }

        if (this.page.current < 1) {
          this.page.current = 1;
        }

        if (start + this.page.pagination > this.page.all) {
          start = this.page.all - this.page.pagination + 1;
        }
      }

      if (start < 1) {
        start = 1;
      }

      this.page.numbers = Array.from(
        { length: this.page.pagination },
        (_, index) => start + index
      );

      this.page.from =
        this.page.current * this.page.limit - this.page.limit + 1;
      this.page.to = this.page.current * this.page.limit;

      if (this.items && this.items.length < this.page.limit) {
        this.page.to = this.page.from + this.items.length - 1;
      }
    },

    setPage(page) {
      if (page < 1) {
        page = 1;
      }

      if (page > this.page.all) {
        page = this.page.all;
      }

      if (this.page.current != page) {
        this.page.current = page;
        this.reloadTable();
      }
    },

    setPageLimit(limit) {
      if (limit != this.page.limit) {
        this.page.current = 1;
        this.page.limit = limit;
        this.calcPage();
        this.reloadTable();
      }
    },

    tableCellValue(path, item) {
      try {
        if (item[path] !== undefined) {
          return item[path];
        }

        if (!path.includes(".")) {
          return item[path];
        }
        return path.split(".").reduce((acc, part) => acc && acc[part], item);
      } catch (e) {
        return e.message;
      }
    },

    tableCellTemplate(fn, item, index) {
      try {
        return fn(item, index);
      } catch (e) {
        return e.message;
      }
    },

    tableAction(action, item, index, event) {
      if (event) {
        event.stopPropagation();
      }

      if (action && typeof action !== "string") {
        action(item, this);
        return;
      }

      switch (action) {
        case "select":
          this.toggleSelected(item[this.settings.pkey]);
          break;

        case "details":
          this.toggleDetail(item[this.settings.pkey]);
          break;

        case "resetdetails":
          this.details = [];
          break;

        case "resetorders":
          this.resetOrder(true);
          break;

        case "resetfilters":
          this.resetFilter(true);
          break;

        case "edit":
          this.editItem(item);
          break;

        case "save":
          this.saveItem(item, () => {
            this.addMessage(
              "#" + (index + 1) + " " + this.translate("saved"),
              2500
            );
          });

          break;

        case "create":
          this.createItem(item);
          break;

        case "delete":
          this.deleteItem(item);
          break;

        case "reload":
          this.reloadTable();
          break;
      }
    },

    isSortable(column) {
      return column.sortable === undefined || column.sortable;
    },

    sortTable(column) {
      if (this.page.order[column.name] && this.page.order[column.name].fixed) {
        return;
      }

      if (!this.isSortable(column)) {
        return;
      }

      if (
        this.page.order[column.name] === undefined ||
        this.page.order[column.name] === null
      ) {
        this.page.order[column.name] = {
          dir: "ASC",
          idx: this.page.orderIndex++,
        };
      } else if (this.page.order[column.name].dir === "ASC") {
        this.page.order[column.name] = {
          dir: "DESC",
          idx: this.page.orderIndex++,
        };
      } else {
        delete this.page.order[column.name];
      }

      let sortedEntries = Object.entries(this.page.order).sort(
        (a, b) => a[1].idx - b[1].idx
      );

      sortedEntries.forEach((entry, index) => {
        entry[1].idx = index;
      });

      this.reloadTable();
    },

    getOrdersForFetch() {
      let order = [];

      for (let key of Object.keys(this.page.order)) {
        order[this.page.order[key].idx] = {
          key: key,
          dir: this.page.order[key].dir,
        };
      }

      return order;
    },

    getFiltersForFetch() {
      let filter = {};

      for (let column of this.settings.table.columns) {
        if (column.filter && column.filter.value !== undefined) {
          filter[column.name] = {
            type: column.filter.type,
            value: column.filter.value,
            operator: column.filter.operator,
          };
        }
      }

      return filter;
    },

    getRelationsForFetch() {
      let relations = {};

      for (let column of this.settings.table.columns) {
        if (
          column.relation &&
          this.settings.relations[column.relation.entity]
        ) {
          relations[column.relation.entity] = Object.assign(
            {},
            this.settings.relations[column.relation.entity]
          );
          relations[column.relation.entity].columns = column.relation.columns;
        }
      }

      return relations;
    },

    async fetchTable() {
      try {
        this.errors = null;
        this.wait.table = true;

        let filter = this.getFiltersForFetch();
        let relations = this.getRelationsForFetch();
        let order = this.getOrdersForFetch();

        const params = new URLSearchParams({
          page: this.page.current,
          limit: this.page.limit,
          order: JSON.stringify(order),
          filter: JSON.stringify(filter),
        });

        let options = prepareFetchOptions("GET", this.settings);
        let url =
          this.settings.api.url +
          "/" +
          this.settings.entity +
          "?" +
          params.toString();

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Hiba történt a blog bejegyzések lekérése közben.");
        }

        const data = await getResponseJson(response);
        this.errors = getResponseErrors(response, data);

        if (this.errors || !data) {
          console.log(this.errors);
          this.wait.table = false;
          return;
        }

        if (data.page) {
          this.page.all = data.page.all;
          this.page.items = data.page.items;
          this.page.current = data.page.current;
          this.calcPage();
        }

        // load relations
        for (let key of Object.keys(relations)) {
          relations[key].ids = [];

          for (let item of data.items) {
            let local = item[relations[key].local];

            if (local) {
              relations[key].ids.push(local);
            }
          }

          await this.fetchRelation(relations[key], data.items);
        }

        if (data.items) {
          // this.items = data.items;
          this.items = flattenArrayObjects(data.items);
          this.convertsIn(this.items);
        }

        this.wait.table = false;
      } catch (error) {
        console.error(error.message);
        this.wait.table = false;
      }
    },

    async fetchRelation(relation, items) {
      try {
        let searchParams = {
          limit: 0,
          list: "select",
          columns: relation.columns
            ? JSON.stringify(relation.columns)
            : undefined,
        };

        if (relation.ids && relation.ids.length) {
          let type = typeof relation.ids[0] === "string" ? "text" : "number";
          let values =
            type === "string"
              ? "'" + relation.ids.join("','") + "'"
              : relation.ids.join(",");

          let filter = {};

          filter[relation.foreign] = {
            type: "array",
            value: relation.ids,
            operator: "IN",
          };

          searchParams.filter = JSON.stringify(filter);
        }

        // this.errors = null;

        const params = new URLSearchParams(searchParams);

        // console.log(this.settings.api.url + '/' + relation.entity + '?' + params.toString());
        // return;
        let options = prepareFetchOptions("GET", this.settings);

        const response = await fetch(
          this.settings.api.url +
            "/" +
            relation.entity +
            "?" +
            params.toString(),
          options
        );

        if (!response.ok) {
          throw new Error("Hiba történt a blog bejegyzések lekérése közben.");
        }

        const data = await getResponseJson(response);
        this.errors = getResponseErrors(response, data);

        if (this.errors || !data) {
          console.log(this.errors);
          return;
        }

        if (items && items[0]) {
          for (let item of items) {
            if (item[relation.local]) {
              item[relation.entity] = data.items.find((current, index, arr) => {
                return current[relation.foreign] === item[relation.local];
              });
            }
          }
        } else {
          relation.items = data.items;
        }
      } catch (error) {
        console.error(error.message);
      }
    },

    editItem(item) {
      this.modalWindow.show();
      this.item = item;

      setTimeout(() => {
        this.fetchItem(item);
      }, 10);
    },

    async fetchItem(item) {
      try {
        this.errors = null;
        this.wait.form = true;

        const response = await fetch(
          this.settings.api.url +
            "/" +
            this.settings.entity +
            "/" +
            item[this.settings.pkey]
        );

        if (!response.ok) {
          throw new Error("Hiba történt a blog bejegyzések lekérése közben.");
        }

        const data = await response.json();

        //console.log(relations, this.settings);

        for (let group of this.settings.form.groups) {
          for (let field of group.fields) {
            // collect relations
            if (
              field.relation &&
              this.settings.relations[field.relation.entity]
            ) {
              field.relation = Object.assign(
                {},
                this.settings.relations[field.relation.entity],
                field.relation
              );
              await this.fetchRelation(field.relation);
            }
          }
        }

        if (data.item) {
          this.item = data.item;
          this.itemOriginal = Object.assign({}, data.item);
        }

        this.wait.form = false;
      } catch (error) {
        console.error(error.message);
        this.wait.form = false;
      }
    },

    async deleteItem(item) {
      try {
        this.errors = null;

        if (!item) {
          item = this.item;
        }

        if (!item[this.settings.pkey]) {
          return;
        }

        const confirmed = confirm("Are you sure you want to delete this post");

        if (!confirmed) {
          return;
        }

        this.wait.form = true;

        const response = await fetch(
          this.settings.api.url +
            "/" +
            this.settings.entity +
            "/" +
            item[this.settings.pkey],
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Hiba történt a bejegyzés törlése közben.");
        }

        this.modalWindow.hide();

        this.reloadTable();
        this.wait.form = false;
      } catch (error) {
        console.error(error.message);
        this.wait.form = false;
      }
    },

    reloadItem() {
      this.fetchItem(this.item);
    },

    async submitItem(closeModal) {
      this.saveItem(this.item, (data) => {
        this.item = data.item;
        this.itemOriginal = Object.assign({}, data.item);

        if (closeModal === true) {
          this.modalWindow.hide();
        }

        this.reloadTable();
      });
    },

    async submitAndClose() {
      let form = this.$refs.form;

      if (form.checkValidity()) {
        this.submitItem(true);
      } else {
        form.reportValidity();
      }
    },

    async saveItem(input, callback) {
      try {
        this.errors = null;
        this.wait.form = true;

        let item = Object.assign({}, input);

        // const formData = new FormData();

        // this.files.forEach((file, index) => {
        // 	formData.append(`file${index}`, file);
        // });

        // formData.append("json", JSON.stringify({
        // 	item: item,
        // }));

        let primaryId = item[this.settings.pkey];

        let options = prepareFetchOptions(
          primaryId ? "PUT" : "POST",
          this.settings
        );

        this.convertsOut([item]);

        options.body = JSON.stringify({
          item: unflattenObject(item),
        });

        const response = await fetch(
          this.settings.api.url +
            "/" +
            this.settings.entity +
            (primaryId ? "/" + primaryId : ""),
          options
        ).catch((err) => {
          console.error(err.message);
        });

        const data = await getResponseJson(response);
        this.errors = getResponseErrors(response, data);
        this.wait.form = false;

        if (this.errors) {
          return;
        }

        if (callback) {
          callback(data);
        }
      } catch (error) {
        console.error(error.message);

        this.errors = {
          "": [
            {
              message: error.message,
              value: null,
            },
          ],
        };

        this.wait.form = false;
      }
    },

    toggleColumn(column) {
      if (column === true) {
        this.settings.table.columns.map((el) => {
          el.hidden = false;
        });
      } else if (column === false) {
        this.settings.table.columns.map((el) => {
          el.hidden = true;
        });
      } else {
        column.hidden = !column.hidden;
      }
    },

    toggleSelectedAll() {
      if (!this.selected.length) {
        this.selected = this.items.map((el) => {
          return el[this.settings.pkey];
        });
      } else {
        this.selected = [];
      }
    },

    toggleSelected(index) {
      let idx = this.selected.indexOf(index);

      if (idx >= 0) {
        this.selected.splice(idx, 1);
      } else {
        this.selected.push(index);
      }
    },

    toggleDetail(index) {
      let idx = this.details.indexOf(index);

      if (idx >= 0) {
        this.details.splice(idx, 1);
      } else {
        this.details.push(index);
      }
    },

    onInputChange(value, column, item, index) {
      if (!column || !column.input) {
        return;
      }

      if (column.input.onchange) {
        column.input.onchange(value, column, item);
      }

      if (column.input.autosave) {
        this.saveItem(item, () => {
          this.addMessage(
            "#" + (index + 1) + " " + this.translate("saved"),
            2500
          );
        });
      }
    },

    addMessage(msg, timeout) {
      const uid = Date.now() + Math.random().toString(36).substring(2, 9);

      let message = {
        uid: uid,
        msg: msg,
        timeout: timeout !== undefined ? timeout : 2500,
      };

      this.messages.push(message);

      setTimeout(() => {
        let index = this.messages.findIndex((m) => m.uid === uid);
        if (index !== -1) {
          this.messages.splice(index, 1);
        }
      }, message.timeout);
    },

    translate(key) {
      return translate(key, this.settings.translate);
    },

    convertsIn(items) {
      this.converts(items, "in");
    },

    convertsOut(items) {
      this.converts(items, "out");
    },

    converts(items, direction) {
      if (!this.settings.converts || !this.settings.converts[direction]) {
        return;
      }

      for (let convert of this.settings.converts[direction]) {
        for (let item of items) {
          for (let field in item) {
            if (convert.fields.indexOf(field) >= 0) {
              item[field] = this.settings.methods[convert.method](
                item[field],
                item
              );
            }
          }
        }
      }
    },

    // getFieldValue(item, fieldPath) {
    //   return {
    //     get: () => this.getNestedValue(item, fieldPath),
    //     set: (value) => this.setNestedValue(item, fieldPath, value),
    //   };
    // },
    // getNestedValue(obj, path) {
    //   return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    // },
    // setNestedValue(obj, path, value) {
    //   const keys = path.split(".");
    //   const lastKey = keys.pop();
    //   const lastObj = keys.reduce((acc, key) => acc && acc[key], obj);
    //   if (lastObj && lastKey) {
    //     this.$set(lastObj, lastKey, value);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
