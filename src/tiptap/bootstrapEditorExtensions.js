/**
 * TipTap kiterjesztések: HTML kimenet Bootstrap 5 utility osztályokkal (inline style helyett).
 */
import { Extension, Mark, mergeAttributes } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";
import { NodeSelection } from "@tiptap/pm/state";

const ALIGN_TO_CLASS = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
  justify: "text-justify",
};

const TEXT_COLOR_VARIANTS = ["primary", "secondary", "success", "danger", "warning", "info", "dark", "muted"];

const BG_VARIANTS = ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"];

const MARGIN_CLASSES = [
  "",
  "m-0",
  "m-1",
  "m-2",
  "m-3",
  "m-4",
  "m-5",
  "mx-1",
  "mx-2",
  "mx-3",
  "mx-auto",
  "my-1",
  "my-2",
  "my-3",
  "my-4",
  "mt-2",
  "mb-2",
  "ms-2",
  "me-2",
];

const ALERT_VARIANTS = ["secondary", "primary", "success", "danger", "warning", "info", "light", "dark"];

/** Bootstrap float utilities (toolbar: blokk + kép). */
export const bootstrapFloatClasses = ["float-start", "float-end", "float-none"];

/** Bootstrap `<img>` utility classes (whitelist for parse + editor UI). */
export const bootstrapImgUtilityClasses = [
  "img-fluid",
  "img-thumbnail",
  "rounded",
  "rounded-circle",
  "rounded-0",
  "d-block",
  "d-inline-block",
  "mx-auto",
  "w-100",
  "shadow",
  "shadow-sm",
];

const PADDING_CLASSES = [
  "",
  "p-0",
  "p-1",
  "p-2",
  "p-3",
  "p-4",
  "p-5",
  "px-1",
  "px-2",
  "px-3",
  "px-4",
  "py-1",
  "py-2",
  "py-3",
  "py-4",
  "pt-2",
  "pb-2",
  "ps-2",
  "pe-2",
];

function parseTextAlignFromElement(element, alignments, defaultAlignment) {
  if (!element || !element.classList) return defaultAlignment;
  for (const a of alignments) {
    const cls = ALIGN_TO_CLASS[a];
    if (cls && element.classList.contains(cls)) return a;
  }
  const st = element.style && element.style.textAlign;
  if (st && alignments.includes(st)) return st;
  return defaultAlignment;
}

/** @param {HTMLElement} element */
function parseAlertVariant(element) {
  if (!element || !element.classList) return "secondary";
  for (const v of ALERT_VARIANTS) {
    if (element.classList.contains(`alert-${v}`)) return v;
  }
  return "secondary";
}

/** @param {HTMLElement} element */
function parseMarginClass(element) {
  if (!element || !element.classList) return null;
  for (const c of MARGIN_CLASSES) {
    if (c && element.classList.contains(c)) return c;
  }
  return null;
}

/** @param {HTMLElement} element */
function parsePaddingClass(element) {
  if (!element || !element.classList) return null;
  for (const c of PADDING_CLASSES) {
    if (c && element.classList.contains(c)) return c;
  }
  return null;
}

/** @param {HTMLElement} element */
function parseImgUtilityClassString(element) {
  if (!element || !element.classList) return null;
  const out = [];
  for (const c of bootstrapImgUtilityClasses) {
    if (element.classList.contains(c)) out.push(c);
  }
  return out.length ? out.join(" ") : null;
}

/** @param {HTMLElement} element */
function parseFloatClass(element) {
  if (!element || !element.classList) return null;
  for (const c of bootstrapFloatClasses) {
    if (element.classList.contains(c)) return c;
  }
  if (element.classList.contains("float-left")) return "float-start";
  if (element.classList.contains("float-right")) return "float-end";
  return null;
}

function selectionIsImageNode(editor) {
  const sel = editor.state.selection;
  return sel instanceof NodeSelection && sel.node.type.name === "image";
}

export const BootstrapImage = Image.extend({
  atom: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      imgClass: {
        default: null,
        rendered: false,
        parseHTML: (element) => parseImgUtilityClassString(element),
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const imgClass = node.attrs.imgClass;
    const merged = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
    if (imgClass && String(imgClass).trim()) {
      return ["img", mergeAttributes(merged, { class: String(imgClass).trim() })];
    }
    return ["img", merged];
  },
});

export const BootstrapTextAlign = TextAlign.extend({
  addGlobalAttributes() {
    const alignments = this.options.alignments;
    const types = this.options.types;
    const def = this.options.defaultAlignment;
    return [
      {
        types,
        attributes: {
          textAlign: {
            default: def,
            parseHTML: (element) => parseTextAlignFromElement(element, alignments, def),
            renderHTML: (attributes) => {
              if (!attributes.textAlign) return {};
              const cls = ALIGN_TO_CLASS[attributes.textAlign];
              return cls ? { class: cls } : {};
            },
          },
        },
      },
    ];
  },
});

export const BootstrapBold = Bold.extend({
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => (el.classList && el.classList.contains("fw-bold") ? {} : false),
      },
      { tag: "strong" },
      {
        tag: "b",
        getAttrs: (node) => node.style.fontWeight !== "normal" && null,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "fw-bold" }), 0];
  },
});

export const BootstrapItalic = Italic.extend({
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => (el.classList && el.classList.contains("fst-italic") ? {} : false),
      },
      { tag: "em" },
      {
        tag: "i",
        getAttrs: (node) => node.style.fontStyle !== "normal" && null,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "fst-italic" }), 0];
  },
});

export const BootstrapUnderline = Underline.extend({
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => (el.classList && el.classList.contains("text-decoration-underline") ? {} : false),
      },
      { tag: "u" },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "text-decoration-underline" }),
      0,
    ];
  },
});

export const BootstrapStrike = Strike.extend({
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => (el.classList && el.classList.contains("text-decoration-line-through") ? {} : false),
      },
      { tag: "s" },
      { tag: "del" },
      { tag: "strike" },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "text-decoration-line-through" }),
      0,
    ];
  },
});

export const BootstrapBlockquote = Blockquote.extend({
  addAttributes() {
    return {
      variant: {
        default: "secondary",
        rendered: false,
        parseHTML: (element) => parseAlertVariant(element),
      },
    };
  },
  parseHTML() {
    return [
      { tag: "blockquote" },
      {
        tag: "div",
        getAttrs: (node) => {
          if (typeof node === "string" || !node.classList) return false;
          return node.classList.contains("alert") ? { variant: parseAlertVariant(node) } : false;
        },
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const v = node.attrs.variant && ALERT_VARIANTS.includes(node.attrs.variant) ? node.attrs.variant : "secondary";
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `alert alert-${v}`,
        role: "alert",
      }),
      0,
    ];
  },
});

export const BootstrapTextColor = Mark.create({
  name: "textColor",
  inclusive: true,
  addOptions() {
    return { HTMLAttributes: {} };
  },
  addAttributes() {
    return {
      variant: {
        default: null,
        rendered: false,
        parseHTML: (element) => {
          if (!element.classList) return null;
          for (const v of TEXT_COLOR_VARIANTS) {
            if (element.classList.contains(`text-${v}`)) return v;
          }
          return null;
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => {
          if (!el.classList) return false;
          for (const v of TEXT_COLOR_VARIANTS) {
            if (el.classList.contains(`text-${v}`)) return { variant: v };
          }
          return false;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes, mark }) {
    const v = mark.attrs.variant;
    if (!v) return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: `text-${v}` }), 0];
  },
  addCommands() {
    return {
      setTextColor:
        (variant) =>
        ({ commands }) => {
          if (!variant) return commands.unsetMark(this.name);
          return commands.setMark(this.name, { variant });
        },
      toggleTextColor:
        (variant) =>
        ({ commands, editor }) => {
          if (!variant) return commands.unsetMark(this.name);
          if (editor.isActive(this.name, { variant })) return commands.unsetMark(this.name);
          return commands.setMark(this.name, { variant });
        },
      unsetTextColor: () => ({ commands }) => commands.unsetMark(this.name),
    };
  },
});

export const BootstrapBackgroundColor = Mark.create({
  name: "backgroundColor",
  inclusive: true,
  addOptions() {
    return { HTMLAttributes: {} };
  },
  addAttributes() {
    return {
      variant: {
        default: null,
        rendered: false,
        parseHTML: (element) => {
          if (!element.classList) return null;
          for (const v of BG_VARIANTS) {
            if (element.classList.contains(`bg-${v}`)) return v;
          }
          return null;
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => {
          if (!el.classList) return false;
          for (const v of BG_VARIANTS) {
            if (el.classList.contains(`bg-${v}`)) return { variant: v };
          }
          return false;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes, mark }) {
    const v = mark.attrs.variant;
    if (!v) return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: `bg-${v}` }), 0];
  },
  addCommands() {
    return {
      setBackgroundColor:
        (variant) =>
        ({ commands }) => {
          if (!variant) return commands.unsetMark(this.name);
          return commands.setMark(this.name, { variant });
        },
      toggleBackgroundColor:
        (variant) =>
        ({ commands, editor }) => {
          if (!variant) return commands.unsetMark(this.name);
          if (editor.isActive(this.name, { variant })) return commands.unsetMark(this.name);
          return commands.setMark(this.name, { variant });
        },
      unsetBackgroundColor: () => ({ commands }) => commands.unsetMark(this.name),
    };
  },
});

export const BootstrapBlockMargin = Extension.create({
  name: "blockMargin",
  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote"],
    };
  },
  addGlobalAttributes() {
    const types = this.options.types;
    return [
      {
        types,
        attributes: {
          marginClass: {
            default: null,
            parseHTML: (element) => parseMarginClass(element),
            renderHTML: (attributes) => {
              if (!attributes.marginClass) return {};
              return { class: attributes.marginClass };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setBlockMarginClass:
        (cls) =>
        ({ editor, commands }) => {
          const value = cls || null;
          if (selectionIsImageNode(editor)) return commands.updateAttributes("image", { marginClass: value });
          if (editor.isActive("blockquote")) return commands.updateAttributes("blockquote", { marginClass: value });
          if (editor.isActive("heading")) return commands.updateAttributes("heading", { marginClass: value });
          return commands.updateAttributes("paragraph", { marginClass: value });
        },
      unsetBlockMarginClass: () => ({ editor, commands }) => {
        if (selectionIsImageNode(editor)) return commands.resetAttributes("image", "marginClass");
        if (editor.isActive("blockquote")) return commands.resetAttributes("blockquote", "marginClass");
        if (editor.isActive("heading")) return commands.resetAttributes("heading", "marginClass");
        return commands.resetAttributes("paragraph", "marginClass");
      },
    };
  },
});

export const BootstrapBlockPadding = Extension.create({
  name: "blockPadding",
  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote"],
    };
  },
  addGlobalAttributes() {
    const types = this.options.types;
    return [
      {
        types,
        attributes: {
          paddingClass: {
            default: null,
            parseHTML: (element) => parsePaddingClass(element),
            renderHTML: (attributes) => {
              if (!attributes.paddingClass) return {};
              return { class: attributes.paddingClass };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setBlockPaddingClass:
        (cls) =>
        ({ editor, commands }) => {
          const value = cls || null;
          if (selectionIsImageNode(editor)) return commands.updateAttributes("image", { paddingClass: value });
          if (editor.isActive("blockquote")) return commands.updateAttributes("blockquote", { paddingClass: value });
          if (editor.isActive("heading")) return commands.updateAttributes("heading", { paddingClass: value });
          return commands.updateAttributes("paragraph", { paddingClass: value });
        },
      unsetBlockPaddingClass: () => ({ editor, commands }) => {
        if (selectionIsImageNode(editor)) return commands.resetAttributes("image", "paddingClass");
        if (editor.isActive("blockquote")) return commands.resetAttributes("blockquote", "paddingClass");
        if (editor.isActive("heading")) return commands.resetAttributes("heading", "paddingClass");
        return commands.resetAttributes("paragraph", "paddingClass");
      },
    };
  },
});

export const BootstrapBlockFloat = Extension.create({
  name: "blockFloat",
  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote", "image"],
    };
  },
  addGlobalAttributes() {
    const types = this.options.types;
    return [
      {
        types,
        attributes: {
          floatClass: {
            default: null,
            parseHTML: (element) => parseFloatClass(element),
            renderHTML: (attributes) => {
              if (!attributes.floatClass) return {};
              return { class: attributes.floatClass };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setBlockFloatClass:
        (cls) =>
        ({ editor, commands }) => {
          const value = cls || null;
          if (selectionIsImageNode(editor)) return commands.updateAttributes("image", { floatClass: value });
          if (editor.isActive("blockquote")) return commands.updateAttributes("blockquote", { floatClass: value });
          if (editor.isActive("heading")) return commands.updateAttributes("heading", { floatClass: value });
          return commands.updateAttributes("paragraph", { floatClass: value });
        },
      unsetBlockFloatClass: () => ({ editor, commands }) => {
        if (selectionIsImageNode(editor)) return commands.resetAttributes("image", "floatClass");
        if (editor.isActive("blockquote")) return commands.resetAttributes("blockquote", "floatClass");
        if (editor.isActive("heading")) return commands.resetAttributes("heading", "floatClass");
        return commands.resetAttributes("paragraph", "floatClass");
      },
    };
  },
});

export const bootstrapTextColorVariants = TEXT_COLOR_VARIANTS;
export const bootstrapBgVariants = BG_VARIANTS;
export const bootstrapMarginClasses = MARGIN_CLASSES;
export const bootstrapPaddingClasses = PADDING_CLASSES;
export const bootstrapAlertVariants = ALERT_VARIANTS;
