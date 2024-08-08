<template>
  <div class="">
    <div class="vsa-upload" :class="{ wait: wait }">
      <div
        v-cloak
        v-if="editfile && editfile.presets"
        class="vsa-image-editor p-2 text-center text-light"
      >
        <div class="row">
          <div
            class="col-md-3"
            v-for="(type, index) in editfile.types"
            :key="index"
          >
            <span class="badge bg-dark text-light fw-light mx-1 text-uppercase"
              >${ type.convert.replace(/.*\//, '') }</span
            >
            <span class="badge bg-dark text-light fw-light mx-1"
              >${ type.width } x ${ type.height }</span
            >
            <span class="badge bg-dark text-light fw-light mx-1"
              >~${ this.round(type.bytes) }</span
            >

            <img
              v-cloak
              v-if="type"
              class="img-thumbnail rounded"
              :src="type.url ? type.url : type.data"
            />
          </div>
        </div>

        <input
          type="text"
          class="form-control form-control-sm w-100 mt-1"
          v-model="editfile.title"
          @change="slug(index)"
        />

        <div class="row g-1">
          <div class="col-md-6">
            <button
              type="button"
              class="btn btn-sm btn-outline-danger mt-1 w-100"
              @click="editfile = null"
            >
              Close
            </button>
          </div>
          <div class="col-md-6">
            <button
              type="button"
              class="btn btn-sm btn-outline-danger mt-1 w-100"
              @click="remove(index)"
            >
              Remove
            </button>
          </div>
          <div class="col-md-6">
            <button
              v-if="type && !type.url"
              type="button"
              class="btn btn-sm btn-outline-light mt-1 w-100"
              @click="download(index, params)"
            >
              Download
            </button>
            <a
              v-if="type && type.url"
              type="button"
              class="btn btn-sm btn-outline-light mt-1 w-100"
              :href="type.url"
            >
              Download
            </a>
          </div>
        </div>
      </div>

      <div class="row g-1" v-if="files && files.length">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
          v-for="(file, index) in files"
          :key="index"
        >
          <div
            class="vsa-image-container border border-secondary rounded p-2 h-100 position-relative"
          >
            <div
              v-if="file.types && file.types[params.thumbnail]"
              class="w-100 h-100 d-flex align-items-center"
            >
              <div
                class="vsa-image-info position-absolute start-0 bottom-0 end-0 p-2 text-center text-light"
              >
                {#
                <span v-if="file.resized" class="badge bg-warning text-dark m-1"
                  >resized</span
                >
                #} {#
                <div class="" v-for="(type, index) in file.types" :key="index">
                  <span
                    class="badge bg-dark text-light fw-light mx-1 text-uppercase"
                    >${ type.convert.replace('image/', '') }</span
                  >
                  <span class="badge bg-dark text-light fw-light mx-1"
                    >${ type.width } x ${ type.height }</span
                  >
                  <span class="badge bg-dark text-light fw-light mx-1"
                    >~${ this.round(type.bytes) }</span
                  >
                </div>
                #}

                <strong class="bg-dark text-light rounded p-0 px-2 mb-1"
                  >#${ index + 1 }</strong
                >

                <div class="text-center mt-2">
                  <button
                    title="Delete the image"
                    type="button"
                    class="btn btn-sm btn-outline-danger mx-1 d-inline-block"
                    @click="remove(index)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>

                  <button
                    title="Download the image"
                    v-if="file && file.types && file.uploaded"
                    type="button"
                    class="btn btn-sm btn-outline-light mx-1"
                    @click="download(index, params)"
                  >
                    <i class="bi bi-download"></i>
                  </button>

                  <a
                    title="Open in new tab"
                    v-if="file && file.types && file.uploaded"
                    class="btn btn-sm btn-outline-light mx-1"
                    target="_blank"
                    :href="
                      file.types[params.download].url
                        ? file.types[params.download].url
                        : file.types[params.download].data
                    "
                  >
                    <i class="bi bi-box-arrow-up-right"></i>
                  </a>

                  <button
                    v-if="file.video && !file.uploaded"
                    type="button"
                    class="btn btn-sm btn-outline-warning mx-1"
                    @click="seekRandom(file)"
                  >
                    Seek
                  </button>

                  <button
                    v-if="params.editor"
                    type="button"
                    class="btn btn-sm btn-outline-warning mx-1"
                    @click="editfile = file"
                  >
                    <i v-if="file.video" class="bi bi-film"></i>
                    <i v-else class="bi bi-image"></i>
                  </button>
                </div>

                <div class="text-light fw-light text-nowrap">
                  ${ file.title }
                </div>
              </div>

              <div class="vsa-image-frame w-100 text-center">
                <img
                  class="img-fluid rounded"
                  :src="
                    file.types[params.thumbnail].url
                      ? file.types[params.thumbnail].url
                      : file.types[params.thumbnail].data
                  "
                  :alt="file.name"
                />
              </div>
            </div>

            <div
              v-else
              class="w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
            >
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-1">
        <div class="col-12">
          <div class="border border-secondary rounded p-2 h-100">
            <label
              :for="uploadId"
              :class="{ disabled: files && params.limit <= files.length }"
              class="btn btn-dark cursor-pointer h-100 w-100 d-flex align-items-center justify-content-center"
            >
              <span>
                <span class="display-3 d-block">+</span>

                <small class="fw-light">
                  <div class="fs-4" v-if="files && params.limit > files.length">
                    ${ params.text }
                  </div>

                  <div v-else class="fs-6 text-warning">
                    You have reached the number of files you can upload
                  </div>
                </small>
              </span>
            </label>
          </div>
        </div>

        <div class="col-12">
          <div class="border border-secondary rounded p-2 h-100">
            <div
              class="text-center h-100 w-100 d-flex align-items-center justify-content-center"
            >
              <small class="fw-light">
                <div class="mt-1" v-if="params.limit">
                  uploaded
                  <span
                    class="badge bg-dark border border-secondary text-info mx-1"
                    >${ files.length }</span
                  >
                  /
                  <span
                    class="badge bg-dark border border-secondary text-info mx-1"
                    >${ params.limit }</span
                  >
                  <span
                    v-if="this.bytes"
                    class="badge bg-dark border border-secondary text-info mx-1"
                    >~${ this.round(this.bytes) }</span
                  >
                </div>
                <div class="mt-1" v-if="params.accept">
                  accept only
                  <span
                    class="badge bg-dark border border-secondary text-info mx-1"
                    v-for="ext in params.accept"
                    :key="ext"
                    >${ ext.replace(/.*\//,'') }
                  </span>
                </div>
                <div v-if="params.presets">
                  <div
                    class="mt-1"
                    v-for="(preset, index) in params.presets"
                    :key="index"
                  >
                    preset

                    <span
                      class="badge bg-dark border border-secondary text-info mx-1"
                    >
                      ${ index }
                    </span>

                    <span
                      class="badge bg-dark border border-secondary text-info mx-1"
                    >
                      ${ preset.width } x ${preset.height }
                    </span>

                    <span
                      class="badge bg-dark border border-secondary text-info mx-1"
                    >
                      ${ preset.convert.replace(/.*\//,'') }
                    </span>
                  </div>
                </div>

                <button
                  v-if="files.length"
                  type="button"
                  class="btn btn-sm btn-danger mt-2 p-0 px-3"
                  @click="resetConfirm"
                >
                  remove all images
                </button>
              </small>
            </div>
          </div>
        </div>
      </div>

      <input
        v-cloak
        v-if="uploadId"
        multiple
        style="opacity: 0; height: 1px; width: 1px"
        :id="uploadId"
        type="file"
        :accept="params.accept.join(',')"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script>
const ImageUpload = {
  props: {
    modelValue: Array,
    params: Object,
  },

  data: function () {
    return {
      files: [],
      editfile: null,
      count: 0,
      bytes: 0,
      wait: false,
      uploadEvent: null,
    };
  },
  created() {
    let uid = Math.round(Math.random() * 100000);

    this.uploadId = "image_upload_" + uid;
  },
  mounted() {
    this.editfile = this.modelValue;

    if (!this.editfile) {
      this.editfile = [];
    }
  },
  watch: {
    modelValue(newValue) {
      if (newValue === undefined || newValue === null) {
        this.reset();
      } else {
        this.files = newValue;
      }
    },
  },

  methods: {
    round(fileSize) {
      const KB = 1024;
      const MB = KB * 1024;
      const GB = MB * 1024;

      if (fileSize < KB) {
        return fileSize + " Byte";
      } else if (fileSize < MB) {
        return (fileSize / KB).toFixed(0) + " KB";
      } else if (fileSize < GB) {
        return (fileSize / MB).toFixed(2) + " MB";
      } else {
        return (fileSize / GB).toFixed(2) + " GB";
      }
    },

    extension(filename) {
      return filename.split(".").reverse()[0];
    },

    detect(file) {
      file.bytes = 0;
      file.types = {};
      file.title = file.name.split(".").slice(0, -1).join(".");
      file.original = {
        size: file.size,
        type: file.type,
        modified: file.lastModified,
        name: file.name,
      };
    },

    async createThumbnail(file, index) {
      const video = document.createElement("video");
      const reader = new FileReader();

      // reader.onprogress = (e) => {

      // 	console.log(e);
      // 	file.percentLoaded = Math.round((e.loaded / e.total) * 100);
      // 	console.log(file.percentLoaded);
      // }

      reader.onload = (e) => {
        video.src = e.target.result;
        video.addEventListener("loadeddata", () => {
          video.currentTime = video.duration * Math.random();
          file.video = video;
        });

        video.addEventListener("seeked", () => {
          this.forEachPresets(file, video);
          file.loaded = true;
          this.bytes += file.bytes;
        });
      };

      reader.readAsDataURL(file);
    },

    seekRandom(file) {
      if (!file.video) {
        return;
      }

      file.video.currentTime = file.video.duration * Math.random();
    },

    async handleFileChange(event) {
      this.uploadEvent = event;
      this.count = this.files ? this.files.length : 0;
      this.wait = true;

      let videoTypes = ["video/mpeg", "video/mp4"];

      for (let file of event.target.files) {
        this.count++;

        if (this.count <= this.params.limit) {
          this.files.push(file);
          this.detect(file);

          if (videoTypes.indexOf(file.type) >= 0) {
            await this.createThumbnail(file);
          } else {
            await this.resizeImage(file);
          }
        }
      }

      this.$emit("update:modelValue", this.files);
      this.wait = false;

      // Important - Choosing the same file doesn't trigger onChange
      // https://github.com/ngokevin/react-file-reader-input/issues/11
      this.uploadEvent.target.value = "";
    },

    forEachPresets(file, source, callback) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let isVideo = source.videoWidth ? true : false;
      let width, height;

      if (isVideo) {
        width = source.videoWidth;
        height = source.videoHeight;
      } else {
        width = source.width;
        height = source.height;
      }

      file.original.width = width;
      file.original.height = height;
      file.uid =
        Math.round(Math.random() * 9999999).toString(32) +
        Date.now().toString(32);

      for (let key in this.params.presets) {
        let preset = this.params.presets[key];
        preset.key = key;

        if (width > preset.width) {
          height = Math.round(height * (preset.width / width));
          width = preset.width;
        }

        if (height > preset.height) {
          width = Math.round(width * (preset.height / height));
          height = preset.height;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(source, 0, 0, width, height);

        file.types[preset.key] = {
          width: width,
          height: height,
          convert: preset.convert ? preset.convert : file.type,
          quality: preset.quality ? preset.quality : 0.75,
        };

        file.types[preset.key].slug =
          file.title.slugify() +
          "-" +
          preset.width +
          "x" +
          preset.height +
          "-" +
          file.uid;
        file.types[preset.key].data = canvas.toDataURL(
          file.types[preset.key].convert,
          file.types[preset.key].quality
        );
        file.types[preset.key].extension = this.getExtension(
          file.types[preset.key].convert
        );
        file.types[preset.key].bytes = Math.round(
          file.types[preset.key].data.length / 1.31
        );

        file.bytes += file.types[preset.key].bytes;

        if (callback) {
          callback(preset, file);
        }
      }
    },

    async resizeImage(file) {
      const blob = await this.fileToBlob(file);
      const image = await createImageBitmap(blob);

      this.forEachPresets(file, image);

      // file.fullscreen = false;
      file.loaded = true;
      this.bytes += file.bytes;
    },

    fileToBlob(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(new Blob([event.target.result], { type: file.type }));
        };
        reader.readAsArrayBuffer(file);
      });
    },

    slug(index) {
      let file = this.files[index];

      for (let key in file.types) {
        let type = file.types[key];
        let preset = this.params.presets[key];

        type.slug =
          file.title.slugify + "-" + preset.width + "x" + preset.height;
      }
    },

    download(index, params) {
      let file = this.files[index].types[params.download];
      let link = document.createElement("a");

      link.href = file.url;

      link.download = file.slug + "." + file.extension;
      link.click();
    },

    remove(index) {
      if (confirm("Are you sure you want to remove?")) {
        this.bytes -= this.files[index].bytes;
        this.files.splice(index, 1);
        this.count = this.files.length;
      }
    },

    resetConfirm() {
      if (confirm("Are you sure you want to remove all?")) {
        this.reset();
      }
    },

    reset() {
      this.files = [];
      this.editfile = {};
      this.count = 0;
      this.bytes = 0;
      this.wait = false;
      // this.uploadEvent = null;
      this.$emit("update:modelValue", this.files);
    },

    // fullscreen(file) {
    // 	file.fullscreen = !file.fullscreen;
    // 	console.log(file.fullscreen);
    // },

    getExtension(mime) {
      let map = {
        "image/webp": "webp",
        "image/jpeg": "jpg",
        "image/png": "png",
      };

      return map[mime];
    },
  },
};

export default ImageUpload;
</script>

<style lang="scss" scoped>
.vsa-upload {
  position: relative;

  @keyframes vsa-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .vsa-image-editor {
    opacity: 1;
    position: fixed;
    top: 5%;
    right: 5%;
    bottom: 5%;
    left: 5%;
    // transition: all 0.21s;
    // transform: translateY(20px);
    z-index: 500;
    background-color: #212121;
  }

  .vsa-image-info {
    opacity: 0;
    overflow: hidden;
    transition: all 0.21s;
    transform: translateY(20px);
    z-index: 50;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.9) 25%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .vsa-image-loading span {
    width: 50px;
    height: 50px;
    border: 2px solid rgba(0, 0, 0, 0.21);
    border-left-color: #777;
    border-radius: 50%;
    animation: vsa-spin 1s linear infinite;
  }

  .vsa-image-container {
    perspective: 1000px;
    position: relative;
    min-height: 120px;

    .vsa-image-frame.fullscreen {
      position: fixed !important;
      top: 2%;
      right: 2%;
      bottom: 2%;
      left: 2%;
      z-index: 99999;
    }

    img {
      z-index: 100;
      background-color: black;
    }

    &:hover {
      .vsa-image-info {
        opacity: 1;
        transform: translateY(0px);
        overflow: hidden;
        z-index: 100;
      }

      img {
        opacity: 0.99;
        // filter: grayscale(0.21);
        transition: all 0.21s;
        z-index: 50;
      }
    }
  }
}

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