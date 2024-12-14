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
        <template v-for="(type, preset) in file.types" :key="type">
          <tr>
            <td>
              {{ preset }}
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

  </div>
</template>

<script>

const FileUploadInfo = {

  props: {
    file: Object,
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

    }

  }
}
</style>