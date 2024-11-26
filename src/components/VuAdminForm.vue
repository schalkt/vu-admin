<template>
  <form ref="form" v-cloak v-if="item" :id="formId" class="form" @submit.prevent="submitItem" :class="[settings.form.class, { wait: ui.wait.form }]"
    :data-bs-theme="[settings.theme]">
    <div class="vua-overlay" :class="{ blocked: ui.block.form }"></div>
    <div class="modal-header">

      <h5 v-if="loaded" class="modal-title">
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

    <div class="modal-header bg-body sticky-top" v-cloak v-if="item">

      <div class="w-100" v-cloak v-if="settings.form.control" :class="settings.form.control.class == undefined ? 'd-flex justify-content-center' : settings.form.control.class">

        <span class="d-inline-block m-1" v-if="messages.form.length">

          <div class="dropdown d-inline-block">
            <button class="btn btn-sm dropdown-toggle" :class="['btn-' + messages.form[0].priority]" type="button" data-bs-toggle="dropdown" aria-expanded="false"
              v-html="messages.form.length + ' ' + (messages.form.length > 1 ? translate('messages') : translate('message'))">
            </button>
            <ul class="dropdown-menu text-start">
              <li v-for="message in messages.form" :key="message">
                <span class="dropdown-item disabled" :class="['text-' + message.priority]">
                  <small class="me-2 text-muted">{{ message.datetime }}</small>
                  <span v-html="message.msg"></span>
                </span>
              </li>
            </ul>
          </div>
        </span>

        <span v-for="button in settings.form.control.buttons" :key="button.action">
          <button v-if="!button.dropdowns" type="button" :disabled="button.disabled !== undefined
            ? getValueOrFunction(button.disabled, {
              button: button,
              item: item,
              form: this,
            }) : false" :class="[
              button.class ? button.class : getButtonClassByAction(button.action),
            ]" @click="formAction(button, {
              button: button,
              item: item,
              form: this,
              $event: $event
            })">
            <i :class="[
              button.icon !== undefined
                ? getValueOrFunction(button.icon, {
                  button: button,
                  item: item,
                  form: this,
                })
                : getButtonIconClassByAction(button.action),
            ]"></i>
            {{ translate(button.title) }}
          </button>

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
            <ul class="dropdown-menu px-2">
              <li v-for="dropdown in button.dropdowns" :key="dropdown">
                <span :class="[dropdown.class ? dropdown.class : '']" @click="formAction(dropdown, {
                  button: button,
                  item: item,
                  form: this,
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

    </div>

    <div class="modal-body custom-scroll" v-if="settings.form">
      <VuAdminFormGroup v-cloak v-if="settings.form.visible && settings.form.groups" v-model="item" :formid="formId" :settings="settings"></VuAdminFormGroup>
    </div>
    <div class="modal-footer d-flex justify-content-between" v-cloak v-if="item">

    </div>

    <pre class="bg-light text-dark" v-if="settings.debug > 1">
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
  getValueOrFunction,
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
    auth: Object,
  },
  data: function () {
    return {
      item: {},
      loaded: false,
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
    this.fetchItem(primaryId, this.settings, this.auth);

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

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
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
      this.fetchItem(primaryId, null, this.auth);
    },

    async fetchItem(primaryId, settings, auth) {

      try {

        settings = settings ? settings : this.settings;

        if (!settings.form || !settings.form.api) {
          return false;
        }

        this.formWait(true);

        const response = await fetch(
          prepareFetchUrl("GET", settings.form.api, primaryId),
          prepareFetchOptions("GET", settings.api, null, auth)
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
              settings.relations[field.relation.config]
            ) {

              // console.log(field, settings.relations[field.relation.config]);
              field.relation = deepMerge(settings.relations[field.relation.config], field.relation);
              console.log(field.relation, auth);
              await this.fetchRelation(field, [item], auth);

            }
          }
        }

        this.item = flattenObject(item);
        this.itemOriginal = Object.assign({}, item);
        this.loaded = true;

        this.formNoWait();
      } catch (error) {
        console.error(error);
        this.formNoWait();
      }
    },

    async submit() {

      let form = this.$refs.form;

      if (form.checkValidity()) {
        this.submitItem();
      } else {
        form.reportValidity();
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

        const confirmed = confirm("Are you sure you want to delete this item?");

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
          prepareFetchOptions("DELETE", this.settings.api, null, this.auth)
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

    formAction(button, params) {

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
        case "FORM_RELOAD":
          if (!this.item[this.settings.pkey]) {
            return;
          }
          this.reloadItem();
          break;

        case "FORM_NEW":
          this.createItem();
          break;

        case "FORM_COPY":
          this.copyItem();
          break;

        case "FORM_DELETE":
          if (!this.item[this.settings.pkey]) {
            return;
          }
          this.deleteItem();
          break;

        case "FORM_CLOSE":
          this.modalWindow.hide();
          break;

        case "FORM_SAVE":
          this.submit();
          break;

        case "FORM_SAVE_AND_CLOSE":
          this.submitAndClose();
          break;

      }

    }

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
