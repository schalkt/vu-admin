<template>
  <div class="">
    <div class="vsa-upload" :class="{ wait: wait }">

      <div v-cloak v-if="editfile && editfile.presets" class="vsa-image-editor p-2 text-center">
        <div class="row">
          <div class="col-md-3" v-for="(type, index) in editfile.types" :key="index">
            <span class="badge bg-dark text-light fw-light mx-1 text-uppercase">{{ type.extension }}</span>
            <span class="badge bg-dark text-light fw-light mx-1">{{ type.width }} x {{ type.height }}</span>
            <span class="badge bg-dark text-light fw-light mx-1">~{{ roundFileSize(type.bytes) }}</span>

            <img v-cloak v-if="type" class="img-thumbnail rounded" :src="type.url ? type.url : type.data" />
          </div>
        </div>

        <input type="text" class="form-control form-control-sm w-100 mt-1" v-model="editfile.title" />

        <div class="row g-1">
          <div class="col-md-6">
            <button type="button" class="btn btn-sm btn-outline-danger mt-1 w-100" @click="editfile = null">
              Close
            </button>
          </div>
          <div class="col-md-6">
            <button type="button" class="btn btn-sm btn-outline-danger mt-1 w-100" @click="remove(index)">
              Remove
            </button>
          </div>
          <div class="col-md-6">
            <button v-if="type && !type.url" type="button" class="btn btn-sm btn-outline-light mt-1 w-100" @click="download(index, params)">
              Download
            </button>
            <a v-if="type && type.url" type="button" class="btn btn-sm btn-outline-light mt-1 w-100" :href="type.url">
              Download
            </a>
          </div>
        </div>
      </div>

      <div class="row g-2 mb-1" v-if="files && files.length">

        <div v-if="params.ui === 'list'">

          <table class="table table-sm table-responsive table-borderless">
            <tbody>
              <template v-for="(file, index) in files" :key="index">
                <tr>
                  <td class="align-middle px-0">

                    <div class="input-group border">

                      <span class="d-block p-1 px-2">
                        {{ index + 1 }}
                      </span>

                      <span class="cursor-pointer p-1 border-start border-end h-100" @click="arrayItemMoveDown(files, index)">
                        <i class="bi bi-arrow-up" :class="{ 'opacity-25': index < 1 }"></i>
                      </span>
                      <span class="cursor-pointer p-1 border-start border-end h-100" @click="arrayItemMoveUp(files, index + 1)">
                        <i class="bi bi-arrow-down" :class="{ 'opacity-25': index >= files.length - 1 }"></i>
                      </span>

                      <span class="fs-5 mx-2" v-if="file.isDocument">
                        <i :class="['bi bi-filetype-' + file.types.default.extension]"></i>
                      </span>

                      <span class="fs-5 mx-2" v-else-if="file.isImage">
                        <i class="bi bi-file-image"></i>
                      </span>

                      <span class="fs-5 mx-2" v-else-if="file.isVideo">
                        <i class="bi bi-file-play"></i>
                      </span>

                      <input required="text" class="form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light" v-model="file.title" @input="slug(file)"
                        @keydown.enter.prevent />

                      <span v-if="!file.isDocument && file.types && file.types[params.thumbnail]" class="mx-0">

                        <a v-if="file.types.default.url" target="_blank" :href="file.types.default.url">
                          <img height="32" width="auto" class="transparent-background" :src="file.types[params.thumbnail].url" :alt="file.name" />
                        </a>

                        <img v-else height="32" width="auto" class="transparent-background" :src="file.types[params.thumbnail].data" :alt="file.name" />

                      </span>

                      <div class="dropdown rounded-bottom" v-if="params.tags">
                        <button class="btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100" type="button" data-bs-auto-close="outside"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="bi bi-tag"></i>
                          {{ file.tags ? file.tags.length : 0 }}
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <span v-for="tag in params.tags" :key="tag" class="dropdown-item cursor-pointer" @click="dropdownSelectToggleOne(file.tags, tag.value)">
                              <i v-if="(file.tags && file.tags.indexOf(tag.value) >= 0)" class="bi bi-check-square"></i>
                              <i v-else class="bi bi-square"></i>
                              {{ translate(tag.label ? tag.label : tag.value) }}
                            </span>
                          </li>
                          <li>
                            <hr class="dropdown-divider">
                          </li>
                          <li>
                            <span class="dropdown-item cursor-pointer" @click="dropdownSelectAll(file.tags, params.tags)">
                              {{ translate('Select all') }}
                            </span>
                          </li>
                          <li>
                            <span class="dropdown-item cursor-pointer" @click="dropdownSelectClear(file.tags)">
                              {{ translate('Unselect all') }}
                            </span>
                          </li>
                          <li>
                            <span class="dropdown-item cursor-pointer" @click="dropdownSelectInvert(file.tags, params.tags)">
                              {{ translate('Invert all') }}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div class="dropdown">
                        <button class="btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100" type="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <i class="bi bi-list"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li class="p-2">
                            <small class="fw-light">
                              <VuAdminFileUploadInfo :file="file"></VuAdminFileUploadInfo>
                            </small>
                          </li>
                        </ul>

                      </div>

                      <button class="btn btn-sm btn-outline-danger border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 px-2" @click="remove(index)"
                        type="button">
                        <i class="bi bi-x-circle"></i>
                      </button>

                    </div>

                  </td>
                </tr>

              </template>
            </tbody>
          </table>

        </div>

        <div v-else :class="[params.colclass ? params.colclass : 'col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3']" v-for="(file, index) in files" :key="index">

          <div class="vsa-image-container h-100 position-relative">

            <div v-if="file.loaded" class="w-100 h-100 d-flex align-items-center flex-column">

              <div v-if="0" class="vsa-image-info position-absolute start-0 bottom-0 end-0 p-2 text-center">

                <span v-if="file.resized" class="badge bg-warning text-dark m-1">resized</span>

                <div class="" v-for="(type, index) in file.types" :key="index">
                  <span class="badge bg-dark text-light fw-light mx-1 text-uppercase">{{ type.extension }}</span>
                  <span class="badge bg-dark text-light fw-light mx-1">{{ type.width }} x {{ type.height }}</span>
                  <span class="badge bg-dark text-light fw-light mx-1">~{{ roundFileSize(type.bytes) }}</span>
                </div>

                <strong class="bg-dark text-light rounded p-0 px-2 mb-1">#{{ index + 1 }}</strong>

                <div class="text-center mt-2">
                  <button title="Delete the image" type="button" class="btn btn-sm btn-outline-danger mx-1 d-inline-block" @click="remove(index)">
                    <i class="bi bi-trash"></i>
                  </button>

                  <button title="Download the image" v-if="file && file.types && file.uploaded" type="button" class="btn btn-sm btn-outline-light mx-1"
                    @click="download(index, params)">
                    <i class="bi bi-download"></i>
                  </button>

                  <a title="Open in new tab" v-if="file && file.types && file.uploaded" class="btn btn-sm btn-outline-light mx-1" target="_blank" :href="file.types[params.download].url
                    ? file.types[params.download].url
                    : file.types[params.download].data
                    ">
                    <i class="bi bi-box-arrow-up-right"></i>
                  </a>

                  <button v-if="file.video && !file.uploaded" type="button" class="btn btn-sm btn-outline-warning mx-1" @click="seekRandom(file)">
                    Seek
                  </button>

                  <button v-if="params.editor" type="button" class="btn btn-sm btn-outline-warning mx-1" @click="editfile = file">
                    <i v-if="file.video" class="bi bi-film"></i>
                    <i v-else class="bi bi-image"></i>
                  </button>
                </div>

                <div class="text-light fw-light text-nowrap">
                  {{ file.title }}
                </div>
              </div>

              <div v-if="file.types && file.types[params.thumbnail]"
                class="vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center">

                <a v-if="file.types.default.url" target="_blank" :href="file.types.default.url">
                  <img class="img-fluid transparent-background" :src="file.types[params.thumbnail].url" :alt="file.name" />
                </a>

                <img v-else class="img-fluid transparent-background" :src="file.types[params.thumbnail].data" :alt="file.name" />

              </div>

              <div class="display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center" v-if="file.isDocument">
                <i :class="['bi bi-filetype-' + file.types.default.extension]"></i>
              </div>

              <input required="text" class="form-control rounded-0 border-bottom-0 py-1 px-2 fw-light" v-model="file.title" @input="slug(file)" @keydown.enter.prevent />

              <div class="w-100 mb-2 d-flex justify-content-around align-items-center">

                <span class="p-1 px-2 border border-end-0 h-100">
                  {{ index + 1 }}
                </span>

                <span class="cursor-pointer p-1 border border-end-0 h-100" @click="arrayItemMoveDown(files, index)">
                  <i class="bi bi-arrow-up" :class="{ 'opacity-25': index < 1 }"></i>
                </span>
                <span class="cursor-pointer p-1 border border-end-0 h-100" @click="arrayItemMoveUp(files, index + 1)">
                  <i class="bi bi-arrow-down" :class="{ 'opacity-25': index >= files.length - 1 }"></i>
                </span>

                <div class="dropdown border border-end-0 h-100 w-100" v-if="params.tags">
                  <button class="btn btn-sm rounded-0 h-100 w-100" type="button" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-tag"></i>
                    {{ file.tags ? file.tags.length : 0 }}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <span v-for="tag in params.tags" :key="tag" class="dropdown-item cursor-pointer" @click="dropdownSelectToggleOne(file.tags, tag.value)">
                        <i v-if="(file.tags && file.tags.indexOf(tag.value) >= 0)" class="bi bi-check-square"></i>
                        <i v-else class="bi bi-square"></i>
                        {{ translate(tag.label ? tag.label : tag.value) }}
                      </span>
                    </li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li>
                      <span class="dropdown-item cursor-pointer" @click="dropdownSelectAll(file.tags, params.tags)">
                        {{ translate('Select all') }}
                      </span>
                    </li>
                    <li>
                      <span class="dropdown-item cursor-pointer" @click="dropdownSelectClear(file.tags)">
                        {{ translate('Unselect all') }}
                      </span>
                    </li>
                    <li>
                      <span class="dropdown-item cursor-pointer" @click="dropdownSelectInvert(file.tags, params.tags)">
                        {{ translate('Invert all') }}
                      </span>
                    </li>
                  </ul>
                </div>

                <div class="dropdown border h-100 w-100">
                  <button class="btn btn-sm rounded-0 h-100 _dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-list"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li class="p-2">
                      <small class="fw-light">
                        <VuAdminFileUploadInfo :file="file"></VuAdminFileUploadInfo>
                      </small>
                    </li>
                  </ul>

                </div>

                <button class="btn btn-outline-danger border rounded-0 border-start-0 px-2 py-1" @click="remove(index)" type="button">
                  <i class="bi bi-x-circle"></i>
                </button>

              </div>

            </div>

            <div v-else class="w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center">
              <span></span>
            </div>



          </div>
        </div>
      </div>

      <div class="row g-1">
        <div class="col-12 d-flex align-items-center justify-content-center">

          <label :for="uploadId" 
                 :class="[
                   { 'disabled bg-secondary': files && params.limit <= files.length },
                   'btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone',
                   { 'vsa-drop-zone-active': isDragging }
                 ]"
                 @dragover.prevent 
                 @dragenter.prevent 
                 @drop.prevent="handleDrop">

            <span v-if="files && params.limit > files.length">
              <i class="bi bi-upload me-2"></i> {{ params.text }}
              <small v-if="params.limit">
                ( <strong class="">{{ files.length }}</strong> / <span class="">{{ params.limit }}</span> )
              </small>
            </span>

            <span v-else class="fs-6">
              <i class="bi bi-exclamation-circle"></i> You've reached the upload limit
            </span>

          </label>

          <button type="button" class="btn btn-outline-primary ms-1" @click="toggleView()">
            <i v-if="params.ui != 'list'" class="bi bi-list-ol"></i>
            <i v-if="params.ui == 'list'" class="bi bi-grid"></i>
          </button>

          <button :disabled="!files.length" type="button" class="btn btn-outline-danger ms-1" @click="resetConfirm()">
            <i class="bi bi-trash"></i>
          </button>

        </div>

        <div class="col-12 text-center">

          <small>
            <div v-if="params.accept">
              <span class="text-secondary">accept only</span>
              <strong class="ms-1 text-muted" v-for="ext in params.accept" :key="ext">{{ ext }}</strong>
            </div>

            <div v-if="0 && params.presets">
              <div class="mt-1" v-for="(preset, index) in params.presets" :key="index">
                preset

                <span class="mx-1">
                  {{ index }}
                </span>

                <span class="mx-1">
                  {{ preset.width }} x {{ preset.height }}
                </span>

                <span class="mx-1">
                  {{ preset.extension }}
                </span>
              </div>
            </div>

          </small>

        </div>
      </div>

      <input v-cloak v-if="uploadId" multiple style="opacity: 0; height: 1px; width: 1px" :id="uploadId" type="file" :accept="getAcceptMimeTypes(params.accept)"
        @change="handleFileChange" />
    </div>
  </div>
</template>

<script>

import {
  slugify,
  translate,
  arrayToggleOne,
  arraySelectAll,
  arraySelectInvert,
  arraySelectClear,
  arrayItemMoveUp,
  arrayItemMoveDown,
  roundFileSize,
  extensionByFilename
} from "./helpers";

import VuAdminFileUploadInfo from "./VuAdminFileUploadInfo.vue";

const fileType = {
  "image": {
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "webp": "image/webp",
    "gif": "image/gif"
  },
  "video": {
    "mp4": "video/mp4",
    "webm": "video/webm",
    "ogg": "video/ogg",
    "mpeg": "video/mpeg",
    "mov": "video/quicktime"
  },
  "document": {
    "txt": "text/plain",
    "pdf": "application/pdf",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "ppt": "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "rtf": "application/rtf"
  }
};

const FileUpload = {
  props: {
    modelValue: Array,
    field: Object,
    settings: Object,
  },

  data: function () {
    return {
      files: [],
      editfile: null,
      count: 0,
      bytes: 0,
      wait: false,
      uploadEvent: null,
      isDragging: false,
    };
  },
  components: {
    VuAdminFileUploadInfo
  },
  created() {
    let uid = Math.round(Math.random() * 100000);
    this.uploadId = "image_upload_" + uid;
    this.params = this.field.params;
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

        for (let file of newValue) {
          this.setDefaults(file);
        }

        this.files = newValue;

      }
    },
  },

  methods: {

    roundFileSize(fileSize, suffix) {
      return roundFileSize(fileSize, suffix);
    },

    extensionByFilename(filename) {
      return extensionByFilename(filename);
    },

    getAcceptMimeTypes(extensions) {

      let mimeTypes = [];

      for (const category in fileType) {
        if (fileType.hasOwnProperty(category)) {
          const types = fileType[category];

          // Iterálunk a megadott kiterjesztéseken
          extensions.forEach(ext => {
            if (types[ext]) {
              mimeTypes.push(types[ext]);
            }
          });
        }
      }

      return mimeTypes.join(",");

    },


    setDefaults(file) {

      if (!file || typeof (file) != 'object') {
        return;
      }

      if (this.params && this.params.tags && !file.tags) {
        file.tags = [];
      }

    },

    detect(file) {

      this.setDefaults(file);

      file.bytes = 0;
      file.types = {
        default: {
        }
      };
      file.title = file.name.split(".").slice(0, -1).join(".");
      file.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32);
      file.slug = slugify(file.title);
      file.timestamp = Math.round(Date.now() / 1000);
      file.original = {
        bytes: file.size,
        mime: file.type,
        name: file.name,
        modified: file.lastModified,
        extension: this.extensionByFilename(file.name)
      };

      if (Object.values(fileType.video).indexOf(file.original.mime) >= 0) {
        file.isVideo = true;
      } else if (Object.values(fileType.image).indexOf(file.original.mime) >= 0) {
        file.isImage = true;
      } else if (Object.values(fileType.document).indexOf(file.original.mime) >= 0) {
        file.isDocument = true;
      } else {
        file.isUnknown = true;
      }

      if (file.isVideo || file.isImage && !this.params.presets.default) {
        this.params.presets.default = {
          width: 1920,
          height: 1920,
          extension: "webp",
          quality: 0.9
        };
      }

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

      for (let file of event.target.files) {

        this.count++;

        if (this.count <= this.params.limit) {

          this.files.push(file);
          this.detect(file);

          if (file.isVideo) {
            await this.createThumbnail(file);
          } else if (file.isImage) {
            await this.resizeImage(file);
          } else if (file.isDocument) {

            // const blob = await this.fileToBlob(file);
            const reader = new FileReader();

            reader.addEventListener("load", (e) => {

              file.types.default = {
                extension: file.original.extension,
                mime: file.original.mime,
                slug: slugify(file.title) + "-" + file.uid,
                bytes: file.size,
                data: e.target.result
              }

              file.loaded = true;
              file.bytes += file.size;
              this.bytes += file.bytes

            });

            // console.log(blob, file);

            reader.readAsDataURL(file);

          }

        }
      }

      this.$emit("update:modelValue", this.files);
      this.wait = false;

      // Important - Choosing the same file doesn't trigger onChange
      // https://github.com/ngokevin/react-file-reader-input/issues/11
      this.uploadEvent.target.value = "";
    },

    async forEachPresets(file, source, callback) {
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
      file.original.ratio = this.calculateAspectRatio(width, height);

      for (let key in this.params.presets) {

        // console.log(key, this.params.presets[key]);

        let preset = this.params.presets[key];
        preset.key = key;

        preset.width = preset.width ? preset.width : 1920;
        preset.height = preset.height ? preset.height : 1080;

        let targetWidth = preset.width;
        let targetHeight = preset.height;

        if (preset.crop === "cover") {
          // Fit mód: a kép közepéről vágunk ki részt, hogy kitöltse a célméretet
          let scale = Math.max(targetWidth / width, targetHeight / height);
          let drawWidth = width * scale;
          let drawHeight = height * scale;

          // Középről történő kivágás
          let offsetX = (drawWidth - targetWidth) / 2;
          let offsetY = (drawHeight - targetHeight) / 2;

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.drawImage(source, -offsetX, -offsetY, drawWidth, drawHeight);

        } else if (preset.crop === "contain") {
          // Contain mód: a kép illeszkedik a célterületbe, üres helyek maradhatnak
          let scale = Math.min(targetWidth / width, targetHeight / height);
          let drawWidth = width * scale;
          let drawHeight = height * scale;
          let offsetX = (targetWidth - drawWidth) / 2;
          let offsetY = (targetHeight - drawHeight) / 2;

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.clearRect(0, 0, targetWidth, targetHeight); // Töröljük az üres területeket
          ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);

        } else {
          // Nincs crop, marad az eredeti átméretezés
          if (width > targetWidth) {
            height = Math.round(height * (targetWidth / width));
            width = targetWidth;
          }

          if (height > targetHeight) {
            width = Math.round(width * (targetHeight / height));
            height = targetHeight;
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(source, 0, 0, width, height);

        }

        file.types[preset.key] = {
          width: canvas.width,
          height: canvas.height,
          ratio: this.calculateAspectRatio(canvas.width, canvas.height),
          extension: preset.extension ? preset.extension : this.getExtensionByMimeType(file.type),
          quality: preset.quality ? preset.quality : 0.9,
          crop: preset.crop ? preset.crop : null
        };

        file.types[preset.key].slug =
          slugify(file.title) +
          "-" +
          canvas.width +
          "x" +
          canvas.height +
          "-" +
          file.uid;

        file.types[preset.key].mime = this.getMimeTypeByExtension(file.types[preset.key].extension);

        file.types[preset.key].data = canvas.toDataURL(
          file.types[preset.key].mime,
          file.types[preset.key].quality
        );

        file.types[preset.key].blob = await this.getBlob(canvas, file.types[preset.key].mime, file.types[preset.key].quality);

        if (file.types[preset.key].blob) {
          file.types[preset.key].bytes = file.types[preset.key].blob.size;
        }

        if (file.types[preset.key].bytes) {
          file.bytes += file.types[preset.key].bytes;
        }

        if (callback) {
          callback(preset, file);
        }
      }
    },

    getBlob(canvas, mime, quality) {

      return new Promise((resolve, reject) => {
        canvas.toBlob(function (blob) {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert canvas to Blob"));
          }
        }, mime, quality);
      });

    },


    async resizeImage(file) {
      const blob = await this.fileToBlob(file);
      const image = await createImageBitmap(blob);

      await this.forEachPresets(file, image);

      // file.fullscreen = false;
      file.loaded = true;
      this.bytes += file.bytes;
    },

    fileToBlob(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(new Blob([event.target.result], { type: file.mime }));
        };
        reader.readAsArrayBuffer(file);
      });
    },

    slug(file) {

      // file rename currently not supported
      if (file.uploaded) {
        return;
      }

      file.slug = slugify(file.title);

      for (let key in file.types) {
        let preset = this.params.presets[key];
        file.types[key].slug = slugify(file.title) + "-" + preset.width + "x" + preset.height;
      }

      this.$forceUpdate();

    },

    arrayItemMoveUp(array, index) {
      arrayItemMoveUp(array, index);
    },

    arrayItemMoveDown(array, index) {
      arrayItemMoveDown(array, index);
    },

    download(index, params) {

      let file = this.files[index].types[params.download ? params.download : 'default'];
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

    toggleView() {
      this.params.ui = this.params.ui == 'list' ? 'grid' : 'list';
    },

    dateFormat(timestamp) {
      return (new Date(timestamp)).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    },

    getMimeTypeByExtension(extension) {

      for (const category in fileType) {
        if (fileType.hasOwnProperty(category)) {
          const types = fileType[category];
          if (types[extension]) {
            return types[extension];
          }
        }
      }

      return null; // Ha nem található a kiterjesztés

    },

    getExtensionByMimeType(mimetype) {
      for (const category in fileType) {
        if (fileType.hasOwnProperty(category)) {
          const types = fileType[category];
          for (const ext in types) {
            if (types[ext] === mimetype) {
              return ext;
            }
          }
        }
      }

      return null; // Ha nem található a MIME-típus

    },

    calculateAspectRatio(width, height) {

      function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
      }

      if (width <= 0 || height <= 0) {
        throw new Error("Width and height must be positive numbers.");
      }

      const divisor = gcd(width, height);
      const aspectWidth = width / divisor;
      const aspectHeight = height / divisor;

      // If either dimension is greater than 99, return "?"
      if (aspectWidth > 99 || aspectHeight > 99) {
        return "?";
      }

      // If the ratio simplifies to 1:1, return it explicitly
      if (aspectWidth === aspectHeight) {
        return "1:1";
      }

      // If the ratio is an integer (e.g., 2:1), return it as "N:1"
      if (aspectWidth % aspectHeight === 0) {
        return `${aspectWidth / aspectHeight}:1`;
      }

      const aspectRatio = `${aspectWidth}:${aspectHeight}`;

      // Map only fractional ratios to names
      const commonRatios = {
        "2.35:1": "2.35:1",
        "2.39:1": "2.39:1",
        "2.76:1": "2.76:1", // Ultra Panavision 70
        "1.85:1": "1.85:1",
      };

      // Match to common fractional ratios or return simplified ratio
      return commonRatios[aspectRatio] || aspectRatio;

    },

    translate(key, vars, language) {
      return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    },

    dropdownSelectToggleOne(tags, value) {
      arrayToggleOne(tags, value);
      this.$forceUpdate();
    },

    dropdownSelectAll(array, options) {
      arraySelectAll(array, options);
      this.$forceUpdate();
    },

    dropdownSelectInvert(array, options) {
      arraySelectInvert(array, options);
      this.$forceUpdate();
    },

    dropdownSelectClear(array) {

      if (typeof (array) != "object") {
        array.value = null;
      } else {
        arraySelectClear(array);
      }

      this.$forceUpdate();

    },

    handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer.files;
      this.handleFileChange({ target: { files } });
    },

  },
};

export default FileUpload;
</script>

<style lang="scss">
.vu-admin {
  .vsa-upload {

    .transparent-background {
      background:
        linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%, #cccccc),
        linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%, #cccccc);
      background-position: 0 0, 3px 3px;
      background-size: 6px 6px;
    }


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
      background: linear-gradient(0deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.9) 25%,
          rgba(0, 0, 0, 0) 100%);
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

      position: relative;
      // min-height: 120px;

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
}

[data-bs-theme="dark"] {
  .vsa-image-container {
    color: var(--bs-body-color);
  }
}

</style>