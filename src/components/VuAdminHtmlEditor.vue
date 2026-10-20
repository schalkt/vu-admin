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
      <div class="btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          {{ textColorDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !editor.isActive('textColor') }" @click="setTextColorMark(null)">{{ translate('Default') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="v in textColorVariants" :key="'tc-' + v">
            <button
              type="button"
              class="dropdown-item"
              :class="{ active: editor.isActive('textColor', { variant: v }) }"
              @click="setTextColorMark(v)"
            >
              text-{{ v }}
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
          {{ bgColorDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !editor.isActive('backgroundColor') }" @click="setBackgroundColorMark(null)">{{ translate('Default') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="v in bgVariants" :key="'bg-' + v">
            <button
              type="button"
              class="dropdown-item"
              :class="{ active: editor.isActive('backgroundColor', { variant: v }) }"
              @click="setBackgroundColorMark(v)"
            >
              bg-{{ v }}
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
          {{ marginDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !blockMarginActive }" @click="setBlockMarginCls('')">{{ translate('Default') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="m in marginClasses" :key="'mg-' + (m || 'none')">
            <button v-if="m" type="button" class="dropdown-item font-monospace small" :class="{ active: blockMarginIs(m) }" @click="setBlockMarginCls(m)">{{ m }}</button>
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
          {{ paddingDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !blockPaddingActive }" @click="setBlockPaddingCls('')">{{ translate('Default') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="p in paddingClasses" :key="'pd-' + (p || 'none')">
            <button v-if="p" type="button" class="dropdown-item font-monospace small" :class="{ active: blockPaddingIs(p) }" @click="setBlockPaddingCls(p)">{{ p }}</button>
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
          {{ floatDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !blockFloatActive }" @click="setBlockFloatCls('')">{{ translate('Default') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="f in floatClasses" :key="'fl-' + f">
            <button
              type="button"
              class="dropdown-item font-monospace small"
              :class="{ active: blockFloatIs(f) }"
              @click="setBlockFloatCls(f)"
            >
              {{ f }}
            </button>
          </li>
        </ul>
      </div>
      <div v-if="editor.isActive('blockquote')" class="btn-group btn-group-sm">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          {{ alertVariantDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="av in alertVariants" :key="'al-' + av">
            <button
              type="button"
              class="dropdown-item"
              :class="{ active: editor.isActive('blockquote', { variant: av }) }"
              @click="setAlertVariant(av)"
            >
              alert-{{ av }}
            </button>
          </li>
        </ul>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="translate('Link')" @click="toggleLink">🔗</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="translate('Remove link')" @click="editor.chain().focus().unsetLink().run()">✕</button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
          :disabled="!editor.isActive('link')"
        >
          {{ linkStyleDropdownLabel }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button type="button" class="dropdown-item" :class="{ active: !linkHasButtonClass }" @click="setLinkButtonClass(null)">{{ translate('Default') }}</button>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <button type="button" class="dropdown-item font-monospace small" :class="{ active: linkClassIs('btn btn-primary btn-sm') }" @click="setLinkButtonClass('btn btn-primary btn-sm')">btn-primary</button>
          </li>
          <li>
            <button type="button" class="dropdown-item font-monospace small" :class="{ active: linkClassIs('btn btn-outline-primary btn-sm') }" @click="setLinkButtonClass('btn btn-outline-primary btn-sm')">btn-outline-primary</button>
          </li>
          <li>
            <button type="button" class="dropdown-item font-monospace small" :class="{ active: linkClassIs('btn btn-secondary btn-sm') }" @click="setLinkButtonClass('btn btn-secondary btn-sm')">btn-secondary</button>
          </li>
          <li>
            <button type="button" class="dropdown-item font-monospace small" :class="{ active: linkClassIs('btn btn-outline-secondary btn-sm') }" @click="setLinkButtonClass('btn btn-outline-secondary btn-sm')">btn-outline-secondary</button>
          </li>
          <li>
            <button type="button" class="dropdown-item font-monospace small" :class="{ active: linkClassIs('btn btn-danger btn-sm') }" @click="setLinkButtonClass('btn btn-danger btn-sm')">btn-danger</button>
          </li>
        </ul>
      </div>
      <span class="btn-group btn-group-sm">
        <button type="button" class="btn btn-sm btn-outline-secondary" :title="selectedImagePos !== null ? translate('Edit image') : translate('Insert image')" @click="openImageModalFromToolbar">🖼</button>
        <button v-if="videoEnabled" type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: selectedVideoPos !== null }" :title="selectedVideoPos !== null ? translate('Edit video') : translate('Insert video')" @click="openVideoModalFromToolbar">▶</button>
      </span>
      <span v-if="customToolbarButtons.length" class="btn-group btn-group-sm">
        <button
          v-for="(b, i) in customToolbarButtons"
          :key="'ctb-' + i"
          type="button"
          class="btn btn-sm btn-outline-secondary"
          :class="[b.class, { active: typeof b.isActive === 'function' && b.isActive(editor) }]"
          :title="b.title ? translate(b.title) : null"
          @click="runCustomToolbarButton(b)"
          v-html="b.label"
        ></button>
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
            <div class="col-12 mt-2">
              <label class="form-label small text-secondary mb-1">{{ translate('Image Bootstrap classes') }}</label>
              <div class="d-flex flex-wrap gap-2 align-items-center">
                <div v-for="ic in imgUtilityClasses" :key="'imgc-' + ic" class="form-check form-check-inline mb-0">
                  <input
                    :id="'tiptap-imgcls-' + ic"
                    class="form-check-input"
                    type="checkbox"
                    :checked="imageHasUtilityClass(ic)"
                    @change="toggleImageUtilityClass(ic)"
                  />
                  <label class="form-check-label small font-monospace" :for="'tiptap-imgcls-' + ic">{{ ic }}</label>
                </div>
              </div>
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

    <div v-if="videoModalOpen" class="tiptap-modal-overlay" @click.self="closeVideoModal">
      <div class="tiptap-modal-content" @click.stop>
        <div class="tiptap-modal-header">
          <h5 class="mb-0">{{ videoModalMode === 'edit' ? translate('Edit video') : translate('Insert video') }}</h5>
          <button type="button" class="btn-close" :aria-label="translate('Close')" @click="closeVideoModal"></button>
        </div>
        <div class="tiptap-modal-body">
          <label class="form-label small text-secondary mb-0">{{ translate('Video URL or embed code') }}</label>
          <textarea
            ref="videoUrlInput"
            v-model="videoForm.url"
            class="form-control form-control-sm font-monospace"
            rows="2"
            spellcheck="false"
            placeholder="https://www.youtube.com/watch?v=… / https://vimeo.com/… / https://www.facebook.com/…/videos/…"
            @keydown.enter.exact.prevent="confirmVideoModal"
          ></textarea>
          <div class="form-text">{{ translate('Supported: YouTube, Vimeo, Facebook') }}</div>
          <div v-if="videoForm.url.trim() && !videoResolvedSrc" class="text-danger small mt-1">
            {{ translate('Unsupported or untrusted video URL.') }}
          </div>

          <div class="row g-2 mt-1">
            <div class="col-12 col-md-4">
              <label class="form-label small text-secondary mb-0">{{ translate('Aspect ratio') }}</label>
              <select v-model="videoForm.ratio" class="form-select form-select-sm">
                <option value="auto">{{ translate('Auto') }}{{ videoForm.ratio === 'auto' && videoForm.url.trim() ? ' (' + videoRatioLabel(videoEffectiveRatio) + ')' : '' }}</option>
                <optgroup v-for="g in videoRatioGroups" :key="'vrg-' + g.orientation" :label="translate(g.label)">
                  <option v-for="r in g.options" :key="'vr-' + r.value" :value="r.value">{{ videoRatioLabel(r.value) }}</option>
                </optgroup>
                <option value="">{{ translate('Fixed size (no ratio)') }}</option>
              </select>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label small text-secondary mb-0">{{ videoEffectiveRatio ? translate('Max. width') : translate('Width') }}</label>
              <div class="input-group input-group-sm">
                <input v-model="videoForm.width" type="number" min="1" step="any" class="form-control" :placeholder="translate('auto')" />
                <select v-model="videoForm.widthUnit" class="form-select tiptap-unit-select">
                  <option v-for="u in videoSizeUnits.width" :key="'vwu-' + u" :value="u">{{ u }}</option>
                </select>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label small text-secondary mb-0">{{ videoEffectiveRatio ? translate('Max. height') : translate('Height') }}</label>
              <div class="input-group input-group-sm">
                <input v-model="videoForm.height" type="number" min="1" step="any" class="form-control" :placeholder="translate('auto')" />
                <select v-model="videoForm.heightUnit" class="form-select tiptap-unit-select">
                  <option v-for="u in videoSizeUnits.height" :key="'vhu-' + u" :value="u">{{ u }}</option>
                </select>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex flex-wrap gap-1 align-items-center">
                <span class="small text-secondary me-1">{{ translate('Size presets') }}:</span>
                <button
                  v-for="sp in videoSizePresets"
                  :key="'vsp-' + sp.label"
                  type="button"
                  class="btn btn-sm"
                  :class="videoSizePresetActive(sp) ? 'btn-primary' : 'btn-outline-secondary'"
                  :title="sp.hint ? translate(sp.hint) : null"
                  @click="applyVideoSizePreset(sp)"
                >
                  {{ translate(sp.label) }}
                </button>
              </div>
              <div class="form-text mt-1">
                {{ videoEffectiveRatio
                  ? translate('px = fixed, % = of content width, vw / vh = of screen width / height. With both set, the smaller one wins, the ratio is kept and the video never overflows the content.')
                  : translate('Fixed size: the iframe gets exactly the given width and height (never wider than the content).') }}
              </div>
            </div>
            <div class="col-12 col-md-8">
              <label class="form-label small text-secondary mb-0">{{ translate('Title') }}</label>
              <input v-model="videoForm.title" type="text" class="form-control form-control-sm" :placeholder="translate('Accessible title of the video')" />
            </div>
            <div class="col-12 col-md-4 d-flex align-items-end">
              <div class="form-check mb-1">
                <input id="tiptap-video-fs" v-model="videoForm.allowfullscreen" class="form-check-input" type="checkbox" />
                <label class="form-check-label small" for="tiptap-video-fs">{{ translate('Allow fullscreen') }}</label>
              </div>
            </div>
          </div>

          <div v-if="videoResolvedSrc" class="border-top pt-3 mt-3">
            <div class="small text-secondary font-monospace text-truncate mb-2" :title="videoResolvedSrc">{{ videoResolvedSrc }}</div>
            <div
              class="tiptap-video-preview"
              :class="videoEffectiveRatio ? 'ratio ' + videoRatioClass(videoEffectiveRatio) : ''"
              :style="videoPreviewStyle.wrapper"
            >
              <iframe
                :src="videoResolvedSrc"
                :style="videoPreviewStyle.iframe"
                frameborder="0"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div class="tiptap-modal-footer">
          <button v-if="videoModalMode === 'edit'" type="button" class="btn btn-outline-danger me-auto" @click="deleteVideoFromModal">{{ translate('Delete video') }}</button>
          <button type="button" class="btn btn-secondary" @click="closeVideoModal">{{ translate('Cancel') }}</button>
          <button type="button" class="btn btn-primary" :disabled="!videoResolvedSrc" @click="confirmVideoModal">
            {{ videoModalMode === 'edit' ? translate('Save') : translate('Insert') }}
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
import Placeholder from "@tiptap/extension-placeholder";
import { NodeSelection } from "@tiptap/pm/state";
import { translate as translateMessage } from "./helpers";
import {
  BootstrapTextAlign,
  BootstrapBold,
  BootstrapItalic,
  BootstrapUnderline,
  BootstrapStrike,
  BootstrapBlockquote,
  BootstrapTextColor,
  BootstrapBackgroundColor,
  BootstrapBlockMargin,
  BootstrapBlockPadding,
  BootstrapBlockFloat,
  BootstrapImage,
  bootstrapTextColorVariants,
  bootstrapBgVariants,
  bootstrapMarginClasses,
  bootstrapPaddingClasses,
  bootstrapFloatClasses,
  bootstrapImgUtilityClasses,
  bootstrapAlertVariants,
} from "../tiptap/bootstrapEditorExtensions.js";
import {
  VideoEmbed,
  defaultVideoEmbedHosts,
  videoEmbedRatioOptions,
  resolveVideoEmbedSrc,
  detectVideoRatio,
  videoRatioWrapperStyle,
  videoFixedSizeStyle,
  videoSizeUnits,
  normalizeVideoSize,
  splitVideoSize,
  ratioClassName,
} from "../tiptap/videoEmbedExtension.js";

/** ratio: "auto" (forrásból felismerve: Shorts/Reel → 9:16, egyébként 16:9) | arány érték | "" (fix méret) */
const EMPTY_VIDEO_FORM = () => ({
  url: "",
  width: "",
  widthUnit: "px",
  height: "",
  heightUnit: "px",
  ratio: "auto",
  allowfullscreen: true,
  title: "",
});

/** Gyors méretek: a "Fit screen" laptopon és fekvő mobilon is teljesen látszik (100% széles, ≤ 85vh magas). */
const VIDEO_SIZE_PRESETS = [
  { label: "Full width", width: "100%", height: null },
  { label: "Fit screen", width: "100%", height: "85vh", hint: "Full width, but at most 85% of the screen height (landscape phone, laptop)" },
  { label: "Half width", width: "50%", height: null },
  { label: "No size", width: null, height: null },
];

const VIDEO_RATIO_GROUPS = [
  { orientation: "landscape", label: "Landscape" },
  { orientation: "square", label: "Square" },
  { orientation: "portrait", label: "Portrait" },
];

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
    /**
     * vu-entity: `field.tiptap` — placeholder, imageSourceFields?: string[],
     * video?: false | { allowedHosts?: string[] },
     * extensions?: Extension[] | (defaults, { editor: vm }) => Extension[],
     * toolbarButtons?: Array<{ label, title?, class?, run(editor), isActive?(editor) }>
     */
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
        imgClass: "",
      },
      htmlSourceModalOpen: false,
      htmlSourceText: "",
      videoModalOpen: false,
      /** insert | edit */
      videoModalMode: "insert",
      editingVideoPos: null,
      selectedVideoPos: null,
      videoForm: EMPTY_VIDEO_FORM(),
      videoSizeUnits,
      videoSizePresets: VIDEO_SIZE_PRESETS,
      videoRatioGroups: VIDEO_RATIO_GROUPS.map((g) => ({
        ...g,
        options: videoEmbedRatioOptions.filter((r) => r.orientation === g.orientation),
      })),
      textColorVariants: bootstrapTextColorVariants,
      bgVariants: bootstrapBgVariants,
      marginClasses: bootstrapMarginClasses,
      paddingClasses: bootstrapPaddingClasses,
      imgUtilityClasses: bootstrapImgUtilityClasses,
      floatClasses: bootstrapFloatClasses,
      alertVariants: bootstrapAlertVariants,
    };
  },
  computed: {
    imageModalTitle() {
      return this.imageModalMode === "edit" ? this.translate("Edit image") : this.translate("Insert image");
    },
    placeholderText() {
      return (this.tiptapOptions && this.tiptapOptions.placeholder) || "";
    },
    videoEnabled() {
      return !(this.tiptapOptions && this.tiptapOptions.video === false);
    },
    videoAllowedHosts() {
      const v = this.tiptapOptions && this.tiptapOptions.video;
      const hosts = v && typeof v === "object" && Array.isArray(v.allowedHosts) ? v.allowedHosts : defaultVideoEmbedHosts;
      return hosts.map((h) => String(h).toLowerCase());
    },
    videoResolvedSrc() {
      return resolveVideoEmbedSrc(this.videoForm.url, this.videoAllowedHosts);
    },
    /** Ténylegesen használt arány ("auto" feloldva), vagy null fix méretnél. */
    videoEffectiveRatio() {
      const r = this.videoForm.ratio;
      if (r === "auto") return detectVideoRatio(this.videoForm.url);
      return r || null;
    },
    videoPreviewStyle() {
      const a = this.videoAttrsFromForm();
      if (!this.videoEffectiveRatio) return { wrapper: null, iframe: videoFixedSizeStyle(a.width, a.height) };
      return { wrapper: videoRatioWrapperStyle(this.videoEffectiveRatio, a.width, a.height), iframe: null };
    },
    customToolbarButtons() {
      const b = this.tiptapOptions && this.tiptapOptions.toolbarButtons;
      return Array.isArray(b) ? b.filter((x) => x && typeof x.run === "function") : [];
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
    blockMarginCurrent() {
      if (!this.editor) return null;
      const sel = this.editor.state.selection;
      if (sel instanceof NodeSelection && sel.node.type.name === "image") {
        return sel.node.attrs.marginClass || null;
      }
      if (this.editor.isActive("blockquote")) return this.editor.getAttributes("blockquote").marginClass || null;
      if (this.editor.isActive("heading")) return this.editor.getAttributes("heading").marginClass || null;
      return this.editor.getAttributes("paragraph").marginClass || null;
    },
    blockMarginActive() {
      return !!this.blockMarginCurrent;
    },
    textColorDropdownLabel() {
      if (!this.editor) return this.translate("Text color");
      for (const v of this.textColorVariants) {
        if (this.editor.isActive("textColor", { variant: v })) return `text-${v}`;
      }
      return this.translate("Text color");
    },
    bgColorDropdownLabel() {
      if (!this.editor) return this.translate("Background");
      for (const v of this.bgVariants) {
        if (this.editor.isActive("backgroundColor", { variant: v })) return `bg-${v}`;
      }
      return this.translate("Background");
    },
    marginDropdownLabel() {
      return this.blockMarginCurrent || this.translate("Margin");
    },
    blockPaddingCurrent() {
      if (!this.editor) return null;
      const sel = this.editor.state.selection;
      if (sel instanceof NodeSelection && sel.node.type.name === "image") {
        return sel.node.attrs.paddingClass || null;
      }
      if (this.editor.isActive("blockquote")) return this.editor.getAttributes("blockquote").paddingClass || null;
      if (this.editor.isActive("heading")) return this.editor.getAttributes("heading").paddingClass || null;
      return this.editor.getAttributes("paragraph").paddingClass || null;
    },
    blockFloatCurrent() {
      if (!this.editor) return null;
      const sel = this.editor.state.selection;
      if (sel instanceof NodeSelection && sel.node.type.name === "image") {
        return sel.node.attrs.floatClass || null;
      }
      if (this.editor.isActive("blockquote")) return this.editor.getAttributes("blockquote").floatClass || null;
      if (this.editor.isActive("heading")) return this.editor.getAttributes("heading").floatClass || null;
      return this.editor.getAttributes("paragraph").floatClass || null;
    },
    blockFloatActive() {
      return !!this.blockFloatCurrent;
    },
    floatDropdownLabel() {
      return this.blockFloatCurrent || this.translate("Float");
    },
    blockPaddingActive() {
      return !!this.blockPaddingCurrent;
    },
    paddingDropdownLabel() {
      return this.blockPaddingCurrent || this.translate("Padding");
    },
    alertVariantDropdownLabel() {
      if (!this.editor) return this.translate("Alert style");
      const v = this.editor.getAttributes("blockquote").variant;
      return v ? `alert-${v}` : this.translate("Alert style");
    },
    linkStyleDropdownLabel() {
      if (!this.editor) return this.translate("Link style");
      const c = this.editor.getAttributes("link").class;
      return c ? String(c).split(/\s+/).slice(0, 2).join(" ") : this.translate("Link style");
    },
    linkHasButtonClass() {
      if (!this.editor) return false;
      return !!this.editor.getAttributes("link").class;
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
    setTextColorMark(variant) {
      if (!this.editor) return;
      if (variant == null || variant === "") this.editor.chain().focus().unsetTextColor().run();
      else this.editor.chain().focus().setTextColor(variant).run();
    },
    setBackgroundColorMark(variant) {
      if (!this.editor) return;
      if (variant == null || variant === "") this.editor.chain().focus().unsetBackgroundColor().run();
      else this.editor.chain().focus().setBackgroundColor(variant).run();
    },
    setBlockMarginCls(cls) {
      if (!this.editor) return;
      if (!cls) this.editor.chain().focus().unsetBlockMarginClass().run();
      else this.editor.chain().focus().setBlockMarginClass(cls).run();
    },
    blockMarginIs(m) {
      return this.blockMarginCurrent === m;
    },
    setBlockPaddingCls(cls) {
      if (!this.editor) return;
      if (!cls) this.editor.chain().focus().unsetBlockPaddingClass().run();
      else this.editor.chain().focus().setBlockPaddingClass(cls).run();
    },
    blockPaddingIs(p) {
      return this.blockPaddingCurrent === p;
    },
    setBlockFloatCls(cls) {
      if (!this.editor) return;
      if (!cls) this.editor.chain().focus().unsetBlockFloatClass().run();
      else this.editor.chain().focus().setBlockFloatClass(cls).run();
    },
    blockFloatIs(f) {
      return this.blockFloatCurrent === f;
    },
    imageHasUtilityClass(cls) {
      return (this.imageEditForm.imgClass || "")
        .split(/\s+/)
        .filter(Boolean)
        .includes(cls);
    },
    toggleImageUtilityClass(cls) {
      const set = new Set(
        (this.imageEditForm.imgClass || "")
          .split(/\s+/)
          .filter(Boolean)
      );
      if (set.has(cls)) set.delete(cls);
      else set.add(cls);
      const ordered = this.imgUtilityClasses.filter((c) => set.has(c));
      this.imageEditForm = { ...this.imageEditForm, imgClass: ordered.join(" ") };
    },
    setAlertVariant(variant) {
      if (!this.editor || !this.editor.isActive("blockquote")) return;
      this.editor.chain().focus().updateAttributes("blockquote", { variant }).run();
    },
    setLinkButtonClass(cls) {
      if (!this.editor || !this.editor.isActive("link")) return;
      this.editor.chain().focus().extendMarkRange("link").updateAttributes({ class: cls || null }).run();
    },
    linkClassIs(cls) {
      if (!this.editor) return false;
      const c = this.editor.getAttributes("link").class;
      return c === cls;
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
      const imgClass = String(this.imageEditForm.imgClass || "").trim();
      return {
        alt: alt || null,
        title: alt || null,
        width: Number.isFinite(w) && w > 0 ? w : null,
        height: Number.isFinite(h) && h > 0 ? h : null,
        imgClass: imgClass || null,
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
      const sel = this.editor.state.selection;
      const videoPos = sel instanceof NodeSelection && sel.node.type.name === "videoEmbed" ? sel.from : null;
      if (videoPos !== this.selectedVideoPos) {
        this.selectedVideoPos = videoPos;
      }
    },
    /** Kattintott DOM elem → videoEmbed node pozíció (node view wrapperen keresztül), vagy null. */
    videoPosFromEvent(view, event) {
      const t = event.target;
      if (!view.editable || !(t instanceof Element)) return null;
      const wrap = t.closest(".tiptap-video-embed");
      if (!wrap || !view.dom.contains(wrap)) return null;
      const pos = view.posAtDOM(wrap, 0);
      if (pos == null || pos < 0) return null;
      const node = view.state.doc.nodeAt(pos);
      return node && node.type.name === "videoEmbed" ? pos : null;
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
          bold: false,
          italic: false,
          strike: false,
          underline: false,
          blockquote: false,
          link: false,
        }),
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            target: "_blank",
            rel: "noopener noreferrer nofollow",
            class: null,
          },
        }),
        BootstrapBold,
        BootstrapItalic,
        BootstrapUnderline,
        BootstrapStrike,
        BootstrapBlockquote,
        BootstrapTextAlign.configure({
          types: ["heading", "paragraph", "blockquote"],
          alignments: ["left", "center", "right", "justify"],
        }),
        BootstrapTextColor,
        BootstrapBackgroundColor,
        BootstrapBlockMargin.configure({
          types: ["paragraph", "heading", "blockquote", "image"],
        }),
        BootstrapBlockPadding.configure({
          types: ["paragraph", "heading", "blockquote", "image"],
        }),
        BootstrapBlockFloat.configure({
          types: ["paragraph", "heading", "blockquote", "image"],
        }),
        BootstrapImage.configure({
          inline: false,
          allowBase64: true,
        }),
      ];
      if (this.videoEnabled) {
        extensions.push(VideoEmbed.configure({ allowedHosts: this.videoAllowedHosts }));
      }
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
        extensions: this.resolveExtensions(extensions),
        editorProps: {
          attributes: {
            class: "tiptap-editor form-control",
            spellcheck: "true",
          },
          handleDOMEvents: {
            click: (view, event) => {
              const videoPos = this.videoPosFromEvent(view, event);
              if (videoPos != null) {
                view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, videoPos)));
                view.focus();
                return true;
              }
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
              const videoPos = this.videoPosFromEvent(view, event);
              if (videoPos != null) {
                view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, videoPos)));
                view.focus();
                this.openVideoModal("edit", videoPos);
                return true;
              }
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
    /** `tiptapOptions.extensions`: tömb → hozzáfűzés; függvény → (alap bővítmények, ctx) => végleges lista. */
    resolveExtensions(defaults) {
      const extra = this.tiptapOptions && this.tiptapOptions.extensions;
      if (typeof extra === "function") {
        const out = extra(defaults, { editor: this });
        return Array.isArray(out) ? out : defaults;
      }
      if (Array.isArray(extra) && extra.length) {
        return [...defaults, ...extra.filter(Boolean)];
      }
      return defaults;
    },
    runCustomToolbarButton(button) {
      if (!this.editor) return;
      button.run(this.editor, this);
    },
    openVideoModalFromToolbar() {
      if (this.selectedVideoPos !== null) {
        this.openVideoModal("edit", this.selectedVideoPos);
      } else {
        this.openVideoModal("insert");
      }
    },
    openVideoModal(mode, docPos) {
      if (this.htmlSourceModalOpen) this.closeHtmlSourceModal();
      if (this.imageModalOpen) this.closeImageModal();
      this.videoModalMode = mode === "edit" ? "edit" : "insert";
      this.editingVideoPos = this.videoModalMode === "edit" && docPos != null ? docPos : null;
      this.videoForm = EMPTY_VIDEO_FORM();
      if (this.videoModalMode === "edit" && this.editingVideoPos != null && this.editor) {
        const node = this.editor.state.doc.nodeAt(this.editingVideoPos);
        if (!node || node.type.name !== "videoEmbed") {
          this.closeVideoModal();
          return;
        }
        const a = node.attrs;
        this.videoForm = {
          url: a.src || "",
          ...this.videoSizeToForm(a.width, a.height),
          ratio: a.ratio || "",
          allowfullscreen: !!a.allowfullscreen,
          title: a.title || "",
        };
      }
      this.videoModalOpen = true;
      this.$nextTick(() => {
        const el = this.$refs.videoUrlInput;
        if (el && typeof el.focus === "function") el.focus();
      });
    },
    /** "85vh" → { height: "85", heightUnit: "vh" } (űrlap mezők). */
    videoSizeToForm(width, height) {
      const w = splitVideoSize(width, "width");
      const h = splitVideoSize(height, "height");
      return { width: w.value, widthUnit: w.unit, height: h.value, heightUnit: h.unit };
    },
    applyVideoSizePreset(preset) {
      this.videoForm = { ...this.videoForm, ...this.videoSizeToForm(preset.width, preset.height) };
    },
    videoSizePresetActive(preset) {
      const a = this.videoAttrsFromForm();
      return a.width === normalizeVideoSize(preset.width, "width") && a.height === normalizeVideoSize(preset.height, "height");
    },
    videoRatioClass(ratio) {
      return ratioClassName(ratio);
    },
    /** "9x16" → "9:16 · álló (telefon)" */
    videoRatioLabel(ratio) {
      const opt = videoEmbedRatioOptions.find((r) => r.value === ratio);
      if (!opt) return String(ratio || "").replace("x", ":");
      const kind = this.translate(opt.phone ? "portrait phone" : opt.orientation);
      return `${opt.label} · ${kind}`;
    },
    closeVideoModal() {
      this.videoModalOpen = false;
      this.videoModalMode = "insert";
      this.editingVideoPos = null;
      this.videoForm = EMPTY_VIDEO_FORM();
    },
    videoAttrsFromForm() {
      const f = this.videoForm;
      const w = normalizeVideoSize(f.width === "" ? null : `${f.width}${f.widthUnit}`, "width");
      const h = normalizeVideoSize(f.height === "" ? null : `${f.height}${f.heightUnit}`, "height");
      const title = String(this.videoForm.title || "").trim();
      return {
        src: this.videoResolvedSrc,
        width: w,
        height: h,
        ratio: this.videoEffectiveRatio,
        allowfullscreen: !!this.videoForm.allowfullscreen,
        title: title || null,
      };
    },
    confirmVideoModal() {
      if (!this.editor || !this.videoResolvedSrc) return;
      const attrs = this.videoAttrsFromForm();
      if (this.videoModalMode === "edit" && this.editingVideoPos != null) {
        this.editor.chain().focus().setNodeSelection(this.editingVideoPos).updateAttributes("videoEmbed", attrs).run();
      } else {
        this.editor.chain().focus().setVideoEmbed(attrs).run();
      }
      this.closeVideoModal();
    },
    deleteVideoFromModal() {
      if (!this.editor || this.editingVideoPos == null) return;
      this.editor.chain().focus().setNodeSelection(this.editingVideoPos).deleteSelection().run();
      this.closeVideoModal();
    },
    recreateEditor() {
      const html = this.editor ? this.editor.getHTML() : this.modelValue || "";
      this.editor?.destroy();
      this.editor = null;
      this.selectedImagePos = null;
      this.selectedVideoPos = null;
      this.imageEditForm = { alt: "", width: "", height: "", imgClass: "" };
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
          imgClass: node.attrs.imgClass ? String(node.attrs.imgClass) : "",
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
        this.imageEditForm = { alt: "", width: "", height: "", imgClass: "" };
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

    .tiptap-unit-select {
      flex: 0 0 4.5rem;
    }

    .tiptap-video-preview {
      max-width: 100%;
      overflow: hidden;
      background: var(--bs-tertiary-bg);

      iframe {
        border: 0;
        max-width: 100%;
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

        .tiptap-video-embed {
          margin: 0.5rem 0;
          cursor: pointer;

          // szerkesztőben a lejátszó ne nyelje el a kattintást (kijelölés / dupla katt → szerkesztés)
          iframe {
            pointer-events: none;
            border: 0;
          }

          &.ProseMirror-selectednode {
            outline: 2px solid var(--bs-primary);
            outline-offset: 2px;
          }
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
