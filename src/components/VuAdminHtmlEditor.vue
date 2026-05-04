<template>
  <div class="tiptap-html-editor" :class="[$attrs.class]">
    <div v-if="editor" class="tiptap-toolbar btn-toolbar flex-wrap gap-1 mb-1" role="toolbar">
      <span class="btn-group btn-group-sm">
        <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: editor.isActive('bold') }" :title="translate('Bold')" @click="editor.chain().focus().toggleBold().run()">B</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: editor.isActive('italic') }" :title="translate('Italic')" @click="editor.chain().focus().toggleItalic().run()"><i>I</i></button>
        <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: editor.isActive('underline') }" :title="translate('Underline')" @click="editor.chain().focus().toggleUnderline().run()"><u>U</u></button>
        <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: editor.isActive('strike') }" :title="translate('Strikethrough')" @click="editor.chain().focus().toggleStrike().run()"><s>S</s></button>
      </span>
      <div class="btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          {{ headingDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !editor.isActive('heading') }" @click="setHeadingLevel(null)">{{ translate('Normal text') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="n in headingLevels" :key="n">
            <button
              type="button"
              class="dropdown-item"
              :class="{ active: editor.isActive('heading', { level: n }) }"
              @click="setHeadingLevel(n)"
            >
              H{{ n }}
            </button>
          </li>
        </ul>
      </div>
      <div class="btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          {{ listDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive('bulletList') }" @click="toggleListType('bullet')">{{ translate('Bullet list') }}</button>
          </li>
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive('orderedList') }" @click="toggleListType('ordered')">{{ translate('Numbered list') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive('blockquote') }" @click="toggleListType('blockquote')">{{ translate('Quote') }}</button>
          </li>
        </ul>
      </div>
      <div class="btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          {{ alignDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive({ textAlign: 'left' }) }" @click="setTextAlignValue('left')">{{ translate('Align left') }}</button>
          </li>
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive({ textAlign: 'center' }) }" @click="setTextAlignValue('center')">{{ translate('Align center') }}</button>
          </li>
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive({ textAlign: 'right' }) }" @click="setTextAlignValue('right')">{{ translate('Align right') }}</button>
          </li>
          <li>
            <button type="button" class="dropdown-item" :class="{ active: editor.isActive({ textAlign: 'justify' }) }" @click="setTextAlignValue('justify')">{{ translate('Align justify') }}</button>
          </li>
        </ul>
      </div>
      <span class="btn-group btn-group-sm">
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="translate('Link')" @click="toggleLink">🔗</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="translate('Remove link')" @click="editor.chain().focus().unsetLink().run()">✕</button>
      </span>
      <span class="btn-group btn-group-sm">
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="selectedImagePos !== null ? translate('Edit image') : translate('Insert image')" @click="openImageModalFromToolbar">🖼</button>
      </span>
      <span class="btn-group btn-group-sm">
        <button type="button" class="btn btn-sm btn-outline-secondary font-monospace small" :title="translate('HTML source')" @click="openHtmlSourceModal">HTML</button>
      </span>
      <span class="btn-group btn-group-sm">
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="translate('Undo')" @click="editor.chain().focus().undo().run()">↶</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="translate('Redo')" @click="editor.chain().focus().redo().run()">↷</button>
      </span>
    </div>

    <editor-content v-if="editor" :editor="editor" class="tiptap-content-wrap" />

    <div v-if="imageModalOpen" class="tiptap-modal-overlay" @click.self="closeImageModal">
      <div class="tiptap-modal-content" @click.stop>
        <div class="tiptap-modal-header">
          <h5 class="mb-0">{{ imageModalTitle }}</h5>
          <button type="button" class="btn-close" :aria-label="translate('Close')" @click="closeImageModal"></button>
        </div>
        <div class="tiptap-modal-body">
          <div class="row g-2 mb-3">
            <div class="col-12 col-md-5">
              <label class="form-label small text-secondary mb-0">{{ translate('Alt text') }}</label>
              <input v-model="imageEditForm.alt" type="text" class="form-control form-control-sm" :placeholder="translate('Description for the image')" />
            </div>
            <div class="col-6 col-md-3">
              <label class="form-label small text-secondary mb-0">{{ translate('Width (px)') }}</label>
              <input v-model="imageEditForm.width" type="number" min="1" class="form-control form-control-sm" :placeholder="translate('auto')" />
            </div>
            <div class="col-6 col-md-3">
              <label class="form-label small text-secondary mb-0">{{ translate('Height (px)') }}</label>
              <input v-model="imageEditForm.height" type="number" min="1" class="form-control form-control-sm" :placeholder="translate('auto')" />
            </div>
          </div>

          <p v-if="imageModalMode === 'insert' && !imageGalleryEntries.length" class="text-secondary small mb-3">
            {{ translate('No images in form fields yet. Upload an image or enter an image URL below.') }}
          </p>
          <p v-else-if="imageModalMode === 'edit' && !imageGalleryEntries.length" class="text-secondary small mb-2">
            {{ translate('No images in form. You can edit the source in the URL field.') }}
          </p>

          <div v-if="imageGalleryEntries.length" class="row g-2 mb-3">
            <div
              v-for="entry in imageGalleryEntries"
              :key="entry.id"
              class="col-6 col-md-4 col-lg-3"
            >
              <button
                type="button"
                class="tiptap-gallery-card w-100 h-100 text-start p-2 border rounded"
                :class="{ 'border-primary': selectedImageId === entry.id }"
                @click="selectGalleryEntry(entry)"
              >
                <img :src="entry.thumbSrc" class="img-fluid rounded mb-1" style="max-height: 72px; object-fit: contain; width: 100%;" :alt="entry.fileTitle" />
                <div class="small text-truncate" :title="entry.fileTitle">{{ entry.fileTitle }}</div>
                <div class="text-muted" style="font-size: 0.7rem;">{{ entry.fieldLabel }}</div>
              </button>
            </div>
          </div>

          <div v-if="selectedGalleryEntry && selectedGalleryEntry.presets.length" class="mb-3">
            <label class="form-label small text-secondary mb-1">{{ translate('Preset (size / format)') }}</label>
            <div class="d-flex flex-wrap gap-1">
              <button
                v-for="p in selectedGalleryEntry.presets"
                :key="p.key"
                type="button"
                class="btn btn-sm"
                :class="selectedPresetKey === p.key ? 'btn-primary' : 'btn-outline-secondary'"
                @click="selectedPresetKey = p.key; syncManualFromPreset()"
              >
                {{ p.key }}
              </button>
            </div>
          </div>

          <div class="border-top pt-3 mt-1">
            <label class="form-label small text-secondary">{{ translate('Image URL') }}</label>
            <div class="input-group input-group-sm">
              <input v-model="manualImageUrl" type="text" class="form-control font-monospace" :placeholder="translate('https:// or data: URL')" @keydown.enter.prevent="confirmImageModalPrimary" />
              <button v-if="imageModalMode === 'insert'" type="button" class="btn btn-outline-secondary" @click="insertFromModalUrlOnly">{{ translate('URL only') }}</button>
            </div>
          </div>
        </div>
        <div class="tiptap-modal-footer">
          <button v-if="imageModalMode === 'edit'" type="button" class="btn btn-outline-danger me-auto" @click="deleteImageFromModal">{{ translate('Delete image') }}</button>
          <button type="button" class="btn btn-secondary" @click="closeImageModal">{{ translate('Cancel') }}</button>
          <button type="button" class="btn btn-primary" :disabled="!canConfirmImageModal" @click="confirmImageModalPrimary">
            {{ imageModalMode === 'edit' ? translate('Save') : translate('Insert') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="htmlSourceModalOpen" class="tiptap-modal-overlay" @click.self="closeHtmlSourceModal">
      <div class="tiptap-modal-content tiptap-html-modal-wide" @click.stop>
        <div class="tiptap-modal-header">
          <h5 class="mb-0">{{ translate('HTML source') }}</h5>
          <button type="button" class="btn-close" :aria-label="translate('Close')" @click="closeHtmlSourceModal"></button>
        </div>
        <div class="tiptap-modal-body">
          <textarea
            ref="htmlSourceTextarea"
            v-model="htmlSourceText"
            class="form-control font-monospace tiptap-html-source"
            rows="18"
            spellcheck="false"
          ></textarea>
        </div>
        <div class="tiptap-modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeHtmlSourceModal">{{ translate('Cancel') }}</button>
          <button type="button" class="btn btn-primary" @click="applyHtmlSource">{{ translate('Apply') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { NodeSelection } from "@tiptap/pm/state";
import { translate as translateMessage } from "./helpers";

function normalizeHtmlOutput(html) {
  const trimmed = (html || "").trim();
  if (!trimmed || trimmed === "<p></p>" || trimmed === "<p><br></p>") return "";
  const div = document.createElement("div");
  div.innerHTML = trimmed;
  const text = (div.textContent || "").replace(/\u00a0/g, " ").trim();
  if (!text && !div.querySelector("img, iframe, video, hr, table")) return "";
  return trimmed;
}

function sortPresetKeys(presets) {
  return [...presets].sort((a, b) => {
    if (a.key === "default") return -1;
    if (b.key === "default") return 1;
    return String(a.key).localeCompare(String(b.key));
  });
}

/** Upload tags → suggested img alt (params.tags labels, or server `file.tag` string). */
function imageAltFromUploadTags(file, tagDefinitions) {
  if (!file || typeof file !== "object") return "";
  const single = file.tag;
  if (typeof single === "string" && single.trim()) return single.trim();
  const selected = file.tags;
  if (!Array.isArray(selected) || !selected.length) return "";
  const defs = Array.isArray(tagDefinitions) ? tagDefinitions : [];
  const parts = selected.map((val) => {
    const def = defs.find((d) => d && d.value === val);
    if (def && typeof def.label === "string" && def.label.trim()) return def.label.trim();
    return String(val);
  });
  return parts.filter(Boolean).join(", ");
}

const HtmlEditor = {
  components: { EditorContent },
  inheritAttrs: false,
  props: {
    modelValue: [String, null],
    /** vu-entity: `field.tiptap` — placeholder, imageSourceFields?: string[] */
    tiptapOptions: { type: Object, default: () => ({}) },
    formItem: { type: Object, default: null },
    /** Form `settings` (translate, language) — toolbar/modal strings use the same `translate()` as other vu-admin components. */
    formSettings: { type: Object, default: null },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      editor: null,
      imageModalOpen: false,
      /** insert | edit */
      imageModalMode: "insert",
      /** edit mode: doc position when modal opens */
      editingImagePos: null,
      editOriginalSrc: "",
      selectedImageId: null,
      selectedPresetKey: "default",
      manualImageUrl: "",
      selectedImagePos: null,
      imageEditForm: {
        alt: "",
        width: "",
        height: "",
      },
      htmlSourceModalOpen: false,
      htmlSourceText: "",
    };
  },
  computed: {
    imageModalTitle() {
      return this.imageModalMode === "edit" ? this.translate("Edit image") : this.translate("Insert image");
    },
    placeholderText() {
      return (this.tiptapOptions && this.tiptapOptions.placeholder) || "";
    },
    imageSourceFieldFilter() {
      const f = this.tiptapOptions && this.tiptapOptions.imageSourceFields;
      return Array.isArray(f) && f.length ? f : null;
    },
    imageGalleryEntries() {
      const item = this.formItem;
      const settings = this.formSettings;
      const filterNames = this.imageSourceFieldFilter;
      const out = [];
      if (!item || !settings || !settings.form || !Array.isArray(settings.form.groups)) {
        return out;
      }
      for (const group of settings.form.groups) {
        const fields = group.fields;
        if (!Array.isArray(fields)) continue;
        for (const field of fields) {
          if (field.type !== "image" && field.type !== "upload") continue;
          if (filterNames && !filterNames.includes(field.name)) continue;
          const arr = item[field.name];
          if (!Array.isArray(arr)) continue;
          const thumbKey = (field.params && field.params.thumbnail) || "default";
          for (const file of arr) {
            if (!file || !file.isImage || !file.loaded || !file.types) continue;
            const presets = [];
            for (const key of Object.keys(file.types)) {
              const t = file.types[key];
              const src = t && (t.url || t.data);
              if (typeof src === "string" && src.length > 0) {
                presets.push({ key, src });
              }
            }
            if (!presets.length) continue;
            const sorted = sortPresetKeys(presets);
            const thumbType = file.types[thumbKey];
            const thumbSrc = (thumbType && (thumbType.url || thumbType.data)) || sorted[0].src;
            const fieldLabel =
              typeof field.label === "string" && field.label
                ? field.label
                : field.name;
            const tagOptions = field.params && Array.isArray(field.params.tags) ? field.params.tags : [];
            out.push({
              id: [field.name, file.uid, file.slug].filter(Boolean).join("__"),
              fieldName: field.name,
              fieldLabel,
              fileTitle: file.title || file.name || fieldLabel,
              thumbSrc,
              file,
              tagOptions,
              presets: sorted,
            });
          }
        }
      }
      return out;
    },
    selectedGalleryEntry() {
      if (!this.selectedImageId) return null;
      return this.imageGalleryEntries.find((e) => e.id === this.selectedImageId) || null;
    },
    modalResolvedSrc() {
      const entry = this.selectedGalleryEntry;
      if (entry && entry.presets.length) {
        const p = entry.presets.find((x) => x.key === this.selectedPresetKey) || entry.presets[0];
        if (p && p.src) return p.src;
      }
      const manual = (this.manualImageUrl || "").trim();
      if (manual) return manual;
      if (this.imageModalMode === "edit" && this.editOriginalSrc) return this.editOriginalSrc;
      return "";
    },
    canConfirmImageModal() {
      return !!this.modalResolvedSrc;
    },
    headingLevels() {
      return [1, 2, 3, 4, 5];
    },
    headingDropdownLabel() {
      if (!this.editor) return this.translate("Paragraph");
      for (const n of this.headingLevels) {
        if (this.editor.isActive("heading", { level: n })) return `H${n}`;
      }
      return this.translate("Paragraph");
    },
    listDropdownLabel() {
      if (!this.editor) return this.translate("List");
      if (this.editor.isActive("bulletList")) return this.translate("Bullet list");
      if (this.editor.isActive("orderedList")) return this.translate("Numbered list");
      if (this.editor.isActive("blockquote")) return this.translate("Quote");
      return this.translate("List");
    },
    alignDropdownLabel() {
      if (!this.editor) return this.translate("Alignment");
      const order = ["left", "center", "right", "justify"];
      const keys = { left: "Align left", center: "Align center", right: "Align right", justify: "Align justify" };
      for (const a of order) {
        if (this.editor.isActive({ textAlign: a })) return this.translate(keys[a]);
      }
      return this.translate("Alignment");
    },
  },
  mounted() {
    this.createEditor((this.modelValue || "").trim());
  },
  beforeUnmount() {
    this.editor?.destroy();
    this.editor = null;
    this.selectedImagePos = null;
  },
  watch: {
    modelValue(val) {
      if (!this.editor) return;
      const incoming = (val || "").trim();
      const current = normalizeHtmlOutput(this.editor.getHTML());
      if (incoming !== current) {
        this.editor.commands.setContent(incoming || "<p></p>", false);
      }
    },
    placeholderText() {
      this.recreateEditor();
    },
    imageGalleryEntries() {
      if (this.selectedImageId && !this.imageGalleryEntries.some((e) => e.id === this.selectedImageId)) {
        this.selectedImageId = null;
      }
    },
  },
  methods: {
    translate(key, vars, language) {
      return translateMessage(
        key,
        this.formSettings && this.formSettings.translate,
        vars,
        language != null ? language : this.formSettings && this.formSettings.language
      );
    },
    setHeadingLevel(level) {
      if (!this.editor) return;
      if (level == null) {
        this.editor.chain().focus().setParagraph().run();
      } else {
        this.editor.chain().focus().setHeading({ level }).run();
      }
    },
    toggleListType(type) {
      if (!this.editor) return;
      if (type === "bullet") {
        this.editor.chain().focus().toggleBulletList().run();
      } else if (type === "ordered") {
        this.editor.chain().focus().toggleOrderedList().run();
      } else if (type === "blockquote") {
        this.editor.chain().focus().toggleBlockquote().run();
      }
    },
    setTextAlignValue(align) {
      if (!this.editor) return;
      this.editor.chain().focus().setTextAlign(align).run();
    },
    findGalleryMatchForSrc(src) {
      if (!src || typeof src !== "string") return null;
      for (const entry of this.imageGalleryEntries) {
        for (const p of entry.presets) {
          if (p.src === src) return { entry, presetKey: p.key };
        }
      }
      return null;
    },
    getImageAttrsFromForm() {
      const w = parseInt(String(this.imageEditForm.width).trim(), 10);
      const h = parseInt(String(this.imageEditForm.height).trim(), 10);
      const alt = String(this.imageEditForm.alt || "").trim();
      return {
        alt: alt || null,
        title: alt || null,
        width: Number.isFinite(w) && w > 0 ? w : null,
        height: Number.isFinite(h) && h > 0 ? h : null,
      };
    },
    getImageSelectionPos(state) {
      const sel = state.selection;
      if (sel instanceof NodeSelection && sel.node.type.name === "image") {
        return sel.from;
      }
      return null;
    },
    syncSelectedImageFromEditor() {
      if (!this.editor) return;
      const pos = this.getImageSelectionPos(this.editor.state);
      if (pos !== this.selectedImagePos) {
        this.selectedImagePos = pos;
      }
    },
    applyImageAttrsAt(pos) {
      if (!this.editor || pos == null) return;
      const attrs = this.getImageAttrsFromForm();
      this.editor.chain().focus().setNodeSelection(pos).updateAttributes("image", attrs).run();
    },
    deleteSelectedImageAt(pos) {
      if (!this.editor || pos == null) return;
      this.editor.chain().focus().setNodeSelection(pos).deleteSelection().run();
      if (this.selectedImagePos === pos) this.selectedImagePos = null;
    },
    createEditor(initialHtml) {
      const content = initialHtml || "<p></p>";
      const extensions = [
        StarterKit.configure({
          heading: { levels: [1, 2, 3, 4, 5] },
          codeBlock: false,
          horizontalRule: true,
        }),
        Underline,
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph", "blockquote"],
          alignments: ["left", "center", "right", "justify"],
        }),
        Image.extend({
          atom: true,
        }).configure({
          inline: false,
          allowBase64: true,
        }),
      ];
      if (this.placeholderText) {
        extensions.push(
          Placeholder.configure({
            placeholder: this.placeholderText,
            showOnlyWhenEditable: true,
            showOnlyCurrent: false,
          })
        );
      }
      this.editor = new Editor({
        content,
        extensions,
        editorProps: {
          attributes: {
            class: "tiptap-editor form-control",
            spellcheck: "true",
          },
          handleDOMEvents: {
            click: (view, event) => {
              const t = event.target;
              if (!view.editable || !(t instanceof Element) || t.tagName !== "IMG") {
                return false;
              }
              const root = view.dom.querySelector?.(".ProseMirror");
              if (!root || !root.contains(t)) return false;
              const pos = view.posAtDOM(t, 0);
              if (pos == null || pos < 0) return false;
              const node = view.state.doc.nodeAt(pos);
              if (!node || node.type.name !== "image") return false;
              view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)));
              view.focus();
              return true;
            },
            dblclick: (view, event) => {
              const t = event.target;
              if (!view.editable || !(t instanceof Element) || t.tagName !== "IMG") {
                return false;
              }
              const root = view.dom.querySelector?.(".ProseMirror");
              if (!root || !root.contains(t)) return false;
              const pos = view.posAtDOM(t, 0);
              if (pos == null || pos < 0) return false;
              const node = view.state.doc.nodeAt(pos);
              if (!node || node.type.name !== "image") return false;
              view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)));
              view.focus();
              this.openImageModal("edit", pos);
              return true;
            },
          },
        },
        onUpdate: () => {
          const html = normalizeHtmlOutput(this.editor.getHTML());
          this.$emit("update:modelValue", html);
        },
        onSelectionUpdate: () => {
          this.syncSelectedImageFromEditor();
          this.$forceUpdate();
        },
        onTransaction: () => {
          this.syncSelectedImageFromEditor();
          this.$forceUpdate();
        },
      });
    },
    recreateEditor() {
      const html = this.editor ? this.editor.getHTML() : this.modelValue || "";
      this.editor?.destroy();
      this.editor = null;
      this.selectedImagePos = null;
      this.imageEditForm = { alt: "", width: "", height: "" };
      this.$nextTick(() => {
        this.createEditor(normalizeHtmlOutput(html));
      });
    },
    openImageModalFromToolbar() {
      if (this.selectedImagePos !== null) {
        this.openImageModal("edit", this.selectedImagePos);
      } else {
        this.openImageModal("insert");
      }
    },
    openHtmlSourceModal() {
      if (!this.editor) return;
      if (this.imageModalOpen) this.closeImageModal();
      this.htmlSourceText = this.editor.getHTML();
      this.htmlSourceModalOpen = true;
      this.$nextTick(() => {
        const el = this.$refs.htmlSourceTextarea;
        if (el && typeof el.focus === "function") el.focus();
      });
    },
    closeHtmlSourceModal() {
      this.htmlSourceModalOpen = false;
      this.htmlSourceText = "";
    },
    applyHtmlSource() {
      if (!this.editor) return;
      const raw = (this.htmlSourceText || "").trim();
      this.editor.commands.setContent(raw || "<p></p>", false);
      const html = normalizeHtmlOutput(this.editor.getHTML());
      this.$emit("update:modelValue", html);
      this.closeHtmlSourceModal();
      this.editor.chain().focus().run();
    },
    toggleLink() {
      if (!this.editor) return;
      const prev = this.editor.getAttributes("link").href;
      const url = window.prompt(this.translate("Link URL:"), prev || "https://");
      if (url === null) return;
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
    openImageModal(mode, docPos) {
      if (this.htmlSourceModalOpen) this.closeHtmlSourceModal();
      this.imageModalMode = mode === "edit" ? "edit" : "insert";
      this.editingImagePos = mode === "edit" && docPos != null ? docPos : null;

      if (this.imageModalMode === "edit" && this.editingImagePos != null && this.editor) {
        const node = this.editor.state.doc.nodeAt(this.editingImagePos);
        if (!node || node.type.name !== "image") {
          this.closeImageModal();
          return;
        }
        const src = node.attrs.src || "";
        this.editOriginalSrc = src;
        this.manualImageUrl = src.length > 2000 && src.startsWith("data:") ? "" : src;
        const match = this.findGalleryMatchForSrc(src);
        const existingAlt = (node.attrs.alt && String(node.attrs.alt).trim()) || "";
        const tagAlt = match ? imageAltFromUploadTags(match.entry.file, match.entry.tagOptions) : "";
        this.imageEditForm = {
          alt: existingAlt || tagAlt,
          width: node.attrs.width != null ? String(node.attrs.width) : "",
          height: node.attrs.height != null ? String(node.attrs.height) : "",
        };
        if (match) {
          this.selectedImageId = match.entry.id;
          this.selectedPresetKey = match.presetKey;
        } else {
          this.selectedImageId = null;
          this.selectedPresetKey = "default";
        }
      } else {
        this.editOriginalSrc = "";
        this.manualImageUrl = "";
        this.imageEditForm = { alt: "", width: "", height: "" };
        this.selectedImageId = null;
        this.selectedPresetKey = "default";
        if (this.imageGalleryEntries.length) {
          this.selectGalleryEntry(this.imageGalleryEntries[0]);
        }
      }
      this.imageModalOpen = true;
    },
    closeImageModal() {
      this.imageModalOpen = false;
      this.imageModalMode = "insert";
      this.editingImagePos = null;
      this.editOriginalSrc = "";
      this.manualImageUrl = "";
    },
    syncManualFromPreset() {
      const e = this.selectedGalleryEntry;
      if (!e) return;
      const p = e.presets.find((x) => x.key === this.selectedPresetKey) || e.presets[0];
      if (p && p.src && (!p.src.startsWith("data:") || p.src.length < 4000)) {
        this.manualImageUrl = p.src;
      }
    },
    selectGalleryEntry(entry) {
      this.selectedImageId = entry.id;
      const hasDefault = entry.presets.some((p) => p.key === "default");
      this.selectedPresetKey = hasDefault ? "default" : entry.presets[0].key;
      this.syncManualFromPreset();
      const altFromTags = imageAltFromUploadTags(entry.file, entry.tagOptions);
      this.imageEditForm = {
        ...this.imageEditForm,
        alt: altFromTags,
      };
    },
    confirmImageModalPrimary() {
      const src = this.modalResolvedSrc;
      if (!this.editor || !src) return;
      if (this.imageModalMode === "edit" && this.editingImagePos != null) {
        const attrs = { ...this.getImageAttrsFromForm(), src };
        this.editor.chain().focus().setNodeSelection(this.editingImagePos).updateAttributes("image", attrs).run();
        this.closeImageModal();
        return;
      }
      const attrs = { ...this.getImageAttrsFromForm(), src };
      this.editor.chain().focus().setImage(attrs).run();
      this.closeImageModal();
    },
    insertFromModalUrlOnly() {
      const u = (this.manualImageUrl || "").trim();
      if (!this.editor || !u) return;
      const attrs = { ...this.getImageAttrsFromForm(), src: u };
      this.editor.chain().focus().setImage(attrs).run();
      this.closeImageModal();
    },
    deleteImageFromModal() {
      if (!this.editor || this.editingImagePos == null) return;
      this.deleteSelectedImageAt(this.editingImagePos);
      this.closeImageModal();
    },
  },
};
export default HtmlEditor;
</script>

<style lang="scss">
.vu-admin {
  .tiptap-html-editor {
    .tiptap-toolbar .btn.active {
      background-color: var(--bs-secondary-bg);
      border-color: var(--bs-border-color);
    }

    .tiptap-toolbar .dropdown-menu {
      z-index: 1060;
    }

    .tiptap-gallery-card {
      background: var(--bs-body-bg);
      cursor: pointer;
    }

    .tiptap-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 1055;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .tiptap-modal-content {
      background: var(--bs-body-bg);
      color: var(--bs-body-color);
      border-radius: var(--bs-border-radius);
      box-shadow: var(--bs-box-shadow);
      max-width: 720px;
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;

      &.tiptap-html-modal-wide {
        max-width: min(960px, 100vw - 2rem);
      }
    }

    .tiptap-html-source {
      min-height: 14rem;
      font-size: 0.8125rem;
      resize: vertical;
    }

    .tiptap-modal-header,
    .tiptap-modal-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--bs-border-color);
    }

    .tiptap-modal-footer {
      border-top: 1px solid var(--bs-border-color);
      border-bottom: none;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .tiptap-modal-body {
      padding: 1rem;
      overflow-y: auto;
    }

    .tiptap-content-wrap {
      .tiptap-editor {
        min-height: 12rem;
        overflow-y: auto;

        &:focus {
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.15);
        }

        p.is-editor-empty::before {
          color: var(--bs-secondary-color);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        img.ProseMirror-selectednode {
          outline: 2px solid var(--bs-primary);
          outline-offset: 2px;
        }
      }

      .ProseMirror {
        min-height: 11rem;
        padding: 0.5rem 0.75rem;
      }
    }
  }

  [data-bs-theme="dark"] .tiptap-html-editor .tiptap-content-wrap .ProseMirror {
    color: var(--bs-body-color);
  }
}
</style>
