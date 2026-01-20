<template>
  <div class="ql-editor-container">
    <div class="" ref="editor"></div>
    <!-- HTML szerkesztő modal -->
    <div v-if="showHtmlModal" class="html-modal-overlay" @click="closeHtmlModal">
      <div class="html-modal-content" @click.stop>
        <div class="html-modal-header">
          <h5>HTML szerkesztés</h5>
          <button type="button" class="btn-close" @click="closeHtmlModal"></button>
        </div>
        <div class="html-modal-body">
          <textarea 
            ref="htmlTextarea" 
            class="form-control html-textarea" 
            v-model="htmlContent"
            rows="15"
          ></textarea>
        </div>
        <div class="html-modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeHtmlModal">Mégse</button>
          <button type="button" class="btn btn-primary" @click="applyHtmlContent">Alkalmaz</button>
        </div>
      </div>
    </div>
    <!-- Iframe beszúrás modal -->
    <div v-if="showIframeModal" class="html-modal-overlay" @click="closeIframeModal">
      <div class="html-modal-content" @click.stop>
        <div class="html-modal-header">
          <h5>Iframe beillesztése</h5>
          <button type="button" class="btn-close" @click="closeIframeModal"></button>
        </div>
        <div class="html-modal-body">
          <label class="form-label">Iframe HTML kód:</label>
          <textarea 
            ref="iframeTextarea" 
            class="form-control html-textarea" 
            v-model="iframeHtml"
            rows="5"
            placeholder='<iframe src="..." width="..." height="..."></iframe>'
          ></textarea>
        </div>
        <div class="html-modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeIframeModal">Mégse</button>
          <button type="button" class="btn btn-primary" @click="insertIframe">Beillesztés</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import "./../../node_modules/quill/dist/quill.core.css";
import "./../../node_modules/quill/dist/quill.snow.css";

const HtmlEditor = {
  props: ["modelValue"],
  data() {
    return {
      showHtmlModal: false,
      htmlContent: "",
      showIframeModal: false,
      iframeHtml: ""
    };
  },
  mounted() {
    this.initQuillEditor();
  },
  watch: {
    modelValue(newValue) {
      if (!newValue) {
        newValue = "";
      }

      if (this.quill) {
        const incoming = (newValue || "").trim();
        const currentContent = this.getCleanHtmlContent();
        // Csak akkor frissítünk, ha valóban változott
        if (currentContent !== incoming) {
          this.setHtmlContent(incoming);
        }
      }
    },
  },
  methods: {
    initQuillEditor() {
      
      const Block = Quill.import('blots/block');
      class DivBlock extends Block {}
      DivBlock.tagName = 'div'; // vagy 'span'
      // DivBlock.blotName = 'paragraph'; // ezzel felülírod az alap p-t
      Quill.register(DivBlock, true);

      // Iframe blot létrehozása - teljes attribútum támogatással
      const Embed = Quill.import('blots/embed');
      class IframeBlot extends Embed {
        static create(value) {
          const node = document.createElement('iframe');
          
          // Ha string, akkor próbáljuk parse-olni HTML-ből
          if (typeof value === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = value;
            const iframe = tempDiv.querySelector('iframe');
            if (iframe) {
              // Másoljuk az összes attribútumot
              Array.from(iframe.attributes).forEach(attr => {
                node.setAttribute(attr.name, attr.value);
              });
              return node;
            }
            // Ha nem iframe, akkor csak src-ként használjuk
            node.setAttribute('src', value);
          } else {
            // Objektum esetén - minden attribútumot beállítunk
            Object.keys(value).forEach(key => {
              if (key === 'url' || key === 'src') {
                node.setAttribute('src', value[key]);
              } else if (value[key] !== undefined && value[key] !== null) {
                node.setAttribute(key, value[key]);
              }
            });
          }
          
          // Alapértelmezett stílus hozzáadása, ha nincs
          if (!node.getAttribute('style')) {
            node.setAttribute('style', 'max-width: 100%; border: none;');
          }
          
          return node;
        }

        static value(node) {
          const attrs = {};
          Array.from(node.attributes).forEach(attr => {
            attrs[attr.name] = attr.value;
          });
          return attrs;
        }
      }
      IframeBlot.blotName = 'iframe';
      IframeBlot.tagName = 'iframe';
      IframeBlot.className = 'ql-iframe';
      Quill.register(IframeBlot);

      this.quill = new Quill(this.$refs.editor, {
        theme: "snow",
        modules: {
          //syntax: true,              // Include syntax module
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["link", "image", "iframe"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ align: [] }],
              ["clean", "html"],
            ],
            handlers: {
              iframe: () => {
                this.openIframeModal();
              },
              html: () => {
                this.openHtmlModal();
              }
            }
          },
        },
        formats: [
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "image",
          "iframe",
          "list",
          "indent",
          "align",
        ],
      });

      const initialValue = (this.modelValue || "").trim();
      this.setHtmlContent(initialValue);

      // Iframe és HTML gomb ikonok hozzáadása
      this.$nextTick(() => {
        const toolbar = this.$refs.editor.parentElement.querySelector('.ql-toolbar');
        if (toolbar) {
          // Iframe gomb ikon
          const iframeButton = toolbar.querySelector('button[class*="iframe"], .ql-iframe');
          if (iframeButton) {
            iframeButton.innerHTML = `
              <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <line class="ql-stroke" x1="9" x2="9" y1="4" y2="14"></line>
                <line class="ql-stroke" x1="3" x2="15" y1="7" y2="7"></line>
                <line class="ql-stroke" x1="3" x2="15" y1="11" y2="11"></line>
              </svg>
            `;
          }
          
          // HTML gomb ikon
          const htmlButton = toolbar.querySelector('button[class*="html"], .ql-html');
          if (htmlButton) {
            htmlButton.innerHTML = `
              <svg viewBox="0 0 18 18">
                <polyline class="ql-stroke" points="5 7 3 9 5 11"></polyline>
                <polyline class="ql-stroke" points="13 7 15 9 13 11"></polyline>
                <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line>
              </svg>
            `;
            htmlButton.setAttribute('title', 'HTML szerkesztés');
          }
        }
      });

      this.quill.on("text-change", () => {
        const content = this.getCleanHtmlContent();
        this.$emit("update:modelValue", content);
      });
    },
    getCleanHtmlContent() {
      if (!this.quill) return "";
      
      const html = this.quill.root.innerHTML;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      // Van-e tényleges tartalom?
      const textContent = (tempDiv.textContent || "").replace(/\u200B/g, "").trim();
      const hasText = textContent.length > 0;
      const hasMedia = !!tempDiv.querySelector("img, video, audio, iframe, embed, object, svg");

      const cleanedHtml = tempDiv.innerHTML.trim();

      // Ha nincs szöveg és nincs média, tekintsük üresnek (ne hagyjunk <br>-t sem)
      if (!hasText && !hasMedia) {
        return "";
      }
      
      return cleanedHtml;
    },
    openHtmlModal() {
      // Használjuk a getCleanHtmlContent() függvényt, hogy ne jelenjen meg <div><br></div>
      const cleanContent = this.getCleanHtmlContent();
      this.htmlContent = cleanContent || "";
      this.showHtmlModal = true;
      this.$nextTick(() => {
        if (this.$refs.htmlTextarea) {
          this.$refs.htmlTextarea.focus();
        }
      });
    },
    closeHtmlModal() {
      this.showHtmlModal = false;
    },
    applyHtmlContent() {
      if (this.quill) {
        const trimmed = (this.htmlContent || "").trim();

        this.setHtmlContent(trimmed);
        
        const updatedContent = this.getCleanHtmlContent();
        this.$emit("update:modelValue", updatedContent);
      }
      this.closeHtmlModal();
    },
    openIframeModal() {
      this.iframeHtml = '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Feurokert%2Fvideos%2F1404421690667938%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>';
      this.showIframeModal = true;
      this.$nextTick(() => {
        if (this.$refs.iframeTextarea) {
          this.$refs.iframeTextarea.focus();
          this.$refs.iframeTextarea.select();
        }
      });
    },
    closeIframeModal() {
      this.showIframeModal = false;
      this.iframeHtml = "";
    },
    insertIframe() {
      if (!this.iframeHtml || !this.iframeHtml.trim()) {
        return;
      }

      const range = this.quill.getSelection(true);
      const index = range ? range.index : this.quill.getLength();
      
      // Parse-oljuk az iframe HTML-t
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.iframeHtml.trim();
      const iframe = tempDiv.querySelector('iframe');
      
      if (iframe) {
        // Kinyerjük az attribútumokat és objektumként adjuk át
        const attrs = {};
        Array.from(iframe.attributes).forEach(attr => {
          attrs[attr.name] = attr.value;
        });
        // Beillesztjük a blot-on keresztül
        this.quill.insertText(index, '\n');
        this.quill.insertEmbed(index + 1, 'iframe', attrs);
        this.quill.insertText(index + 2, '\n');
        this.quill.setSelection(index + 3);
        const updatedContent = this.getCleanHtmlContent();
        this.$emit("update:modelValue", updatedContent);
      } else {
        // Ha nem iframe, akkor közvetlenül HTML-ként szúrjuk be
        this.quill.insertText(index, '\n');
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = this.iframeHtml.trim();
        const firstChild = tempContainer.firstElementChild;
        if (firstChild) {
          this.quill.root.insertBefore(firstChild, this.quill.root.childNodes[index + 1]);
          this.quill.setSelection(index + 2);
          const updatedContent = this.getCleanHtmlContent();
          this.$emit("update:modelValue", updatedContent);
        }
      }
      
      this.closeIframeModal();
    }
    ,
    /**
     * HTML beillesztése egységesen.
     * Üresnél töröl, különben dangerouslyPasteHTML, hogy az iframe-ek és egyéb elemek is megmaradjanak.
     */
    setHtmlContent(html) {
      if (!this.quill) return;
      const trimmed = (html || "").trim();
      if (!trimmed) {
        this.quill.setContents([]);
        return;
      }
      // Quill 2: megőrzi a custom blotokat (iframe), nem escape-eli.
      this.quill.clipboard.dangerouslyPasteHTML(trimmed);
    }
  },
};

export default HtmlEditor;
</script>


<style lang="scss">
.vu-admin {
  [data-bs-theme="light"] {
    .ql-editor-container {
      color: var(--bs-dark) !important;
    }
    .ql-container .ql-snow {
      color: var(--bs-dark) !important;
    }
    .ql-editor {
      color: var(--bs-dark) !important;
    }
  }

  [data-bs-theme="dark"] {
    .ql-editor-container {
      color: var(--bs-light) !important;
    }
    .ql-container .ql-snow {
      color: var(--bs-light) !important;
    }
    .ql-editor {
      color: var(--bs-light) !important;
    }
  }

  // Iframe stílusok
  .ql-editor {
    .ql-iframe {
      display: block;
      margin: 1rem 0;
      border: none;
      max-width: 100%;
      height: auto;
    }
  }

  // HTML modal stílusok
  .html-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
  }

  .html-modal-content {
    background: var(--bs-body-bg);
    border-radius: 0.375rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  .html-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--bs-border-color);
    
    h5 {
      margin: 0;
    }
  }

  .html-modal-body {
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
  }

  .html-textarea {
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    width: 100%;
    resize: vertical;
  }

  .html-modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid var(--bs-border-color);
  }
}
</style>