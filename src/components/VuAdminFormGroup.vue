<template>

  <div class="row m-1">
    <div v-for="group in settings.form.groups" :key="group" :class="[group.class ? group.class : 'col-md-12']">

      <h2 class="form-row-title mb-4 fw-lighter">
        {{ group.title }}
      </h2>

      <div class="row" v-cloak v-if="item && group.fields">
        <div :class="[field.class ? field.class : 'col-md-12']" v-for="field in group.fields" :key="field">

          <div class="form-group pb-3">

            <span v-if="field.label !== null">
              <label v-if="['html', 'image'].indexOf(field.type) >= 0" v-cloak class="form-label text-secondary mb-1">
                {{ field.label ? field.label : translate(field.name) }}
                <span class="badge text-secondary fw-light" v-if="field.maxlength">
                  {{ item[field.name] ? item[field.name].length : 0 }} / {{ field.maxlength }}
                </span>
              </label>
              <label v-else v-cloak class="form-label text-secondary mb-1" :for="formid + '_' + field.name"
                v-html="getValueOrFunction(field.label ? field.label : translate(field.name), { field: field, item: item })">
              </label>
            </span>

            <div class="input-group">
              <span v-if="field.prefix" class="input-group-text" v-html="field.prefix"></span>

              <input v-if="field.type == 'text'" class="form-control" :class="[field.class]" type="text" :name="field.name" :id="formid + '_' + field.name"
                v-model="item[field.name]" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''"
                :readonly="field.readonly" :required="field.required" />

              <input v-if="field.type == 'number'" class="form-control" :class="[field.class]" type="number" :name="field.name" :id="formid + '_' + field.name"
                v-model="item[field.name]" :min="field.min" :max="field.max" :step="field.step" :placeholder="field.placeholder ? field.placeholder : ''" :readonly="field.readonly"
                :required="field.required" />

              <input v-if="field.type == 'date'" class="form-control" :class="[field.class]" type="date" :name="field.name" :id="formid + '_' + field.name"
                v-model="item[field.name]" :readonly="field.readonly" :required="field.required" />

              <input v-if="field.type == 'email'" autocomplete="on" class="form-control" :class="[field.class]" type="email" :name="field.name" :id="formid + '_' + field.name"
                v-model="item[field.name]" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''"
                :readonly="field.readonly" :required="field.required" />

              <select v-if="field.type == 'select'" class="form-select" :class="[field.class]" :name="field.name" :id="formid + '_' + field.name" v-model="item[field.name]"
                :readonly="field.readonly" :required="field.required">
                <option class="" v-for="option in selectOptions(field.options, field)" :key="option" :value="option.value">
                  {{ option.label ? option.label : option.value }}
                </option>
              </select>

              <textarea v-if="field.type == 'textarea'" class="form-control" :class="[field.class]" :name="field.name" :id="formid + '_' + field.name" v-model="item[field.name]"
                :rows="field.rows" :minlength="field.minlength" :maxlength="field.maxlength" :placeholder="field.placeholder ? field.placeholder : ''" :readonly="field.readonly"
                :required="field.required">
        </textarea>

              <span v-if="field.suffix" class="input-group-text" v-html="field.suffix"></span>
            </div>

            <HtmlEditor v-if="field.type == 'html'" v-model="item[field.name]" :class="[field.class]"></HtmlEditor>

            <ImageUpload v-if="field.type == 'image'" v-model="item[field.name]" :class="[field.class]" :params="field.params"></ImageUpload>

            <span v-if="field.type == 'addresses'">
              <div v-if="item[field.name]">
                <div v-for="address in item[field.name]" :key="address">
                  {{ address }}
                  <label class="form-label text-secondary mb-1" :for="formid + '_' + field.name">
                    {{ field.label }}
                  </label>
                  <input class="form-control" type="text" :name="field.name" :id="formid + '_' + field.name" v-model="address.country" />
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
import { translate, getValueOrFunction } from "./helpers";
import HtmlEditor from "./VuAdminHtmlEditor.vue";
import ImageUpload from "./VuAdminImageUpload.vue";

const VuAdminFormGroup = {
  props: {
    modelValue: Object,
    group: Object,
    formid: String,
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
      return getValueOrFunction(object, params);
    },

    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language);
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
    ImageUpload,
  },
};

export default VuAdminFormGroup;
</script>


<style lang="scss" scoped>
.vu-admin {

  form {
    .form-control {
      font-weight: 500;
    }
  }

  [data-bs-theme="light"] {}

  [data-bs-theme="dark"] {}
}
</style>
