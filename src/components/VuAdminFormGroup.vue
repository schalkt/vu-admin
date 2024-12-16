<template>

  <div class="row m-1">
    <div v-for="group in settings.form.groups" :key="group" :class="[group.class ? group.class : 'col-md-12']">

      <h2 v-if="group.title" class="form-row-title mb-4 fw-lighter" v-html="group.title ? group.title : ''"></h2>

      <div class="row" v-cloak v-if="item && group.fields">
        <div :class="[getValueOrFunction(field.class ? field.class : 'col-md-12'), 'input_type_' + field.type]" v-for="field in group.fields" :key="field">

          <div class="form-group pb-3">

            <span v-if="field.label">
              <label v-if="['html', 'image', 'upload'].indexOf(field.type) >= 0" :class="{ 'required': field.required }" v-cloak class="form-label text-secondary mb-1">
                {{ field.label ? field.label : translate(field.name) }}
                <span class="badge text-secondary fw-light" v-if="field.maxlength">
                  {{ item[field.name] ? item[field.name].length : 0 }} / {{ field.maxlength }}
                </span>
              </label>
              <label v-else :class="{ 'required': field.required }" v-cloak class="form-label text-secondary mb-1" :for="formId + '_' + field.name"
                v-html="getValueOrFunction(field.label ? field.label : translate(field.name), { field: field, item: item })">
              </label>
            </span>

            <div v-if="['html', 'image', 'list', 'addresses', 'template'].indexOf(field.type) < 0" class="input-group">
              <span v-if="field.prefix" class="input-group-text" v-html="getValueOrFunction(field.prefix, {
                field: field,
                item: item
              })"></span>

              <input v-if="field.type == 'text'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })"
                type="text" :name="field.name" :id="formId + '_' + field.name" v-model="item[field.name]" :minlength="field.minlength" :maxlength="field.maxlength"
                :placeholder="field.placeholder ? field.placeholder : ''" :disabled="field.disabled" :readonly="field.readonly" :required="field.required" />

              <input v-if="field.type == 'number'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })"
                type="number" :name="field.name" :id="formId + '_' + field.name" v-model="item[field.name]" :min="field.min" :max="field.max" :step="field.step"
                :placeholder="field.placeholder ? field.placeholder : ''" :disabled="field.disabled" :readonly="field.readonly" :required="field.required" />

              <input v-if="['date', 'datetime', 'datetime-local'].indexOf(field.type) >= 0" class="form-control"
                :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })" :type="field.type" :name="field.name"
                :id="formId + '_' + field.name" v-model="item[field.name]" :min="field.min" :max="field.max" :disabled="field.disabled" :readonly="field.readonly"
                :required="field.required" />

              <div v-if="field.type == 'checkbox'" class="form-check">
                <input class="form-check-input" :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })" type="checkbox"
                  :name="field.name" :id="formId + '_' + field.name" :true-value="field.true != undefined ? field.true : true"
                  :false-value="field.false != undefined ? field.false : false" v-model="item[field.name]" :disabled="field.disabled" :readonly="field.readonly"
                  :required="field.required" />
                <label class="form-check-label cursor-pointer" :for="formId + '_' + field.name">
                  {{ field.checkbox }}
                </label>
              </div>

              <input v-if="field.type == 'email'" autocomplete="on" class="form-control"
                :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })" type="email" :name="field.name" :id="formId + '_' + field.name"
                v-model="item[field.name]" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''"
                :readonly="field.readonly" :disabled="field.disabled" :required="field.required" />


              <VuAdminFormSelect v-if="field.type == 'select' && (!field.relation || (field.relation && field.relation.items))" v-model="item[field.name]" :field="field"
                :item="item" :settings="settings" :formId="formId" :auth="auth"></VuAdminFormSelect>

              <textarea v-if="field.type == 'textarea'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })"
                :name="field.name" :id="formId + '_' + field.name" v-model="item[field.name]" :rows="field.rows" :minlength="field.minlength" :maxlength="field.maxlength"
                :placeholder="field.placeholder ? field.placeholder : ''" :disabled="field.disabled" :readonly="field.readonly" :required="field.required">
              </textarea>

              <span v-if="field.suffix" class="input-group-text" v-html="getValueOrFunction(field.suffix, {
                field: field,
                item: item
              })"></span>

            </div>

            <HtmlEditor v-if="field.type == 'html'" v-model="item[field.name]" :class="[field.class]"></HtmlEditor>

            <FileUpload v-if="field.type == 'image' || field.type == 'upload'" v-model="item[field.name]" :class="[field.class]" :field="field" :settings="settings"></FileUpload>

            <VuAdminFormList v-if="field.type == 'list' && (!field.relation || (field.relation && field.relation.items))" v-model="item[field.name]" :field="field" :item="item"
              :settings="settings" :formId="formId"></VuAdminFormList>


            <div v-cloak v-if="field.type == 'dropdown' && item[field.name]" :class="[field.class]">
              <div class="dropdown d-inline-block">
                <button class="btn dropdown-toggle" :class="[field.dropdown.class]" type="button" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>{{ translate(field.dropdown.label) }}</span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <span v-for="option in field.options" :key="option" class="dropdown-item cursor-pointer" :class="{ 'selected': item[field.name].indexOf(option.value) >= 0 }"
                      @click="dropdownSelectToggleOne(field, item[field.name], option)">
                      <i v-if="item[field.name].indexOf(option.value) >= 0" class="bi bi-check-square"></i>
                      <i v-else class="bi bi-square"></i>
                      {{ translate(option.label ? option.label : option.value) }}
                    </span>
                  </li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li>
                    <span class="dropdown-item cursor-pointer" @click="dropdownSelectAll(item[field.name], field.options)">
                      {{ translate('Select all') }}
                    </span>
                  </li>
                  <li>
                    <span class="dropdown-item cursor-pointer" @click="dropdownSelectClear(item[field.name])">
                      {{ translate('Unselect all') }}
                    </span>
                  </li>
                  <li>
                    <span class="dropdown-item cursor-pointer" @click="dropdownSelectInvert(item[field.name], field.options)">
                      {{ translate('Invert all') }}
                    </span>
                  </li>
                </ul>
              </div>
              <span v-if="item[field.name].length">
                <span class="cursor-pointer" :class="[field.list.class]" v-for="el in item[field.name]" :key="el" @click="dropdownSelectToggleOne(field, item[field.name], el)">
                  {{ translate(el) }} <i class="bi bi-x"></i>
                </span>
              </span>
            </div>


            <span v-if="field.type == 'addresses'">
              <div v-if="item[field.name]">
                <div v-for="address in item[field.name]" :key="address">
                  {{ address }}
                  <label class="form-label text-secondary mb-1" :for="formId + '_' + field.name">
                    {{ field.label }}
                  </label>
                  <input class="form-control" type="text" :name="field.name" :id="formId + '_' + field.name" v-model="address.country" />
                </div>
              </div>

              <button type="button" class="btn btn-sm btn-secondary" @click="insertAddress(field.name)">
                Add
              </button>
            </span>

            <div v-if="field.type == 'template'" v-html="getValueOrFunction(field.template, {
              field: field,
              item: item
            })">
            </div>

            <div class="p-1" v-if="field.description">
              <small><i class="text-muted" v-html="getValueOrFunction(field.description, {
                field: field,
                item: item
              })"></i>
              </small>
            </div>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  translate,
  getValueOrFunction,
  arrayItemMoveUp,
  arrayItemMoveDown,
  arraySelectAll,
  arrayToggleOne,
  arraySelectClear,
  arraySelectInvert
} from "./helpers";
import HtmlEditor from "./VuAdminHtmlEditor.vue";
import FileUpload from "./VuAdminFileUpload.vue";
import VuAdminFormSelect from "./VuAdminFormSelect.vue";
import VuAdminFormList from "./VuAdminFormList.vue";

const VuAdminFormGroup = {
  props: {
    modelValue: Object,
    group: Object,
    formId: String,
    settings: Object,
    auth: Object,
  },
  data: function () {
    return {
      item: {},
    };
  },
  created() { },
  mounted() {
    this.item = this.modelValue;
  },
  watch: {
    modelValue(newValue) {
      this.item = this.modelValue;
    },
  },
  methods: {

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
    },

    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },

    selectOptions(options, field) {
      if (typeof options === "function") {
        return options(this.item, field, this);
      } else {
        return options;
      }
    },

    renderOptions(items, valueField, labelField) {
      let options = [];

      if (!items || !items.length) {
        return [];
      }

      for (let item of items) {
        options.push({
          value: item[valueField],
          label: item[labelField] ? item[labelField] : item[valueField],
        });
      }

      return options;
    },

    arrayAddNewItem(field, item) {

      if (!item[field.name] || typeof item[field.name] !== "object") {
        item[field.name] = [];
      }

      let push = {};

      for (let elementKey in field.elements) {
        let element = field.elements[elementKey];
        push[elementKey] = element.value;
        element.value = undefined;
      }

      item[field.name].push(push);

    },

    arrayRemoveItem(array, index) {

      array.splice(index, 1);

    },

    arrayItemMoveUp(array, index) {
      arrayItemMoveUp(array, index);
    },

    arrayItemMoveDown(array, index) {
      arrayItemMoveDown(array, index);
    },

    insertAddress(fieldName) {
      if (!this.item[fieldName]) {
        this.item[fieldName] = [];
      }

      this.item[fieldName].push({
        country: undefined,
        zipcode: undefined,
        city: undefined,
        street_name: undefined,
        street_type: undefined,
        house_number: undefined,
      });

      // console.log(this.item[fieldName]);
    },

    dropdownSelectToggleOne(field, value, option) {

      let ovalue = option.value ? option.value : option;
      arrayToggleOne(value, ovalue);

    },

    dropdownSelectAll(array, options) {
      arraySelectAll(array, options);
    },

    dropdownSelectInvert(array, options) {
      arraySelectInvert(array, options);
    },

    dropdownSelectClear(array) {

      if (typeof (array) != "object") {
        array.value = null;
      } else {
        arraySelectClear(array);
      }

    },

  },
  components: {
    HtmlEditor,
    FileUpload,
    VuAdminFormSelect,
    VuAdminFormList
  },
};

export default VuAdminFormGroup;
</script>


<style lang="scss">
.vu-admin {

  form {

    label.required::after {
      content: " *";
      color: red;
    }

    .form-control {
      font-weight: 500;
    }
  }

  [data-bs-theme="light"] {}

  [data-bs-theme="dark"] {}

}
</style>
