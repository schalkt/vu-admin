<template>
  <div
    v-cloak
    v-if="settings && settings.table"
    class="table-container"
    :class="[settings.class]"
    :data-bs-theme="[settings.theme]"
  >
    <div class="overlay" :class="{ blocked: ui.block.table }"></div>
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
            v-show="ui.wait.table"
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
              <i :class="[button.icon]"></i> ${ translate(button.title) }
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
                <small class="badge text-secondary fw-normal"
                  >${ column.name }</small
                >${ column.title }

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
      class="table mb-0"
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
                  config.order[column.name] &&
                  config.order[column.name].dir === 'ASC'
                "
                :class="{
                  'text-light': config.order[column.name].fixed,
                  'text-warning': !config.order[column.name].fixed,
                }"
              >
                <i class="bi bi-arrow-down"></i>${ config.order[column.name].idx
                + 1 }
              </span>
              <span
                class="badge p-1"
                v-if="
                  config.order[column.name] &&
                  config.order[column.name].dir === 'DESC'
                "
                :class="{
                  'text-light': config.order[column.name].fixed,
                  'text-warning': !config.order[column.name].fixed,
                }"
              >
                <i class="bi bi-arrow-up"></i>${ config.order[column.name].idx +
                1 }
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
                  v-if="column.filter.buttonx && column.filter.buttonx != false"
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
                  <option value=">=">${ translate('>=') }</option>
                  <option value="<">${ translate('<') }</option>
                  <option value="<=">${ translate('<=') }</option>
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
                  <option value=">=">${ translate('>=') }</option>
                  <option value="<">${ translate('<') }</option>
                  <option value="<=">${ translate('<=') }</option>
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
                  v-html="
                    index +
                    1 +
                    (config.pagination.page - 1) * config.pagination.limit
                  "
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
              <div v-if="column.input" class="input-group input-group-sm">
                <span
                  v-if="column.input.prefix"
                  class="input-group-text"
                  v-html="
                    getValueOrFunction(column.input.prefix, {
                      column: column,
                      item: item,
                    })
                  "
                ></span>

                <input
                  v-if="
                    ['text', 'number', 'date', 'datetime-local'].indexOf(
                      column.input.type
                    ) >= 0
                  "
                  :type="column.input.type"
                  class="form-control form-control-sm text-info"
                  :class="column.input.class"
                  @change="
                    onInputChange(item[column.name], column, item, index)
                  "
                  v-model="item[column.name]"
                />

                <select
                  v-if="column.input.type == 'select'"
                  class="form-select form-select-sm text-info"
                  :class="column.input.class"
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

                <span
                  v-if="column.input.suffix"
                  class="input-group-text"
                  v-html="
                    getValueOrFunction(column.input.suffix, {
                      column: column,
                      item: item,
                    })
                  "
                ></span>
              </div>

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
                  <div class="col text-end" :class="[field.class]">
                    <label class="col-form-label">${ field.label }</label>
                  </div>
                  <div class="col" :class="[field.input.class]">
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
                :class="column.input.class"
                :disabled="bulkinputs.indexOf(column.name) < 0"
                @change="
                  onBulkInputChange(bulkitem[column.name], bulkitem, column)
                "
                v-model="bulkitem[column.name]"
              />

              <select
                v-if="column.input.type == 'select'"
                class="form-select form-select-sm text-info"
                :class="column.input.class"
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
      :config="config"
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
            :class="{ wait: ui.wait.form }"
          >
            <div class="overlay" :class="{ blocked: ui.block.form }"></div>
            <div class="modal-header">
              <h5 class="modal-title">
                <span
                  v-if="
                    settings.form.title &&
                    typeof settings.form.title == 'function'
                  "
                  v-html="settings.form.title(item, settings)"
                ></span>
                <span
                  v-if="
                    settings.form.title &&
                    typeof settings.form.title == 'string'
                  "
                  >${ translate(settings.form.title) }</span
                >
                <span v-if="!settings.form.title">${ translate('Edit') }</span>

                <div
                  v-show="ui.wait.form"
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

            <div
              class="modal-header d-flex justify-content-between"
              v-cloak
              v-if="item"
            >
              <div>
                <button
                  type="button"
                  class="btn btn-secondary m-1"
                  @click="reloadItem()"
                  :disabled="!item[settings.pkey]"
                >
                  <i class="bi bi-arrow-clockwise"></i> ${ translate('Reload') }
                </button>

                <button
                  type="button"
                  class="btn btn-outline-warning m-1"
                  @click="createItem()"
                >
                  <i class="bi bi-plus-circle"></i> ${ translate('New') }
                </button>

                <button
                  type="button"
                  class="btn btn-outline-warning m-1"
                  @click="copyItem()"
                >
                  <i class="bi bi-copy"></i> ${ translate('Copy') }
                </button>

                <button
                  type="button"
                  class="btn btn-danger m-1"
                  @click="deleteItem()"
                  :disabled="!item[settings.pkey]"
                >
                  <i class="bi bi-trash"></i> ${ translate('Delete') }
                </button>
              </div>

              <div>
                <button
                  type="button"
                  class="btn btn-secondary m-1"
                  data-bs-dismiss="modal"
                >
                  <i class="bi bi-x"></i> ${ translate('Close') }
                </button>

                <button type="submit" class="btn btn-primary m-1">
                  <i class="bi bi-save"></i> ${ translate('Save') }
                </button>

                <button
                  type="button"
                  class="btn btn-success m-1"
                  @click="submitAndClose"
                >
                  <i class="bi bi-save"></i> ${ translate('Save and close') }
                </button>
              </div>
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
                    :settings="settings"
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
            </div>
            <div
              class="modal-footer d-flex justify-content-between"
              v-cloak
              v-if="item"
            >
              <div>
                <button
                  type="button"
                  class="btn btn-secondary m-1"
                  @click="reloadItem()"
                  :disabled="!item[settings.pkey]"
                >
                  <i class="bi bi-arrow-clockwise"></i> ${ translate('Reload') }
                </button>

                <button
                  type="button"
                  class="btn btn-outline-warning m-1"
                  @click="createItem()"
                >
                  <i class="bi bi-plus-circle"></i> ${ translate('New') }
                </button>

                <button
                  type="button"
                  class="btn btn-outline-warning m-1"
                  @click="copyItem()"
                >
                  <i class="bi bi-copy"></i> ${ translate('Copy') }
                </button>

                <button
                  type="button"
                  class="btn btn-danger m-1"
                  @click="deleteItem()"
                  :disabled="!item[settings.pkey]"
                >
                  <i class="bi bi-trash"></i> ${ translate('Delete') }
                </button>
              </div>

              <div>
                <button
                  type="button"
                  class="btn btn-secondary m-1"
                  data-bs-dismiss="modal"
                >
                  <i class="bi bi-x"></i> ${ translate('Close') }
                </button>

                <button type="submit" class="btn btn-primary m-1">
                  <i class="bi bi-save"></i> ${ translate('Save') }
                </button>

                <button
                  type="button"
                  class="btn btn-success m-1"
                  @click="submitAndClose"
                >
                  <i class="bi bi-save"></i> ${ translate('Save and close') }
                </button>
              </div>
            </div>
          </form>
          <pre class="bg-light text-dark" v-if="settings.debug">
            ${ item }
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import {
  getValueOrFunction,
  getResponseJson,
  prepareFetchOptions,
  flattenArrayObjects,
  flattenObject,
  unflattenObject,
  translate,
  convertToCSV,
  downloadCSV,
} from "./helpers";
import VuAdminFormGroup from "./VuAdminFormGroup.vue";
import VuAdminTablePagination from "./VuAdminTablePagination.vue";

export default {
  name: "VuAdminTable",
  props: {
    settings: Object,
  },
  components: {
    VuAdminFormGroup,
    VuAdminTablePagination,
  },
  data() {
    return {
      item: {},
      items: {},
      selected: [], // config alá menjen, hogy a localStorage -ba mentsük el ezt is
      details: [], // ez hol van használva?
      bulkitem: {},
      bulkinputs: [],
      config: {
        pagination: {
          total: undefined,
          page: 1,
          skip: 0,
          limit: 10,
          limits: [10, 20, 50, 100],
          size: 10,
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
      modalId: null,
      modalElement: null,
      modalWindow: null,
      messages: [],
      message: null,
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
  },

  methods: {
    tableWait(block) {
      this.ui.wait.table = true;
      this.ui.block.table = block;
    },

    tableNoWait() {
      this.ui.wait.table = false;
      this.ui.block.table = false;
    },

    formWait(block) {
      this.ui.wait.form = true;
      this.ui.block.form = block;
    },

    formNoWait() {
      this.ui.wait.form = false;
      this.ui.block.form = false;
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
        this.config.order = Object.assign({}, this.settings.table.order);
      }

      if (reload) {
        this.reloadTable();
        this.calcPage();
      }
    },

    reloadTable(params) {
      this.fetchTable(params);
    },

    createItem() {
      this.errors = null;
      this.item = this.settings.form.default ? this.settings.form.default : {};
      this.modalWindow.show();

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },

    copyItem() {
      this.errors = null;
      this.item[this.settings.pkey] = undefined;
      this.modalWindow.show();

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
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
      return getValueOrFunction(object, params);
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

        this.tableWait(true);

        let filter = this.getFiltersForFetch();
        let relations = this.getRelationsForFetch();
        let order = this.getOrdersForFetch();

        paramsData = paramsData ? paramsData : {};

        if (
          this.config.pagination.page !== null &&
          this.config.pagination.page !== undefined
        ) {
          paramsData.page = this.config.pagination.page;
        }

        if (
          this.config.pagination.limit !== null &&
          this.config.pagination.limit !== undefined
        ) {
          paramsData.limit = this.config.pagination.limit;
        }

        paramsData.filter = filter;
        paramsData.order = order;

        if (this.settings.events && this.settings.events.beforeItemsLoad) {
          this.settings.events.beforeItemsLoad(paramsData, this.settings);
        }

        if (paramsData.filter) {
          paramsData.filter = JSON.stringify(paramsData.filter);
        }

        if (paramsData.order) {
          paramsData.order = JSON.stringify(paramsData.order);
        }

        const params = new URLSearchParams(paramsData);

        let options = prepareFetchOptions("GET", this.settings);
        let url = this.settings.table.api.url + "?" + params.toString();

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
          this.tableNoWait();
          return;
        }

        if (this.settings.events && this.settings.events.afterItemsLoad) {
          this.settings.events.afterItemsLoad(data, response);
        }

        let items = this.settings.table.api.input.items
          ? data[this.settings.table.api.input.items]
          : data;

        //console.log(items);

        if (data.total) {
          this.config.pagination.total = data.total;
          // this.config.pagination.pages = data.config.pagination.pages;
          // this.config.pagination.page = data.config.pagination.page;
        }

        this.config.pagination.items = items.length;
        this.calcPage();

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

        this.tableNoWait();
      } catch (error) {
        console.error(error.message);

        this.addMessage(error.message, 3500, "danger");
        this.tableNoWait();
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
        let url = this.settings.table.api.url + "?" + params.toString();

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

        this.formWait(true);

        let options = prepareFetchOptions("GET", this.settings);
        let url = this.settings.form.api.url + "/" + item[this.settings.pkey];

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

        if (this.settings.events && this.settings.events.afterItemLoad) {
          this.settings.events.afterItemLoad(data.item);
        }

        if (data.item) {
          this.item = flattenObject(data.item);
          this.itemOriginal = Object.assign({}, data.item);
        }

        this.formNoWait();
      } catch (error) {
        console.error(error.message);
        this.formNoWait();
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

        this.formWait(true);

        paramsData = paramsData ? paramsData : {};

        const params = new URLSearchParams(paramsData);

        let options = prepareFetchOptions("DELETE", this.settings);
        let url =
          this.settings.form.api.url +
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
        this.formNoWait();
      } catch (error) {
        console.error(error.message);
        this.formNoWait();
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

        this.tableWait(true);

        let options = prepareFetchOptions("DELETE", this.settings);
        let url = this.settings.table.api.url;

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
        this.tableNoWait();
      } catch (error) {
        console.error(error.message);
        this.tableNoWait();
      }
    },

    reloadItem() {
      this.fetchItem(this.item);
    },

    async submitItem(closeModal) {
      this.saveItem(this.item, (data) => {
        if (data.item) {
          this.item = flattenObject(data.item);
          this.itemOriginal = Object.assign({}, data.item);
        }

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

        this.tableWait();
        this.formWait(true);

        if (this.settings.events && this.settings.events.beforeItemSave) {
          this.settings.events.beforeItemSave(input);
        }

        let item = {};

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

        if (!this.settings.form.api.output.flatten || !primaryId) {
          item = unflattenObject(item);
        }

        if (!this.settings.form.api.output.item) {
          options.body = JSON.stringify(item);
        } else {
          options.body = JSON.stringify({
            item: item,
          });
        }

        paramsData = paramsData ? paramsData : {};
        const params = new URLSearchParams(paramsData);
        let paramsString = params.toString();

        let url =
          this.settings.form.api.url +
          (primaryId ? "/" + primaryId : "") +
          (paramsString ? "?" + paramsString : "");

        const response = await fetch(url, options).catch((err) => {
          // console.error(err.message);
          this.addMessage(err.message, 3500, "danger");
        });

        const data = await getResponseJson(response);
        const error = this.getResponseErrors(response, data);

        this.formNoWait();
        this.tableNoWait();

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

        this.formNoWait();
        this.tableNoWait();
      }
    },

    async saveBulk(callback) {
      try {
        // this.errors = null;

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

        this.convertsOut([item]);

        // unflatten nem kell a Mongo miatt, de mi van ha a backend mysql? akkor a json úgy is egy mező
        //item = unflattenObject(item);

        // console.log(item);

        let options = prepareFetchOptions("PUT", this.settings);

        options.body = JSON.stringify({
          item: item,
          ids: this.selected,
        });

        let url = this.settings.table.api.url;

        const response = await fetch(url, options).catch((err) => {
          console.error(err.message);
          this.addMessage(err.message, 3500, "danger", err);
        });

        const data = await getResponseJson(response);
        const error = this.getResponseErrors(response, data);

        this.tableNoWait();

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
        this.tableNoWait();
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

        paramsData.filter = filter;
        paramsData.order = order;

        if (this.settings.events && this.settings.events.beforeItemsLoad) {
          this.settings.events.beforeItemsLoad(paramsData, this.settings);
        }

        if (paramsData.filter) {
          paramsData.filter = JSON.stringify(paramsData.filter);
        }

        if (paramsData.order) {
          paramsData.order = JSON.stringify(paramsData.order);
        }

        const params = new URLSearchParams(paramsData);

        let options = prepareFetchOptions("GET", this.settings);
        let url = this.settings.table.api.url + "?" + params.toString();

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

        if (this.settings.events && this.settings.events.afterItemLoad) {
          this.settings.events.afterItemLoad(data, response);
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
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.21;
  }
}

.cursor-pointer {
  cursor: pointer;
}

.table-container,
form {
  position: relative;
}

.overlay {
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
  .overlay {
    background-color: rgb(255, 255, 255);
  }

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

  .overlay {
    background-color: rgb(0, 0, 0);
  }

  .table-title {
    color: var(--bs-light);
  }
  .table-header {
    user-select: none;
    background-color: var(--bs-secondary);
    color: var(--bs-light);
  }

  .modal-title {
    color: var(--bs-light);
  }
}

/* Mobil stílusok */
@media screen and (max-width: 600px) {
  .table-responsive {
    border: 0;
  }

  .table-responsive thead {
    display: none;
  }

  .table-responsive tr {
    margin-bottom: 20px;
    display: block;
    border-bottom: 2px solid #ddd;
  }

  .table-responsive td {
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