<template>

  <div>

    <div class="row g-1 d-flex align-items-center justify-content-between mb-1" v-for="(elements, elindex) in value" :key="elindex">

      <div class="col">
        <div class="row g-1 d-flex align-items-center justify-content-between">

          <div v-for="(elementDef, elementKey) in field.elements" :key="elementKey" :class="elementDef.class || 'col'">

            <span v-if="elementDef.template" v-html="getValueOrFunction(elementDef.template, value[elindex])"></span>

            <div v-else class="input-group input-group-sm">

              <span v-if="elementDef.prefix" class="input-group-text">
                {{ translate(elementDef.prefix) }}
              </span>

              <VuAdminFormSelect v-if="elementDef.type == 'select' && (!elementDef.relation || elementDef.relation.items)"
                v-model="value[elindex][elementKey]"
                :field="elementDef" :item="item" :settings="settings" :formId="formId" :optionValue="'object'"></VuAdminFormSelect>

              <input v-else :type="elementDef.type" :required="elementDef.required"
                :placeholder="translate(elementDef.placeholder || '')" class="form-control" v-model="value[elindex][elementKey]">

              <span v-if="elementDef.suffix" class="input-group-text">
                {{ translate(elementDef.suffix) }}
              </span>

            </div>

          </div>
        </div>
      </div>

      <div :class="[addButton.wrapperClass, 'text-nowrap text-end']">

        <button v-if="field.sortable" type="button" class="btn btn-sm btn-outline-secondary p-1 me-1" @click="arrayItemMoveUp(value, elindex)">
          <i class="bi bi-arrow-up"></i>
        </button>

        <button v-if="field.sortable" type="button" class="btn btn-sm btn-outline-secondary p-1 me-1" @click="arrayItemMoveDown(value, elindex)">
          <i class="bi bi-arrow-down"></i>
        </button>

        <button type="button" class="btn btn-sm btn-outline-danger p-1 me-1" @click="arrayRemoveItem(value, elindex)">
          <i class="bi bi-trash"></i>
        </button>

      </div>

    </div>

    <hr v-if="item[field.name] && item[field.name].length">

    <div class="row g-1 d-flex align-items-center justify-content-between">

      <div class="col">
        <div class="row g-1 d-flex align-items-center justify-content-between">
          <div v-for="element in field.elements" :key="element" :class="element.class || 'col'">

            <div class="input-group input-group-sm">

              <span v-if="element.prefix" class="input-group-text">
                {{ translate(element.prefix) }}
              </span>

              <VuAdminFormSelect v-if="element.type == 'select' && (!element.relation || (element.relation && element.relation.items))" v-model="element.value" :field="Object.assign({}, element, { required: false })"
                :item="item" :settings="settings" :formId="formId" :optionValue="'object'"></VuAdminFormSelect>

              <input v-else :type="element.type" :placeholder="translate(element.placeholder || '')" class="form-control form-control-sm" v-model="element.value">

              <span v-if="element.suffix" class="input-group-text">
                {{ translate(element.suffix) }}
              </span>

            </div>

            <small v-if="0" class="bg-secondary text-light p-1">
              {{ element }}
            </small>
          </div>
        </div>
      </div>

      <div :class="addButton.wrapperClass">
        <button type="button" :class="addButton.class" @click="arrayAddNewItem(field, item)">
          <i v-if="addButton.icon" :class="addButton.icon"></i>
          <span v-if="addButton.label" v-html="translate(getValueOrFunction(addButton.label, item))"></span>
        </button>
      </div>

    </div>

  </div>

</template>

<script>
import {
  translate,
  getValueOrFunction,
  arrayItemMoveDown,
  arrayItemMoveUp
} from "./helpers";
import VuAdminFormSelect from "./VuAdminFormSelect.vue";

const VuAdminFormList = {
  inject: {
    handleFormErrors: { default: null },
  },
  props: {
    modelValue: Array,
    field: Object,
    item: Object,
    settings: Object,
    formId: String
  },
  data: function () {
    return {
      value: []
    }
  },
  created() { },
  mounted() {

    // if (!this.modelValue || typeof this.modelValue !== "object") {
    //   this.$emit('update:modelValue', []);    
    // }

  },
  computed: {
    addButton() {
      return Object.assign({
        class: 'btn btn-sm btn-outline-primary my-1 w-100',
        icon: 'bi bi-plus',
        wrapperClass: 'col-2',
        label: null,
      }, this.field.addButton || {});
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.value = newValue;

        if (!this.value || typeof this.value !== "object") {
          this.value = [];
        }
      },
    },
  },
  methods: {

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
    },

    translate(key, vars, language) {
      if (typeof key !== "string") return key;
      return translate(key, this.settings && this.settings.translate, vars, language ? language : this.settings && this.settings.language);
    },

    selectOptions(options, field) {
      if (typeof options === "function") {
        return options(this.item, field, this);
      } else {
        return options;
      }
    },

    // renderOptions(items, valueField, labelField) {
    //   let options = [];

    //   if (!items || !items.length) {
    //     return [];
    //   }

    //   for (let item of items) {
    //     options.push({
    //       value: item[valueField],
    //       label: item[labelField] ? item[labelField] : item[valueField],
    //     });
    //   }

    //   return options;
    // },

    arrayAddNewItem(field, item) {

      if (typeof field.validateAdd === "function") {
        const message = field.validateAdd(field.elements);
        if (message) {
          if (this.handleFormErrors) {
            this.handleFormErrors(message);
          }
          return;
        }
      }

      const validated = typeof field.validateAdd === "function";
      let push = {};

      for (let elementKey in field.elements) {

        let element = Object.assign({}, field.elements[elementKey]);
        let raw = element.value;
        let value = raw != null && String(raw).trim() !== "" ? raw : null;

        if (value !== undefined && value !== null) {
          push[elementKey] = typeof value === "string" ? value.trim() : value;
        } else if (validated) {
          push[elementKey] = "";
        } else {
          if (this.handleFormErrors) {
            this.handleFormErrors("Fill in every field before adding a row.");
          }
          return;
        }

      }

      this.value.push(push);
      this.$emit('update:modelValue', this.value);

      for (let elementKey in field.elements) {
        field.elements[elementKey].value = null;
      }

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
  },
  components: {
    VuAdminFormSelect
  },
};

export default VuAdminFormList;
</script>

<style lang="scss"></style>
