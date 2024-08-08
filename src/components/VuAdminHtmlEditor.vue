<template>
  <div class="ql-editor-container">
    <div class="" ref="editor"></div>
  </div>
</template>

<script>
import Quill from "quill";
import "./../../node_modules/quill/dist/quill.core.css";
import "./../../node_modules/quill/dist/quill.snow.css";

const HtmlEditor = {
  props: ["modelValue"],
  mounted() {
    this.initQuillEditor();
  },
  watch: {
    modelValue(newValue) {
      if (!newValue) {
        newValue = "";
      }

      if (this.quill.root.innerHTML != newValue) {
        this.quill.root.innerHTML = newValue;
      }
    },
  },
  methods: {
    initQuillEditor() {
      // var Block = Quill.import("blots/block");
      // Block.tagName = "DIV";
      // Quill.register(Block, true);

      this.quill = new Quill(this.$refs.editor, {
        theme: "snow",
        modules: {
          //syntax: true,              // Include syntax module
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["clean"],
          ],
        },
        formats: [
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "image",
          "list",
          "indent",
          "align",
        ],
      });

      if (this.modelValue) {
        this.quill.root.innerHTML = this.modelValue;
      } else {
        this.quill.root.innerHTML = "";
      }

      this.quill.on("text-change", () => {
        this.$emit("update:modelValue", this.quill.root.innerHTML);
      });
    },
  },
};

export default HtmlEditor;
</script>


<style lang="scss" scoped>
[data-bs-theme="light"] {
  .ql-container .ql-snow {
    color: var(--bs-dark) !important;
  }
  .ql-editor {
    color: var(--bs-light) !important;
  }
}

[data-bs-theme="dark"] {
  .ql-editor-container {
    color: var(--bs-light) !important;
  }
}
</style>