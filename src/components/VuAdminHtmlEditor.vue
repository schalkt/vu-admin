<template>
	<div ref="editor"></div>
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
      if (this.quill.root.innerHTML != newValue) {
        this.quill.root.innerHTML = newValue;
      }
    },
  },
  methods: {
    initQuillEditor() {
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

      this.quill.root.innerHTML = this.modelValue;

      this.quill.on("text-change", () => {
        this.$emit("update:modelValue", this.quill.root.innerHTML);
      });
    },
  },
};

export default HtmlEditor;

</script>
