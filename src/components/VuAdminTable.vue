<template>
  <div
    v-cloak
    v-if="settings && settings.table"
    class="table-container"
    :class="[settings.class]"
    :data-bs-theme="[settings.table.theme]"
  >
    <div class="table-title">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-inline-block">
          <h5
            class="card-title d-inline-block mb-2"
            v-if="settings.table.title"
          >
            ${ settings.table.title }
          </h5>

          <div
            v-show="wait.table"
            class="spinner-border spinner-border-sm text-info mx-2"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div class="d-inline-block" v-if="messages.length">
          <small class="d-inline-block px-1 mx-1" v-if="message">
            <span :class="['text-' + message.priority]">
              <strong>${ message.msg }</strong>
            </span>
          </small>

          <div class="dropdown d-inline-block">
            <button
              class="btn btn-sm dropdown-toggle"
              :class="['btn-' + messages[0].priority]"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ${ messages.length } üzenet
            </button>
            <ul class="dropdown-menu text-start">
              <li v-for="message in messages" :key="message">
                <span
                  class="dropdown-item"
                  :class="['text-' + message.priority]"
                >
                  <small class="me-2 text-muted">${ message.datetime }</small>
                  <strong>${ message.msg }</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="settings.table.header"
      class="table-header"
      :class="[settings.table.header.class]"
    >
      <span
        v-for="button in settings.table.header.buttons"
        :key="button.action"
      >
        <button
          v-if="button.action !== 'columns' && !button.dropdowns"
          type="button"
          :class="[button.class]"
          @click="tableAction(button, items, null, $event)"
        >
          <i :class="[button.icon]"></i>
          ${ button.title }
        </button>

        <div class="dropdown d-inline-block" v-if="button.action === 'columns'">
          <button
            type="button"
            :class="[button.class]"
            class="dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span
              v-cloak
              v-show="settings.table.columns.length > 0"
              class="mx-1"
            >
              <i :class="[button.icon]"></i> ${ translate('Columns') }
              <span v-if="countHiddenColumns()">
                ( ${ countHiddenColumns() } ${ translate('hidden') } )
              </span>
            </span>
          </button>
          <ul class="dropdown-menu text-end">
            <li v-for="column in settings.table.columns" :key="column">
              <span
                class="dropdown-item cursor-pointer"
                @click="toggleColumn(column)"
              >
                <small class="badge text-secondary">${ column.name }</small>${
                column.title }

                <i
                  v-if="!column.hidden"
                  class="bi bi-check-square ms-2 text-info"
                ></i>
                <i
                  v-if="column.hidden"
                  class="bi bi-x-square ms-2 text-danger"
                ></i>
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

        <div class="dropdown d-inline-block" v-cloak v-if="button.dropdowns">
          <button
            type="button"
            :class="[button.class]"
            class="dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span class="mx-1">
              <i :class="[button.icon]"></i> ${ translate(button.title) }
            </span>
          </button>
          <ul class="dropdown-menu text-end">
            <li v-for="dropdown in button.dropdowns" :key="dropdown">
              <span
                class="dropdown-item cursor-pointer"
                :class="[button.class]"
                @click="tableAction(dropdown, items, null, $event)"
              >
                <i class="me-2" :class="[button.icon]"></i>
                ${ dropdown.title }
              </span>
            </li>
          </ul>
        </div>
      </span>
    </div>

    <table
      v-if="settings.table"
      class="table mt-2"
      :class="[settings.table.class]"
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
                class="badge p-1"
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
                class="badge p-1"
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
                  @click="tableAction(button, items, null, $event)"
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
                class="cursor-pointer badge border text-secondary py-1 px-2 me-1 my-2 w-100"
                v-cloak
                :class="{ 'bg-info text-dark': haveSelectedRowInPage() }"
                @click="toggleSelectedRowInPage()"
              >
                <i
                  v-show="!haveSelectedRowInPage()"
                  class="bi bi-check-all"
                ></i>
                <i v-show="haveSelectedRowInPage()" class="bi bi-x-lg"></i>
              </span>
            </div>

            <div class="d-inline-block" v-if="column.filter">
              <div
                v-if="column.filter.type == 'text'"
                class="input-group input-group-sm my-1"
              >
                <input
                  type="text"
                  :class="{
                    'text-light': column.filter.fixed,
                    'text-warning': !column.filter.fixed,
                  }"
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
                  :disabled="column.filter.fixed"
                  :min="column.filter.min"
                  :max="column.filter.max"
                  :class="{
                    'text-light': column.filter.fixed,
                    'text-warning': !column.filter.fixed,
                  }"
                  @change="reloadTable()"
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

              <div
                v-if="
                  column.filter.type == 'datetime-local' ||
                  column.filter.type == 'date'
                "
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
                    ${ translate(operator.label) }
                  </option>
                </select>

                <input
                  :type="column.filter.type"
                  :class="{
                    'text-light': column.filter.fixed,
                    'text-warning': !column.filter.fixed,
                  }"
                  class="form-control form-control-sm text-warning"
                  v-model="column.filter.value"
                  @change="reloadTable()"
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
            </div>

            <span v-if="column.filterbuttons">
              <span v-for="button in column.filterbuttons" :key="button.action">
                <button
                  type="button"
                  :class="[button.class]"
                  @click="tableAction(button, items, null, $event)"
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
              @click="tableAction(column, item, index, $event)"
            >
              <div class="d-inline-block w-100 px-1" v-if="column.index">
                <span
                  class="cursor-pointer badge border text-secondary p-1 w-100"
                  :class="{
                    'border-info text-info':
                      selected.indexOf(item[settings.pkey]) >= 0,
                  }"
                  v-html="index + 1 + (page.current - 1) * page.limit"
                >
                </span>
              </div>

              <span v-if="!column.template && !column.input">
                ${ tableCellValue(column.name, item, index) }
              </span>
              <span
                v-if="column.template"
                v-html="tableCellTemplate(column.template, item, index, column)"
              >
              </span>
              <span v-if="column.input">
                <input
                  v-if="
                    ['text', 'number', 'date', 'datetime-local'].indexOf(
                      column.input.type
                    ) >= 0
                  "
                  :type="column.input.type"
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
                    @click="tableAction(button, item, index, $event)"
                  >
                    <i v-if="button.icon" :class="[button.icon]"></i>

                    <span
                      v-if="button.template"
                      v-html="
                        tableCellTemplate(button.template, item, index, column)
                      "
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
      <tfoot>
        <tr v-if="selected.length > 0" class="table-bulk border-info">
          <td
            v-for="column in settings.table.columns"
            :style="[column.hidden ? 'display: none' : '']"
            :key="column.name"
            :data-label="column.title"
            :width="column.width"
            :class="column.class"
          >
            <div class="d-inline-block w-100 px-1" v-if="column.index">
              <span
                v-cloak
                class="cursor-pointer d-inline-block badge py-1 px-2 me-1 my-2 w-100 bg-info text-dark"
                @click="toggleSelectedAll()"
              >
                ${ selected.length }
              </span>
            </div>

            <div
              v-if="column.input && column.input.bulkactions"
              class="input-group input-group-sm my-1"
            >
              <input
                v-if="
                  ['text', 'number', 'date', 'datetime-local'].indexOf(
                    column.input.type
                  ) >= 0
                "
                :type="column.input.type"
                class="form-control form-control-sm text-info"
                :disabled="bulkinputs.indexOf(column.name) < 0"
                @change="
                  onBulkInputChange(bulkitem[column.name], bulkitem, column)
                "
                v-model="bulkitem[column.name]"
              />

              <select
                v-if="column.input.type == 'select'"
                class="form-select form-select-sm text-info"
                :disabled="bulkinputs.indexOf(column.name) < 0"
                @change="
                  onBulkInputChange(bulkitem[column.name], bulkitem, column)
                "
                v-model="bulkitem[column.name]"
              >
                <option
                  v-for="option in column.input.options"
                  :value="option.value"
                  :key="option"
                >
                  ${ option.label }
                </option>
              </select>

              <span
                class="input-group-text cursor-pointer"
                @click="ifBulkInputClick(column)"
              >
                <i
                  v-if="bulkitem[column.name] === undefined"
                  class="bi bi-square text-secondary"
                ></i>
                <i v-else class="bi bi-check-square text-warning"></i>
              </span>
            </div>

            <span v-if="column.bulkbuttons">
              <span v-for="button in column.bulkbuttons" :key="button.action">
                <button
                  type="button"
                  :class="[button.class]"
                  :disabled="
                    button.action === 'save' && !this.bulkinputs.length
                  "
                  @click="
                    tableBulkAction(button.action, bulkitem, column, $event)
                  "
                >
                  <i v-if="button.icon" :class="[button.icon]"></i>

                  <span
                    v-if="button.template"
                    v-html="
                      tableCellTemplate(button.template, bulkitem, null, column)
                    "
                  ></span>
                  <span v-else>${ button.title }</span>
                </button>
              </span>
            </span>
          </td>
        </tr>
      </tfoot>
    </table>

    <VuAdminTablePagination
      :settings="settings"
      :page="page"
      @setPage="setPage"
      @setPageLimit="setPageLimit"
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
  login,
  getResponseJson,
  prepareFetchOptions,
  flattenArrayObjects,
  flattenObject,
  unflattenObject,
  translate,
  convertToCSV,
  downloadCSV,
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
      bulkitem: {},
      bulkinputs: [],
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
      message: null,
      messageTimeOut: null,
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


    if (this.settings.api.auth && this.settings.api.auth.type == "Login") {

      console.log(this.settings.api.auth);

      login(this.settings.api.auth.url, this.settings.api.auth.username, this.settings.api.auth.password);

    }

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

      if (!this.settings.table.column) {
        return;
      }

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

    reloadTable(params) {
      this.fetchTable(params);
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

      // console.log(
      //   this.page,
      //   this.page.current,
      //   this.page.limit,
      //   this.page.current * this.page.limit
      // );

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

    tableCellTemplate(fn, item, index, column) {
      try {
        return fn(item[column.name], item, index, column);
      } catch (e) {
        return e.message;
      }
    },

    tableAction(button, item, index, event) {
      if (event) {
        event.stopPropagation();
      }

      let action = button.action
        ? button.action
        : button.click
        ? button.click
        : null;

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
          this.saveItem(
            item,
            () => {
              this.addMessage(
                "#" + (index + 1) + " " + this.translate("saved"),
                2500
              );
            },
            button.params
          );

          break;

        case "create":
          this.createItem(item, button.params);
          break;

        case "delete":
          this.deleteItem(item, button.params);
          break;

        case "reload":
          this.reloadTable(button.params);
          break;

        case "export":
          this.exportTable(button.params);
          break;
      }
    },

    tableBulkAction(action, items, column, event) {
      if (event) {
        event.stopPropagation();
      }

      if (action && typeof action !== "string") {
        action(item, this);
        return;
      }

      switch (action) {
        case "save":
          this.saveBulk(() => {
            this.addMessage(this.translate("saved all selected items"), 2500);
          });

          break;

        case "delete":
          this.deleteItems(this.selected, (response) => {
            this.selected = [];
          });
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
      let haveOrder = false;

      for (let key of Object.keys(this.page.order)) {
        haveOrder = true;
        order[this.page.order[key].idx] = {
          key: key,
          dir: this.page.order[key].dir,
        };
      }

      return haveOrder ? order : null;
    },

    getFiltersForFetch() {
      let filter = {};
      let haveFilter = false;

      for (let column of this.settings.table.columns) {
        if (column.filter && column.filter.value !== undefined) {
          haveFilter = true;

          filter[column.name] = {
            type: column.filter.type,
            value: column.filter.onchange
              ? column.filter.onchange(column.filter)
              : column.filter.value,
            operator: column.filter.operator,
          };
        }
      }

      return haveFilter ? filter : null;
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

    async fetchTable(paramsData) {
      try {
        this.errors = null;
        this.wait.table = true;

        let filter = this.getFiltersForFetch();
        let relations = this.getRelationsForFetch();
        let order = this.getOrdersForFetch();

        paramsData = paramsData ? paramsData : {};
        paramsData.page = this.page.current;
        paramsData.limit = this.page.limit;

        if (filter !== null) {
          paramsData.filter = JSON.stringify(filter);
        }

        if (order !== null) {
          paramsData.order = JSON.stringify(order);
        }

        if (this.settings.events && this.settings.events.tableBeforeLoad) {
          this.settings.events.tableBeforeLoad(paramsData, this.settings);
        }

        const params = new URLSearchParams(paramsData);

        let options = prepareFetchOptions("GET", this.settings);
        let url = this.settings.api.url + "?" + params.toString();

        const response = await fetch(url, options);

        // console.log(response);

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        const data = await getResponseJson(response);
        let error = this.getResponseErrors(response, data);

        if (error || !data) {
          console.log(this.errors);
          this.wait.table = false;
          return;
        }

        if (this.settings.events && this.settings.events.tableAfterLoad) {
          this.settings.events.tableAfterLoad(data, response);
        }

        if (data.page) {
          this.page.all = data.page.all;
          this.page.items = data.page.items;
          this.page.current = data.page.current;
          this.calcPage();
        }

        let items = this.settings.api.input.items
          ? data[this.settings.api.input.items]
          : data;

        //console.log(items);

        // load relations
        for (let key of Object.keys(relations)) {
          relations[key].ids = [];

          for (let item of items) {
            let local = item[relations[key].local];

            if (local) {
              relations[key].ids.push(local);
            }
          }

          await this.fetchRelation(relations[key], items);
        }

        if (items) {
          // this.items = data.items;
          this.items = flattenArrayObjects(items);
          this.convertsIn(this.items);
        }

        this.wait.table = false;
      } catch (error) {
        console.error(error.message);

        this.addMessage(error.message, 3500, "danger");
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
        let url = this.settings.api.url + "?" + params.toString();

        const response = await fetch(url, options);

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        const data = await getResponseJson(response);
        const error = this.getResponseErrors(response, data);

        if (error || !data) {
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

        let options = prepareFetchOptions("GET", this.settings);
        let url = this.settings.api.url + "/" + item[this.settings.pkey];

        const response = await fetch(url, options);

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
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

    async deleteItem(item, paramsData) {
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

        paramsData = paramsData ? paramsData : {};

        const params = new URLSearchParams(paramsData);

        let options = prepareFetchOptions("DELETE", this.settings);
        let url =
          this.settings.api.url +
          "/" +
          item[this.settings.pkey] +
          "?" +
          params.toString();

        const response = await fetch(url, options);

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        this.modalWindow.hide();

        this.reloadTable();
        this.wait.form = false;
      } catch (error) {
        console.error(error.message);
        this.wait.form = false;
      }
    },

    async deleteItems(ids, callback) {
      try {
        this.errors = null;

        if (!ids) {
          return;
        }

        const confirmed = confirm(
          this.translate("Are you sure you want to delete all selected items?")
        );

        if (!confirmed) {
          return;
        }

        this.wait.form = true;

        let options = prepareFetchOptions("DELETE", this.settings);
        let url = this.settings.api.url;

        options.body = JSON.stringify({
          ids: ids,
        });

        const response = await fetch(url, options);

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        if (callback) {
          callback(response);
        }

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

    async saveItem(input, callback, paramsData) {
      try {
        // this.errors = null;

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

        paramsData = paramsData ? paramsData : {};
        const params = new URLSearchParams(paramsData);
        let paramsString = params.toString();

        let url =
          this.settings.api.url +
          (primaryId ? "/" + primaryId : "") +
          (paramsString ? "?" + paramsString : "");

        const response = await fetch(url, options).catch((err) => {
          // console.error(err.message);
          this.addMessage(err.message, 3500, "danger");
        });

        const data = await getResponseJson(response);
        const error = this.getResponseErrors(response, data);
        this.wait.form = false;

        if (error) {
          console.log(this.errors);
          return;
        }

        if (callback) {
          callback(data);
        }
      } catch (error) {
        console.error(error.message);
        this.addMessage(error.message, 3500, "danger");

        // this.errors = {
        //   "": [
        //     {
        //       message: error.message,
        //       value: null,
        //     },
        //   ],
        // };

        this.wait.form = false;
      }
    },

    async saveBulk(callback) {
      try {
        // this.errors = null;

        this.wait.form = true;

        let item = {};

        for (let field in this.bulkitem) {
          if (this.bulkinputs.indexOf(field) >= 0) {
            item[field] = this.bulkitem[field];
          }
        }

        this.convertsOut([item]);
        //item = unflattenObject(item);

        // console.log(item);

        let options = prepareFetchOptions("PUT", this.settings);

        options.body = JSON.stringify({
          item: item,
          ids: this.selected,
        });

        let url = this.settings.api.url;

        const response = await fetch(url, options).catch((err) => {
          console.error(err.message);
          this.addMessage(err.message, 3500, "danger", err);
        });

        const data = await getResponseJson(response);
        const error = this.getResponseErrors(response, data);
        this.wait.form = false;

        if (error) {
          return;
        }

        if (callback) {
          callback(data);
        }

        // this.selected = [];
        this.reloadTable();
      } catch (error) {
        console.error(error.message);
        this.addMessage(error.message, 3500, "danger", error);
        this.wait.form = false;
      }
    },

    getResponseErrors(response, data) {
      if (response.status >= 400 && response.status <= 511) {
        if (data.errors) {
          for (let error of data.errors) {
            this.addMessage(error.message, 3500, "danger", error);
          }
        } else if (data.error) {
          this.addMessage(data.error, 3500, "danger", response);
        } else {
          this.addMessage(response.statusText, 3500, "danger", response);
        }

        return true;
      }

      return false;
    },

    countHiddenColumns() {
      return this.settings.table.columns.filter(
        (element) => element.hidden === true
      ).length;
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

    toggleSelectedRowInPage() {
      if (this.haveSelectedRowInPage()) {
        for (let item of this.items) {
          let idx = this.selected.indexOf(item[this.settings.pkey]);

          if (idx >= 0) {
            this.selected.splice(idx, 1);
          }
        }
      } else {
        for (let item of this.items) {
          if (this.selected.indexOf(item[this.settings.pkey]) < 0) {
            this.selected.push(item[this.settings.pkey]);
          }
        }
      }

      if (!this.selected.length) {
        this.bulkitem = {};
      }
    },

    haveSelectedRowInPage() {
      if (!this.items || !this.items.length) {
        return false;
      }

      for (let item of this.items) {
        if (this.selected.indexOf(item[this.settings.pkey]) >= 0) {
          return true;
        }
      }

      return false;
    },

    toggleDetail(index) {
      let idx = this.details.indexOf(index);

      if (idx >= 0) {
        this.details.splice(idx, 1);
      } else {
        this.details.push(index);
      }
    },

    async exportTable(paramsData) {
      try {
        paramsData.limit = ".";

        let filter = this.getFiltersForFetch();
        // let relations = this.getRelationsForFetch();
        let order = this.getOrdersForFetch();

        if (this.selected.length > 0) {
          filter[this.settings.pkey] = {
            type: "string",
            value: this.selected,
            operator: "in",
          };
        }

        if (filter !== null) {
          paramsData.filter = JSON.stringify(filter);
        }

        if (order !== null) {
          paramsData.order = JSON.stringify(order);
        }

        if (this.settings.events && this.settings.events.tableBeforeLoad) {
          this.settings.events.tableBeforeLoad(paramsData, this.settings);
        }

        const params = new URLSearchParams(paramsData);

        let options = prepareFetchOptions("GET", this.settings);
        let url = this.settings.api.url + "?" + params.toString();

        const response = await fetch(url, options);

        // console.log(response);

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        const data = await getResponseJson(response);
        let error = this.getResponseErrors(response, data);

        if (error || !data) {
          return;
        }

        if (this.settings.events && this.settings.events.tableAfterLoad) {
          this.settings.events.tableAfterLoad(data, response);
        }

        let items = flattenArrayObjects(data);
        this.convertsIn(items);
        let csvString = convertToCSV(
          items,
          this.settings.table.exports[paramsData.type].fields
        );

        downloadCSV(csvString, this.settings.entity + ".csv");

        // // load relations
        // for (let key of Object.keys(relations)) {
        //   relations[key].ids = [];

        //   for (let item of items) {
        //     let local = item[relations[key].local];

        //     if (local) {
        //       relations[key].ids.push(local);
        //     }
        //   }

        //   await this.fetchRelation(relations[key], items);
        // }

        // if (items) {
        //   // this.items = data.items;
        //   items = flattenArrayObjects(items);
        //   this.convertsIn(items);
        //   items = unflattenObjects(items)
        // }
      } catch (error) {
        console.error(error.message);

        this.addMessage(error.message, 3500, "danger");
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

    onBulkInputChange(value, bulkitem, column) {
      if (!column || !column.input) {
        return;
      }

      if (column.input.onchange) {
        column.input.onchange(value, column);
      }
    },

    ifBulkInputClick(column) {
      let idx = this.bulkinputs.indexOf(column.name);

      if (idx < 0) {
        this.bulkinputs.push(column.name);
      } else {
        this.bulkinputs.splice(idx, 1);
      }

      let bulkvalue = this.bulkitem[column.name];

      if (bulkvalue === undefined) {
        this.bulkitem[column.name] = null;
      } else {
        this.bulkitem[column.name] = undefined;
      }
    },

    addMessage(msg, timeout, priority, details) {
      clearTimeout(this.messageTimeout);

      const uid = Date.now() + Math.random().toString(36).substring(2, 9);

      this.message = {
        uid: uid,
        msg: msg,
        timeout: timeout !== undefined ? timeout : 2500,
        datetime: new Date().toLocaleString("hu-HU"),
        priority: priority ? priority : "info",
        details: details,
      };

      this.messages.unshift(this.message);

      this.messageTimeOut = setTimeout(() => {
        this.message = null;

        // let index = this.messages.findIndex((m) => m.uid === uid);

        // if (index !== -1) {

        //   //this.messages[index].hidden = true;
        // }

        if (this.messages.length > 10) {
          this.messages.splice(10);
        }
      }, this.message.timeout);
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

[data-bs-theme="light"] {
  .table-title {
    color: var(--bs-dark);
  }
  .table-header {
    user-select: none;
    background-color: var(--bs-light);
    color: var(--bs-dark);
  }
  .table-bulk {
    background-color: var(--bs-dark);
    color: var(--bs-light);
  }
}

[data-bs-theme="dark"] {
  background-color: var(--bs-dark);

  .table-title {
    color: var(--bs-light);
  }
  .table-header {
    user-select: none;
    background-color: var(--bs-secondary);
    color: var(--bs-light);
  }
  .table-bulk {
    td {
    }
  }
}
</style>


<!-- :root {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
} -->