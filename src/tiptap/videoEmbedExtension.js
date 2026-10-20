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

/** Bootstrap `.ratio-*` arányok (null → fix width/height). */
export const videoEmbedRatios = ["16x9", "4x3", "1x1", "21x9", "9x16"];

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
    if (element.classList.contains(`ratio-${r}`)) return r;
  }
  return null;
}

function parseIntAttr(element, name) {
  const v = parseInt(element && element.getAttribute(name), 10);
  return Number.isFinite(v) && v > 0 ? v : null;
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
      width: { default: 560, rendered: false },
      height: { default: 315, rendered: false },
      allowfullscreen: { default: true, rendered: false },
      title: { default: null, rendered: false },
      /** Bootstrap `.ratio` wrapper (pl. "16x9"); null → fix méret, wrapper nélkül. */
      ratio: { default: "16x9", rendered: false },
    };
  },

  parseHTML() {
    const allowed = this.options.allowedHosts;
    const fromIframe = (iframe, ratio) => {
      const src = iframe && iframe.getAttribute("src");
      if (!isAllowedVideoSrc(src, allowed)) return false;
      return {
        src,
        width: parseIntAttr(iframe, "width"),
        height: parseIntAttr(iframe, "height"),
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
          return fromIframe(node.querySelector("iframe"), parseRatio(node));
        },
      },
      {
        tag: "iframe",
        getAttrs: (node) => (typeof node === "string" ? false : fromIframe(node, null)),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, width, height, allowfullscreen, title, ratio } = node.attrs;
    if (!isAllowedVideoSrc(src, this.options.allowedHosts)) return ["div", { "data-video-embed": "blocked" }];
    const iframeAttrs = {
      src,
      width: width || null,
      height: height || null,
      title: title || null,
      frameborder: "0",
      loading: "lazy",
      referrerpolicy: "strict-origin-when-cross-origin",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: allowfullscreen ? "true" : null,
    };
    if (ratio && videoEmbedRatios.includes(ratio)) {
      return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: `ratio ratio-${ratio}` }), ["iframe", iframeAttrs]];
    }
    return ["iframe", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, iframeAttrs)];
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
          box.className = `ratio ratio-${ratio}`;
        } else {
          box.style.width = width ? `${width}px` : "";
          box.style.height = height ? `${height}px` : "";
          box.style.maxWidth = "100%";
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
