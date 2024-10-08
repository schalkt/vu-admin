<template>

  <div class="row m-1">
    <div v-for="group in settings.form.groups" :key="group" :class="[group.class ? group.class : 'col-md-12']">

      <h2 class="form-row-title mb-4 fw-lighter">
        {{ group.title }}
      </h2>

      <div class="row" v-cloak v-if="item && group.fields">
        <div :class="[getValueOrFunction(field.class ? field.class : 'col-md-12') , 'input_type_' + field.type]" v-for="field in group.fields" :key="field">

          <div class="form-group pb-3">

            <span v-if="field.label !== null">
              <label v-if="['html', 'image', 'upload'].indexOf(field.type) >= 0" :class="{'required' : field.required }" v-cloak class="form-label text-secondary mb-1">
                {{ field.label ? field.label : translate(field.name) }}
                <span class="badge text-secondary fw-light" v-if="field.maxlength">
                  {{ item[field.name] ? item[field.name].length : 0 }} / {{ field.maxlength }}
                </span>
              </label>
              <label v-else :class="{'required' : field.required }" v-cloak class="form-label text-secondary mb-1" :for="formId + '_' + field.name"
                v-html="getValueOrFunction(field.label ? field.label : translate(field.name), { field: field, item: item })">
              </label>
            </span>

            <div class="input-group">
              <span v-if="field.prefix" class="input-group-text" v-html="field.prefix"></span>

              <input v-if="field.type == 'text'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" type="text" :name="field.name" :id="formId + '_' + field.name"
                v-model="item[field.name]" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''"
                :readonly="field.readonly" :required="field.required" />

              <input v-if="field.type == 'number'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" type="number" :name="field.name" :id="formId + '_' + field.name"
                v-model="item[field.name]" :min="field.min" :max="field.max" :step="field.step" :placeholder="field.placeholder ? field.placeholder : ''" :readonly="field.readonly"
                :required="field.required" />

              <input v-if="field.type == 'date'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" type="date" :name="field.name" :id="formId + '_' + field.name"
                v-model="item[field.name]" :readonly="field.readonly" :required="field.required" />

              <div v-if="field.type == 'checkbox'" class="form-check">
                <input class="form-check-input" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" type="checkbox" :name="field.name" :id="formId + '_' + field.name"
                  :true-value="field.true != undefined ? field.true : true" :false-value="field.false != undefined ? field.false : false" v-model="item[field.name]"
                  :readonly="field.readonly" :required="field.required" />
                <label class="form-check-label cursor-pointer" :for="formId + '_' + field.name">
                  {{ field.checkbox }}
                </label>
              </div>

              <input v-if="field.type == 'email'" autocomplete="on" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" type="email" :name="field.name" :id="formId + '_' + field.name"
                v-model="item[field.name]" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''"
                :readonly="field.readonly" :required="field.required" />

              <select v-if="field.type == 'select'" class="form-select" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" :name="field.name" :id="formId + '_' + field.name" v-model="item[field.name]"
                :readonly="field.readonly" :required="field.required">
                <option :class="getValueOrFunction(field.optionclass ? field.optionclass : '', { field: field, item:item, option: option })" v-for="option in selectOptions(field.options, field)" :key="option" :value="option.value">
                  {{ option.label ? option.label : option.value }}
                </option>
              </select>

              <textarea v-if="field.type == 'textarea'" class="form-control" :class="getValueOrFunction(field.inputclass ? field.inputclass  : '', { field: field, item:item })" :name="field.name" :id="formId + '_' + field.name" v-model="item[field.name]"
                :rows="field.rows" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''" :readonly="field.readonly"
                :required="field.required">
              </textarea>

              <span v-if="field.suffix" class="input-group-text" v-html="field.suffix"></span>
            </div>

            <HtmlEditor v-if="field.type == 'html'" v-model="item[field.name]" :class="[field.class]"></HtmlEditor>

            <FileUpload v-if="field.type == 'image' || field.type == 'upload'" v-model="item[field.name]" :class="[field.class]" :field="field" :settings="settings"></FileUpload>

            <div v-if="field.type == 'list'">

              <div class="row g-1 d-flex align-items-center justify-content-between mb-1" v-for="(elements, elindex) in item[field.name]" :key="elindex">

                <div v-for="(elementValue, elementKey) in elements" :key="elementKey" :class="field.elements[elementKey].class || 'col'">
                  <input :type="field.elements[elementKey].type" :required="field.elements[elementKey].required" :placeholder="field.elements[elementKey].placeholder || elementKey"
                    class="form-control form-control-sm" v-model="item[field.name][elindex][elementKey]">
                </div>
                <div class="col-2 text-nowrap text-end">
                  <button type="button" class="btn btn-sm btn-outline-secondary p-1 me-1" @click="arrayItemMoveUp(item[field.name], elindex)">
                    <i class="bi bi-arrow-up"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-secondary p-1 me-1" @click="arrayItemMoveDown(item[field.name], elindex + 1)">
                    <i class="bi bi-arrow-down"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-danger p-1 me-1" @click="arrayRemoveItem(item[field.name], elindex)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <hr v-if="item[field.name] && item[field.name].length">
              <div class="row g-1 d-flex align-items-center justify-content-between">
                <div v-for="element in field.elements" :key="element" :class="element.class || 'col'">
                  <input :type="element.type" :placeholder="element.placeholder || element.name" class="form-control form-control-sm" v-model="element.value">
                </div>
                <div class="col-2">
                  <button type="button" class="btn btn-sm btn-outline-primary my-1 w-100" @click="arrayAddNewItem(field, item)">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>

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

            <div class="p-1" v-if="field.description">
              <i class="text-muted" v-html="field.description"></i>
            </div>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { translate, getValueOrFunction, arrayItemMoveUp, arrayItemMoveDown } from "./helpers";
import HtmlEditor from "./VuAdminHtmlEditor.vue";
import FileUpload from "./VuAdminFileUpload.vue";

const VuAdminFormGroup = {
  props: {
    modelValue: Object,
    group: Object,
    formId: String,
    settings: Object,
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
  },
  components: {
    HtmlEditor,
    FileUpload,
  },
};

export default VuAdminFormGroup;
</script>


<style lang="scss" scoped>
.vu-admin {

  label.required::after {
    content: " *";
    color: red;
  }

  form {
    .form-control {
      font-weight: 500;
    }
  }

  [data-bs-theme="light"] {}

  [data-bs-theme="dark"] {}
}
</style>
