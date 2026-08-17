<template>
  <div>
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
                table: table,
              })
              : getButtonIconClassByAction(button.action),
          ]"></i>
          {{ translate(button.title) }}
        </button>
      </span>
    </span>
  </div>
</template>

<script>
import {
  translate,
  getValueOrFunction,
  arrayToggleOne,
  arraySelectAll,
  arraySelectInvert,
  arraySelectClear,
} from "./helpers";
import {
  getButtonClassByAction as resolveButtonClass,
  getButtonIconClassByAction as resolveButtonIcon,
} from "./buttonActions";

export default {
  name: "VuAdminTableFilterField",
  props: {
    column: Object,
    settings: Object,
    items: [Array, Object],
    table: Object,
    reloadTable: Function,
    tableAction: Function,
  },
  methods: {
    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this.table);
    },

    getButtonClassByAction(action) {
      return resolveButtonClass(action);
    },

    getButtonIconClassByAction(action) {
      return resolveButtonIcon(action);
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
  },
};
</script>
