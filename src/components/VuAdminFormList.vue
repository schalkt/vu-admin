<template>

  <div>

    <div class="row g-1 d-flex align-items-center justify-content-between mb-1">

      <div class="col-10">
        <div class="row g-1 d-flex align-items-center justify-content-between">
          <div v-for="(element, elementKey) in field.elements" :key="element" :class="element.class || 'col'">
            <small>
              {{ element.placeholder ? element.placeholder : (element.prefix ? element.prefix : '') }}
            </small>
          </div>
        </div>
      </div>
      <div class="col-2 text-nowrap text-end">
      </div>

    </div>

    <div class="row g-1 d-flex align-items-center justify-content-between mb-1" v-for="(elements, elindex) in value" :key="elindex">

      <div class="col-10">
        <div class="row g-1 d-flex align-items-center justify-content-between">

          <div v-for="(elementValue, elementKey) in elements" :key="elementKey" :class="field.elements[elementKey].class || 'col'">

            <span v-if="field.elements[elementKey].template" v-html="getValueOrFunction(field.elements[elementKey].template, value[elindex])"></span>

            <div v-else class="input-group input-group-sm">
            
              <VuAdminFormSelect v-if="field.elements[elementKey].type == 'select'" v-model="value[elindex][elementKey].value" :field="field.elements[elementKey]"
              :item="item" :settings="settings" :formId="formId" :optionValue="'object'"></VuAdminFormSelect>

              <input v-else :type="field.elements[elementKey].type" :required="field.elements[elementKey].required" :placeholder="field.elements[elementKey].placeholder || elementKey"
                class="form-control" v-model="value[elindex][elementKey]">                            

            </div>

          </div>
        </div>
      </div>

      <div class="col-2 text-nowrap text-end">

        <button v-if="field.sortable" type="button" class="btn btn-sm btn-outline-secondary p-1 me-1" @click="arrayItemMoveUp(value, elindex)">
          <i class="bi bi-arrow-up"></i>
        </button>

        <button v-if="field.sortable" type="button" class="btn btn-sm btn-outline-secondary p-1 me-1" @click="arrayItemMoveDown(value, elindex + 1)">
          <i class="bi bi-arrow-down"></i>
        </button>

        <button type="button" class="btn btn-sm btn-outline-danger p-1 me-1" @click="arrayRemoveItem(value, elindex)">
          <i class="bi bi-trash"></i>
        </button>

      </div>

    </div>

    <hr v-if="item[field.name] && item[field.name].length">

    <div class="row g-1 d-flex align-items-center justify-content-between">

      <div class="col-10">
        <div class="row g-1 d-flex align-items-center justify-content-between">
          <div v-for="(element, elementKey) in field.elements" :key="element" :class="element.class || 'col'">

            <div class="input-group input-group-sm">

              <span v-if="element.prefix" class="input-group-text">
                {{ element.prefix }}
              </span>

              <VuAdminFormSelect v-if="element.type == 'select' && (!element.relation || (element.relation && element.relation.items))" v-model="element.value" :field="element"
                :item="item" :settings="settings" :formId="formId" :optionValue="'object'"></VuAdminFormSelect>

              <input v-else :type="element.type" :placeholder="element.placeholder || element.name" class="form-control form-control-sm" v-model="element.value">

              <span v-if="element.suffix" class="input-group-text">
                {{ element.suffix }}
              </span>

            </div>

            <small v-if="0" class="bg-secondary text-light p-1">
              {{ element }}
            </small>
          </div>
        </div>
      </div>

      <div class="col-2">
        <button type="button" class="btn btn-sm btn-outline-primary my-1 w-100" @click="arrayAddNewItem(field, item)">
          <i class="bi bi-plus"></i>
        </button>
      </div>

    </div>

  </div>

</template>

<script>
import {
  getValueOrFunction,
  arrayItemMoveDown,
  arrayItemMoveUp
} from "./helpers";
import VuAdminFormSelect from "./VuAdminFormSelect.vue";

const VuAdminFormList = {
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
  watch: {
    modelValue(newValue) {

      this.value = newValue;

      if (!this.value || typeof this.value !== "object") {
        this.value = [];
      }

    },
  },
  methods: {

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
    },

    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },

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

      if (!item[field.name] || typeof item[field.name] !== "object") {
        item[field.name] = [];
      }

      let push = {};

      for (let elementKey in field.elements) {
        let element = field.elements[elementKey];
        push[elementKey] = element.value;
        // element.value = undefined;
      }

      this.value.push(push);
      this.$emit('update:modelValue', this.value);

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

<style lang="scss" scoped></style>
