import { prepareFetchUrl, prepareFetchOptions, getResponseJson, getResponseErrors } from "./helpers";

/**
 * Mezőszintű feltöltés (image / upload mező).
 * - field.url → külön feltöltés mentés után
 * - upload: 'blob' | 'dataurl' → bináris a JSON body-ban
 * - upload: { fileField, meta, persist, … } → opcionális finomhangolás (url nélkül)
 */
export function resolveFieldUploadConfig(field) {
  if (typeof field?.url !== "string" || !field.url) return null;
  const extras =
    field.upload && typeof field.upload === "object" ? field.upload : {};
  return {
    fieldName: field.name,
    url: field.url,
    fileField: extras.fileField || "file",
    jsonField: extras.jsonField || "json",
    presetKeys: extras.presets || extras.presetKeys || null,
    persist: extras.persist !== false,
    meta: typeof extras.meta === "function" ? extras.meta : null,
    api: extras.api || { url: field.url },
  };
}

/** Inline (JSON) mezők: nincs upload.url. mode: 'dataurl' | 'blob'. */
export function getInlineUploadFieldsMap(settings) {
  const map = {};
  if (!settings?.form?.groups) return map;
  for (const group of settings.form.groups) {
    if (!Array.isArray(group.fields)) continue;
    for (const field of group.fields) {
      if (field.type !== "image" && field.type !== "upload") continue;
      if (resolveFieldUploadConfig(field)) continue;
      const upload = field.upload;
      if (upload === "blob") {
        map[field.name] = "blob";
      } else {
        map[field.name] = "dataurl";
      }
    }
  }
  return map;
}

/** Mezőnév → upload config (csak külön URL-es mezők). */
export function getSeparateUploadFieldsMap(settings) {
  const map = {};
  if (!settings?.form?.groups) return map;
  for (const group of settings.form.groups) {
    if (!Array.isArray(group.fields)) continue;
    for (const field of group.fields) {
      if (field.type !== "image" && field.type !== "upload") continue;
      const cfg = resolveFieldUploadConfig(field);
      if (cfg) map[field.name] = cfg;
    }
  }
  return map;
}

function cloneUploadedFileForJson(file) {
  if (!file || typeof file !== "object") return file;
  const copy = { ...file };
  if (copy.types && typeof copy.types === "object") {
    copy.types = {};
    for (const key of Object.keys(file.types)) {
      const t = file.types[key];
      if (!t || typeof t !== "object") continue;
      const tc = { ...t };
      if (tc.url) {
        delete tc.data;
        delete tc.blob;
      }
      copy.types[key] = tc;
    }
  }
  return copy;
}

function clonePendingFileForJson(file) {
  if (!file || typeof file !== "object") return file;
  const copy = { ...file };
  if (copy.types && typeof copy.types === "object") {
    copy.types = {};
    for (const key of Object.keys(file.types)) {
      const t = file.types[key];
      if (!t || typeof t !== "object") continue;
      copy.types[key] = {
        slug: t.slug,
        extension: t.extension,
        mime: t.mime,
        width: t.width,
        height: t.height,
        bytes: t.bytes,
        quality: t.quality,
        crop: t.crop,
        ratio: t.ratio,
      };
    }
  }
  return copy;
}

function prepareFileForInlineJson(file, mode) {
  if (!file || typeof file !== "object") return file;
  if (file.uploaded || !file.types) {
    return cloneUploadedFileForJson(file);
  }
  const copy = { ...file };
  copy.types = {};
  for (const key of Object.keys(file.types)) {
    const t = file.types[key];
    if (!t || typeof t !== "object") continue;
    const tc = { ...t };
    if (mode === "blob") {
      delete tc.data;
      delete tc.blob;
    } else {
      delete tc.blob;
    }
    copy.types[key] = tc;
  }
  return copy;
}

/** Inline mezők: dataurl → data marad, blob kikerül; blob → csak meta (JSON-ben blob nem megy). */
export function prepareInlineUploadFieldsForJson(item, inlineFieldsMap) {
  if (!item || !inlineFieldsMap || !Object.keys(inlineFieldsMap).length) return item;
  const out = { ...item };
  for (const [fieldName, mode] of Object.entries(inlineFieldsMap)) {
    const arr = item[fieldName];
    if (!Array.isArray(arr)) continue;
    out[fieldName] = arr.map((file) => prepareFileForInlineJson(file, mode));
  }
  return out;
}

/** Külön + inline fájlmezők előkészítése JSON mentéshez. */
export function prepareAllFileFieldsForJsonSave(item, settings) {
  const separateFields = Object.keys(getSeparateUploadFieldsMap(settings));
  const inlineMap = getInlineUploadFieldsMap(settings);
  let out = separateFields.length
    ? prepareItemForJsonSave(item, separateFields)
    : { ...item };
  const inlinePrepared = prepareInlineUploadFieldsForJson(item, inlineMap);
  for (const fieldName of Object.keys(inlineMap)) {
    if (inlinePrepared[fieldName] != null) {
      out[fieldName] = inlinePrepared[fieldName];
    }
  }
  return out;
}

/** JSON mentéshez: feltöltendő fájlokból data/blob kikerül, metaadat marad. */
export function prepareItemForJsonSave(item, uploadFieldNames) {
  if (!item || !uploadFieldNames?.length) return item;
  const out = { ...item };
  for (const fieldName of uploadFieldNames) {
    const arr = item[fieldName];
    if (!Array.isArray(arr)) continue;
    out[fieldName] = arr.map((file) => {
      if (!file) return file;
      return file.uploaded ? cloneUploadedFileForJson(file) : clonePendingFileForJson(file);
    });
  }
  return out;
}

export function collectPendingFileUploads(item, fieldUploadMap) {
  const tasks = [];
  if (!item || !fieldUploadMap || !Object.keys(fieldUploadMap).length) return tasks;

  for (const [fieldName, uploadConfig] of Object.entries(fieldUploadMap)) {
    const presetKeys = uploadConfig.presetKeys;
    const arr = item[fieldName];
    if (!Array.isArray(arr)) continue;
    arr.forEach((file, fileIndex) => {
      if (!file || file.uploaded || !file.types) return;
      for (const typeKey of Object.keys(file.types)) {
        if (presetKeys && !presetKeys.includes(typeKey)) continue;
        const typeEntry = file.types[typeKey];
        if (!typeEntry || typeEntry.url) continue;
        const hasBlob = typeEntry.blob instanceof Blob;
        const hasData =
          typeof typeEntry.data === "string" && typeEntry.data.startsWith("data:");
        if (!hasBlob && !hasData) continue;
        tasks.push({
          fieldName,
          fileIndex,
          typeKey,
          file,
          typeEntry,
          uploadConfig,
        });
      }
    });
  }
  return tasks;
}

async function blobFromTypeEntry(typeEntry) {
  if (typeEntry.blob instanceof Blob) return typeEntry.blob;
  if (typeof typeEntry.data === "string" && typeEntry.data.startsWith("data:")) {
    const res = await fetch(typeEntry.data);
    return await res.blob();
  }
  throw new Error("No binary data for upload");
}

function defaultUploadMeta(task, savedItem, settings) {
  const pkey = settings?.pkey || "id";
  return {
    entity: settings?.entity || settings?.name || null,
    pkey,
    [pkey]: savedItem?.[pkey] ?? null,
    field: task.fieldName,
    fileIndex: task.fileIndex,
    typeKey: task.typeKey,
    file: {
      uid: task.file.uid,
      slug: task.file.slug,
      title: task.file.title,
      name: task.file.name,
      tags: task.file.tags,
      timestamp: task.file.timestamp,
      isImage: task.file.isImage,
      isDocument: task.file.isDocument,
      original: task.file.original,
    },
    type: {
      slug: task.typeEntry.slug,
      extension: task.typeEntry.extension,
      mime: task.typeEntry.mime,
      width: task.typeEntry.width,
      height: task.typeEntry.height,
      bytes: task.typeEntry.bytes,
      quality: task.typeEntry.quality,
      crop: task.typeEntry.crop,
    },
    item: savedItem,
  };
}

function uploadFilename(task) {
  const ext = task.typeEntry.extension || "bin";
  const base = task.typeEntry.slug || task.file.slug || "file";
  return `${base}.${ext}`;
}

export function extractSavedItemFromResponse(responseData, settings) {
  if (!responseData || typeof responseData !== "object") return responseData;
  const input = settings?.form?.api?.input?.item;
  if (!input) return responseData;
  if (typeof input === "string") return responseData[input] ?? responseData;
  if (typeof input === "function") return responseData;
  return responseData;
}

function pickUploadUrl(data) {
  if (!data) return null;
  if (typeof data.url === "string") return data.url;
  if (data.file && typeof data.file.url === "string") return data.file.url;
  if (Array.isArray(data.files) && data.files[0]?.url) return data.files[0].url;
  return null;
}

/** Sikeres JSON mentés után: mezőnkénti multipart feltöltés, json meta mezővel. */
export async function uploadPendingFormFiles({
  tasks,
  savedItem,
  settings,
  auth,
  debug,
  onProgress,
}) {
  if (!tasks.length) return [];

  const results = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (onProgress) {
      onProgress({ current: i, total: tasks.length, task });
    }
    const uploadConfig = task.uploadConfig;
    const uploadApi = {
      url: uploadConfig.url,
      options: { ...(uploadConfig.api?.options || {}) },
      debug: uploadConfig.api?.debug,
    };

    const metaBase = defaultUploadMeta(task, savedItem, settings);
    const meta =
      uploadConfig.meta != null
        ? uploadConfig.meta(metaBase, task, savedItem, settings, auth)
        : metaBase;

    const formData = new FormData();
    formData.append(uploadConfig.jsonField, JSON.stringify(meta));

    const blob = await blobFromTypeEntry(task.typeEntry);
    formData.append(uploadConfig.fileField, blob, uploadFilename(task));

    if (debug) {
      console.log("[vu-admin] form upload POST", uploadConfig.url, meta);
    }

    const response = await fetch(
      prepareFetchUrl("POST", uploadApi, null, {}),
      prepareFetchOptions("POST", uploadApi, { body: formData }, auth)
    );

    const json = await getResponseJson(response);
    const errors = getResponseErrors(response, json.data);

    if (errors) {
      const msg = errors.map((e) => e.message).join("; ");
      throw new Error(msg || `Upload failed (${response.status})`);
    }
    if (json.error) {
      throw new Error(json.error.message || String(json.error));
    }
    if (!response.ok) {
      throw new Error(`Upload failed (${response.status})`);
    }

    const url = pickUploadUrl(json.data);
    results.push({ task, data: json.data, url });
    if (onProgress) {
      onProgress({ current: i + 1, total: tasks.length, task });
    }
  }

  return results;
}

/** DB-ből betöltött / feltöltött állapot szinkronizálása a UI-hoz. */
export function syncFileUploadState(file) {
  if (!file?.types) return;
  const types = file.types;
  file.uploaded = Object.values(types).every(
    (t) => t && (t.url || (!t.data && !(t.blob instanceof Blob)))
  );
  file.loaded = Object.values(types).some((t) => t && (t.url || t.data));
}

function markFileUploadState(file) {
  syncFileUploadState(file);
}

/** URL-ek visszaírása; az item (form state) helyben frissül. */
export function applyUploadResultsToItem(item, uploadFieldNames, uploadResults) {
  if (!item || !uploadResults?.length) return item;

  for (const { task, url } of uploadResults) {
    if (!url || !Array.isArray(item[task.fieldName])) continue;
    const file = item[task.fieldName][task.fileIndex];
    if (!file?.types?.[task.typeKey]) continue;
    file.types[task.typeKey] = {
      ...file.types[task.typeKey],
      url,
    };
    delete file.types[task.typeKey].data;
    delete file.types[task.typeKey].blob;
    markFileUploadState(file);
  }

  return item;
}

/** Feltöltött fájlmezők URL-jeinek mentése (PUT), hogy reload / újranyitás működjön. */
export async function persistUploadedFileFields({
  savedItem,
  item,
  uploadFieldNames,
  fieldUploadMap,
  settings,
  auth,
  urlParams,
  debug,
}) {
  const pkey = settings?.pkey || "id";
  const primaryId = savedItem?.[pkey];
  if (!primaryId || !uploadFieldNames?.length) return savedItem;

  let persistFields = uploadFieldNames.filter(
    (name) => fieldUploadMap[name]?.persist !== false
  );
  const outputFields = settings?.form?.api?.output?.fields;
  if (Array.isArray(outputFields)) {
    persistFields = persistFields.filter((name) => outputFields.includes(name));
  }
  if (!persistFields.length) return savedItem;

  let patch = prepareItemForJsonSave(item, persistFields);
  patch = Object.fromEntries(
    persistFields
      .filter((name) => patch[name] != null)
      .map((name) => [name, patch[name]])
  );

  if (!Object.keys(patch).length) return savedItem;

  let body;
  const outputItem = settings?.form?.api?.output?.item;
  if (!outputItem) {
    body = JSON.stringify(patch);
  } else if (typeof outputItem === "string") {
    body = JSON.stringify({ [outputItem]: patch });
  } else {
    body = JSON.stringify(outputItem(patch, { persist: true }));
  }

  if (debug) {
    console.log("[vu-admin] persist upload fields PUT", primaryId, JSON.parse(body));
  }

  const response = await fetch(
    prepareFetchUrl("PUT", settings.form.api, primaryId, urlParams || {}),
    prepareFetchOptions("PUT", settings.form.api, { body }, auth)
  );

  const json = await getResponseJson(response);
  const errors = getResponseErrors(response, json.data);

  if (errors) {
    const msg = errors.map((e) => e.message).join("; ");
    throw new Error(msg || `Persist upload fields failed (${response.status})`);
  }
  if (json.error) {
    throw new Error(json.error.message || String(json.error));
  }
  if (!response.ok) {
    throw new Error(`Persist upload fields failed (${response.status})`);
  }

  return extractSavedItemFromResponse(json.data, settings);
}

export function mergeUploadFieldsIntoResponse(responseData, itemWithUrls, uploadFieldNames, settings) {
  const saved = extractSavedItemFromResponse(responseData, settings);
  if (!saved || typeof saved !== "object") return responseData;

  for (const fieldName of uploadFieldNames) {
    if (itemWithUrls[fieldName] != null) {
      saved[fieldName] = itemWithUrls[fieldName];
    }
  }

  const input = settings?.form?.api?.input?.item;
  if (typeof input === "string" && responseData && typeof responseData === "object") {
    return { ...responseData, [input]: saved };
  }
  return saved;
}
