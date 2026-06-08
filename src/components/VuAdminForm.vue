<template>
  <form ref="form" v-cloak v-if="item" :id="formId" class="form" @submit.prevent="submitItem" :class="[settings.form.class, { wait: ui.wait.form }]"
    :data-bs-theme="[settings.theme]">
    <div class="vua-overlay" :class="{ blocked: !!overlayCenterMessage, immediate: !!overlayCenterMessage }">
      <div v-if="overlayCenterMessage" class="vua-overlay-panel text-center px-4 py-3">
        <div class="spinner-border text-primary mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="vua-overlay-message">{{ overlayCenterMessage }}</div>
        <div v-if="saveProgress?.uploadTypeKey" class="vua-overlay-preset text-muted small mt-2">
          <span class="badge bg-secondary-subtle text-secondary-emphasis text-uppercase">{{ saveProgress.uploadTypeKey }}</span>
          <span v-if="saveProgress.uploadPresetSize" class="ms-2">{{ saveProgress.uploadPresetSize }}</span>
          <span v-if="saveProgress.uploadExtension" class="ms-1 text-uppercase">.{{ saveProgress.uploadExtension }}</span>
        </div>
        <div v-if="overlayShowUploadProgress" class="progress mt-3 mx-auto" style="width: 240px; height: 8px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
            :style="{ width: saveProgressPercent + '%' }" :aria-valuenow="saveProgress.uploadCurrent"
            :aria-valuemin="0" :aria-valuemax="saveProgress.uploadTotal"></div>
        </div>
      </div>
    </div>
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

      <span v-if="ui.wait.form && !overlayCenterMessage" class="spinner-border spinner-border-sm mx-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
        :disabled="saveProgress?.active && saveProgress?.warnLeave"></button>

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
          <button v-if="!button.dropdowns" type="button" :disabled="saveProgress?.active || (button.disabled !== undefined
            ? getValueOrFunction(button.disabled, {
              button: button,
              item: item,
              form: this,
            }) : false)" :class="[
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
            <button type="button" :class="[button.class]" class="dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"
              :disabled="saveProgress?.active">
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
  secureRandomString,

} from "./helpers";
import {
  getButtonClassByAction as resolveButtonClass,
  getButtonIconClassByAction as resolveButtonIcon,
} from "./buttonActions";
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
    saveProgress: {
      type: Object,
      default: null,
    },
  },
  computed: {
    saveProgressLabel() {
      const p = this.saveProgress;
      if (!p?.active) return '';
      if (p.phase === 'upload' && p.uploadTotal > 0) {
        const counter = `${p.uploadCurrent}/${p.uploadTotal}`;
        const field = p.uploadField || '';
        const preset = p.uploadTypeKey || '';
        const size = p.uploadPresetSize ? ` (${p.uploadPresetSize})` : '';
        const file = p.uploadFileName ? ` — ${p.uploadFileName}` : '';
        const parts = [field, preset].filter(Boolean).join(' / ');
        return `${this.translate('Uploading')} ${counter}${parts ? ` — ${parts}${size}` : ''}${file}`;
      }
      if (p.phase === 'persist') {
        return this.translate('Saving uploaded files...');
      }
      return this.translate('Saving...');
    },
    saveProgressPercent() {
      const p = this.saveProgress;
      if (!p?.uploadTotal) return 0;
      const done = p.uploadCompleted ?? p.uploadCurrent ?? 0;
      return Math.min(100, Math.round((done / p.uploadTotal) * 100));
    },
    overlayCenterMessage() {
      if (this.saveProgress?.active) {
        return this.saveProgressLabel;
      }
      if (this.fileOverlayMessage) {
        return this.fileOverlayMessage;
      }
      if (this.ui.wait.form) {
        return this.translate('Loading...');
      }
      return '';
    },
    overlayShowUploadProgress() {
      return !!(this.saveProgress?.active && this.saveProgress.uploadTotal > 0);
    },
  },
  provide() {
    return {
      setFormOverlayMessage: (message) => {
        this.fileOverlayMessage = message || null;
      },
    };
  },
  data: function () {
    return {
      item: {},
      loaded: false,
      fileOverlayMessage: null,
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
    saveProgress: {
      handler(p) {
        if (p?.active) {
          this.formWait(true);
        } else {
          this.formNoWait();
        }
      },
      deep: true,
    },
  },
  methods: {

    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },

    getValueOrFunction(object, params) {
      return getValueOrFunction(object, params, this.settings, this);
    },

    getButtonClassByAction(action) {
      return resolveButtonClass(action);
    },

    getButtonIconClassByAction(action) {
      return resolveButtonIcon(action);
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

    handleFormErrors(errors) {
      
      if (errors === undefined || errors === null) {
        return;
      }

      const defaultTimeout = 14500;
      const defaultLevel = 'danger';

      // Ha string, akkor közvetlenül megjelenítjük
      if (typeof errors === 'string') {
        this.addFormMessage(errors, defaultTimeout, defaultLevel);
        return;
      }

      // Ha array, akkor minden elemet megjelenítünk
      if (Array.isArray(errors)) {
        for (let error of errors) {
          // Ha az error egy objektum message mezővel
          if (error && typeof error === 'object' && error.message) {
            this.addFormMessage(
              error.message, 
              error.timeout || defaultTimeout, 
              error.priority || defaultLevel
            );
          } 
          // Ha az error egy string
          else if (typeof error === 'string') {
            this.addFormMessage(error, defaultTimeout, defaultLevel);
          }
          // Ha az error egy objektum, de nincs message mező, próbáljuk az error objektumot stringgé alakítani
          else if (error && typeof error === 'object') {
            this.addFormMessage(
              JSON.stringify(error), 
              defaultTimeout, 
              defaultLevel
            );
          }
        }
        return;
      }

      // Ha objektum, akkor próbáljuk kinyerni a message mezőt
      if (typeof errors === 'object' && errors.message) {
        this.addFormMessage(
          errors.message, 
          errors.timeout || defaultTimeout, 
          errors.priority || defaultLevel
        );
        return;
      }

      // Végül, ha semmi más nem működik, próbáljuk stringgé alakítani
      this.addFormMessage(
        String(errors), 
        defaultTimeout, 
        defaultLevel
      );
    },


    addMessage(type, msg, timeout, priority, details) {

      clearTimeout(this.messageTimeout);

      const uid = `${Date.now().toString(36)}-${secureRandomString(8)}`;

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

        let item;

        if (primaryId) {

          const response = await fetch(
            prepareFetchUrl("GET", settings.form.api, primaryId),
            prepareFetchOptions("GET", settings.api, null, auth)
          ).catch((err) => {
            console.error('[vu-admin] fetchItem network error:', err);
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

          if (settings.form.api.input.item) {
            item =
              typeof settings.form.api.input.item === "string"
                ? json.data[settings.form.api.input.item]
                : settings.form.api.input.item(json.data, response);
          } else {
            item = json.data;
          }

        } else {
          item = settings.form.default ? Object.assign({}, settings.form.default) : {};
        }

        const relationPromises = [];

        for (let group of settings.form.groups) {
          for (let field of group.fields) {

            // preset dropdowns multiple
            if (field.type === "dropdown" && field.name !== '__proto__' && field.name !== 'constructor' && field.name !== 'prototype' && !item[field.name]) {
              item[field.name] = [];
            }

            // collect relations
            if (
              field.relation &&
              settings.relations &&
              settings.relations[field.relation.config]
            ) {
              field.relation = deepMerge(settings.relations[field.relation.config], field.relation);
              relationPromises.push(this.fetchRelation(field, [item], auth));
            }

          }
        }

        await Promise.all(relationPromises);

        if (settings.debug) {
          console.log('[vu-admin] fetchItem:', primaryId, item);
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
              : this.settings.form.api.input.item(data);
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
        this.handleFormErrors(err);
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


<style lang="scss" >
.vu-admin {
  [data-bs-theme="dark"] .modal-header.bg-body .btn-outline-dark {
    --bs-btn-color: var(--bs-body-color);
    --bs-btn-border-color: var(--bs-border-color);
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: var(--bs-secondary-bg);
    --bs-btn-hover-border-color: var(--bs-border-color);
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: var(--bs-secondary-bg);
    --bs-btn-active-border-color: var(--bs-border-color);
  }
}
</style>
