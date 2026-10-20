/**
 * TipTap videó beágyazás: `<iframe>` node, csak megbízható (whitelistelt) hosztokra.
 * Támogatott forrás: YouTube, Vimeo, Facebook — oldal-URL, embed URL vagy teljes `<iframe>` embed kód.
 */
import { Node, mergeAttributes } from "@tiptap/core";

/** Alapértelmezett engedélyezett iframe hosztok (embed `src`). */
export const defaultVideoEmbedHosts = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "www.facebook.com",
  "facebook.com",
];

/**
 * Választható képarányok tájolás szerint (null → fix width/height, wrapper nélkül).
 * A Bootstrap csak 1x1, 4x3, 16x9, 21x9 osztályt ad — a többihez a `.ratio` wrapper `--bs-aspect-ratio` változót kap.
 */
export const videoEmbedRatioOptions = [
  { value: "21x9", orientation: "landscape", label: "21:9" },
  { value: "16x9", orientation: "landscape", label: "16:9" },
  { value: "4x3", orientation: "landscape", label: "4:3" },
  { value: "1x1", orientation: "square", label: "1:1" },
  { value: "4x5", orientation: "portrait", label: "4:5" },
  { value: "3x4", orientation: "portrait", label: "3:4" },
  { value: "9x16", orientation: "portrait", label: "9:16", phone: true },
  { value: "9x19.5", orientation: "portrait", label: "9:19.5", phone: true },
];

export const videoEmbedRatios = videoEmbedRatioOptions.map((r) => r.value);

const BOOTSTRAP_NATIVE_RATIOS = ["1x1", "4x3", "16x9", "21x9"];

/** "9x16" → { w: 9, h: 16 } */
function ratioParts(ratio) {
  const m = String(ratio || "").match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/);
  return m ? { w: parseFloat(m[1]), h: parseFloat(m[2]) } : null;
}

/** Bootstrap osztály-név: a pont nem érvényes CSS osztályban escape nélkül → "9x19-5". */
export function ratioClassName(ratio) {
  return `ratio-${String(ratio).replace(".", "-")}`;
}

/**
 * Méret mértékegységek: % a tartalom szélességéhez, vw/vh a képernyőhöz (pl. fekvő mobil: magasság ≤ 85vh).
 * Magasságnál a % nem értelmezhető (a szülő magassága ismeretlen), ezért ott nincs.
 */
export const videoSizeUnits = {
  width: ["px", "%", "vw", "vh"],
  height: ["px", "vh", "vw"],
};

/**
 * Méret normalizálása: 560 / "560" → "560px", "80 vh" → "80vh"; érvénytelen vagy nem engedett egység → null.
 * @param {"width"|"height"} axis
 * @returns {string|null}
 */
export function normalizeVideoSize(value, axis = "width") {
  if (value == null || value === "") return null;
  const m = String(value).trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(px|%|vw|vh)?$/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  const unit = m[2] || "px";
  if (!(n > 0) || !videoSizeUnits[axis].includes(unit)) return null;
  return `${+n.toFixed(2)}${unit}`;
}

/** "80vh" → { value: "80", unit: "vh" } (űrlaphoz). */
export function splitVideoSize(value, axis = "width") {
  const s = normalizeVideoSize(value, axis);
  if (!s) return { value: "", unit: "px" };
  const m = s.match(/^([\d.]+)(.*)$/);
  return { value: m[1], unit: m[2] };
}

/** px érték száma (iframe width/height HTML attribútumhoz), egyébként null. */
function pxNumber(size) {
  const m = size && size.match(/^([\d.]+)px$/);
  return m ? Math.round(parseFloat(m[1])) : null;
}

/**
 * `.ratio` wrapper inline stílusa: nem natív aránynál `--bs-aspect-ratio`, plusz max-width:
 * - csak szélesség → max-width: W
 * - csak magasság → max-width: H × arány (a szélességet az arány adja)
 * - mindkettő → max-width: min(W, H × arány) — pl. 100% széles, de legfeljebb 85vh magas (fekvő mobil)
 * A wrapper legfeljebb a tartalom szélességéig nyúlik, így vízszintesen soha nem lóg ki.
 * @returns {string|null}
 */
export function videoRatioWrapperStyle(ratio, width, height) {
  const p = ratioParts(ratio);
  if (!p) return null;
  const parts = [];
  if (!BOOTSTRAP_NATIVE_RATIOS.includes(ratio)) {
    parts.push(`--bs-aspect-ratio: ${+((p.h / p.w) * 100).toFixed(4)}%`);
  }
  const w = normalizeVideoSize(width, "width");
  const h = normalizeVideoSize(height, "height");
  let fromH = null;
  if (h) {
    const hPx = pxNumber(h);
    fromH = hPx ? `${Math.round((hPx * p.w) / p.h)}px` : `calc(${h} * ${+(p.w / p.h).toFixed(4)})`;
  }
  const maxW = w && fromH ? `min(${w}, ${fromH})` : w || fromH;
  if (maxW) parts.push(`max-width: ${maxW}`);
  return parts.length ? parts.join("; ") : null;
}

/** Fix méret (arány nélkül): pontos szélesség/magasság, de a tartalomnál sosem szélesebb. */
export function videoFixedSizeStyle(width, height) {
  const w = normalizeVideoSize(width, "width");
  const h = normalizeVideoSize(height, "height");
  const parts = [];
  if (w) parts.push(`width: ${w}`);
  if (h) parts.push(`height: ${h}`);
  parts.push("max-width: 100%");
  return parts.join("; ");
}

/** Az input alapján valószínű arány: YouTube Shorts / Facebook Reel → álló 9:16, egyébként 16:9. */
export function detectVideoRatio(input) {
  const s = String(input || "");
  if (/youtube\.com\/shorts\//i.test(s)) return "9x16";
  if (/facebook\.com\/(reel|share\/r)\//i.test(s) || /facebook\.com%2F(reel|share%2Fr)%2F/i.test(s)) return "9x16";
  return "16x9";
}

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{6,}$/;

function parseUrl(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" || u.protocol === "http:" ? u : null;
  } catch (e) {
    return null;
  }
}

/** `t=1m30s` / `t=90` / `start=90` → másodperc. */
function parseStartSeconds(value) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  const m = String(value).match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!m) return 0;
  return (parseInt(m[1] || 0, 10) * 3600) + (parseInt(m[2] || 0, 10) * 60) + parseInt(m[3] || 0, 10);
}

function youtubeEmbed(u) {
  const host = u.hostname.replace(/^(www\.|m\.)/, "");
  let id = null;
  if (host === "youtu.be") {
    id = u.pathname.split("/")[1];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts[0] === "watch") id = u.searchParams.get("v");
    else if (["embed", "shorts", "live", "v"].includes(parts[0])) id = parts[1];
  } else {
    return null;
  }
  if (!id || !YOUTUBE_ID_RE.test(id)) return null;
  const embedHost = host === "youtube-nocookie.com" ? "www.youtube-nocookie.com" : "www.youtube.com";
  const start = parseStartSeconds(u.searchParams.get("start") || u.searchParams.get("t"));
  return `https://${embedHost}/embed/${id}${start > 0 ? `?start=${start}` : ""}`;
}

function vimeoEmbed(u) {
  const host = u.hostname.replace(/^www\./, "");
  const parts = u.pathname.split("/").filter(Boolean);
  let id = null;
  let hash = u.searchParams.get("h");
  if (host === "player.vimeo.com" && parts[0] === "video") {
    id = parts[1];
  } else if (host === "vimeo.com") {
    // vimeo.com/123, vimeo.com/123/abcdef (unlisted), vimeo.com/channels/x/123
    const idx = parts.findIndex((p) => /^\d+$/.test(p));
    if (idx >= 0) {
      id = parts[idx];
      if (!hash && parts[idx + 1] && /^[a-f0-9]+$/i.test(parts[idx + 1])) hash = parts[idx + 1];
    }
  } else {
    return null;
  }
  if (!id || !/^\d+$/.test(id)) return null;
  return `https://player.vimeo.com/video/${id}${hash ? `?h=${encodeURIComponent(hash)}` : ""}`;
}

function facebookEmbed(u) {
  const host = u.hostname.replace(/^(www\.|m\.|web\.)/, "");
  if (host === "facebook.com" && u.pathname.replace(/\/+$/, "") === "/plugins/video.php") {
    const href = u.searchParams.get("href");
    const inner = href && parseUrl(href);
    if (!inner) return null;
    return facebookEmbed(inner);
  }
  if (host !== "facebook.com" && host !== "fb.watch") return null;
  if (host === "facebook.com" && !/\/(videos|watch|reel|share\/v|share\/r)\b/.test(u.pathname)) return null;
  const pageUrl = `https://${host === "fb.watch" ? "fb.watch" : "www.facebook.com"}${u.pathname}${
    u.searchParams.get("v") ? `?v=${encodeURIComponent(u.searchParams.get("v"))}` : ""
  }`;
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(pageUrl)}&show_text=false`;
}

/**
 * Felhasználói input (oldal-URL, embed URL vagy `<iframe>` kód) → normalizált embed `src`, vagy null.
 * @param {string} input
 */
export function toVideoEmbedSrc(input) {
  let raw = String(input || "").trim();
  if (!raw) return null;
  if (/^<iframe[\s>]/i.test(raw)) {
    const m = raw.match(/\ssrc\s*=\s*(["'])(.*?)\1/i);
    if (!m) return null;
    raw = m[2].replace(/&amp;/g, "&");
  }
  if (raw.startsWith("//")) raw = `https:${raw}`;
  else if (!/^[a-z]+:\/\//i.test(raw)) raw = `https://${raw}`;
  const u = parseUrl(raw);
  if (!u) return null;
  return youtubeEmbed(u) || vimeoEmbed(u) || facebookEmbed(u);
}

/** Ismert hosztoknál csak a lejátszó (embed) útvonal engedett; egyéni hosztnál elég a hoszt egyezése. */
const EMBED_PATH_RULES = {
  "www.youtube.com": /^\/embed\/[A-Za-z0-9_-]+\/?$/,
  "youtube.com": /^\/embed\/[A-Za-z0-9_-]+\/?$/,
  "www.youtube-nocookie.com": /^\/embed\/[A-Za-z0-9_-]+\/?$/,
  "player.vimeo.com": /^\/video\/\d+\/?$/,
  "www.facebook.com": /^\/plugins\/video\.php$/,
  "facebook.com": /^\/plugins\/video\.php$/,
};

/** Pontos, https embed URL és whitelistelt hoszt? */
export function isAllowedVideoSrc(src, allowedHosts = defaultVideoEmbedHosts) {
  const u = parseUrl(String(src || ""));
  if (!u || u.protocol !== "https:") return false;
  const host = u.hostname.toLowerCase();
  if (!allowedHosts.includes(host)) return false;
  const rule = EMBED_PATH_RULES[host];
  return rule ? rule.test(u.pathname) : true;
}

/**
 * Input → beágyazható `src`: előbb YouTube/Vimeo/Facebook normalizálás, különben a nyers (vagy `<iframe>`-ből kinyert)
 * URL, ha a hosztja engedélyezett (projektben bővített `allowedHosts` esetére).
 */
export function resolveVideoEmbedSrc(input, allowedHosts = defaultVideoEmbedHosts) {
  const normalized = toVideoEmbedSrc(input);
  if (normalized && isAllowedVideoSrc(normalized, allowedHosts)) return normalized;
  let raw = String(input || "").trim();
  const m = raw.match(/^<iframe[\s\S]*?\ssrc\s*=\s*(["'])(.*?)\1/i);
  if (m) raw = m[2].replace(/&amp;/g, "&");
  return isAllowedVideoSrc(raw, allowedHosts) ? raw : null;
}

function parseRatio(element) {
  if (!element || !element.classList) return null;
  for (const r of videoEmbedRatios) {
    if (element.classList.contains(ratioClassName(r))) return r;
  }
  return "16x9";
}

/** Méret visszaolvasása: `data-width`/`data-height` (egységgel), különben a régi iframe px attribútum. */
function parseSizeAttr(wrapper, iframe, axis) {
  const fromData = (wrapper && wrapper.getAttribute(`data-${axis}`)) || (iframe && iframe.getAttribute(`data-${axis}`));
  return normalizeVideoSize(fromData, axis) || normalizeVideoSize(iframe && iframe.getAttribute(axis), axis);
}

export const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      allowedHosts: defaultVideoEmbedHosts,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: { default: null, rendered: false },
      /** Méret egységgel: "560px", "100%", "80vw", "85vh" (régi tartalomban szám = px). */
      width: { default: null, rendered: false },
      height: { default: null, rendered: false },
      allowfullscreen: { default: true, rendered: false },
      title: { default: null, rendered: false },
      /** Bootstrap `.ratio` wrapper (pl. "16x9"); null → fix méret, wrapper nélkül. */
      ratio: { default: "16x9", rendered: false },
    };
  },

  parseHTML() {
    const allowed = this.options.allowedHosts;
    const fromIframe = (iframe, ratio, wrapper = null) => {
      const src = iframe && iframe.getAttribute("src");
      if (!isAllowedVideoSrc(src, allowed)) return false;
      return {
        src,
        width: parseSizeAttr(wrapper, iframe, "width"),
        height: parseSizeAttr(wrapper, iframe, "height"),
        allowfullscreen: iframe.hasAttribute("allowfullscreen"),
        title: iframe.getAttribute("title") || null,
        ratio,
      };
    };
    return [
      {
        tag: "div",
        // a `ratio` wrapper előbb illeszkedjen, mint a belső iframe
        priority: 60,
        getAttrs: (node) => {
          if (typeof node === "string" || !node.classList || !node.classList.contains("ratio")) return false;
          return fromIframe(node.querySelector("iframe"), parseRatio(node), node);
        },
      },
      {
        tag: "iframe",
        getAttrs: (node) => (typeof node === "string" ? false : fromIframe(node, null)),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, allowfullscreen, title, ratio } = node.attrs;
    if (!isAllowedVideoSrc(src, this.options.allowedHosts)) return ["div", { "data-video-embed": "blocked" }];
    const width = normalizeVideoSize(node.attrs.width, "width");
    const height = normalizeVideoSize(node.attrs.height, "height");
    const sizeData = { "data-width": width, "data-height": height };
    const iframeAttrs = {
      src,
      width: pxNumber(width),
      height: pxNumber(height),
      title: title || null,
      frameborder: "0",
      loading: "lazy",
      referrerpolicy: "strict-origin-when-cross-origin",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: allowfullscreen ? "true" : null,
    };
    if (ratio && videoEmbedRatios.includes(ratio)) {
      const wrapper = { class: `ratio ${ratioClassName(ratio)}`, style: videoRatioWrapperStyle(ratio, width, height), ...sizeData };
      return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, wrapper), ["iframe", iframeAttrs]];
    }
    const fixed = { ...iframeAttrs, ...sizeData, style: videoFixedSizeStyle(width, height) };
    return ["iframe", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, fixed)];
  },

  /** Szerkesztőben: nem-interaktív előnézet, hogy kattintással ki lehessen jelölni a node-ot. */
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("div");
      dom.className = "tiptap-video-embed";
      dom.contentEditable = "false";
      const render = (n) => {
        dom.innerHTML = "";
        const { src, width, height, ratio } = n.attrs;
        const box = document.createElement("div");
        if (ratio && videoEmbedRatios.includes(ratio)) {
          box.className = `ratio ${ratioClassName(ratio)}`;
          box.setAttribute("style", videoRatioWrapperStyle(ratio, width, height) || "");
        } else {
          box.setAttribute("style", videoFixedSizeStyle(width, height));
        }
        if (isAllowedVideoSrc(src, this.options.allowedHosts)) {
          const iframe = document.createElement("iframe");
          iframe.src = src;
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("loading", "lazy");
          iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
          iframe.setAttribute("tabindex", "-1");
          if (!ratio) {
            iframe.width = "100%";
            iframe.height = "100%";
          }
          box.appendChild(iframe);
        }
        dom.appendChild(box);
      };
      render(node);
      return {
        dom,
        update: (updated) => {
          if (updated.type.name !== this.name) return false;
          render(updated);
          return true;
        },
        ignoreMutation: () => true,
      };
    };
  },

  addCommands() {
    return {
      setVideoEmbed:
        (attrs) =>
        ({ commands }) => {
          if (!attrs || !isAllowedVideoSrc(attrs.src, this.options.allowedHosts)) return false;
          return commands.insertContent({ type: this.name, attrs });
        },
    };
  },
});
