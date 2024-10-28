<template>

  <select class="form-select" :class="getValueOrFunction(field.inputclass ? field.inputclass : '', { field: field, item: item })" :name="field.name" :id="formId + '_' + field.name"
    @change="handleChange($event)" v-model="newitem" :readonly="field.readonly" :required="field.required">
    <option :class="getValueOrFunction(field.optionclass ? field.optionclass : '', { field: field, item: item, option: option })" v-for="option in options" :key="option"
      :value="option.value">
      {{ option.label ? option.label : option.value }}
    </option>
  </select>



</template>

<script>
import { getValueOrFunction } from "./helpers";

const VuAdminFormSelect = {
  props: {
    modelValue: String | Object | Number,
    optionValue: String,
    field: Object,
    item: Object,
    settings: Object,
    formId: String
  },
  data: function () {
    return {
      newitem: null,
      options: []
    }
  },
  created() { },
  mounted() {
    this.loadOptions();
    this.newitem = this.modelValue;
  },
  watch: {
    modelValue(newValue) {

      if (this.optionValue === 'object') {
        // console.log(newValue, this.newItem, this.modelValue);
        // this.newitem = newValue.value;
      } else {
        this.newitem = newValue;
      }

    },
  },
  methods: {

    async loadOptions() {
      this.options = await this.selectOptions(this.field.options, this.field);
    },

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
    },

    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },

    async selectOptions(options, field) {
      if (typeof options === "function") {
        return await options(this.item, field, this);
      } else {
        return options;
      }
    },

    handleChange(event) {

      if (this.optionValue === 'object') {

        const selectedOption = this.options.find(
          (option) => {
            // console.log(option.value, this.newitem);
            return option.value === this.newitem
          }
        );

        if (selectedOption) {
          this.$emit('update:modelValue', selectedOption);
        }

      } else {
        this.$emit('update:modelValue', this.newitem);
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

    // arrayAddNewItem(field, item) {

    //   if (!item[field.name] || typeof item[field.name] !== "object") {
    //     item[field.name] = [];
    //   }

    //   let push = {};

    //   for (let elementKey in field.elements) {
    //     let element = field.elements[elementKey];
    //     push[elementKey] = element.value;
    //     element.value = undefined;
    //   }

    //   item[field.name].push(push);

    // },

    // arrayRemoveItem(array, index) {

    //   array.splice(index, 1);

    // },

    // arrayItemMoveUp(array, index) {
    //   arrayItemMoveUp(array, index);
    // },

    // arrayItemMoveDown(array, index) {
    //   arrayItemMoveDown(array, index);
    // },
  },
  components: {
  },
};

export default VuAdminFormSelect;
</script>

<style lang="scss" scoped></style>
