<template>
  <div>
    <table v-if="file" class="table table-sm w-100 vsa-file-info">
      <thead>
        <tr>
          <td class="text-muted">
            type
          </td>
          <td class="text-muted text-center">
            resolution
          </td>
          <td class="text-muted text-center">
            ratio
          </td>
          <td class="text-muted text-end">
            size
          </td>
          <td class="text-muted text-end">
            extension
          </td>
          <td class="text-muted">
            crop
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            original
          </td>
          <td class="text-nowrap text-center">
            {{ file.original.width }} x {{ file.original.height }}
          </td>
          <td class="text-center">
            {{ file.original.ratio }}
          </td>
          <td class="text-nowrap text-end">
            <span v-html="roundFileSize(file.original.bytes, true)"></span>
          </td>
          <td class="text-end">
            {{ file.original.extension }}
          </td>
          <td>

          </td>
        </tr>
        <template v-for="(type, preset) in file.types" :key="preset">
          <tr>
            <td>
              <span
                v-if="getTypeImageUrl(type)"
                class="vsa-file-info-preview-trigger"
                role="button"
                tabindex="0"
                @mouseenter="showPreview($event, type, preset)"
                @mousemove="movePreview($event)"
                @mouseleave="hidePreview"
                @click.prevent="openTypeImage(type)"
                @keydown.enter.prevent="openTypeImage(type)"
              >{{ preset }}</span>
              <template v-else>{{ preset }}</template>
            </td>
            <td class="text-nowrap text-center">
              {{ type.width }} x {{ type.height }}
            </td>
            <td class="text-center">
              {{ type.ratio }}
            </td>
            <td class="text-end">
              <span class="text-nowrap" :class="{ 'text-danger': type.bytes > file.original.bytes }" v-html="roundFileSize(type.bytes, true)"></span>
            </td>
            <td class="text-end">
              {{ type.extension }}
            </td>
            <td>
              <small class="fw-normal bg-light text-dark p-0 px-1 shadow-sm" v-if="type.crop">{{ type.crop }}</small>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            {{ file.uploaded ? 'uploaded' : 'uploading' }}
          </td>
          <td class="text-end">
            <span class="text-nowrap" v-html="roundFileSize(file.bytes, true)"></span>
          </td>
          <td colspan="2">

          </td>
        </tr>
      </tfoot>
    </table>

    <small class="d-flex justify-content-between text-nowrap">
      <span class="text-muted fw-light me-3">original filename</span> {{ file.original.name }}
    </small>

    <small class="d-flex justify-content-between  text-nowrap">
      <span class="text-muted fw-light me-3">{{ file.uploaded ? 'uploaded' : 'uploading' }} filename</span> <span>{{ file.slug }}</span>
    </small>

    <small v-if="file.uploaded" class="d-flex justify-content-between">
      <span class="text-muted fw-light me-3">uploaded at</span> <span>{{ dateFormat(file.timestamp * 1000) }}</span>
    </small>

    <Teleport to="body">
      <div
        v-if="preview.src"
        class="vsa-file-info-preview"
        :style="{ left: preview.x + 'px', top: preview.y + 'px' }"
      >
        <img :src="preview.src" :alt="preview.label" />
        <small v-if="preview.label" class="d-block text-center text-muted mt-1">{{ preview.label }}</small>
      </div>
    </Teleport>
  </div>
</template>

<script>

const FileUploadInfo = {

  props: {
    file: Object,
  },

  data() {
    return {
      preview: { src: null, label: '', x: 0, y: 0 },
      objectUrl: null,
    };
  },

  beforeUnmount() {
    this.revokeObjectUrl();
  },

  methods: {

    roundFileSize(fileSize, suffix) {

      const KB = 1024;
      const MB = KB * 1024;
      const GB = MB * 1024;

      if (fileSize < KB) {
        return fileSize + (suffix ? " Byte" : '');
      } else if (fileSize < MB) {
        return (fileSize / KB).toFixed(0) + (suffix ? '<span class="text-muted fw-light"> KB</span>' : '');
      } else if (fileSize < GB) {
        return (fileSize / MB).toFixed(2) + (suffix ? '<span class="text-muted fw-light"> MB</span>' : '');
      } else {
        return (fileSize / GB).toFixed(2) + (suffix ? '<span class="text-muted fw-light"> GB</span>' : '');
      }
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

    getTypeImageUrl(type) {
      if (!type) return null;
      return type.url || type.data || null;
    },

    showPreview(event, type, preset) {
      const src = this.getTypeImageUrl(type);
      if (!src) return;
      this.preview = {
        src,
        label: preset,
        x: event.clientX + 16,
        y: event.clientY + 16,
      };
    },

    movePreview(event) {
      if (!this.preview.src) return;
      this.preview.x = event.clientX + 16;
      this.preview.y = event.clientY + 16;
    },

    hidePreview() {
      this.preview.src = null;
      this.preview.label = '';
    },

    revokeObjectUrl() {
      if (this.objectUrl) {
        URL.revokeObjectURL(this.objectUrl);
        this.objectUrl = null;
      }
    },

    openTypeImage(type) {
      if (!type) return;

      if (type.url) {
        window.open(type.url, '_blank', 'noopener,noreferrer');
        return;
      }

      if (type.data) {
        const w = window.open('', '_blank', 'noopener,noreferrer');
        if (w) {
          w.document.write(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Preview</title></head><body style="margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh">'
            + '<img src="' + type.data.replace(/"/g, '&quot;') + '" style="max-width:100%;max-height:100vh;height:auto" alt="">'
            + '</body></html>'
          );
          w.document.close();
        }
        return;
      }

      if (type.blob) {
        this.revokeObjectUrl();
        this.objectUrl = URL.createObjectURL(type.blob);
        window.open(this.objectUrl, '_blank', 'noopener,noreferrer');
      }
    },

  }
}
export default FileUploadInfo;

</script>

<style lang="scss">
.vu-admin {
  .vsa-upload {

    .vsa-file-info {

      td {
        padding: 1px 8px;
      }

      .vsa-file-info-preview-trigger {
        color: var(--bs-link-color);
        text-decoration: underline;
        cursor: pointer;
      }

    }

  }
}

.vsa-file-info-preview {
  position: fixed;
  z-index: 1080;
  max-width: min(420px, 90vw);
  padding: 0.5rem;
  background: var(--bs-body-bg, #fff);
  border: 1px solid var(--bs-border-color, #dee2e6);
  border-radius: var(--bs-border-radius, 0.375rem);
  box-shadow: var(--bs-box-shadow, 0 0.5rem 1rem rgba(0, 0, 0, 0.15));
  pointer-events: none;

  img {
    display: block;
    max-width: 100%;
    max-height: 70vh;
    height: auto;
    width: auto;
  }
}
</style>
