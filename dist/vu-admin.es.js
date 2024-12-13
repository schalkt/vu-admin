var Ih = Object.defineProperty;
var xh = (e, t, s) => t in e ? Ih(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var U = (e, t, s) => xh(e, typeof t != "symbol" ? t + "" : t, s);
import { openBlock as g, createElementBlock as m, createElementVNode as f, normalizeClass as S, Fragment as J, renderList as st, toDisplayString as C, createCommentVNode as E, withDirectives as lt, vModelText as de, withKeys as ai, withModifiers as Lt, createTextVNode as et, vModelSelect as Ne, resolveComponent as ze, createBlock as os, vModelDynamic as fe, vModelCheckbox as fu, vShow as Ss, normalizeStyle as Qn, createVNode as pu } from "vue";
var Bt = "top", zt = "bottom", Wt = "right", Pt = "left", Sr = "auto", xn = [Bt, zt, Wt, Pt], $s = "start", En = "end", gu = "clippingParents", qa = "viewport", on = "popper", mu = "reference", aa = /* @__PURE__ */ xn.reduce(function(e, t) {
  return e.concat([t + "-" + $s, t + "-" + En]);
}, []), Ba = /* @__PURE__ */ [].concat(xn, [Sr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + $s, t + "-" + En]);
}, []), bu = "beforeRead", yu = "read", vu = "afterRead", _u = "beforeMain", Eu = "main", wu = "afterMain", Tu = "beforeWrite", Au = "write", Ou = "afterWrite", Nu = [bu, yu, vu, _u, Eu, wu, Tu, Au, Ou];
function xe(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Kt(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Ms(e) {
  var t = Kt(e).Element;
  return e instanceof t || e instanceof Element;
}
function se(e) {
  var t = Kt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Pa(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Kt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function $h(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(s) {
    var n = t.styles[s] || {}, i = t.attributes[s] || {}, r = t.elements[s];
    !se(r) || !xe(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? r.removeAttribute(o) : r.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function Mh(e) {
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
      !se(i) || !xe(i) || (Object.assign(i.style, l), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const ja = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: $h,
  effect: Mh,
  requires: ["computeStyles"]
};
function Ce(e) {
  return e.split("-")[0];
}
var xs = Math.max, _r = Math.min, wn = Math.round;
function la() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ku() {
  return !/^((?!chrome|android).)*safari/i.test(la());
}
function Tn(e, t, s) {
  t === void 0 && (t = !1), s === void 0 && (s = !1);
  var n = e.getBoundingClientRect(), i = 1, r = 1;
  t && se(e) && (i = e.offsetWidth > 0 && wn(n.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && wn(n.height) / e.offsetHeight || 1);
  var o = Ms(e) ? Kt(e) : window, l = o.visualViewport, a = !ku() && s, u = (n.left + (a && l ? l.offsetLeft : 0)) / i, h = (n.top + (a && l ? l.offsetTop : 0)) / r, d = n.width / i, b = n.height / r;
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
function Va(e) {
  var t = Tn(e), s = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: s,
    height: n
  };
}
function Cu(e, t) {
  var s = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (s && Pa(s)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function Ge(e) {
  return Kt(e).getComputedStyle(e);
}
function Rh(e) {
  return ["table", "td", "th"].indexOf(xe(e)) >= 0;
}
function gs(e) {
  return ((Ms(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Lr(e) {
  return xe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Pa(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    gs(e)
  );
}
function kl(e) {
  return !se(e) || // https://github.com/popperjs/popper-core/issues/837
  Ge(e).position === "fixed" ? null : e.offsetParent;
}
function Dh(e) {
  var t = /firefox/i.test(la()), s = /Trident/i.test(la());
  if (s && se(e)) {
    var n = Ge(e);
    if (n.position === "fixed")
      return null;
  }
  var i = Lr(e);
  for (Pa(i) && (i = i.host); se(i) && ["html", "body"].indexOf(xe(i)) < 0; ) {
    var r = Ge(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function wi(e) {
  for (var t = Kt(e), s = kl(e); s && Rh(s) && Ge(s).position === "static"; )
    s = kl(s);
  return s && (xe(s) === "html" || xe(s) === "body" && Ge(s).position === "static") ? t : s || Dh(e) || t;
}
function Ua(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function li(e, t, s) {
  return xs(e, _r(t, s));
}
function qh(e, t, s) {
  var n = li(e, t, s);
  return n > s ? s : n;
}
function Su() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Lu(e) {
  return Object.assign({}, Su(), e);
}
function Iu(e, t) {
  return t.reduce(function(s, n) {
    return s[n] = e, s;
  }, {});
}
var Bh = function(t, s) {
  return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
    placement: s.placement
  })) : t, Lu(typeof t != "number" ? t : Iu(t, xn));
};
function Ph(e) {
  var t, s = e.state, n = e.name, i = e.options, r = s.elements.arrow, o = s.modifiersData.popperOffsets, l = Ce(s.placement), a = Ua(l), u = [Pt, Wt].indexOf(l) >= 0, h = u ? "height" : "width";
  if (!(!r || !o)) {
    var d = Bh(i.padding, s), b = Va(r), y = a === "y" ? Bt : Pt, w = a === "y" ? zt : Wt, A = s.rects.reference[h] + s.rects.reference[a] - o[a] - s.rects.popper[h], O = o[a] - s.rects.reference[a], N = wi(r), M = N ? a === "y" ? N.clientHeight || 0 : N.clientWidth || 0 : 0, B = A / 2 - O / 2, P = d[y], j = M - b[h] - d[w], X = M / 2 - b[h] / 2 + B, it = li(P, X, j), ct = a;
    s.modifiersData[n] = (t = {}, t[ct] = it, t.centerOffset = it - X, t);
  }
}
function jh(e) {
  var t = e.state, s = e.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Cu(t.elements.popper, i) && (t.elements.arrow = i));
}
const xu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ph,
  effect: jh,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function An(e) {
  return e.split("-")[1];
}
var Vh = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Uh(e, t) {
  var s = e.x, n = e.y, i = t.devicePixelRatio || 1;
  return {
    x: wn(s * i) / i || 0,
    y: wn(n * i) / i || 0
  };
}
function Cl(e) {
  var t, s = e.popper, n = e.popperRect, i = e.placement, r = e.variation, o = e.offsets, l = e.position, a = e.gpuAcceleration, u = e.adaptive, h = e.roundOffsets, d = e.isFixed, b = o.x, y = b === void 0 ? 0 : b, w = o.y, A = w === void 0 ? 0 : w, O = typeof h == "function" ? h({
    x: y,
    y: A
  }) : {
    x: y,
    y: A
  };
  y = O.x, A = O.y;
  var N = o.hasOwnProperty("x"), M = o.hasOwnProperty("y"), B = Pt, P = Bt, j = window;
  if (u) {
    var X = wi(s), it = "clientHeight", ct = "clientWidth";
    if (X === Kt(s) && (X = gs(s), Ge(X).position !== "static" && l === "absolute" && (it = "scrollHeight", ct = "scrollWidth")), X = X, i === Bt || (i === Pt || i === Wt) && r === En) {
      P = zt;
      var vt = d && X === j && j.visualViewport ? j.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        X[it]
      );
      A -= vt - n.height, A *= a ? 1 : -1;
    }
    if (i === Pt || (i === Bt || i === zt) && r === En) {
      B = Wt;
      var ht = d && X === j && j.visualViewport ? j.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        X[ct]
      );
      y -= ht - n.width, y *= a ? 1 : -1;
    }
  }
  var v = Object.assign({
    position: l
  }, u && Vh), x = h === !0 ? Uh({
    x: y,
    y: A
  }, Kt(s)) : {
    x: y,
    y: A
  };
  if (y = x.x, A = x.y, a) {
    var T;
    return Object.assign({}, v, (T = {}, T[P] = M ? "0" : "", T[B] = N ? "0" : "", T.transform = (j.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + A + "px)" : "translate3d(" + y + "px, " + A + "px, 0)", T));
  }
  return Object.assign({}, v, (t = {}, t[P] = M ? A + "px" : "", t[B] = N ? y + "px" : "", t.transform = "", t));
}
function Fh(e) {
  var t = e.state, s = e.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, o = r === void 0 ? !0 : r, l = s.roundOffsets, a = l === void 0 ? !0 : l, u = {
    placement: Ce(t.placement),
    variation: An(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Cl(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Cl(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Fa = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Fh,
  data: {}
};
var Zi = {
  passive: !0
};
function Hh(e) {
  var t = e.state, s = e.instance, n = e.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, l = o === void 0 ? !0 : o, a = Kt(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && u.forEach(function(h) {
    h.addEventListener("scroll", s.update, Zi);
  }), l && a.addEventListener("resize", s.update, Zi), function() {
    r && u.forEach(function(h) {
      h.removeEventListener("scroll", s.update, Zi);
    }), l && a.removeEventListener("resize", s.update, Zi);
  };
}
const Ha = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Hh,
  data: {}
};
var zh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function pr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return zh[t];
  });
}
var Wh = {
  start: "end",
  end: "start"
};
function Sl(e) {
  return e.replace(/start|end/g, function(t) {
    return Wh[t];
  });
}
function za(e) {
  var t = Kt(e), s = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function Wa(e) {
  return Tn(gs(e)).left + za(e).scrollLeft;
}
function Kh(e, t) {
  var s = Kt(e), n = gs(e), i = s.visualViewport, r = n.clientWidth, o = n.clientHeight, l = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var u = ku();
    (u || !u && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: l + Wa(e),
    y: a
  };
}
function Gh(e) {
  var t, s = gs(e), n = za(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = xs(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = xs(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Wa(e), a = -n.scrollTop;
  return Ge(i || s).direction === "rtl" && (l += xs(s.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: l,
    y: a
  };
}
function Ka(e) {
  var t = Ge(e), s = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(s + i + n);
}
function $u(e) {
  return ["html", "body", "#document"].indexOf(xe(e)) >= 0 ? e.ownerDocument.body : se(e) && Ka(e) ? e : $u(Lr(e));
}
function ci(e, t) {
  var s;
  t === void 0 && (t = []);
  var n = $u(e), i = n === ((s = e.ownerDocument) == null ? void 0 : s.body), r = Kt(n), o = i ? [r].concat(r.visualViewport || [], Ka(n) ? n : []) : n, l = t.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(ci(Lr(o)))
  );
}
function ca(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Yh(e, t) {
  var s = Tn(e, !1, t === "fixed");
  return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s;
}
function Ll(e, t, s) {
  return t === qa ? ca(Kh(e, s)) : Ms(t) ? Yh(t, s) : ca(Gh(gs(e)));
}
function Xh(e) {
  var t = ci(Lr(e)), s = ["absolute", "fixed"].indexOf(Ge(e).position) >= 0, n = s && se(e) ? wi(e) : e;
  return Ms(n) ? t.filter(function(i) {
    return Ms(i) && Cu(i, n) && xe(i) !== "body";
  }) : [];
}
function Zh(e, t, s, n) {
  var i = t === "clippingParents" ? Xh(e) : [].concat(t), r = [].concat(i, [s]), o = r[0], l = r.reduce(function(a, u) {
    var h = Ll(e, u, n);
    return a.top = xs(h.top, a.top), a.right = _r(h.right, a.right), a.bottom = _r(h.bottom, a.bottom), a.left = xs(h.left, a.left), a;
  }, Ll(e, o, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Mu(e) {
  var t = e.reference, s = e.element, n = e.placement, i = n ? Ce(n) : null, r = n ? An(n) : null, o = t.x + t.width / 2 - s.width / 2, l = t.y + t.height / 2 - s.height / 2, a;
  switch (i) {
    case Bt:
      a = {
        x: o,
        y: t.y - s.height
      };
      break;
    case zt:
      a = {
        x: o,
        y: t.y + t.height
      };
      break;
    case Wt:
      a = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Pt:
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
  var u = i ? Ua(i) : null;
  if (u != null) {
    var h = u === "y" ? "height" : "width";
    switch (r) {
      case $s:
        a[u] = a[u] - (t[h] / 2 - s[h] / 2);
        break;
      case En:
        a[u] = a[u] + (t[h] / 2 - s[h] / 2);
        break;
    }
  }
  return a;
}
function On(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = n === void 0 ? e.placement : n, r = s.strategy, o = r === void 0 ? e.strategy : r, l = s.boundary, a = l === void 0 ? gu : l, u = s.rootBoundary, h = u === void 0 ? qa : u, d = s.elementContext, b = d === void 0 ? on : d, y = s.altBoundary, w = y === void 0 ? !1 : y, A = s.padding, O = A === void 0 ? 0 : A, N = Lu(typeof O != "number" ? O : Iu(O, xn)), M = b === on ? mu : on, B = e.rects.popper, P = e.elements[w ? M : b], j = Zh(Ms(P) ? P : P.contextElement || gs(e.elements.popper), a, h, o), X = Tn(e.elements.reference), it = Mu({
    reference: X,
    element: B,
    strategy: "absolute",
    placement: i
  }), ct = ca(Object.assign({}, B, it)), vt = b === on ? ct : X, ht = {
    top: j.top - vt.top + N.top,
    bottom: vt.bottom - j.bottom + N.bottom,
    left: j.left - vt.left + N.left,
    right: vt.right - j.right + N.right
  }, v = e.modifiersData.offset;
  if (b === on && v) {
    var x = v[i];
    Object.keys(ht).forEach(function(T) {
      var q = [Wt, zt].indexOf(T) >= 0 ? 1 : -1, D = [Bt, zt].indexOf(T) >= 0 ? "y" : "x";
      ht[T] += x[D] * q;
    });
  }
  return ht;
}
function Qh(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = s.boundary, r = s.rootBoundary, o = s.padding, l = s.flipVariations, a = s.allowedAutoPlacements, u = a === void 0 ? Ba : a, h = An(n), d = h ? l ? aa : aa.filter(function(w) {
    return An(w) === h;
  }) : xn, b = d.filter(function(w) {
    return u.indexOf(w) >= 0;
  });
  b.length === 0 && (b = d);
  var y = b.reduce(function(w, A) {
    return w[A] = On(e, {
      placement: A,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[Ce(A)], w;
  }, {});
  return Object.keys(y).sort(function(w, A) {
    return y[w] - y[A];
  });
}
function Jh(e) {
  if (Ce(e) === Sr)
    return [];
  var t = pr(e);
  return [Sl(e), t, Sl(t)];
}
function tf(e) {
  var t = e.state, s = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, l = o === void 0 ? !0 : o, a = s.fallbackPlacements, u = s.padding, h = s.boundary, d = s.rootBoundary, b = s.altBoundary, y = s.flipVariations, w = y === void 0 ? !0 : y, A = s.allowedAutoPlacements, O = t.options.placement, N = Ce(O), M = N === O, B = a || (M || !w ? [pr(O)] : Jh(O)), P = [O].concat(B).reduce(function(rt, W) {
      return rt.concat(Ce(W) === Sr ? Qh(t, {
        placement: W,
        boundary: h,
        rootBoundary: d,
        padding: u,
        flipVariations: w,
        allowedAutoPlacements: A
      }) : W);
    }, []), j = t.rects.reference, X = t.rects.popper, it = /* @__PURE__ */ new Map(), ct = !0, vt = P[0], ht = 0; ht < P.length; ht++) {
      var v = P[ht], x = Ce(v), T = An(v) === $s, q = [Bt, zt].indexOf(x) >= 0, D = q ? "width" : "height", L = On(t, {
        placement: v,
        boundary: h,
        rootBoundary: d,
        altBoundary: b,
        padding: u
      }), R = q ? T ? Wt : Pt : T ? zt : Bt;
      j[D] > X[D] && (R = pr(R));
      var F = pr(R), z = [];
      if (r && z.push(L[x] <= 0), l && z.push(L[R] <= 0, L[F] <= 0), z.every(function(rt) {
        return rt;
      })) {
        vt = v, ct = !1;
        break;
      }
      it.set(v, z);
    }
    if (ct)
      for (var V = w ? 3 : 1, nt = function(W) {
        var mt = P.find(function(Et) {
          var tt = it.get(Et);
          if (tt)
            return tt.slice(0, W).every(function(ut) {
              return ut;
            });
        });
        if (mt)
          return vt = mt, "break";
      }, Q = V; Q > 0; Q--) {
        var at = nt(Q);
        if (at === "break") break;
      }
    t.placement !== vt && (t.modifiersData[n]._skip = !0, t.placement = vt, t.reset = !0);
  }
}
const Ru = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: tf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Il(e, t, s) {
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
function xl(e) {
  return [Bt, Wt, zt, Pt].some(function(t) {
    return e[t] >= 0;
  });
}
function ef(e) {
  var t = e.state, s = e.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = On(t, {
    elementContext: "reference"
  }), l = On(t, {
    altBoundary: !0
  }), a = Il(o, n), u = Il(l, i, r), h = xl(a), d = xl(u);
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
const Du = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ef
};
function sf(e, t, s) {
  var n = Ce(e), i = [Pt, Bt].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, t, {
    placement: e
  })) : s, o = r[0], l = r[1];
  return o = o || 0, l = (l || 0) * i, [Pt, Wt].indexOf(n) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function nf(e) {
  var t = e.state, s = e.options, n = e.name, i = s.offset, r = i === void 0 ? [0, 0] : i, o = Ba.reduce(function(h, d) {
    return h[d] = sf(d, t.rects, r), h;
  }, {}), l = o[t.placement], a = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = o;
}
const qu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: nf
};
function rf(e) {
  var t = e.state, s = e.name;
  t.modifiersData[s] = Mu({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ga = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: rf,
  data: {}
};
function of(e) {
  return e === "x" ? "y" : "x";
}
function af(e) {
  var t = e.state, s = e.options, n = e.name, i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, l = o === void 0 ? !1 : o, a = s.boundary, u = s.rootBoundary, h = s.altBoundary, d = s.padding, b = s.tether, y = b === void 0 ? !0 : b, w = s.tetherOffset, A = w === void 0 ? 0 : w, O = On(t, {
    boundary: a,
    rootBoundary: u,
    padding: d,
    altBoundary: h
  }), N = Ce(t.placement), M = An(t.placement), B = !M, P = Ua(N), j = of(P), X = t.modifiersData.popperOffsets, it = t.rects.reference, ct = t.rects.popper, vt = typeof A == "function" ? A(Object.assign({}, t.rects, {
    placement: t.placement
  })) : A, ht = typeof vt == "number" ? {
    mainAxis: vt,
    altAxis: vt
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, vt), v = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, x = {
    x: 0,
    y: 0
  };
  if (X) {
    if (r) {
      var T, q = P === "y" ? Bt : Pt, D = P === "y" ? zt : Wt, L = P === "y" ? "height" : "width", R = X[P], F = R + O[q], z = R - O[D], V = y ? -ct[L] / 2 : 0, nt = M === $s ? it[L] : ct[L], Q = M === $s ? -ct[L] : -it[L], at = t.elements.arrow, rt = y && at ? Va(at) : {
        width: 0,
        height: 0
      }, W = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Su(), mt = W[q], Et = W[D], tt = li(0, it[L], rt[L]), ut = B ? it[L] / 2 - V - tt - mt - ht.mainAxis : nt - tt - mt - ht.mainAxis, ft = B ? -it[L] / 2 + V + tt + Et + ht.mainAxis : Q + tt + Et + ht.mainAxis, dt = t.elements.arrow && wi(t.elements.arrow), bt = dt ? P === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, yt = (T = v == null ? void 0 : v[P]) != null ? T : 0, At = R + ut - yt - bt, kt = R + ft - yt, es = li(y ? _r(F, At) : F, R, y ? xs(z, kt) : z);
      X[P] = es, x[P] = es - R;
    }
    if (l) {
      var _s, Dn = P === "x" ? Bt : Pt, qn = P === "x" ? zt : Wt, jt = X[j], Ee = j === "y" ? "height" : "width", Es = jt + O[Dn], ws = jt - O[qn], Vt = [Bt, Pt].indexOf(N) !== -1, De = (_s = v == null ? void 0 : v[j]) != null ? _s : 0, Gs = Vt ? Es : jt - it[Ee] - ct[Ee] - De + ht.altAxis, we = Vt ? jt + it[Ee] + ct[Ee] - De - ht.altAxis : ws, qe = y && Vt ? qh(Gs, jt, we) : li(y ? Gs : Es, jt, y ? we : ws);
      X[j] = qe, x[j] = qe - jt;
    }
    t.modifiersData[n] = x;
  }
}
const Bu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: af,
  requiresIfExists: ["offset"]
};
function lf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function cf(e) {
  return e === Kt(e) || !se(e) ? za(e) : lf(e);
}
function uf(e) {
  var t = e.getBoundingClientRect(), s = wn(t.width) / e.offsetWidth || 1, n = wn(t.height) / e.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function df(e, t, s) {
  s === void 0 && (s = !1);
  var n = se(t), i = se(t) && uf(t), r = gs(t), o = Tn(e, i, s), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && ((xe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ka(r)) && (l = cf(t)), se(t) ? (a = Tn(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Wa(r))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function hf(e) {
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
function ff(e) {
  var t = hf(e);
  return Nu.reduce(function(s, n) {
    return s.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function pf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(s) {
      Promise.resolve().then(function() {
        t = void 0, s(e());
      });
    })), t;
  };
}
function gf(e) {
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
var $l = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ml() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Ir(e) {
  e === void 0 && (e = {});
  var t = e, s = t.defaultModifiers, n = s === void 0 ? [] : s, i = t.defaultOptions, r = i === void 0 ? $l : i;
  return function(l, a, u) {
    u === void 0 && (u = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, $l, r),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], b = !1, y = {
      state: h,
      setOptions: function(N) {
        var M = typeof N == "function" ? N(h.options) : N;
        A(), h.options = Object.assign({}, r, h.options, M), h.scrollParents = {
          reference: Ms(l) ? ci(l) : l.contextElement ? ci(l.contextElement) : [],
          popper: ci(a)
        };
        var B = ff(gf([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = B.filter(function(P) {
          return P.enabled;
        }), w(), y.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var N = h.elements, M = N.reference, B = N.popper;
          if (Ml(M, B)) {
            h.rects = {
              reference: df(M, wi(B), h.options.strategy === "fixed"),
              popper: Va(B)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(ht) {
              return h.modifiersData[ht.name] = Object.assign({}, ht.data);
            });
            for (var P = 0; P < h.orderedModifiers.length; P++) {
              if (h.reset === !0) {
                h.reset = !1, P = -1;
                continue;
              }
              var j = h.orderedModifiers[P], X = j.fn, it = j.options, ct = it === void 0 ? {} : it, vt = j.name;
              typeof X == "function" && (h = X({
                state: h,
                options: ct,
                name: vt,
                instance: y
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: pf(function() {
        return new Promise(function(O) {
          y.forceUpdate(), O(h);
        });
      }),
      destroy: function() {
        A(), b = !0;
      }
    };
    if (!Ml(l, a))
      return y;
    y.setOptions(u).then(function(O) {
      !b && u.onFirstUpdate && u.onFirstUpdate(O);
    });
    function w() {
      h.orderedModifiers.forEach(function(O) {
        var N = O.name, M = O.options, B = M === void 0 ? {} : M, P = O.effect;
        if (typeof P == "function") {
          var j = P({
            state: h,
            name: N,
            instance: y,
            options: B
          }), X = function() {
          };
          d.push(j || X);
        }
      });
    }
    function A() {
      d.forEach(function(O) {
        return O();
      }), d = [];
    }
    return y;
  };
}
var mf = /* @__PURE__ */ Ir(), bf = [Ha, Ga, Fa, ja], yf = /* @__PURE__ */ Ir({
  defaultModifiers: bf
}), vf = [Ha, Ga, Fa, ja, qu, Ru, Bu, xu, Du], Ya = /* @__PURE__ */ Ir({
  defaultModifiers: vf
});
const Pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: wu,
  afterRead: vu,
  afterWrite: Ou,
  applyStyles: ja,
  arrow: xu,
  auto: Sr,
  basePlacements: xn,
  beforeMain: _u,
  beforeRead: bu,
  beforeWrite: Tu,
  bottom: zt,
  clippingParents: gu,
  computeStyles: Fa,
  createPopper: Ya,
  createPopperBase: mf,
  createPopperLite: yf,
  detectOverflow: On,
  end: En,
  eventListeners: Ha,
  flip: Ru,
  hide: Du,
  left: Pt,
  main: Eu,
  modifierPhases: Nu,
  offset: qu,
  placements: Ba,
  popper: on,
  popperGenerator: Ir,
  popperOffsets: Ga,
  preventOverflow: Bu,
  read: yu,
  reference: mu,
  right: Wt,
  start: $s,
  top: Bt,
  variationPlacements: aa,
  viewport: qa,
  write: Au
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const is = /* @__PURE__ */ new Map(), xo = {
  set(e, t, s) {
    is.has(e) || is.set(e, /* @__PURE__ */ new Map());
    const n = is.get(e);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, s);
  },
  get(e, t) {
    return is.has(e) && is.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!is.has(e))
      return;
    const s = is.get(e);
    s.delete(t), s.size === 0 && is.delete(e);
  }
}, _f = 1e6, Ef = 1e3, ua = "transitionend", ju = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, s) => `#${CSS.escape(s)}`)), e), wf = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), Tf = (e) => {
  do
    e += Math.floor(Math.random() * _f);
  while (document.getElementById(e));
  return e;
}, Af = (e) => {
  if (!e)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: s
  } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), i = Number.parseFloat(s);
  return !n && !i ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * Ef);
}, Vu = (e) => {
  e.dispatchEvent(new Event(ua));
}, We = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), ds = (e) => We(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(ju(e)) : null, $n = (e) => {
  if (!We(e) || e.getClientRects().length === 0)
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
}, hs = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Uu = (e) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof e.getRootNode == "function") {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return e instanceof ShadowRoot ? e : e.parentNode ? Uu(e.parentNode) : null;
}, Er = () => {
}, Ti = (e) => {
  e.offsetHeight;
}, Fu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, $o = [], Of = (e) => {
  document.readyState === "loading" ? ($o.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of $o)
      t();
  }), $o.push(e)) : e();
}, ne = () => document.documentElement.dir === "rtl", re = (e) => {
  Of(() => {
    const t = Fu();
    if (t) {
      const s = e.NAME, n = t.fn[s];
      t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = n, e.jQueryInterface);
    }
  });
}, Ht = (e, t = [], s = e) => typeof e == "function" ? e(...t) : s, Hu = (e, t, s = !0) => {
  if (!s) {
    Ht(e);
    return;
  }
  const i = Af(t) + 5;
  let r = !1;
  const o = ({
    target: l
  }) => {
    l === t && (r = !0, t.removeEventListener(ua, o), Ht(e));
  };
  t.addEventListener(ua, o), setTimeout(() => {
    r || Vu(t);
  }, i);
}, Xa = (e, t, s, n) => {
  const i = e.length;
  let r = e.indexOf(t);
  return r === -1 ? !s && n ? e[i - 1] : e[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), e[Math.max(0, Math.min(r, i - 1))]);
}, Nf = /[^.]*(?=\..*)\.|.*/, kf = /\..*/, Cf = /::\d+$/, Mo = {};
let Rl = 1;
const zu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Sf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Wu(e, t) {
  return t && `${t}::${Rl++}` || e.uidEvent || Rl++;
}
function Ku(e) {
  const t = Wu(e);
  return e.uidEvent = t, Mo[t] = Mo[t] || {}, Mo[t];
}
function Lf(e, t) {
  return function s(n) {
    return Za(n, {
      delegateTarget: e
    }), s.oneOff && $.off(e, n.type, t), t.apply(e, [n]);
  };
}
function If(e, t, s) {
  return function n(i) {
    const r = e.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const l of r)
        if (l === o)
          return Za(i, {
            delegateTarget: o
          }), n.oneOff && $.off(e, i.type, t, s), s.apply(o, [i]);
  };
}
function Gu(e, t, s = null) {
  return Object.values(e).find((n) => n.callable === t && n.delegationSelector === s);
}
function Yu(e, t, s) {
  const n = typeof t == "string", i = n ? s : t || s;
  let r = Xu(e);
  return Sf.has(r) || (r = e), [n, i, r];
}
function Dl(e, t, s, n, i) {
  if (typeof t != "string" || !e)
    return;
  let [r, o, l] = Yu(t, s, n);
  t in zu && (o = ((w) => function(A) {
    if (!A.relatedTarget || A.relatedTarget !== A.delegateTarget && !A.delegateTarget.contains(A.relatedTarget))
      return w.call(this, A);
  })(o));
  const a = Ku(e), u = a[l] || (a[l] = {}), h = Gu(u, o, r ? s : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const d = Wu(o, t.replace(Nf, "")), b = r ? If(e, s, o) : Lf(e, o);
  b.delegationSelector = r ? s : null, b.callable = o, b.oneOff = i, b.uidEvent = d, u[d] = b, e.addEventListener(l, b, r);
}
function da(e, t, s, n, i) {
  const r = Gu(t[s], n, i);
  r && (e.removeEventListener(s, r, !!i), delete t[s][r.uidEvent]);
}
function xf(e, t, s, n) {
  const i = t[s] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && da(e, t, s, o.callable, o.delegationSelector);
}
function Xu(e) {
  return e = e.replace(kf, ""), zu[e] || e;
}
const $ = {
  on(e, t, s, n) {
    Dl(e, t, s, n, !1);
  },
  one(e, t, s, n) {
    Dl(e, t, s, n, !0);
  },
  off(e, t, s, n) {
    if (typeof t != "string" || !e)
      return;
    const [i, r, o] = Yu(t, s, n), l = o !== t, a = Ku(e), u = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(u).length)
        return;
      da(e, a, o, r, i ? s : null);
      return;
    }
    if (h)
      for (const d of Object.keys(a))
        xf(e, a, d, t.slice(1));
    for (const [d, b] of Object.entries(u)) {
      const y = d.replace(Cf, "");
      (!l || t.includes(y)) && da(e, a, o, b.callable, b.delegationSelector);
    }
  },
  trigger(e, t, s) {
    if (typeof t != "string" || !e)
      return null;
    const n = Fu(), i = Xu(t), r = t !== i;
    let o = null, l = !0, a = !0, u = !1;
    r && n && (o = n.Event(t, s), n(e).trigger(o), l = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), u = o.isDefaultPrevented());
    const h = Za(new Event(t, {
      bubbles: l,
      cancelable: !0
    }), s);
    return u && h.preventDefault(), a && e.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function Za(e, t = {}) {
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
function ql(e) {
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
function Ro(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Ke = {
  setDataAttribute(e, t, s) {
    e.setAttribute(`data-bs-${Ro(t)}`, s);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Ro(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, s = Object.keys(e.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of s) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = ql(e.dataset[n]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return ql(e.getAttribute(`data-bs-${Ro(t)}`));
  }
};
class Ai {
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
    const n = We(s) ? Ke.getDataAttribute(s, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...We(s) ? Ke.getDataAttributes(s) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, s = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(s)) {
      const r = t[n], o = We(r) ? "element" : wf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const $f = "5.3.3";
class me extends Ai {
  constructor(t, s) {
    super(), t = ds(t), t && (this._element = t, this._config = this._getConfig(s), xo.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    xo.remove(this._element, this.constructor.DATA_KEY), $.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, s, n = !0) {
    Hu(t, s, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return xo.get(ds(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, s = {}) {
    return this.getInstance(t) || new this(t, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return $f;
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
const Do = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let s = e.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), t = s && s !== "#" ? s.trim() : null;
  }
  return t ? t.split(",").map((s) => ju(s)).join(",") : null;
}, Z = {
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
    return this.find(t, e).filter((s) => !hs(s) && $n(s));
  },
  getSelectorFromElement(e) {
    const t = Do(e);
    return t && Z.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Do(e);
    return t ? Z.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Do(e);
    return t ? Z.find(t) : [];
  }
}, xr = (e, t = "hide") => {
  const s = `click.dismiss${e.EVENT_KEY}`, n = e.NAME;
  $.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), hs(this))
      return;
    const r = Z.getElementFromSelector(this) || this.closest(`.${n}`);
    e.getOrCreateInstance(r)[t]();
  });
}, Mf = "alert", Rf = "bs.alert", Zu = `.${Rf}`, Df = `close${Zu}`, qf = `closed${Zu}`, Bf = "fade", Pf = "show";
class $r extends me {
  // Getters
  static get NAME() {
    return Mf;
  }
  // Public
  close() {
    if ($.trigger(this._element, Df).defaultPrevented)
      return;
    this._element.classList.remove(Pf);
    const s = this._element.classList.contains(Bf);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), $.trigger(this._element, qf), this.dispose();
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
re($r);
const jf = "button", Vf = "bs.button", Uf = `.${Vf}`, Ff = ".data-api", Hf = "active", Bl = '[data-bs-toggle="button"]', zf = `click${Uf}${Ff}`;
class Mr extends me {
  // Getters
  static get NAME() {
    return jf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Hf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Mr.getOrCreateInstance(this);
      t === "toggle" && s[t]();
    });
  }
}
$.on(document, zf, Bl, (e) => {
  e.preventDefault();
  const t = e.target.closest(Bl);
  Mr.getOrCreateInstance(t).toggle();
});
re(Mr);
const Wf = "swipe", Mn = ".bs.swipe", Kf = `touchstart${Mn}`, Gf = `touchmove${Mn}`, Yf = `touchend${Mn}`, Xf = `pointerdown${Mn}`, Zf = `pointerup${Mn}`, Qf = "touch", Jf = "pen", tp = "pointer-event", ep = 40, sp = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, np = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class wr extends Ai {
  constructor(t, s) {
    super(), this._element = t, !(!t || !wr.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return sp;
  }
  static get DefaultType() {
    return np;
  }
  static get NAME() {
    return Wf;
  }
  // Public
  dispose() {
    $.off(this._element, Mn);
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
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), Ht(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= ep)
      return;
    const s = t / this._deltaX;
    this._deltaX = 0, s && Ht(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? ($.on(this._element, Xf, (t) => this._start(t)), $.on(this._element, Zf, (t) => this._end(t)), this._element.classList.add(tp)) : ($.on(this._element, Kf, (t) => this._start(t)), $.on(this._element, Gf, (t) => this._move(t)), $.on(this._element, Yf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === Jf || t.pointerType === Qf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const ip = "carousel", rp = "bs.carousel", ms = `.${rp}`, Qu = ".data-api", op = "ArrowLeft", ap = "ArrowRight", lp = 500, Jn = "next", nn = "prev", an = "left", gr = "right", cp = `slide${ms}`, qo = `slid${ms}`, up = `keydown${ms}`, dp = `mouseenter${ms}`, hp = `mouseleave${ms}`, fp = `dragstart${ms}`, pp = `load${ms}${Qu}`, gp = `click${ms}${Qu}`, Ju = "carousel", Qi = "active", mp = "slide", bp = "carousel-item-end", yp = "carousel-item-start", vp = "carousel-item-next", _p = "carousel-item-prev", td = ".active", ed = ".carousel-item", Ep = td + ed, wp = ".carousel-item img", Tp = ".carousel-indicators", Ap = "[data-bs-slide], [data-bs-slide-to]", Op = '[data-bs-ride="carousel"]', Np = {
  [op]: gr,
  [ap]: an
}, kp = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, Cp = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Oi extends me {
  constructor(t, s) {
    super(t, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = Z.findOne(Tp, this._element), this._addEventListeners(), this._config.ride === Ju && this.cycle();
  }
  // Getters
  static get Default() {
    return kp;
  }
  static get DefaultType() {
    return Cp;
  }
  static get NAME() {
    return ip;
  }
  // Public
  next() {
    this._slide(Jn);
  }
  nextWhenVisible() {
    !document.hidden && $n(this._element) && this.next();
  }
  prev() {
    this._slide(nn);
  }
  pause() {
    this._isSliding && Vu(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        $.one(this._element, qo, () => this.cycle());
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
      $.one(this._element, qo, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Jn : nn;
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
    this._config.keyboard && $.on(this._element, up, (t) => this._keydown(t)), this._config.pause === "hover" && ($.on(this._element, dp, () => this.pause()), $.on(this._element, hp, () => this._maybeEnableCycle())), this._config.touch && wr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of Z.find(wp, this._element))
      $.on(n, fp, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(an)),
      rightCallback: () => this._slide(this._directionToOrder(gr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), lp + this._config.interval));
      }
    };
    this._swipeHelper = new wr(this._element, s);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const s = Np[t.key];
    s && (t.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const s = Z.findOne(td, this._indicatorsElement);
    s.classList.remove(Qi), s.removeAttribute("aria-current");
    const n = Z.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Qi), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === Jn, r = s || Xa(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), l = (y) => $.trigger(this._element, y, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (l(cp).defaultPrevented || !n || !r)
      return;
    const u = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? yp : bp, d = i ? vp : _p;
    r.classList.add(d), Ti(r), n.classList.add(h), r.classList.add(h);
    const b = () => {
      r.classList.remove(h, d), r.classList.add(Qi), n.classList.remove(Qi, d, h), this._isSliding = !1, l(qo);
    };
    this._queueCallback(b, n, this._isAnimated()), u && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(mp);
  }
  _getActive() {
    return Z.findOne(Ep, this._element);
  }
  _getItems() {
    return Z.find(ed, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return ne() ? t === an ? nn : Jn : t === an ? Jn : nn;
  }
  _orderToDirection(t) {
    return ne() ? t === nn ? an : gr : t === nn ? gr : an;
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
$.on(document, gp, Ap, function(e) {
  const t = Z.getElementFromSelector(this);
  if (!t || !t.classList.contains(Ju))
    return;
  e.preventDefault();
  const s = Oi.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n), s._maybeEnableCycle();
    return;
  }
  if (Ke.getDataAttribute(this, "slide") === "next") {
    s.next(), s._maybeEnableCycle();
    return;
  }
  s.prev(), s._maybeEnableCycle();
});
$.on(window, pp, () => {
  const e = Z.find(Op);
  for (const t of e)
    Oi.getOrCreateInstance(t);
});
re(Oi);
const Sp = "collapse", Lp = "bs.collapse", Ni = `.${Lp}`, Ip = ".data-api", xp = `show${Ni}`, $p = `shown${Ni}`, Mp = `hide${Ni}`, Rp = `hidden${Ni}`, Dp = `click${Ni}${Ip}`, Bo = "show", gn = "collapse", Ji = "collapsing", qp = "collapsed", Bp = `:scope .${gn} .${gn}`, Pp = "collapse-horizontal", jp = "width", Vp = "height", Up = ".collapse.show, .collapse.collapsing", ha = '[data-bs-toggle="collapse"]', Fp = {
  parent: null,
  toggle: !0
}, Hp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class pi extends me {
  constructor(t, s) {
    super(t, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = Z.find(ha);
    for (const i of n) {
      const r = Z.getSelectorFromElement(i), o = Z.find(r).filter((l) => l === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Fp;
  }
  static get DefaultType() {
    return Hp;
  }
  static get NAME() {
    return Sp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(Up).filter((l) => l !== this._element).map((l) => pi.getOrCreateInstance(l, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || $.trigger(this._element, xp).defaultPrevented)
      return;
    for (const l of t)
      l.hide();
    const n = this._getDimension();
    this._element.classList.remove(gn), this._element.classList.add(Ji), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ji), this._element.classList.add(gn, Bo), this._element.style[n] = "", $.trigger(this._element, $p);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || $.trigger(this._element, Mp).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, Ti(this._element), this._element.classList.add(Ji), this._element.classList.remove(gn, Bo);
    for (const i of this._triggerArray) {
      const r = Z.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ji), this._element.classList.add(gn), $.trigger(this._element, Rp);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Bo);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = ds(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(Pp) ? jp : Vp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(ha);
    for (const s of t) {
      const n = Z.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const s = Z.find(Bp, this._config.parent);
    return Z.find(t, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(t, s) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(qp, !s), n.setAttribute("aria-expanded", s);
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
$.on(document, Dp, ha, function(e) {
  (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
  for (const t of Z.getMultipleElementsFromSelector(this))
    pi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
re(pi);
const Pl = "dropdown", zp = "bs.dropdown", Ps = `.${zp}`, Qa = ".data-api", Wp = "Escape", jl = "Tab", Kp = "ArrowUp", Vl = "ArrowDown", Gp = 2, Yp = `hide${Ps}`, Xp = `hidden${Ps}`, Zp = `show${Ps}`, Qp = `shown${Ps}`, sd = `click${Ps}${Qa}`, nd = `keydown${Ps}${Qa}`, Jp = `keyup${Ps}${Qa}`, ln = "show", tg = "dropup", eg = "dropend", sg = "dropstart", ng = "dropup-center", ig = "dropdown-center", Ls = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', rg = `${Ls}.${ln}`, mr = ".dropdown-menu", og = ".navbar", ag = ".navbar-nav", lg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", cg = ne() ? "top-end" : "top-start", ug = ne() ? "top-start" : "top-end", dg = ne() ? "bottom-end" : "bottom-start", hg = ne() ? "bottom-start" : "bottom-end", fg = ne() ? "left-start" : "right-start", pg = ne() ? "right-start" : "left-start", gg = "top", mg = "bottom", bg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, yg = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Se extends me {
  constructor(t, s) {
    super(t, s), this._popper = null, this._parent = this._element.parentNode, this._menu = Z.next(this._element, mr)[0] || Z.prev(this._element, mr)[0] || Z.findOne(mr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return bg;
  }
  static get DefaultType() {
    return yg;
  }
  static get NAME() {
    return Pl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (hs(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!$.trigger(this._element, Zp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(ag))
        for (const n of [].concat(...document.body.children))
          $.on(n, "mouseover", Er);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ln), this._element.classList.add(ln), $.trigger(this._element, Qp, t);
    }
  }
  hide() {
    if (hs(this._element) || !this._isShown())
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
    if (!$.trigger(this._element, Yp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          $.off(n, "mouseover", Er);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ln), this._element.classList.remove(ln), this._element.setAttribute("aria-expanded", "false"), Ke.removeDataAttribute(this._menu, "popper"), $.trigger(this._element, Xp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !We(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Pl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Pu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : We(this._config.reference) ? t = ds(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = Ya(t, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(ln);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(eg))
      return fg;
    if (t.classList.contains(sg))
      return pg;
    if (t.classList.contains(ng))
      return gg;
    if (t.classList.contains(ig))
      return mg;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(tg) ? s ? ug : cg : s ? hg : dg;
  }
  _detectNavbar() {
    return this._element.closest(og) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (Ke.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Ht(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({
    key: t,
    target: s
  }) {
    const n = Z.find(lg, this._menu).filter((i) => $n(i));
    n.length && Xa(n, s, t === Vl, !n.includes(s)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Se.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Gp || t.type === "keyup" && t.key !== jl)
      return;
    const s = Z.find(rg);
    for (const n of s) {
      const i = Se.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === jl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const l = {
        relatedTarget: i._element
      };
      t.type === "click" && (l.clickEvent = t), i._completeHide(l);
    }
  }
  static dataApiKeydownHandler(t) {
    const s = /input|textarea/i.test(t.target.tagName), n = t.key === Wp, i = [Kp, Vl].includes(t.key);
    if (!i && !n || s && !n)
      return;
    t.preventDefault();
    const r = this.matches(Ls) ? this : Z.prev(this, Ls)[0] || Z.next(this, Ls)[0] || Z.findOne(Ls, t.delegateTarget.parentNode), o = Se.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
$.on(document, nd, Ls, Se.dataApiKeydownHandler);
$.on(document, nd, mr, Se.dataApiKeydownHandler);
$.on(document, sd, Se.clearMenus);
$.on(document, Jp, Se.clearMenus);
$.on(document, sd, Ls, function(e) {
  e.preventDefault(), Se.getOrCreateInstance(this).toggle();
});
re(Se);
const id = "backdrop", vg = "fade", Ul = "show", Fl = `mousedown.bs.${id}`, _g = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, Eg = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class rd extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return _g;
  }
  static get DefaultType() {
    return Eg;
  }
  static get NAME() {
    return id;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      Ht(t);
      return;
    }
    this._append();
    const s = this._getElement();
    this._config.isAnimated && Ti(s), s.classList.add(Ul), this._emulateAnimation(() => {
      Ht(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      Ht(t);
      return;
    }
    this._getElement().classList.remove(Ul), this._emulateAnimation(() => {
      this.dispose(), Ht(t);
    });
  }
  dispose() {
    this._isAppended && ($.off(this._element, Fl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(vg), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = ds(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), $.on(t, Fl, () => {
      Ht(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Hu(t, this._getElement(), this._config.isAnimated);
  }
}
const wg = "focustrap", Tg = "bs.focustrap", Tr = `.${Tg}`, Ag = `focusin${Tr}`, Og = `keydown.tab${Tr}`, Ng = "Tab", kg = "forward", Hl = "backward", Cg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Sg = {
  autofocus: "boolean",
  trapElement: "element"
};
class od extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Cg;
  }
  static get DefaultType() {
    return Sg;
  }
  static get NAME() {
    return wg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), $.off(document, Tr), $.on(document, Ag, (t) => this._handleFocusin(t)), $.on(document, Og, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, $.off(document, Tr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: s
    } = this._config;
    if (t.target === document || t.target === s || s.contains(t.target))
      return;
    const n = Z.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === Hl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Ng && (this._lastTabNavDirection = t.shiftKey ? Hl : kg);
  }
}
const zl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Wl = ".sticky-top", tr = "padding-right", Kl = "margin-right";
class fa {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, tr, (s) => s + t), this._setElementAttributes(zl, tr, (s) => s + t), this._setElementAttributes(Wl, Kl, (s) => s - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, tr), this._resetElementAttributes(zl, tr), this._resetElementAttributes(Wl, Kl);
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
    n && Ke.setDataAttribute(t, s, n);
  }
  _resetElementAttributes(t, s) {
    const n = (i) => {
      const r = Ke.getDataAttribute(i, s);
      if (r === null) {
        i.style.removeProperty(s);
        return;
      }
      Ke.removeDataAttribute(i, s), i.style.setProperty(s, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, s) {
    if (We(t)) {
      s(t);
      return;
    }
    for (const n of Z.find(t, this._element))
      s(n);
  }
}
const Lg = "modal", Ig = "bs.modal", ie = `.${Ig}`, xg = ".data-api", $g = "Escape", Mg = `hide${ie}`, Rg = `hidePrevented${ie}`, ad = `hidden${ie}`, ld = `show${ie}`, Dg = `shown${ie}`, qg = `resize${ie}`, Bg = `click.dismiss${ie}`, Pg = `mousedown.dismiss${ie}`, jg = `keydown.dismiss${ie}`, Vg = `click${ie}${xg}`, Gl = "modal-open", Ug = "fade", Yl = "show", Po = "modal-static", Fg = ".modal.show", Hg = ".modal-dialog", zg = ".modal-body", Wg = '[data-bs-toggle="modal"]', Kg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Gg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Rs extends me {
  constructor(t, s) {
    super(t, s), this._dialog = Z.findOne(Hg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new fa(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Kg;
  }
  static get DefaultType() {
    return Gg;
  }
  static get NAME() {
    return Lg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || $.trigger(this._element, ld, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Gl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || $.trigger(this._element, Mg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Yl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    $.off(window, ie), $.off(this._dialog, ie), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new rd({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new od({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = Z.findOne(zg, this._dialog);
    s && (s.scrollTop = 0), Ti(this._element), this._element.classList.add(Yl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, $.trigger(this._element, Dg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    $.on(this._element, jg, (t) => {
      if (t.key === $g) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), $.on(window, qg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), $.on(this._element, Pg, (t) => {
      $.one(this._element, Bg, (s) => {
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
      document.body.classList.remove(Gl), this._resetAdjustments(), this._scrollBar.reset(), $.trigger(this._element, ad);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Ug);
  }
  _triggerBackdropTransition() {
    if ($.trigger(this._element, Rg).defaultPrevented)
      return;
    const s = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(Po) || (s || (this._element.style.overflowY = "hidden"), this._element.classList.add(Po), this._queueCallback(() => {
      this._element.classList.remove(Po), this._queueCallback(() => {
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
      const i = ne() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${s}px`;
    }
    if (!n && t) {
      const i = ne() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${s}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, s) {
    return this.each(function() {
      const n = Rs.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](s);
      }
    });
  }
}
$.on(document, Vg, Wg, function(e) {
  const t = Z.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), $.one(t, ld, (i) => {
    i.defaultPrevented || $.one(t, ad, () => {
      $n(this) && this.focus();
    });
  });
  const s = Z.findOne(Fg);
  s && Rs.getInstance(s).hide(), Rs.getOrCreateInstance(t).toggle(this);
});
xr(Rs);
re(Rs);
const Yg = "offcanvas", Xg = "bs.offcanvas", Qe = `.${Xg}`, cd = ".data-api", Zg = `load${Qe}${cd}`, Qg = "Escape", Xl = "show", Zl = "showing", Ql = "hiding", Jg = "offcanvas-backdrop", ud = ".offcanvas.show", tm = `show${Qe}`, em = `shown${Qe}`, sm = `hide${Qe}`, Jl = `hidePrevented${Qe}`, dd = `hidden${Qe}`, nm = `resize${Qe}`, im = `click${Qe}${cd}`, rm = `keydown.dismiss${Qe}`, om = '[data-bs-toggle="offcanvas"]', am = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, lm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class fs extends me {
  constructor(t, s) {
    super(t, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return am;
  }
  static get DefaultType() {
    return lm;
  }
  static get NAME() {
    return Yg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || $.trigger(this._element, tm, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new fa().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Zl);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Xl), this._element.classList.remove(Zl), $.trigger(this._element, em, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || $.trigger(this._element, sm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Ql), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(Xl, Ql), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new fa().reset(), $.trigger(this._element, dd);
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
        $.trigger(this._element, Jl);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new rd({
      className: Jg,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? t : null
    });
  }
  _initializeFocusTrap() {
    return new od({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    $.on(this._element, rm, (t) => {
      if (t.key === Qg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        $.trigger(this._element, Jl);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = fs.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
$.on(document, im, om, function(e) {
  const t = Z.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), hs(this))
    return;
  $.one(t, dd, () => {
    $n(this) && this.focus();
  });
  const s = Z.findOne(ud);
  s && s !== t && fs.getInstance(s).hide(), fs.getOrCreateInstance(t).toggle(this);
});
$.on(window, Zg, () => {
  for (const e of Z.find(ud))
    fs.getOrCreateInstance(e).show();
});
$.on(window, nm, () => {
  for (const e of Z.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" && fs.getOrCreateInstance(e).hide();
});
xr(fs);
re(fs);
const cm = /^aria-[\w-]*$/i, hd = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", cm],
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
}, um = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), dm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, hm = (e, t) => {
  const s = e.nodeName.toLowerCase();
  return t.includes(s) ? um.has(s) ? !!dm.test(e.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function fm(e, t, s) {
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
      hm(h, u) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const pm = "TemplateFactory", gm = {
  allowList: hd,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, mm = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, bm = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class ym extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return gm;
  }
  static get DefaultType() {
    return mm;
  }
  static get NAME() {
    return pm;
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
      }, bm);
  }
  _setContent(t, s, n) {
    const i = Z.findOne(n, t);
    if (i) {
      if (s = this._resolvePossibleFunction(s), !s) {
        i.remove();
        return;
      }
      if (We(s)) {
        this._putElementInTemplate(ds(s), i);
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
    return this._config.sanitize ? fm(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return Ht(t, [this]);
  }
  _putElementInTemplate(t, s) {
    if (this._config.html) {
      s.innerHTML = "", s.append(t);
      return;
    }
    s.textContent = t.textContent;
  }
}
const vm = "tooltip", _m = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), jo = "fade", Em = "modal", er = "show", wm = ".tooltip-inner", tc = `.${Em}`, ec = "hide.bs.modal", ti = "hover", Vo = "focus", Tm = "click", Am = "manual", Om = "hide", Nm = "hidden", km = "show", Cm = "shown", Sm = "inserted", Lm = "click", Im = "focusin", xm = "focusout", $m = "mouseenter", Mm = "mouseleave", Rm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: ne() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: ne() ? "right" : "left"
}, Dm = {
  allowList: hd,
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
}, qm = {
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
let Rr = class fd extends me {
  constructor(t, s) {
    if (typeof Pu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Dm;
  }
  static get DefaultType() {
    return qm;
  }
  static get NAME() {
    return vm;
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
    clearTimeout(this._timeout), $.off(this._element.closest(tc), ec, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = $.trigger(this._element, this.constructor.eventName(km)), n = (Uu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), $.trigger(this._element, this.constructor.eventName(Sm))), this._popper = this._createPopper(i), i.classList.add(er), "ontouchstart" in document.documentElement)
      for (const l of [].concat(...document.body.children))
        $.on(l, "mouseover", Er);
    const o = () => {
      $.trigger(this._element, this.constructor.eventName(Cm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || $.trigger(this._element, this.constructor.eventName(Om)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(er), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        $.off(i, "mouseover", Er);
    this._activeTrigger[Tm] = !1, this._activeTrigger[Vo] = !1, this._activeTrigger[ti] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), $.trigger(this._element, this.constructor.eventName(Nm)));
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
    s.classList.remove(jo, er), s.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Tf(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(jo), s;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new ym({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [wm]: this._getTitle()
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
    return this._config.animation || this.tip && this.tip.classList.contains(jo);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(er);
  }
  _createPopper(t) {
    const s = Ht(this._config.placement, [this, t, this._element]), n = Rm[s.toUpperCase()];
    return Ya(this._element, t, this._getPopperConfig(n));
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((s) => Number.parseInt(s, 10)) : typeof t == "function" ? (s) => t(s, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return Ht(t, [this._element]);
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
      ...Ht(this._config.popperConfig, [s])
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const s of t)
      if (s === "click")
        $.on(this._element, this.constructor.eventName(Lm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (s !== Am) {
        const n = s === ti ? this.constructor.eventName($m) : this.constructor.eventName(Im), i = s === ti ? this.constructor.eventName(Mm) : this.constructor.eventName(xm);
        $.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Vo : ti] = !0, o._enter();
        }), $.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Vo : ti] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, $.on(this._element.closest(tc), ec, this._hideModalHandler);
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
    const s = Ke.getDataAttributes(this._element);
    for (const n of Object.keys(s))
      _m.has(n) && delete s[n];
    return t = {
      ...s,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : ds(t.container), typeof t.delay == "number" && (t.delay = {
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
      const s = fd.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
};
re(Rr);
const Bm = "popover", Pm = ".popover-header", jm = ".popover-body", Vm = {
  ...Rr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Um = {
  ...Rr.DefaultType,
  content: "(null|string|element|function)"
};
class Ja extends Rr {
  // Getters
  static get Default() {
    return Vm;
  }
  static get DefaultType() {
    return Um;
  }
  static get NAME() {
    return Bm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Pm]: this._getTitle(),
      [jm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ja.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
re(Ja);
const Fm = "scrollspy", Hm = "bs.scrollspy", tl = `.${Hm}`, zm = ".data-api", Wm = `activate${tl}`, sc = `click${tl}`, Km = `load${tl}${zm}`, Gm = "dropdown-item", rn = "active", Ym = '[data-bs-spy="scroll"]', Uo = "[href]", Xm = ".nav, .list-group", nc = ".nav-link", Zm = ".nav-item", Qm = ".list-group-item", Jm = `${nc}, ${Zm} > ${nc}, ${Qm}`, tb = ".dropdown", eb = ".dropdown-toggle", sb = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, nb = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Dr extends me {
  constructor(t, s) {
    super(t, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return sb;
  }
  static get DefaultType() {
    return nb;
  }
  static get NAME() {
    return Fm;
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
    return t.target = ds(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((s) => Number.parseFloat(s))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && ($.off(this._config.target, sc), $.on(this._config.target, sc, Uo, (t) => {
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
    const t = Z.find(Uo, this._config.target);
    for (const s of t) {
      if (!s.hash || hs(s))
        continue;
      const n = Z.findOne(decodeURI(s.hash), this._element);
      $n(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(rn), this._activateParents(t), $.trigger(this._element, Wm, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Gm)) {
      Z.findOne(eb, t.closest(tb)).classList.add(rn);
      return;
    }
    for (const s of Z.parents(t, Xm))
      for (const n of Z.prev(s, Jm))
        n.classList.add(rn);
  }
  _clearActiveClass(t) {
    t.classList.remove(rn);
    const s = Z.find(`${Uo}.${rn}`, t);
    for (const n of s)
      n.classList.remove(rn);
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
$.on(window, Km, () => {
  for (const e of Z.find(Ym))
    Dr.getOrCreateInstance(e);
});
re(Dr);
const ib = "tab", rb = "bs.tab", js = `.${rb}`, ob = `hide${js}`, ab = `hidden${js}`, lb = `show${js}`, cb = `shown${js}`, ub = `click${js}`, db = `keydown${js}`, hb = `load${js}`, fb = "ArrowLeft", ic = "ArrowRight", pb = "ArrowUp", rc = "ArrowDown", Fo = "Home", oc = "End", Is = "active", ac = "fade", Ho = "show", gb = "dropdown", pd = ".dropdown-toggle", mb = ".dropdown-menu", zo = `:not(${pd})`, bb = '.list-group, .nav, [role="tablist"]', yb = ".nav-item, .list-group-item", vb = `.nav-link${zo}, .list-group-item${zo}, [role="tab"]${zo}`, gd = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Wo = `${vb}, ${gd}`, _b = `.${Is}[data-bs-toggle="tab"], .${Is}[data-bs-toggle="pill"], .${Is}[data-bs-toggle="list"]`;
class Nn extends me {
  constructor(t) {
    super(t), this._parent = this._element.closest(bb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), $.on(this._element, db, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return ib;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const s = this._getActiveElem(), n = s ? $.trigger(s, ob, {
      relatedTarget: t
    }) : null;
    $.trigger(t, lb, {
      relatedTarget: s
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(s, t), this._activate(t, s));
  }
  // Private
  _activate(t, s) {
    if (!t)
      return;
    t.classList.add(Is), this._activate(Z.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Ho);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), $.trigger(t, cb, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(ac));
  }
  _deactivate(t, s) {
    if (!t)
      return;
    t.classList.remove(Is), t.blur(), this._deactivate(Z.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Ho);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), $.trigger(t, ab, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(ac));
  }
  _keydown(t) {
    if (![fb, ic, pb, rc, Fo, oc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const s = this._getChildren().filter((i) => !hs(i));
    let n;
    if ([Fo, oc].includes(t.key))
      n = s[t.key === Fo ? 0 : s.length - 1];
    else {
      const i = [ic, rc].includes(t.key);
      n = Xa(s, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), Nn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return Z.find(Wo, this._parent);
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
    const s = Z.getElementFromSelector(t);
    s && (this._setAttributeIfNotExists(s, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(s, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, s) {
    const n = this._getOuterElement(t);
    if (!n.classList.contains(gb))
      return;
    const i = (r, o) => {
      const l = Z.findOne(r, n);
      l && l.classList.toggle(o, s);
    };
    i(pd, Is), i(mb, Ho), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(t, s, n) {
    t.hasAttribute(s) || t.setAttribute(s, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Is);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Wo) ? t : Z.findOne(Wo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(yb) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Nn.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
$.on(document, ub, gd, function(e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !hs(this) && Nn.getOrCreateInstance(this).show();
});
$.on(window, hb, () => {
  for (const e of Z.find(_b))
    Nn.getOrCreateInstance(e);
});
re(Nn);
const Eb = "toast", wb = "bs.toast", bs = `.${wb}`, Tb = `mouseover${bs}`, Ab = `mouseout${bs}`, Ob = `focusin${bs}`, Nb = `focusout${bs}`, kb = `hide${bs}`, Cb = `hidden${bs}`, Sb = `show${bs}`, Lb = `shown${bs}`, Ib = "fade", lc = "hide", sr = "show", nr = "showing", xb = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, $b = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class qr extends me {
  constructor(t, s) {
    super(t, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return $b;
  }
  static get DefaultType() {
    return xb;
  }
  static get NAME() {
    return Eb;
  }
  // Public
  show() {
    if ($.trigger(this._element, Sb).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(Ib);
    const s = () => {
      this._element.classList.remove(nr), $.trigger(this._element, Lb), this._maybeScheduleHide();
    };
    this._element.classList.remove(lc), Ti(this._element), this._element.classList.add(sr, nr), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || $.trigger(this._element, kb).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(lc), this._element.classList.remove(nr, sr), $.trigger(this._element, Cb);
    };
    this._element.classList.add(nr), this._queueCallback(s, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(sr), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(sr);
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
    $.on(this._element, Tb, (t) => this._onInteraction(t, !0)), $.on(this._element, Ab, (t) => this._onInteraction(t, !1)), $.on(this._element, Ob, (t) => this._onInteraction(t, !0)), $.on(this._element, Nb, (t) => this._onInteraction(t, !1));
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
re(qr);
function el(e) {
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
function Vs(e, t, s, n) {
  try {
    return typeof e == "function" ? e(t, s, n) : e;
  } catch (i) {
    return console.error(i), null;
  }
}
async function mn(e) {
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
function bn(e, t) {
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
function Fe(e, t, s, n) {
  return t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), n && n.header && n.header[0] && (t.options.headers[n.header[0]] = n.header[1]), t.options.body = void 0, t.options.method = e, s && Object.assign(t.options, s), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function He(e, t, s, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (s ? "/" + s : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function ei(e, t = "-") {
  return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Mb(e) {
  let t = [];
  for (let s of e)
    t.push(Ar(s));
  return t;
}
function Ar(e, t = "", s = {}) {
  for (let n in e) {
    let i = t ? t + "." + n : n;
    typeof e[n] == "object" && !Array.isArray(e[n]) ? Ar(e[n], i, s) : s[i] = e[n];
  }
  return s;
}
function Rb(e) {
  let t = {};
  for (let s in e) {
    let n = s.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? e[s] : {} : []), t);
  }
  return t;
}
function ki(e, t, s, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (l, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][e] ? i(e, s) : i(t[n][e]);
}
function Db(e, t, s = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(s), i = e.map(
    (r) => t.map((o) => {
      let l = r[o.name];
      return o.template ? o.template(l, r, e) : l !== void 0 ? l : "";
    }).join(s)
  );
  return [n, ...i].join(`
`);
}
function qb(e, t = "export.csv") {
  e = "\uFEFF" + e;
  const s = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(s), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function Bb(e) {
  return [...new Set(e)];
}
function md(e, t) {
  e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function bd(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 && e.push(s.value);
}
function yd(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 ? e.push(s.value) : e.splice(e.indexOf(s.value), 1);
}
function vd(e) {
  e.length = 0;
}
function sl(e, t) {
  t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function nl(e, t) {
  t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Pb(e, t) {
  Object.keys(e).forEach((s) => {
    typeof e[s] == "function" && (e[s] = e[s](t));
  });
}
var _d = typeof global == "object" && global && global.Object === Object && global, jb = typeof self == "object" && self && self.Object === Object && self, Re = _d || jb || Function("return this")(), ps = Re.Symbol, Ed = Object.prototype, Vb = Ed.hasOwnProperty, Ub = Ed.toString, si = ps ? ps.toStringTag : void 0;
function Fb(e) {
  var t = Vb.call(e, si), s = e[si];
  try {
    e[si] = void 0;
    var n = !0;
  } catch {
  }
  var i = Ub.call(e);
  return n && (t ? e[si] = s : delete e[si]), i;
}
var Hb = Object.prototype, zb = Hb.toString;
function Wb(e) {
  return zb.call(e);
}
var Kb = "[object Null]", Gb = "[object Undefined]", cc = ps ? ps.toStringTag : void 0;
function Rn(e) {
  return e == null ? e === void 0 ? Gb : Kb : cc && cc in Object(e) ? Fb(e) : Wb(e);
}
function Ye(e) {
  return e != null && typeof e == "object";
}
var Ds = Array.isArray;
function ys(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function wd(e) {
  return e;
}
var Yb = "[object AsyncFunction]", Xb = "[object Function]", Zb = "[object GeneratorFunction]", Qb = "[object Proxy]";
function il(e) {
  if (!ys(e))
    return !1;
  var t = Rn(e);
  return t == Xb || t == Zb || t == Yb || t == Qb;
}
var Ko = Re["__core-js_shared__"], uc = function() {
  var e = /[^.]+$/.exec(Ko && Ko.keys && Ko.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Jb(e) {
  return !!uc && uc in e;
}
var t1 = Function.prototype, e1 = t1.toString;
function Us(e) {
  if (e != null) {
    try {
      return e1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var s1 = /[\\^$.*+?()[\]{}|]/g, n1 = /^\[object .+?Constructor\]$/, i1 = Function.prototype, r1 = Object.prototype, o1 = i1.toString, a1 = r1.hasOwnProperty, l1 = RegExp(
  "^" + o1.call(a1).replace(s1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function c1(e) {
  if (!ys(e) || Jb(e))
    return !1;
  var t = il(e) ? l1 : n1;
  return t.test(Us(e));
}
function u1(e, t) {
  return e == null ? void 0 : e[t];
}
function Fs(e, t) {
  var s = u1(e, t);
  return c1(s) ? s : void 0;
}
var pa = Fs(Re, "WeakMap"), dc = Object.create, d1 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!ys(t))
      return {};
    if (dc)
      return dc(t);
    e.prototype = t;
    var s = new e();
    return e.prototype = void 0, s;
  };
}();
function h1(e, t, s) {
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
function Td(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var f1 = 800, p1 = 16, g1 = Date.now;
function m1(e) {
  var t = 0, s = 0;
  return function() {
    var n = g1(), i = p1 - (n - s);
    if (s = n, i > 0) {
      if (++t >= f1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function b1(e) {
  return function() {
    return e;
  };
}
var Or = function() {
  try {
    var e = Fs(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), y1 = Or ? function(e, t) {
  return Or(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: b1(t),
    writable: !0
  });
} : wd, v1 = m1(y1);
function _1(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var E1 = 9007199254740991, w1 = /^(?:0|[1-9]\d*)$/;
function Ad(e, t) {
  var s = typeof e;
  return t = t ?? E1, !!t && (s == "number" || s != "symbol" && w1.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function rl(e, t, s) {
  t == "__proto__" && Or ? Or(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
function Ci(e, t) {
  return e === t || e !== e && t !== t;
}
var T1 = Object.prototype, A1 = T1.hasOwnProperty;
function Od(e, t, s) {
  var n = e[t];
  (!(A1.call(e, t) && Ci(n, s)) || s === void 0 && !(t in e)) && rl(e, t, s);
}
function Si(e, t, s, n) {
  var i = !s;
  s || (s = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var l = t[r], a = void 0;
    a === void 0 && (a = e[l]), i ? rl(s, l, a) : Od(s, l, a);
  }
  return s;
}
var hc = Math.max;
function O1(e, t, s) {
  return t = hc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = hc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var l = Array(t + 1); ++i < t; )
      l[i] = n[i];
    return l[t] = s(o), h1(e, this, l);
  };
}
function N1(e, t) {
  return v1(O1(e, t, wd), e + "");
}
var k1 = 9007199254740991;
function Nd(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= k1;
}
function Pr(e) {
  return e != null && Nd(e.length) && !il(e);
}
function C1(e, t, s) {
  if (!ys(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? Pr(s) && Ad(t, s.length) : n == "string" && t in s) ? Ci(s[t], e) : !1;
}
function S1(e) {
  return N1(function(t, s) {
    var n = -1, i = s.length, r = i > 1 ? s[i - 1] : void 0, o = i > 2 ? s[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && C1(s[0], s[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var l = s[n];
      l && e(t, l, n, r);
    }
    return t;
  });
}
var L1 = Object.prototype;
function ol(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || L1;
  return e === s;
}
function I1(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var x1 = "[object Arguments]";
function fc(e) {
  return Ye(e) && Rn(e) == x1;
}
var kd = Object.prototype, $1 = kd.hasOwnProperty, M1 = kd.propertyIsEnumerable, ga = fc(/* @__PURE__ */ function() {
  return arguments;
}()) ? fc : function(e) {
  return Ye(e) && $1.call(e, "callee") && !M1.call(e, "callee");
};
function R1() {
  return !1;
}
var Cd = typeof exports == "object" && exports && !exports.nodeType && exports, pc = Cd && typeof module == "object" && module && !module.nodeType && module, D1 = pc && pc.exports === Cd, gc = D1 ? Re.Buffer : void 0, q1 = gc ? gc.isBuffer : void 0, gi = q1 || R1, B1 = "[object Arguments]", P1 = "[object Array]", j1 = "[object Boolean]", V1 = "[object Date]", U1 = "[object Error]", F1 = "[object Function]", H1 = "[object Map]", z1 = "[object Number]", W1 = "[object Object]", K1 = "[object RegExp]", G1 = "[object Set]", Y1 = "[object String]", X1 = "[object WeakMap]", Z1 = "[object ArrayBuffer]", Q1 = "[object DataView]", J1 = "[object Float32Array]", ty = "[object Float64Array]", ey = "[object Int8Array]", sy = "[object Int16Array]", ny = "[object Int32Array]", iy = "[object Uint8Array]", ry = "[object Uint8ClampedArray]", oy = "[object Uint16Array]", ay = "[object Uint32Array]", Tt = {};
Tt[J1] = Tt[ty] = Tt[ey] = Tt[sy] = Tt[ny] = Tt[iy] = Tt[ry] = Tt[oy] = Tt[ay] = !0;
Tt[B1] = Tt[P1] = Tt[Z1] = Tt[j1] = Tt[Q1] = Tt[V1] = Tt[U1] = Tt[F1] = Tt[H1] = Tt[z1] = Tt[W1] = Tt[K1] = Tt[G1] = Tt[Y1] = Tt[X1] = !1;
function ly(e) {
  return Ye(e) && Nd(e.length) && !!Tt[Rn(e)];
}
function al(e) {
  return function(t) {
    return e(t);
  };
}
var Sd = typeof exports == "object" && exports && !exports.nodeType && exports, ui = Sd && typeof module == "object" && module && !module.nodeType && module, cy = ui && ui.exports === Sd, Go = cy && _d.process, kn = function() {
  try {
    var e = ui && ui.require && ui.require("util").types;
    return e || Go && Go.binding && Go.binding("util");
  } catch {
  }
}(), mc = kn && kn.isTypedArray, ll = mc ? al(mc) : ly, uy = Object.prototype, dy = uy.hasOwnProperty;
function Ld(e, t) {
  var s = Ds(e), n = !s && ga(e), i = !s && !n && gi(e), r = !s && !n && !i && ll(e), o = s || n || i || r, l = o ? I1(e.length, String) : [], a = l.length;
  for (var u in e)
    (t || dy.call(e, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Ad(u, a))) && l.push(u);
  return l;
}
function Id(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var hy = Id(Object.keys, Object), fy = Object.prototype, py = fy.hasOwnProperty;
function gy(e) {
  if (!ol(e))
    return hy(e);
  var t = [];
  for (var s in Object(e))
    py.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
function cl(e) {
  return Pr(e) ? Ld(e) : gy(e);
}
function my(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var by = Object.prototype, yy = by.hasOwnProperty;
function vy(e) {
  if (!ys(e))
    return my(e);
  var t = ol(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !yy.call(e, n)) || s.push(n);
  return s;
}
function Li(e) {
  return Pr(e) ? Ld(e, !0) : vy(e);
}
var mi = Fs(Object, "create");
function _y() {
  this.__data__ = mi ? mi(null) : {}, this.size = 0;
}
function Ey(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var wy = "__lodash_hash_undefined__", Ty = Object.prototype, Ay = Ty.hasOwnProperty;
function Oy(e) {
  var t = this.__data__;
  if (mi) {
    var s = t[e];
    return s === wy ? void 0 : s;
  }
  return Ay.call(t, e) ? t[e] : void 0;
}
var Ny = Object.prototype, ky = Ny.hasOwnProperty;
function Cy(e) {
  var t = this.__data__;
  return mi ? t[e] !== void 0 : ky.call(t, e);
}
var Sy = "__lodash_hash_undefined__";
function Ly(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = mi && t === void 0 ? Sy : t, this;
}
function qs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
qs.prototype.clear = _y;
qs.prototype.delete = Ey;
qs.prototype.get = Oy;
qs.prototype.has = Cy;
qs.prototype.set = Ly;
function Iy() {
  this.__data__ = [], this.size = 0;
}
function jr(e, t) {
  for (var s = e.length; s--; )
    if (Ci(e[s][0], t))
      return s;
  return -1;
}
var xy = Array.prototype, $y = xy.splice;
function My(e) {
  var t = this.__data__, s = jr(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : $y.call(t, s, 1), --this.size, !0;
}
function Ry(e) {
  var t = this.__data__, s = jr(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function Dy(e) {
  return jr(this.__data__, e) > -1;
}
function qy(e, t) {
  var s = this.__data__, n = jr(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function Je(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Je.prototype.clear = Iy;
Je.prototype.delete = My;
Je.prototype.get = Ry;
Je.prototype.has = Dy;
Je.prototype.set = qy;
var bi = Fs(Re, "Map");
function By() {
  this.size = 0, this.__data__ = {
    hash: new qs(),
    map: new (bi || Je)(),
    string: new qs()
  };
}
function Py(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Vr(e, t) {
  var s = e.__data__;
  return Py(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function jy(e) {
  var t = Vr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Vy(e) {
  return Vr(this, e).get(e);
}
function Uy(e) {
  return Vr(this, e).has(e);
}
function Fy(e, t) {
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
Hs.prototype.clear = By;
Hs.prototype.delete = jy;
Hs.prototype.get = Vy;
Hs.prototype.has = Uy;
Hs.prototype.set = Fy;
function xd(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var ul = Id(Object.getPrototypeOf, Object), Hy = "[object Object]", zy = Function.prototype, Wy = Object.prototype, $d = zy.toString, Ky = Wy.hasOwnProperty, Gy = $d.call(Object);
function Yy(e) {
  if (!Ye(e) || Rn(e) != Hy)
    return !1;
  var t = ul(e);
  if (t === null)
    return !0;
  var s = Ky.call(t, "constructor") && t.constructor;
  return typeof s == "function" && s instanceof s && $d.call(s) == Gy;
}
function Xy() {
  this.__data__ = new Je(), this.size = 0;
}
function Zy(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
function Qy(e) {
  return this.__data__.get(e);
}
function Jy(e) {
  return this.__data__.has(e);
}
var tv = 200;
function ev(e, t) {
  var s = this.__data__;
  if (s instanceof Je) {
    var n = s.__data__;
    if (!bi || n.length < tv - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new Hs(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
function Le(e) {
  var t = this.__data__ = new Je(e);
  this.size = t.size;
}
Le.prototype.clear = Xy;
Le.prototype.delete = Zy;
Le.prototype.get = Qy;
Le.prototype.has = Jy;
Le.prototype.set = ev;
function sv(e, t) {
  return e && Si(t, cl(t), e);
}
function nv(e, t) {
  return e && Si(t, Li(t), e);
}
var Md = typeof exports == "object" && exports && !exports.nodeType && exports, bc = Md && typeof module == "object" && module && !module.nodeType && module, iv = bc && bc.exports === Md, yc = iv ? Re.Buffer : void 0, vc = yc ? yc.allocUnsafe : void 0;
function Rd(e, t) {
  if (t)
    return e.slice();
  var s = e.length, n = vc ? vc(s) : new e.constructor(s);
  return e.copy(n), n;
}
function rv(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var o = e[s];
    t(o, s, e) && (r[i++] = o);
  }
  return r;
}
function Dd() {
  return [];
}
var ov = Object.prototype, av = ov.propertyIsEnumerable, _c = Object.getOwnPropertySymbols, dl = _c ? function(e) {
  return e == null ? [] : (e = Object(e), rv(_c(e), function(t) {
    return av.call(e, t);
  }));
} : Dd;
function lv(e, t) {
  return Si(e, dl(e), t);
}
var cv = Object.getOwnPropertySymbols, qd = cv ? function(e) {
  for (var t = []; e; )
    xd(t, dl(e)), e = ul(e);
  return t;
} : Dd;
function uv(e, t) {
  return Si(e, qd(e), t);
}
function Bd(e, t, s) {
  var n = t(e);
  return Ds(e) ? n : xd(n, s(e));
}
function ma(e) {
  return Bd(e, cl, dl);
}
function dv(e) {
  return Bd(e, Li, qd);
}
var ba = Fs(Re, "DataView"), ya = Fs(Re, "Promise"), va = Fs(Re, "Set"), Ec = "[object Map]", hv = "[object Object]", wc = "[object Promise]", Tc = "[object Set]", Ac = "[object WeakMap]", Oc = "[object DataView]", fv = Us(ba), pv = Us(bi), gv = Us(ya), mv = Us(va), bv = Us(pa), ue = Rn;
(ba && ue(new ba(new ArrayBuffer(1))) != Oc || bi && ue(new bi()) != Ec || ya && ue(ya.resolve()) != wc || va && ue(new va()) != Tc || pa && ue(new pa()) != Ac) && (ue = function(e) {
  var t = Rn(e), s = t == hv ? e.constructor : void 0, n = s ? Us(s) : "";
  if (n)
    switch (n) {
      case fv:
        return Oc;
      case pv:
        return Ec;
      case gv:
        return wc;
      case mv:
        return Tc;
      case bv:
        return Ac;
    }
  return t;
});
var yv = Object.prototype, vv = yv.hasOwnProperty;
function _v(e) {
  var t = e.length, s = new e.constructor(t);
  return t && typeof e[0] == "string" && vv.call(e, "index") && (s.index = e.index, s.input = e.input), s;
}
var Nr = Re.Uint8Array;
function hl(e) {
  var t = new e.constructor(e.byteLength);
  return new Nr(t).set(new Nr(e)), t;
}
function Ev(e, t) {
  var s = t ? hl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.byteLength);
}
var wv = /\w*$/;
function Tv(e) {
  var t = new e.constructor(e.source, wv.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Nc = ps ? ps.prototype : void 0, kc = Nc ? Nc.valueOf : void 0;
function Av(e) {
  return kc ? Object(kc.call(e)) : {};
}
function Pd(e, t) {
  var s = t ? hl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.length);
}
var Ov = "[object Boolean]", Nv = "[object Date]", kv = "[object Map]", Cv = "[object Number]", Sv = "[object RegExp]", Lv = "[object Set]", Iv = "[object String]", xv = "[object Symbol]", $v = "[object ArrayBuffer]", Mv = "[object DataView]", Rv = "[object Float32Array]", Dv = "[object Float64Array]", qv = "[object Int8Array]", Bv = "[object Int16Array]", Pv = "[object Int32Array]", jv = "[object Uint8Array]", Vv = "[object Uint8ClampedArray]", Uv = "[object Uint16Array]", Fv = "[object Uint32Array]";
function Hv(e, t, s) {
  var n = e.constructor;
  switch (t) {
    case $v:
      return hl(e);
    case Ov:
    case Nv:
      return new n(+e);
    case Mv:
      return Ev(e, s);
    case Rv:
    case Dv:
    case qv:
    case Bv:
    case Pv:
    case jv:
    case Vv:
    case Uv:
    case Fv:
      return Pd(e, s);
    case kv:
      return new n();
    case Cv:
    case Iv:
      return new n(e);
    case Sv:
      return Tv(e);
    case Lv:
      return new n();
    case xv:
      return Av(e);
  }
}
function jd(e) {
  return typeof e.constructor == "function" && !ol(e) ? d1(ul(e)) : {};
}
var zv = "[object Map]";
function Wv(e) {
  return Ye(e) && ue(e) == zv;
}
var Cc = kn && kn.isMap, Kv = Cc ? al(Cc) : Wv, Gv = "[object Set]";
function Yv(e) {
  return Ye(e) && ue(e) == Gv;
}
var Sc = kn && kn.isSet, Xv = Sc ? al(Sc) : Yv, Zv = 1, Qv = 2, Jv = 4, Vd = "[object Arguments]", t0 = "[object Array]", e0 = "[object Boolean]", s0 = "[object Date]", n0 = "[object Error]", Ud = "[object Function]", i0 = "[object GeneratorFunction]", r0 = "[object Map]", o0 = "[object Number]", Fd = "[object Object]", a0 = "[object RegExp]", l0 = "[object Set]", c0 = "[object String]", u0 = "[object Symbol]", d0 = "[object WeakMap]", h0 = "[object ArrayBuffer]", f0 = "[object DataView]", p0 = "[object Float32Array]", g0 = "[object Float64Array]", m0 = "[object Int8Array]", b0 = "[object Int16Array]", y0 = "[object Int32Array]", v0 = "[object Uint8Array]", _0 = "[object Uint8ClampedArray]", E0 = "[object Uint16Array]", w0 = "[object Uint32Array]", wt = {};
wt[Vd] = wt[t0] = wt[h0] = wt[f0] = wt[e0] = wt[s0] = wt[p0] = wt[g0] = wt[m0] = wt[b0] = wt[y0] = wt[r0] = wt[o0] = wt[Fd] = wt[a0] = wt[l0] = wt[c0] = wt[u0] = wt[v0] = wt[_0] = wt[E0] = wt[w0] = !0;
wt[n0] = wt[Ud] = wt[d0] = !1;
function br(e, t, s, n, i, r) {
  var o, l = t & Zv, a = t & Qv, u = t & Jv;
  if (o !== void 0)
    return o;
  if (!ys(e))
    return e;
  var h = Ds(e);
  if (h) {
    if (o = _v(e), !l)
      return Td(e, o);
  } else {
    var d = ue(e), b = d == Ud || d == i0;
    if (gi(e))
      return Rd(e, l);
    if (d == Fd || d == Vd || b && !i) {
      if (o = a || b ? {} : jd(e), !l)
        return a ? uv(e, nv(o, e)) : lv(e, sv(o, e));
    } else {
      if (!wt[d])
        return i ? e : {};
      o = Hv(e, d, l);
    }
  }
  r || (r = new Le());
  var y = r.get(e);
  if (y)
    return y;
  r.set(e, o), Xv(e) ? e.forEach(function(O) {
    o.add(br(O, t, s, O, e, r));
  }) : Kv(e) && e.forEach(function(O, N) {
    o.set(N, br(O, t, s, N, e, r));
  });
  var w = u ? a ? dv : ma : a ? Li : cl, A = h ? void 0 : w(e);
  return _1(A || e, function(O, N) {
    A && (N = O, O = e[N]), Od(o, N, br(O, t, s, N, e, r));
  }), o;
}
var T0 = 1, A0 = 4;
function yn(e) {
  return br(e, T0 | A0);
}
var O0 = "__lodash_hash_undefined__";
function N0(e) {
  return this.__data__.set(e, O0), this;
}
function k0(e) {
  return this.__data__.has(e);
}
function kr(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new Hs(); ++t < s; )
    this.add(e[t]);
}
kr.prototype.add = kr.prototype.push = N0;
kr.prototype.has = k0;
function C0(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
function S0(e, t) {
  return e.has(t);
}
var L0 = 1, I0 = 2;
function Hd(e, t, s, n, i, r) {
  var o = s & L0, l = e.length, a = t.length;
  if (l != a && !(o && a > l))
    return !1;
  var u = r.get(e), h = r.get(t);
  if (u && h)
    return u == t && h == e;
  var d = -1, b = !0, y = s & I0 ? new kr() : void 0;
  for (r.set(e, t), r.set(t, e); ++d < l; ) {
    var w = e[d], A = t[d];
    if (n)
      var O = o ? n(A, w, d, t, e, r) : n(w, A, d, e, t, r);
    if (O !== void 0) {
      if (O)
        continue;
      b = !1;
      break;
    }
    if (y) {
      if (!C0(t, function(N, M) {
        if (!S0(y, M) && (w === N || i(w, N, s, n, r)))
          return y.push(M);
      })) {
        b = !1;
        break;
      }
    } else if (!(w === A || i(w, A, s, n, r))) {
      b = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), b;
}
function x0(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
function $0(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var M0 = 1, R0 = 2, D0 = "[object Boolean]", q0 = "[object Date]", B0 = "[object Error]", P0 = "[object Map]", j0 = "[object Number]", V0 = "[object RegExp]", U0 = "[object Set]", F0 = "[object String]", H0 = "[object Symbol]", z0 = "[object ArrayBuffer]", W0 = "[object DataView]", Lc = ps ? ps.prototype : void 0, Yo = Lc ? Lc.valueOf : void 0;
function K0(e, t, s, n, i, r, o) {
  switch (s) {
    case W0:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case z0:
      return !(e.byteLength != t.byteLength || !r(new Nr(e), new Nr(t)));
    case D0:
    case q0:
    case j0:
      return Ci(+e, +t);
    case B0:
      return e.name == t.name && e.message == t.message;
    case V0:
    case F0:
      return e == t + "";
    case P0:
      var l = x0;
    case U0:
      var a = n & M0;
      if (l || (l = $0), e.size != t.size && !a)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      n |= R0, o.set(e, t);
      var h = Hd(l(e), l(t), n, i, r, o);
      return o.delete(e), h;
    case H0:
      if (Yo)
        return Yo.call(e) == Yo.call(t);
  }
  return !1;
}
var G0 = 1, Y0 = Object.prototype, X0 = Y0.hasOwnProperty;
function Z0(e, t, s, n, i, r) {
  var o = s & G0, l = ma(e), a = l.length, u = ma(t), h = u.length;
  if (a != h && !o)
    return !1;
  for (var d = a; d--; ) {
    var b = l[d];
    if (!(o ? b in t : X0.call(t, b)))
      return !1;
  }
  var y = r.get(e), w = r.get(t);
  if (y && w)
    return y == t && w == e;
  var A = !0;
  r.set(e, t), r.set(t, e);
  for (var O = o; ++d < a; ) {
    b = l[d];
    var N = e[b], M = t[b];
    if (n)
      var B = o ? n(M, N, b, t, e, r) : n(N, M, b, e, t, r);
    if (!(B === void 0 ? N === M || i(N, M, s, n, r) : B)) {
      A = !1;
      break;
    }
    O || (O = b == "constructor");
  }
  if (A && !O) {
    var P = e.constructor, j = t.constructor;
    P != j && "constructor" in e && "constructor" in t && !(typeof P == "function" && P instanceof P && typeof j == "function" && j instanceof j) && (A = !1);
  }
  return r.delete(e), r.delete(t), A;
}
var Q0 = 1, Ic = "[object Arguments]", xc = "[object Array]", ir = "[object Object]", J0 = Object.prototype, $c = J0.hasOwnProperty;
function t_(e, t, s, n, i, r) {
  var o = Ds(e), l = Ds(t), a = o ? xc : ue(e), u = l ? xc : ue(t);
  a = a == Ic ? ir : a, u = u == Ic ? ir : u;
  var h = a == ir, d = u == ir, b = a == u;
  if (b && gi(e)) {
    if (!gi(t))
      return !1;
    o = !0, h = !1;
  }
  if (b && !h)
    return r || (r = new Le()), o || ll(e) ? Hd(e, t, s, n, i, r) : K0(e, t, a, s, n, i, r);
  if (!(s & Q0)) {
    var y = h && $c.call(e, "__wrapped__"), w = d && $c.call(t, "__wrapped__");
    if (y || w) {
      var A = y ? e.value() : e, O = w ? t.value() : t;
      return r || (r = new Le()), i(A, O, s, n, r);
    }
  }
  return b ? (r || (r = new Le()), Z0(e, t, s, n, i, r)) : !1;
}
function zd(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !Ye(e) && !Ye(t) ? e !== e && t !== t : t_(e, t, s, n, zd, i);
}
function e_(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), o = n(t), l = o.length; l--; ) {
      var a = o[++i];
      if (s(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var s_ = e_();
function _a(e, t, s) {
  (s !== void 0 && !Ci(e[t], s) || s === void 0 && !(t in e)) && rl(e, t, s);
}
function n_(e) {
  return Ye(e) && Pr(e);
}
function Ea(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function i_(e) {
  return Si(e, Li(e));
}
function r_(e, t, s, n, i, r, o) {
  var l = Ea(e, s), a = Ea(t, s), u = o.get(a);
  if (u) {
    _a(e, s, u);
    return;
  }
  var h = r ? r(l, a, s + "", e, t, o) : void 0, d = h === void 0;
  if (d) {
    var b = Ds(a), y = !b && gi(a), w = !b && !y && ll(a);
    h = a, b || y || w ? Ds(l) ? h = l : n_(l) ? h = Td(l) : y ? (d = !1, h = Rd(a, !0)) : w ? (d = !1, h = Pd(a, !0)) : h = [] : Yy(a) || ga(a) ? (h = l, ga(l) ? h = i_(l) : (!ys(l) || il(l)) && (h = jd(a))) : d = !1;
  }
  d && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), _a(e, s, h);
}
function Wd(e, t, s, n, i) {
  e !== t && s_(t, function(r, o) {
    if (i || (i = new Le()), ys(r))
      r_(e, t, o, s, Wd, n, i);
    else {
      var l = n ? n(Ea(e, o), r, o + "", e, t, i) : void 0;
      l === void 0 && (l = r), _a(e, o, l);
    }
  }, Li);
}
function fl(e, t) {
  return zd(e, t);
}
var us = S1(function(e, t, s) {
  Wd(e, t, s);
}), G = /* @__PURE__ */ ((e) => (e[e.TYPE = 3] = "TYPE", e[e.LEVEL = 12] = "LEVEL", e[e.ATTRIBUTE = 13] = "ATTRIBUTE", e[e.BLOT = 14] = "BLOT", e[e.INLINE = 7] = "INLINE", e[e.BLOCK = 11] = "BLOCK", e[e.BLOCK_BLOT = 10] = "BLOCK_BLOT", e[e.INLINE_BLOT = 6] = "INLINE_BLOT", e[e.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", e[e.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", e[e.ANY = 15] = "ANY", e))(G || {});
class $e {
  constructor(t, s, n = {}) {
    this.attrName = t, this.keyName = s;
    const i = G.TYPE & G.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & G.LEVEL | i
    ) : G.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
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
class vn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Kd = class wa {
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
      throw new vn(`Unable to create ${s} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      s instanceof Node || s.nodeType === Node.TEXT_NODE ? s : r.create(n)
    ), l = new r(t, o, n);
    return wa.blots.set(l.domNode, l), l;
  }
  find(t, s = !1) {
    return wa.find(t, s);
  }
  query(t, s = G.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & G.LEVEL & G.BLOCK ? n = this.types.block : t & G.LEVEL & G.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && s & G.LEVEL & n.scope && s & G.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((s) => {
      const n = "blotName" in s, i = "attrName" in s;
      if (!n && !i)
        throw new vn("Invalid definition");
      if (n && s.blotName === "abstract")
        throw new vn("Cannot register abstract class");
      const r = n ? s.blotName : i ? s.attrName : void 0;
      return this.types[r] = s, i ? typeof s.keyName == "string" && (this.attributes[s.keyName] = s) : n && (s.className && (this.classes[s.className] = s), s.tagName && (Array.isArray(s.tagName) ? s.tagName = s.tagName.map((o) => o.toUpperCase()) : s.tagName = s.tagName.toUpperCase(), (Array.isArray(s.tagName) ? s.tagName : [s.tagName]).forEach((o) => {
        (this.tags[o] == null || s.className == null) && (this.tags[o] = s);
      }))), s;
    });
  }
};
Kd.blots = /* @__PURE__ */ new WeakMap();
let Cn = Kd;
function Mc(e, t) {
  return (e.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class o_ extends $e {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((s) => s.split("-").slice(0, -1).join("-"));
  }
  add(t, s) {
    return this.canAdd(t, s) ? (this.remove(t), t.classList.add(`${this.keyName}-${s}`), !0) : !1;
  }
  remove(t) {
    Mc(t, this.keyName).forEach((s) => {
      t.classList.remove(s);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const s = (Mc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, s) ? s : "";
  }
}
const be = o_;
function Xo(e) {
  const t = e.split("-"), s = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + s;
}
class a_ extends $e {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((s) => s.split(":")[0].trim());
  }
  add(t, s) {
    return this.canAdd(t, s) ? (t.style[Xo(this.keyName)] = s, !0) : !1;
  }
  remove(t) {
    t.style[Xo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const s = t.style[Xo(this.keyName)];
    return this.canAdd(t, s) ? s : "";
  }
}
const vs = a_;
class l_ {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, s) {
    s ? t.add(this.domNode, s) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Cn.find(this.domNode);
    if (t == null)
      return;
    const s = $e.keys(this.domNode), n = be.keys(this.domNode), i = vs.keys(this.domNode);
    s.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, G.ATTRIBUTE);
      o instanceof $e && (this.attributes[o.attrName] = o);
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
const Ur = l_, Gd = class {
  constructor(t, s) {
    this.scroll = t, this.domNode = s, Cn.blots.set(s, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new vn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Cn.blots.delete(this.domNode);
  }
  deleteAt(t, s) {
    this.isolate(t, s).remove();
  }
  formatAt(t, s, n, i) {
    const r = this.isolate(t, s);
    if (this.scroll.query(n, G.BLOT) != null && i)
      r.wrap(n, i);
    else if (this.scroll.query(n, G.ATTRIBUTE) != null) {
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
      throw new vn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Gd.blotName = "abstract";
let Yd = Gd;
const Xd = class extends Yd {
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
Xd.scope = G.INLINE_BLOT;
let c_ = Xd;
const Rt = c_;
class u_ {
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
function Rc(e, t) {
  const s = t.find(e);
  if (s)
    return s;
  try {
    return t.create(e);
  } catch {
    const n = t.create(G.INLINE);
    return Array.from(e.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), e.parentNode && e.parentNode.replaceChild(n.domNode, e), n.attach(), n;
  }
}
const Zd = class rs extends Yd {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, rs.uiClass && this.uiNode.classList.add(rs.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new u_(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const s = Rc(t, this.scroll);
        this.insertBefore(s, this.children.head || void 0);
      } catch (s) {
        if (s instanceof vn)
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
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof rs ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, s = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      s,
      n,
      (o, l, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof rs && (i = i.concat(
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
      ) || (s.statics.scope === G.BLOCK_BLOT ? (s.next != null && this.splitAfter(s), s.prev != null && this.splitAfter(s.prev), s.parent.unwrap(), t = !0) : s instanceof rs ? s.unwrap() : s.remove());
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
    return n instanceof rs ? r.concat(n.path(i, s)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    return n instanceof rs && this.moveChildren(n), super.replaceWith(n);
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
      const l = Rc(r, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Zd.uiClass = "";
let d_ = Zd;
const pe = d_;
function h_(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const cn = class un extends pe {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(un.blotName);
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
        n instanceof un || (n = n.wrap(un.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, G.INLINE);
      if (n == null)
        return;
      n instanceof $e ? this.attributes.attribute(n, s) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s);
    }
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.formats()[n] != null || this.scroll.query(n, G.ATTRIBUTE) ? this.isolate(t, s).format(n, i) : super.formatAt(t, s, n, i);
  }
  optimize(t) {
    super.optimize(t);
    const s = this.formats();
    if (Object.keys(s).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof un && n.prev === this && h_(s, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof un && this.attributes.move(n), n;
  }
};
cn.allowedChildren = [cn, Rt], cn.blotName = "inline", cn.scope = G.INLINE_BLOT, cn.tagName = "SPAN";
let f_ = cn;
const pl = f_, dn = class Ta extends pe {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(Ta.blotName);
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
    const n = this.scroll.query(t, G.BLOCK);
    n != null && (n instanceof $e ? this.attributes.attribute(n, s) : t === this.statics.blotName && !s ? this.replaceWith(Ta.blotName) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s));
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.scroll.query(n, G.BLOCK) != null ? this.format(n, i) : super.formatAt(t, s, n, i);
  }
  insertAt(t, s, n) {
    if (n == null || this.scroll.query(s, G.INLINE) != null)
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
dn.blotName = "block", dn.scope = G.BLOCK_BLOT, dn.tagName = "P", dn.allowedChildren = [
  pl,
  dn,
  Rt
];
let p_ = dn;
const yi = p_, Aa = class extends pe {
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
Aa.blotName = "container", Aa.scope = G.BLOCK_BLOT;
let g_ = Aa;
const Fr = g_;
class m_ extends Rt {
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
const Gt = m_, b_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, y_ = 100, hn = class extends pe {
  constructor(t, s) {
    super(null, s), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, b_), this.attach();
  }
  create(t, s) {
    return this.registry.create(this, t, s);
  }
  find(t, s = !1) {
    const n = this.registry.find(t, s);
    return n ? n.scroll === this ? n : s ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, s = G.ANY) {
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
      n.has(a.domNode) && (a instanceof pe && a.children.forEach(o), n.delete(a.domNode), a.optimize(s));
    };
    let l = t;
    for (let a = 0; l.length > 0; a += 1) {
      if (a >= y_)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((u) => {
        const h = this.find(u.target, !0);
        h != null && (h.domNode === u.target && (u.type === "childList" ? (r(this.find(u.previousSibling, !1)), Array.from(u.addedNodes).forEach((d) => {
          const b = this.find(d, !1);
          r(b, !1), b instanceof pe && b.children.forEach((y) => {
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
hn.blotName = "scroll", hn.defaultChild = yi, hn.allowedChildren = [yi, Fr], hn.scope = G.BLOCK_BLOT, hn.tagName = "DIV";
let v_ = hn;
const gl = v_, Oa = class Qd extends Rt {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Qd && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Oa.blotName = "text", Oa.scope = G.INLINE_BLOT;
let __ = Oa;
const Cr = __, E_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: $e,
  AttributorStore: Ur,
  BlockBlot: yi,
  ClassAttributor: be,
  ContainerBlot: Fr,
  EmbedBlot: Gt,
  InlineBlot: pl,
  LeafBlot: Rt,
  ParentBlot: pe,
  Registry: Cn,
  Scope: G,
  ScrollBlot: gl,
  StyleAttributor: vs,
  TextBlot: Cr
}, Symbol.toStringTag, { value: "Module" }));
var as = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Jd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var rr = { exports: {} }, Zo, Dc;
function w_() {
  if (Dc) return Zo;
  Dc = 1;
  var e = -1, t = 1, s = 0;
  function n(v, x, T, q, D) {
    if (v === x)
      return v ? [[s, v]] : [];
    if (T != null) {
      var L = vt(v, x, T);
      if (L)
        return L;
    }
    var R = l(v, x), F = v.substring(0, R);
    v = v.substring(R), x = x.substring(R), R = u(v, x);
    var z = v.substring(v.length - R);
    v = v.substring(0, v.length - R), x = x.substring(0, x.length - R);
    var V = i(v, x);
    return F && V.unshift([s, F]), z && V.push([s, z]), M(V, D), q && d(V), V;
  }
  function i(v, x) {
    var T;
    if (!v)
      return [[t, x]];
    if (!x)
      return [[e, v]];
    var q = v.length > x.length ? v : x, D = v.length > x.length ? x : v, L = q.indexOf(D);
    if (L !== -1)
      return T = [
        [t, q.substring(0, L)],
        [s, D],
        [t, q.substring(L + D.length)]
      ], v.length > x.length && (T[0][0] = T[2][0] = e), T;
    if (D.length === 1)
      return [
        [e, v],
        [t, x]
      ];
    var R = h(v, x);
    if (R) {
      var F = R[0], z = R[1], V = R[2], nt = R[3], Q = R[4], at = n(F, V), rt = n(z, nt);
      return at.concat([[s, Q]], rt);
    }
    return r(v, x);
  }
  function r(v, x) {
    for (var T = v.length, q = x.length, D = Math.ceil((T + q) / 2), L = D, R = 2 * D, F = new Array(R), z = new Array(R), V = 0; V < R; V++)
      F[V] = -1, z[V] = -1;
    F[L + 1] = 0, z[L + 1] = 0;
    for (var nt = T - q, Q = nt % 2 !== 0, at = 0, rt = 0, W = 0, mt = 0, Et = 0; Et < D; Et++) {
      for (var tt = -Et + at; tt <= Et - rt; tt += 2) {
        var ut = L + tt, ft;
        tt === -Et || tt !== Et && F[ut - 1] < F[ut + 1] ? ft = F[ut + 1] : ft = F[ut - 1] + 1;
        for (var dt = ft - tt; ft < T && dt < q && v.charAt(ft) === x.charAt(dt); )
          ft++, dt++;
        if (F[ut] = ft, ft > T)
          rt += 2;
        else if (dt > q)
          at += 2;
        else if (Q) {
          var bt = L + nt - tt;
          if (bt >= 0 && bt < R && z[bt] !== -1) {
            var yt = T - z[bt];
            if (ft >= yt)
              return o(v, x, ft, dt);
          }
        }
      }
      for (var At = -Et + W; At <= Et - mt; At += 2) {
        var bt = L + At, yt;
        At === -Et || At !== Et && z[bt - 1] < z[bt + 1] ? yt = z[bt + 1] : yt = z[bt - 1] + 1;
        for (var kt = yt - At; yt < T && kt < q && v.charAt(T - yt - 1) === x.charAt(q - kt - 1); )
          yt++, kt++;
        if (z[bt] = yt, yt > T)
          mt += 2;
        else if (kt > q)
          W += 2;
        else if (!Q) {
          var ut = L + nt - At;
          if (ut >= 0 && ut < R && F[ut] !== -1) {
            var ft = F[ut], dt = L + ft - ut;
            if (yt = T - yt, ft >= yt)
              return o(v, x, ft, dt);
          }
        }
      }
    }
    return [
      [e, v],
      [t, x]
    ];
  }
  function o(v, x, T, q) {
    var D = v.substring(0, T), L = x.substring(0, q), R = v.substring(T), F = x.substring(q), z = n(D, L), V = n(R, F);
    return z.concat(V);
  }
  function l(v, x) {
    if (!v || !x || v.charAt(0) !== x.charAt(0))
      return 0;
    for (var T = 0, q = Math.min(v.length, x.length), D = q, L = 0; T < D; )
      v.substring(L, D) == x.substring(L, D) ? (T = D, L = T) : q = D, D = Math.floor((q - T) / 2 + T);
    return B(v.charCodeAt(D - 1)) && D--, D;
  }
  function a(v, x) {
    var T = v.length, q = x.length;
    if (T == 0 || q == 0)
      return 0;
    T > q ? v = v.substring(T - q) : T < q && (x = x.substring(0, T));
    var D = Math.min(T, q);
    if (v == x)
      return D;
    for (var L = 0, R = 1; ; ) {
      var F = v.substring(D - R), z = x.indexOf(F);
      if (z == -1)
        return L;
      R += z, (z == 0 || v.substring(D - R) == x.substring(0, R)) && (L = R, R++);
    }
  }
  function u(v, x) {
    if (!v || !x || v.slice(-1) !== x.slice(-1))
      return 0;
    for (var T = 0, q = Math.min(v.length, x.length), D = q, L = 0; T < D; )
      v.substring(v.length - D, v.length - L) == x.substring(x.length - D, x.length - L) ? (T = D, L = T) : q = D, D = Math.floor((q - T) / 2 + T);
    return P(v.charCodeAt(v.length - D)) && D--, D;
  }
  function h(v, x) {
    var T = v.length > x.length ? v : x, q = v.length > x.length ? x : v;
    if (T.length < 4 || q.length * 2 < T.length)
      return null;
    function D(rt, W, mt) {
      for (var Et = rt.substring(mt, mt + Math.floor(rt.length / 4)), tt = -1, ut = "", ft, dt, bt, yt; (tt = W.indexOf(Et, tt + 1)) !== -1; ) {
        var At = l(
          rt.substring(mt),
          W.substring(tt)
        ), kt = u(
          rt.substring(0, mt),
          W.substring(0, tt)
        );
        ut.length < kt + At && (ut = W.substring(tt - kt, tt) + W.substring(tt, tt + At), ft = rt.substring(0, mt - kt), dt = rt.substring(mt + At), bt = W.substring(0, tt - kt), yt = W.substring(tt + At));
      }
      return ut.length * 2 >= rt.length ? [
        ft,
        dt,
        bt,
        yt,
        ut
      ] : null;
    }
    var L = D(
      T,
      q,
      Math.ceil(T.length / 4)
    ), R = D(
      T,
      q,
      Math.ceil(T.length / 2)
    ), F;
    if (!L && !R)
      return null;
    R ? L ? F = L[4].length > R[4].length ? L : R : F = R : F = L;
    var z, V, nt, Q;
    v.length > x.length ? (z = F[0], V = F[1], nt = F[2], Q = F[3]) : (nt = F[0], Q = F[1], z = F[2], V = F[3]);
    var at = F[4];
    return [z, V, nt, Q, at];
  }
  function d(v) {
    for (var x = !1, T = [], q = 0, D = null, L = 0, R = 0, F = 0, z = 0, V = 0; L < v.length; )
      v[L][0] == s ? (T[q++] = L, R = z, F = V, z = 0, V = 0, D = v[L][1]) : (v[L][0] == t ? z += v[L][1].length : V += v[L][1].length, D && D.length <= Math.max(R, F) && D.length <= Math.max(z, V) && (v.splice(T[q - 1], 0, [
        e,
        D
      ]), v[T[q - 1] + 1][0] = t, q--, q--, L = q > 0 ? T[q - 1] : -1, R = 0, F = 0, z = 0, V = 0, D = null, x = !0)), L++;
    for (x && M(v), N(v), L = 1; L < v.length; ) {
      if (v[L - 1][0] == e && v[L][0] == t) {
        var nt = v[L - 1][1], Q = v[L][1], at = a(nt, Q), rt = a(Q, nt);
        at >= rt ? (at >= nt.length / 2 || at >= Q.length / 2) && (v.splice(L, 0, [
          s,
          Q.substring(0, at)
        ]), v[L - 1][1] = nt.substring(
          0,
          nt.length - at
        ), v[L + 1][1] = Q.substring(at), L++) : (rt >= nt.length / 2 || rt >= Q.length / 2) && (v.splice(L, 0, [
          s,
          nt.substring(0, rt)
        ]), v[L - 1][0] = t, v[L - 1][1] = Q.substring(
          0,
          Q.length - rt
        ), v[L + 1][0] = e, v[L + 1][1] = nt.substring(rt), L++), L++;
      }
      L++;
    }
  }
  var b = /[^a-zA-Z0-9]/, y = /\s/, w = /[\r\n]/, A = /\n\r?\n$/, O = /^\r?\n\r?\n/;
  function N(v) {
    function x(rt, W) {
      if (!rt || !W)
        return 6;
      var mt = rt.charAt(rt.length - 1), Et = W.charAt(0), tt = mt.match(b), ut = Et.match(b), ft = tt && mt.match(y), dt = ut && Et.match(y), bt = ft && mt.match(w), yt = dt && Et.match(w), At = bt && rt.match(A), kt = yt && W.match(O);
      return At || kt ? 5 : bt || yt ? 4 : tt && !ft && dt ? 3 : ft || dt ? 2 : tt || ut ? 1 : 0;
    }
    for (var T = 1; T < v.length - 1; ) {
      if (v[T - 1][0] == s && v[T + 1][0] == s) {
        var q = v[T - 1][1], D = v[T][1], L = v[T + 1][1], R = u(q, D);
        if (R) {
          var F = D.substring(D.length - R);
          q = q.substring(0, q.length - R), D = F + D.substring(0, D.length - R), L = F + L;
        }
        for (var z = q, V = D, nt = L, Q = x(q, D) + x(D, L); D.charAt(0) === L.charAt(0); ) {
          q += D.charAt(0), D = D.substring(1) + L.charAt(0), L = L.substring(1);
          var at = x(q, D) + x(D, L);
          at >= Q && (Q = at, z = q, V = D, nt = L);
        }
        v[T - 1][1] != z && (z ? v[T - 1][1] = z : (v.splice(T - 1, 1), T--), v[T][1] = V, nt ? v[T + 1][1] = nt : (v.splice(T + 1, 1), T--));
      }
      T++;
    }
  }
  function M(v, x) {
    v.push([s, ""]);
    for (var T = 0, q = 0, D = 0, L = "", R = "", F; T < v.length; ) {
      if (T < v.length - 1 && !v[T][1]) {
        v.splice(T, 1);
        continue;
      }
      switch (v[T][0]) {
        case t:
          D++, R += v[T][1], T++;
          break;
        case e:
          q++, L += v[T][1], T++;
          break;
        case s:
          var z = T - D - q - 1;
          if (x) {
            if (z >= 0 && X(v[z][1])) {
              var V = v[z][1].slice(-1);
              if (v[z][1] = v[z][1].slice(
                0,
                -1
              ), L = V + L, R = V + R, !v[z][1]) {
                v.splice(z, 1), T--;
                var nt = z - 1;
                v[nt] && v[nt][0] === t && (D++, R = v[nt][1] + R, nt--), v[nt] && v[nt][0] === e && (q++, L = v[nt][1] + L, nt--), z = nt;
              }
            }
            if (j(v[T][1])) {
              var V = v[T][1].charAt(0);
              v[T][1] = v[T][1].slice(1), L += V, R += V;
            }
          }
          if (T < v.length - 1 && !v[T][1]) {
            v.splice(T, 1);
            break;
          }
          if (L.length > 0 || R.length > 0) {
            L.length > 0 && R.length > 0 && (F = l(R, L), F !== 0 && (z >= 0 ? v[z][1] += R.substring(
              0,
              F
            ) : (v.splice(0, 0, [
              s,
              R.substring(0, F)
            ]), T++), R = R.substring(F), L = L.substring(F)), F = u(R, L), F !== 0 && (v[T][1] = R.substring(R.length - F) + v[T][1], R = R.substring(
              0,
              R.length - F
            ), L = L.substring(
              0,
              L.length - F
            )));
            var Q = D + q;
            L.length === 0 && R.length === 0 ? (v.splice(T - Q, Q), T = T - Q) : L.length === 0 ? (v.splice(T - Q, Q, [t, R]), T = T - Q + 1) : R.length === 0 ? (v.splice(T - Q, Q, [e, L]), T = T - Q + 1) : (v.splice(
              T - Q,
              Q,
              [e, L],
              [t, R]
            ), T = T - Q + 2);
          }
          T !== 0 && v[T - 1][0] === s ? (v[T - 1][1] += v[T][1], v.splice(T, 1)) : T++, D = 0, q = 0, L = "", R = "";
          break;
      }
    }
    v[v.length - 1][1] === "" && v.pop();
    var at = !1;
    for (T = 1; T < v.length - 1; )
      v[T - 1][0] === s && v[T + 1][0] === s && (v[T][1].substring(
        v[T][1].length - v[T - 1][1].length
      ) === v[T - 1][1] ? (v[T][1] = v[T - 1][1] + v[T][1].substring(
        0,
        v[T][1].length - v[T - 1][1].length
      ), v[T + 1][1] = v[T - 1][1] + v[T + 1][1], v.splice(T - 1, 1), at = !0) : v[T][1].substring(0, v[T + 1][1].length) == v[T + 1][1] && (v[T - 1][1] += v[T + 1][1], v[T][1] = v[T][1].substring(v[T + 1][1].length) + v[T + 1][1], v.splice(T + 1, 1), at = !0)), T++;
    at && M(v, x);
  }
  function B(v) {
    return v >= 55296 && v <= 56319;
  }
  function P(v) {
    return v >= 56320 && v <= 57343;
  }
  function j(v) {
    return P(v.charCodeAt(0));
  }
  function X(v) {
    return B(v.charCodeAt(v.length - 1));
  }
  function it(v) {
    for (var x = [], T = 0; T < v.length; T++)
      v[T][1].length > 0 && x.push(v[T]);
    return x;
  }
  function ct(v, x, T, q) {
    return X(v) || j(q) ? null : it([
      [s, v],
      [e, x],
      [t, T],
      [s, q]
    ]);
  }
  function vt(v, x, T) {
    var q = typeof T == "number" ? { index: T, length: 0 } : T.oldRange, D = typeof T == "number" ? null : T.newRange, L = v.length, R = x.length;
    if (q.length === 0 && (D === null || D.length === 0)) {
      var F = q.index, z = v.slice(0, F), V = v.slice(F), nt = D ? D.index : null;
      t: {
        var Q = F + R - L;
        if (nt !== null && nt !== Q || Q < 0 || Q > R)
          break t;
        var at = x.slice(0, Q), rt = x.slice(Q);
        if (rt !== V)
          break t;
        var W = Math.min(F, Q), mt = z.slice(0, W), Et = at.slice(0, W);
        if (mt !== Et)
          break t;
        var tt = z.slice(W), ut = at.slice(W);
        return ct(mt, tt, ut, V);
      }
      t: {
        if (nt !== null && nt !== F)
          break t;
        var ft = F, at = x.slice(0, ft), rt = x.slice(ft);
        if (at !== z)
          break t;
        var dt = Math.min(L - ft, R - ft), bt = V.slice(V.length - dt), yt = rt.slice(rt.length - dt);
        if (bt !== yt)
          break t;
        var tt = V.slice(0, V.length - dt), ut = rt.slice(0, rt.length - dt);
        return ct(z, tt, ut, bt);
      }
    }
    if (q.length > 0 && D && D.length === 0)
      t: {
        var mt = v.slice(0, q.index), bt = v.slice(q.index + q.length), W = mt.length, dt = bt.length;
        if (R < W + dt)
          break t;
        var Et = x.slice(0, W), yt = x.slice(R - dt);
        if (mt !== Et || bt !== yt)
          break t;
        var tt = v.slice(W, L - dt), ut = x.slice(W, R - dt);
        return ct(mt, tt, ut, bt);
      }
    return null;
  }
  function ht(v, x, T, q) {
    return n(v, x, T, q, !0);
  }
  return ht.INSERT = t, ht.DELETE = e, ht.EQUAL = s, Zo = ht, Zo;
}
var ii = { exports: {} };
ii.exports;
var qc;
function th() {
  return qc || (qc = 1, function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", a = "[object Date]", u = "[object Error]", h = "[object Function]", d = "[object GeneratorFunction]", b = "[object Map]", y = "[object Number]", w = "[object Object]", A = "[object Promise]", O = "[object RegExp]", N = "[object Set]", M = "[object String]", B = "[object Symbol]", P = "[object WeakMap]", j = "[object ArrayBuffer]", X = "[object DataView]", it = "[object Float32Array]", ct = "[object Float64Array]", vt = "[object Int8Array]", ht = "[object Int16Array]", v = "[object Int32Array]", x = "[object Uint8Array]", T = "[object Uint8ClampedArray]", q = "[object Uint16Array]", D = "[object Uint32Array]", L = /[\\^$.*+?()[\]{}|]/g, R = /\w*$/, F = /^\[object .+?Constructor\]$/, z = /^(?:0|[1-9]\d*)$/, V = {};
    V[r] = V[o] = V[j] = V[X] = V[l] = V[a] = V[it] = V[ct] = V[vt] = V[ht] = V[v] = V[b] = V[y] = V[w] = V[O] = V[N] = V[M] = V[B] = V[x] = V[T] = V[q] = V[D] = !0, V[u] = V[h] = V[P] = !1;
    var nt = typeof as == "object" && as && as.Object === Object && as, Q = typeof self == "object" && self && self.Object === Object && self, at = nt || Q || Function("return this")(), rt = t && !t.nodeType && t, W = rt && !0 && e && !e.nodeType && e, mt = W && W.exports === rt;
    function Et(c, p) {
      return c.set(p[0], p[1]), c;
    }
    function tt(c, p) {
      return c.add(p), c;
    }
    function ut(c, p) {
      for (var _ = -1, k = c ? c.length : 0; ++_ < k && p(c[_], _, c) !== !1; )
        ;
      return c;
    }
    function ft(c, p) {
      for (var _ = -1, k = p.length, ot = c.length; ++_ < k; )
        c[ot + _] = p[_];
      return c;
    }
    function dt(c, p, _, k) {
      for (var ot = -1, Y = c ? c.length : 0; ++ot < Y; )
        _ = p(_, c[ot], ot, c);
      return _;
    }
    function bt(c, p) {
      for (var _ = -1, k = Array(c); ++_ < c; )
        k[_] = p(_);
      return k;
    }
    function yt(c, p) {
      return c == null ? void 0 : c[p];
    }
    function At(c) {
      var p = !1;
      if (c != null && typeof c.toString != "function")
        try {
          p = !!(c + "");
        } catch {
        }
      return p;
    }
    function kt(c) {
      var p = -1, _ = Array(c.size);
      return c.forEach(function(k, ot) {
        _[++p] = [ot, k];
      }), _;
    }
    function es(c, p) {
      return function(_) {
        return c(p(_));
      };
    }
    function _s(c) {
      var p = -1, _ = Array(c.size);
      return c.forEach(function(k) {
        _[++p] = k;
      }), _;
    }
    var Dn = Array.prototype, qn = Function.prototype, jt = Object.prototype, Ee = at["__core-js_shared__"], Es = function() {
      var c = /[^.]+$/.exec(Ee && Ee.keys && Ee.keys.IE_PROTO || "");
      return c ? "Symbol(src)_1." + c : "";
    }(), ws = qn.toString, Vt = jt.hasOwnProperty, De = jt.toString, Gs = RegExp(
      "^" + ws.call(Vt).replace(L, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), we = mt ? at.Buffer : void 0, qe = at.Symbol, Bn = at.Uint8Array, Yt = es(Object.getPrototypeOf, Object), Ri = Object.create, Di = jt.propertyIsEnumerable, Kr = Dn.splice, Pn = Object.getOwnPropertySymbols, Ys = we ? we.isBuffer : void 0, qi = es(Object.keys, Object), Xs = ae(at, "DataView"), Ts = ae(at, "Map"), oe = ae(at, "Promise"), Zs = ae(at, "Set"), jn = ae(at, "WeakMap"), As = ae(Object, "create"), Vn = qt(Xs), Os = qt(Ts), Un = qt(oe), Fn = qt(Zs), Hn = qt(jn), ss = qe ? qe.prototype : void 0, Bi = ss ? ss.valueOf : void 0;
    function Be(c) {
      var p = -1, _ = c ? c.length : 0;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function Gr() {
      this.__data__ = As ? As(null) : {};
    }
    function Yr(c) {
      return this.has(c) && delete this.__data__[c];
    }
    function Xr(c) {
      var p = this.__data__;
      if (As) {
        var _ = p[c];
        return _ === n ? void 0 : _;
      }
      return Vt.call(p, c) ? p[c] : void 0;
    }
    function Pi(c) {
      var p = this.__data__;
      return As ? p[c] !== void 0 : Vt.call(p, c);
    }
    function zn(c, p) {
      var _ = this.__data__;
      return _[c] = As && p === void 0 ? n : p, this;
    }
    Be.prototype.clear = Gr, Be.prototype.delete = Yr, Be.prototype.get = Xr, Be.prototype.has = Pi, Be.prototype.set = zn;
    function Ct(c) {
      var p = -1, _ = c ? c.length : 0;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function Zr() {
      this.__data__ = [];
    }
    function Qr(c) {
      var p = this.__data__, _ = Js(p, c);
      if (_ < 0)
        return !1;
      var k = p.length - 1;
      return _ == k ? p.pop() : Kr.call(p, _, 1), !0;
    }
    function Jr(c) {
      var p = this.__data__, _ = Js(p, c);
      return _ < 0 ? void 0 : p[_][1];
    }
    function to(c) {
      return Js(this.__data__, c) > -1;
    }
    function eo(c, p) {
      var _ = this.__data__, k = Js(_, c);
      return k < 0 ? _.push([c, p]) : _[k][1] = p, this;
    }
    Ct.prototype.clear = Zr, Ct.prototype.delete = Qr, Ct.prototype.get = Jr, Ct.prototype.has = to, Ct.prototype.set = eo;
    function xt(c) {
      var p = -1, _ = c ? c.length : 0;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function so() {
      this.__data__ = {
        hash: new Be(),
        map: new (Ts || Ct)(),
        string: new Be()
      };
    }
    function no(c) {
      return ks(this, c).delete(c);
    }
    function io(c) {
      return ks(this, c).get(c);
    }
    function ro(c) {
      return ks(this, c).has(c);
    }
    function oo(c, p) {
      return ks(this, c).set(c, p), this;
    }
    xt.prototype.clear = so, xt.prototype.delete = no, xt.prototype.get = io, xt.prototype.has = ro, xt.prototype.set = oo;
    function Ut(c) {
      this.__data__ = new Ct(c);
    }
    function ao() {
      this.__data__ = new Ct();
    }
    function lo(c) {
      return this.__data__.delete(c);
    }
    function co(c) {
      return this.__data__.get(c);
    }
    function uo(c) {
      return this.__data__.has(c);
    }
    function ho(c, p) {
      var _ = this.__data__;
      if (_ instanceof Ct) {
        var k = _.__data__;
        if (!Ts || k.length < s - 1)
          return k.push([c, p]), this;
        _ = this.__data__ = new xt(k);
      }
      return _.set(c, p), this;
    }
    Ut.prototype.clear = ao, Ut.prototype.delete = lo, Ut.prototype.get = co, Ut.prototype.has = uo, Ut.prototype.set = ho;
    function Qs(c, p) {
      var _ = Yn(c) || en(c) ? bt(c.length, String) : [], k = _.length, ot = !!k;
      for (var Y in c)
        Vt.call(c, Y) && !(ot && (Y == "length" || No(Y, k))) && _.push(Y);
      return _;
    }
    function ji(c, p, _) {
      var k = c[p];
      (!(Vt.call(c, p) && zi(k, _)) || _ === void 0 && !(p in c)) && (c[p] = _);
    }
    function Js(c, p) {
      for (var _ = c.length; _--; )
        if (zi(c[_][0], p))
          return _;
      return -1;
    }
    function Te(c, p) {
      return c && Gn(p, Zn(p), c);
    }
    function Wn(c, p, _, k, ot, Y, gt) {
      var pt;
      if (k && (pt = Y ? k(c, ot, Y, gt) : k(c)), pt !== void 0)
        return pt;
      if (!Oe(c))
        return c;
      var Ot = Yn(c);
      if (Ot) {
        if (pt = Ao(c), !p)
          return Eo(c, pt);
      } else {
        var _t = je(c), $t = _t == h || _t == d;
        if (Wi(c))
          return tn(c, p);
        if (_t == w || _t == r || $t && !Y) {
          if (At(c))
            return Y ? c : {};
          if (pt = Ae($t ? {} : c), !p)
            return wo(c, Te(pt, c));
        } else {
          if (!V[_t])
            return Y ? c : {};
          pt = Oo(c, _t, Wn, p);
        }
      }
      gt || (gt = new Ut());
      var Ft = gt.get(c);
      if (Ft)
        return Ft;
      if (gt.set(c, pt), !Ot)
        var Nt = _ ? To(c) : Zn(c);
      return ut(Nt || c, function(Mt, St) {
        Nt && (St = Mt, Mt = c[St]), ji(pt, St, Wn(Mt, p, _, k, St, c, gt));
      }), pt;
    }
    function fo(c) {
      return Oe(c) ? Ri(c) : {};
    }
    function po(c, p, _) {
      var k = p(c);
      return Yn(c) ? k : ft(k, _(c));
    }
    function go(c) {
      return De.call(c);
    }
    function mo(c) {
      if (!Oe(c) || Co(c))
        return !1;
      var p = Xn(c) || At(c) ? Gs : F;
      return p.test(qt(c));
    }
    function bo(c) {
      if (!Fi(c))
        return qi(c);
      var p = [];
      for (var _ in Object(c))
        Vt.call(c, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function tn(c, p) {
      if (p)
        return c.slice();
      var _ = new c.constructor(c.length);
      return c.copy(_), _;
    }
    function Kn(c) {
      var p = new c.constructor(c.byteLength);
      return new Bn(p).set(new Bn(c)), p;
    }
    function Ns(c, p) {
      var _ = p ? Kn(c.buffer) : c.buffer;
      return new c.constructor(_, c.byteOffset, c.byteLength);
    }
    function Vi(c, p, _) {
      var k = p ? _(kt(c), !0) : kt(c);
      return dt(k, Et, new c.constructor());
    }
    function Ui(c) {
      var p = new c.constructor(c.source, R.exec(c));
      return p.lastIndex = c.lastIndex, p;
    }
    function yo(c, p, _) {
      var k = p ? _(_s(c), !0) : _s(c);
      return dt(k, tt, new c.constructor());
    }
    function vo(c) {
      return Bi ? Object(Bi.call(c)) : {};
    }
    function _o(c, p) {
      var _ = p ? Kn(c.buffer) : c.buffer;
      return new c.constructor(_, c.byteOffset, c.length);
    }
    function Eo(c, p) {
      var _ = -1, k = c.length;
      for (p || (p = Array(k)); ++_ < k; )
        p[_] = c[_];
      return p;
    }
    function Gn(c, p, _, k) {
      _ || (_ = {});
      for (var ot = -1, Y = p.length; ++ot < Y; ) {
        var gt = p[ot], pt = void 0;
        ji(_, gt, pt === void 0 ? c[gt] : pt);
      }
      return _;
    }
    function wo(c, p) {
      return Gn(c, Pe(c), p);
    }
    function To(c) {
      return po(c, Zn, Pe);
    }
    function ks(c, p) {
      var _ = c.__data__;
      return ko(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function ae(c, p) {
      var _ = yt(c, p);
      return mo(_) ? _ : void 0;
    }
    var Pe = Pn ? es(Pn, Object) : Lo, je = go;
    (Xs && je(new Xs(new ArrayBuffer(1))) != X || Ts && je(new Ts()) != b || oe && je(oe.resolve()) != A || Zs && je(new Zs()) != N || jn && je(new jn()) != P) && (je = function(c) {
      var p = De.call(c), _ = p == w ? c.constructor : void 0, k = _ ? qt(_) : void 0;
      if (k)
        switch (k) {
          case Vn:
            return X;
          case Os:
            return b;
          case Un:
            return A;
          case Fn:
            return N;
          case Hn:
            return P;
        }
      return p;
    });
    function Ao(c) {
      var p = c.length, _ = c.constructor(p);
      return p && typeof c[0] == "string" && Vt.call(c, "index") && (_.index = c.index, _.input = c.input), _;
    }
    function Ae(c) {
      return typeof c.constructor == "function" && !Fi(c) ? fo(Yt(c)) : {};
    }
    function Oo(c, p, _, k) {
      var ot = c.constructor;
      switch (p) {
        case j:
          return Kn(c);
        case l:
        case a:
          return new ot(+c);
        case X:
          return Ns(c, k);
        case it:
        case ct:
        case vt:
        case ht:
        case v:
        case x:
        case T:
        case q:
        case D:
          return _o(c, k);
        case b:
          return Vi(c, k, _);
        case y:
        case M:
          return new ot(c);
        case O:
          return Ui(c);
        case N:
          return yo(c, k, _);
        case B:
          return vo(c);
      }
    }
    function No(c, p) {
      return p = p ?? i, !!p && (typeof c == "number" || z.test(c)) && c > -1 && c % 1 == 0 && c < p;
    }
    function ko(c) {
      var p = typeof c;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? c !== "__proto__" : c === null;
    }
    function Co(c) {
      return !!Es && Es in c;
    }
    function Fi(c) {
      var p = c && c.constructor, _ = typeof p == "function" && p.prototype || jt;
      return c === _;
    }
    function qt(c) {
      if (c != null) {
        try {
          return ws.call(c);
        } catch {
        }
        try {
          return c + "";
        } catch {
        }
      }
      return "";
    }
    function Hi(c) {
      return Wn(c, !0, !0);
    }
    function zi(c, p) {
      return c === p || c !== c && p !== p;
    }
    function en(c) {
      return So(c) && Vt.call(c, "callee") && (!Di.call(c, "callee") || De.call(c) == r);
    }
    var Yn = Array.isArray;
    function sn(c) {
      return c != null && Ki(c.length) && !Xn(c);
    }
    function So(c) {
      return Gi(c) && sn(c);
    }
    var Wi = Ys || Io;
    function Xn(c) {
      var p = Oe(c) ? De.call(c) : "";
      return p == h || p == d;
    }
    function Ki(c) {
      return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
    }
    function Oe(c) {
      var p = typeof c;
      return !!c && (p == "object" || p == "function");
    }
    function Gi(c) {
      return !!c && typeof c == "object";
    }
    function Zn(c) {
      return sn(c) ? Qs(c) : bo(c);
    }
    function Lo() {
      return [];
    }
    function Io() {
      return !1;
    }
    e.exports = Hi;
  }(ii, ii.exports)), ii.exports;
}
var ri = { exports: {} };
ri.exports;
var Bc;
function eh() {
  return Bc || (Bc = 1, function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, l = "[object Arguments]", a = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", d = "[object Date]", b = "[object Error]", y = "[object Function]", w = "[object GeneratorFunction]", A = "[object Map]", O = "[object Number]", N = "[object Null]", M = "[object Object]", B = "[object Promise]", P = "[object Proxy]", j = "[object RegExp]", X = "[object Set]", it = "[object String]", ct = "[object Symbol]", vt = "[object Undefined]", ht = "[object WeakMap]", v = "[object ArrayBuffer]", x = "[object DataView]", T = "[object Float32Array]", q = "[object Float64Array]", D = "[object Int8Array]", L = "[object Int16Array]", R = "[object Int32Array]", F = "[object Uint8Array]", z = "[object Uint8ClampedArray]", V = "[object Uint16Array]", nt = "[object Uint32Array]", Q = /[\\^$.*+?()[\]{}|]/g, at = /^\[object .+?Constructor\]$/, rt = /^(?:0|[1-9]\d*)$/, W = {};
    W[T] = W[q] = W[D] = W[L] = W[R] = W[F] = W[z] = W[V] = W[nt] = !0, W[l] = W[a] = W[v] = W[h] = W[x] = W[d] = W[b] = W[y] = W[A] = W[O] = W[M] = W[j] = W[X] = W[it] = W[ht] = !1;
    var mt = typeof as == "object" && as && as.Object === Object && as, Et = typeof self == "object" && self && self.Object === Object && self, tt = mt || Et || Function("return this")(), ut = t && !t.nodeType && t, ft = ut && !0 && e && !e.nodeType && e, dt = ft && ft.exports === ut, bt = dt && mt.process, yt = function() {
      try {
        return bt && bt.binding && bt.binding("util");
      } catch {
      }
    }(), At = yt && yt.isTypedArray;
    function kt(c, p) {
      for (var _ = -1, k = c == null ? 0 : c.length, ot = 0, Y = []; ++_ < k; ) {
        var gt = c[_];
        p(gt, _, c) && (Y[ot++] = gt);
      }
      return Y;
    }
    function es(c, p) {
      for (var _ = -1, k = p.length, ot = c.length; ++_ < k; )
        c[ot + _] = p[_];
      return c;
    }
    function _s(c, p) {
      for (var _ = -1, k = c == null ? 0 : c.length; ++_ < k; )
        if (p(c[_], _, c))
          return !0;
      return !1;
    }
    function Dn(c, p) {
      for (var _ = -1, k = Array(c); ++_ < c; )
        k[_] = p(_);
      return k;
    }
    function qn(c) {
      return function(p) {
        return c(p);
      };
    }
    function jt(c, p) {
      return c.has(p);
    }
    function Ee(c, p) {
      return c == null ? void 0 : c[p];
    }
    function Es(c) {
      var p = -1, _ = Array(c.size);
      return c.forEach(function(k, ot) {
        _[++p] = [ot, k];
      }), _;
    }
    function ws(c, p) {
      return function(_) {
        return c(p(_));
      };
    }
    function Vt(c) {
      var p = -1, _ = Array(c.size);
      return c.forEach(function(k) {
        _[++p] = k;
      }), _;
    }
    var De = Array.prototype, Gs = Function.prototype, we = Object.prototype, qe = tt["__core-js_shared__"], Bn = Gs.toString, Yt = we.hasOwnProperty, Ri = function() {
      var c = /[^.]+$/.exec(qe && qe.keys && qe.keys.IE_PROTO || "");
      return c ? "Symbol(src)_1." + c : "";
    }(), Di = we.toString, Kr = RegExp(
      "^" + Bn.call(Yt).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Pn = dt ? tt.Buffer : void 0, Ys = tt.Symbol, qi = tt.Uint8Array, Xs = we.propertyIsEnumerable, Ts = De.splice, oe = Ys ? Ys.toStringTag : void 0, Zs = Object.getOwnPropertySymbols, jn = Pn ? Pn.isBuffer : void 0, As = ws(Object.keys, Object), Vn = Pe(tt, "DataView"), Os = Pe(tt, "Map"), Un = Pe(tt, "Promise"), Fn = Pe(tt, "Set"), Hn = Pe(tt, "WeakMap"), ss = Pe(Object, "create"), Bi = qt(Vn), Be = qt(Os), Gr = qt(Un), Yr = qt(Fn), Xr = qt(Hn), Pi = Ys ? Ys.prototype : void 0, zn = Pi ? Pi.valueOf : void 0;
    function Ct(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function Zr() {
      this.__data__ = ss ? ss(null) : {}, this.size = 0;
    }
    function Qr(c) {
      var p = this.has(c) && delete this.__data__[c];
      return this.size -= p ? 1 : 0, p;
    }
    function Jr(c) {
      var p = this.__data__;
      if (ss) {
        var _ = p[c];
        return _ === n ? void 0 : _;
      }
      return Yt.call(p, c) ? p[c] : void 0;
    }
    function to(c) {
      var p = this.__data__;
      return ss ? p[c] !== void 0 : Yt.call(p, c);
    }
    function eo(c, p) {
      var _ = this.__data__;
      return this.size += this.has(c) ? 0 : 1, _[c] = ss && p === void 0 ? n : p, this;
    }
    Ct.prototype.clear = Zr, Ct.prototype.delete = Qr, Ct.prototype.get = Jr, Ct.prototype.has = to, Ct.prototype.set = eo;
    function xt(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function so() {
      this.__data__ = [], this.size = 0;
    }
    function no(c) {
      var p = this.__data__, _ = tn(p, c);
      if (_ < 0)
        return !1;
      var k = p.length - 1;
      return _ == k ? p.pop() : Ts.call(p, _, 1), --this.size, !0;
    }
    function io(c) {
      var p = this.__data__, _ = tn(p, c);
      return _ < 0 ? void 0 : p[_][1];
    }
    function ro(c) {
      return tn(this.__data__, c) > -1;
    }
    function oo(c, p) {
      var _ = this.__data__, k = tn(_, c);
      return k < 0 ? (++this.size, _.push([c, p])) : _[k][1] = p, this;
    }
    xt.prototype.clear = so, xt.prototype.delete = no, xt.prototype.get = io, xt.prototype.has = ro, xt.prototype.set = oo;
    function Ut(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function ao() {
      this.size = 0, this.__data__ = {
        hash: new Ct(),
        map: new (Os || xt)(),
        string: new Ct()
      };
    }
    function lo(c) {
      var p = ae(this, c).delete(c);
      return this.size -= p ? 1 : 0, p;
    }
    function co(c) {
      return ae(this, c).get(c);
    }
    function uo(c) {
      return ae(this, c).has(c);
    }
    function ho(c, p) {
      var _ = ae(this, c), k = _.size;
      return _.set(c, p), this.size += _.size == k ? 0 : 1, this;
    }
    Ut.prototype.clear = ao, Ut.prototype.delete = lo, Ut.prototype.get = co, Ut.prototype.has = uo, Ut.prototype.set = ho;
    function Qs(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.__data__ = new Ut(); ++p < _; )
        this.add(c[p]);
    }
    function ji(c) {
      return this.__data__.set(c, n), this;
    }
    function Js(c) {
      return this.__data__.has(c);
    }
    Qs.prototype.add = Qs.prototype.push = ji, Qs.prototype.has = Js;
    function Te(c) {
      var p = this.__data__ = new xt(c);
      this.size = p.size;
    }
    function Wn() {
      this.__data__ = new xt(), this.size = 0;
    }
    function fo(c) {
      var p = this.__data__, _ = p.delete(c);
      return this.size = p.size, _;
    }
    function po(c) {
      return this.__data__.get(c);
    }
    function go(c) {
      return this.__data__.has(c);
    }
    function mo(c, p) {
      var _ = this.__data__;
      if (_ instanceof xt) {
        var k = _.__data__;
        if (!Os || k.length < s - 1)
          return k.push([c, p]), this.size = ++_.size, this;
        _ = this.__data__ = new Ut(k);
      }
      return _.set(c, p), this.size = _.size, this;
    }
    Te.prototype.clear = Wn, Te.prototype.delete = fo, Te.prototype.get = po, Te.prototype.has = go, Te.prototype.set = mo;
    function bo(c, p) {
      var _ = en(c), k = !_ && zi(c), ot = !_ && !k && sn(c), Y = !_ && !k && !ot && Gi(c), gt = _ || k || ot || Y, pt = gt ? Dn(c.length, String) : [], Ot = pt.length;
      for (var _t in c)
        Yt.call(c, _t) && !(gt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (_t == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        ot && (_t == "offset" || _t == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Y && (_t == "buffer" || _t == "byteLength" || _t == "byteOffset") || // Skip index properties.
        Oo(_t, Ot))) && pt.push(_t);
      return pt;
    }
    function tn(c, p) {
      for (var _ = c.length; _--; )
        if (Hi(c[_][0], p))
          return _;
      return -1;
    }
    function Kn(c, p, _) {
      var k = p(c);
      return en(c) ? k : es(k, _(c));
    }
    function Ns(c) {
      return c == null ? c === void 0 ? vt : N : oe && oe in Object(c) ? je(c) : Fi(c);
    }
    function Vi(c) {
      return Oe(c) && Ns(c) == l;
    }
    function Ui(c, p, _, k, ot) {
      return c === p ? !0 : c == null || p == null || !Oe(c) && !Oe(p) ? c !== c && p !== p : yo(c, p, _, k, Ui, ot);
    }
    function yo(c, p, _, k, ot, Y) {
      var gt = en(c), pt = en(p), Ot = gt ? a : Ae(c), _t = pt ? a : Ae(p);
      Ot = Ot == l ? M : Ot, _t = _t == l ? M : _t;
      var $t = Ot == M, Ft = _t == M, Nt = Ot == _t;
      if (Nt && sn(c)) {
        if (!sn(p))
          return !1;
        gt = !0, $t = !1;
      }
      if (Nt && !$t)
        return Y || (Y = new Te()), gt || Gi(c) ? Gn(c, p, _, k, ot, Y) : wo(c, p, Ot, _, k, ot, Y);
      if (!(_ & i)) {
        var Mt = $t && Yt.call(c, "__wrapped__"), St = Ft && Yt.call(p, "__wrapped__");
        if (Mt || St) {
          var ns = Mt ? c.value() : c, Ve = St ? p.value() : p;
          return Y || (Y = new Te()), ot(ns, Ve, _, k, Y);
        }
      }
      return Nt ? (Y || (Y = new Te()), To(c, p, _, k, ot, Y)) : !1;
    }
    function vo(c) {
      if (!Ki(c) || ko(c))
        return !1;
      var p = Wi(c) ? Kr : at;
      return p.test(qt(c));
    }
    function _o(c) {
      return Oe(c) && Xn(c.length) && !!W[Ns(c)];
    }
    function Eo(c) {
      if (!Co(c))
        return As(c);
      var p = [];
      for (var _ in Object(c))
        Yt.call(c, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function Gn(c, p, _, k, ot, Y) {
      var gt = _ & i, pt = c.length, Ot = p.length;
      if (pt != Ot && !(gt && Ot > pt))
        return !1;
      var _t = Y.get(c);
      if (_t && Y.get(p))
        return _t == p;
      var $t = -1, Ft = !0, Nt = _ & r ? new Qs() : void 0;
      for (Y.set(c, p), Y.set(p, c); ++$t < pt; ) {
        var Mt = c[$t], St = p[$t];
        if (k)
          var ns = gt ? k(St, Mt, $t, p, c, Y) : k(Mt, St, $t, c, p, Y);
        if (ns !== void 0) {
          if (ns)
            continue;
          Ft = !1;
          break;
        }
        if (Nt) {
          if (!_s(p, function(Ve, Cs) {
            if (!jt(Nt, Cs) && (Mt === Ve || ot(Mt, Ve, _, k, Y)))
              return Nt.push(Cs);
          })) {
            Ft = !1;
            break;
          }
        } else if (!(Mt === St || ot(Mt, St, _, k, Y))) {
          Ft = !1;
          break;
        }
      }
      return Y.delete(c), Y.delete(p), Ft;
    }
    function wo(c, p, _, k, ot, Y, gt) {
      switch (_) {
        case x:
          if (c.byteLength != p.byteLength || c.byteOffset != p.byteOffset)
            return !1;
          c = c.buffer, p = p.buffer;
        case v:
          return !(c.byteLength != p.byteLength || !Y(new qi(c), new qi(p)));
        case h:
        case d:
        case O:
          return Hi(+c, +p);
        case b:
          return c.name == p.name && c.message == p.message;
        case j:
        case it:
          return c == p + "";
        case A:
          var pt = Es;
        case X:
          var Ot = k & i;
          if (pt || (pt = Vt), c.size != p.size && !Ot)
            return !1;
          var _t = gt.get(c);
          if (_t)
            return _t == p;
          k |= r, gt.set(c, p);
          var $t = Gn(pt(c), pt(p), k, ot, Y, gt);
          return gt.delete(c), $t;
        case ct:
          if (zn)
            return zn.call(c) == zn.call(p);
      }
      return !1;
    }
    function To(c, p, _, k, ot, Y) {
      var gt = _ & i, pt = ks(c), Ot = pt.length, _t = ks(p), $t = _t.length;
      if (Ot != $t && !gt)
        return !1;
      for (var Ft = Ot; Ft--; ) {
        var Nt = pt[Ft];
        if (!(gt ? Nt in p : Yt.call(p, Nt)))
          return !1;
      }
      var Mt = Y.get(c);
      if (Mt && Y.get(p))
        return Mt == p;
      var St = !0;
      Y.set(c, p), Y.set(p, c);
      for (var ns = gt; ++Ft < Ot; ) {
        Nt = pt[Ft];
        var Ve = c[Nt], Cs = p[Nt];
        if (k)
          var Nl = gt ? k(Cs, Ve, Nt, p, c, Y) : k(Ve, Cs, Nt, c, p, Y);
        if (!(Nl === void 0 ? Ve === Cs || ot(Ve, Cs, _, k, Y) : Nl)) {
          St = !1;
          break;
        }
        ns || (ns = Nt == "constructor");
      }
      if (St && !ns) {
        var Yi = c.constructor, Xi = p.constructor;
        Yi != Xi && "constructor" in c && "constructor" in p && !(typeof Yi == "function" && Yi instanceof Yi && typeof Xi == "function" && Xi instanceof Xi) && (St = !1);
      }
      return Y.delete(c), Y.delete(p), St;
    }
    function ks(c) {
      return Kn(c, Zn, Ao);
    }
    function ae(c, p) {
      var _ = c.__data__;
      return No(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function Pe(c, p) {
      var _ = Ee(c, p);
      return vo(_) ? _ : void 0;
    }
    function je(c) {
      var p = Yt.call(c, oe), _ = c[oe];
      try {
        c[oe] = void 0;
        var k = !0;
      } catch {
      }
      var ot = Di.call(c);
      return k && (p ? c[oe] = _ : delete c[oe]), ot;
    }
    var Ao = Zs ? function(c) {
      return c == null ? [] : (c = Object(c), kt(Zs(c), function(p) {
        return Xs.call(c, p);
      }));
    } : Lo, Ae = Ns;
    (Vn && Ae(new Vn(new ArrayBuffer(1))) != x || Os && Ae(new Os()) != A || Un && Ae(Un.resolve()) != B || Fn && Ae(new Fn()) != X || Hn && Ae(new Hn()) != ht) && (Ae = function(c) {
      var p = Ns(c), _ = p == M ? c.constructor : void 0, k = _ ? qt(_) : "";
      if (k)
        switch (k) {
          case Bi:
            return x;
          case Be:
            return A;
          case Gr:
            return B;
          case Yr:
            return X;
          case Xr:
            return ht;
        }
      return p;
    });
    function Oo(c, p) {
      return p = p ?? o, !!p && (typeof c == "number" || rt.test(c)) && c > -1 && c % 1 == 0 && c < p;
    }
    function No(c) {
      var p = typeof c;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? c !== "__proto__" : c === null;
    }
    function ko(c) {
      return !!Ri && Ri in c;
    }
    function Co(c) {
      var p = c && c.constructor, _ = typeof p == "function" && p.prototype || we;
      return c === _;
    }
    function Fi(c) {
      return Di.call(c);
    }
    function qt(c) {
      if (c != null) {
        try {
          return Bn.call(c);
        } catch {
        }
        try {
          return c + "";
        } catch {
        }
      }
      return "";
    }
    function Hi(c, p) {
      return c === p || c !== c && p !== p;
    }
    var zi = Vi(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Vi : function(c) {
      return Oe(c) && Yt.call(c, "callee") && !Xs.call(c, "callee");
    }, en = Array.isArray;
    function Yn(c) {
      return c != null && Xn(c.length) && !Wi(c);
    }
    var sn = jn || Io;
    function So(c, p) {
      return Ui(c, p);
    }
    function Wi(c) {
      if (!Ki(c))
        return !1;
      var p = Ns(c);
      return p == y || p == w || p == u || p == P;
    }
    function Xn(c) {
      return typeof c == "number" && c > -1 && c % 1 == 0 && c <= o;
    }
    function Ki(c) {
      var p = typeof c;
      return c != null && (p == "object" || p == "function");
    }
    function Oe(c) {
      return c != null && typeof c == "object";
    }
    var Gi = At ? qn(At) : _o;
    function Zn(c) {
      return Yn(c) ? bo(c) : Eo(c);
    }
    function Lo() {
      return [];
    }
    function Io() {
      return !1;
    }
    e.exports = So;
  }(ri, ri.exports)), ri.exports;
}
var or = {}, Pc;
function T_() {
  if (Pc) return or;
  Pc = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = th(), t = eh();
  var s;
  return function(n) {
    function i(a = {}, u = {}, h = !1) {
      typeof a != "object" && (a = {}), typeof u != "object" && (u = {});
      let d = e(u);
      h || (d = Object.keys(d).reduce((b, y) => (d[y] != null && (b[y] = d[y]), b), {}));
      for (const b in a)
        a[b] !== void 0 && u[b] === void 0 && (d[b] = a[b]);
      return Object.keys(d).length > 0 ? d : void 0;
    }
    n.compose = i;
    function r(a = {}, u = {}) {
      typeof a != "object" && (a = {}), typeof u != "object" && (u = {});
      const h = Object.keys(a).concat(Object.keys(u)).reduce((d, b) => (t(a[b], u[b]) || (d[b] = u[b] === void 0 ? null : u[b]), d), {});
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.diff = r;
    function o(a = {}, u = {}) {
      a = a || {};
      const h = Object.keys(u).reduce((d, b) => (u[b] !== a[b] && a[b] !== void 0 && (d[b] = u[b]), d), {});
      return Object.keys(a).reduce((d, b) => (a[b] !== u[b] && u[b] === void 0 && (d[b] = null), d), h);
    }
    n.invert = o;
    function l(a, u, h = !1) {
      if (typeof a != "object")
        return u;
      if (typeof u != "object")
        return;
      if (!h)
        return u;
      const d = Object.keys(u).reduce((b, y) => (a[y] === void 0 && (b[y] = u[y]), b), {});
      return Object.keys(d).length > 0 ? d : void 0;
    }
    n.transform = l;
  }(s || (s = {})), or.default = s, or;
}
var ar = {}, jc;
function sh() {
  if (jc) return ar;
  jc = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  var e;
  return function(t) {
    function s(n) {
      return typeof n.delete == "number" ? n.delete : typeof n.retain == "number" ? n.retain : typeof n.retain == "object" && n.retain !== null ? 1 : typeof n.insert == "string" ? n.insert.length : 1;
    }
    t.length = s;
  }(e || (e = {})), ar.default = e, ar;
}
var lr = {}, Vc;
function A_() {
  if (Vc) return lr;
  Vc = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = sh();
  class t {
    constructor(n) {
      this.ops = n, this.index = 0, this.offset = 0;
    }
    hasNext() {
      return this.peekLength() < 1 / 0;
    }
    next(n) {
      n || (n = 1 / 0);
      const i = this.ops[this.index];
      if (i) {
        const r = this.offset, o = e.default.length(i);
        if (n >= o - r ? (n = o - r, this.index += 1, this.offset = 0) : this.offset += n, typeof i.delete == "number")
          return { delete: n };
        {
          const l = {};
          return i.attributes && (l.attributes = i.attributes), typeof i.retain == "number" ? l.retain = n : typeof i.retain == "object" && i.retain !== null ? l.retain = i.retain : typeof i.insert == "string" ? l.insert = i.insert.substr(r, n) : l.insert = i.insert, l;
        }
      } else
        return { retain: 1 / 0 };
    }
    peek() {
      return this.ops[this.index];
    }
    peekLength() {
      return this.ops[this.index] ? e.default.length(this.ops[this.index]) - this.offset : 1 / 0;
    }
    peekType() {
      const n = this.ops[this.index];
      return n ? typeof n.delete == "number" ? "delete" : typeof n.retain == "number" || typeof n.retain == "object" && n.retain !== null ? "retain" : "insert" : "retain";
    }
    rest() {
      if (this.hasNext()) {
        if (this.offset === 0)
          return this.ops.slice(this.index);
        {
          const n = this.offset, i = this.index, r = this.next(), o = this.ops.slice(this.index);
          return this.offset = n, this.index = i, [r].concat(o);
        }
      } else return [];
    }
  }
  return lr.default = t, lr;
}
var Uc;
function O_() {
  return Uc || (Uc = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
    const s = w_(), n = th(), i = eh(), r = T_();
    t.AttributeMap = r.default;
    const o = sh();
    t.Op = o.default;
    const l = A_();
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
        const w = {};
        return typeof b == "string" && b.length === 0 ? this : (w.insert = b, y != null && typeof y == "object" && Object.keys(y).length > 0 && (w.attributes = y), this.push(w));
      }
      delete(b) {
        return b <= 0 ? this : this.push({ delete: b });
      }
      retain(b, y) {
        if (typeof b == "number" && b <= 0)
          return this;
        const w = { retain: b };
        return y != null && typeof y == "object" && Object.keys(y).length > 0 && (w.attributes = y), this.push(w);
      }
      push(b) {
        let y = this.ops.length, w = this.ops[y - 1];
        if (b = n(b), typeof w == "object") {
          if (typeof b.delete == "number" && typeof w.delete == "number")
            return this.ops[y - 1] = { delete: w.delete + b.delete }, this;
          if (typeof w.delete == "number" && b.insert != null && (y -= 1, w = this.ops[y - 1], typeof w != "object"))
            return this.ops.unshift(b), this;
          if (i(b.attributes, w.attributes)) {
            if (typeof b.insert == "string" && typeof w.insert == "string")
              return this.ops[y - 1] = { insert: w.insert + b.insert }, typeof b.attributes == "object" && (this.ops[y - 1].attributes = b.attributes), this;
            if (typeof b.retain == "number" && typeof w.retain == "number")
              return this.ops[y - 1] = { retain: w.retain + b.retain }, typeof b.attributes == "object" && (this.ops[y - 1].attributes = b.attributes), this;
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
        const y = [], w = [];
        return this.forEach((A) => {
          (b(A) ? y : w).push(A);
        }), [y, w];
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
        const w = [], A = new l.default(this.ops);
        let O = 0;
        for (; O < y && A.hasNext(); ) {
          let N;
          O < b ? N = A.next(b - O) : (N = A.next(y - O), w.push(N)), O += o.default.length(N);
        }
        return new h(w);
      }
      compose(b) {
        const y = new l.default(this.ops), w = new l.default(b.ops), A = [], O = w.peek();
        if (O != null && typeof O.retain == "number" && O.attributes == null) {
          let M = O.retain;
          for (; y.peekType() === "insert" && y.peekLength() <= M; )
            M -= y.peekLength(), A.push(y.next());
          O.retain - M > 0 && w.next(O.retain - M);
        }
        const N = new h(A);
        for (; y.hasNext() || w.hasNext(); )
          if (w.peekType() === "insert")
            N.push(w.next());
          else if (y.peekType() === "delete")
            N.push(y.next());
          else {
            const M = Math.min(y.peekLength(), w.peekLength()), B = y.next(M), P = w.next(M);
            if (P.retain) {
              const j = {};
              if (typeof B.retain == "number")
                j.retain = typeof P.retain == "number" ? M : P.retain;
              else if (typeof P.retain == "number")
                B.retain == null ? j.insert = B.insert : j.retain = B.retain;
              else {
                const it = B.retain == null ? "insert" : "retain", [ct, vt, ht] = u(B[it], P.retain), v = h.getHandler(ct);
                j[it] = {
                  [ct]: v.compose(vt, ht, it === "retain")
                };
              }
              const X = r.default.compose(B.attributes, P.attributes, typeof B.retain == "number");
              if (X && (j.attributes = X), N.push(j), !w.hasNext() && i(N.ops[N.ops.length - 1], j)) {
                const it = new h(y.rest());
                return N.concat(it).chop();
              }
            } else typeof P.delete == "number" && (typeof B.retain == "number" || typeof B.retain == "object" && B.retain !== null) && N.push(P);
          }
        return N.chop();
      }
      concat(b) {
        const y = new h(this.ops.slice());
        return b.ops.length > 0 && (y.push(b.ops[0]), y.ops = y.ops.concat(b.ops.slice(1))), y;
      }
      diff(b, y) {
        if (this.ops === b.ops)
          return new h();
        const w = [this, b].map((B) => B.map((P) => {
          if (P.insert != null)
            return typeof P.insert == "string" ? P.insert : a;
          const j = B === b ? "on" : "with";
          throw new Error("diff() called " + j + " non-document");
        }).join("")), A = new h(), O = s(w[0], w[1], y, !0), N = new l.default(this.ops), M = new l.default(b.ops);
        return O.forEach((B) => {
          let P = B[1].length;
          for (; P > 0; ) {
            let j = 0;
            switch (B[0]) {
              case s.INSERT:
                j = Math.min(M.peekLength(), P), A.push(M.next(j));
                break;
              case s.DELETE:
                j = Math.min(P, N.peekLength()), N.next(j), A.delete(j);
                break;
              case s.EQUAL:
                j = Math.min(N.peekLength(), M.peekLength(), P);
                const X = N.next(j), it = M.next(j);
                i(X.insert, it.insert) ? A.retain(j, r.default.diff(X.attributes, it.attributes)) : A.push(it).delete(j);
                break;
            }
            P -= j;
          }
        }), A.chop();
      }
      eachLine(b, y = `
`) {
        const w = new l.default(this.ops);
        let A = new h(), O = 0;
        for (; w.hasNext(); ) {
          if (w.peekType() !== "insert")
            return;
          const N = w.peek(), M = o.default.length(N) - w.peekLength(), B = typeof N.insert == "string" ? N.insert.indexOf(y, M) - M : -1;
          if (B < 0)
            A.push(w.next());
          else if (B > 0)
            A.push(w.next(B));
          else {
            if (b(A, w.next(1).attributes || {}, O) === !1)
              return;
            O += 1, A = new h();
          }
        }
        A.length() > 0 && b(A, {}, O);
      }
      invert(b) {
        const y = new h();
        return this.reduce((w, A) => {
          if (A.insert)
            y.delete(o.default.length(A));
          else {
            if (typeof A.retain == "number" && A.attributes == null)
              return y.retain(A.retain), w + A.retain;
            if (A.delete || typeof A.retain == "number") {
              const O = A.delete || A.retain;
              return b.slice(w, w + O).forEach((M) => {
                A.delete ? y.push(M) : A.retain && A.attributes && y.retain(o.default.length(M), r.default.invert(A.attributes, M.attributes));
              }), w + O;
            } else if (typeof A.retain == "object" && A.retain !== null) {
              const O = b.slice(w, w + 1), N = new l.default(O.ops).next(), [M, B, P] = u(A.retain, N.insert), j = h.getHandler(M);
              return y.retain({ [M]: j.invert(B, P) }, r.default.invert(A.attributes, N.attributes)), w + 1;
            }
          }
          return w;
        }, 0), y.chop();
      }
      transform(b, y = !1) {
        if (y = !!y, typeof b == "number")
          return this.transformPosition(b, y);
        const w = b, A = new l.default(this.ops), O = new l.default(w.ops), N = new h();
        for (; A.hasNext() || O.hasNext(); )
          if (A.peekType() === "insert" && (y || O.peekType() !== "insert"))
            N.retain(o.default.length(A.next()));
          else if (O.peekType() === "insert")
            N.push(O.next());
          else {
            const M = Math.min(A.peekLength(), O.peekLength()), B = A.next(M), P = O.next(M);
            if (B.delete)
              continue;
            if (P.delete)
              N.push(P);
            else {
              const j = B.retain, X = P.retain;
              let it = typeof X == "object" && X !== null ? X : M;
              if (typeof j == "object" && j !== null && typeof X == "object" && X !== null) {
                const ct = Object.keys(j)[0];
                if (ct === Object.keys(X)[0]) {
                  const vt = h.getHandler(ct);
                  vt && (it = {
                    [ct]: vt.transform(j[ct], X[ct], y)
                  });
                }
              }
              N.retain(it, r.default.transform(B.attributes, P.attributes, y));
            }
          }
        return N.chop();
      }
      transformPosition(b, y = !1) {
        y = !!y;
        const w = new l.default(this.ops);
        let A = 0;
        for (; w.hasNext() && A <= b; ) {
          const O = w.peekLength(), N = w.peekType();
          if (w.next(), N === "delete") {
            b -= Math.min(O, b - A);
            continue;
          } else N === "insert" && (A < b || !y) && (b += O);
          A += O;
        }
        return b;
      }
    }
    h.Op = o.default, h.OpIterator = l.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, e.exports = h, e.exports.default = h;
  }(rr, rr.exports)), rr.exports;
}
var ee = O_();
const K = /* @__PURE__ */ Jd(ee);
class ye extends Gt {
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
ye.blotName = "break";
ye.tagName = "BR";
let ge = class extends Cr {
};
const N_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Hr(e) {
  return e.replace(/[&<>"']/g, (t) => N_[t]);
}
const ke = class ke extends pl {
  static compare(t, s) {
    const n = ke.order.indexOf(t), i = ke.order.indexOf(s);
    return n >= 0 || i >= 0 ? n - i : t === s ? 0 : t < s ? -1 : 1;
  }
  formatAt(t, s, n, i) {
    if (ke.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, G.BLOT)) {
      const r = this.isolate(t, s);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, s, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof ke && ke.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const s = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(s), s.wrap(this);
    }
  }
};
U(ke, "allowedChildren", [ke, ye, Gt, ge]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
U(ke, "order", [
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
let Me = ke;
const Fc = 1;
class It extends yi {
  constructor() {
    super(...arguments);
    U(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = nh(this)), this.cache.delta;
  }
  deleteAt(s, n) {
    super.deleteAt(s, n), this.cache = {};
  }
  formatAt(s, n, i, r) {
    n <= 0 || (this.scroll.query(i, G.BLOCK) ? s + n === this.length() && this.format(i, r) : super.formatAt(s, Math.min(n, this.length() - s - 1), i, r), this.cache = {});
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
    super.insertBefore(s, n), i instanceof ye && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Fc), this.cache.length;
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
    if (n && (s === 0 || s >= this.length() - Fc)) {
      const r = this.clone();
      return s === 0 ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r);
    }
    const i = super.split(s, n);
    return this.cache = {}, i;
  }
}
It.blotName = "block";
It.tagName = "P";
It.defaultChild = ye;
It.allowedChildren = [ye, Me, Gt, ge];
class te extends Gt {
  attach() {
    super.attach(), this.attributes = new Ur(this.domNode);
  }
  delta() {
    return new K().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, s) {
    const n = this.scroll.query(t, G.BLOCK_ATTRIBUTE);
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
      const u = this.scroll.create(It.blotName);
      return u.insertAt(0, a), u;
    }), l = this.split(t);
    o.forEach((a) => {
      this.parent.insertBefore(a, l);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), l);
  }
}
te.scope = G.BLOCK_BLOT;
function nh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.descendants(Rt).reduce((s, n) => n.length() === 0 ? s : s.insert(n.value(), Qt(n, {}, t)), new K()).insert(`
`, Qt(e));
}
function Qt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return e == null || ("formats" in e && typeof e.formats == "function" && (t = {
    ...t,
    ...e.formats()
  }, s && delete t["code-token"]), e.parent == null || e.parent.statics.blotName === "scroll" || e.parent.statics.scope !== e.statics.scope) ? t : Qt(e.parent, t, s);
}
const Zt = class Zt extends Gt {
  // Zero width no break space
  static value() {
  }
  constructor(t, s, n) {
    super(t, s), this.selection = n, this.textNode = document.createTextNode(Zt.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    for (; n != null && n.statics.scope !== G.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = Zt.CONTENTS.length, n.optimize(), n.formatAt(i, Zt.CONTENTS.length, t, s), this.savedLength = 0);
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
    const s = this.prev instanceof ge ? this.prev : null, n = s ? s.length() : 0, i = this.next instanceof ge ? this.next : null, r = i ? i.text : "", {
      textNode: o
    } = this, l = o.data.split(Zt.CONTENTS).join("");
    o.data = Zt.CONTENTS;
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
        this.savedLength = Zt.CONTENTS.length, s.isolate(this.offset(s), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      s = s.parent;
    }
  }
  value() {
    return "";
  }
};
U(Zt, "blotName", "cursor"), U(Zt, "className", "ql-cursor"), U(Zt, "tagName", "span"), U(Zt, "CONTENTS", "\uFEFF");
let Sn = Zt;
var Qo = { exports: {} }, Hc;
function k_() {
  return Hc || (Hc = 1, function(e) {
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
      var y = new i(h, d || a, b), w = s ? s + u : u;
      return a._events[w] ? a._events[w].fn ? a._events[w] = [a._events[w], y] : a._events[w].push(y) : (a._events[w] = y, a._eventsCount++), a;
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
      for (var b = 0, y = d.length, w = new Array(y); b < y; b++)
        w[b] = d[b].fn;
      return w;
    }, l.prototype.listenerCount = function(u) {
      var h = s ? s + u : u, d = this._events[h];
      return d ? d.fn ? 1 : d.length : 0;
    }, l.prototype.emit = function(u, h, d, b, y, w) {
      var A = s ? s + u : u;
      if (!this._events[A]) return !1;
      var O = this._events[A], N = arguments.length, M, B;
      if (O.fn) {
        switch (O.once && this.removeListener(u, O.fn, void 0, !0), N) {
          case 1:
            return O.fn.call(O.context), !0;
          case 2:
            return O.fn.call(O.context, h), !0;
          case 3:
            return O.fn.call(O.context, h, d), !0;
          case 4:
            return O.fn.call(O.context, h, d, b), !0;
          case 5:
            return O.fn.call(O.context, h, d, b, y), !0;
          case 6:
            return O.fn.call(O.context, h, d, b, y, w), !0;
        }
        for (B = 1, M = new Array(N - 1); B < N; B++)
          M[B - 1] = arguments[B];
        O.fn.apply(O.context, M);
      } else {
        var P = O.length, j;
        for (B = 0; B < P; B++)
          switch (O[B].once && this.removeListener(u, O[B].fn, void 0, !0), N) {
            case 1:
              O[B].fn.call(O[B].context);
              break;
            case 2:
              O[B].fn.call(O[B].context, h);
              break;
            case 3:
              O[B].fn.call(O[B].context, h, d);
              break;
            case 4:
              O[B].fn.call(O[B].context, h, d, b);
              break;
            default:
              if (!M) for (j = 1, M = new Array(N - 1); j < N; j++)
                M[j - 1] = arguments[j];
              O[B].fn.apply(O[B].context, M);
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
      var w = this._events[y];
      if (w.fn)
        w.fn === h && (!b || w.once) && (!d || w.context === d) && o(this, y);
      else {
        for (var A = 0, O = [], N = w.length; A < N; A++)
          (w[A].fn !== h || b && !w[A].once || d && w[A].context !== d) && O.push(w[A]);
        O.length ? this._events[y] = O.length === 1 ? O[0] : O : o(this, y);
      }
      return this;
    }, l.prototype.removeAllListeners = function(u) {
      var h;
      return u ? (h = s ? s + u : u, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = s, l.EventEmitter = l, e.exports = l;
  }(Qo)), Qo.exports;
}
var C_ = k_();
const S_ = /* @__PURE__ */ Jd(C_), Na = /* @__PURE__ */ new WeakMap(), ka = ["error", "warn", "log", "info"];
let Ca = "warn";
function ih(e) {
  if (Ca && ka.indexOf(e) <= ka.indexOf(Ca)) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    console[e](...s);
  }
}
function ts(e) {
  return ka.reduce((t, s) => (t[s] = ih.bind(console, s, e), t), {});
}
ts.level = (e) => {
  Ca = e;
};
ih.level = ts.level;
const Jo = ts("quill:events"), L_ = ["selectionchange", "mousedown", "mouseup", "click"];
L_.forEach((e) => {
  document.addEventListener(e, function() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = Na.get(i);
      r && r.emitter && r.emitter.handleDOM(...s);
    });
  });
});
class H extends S_ {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Jo.error);
  }
  emit() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    return Jo.log.call(Jo, ...s), super.emit(...s);
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
U(H, "events", {
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
}), U(H, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const ta = ts("quill:selection");
class Bs {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = s;
  }
}
class I_ {
  constructor(t, s) {
    this.emitter = s, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Bs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, H.sources.USER), 1);
    }), this.emitter.on(H.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(H.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? H.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(H.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: l,
          endOffset: a
        } = i.range;
        this.setNativeRange(r, o, l, a), this.update(H.sources.SILENT);
      }
    }), this.update(H.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(H.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(H.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(H.sources.USER);
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
    if (!(n == null || !n.native.collapsed || this.scroll.query(t, G.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const i = this.scroll.find(n.start.node, !1);
        if (i == null) return;
        if (i instanceof Rt) {
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
    return ta.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const s = this.getNativeRange();
    return s == null ? [null, null] : [this.normalizedToRange(s), s];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && ea(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const s = [[t.start.node, t.start.offset]];
    t.native.collapsed || s.push([t.end.node, t.end.offset]);
    const n = s.map((o) => {
      const [l, a] = o, u = this.scroll.find(l, !0), h = u.offset(this.scroll);
      return a === 0 ? h : u instanceof Rt ? h + u.index(l, a) : h + u.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Bs(r, i - r);
  }
  normalizeNative(t) {
    if (!ea(this.root, t.startContainer) || !t.collapsed && !ea(this.root, t.endContainer))
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
    if (ta.info("setNativeRange", t, s, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
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
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    if (typeof s == "string" && (n = s, s = !1), ta.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, s);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const s = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !fl(s, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [H.events.SELECTION_CHANGE, yn(this.lastRange), yn(s), t];
      this.emitter.emit(H.events.EDITOR_CHANGE, ...r), t !== H.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function ea(e, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return e.contains(t);
}
const x_ = /^[ -~]*$/;
class $_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let s = this.scroll.length();
    this.scroll.batchStart();
    const n = zc(t), i = new K();
    return R_(n.ops.slice()).reduce((o, l) => {
      const a = ee.Op.length(l);
      let u = l.attributes || {}, h = !1, d = !1;
      if (l.insert != null) {
        if (i.retain(a), typeof l.insert == "string") {
          const w = l.insert;
          d = !w.endsWith(`
`) && (s <= o || !!this.scroll.descendant(te, o)[0]), this.scroll.insertAt(o, w);
          const [A, O] = this.scroll.line(o);
          let N = us({}, Qt(A));
          if (A instanceof It) {
            const [M] = A.descendant(Rt, O);
            M && (N = us(N, Qt(M)));
          }
          u = ee.AttributeMap.diff(N, u) || {};
        } else if (typeof l.insert == "object") {
          const w = Object.keys(l.insert)[0];
          if (w == null) return o;
          const A = this.scroll.query(w, G.INLINE) != null;
          if (A)
            (s <= o || this.scroll.descendant(te, o)[0]) && (d = !0);
          else if (o > 0) {
            const [O, N] = this.scroll.descendant(Rt, o - 1);
            O instanceof ge ? O.value()[N] !== `
` && (h = !0) : O instanceof Gt && O.statics.scope === G.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, w, l.insert[w]), A) {
            const [O] = this.scroll.descendant(Rt, o);
            if (O) {
              const N = us({}, Qt(O));
              u = ee.AttributeMap.diff(N, u) || {};
            }
          }
        }
        s += a;
      } else if (i.push(l), l.retain !== null && typeof l.retain == "object") {
        const w = Object.keys(l.retain)[0];
        if (w == null) return o;
        this.scroll.updateEmbedAt(o, w, l.retain[w]);
      }
      Object.keys(u).forEach((w) => {
        this.scroll.formatAt(o, a, w, u[w]);
      });
      const b = h ? 1 : 0, y = d ? 1 : 0;
      return s += b + y, i.retain(b), i.delete(y), o + a + b + y;
    }, 0), i.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + ee.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(t, s) {
    return this.scroll.deleteAt(t, s), this.update(new K().retain(t).delete(s));
  }
  formatLine(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(s, 1)).forEach((o) => {
        o.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new K().retain(t).retain(s, yn(n));
    return this.update(i);
  }
  formatText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, s, r, n[r]);
    });
    const i = new K().retain(t).retain(s, yn(n));
    return this.update(i);
  }
  getContents(t, s) {
    return this.delta.slice(t, t + s);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, s) => t.concat(s.delta()), new K());
  }
  getFormat(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], i = [];
    s === 0 ? this.scroll.path(t).forEach((l) => {
      const [a] = l;
      a instanceof It ? n.push(a) : a instanceof Rt && i.push(a);
    }) : (n = this.scroll.lines(t, s), i = this.scroll.descendants(Rt, t, s));
    const [r, o] = [n, i].map((l) => {
      const a = l.shift();
      if (a == null) return {};
      let u = Qt(a);
      for (; Object.keys(u).length > 0; ) {
        const h = l.shift();
        if (h == null) return u;
        u = M_(Qt(h), u);
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
      return n.length() >= i + s && !(i === 0 && s === r) ? vi(n, i, s, !0) : vi(this.scroll, t, s, !0);
    }
    return "";
  }
  getText(t, s) {
    return this.getContents(t, s).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, s) {
    const n = zc(s), i = new K().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, s, n) {
    return this.scroll.insertAt(t, s, n), this.update(new K().retain(t).insert({
      [s]: n
    }));
  }
  insertText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return s = s.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, s), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, s.length, i, n[i]);
    }), this.update(new K().retain(t).insert(s, yn(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if ((t == null ? void 0 : t.statics.blotName) !== It.blotName) return !1;
    const s = t;
    return s.children.length > 1 ? !1 : s.children.head instanceof ye;
  }
  removeFormat(t, s) {
    const n = this.getText(t, s), [i, r] = this.scroll.line(t + s);
    let o = 0, l = new K();
    i != null && (o = i.length() - r, l = i.delta().slice(r, r + o - 1).insert(`
`));
    const u = this.getContents(t, s + o).diff(new K().insert(n).concat(l)), h = new K().retain(t).concat(u);
    return this.applyDelta(h);
  }
  update(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (s.length === 1 && s[0].type === "characterData" && // @ts-expect-error Fix me later
    s[0].target.data.match(x_) && this.scroll.find(s[0].target)) {
      const r = this.scroll.find(s[0].target), o = Qt(r), l = r.offset(this.scroll), a = s[0].oldValue.replace(Sn.CONTENTS, ""), u = new K().insert(a), h = new K().insert(r.value()), d = n && {
        oldRange: Wc(n.oldRange, -l),
        newRange: Wc(n.newRange, -l)
      };
      t = new K().retain(l).concat(u.diff(h, d)).reduce((y, w) => w.insert ? y.insert(w.insert, o) : y.push(w), new K()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !fl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function fn(e, t, s) {
  if (e.length === 0) {
    const [y] = sa(s.pop());
    return t <= 0 ? `</li></${y}>` : `</li></${y}>${fn([], t - 1, s)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: l
  }, ...a] = e, [u, h] = sa(l);
  if (o > t)
    return s.push(l), o === t + 1 ? `<${u}><li${h}>${vi(n, i, r)}${fn(a, o, s)}` : `<${u}><li>${fn(e, t + 1, s)}`;
  const d = s[s.length - 1];
  if (o === t && l === d)
    return `</li><li${h}>${vi(n, i, r)}${fn(a, o, s)}`;
  const [b] = sa(s.pop());
  return `</li></${b}>${fn(e, t - 1, s)}`;
}
function vi(e, t, s) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in e && typeof e.html == "function")
    return e.html(t, s);
  if (e instanceof ge)
    return Hr(e.value().slice(t, t + s)).replaceAll(" ", "&nbsp;");
  if (e instanceof pe) {
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
      }), fn(u, -1, []);
    }
    const i = [];
    if (e.children.forEachAt(t, s, (u, h, d) => {
      i.push(vi(u, h, d));
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
function M_(e, t) {
  return Object.keys(t).reduce((s, n) => {
    if (e[n] == null) return s;
    const i = t[n];
    return i === e[n] ? s[n] = i : Array.isArray(i) ? i.indexOf(e[n]) < 0 ? s[n] = i.concat([e[n]]) : s[n] = i : s[n] = [i, e[n]], s;
  }, {});
}
function sa(e) {
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
function zc(e) {
  return e.reduce((t, s) => {
    if (typeof s.insert == "string") {
      const n = s.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, s.attributes);
    }
    return t.push(s);
  }, new K());
}
function Wc(e, t) {
  let {
    index: s,
    length: n
  } = e;
  return new Bs(s + t, n);
}
function R_(e) {
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
class ve {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = s;
  }
}
U(ve, "DEFAULTS", {});
const cr = "\uFEFF";
class ml extends Gt {
  constructor(t, s) {
    super(t, s), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(cr), this.rightGuard = document.createTextNode(cr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, s) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, s);
  }
  restore(t) {
    let s = null, n;
    const i = t.data.split(cr).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof ge) {
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
    else t === this.rightGuard && (this.next instanceof ge ? (this.next.insertAt(0, i), s = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), s = {
      startNode: n,
      startOffset: i.length
    }));
    return t.data = cr, s;
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
class D_ {
  constructor(t, s) {
    U(this, "isComposing", !1);
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
    s && !(s instanceof ml) && (this.emitter.emit(H.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(H.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(H.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(H.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const hi = class hi {
  constructor(t, s) {
    U(this, "modules", {});
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
U(hi, "DEFAULTS", {
  modules: {}
}), U(hi, "themes", {
  default: hi
});
let Ln = hi;
const q_ = (e) => e.parentElement || e.getRootNode().host || null, B_ = (e) => {
  const t = e.getBoundingClientRect(), s = "offsetWidth" in e && Math.abs(t.width) / e.offsetWidth || 1, n = "offsetHeight" in e && Math.abs(t.height) / e.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + e.clientWidth * s,
    bottom: t.top + e.clientHeight * n,
    left: t.left
  };
}, ur = (e) => {
  const t = parseInt(e, 10);
  return Number.isNaN(t) ? 0 : t;
}, Kc = (e, t, s, n, i, r) => e < s && t > n ? 0 : e < s ? -(s - e + i) : t > n ? t - e > n - s ? e + i - s : t - n + r : 0, P_ = (e, t) => {
  var r, o, l;
  const s = e.ownerDocument;
  let n = t, i = e;
  for (; i; ) {
    const a = i === s.body, u = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? s.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? s.documentElement.clientHeight,
      left: 0
    } : B_(i), h = getComputedStyle(i), d = Kc(n.left, n.right, u.left, u.right, ur(h.scrollPaddingLeft), ur(h.scrollPaddingRight)), b = Kc(n.top, n.bottom, u.top, u.bottom, ur(h.scrollPaddingTop), ur(h.scrollPaddingBottom));
    if (d || b)
      if (a)
        (l = s.defaultView) == null || l.scrollBy(d, b);
      else {
        const {
          scrollLeft: y,
          scrollTop: w
        } = i;
        b && (i.scrollTop += b), d && (i.scrollLeft += d);
        const A = i.scrollLeft - y, O = i.scrollTop - w;
        n = {
          left: n.left - A,
          top: n.top - O,
          right: n.right - A,
          bottom: n.bottom - O
        };
      }
    i = a || h.position === "fixed" ? null : q_(i);
  }
}, j_ = 100, V_ = ["block", "break", "cursor", "inline", "scroll", "text"], U_ = (e, t, s) => {
  const n = new Cn();
  return V_.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), e.forEach((i) => {
    let r = t.query(i);
    r || s.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > j_) {
        s.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, _n = ts("quill"), dr = new Cn();
pe.uiClass = "ql-ui";
const ce = class ce {
  static debug(t) {
    t === !0 && (t = "log"), ts.level(t);
  }
  static find(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Na.get(t) || dr.find(t, s);
  }
  static import(t) {
    return this.imports[t] == null && _n.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, s) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], s);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && _n.warn(`Overwriting ${t} with`, s), this.imports[t] = s, (t.startsWith("blots/") || t.startsWith("formats/")) && s && typeof s != "boolean" && s.blotName !== "abstract" && dr.register(s), typeof s.register == "function" && s.register(dr);
    }
  }
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = F_(t, s), this.container = this.options.container, this.container == null) {
      _n.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && ce.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Na.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new H();
    const i = gl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new $_(this.scroll), this.selection = new I_(this.scroll, this.emitter), this.composition = new D_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(H.events.EDITOR_CHANGE, (o) => {
      o === H.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(H.events.SCROLL_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      le.call(this, () => this.editor.update(null, l, h), o);
    }), this.emitter.on(H.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      le.call(this, () => {
        const d = new K().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(d, [], h);
      }, ce.sources.USER);
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
    return [t, s, , n] = Ue(t, s, n), le.call(this, () => this.editor.deleteText(t, s), n, t, -1 * s);
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
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    return le.call(this, () => {
      const i = this.getSelection(!0);
      let r = new K();
      if (i == null) return r;
      if (this.scroll.query(t, G.BLOCK))
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
      return this.setSelection(i, H.sources.SILENT), r;
    }, n);
  }
  formatLine(t, s, n, i, r) {
    let o;
    return [t, s, o, r] = Ue(
      t,
      s,
      // @ts-expect-error
      n,
      i,
      r
    ), le.call(this, () => this.editor.formatLine(t, s, o), r, t, 0);
  }
  formatText(t, s, n, i, r) {
    let o;
    return [t, s, o, r] = Ue(
      // @ts-expect-error
      t,
      s,
      n,
      i,
      r
    ), le.call(this, () => this.editor.formatText(t, s, o), r, t, 0);
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
    return [t, s] = Ue(t, s), this.editor.getContents(t, s);
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
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = Ue(t, s), this.editor.getHTML(t, s);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = Ue(t, s), this.editor.getText(t, s);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, s, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ce.sources.API;
    return le.call(this, () => this.editor.insertEmbed(t, s, n), i, t);
  }
  insertText(t, s, n, i, r) {
    let o;
    return [t, , o, r] = Ue(t, 0, n, i, r), le.call(this, () => this.editor.insertText(t, s, o), r, t, s.length);
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
    return [t, s, , n] = Ue(t, s, n), le.call(this, () => this.editor.removeFormat(t, s), n, t);
  }
  scrollRectIntoView(t) {
    P_(this.root, t);
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
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    return le.call(this, () => {
      t = new K(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, s);
  }
  setSelection(t, s, n) {
    t == null ? this.selection.setRange(null, s || ce.sources.API) : ([t, s, , n] = Ue(t, s, n), this.selection.setRange(new Bs(Math.max(0, t), s), n), n !== H.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    const n = new K().insert(t);
    return this.setContents(n, s);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const s = this.scroll.update(t);
    return this.selection.update(t), s;
  }
  updateContents(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    return le.call(this, () => (t = new K(t), this.editor.applyDelta(t)), s, !0);
  }
};
U(ce, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: dr,
  theme: "default"
}), U(ce, "events", H.events), U(ce, "sources", H.sources), U(ce, "version", "2.0.3"), U(ce, "imports", {
  delta: K,
  parchment: E_,
  "core/module": ve,
  "core/theme": Ln
});
let I = ce;
function Gc(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function na(e) {
  return Object.entries(e ?? {}).reduce((t, s) => {
    let [n, i] = s;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Yc(e) {
  return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
}
function F_(e, t) {
  const s = Gc(e);
  if (!s)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === I.DEFAULTS.theme ? Ln : I.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = I.DEFAULTS, {
    modules: l,
    ...a
  } = i.DEFAULTS;
  let u = na(t.modules);
  u != null && u.toolbar && u.toolbar.constructor !== Object && (u = {
    ...u,
    toolbar: {
      container: u.toolbar
    }
  });
  const h = us({}, na(r), na(l), u), d = {
    ...o,
    ...Yc(a),
    ...Yc(t)
  };
  let b = t.registry;
  return b ? t.formats && _n.warn('Ignoring "formats" option because "registry" is specified') : b = t.formats ? U_(t.formats, d.registry, _n) : d.registry, {
    ...d,
    registry: b,
    container: s,
    theme: i,
    modules: Object.entries(h).reduce((y, w) => {
      let [A, O] = w;
      if (!O) return y;
      const N = I.import(`modules/${A}`);
      return N == null ? (_n.error(`Cannot load ${A} module. Are you sure you registered it?`), y) : {
        ...y,
        // @ts-expect-error
        [A]: us({}, N.DEFAULTS || {}, O)
      };
    }, {}),
    bounds: Gc(d.bounds)
  };
}
function le(e, t, s, n) {
  if (!this.isEnabled() && t === H.sources.USER && !this.allowReadOnlyEdits)
    return new K();
  let i = s == null ? null : this.getSelection();
  const r = this.editor.delta, o = e();
  if (i != null && (s === !0 && (s = i.index), n == null ? i = Xc(i, o, t) : n !== 0 && (i = Xc(i, s, n, t)), this.setSelection(i, H.sources.SILENT)), o.length() > 0) {
    const l = [H.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(H.events.EDITOR_CHANGE, ...l), t !== H.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function Ue(e, t, s, n, i) {
  let r = {};
  return typeof e.index == "number" && typeof e.length == "number" ? typeof t != "number" ? (i = n, n = s, s = t, t = e.length, e = e.index) : (t = e.length, e = e.index) : typeof t != "number" && (i = n, n = s, s = t, t = 0), typeof s == "object" ? (r = s, i = n) : typeof s == "string" && (n != null ? r[s] = n : i = s), i = i || H.sources.API, [e, t, r, i];
}
function Xc(e, t, s, n) {
  const i = typeof s == "number" ? s : 0;
  if (e == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [e.index, e.index + e.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(l, n !== H.sources.USER)
  )) : [r, o] = [e.index, e.index + e.length].map((l) => l < t || l === t && n === H.sources.USER ? l : i >= 0 ? l + i : Math.max(t, l + i)), new Bs(r, o - r);
}
class zs extends Fr {
}
function Zc(e) {
  return e instanceof It || e instanceof te;
}
function Qc(e) {
  return typeof e.updateContent == "function";
}
class pn extends gl {
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
    this.emitter.emit(H.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(H.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, s) {
    this.emitter.emit(H.events.SCROLL_EMBED_UPDATE, t, s);
  }
  deleteAt(t, s) {
    const [n, i] = this.line(t), [r] = this.line(t + s);
    if (super.deleteAt(t, s), r != null && n !== r && i > 0) {
      if (n instanceof te || r instanceof te) {
        this.optimize();
        return;
      }
      const o = r.children.head instanceof ye ? null : r.children.head;
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
      if (n == null || this.scroll.query(s, G.BLOCK) == null) {
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
    if (t.statics.scope === G.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(t), super.insertBefore(n, s);
    } else
      super.insertBefore(t, s);
  }
  insertContents(t, s) {
    const n = this.deltaToRenderBlocks(s.concat(new K().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(te, t)[0] && t < this.length()), u = r.type === "block" ? r.delta : new K().insert({
        [r.key]: r.value
      });
      ia(this, t, u);
      const h = r.type === "block" ? 1 : 0, d = t + u.length() + h;
      a && this.insertAt(d - 1, `
`);
      const b = Qt(this.line(t)[0]), y = ee.AttributeMap.diff(b, r.attributes) || {};
      Object.keys(y).forEach((w) => {
        this.formatAt(d - 1, 1, w, y[w]);
      }), t = d;
    }
    let [o, l] = this.children.find(t);
    if (n.length && (o && (o = o.split(l), l = 0), n.forEach((a) => {
      if (a.type === "block") {
        const u = this.createBlock(a.attributes, o || void 0);
        ia(u, 0, a.delta);
      } else {
        const u = this.create(a.key, a.value);
        this.insertBefore(u, o || void 0), Object.keys(a.attributes).forEach((h) => {
          u.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + l : this.length();
      ia(this, a, i.delta);
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
    return n instanceof Rt ? [n, i] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(Zc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let l = [], a = o;
      return i.children.forEachAt(r, o, (u, h, d) => {
        Zc(u) ? l.push(u) : u instanceof Fr && (l = l.concat(n(u, h, a))), a -= d;
      }), l;
    };
    return n(this, t, s);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, s), t.length > 0 && this.emitter.emit(H.events.SCROLL_OPTIMIZE, t, s));
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
    let s = H.sources.USER;
    typeof t == "string" && (s = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((n) => {
      let {
        target: i
      } = n;
      const r = this.find(i, !0);
      return r && !Qc(r);
    }), t.length > 0 && this.emitter.emit(H.events.SCROLL_BEFORE_UPDATE, s, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(H.events.SCROLL_UPDATE, s, t);
  }
  updateEmbedAt(t, s, n) {
    const [i] = this.descendant((r) => r instanceof te, t);
    i && i.statics.blotName === s && Qc(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const s = [];
    let n = new K();
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
            }), n = new K();
          });
          const l = o[o.length - 1];
          l && n.insert(l, i.attributes);
        } else {
          const o = Object.keys(r)[0];
          if (!o) return;
          this.query(o, G.INLINE) ? n.push(i) : (n.length() && s.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new K(), s.push({
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
      this.query(a, G.BLOCK & G.BLOT) != null ? n = a : i[a] = u;
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
U(pn, "blotName", "scroll"), U(pn, "className", "ql-editor"), U(pn, "tagName", "DIV"), U(pn, "defaultChild", It), U(pn, "allowedChildren", [It, te, zs]);
function ia(e, t, s) {
  s.reduce((n, i) => {
    const r = ee.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const l = i.insert;
        e.insertAt(n, l);
        const [a] = e.descendant(Rt, n), u = Qt(a);
        o = ee.AttributeMap.diff(u, o) || {};
      } else if (typeof i.insert == "object") {
        const l = Object.keys(i.insert)[0];
        if (l == null) return n;
        if (e.insertAt(n, l, i.insert[l]), e.scroll.query(l, G.INLINE) != null) {
          const [u] = e.descendant(Rt, n), h = Qt(u);
          o = ee.AttributeMap.diff(h, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      e.formatAt(n, r, l, o[l]);
    }), n + r;
  }, t);
}
const bl = {
  scope: G.BLOCK,
  whitelist: ["right", "center", "justify"]
}, H_ = new $e("align", "align", bl), rh = new be("align", "ql-align", bl), oh = new vs("align", "text-align", bl);
class ah extends vs {
  value(t) {
    let s = super.value(t);
    return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${s.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : s;
  }
}
const z_ = new be("color", "ql-color", {
  scope: G.INLINE
}), yl = new ah("color", "color", {
  scope: G.INLINE
}), W_ = new be("background", "ql-bg", {
  scope: G.INLINE
}), vl = new ah("background", "background-color", {
  scope: G.INLINE
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
${Hr(this.code(t, s))}
</pre>`;
  }
}
class Dt extends It {
  static register() {
    I.register(Ws);
  }
}
U(Dt, "TAB", "  ");
class _l extends Me {
}
_l.blotName = "code";
_l.tagName = "CODE";
Dt.blotName = "code-block";
Dt.className = "ql-code-block";
Dt.tagName = "DIV";
Ws.blotName = "code-block-container";
Ws.className = "ql-code-block-container";
Ws.tagName = "DIV";
Ws.allowedChildren = [Dt];
Dt.allowedChildren = [ge, ye, Sn];
Dt.requiredContainer = Ws;
const El = {
  scope: G.BLOCK,
  whitelist: ["rtl"]
}, lh = new $e("direction", "dir", El), ch = new be("direction", "ql-direction", El), uh = new vs("direction", "direction", El), dh = {
  scope: G.INLINE,
  whitelist: ["serif", "monospace"]
}, hh = new be("font", "ql-font", dh);
class K_ extends vs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const fh = new K_("font", "font-family", dh), ph = new be("size", "ql-size", {
  scope: G.INLINE,
  whitelist: ["small", "large", "huge"]
}), gh = new vs("size", "font-size", {
  scope: G.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), G_ = ts("quill:keyboard"), Y_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class zr extends ve {
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
    const i = Z_(t);
    if (i == null) {
      G_.warn("Attempted to add invalid keyboard binding", i);
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((N) => zr.match(t, N));
      if (i.length === 0) return;
      const r = I.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, a] = this.quill.getLine(o.index), [u, h] = this.quill.getLeaf(o.index), [d, b] = o.length === 0 ? [u, h] : this.quill.getLeaf(o.index + o.length), y = u instanceof Cr ? u.value().slice(0, h) : "", w = d instanceof Cr ? d.value().slice(b) : "", A = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
        offset: a,
        prefix: y,
        suffix: w,
        event: t
      };
      i.some((N) => {
        if (N.collapsed != null && N.collapsed !== A.collapsed || N.empty != null && N.empty !== A.empty || N.offset != null && N.offset !== A.offset)
          return !1;
        if (Array.isArray(N.format)) {
          if (N.format.every((M) => A.format[M] == null))
            return !1;
        } else if (typeof N.format == "object" && !Object.keys(N.format).every((M) => N.format[M] === !0 ? A.format[M] != null : N.format[M] === !1 ? A.format[M] == null : fl(N.format[M], A.format[M])))
          return !1;
        return N.prefix != null && !N.prefix.test(A.prefix) || N.suffix != null && !N.suffix.test(A.suffix) ? !1 : N.handler.call(this, o, A, N) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, s) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(s.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new K().retain(t.index - n).delete(n);
    if (s.offset === 0) {
      const [l] = this.quill.getLine(t.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const u = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = ee.AttributeMap.diff(u, h) || {}, Object.keys(i).length > 0) {
          const d = new K().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(d);
        }
      }
    }
    this.quill.updateContents(o, I.sources.USER), this.quill.focus();
  }
  handleDelete(t, s) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new K().retain(t.index).delete(n);
    if (s.offset >= r.length() - 1) {
      const [l] = this.quill.getLine(t.index + 1);
      if (l) {
        const a = r.formats(), u = this.quill.getFormat(t.index, 1);
        i = ee.AttributeMap.diff(a, u) || {}, Object.keys(i).length > 0 && (o = o.retain(l.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, I.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    wl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, s) {
    const n = Object.keys(s.format).reduce((r, o) => (this.quill.scroll.query(o, G.BLOCK) && !Array.isArray(s.format[o]) && (r[o] = s.format[o]), r), {}), i = new K().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, I.sources.USER), this.quill.setSelection(t.index + 1, I.sources.SILENT), this.quill.focus();
  }
}
const X_ = {
  bindings: {
    bold: ra("bold"),
    italic: ra("italic"),
    underline: ra("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", I.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", I.sources.USER), !1);
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
        t.format.indent != null ? this.quill.format("indent", "-1", I.sources.USER) : t.format.list != null && this.quill.format("list", !1, I.sources.USER);
      }
    },
    "indent code-block": Jc(!0),
    "outdent code-block": Jc(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(e) {
        this.quill.deleteText(e.index - 1, 1, I.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(e, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const s = new K().retain(e.index).delete(e.length).insert("	");
        return this.quill.updateContents(s, I.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index + 1, I.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, I.sources.USER);
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
        t.format.indent && (s.indent = !1), this.quill.formatLine(e.index, e.length, s, I.sources.USER);
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
        }, i = new K().retain(e.index).insert(`
`, n).retain(t.length() - s - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, I.sources.USER), this.quill.setSelection(e.index + 1, I.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(e, t) {
        const [s, n] = this.quill.getLine(e.index), i = new K().retain(e.index).insert(`
`, t.format).retain(s.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, I.sources.USER), this.quill.setSelection(e.index + 1, I.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [s, n, i, r] = t.getTable(e), o = Q_(s, n, i, r);
          if (o == null) return;
          let l = s.offset();
          if (o < 0) {
            const a = new K().retain(l).insert(`
`);
            this.quill.updateContents(a, I.sources.USER), this.quill.setSelection(e.index + 1, e.length, I.sources.SILENT);
          } else if (o > 0) {
            l += s.length();
            const a = new K().retain(l).insert(`
`);
            this.quill.updateContents(a, I.sources.USER), this.quill.setSelection(l, I.sources.USER);
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
        s.shiftKey ? this.quill.setSelection(i - 1, I.sources.USER) : this.quill.setSelection(i + n.length(), I.sources.USER);
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
        this.quill.insertText(e.index, " ", I.sources.USER), this.quill.history.cutoff();
        const o = new K().retain(e.index - i).delete(s + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, I.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - s, I.sources.SILENT), !1;
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
            const r = new K().retain(e.index + t.length() - s - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, I.sources.USER), this.quill.setSelection(e.index - 1, I.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": hr("ArrowLeft", !1),
    "embed left shift": hr("ArrowLeft", !0),
    "embed right": hr("ArrowRight", !1),
    "embed right shift": hr("ArrowRight", !0),
    "table down": tu(!1),
    "table up": tu(!0)
  }
};
zr.DEFAULTS = X_;
function Jc(e) {
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
        this.quill.insertText(t.index, r, I.sources.USER), this.quill.setSelection(t.index + r.length, I.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: l,
        length: a
      } = t;
      o.forEach((u, h) => {
        e ? (u.insertAt(0, r), h === 0 ? l += r.length : a += r.length) : u.domNode.textContent.startsWith(r) && (u.deleteAt(0, r.length), h === 0 ? l -= r.length : a -= r.length);
      }), this.quill.update(I.sources.USER), this.quill.setSelection(l, a, I.sources.SILENT);
    }
  };
}
function hr(e, t) {
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
      return r instanceof Gt ? (e === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, I.sources.USER) : this.quill.setSelection(n.index - 1, I.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, I.sources.USER) : this.quill.setSelection(n.index + n.length + 1, I.sources.USER), !1) : !0;
    }
  };
}
function ra(e) {
  return {
    key: e[0],
    shortKey: !0,
    handler(t, s) {
      this.quill.format(e, !s.format[e], I.sources.USER);
    }
  };
}
function tu(e) {
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
          this.quill.setSelection(a, 0, I.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (e ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, I.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, I.sources.USER));
      }
      return !1;
    }
  };
}
function Z_(e) {
  if (typeof e == "string" || typeof e == "number")
    e = {
      key: e
    };
  else if (typeof e == "object")
    e = yn(e);
  else
    return null;
  return e.shortKey && (e[Y_] = e.shortKey, delete e.shortKey), e;
}
function wl(e) {
  let {
    quill: t,
    range: s
  } = e;
  const n = t.getLines(s);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), o = n[n.length - 1].formats();
    i = ee.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(s, I.sources.USER), Object.keys(i).length > 0 && t.formatLine(s.index, 1, i, I.sources.USER), t.setSelection(s.index, I.sources.SILENT);
}
function Q_(e, t, s, n) {
  return t.prev == null && t.next == null ? s.prev == null && s.next == null ? n === 0 ? -1 : 1 : s.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const J_ = /font-weight:\s*normal/, tE = ["P", "OL", "UL"], eu = (e) => e && tE.includes(e.tagName), eE = (e) => {
  Array.from(e.querySelectorAll("br")).filter((t) => eu(t.previousElementSibling) && eu(t.nextElementSibling)).forEach((t) => {
    var s;
    (s = t.parentNode) == null || s.removeChild(t);
  });
}, sE = (e) => {
  Array.from(e.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var s;
    return (s = t.getAttribute("style")) == null ? void 0 : s.match(J_);
  }).forEach((t) => {
    var n;
    const s = e.createDocumentFragment();
    s.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(s, t);
  });
};
function nE(e) {
  e.querySelector('[id^="docs-internal-guid-"]') && (sE(e), eE(e));
}
const iE = /\bmso-list:[^;]*ignore/i, rE = /\bmso-list:[^;]*\bl(\d+)/i, oE = /\bmso-list:[^;]*\blevel(\d+)/i, aE = (e, t) => {
  const s = e.getAttribute("style"), n = s == null ? void 0 : s.match(rE);
  if (!n)
    return null;
  const i = Number(n[1]), r = s == null ? void 0 : s.match(oE), o = r ? Number(r[1]) : 1, l = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(l), u = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: u,
    element: e
  };
}, lE = (e) => {
  var o, l;
  const t = Array.from(e.querySelectorAll("[style*=mso-list]")), s = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(iE) ? s.push(a) : n.push(a);
  }), s.forEach((a) => {
    var u;
    return (u = a.parentNode) == null ? void 0 : u.removeChild(a);
  });
  const i = e.documentElement.innerHTML, r = n.map((a) => aE(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let u = r.shift();
    for (; u; )
      a.push(u), u = r.length && ((o = r[0]) == null ? void 0 : o.element) === u.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === u.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((y) => {
      const w = document.createElement("li");
      w.setAttribute("data-list", y.type), y.indent > 1 && w.setAttribute("class", `ql-indent-${y.indent - 1}`), w.innerHTML = y.element.innerHTML, h.appendChild(w);
    });
    const d = (l = a[0]) == null ? void 0 : l.element, {
      parentNode: b
    } = d ?? {};
    d && (b == null || b.replaceChild(h, d)), a.slice(1).forEach((y) => {
      let {
        element: w
      } = y;
      b == null || b.removeChild(w);
    });
  }
};
function cE(e) {
  e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && lE(e);
}
const uE = [cE, nE], dE = (e) => {
  e.documentElement && uE.forEach((t) => {
    t(e);
  });
}, hE = ts("quill:clipboard"), fE = [[Node.TEXT_NODE, OE], [Node.TEXT_NODE, nu], ["br", yE], [Node.ELEMENT_NODE, nu], [Node.ELEMENT_NODE, bE], [Node.ELEMENT_NODE, mE], [Node.ELEMENT_NODE, TE], ["li", EE], ["ol, ul", wE], ["pre", vE], ["tr", AE], ["b", oa("bold")], ["i", oa("italic")], ["strike", oa("strike")], ["style", _E]], pE = [H_, lh].reduce((e, t) => (e[t.keyName] = t, e), {}), su = [oh, vl, yl, uh, fh, gh].reduce((e, t) => (e[t.keyName] = t, e), {});
class mh extends ve {
  constructor(t, s) {
    super(t, s), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], fE.concat(this.options.matchers ?? []).forEach((n) => {
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
    if (i[Dt.blotName])
      return new K().insert(n || "", {
        [Dt.blotName]: i[Dt.blotName]
      });
    if (!s)
      return new K().insert(n || "", i);
    const r = this.convertHTML(s);
    return Ii(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new K().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    dE(t);
  }
  convertHTML(t) {
    const s = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(s);
    const n = s.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Tl(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : I.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, s), this.quill.setSelection(0, I.sources.SILENT);
    } else {
      const i = this.convert({
        html: s,
        text: ""
      });
      this.quill.updateContents(new K().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), I.sources.SILENT);
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
    (o = t.clipboardData) == null || o.setData("text/plain", r), (l = t.clipboardData) == null || l.setData("text/html", i), s && wl({
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
    hE.log("onPaste", o, {
      text: n,
      html: i
    });
    const l = new K().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(l, I.sources.USER), this.quill.setSelection(l.length() - t.length, I.sources.SILENT), this.quill.scrollSelectionIntoView();
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
U(mh, "DEFAULTS", {
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
  }, new K()) : e;
}
function Ii(e, t) {
  let s = "";
  for (let n = e.ops.length - 1; n >= 0 && s.length < t.length; --n) {
    const i = e.ops[n];
    if (typeof i.insert != "string") break;
    s = i.insert + s;
  }
  return s.slice(-1 * t.length) === t;
}
function ls(e, t) {
  if (!(e instanceof Element)) return !1;
  const s = t.query(e);
  return s && s.prototype instanceof Gt ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(e.tagName.toLowerCase());
}
function gE(e, t) {
  return e.previousElementSibling && e.nextElementSibling && !ls(e.previousElementSibling, t) && !ls(e.nextElementSibling, t);
}
const fr = /* @__PURE__ */ new WeakMap();
function bh(e) {
  return e == null ? !1 : (fr.has(e) || (e.tagName === "PRE" ? fr.set(e, !0) : fr.set(e, bh(e.parentNode))), fr.get(e));
}
function Tl(e, t, s, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, e), new K()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let l = Tl(e, o, s, n, i);
    return o.nodeType === t.ELEMENT_NODE && (l = s.reduce((a, u) => u(o, a, e), l), l = (i.get(o) || []).reduce((a, u) => u(o, a, e), l)), r.concat(l);
  }, new K()) : new K();
}
function oa(e) {
  return (t, s, n) => Ks(s, e, !0, n);
}
function mE(e, t, s) {
  const n = $e.keys(e), i = be.keys(e), r = vs.keys(e), o = {};
  return n.concat(i).concat(r).forEach((l) => {
    let a = s.query(l, G.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(e), o[a.attrName]) || (a = pE[l], a != null && (a.attrName === l || a.keyName === l) && (o[a.attrName] = a.value(e) || void 0), a = su[l], a != null && (a.attrName === l || a.keyName === l) && (a = su[l], o[a.attrName] = a.value(e) || void 0));
  }), Object.entries(o).reduce((l, a) => {
    let [u, h] = a;
    return Ks(l, u, h, s);
  }, t);
}
function bE(e, t, s) {
  const n = s.query(e);
  if (n == null) return t;
  if (n.prototype instanceof Gt) {
    const i = {}, r = n.value(e);
    if (r != null)
      return i[n.blotName] = r, new K().insert(i, n.formats(e, s));
  } else if (n.prototype instanceof yi && !Ii(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Ks(t, n.blotName, n.formats(e, s), s);
  return t;
}
function yE(e, t) {
  return Ii(t, `
`) || t.insert(`
`), t;
}
function vE(e, t, s) {
  const n = s.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(e, s) : !0;
  return Ks(t, "code-block", i, s);
}
function _E() {
  return new K();
}
function EE(e, t, s) {
  const n = s.query(e);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Ii(t, `
`))
    return t;
  let i = -1, r = e.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: i,
    ...l.attributes || {}
  }) : o, new K());
}
function wE(e, t, s) {
  const n = e;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Ks(t, "list", i, s);
}
function nu(e, t, s) {
  if (!Ii(t, `
`)) {
    if (ls(e, s) && (e.childNodes.length > 0 || e instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && e.nextSibling) {
      let n = e.nextSibling;
      for (; n != null; ) {
        if (ls(n, s))
          return t.insert(`
`);
        const i = s.query(n);
        if (i && i.prototype instanceof te)
          return t.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return t;
}
function TE(e, t, s) {
  var r;
  const n = {}, i = e.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, l) => {
    let [a, u] = l;
    return Ks(o, a, u, s);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new K().insert("	").concat(t) : t;
}
function AE(e, t, s) {
  var i, r;
  const n = ((i = e.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? e.parentElement : (r = e.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const l = Array.from(n.querySelectorAll("tr")).indexOf(e) + 1;
    return Ks(t, "table", l, s);
  }
  return t;
}
function OE(e, t, s) {
  var i;
  let n = e.data;
  if (((i = e.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!bh(e)) {
    if (n.trim().length === 0 && n.includes(`
`) && !gE(e, s))
      return t;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (e.previousSibling == null && e.parentElement != null && ls(e.parentElement, s) || e.previousSibling instanceof Element && ls(e.previousSibling, s)) && (n = n.replace(/^ /, "")), (e.nextSibling == null && e.parentElement != null && ls(e.parentElement, s) || e.nextSibling instanceof Element && ls(e.nextSibling, s)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return t.insert(n);
}
class yh extends ve {
  constructor(s, n) {
    super(s, n);
    U(this, "lastRecorded", 0);
    U(this, "ignoreChange", !1);
    U(this, "stack", {
      undo: [],
      redo: []
    });
    U(this, "currentRange", null);
    this.quill.on(I.events.EDITOR_CHANGE, (i, r, o, l) => {
      i === I.events.SELECTION_CHANGE ? r && l !== I.sources.SILENT && (this.currentRange = r) : i === I.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || l === I.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = Sa(this.currentRange, r));
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
      range: Sa(i.range, o)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, I.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
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
    iu(this.stack.undo, s), iu(this.stack.redo, s);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(s) {
    if (s.range)
      this.quill.setSelection(s.range, I.sources.USER);
    else {
      const n = kE(this.quill.scroll, s.delta);
      this.quill.setSelection(n, I.sources.USER);
    }
  }
}
U(yh, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function iu(e, t) {
  let s = t;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const i = e[n];
    e[n] = {
      delta: s.transform(i.delta, !0),
      range: i.range && Sa(i.range, s)
    }, s = i.delta.transform(s), e[n].delta.length() === 0 && e.splice(n, 1);
  }
}
function NE(e, t) {
  const s = t.ops[t.ops.length - 1];
  return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some((n) => e.query(n, G.BLOCK) != null) : !1;
}
function kE(e, t) {
  const s = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - s;
  return NE(e, t) && (n -= 1), n;
}
function Sa(e, t) {
  if (!e) return e;
  const s = t.transformPosition(e.index), n = t.transformPosition(e.index + e.length);
  return {
    index: s,
    length: n - s
  };
}
class vh extends ve {
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
vh.DEFAULTS = {
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
      }), new K().retain(e.index).delete(e.length));
      this.quill.updateContents(i, H.sources.USER), this.quill.setSelection(e.index + n.length, H.sources.SILENT);
    });
  }
};
const CE = ["insertText", "insertReplacementText"];
class SE extends ve {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(I.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    wl({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (s) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new K().retain(t.index).insert(s, n), I.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + s.length, 0, I.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !CE.includes(t.inputType))
      return;
    const s = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!s || s.collapsed === !0)
      return;
    const n = LE(t);
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
function LE(e) {
  var t;
  return typeof e.data == "string" ? e.data : (t = e.dataTransfer) != null && t.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
const IE = /Mac/i.test(navigator.platform), xE = 100, $E = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || IE && e.key === "a" && e.ctrlKey === !0);
class ME extends ve {
  constructor(s, n) {
    super(s, n);
    U(this, "isListening", !1);
    U(this, "selectionChangeDeadline", 0);
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
        if (!(i instanceof pe) || !i.uiNode)
          return !0;
        const o = getComputedStyle(i.domNode).direction === "rtl";
        return o && r.key !== "ArrowRight" || !o && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(s.index - 1, s.length + (r.shiftKey ? 1 : 0), I.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (s) => {
      !s.defaultPrevented && $E(s) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + xE, this.isListening) return;
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
    if (!(i instanceof pe) || !i.uiNode) return;
    const r = document.createRange();
    r.setStartAfter(i.uiNode), r.setEndAfter(i.uiNode), s.removeAllRanges(), s.addRange(r);
  }
}
I.register({
  "blots/block": It,
  "blots/block/embed": te,
  "blots/break": ye,
  "blots/container": zs,
  "blots/cursor": Sn,
  "blots/embed": ml,
  "blots/inline": Me,
  "blots/scroll": pn,
  "blots/text": ge,
  "modules/clipboard": mh,
  "modules/history": yh,
  "modules/keyboard": zr,
  "modules/uploader": vh,
  "modules/input": SE,
  "modules/uiNode": ME
});
class RE extends be {
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
const DE = new RE("indent", "ql-indent", {
  scope: G.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class La extends It {
}
U(La, "blotName", "blockquote"), U(La, "tagName", "blockquote");
class Ia extends It {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
U(Ia, "blotName", "header"), U(Ia, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class xi extends zs {
}
xi.blotName = "list-container";
xi.tagName = "OL";
class $i extends It {
  static create(t) {
    const s = super.create();
    return s.setAttribute("data-list", t), s;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    I.register(xi);
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
$i.blotName = "list";
$i.tagName = "LI";
xi.allowedChildren = [$i];
$i.requiredContainer = xi;
class _i extends Me {
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
U(_i, "blotName", "bold"), U(_i, "tagName", ["STRONG", "B"]);
class xa extends _i {
}
U(xa, "blotName", "italic"), U(xa, "tagName", ["EM", "I"]);
class cs extends Me {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("href", this.sanitize(t)), s.setAttribute("rel", "noopener noreferrer"), s.setAttribute("target", "_blank"), s;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return _h(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, s) {
    t !== this.statics.blotName || !s ? super.format(t, s) : this.domNode.setAttribute("href", this.constructor.sanitize(s));
  }
}
U(cs, "blotName", "link"), U(cs, "tagName", "A"), U(cs, "SANITIZED_URL", "about:blank"), U(cs, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function _h(e, t) {
  const s = document.createElement("a");
  s.href = e;
  const n = s.href.slice(0, s.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class $a extends Me {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
U($a, "blotName", "script"), U($a, "tagName", ["SUB", "SUP"]);
class Ma extends _i {
}
U(Ma, "blotName", "strike"), U(Ma, "tagName", ["S", "STRIKE"]);
class Ra extends Me {
}
U(Ra, "blotName", "underline"), U(Ra, "tagName", "U");
class yr extends ml {
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
U(yr, "blotName", "formula"), U(yr, "className", "ql-formula"), U(yr, "tagName", "SPAN");
const ru = ["alt", "height", "width"];
class Da extends Gt {
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return ru.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return _h(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    ru.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
}
U(Da, "blotName", "image"), U(Da, "tagName", "IMG");
const ou = ["height", "width"];
class vr extends te {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return ou.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static sanitize(t) {
    return cs.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    ou.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
U(vr, "blotName", "video"), U(vr, "className", "ql-video"), U(vr, "tagName", "IFRAME");
const oi = new be("code-token", "hljs", {
  scope: G.INLINE
});
class Xe extends Me {
  static formats(t, s) {
    for (; t != null && t !== s.domNode; ) {
      if (t.classList && t.classList.contains(Dt.className))
        return super.formats(t, s);
      t = t.parentNode;
    }
  }
  constructor(t, s, n) {
    super(t, s, n), oi.add(this.domNode, n);
  }
  format(t, s) {
    t !== Xe.blotName ? super.format(t, s) : s ? oi.add(this.domNode, s) : (oi.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), oi.value(this.domNode) || this.unwrap();
  }
}
Xe.blotName = "code-token";
Xe.className = "ql-token";
class Jt extends Dt {
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
    return this.formatAt(0, this.length(), Xe.blotName, !1), super.replaceWith(t, s);
  }
}
class di extends Ws {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, s) {
    t === Jt.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, s);
    }));
  }
  formatAt(t, s, n, i) {
    n === Jt.blotName && (this.forceNext = !0), super.formatAt(t, s, n, i);
  }
  highlight(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = Jt.formats(this.children.head.domNode);
    if (s || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((a, u) => a.concat(nh(u, !1)), new K()), l = t(i, r);
        o.diff(l).reduce((a, u) => {
          let {
            retain: h,
            attributes: d
          } = u;
          return h ? (d && Object.keys(d).forEach((b) => {
            [Jt.blotName, Xe.blotName].includes(b) && this.formatAt(a, h, b, d[b]);
          }), a + h) : a;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, s) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Jt.formats(n.domNode) : "plain"}">
${Hr(this.code(t, s))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const s = Jt.formats(this.children.head.domNode);
      s !== this.uiNode.value && (this.uiNode.value = s);
    }
  }
}
di.allowedChildren = [Jt];
Jt.requiredContainer = di;
Jt.allowedChildren = [Xe, Sn, ge, ye];
const qE = (e, t, s) => {
  if (typeof e.versionString == "string") {
    const n = e.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return e.highlight(s, {
        language: t
      }).value;
  }
  return e.highlight(t, s).value;
};
class Eh extends ve {
  static register() {
    I.register(Xe, !0), I.register(Jt, !0), I.register(di, !0);
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
    this.quill.on(I.events.SCROLL_BLOT_MOUNT, (t) => {
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
        t.format(Jt.blotName, s.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(s), t.children.head && (s.value = Jt.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(I.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(I.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(di) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, s);
    }), this.quill.update(I.sources.SILENT), n != null && this.quill.setSelection(n, I.sources.SILENT);
  }
  highlightBlot(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (s = this.languages[s] ? s : "plain", s === "plain")
      return Hr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [Dt.blotName]: s
      }), i.insert(r)), new K());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(Dt.className), n.innerHTML = qE(this.options.hljs, s, t), Tl(this.quill.scroll, n, [(i, r) => {
      const o = oi.value(i);
      return o ? r.compose(new K().retain(r.length(), {
        [Xe.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, l, a) => (a !== 0 && o.insert(`
`, {
      [Dt.blotName]: s
    }), o.insert(l)), r)], /* @__PURE__ */ new WeakMap());
  }
}
Eh.DEFAULTS = {
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
const fi = class fi extends It {
  static create(t) {
    const s = super.create();
    return t ? s.setAttribute("data-row", t) : s.setAttribute("data-row", Al()), s;
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
U(fi, "blotName", "table"), U(fi, "tagName", "TD");
let he = fi;
class Ze extends zs {
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
U(Ze, "blotName", "table-row"), U(Ze, "tagName", "TR");
class Ie extends zs {
}
U(Ie, "blotName", "table-body"), U(Ie, "tagName", "TBODY");
class In extends zs {
  balanceCells() {
    const t = this.descendants(Ze), s = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(s - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = he.formats(n.children.head.domNode));
        const r = this.scroll.create(he.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((s) => s.children.at(t));
  }
  deleteColumn(t) {
    const [s] = this.descendant(Ie);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [s] = this.descendant(Ie);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t), r = he.formats(n.children.head.domNode), o = this.scroll.create(he.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [s] = this.descendant(Ie);
    if (s == null || s.children.head == null) return;
    const n = Al(), i = this.scroll.create(Ze.blotName);
    s.children.head.children.forEach(() => {
      const o = this.scroll.create(he.blotName, n);
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
U(In, "blotName", "table-container"), U(In, "tagName", "TABLE");
In.allowedChildren = [Ie];
Ie.requiredContainer = In;
Ie.allowedChildren = [Ze];
Ze.requiredContainer = Ie;
Ze.allowedChildren = [he];
he.requiredContainer = Ze;
function Al() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class BE extends ve {
  static register() {
    I.register(he), I.register(Ze), I.register(Ie), I.register(In);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(In).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , s] = this.getTable();
    s != null && (t.deleteColumn(s.cellOffset()), this.quill.update(I.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(I.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const s = t.offset();
    t.remove(), this.quill.update(I.sources.USER), this.quill.setSelection(s, I.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [s, n] = this.quill.getLine(t.index);
    if (s == null || s.statics.blotName !== he.blotName)
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
    n.insertColumn(o + t), this.quill.update(I.sources.USER);
    let l = i.rowOffset();
    t === 0 && (l += 1), this.quill.setSelection(s.index + l, s.length, I.sources.SILENT);
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
    n.insertRow(o + t), this.quill.update(I.sources.USER), t > 0 ? this.quill.setSelection(s, I.sources.SILENT) : this.quill.setSelection(s.index + i.children.length, s.length, I.sources.SILENT);
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
        table: Al()
      });
    }, new K().retain(n.index));
    this.quill.updateContents(i, I.sources.USER), this.quill.setSelection(n.index, I.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(I.events.SCROLL_OPTIMIZE, (t) => {
      t.some((s) => ["TD", "TR", "TBODY", "TABLE"].includes(s.target.tagName) ? (this.quill.once(I.events.TEXT_CHANGE, (n, i, r) => {
        r === I.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const au = ts("quill:toolbar");
class Ol extends ve {
  constructor(t, s) {
    var n, i;
    if (super(t, s), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), PE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      au.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var l;
      const o = (l = this.options.handlers) == null ? void 0 : l[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(I.events.EDITOR_CHANGE, () => {
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
      au.warn("ignoring attaching to nonexistent format", s, t);
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
        this.quill.scroll.query(s).prototype instanceof Gt
      ) {
        if (r = prompt(`Enter ${s}`), !r) return;
        this.quill.updateContents(new K().retain(o.index).delete(o.length).insert({
          [s]: r
        }), I.sources.USER);
      } else
        this.quill.format(s, r, I.sources.USER);
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
Ol.DEFAULTS = {};
function lu(e, t, s) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), s != null ? (n.value = s, n.setAttribute("aria-label", `${t}: ${s}`)) : n.setAttribute("aria-label", t), e.appendChild(n);
}
function PE(e, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((s) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), s.forEach((i) => {
      if (typeof i == "string")
        lu(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? jE(n, r, o) : lu(n, r, o);
      }
    }), e.appendChild(n);
  });
}
function jE(e, t, s) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), s.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), e.appendChild(n);
}
Ol.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const e = this.quill.getSelection();
      if (e != null)
        if (e.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((s) => {
            this.quill.scroll.query(s, G.INLINE) != null && this.quill.format(s, !1, I.sources.USER);
          });
        } else
          this.quill.removeFormat(e.index, e.length, I.sources.USER);
    },
    direction(e) {
      const {
        align: t
      } = this.quill.getFormat();
      e === "rtl" && t == null ? this.quill.format("align", "right", I.sources.USER) : !e && t === "right" && this.quill.format("align", !1, I.sources.USER), this.quill.format("direction", e, I.sources.USER);
    },
    indent(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t), n = parseInt(s.indent || 0, 10);
      if (e === "+1" || e === "-1") {
        let i = e === "+1" ? 1 : -1;
        s.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, I.sources.USER);
      }
    },
    link(e) {
      e === !0 && (e = prompt("Enter link URL:")), this.quill.format("link", e, I.sources.USER);
    },
    list(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t);
      e === "check" ? s.list === "checked" || s.list === "unchecked" ? this.quill.format("list", !1, I.sources.USER) : this.quill.format("list", "unchecked", I.sources.USER) : this.quill.format("list", e, I.sources.USER);
    }
  }
};
const VE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', UE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', FE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', HE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', zE = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', WE = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', KE = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', GE = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', cu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', YE = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', XE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', ZE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', QE = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', JE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', tw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', ew = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', sw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', nw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', iw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', rw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', ow = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', cw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', uw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', dw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', hw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', fw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', pw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', gw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', mw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', bw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', yw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', Ei = {
  align: {
    "": VE,
    center: UE,
    right: FE,
    justify: HE
  },
  background: zE,
  blockquote: WE,
  bold: KE,
  clean: GE,
  code: cu,
  "code-block": cu,
  color: YE,
  direction: {
    "": XE,
    rtl: ZE
  },
  formula: QE,
  header: {
    1: JE,
    2: tw,
    3: ew,
    4: sw,
    5: nw,
    6: iw
  },
  italic: rw,
  image: ow,
  indent: {
    "+1": aw,
    "-1": lw
  },
  link: cw,
  list: {
    bullet: uw,
    check: dw,
    ordered: hw
  },
  script: {
    sub: fw,
    super: pw
  },
  strike: gw,
  table: mw,
  underline: bw,
  video: yw
}, vw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let uu = 0;
function du(e, t) {
  e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
}
class Wr {
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
    this.container.classList.toggle("ql-expanded"), du(this.label, "aria-expanded"), du(this.options, "aria-hidden");
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
    return t.classList.add("ql-picker-label"), t.innerHTML = vw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${uu}`, uu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((s) => {
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
class wh extends Wr {
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
class Th extends Wr {
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
const _w = (e) => {
  const {
    overflowY: t
  } = getComputedStyle(e, null);
  return t !== "visible" && t !== "clip";
};
class Ah {
  constructor(t, s) {
    this.quill = t, this.boundsContainer = s || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, _w(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const Ew = [!1, "center", "right", "justify"], ww = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Tw = [!1, "serif", "monospace"], Aw = ["1", "2", "3", !1], Ow = ["small", !1, "large", "huge"];
class Mi extends Ln {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ni(i, Ew), typeof s.align == "object"))
        return new Th(i, s.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ni(i, ww, r === "background" ? "#ffffff" : "#000000"), new wh(i, s[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ni(i, Tw) : i.classList.contains("ql-header") ? ni(i, Aw) : i.classList.contains("ql-size") && ni(i, Ow)), new Wr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(H.events.EDITOR_CHANGE, n);
  }
}
Mi.DEFAULTS = us({}, Ln.DEFAULTS, {
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
class Oh extends Ah {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, H.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, H.sources.USER)), this.quill.root.scrollTop = s;
        break;
      }
      case "video":
        t = Nw(t);
      // eslint-disable-next-line no-fallthrough
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
            H.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", H.sources.USER), this.quill.setSelection(n + 2, H.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function Nw(e) {
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
const kw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Nh extends Oh {
  constructor(t, s) {
    super(t, s), this.quill.on(H.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === H.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === H.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(i.index, i.length);
          if (l.length === 1) {
            const a = this.quill.getBounds(i);
            a != null && this.position(a);
          } else {
            const a = l[l.length - 1], u = this.quill.getIndex(a), h = Math.min(a.length() - 1, i.index + i.length - u), d = this.quill.getBounds(new Bs(u, h));
            d != null && this.position(d);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(H.events.SCROLL_OPTIMIZE, () => {
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
U(Nh, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class kh extends Mi {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = kw), super(t, s), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Nh(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei));
  }
}
kh.DEFAULTS = us({}, Mi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(e) {
          e ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, I.sources.USER);
        }
      }
    }
  }
});
const Cw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Ch extends Oh {
  constructor() {
    super(...arguments);
    U(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (s) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), s.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (s) => {
      if (this.linkRange != null) {
        const n = this.linkRange;
        this.restoreFocus(), this.quill.formatText(n, "link", !1, H.sources.USER), delete this.linkRange;
      }
      s.preventDefault(), this.hide();
    }), this.quill.on(H.events.SELECTION_CHANGE, (s, n, i) => {
      if (s != null) {
        if (s.length === 0 && i === H.sources.USER) {
          const [r, o] = this.quill.scroll.descendant(cs, s.index);
          if (r != null) {
            this.linkRange = new Bs(s.index - o, r.length());
            const l = cs.formats(r.domNode);
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
U(Ch, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Sh extends Mi {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = Cw), super(t, s), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei), this.tooltip = new Ch(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (s, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Sh.DEFAULTS = us({}, Mi.DEFAULTS, {
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
            this.quill.format("link", !1, I.sources.USER);
        }
      }
    }
  }
});
I.register({
  "attributors/attribute/direction": lh,
  "attributors/class/align": rh,
  "attributors/class/background": W_,
  "attributors/class/color": z_,
  "attributors/class/direction": ch,
  "attributors/class/font": hh,
  "attributors/class/size": ph,
  "attributors/style/align": oh,
  "attributors/style/background": vl,
  "attributors/style/color": yl,
  "attributors/style/direction": uh,
  "attributors/style/font": fh,
  "attributors/style/size": gh
}, !0);
I.register({
  "formats/align": rh,
  "formats/direction": ch,
  "formats/indent": DE,
  "formats/background": vl,
  "formats/color": yl,
  "formats/font": hh,
  "formats/size": ph,
  "formats/blockquote": La,
  "formats/code-block": Dt,
  "formats/header": Ia,
  "formats/list": $i,
  "formats/bold": _i,
  "formats/code": _l,
  "formats/italic": xa,
  "formats/link": cs,
  "formats/script": $a,
  "formats/strike": Ma,
  "formats/underline": Ra,
  "formats/formula": yr,
  "formats/image": Da,
  "formats/video": vr,
  "modules/syntax": Eh,
  "modules/table": BE,
  "modules/toolbar": Ol,
  "themes/bubble": kh,
  "themes/snow": Sh,
  "ui/icons": Ei,
  "ui/picker": Wr,
  "ui/icon-picker": Th,
  "ui/color-picker": wh,
  "ui/tooltip": Ah
}, !0);
const _e = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, Sw = {
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
      this.quill = new I(this.$refs.editor, {
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
}, Lw = Sw, Iw = { class: "ql-editor-container" }, xw = {
  class: "",
  ref: "editor"
};
function $w(e, t, s, n, i, r) {
  return g(), m("div", Iw, [
    f("div", xw, null, 512)
  ]);
}
const Mw = /* @__PURE__ */ _e(Lw, [["render", $w]]), Xt = {
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
}, Rw = {
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
      for (const s in Xt)
        if (Xt.hasOwnProperty(s)) {
          const n = Xt[s];
          e.forEach((i) => {
            n[i] && t.push(n[i]);
          });
        }
      return t.join(",");
    },
    setDefaults(e) {
      !e || typeof e != "object" || this.params && this.params.tags && !e.tags && (e.tags = []);
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
      }, Object.values(Xt.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(Xt.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(Xt.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, (e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
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
          let b = Math.max(h / o, d / l), y = o * b, w = l * b, A = (y - h) / 2, O = (w - d) / 2;
          n.width = h, n.height = d, i.drawImage(t, -A, -O, y, w);
        } else if (u.crop === "contain") {
          let b = Math.min(h / o, d / l), y = o * b, w = l * b, A = (h - y) / 2, O = (d - w) / 2;
          n.width = h, n.height = d, i.clearRect(0, 0, h, d), i.drawImage(t, A, O, y, w);
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
    arrayItemMoveUp(e, t) {
      sl(e, t);
    },
    arrayItemMoveDown(e, t) {
      nl(e, t);
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
      for (const t in Xt)
        if (Xt.hasOwnProperty(t)) {
          const s = Xt[t];
          if (s[e])
            return s[e];
        }
      return null;
    },
    getExtensionByMimeType(e) {
      for (const t in Xt)
        if (Xt.hasOwnProperty(t)) {
          const s = Xt[t];
          for (const n in s)
            if (s[n] === e)
              return n;
        }
      return null;
    },
    translate(e, t, s) {
      return ki(e, this.settings.translate, t, s || this.settings.language);
    },
    dropdownSelectToggleOne(e, t) {
      md(e, t), this.$forceUpdate();
    },
    dropdownSelectAll(e, t) {
      bd(e, t), this.$forceUpdate();
    },
    dropdownSelectInvert(e, t) {
      yd(e, t), this.$forceUpdate();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : vd(e), this.$forceUpdate();
    }
  }
}, Dw = Rw, qw = { class: "" }, Bw = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, Pw = { class: "row" }, jw = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, Vw = { class: "badge bg-dark text-light fw-light mx-1" }, Uw = { class: "badge bg-dark text-light fw-light mx-1" }, Fw = ["src"], Hw = { class: "row g-1" }, zw = { class: "col-md-6" }, Ww = { class: "col-md-6" }, Kw = { class: "col-md-6" }, Gw = ["href"], Yw = {
  key: 1,
  class: "row g-2 mb-1"
}, Xw = { key: 0 }, Zw = { class: "table table-sm table-responsive table-borderless" }, Qw = { class: "align-middle px-0" }, Jw = { class: "input-group border" }, tT = { class: "d-block p-1 px-2 bg-secondary text-light opacity-50" }, eT = ["onClick"], sT = ["onClick"], nT = {
  key: 0,
  class: "fs-5 ms-2"
}, iT = {
  key: 1,
  class: "fs-5 ms-2"
}, rT = {
  key: 2,
  class: "fs-5 ms-2"
}, oT = ["onUpdate:modelValue", "onInput"], aT = {
  key: 3,
  class: "mx-1"
}, lT = ["href"], cT = ["src", "alt"], uT = ["src", "alt"], dT = {
  key: 4,
  class: "dropdown rounded-bottom"
}, hT = {
  class: "btn btn-sm bg-light text-dark w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, fT = { class: "dropdown-menu" }, pT = ["onClick"], gT = {
  key: 0,
  class: "bi bi-check-square"
}, mT = {
  key: 1,
  class: "bi bi-square"
}, bT = ["onClick"], yT = ["onClick"], vT = ["onClick"], _T = { class: "dropdown" }, ET = { class: "dropdown-menu" }, wT = { key: 0 }, TT = ["onClick"], AT = { key: 1 }, OT = { class: "dropdown-item py-0 d-flex justify-content-between" }, NT = { key: 2 }, kT = { class: "dropdown-item py-0 d-flex justify-content-between" }, CT = ["innerHTML"], ST = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, LT = { class: "dropdown-item py-0 d-flex justify-content-between" }, IT = { key: 0 }, xT = { key: 1 }, $T = { class: "dropdown-item py-0 d-flex justify-content-between" }, MT = { class: "text-muted fw-light me-4" }, RT = { class: "text-primary" }, DT = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, qT = { class: "dropdown-item py-0 d-flex justify-content-between" }, BT = { class: "text-muted fw-light me-1" }, PT = {
  key: 0,
  class: "text-primary"
}, jT = ["innerHTML"], VT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, UT = { key: 3 }, FT = { class: "dropdown-item py-0 d-flex justify-content-between" }, HT = { class: "dropdown-item py-0 d-flex justify-content-between" }, zT = { class: "text-muted fw-light me-3" }, WT = ["innerHTML"], KT = { class: "dropdown-item py-0 d-flex justify-content-between" }, GT = { class: "text-muted fw-light me-3" }, YT = ["onClick"], XT = { class: "vsa-image-container h-100 position-relative border p-1 bg-light" }, ZT = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, QT = {
  key: 1,
  class: "vsa-image-frame mb-auto text-center"
}, JT = ["href"], tA = ["src", "alt"], eA = ["src", "alt"], sA = {
  key: 2,
  class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, nA = ["onUpdate:modelValue", "onInput"], iA = { class: "w-100 d-flex justify-content-around align-items-center" }, rA = { class: "p-1 px-2 bg-secondary text-light border border-end-0 h-100 opacity-50" }, oA = ["onClick"], aA = ["onClick"], lA = { class: "dropdown border h-100 w-100" }, cA = { class: "dropdown-menu" }, uA = { key: 0 }, dA = ["onClick"], hA = { key: 1 }, fA = { class: "dropdown-item py-0 d-flex justify-content-between" }, pA = { key: 2 }, gA = { class: "dropdown-item py-0 d-flex justify-content-between" }, mA = ["innerHTML"], bA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, yA = { class: "dropdown-item py-0 d-flex justify-content-between" }, vA = { key: 0 }, _A = { key: 1 }, EA = { class: "dropdown-item py-0 d-flex justify-content-between" }, wA = { class: "text-muted fw-light me-4" }, TA = { class: "text-primary" }, AA = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, OA = { class: "dropdown-item py-0 d-flex justify-content-between" }, NA = { class: "text-muted fw-light me-1" }, kA = {
  key: 0,
  class: "text-primary"
}, CA = ["innerHTML"], SA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, LA = { key: 3 }, IA = { class: "dropdown-item py-0 d-flex justify-content-between" }, xA = { class: "dropdown-item py-0 d-flex justify-content-between" }, $A = { class: "text-muted fw-light me-3" }, MA = ["innerHTML"], RA = { class: "dropdown-item py-0 d-flex justify-content-between" }, DA = { class: "text-muted fw-light me-3" }, qA = {
  key: 0,
  class: "dropdown border h-100 w-100"
}, BA = {
  class: "btn btn-sm bg-light text-dark w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, PA = { class: "dropdown-menu" }, jA = ["onClick"], VA = {
  key: 0,
  class: "bi bi-check-square"
}, UA = {
  key: 1,
  class: "bi bi-square"
}, FA = ["onClick"], HA = ["onClick"], zA = ["onClick"], WA = ["onClick"], KA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, GA = { class: "row g-1" }, YA = { class: "col-12 d-flex align-items-center justify-content-center" }, XA = ["for"], ZA = { key: 0 }, QA = { key: 0 }, JA = { class: "" }, tO = { class: "" }, eO = {
  key: 1,
  class: "fs-6"
}, sO = {
  key: 0,
  class: "bi bi-list-ol"
}, nO = {
  key: 1,
  class: "bi bi-grid"
}, iO = ["disabled"], rO = { class: "col-12 text-center" }, oO = { key: 0 }, aO = ["id", "accept"];
function lO(e, t, s, n, i, r) {
  return g(), m("div", qw, [
    f("div", {
      class: S(["vsa-upload", { wait: e.wait }])
    }, [
      e.editfile && e.editfile.presets ? (g(), m("div", Bw, [
        f("div", Pw, [
          (g(!0), m(J, null, st(e.editfile.types, (o, l) => (g(), m("div", {
            class: "col-md-3",
            key: l
          }, [
            f("span", jw, C(o.extension), 1),
            f("span", Vw, C(o.width) + " x " + C(o.height), 1),
            f("span", Uw, "~" + C(e.roundFileSize(o.bytes)), 1),
            o ? (g(), m("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, Fw)) : E("", !0)
          ]))), 128))
        ]),
        lt(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => e.editfile.title = o)
        }, null, 512), [
          [de, e.editfile.title]
        ]),
        f("div", Hw, [
          f("div", zw, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => e.editfile = null)
            }, " Close ")
          ]),
          f("div", Ww, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => e.remove(e.index))
            }, " Remove ")
          ]),
          f("div", Kw, [
            e.type && !e.type.url ? (g(), m("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => e.download(e.index, e.params))
            }, " Download ")) : E("", !0),
            e.type && e.type.url ? (g(), m("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: e.type.url
            }, " Download ", 8, Gw)) : E("", !0)
          ])
        ])
      ])) : E("", !0),
      e.files && e.files.length ? (g(), m("div", Yw, [
        e.params.ui === "list" ? (g(), m("div", Xw, [
          f("table", Zw, [
            f("tbody", null, [
              (g(!0), m(J, null, st(e.files, (o, l) => (g(), m("tr", { key: l }, [
                f("td", Qw, [
                  f("div", Jw, [
                    f("span", tT, [
                      f("small", null, C(l + 1), 1)
                    ]),
                    f("span", {
                      class: "cursor-pointer p-1 border-end bg-white h-100",
                      onClick: (a) => e.arrayItemMoveDown(e.files, l)
                    }, [
                      f("i", {
                        class: S(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                      }, null, 2)
                    ], 8, eT),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end bg-white h-100",
                      onClick: (a) => e.arrayItemMoveUp(e.files, l + 1)
                    }, [
                      f("i", {
                        class: S(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                      }, null, 2)
                    ], 8, sT),
                    o.isDocument ? (g(), m("span", nT, [
                      f("i", {
                        class: S(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (g(), m("span", iT, t[9] || (t[9] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (g(), m("span", rT, t[10] || (t[10] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : E("", !0),
                    lt(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (a) => o.title = a,
                      onInput: (a) => e.slug(o),
                      onKeydown: t[4] || (t[4] = ai(Lt(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, oT), [
                      [de, o.title]
                    ]),
                    !o.isDocument && o.types && o.types[e.params.thumbnail] ? (g(), m("span", aT, [
                      o.types.default.url ? (g(), m("a", {
                        key: 0,
                        target: "_blank",
                        href: o.types.default.url
                      }, [
                        f("img", {
                          height: "32",
                          width: "auto",
                          class: "transparent-background",
                          src: o.types[e.params.thumbnail].url,
                          alt: o.name
                        }, null, 8, cT)
                      ], 8, lT)) : (g(), m("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "transparent-background",
                        src: o.types[e.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, uT))
                    ])) : E("", !0),
                    e.params.tags ? (g(), m("div", dT, [
                      f("button", hT, [
                        t[11] || (t[11] = f("i", { class: "bi bi-tag" }, null, -1)),
                        et(" " + C(o.tags ? o.tags.length : 0), 1)
                      ]),
                      f("ul", fT, [
                        f("li", null, [
                          (g(!0), m(J, null, st(e.params.tags, (a) => (g(), m("span", {
                            key: a,
                            class: "dropdown-item cursor-pointer",
                            onClick: (u) => e.dropdownSelectToggleOne(o.tags, a.value)
                          }, [
                            o.tags && o.tags.indexOf(a.value) >= 0 ? (g(), m("i", gT)) : (g(), m("i", mT)),
                            et(" " + C(e.translate(a.label ? a.label : a.value)), 1)
                          ], 8, pT))), 128))
                        ]),
                        t[12] || (t[12] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (a) => e.dropdownSelectAll(o.tags, e.params.tags)
                          }, C(e.translate("Select all")), 9, bT)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (a) => e.dropdownSelectClear(o.tags)
                          }, C(e.translate("Unselect all")), 9, yT)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (a) => e.dropdownSelectInvert(o.tags, e.params.tags)
                          }, C(e.translate("Invert all")), 9, vT)
                        ])
                      ])
                    ])) : E("", !0),
                    f("div", _T, [
                      t[25] || (t[25] = f("button", {
                        class: "btn btn-sm bg-light text-dark _dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, [
                        f("i", { class: "bi bi-list" })
                      ], -1)),
                      f("ul", ET, [
                        o.uploadedXXX ? (g(), m("li", wT, [
                          f("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => e.download(l, e.params),
                            type: "button"
                          }, t[13] || (t[13] = [
                            f("i", { class: "bi bi-download" }, null, -1),
                            et(" Download ")
                          ]), 8, TT)
                        ])) : E("", !0),
                        o.original.width ? (g(), m("li", AT, [
                          f("small", OT, [
                            t[14] || (t[14] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            et(" " + C(o.original.width) + " x " + C(o.original.height), 1)
                          ])
                        ])) : E("", !0),
                        o.isDocument ? E("", !0) : (g(), m("li", NT, [
                          f("small", kT, [
                            t[15] || (t[15] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            f("span", null, [
                              f("span", {
                                innerHTML: e.roundFileSize(o.original.bytes, !0)
                              }, null, 8, CT),
                              f("small", ST, C(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        f("li", null, [
                          f("small", LT, [
                            t[16] || (t[16] = f("span", { class: "text-muted fw-light me-3" }, "original filename", -1)),
                            et(" " + C(o.original.name), 1)
                          ])
                        ]),
                        (g(!0), m(J, null, st(o.types, (a, u) => (g(), m(J, { key: a }, [
                          o.isDocument ? E("", !0) : (g(), m("li", IT, t[17] || (t[17] = [
                            f("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (g(), m("li", xT, [
                            f("small", $T, [
                              f("span", MT, [
                                f("span", RT, C(u), 1),
                                t[18] || (t[18] = et(" resolution & crop"))
                              ]),
                              f("span", null, [
                                et(C(a.width) + " x " + C(a.height) + " ", 1),
                                a.crop ? (g(), m("small", DT, C(a.crop), 1)) : E("", !0)
                              ])
                            ])
                          ])) : E("", !0),
                          f("li", null, [
                            f("small", qT, [
                              f("span", BT, [
                                o.isDocument ? E("", !0) : (g(), m("span", PT, C(u), 1)),
                                t[19] || (t[19] = et(" size & extension"))
                              ]),
                              f("span", null, [
                                f("span", {
                                  class: S({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: e.roundFileSize(a.bytes, !0)
                                }, null, 10, jT),
                                f("small", VT, C(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[24] || (t[24] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.uploaded ? (g(), m("li", UT, [
                          f("small", FT, [
                            t[20] || (t[20] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[21] || (t[21] = et()),
                            f("span", null, C(e.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ])) : E("", !0),
                        f("li", null, [
                          f("small", HT, [
                            f("span", zT, C(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                            t[22] || (t[22] = et()),
                            f("span", {
                              innerHTML: e.roundFileSize(o.bytes, !0)
                            }, null, 8, WT)
                          ])
                        ]),
                        f("li", null, [
                          f("small", KT, [
                            f("span", GT, C(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                            t[23] || (t[23] = et()),
                            f("span", null, C(o.slug), 1)
                          ])
                        ])
                      ])
                    ]),
                    f("button", {
                      class: "btn text-danger px-2 py-1",
                      onClick: (a) => e.remove(l),
                      type: "button"
                    }, t[26] || (t[26] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1)
                    ]), 8, YT)
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (g(!0), m(J, { key: 1 }, st(e.files, (o, l) => (g(), m("div", {
          class: S([e.params.colclass ? e.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          f("div", XT, [
            o.loaded ? (g(), m("div", ZT, [
              E("", !0),
              o.types && o.types[e.params.thumbnail] ? (g(), m("div", QT, [
                o.types.default.url ? (g(), m("a", {
                  key: 0,
                  href: o.types.default.url
                }, [
                  f("img", {
                    class: "img-fluid transparent-background",
                    src: o.types[e.params.thumbnail].url,
                    alt: o.name
                  }, null, 8, tA)
                ], 8, JT)) : (g(), m("img", {
                  key: 1,
                  class: "img-fluid transparent-background",
                  src: o.types[e.params.thumbnail].data,
                  alt: o.name
                }, null, 8, eA))
              ])) : E("", !0),
              o.isDocument ? (g(), m("div", sA, [
                f("i", {
                  class: S(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : E("", !0),
              lt(f("input", {
                required: "text",
                class: "form-control rounded-0 bg-white text-dark border-bottom-0 py-1 px-2 fw-light mt-1",
                "onUpdate:modelValue": (a) => o.title = a,
                onInput: (a) => e.slug(o),
                onKeydown: t[5] || (t[5] = ai(Lt(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, nA), [
                [de, o.title]
              ]),
              f("div", iA, [
                f("span", rA, [
                  f("small", null, C(l + 1), 1)
                ]),
                f("span", {
                  class: "cursor-pointer p-1 bg-white border border-end-0 h-100",
                  onClick: (a) => e.arrayItemMoveDown(e.files, l)
                }, [
                  f("i", {
                    class: S(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                  }, null, 2)
                ], 8, oA),
                f("span", {
                  class: "cursor-pointer p-1 bg-white border border-end-0 h-100",
                  onClick: (a) => e.arrayItemMoveUp(e.files, l + 1)
                }, [
                  f("i", {
                    class: S(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                  }, null, 2)
                ], 8, aA),
                f("div", lA, [
                  t[42] || (t[42] = f("button", {
                    class: "btn btn-sm bg-light text-dark _dropdown-toggle w-100",
                    type: "button",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false"
                  }, [
                    f("i", { class: "bi bi-list" })
                  ], -1)),
                  f("ul", cA, [
                    o.uploadedXXX ? (g(), m("li", uA, [
                      f("button", {
                        class: "dropdown-item text-primary py-1",
                        onClick: (a) => e.download(l, e.params),
                        type: "button"
                      }, t[30] || (t[30] = [
                        f("i", { class: "bi bi-download" }, null, -1),
                        et(" Download ")
                      ]), 8, dA)
                    ])) : E("", !0),
                    o.original.width ? (g(), m("li", hA, [
                      f("small", fA, [
                        t[31] || (t[31] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                        et(" " + C(o.original.width) + " x " + C(o.original.height), 1)
                      ])
                    ])) : E("", !0),
                    o.isDocument ? E("", !0) : (g(), m("li", pA, [
                      f("small", gA, [
                        t[32] || (t[32] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                        f("span", null, [
                          f("span", {
                            innerHTML: e.roundFileSize(o.original.bytes, !0)
                          }, null, 8, mA),
                          f("small", bA, C(o.original.extension), 1)
                        ])
                      ])
                    ])),
                    f("li", null, [
                      f("small", yA, [
                        t[33] || (t[33] = f("span", { class: "text-muted fw-light me-3" }, "original filename", -1)),
                        et(" " + C(o.original.name), 1)
                      ])
                    ]),
                    (g(!0), m(J, null, st(o.types, (a, u) => (g(), m(J, { key: a }, [
                      o.isDocument ? E("", !0) : (g(), m("li", vA, t[34] || (t[34] = [
                        f("hr", { class: "dropdown-divider" }, null, -1)
                      ]))),
                      o.original.width ? (g(), m("li", _A, [
                        f("small", EA, [
                          f("span", wA, [
                            f("span", TA, C(u), 1),
                            t[35] || (t[35] = et(" resolution & crop"))
                          ]),
                          f("span", null, [
                            et(C(a.width) + " x " + C(a.height) + " ", 1),
                            a.crop ? (g(), m("small", AA, C(a.crop), 1)) : E("", !0)
                          ])
                        ])
                      ])) : E("", !0),
                      f("li", null, [
                        f("small", OA, [
                          f("span", NA, [
                            o.isDocument ? E("", !0) : (g(), m("span", kA, C(u), 1)),
                            t[36] || (t[36] = et(" size & extension"))
                          ]),
                          f("span", null, [
                            f("span", {
                              class: S({ "text-danger": a.bytes > o.original.bytes }),
                              innerHTML: e.roundFileSize(a.bytes, !0)
                            }, null, 10, CA),
                            f("small", SA, C(a.extension), 1)
                          ])
                        ])
                      ])
                    ], 64))), 128)),
                    t[41] || (t[41] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    o.uploaded ? (g(), m("li", LA, [
                      f("small", IA, [
                        t[37] || (t[37] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                        t[38] || (t[38] = et()),
                        f("span", null, C(e.dateFormat(o.timestamp * 1e3)), 1)
                      ])
                    ])) : E("", !0),
                    f("li", null, [
                      f("small", xA, [
                        f("span", $A, C(o.uploaded ? "uploaded" : "uploading") + " bytes sum", 1),
                        t[39] || (t[39] = et()),
                        f("span", {
                          innerHTML: e.roundFileSize(o.bytes, !0)
                        }, null, 8, MA)
                      ])
                    ]),
                    f("li", null, [
                      f("small", RA, [
                        f("span", DA, C(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                        t[40] || (t[40] = et()),
                        f("span", null, C(o.slug), 1)
                      ])
                    ])
                  ])
                ]),
                e.params.tags ? (g(), m("div", qA, [
                  f("button", BA, [
                    t[43] || (t[43] = f("i", { class: "bi bi-tag" }, null, -1)),
                    et(" " + C(o.tags ? o.tags.length : 0), 1)
                  ]),
                  f("ul", PA, [
                    f("li", null, [
                      (g(!0), m(J, null, st(e.params.tags, (a) => (g(), m("span", {
                        key: a,
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => e.dropdownSelectToggleOne(o.tags, a.value)
                      }, [
                        o.tags && o.tags.indexOf(a.value) >= 0 ? (g(), m("i", VA)) : (g(), m("i", UA)),
                        et(" " + C(e.translate(a.label ? a.label : a.value)), 1)
                      ], 8, jA))), 128))
                    ]),
                    t[44] || (t[44] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (a) => e.dropdownSelectAll(o.tags, e.params.tags)
                      }, C(e.translate("Select all")), 9, FA)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (a) => e.dropdownSelectClear(o.tags)
                      }, C(e.translate("Unselect all")), 9, HA)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (a) => e.dropdownSelectInvert(o.tags, e.params.tags)
                      }, C(e.translate("Invert all")), 9, zA)
                    ])
                  ])
                ])) : E("", !0),
                f("button", {
                  class: "btn border rounded-0 border-start-0 text-danger px-2 py-1",
                  onClick: (a) => e.remove(l),
                  type: "button"
                }, t[45] || (t[45] = [
                  f("i", { class: "bi bi-x-circle" }, null, -1)
                ]), 8, WA)
              ])
            ])) : (g(), m("div", KA, t[46] || (t[46] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : E("", !0),
      f("div", GA, [
        f("div", YA, [
          f("label", {
            for: e.uploadId,
            class: S([{ "disabled bg-secondary": e.files && e.params.limit <= e.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            e.files && e.params.limit > e.files.length ? (g(), m("span", ZA, [
              t[50] || (t[50] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              et(" " + C(e.params.text) + " ", 1),
              e.params.limit ? (g(), m("small", QA, [
                t[47] || (t[47] = et(" ( ")),
                f("strong", JA, C(e.files.length), 1),
                t[48] || (t[48] = et(" / ")),
                f("span", tO, C(e.params.limit), 1),
                t[49] || (t[49] = et(" ) "))
              ])) : E("", !0)
            ])) : (g(), m("span", eO, t[51] || (t[51] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              et(" You've reached the upload limit ")
            ])))
          ], 10, XA),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (o) => e.toggleView())
          }, [
            e.params.ui != "list" ? (g(), m("i", sO)) : E("", !0),
            e.params.ui == "list" ? (g(), m("i", nO)) : E("", !0)
          ]),
          f("button", {
            disabled: !e.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (o) => e.resetConfirm())
          }, t[52] || (t[52] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, iO)
        ]),
        f("div", rO, [
          f("small", null, [
            e.params.accept ? (g(), m("div", oO, [
              t[53] || (t[53] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (g(!0), m(J, null, st(e.params.accept, (o) => (g(), m("strong", {
                class: "ms-1 text-muted",
                key: o
              }, C(o), 1))), 128))
            ])) : E("", !0),
            E("", !0)
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
      }, null, 40, aO)) : E("", !0)
    ], 2)
  ]);
}
const cO = /* @__PURE__ */ _e(Dw, [["render", lO]]), uO = {
  props: {
    modelValue: String | Object | Number,
    optionValue: String,
    field: Object,
    item: Object,
    settings: Object,
    formId: String,
    auth: Object
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
      return Vs(e, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    async selectOptions(e, t) {
      return typeof e == "function" ? await e(this.item, t, this) : e;
    },
    async fetchCustom(e, t) {
      const s = await fetch(
        He("GET", { url: e }, t),
        Fe("GET", this.settings.form.api, null, this.auth)
      ), n = await mn(s);
      if (!bn(s, n.data))
        return n.data;
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
}, dO = uO, hO = ["name", "id", "disabled", "readonly", "required"], fO = ["value"];
function pO(e, t, s, n, i, r) {
  return lt((g(), m("select", {
    class: S(["form-select", e.getValueOrFunction(e.field.inputclass ? e.field.inputclass : "", { field: e.field, item: e.item })]),
    name: e.field.name,
    id: e.formId + "_" + e.field.name,
    onChange: t[0] || (t[0] = (o) => e.handleChange(o)),
    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.newitem = o),
    disabled: e.field.disabled,
    readonly: e.field.readonly,
    required: e.field.required
  }, [
    (g(!0), m(J, null, st(e.options, (o) => (g(), m("option", {
      class: S(e.getValueOrFunction(e.field.optionclass ? e.field.optionclass : "", { field: e.field, item: e.item, option: o })),
      key: o,
      value: o.value
    }, C(o.label ? o.label : o.value), 11, fO))), 128))
  ], 42, hO)), [
    [Ne, e.newitem]
  ]);
}
const Lh = /* @__PURE__ */ _e(dO, [["render", pO]]), gO = {
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
      return Vs(e, t, this.settings, this);
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
      sl(e, t);
    },
    arrayItemMoveDown(e, t) {
      nl(e, t);
    }
  },
  components: {
    VuAdminFormSelect: Lh
  }
}, mO = gO, bO = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, yO = { class: "col-10" }, vO = { class: "row g-1 d-flex align-items-center justify-content-between" }, _O = { class: "col-10" }, EO = { class: "row g-1 d-flex align-items-center justify-content-between" }, wO = ["innerHTML"], TO = {
  key: 1,
  class: "input-group input-group-sm"
}, AO = ["type", "required", "placeholder", "onUpdate:modelValue"], OO = { class: "col-2 text-nowrap text-end" }, NO = ["onClick"], kO = ["onClick"], CO = ["onClick"], SO = { key: 0 }, LO = { class: "row g-1 d-flex align-items-center justify-content-between" }, IO = { class: "col-10" }, xO = { class: "row g-1 d-flex align-items-center justify-content-between" }, $O = { class: "input-group input-group-sm" }, MO = {
  key: 0,
  class: "input-group-text"
}, RO = ["type", "placeholder", "onUpdate:modelValue"], DO = {
  key: 3,
  class: "input-group-text"
}, qO = { class: "col-2" };
function BO(e, t, s, n, i, r) {
  const o = ze("VuAdminFormSelect");
  return g(), m("div", null, [
    f("div", bO, [
      f("div", yO, [
        f("div", vO, [
          (g(!0), m(J, null, st(e.field.elements, (l) => (g(), m("div", {
            key: l,
            class: S(l.class || "col")
          }, [
            f("small", null, C(l.placeholder ? l.placeholder : l.prefix ? l.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = f("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (g(!0), m(J, null, st(e.value, (l, a) => (g(), m("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: a
    }, [
      f("div", _O, [
        f("div", EO, [
          (g(!0), m(J, null, st(l, (u, h) => (g(), m("div", {
            key: h,
            class: S(e.field.elements[h].class || "col")
          }, [
            e.field.elements[h].template ? (g(), m("span", {
              key: 0,
              innerHTML: e.getValueOrFunction(e.field.elements[h].template, e.value[a])
            }, null, 8, wO)) : (g(), m("div", TO, [
              e.field.elements[h].type == "select" && e.value[a][h] ? (g(), os(o, {
                key: 0,
                modelValue: e.value[a][h],
                "onUpdate:modelValue": (d) => e.value[a][h] = d,
                field: e.field.elements[h],
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : lt((g(), m("input", {
                key: 1,
                type: e.field.elements[h].type,
                required: e.field.elements[h].required,
                placeholder: e.field.elements[h].placeholder || h,
                class: "form-control",
                "onUpdate:modelValue": (d) => e.value[a][h] = d
              }, null, 8, AO)), [
                [fe, e.value[a][h]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      f("div", OO, [
        e.field.sortable ? (g(), m("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => e.arrayItemMoveUp(e.value, a)
        }, t[2] || (t[2] = [
          f("i", { class: "bi bi-arrow-up" }, null, -1)
        ]), 8, NO)) : E("", !0),
        e.field.sortable ? (g(), m("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => e.arrayItemMoveDown(e.value, a + 1)
        }, t[3] || (t[3] = [
          f("i", { class: "bi bi-arrow-down" }, null, -1)
        ]), 8, kO)) : E("", !0),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (u) => e.arrayRemoveItem(e.value, a)
        }, t[4] || (t[4] = [
          f("i", { class: "bi bi-trash" }, null, -1)
        ]), 8, CO)
      ])
    ]))), 128)),
    e.item[e.field.name] && e.item[e.field.name].length ? (g(), m("hr", SO)) : E("", !0),
    f("div", LO, [
      f("div", IO, [
        f("div", xO, [
          (g(!0), m(J, null, st(e.field.elements, (l) => (g(), m("div", {
            key: l,
            class: S(l.class || "col")
          }, [
            f("div", $O, [
              l.prefix ? (g(), m("span", MO, C(l.prefix), 1)) : E("", !0),
              l.type == "select" && (!l.relation || l.relation && l.relation.items) ? (g(), os(o, {
                key: 1,
                modelValue: l.value,
                "onUpdate:modelValue": (a) => l.value = a,
                field: l,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : lt((g(), m("input", {
                key: 2,
                type: l.type,
                placeholder: l.placeholder || l.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (a) => l.value = a
              }, null, 8, RO)), [
                [fe, l.value]
              ]),
              l.suffix ? (g(), m("span", DO, C(l.suffix), 1)) : E("", !0)
            ]),
            E("", !0)
          ], 2))), 128))
        ])
      ]),
      f("div", qO, [
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
const PO = /* @__PURE__ */ _e(mO, [["render", BO]]), jO = {
  props: {
    modelValue: Object,
    group: Object,
    formId: String,
    settings: Object,
    auth: Object
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
      return Vs(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return ki(e, this.settings.translate, t, s || this.settings.language);
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
      sl(e, t);
    },
    arrayItemMoveDown(e, t) {
      nl(e, t);
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
    HtmlEditor: Mw,
    FileUpload: cO,
    VuAdminFormSelect: Lh,
    VuAdminFormList: PO
  }
}, VO = jO, UO = { class: "row m-1" }, FO = ["innerHTML"], HO = {
  key: 1,
  class: "row"
}, zO = { class: "form-group pb-3" }, WO = { key: 0 }, KO = {
  key: 0,
  class: "badge text-secondary fw-light"
}, GO = ["for", "innerHTML"], YO = {
  key: 1,
  class: "input-group"
}, XO = ["innerHTML"], ZO = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], QO = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "disabled", "readonly", "required"], JO = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "disabled", "readonly", "required"], tN = {
  key: 4,
  class: "form-check"
}, eN = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "disabled", "readonly", "required"], sN = ["for"], nN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "disabled", "required"], iN = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], rN = ["innerHTML"], oN = { key: 5 }, aN = { key: 0 }, lN = ["for"], cN = ["name", "id", "onUpdate:modelValue"], uN = ["onClick"], dN = ["innerHTML"], hN = {
  key: 7,
  class: "p-1"
}, fN = ["innerHTML"];
function pN(e, t, s, n, i, r) {
  const o = ze("VuAdminFormSelect"), l = ze("HtmlEditor"), a = ze("FileUpload"), u = ze("VuAdminFormList");
  return g(), m("div", UO, [
    (g(!0), m(J, null, st(e.settings.form.groups, (h) => (g(), m("div", {
      key: h,
      class: S([h.class ? h.class : "col-md-12"])
    }, [
      h.title ? (g(), m("h2", {
        key: 0,
        class: "form-row-title mb-4 fw-lighter",
        innerHTML: h.title ? h.title : ""
      }, null, 8, FO)) : E("", !0),
      e.item && h.fields ? (g(), m("div", HO, [
        (g(!0), m(J, null, st(h.fields, (d) => (g(), m("div", {
          class: S([e.getValueOrFunction(d.class ? d.class : "col-md-12"), "input_type_" + d.type]),
          key: d
        }, [
          f("div", zO, [
            d.label ? (g(), m("span", WO, [
              ["html", "image", "upload"].indexOf(d.type) >= 0 ? (g(), m("label", {
                key: 0,
                class: S([{ required: d.required }, "form-label text-secondary mb-1"])
              }, [
                et(C(d.label ? d.label : e.translate(d.name)) + " ", 1),
                d.maxlength ? (g(), m("span", KO, C(e.item[d.name] ? e.item[d.name].length : 0) + " / " + C(d.maxlength), 1)) : E("", !0)
              ], 2)) : (g(), m("label", {
                key: 1,
                class: S([{ required: d.required }, "form-label text-secondary mb-1"]),
                for: e.formId + "_" + d.name,
                innerHTML: e.getValueOrFunction(d.label ? d.label : e.translate(d.name), { field: d, item: e.item })
              }, null, 10, GO))
            ])) : E("", !0),
            ["html", "image", "list", "addresses", "template"].indexOf(d.type) < 0 ? (g(), m("div", YO, [
              d.prefix ? (g(), m("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(d.prefix, {
                  field: d,
                  item: e.item
                })
              }, null, 8, XO)) : E("", !0),
              d.type == "text" ? lt((g(), m("input", {
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
              }, null, 10, ZO)), [
                [de, e.item[d.name]]
              ]) : E("", !0),
              d.type == "number" ? lt((g(), m("input", {
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
              }, null, 10, QO)), [
                [de, e.item[d.name]]
              ]) : E("", !0),
              ["date", "datetime", "datetime-local"].indexOf(d.type) >= 0 ? lt((g(), m("input", {
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
              }, null, 10, JO)), [
                [fe, e.item[d.name]]
              ]) : E("", !0),
              d.type == "checkbox" ? (g(), m("div", tN, [
                lt(f("input", {
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
                }, null, 10, eN), [
                  [fu, e.item[d.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: e.formId + "_" + d.name
                }, C(d.checkbox), 9, sN)
              ])) : E("", !0),
              d.type == "email" ? lt((g(), m("input", {
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
              }, null, 10, nN)), [
                [de, e.item[d.name]]
              ]) : E("", !0),
              d.type == "select" && (!d.relation || d.relation && d.relation.items) ? (g(), os(o, {
                key: 6,
                modelValue: e.item[d.name],
                "onUpdate:modelValue": (b) => e.item[d.name] = b,
                field: d,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                auth: e.auth
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId", "auth"])) : E("", !0),
              d.type == "textarea" ? lt((g(), m("textarea", {
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
              }, "              ", 10, iN)), [
                [de, e.item[d.name]]
              ]) : E("", !0),
              d.suffix ? (g(), m("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(d.suffix, {
                  field: d,
                  item: e.item
                })
              }, null, 8, rN)) : E("", !0)
            ])) : E("", !0),
            d.type == "html" ? (g(), os(l, {
              key: 2,
              modelValue: e.item[d.name],
              "onUpdate:modelValue": (b) => e.item[d.name] = b,
              class: S([d.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : E("", !0),
            d.type == "image" || d.type == "upload" ? (g(), os(a, {
              key: 3,
              modelValue: e.item[d.name],
              "onUpdate:modelValue": (b) => e.item[d.name] = b,
              class: S([d.class]),
              field: d,
              settings: e.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : E("", !0),
            d.type == "list" && (!d.relation || d.relation && d.relation.items) ? (g(), os(u, {
              key: 4,
              modelValue: e.item[d.name],
              "onUpdate:modelValue": (b) => e.item[d.name] = b,
              field: d,
              item: e.item,
              settings: e.settings,
              formId: e.formId
            }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : E("", !0),
            d.type == "addresses" ? (g(), m("span", oN, [
              e.item[d.name] ? (g(), m("div", aN, [
                (g(!0), m(J, null, st(e.item[d.name], (b) => (g(), m("div", { key: b }, [
                  et(C(b) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: e.formId + "_" + d.name
                  }, C(d.label), 9, lN),
                  lt(f("input", {
                    class: "form-control",
                    type: "text",
                    name: d.name,
                    id: e.formId + "_" + d.name,
                    "onUpdate:modelValue": (y) => b.country = y
                  }, null, 8, cN), [
                    [de, b.country]
                  ])
                ]))), 128))
              ])) : E("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (b) => e.insertAddress(d.name)
              }, " Add ", 8, uN)
            ])) : E("", !0),
            d.type == "template" ? (g(), m("div", {
              key: 6,
              innerHTML: e.getValueOrFunction(d.template, {
                field: d,
                item: e.item
              })
            }, null, 8, dN)) : E("", !0),
            d.description ? (g(), m("div", hN, [
              f("small", null, [
                f("i", {
                  class: "text-muted",
                  innerHTML: e.getValueOrFunction(d.description, {
                    field: d,
                    item: e.item
                  })
                }, null, 8, fN)
              ])
            ])) : E("", !0)
          ])
        ], 2))), 128))
      ])) : E("", !0)
    ], 2))), 128))
  ]);
}
const gN = /* @__PURE__ */ _e(VO, [["render", pN]]), mN = {
  props: {
    modelValue: Object,
    modalWindow: Object,
    saveItem: Function,
    reloadTable: Function,
    fetchRelation: Function,
    group: Object,
    formId: String,
    settings: Object,
    auth: Object
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
    this.fetchItem(e, this.settings, this.auth);
  },
  watch: {
    modelValue(e) {
      this.item = this.modelValue;
    }
  },
  methods: {
    translate(e, t, s) {
      return ki(e, this.settings.translate, t, s || this.settings.language);
    },
    getValueOrFunction(e, t) {
      return Vs(e, t, this.settings, this);
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
      this.fetchItem(e, null, this.auth);
    },
    async fetchItem(e, t, s) {
      try {
        if (t = t || this.settings, !t.form || !t.form.api)
          return !1;
        this.formWait(!0);
        const n = await fetch(
          He("GET", t.form.api, e),
          Fe("GET", t.api, null, s)
        ).catch((l) => {
        }), i = await mn(n);
        if (bn(n, i.data, "form") || !i.data)
          return this.formNoWait(), !1;
        t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, n);
        let o;
        t.form.api.input.item ? o = typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, n) : o = i.data;
        for (let l of t.form.groups)
          for (let a of l.fields)
            a.relation && t.relations[a.relation.config] && (a.relation = Br(t.relations[a.relation.config], a.relation), console.log(a.relation, s), await this.fetchRelation(a, [o], s));
        this.item = Ar(o), this.itemOriginal = Object.assign({}, o), this.loaded = !0, this.formNoWait();
      } catch (n) {
        console.error(n), this.formNoWait();
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
        ), this.item = Ar(s), this.itemOriginal = Object.assign({}, s)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
          He(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          Fe("DELETE", this.settings.api, null, this.auth)
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
    VuAdminFormGroup: gN
  }
}, bN = mN, yN = ["id", "data-bs-theme"], vN = { class: "modal-header" }, _N = {
  key: 0,
  class: "modal-title"
}, EN = ["innerHTML"], wN = { key: 1 }, TN = { key: 2 }, AN = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, ON = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, NN = ["innerHTML"], kN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, CN = {
  key: 0,
  class: "modal-header bg-body sticky-top"
}, SN = {
  key: 0,
  class: "d-inline-block m-1"
}, LN = { class: "dropdown d-inline-block" }, IN = ["innerHTML"], xN = { class: "dropdown-menu text-start" }, $N = { class: "me-2 text-muted" }, MN = ["innerHTML"], RN = ["disabled", "onClick"], DN = {
  key: 1,
  class: "dropdown d-inline-block"
}, qN = { class: "mx-1" }, BN = { class: "dropdown-menu px-2" }, PN = ["onClick"], jN = {
  key: 1,
  class: "modal-body custom-scroll"
}, VN = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, UN = {
  key: 3,
  class: "bg-light text-dark"
};
function FN(e, t, s, n, i, r) {
  const o = ze("VuAdminFormGroup");
  return e.item ? (g(), m("form", {
    key: 0,
    ref: "form",
    id: e.formId,
    class: S(["form", [e.settings.form.class, { wait: e.ui.wait.form }]]),
    onSubmit: t[1] || (t[1] = Lt((...l) => e.submitItem && e.submitItem(...l), ["prevent"])),
    "data-bs-theme": [e.settings.theme]
  }, [
    f("div", {
      class: S(["vua-overlay", { blocked: e.ui.block.form }])
    }, null, 2),
    f("div", vN, [
      e.loaded ? (g(), m("h5", _N, [
        e.settings.form.title && typeof e.settings.form.title == "function" ? (g(), m("span", {
          key: 0,
          innerHTML: e.settings.form.title(e.item, e.settings)
        }, null, 8, EN)) : E("", !0),
        e.settings.form.title && typeof e.settings.form.title == "string" ? (g(), m("span", wN, C(e.translate(e.settings.form.title)), 1)) : E("", !0),
        e.settings.form.title ? E("", !0) : (g(), m("span", TN, C(e.translate("Edit")), 1)),
        e.item[e.settings.pkey] ? (g(), m("small", AN, [
          t[2] || (t[2] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          et(" " + C(e.item[e.settings.pkey]), 1)
        ])) : E("", !0)
      ])) : E("", !0),
      e.message.form ? (g(), m("span", ON, [
        f("span", {
          class: S(["text-" + e.message.form.priority])
        }, [
          t[3] || (t[3] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: e.message.form.msg
          }, null, 8, NN)
        ], 2)
      ])) : E("", !0),
      lt(f("span", kN, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ss, e.ui.wait.form]
      ]),
      t[5] || (t[5] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    e.item ? (g(), m("div", CN, [
      e.settings.form.control ? (g(), m("div", {
        key: 0,
        class: S(["w-100", e.settings.form.control.class == null ? "d-flex justify-content-center" : e.settings.form.control.class])
      }, [
        e.messages.form.length ? (g(), m("span", SN, [
          f("div", LN, [
            f("button", {
              class: S(["btn btn-sm dropdown-toggle", ["btn-" + e.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: e.messages.form.length + " " + (e.messages.form.length > 1 ? e.translate("messages") : e.translate("message"))
            }, null, 10, IN),
            f("ul", xN, [
              (g(!0), m(J, null, st(e.messages.form, (l) => (g(), m("li", { key: l }, [
                f("span", {
                  class: S(["dropdown-item disabled", ["text-" + l.priority]])
                }, [
                  f("small", $N, C(l.datetime), 1),
                  f("span", {
                    innerHTML: l.msg
                  }, null, 8, MN)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : E("", !0),
        (g(!0), m(J, null, st(e.settings.form.control.buttons, (l) => (g(), m("span", {
          key: l.action
        }, [
          l.dropdowns ? E("", !0) : (g(), m("button", {
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
            et(" " + C(e.translate(l.title)), 1)
          ], 10, RN)),
          l.dropdowns ? (g(), m("div", DN, [
            f("button", {
              type: "button",
              class: S([[l.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", qN, [
                f("i", {
                  class: S([
                    l.icon !== void 0 ? e.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : e.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                et(" " + C(e.translate(l.title)), 1)
              ])
            ], 2),
            f("ul", BN, [
              (g(!0), m(J, null, st(l.dropdowns, (a) => (g(), m("li", { key: a }, [
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
                  }, null, 2)) : E("", !0),
                  et(" " + C(e.translate(a.title)), 1)
                ], 10, PN)
              ]))), 128))
            ])
          ])) : E("", !0)
        ]))), 128))
      ], 2)) : E("", !0)
    ])) : E("", !0),
    e.settings.form ? (g(), m("div", jN, [
      e.settings.form.visible && e.settings.form.groups ? (g(), os(o, {
        key: 0,
        modelValue: e.item,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.item = l),
        formid: e.formId,
        settings: e.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : E("", !0)
    ])) : E("", !0),
    e.item ? (g(), m("div", VN)) : E("", !0),
    e.settings.debug > 1 ? (g(), m("pre", UN, "        " + C(e.item) + `
    `, 1)) : E("", !0)
  ], 42, yN)) : E("", !0);
}
const HN = /* @__PURE__ */ _e(bN, [["render", FN]]), zN = {
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
      return ki(e, this.settings.translate, t, s || this.settings.language);
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
}, WN = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, KN = { class: "dropdown d-inline-block m-1" }, GN = { class: "mx-1" }, YN = { key: 0 }, XN = {
  key: 0,
  class: "dropdown-menu text-end"
}, ZN = ["onClick"], QN = { class: "ms-2" }, JN = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, tk = {
  key: 1,
  class: "bi bi-circle ms-2"
}, ek = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, sk = { class: "pagination pagination-sm m-1" }, nk = { class: "page-item" }, ik = ["innerHTML"], rk = { class: "page-item" }, ok = ["innerHTML"], ak = ["onClick"], lk = { class: "page-item" }, ck = ["innerHTML"], uk = {
  key: 0,
  class: "page-item"
}, dk = ["innerHTML"];
function hk(e, t, s, n, i, r) {
  return s.config.pagination.hidden ? E("", !0) : (g(), m("nav", WN, [
    f("div", null, [
      f("div", KN, [
        f("button", {
          type: "button",
          class: S(["btn btn-sm btn-secondary", { "dropdown-toggle": s.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          lt(f("span", GN, [
            f("strong", null, C(s.config.pagination.from) + "-" + C(s.config.pagination.to), 1),
            s.config.pagination.total ? (g(), m("span", YN, " / " + C(s.config.pagination.total), 1)) : E("", !0)
          ], 512), [
            [Ss, s.config.pagination.from > 0]
          ])
        ], 2),
        s.config.pagination.limits ? (g(), m("ul", XN, [
          f("li", null, [
            (g(!0), m(J, null, st(s.config.pagination.limits, (o) => (g(), m("span", {
              class: S(["dropdown-item cursor-pointer", { selected: s.config.pagination.limit == o }]),
              key: o,
              onClick: (l) => r.setPageLimit(o)
            }, [
              f("strong", null, C(o), 1),
              f("small", QN, C(r.translate("row")) + "/" + C(r.translate("page")), 1),
              s.config.pagination.limit == o ? (g(), m("i", JN)) : E("", !0),
              s.config.pagination.limit != o ? (g(), m("i", tk)) : E("", !0)
            ], 10, ZN))), 128))
          ])
        ])) : E("", !0)
      ]),
      lt(f("div", ek, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ss, s.ui && s.ui.wait.table]
      ])
    ]),
    f("ul", sk, [
      f("li", nk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, ik)
        ], 2)
      ]),
      f("li", rk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(s.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, ok)
        ], 2)
      ]),
      (g(!0), m(J, null, st(s.config.pagination.numbers, (o) => (g(), m("li", {
        key: o,
        class: "page-item"
      }, [
        f("a", {
          class: S(["page-link cursor-pointer", {
            disabled: o > s.config.pagination.pages,
            current: o == s.config.pagination.page
          }]),
          onClick: (l) => r.setPage(o)
        }, C(o), 11, ak)
      ]))), 128)),
      f("li", lk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(s.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, ck)
        ], 2)
      ]),
      s.config.pagination.total ? (g(), m("li", uk, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(s.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, dk)
        ], 2)
      ])) : E("", !0)
    ])
  ]));
}
const fk = /* @__PURE__ */ _e(zN, [["render", hk]]), hu = el(), pk = {
  name: "VuAdminTable",
  props: {
    settings: Object,
    auth: Object
  },
  components: {
    VuAdminForm: HN,
    VuAdminTablePagination: fk
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
  watch: {
    auth: {
      immediate: !0,
      handler(e, t) {
        e != t && this.init();
      }
    }
  },
  created() {
    let e = Math.round(Math.random() * 1e5);
    this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e;
  },
  mounted() {
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Rs(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
      this.settings.form.visible = !1;
    }), this.modalElement.addEventListener("show.bs.modal", (e) => {
      this.settings.form.visible = !0;
    });
  },
  methods: {
    init() {
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
      ), this.settings.initialized = !0, this.listenEvent(), this.resetTable();
    },
    authAndSettings() {
      return this.settings.initialized && this.auth && this.auth.success && this.settings && this.settings.table;
    },
    sendEvent(e, t, s) {
      hu.emit(e + "-" + t, {
        from: this.settings.entity,
        payload: s
      });
    },
    listenEvent() {
      hu.on(`EDIT-${this.settings.entity}`, (e) => {
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
      return Vs(e, t, this.settings, this);
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
          t.relation.ids = Bb(s), await this.fetchRelation(t, e, this.auth);
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
        let t = await this.fetchItems(this.settings, e, this.config, this.auth);
        if (t === !1)
          return this.tableNoWait(), !1;
        await this.fetchTableRelations(t), this.items = t, this.tableNoWait();
      } catch (t) {
        console.error(t), this.addTableMessage(t.message, 3500, "danger"), this.tableNoWait();
      }
    },
    async fetchItems(e, t, s, n) {
      e.events && e.events.beforeItemsLoad && e.events.beforeItemsLoad(t, e);
      const i = await fetch(
        He("GET", e.table.api, null, t),
        Fe("GET", e.table.api, null, n)
      ), r = await mn(i), o = bn(i, r.data);
      if (o) {
        this.handleTableErrors(o);
        return;
      }
      if (r.error) {
        this.handleTableErrors(r.error);
        return;
      }
      e.events && e.events.afterItemsLoad && e.events.afterItemsLoad(r.data, i);
      let l;
      e.table.api.input.items ? l = typeof e.table.api.input.items == "string" ? r.data[e.table.api.input.items] : e.table.api.input.items(r.data, i) : l = r.data, s && (e.table.api.input.total ? s.pagination.total = typeof e.table.api.input.total == "string" ? r.data[e.table.api.input.total] : e.table.api.input.total(r.data, i) : r.data.total && (s.pagination.total = r.data.total), s.pagination.items = l.length, this.calcPage());
      let a = Mb(l);
      return this.convertIn(e.table.columns, a), a;
    },
    async fetchRelation(e, t, s) {
      try {
        let n = e.relation.params ? e.relation.params : {};
        e.relation.columns && (n.columns = JSON.stringify(e.relation.columns));
        let i = {};
        if (e.relation.ids && e.relation.ids.length) {
          let u = (typeof e.relation.ids[0] == "string" ? "text" : "number") === "string" ? "'" + e.relation.ids.join("','") + "'" : e.relation.ids.join(",");
          i[e.relation.foreign] = {
            type: "array",
            value: u,
            operator: "IN"
          };
        }
        n.filter = JSON.stringify(i), Pb(n, {
          column: e
        });
        const r = await fetch(
          He("GET", e.relation.api, null, n),
          Fe("GET", e.relation.api, null, s)
        );
        if (r.status !== 200)
          throw new Error(
            this.translate("Response status: " + r.status)
          );
        const o = await mn(r);
        if (bn(r, o.data) || !o.data)
          return;
        if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? o.data[e.relation.api.input.items] : e.relation.api.input.items(o.data, r) : e.relation.items = o.data, t && t[0])
          for (let a of t)
            a[e.relation.local] && (a[e.relation.entity] = e.relation.items.find(
              (u, h, d) => u[e.relation.foreign] === a[e.relation.local]
            ));
      } catch (n) {
        console.error(n);
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
          He(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          Fe("DELETE", this.settings.api, null, this.auth)
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
        console.error(s), this.tableNoWait();
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
          He("DELETE", this.settings.table.api),
          Fe("DELETE", this.settings.api, {
            body: JSON.stringify({
              ids: e
            })
          }, this.auth)
        );
        if (n.status !== 200)
          throw new Error(
            this.translate("Response status: " + n.status)
          );
        t && t(n), this.reloadTable(), this.tableNoWait();
      } catch (s) {
        console.error(s), this.tableNoWait();
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
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Rb(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, e), !this.settings.form.api.output.item)
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
          He(a, this.settings.form.api, r, n),
          Fe(a, this.settings.form.api, {
            body: o
          }, this.auth)
        );
        const u = await mn(l), h = bn(l, u.data);
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
          He("PUT", this.settings.table.api),
          Fe("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: t,
              ids: this.selected
            })
          }, this.auth)
        ).catch((r) => {
          console.error(r), this.addTableMessage(r.message, 3500, "danger", r);
        }), n = await mn(s), i = bn(s, n.data);
        if (this.tableNoWait(), i)
          return;
        e && e(n.data), this.reloadTable();
      } catch (t) {
        console.error(t), this.addTableMessage(t.message, 3500, "danger", t), this.tableNoWait();
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
      e.multiple ? md(e.value, s) : e.value = e.value === s ? null : s, this.reloadTable();
    },
    dropdownSelectAll(e, t) {
      bd(e, t), this.reloadTable();
    },
    dropdownSelectInvert(e, t) {
      yd(e, t), this.reloadTable();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : vd(e), this.reloadTable();
    },
    async exportTable(e) {
      try {
        fetchItems, e.limit = this.config.pagination.total ? this.config.pagination.total : 0;
        let t = this.getFiltersForFetch(), s = this.getOrdersForFetch();
        this.selected.length > 0 && (t[this.settings.pkey] = {
          type: "string",
          value: this.selected,
          operator: "in"
        }), e.filter = t, e.order = s, this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(items);
        let n = Db(
          items,
          this.settings.table.exports[e.type].fields
        );
        qb(n, this.settings.entity + ".csv");
      } catch (t) {
        console.error(t), this.addTableMessage(t.message, 3500, "danger");
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
      return ki(e, this.settings.translate, t, s || this.settings.language);
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
}, gk = ["data-bs-theme"], mk = { class: "vua-table-title" }, bk = { class: "d-flex align-items-center justify-content-between" }, yk = { class: "d-inline-block" }, vk = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, _k = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, Ek = {
  key: 0,
  class: "d-inline-block"
}, wk = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, Tk = ["innerHTML"], Ak = { class: "dropdown d-inline-block" }, Ok = ["innerHTML"], Nk = { class: "dropdown-menu text-start" }, kk = { class: "me-2 text-muted" }, Ck = ["innerHTML"], Sk = ["onClick"], Lk = {
  key: 1,
  class: "dropdown d-inline-block"
}, Ik = { class: "mx-1" }, xk = { key: 0 }, $k = { class: "dropdown-menu" }, Mk = ["onClick"], Rk = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, Dk = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, qk = { class: "badge text-secondary fw-normal" }, Bk = {
  key: 2,
  class: "dropdown d-inline-block"
}, Pk = { class: "mx-1" }, jk = { class: "dropdown-menu" }, Vk = ["onClick"], Uk = { class: "vua-table-header" }, Fk = ["width"], Hk = ["onClick"], zk = ["innerHTML"], Wk = {
  key: 0,
  class: "bi bi-arrow-down"
}, Kk = {
  key: 1,
  class: "bi bi-arrow-up"
}, Gk = { key: 0 }, Yk = ["disabled", "onClick"], Xk = {
  key: 0,
  class: "vua-table-filter"
}, Zk = ["width"], Qk = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, Jk = { class: "bi bi-check-all" }, t2 = { class: "bi bi-x-lg" }, e2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, s2 = ["onUpdate:modelValue"], n2 = ["disabled", "onClick"], i2 = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, r2 = ["onUpdate:modelValue", "disabled"], o2 = { value: "=" }, a2 = { value: ">" }, l2 = { value: ">=" }, c2 = { value: "<" }, u2 = { value: "<=" }, d2 = ["onUpdate:modelValue", "disabled"], h2 = ["value"], f2 = ["onUpdate:modelValue", "disabled", "min", "max"], p2 = ["disabled", "onClick"], g2 = { key: 3 }, m2 = {
  key: 0,
  class: "dropdown"
}, b2 = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, y2 = { class: "dropdown-menu" }, v2 = ["onClick"], _2 = {
  key: 0,
  class: "bi bi-check-square"
}, E2 = {
  key: 1,
  class: "bi bi-square"
}, w2 = { key: 0 }, T2 = { key: 1 }, A2 = ["onClick"], O2 = { key: 2 }, N2 = ["onClick"], k2 = { key: 3 }, C2 = ["onClick"], S2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, L2 = ["onUpdate:modelValue", "multiple"], I2 = ["value"], x2 = ["disabled", "onClick"], $2 = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, M2 = ["onUpdate:modelValue"], R2 = { value: "=" }, D2 = { value: ">" }, q2 = { value: ">=" }, B2 = { value: "<" }, P2 = { value: "<=" }, j2 = ["onUpdate:modelValue"], V2 = ["value"], U2 = ["type", "onUpdate:modelValue"], F2 = ["disabled", "onClick"], H2 = ["disabled", "onClick"], z2 = { class: "align-middle" }, W2 = ["data-label", "width", "onClick"], K2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, G2 = ["innerHTML"], Y2 = { key: 1 }, X2 = ["innerHTML"], Z2 = ["aria-valuenow", "aria-valuemax"], Q2 = { key: 0 }, J2 = {
  key: 4,
  class: "input-group input-group-sm"
}, tC = ["innerHTML"], eC = ["type", "onChange", "onUpdate:modelValue"], sC = ["onChange", "onUpdate:modelValue"], nC = ["value"], iC = ["innerHTML"], rC = { key: 5 }, oC = ["disabled", "onClick"], aC = ["innerHTML"], lC = { key: 2 }, cC = { key: 0 }, uC = ["colspan"], dC = { class: "row g-3 align-items-center" }, hC = { class: "col-form-label" }, fC = ["type", "onUpdate:modelValue", "onChange"], pC = ["onUpdate:modelValue", "onChange"], gC = ["onUpdate:modelValue", "onChange"], mC = ["value"], bC = ["innerHTML"], yC = {
  key: 0,
  class: "bg-light text-dark"
}, vC = {
  key: 0,
  class: "vua-table-bulk border-info"
}, _C = ["data-label", "width"], EC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, wC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, TC = ["type", "disabled", "onChange", "onUpdate:modelValue"], AC = ["disabled", "onChange", "onUpdate:modelValue"], OC = ["value"], NC = ["onClick"], kC = {
  key: 0,
  class: "bi bi-square text-secondary"
}, CC = {
  key: 1,
  class: "bi bi-check-square"
}, SC = { key: 2 }, LC = ["disabled", "onClick"], IC = ["innerHTML"], xC = { key: 2 }, $C = ["id"], MC = { class: "modal-dialog modal-xl" }, RC = { class: "modal-content h-100" };
function DC(e, t, s, n, i, r) {
  const o = ze("VuAdminTablePagination"), l = ze("VuAdminForm");
  return g(), m("div", null, [
    r.authAndSettings() ? (g(), m("div", {
      key: 0,
      class: S(["vua-table-container", [s.settings.class]]),
      "data-bs-theme": [s.settings.theme]
    }, [
      f("div", {
        class: S(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", mk, [
        f("div", bk, [
          f("div", yk, [
            s.settings.table.title ? (g(), m("h5", vk, C(s.settings.table.title), 1)) : E("", !0),
            lt(f("div", _k, t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ss, i.ui.wait.table && s.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (g(), m("div", Ek, [
            i.message.table ? (g(), m("small", wk, [
              f("span", {
                class: S(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, Tk)
              ], 2)
            ])) : E("", !0),
            f("div", Ak, [
              f("button", {
                class: S(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, Ok),
              f("ul", Nk, [
                (g(!0), m(J, null, st(i.messages.table, (a) => (g(), m("li", { key: a }, [
                  f("span", {
                    class: S(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    f("small", kk, C(a.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, Ck)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : E("", !0)
        ])
      ]),
      s.settings.table.control ? (g(), m("div", {
        key: 0,
        class: S(["vua-table-control", [s.settings.table.control.class]])
      }, [
        (g(!0), m(J, null, st(s.settings.table.control.buttons, (a) => (g(), m("span", {
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
            et(" " + C(r.translate(a.title)), 1)
          ], 10, Sk)) : E("", !0),
          a.action === "TABLE_COLUMNS" ? (g(), m("div", Lk, [
            f("button", {
              type: "button",
              class: S([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              lt(f("span", Ik, [
                f("i", {
                  class: S([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                et(" " + C(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (g(), m("span", xk, " ( " + C(r.countHiddenColumns()) + " " + C(r.translate("hidden")) + " ) ", 1)) : E("", !0)
              ], 512), [
                [Ss, s.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", $k, [
              (g(!0), m(J, null, st(s.settings.table.columns, (u) => (g(), m("li", { key: u }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(u)
                }, [
                  u.hidden ? E("", !0) : (g(), m("i", Rk)),
                  u.hidden ? (g(), m("i", Dk)) : E("", !0),
                  et(" " + C(u.title) + " ", 1),
                  f("small", qk, C(u.name), 1)
                ], 8, Mk)
              ]))), 128)),
              t[16] || (t[16] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (u) => r.toggleColumn(!0))
                }, C(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (u) => r.toggleColumn(!1))
                }, C(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : E("", !0),
          a.dropdowns ? (g(), m("div", Bk, [
            f("button", {
              type: "button",
              class: S([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", Pk, [
                f("i", {
                  class: S([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                et(" " + C(r.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", jk, [
              (g(!0), m(J, null, st(a.dropdowns, (u) => (g(), m("li", { key: u }, [
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
                  }, null, 2)) : E("", !0),
                  et(" " + C(r.translate(u.title)), 1)
                ], 10, Vk)
              ]))), 128))
            ])
          ])) : E("", !0)
        ]))), 128))
      ], 2)) : E("", !0),
      s.settings.table ? (g(), m("table", {
        key: 1,
        class: S(["table vua-table mb-0", [s.settings.table.class]])
      }, [
        f("thead", null, [
          f("tr", Uk, [
            (g(!0), m(J, null, st(s.settings.table.columns, (a) => (g(), m("th", {
              class: S(["", [a.header ? a.header.class : ""]]),
              style: Qn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              f("span", {
                class: S(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (u) => r.sortTable(a)
              }, [
                f("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, zk),
                i.config.order[a.name] ? (g(), m("span", {
                  key: 0,
                  class: S(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (g(), m("i", Wk)) : E("", !0),
                  i.config.order[a.name].dir === "DESC" ? (g(), m("i", Kk)) : E("", !0),
                  et(" " + C(i.config.order[a.name].idx + 1), 1)
                ], 2)) : E("", !0)
              ], 10, Hk),
              a.header && a.header.buttons ? (g(), m("span", Gk, [
                (g(!0), m(J, null, st(a.header.buttons, (u) => (g(), m("button", {
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
                  et(" " + C(r.translate(u.title)), 1)
                ], 10, Yk))), 128))
              ])) : E("", !0)
            ], 14, Fk))), 128))
          ]),
          r.countFilters() ? (g(), m("tr", Xk, [
            (g(!0), m(J, null, st(s.settings.table.columns, (a) => (g(), m("th", {
              style: Qn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: S([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (g(), m("div", Qk, [
                f("span", {
                  class: S(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (u) => r.toggleSelectedRowInPage())
                }, [
                  lt(f("i", Jk, null, 512), [
                    [Ss, !r.haveSelectedRowInPage()]
                  ]),
                  lt(f("i", t2, null, 512), [
                    [Ss, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : E("", !0),
              a.filter && a.filter.type == "text" ? (g(), m("div", e2, [
                lt(f("input", {
                  type: "text",
                  class: S([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onKeyup: t[3] || (t[3] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, s2), [
                  [de, a.filter.value]
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
                ]), 10, n2)) : E("", !0)
              ])) : E("", !0),
              a.filter && a.filter.type == "number" ? (g(), m("div", i2, [
                a.filter.operators == !0 ? lt((g(), m("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", o2, C(r.translate("=")), 1),
                  f("option", a2, C(r.translate(">")), 1),
                  f("option", l2, C(r.translate(">=")), 1),
                  f("option", c2, C(r.translate("<")), 1),
                  f("option", u2, C(r.translate("<=")), 1)
                ], 40, r2)), [
                  [Ne, a.filter.operator]
                ]) : E("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? lt((g(), m("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), m(J, null, st(a.filter.operators, (u) => (g(), m("option", {
                    key: u,
                    value: u.value
                  }, C(u.label), 9, h2))), 128))
                ], 40, d2)), [
                  [Ne, a.filter.operator]
                ]) : E("", !0),
                lt(f("input", {
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
                }, null, 42, f2), [
                  [de, a.filter.value]
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
                ]), 10, p2)) : E("", !0)
              ])) : E("", !0),
              a.filter && a.filter.type == "select" ? (g(), m("div", g2, [
                a.filter.dropdown ? (g(), m("div", m2, [
                  f("button", b2, C(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  f("ul", y2, [
                    f("li", null, [
                      (g(!0), m(J, null, st(a.filter.options, (u) => (g(), m("span", {
                        key: u,
                        class: S(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(u.value) >= 0 : a.filter.value === u.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, u)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(u.value) >= 0 : a.filter.value === u.value) ? (g(), m("i", _2)) : (g(), m("i", E2)),
                        et(" " + C(r.translate(u.label ? u.label : u.value)), 1)
                      ], 10, v2))), 128))
                    ]),
                    a.filter.multiple ? (g(), m("li", w2, t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : E("", !0),
                    a.filter.multiple ? (g(), m("li", T2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, C(r.translate("Select all")), 9, A2)
                    ])) : E("", !0),
                    a.filter.multiple ? (g(), m("li", O2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectClear(a.filter.value)
                      }, C(r.translate("Unselect all")), 9, N2)
                    ])) : E("", !0),
                    a.filter.multiple ? (g(), m("li", k2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, C(r.translate("Invert all")), 9, C2)
                    ])) : E("", !0)
                  ])
                ])) : (g(), m("div", S2, [
                  lt(f("select", {
                    "onUpdate:modelValue": (u) => a.filter.value = u,
                    onChange: t[8] || (t[8] = (u) => r.reloadTable()),
                    multiple: a.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (g(!0), m(J, null, st(a.filter.options, (u) => (g(), m("option", {
                      key: u,
                      value: u.value
                    }, C(r.translate(u.label ? u.label : u.value)), 9, I2))), 128))
                  ], 40, L2), [
                    [Ne, a.filter.value]
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
                  ]), 10, x2)) : E("", !0)
                ]))
              ])) : E("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (g(), m("div", $2, [
                a.filter.operators == !0 ? lt((g(), m("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[9] || (t[9] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", R2, C(r.translate("=")), 1),
                  f("option", D2, C(r.translate(">")), 1),
                  f("option", q2, C(r.translate(">=")), 1),
                  f("option", B2, C(r.translate("<")), 1),
                  f("option", P2, C(r.translate("<=")), 1)
                ], 40, M2)), [
                  [Ne, a.filter.operator]
                ]) : E("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? lt((g(), m("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[10] || (t[10] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), m(J, null, st(a.filter.operators, (u) => (g(), m("option", {
                    key: u,
                    value: u.value
                  }, C(r.translate(u.label)), 9, V2))), 128))
                ], 40, j2)), [
                  [Ne, a.filter.operator]
                ]) : E("", !0),
                lt(f("input", {
                  type: a.filter.type,
                  class: S([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onChange: t[11] || (t[11] = (u) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, U2), [
                  [fe, a.filter.value]
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
                ]), 10, F2)
              ])) : E("", !0),
              a.filter && a.filter.buttons ? (g(), m("span", {
                key: 5,
                class: S(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (g(!0), m(J, null, st(a.filter.buttons, (u) => (g(), m("span", {
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
                    et(" " + C(r.translate(u.title)), 1)
                  ], 10, H2)
                ]))), 128))
              ], 2)) : E("", !0)
            ], 14, Zk))), 128))
          ])) : E("", !0)
        ]),
        f("tbody", null, [
          (g(!0), m(J, null, st(this.items, (a, u) => (g(), m(J, {
            key: a.id
          }, [
            f("tr", z2, [
              (g(!0), m(J, null, st(s.settings.table.columns, (h) => (g(), m("td", {
                style: Qn([h.hidden ? "display: none" : ""]),
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
                h.index ? (g(), m("div", K2, [
                  f("span", {
                    class: S(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[s.settings.pkey]) >= 0
                    }]),
                    innerHTML: u + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, G2)
                ])) : E("", !0),
                !h.template && !h.input && !h.progressbar ? (g(), m("span", Y2, C(r.tableCellValue(h.name, a, u, h)), 1)) : E("", !0),
                h.template ? (g(), m("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, u, h)
                }, null, 8, X2)) : E("", !0),
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
                    style: Qn({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (g(), m("span", Q2, C(a[h.name]), 1)) : E("", !0)
                  ], 6)
                ], 8, Z2)) : E("", !0),
                h.input ? (g(), m("div", J2, [
                  h.input.prefix ? (g(), m("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, tC)) : E("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    h.input.type
                  ) >= 0 ? lt((g(), m("input", {
                    key: 1,
                    type: h.input.type,
                    class: S(["form-control form-control-sm", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (d) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (d) => a[h.name] = d
                  }, null, 42, eC)), [
                    [fe, a[h.name]]
                  ]) : E("", !0),
                  h.input.type == "select" ? lt((g(), m("select", {
                    key: 2,
                    class: S(["form-select form-select-sm pe-0", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (d) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (d) => a[h.name] = d
                  }, [
                    (g(!0), m(J, null, st(h.input.options, (d) => (g(), m("option", {
                      value: d.value,
                      key: d
                    }, C(r.translate(d.label)), 9, nC))), 128))
                  ], 42, sC)), [
                    [Ne, a[h.name]]
                  ]) : E("", !0),
                  h.input.suffix ? (g(), m("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, iC)) : E("", !0)
                ])) : E("", !0),
                h.buttons ? (g(), m("span", rC, [
                  (g(!0), m(J, null, st(h.buttons, (d) => (g(), m("span", {
                    key: d.action
                  }, [
                    d.hidden ? E("", !0) : (g(), m("button", {
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
                      }, null, 2)) : E("", !0),
                      d.template ? (g(), m("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(d.template, a, u, h)
                      }, null, 8, aC)) : (g(), m("span", lC, C(r.translate(d.title)), 1))
                    ], 10, oC))
                  ]))), 128))
                ])) : E("", !0)
              ], 14, W2))), 128))
            ]),
            s.settings.table.details && i.details.indexOf(a[s.settings.pkey]) >= 0 ? (g(), m("tr", cC, [
              f("td", {
                class: S([s.settings.table.details.class]),
                colspan: s.settings.table.columns.length
              }, [
                (g(!0), m(J, null, st(s.settings.table.details.fields, (h) => (g(), m("div", {
                  class: "m-0",
                  key: h
                }, [
                  f("div", dC, [
                    f("div", {
                      class: S(["col text-end", [h.class]])
                    }, [
                      f("label", hC, C(h.label), 1)
                    ], 2),
                    f("div", {
                      class: S(["col", [h.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(h.input.type) < 0 ? lt((g(), m("input", {
                        key: 0,
                        type: h.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, null, 40, fC)), [
                        [fe, a[h.name]]
                      ]) : E("", !0),
                      h.input.type == "textarea" ? lt((g(), m("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, `\r
                    `, 40, pC)), [
                        [de, a[h.name]]
                      ]) : E("", !0),
                      h.input.type == "select" ? lt((g(), m("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, [
                        (g(!0), m(J, null, st(h.input.options, (d) => (g(), m("option", {
                          value: d.value,
                          key: d
                        }, C(r.translate(d.label)), 9, mC))), 128))
                      ], 40, gC)), [
                        [Ne, a[h.name]]
                      ]) : E("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: s.settings.table.details.raw(a)
                }, null, 8, bC),
                s.settings.debug > 1 ? (g(), m("pre", yC, "                  " + C(a) + `
                `, 1)) : E("", !0)
              ], 10, uC)
            ])) : E("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (g(), m("tr", vC, [
            (g(!0), m(J, null, st(s.settings.table.columns, (a) => (g(), m("td", {
              style: Qn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: S(a.class)
            }, [
              a.index ? (g(), m("div", EC, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (u) => r.toggleSelectedAll())
                }, C(i.selected.length), 1)
              ])) : E("", !0),
              a.input && a.bulk && a.bulk.enabled ? (g(), m("div", wC, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? lt((g(), m("input", {
                  key: 0,
                  type: a.input.type,
                  class: S(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, null, 42, TC)), [
                  [fe, i.bulkitem[a.name]]
                ]) : E("", !0),
                a.input.type == "select" ? lt((g(), m("select", {
                  key: 1,
                  class: S(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, [
                  (g(!0), m(J, null, st(a.input.options, (u) => (g(), m("option", {
                    value: u.value,
                    key: u
                  }, C(r.translate(u.label)), 9, OC))), 128))
                ], 42, AC)), [
                  [Ne, i.bulkitem[a.name]]
                ]) : E("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (u) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (g(), m("i", kC)) : (g(), m("i", CC))
                ], 8, NC)
              ])) : E("", !0),
              a.bulk ? (g(), m("span", SC, [
                (g(!0), m(J, null, st(a.bulk.buttons, (u) => (g(), m("span", {
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
                    }, null, 2)) : E("", !0),
                    u.template ? (g(), m("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(u.template, i.bulkitem, null, a)
                    }, null, 8, IC)) : (g(), m("span", xC, C(r.translate(u.title)), 1))
                  ], 10, LC)
                ]))), 128))
              ])) : E("", !0)
            ], 14, _C))), 128))
          ])) : E("", !0)
        ])
      ], 2)) : E("", !0),
      pu(o, {
        settings: s.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"])
    ], 10, gk)) : E("", !0),
    f("div", {
      class: "modal shadow",
      id: i.modalId,
      tabindex: "-1"
    }, [
      f("div", MC, [
        f("div", RC, [
          r.authAndSettings() && s.settings.form.visible && s.settings.form.groups ? (g(), os(l, {
            key: 0,
            modelValue: i.item,
            "onUpdate:modelValue": t[14] || (t[14] = (a) => i.item = a),
            formid: i.formId,
            settings: s.settings,
            modalWindow: i.modalWindow,
            auth: s.auth,
            saveItem: r.saveItem,
            deleteItem: r.deleteItem,
            reloadTable: r.reloadTable,
            fetchRelation: r.fetchRelation
          }, null, 8, ["modelValue", "formid", "settings", "modalWindow", "auth", "saveItem", "deleteItem", "reloadTable", "fetchRelation"])) : E("", !0)
        ])
      ])
    ], 8, $C)
  ]);
}
const qC = /* @__PURE__ */ _e(pk, [["render", DC]]), BC = {
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
  watch: {
    auth(e, t) {
      e != t && this.$forceUpdate();
    }
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
          auth: {},
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
    if (window.VuSettings && window.VuSettings.entity[this.entity]) {
      if (this.settings = Br(this.defaults, window.VuSettings.entity[this.entity]), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
        const e = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = e || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.2.83"), console.log(`Entity config (${this.entity}) initialized`), this.settings.debug > 1 && console.log(this.settings));
    } else
      console.log("vu-admin ", "1.2.83"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: qC
  }
}, PC = BC, jC = { key: 0 }, VC = ["data-bs-theme"];
function UC(e, t, s, n, i, r) {
  const o = ze("vu-admin-table");
  return e.entity && e.settings ? (g(), m("div", jC, [
    e.auth ? (g(), m("div", {
      key: 0,
      class: "vu-admin",
      "data-bs-theme": [e.settings.theme]
    }, [
      pu(o, {
        settings: e.settings,
        auth: e.auth
      }, null, 8, ["settings", "auth"])
    ], 8, VC)) : E("", !0)
  ])) : E("", !0);
}
const FC = /* @__PURE__ */ _e(PC, [["render", UC]]), HC = (e) => {
  const t = new DataView(e);
  let s = "";
  for (let n = 0; n < t.byteLength; n += 4)
    s += t.getUint32(n).toString(16).padStart(8, "0");
  return s;
}, zC = (e) => async (t, { outputFormat: s = "hex" } = {}) => {
  typeof t == "string" && (t = new globalThis.TextEncoder().encode(t));
  const n = await globalThis.crypto.subtle.digest(e, t);
  return s === "hex" ? HC(n) : n;
}, WC = zC("SHA-384");
el();
const KC = {
  name: "VuAuth",
  props: {
    modelValue: Object
  },
  data() {
    return {
      auth: void 0,
      username: "",
      password: "",
      password_again: "",
      accepts: {},
      inputs: {},
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
    modelValue(e, t) {
      e != t && (this.auth = e, this.updateInputs(), this.$forceUpdate());
    }
  },
  methods: {
    updateInputs() {
      this.auth.inputs && (this.inputs = Object.assign(this.inputs, this.auth.inputs));
    },
    checkStorage() {
      this.auth.user = {}, this.auth.user = JSON.parse(localStorage.getItem("vu-user")), this.auth.header = JSON.parse(localStorage.getItem("vu-header")), this.auth.user && (this.auth.success = !0), this.$emit("update:modelValue", this.auth);
    },
    async handleSubmit() {
      if (this.auth.panel == "login") {
        this.handleLogin();
        return;
      }
      if (this.auth.panel == "forgot") {
        this.handleForgotPasswordSubmit();
        return;
      }
      if (this.auth.panel == "registration") {
        this.handleNewRegistrationSubmit();
        return;
      }
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
            password: await this.hashPassword(this.password),
            accept: this.accepts
          })
        }
      );
      if (e.ok) {
        const t = await e.json();
        this.responseOk = !0, this.responseMessage = "Sikeres bejelentkezés", this.login(t), this.close();
      } else
        this.responseOk = !1, this.auth.success = !1, this.responseMessage = "Sikertelen bejelentkezés";
    },
    async handleNewRegistrationSubmit() {
      if (!this.username || !this.password || !this.password_again || this.password != this.password_again)
        return;
      const e = await fetch(this.settings.api.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          password: await this.hashPassword(this.password),
          accept: this.accepts,
          input: this.inputs
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
        t = await WC(t);
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
    authUpdate() {
      this.$emit("update:modelValue", this.auth);
    },
    handleEscapeKey(e) {
      e.key === "Escape" && this.close();
    },
    login(e) {
      this.settings.onsuccess && (this.settings.onsuccess(e, this.auth), localStorage.setItem("vu-user", JSON.stringify(this.auth.user)), localStorage.setItem("vu-header", JSON.stringify(this.auth.header))), this.auth.success = !0, setTimeout(() => {
        this.authUpdate(e), this.$forceUpdate();
      }, 0);
    },
    logout() {
      this.auth.success = !1, this.auth.header = null, this.auth.user = null, this.$emit("update:modelValue", this.auth), localStorage.removeItem("vu-user"), localStorage.removeItem("vu-header");
    },
    getValueOrFunction(e, t) {
      return Vs(e, t, this.settings, this);
    }
  },
  created() {
    window.VuSettings && window.VuSettings.auth && (this.settings = window.VuSettings.auth);
  },
  mounted() {
    if (window.addEventListener("keydown", this.handleEscapeKey), this.recaptchaSiteKey && !document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const e = document.createElement("script");
      e.src = "https://www.google.com/recaptcha/api.js", e.async = !0, e.defer = !0, document.head.appendChild(e);
    }
    this.settings.username.value && (this.username = this.settings.username.value), this.auth || (this.auth = {
      user: void 0,
      header: void 0,
      success: !1
    }, this.authUpdate()), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }
}, GC = KC, YC = {
  key: 0,
  class: "vua-auth"
}, XC = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, ZC = { class: "text-center mt-2 mb-4" }, QC = { key: 0 }, JC = { key: 1 }, tS = { key: 2 }, eS = { key: 3 }, sS = { key: 0 }, nS = ["innerHTML"], iS = { class: "d-flex justify-content-between" }, rS = { class: "mb-3" }, oS = {
  for: "email",
  class: "form-label text-primary"
}, aS = { class: "input-group" }, lS = ["type", "placeholder"], cS = ["innerHTML"], uS = { class: "mb-3" }, dS = {
  for: "password",
  class: "form-label text-primary"
}, hS = { class: "input-group" }, fS = ["type", "placeholder", "pattern", "minlength"], pS = {
  key: 0,
  class: "bi bi-eye"
}, gS = {
  key: 1,
  class: "bi bi-eye-slash"
}, mS = ["innerHTML"], bS = {
  key: 0,
  class: "mb-4"
}, yS = {
  for: "password_again",
  class: "form-label text-primary"
}, vS = {
  key: 0,
  class: "text-danger"
}, _S = { class: "input-group" }, ES = ["type", "placeholder", "minlength"], wS = {
  key: 0,
  class: "bi bi-eye"
}, TS = {
  key: 1,
  class: "bi bi-eye-slash"
}, AS = ["innerHTML"], OS = { class: "mb-3 text-center" }, NS = ["data-sitekey"], kS = {
  key: 1,
  class: "mb-4 text-center"
}, CS = {
  key: 2,
  class: "d-flex mb-4"
}, SS = { key: 3 }, LS = { key: 0 }, IS = ["for", "innerHTML"], xS = { class: "input-group" }, $S = ["innerHTML"], MS = ["required", "onUpdate:modelValue", "multiple"], RS = ["value", "innerHTML"], DS = ["id", "name", "type", "onUpdate:modelValue", "placeholder", "required"], qS = ["innerHTML"], BS = ["innerHTML"], PS = {
  key: 0,
  class: "form-check"
}, jS = ["id", "name", "onUpdate:modelValue", "required"], VS = ["for", "innerHTML"], US = {
  key: 4,
  class: "mt-4"
}, FS = ["innerHTML"], HS = { class: "mt-4 d-flex justify-content-between" }, zS = {
  key: 0,
  class: "bi bi-person-plus mx-1"
}, WS = {
  key: 1,
  class: "bi bi-arrow-right-square mx-1"
}, KS = {
  key: 5,
  class: "mt-3 text-center"
}, GS = ["innerHTML"], YS = { class: "mt-2 text-end" };
function XS(e, t, s, n, i, r) {
  return e.auth && e.auth.visible ? (g(), m("div", YC, [
    f("div", {
      class: "row d-flex justify-content-center align-items-center min-vh-100",
      onClick: t[16] || (t[16] = Lt((...o) => e.close && e.close(...o), ["stop"]))
    }, [
      f("div", XC, [
        f("div", {
          class: "card shadow p-4 position-relative bg-light",
          onClick: t[15] || (t[15] = Lt(() => {
          }, ["stop"]))
        }, [
          f("button", {
            type: "button",
            class: "btn position-absolute top-0 end-0 p-0 m-2",
            onClick: t[0] || (t[0] = Lt((...o) => e.close && e.close(...o), ["stop"]))
          }, t[17] || (t[17] = [
            f("i", { class: "bi bi-x px-1 text-muted" }, null, -1)
          ])),
          f("h1", ZC, [
            e.auth.panel == "forgot" ? (g(), m("span", QC, " Elfelejtett jelszó ")) : E("", !0),
            e.auth.panel == "registration" ? (g(), m("span", JC, " Regisztráció ")) : E("", !0),
            e.auth.panel == "help" ? (g(), m("span", tS, " Segítség ")) : E("", !0),
            e.auth.panel == "login" ? (g(), m("span", eS, " Bejelentkezés ")) : E("", !0)
          ]),
          e.auth.panel == "help" ? (g(), m("div", sS, [
            f("div", {
              innerHTML: e.settings.help,
              class: "mb-4"
            }, null, 8, nS),
            f("div", iS, [
              e.auth.panel != "login" ? (g(), m("button", {
                key: 0,
                type: "button",
                onClick: t[1] || (t[1] = Lt((...o) => e.toggleClear && e.toggleClear(...o), ["stop"])),
                class: "btn btn-secondary w-100 me-1"
              }, t[18] || (t[18] = [
                f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1),
                et(" Vissza ")
              ]))) : E("", !0)
            ])
          ])) : (g(), m("form", {
            key: 1,
            onSubmit: t[13] || (t[13] = Lt((o) => e.handleSubmit(), ["prevent"])),
            onClick: t[14] || (t[14] = Lt(() => {
            }, ["stop"]))
          }, [
            f("div", rS, [
              f("label", oS, C(e.settings.username.label), 1),
              f("div", aS, [
                e.settings.username.icon ? (g(), m("span", {
                  key: 0,
                  class: S(["input-group-text", { "rounded-bottom-0": e.settings.username.help }])
                }, [
                  f("i", {
                    class: S([e.settings.username.icon])
                  }, null, 2)
                ], 2)) : E("", !0),
                lt(f("input", {
                  id: "email",
                  name: "email",
                  type: e.settings.username.type,
                  "onUpdate:modelValue": t[2] || (t[2] = (o) => e.username = o),
                  class: S(["form-control", { "rounded-bottom-0": e.settings.username.help }]),
                  placeholder: e.settings.username.placeholder,
                  required: ""
                }, null, 10, lS), [
                  [fe, e.username]
                ])
              ]),
              e.settings.username.help ? (g(), m("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                innerHTML: e.settings.username.help
              }, null, 8, cS)) : E("", !0)
            ]),
            e.auth.panel != "forgot" ? (g(), m(J, { key: 0 }, [
              f("div", uS, [
                f("label", dS, C(e.settings.password.label), 1),
                f("div", hS, [
                  e.settings.password.icon ? (g(), m("span", {
                    key: 0,
                    class: S(["input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }])
                  }, [
                    f("i", {
                      class: S([e.settings.password.icon])
                    }, null, 2)
                  ], 2)) : E("", !0),
                  lt(f("input", {
                    id: "password",
                    name: "password",
                    type: e.settings.password.type,
                    "onUpdate:modelValue": t[3] || (t[3] = (o) => e.password = o),
                    class: S(["form-control", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    placeholder: e.settings.password.placeholder,
                    pattern: e.settings.password.pattern,
                    minlength: e.auth.panel == "registration" ? e.settings.password.minlength : 1,
                    required: ""
                  }, null, 10, fS), [
                    [fe, e.password]
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
                    }, C(e.password.length), 3)
                  ], 2)) : E("", !0),
                  f("span", {
                    class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    onClick: t[4] || (t[4] = Lt((o) => e.toggleType("password"), ["stop"]))
                  }, [
                    e.settings.password.type == "password" ? (g(), m("i", pS)) : (g(), m("i", gS))
                  ], 2)
                ]),
                e.auth.panel == "registration" && e.settings.password.help ? (g(), m("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                  innerHTML: e.settings.password.help
                }, null, 8, mS)) : E("", !0)
              ]),
              e.auth.panel === "registration" ? (g(), m("div", bS, [
                f("label", yS, [
                  et(C(e.settings.password_again.label) + " ", 1),
                  e.password_again.length > 0 && e.password_again != e.password ? (g(), m("small", vS, " ( a két jelszó nem egyezik ) ")) : E("", !0)
                ]),
                f("div", _S, [
                  e.settings.password.icon ? (g(), m("span", {
                    key: 0,
                    class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("i", {
                      class: S([e.settings.password_again.icon])
                    }, null, 2)
                  ], 2)) : E("", !0),
                  lt(f("input", {
                    id: "password_again",
                    name: "password_again",
                    type: e.settings.password_again.type,
                    "onUpdate:modelValue": t[5] || (t[5] = (o) => e.password_again = o),
                    class: S(["form-control", { "rounded-bottom-0": e.settings.password_again.help }]),
                    placeholder: e.settings.password_again.placeholder,
                    minlength: e.settings.password.minlength,
                    required: ""
                  }, null, 10, ES), [
                    [fe, e.password_again]
                  ]),
                  f("span", {
                    class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("small", {
                      class: S(["", {
                        "text-success": e.password_again.length >= e.settings.password.minlength,
                        "text-danger": e.password_again.length < e.settings.password.minlength
                      }])
                    }, C(e.password_again.length), 3)
                  ], 2),
                  f("span", {
                    class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password_again.help }]),
                    onClick: t[6] || (t[6] = Lt((o) => e.toggleType("password_again"), ["stop"]))
                  }, [
                    e.settings.password_again.type == "password" ? (g(), m("i", wS)) : (g(), m("i", TS))
                  ], 2)
                ]),
                e.auth.panel == "registration" && e.settings.password_again.help ? (g(), m("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                  innerHTML: e.settings.password_again.help
                }, null, 8, AS)) : E("", !0)
              ])) : E("", !0),
              f("div", OS, [
                f("div", {
                  class: "g-recaptcha",
                  "data-sitekey": e.recaptchaSiteKey,
                  onClick: t[7] || (t[7] = Lt((...o) => e.onCaptchaClick && e.onCaptchaClick(...o), ["stop"]))
                }, null, 8, NS)
              ])
            ], 64)) : E("", !0),
            e.auth.panel == "login" ? (g(), m("div", kS, [
              f("button", {
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[8] || (t[8] = Lt((...o) => e.toggleForgotPassword && e.toggleForgotPassword(...o), ["stop"]))
              }, " Elfelejtetted a jelszavad? "),
              e.settings.help ? (g(), m("button", {
                key: 0,
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[9] || (t[9] = Lt((...o) => e.toggleHelp && e.toggleHelp(...o), ["stop"]))
              }, " Segítségre van szükséged? ")) : E("", !0)
            ])) : E("", !0),
            e.auth.panel == "forgot" ? (g(), m("div", CS, t[19] || (t[19] = [
              f("small", { class: "text-muted" }, " A megadott e-mail címre ( amennyiben az szerepel az adatbázisunkban ) egy levelet küldünk, melyben az új jelszó igénylése linkre kattintva egy weboldalra jutsz. Ott tudod megadni az új jelszavadat. Az e-mailben szereplő link csak 1 óráig érvényes. ", -1)
            ]))) : E("", !0),
            e.auth.panel == "registration" ? (g(), m("div", SS, [
              (g(!0), m(J, null, st(e.settings.inputs, (o, l) => (g(), m("div", {
                key: l,
                class: "mb-4"
              }, [
                o.hidden ? E("", !0) : (g(), m("div", LS, [
                  f("label", {
                    for: l,
                    class: "form-label text-primary",
                    innerHTML: e.getValueOrFunction(o.label)
                  }, null, 8, IS),
                  f("div", xS, [
                    o.prefix ? (g(), m("span", {
                      key: 0,
                      class: S(["input-group-text", { "rounded-bottom-0": o.help }]),
                      innerHTML: e.getValueOrFunction(o.prefix)
                    }, null, 10, $S)) : E("", !0),
                    o.type == "select" ? lt((g(), m("select", {
                      key: 1,
                      class: "form-select",
                      required: o.required,
                      "onUpdate:modelValue": (a) => e.inputs[l] = a,
                      multiple: o.multiple
                    }, [
                      t[20] || (t[20] = f("option", null, null, -1)),
                      (g(!0), m(J, null, st(o.options, (a) => (g(), m("option", {
                        key: a,
                        value: a.value,
                        innerHTML: e.getValueOrFunction(a.label)
                      }, null, 8, RS))), 128))
                    ], 8, MS)), [
                      [Ne, e.inputs[l]]
                    ]) : lt((g(), m("input", {
                      key: 2,
                      id: l,
                      name: l,
                      type: o.type,
                      "onUpdate:modelValue": (a) => e.inputs[l] = a,
                      class: S(["form-control", { "rounded-bottom-0": o.help }]),
                      placeholder: o.placeholder,
                      required: o.required
                    }, null, 10, DS)), [
                      [fe, e.inputs[l]]
                    ]),
                    o.suffix ? (g(), m("span", {
                      key: 3,
                      class: S(["input-group-text", { "rounded-bottom-0": o.help }]),
                      innerHTML: e.getValueOrFunction(o.suffix)
                    }, null, 10, qS)) : E("", !0)
                  ]),
                  o.help ? (g(), m("small", {
                    key: 0,
                    class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                    innerHTML: e.getValueOrFunction(o.help)
                  }, null, 8, BS)) : E("", !0)
                ]))
              ]))), 128))
            ])) : E("", !0),
            (g(!0), m(J, null, st(e.settings.accepts, (o) => (g(), m("div", { key: o }, [
              o.panels.indexOf(e.auth.panel) >= 0 ? (g(), m("div", PS, [
                lt(f("input", {
                  type: "checkbox",
                  class: "form-check-input",
                  id: "accept_" + o.name,
                  name: "accept_" + o.name,
                  "onUpdate:modelValue": (l) => e.accepts[o.name] = l,
                  required: o.required
                }, null, 8, jS), [
                  [fu, e.accepts[o.name]]
                ]),
                f("label", {
                  class: "form-check-label",
                  for: "accept_" + o.name,
                  innerHTML: e.getValueOrFunction(o.label)
                }, null, 8, VS)
              ])) : E("", !0)
            ]))), 128)),
            e.auth.panel == "registration" && e.settings.registration ? (g(), m("div", US, [
              e.settings.registration.help ? (g(), m("div", {
                key: 0,
                innerHTML: e.getValueOrFunction(e.settings.registration.help)
              }, null, 8, FS)) : E("", !0)
            ])) : E("", !0),
            f("div", HS, [
              e.auth.panel != "login" ? (g(), m("button", {
                key: 0,
                type: "button",
                onClick: t[10] || (t[10] = Lt((...o) => e.toggleClear && e.toggleClear(...o), ["stop"])),
                class: "btn btn-secondary w-100 me-2 text-nowrap"
              }, t[21] || (t[21] = [
                f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1),
                et(" Bejelentkezés ")
              ]))) : E("", !0),
              e.auth.panel == "login" ? (g(), m("button", {
                key: 1,
                type: "button",
                class: "btn btn-warning w-100 me-2 text-nowrap",
                onClick: t[11] || (t[11] = Lt((...o) => e.toggleNewRegistration && e.toggleNewRegistration(...o), ["stop"]))
              }, t[22] || (t[22] = [
                f("i", { class: "bi bi-person-plus mx-1" }, null, -1),
                et(" Regisztráció ")
              ]))) : E("", !0),
              f("button", {
                type: "submit",
                class: S(["btn w-100 text-nowrap", { "btn-primary": e.auth.panel != "registration", "btn-warning": e.auth.panel == "registration" }])
              }, [
                et(C(e.auth.panel == "forgot" ? "Új jelszó kérése" : e.auth.panel == "registration" ? "Regisztráció" : "Bejelentkezés") + " ", 1),
                e.auth.panel == "registration" ? (g(), m("i", zS)) : (g(), m("i", WS))
              ], 2)
            ]),
            e.responseMessage ? (g(), m("div", KS, [
              f("div", {
                class: S({ "text-danger": !e.responseOk, "text-success": e.responseOk }),
                innerHTML: e.responseMessage
              }, null, 10, GS)
            ])) : E("", !0),
            f("div", YS, [
              f("button", {
                type: "button",
                onClick: t[12] || (t[12] = Lt((...o) => e.close && e.close(...o), ["stop"])),
                class: "btn btn-light border w-100 me-1"
              }, t[23] || (t[23] = [
                f("i", { class: "bi bi-x-square mx-1" }, null, -1),
                et(" Mégsem ")
              ]))
            ])
          ], 32))
        ])
      ])
    ])
  ])) : E("", !0);
}
const ZS = /* @__PURE__ */ _e(GC, [["render", XS]]);
el();
const QS = {
  name: "VuUserButton",
  props: {
    modelValue: Object,
    panel: String
  },
  data() {
    return {
      auth: {},
      settings: {}
    };
  },
  watch: {
    modelValue(e, t) {
      e != t && (this.auth = e, this.$forceUpdate());
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
    getValueOrFunction(e, t) {
      return Vs(e, t, this.settings, this);
    },
    dropdownAction(e, t) {
      t && t.stopPropagation();
      let s = {
        dropdown: e,
        settings: this.settings
      };
      if (e.action) {
        e.action(s, this);
        return;
      }
    },
    updateAuth() {
      this.$emit("update:modelValue", this.auth);
    },
    togglePanel() {
      this.auth.visible = !this.auth.visible, this.auth.panel = this.panel ? this.panel : "login", this.updateAuth();
    },
    logout() {
      this.auth.visible = !1, this.auth.user = null, this.auth.header = null, this.auth.success = !1, localStorage.removeItem("vu-header"), localStorage.removeItem("vu-user"), this.updateAuth();
    }
  },
  created() {
    window.VuSettings && window.VuSettings.button && window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel]);
  },
  mounted() {
  }
}, JS = QS, tL = {
  key: 0,
  class: "vua-user-button d-inline-block"
}, eL = {
  key: 0,
  class: "dropdown"
}, sL = ["innerHTML"], nL = {
  class: "dropdown-menu dropdown-menu-end",
  "aria-labelledby": "userDropdown"
}, iL = ["onClick", "innerHTML"], rL = {
  key: 1,
  class: "d-inline-block"
}, oL = ["innerHTML"];
function aL(e, t, s, n, i, r) {
  return !e.auth.user && e.panel != "login" || e.panel == "login" ? (g(), m("div", tL, [
    e.auth.user ? (g(), m("div", eL, [
      f("button", {
        class: S(["dropdown-toggle", [e.settings.class]]),
        type: "button",
        id: "userDropdown",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }, [
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, sL)
      ], 2),
      f("ul", nL, [
        (g(!0), m(J, null, st(e.settings.dropdowns, (o) => (g(), m("li", {
          key: o,
          class: S([o.class]),
          onClick: (l) => e.dropdownAction(o),
          innerHTML: e.getValueOrFunction(o.label)
        }, null, 10, iL))), 128))
      ])
    ])) : (g(), m("div", rL, [
      f("button", {
        class: S([e.settings.class]),
        type: "button",
        onClick: t[0] || (t[0] = (...o) => e.togglePanel && e.togglePanel(...o))
      }, [
        e.settings.icon ? (g(), m("i", {
          key: 0,
          class: S([e.settings.icon])
        }, null, 2)) : E("", !0),
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, oL)
      ], 2)
    ]))
  ])) : E("", !0);
}
const lL = /* @__PURE__ */ _e(JS, [["render", aL]]), mL = {
  install(e) {
    e.component("VuAdmin", FC), e.component("VuAuth", ZS), e.component("VuUserButton", lL);
  }
};
export {
  FC as VuAdmin,
  ZS as VuAuth,
  lL as VuUserButton,
  mL as default
};
