<template>
  <form ref="form" v-cloak v-if="item" :id="formId" class="form" @submit.prevent="submitItem" :class="[settings.form.class, { wait: ui.wait.form }]"
    :data-bs-theme="[settings.theme]">
    <div class="vua-overlay" :class="{ blocked: ui.block.form }"></div>
    <div class="modal-header">


      <h5 class="modal-title">
        <span v-if="
          settings.form.title &&
          typeof settings.form.title == 'function'
        " v-html="settings.form.title(item, settings)"></span>
        <span v-if="
          settings.form.title &&
          typeof settings.form.title == 'string'
        ">{{ translate(settings.form.title) }}</span>
        <span v-if="!settings.form.title">{{ translate('Edit') }}</span>

        <small v-if="item[settings.pkey]" class="rounded border ms-2 px-2 py-0 fs-6"><span class="text-muted fw-light">id</span> {{ item[settings.pkey] }}</small>

      </h5>

      <span class="d-inline-block ms-3 mt-1" v-if="message.form">
        <span :class="['text-' + message.form.priority]">
          <i class="bi bi-envelope-fill me-2"></i>
          <span v-html="message.form.msg"></span>
        </span>
      </span>

      <span v-show="ui.wait.form" class="spinner-border spinner-border-sm mx-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

    </div>

    <div class="modal-header d-flex justify-content-between" v-cloak v-if="item">
      <div>
        <button type="button" class="btn btn-sm btn-secondary m-1" @click="reloadItem()" :disabled="!item[settings.pkey]">
          <i class="bi bi-arrow-clockwise"></i> {{ translate('Reload') }}
        </button>

        <button type="button" class="btn btn-sm btn-outline-warning m-1" @click="createItem()">
          <i class="bi bi-plus-circle"></i> {{ translate('New') }}
        </button>

        <button type="button" class="btn btn-sm btn-outline-warning m-1" @click="copyItem()">
          <i class="bi bi-copy"></i> {{ translate('Copy') }}
        </button>

        <button type="button" class="btn btn-sm btn-danger m-1" @click="deleteItem()" :disabled="!item[settings.pkey]">
          <i class="bi bi-trash"></i> {{ translate('Delete') }}
        </button>
      </div>

      <div>

        <div class="d-inline-block m-1" v-if="messages.form.length">

          <div class="dropdown d-inline-block">
            <button class="btn btn-sm dropdown-toggle" :class="['btn-' + messages.form[0].priority]" type="button" data-bs-toggle="dropdown" aria-expanded="false"
              v-html="messages.form.length + ' ' + (messages.form.length > 1 ? translate('messages') : translate('message'))">
            </button>
            <ul class="dropdown-menu text-start">
              <li v-for="message in messages.form" :key="message">
                <span class="dropdown-item" :class="['text-' + message.priority]">
                  <small class="me-2 text-muted">{{ message.datetime }}</small>
                  <span v-html="message.msg"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <button type="button" class="btn btn-sm btn-secondary m-1" data-bs-dismiss="modal">
          <i class="bi bi-x"></i> {{ translate('Close') }}
        </button>

        <button type="submit" class="btn btn-sm btn-primary m-1">
          <i class="bi bi-save"></i> {{ translate('Save') }}
        </button>

        <button type="button" class="btn btn-sm btn-success m-1" @click="submitAndClose">
          <i class="bi bi-save"></i> {{ translate('Save and close') }}
        </button>
      </div>

    </div>

    <div class="modal-body custom-scroll" v-if="settings.form">
      <VuAdminFormGroup v-cloak v-if="settings.form.visible && settings.form.groups" v-model="item" :formid="formId" :settings="settings"></VuAdminFormGroup>
    </div>
    <div class="modal-footer d-flex justify-content-between" v-cloak v-if="item">
      <div>
        <button type="button" class="btn btn-secondary m-1" @click="reloadItem()" :disabled="!item[settings.pkey]">
          <i class="bi bi-arrow-clockwise"></i> {{ translate('Reload') }}
        </button>

        <button type="button" class="btn btn-outline-warning m-1" @click="createItem()">
          <i class="bi bi-plus-circle"></i> {{ translate('New') }}
        </button>

        <button type="button" class="btn btn-outline-warning m-1" @click="copyItem()">
          <i class="bi bi-copy"></i> {{ translate('Copy') }}
        </button>

        <button type="button" class="btn btn-danger m-1" @click="deleteItem()" :disabled="!item[settings.pkey]">
          <i class="bi bi-trash"></i> {{ translate('Delete') }}
        </button>
      </div>

      <div>
        <button type="button" class="btn btn-secondary m-1" data-bs-dismiss="modal">
          <i class="bi bi-x"></i> {{ translate('Close') }}
        </button>

        <button type="submit" class="btn btn-primary m-1">
          <i class="bi bi-save"></i> {{ translate('Save') }}
        </button>

        <button type="button" class="btn btn-success m-1" @click="submitAndClose">
          <i class="bi bi-save"></i> {{ translate('Save and close') }}
        </button>
      </div>
    </div>

    <pre class="bg-light text-dark" v-if="settings.debug">
        {{ item }}
    </pre>

  </form>

</template>

<script>

import {
  translate,
  getResponseJson,
  getResponseErrors,
  prepareFetchUrl,
  prepareFetchOptions,
  deepMerge,
  flattenObject,  
  unflattenObject,

} from "./helpers";
import VuAdminFormGroup from "./VuAdminFormGroup.vue";

const VuAdminForm = {
  props: {
    modelValue: Object,
    modalWindow: Object,
    saveItem: Function,    
    reloadTable: Function,
    fetchRelation: Function,
    group: Object,
    formId: String,
    settings: Object,
  },
  data: function () {
    return {
      item: {},
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
  created() { },
  mounted() {
    this.item = this.modelValue;
    let primaryId = this.item[this.settings.pkey];
    this.fetchItem(primaryId, this.settings);

  },
  watch: {
    modelValue(newValue) {
      this.item = this.modelValue;
    },
  },
  methods: {

    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },

    formWait(block) {
      this.ui.wait.form = true;
      this.ui.block.form = block;
    },

    formNoWait() {
      this.ui.wait.form = false;
      this.ui.block.form = false;
    },

    addFormMessage(msg, timeout, priority, details) {

      this.addMessage('form', msg, timeout, priority, details);

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

    createItem() {

      this.item = this.settings.form.default ? this.settings.form.default : {};

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);

    },

    copyItem() {

      this.item[this.settings.pkey] = undefined;

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },

    reloadItem() {
      let primaryId = this.item[this.settings.pkey];
      this.fetchItem(primaryId);
    },

    async fetchItem(primaryId, settings) {

      try {

        settings = settings ? settings : this.settings;

        if (!settings.form || !settings.form.api) {
          return false;
        }

        this.formWait(true);

        const response = await fetch(
          prepareFetchUrl("GET", settings.form.api, primaryId),
          prepareFetchOptions("GET", settings.api)
        ).catch((err) => {


        });

        const json = await getResponseJson(response);
        let error = getResponseErrors(response, json.data, 'form');

        if (error || !json.data) {
          this.formNoWait();
          return false;
        }

        if (settings.form.default) {
          json.data = Object.assign({}, settings.form.default, json.data);
        }

        if (settings.events && settings.events.afterItemLoad) {
          settings.events.afterItemLoad(json.data, response);
        }

        //console.log(relations, this.settings);

        let item;

        if (settings.form.api.input.item) {
          item =
            typeof settings.form.api.input.item === "string"
              ? json.data[settings.form.api.input.item]
              : settings.form.api.input.item(json.data, response);
        } else {
          item = json.data;
        }

        for (let group of settings.form.groups) {
          for (let field of group.fields) {
            // collect relations
            if (
              field.relation &&
              settings.relations[field.relation.entity]
            ) {

              // console.log(field, settings.relations[field.relation.entity]);
              field.relation = deepMerge(settings.relations[field.relation.entity], field.relation);
              await this.fetchRelation(field, [item]);

            }
          }
        }

        this.item = flattenObject(item);
        this.itemOriginal = Object.assign({}, item);

        this.formNoWait();
      } catch (error) {
        console.error(error);
        this.formNoWait();
      }
    },

    async submitAndClose() {
      let form = this.$refs.form;

      if (form.checkValidity()) {
        this.submitItem(true);
      } else {
        form.reportValidity();
      }
    },

    async submitItem(closeModal) {

      this.saveItem(this.item, (data) => {

        let item = {};

        if (this.settings.form.api.input.item) {
          item =
            typeof this.settings.form.api.input.item === "string"
              ? data[this.settings.form.api.input.item]
              : this.settings.form.api.input.item(data, response);
        } else {
          item = data;
        }

        if (item) {

          this.addFormMessage(
            this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${item[this.settings.pkey]} )</small>`,
            2500
          );

          this.item = flattenObject(item);
          this.itemOriginal = Object.assign({}, item);
        }

        if (closeModal === true) {
          this.modalWindow.hide();
        }

        this.reloadTable();

      }, (err) => {

        console.log(err);
        this.addFormMessage(err.message, 14500, 'danger')

      });
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

        const confirmed = confirm("Are you sure you want to delete this post");

        if (!confirmed) {
          return;
        }

        this.formWait(true);

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

        if (this.item) {
          this.item = {};
          this.modalWindow.hide();
        }

        const data = await response.json();

        if (this.settings.events && this.settings.events.afterItemDelete) {
          this.settings.events.afterItemDelete(data, response);
        }

        this.reloadTable();
        this.formNoWait();

      } catch (error) {
        console.error(error.message);
        this.formNoWait();
      }
    },

  },
  components: {
    VuAdminFormGroup
  },
};

export default VuAdminForm;
</script>


<style lang="scss" scoped>
.vu-admin {

  [data-bs-theme="light"] {}

  [data-bs-theme="dark"] {}
}
</style>
