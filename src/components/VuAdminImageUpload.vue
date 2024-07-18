<script>
const ImageUpload = {  
  props: ["params", "modelValue"],
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
    // console.log(this.files, this.modelValue, this.params);
    // if (!this.modelValue) {
    // 	this.modelValue = [];
    // }
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

export { ImageUpload };
</script>