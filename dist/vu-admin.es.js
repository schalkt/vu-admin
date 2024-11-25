var Vh = Object.defineProperty;
var Uh = (e, t, s) => t in e ? Vh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var M = (e, t, s) => Uh(e, typeof t != "symbol" ? t + "" : t, s);
import { openBlock as g, createElementBlock as m, createElementVNode as f, normalizeClass as S, Fragment as F, renderList as W, toDisplayString as O, createCommentVNode as T, withDirectives as K, vModelText as se, withKeys as ai, withModifiers as ft, createTextVNode as U, vModelSelect as De, resolveComponent as qe, createBlock as ns, vModelDynamic as ye, vModelCheckbox as Fh, vShow as Ls, normalizeStyle as ln, createVNode as yu } from "vue";
var At = "top", xt = "bottom", $t = "right", Nt = "left", Sr = "auto", $n = [At, xt, $t, Nt], Rs = "start", wn = "end", vu = "clippingParents", Ua = "viewport", cn = "popper", _u = "reference", ca = /* @__PURE__ */ $n.reduce(function(e, t) {
  return e.concat([t + "-" + Rs, t + "-" + wn]);
}, []), Fa = /* @__PURE__ */ [].concat($n, [Sr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Rs, t + "-" + wn]);
}, []), Eu = "beforeRead", wu = "read", Tu = "afterRead", Au = "beforeMain", Nu = "main", Ou = "afterMain", ku = "beforeWrite", Cu = "write", Su = "afterWrite", Lu = [Eu, wu, Tu, Au, Nu, Ou, ku, Cu, Su];
function Te(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Rt(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Ms(e) {
  var t = Rt(e).Element;
  return e instanceof t || e instanceof Element;
}
function zt(e) {
  var t = Rt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ha(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Rt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Hh(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(s) {
    var n = t.styles[s] || {}, i = t.attributes[s] || {}, r = t.elements[s];
    !zt(r) || !Te(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? r.removeAttribute(o) : r.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function zh(e) {
  var t = e.state, s = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, s.popper), t.styles = s, t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var i = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : s[n]), l = o.reduce(function(a, u) {
        return a[u] = "", a;
      }, {});
      !zt(i) || !Te(i) || (Object.assign(i.style, l), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const za = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Hh,
  effect: zh,
  requires: ["computeStyles"]
};
function ve(e) {
  return e.split("-")[0];
}
var $s = Math.max, yr = Math.min, Tn = Math.round;
function ua() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Iu() {
  return !/^((?!chrome|android).)*safari/i.test(ua());
}
function An(e, t, s) {
  t === void 0 && (t = !1), s === void 0 && (s = !1);
  var n = e.getBoundingClientRect(), i = 1, r = 1;
  t && zt(e) && (i = e.offsetWidth > 0 && Tn(n.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && Tn(n.height) / e.offsetHeight || 1);
  var o = Ms(e) ? Rt(e) : window, l = o.visualViewport, a = !Iu() && s, u = (n.left + (a && l ? l.offsetLeft : 0)) / i, h = (n.top + (a && l ? l.offsetTop : 0)) / r, d = n.width / i, b = n.height / r;
  return {
    width: d,
    height: b,
    top: h,
    right: u + d,
    bottom: h + b,
    left: u,
    x: u,
    y: h
  };
}
function Wa(e) {
  var t = An(e), s = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: s,
    height: n
  };
}
function xu(e, t) {
  var s = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (s && Ha(s)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function je(e) {
  return Rt(e).getComputedStyle(e);
}
function Wh(e) {
  return ["table", "td", "th"].indexOf(Te(e)) >= 0;
}
function hs(e) {
  return ((Ms(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Lr(e) {
  return Te(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ha(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    hs(e)
  );
}
function Rl(e) {
  return !zt(e) || // https://github.com/popperjs/popper-core/issues/837
  je(e).position === "fixed" ? null : e.offsetParent;
}
function Kh(e) {
  var t = /firefox/i.test(ua()), s = /Trident/i.test(ua());
  if (s && zt(e)) {
    var n = je(e);
    if (n.position === "fixed")
      return null;
  }
  var i = Lr(e);
  for (Ha(i) && (i = i.host); zt(i) && ["html", "body"].indexOf(Te(i)) < 0; ) {
    var r = je(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Ti(e) {
  for (var t = Rt(e), s = Rl(e); s && Wh(s) && je(s).position === "static"; )
    s = Rl(s);
  return s && (Te(s) === "html" || Te(s) === "body" && je(s).position === "static") ? t : s || Kh(e) || t;
}
function Ka(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function li(e, t, s) {
  return $s(e, yr(t, s));
}
function Gh(e, t, s) {
  var n = li(e, t, s);
  return n > s ? s : n;
}
function $u() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ru(e) {
  return Object.assign({}, $u(), e);
}
function Mu(e, t) {
  return t.reduce(function(s, n) {
    return s[n] = e, s;
  }, {});
}
var Yh = function(t, s) {
  return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
    placement: s.placement
  })) : t, Ru(typeof t != "number" ? t : Mu(t, $n));
};
function Xh(e) {
  var t, s = e.state, n = e.name, i = e.options, r = s.elements.arrow, o = s.modifiersData.popperOffsets, l = ve(s.placement), a = Ka(l), u = [Nt, $t].indexOf(l) >= 0, h = u ? "height" : "width";
  if (!(!r || !o)) {
    var d = Yh(i.padding, s), b = Wa(r), y = a === "y" ? At : Nt, _ = a === "y" ? xt : $t, E = s.rects.reference[h] + s.rects.reference[a] - o[a] - s.rects.popper[h], w = o[a] - s.rects.reference[a], A = Ti(r), k = A ? a === "y" ? A.clientHeight || 0 : A.clientWidth || 0 : 0, L = E / 2 - w / 2, I = d[y], $ = k - b[h] - d[_], R = k / 2 - b[h] / 2 + L, P = li(I, R, $), H = a;
    s.modifiersData[n] = (t = {}, t[H] = P, t.centerOffset = P - R, t);
  }
}
function Zh(e) {
  var t = e.state, s = e.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || xu(t.elements.popper, i) && (t.elements.arrow = i));
}
const Du = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Xh,
  effect: Zh,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Nn(e) {
  return e.split("-")[1];
}
var Qh = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Jh(e, t) {
  var s = e.x, n = e.y, i = t.devicePixelRatio || 1;
  return {
    x: Tn(s * i) / i || 0,
    y: Tn(n * i) / i || 0
  };
}
function Ml(e) {
  var t, s = e.popper, n = e.popperRect, i = e.placement, r = e.variation, o = e.offsets, l = e.position, a = e.gpuAcceleration, u = e.adaptive, h = e.roundOffsets, d = e.isFixed, b = o.x, y = b === void 0 ? 0 : b, _ = o.y, E = _ === void 0 ? 0 : _, w = typeof h == "function" ? h({
    x: y,
    y: E
  }) : {
    x: y,
    y: E
  };
  y = w.x, E = w.y;
  var A = o.hasOwnProperty("x"), k = o.hasOwnProperty("y"), L = Nt, I = At, $ = window;
  if (u) {
    var R = Ti(s), P = "clientHeight", H = "clientWidth";
    if (R === Rt(s) && (R = hs(s), je(R).position !== "static" && l === "absolute" && (P = "scrollHeight", H = "scrollWidth")), R = R, i === At || (i === Nt || i === $t) && r === wn) {
      I = xt;
      var J = d && R === $ && $.visualViewport ? $.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        R[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === Nt || (i === At || i === xt) && r === wn) {
      L = $t;
      var tt = d && R === $ && $.visualViewport ? $.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        R[H]
      );
      y -= tt - n.width, y *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: l
  }, u && Qh), ot = h === !0 ? Jh({
    x: y,
    y: E
  }, Rt(s)) : {
    x: y,
    y: E
  };
  if (y = ot.x, E = ot.y, a) {
    var it;
    return Object.assign({}, nt, (it = {}, it[I] = k ? "0" : "", it[L] = A ? "0" : "", it.transform = ($.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + E + "px)" : "translate3d(" + y + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[I] = k ? E + "px" : "", t[L] = A ? y + "px" : "", t.transform = "", t));
}
function tf(e) {
  var t = e.state, s = e.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, o = r === void 0 ? !0 : r, l = s.roundOffsets, a = l === void 0 ? !0 : l, u = {
    placement: ve(t.placement),
    variation: Nn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ml(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ml(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Ga = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: tf,
  data: {}
};
var Ji = {
  passive: !0
};
function ef(e) {
  var t = e.state, s = e.instance, n = e.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, l = o === void 0 ? !0 : o, a = Rt(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && u.forEach(function(h) {
    h.addEventListener("scroll", s.update, Ji);
  }), l && a.addEventListener("resize", s.update, Ji), function() {
    r && u.forEach(function(h) {
      h.removeEventListener("scroll", s.update, Ji);
    }), l && a.removeEventListener("resize", s.update, Ji);
  };
}
const Ya = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ef,
  data: {}
};
var sf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function hr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return sf[t];
  });
}
var nf = {
  start: "end",
  end: "start"
};
function Dl(e) {
  return e.replace(/start|end/g, function(t) {
    return nf[t];
  });
}
function Xa(e) {
  var t = Rt(e), s = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function Za(e) {
  return An(hs(e)).left + Xa(e).scrollLeft;
}
function rf(e, t) {
  var s = Rt(e), n = hs(e), i = s.visualViewport, r = n.clientWidth, o = n.clientHeight, l = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var u = Iu();
    (u || !u && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: l + Za(e),
    y: a
  };
}
function of(e) {
  var t, s = hs(e), n = Xa(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = $s(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = $s(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Za(e), a = -n.scrollTop;
  return je(i || s).direction === "rtl" && (l += $s(s.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: l,
    y: a
  };
}
function Qa(e) {
  var t = je(e), s = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(s + i + n);
}
function qu(e) {
  return ["html", "body", "#document"].indexOf(Te(e)) >= 0 ? e.ownerDocument.body : zt(e) && Qa(e) ? e : qu(Lr(e));
}
function ci(e, t) {
  var s;
  t === void 0 && (t = []);
  var n = qu(e), i = n === ((s = e.ownerDocument) == null ? void 0 : s.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Qa(n) ? n : []) : n, l = t.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(ci(Lr(o)))
  );
}
function da(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function af(e, t) {
  var s = An(e, !1, t === "fixed");
  return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s;
}
function ql(e, t, s) {
  return t === Ua ? da(rf(e, s)) : Ms(t) ? af(t, s) : da(of(hs(e)));
}
function lf(e) {
  var t = ci(Lr(e)), s = ["absolute", "fixed"].indexOf(je(e).position) >= 0, n = s && zt(e) ? Ti(e) : e;
  return Ms(n) ? t.filter(function(i) {
    return Ms(i) && xu(i, n) && Te(i) !== "body";
  }) : [];
}
function cf(e, t, s, n) {
  var i = t === "clippingParents" ? lf(e) : [].concat(t), r = [].concat(i, [s]), o = r[0], l = r.reduce(function(a, u) {
    var h = ql(e, u, n);
    return a.top = $s(h.top, a.top), a.right = yr(h.right, a.right), a.bottom = yr(h.bottom, a.bottom), a.left = $s(h.left, a.left), a;
  }, ql(e, o, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Bu(e) {
  var t = e.reference, s = e.element, n = e.placement, i = n ? ve(n) : null, r = n ? Nn(n) : null, o = t.x + t.width / 2 - s.width / 2, l = t.y + t.height / 2 - s.height / 2, a;
  switch (i) {
    case At:
      a = {
        x: o,
        y: t.y - s.height
      };
      break;
    case xt:
      a = {
        x: o,
        y: t.y + t.height
      };
      break;
    case $t:
      a = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Nt:
      a = {
        x: t.x - s.width,
        y: l
      };
      break;
    default:
      a = {
        x: t.x,
        y: t.y
      };
  }
  var u = i ? Ka(i) : null;
  if (u != null) {
    var h = u === "y" ? "height" : "width";
    switch (r) {
      case Rs:
        a[u] = a[u] - (t[h] / 2 - s[h] / 2);
        break;
      case wn:
        a[u] = a[u] + (t[h] / 2 - s[h] / 2);
        break;
    }
  }
  return a;
}
function On(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = n === void 0 ? e.placement : n, r = s.strategy, o = r === void 0 ? e.strategy : r, l = s.boundary, a = l === void 0 ? vu : l, u = s.rootBoundary, h = u === void 0 ? Ua : u, d = s.elementContext, b = d === void 0 ? cn : d, y = s.altBoundary, _ = y === void 0 ? !1 : y, E = s.padding, w = E === void 0 ? 0 : E, A = Ru(typeof w != "number" ? w : Mu(w, $n)), k = b === cn ? _u : cn, L = e.rects.popper, I = e.elements[_ ? k : b], $ = cf(Ms(I) ? I : I.contextElement || hs(e.elements.popper), a, h, o), R = An(e.elements.reference), P = Bu({
    reference: R,
    element: L,
    strategy: "absolute",
    placement: i
  }), H = da(Object.assign({}, L, P)), J = b === cn ? H : R, tt = {
    top: $.top - J.top + A.top,
    bottom: J.bottom - $.bottom + A.bottom,
    left: $.left - J.left + A.left,
    right: J.right - $.right + A.right
  }, nt = e.modifiersData.offset;
  if (b === cn && nt) {
    var ot = nt[i];
    Object.keys(tt).forEach(function(it) {
      var Dt = [$t, xt].indexOf(it) >= 0 ? 1 : -1, qt = [At, xt].indexOf(it) >= 0 ? "y" : "x";
      tt[it] += ot[qt] * Dt;
    });
  }
  return tt;
}
function uf(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = s.boundary, r = s.rootBoundary, o = s.padding, l = s.flipVariations, a = s.allowedAutoPlacements, u = a === void 0 ? Fa : a, h = Nn(n), d = h ? l ? ca : ca.filter(function(_) {
    return Nn(_) === h;
  }) : $n, b = d.filter(function(_) {
    return u.indexOf(_) >= 0;
  });
  b.length === 0 && (b = d);
  var y = b.reduce(function(_, E) {
    return _[E] = On(e, {
      placement: E,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[ve(E)], _;
  }, {});
  return Object.keys(y).sort(function(_, E) {
    return y[_] - y[E];
  });
}
function df(e) {
  if (ve(e) === Sr)
    return [];
  var t = hr(e);
  return [Dl(e), t, Dl(t)];
}
function hf(e) {
  var t = e.state, s = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, l = o === void 0 ? !0 : o, a = s.fallbackPlacements, u = s.padding, h = s.boundary, d = s.rootBoundary, b = s.altBoundary, y = s.flipVariations, _ = y === void 0 ? !0 : y, E = s.allowedAutoPlacements, w = t.options.placement, A = ve(w), k = A === w, L = a || (k || !_ ? [hr(w)] : df(w)), I = [w].concat(L).reduce(function(Xt, G) {
      return Xt.concat(ve(G) === Sr ? uf(t, {
        placement: G,
        boundary: h,
        rootBoundary: d,
        padding: u,
        flipVariations: _,
        allowedAutoPlacements: E
      }) : G);
    }, []), $ = t.rects.reference, R = t.rects.popper, P = /* @__PURE__ */ new Map(), H = !0, J = I[0], tt = 0; tt < I.length; tt++) {
      var nt = I[tt], ot = ve(nt), it = Nn(nt) === Rs, Dt = [At, xt].indexOf(ot) >= 0, qt = Dt ? "width" : "height", ut = On(t, {
        placement: nt,
        boundary: h,
        rootBoundary: d,
        altBoundary: b,
        padding: u
      }), Et = Dt ? it ? $t : Nt : it ? xt : At;
      $[qt] > R[qt] && (Et = hr(Et));
      var Ke = hr(Et), Yt = [];
      if (r && Yt.push(ut[ot] <= 0), l && Yt.push(ut[Et] <= 0, ut[Ke] <= 0), Yt.every(function(Xt) {
        return Xt;
      })) {
        J = nt, H = !1;
        break;
      }
      P.set(nt, Yt);
    }
    if (H)
      for (var Y = _ ? 3 : 1, bs = function(G) {
        var de = I.find(function(Ge) {
          var at = P.get(Ge);
          if (at)
            return at.slice(0, G).every(function(Ye) {
              return Ye;
            });
        });
        if (de)
          return J = de, "break";
      }, ke = Y; ke > 0; ke--) {
        var gt = bs(ke);
        if (gt === "break") break;
      }
    t.placement !== J && (t.modifiersData[n]._skip = !0, t.placement = J, t.reset = !0);
  }
}
const Pu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: hf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Bl(e, t, s) {
  return s === void 0 && (s = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - s.y,
    right: e.right - t.width + s.x,
    bottom: e.bottom - t.height + s.y,
    left: e.left - t.width - s.x
  };
}
function Pl(e) {
  return [At, $t, xt, Nt].some(function(t) {
    return e[t] >= 0;
  });
}
function ff(e) {
  var t = e.state, s = e.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = On(t, {
    elementContext: "reference"
  }), l = On(t, {
    altBoundary: !0
  }), a = Bl(o, n), u = Bl(l, i, r), h = Pl(a), d = Pl(u);
  t.modifiersData[s] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
    isReferenceHidden: h,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": d
  });
}
const ju = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ff
};
function pf(e, t, s) {
  var n = ve(e), i = [Nt, At].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, t, {
    placement: e
  })) : s, o = r[0], l = r[1];
  return o = o || 0, l = (l || 0) * i, [Nt, $t].indexOf(n) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function gf(e) {
  var t = e.state, s = e.options, n = e.name, i = s.offset, r = i === void 0 ? [0, 0] : i, o = Fa.reduce(function(h, d) {
    return h[d] = pf(d, t.rects, r), h;
  }, {}), l = o[t.placement], a = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = o;
}
const Vu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: gf
};
function mf(e) {
  var t = e.state, s = e.name;
  t.modifiersData[s] = Bu({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ja = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: mf,
  data: {}
};
function bf(e) {
  return e === "x" ? "y" : "x";
}
function yf(e) {
  var t = e.state, s = e.options, n = e.name, i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, l = o === void 0 ? !1 : o, a = s.boundary, u = s.rootBoundary, h = s.altBoundary, d = s.padding, b = s.tether, y = b === void 0 ? !0 : b, _ = s.tetherOffset, E = _ === void 0 ? 0 : _, w = On(t, {
    boundary: a,
    rootBoundary: u,
    padding: d,
    altBoundary: h
  }), A = ve(t.placement), k = Nn(t.placement), L = !k, I = Ka(A), $ = bf(I), R = t.modifiersData.popperOffsets, P = t.rects.reference, H = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
    placement: t.placement
  })) : E, tt = typeof J == "number" ? {
    mainAxis: J,
    altAxis: J
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, J), nt = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, ot = {
    x: 0,
    y: 0
  };
  if (R) {
    if (r) {
      var it, Dt = I === "y" ? At : Nt, qt = I === "y" ? xt : $t, ut = I === "y" ? "height" : "width", Et = R[I], Ke = Et + w[Dt], Yt = Et - w[qt], Y = y ? -H[ut] / 2 : 0, bs = k === Rs ? P[ut] : H[ut], ke = k === Rs ? -H[ut] : -P[ut], gt = t.elements.arrow, Xt = y && gt ? Wa(gt) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : $u(), de = G[Dt], Ge = G[qt], at = li(0, P[ut], Xt[ut]), Ye = L ? P[ut] / 2 - Y - at - de - tt.mainAxis : bs - at - de - tt.mainAxis, Gs = L ? -P[ut] / 2 + Y + at + Ge + tt.mainAxis : ke + at + Ge + tt.mainAxis, Ce = t.elements.arrow && Ti(t.elements.arrow), ys = Ce ? I === "y" ? Ce.clientTop || 0 : Ce.clientLeft || 0 : 0, vs = (it = nt == null ? void 0 : nt[I]) != null ? it : 0, _s = Et + Ye - vs - ys, Ys = Et + Gs - vs, Xe = li(y ? yr(Ke, _s) : Ke, Et, y ? $s(Yt, Ys) : Yt);
      R[I] = Xe, ot[I] = Xe - Et;
    }
    if (l) {
      var Es, qn = I === "x" ? At : Nt, Bn = I === "x" ? xt : $t, Ot = R[$], he = $ === "y" ? "height" : "width", ws = Ot + w[qn], Ts = Ot - w[Bn], kt = [At, Nt].indexOf(A) !== -1, Se = (Es = nt == null ? void 0 : nt[$]) != null ? Es : 0, Xs = kt ? ws : Ot - P[he] - H[he] - Se + tt.altAxis, fe = kt ? Ot + P[he] + H[he] - Se - tt.altAxis : Ts, Le = y && kt ? Gh(Xs, Ot, fe) : li(y ? Xs : ws, Ot, y ? fe : Ts);
      R[$] = Le, ot[$] = Le - Ot;
    }
    t.modifiersData[n] = ot;
  }
}
const Uu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: yf,
  requiresIfExists: ["offset"]
};
function vf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function _f(e) {
  return e === Rt(e) || !zt(e) ? Xa(e) : vf(e);
}
function Ef(e) {
  var t = e.getBoundingClientRect(), s = Tn(t.width) / e.offsetWidth || 1, n = Tn(t.height) / e.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function wf(e, t, s) {
  s === void 0 && (s = !1);
  var n = zt(t), i = zt(t) && Ef(t), r = hs(t), o = An(e, i, s), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && ((Te(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Qa(r)) && (l = _f(t)), zt(t) ? (a = An(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Za(r))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function Tf(e) {
  var t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    s.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(l) {
      if (!s.has(l)) {
        var a = t.get(l);
        a && i(a);
      }
    }), n.push(r);
  }
  return e.forEach(function(r) {
    s.has(r.name) || i(r);
  }), n;
}
function Af(e) {
  var t = Tf(e);
  return Lu.reduce(function(s, n) {
    return s.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Nf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(s) {
      Promise.resolve().then(function() {
        t = void 0, s(e());
      });
    })), t;
  };
}
function Of(e) {
  var t = e.reduce(function(s, n) {
    var i = s[n.name];
    return s[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, s;
  }, {});
  return Object.keys(t).map(function(s) {
    return t[s];
  });
}
var jl = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Vl() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Ir(e) {
  e === void 0 && (e = {});
  var t = e, s = t.defaultModifiers, n = s === void 0 ? [] : s, i = t.defaultOptions, r = i === void 0 ? jl : i;
  return function(l, a, u) {
    u === void 0 && (u = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, jl, r),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], b = !1, y = {
      state: h,
      setOptions: function(A) {
        var k = typeof A == "function" ? A(h.options) : A;
        E(), h.options = Object.assign({}, r, h.options, k), h.scrollParents = {
          reference: Ms(l) ? ci(l) : l.contextElement ? ci(l.contextElement) : [],
          popper: ci(a)
        };
        var L = Af(Of([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = L.filter(function(I) {
          return I.enabled;
        }), _(), y.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var A = h.elements, k = A.reference, L = A.popper;
          if (Vl(k, L)) {
            h.rects = {
              reference: wf(k, Ti(L), h.options.strategy === "fixed"),
              popper: Wa(L)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(tt) {
              return h.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var I = 0; I < h.orderedModifiers.length; I++) {
              if (h.reset === !0) {
                h.reset = !1, I = -1;
                continue;
              }
              var $ = h.orderedModifiers[I], R = $.fn, P = $.options, H = P === void 0 ? {} : P, J = $.name;
              typeof R == "function" && (h = R({
                state: h,
                options: H,
                name: J,
                instance: y
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Nf(function() {
        return new Promise(function(w) {
          y.forceUpdate(), w(h);
        });
      }),
      destroy: function() {
        E(), b = !0;
      }
    };
    if (!Vl(l, a))
      return y;
    y.setOptions(u).then(function(w) {
      !b && u.onFirstUpdate && u.onFirstUpdate(w);
    });
    function _() {
      h.orderedModifiers.forEach(function(w) {
        var A = w.name, k = w.options, L = k === void 0 ? {} : k, I = w.effect;
        if (typeof I == "function") {
          var $ = I({
            state: h,
            name: A,
            instance: y,
            options: L
          }), R = function() {
          };
          d.push($ || R);
        }
      });
    }
    function E() {
      d.forEach(function(w) {
        return w();
      }), d = [];
    }
    return y;
  };
}
var kf = /* @__PURE__ */ Ir(), Cf = [Ya, Ja, Ga, za], Sf = /* @__PURE__ */ Ir({
  defaultModifiers: Cf
}), Lf = [Ya, Ja, Ga, za, Vu, Pu, Uu, Du, ju], tl = /* @__PURE__ */ Ir({
  defaultModifiers: Lf
});
const Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Ou,
  afterRead: Tu,
  afterWrite: Su,
  applyStyles: za,
  arrow: Du,
  auto: Sr,
  basePlacements: $n,
  beforeMain: Au,
  beforeRead: Eu,
  beforeWrite: ku,
  bottom: xt,
  clippingParents: vu,
  computeStyles: Ga,
  createPopper: tl,
  createPopperBase: kf,
  createPopperLite: Sf,
  detectOverflow: On,
  end: wn,
  eventListeners: Ya,
  flip: Pu,
  hide: ju,
  left: Nt,
  main: Nu,
  modifierPhases: Lu,
  offset: Vu,
  placements: Fa,
  popper: cn,
  popperGenerator: Ir,
  popperOffsets: Ja,
  preventOverflow: Uu,
  read: wu,
  reference: _u,
  right: $t,
  start: Rs,
  top: At,
  variationPlacements: ca,
  viewport: Ua,
  write: Cu
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Je = /* @__PURE__ */ new Map(), Mo = {
  set(e, t, s) {
    Je.has(e) || Je.set(e, /* @__PURE__ */ new Map());
    const n = Je.get(e);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, s);
  },
  get(e, t) {
    return Je.has(e) && Je.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!Je.has(e))
      return;
    const s = Je.get(e);
    s.delete(t), s.size === 0 && Je.delete(e);
  }
}, If = 1e6, xf = 1e3, ha = "transitionend", Hu = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, s) => `#${CSS.escape(s)}`)), e), $f = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), Rf = (e) => {
  do
    e += Math.floor(Math.random() * If);
  while (document.getElementById(e));
  return e;
}, Mf = (e) => {
  if (!e)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: s
  } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), i = Number.parseFloat(s);
  return !n && !i ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * xf);
}, zu = (e) => {
  e.dispatchEvent(new Event(ha));
}, Be = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), ls = (e) => Be(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(Hu(e)) : null, Rn = (e) => {
  if (!Be(e) || e.getClientRects().length === 0)
    return !1;
  const t = getComputedStyle(e).getPropertyValue("visibility") === "visible", s = e.closest("details:not([open])");
  if (!s)
    return t;
  if (s !== e) {
    const n = e.closest("summary");
    if (n && n.parentNode !== s || n === null)
      return !1;
  }
  return t;
}, cs = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Wu = (e) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof e.getRootNode == "function") {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return e instanceof ShadowRoot ? e : e.parentNode ? Wu(e.parentNode) : null;
}, vr = () => {
}, Ai = (e) => {
  e.offsetHeight;
}, Ku = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Do = [], Df = (e) => {
  document.readyState === "loading" ? (Do.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Do)
      t();
  }), Do.push(e)) : e();
}, Wt = () => document.documentElement.dir === "rtl", Gt = (e) => {
  Df(() => {
    const t = Ku();
    if (t) {
      const s = e.NAME, n = t.fn[s];
      t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = n, e.jQueryInterface);
    }
  });
}, Lt = (e, t = [], s = e) => typeof e == "function" ? e(...t) : s, Gu = (e, t, s = !0) => {
  if (!s) {
    Lt(e);
    return;
  }
  const i = Mf(t) + 5;
  let r = !1;
  const o = ({
    target: l
  }) => {
    l === t && (r = !0, t.removeEventListener(ha, o), Lt(e));
  };
  t.addEventListener(ha, o), setTimeout(() => {
    r || zu(t);
  }, i);
}, el = (e, t, s, n) => {
  const i = e.length;
  let r = e.indexOf(t);
  return r === -1 ? !s && n ? e[i - 1] : e[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), e[Math.max(0, Math.min(r, i - 1))]);
}, qf = /[^.]*(?=\..*)\.|.*/, Bf = /\..*/, Pf = /::\d+$/, qo = {};
let Ul = 1;
const Yu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, jf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Xu(e, t) {
  return t && `${t}::${Ul++}` || e.uidEvent || Ul++;
}
function Zu(e) {
  const t = Xu(e);
  return e.uidEvent = t, qo[t] = qo[t] || {}, qo[t];
}
function Vf(e, t) {
  return function s(n) {
    return sl(n, {
      delegateTarget: e
    }), s.oneOff && x.off(e, n.type, t), t.apply(e, [n]);
  };
}
function Uf(e, t, s) {
  return function n(i) {
    const r = e.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const l of r)
        if (l === o)
          return sl(i, {
            delegateTarget: o
          }), n.oneOff && x.off(e, i.type, t, s), s.apply(o, [i]);
  };
}
function Qu(e, t, s = null) {
  return Object.values(e).find((n) => n.callable === t && n.delegationSelector === s);
}
function Ju(e, t, s) {
  const n = typeof t == "string", i = n ? s : t || s;
  let r = td(e);
  return jf.has(r) || (r = e), [n, i, r];
}
function Fl(e, t, s, n, i) {
  if (typeof t != "string" || !e)
    return;
  let [r, o, l] = Ju(t, s, n);
  t in Yu && (o = ((_) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return _.call(this, E);
  })(o));
  const a = Zu(e), u = a[l] || (a[l] = {}), h = Qu(u, o, r ? s : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const d = Xu(o, t.replace(qf, "")), b = r ? Uf(e, s, o) : Vf(e, o);
  b.delegationSelector = r ? s : null, b.callable = o, b.oneOff = i, b.uidEvent = d, u[d] = b, e.addEventListener(l, b, r);
}
function fa(e, t, s, n, i) {
  const r = Qu(t[s], n, i);
  r && (e.removeEventListener(s, r, !!i), delete t[s][r.uidEvent]);
}
function Ff(e, t, s, n) {
  const i = t[s] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && fa(e, t, s, o.callable, o.delegationSelector);
}
function td(e) {
  return e = e.replace(Bf, ""), Yu[e] || e;
}
const x = {
  on(e, t, s, n) {
    Fl(e, t, s, n, !1);
  },
  one(e, t, s, n) {
    Fl(e, t, s, n, !0);
  },
  off(e, t, s, n) {
    if (typeof t != "string" || !e)
      return;
    const [i, r, o] = Ju(t, s, n), l = o !== t, a = Zu(e), u = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(u).length)
        return;
      fa(e, a, o, r, i ? s : null);
      return;
    }
    if (h)
      for (const d of Object.keys(a))
        Ff(e, a, d, t.slice(1));
    for (const [d, b] of Object.entries(u)) {
      const y = d.replace(Pf, "");
      (!l || t.includes(y)) && fa(e, a, o, b.callable, b.delegationSelector);
    }
  },
  trigger(e, t, s) {
    if (typeof t != "string" || !e)
      return null;
    const n = Ku(), i = td(t), r = t !== i;
    let o = null, l = !0, a = !0, u = !1;
    r && n && (o = n.Event(t, s), n(e).trigger(o), l = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), u = o.isDefaultPrevented());
    const h = sl(new Event(t, {
      bubbles: l,
      cancelable: !0
    }), s);
    return u && h.preventDefault(), a && e.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function sl(e, t = {}) {
  for (const [s, n] of Object.entries(t))
    try {
      e[s] = n;
    } catch {
      Object.defineProperty(e, s, {
        configurable: !0,
        get() {
          return n;
        }
      });
    }
  return e;
}
function Hl(e) {
  if (e === "true")
    return !0;
  if (e === "false")
    return !1;
  if (e === Number(e).toString())
    return Number(e);
  if (e === "" || e === "null")
    return null;
  if (typeof e != "string")
    return e;
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    return e;
  }
}
function Bo(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Pe = {
  setDataAttribute(e, t, s) {
    e.setAttribute(`data-bs-${Bo(t)}`, s);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Bo(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, s = Object.keys(e.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of s) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Hl(e.dataset[n]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Hl(e.getAttribute(`data-bs-${Bo(t)}`));
  }
};
class Ni {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, s) {
    const n = Be(s) ? Pe.getDataAttribute(s, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...Be(s) ? Pe.getDataAttributes(s) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, s = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(s)) {
      const r = t[n], o = Be(r) ? "element" : $f(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Hf = "5.3.3";
class oe extends Ni {
  constructor(t, s) {
    super(), t = ls(t), t && (this._element = t, this._config = this._getConfig(s), Mo.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Mo.remove(this._element, this.constructor.DATA_KEY), x.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, s, n = !0) {
    Gu(t, s, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Mo.get(ls(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, s = {}) {
    return this.getInstance(t) || new this(t, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return Hf;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const Po = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let s = e.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), t = s && s !== "#" ? s.trim() : null;
  }
  return t ? t.split(",").map((s) => Hu(s)).join(",") : null;
}, V = {
  find(e, t = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t, e));
  },
  findOne(e, t = document.documentElement) {
    return Element.prototype.querySelector.call(t, e);
  },
  children(e, t) {
    return [].concat(...e.children).filter((s) => s.matches(t));
  },
  parents(e, t) {
    const s = [];
    let n = e.parentNode.closest(t);
    for (; n; )
      s.push(n), n = n.parentNode.closest(t);
    return s;
  },
  prev(e, t) {
    let s = e.previousElementSibling;
    for (; s; ) {
      if (s.matches(t))
        return [s];
      s = s.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(e, t) {
    let s = e.nextElementSibling;
    for (; s; ) {
      if (s.matches(t))
        return [s];
      s = s.nextElementSibling;
    }
    return [];
  },
  focusableChildren(e) {
    const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((s) => `${s}:not([tabindex^="-"])`).join(",");
    return this.find(t, e).filter((s) => !cs(s) && Rn(s));
  },
  getSelectorFromElement(e) {
    const t = Po(e);
    return t && V.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Po(e);
    return t ? V.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Po(e);
    return t ? V.find(t) : [];
  }
}, xr = (e, t = "hide") => {
  const s = `click.dismiss${e.EVENT_KEY}`, n = e.NAME;
  x.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), cs(this))
      return;
    const r = V.getElementFromSelector(this) || this.closest(`.${n}`);
    e.getOrCreateInstance(r)[t]();
  });
}, zf = "alert", Wf = "bs.alert", ed = `.${Wf}`, Kf = `close${ed}`, Gf = `closed${ed}`, Yf = "fade", Xf = "show";
class $r extends oe {
  // Getters
  static get NAME() {
    return zf;
  }
  // Public
  close() {
    if (x.trigger(this._element, Kf).defaultPrevented)
      return;
    this._element.classList.remove(Xf);
    const s = this._element.classList.contains(Yf);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), x.trigger(this._element, Gf), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = $r.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
xr($r, "close");
Gt($r);
const Zf = "button", Qf = "bs.button", Jf = `.${Qf}`, tp = ".data-api", ep = "active", zl = '[data-bs-toggle="button"]', sp = `click${Jf}${tp}`;
class Rr extends oe {
  // Getters
  static get NAME() {
    return Zf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(ep));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Rr.getOrCreateInstance(this);
      t === "toggle" && s[t]();
    });
  }
}
x.on(document, sp, zl, (e) => {
  e.preventDefault();
  const t = e.target.closest(zl);
  Rr.getOrCreateInstance(t).toggle();
});
Gt(Rr);
const np = "swipe", Mn = ".bs.swipe", ip = `touchstart${Mn}`, rp = `touchmove${Mn}`, op = `touchend${Mn}`, ap = `pointerdown${Mn}`, lp = `pointerup${Mn}`, cp = "touch", up = "pen", dp = "pointer-event", hp = 40, fp = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, pp = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class _r extends Ni {
  constructor(t, s) {
    super(), this._element = t, !(!t || !_r.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return fp;
  }
  static get DefaultType() {
    return pp;
  }
  static get NAME() {
    return np;
  }
  // Public
  dispose() {
    x.off(this._element, Mn);
  }
  // Private
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), Lt(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= hp)
      return;
    const s = t / this._deltaX;
    this._deltaX = 0, s && Lt(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (x.on(this._element, ap, (t) => this._start(t)), x.on(this._element, lp, (t) => this._end(t)), this._element.classList.add(dp)) : (x.on(this._element, ip, (t) => this._start(t)), x.on(this._element, rp, (t) => this._move(t)), x.on(this._element, op, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === up || t.pointerType === cp);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const gp = "carousel", mp = "bs.carousel", fs = `.${mp}`, sd = ".data-api", bp = "ArrowLeft", yp = "ArrowRight", vp = 500, Jn = "next", on = "prev", un = "left", fr = "right", _p = `slide${fs}`, jo = `slid${fs}`, Ep = `keydown${fs}`, wp = `mouseenter${fs}`, Tp = `mouseleave${fs}`, Ap = `dragstart${fs}`, Np = `load${fs}${sd}`, Op = `click${fs}${sd}`, nd = "carousel", tr = "active", kp = "slide", Cp = "carousel-item-end", Sp = "carousel-item-start", Lp = "carousel-item-next", Ip = "carousel-item-prev", id = ".active", rd = ".carousel-item", xp = id + rd, $p = ".carousel-item img", Rp = ".carousel-indicators", Mp = "[data-bs-slide], [data-bs-slide-to]", Dp = '[data-bs-ride="carousel"]', qp = {
  [bp]: fr,
  [yp]: un
}, Bp = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, Pp = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Oi extends oe {
  constructor(t, s) {
    super(t, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = V.findOne(Rp, this._element), this._addEventListeners(), this._config.ride === nd && this.cycle();
  }
  // Getters
  static get Default() {
    return Bp;
  }
  static get DefaultType() {
    return Pp;
  }
  static get NAME() {
    return gp;
  }
  // Public
  next() {
    this._slide(Jn);
  }
  nextWhenVisible() {
    !document.hidden && Rn(this._element) && this.next();
  }
  prev() {
    this._slide(on);
  }
  pause() {
    this._isSliding && zu(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        x.one(this._element, jo, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const s = this._getItems();
    if (t > s.length - 1 || t < 0)
      return;
    if (this._isSliding) {
      x.one(this._element, jo, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Jn : on;
    this._slide(i, s[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  // Private
  _configAfterMerge(t) {
    return t.defaultInterval = t.interval, t;
  }
  _addEventListeners() {
    this._config.keyboard && x.on(this._element, Ep, (t) => this._keydown(t)), this._config.pause === "hover" && (x.on(this._element, wp, () => this.pause()), x.on(this._element, Tp, () => this._maybeEnableCycle())), this._config.touch && _r.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of V.find($p, this._element))
      x.on(n, Ap, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(un)),
      rightCallback: () => this._slide(this._directionToOrder(fr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), vp + this._config.interval));
      }
    };
    this._swipeHelper = new _r(this._element, s);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const s = qp[t.key];
    s && (t.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const s = V.findOne(id, this._indicatorsElement);
    s.classList.remove(tr), s.removeAttribute("aria-current");
    const n = V.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(tr), n.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t)
      return;
    const s = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = s || this._config.defaultInterval;
  }
  _slide(t, s = null) {
    if (this._isSliding)
      return;
    const n = this._getActive(), i = t === Jn, r = s || el(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), l = (y) => x.trigger(this._element, y, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (l(_p).defaultPrevented || !n || !r)
      return;
    const u = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? Sp : Cp, d = i ? Lp : Ip;
    r.classList.add(d), Ai(r), n.classList.add(h), r.classList.add(h);
    const b = () => {
      r.classList.remove(h, d), r.classList.add(tr), n.classList.remove(tr, d, h), this._isSliding = !1, l(jo);
    };
    this._queueCallback(b, n, this._isAnimated()), u && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(kp);
  }
  _getActive() {
    return V.findOne(xp, this._element);
  }
  _getItems() {
    return V.find(rd, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Wt() ? t === un ? on : Jn : t === un ? Jn : on;
  }
  _orderToDirection(t) {
    return Wt() ? t === on ? un : fr : t === on ? fr : un;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Oi.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        s.to(t);
        return;
      }
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
x.on(document, Op, Mp, function(e) {
  const t = V.getElementFromSelector(this);
  if (!t || !t.classList.contains(nd))
    return;
  e.preventDefault();
  const s = Oi.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n), s._maybeEnableCycle();
    return;
  }
  if (Pe.getDataAttribute(this, "slide") === "next") {
    s.next(), s._maybeEnableCycle();
    return;
  }
  s.prev(), s._maybeEnableCycle();
});
x.on(window, Np, () => {
  const e = V.find(Dp);
  for (const t of e)
    Oi.getOrCreateInstance(t);
});
Gt(Oi);
const jp = "collapse", Vp = "bs.collapse", ki = `.${Vp}`, Up = ".data-api", Fp = `show${ki}`, Hp = `shown${ki}`, zp = `hide${ki}`, Wp = `hidden${ki}`, Kp = `click${ki}${Up}`, Vo = "show", yn = "collapse", er = "collapsing", Gp = "collapsed", Yp = `:scope .${yn} .${yn}`, Xp = "collapse-horizontal", Zp = "width", Qp = "height", Jp = ".collapse.show, .collapse.collapsing", pa = '[data-bs-toggle="collapse"]', tg = {
  parent: null,
  toggle: !0
}, eg = {
  parent: "(null|element)",
  toggle: "boolean"
};
class pi extends oe {
  constructor(t, s) {
    super(t, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = V.find(pa);
    for (const i of n) {
      const r = V.getSelectorFromElement(i), o = V.find(r).filter((l) => l === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return tg;
  }
  static get DefaultType() {
    return eg;
  }
  static get NAME() {
    return jp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(Jp).filter((l) => l !== this._element).map((l) => pi.getOrCreateInstance(l, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || x.trigger(this._element, Fp).defaultPrevented)
      return;
    for (const l of t)
      l.hide();
    const n = this._getDimension();
    this._element.classList.remove(yn), this._element.classList.add(er), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(er), this._element.classList.add(yn, Vo), this._element.style[n] = "", x.trigger(this._element, Hp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || x.trigger(this._element, zp).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, Ai(this._element), this._element.classList.add(er), this._element.classList.remove(yn, Vo);
    for (const i of this._triggerArray) {
      const r = V.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(er), this._element.classList.add(yn), x.trigger(this._element, Wp);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Vo);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = ls(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(Xp) ? Zp : Qp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(pa);
    for (const s of t) {
      const n = V.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const s = V.find(Yp, this._config.parent);
    return V.find(t, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(t, s) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(Gp, !s), n.setAttribute("aria-expanded", s);
  }
  // Static
  static jQueryInterface(t) {
    const s = {};
    return typeof t == "string" && /show|hide/.test(t) && (s.toggle = !1), this.each(function() {
      const n = pi.getOrCreateInstance(this, s);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
x.on(document, Kp, pa, function(e) {
  (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
  for (const t of V.getMultipleElementsFromSelector(this))
    pi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Gt(pi);
const Wl = "dropdown", sg = "bs.dropdown", js = `.${sg}`, nl = ".data-api", ng = "Escape", Kl = "Tab", ig = "ArrowUp", Gl = "ArrowDown", rg = 2, og = `hide${js}`, ag = `hidden${js}`, lg = `show${js}`, cg = `shown${js}`, od = `click${js}${nl}`, ad = `keydown${js}${nl}`, ug = `keyup${js}${nl}`, dn = "show", dg = "dropup", hg = "dropend", fg = "dropstart", pg = "dropup-center", gg = "dropdown-center", Is = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', mg = `${Is}.${dn}`, pr = ".dropdown-menu", bg = ".navbar", yg = ".navbar-nav", vg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", _g = Wt() ? "top-end" : "top-start", Eg = Wt() ? "top-start" : "top-end", wg = Wt() ? "bottom-end" : "bottom-start", Tg = Wt() ? "bottom-start" : "bottom-end", Ag = Wt() ? "left-start" : "right-start", Ng = Wt() ? "right-start" : "left-start", Og = "top", kg = "bottom", Cg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, Sg = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class _e extends oe {
  constructor(t, s) {
    super(t, s), this._popper = null, this._parent = this._element.parentNode, this._menu = V.next(this._element, pr)[0] || V.prev(this._element, pr)[0] || V.findOne(pr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Cg;
  }
  static get DefaultType() {
    return Sg;
  }
  static get NAME() {
    return Wl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (cs(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!x.trigger(this._element, lg, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(yg))
        for (const n of [].concat(...document.body.children))
          x.on(n, "mouseover", vr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(dn), this._element.classList.add(dn), x.trigger(this._element, cg, t);
    }
  }
  hide() {
    if (cs(this._element) || !this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(t) {
    if (!x.trigger(this._element, og, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          x.off(n, "mouseover", vr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(dn), this._element.classList.remove(dn), this._element.setAttribute("aria-expanded", "false"), Pe.removeDataAttribute(this._menu, "popper"), x.trigger(this._element, ag, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !Be(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Wl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Fu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : Be(this._config.reference) ? t = ls(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = tl(t, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(dn);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(hg))
      return Ag;
    if (t.classList.contains(fg))
      return Ng;
    if (t.classList.contains(pg))
      return Og;
    if (t.classList.contains(gg))
      return kg;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(dg) ? s ? Eg : _g : s ? Tg : wg;
  }
  _detectNavbar() {
    return this._element.closest(bg) !== null;
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((s) => Number.parseInt(s, 10)) : typeof t == "function" ? (s) => t(s, this._element) : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    return (this._inNavbar || this._config.display === "static") && (Pe.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Lt(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({
    key: t,
    target: s
  }) {
    const n = V.find(vg, this._menu).filter((i) => Rn(i));
    n.length && el(n, s, t === Gl, !n.includes(s)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = _e.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === rg || t.type === "keyup" && t.key !== Kl)
      return;
    const s = V.find(mg);
    for (const n of s) {
      const i = _e.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === Kl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const l = {
        relatedTarget: i._element
      };
      t.type === "click" && (l.clickEvent = t), i._completeHide(l);
    }
  }
  static dataApiKeydownHandler(t) {
    const s = /input|textarea/i.test(t.target.tagName), n = t.key === ng, i = [ig, Gl].includes(t.key);
    if (!i && !n || s && !n)
      return;
    t.preventDefault();
    const r = this.matches(Is) ? this : V.prev(this, Is)[0] || V.next(this, Is)[0] || V.findOne(Is, t.delegateTarget.parentNode), o = _e.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
x.on(document, ad, Is, _e.dataApiKeydownHandler);
x.on(document, ad, pr, _e.dataApiKeydownHandler);
x.on(document, od, _e.clearMenus);
x.on(document, ug, _e.clearMenus);
x.on(document, od, Is, function(e) {
  e.preventDefault(), _e.getOrCreateInstance(this).toggle();
});
Gt(_e);
const ld = "backdrop", Lg = "fade", Yl = "show", Xl = `mousedown.bs.${ld}`, Ig = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, xg = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class cd extends Ni {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return Ig;
  }
  static get DefaultType() {
    return xg;
  }
  static get NAME() {
    return ld;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._append();
    const s = this._getElement();
    this._config.isAnimated && Ai(s), s.classList.add(Yl), this._emulateAnimation(() => {
      Lt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._getElement().classList.remove(Yl), this._emulateAnimation(() => {
      this.dispose(), Lt(t);
    });
  }
  dispose() {
    this._isAppended && (x.off(this._element, Xl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(Lg), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = ls(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), x.on(t, Xl, () => {
      Lt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Gu(t, this._getElement(), this._config.isAnimated);
  }
}
const $g = "focustrap", Rg = "bs.focustrap", Er = `.${Rg}`, Mg = `focusin${Er}`, Dg = `keydown.tab${Er}`, qg = "Tab", Bg = "forward", Zl = "backward", Pg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, jg = {
  autofocus: "boolean",
  trapElement: "element"
};
class ud extends Ni {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Pg;
  }
  static get DefaultType() {
    return jg;
  }
  static get NAME() {
    return $g;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), x.off(document, Er), x.on(document, Mg, (t) => this._handleFocusin(t)), x.on(document, Dg, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, x.off(document, Er));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: s
    } = this._config;
    if (t.target === document || t.target === s || s.contains(t.target))
      return;
    const n = V.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === Zl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === qg && (this._lastTabNavDirection = t.shiftKey ? Zl : Bg);
  }
}
const Ql = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Jl = ".sticky-top", sr = "padding-right", tc = "margin-right";
class ga {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, sr, (s) => s + t), this._setElementAttributes(Ql, sr, (s) => s + t), this._setElementAttributes(Jl, tc, (s) => s - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, sr), this._resetElementAttributes(Ql, sr), this._resetElementAttributes(Jl, tc);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t, s, n) {
    const i = this.getWidth(), r = (o) => {
      if (o !== this._element && window.innerWidth > o.clientWidth + i)
        return;
      this._saveInitialAttribute(o, s);
      const l = window.getComputedStyle(o).getPropertyValue(s);
      o.style.setProperty(s, `${n(Number.parseFloat(l))}px`);
    };
    this._applyManipulationCallback(t, r);
  }
  _saveInitialAttribute(t, s) {
    const n = t.style.getPropertyValue(s);
    n && Pe.setDataAttribute(t, s, n);
  }
  _resetElementAttributes(t, s) {
    const n = (i) => {
      const r = Pe.getDataAttribute(i, s);
      if (r === null) {
        i.style.removeProperty(s);
        return;
      }
      Pe.removeDataAttribute(i, s), i.style.setProperty(s, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, s) {
    if (Be(t)) {
      s(t);
      return;
    }
    for (const n of V.find(t, this._element))
      s(n);
  }
}
const Vg = "modal", Ug = "bs.modal", Kt = `.${Ug}`, Fg = ".data-api", Hg = "Escape", zg = `hide${Kt}`, Wg = `hidePrevented${Kt}`, dd = `hidden${Kt}`, hd = `show${Kt}`, Kg = `shown${Kt}`, Gg = `resize${Kt}`, Yg = `click.dismiss${Kt}`, Xg = `mousedown.dismiss${Kt}`, Zg = `keydown.dismiss${Kt}`, Qg = `click${Kt}${Fg}`, ec = "modal-open", Jg = "fade", sc = "show", Uo = "modal-static", tm = ".modal.show", em = ".modal-dialog", sm = ".modal-body", nm = '[data-bs-toggle="modal"]', im = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, rm = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Ds extends oe {
  constructor(t, s) {
    super(t, s), this._dialog = V.findOne(em, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new ga(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return im;
  }
  static get DefaultType() {
    return rm;
  }
  static get NAME() {
    return Vg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || x.trigger(this._element, hd, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(ec), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || x.trigger(this._element, zg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(sc), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    x.off(window, Kt), x.off(this._dialog, Kt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new cd({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new ud({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = V.findOne(sm, this._dialog);
    s && (s.scrollTop = 0), Ai(this._element), this._element.classList.add(sc);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, x.trigger(this._element, Kg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    x.on(this._element, Zg, (t) => {
      if (t.key === Hg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), x.on(window, Gg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), x.on(this._element, Xg, (t) => {
      x.one(this._element, Yg, (s) => {
        if (!(this._element !== t.target || this._element !== s.target)) {
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          this._config.backdrop && this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
      document.body.classList.remove(ec), this._resetAdjustments(), this._scrollBar.reset(), x.trigger(this._element, dd);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Jg);
  }
  _triggerBackdropTransition() {
    if (x.trigger(this._element, Wg).defaultPrevented)
      return;
    const s = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(Uo) || (s || (this._element.style.overflowY = "hidden"), this._element.classList.add(Uo), this._queueCallback(() => {
      this._element.classList.remove(Uo), this._queueCallback(() => {
        this._element.style.overflowY = n;
      }, this._dialog);
    }, this._dialog), this._element.focus());
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const t = this._element.scrollHeight > document.documentElement.clientHeight, s = this._scrollBar.getWidth(), n = s > 0;
    if (n && !t) {
      const i = Wt() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${s}px`;
    }
    if (!n && t) {
      const i = Wt() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${s}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, s) {
    return this.each(function() {
      const n = Ds.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](s);
      }
    });
  }
}
x.on(document, Qg, nm, function(e) {
  const t = V.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), x.one(t, hd, (i) => {
    i.defaultPrevented || x.one(t, dd, () => {
      Rn(this) && this.focus();
    });
  });
  const s = V.findOne(tm);
  s && Ds.getInstance(s).hide(), Ds.getOrCreateInstance(t).toggle(this);
});
xr(Ds);
Gt(Ds);
const om = "offcanvas", am = "bs.offcanvas", He = `.${am}`, fd = ".data-api", lm = `load${He}${fd}`, cm = "Escape", nc = "show", ic = "showing", rc = "hiding", um = "offcanvas-backdrop", pd = ".offcanvas.show", dm = `show${He}`, hm = `shown${He}`, fm = `hide${He}`, oc = `hidePrevented${He}`, gd = `hidden${He}`, pm = `resize${He}`, gm = `click${He}${fd}`, mm = `keydown.dismiss${He}`, bm = '[data-bs-toggle="offcanvas"]', ym = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, vm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class us extends oe {
  constructor(t, s) {
    super(t, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return ym;
  }
  static get DefaultType() {
    return vm;
  }
  static get NAME() {
    return om;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || x.trigger(this._element, dm, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new ga().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(ic);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(nc), this._element.classList.remove(ic), x.trigger(this._element, hm, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || x.trigger(this._element, fm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(rc), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(nc, rc), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new ga().reset(), x.trigger(this._element, gd);
    };
    this._queueCallback(s, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const t = () => {
      if (this._config.backdrop === "static") {
        x.trigger(this._element, oc);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new cd({
      className: um,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? t : null
    });
  }
  _initializeFocusTrap() {
    return new ud({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    x.on(this._element, mm, (t) => {
      if (t.key === cm) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        x.trigger(this._element, oc);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = us.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
x.on(document, gm, bm, function(e) {
  const t = V.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), cs(this))
    return;
  x.one(t, gd, () => {
    Rn(this) && this.focus();
  });
  const s = V.findOne(pd);
  s && s !== t && us.getInstance(s).hide(), us.getOrCreateInstance(t).toggle(this);
});
x.on(window, lm, () => {
  for (const e of V.find(pd))
    us.getOrCreateInstance(e).show();
});
x.on(window, pm, () => {
  for (const e of V.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" && us.getOrCreateInstance(e).hide();
});
xr(us);
Gt(us);
const _m = /^aria-[\w-]*$/i, md = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", _m],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
}, Em = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), wm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Tm = (e, t) => {
  const s = e.nodeName.toLowerCase();
  return t.includes(s) ? Em.has(s) ? !!wm.test(e.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function Am(e, t, s) {
  if (!e.length)
    return e;
  if (s && typeof s == "function")
    return s(e);
  const i = new window.DOMParser().parseFromString(e, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const o of r) {
    const l = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(l)) {
      o.remove();
      continue;
    }
    const a = [].concat(...o.attributes), u = [].concat(t["*"] || [], t[l] || []);
    for (const h of a)
      Tm(h, u) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const Nm = "TemplateFactory", Om = {
  allowList: md,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, km = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, Cm = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class Sm extends Ni {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return Om;
  }
  static get DefaultType() {
    return km;
  }
  static get NAME() {
    return Nm;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((t) => this._resolvePossibleFunction(t)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return this._checkContent(t), this._config.content = {
      ...this._config.content,
      ...t
    }, this;
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, r] of Object.entries(this._config.content))
      this._setContent(t, r, i);
    const s = t.children[0], n = this._resolvePossibleFunction(this._config.extraClass);
    return n && s.classList.add(...n.split(" ")), s;
  }
  // Private
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [s, n] of Object.entries(t))
      super._typeCheckConfig({
        selector: s,
        entry: n
      }, Cm);
  }
  _setContent(t, s, n) {
    const i = V.findOne(n, t);
    if (i) {
      if (s = this._resolvePossibleFunction(s), !s) {
        i.remove();
        return;
      }
      if (Be(s)) {
        this._putElementInTemplate(ls(s), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(s);
        return;
      }
      i.textContent = s;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize ? Am(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return Lt(t, [this]);
  }
  _putElementInTemplate(t, s) {
    if (this._config.html) {
      s.innerHTML = "", s.append(t);
      return;
    }
    s.textContent = t.textContent;
  }
}
const Lm = "tooltip", Im = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Fo = "fade", xm = "modal", nr = "show", $m = ".tooltip-inner", ac = `.${xm}`, lc = "hide.bs.modal", ti = "hover", Ho = "focus", Rm = "click", Mm = "manual", Dm = "hide", qm = "hidden", Bm = "show", Pm = "shown", jm = "inserted", Vm = "click", Um = "focusin", Fm = "focusout", Hm = "mouseenter", zm = "mouseleave", Wm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Wt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Wt() ? "right" : "left"
}, Km = {
  allowList: md,
  animation: !0,
  boundary: "clippingParents",
  container: !1,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: !1,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: !0,
  sanitizeFn: null,
  selector: !1,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
}, Gm = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
let Mr = class bd extends oe {
  constructor(t, s) {
    if (typeof Fu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Km;
  }
  static get DefaultType() {
    return Gm;
  }
  static get NAME() {
    return Lm;
  }
  // Public
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      if (this._activeTrigger.click = !this._activeTrigger.click, this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout), x.off(this._element.closest(ac), lc, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = x.trigger(this._element, this.constructor.eventName(Bm)), n = (Wu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), x.trigger(this._element, this.constructor.eventName(jm))), this._popper = this._createPopper(i), i.classList.add(nr), "ontouchstart" in document.documentElement)
      for (const l of [].concat(...document.body.children))
        x.on(l, "mouseover", vr);
    const o = () => {
      x.trigger(this._element, this.constructor.eventName(Pm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || x.trigger(this._element, this.constructor.eventName(Dm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(nr), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        x.off(i, "mouseover", vr);
    this._activeTrigger[Rm] = !1, this._activeTrigger[Ho] = !1, this._activeTrigger[ti] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), x.trigger(this._element, this.constructor.eventName(qm)));
    };
    this._queueCallback(n, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  // Protected
  _isWithContent() {
    return !!this._getTitle();
  }
  _getTipElement() {
    return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
  }
  _createTipElement(t) {
    const s = this._getTemplateFactory(t).toHtml();
    if (!s)
      return null;
    s.classList.remove(Fo, nr), s.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Rf(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(Fo), s;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Sm({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [$m]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(Fo);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(nr);
  }
  _createPopper(t) {
    const s = Lt(this._config.placement, [this, t, this._element]), n = Wm[s.toUpperCase()];
    return tl(this._element, t, this._getPopperConfig(n));
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((s) => Number.parseInt(s, 10)) : typeof t == "function" ? (s) => t(s, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return Lt(t, [this._element]);
  }
  _getPopperConfig(t) {
    const s = {
      placement: t,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "preSetPlacement",
        enabled: !0,
        phase: "beforeMain",
        fn: (n) => {
          this._getTipElement().setAttribute("data-popper-placement", n.state.placement);
        }
      }]
    };
    return {
      ...s,
      ...Lt(this._config.popperConfig, [s])
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const s of t)
      if (s === "click")
        x.on(this._element, this.constructor.eventName(Vm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (s !== Mm) {
        const n = s === ti ? this.constructor.eventName(Hm) : this.constructor.eventName(Um), i = s === ti ? this.constructor.eventName(zm) : this.constructor.eventName(Fm);
        x.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Ho : ti] = !0, o._enter();
        }), x.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Ho : ti] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, x.on(this._element.closest(ac), lc, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    t && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    this._isHovered = !0, this._setTimeout(() => {
      this._isHovered && this.show();
    }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
      this._isHovered || this.hide();
    }, this._config.delay.hide));
  }
  _setTimeout(t, s) {
    clearTimeout(this._timeout), this._timeout = setTimeout(t, s);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const s = Pe.getDataAttributes(this._element);
    for (const n of Object.keys(s))
      Im.has(n) && delete s[n];
    return t = {
      ...s,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : ls(t.container), typeof t.delay == "number" && (t.delay = {
      show: t.delay,
      hide: t.delay
    }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), t;
  }
  _getDelegateConfig() {
    const t = {};
    for (const [s, n] of Object.entries(this._config))
      this.constructor.Default[s] !== n && (t[s] = n);
    return t.selector = !1, t.trigger = "manual", t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = bd.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
};
Gt(Mr);
const Ym = "popover", Xm = ".popover-header", Zm = ".popover-body", Qm = {
  ...Mr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Jm = {
  ...Mr.DefaultType,
  content: "(null|string|element|function)"
};
class il extends Mr {
  // Getters
  static get Default() {
    return Qm;
  }
  static get DefaultType() {
    return Jm;
  }
  static get NAME() {
    return Ym;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Xm]: this._getTitle(),
      [Zm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = il.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
Gt(il);
const tb = "scrollspy", eb = "bs.scrollspy", rl = `.${eb}`, sb = ".data-api", nb = `activate${rl}`, cc = `click${rl}`, ib = `load${rl}${sb}`, rb = "dropdown-item", an = "active", ob = '[data-bs-spy="scroll"]', zo = "[href]", ab = ".nav, .list-group", uc = ".nav-link", lb = ".nav-item", cb = ".list-group-item", ub = `${uc}, ${lb} > ${uc}, ${cb}`, db = ".dropdown", hb = ".dropdown-toggle", fb = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, pb = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Dr extends oe {
  constructor(t, s) {
    super(t, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return fb;
  }
  static get DefaultType() {
    return pb;
  }
  static get NAME() {
    return tb;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  // Private
  _configAfterMerge(t) {
    return t.target = ls(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((s) => Number.parseFloat(s))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (x.off(this._config.target, cc), x.on(this._config.target, cc, zo, (t) => {
      const s = this._observableSections.get(t.target.hash);
      if (s) {
        t.preventDefault();
        const n = this._rootElement || window, i = s.offsetTop - this._element.offsetTop;
        if (n.scrollTo) {
          n.scrollTo({
            top: i,
            behavior: "smooth"
          });
          return;
        }
        n.scrollTop = i;
      }
    }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((s) => this._observerCallback(s), t);
  }
  // The logic of selection
  _observerCallback(t) {
    const s = (o) => this._targetLinks.get(`#${o.target.id}`), n = (o) => {
      this._previousScrollData.visibleEntryTop = o.target.offsetTop, this._process(s(o));
    }, i = (this._rootElement || document.documentElement).scrollTop, r = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const o of t) {
      if (!o.isIntersecting) {
        this._activeTarget = null, this._clearActiveClass(s(o));
        continue;
      }
      const l = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && l) {
        if (n(o), !i)
          return;
        continue;
      }
      !r && !l && n(o);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const t = V.find(zo, this._config.target);
    for (const s of t) {
      if (!s.hash || cs(s))
        continue;
      const n = V.findOne(decodeURI(s.hash), this._element);
      Rn(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(an), this._activateParents(t), x.trigger(this._element, nb, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(rb)) {
      V.findOne(hb, t.closest(db)).classList.add(an);
      return;
    }
    for (const s of V.parents(t, ab))
      for (const n of V.prev(s, ub))
        n.classList.add(an);
  }
  _clearActiveClass(t) {
    t.classList.remove(an);
    const s = V.find(`${zo}.${an}`, t);
    for (const n of s)
      n.classList.remove(an);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Dr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
x.on(window, ib, () => {
  for (const e of V.find(ob))
    Dr.getOrCreateInstance(e);
});
Gt(Dr);
const gb = "tab", mb = "bs.tab", Vs = `.${mb}`, bb = `hide${Vs}`, yb = `hidden${Vs}`, vb = `show${Vs}`, _b = `shown${Vs}`, Eb = `click${Vs}`, wb = `keydown${Vs}`, Tb = `load${Vs}`, Ab = "ArrowLeft", dc = "ArrowRight", Nb = "ArrowUp", hc = "ArrowDown", Wo = "Home", fc = "End", xs = "active", pc = "fade", Ko = "show", Ob = "dropdown", yd = ".dropdown-toggle", kb = ".dropdown-menu", Go = `:not(${yd})`, Cb = '.list-group, .nav, [role="tablist"]', Sb = ".nav-item, .list-group-item", Lb = `.nav-link${Go}, .list-group-item${Go}, [role="tab"]${Go}`, vd = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Yo = `${Lb}, ${vd}`, Ib = `.${xs}[data-bs-toggle="tab"], .${xs}[data-bs-toggle="pill"], .${xs}[data-bs-toggle="list"]`;
class kn extends oe {
  constructor(t) {
    super(t), this._parent = this._element.closest(Cb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), x.on(this._element, wb, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return gb;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const s = this._getActiveElem(), n = s ? x.trigger(s, bb, {
      relatedTarget: t
    }) : null;
    x.trigger(t, vb, {
      relatedTarget: s
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(s, t), this._activate(t, s));
  }
  // Private
  _activate(t, s) {
    if (!t)
      return;
    t.classList.add(xs), this._activate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Ko);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), x.trigger(t, _b, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(pc));
  }
  _deactivate(t, s) {
    if (!t)
      return;
    t.classList.remove(xs), t.blur(), this._deactivate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Ko);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), x.trigger(t, yb, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(pc));
  }
  _keydown(t) {
    if (![Ab, dc, Nb, hc, Wo, fc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const s = this._getChildren().filter((i) => !cs(i));
    let n;
    if ([Wo, fc].includes(t.key))
      n = s[t.key === Wo ? 0 : s.length - 1];
    else {
      const i = [dc, hc].includes(t.key);
      n = el(s, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), kn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return V.find(Yo, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, s) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const n of s)
      this._setInitialAttributesOnChild(n);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const s = this._elemIsActive(t), n = this._getOuterElement(t);
    t.setAttribute("aria-selected", s), n !== t && this._setAttributeIfNotExists(n, "role", "presentation"), s || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const s = V.getElementFromSelector(t);
    s && (this._setAttributeIfNotExists(s, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(s, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, s) {
    const n = this._getOuterElement(t);
    if (!n.classList.contains(Ob))
      return;
    const i = (r, o) => {
      const l = V.findOne(r, n);
      l && l.classList.toggle(o, s);
    };
    i(yd, xs), i(kb, Ko), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(t, s, n) {
    t.hasAttribute(s) || t.setAttribute(s, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(xs);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Yo) ? t : V.findOne(Yo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(Sb) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = kn.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
x.on(document, Eb, vd, function(e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !cs(this) && kn.getOrCreateInstance(this).show();
});
x.on(window, Tb, () => {
  for (const e of V.find(Ib))
    kn.getOrCreateInstance(e);
});
Gt(kn);
const xb = "toast", $b = "bs.toast", ps = `.${$b}`, Rb = `mouseover${ps}`, Mb = `mouseout${ps}`, Db = `focusin${ps}`, qb = `focusout${ps}`, Bb = `hide${ps}`, Pb = `hidden${ps}`, jb = `show${ps}`, Vb = `shown${ps}`, Ub = "fade", gc = "hide", ir = "show", rr = "showing", Fb = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Hb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class qr extends oe {
  constructor(t, s) {
    super(t, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Hb;
  }
  static get DefaultType() {
    return Fb;
  }
  static get NAME() {
    return xb;
  }
  // Public
  show() {
    if (x.trigger(this._element, jb).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(Ub);
    const s = () => {
      this._element.classList.remove(rr), x.trigger(this._element, Vb), this._maybeScheduleHide();
    };
    this._element.classList.remove(gc), Ai(this._element), this._element.classList.add(ir, rr), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || x.trigger(this._element, Bb).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(gc), this._element.classList.remove(rr, ir), x.trigger(this._element, Pb);
    };
    this._element.classList.add(rr), this._queueCallback(s, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(ir), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(ir);
  }
  // Private
  _maybeScheduleHide() {
    this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay)));
  }
  _onInteraction(t, s) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = s;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = s;
        break;
      }
    }
    if (s) {
      this._clearTimeout();
      return;
    }
    const n = t.relatedTarget;
    this._element === n || this._element.contains(n) || this._maybeScheduleHide();
  }
  _setListeners() {
    x.on(this._element, Rb, (t) => this._onInteraction(t, !0)), x.on(this._element, Mb, (t) => this._onInteraction(t, !1)), x.on(this._element, Db, (t) => this._onInteraction(t, !0)), x.on(this._element, qb, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = qr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
xr(qr);
Gt(qr);
function ol(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(t, s) {
    var n = e.get(t);
    n ? n.push(s) : e.set(t, [s]);
  }, off: function(t, s) {
    var n = e.get(t);
    n && (s ? n.splice(n.indexOf(s) >>> 0, 1) : e.set(t, []));
  }, emit: function(t, s) {
    var n = e.get(t);
    n && n.slice().map(function(i) {
      i(s);
    }), (n = e.get("*")) && n.slice().map(function(i) {
      i(t, s);
    });
  } };
}
function Br(e, t) {
  for (const s in t)
    t[s] instanceof Object && s in e && Object.assign(t[s], Br(e[s], t[s]));
  return Object.assign(e || {}, t);
}
function Ci(e, t, s, n) {
  try {
    return typeof e == "function" ? e(t, s, n) : e;
  } catch {
    return null;
  }
}
async function ii(e) {
  try {
    return {
      data: await e.json(),
      error: null
    };
  } catch (t) {
    return {
      data: void 0,
      error: t
    };
  }
}
function ri(e, t) {
  let s = [];
  if (t && t.errors)
    for (let n of t.errors)
      s.push({
        message: n.message,
        timeout: 3500,
        priority: "danger"
      });
  else e.status >= 400 && e.status <= 511 && s.push({
    message: e.status + (e.statusText ? " " + e.statusText : ""),
    timeout: 3500,
    priority: "danger"
  });
  return s.length > 0 ? s : null;
}
function es(e, t, s) {
  return t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), t.auth && (t.auth.type == "Basic" && t.auth.user && (t.options.headers.Authorization = "Basic " + btoa(t.auth.user + ":" + t.auth.password)), t.auth.type == "Bearer" && t.auth.token && (t.options.headers.Authorization = "Bearer " + t.auth.token), t.auth.type == "Cookie" && (t.options.credentials = "include")), t.options.body = void 0, t.options.method = e, s && Object.assign(t.options, s), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function ss(e, t, s, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (s ? "/" + s : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function ei(e, t = "-") {
  return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function zb(e) {
  let t = [];
  for (let s of e)
    t.push(wr(s));
  return t;
}
function wr(e, t = "", s = {}) {
  for (let n in e) {
    let i = t ? t + "." + n : n;
    typeof e[n] == "object" && !Array.isArray(e[n]) ? wr(e[n], i, s) : s[i] = e[n];
  }
  return s;
}
function Wb(e) {
  let t = {};
  for (let s in e) {
    let n = s.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? e[s] : {} : []), t);
  }
  return t;
}
function Si(e, t, s, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (l, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][e] ? i(e, s) : i(t[n][e]);
}
function Kb(e, t, s = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(s), i = e.map(
    (r) => t.map((o) => {
      let l = r[o.name];
      return o.template ? o.template(l, r, e) : l !== void 0 ? l : "";
    }).join(s)
  );
  return [n, ...i].join(`
`);
}
function Gb(e, t = "export.csv") {
  e = "\uFEFF" + e;
  const s = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(s), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function Yb(e) {
  return [...new Set(e)];
}
function _d(e, t) {
  e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function Ed(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 && e.push(s.value);
}
function wd(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 ? e.push(s.value) : e.splice(e.indexOf(s.value), 1);
}
function Td(e) {
  e.length = 0;
}
function Ad(e, t) {
  t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Nd(e, t) {
  t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Xb(e, t) {
  Object.keys(e).forEach((s) => {
    typeof e[s] == "function" && (e[s] = e[s](t));
  });
}
var Od = typeof global == "object" && global && global.Object === Object && global, Zb = typeof self == "object" && self && self.Object === Object && self, Oe = Od || Zb || Function("return this")(), ds = Oe.Symbol, kd = Object.prototype, Qb = kd.hasOwnProperty, Jb = kd.toString, si = ds ? ds.toStringTag : void 0;
function t1(e) {
  var t = Qb.call(e, si), s = e[si];
  try {
    e[si] = void 0;
    var n = !0;
  } catch {
  }
  var i = Jb.call(e);
  return n && (t ? e[si] = s : delete e[si]), i;
}
var e1 = Object.prototype, s1 = e1.toString;
function n1(e) {
  return s1.call(e);
}
var i1 = "[object Null]", r1 = "[object Undefined]", mc = ds ? ds.toStringTag : void 0;
function Dn(e) {
  return e == null ? e === void 0 ? r1 : i1 : mc && mc in Object(e) ? t1(e) : n1(e);
}
function Ve(e) {
  return e != null && typeof e == "object";
}
var qs = Array.isArray;
function gs(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function Cd(e) {
  return e;
}
var o1 = "[object AsyncFunction]", a1 = "[object Function]", l1 = "[object GeneratorFunction]", c1 = "[object Proxy]";
function al(e) {
  if (!gs(e))
    return !1;
  var t = Dn(e);
  return t == a1 || t == l1 || t == o1 || t == c1;
}
var Xo = Oe["__core-js_shared__"], bc = function() {
  var e = /[^.]+$/.exec(Xo && Xo.keys && Xo.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function u1(e) {
  return !!bc && bc in e;
}
var d1 = Function.prototype, h1 = d1.toString;
function Us(e) {
  if (e != null) {
    try {
      return h1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var f1 = /[\\^$.*+?()[\]{}|]/g, p1 = /^\[object .+?Constructor\]$/, g1 = Function.prototype, m1 = Object.prototype, b1 = g1.toString, y1 = m1.hasOwnProperty, v1 = RegExp(
  "^" + b1.call(y1).replace(f1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _1(e) {
  if (!gs(e) || u1(e))
    return !1;
  var t = al(e) ? v1 : p1;
  return t.test(Us(e));
}
function E1(e, t) {
  return e == null ? void 0 : e[t];
}
function Fs(e, t) {
  var s = E1(e, t);
  return _1(s) ? s : void 0;
}
var ma = Fs(Oe, "WeakMap"), yc = Object.create, w1 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!gs(t))
      return {};
    if (yc)
      return yc(t);
    e.prototype = t;
    var s = new e();
    return e.prototype = void 0, s;
  };
}();
function T1(e, t, s) {
  switch (s.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, s[0]);
    case 2:
      return e.call(t, s[0], s[1]);
    case 3:
      return e.call(t, s[0], s[1], s[2]);
  }
  return e.apply(t, s);
}
function Sd(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var A1 = 800, N1 = 16, O1 = Date.now;
function k1(e) {
  var t = 0, s = 0;
  return function() {
    var n = O1(), i = N1 - (n - s);
    if (s = n, i > 0) {
      if (++t >= A1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function C1(e) {
  return function() {
    return e;
  };
}
var Tr = function() {
  try {
    var e = Fs(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), S1 = Tr ? function(e, t) {
  return Tr(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: C1(t),
    writable: !0
  });
} : Cd, L1 = k1(S1);
function I1(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var x1 = 9007199254740991, $1 = /^(?:0|[1-9]\d*)$/;
function Ld(e, t) {
  var s = typeof e;
  return t = t ?? x1, !!t && (s == "number" || s != "symbol" && $1.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ll(e, t, s) {
  t == "__proto__" && Tr ? Tr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
function Li(e, t) {
  return e === t || e !== e && t !== t;
}
var R1 = Object.prototype, M1 = R1.hasOwnProperty;
function Id(e, t, s) {
  var n = e[t];
  (!(M1.call(e, t) && Li(n, s)) || s === void 0 && !(t in e)) && ll(e, t, s);
}
function Ii(e, t, s, n) {
  var i = !s;
  s || (s = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var l = t[r], a = void 0;
    a === void 0 && (a = e[l]), i ? ll(s, l, a) : Id(s, l, a);
  }
  return s;
}
var vc = Math.max;
function D1(e, t, s) {
  return t = vc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = vc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var l = Array(t + 1); ++i < t; )
      l[i] = n[i];
    return l[t] = s(o), T1(e, this, l);
  };
}
function q1(e, t) {
  return L1(D1(e, t, Cd), e + "");
}
var B1 = 9007199254740991;
function xd(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= B1;
}
function Pr(e) {
  return e != null && xd(e.length) && !al(e);
}
function P1(e, t, s) {
  if (!gs(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? Pr(s) && Ld(t, s.length) : n == "string" && t in s) ? Li(s[t], e) : !1;
}
function j1(e) {
  return q1(function(t, s) {
    var n = -1, i = s.length, r = i > 1 ? s[i - 1] : void 0, o = i > 2 ? s[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && P1(s[0], s[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var l = s[n];
      l && e(t, l, n, r);
    }
    return t;
  });
}
var V1 = Object.prototype;
function cl(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || V1;
  return e === s;
}
function U1(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var F1 = "[object Arguments]";
function _c(e) {
  return Ve(e) && Dn(e) == F1;
}
var $d = Object.prototype, H1 = $d.hasOwnProperty, z1 = $d.propertyIsEnumerable, ba = _c(/* @__PURE__ */ function() {
  return arguments;
}()) ? _c : function(e) {
  return Ve(e) && H1.call(e, "callee") && !z1.call(e, "callee");
};
function W1() {
  return !1;
}
var Rd = typeof exports == "object" && exports && !exports.nodeType && exports, Ec = Rd && typeof module == "object" && module && !module.nodeType && module, K1 = Ec && Ec.exports === Rd, wc = K1 ? Oe.Buffer : void 0, G1 = wc ? wc.isBuffer : void 0, gi = G1 || W1, Y1 = "[object Arguments]", X1 = "[object Array]", Z1 = "[object Boolean]", Q1 = "[object Date]", J1 = "[object Error]", ty = "[object Function]", ey = "[object Map]", sy = "[object Number]", ny = "[object Object]", iy = "[object RegExp]", ry = "[object Set]", oy = "[object String]", ay = "[object WeakMap]", ly = "[object ArrayBuffer]", cy = "[object DataView]", uy = "[object Float32Array]", dy = "[object Float64Array]", hy = "[object Int8Array]", fy = "[object Int16Array]", py = "[object Int32Array]", gy = "[object Uint8Array]", my = "[object Uint8ClampedArray]", by = "[object Uint16Array]", yy = "[object Uint32Array]", st = {};
st[uy] = st[dy] = st[hy] = st[fy] = st[py] = st[gy] = st[my] = st[by] = st[yy] = !0;
st[Y1] = st[X1] = st[ly] = st[Z1] = st[cy] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = st[ny] = st[iy] = st[ry] = st[oy] = st[ay] = !1;
function vy(e) {
  return Ve(e) && xd(e.length) && !!st[Dn(e)];
}
function ul(e) {
  return function(t) {
    return e(t);
  };
}
var Md = typeof exports == "object" && exports && !exports.nodeType && exports, ui = Md && typeof module == "object" && module && !module.nodeType && module, _y = ui && ui.exports === Md, Zo = _y && Od.process, Cn = function() {
  try {
    var e = ui && ui.require && ui.require("util").types;
    return e || Zo && Zo.binding && Zo.binding("util");
  } catch {
  }
}(), Tc = Cn && Cn.isTypedArray, dl = Tc ? ul(Tc) : vy, Ey = Object.prototype, wy = Ey.hasOwnProperty;
function Dd(e, t) {
  var s = qs(e), n = !s && ba(e), i = !s && !n && gi(e), r = !s && !n && !i && dl(e), o = s || n || i || r, l = o ? U1(e.length, String) : [], a = l.length;
  for (var u in e)
    (t || wy.call(e, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Ld(u, a))) && l.push(u);
  return l;
}
function qd(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var Ty = qd(Object.keys, Object), Ay = Object.prototype, Ny = Ay.hasOwnProperty;
function Oy(e) {
  if (!cl(e))
    return Ty(e);
  var t = [];
  for (var s in Object(e))
    Ny.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
function hl(e) {
  return Pr(e) ? Dd(e) : Oy(e);
}
function ky(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var Cy = Object.prototype, Sy = Cy.hasOwnProperty;
function Ly(e) {
  if (!gs(e))
    return ky(e);
  var t = cl(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !Sy.call(e, n)) || s.push(n);
  return s;
}
function xi(e) {
  return Pr(e) ? Dd(e, !0) : Ly(e);
}
var mi = Fs(Object, "create");
function Iy() {
  this.__data__ = mi ? mi(null) : {}, this.size = 0;
}
function xy(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var $y = "__lodash_hash_undefined__", Ry = Object.prototype, My = Ry.hasOwnProperty;
function Dy(e) {
  var t = this.__data__;
  if (mi) {
    var s = t[e];
    return s === $y ? void 0 : s;
  }
  return My.call(t, e) ? t[e] : void 0;
}
var qy = Object.prototype, By = qy.hasOwnProperty;
function Py(e) {
  var t = this.__data__;
  return mi ? t[e] !== void 0 : By.call(t, e);
}
var jy = "__lodash_hash_undefined__";
function Vy(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = mi && t === void 0 ? jy : t, this;
}
function Bs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Bs.prototype.clear = Iy;
Bs.prototype.delete = xy;
Bs.prototype.get = Dy;
Bs.prototype.has = Py;
Bs.prototype.set = Vy;
function Uy() {
  this.__data__ = [], this.size = 0;
}
function jr(e, t) {
  for (var s = e.length; s--; )
    if (Li(e[s][0], t))
      return s;
  return -1;
}
var Fy = Array.prototype, Hy = Fy.splice;
function zy(e) {
  var t = this.__data__, s = jr(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : Hy.call(t, s, 1), --this.size, !0;
}
function Wy(e) {
  var t = this.__data__, s = jr(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function Ky(e) {
  return jr(this.__data__, e) > -1;
}
function Gy(e, t) {
  var s = this.__data__, n = jr(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function ze(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ze.prototype.clear = Uy;
ze.prototype.delete = zy;
ze.prototype.get = Wy;
ze.prototype.has = Ky;
ze.prototype.set = Gy;
var bi = Fs(Oe, "Map");
function Yy() {
  this.size = 0, this.__data__ = {
    hash: new Bs(),
    map: new (bi || ze)(),
    string: new Bs()
  };
}
function Xy(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Vr(e, t) {
  var s = e.__data__;
  return Xy(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function Zy(e) {
  var t = Vr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Qy(e) {
  return Vr(this, e).get(e);
}
function Jy(e) {
  return Vr(this, e).has(e);
}
function tv(e, t) {
  var s = Vr(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
function Hs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Hs.prototype.clear = Yy;
Hs.prototype.delete = Zy;
Hs.prototype.get = Qy;
Hs.prototype.has = Jy;
Hs.prototype.set = tv;
function Bd(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var fl = qd(Object.getPrototypeOf, Object), ev = "[object Object]", sv = Function.prototype, nv = Object.prototype, Pd = sv.toString, iv = nv.hasOwnProperty, rv = Pd.call(Object);
function ov(e) {
  if (!Ve(e) || Dn(e) != ev)
    return !1;
  var t = fl(e);
  if (t === null)
    return !0;
  var s = iv.call(t, "constructor") && t.constructor;
  return typeof s == "function" && s instanceof s && Pd.call(s) == rv;
}
function av() {
  this.__data__ = new ze(), this.size = 0;
}
function lv(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
function cv(e) {
  return this.__data__.get(e);
}
function uv(e) {
  return this.__data__.has(e);
}
var dv = 200;
function hv(e, t) {
  var s = this.__data__;
  if (s instanceof ze) {
    var n = s.__data__;
    if (!bi || n.length < dv - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new Hs(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
function Ee(e) {
  var t = this.__data__ = new ze(e);
  this.size = t.size;
}
Ee.prototype.clear = av;
Ee.prototype.delete = lv;
Ee.prototype.get = cv;
Ee.prototype.has = uv;
Ee.prototype.set = hv;
function fv(e, t) {
  return e && Ii(t, hl(t), e);
}
function pv(e, t) {
  return e && Ii(t, xi(t), e);
}
var jd = typeof exports == "object" && exports && !exports.nodeType && exports, Ac = jd && typeof module == "object" && module && !module.nodeType && module, gv = Ac && Ac.exports === jd, Nc = gv ? Oe.Buffer : void 0, Oc = Nc ? Nc.allocUnsafe : void 0;
function Vd(e, t) {
  if (t)
    return e.slice();
  var s = e.length, n = Oc ? Oc(s) : new e.constructor(s);
  return e.copy(n), n;
}
function mv(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var o = e[s];
    t(o, s, e) && (r[i++] = o);
  }
  return r;
}
function Ud() {
  return [];
}
var bv = Object.prototype, yv = bv.propertyIsEnumerable, kc = Object.getOwnPropertySymbols, pl = kc ? function(e) {
  return e == null ? [] : (e = Object(e), mv(kc(e), function(t) {
    return yv.call(e, t);
  }));
} : Ud;
function vv(e, t) {
  return Ii(e, pl(e), t);
}
var _v = Object.getOwnPropertySymbols, Fd = _v ? function(e) {
  for (var t = []; e; )
    Bd(t, pl(e)), e = fl(e);
  return t;
} : Ud;
function Ev(e, t) {
  return Ii(e, Fd(e), t);
}
function Hd(e, t, s) {
  var n = t(e);
  return qs(e) ? n : Bd(n, s(e));
}
function ya(e) {
  return Hd(e, hl, pl);
}
function wv(e) {
  return Hd(e, xi, Fd);
}
var va = Fs(Oe, "DataView"), _a = Fs(Oe, "Promise"), Ea = Fs(Oe, "Set"), Cc = "[object Map]", Tv = "[object Object]", Sc = "[object Promise]", Lc = "[object Set]", Ic = "[object WeakMap]", xc = "[object DataView]", Av = Us(va), Nv = Us(bi), Ov = Us(_a), kv = Us(Ea), Cv = Us(ma), ee = Dn;
(va && ee(new va(new ArrayBuffer(1))) != xc || bi && ee(new bi()) != Cc || _a && ee(_a.resolve()) != Sc || Ea && ee(new Ea()) != Lc || ma && ee(new ma()) != Ic) && (ee = function(e) {
  var t = Dn(e), s = t == Tv ? e.constructor : void 0, n = s ? Us(s) : "";
  if (n)
    switch (n) {
      case Av:
        return xc;
      case Nv:
        return Cc;
      case Ov:
        return Sc;
      case kv:
        return Lc;
      case Cv:
        return Ic;
    }
  return t;
});
var Sv = Object.prototype, Lv = Sv.hasOwnProperty;
function Iv(e) {
  var t = e.length, s = new e.constructor(t);
  return t && typeof e[0] == "string" && Lv.call(e, "index") && (s.index = e.index, s.input = e.input), s;
}
var Ar = Oe.Uint8Array;
function gl(e) {
  var t = new e.constructor(e.byteLength);
  return new Ar(t).set(new Ar(e)), t;
}
function xv(e, t) {
  var s = t ? gl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.byteLength);
}
var $v = /\w*$/;
function Rv(e) {
  var t = new e.constructor(e.source, $v.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var $c = ds ? ds.prototype : void 0, Rc = $c ? $c.valueOf : void 0;
function Mv(e) {
  return Rc ? Object(Rc.call(e)) : {};
}
function zd(e, t) {
  var s = t ? gl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.length);
}
var Dv = "[object Boolean]", qv = "[object Date]", Bv = "[object Map]", Pv = "[object Number]", jv = "[object RegExp]", Vv = "[object Set]", Uv = "[object String]", Fv = "[object Symbol]", Hv = "[object ArrayBuffer]", zv = "[object DataView]", Wv = "[object Float32Array]", Kv = "[object Float64Array]", Gv = "[object Int8Array]", Yv = "[object Int16Array]", Xv = "[object Int32Array]", Zv = "[object Uint8Array]", Qv = "[object Uint8ClampedArray]", Jv = "[object Uint16Array]", t0 = "[object Uint32Array]";
function e0(e, t, s) {
  var n = e.constructor;
  switch (t) {
    case Hv:
      return gl(e);
    case Dv:
    case qv:
      return new n(+e);
    case zv:
      return xv(e, s);
    case Wv:
    case Kv:
    case Gv:
    case Yv:
    case Xv:
    case Zv:
    case Qv:
    case Jv:
    case t0:
      return zd(e, s);
    case Bv:
      return new n();
    case Pv:
    case Uv:
      return new n(e);
    case jv:
      return Rv(e);
    case Vv:
      return new n();
    case Fv:
      return Mv(e);
  }
}
function Wd(e) {
  return typeof e.constructor == "function" && !cl(e) ? w1(fl(e)) : {};
}
var s0 = "[object Map]";
function n0(e) {
  return Ve(e) && ee(e) == s0;
}
var Mc = Cn && Cn.isMap, i0 = Mc ? ul(Mc) : n0, r0 = "[object Set]";
function o0(e) {
  return Ve(e) && ee(e) == r0;
}
var Dc = Cn && Cn.isSet, a0 = Dc ? ul(Dc) : o0, l0 = 1, c0 = 2, u0 = 4, Kd = "[object Arguments]", d0 = "[object Array]", h0 = "[object Boolean]", f0 = "[object Date]", p0 = "[object Error]", Gd = "[object Function]", g0 = "[object GeneratorFunction]", m0 = "[object Map]", b0 = "[object Number]", Yd = "[object Object]", y0 = "[object RegExp]", v0 = "[object Set]", _0 = "[object String]", E0 = "[object Symbol]", w0 = "[object WeakMap]", T0 = "[object ArrayBuffer]", A0 = "[object DataView]", N0 = "[object Float32Array]", O0 = "[object Float64Array]", k0 = "[object Int8Array]", C0 = "[object Int16Array]", S0 = "[object Int32Array]", L0 = "[object Uint8Array]", I0 = "[object Uint8ClampedArray]", x0 = "[object Uint16Array]", $0 = "[object Uint32Array]", et = {};
et[Kd] = et[d0] = et[T0] = et[A0] = et[h0] = et[f0] = et[N0] = et[O0] = et[k0] = et[C0] = et[S0] = et[m0] = et[b0] = et[Yd] = et[y0] = et[v0] = et[_0] = et[E0] = et[L0] = et[I0] = et[x0] = et[$0] = !0;
et[p0] = et[Gd] = et[w0] = !1;
function gr(e, t, s, n, i, r) {
  var o, l = t & l0, a = t & c0, u = t & u0;
  if (o !== void 0)
    return o;
  if (!gs(e))
    return e;
  var h = qs(e);
  if (h) {
    if (o = Iv(e), !l)
      return Sd(e, o);
  } else {
    var d = ee(e), b = d == Gd || d == g0;
    if (gi(e))
      return Vd(e, l);
    if (d == Yd || d == Kd || b && !i) {
      if (o = a || b ? {} : Wd(e), !l)
        return a ? Ev(e, pv(o, e)) : vv(e, fv(o, e));
    } else {
      if (!et[d])
        return i ? e : {};
      o = e0(e, d, l);
    }
  }
  r || (r = new Ee());
  var y = r.get(e);
  if (y)
    return y;
  r.set(e, o), a0(e) ? e.forEach(function(w) {
    o.add(gr(w, t, s, w, e, r));
  }) : i0(e) && e.forEach(function(w, A) {
    o.set(A, gr(w, t, s, A, e, r));
  });
  var _ = u ? a ? wv : ya : a ? xi : hl, E = h ? void 0 : _(e);
  return I1(E || e, function(w, A) {
    E && (A = w, w = e[A]), Id(o, A, gr(w, t, s, A, e, r));
  }), o;
}
var R0 = 1, M0 = 4;
function vn(e) {
  return gr(e, R0 | M0);
}
var D0 = "__lodash_hash_undefined__";
function q0(e) {
  return this.__data__.set(e, D0), this;
}
function B0(e) {
  return this.__data__.has(e);
}
function Nr(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new Hs(); ++t < s; )
    this.add(e[t]);
}
Nr.prototype.add = Nr.prototype.push = q0;
Nr.prototype.has = B0;
function P0(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
function j0(e, t) {
  return e.has(t);
}
var V0 = 1, U0 = 2;
function Xd(e, t, s, n, i, r) {
  var o = s & V0, l = e.length, a = t.length;
  if (l != a && !(o && a > l))
    return !1;
  var u = r.get(e), h = r.get(t);
  if (u && h)
    return u == t && h == e;
  var d = -1, b = !0, y = s & U0 ? new Nr() : void 0;
  for (r.set(e, t), r.set(t, e); ++d < l; ) {
    var _ = e[d], E = t[d];
    if (n)
      var w = o ? n(E, _, d, t, e, r) : n(_, E, d, e, t, r);
    if (w !== void 0) {
      if (w)
        continue;
      b = !1;
      break;
    }
    if (y) {
      if (!P0(t, function(A, k) {
        if (!j0(y, k) && (_ === A || i(_, A, s, n, r)))
          return y.push(k);
      })) {
        b = !1;
        break;
      }
    } else if (!(_ === E || i(_, E, s, n, r))) {
      b = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), b;
}
function F0(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
function H0(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var z0 = 1, W0 = 2, K0 = "[object Boolean]", G0 = "[object Date]", Y0 = "[object Error]", X0 = "[object Map]", Z0 = "[object Number]", Q0 = "[object RegExp]", J0 = "[object Set]", t_ = "[object String]", e_ = "[object Symbol]", s_ = "[object ArrayBuffer]", n_ = "[object DataView]", qc = ds ? ds.prototype : void 0, Qo = qc ? qc.valueOf : void 0;
function i_(e, t, s, n, i, r, o) {
  switch (s) {
    case n_:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case s_:
      return !(e.byteLength != t.byteLength || !r(new Ar(e), new Ar(t)));
    case K0:
    case G0:
    case Z0:
      return Li(+e, +t);
    case Y0:
      return e.name == t.name && e.message == t.message;
    case Q0:
    case t_:
      return e == t + "";
    case X0:
      var l = F0;
    case J0:
      var a = n & z0;
      if (l || (l = H0), e.size != t.size && !a)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      n |= W0, o.set(e, t);
      var h = Xd(l(e), l(t), n, i, r, o);
      return o.delete(e), h;
    case e_:
      if (Qo)
        return Qo.call(e) == Qo.call(t);
  }
  return !1;
}
var r_ = 1, o_ = Object.prototype, a_ = o_.hasOwnProperty;
function l_(e, t, s, n, i, r) {
  var o = s & r_, l = ya(e), a = l.length, u = ya(t), h = u.length;
  if (a != h && !o)
    return !1;
  for (var d = a; d--; ) {
    var b = l[d];
    if (!(o ? b in t : a_.call(t, b)))
      return !1;
  }
  var y = r.get(e), _ = r.get(t);
  if (y && _)
    return y == t && _ == e;
  var E = !0;
  r.set(e, t), r.set(t, e);
  for (var w = o; ++d < a; ) {
    b = l[d];
    var A = e[b], k = t[b];
    if (n)
      var L = o ? n(k, A, b, t, e, r) : n(A, k, b, e, t, r);
    if (!(L === void 0 ? A === k || i(A, k, s, n, r) : L)) {
      E = !1;
      break;
    }
    w || (w = b == "constructor");
  }
  if (E && !w) {
    var I = e.constructor, $ = t.constructor;
    I != $ && "constructor" in e && "constructor" in t && !(typeof I == "function" && I instanceof I && typeof $ == "function" && $ instanceof $) && (E = !1);
  }
  return r.delete(e), r.delete(t), E;
}
var c_ = 1, Bc = "[object Arguments]", Pc = "[object Array]", or = "[object Object]", u_ = Object.prototype, jc = u_.hasOwnProperty;
function d_(e, t, s, n, i, r) {
  var o = qs(e), l = qs(t), a = o ? Pc : ee(e), u = l ? Pc : ee(t);
  a = a == Bc ? or : a, u = u == Bc ? or : u;
  var h = a == or, d = u == or, b = a == u;
  if (b && gi(e)) {
    if (!gi(t))
      return !1;
    o = !0, h = !1;
  }
  if (b && !h)
    return r || (r = new Ee()), o || dl(e) ? Xd(e, t, s, n, i, r) : i_(e, t, a, s, n, i, r);
  if (!(s & c_)) {
    var y = h && jc.call(e, "__wrapped__"), _ = d && jc.call(t, "__wrapped__");
    if (y || _) {
      var E = y ? e.value() : e, w = _ ? t.value() : t;
      return r || (r = new Ee()), i(E, w, s, n, r);
    }
  }
  return b ? (r || (r = new Ee()), l_(e, t, s, n, i, r)) : !1;
}
function Zd(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !Ve(e) && !Ve(t) ? e !== e && t !== t : d_(e, t, s, n, Zd, i);
}
function h_(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), o = n(t), l = o.length; l--; ) {
      var a = o[++i];
      if (s(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var f_ = h_();
function wa(e, t, s) {
  (s !== void 0 && !Li(e[t], s) || s === void 0 && !(t in e)) && ll(e, t, s);
}
function p_(e) {
  return Ve(e) && Pr(e);
}
function Ta(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function g_(e) {
  return Ii(e, xi(e));
}
function m_(e, t, s, n, i, r, o) {
  var l = Ta(e, s), a = Ta(t, s), u = o.get(a);
  if (u) {
    wa(e, s, u);
    return;
  }
  var h = r ? r(l, a, s + "", e, t, o) : void 0, d = h === void 0;
  if (d) {
    var b = qs(a), y = !b && gi(a), _ = !b && !y && dl(a);
    h = a, b || y || _ ? qs(l) ? h = l : p_(l) ? h = Sd(l) : y ? (d = !1, h = Vd(a, !0)) : _ ? (d = !1, h = zd(a, !0)) : h = [] : ov(a) || ba(a) ? (h = l, ba(l) ? h = g_(l) : (!gs(l) || al(l)) && (h = Wd(a))) : d = !1;
  }
  d && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), wa(e, s, h);
}
function Qd(e, t, s, n, i) {
  e !== t && f_(t, function(r, o) {
    if (i || (i = new Ee()), gs(r))
      m_(e, t, o, s, Qd, n, i);
    else {
      var l = n ? n(Ta(e, o), r, o + "", e, t, i) : void 0;
      l === void 0 && (l = r), wa(e, o, l);
    }
  }, xi);
}
function ml(e, t) {
  return Zd(e, t);
}
var as = j1(function(e, t, s) {
  Qd(e, t, s);
}), B = /* @__PURE__ */ ((e) => (e[e.TYPE = 3] = "TYPE", e[e.LEVEL = 12] = "LEVEL", e[e.ATTRIBUTE = 13] = "ATTRIBUTE", e[e.BLOT = 14] = "BLOT", e[e.INLINE = 7] = "INLINE", e[e.BLOCK = 11] = "BLOCK", e[e.BLOCK_BLOT = 10] = "BLOCK_BLOT", e[e.INLINE_BLOT = 6] = "INLINE_BLOT", e[e.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", e[e.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", e[e.ANY = 15] = "ANY", e))(B || {});
class Ae {
  constructor(t, s, n = {}) {
    this.attrName = t, this.keyName = s;
    const i = B.TYPE & B.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & B.LEVEL | i
    ) : B.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
  }
  static keys(t) {
    return Array.from(t.attributes).map((s) => s.name);
  }
  add(t, s) {
    return this.canAdd(t, s) ? (t.setAttribute(this.keyName, s), !0) : !1;
  }
  canAdd(t, s) {
    return this.whitelist == null ? !0 : typeof s == "string" ? this.whitelist.indexOf(s.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(s) > -1;
  }
  remove(t) {
    t.removeAttribute(this.keyName);
  }
  value(t) {
    const s = t.getAttribute(this.keyName);
    return this.canAdd(t, s) && s ? s : "";
  }
}
class _n extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Jd = class Aa {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(t, s = !1) {
    if (t == null)
      return null;
    if (this.blots.has(t))
      return this.blots.get(t) || null;
    if (s) {
      let n = null;
      try {
        n = t.parentNode;
      } catch {
        return null;
      }
      return this.find(n, s);
    }
    return null;
  }
  create(t, s, n) {
    const i = this.query(s);
    if (i == null)
      throw new _n(`Unable to create ${s} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      s instanceof Node || s.nodeType === Node.TEXT_NODE ? s : r.create(n)
    ), l = new r(t, o, n);
    return Aa.blots.set(l.domNode, l), l;
  }
  find(t, s = !1) {
    return Aa.find(t, s);
  }
  query(t, s = B.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & B.LEVEL & B.BLOCK ? n = this.types.block : t & B.LEVEL & B.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && s & B.LEVEL & n.scope && s & B.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((s) => {
      const n = "blotName" in s, i = "attrName" in s;
      if (!n && !i)
        throw new _n("Invalid definition");
      if (n && s.blotName === "abstract")
        throw new _n("Cannot register abstract class");
      const r = n ? s.blotName : i ? s.attrName : void 0;
      return this.types[r] = s, i ? typeof s.keyName == "string" && (this.attributes[s.keyName] = s) : n && (s.className && (this.classes[s.className] = s), s.tagName && (Array.isArray(s.tagName) ? s.tagName = s.tagName.map((o) => o.toUpperCase()) : s.tagName = s.tagName.toUpperCase(), (Array.isArray(s.tagName) ? s.tagName : [s.tagName]).forEach((o) => {
        (this.tags[o] == null || s.className == null) && (this.tags[o] = s);
      }))), s;
    });
  }
};
Jd.blots = /* @__PURE__ */ new WeakMap();
let Sn = Jd;
function Vc(e, t) {
  return (e.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class b_ extends Ae {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((s) => s.split("-").slice(0, -1).join("-"));
  }
  add(t, s) {
    return this.canAdd(t, s) ? (this.remove(t), t.classList.add(`${this.keyName}-${s}`), !0) : !1;
  }
  remove(t) {
    Vc(t, this.keyName).forEach((s) => {
      t.classList.remove(s);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const s = (Vc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, s) ? s : "";
  }
}
const ae = b_;
function Jo(e) {
  const t = e.split("-"), s = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + s;
}
class y_ extends Ae {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((s) => s.split(":")[0].trim());
  }
  add(t, s) {
    return this.canAdd(t, s) ? (t.style[Jo(this.keyName)] = s, !0) : !1;
  }
  remove(t) {
    t.style[Jo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const s = t.style[Jo(this.keyName)];
    return this.canAdd(t, s) ? s : "";
  }
}
const ms = y_;
class v_ {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, s) {
    s ? t.add(this.domNode, s) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Sn.find(this.domNode);
    if (t == null)
      return;
    const s = Ae.keys(this.domNode), n = ae.keys(this.domNode), i = ms.keys(this.domNode);
    s.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, B.ATTRIBUTE);
      o instanceof Ae && (this.attributes[o.attrName] = o);
    });
  }
  copy(t) {
    Object.keys(this.attributes).forEach((s) => {
      const n = this.attributes[s].value(this.domNode);
      t.format(s, n);
    });
  }
  move(t) {
    this.copy(t), Object.keys(this.attributes).forEach((s) => {
      this.attributes[s].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (t, s) => (t[s] = this.attributes[s].value(this.domNode), t),
      {}
    );
  }
}
const Ur = v_, th = class {
  constructor(t, s) {
    this.scroll = t, this.domNode = s, Sn.blots.set(s, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new _n("Blot definition missing tagName");
    let s, n;
    return Array.isArray(this.tagName) ? (typeof t == "string" ? (n = t.toUpperCase(), parseInt(n, 10).toString() === n && (n = parseInt(n, 10))) : typeof t == "number" && (n = t), typeof n == "number" ? s = document.createElement(this.tagName[n - 1]) : n && this.tagName.indexOf(n) > -1 ? s = document.createElement(n) : s = document.createElement(this.tagName[0])) : s = document.createElement(this.tagName), this.className && s.classList.add(this.className), s;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const t = this.domNode.cloneNode(!1);
    return this.scroll.create(t);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), Sn.blots.delete(this.domNode);
  }
  deleteAt(t, s) {
    this.isolate(t, s).remove();
  }
  formatAt(t, s, n, i) {
    const r = this.isolate(t, s);
    if (this.scroll.query(n, B.BLOT) != null && i)
      r.wrap(n, i);
    else if (this.scroll.query(n, B.ATTRIBUTE) != null) {
      const o = this.scroll.create(this.statics.scope);
      r.wrap(o), o.format(n, i);
    }
  }
  insertAt(t, s, n) {
    const i = n == null ? this.scroll.create("text", s) : this.scroll.create(s, n), r = this.split(t);
    this.parent.insertBefore(i, r || void 0);
  }
  isolate(t, s) {
    const n = this.split(t);
    if (n == null)
      throw new Error("Attempt to isolate at end");
    return n.split(s), n;
  }
  length() {
    return 1;
  }
  offset(t = this.parent) {
    return this.parent == null || this === t ? 0 : this.parent.children.offset(this) + this.parent.offset(t);
  }
  optimize(t) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    return this.parent != null && (this.parent.insertBefore(n, this.next || void 0), this.remove()), n;
  }
  split(t, s) {
    return t === 0 ? this : this.next;
  }
  update(t, s) {
  }
  wrap(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    if (this.parent != null && this.parent.insertBefore(n, this.next || void 0), typeof n.appendChild != "function")
      throw new _n(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
th.blotName = "abstract";
let eh = th;
const sh = class extends eh {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(t) {
    return !0;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(t, s) {
    return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(s, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(t, s) {
    let n = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return t > 0 && (n += 1), [this.parent.domNode, n];
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || !0
    };
  }
};
sh.scope = B.INLINE_BLOT;
let __ = sh;
const vt = __;
class E_ {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...t) {
    if (this.insertBefore(t[0], null), t.length > 1) {
      const s = t.slice(1);
      this.append(...s);
    }
  }
  at(t) {
    const s = this.iterator();
    let n = s();
    for (; n && t > 0; )
      t -= 1, n = s();
    return n;
  }
  contains(t) {
    const s = this.iterator();
    let n = s();
    for (; n; ) {
      if (n === t)
        return !0;
      n = s();
    }
    return !1;
  }
  indexOf(t) {
    const s = this.iterator();
    let n = s(), i = 0;
    for (; n; ) {
      if (n === t)
        return i;
      i += 1, n = s();
    }
    return -1;
  }
  insertBefore(t, s) {
    t != null && (this.remove(t), t.next = s, s != null ? (t.prev = s.prev, s.prev != null && (s.prev.next = t), s.prev = t, s === this.head && (this.head = t)) : this.tail != null ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1);
  }
  offset(t) {
    let s = 0, n = this.head;
    for (; n != null; ) {
      if (n === t)
        return s;
      s += n.length(), n = n.next;
    }
    return -1;
  }
  remove(t) {
    this.contains(t) && (t.prev != null && (t.prev.next = t.next), t.next != null && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1);
  }
  iterator(t = this.head) {
    return () => {
      const s = t;
      return t != null && (t = t.next), s;
    };
  }
  find(t, s = !1) {
    const n = this.iterator();
    let i = n();
    for (; i; ) {
      const r = i.length();
      if (t < r || s && t === r && (i.next == null || i.next.length() !== 0))
        return [i, t];
      t -= r, i = n();
    }
    return [null, 0];
  }
  forEach(t) {
    const s = this.iterator();
    let n = s();
    for (; n; )
      t(n), n = s();
  }
  forEachAt(t, s, n) {
    if (s <= 0)
      return;
    const [i, r] = this.find(t);
    let o = t - r;
    const l = this.iterator(i);
    let a = l();
    for (; a && o < t + s; ) {
      const u = a.length();
      t > o ? n(
        a,
        t - o,
        Math.min(s, o + u - t)
      ) : n(a, 0, Math.min(u, t + s - o)), o += u, a = l();
    }
  }
  map(t) {
    return this.reduce((s, n) => (s.push(t(n)), s), []);
  }
  reduce(t, s) {
    const n = this.iterator();
    let i = n();
    for (; i; )
      s = t(s, i), i = n();
    return s;
  }
}
function Uc(e, t) {
  const s = t.find(e);
  if (s)
    return s;
  try {
    return t.create(e);
  } catch {
    const n = t.create(B.INLINE);
    return Array.from(e.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), e.parentNode && e.parentNode.replaceChild(n.domNode, e), n.attach(), n;
  }
}
const nh = class ts extends eh {
  constructor(t, s) {
    super(t, s), this.uiNode = null, this.build();
  }
  appendChild(t) {
    this.insertBefore(t);
  }
  attach() {
    super.attach(), this.children.forEach((t) => {
      t.attach();
    });
  }
  attachUI(t) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, ts.uiClass && this.uiNode.classList.add(ts.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new E_(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const s = Uc(t, this.scroll);
        this.insertBefore(s, this.children.head || void 0);
      } catch (s) {
        if (s instanceof _n)
          return;
        throw s;
      }
    });
  }
  deleteAt(t, s) {
    if (t === 0 && s === this.length())
      return this.remove();
    this.children.forEachAt(t, s, (n, i, r) => {
      n.deleteAt(i, r);
    });
  }
  descendant(t, s = 0) {
    const [n, i] = this.children.find(s);
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof ts ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, s = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      s,
      n,
      (o, l, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof ts && (i = i.concat(
          o.descendants(t, l, r)
        )), r -= a;
      }
    ), i;
  }
  detach() {
    this.children.forEach((t) => {
      t.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let t = !1;
    this.children.forEach((s) => {
      t || this.statics.allowedChildren.some(
        (n) => s instanceof n
      ) || (s.statics.scope === B.BLOCK_BLOT ? (s.next != null && this.splitAfter(s), s.prev != null && this.splitAfter(s.prev), s.parent.unwrap(), t = !0) : s instanceof ts ? s.unwrap() : s.remove());
    });
  }
  formatAt(t, s, n, i) {
    this.children.forEachAt(t, s, (r, o, l) => {
      r.formatAt(o, l, n, i);
    });
  }
  insertAt(t, s, n) {
    const [i, r] = this.children.find(t);
    if (i)
      i.insertAt(r, s, n);
    else {
      const o = n == null ? this.scroll.create("text", s) : this.scroll.create(s, n);
      this.appendChild(o);
    }
  }
  insertBefore(t, s) {
    t.parent != null && t.parent.children.remove(t);
    let n = null;
    this.children.insertBefore(t, s || null), t.parent = this, s != null && (n = s.domNode), (this.domNode.parentNode !== t.domNode || this.domNode.nextSibling !== n) && this.domNode.insertBefore(t.domNode, n), t.attach();
  }
  length() {
    return this.children.reduce((t, s) => t + s.length(), 0);
  }
  moveChildren(t, s) {
    this.children.forEach((n) => {
      t.insertBefore(n, s);
    });
  }
  optimize(t) {
    if (super.optimize(t), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const s = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(s);
      } else
        this.remove();
  }
  path(t, s = !1) {
    const [n, i] = this.children.find(t, s), r = [[this, t]];
    return n instanceof ts ? r.concat(n.path(i, s)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    return n instanceof ts && this.moveChildren(n), super.replaceWith(n);
  }
  split(t, s = !1) {
    if (!s) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const n = this.clone();
    return this.parent && this.parent.insertBefore(n, this.next || void 0), this.children.forEachAt(t, this.length(), (i, r, o) => {
      const l = i.split(r, s);
      l != null && n.appendChild(l);
    }), n;
  }
  splitAfter(t) {
    const s = this.clone();
    for (; t.next != null; )
      s.appendChild(t.next);
    return this.parent && this.parent.insertBefore(s, this.next || void 0), s;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(t, s) {
    const n = [], i = [];
    t.forEach((r) => {
      r.target === this.domNode && r.type === "childList" && (n.push(...r.addedNodes), i.push(...r.removedNodes));
    }), i.forEach((r) => {
      if (r.parentNode != null && // @ts-expect-error Fix me later
      r.tagName !== "IFRAME" && document.body.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const o = this.scroll.find(r);
      o != null && (o.domNode.parentNode == null || o.domNode.parentNode === this.domNode) && o.detach();
    }), n.filter((r) => r.parentNode === this.domNode && r !== this.uiNode).sort((r, o) => r === o ? 0 : r.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((r) => {
      let o = null;
      r.nextSibling != null && (o = this.scroll.find(r.nextSibling));
      const l = Uc(r, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
nh.uiClass = "";
let w_ = nh;
const ie = w_;
function T_(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const hn = class fn extends ie {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(fn.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, s) {
    super(t, s), this.attributes = new Ur(this.domNode);
  }
  format(t, s) {
    if (t === this.statics.blotName && !s)
      this.children.forEach((n) => {
        n instanceof fn || (n = n.wrap(fn.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, B.INLINE);
      if (n == null)
        return;
      n instanceof Ae ? this.attributes.attribute(n, s) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s);
    }
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.formats()[n] != null || this.scroll.query(n, B.ATTRIBUTE) ? this.isolate(t, s).format(n, i) : super.formatAt(t, s, n, i);
  }
  optimize(t) {
    super.optimize(t);
    const s = this.formats();
    if (Object.keys(s).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof fn && n.prev === this && T_(s, n.formats()) && (n.moveChildren(this), n.remove());
  }
  replaceWith(t, s) {
    const n = super.replaceWith(t, s);
    return this.attributes.copy(n), n;
  }
  update(t, s) {
    super.update(t, s), t.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(t, s) {
    const n = super.wrap(t, s);
    return n instanceof fn && this.attributes.move(n), n;
  }
};
hn.allowedChildren = [hn, vt], hn.blotName = "inline", hn.scope = B.INLINE_BLOT, hn.tagName = "SPAN";
let A_ = hn;
const bl = A_, pn = class Na extends ie {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(Na.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, s) {
    super(t, s), this.attributes = new Ur(this.domNode);
  }
  format(t, s) {
    const n = this.scroll.query(t, B.BLOCK);
    n != null && (n instanceof Ae ? this.attributes.attribute(n, s) : t === this.statics.blotName && !s ? this.replaceWith(Na.blotName) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s));
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.scroll.query(n, B.BLOCK) != null ? this.format(n, i) : super.formatAt(t, s, n, i);
  }
  insertAt(t, s, n) {
    if (n == null || this.scroll.query(s, B.INLINE) != null)
      super.insertAt(t, s, n);
    else {
      const i = this.split(t);
      if (i != null) {
        const r = this.scroll.create(s, n);
        i.parent.insertBefore(r, i);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(t, s) {
    const n = super.replaceWith(t, s);
    return this.attributes.copy(n), n;
  }
  update(t, s) {
    super.update(t, s), t.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
};
pn.blotName = "block", pn.scope = B.BLOCK_BLOT, pn.tagName = "P", pn.allowedChildren = [
  bl,
  pn,
  vt
];
let N_ = pn;
const yi = N_, Oa = class extends ie {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(t, s) {
    super.deleteAt(t, s), this.enforceAllowedChildren();
  }
  formatAt(t, s, n, i) {
    super.formatAt(t, s, n, i), this.enforceAllowedChildren();
  }
  insertAt(t, s, n) {
    super.insertAt(t, s, n), this.enforceAllowedChildren();
  }
  optimize(t) {
    super.optimize(t), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
Oa.blotName = "container", Oa.scope = B.BLOCK_BLOT;
let O_ = Oa;
const Fr = O_;
class k_ extends vt {
  static formats(t, s) {
  }
  format(t, s) {
    super.formatAt(0, this.length(), t, s);
  }
  formatAt(t, s, n, i) {
    t === 0 && s === this.length() ? this.format(n, i) : super.formatAt(t, s, n, i);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Mt = k_, C_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, S_ = 100, gn = class extends ie {
  constructor(t, s) {
    super(null, s), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, C_), this.attach();
  }
  create(t, s) {
    return this.registry.create(this, t, s);
  }
  find(t, s = !1) {
    const n = this.registry.find(t, s);
    return n ? n.scroll === this ? n : s ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, s = B.ANY) {
    return this.registry.query(t, s);
  }
  register(...t) {
    return this.registry.register(...t);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(t, s) {
    this.update(), t === 0 && s === this.length() ? this.children.forEach((n) => {
      n.remove();
    }) : super.deleteAt(t, s);
  }
  formatAt(t, s, n, i) {
    this.update(), super.formatAt(t, s, n, i);
  }
  insertAt(t, s, n) {
    this.update(), super.insertAt(t, s, n);
  }
  optimize(t = [], s = {}) {
    super.optimize(s);
    const n = s.mutationsMap || /* @__PURE__ */ new WeakMap();
    let i = Array.from(this.observer.takeRecords());
    for (; i.length > 0; )
      t.push(i.pop());
    const r = (a, u = !0) => {
      a == null || a === this || a.domNode.parentNode != null && (n.has(a.domNode) || n.set(a.domNode, []), u && r(a.parent));
    }, o = (a) => {
      n.has(a.domNode) && (a instanceof ie && a.children.forEach(o), n.delete(a.domNode), a.optimize(s));
    };
    let l = t;
    for (let a = 0; l.length > 0; a += 1) {
      if (a >= S_)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((u) => {
        const h = this.find(u.target, !0);
        h != null && (h.domNode === u.target && (u.type === "childList" ? (r(this.find(u.previousSibling, !1)), Array.from(u.addedNodes).forEach((d) => {
          const b = this.find(d, !1);
          r(b, !1), b instanceof ie && b.children.forEach((y) => {
            r(y, !1);
          });
        })) : u.type === "attributes" && r(h.prev)), r(h));
      }), this.children.forEach(o), l = Array.from(this.observer.takeRecords()), i = l.slice(); i.length > 0; )
        t.push(i.pop());
    }
  }
  update(t, s = {}) {
    t = t || this.observer.takeRecords();
    const n = /* @__PURE__ */ new WeakMap();
    t.map((i) => {
      const r = this.find(i.target, !0);
      return r == null ? null : n.has(r.domNode) ? (n.get(r.domNode).push(i), null) : (n.set(r.domNode, [i]), r);
    }).forEach((i) => {
      i != null && i !== this && n.has(i.domNode) && i.update(n.get(i.domNode) || [], s);
    }), s.mutationsMap = n, n.has(this.domNode) && super.update(n.get(this.domNode), s), this.optimize(t, s);
  }
};
gn.blotName = "scroll", gn.defaultChild = yi, gn.allowedChildren = [yi, Fr], gn.scope = B.BLOCK_BLOT, gn.tagName = "DIV";
let L_ = gn;
const yl = L_, ka = class ih extends vt {
  static create(t) {
    return document.createTextNode(t);
  }
  static value(t) {
    return t.data;
  }
  constructor(t, s) {
    super(t, s), this.text = this.statics.value(this.domNode);
  }
  deleteAt(t, s) {
    this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + s);
  }
  index(t, s) {
    return this.domNode === t ? s : -1;
  }
  insertAt(t, s, n) {
    n == null ? (this.text = this.text.slice(0, t) + s + this.text.slice(t), this.domNode.data = this.text) : super.insertAt(t, s, n);
  }
  length() {
    return this.text.length;
  }
  optimize(t) {
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof ih && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(t, s = !1) {
    return [this.domNode, t];
  }
  split(t, s = !1) {
    if (!s) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const n = this.scroll.create(this.domNode.splitText(t));
    return this.parent.insertBefore(n, this.next || void 0), this.text = this.statics.value(this.domNode), n;
  }
  update(t, s) {
    t.some((n) => n.type === "characterData" && n.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
ka.blotName = "text", ka.scope = B.INLINE_BLOT;
let I_ = ka;
const Or = I_, x_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Ae,
  AttributorStore: Ur,
  BlockBlot: yi,
  ClassAttributor: ae,
  ContainerBlot: Fr,
  EmbedBlot: Mt,
  InlineBlot: bl,
  LeafBlot: vt,
  ParentBlot: ie,
  Registry: Sn,
  Scope: B,
  ScrollBlot: yl,
  StyleAttributor: ms,
  TextBlot: Or
}, Symbol.toStringTag, { value: "Module" }));
var is = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ca = { exports: {} }, It = -1, Tt = 1, ct = 0;
function vi(e, t, s, n, i) {
  if (e === t)
    return e ? [[ct, e]] : [];
  if (s != null) {
    var r = V_(e, t, s);
    if (r)
      return r;
  }
  var o = vl(e, t), l = e.substring(0, o);
  e = e.substring(o), t = t.substring(o), o = Hr(e, t);
  var a = e.substring(e.length - o);
  e = e.substring(0, e.length - o), t = t.substring(0, t.length - o);
  var u = $_(e, t);
  return l && u.unshift([ct, l]), a && u.push([ct, a]), _l(u, i), n && D_(u), u;
}
function $_(e, t) {
  var s;
  if (!e)
    return [[Tt, t]];
  if (!t)
    return [[It, e]];
  var n = e.length > t.length ? e : t, i = e.length > t.length ? t : e, r = n.indexOf(i);
  if (r !== -1)
    return s = [
      [Tt, n.substring(0, r)],
      [ct, i],
      [Tt, n.substring(r + i.length)]
    ], e.length > t.length && (s[0][0] = s[2][0] = It), s;
  if (i.length === 1)
    return [
      [It, e],
      [Tt, t]
    ];
  var o = M_(e, t);
  if (o) {
    var l = o[0], a = o[1], u = o[2], h = o[3], d = o[4], b = vi(l, u), y = vi(a, h);
    return b.concat([[ct, d]], y);
  }
  return R_(e, t);
}
function R_(e, t) {
  for (var s = e.length, n = t.length, i = Math.ceil((s + n) / 2), r = i, o = 2 * i, l = new Array(o), a = new Array(o), u = 0; u < o; u++)
    l[u] = -1, a[u] = -1;
  l[r + 1] = 0, a[r + 1] = 0;
  for (var h = s - n, d = h % 2 !== 0, b = 0, y = 0, _ = 0, E = 0, w = 0; w < i; w++) {
    for (var A = -w + b; A <= w - y; A += 2) {
      var k = r + A, L;
      A === -w || A !== w && l[k - 1] < l[k + 1] ? L = l[k + 1] : L = l[k - 1] + 1;
      for (var I = L - A; L < s && I < n && e.charAt(L) === t.charAt(I); )
        L++, I++;
      if (l[k] = L, L > s)
        y += 2;
      else if (I > n)
        b += 2;
      else if (d) {
        var $ = r + h - A;
        if ($ >= 0 && $ < o && a[$] !== -1) {
          var R = s - a[$];
          if (L >= R)
            return Fc(e, t, L, I);
        }
      }
    }
    for (var P = -w + _; P <= w - E; P += 2) {
      var $ = r + P, R;
      P === -w || P !== w && a[$ - 1] < a[$ + 1] ? R = a[$ + 1] : R = a[$ - 1] + 1;
      for (var H = R - P; R < s && H < n && e.charAt(s - R - 1) === t.charAt(n - H - 1); )
        R++, H++;
      if (a[$] = R, R > s)
        E += 2;
      else if (H > n)
        _ += 2;
      else if (!d) {
        var k = r + h - P;
        if (k >= 0 && k < o && l[k] !== -1) {
          var L = l[k], I = r + L - k;
          if (R = s - R, L >= R)
            return Fc(e, t, L, I);
        }
      }
    }
  }
  return [
    [It, e],
    [Tt, t]
  ];
}
function Fc(e, t, s, n) {
  var i = e.substring(0, s), r = t.substring(0, n), o = e.substring(s), l = t.substring(n), a = vi(i, r), u = vi(o, l);
  return a.concat(u);
}
function vl(e, t) {
  if (!e || !t || e.charAt(0) !== t.charAt(0))
    return 0;
  for (var s = 0, n = Math.min(e.length, t.length), i = n, r = 0; s < i; )
    e.substring(r, i) == t.substring(r, i) ? (s = i, r = s) : n = i, i = Math.floor((n - s) / 2 + s);
  return oh(e.charCodeAt(i - 1)) && i--, i;
}
function Hc(e, t) {
  var s = e.length, n = t.length;
  if (s == 0 || n == 0)
    return 0;
  s > n ? e = e.substring(s - n) : s < n && (t = t.substring(0, s));
  var i = Math.min(s, n);
  if (e == t)
    return i;
  for (var r = 0, o = 1; ; ) {
    var l = e.substring(i - o), a = t.indexOf(l);
    if (a == -1)
      return r;
    o += a, (a == 0 || e.substring(i - o) == t.substring(0, o)) && (r = o, o++);
  }
}
function Hr(e, t) {
  if (!e || !t || e.slice(-1) !== t.slice(-1))
    return 0;
  for (var s = 0, n = Math.min(e.length, t.length), i = n, r = 0; s < i; )
    e.substring(e.length - i, e.length - r) == t.substring(t.length - i, t.length - r) ? (s = i, r = s) : n = i, i = Math.floor((n - s) / 2 + s);
  return ah(e.charCodeAt(e.length - i)) && i--, i;
}
function M_(e, t) {
  var s = e.length > t.length ? e : t, n = e.length > t.length ? t : e;
  if (s.length < 4 || n.length * 2 < s.length)
    return null;
  function i(y, _, E) {
    for (var w = y.substring(E, E + Math.floor(y.length / 4)), A = -1, k = "", L, I, $, R; (A = _.indexOf(w, A + 1)) !== -1; ) {
      var P = vl(
        y.substring(E),
        _.substring(A)
      ), H = Hr(
        y.substring(0, E),
        _.substring(0, A)
      );
      k.length < H + P && (k = _.substring(A - H, A) + _.substring(A, A + P), L = y.substring(0, E - H), I = y.substring(E + P), $ = _.substring(0, A - H), R = _.substring(A + P));
    }
    return k.length * 2 >= y.length ? [
      L,
      I,
      $,
      R,
      k
    ] : null;
  }
  var r = i(
    s,
    n,
    Math.ceil(s.length / 4)
  ), o = i(
    s,
    n,
    Math.ceil(s.length / 2)
  ), l;
  if (!r && !o)
    return null;
  o ? r ? l = r[4].length > o[4].length ? r : o : l = o : l = r;
  var a, u, h, d;
  e.length > t.length ? (a = l[0], u = l[1], h = l[2], d = l[3]) : (h = l[0], d = l[1], a = l[2], u = l[3]);
  var b = l[4];
  return [a, u, h, d, b];
}
function D_(e) {
  for (var t = !1, s = [], n = 0, i = null, r = 0, o = 0, l = 0, a = 0, u = 0; r < e.length; )
    e[r][0] == ct ? (s[n++] = r, o = a, l = u, a = 0, u = 0, i = e[r][1]) : (e[r][0] == Tt ? a += e[r][1].length : u += e[r][1].length, i && i.length <= Math.max(o, l) && i.length <= Math.max(a, u) && (e.splice(s[n - 1], 0, [
      It,
      i
    ]), e[s[n - 1] + 1][0] = Tt, n--, n--, r = n > 0 ? s[n - 1] : -1, o = 0, l = 0, a = 0, u = 0, i = null, t = !0)), r++;
  for (t && _l(e), P_(e), r = 1; r < e.length; ) {
    if (e[r - 1][0] == It && e[r][0] == Tt) {
      var h = e[r - 1][1], d = e[r][1], b = Hc(h, d), y = Hc(d, h);
      b >= y ? (b >= h.length / 2 || b >= d.length / 2) && (e.splice(r, 0, [
        ct,
        d.substring(0, b)
      ]), e[r - 1][1] = h.substring(
        0,
        h.length - b
      ), e[r + 1][1] = d.substring(b), r++) : (y >= h.length / 2 || y >= d.length / 2) && (e.splice(r, 0, [
        ct,
        h.substring(0, y)
      ]), e[r - 1][0] = Tt, e[r - 1][1] = d.substring(
        0,
        d.length - y
      ), e[r + 1][0] = It, e[r + 1][1] = h.substring(y), r++), r++;
    }
    r++;
  }
}
var zc = /[^a-zA-Z0-9]/, Wc = /\s/, Kc = /[\r\n]/, q_ = /\n\r?\n$/, B_ = /^\r?\n\r?\n/;
function P_(e) {
  function t(y, _) {
    if (!y || !_)
      return 6;
    var E = y.charAt(y.length - 1), w = _.charAt(0), A = E.match(zc), k = w.match(zc), L = A && E.match(Wc), I = k && w.match(Wc), $ = L && E.match(Kc), R = I && w.match(Kc), P = $ && y.match(q_), H = R && _.match(B_);
    return P || H ? 5 : $ || R ? 4 : A && !L && I ? 3 : L || I ? 2 : A || k ? 1 : 0;
  }
  for (var s = 1; s < e.length - 1; ) {
    if (e[s - 1][0] == ct && e[s + 1][0] == ct) {
      var n = e[s - 1][1], i = e[s][1], r = e[s + 1][1], o = Hr(n, i);
      if (o) {
        var l = i.substring(i.length - o);
        n = n.substring(0, n.length - o), i = l + i.substring(0, i.length - o), r = l + r;
      }
      for (var a = n, u = i, h = r, d = t(n, i) + t(i, r); i.charAt(0) === r.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + r.charAt(0), r = r.substring(1);
        var b = t(n, i) + t(i, r);
        b >= d && (d = b, a = n, u = i, h = r);
      }
      e[s - 1][1] != a && (a ? e[s - 1][1] = a : (e.splice(s - 1, 1), s--), e[s][1] = u, h ? e[s + 1][1] = h : (e.splice(s + 1, 1), s--));
    }
    s++;
  }
}
function _l(e, t) {
  e.push([ct, ""]);
  for (var s = 0, n = 0, i = 0, r = "", o = "", l; s < e.length; ) {
    if (s < e.length - 1 && !e[s][1]) {
      e.splice(s, 1);
      continue;
    }
    switch (e[s][0]) {
      case Tt:
        i++, o += e[s][1], s++;
        break;
      case It:
        n++, r += e[s][1], s++;
        break;
      case ct:
        var a = s - i - n - 1;
        if (t) {
          if (a >= 0 && ch(e[a][1])) {
            var u = e[a][1].slice(-1);
            if (e[a][1] = e[a][1].slice(
              0,
              -1
            ), r = u + r, o = u + o, !e[a][1]) {
              e.splice(a, 1), s--;
              var h = a - 1;
              e[h] && e[h][0] === Tt && (i++, o = e[h][1] + o, h--), e[h] && e[h][0] === It && (n++, r = e[h][1] + r, h--), a = h;
            }
          }
          if (lh(e[s][1])) {
            var u = e[s][1].charAt(0);
            e[s][1] = e[s][1].slice(1), r += u, o += u;
          }
        }
        if (s < e.length - 1 && !e[s][1]) {
          e.splice(s, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (l = vl(o, r), l !== 0 && (a >= 0 ? e[a][1] += o.substring(
            0,
            l
          ) : (e.splice(0, 0, [
            ct,
            o.substring(0, l)
          ]), s++), o = o.substring(l), r = r.substring(l)), l = Hr(o, r), l !== 0 && (e[s][1] = o.substring(o.length - l) + e[s][1], o = o.substring(
            0,
            o.length - l
          ), r = r.substring(
            0,
            r.length - l
          )));
          var d = i + n;
          r.length === 0 && o.length === 0 ? (e.splice(s - d, d), s = s - d) : r.length === 0 ? (e.splice(s - d, d, [Tt, o]), s = s - d + 1) : o.length === 0 ? (e.splice(s - d, d, [It, r]), s = s - d + 1) : (e.splice(
            s - d,
            d,
            [It, r],
            [Tt, o]
          ), s = s - d + 2);
        }
        s !== 0 && e[s - 1][0] === ct ? (e[s - 1][1] += e[s][1], e.splice(s, 1)) : s++, i = 0, n = 0, r = "", o = "";
        break;
    }
  }
  e[e.length - 1][1] === "" && e.pop();
  var b = !1;
  for (s = 1; s < e.length - 1; )
    e[s - 1][0] === ct && e[s + 1][0] === ct && (e[s][1].substring(
      e[s][1].length - e[s - 1][1].length
    ) === e[s - 1][1] ? (e[s][1] = e[s - 1][1] + e[s][1].substring(
      0,
      e[s][1].length - e[s - 1][1].length
    ), e[s + 1][1] = e[s - 1][1] + e[s + 1][1], e.splice(s - 1, 1), b = !0) : e[s][1].substring(0, e[s + 1][1].length) == e[s + 1][1] && (e[s - 1][1] += e[s + 1][1], e[s][1] = e[s][1].substring(e[s + 1][1].length) + e[s + 1][1], e.splice(s + 1, 1), b = !0)), s++;
  b && _l(e, t);
}
function oh(e) {
  return e >= 55296 && e <= 56319;
}
function ah(e) {
  return e >= 56320 && e <= 57343;
}
function lh(e) {
  return ah(e.charCodeAt(0));
}
function ch(e) {
  return oh(e.charCodeAt(e.length - 1));
}
function j_(e) {
  for (var t = [], s = 0; s < e.length; s++)
    e[s][1].length > 0 && t.push(e[s]);
  return t;
}
function ta(e, t, s, n) {
  return ch(e) || lh(n) ? null : j_([
    [ct, e],
    [It, t],
    [Tt, s],
    [ct, n]
  ]);
}
function V_(e, t, s) {
  var n = typeof s == "number" ? { index: s, length: 0 } : s.oldRange, i = typeof s == "number" ? null : s.newRange, r = e.length, o = t.length;
  if (n.length === 0 && (i === null || i.length === 0)) {
    var l = n.index, a = e.slice(0, l), u = e.slice(l), h = i ? i.index : null;
    t: {
      var d = l + o - r;
      if (h !== null && h !== d || d < 0 || d > o)
        break t;
      var b = t.slice(0, d), y = t.slice(d);
      if (y !== u)
        break t;
      var _ = Math.min(l, d), E = a.slice(0, _), w = b.slice(0, _);
      if (E !== w)
        break t;
      var A = a.slice(_), k = b.slice(_);
      return ta(E, A, k, u);
    }
    t: {
      if (h !== null && h !== l)
        break t;
      var L = l, b = t.slice(0, L), y = t.slice(L);
      if (b !== a)
        break t;
      var I = Math.min(r - L, o - L), $ = u.slice(u.length - I), R = y.slice(y.length - I);
      if ($ !== R)
        break t;
      var A = u.slice(0, u.length - I), k = y.slice(0, y.length - I);
      return ta(a, A, k, $);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = e.slice(0, n.index), $ = e.slice(n.index + n.length), _ = E.length, I = $.length;
      if (o < _ + I)
        break t;
      var w = t.slice(0, _), R = t.slice(o - I);
      if (E !== w || $ !== R)
        break t;
      var A = e.slice(_, r - I), k = t.slice(_, o - I);
      return ta(E, A, k, $);
    }
  return null;
}
function zr(e, t, s, n) {
  return vi(e, t, s, n, !0);
}
zr.INSERT = Tt;
zr.DELETE = It;
zr.EQUAL = ct;
var U_ = zr, kr = { exports: {} };
kr.exports;
(function(e, t) {
  var s = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", a = "[object Date]", u = "[object Error]", h = "[object Function]", d = "[object GeneratorFunction]", b = "[object Map]", y = "[object Number]", _ = "[object Object]", E = "[object Promise]", w = "[object RegExp]", A = "[object Set]", k = "[object String]", L = "[object Symbol]", I = "[object WeakMap]", $ = "[object ArrayBuffer]", R = "[object DataView]", P = "[object Float32Array]", H = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Dt = "[object Uint16Array]", qt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, Et = /\w*$/, Ke = /^\[object .+?Constructor\]$/, Yt = /^(?:0|[1-9]\d*)$/, Y = {};
  Y[r] = Y[o] = Y[$] = Y[R] = Y[l] = Y[a] = Y[P] = Y[H] = Y[J] = Y[tt] = Y[nt] = Y[b] = Y[y] = Y[_] = Y[w] = Y[A] = Y[k] = Y[L] = Y[ot] = Y[it] = Y[Dt] = Y[qt] = !0, Y[u] = Y[h] = Y[I] = !1;
  var bs = typeof is == "object" && is && is.Object === Object && is, ke = typeof self == "object" && self && self.Object === Object && self, gt = bs || ke || Function("return this")(), Xt = t && !t.nodeType && t, G = Xt && !0 && e && !e.nodeType && e, de = G && G.exports === Xt;
  function Ge(c, p) {
    return c.set(p[0], p[1]), c;
  }
  function at(c, p) {
    return c.add(p), c;
  }
  function Ye(c, p) {
    for (var v = -1, N = c ? c.length : 0; ++v < N && p(c[v], v, c) !== !1; )
      ;
    return c;
  }
  function Gs(c, p) {
    for (var v = -1, N = p.length, z = c.length; ++v < N; )
      c[z + v] = p[v];
    return c;
  }
  function Ce(c, p, v, N) {
    for (var z = -1, j = c ? c.length : 0; ++z < j; )
      v = p(v, c[z], z, c);
    return v;
  }
  function ys(c, p) {
    for (var v = -1, N = Array(c); ++v < c; )
      N[v] = p(v);
    return N;
  }
  function vs(c, p) {
    return c == null ? void 0 : c[p];
  }
  function _s(c) {
    var p = !1;
    if (c != null && typeof c.toString != "function")
      try {
        p = !!(c + "");
      } catch {
      }
    return p;
  }
  function Ys(c) {
    var p = -1, v = Array(c.size);
    return c.forEach(function(N, z) {
      v[++p] = [z, N];
    }), v;
  }
  function Xe(c, p) {
    return function(v) {
      return c(p(v));
    };
  }
  function Es(c) {
    var p = -1, v = Array(c.size);
    return c.forEach(function(N) {
      v[++p] = N;
    }), v;
  }
  var qn = Array.prototype, Bn = Function.prototype, Ot = Object.prototype, he = gt["__core-js_shared__"], ws = function() {
    var c = /[^.]+$/.exec(he && he.keys && he.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Ts = Bn.toString, kt = Ot.hasOwnProperty, Se = Ot.toString, Xs = RegExp(
    "^" + Ts.call(kt).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), fe = de ? gt.Buffer : void 0, Le = gt.Symbol, Pn = gt.Uint8Array, Bt = Xe(Object.getPrototypeOf, Object), qi = Object.create, Bi = Ot.propertyIsEnumerable, Xr = qn.splice, jn = Object.getOwnPropertySymbols, Zs = fe ? fe.isBuffer : void 0, Pi = Xe(Object.keys, Object), Qs = Qt(gt, "DataView"), As = Qt(gt, "Map"), Zt = Qt(gt, "Promise"), Js = Qt(gt, "Set"), Vn = Qt(gt, "WeakMap"), Ns = Qt(Object, "create"), Un = wt(Qs), Os = wt(As), Fn = wt(Zt), Hn = wt(Js), zn = wt(Vn), Ze = Le ? Le.prototype : void 0, ji = Ze ? Ze.valueOf : void 0;
  function Ie(c) {
    var p = -1, v = c ? c.length : 0;
    for (this.clear(); ++p < v; ) {
      var N = c[p];
      this.set(N[0], N[1]);
    }
  }
  function Zr() {
    this.__data__ = Ns ? Ns(null) : {};
  }
  function Qr(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Jr(c) {
    var p = this.__data__;
    if (Ns) {
      var v = p[c];
      return v === n ? void 0 : v;
    }
    return kt.call(p, c) ? p[c] : void 0;
  }
  function Vi(c) {
    var p = this.__data__;
    return Ns ? p[c] !== void 0 : kt.call(p, c);
  }
  function Wn(c, p) {
    var v = this.__data__;
    return v[c] = Ns && p === void 0 ? n : p, this;
  }
  Ie.prototype.clear = Zr, Ie.prototype.delete = Qr, Ie.prototype.get = Jr, Ie.prototype.has = Vi, Ie.prototype.set = Wn;
  function dt(c) {
    var p = -1, v = c ? c.length : 0;
    for (this.clear(); ++p < v; ) {
      var N = c[p];
      this.set(N[0], N[1]);
    }
  }
  function to() {
    this.__data__ = [];
  }
  function eo(c) {
    var p = this.__data__, v = en(p, c);
    if (v < 0)
      return !1;
    var N = p.length - 1;
    return v == N ? p.pop() : Xr.call(p, v, 1), !0;
  }
  function so(c) {
    var p = this.__data__, v = en(p, c);
    return v < 0 ? void 0 : p[v][1];
  }
  function no(c) {
    return en(this.__data__, c) > -1;
  }
  function io(c, p) {
    var v = this.__data__, N = en(v, c);
    return N < 0 ? v.push([c, p]) : v[N][1] = p, this;
  }
  dt.prototype.clear = to, dt.prototype.delete = eo, dt.prototype.get = so, dt.prototype.has = no, dt.prototype.set = io;
  function mt(c) {
    var p = -1, v = c ? c.length : 0;
    for (this.clear(); ++p < v; ) {
      var N = c[p];
      this.set(N[0], N[1]);
    }
  }
  function ro() {
    this.__data__ = {
      hash: new Ie(),
      map: new (As || dt)(),
      string: new Ie()
    };
  }
  function oo(c) {
    return Cs(this, c).delete(c);
  }
  function ao(c) {
    return Cs(this, c).get(c);
  }
  function lo(c) {
    return Cs(this, c).has(c);
  }
  function co(c, p) {
    return Cs(this, c).set(c, p), this;
  }
  mt.prototype.clear = ro, mt.prototype.delete = oo, mt.prototype.get = ao, mt.prototype.has = lo, mt.prototype.set = co;
  function Ct(c) {
    this.__data__ = new dt(c);
  }
  function uo() {
    this.__data__ = new dt();
  }
  function ho(c) {
    return this.__data__.delete(c);
  }
  function fo(c) {
    return this.__data__.get(c);
  }
  function po(c) {
    return this.__data__.has(c);
  }
  function go(c, p) {
    var v = this.__data__;
    if (v instanceof dt) {
      var N = v.__data__;
      if (!As || N.length < s - 1)
        return N.push([c, p]), this;
      v = this.__data__ = new mt(N);
    }
    return v.set(c, p), this;
  }
  Ct.prototype.clear = uo, Ct.prototype.delete = ho, Ct.prototype.get = fo, Ct.prototype.has = po, Ct.prototype.set = go;
  function tn(c, p) {
    var v = Xn(c) || nn(c) ? ys(c.length, String) : [], N = v.length, z = !!N;
    for (var j in c)
      kt.call(c, j) && !(z && (j == "length" || So(j, N))) && v.push(j);
    return v;
  }
  function Ui(c, p, v) {
    var N = c[p];
    (!(kt.call(c, p) && Ki(N, v)) || v === void 0 && !(p in c)) && (c[p] = v);
  }
  function en(c, p) {
    for (var v = c.length; v--; )
      if (Ki(c[v][0], p))
        return v;
    return -1;
  }
  function pe(c, p) {
    return c && Yn(p, Qn(p), c);
  }
  function Kn(c, p, v, N, z, j, Z) {
    var X;
    if (N && (X = j ? N(c, z, j, Z) : N(c)), X !== void 0)
      return X;
    if (!me(c))
      return c;
    var rt = Xn(c);
    if (rt) {
      if (X = ko(c), !p)
        return Ao(c, X);
    } else {
      var Q = $e(c), bt = Q == h || Q == d;
      if (Gi(c))
        return sn(c, p);
      if (Q == _ || Q == r || bt && !j) {
        if (_s(c))
          return j ? c : {};
        if (X = ge(bt ? {} : c), !p)
          return No(c, pe(X, c));
      } else {
        if (!Y[Q])
          return j ? c : {};
        X = Co(c, Q, Kn, p);
      }
    }
    Z || (Z = new Ct());
    var St = Z.get(c);
    if (St)
      return St;
    if (Z.set(c, X), !rt)
      var lt = v ? Oo(c) : Qn(c);
    return Ye(lt || c, function(yt, ht) {
      lt && (ht = yt, yt = c[ht]), Ui(X, ht, Kn(yt, p, v, N, ht, c, Z));
    }), X;
  }
  function mo(c) {
    return me(c) ? qi(c) : {};
  }
  function bo(c, p, v) {
    var N = p(c);
    return Xn(c) ? N : Gs(N, v(c));
  }
  function yo(c) {
    return Se.call(c);
  }
  function vo(c) {
    if (!me(c) || Io(c))
      return !1;
    var p = Zn(c) || _s(c) ? Xs : Ke;
    return p.test(wt(c));
  }
  function _o(c) {
    if (!zi(c))
      return Pi(c);
    var p = [];
    for (var v in Object(c))
      kt.call(c, v) && v != "constructor" && p.push(v);
    return p;
  }
  function sn(c, p) {
    if (p)
      return c.slice();
    var v = new c.constructor(c.length);
    return c.copy(v), v;
  }
  function Gn(c) {
    var p = new c.constructor(c.byteLength);
    return new Pn(p).set(new Pn(c)), p;
  }
  function ks(c, p) {
    var v = p ? Gn(c.buffer) : c.buffer;
    return new c.constructor(v, c.byteOffset, c.byteLength);
  }
  function Fi(c, p, v) {
    var N = p ? v(Ys(c), !0) : Ys(c);
    return Ce(N, Ge, new c.constructor());
  }
  function Hi(c) {
    var p = new c.constructor(c.source, Et.exec(c));
    return p.lastIndex = c.lastIndex, p;
  }
  function Eo(c, p, v) {
    var N = p ? v(Es(c), !0) : Es(c);
    return Ce(N, at, new c.constructor());
  }
  function wo(c) {
    return ji ? Object(ji.call(c)) : {};
  }
  function To(c, p) {
    var v = p ? Gn(c.buffer) : c.buffer;
    return new c.constructor(v, c.byteOffset, c.length);
  }
  function Ao(c, p) {
    var v = -1, N = c.length;
    for (p || (p = Array(N)); ++v < N; )
      p[v] = c[v];
    return p;
  }
  function Yn(c, p, v, N) {
    v || (v = {});
    for (var z = -1, j = p.length; ++z < j; ) {
      var Z = p[z], X = void 0;
      Ui(v, Z, X === void 0 ? c[Z] : X);
    }
    return v;
  }
  function No(c, p) {
    return Yn(c, xe(c), p);
  }
  function Oo(c) {
    return bo(c, Qn, xe);
  }
  function Cs(c, p) {
    var v = c.__data__;
    return Lo(p) ? v[typeof p == "string" ? "string" : "hash"] : v.map;
  }
  function Qt(c, p) {
    var v = vs(c, p);
    return vo(v) ? v : void 0;
  }
  var xe = jn ? Xe(jn, Object) : $o, $e = yo;
  (Qs && $e(new Qs(new ArrayBuffer(1))) != R || As && $e(new As()) != b || Zt && $e(Zt.resolve()) != E || Js && $e(new Js()) != A || Vn && $e(new Vn()) != I) && ($e = function(c) {
    var p = Se.call(c), v = p == _ ? c.constructor : void 0, N = v ? wt(v) : void 0;
    if (N)
      switch (N) {
        case Un:
          return R;
        case Os:
          return b;
        case Fn:
          return E;
        case Hn:
          return A;
        case zn:
          return I;
      }
    return p;
  });
  function ko(c) {
    var p = c.length, v = c.constructor(p);
    return p && typeof c[0] == "string" && kt.call(c, "index") && (v.index = c.index, v.input = c.input), v;
  }
  function ge(c) {
    return typeof c.constructor == "function" && !zi(c) ? mo(Bt(c)) : {};
  }
  function Co(c, p, v, N) {
    var z = c.constructor;
    switch (p) {
      case $:
        return Gn(c);
      case l:
      case a:
        return new z(+c);
      case R:
        return ks(c, N);
      case P:
      case H:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Dt:
      case qt:
        return To(c, N);
      case b:
        return Fi(c, N, v);
      case y:
      case k:
        return new z(c);
      case w:
        return Hi(c);
      case A:
        return Eo(c, N, v);
      case L:
        return wo(c);
    }
  }
  function So(c, p) {
    return p = p ?? i, !!p && (typeof c == "number" || Yt.test(c)) && c > -1 && c % 1 == 0 && c < p;
  }
  function Lo(c) {
    var p = typeof c;
    return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? c !== "__proto__" : c === null;
  }
  function Io(c) {
    return !!ws && ws in c;
  }
  function zi(c) {
    var p = c && c.constructor, v = typeof p == "function" && p.prototype || Ot;
    return c === v;
  }
  function wt(c) {
    if (c != null) {
      try {
        return Ts.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Wi(c) {
    return Kn(c, !0, !0);
  }
  function Ki(c, p) {
    return c === p || c !== c && p !== p;
  }
  function nn(c) {
    return xo(c) && kt.call(c, "callee") && (!Bi.call(c, "callee") || Se.call(c) == r);
  }
  var Xn = Array.isArray;
  function rn(c) {
    return c != null && Yi(c.length) && !Zn(c);
  }
  function xo(c) {
    return Xi(c) && rn(c);
  }
  var Gi = Zs || Ro;
  function Zn(c) {
    var p = me(c) ? Se.call(c) : "";
    return p == h || p == d;
  }
  function Yi(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function me(c) {
    var p = typeof c;
    return !!c && (p == "object" || p == "function");
  }
  function Xi(c) {
    return !!c && typeof c == "object";
  }
  function Qn(c) {
    return rn(c) ? tn(c) : _o(c);
  }
  function $o() {
    return [];
  }
  function Ro() {
    return !1;
  }
  e.exports = Wi;
})(kr, kr.exports);
var uh = kr.exports, Cr = { exports: {} };
Cr.exports;
(function(e, t) {
  var s = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, l = "[object Arguments]", a = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", d = "[object Date]", b = "[object Error]", y = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", w = "[object Number]", A = "[object Null]", k = "[object Object]", L = "[object Promise]", I = "[object Proxy]", $ = "[object RegExp]", R = "[object Set]", P = "[object String]", H = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Dt = "[object Float64Array]", qt = "[object Int8Array]", ut = "[object Int16Array]", Et = "[object Int32Array]", Ke = "[object Uint8Array]", Yt = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", bs = "[object Uint32Array]", ke = /[\\^$.*+?()[\]{}|]/g, gt = /^\[object .+?Constructor\]$/, Xt = /^(?:0|[1-9]\d*)$/, G = {};
  G[it] = G[Dt] = G[qt] = G[ut] = G[Et] = G[Ke] = G[Yt] = G[Y] = G[bs] = !0, G[l] = G[a] = G[nt] = G[h] = G[ot] = G[d] = G[b] = G[y] = G[E] = G[w] = G[k] = G[$] = G[R] = G[P] = G[tt] = !1;
  var de = typeof is == "object" && is && is.Object === Object && is, Ge = typeof self == "object" && self && self.Object === Object && self, at = de || Ge || Function("return this")(), Ye = t && !t.nodeType && t, Gs = Ye && !0 && e && !e.nodeType && e, Ce = Gs && Gs.exports === Ye, ys = Ce && de.process, vs = function() {
    try {
      return ys && ys.binding && ys.binding("util");
    } catch {
    }
  }(), _s = vs && vs.isTypedArray;
  function Ys(c, p) {
    for (var v = -1, N = c == null ? 0 : c.length, z = 0, j = []; ++v < N; ) {
      var Z = c[v];
      p(Z, v, c) && (j[z++] = Z);
    }
    return j;
  }
  function Xe(c, p) {
    for (var v = -1, N = p.length, z = c.length; ++v < N; )
      c[z + v] = p[v];
    return c;
  }
  function Es(c, p) {
    for (var v = -1, N = c == null ? 0 : c.length; ++v < N; )
      if (p(c[v], v, c))
        return !0;
    return !1;
  }
  function qn(c, p) {
    for (var v = -1, N = Array(c); ++v < c; )
      N[v] = p(v);
    return N;
  }
  function Bn(c) {
    return function(p) {
      return c(p);
    };
  }
  function Ot(c, p) {
    return c.has(p);
  }
  function he(c, p) {
    return c == null ? void 0 : c[p];
  }
  function ws(c) {
    var p = -1, v = Array(c.size);
    return c.forEach(function(N, z) {
      v[++p] = [z, N];
    }), v;
  }
  function Ts(c, p) {
    return function(v) {
      return c(p(v));
    };
  }
  function kt(c) {
    var p = -1, v = Array(c.size);
    return c.forEach(function(N) {
      v[++p] = N;
    }), v;
  }
  var Se = Array.prototype, Xs = Function.prototype, fe = Object.prototype, Le = at["__core-js_shared__"], Pn = Xs.toString, Bt = fe.hasOwnProperty, qi = function() {
    var c = /[^.]+$/.exec(Le && Le.keys && Le.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Bi = fe.toString, Xr = RegExp(
    "^" + Pn.call(Bt).replace(ke, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), jn = Ce ? at.Buffer : void 0, Zs = at.Symbol, Pi = at.Uint8Array, Qs = fe.propertyIsEnumerable, As = Se.splice, Zt = Zs ? Zs.toStringTag : void 0, Js = Object.getOwnPropertySymbols, Vn = jn ? jn.isBuffer : void 0, Ns = Ts(Object.keys, Object), Un = xe(at, "DataView"), Os = xe(at, "Map"), Fn = xe(at, "Promise"), Hn = xe(at, "Set"), zn = xe(at, "WeakMap"), Ze = xe(Object, "create"), ji = wt(Un), Ie = wt(Os), Zr = wt(Fn), Qr = wt(Hn), Jr = wt(zn), Vi = Zs ? Zs.prototype : void 0, Wn = Vi ? Vi.valueOf : void 0;
  function dt(c) {
    var p = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++p < v; ) {
      var N = c[p];
      this.set(N[0], N[1]);
    }
  }
  function to() {
    this.__data__ = Ze ? Ze(null) : {}, this.size = 0;
  }
  function eo(c) {
    var p = this.has(c) && delete this.__data__[c];
    return this.size -= p ? 1 : 0, p;
  }
  function so(c) {
    var p = this.__data__;
    if (Ze) {
      var v = p[c];
      return v === n ? void 0 : v;
    }
    return Bt.call(p, c) ? p[c] : void 0;
  }
  function no(c) {
    var p = this.__data__;
    return Ze ? p[c] !== void 0 : Bt.call(p, c);
  }
  function io(c, p) {
    var v = this.__data__;
    return this.size += this.has(c) ? 0 : 1, v[c] = Ze && p === void 0 ? n : p, this;
  }
  dt.prototype.clear = to, dt.prototype.delete = eo, dt.prototype.get = so, dt.prototype.has = no, dt.prototype.set = io;
  function mt(c) {
    var p = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++p < v; ) {
      var N = c[p];
      this.set(N[0], N[1]);
    }
  }
  function ro() {
    this.__data__ = [], this.size = 0;
  }
  function oo(c) {
    var p = this.__data__, v = sn(p, c);
    if (v < 0)
      return !1;
    var N = p.length - 1;
    return v == N ? p.pop() : As.call(p, v, 1), --this.size, !0;
  }
  function ao(c) {
    var p = this.__data__, v = sn(p, c);
    return v < 0 ? void 0 : p[v][1];
  }
  function lo(c) {
    return sn(this.__data__, c) > -1;
  }
  function co(c, p) {
    var v = this.__data__, N = sn(v, c);
    return N < 0 ? (++this.size, v.push([c, p])) : v[N][1] = p, this;
  }
  mt.prototype.clear = ro, mt.prototype.delete = oo, mt.prototype.get = ao, mt.prototype.has = lo, mt.prototype.set = co;
  function Ct(c) {
    var p = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++p < v; ) {
      var N = c[p];
      this.set(N[0], N[1]);
    }
  }
  function uo() {
    this.size = 0, this.__data__ = {
      hash: new dt(),
      map: new (Os || mt)(),
      string: new dt()
    };
  }
  function ho(c) {
    var p = Qt(this, c).delete(c);
    return this.size -= p ? 1 : 0, p;
  }
  function fo(c) {
    return Qt(this, c).get(c);
  }
  function po(c) {
    return Qt(this, c).has(c);
  }
  function go(c, p) {
    var v = Qt(this, c), N = v.size;
    return v.set(c, p), this.size += v.size == N ? 0 : 1, this;
  }
  Ct.prototype.clear = uo, Ct.prototype.delete = ho, Ct.prototype.get = fo, Ct.prototype.has = po, Ct.prototype.set = go;
  function tn(c) {
    var p = -1, v = c == null ? 0 : c.length;
    for (this.__data__ = new Ct(); ++p < v; )
      this.add(c[p]);
  }
  function Ui(c) {
    return this.__data__.set(c, n), this;
  }
  function en(c) {
    return this.__data__.has(c);
  }
  tn.prototype.add = tn.prototype.push = Ui, tn.prototype.has = en;
  function pe(c) {
    var p = this.__data__ = new mt(c);
    this.size = p.size;
  }
  function Kn() {
    this.__data__ = new mt(), this.size = 0;
  }
  function mo(c) {
    var p = this.__data__, v = p.delete(c);
    return this.size = p.size, v;
  }
  function bo(c) {
    return this.__data__.get(c);
  }
  function yo(c) {
    return this.__data__.has(c);
  }
  function vo(c, p) {
    var v = this.__data__;
    if (v instanceof mt) {
      var N = v.__data__;
      if (!Os || N.length < s - 1)
        return N.push([c, p]), this.size = ++v.size, this;
      v = this.__data__ = new Ct(N);
    }
    return v.set(c, p), this.size = v.size, this;
  }
  pe.prototype.clear = Kn, pe.prototype.delete = mo, pe.prototype.get = bo, pe.prototype.has = yo, pe.prototype.set = vo;
  function _o(c, p) {
    var v = nn(c), N = !v && Ki(c), z = !v && !N && rn(c), j = !v && !N && !z && Xi(c), Z = v || N || z || j, X = Z ? qn(c.length, String) : [], rt = X.length;
    for (var Q in c)
      Bt.call(c, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      z && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      Co(Q, rt))) && X.push(Q);
    return X;
  }
  function sn(c, p) {
    for (var v = c.length; v--; )
      if (Wi(c[v][0], p))
        return v;
    return -1;
  }
  function Gn(c, p, v) {
    var N = p(c);
    return nn(c) ? N : Xe(N, v(c));
  }
  function ks(c) {
    return c == null ? c === void 0 ? J : A : Zt && Zt in Object(c) ? $e(c) : zi(c);
  }
  function Fi(c) {
    return me(c) && ks(c) == l;
  }
  function Hi(c, p, v, N, z) {
    return c === p ? !0 : c == null || p == null || !me(c) && !me(p) ? c !== c && p !== p : Eo(c, p, v, N, Hi, z);
  }
  function Eo(c, p, v, N, z, j) {
    var Z = nn(c), X = nn(p), rt = Z ? a : ge(c), Q = X ? a : ge(p);
    rt = rt == l ? k : rt, Q = Q == l ? k : Q;
    var bt = rt == k, St = Q == k, lt = rt == Q;
    if (lt && rn(c)) {
      if (!rn(p))
        return !1;
      Z = !0, bt = !1;
    }
    if (lt && !bt)
      return j || (j = new pe()), Z || Xi(c) ? Yn(c, p, v, N, z, j) : No(c, p, rt, v, N, z, j);
    if (!(v & i)) {
      var yt = bt && Bt.call(c, "__wrapped__"), ht = St && Bt.call(p, "__wrapped__");
      if (yt || ht) {
        var Qe = yt ? c.value() : c, Re = ht ? p.value() : p;
        return j || (j = new pe()), z(Qe, Re, v, N, j);
      }
    }
    return lt ? (j || (j = new pe()), Oo(c, p, v, N, z, j)) : !1;
  }
  function wo(c) {
    if (!Yi(c) || Lo(c))
      return !1;
    var p = Gi(c) ? Xr : gt;
    return p.test(wt(c));
  }
  function To(c) {
    return me(c) && Zn(c.length) && !!G[ks(c)];
  }
  function Ao(c) {
    if (!Io(c))
      return Ns(c);
    var p = [];
    for (var v in Object(c))
      Bt.call(c, v) && v != "constructor" && p.push(v);
    return p;
  }
  function Yn(c, p, v, N, z, j) {
    var Z = v & i, X = c.length, rt = p.length;
    if (X != rt && !(Z && rt > X))
      return !1;
    var Q = j.get(c);
    if (Q && j.get(p))
      return Q == p;
    var bt = -1, St = !0, lt = v & r ? new tn() : void 0;
    for (j.set(c, p), j.set(p, c); ++bt < X; ) {
      var yt = c[bt], ht = p[bt];
      if (N)
        var Qe = Z ? N(ht, yt, bt, p, c, j) : N(yt, ht, bt, c, p, j);
      if (Qe !== void 0) {
        if (Qe)
          continue;
        St = !1;
        break;
      }
      if (lt) {
        if (!Es(p, function(Re, Ss) {
          if (!Ot(lt, Ss) && (yt === Re || z(yt, Re, v, N, j)))
            return lt.push(Ss);
        })) {
          St = !1;
          break;
        }
      } else if (!(yt === ht || z(yt, ht, v, N, j))) {
        St = !1;
        break;
      }
    }
    return j.delete(c), j.delete(p), St;
  }
  function No(c, p, v, N, z, j, Z) {
    switch (v) {
      case ot:
        if (c.byteLength != p.byteLength || c.byteOffset != p.byteOffset)
          return !1;
        c = c.buffer, p = p.buffer;
      case nt:
        return !(c.byteLength != p.byteLength || !j(new Pi(c), new Pi(p)));
      case h:
      case d:
      case w:
        return Wi(+c, +p);
      case b:
        return c.name == p.name && c.message == p.message;
      case $:
      case P:
        return c == p + "";
      case E:
        var X = ws;
      case R:
        var rt = N & i;
        if (X || (X = kt), c.size != p.size && !rt)
          return !1;
        var Q = Z.get(c);
        if (Q)
          return Q == p;
        N |= r, Z.set(c, p);
        var bt = Yn(X(c), X(p), N, z, j, Z);
        return Z.delete(c), bt;
      case H:
        if (Wn)
          return Wn.call(c) == Wn.call(p);
    }
    return !1;
  }
  function Oo(c, p, v, N, z, j) {
    var Z = v & i, X = Cs(c), rt = X.length, Q = Cs(p), bt = Q.length;
    if (rt != bt && !Z)
      return !1;
    for (var St = rt; St--; ) {
      var lt = X[St];
      if (!(Z ? lt in p : Bt.call(p, lt)))
        return !1;
    }
    var yt = j.get(c);
    if (yt && j.get(p))
      return yt == p;
    var ht = !0;
    j.set(c, p), j.set(p, c);
    for (var Qe = Z; ++St < rt; ) {
      lt = X[St];
      var Re = c[lt], Ss = p[lt];
      if (N)
        var $l = Z ? N(Ss, Re, lt, p, c, j) : N(Re, Ss, lt, c, p, j);
      if (!($l === void 0 ? Re === Ss || z(Re, Ss, v, N, j) : $l)) {
        ht = !1;
        break;
      }
      Qe || (Qe = lt == "constructor");
    }
    if (ht && !Qe) {
      var Zi = c.constructor, Qi = p.constructor;
      Zi != Qi && "constructor" in c && "constructor" in p && !(typeof Zi == "function" && Zi instanceof Zi && typeof Qi == "function" && Qi instanceof Qi) && (ht = !1);
    }
    return j.delete(c), j.delete(p), ht;
  }
  function Cs(c) {
    return Gn(c, Qn, ko);
  }
  function Qt(c, p) {
    var v = c.__data__;
    return So(p) ? v[typeof p == "string" ? "string" : "hash"] : v.map;
  }
  function xe(c, p) {
    var v = he(c, p);
    return wo(v) ? v : void 0;
  }
  function $e(c) {
    var p = Bt.call(c, Zt), v = c[Zt];
    try {
      c[Zt] = void 0;
      var N = !0;
    } catch {
    }
    var z = Bi.call(c);
    return N && (p ? c[Zt] = v : delete c[Zt]), z;
  }
  var ko = Js ? function(c) {
    return c == null ? [] : (c = Object(c), Ys(Js(c), function(p) {
      return Qs.call(c, p);
    }));
  } : $o, ge = ks;
  (Un && ge(new Un(new ArrayBuffer(1))) != ot || Os && ge(new Os()) != E || Fn && ge(Fn.resolve()) != L || Hn && ge(new Hn()) != R || zn && ge(new zn()) != tt) && (ge = function(c) {
    var p = ks(c), v = p == k ? c.constructor : void 0, N = v ? wt(v) : "";
    if (N)
      switch (N) {
        case ji:
          return ot;
        case Ie:
          return E;
        case Zr:
          return L;
        case Qr:
          return R;
        case Jr:
          return tt;
      }
    return p;
  });
  function Co(c, p) {
    return p = p ?? o, !!p && (typeof c == "number" || Xt.test(c)) && c > -1 && c % 1 == 0 && c < p;
  }
  function So(c) {
    var p = typeof c;
    return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? c !== "__proto__" : c === null;
  }
  function Lo(c) {
    return !!qi && qi in c;
  }
  function Io(c) {
    var p = c && c.constructor, v = typeof p == "function" && p.prototype || fe;
    return c === v;
  }
  function zi(c) {
    return Bi.call(c);
  }
  function wt(c) {
    if (c != null) {
      try {
        return Pn.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Wi(c, p) {
    return c === p || c !== c && p !== p;
  }
  var Ki = Fi(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Fi : function(c) {
    return me(c) && Bt.call(c, "callee") && !Qs.call(c, "callee");
  }, nn = Array.isArray;
  function Xn(c) {
    return c != null && Zn(c.length) && !Gi(c);
  }
  var rn = Vn || Ro;
  function xo(c, p) {
    return Hi(c, p);
  }
  function Gi(c) {
    if (!Yi(c))
      return !1;
    var p = ks(c);
    return p == y || p == _ || p == u || p == I;
  }
  function Zn(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= o;
  }
  function Yi(c) {
    var p = typeof c;
    return c != null && (p == "object" || p == "function");
  }
  function me(c) {
    return c != null && typeof c == "object";
  }
  var Xi = _s ? Bn(_s) : To;
  function Qn(c) {
    return Xn(c) ? _o(c) : Ao(c);
  }
  function $o() {
    return [];
  }
  function Ro() {
    return !1;
  }
  e.exports = xo;
})(Cr, Cr.exports);
var dh = Cr.exports, El = {};
Object.defineProperty(El, "__esModule", { value: !0 });
const F_ = uh, H_ = dh;
var Sa;
(function(e) {
  function t(r = {}, o = {}, l = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = F_(o);
    l || (a = Object.keys(a).reduce((u, h) => (a[h] != null && (u[h] = a[h]), u), {}));
    for (const u in r)
      r[u] !== void 0 && o[u] === void 0 && (a[u] = r[u]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  e.compose = t;
  function s(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const l = Object.keys(r).concat(Object.keys(o)).reduce((a, u) => (H_(r[u], o[u]) || (a[u] = o[u] === void 0 ? null : o[u]), a), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  e.diff = s;
  function n(r = {}, o = {}) {
    r = r || {};
    const l = Object.keys(o).reduce((a, u) => (o[u] !== r[u] && r[u] !== void 0 && (a[u] = o[u]), a), {});
    return Object.keys(r).reduce((a, u) => (r[u] !== o[u] && o[u] === void 0 && (a[u] = null), a), l);
  }
  e.invert = n;
  function i(r, o, l = !1) {
    if (typeof r != "object")
      return o;
    if (typeof o != "object")
      return;
    if (!l)
      return o;
    const a = Object.keys(o).reduce((u, h) => (r[h] === void 0 && (u[h] = o[h]), u), {});
    return Object.keys(a).length > 0 ? a : void 0;
  }
  e.transform = i;
})(Sa || (Sa = {}));
El.default = Sa;
var Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
var La;
(function(e) {
  function t(s) {
    return typeof s.delete == "number" ? s.delete : typeof s.retain == "number" ? s.retain : typeof s.retain == "object" && s.retain !== null ? 1 : typeof s.insert == "string" ? s.insert.length : 1;
  }
  e.length = t;
})(La || (La = {}));
Wr.default = La;
var wl = {};
Object.defineProperty(wl, "__esModule", { value: !0 });
const Gc = Wr;
class z_ {
  constructor(t) {
    this.ops = t, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return this.peekLength() < 1 / 0;
  }
  next(t) {
    t || (t = 1 / 0);
    const s = this.ops[this.index];
    if (s) {
      const n = this.offset, i = Gc.default.length(s);
      if (t >= i - n ? (t = i - n, this.index += 1, this.offset = 0) : this.offset += t, typeof s.delete == "number")
        return { delete: t };
      {
        const r = {};
        return s.attributes && (r.attributes = s.attributes), typeof s.retain == "number" ? r.retain = t : typeof s.retain == "object" && s.retain !== null ? r.retain = s.retain : typeof s.insert == "string" ? r.insert = s.insert.substr(n, t) : r.insert = s.insert, r;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? Gc.default.length(this.ops[this.index]) - this.offset : 1 / 0;
  }
  peekType() {
    const t = this.ops[this.index];
    return t ? typeof t.delete == "number" ? "delete" : typeof t.retain == "number" || typeof t.retain == "object" && t.retain !== null ? "retain" : "insert" : "retain";
  }
  rest() {
    if (this.hasNext()) {
      if (this.offset === 0)
        return this.ops.slice(this.index);
      {
        const t = this.offset, s = this.index, n = this.next(), i = this.ops.slice(this.index);
        return this.offset = t, this.index = s, [n].concat(i);
      }
    } else return [];
  }
}
wl.default = z_;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const s = U_, n = uh, i = dh, r = El;
  t.AttributeMap = r.default;
  const o = Wr;
  t.Op = o.default;
  const l = wl;
  t.OpIterator = l.default;
  const a = "\0", u = (d, b) => {
    if (typeof d != "object" || d === null)
      throw new Error(`cannot retain a ${typeof d}`);
    if (typeof b != "object" || b === null)
      throw new Error(`cannot retain a ${typeof b}`);
    const y = Object.keys(d)[0];
    if (!y || y !== Object.keys(b)[0])
      throw new Error(`embed types not matched: ${y} != ${Object.keys(b)[0]}`);
    return [y, d[y], b[y]];
  };
  class h {
    constructor(b) {
      Array.isArray(b) ? this.ops = b : b != null && Array.isArray(b.ops) ? this.ops = b.ops : this.ops = [];
    }
    static registerEmbed(b, y) {
      this.handlers[b] = y;
    }
    static unregisterEmbed(b) {
      delete this.handlers[b];
    }
    static getHandler(b) {
      const y = this.handlers[b];
      if (!y)
        throw new Error(`no handlers for embed type "${b}"`);
      return y;
    }
    insert(b, y) {
      const _ = {};
      return typeof b == "string" && b.length === 0 ? this : (_.insert = b, y != null && typeof y == "object" && Object.keys(y).length > 0 && (_.attributes = y), this.push(_));
    }
    delete(b) {
      return b <= 0 ? this : this.push({ delete: b });
    }
    retain(b, y) {
      if (typeof b == "number" && b <= 0)
        return this;
      const _ = { retain: b };
      return y != null && typeof y == "object" && Object.keys(y).length > 0 && (_.attributes = y), this.push(_);
    }
    push(b) {
      let y = this.ops.length, _ = this.ops[y - 1];
      if (b = n(b), typeof _ == "object") {
        if (typeof b.delete == "number" && typeof _.delete == "number")
          return this.ops[y - 1] = { delete: _.delete + b.delete }, this;
        if (typeof _.delete == "number" && b.insert != null && (y -= 1, _ = this.ops[y - 1], typeof _ != "object"))
          return this.ops.unshift(b), this;
        if (i(b.attributes, _.attributes)) {
          if (typeof b.insert == "string" && typeof _.insert == "string")
            return this.ops[y - 1] = { insert: _.insert + b.insert }, typeof b.attributes == "object" && (this.ops[y - 1].attributes = b.attributes), this;
          if (typeof b.retain == "number" && typeof _.retain == "number")
            return this.ops[y - 1] = { retain: _.retain + b.retain }, typeof b.attributes == "object" && (this.ops[y - 1].attributes = b.attributes), this;
        }
      }
      return y === this.ops.length ? this.ops.push(b) : this.ops.splice(y, 0, b), this;
    }
    chop() {
      const b = this.ops[this.ops.length - 1];
      return b && typeof b.retain == "number" && !b.attributes && this.ops.pop(), this;
    }
    filter(b) {
      return this.ops.filter(b);
    }
    forEach(b) {
      this.ops.forEach(b);
    }
    map(b) {
      return this.ops.map(b);
    }
    partition(b) {
      const y = [], _ = [];
      return this.forEach((E) => {
        (b(E) ? y : _).push(E);
      }), [y, _];
    }
    reduce(b, y) {
      return this.ops.reduce(b, y);
    }
    changeLength() {
      return this.reduce((b, y) => y.insert ? b + o.default.length(y) : y.delete ? b - y.delete : b, 0);
    }
    length() {
      return this.reduce((b, y) => b + o.default.length(y), 0);
    }
    slice(b = 0, y = 1 / 0) {
      const _ = [], E = new l.default(this.ops);
      let w = 0;
      for (; w < y && E.hasNext(); ) {
        let A;
        w < b ? A = E.next(b - w) : (A = E.next(y - w), _.push(A)), w += o.default.length(A);
      }
      return new h(_);
    }
    compose(b) {
      const y = new l.default(this.ops), _ = new l.default(b.ops), E = [], w = _.peek();
      if (w != null && typeof w.retain == "number" && w.attributes == null) {
        let k = w.retain;
        for (; y.peekType() === "insert" && y.peekLength() <= k; )
          k -= y.peekLength(), E.push(y.next());
        w.retain - k > 0 && _.next(w.retain - k);
      }
      const A = new h(E);
      for (; y.hasNext() || _.hasNext(); )
        if (_.peekType() === "insert")
          A.push(_.next());
        else if (y.peekType() === "delete")
          A.push(y.next());
        else {
          const k = Math.min(y.peekLength(), _.peekLength()), L = y.next(k), I = _.next(k);
          if (I.retain) {
            const $ = {};
            if (typeof L.retain == "number")
              $.retain = typeof I.retain == "number" ? k : I.retain;
            else if (typeof I.retain == "number")
              L.retain == null ? $.insert = L.insert : $.retain = L.retain;
            else {
              const P = L.retain == null ? "insert" : "retain", [H, J, tt] = u(L[P], I.retain), nt = h.getHandler(H);
              $[P] = {
                [H]: nt.compose(J, tt, P === "retain")
              };
            }
            const R = r.default.compose(L.attributes, I.attributes, typeof L.retain == "number");
            if (R && ($.attributes = R), A.push($), !_.hasNext() && i(A.ops[A.ops.length - 1], $)) {
              const P = new h(y.rest());
              return A.concat(P).chop();
            }
          } else typeof I.delete == "number" && (typeof L.retain == "number" || typeof L.retain == "object" && L.retain !== null) && A.push(I);
        }
      return A.chop();
    }
    concat(b) {
      const y = new h(this.ops.slice());
      return b.ops.length > 0 && (y.push(b.ops[0]), y.ops = y.ops.concat(b.ops.slice(1))), y;
    }
    diff(b, y) {
      if (this.ops === b.ops)
        return new h();
      const _ = [this, b].map((L) => L.map((I) => {
        if (I.insert != null)
          return typeof I.insert == "string" ? I.insert : a;
        const $ = L === b ? "on" : "with";
        throw new Error("diff() called " + $ + " non-document");
      }).join("")), E = new h(), w = s(_[0], _[1], y, !0), A = new l.default(this.ops), k = new l.default(b.ops);
      return w.forEach((L) => {
        let I = L[1].length;
        for (; I > 0; ) {
          let $ = 0;
          switch (L[0]) {
            case s.INSERT:
              $ = Math.min(k.peekLength(), I), E.push(k.next($));
              break;
            case s.DELETE:
              $ = Math.min(I, A.peekLength()), A.next($), E.delete($);
              break;
            case s.EQUAL:
              $ = Math.min(A.peekLength(), k.peekLength(), I);
              const R = A.next($), P = k.next($);
              i(R.insert, P.insert) ? E.retain($, r.default.diff(R.attributes, P.attributes)) : E.push(P).delete($);
              break;
          }
          I -= $;
        }
      }), E.chop();
    }
    eachLine(b, y = `
`) {
      const _ = new l.default(this.ops);
      let E = new h(), w = 0;
      for (; _.hasNext(); ) {
        if (_.peekType() !== "insert")
          return;
        const A = _.peek(), k = o.default.length(A) - _.peekLength(), L = typeof A.insert == "string" ? A.insert.indexOf(y, k) - k : -1;
        if (L < 0)
          E.push(_.next());
        else if (L > 0)
          E.push(_.next(L));
        else {
          if (b(E, _.next(1).attributes || {}, w) === !1)
            return;
          w += 1, E = new h();
        }
      }
      E.length() > 0 && b(E, {}, w);
    }
    invert(b) {
      const y = new h();
      return this.reduce((_, E) => {
        if (E.insert)
          y.delete(o.default.length(E));
        else {
          if (typeof E.retain == "number" && E.attributes == null)
            return y.retain(E.retain), _ + E.retain;
          if (E.delete || typeof E.retain == "number") {
            const w = E.delete || E.retain;
            return b.slice(_, _ + w).forEach((k) => {
              E.delete ? y.push(k) : E.retain && E.attributes && y.retain(o.default.length(k), r.default.invert(E.attributes, k.attributes));
            }), _ + w;
          } else if (typeof E.retain == "object" && E.retain !== null) {
            const w = b.slice(_, _ + 1), A = new l.default(w.ops).next(), [k, L, I] = u(E.retain, A.insert), $ = h.getHandler(k);
            return y.retain({ [k]: $.invert(L, I) }, r.default.invert(E.attributes, A.attributes)), _ + 1;
          }
        }
        return _;
      }, 0), y.chop();
    }
    transform(b, y = !1) {
      if (y = !!y, typeof b == "number")
        return this.transformPosition(b, y);
      const _ = b, E = new l.default(this.ops), w = new l.default(_.ops), A = new h();
      for (; E.hasNext() || w.hasNext(); )
        if (E.peekType() === "insert" && (y || w.peekType() !== "insert"))
          A.retain(o.default.length(E.next()));
        else if (w.peekType() === "insert")
          A.push(w.next());
        else {
          const k = Math.min(E.peekLength(), w.peekLength()), L = E.next(k), I = w.next(k);
          if (L.delete)
            continue;
          if (I.delete)
            A.push(I);
          else {
            const $ = L.retain, R = I.retain;
            let P = typeof R == "object" && R !== null ? R : k;
            if (typeof $ == "object" && $ !== null && typeof R == "object" && R !== null) {
              const H = Object.keys($)[0];
              if (H === Object.keys(R)[0]) {
                const J = h.getHandler(H);
                J && (P = {
                  [H]: J.transform($[H], R[H], y)
                });
              }
            }
            A.retain(P, r.default.transform(L.attributes, I.attributes, y));
          }
        }
      return A.chop();
    }
    transformPosition(b, y = !1) {
      y = !!y;
      const _ = new l.default(this.ops);
      let E = 0;
      for (; _.hasNext() && E <= b; ) {
        const w = _.peekLength(), A = _.peekType();
        if (_.next(), A === "delete") {
          b -= Math.min(w, b - E);
          continue;
        } else A === "insert" && (E < b || !y) && (b += w);
        E += w;
      }
      return b;
    }
  }
  h.Op = o.default, h.OpIterator = l.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, e.exports = h, e.exports.default = h;
})(Ca, Ca.exports);
var Ht = Ca.exports;
const q = /* @__PURE__ */ rh(Ht);
class le extends Mt {
  static value() {
  }
  optimize() {
    (this.prev || this.next) && this.remove();
  }
  length() {
    return 0;
  }
  value() {
    return "";
  }
}
le.blotName = "break";
le.tagName = "BR";
let re = class extends Or {
};
function Kr(e) {
  return e.replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t]);
}
const be = class be extends bl {
  static compare(t, s) {
    const n = be.order.indexOf(t), i = be.order.indexOf(s);
    return n >= 0 || i >= 0 ? n - i : t === s ? 0 : t < s ? -1 : 1;
  }
  formatAt(t, s, n, i) {
    if (be.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, B.BLOT)) {
      const r = this.isolate(t, s);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, s, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof be && be.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const s = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(s), s.wrap(this);
    }
  }
};
M(be, "allowedChildren", [be, le, Mt, re]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
M(be, "order", [
  "cursor",
  "inline",
  // Must be lower
  "link",
  // Chrome wants <a> to be lower
  "underline",
  "strike",
  "italic",
  "bold",
  "script",
  "code"
  // Must be higher
]);
let Ne = be;
const Yc = 1;
class pt extends yi {
  constructor() {
    super(...arguments);
    M(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = hh(this)), this.cache.delta;
  }
  deleteAt(s, n) {
    super.deleteAt(s, n), this.cache = {};
  }
  formatAt(s, n, i, r) {
    n <= 0 || (this.scroll.query(i, B.BLOCK) ? s + n === this.length() && this.format(i, r) : super.formatAt(s, Math.min(n, this.length() - s - 1), i, r), this.cache = {});
  }
  insertAt(s, n, i) {
    if (i != null) {
      super.insertAt(s, n, i), this.cache = {};
      return;
    }
    if (n.length === 0) return;
    const r = n.split(`
`), o = r.shift();
    o.length > 0 && (s < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(s, this.length() - 1), o) : this.children.tail.insertAt(this.children.tail.length(), o), this.cache = {});
    let l = this;
    r.reduce((a, u) => (l = l.split(a, !0), l.insertAt(0, u), u.length), s + o.length);
  }
  insertBefore(s, n) {
    const {
      head: i
    } = this.children;
    super.insertBefore(s, n), i instanceof le && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Yc), this.cache.length;
  }
  moveChildren(s, n) {
    super.moveChildren(s, n), this.cache = {};
  }
  optimize(s) {
    super.optimize(s), this.cache = {};
  }
  path(s) {
    return super.path(s, !0);
  }
  removeChild(s) {
    super.removeChild(s), this.cache = {};
  }
  split(s) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (n && (s === 0 || s >= this.length() - Yc)) {
      const r = this.clone();
      return s === 0 ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r);
    }
    const i = super.split(s, n);
    return this.cache = {}, i;
  }
}
pt.blotName = "block";
pt.tagName = "P";
pt.defaultChild = le;
pt.allowedChildren = [le, Ne, Mt, re];
class Ft extends Mt {
  attach() {
    super.attach(), this.attributes = new Ur(this.domNode);
  }
  delta() {
    return new q().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, s) {
    const n = this.scroll.query(t, B.BLOCK_ATTRIBUTE);
    n != null && this.attributes.attribute(n, s);
  }
  formatAt(t, s, n, i) {
    this.format(n, i);
  }
  insertAt(t, s, n) {
    if (n != null) {
      super.insertAt(t, s, n);
      return;
    }
    const i = s.split(`
`), r = i.pop(), o = i.map((a) => {
      const u = this.scroll.create(pt.blotName);
      return u.insertAt(0, a), u;
    }), l = this.split(t);
    o.forEach((a) => {
      this.parent.insertBefore(a, l);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), l);
  }
}
Ft.scope = B.BLOCK_BLOT;
function hh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.descendants(vt).reduce((s, n) => n.length() === 0 ? s : s.insert(n.value(), Vt(n, {}, t)), new q()).insert(`
`, Vt(e));
}
function Vt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return e == null || ("formats" in e && typeof e.formats == "function" && (t = {
    ...t,
    ...e.formats()
  }, s && delete t["code-token"]), e.parent == null || e.parent.statics.blotName === "scroll" || e.parent.statics.scope !== e.statics.scope) ? t : Vt(e.parent, t, s);
}
const jt = class jt extends Mt {
  // Zero width no break space
  static value() {
  }
  constructor(t, s, n) {
    super(t, s), this.selection = n, this.textNode = document.createTextNode(jt.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(t, s) {
    if (this.savedLength !== 0) {
      super.format(t, s);
      return;
    }
    let n = this, i = 0;
    for (; n != null && n.statics.scope !== B.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = jt.CONTENTS.length, n.optimize(), n.formatAt(i, jt.CONTENTS.length, t, s), this.savedLength = 0);
  }
  index(t, s) {
    return t === this.textNode ? 0 : super.index(t, s);
  }
  length() {
    return this.savedLength;
  }
  position() {
    return [this.textNode, this.textNode.data.length];
  }
  remove() {
    super.remove(), this.parent = null;
  }
  restore() {
    if (this.selection.composing || this.parent == null) return null;
    const t = this.selection.getNativeRange();
    for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
    const s = this.prev instanceof re ? this.prev : null, n = s ? s.length() : 0, i = this.next instanceof re ? this.next : null, r = i ? i.text : "", {
      textNode: o
    } = this, l = o.data.split(jt.CONTENTS).join("");
    o.data = jt.CONTENTS;
    let a;
    if (s)
      a = s, (l || i) && (s.insertAt(s.length(), l + r), i && i.remove());
    else if (i)
      a = i, i.insertAt(0, l);
    else {
      const u = document.createTextNode(l);
      a = this.scroll.create(u), this.parent.insertBefore(a, this);
    }
    if (this.remove(), t) {
      const u = (b, y) => s && b === s.domNode ? y : b === o ? n + y - 1 : i && b === i.domNode ? n + l.length + y : null, h = u(t.start.node, t.start.offset), d = u(t.end.node, t.end.offset);
      if (h !== null && d !== null)
        return {
          startNode: a.domNode,
          startOffset: h,
          endNode: a.domNode,
          endOffset: d
        };
    }
    return null;
  }
  update(t, s) {
    if (t.some((n) => n.type === "characterData" && n.target === this.textNode)) {
      const n = this.restore();
      n && (s.range = n);
    }
  }
  // Avoid .ql-cursor being a descendant of `<a/>`.
  // The reason is Safari pushes down `<a/>` on text insertion.
  // That will cause DOM nodes not sync with the model.
  //
  // For example ({I} is the caret), given the markup:
  //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
  // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
  //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
  // And then "x" will be inserted after `<a/>`:
  //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
  optimize(t) {
    super.optimize(t);
    let {
      parent: s
    } = this;
    for (; s; ) {
      if (s.domNode.tagName === "A") {
        this.savedLength = jt.CONTENTS.length, s.isolate(this.offset(s), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      s = s.parent;
    }
  }
  value() {
    return "";
  }
};
M(jt, "blotName", "cursor"), M(jt, "className", "ql-cursor"), M(jt, "tagName", "span"), M(jt, "CONTENTS", "\uFEFF");
let Ln = jt;
var fh = { exports: {} };
(function(e) {
  var t = Object.prototype.hasOwnProperty, s = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (s = !1));
  function i(a, u, h) {
    this.fn = a, this.context = u, this.once = h || !1;
  }
  function r(a, u, h, d, b) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var y = new i(h, d || a, b), _ = s ? s + u : u;
    return a._events[_] ? a._events[_].fn ? a._events[_] = [a._events[_], y] : a._events[_].push(y) : (a._events[_] = y, a._eventsCount++), a;
  }
  function o(a, u) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[u];
  }
  function l() {
    this._events = new n(), this._eventsCount = 0;
  }
  l.prototype.eventNames = function() {
    var u = [], h, d;
    if (this._eventsCount === 0) return u;
    for (d in h = this._events)
      t.call(h, d) && u.push(s ? d.slice(1) : d);
    return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(h)) : u;
  }, l.prototype.listeners = function(u) {
    var h = s ? s + u : u, d = this._events[h];
    if (!d) return [];
    if (d.fn) return [d.fn];
    for (var b = 0, y = d.length, _ = new Array(y); b < y; b++)
      _[b] = d[b].fn;
    return _;
  }, l.prototype.listenerCount = function(u) {
    var h = s ? s + u : u, d = this._events[h];
    return d ? d.fn ? 1 : d.length : 0;
  }, l.prototype.emit = function(u, h, d, b, y, _) {
    var E = s ? s + u : u;
    if (!this._events[E]) return !1;
    var w = this._events[E], A = arguments.length, k, L;
    if (w.fn) {
      switch (w.once && this.removeListener(u, w.fn, void 0, !0), A) {
        case 1:
          return w.fn.call(w.context), !0;
        case 2:
          return w.fn.call(w.context, h), !0;
        case 3:
          return w.fn.call(w.context, h, d), !0;
        case 4:
          return w.fn.call(w.context, h, d, b), !0;
        case 5:
          return w.fn.call(w.context, h, d, b, y), !0;
        case 6:
          return w.fn.call(w.context, h, d, b, y, _), !0;
      }
      for (L = 1, k = new Array(A - 1); L < A; L++)
        k[L - 1] = arguments[L];
      w.fn.apply(w.context, k);
    } else {
      var I = w.length, $;
      for (L = 0; L < I; L++)
        switch (w[L].once && this.removeListener(u, w[L].fn, void 0, !0), A) {
          case 1:
            w[L].fn.call(w[L].context);
            break;
          case 2:
            w[L].fn.call(w[L].context, h);
            break;
          case 3:
            w[L].fn.call(w[L].context, h, d);
            break;
          case 4:
            w[L].fn.call(w[L].context, h, d, b);
            break;
          default:
            if (!k) for ($ = 1, k = new Array(A - 1); $ < A; $++)
              k[$ - 1] = arguments[$];
            w[L].fn.apply(w[L].context, k);
        }
    }
    return !0;
  }, l.prototype.on = function(u, h, d) {
    return r(this, u, h, d, !1);
  }, l.prototype.once = function(u, h, d) {
    return r(this, u, h, d, !0);
  }, l.prototype.removeListener = function(u, h, d, b) {
    var y = s ? s + u : u;
    if (!this._events[y]) return this;
    if (!h)
      return o(this, y), this;
    var _ = this._events[y];
    if (_.fn)
      _.fn === h && (!b || _.once) && (!d || _.context === d) && o(this, y);
    else {
      for (var E = 0, w = [], A = _.length; E < A; E++)
        (_[E].fn !== h || b && !_[E].once || d && _[E].context !== d) && w.push(_[E]);
      w.length ? this._events[y] = w.length === 1 ? w[0] : w : o(this, y);
    }
    return this;
  }, l.prototype.removeAllListeners = function(u) {
    var h;
    return u ? (h = s ? s + u : u, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = s, l.EventEmitter = l, e.exports = l;
})(fh);
var W_ = fh.exports;
const K_ = /* @__PURE__ */ rh(W_), Ia = /* @__PURE__ */ new WeakMap(), xa = ["error", "warn", "log", "info"];
let $a = "warn";
function ph(e) {
  if ($a && xa.indexOf(e) <= xa.indexOf($a)) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    console[e](...s);
  }
}
function We(e) {
  return xa.reduce((t, s) => (t[s] = ph.bind(console, s, e), t), {});
}
We.level = (e) => {
  $a = e;
};
ph.level = We.level;
const ea = We("quill:events"), G_ = ["selectionchange", "mousedown", "mouseup", "click"];
G_.forEach((e) => {
  document.addEventListener(e, function() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = Ia.get(i);
      r && r.emitter && r.emitter.handleDOM(...s);
    });
  });
});
class D extends K_ {
  constructor() {
    super(), this.domListeners = {}, this.on("error", ea.error);
  }
  emit() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    return ea.log.call(ea, ...s), super.emit(...s);
  }
  handleDOM(t) {
    for (var s = arguments.length, n = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
      n[i - 1] = arguments[i];
    (this.domListeners[t.type] || []).forEach((r) => {
      let {
        node: o,
        handler: l
      } = r;
      (t.target === o || o.contains(t.target)) && l(t, ...n);
    });
  }
  listenDOM(t, s, n) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: s,
      handler: n
    });
  }
}
M(D, "events", {
  EDITOR_CHANGE: "editor-change",
  SCROLL_BEFORE_UPDATE: "scroll-before-update",
  SCROLL_BLOT_MOUNT: "scroll-blot-mount",
  SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
  SCROLL_OPTIMIZE: "scroll-optimize",
  SCROLL_UPDATE: "scroll-update",
  SCROLL_EMBED_UPDATE: "scroll-embed-update",
  SELECTION_CHANGE: "selection-change",
  TEXT_CHANGE: "text-change",
  COMPOSITION_BEFORE_START: "composition-before-start",
  COMPOSITION_START: "composition-start",
  COMPOSITION_BEFORE_END: "composition-before-end",
  COMPOSITION_END: "composition-end"
}), M(D, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const sa = We("quill:selection");
class Ps {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = s;
  }
}
class Y_ {
  constructor(t, s) {
    this.emitter = s, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Ps(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, D.sources.USER), 1);
    }), this.emitter.on(D.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(D.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? D.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(D.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: l,
          endOffset: a
        } = i.range;
        this.setNativeRange(r, o, l, a), this.update(D.sources.SILENT);
      }
    }), this.update(D.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(D.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(D.events.COMPOSITION_END, () => {
      if (this.composing = !1, this.cursor.parent) {
        const t = this.cursor.restore();
        if (!t) return;
        setTimeout(() => {
          this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
        }, 1);
      }
    });
  }
  handleDragging() {
    this.emitter.listenDOM("mousedown", document.body, () => {
      this.mouseDown = !0;
    }), this.emitter.listenDOM("mouseup", document.body, () => {
      this.mouseDown = !1, this.update(D.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(t, s) {
    this.scroll.update();
    const n = this.getNativeRange();
    if (!(n == null || !n.native.collapsed || this.scroll.query(t, B.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const i = this.scroll.find(n.start.node, !1);
        if (i == null) return;
        if (i instanceof vt) {
          const r = i.split(n.start.offset);
          i.parent.insertBefore(this.cursor, r);
        } else
          i.insertBefore(this.cursor, n.start.node);
        this.cursor.attach();
      }
      this.cursor.format(t, s), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const n = this.scroll.length();
    t = Math.min(t, n - 1), s = Math.min(t + s, n - 1) - t;
    let i, [r, o] = this.scroll.leaf(t);
    if (r == null) return null;
    if (s > 0 && o === r.length()) {
      const [h] = this.scroll.leaf(t + 1);
      if (h) {
        const [d] = this.scroll.line(t), [b] = this.scroll.line(t + 1);
        d === b && (r = h, o = 0);
      }
    }
    [i, o] = r.position(o, !0);
    const l = document.createRange();
    if (s > 0)
      return l.setStart(i, o), [r, o] = this.scroll.leaf(t + s), r == null ? null : ([i, o] = r.position(o, !0), l.setEnd(i, o), l.getBoundingClientRect());
    let a = "left", u;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      o < i.data.length ? (l.setStart(i, o), l.setEnd(i, o + 1)) : (l.setStart(i, o - 1), l.setEnd(i, o), a = "right"), u = l.getBoundingClientRect();
    } else {
      if (!(r.domNode instanceof Element)) return null;
      u = r.domNode.getBoundingClientRect(), o > 0 && (a = "right");
    }
    return {
      bottom: u.top + u.height,
      height: u.height,
      left: u[a],
      right: u[a],
      top: u.top,
      width: 0
    };
  }
  getNativeRange() {
    const t = document.getSelection();
    if (t == null || t.rangeCount <= 0) return null;
    const s = t.getRangeAt(0);
    if (s == null) return null;
    const n = this.normalizeNative(s);
    return sa.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const s = this.getNativeRange();
    return s == null ? [null, null] : [this.normalizedToRange(s), s];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && na(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const s = [[t.start.node, t.start.offset]];
    t.native.collapsed || s.push([t.end.node, t.end.offset]);
    const n = s.map((o) => {
      const [l, a] = o, u = this.scroll.find(l, !0), h = u.offset(this.scroll);
      return a === 0 ? h : u instanceof vt ? h + u.index(l, a) : h + u.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Ps(r, i - r);
  }
  normalizeNative(t) {
    if (!na(this.root, t.startContainer) || !t.collapsed && !na(this.root, t.endContainer))
      return null;
    const s = {
      start: {
        node: t.startContainer,
        offset: t.startOffset
      },
      end: {
        node: t.endContainer,
        offset: t.endOffset
      },
      native: t
    };
    return [s.start, s.end].forEach((n) => {
      let {
        node: i,
        offset: r
      } = n;
      for (; !(i instanceof Text) && i.childNodes.length > 0; )
        if (i.childNodes.length > r)
          i = i.childNodes[r], r = 0;
        else if (i.childNodes.length === r)
          i = i.lastChild, i instanceof Text ? r = i.data.length : i.childNodes.length > 0 ? r = i.childNodes.length : r = i.childNodes.length + 1;
        else
          break;
      n.node = i, n.offset = r;
    }), s;
  }
  rangeToNative(t) {
    const s = this.scroll.length(), n = (i, r) => {
      i = Math.min(s - 1, i);
      const [o, l] = this.scroll.leaf(i);
      return o ? o.position(l, r) : [null, -1];
    };
    return [...n(t.index, !1), ...n(t.index + t.length, !0)];
  }
  setNativeRange(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (sa.info("setNativeRange", t, s, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
    n.parentNode == null))
      return;
    const o = document.getSelection();
    if (o != null)
      if (t != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: l
        } = this.getNativeRange() || {};
        if (l == null || r || t !== l.startContainer || s !== l.startOffset || n !== l.endContainer || i !== l.endOffset) {
          t instanceof Element && t.tagName === "BR" && (s = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), n instanceof Element && n.tagName === "BR" && (i = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
          const a = document.createRange();
          a.setStart(t, s), a.setEnd(n, i), o.removeAllRanges(), o.addRange(a);
        }
      } else
        o.removeAllRanges(), this.root.blur();
  }
  setRange(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : D.sources.API;
    if (typeof s == "string" && (n = s, s = !1), sa.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, s);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : D.sources.USER;
    const s = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !ml(s, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [D.events.SELECTION_CHANGE, vn(this.lastRange), vn(s), t];
      this.emitter.emit(D.events.EDITOR_CHANGE, ...r), t !== D.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function na(e, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return e.contains(t);
}
const X_ = /^[ -~]*$/;
class Z_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let s = this.scroll.length();
    this.scroll.batchStart();
    const n = Xc(t), i = new q();
    return J_(n.ops.slice()).reduce((o, l) => {
      const a = Ht.Op.length(l);
      let u = l.attributes || {}, h = !1, d = !1;
      if (l.insert != null) {
        if (i.retain(a), typeof l.insert == "string") {
          const _ = l.insert;
          d = !_.endsWith(`
`) && (s <= o || !!this.scroll.descendant(Ft, o)[0]), this.scroll.insertAt(o, _);
          const [E, w] = this.scroll.line(o);
          let A = as({}, Vt(E));
          if (E instanceof pt) {
            const [k] = E.descendant(vt, w);
            k && (A = as(A, Vt(k)));
          }
          u = Ht.AttributeMap.diff(A, u) || {};
        } else if (typeof l.insert == "object") {
          const _ = Object.keys(l.insert)[0];
          if (_ == null) return o;
          const E = this.scroll.query(_, B.INLINE) != null;
          if (E)
            (s <= o || this.scroll.descendant(Ft, o)[0]) && (d = !0);
          else if (o > 0) {
            const [w, A] = this.scroll.descendant(vt, o - 1);
            w instanceof re ? w.value()[A] !== `
` && (h = !0) : w instanceof Mt && w.statics.scope === B.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, _, l.insert[_]), E) {
            const [w] = this.scroll.descendant(vt, o);
            if (w) {
              const A = as({}, Vt(w));
              u = Ht.AttributeMap.diff(A, u) || {};
            }
          }
        }
        s += a;
      } else if (i.push(l), l.retain !== null && typeof l.retain == "object") {
        const _ = Object.keys(l.retain)[0];
        if (_ == null) return o;
        this.scroll.updateEmbedAt(o, _, l.retain[_]);
      }
      Object.keys(u).forEach((_) => {
        this.scroll.formatAt(o, a, _, u[_]);
      });
      const b = h ? 1 : 0, y = d ? 1 : 0;
      return s += b + y, i.retain(b), i.delete(y), o + a + b + y;
    }, 0), i.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + Ht.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(t, s) {
    return this.scroll.deleteAt(t, s), this.update(new q().retain(t).delete(s));
  }
  formatLine(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(s, 1)).forEach((o) => {
        o.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new q().retain(t).retain(s, vn(n));
    return this.update(i);
  }
  formatText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, s, r, n[r]);
    });
    const i = new q().retain(t).retain(s, vn(n));
    return this.update(i);
  }
  getContents(t, s) {
    return this.delta.slice(t, t + s);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, s) => t.concat(s.delta()), new q());
  }
  getFormat(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], i = [];
    s === 0 ? this.scroll.path(t).forEach((l) => {
      const [a] = l;
      a instanceof pt ? n.push(a) : a instanceof vt && i.push(a);
    }) : (n = this.scroll.lines(t, s), i = this.scroll.descendants(vt, t, s));
    const [r, o] = [n, i].map((l) => {
      const a = l.shift();
      if (a == null) return {};
      let u = Vt(a);
      for (; Object.keys(u).length > 0; ) {
        const h = l.shift();
        if (h == null) return u;
        u = Q_(Vt(h), u);
      }
      return u;
    });
    return {
      ...r,
      ...o
    };
  }
  getHTML(t, s) {
    const [n, i] = this.scroll.line(t);
    if (n) {
      const r = n.length();
      return n.length() >= i + s && !(i === 0 && s === r) ? _i(n, i, s, !0) : _i(this.scroll, t, s, !0);
    }
    return "";
  }
  getText(t, s) {
    return this.getContents(t, s).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, s) {
    const n = Xc(s), i = new q().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, s, n) {
    return this.scroll.insertAt(t, s, n), this.update(new q().retain(t).insert({
      [s]: n
    }));
  }
  insertText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return s = s.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, s), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, s.length, i, n[i]);
    }), this.update(new q().retain(t).insert(s, vn(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if ((t == null ? void 0 : t.statics.blotName) !== pt.blotName) return !1;
    const s = t;
    return s.children.length > 1 ? !1 : s.children.head instanceof le;
  }
  removeFormat(t, s) {
    const n = this.getText(t, s), [i, r] = this.scroll.line(t + s);
    let o = 0, l = new q();
    i != null && (o = i.length() - r, l = i.delta().slice(r, r + o - 1).insert(`
`));
    const u = this.getContents(t, s + o).diff(new q().insert(n).concat(l)), h = new q().retain(t).concat(u);
    return this.applyDelta(h);
  }
  update(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (s.length === 1 && s[0].type === "characterData" && // @ts-expect-error Fix me later
    s[0].target.data.match(X_) && this.scroll.find(s[0].target)) {
      const r = this.scroll.find(s[0].target), o = Vt(r), l = r.offset(this.scroll), a = s[0].oldValue.replace(Ln.CONTENTS, ""), u = new q().insert(a), h = new q().insert(r.value()), d = n && {
        oldRange: Zc(n.oldRange, -l),
        newRange: Zc(n.newRange, -l)
      };
      t = new q().retain(l).concat(u.diff(h, d)).reduce((y, _) => _.insert ? y.insert(_.insert, o) : y.push(_), new q()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !ml(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function mn(e, t, s) {
  if (e.length === 0) {
    const [y] = ia(s.pop());
    return t <= 0 ? `</li></${y}>` : `</li></${y}>${mn([], t - 1, s)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: l
  }, ...a] = e, [u, h] = ia(l);
  if (o > t)
    return s.push(l), o === t + 1 ? `<${u}><li${h}>${_i(n, i, r)}${mn(a, o, s)}` : `<${u}><li>${mn(e, t + 1, s)}`;
  const d = s[s.length - 1];
  if (o === t && l === d)
    return `</li><li${h}>${_i(n, i, r)}${mn(a, o, s)}`;
  const [b] = ia(s.pop());
  return `</li></${b}>${mn(e, t - 1, s)}`;
}
function _i(e, t, s) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in e && typeof e.html == "function")
    return e.html(t, s);
  if (e instanceof re)
    return Kr(e.value().slice(t, t + s));
  if (e instanceof ie) {
    if (e.statics.blotName === "list-container") {
      const u = [];
      return e.children.forEachAt(t, s, (h, d, b) => {
        const y = "formats" in h && typeof h.formats == "function" ? h.formats() : {};
        u.push({
          child: h,
          offset: d,
          length: b,
          indent: y.indent || 0,
          type: y.list
        });
      }), mn(u, -1, []);
    }
    const i = [];
    if (e.children.forEachAt(t, s, (u, h, d) => {
      i.push(_i(u, h, d));
    }), n || e.statics.blotName === "list")
      return i.join("");
    const {
      outerHTML: r,
      innerHTML: o
    } = e.domNode, [l, a] = r.split(`>${o}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${a}` : `${l}>${i.join("")}<${a}`;
  }
  return e.domNode instanceof Element ? e.domNode.outerHTML : "";
}
function Q_(e, t) {
  return Object.keys(t).reduce((s, n) => {
    if (e[n] == null) return s;
    const i = t[n];
    return i === e[n] ? s[n] = i : Array.isArray(i) ? i.indexOf(e[n]) < 0 ? s[n] = i.concat([e[n]]) : s[n] = i : s[n] = [i, e[n]], s;
  }, {});
}
function ia(e) {
  const t = e === "ordered" ? "ol" : "ul";
  switch (e) {
    case "checked":
      return [t, ' data-list="checked"'];
    case "unchecked":
      return [t, ' data-list="unchecked"'];
    default:
      return [t, ""];
  }
}
function Xc(e) {
  return e.reduce((t, s) => {
    if (typeof s.insert == "string") {
      const n = s.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, s.attributes);
    }
    return t.push(s);
  }, new q());
}
function Zc(e, t) {
  let {
    index: s,
    length: n
  } = e;
  return new Ps(s + t, n);
}
function J_(e) {
  const t = [];
  return e.forEach((s) => {
    typeof s.insert == "string" ? s.insert.split(`
`).forEach((i, r) => {
      r && t.push({
        insert: `
`,
        attributes: s.attributes
      }), i && t.push({
        insert: i,
        attributes: s.attributes
      });
    }) : t.push(s);
  }), t;
}
class ce {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = s;
  }
}
M(ce, "DEFAULTS", {});
const ar = "\uFEFF";
class Tl extends Mt {
  constructor(t, s) {
    super(t, s), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(ar), this.rightGuard = document.createTextNode(ar), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, s) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, s);
  }
  restore(t) {
    let s = null, n;
    const i = t.data.split(ar).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof re) {
        const r = this.prev.length();
        this.prev.insertAt(r, i), s = {
          startNode: this.prev.domNode,
          startOffset: r + i.length
        };
      } else
        n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this), s = {
          startNode: n,
          startOffset: i.length
        };
    else t === this.rightGuard && (this.next instanceof re ? (this.next.insertAt(0, i), s = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), s = {
      startNode: n,
      startOffset: i.length
    }));
    return t.data = ar, s;
  }
  update(t, s) {
    t.forEach((n) => {
      if (n.type === "characterData" && (n.target === this.leftGuard || n.target === this.rightGuard)) {
        const i = this.restore(n.target);
        i && (s.range = i);
      }
    });
  }
}
class tE {
  constructor(t, s) {
    M(this, "isComposing", !1);
    this.scroll = t, this.emitter = s, this.setupListeners();
  }
  setupListeners() {
    this.scroll.domNode.addEventListener("compositionstart", (t) => {
      this.isComposing || this.handleCompositionStart(t);
    }), this.scroll.domNode.addEventListener("compositionend", (t) => {
      this.isComposing && queueMicrotask(() => {
        this.handleCompositionEnd(t);
      });
    });
  }
  handleCompositionStart(t) {
    const s = t.target instanceof Node ? this.scroll.find(t.target, !0) : null;
    s && !(s instanceof Tl) && (this.emitter.emit(D.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(D.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(D.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(D.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const hi = class hi {
  constructor(t, s) {
    M(this, "modules", {});
    this.quill = t, this.options = s;
  }
  init() {
    Object.keys(this.options.modules).forEach((t) => {
      this.modules[t] == null && this.addModule(t);
    });
  }
  addModule(t) {
    const s = this.quill.constructor.import(`modules/${t}`);
    return this.modules[t] = new s(this.quill, this.options.modules[t] || {}), this.modules[t];
  }
};
M(hi, "DEFAULTS", {
  modules: {}
}), M(hi, "themes", {
  default: hi
});
let In = hi;
const eE = (e) => e.parentElement || e.getRootNode().host || null, sE = (e) => {
  const t = e.getBoundingClientRect(), s = "offsetWidth" in e && Math.abs(t.width) / e.offsetWidth || 1, n = "offsetHeight" in e && Math.abs(t.height) / e.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + e.clientWidth * s,
    bottom: t.top + e.clientHeight * n,
    left: t.left
  };
}, lr = (e) => {
  const t = parseInt(e, 10);
  return Number.isNaN(t) ? 0 : t;
}, Qc = (e, t, s, n, i, r) => e < s && t > n ? 0 : e < s ? -(s - e + i) : t > n ? t - e > n - s ? e + i - s : t - n + r : 0, nE = (e, t) => {
  var r, o, l;
  const s = e.ownerDocument;
  let n = t, i = e;
  for (; i; ) {
    const a = i === s.body, u = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? s.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? s.documentElement.clientHeight,
      left: 0
    } : sE(i), h = getComputedStyle(i), d = Qc(n.left, n.right, u.left, u.right, lr(h.scrollPaddingLeft), lr(h.scrollPaddingRight)), b = Qc(n.top, n.bottom, u.top, u.bottom, lr(h.scrollPaddingTop), lr(h.scrollPaddingBottom));
    if (d || b)
      if (a)
        (l = s.defaultView) == null || l.scrollBy(d, b);
      else {
        const {
          scrollLeft: y,
          scrollTop: _
        } = i;
        b && (i.scrollTop += b), d && (i.scrollLeft += d);
        const E = i.scrollLeft - y, w = i.scrollTop - _;
        n = {
          left: n.left - E,
          top: n.top - w,
          right: n.right - E,
          bottom: n.bottom - w
        };
      }
    i = a || h.position === "fixed" ? null : eE(i);
  }
}, iE = 100, rE = ["block", "break", "cursor", "inline", "scroll", "text"], oE = (e, t, s) => {
  const n = new Sn();
  return rE.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), e.forEach((i) => {
    let r = t.query(i);
    r || s.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > iE) {
        s.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, En = We("quill"), cr = new Sn();
ie.uiClass = "ql-ui";
const te = class te {
  static debug(t) {
    t === !0 && (t = "log"), We.level(t);
  }
  static find(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ia.get(t) || cr.find(t, s);
  }
  static import(t) {
    return this.imports[t] == null && En.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, s) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], s);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && En.warn(`Overwriting ${t} with`, s), this.imports[t] = s, (t.startsWith("blots/") || t.startsWith("formats/")) && s && typeof s != "boolean" && s.blotName !== "abstract" && cr.register(s), typeof s.register == "function" && s.register(cr);
    }
  }
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = aE(t, s), this.container = this.options.container, this.container == null) {
      En.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && te.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ia.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new D();
    const i = yl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Z_(this.scroll), this.selection = new Y_(this.scroll, this.emitter), this.composition = new tE(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(D.events.EDITOR_CHANGE, (o) => {
      o === D.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(D.events.SCROLL_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      Jt.call(this, () => this.editor.update(null, l, h), o);
    }), this.emitter.on(D.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      Jt.call(this, () => {
        const d = new q().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(d, [], h);
      }, te.sources.USER);
    }), n) {
      const o = this.clipboard.convert({
        html: `${n}<p><br></p>`,
        text: `
`
      });
      this.setContents(o);
    }
    this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
  }
  addContainer(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof t == "string") {
      const n = t;
      t = document.createElement("div"), t.classList.add(n);
    }
    return this.container.insertBefore(t, s), t;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(t, s, n) {
    return [t, s, , n] = Me(t, s, n), Jt.call(this, () => this.editor.deleteText(t, s), n, t, -1 * s);
  }
  disable() {
    this.enable(!1);
  }
  editReadOnly(t) {
    this.allowReadOnlyEdits = !0;
    const s = t();
    return this.allowReadOnlyEdits = !1, s;
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.scroll.enable(t), this.container.classList.toggle("ql-disabled", !t);
  }
  focus() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus(), t.preventScroll || this.scrollSelectionIntoView();
  }
  format(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : D.sources.API;
    return Jt.call(this, () => {
      const i = this.getSelection(!0);
      let r = new q();
      if (i == null) return r;
      if (this.scroll.query(t, B.BLOCK))
        r = this.editor.formatLine(i.index, i.length, {
          [t]: s
        });
      else {
        if (i.length === 0)
          return this.selection.format(t, s), r;
        r = this.editor.formatText(i.index, i.length, {
          [t]: s
        });
      }
      return this.setSelection(i, D.sources.SILENT), r;
    }, n);
  }
  formatLine(t, s, n, i, r) {
    let o;
    return [t, s, o, r] = Me(
      t,
      s,
      // @ts-expect-error
      n,
      i,
      r
    ), Jt.call(this, () => this.editor.formatLine(t, s, o), r, t, 0);
  }
  formatText(t, s, n, i, r) {
    let o;
    return [t, s, o, r] = Me(
      // @ts-expect-error
      t,
      s,
      n,
      i,
      r
    ), Jt.call(this, () => this.editor.formatText(t, s, o), r, t, 0);
  }
  getBounds(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = null;
    if (typeof t == "number" ? n = this.selection.getBounds(t, s) : n = this.selection.getBounds(t.index, t.length), !n) return null;
    const i = this.container.getBoundingClientRect();
    return {
      bottom: n.bottom - i.top,
      height: n.height,
      left: n.left - i.left,
      right: n.right - i.left,
      top: n.top - i.top,
      width: n.width
    };
  }
  getContents() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - t;
    return [t, s] = Me(t, s), this.editor.getContents(t, s);
  }
  getFormat() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return typeof t == "number" ? this.editor.getFormat(t, s) : this.editor.getFormat(t.index, t.length);
  }
  getIndex(t) {
    return t.offset(this.scroll);
  }
  getLength() {
    return this.scroll.length();
  }
  getLeaf(t) {
    return this.scroll.leaf(t);
  }
  getLine(t) {
    return this.scroll.line(t);
  }
  getLines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    return typeof t != "number" ? this.scroll.lines(t.index, t.length) : this.scroll.lines(t, s);
  }
  getModule(t) {
    return this.theme.modules[t];
  }
  getSelection() {
    return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = Me(t, s), this.editor.getHTML(t, s);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = Me(t, s), this.editor.getText(t, s);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, s, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : te.sources.API;
    return Jt.call(this, () => this.editor.insertEmbed(t, s, n), i, t);
  }
  insertText(t, s, n, i, r) {
    let o;
    return [t, , o, r] = Me(t, 0, n, i, r), Jt.call(this, () => this.editor.insertText(t, s, o), r, t, s.length);
  }
  isEnabled() {
    return this.scroll.isEnabled();
  }
  off() {
    return this.emitter.off(...arguments);
  }
  on() {
    return this.emitter.on(...arguments);
  }
  once() {
    return this.emitter.once(...arguments);
  }
  removeFormat(t, s, n) {
    return [t, s, , n] = Me(t, s, n), Jt.call(this, () => this.editor.removeFormat(t, s), n, t);
  }
  scrollRectIntoView(t) {
    nE(this.root, t);
  }
  /**
   * @deprecated Use Quill#scrollSelectionIntoView() instead.
   */
  scrollIntoView() {
    console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."), this.scrollSelectionIntoView();
  }
  /**
   * Scroll the current selection into the visible area.
   * If the selection is already visible, no scrolling will occur.
   */
  scrollSelectionIntoView() {
    const t = this.selection.lastRange, s = t && this.selection.getBounds(t.index, t.length);
    s && this.scrollRectIntoView(s);
  }
  setContents(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D.sources.API;
    return Jt.call(this, () => {
      t = new q(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, s);
  }
  setSelection(t, s, n) {
    t == null ? this.selection.setRange(null, s || te.sources.API) : ([t, s, , n] = Me(t, s, n), this.selection.setRange(new Ps(Math.max(0, t), s), n), n !== D.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D.sources.API;
    const n = new q().insert(t);
    return this.setContents(n, s);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : D.sources.USER;
    const s = this.scroll.update(t);
    return this.selection.update(t), s;
  }
  updateContents(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D.sources.API;
    return Jt.call(this, () => (t = new q(t), this.editor.applyDelta(t)), s, !0);
  }
};
M(te, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: cr,
  theme: "default"
}), M(te, "events", D.events), M(te, "sources", D.sources), M(te, "version", "2.0.2"), M(te, "imports", {
  delta: q,
  parchment: x_,
  "core/module": ce,
  "core/theme": In
});
let C = te;
function Jc(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function ra(e) {
  return Object.entries(e ?? {}).reduce((t, s) => {
    let [n, i] = s;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function tu(e) {
  return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
}
function aE(e, t) {
  const s = Jc(e);
  if (!s)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === C.DEFAULTS.theme ? In : C.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = C.DEFAULTS, {
    modules: l,
    ...a
  } = i.DEFAULTS;
  let u = ra(t.modules);
  u != null && u.toolbar && u.toolbar.constructor !== Object && (u = {
    ...u,
    toolbar: {
      container: u.toolbar
    }
  });
  const h = as({}, ra(r), ra(l), u), d = {
    ...o,
    ...tu(a),
    ...tu(t)
  };
  let b = t.registry;
  return b ? t.formats && En.warn('Ignoring "formats" option because "registry" is specified') : b = t.formats ? oE(t.formats, d.registry, En) : d.registry, {
    ...d,
    registry: b,
    container: s,
    theme: i,
    modules: Object.entries(h).reduce((y, _) => {
      let [E, w] = _;
      if (!w) return y;
      const A = C.import(`modules/${E}`);
      return A == null ? (En.error(`Cannot load ${E} module. Are you sure you registered it?`), y) : {
        ...y,
        // @ts-expect-error
        [E]: as({}, A.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Jc(d.bounds)
  };
}
function Jt(e, t, s, n) {
  if (!this.isEnabled() && t === D.sources.USER && !this.allowReadOnlyEdits)
    return new q();
  let i = s == null ? null : this.getSelection();
  const r = this.editor.delta, o = e();
  if (i != null && (s === !0 && (s = i.index), n == null ? i = eu(i, o, t) : n !== 0 && (i = eu(i, s, n, t)), this.setSelection(i, D.sources.SILENT)), o.length() > 0) {
    const l = [D.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(D.events.EDITOR_CHANGE, ...l), t !== D.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function Me(e, t, s, n, i) {
  let r = {};
  return typeof e.index == "number" && typeof e.length == "number" ? typeof t != "number" ? (i = n, n = s, s = t, t = e.length, e = e.index) : (t = e.length, e = e.index) : typeof t != "number" && (i = n, n = s, s = t, t = 0), typeof s == "object" ? (r = s, i = n) : typeof s == "string" && (n != null ? r[s] = n : i = s), i = i || D.sources.API, [e, t, r, i];
}
function eu(e, t, s, n) {
  const i = typeof s == "number" ? s : 0;
  if (e == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [e.index, e.index + e.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(l, n !== D.sources.USER)
  )) : [r, o] = [e.index, e.index + e.length].map((l) => l < t || l === t && n === D.sources.USER ? l : i >= 0 ? l + i : Math.max(t, l + i)), new Ps(r, o - r);
}
class zs extends Fr {
}
function su(e) {
  return e instanceof pt || e instanceof Ft;
}
function nu(e) {
  return typeof e.updateContent == "function";
}
class bn extends yl {
  constructor(t, s, n) {
    let {
      emitter: i
    } = n;
    super(t, s), this.emitter = i, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (r) => this.handleDragStart(r));
  }
  batchStart() {
    Array.isArray(this.batch) || (this.batch = []);
  }
  batchEnd() {
    if (!this.batch) return;
    const t = this.batch;
    this.batch = !1, this.update(t);
  }
  emitMount(t) {
    this.emitter.emit(D.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(D.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, s) {
    this.emitter.emit(D.events.SCROLL_EMBED_UPDATE, t, s);
  }
  deleteAt(t, s) {
    const [n, i] = this.line(t), [r] = this.line(t + s);
    if (super.deleteAt(t, s), r != null && n !== r && i > 0) {
      if (n instanceof Ft || r instanceof Ft) {
        this.optimize();
        return;
      }
      const o = r.children.head instanceof le ? null : r.children.head;
      n.moveChildren(r, o), n.remove();
    }
    this.optimize();
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", t ? "true" : "false");
  }
  formatAt(t, s, n, i) {
    super.formatAt(t, s, n, i), this.optimize();
  }
  insertAt(t, s, n) {
    if (t >= this.length())
      if (n == null || this.scroll.query(s, B.BLOCK) == null) {
        const i = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(i), n == null && s.endsWith(`
`) ? i.insertAt(0, s.slice(0, -1), n) : i.insertAt(0, s, n);
      } else {
        const i = this.scroll.create(s, n);
        this.appendChild(i);
      }
    else
      super.insertAt(t, s, n);
    this.optimize();
  }
  insertBefore(t, s) {
    if (t.statics.scope === B.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(t), super.insertBefore(n, s);
    } else
      super.insertBefore(t, s);
  }
  insertContents(t, s) {
    const n = this.deltaToRenderBlocks(s.concat(new q().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ft, t)[0] && t < this.length()), u = r.type === "block" ? r.delta : new q().insert({
        [r.key]: r.value
      });
      oa(this, t, u);
      const h = r.type === "block" ? 1 : 0, d = t + u.length() + h;
      a && this.insertAt(d - 1, `
`);
      const b = Vt(this.line(t)[0]), y = Ht.AttributeMap.diff(b, r.attributes) || {};
      Object.keys(y).forEach((_) => {
        this.formatAt(d - 1, 1, _, y[_]);
      }), t = d;
    }
    let [o, l] = this.children.find(t);
    if (n.length && (o && (o = o.split(l), l = 0), n.forEach((a) => {
      if (a.type === "block") {
        const u = this.createBlock(a.attributes, o || void 0);
        oa(u, 0, a.delta);
      } else {
        const u = this.create(a.key, a.value);
        this.insertBefore(u, o || void 0), Object.keys(a.attributes).forEach((h) => {
          u.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + l : this.length();
      oa(this, a, i.delta);
    }
    this.batchEnd(), this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(t) {
    const s = this.path(t).pop();
    if (!s)
      return [null, -1];
    const [n, i] = s;
    return n instanceof vt ? [n, i] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(su, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let l = [], a = o;
      return i.children.forEachAt(r, o, (u, h, d) => {
        su(u) ? l.push(u) : u instanceof Fr && (l = l.concat(n(u, h, a))), a -= d;
      }), l;
    };
    return n(this, t, s);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, s), t.length > 0 && this.emitter.emit(D.events.SCROLL_OPTIMIZE, t, s));
  }
  path(t) {
    return super.path(t).slice(1);
  }
  remove() {
  }
  update(t) {
    if (this.batch) {
      Array.isArray(t) && (this.batch = this.batch.concat(t));
      return;
    }
    let s = D.sources.USER;
    typeof t == "string" && (s = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((n) => {
      let {
        target: i
      } = n;
      const r = this.find(i, !0);
      return r && !nu(r);
    }), t.length > 0 && this.emitter.emit(D.events.SCROLL_BEFORE_UPDATE, s, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(D.events.SCROLL_UPDATE, s, t);
  }
  updateEmbedAt(t, s, n) {
    const [i] = this.descendant((r) => r instanceof Ft, t);
    i && i.statics.blotName === s && nu(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const s = [];
    let n = new q();
    return t.forEach((i) => {
      const r = i == null ? void 0 : i.insert;
      if (r)
        if (typeof r == "string") {
          const o = r.split(`
`);
          o.slice(0, -1).forEach((a) => {
            n.insert(a, i.attributes), s.push({
              type: "block",
              delta: n,
              attributes: i.attributes ?? {}
            }), n = new q();
          });
          const l = o[o.length - 1];
          l && n.insert(l, i.attributes);
        } else {
          const o = Object.keys(r)[0];
          if (!o) return;
          this.query(o, B.INLINE) ? n.push(i) : (n.length() && s.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new q(), s.push({
            type: "blockEmbed",
            key: o,
            value: r[o],
            attributes: i.attributes ?? {}
          }));
        }
    }), n.length() && s.push({
      type: "block",
      delta: n,
      attributes: {}
    }), s;
  }
  createBlock(t, s) {
    let n;
    const i = {};
    Object.entries(t).forEach((l) => {
      let [a, u] = l;
      this.query(a, B.BLOCK & B.BLOT) != null ? n = a : i[a] = u;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, s || void 0);
    const o = r.length();
    return Object.entries(i).forEach((l) => {
      let [a, u] = l;
      r.formatAt(0, o, a, u);
    }), r;
  }
}
M(bn, "blotName", "scroll"), M(bn, "className", "ql-editor"), M(bn, "tagName", "DIV"), M(bn, "defaultChild", pt), M(bn, "allowedChildren", [pt, Ft, zs]);
function oa(e, t, s) {
  s.reduce((n, i) => {
    const r = Ht.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const l = i.insert;
        e.insertAt(n, l);
        const [a] = e.descendant(vt, n), u = Vt(a);
        o = Ht.AttributeMap.diff(u, o) || {};
      } else if (typeof i.insert == "object") {
        const l = Object.keys(i.insert)[0];
        if (l == null) return n;
        if (e.insertAt(n, l, i.insert[l]), e.scroll.query(l, B.INLINE) != null) {
          const [u] = e.descendant(vt, n), h = Vt(u);
          o = Ht.AttributeMap.diff(h, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      e.formatAt(n, r, l, o[l]);
    }), n + r;
  }, t);
}
const Al = {
  scope: B.BLOCK,
  whitelist: ["right", "center", "justify"]
}, lE = new Ae("align", "align", Al), gh = new ae("align", "ql-align", Al), mh = new ms("align", "text-align", Al);
class bh extends ms {
  value(t) {
    let s = super.value(t);
    return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${s.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : s;
  }
}
const cE = new ae("color", "ql-color", {
  scope: B.INLINE
}), Nl = new bh("color", "color", {
  scope: B.INLINE
}), uE = new ae("background", "ql-bg", {
  scope: B.INLINE
}), Ol = new bh("background", "background-color", {
  scope: B.INLINE
});
class Ws extends zs {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("spellcheck", "false"), s;
  }
  code(t, s) {
    return this.children.map((n) => n.length() <= 1 ? "" : n.domNode.innerText).join(`
`).slice(t, t + s);
  }
  html(t, s) {
    return `<pre>
${Kr(this.code(t, s))}
</pre>`;
  }
}
class _t extends pt {
  static register() {
    C.register(Ws);
  }
}
M(_t, "TAB", "  ");
class kl extends Ne {
}
kl.blotName = "code";
kl.tagName = "CODE";
_t.blotName = "code-block";
_t.className = "ql-code-block";
_t.tagName = "DIV";
Ws.blotName = "code-block-container";
Ws.className = "ql-code-block-container";
Ws.tagName = "DIV";
Ws.allowedChildren = [_t];
_t.allowedChildren = [re, le, Ln];
_t.requiredContainer = Ws;
const Cl = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, yh = new Ae("direction", "dir", Cl), vh = new ae("direction", "ql-direction", Cl), _h = new ms("direction", "direction", Cl), Eh = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, wh = new ae("font", "ql-font", Eh);
class dE extends ms {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const Th = new dE("font", "font-family", Eh), Ah = new ae("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), Nh = new ms("size", "font-size", {
  scope: B.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), hE = We("quill:keyboard"), fE = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Gr extends ce {
  static match(t, s) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((n) => !!s[n] !== t[n] && s[n] !== null) ? !1 : s.key === t.key || s.key === t.which;
  }
  constructor(t, s) {
    super(t, s), this.bindings = {}, Object.keys(this.options.bindings).forEach((n) => {
      this.options.bindings[n] && this.addBinding(this.options.bindings[n]);
    }), this.addBinding({
      key: "Enter",
      shiftKey: null
    }, this.handleEnter), this.addBinding({
      key: "Enter",
      metaKey: null,
      ctrlKey: null,
      altKey: null
    }, () => {
    }), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0
    }, this.handleDelete)) : (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0,
      prefix: /^.?$/
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0,
      suffix: /^.?$/
    }, this.handleDelete)), this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Backspace",
      altKey: null,
      ctrlKey: null,
      metaKey: null,
      shiftKey: null
    }, {
      collapsed: !0,
      offset: 0
    }, this.handleBackspace), this.listen();
  }
  addBinding(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = gE(t);
    if (i == null) {
      hE.warn("Attempted to add invalid keyboard binding", i);
      return;
    }
    typeof s == "function" && (s = {
      handler: s
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(i.key) ? i.key : [i.key]).forEach((o) => {
      const l = {
        ...i,
        key: o,
        ...s,
        ...n
      };
      this.bindings[l.key] = this.bindings[l.key] || [], this.bindings[l.key].push(l);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (t) => {
      if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((A) => Gr.match(t, A));
      if (i.length === 0) return;
      const r = C.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, a] = this.quill.getLine(o.index), [u, h] = this.quill.getLeaf(o.index), [d, b] = o.length === 0 ? [u, h] : this.quill.getLeaf(o.index + o.length), y = u instanceof Or ? u.value().slice(0, h) : "", _ = d instanceof Or ? d.value().slice(b) : "", E = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
        offset: a,
        prefix: y,
        suffix: _,
        event: t
      };
      i.some((A) => {
        if (A.collapsed != null && A.collapsed !== E.collapsed || A.empty != null && A.empty !== E.empty || A.offset != null && A.offset !== E.offset)
          return !1;
        if (Array.isArray(A.format)) {
          if (A.format.every((k) => E.format[k] == null))
            return !1;
        } else if (typeof A.format == "object" && !Object.keys(A.format).every((k) => A.format[k] === !0 ? E.format[k] != null : A.format[k] === !1 ? E.format[k] == null : ml(A.format[k], E.format[k])))
          return !1;
        return A.prefix != null && !A.prefix.test(E.prefix) || A.suffix != null && !A.suffix.test(E.suffix) ? !1 : A.handler.call(this, o, E, A) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, s) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(s.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new q().retain(t.index - n).delete(n);
    if (s.offset === 0) {
      const [l] = this.quill.getLine(t.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const u = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = Ht.AttributeMap.diff(u, h) || {}, Object.keys(i).length > 0) {
          const d = new q().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(d);
        }
      }
    }
    this.quill.updateContents(o, C.sources.USER), this.quill.focus();
  }
  handleDelete(t, s) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new q().retain(t.index).delete(n);
    if (s.offset >= r.length() - 1) {
      const [l] = this.quill.getLine(t.index + 1);
      if (l) {
        const a = r.formats(), u = this.quill.getFormat(t.index, 1);
        i = Ht.AttributeMap.diff(a, u) || {}, Object.keys(i).length > 0 && (o = o.retain(l.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, C.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Sl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, s) {
    const n = Object.keys(s.format).reduce((r, o) => (this.quill.scroll.query(o, B.BLOCK) && !Array.isArray(s.format[o]) && (r[o] = s.format[o]), r), {}), i = new q().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(t.index + 1, C.sources.SILENT), this.quill.focus();
  }
}
const pE = {
  bindings: {
    bold: aa("bold"),
    italic: aa("italic"),
    underline: aa("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", C.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", C.sources.USER), !1);
      }
    },
    "outdent backspace": {
      key: "Backspace",
      collapsed: !0,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ["indent", "list"],
      offset: 0,
      handler(e, t) {
        t.format.indent != null ? this.quill.format("indent", "-1", C.sources.USER) : t.format.list != null && this.quill.format("list", !1, C.sources.USER);
      }
    },
    "indent code-block": iu(!0),
    "outdent code-block": iu(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(e) {
        this.quill.deleteText(e.index - 1, 1, C.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(e, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const s = new q().retain(e.index).delete(e.length).insert("	");
        return this.quill.updateContents(s, C.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index + 1, C.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, C.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(e, t) {
        const s = {
          list: !1
        };
        t.format.indent && (s.indent = !1), this.quill.formatLine(e.index, e.length, s, C.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(e) {
        const [t, s] = this.quill.getLine(e.index), n = {
          // @ts-expect-error Fix me later
          ...t.formats(),
          list: "checked"
        }, i = new q().retain(e.index).insert(`
`, n).retain(t.length() - s - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(e.index + 1, C.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(e, t) {
        const [s, n] = this.quill.getLine(e.index), i = new q().retain(e.index).insert(`
`, t.format).retain(s.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(e.index + 1, C.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "table backspace": {
      key: "Backspace",
      format: ["table"],
      collapsed: !0,
      offset: 0,
      handler() {
      }
    },
    "table delete": {
      key: "Delete",
      format: ["table"],
      collapsed: !0,
      suffix: /^$/,
      handler() {
      }
    },
    "table enter": {
      key: "Enter",
      shiftKey: null,
      format: ["table"],
      handler(e) {
        const t = this.quill.getModule("table");
        if (t) {
          const [s, n, i, r] = t.getTable(e), o = mE(s, n, i, r);
          if (o == null) return;
          let l = s.offset();
          if (o < 0) {
            const a = new q().retain(l).insert(`
`);
            this.quill.updateContents(a, C.sources.USER), this.quill.setSelection(e.index + 1, e.length, C.sources.SILENT);
          } else if (o > 0) {
            l += s.length();
            const a = new q().retain(l).insert(`
`);
            this.quill.updateContents(a, C.sources.USER), this.quill.setSelection(l, C.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(e, t) {
        const {
          event: s,
          line: n
        } = t, i = n.offset(this.quill.scroll);
        s.shiftKey ? this.quill.setSelection(i - 1, C.sources.USER) : this.quill.setSelection(i + n.length(), C.sources.USER);
      }
    },
    "list autofill": {
      key: " ",
      shiftKey: null,
      collapsed: !0,
      format: {
        "code-block": !1,
        blockquote: !1,
        table: !1
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler(e, t) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: s
        } = t.prefix, [n, i] = this.quill.getLine(e.index);
        if (i > s) return !0;
        let r;
        switch (t.prefix.trim()) {
          case "[]":
          case "[ ]":
            r = "unchecked";
            break;
          case "[x]":
            r = "checked";
            break;
          case "-":
          case "*":
            r = "bullet";
            break;
          default:
            r = "ordered";
        }
        this.quill.insertText(e.index, " ", C.sources.USER), this.quill.history.cutoff();
        const o = new q().retain(e.index - i).delete(s + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, C.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - s, C.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(e) {
        const [t, s] = this.quill.getLine(e.index);
        let n = 2, i = t;
        for (; i != null && i.length() <= 1 && i.formats()["code-block"]; )
          if (i = i.prev, n -= 1, n <= 0) {
            const r = new q().retain(e.index + t.length() - s - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, C.sources.USER), this.quill.setSelection(e.index - 1, C.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": ur("ArrowLeft", !1),
    "embed left shift": ur("ArrowLeft", !0),
    "embed right": ur("ArrowRight", !1),
    "embed right shift": ur("ArrowRight", !0),
    "table down": ru(!1),
    "table up": ru(!0)
  }
};
Gr.DEFAULTS = pE;
function iu(e) {
  return {
    key: "Tab",
    shiftKey: !e,
    format: {
      "code-block": !0
    },
    handler(t, s) {
      let {
        event: n
      } = s;
      const i = this.quill.scroll.query("code-block"), {
        TAB: r
      } = i;
      if (t.length === 0 && !n.shiftKey) {
        this.quill.insertText(t.index, r, C.sources.USER), this.quill.setSelection(t.index + r.length, C.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: l,
        length: a
      } = t;
      o.forEach((u, h) => {
        e ? (u.insertAt(0, r), h === 0 ? l += r.length : a += r.length) : u.domNode.textContent.startsWith(r) && (u.deleteAt(0, r.length), h === 0 ? l -= r.length : a -= r.length);
      }), this.quill.update(C.sources.USER), this.quill.setSelection(l, a, C.sources.SILENT);
    }
  };
}
function ur(e, t) {
  return {
    key: e,
    shiftKey: t,
    altKey: null,
    [e === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(n) {
      let {
        index: i
      } = n;
      e === "ArrowRight" && (i += n.length + 1);
      const [r] = this.quill.getLeaf(i);
      return r instanceof Mt ? (e === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, C.sources.USER) : this.quill.setSelection(n.index - 1, C.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, C.sources.USER) : this.quill.setSelection(n.index + n.length + 1, C.sources.USER), !1) : !0;
    }
  };
}
function aa(e) {
  return {
    key: e[0],
    shortKey: !0,
    handler(t, s) {
      this.quill.format(e, !s.format[e], C.sources.USER);
    }
  };
}
function ru(e) {
  return {
    key: e ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(t, s) {
      const n = e ? "prev" : "next", i = s.line, r = i.parent[n];
      if (r != null) {
        if (r.statics.blotName === "table-row") {
          let o = r.children.head, l = i;
          for (; l.prev != null; )
            l = l.prev, o = o.next;
          const a = o.offset(this.quill.scroll) + Math.min(s.offset, o.length() - 1);
          this.quill.setSelection(a, 0, C.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (e ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, C.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, C.sources.USER));
      }
      return !1;
    }
  };
}
function gE(e) {
  if (typeof e == "string" || typeof e == "number")
    e = {
      key: e
    };
  else if (typeof e == "object")
    e = vn(e);
  else
    return null;
  return e.shortKey && (e[fE] = e.shortKey, delete e.shortKey), e;
}
function Sl(e) {
  let {
    quill: t,
    range: s
  } = e;
  const n = t.getLines(s);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), o = n[n.length - 1].formats();
    i = Ht.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(s, C.sources.USER), Object.keys(i).length > 0 && t.formatLine(s.index, 1, i, C.sources.USER), t.setSelection(s.index, C.sources.SILENT);
}
function mE(e, t, s, n) {
  return t.prev == null && t.next == null ? s.prev == null && s.next == null ? n === 0 ? -1 : 1 : s.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const bE = /font-weight:\s*normal/, yE = ["P", "OL", "UL"], ou = (e) => e && yE.includes(e.tagName), vE = (e) => {
  Array.from(e.querySelectorAll("br")).filter((t) => ou(t.previousElementSibling) && ou(t.nextElementSibling)).forEach((t) => {
    var s;
    (s = t.parentNode) == null || s.removeChild(t);
  });
}, _E = (e) => {
  Array.from(e.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var s;
    return (s = t.getAttribute("style")) == null ? void 0 : s.match(bE);
  }).forEach((t) => {
    var n;
    const s = e.createDocumentFragment();
    s.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(s, t);
  });
};
function EE(e) {
  e.querySelector('[id^="docs-internal-guid-"]') && (_E(e), vE(e));
}
const wE = /\bmso-list:[^;]*ignore/i, TE = /\bmso-list:[^;]*\bl(\d+)/i, AE = /\bmso-list:[^;]*\blevel(\d+)/i, NE = (e, t) => {
  const s = e.getAttribute("style"), n = s == null ? void 0 : s.match(TE);
  if (!n)
    return null;
  const i = Number(n[1]), r = s == null ? void 0 : s.match(AE), o = r ? Number(r[1]) : 1, l = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(l), u = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: u,
    element: e
  };
}, OE = (e) => {
  var o, l;
  const t = Array.from(e.querySelectorAll("[style*=mso-list]")), s = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(wE) ? s.push(a) : n.push(a);
  }), s.forEach((a) => {
    var u;
    return (u = a.parentNode) == null ? void 0 : u.removeChild(a);
  });
  const i = e.documentElement.innerHTML, r = n.map((a) => NE(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let u = r.shift();
    for (; u; )
      a.push(u), u = r.length && ((o = r[0]) == null ? void 0 : o.element) === u.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === u.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((y) => {
      const _ = document.createElement("li");
      _.setAttribute("data-list", y.type), y.indent > 1 && _.setAttribute("class", `ql-indent-${y.indent - 1}`), _.innerHTML = y.element.innerHTML, h.appendChild(_);
    });
    const d = (l = a[0]) == null ? void 0 : l.element, {
      parentNode: b
    } = d ?? {};
    d && (b == null || b.replaceChild(h, d)), a.slice(1).forEach((y) => {
      let {
        element: _
      } = y;
      b == null || b.removeChild(_);
    });
  }
};
function kE(e) {
  e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && OE(e);
}
const CE = [kE, EE], SE = (e) => {
  e.documentElement && CE.forEach((t) => {
    t(e);
  });
}, LE = We("quill:clipboard"), IE = [[Node.TEXT_NODE, FE], [Node.TEXT_NODE, lu], ["br", DE], [Node.ELEMENT_NODE, lu], [Node.ELEMENT_NODE, ME], [Node.ELEMENT_NODE, RE], [Node.ELEMENT_NODE, VE], ["li", PE], ["ol, ul", jE], ["pre", qE], ["tr", UE], ["b", la("bold")], ["i", la("italic")], ["strike", la("strike")], ["style", BE]], xE = [lE, yh].reduce((e, t) => (e[t.keyName] = t, e), {}), au = [mh, Ol, Nl, _h, Th, Nh].reduce((e, t) => (e[t.keyName] = t, e), {});
class Oh extends ce {
  constructor(t, s) {
    super(t, s), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], IE.concat(this.options.matchers ?? []).forEach((n) => {
      let [i, r] = n;
      this.addMatcher(i, r);
    });
  }
  addMatcher(t, s) {
    this.matchers.push([t, s]);
  }
  convert(t) {
    let {
      html: s,
      text: n
    } = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i[_t.blotName])
      return new q().insert(n || "", {
        [_t.blotName]: i[_t.blotName]
      });
    if (!s)
      return new q().insert(n || "", i);
    const r = this.convertHTML(s);
    return $i(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new q().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    SE(t);
  }
  convertHTML(t) {
    const s = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(s);
    const n = s.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Ll(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : C.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, s), this.quill.setSelection(0, C.sources.SILENT);
    } else {
      const i = this.convert({
        html: s,
        text: ""
      });
      this.quill.updateContents(new q().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), C.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    var o, l;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: r
    } = this.onCopy(n, s);
    (o = t.clipboardData) == null || o.setData("text/plain", r), (l = t.clipboardData) == null || l.setData("text/html", i), s && Sl({
      range: n,
      quill: this.quill
    });
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(t) {
    return t.split(/\r?\n/).filter((s) => s[0] !== "#").join(`
`);
  }
  onCapturePaste(t) {
    var o, l, a, u, h;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const s = this.quill.getSelection(!0);
    if (s == null) return;
    const n = (o = t.clipboardData) == null ? void 0 : o.getData("text/html");
    let i = (l = t.clipboardData) == null ? void 0 : l.getData("text/plain");
    if (!n && !i) {
      const d = (a = t.clipboardData) == null ? void 0 : a.getData("text/uri-list");
      d && (i = this.normalizeURIList(d));
    }
    const r = Array.from(((u = t.clipboardData) == null ? void 0 : u.files) || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(s, r);
      return;
    }
    if (n && r.length > 0) {
      const d = new DOMParser().parseFromString(n, "text/html");
      if (d.body.childElementCount === 1 && ((h = d.body.firstElementChild) == null ? void 0 : h.tagName) === "IMG") {
        this.quill.uploader.upload(s, r);
        return;
      }
    }
    this.onPaste(s, {
      html: n,
      text: i
    });
  }
  onCopy(t) {
    const s = this.quill.getText(t);
    return {
      html: this.quill.getSemanticHTML(t),
      text: s
    };
  }
  onPaste(t, s) {
    let {
      text: n,
      html: i
    } = s;
    const r = this.quill.getFormat(t.index), o = this.convert({
      text: n,
      html: i
    }, r);
    LE.log("onPaste", o, {
      text: n,
      html: i
    });
    const l = new q().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(l, C.sources.USER), this.quill.setSelection(l.length() - t.length, C.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, s) {
    const n = [], i = [];
    return this.matchers.forEach((r) => {
      const [o, l] = r;
      switch (o) {
        case Node.TEXT_NODE:
          i.push(l);
          break;
        case Node.ELEMENT_NODE:
          n.push(l);
          break;
        default:
          Array.from(t.querySelectorAll(o)).forEach((a) => {
            if (s.has(a)) {
              const u = s.get(a);
              u == null || u.push(l);
            } else
              s.set(a, [l]);
          });
          break;
      }
    }), [n, i];
  }
}
M(Oh, "DEFAULTS", {
  matchers: []
});
function Ks(e, t, s, n) {
  return n.query(t) ? e.reduce((i, r) => {
    if (!r.insert) return i;
    if (r.attributes && r.attributes[t])
      return i.push(r);
    const o = s ? {
      [t]: s
    } : {};
    return i.insert(r.insert, {
      ...o,
      ...r.attributes
    });
  }, new q()) : e;
}
function $i(e, t) {
  let s = "";
  for (let n = e.ops.length - 1; n >= 0 && s.length < t.length; --n) {
    const i = e.ops[n];
    if (typeof i.insert != "string") break;
    s = i.insert + s;
  }
  return s.slice(-1 * t.length) === t;
}
function rs(e, t) {
  if (!(e instanceof Element)) return !1;
  const s = t.query(e);
  return s && s.prototype instanceof Mt ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(e.tagName.toLowerCase());
}
function $E(e, t) {
  return e.previousElementSibling && e.nextElementSibling && !rs(e.previousElementSibling, t) && !rs(e.nextElementSibling, t);
}
const dr = /* @__PURE__ */ new WeakMap();
function kh(e) {
  return e == null ? !1 : (dr.has(e) || (e.tagName === "PRE" ? dr.set(e, !0) : dr.set(e, kh(e.parentNode))), dr.get(e));
}
function Ll(e, t, s, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, e), new q()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let l = Ll(e, o, s, n, i);
    return o.nodeType === t.ELEMENT_NODE && (l = s.reduce((a, u) => u(o, a, e), l), l = (i.get(o) || []).reduce((a, u) => u(o, a, e), l)), r.concat(l);
  }, new q()) : new q();
}
function la(e) {
  return (t, s, n) => Ks(s, e, !0, n);
}
function RE(e, t, s) {
  const n = Ae.keys(e), i = ae.keys(e), r = ms.keys(e), o = {};
  return n.concat(i).concat(r).forEach((l) => {
    let a = s.query(l, B.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(e), o[a.attrName]) || (a = xE[l], a != null && (a.attrName === l || a.keyName === l) && (o[a.attrName] = a.value(e) || void 0), a = au[l], a != null && (a.attrName === l || a.keyName === l) && (a = au[l], o[a.attrName] = a.value(e) || void 0));
  }), Object.entries(o).reduce((l, a) => {
    let [u, h] = a;
    return Ks(l, u, h, s);
  }, t);
}
function ME(e, t, s) {
  const n = s.query(e);
  if (n == null) return t;
  if (n.prototype instanceof Mt) {
    const i = {}, r = n.value(e);
    if (r != null)
      return i[n.blotName] = r, new q().insert(i, n.formats(e, s));
  } else if (n.prototype instanceof yi && !$i(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Ks(t, n.blotName, n.formats(e, s), s);
  return t;
}
function DE(e, t) {
  return $i(t, `
`) || t.insert(`
`), t;
}
function qE(e, t, s) {
  const n = s.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(e, s) : !0;
  return Ks(t, "code-block", i, s);
}
function BE() {
  return new q();
}
function PE(e, t, s) {
  const n = s.query(e);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !$i(t, `
`))
    return t;
  let i = -1, r = e.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: i,
    ...l.attributes || {}
  }) : o, new q());
}
function jE(e, t, s) {
  const n = e;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Ks(t, "list", i, s);
}
function lu(e, t, s) {
  if (!$i(t, `
`)) {
    if (rs(e, s) && (e.childNodes.length > 0 || e instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && e.nextSibling) {
      let n = e.nextSibling;
      for (; n != null; ) {
        if (rs(n, s))
          return t.insert(`
`);
        const i = s.query(n);
        if (i && i.prototype instanceof Ft)
          return t.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return t;
}
function VE(e, t, s) {
  var r;
  const n = {}, i = e.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, l) => {
    let [a, u] = l;
    return Ks(o, a, u, s);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new q().insert("	").concat(t) : t;
}
function UE(e, t, s) {
  var i, r;
  const n = ((i = e.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? e.parentElement : (r = e.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const l = Array.from(n.querySelectorAll("tr")).indexOf(e) + 1;
    return Ks(t, "table", l, s);
  }
  return t;
}
function FE(e, t, s) {
  var i;
  let n = e.data;
  if (((i = e.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!kh(e)) {
    if (n.trim().length === 0 && n.includes(`
`) && !$E(e, s))
      return t;
    const r = (o, l) => {
      const a = l.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (e.previousSibling == null && e.parentElement != null && rs(e.parentElement, s) || e.previousSibling instanceof Element && rs(e.previousSibling, s)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (e.nextSibling == null && e.parentElement != null && rs(e.parentElement, s) || e.nextSibling instanceof Element && rs(e.nextSibling, s)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class Ch extends ce {
  constructor(s, n) {
    super(s, n);
    M(this, "lastRecorded", 0);
    M(this, "ignoreChange", !1);
    M(this, "stack", {
      undo: [],
      redo: []
    });
    M(this, "currentRange", null);
    this.quill.on(C.events.EDITOR_CHANGE, (i, r, o, l) => {
      i === C.events.SELECTION_CHANGE ? r && l !== C.sources.SILENT && (this.currentRange = r) : i === C.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || l === C.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = Ra(this.currentRange, r));
    }), this.quill.keyboard.addBinding({
      key: "z",
      shortKey: !0
    }, this.undo.bind(this)), this.quill.keyboard.addBinding({
      key: ["z", "Z"],
      shortKey: !0,
      shiftKey: !0
    }, this.redo.bind(this)), /Win/i.test(navigator.platform) && this.quill.keyboard.addBinding({
      key: "y",
      shortKey: !0
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (i) => {
      i.inputType === "historyUndo" ? (this.undo(), i.preventDefault()) : i.inputType === "historyRedo" && (this.redo(), i.preventDefault());
    });
  }
  change(s, n) {
    if (this.stack[s].length === 0) return;
    const i = this.stack[s].pop();
    if (!i) return;
    const r = this.quill.getContents(), o = i.delta.invert(r);
    this.stack[n].push({
      delta: o,
      range: Ra(i.range, o)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, C.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    };
  }
  cutoff() {
    this.lastRecorded = 0;
  }
  record(s, n) {
    if (s.ops.length === 0) return;
    this.stack.redo = [];
    let i = s.invert(n), r = this.currentRange;
    const o = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > o && this.stack.undo.length > 0
    ) {
      const l = this.stack.undo.pop();
      l && (i = i.compose(l.delta), r = l.range);
    } else
      this.lastRecorded = o;
    i.length() !== 0 && (this.stack.undo.push({
      delta: i,
      range: r
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(s) {
    cu(this.stack.undo, s), cu(this.stack.redo, s);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(s) {
    if (s.range)
      this.quill.setSelection(s.range, C.sources.USER);
    else {
      const n = zE(this.quill.scroll, s.delta);
      this.quill.setSelection(n, C.sources.USER);
    }
  }
}
M(Ch, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function cu(e, t) {
  let s = t;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const i = e[n];
    e[n] = {
      delta: s.transform(i.delta, !0),
      range: i.range && Ra(i.range, s)
    }, s = i.delta.transform(s), e[n].delta.length() === 0 && e.splice(n, 1);
  }
}
function HE(e, t) {
  const s = t.ops[t.ops.length - 1];
  return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some((n) => e.query(n, B.BLOCK) != null) : !1;
}
function zE(e, t) {
  const s = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - s;
  return HE(e, t) && (n -= 1), n;
}
function Ra(e, t) {
  if (!e) return e;
  const s = t.transformPosition(e.index), n = t.transformPosition(e.index + e.length);
  return {
    index: s,
    length: n - s
  };
}
class Sh extends ce {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("drop", (n) => {
      var o;
      n.preventDefault();
      let i = null;
      if (document.caretRangeFromPoint)
        i = document.caretRangeFromPoint(n.clientX, n.clientY);
      else if (document.caretPositionFromPoint) {
        const l = document.caretPositionFromPoint(n.clientX, n.clientY);
        i = document.createRange(), i.setStart(l.offsetNode, l.offset), i.setEnd(l.offsetNode, l.offset);
      }
      const r = i && t.selection.normalizeNative(i);
      if (r) {
        const l = t.selection.normalizedToRange(r);
        (o = n.dataTransfer) != null && o.files && this.upload(l, n.dataTransfer.files);
      }
    });
  }
  upload(t, s) {
    const n = [];
    Array.from(s).forEach((i) => {
      var r;
      i && ((r = this.options.mimetypes) != null && r.includes(i.type)) && n.push(i);
    }), n.length > 0 && this.options.handler.call(this, t, n);
  }
}
Sh.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(e, t) {
    if (!this.quill.scroll.query("image"))
      return;
    const s = t.map((n) => new Promise((i) => {
      const r = new FileReader();
      r.onload = () => {
        i(r.result);
      }, r.readAsDataURL(n);
    }));
    Promise.all(s).then((n) => {
      const i = n.reduce((r, o) => r.insert({
        image: o
      }), new q().retain(e.index).delete(e.length));
      this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(e.index + n.length, D.sources.SILENT);
    });
  }
};
const WE = ["insertText", "insertReplacementText"];
class KE extends ce {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(C.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Sl({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (s) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new q().retain(t.index).insert(s, n), C.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + s.length, 0, C.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !WE.includes(t.inputType))
      return;
    const s = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!s || s.collapsed === !0)
      return;
    const n = GE(t);
    if (n == null)
      return;
    const i = this.quill.selection.normalizeNative(s), r = i ? this.quill.selection.normalizedToRange(i) : null;
    r && this.replaceText(r, n) && t.preventDefault();
  }
  handleCompositionStart() {
    const t = this.quill.getSelection();
    t && this.replaceText(t);
  }
}
function GE(e) {
  var t;
  return typeof e.data == "string" ? e.data : (t = e.dataTransfer) != null && t.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
const YE = /Mac/i.test(navigator.platform), XE = 100, ZE = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || YE && e.key === "a" && e.ctrlKey === !0);
class QE extends ce {
  constructor(s, n) {
    super(s, n);
    M(this, "isListening", !1);
    M(this, "selectionChangeDeadline", 0);
    this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(s, n) {
        let {
          line: i,
          event: r
        } = n;
        if (!(i instanceof ie) || !i.uiNode)
          return !0;
        const o = getComputedStyle(i.domNode).direction === "rtl";
        return o && r.key !== "ArrowRight" || !o && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(s.index - 1, s.length + (r.shiftKey ? 1 : 0), C.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (s) => {
      !s.defaultPrevented && ZE(s) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + XE, this.isListening) return;
    this.isListening = !0;
    const s = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", s, {
      once: !0
    });
  }
  handleSelectionChange() {
    const s = document.getSelection();
    if (!s) return;
    const n = s.getRangeAt(0);
    if (n.collapsed !== !0 || n.startOffset !== 0) return;
    const i = this.quill.scroll.find(n.startContainer);
    if (!(i instanceof ie) || !i.uiNode) return;
    const r = document.createRange();
    r.setStartAfter(i.uiNode), r.setEndAfter(i.uiNode), s.removeAllRanges(), s.addRange(r);
  }
}
C.register({
  "blots/block": pt,
  "blots/block/embed": Ft,
  "blots/break": le,
  "blots/container": zs,
  "blots/cursor": Ln,
  "blots/embed": Tl,
  "blots/inline": Ne,
  "blots/scroll": bn,
  "blots/text": re,
  "modules/clipboard": Oh,
  "modules/history": Ch,
  "modules/keyboard": Gr,
  "modules/uploader": Sh,
  "modules/input": KE,
  "modules/uiNode": QE
});
class JE extends ae {
  add(t, s) {
    let n = 0;
    if (s === "+1" || s === "-1") {
      const i = this.value(t) || 0;
      n = s === "+1" ? i + 1 : i - 1;
    } else typeof s == "number" && (n = s);
    return n === 0 ? (this.remove(t), !0) : super.add(t, n.toString());
  }
  canAdd(t, s) {
    return super.canAdd(t, s) || super.canAdd(t, parseInt(s, 10));
  }
  value(t) {
    return parseInt(super.value(t), 10) || void 0;
  }
}
const tw = new JE("indent", "ql-indent", {
  scope: B.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Ma extends pt {
}
M(Ma, "blotName", "blockquote"), M(Ma, "tagName", "blockquote");
class Da extends pt {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
M(Da, "blotName", "header"), M(Da, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class Ri extends zs {
}
Ri.blotName = "list-container";
Ri.tagName = "OL";
class Mi extends pt {
  static create(t) {
    const s = super.create();
    return s.setAttribute("data-list", t), s;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    C.register(Ri);
  }
  constructor(t, s) {
    super(t, s);
    const n = s.ownerDocument.createElement("span"), i = (r) => {
      if (!t.isEnabled()) return;
      const o = this.statics.formats(s, t);
      o === "checked" ? (this.format("list", "unchecked"), r.preventDefault()) : o === "unchecked" && (this.format("list", "checked"), r.preventDefault());
    };
    n.addEventListener("mousedown", i), n.addEventListener("touchstart", i), this.attachUI(n);
  }
  format(t, s) {
    t === this.statics.blotName && s ? this.domNode.setAttribute("data-list", s) : super.format(t, s);
  }
}
Mi.blotName = "list";
Mi.tagName = "LI";
Ri.allowedChildren = [Mi];
Mi.requiredContainer = Ri;
class Ei extends Ne {
  static create() {
    return super.create();
  }
  static formats() {
    return !0;
  }
  optimize(t) {
    super.optimize(t), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
  }
}
M(Ei, "blotName", "bold"), M(Ei, "tagName", ["STRONG", "B"]);
class qa extends Ei {
}
M(qa, "blotName", "italic"), M(qa, "tagName", ["EM", "I"]);
class os extends Ne {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("href", this.sanitize(t)), s.setAttribute("rel", "noopener noreferrer"), s.setAttribute("target", "_blank"), s;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return Lh(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, s) {
    t !== this.statics.blotName || !s ? super.format(t, s) : this.domNode.setAttribute("href", this.constructor.sanitize(s));
  }
}
M(os, "blotName", "link"), M(os, "tagName", "A"), M(os, "SANITIZED_URL", "about:blank"), M(os, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function Lh(e, t) {
  const s = document.createElement("a");
  s.href = e;
  const n = s.href.slice(0, s.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class Ba extends Ne {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
M(Ba, "blotName", "script"), M(Ba, "tagName", ["SUB", "SUP"]);
class Pa extends Ei {
}
M(Pa, "blotName", "strike"), M(Pa, "tagName", ["S", "STRIKE"]);
class ja extends Ne {
}
M(ja, "blotName", "underline"), M(ja, "tagName", "U");
class mr extends Tl {
  static create(t) {
    if (window.katex == null)
      throw new Error("Formula module requires KaTeX.");
    const s = super.create(t);
    return typeof t == "string" && (window.katex.render(t, s, {
      throwOnError: !1,
      errorColor: "#f00"
    }), s.setAttribute("data-value", t)), s;
  }
  static value(t) {
    return t.getAttribute("data-value");
  }
  html() {
    const {
      formula: t
    } = this.value();
    return `<span>${t}</span>`;
  }
}
M(mr, "blotName", "formula"), M(mr, "className", "ql-formula"), M(mr, "tagName", "SPAN");
const uu = ["alt", "height", "width"];
class Va extends Mt {
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return uu.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return Lh(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    uu.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
}
M(Va, "blotName", "image"), M(Va, "tagName", "IMG");
const du = ["height", "width"];
class br extends Ft {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return du.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static sanitize(t) {
    return os.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    du.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
M(br, "blotName", "video"), M(br, "className", "ql-video"), M(br, "tagName", "IFRAME");
const oi = new ae("code-token", "hljs", {
  scope: B.INLINE
});
class Ue extends Ne {
  static formats(t, s) {
    for (; t != null && t !== s.domNode; ) {
      if (t.classList && t.classList.contains(_t.className))
        return super.formats(t, s);
      t = t.parentNode;
    }
  }
  constructor(t, s, n) {
    super(t, s, n), oi.add(this.domNode, n);
  }
  format(t, s) {
    t !== Ue.blotName ? super.format(t, s) : s ? oi.add(this.domNode, s) : (oi.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), oi.value(this.domNode) || this.unwrap();
  }
}
Ue.blotName = "code-token";
Ue.className = "ql-token";
class Ut extends _t {
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("data-language", t), s;
  }
  static formats(t) {
    return t.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(t, s) {
    t === this.statics.blotName && s ? this.domNode.setAttribute("data-language", s) : super.format(t, s);
  }
  replaceWith(t, s) {
    return this.formatAt(0, this.length(), Ue.blotName, !1), super.replaceWith(t, s);
  }
}
class di extends Ws {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, s) {
    t === Ut.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, s);
    }));
  }
  formatAt(t, s, n, i) {
    n === Ut.blotName && (this.forceNext = !0), super.formatAt(t, s, n, i);
  }
  highlight(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = Ut.formats(this.children.head.domNode);
    if (s || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((a, u) => a.concat(hh(u, !1)), new q()), l = t(i, r);
        o.diff(l).reduce((a, u) => {
          let {
            retain: h,
            attributes: d
          } = u;
          return h ? (d && Object.keys(d).forEach((b) => {
            [Ut.blotName, Ue.blotName].includes(b) && this.formatAt(a, h, b, d[b]);
          }), a + h) : a;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, s) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Ut.formats(n.domNode) : "plain"}">
${Kr(this.code(t, s))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const s = Ut.formats(this.children.head.domNode);
      s !== this.uiNode.value && (this.uiNode.value = s);
    }
  }
}
di.allowedChildren = [Ut];
Ut.requiredContainer = di;
Ut.allowedChildren = [Ue, Ln, re, le];
const ew = (e, t, s) => {
  if (typeof e.versionString == "string") {
    const n = e.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return e.highlight(s, {
        language: t
      }).value;
  }
  return e.highlight(t, s).value;
};
class Ih extends ce {
  static register() {
    C.register(Ue, !0), C.register(Ut, !0), C.register(di, !0);
  }
  constructor(t, s) {
    if (super(t, s), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((n, i) => {
      let {
        key: r
      } = i;
      return n[r] = !0, n;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on(C.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof di)) return;
      const s = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const o = s.ownerDocument.createElement("option");
        o.textContent = r, o.setAttribute("value", i), s.appendChild(o);
      }), s.addEventListener("change", () => {
        t.format(Ut.blotName, s.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(s), t.children.head && (s.value = Ut.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(C.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(C.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(di) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, s);
    }), this.quill.update(C.sources.SILENT), n != null && this.quill.setSelection(n, C.sources.SILENT);
  }
  highlightBlot(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (s = this.languages[s] ? s : "plain", s === "plain")
      return Kr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [_t.blotName]: s
      }), i.insert(r)), new q());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(_t.className), n.innerHTML = ew(this.options.hljs, s, t), Ll(this.quill.scroll, n, [(i, r) => {
      const o = oi.value(i);
      return o ? r.compose(new q().retain(r.length(), {
        [Ue.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, l, a) => (a !== 0 && o.insert(`
`, {
      [_t.blotName]: s
    }), o.insert(l)), r)], /* @__PURE__ */ new WeakMap());
  }
}
Ih.DEFAULTS = {
  hljs: window.hljs,
  interval: 1e3,
  languages: [{
    key: "plain",
    label: "Plain"
  }, {
    key: "bash",
    label: "Bash"
  }, {
    key: "cpp",
    label: "C++"
  }, {
    key: "cs",
    label: "C#"
  }, {
    key: "css",
    label: "CSS"
  }, {
    key: "diff",
    label: "Diff"
  }, {
    key: "xml",
    label: "HTML/XML"
  }, {
    key: "java",
    label: "Java"
  }, {
    key: "javascript",
    label: "JavaScript"
  }, {
    key: "markdown",
    label: "Markdown"
  }, {
    key: "php",
    label: "PHP"
  }, {
    key: "python",
    label: "Python"
  }, {
    key: "ruby",
    label: "Ruby"
  }, {
    key: "sql",
    label: "SQL"
  }]
};
const fi = class fi extends pt {
  static create(t) {
    const s = super.create();
    return t ? s.setAttribute("data-row", t) : s.setAttribute("data-row", Il()), s;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, s) {
    t === fi.blotName && s ? this.domNode.setAttribute("data-row", s) : super.format(t, s);
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    return this.row() ? this.row().rowOffset() : -1;
  }
  table() {
    return this.row() && this.row().table();
  }
};
M(fi, "blotName", "table"), M(fi, "tagName", "TD");
let ne = fi;
class Fe extends zs {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const t = this.children.head.formats(), s = this.children.tail.formats(), n = this.next.children.head.formats(), i = this.next.children.tail.formats();
      return t.table === s.table && t.table === n.table && t.table === i.table;
    }
    return !1;
  }
  optimize(t) {
    super.optimize(t), this.children.forEach((s) => {
      if (s.next == null) return;
      const n = s.formats(), i = s.next.formats();
      if (n.table !== i.table) {
        const r = this.splitAfter(s);
        r && r.optimize(), this.prev && this.prev.optimize();
      }
    });
  }
  rowOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
}
M(Fe, "blotName", "table-row"), M(Fe, "tagName", "TR");
class we extends zs {
}
M(we, "blotName", "table-body"), M(we, "tagName", "TBODY");
class xn extends zs {
  balanceCells() {
    const t = this.descendants(Fe), s = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(s - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = ne.formats(n.children.head.domNode));
        const r = this.scroll.create(ne.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((s) => s.children.at(t));
  }
  deleteColumn(t) {
    const [s] = this.descendant(we);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [s] = this.descendant(we);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t), r = ne.formats(n.children.head.domNode), o = this.scroll.create(ne.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [s] = this.descendant(we);
    if (s == null || s.children.head == null) return;
    const n = Il(), i = this.scroll.create(Fe.blotName);
    s.children.head.children.forEach(() => {
      const o = this.scroll.create(ne.blotName, n);
      i.appendChild(o);
    });
    const r = s.children.at(t);
    s.insertBefore(i, r);
  }
  rows() {
    const t = this.children.head;
    return t == null ? [] : t.children.map((s) => s);
  }
}
M(xn, "blotName", "table-container"), M(xn, "tagName", "TABLE");
xn.allowedChildren = [we];
we.requiredContainer = xn;
we.allowedChildren = [Fe];
Fe.requiredContainer = we;
Fe.allowedChildren = [ne];
ne.requiredContainer = Fe;
function Il() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class sw extends ce {
  static register() {
    C.register(ne), C.register(Fe), C.register(we), C.register(xn);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(xn).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , s] = this.getTable();
    s != null && (t.deleteColumn(s.cellOffset()), this.quill.update(C.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(C.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const s = t.offset();
    t.remove(), this.quill.update(C.sources.USER), this.quill.setSelection(s, C.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [s, n] = this.quill.getLine(t.index);
    if (s == null || s.statics.blotName !== ne.blotName)
      return [null, null, null, -1];
    const i = s.parent;
    return [i.parent.parent, i, s, n];
  }
  insertColumn(t) {
    const s = this.quill.getSelection();
    if (!s) return;
    const [n, i, r] = this.getTable(s);
    if (r == null) return;
    const o = r.cellOffset();
    n.insertColumn(o + t), this.quill.update(C.sources.USER);
    let l = i.rowOffset();
    t === 0 && (l += 1), this.quill.setSelection(s.index + l, s.length, C.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(t) {
    const s = this.quill.getSelection();
    if (!s) return;
    const [n, i, r] = this.getTable(s);
    if (r == null) return;
    const o = i.rowOffset();
    n.insertRow(o + t), this.quill.update(C.sources.USER), t > 0 ? this.quill.setSelection(s, C.sources.SILENT) : this.quill.setSelection(s.index + i.children.length, s.length, C.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(t, s) {
    const n = this.quill.getSelection();
    if (n == null) return;
    const i = new Array(t).fill(0).reduce((r) => {
      const o = new Array(s).fill(`
`).join("");
      return r.insert(o, {
        table: Il()
      });
    }, new q().retain(n.index));
    this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(n.index, C.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(C.events.SCROLL_OPTIMIZE, (t) => {
      t.some((s) => ["TD", "TR", "TBODY", "TABLE"].includes(s.target.tagName) ? (this.quill.once(C.events.TEXT_CHANGE, (n, i, r) => {
        r === C.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const hu = We("quill:toolbar");
class xl extends ce {
  constructor(t, s) {
    var n, i;
    if (super(t, s), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), nw(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      hu.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var l;
      const o = (l = this.options.handlers) == null ? void 0 : l[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(C.events.EDITOR_CHANGE, () => {
      const [r] = this.quill.selection.getRange();
      this.update(r);
    });
  }
  addHandler(t, s) {
    this.handlers[t] = s;
  }
  attach(t) {
    let s = Array.from(t.classList).find((i) => i.indexOf("ql-") === 0);
    if (!s) return;
    if (s = s.slice(3), t.tagName === "BUTTON" && t.setAttribute("type", "button"), this.handlers[s] == null && this.quill.scroll.query(s) == null) {
      hu.warn("ignoring attaching to nonexistent format", s, t);
      return;
    }
    const n = t.tagName === "SELECT" ? "change" : "click";
    t.addEventListener(n, (i) => {
      let r;
      if (t.tagName === "SELECT") {
        if (t.selectedIndex < 0) return;
        const l = t.options[t.selectedIndex];
        l.hasAttribute("selected") ? r = !1 : r = l.value || !1;
      } else
        t.classList.contains("ql-active") ? r = !1 : r = t.value || !t.hasAttribute("value"), i.preventDefault();
      this.quill.focus();
      const [o] = this.quill.selection.getRange();
      if (this.handlers[s] != null)
        this.handlers[s].call(this, r);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(s).prototype instanceof Mt
      ) {
        if (r = prompt(`Enter ${s}`), !r) return;
        this.quill.updateContents(new q().retain(o.index).delete(o.length).insert({
          [s]: r
        }), C.sources.USER);
      } else
        this.quill.format(s, r, C.sources.USER);
      this.update(o);
    }), this.controls.push([s, t]);
  }
  update(t) {
    const s = t == null ? {} : this.quill.getFormat(t);
    this.controls.forEach((n) => {
      const [i, r] = n;
      if (r.tagName === "SELECT") {
        let o = null;
        if (t == null)
          o = null;
        else if (s[i] == null)
          o = r.querySelector("option[selected]");
        else if (!Array.isArray(s[i])) {
          let l = s[i];
          typeof l == "string" && (l = l.replace(/"/g, '\\"')), o = r.querySelector(`option[value="${l}"]`);
        }
        o == null ? (r.value = "", r.selectedIndex = -1) : o.selected = !0;
      } else if (t == null)
        r.classList.remove("ql-active"), r.setAttribute("aria-pressed", "false");
      else if (r.hasAttribute("value")) {
        const o = s[i], l = o === r.getAttribute("value") || o != null && o.toString() === r.getAttribute("value") || o == null && !r.getAttribute("value");
        r.classList.toggle("ql-active", l), r.setAttribute("aria-pressed", l.toString());
      } else {
        const o = s[i] != null;
        r.classList.toggle("ql-active", o), r.setAttribute("aria-pressed", o.toString());
      }
    });
  }
}
xl.DEFAULTS = {};
function fu(e, t, s) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), s != null ? (n.value = s, n.setAttribute("aria-label", `${t}: ${s}`)) : n.setAttribute("aria-label", t), e.appendChild(n);
}
function nw(e, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((s) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), s.forEach((i) => {
      if (typeof i == "string")
        fu(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? iw(n, r, o) : fu(n, r, o);
      }
    }), e.appendChild(n);
  });
}
function iw(e, t, s) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), s.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), e.appendChild(n);
}
xl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const e = this.quill.getSelection();
      if (e != null)
        if (e.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((s) => {
            this.quill.scroll.query(s, B.INLINE) != null && this.quill.format(s, !1, C.sources.USER);
          });
        } else
          this.quill.removeFormat(e.index, e.length, C.sources.USER);
    },
    direction(e) {
      const {
        align: t
      } = this.quill.getFormat();
      e === "rtl" && t == null ? this.quill.format("align", "right", C.sources.USER) : !e && t === "right" && this.quill.format("align", !1, C.sources.USER), this.quill.format("direction", e, C.sources.USER);
    },
    indent(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t), n = parseInt(s.indent || 0, 10);
      if (e === "+1" || e === "-1") {
        let i = e === "+1" ? 1 : -1;
        s.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, C.sources.USER);
      }
    },
    link(e) {
      e === !0 && (e = prompt("Enter link URL:")), this.quill.format("link", e, C.sources.USER);
    },
    list(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t);
      e === "check" ? s.list === "checked" || s.list === "unchecked" ? this.quill.format("list", !1, C.sources.USER) : this.quill.format("list", "unchecked", C.sources.USER) : this.quill.format("list", e, C.sources.USER);
    }
  }
};
const rw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', cw = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', uw = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', dw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', hw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', pu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', fw = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', pw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', gw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', mw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', bw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', yw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', vw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', _w = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', Ew = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', ww = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', Tw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Aw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', kw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Cw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Sw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Iw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', xw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', $w = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Rw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Mw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Dw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', wi = {
  align: {
    "": rw,
    center: ow,
    right: aw,
    justify: lw
  },
  background: cw,
  blockquote: uw,
  bold: dw,
  clean: hw,
  code: pu,
  "code-block": pu,
  color: fw,
  direction: {
    "": pw,
    rtl: gw
  },
  formula: mw,
  header: {
    1: bw,
    2: yw,
    3: vw,
    4: _w,
    5: Ew,
    6: ww
  },
  italic: Tw,
  image: Aw,
  indent: {
    "+1": Nw,
    "-1": Ow
  },
  link: kw,
  list: {
    bullet: Cw,
    check: Sw,
    ordered: Lw
  },
  script: {
    sub: Iw,
    super: xw
  },
  strike: $w,
  table: Rw,
  underline: Mw,
  video: Dw
}, qw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let gu = 0;
function mu(e, t) {
  e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
}
class Yr {
  constructor(t) {
    this.select = t, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    }), this.label.addEventListener("keydown", (s) => {
      switch (s.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape(), s.preventDefault();
          break;
      }
    }), this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded"), mu(this.label, "aria-expanded"), mu(this.options, "aria-hidden");
  }
  buildItem(t) {
    const s = document.createElement("span");
    s.tabIndex = "0", s.setAttribute("role", "button"), s.classList.add("ql-picker-item");
    const n = t.getAttribute("value");
    return n && s.setAttribute("data-value", n), t.textContent && s.setAttribute("data-label", t.textContent), s.addEventListener("click", () => {
      this.selectItem(s, !0);
    }), s.addEventListener("keydown", (i) => {
      switch (i.key) {
        case "Enter":
          this.selectItem(s, !0), i.preventDefault();
          break;
        case "Escape":
          this.escape(), i.preventDefault();
          break;
      }
    }), s;
  }
  buildLabel() {
    const t = document.createElement("span");
    return t.classList.add("ql-picker-label"), t.innerHTML = qw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${gu}`, gu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((s) => {
      const n = this.buildItem(s);
      t.appendChild(n), s.selected === !0 && this.selectItem(n);
    }), this.container.appendChild(t);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((t) => {
      this.container.setAttribute(t.name, t.value);
    }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
  }
  escape() {
    this.close(), setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const n = this.container.querySelector(".ql-selected");
    t !== n && (n != null && n.classList.remove("ql-selected"), t != null && (t.classList.add("ql-selected"), this.select.selectedIndex = Array.from(t.parentNode.children).indexOf(t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), s && (this.select.dispatchEvent(new Event("change")), this.close())));
  }
  update() {
    let t;
    if (this.select.selectedIndex > -1) {
      const n = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      t = this.select.options[this.select.selectedIndex], this.selectItem(n);
    } else
      this.selectItem(null);
    const s = t != null && t !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", s);
  }
}
class xh extends Yr {
  constructor(t, s) {
    super(t), this.label.innerHTML = s, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((n) => {
      n.classList.add("ql-primary");
    });
  }
  buildItem(t) {
    const s = super.buildItem(t);
    return s.style.backgroundColor = t.getAttribute("value") || "", s;
  }
  selectItem(t, s) {
    super.selectItem(t, s);
    const n = this.label.querySelector(".ql-color-label"), i = t && t.getAttribute("data-value") || "";
    n && (n.tagName === "line" ? n.style.stroke = i : n.style.fill = i);
  }
}
class $h extends Yr {
  constructor(t, s) {
    super(t), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((n) => {
      n.innerHTML = s[n.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(t, s) {
    super.selectItem(t, s);
    const n = t || this.defaultItem;
    if (n != null) {
      if (this.label.innerHTML === n.innerHTML) return;
      this.label.innerHTML = n.innerHTML;
    }
  }
}
const Bw = (e) => {
  const {
    overflowY: t
  } = getComputedStyle(e, null);
  return t !== "visible" && t !== "clip";
};
class Rh {
  constructor(t, s) {
    this.quill = t, this.boundsContainer = s || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Bw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(t) {
    const s = t.left + t.width / 2 - this.root.offsetWidth / 2, n = t.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${s}px`, this.root.style.top = `${n}px`, this.root.classList.remove("ql-flip");
    const i = this.boundsContainer.getBoundingClientRect(), r = this.root.getBoundingClientRect();
    let o = 0;
    if (r.right > i.right && (o = i.right - r.right, this.root.style.left = `${s + o}px`), r.left < i.left && (o = i.left - r.left, this.root.style.left = `${s + o}px`), r.bottom > i.bottom) {
      const l = r.bottom - r.top, a = t.bottom - t.top + l;
      this.root.style.top = `${n - a}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Pw = [!1, "center", "right", "justify"], jw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Vw = [!1, "serif", "monospace"], Uw = ["1", "2", "3", !1], Fw = ["small", !1, "large", "huge"];
class Di extends In {
  constructor(t, s) {
    super(t, s);
    const n = (i) => {
      if (!document.body.contains(t.root)) {
        document.body.removeEventListener("click", n);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(i.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((r) => {
        r.container.contains(i.target) || r.close();
      });
    };
    t.emitter.listenDOM("click", document.body, n);
  }
  addModule(t) {
    const s = super.addModule(t);
    return t === "toolbar" && this.extendToolbar(s), s;
  }
  buildButtons(t, s) {
    Array.from(t).forEach((n) => {
      (n.getAttribute("class") || "").split(/\s+/).forEach((r) => {
        if (r.startsWith("ql-") && (r = r.slice(3), s[r] != null))
          if (r === "direction")
            n.innerHTML = s[r][""] + s[r].rtl;
          else if (typeof s[r] == "string")
            n.innerHTML = s[r];
          else {
            const o = n.value || "";
            o != null && s[r][o] && (n.innerHTML = s[r][o]);
          }
      });
    });
  }
  buildPickers(t, s) {
    this.pickers = Array.from(t).map((i) => {
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ni(i, Pw), typeof s.align == "object"))
        return new $h(i, s.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ni(i, jw, r === "background" ? "#ffffff" : "#000000"), new xh(i, s[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ni(i, Vw) : i.classList.contains("ql-header") ? ni(i, Uw) : i.classList.contains("ql-size") && ni(i, Fw)), new Yr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(D.events.EDITOR_CHANGE, n);
  }
}
Di.DEFAULTS = as({}, In.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let e = this.container.querySelector("input.ql-image[type=file]");
          e == null && (e = document.createElement("input"), e.setAttribute("type", "file"), e.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), e.classList.add("ql-image"), e.addEventListener("change", () => {
            const t = this.quill.getSelection(!0);
            this.quill.uploader.upload(t, e.files), e.value = "";
          }), this.container.appendChild(e)), e.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class Mh extends Rh {
  constructor(t, s) {
    super(t, s), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (t) => {
      t.key === "Enter" ? (this.save(), t.preventDefault()) : t.key === "Escape" && (this.cancel(), t.preventDefault());
    });
  }
  cancel() {
    this.hide(), this.restoreFocus();
  }
  edit() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
    s != null ? this.textbox.value = s : t !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
    const n = this.quill.getBounds(this.quill.selection.savedRange);
    n != null && this.position(n), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${t}`) || ""), this.root.setAttribute("data-mode", t);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: !0
    });
  }
  save() {
    let {
      value: t
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop: s
        } = this.quill.root;
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, D.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, D.sources.USER)), this.quill.root.scrollTop = s;
        break;
      }
      case "video":
        t = Hw(t);
      case "formula": {
        if (!t) break;
        const s = this.quill.getSelection(!0);
        if (s != null) {
          const n = s.index + s.length;
          this.quill.insertEmbed(
            n,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            t,
            D.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", D.sources.USER), this.quill.setSelection(n + 2, D.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function Hw(e) {
  let t = e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = e.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : e;
}
function ni(e, t) {
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === s ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), e.appendChild(i);
  });
}
const zw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Dh extends Mh {
  constructor(t, s) {
    super(t, s), this.quill.on(D.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === D.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === D.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(i.index, i.length);
          if (l.length === 1) {
            const a = this.quill.getBounds(i);
            a != null && this.position(a);
          } else {
            const a = l[l.length - 1], u = this.quill.getIndex(a), h = Math.min(a.length() - 1, i.index + i.length - u), d = this.quill.getBounds(new Ps(u, h));
            d != null && this.position(d);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(D.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const t = this.quill.getSelection();
        if (t != null) {
          const s = this.quill.getBounds(t);
          s != null && this.position(s);
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(t) {
    const s = super.position(t), n = this.root.querySelector(".ql-tooltip-arrow");
    return n.style.marginLeft = "", s !== 0 && (n.style.marginLeft = `${-1 * s - n.offsetWidth / 2}px`), s;
  }
}
M(Dh, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class qh extends Di {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = zw), super(t, s), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Dh(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), wi), this.buildPickers(t.container.querySelectorAll("select"), wi));
  }
}
qh.DEFAULTS = as({}, Di.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(e) {
          e ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, C.sources.USER);
        }
      }
    }
  }
});
const Ww = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Bh extends Mh {
  constructor() {
    super(...arguments);
    M(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (s) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), s.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (s) => {
      if (this.linkRange != null) {
        const n = this.linkRange;
        this.restoreFocus(), this.quill.formatText(n, "link", !1, D.sources.USER), delete this.linkRange;
      }
      s.preventDefault(), this.hide();
    }), this.quill.on(D.events.SELECTION_CHANGE, (s, n, i) => {
      if (s != null) {
        if (s.length === 0 && i === D.sources.USER) {
          const [r, o] = this.quill.scroll.descendant(os, s.index);
          if (r != null) {
            this.linkRange = new Ps(s.index - o, r.length());
            const l = os.formats(r.domNode);
            this.preview.textContent = l, this.preview.setAttribute("href", l), this.show();
            const a = this.quill.getBounds(this.linkRange);
            a != null && this.position(a);
            return;
          }
        } else
          delete this.linkRange;
        this.hide();
      }
    });
  }
  show() {
    super.show(), this.root.removeAttribute("data-mode");
  }
}
M(Bh, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Ph extends Di {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = Ww), super(t, s), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), wi), this.buildPickers(t.container.querySelectorAll("select"), wi), this.tooltip = new Bh(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (s, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Ph.DEFAULTS = as({}, Di.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(e) {
          if (e) {
            const t = this.quill.getSelection();
            if (t == null || t.length === 0) return;
            let s = this.quill.getText(t);
            /^\S+@\S+\.\S+$/.test(s) && s.indexOf("mailto:") !== 0 && (s = `mailto:${s}`);
            const {
              tooltip: n
            } = this.quill.theme;
            n.edit("link", s);
          } else
            this.quill.format("link", !1, C.sources.USER);
        }
      }
    }
  }
});
C.register({
  "attributors/attribute/direction": yh,
  "attributors/class/align": gh,
  "attributors/class/background": uE,
  "attributors/class/color": cE,
  "attributors/class/direction": vh,
  "attributors/class/font": wh,
  "attributors/class/size": Ah,
  "attributors/style/align": mh,
  "attributors/style/background": Ol,
  "attributors/style/color": Nl,
  "attributors/style/direction": _h,
  "attributors/style/font": Th,
  "attributors/style/size": Nh
}, !0);
C.register({
  "formats/align": gh,
  "formats/direction": vh,
  "formats/indent": tw,
  "formats/background": Ol,
  "formats/color": Nl,
  "formats/font": wh,
  "formats/size": Ah,
  "formats/blockquote": Ma,
  "formats/code-block": _t,
  "formats/header": Da,
  "formats/list": Mi,
  "formats/bold": Ei,
  "formats/code": kl,
  "formats/italic": qa,
  "formats/link": os,
  "formats/script": Ba,
  "formats/strike": Pa,
  "formats/underline": ja,
  "formats/formula": mr,
  "formats/image": Va,
  "formats/video": br,
  "modules/syntax": Ih,
  "modules/table": sw,
  "modules/toolbar": xl,
  "themes/bubble": qh,
  "themes/snow": Ph,
  "ui/icons": wi,
  "ui/picker": Yr,
  "ui/icon-picker": $h,
  "ui/color-picker": xh,
  "ui/tooltip": Rh
}, !0);
const ue = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, Kw = {
  props: ["modelValue"],
  mounted() {
    this.initQuillEditor();
  },
  watch: {
    modelValue(e) {
      e || (e = ""), this.quill.root.innerHTML != e && (this.quill.root.innerHTML = e);
    }
  },
  methods: {
    initQuillEditor() {
      this.quill = new C(this.$refs.editor, {
        theme: "snow",
        modules: {
          //syntax: true,              // Include syntax module
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["clean"]
          ]
        },
        formats: [
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "image",
          "list",
          "indent",
          "align"
        ]
      }), this.modelValue ? this.quill.root.innerHTML = this.modelValue : this.quill.root.innerHTML = "", this.quill.on("text-change", () => {
        this.$emit("update:modelValue", this.quill.root.innerHTML);
      });
    }
  }
}, Gw = Kw, Yw = { class: "ql-editor-container" }, Xw = {
  class: "",
  ref: "editor"
};
function Zw(e, t, s, n, i, r) {
  return g(), m("div", Yw, [
    f("div", Xw, null, 512)
  ]);
}
const Qw = /* @__PURE__ */ ue(Gw, [["render", Zw], ["__scopeId", "data-v-443c4edc"]]), Pt = {
  image: {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif"
  },
  video: {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    mpeg: "video/mpeg",
    mov: "video/quicktime"
  },
  document: {
    txt: "text/plain",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    rtf: "application/rtf"
  }
}, Jw = {
  props: {
    modelValue: Array,
    field: Object,
    settings: Object
  },
  data: function() {
    return {
      files: [],
      editfile: null,
      count: 0,
      bytes: 0,
      wait: !1,
      uploadEvent: null
    };
  },
  created() {
    let e = Math.round(Math.random() * 1e5);
    this.uploadId = "image_upload_" + e, this.params = this.field.params;
  },
  mounted() {
    this.editfile = this.modelValue, this.editfile || (this.editfile = []);
  },
  watch: {
    modelValue(e) {
      if (e == null)
        this.reset();
      else {
        for (let t of e)
          this.setDefaults(t);
        this.files = e;
      }
    }
  },
  methods: {
    roundFileSize(e, t) {
      return e < 1024 ? e + (t ? " Byte" : "") : e < 1048576 ? (e / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : e < 1073741824 ? (e / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (e / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
    },
    extensionByFilename(e) {
      return e.split(".").reverse()[0];
    },
    getAcceptMimeTypes(e) {
      let t = [];
      for (const s in Pt)
        if (Pt.hasOwnProperty(s)) {
          const n = Pt[s];
          e.forEach((i) => {
            n[i] && t.push(n[i]);
          });
        }
      return t.join(",");
    },
    setDefaults(e) {
      this.params.tags && !e.tags && (e.tags = []);
    },
    detect(e) {
      this.setDefaults(e), e.bytes = 0, e.types = {
        default: {}
      }, e.title = e.name.split(".").slice(0, -1).join("."), e.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32), e.slug = ei(e.title), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
        bytes: e.size,
        mime: e.type,
        name: e.name,
        modified: e.lastModified,
        extension: this.extensionByFilename(e.name)
      }, Object.values(Pt.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(Pt.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(Pt.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, (e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
        width: 1920,
        height: 1920,
        extension: "webp",
        quality: 0.9
      });
    },
    async createThumbnail(e, t) {
      const s = document.createElement("video"), n = new FileReader();
      n.onload = (i) => {
        s.src = i.target.result, s.addEventListener("loadeddata", () => {
          s.currentTime = s.duration * Math.random(), e.video = s;
        }), s.addEventListener("seeked", () => {
          this.forEachPresets(e, s), e.loaded = !0, this.bytes += e.bytes;
        });
      }, n.readAsDataURL(e);
    },
    seekRandom(e) {
      e.video && (e.video.currentTime = e.video.duration * Math.random());
    },
    async handleFileChange(e) {
      this.uploadEvent = e, this.count = this.files ? this.files.length : 0, this.wait = !0;
      for (let t of e.target.files)
        if (this.count++, this.count <= this.params.limit) {
          if (this.files.push(t), this.detect(t), t.isVideo)
            await this.createThumbnail(t);
          else if (t.isImage)
            await this.resizeImage(t);
          else if (t.isDocument) {
            const s = new FileReader();
            s.addEventListener("load", (n) => {
              t.types.default = {
                extension: t.original.extension,
                mime: t.original.mime,
                slug: ei(t.title) + "-" + t.uid,
                bytes: t.size,
                data: n.target.result
              }, t.loaded = !0, t.bytes += t.size, this.bytes += t.bytes;
            }), s.readAsDataURL(t);
          }
        }
      this.$emit("update:modelValue", this.files), this.wait = !1, this.uploadEvent.target.value = "";
    },
    async forEachPresets(e, t, s) {
      const n = document.createElement("canvas"), i = n.getContext("2d");
      let r = !!t.videoWidth, o, l;
      r ? (o = t.videoWidth, l = t.videoHeight) : (o = t.width, l = t.height), e.original.width = o, e.original.height = l;
      for (let a in this.params.presets) {
        let u = this.params.presets[a];
        u.key = a, u.width = u.width ? u.width : 1920, u.height = u.height ? u.height : 1080;
        let h = u.width, d = u.height;
        if (u.crop === "fit") {
          let b = Math.max(h / o, d / l), y = o * b, _ = l * b, E = (y - h) / 2, w = (_ - d) / 2;
          n.width = h, n.height = d, i.drawImage(t, -E, -w, y, _);
        } else if (u.crop === "contain") {
          let b = Math.min(h / o, d / l), y = o * b, _ = l * b, E = (h - y) / 2, w = (d - _) / 2;
          n.width = h, n.height = d, i.clearRect(0, 0, h, d), i.drawImage(t, E, w, y, _);
        } else
          o > h && (l = Math.round(l * (h / o)), o = h), l > d && (o = Math.round(o * (d / l)), l = d), n.width = o, n.height = l, i.drawImage(t, 0, 0, o, l);
        e.types[u.key] = {
          width: n.width,
          height: n.height,
          extension: u.extension ? u.extension : this.getExtensionByMimeType(e.type),
          quality: u.quality ? u.quality : 0.9,
          crop: u.crop ? u.crop : null
        }, e.types[u.key].slug = ei(e.title) + "-" + n.width + "x" + n.height + "-" + e.uid, e.types[u.key].mime = this.getMimeTypeByExtension(e.types[u.key].extension), e.types[u.key].data = n.toDataURL(
          e.types[u.key].mime,
          e.types[u.key].quality
        ), e.types[u.key].blob = await this.getBlob(n, e.types[u.key].mime, e.types[u.key].quality), e.types[u.key].blob && (e.types[u.key].bytes = e.types[u.key].blob.size), e.types[u.key].bytes && (e.bytes += e.types[u.key].bytes), s && s(u, e);
      }
    },
    getBlob(e, t, s) {
      return new Promise((n, i) => {
        e.toBlob(function(r) {
          r ? n(r) : i(new Error("Failed to convert canvas to Blob"));
        }, t, s);
      });
    },
    async resizeImage(e) {
      const t = await this.fileToBlob(e), s = await createImageBitmap(t);
      await this.forEachPresets(e, s), e.loaded = !0, this.bytes += e.bytes;
    },
    fileToBlob(e) {
      return new Promise((t) => {
        const s = new FileReader();
        s.onload = (n) => {
          t(new Blob([n.target.result], { type: e.mime }));
        }, s.readAsArrayBuffer(e);
      });
    },
    slug(e) {
      if (!e.uploaded) {
        e.slug = ei(e.title);
        for (let t in e.types) {
          let s = this.params.presets[t];
          e.types[t].slug = ei(e.title) + "-" + s.width + "x" + s.height;
        }
        this.$forceUpdate();
      }
    },
    download(e, t) {
      let s = this.files[e].types[t.download], n = document.createElement("a");
      n.href = s.url, n.download = s.slug + "." + s.extension, n.click();
    },
    remove(e) {
      confirm("Are you sure you want to remove?") && (this.bytes -= this.files[e].bytes, this.files.splice(e, 1), this.count = this.files.length);
    },
    resetConfirm() {
      confirm("Are you sure you want to remove all?") && this.reset();
    },
    reset() {
      this.files = [], this.editfile = {}, this.count = 0, this.bytes = 0, this.wait = !1, this.$emit("update:modelValue", this.files);
    },
    // fullscreen(file) {
    // 	file.fullscreen = !file.fullscreen;
    // 	console.log(file.fullscreen);
    // },
    toggleView() {
      this.params.ui = this.params.ui == "list" ? "grid" : "list";
    },
    dateFormat(e) {
      return new Date(e).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    getMimeTypeByExtension(e) {
      for (const t in Pt)
        if (Pt.hasOwnProperty(t)) {
          const s = Pt[t];
          if (s[e])
            return s[e];
        }
      return null;
    },
    getExtensionByMimeType(e) {
      for (const t in Pt)
        if (Pt.hasOwnProperty(t)) {
          const s = Pt[t];
          for (const n in s)
            if (s[n] === e)
              return n;
        }
      return null;
    },
    translate(e, t, s) {
      return Si(e, this.settings.translate, t, s || this.settings.language);
    },
    dropdownSelectToggleOne(e, t) {
      _d(e, t), this.$forceUpdate();
    },
    dropdownSelectAll(e, t) {
      Ed(e, t), this.$forceUpdate();
    },
    dropdownSelectInvert(e, t) {
      wd(e, t), this.$forceUpdate();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Td(e), this.$forceUpdate();
    }
  }
}, tT = Jw, eT = { class: "" }, sT = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, nT = { class: "row" }, iT = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, rT = { class: "badge bg-dark text-light fw-light mx-1" }, oT = { class: "badge bg-dark text-light fw-light mx-1" }, aT = ["src"], lT = { class: "row g-1" }, cT = { class: "col-md-6" }, uT = { class: "col-md-6" }, dT = { class: "col-md-6" }, hT = ["href"], fT = {
  key: 1,
  class: "row g-2 mb-1"
}, pT = { key: 0 }, gT = { class: "table table-sm table-responsive table-borderless" }, mT = { class: "align-middle text-center ps-0" }, bT = { class: "align-middle px-0" }, yT = { class: "input-group border rounded" }, vT = {
  key: 0,
  class: "fs-5 ms-2"
}, _T = {
  key: 1,
  class: "fs-5 ms-2"
}, ET = {
  key: 2,
  class: "fs-5 ms-2"
}, wT = ["onUpdate:modelValue", "onInput"], TT = {
  key: 3,
  class: "mx-1"
}, AT = ["href"], NT = ["src", "alt"], OT = ["src", "alt"], kT = {
  key: 4,
  class: "dropdown rounded-bottom"
}, CT = {
  class: "btn btn-sm bg-light text-dark w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, ST = { class: "dropdown-menu" }, LT = ["onClick"], IT = {
  key: 0,
  class: "bi bi-check-square"
}, xT = {
  key: 1,
  class: "bi bi-square"
}, $T = ["onClick"], RT = ["onClick"], MT = ["onClick"], DT = { class: "dropdown" }, qT = { class: "dropdown-menu" }, BT = ["onClick"], PT = { key: 0 }, jT = ["onClick"], VT = { key: 1 }, UT = { class: "dropdown-item py-0 d-flex justify-content-between" }, FT = { key: 2 }, HT = { class: "dropdown-item py-0 d-flex justify-content-between" }, zT = ["innerHTML"], WT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, KT = { key: 0 }, GT = { key: 1 }, YT = { class: "dropdown-item py-0 d-flex justify-content-between" }, XT = { class: "text-muted fw-light me-4" }, ZT = { class: "text-primary" }, QT = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, JT = { class: "dropdown-item py-0 d-flex justify-content-between" }, tA = { class: "text-muted fw-light me-1" }, eA = {
  key: 0,
  class: "text-primary"
}, sA = ["innerHTML"], nA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, iA = { key: 3 }, rA = { class: "dropdown-item py-0 d-flex justify-content-between" }, oA = { class: "dropdown-item py-0 d-flex justify-content-between" }, aA = { class: "text-muted fw-light me-3" }, lA = ["innerHTML"], cA = { class: "dropdown-item py-0 d-flex justify-content-between" }, uA = { class: "text-muted fw-light me-3" }, dA = { class: "vsa-image-container h-100 position-relative border p-1 rounded" }, hA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, fA = {
  key: 1,
  class: "vsa-image-frame mb-auto text-center"
}, pA = { key: 0 }, gA = ["src", "alt"], mA = ["src", "alt"], bA = {
  key: 2,
  class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, yA = ["onUpdate:modelValue", "onInput"], vA = { class: "w-100 d-flex justify-content-around align-items-center" }, _A = { class: "dropdown rounded-bottom border w-100" }, EA = { class: "dropdown-menu" }, wA = ["onClick"], TA = { key: 0 }, AA = ["onClick"], NA = { key: 1 }, OA = { class: "dropdown-item py-0 d-flex justify-content-between" }, kA = { key: 2 }, CA = { class: "dropdown-item py-0 d-flex justify-content-between" }, SA = ["innerHTML"], LA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, IA = { key: 0 }, xA = { key: 1 }, $A = { class: "dropdown-item py-0 d-flex justify-content-between" }, RA = { class: "text-muted fw-light me-4" }, MA = { class: "text-primary" }, DA = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, qA = { class: "dropdown-item py-0 d-flex justify-content-between" }, BA = { class: "text-muted fw-light me-1" }, PA = {
  key: 0,
  class: "text-primary"
}, jA = ["innerHTML"], VA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, UA = { key: 3 }, FA = { class: "dropdown-item py-0 d-flex justify-content-between" }, HA = { class: "dropdown-item py-0 d-flex justify-content-between" }, zA = { class: "text-muted fw-light me-3" }, WA = ["innerHTML"], KA = { class: "dropdown-item py-0 d-flex justify-content-between" }, GA = { class: "text-muted fw-light me-3" }, YA = {
  key: 0,
  class: "dropdown rounded-bottom border w-100"
}, XA = {
  class: "btn btn-sm bg-light text-dark w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, ZA = { class: "dropdown-menu" }, QA = ["onClick"], JA = {
  key: 0,
  class: "bi bi-check-square"
}, tN = {
  key: 1,
  class: "bi bi-square"
}, eN = ["onClick"], sN = ["onClick"], nN = ["onClick"], iN = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, rN = { class: "row g-1" }, oN = { class: "col-12 d-flex align-items-center justify-content-center" }, aN = ["for"], lN = { key: 0 }, cN = { key: 0 }, uN = { class: "" }, dN = { class: "" }, hN = {
  key: 1,
  class: "fs-6"
}, fN = {
  key: 0,
  class: "bi bi-list-ol"
}, pN = {
  key: 1,
  class: "bi bi-grid"
}, gN = ["disabled"], mN = { class: "col-12 text-center" }, bN = { key: 0 }, yN = ["id", "accept"];
function vN(e, t, s, n, i, r) {
  return g(), m("div", eT, [
    f("div", {
      class: S(["vsa-upload", { wait: e.wait }])
    }, [
      e.editfile && e.editfile.presets ? (g(), m("div", sT, [
        f("div", nT, [
          (g(!0), m(F, null, W(e.editfile.types, (o, l) => (g(), m("div", {
            class: "col-md-3",
            key: l
          }, [
            f("span", iT, O(o.extension), 1),
            f("span", rT, O(o.width) + " x " + O(o.height), 1),
            f("span", oT, "~" + O(e.roundFileSize(o.bytes)), 1),
            o ? (g(), m("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, aT)) : T("", !0)
          ]))), 128))
        ]),
        K(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => e.editfile.title = o)
        }, null, 512), [
          [se, e.editfile.title]
        ]),
        f("div", lT, [
          f("div", cT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => e.editfile = null)
            }, " Close ")
          ]),
          f("div", uT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => e.remove(e.index))
            }, " Remove ")
          ]),
          f("div", dT, [
            e.type && !e.type.url ? (g(), m("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => e.download(e.index, e.params))
            }, " Download ")) : T("", !0),
            e.type && e.type.url ? (g(), m("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: e.type.url
            }, " Download ", 8, hT)) : T("", !0)
          ])
        ])
      ])) : T("", !0),
      e.files && e.files.length ? (g(), m("div", fT, [
        e.params.ui === "list" ? (g(), m("div", pT, [
          f("table", gT, [
            f("tbody", null, [
              (g(!0), m(F, null, W(e.files, (o, l) => (g(), m("tr", { key: l }, [
                f("td", mT, [
                  f("small", null, O(l + 1), 1)
                ]),
                f("td", bT, [
                  f("div", yT, [
                    o.isDocument ? (g(), m("span", vT, [
                      f("i", {
                        class: S(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (g(), m("span", _T, t[9] || (t[9] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (g(), m("span", ET, t[10] || (t[10] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : T("", !0),
                    K(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (a) => o.title = a,
                      onInput: (a) => e.slug(o),
                      onKeydown: t[4] || (t[4] = ai(ft(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, wT), [
                      [se, o.title]
                    ]),
                    !o.isDocument && o.types && o.types[e.params.thumbnail] ? (g(), m("span", TT, [
                      o.types[e.params.thumbnail].url ? (g(), m("a", {
                        key: 0,
                        target: "_blank",
                        href: o.types[e.params.thumbnail].url
                      }, [
                        f("img", {
                          height: "32",
                          width: "auto",
                          class: "rounded border",
                          src: o.types[e.params.thumbnail].url,
                          alt: o.name
                        }, null, 8, NT)
                      ], 8, AT)) : (g(), m("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "",
                        src: o.types[e.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, OT))
                    ])) : T("", !0),
                    e.params.tags ? (g(), m("div", kT, [
                      f("button", CT, O(o.tags ? o.tags.length : 0) + " tag(s) ", 1),
                      f("ul", ST, [
                        f("li", null, [
                          (g(!0), m(F, null, W(e.params.tags, (a) => (g(), m("span", {
                            key: a,
                            class: "dropdown-item cursor-pointer",
                            onClick: (u) => e.dropdownSelectToggleOne(o.tags, a.value)
                          }, [
                            o.tags && o.tags.indexOf(a.value) >= 0 ? (g(), m("i", IT)) : (g(), m("i", xT)),
                            U(" " + O(e.translate(a.label ? a.label : a.value)), 1)
                          ], 8, LT))), 128))
                        ]),
                        t[11] || (t[11] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (a) => e.dropdownSelectAll(o.tags, e.params.tags)
                          }, O(e.translate("Select all")), 9, $T)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (a) => e.dropdownSelectClear(o.tags)
                          }, O(e.translate("Unselect all")), 9, RT)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (a) => e.dropdownSelectInvert(o.tags, e.params.tags)
                          }, O(e.translate("Invert all")), 9, MT)
                        ])
                      ])
                    ])) : T("", !0),
                    f("div", DT, [
                      t[25] || (t[25] = f("button", {
                        class: "btn btn-sm bg-light text-dark dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, null, -1)),
                      f("ul", qT, [
                        f("li", null, [
                          f("button", {
                            class: "dropdown-item text-danger py-1",
                            onClick: (a) => e.remove(l),
                            type: "button"
                          }, t[12] || (t[12] = [
                            f("i", { class: "bi bi-x-circle" }, null, -1),
                            U(" Remove ")
                          ]), 8, BT)
                        ]),
                        o.uploaded ? (g(), m("li", PT, [
                          f("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => e.download(l, e.params),
                            type: "button"
                          }, t[13] || (t[13] = [
                            f("i", { class: "bi bi-download" }, null, -1),
                            U(" Download ")
                          ]), 8, jT)
                        ])) : T("", !0),
                        t[23] || (t[23] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.original.width ? (g(), m("li", VT, [
                          f("small", UT, [
                            t[14] || (t[14] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            U(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                          ])
                        ])) : T("", !0),
                        o.isDocument ? T("", !0) : (g(), m("li", FT, [
                          f("small", HT, [
                            t[15] || (t[15] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            f("span", null, [
                              f("span", {
                                innerHTML: e.roundFileSize(o.original.bytes, !0)
                              }, null, 8, zT),
                              f("small", WT, O(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        (g(!0), m(F, null, W(o.types, (a, u) => (g(), m(F, { key: a }, [
                          o.isDocument ? T("", !0) : (g(), m("li", KT, t[16] || (t[16] = [
                            f("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (g(), m("li", GT, [
                            f("small", YT, [
                              f("span", XT, [
                                f("span", ZT, O(u), 1),
                                t[17] || (t[17] = U(" resolution & crop"))
                              ]),
                              f("span", null, [
                                U(O(a.width) + " x " + O(a.height) + " ", 1),
                                a.crop ? (g(), m("small", QT, O(a.crop), 1)) : T("", !0)
                              ])
                            ])
                          ])) : T("", !0),
                          f("li", null, [
                            f("small", JT, [
                              f("span", tA, [
                                o.isDocument ? T("", !0) : (g(), m("span", eA, O(u), 1)),
                                t[18] || (t[18] = U(" size & extension"))
                              ]),
                              f("span", null, [
                                f("span", {
                                  class: S({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: e.roundFileSize(a.bytes, !0)
                                }, null, 10, sA),
                                f("small", nA, O(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[24] || (t[24] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.uploaded ? (g(), m("li", iA, [
                          f("small", rA, [
                            t[19] || (t[19] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[20] || (t[20] = U()),
                            f("span", null, O(e.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ])) : T("", !0),
                        f("li", null, [
                          f("small", oA, [
                            f("span", aA, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                            t[21] || (t[21] = U()),
                            f("span", {
                              innerHTML: e.roundFileSize(o.bytes, !0)
                            }, null, 8, lA)
                          ])
                        ]),
                        f("li", null, [
                          f("small", cA, [
                            f("span", uA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                            t[22] || (t[22] = U()),
                            f("span", null, O(o.slug), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (g(!0), m(F, { key: 1 }, W(e.files, (o, l) => (g(), m("div", {
          class: S([e.params.colclass ? e.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          f("div", dA, [
            o.loaded ? (g(), m("div", hA, [
              T("", !0),
              o.types && o.types[e.params.thumbnail] ? (g(), m("div", fA, [
                o.types[e.params.thumbnail].url ? (g(), m("a", pA, [
                  f("img", {
                    class: "img-fluid rounded transparent-background",
                    src: o.types[e.params.thumbnail].url,
                    alt: o.name
                  }, null, 8, gA)
                ])) : (g(), m("img", {
                  key: 1,
                  class: "img-fluid rounded transparent-background",
                  src: o.types[e.params.thumbnail].data,
                  alt: o.name
                }, null, 8, mA))
              ])) : T("", !0),
              o.isDocument ? (g(), m("div", bA, [
                f("i", {
                  class: S(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : T("", !0),
              K(f("input", {
                required: "text",
                class: "form-control rounded-0 rounded-top py-1 px-2 fw-light mt-1",
                "onUpdate:modelValue": (a) => o.title = a,
                onInput: (a) => e.slug(o),
                onKeydown: t[5] || (t[5] = ai(ft(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, yA), [
                [se, o.title]
              ]),
              f("div", vA, [
                f("div", _A, [
                  t[42] || (t[42] = f("button", {
                    class: "btn btn-sm bg-light text-dark dropdown-toggle w-100",
                    type: "button",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false"
                  }, " Menu ", -1)),
                  f("ul", EA, [
                    f("li", null, [
                      f("button", {
                        class: "dropdown-item text-danger py-1",
                        onClick: (a) => e.remove(l),
                        type: "button"
                      }, t[29] || (t[29] = [
                        f("i", { class: "bi bi-x-circle" }, null, -1),
                        U(" Remove ")
                      ]), 8, wA)
                    ]),
                    o.uploaded ? (g(), m("li", TA, [
                      f("button", {
                        class: "dropdown-item text-primary py-1",
                        onClick: (a) => e.download(l, e.params),
                        type: "button"
                      }, t[30] || (t[30] = [
                        f("i", { class: "bi bi-download" }, null, -1),
                        U(" Download ")
                      ]), 8, AA)
                    ])) : T("", !0),
                    t[40] || (t[40] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    o.original.width ? (g(), m("li", NA, [
                      f("small", OA, [
                        t[31] || (t[31] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                        U(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                      ])
                    ])) : T("", !0),
                    o.isDocument ? T("", !0) : (g(), m("li", kA, [
                      f("small", CA, [
                        t[32] || (t[32] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                        f("span", null, [
                          f("span", {
                            innerHTML: e.roundFileSize(o.original.bytes, !0)
                          }, null, 8, SA),
                          f("small", LA, O(o.original.extension), 1)
                        ])
                      ])
                    ])),
                    (g(!0), m(F, null, W(o.types, (a, u) => (g(), m(F, { key: a }, [
                      o.isDocument ? T("", !0) : (g(), m("li", IA, t[33] || (t[33] = [
                        f("hr", { class: "dropdown-divider" }, null, -1)
                      ]))),
                      o.original.width ? (g(), m("li", xA, [
                        f("small", $A, [
                          f("span", RA, [
                            f("span", MA, O(u), 1),
                            t[34] || (t[34] = U(" resolution & crop"))
                          ]),
                          f("span", null, [
                            U(O(a.width) + " x " + O(a.height) + " ", 1),
                            a.crop ? (g(), m("small", DA, O(a.crop), 1)) : T("", !0)
                          ])
                        ])
                      ])) : T("", !0),
                      f("li", null, [
                        f("small", qA, [
                          f("span", BA, [
                            o.isDocument ? T("", !0) : (g(), m("span", PA, O(u), 1)),
                            t[35] || (t[35] = U(" size & extension"))
                          ]),
                          f("span", null, [
                            f("span", {
                              class: S({ "text-danger": a.bytes > o.original.bytes }),
                              innerHTML: e.roundFileSize(a.bytes, !0)
                            }, null, 10, jA),
                            f("small", VA, O(a.extension), 1)
                          ])
                        ])
                      ])
                    ], 64))), 128)),
                    t[41] || (t[41] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    o.uploaded ? (g(), m("li", UA, [
                      f("small", FA, [
                        t[36] || (t[36] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                        t[37] || (t[37] = U()),
                        f("span", null, O(e.dateFormat(o.timestamp * 1e3)), 1)
                      ])
                    ])) : T("", !0),
                    f("li", null, [
                      f("small", HA, [
                        f("span", zA, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                        t[38] || (t[38] = U()),
                        f("span", {
                          innerHTML: e.roundFileSize(o.bytes, !0)
                        }, null, 8, WA)
                      ])
                    ]),
                    f("li", null, [
                      f("small", KA, [
                        f("span", GA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                        t[39] || (t[39] = U()),
                        f("span", null, O(o.slug), 1)
                      ])
                    ])
                  ])
                ]),
                e.params.tags ? (g(), m("div", YA, [
                  f("button", XA, O(o.tags ? o.tags.length : 0) + " tag(s) ", 1),
                  f("ul", ZA, [
                    f("li", null, [
                      (g(!0), m(F, null, W(e.params.tags, (a) => (g(), m("span", {
                        key: a,
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => e.dropdownSelectToggleOne(o.tags, a.value)
                      }, [
                        o.tags && o.tags.indexOf(a.value) >= 0 ? (g(), m("i", JA)) : (g(), m("i", tN)),
                        U(" " + O(e.translate(a.label ? a.label : a.value)), 1)
                      ], 8, QA))), 128))
                    ]),
                    t[43] || (t[43] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (a) => e.dropdownSelectAll(o.tags, e.params.tags)
                      }, O(e.translate("Select all")), 9, eN)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (a) => e.dropdownSelectClear(o.tags)
                      }, O(e.translate("Unselect all")), 9, sN)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (a) => e.dropdownSelectInvert(o.tags, e.params.tags)
                      }, O(e.translate("Invert all")), 9, nN)
                    ])
                  ])
                ])) : T("", !0)
              ])
            ])) : (g(), m("div", iN, t[44] || (t[44] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : T("", !0),
      f("div", rN, [
        f("div", oN, [
          f("label", {
            for: e.uploadId,
            class: S([{ "disabled bg-secondary": e.files && e.params.limit <= e.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            e.files && e.params.limit > e.files.length ? (g(), m("span", lN, [
              t[48] || (t[48] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              U(" " + O(e.params.text) + " ", 1),
              e.params.limit ? (g(), m("small", cN, [
                t[45] || (t[45] = U(" ( ")),
                f("strong", uN, O(e.files.length), 1),
                t[46] || (t[46] = U(" / ")),
                f("span", dN, O(e.params.limit), 1),
                t[47] || (t[47] = U(" ) "))
              ])) : T("", !0)
            ])) : (g(), m("span", hN, t[49] || (t[49] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              U(" You've reached the upload limit ")
            ])))
          ], 10, aN),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (o) => e.toggleView())
          }, [
            e.params.ui != "list" ? (g(), m("i", fN)) : T("", !0),
            e.params.ui == "list" ? (g(), m("i", pN)) : T("", !0)
          ]),
          f("button", {
            disabled: !e.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (o) => e.resetConfirm())
          }, t[50] || (t[50] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, gN)
        ]),
        f("div", mN, [
          f("small", null, [
            e.params.accept ? (g(), m("div", bN, [
              t[51] || (t[51] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (g(!0), m(F, null, W(e.params.accept, (o) => (g(), m("strong", {
                class: "ms-1 text-muted",
                key: o
              }, O(o), 1))), 128))
            ])) : T("", !0),
            T("", !0)
          ])
        ])
      ]),
      e.uploadId ? (g(), m("input", {
        key: 2,
        multiple: "",
        style: { opacity: "0", height: "1px", width: "1px" },
        id: e.uploadId,
        type: "file",
        accept: e.getAcceptMimeTypes(e.params.accept),
        onChange: t[8] || (t[8] = (...o) => e.handleFileChange && e.handleFileChange(...o))
      }, null, 40, yN)) : T("", !0)
    ], 2)
  ]);
}
const _N = /* @__PURE__ */ ue(tT, [["render", vN], ["__scopeId", "data-v-606ed6ec"]]), EN = {
  props: {
    modelValue: String | Object | Number,
    optionValue: String,
    field: Object,
    item: Object,
    settings: Object,
    formId: String
  },
  data: function() {
    return {
      newitem: null,
      options: []
    };
  },
  created() {
  },
  mounted() {
    this.loadOptions(), this.setNewItem(this.modelValue);
  },
  watch: {
    modelValue(e) {
      this.setNewItem(e);
    }
  },
  methods: {
    setNewItem(e) {
      this.optionValue === "object" ? this.newitem = e && e.value : this.newitem = e;
    },
    async loadOptions() {
      this.options = await this.selectOptions(this.field.options, this.field);
    },
    getValueOrFunction(e, t) {
      return Ci(e, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    async selectOptions(e, t) {
      return typeof e == "function" ? await e(this.item, t, this) : e;
    },
    handleChange(e) {
      if (this.optionValue === "object") {
        const t = this.options.find(
          (s) => s.value === this.newitem
        );
        t && this.$emit("update:modelValue", t);
      } else
        this.$emit("update:modelValue", this.newitem);
    }
    // renderOptions(items, valueField, labelField) {
    //   let options = [];
    //   if (!items || !items.length) {
    //     return [];
    //   }
    //   for (let item of items) {
    //     options.push({
    //       value: item[valueField],
    //       label: item[labelField] ? item[labelField] : item[valueField],
    //     });
    //   }
    //   return options;
    // },
    // arrayAddNewItem(field, item) {
    //   if (!item[field.name] || typeof item[field.name] !== "object") {
    //     item[field.name] = [];
    //   }
    //   let push = {};
    //   for (let elementKey in field.elements) {
    //     let element = field.elements[elementKey];
    //     push[elementKey] = element.value;
    //     element.value = undefined;
    //   }
    //   item[field.name].push(push);
    // },
    // arrayRemoveItem(array, index) {
    //   array.splice(index, 1);
    // },
    // arrayItemMoveUp(array, index) {
    //   arrayItemMoveUp(array, index);
    // },
    // arrayItemMoveDown(array, index) {
    //   arrayItemMoveDown(array, index);
    // },
  },
  components: {}
}, wN = EN, TN = ["name", "id", "disabled", "readonly", "required"], AN = ["value"];
function NN(e, t, s, n, i, r) {
  return K((g(), m("select", {
    class: S(["form-select", e.getValueOrFunction(e.field.inputclass ? e.field.inputclass : "", { field: e.field, item: e.item })]),
    name: e.field.name,
    id: e.formId + "_" + e.field.name,
    onChange: t[0] || (t[0] = (o) => e.handleChange(o)),
    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.newitem = o),
    disabled: e.field.disabled,
    readonly: e.field.readonly,
    required: e.field.required
  }, [
    (g(!0), m(F, null, W(e.options, (o) => (g(), m("option", {
      class: S(e.getValueOrFunction(e.field.optionclass ? e.field.optionclass : "", { field: e.field, item: e.item, option: o })),
      key: o,
      value: o.value
    }, O(o.label ? o.label : o.value), 11, AN))), 128))
  ], 42, TN)), [
    [De, e.newitem]
  ]);
}
const jh = /* @__PURE__ */ ue(wN, [["render", NN]]), ON = {
  props: {
    modelValue: Array,
    field: Object,
    item: Object,
    settings: Object,
    formId: String
  },
  data: function() {
    return {
      value: []
    };
  },
  created() {
  },
  mounted() {
  },
  watch: {
    modelValue(e) {
      this.value = e, (!this.value || typeof this.value != "object") && (this.value = []);
    }
  },
  methods: {
    getValueOrFunction(e, t) {
      return Ci(e, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    selectOptions(e, t) {
      return typeof e == "function" ? e(this.item, t, this) : e;
    },
    // renderOptions(items, valueField, labelField) {
    //   let options = [];
    //   if (!items || !items.length) {
    //     return [];
    //   }
    //   for (let item of items) {
    //     options.push({
    //       value: item[valueField],
    //       label: item[labelField] ? item[labelField] : item[valueField],
    //     });
    //   }
    //   return options;
    // },
    arrayAddNewItem(e, t) {
      let s = {};
      for (let n in e.elements) {
        let i = Object.assign({}, e.elements[n]), r = i.value ? i.value : null;
        if (r != null)
          s[n] = r;
        else
          return;
      }
      this.value.push(s), this.$emit("update:modelValue", this.value);
      for (let n in e.elements)
        e.elements[n].value = null;
    },
    arrayRemoveItem(e, t) {
      e.splice(t, 1);
    },
    arrayItemMoveUp(e, t) {
      Ad(e, t);
    },
    arrayItemMoveDown(e, t) {
      Nd(e, t);
    }
  },
  components: {
    VuAdminFormSelect: jh
  }
}, kN = ON, CN = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, SN = { class: "col-10" }, LN = { class: "row g-1 d-flex align-items-center justify-content-between" }, IN = { class: "col-10" }, xN = { class: "row g-1 d-flex align-items-center justify-content-between" }, $N = ["innerHTML"], RN = {
  key: 1,
  class: "input-group input-group-sm"
}, MN = ["type", "required", "placeholder", "onUpdate:modelValue"], DN = { class: "col-2 text-nowrap text-end" }, qN = ["onClick"], BN = ["onClick"], PN = ["onClick"], jN = { key: 0 }, VN = { class: "row g-1 d-flex align-items-center justify-content-between" }, UN = { class: "col-10" }, FN = { class: "row g-1 d-flex align-items-center justify-content-between" }, HN = { class: "input-group input-group-sm" }, zN = {
  key: 0,
  class: "input-group-text"
}, WN = ["type", "placeholder", "onUpdate:modelValue"], KN = {
  key: 3,
  class: "input-group-text"
}, GN = { class: "col-2" };
function YN(e, t, s, n, i, r) {
  const o = qe("VuAdminFormSelect");
  return g(), m("div", null, [
    f("div", CN, [
      f("div", SN, [
        f("div", LN, [
          (g(!0), m(F, null, W(e.field.elements, (l) => (g(), m("div", {
            key: l,
            class: S(l.class || "col")
          }, [
            f("small", null, O(l.placeholder ? l.placeholder : l.prefix ? l.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = f("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (g(!0), m(F, null, W(e.value, (l, a) => (g(), m("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: a
    }, [
      f("div", IN, [
        f("div", xN, [
          (g(!0), m(F, null, W(l, (u, h) => (g(), m("div", {
            key: h,
            class: S(e.field.elements[h].class || "col")
          }, [
            e.field.elements[h].template ? (g(), m("span", {
              key: 0,
              innerHTML: e.getValueOrFunction(e.field.elements[h].template, e.value[a])
            }, null, 8, $N)) : (g(), m("div", RN, [
              e.field.elements[h].type == "select" && e.value[a][h] ? (g(), ns(o, {
                key: 0,
                modelValue: e.value[a][h],
                "onUpdate:modelValue": (d) => e.value[a][h] = d,
                field: e.field.elements[h],
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : K((g(), m("input", {
                key: 1,
                type: e.field.elements[h].type,
                required: e.field.elements[h].required,
                placeholder: e.field.elements[h].placeholder || h,
                class: "form-control",
                "onUpdate:modelValue": (d) => e.value[a][h] = d
              }, null, 8, MN)), [
                [ye, e.value[a][h]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      f("div", DN, [
        e.field.sortable ? (g(), m("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => e.arrayItemMoveUp(e.value, a)
        }, t[2] || (t[2] = [
          f("i", { class: "bi bi-arrow-up" }, null, -1)
        ]), 8, qN)) : T("", !0),
        e.field.sortable ? (g(), m("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => e.arrayItemMoveDown(e.value, a + 1)
        }, t[3] || (t[3] = [
          f("i", { class: "bi bi-arrow-down" }, null, -1)
        ]), 8, BN)) : T("", !0),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (u) => e.arrayRemoveItem(e.value, a)
        }, t[4] || (t[4] = [
          f("i", { class: "bi bi-trash" }, null, -1)
        ]), 8, PN)
      ])
    ]))), 128)),
    e.item[e.field.name] && e.item[e.field.name].length ? (g(), m("hr", jN)) : T("", !0),
    f("div", VN, [
      f("div", UN, [
        f("div", FN, [
          (g(!0), m(F, null, W(e.field.elements, (l) => (g(), m("div", {
            key: l,
            class: S(l.class || "col")
          }, [
            f("div", HN, [
              l.prefix ? (g(), m("span", zN, O(l.prefix), 1)) : T("", !0),
              l.type == "select" && (!l.relation || l.relation && l.relation.items) ? (g(), ns(o, {
                key: 1,
                modelValue: l.value,
                "onUpdate:modelValue": (a) => l.value = a,
                field: l,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : K((g(), m("input", {
                key: 2,
                type: l.type,
                placeholder: l.placeholder || l.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (a) => l.value = a
              }, null, 8, WN)), [
                [ye, l.value]
              ]),
              l.suffix ? (g(), m("span", KN, O(l.suffix), 1)) : T("", !0)
            ]),
            T("", !0)
          ], 2))), 128))
        ])
      ]),
      f("div", GN, [
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-primary my-1 w-100",
          onClick: t[0] || (t[0] = (l) => e.arrayAddNewItem(e.field, e.item))
        }, t[5] || (t[5] = [
          f("i", { class: "bi bi-plus" }, null, -1)
        ]))
      ])
    ])
  ]);
}
const XN = /* @__PURE__ */ ue(kN, [["render", YN]]), ZN = {
  props: {
    modelValue: Object,
    group: Object,
    formId: String,
    settings: Object
  },
  data: function() {
    return {
      item: {}
    };
  },
  created() {
  },
  mounted() {
    this.item = this.modelValue;
  },
  watch: {
    modelValue(e) {
      this.item = this.modelValue;
    }
  },
  methods: {
    getValueOrFunction(e, t) {
      return Ci(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return Si(e, this.settings.translate, t, s || this.settings.language);
    },
    selectOptions(e, t) {
      return typeof e == "function" ? e(this.item, t, this) : e;
    },
    renderOptions(e, t, s) {
      let n = [];
      if (!e || !e.length)
        return [];
      for (let i of e)
        n.push({
          value: i[t],
          label: i[s] ? i[s] : i[t]
        });
      return n;
    },
    arrayAddNewItem(e, t) {
      (!t[e.name] || typeof t[e.name] != "object") && (t[e.name] = []);
      let s = {};
      for (let n in e.elements) {
        let i = e.elements[n];
        s[n] = i.value, i.value = void 0;
      }
      t[e.name].push(s);
    },
    arrayRemoveItem(e, t) {
      e.splice(t, 1);
    },
    arrayItemMoveUp(e, t) {
      Ad(e, t);
    },
    arrayItemMoveDown(e, t) {
      Nd(e, t);
    },
    insertAddress(e) {
      this.item[e] || (this.item[e] = []), this.item[e].push({
        country: void 0,
        zipcode: void 0,
        city: void 0,
        street_name: void 0,
        street_type: void 0,
        house_number: void 0
      });
    }
  },
  components: {
    HtmlEditor: Qw,
    FileUpload: _N,
    VuAdminFormSelect: jh,
    VuAdminFormList: XN
  }
}, QN = ZN, JN = { class: "row m-1" }, tO = ["innerHTML"], eO = {
  key: 1,
  class: "row"
}, sO = { class: "form-group pb-3" }, nO = { key: 0 }, iO = {
  key: 0,
  class: "badge text-secondary fw-light"
}, rO = ["for", "innerHTML"], oO = {
  key: 1,
  class: "input-group"
}, aO = ["innerHTML"], lO = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], cO = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "disabled", "readonly", "required"], uO = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "disabled", "readonly", "required"], dO = {
  key: 4,
  class: "form-check"
}, hO = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "disabled", "readonly", "required"], fO = ["for"], pO = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "disabled", "required"], gO = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], mO = ["innerHTML"], bO = { key: 5 }, yO = { key: 0 }, vO = ["for"], _O = ["name", "id", "onUpdate:modelValue"], EO = ["onClick"], wO = ["innerHTML"], TO = {
  key: 7,
  class: "p-1"
}, AO = ["innerHTML"];
function NO(e, t, s, n, i, r) {
  const o = qe("VuAdminFormSelect"), l = qe("HtmlEditor"), a = qe("FileUpload"), u = qe("VuAdminFormList");
  return g(), m("div", JN, [
    (g(!0), m(F, null, W(e.settings.form.groups, (h) => (g(), m("div", {
      key: h,
      class: S([h.class ? h.class : "col-md-12"])
    }, [
      h.title ? (g(), m("h2", {
        key: 0,
        class: "form-row-title mb-4 fw-lighter",
        innerHTML: h.title ? h.title : ""
      }, null, 8, tO)) : T("", !0),
      e.item && h.fields ? (g(), m("div", eO, [
        (g(!0), m(F, null, W(h.fields, (d) => (g(), m("div", {
          class: S([e.getValueOrFunction(d.class ? d.class : "col-md-12"), "input_type_" + d.type]),
          key: d
        }, [
          f("div", sO, [
            d.label ? (g(), m("span", nO, [
              ["html", "image", "upload"].indexOf(d.type) >= 0 ? (g(), m("label", {
                key: 0,
                class: S([{ required: d.required }, "form-label text-secondary mb-1"])
              }, [
                U(O(d.label ? d.label : e.translate(d.name)) + " ", 1),
                d.maxlength ? (g(), m("span", iO, O(e.item[d.name] ? e.item[d.name].length : 0) + " / " + O(d.maxlength), 1)) : T("", !0)
              ], 2)) : (g(), m("label", {
                key: 1,
                class: S([{ required: d.required }, "form-label text-secondary mb-1"]),
                for: e.formId + "_" + d.name,
                innerHTML: e.getValueOrFunction(d.label ? d.label : e.translate(d.name), { field: d, item: e.item })
              }, null, 10, rO))
            ])) : T("", !0),
            ["html", "image", "list", "addresses", "template"].indexOf(d.type) < 0 ? (g(), m("div", oO, [
              d.prefix ? (g(), m("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(d.prefix, {
                  field: d,
                  item: e.item
                })
              }, null, 8, aO)) : T("", !0),
              d.type == "text" ? K((g(), m("input", {
                key: 1,
                class: S(["form-control", e.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: e.item })]),
                type: "text",
                name: d.name,
                id: e.formId + "_" + d.name,
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                minlength: d.minlength,
                maxlength: d.maxlength,
                placeholder: d.placeholder ? d.placeholder : "",
                disabled: d.disabled,
                readonly: d.readonly,
                required: d.required
              }, null, 10, lO)), [
                [se, e.item[d.name]]
              ]) : T("", !0),
              d.type == "number" ? K((g(), m("input", {
                key: 2,
                class: S(["form-control", e.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: e.item })]),
                type: "number",
                name: d.name,
                id: e.formId + "_" + d.name,
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                min: d.min,
                max: d.max,
                step: d.step,
                placeholder: d.placeholder ? d.placeholder : "",
                disabled: d.disabled,
                readonly: d.readonly,
                required: d.required
              }, null, 10, cO)), [
                [se, e.item[d.name]]
              ]) : T("", !0),
              ["date", "datetime", "datetime-local"].indexOf(d.type) >= 0 ? K((g(), m("input", {
                key: 3,
                class: S(["form-control", e.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: e.item })]),
                type: d.type,
                name: d.name,
                id: e.formId + "_" + d.name,
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                min: d.min,
                max: d.max,
                disabled: d.disabled,
                readonly: d.readonly,
                required: d.required
              }, null, 10, uO)), [
                [ye, e.item[d.name]]
              ]) : T("", !0),
              d.type == "checkbox" ? (g(), m("div", dO, [
                K(f("input", {
                  class: S(["form-check-input", e.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: e.item })]),
                  type: "checkbox",
                  name: d.name,
                  id: e.formId + "_" + d.name,
                  "true-value": d.true != null ? d.true : !0,
                  "false-value": d.false != null ? d.false : !1,
                  "onUpdate:modelValue": (b) => e.item[d.name] = b,
                  disabled: d.disabled,
                  readonly: d.readonly,
                  required: d.required
                }, null, 10, hO), [
                  [Fh, e.item[d.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: e.formId + "_" + d.name
                }, O(d.checkbox), 9, fO)
              ])) : T("", !0),
              d.type == "email" ? K((g(), m("input", {
                key: 5,
                autocomplete: "on",
                class: S(["form-control", e.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: e.item })]),
                type: "email",
                name: d.name,
                id: e.formId + "_" + d.name,
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                minlength: d.minlength,
                maxlength: d.maxlength,
                placeholder: d.placeholder ? d.placeholder : "",
                readonly: d.readonly,
                disabled: d.disabled,
                required: d.required
              }, null, 10, pO)), [
                [se, e.item[d.name]]
              ]) : T("", !0),
              d.type == "select" && (!d.relation || d.relation && d.relation.items) ? (g(), ns(o, {
                key: 6,
                modelValue: e.item[d.name],
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                field: d,
                item: e.item,
                settings: e.settings,
                formId: e.formId
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : T("", !0),
              d.type == "textarea" ? K((g(), m("textarea", {
                key: 7,
                class: S(["form-control", e.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: e.item })]),
                name: d.name,
                id: e.formId + "_" + d.name,
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                rows: d.rows,
                minlength: d.minlength,
                maxlength: d.maxlength,
                placeholder: d.placeholder ? d.placeholder : "",
                disabled: d.disabled,
                readonly: d.readonly,
                required: d.required
              }, "              ", 10, gO)), [
                [se, e.item[d.name]]
              ]) : T("", !0),
              d.suffix ? (g(), m("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(d.suffix, {
                  field: d,
                  item: e.item
                })
              }, null, 8, mO)) : T("", !0)
            ])) : T("", !0),
            d.type == "html" ? (g(), ns(l, {
              key: 2,
              modelValue: e.item[d.name],
              "onUpdate:modelValue": (b) => e.item[d.name] = b,
              class: S([d.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : T("", !0),
            d.type == "image" || d.type == "upload" ? (g(), ns(a, {
              key: 3,
              modelValue: e.item[d.name],
              "onUpdate:modelValue": (b) => e.item[d.name] = b,
              class: S([d.class]),
              field: d,
              settings: e.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : T("", !0),
            d.type == "list" && (!d.relation || d.relation && d.relation.items) ? (g(), ns(u, {
              key: 4,
              modelValue: e.item[d.name],
              "onUpdate:modelValue": (b) => e.item[d.name] = b,
              field: d,
              item: e.item,
              settings: e.settings,
              formId: e.formId
            }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : T("", !0),
            d.type == "addresses" ? (g(), m("span", bO, [
              e.item[d.name] ? (g(), m("div", yO, [
                (g(!0), m(F, null, W(e.item[d.name], (b) => (g(), m("div", { key: b }, [
                  U(O(b) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: e.formId + "_" + d.name
                  }, O(d.label), 9, vO),
                  K(f("input", {
                    class: "form-control",
                    type: "text",
                    name: d.name,
                    id: e.formId + "_" + d.name,
                    "onUpdate:modelValue": (y) => b.country = y
                  }, null, 8, _O), [
                    [se, b.country]
                  ])
                ]))), 128))
              ])) : T("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (b) => e.insertAddress(d.name)
              }, " Add ", 8, EO)
            ])) : T("", !0),
            d.type == "template" ? (g(), m("div", {
              key: 6,
              innerHTML: e.getValueOrFunction(d.template, {
                field: d,
                item: e.item
              })
            }, null, 8, wO)) : T("", !0),
            d.description ? (g(), m("div", TO, [
              f("small", null, [
                f("i", {
                  class: "text-muted",
                  innerHTML: e.getValueOrFunction(d.description, {
                    field: d,
                    item: e.item
                  })
                }, null, 8, AO)
              ])
            ])) : T("", !0)
          ])
        ], 2))), 128))
      ])) : T("", !0)
    ], 2))), 128))
  ]);
}
const OO = /* @__PURE__ */ ue(QN, [["render", NO], ["__scopeId", "data-v-1803ff01"]]), kO = {
  props: {
    modelValue: Object,
    modalWindow: Object,
    saveItem: Function,
    reloadTable: Function,
    fetchRelation: Function,
    group: Object,
    formId: String,
    settings: Object
  },
  data: function() {
    return {
      item: {},
      loaded: !1,
      ui: {
        wait: {
          table: !1,
          form: !1
        },
        block: {
          table: !1,
          form: !1
        }
      },
      messages: {
        table: [],
        form: []
      },
      message: {
        table: null,
        form: null
      },
      messageTimeOut: null
    };
  },
  created() {
  },
  mounted() {
    this.item = this.modelValue;
    let e = this.item[this.settings.pkey];
    this.fetchItem(e, this.settings);
  },
  watch: {
    modelValue(e) {
      this.item = this.modelValue;
    }
  },
  methods: {
    translate(e, t, s) {
      return Si(e, this.settings.translate, t, s || this.settings.language);
    },
    getValueOrFunction(e, t) {
      return Ci(e, t, this.settings, this);
    },
    formWait(e) {
      this.ui.wait.form = !0, this.ui.block.form = e;
    },
    formNoWait() {
      this.ui.wait.form = !1, this.ui.block.form = !1;
    },
    addFormMessage(e, t, s, n) {
      this.addMessage("form", e, t, s, n);
    },
    addMessage(e, t, s, n, i) {
      clearTimeout(this.messageTimeout);
      const r = Date.now() + Math.random().toString(36).substring(2, 9);
      this.message[e] = {
        uid: r,
        msg: t,
        timeout: s !== void 0 ? s : 2500,
        datetime: (/* @__PURE__ */ new Date()).toLocaleString("hu-HU"),
        priority: n || "secondary",
        details: i
      }, this.messages[e].unshift(this.message[e]), clearTimeout(this.messageTimeOut), this.messageTimeOut = setTimeout(() => {
        this.message[e] = null, this.messages[e].length > 10 && this.messages[e].splice(10);
      }, this.message[e].timeout);
    },
    createItem() {
      this.item = this.settings.form.default ? this.settings.form.default : {}, setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },
    copyItem() {
      this.item[this.settings.pkey] = void 0, setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },
    reloadItem() {
      let e = this.item[this.settings.pkey];
      this.fetchItem(e);
    },
    async fetchItem(e, t) {
      try {
        if (t = t || this.settings, !t.form || !t.form.api)
          return !1;
        this.formWait(!0);
        const s = await fetch(
          ss("GET", t.form.api, e),
          es("GET", t.api)
        ).catch((o) => {
        }), n = await ii(s);
        if (ri(s, n.data, "form") || !n.data)
          return this.formNoWait(), !1;
        t.form.default && (n.data = Object.assign({}, t.form.default, n.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(n.data, s);
        let r;
        t.form.api.input.item ? r = typeof t.form.api.input.item == "string" ? n.data[t.form.api.input.item] : t.form.api.input.item(n.data, s) : r = n.data;
        for (let o of t.form.groups)
          for (let l of o.fields)
            l.relation && t.relations[l.relation.config] && (l.relation = Br(t.relations[l.relation.config], l.relation), await this.fetchRelation(l, [r]));
        this.item = wr(r), this.itemOriginal = Object.assign({}, r), this.loaded = !0, this.formNoWait();
      } catch (s) {
        console.error(s), this.formNoWait();
      }
    },
    async submit() {
      let e = this.$refs.form;
      e.checkValidity() ? this.submitItem() : e.reportValidity();
    },
    async submitAndClose() {
      let e = this.$refs.form;
      e.checkValidity() ? this.submitItem(!0) : e.reportValidity();
    },
    async submitItem(e) {
      this.saveItem(this.item, (t) => {
        let s = {};
        this.settings.form.api.input.item ? s = typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t, response) : s = t, s && (this.addFormMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${s[this.settings.pkey]} )</small>`,
          2500
        ), this.item = wr(s), this.itemOriginal = Object.assign({}, s)), e === !0 && this.modalWindow.hide(), this.reloadTable();
      }, (t) => {
        console.log(t), this.addFormMessage(t.message, 14500, "danger");
      });
    },
    async deleteItem(e, t) {
      try {
        e || (e = this.item);
        let s = e[this.settings.pkey];
        if (!s || !confirm("Are you sure you want to delete this item?"))
          return;
        this.formWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(e);
        const i = await fetch(
          ss(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          es("DELETE", this.settings.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        this.item && (this.item = {}, this.modalWindow.hide());
        const r = await i.json();
        this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(r, i), this.reloadTable(), this.formNoWait();
      } catch (s) {
        console.error(s.message), this.formNoWait();
      }
    },
    formAction(e, t) {
      t.$event && t.$event.stopPropagation();
      let s = e.action ? e.action : e.click ? e.click : null;
      if (s && typeof s != "string") {
        s(t.item, t, this);
        return;
      }
      switch (s) {
        case "FORM_RELOAD":
          if (!this.item[this.settings.pkey])
            return;
          this.reloadItem();
          break;
        case "FORM_NEW":
          this.createItem();
          break;
        case "FORM_COPY":
          this.copyItem();
          break;
        case "FORM_DELETE":
          if (!this.item[this.settings.pkey])
            return;
          this.deleteItem();
          break;
        case "FORM_CLOSE":
          this.modalWindow.hide();
          break;
        case "FORM_SAVE":
          this.submit();
          break;
        case "FORM_SAVE_AND_CLOSE":
          this.submitAndClose();
          break;
      }
    }
  },
  components: {
    VuAdminFormGroup: OO
  }
}, CO = kO, SO = ["id", "data-bs-theme"], LO = { class: "modal-header" }, IO = {
  key: 0,
  class: "modal-title"
}, xO = ["innerHTML"], $O = { key: 1 }, RO = { key: 2 }, MO = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, DO = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, qO = ["innerHTML"], BO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, PO = {
  key: 0,
  class: "modal-header bg-body sticky-top"
}, jO = {
  key: 0,
  class: "d-inline-block m-1"
}, VO = { class: "dropdown d-inline-block" }, UO = ["innerHTML"], FO = { class: "dropdown-menu text-start" }, HO = { class: "me-2 text-muted" }, zO = ["innerHTML"], WO = ["disabled", "onClick"], KO = {
  key: 1,
  class: "dropdown d-inline-block"
}, GO = { class: "mx-1" }, YO = { class: "dropdown-menu px-2" }, XO = ["onClick"], ZO = {
  key: 1,
  class: "modal-body custom-scroll"
}, QO = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, JO = {
  key: 3,
  class: "bg-light text-dark"
};
function tk(e, t, s, n, i, r) {
  const o = qe("VuAdminFormGroup");
  return e.item ? (g(), m("form", {
    key: 0,
    ref: "form",
    id: e.formId,
    class: S(["form", [e.settings.form.class, { wait: e.ui.wait.form }]]),
    onSubmit: t[1] || (t[1] = ft((...l) => e.submitItem && e.submitItem(...l), ["prevent"])),
    "data-bs-theme": [e.settings.theme]
  }, [
    f("div", {
      class: S(["vua-overlay", { blocked: e.ui.block.form }])
    }, null, 2),
    f("div", LO, [
      e.loaded ? (g(), m("h5", IO, [
        e.settings.form.title && typeof e.settings.form.title == "function" ? (g(), m("span", {
          key: 0,
          innerHTML: e.settings.form.title(e.item, e.settings)
        }, null, 8, xO)) : T("", !0),
        e.settings.form.title && typeof e.settings.form.title == "string" ? (g(), m("span", $O, O(e.translate(e.settings.form.title)), 1)) : T("", !0),
        e.settings.form.title ? T("", !0) : (g(), m("span", RO, O(e.translate("Edit")), 1)),
        e.item[e.settings.pkey] ? (g(), m("small", MO, [
          t[2] || (t[2] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          U(" " + O(e.item[e.settings.pkey]), 1)
        ])) : T("", !0)
      ])) : T("", !0),
      e.message.form ? (g(), m("span", DO, [
        f("span", {
          class: S(["text-" + e.message.form.priority])
        }, [
          t[3] || (t[3] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: e.message.form.msg
          }, null, 8, qO)
        ], 2)
      ])) : T("", !0),
      K(f("span", BO, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ls, e.ui.wait.form]
      ]),
      t[5] || (t[5] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    e.item ? (g(), m("div", PO, [
      e.settings.form.control ? (g(), m("div", {
        key: 0,
        class: S(["w-100", e.settings.form.control.class == null ? "d-flex justify-content-center" : e.settings.form.control.class])
      }, [
        e.messages.form.length ? (g(), m("span", jO, [
          f("div", VO, [
            f("button", {
              class: S(["btn btn-sm dropdown-toggle", ["btn-" + e.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: e.messages.form.length + " " + (e.messages.form.length > 1 ? e.translate("messages") : e.translate("message"))
            }, null, 10, UO),
            f("ul", FO, [
              (g(!0), m(F, null, W(e.messages.form, (l) => (g(), m("li", { key: l }, [
                f("span", {
                  class: S(["dropdown-item disabled", ["text-" + l.priority]])
                }, [
                  f("small", HO, O(l.datetime), 1),
                  f("span", {
                    innerHTML: l.msg
                  }, null, 8, zO)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : T("", !0),
        (g(!0), m(F, null, W(e.settings.form.control.buttons, (l) => (g(), m("span", {
          key: l.action
        }, [
          l.dropdowns ? T("", !0) : (g(), m("button", {
            key: 0,
            type: "button",
            disabled: l.disabled !== void 0 ? e.getValueOrFunction(l.disabled, {
              button: l,
              item: e.item,
              form: this
            }) : !1,
            class: S([
              l.class ? l.class : e.getButtonClassByAction(l.action)
            ]),
            onClick: (a) => e.formAction(l, {
              button: l,
              item: e.item,
              form: this,
              $event: a
            })
          }, [
            f("i", {
              class: S([
                l.icon !== void 0 ? e.getValueOrFunction(l.icon, {
                  button: l,
                  item: e.item,
                  form: this
                }) : e.getButtonIconClassByAction(l.action)
              ])
            }, null, 2),
            U(" " + O(e.translate(l.title)), 1)
          ], 10, WO)),
          l.dropdowns ? (g(), m("div", KO, [
            f("button", {
              type: "button",
              class: S([[l.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", GO, [
                f("i", {
                  class: S([
                    l.icon !== void 0 ? e.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : e.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                U(" " + O(e.translate(l.title)), 1)
              ])
            ], 2),
            f("ul", YO, [
              (g(!0), m(F, null, W(l.dropdowns, (a) => (g(), m("li", { key: a }, [
                f("span", {
                  class: S([a.class ? a.class : ""]),
                  onClick: (u) => e.formAction(a, {
                    button: l,
                    item: e.item,
                    form: this,
                    $event: u
                  })
                }, [
                  a.icon ? (g(), m("i", {
                    key: 0,
                    class: S([a.icon])
                  }, null, 2)) : T("", !0),
                  U(" " + O(e.translate(a.title)), 1)
                ], 10, XO)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0)
    ])) : T("", !0),
    e.settings.form ? (g(), m("div", ZO, [
      e.settings.form.visible && e.settings.form.groups ? (g(), ns(o, {
        key: 0,
        modelValue: e.item,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.item = l),
        formid: e.formId,
        settings: e.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : T("", !0)
    ])) : T("", !0),
    e.item ? (g(), m("div", QO)) : T("", !0),
    e.settings.debug > 1 ? (g(), m("pre", JO, "        " + O(e.item) + `
    `, 1)) : T("", !0)
  ], 42, SO)) : T("", !0);
}
const ek = /* @__PURE__ */ ue(CO, [["render", tk], ["__scopeId", "data-v-4016e47a"]]), sk = {
  name: "VuAdminTablePagination",
  emits: ["setPage", "setPageLimit", "translate"],
  props: {
    config: Object,
    settings: Object,
    ui: Object
  },
  methods: {
    setPage(e) {
      this.$emit("setPage", e);
    },
    setPageLimit(e) {
      this.$emit("setPageLimit", e);
    },
    translate(e, t, s) {
      return Si(e, this.settings.translate, t, s || this.settings.language);
    },
    firstDisabled() {
      return this.config.pagination.page <= 1;
    },
    prevDisabled() {
      return this.config.pagination.page <= 1;
    },
    nextDisabled() {
      return this.config.pagination.pages ? this.config.pagination.page + 1 > this.config.pagination.pages : this.config.pagination.items < this.config.pagination.limit;
    },
    lastDisabled() {
      return this.config.pagination.page == this.config.pagination.pages;
    }
  },
  components: {}
}, nk = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, ik = { class: "dropdown d-inline-block m-1" }, rk = { class: "mx-1" }, ok = { key: 0 }, ak = {
  key: 0,
  class: "dropdown-menu text-end"
}, lk = ["onClick"], ck = { class: "ms-2" }, uk = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, dk = {
  key: 1,
  class: "bi bi-circle ms-2"
}, hk = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, fk = { class: "pagination pagination-sm m-1" }, pk = { class: "page-item" }, gk = ["innerHTML"], mk = { class: "page-item" }, bk = ["innerHTML"], yk = ["onClick"], vk = { class: "page-item" }, _k = ["innerHTML"], Ek = {
  key: 0,
  class: "page-item"
}, wk = ["innerHTML"];
function Tk(e, t, s, n, i, r) {
  return s.config.pagination.hidden ? T("", !0) : (g(), m("nav", nk, [
    f("div", null, [
      f("div", ik, [
        f("button", {
          type: "button",
          class: S(["btn btn-sm btn-secondary", { "dropdown-toggle": s.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          K(f("span", rk, [
            f("strong", null, O(s.config.pagination.from) + "-" + O(s.config.pagination.to), 1),
            s.config.pagination.total ? (g(), m("span", ok, " / " + O(s.config.pagination.total), 1)) : T("", !0)
          ], 512), [
            [Ls, s.config.pagination.from > 0]
          ])
        ], 2),
        s.config.pagination.limits ? (g(), m("ul", ak, [
          f("li", null, [
            (g(!0), m(F, null, W(s.config.pagination.limits, (o) => (g(), m("span", {
              class: S(["dropdown-item cursor-pointer", { selected: s.config.pagination.limit == o }]),
              key: o,
              onClick: (l) => r.setPageLimit(o)
            }, [
              f("strong", null, O(o), 1),
              f("small", ck, O(r.translate("row")) + "/" + O(r.translate("page")), 1),
              s.config.pagination.limit == o ? (g(), m("i", uk)) : T("", !0),
              s.config.pagination.limit != o ? (g(), m("i", dk)) : T("", !0)
            ], 10, lk))), 128))
          ])
        ])) : T("", !0)
      ]),
      K(f("div", hk, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ls, s.ui && s.ui.wait.table]
      ])
    ]),
    f("ul", fk, [
      f("li", pk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, gk)
        ], 2)
      ]),
      f("li", mk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(s.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, bk)
        ], 2)
      ]),
      (g(!0), m(F, null, W(s.config.pagination.numbers, (o) => (g(), m("li", {
        key: o,
        class: "page-item"
      }, [
        f("a", {
          class: S(["page-link cursor-pointer", {
            disabled: o > s.config.pagination.pages,
            current: o == s.config.pagination.page
          }]),
          onClick: (l) => r.setPage(o)
        }, O(o), 11, yk)
      ]))), 128)),
      f("li", vk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(s.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, _k)
        ], 2)
      ]),
      s.config.pagination.total ? (g(), m("li", Ek, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(s.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, wk)
        ], 2)
      ])) : T("", !0)
    ])
  ]));
}
const Ak = /* @__PURE__ */ ue(sk, [["render", Tk], ["__scopeId", "data-v-a7fb8960"]]), bu = ol(), Nk = {
  name: "VuAdminTable",
  props: {
    settings: Object,
    auth: Object
  },
  components: {
    VuAdminForm: ek,
    VuAdminTablePagination: Ak
  },
  data() {
    return {
      item: {},
      items: {},
      selected: [],
      // config alá menjen, hogy a localStorage -ba mentsük el ezt is
      details: [],
      // melyik sor van kinyitva
      bulkitem: {},
      bulkinputs: [],
      config: {
        pagination: {
          total: void 0,
          page: 1,
          skip: 0,
          limit: 10,
          limits: [10, 20, 50, 100],
          size: 5,
          items: null,
          pages: null,
          numbers: []
        },
        order: {},
        filter: {},
        orderIndex: 1
      },
      ui: {
        wait: {
          table: !1,
          form: !1
        },
        block: {
          table: !1,
          form: !1
        }
      },
      formId: null,
      formData: null,
      modalId: null,
      modalElement: null,
      modalWindow: null,
      messages: {
        table: [],
        form: []
      },
      message: {
        table: null,
        form: null
      },
      messageTimeOut: null
    };
  },
  created() {
    if (!this.settings.table)
      return !1;
    this.settings.table.pagination && (this.config.pagination = Object.assign(
      {},
      this.config.pagination,
      this.settings.table.pagination
    )), this.setPage(this.config.pagination.page, !1), this.settings.table.order && (this.config.order = Object.assign(
      {},
      this.config.order,
      this.settings.table.order
    )), this.settings.table.header || (this.settings.table.header = {}), this.settings.api || (this.settings.api = {}), this.settings.api = Object.assign(
      {
        url: null,
        input: {},
        output: {},
        options: {}
      },
      this.settings.api
    ), this.settings.table.api || (this.settings.table.api = {}), this.settings.form || (this.settings.form = {}), this.settings.form.api || (this.settings.form.api = {}), this.settings.table.api = Object.assign(
      {},
      this.settings.api,
      this.settings.table.api
    ), this.settings.form.api = Object.assign(
      {},
      this.settings.api,
      this.settings.form.api
    );
    let e = Math.round(Math.random() * 1e5);
    this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e, this.resetTable();
  },
  mounted() {
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Ds(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
      this.settings.form.visible = !1;
    }), this.modalElement.addEventListener("show.bs.modal", (e) => {
      this.settings.form.visible = !0;
    }), this.listenEvent();
  },
  methods: {
    authAndSettings() {
      return this.auth && this.auth.user && this.settings && this.settings.table;
    },
    sendEvent(e, t, s) {
      bu.emit(e + "-" + t, {
        from: this.settings.entity,
        payload: s
      });
    },
    listenEvent() {
      bu.on(`EDIT-${this.settings.entity}`, (e) => {
        this.editItem(e.payload.item);
      });
    },
    tableWait(e) {
      this.ui.wait.table = !0, this.ui.block.table = e;
    },
    tableNoWait() {
      this.ui.wait.table = !1, this.ui.block.table = !1;
    },
    countFilters() {
      return this.settings.table.columns.filter(
        (e) => e.filter && !e.hidden
      ).length;
    },
    resetTable() {
      this.settings.table.pagination && (this.config.pagination.limit = this.settings.table.pagination.limit), this.resetFilter(), this.resetOrder(!0);
    },
    resetFilter(e) {
      if (this.settings.table.columns) {
        for (let t of this.settings.table.columns)
          t.filter && (t.filter.value = t.filter.default_value !== void 0 ? t.filter.default_value : t.filter.multiple ? [] : void 0, t.filter.operator = t.filter.default_operator !== void 0 ? t.filter.default_operator : void 0);
        e && (this.reloadTable(), this.calcPage());
      }
    },
    resetOrder(e) {
      this.settings.table.order ? this.config.order = Object.assign({}, this.settings.table.order) : this.config.order = {}, e && (this.reloadTable(), this.calcPage());
    },
    reloadTable(e) {
      this.fetchTable(e);
    },
    calcPage() {
      if (!(this.config.pagination.items === null || this.config.pagination.items === void 0)) {
        if (this.config.pagination.total !== null && this.config.pagination.total !== void 0 && (this.config.pagination.pages = Math.ceil(
          this.config.pagination.total / this.config.pagination.limit
        )), this.config.pagination.pages !== null) {
          let e = Math.floor((this.config.pagination.size - 1) / 2), t = this.config.pagination.page - e;
          this.config.pagination.page > this.config.pagination.pages && (this.config.pagination.page = this.config.pagination.pages), this.config.pagination.page < 1 && (this.config.pagination.page = 1), t + this.config.pagination.size > this.config.pagination.pages && (t = this.config.pagination.pages - this.config.pagination.size + 1), t < 1 && (t = 1), this.config.pagination.numbers = Array.from(
            { length: this.config.pagination.size },
            (s, n) => t + n
          );
        }
        this.config.pagination.from = this.config.pagination.skip + 1, this.config.pagination.to = this.config.pagination.skip + (this.config.pagination.items !== null ? this.config.pagination.items : this.config.pagination.limit);
      }
    },
    setPage(e, t) {
      t = t !== void 0 ? t : !0, e < 1 && (e = 1), this.config.pagination.pages !== null && this.config.pagination.pages !== void 0 && e > this.config.pagination.pages && (e = this.config.pagination.pages), this.config.pagination.skip = (e - 1) * this.config.pagination.limit, this.config.pagination.page != e && t && (this.config.pagination.page = e, this.reloadTable());
    },
    setPageLimit(e) {
      e != this.config.pagination.limit && (this.config.pagination.limit = e, this.setPage(1), this.calcPage(), this.reloadTable());
    },
    getValueOrFunction(e, t) {
      return Ci(e, t, this.settings, this);
    },
    getButtonClassByAction(e) {
      switch (e) {
        case "TABLE_RESET_ORDERS":
        case "TABLE_RESET_FILTERS":
          return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
        case "TABLE_CLOSE_DETAILS":
          return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
        case "TABLE_ROW_EDIT":
          return "btn btn-sm btn-secondary text-nowrap mx-1";
        case "FORM_SUBMIT":
        case "TABLE_ROW_SAVE":
        case "TABLE_BULK_SAVE":
          return "btn btn-sm btn-primary text-nowrap mx-1";
        case "FORM_DELETE":
        case "TABLE_ROW_DELETE":
        case "TABLE_BULK_DELETE":
          return "btn btn-sm btn-danger text-nowrap mx-1";
        case "TABLE_ROW_DETAIL":
          return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
        case "TABLE_COLUMNS":
          return "btn btn-sm btn-outline-dark text-nowrap mx-1";
        case "TABLE_EXPORT":
          return "btn btn-sm btn-primary text-nowrap mx-1";
        default:
          return "btn btn-sm btn-outline-primary text-nowrap mx-1";
      }
    },
    getButtonIconClassByAction(e) {
      switch (e) {
        case "TABLE_RESET_ORDERS":
        case "TABLE_RESET_FILTERS":
          return "bi bi-x";
        case "TABLE_CLOSE_DETAILS":
          return "bi bi-chevron-compact-up";
        case "TABLE_ROW_EDIT":
          return "bi bi-pencil-square";
        case "FORM_SUBMIT":
        case "TABLE_ROW_SAVE":
        case "TABLE_BULK_SAVE":
          return "bi bi-save";
        case "FORM_DELETE":
        case "TABLE_ROW_DELETE":
        case "TABLE_BULK_DELETE":
          return "bi bi-trash";
        case "TABLE_ROW_DETAIL":
          return "bi bi-chevron-compact-down";
        case "TABLE_COLUMNS":
          return "bi bi-table";
        case "TABLE_EXPORT":
          return "bi bi-download";
        default:
          return "bi bi-question";
      }
    },
    tableCellValue(e, t, s, n) {
      try {
        return e === void 0 || t === void 0 ? void 0 : n.value ? n.value(e, t, s, n) : t[e] !== void 0 || !e.includes(".") ? t[e] : e.split(".").reduce((i, r) => i && i[r], t);
      } catch (i) {
        return i.message;
      }
    },
    tableCellTemplate(e, t, s, n) {
      try {
        return typeof e == "string" ? e : e(t[n.name], t, s, n);
      } catch (i) {
        return i.message;
      }
    },
    tableAction(e, t) {
      t.$event && t.$event.stopPropagation();
      let s = e.action ? e.action : e.click ? e.click : null;
      if (s && typeof s != "string") {
        s(t.item, t, this);
        return;
      }
      switch (s) {
        case "TABLE_ROW_SELECT":
          this.toggleSelected(t.item[this.settings.pkey]);
          break;
        case "TABLE_ROW_DETAIL":
          this.toggleDetail(t.item[this.settings.pkey]);
          break;
        case "TABLE_CLOSE_DETAILS":
          this.details = [];
          break;
        case "TABLE_RESET_ORDERS":
          this.resetOrder(!0);
          break;
        case "TABLE_RESET_FILTERS":
          this.resetFilter(!0);
          break;
        case "TABLE_ROW_EDIT":
          this.editItem(t.item);
          break;
        case "TABLE_ROW_SAVE":
          this.tableRowSave(t.item, e.params);
          break;
        case "FORM_SUBMIT":
          this.saveForm(t.item);
          break;
        case "___save":
          this.saveItem(
            item,
            () => {
              this.addTableMessage(
                this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${t.item[this.settings.pkey]} )</small>`,
                2500
              );
            },
            (n) => {
              this.addTableMessage(n.message, 3500, "danger");
            },
            e.params
          );
          break;
        case "FORM_CREATE":
          this.createItem(t.item, e.params);
          break;
        case "TABLE_ROW_DELETE":
          this.deleteItem(t.item, e.params);
          break;
        case "FORM_DELETE":
          this.deleteItem(t.item, e.params);
          break;
        case "TABLE_RELOAD":
          this.reloadTable(e.params);
          break;
        case "TABLE_EXPORT":
          this.exportTable(e.params);
          break;
      }
    },
    tableBulkAction(e, t, s, n) {
      if (n && n.stopPropagation(), e && typeof e != "string") {
        e(item, this);
        return;
      }
      switch (e) {
        case "TABLE_BULK_SAVE":
          this.saveBulk(() => {
            this.addTableMessage(this.translate("Saved all selected items"), 2500);
          });
          break;
        case "TABLE_BULK_DELETE":
          this.deleteItems(this.selected, (i) => {
            this.selected = [];
          });
          break;
      }
    },
    isSortable(e) {
      return e.sortable === void 0 || e.sortable;
    },
    sortTable(e) {
      if (this.config.order[e.name] && this.config.order[e.name].fixed || !this.isSortable(e))
        return;
      this.config.order[e.name] === void 0 || this.config.order[e.name] === null ? this.config.order[e.name] = {
        dir: "ASC",
        idx: this.config.orderIndex++
      } : this.config.order[e.name].dir === "ASC" ? this.config.order[e.name] = {
        dir: "DESC",
        idx: this.config.orderIndex++
      } : delete this.config.order[e.name], Object.entries(this.config.order).sort(
        (s, n) => s[1].idx - n[1].idx
      ).forEach((s, n) => {
        s[1].idx = n;
      }), this.reloadTable();
    },
    getOrdersForFetch() {
      let e = [], t = !1;
      for (let s of Object.keys(this.config.order))
        t = !0, e[this.config.order[s].idx] = {
          key: s,
          dir: this.config.order[s].dir
        };
      return t ? e : null;
    },
    getFiltersForFetch() {
      let e = {}, t = !1;
      for (let s of this.settings.table.columns)
        s.filter && s.filter.value !== void 0 && (t = !0, e[s.name] = {
          type: s.filter.type,
          value: s.filter.onchange ? s.filter.onchange(s.filter) : s.filter.value,
          operator: s.filter.operator
        });
      return t ? e : null;
    },
    async fetchTableRelations(e) {
      for (let t of this.settings.table.columns)
        if (t.relation && this.settings.relations[t.relation.config]) {
          let s = [];
          t.relation = Br(this.settings.relations[t.relation.config], t.relation);
          for (let n of e)
            n[t.relation.local] && s.push(n[t.relation.local]);
          t.relation.ids = Yb(s), await this.fetchRelation(t, e);
        }
    },
    // getTableRelationsForFetch(callback) {
    //   for (let column of this.settings.table.columns) {
    //     if (
    //       column.relation &&
    //       this.settings.relations[column.relation.entity]
    //     ) {
    //       column.relation = Object.assign({}, this.settings.relations[column.relation.entity], column.relation);
    //       callback(column);
    //     }
    //   }
    // },
    async fetchTable(e) {
      try {
        this.tableWait(!0), e = e || {}, e.filter = this.getFiltersForFetch(), e.order = this.getOrdersForFetch(), this.config.pagination.page !== null && this.config.pagination.page !== void 0 && (e.page = this.config.pagination.page), this.config.pagination.limit !== null && this.config.pagination.limit !== void 0 && (e.limit = this.config.pagination.limit), e.page && e.limit && (e.skip = (e.page - 1) * e.limit);
        let t = await this.fetchItems(this.settings, e, this.config);
        if (t === !1)
          return this.tableNoWait(), !1;
        await this.fetchTableRelations(t), this.items = t, this.tableNoWait();
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger"), this.tableNoWait();
      }
    },
    async fetchItems(e, t, s) {
      e.events && e.events.beforeItemsLoad && e.events.beforeItemsLoad(t, e);
      const n = await fetch(
        ss("GET", e.table.api, null, t),
        es("GET", e.table.api)
      ), i = await ii(n), r = ri(n, i.data);
      if (r) {
        this.handleTableErrors(r);
        return;
      }
      if (i.error) {
        this.handleTableErrors(i.error);
        return;
      }
      e.events && e.events.afterItemsLoad && e.events.afterItemsLoad(i.data, n);
      let o;
      e.table.api.input.items ? o = typeof e.table.api.input.items == "string" ? i.data[e.table.api.input.items] : e.table.api.input.items(i.data, n) : o = i.data, s && (e.table.api.input.total ? s.pagination.total = typeof e.table.api.input.total == "string" ? i.data[e.table.api.input.total] : e.table.api.input.total(i.data, n) : i.data.total && (s.pagination.total = i.data.total), s.pagination.items = o.length, this.calcPage());
      let l = zb(o);
      return this.convertIn(e.table.columns, l), l;
    },
    async fetchRelation(e, t) {
      try {
        let s = e.relation.params ? e.relation.params : {};
        e.relation.columns && (s.columns = JSON.stringify(e.relation.columns));
        let n = {};
        if (e.relation.ids && e.relation.ids.length) {
          let a = (typeof e.relation.ids[0] == "string" ? "text" : "number") === "string" ? "'" + e.relation.ids.join("','") + "'" : e.relation.ids.join(",");
          n[e.relation.foreign] = {
            type: "array",
            value: a,
            operator: "IN"
          };
        }
        s.filter = JSON.stringify(n), Xb(s, {
          column: e
        });
        const i = await fetch(
          ss("GET", e.relation.api, null, s),
          es("GET", e.relation.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        const r = await ii(i);
        if (ri(i, r.data) || !r.data)
          return;
        if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? r.data[e.relation.api.input.items] : e.relation.api.input.items(r.data, i) : e.relation.items = r.data, t && t[0])
          for (let l of t)
            l[e.relation.local] && (l[e.relation.entity] = e.relation.items.find(
              (a, u, h) => a[e.relation.foreign] === l[e.relation.local]
            ));
      } catch (s) {
        console.error(s.message);
      }
    },
    async editItem(e) {
      if (!this.settings.form || !this.settings.form.api)
        return !1;
      this.item = e, this.message.form = null, this.messages.form = [], this.modalWindow.show();
    },
    async deleteItem(e, t) {
      try {
        e || (e = this.item);
        let s = e[this.settings.pkey];
        if (!s || !confirm("Are you sure you want to delete this item"))
          return;
        this.tableWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(e);
        const i = await fetch(
          ss(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          es("DELETE", this.settings.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        let r = this.items.find((l) => l[this.settings.pkey] === s);
        r >= 0 && this.items.splice(r, 1), this.item && (this.item = {});
        const o = await i.json();
        this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(o, i), this.reloadTable();
      } catch (s) {
        console.error(s.message), this.tableNoWait();
      }
    },
    async deleteItems(e, t) {
      try {
        if (!e || !confirm(
          this.translate("Are you sure you want to delete all selected items?")
        ))
          return;
        this.tableWait(!0);
        const n = await fetch(
          ss("DELETE", this.settings.table.api),
          es("DELETE", this.settings.api, {
            body: JSON.stringify({
              ids: e
            })
          })
        );
        if (n.status !== 200)
          throw new Error(
            this.translate("Response status: " + n.status)
          );
        t && t(n), this.reloadTable(), this.tableNoWait();
      } catch (s) {
        console.error(s.message), this.tableNoWait();
      }
    },
    tableRowSave(e, t) {
      this.tableWait(), this.saveItem(e, () => {
        this.tableNoWait(), this.addTableMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${e[this.settings.pkey]} )</small>`,
          2500
        );
      }, (s, n, i, r) => {
        this.tableNoWait(), this.handleTableErrors(s);
      }, t);
    },
    // submitForm(item, onSuccess, onError, urlParams) {
    //   this.formWait(true);
    //   this.saveItem(item, () => {
    //   }, () => {
    //   }, urlParams);
    // },
    handleTableErrors(e) {
      if (console.log(e), e == null)
        return;
      const t = 3500, s = "danger";
      if (typeof e == "string") {
        this.addTableMessage(e, t, s);
        return;
      }
      if (e.length > 0)
        for (let n of e)
          this.addTableMessage(n.message, n.timeout, n.priority);
    },
    handleFormErrors() {
      if (errors == null)
        return;
      const e = 3500, t = "danger";
      if (typeof errors == "string") {
        this.addTableMessage(errors, e, t);
        return;
      }
      if (errors.length > 0)
        for (let s of errors)
          this.addTableMessage(s.message, s.timeout, s.priority);
    },
    getColumnByName(e) {
      return this.settings.table.columns.find((t) => t.name === e);
    },
    // addFilesToFormData(input, formData, formUploads) {
    //   for (let formUpload in formUploads) {
    //     for (let file of input[formUpload]) {
    //       if (!file.uploaded) {
    //         for (let type of Object.keys(file.types)) {
    //           if (file.types[type].blob) {
    //             formData.append(formUpload + '[]', file.types[type].blob, `${file.types[type].slug}.${file.types[type].extension}`);
    //           } else {
    //             formData.append(formUpload + '[]', file, `${file.types[type].slug}.${file.types[type].extension}`);
    //           }
    //           console.log(file);
    //         }
    //       }
    //     }
    //   }
    // },
    createItem() {
      this.item = this.settings.form.default ? this.settings.form.default : {}, this.modalWindow.show(), setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },
    async saveItem(e, t, s, n) {
      try {
        n = n || {};
        let i = {}, r = e[this.settings.pkey];
        if (this.settings.form.api.output && this.settings.form.api.output.fields)
          for (let d in e)
            this.settings.form.api.output.fields.includes(d) && (i[d] = e[d]);
        else
          Object.assign(i, e);
        let o, l;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Wb(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, e), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let d = {};
          d[this.settings.form.api.output.item] = i, o = JSON.stringify(d);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const a = r ? "PUT" : "POST";
        l = await fetch(
          ss(a, this.settings.form.api, r, n),
          es(a, this.settings.form.api, {
            body: o
          })
        );
        const u = await ii(l), h = ri(l, u.data);
        if (h) {
          s && s(h, e, n, l);
          return;
        }
        if (u.error) {
          s && s(u.error, e, n, l);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(u.data, n), t && t(u.data, l);
      } catch (i) {
        s && s(i, e, n);
      }
    },
    async saveBulk(e) {
      try {
        this.tableWait(!0);
        let t = {};
        this.settings.events && this.settings.events.beforeBulkSave && this.settings.events.beforeBulkSave(this.bulkitem);
        for (let r in this.bulkitem)
          this.bulkinputs.indexOf(r) >= 0 && this.settings.table.api.output.fields.includes(r) && (t[r] = this.bulkitem[r]);
        this.convertOut(this.settings.table.columns, [t]);
        const s = await fetch(
          ss("PUT", this.settings.table.api),
          es("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: t,
              ids: this.selected
            })
          })
        ).catch((r) => {
          console.error(r.message), this.addTableMessage(r.message, 3500, "danger", r);
        }), n = await ii(s), i = ri(s, n.data);
        if (this.tableNoWait(), i)
          return;
        e && e(n.data), this.reloadTable();
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger", t), this.tableNoWait();
      }
    },
    countHiddenColumns() {
      return this.settings.table.columns.filter(
        (e) => e.hidden === !0
      ).length;
    },
    toggleColumn(e) {
      e === !0 ? this.settings.table.columns.map((t) => {
        t.hidden = !1;
      }) : e === !1 ? this.settings.table.columns.map((t) => {
        t.hidden = !0;
      }) : e.hidden = !e.hidden;
    },
    toggleSelectedAll() {
      this.selected.length ? this.selected = [] : this.selected = this.items.map((e) => e[this.settings.pkey]);
    },
    toggleSelected(e) {
      let t = this.selected.indexOf(e);
      t >= 0 ? this.selected.splice(t, 1) : this.selected.push(e);
    },
    toggleSelectedRowInPage() {
      if (this.haveSelectedRowInPage())
        for (let e of this.items) {
          let t = this.selected.indexOf(e[this.settings.pkey]);
          t >= 0 && this.selected.splice(t, 1);
        }
      else
        for (let e of this.items)
          this.selected.indexOf(e[this.settings.pkey]) < 0 && this.selected.push(e[this.settings.pkey]);
      this.selected.length || (this.bulkitem = {});
    },
    haveSelectedRowInPage() {
      if (!this.items || !this.items.length)
        return !1;
      for (let e of this.items)
        if (this.selected.indexOf(e[this.settings.pkey]) >= 0)
          return !0;
      return !1;
    },
    toggleDetail(e) {
      let t = this.details.indexOf(e);
      t >= 0 ? this.details.splice(t, 1) : this.details.push(e);
    },
    dropdownSelectToggleOne(e, t) {
      let s = t.value;
      e.multiple ? _d(e.value, s) : e.value = e.value === s ? null : s, this.reloadTable();
    },
    dropdownSelectAll(e, t) {
      Ed(e, t), this.reloadTable();
    },
    dropdownSelectInvert(e, t) {
      wd(e, t), this.reloadTable();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Td(e), this.reloadTable();
    },
    async exportTable(e) {
      try {
        e.limit = this.config.pagination.total ? this.config.pagination.total : 0;
        let t = this.getFiltersForFetch(), s = this.getOrdersForFetch();
        this.selected.length > 0 && (t[this.settings.pkey] = {
          type: "string",
          value: this.selected,
          operator: "in"
        }), e.filter = t, e.order = s;
        let n = await this.fetchItems(this.settings, e, null, () => {
        });
        this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(n);
        let i = Kb(
          n,
          this.settings.table.exports[e.type].fields
        );
        Gb(i, this.settings.entity + ".csv");
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger");
      }
    },
    onRowInputChange(e, t, s, n) {
      !t || !t.input || (t.input.onchange && t.input.onchange(e, t, s), t.input.autosave && (this.tableWait(), this.saveItem(s, () => {
        this.tableNoWait(), this.addTableMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${s[this.settings.pkey]} )</small>`,
          2500
        );
      }, (i, r, o, l) => {
        this.tableNoWait(), this.handleTableErrors(i);
      })));
    },
    onBulkInputChange(e, t, s) {
      !s || !s.input || s.input.onchange && s.input.onchange(e, s);
    },
    ifBulkInputClick(e) {
      let t = this.bulkinputs.indexOf(e.name);
      t < 0 ? this.bulkinputs.push(e.name) : this.bulkinputs.splice(t, 1), this.bulkitem[e.name] === void 0 ? this.bulkitem[e.name] = null : this.bulkitem[e.name] = void 0;
    },
    addTableMessage(e, t, s, n) {
      this.addMessage("table", e, t, s, n);
    },
    addMessage(e, t, s, n, i) {
      clearTimeout(this.messageTimeout);
      const r = Date.now() + Math.random().toString(36).substring(2, 9);
      this.message[e] = {
        uid: r,
        msg: t,
        timeout: s !== void 0 ? s : 2500,
        datetime: (/* @__PURE__ */ new Date()).toLocaleString("hu-HU"),
        priority: n || "secondary",
        details: i
      }, this.messages[e].unshift(this.message[e]), clearTimeout(this.messageTimeOut), this.messageTimeOut = setTimeout(() => {
        this.message[e] = null, this.messages[e].length > 10 && this.messages[e].splice(10);
      }, this.message[e].timeout);
    },
    translate(e, t, s) {
      return Si(e, this.settings.translate, t, s || this.settings.language);
    },
    convertIn(e, t) {
      for (let s of e)
        if (s.convert && s.convert.in)
          for (let n of t)
            n[s.name] = s.convert.in(n[s.name], n, s);
    },
    convertOut(e, t) {
      for (let s of e)
        if (s.convert && s.convert.out)
          for (let n of t)
            n[s.name] = s.convert.out(n[s.name], n, s);
    }
    // getFieldValue(item, fieldPath) {
    //   return {
    //     get: () => this.getNestedValue(item, fieldPath),
    //     set: (value) => this.setNestedValue(item, fieldPath, value),
    //   };
    // },
    // getNestedValue(obj, path) {
    //   return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    // },
    // setNestedValue(obj, path, value) {
    //   const keys = path.split(".");
    //   const lastKey = keys.pop();
    //   const lastObj = keys.reduce((acc, key) => acc && acc[key], obj);
    //   if (lastObj && lastKey) {
    //     this.$set(lastObj, lastKey, value);
    //   }
    // },
  }
}, Ok = ["data-bs-theme"], kk = { class: "vua-table-title" }, Ck = { class: "d-flex align-items-center justify-content-between" }, Sk = { class: "d-inline-block" }, Lk = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, Ik = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, xk = {
  key: 0,
  class: "d-inline-block"
}, $k = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, Rk = ["innerHTML"], Mk = { class: "dropdown d-inline-block" }, Dk = ["innerHTML"], qk = { class: "dropdown-menu text-start" }, Bk = { class: "me-2 text-muted" }, Pk = ["innerHTML"], jk = ["onClick"], Vk = {
  key: 1,
  class: "dropdown d-inline-block"
}, Uk = { class: "mx-1" }, Fk = { key: 0 }, Hk = { class: "dropdown-menu" }, zk = ["onClick"], Wk = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, Kk = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, Gk = { class: "badge text-secondary fw-normal" }, Yk = {
  key: 2,
  class: "dropdown d-inline-block"
}, Xk = { class: "mx-1" }, Zk = { class: "dropdown-menu" }, Qk = ["onClick"], Jk = { class: "vua-table-header" }, tC = ["width"], eC = ["onClick"], sC = ["innerHTML"], nC = {
  key: 0,
  class: "bi bi-arrow-down"
}, iC = {
  key: 1,
  class: "bi bi-arrow-up"
}, rC = { key: 0 }, oC = ["disabled", "onClick"], aC = {
  key: 0,
  class: "vua-table-filter"
}, lC = ["width"], cC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, uC = { class: "bi bi-check-all" }, dC = { class: "bi bi-x-lg" }, hC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, fC = ["onUpdate:modelValue"], pC = ["disabled", "onClick"], gC = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, mC = ["onUpdate:modelValue", "disabled"], bC = { value: "=" }, yC = { value: ">" }, vC = { value: ">=" }, _C = { value: "<" }, EC = { value: "<=" }, wC = ["onUpdate:modelValue", "disabled"], TC = ["value"], AC = ["onUpdate:modelValue", "disabled", "min", "max"], NC = ["disabled", "onClick"], OC = { key: 3 }, kC = {
  key: 0,
  class: "dropdown"
}, CC = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, SC = { class: "dropdown-menu" }, LC = ["onClick"], IC = {
  key: 0,
  class: "bi bi-check-square"
}, xC = {
  key: 1,
  class: "bi bi-square"
}, $C = { key: 0 }, RC = { key: 1 }, MC = ["onClick"], DC = { key: 2 }, qC = ["onClick"], BC = { key: 3 }, PC = ["onClick"], jC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, VC = ["onUpdate:modelValue", "multiple"], UC = ["value"], FC = ["disabled", "onClick"], HC = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, zC = ["onUpdate:modelValue"], WC = { value: "=" }, KC = { value: ">" }, GC = { value: ">=" }, YC = { value: "<" }, XC = { value: "<=" }, ZC = ["onUpdate:modelValue"], QC = ["value"], JC = ["type", "onUpdate:modelValue"], t2 = ["disabled", "onClick"], e2 = ["disabled", "onClick"], s2 = { class: "align-middle" }, n2 = ["data-label", "width", "onClick"], i2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, r2 = ["innerHTML"], o2 = { key: 1 }, a2 = ["innerHTML"], l2 = ["aria-valuenow", "aria-valuemax"], c2 = { key: 0 }, u2 = {
  key: 4,
  class: "input-group input-group-sm"
}, d2 = ["innerHTML"], h2 = ["type", "onChange", "onUpdate:modelValue"], f2 = ["onChange", "onUpdate:modelValue"], p2 = ["value"], g2 = ["innerHTML"], m2 = { key: 5 }, b2 = ["disabled", "onClick"], y2 = ["innerHTML"], v2 = { key: 2 }, _2 = { key: 0 }, E2 = ["colspan"], w2 = { class: "row g-3 align-items-center" }, T2 = { class: "col-form-label" }, A2 = ["type", "onUpdate:modelValue", "onChange"], N2 = ["onUpdate:modelValue", "onChange"], O2 = ["onUpdate:modelValue", "onChange"], k2 = ["value"], C2 = ["innerHTML"], S2 = {
  key: 0,
  class: "bg-light text-dark"
}, L2 = {
  key: 0,
  class: "vua-table-bulk border-info"
}, I2 = ["data-label", "width"], x2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, $2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, R2 = ["type", "disabled", "onChange", "onUpdate:modelValue"], M2 = ["disabled", "onChange", "onUpdate:modelValue"], D2 = ["value"], q2 = ["onClick"], B2 = {
  key: 0,
  class: "bi bi-square text-secondary"
}, P2 = {
  key: 1,
  class: "bi bi-check-square"
}, j2 = { key: 2 }, V2 = ["disabled", "onClick"], U2 = ["innerHTML"], F2 = { key: 2 }, H2 = ["id"], z2 = { class: "modal-dialog modal-xl" }, W2 = { class: "modal-content h-100" };
function K2(e, t, s, n, i, r) {
  const o = qe("VuAdminTablePagination"), l = qe("VuAdminForm");
  return g(), m("div", null, [
    r.authAndSettings() ? (g(), m("div", {
      key: 0,
      class: S(["vua-table-container", [s.settings.class]]),
      "data-bs-theme": [s.settings.theme]
    }, [
      f("div", {
        class: S(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", kk, [
        f("div", Ck, [
          f("div", Sk, [
            s.settings.table.title ? (g(), m("h5", Lk, O(s.settings.table.title), 1)) : T("", !0),
            K(f("div", Ik, t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ls, i.ui.wait.table && s.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (g(), m("div", xk, [
            i.message.table ? (g(), m("small", $k, [
              f("span", {
                class: S(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, Rk)
              ], 2)
            ])) : T("", !0),
            f("div", Mk, [
              f("button", {
                class: S(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, Dk),
              f("ul", qk, [
                (g(!0), m(F, null, W(i.messages.table, (a) => (g(), m("li", { key: a }, [
                  f("span", {
                    class: S(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    f("small", Bk, O(a.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, Pk)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : T("", !0)
        ])
      ]),
      s.settings.table.control ? (g(), m("div", {
        key: 0,
        class: S(["vua-table-control", [s.settings.table.control.class]])
      }, [
        (g(!0), m(F, null, W(s.settings.table.control.buttons, (a) => (g(), m("span", {
          key: a.action
        }, [
          a.action !== "TABLE_COLUMNS" && !a.dropdowns ? (g(), m("button", {
            key: 0,
            type: "button",
            class: S([
              a.class ? a.class : r.getButtonClassByAction(a.action)
            ]),
            onClick: (u) => r.tableAction(a, {
              items: i.items,
              $event: u
            })
          }, [
            f("i", {
              class: S([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            U(" " + O(r.translate(a.title)), 1)
          ], 10, jk)) : T("", !0),
          a.action === "TABLE_COLUMNS" ? (g(), m("div", Vk, [
            f("button", {
              type: "button",
              class: S([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              K(f("span", Uk, [
                f("i", {
                  class: S([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + O(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (g(), m("span", Fk, " ( " + O(r.countHiddenColumns()) + " " + O(r.translate("hidden")) + " ) ", 1)) : T("", !0)
              ], 512), [
                [Ls, s.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", Hk, [
              (g(!0), m(F, null, W(s.settings.table.columns, (u) => (g(), m("li", { key: u }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(u)
                }, [
                  u.hidden ? T("", !0) : (g(), m("i", Wk)),
                  u.hidden ? (g(), m("i", Kk)) : T("", !0),
                  U(" " + O(u.title) + " ", 1),
                  f("small", Gk, O(u.name), 1)
                ], 8, zk)
              ]))), 128)),
              t[16] || (t[16] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (u) => r.toggleColumn(!0))
                }, O(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (u) => r.toggleColumn(!1))
                }, O(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : T("", !0),
          a.dropdowns ? (g(), m("div", Yk, [
            f("button", {
              type: "button",
              class: S([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", Xk, [
                f("i", {
                  class: S([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + O(r.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", Zk, [
              (g(!0), m(F, null, W(a.dropdowns, (u) => (g(), m("li", { key: u }, [
                f("span", {
                  class: S(["dropdown-item cursor-pointer", [u.class]]),
                  onClick: (h) => r.tableAction(u, {
                    items: i.items,
                    $event: h
                  })
                }, [
                  u.icon ? (g(), m("i", {
                    key: 0,
                    class: S([u.icon])
                  }, null, 2)) : T("", !0),
                  U(" " + O(r.translate(u.title)), 1)
                ], 10, Qk)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0),
      s.settings.table ? (g(), m("table", {
        key: 1,
        class: S(["table vua-table mb-0", [s.settings.table.class]])
      }, [
        f("thead", null, [
          f("tr", Jk, [
            (g(!0), m(F, null, W(s.settings.table.columns, (a) => (g(), m("th", {
              class: S(["", [a.header ? a.header.class : ""]]),
              style: ln([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              f("span", {
                class: S(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (u) => r.sortTable(a)
              }, [
                f("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, sC),
                i.config.order[a.name] ? (g(), m("span", {
                  key: 0,
                  class: S(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (g(), m("i", nC)) : T("", !0),
                  i.config.order[a.name].dir === "DESC" ? (g(), m("i", iC)) : T("", !0),
                  U(" " + O(i.config.order[a.name].idx + 1), 1)
                ], 2)) : T("", !0)
              ], 10, eC),
              a.header && a.header.buttons ? (g(), m("span", rC, [
                (g(!0), m(F, null, W(a.header.buttons, (u) => (g(), m("button", {
                  key: u.action,
                  type: "button",
                  disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                  class: S([
                    u.class ? u.class : r.getButtonClassByAction(u.action)
                  ]),
                  onClick: (h) => r.tableAction(u, {
                    items: i.items,
                    $event: h
                  })
                }, [
                  f("i", {
                    class: S([
                      u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                        button: u,
                        column: a,
                        table: this
                      }) : r.getButtonIconClassByAction(u.action)
                    ])
                  }, null, 2),
                  U(" " + O(r.translate(u.title)), 1)
                ], 10, oC))), 128))
              ])) : T("", !0)
            ], 14, tC))), 128))
          ]),
          r.countFilters() ? (g(), m("tr", aC, [
            (g(!0), m(F, null, W(s.settings.table.columns, (a) => (g(), m("th", {
              style: ln([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: S([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (g(), m("div", cC, [
                f("span", {
                  class: S(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (u) => r.toggleSelectedRowInPage())
                }, [
                  K(f("i", uC, null, 512), [
                    [Ls, !r.haveSelectedRowInPage()]
                  ]),
                  K(f("i", dC, null, 512), [
                    [Ls, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : T("", !0),
              a.filter && a.filter.type == "text" ? (g(), m("div", hC, [
                K(f("input", {
                  type: "text",
                  class: S([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onKeyup: t[3] || (t[3] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, fC), [
                  [se, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (g(), m("button", {
                  key: 0,
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[17] || (t[17] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, pC)) : T("", !0)
              ])) : T("", !0),
              a.filter && a.filter.type == "number" ? (g(), m("div", gC, [
                a.filter.operators == !0 ? K((g(), m("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", bC, O(r.translate("=")), 1),
                  f("option", yC, O(r.translate(">")), 1),
                  f("option", vC, O(r.translate(">=")), 1),
                  f("option", _C, O(r.translate("<")), 1),
                  f("option", EC, O(r.translate("<=")), 1)
                ], 40, mC)), [
                  [De, a.filter.operator]
                ]) : T("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? K((g(), m("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), m(F, null, W(a.filter.operators, (u) => (g(), m("option", {
                    key: u,
                    value: u.value
                  }, O(u.label), 9, TC))), 128))
                ], 40, wC)), [
                  [De, a.filter.operator]
                ]) : T("", !0),
                K(f("input", {
                  type: "number",
                  class: S(["form-control", {
                    fixed: a.filter.fixed
                  }]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  disabled: a.filter.fixed,
                  min: a.filter.min,
                  max: a.filter.max,
                  onChange: t[6] || (t[6] = (u) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, AC), [
                  [se, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (g(), m("button", {
                  key: 2,
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[18] || (t[18] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, NC)) : T("", !0)
              ])) : T("", !0),
              a.filter && a.filter.type == "select" ? (g(), m("div", OC, [
                a.filter.dropdown ? (g(), m("div", kC, [
                  f("button", CC, O(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  f("ul", SC, [
                    f("li", null, [
                      (g(!0), m(F, null, W(a.filter.options, (u) => (g(), m("span", {
                        key: u,
                        class: S(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(u.value) >= 0 : a.filter.value === u.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, u)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(u.value) >= 0 : a.filter.value === u.value) ? (g(), m("i", IC)) : (g(), m("i", xC)),
                        U(" " + O(r.translate(u.label ? u.label : u.value)), 1)
                      ], 10, LC))), 128))
                    ]),
                    a.filter.multiple ? (g(), m("li", $C, t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : T("", !0),
                    a.filter.multiple ? (g(), m("li", RC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, O(r.translate("Select all")), 9, MC)
                    ])) : T("", !0),
                    a.filter.multiple ? (g(), m("li", DC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectClear(a.filter.value)
                      }, O(r.translate("Unselect all")), 9, qC)
                    ])) : T("", !0),
                    a.filter.multiple ? (g(), m("li", BC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, O(r.translate("Invert all")), 9, PC)
                    ])) : T("", !0)
                  ])
                ])) : (g(), m("div", jC, [
                  K(f("select", {
                    "onUpdate:modelValue": (u) => a.filter.value = u,
                    onChange: t[8] || (t[8] = (u) => r.reloadTable()),
                    multiple: a.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (g(!0), m(F, null, W(a.filter.options, (u) => (g(), m("option", {
                      key: u,
                      value: u.value
                    }, O(r.translate(u.label ? u.label : u.value)), 9, UC))), 128))
                  ], 40, VC), [
                    [De, a.filter.value]
                  ]),
                  a.filter.buttonx && a.filter.buttonx != !1 ? (g(), m("button", {
                    key: 0,
                    class: S(["btn btn-outline-secondary", {
                      "opacity-25": a.filter.value == null
                    }]),
                    disabled: a.filter.value == null,
                    onClick: (u) => {
                      a.filter.value = void 0, r.reloadTable();
                    }
                  }, t[20] || (t[20] = [
                    f("i", { class: "bi bi-x" }, null, -1)
                  ]), 10, FC)) : T("", !0)
                ]))
              ])) : T("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (g(), m("div", HC, [
                a.filter.operators == !0 ? K((g(), m("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[9] || (t[9] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", WC, O(r.translate("=")), 1),
                  f("option", KC, O(r.translate(">")), 1),
                  f("option", GC, O(r.translate(">=")), 1),
                  f("option", YC, O(r.translate("<")), 1),
                  f("option", XC, O(r.translate("<=")), 1)
                ], 40, zC)), [
                  [De, a.filter.operator]
                ]) : T("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? K((g(), m("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[10] || (t[10] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), m(F, null, W(a.filter.operators, (u) => (g(), m("option", {
                    key: u,
                    value: u.value
                  }, O(r.translate(u.label)), 9, QC))), 128))
                ], 40, ZC)), [
                  [De, a.filter.operator]
                ]) : T("", !0),
                K(f("input", {
                  type: a.filter.type,
                  class: S([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onChange: t[11] || (t[11] = (u) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, JC), [
                  [ye, a.filter.value]
                ]),
                f("button", {
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[21] || (t[21] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, t2)
              ])) : T("", !0),
              a.filter && a.filter.buttons ? (g(), m("span", {
                key: 5,
                class: S(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (g(!0), m(F, null, W(a.filter.buttons, (u) => (g(), m("span", {
                  key: u.action
                }, [
                  f("button", {
                    type: "button",
                    disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                    class: S([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    onClick: (h) => r.tableAction(u, {
                      items: i.items,
                      $event: h
                    })
                  }, [
                    f("i", {
                      class: S([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2),
                    U(" " + O(r.translate(u.title)), 1)
                  ], 10, e2)
                ]))), 128))
              ], 2)) : T("", !0)
            ], 14, lC))), 128))
          ])) : T("", !0)
        ]),
        f("tbody", null, [
          (g(!0), m(F, null, W(this.items, (a, u) => (g(), m(F, {
            key: a.id
          }, [
            f("tr", s2, [
              (g(!0), m(F, null, W(s.settings.table.columns, (h) => (g(), m("td", {
                style: ln([h.hidden ? "display: none" : ""]),
                key: h.name,
                "data-label": h.title ? h.title : r.translate(h.name),
                width: h.width,
                class: S(
                  r.getValueOrFunction(h.class, {
                    column: h,
                    item: a
                  })
                ),
                onClick: (d) => r.tableAction(h, {
                  item: a,
                  index: u,
                  $event: d
                })
              }, [
                h.index ? (g(), m("div", i2, [
                  f("span", {
                    class: S(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[s.settings.pkey]) >= 0
                    }]),
                    innerHTML: u + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, r2)
                ])) : T("", !0),
                !h.template && !h.input && !h.progressbar ? (g(), m("span", o2, O(r.tableCellValue(h.name, a, u, h)), 1)) : T("", !0),
                h.template ? (g(), m("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, u, h)
                }, null, 8, a2)) : T("", !0),
                h.progressbar ? (g(), m("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": a[h.name],
                  "aria-valuemax": h.progressbar.max
                }, [
                  f("div", {
                    class: S(["progress-bar", [h.progressbar.class]]),
                    style: ln({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (g(), m("span", c2, O(a[h.name]), 1)) : T("", !0)
                  ], 6)
                ], 8, l2)) : T("", !0),
                h.input ? (g(), m("div", u2, [
                  h.input.prefix ? (g(), m("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, d2)) : T("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    h.input.type
                  ) >= 0 ? K((g(), m("input", {
                    key: 1,
                    type: h.input.type,
                    class: S(["form-control form-control-sm", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (d) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (d) => a[h.name] = d
                  }, null, 42, h2)), [
                    [ye, a[h.name]]
                  ]) : T("", !0),
                  h.input.type == "select" ? K((g(), m("select", {
                    key: 2,
                    class: S(["form-select form-select-sm pe-0", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (d) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (d) => a[h.name] = d
                  }, [
                    (g(!0), m(F, null, W(h.input.options, (d) => (g(), m("option", {
                      value: d.value,
                      key: d
                    }, O(r.translate(d.label)), 9, p2))), 128))
                  ], 42, f2)), [
                    [De, a[h.name]]
                  ]) : T("", !0),
                  h.input.suffix ? (g(), m("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, g2)) : T("", !0)
                ])) : T("", !0),
                h.buttons ? (g(), m("span", m2, [
                  (g(!0), m(F, null, W(h.buttons, (d) => (g(), m("span", {
                    key: d.action
                  }, [
                    d.hidden ? T("", !0) : (g(), m("button", {
                      key: 0,
                      type: "button",
                      disabled: d.disabled !== void 0 ? r.getValueOrFunction(d.disabled) : null,
                      class: S([
                        d.class ? r.getValueOrFunction(d.class, {
                          button: d,
                          column: h,
                          item: a,
                          table: this
                        }) : r.getButtonClassByAction(d.action)
                      ]),
                      onClick: (b) => r.tableAction(d, {
                        column: h,
                        item: a,
                        index: u,
                        $event: b
                      })
                    }, [
                      d.icon !== null ? (g(), m("i", {
                        key: 0,
                        class: S([
                          d.icon !== void 0 ? r.getValueOrFunction(d.icon, {
                            button: d,
                            column: h,
                            item: a,
                            table: this
                          }) : r.getButtonIconClassByAction(d.action)
                        ])
                      }, null, 2)) : T("", !0),
                      d.template ? (g(), m("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(d.template, a, u, h)
                      }, null, 8, y2)) : (g(), m("span", v2, O(r.translate(d.title)), 1))
                    ], 10, b2))
                  ]))), 128))
                ])) : T("", !0)
              ], 14, n2))), 128))
            ]),
            s.settings.table.details && i.details.indexOf(a[s.settings.pkey]) >= 0 ? (g(), m("tr", _2, [
              f("td", {
                class: S([s.settings.table.details.class]),
                colspan: s.settings.table.columns.length
              }, [
                (g(!0), m(F, null, W(s.settings.table.details.fields, (h) => (g(), m("div", {
                  class: "m-0",
                  key: h
                }, [
                  f("div", w2, [
                    f("div", {
                      class: S(["col text-end", [h.class]])
                    }, [
                      f("label", T2, O(h.label), 1)
                    ], 2),
                    f("div", {
                      class: S(["col", [h.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(h.input.type) < 0 ? K((g(), m("input", {
                        key: 0,
                        type: h.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, null, 40, A2)), [
                        [ye, a[h.name]]
                      ]) : T("", !0),
                      h.input.type == "textarea" ? K((g(), m("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, `\r
                    `, 40, N2)), [
                        [se, a[h.name]]
                      ]) : T("", !0),
                      h.input.type == "select" ? K((g(), m("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, [
                        (g(!0), m(F, null, W(h.input.options, (d) => (g(), m("option", {
                          value: d.value,
                          key: d
                        }, O(r.translate(d.label)), 9, k2))), 128))
                      ], 40, O2)), [
                        [De, a[h.name]]
                      ]) : T("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: s.settings.table.details.raw(a)
                }, null, 8, C2),
                s.settings.debug > 1 ? (g(), m("pre", S2, "                  " + O(a) + `
                `, 1)) : T("", !0)
              ], 10, E2)
            ])) : T("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (g(), m("tr", L2, [
            (g(!0), m(F, null, W(s.settings.table.columns, (a) => (g(), m("td", {
              style: ln([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: S(a.class)
            }, [
              a.index ? (g(), m("div", x2, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (u) => r.toggleSelectedAll())
                }, O(i.selected.length), 1)
              ])) : T("", !0),
              a.input && a.bulk && a.bulk.enabled ? (g(), m("div", $2, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? K((g(), m("input", {
                  key: 0,
                  type: a.input.type,
                  class: S(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, null, 42, R2)), [
                  [ye, i.bulkitem[a.name]]
                ]) : T("", !0),
                a.input.type == "select" ? K((g(), m("select", {
                  key: 1,
                  class: S(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, [
                  (g(!0), m(F, null, W(a.input.options, (u) => (g(), m("option", {
                    value: u.value,
                    key: u
                  }, O(r.translate(u.label)), 9, D2))), 128))
                ], 42, M2)), [
                  [De, i.bulkitem[a.name]]
                ]) : T("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (u) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (g(), m("i", B2)) : (g(), m("i", P2))
                ], 8, q2)
              ])) : T("", !0),
              a.bulk ? (g(), m("span", j2, [
                (g(!0), m(F, null, W(a.bulk.buttons, (u) => (g(), m("span", {
                  key: u.action
                }, [
                  f("button", {
                    type: "button",
                    class: S([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    disabled: u.action === "save" && !this.bulkinputs.length,
                    onClick: (h) => r.tableBulkAction(u.action, i.bulkitem, a, h)
                  }, [
                    u.icon !== null ? (g(), m("i", {
                      key: 0,
                      class: S([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2)) : T("", !0),
                    u.template ? (g(), m("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(u.template, i.bulkitem, null, a)
                    }, null, 8, U2)) : (g(), m("span", F2, O(r.translate(u.title)), 1))
                  ], 10, V2)
                ]))), 128))
              ])) : T("", !0)
            ], 14, I2))), 128))
          ])) : T("", !0)
        ])
      ], 2)) : T("", !0),
      yu(o, {
        settings: s.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"])
    ], 10, Ok)) : T("", !0),
    f("div", {
      class: "modal shadow",
      id: i.modalId,
      tabindex: "-1"
    }, [
      f("div", z2, [
        f("div", W2, [
          s.settings.form.visible && s.settings.form.groups ? (g(), ns(l, {
            key: 0,
            modelValue: i.item,
            "onUpdate:modelValue": t[14] || (t[14] = (a) => i.item = a),
            formid: i.formId,
            settings: s.settings,
            modalWindow: i.modalWindow,
            saveItem: r.saveItem,
            deleteItem: r.deleteItem,
            reloadTable: r.reloadTable,
            fetchRelation: r.fetchRelation
          }, null, 8, ["modelValue", "formid", "settings", "modalWindow", "saveItem", "deleteItem", "reloadTable", "fetchRelation"])) : T("", !0)
        ])
      ])
    ], 8, H2)
  ]);
}
const G2 = /* @__PURE__ */ ue(Nk, [["render", K2], ["__scopeId", "data-v-973beb04"]]), Y2 = {
  name: "VuAdmin",
  props: {
    entity: {
      type: String,
      required: !0
    },
    auth: {
      type: Object
    }
  },
  init: (e) => {
  },
  data() {
    return {
      settings: void 0,
      defaults: {
        // primary id field name
        // required, default : undefined
        pkey: "id",
        // Boostrap theme
        // optional, default : 'light'
        theme: void 0,
        // VU Admin container class
        // optional, default : null
        class: "my-1 p-3 rounded",
        // must be function and called once for update entity settings
        // example prepare options for selects, (settings) => {},
        init: null,
        language: document.documentElement ? document.documentElement.lang : "hu",
        api: {
          auth: void 0,
          options: {},
          input: {
            // when item is null -> item = response.data
            // when item is a string -> item = response.data[input.item]
            // when item is a function -> item = input.item(data, response)
            item: void 0,
            // when items is null -> items = response.data
            // when items is a string -> items = response.data[input.items]
            // when items is a function -> items = input.items(data, response)
            items: void 0,
            // when total is a string -> total = response.data[input.total]
            // when total is a function -> total = input.total(data, response)
            total: void 0
          },
          output: {
            item: void 0,
            flatten: !0,
            fields: void 0
          }
        },
        translate: {
          hu: {
            Columns: "Oszlopok",
            All: "Mind",
            page: "oldal",
            row: "sor",
            hidden: "rejtett",
            First: "Első",
            Next: "Következő",
            Prev: "Előző",
            Last: "Utolsó",
            Reload: "Újratöltés",
            New: "Új",
            Active: "Aktív",
            Deleted: "Törölt",
            Copy: "Másolás",
            Delete: "Törlés",
            Close: "Bezár",
            Save: "Mentés",
            Send: "Küldés",
            Export: "Exportálás",
            "Select all": "Mind kiválaszt",
            "Unselect all": "Mind töröl",
            "Invert all": "Kijelölések megfordítása",
            "Visible all": "Mind látható",
            "Hidden all": "Mind rejtett",
            "Save and close": "Ment és bezár",
            "=": "Egyenlő",
            ">": "Nagyobb",
            ">=": "Nagyobb vagy egyenlő",
            "<": "Kisebb",
            "<=": "Kisebb vagy egyenlő",
            "Are you sure you want to delete all selected items?": "Biztos hogy törölni akarod az összes kiválasztott elemet?"
          }
        },
        events: {
          // init
          afterSettingsInit: void 0,
          // items
          beforeItemsLoad: void 0,
          afterItemsLoad: void 0,
          // item
          afterItemLoad: void 0,
          beforeItemSave: void 0,
          afterItemSave: void 0,
          beforeItemDelete: void 0,
          afterItemDelete: void 0,
          // bulk
          beforeBulkSave: void 0,
          afterBulkSave: void 0,
          // export
          beforeItemsExport: void 0
        },
        // define relations
        relations: {},
        // define table
        table: {
          title: null,
          columns: [],
          pagination: {
            size: 10,
            limit: 10,
            limits: [10, 20, 50, 100]
          },
          order: {},
          control: {},
          details: {},
          exports: {}
        },
        form: {}
      }
    };
  },
  created() {
    if (window.VuEntities && window.VuEntities[this.entity]) {
      if (this.settings = Br(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
        const e = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = e || "light";
      }
      this.settings.auth = this.auth, this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.2.58"), console.log(`Entity config (${this.entity}) initialized`), this.settings.debug > 1 && console.log(this.settings));
    } else
      console.log("vu-admin ", "1.2.58"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: G2
  }
}, X2 = Y2, Z2 = { key: 0 }, Q2 = ["data-bs-theme"];
function J2(e, t, s, n, i, r) {
  const o = qe("vu-admin-table");
  return e.entity && e.settings ? (g(), m("div", Z2, [
    e.auth ? (g(), m("div", {
      key: 0,
      class: "vu-admin",
      "data-bs-theme": [e.settings.theme]
    }, [
      yu(o, {
        settings: e.settings,
        auth: e.auth
      }, null, 8, ["settings", "auth"])
    ], 8, Q2)) : T("", !0)
  ])) : T("", !0);
}
const tS = /* @__PURE__ */ ue(X2, [["render", J2]]), eS = (e) => {
  const t = new DataView(e);
  let s = "";
  for (let n = 0; n < t.byteLength; n += 4)
    s += t.getUint32(n).toString(16).padStart(8, "0");
  return s;
}, sS = (e) => async (t, { outputFormat: s = "hex" } = {}) => {
  typeof t == "string" && (t = new globalThis.TextEncoder().encode(t));
  const n = await globalThis.crypto.subtle.digest(e, t);
  return s === "hex" ? eS(n) : n;
}, nS = sS("SHA-384");
ol();
const iS = {
  name: "VuAuth",
  props: {
    modelValue: Object,
    api_login: String,
    api_register: String,
    api_password: String,
    settings: Object
  },
  data() {
    return {
      auth: void 0,
      username: "",
      password: "",
      password_again: "",
      recaptchaSiteKey: null,
      // Itt add meg a reCAPTCHA kulcsot
      responseMessage: null,
      captcha: {
        items: ["A", "B", "C", "D", "E"],
        required: "D",
        selected: null
      }
    };
  },
  watch: {
    modelValue(e) {
      this.auth = e;
    }
  },
  methods: {
    checkStorage() {
      this.auth.user = {}, this.auth.token = localStorage.getItem("vu-token"), this.auth.user = JSON.parse(localStorage.getItem("vu-user")), this.$emit("update:modelValue", this.auth);
    },
    async handleSubmit() {
      this.auth.panel == "forgot" && this.handleForgotPasswordSubmit(), this.auth.panel == "registration" && this.handleNewRegistrationSubmit(), this.handleLogin();
    },
    async handleLogin() {
      if (!this.username || !this.password)
        return;
      const e = await fetch(
        this.settings.api.login,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: await this.hashPassword(this.password)
          })
        }
      );
      if (e.ok) {
        const t = await e.json();
        this.userUpdate(t), this.responseOk = !0, this.responseMessage = "Sikeres bejelentkezés", this.settings.onsuccess && (localStorage.setItem("vu-token", t.accessToken), localStorage.setItem("vu-user", JSON.stringify(t)), this.settings.onsuccess(t)), this.close();
      } else
        this.responseOk = !1, this.responseMessage = "Sikertelen bejelentkezés";
    },
    async handleNewRegistrationSubmit() {
      if (!this.username || !this.password || !this.password_again || this.password != this.password_again)
        return;
      const e = await fetch(this.settings.api.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          password: await this.hashPassword(this.password)
        })
      });
      e.ok ? (await e.json(), this.responseOk = !0, this.responseMessage = "Sikeres regisztráció") : (this.responseOk = !1, this.responseMessage = "Sikertelen regisztráció");
    },
    handleForgotPasswordSubmit() {
      console.log("Elfelejtett jelszó e-mail beküldve:", this.email), alert("E-mail elküldve a megadott címre!"), this.reset();
    },
    async hashPassword(e) {
      this.settings.password.hash = this.settings.password.hash === void 0 ? 0 : this.settings.password.hash;
      let t = e;
      for (let s = 0; s < this.settings.password.hash; s++)
        t = await nS(t);
      return t;
    },
    reset() {
      this.password = "", this.password_again = "", this.responseMessage = "", this.responseOk = !1;
    },
    close() {
      this.auth.visible = !1, this.$emit("update:modelValue", this.auth), this.reset();
    },
    toggleClear() {
      this.auth.panel = "login", this.reset();
    },
    toggleForgotPassword() {
      this.auth.panel = this.auth.panel !== "forgot" ? "forgot" : "login", this.reset();
    },
    toggleNewRegistration() {
      this.auth.panel = this.auth.panel !== "registration" ? "registration" : "login", this.reset();
    },
    toggleHelp() {
      this.auth.panel = this.auth.panel !== "help" ? "help" : "login", this.reset();
    },
    toggleType(e) {
      this.settings[e].type = this.settings[e].type != "password" ? "password" : "text", this.$forceUpdate();
    },
    onCaptchaClick() {
      console.log("reCAPTCHA clicked");
    },
    userUpdate(e) {
      this.auth.user = e, this.$emit("update:modelValue", this.auth);
    },
    handleEscapeKey(e) {
      e.key === "Escape" && this.close();
    }
  },
  mounted() {
    if (window.addEventListener("keydown", this.handleEscapeKey), this.recaptchaSiteKey && !document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const e = document.createElement("script");
      e.src = "https://www.google.com/recaptcha/api.js", e.async = !0, e.defer = !0, document.head.appendChild(e);
    }
    this.settings.username.value && (this.username = this.settings.username.value), console.log(this.settings), this.auth || (this.auth = {
      user: void 0,
      success: !1
    }), this.userUpdate(), this.checkStorage(), this.reset();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }
}, rS = iS, oS = {
  key: 0,
  class: "vua-auth position-fixed"
}, aS = { class: "text-center mt-2 mb-4" }, lS = { key: 0 }, cS = { key: 1 }, uS = { key: 2 }, dS = { key: 3 }, hS = { key: 0 }, fS = ["innerHTML"], pS = { class: "d-flex justify-content-between" }, gS = { class: "mb-3" }, mS = {
  for: "username",
  class: "form-label text-primary"
}, bS = { class: "input-group" }, yS = ["type", "placeholder"], vS = ["innerHTML"], _S = { class: "mb-3" }, ES = {
  for: "password",
  class: "form-label text-primary"
}, wS = { class: "input-group" }, TS = ["type", "placeholder", "pattern", "minlength"], AS = {
  key: 0,
  class: "bi bi-eye"
}, NS = {
  key: 1,
  class: "bi bi-eye-slash"
}, OS = ["innerHTML"], kS = {
  key: 0,
  class: "mb-4"
}, CS = {
  for: "password_again",
  class: "form-label text-primary"
}, SS = {
  key: 0,
  class: "text-danger"
}, LS = { class: "input-group" }, IS = ["type", "placeholder", "minlength"], xS = {
  key: 0,
  class: "bi bi-eye"
}, $S = {
  key: 1,
  class: "bi bi-eye-slash"
}, RS = ["innerHTML"], MS = { class: "mb-3 text-center" }, DS = ["data-sitekey"], qS = {
  key: 1,
  class: "mb-3 text-center"
}, BS = {
  key: 2,
  class: "d-flex mb-4"
}, PS = { class: "d-flex justify-content-between" }, jS = {
  key: 0,
  class: "bi bi-person-plus mx-1"
}, VS = {
  key: 1,
  class: "bi bi-arrow-right-square mx-1"
}, US = {
  key: 3,
  class: "mt-3 text-center"
}, FS = ["innerHTML"], HS = { class: "mt-2 text-end" };
function zS(e, t, s, n, i, r) {
  return e.auth && e.auth.visible ? (g(), m("div", oS, [
    f("div", {
      class: "d-flex justify-content-center align-items-center min-vh-100",
      onClick: t[16] || (t[16] = ft((...o) => e.close && e.close(...o), ["stop"]))
    }, [
      f("div", {
        class: "card shadow p-4 position-relative bg-light",
        onClick: t[15] || (t[15] = ft(() => {
        }, ["stop"])),
        style: ln({ "max-width": (e.settings.maxwidth ? e.settings.maxwidth : 400) + "px" }),
        _style: "width: 100%;"
      }, [
        f("button", {
          type: "button",
          class: "btn position-absolute top-0 end-0 p-0 m-2",
          onClick: t[0] || (t[0] = ft((...o) => e.close && e.close(...o), ["stop"]))
        }, t[17] || (t[17] = [
          f("i", { class: "bi bi-x px-1 text-muted" }, null, -1)
        ])),
        f("h1", aS, [
          e.auth.panel == "forgot" ? (g(), m("span", lS, " Elfelejtett jelszó ")) : T("", !0),
          e.auth.panel == "registration" ? (g(), m("span", cS, " Regisztráció ")) : T("", !0),
          e.auth.panel == "help" ? (g(), m("span", uS, " Segítség ")) : T("", !0),
          e.auth.panel == "login" ? (g(), m("span", dS, " Bejelentkezés ")) : T("", !0)
        ]),
        e.auth.panel == "help" ? (g(), m("div", hS, [
          f("div", {
            innerHTML: e.settings.help,
            class: "mb-4"
          }, null, 8, fS),
          f("div", pS, [
            e.auth.panel != "login" ? (g(), m("button", {
              key: 0,
              type: "button",
              onClick: t[1] || (t[1] = ft((...o) => e.toggleClear && e.toggleClear(...o), ["stop"])),
              class: "btn btn-secondary w-100 me-1"
            }, t[18] || (t[18] = [
              f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1),
              U(" Vissza ")
            ]))) : T("", !0)
          ])
        ])) : (g(), m("form", {
          key: 1,
          onSubmit: t[13] || (t[13] = ft((o) => e.handleSubmit(), ["prevent"])),
          onClick: t[14] || (t[14] = ft(() => {
          }, ["stop"]))
        }, [
          f("div", gS, [
            f("label", mS, O(e.settings.username.label), 1),
            f("div", bS, [
              e.settings.username.icon ? (g(), m("span", {
                key: 0,
                class: S(["input-group-text", { "rounded-bottom-0": e.settings.username.help }])
              }, [
                f("i", {
                  class: S([e.settings.username.icon])
                }, null, 2)
              ], 2)) : T("", !0),
              K(f("input", {
                id: "username",
                type: e.settings.username.type,
                "onUpdate:modelValue": t[2] || (t[2] = (o) => e.username = o),
                class: S(["form-control", { "rounded-bottom-0": e.settings.username.help }]),
                placeholder: e.settings.username.placeholder,
                required: ""
              }, null, 10, yS), [
                [ye, e.username]
              ])
            ]),
            e.settings.username.help ? (g(), m("small", {
              key: 0,
              class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
              innerHTML: e.settings.username.help
            }, null, 8, vS)) : T("", !0)
          ]),
          e.auth.panel != "forgot" ? (g(), m(F, { key: 0 }, [
            f("div", _S, [
              f("label", ES, O(e.settings.password.label), 1),
              f("div", wS, [
                e.settings.password.icon ? (g(), m("span", {
                  key: 0,
                  class: S(["input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }])
                }, [
                  f("i", {
                    class: S([e.settings.password.icon])
                  }, null, 2)
                ], 2)) : T("", !0),
                K(f("input", {
                  id: "password",
                  type: e.settings.password.type,
                  "onUpdate:modelValue": t[3] || (t[3] = (o) => e.password = o),
                  class: S(["form-control", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                  placeholder: e.settings.password.placeholder,
                  pattern: e.settings.password.pattern,
                  minlength: e.auth.panel == "registration" ? e.settings.password.minlength : 1,
                  required: ""
                }, null, 10, TS), [
                  [ye, e.password]
                ]),
                e.auth.panel == "registration" ? (g(), m("span", {
                  key: 1,
                  class: S(["input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }])
                }, [
                  f("small", {
                    class: S(["", {
                      "text-success": e.password.length >= e.settings.password.minlength,
                      "text-danger": e.password.length < e.settings.password.minlength
                    }])
                  }, O(e.password.length), 3)
                ], 2)) : T("", !0),
                f("span", {
                  class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                  onClick: t[4] || (t[4] = ft((o) => e.toggleType("password"), ["stop"]))
                }, [
                  e.settings.password.type == "password" ? (g(), m("i", AS)) : (g(), m("i", NS))
                ], 2)
              ]),
              e.auth.panel == "registration" && e.settings.password.help ? (g(), m("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                innerHTML: e.settings.password.help
              }, null, 8, OS)) : T("", !0)
            ]),
            e.auth.panel === "registration" ? (g(), m("div", kS, [
              f("label", CS, [
                U(O(e.settings.password_again.label) + " ", 1),
                e.password_again.length > 0 && e.password_again != e.password ? (g(), m("small", SS, " ( a két jelszó nem egyezik ) ")) : T("", !0)
              ]),
              f("div", LS, [
                e.settings.password.icon ? (g(), m("span", {
                  key: 0,
                  class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                }, [
                  f("i", {
                    class: S([e.settings.password_again.icon])
                  }, null, 2)
                ], 2)) : T("", !0),
                K(f("input", {
                  id: "password_again",
                  type: e.settings.password_again.type,
                  "onUpdate:modelValue": t[5] || (t[5] = (o) => e.password_again = o),
                  class: S(["form-control", { "rounded-bottom-0": e.settings.password_again.help }]),
                  placeholder: e.settings.password_again.placeholder,
                  minlength: e.settings.password.minlength,
                  required: ""
                }, null, 10, IS), [
                  [ye, e.password_again]
                ]),
                f("span", {
                  class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                }, [
                  f("small", {
                    class: S(["", {
                      "text-success": e.password_again.length >= e.settings.password.minlength,
                      "text-danger": e.password_again.length < e.settings.password.minlength
                    }])
                  }, O(e.password_again.length), 3)
                ], 2),
                f("span", {
                  class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password_again.help }]),
                  onClick: t[6] || (t[6] = ft((o) => e.toggleType("password_again"), ["stop"]))
                }, [
                  e.settings.password_again.type == "password" ? (g(), m("i", xS)) : (g(), m("i", $S))
                ], 2)
              ]),
              e.auth.panel == "registration" && e.settings.password_again.help ? (g(), m("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                innerHTML: e.settings.password_again.help
              }, null, 8, RS)) : T("", !0)
            ])) : T("", !0),
            f("div", MS, [
              f("div", {
                class: "g-recaptcha",
                "data-sitekey": e.recaptchaSiteKey,
                onClick: t[7] || (t[7] = ft((...o) => e.onCaptchaClick && e.onCaptchaClick(...o), ["stop"]))
              }, null, 8, DS)
            ])
          ], 64)) : T("", !0),
          e.auth.panel == "login" ? (g(), m("div", qS, [
            f("button", {
              type: "button",
              class: "btn btn-link p-0 text-decoration-none text-nowrap",
              onClick: t[8] || (t[8] = ft((...o) => e.toggleForgotPassword && e.toggleForgotPassword(...o), ["stop"]))
            }, " Elfelejtetted a jelszavad? "),
            e.settings.help ? (g(), m("button", {
              key: 0,
              type: "button",
              class: "btn btn-link p-0 text-decoration-none text-nowrap",
              onClick: t[9] || (t[9] = ft((...o) => e.toggleHelp && e.toggleHelp(...o), ["stop"]))
            }, " Segítségre van szükséged? ")) : T("", !0)
          ])) : T("", !0),
          e.auth.panel == "forgot" ? (g(), m("div", BS, t[19] || (t[19] = [
            f("small", { class: "text-muted" }, " A megadott e-mail címre ( amennyiben az szerepel az adatbázisunkban ) egy levelet küldünk, melyben az új jelszó igénylése linkre kattintva egy weboldalra jutsz. Ott tudod megadni az új jelszavadat. Az e-mailben szereplő link csak 1 óráig érvényes. ", -1)
          ]))) : T("", !0),
          f("div", PS, [
            e.auth.panel != "login" ? (g(), m("button", {
              key: 0,
              type: "button",
              onClick: t[10] || (t[10] = ft((...o) => e.toggleClear && e.toggleClear(...o), ["stop"])),
              class: "btn btn-secondary w-100 me-2 text-nowrap"
            }, t[20] || (t[20] = [
              f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1),
              U(" Bejelentkezés ")
            ]))) : T("", !0),
            e.auth.panel == "login" ? (g(), m("button", {
              key: 1,
              type: "button",
              class: "btn btn-warning w-100 me-2 text-nowrap",
              onClick: t[11] || (t[11] = ft((...o) => e.toggleNewRegistration && e.toggleNewRegistration(...o), ["stop"]))
            }, t[21] || (t[21] = [
              f("i", { class: "bi bi-person-plus mx-1" }, null, -1),
              U(" Regisztráció ")
            ]))) : T("", !0),
            f("button", {
              type: "submit",
              class: S(["btn w-100 text-nowrap", { "btn-primary": e.auth.panel != "registration", "btn-warning": e.auth.panel == "registration" }])
            }, [
              U(O(e.auth.panel == "forgot" ? "Új jelszó kérése" : e.auth.panel == "registration" ? "Regisztráció" : "Bejelentkezés") + " ", 1),
              e.auth.panel == "registration" ? (g(), m("i", jS)) : (g(), m("i", VS))
            ], 2)
          ]),
          e.responseMessage ? (g(), m("div", US, [
            f("div", {
              class: S({ "text-danger": !e.responseOk, "text-success": e.responseOk }),
              innerHTML: e.responseMessage
            }, null, 10, FS)
          ])) : T("", !0),
          f("div", HS, [
            f("button", {
              type: "button",
              onClick: t[12] || (t[12] = ft((...o) => e.close && e.close(...o), ["stop"])),
              class: "btn btn-light border w-100 me-1"
            }, t[22] || (t[22] = [
              f("i", { class: "bi bi-x-square mx-1" }, null, -1),
              U(" Mégsem ")
            ]))
          ])
        ], 32))
      ], 4)
    ])
  ])) : T("", !0);
}
const WS = /* @__PURE__ */ ue(rS, [["render", zS], ["__scopeId", "data-v-aa439406"]]);
ol();
const KS = {
  name: "VuUserButton",
  props: {
    modelValue: Object,
    settings: Object
  },
  data() {
    return {
      auth: void 0
    };
  },
  watch: {
    modelValue(e) {
      this.auth = e || void 0;
    }
  },
  computed: {
    // user: {
    //     get() {
    //         return this.modelValue;
    //     },
    //     set(newValue) {
    //         this.$emit("update:modelValue", newValue);
    //     },
    // },
  },
  methods: {
    updateAuth() {
      this.$emit("update:modelValue", this.auth);
    },
    togglePanel() {
      this.auth.visible = !this.auth.visible, this.auth.panel = this.settings.panel ? this.settings.panel : "login", this.updateAuth();
    },
    logout() {
      this.auth.visible = !1, this.auth.user = null, localStorage.removeItem("vu-token"), localStorage.removeItem("vu-user"), this.updateAuth();
    }
  },
  mounted() {
  }
}, GS = KS, YS = {
  key: 0,
  class: "d-inline-block"
}, XS = {
  key: 0,
  class: "dropdown"
}, ZS = ["src"], QS = {
  class: "dropdown-menu dropdown-menu-end",
  "aria-labelledby": "userDropdown"
}, JS = { class: "dropdown-item text-muted fw-light" }, tL = {
  key: 1,
  class: "d-inline-block"
}, eL = ["innerHTML"];
function sL(e, t, s, n, i, r) {
  return !e.auth || !e.auth.user && e.settings.panel != "login" || e.settings.panel == "login" ? (g(), m("div", YS, [
    e.auth && e.auth.user ? (g(), m("div", XS, [
      f("button", {
        class: S(["dropdown-toggle", [e.settings.class]]),
        type: "button",
        id: "userDropdown",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }, [
        f("img", {
          class: "img-fluid rounded",
          width: "22",
          src: e.auth.user.image
        }, null, 8, ZS),
        U(" " + O(e.auth.user.username), 1)
      ], 2),
      f("ul", QS, [
        f("li", null, [
          f("span", JS, [
            U(O(e.auth.user.firstName) + " " + O(e.auth.user.lastName) + " ", 1),
            t[2] || (t[2] = f("br", null, null, -1)),
            U(" " + O(e.auth.user.email), 1)
          ])
        ]),
        t[4] || (t[4] = f("li", { class: "dropdown-divider" }, null, -1)),
        f("li", null, [
          f("button", {
            type: "button",
            class: "dropdown-item",
            onClick: t[0] || (t[0] = (...o) => e.logout && e.logout(...o))
          }, t[3] || (t[3] = [
            f("i", { class: "bi bi-door-open" }, null, -1),
            U(" Kilépés ")
          ]))
        ])
      ])
    ])) : (g(), m("div", tL, [
      f("button", {
        class: S([e.settings.class]),
        type: "button",
        onClick: t[1] || (t[1] = (...o) => e.togglePanel && e.togglePanel(...o))
      }, [
        e.settings.icon ? (g(), m("i", {
          key: 0,
          class: S([e.settings.icon])
        }, null, 2)) : T("", !0),
        f("span", {
          innerHTML: e.settings.label
        }, null, 8, eL)
      ], 2)
    ]))
  ])) : T("", !0);
}
const nL = /* @__PURE__ */ ue(GS, [["render", sL], ["__scopeId", "data-v-250fe1f0"]]), dL = {
  install(e) {
    e.component("VuAdmin", tS), e.component("VuAuth", WS), e.component("VuUserButton", nL);
  }
};
export {
  tS as VuAdmin,
  WS as VuAuth,
  nL as VuUserButton,
  dL as default
};
