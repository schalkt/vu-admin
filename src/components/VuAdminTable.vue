<template>
  <div v-cloak v-if="settings && settings.table">

    <div class="vua-table-container" :class="[settings.class]" :data-bs-theme="[settings.theme]">

      <div class="vua-overlay" :class="{ blocked: ui.block.table }"></div>
      <div class="vua-table-title">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-inline-block">
            <h5 class="card-title d-inline-block mb-2" v-if="settings.table.title">
              {{ settings.table.title }}
            </h5>

            <div v-show="ui.wait.table && settings.table.title" class="spinner-border spinner-border-sm mx-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="d-inline-block" v-if="messages.table.length">
            <small class="d-inline-block px-1 mx-1" v-if="message.table">
              <span :class="['text-' + message.table.priority]">
                <span class="fw-bold" v-html="message.table.msg"></span>
              </span>
            </small>

            <div class="dropdown d-inline-block">
              <button class="btn btn-sm dropdown-toggle" :class="['btn-' + messages.table[0].priority]" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                v-html="messages.table.length + ' ' + (messages.table.length > 1 ? translate('messages') : translate('message'))">
              </button>
              <ul class="dropdown-menu text-start">
                <li v-for="message in messages.table" :key="message">
                  <span class="dropdown-item" :class="['text-' + message.priority]">
                    <small class="me-2 text-muted">{{ message.datetime }}</small>
                    <span class="fw-bold" v-html="message.msg"></span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-if="settings.table.control" class="vua-table-control" :class="[settings.table.control.class]">
        <span v-for="button in settings.table.control.buttons" :key="button.action">
          <button v-if="button.action !== 'TABLE_COLUMNS' && !button.dropdowns" type="button" :class="[
            button.class ? button.class : getButtonClassByAction(button.action),
          ]" @click="tableAction(button, {
            items: items,
            $event: $event
          })">
            <i :class="[
              button.icon !== undefined
                ? getValueOrFunction(button.icon, {
                  button: button,
                  table: this,
                })
                : getButtonIconClassByAction(button.action),
            ]"></i>
            {{ translate(button.title) }}
          </button>

          <div class="dropdown d-inline-block" v-if="button.action === 'TABLE_COLUMNS'">
            <button type="button" :class="[
              button.class
                ? button.class
                : getButtonClassByAction(button.action),
            ]" class="dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
              <span v-cloak v-show="settings.table.columns.length > 0" class="mx-1">
                <i :class="[
                  button.icon !== undefined
                    ? getValueOrFunction(button.icon, {
                      button: button,
                      table: this,
                    })
                    : getButtonIconClassByAction(button.action),
                ]"></i>
                {{ translate(button.title) }}
                <span v-if="countHiddenColumns()">
                  ( {{ countHiddenColumns() }} {{ translate('hidden') }} )
                </span>
              </span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="column in settings.table.columns" :key="column">
                <span class="dropdown-item cursor-pointer" @click="toggleColumn(column)">
                  <i v-if="!column.hidden" class="bi bi-check-square-fill me-2"></i>
                  <i v-if="column.hidden" class="bi bi-x-square me-2 text-danger"></i>
                  {{ column.title }}
                  <small class="badge text-secondary fw-normal">{{ column.name }}</small>
                </span>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <span class="dropdown-item cursor-pointer" @click="toggleColumn(true)">{{ translate('Visible all') }}</span>
              </li>
              <li>
                <span class="dropdown-item cursor-pointer" @click="toggleColumn(false)">{{ translate('Hidden all') }}</span>
              </li>
            </ul>
          </div>

          <div class="dropdown d-inline-block" v-cloak v-if="button.dropdowns">
            <button type="button" :class="[button.class]" class="dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
              <span class="mx-1">
                <i :class="[
                  button.icon !== undefined
                    ? getValueOrFunction(button.icon, {
                      button: button,
                      table: this,
                    })
                    : getButtonIconClassByAction(button.action),
                ]"></i> {{ translate(button.title) }}
              </span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="dropdown in button.dropdowns" :key="dropdown">
                <span class="dropdown-item cursor-pointer" :class="[dropdown.class]" @click="tableAction(dropdown, {
                  items: items,
                  $event: $event
                })">
                  <i v-if="dropdown.icon" :class="[dropdown.icon]"></i>
                  {{ translate(dropdown.title) }}
                </span>
              </li>
            </ul>
          </div>
        </span>
      </div>

      <table v-if="settings.table" class="table vua-table mb-0" :class="[settings.table.class]">
        <thead>
          <tr class="vua-table-header">
            <th class="" v-for="column in settings.table.columns" :style="[column.hidden ? 'display: none' : '']" :key="column" :width="column.width"
              :class="[column.header ? column.header.class : '']">
              <span class="d-inline-block no-select text-nowrap" :class="{ 'cursor-pointer': isSortable(column) }" @click="sortTable(column)">

                <span v-html="(column.header && column.header.title
                  !== undefined) ?
                  translate(column.header.title) : (column.title ? translate(column.title) :
                    translate(column.name))"></span>

                <span class="badge text-bg-light ms-1 p-badge" v-if="
                  config.order[column.name]" :class="{
                    'opacity-50': config.order[column.name].fixed,
                  }">
                  <i v-if="config.order[column.name].dir === 'ASC'" class="bi bi-arrow-down"></i>
                  <i v-if="config.order[column.name].dir === 'DESC'" class="bi bi-arrow-up"></i>
                  {{ config.order[column.name].idx + 1 }}

                </span>

              </span>

              <span v-if="column.header && column.header.buttons">
                <button v-for="button in column.header.buttons" :key="button.action" type="button"
                  :disabled="button.disabled !== undefined ? getValueOrFunction(button.disabled) : null" :class="[
                    button.class
                      ? button.class
                      : getButtonClassByAction(button.action),
                  ]" @click="tableAction(button, {
                    items: items,
                    $event: $event
                  })">
                  <i :class="[
                    button.icon !== undefined
                      ? getValueOrFunction(button.icon, {
                        button: button,
                        column: column,
                        table: this,
                      })
                      : getButtonIconClassByAction(button.action),
                  ]"></i>
                  {{ translate(button.title) }}
                </button>
              </span>
            </th>
          </tr>
          <tr v-if="countFilters()" class="vua-table-filter">
            <th v-for="column in settings.table.columns" :style="[column.hidden ? 'display: none' : '']" :key="column" :width="column.width"
              :class="[column.filter ? column.filter.class : '']">
              <div class="d-inline-block w-100 px-1" v-if="column.index && column.click">
                <span class="cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100" v-cloak :class="{ 'active': haveSelectedRowInPage() }"
                  @click="toggleSelectedRowInPage()">
                  <i v-show="!haveSelectedRowInPage()" class="bi bi-check-all"></i>
                  <i v-show="haveSelectedRowInPage()" class="bi bi-x-lg"></i>
                </span>
              </div>

              <div v-if="column.filter && column.filter.type == 'text'" class="input-group input-group-sm my-1">
                <input type="text" :class="{
                  'fixed': column.filter.fixed,
                }" class="form-control form-control-sm" v-model="column.filter.value" @keyup.enter="reloadTable()" />

                <button class="btn btn-outline-secondary" v-if="column.filter.buttonx && column.filter.buttonx != false" :disabled="column.filter.value == null" :class="{
                  'opacity-25': column.filter.value == null,
                }" @click="
                  column.filter.value = undefined;
                reloadTable();
                ">
                  <i class="bi bi-x"></i>
                </button>
              </div>

              <div v-if="column.filter && column.filter.type == 'number'" class="input-group input-group-sm my-1">
                <select v-if="column.filter.operators == true" v-model="column.filter.operator" :disabled="column.filter.fixed" @change="reloadTable()"
                  class="form-select form-select-sm pe-0">
                  <option value="=">{{ translate('=') }}</option>
                  <option value=">">{{ translate('>') }}</option>
                  <option value=">=">{{ translate('>=') }}</option>
                  <option value="<">{{ translate('<') }}</option>
                  <option value="<=">{{ translate('<=') }}</option>
                </select>

                <select v-if="
                  column.filter.operators && column.filter.operators.length > 0
                " v-model="column.filter.operator" :disabled="column.filter.fixed" @change="reloadTable()" class="form-select form-select-sm pe-0">
                  <option v-for="operator in column.filter.operators" :key="operator" :value="operator.value">
                    {{ operator.label }}
                  </option>
                </select>

                <input type="number" class="form-control" v-model="column.filter.value" :disabled="column.filter.fixed" :min="column.filter.min" :max="column.filter.max" :class="{
                  'fixed': column.filter.fixed,
                }" @change="reloadTable()" @keyup.enter="reloadTable()" />

                <button v-if="!column.filter.fixed && column.filter.buttonx && column.filter.buttonx != false" class="btn btn-outline-secondary"
                  :disabled="column.filter.value == null" :class="{
                    'opacity-25': column.filter.value == null,
                  }" @click="
                    column.filter.value = undefined;
                  reloadTable();
                  ">
                  <i class="bi bi-x"></i>
                </button>
              </div>

              <div v-if="column.filter && column.filter.type == 'select'">

                <div class="dropdown" v-if="column.filter.dropdown">
                  <button class="btn btn-sm btn-secondary dropdown-toggle my-1" type="button" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ column.filter.multiple ? (column.filter.value.length + " selected") : (column.filter.value ? column.filter.value : 'not selected') }}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <span v-for="option in column.filter.options" :key="option" class="dropdown-item cursor-pointer"
                        :class="{ 'selected': (column.filter.multiple ? column.filter.value.indexOf(option.value) >= 0 : column.filter.value === option.value) }"
                        @click="dropdownSelectToggleOne(column.filter, option)">
                        <i v-if="(column.filter.multiple ? column.filter.value.indexOf(option.value) >= 0 : column.filter.value === option.value)" class="bi bi-check-square"></i>
                        <i v-else class="bi bi-square"></i>
                        {{ translate(option.label ? option.label : option.value) }}
                      </span>
                    </li>
                    <li v-if="column.filter.multiple">
                      <hr class="dropdown-divider">
                    </li>
                    <li v-if="column.filter.multiple">
                      <span class="dropdown-item cursor-pointer" @click="dropdownSelectAll(column.filter.value, column.filter.options)">
                        {{ translate('Select all') }}
                      </span>
                    </li>
                    <li v-if="column.filter.multiple">
                      <span class="dropdown-item cursor-pointer" @click="dropdownSelectClear(column.filter.value)">
                        {{ translate('Unselect all') }}
                      </span>
                    </li>
                    <li v-if="column.filter.multiple">
                      <span class="dropdown-item cursor-pointer" @click="dropdownSelectInvert(column.filter.value, column.filter.options)">
                        {{ translate('Invert all') }}
                      </span>
                    </li>
                  </ul>
                </div>

                <div v-else class="input-group input-group-sm my-1">

                  <select v-model="column.filter.value" @change="reloadTable()" :multiple="column.filter.multiple" class="form-select form-select-sm pe-0">
                    <option v-for="option in column.filter.options" :key="option" :value="option.value">
                      {{ translate(option.label ? option.label : option.value) }}
                    </option>
                  </select>

                  <button class="btn btn-outline-secondary" v-if="column.filter.buttonx && column.filter.buttonx != false" :disabled="column.filter.value == null" :class="{
                    'opacity-25': column.filter.value == null,
                  }" @click="
                    column.filter.value = undefined;
                  reloadTable();
                  ">
                    <i class="bi bi-x"></i>
                  </button>

                </div>

              </div>

              <div v-if="
                column.filter &&
                (column.filter.type == 'datetime-local' ||
                  column.filter.type == 'date')
              " class="input-group input-group-sm my-1">
                <select v-if="column.filter.operators == true" v-model="column.filter.operator" @change="reloadTable()" class="form-select form-select-sm pe-0">
                  <option value="=">{{ translate('=') }}</option>
                  <option value=">">{{ translate('>') }}</option>
                  <option value=">=">{{ translate('>=') }}</option>
                  <option value="<">{{ translate('<') }}</option>
                  <option value="<=">{{ translate('<=') }}</option>
                </select>

                <select v-if="
                  column.filter.operators && column.filter.operators.length > 0
                " v-model="column.filter.operator" @change="reloadTable()" class="form-select form-select-sm pe-0">
                  <option v-for="operator in column.filter.operators" :key="operator" :value="operator.value">
                    {{ translate(operator.label) }}
                  </option>
                </select>

                <input :type="column.filter.type" :class="{
                  'fixed': column.filter.fixed,
                }" class="form-control form-control-sm" v-model="column.filter.value" @change="reloadTable()" @keyup.enter="reloadTable()" />

                <button class="btn btn-outline-secondary" :disabled="!column.filter.value" :class="{
                  'opacity-25': !column.filter.value,
                }" @click="
                  column.filter.value = undefined;
                reloadTable();
                ">
                  <i class="bi bi-x"></i>
                </button>
              </div>

              <span v-if="column.filter && column.filter.buttons" :class="getValueOrFunction(column.filter.buttons, {
                column: column,
              })
                ">
                <span v-for="button in column.filter.buttons" :key="button.action">
                  <button type="button" :disabled="button.disabled !== undefined ? getValueOrFunction(button.disabled) : null" :class="[
                    button.class
                      ? button.class
                      : getButtonClassByAction(button.action),
                  ]" @click="tableAction(button, {
                    items: items,
                    $event: $event
                  })">
                    <i :class="[
                      button.icon !== undefined
                        ? getValueOrFunction(button.icon, {
                          button: button,
                          column: column,
                          table: this,
                        })
                        : getButtonIconClassByAction(button.action),
                    ]"></i>
                    {{ translate(button.title) }}
                  </button>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in this.items" :key="item.id">
            <tr class="align-middle">
              <td v-for="column in settings.table.columns" :style="[column.hidden ? 'display: none' : '']" :key="column.name"
                :data-label="column.title ? column.title : translate(column.name)" :width="column.width" :class="getValueOrFunction(column.class, {
                  column: column,
                  item: item,
                })
                  " @click="tableAction(column, {
                    item: item,
                    index: index,
                    $event: $event
                  })">

                <div class="d-inline-block w-100 px-1" v-if="column.index">
                  <span class="cursor-pointer badge border badge-index p-1 w-100" :class="{
                    'selected':
                      selected.indexOf(item[settings.pkey]) >= 0,
                  }" v-html="index +
                    1 +
                    (config.pagination.page - 1) * config.pagination.limit
                    ">
                  </span>
                </div>

                <span v-if="!column.template && !column.input && !column.progressbar">
                  {{ tableCellValue(column.name, item, index, column) }}
                </span>
                <span v-if="column.template" v-html="tableCellTemplate(column.template, item, index, column)">
                </span>

                <div v-if="column.progressbar" class="progress" role="progressbar" aria-label="Warning example" :aria-valuenow="item[column.name]"
                  :aria-valuemax="column.progressbar.max">
                  <div class="progress-bar" :class="[column.progressbar.class]" :style="{ width: Math.round(item[column.name] / column.progressbar.max * 100) + '%' }">
                    <span v-if="column.progressbar.value">{{ item[column.name] }}</span>
                  </div>
                </div>

                <div v-if="column.input" class="input-group input-group-sm">
                  <span v-if="column.input.prefix" class="input-group-text" v-html="getValueOrFunction(column.input.prefix, {
                    column: column,
                    item: item,
                  })
                    "></span>

                  <input v-if="
                    ['text', 'number', 'date', 'datetime-local'].indexOf(
                      column.input.type
                    ) >= 0
                  " :type="column.input.type" class="form-control form-control-sm" :class="getValueOrFunction(column.input.class, {
                    column: column,
                    item: item,
                  })" @change="
                    onRowInputChange(item[column.name], column, item, index)
                    " v-model="item[column.name]" />

                  <select v-if="column.input.type == 'select'" class="form-select form-select-sm pe-0" :class="getValueOrFunction(column.input.class, {
                    column: column,
                    item: item,
                  })" @change="
                    onRowInputChange(item[column.name], column, item, index)
                    " v-model="item[column.name]">
                    <option v-for="option in column.input.options" :value="option.value" :key="option">
                      {{ translate(option.label) }}
                    </option>
                  </select>

                  <span v-if="column.input.suffix" class="input-group-text" v-html="getValueOrFunction(column.input.suffix, {
                    column: column,
                    item: item,
                  })
                    "></span>
                </div>

                <span v-if="column.buttons">
                  <span v-for="button in column.buttons" :key="button.action">
                    <button v-if="!button.hidden" type="button" :disabled="button.disabled !== undefined ? getValueOrFunction(button.disabled) : null" :class="[
                      button.class
                        ? getValueOrFunction(button.class, {
                          button: button,
                          column: column,
                          item: item,
                          table: this,
                        })
                        : getButtonClassByAction(button.action),
                    ]" @click="tableAction(button, {
                      column: column,
                      item: item,
                      index: index,
                      $event: $event
                    })">
                      <i v-if="button.icon !== null" :class="[
                        button.icon !== undefined
                          ? getValueOrFunction(button.icon, {
                            button: button,
                            column: column,
                            item: item,
                            table: this,
                          })
                          : getButtonIconClassByAction(button.action),
                      ]"></i>

                      <span v-if="button.template" v-html="tableCellTemplate(button.template, item, index, column)
                        "></span>
                      <span v-else>{{ translate(button.title) }}</span>
                    </button>
                  </span>
                </span>
              </td>
            </tr>
            <tr v-if="
              settings.table.details &&
              details.indexOf(item[settings.pkey]) >= 0
            ">
              <td :class="[settings.table.details.class]" :colspan="settings.table.columns.length">
                <div class="m-0" v-for="field in settings.table.details.fields" :key="field">
                  <div class="row g-3 align-items-center">
                    <div class="col text-end" :class="[field.class]">
                      <label class="col-form-label">{{ field.label }}</label>
                    </div>
                    <div class="col" :class="[field.input.class]">
                      <input :type="field.input.type" v-if="['select', 'textarea'].indexOf(field.input.type) < 0" class="form-control form-control-sm" v-model="item[field.name]"
                        @change="
                          onRowInputChange(item[field.name], field, item, index)
                          " />

                      <textarea v-if="field.input.type == 'textarea'" class="form-control form-control-sm" rows="3" v-model="item[field.name]" @change="
                        onRowInputChange(item[field.name], field, item, index)
                        ">

                    </textarea>

                      <select v-if="field.input.type == 'select'" class="form-select form-select-sm pe-0" v-model="item[field.name]" @change="
                        onRowInputChange(item[field.name], field, item, index)
                        ">
                        <option v-for="option in field.input.options" :value="option.value" :key="option">
                          {{ translate(option.label) }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <span v-html="settings.table.details.raw(item)"></span>

                <pre class="bg-light text-dark" v-if="settings.debug">
                {{ item }}
              </pre>

              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr v-if="selected.length > 0" class="vua-table-bulk border-info">
            <td v-for="column in settings.table.columns" :style="[column.hidden ? 'display: none' : '']" :key="column.name" :data-label="column.title" :width="column.width"
              :class="column.class">
              <div class="d-inline-block w-100 px-1" v-if="column.index">
                <span v-cloak class="cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100" @click="toggleSelectedAll()">
                  {{ selected.length }}
                </span>
              </div>

              <div v-if="column.input && column.bulk && column.bulk.enabled" class="input-group input-group-sm my-1">
                <input v-if="
                  ['text', 'number', 'date', 'datetime-local'].indexOf(
                    column.input.type
                  ) >= 0
                " :type="column.input.type" class="form-control form-control-sm" :class="column.input.class" :disabled="bulkinputs.indexOf(column.name) < 0" @change="
                  onBulkInputChange(bulkitem[column.name], bulkitem, column)
                  " v-model="bulkitem[column.name]" />

                <select v-if="column.input.type == 'select'" class="form-select form-select-sm pe-0" :class="column.input.class" :disabled="bulkinputs.indexOf(column.name) < 0"
                  @change="
                    onBulkInputChange(bulkitem[column.name], bulkitem, column)
                    " v-model="bulkitem[column.name]">
                  <option v-for="option in column.input.options" :value="option.value" :key="option">
                    {{ translate(option.label) }}
                  </option>
                </select>

                <span class="input-group-text cursor-pointer" @click="ifBulkInputClick(column)">
                  <i v-if="bulkitem[column.name] === undefined" class="bi bi-square text-secondary"></i>
                  <i v-else class="bi bi-check-square"></i>
                </span>
              </div>

              <span v-if="column.bulk">
                <span v-for="button in column.bulk.buttons" :key="button.action">
                  <button type="button" :class="[
                    button.class
                      ? button.class
                      : getButtonClassByAction(button.action),
                  ]" :disabled="button.action === 'save' && !this.bulkinputs.length
                    " @click="
                      tableBulkAction(button.action, bulkitem, column, $event)
                      ">
                    <i v-if="button.icon !== null" :class="[
                      button.icon !== undefined
                        ? getValueOrFunction(button.icon, {
                          button: button,
                          column: column,
                          table: this,
                        })
                        : getButtonIconClassByAction(button.action),
                    ]"></i>

                    <span v-if="button.template" v-html="tableCellTemplate(button.template, bulkitem, null, column)
                      "></span>
                    <span v-else>
                      {{ translate(button.title) }}
                    </span>
                  </button>
                </span>
              </span>
            </td>
          </tr>
        </tfoot>
      </table>

      <VuAdminTablePagination :settings="settings" :config="config" :ui="ui" @setPage="setPage" @setPageLimit="setPageLimit" @translate="translate"></VuAdminTablePagination>

      <div class="modal shadow" :id="modalId" tabindex="-1">
        <div class="modal-dialog modal-xl">
          <div class="modal-content h-100">
            <VuAdminForm v-cloak v-if="settings.form.visible && settings.form.groups" v-model="item" :formid="formId" :settings="settings" :modalWindow="modalWindow"
              :saveItem="saveItem" :deleteItem="deleteItem" :reloadTable="reloadTable" :fetchRelation="fetchRelation"></VuAdminForm>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Modal } from "bootstrap";
import mitt from 'mitt';
import {
  deepMerge,
  getValueOrFunction,
  getResponseJson,
  getResponseErrors,
  prepareFetchUrl,
  prepareFetchOptions,
  flattenArrayObjects,
  flattenObject,
  unflattenObject,
  translate,
  convertToCSV,
  downloadCSV,
  arrayUnique,
  arrayToggleOne,
  arraySelectAll,
  arraySelectInvert,
  arraySelectClear,
  executeFunctions
} from "./helpers";
import VuAdminForm from "./VuAdminForm.vue";
import VuAdminTablePagination from "./VuAdminTablePagination.vue";

const eventBus = mitt();

const BTN_TABLE_ROW_EDIT = 'table:row:edit';
const BTN_TABLE_ROW_SAVE = 'table:row:save';
const BTN_TABLE_ROW_DELETE = 'table:row:delete';
const BTN_TABLE_BULK_SAVE = 'table:bulk:save';
const BTN_TABLE_BULK_DELETE = 'table:bulk:delete';


export default {
  name: "VuAdminTable",
  props: {
    settings: Object,
  },
  components: {
    VuAdminForm,
    VuAdminTablePagination,
  },
  data() {
    return {
      item: {},
      items: {},
      selected: [], // config alá menjen, hogy a localStorage -ba mentsük el ezt is
      details: [], // melyik sor van kinyitva
      bulkitem: {},
      bulkinputs: [],
      config: {
        pagination: {
          total: undefined,
          page: 1,
          skip: 0,
          limit: 10,
          limits: [10, 20, 50, 100],
          size: 5,
          items: null,
          pages: null,
          numbers: [],
        },
        order: {},
        filter: {},
        orderIndex: 1,
      },
      ui: {
        wait: {
          table: false,
          form: false,
        },
        block: {
          table: false,
          form: false,
        },
      },
      formId: null,
      formData: null,
      modalId: null,
      modalElement: null,
      modalWindow: null,
      messages: {
        table: [],
        form: [],
      },
      message: {
        table: null,
        form: null,
      },
      messageTimeOut: null,
    };
  },

  created() {
    if (!this.settings.table) {
      return false;
    }

    if (this.settings.table.pagination) {
      this.config.pagination = Object.assign(
        {},
        this.config.pagination,
        this.settings.table.pagination
      );
    }

    this.setPage(this.config.pagination.page, false);

    if (this.settings.table.order) {
      this.config.order = Object.assign(
        {},
        this.config.order,
        this.settings.table.order
      );
    }

    if (!this.settings.table.header) {
      this.settings.table.header = {};
    }

    if (!this.settings.api) {
      this.settings.api = {};
    }

    this.settings.api = Object.assign(
      {
        url: null,
        input: {},
        output: {},
        options: {},
      },
      this.settings.api
    );

    if (!this.settings.table.api) {
      this.settings.table.api = {};
    }

    if (!this.settings.form) {
      this.settings.form = {};
    }

    if (!this.settings.form.api) {
      this.settings.form.api = {};
    }

    this.settings.table.api = Object.assign(
      {},
      this.settings.api,
      this.settings.table.api
    );
    this.settings.form.api = Object.assign(
      {},
      this.settings.api,
      this.settings.form.api
    );

    // this.modalElement.addEventListener('hide.bs.modal', event => {

    // 	if (!this.ui.wait.form && this.itemIsModified()) {

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

    this.modalElement.addEventListener('hidden.bs.modal', event => {
      this.settings.form.visible = false;
    });

    this.modalElement.addEventListener('show.bs.modal', event => {
      this.settings.form.visible = true;
    });

    this.listenEvent();

  },

  methods: {

    sendEvent(eventName, eventTarget, payload) {
      eventBus.emit(eventName + '-' + eventTarget, {
        from: this.settings.entity,
        payload: payload
      });
    },

    listenEvent() {
      eventBus.on(`EDIT-${this.settings.entity}`, (data) => {
        this.editItem(data.payload.item);
      });
    },

    tableWait(block) {
      this.ui.wait.table = true;
      this.ui.block.table = block;
    },

    tableNoWait() {
      this.ui.wait.table = false;
      this.ui.block.table = false;
    },

    countFilters() {
      return this.settings.table.columns.filter(
        (column) => column.filter && !column.hidden
      ).length;
    },

    resetTable() {
      if (this.settings.table.pagination) {
        this.config.pagination.limit = this.settings.table.pagination.limit;
      }

      this.resetFilter();
      this.resetOrder(true);
    },

    resetFilter(reload) {

      if (!this.settings.table.columns) {
        return;
      }

      for (let column of this.settings.table.columns) {
        if (column.filter) {
          column.filter.value =
            column.filter.default_value !== undefined
              ? column.filter.default_value
              : (column.filter.multiple ? [] : undefined);

          column.filter.operator =
            column.filter.default_operator !== undefined
              ? column.filter.default_operator
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
        this.config.order = Object.assign({}, this.settings.table.order);
      } else {
        this.config.order = {};
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
      if (
        this.config.pagination.items === null ||
        this.config.pagination.items === undefined
      ) {
        return;
      }

      if (
        this.config.pagination.total !== null &&
        this.config.pagination.total !== undefined
      ) {
        this.config.pagination.pages = Math.ceil(
          this.config.pagination.total / this.config.pagination.limit
        );
      }

      if (this.config.pagination.pages !== null) {
        let from = Math.floor((this.config.pagination.size - 1) / 2);
        let start = this.config.pagination.page - from;

        if (this.config.pagination.page > this.config.pagination.pages) {
          this.config.pagination.page = this.config.pagination.pages;
        }

        if (this.config.pagination.page < 1) {
          this.config.pagination.page = 1;
        }

        if (
          start + this.config.pagination.size >
          this.config.pagination.pages
        ) {
          start =
            this.config.pagination.pages - this.config.pagination.size + 1;
        }

        if (start < 1) {
          start = 1;
        }

        this.config.pagination.numbers = Array.from(
          { length: this.config.pagination.size },
          (_, index) => start + index
        );
      }

      // this.config.pagination.from =
      //   this.config.pagination.page * this.config.pagination.limit -
      //   this.config.pagination.limit +
      //   1;
      // this.config.pagination.to =
      //   this.config.pagination.page * this.config.pagination.limit;

      // if (this.items && this.items.length < this.config.pagination.limit) {
      //   this.config.pagination.to =
      //     this.config.pagination.from + this.items.length - 1;
      // }

      this.config.pagination.from = this.config.pagination.skip + 1;

      this.config.pagination.to =
        this.config.pagination.skip +
        (this.config.pagination.items !== null
          ? this.config.pagination.items
          : this.config.pagination.limit);
    },

    setPage(page, reload) {
      reload = reload !== undefined ? reload : true;

      if (page < 1) {
        page = 1;
      }

      if (
        this.config.pagination.pages !== null &&
        this.config.pagination.pages !== undefined
      ) {
        if (page > this.config.pagination.pages) {
          page = this.config.pagination.pages;
        }
      }

      this.config.pagination.skip = (page - 1) * this.config.pagination.limit;

      if (this.config.pagination.page != page && reload) {
        this.config.pagination.page = page;
        this.reloadTable();
      }
    },

    setPageLimit(limit) {
      if (limit != this.config.pagination.limit) {
        this.config.pagination.limit = limit;
        this.setPage(1);
        this.calcPage();
        this.reloadTable();
      }
    },

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
    },

    getButtonClassByAction(action) {
      switch (action) {
        case "TABLE_RESET_ORDERS":
        case "TABLE_RESET_FILTERS":
          return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
        case "TABLE_CLOSE_DETAILS":
          return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
        case "TABLE_ROW_EDIT":
          return "btn btn-sm btn-secondary text-nowrap mx-1";
        case "FORM_SUBMIT":
        case "TABLE_ROW_SAVE":
        case "TABLE_BULK_SAVE":
          return "btn btn-sm btn-primary text-nowrap mx-1";
        case "FORM_DELETE":
        case "TABLE_ROW_DELETE":
        case "TABLE_BULK_DELETE":
          return "btn btn-sm btn-danger text-nowrap mx-1";
        case "TABLE_ROW_DETAIL":
          return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
        case "TABLE_COLUMNS":
          return "btn btn-sm btn-outline-dark text-nowrap mx-1";
        case "TABLE_EXPORT":
          return "btn btn-sm btn-primary text-nowrap mx-1";
        default:
          return 'btn btn-sm btn-outline-primary text-nowrap mx-1'
      }
    },

    getButtonIconClassByAction(action) {
      switch (action) {
        case "TABLE_RESET_ORDERS":
        case "TABLE_RESET_FILTERS":
          return "bi bi-x";
        case "TABLE_CLOSE_DETAILS":
          return "bi bi-chevron-compact-up";
        case "TABLE_ROW_EDIT":
          return "bi bi-pencil-square";
        case "FORM_SUBMIT":
        case "TABLE_ROW_SAVE":
        case "TABLE_BULK_SAVE":
          return "bi bi-save";
        case "FORM_DELETE":
        case "TABLE_ROW_DELETE":
        case "TABLE_BULK_DELETE":
          return "bi bi-trash";
        case "TABLE_ROW_DETAIL":
          return "bi bi-chevron-compact-down";
        case "TABLE_COLUMNS":
          return "bi bi-table";
        case "TABLE_EXPORT":
          return "bi bi-download";
        default:
          return 'bi bi-question'
      }
    },

    tableCellValue(path, item, index, column) {
      try {

        if (path === undefined || item === undefined) {
          return;
        }

        if (column.value) {
          return column.value(path, item, index, column)
        }

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

    tableCellTemplate(template, item, index, column) {
      try {

        if (typeof template === "string") {
          return template;
        }

        return template(item[column.name], item, index, column);
      } catch (e) {
        return e.message;
      }
    },

    tableAction(button, params) {

      if (params.$event) {
        params.$event.stopPropagation();
      }

      let action = button.action ? button.action
        : (button.click ? button.click : null);

      if (action && typeof action !== "string") {
        action(params.item, params, this);
        return;
      }

      switch (action) {
        case "TABLE_ROW_SELECT":
          this.toggleSelected(params.item[this.settings.pkey]);
          break;

        case "TABLE_ROW_DETAIL":
          this.toggleDetail(params.item[this.settings.pkey]);
          break;

        case "TABLE_CLOSE_DETAILS":
          this.details = [];
          break;

        case "TABLE_RESET_ORDERS":
          this.resetOrder(true);
          break;

        case "TABLE_RESET_FILTERS":
          this.resetFilter(true);
          break;

        case "TABLE_ROW_EDIT":
          this.editItem(params.item);
          break;

        case "TABLE_ROW_SAVE":
          this.tableRowSave(params.item, button.params);
          break;

        case "FORM_SUBMIT":
          this.saveForm(params.item);
          break;

        case "___save":
          this.saveItem(
            item,
            () => {
              this.addTableMessage(
                this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${params.item[this.settings.pkey]} )</small>`,
                2500,
              );
            },
            (err) => {
              this.addTableMessage(err.message, 3500, "danger");
            },
            button.params
          );

          break;

        case "FORM_CREATE":
          this.createItem(params.item, button.params);
          break;

        case "TABLE_ROW_DELETE":
          this.deleteItem(params.item, button.params);
          break;

        case "FORM_DELETE":
          this.deleteItem(params.item, button.params);
          break;

        case "TABLE_RELOAD":
          this.reloadTable(button.params);
          break;

        case "TABLE_EXPORT":
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
        case "TABLE_BULK_SAVE":
          this.saveBulk(() => {
            this.addTableMessage(this.translate("Saved all selected items"), 2500);
          });

          break;

        case "TABLE_BULK_DELETE":
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
      if (
        this.config.order[column.name] &&
        this.config.order[column.name].fixed
      ) {
        return;
      }

      if (!this.isSortable(column)) {
        return;
      }

      if (
        this.config.order[column.name] === undefined ||
        this.config.order[column.name] === null
      ) {
        this.config.order[column.name] = {
          dir: "ASC",
          idx: this.config.orderIndex++,
        };
      } else if (this.config.order[column.name].dir === "ASC") {
        this.config.order[column.name] = {
          dir: "DESC",
          idx: this.config.orderIndex++,
        };
      } else {
        delete this.config.order[column.name];
      }

      let sortedEntries = Object.entries(this.config.order).sort(
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

      for (let key of Object.keys(this.config.order)) {
        haveOrder = true;
        order[this.config.order[key].idx] = {
          key: key,
          dir: this.config.order[key].dir,
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

    async fetchTableRelations(items) {

      for (let column of this.settings.table.columns) {

        if (
          column.relation &&
          this.settings.relations[column.relation.config]
        ) {

          let ids = [];
          column.relation = deepMerge(this.settings.relations[column.relation.config], column.relation);

          for (let item of items) {
            if (item[column.relation.local]) {
              ids.push(item[column.relation.local]);
            }
          }

          column.relation.ids = arrayUnique(ids);

          await this.fetchRelation(column, items);

        }

      }

    },

    // getTableRelationsForFetch(callback) {

    //   for (let column of this.settings.table.columns) {

    //     if (
    //       column.relation &&
    //       this.settings.relations[column.relation.entity]
    //     ) {
    //       column.relation = Object.assign({}, this.settings.relations[column.relation.entity], column.relation);
    //       callback(column);
    //     }

    //   }

    // },

    async fetchTable(urlParams) {

      try {

        this.tableWait(true);

        urlParams = urlParams ? urlParams : {};
        urlParams.filter = this.getFiltersForFetch();
        urlParams.order = this.getOrdersForFetch();

        if (
          this.config.pagination.page !== null &&
          this.config.pagination.page !== undefined
        ) {
          urlParams.page = this.config.pagination.page;
        }

        if (
          this.config.pagination.limit !== null &&
          this.config.pagination.limit !== undefined
        ) {
          urlParams.limit = this.config.pagination.limit;
        }

        if (urlParams.page && urlParams.limit) {
          urlParams.skip = (urlParams.page - 1) * urlParams.limit;
        }

        let items = await this.fetchItems(this.settings, urlParams, this.config);

        if (items === false) {
          this.tableNoWait();
          return false;
        }

        await this.fetchTableRelations(items);

        this.items = items;
        this.tableNoWait();

      } catch (error) {

        console.error(error.message);

        this.addTableMessage(error.message, 3500, "danger");
        this.tableNoWait();
      }
    },

    async fetchItems(settings, urlParams, config) {

      if (settings.events && settings.events.beforeItemsLoad) {
        // settings.debug && console.log('@beforeItemsLoad', urlParams);
        settings.events.beforeItemsLoad(urlParams, settings);
      }

      const response = await fetch(
        prepareFetchUrl("GET", settings.table.api, null, urlParams),
        prepareFetchOptions("GET", settings.table.api)
      );

      const json = await getResponseJson(response);
      const errors = getResponseErrors(response, json.data);

      if (errors) {
        this.handleTableErrors(errors);
        return;
      }

      if (json.error) {
        this.handleTableErrors(json.error);
        return;
      }

      if (settings.events && settings.events.afterItemsLoad) {
        settings.events.afterItemsLoad(json.data, response);
      }

      let items;

      if (settings.table.api.input.items) {
        items =
          typeof settings.table.api.input.items === "string"
            ? json.data[settings.table.api.input.items]
            : settings.table.api.input.items(json.data, response);
      } else {
        items = json.data;
      }

      if (config) {

        if (settings.table.api.input.total) {
          config.pagination.total =
            typeof settings.table.api.input.total === "string"
              ? json.data[settings.table.api.input.total]
              : settings.table.api.input.total(json.data, response);
        } else if (json.data.total) {
          config.pagination.total = json.data.total;
        }

        config.pagination.items = items.length;
        this.calcPage();

      }

      let flattenedItems = flattenArrayObjects(items);
      this.convertIn(settings.table.columns, flattenedItems);

      return flattenedItems;

    },

    async fetchRelation(column, items) {

      try {

        let searchParams = column.relation.params ? column.relation.params : {};        

        if (column.relation.columns) {
          searchParams.columns = JSON.stringify(column.relation.columns);
        }

        let filter = {};

        if (column.relation.ids && column.relation.ids.length) {

          let type = typeof column.relation.ids[0] === "string" ? "text" : "number";
          let values =
            type === "string"
              ? "'" + column.relation.ids.join("','") + "'"
              : column.relation.ids.join(",");          

          filter[column.relation.foreign] = {
            type: "array",
            value: values,
            operator: "IN",
          };

        }

        searchParams.filter = JSON.stringify(filter);

        executeFunctions(searchParams, {
          column: column,
        });

        const response = await fetch(
          prepareFetchUrl("GET", column.relation.api, null, searchParams),
          prepareFetchOptions("GET", column.relation.api)
        );

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        const json = await getResponseJson(response);
        const error = getResponseErrors(response, json.data);

        if (error || !json.data) {
          return;
        }

        if (column.relation.api.input.items) {
          column.relation.items =
            typeof column.relation.api.input.items === "string"
              ? json.data[column.relation.api.input.items]
              : column.relation.api.input.items(json.data, response);
        } else {
          column.relation.items = json.data;
        }

        if (items && items[0]) {
          for (let item of items) {
            if (item[column.relation.local]) {
              item[column.relation.entity] = column.relation.items.find(
                (current, index, arr) => {
                  return current[column.relation.foreign] === item[column.relation.local];
                }
              );
            }
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    },

    async editItem(item) {

      if (!this.settings.form || !this.settings.form.api) {
        return false;
      }

      this.item = item;
      this.message.form = null;
      this.messages.form = [];
      this.modalWindow.show();

    },


    async deleteItem(item, urlParams) {
      try {

        if (!item) {
          item = this.item;
        }

        let primaryId = item[this.settings.pkey];

        if (!primaryId) {
          return;
        }

        const confirmed = confirm("Are you sure you want to delete this item");

        if (!confirmed) {
          return;
        }

        this.tableWait(true);

        if (this.settings.events && this.settings.events.beforeItemDelete) {
          this.settings.events.beforeItemDelete(item);
        }

        const response = await fetch(
          prepareFetchUrl(
            "DELETE",
            this.settings.form.api,
            primaryId,
            urlParams
          ),
          prepareFetchOptions("DELETE", this.settings.api)
        );

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        let itemindex = this.items.find((item) => item[this.settings.pkey] === primaryId);

        // console.log(itemindex, primaryId);

        if (itemindex >= 0) {
          this.items.splice(itemindex, 1);
        }

        if (this.item) {
          this.item = {};
          // this.modalWindow.hide();
        }

        const data = await response.json();

        if (this.settings.events && this.settings.events.afterItemDelete) {
          this.settings.events.afterItemDelete(data, response);
        }

        this.reloadTable();
        //this.tableNoWait();

      } catch (error) {
        console.error(error.message);
        this.tableNoWait();
      }
    },

    async deleteItems(ids, callback) {
      try {

        if (!ids) {
          return;
        }

        const confirmed = confirm(
          this.translate("Are you sure you want to delete all selected items?")
        );

        if (!confirmed) {
          return;
        }

        this.tableWait(true);

        const response = await fetch(
          prepareFetchUrl("DELETE", this.settings.table.api),
          prepareFetchOptions("DELETE", this.settings.api, {
            body: JSON.stringify({
              ids: ids,
            }),
          })
        );

        if (response.status !== 200) {
          throw new Error(
            this.translate("Response status: " + response.status)
          );
        }

        if (callback) {
          callback(response);
        }

        this.reloadTable();
        this.tableNoWait();
      } catch (error) {
        console.error(error.message);
        this.tableNoWait();
      }
    },





    tableRowSave(item, urlParams) {

      this.tableWait();

      this.saveItem(item, () => {

        this.tableNoWait();

        this.addTableMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${item[this.settings.pkey]} )</small>`,
          2500,
        );

      }, (errors, input, urlParams, response) => {

        this.tableNoWait();
        this.handleTableErrors(errors);

      }, urlParams);

    },

    // submitForm(item, onSuccess, onError, urlParams) {

    //   this.formWait(true);
    //   this.saveItem(item, () => {

    //   }, () => {

    //   }, urlParams);

    // },


    handleTableErrors(errors) {

      console.log(errors);

      if (errors === undefined || errors === null) {
        return;
      }

      const timeout = 3500;
      const level = 'danger';

      if (typeof errors === 'string') {
        this.addTableMessage(errors, timeout, level);
        return;
      }

      if (errors.length > 0) {

        for (let error of errors) {
          this.addTableMessage(error.message, error.timeout, error.priority)
        }
      }

    },
    handleFormErrors() {

      if (errors === undefined || errors === null) {
        return;
      }

      const timeout = 3500;
      const level = 'danger';

      if (typeof errors === 'string') {
        this.addTableMessage(errors, timeout, level);
        return;
      }

      if (errors.length > 0) {

        for (let error of errors) {
          this.addTableMessage(error.message, error.timeout, error.priority)
        }
      }

    },


    getColumnByName(columnName) {

      return this.settings.table.columns.find((col) => {
        return col.name === columnName;
      });

    },

    // addFilesToFormData(input, formData, formUploads) {

    //   for (let formUpload in formUploads) {
    //     for (let file of input[formUpload]) {
    //       if (!file.uploaded) {
    //         for (let type of Object.keys(file.types)) {

    //           if (file.types[type].blob) {
    //             formData.append(formUpload + '[]', file.types[type].blob, `${file.types[type].slug}.${file.types[type].extension}`);
    //           } else {
    //             formData.append(formUpload + '[]', file, `${file.types[type].slug}.${file.types[type].extension}`);
    //           }

    //           console.log(file);
    //         }
    //       }
    //     }

    //   }

    // },

    createItem() {

      this.item = this.settings.form.default ? this.settings.form.default : {};
      this.modalWindow.show();

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);

    },


    async saveItem(input, onSuccess, onError, urlParams) {

      try {

        urlParams = urlParams ? urlParams : {};

        let item = {};
        let primaryId = input[this.settings.pkey];

        if (
          this.settings.form.api.output &&
          this.settings.form.api.output.fields
        ) {
          for (let field in input) {
            if (this.settings.form.api.output.fields.includes(field)) {
              item[field] = input[field];
            }
          }
        } else {
          Object.assign(item, input);
        }

        // const item = Object.keys(input)
        //   .filter((key) => this.settings.api.output.fields.includes(key))
        //   .reduce((obj, key) => {
        //     obj[key] = input[key];
        //     return obj;
        //   }, {});

        // const formData = new FormData();

        // this.files.forEach((file, index) => {
        // 	formData.append(`file{{ index }}`, file);convertOut
        // });

        // formData.append("json", JSON.stringify({
        // 	item: item,
        // }));

        let body;
        let response;

        this.convertOut(this.settings.table.columns, [item]);

        if (!this.settings.form.api.output.flatten || !primaryId) {
          item = unflattenObject(item);
        }

        if (this.settings.events && this.settings.events.beforeItemSave) {
          this.settings.events.beforeItemSave(item, urlParams, input);
        }

        if (!this.settings.form.api.output.item) {
          body = JSON.stringify(item);
        } else if (typeof this.settings.form.api.output.item === "string") {
          let output = {};
          output[this.settings.form.api.output.item] = item;
          body = JSON.stringify(output);
        } else {
          body = JSON.stringify(
            this.settings.form.api.output.item(item, options)
          );
        }

        // this.formData = new FormData();
        // this.formData.append('json', body)
        // this.addFilesToFormData(input, this.formData, this.formUploads);

        const method = primaryId ? "PUT" : "POST";

        response = await fetch(
          prepareFetchUrl(method, this.settings.form.api, primaryId, urlParams),
          prepareFetchOptions(method, this.settings.form.api, {
            body: body
          })
        );

        const json = await getResponseJson(response);
        const errors = getResponseErrors(response, json.data);

        if (errors) {
          if (onError) {
            onError(errors, input, urlParams, response);
          }
          return;
        }

        if (json.error) {
          if (onError) {
            onError(json.error, input, urlParams, response);
          }
          return;
        }


        if (this.settings.events && this.settings.events.afterItemSave) {
          this.settings.events.afterItemSave(json.data, urlParams);
        }

        if (onSuccess) {
          onSuccess(json.data, response);
        }

      } catch (error) {

        if (onError) {
          onError(error, input, urlParams);
        }

      }
    },

    async saveBulk(callback) {
      try {

        this.tableWait(true);

        let item = {};

        if (this.settings.events && this.settings.events.beforeBulkSave) {
          this.settings.events.beforeBulkSave(this.bulkitem);
        }

        for (let field in this.bulkitem) {
          if (
            this.bulkinputs.indexOf(field) >= 0 &&
            this.settings.table.api.output.fields.includes(field)
          ) {
            item[field] = this.bulkitem[field];
          }
        }

        // const item = Object.keys(this.bulkitem)
        //   .filter((key) => this.settings.api.output.fields.includes(key))
        //   .filter((key) => this.bulkinputs.indexOf(key) >= 0)
        //   .map((obj, key) => {
        //     obj[key] = this.bulkitem[key];
        //     return obj;
        //   }, {});

        this.convertOut(this.settings.table.columns, [item]);

        // unflatten nem kell a Mongo miatt, de mi van ha a backend mysql? akkor a json úgy is egy mező
        //item = unflattenObject(item);

        const response = await fetch(
          prepareFetchUrl("PUT", this.settings.table.api),
          prepareFetchOptions("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: item,
              ids: this.selected,
            }),
          })
        ).catch((err) => {
          console.error(err.message);
          this.addTableMessage(err.message, 3500, "danger", err);
        });

        const json = await getResponseJson(response);
        const error = getResponseErrors(response, json.data);

        this.tableNoWait();

        if (error) {
          return;
        }

        if (callback) {
          callback(json.data);
        }

        // this.selected = [];
        this.reloadTable();
      } catch (error) {
        console.error(error.message);

        this.addTableMessage(error.message, 3500, "danger", error);
        this.tableNoWait();
      }
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

    dropdownSelectToggleOne(filter, option) {

      let value = option.value;

      if (filter.multiple) {
        arrayToggleOne(filter.value, value);
      } else {
        filter.value = filter.value === value ? null : value;
      }

      this.reloadTable();

    },

    dropdownSelectAll(array, options) {
      arraySelectAll(array, options);
      this.reloadTable();
    },

    dropdownSelectInvert(array, options) {
      arraySelectInvert(array, options);
      this.reloadTable();
    },

    dropdownSelectClear(array) {

      if (typeof (array) != "object") {
        array.value = null;
      } else {
        arraySelectClear(array);
      }

      this.reloadTable();
    },

    async exportTable(urlParams) {
      try {

        urlParams.limit = this.config.pagination.total ? this.config.pagination.total : 0;

        let filter = this.getFiltersForFetch();
        // let relations = this.getTableRelationsForFetch();
        let order = this.getOrdersForFetch();

        if (this.selected.length > 0) {
          filter[this.settings.pkey] = {
            type: "string",
            value: this.selected,
            operator: "in",
          };
        }

        urlParams.filter = filter;
        urlParams.order = order;

        let items = await this.fetchItems(this.settings, urlParams, null, () => {

        });

        if (this.settings.events && this.settings.events.beforeItemsExport) {
          this.settings.events.beforeItemsExport(items);
        }

        let csvString = convertToCSV(
          items,
          this.settings.table.exports[urlParams.type].fields
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

        this.addTableMessage(error.message, 3500, "danger");
      }
    },

    onRowInputChange(value, column, item, index) {

      if (!column || !column.input) {
        return;
      }

      if (column.input.onchange) {
        column.input.onchange(value, column, item);
      }

      if (column.input.autosave) {

        this.tableWait();

        this.saveItem(item, () => {

          this.tableNoWait();

          this.addTableMessage(
            this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${item[this.settings.pkey]} )</small>`,
            2500,
          );

        }, (errors, input, urlParams, response) => {

          this.tableNoWait();
          this.handleTableErrors(errors);

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

    addTableMessage(msg, timeout, priority, details) {

      this.addMessage('table', msg, timeout, priority, details);

    },

    addMessage(type, msg, timeout, priority, details) {

      clearTimeout(this.messageTimeout);

      const uid = Date.now() + Math.random().toString(36).substring(2, 9);

      this.message[type] = {
        uid: uid,
        msg: msg,
        timeout: timeout !== undefined ? timeout : 2500,
        datetime: new Date().toLocaleString("hu-HU"),
        priority: priority ? priority : "secondary",
        details: details,
      };

      this.messages[type].unshift(this.message[type]);

      clearTimeout(this.messageTimeOut);

      this.messageTimeOut = setTimeout(() => {

        this.message[type] = null;

        if (this.messages[type].length > 10) {
          this.messages[type].splice(10);
        }

      }, this.message[type].timeout);
    },

    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },

    convertIn(columns, items) {

      for (let column of columns) {
        if (column.convert) {
          if (column.convert.in) {
            for (let item of items) {
              item[column.name] = column.convert.in(item[column.name], item, column);
            }
          }
        }
      }
    },

    convertOut(columns, items) {

      for (let column of columns) {
        if (column.convert) {
          if (column.convert.out) {
            for (let item of items) {
              item[column.name] = column.convert.out(item[column.name], item, column);
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
.vu-admin {
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.21;
    }
  }

  .vua-table-container,
  form {
    position: relative;
  }

  .vua-overlay {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    opacity: 0;
    display: none;

    &.blocked {
      display: block;
      animation-name: fadeIn;
      animation-duration: 2s;
      animation-delay: 0.77s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: normal;
    }
  }

  [data-bs-theme="light"] {

    .vua-overlay {
      background-color: rgb(255, 255, 255);
    }

    .vua-table-title {
      color: var(--bs-dark);
    }

    .vua-table-control {
      user-select: none;
      background-color: var(--bs-light);
      color: var(--bs-dark);
    }

    .vua-table-bulk {
      background-color: var(--bs-dark);
      color: var(--bs-light);
    }

    .vua-table-filter {
      input {
        color: var(--bs-dark);
      }
    }

    .badge-index {
      color: var(--bs-secondary);

      &.selected {
        color: var(--bs-dark);
        border-color: var(--bs-dark) !important;
      }

    }

    .badge-index-toggle {

      color: var(--bs-secondary);

      &.active {
        color: var(--bs-light);
        background-color: var(--bs-secondary) !important;
      }

    }

  }

  [data-bs-theme="dark"] {
    background-color: var(--bs-dark);

    .vua-overlay {
      background-color: rgb(0, 0, 0);
    }

    .vua-table-title {
      color: var(--bs-light);
    }

    .vua-table-control {
      user-select: none;
      background-color: var(--bs-secondary);
      color: var(--bs-light);
    }

    .modal-title {
      color: var(--bs-light);
    }

    .badge-index {
      color: var(--bs-secondary);

      &.selected {
        color: var(--bs-light);
        border-color: var(--bs-light) !important;
      }

    }

    .badge-index-toggle {

      color: var(--bs-secondary);

      &.active {
        color: var(--bs-dark);
        background-color: var(--bs-light) !important;
      }

    }

  }

  /* Mobil stílusok */
  @media screen and (max-width: 600px) {
    .vua-table-responsive {
      border: 0;
    }

    .vua-table-responsive thead {
      display: none;
    }

    .vua-table-responsive tr {
      margin-bottom: 20px;
      display: block;
      border-bottom: 2px solid #ddd;
    }

    .vua-table-responsive td {
      display: block;
      text-align: right;
      border-bottom: 1px dotted #ccc;
      position: relative;
      padding-left: 50%;
    }

    .table-responsive td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 40%;
      padding-left: 5px;
      font-weight: lighter;
      text-align: left;
    }
  }
}
</style>
