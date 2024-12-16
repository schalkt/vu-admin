var xd = Object.defineProperty;
var $d = (e, t, s) => t in e ? xd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var F = (e, t, s) => $d(e, typeof t != "symbol" ? t + "" : t, s);
import { openBlock as g, createElementBlock as m, createElementVNode as f, toDisplayString as I, Fragment as tt, renderList as st, normalizeClass as S, createCommentVNode as T, createTextVNode as pt, resolveComponent as pe, withDirectives as at, vModelText as de, withKeys as ai, withModifiers as Lt, createVNode as _r, vModelSelect as ke, createBlock as ze, vModelDynamic as ge, vModelCheckbox as pu, vShow as Cs, normalizeStyle as Qn } from "vue";
var Bt = "top", Wt = "bottom", zt = "right", Pt = "left", Lr = "auto", xn = [Bt, Wt, zt, Pt], $s = "start", En = "end", gu = "clippingParents", Ba = "viewport", on = "popper", mu = "reference", la = /* @__PURE__ */ xn.reduce(function(e, t) {
  return e.concat([t + "-" + $s, t + "-" + En]);
}, []), Pa = /* @__PURE__ */ [].concat(xn, [Lr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + $s, t + "-" + En]);
}, []), bu = "beforeRead", yu = "read", vu = "afterRead", _u = "beforeMain", Eu = "main", wu = "afterMain", Tu = "beforeWrite", Au = "write", Ou = "afterWrite", Nu = [bu, yu, vu, _u, Eu, wu, Tu, Au, Ou];
function $e(e) {
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
function Va(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Kt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Md(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(s) {
    var n = t.styles[s] || {}, i = t.attributes[s] || {}, r = t.elements[s];
    !se(r) || !$e(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var a = i[o];
      a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function Rd(e) {
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
      var i = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : s[n]), a = o.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !se(i) || !$e(i) || (Object.assign(i.style, a), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const ja = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Md,
  effect: Rd,
  requires: ["computeStyles"]
};
function Ce(e) {
  return e.split("-")[0];
}
var xs = Math.max, Er = Math.min, wn = Math.round;
function ca() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ku() {
  return !/^((?!chrome|android).)*safari/i.test(ca());
}
function Tn(e, t, s) {
  t === void 0 && (t = !1), s === void 0 && (s = !1);
  var n = e.getBoundingClientRect(), i = 1, r = 1;
  t && se(e) && (i = e.offsetWidth > 0 && wn(n.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && wn(n.height) / e.offsetHeight || 1);
  var o = Ms(e) ? Kt(e) : window, a = o.visualViewport, l = !ku() && s, u = (n.left + (l && a ? a.offsetLeft : 0)) / i, d = (n.top + (l && a ? a.offsetTop : 0)) / r, h = n.width / i, b = n.height / r;
  return {
    width: h,
    height: b,
    top: d,
    right: u + h,
    bottom: d + b,
    left: u,
    x: u,
    y: d
  };
}
function Fa(e) {
  var t = Tn(e), s = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: s,
    height: n
  };
}
function Su(e, t) {
  var s = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (s && Va(s)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function Ye(e) {
  return Kt(e).getComputedStyle(e);
}
function Dd(e) {
  return ["table", "td", "th"].indexOf($e(e)) >= 0;
}
function gs(e) {
  return ((Ms(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ir(e) {
  return $e(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Va(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    gs(e)
  );
}
function Sl(e) {
  return !se(e) || // https://github.com/popperjs/popper-core/issues/837
  Ye(e).position === "fixed" ? null : e.offsetParent;
}
function qd(e) {
  var t = /firefox/i.test(ca()), s = /Trident/i.test(ca());
  if (s && se(e)) {
    var n = Ye(e);
    if (n.position === "fixed")
      return null;
  }
  var i = Ir(e);
  for (Va(i) && (i = i.host); se(i) && ["html", "body"].indexOf($e(i)) < 0; ) {
    var r = Ye(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function wi(e) {
  for (var t = Kt(e), s = Sl(e); s && Dd(s) && Ye(s).position === "static"; )
    s = Sl(s);
  return s && ($e(s) === "html" || $e(s) === "body" && Ye(s).position === "static") ? t : s || qd(e) || t;
}
function Ua(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function li(e, t, s) {
  return xs(e, Er(t, s));
}
function Bd(e, t, s) {
  var n = li(e, t, s);
  return n > s ? s : n;
}
function Cu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Lu(e) {
  return Object.assign({}, Cu(), e);
}
function Iu(e, t) {
  return t.reduce(function(s, n) {
    return s[n] = e, s;
  }, {});
}
var Pd = function(t, s) {
  return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
    placement: s.placement
  })) : t, Lu(typeof t != "number" ? t : Iu(t, xn));
};
function Vd(e) {
  var t, s = e.state, n = e.name, i = e.options, r = s.elements.arrow, o = s.modifiersData.popperOffsets, a = Ce(s.placement), l = Ua(a), u = [Pt, zt].indexOf(a) >= 0, d = u ? "height" : "width";
  if (!(!r || !o)) {
    var h = Pd(i.padding, s), b = Fa(r), y = l === "y" ? Bt : Pt, E = l === "y" ? Wt : zt, A = s.rects.reference[d] + s.rects.reference[l] - o[l] - s.rects.popper[d], O = o[l] - s.rects.reference[l], N = wi(r), M = N ? l === "y" ? N.clientHeight || 0 : N.clientWidth || 0 : 0, B = A / 2 - O / 2, P = h[y], V = M - b[d] - h[E], X = M / 2 - b[d] / 2 + B, nt = li(P, X, V), lt = l;
    s.modifiersData[n] = (t = {}, t[lt] = nt, t.centerOffset = nt - X, t);
  }
}
function jd(e) {
  var t = e.state, s = e.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Su(t.elements.popper, i) && (t.elements.arrow = i));
}
const xu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Vd,
  effect: jd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function An(e) {
  return e.split("-")[1];
}
var Fd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ud(e, t) {
  var s = e.x, n = e.y, i = t.devicePixelRatio || 1;
  return {
    x: wn(s * i) / i || 0,
    y: wn(n * i) / i || 0
  };
}
function Cl(e) {
  var t, s = e.popper, n = e.popperRect, i = e.placement, r = e.variation, o = e.offsets, a = e.position, l = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, h = e.isFixed, b = o.x, y = b === void 0 ? 0 : b, E = o.y, A = E === void 0 ? 0 : E, O = typeof d == "function" ? d({
    x: y,
    y: A
  }) : {
    x: y,
    y: A
  };
  y = O.x, A = O.y;
  var N = o.hasOwnProperty("x"), M = o.hasOwnProperty("y"), B = Pt, P = Bt, V = window;
  if (u) {
    var X = wi(s), nt = "clientHeight", lt = "clientWidth";
    if (X === Kt(s) && (X = gs(s), Ye(X).position !== "static" && a === "absolute" && (nt = "scrollHeight", lt = "scrollWidth")), X = X, i === Bt || (i === Pt || i === zt) && r === En) {
      P = Wt;
      var vt = h && X === V && V.visualViewport ? V.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        X[nt]
      );
      A -= vt - n.height, A *= l ? 1 : -1;
    }
    if (i === Pt || (i === Bt || i === Wt) && r === En) {
      B = zt;
      var ht = h && X === V && V.visualViewport ? V.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        X[lt]
      );
      y -= ht - n.width, y *= l ? 1 : -1;
    }
  }
  var v = Object.assign({
    position: a
  }, u && Fd), x = d === !0 ? Ud({
    x: y,
    y: A
  }, Kt(s)) : {
    x: y,
    y: A
  };
  if (y = x.x, A = x.y, l) {
    var w;
    return Object.assign({}, v, (w = {}, w[P] = M ? "0" : "", w[B] = N ? "0" : "", w.transform = (V.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + A + "px)" : "translate3d(" + y + "px, " + A + "px, 0)", w));
  }
  return Object.assign({}, v, (t = {}, t[P] = M ? A + "px" : "", t[B] = N ? y + "px" : "", t.transform = "", t));
}
function Hd(e) {
  var t = e.state, s = e.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, o = r === void 0 ? !0 : r, a = s.roundOffsets, l = a === void 0 ? !0 : a, u = {
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
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Cl(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Ha = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Hd,
  data: {}
};
var Zi = {
  passive: !0
};
function Wd(e) {
  var t = e.state, s = e.instance, n = e.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, a = o === void 0 ? !0 : o, l = Kt(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && u.forEach(function(d) {
    d.addEventListener("scroll", s.update, Zi);
  }), a && l.addEventListener("resize", s.update, Zi), function() {
    r && u.forEach(function(d) {
      d.removeEventListener("scroll", s.update, Zi);
    }), a && l.removeEventListener("resize", s.update, Zi);
  };
}
const Wa = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Wd,
  data: {}
};
var zd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function pr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return zd[t];
  });
}
var Kd = {
  start: "end",
  end: "start"
};
function Ll(e) {
  return e.replace(/start|end/g, function(t) {
    return Kd[t];
  });
}
function za(e) {
  var t = Kt(e), s = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function Ka(e) {
  return Tn(gs(e)).left + za(e).scrollLeft;
}
function Gd(e, t) {
  var s = Kt(e), n = gs(e), i = s.visualViewport, r = n.clientWidth, o = n.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, o = i.height;
    var u = ku();
    (u || !u && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a + Ka(e),
    y: l
  };
}
function Yd(e) {
  var t, s = gs(e), n = za(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = xs(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = xs(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -n.scrollLeft + Ka(e), l = -n.scrollTop;
  return Ye(i || s).direction === "rtl" && (a += xs(s.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: a,
    y: l
  };
}
function Ga(e) {
  var t = Ye(e), s = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(s + i + n);
}
function $u(e) {
  return ["html", "body", "#document"].indexOf($e(e)) >= 0 ? e.ownerDocument.body : se(e) && Ga(e) ? e : $u(Ir(e));
}
function ci(e, t) {
  var s;
  t === void 0 && (t = []);
  var n = $u(e), i = n === ((s = e.ownerDocument) == null ? void 0 : s.body), r = Kt(n), o = i ? [r].concat(r.visualViewport || [], Ga(n) ? n : []) : n, a = t.concat(o);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(ci(Ir(o)))
  );
}
function ua(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Xd(e, t) {
  var s = Tn(e, !1, t === "fixed");
  return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s;
}
function Il(e, t, s) {
  return t === Ba ? ua(Gd(e, s)) : Ms(t) ? Xd(t, s) : ua(Yd(gs(e)));
}
function Zd(e) {
  var t = ci(Ir(e)), s = ["absolute", "fixed"].indexOf(Ye(e).position) >= 0, n = s && se(e) ? wi(e) : e;
  return Ms(n) ? t.filter(function(i) {
    return Ms(i) && Su(i, n) && $e(i) !== "body";
  }) : [];
}
function Qd(e, t, s, n) {
  var i = t === "clippingParents" ? Zd(e) : [].concat(t), r = [].concat(i, [s]), o = r[0], a = r.reduce(function(l, u) {
    var d = Il(e, u, n);
    return l.top = xs(d.top, l.top), l.right = Er(d.right, l.right), l.bottom = Er(d.bottom, l.bottom), l.left = xs(d.left, l.left), l;
  }, Il(e, o, n));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Mu(e) {
  var t = e.reference, s = e.element, n = e.placement, i = n ? Ce(n) : null, r = n ? An(n) : null, o = t.x + t.width / 2 - s.width / 2, a = t.y + t.height / 2 - s.height / 2, l;
  switch (i) {
    case Bt:
      l = {
        x: o,
        y: t.y - s.height
      };
      break;
    case Wt:
      l = {
        x: o,
        y: t.y + t.height
      };
      break;
    case zt:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Pt:
      l = {
        x: t.x - s.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var u = i ? Ua(i) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (r) {
      case $s:
        l[u] = l[u] - (t[d] / 2 - s[d] / 2);
        break;
      case En:
        l[u] = l[u] + (t[d] / 2 - s[d] / 2);
        break;
    }
  }
  return l;
}
function On(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = n === void 0 ? e.placement : n, r = s.strategy, o = r === void 0 ? e.strategy : r, a = s.boundary, l = a === void 0 ? gu : a, u = s.rootBoundary, d = u === void 0 ? Ba : u, h = s.elementContext, b = h === void 0 ? on : h, y = s.altBoundary, E = y === void 0 ? !1 : y, A = s.padding, O = A === void 0 ? 0 : A, N = Lu(typeof O != "number" ? O : Iu(O, xn)), M = b === on ? mu : on, B = e.rects.popper, P = e.elements[E ? M : b], V = Qd(Ms(P) ? P : P.contextElement || gs(e.elements.popper), l, d, o), X = Tn(e.elements.reference), nt = Mu({
    reference: X,
    element: B,
    strategy: "absolute",
    placement: i
  }), lt = ua(Object.assign({}, B, nt)), vt = b === on ? lt : X, ht = {
    top: V.top - vt.top + N.top,
    bottom: vt.bottom - V.bottom + N.bottom,
    left: V.left - vt.left + N.left,
    right: vt.right - V.right + N.right
  }, v = e.modifiersData.offset;
  if (b === on && v) {
    var x = v[i];
    Object.keys(ht).forEach(function(w) {
      var q = [zt, Wt].indexOf(w) >= 0 ? 1 : -1, D = [Bt, Wt].indexOf(w) >= 0 ? "y" : "x";
      ht[w] += x[D] * q;
    });
  }
  return ht;
}
function Jd(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = s.boundary, r = s.rootBoundary, o = s.padding, a = s.flipVariations, l = s.allowedAutoPlacements, u = l === void 0 ? Pa : l, d = An(n), h = d ? a ? la : la.filter(function(E) {
    return An(E) === d;
  }) : xn, b = h.filter(function(E) {
    return u.indexOf(E) >= 0;
  });
  b.length === 0 && (b = h);
  var y = b.reduce(function(E, A) {
    return E[A] = On(e, {
      placement: A,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[Ce(A)], E;
  }, {});
  return Object.keys(y).sort(function(E, A) {
    return y[E] - y[A];
  });
}
function tf(e) {
  if (Ce(e) === Lr)
    return [];
  var t = pr(e);
  return [Ll(e), t, Ll(t)];
}
function ef(e) {
  var t = e.state, s = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, a = o === void 0 ? !0 : o, l = s.fallbackPlacements, u = s.padding, d = s.boundary, h = s.rootBoundary, b = s.altBoundary, y = s.flipVariations, E = y === void 0 ? !0 : y, A = s.allowedAutoPlacements, O = t.options.placement, N = Ce(O), M = N === O, B = l || (M || !E ? [pr(O)] : tf(O)), P = [O].concat(B).reduce(function(it, z) {
      return it.concat(Ce(z) === Lr ? Jd(t, {
        placement: z,
        boundary: d,
        rootBoundary: h,
        padding: u,
        flipVariations: E,
        allowedAutoPlacements: A
      }) : z);
    }, []), V = t.rects.reference, X = t.rects.popper, nt = /* @__PURE__ */ new Map(), lt = !0, vt = P[0], ht = 0; ht < P.length; ht++) {
      var v = P[ht], x = Ce(v), w = An(v) === $s, q = [Bt, Wt].indexOf(x) >= 0, D = q ? "width" : "height", C = On(t, {
        placement: v,
        boundary: d,
        rootBoundary: h,
        altBoundary: b,
        padding: u
      }), R = q ? w ? zt : Pt : w ? Wt : Bt;
      V[D] > X[D] && (R = pr(R));
      var U = pr(R), W = [];
      if (r && W.push(C[x] <= 0), a && W.push(C[R] <= 0, C[U] <= 0), W.every(function(it) {
        return it;
      })) {
        vt = v, lt = !1;
        break;
      }
      nt.set(v, W);
    }
    if (lt)
      for (var j = E ? 3 : 1, et = function(z) {
        var mt = P.find(function(Et) {
          var J = nt.get(Et);
          if (J)
            return J.slice(0, z).every(function(ct) {
              return ct;
            });
        });
        if (mt)
          return vt = mt, "break";
      }, Q = j; Q > 0; Q--) {
        var ot = et(Q);
        if (ot === "break") break;
      }
    t.placement !== vt && (t.modifiersData[n]._skip = !0, t.placement = vt, t.reset = !0);
  }
}
const Ru = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ef,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function xl(e, t, s) {
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
function $l(e) {
  return [Bt, zt, Wt, Pt].some(function(t) {
    return e[t] >= 0;
  });
}
function sf(e) {
  var t = e.state, s = e.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = On(t, {
    elementContext: "reference"
  }), a = On(t, {
    altBoundary: !0
  }), l = xl(o, n), u = xl(a, i, r), d = $l(l), h = $l(u);
  t.modifiersData[s] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": h
  });
}
const Du = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: sf
};
function nf(e, t, s) {
  var n = Ce(e), i = [Pt, Bt].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, t, {
    placement: e
  })) : s, o = r[0], a = r[1];
  return o = o || 0, a = (a || 0) * i, [Pt, zt].indexOf(n) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function rf(e) {
  var t = e.state, s = e.options, n = e.name, i = s.offset, r = i === void 0 ? [0, 0] : i, o = Pa.reduce(function(d, h) {
    return d[h] = nf(h, t.rects, r), d;
  }, {}), a = o[t.placement], l = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = o;
}
const qu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: rf
};
function of(e) {
  var t = e.state, s = e.name;
  t.modifiersData[s] = Mu({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ya = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: of,
  data: {}
};
function af(e) {
  return e === "x" ? "y" : "x";
}
function lf(e) {
  var t = e.state, s = e.options, n = e.name, i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, a = o === void 0 ? !1 : o, l = s.boundary, u = s.rootBoundary, d = s.altBoundary, h = s.padding, b = s.tether, y = b === void 0 ? !0 : b, E = s.tetherOffset, A = E === void 0 ? 0 : E, O = On(t, {
    boundary: l,
    rootBoundary: u,
    padding: h,
    altBoundary: d
  }), N = Ce(t.placement), M = An(t.placement), B = !M, P = Ua(N), V = af(P), X = t.modifiersData.popperOffsets, nt = t.rects.reference, lt = t.rects.popper, vt = typeof A == "function" ? A(Object.assign({}, t.rects, {
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
      var w, q = P === "y" ? Bt : Pt, D = P === "y" ? Wt : zt, C = P === "y" ? "height" : "width", R = X[P], U = R + O[q], W = R - O[D], j = y ? -lt[C] / 2 : 0, et = M === $s ? nt[C] : lt[C], Q = M === $s ? -lt[C] : -nt[C], ot = t.elements.arrow, it = y && ot ? Fa(ot) : {
        width: 0,
        height: 0
      }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Cu(), mt = z[q], Et = z[D], J = li(0, nt[C], it[C]), ct = B ? nt[C] / 2 - j - J - mt - ht.mainAxis : et - J - mt - ht.mainAxis, dt = B ? -nt[C] / 2 + j + J + Et + ht.mainAxis : Q + J + Et + ht.mainAxis, ut = t.elements.arrow && wi(t.elements.arrow), bt = ut ? P === "y" ? ut.clientTop || 0 : ut.clientLeft || 0 : 0, yt = (w = v == null ? void 0 : v[P]) != null ? w : 0, At = R + ct - yt - bt, kt = R + dt - yt, ss = li(y ? Er(U, At) : U, R, y ? xs(W, kt) : W);
      X[P] = ss, x[P] = ss - R;
    }
    if (a) {
      var _s, Dn = P === "x" ? Bt : Pt, qn = P === "x" ? Wt : zt, Vt = X[V], we = V === "y" ? "height" : "width", Es = Vt + O[Dn], ws = Vt - O[qn], jt = [Bt, Pt].indexOf(N) !== -1, qe = (_s = v == null ? void 0 : v[V]) != null ? _s : 0, Gs = jt ? Es : Vt - nt[we] - lt[we] - qe + ht.altAxis, Te = jt ? Vt + nt[we] + lt[we] - qe - ht.altAxis : ws, Be = y && jt ? Bd(Gs, Vt, Te) : li(y ? Gs : Es, Vt, y ? Te : ws);
      X[V] = Be, x[V] = Be - Vt;
    }
    t.modifiersData[n] = x;
  }
}
const Bu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: lf,
  requiresIfExists: ["offset"]
};
function cf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function uf(e) {
  return e === Kt(e) || !se(e) ? za(e) : cf(e);
}
function hf(e) {
  var t = e.getBoundingClientRect(), s = wn(t.width) / e.offsetWidth || 1, n = wn(t.height) / e.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function df(e, t, s) {
  s === void 0 && (s = !1);
  var n = se(t), i = se(t) && hf(t), r = gs(t), o = Tn(e, i, s), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && (($e(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ga(r)) && (a = uf(t)), se(t) ? (l = Tn(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : r && (l.x = Ka(r))), {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function ff(e) {
  var t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    s.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(a) {
      if (!s.has(a)) {
        var l = t.get(a);
        l && i(l);
      }
    }), n.push(r);
  }
  return e.forEach(function(r) {
    s.has(r.name) || i(r);
  }), n;
}
function pf(e) {
  var t = ff(e);
  return Nu.reduce(function(s, n) {
    return s.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function gf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(s) {
      Promise.resolve().then(function() {
        t = void 0, s(e());
      });
    })), t;
  };
}
function mf(e) {
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
var Ml = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Rl() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function xr(e) {
  e === void 0 && (e = {});
  var t = e, s = t.defaultModifiers, n = s === void 0 ? [] : s, i = t.defaultOptions, r = i === void 0 ? Ml : i;
  return function(a, l, u) {
    u === void 0 && (u = r);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ml, r),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, h = [], b = !1, y = {
      state: d,
      setOptions: function(N) {
        var M = typeof N == "function" ? N(d.options) : N;
        A(), d.options = Object.assign({}, r, d.options, M), d.scrollParents = {
          reference: Ms(a) ? ci(a) : a.contextElement ? ci(a.contextElement) : [],
          popper: ci(l)
        };
        var B = pf(mf([].concat(n, d.options.modifiers)));
        return d.orderedModifiers = B.filter(function(P) {
          return P.enabled;
        }), E(), y.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var N = d.elements, M = N.reference, B = N.popper;
          if (Rl(M, B)) {
            d.rects = {
              reference: df(M, wi(B), d.options.strategy === "fixed"),
              popper: Fa(B)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(ht) {
              return d.modifiersData[ht.name] = Object.assign({}, ht.data);
            });
            for (var P = 0; P < d.orderedModifiers.length; P++) {
              if (d.reset === !0) {
                d.reset = !1, P = -1;
                continue;
              }
              var V = d.orderedModifiers[P], X = V.fn, nt = V.options, lt = nt === void 0 ? {} : nt, vt = V.name;
              typeof X == "function" && (d = X({
                state: d,
                options: lt,
                name: vt,
                instance: y
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: gf(function() {
        return new Promise(function(O) {
          y.forceUpdate(), O(d);
        });
      }),
      destroy: function() {
        A(), b = !0;
      }
    };
    if (!Rl(a, l))
      return y;
    y.setOptions(u).then(function(O) {
      !b && u.onFirstUpdate && u.onFirstUpdate(O);
    });
    function E() {
      d.orderedModifiers.forEach(function(O) {
        var N = O.name, M = O.options, B = M === void 0 ? {} : M, P = O.effect;
        if (typeof P == "function") {
          var V = P({
            state: d,
            name: N,
            instance: y,
            options: B
          }), X = function() {
          };
          h.push(V || X);
        }
      });
    }
    function A() {
      h.forEach(function(O) {
        return O();
      }), h = [];
    }
    return y;
  };
}
var bf = /* @__PURE__ */ xr(), yf = [Wa, Ya, Ha, ja], vf = /* @__PURE__ */ xr({
  defaultModifiers: yf
}), _f = [Wa, Ya, Ha, ja, qu, Ru, Bu, xu, Du], Xa = /* @__PURE__ */ xr({
  defaultModifiers: _f
});
const Pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: wu,
  afterRead: vu,
  afterWrite: Ou,
  applyStyles: ja,
  arrow: xu,
  auto: Lr,
  basePlacements: xn,
  beforeMain: _u,
  beforeRead: bu,
  beforeWrite: Tu,
  bottom: Wt,
  clippingParents: gu,
  computeStyles: Ha,
  createPopper: Xa,
  createPopperBase: bf,
  createPopperLite: vf,
  detectOverflow: On,
  end: En,
  eventListeners: Wa,
  flip: Ru,
  hide: Du,
  left: Pt,
  main: Eu,
  modifierPhases: Nu,
  offset: qu,
  placements: Pa,
  popper: on,
  popperGenerator: xr,
  popperOffsets: Ya,
  preventOverflow: Bu,
  read: yu,
  reference: mu,
  right: zt,
  start: $s,
  top: Bt,
  variationPlacements: la,
  viewport: Ba,
  write: Au
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const rs = /* @__PURE__ */ new Map(), $o = {
  set(e, t, s) {
    rs.has(e) || rs.set(e, /* @__PURE__ */ new Map());
    const n = rs.get(e);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, s);
  },
  get(e, t) {
    return rs.has(e) && rs.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!rs.has(e))
      return;
    const s = rs.get(e);
    s.delete(t), s.size === 0 && rs.delete(e);
  }
}, Ef = 1e6, wf = 1e3, ha = "transitionend", Vu = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, s) => `#${CSS.escape(s)}`)), e), Tf = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), Af = (e) => {
  do
    e += Math.floor(Math.random() * Ef);
  while (document.getElementById(e));
  return e;
}, Of = (e) => {
  if (!e)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: s
  } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), i = Number.parseFloat(s);
  return !n && !i ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * wf);
}, ju = (e) => {
  e.dispatchEvent(new Event(ha));
}, Ke = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), hs = (e) => Ke(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(Vu(e)) : null, $n = (e) => {
  if (!Ke(e) || e.getClientRects().length === 0)
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
}, ds = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Fu = (e) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof e.getRootNode == "function") {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return e instanceof ShadowRoot ? e : e.parentNode ? Fu(e.parentNode) : null;
}, wr = () => {
}, Ti = (e) => {
  e.offsetHeight;
}, Uu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Mo = [], Nf = (e) => {
  document.readyState === "loading" ? (Mo.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Mo)
      t();
  }), Mo.push(e)) : e();
}, ne = () => document.documentElement.dir === "rtl", re = (e) => {
  Nf(() => {
    const t = Uu();
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
  const i = Of(t) + 5;
  let r = !1;
  const o = ({
    target: a
  }) => {
    a === t && (r = !0, t.removeEventListener(ha, o), Ht(e));
  };
  t.addEventListener(ha, o), setTimeout(() => {
    r || ju(t);
  }, i);
}, Za = (e, t, s, n) => {
  const i = e.length;
  let r = e.indexOf(t);
  return r === -1 ? !s && n ? e[i - 1] : e[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), e[Math.max(0, Math.min(r, i - 1))]);
}, kf = /[^.]*(?=\..*)\.|.*/, Sf = /\..*/, Cf = /::\d+$/, Ro = {};
let Dl = 1;
const Wu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Lf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function zu(e, t) {
  return t && `${t}::${Dl++}` || e.uidEvent || Dl++;
}
function Ku(e) {
  const t = zu(e);
  return e.uidEvent = t, Ro[t] = Ro[t] || {}, Ro[t];
}
function If(e, t) {
  return function s(n) {
    return Qa(n, {
      delegateTarget: e
    }), s.oneOff && $.off(e, n.type, t), t.apply(e, [n]);
  };
}
function xf(e, t, s) {
  return function n(i) {
    const r = e.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const a of r)
        if (a === o)
          return Qa(i, {
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
  return Lf.has(r) || (r = e), [n, i, r];
}
function ql(e, t, s, n, i) {
  if (typeof t != "string" || !e)
    return;
  let [r, o, a] = Yu(t, s, n);
  t in Wu && (o = ((E) => function(A) {
    if (!A.relatedTarget || A.relatedTarget !== A.delegateTarget && !A.delegateTarget.contains(A.relatedTarget))
      return E.call(this, A);
  })(o));
  const l = Ku(e), u = l[a] || (l[a] = {}), d = Gu(u, o, r ? s : null);
  if (d) {
    d.oneOff = d.oneOff && i;
    return;
  }
  const h = zu(o, t.replace(kf, "")), b = r ? xf(e, s, o) : If(e, o);
  b.delegationSelector = r ? s : null, b.callable = o, b.oneOff = i, b.uidEvent = h, u[h] = b, e.addEventListener(a, b, r);
}
function da(e, t, s, n, i) {
  const r = Gu(t[s], n, i);
  r && (e.removeEventListener(s, r, !!i), delete t[s][r.uidEvent]);
}
function $f(e, t, s, n) {
  const i = t[s] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && da(e, t, s, o.callable, o.delegationSelector);
}
function Xu(e) {
  return e = e.replace(Sf, ""), Wu[e] || e;
}
const $ = {
  on(e, t, s, n) {
    ql(e, t, s, n, !1);
  },
  one(e, t, s, n) {
    ql(e, t, s, n, !0);
  },
  off(e, t, s, n) {
    if (typeof t != "string" || !e)
      return;
    const [i, r, o] = Yu(t, s, n), a = o !== t, l = Ku(e), u = l[o] || {}, d = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(u).length)
        return;
      da(e, l, o, r, i ? s : null);
      return;
    }
    if (d)
      for (const h of Object.keys(l))
        $f(e, l, h, t.slice(1));
    for (const [h, b] of Object.entries(u)) {
      const y = h.replace(Cf, "");
      (!a || t.includes(y)) && da(e, l, o, b.callable, b.delegationSelector);
    }
  },
  trigger(e, t, s) {
    if (typeof t != "string" || !e)
      return null;
    const n = Uu(), i = Xu(t), r = t !== i;
    let o = null, a = !0, l = !0, u = !1;
    r && n && (o = n.Event(t, s), n(e).trigger(o), a = !o.isPropagationStopped(), l = !o.isImmediatePropagationStopped(), u = o.isDefaultPrevented());
    const d = Qa(new Event(t, {
      bubbles: a,
      cancelable: !0
    }), s);
    return u && d.preventDefault(), l && e.dispatchEvent(d), d.defaultPrevented && o && o.preventDefault(), d;
  }
};
function Qa(e, t = {}) {
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
function Bl(e) {
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
function Do(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Ge = {
  setDataAttribute(e, t, s) {
    e.setAttribute(`data-bs-${Do(t)}`, s);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Do(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, s = Object.keys(e.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of s) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Bl(e.dataset[n]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Bl(e.getAttribute(`data-bs-${Do(t)}`));
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
    const n = Ke(s) ? Ge.getDataAttribute(s, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...Ke(s) ? Ge.getDataAttributes(s) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, s = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(s)) {
      const r = t[n], o = Ke(r) ? "element" : Tf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Mf = "5.3.3";
class ye extends Ai {
  constructor(t, s) {
    super(), t = hs(t), t && (this._element = t, this._config = this._getConfig(s), $o.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    $o.remove(this._element, this.constructor.DATA_KEY), $.off(this._element, this.constructor.EVENT_KEY);
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
    return $o.get(hs(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, s = {}) {
    return this.getInstance(t) || new this(t, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return Mf;
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
const qo = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let s = e.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), t = s && s !== "#" ? s.trim() : null;
  }
  return t ? t.split(",").map((s) => Vu(s)).join(",") : null;
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
    return this.find(t, e).filter((s) => !ds(s) && $n(s));
  },
  getSelectorFromElement(e) {
    const t = qo(e);
    return t && Z.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = qo(e);
    return t ? Z.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = qo(e);
    return t ? Z.find(t) : [];
  }
}, $r = (e, t = "hide") => {
  const s = `click.dismiss${e.EVENT_KEY}`, n = e.NAME;
  $.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), ds(this))
      return;
    const r = Z.getElementFromSelector(this) || this.closest(`.${n}`);
    e.getOrCreateInstance(r)[t]();
  });
}, Rf = "alert", Df = "bs.alert", Zu = `.${Df}`, qf = `close${Zu}`, Bf = `closed${Zu}`, Pf = "fade", Vf = "show";
class Mr extends ye {
  // Getters
  static get NAME() {
    return Rf;
  }
  // Public
  close() {
    if ($.trigger(this._element, qf).defaultPrevented)
      return;
    this._element.classList.remove(Vf);
    const s = this._element.classList.contains(Pf);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), $.trigger(this._element, Bf), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Mr.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
$r(Mr, "close");
re(Mr);
const jf = "button", Ff = "bs.button", Uf = `.${Ff}`, Hf = ".data-api", Wf = "active", Pl = '[data-bs-toggle="button"]', zf = `click${Uf}${Hf}`;
class Rr extends ye {
  // Getters
  static get NAME() {
    return jf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Wf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Rr.getOrCreateInstance(this);
      t === "toggle" && s[t]();
    });
  }
}
$.on(document, zf, Pl, (e) => {
  e.preventDefault();
  const t = e.target.closest(Pl);
  Rr.getOrCreateInstance(t).toggle();
});
re(Rr);
const Kf = "swipe", Mn = ".bs.swipe", Gf = `touchstart${Mn}`, Yf = `touchmove${Mn}`, Xf = `touchend${Mn}`, Zf = `pointerdown${Mn}`, Qf = `pointerup${Mn}`, Jf = "touch", tp = "pen", ep = "pointer-event", sp = 40, np = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, ip = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class Tr extends Ai {
  constructor(t, s) {
    super(), this._element = t, !(!t || !Tr.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return np;
  }
  static get DefaultType() {
    return ip;
  }
  static get NAME() {
    return Kf;
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
    if (t <= sp)
      return;
    const s = t / this._deltaX;
    this._deltaX = 0, s && Ht(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? ($.on(this._element, Zf, (t) => this._start(t)), $.on(this._element, Qf, (t) => this._end(t)), this._element.classList.add(ep)) : ($.on(this._element, Gf, (t) => this._start(t)), $.on(this._element, Yf, (t) => this._move(t)), $.on(this._element, Xf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === tp || t.pointerType === Jf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const rp = "carousel", op = "bs.carousel", ms = `.${op}`, Qu = ".data-api", ap = "ArrowLeft", lp = "ArrowRight", cp = 500, Jn = "next", nn = "prev", an = "left", gr = "right", up = `slide${ms}`, Bo = `slid${ms}`, hp = `keydown${ms}`, dp = `mouseenter${ms}`, fp = `mouseleave${ms}`, pp = `dragstart${ms}`, gp = `load${ms}${Qu}`, mp = `click${ms}${Qu}`, Ju = "carousel", Qi = "active", bp = "slide", yp = "carousel-item-end", vp = "carousel-item-start", _p = "carousel-item-next", Ep = "carousel-item-prev", th = ".active", eh = ".carousel-item", wp = th + eh, Tp = ".carousel-item img", Ap = ".carousel-indicators", Op = "[data-bs-slide], [data-bs-slide-to]", Np = '[data-bs-ride="carousel"]', kp = {
  [ap]: gr,
  [lp]: an
}, Sp = {
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
class Oi extends ye {
  constructor(t, s) {
    super(t, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = Z.findOne(Ap, this._element), this._addEventListeners(), this._config.ride === Ju && this.cycle();
  }
  // Getters
  static get Default() {
    return Sp;
  }
  static get DefaultType() {
    return Cp;
  }
  static get NAME() {
    return rp;
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
    this._isSliding && ju(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        $.one(this._element, Bo, () => this.cycle());
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
      $.one(this._element, Bo, () => this.to(t));
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
    this._config.keyboard && $.on(this._element, hp, (t) => this._keydown(t)), this._config.pause === "hover" && ($.on(this._element, dp, () => this.pause()), $.on(this._element, fp, () => this._maybeEnableCycle())), this._config.touch && Tr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of Z.find(Tp, this._element))
      $.on(n, pp, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(an)),
      rightCallback: () => this._slide(this._directionToOrder(gr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), cp + this._config.interval));
      }
    };
    this._swipeHelper = new Tr(this._element, s);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const s = kp[t.key];
    s && (t.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const s = Z.findOne(th, this._indicatorsElement);
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
    const n = this._getActive(), i = t === Jn, r = s || Za(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), a = (y) => $.trigger(this._element, y, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (a(up).defaultPrevented || !n || !r)
      return;
    const u = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const d = i ? vp : yp, h = i ? _p : Ep;
    r.classList.add(h), Ti(r), n.classList.add(d), r.classList.add(d);
    const b = () => {
      r.classList.remove(d, h), r.classList.add(Qi), n.classList.remove(Qi, h, d), this._isSliding = !1, a(Bo);
    };
    this._queueCallback(b, n, this._isAnimated()), u && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(bp);
  }
  _getActive() {
    return Z.findOne(wp, this._element);
  }
  _getItems() {
    return Z.find(eh, this._element);
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
$.on(document, mp, Op, function(e) {
  const t = Z.getElementFromSelector(this);
  if (!t || !t.classList.contains(Ju))
    return;
  e.preventDefault();
  const s = Oi.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n), s._maybeEnableCycle();
    return;
  }
  if (Ge.getDataAttribute(this, "slide") === "next") {
    s.next(), s._maybeEnableCycle();
    return;
  }
  s.prev(), s._maybeEnableCycle();
});
$.on(window, gp, () => {
  const e = Z.find(Np);
  for (const t of e)
    Oi.getOrCreateInstance(t);
});
re(Oi);
const Lp = "collapse", Ip = "bs.collapse", Ni = `.${Ip}`, xp = ".data-api", $p = `show${Ni}`, Mp = `shown${Ni}`, Rp = `hide${Ni}`, Dp = `hidden${Ni}`, qp = `click${Ni}${xp}`, Po = "show", gn = "collapse", Ji = "collapsing", Bp = "collapsed", Pp = `:scope .${gn} .${gn}`, Vp = "collapse-horizontal", jp = "width", Fp = "height", Up = ".collapse.show, .collapse.collapsing", fa = '[data-bs-toggle="collapse"]', Hp = {
  parent: null,
  toggle: !0
}, Wp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class pi extends ye {
  constructor(t, s) {
    super(t, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = Z.find(fa);
    for (const i of n) {
      const r = Z.getSelectorFromElement(i), o = Z.find(r).filter((a) => a === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Hp;
  }
  static get DefaultType() {
    return Wp;
  }
  static get NAME() {
    return Lp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(Up).filter((a) => a !== this._element).map((a) => pi.getOrCreateInstance(a, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || $.trigger(this._element, $p).defaultPrevented)
      return;
    for (const a of t)
      a.hide();
    const n = this._getDimension();
    this._element.classList.remove(gn), this._element.classList.add(Ji), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ji), this._element.classList.add(gn, Po), this._element.style[n] = "", $.trigger(this._element, Mp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || $.trigger(this._element, Rp).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, Ti(this._element), this._element.classList.add(Ji), this._element.classList.remove(gn, Po);
    for (const i of this._triggerArray) {
      const r = Z.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ji), this._element.classList.add(gn), $.trigger(this._element, Dp);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Po);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = hs(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(Vp) ? jp : Fp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(fa);
    for (const s of t) {
      const n = Z.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const s = Z.find(Pp, this._config.parent);
    return Z.find(t, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(t, s) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(Bp, !s), n.setAttribute("aria-expanded", s);
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
$.on(document, qp, fa, function(e) {
  (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
  for (const t of Z.getMultipleElementsFromSelector(this))
    pi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
re(pi);
const Vl = "dropdown", zp = "bs.dropdown", Ps = `.${zp}`, Ja = ".data-api", Kp = "Escape", jl = "Tab", Gp = "ArrowUp", Fl = "ArrowDown", Yp = 2, Xp = `hide${Ps}`, Zp = `hidden${Ps}`, Qp = `show${Ps}`, Jp = `shown${Ps}`, sh = `click${Ps}${Ja}`, nh = `keydown${Ps}${Ja}`, tg = `keyup${Ps}${Ja}`, ln = "show", eg = "dropup", sg = "dropend", ng = "dropstart", ig = "dropup-center", rg = "dropdown-center", Ls = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', og = `${Ls}.${ln}`, mr = ".dropdown-menu", ag = ".navbar", lg = ".navbar-nav", cg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", ug = ne() ? "top-end" : "top-start", hg = ne() ? "top-start" : "top-end", dg = ne() ? "bottom-end" : "bottom-start", fg = ne() ? "bottom-start" : "bottom-end", pg = ne() ? "left-start" : "right-start", gg = ne() ? "right-start" : "left-start", mg = "top", bg = "bottom", yg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, vg = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Le extends ye {
  constructor(t, s) {
    super(t, s), this._popper = null, this._parent = this._element.parentNode, this._menu = Z.next(this._element, mr)[0] || Z.prev(this._element, mr)[0] || Z.findOne(mr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return yg;
  }
  static get DefaultType() {
    return vg;
  }
  static get NAME() {
    return Vl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (ds(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!$.trigger(this._element, Qp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(lg))
        for (const n of [].concat(...document.body.children))
          $.on(n, "mouseover", wr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ln), this._element.classList.add(ln), $.trigger(this._element, Jp, t);
    }
  }
  hide() {
    if (ds(this._element) || !this._isShown())
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
    if (!$.trigger(this._element, Xp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          $.off(n, "mouseover", wr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ln), this._element.classList.remove(ln), this._element.setAttribute("aria-expanded", "false"), Ge.removeDataAttribute(this._menu, "popper"), $.trigger(this._element, Zp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !Ke(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Vl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Pu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : Ke(this._config.reference) ? t = hs(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = Xa(t, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(ln);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(sg))
      return pg;
    if (t.classList.contains(ng))
      return gg;
    if (t.classList.contains(ig))
      return mg;
    if (t.classList.contains(rg))
      return bg;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(eg) ? s ? hg : ug : s ? fg : dg;
  }
  _detectNavbar() {
    return this._element.closest(ag) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (Ge.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
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
    const n = Z.find(cg, this._menu).filter((i) => $n(i));
    n.length && Za(n, s, t === Fl, !n.includes(s)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Le.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Yp || t.type === "keyup" && t.key !== jl)
      return;
    const s = Z.find(og);
    for (const n of s) {
      const i = Le.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === jl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const a = {
        relatedTarget: i._element
      };
      t.type === "click" && (a.clickEvent = t), i._completeHide(a);
    }
  }
  static dataApiKeydownHandler(t) {
    const s = /input|textarea/i.test(t.target.tagName), n = t.key === Kp, i = [Gp, Fl].includes(t.key);
    if (!i && !n || s && !n)
      return;
    t.preventDefault();
    const r = this.matches(Ls) ? this : Z.prev(this, Ls)[0] || Z.next(this, Ls)[0] || Z.findOne(Ls, t.delegateTarget.parentNode), o = Le.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
$.on(document, nh, Ls, Le.dataApiKeydownHandler);
$.on(document, nh, mr, Le.dataApiKeydownHandler);
$.on(document, sh, Le.clearMenus);
$.on(document, tg, Le.clearMenus);
$.on(document, sh, Ls, function(e) {
  e.preventDefault(), Le.getOrCreateInstance(this).toggle();
});
re(Le);
const ih = "backdrop", _g = "fade", Ul = "show", Hl = `mousedown.bs.${ih}`, Eg = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, wg = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class rh extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return Eg;
  }
  static get DefaultType() {
    return wg;
  }
  static get NAME() {
    return ih;
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
    this._isAppended && ($.off(this._element, Hl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(_g), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = hs(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), $.on(t, Hl, () => {
      Ht(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Hu(t, this._getElement(), this._config.isAnimated);
  }
}
const Tg = "focustrap", Ag = "bs.focustrap", Ar = `.${Ag}`, Og = `focusin${Ar}`, Ng = `keydown.tab${Ar}`, kg = "Tab", Sg = "forward", Wl = "backward", Cg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Lg = {
  autofocus: "boolean",
  trapElement: "element"
};
class oh extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Cg;
  }
  static get DefaultType() {
    return Lg;
  }
  static get NAME() {
    return Tg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), $.off(document, Ar), $.on(document, Og, (t) => this._handleFocusin(t)), $.on(document, Ng, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, $.off(document, Ar));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: s
    } = this._config;
    if (t.target === document || t.target === s || s.contains(t.target))
      return;
    const n = Z.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === Wl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === kg && (this._lastTabNavDirection = t.shiftKey ? Wl : Sg);
  }
}
const zl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Kl = ".sticky-top", tr = "padding-right", Gl = "margin-right";
class pa {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, tr, (s) => s + t), this._setElementAttributes(zl, tr, (s) => s + t), this._setElementAttributes(Kl, Gl, (s) => s - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, tr), this._resetElementAttributes(zl, tr), this._resetElementAttributes(Kl, Gl);
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
      const a = window.getComputedStyle(o).getPropertyValue(s);
      o.style.setProperty(s, `${n(Number.parseFloat(a))}px`);
    };
    this._applyManipulationCallback(t, r);
  }
  _saveInitialAttribute(t, s) {
    const n = t.style.getPropertyValue(s);
    n && Ge.setDataAttribute(t, s, n);
  }
  _resetElementAttributes(t, s) {
    const n = (i) => {
      const r = Ge.getDataAttribute(i, s);
      if (r === null) {
        i.style.removeProperty(s);
        return;
      }
      Ge.removeDataAttribute(i, s), i.style.setProperty(s, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, s) {
    if (Ke(t)) {
      s(t);
      return;
    }
    for (const n of Z.find(t, this._element))
      s(n);
  }
}
const Ig = "modal", xg = "bs.modal", ie = `.${xg}`, $g = ".data-api", Mg = "Escape", Rg = `hide${ie}`, Dg = `hidePrevented${ie}`, ah = `hidden${ie}`, lh = `show${ie}`, qg = `shown${ie}`, Bg = `resize${ie}`, Pg = `click.dismiss${ie}`, Vg = `mousedown.dismiss${ie}`, jg = `keydown.dismiss${ie}`, Fg = `click${ie}${$g}`, Yl = "modal-open", Ug = "fade", Xl = "show", Vo = "modal-static", Hg = ".modal.show", Wg = ".modal-dialog", zg = ".modal-body", Kg = '[data-bs-toggle="modal"]', Gg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Yg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Rs extends ye {
  constructor(t, s) {
    super(t, s), this._dialog = Z.findOne(Wg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new pa(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Gg;
  }
  static get DefaultType() {
    return Yg;
  }
  static get NAME() {
    return Ig;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || $.trigger(this._element, lh, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Yl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || $.trigger(this._element, Rg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Xl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    $.off(window, ie), $.off(this._dialog, ie), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new rh({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new oh({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = Z.findOne(zg, this._dialog);
    s && (s.scrollTop = 0), Ti(this._element), this._element.classList.add(Xl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, $.trigger(this._element, qg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    $.on(this._element, jg, (t) => {
      if (t.key === Mg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), $.on(window, Bg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), $.on(this._element, Vg, (t) => {
      $.one(this._element, Pg, (s) => {
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
      document.body.classList.remove(Yl), this._resetAdjustments(), this._scrollBar.reset(), $.trigger(this._element, ah);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Ug);
  }
  _triggerBackdropTransition() {
    if ($.trigger(this._element, Dg).defaultPrevented)
      return;
    const s = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(Vo) || (s || (this._element.style.overflowY = "hidden"), this._element.classList.add(Vo), this._queueCallback(() => {
      this._element.classList.remove(Vo), this._queueCallback(() => {
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
$.on(document, Fg, Kg, function(e) {
  const t = Z.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), $.one(t, lh, (i) => {
    i.defaultPrevented || $.one(t, ah, () => {
      $n(this) && this.focus();
    });
  });
  const s = Z.findOne(Hg);
  s && Rs.getInstance(s).hide(), Rs.getOrCreateInstance(t).toggle(this);
});
$r(Rs);
re(Rs);
const Xg = "offcanvas", Zg = "bs.offcanvas", Je = `.${Zg}`, ch = ".data-api", Qg = `load${Je}${ch}`, Jg = "Escape", Zl = "show", Ql = "showing", Jl = "hiding", tm = "offcanvas-backdrop", uh = ".offcanvas.show", em = `show${Je}`, sm = `shown${Je}`, nm = `hide${Je}`, tc = `hidePrevented${Je}`, hh = `hidden${Je}`, im = `resize${Je}`, rm = `click${Je}${ch}`, om = `keydown.dismiss${Je}`, am = '[data-bs-toggle="offcanvas"]', lm = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, cm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class fs extends ye {
  constructor(t, s) {
    super(t, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return lm;
  }
  static get DefaultType() {
    return cm;
  }
  static get NAME() {
    return Xg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || $.trigger(this._element, em, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new pa().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Ql);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Zl), this._element.classList.remove(Ql), $.trigger(this._element, sm, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || $.trigger(this._element, nm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Jl), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(Zl, Jl), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new pa().reset(), $.trigger(this._element, hh);
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
        $.trigger(this._element, tc);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new rh({
      className: tm,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? t : null
    });
  }
  _initializeFocusTrap() {
    return new oh({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    $.on(this._element, om, (t) => {
      if (t.key === Jg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        $.trigger(this._element, tc);
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
$.on(document, rm, am, function(e) {
  const t = Z.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), ds(this))
    return;
  $.one(t, hh, () => {
    $n(this) && this.focus();
  });
  const s = Z.findOne(uh);
  s && s !== t && fs.getInstance(s).hide(), fs.getOrCreateInstance(t).toggle(this);
});
$.on(window, Qg, () => {
  for (const e of Z.find(uh))
    fs.getOrCreateInstance(e).show();
});
$.on(window, im, () => {
  for (const e of Z.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" && fs.getOrCreateInstance(e).hide();
});
$r(fs);
re(fs);
const um = /^aria-[\w-]*$/i, dh = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", um],
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
}, hm = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), dm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, fm = (e, t) => {
  const s = e.nodeName.toLowerCase();
  return t.includes(s) ? hm.has(s) ? !!dm.test(e.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function pm(e, t, s) {
  if (!e.length)
    return e;
  if (s && typeof s == "function")
    return s(e);
  const i = new window.DOMParser().parseFromString(e, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const o of r) {
    const a = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(a)) {
      o.remove();
      continue;
    }
    const l = [].concat(...o.attributes), u = [].concat(t["*"] || [], t[a] || []);
    for (const d of l)
      fm(d, u) || o.removeAttribute(d.nodeName);
  }
  return i.body.innerHTML;
}
const gm = "TemplateFactory", mm = {
  allowList: dh,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, bm = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, ym = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class vm extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return mm;
  }
  static get DefaultType() {
    return bm;
  }
  static get NAME() {
    return gm;
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
      }, ym);
  }
  _setContent(t, s, n) {
    const i = Z.findOne(n, t);
    if (i) {
      if (s = this._resolvePossibleFunction(s), !s) {
        i.remove();
        return;
      }
      if (Ke(s)) {
        this._putElementInTemplate(hs(s), i);
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
    return this._config.sanitize ? pm(t, this._config.allowList, this._config.sanitizeFn) : t;
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
const _m = "tooltip", Em = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), jo = "fade", wm = "modal", er = "show", Tm = ".tooltip-inner", ec = `.${wm}`, sc = "hide.bs.modal", ti = "hover", Fo = "focus", Am = "click", Om = "manual", Nm = "hide", km = "hidden", Sm = "show", Cm = "shown", Lm = "inserted", Im = "click", xm = "focusin", $m = "focusout", Mm = "mouseenter", Rm = "mouseleave", Dm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: ne() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: ne() ? "right" : "left"
}, qm = {
  allowList: dh,
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
}, Bm = {
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
let Dr = class fh extends ye {
  constructor(t, s) {
    if (typeof Pu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return qm;
  }
  static get DefaultType() {
    return Bm;
  }
  static get NAME() {
    return _m;
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
    clearTimeout(this._timeout), $.off(this._element.closest(ec), sc, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = $.trigger(this._element, this.constructor.eventName(Sm)), n = (Fu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), $.trigger(this._element, this.constructor.eventName(Lm))), this._popper = this._createPopper(i), i.classList.add(er), "ontouchstart" in document.documentElement)
      for (const a of [].concat(...document.body.children))
        $.on(a, "mouseover", wr);
    const o = () => {
      $.trigger(this._element, this.constructor.eventName(Cm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || $.trigger(this._element, this.constructor.eventName(Nm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(er), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        $.off(i, "mouseover", wr);
    this._activeTrigger[Am] = !1, this._activeTrigger[Fo] = !1, this._activeTrigger[ti] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), $.trigger(this._element, this.constructor.eventName(km)));
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
    const n = Af(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(jo), s;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new vm({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [Tm]: this._getTitle()
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
    const s = Ht(this._config.placement, [this, t, this._element]), n = Dm[s.toUpperCase()];
    return Xa(this._element, t, this._getPopperConfig(n));
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
        $.on(this._element, this.constructor.eventName(Im), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (s !== Om) {
        const n = s === ti ? this.constructor.eventName(Mm) : this.constructor.eventName(xm), i = s === ti ? this.constructor.eventName(Rm) : this.constructor.eventName($m);
        $.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Fo : ti] = !0, o._enter();
        }), $.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Fo : ti] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, $.on(this._element.closest(ec), sc, this._hideModalHandler);
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
    const s = Ge.getDataAttributes(this._element);
    for (const n of Object.keys(s))
      Em.has(n) && delete s[n];
    return t = {
      ...s,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : hs(t.container), typeof t.delay == "number" && (t.delay = {
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
      const s = fh.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
};
re(Dr);
const Pm = "popover", Vm = ".popover-header", jm = ".popover-body", Fm = {
  ...Dr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Um = {
  ...Dr.DefaultType,
  content: "(null|string|element|function)"
};
class tl extends Dr {
  // Getters
  static get Default() {
    return Fm;
  }
  static get DefaultType() {
    return Um;
  }
  static get NAME() {
    return Pm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Vm]: this._getTitle(),
      [jm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = tl.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
re(tl);
const Hm = "scrollspy", Wm = "bs.scrollspy", el = `.${Wm}`, zm = ".data-api", Km = `activate${el}`, nc = `click${el}`, Gm = `load${el}${zm}`, Ym = "dropdown-item", rn = "active", Xm = '[data-bs-spy="scroll"]', Uo = "[href]", Zm = ".nav, .list-group", ic = ".nav-link", Qm = ".nav-item", Jm = ".list-group-item", tb = `${ic}, ${Qm} > ${ic}, ${Jm}`, eb = ".dropdown", sb = ".dropdown-toggle", nb = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, ib = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class qr extends ye {
  constructor(t, s) {
    super(t, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return nb;
  }
  static get DefaultType() {
    return ib;
  }
  static get NAME() {
    return Hm;
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
    return t.target = hs(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((s) => Number.parseFloat(s))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && ($.off(this._config.target, nc), $.on(this._config.target, nc, Uo, (t) => {
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
      const a = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && a) {
        if (n(o), !i)
          return;
        continue;
      }
      !r && !a && n(o);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const t = Z.find(Uo, this._config.target);
    for (const s of t) {
      if (!s.hash || ds(s))
        continue;
      const n = Z.findOne(decodeURI(s.hash), this._element);
      $n(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(rn), this._activateParents(t), $.trigger(this._element, Km, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Ym)) {
      Z.findOne(sb, t.closest(eb)).classList.add(rn);
      return;
    }
    for (const s of Z.parents(t, Zm))
      for (const n of Z.prev(s, tb))
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
      const s = qr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
$.on(window, Gm, () => {
  for (const e of Z.find(Xm))
    qr.getOrCreateInstance(e);
});
re(qr);
const rb = "tab", ob = "bs.tab", Vs = `.${ob}`, ab = `hide${Vs}`, lb = `hidden${Vs}`, cb = `show${Vs}`, ub = `shown${Vs}`, hb = `click${Vs}`, db = `keydown${Vs}`, fb = `load${Vs}`, pb = "ArrowLeft", rc = "ArrowRight", gb = "ArrowUp", oc = "ArrowDown", Ho = "Home", ac = "End", Is = "active", lc = "fade", Wo = "show", mb = "dropdown", ph = ".dropdown-toggle", bb = ".dropdown-menu", zo = `:not(${ph})`, yb = '.list-group, .nav, [role="tablist"]', vb = ".nav-item, .list-group-item", _b = `.nav-link${zo}, .list-group-item${zo}, [role="tab"]${zo}`, gh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Ko = `${_b}, ${gh}`, Eb = `.${Is}[data-bs-toggle="tab"], .${Is}[data-bs-toggle="pill"], .${Is}[data-bs-toggle="list"]`;
class Nn extends ye {
  constructor(t) {
    super(t), this._parent = this._element.closest(yb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), $.on(this._element, db, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return rb;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const s = this._getActiveElem(), n = s ? $.trigger(s, ab, {
      relatedTarget: t
    }) : null;
    $.trigger(t, cb, {
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
        t.classList.add(Wo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), $.trigger(t, ub, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(lc));
  }
  _deactivate(t, s) {
    if (!t)
      return;
    t.classList.remove(Is), t.blur(), this._deactivate(Z.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Wo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), $.trigger(t, lb, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(lc));
  }
  _keydown(t) {
    if (![pb, rc, gb, oc, Ho, ac].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const s = this._getChildren().filter((i) => !ds(i));
    let n;
    if ([Ho, ac].includes(t.key))
      n = s[t.key === Ho ? 0 : s.length - 1];
    else {
      const i = [rc, oc].includes(t.key);
      n = Za(s, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), Nn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return Z.find(Ko, this._parent);
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
    if (!n.classList.contains(mb))
      return;
    const i = (r, o) => {
      const a = Z.findOne(r, n);
      a && a.classList.toggle(o, s);
    };
    i(ph, Is), i(bb, Wo), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(t, s, n) {
    t.hasAttribute(s) || t.setAttribute(s, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Is);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Ko) ? t : Z.findOne(Ko, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(vb) || t;
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
$.on(document, hb, gh, function(e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !ds(this) && Nn.getOrCreateInstance(this).show();
});
$.on(window, fb, () => {
  for (const e of Z.find(Eb))
    Nn.getOrCreateInstance(e);
});
re(Nn);
const wb = "toast", Tb = "bs.toast", bs = `.${Tb}`, Ab = `mouseover${bs}`, Ob = `mouseout${bs}`, Nb = `focusin${bs}`, kb = `focusout${bs}`, Sb = `hide${bs}`, Cb = `hidden${bs}`, Lb = `show${bs}`, Ib = `shown${bs}`, xb = "fade", cc = "hide", sr = "show", nr = "showing", $b = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Mb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Br extends ye {
  constructor(t, s) {
    super(t, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Mb;
  }
  static get DefaultType() {
    return $b;
  }
  static get NAME() {
    return wb;
  }
  // Public
  show() {
    if ($.trigger(this._element, Lb).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(xb);
    const s = () => {
      this._element.classList.remove(nr), $.trigger(this._element, Ib), this._maybeScheduleHide();
    };
    this._element.classList.remove(cc), Ti(this._element), this._element.classList.add(sr, nr), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || $.trigger(this._element, Sb).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(cc), this._element.classList.remove(nr, sr), $.trigger(this._element, Cb);
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
    $.on(this._element, Ab, (t) => this._onInteraction(t, !0)), $.on(this._element, Ob, (t) => this._onInteraction(t, !1)), $.on(this._element, Nb, (t) => this._onInteraction(t, !0)), $.on(this._element, kb, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Br.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
$r(Br);
re(Br);
function sl(e) {
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
function Pr(e, t) {
  for (const s in t)
    t[s] instanceof Object && s in e && Object.assign(t[s], Pr(e[s], t[s]));
  return Object.assign(e || {}, t);
}
function js(e, t, s, n) {
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
function He(e, t, s, n) {
  return t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), n && n.header && n.header[0] && (t.options.headers[n.header[0]] = n.header[1]), t.options.body = void 0, t.options.method = e, s && Object.assign(t.options, s), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function We(e, t, s, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (s ? "/" + s : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function ei(e, t = "-") {
  return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Rb(e) {
  let t = [];
  for (let s of e)
    t.push(Or(s));
  return t;
}
function Or(e, t = "", s = {}) {
  for (let n in e) {
    let i = t ? t + "." + n : n;
    typeof e[n] == "object" && !Array.isArray(e[n]) ? Or(e[n], i, s) : s[i] = e[n];
  }
  return s;
}
function Db(e) {
  let t = {};
  for (let s in e) {
    let n = s.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? e[s] : {} : []), t);
  }
  return t;
}
function ki(e, t, s, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (a, l) => o[l] ? o[l] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][e] ? i(e, s) : i(t[n][e]);
}
function qb(e, t, s = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(s), i = e.map(
    (r) => t.map((o) => {
      let a = r[o.name];
      return o.template ? o.template(a, r, e) : a !== void 0 ? a : "";
    }).join(s)
  );
  return [n, ...i].join(`
`);
}
function Bb(e, t = "export.csv") {
  e = "\uFEFF" + e;
  const s = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(s), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function Pb(e) {
  return [...new Set(e)];
}
function mh(e, t) {
  e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function bh(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 && e.push(s.value);
}
function yh(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 ? e.push(s.value) : e.splice(e.indexOf(s.value), 1);
}
function vh(e) {
  e.length = 0;
}
function nl(e, t) {
  t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function il(e, t) {
  t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Vb(e, t) {
  Object.keys(e).forEach((s) => {
    typeof e[s] == "function" && (e[s] = e[s](t));
  });
}
function jb(e, t) {
  return e < 1024 ? e + (t ? " Byte" : "") : e < 1048576 ? (e / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : e < 1073741824 ? (e / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (e / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
}
function Fb(e) {
  return e.split(".").reverse()[0];
}
var _h = typeof global == "object" && global && global.Object === Object && global, Ub = typeof self == "object" && self && self.Object === Object && self, De = _h || Ub || Function("return this")(), ps = De.Symbol, Eh = Object.prototype, Hb = Eh.hasOwnProperty, Wb = Eh.toString, si = ps ? ps.toStringTag : void 0;
function zb(e) {
  var t = Hb.call(e, si), s = e[si];
  try {
    e[si] = void 0;
    var n = !0;
  } catch {
  }
  var i = Wb.call(e);
  return n && (t ? e[si] = s : delete e[si]), i;
}
var Kb = Object.prototype, Gb = Kb.toString;
function Yb(e) {
  return Gb.call(e);
}
var Xb = "[object Null]", Zb = "[object Undefined]", uc = ps ? ps.toStringTag : void 0;
function Rn(e) {
  return e == null ? e === void 0 ? Zb : Xb : uc && uc in Object(e) ? zb(e) : Yb(e);
}
function Xe(e) {
  return e != null && typeof e == "object";
}
var Ds = Array.isArray;
function ys(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function wh(e) {
  return e;
}
var Qb = "[object AsyncFunction]", Jb = "[object Function]", t1 = "[object GeneratorFunction]", e1 = "[object Proxy]";
function rl(e) {
  if (!ys(e))
    return !1;
  var t = Rn(e);
  return t == Jb || t == t1 || t == Qb || t == e1;
}
var Go = De["__core-js_shared__"], hc = function() {
  var e = /[^.]+$/.exec(Go && Go.keys && Go.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function s1(e) {
  return !!hc && hc in e;
}
var n1 = Function.prototype, i1 = n1.toString;
function Fs(e) {
  if (e != null) {
    try {
      return i1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var r1 = /[\\^$.*+?()[\]{}|]/g, o1 = /^\[object .+?Constructor\]$/, a1 = Function.prototype, l1 = Object.prototype, c1 = a1.toString, u1 = l1.hasOwnProperty, h1 = RegExp(
  "^" + c1.call(u1).replace(r1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function d1(e) {
  if (!ys(e) || s1(e))
    return !1;
  var t = rl(e) ? h1 : o1;
  return t.test(Fs(e));
}
function f1(e, t) {
  return e == null ? void 0 : e[t];
}
function Us(e, t) {
  var s = f1(e, t);
  return d1(s) ? s : void 0;
}
var ga = Us(De, "WeakMap"), dc = Object.create, p1 = /* @__PURE__ */ function() {
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
function g1(e, t, s) {
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
function Th(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var m1 = 800, b1 = 16, y1 = Date.now;
function v1(e) {
  var t = 0, s = 0;
  return function() {
    var n = y1(), i = b1 - (n - s);
    if (s = n, i > 0) {
      if (++t >= m1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function _1(e) {
  return function() {
    return e;
  };
}
var Nr = function() {
  try {
    var e = Us(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), E1 = Nr ? function(e, t) {
  return Nr(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: _1(t),
    writable: !0
  });
} : wh, w1 = v1(E1);
function T1(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var A1 = 9007199254740991, O1 = /^(?:0|[1-9]\d*)$/;
function Ah(e, t) {
  var s = typeof e;
  return t = t ?? A1, !!t && (s == "number" || s != "symbol" && O1.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ol(e, t, s) {
  t == "__proto__" && Nr ? Nr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
function Si(e, t) {
  return e === t || e !== e && t !== t;
}
var N1 = Object.prototype, k1 = N1.hasOwnProperty;
function Oh(e, t, s) {
  var n = e[t];
  (!(k1.call(e, t) && Si(n, s)) || s === void 0 && !(t in e)) && ol(e, t, s);
}
function Ci(e, t, s, n) {
  var i = !s;
  s || (s = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var a = t[r], l = void 0;
    l === void 0 && (l = e[a]), i ? ol(s, a, l) : Oh(s, a, l);
  }
  return s;
}
var fc = Math.max;
function S1(e, t, s) {
  return t = fc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = fc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var a = Array(t + 1); ++i < t; )
      a[i] = n[i];
    return a[t] = s(o), g1(e, this, a);
  };
}
function C1(e, t) {
  return w1(S1(e, t, wh), e + "");
}
var L1 = 9007199254740991;
function Nh(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= L1;
}
function Vr(e) {
  return e != null && Nh(e.length) && !rl(e);
}
function I1(e, t, s) {
  if (!ys(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? Vr(s) && Ah(t, s.length) : n == "string" && t in s) ? Si(s[t], e) : !1;
}
function x1(e) {
  return C1(function(t, s) {
    var n = -1, i = s.length, r = i > 1 ? s[i - 1] : void 0, o = i > 2 ? s[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && I1(s[0], s[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var a = s[n];
      a && e(t, a, n, r);
    }
    return t;
  });
}
var $1 = Object.prototype;
function al(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || $1;
  return e === s;
}
function M1(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var R1 = "[object Arguments]";
function pc(e) {
  return Xe(e) && Rn(e) == R1;
}
var kh = Object.prototype, D1 = kh.hasOwnProperty, q1 = kh.propertyIsEnumerable, ma = pc(/* @__PURE__ */ function() {
  return arguments;
}()) ? pc : function(e) {
  return Xe(e) && D1.call(e, "callee") && !q1.call(e, "callee");
};
function B1() {
  return !1;
}
var Sh = typeof exports == "object" && exports && !exports.nodeType && exports, gc = Sh && typeof module == "object" && module && !module.nodeType && module, P1 = gc && gc.exports === Sh, mc = P1 ? De.Buffer : void 0, V1 = mc ? mc.isBuffer : void 0, gi = V1 || B1, j1 = "[object Arguments]", F1 = "[object Array]", U1 = "[object Boolean]", H1 = "[object Date]", W1 = "[object Error]", z1 = "[object Function]", K1 = "[object Map]", G1 = "[object Number]", Y1 = "[object Object]", X1 = "[object RegExp]", Z1 = "[object Set]", Q1 = "[object String]", J1 = "[object WeakMap]", ty = "[object ArrayBuffer]", ey = "[object DataView]", sy = "[object Float32Array]", ny = "[object Float64Array]", iy = "[object Int8Array]", ry = "[object Int16Array]", oy = "[object Int32Array]", ay = "[object Uint8Array]", ly = "[object Uint8ClampedArray]", cy = "[object Uint16Array]", uy = "[object Uint32Array]", Tt = {};
Tt[sy] = Tt[ny] = Tt[iy] = Tt[ry] = Tt[oy] = Tt[ay] = Tt[ly] = Tt[cy] = Tt[uy] = !0;
Tt[j1] = Tt[F1] = Tt[ty] = Tt[U1] = Tt[ey] = Tt[H1] = Tt[W1] = Tt[z1] = Tt[K1] = Tt[G1] = Tt[Y1] = Tt[X1] = Tt[Z1] = Tt[Q1] = Tt[J1] = !1;
function hy(e) {
  return Xe(e) && Nh(e.length) && !!Tt[Rn(e)];
}
function ll(e) {
  return function(t) {
    return e(t);
  };
}
var Ch = typeof exports == "object" && exports && !exports.nodeType && exports, ui = Ch && typeof module == "object" && module && !module.nodeType && module, dy = ui && ui.exports === Ch, Yo = dy && _h.process, kn = function() {
  try {
    var e = ui && ui.require && ui.require("util").types;
    return e || Yo && Yo.binding && Yo.binding("util");
  } catch {
  }
}(), bc = kn && kn.isTypedArray, cl = bc ? ll(bc) : hy, fy = Object.prototype, py = fy.hasOwnProperty;
function Lh(e, t) {
  var s = Ds(e), n = !s && ma(e), i = !s && !n && gi(e), r = !s && !n && !i && cl(e), o = s || n || i || r, a = o ? M1(e.length, String) : [], l = a.length;
  for (var u in e)
    (t || py.call(e, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Ah(u, l))) && a.push(u);
  return a;
}
function Ih(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var gy = Ih(Object.keys, Object), my = Object.prototype, by = my.hasOwnProperty;
function yy(e) {
  if (!al(e))
    return gy(e);
  var t = [];
  for (var s in Object(e))
    by.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
function ul(e) {
  return Vr(e) ? Lh(e) : yy(e);
}
function vy(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var _y = Object.prototype, Ey = _y.hasOwnProperty;
function wy(e) {
  if (!ys(e))
    return vy(e);
  var t = al(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !Ey.call(e, n)) || s.push(n);
  return s;
}
function Li(e) {
  return Vr(e) ? Lh(e, !0) : wy(e);
}
var mi = Us(Object, "create");
function Ty() {
  this.__data__ = mi ? mi(null) : {}, this.size = 0;
}
function Ay(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Oy = "__lodash_hash_undefined__", Ny = Object.prototype, ky = Ny.hasOwnProperty;
function Sy(e) {
  var t = this.__data__;
  if (mi) {
    var s = t[e];
    return s === Oy ? void 0 : s;
  }
  return ky.call(t, e) ? t[e] : void 0;
}
var Cy = Object.prototype, Ly = Cy.hasOwnProperty;
function Iy(e) {
  var t = this.__data__;
  return mi ? t[e] !== void 0 : Ly.call(t, e);
}
var xy = "__lodash_hash_undefined__";
function $y(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = mi && t === void 0 ? xy : t, this;
}
function qs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
qs.prototype.clear = Ty;
qs.prototype.delete = Ay;
qs.prototype.get = Sy;
qs.prototype.has = Iy;
qs.prototype.set = $y;
function My() {
  this.__data__ = [], this.size = 0;
}
function jr(e, t) {
  for (var s = e.length; s--; )
    if (Si(e[s][0], t))
      return s;
  return -1;
}
var Ry = Array.prototype, Dy = Ry.splice;
function qy(e) {
  var t = this.__data__, s = jr(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : Dy.call(t, s, 1), --this.size, !0;
}
function By(e) {
  var t = this.__data__, s = jr(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function Py(e) {
  return jr(this.__data__, e) > -1;
}
function Vy(e, t) {
  var s = this.__data__, n = jr(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function ts(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ts.prototype.clear = My;
ts.prototype.delete = qy;
ts.prototype.get = By;
ts.prototype.has = Py;
ts.prototype.set = Vy;
var bi = Us(De, "Map");
function jy() {
  this.size = 0, this.__data__ = {
    hash: new qs(),
    map: new (bi || ts)(),
    string: new qs()
  };
}
function Fy(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Fr(e, t) {
  var s = e.__data__;
  return Fy(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function Uy(e) {
  var t = Fr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Hy(e) {
  return Fr(this, e).get(e);
}
function Wy(e) {
  return Fr(this, e).has(e);
}
function zy(e, t) {
  var s = Fr(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
function Hs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Hs.prototype.clear = jy;
Hs.prototype.delete = Uy;
Hs.prototype.get = Hy;
Hs.prototype.has = Wy;
Hs.prototype.set = zy;
function xh(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var hl = Ih(Object.getPrototypeOf, Object), Ky = "[object Object]", Gy = Function.prototype, Yy = Object.prototype, $h = Gy.toString, Xy = Yy.hasOwnProperty, Zy = $h.call(Object);
function Qy(e) {
  if (!Xe(e) || Rn(e) != Ky)
    return !1;
  var t = hl(e);
  if (t === null)
    return !0;
  var s = Xy.call(t, "constructor") && t.constructor;
  return typeof s == "function" && s instanceof s && $h.call(s) == Zy;
}
function Jy() {
  this.__data__ = new ts(), this.size = 0;
}
function tv(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
function ev(e) {
  return this.__data__.get(e);
}
function sv(e) {
  return this.__data__.has(e);
}
var nv = 200;
function iv(e, t) {
  var s = this.__data__;
  if (s instanceof ts) {
    var n = s.__data__;
    if (!bi || n.length < nv - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new Hs(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
function Ie(e) {
  var t = this.__data__ = new ts(e);
  this.size = t.size;
}
Ie.prototype.clear = Jy;
Ie.prototype.delete = tv;
Ie.prototype.get = ev;
Ie.prototype.has = sv;
Ie.prototype.set = iv;
function rv(e, t) {
  return e && Ci(t, ul(t), e);
}
function ov(e, t) {
  return e && Ci(t, Li(t), e);
}
var Mh = typeof exports == "object" && exports && !exports.nodeType && exports, yc = Mh && typeof module == "object" && module && !module.nodeType && module, av = yc && yc.exports === Mh, vc = av ? De.Buffer : void 0, _c = vc ? vc.allocUnsafe : void 0;
function Rh(e, t) {
  if (t)
    return e.slice();
  var s = e.length, n = _c ? _c(s) : new e.constructor(s);
  return e.copy(n), n;
}
function lv(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var o = e[s];
    t(o, s, e) && (r[i++] = o);
  }
  return r;
}
function Dh() {
  return [];
}
var cv = Object.prototype, uv = cv.propertyIsEnumerable, Ec = Object.getOwnPropertySymbols, dl = Ec ? function(e) {
  return e == null ? [] : (e = Object(e), lv(Ec(e), function(t) {
    return uv.call(e, t);
  }));
} : Dh;
function hv(e, t) {
  return Ci(e, dl(e), t);
}
var dv = Object.getOwnPropertySymbols, qh = dv ? function(e) {
  for (var t = []; e; )
    xh(t, dl(e)), e = hl(e);
  return t;
} : Dh;
function fv(e, t) {
  return Ci(e, qh(e), t);
}
function Bh(e, t, s) {
  var n = t(e);
  return Ds(e) ? n : xh(n, s(e));
}
function ba(e) {
  return Bh(e, ul, dl);
}
function pv(e) {
  return Bh(e, Li, qh);
}
var ya = Us(De, "DataView"), va = Us(De, "Promise"), _a = Us(De, "Set"), wc = "[object Map]", gv = "[object Object]", Tc = "[object Promise]", Ac = "[object Set]", Oc = "[object WeakMap]", Nc = "[object DataView]", mv = Fs(ya), bv = Fs(bi), yv = Fs(va), vv = Fs(_a), _v = Fs(ga), he = Rn;
(ya && he(new ya(new ArrayBuffer(1))) != Nc || bi && he(new bi()) != wc || va && he(va.resolve()) != Tc || _a && he(new _a()) != Ac || ga && he(new ga()) != Oc) && (he = function(e) {
  var t = Rn(e), s = t == gv ? e.constructor : void 0, n = s ? Fs(s) : "";
  if (n)
    switch (n) {
      case mv:
        return Nc;
      case bv:
        return wc;
      case yv:
        return Tc;
      case vv:
        return Ac;
      case _v:
        return Oc;
    }
  return t;
});
var Ev = Object.prototype, wv = Ev.hasOwnProperty;
function Tv(e) {
  var t = e.length, s = new e.constructor(t);
  return t && typeof e[0] == "string" && wv.call(e, "index") && (s.index = e.index, s.input = e.input), s;
}
var kr = De.Uint8Array;
function fl(e) {
  var t = new e.constructor(e.byteLength);
  return new kr(t).set(new kr(e)), t;
}
function Av(e, t) {
  var s = t ? fl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.byteLength);
}
var Ov = /\w*$/;
function Nv(e) {
  var t = new e.constructor(e.source, Ov.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var kc = ps ? ps.prototype : void 0, Sc = kc ? kc.valueOf : void 0;
function kv(e) {
  return Sc ? Object(Sc.call(e)) : {};
}
function Ph(e, t) {
  var s = t ? fl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.length);
}
var Sv = "[object Boolean]", Cv = "[object Date]", Lv = "[object Map]", Iv = "[object Number]", xv = "[object RegExp]", $v = "[object Set]", Mv = "[object String]", Rv = "[object Symbol]", Dv = "[object ArrayBuffer]", qv = "[object DataView]", Bv = "[object Float32Array]", Pv = "[object Float64Array]", Vv = "[object Int8Array]", jv = "[object Int16Array]", Fv = "[object Int32Array]", Uv = "[object Uint8Array]", Hv = "[object Uint8ClampedArray]", Wv = "[object Uint16Array]", zv = "[object Uint32Array]";
function Kv(e, t, s) {
  var n = e.constructor;
  switch (t) {
    case Dv:
      return fl(e);
    case Sv:
    case Cv:
      return new n(+e);
    case qv:
      return Av(e, s);
    case Bv:
    case Pv:
    case Vv:
    case jv:
    case Fv:
    case Uv:
    case Hv:
    case Wv:
    case zv:
      return Ph(e, s);
    case Lv:
      return new n();
    case Iv:
    case Mv:
      return new n(e);
    case xv:
      return Nv(e);
    case $v:
      return new n();
    case Rv:
      return kv(e);
  }
}
function Vh(e) {
  return typeof e.constructor == "function" && !al(e) ? p1(hl(e)) : {};
}
var Gv = "[object Map]";
function Yv(e) {
  return Xe(e) && he(e) == Gv;
}
var Cc = kn && kn.isMap, Xv = Cc ? ll(Cc) : Yv, Zv = "[object Set]";
function Qv(e) {
  return Xe(e) && he(e) == Zv;
}
var Lc = kn && kn.isSet, Jv = Lc ? ll(Lc) : Qv, t0 = 1, e0 = 2, s0 = 4, jh = "[object Arguments]", n0 = "[object Array]", i0 = "[object Boolean]", r0 = "[object Date]", o0 = "[object Error]", Fh = "[object Function]", a0 = "[object GeneratorFunction]", l0 = "[object Map]", c0 = "[object Number]", Uh = "[object Object]", u0 = "[object RegExp]", h0 = "[object Set]", d0 = "[object String]", f0 = "[object Symbol]", p0 = "[object WeakMap]", g0 = "[object ArrayBuffer]", m0 = "[object DataView]", b0 = "[object Float32Array]", y0 = "[object Float64Array]", v0 = "[object Int8Array]", _0 = "[object Int16Array]", E0 = "[object Int32Array]", w0 = "[object Uint8Array]", T0 = "[object Uint8ClampedArray]", A0 = "[object Uint16Array]", O0 = "[object Uint32Array]", wt = {};
wt[jh] = wt[n0] = wt[g0] = wt[m0] = wt[i0] = wt[r0] = wt[b0] = wt[y0] = wt[v0] = wt[_0] = wt[E0] = wt[l0] = wt[c0] = wt[Uh] = wt[u0] = wt[h0] = wt[d0] = wt[f0] = wt[w0] = wt[T0] = wt[A0] = wt[O0] = !0;
wt[o0] = wt[Fh] = wt[p0] = !1;
function br(e, t, s, n, i, r) {
  var o, a = t & t0, l = t & e0, u = t & s0;
  if (o !== void 0)
    return o;
  if (!ys(e))
    return e;
  var d = Ds(e);
  if (d) {
    if (o = Tv(e), !a)
      return Th(e, o);
  } else {
    var h = he(e), b = h == Fh || h == a0;
    if (gi(e))
      return Rh(e, a);
    if (h == Uh || h == jh || b && !i) {
      if (o = l || b ? {} : Vh(e), !a)
        return l ? fv(e, ov(o, e)) : hv(e, rv(o, e));
    } else {
      if (!wt[h])
        return i ? e : {};
      o = Kv(e, h, a);
    }
  }
  r || (r = new Ie());
  var y = r.get(e);
  if (y)
    return y;
  r.set(e, o), Jv(e) ? e.forEach(function(O) {
    o.add(br(O, t, s, O, e, r));
  }) : Xv(e) && e.forEach(function(O, N) {
    o.set(N, br(O, t, s, N, e, r));
  });
  var E = u ? l ? pv : ba : l ? Li : ul, A = d ? void 0 : E(e);
  return T1(A || e, function(O, N) {
    A && (N = O, O = e[N]), Oh(o, N, br(O, t, s, N, e, r));
  }), o;
}
var N0 = 1, k0 = 4;
function yn(e) {
  return br(e, N0 | k0);
}
var S0 = "__lodash_hash_undefined__";
function C0(e) {
  return this.__data__.set(e, S0), this;
}
function L0(e) {
  return this.__data__.has(e);
}
function Sr(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new Hs(); ++t < s; )
    this.add(e[t]);
}
Sr.prototype.add = Sr.prototype.push = C0;
Sr.prototype.has = L0;
function I0(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
function x0(e, t) {
  return e.has(t);
}
var $0 = 1, M0 = 2;
function Hh(e, t, s, n, i, r) {
  var o = s & $0, a = e.length, l = t.length;
  if (a != l && !(o && l > a))
    return !1;
  var u = r.get(e), d = r.get(t);
  if (u && d)
    return u == t && d == e;
  var h = -1, b = !0, y = s & M0 ? new Sr() : void 0;
  for (r.set(e, t), r.set(t, e); ++h < a; ) {
    var E = e[h], A = t[h];
    if (n)
      var O = o ? n(A, E, h, t, e, r) : n(E, A, h, e, t, r);
    if (O !== void 0) {
      if (O)
        continue;
      b = !1;
      break;
    }
    if (y) {
      if (!I0(t, function(N, M) {
        if (!x0(y, M) && (E === N || i(E, N, s, n, r)))
          return y.push(M);
      })) {
        b = !1;
        break;
      }
    } else if (!(E === A || i(E, A, s, n, r))) {
      b = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), b;
}
function R0(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
function D0(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var q0 = 1, B0 = 2, P0 = "[object Boolean]", V0 = "[object Date]", j0 = "[object Error]", F0 = "[object Map]", U0 = "[object Number]", H0 = "[object RegExp]", W0 = "[object Set]", z0 = "[object String]", K0 = "[object Symbol]", G0 = "[object ArrayBuffer]", Y0 = "[object DataView]", Ic = ps ? ps.prototype : void 0, Xo = Ic ? Ic.valueOf : void 0;
function X0(e, t, s, n, i, r, o) {
  switch (s) {
    case Y0:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case G0:
      return !(e.byteLength != t.byteLength || !r(new kr(e), new kr(t)));
    case P0:
    case V0:
    case U0:
      return Si(+e, +t);
    case j0:
      return e.name == t.name && e.message == t.message;
    case H0:
    case z0:
      return e == t + "";
    case F0:
      var a = R0;
    case W0:
      var l = n & q0;
      if (a || (a = D0), e.size != t.size && !l)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      n |= B0, o.set(e, t);
      var d = Hh(a(e), a(t), n, i, r, o);
      return o.delete(e), d;
    case K0:
      if (Xo)
        return Xo.call(e) == Xo.call(t);
  }
  return !1;
}
var Z0 = 1, Q0 = Object.prototype, J0 = Q0.hasOwnProperty;
function t_(e, t, s, n, i, r) {
  var o = s & Z0, a = ba(e), l = a.length, u = ba(t), d = u.length;
  if (l != d && !o)
    return !1;
  for (var h = l; h--; ) {
    var b = a[h];
    if (!(o ? b in t : J0.call(t, b)))
      return !1;
  }
  var y = r.get(e), E = r.get(t);
  if (y && E)
    return y == t && E == e;
  var A = !0;
  r.set(e, t), r.set(t, e);
  for (var O = o; ++h < l; ) {
    b = a[h];
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
    var P = e.constructor, V = t.constructor;
    P != V && "constructor" in e && "constructor" in t && !(typeof P == "function" && P instanceof P && typeof V == "function" && V instanceof V) && (A = !1);
  }
  return r.delete(e), r.delete(t), A;
}
var e_ = 1, xc = "[object Arguments]", $c = "[object Array]", ir = "[object Object]", s_ = Object.prototype, Mc = s_.hasOwnProperty;
function n_(e, t, s, n, i, r) {
  var o = Ds(e), a = Ds(t), l = o ? $c : he(e), u = a ? $c : he(t);
  l = l == xc ? ir : l, u = u == xc ? ir : u;
  var d = l == ir, h = u == ir, b = l == u;
  if (b && gi(e)) {
    if (!gi(t))
      return !1;
    o = !0, d = !1;
  }
  if (b && !d)
    return r || (r = new Ie()), o || cl(e) ? Hh(e, t, s, n, i, r) : X0(e, t, l, s, n, i, r);
  if (!(s & e_)) {
    var y = d && Mc.call(e, "__wrapped__"), E = h && Mc.call(t, "__wrapped__");
    if (y || E) {
      var A = y ? e.value() : e, O = E ? t.value() : t;
      return r || (r = new Ie()), i(A, O, s, n, r);
    }
  }
  return b ? (r || (r = new Ie()), t_(e, t, s, n, i, r)) : !1;
}
function Wh(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !Xe(e) && !Xe(t) ? e !== e && t !== t : n_(e, t, s, n, Wh, i);
}
function i_(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), o = n(t), a = o.length; a--; ) {
      var l = o[++i];
      if (s(r[l], l, r) === !1)
        break;
    }
    return t;
  };
}
var r_ = i_();
function Ea(e, t, s) {
  (s !== void 0 && !Si(e[t], s) || s === void 0 && !(t in e)) && ol(e, t, s);
}
function o_(e) {
  return Xe(e) && Vr(e);
}
function wa(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function a_(e) {
  return Ci(e, Li(e));
}
function l_(e, t, s, n, i, r, o) {
  var a = wa(e, s), l = wa(t, s), u = o.get(l);
  if (u) {
    Ea(e, s, u);
    return;
  }
  var d = r ? r(a, l, s + "", e, t, o) : void 0, h = d === void 0;
  if (h) {
    var b = Ds(l), y = !b && gi(l), E = !b && !y && cl(l);
    d = l, b || y || E ? Ds(a) ? d = a : o_(a) ? d = Th(a) : y ? (h = !1, d = Rh(l, !0)) : E ? (h = !1, d = Ph(l, !0)) : d = [] : Qy(l) || ma(l) ? (d = a, ma(a) ? d = a_(a) : (!ys(a) || rl(a)) && (d = Vh(l))) : h = !1;
  }
  h && (o.set(l, d), i(d, l, n, r, o), o.delete(l)), Ea(e, s, d);
}
function zh(e, t, s, n, i) {
  e !== t && r_(t, function(r, o) {
    if (i || (i = new Ie()), ys(r))
      l_(e, t, o, s, zh, n, i);
    else {
      var a = n ? n(wa(e, o), r, o + "", e, t, i) : void 0;
      a === void 0 && (a = r), Ea(e, o, a);
    }
  }, Li);
}
function pl(e, t) {
  return Wh(e, t);
}
var us = x1(function(e, t, s) {
  zh(e, t, s);
}), G = /* @__PURE__ */ ((e) => (e[e.TYPE = 3] = "TYPE", e[e.LEVEL = 12] = "LEVEL", e[e.ATTRIBUTE = 13] = "ATTRIBUTE", e[e.BLOT = 14] = "BLOT", e[e.INLINE = 7] = "INLINE", e[e.BLOCK = 11] = "BLOCK", e[e.BLOCK_BLOT = 10] = "BLOCK_BLOT", e[e.INLINE_BLOT = 6] = "INLINE_BLOT", e[e.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", e[e.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", e[e.ANY = 15] = "ANY", e))(G || {});
class Me {
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
const Kh = class Ta {
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
    ), a = new r(t, o, n);
    return Ta.blots.set(a.domNode, a), a;
  }
  find(t, s = !1) {
    return Ta.find(t, s);
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
Kh.blots = /* @__PURE__ */ new WeakMap();
let Sn = Kh;
function Rc(e, t) {
  return (e.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class c_ extends Me {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((s) => s.split("-").slice(0, -1).join("-"));
  }
  add(t, s) {
    return this.canAdd(t, s) ? (this.remove(t), t.classList.add(`${this.keyName}-${s}`), !0) : !1;
  }
  remove(t) {
    Rc(t, this.keyName).forEach((s) => {
      t.classList.remove(s);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const s = (Rc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, s) ? s : "";
  }
}
const ve = c_;
function Zo(e) {
  const t = e.split("-"), s = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + s;
}
class u_ extends Me {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((s) => s.split(":")[0].trim());
  }
  add(t, s) {
    return this.canAdd(t, s) ? (t.style[Zo(this.keyName)] = s, !0) : !1;
  }
  remove(t) {
    t.style[Zo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const s = t.style[Zo(this.keyName)];
    return this.canAdd(t, s) ? s : "";
  }
}
const vs = u_;
class h_ {
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
    const s = Me.keys(this.domNode), n = ve.keys(this.domNode), i = vs.keys(this.domNode);
    s.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, G.ATTRIBUTE);
      o instanceof Me && (this.attributes[o.attrName] = o);
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
const Ur = h_, Gh = class {
  constructor(t, s) {
    this.scroll = t, this.domNode = s, Sn.blots.set(s, this), this.prev = null, this.next = null;
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
    this.parent != null && this.parent.removeChild(this), Sn.blots.delete(this.domNode);
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
Gh.blotName = "abstract";
let Yh = Gh;
const Xh = class extends Yh {
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
Xh.scope = G.INLINE_BLOT;
let d_ = Xh;
const Rt = d_;
class f_ {
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
    const a = this.iterator(i);
    let l = a();
    for (; l && o < t + s; ) {
      const u = l.length();
      t > o ? n(
        l,
        t - o,
        Math.min(s, o + u - t)
      ) : n(l, 0, Math.min(u, t + s - o)), o += u, l = a();
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
function Dc(e, t) {
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
const Zh = class os extends Yh {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, os.uiClass && this.uiNode.classList.add(os.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new f_(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const s = Dc(t, this.scroll);
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
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof os ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, s = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      s,
      n,
      (o, a, l) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof os && (i = i.concat(
          o.descendants(t, a, r)
        )), r -= l;
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
      ) || (s.statics.scope === G.BLOCK_BLOT ? (s.next != null && this.splitAfter(s), s.prev != null && this.splitAfter(s.prev), s.parent.unwrap(), t = !0) : s instanceof os ? s.unwrap() : s.remove());
    });
  }
  formatAt(t, s, n, i) {
    this.children.forEachAt(t, s, (r, o, a) => {
      r.formatAt(o, a, n, i);
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
    return n instanceof os ? r.concat(n.path(i, s)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    return n instanceof os && this.moveChildren(n), super.replaceWith(n);
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
      const a = i.split(r, s);
      a != null && n.appendChild(a);
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
      const a = Dc(r, this.scroll);
      (a.next !== o || a.next == null) && (a.parent != null && a.parent.removeChild(this), this.insertBefore(a, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Zh.uiClass = "";
let p_ = Zh;
const me = p_;
function g_(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const cn = class un extends me {
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
      n instanceof Me ? this.attributes.attribute(n, s) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s);
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
    n instanceof un && n.prev === this && g_(s, n.formats()) && (n.moveChildren(this), n.remove());
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
let m_ = cn;
const gl = m_, hn = class Aa extends me {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(Aa.blotName);
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
    n != null && (n instanceof Me ? this.attributes.attribute(n, s) : t === this.statics.blotName && !s ? this.replaceWith(Aa.blotName) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s));
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
hn.blotName = "block", hn.scope = G.BLOCK_BLOT, hn.tagName = "P", hn.allowedChildren = [
  gl,
  hn,
  Rt
];
let b_ = hn;
const yi = b_, Oa = class extends me {
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
Oa.blotName = "container", Oa.scope = G.BLOCK_BLOT;
let y_ = Oa;
const Hr = y_;
class v_ extends Rt {
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
const Gt = v_, __ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, E_ = 100, dn = class extends me {
  constructor(t, s) {
    super(null, s), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, __), this.attach();
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
    const r = (l, u = !0) => {
      l == null || l === this || l.domNode.parentNode != null && (n.has(l.domNode) || n.set(l.domNode, []), u && r(l.parent));
    }, o = (l) => {
      n.has(l.domNode) && (l instanceof me && l.children.forEach(o), n.delete(l.domNode), l.optimize(s));
    };
    let a = t;
    for (let l = 0; a.length > 0; l += 1) {
      if (l >= E_)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (a.forEach((u) => {
        const d = this.find(u.target, !0);
        d != null && (d.domNode === u.target && (u.type === "childList" ? (r(this.find(u.previousSibling, !1)), Array.from(u.addedNodes).forEach((h) => {
          const b = this.find(h, !1);
          r(b, !1), b instanceof me && b.children.forEach((y) => {
            r(y, !1);
          });
        })) : u.type === "attributes" && r(d.prev)), r(d));
      }), this.children.forEach(o), a = Array.from(this.observer.takeRecords()), i = a.slice(); i.length > 0; )
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
dn.blotName = "scroll", dn.defaultChild = yi, dn.allowedChildren = [yi, Hr], dn.scope = G.BLOCK_BLOT, dn.tagName = "DIV";
let w_ = dn;
const ml = w_, Na = class Qh extends Rt {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Qh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Na.blotName = "text", Na.scope = G.INLINE_BLOT;
let T_ = Na;
const Cr = T_, A_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Me,
  AttributorStore: Ur,
  BlockBlot: yi,
  ClassAttributor: ve,
  ContainerBlot: Hr,
  EmbedBlot: Gt,
  InlineBlot: gl,
  LeafBlot: Rt,
  ParentBlot: me,
  Registry: Sn,
  Scope: G,
  ScrollBlot: ml,
  StyleAttributor: vs,
  TextBlot: Cr
}, Symbol.toStringTag, { value: "Module" }));
var as = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Jh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var rr = { exports: {} }, Qo, qc;
function O_() {
  if (qc) return Qo;
  qc = 1;
  var e = -1, t = 1, s = 0;
  function n(v, x, w, q, D) {
    if (v === x)
      return v ? [[s, v]] : [];
    if (w != null) {
      var C = vt(v, x, w);
      if (C)
        return C;
    }
    var R = a(v, x), U = v.substring(0, R);
    v = v.substring(R), x = x.substring(R), R = u(v, x);
    var W = v.substring(v.length - R);
    v = v.substring(0, v.length - R), x = x.substring(0, x.length - R);
    var j = i(v, x);
    return U && j.unshift([s, U]), W && j.push([s, W]), M(j, D), q && h(j), j;
  }
  function i(v, x) {
    var w;
    if (!v)
      return [[t, x]];
    if (!x)
      return [[e, v]];
    var q = v.length > x.length ? v : x, D = v.length > x.length ? x : v, C = q.indexOf(D);
    if (C !== -1)
      return w = [
        [t, q.substring(0, C)],
        [s, D],
        [t, q.substring(C + D.length)]
      ], v.length > x.length && (w[0][0] = w[2][0] = e), w;
    if (D.length === 1)
      return [
        [e, v],
        [t, x]
      ];
    var R = d(v, x);
    if (R) {
      var U = R[0], W = R[1], j = R[2], et = R[3], Q = R[4], ot = n(U, j), it = n(W, et);
      return ot.concat([[s, Q]], it);
    }
    return r(v, x);
  }
  function r(v, x) {
    for (var w = v.length, q = x.length, D = Math.ceil((w + q) / 2), C = D, R = 2 * D, U = new Array(R), W = new Array(R), j = 0; j < R; j++)
      U[j] = -1, W[j] = -1;
    U[C + 1] = 0, W[C + 1] = 0;
    for (var et = w - q, Q = et % 2 !== 0, ot = 0, it = 0, z = 0, mt = 0, Et = 0; Et < D; Et++) {
      for (var J = -Et + ot; J <= Et - it; J += 2) {
        var ct = C + J, dt;
        J === -Et || J !== Et && U[ct - 1] < U[ct + 1] ? dt = U[ct + 1] : dt = U[ct - 1] + 1;
        for (var ut = dt - J; dt < w && ut < q && v.charAt(dt) === x.charAt(ut); )
          dt++, ut++;
        if (U[ct] = dt, dt > w)
          it += 2;
        else if (ut > q)
          ot += 2;
        else if (Q) {
          var bt = C + et - J;
          if (bt >= 0 && bt < R && W[bt] !== -1) {
            var yt = w - W[bt];
            if (dt >= yt)
              return o(v, x, dt, ut);
          }
        }
      }
      for (var At = -Et + z; At <= Et - mt; At += 2) {
        var bt = C + At, yt;
        At === -Et || At !== Et && W[bt - 1] < W[bt + 1] ? yt = W[bt + 1] : yt = W[bt - 1] + 1;
        for (var kt = yt - At; yt < w && kt < q && v.charAt(w - yt - 1) === x.charAt(q - kt - 1); )
          yt++, kt++;
        if (W[bt] = yt, yt > w)
          mt += 2;
        else if (kt > q)
          z += 2;
        else if (!Q) {
          var ct = C + et - At;
          if (ct >= 0 && ct < R && U[ct] !== -1) {
            var dt = U[ct], ut = C + dt - ct;
            if (yt = w - yt, dt >= yt)
              return o(v, x, dt, ut);
          }
        }
      }
    }
    return [
      [e, v],
      [t, x]
    ];
  }
  function o(v, x, w, q) {
    var D = v.substring(0, w), C = x.substring(0, q), R = v.substring(w), U = x.substring(q), W = n(D, C), j = n(R, U);
    return W.concat(j);
  }
  function a(v, x) {
    if (!v || !x || v.charAt(0) !== x.charAt(0))
      return 0;
    for (var w = 0, q = Math.min(v.length, x.length), D = q, C = 0; w < D; )
      v.substring(C, D) == x.substring(C, D) ? (w = D, C = w) : q = D, D = Math.floor((q - w) / 2 + w);
    return B(v.charCodeAt(D - 1)) && D--, D;
  }
  function l(v, x) {
    var w = v.length, q = x.length;
    if (w == 0 || q == 0)
      return 0;
    w > q ? v = v.substring(w - q) : w < q && (x = x.substring(0, w));
    var D = Math.min(w, q);
    if (v == x)
      return D;
    for (var C = 0, R = 1; ; ) {
      var U = v.substring(D - R), W = x.indexOf(U);
      if (W == -1)
        return C;
      R += W, (W == 0 || v.substring(D - R) == x.substring(0, R)) && (C = R, R++);
    }
  }
  function u(v, x) {
    if (!v || !x || v.slice(-1) !== x.slice(-1))
      return 0;
    for (var w = 0, q = Math.min(v.length, x.length), D = q, C = 0; w < D; )
      v.substring(v.length - D, v.length - C) == x.substring(x.length - D, x.length - C) ? (w = D, C = w) : q = D, D = Math.floor((q - w) / 2 + w);
    return P(v.charCodeAt(v.length - D)) && D--, D;
  }
  function d(v, x) {
    var w = v.length > x.length ? v : x, q = v.length > x.length ? x : v;
    if (w.length < 4 || q.length * 2 < w.length)
      return null;
    function D(it, z, mt) {
      for (var Et = it.substring(mt, mt + Math.floor(it.length / 4)), J = -1, ct = "", dt, ut, bt, yt; (J = z.indexOf(Et, J + 1)) !== -1; ) {
        var At = a(
          it.substring(mt),
          z.substring(J)
        ), kt = u(
          it.substring(0, mt),
          z.substring(0, J)
        );
        ct.length < kt + At && (ct = z.substring(J - kt, J) + z.substring(J, J + At), dt = it.substring(0, mt - kt), ut = it.substring(mt + At), bt = z.substring(0, J - kt), yt = z.substring(J + At));
      }
      return ct.length * 2 >= it.length ? [
        dt,
        ut,
        bt,
        yt,
        ct
      ] : null;
    }
    var C = D(
      w,
      q,
      Math.ceil(w.length / 4)
    ), R = D(
      w,
      q,
      Math.ceil(w.length / 2)
    ), U;
    if (!C && !R)
      return null;
    R ? C ? U = C[4].length > R[4].length ? C : R : U = R : U = C;
    var W, j, et, Q;
    v.length > x.length ? (W = U[0], j = U[1], et = U[2], Q = U[3]) : (et = U[0], Q = U[1], W = U[2], j = U[3]);
    var ot = U[4];
    return [W, j, et, Q, ot];
  }
  function h(v) {
    for (var x = !1, w = [], q = 0, D = null, C = 0, R = 0, U = 0, W = 0, j = 0; C < v.length; )
      v[C][0] == s ? (w[q++] = C, R = W, U = j, W = 0, j = 0, D = v[C][1]) : (v[C][0] == t ? W += v[C][1].length : j += v[C][1].length, D && D.length <= Math.max(R, U) && D.length <= Math.max(W, j) && (v.splice(w[q - 1], 0, [
        e,
        D
      ]), v[w[q - 1] + 1][0] = t, q--, q--, C = q > 0 ? w[q - 1] : -1, R = 0, U = 0, W = 0, j = 0, D = null, x = !0)), C++;
    for (x && M(v), N(v), C = 1; C < v.length; ) {
      if (v[C - 1][0] == e && v[C][0] == t) {
        var et = v[C - 1][1], Q = v[C][1], ot = l(et, Q), it = l(Q, et);
        ot >= it ? (ot >= et.length / 2 || ot >= Q.length / 2) && (v.splice(C, 0, [
          s,
          Q.substring(0, ot)
        ]), v[C - 1][1] = et.substring(
          0,
          et.length - ot
        ), v[C + 1][1] = Q.substring(ot), C++) : (it >= et.length / 2 || it >= Q.length / 2) && (v.splice(C, 0, [
          s,
          et.substring(0, it)
        ]), v[C - 1][0] = t, v[C - 1][1] = Q.substring(
          0,
          Q.length - it
        ), v[C + 1][0] = e, v[C + 1][1] = et.substring(it), C++), C++;
      }
      C++;
    }
  }
  var b = /[^a-zA-Z0-9]/, y = /\s/, E = /[\r\n]/, A = /\n\r?\n$/, O = /^\r?\n\r?\n/;
  function N(v) {
    function x(it, z) {
      if (!it || !z)
        return 6;
      var mt = it.charAt(it.length - 1), Et = z.charAt(0), J = mt.match(b), ct = Et.match(b), dt = J && mt.match(y), ut = ct && Et.match(y), bt = dt && mt.match(E), yt = ut && Et.match(E), At = bt && it.match(A), kt = yt && z.match(O);
      return At || kt ? 5 : bt || yt ? 4 : J && !dt && ut ? 3 : dt || ut ? 2 : J || ct ? 1 : 0;
    }
    for (var w = 1; w < v.length - 1; ) {
      if (v[w - 1][0] == s && v[w + 1][0] == s) {
        var q = v[w - 1][1], D = v[w][1], C = v[w + 1][1], R = u(q, D);
        if (R) {
          var U = D.substring(D.length - R);
          q = q.substring(0, q.length - R), D = U + D.substring(0, D.length - R), C = U + C;
        }
        for (var W = q, j = D, et = C, Q = x(q, D) + x(D, C); D.charAt(0) === C.charAt(0); ) {
          q += D.charAt(0), D = D.substring(1) + C.charAt(0), C = C.substring(1);
          var ot = x(q, D) + x(D, C);
          ot >= Q && (Q = ot, W = q, j = D, et = C);
        }
        v[w - 1][1] != W && (W ? v[w - 1][1] = W : (v.splice(w - 1, 1), w--), v[w][1] = j, et ? v[w + 1][1] = et : (v.splice(w + 1, 1), w--));
      }
      w++;
    }
  }
  function M(v, x) {
    v.push([s, ""]);
    for (var w = 0, q = 0, D = 0, C = "", R = "", U; w < v.length; ) {
      if (w < v.length - 1 && !v[w][1]) {
        v.splice(w, 1);
        continue;
      }
      switch (v[w][0]) {
        case t:
          D++, R += v[w][1], w++;
          break;
        case e:
          q++, C += v[w][1], w++;
          break;
        case s:
          var W = w - D - q - 1;
          if (x) {
            if (W >= 0 && X(v[W][1])) {
              var j = v[W][1].slice(-1);
              if (v[W][1] = v[W][1].slice(
                0,
                -1
              ), C = j + C, R = j + R, !v[W][1]) {
                v.splice(W, 1), w--;
                var et = W - 1;
                v[et] && v[et][0] === t && (D++, R = v[et][1] + R, et--), v[et] && v[et][0] === e && (q++, C = v[et][1] + C, et--), W = et;
              }
            }
            if (V(v[w][1])) {
              var j = v[w][1].charAt(0);
              v[w][1] = v[w][1].slice(1), C += j, R += j;
            }
          }
          if (w < v.length - 1 && !v[w][1]) {
            v.splice(w, 1);
            break;
          }
          if (C.length > 0 || R.length > 0) {
            C.length > 0 && R.length > 0 && (U = a(R, C), U !== 0 && (W >= 0 ? v[W][1] += R.substring(
              0,
              U
            ) : (v.splice(0, 0, [
              s,
              R.substring(0, U)
            ]), w++), R = R.substring(U), C = C.substring(U)), U = u(R, C), U !== 0 && (v[w][1] = R.substring(R.length - U) + v[w][1], R = R.substring(
              0,
              R.length - U
            ), C = C.substring(
              0,
              C.length - U
            )));
            var Q = D + q;
            C.length === 0 && R.length === 0 ? (v.splice(w - Q, Q), w = w - Q) : C.length === 0 ? (v.splice(w - Q, Q, [t, R]), w = w - Q + 1) : R.length === 0 ? (v.splice(w - Q, Q, [e, C]), w = w - Q + 1) : (v.splice(
              w - Q,
              Q,
              [e, C],
              [t, R]
            ), w = w - Q + 2);
          }
          w !== 0 && v[w - 1][0] === s ? (v[w - 1][1] += v[w][1], v.splice(w, 1)) : w++, D = 0, q = 0, C = "", R = "";
          break;
      }
    }
    v[v.length - 1][1] === "" && v.pop();
    var ot = !1;
    for (w = 1; w < v.length - 1; )
      v[w - 1][0] === s && v[w + 1][0] === s && (v[w][1].substring(
        v[w][1].length - v[w - 1][1].length
      ) === v[w - 1][1] ? (v[w][1] = v[w - 1][1] + v[w][1].substring(
        0,
        v[w][1].length - v[w - 1][1].length
      ), v[w + 1][1] = v[w - 1][1] + v[w + 1][1], v.splice(w - 1, 1), ot = !0) : v[w][1].substring(0, v[w + 1][1].length) == v[w + 1][1] && (v[w - 1][1] += v[w + 1][1], v[w][1] = v[w][1].substring(v[w + 1][1].length) + v[w + 1][1], v.splice(w + 1, 1), ot = !0)), w++;
    ot && M(v, x);
  }
  function B(v) {
    return v >= 55296 && v <= 56319;
  }
  function P(v) {
    return v >= 56320 && v <= 57343;
  }
  function V(v) {
    return P(v.charCodeAt(0));
  }
  function X(v) {
    return B(v.charCodeAt(v.length - 1));
  }
  function nt(v) {
    for (var x = [], w = 0; w < v.length; w++)
      v[w][1].length > 0 && x.push(v[w]);
    return x;
  }
  function lt(v, x, w, q) {
    return X(v) || V(q) ? null : nt([
      [s, v],
      [e, x],
      [t, w],
      [s, q]
    ]);
  }
  function vt(v, x, w) {
    var q = typeof w == "number" ? { index: w, length: 0 } : w.oldRange, D = typeof w == "number" ? null : w.newRange, C = v.length, R = x.length;
    if (q.length === 0 && (D === null || D.length === 0)) {
      var U = q.index, W = v.slice(0, U), j = v.slice(U), et = D ? D.index : null;
      t: {
        var Q = U + R - C;
        if (et !== null && et !== Q || Q < 0 || Q > R)
          break t;
        var ot = x.slice(0, Q), it = x.slice(Q);
        if (it !== j)
          break t;
        var z = Math.min(U, Q), mt = W.slice(0, z), Et = ot.slice(0, z);
        if (mt !== Et)
          break t;
        var J = W.slice(z), ct = ot.slice(z);
        return lt(mt, J, ct, j);
      }
      t: {
        if (et !== null && et !== U)
          break t;
        var dt = U, ot = x.slice(0, dt), it = x.slice(dt);
        if (ot !== W)
          break t;
        var ut = Math.min(C - dt, R - dt), bt = j.slice(j.length - ut), yt = it.slice(it.length - ut);
        if (bt !== yt)
          break t;
        var J = j.slice(0, j.length - ut), ct = it.slice(0, it.length - ut);
        return lt(W, J, ct, bt);
      }
    }
    if (q.length > 0 && D && D.length === 0)
      t: {
        var mt = v.slice(0, q.index), bt = v.slice(q.index + q.length), z = mt.length, ut = bt.length;
        if (R < z + ut)
          break t;
        var Et = x.slice(0, z), yt = x.slice(R - ut);
        if (mt !== Et || bt !== yt)
          break t;
        var J = v.slice(z, C - ut), ct = x.slice(z, R - ut);
        return lt(mt, J, ct, bt);
      }
    return null;
  }
  function ht(v, x, w, q) {
    return n(v, x, w, q, !0);
  }
  return ht.INSERT = t, ht.DELETE = e, ht.EQUAL = s, Qo = ht, Qo;
}
var ii = { exports: {} };
ii.exports;
var Bc;
function td() {
  return Bc || (Bc = 1, function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", l = "[object Date]", u = "[object Error]", d = "[object Function]", h = "[object GeneratorFunction]", b = "[object Map]", y = "[object Number]", E = "[object Object]", A = "[object Promise]", O = "[object RegExp]", N = "[object Set]", M = "[object String]", B = "[object Symbol]", P = "[object WeakMap]", V = "[object ArrayBuffer]", X = "[object DataView]", nt = "[object Float32Array]", lt = "[object Float64Array]", vt = "[object Int8Array]", ht = "[object Int16Array]", v = "[object Int32Array]", x = "[object Uint8Array]", w = "[object Uint8ClampedArray]", q = "[object Uint16Array]", D = "[object Uint32Array]", C = /[\\^$.*+?()[\]{}|]/g, R = /\w*$/, U = /^\[object .+?Constructor\]$/, W = /^(?:0|[1-9]\d*)$/, j = {};
    j[r] = j[o] = j[V] = j[X] = j[a] = j[l] = j[nt] = j[lt] = j[vt] = j[ht] = j[v] = j[b] = j[y] = j[E] = j[O] = j[N] = j[M] = j[B] = j[x] = j[w] = j[q] = j[D] = !0, j[u] = j[d] = j[P] = !1;
    var et = typeof as == "object" && as && as.Object === Object && as, Q = typeof self == "object" && self && self.Object === Object && self, ot = et || Q || Function("return this")(), it = t && !t.nodeType && t, z = it && !0 && e && !e.nodeType && e, mt = z && z.exports === it;
    function Et(c, p) {
      return c.set(p[0], p[1]), c;
    }
    function J(c, p) {
      return c.add(p), c;
    }
    function ct(c, p) {
      for (var _ = -1, k = c ? c.length : 0; ++_ < k && p(c[_], _, c) !== !1; )
        ;
      return c;
    }
    function dt(c, p) {
      for (var _ = -1, k = p.length, rt = c.length; ++_ < k; )
        c[rt + _] = p[_];
      return c;
    }
    function ut(c, p, _, k) {
      for (var rt = -1, Y = c ? c.length : 0; ++rt < Y; )
        _ = p(_, c[rt], rt, c);
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
      return c.forEach(function(k, rt) {
        _[++p] = [rt, k];
      }), _;
    }
    function ss(c, p) {
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
    var Dn = Array.prototype, qn = Function.prototype, Vt = Object.prototype, we = ot["__core-js_shared__"], Es = function() {
      var c = /[^.]+$/.exec(we && we.keys && we.keys.IE_PROTO || "");
      return c ? "Symbol(src)_1." + c : "";
    }(), ws = qn.toString, jt = Vt.hasOwnProperty, qe = Vt.toString, Gs = RegExp(
      "^" + ws.call(jt).replace(C, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Te = mt ? ot.Buffer : void 0, Be = ot.Symbol, Bn = ot.Uint8Array, Yt = ss(Object.getPrototypeOf, Object), Ri = Object.create, Di = Vt.propertyIsEnumerable, Gr = Dn.splice, Pn = Object.getOwnPropertySymbols, Ys = Te ? Te.isBuffer : void 0, qi = ss(Object.keys, Object), Xs = le(ot, "DataView"), Ts = le(ot, "Map"), ae = le(ot, "Promise"), Zs = le(ot, "Set"), Vn = le(ot, "WeakMap"), As = le(Object, "create"), jn = qt(Xs), Os = qt(Ts), Fn = qt(ae), Un = qt(Zs), Hn = qt(Vn), ns = Be ? Be.prototype : void 0, Bi = ns ? ns.valueOf : void 0;
    function Pe(c) {
      var p = -1, _ = c ? c.length : 0;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function Yr() {
      this.__data__ = As ? As(null) : {};
    }
    function Xr(c) {
      return this.has(c) && delete this.__data__[c];
    }
    function Zr(c) {
      var p = this.__data__;
      if (As) {
        var _ = p[c];
        return _ === n ? void 0 : _;
      }
      return jt.call(p, c) ? p[c] : void 0;
    }
    function Pi(c) {
      var p = this.__data__;
      return As ? p[c] !== void 0 : jt.call(p, c);
    }
    function Wn(c, p) {
      var _ = this.__data__;
      return _[c] = As && p === void 0 ? n : p, this;
    }
    Pe.prototype.clear = Yr, Pe.prototype.delete = Xr, Pe.prototype.get = Zr, Pe.prototype.has = Pi, Pe.prototype.set = Wn;
    function St(c) {
      var p = -1, _ = c ? c.length : 0;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function Qr() {
      this.__data__ = [];
    }
    function Jr(c) {
      var p = this.__data__, _ = Js(p, c);
      if (_ < 0)
        return !1;
      var k = p.length - 1;
      return _ == k ? p.pop() : Gr.call(p, _, 1), !0;
    }
    function to(c) {
      var p = this.__data__, _ = Js(p, c);
      return _ < 0 ? void 0 : p[_][1];
    }
    function eo(c) {
      return Js(this.__data__, c) > -1;
    }
    function so(c, p) {
      var _ = this.__data__, k = Js(_, c);
      return k < 0 ? _.push([c, p]) : _[k][1] = p, this;
    }
    St.prototype.clear = Qr, St.prototype.delete = Jr, St.prototype.get = to, St.prototype.has = eo, St.prototype.set = so;
    function xt(c) {
      var p = -1, _ = c ? c.length : 0;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function no() {
      this.__data__ = {
        hash: new Pe(),
        map: new (Ts || St)(),
        string: new Pe()
      };
    }
    function io(c) {
      return ks(this, c).delete(c);
    }
    function ro(c) {
      return ks(this, c).get(c);
    }
    function oo(c) {
      return ks(this, c).has(c);
    }
    function ao(c, p) {
      return ks(this, c).set(c, p), this;
    }
    xt.prototype.clear = no, xt.prototype.delete = io, xt.prototype.get = ro, xt.prototype.has = oo, xt.prototype.set = ao;
    function Ft(c) {
      this.__data__ = new St(c);
    }
    function lo() {
      this.__data__ = new St();
    }
    function co(c) {
      return this.__data__.delete(c);
    }
    function uo(c) {
      return this.__data__.get(c);
    }
    function ho(c) {
      return this.__data__.has(c);
    }
    function fo(c, p) {
      var _ = this.__data__;
      if (_ instanceof St) {
        var k = _.__data__;
        if (!Ts || k.length < s - 1)
          return k.push([c, p]), this;
        _ = this.__data__ = new xt(k);
      }
      return _.set(c, p), this;
    }
    Ft.prototype.clear = lo, Ft.prototype.delete = co, Ft.prototype.get = uo, Ft.prototype.has = ho, Ft.prototype.set = fo;
    function Qs(c, p) {
      var _ = Yn(c) || en(c) ? bt(c.length, String) : [], k = _.length, rt = !!k;
      for (var Y in c)
        jt.call(c, Y) && !(rt && (Y == "length" || ko(Y, k))) && _.push(Y);
      return _;
    }
    function Vi(c, p, _) {
      var k = c[p];
      (!(jt.call(c, p) && Wi(k, _)) || _ === void 0 && !(p in c)) && (c[p] = _);
    }
    function Js(c, p) {
      for (var _ = c.length; _--; )
        if (Wi(c[_][0], p))
          return _;
      return -1;
    }
    function Ae(c, p) {
      return c && Gn(p, Zn(p), c);
    }
    function zn(c, p, _, k, rt, Y, gt) {
      var ft;
      if (k && (ft = Y ? k(c, rt, Y, gt) : k(c)), ft !== void 0)
        return ft;
      if (!Ne(c))
        return c;
      var Ot = Yn(c);
      if (Ot) {
        if (ft = Oo(c), !p)
          return wo(c, ft);
      } else {
        var _t = je(c), $t = _t == d || _t == h;
        if (zi(c))
          return tn(c, p);
        if (_t == E || _t == r || $t && !Y) {
          if (At(c))
            return Y ? c : {};
          if (ft = Oe($t ? {} : c), !p)
            return To(c, Ae(ft, c));
        } else {
          if (!j[_t])
            return Y ? c : {};
          ft = No(c, _t, zn, p);
        }
      }
      gt || (gt = new Ft());
      var Ut = gt.get(c);
      if (Ut)
        return Ut;
      if (gt.set(c, ft), !Ot)
        var Nt = _ ? Ao(c) : Zn(c);
      return ct(Nt || c, function(Mt, Ct) {
        Nt && (Ct = Mt, Mt = c[Ct]), Vi(ft, Ct, zn(Mt, p, _, k, Ct, c, gt));
      }), ft;
    }
    function po(c) {
      return Ne(c) ? Ri(c) : {};
    }
    function go(c, p, _) {
      var k = p(c);
      return Yn(c) ? k : dt(k, _(c));
    }
    function mo(c) {
      return qe.call(c);
    }
    function bo(c) {
      if (!Ne(c) || Co(c))
        return !1;
      var p = Xn(c) || At(c) ? Gs : U;
      return p.test(qt(c));
    }
    function yo(c) {
      if (!Ui(c))
        return qi(c);
      var p = [];
      for (var _ in Object(c))
        jt.call(c, _) && _ != "constructor" && p.push(_);
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
    function ji(c, p, _) {
      var k = p ? _(kt(c), !0) : kt(c);
      return ut(k, Et, new c.constructor());
    }
    function Fi(c) {
      var p = new c.constructor(c.source, R.exec(c));
      return p.lastIndex = c.lastIndex, p;
    }
    function vo(c, p, _) {
      var k = p ? _(_s(c), !0) : _s(c);
      return ut(k, J, new c.constructor());
    }
    function _o(c) {
      return Bi ? Object(Bi.call(c)) : {};
    }
    function Eo(c, p) {
      var _ = p ? Kn(c.buffer) : c.buffer;
      return new c.constructor(_, c.byteOffset, c.length);
    }
    function wo(c, p) {
      var _ = -1, k = c.length;
      for (p || (p = Array(k)); ++_ < k; )
        p[_] = c[_];
      return p;
    }
    function Gn(c, p, _, k) {
      _ || (_ = {});
      for (var rt = -1, Y = p.length; ++rt < Y; ) {
        var gt = p[rt], ft = void 0;
        Vi(_, gt, ft === void 0 ? c[gt] : ft);
      }
      return _;
    }
    function To(c, p) {
      return Gn(c, Ve(c), p);
    }
    function Ao(c) {
      return go(c, Zn, Ve);
    }
    function ks(c, p) {
      var _ = c.__data__;
      return So(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function le(c, p) {
      var _ = yt(c, p);
      return bo(_) ? _ : void 0;
    }
    var Ve = Pn ? ss(Pn, Object) : Io, je = mo;
    (Xs && je(new Xs(new ArrayBuffer(1))) != X || Ts && je(new Ts()) != b || ae && je(ae.resolve()) != A || Zs && je(new Zs()) != N || Vn && je(new Vn()) != P) && (je = function(c) {
      var p = qe.call(c), _ = p == E ? c.constructor : void 0, k = _ ? qt(_) : void 0;
      if (k)
        switch (k) {
          case jn:
            return X;
          case Os:
            return b;
          case Fn:
            return A;
          case Un:
            return N;
          case Hn:
            return P;
        }
      return p;
    });
    function Oo(c) {
      var p = c.length, _ = c.constructor(p);
      return p && typeof c[0] == "string" && jt.call(c, "index") && (_.index = c.index, _.input = c.input), _;
    }
    function Oe(c) {
      return typeof c.constructor == "function" && !Ui(c) ? po(Yt(c)) : {};
    }
    function No(c, p, _, k) {
      var rt = c.constructor;
      switch (p) {
        case V:
          return Kn(c);
        case a:
        case l:
          return new rt(+c);
        case X:
          return Ns(c, k);
        case nt:
        case lt:
        case vt:
        case ht:
        case v:
        case x:
        case w:
        case q:
        case D:
          return Eo(c, k);
        case b:
          return ji(c, k, _);
        case y:
        case M:
          return new rt(c);
        case O:
          return Fi(c);
        case N:
          return vo(c, k, _);
        case B:
          return _o(c);
      }
    }
    function ko(c, p) {
      return p = p ?? i, !!p && (typeof c == "number" || W.test(c)) && c > -1 && c % 1 == 0 && c < p;
    }
    function So(c) {
      var p = typeof c;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? c !== "__proto__" : c === null;
    }
    function Co(c) {
      return !!Es && Es in c;
    }
    function Ui(c) {
      var p = c && c.constructor, _ = typeof p == "function" && p.prototype || Vt;
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
      return zn(c, !0, !0);
    }
    function Wi(c, p) {
      return c === p || c !== c && p !== p;
    }
    function en(c) {
      return Lo(c) && jt.call(c, "callee") && (!Di.call(c, "callee") || qe.call(c) == r);
    }
    var Yn = Array.isArray;
    function sn(c) {
      return c != null && Ki(c.length) && !Xn(c);
    }
    function Lo(c) {
      return Gi(c) && sn(c);
    }
    var zi = Ys || xo;
    function Xn(c) {
      var p = Ne(c) ? qe.call(c) : "";
      return p == d || p == h;
    }
    function Ki(c) {
      return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
    }
    function Ne(c) {
      var p = typeof c;
      return !!c && (p == "object" || p == "function");
    }
    function Gi(c) {
      return !!c && typeof c == "object";
    }
    function Zn(c) {
      return sn(c) ? Qs(c) : yo(c);
    }
    function Io() {
      return [];
    }
    function xo() {
      return !1;
    }
    e.exports = Hi;
  }(ii, ii.exports)), ii.exports;
}
var ri = { exports: {} };
ri.exports;
var Pc;
function ed() {
  return Pc || (Pc = 1, function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", u = "[object AsyncFunction]", d = "[object Boolean]", h = "[object Date]", b = "[object Error]", y = "[object Function]", E = "[object GeneratorFunction]", A = "[object Map]", O = "[object Number]", N = "[object Null]", M = "[object Object]", B = "[object Promise]", P = "[object Proxy]", V = "[object RegExp]", X = "[object Set]", nt = "[object String]", lt = "[object Symbol]", vt = "[object Undefined]", ht = "[object WeakMap]", v = "[object ArrayBuffer]", x = "[object DataView]", w = "[object Float32Array]", q = "[object Float64Array]", D = "[object Int8Array]", C = "[object Int16Array]", R = "[object Int32Array]", U = "[object Uint8Array]", W = "[object Uint8ClampedArray]", j = "[object Uint16Array]", et = "[object Uint32Array]", Q = /[\\^$.*+?()[\]{}|]/g, ot = /^\[object .+?Constructor\]$/, it = /^(?:0|[1-9]\d*)$/, z = {};
    z[w] = z[q] = z[D] = z[C] = z[R] = z[U] = z[W] = z[j] = z[et] = !0, z[a] = z[l] = z[v] = z[d] = z[x] = z[h] = z[b] = z[y] = z[A] = z[O] = z[M] = z[V] = z[X] = z[nt] = z[ht] = !1;
    var mt = typeof as == "object" && as && as.Object === Object && as, Et = typeof self == "object" && self && self.Object === Object && self, J = mt || Et || Function("return this")(), ct = t && !t.nodeType && t, dt = ct && !0 && e && !e.nodeType && e, ut = dt && dt.exports === ct, bt = ut && mt.process, yt = function() {
      try {
        return bt && bt.binding && bt.binding("util");
      } catch {
      }
    }(), At = yt && yt.isTypedArray;
    function kt(c, p) {
      for (var _ = -1, k = c == null ? 0 : c.length, rt = 0, Y = []; ++_ < k; ) {
        var gt = c[_];
        p(gt, _, c) && (Y[rt++] = gt);
      }
      return Y;
    }
    function ss(c, p) {
      for (var _ = -1, k = p.length, rt = c.length; ++_ < k; )
        c[rt + _] = p[_];
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
    function Vt(c, p) {
      return c.has(p);
    }
    function we(c, p) {
      return c == null ? void 0 : c[p];
    }
    function Es(c) {
      var p = -1, _ = Array(c.size);
      return c.forEach(function(k, rt) {
        _[++p] = [rt, k];
      }), _;
    }
    function ws(c, p) {
      return function(_) {
        return c(p(_));
      };
    }
    function jt(c) {
      var p = -1, _ = Array(c.size);
      return c.forEach(function(k) {
        _[++p] = k;
      }), _;
    }
    var qe = Array.prototype, Gs = Function.prototype, Te = Object.prototype, Be = J["__core-js_shared__"], Bn = Gs.toString, Yt = Te.hasOwnProperty, Ri = function() {
      var c = /[^.]+$/.exec(Be && Be.keys && Be.keys.IE_PROTO || "");
      return c ? "Symbol(src)_1." + c : "";
    }(), Di = Te.toString, Gr = RegExp(
      "^" + Bn.call(Yt).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Pn = ut ? J.Buffer : void 0, Ys = J.Symbol, qi = J.Uint8Array, Xs = Te.propertyIsEnumerable, Ts = qe.splice, ae = Ys ? Ys.toStringTag : void 0, Zs = Object.getOwnPropertySymbols, Vn = Pn ? Pn.isBuffer : void 0, As = ws(Object.keys, Object), jn = Ve(J, "DataView"), Os = Ve(J, "Map"), Fn = Ve(J, "Promise"), Un = Ve(J, "Set"), Hn = Ve(J, "WeakMap"), ns = Ve(Object, "create"), Bi = qt(jn), Pe = qt(Os), Yr = qt(Fn), Xr = qt(Un), Zr = qt(Hn), Pi = Ys ? Ys.prototype : void 0, Wn = Pi ? Pi.valueOf : void 0;
    function St(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function Qr() {
      this.__data__ = ns ? ns(null) : {}, this.size = 0;
    }
    function Jr(c) {
      var p = this.has(c) && delete this.__data__[c];
      return this.size -= p ? 1 : 0, p;
    }
    function to(c) {
      var p = this.__data__;
      if (ns) {
        var _ = p[c];
        return _ === n ? void 0 : _;
      }
      return Yt.call(p, c) ? p[c] : void 0;
    }
    function eo(c) {
      var p = this.__data__;
      return ns ? p[c] !== void 0 : Yt.call(p, c);
    }
    function so(c, p) {
      var _ = this.__data__;
      return this.size += this.has(c) ? 0 : 1, _[c] = ns && p === void 0 ? n : p, this;
    }
    St.prototype.clear = Qr, St.prototype.delete = Jr, St.prototype.get = to, St.prototype.has = eo, St.prototype.set = so;
    function xt(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function no() {
      this.__data__ = [], this.size = 0;
    }
    function io(c) {
      var p = this.__data__, _ = tn(p, c);
      if (_ < 0)
        return !1;
      var k = p.length - 1;
      return _ == k ? p.pop() : Ts.call(p, _, 1), --this.size, !0;
    }
    function ro(c) {
      var p = this.__data__, _ = tn(p, c);
      return _ < 0 ? void 0 : p[_][1];
    }
    function oo(c) {
      return tn(this.__data__, c) > -1;
    }
    function ao(c, p) {
      var _ = this.__data__, k = tn(_, c);
      return k < 0 ? (++this.size, _.push([c, p])) : _[k][1] = p, this;
    }
    xt.prototype.clear = no, xt.prototype.delete = io, xt.prototype.get = ro, xt.prototype.has = oo, xt.prototype.set = ao;
    function Ft(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.clear(); ++p < _; ) {
        var k = c[p];
        this.set(k[0], k[1]);
      }
    }
    function lo() {
      this.size = 0, this.__data__ = {
        hash: new St(),
        map: new (Os || xt)(),
        string: new St()
      };
    }
    function co(c) {
      var p = le(this, c).delete(c);
      return this.size -= p ? 1 : 0, p;
    }
    function uo(c) {
      return le(this, c).get(c);
    }
    function ho(c) {
      return le(this, c).has(c);
    }
    function fo(c, p) {
      var _ = le(this, c), k = _.size;
      return _.set(c, p), this.size += _.size == k ? 0 : 1, this;
    }
    Ft.prototype.clear = lo, Ft.prototype.delete = co, Ft.prototype.get = uo, Ft.prototype.has = ho, Ft.prototype.set = fo;
    function Qs(c) {
      var p = -1, _ = c == null ? 0 : c.length;
      for (this.__data__ = new Ft(); ++p < _; )
        this.add(c[p]);
    }
    function Vi(c) {
      return this.__data__.set(c, n), this;
    }
    function Js(c) {
      return this.__data__.has(c);
    }
    Qs.prototype.add = Qs.prototype.push = Vi, Qs.prototype.has = Js;
    function Ae(c) {
      var p = this.__data__ = new xt(c);
      this.size = p.size;
    }
    function zn() {
      this.__data__ = new xt(), this.size = 0;
    }
    function po(c) {
      var p = this.__data__, _ = p.delete(c);
      return this.size = p.size, _;
    }
    function go(c) {
      return this.__data__.get(c);
    }
    function mo(c) {
      return this.__data__.has(c);
    }
    function bo(c, p) {
      var _ = this.__data__;
      if (_ instanceof xt) {
        var k = _.__data__;
        if (!Os || k.length < s - 1)
          return k.push([c, p]), this.size = ++_.size, this;
        _ = this.__data__ = new Ft(k);
      }
      return _.set(c, p), this.size = _.size, this;
    }
    Ae.prototype.clear = zn, Ae.prototype.delete = po, Ae.prototype.get = go, Ae.prototype.has = mo, Ae.prototype.set = bo;
    function yo(c, p) {
      var _ = en(c), k = !_ && Wi(c), rt = !_ && !k && sn(c), Y = !_ && !k && !rt && Gi(c), gt = _ || k || rt || Y, ft = gt ? Dn(c.length, String) : [], Ot = ft.length;
      for (var _t in c)
        Yt.call(c, _t) && !(gt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (_t == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        rt && (_t == "offset" || _t == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Y && (_t == "buffer" || _t == "byteLength" || _t == "byteOffset") || // Skip index properties.
        No(_t, Ot))) && ft.push(_t);
      return ft;
    }
    function tn(c, p) {
      for (var _ = c.length; _--; )
        if (Hi(c[_][0], p))
          return _;
      return -1;
    }
    function Kn(c, p, _) {
      var k = p(c);
      return en(c) ? k : ss(k, _(c));
    }
    function Ns(c) {
      return c == null ? c === void 0 ? vt : N : ae && ae in Object(c) ? je(c) : Ui(c);
    }
    function ji(c) {
      return Ne(c) && Ns(c) == a;
    }
    function Fi(c, p, _, k, rt) {
      return c === p ? !0 : c == null || p == null || !Ne(c) && !Ne(p) ? c !== c && p !== p : vo(c, p, _, k, Fi, rt);
    }
    function vo(c, p, _, k, rt, Y) {
      var gt = en(c), ft = en(p), Ot = gt ? l : Oe(c), _t = ft ? l : Oe(p);
      Ot = Ot == a ? M : Ot, _t = _t == a ? M : _t;
      var $t = Ot == M, Ut = _t == M, Nt = Ot == _t;
      if (Nt && sn(c)) {
        if (!sn(p))
          return !1;
        gt = !0, $t = !1;
      }
      if (Nt && !$t)
        return Y || (Y = new Ae()), gt || Gi(c) ? Gn(c, p, _, k, rt, Y) : To(c, p, Ot, _, k, rt, Y);
      if (!(_ & i)) {
        var Mt = $t && Yt.call(c, "__wrapped__"), Ct = Ut && Yt.call(p, "__wrapped__");
        if (Mt || Ct) {
          var is = Mt ? c.value() : c, Fe = Ct ? p.value() : p;
          return Y || (Y = new Ae()), rt(is, Fe, _, k, Y);
        }
      }
      return Nt ? (Y || (Y = new Ae()), Ao(c, p, _, k, rt, Y)) : !1;
    }
    function _o(c) {
      if (!Ki(c) || So(c))
        return !1;
      var p = zi(c) ? Gr : ot;
      return p.test(qt(c));
    }
    function Eo(c) {
      return Ne(c) && Xn(c.length) && !!z[Ns(c)];
    }
    function wo(c) {
      if (!Co(c))
        return As(c);
      var p = [];
      for (var _ in Object(c))
        Yt.call(c, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function Gn(c, p, _, k, rt, Y) {
      var gt = _ & i, ft = c.length, Ot = p.length;
      if (ft != Ot && !(gt && Ot > ft))
        return !1;
      var _t = Y.get(c);
      if (_t && Y.get(p))
        return _t == p;
      var $t = -1, Ut = !0, Nt = _ & r ? new Qs() : void 0;
      for (Y.set(c, p), Y.set(p, c); ++$t < ft; ) {
        var Mt = c[$t], Ct = p[$t];
        if (k)
          var is = gt ? k(Ct, Mt, $t, p, c, Y) : k(Mt, Ct, $t, c, p, Y);
        if (is !== void 0) {
          if (is)
            continue;
          Ut = !1;
          break;
        }
        if (Nt) {
          if (!_s(p, function(Fe, Ss) {
            if (!Vt(Nt, Ss) && (Mt === Fe || rt(Mt, Fe, _, k, Y)))
              return Nt.push(Ss);
          })) {
            Ut = !1;
            break;
          }
        } else if (!(Mt === Ct || rt(Mt, Ct, _, k, Y))) {
          Ut = !1;
          break;
        }
      }
      return Y.delete(c), Y.delete(p), Ut;
    }
    function To(c, p, _, k, rt, Y, gt) {
      switch (_) {
        case x:
          if (c.byteLength != p.byteLength || c.byteOffset != p.byteOffset)
            return !1;
          c = c.buffer, p = p.buffer;
        case v:
          return !(c.byteLength != p.byteLength || !Y(new qi(c), new qi(p)));
        case d:
        case h:
        case O:
          return Hi(+c, +p);
        case b:
          return c.name == p.name && c.message == p.message;
        case V:
        case nt:
          return c == p + "";
        case A:
          var ft = Es;
        case X:
          var Ot = k & i;
          if (ft || (ft = jt), c.size != p.size && !Ot)
            return !1;
          var _t = gt.get(c);
          if (_t)
            return _t == p;
          k |= r, gt.set(c, p);
          var $t = Gn(ft(c), ft(p), k, rt, Y, gt);
          return gt.delete(c), $t;
        case lt:
          if (Wn)
            return Wn.call(c) == Wn.call(p);
      }
      return !1;
    }
    function Ao(c, p, _, k, rt, Y) {
      var gt = _ & i, ft = ks(c), Ot = ft.length, _t = ks(p), $t = _t.length;
      if (Ot != $t && !gt)
        return !1;
      for (var Ut = Ot; Ut--; ) {
        var Nt = ft[Ut];
        if (!(gt ? Nt in p : Yt.call(p, Nt)))
          return !1;
      }
      var Mt = Y.get(c);
      if (Mt && Y.get(p))
        return Mt == p;
      var Ct = !0;
      Y.set(c, p), Y.set(p, c);
      for (var is = gt; ++Ut < Ot; ) {
        Nt = ft[Ut];
        var Fe = c[Nt], Ss = p[Nt];
        if (k)
          var kl = gt ? k(Ss, Fe, Nt, p, c, Y) : k(Fe, Ss, Nt, c, p, Y);
        if (!(kl === void 0 ? Fe === Ss || rt(Fe, Ss, _, k, Y) : kl)) {
          Ct = !1;
          break;
        }
        is || (is = Nt == "constructor");
      }
      if (Ct && !is) {
        var Yi = c.constructor, Xi = p.constructor;
        Yi != Xi && "constructor" in c && "constructor" in p && !(typeof Yi == "function" && Yi instanceof Yi && typeof Xi == "function" && Xi instanceof Xi) && (Ct = !1);
      }
      return Y.delete(c), Y.delete(p), Ct;
    }
    function ks(c) {
      return Kn(c, Zn, Oo);
    }
    function le(c, p) {
      var _ = c.__data__;
      return ko(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function Ve(c, p) {
      var _ = we(c, p);
      return _o(_) ? _ : void 0;
    }
    function je(c) {
      var p = Yt.call(c, ae), _ = c[ae];
      try {
        c[ae] = void 0;
        var k = !0;
      } catch {
      }
      var rt = Di.call(c);
      return k && (p ? c[ae] = _ : delete c[ae]), rt;
    }
    var Oo = Zs ? function(c) {
      return c == null ? [] : (c = Object(c), kt(Zs(c), function(p) {
        return Xs.call(c, p);
      }));
    } : Io, Oe = Ns;
    (jn && Oe(new jn(new ArrayBuffer(1))) != x || Os && Oe(new Os()) != A || Fn && Oe(Fn.resolve()) != B || Un && Oe(new Un()) != X || Hn && Oe(new Hn()) != ht) && (Oe = function(c) {
      var p = Ns(c), _ = p == M ? c.constructor : void 0, k = _ ? qt(_) : "";
      if (k)
        switch (k) {
          case Bi:
            return x;
          case Pe:
            return A;
          case Yr:
            return B;
          case Xr:
            return X;
          case Zr:
            return ht;
        }
      return p;
    });
    function No(c, p) {
      return p = p ?? o, !!p && (typeof c == "number" || it.test(c)) && c > -1 && c % 1 == 0 && c < p;
    }
    function ko(c) {
      var p = typeof c;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? c !== "__proto__" : c === null;
    }
    function So(c) {
      return !!Ri && Ri in c;
    }
    function Co(c) {
      var p = c && c.constructor, _ = typeof p == "function" && p.prototype || Te;
      return c === _;
    }
    function Ui(c) {
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
    var Wi = ji(/* @__PURE__ */ function() {
      return arguments;
    }()) ? ji : function(c) {
      return Ne(c) && Yt.call(c, "callee") && !Xs.call(c, "callee");
    }, en = Array.isArray;
    function Yn(c) {
      return c != null && Xn(c.length) && !zi(c);
    }
    var sn = Vn || xo;
    function Lo(c, p) {
      return Fi(c, p);
    }
    function zi(c) {
      if (!Ki(c))
        return !1;
      var p = Ns(c);
      return p == y || p == E || p == u || p == P;
    }
    function Xn(c) {
      return typeof c == "number" && c > -1 && c % 1 == 0 && c <= o;
    }
    function Ki(c) {
      var p = typeof c;
      return c != null && (p == "object" || p == "function");
    }
    function Ne(c) {
      return c != null && typeof c == "object";
    }
    var Gi = At ? qn(At) : Eo;
    function Zn(c) {
      return Yn(c) ? yo(c) : wo(c);
    }
    function Io() {
      return [];
    }
    function xo() {
      return !1;
    }
    e.exports = Lo;
  }(ri, ri.exports)), ri.exports;
}
var or = {}, Vc;
function N_() {
  if (Vc) return or;
  Vc = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = td(), t = ed();
  var s;
  return function(n) {
    function i(l = {}, u = {}, d = !1) {
      typeof l != "object" && (l = {}), typeof u != "object" && (u = {});
      let h = e(u);
      d || (h = Object.keys(h).reduce((b, y) => (h[y] != null && (b[y] = h[y]), b), {}));
      for (const b in l)
        l[b] !== void 0 && u[b] === void 0 && (h[b] = l[b]);
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.compose = i;
    function r(l = {}, u = {}) {
      typeof l != "object" && (l = {}), typeof u != "object" && (u = {});
      const d = Object.keys(l).concat(Object.keys(u)).reduce((h, b) => (t(l[b], u[b]) || (h[b] = u[b] === void 0 ? null : u[b]), h), {});
      return Object.keys(d).length > 0 ? d : void 0;
    }
    n.diff = r;
    function o(l = {}, u = {}) {
      l = l || {};
      const d = Object.keys(u).reduce((h, b) => (u[b] !== l[b] && l[b] !== void 0 && (h[b] = u[b]), h), {});
      return Object.keys(l).reduce((h, b) => (l[b] !== u[b] && u[b] === void 0 && (h[b] = null), h), d);
    }
    n.invert = o;
    function a(l, u, d = !1) {
      if (typeof l != "object")
        return u;
      if (typeof u != "object")
        return;
      if (!d)
        return u;
      const h = Object.keys(u).reduce((b, y) => (l[y] === void 0 && (b[y] = u[y]), b), {});
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.transform = a;
  }(s || (s = {})), or.default = s, or;
}
var ar = {}, jc;
function sd() {
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
var lr = {}, Fc;
function k_() {
  if (Fc) return lr;
  Fc = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = sd();
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
          const a = {};
          return i.attributes && (a.attributes = i.attributes), typeof i.retain == "number" ? a.retain = n : typeof i.retain == "object" && i.retain !== null ? a.retain = i.retain : typeof i.insert == "string" ? a.insert = i.insert.substr(r, n) : a.insert = i.insert, a;
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
function S_() {
  return Uc || (Uc = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
    const s = O_(), n = td(), i = ed(), r = N_();
    t.AttributeMap = r.default;
    const o = sd();
    t.Op = o.default;
    const a = k_();
    t.OpIterator = a.default;
    const l = "\0", u = (h, b) => {
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      if (typeof b != "object" || b === null)
        throw new Error(`cannot retain a ${typeof b}`);
      const y = Object.keys(h)[0];
      if (!y || y !== Object.keys(b)[0])
        throw new Error(`embed types not matched: ${y} != ${Object.keys(b)[0]}`);
      return [y, h[y], b[y]];
    };
    class d {
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
        const E = {};
        return typeof b == "string" && b.length === 0 ? this : (E.insert = b, y != null && typeof y == "object" && Object.keys(y).length > 0 && (E.attributes = y), this.push(E));
      }
      delete(b) {
        return b <= 0 ? this : this.push({ delete: b });
      }
      retain(b, y) {
        if (typeof b == "number" && b <= 0)
          return this;
        const E = { retain: b };
        return y != null && typeof y == "object" && Object.keys(y).length > 0 && (E.attributes = y), this.push(E);
      }
      push(b) {
        let y = this.ops.length, E = this.ops[y - 1];
        if (b = n(b), typeof E == "object") {
          if (typeof b.delete == "number" && typeof E.delete == "number")
            return this.ops[y - 1] = { delete: E.delete + b.delete }, this;
          if (typeof E.delete == "number" && b.insert != null && (y -= 1, E = this.ops[y - 1], typeof E != "object"))
            return this.ops.unshift(b), this;
          if (i(b.attributes, E.attributes)) {
            if (typeof b.insert == "string" && typeof E.insert == "string")
              return this.ops[y - 1] = { insert: E.insert + b.insert }, typeof b.attributes == "object" && (this.ops[y - 1].attributes = b.attributes), this;
            if (typeof b.retain == "number" && typeof E.retain == "number")
              return this.ops[y - 1] = { retain: E.retain + b.retain }, typeof b.attributes == "object" && (this.ops[y - 1].attributes = b.attributes), this;
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
        const y = [], E = [];
        return this.forEach((A) => {
          (b(A) ? y : E).push(A);
        }), [y, E];
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
        const E = [], A = new a.default(this.ops);
        let O = 0;
        for (; O < y && A.hasNext(); ) {
          let N;
          O < b ? N = A.next(b - O) : (N = A.next(y - O), E.push(N)), O += o.default.length(N);
        }
        return new d(E);
      }
      compose(b) {
        const y = new a.default(this.ops), E = new a.default(b.ops), A = [], O = E.peek();
        if (O != null && typeof O.retain == "number" && O.attributes == null) {
          let M = O.retain;
          for (; y.peekType() === "insert" && y.peekLength() <= M; )
            M -= y.peekLength(), A.push(y.next());
          O.retain - M > 0 && E.next(O.retain - M);
        }
        const N = new d(A);
        for (; y.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            N.push(E.next());
          else if (y.peekType() === "delete")
            N.push(y.next());
          else {
            const M = Math.min(y.peekLength(), E.peekLength()), B = y.next(M), P = E.next(M);
            if (P.retain) {
              const V = {};
              if (typeof B.retain == "number")
                V.retain = typeof P.retain == "number" ? M : P.retain;
              else if (typeof P.retain == "number")
                B.retain == null ? V.insert = B.insert : V.retain = B.retain;
              else {
                const nt = B.retain == null ? "insert" : "retain", [lt, vt, ht] = u(B[nt], P.retain), v = d.getHandler(lt);
                V[nt] = {
                  [lt]: v.compose(vt, ht, nt === "retain")
                };
              }
              const X = r.default.compose(B.attributes, P.attributes, typeof B.retain == "number");
              if (X && (V.attributes = X), N.push(V), !E.hasNext() && i(N.ops[N.ops.length - 1], V)) {
                const nt = new d(y.rest());
                return N.concat(nt).chop();
              }
            } else typeof P.delete == "number" && (typeof B.retain == "number" || typeof B.retain == "object" && B.retain !== null) && N.push(P);
          }
        return N.chop();
      }
      concat(b) {
        const y = new d(this.ops.slice());
        return b.ops.length > 0 && (y.push(b.ops[0]), y.ops = y.ops.concat(b.ops.slice(1))), y;
      }
      diff(b, y) {
        if (this.ops === b.ops)
          return new d();
        const E = [this, b].map((B) => B.map((P) => {
          if (P.insert != null)
            return typeof P.insert == "string" ? P.insert : l;
          const V = B === b ? "on" : "with";
          throw new Error("diff() called " + V + " non-document");
        }).join("")), A = new d(), O = s(E[0], E[1], y, !0), N = new a.default(this.ops), M = new a.default(b.ops);
        return O.forEach((B) => {
          let P = B[1].length;
          for (; P > 0; ) {
            let V = 0;
            switch (B[0]) {
              case s.INSERT:
                V = Math.min(M.peekLength(), P), A.push(M.next(V));
                break;
              case s.DELETE:
                V = Math.min(P, N.peekLength()), N.next(V), A.delete(V);
                break;
              case s.EQUAL:
                V = Math.min(N.peekLength(), M.peekLength(), P);
                const X = N.next(V), nt = M.next(V);
                i(X.insert, nt.insert) ? A.retain(V, r.default.diff(X.attributes, nt.attributes)) : A.push(nt).delete(V);
                break;
            }
            P -= V;
          }
        }), A.chop();
      }
      eachLine(b, y = `
`) {
        const E = new a.default(this.ops);
        let A = new d(), O = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const N = E.peek(), M = o.default.length(N) - E.peekLength(), B = typeof N.insert == "string" ? N.insert.indexOf(y, M) - M : -1;
          if (B < 0)
            A.push(E.next());
          else if (B > 0)
            A.push(E.next(B));
          else {
            if (b(A, E.next(1).attributes || {}, O) === !1)
              return;
            O += 1, A = new d();
          }
        }
        A.length() > 0 && b(A, {}, O);
      }
      invert(b) {
        const y = new d();
        return this.reduce((E, A) => {
          if (A.insert)
            y.delete(o.default.length(A));
          else {
            if (typeof A.retain == "number" && A.attributes == null)
              return y.retain(A.retain), E + A.retain;
            if (A.delete || typeof A.retain == "number") {
              const O = A.delete || A.retain;
              return b.slice(E, E + O).forEach((M) => {
                A.delete ? y.push(M) : A.retain && A.attributes && y.retain(o.default.length(M), r.default.invert(A.attributes, M.attributes));
              }), E + O;
            } else if (typeof A.retain == "object" && A.retain !== null) {
              const O = b.slice(E, E + 1), N = new a.default(O.ops).next(), [M, B, P] = u(A.retain, N.insert), V = d.getHandler(M);
              return y.retain({ [M]: V.invert(B, P) }, r.default.invert(A.attributes, N.attributes)), E + 1;
            }
          }
          return E;
        }, 0), y.chop();
      }
      transform(b, y = !1) {
        if (y = !!y, typeof b == "number")
          return this.transformPosition(b, y);
        const E = b, A = new a.default(this.ops), O = new a.default(E.ops), N = new d();
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
              const V = B.retain, X = P.retain;
              let nt = typeof X == "object" && X !== null ? X : M;
              if (typeof V == "object" && V !== null && typeof X == "object" && X !== null) {
                const lt = Object.keys(V)[0];
                if (lt === Object.keys(X)[0]) {
                  const vt = d.getHandler(lt);
                  vt && (nt = {
                    [lt]: vt.transform(V[lt], X[lt], y)
                  });
                }
              }
              N.retain(nt, r.default.transform(B.attributes, P.attributes, y));
            }
          }
        return N.chop();
      }
      transformPosition(b, y = !1) {
        y = !!y;
        const E = new a.default(this.ops);
        let A = 0;
        for (; E.hasNext() && A <= b; ) {
          const O = E.peekLength(), N = E.peekType();
          if (E.next(), N === "delete") {
            b -= Math.min(O, b - A);
            continue;
          } else N === "insert" && (A < b || !y) && (b += O);
          A += O;
        }
        return b;
      }
    }
    d.Op = o.default, d.OpIterator = a.default, d.AttributeMap = r.default, d.handlers = {}, t.default = d, e.exports = d, e.exports.default = d;
  }(rr, rr.exports)), rr.exports;
}
var ee = S_();
const K = /* @__PURE__ */ Jh(ee);
class _e extends Gt {
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
_e.blotName = "break";
_e.tagName = "BR";
let be = class extends Cr {
};
const C_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Wr(e) {
  return e.replace(/[&<>"']/g, (t) => C_[t]);
}
const Se = class Se extends gl {
  static compare(t, s) {
    const n = Se.order.indexOf(t), i = Se.order.indexOf(s);
    return n >= 0 || i >= 0 ? n - i : t === s ? 0 : t < s ? -1 : 1;
  }
  formatAt(t, s, n, i) {
    if (Se.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, G.BLOT)) {
      const r = this.isolate(t, s);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, s, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof Se && Se.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const s = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(s), s.wrap(this);
    }
  }
};
F(Se, "allowedChildren", [Se, _e, Gt, be]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
F(Se, "order", [
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
let Re = Se;
const Hc = 1;
class It extends yi {
  constructor() {
    super(...arguments);
    F(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = nd(this)), this.cache.delta;
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
    let a = this;
    r.reduce((l, u) => (a = a.split(l, !0), a.insertAt(0, u), u.length), s + o.length);
  }
  insertBefore(s, n) {
    const {
      head: i
    } = this.children;
    super.insertBefore(s, n), i instanceof _e && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Hc), this.cache.length;
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
    if (n && (s === 0 || s >= this.length() - Hc)) {
      const r = this.clone();
      return s === 0 ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r);
    }
    const i = super.split(s, n);
    return this.cache = {}, i;
  }
}
It.blotName = "block";
It.tagName = "P";
It.defaultChild = _e;
It.allowedChildren = [_e, Re, Gt, be];
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
`), r = i.pop(), o = i.map((l) => {
      const u = this.scroll.create(It.blotName);
      return u.insertAt(0, l), u;
    }), a = this.split(t);
    o.forEach((l) => {
      this.parent.insertBefore(l, a);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), a);
  }
}
te.scope = G.BLOCK_BLOT;
function nd(e) {
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
    const s = this.prev instanceof be ? this.prev : null, n = s ? s.length() : 0, i = this.next instanceof be ? this.next : null, r = i ? i.text : "", {
      textNode: o
    } = this, a = o.data.split(Zt.CONTENTS).join("");
    o.data = Zt.CONTENTS;
    let l;
    if (s)
      l = s, (a || i) && (s.insertAt(s.length(), a + r), i && i.remove());
    else if (i)
      l = i, i.insertAt(0, a);
    else {
      const u = document.createTextNode(a);
      l = this.scroll.create(u), this.parent.insertBefore(l, this);
    }
    if (this.remove(), t) {
      const u = (b, y) => s && b === s.domNode ? y : b === o ? n + y - 1 : i && b === i.domNode ? n + a.length + y : null, d = u(t.start.node, t.start.offset), h = u(t.end.node, t.end.offset);
      if (d !== null && h !== null)
        return {
          startNode: l.domNode,
          startOffset: d,
          endNode: l.domNode,
          endOffset: h
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
F(Zt, "blotName", "cursor"), F(Zt, "className", "ql-cursor"), F(Zt, "tagName", "span"), F(Zt, "CONTENTS", "\uFEFF");
let Cn = Zt;
var Jo = { exports: {} }, Wc;
function L_() {
  return Wc || (Wc = 1, function(e) {
    var t = Object.prototype.hasOwnProperty, s = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (s = !1));
    function i(l, u, d) {
      this.fn = l, this.context = u, this.once = d || !1;
    }
    function r(l, u, d, h, b) {
      if (typeof d != "function")
        throw new TypeError("The listener must be a function");
      var y = new i(d, h || l, b), E = s ? s + u : u;
      return l._events[E] ? l._events[E].fn ? l._events[E] = [l._events[E], y] : l._events[E].push(y) : (l._events[E] = y, l._eventsCount++), l;
    }
    function o(l, u) {
      --l._eventsCount === 0 ? l._events = new n() : delete l._events[u];
    }
    function a() {
      this._events = new n(), this._eventsCount = 0;
    }
    a.prototype.eventNames = function() {
      var u = [], d, h;
      if (this._eventsCount === 0) return u;
      for (h in d = this._events)
        t.call(d, h) && u.push(s ? h.slice(1) : h);
      return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(d)) : u;
    }, a.prototype.listeners = function(u) {
      var d = s ? s + u : u, h = this._events[d];
      if (!h) return [];
      if (h.fn) return [h.fn];
      for (var b = 0, y = h.length, E = new Array(y); b < y; b++)
        E[b] = h[b].fn;
      return E;
    }, a.prototype.listenerCount = function(u) {
      var d = s ? s + u : u, h = this._events[d];
      return h ? h.fn ? 1 : h.length : 0;
    }, a.prototype.emit = function(u, d, h, b, y, E) {
      var A = s ? s + u : u;
      if (!this._events[A]) return !1;
      var O = this._events[A], N = arguments.length, M, B;
      if (O.fn) {
        switch (O.once && this.removeListener(u, O.fn, void 0, !0), N) {
          case 1:
            return O.fn.call(O.context), !0;
          case 2:
            return O.fn.call(O.context, d), !0;
          case 3:
            return O.fn.call(O.context, d, h), !0;
          case 4:
            return O.fn.call(O.context, d, h, b), !0;
          case 5:
            return O.fn.call(O.context, d, h, b, y), !0;
          case 6:
            return O.fn.call(O.context, d, h, b, y, E), !0;
        }
        for (B = 1, M = new Array(N - 1); B < N; B++)
          M[B - 1] = arguments[B];
        O.fn.apply(O.context, M);
      } else {
        var P = O.length, V;
        for (B = 0; B < P; B++)
          switch (O[B].once && this.removeListener(u, O[B].fn, void 0, !0), N) {
            case 1:
              O[B].fn.call(O[B].context);
              break;
            case 2:
              O[B].fn.call(O[B].context, d);
              break;
            case 3:
              O[B].fn.call(O[B].context, d, h);
              break;
            case 4:
              O[B].fn.call(O[B].context, d, h, b);
              break;
            default:
              if (!M) for (V = 1, M = new Array(N - 1); V < N; V++)
                M[V - 1] = arguments[V];
              O[B].fn.apply(O[B].context, M);
          }
      }
      return !0;
    }, a.prototype.on = function(u, d, h) {
      return r(this, u, d, h, !1);
    }, a.prototype.once = function(u, d, h) {
      return r(this, u, d, h, !0);
    }, a.prototype.removeListener = function(u, d, h, b) {
      var y = s ? s + u : u;
      if (!this._events[y]) return this;
      if (!d)
        return o(this, y), this;
      var E = this._events[y];
      if (E.fn)
        E.fn === d && (!b || E.once) && (!h || E.context === h) && o(this, y);
      else {
        for (var A = 0, O = [], N = E.length; A < N; A++)
          (E[A].fn !== d || b && !E[A].once || h && E[A].context !== h) && O.push(E[A]);
        O.length ? this._events[y] = O.length === 1 ? O[0] : O : o(this, y);
      }
      return this;
    }, a.prototype.removeAllListeners = function(u) {
      var d;
      return u ? (d = s ? s + u : u, this._events[d] && o(this, d)) : (this._events = new n(), this._eventsCount = 0), this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = s, a.EventEmitter = a, e.exports = a;
  }(Jo)), Jo.exports;
}
var I_ = L_();
const x_ = /* @__PURE__ */ Jh(I_), ka = /* @__PURE__ */ new WeakMap(), Sa = ["error", "warn", "log", "info"];
let Ca = "warn";
function id(e) {
  if (Ca && Sa.indexOf(e) <= Sa.indexOf(Ca)) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    console[e](...s);
  }
}
function es(e) {
  return Sa.reduce((t, s) => (t[s] = id.bind(console, s, e), t), {});
}
es.level = (e) => {
  Ca = e;
};
id.level = es.level;
const ta = es("quill:events"), $_ = ["selectionchange", "mousedown", "mouseup", "click"];
$_.forEach((e) => {
  document.addEventListener(e, function() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = ka.get(i);
      r && r.emitter && r.emitter.handleDOM(...s);
    });
  });
});
class H extends x_ {
  constructor() {
    super(), this.domListeners = {}, this.on("error", ta.error);
  }
  emit() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    return ta.log.call(ta, ...s), super.emit(...s);
  }
  handleDOM(t) {
    for (var s = arguments.length, n = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
      n[i - 1] = arguments[i];
    (this.domListeners[t.type] || []).forEach((r) => {
      let {
        node: o,
        handler: a
      } = r;
      (t.target === o || o.contains(t.target)) && a(t, ...n);
    });
  }
  listenDOM(t, s, n) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: s,
      handler: n
    });
  }
}
F(H, "events", {
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
}), F(H, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const ea = es("quill:selection");
class Bs {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = s;
  }
}
class M_ {
  constructor(t, s) {
    this.emitter = s, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Bs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, H.sources.USER), 1);
    }), this.emitter.on(H.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(H.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((a) => a.type === "characterData" || a.type === "childList" || a.type === "attributes" && a.target === this.root);
          this.update(o ? H.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(H.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: a,
          endOffset: l
        } = i.range;
        this.setNativeRange(r, o, a, l), this.update(H.sources.SILENT);
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
      const [d] = this.scroll.leaf(t + 1);
      if (d) {
        const [h] = this.scroll.line(t), [b] = this.scroll.line(t + 1);
        h === b && (r = d, o = 0);
      }
    }
    [i, o] = r.position(o, !0);
    const a = document.createRange();
    if (s > 0)
      return a.setStart(i, o), [r, o] = this.scroll.leaf(t + s), r == null ? null : ([i, o] = r.position(o, !0), a.setEnd(i, o), a.getBoundingClientRect());
    let l = "left", u;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      o < i.data.length ? (a.setStart(i, o), a.setEnd(i, o + 1)) : (a.setStart(i, o - 1), a.setEnd(i, o), l = "right"), u = a.getBoundingClientRect();
    } else {
      if (!(r.domNode instanceof Element)) return null;
      u = r.domNode.getBoundingClientRect(), o > 0 && (l = "right");
    }
    return {
      bottom: u.top + u.height,
      height: u.height,
      left: u[l],
      right: u[l],
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
    return ea.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const s = this.getNativeRange();
    return s == null ? [null, null] : [this.normalizedToRange(s), s];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && sa(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const s = [[t.start.node, t.start.offset]];
    t.native.collapsed || s.push([t.end.node, t.end.offset]);
    const n = s.map((o) => {
      const [a, l] = o, u = this.scroll.find(a, !0), d = u.offset(this.scroll);
      return l === 0 ? d : u instanceof Rt ? d + u.index(a, l) : d + u.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Bs(r, i - r);
  }
  normalizeNative(t) {
    if (!sa(this.root, t.startContainer) || !t.collapsed && !sa(this.root, t.endContainer))
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
      const [o, a] = this.scroll.leaf(i);
      return o ? o.position(a, r) : [null, -1];
    };
    return [...n(t.index, !1), ...n(t.index + t.length, !0)];
  }
  setNativeRange(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ea.info("setNativeRange", t, s, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
    n.parentNode == null))
      return;
    const o = document.getSelection();
    if (o != null)
      if (t != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: a
        } = this.getNativeRange() || {};
        if (a == null || r || t !== a.startContainer || s !== a.startOffset || n !== a.endContainer || i !== a.endOffset) {
          t instanceof Element && t.tagName === "BR" && (s = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), n instanceof Element && n.tagName === "BR" && (i = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
          const l = document.createRange();
          l.setStart(t, s), l.setEnd(n, i), o.removeAllRanges(), o.addRange(l);
        }
      } else
        o.removeAllRanges(), this.root.blur();
  }
  setRange(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    if (typeof s == "string" && (n = s, s = !1), ea.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, s);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const s = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !pl(s, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [H.events.SELECTION_CHANGE, yn(this.lastRange), yn(s), t];
      this.emitter.emit(H.events.EDITOR_CHANGE, ...r), t !== H.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function sa(e, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return e.contains(t);
}
const R_ = /^[ -~]*$/;
class D_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let s = this.scroll.length();
    this.scroll.batchStart();
    const n = zc(t), i = new K();
    return B_(n.ops.slice()).reduce((o, a) => {
      const l = ee.Op.length(a);
      let u = a.attributes || {}, d = !1, h = !1;
      if (a.insert != null) {
        if (i.retain(l), typeof a.insert == "string") {
          const E = a.insert;
          h = !E.endsWith(`
`) && (s <= o || !!this.scroll.descendant(te, o)[0]), this.scroll.insertAt(o, E);
          const [A, O] = this.scroll.line(o);
          let N = us({}, Qt(A));
          if (A instanceof It) {
            const [M] = A.descendant(Rt, O);
            M && (N = us(N, Qt(M)));
          }
          u = ee.AttributeMap.diff(N, u) || {};
        } else if (typeof a.insert == "object") {
          const E = Object.keys(a.insert)[0];
          if (E == null) return o;
          const A = this.scroll.query(E, G.INLINE) != null;
          if (A)
            (s <= o || this.scroll.descendant(te, o)[0]) && (h = !0);
          else if (o > 0) {
            const [O, N] = this.scroll.descendant(Rt, o - 1);
            O instanceof be ? O.value()[N] !== `
` && (d = !0) : O instanceof Gt && O.statics.scope === G.INLINE_BLOT && (d = !0);
          }
          if (this.scroll.insertAt(o, E, a.insert[E]), A) {
            const [O] = this.scroll.descendant(Rt, o);
            if (O) {
              const N = us({}, Qt(O));
              u = ee.AttributeMap.diff(N, u) || {};
            }
          }
        }
        s += l;
      } else if (i.push(a), a.retain !== null && typeof a.retain == "object") {
        const E = Object.keys(a.retain)[0];
        if (E == null) return o;
        this.scroll.updateEmbedAt(o, E, a.retain[E]);
      }
      Object.keys(u).forEach((E) => {
        this.scroll.formatAt(o, l, E, u[E]);
      });
      const b = d ? 1 : 0, y = h ? 1 : 0;
      return s += b + y, i.retain(b), i.delete(y), o + l + b + y;
    }, 0), i.reduce((o, a) => typeof a.delete == "number" ? (this.scroll.deleteAt(o, a.delete), o) : o + ee.Op.length(a), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
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
    s === 0 ? this.scroll.path(t).forEach((a) => {
      const [l] = a;
      l instanceof It ? n.push(l) : l instanceof Rt && i.push(l);
    }) : (n = this.scroll.lines(t, s), i = this.scroll.descendants(Rt, t, s));
    const [r, o] = [n, i].map((a) => {
      const l = a.shift();
      if (l == null) return {};
      let u = Qt(l);
      for (; Object.keys(u).length > 0; ) {
        const d = a.shift();
        if (d == null) return u;
        u = q_(Qt(d), u);
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
    return s.children.length > 1 ? !1 : s.children.head instanceof _e;
  }
  removeFormat(t, s) {
    const n = this.getText(t, s), [i, r] = this.scroll.line(t + s);
    let o = 0, a = new K();
    i != null && (o = i.length() - r, a = i.delta().slice(r, r + o - 1).insert(`
`));
    const u = this.getContents(t, s + o).diff(new K().insert(n).concat(a)), d = new K().retain(t).concat(u);
    return this.applyDelta(d);
  }
  update(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (s.length === 1 && s[0].type === "characterData" && // @ts-expect-error Fix me later
    s[0].target.data.match(R_) && this.scroll.find(s[0].target)) {
      const r = this.scroll.find(s[0].target), o = Qt(r), a = r.offset(this.scroll), l = s[0].oldValue.replace(Cn.CONTENTS, ""), u = new K().insert(l), d = new K().insert(r.value()), h = n && {
        oldRange: Kc(n.oldRange, -a),
        newRange: Kc(n.newRange, -a)
      };
      t = new K().retain(a).concat(u.diff(d, h)).reduce((y, E) => E.insert ? y.insert(E.insert, o) : y.push(E), new K()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !pl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function fn(e, t, s) {
  if (e.length === 0) {
    const [y] = na(s.pop());
    return t <= 0 ? `</li></${y}>` : `</li></${y}>${fn([], t - 1, s)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: a
  }, ...l] = e, [u, d] = na(a);
  if (o > t)
    return s.push(a), o === t + 1 ? `<${u}><li${d}>${vi(n, i, r)}${fn(l, o, s)}` : `<${u}><li>${fn(e, t + 1, s)}`;
  const h = s[s.length - 1];
  if (o === t && a === h)
    return `</li><li${d}>${vi(n, i, r)}${fn(l, o, s)}`;
  const [b] = na(s.pop());
  return `</li></${b}>${fn(e, t - 1, s)}`;
}
function vi(e, t, s) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in e && typeof e.html == "function")
    return e.html(t, s);
  if (e instanceof be)
    return Wr(e.value().slice(t, t + s)).replaceAll(" ", "&nbsp;");
  if (e instanceof me) {
    if (e.statics.blotName === "list-container") {
      const u = [];
      return e.children.forEachAt(t, s, (d, h, b) => {
        const y = "formats" in d && typeof d.formats == "function" ? d.formats() : {};
        u.push({
          child: d,
          offset: h,
          length: b,
          indent: y.indent || 0,
          type: y.list
        });
      }), fn(u, -1, []);
    }
    const i = [];
    if (e.children.forEachAt(t, s, (u, d, h) => {
      i.push(vi(u, d, h));
    }), n || e.statics.blotName === "list")
      return i.join("");
    const {
      outerHTML: r,
      innerHTML: o
    } = e.domNode, [a, l] = r.split(`>${o}<`);
    return a === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${l}` : `${a}>${i.join("")}<${l}`;
  }
  return e.domNode instanceof Element ? e.domNode.outerHTML : "";
}
function q_(e, t) {
  return Object.keys(t).reduce((s, n) => {
    if (e[n] == null) return s;
    const i = t[n];
    return i === e[n] ? s[n] = i : Array.isArray(i) ? i.indexOf(e[n]) < 0 ? s[n] = i.concat([e[n]]) : s[n] = i : s[n] = [i, e[n]], s;
  }, {});
}
function na(e) {
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
function Kc(e, t) {
  let {
    index: s,
    length: n
  } = e;
  return new Bs(s + t, n);
}
function B_(e) {
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
class Ee {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = s;
  }
}
F(Ee, "DEFAULTS", {});
const cr = "\uFEFF";
class bl extends Gt {
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
      if (this.prev instanceof be) {
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
    else t === this.rightGuard && (this.next instanceof be ? (this.next.insertAt(0, i), s = {
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
class P_ {
  constructor(t, s) {
    F(this, "isComposing", !1);
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
    s && !(s instanceof bl) && (this.emitter.emit(H.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(H.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(H.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(H.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const di = class di {
  constructor(t, s) {
    F(this, "modules", {});
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
F(di, "DEFAULTS", {
  modules: {}
}), F(di, "themes", {
  default: di
});
let Ln = di;
const V_ = (e) => e.parentElement || e.getRootNode().host || null, j_ = (e) => {
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
}, Gc = (e, t, s, n, i, r) => e < s && t > n ? 0 : e < s ? -(s - e + i) : t > n ? t - e > n - s ? e + i - s : t - n + r : 0, F_ = (e, t) => {
  var r, o, a;
  const s = e.ownerDocument;
  let n = t, i = e;
  for (; i; ) {
    const l = i === s.body, u = l ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? s.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? s.documentElement.clientHeight,
      left: 0
    } : j_(i), d = getComputedStyle(i), h = Gc(n.left, n.right, u.left, u.right, ur(d.scrollPaddingLeft), ur(d.scrollPaddingRight)), b = Gc(n.top, n.bottom, u.top, u.bottom, ur(d.scrollPaddingTop), ur(d.scrollPaddingBottom));
    if (h || b)
      if (l)
        (a = s.defaultView) == null || a.scrollBy(h, b);
      else {
        const {
          scrollLeft: y,
          scrollTop: E
        } = i;
        b && (i.scrollTop += b), h && (i.scrollLeft += h);
        const A = i.scrollLeft - y, O = i.scrollTop - E;
        n = {
          left: n.left - A,
          top: n.top - O,
          right: n.right - A,
          bottom: n.bottom - O
        };
      }
    i = l || d.position === "fixed" ? null : V_(i);
  }
}, U_ = 100, H_ = ["block", "break", "cursor", "inline", "scroll", "text"], W_ = (e, t, s) => {
  const n = new Sn();
  return H_.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), e.forEach((i) => {
    let r = t.query(i);
    r || s.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > U_) {
        s.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, _n = es("quill"), hr = new Sn();
me.uiClass = "ql-ui";
const ue = class ue {
  static debug(t) {
    t === !0 && (t = "log"), es.level(t);
  }
  static find(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return ka.get(t) || hr.find(t, s);
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
      this.imports[t] != null && !n && _n.warn(`Overwriting ${t} with`, s), this.imports[t] = s, (t.startsWith("blots/") || t.startsWith("formats/")) && s && typeof s != "boolean" && s.blotName !== "abstract" && hr.register(s), typeof s.register == "function" && s.register(hr);
    }
  }
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = z_(t, s), this.container = this.options.container, this.container == null) {
      _n.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && ue.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", ka.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new H();
    const i = ml.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new D_(this.scroll), this.selection = new M_(this.scroll, this.emitter), this.composition = new P_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(H.events.EDITOR_CHANGE, (o) => {
      o === H.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(H.events.SCROLL_UPDATE, (o, a) => {
      const l = this.selection.lastRange, [u] = this.selection.getRange(), d = l && u ? {
        oldRange: l,
        newRange: u
      } : void 0;
      ce.call(this, () => this.editor.update(null, a, d), o);
    }), this.emitter.on(H.events.SCROLL_EMBED_UPDATE, (o, a) => {
      const l = this.selection.lastRange, [u] = this.selection.getRange(), d = l && u ? {
        oldRange: l,
        newRange: u
      } : void 0;
      ce.call(this, () => {
        const h = new K().retain(o.offset(this)).retain({
          [o.statics.blotName]: a
        });
        return this.editor.update(h, [], d);
      }, ue.sources.USER);
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
    return [t, s, , n] = Ue(t, s, n), ce.call(this, () => this.editor.deleteText(t, s), n, t, -1 * s);
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
    return ce.call(this, () => {
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
    ), ce.call(this, () => this.editor.formatLine(t, s, o), r, t, 0);
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
    ), ce.call(this, () => this.editor.formatText(t, s, o), r, t, 0);
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
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ue.sources.API;
    return ce.call(this, () => this.editor.insertEmbed(t, s, n), i, t);
  }
  insertText(t, s, n, i, r) {
    let o;
    return [t, , o, r] = Ue(t, 0, n, i, r), ce.call(this, () => this.editor.insertText(t, s, o), r, t, s.length);
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
    return [t, s, , n] = Ue(t, s, n), ce.call(this, () => this.editor.removeFormat(t, s), n, t);
  }
  scrollRectIntoView(t) {
    F_(this.root, t);
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
    return ce.call(this, () => {
      t = new K(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, s);
  }
  setSelection(t, s, n) {
    t == null ? this.selection.setRange(null, s || ue.sources.API) : ([t, s, , n] = Ue(t, s, n), this.selection.setRange(new Bs(Math.max(0, t), s), n), n !== H.sources.SILENT && this.scrollSelectionIntoView());
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
    return ce.call(this, () => (t = new K(t), this.editor.applyDelta(t)), s, !0);
  }
};
F(ue, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: hr,
  theme: "default"
}), F(ue, "events", H.events), F(ue, "sources", H.sources), F(ue, "version", "2.0.3"), F(ue, "imports", {
  delta: K,
  parchment: A_,
  "core/module": Ee,
  "core/theme": Ln
});
let L = ue;
function Yc(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function ia(e) {
  return Object.entries(e ?? {}).reduce((t, s) => {
    let [n, i] = s;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Xc(e) {
  return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
}
function z_(e, t) {
  const s = Yc(e);
  if (!s)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === L.DEFAULTS.theme ? Ln : L.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = L.DEFAULTS, {
    modules: a,
    ...l
  } = i.DEFAULTS;
  let u = ia(t.modules);
  u != null && u.toolbar && u.toolbar.constructor !== Object && (u = {
    ...u,
    toolbar: {
      container: u.toolbar
    }
  });
  const d = us({}, ia(r), ia(a), u), h = {
    ...o,
    ...Xc(l),
    ...Xc(t)
  };
  let b = t.registry;
  return b ? t.formats && _n.warn('Ignoring "formats" option because "registry" is specified') : b = t.formats ? W_(t.formats, h.registry, _n) : h.registry, {
    ...h,
    registry: b,
    container: s,
    theme: i,
    modules: Object.entries(d).reduce((y, E) => {
      let [A, O] = E;
      if (!O) return y;
      const N = L.import(`modules/${A}`);
      return N == null ? (_n.error(`Cannot load ${A} module. Are you sure you registered it?`), y) : {
        ...y,
        // @ts-expect-error
        [A]: us({}, N.DEFAULTS || {}, O)
      };
    }, {}),
    bounds: Yc(h.bounds)
  };
}
function ce(e, t, s, n) {
  if (!this.isEnabled() && t === H.sources.USER && !this.allowReadOnlyEdits)
    return new K();
  let i = s == null ? null : this.getSelection();
  const r = this.editor.delta, o = e();
  if (i != null && (s === !0 && (s = i.index), n == null ? i = Zc(i, o, t) : n !== 0 && (i = Zc(i, s, n, t)), this.setSelection(i, H.sources.SILENT)), o.length() > 0) {
    const a = [H.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(H.events.EDITOR_CHANGE, ...a), t !== H.sources.SILENT && this.emitter.emit(...a);
  }
  return o;
}
function Ue(e, t, s, n, i) {
  let r = {};
  return typeof e.index == "number" && typeof e.length == "number" ? typeof t != "number" ? (i = n, n = s, s = t, t = e.length, e = e.index) : (t = e.length, e = e.index) : typeof t != "number" && (i = n, n = s, s = t, t = 0), typeof s == "object" ? (r = s, i = n) : typeof s == "string" && (n != null ? r[s] = n : i = s), i = i || H.sources.API, [e, t, r, i];
}
function Zc(e, t, s, n) {
  const i = typeof s == "number" ? s : 0;
  if (e == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [e.index, e.index + e.length].map((a) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(a, n !== H.sources.USER)
  )) : [r, o] = [e.index, e.index + e.length].map((a) => a < t || a === t && n === H.sources.USER ? a : i >= 0 ? a + i : Math.max(t, a + i)), new Bs(r, o - r);
}
class Ws extends Hr {
}
function Qc(e) {
  return e instanceof It || e instanceof te;
}
function Jc(e) {
  return typeof e.updateContent == "function";
}
class pn extends ml {
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
      const o = r.children.head instanceof _e ? null : r.children.head;
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
      const l = r.type === "block" && (r.delta.length() === 0 || !this.descendant(te, t)[0] && t < this.length()), u = r.type === "block" ? r.delta : new K().insert({
        [r.key]: r.value
      });
      ra(this, t, u);
      const d = r.type === "block" ? 1 : 0, h = t + u.length() + d;
      l && this.insertAt(h - 1, `
`);
      const b = Qt(this.line(t)[0]), y = ee.AttributeMap.diff(b, r.attributes) || {};
      Object.keys(y).forEach((E) => {
        this.formatAt(h - 1, 1, E, y[E]);
      }), t = h;
    }
    let [o, a] = this.children.find(t);
    if (n.length && (o && (o = o.split(a), a = 0), n.forEach((l) => {
      if (l.type === "block") {
        const u = this.createBlock(l.attributes, o || void 0);
        ra(u, 0, l.delta);
      } else {
        const u = this.create(l.key, l.value);
        this.insertBefore(u, o || void 0), Object.keys(l.attributes).forEach((d) => {
          u.format(d, l.attributes[d]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const l = o ? o.offset(o.scroll) + a : this.length();
      ra(this, l, i.delta);
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
    return t === this.length() ? this.line(t - 1) : this.descendant(Qc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let a = [], l = o;
      return i.children.forEachAt(r, o, (u, d, h) => {
        Qc(u) ? a.push(u) : u instanceof Hr && (a = a.concat(n(u, d, l))), l -= h;
      }), a;
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
      return r && !Jc(r);
    }), t.length > 0 && this.emitter.emit(H.events.SCROLL_BEFORE_UPDATE, s, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(H.events.SCROLL_UPDATE, s, t);
  }
  updateEmbedAt(t, s, n) {
    const [i] = this.descendant((r) => r instanceof te, t);
    i && i.statics.blotName === s && Jc(i) && i.updateContent(n);
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
          o.slice(0, -1).forEach((l) => {
            n.insert(l, i.attributes), s.push({
              type: "block",
              delta: n,
              attributes: i.attributes ?? {}
            }), n = new K();
          });
          const a = o[o.length - 1];
          a && n.insert(a, i.attributes);
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
    Object.entries(t).forEach((a) => {
      let [l, u] = a;
      this.query(l, G.BLOCK & G.BLOT) != null ? n = l : i[l] = u;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, s || void 0);
    const o = r.length();
    return Object.entries(i).forEach((a) => {
      let [l, u] = a;
      r.formatAt(0, o, l, u);
    }), r;
  }
}
F(pn, "blotName", "scroll"), F(pn, "className", "ql-editor"), F(pn, "tagName", "DIV"), F(pn, "defaultChild", It), F(pn, "allowedChildren", [It, te, Ws]);
function ra(e, t, s) {
  s.reduce((n, i) => {
    const r = ee.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const a = i.insert;
        e.insertAt(n, a);
        const [l] = e.descendant(Rt, n), u = Qt(l);
        o = ee.AttributeMap.diff(u, o) || {};
      } else if (typeof i.insert == "object") {
        const a = Object.keys(i.insert)[0];
        if (a == null) return n;
        if (e.insertAt(n, a, i.insert[a]), e.scroll.query(a, G.INLINE) != null) {
          const [u] = e.descendant(Rt, n), d = Qt(u);
          o = ee.AttributeMap.diff(d, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((a) => {
      e.formatAt(n, r, a, o[a]);
    }), n + r;
  }, t);
}
const yl = {
  scope: G.BLOCK,
  whitelist: ["right", "center", "justify"]
}, K_ = new Me("align", "align", yl), rd = new ve("align", "ql-align", yl), od = new vs("align", "text-align", yl);
class ad extends vs {
  value(t) {
    let s = super.value(t);
    return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${s.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : s;
  }
}
const G_ = new ve("color", "ql-color", {
  scope: G.INLINE
}), vl = new ad("color", "color", {
  scope: G.INLINE
}), Y_ = new ve("background", "ql-bg", {
  scope: G.INLINE
}), _l = new ad("background", "background-color", {
  scope: G.INLINE
});
class zs extends Ws {
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
${Wr(this.code(t, s))}
</pre>`;
  }
}
class Dt extends It {
  static register() {
    L.register(zs);
  }
}
F(Dt, "TAB", "  ");
class El extends Re {
}
El.blotName = "code";
El.tagName = "CODE";
Dt.blotName = "code-block";
Dt.className = "ql-code-block";
Dt.tagName = "DIV";
zs.blotName = "code-block-container";
zs.className = "ql-code-block-container";
zs.tagName = "DIV";
zs.allowedChildren = [Dt];
Dt.allowedChildren = [be, _e, Cn];
Dt.requiredContainer = zs;
const wl = {
  scope: G.BLOCK,
  whitelist: ["rtl"]
}, ld = new Me("direction", "dir", wl), cd = new ve("direction", "ql-direction", wl), ud = new vs("direction", "direction", wl), hd = {
  scope: G.INLINE,
  whitelist: ["serif", "monospace"]
}, dd = new ve("font", "ql-font", hd);
class X_ extends vs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const fd = new X_("font", "font-family", hd), pd = new ve("size", "ql-size", {
  scope: G.INLINE,
  whitelist: ["small", "large", "huge"]
}), gd = new vs("size", "font-size", {
  scope: G.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), Z_ = es("quill:keyboard"), Q_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class zr extends Ee {
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
    const i = tE(t);
    if (i == null) {
      Z_.warn("Attempted to add invalid keyboard binding", i);
      return;
    }
    typeof s == "function" && (s = {
      handler: s
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(i.key) ? i.key : [i.key]).forEach((o) => {
      const a = {
        ...i,
        key: o,
        ...s,
        ...n
      };
      this.bindings[a.key] = this.bindings[a.key] || [], this.bindings[a.key].push(a);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (t) => {
      if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((N) => zr.match(t, N));
      if (i.length === 0) return;
      const r = L.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [a, l] = this.quill.getLine(o.index), [u, d] = this.quill.getLeaf(o.index), [h, b] = o.length === 0 ? [u, d] : this.quill.getLeaf(o.index + o.length), y = u instanceof Cr ? u.value().slice(0, d) : "", E = h instanceof Cr ? h.value().slice(b) : "", A = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && a.length() <= 1,
        format: this.quill.getFormat(o),
        line: a,
        offset: l,
        prefix: y,
        suffix: E,
        event: t
      };
      i.some((N) => {
        if (N.collapsed != null && N.collapsed !== A.collapsed || N.empty != null && N.empty !== A.empty || N.offset != null && N.offset !== A.offset)
          return !1;
        if (Array.isArray(N.format)) {
          if (N.format.every((M) => A.format[M] == null))
            return !1;
        } else if (typeof N.format == "object" && !Object.keys(N.format).every((M) => N.format[M] === !0 ? A.format[M] != null : N.format[M] === !1 ? A.format[M] == null : pl(N.format[M], A.format[M])))
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
      const [a] = this.quill.getLine(t.index - 1);
      if (a && !(a.statics.blotName === "block" && a.length() <= 1)) {
        const u = r.formats(), d = this.quill.getFormat(t.index - 1, 1);
        if (i = ee.AttributeMap.diff(u, d) || {}, Object.keys(i).length > 0) {
          const h = new K().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(h);
        }
      }
    }
    this.quill.updateContents(o, L.sources.USER), this.quill.focus();
  }
  handleDelete(t, s) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new K().retain(t.index).delete(n);
    if (s.offset >= r.length() - 1) {
      const [a] = this.quill.getLine(t.index + 1);
      if (a) {
        const l = r.formats(), u = this.quill.getFormat(t.index, 1);
        i = ee.AttributeMap.diff(l, u) || {}, Object.keys(i).length > 0 && (o = o.retain(a.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, L.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Tl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, s) {
    const n = Object.keys(s.format).reduce((r, o) => (this.quill.scroll.query(o, G.BLOCK) && !Array.isArray(s.format[o]) && (r[o] = s.format[o]), r), {}), i = new K().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(t.index + 1, L.sources.SILENT), this.quill.focus();
  }
}
const J_ = {
  bindings: {
    bold: oa("bold"),
    italic: oa("italic"),
    underline: oa("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", L.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", L.sources.USER), !1);
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
        t.format.indent != null ? this.quill.format("indent", "-1", L.sources.USER) : t.format.list != null && this.quill.format("list", !1, L.sources.USER);
      }
    },
    "indent code-block": tu(!0),
    "outdent code-block": tu(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(e) {
        this.quill.deleteText(e.index - 1, 1, L.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(e, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const s = new K().retain(e.index).delete(e.length).insert("	");
        return this.quill.updateContents(s, L.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index + 1, L.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, L.sources.USER);
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
        t.format.indent && (s.indent = !1), this.quill.formatLine(e.index, e.length, s, L.sources.USER);
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
        this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(e.index + 1, L.sources.SILENT), this.quill.scrollSelectionIntoView();
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
        this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(e.index + 1, L.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [s, n, i, r] = t.getTable(e), o = eE(s, n, i, r);
          if (o == null) return;
          let a = s.offset();
          if (o < 0) {
            const l = new K().retain(a).insert(`
`);
            this.quill.updateContents(l, L.sources.USER), this.quill.setSelection(e.index + 1, e.length, L.sources.SILENT);
          } else if (o > 0) {
            a += s.length();
            const l = new K().retain(a).insert(`
`);
            this.quill.updateContents(l, L.sources.USER), this.quill.setSelection(a, L.sources.USER);
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
        s.shiftKey ? this.quill.setSelection(i - 1, L.sources.USER) : this.quill.setSelection(i + n.length(), L.sources.USER);
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
        this.quill.insertText(e.index, " ", L.sources.USER), this.quill.history.cutoff();
        const o = new K().retain(e.index - i).delete(s + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, L.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - s, L.sources.SILENT), !1;
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
            return this.quill.updateContents(r, L.sources.USER), this.quill.setSelection(e.index - 1, L.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": dr("ArrowLeft", !1),
    "embed left shift": dr("ArrowLeft", !0),
    "embed right": dr("ArrowRight", !1),
    "embed right shift": dr("ArrowRight", !0),
    "table down": eu(!1),
    "table up": eu(!0)
  }
};
zr.DEFAULTS = J_;
function tu(e) {
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
        this.quill.insertText(t.index, r, L.sources.USER), this.quill.setSelection(t.index + r.length, L.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: a,
        length: l
      } = t;
      o.forEach((u, d) => {
        e ? (u.insertAt(0, r), d === 0 ? a += r.length : l += r.length) : u.domNode.textContent.startsWith(r) && (u.deleteAt(0, r.length), d === 0 ? a -= r.length : l -= r.length);
      }), this.quill.update(L.sources.USER), this.quill.setSelection(a, l, L.sources.SILENT);
    }
  };
}
function dr(e, t) {
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
      return r instanceof Gt ? (e === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, L.sources.USER) : this.quill.setSelection(n.index - 1, L.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, L.sources.USER) : this.quill.setSelection(n.index + n.length + 1, L.sources.USER), !1) : !0;
    }
  };
}
function oa(e) {
  return {
    key: e[0],
    shortKey: !0,
    handler(t, s) {
      this.quill.format(e, !s.format[e], L.sources.USER);
    }
  };
}
function eu(e) {
  return {
    key: e ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(t, s) {
      const n = e ? "prev" : "next", i = s.line, r = i.parent[n];
      if (r != null) {
        if (r.statics.blotName === "table-row") {
          let o = r.children.head, a = i;
          for (; a.prev != null; )
            a = a.prev, o = o.next;
          const l = o.offset(this.quill.scroll) + Math.min(s.offset, o.length() - 1);
          this.quill.setSelection(l, 0, L.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (e ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, L.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, L.sources.USER));
      }
      return !1;
    }
  };
}
function tE(e) {
  if (typeof e == "string" || typeof e == "number")
    e = {
      key: e
    };
  else if (typeof e == "object")
    e = yn(e);
  else
    return null;
  return e.shortKey && (e[Q_] = e.shortKey, delete e.shortKey), e;
}
function Tl(e) {
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
  t.deleteText(s, L.sources.USER), Object.keys(i).length > 0 && t.formatLine(s.index, 1, i, L.sources.USER), t.setSelection(s.index, L.sources.SILENT);
}
function eE(e, t, s, n) {
  return t.prev == null && t.next == null ? s.prev == null && s.next == null ? n === 0 ? -1 : 1 : s.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const sE = /font-weight:\s*normal/, nE = ["P", "OL", "UL"], su = (e) => e && nE.includes(e.tagName), iE = (e) => {
  Array.from(e.querySelectorAll("br")).filter((t) => su(t.previousElementSibling) && su(t.nextElementSibling)).forEach((t) => {
    var s;
    (s = t.parentNode) == null || s.removeChild(t);
  });
}, rE = (e) => {
  Array.from(e.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var s;
    return (s = t.getAttribute("style")) == null ? void 0 : s.match(sE);
  }).forEach((t) => {
    var n;
    const s = e.createDocumentFragment();
    s.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(s, t);
  });
};
function oE(e) {
  e.querySelector('[id^="docs-internal-guid-"]') && (rE(e), iE(e));
}
const aE = /\bmso-list:[^;]*ignore/i, lE = /\bmso-list:[^;]*\bl(\d+)/i, cE = /\bmso-list:[^;]*\blevel(\d+)/i, uE = (e, t) => {
  const s = e.getAttribute("style"), n = s == null ? void 0 : s.match(lE);
  if (!n)
    return null;
  const i = Number(n[1]), r = s == null ? void 0 : s.match(cE), o = r ? Number(r[1]) : 1, a = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), l = t.match(a), u = l && l[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: u,
    element: e
  };
}, hE = (e) => {
  var o, a;
  const t = Array.from(e.querySelectorAll("[style*=mso-list]")), s = [], n = [];
  t.forEach((l) => {
    (l.getAttribute("style") || "").match(aE) ? s.push(l) : n.push(l);
  }), s.forEach((l) => {
    var u;
    return (u = l.parentNode) == null ? void 0 : u.removeChild(l);
  });
  const i = e.documentElement.innerHTML, r = n.map((l) => uE(l, i)).filter((l) => l);
  for (; r.length; ) {
    const l = [];
    let u = r.shift();
    for (; u; )
      l.push(u), u = r.length && ((o = r[0]) == null ? void 0 : o.element) === u.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === u.id ? r.shift() : null;
    const d = document.createElement("ul");
    l.forEach((y) => {
      const E = document.createElement("li");
      E.setAttribute("data-list", y.type), y.indent > 1 && E.setAttribute("class", `ql-indent-${y.indent - 1}`), E.innerHTML = y.element.innerHTML, d.appendChild(E);
    });
    const h = (a = l[0]) == null ? void 0 : a.element, {
      parentNode: b
    } = h ?? {};
    h && (b == null || b.replaceChild(d, h)), l.slice(1).forEach((y) => {
      let {
        element: E
      } = y;
      b == null || b.removeChild(E);
    });
  }
};
function dE(e) {
  e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && hE(e);
}
const fE = [dE, oE], pE = (e) => {
  e.documentElement && fE.forEach((t) => {
    t(e);
  });
}, gE = es("quill:clipboard"), mE = [[Node.TEXT_NODE, SE], [Node.TEXT_NODE, iu], ["br", EE], [Node.ELEMENT_NODE, iu], [Node.ELEMENT_NODE, _E], [Node.ELEMENT_NODE, vE], [Node.ELEMENT_NODE, NE], ["li", AE], ["ol, ul", OE], ["pre", wE], ["tr", kE], ["b", aa("bold")], ["i", aa("italic")], ["strike", aa("strike")], ["style", TE]], bE = [K_, ld].reduce((e, t) => (e[t.keyName] = t, e), {}), nu = [od, _l, vl, ud, fd, gd].reduce((e, t) => (e[t.keyName] = t, e), {});
class md extends Ee {
  constructor(t, s) {
    super(t, s), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], mE.concat(this.options.matchers ?? []).forEach((n) => {
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
    pE(t);
  }
  convertHTML(t) {
    const s = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(s);
    const n = s.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Al(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : L.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, s), this.quill.setSelection(0, L.sources.SILENT);
    } else {
      const i = this.convert({
        html: s,
        text: ""
      });
      this.quill.updateContents(new K().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), L.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    var o, a;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: r
    } = this.onCopy(n, s);
    (o = t.clipboardData) == null || o.setData("text/plain", r), (a = t.clipboardData) == null || a.setData("text/html", i), s && Tl({
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
    var o, a, l, u, d;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const s = this.quill.getSelection(!0);
    if (s == null) return;
    const n = (o = t.clipboardData) == null ? void 0 : o.getData("text/html");
    let i = (a = t.clipboardData) == null ? void 0 : a.getData("text/plain");
    if (!n && !i) {
      const h = (l = t.clipboardData) == null ? void 0 : l.getData("text/uri-list");
      h && (i = this.normalizeURIList(h));
    }
    const r = Array.from(((u = t.clipboardData) == null ? void 0 : u.files) || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(s, r);
      return;
    }
    if (n && r.length > 0) {
      const h = new DOMParser().parseFromString(n, "text/html");
      if (h.body.childElementCount === 1 && ((d = h.body.firstElementChild) == null ? void 0 : d.tagName) === "IMG") {
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
    gE.log("onPaste", o, {
      text: n,
      html: i
    });
    const a = new K().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(a, L.sources.USER), this.quill.setSelection(a.length() - t.length, L.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, s) {
    const n = [], i = [];
    return this.matchers.forEach((r) => {
      const [o, a] = r;
      switch (o) {
        case Node.TEXT_NODE:
          i.push(a);
          break;
        case Node.ELEMENT_NODE:
          n.push(a);
          break;
        default:
          Array.from(t.querySelectorAll(o)).forEach((l) => {
            if (s.has(l)) {
              const u = s.get(l);
              u == null || u.push(a);
            } else
              s.set(l, [a]);
          });
          break;
      }
    }), [n, i];
  }
}
F(md, "DEFAULTS", {
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
function yE(e, t) {
  return e.previousElementSibling && e.nextElementSibling && !ls(e.previousElementSibling, t) && !ls(e.nextElementSibling, t);
}
const fr = /* @__PURE__ */ new WeakMap();
function bd(e) {
  return e == null ? !1 : (fr.has(e) || (e.tagName === "PRE" ? fr.set(e, !0) : fr.set(e, bd(e.parentNode))), fr.get(e));
}
function Al(e, t, s, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, e), new K()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let a = Al(e, o, s, n, i);
    return o.nodeType === t.ELEMENT_NODE && (a = s.reduce((l, u) => u(o, l, e), a), a = (i.get(o) || []).reduce((l, u) => u(o, l, e), a)), r.concat(a);
  }, new K()) : new K();
}
function aa(e) {
  return (t, s, n) => Ks(s, e, !0, n);
}
function vE(e, t, s) {
  const n = Me.keys(e), i = ve.keys(e), r = vs.keys(e), o = {};
  return n.concat(i).concat(r).forEach((a) => {
    let l = s.query(a, G.ATTRIBUTE);
    l != null && (o[l.attrName] = l.value(e), o[l.attrName]) || (l = bE[a], l != null && (l.attrName === a || l.keyName === a) && (o[l.attrName] = l.value(e) || void 0), l = nu[a], l != null && (l.attrName === a || l.keyName === a) && (l = nu[a], o[l.attrName] = l.value(e) || void 0));
  }), Object.entries(o).reduce((a, l) => {
    let [u, d] = l;
    return Ks(a, u, d, s);
  }, t);
}
function _E(e, t, s) {
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
function EE(e, t) {
  return Ii(t, `
`) || t.insert(`
`), t;
}
function wE(e, t, s) {
  const n = s.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(e, s) : !0;
  return Ks(t, "code-block", i, s);
}
function TE() {
  return new K();
}
function AE(e, t, s) {
  const n = s.query(e);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Ii(t, `
`))
    return t;
  let i = -1, r = e.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, a) => a.insert ? a.attributes && typeof a.attributes.indent == "number" ? o.push(a) : o.insert(a.insert, {
    indent: i,
    ...a.attributes || {}
  }) : o, new K());
}
function OE(e, t, s) {
  const n = e;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Ks(t, "list", i, s);
}
function iu(e, t, s) {
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
function NE(e, t, s) {
  var r;
  const n = {}, i = e.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, a) => {
    let [l, u] = a;
    return Ks(o, l, u, s);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new K().insert("	").concat(t) : t;
}
function kE(e, t, s) {
  var i, r;
  const n = ((i = e.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? e.parentElement : (r = e.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const a = Array.from(n.querySelectorAll("tr")).indexOf(e) + 1;
    return Ks(t, "table", a, s);
  }
  return t;
}
function SE(e, t, s) {
  var i;
  let n = e.data;
  if (((i = e.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!bd(e)) {
    if (n.trim().length === 0 && n.includes(`
`) && !yE(e, s))
      return t;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (e.previousSibling == null && e.parentElement != null && ls(e.parentElement, s) || e.previousSibling instanceof Element && ls(e.previousSibling, s)) && (n = n.replace(/^ /, "")), (e.nextSibling == null && e.parentElement != null && ls(e.parentElement, s) || e.nextSibling instanceof Element && ls(e.nextSibling, s)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return t.insert(n);
}
class yd extends Ee {
  constructor(s, n) {
    super(s, n);
    F(this, "lastRecorded", 0);
    F(this, "ignoreChange", !1);
    F(this, "stack", {
      undo: [],
      redo: []
    });
    F(this, "currentRange", null);
    this.quill.on(L.events.EDITOR_CHANGE, (i, r, o, a) => {
      i === L.events.SELECTION_CHANGE ? r && a !== L.sources.SILENT && (this.currentRange = r) : i === L.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || a === L.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = La(this.currentRange, r));
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
      range: La(i.range, o)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, L.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
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
      const a = this.stack.undo.pop();
      a && (i = i.compose(a.delta), r = a.range);
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
    ru(this.stack.undo, s), ru(this.stack.redo, s);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(s) {
    if (s.range)
      this.quill.setSelection(s.range, L.sources.USER);
    else {
      const n = LE(this.quill.scroll, s.delta);
      this.quill.setSelection(n, L.sources.USER);
    }
  }
}
F(yd, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function ru(e, t) {
  let s = t;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const i = e[n];
    e[n] = {
      delta: s.transform(i.delta, !0),
      range: i.range && La(i.range, s)
    }, s = i.delta.transform(s), e[n].delta.length() === 0 && e.splice(n, 1);
  }
}
function CE(e, t) {
  const s = t.ops[t.ops.length - 1];
  return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some((n) => e.query(n, G.BLOCK) != null) : !1;
}
function LE(e, t) {
  const s = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - s;
  return CE(e, t) && (n -= 1), n;
}
function La(e, t) {
  if (!e) return e;
  const s = t.transformPosition(e.index), n = t.transformPosition(e.index + e.length);
  return {
    index: s,
    length: n - s
  };
}
class vd extends Ee {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("drop", (n) => {
      var o;
      n.preventDefault();
      let i = null;
      if (document.caretRangeFromPoint)
        i = document.caretRangeFromPoint(n.clientX, n.clientY);
      else if (document.caretPositionFromPoint) {
        const a = document.caretPositionFromPoint(n.clientX, n.clientY);
        i = document.createRange(), i.setStart(a.offsetNode, a.offset), i.setEnd(a.offsetNode, a.offset);
      }
      const r = i && t.selection.normalizeNative(i);
      if (r) {
        const a = t.selection.normalizedToRange(r);
        (o = n.dataTransfer) != null && o.files && this.upload(a, n.dataTransfer.files);
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
vd.DEFAULTS = {
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
const IE = ["insertText", "insertReplacementText"];
class xE extends Ee {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(L.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Tl({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (s) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new K().retain(t.index).insert(s, n), L.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + s.length, 0, L.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !IE.includes(t.inputType))
      return;
    const s = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!s || s.collapsed === !0)
      return;
    const n = $E(t);
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
function $E(e) {
  var t;
  return typeof e.data == "string" ? e.data : (t = e.dataTransfer) != null && t.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
const ME = /Mac/i.test(navigator.platform), RE = 100, DE = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || ME && e.key === "a" && e.ctrlKey === !0);
class qE extends Ee {
  constructor(s, n) {
    super(s, n);
    F(this, "isListening", !1);
    F(this, "selectionChangeDeadline", 0);
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
        if (!(i instanceof me) || !i.uiNode)
          return !0;
        const o = getComputedStyle(i.domNode).direction === "rtl";
        return o && r.key !== "ArrowRight" || !o && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(s.index - 1, s.length + (r.shiftKey ? 1 : 0), L.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (s) => {
      !s.defaultPrevented && DE(s) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + RE, this.isListening) return;
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
    if (!(i instanceof me) || !i.uiNode) return;
    const r = document.createRange();
    r.setStartAfter(i.uiNode), r.setEndAfter(i.uiNode), s.removeAllRanges(), s.addRange(r);
  }
}
L.register({
  "blots/block": It,
  "blots/block/embed": te,
  "blots/break": _e,
  "blots/container": Ws,
  "blots/cursor": Cn,
  "blots/embed": bl,
  "blots/inline": Re,
  "blots/scroll": pn,
  "blots/text": be,
  "modules/clipboard": md,
  "modules/history": yd,
  "modules/keyboard": zr,
  "modules/uploader": vd,
  "modules/input": xE,
  "modules/uiNode": qE
});
class BE extends ve {
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
const PE = new BE("indent", "ql-indent", {
  scope: G.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Ia extends It {
}
F(Ia, "blotName", "blockquote"), F(Ia, "tagName", "blockquote");
class xa extends It {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
F(xa, "blotName", "header"), F(xa, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class xi extends Ws {
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
    L.register(xi);
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
class _i extends Re {
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
F(_i, "blotName", "bold"), F(_i, "tagName", ["STRONG", "B"]);
class $a extends _i {
}
F($a, "blotName", "italic"), F($a, "tagName", ["EM", "I"]);
class cs extends Re {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("href", this.sanitize(t)), s.setAttribute("rel", "noopener noreferrer"), s.setAttribute("target", "_blank"), s;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return _d(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, s) {
    t !== this.statics.blotName || !s ? super.format(t, s) : this.domNode.setAttribute("href", this.constructor.sanitize(s));
  }
}
F(cs, "blotName", "link"), F(cs, "tagName", "A"), F(cs, "SANITIZED_URL", "about:blank"), F(cs, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function _d(e, t) {
  const s = document.createElement("a");
  s.href = e;
  const n = s.href.slice(0, s.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class Ma extends Re {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
F(Ma, "blotName", "script"), F(Ma, "tagName", ["SUB", "SUP"]);
class Ra extends _i {
}
F(Ra, "blotName", "strike"), F(Ra, "tagName", ["S", "STRIKE"]);
class Da extends Re {
}
F(Da, "blotName", "underline"), F(Da, "tagName", "U");
class yr extends bl {
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
F(yr, "blotName", "formula"), F(yr, "className", "ql-formula"), F(yr, "tagName", "SPAN");
const ou = ["alt", "height", "width"];
class qa extends Gt {
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return ou.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return _d(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    ou.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
}
F(qa, "blotName", "image"), F(qa, "tagName", "IMG");
const au = ["height", "width"];
class vr extends te {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return au.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static sanitize(t) {
    return cs.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    au.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
F(vr, "blotName", "video"), F(vr, "className", "ql-video"), F(vr, "tagName", "IFRAME");
const oi = new ve("code-token", "hljs", {
  scope: G.INLINE
});
class Ze extends Re {
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
    t !== Ze.blotName ? super.format(t, s) : s ? oi.add(this.domNode, s) : (oi.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), oi.value(this.domNode) || this.unwrap();
  }
}
Ze.blotName = "code-token";
Ze.className = "ql-token";
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
    return this.formatAt(0, this.length(), Ze.blotName, !1), super.replaceWith(t, s);
  }
}
class hi extends zs {
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
        const o = this.children.reduce((l, u) => l.concat(nd(u, !1)), new K()), a = t(i, r);
        o.diff(a).reduce((l, u) => {
          let {
            retain: d,
            attributes: h
          } = u;
          return d ? (h && Object.keys(h).forEach((b) => {
            [Jt.blotName, Ze.blotName].includes(b) && this.formatAt(l, d, b, h[b]);
          }), l + d) : l;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, s) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Jt.formats(n.domNode) : "plain"}">
${Wr(this.code(t, s))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const s = Jt.formats(this.children.head.domNode);
      s !== this.uiNode.value && (this.uiNode.value = s);
    }
  }
}
hi.allowedChildren = [Jt];
Jt.requiredContainer = hi;
Jt.allowedChildren = [Ze, Cn, be, _e];
const VE = (e, t, s) => {
  if (typeof e.versionString == "string") {
    const n = e.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return e.highlight(s, {
        language: t
      }).value;
  }
  return e.highlight(t, s).value;
};
class Ed extends Ee {
  static register() {
    L.register(Ze, !0), L.register(Jt, !0), L.register(hi, !0);
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
    this.quill.on(L.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof hi)) return;
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
    this.quill.on(L.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(L.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(hi) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, s);
    }), this.quill.update(L.sources.SILENT), n != null && this.quill.setSelection(n, L.sources.SILENT);
  }
  highlightBlot(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (s = this.languages[s] ? s : "plain", s === "plain")
      return Wr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [Dt.blotName]: s
      }), i.insert(r)), new K());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(Dt.className), n.innerHTML = VE(this.options.hljs, s, t), Al(this.quill.scroll, n, [(i, r) => {
      const o = oi.value(i);
      return o ? r.compose(new K().retain(r.length(), {
        [Ze.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, a, l) => (l !== 0 && o.insert(`
`, {
      [Dt.blotName]: s
    }), o.insert(a)), r)], /* @__PURE__ */ new WeakMap());
  }
}
Ed.DEFAULTS = {
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
    return t ? s.setAttribute("data-row", t) : s.setAttribute("data-row", Ol()), s;
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
F(fi, "blotName", "table"), F(fi, "tagName", "TD");
let fe = fi;
class Qe extends Ws {
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
F(Qe, "blotName", "table-row"), F(Qe, "tagName", "TR");
class xe extends Ws {
}
F(xe, "blotName", "table-body"), F(xe, "tagName", "TBODY");
class In extends Ws {
  balanceCells() {
    const t = this.descendants(Qe), s = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(s - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = fe.formats(n.children.head.domNode));
        const r = this.scroll.create(fe.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((s) => s.children.at(t));
  }
  deleteColumn(t) {
    const [s] = this.descendant(xe);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [s] = this.descendant(xe);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t), r = fe.formats(n.children.head.domNode), o = this.scroll.create(fe.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [s] = this.descendant(xe);
    if (s == null || s.children.head == null) return;
    const n = Ol(), i = this.scroll.create(Qe.blotName);
    s.children.head.children.forEach(() => {
      const o = this.scroll.create(fe.blotName, n);
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
F(In, "blotName", "table-container"), F(In, "tagName", "TABLE");
In.allowedChildren = [xe];
xe.requiredContainer = In;
xe.allowedChildren = [Qe];
Qe.requiredContainer = xe;
Qe.allowedChildren = [fe];
fe.requiredContainer = Qe;
function Ol() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class jE extends Ee {
  static register() {
    L.register(fe), L.register(Qe), L.register(xe), L.register(In);
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
    s != null && (t.deleteColumn(s.cellOffset()), this.quill.update(L.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(L.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const s = t.offset();
    t.remove(), this.quill.update(L.sources.USER), this.quill.setSelection(s, L.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [s, n] = this.quill.getLine(t.index);
    if (s == null || s.statics.blotName !== fe.blotName)
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
    n.insertColumn(o + t), this.quill.update(L.sources.USER);
    let a = i.rowOffset();
    t === 0 && (a += 1), this.quill.setSelection(s.index + a, s.length, L.sources.SILENT);
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
    n.insertRow(o + t), this.quill.update(L.sources.USER), t > 0 ? this.quill.setSelection(s, L.sources.SILENT) : this.quill.setSelection(s.index + i.children.length, s.length, L.sources.SILENT);
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
        table: Ol()
      });
    }, new K().retain(n.index));
    this.quill.updateContents(i, L.sources.USER), this.quill.setSelection(n.index, L.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(L.events.SCROLL_OPTIMIZE, (t) => {
      t.some((s) => ["TD", "TR", "TBODY", "TABLE"].includes(s.target.tagName) ? (this.quill.once(L.events.TEXT_CHANGE, (n, i, r) => {
        r === L.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const lu = es("quill:toolbar");
class Nl extends Ee {
  constructor(t, s) {
    var n, i;
    if (super(t, s), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), FE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      lu.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var a;
      const o = (a = this.options.handlers) == null ? void 0 : a[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(L.events.EDITOR_CHANGE, () => {
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
      lu.warn("ignoring attaching to nonexistent format", s, t);
      return;
    }
    const n = t.tagName === "SELECT" ? "change" : "click";
    t.addEventListener(n, (i) => {
      let r;
      if (t.tagName === "SELECT") {
        if (t.selectedIndex < 0) return;
        const a = t.options[t.selectedIndex];
        a.hasAttribute("selected") ? r = !1 : r = a.value || !1;
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
        }), L.sources.USER);
      } else
        this.quill.format(s, r, L.sources.USER);
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
          let a = s[i];
          typeof a == "string" && (a = a.replace(/"/g, '\\"')), o = r.querySelector(`option[value="${a}"]`);
        }
        o == null ? (r.value = "", r.selectedIndex = -1) : o.selected = !0;
      } else if (t == null)
        r.classList.remove("ql-active"), r.setAttribute("aria-pressed", "false");
      else if (r.hasAttribute("value")) {
        const o = s[i], a = o === r.getAttribute("value") || o != null && o.toString() === r.getAttribute("value") || o == null && !r.getAttribute("value");
        r.classList.toggle("ql-active", a), r.setAttribute("aria-pressed", a.toString());
      } else {
        const o = s[i] != null;
        r.classList.toggle("ql-active", o), r.setAttribute("aria-pressed", o.toString());
      }
    });
  }
}
Nl.DEFAULTS = {};
function cu(e, t, s) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), s != null ? (n.value = s, n.setAttribute("aria-label", `${t}: ${s}`)) : n.setAttribute("aria-label", t), e.appendChild(n);
}
function FE(e, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((s) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), s.forEach((i) => {
      if (typeof i == "string")
        cu(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? UE(n, r, o) : cu(n, r, o);
      }
    }), e.appendChild(n);
  });
}
function UE(e, t, s) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), s.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), e.appendChild(n);
}
Nl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const e = this.quill.getSelection();
      if (e != null)
        if (e.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((s) => {
            this.quill.scroll.query(s, G.INLINE) != null && this.quill.format(s, !1, L.sources.USER);
          });
        } else
          this.quill.removeFormat(e.index, e.length, L.sources.USER);
    },
    direction(e) {
      const {
        align: t
      } = this.quill.getFormat();
      e === "rtl" && t == null ? this.quill.format("align", "right", L.sources.USER) : !e && t === "right" && this.quill.format("align", !1, L.sources.USER), this.quill.format("direction", e, L.sources.USER);
    },
    indent(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t), n = parseInt(s.indent || 0, 10);
      if (e === "+1" || e === "-1") {
        let i = e === "+1" ? 1 : -1;
        s.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, L.sources.USER);
      }
    },
    link(e) {
      e === !0 && (e = prompt("Enter link URL:")), this.quill.format("link", e, L.sources.USER);
    },
    list(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t);
      e === "check" ? s.list === "checked" || s.list === "unchecked" ? this.quill.format("list", !1, L.sources.USER) : this.quill.format("list", "unchecked", L.sources.USER) : this.quill.format("list", e, L.sources.USER);
    }
  }
};
const HE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', WE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', zE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', KE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', GE = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', YE = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', XE = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', ZE = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', uu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', QE = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', JE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', tw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', ew = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', sw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', nw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', iw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', rw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', ow = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', aw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', cw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', uw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', hw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', dw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', fw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', pw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', gw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', mw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', bw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', yw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', vw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', _w = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Ew = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', Ei = {
  align: {
    "": HE,
    center: WE,
    right: zE,
    justify: KE
  },
  background: GE,
  blockquote: YE,
  bold: XE,
  clean: ZE,
  code: uu,
  "code-block": uu,
  color: QE,
  direction: {
    "": JE,
    rtl: tw
  },
  formula: ew,
  header: {
    1: sw,
    2: nw,
    3: iw,
    4: rw,
    5: ow,
    6: aw
  },
  italic: lw,
  image: cw,
  indent: {
    "+1": uw,
    "-1": hw
  },
  link: dw,
  list: {
    bullet: fw,
    check: pw,
    ordered: gw
  },
  script: {
    sub: mw,
    super: bw
  },
  strike: yw,
  table: vw,
  underline: _w,
  video: Ew
}, ww = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let hu = 0;
function du(e, t) {
  e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
}
class Kr {
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
    return t.classList.add("ql-picker-label"), t.innerHTML = ww, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${hu}`, hu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((s) => {
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
class wd extends Kr {
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
class Td extends Kr {
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
const Tw = (e) => {
  const {
    overflowY: t
  } = getComputedStyle(e, null);
  return t !== "visible" && t !== "clip";
};
class Ad {
  constructor(t, s) {
    this.quill = t, this.boundsContainer = s || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Tw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
      const a = r.bottom - r.top, l = t.bottom - t.top + a;
      this.root.style.top = `${n - l}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Aw = [!1, "center", "right", "justify"], Ow = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Nw = [!1, "serif", "monospace"], kw = ["1", "2", "3", !1], Sw = ["small", !1, "large", "huge"];
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ni(i, Aw), typeof s.align == "object"))
        return new Td(i, s.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ni(i, Ow, r === "background" ? "#ffffff" : "#000000"), new wd(i, s[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ni(i, Nw) : i.classList.contains("ql-header") ? ni(i, kw) : i.classList.contains("ql-size") && ni(i, Sw)), new Kr(i);
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
class Od extends Ad {
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
        t = Cw(t);
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
function Cw(e) {
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
const Lw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Nd extends Od {
  constructor(t, s) {
    super(t, s), this.quill.on(H.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === H.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === H.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const a = this.quill.getLines(i.index, i.length);
          if (a.length === 1) {
            const l = this.quill.getBounds(i);
            l != null && this.position(l);
          } else {
            const l = a[a.length - 1], u = this.quill.getIndex(l), d = Math.min(l.length() - 1, i.index + i.length - u), h = this.quill.getBounds(new Bs(u, d));
            h != null && this.position(h);
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
F(Nd, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class kd extends Mi {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = Lw), super(t, s), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Nd(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei));
  }
}
kd.DEFAULTS = us({}, Mi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(e) {
          e ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, L.sources.USER);
        }
      }
    }
  }
});
const Iw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Sd extends Od {
  constructor() {
    super(...arguments);
    F(this, "preview", this.root.querySelector("a.ql-preview"));
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
            const a = cs.formats(r.domNode);
            this.preview.textContent = a, this.preview.setAttribute("href", a), this.show();
            const l = this.quill.getBounds(this.linkRange);
            l != null && this.position(l);
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
F(Sd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Cd extends Mi {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = Iw), super(t, s), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei), this.tooltip = new Sd(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (s, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Cd.DEFAULTS = us({}, Mi.DEFAULTS, {
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
            this.quill.format("link", !1, L.sources.USER);
        }
      }
    }
  }
});
L.register({
  "attributors/attribute/direction": ld,
  "attributors/class/align": rd,
  "attributors/class/background": Y_,
  "attributors/class/color": G_,
  "attributors/class/direction": cd,
  "attributors/class/font": dd,
  "attributors/class/size": pd,
  "attributors/style/align": od,
  "attributors/style/background": _l,
  "attributors/style/color": vl,
  "attributors/style/direction": ud,
  "attributors/style/font": fd,
  "attributors/style/size": gd
}, !0);
L.register({
  "formats/align": rd,
  "formats/direction": cd,
  "formats/indent": PE,
  "formats/background": _l,
  "formats/color": vl,
  "formats/font": dd,
  "formats/size": pd,
  "formats/blockquote": Ia,
  "formats/code-block": Dt,
  "formats/header": xa,
  "formats/list": $i,
  "formats/bold": _i,
  "formats/code": El,
  "formats/italic": $a,
  "formats/link": cs,
  "formats/script": Ma,
  "formats/strike": Ra,
  "formats/underline": Da,
  "formats/formula": yr,
  "formats/image": qa,
  "formats/video": vr,
  "modules/syntax": Ed,
  "modules/table": jE,
  "modules/toolbar": Nl,
  "themes/bubble": kd,
  "themes/snow": Cd,
  "ui/icons": Ei,
  "ui/picker": Kr,
  "ui/icon-picker": Td,
  "ui/color-picker": wd,
  "ui/tooltip": Ad
}, !0);
const oe = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, xw = {
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
      this.quill = new L(this.$refs.editor, {
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
}, $w = xw, Mw = { class: "ql-editor-container" }, Rw = {
  class: "",
  ref: "editor"
};
function Dw(e, t, s, n, i, r) {
  return g(), m("div", Mw, [
    f("div", Rw, null, 512)
  ]);
}
const qw = /* @__PURE__ */ oe($w, [["render", Dw]]), Bw = {
  props: {
    file: Object
  },
  methods: {
    roundFileSize(e, t) {
      return e < 1024 ? e + (t ? " Byte" : "") : e < 1048576 ? (e / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : e < 1073741824 ? (e / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (e / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
    },
    dateFormat(e) {
      return new Date(e).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }
}, Pw = Bw, Vw = {
  key: 0,
  class: "table table-sm w-100 vsa-file-info"
}, jw = { class: "text-nowrap text-center" }, Fw = { class: "text-center" }, Uw = { class: "text-nowrap text-end" }, Hw = ["innerHTML"], Ww = { class: "text-end" }, zw = { class: "text-nowrap text-center" }, Kw = { class: "text-center" }, Gw = { class: "text-end" }, Yw = ["innerHTML"], Xw = { class: "text-end" }, Zw = {
  key: 0,
  class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, Qw = { colspan: "3" }, Jw = { class: "text-end" }, tT = ["innerHTML"], eT = { class: "d-flex justify-content-between text-nowrap" }, sT = { class: "d-flex justify-content-between text-nowrap" }, nT = { class: "text-muted fw-light me-3" }, iT = {
  key: 1,
  class: "d-flex justify-content-between"
};
function rT(e, t, s, n, i, r) {
  return g(), m("div", null, [
    e.file ? (g(), m("table", Vw, [
      t[3] || (t[3] = f("thead", null, [
        f("tr", null, [
          f("td", { class: "text-muted" }, " type "),
          f("td", { class: "text-muted text-center" }, " resolution "),
          f("td", { class: "text-muted text-center" }, " ratio "),
          f("td", { class: "text-muted text-end" }, " size "),
          f("td", { class: "text-muted text-end" }, " extension "),
          f("td", { class: "text-muted" }, " crop ")
        ])
      ], -1)),
      f("tbody", null, [
        f("tr", null, [
          t[0] || (t[0] = f("td", null, " original ", -1)),
          f("td", jw, I(e.file.original.width) + " x " + I(e.file.original.height), 1),
          f("td", Fw, I(e.file.original.ratio), 1),
          f("td", Uw, [
            f("span", {
              innerHTML: e.roundFileSize(e.file.original.bytes, !0)
            }, null, 8, Hw)
          ]),
          f("td", Ww, I(e.file.original.extension), 1),
          t[1] || (t[1] = f("td", null, null, -1))
        ]),
        (g(!0), m(tt, null, st(e.file.types, (o, a) => (g(), m("tr", { key: o }, [
          f("td", null, I(a), 1),
          f("td", zw, I(o.width) + " x " + I(o.height), 1),
          f("td", Kw, I(o.ratio), 1),
          f("td", Gw, [
            f("span", {
              class: S(["text-nowrap", { "text-danger": o.bytes > e.file.original.bytes }]),
              innerHTML: e.roundFileSize(o.bytes, !0)
            }, null, 10, Yw)
          ]),
          f("td", Xw, I(o.extension), 1),
          f("td", null, [
            o.crop ? (g(), m("small", Zw, I(o.crop), 1)) : T("", !0)
          ])
        ]))), 128))
      ]),
      f("tfoot", null, [
        f("tr", null, [
          f("td", Qw, I(e.file.uploaded ? "uploaded" : "uploading"), 1),
          f("td", Jw, [
            f("span", {
              class: "text-nowrap",
              innerHTML: e.roundFileSize(e.file.bytes, !0)
            }, null, 8, tT)
          ]),
          t[2] || (t[2] = f("td", { colspan: "2" }, null, -1))
        ])
      ])
    ])) : T("", !0),
    f("small", eT, [
      t[4] || (t[4] = f("span", { class: "text-muted fw-light me-3" }, "original filename", -1)),
      pt(" " + I(e.file.original.name), 1)
    ]),
    f("small", sT, [
      f("span", nT, I(e.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
      t[5] || (t[5] = pt()),
      f("span", null, I(e.file.slug), 1)
    ]),
    e.file.uploaded ? (g(), m("small", iT, [
      t[6] || (t[6] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
      t[7] || (t[7] = pt()),
      f("span", null, I(e.dateFormat(e.file.timestamp * 1e3)), 1)
    ])) : T("", !0)
  ]);
}
const oT = /* @__PURE__ */ oe(Pw, [["render", rT]]), Xt = {
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
}, aT = {
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
  components: {
    VuAdminFileUploadInfo: oT
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
      return jb(e, t);
    },
    extensionByFilename(e) {
      return Fb(e);
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
      let r = !!t.videoWidth, o, a;
      r ? (o = t.videoWidth, a = t.videoHeight) : (o = t.width, a = t.height), e.original.width = o, e.original.height = a, e.original.ratio = this.calculateAspectRatio(o, a);
      for (let l in this.params.presets) {
        let u = this.params.presets[l];
        u.key = l, u.width = u.width ? u.width : 1920, u.height = u.height ? u.height : 1080;
        let d = u.width, h = u.height;
        if (u.crop === "cover") {
          let b = Math.max(d / o, h / a), y = o * b, E = a * b, A = (y - d) / 2, O = (E - h) / 2;
          n.width = d, n.height = h, i.drawImage(t, -A, -O, y, E);
        } else if (u.crop === "contain") {
          let b = Math.min(d / o, h / a), y = o * b, E = a * b, A = (d - y) / 2, O = (h - E) / 2;
          n.width = d, n.height = h, i.clearRect(0, 0, d, h), i.drawImage(t, A, O, y, E);
        } else
          o > d && (a = Math.round(a * (d / o)), o = d), a > h && (o = Math.round(o * (h / a)), a = h), n.width = o, n.height = a, i.drawImage(t, 0, 0, o, a);
        e.types[u.key] = {
          width: n.width,
          height: n.height,
          ratio: this.calculateAspectRatio(n.width, n.height),
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
      nl(e, t);
    },
    arrayItemMoveDown(e, t) {
      il(e, t);
    },
    download(e, t) {
      let s = this.files[e].types[t.download ? t.download : "default"], n = document.createElement("a");
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
    calculateAspectRatio(e, t) {
      function s(l, u) {
        return u === 0 ? l : s(u, l % u);
      }
      if (e <= 0 || t <= 0)
        throw new Error("Width and height must be positive numbers.");
      const n = s(e, t), i = e / n, r = t / n;
      if (i > 99 || r > 99)
        return "?";
      if (i === r)
        return "1:1";
      if (i % r === 0)
        return `${i / r}:1`;
      const o = `${i}:${r}`;
      return {
        "2.35:1": "2.35:1",
        "2.39:1": "2.39:1",
        "2.76:1": "2.76:1",
        // Ultra Panavision 70
        "1.85:1": "1.85:1"
      }[o] || o;
    },
    translate(e, t, s) {
      return ki(e, this.settings.translate, t, s || this.settings.language);
    },
    dropdownSelectToggleOne(e, t) {
      mh(e, t), this.$forceUpdate();
    },
    dropdownSelectAll(e, t) {
      bh(e, t), this.$forceUpdate();
    },
    dropdownSelectInvert(e, t) {
      yh(e, t), this.$forceUpdate();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : vh(e), this.$forceUpdate();
    }
  }
}, lT = aT, cT = { class: "" }, uT = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, hT = { class: "row" }, dT = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, fT = { class: "badge bg-dark text-light fw-light mx-1" }, pT = { class: "badge bg-dark text-light fw-light mx-1" }, gT = ["src"], mT = { class: "row g-1" }, bT = { class: "col-md-6" }, yT = { class: "col-md-6" }, vT = { class: "col-md-6" }, _T = ["href"], ET = {
  key: 1,
  class: "row g-2 mb-1"
}, wT = { key: 0 }, TT = { class: "table table-sm table-responsive table-borderless" }, AT = { class: "align-middle px-0" }, OT = { class: "input-group border" }, NT = { class: "d-block p-1 px-2 bg-secondary text-light opacity-50" }, kT = ["onClick"], ST = ["onClick"], CT = {
  key: 0,
  class: "fs-5 ms-2"
}, LT = {
  key: 1,
  class: "fs-5 ms-2"
}, IT = {
  key: 2,
  class: "fs-5 ms-2"
}, xT = ["onUpdate:modelValue", "onInput"], $T = {
  key: 3,
  class: "mx-1"
}, MT = ["href"], RT = ["src", "alt"], DT = ["src", "alt"], qT = {
  key: 4,
  class: "dropdown rounded-bottom"
}, BT = {
  class: "btn btn-sm bg-light text-dark w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, PT = { class: "dropdown-menu" }, VT = ["onClick"], jT = {
  key: 0,
  class: "bi bi-check-square"
}, FT = {
  key: 1,
  class: "bi bi-square"
}, UT = ["onClick"], HT = ["onClick"], WT = ["onClick"], zT = { class: "dropdown" }, KT = { class: "dropdown-menu" }, GT = { class: "p-2" }, YT = { class: "fw-light" }, XT = ["onClick"], ZT = { class: "vsa-image-container h-100 position-relative" }, QT = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, JT = {
  key: 1,
  class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, tA = ["href"], eA = ["src", "alt"], sA = ["src", "alt"], nA = {
  key: 2,
  class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, iA = ["onUpdate:modelValue", "onInput"], rA = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, oA = { class: "p-1 px-2 bg-secondary text-light border border-end-0 h-100 opacity-50" }, aA = ["onClick"], lA = ["onClick"], cA = { class: "dropdown border h-100 w-100" }, uA = { class: "dropdown-menu" }, hA = { class: "p-2" }, dA = { class: "fw-light" }, fA = {
  key: 0,
  class: "dropdown border h-100 w-100"
}, pA = {
  class: "btn btn-sm bg-light text-dark w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, gA = { class: "dropdown-menu" }, mA = ["onClick"], bA = {
  key: 0,
  class: "bi bi-check-square"
}, yA = {
  key: 1,
  class: "bi bi-square"
}, vA = ["onClick"], _A = ["onClick"], EA = ["onClick"], wA = ["onClick"], TA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, AA = { class: "row g-1" }, OA = { class: "col-12 d-flex align-items-center justify-content-center" }, NA = ["for"], kA = { key: 0 }, SA = { key: 0 }, CA = { class: "" }, LA = { class: "" }, IA = {
  key: 1,
  class: "fs-6"
}, xA = {
  key: 0,
  class: "bi bi-list-ol"
}, $A = {
  key: 1,
  class: "bi bi-grid"
}, MA = ["disabled"], RA = { class: "col-12 text-center" }, DA = { key: 0 }, qA = ["id", "accept"];
function BA(e, t, s, n, i, r) {
  const o = pe("VuAdminFileUploadInfo");
  return g(), m("div", cT, [
    f("div", {
      class: S(["vsa-upload", { wait: e.wait }])
    }, [
      e.editfile && e.editfile.presets ? (g(), m("div", uT, [
        f("div", hT, [
          (g(!0), m(tt, null, st(e.editfile.types, (a, l) => (g(), m("div", {
            class: "col-md-3",
            key: l
          }, [
            f("span", dT, I(a.extension), 1),
            f("span", fT, I(a.width) + " x " + I(a.height), 1),
            f("span", pT, "~" + I(e.roundFileSize(a.bytes)), 1),
            a ? (g(), m("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: a.url ? a.url : a.data
            }, null, 8, gT)) : T("", !0)
          ]))), 128))
        ]),
        at(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (a) => e.editfile.title = a)
        }, null, 512), [
          [de, e.editfile.title]
        ]),
        f("div", mT, [
          f("div", bT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (a) => e.editfile = null)
            }, " Close ")
          ]),
          f("div", yT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (a) => e.remove(e.index))
            }, " Remove ")
          ]),
          f("div", vT, [
            e.type && !e.type.url ? (g(), m("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (a) => e.download(e.index, e.params))
            }, " Download ")) : T("", !0),
            e.type && e.type.url ? (g(), m("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: e.type.url
            }, " Download ", 8, _T)) : T("", !0)
          ])
        ])
      ])) : T("", !0),
      e.files && e.files.length ? (g(), m("div", ET, [
        e.params.ui === "list" ? (g(), m("div", wT, [
          f("table", TT, [
            f("tbody", null, [
              (g(!0), m(tt, null, st(e.files, (a, l) => (g(), m("tr", { key: l }, [
                f("td", AT, [
                  f("div", OT, [
                    f("span", NT, [
                      f("small", null, I(l + 1), 1)
                    ]),
                    f("span", {
                      class: "cursor-pointer p-1 border-end bg-white h-100",
                      onClick: (u) => e.arrayItemMoveDown(e.files, l)
                    }, [
                      f("i", {
                        class: S(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                      }, null, 2)
                    ], 8, kT),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end bg-white h-100",
                      onClick: (u) => e.arrayItemMoveUp(e.files, l + 1)
                    }, [
                      f("i", {
                        class: S(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                      }, null, 2)
                    ], 8, ST),
                    a.isDocument ? (g(), m("span", CT, [
                      f("i", {
                        class: S(["bi bi-filetype-" + a.types.default.extension])
                      }, null, 2)
                    ])) : a.isImage ? (g(), m("span", LT, t[9] || (t[9] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : a.isVideo ? (g(), m("span", IT, t[10] || (t[10] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : T("", !0),
                    at(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (u) => a.title = u,
                      onInput: (u) => e.slug(a),
                      onKeydown: t[4] || (t[4] = ai(Lt(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, xT), [
                      [de, a.title]
                    ]),
                    !a.isDocument && a.types && a.types[e.params.thumbnail] ? (g(), m("span", $T, [
                      a.types.default.url ? (g(), m("a", {
                        key: 0,
                        target: "_blank",
                        href: a.types.default.url
                      }, [
                        f("img", {
                          height: "32",
                          width: "auto",
                          class: "transparent-background",
                          src: a.types[e.params.thumbnail].url,
                          alt: a.name
                        }, null, 8, RT)
                      ], 8, MT)) : (g(), m("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "transparent-background",
                        src: a.types[e.params.thumbnail].data,
                        alt: a.name
                      }, null, 8, DT))
                    ])) : T("", !0),
                    e.params.tags ? (g(), m("div", qT, [
                      f("button", BT, [
                        t[11] || (t[11] = f("i", { class: "bi bi-tag" }, null, -1)),
                        pt(" " + I(a.tags ? a.tags.length : 0), 1)
                      ]),
                      f("ul", PT, [
                        f("li", null, [
                          (g(!0), m(tt, null, st(e.params.tags, (u) => (g(), m("span", {
                            key: u,
                            class: "dropdown-item cursor-pointer",
                            onClick: (d) => e.dropdownSelectToggleOne(a.tags, u.value)
                          }, [
                            a.tags && a.tags.indexOf(u.value) >= 0 ? (g(), m("i", jT)) : (g(), m("i", FT)),
                            pt(" " + I(e.translate(u.label ? u.label : u.value)), 1)
                          ], 8, VT))), 128))
                        ]),
                        t[12] || (t[12] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (u) => e.dropdownSelectAll(a.tags, e.params.tags)
                          }, I(e.translate("Select all")), 9, UT)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (u) => e.dropdownSelectClear(a.tags)
                          }, I(e.translate("Unselect all")), 9, HT)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (u) => e.dropdownSelectInvert(a.tags, e.params.tags)
                          }, I(e.translate("Invert all")), 9, WT)
                        ])
                      ])
                    ])) : T("", !0),
                    f("div", zT, [
                      t[13] || (t[13] = f("button", {
                        class: "btn btn-sm bg-light text-dark _dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, [
                        f("i", { class: "bi bi-list" })
                      ], -1)),
                      f("ul", KT, [
                        f("li", GT, [
                          f("small", YT, [
                            _r(o, { file: a }, null, 8, ["file"])
                          ])
                        ])
                      ])
                    ]),
                    f("button", {
                      class: "btn text-danger px-2 py-1",
                      onClick: (u) => e.remove(l),
                      type: "button"
                    }, t[14] || (t[14] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1)
                    ]), 8, XT)
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (g(!0), m(tt, { key: 1 }, st(e.files, (a, l) => (g(), m("div", {
          class: S([e.params.colclass ? e.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          f("div", ZT, [
            a.loaded ? (g(), m("div", QT, [
              T("", !0),
              a.types && a.types[e.params.thumbnail] ? (g(), m("div", JT, [
                a.types.default.url ? (g(), m("a", {
                  key: 0,
                  target: "_blank",
                  href: a.types.default.url
                }, [
                  f("img", {
                    class: "img-fluid transparent-background",
                    src: a.types[e.params.thumbnail].url,
                    alt: a.name
                  }, null, 8, eA)
                ], 8, tA)) : (g(), m("img", {
                  key: 1,
                  class: "img-fluid transparent-background",
                  src: a.types[e.params.thumbnail].data,
                  alt: a.name
                }, null, 8, sA))
              ])) : T("", !0),
              a.isDocument ? (g(), m("div", nA, [
                f("i", {
                  class: S(["bi bi-filetype-" + a.types.default.extension])
                }, null, 2)
              ])) : T("", !0),
              at(f("input", {
                required: "text",
                class: "form-control rounded-0 bg-white text-dark border-bottom-0 py-1 px-2 fw-light",
                "onUpdate:modelValue": (u) => a.title = u,
                onInput: (u) => e.slug(a),
                onKeydown: t[5] || (t[5] = ai(Lt(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, iA), [
                [de, a.title]
              ]),
              f("div", rA, [
                f("span", oA, [
                  f("small", null, I(l + 1), 1)
                ]),
                f("span", {
                  class: "cursor-pointer p-1 bg-white border border-end-0 h-100",
                  onClick: (u) => e.arrayItemMoveDown(e.files, l)
                }, [
                  f("i", {
                    class: S(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                  }, null, 2)
                ], 8, aA),
                f("span", {
                  class: "cursor-pointer p-1 bg-white border border-end-0 h-100",
                  onClick: (u) => e.arrayItemMoveUp(e.files, l + 1)
                }, [
                  f("i", {
                    class: S(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                  }, null, 2)
                ], 8, lA),
                f("div", cA, [
                  t[18] || (t[18] = f("button", {
                    class: "btn btn-sm bg-light text-dark _dropdown-toggle w-100",
                    type: "button",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false"
                  }, [
                    f("i", { class: "bi bi-list" })
                  ], -1)),
                  f("ul", uA, [
                    f("li", hA, [
                      f("small", dA, [
                        _r(o, { file: a }, null, 8, ["file"])
                      ])
                    ])
                  ])
                ]),
                e.params.tags ? (g(), m("div", fA, [
                  f("button", pA, [
                    t[19] || (t[19] = f("i", { class: "bi bi-tag" }, null, -1)),
                    pt(" " + I(a.tags ? a.tags.length : 0), 1)
                  ]),
                  f("ul", gA, [
                    f("li", null, [
                      (g(!0), m(tt, null, st(e.params.tags, (u) => (g(), m("span", {
                        key: u,
                        class: "dropdown-item cursor-pointer",
                        onClick: (d) => e.dropdownSelectToggleOne(a.tags, u.value)
                      }, [
                        a.tags && a.tags.indexOf(u.value) >= 0 ? (g(), m("i", bA)) : (g(), m("i", yA)),
                        pt(" " + I(e.translate(u.label ? u.label : u.value)), 1)
                      ], 8, mA))), 128))
                    ]),
                    t[20] || (t[20] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => e.dropdownSelectAll(a.tags, e.params.tags)
                      }, I(e.translate("Select all")), 9, vA)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => e.dropdownSelectClear(a.tags)
                      }, I(e.translate("Unselect all")), 9, _A)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => e.dropdownSelectInvert(a.tags, e.params.tags)
                      }, I(e.translate("Invert all")), 9, EA)
                    ])
                  ])
                ])) : T("", !0),
                f("button", {
                  class: "btn border rounded-0 border-start-0 text-danger px-2 py-1",
                  onClick: (u) => e.remove(l),
                  type: "button"
                }, t[21] || (t[21] = [
                  f("i", { class: "bi bi-x-circle" }, null, -1)
                ]), 8, wA)
              ])
            ])) : (g(), m("div", TA, t[22] || (t[22] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : T("", !0),
      f("div", AA, [
        f("div", OA, [
          f("label", {
            for: e.uploadId,
            class: S([{ "disabled bg-secondary": e.files && e.params.limit <= e.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            e.files && e.params.limit > e.files.length ? (g(), m("span", kA, [
              t[26] || (t[26] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              pt(" " + I(e.params.text) + " ", 1),
              e.params.limit ? (g(), m("small", SA, [
                t[23] || (t[23] = pt(" ( ")),
                f("strong", CA, I(e.files.length), 1),
                t[24] || (t[24] = pt(" / ")),
                f("span", LA, I(e.params.limit), 1),
                t[25] || (t[25] = pt(" ) "))
              ])) : T("", !0)
            ])) : (g(), m("span", IA, t[27] || (t[27] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              pt(" You've reached the upload limit ")
            ])))
          ], 10, NA),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (a) => e.toggleView())
          }, [
            e.params.ui != "list" ? (g(), m("i", xA)) : T("", !0),
            e.params.ui == "list" ? (g(), m("i", $A)) : T("", !0)
          ]),
          f("button", {
            disabled: !e.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (a) => e.resetConfirm())
          }, t[28] || (t[28] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, MA)
        ]),
        f("div", RA, [
          f("small", null, [
            e.params.accept ? (g(), m("div", DA, [
              t[29] || (t[29] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (g(!0), m(tt, null, st(e.params.accept, (a) => (g(), m("strong", {
                class: "ms-1 text-muted",
                key: a
              }, I(a), 1))), 128))
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
        onChange: t[8] || (t[8] = (...a) => e.handleFileChange && e.handleFileChange(...a))
      }, null, 40, qA)) : T("", !0)
    ], 2)
  ]);
}
const PA = /* @__PURE__ */ oe(lT, [["render", BA]]), VA = {
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
      return js(e, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    async selectOptions(e, t) {
      return typeof e == "function" ? await e(this.item, t, this) : e;
    },
    async fetchCustom(e, t) {
      const s = await fetch(
        We("GET", { url: e }, t),
        He("GET", this.settings.form.api, null, this.auth)
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
}, jA = VA, FA = ["name", "id", "disabled", "readonly", "required"], UA = ["value"];
function HA(e, t, s, n, i, r) {
  return at((g(), m("select", {
    class: S(["form-select", e.getValueOrFunction(e.field.inputclass ? e.field.inputclass : "", { field: e.field, item: e.item })]),
    name: e.field.name,
    id: e.formId + "_" + e.field.name,
    onChange: t[0] || (t[0] = (o) => e.handleChange(o)),
    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.newitem = o),
    disabled: e.field.disabled,
    readonly: e.field.readonly,
    required: e.field.required
  }, [
    (g(!0), m(tt, null, st(e.options, (o) => (g(), m("option", {
      class: S(e.getValueOrFunction(e.field.optionclass ? e.field.optionclass : "", { field: e.field, item: e.item, option: o })),
      key: o,
      value: o.value
    }, I(o.label ? o.label : o.value), 11, UA))), 128))
  ], 42, FA)), [
    [ke, e.newitem]
  ]);
}
const Ld = /* @__PURE__ */ oe(jA, [["render", HA]]), WA = {
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
      return js(e, t, this.settings, this);
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
      nl(e, t);
    },
    arrayItemMoveDown(e, t) {
      il(e, t);
    }
  },
  components: {
    VuAdminFormSelect: Ld
  }
}, zA = WA, KA = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, GA = { class: "col-10" }, YA = { class: "row g-1 d-flex align-items-center justify-content-between" }, XA = { class: "col-10" }, ZA = { class: "row g-1 d-flex align-items-center justify-content-between" }, QA = ["innerHTML"], JA = {
  key: 1,
  class: "input-group input-group-sm"
}, tO = ["type", "required", "placeholder", "onUpdate:modelValue"], eO = { class: "col-2 text-nowrap text-end" }, sO = ["onClick"], nO = ["onClick"], iO = ["onClick"], rO = { key: 0 }, oO = { class: "row g-1 d-flex align-items-center justify-content-between" }, aO = { class: "col-10" }, lO = { class: "row g-1 d-flex align-items-center justify-content-between" }, cO = { class: "input-group input-group-sm" }, uO = {
  key: 0,
  class: "input-group-text"
}, hO = ["type", "placeholder", "onUpdate:modelValue"], dO = {
  key: 3,
  class: "input-group-text"
}, fO = { class: "col-2" };
function pO(e, t, s, n, i, r) {
  const o = pe("VuAdminFormSelect");
  return g(), m("div", null, [
    f("div", KA, [
      f("div", GA, [
        f("div", YA, [
          (g(!0), m(tt, null, st(e.field.elements, (a) => (g(), m("div", {
            key: a,
            class: S(a.class || "col")
          }, [
            f("small", null, I(a.placeholder ? a.placeholder : a.prefix ? a.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = f("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (g(!0), m(tt, null, st(e.value, (a, l) => (g(), m("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: l
    }, [
      f("div", XA, [
        f("div", ZA, [
          (g(!0), m(tt, null, st(a, (u, d) => (g(), m("div", {
            key: d,
            class: S(e.field.elements[d].class || "col")
          }, [
            e.field.elements[d].template ? (g(), m("span", {
              key: 0,
              innerHTML: e.getValueOrFunction(e.field.elements[d].template, e.value[l])
            }, null, 8, QA)) : (g(), m("div", JA, [
              e.field.elements[d].type == "select" && e.value[l][d] ? (g(), ze(o, {
                key: 0,
                modelValue: e.value[l][d],
                "onUpdate:modelValue": (h) => e.value[l][d] = h,
                field: e.field.elements[d],
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : at((g(), m("input", {
                key: 1,
                type: e.field.elements[d].type,
                required: e.field.elements[d].required,
                placeholder: e.field.elements[d].placeholder || d,
                class: "form-control",
                "onUpdate:modelValue": (h) => e.value[l][d] = h
              }, null, 8, tO)), [
                [ge, e.value[l][d]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      f("div", eO, [
        e.field.sortable ? (g(), m("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => e.arrayItemMoveUp(e.value, l)
        }, t[2] || (t[2] = [
          f("i", { class: "bi bi-arrow-up" }, null, -1)
        ]), 8, sO)) : T("", !0),
        e.field.sortable ? (g(), m("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => e.arrayItemMoveDown(e.value, l + 1)
        }, t[3] || (t[3] = [
          f("i", { class: "bi bi-arrow-down" }, null, -1)
        ]), 8, nO)) : T("", !0),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (u) => e.arrayRemoveItem(e.value, l)
        }, t[4] || (t[4] = [
          f("i", { class: "bi bi-trash" }, null, -1)
        ]), 8, iO)
      ])
    ]))), 128)),
    e.item[e.field.name] && e.item[e.field.name].length ? (g(), m("hr", rO)) : T("", !0),
    f("div", oO, [
      f("div", aO, [
        f("div", lO, [
          (g(!0), m(tt, null, st(e.field.elements, (a) => (g(), m("div", {
            key: a,
            class: S(a.class || "col")
          }, [
            f("div", cO, [
              a.prefix ? (g(), m("span", uO, I(a.prefix), 1)) : T("", !0),
              a.type == "select" && (!a.relation || a.relation && a.relation.items) ? (g(), ze(o, {
                key: 1,
                modelValue: a.value,
                "onUpdate:modelValue": (l) => a.value = l,
                field: a,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : at((g(), m("input", {
                key: 2,
                type: a.type,
                placeholder: a.placeholder || a.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (l) => a.value = l
              }, null, 8, hO)), [
                [ge, a.value]
              ]),
              a.suffix ? (g(), m("span", dO, I(a.suffix), 1)) : T("", !0)
            ]),
            T("", !0)
          ], 2))), 128))
        ])
      ]),
      f("div", fO, [
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-primary my-1 w-100",
          onClick: t[0] || (t[0] = (a) => e.arrayAddNewItem(e.field, e.item))
        }, t[5] || (t[5] = [
          f("i", { class: "bi bi-plus" }, null, -1)
        ]))
      ])
    ])
  ]);
}
const gO = /* @__PURE__ */ oe(zA, [["render", pO]]), mO = {
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
      return js(e, t, this.settings, this);
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
      nl(e, t);
    },
    arrayItemMoveDown(e, t) {
      il(e, t);
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
    HtmlEditor: qw,
    FileUpload: PA,
    VuAdminFormSelect: Ld,
    VuAdminFormList: gO
  }
}, bO = mO, yO = { class: "row m-1" }, vO = ["innerHTML"], _O = {
  key: 1,
  class: "row"
}, EO = { class: "form-group pb-3" }, wO = { key: 0 }, TO = {
  key: 0,
  class: "badge text-secondary fw-light"
}, AO = ["for", "innerHTML"], OO = {
  key: 1,
  class: "input-group"
}, NO = ["innerHTML"], kO = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], SO = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "disabled", "readonly", "required"], CO = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "disabled", "readonly", "required"], LO = {
  key: 4,
  class: "form-check"
}, IO = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "disabled", "readonly", "required"], xO = ["for"], $O = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "disabled", "required"], MO = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], RO = ["innerHTML"], DO = { key: 5 }, qO = { key: 0 }, BO = ["for"], PO = ["name", "id", "onUpdate:modelValue"], VO = ["onClick"], jO = ["innerHTML"], FO = {
  key: 7,
  class: "p-1"
}, UO = ["innerHTML"];
function HO(e, t, s, n, i, r) {
  const o = pe("VuAdminFormSelect"), a = pe("HtmlEditor"), l = pe("FileUpload"), u = pe("VuAdminFormList");
  return g(), m("div", yO, [
    (g(!0), m(tt, null, st(e.settings.form.groups, (d) => (g(), m("div", {
      key: d,
      class: S([d.class ? d.class : "col-md-12"])
    }, [
      d.title ? (g(), m("h2", {
        key: 0,
        class: "form-row-title mb-4 fw-lighter",
        innerHTML: d.title ? d.title : ""
      }, null, 8, vO)) : T("", !0),
      e.item && d.fields ? (g(), m("div", _O, [
        (g(!0), m(tt, null, st(d.fields, (h) => (g(), m("div", {
          class: S([e.getValueOrFunction(h.class ? h.class : "col-md-12"), "input_type_" + h.type]),
          key: h
        }, [
          f("div", EO, [
            h.label ? (g(), m("span", wO, [
              ["html", "image", "upload"].indexOf(h.type) >= 0 ? (g(), m("label", {
                key: 0,
                class: S([{ required: h.required }, "form-label text-secondary mb-1"])
              }, [
                pt(I(h.label ? h.label : e.translate(h.name)) + " ", 1),
                h.maxlength ? (g(), m("span", TO, I(e.item[h.name] ? e.item[h.name].length : 0) + " / " + I(h.maxlength), 1)) : T("", !0)
              ], 2)) : (g(), m("label", {
                key: 1,
                class: S([{ required: h.required }, "form-label text-secondary mb-1"]),
                for: e.formId + "_" + h.name,
                innerHTML: e.getValueOrFunction(h.label ? h.label : e.translate(h.name), { field: h, item: e.item })
              }, null, 10, AO))
            ])) : T("", !0),
            ["html", "image", "list", "addresses", "template"].indexOf(h.type) < 0 ? (g(), m("div", OO, [
              h.prefix ? (g(), m("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.prefix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, NO)) : T("", !0),
              h.type == "text" ? at((g(), m("input", {
                key: 1,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "text",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (b) => e.item[h.name] = b,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, kO)), [
                [de, e.item[h.name]]
              ]) : T("", !0),
              h.type == "number" ? at((g(), m("input", {
                key: 2,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "number",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (b) => e.item[h.name] = b,
                min: h.min,
                max: h.max,
                step: h.step,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, SO)), [
                [de, e.item[h.name]]
              ]) : T("", !0),
              ["date", "datetime", "datetime-local"].indexOf(h.type) >= 0 ? at((g(), m("input", {
                key: 3,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: h.type,
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (b) => e.item[h.name] = b,
                min: h.min,
                max: h.max,
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, CO)), [
                [ge, e.item[h.name]]
              ]) : T("", !0),
              h.type == "checkbox" ? (g(), m("div", LO, [
                at(f("input", {
                  class: S(["form-check-input", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                  type: "checkbox",
                  name: h.name,
                  id: e.formId + "_" + h.name,
                  "true-value": h.true != null ? h.true : !0,
                  "false-value": h.false != null ? h.false : !1,
                  "onUpdate:modelValue": (b) => e.item[h.name] = b,
                  disabled: h.disabled,
                  readonly: h.readonly,
                  required: h.required
                }, null, 10, IO), [
                  [pu, e.item[h.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: e.formId + "_" + h.name
                }, I(h.checkbox), 9, xO)
              ])) : T("", !0),
              h.type == "email" ? at((g(), m("input", {
                key: 5,
                autocomplete: "on",
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "email",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (b) => e.item[h.name] = b,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                readonly: h.readonly,
                disabled: h.disabled,
                required: h.required
              }, null, 10, $O)), [
                [de, e.item[h.name]]
              ]) : T("", !0),
              h.type == "select" && (!h.relation || h.relation && h.relation.items) ? (g(), ze(o, {
                key: 6,
                modelValue: e.item[h.name],
                "onUpdate:modelValue": (b) => e.item[h.name] = b,
                field: h,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                auth: e.auth
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId", "auth"])) : T("", !0),
              h.type == "textarea" ? at((g(), m("textarea", {
                key: 7,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (b) => e.item[h.name] = b,
                rows: h.rows,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, "              ", 10, MO)), [
                [de, e.item[h.name]]
              ]) : T("", !0),
              h.suffix ? (g(), m("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.suffix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, RO)) : T("", !0)
            ])) : T("", !0),
            h.type == "html" ? (g(), ze(a, {
              key: 2,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (b) => e.item[h.name] = b,
              class: S([h.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : T("", !0),
            h.type == "image" || h.type == "upload" ? (g(), ze(l, {
              key: 3,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (b) => e.item[h.name] = b,
              class: S([h.class]),
              field: h,
              settings: e.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : T("", !0),
            h.type == "list" && (!h.relation || h.relation && h.relation.items) ? (g(), ze(u, {
              key: 4,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (b) => e.item[h.name] = b,
              field: h,
              item: e.item,
              settings: e.settings,
              formId: e.formId
            }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : T("", !0),
            h.type == "addresses" ? (g(), m("span", DO, [
              e.item[h.name] ? (g(), m("div", qO, [
                (g(!0), m(tt, null, st(e.item[h.name], (b) => (g(), m("div", { key: b }, [
                  pt(I(b) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: e.formId + "_" + h.name
                  }, I(h.label), 9, BO),
                  at(f("input", {
                    class: "form-control",
                    type: "text",
                    name: h.name,
                    id: e.formId + "_" + h.name,
                    "onUpdate:modelValue": (y) => b.country = y
                  }, null, 8, PO), [
                    [de, b.country]
                  ])
                ]))), 128))
              ])) : T("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (b) => e.insertAddress(h.name)
              }, " Add ", 8, VO)
            ])) : T("", !0),
            h.type == "template" ? (g(), m("div", {
              key: 6,
              innerHTML: e.getValueOrFunction(h.template, {
                field: h,
                item: e.item
              })
            }, null, 8, jO)) : T("", !0),
            h.description ? (g(), m("div", FO, [
              f("small", null, [
                f("i", {
                  class: "text-muted",
                  innerHTML: e.getValueOrFunction(h.description, {
                    field: h,
                    item: e.item
                  })
                }, null, 8, UO)
              ])
            ])) : T("", !0)
          ])
        ], 2))), 128))
      ])) : T("", !0)
    ], 2))), 128))
  ]);
}
const WO = /* @__PURE__ */ oe(bO, [["render", HO]]), zO = {
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
      return js(e, t, this.settings, this);
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
          We("GET", t.form.api, e),
          He("GET", t.api, null, s)
        ).catch((a) => {
        }), i = await mn(n);
        if (bn(n, i.data, "form") || !i.data)
          return this.formNoWait(), !1;
        t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, n);
        let o;
        t.form.api.input.item ? o = typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, n) : o = i.data;
        for (let a of t.form.groups)
          for (let l of a.fields)
            l.relation && t.relations[l.relation.config] && (l.relation = Pr(t.relations[l.relation.config], l.relation), console.log(l.relation, s), await this.fetchRelation(l, [o], s));
        this.item = Or(o), this.itemOriginal = Object.assign({}, o), this.loaded = !0, this.formNoWait();
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
        ), this.item = Or(s), this.itemOriginal = Object.assign({}, s)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
          We(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          He("DELETE", this.settings.api, null, this.auth)
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
    VuAdminFormGroup: WO
  }
}, KO = zO, GO = ["id", "data-bs-theme"], YO = { class: "modal-header" }, XO = {
  key: 0,
  class: "modal-title"
}, ZO = ["innerHTML"], QO = { key: 1 }, JO = { key: 2 }, tN = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, eN = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, sN = ["innerHTML"], nN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, iN = {
  key: 0,
  class: "modal-header bg-body sticky-top"
}, rN = {
  key: 0,
  class: "d-inline-block m-1"
}, oN = { class: "dropdown d-inline-block" }, aN = ["innerHTML"], lN = { class: "dropdown-menu text-start" }, cN = { class: "me-2 text-muted" }, uN = ["innerHTML"], hN = ["disabled", "onClick"], dN = {
  key: 1,
  class: "dropdown d-inline-block"
}, fN = { class: "mx-1" }, pN = { class: "dropdown-menu px-2" }, gN = ["onClick"], mN = {
  key: 1,
  class: "modal-body custom-scroll"
}, bN = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, yN = {
  key: 3,
  class: "bg-light text-dark"
};
function vN(e, t, s, n, i, r) {
  const o = pe("VuAdminFormGroup");
  return e.item ? (g(), m("form", {
    key: 0,
    ref: "form",
    id: e.formId,
    class: S(["form", [e.settings.form.class, { wait: e.ui.wait.form }]]),
    onSubmit: t[1] || (t[1] = Lt((...a) => e.submitItem && e.submitItem(...a), ["prevent"])),
    "data-bs-theme": [e.settings.theme]
  }, [
    f("div", {
      class: S(["vua-overlay", { blocked: e.ui.block.form }])
    }, null, 2),
    f("div", YO, [
      e.loaded ? (g(), m("h5", XO, [
        e.settings.form.title && typeof e.settings.form.title == "function" ? (g(), m("span", {
          key: 0,
          innerHTML: e.settings.form.title(e.item, e.settings)
        }, null, 8, ZO)) : T("", !0),
        e.settings.form.title && typeof e.settings.form.title == "string" ? (g(), m("span", QO, I(e.translate(e.settings.form.title)), 1)) : T("", !0),
        e.settings.form.title ? T("", !0) : (g(), m("span", JO, I(e.translate("Edit")), 1)),
        e.item[e.settings.pkey] ? (g(), m("small", tN, [
          t[2] || (t[2] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          pt(" " + I(e.item[e.settings.pkey]), 1)
        ])) : T("", !0)
      ])) : T("", !0),
      e.message.form ? (g(), m("span", eN, [
        f("span", {
          class: S(["text-" + e.message.form.priority])
        }, [
          t[3] || (t[3] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: e.message.form.msg
          }, null, 8, sN)
        ], 2)
      ])) : T("", !0),
      at(f("span", nN, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Cs, e.ui.wait.form]
      ]),
      t[5] || (t[5] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    e.item ? (g(), m("div", iN, [
      e.settings.form.control ? (g(), m("div", {
        key: 0,
        class: S(["w-100", e.settings.form.control.class == null ? "d-flex justify-content-center" : e.settings.form.control.class])
      }, [
        e.messages.form.length ? (g(), m("span", rN, [
          f("div", oN, [
            f("button", {
              class: S(["btn btn-sm dropdown-toggle", ["btn-" + e.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: e.messages.form.length + " " + (e.messages.form.length > 1 ? e.translate("messages") : e.translate("message"))
            }, null, 10, aN),
            f("ul", lN, [
              (g(!0), m(tt, null, st(e.messages.form, (a) => (g(), m("li", { key: a }, [
                f("span", {
                  class: S(["dropdown-item disabled", ["text-" + a.priority]])
                }, [
                  f("small", cN, I(a.datetime), 1),
                  f("span", {
                    innerHTML: a.msg
                  }, null, 8, uN)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : T("", !0),
        (g(!0), m(tt, null, st(e.settings.form.control.buttons, (a) => (g(), m("span", {
          key: a.action
        }, [
          a.dropdowns ? T("", !0) : (g(), m("button", {
            key: 0,
            type: "button",
            disabled: a.disabled !== void 0 ? e.getValueOrFunction(a.disabled, {
              button: a,
              item: e.item,
              form: this
            }) : !1,
            class: S([
              a.class ? a.class : e.getButtonClassByAction(a.action)
            ]),
            onClick: (l) => e.formAction(a, {
              button: a,
              item: e.item,
              form: this,
              $event: l
            })
          }, [
            f("i", {
              class: S([
                a.icon !== void 0 ? e.getValueOrFunction(a.icon, {
                  button: a,
                  item: e.item,
                  form: this
                }) : e.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            pt(" " + I(e.translate(a.title)), 1)
          ], 10, hN)),
          a.dropdowns ? (g(), m("div", dN, [
            f("button", {
              type: "button",
              class: S([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", fN, [
                f("i", {
                  class: S([
                    a.icon !== void 0 ? e.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : e.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                pt(" " + I(e.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", pN, [
              (g(!0), m(tt, null, st(a.dropdowns, (l) => (g(), m("li", { key: l }, [
                f("span", {
                  class: S([l.class ? l.class : ""]),
                  onClick: (u) => e.formAction(l, {
                    button: a,
                    item: e.item,
                    form: this,
                    $event: u
                  })
                }, [
                  l.icon ? (g(), m("i", {
                    key: 0,
                    class: S([l.icon])
                  }, null, 2)) : T("", !0),
                  pt(" " + I(e.translate(l.title)), 1)
                ], 10, gN)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0)
    ])) : T("", !0),
    e.settings.form ? (g(), m("div", mN, [
      e.settings.form.visible && e.settings.form.groups ? (g(), ze(o, {
        key: 0,
        modelValue: e.item,
        "onUpdate:modelValue": t[0] || (t[0] = (a) => e.item = a),
        formid: e.formId,
        settings: e.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : T("", !0)
    ])) : T("", !0),
    e.item ? (g(), m("div", bN)) : T("", !0),
    e.settings.debug > 1 ? (g(), m("pre", yN, "        " + I(e.item) + `
    `, 1)) : T("", !0)
  ], 42, GO)) : T("", !0);
}
const Id = /* @__PURE__ */ oe(KO, [["render", vN]]), _N = {
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
}, EN = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, wN = { class: "dropdown d-inline-block m-1" }, TN = { class: "mx-1" }, AN = { key: 0 }, ON = {
  key: 0,
  class: "dropdown-menu text-end"
}, NN = ["onClick"], kN = { class: "ms-2" }, SN = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, CN = {
  key: 1,
  class: "bi bi-circle ms-2"
}, LN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, IN = { class: "pagination pagination-sm m-1" }, xN = { class: "page-item" }, $N = ["innerHTML"], MN = { class: "page-item" }, RN = ["innerHTML"], DN = ["onClick"], qN = { class: "page-item" }, BN = ["innerHTML"], PN = {
  key: 0,
  class: "page-item"
}, VN = ["innerHTML"];
function jN(e, t, s, n, i, r) {
  return s.config.pagination.hidden ? T("", !0) : (g(), m("nav", EN, [
    f("div", null, [
      f("div", wN, [
        f("button", {
          type: "button",
          class: S(["btn btn-sm btn-secondary", { "dropdown-toggle": s.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          at(f("span", TN, [
            f("strong", null, I(s.config.pagination.from) + "-" + I(s.config.pagination.to), 1),
            s.config.pagination.total ? (g(), m("span", AN, " / " + I(s.config.pagination.total), 1)) : T("", !0)
          ], 512), [
            [Cs, s.config.pagination.from > 0]
          ])
        ], 2),
        s.config.pagination.limits ? (g(), m("ul", ON, [
          f("li", null, [
            (g(!0), m(tt, null, st(s.config.pagination.limits, (o) => (g(), m("span", {
              class: S(["dropdown-item cursor-pointer", { selected: s.config.pagination.limit == o }]),
              key: o,
              onClick: (a) => r.setPageLimit(o)
            }, [
              f("strong", null, I(o), 1),
              f("small", kN, I(r.translate("row")) + "/" + I(r.translate("page")), 1),
              s.config.pagination.limit == o ? (g(), m("i", SN)) : T("", !0),
              s.config.pagination.limit != o ? (g(), m("i", CN)) : T("", !0)
            ], 10, NN))), 128))
          ])
        ])) : T("", !0)
      ]),
      at(f("div", LN, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Cs, s.ui && s.ui.wait.table]
      ])
    ]),
    f("ul", IN, [
      f("li", xN, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, $N)
        ], 2)
      ]),
      f("li", MN, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(s.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, RN)
        ], 2)
      ]),
      (g(!0), m(tt, null, st(s.config.pagination.numbers, (o) => (g(), m("li", {
        key: o,
        class: "page-item"
      }, [
        f("a", {
          class: S(["page-link cursor-pointer", {
            disabled: o > s.config.pagination.pages,
            current: o == s.config.pagination.page
          }]),
          onClick: (a) => r.setPage(o)
        }, I(o), 11, DN)
      ]))), 128)),
      f("li", qN, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(s.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, BN)
        ], 2)
      ]),
      s.config.pagination.total ? (g(), m("li", PN, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(s.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, VN)
        ], 2)
      ])) : T("", !0)
    ])
  ]));
}
const FN = /* @__PURE__ */ oe(_N, [["render", jN]]), fu = sl(), UN = {
  name: "VuAdminTable",
  props: {
    settings: Object,
    auth: Object
  },
  components: {
    VuAdminForm: Id,
    VuAdminTablePagination: FN
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
      fu.emit(e + "-" + t, {
        from: this.settings.entity,
        payload: s
      });
    },
    listenEvent() {
      fu.on(`EDIT-${this.settings.entity}`, (e) => {
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
      return js(e, t, this.settings, this);
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
          t.relation = Pr(this.settings.relations[t.relation.config], t.relation);
          for (let n of e)
            n[t.relation.local] && s.push(n[t.relation.local]);
          t.relation.ids = Pb(s), await this.fetchRelation(t, e, this.auth);
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
        We("GET", e.table.api, null, t),
        He("GET", e.table.api, null, n)
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
      let a;
      e.table.api.input.items ? a = typeof e.table.api.input.items == "string" ? r.data[e.table.api.input.items] : e.table.api.input.items(r.data, i) : a = r.data, s && (e.table.api.input.total ? s.pagination.total = typeof e.table.api.input.total == "string" ? r.data[e.table.api.input.total] : e.table.api.input.total(r.data, i) : r.data.total && (s.pagination.total = r.data.total), s.pagination.items = a.length, this.calcPage());
      let l = Rb(a);
      return this.convertIn(e.table.columns, l), l;
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
        n.filter = JSON.stringify(i), Vb(n, {
          column: e
        });
        const r = await fetch(
          We("GET", e.relation.api, null, n),
          He("GET", e.relation.api, null, s)
        );
        if (r.status !== 200)
          throw new Error(
            this.translate("Response status: " + r.status)
          );
        const o = await mn(r);
        if (bn(r, o.data) || !o.data)
          return;
        if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? o.data[e.relation.api.input.items] : e.relation.api.input.items(o.data, r) : e.relation.items = o.data, t && t[0])
          for (let l of t)
            l[e.relation.local] && (l[e.relation.entity] = e.relation.items.find(
              (u, d, h) => u[e.relation.foreign] === l[e.relation.local]
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
          We(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          He("DELETE", this.settings.api, null, this.auth)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        let r = this.items.find((a) => a[this.settings.pkey] === s);
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
          We("DELETE", this.settings.table.api),
          He("DELETE", this.settings.api, {
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
          for (let h in e)
            this.settings.form.api.output.fields.includes(h) && (i[h] = e[h]);
        else
          Object.assign(i, e);
        let o, a;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Db(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, e), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let h = {};
          h[this.settings.form.api.output.item] = i, o = JSON.stringify(h);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const l = r ? "PUT" : "POST";
        a = await fetch(
          We(l, this.settings.form.api, r, n),
          He(l, this.settings.form.api, {
            body: o
          }, this.auth)
        );
        const u = await mn(a), d = bn(a, u.data);
        if (d) {
          s && s(d, e, n, a);
          return;
        }
        if (u.error) {
          s && s(u.error, e, n, a);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(u.data, n), t && t(u.data, a);
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
          We("PUT", this.settings.table.api),
          He("PUT", this.settings.table.api, {
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
      e.multiple ? mh(e.value, s) : e.value = e.value === s ? null : s, this.reloadTable();
    },
    dropdownSelectAll(e, t) {
      bh(e, t), this.reloadTable();
    },
    dropdownSelectInvert(e, t) {
      yh(e, t), this.reloadTable();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : vh(e), this.reloadTable();
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
        let n = qb(
          items,
          this.settings.table.exports[e.type].fields
        );
        Bb(n, this.settings.entity + ".csv");
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
      }, (i, r, o, a) => {
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
}, HN = ["data-bs-theme"], WN = { class: "vua-table-title" }, zN = { class: "d-flex align-items-center justify-content-between" }, KN = { class: "d-inline-block" }, GN = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, YN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, XN = {
  key: 0,
  class: "d-inline-block"
}, ZN = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, QN = ["innerHTML"], JN = { class: "dropdown d-inline-block" }, tk = ["innerHTML"], ek = { class: "dropdown-menu text-start" }, sk = { class: "me-2 text-muted" }, nk = ["innerHTML"], ik = ["onClick"], rk = {
  key: 1,
  class: "dropdown d-inline-block"
}, ok = { class: "mx-1" }, ak = { key: 0 }, lk = { class: "dropdown-menu" }, ck = ["onClick"], uk = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, hk = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, dk = { class: "badge text-secondary fw-normal" }, fk = {
  key: 2,
  class: "dropdown d-inline-block"
}, pk = { class: "mx-1" }, gk = { class: "dropdown-menu" }, mk = ["onClick"], bk = { class: "vua-table-header" }, yk = ["width"], vk = ["onClick"], _k = ["innerHTML"], Ek = {
  key: 0,
  class: "bi bi-arrow-down"
}, wk = {
  key: 1,
  class: "bi bi-arrow-up"
}, Tk = { key: 0 }, Ak = ["disabled", "onClick"], Ok = {
  key: 0,
  class: "vua-table-filter"
}, Nk = ["width"], kk = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, Sk = { class: "bi bi-check-all" }, Ck = { class: "bi bi-x-lg" }, Lk = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, Ik = ["onUpdate:modelValue"], xk = ["disabled", "onClick"], $k = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, Mk = ["onUpdate:modelValue", "disabled"], Rk = { value: "=" }, Dk = { value: ">" }, qk = { value: ">=" }, Bk = { value: "<" }, Pk = { value: "<=" }, Vk = ["onUpdate:modelValue", "disabled"], jk = ["value"], Fk = ["onUpdate:modelValue", "disabled", "min", "max"], Uk = ["disabled", "onClick"], Hk = { key: 3 }, Wk = {
  key: 0,
  class: "dropdown"
}, zk = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, Kk = { class: "dropdown-menu" }, Gk = ["onClick"], Yk = {
  key: 0,
  class: "bi bi-check-square"
}, Xk = {
  key: 1,
  class: "bi bi-square"
}, Zk = { key: 0 }, Qk = { key: 1 }, Jk = ["onClick"], t2 = { key: 2 }, e2 = ["onClick"], s2 = { key: 3 }, n2 = ["onClick"], i2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, r2 = ["onUpdate:modelValue", "multiple"], o2 = ["value"], a2 = ["disabled", "onClick"], l2 = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, c2 = ["onUpdate:modelValue"], u2 = { value: "=" }, h2 = { value: ">" }, d2 = { value: ">=" }, f2 = { value: "<" }, p2 = { value: "<=" }, g2 = ["onUpdate:modelValue"], m2 = ["value"], b2 = ["type", "onUpdate:modelValue"], y2 = ["disabled", "onClick"], v2 = ["disabled", "onClick"], _2 = { class: "align-middle" }, E2 = ["data-label", "width", "onClick"], w2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, T2 = ["innerHTML"], A2 = { key: 1 }, O2 = ["innerHTML"], N2 = ["aria-valuenow", "aria-valuemax"], k2 = { key: 0 }, S2 = {
  key: 4,
  class: "input-group input-group-sm"
}, C2 = ["innerHTML"], L2 = ["type", "onChange", "onUpdate:modelValue"], I2 = ["onChange", "onUpdate:modelValue"], x2 = ["value"], $2 = ["innerHTML"], M2 = { key: 5 }, R2 = ["disabled", "onClick"], D2 = ["innerHTML"], q2 = { key: 2 }, B2 = { key: 0 }, P2 = ["colspan"], V2 = { class: "row g-3 align-items-center" }, j2 = { class: "col-form-label" }, F2 = ["type", "onUpdate:modelValue", "onChange"], U2 = ["onUpdate:modelValue", "onChange"], H2 = ["onUpdate:modelValue", "onChange"], W2 = ["value"], z2 = ["innerHTML"], K2 = {
  key: 0,
  class: "bg-light text-dark"
}, G2 = {
  key: 0,
  class: "vua-table-bulk border-info"
}, Y2 = ["data-label", "width"], X2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, Z2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, Q2 = ["type", "disabled", "onChange", "onUpdate:modelValue"], J2 = ["disabled", "onChange", "onUpdate:modelValue"], tS = ["value"], eS = ["onClick"], sS = {
  key: 0,
  class: "bi bi-square text-secondary"
}, nS = {
  key: 1,
  class: "bi bi-check-square"
}, iS = { key: 2 }, rS = ["disabled", "onClick"], oS = ["innerHTML"], aS = { key: 2 }, lS = ["id"], cS = { class: "modal-dialog modal-xl" }, uS = { class: "modal-content h-100" };
function hS(e, t, s, n, i, r) {
  const o = pe("VuAdminTablePagination"), a = pe("VuAdminForm");
  return g(), m("div", null, [
    r.authAndSettings() ? (g(), m("div", {
      key: 0,
      class: S(["vua-table-container", [s.settings.class]]),
      "data-bs-theme": [s.settings.theme]
    }, [
      f("div", {
        class: S(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", WN, [
        f("div", zN, [
          f("div", KN, [
            s.settings.table.title ? (g(), m("h5", GN, I(s.settings.table.title), 1)) : T("", !0),
            at(f("div", YN, t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Cs, i.ui.wait.table && s.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (g(), m("div", XN, [
            i.message.table ? (g(), m("small", ZN, [
              f("span", {
                class: S(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, QN)
              ], 2)
            ])) : T("", !0),
            f("div", JN, [
              f("button", {
                class: S(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, tk),
              f("ul", ek, [
                (g(!0), m(tt, null, st(i.messages.table, (l) => (g(), m("li", { key: l }, [
                  f("span", {
                    class: S(["dropdown-item", ["text-" + l.priority]])
                  }, [
                    f("small", sk, I(l.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: l.msg
                    }, null, 8, nk)
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
        (g(!0), m(tt, null, st(s.settings.table.control.buttons, (l) => (g(), m("span", {
          key: l.action
        }, [
          l.action !== "TABLE_COLUMNS" && !l.dropdowns ? (g(), m("button", {
            key: 0,
            type: "button",
            class: S([
              l.class ? l.class : r.getButtonClassByAction(l.action)
            ]),
            onClick: (u) => r.tableAction(l, {
              items: i.items,
              $event: u
            })
          }, [
            f("i", {
              class: S([
                l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                  button: l,
                  table: this
                }) : r.getButtonIconClassByAction(l.action)
              ])
            }, null, 2),
            pt(" " + I(r.translate(l.title)), 1)
          ], 10, ik)) : T("", !0),
          l.action === "TABLE_COLUMNS" ? (g(), m("div", rk, [
            f("button", {
              type: "button",
              class: S([[
                l.class ? l.class : r.getButtonClassByAction(l.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              at(f("span", ok, [
                f("i", {
                  class: S([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                pt(" " + I(r.translate(l.title)) + " ", 1),
                r.countHiddenColumns() ? (g(), m("span", ak, " ( " + I(r.countHiddenColumns()) + " " + I(r.translate("hidden")) + " ) ", 1)) : T("", !0)
              ], 512), [
                [Cs, s.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", lk, [
              (g(!0), m(tt, null, st(s.settings.table.columns, (u) => (g(), m("li", { key: u }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (d) => r.toggleColumn(u)
                }, [
                  u.hidden ? T("", !0) : (g(), m("i", uk)),
                  u.hidden ? (g(), m("i", hk)) : T("", !0),
                  pt(" " + I(u.title) + " ", 1),
                  f("small", dk, I(u.name), 1)
                ], 8, ck)
              ]))), 128)),
              t[16] || (t[16] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (u) => r.toggleColumn(!0))
                }, I(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (u) => r.toggleColumn(!1))
                }, I(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : T("", !0),
          l.dropdowns ? (g(), m("div", fk, [
            f("button", {
              type: "button",
              class: S([[l.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", pk, [
                f("i", {
                  class: S([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                pt(" " + I(r.translate(l.title)), 1)
              ])
            ], 2),
            f("ul", gk, [
              (g(!0), m(tt, null, st(l.dropdowns, (u) => (g(), m("li", { key: u }, [
                f("span", {
                  class: S(["dropdown-item cursor-pointer", [u.class]]),
                  onClick: (d) => r.tableAction(u, {
                    items: i.items,
                    $event: d
                  })
                }, [
                  u.icon ? (g(), m("i", {
                    key: 0,
                    class: S([u.icon])
                  }, null, 2)) : T("", !0),
                  pt(" " + I(r.translate(u.title)), 1)
                ], 10, mk)
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
          f("tr", bk, [
            (g(!0), m(tt, null, st(s.settings.table.columns, (l) => (g(), m("th", {
              class: S(["", [l.header ? l.header.class : ""]]),
              style: Qn([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width
            }, [
              f("span", {
                class: S(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(l) }]),
                onClick: (u) => r.sortTable(l)
              }, [
                f("span", {
                  innerHTML: l.header && l.header.title !== void 0 ? r.translate(l.header.title) : l.title ? r.translate(l.title) : r.translate(l.name)
                }, null, 8, _k),
                i.config.order[l.name] ? (g(), m("span", {
                  key: 0,
                  class: S(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[l.name].fixed
                  }])
                }, [
                  i.config.order[l.name].dir === "ASC" ? (g(), m("i", Ek)) : T("", !0),
                  i.config.order[l.name].dir === "DESC" ? (g(), m("i", wk)) : T("", !0),
                  pt(" " + I(i.config.order[l.name].idx + 1), 1)
                ], 2)) : T("", !0)
              ], 10, vk),
              l.header && l.header.buttons ? (g(), m("span", Tk, [
                (g(!0), m(tt, null, st(l.header.buttons, (u) => (g(), m("button", {
                  key: u.action,
                  type: "button",
                  disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                  class: S([
                    u.class ? u.class : r.getButtonClassByAction(u.action)
                  ]),
                  onClick: (d) => r.tableAction(u, {
                    items: i.items,
                    $event: d
                  })
                }, [
                  f("i", {
                    class: S([
                      u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                        button: u,
                        column: l,
                        table: this
                      }) : r.getButtonIconClassByAction(u.action)
                    ])
                  }, null, 2),
                  pt(" " + I(r.translate(u.title)), 1)
                ], 10, Ak))), 128))
              ])) : T("", !0)
            ], 14, yk))), 128))
          ]),
          r.countFilters() ? (g(), m("tr", Ok, [
            (g(!0), m(tt, null, st(s.settings.table.columns, (l) => (g(), m("th", {
              style: Qn([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width,
              class: S([l.filter ? l.filter.class : ""])
            }, [
              l.index && l.click ? (g(), m("div", kk, [
                f("span", {
                  class: S(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (u) => r.toggleSelectedRowInPage())
                }, [
                  at(f("i", Sk, null, 512), [
                    [Cs, !r.haveSelectedRowInPage()]
                  ]),
                  at(f("i", Ck, null, 512), [
                    [Cs, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : T("", !0),
              l.filter && l.filter.type == "text" ? (g(), m("div", Lk, [
                at(f("input", {
                  type: "text",
                  class: S([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => l.filter.value = u,
                  onKeyup: t[3] || (t[3] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, Ik), [
                  [de, l.filter.value]
                ]),
                l.filter.buttonx && l.filter.buttonx != !1 ? (g(), m("button", {
                  key: 0,
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": l.filter.value == null
                  }]),
                  disabled: l.filter.value == null,
                  onClick: (u) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, t[17] || (t[17] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, xk)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "number" ? (g(), m("div", $k, [
                l.filter.operators == !0 ? at((g(), m("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => l.filter.operator = u,
                  disabled: l.filter.fixed,
                  onChange: t[4] || (t[4] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", Rk, I(r.translate("=")), 1),
                  f("option", Dk, I(r.translate(">")), 1),
                  f("option", qk, I(r.translate(">=")), 1),
                  f("option", Bk, I(r.translate("<")), 1),
                  f("option", Pk, I(r.translate("<=")), 1)
                ], 40, Mk)), [
                  [ke, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? at((g(), m("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => l.filter.operator = u,
                  disabled: l.filter.fixed,
                  onChange: t[5] || (t[5] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), m(tt, null, st(l.filter.operators, (u) => (g(), m("option", {
                    key: u,
                    value: u.value
                  }, I(u.label), 9, jk))), 128))
                ], 40, Vk)), [
                  [ke, l.filter.operator]
                ]) : T("", !0),
                at(f("input", {
                  type: "number",
                  class: S(["form-control", {
                    fixed: l.filter.fixed
                  }]),
                  "onUpdate:modelValue": (u) => l.filter.value = u,
                  disabled: l.filter.fixed,
                  min: l.filter.min,
                  max: l.filter.max,
                  onChange: t[6] || (t[6] = (u) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, Fk), [
                  [de, l.filter.value]
                ]),
                !l.filter.fixed && l.filter.buttonx && l.filter.buttonx != !1 ? (g(), m("button", {
                  key: 2,
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": l.filter.value == null
                  }]),
                  disabled: l.filter.value == null,
                  onClick: (u) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, t[18] || (t[18] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, Uk)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "select" ? (g(), m("div", Hk, [
                l.filter.dropdown ? (g(), m("div", Wk, [
                  f("button", zk, I(l.filter.multiple ? l.filter.value.length + " selected" : l.filter.value ? l.filter.value : "not selected"), 1),
                  f("ul", Kk, [
                    f("li", null, [
                      (g(!0), m(tt, null, st(l.filter.options, (u) => (g(), m("span", {
                        key: u,
                        class: S(["dropdown-item cursor-pointer", { selected: l.filter.multiple ? l.filter.value.indexOf(u.value) >= 0 : l.filter.value === u.value }]),
                        onClick: (d) => r.dropdownSelectToggleOne(l.filter, u)
                      }, [
                        (l.filter.multiple ? l.filter.value.indexOf(u.value) >= 0 : l.filter.value === u.value) ? (g(), m("i", Yk)) : (g(), m("i", Xk)),
                        pt(" " + I(r.translate(u.label ? u.label : u.value)), 1)
                      ], 10, Gk))), 128))
                    ]),
                    l.filter.multiple ? (g(), m("li", Zk, t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : T("", !0),
                    l.filter.multiple ? (g(), m("li", Qk, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectAll(l.filter.value, l.filter.options)
                      }, I(r.translate("Select all")), 9, Jk)
                    ])) : T("", !0),
                    l.filter.multiple ? (g(), m("li", t2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectClear(l.filter.value)
                      }, I(r.translate("Unselect all")), 9, e2)
                    ])) : T("", !0),
                    l.filter.multiple ? (g(), m("li", s2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectInvert(l.filter.value, l.filter.options)
                      }, I(r.translate("Invert all")), 9, n2)
                    ])) : T("", !0)
                  ])
                ])) : (g(), m("div", i2, [
                  at(f("select", {
                    "onUpdate:modelValue": (u) => l.filter.value = u,
                    onChange: t[8] || (t[8] = (u) => r.reloadTable()),
                    multiple: l.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (g(!0), m(tt, null, st(l.filter.options, (u) => (g(), m("option", {
                      key: u,
                      value: u.value
                    }, I(r.translate(u.label ? u.label : u.value)), 9, o2))), 128))
                  ], 40, r2), [
                    [ke, l.filter.value]
                  ]),
                  l.filter.buttonx && l.filter.buttonx != !1 ? (g(), m("button", {
                    key: 0,
                    class: S(["btn btn-outline-secondary", {
                      "opacity-25": l.filter.value == null
                    }]),
                    disabled: l.filter.value == null,
                    onClick: (u) => {
                      l.filter.value = void 0, r.reloadTable();
                    }
                  }, t[20] || (t[20] = [
                    f("i", { class: "bi bi-x" }, null, -1)
                  ]), 10, a2)) : T("", !0)
                ]))
              ])) : T("", !0),
              l.filter && (l.filter.type == "datetime-local" || l.filter.type == "date") ? (g(), m("div", l2, [
                l.filter.operators == !0 ? at((g(), m("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => l.filter.operator = u,
                  onChange: t[9] || (t[9] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", u2, I(r.translate("=")), 1),
                  f("option", h2, I(r.translate(">")), 1),
                  f("option", d2, I(r.translate(">=")), 1),
                  f("option", f2, I(r.translate("<")), 1),
                  f("option", p2, I(r.translate("<=")), 1)
                ], 40, c2)), [
                  [ke, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? at((g(), m("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => l.filter.operator = u,
                  onChange: t[10] || (t[10] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), m(tt, null, st(l.filter.operators, (u) => (g(), m("option", {
                    key: u,
                    value: u.value
                  }, I(r.translate(u.label)), 9, m2))), 128))
                ], 40, g2)), [
                  [ke, l.filter.operator]
                ]) : T("", !0),
                at(f("input", {
                  type: l.filter.type,
                  class: S([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => l.filter.value = u,
                  onChange: t[11] || (t[11] = (u) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ai((u) => r.reloadTable(), ["enter"]))
                }, null, 42, b2), [
                  [ge, l.filter.value]
                ]),
                f("button", {
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": !l.filter.value
                  }]),
                  disabled: !l.filter.value,
                  onClick: (u) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, t[21] || (t[21] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, y2)
              ])) : T("", !0),
              l.filter && l.filter.buttons ? (g(), m("span", {
                key: 5,
                class: S(
                  r.getValueOrFunction(l.filter.buttons, {
                    column: l
                  })
                )
              }, [
                (g(!0), m(tt, null, st(l.filter.buttons, (u) => (g(), m("span", {
                  key: u.action
                }, [
                  f("button", {
                    type: "button",
                    disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                    class: S([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    onClick: (d) => r.tableAction(u, {
                      items: i.items,
                      $event: d
                    })
                  }, [
                    f("i", {
                      class: S([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: l,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2),
                    pt(" " + I(r.translate(u.title)), 1)
                  ], 10, v2)
                ]))), 128))
              ], 2)) : T("", !0)
            ], 14, Nk))), 128))
          ])) : T("", !0)
        ]),
        f("tbody", null, [
          (g(!0), m(tt, null, st(this.items, (l, u) => (g(), m(tt, {
            key: l.id
          }, [
            f("tr", _2, [
              (g(!0), m(tt, null, st(s.settings.table.columns, (d) => (g(), m("td", {
                style: Qn([d.hidden ? "display: none" : ""]),
                key: d.name,
                "data-label": d.title ? d.title : r.translate(d.name),
                width: d.width,
                class: S(
                  r.getValueOrFunction(d.class, {
                    column: d,
                    item: l
                  })
                ),
                onClick: (h) => r.tableAction(d, {
                  item: l,
                  index: u,
                  $event: h
                })
              }, [
                d.index ? (g(), m("div", w2, [
                  f("span", {
                    class: S(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(l[s.settings.pkey]) >= 0
                    }]),
                    innerHTML: u + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, T2)
                ])) : T("", !0),
                !d.template && !d.input && !d.progressbar ? (g(), m("span", A2, I(r.tableCellValue(d.name, l, u, d)), 1)) : T("", !0),
                d.template ? (g(), m("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(d.template, l, u, d)
                }, null, 8, O2)) : T("", !0),
                d.progressbar ? (g(), m("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": l[d.name],
                  "aria-valuemax": d.progressbar.max
                }, [
                  f("div", {
                    class: S(["progress-bar", [d.progressbar.class]]),
                    style: Qn({ width: Math.round(l[d.name] / d.progressbar.max * 100) + "%" })
                  }, [
                    d.progressbar.value ? (g(), m("span", k2, I(l[d.name]), 1)) : T("", !0)
                  ], 6)
                ], 8, N2)) : T("", !0),
                d.input ? (g(), m("div", S2, [
                  d.input.prefix ? (g(), m("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.prefix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, C2)) : T("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    d.input.type
                  ) >= 0 ? at((g(), m("input", {
                    key: 1,
                    type: d.input.type,
                    class: S(["form-control form-control-sm", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, u),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, null, 42, L2)), [
                    [ge, l[d.name]]
                  ]) : T("", !0),
                  d.input.type == "select" ? at((g(), m("select", {
                    key: 2,
                    class: S(["form-select form-select-sm pe-0", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, u),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, [
                    (g(!0), m(tt, null, st(d.input.options, (h) => (g(), m("option", {
                      value: h.value,
                      key: h
                    }, I(r.translate(h.label)), 9, x2))), 128))
                  ], 42, I2)), [
                    [ke, l[d.name]]
                  ]) : T("", !0),
                  d.input.suffix ? (g(), m("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.suffix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, $2)) : T("", !0)
                ])) : T("", !0),
                d.buttons ? (g(), m("span", M2, [
                  (g(!0), m(tt, null, st(d.buttons, (h) => (g(), m("span", {
                    key: h.action
                  }, [
                    h.hidden ? T("", !0) : (g(), m("button", {
                      key: 0,
                      type: "button",
                      disabled: h.disabled !== void 0 ? r.getValueOrFunction(h.disabled) : null,
                      class: S([
                        h.class ? r.getValueOrFunction(h.class, {
                          button: h,
                          column: d,
                          item: l,
                          table: this
                        }) : r.getButtonClassByAction(h.action)
                      ]),
                      onClick: (b) => r.tableAction(h, {
                        column: d,
                        item: l,
                        index: u,
                        $event: b
                      })
                    }, [
                      h.icon !== null ? (g(), m("i", {
                        key: 0,
                        class: S([
                          h.icon !== void 0 ? r.getValueOrFunction(h.icon, {
                            button: h,
                            column: d,
                            item: l,
                            table: this
                          }) : r.getButtonIconClassByAction(h.action)
                        ])
                      }, null, 2)) : T("", !0),
                      h.template ? (g(), m("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(h.template, l, u, d)
                      }, null, 8, D2)) : (g(), m("span", q2, I(r.translate(h.title)), 1))
                    ], 10, R2))
                  ]))), 128))
                ])) : T("", !0)
              ], 14, E2))), 128))
            ]),
            s.settings.table.details && i.details.indexOf(l[s.settings.pkey]) >= 0 ? (g(), m("tr", B2, [
              f("td", {
                class: S([s.settings.table.details.class]),
                colspan: s.settings.table.columns.length
              }, [
                (g(!0), m(tt, null, st(s.settings.table.details.fields, (d) => (g(), m("div", {
                  class: "m-0",
                  key: d
                }, [
                  f("div", V2, [
                    f("div", {
                      class: S(["col text-end", [d.class]])
                    }, [
                      f("label", j2, I(d.label), 1)
                    ], 2),
                    f("div", {
                      class: S(["col", [d.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(d.input.type) < 0 ? at((g(), m("input", {
                        key: 0,
                        type: d.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, u)
                      }, null, 40, F2)), [
                        [ge, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "textarea" ? at((g(), m("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, u)
                      }, `\r
                    `, 40, U2)), [
                        [de, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "select" ? at((g(), m("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, u)
                      }, [
                        (g(!0), m(tt, null, st(d.input.options, (h) => (g(), m("option", {
                          value: h.value,
                          key: h
                        }, I(r.translate(h.label)), 9, W2))), 128))
                      ], 40, H2)), [
                        [ke, l[d.name]]
                      ]) : T("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: s.settings.table.details.raw(l)
                }, null, 8, z2),
                s.settings.debug > 1 ? (g(), m("pre", K2, "                  " + I(l) + `
                `, 1)) : T("", !0)
              ], 10, P2)
            ])) : T("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (g(), m("tr", G2, [
            (g(!0), m(tt, null, st(s.settings.table.columns, (l) => (g(), m("td", {
              style: Qn([l.hidden ? "display: none" : ""]),
              key: l.name,
              "data-label": l.title,
              width: l.width,
              class: S(l.class)
            }, [
              l.index ? (g(), m("div", X2, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (u) => r.toggleSelectedAll())
                }, I(i.selected.length), 1)
              ])) : T("", !0),
              l.input && l.bulk && l.bulk.enabled ? (g(), m("div", Z2, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  l.input.type
                ) >= 0 ? at((g(), m("input", {
                  key: 0,
                  type: l.input.type,
                  class: S(["form-control form-control-sm", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (u) => i.bulkitem[l.name] = u
                }, null, 42, Q2)), [
                  [ge, i.bulkitem[l.name]]
                ]) : T("", !0),
                l.input.type == "select" ? at((g(), m("select", {
                  key: 1,
                  class: S(["form-select form-select-sm pe-0", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (u) => i.bulkitem[l.name] = u
                }, [
                  (g(!0), m(tt, null, st(l.input.options, (u) => (g(), m("option", {
                    value: u.value,
                    key: u
                  }, I(r.translate(u.label)), 9, tS))), 128))
                ], 42, J2)), [
                  [ke, i.bulkitem[l.name]]
                ]) : T("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (u) => r.ifBulkInputClick(l)
                }, [
                  i.bulkitem[l.name] === void 0 ? (g(), m("i", sS)) : (g(), m("i", nS))
                ], 8, eS)
              ])) : T("", !0),
              l.bulk ? (g(), m("span", iS, [
                (g(!0), m(tt, null, st(l.bulk.buttons, (u) => (g(), m("span", {
                  key: u.action
                }, [
                  f("button", {
                    type: "button",
                    class: S([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    disabled: u.action === "save" && !this.bulkinputs.length,
                    onClick: (d) => r.tableBulkAction(u.action, i.bulkitem, l, d)
                  }, [
                    u.icon !== null ? (g(), m("i", {
                      key: 0,
                      class: S([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: l,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2)) : T("", !0),
                    u.template ? (g(), m("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(u.template, i.bulkitem, null, l)
                    }, null, 8, oS)) : (g(), m("span", aS, I(r.translate(u.title)), 1))
                  ], 10, rS)
                ]))), 128))
              ])) : T("", !0)
            ], 14, Y2))), 128))
          ])) : T("", !0)
        ])
      ], 2)) : T("", !0),
      _r(o, {
        settings: s.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"])
    ], 10, HN)) : T("", !0),
    f("div", {
      class: "modal shadow",
      id: i.modalId,
      tabindex: "-1"
    }, [
      f("div", cS, [
        f("div", uS, [
          r.authAndSettings() && s.settings.form.visible && s.settings.form.groups ? (g(), ze(a, {
            key: 0,
            modelValue: i.item,
            "onUpdate:modelValue": t[14] || (t[14] = (l) => i.item = l),
            formid: i.formId,
            settings: s.settings,
            modalWindow: i.modalWindow,
            auth: s.auth,
            saveItem: r.saveItem,
            deleteItem: r.deleteItem,
            reloadTable: r.reloadTable,
            fetchRelation: r.fetchRelation
          }, null, 8, ["modelValue", "formid", "settings", "modalWindow", "auth", "saveItem", "deleteItem", "reloadTable", "fetchRelation"])) : T("", !0)
        ])
      ])
    ], 8, lS)
  ]);
}
const dS = /* @__PURE__ */ oe(UN, [["render", hS]]), fS = {
  name: "VuAdmin",
  props: {
    entity: {
      type: String,
      required: !0
    },
    preset: {
      type: String,
      required: !1
    },
    auth: {
      type: Object
    }
  },
  init: (e) => {
  },
  watch: {
    auth: {
      immediate: !0,
      handler(e, t) {
        e != t && this.loadSettings();
      }
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
  },
  mounted() {
  },
  methods: {
    async loadSettings() {
      if (!this.auth.settings || !this.auth.settings.entities || !this.auth.settings.entities[this.entity]) {
        console.error(`Entity config (${this.entity}) not found`);
        return;
      }
      const e = this.auth.settings.entitiesVariable ? this.auth.settings.entitiesVariable : "VuEntities";
      this.loadScript(this.auth.settings.entities[this.entity], () => {
        window[e] && window[e][this.entity] ? this.init(window[e][this.entity](this.preset)) : console.error(`Entity config (${this.entity}) not found`);
      });
    },
    loadScript(e, t) {
      const s = document.createElement("script");
      s.async = !0, s.src = e, s.onload = () => {
        t && t();
      }, s.onerror = () => {
      }, document.head.appendChild(s);
    },
    init(e) {
      if (e) {
        if (this.settings = Pr(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
          const t = document.documentElement.getAttribute("data-bs-theme");
          this.settings.theme = t || "light";
        }
        this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log(`Entity config (${this.entity}) initialized`), this.settings.debug > 1 && console.log(this.settings));
      } else
        console.error(`Entity config (${this.entity}) not found`);
      this.$forceUpdate();
    }
  },
  components: {
    VuAdminTable: dS
  }
}, pS = fS, gS = { key: 0 }, mS = ["data-bs-theme"];
function bS(e, t, s, n, i, r) {
  const o = pe("vu-admin-table");
  return e.entity && e.settings ? (g(), m("div", gS, [
    e.auth ? (g(), m("div", {
      key: 0,
      class: "vu-admin",
      "data-bs-theme": [e.settings.theme]
    }, [
      _r(o, {
        settings: e.settings,
        auth: e.auth
      }, null, 8, ["settings", "auth"])
    ], 8, mS)) : T("", !0)
  ])) : T("", !0);
}
const yS = /* @__PURE__ */ oe(pS, [["render", bS]]), vS = (e) => {
  const t = new DataView(e);
  let s = "";
  for (let n = 0; n < t.byteLength; n += 4)
    s += t.getUint32(n).toString(16).padStart(8, "0");
  return s;
}, _S = (e) => async (t, { outputFormat: s = "hex" } = {}) => {
  typeof t == "string" && (t = new globalThis.TextEncoder().encode(t));
  const n = await globalThis.crypto.subtle.digest(e, t);
  return s === "hex" ? vS(n) : n;
}, ES = _S("SHA-384");
sl();
const wS = {
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
      },
      modalId: null,
      modalElement: null,
      modalWindow: null
    };
  },
  components: {
    VuAdminForm: Id
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
      this.auth.user = {}, this.auth.user = JSON.parse(localStorage.getItem("vu-user")), this.auth.header = JSON.parse(localStorage.getItem("vu-header")), this.auth.settings = JSON.parse(localStorage.getItem("vu-settings")), this.auth.user && (this.auth.success = !0), this.$emit("update:modelValue", this.auth);
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
        t = await ES(t);
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
      this.settings.onSuccess && (this.settings.onSuccess(e, this.auth), localStorage.setItem("vu-user", JSON.stringify(this.auth.user)), localStorage.setItem("vu-header", JSON.stringify(this.auth.header)), localStorage.setItem("vu-settings", JSON.stringify(this.auth.settings))), this.auth.success = !0, setTimeout(() => {
        this.authUpdate(e), this.$forceUpdate();
      }, 0);
    },
    logout() {
      this.auth.success = !1, this.auth.header = null, this.auth.settings = null, this.auth.user = null, this.$emit("update:modelValue", this.auth), localStorage.removeItem("vu-user"), localStorage.removeItem("vu-header"), localStorage.removeItem("vu-settings");
    },
    showProfilModal() {
      this.modalWindow.show();
    },
    getValueOrFunction(e, t) {
      return js(e, t, this.settings, this);
    }
  },
  created() {
    window.VuSettings && window.VuSettings.auth && (this.settings = window.VuSettings.auth);
    let e = Math.round(Math.random() * 1e5);
    this.formId = "form_profil_" + e, this.modalId = "modal_profil_" + e;
  },
  mounted() {
    if (window.addEventListener("keydown", this.handleEscapeKey), this.recaptchaSiteKey && !document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const e = document.createElement("script");
      e.src = "https://www.google.com/recaptcha/api.js", e.async = !0, e.defer = !0, document.head.appendChild(e);
    }
    this.settings.username.value && (this.username = this.settings.username.value), this.auth || (this.auth = {
      user: void 0,
      header: void 0,
      settings: void 0,
      success: !1
    }, this.authUpdate()), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.settings.debug && console.log("vu-auth mounted ", "1.2.89");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }
}, TS = wS, AS = {
  key: 0,
  class: "vua-auth"
}, OS = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, NS = { class: "text-center mt-2 mb-4" }, kS = { key: 0 }, SS = { key: 1 }, CS = { key: 2 }, LS = { key: 3 }, IS = { key: 0 }, xS = ["innerHTML"], $S = { class: "d-flex justify-content-between" }, MS = { class: "mb-3" }, RS = {
  for: "email",
  class: "form-label text-primary"
}, DS = { class: "input-group" }, qS = ["type", "placeholder"], BS = ["innerHTML"], PS = { class: "mb-3" }, VS = {
  for: "password",
  class: "form-label text-primary"
}, jS = { class: "input-group" }, FS = ["type", "placeholder", "pattern", "minlength"], US = {
  key: 0,
  class: "bi bi-eye"
}, HS = {
  key: 1,
  class: "bi bi-eye-slash"
}, WS = ["innerHTML"], zS = {
  key: 0,
  class: "mb-4"
}, KS = {
  for: "password_again",
  class: "form-label text-primary"
}, GS = {
  key: 0,
  class: "text-danger"
}, YS = { class: "input-group" }, XS = ["type", "placeholder", "minlength"], ZS = {
  key: 0,
  class: "bi bi-eye"
}, QS = {
  key: 1,
  class: "bi bi-eye-slash"
}, JS = ["innerHTML"], tC = { class: "mb-3 text-center" }, eC = ["data-sitekey"], sC = {
  key: 1,
  class: "mb-4 text-center"
}, nC = {
  key: 2,
  class: "d-flex mb-4"
}, iC = { key: 3 }, rC = { key: 0 }, oC = ["for", "innerHTML"], aC = { class: "input-group" }, lC = ["innerHTML"], cC = ["required", "onUpdate:modelValue", "multiple"], uC = ["value", "innerHTML"], hC = ["id", "name", "type", "onUpdate:modelValue", "placeholder", "required"], dC = ["innerHTML"], fC = ["innerHTML"], pC = {
  key: 0,
  class: "form-check"
}, gC = ["id", "name", "onUpdate:modelValue", "required"], mC = ["for", "innerHTML"], bC = {
  key: 4,
  class: "mt-4"
}, yC = ["innerHTML"], vC = { class: "mt-4 d-flex justify-content-between" }, _C = {
  key: 0,
  class: "bi bi-person-plus mx-1"
}, EC = {
  key: 1,
  class: "bi bi-arrow-right-square mx-1"
}, wC = {
  key: 5,
  class: "mt-3 text-center"
}, TC = ["innerHTML"], AC = { class: "mt-2 text-end" }, OC = ["id"], NC = { class: "modal-dialog modal-xl" }, kC = { class: "modal-content h-100" };
function SC(e, t, s, n, i, r) {
  const o = pe("VuAdminForm");
  return e.auth && e.auth.visible ? (g(), m("div", AS, [
    f("div", {
      class: "row d-flex justify-content-center align-items-center min-vh-100",
      onClick: t[16] || (t[16] = Lt((...a) => e.close && e.close(...a), ["stop"]))
    }, [
      f("div", OS, [
        f("div", {
          class: "card shadow p-4 position-relative bg-light",
          onClick: t[15] || (t[15] = Lt(() => {
          }, ["stop"]))
        }, [
          f("button", {
            type: "button",
            class: "btn position-absolute top-0 end-0 p-0 m-2",
            onClick: t[0] || (t[0] = Lt((...a) => e.close && e.close(...a), ["stop"]))
          }, t[18] || (t[18] = [
            f("i", { class: "bi bi-x px-1 text-muted" }, null, -1)
          ])),
          f("h1", NS, [
            e.auth.panel == "forgot" ? (g(), m("span", kS, " Elfelejtett jelszó ")) : T("", !0),
            e.auth.panel == "registration" ? (g(), m("span", SS, " Regisztráció ")) : T("", !0),
            e.auth.panel == "help" ? (g(), m("span", CS, " Segítség ")) : T("", !0),
            e.auth.panel == "login" ? (g(), m("span", LS, " Bejelentkezés ")) : T("", !0)
          ]),
          e.auth.panel == "help" ? (g(), m("div", IS, [
            f("div", {
              innerHTML: e.settings.help,
              class: "mb-4"
            }, null, 8, xS),
            f("div", $S, [
              e.auth.panel != "login" ? (g(), m("button", {
                key: 0,
                type: "button",
                onClick: t[1] || (t[1] = Lt((...a) => e.toggleClear && e.toggleClear(...a), ["stop"])),
                class: "btn btn-secondary w-100 me-1"
              }, t[19] || (t[19] = [
                f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1),
                pt(" Vissza ")
              ]))) : T("", !0)
            ])
          ])) : (g(), m("form", {
            key: 1,
            onSubmit: t[13] || (t[13] = Lt((a) => e.handleSubmit(), ["prevent"])),
            onClick: t[14] || (t[14] = Lt(() => {
            }, ["stop"]))
          }, [
            f("div", MS, [
              f("label", RS, I(e.settings.username.label), 1),
              f("div", DS, [
                e.settings.username.icon ? (g(), m("span", {
                  key: 0,
                  class: S(["input-group-text", { "rounded-bottom-0": e.settings.username.help }])
                }, [
                  f("i", {
                    class: S([e.settings.username.icon])
                  }, null, 2)
                ], 2)) : T("", !0),
                at(f("input", {
                  id: "email",
                  name: "email",
                  type: e.settings.username.type,
                  "onUpdate:modelValue": t[2] || (t[2] = (a) => e.username = a),
                  class: S(["form-control", { "rounded-bottom-0": e.settings.username.help }]),
                  placeholder: e.settings.username.placeholder,
                  required: ""
                }, null, 10, qS), [
                  [ge, e.username]
                ])
              ]),
              e.settings.username.help ? (g(), m("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                innerHTML: e.settings.username.help
              }, null, 8, BS)) : T("", !0)
            ]),
            e.auth.panel != "forgot" ? (g(), m(tt, { key: 0 }, [
              f("div", PS, [
                f("label", VS, I(e.settings.password.label), 1),
                f("div", jS, [
                  e.settings.password.icon ? (g(), m("span", {
                    key: 0,
                    class: S(["input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }])
                  }, [
                    f("i", {
                      class: S([e.settings.password.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  at(f("input", {
                    id: "password",
                    name: "password",
                    type: e.settings.password.type,
                    "onUpdate:modelValue": t[3] || (t[3] = (a) => e.password = a),
                    class: S(["form-control", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    placeholder: e.settings.password.placeholder,
                    pattern: e.settings.password.pattern,
                    minlength: e.auth.panel == "registration" ? e.settings.password.minlength : 1,
                    required: ""
                  }, null, 10, FS), [
                    [ge, e.password]
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
                    }, I(e.password.length), 3)
                  ], 2)) : T("", !0),
                  f("span", {
                    class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    onClick: t[4] || (t[4] = Lt((a) => e.toggleType("password"), ["stop"]))
                  }, [
                    e.settings.password.type == "password" ? (g(), m("i", US)) : (g(), m("i", HS))
                  ], 2)
                ]),
                e.auth.panel == "registration" && e.settings.password.help ? (g(), m("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                  innerHTML: e.settings.password.help
                }, null, 8, WS)) : T("", !0)
              ]),
              e.auth.panel === "registration" ? (g(), m("div", zS, [
                f("label", KS, [
                  pt(I(e.settings.password_again.label) + " ", 1),
                  e.password_again.length > 0 && e.password_again != e.password ? (g(), m("small", GS, " ( a két jelszó nem egyezik ) ")) : T("", !0)
                ]),
                f("div", YS, [
                  e.settings.password.icon ? (g(), m("span", {
                    key: 0,
                    class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("i", {
                      class: S([e.settings.password_again.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  at(f("input", {
                    id: "password_again",
                    name: "password_again",
                    type: e.settings.password_again.type,
                    "onUpdate:modelValue": t[5] || (t[5] = (a) => e.password_again = a),
                    class: S(["form-control", { "rounded-bottom-0": e.settings.password_again.help }]),
                    placeholder: e.settings.password_again.placeholder,
                    minlength: e.settings.password.minlength,
                    required: ""
                  }, null, 10, XS), [
                    [ge, e.password_again]
                  ]),
                  f("span", {
                    class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("small", {
                      class: S(["", {
                        "text-success": e.password_again.length >= e.settings.password.minlength,
                        "text-danger": e.password_again.length < e.settings.password.minlength
                      }])
                    }, I(e.password_again.length), 3)
                  ], 2),
                  f("span", {
                    class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password_again.help }]),
                    onClick: t[6] || (t[6] = Lt((a) => e.toggleType("password_again"), ["stop"]))
                  }, [
                    e.settings.password_again.type == "password" ? (g(), m("i", ZS)) : (g(), m("i", QS))
                  ], 2)
                ]),
                e.auth.panel == "registration" && e.settings.password_again.help ? (g(), m("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                  innerHTML: e.settings.password_again.help
                }, null, 8, JS)) : T("", !0)
              ])) : T("", !0),
              f("div", tC, [
                f("div", {
                  class: "g-recaptcha",
                  "data-sitekey": e.recaptchaSiteKey,
                  onClick: t[7] || (t[7] = Lt((...a) => e.onCaptchaClick && e.onCaptchaClick(...a), ["stop"]))
                }, null, 8, eC)
              ])
            ], 64)) : T("", !0),
            e.auth.panel == "login" ? (g(), m("div", sC, [
              f("button", {
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[8] || (t[8] = Lt((...a) => e.toggleForgotPassword && e.toggleForgotPassword(...a), ["stop"]))
              }, " Elfelejtetted a jelszavad? "),
              e.settings.help ? (g(), m("button", {
                key: 0,
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[9] || (t[9] = Lt((...a) => e.toggleHelp && e.toggleHelp(...a), ["stop"]))
              }, " Segítségre van szükséged? ")) : T("", !0)
            ])) : T("", !0),
            e.auth.panel == "forgot" ? (g(), m("div", nC, t[20] || (t[20] = [
              f("small", { class: "text-muted" }, " A megadott e-mail címre ( amennyiben az szerepel az adatbázisunkban ) egy levelet küldünk, melyben az új jelszó igénylése linkre kattintva egy weboldalra jutsz. Ott tudod megadni az új jelszavadat. Az e-mailben szereplő link csak 1 óráig érvényes. ", -1)
            ]))) : T("", !0),
            e.auth.panel == "registration" ? (g(), m("div", iC, [
              (g(!0), m(tt, null, st(e.settings.inputs, (a, l) => (g(), m("div", {
                key: l,
                class: "mb-4"
              }, [
                a.hidden ? T("", !0) : (g(), m("div", rC, [
                  f("label", {
                    for: l,
                    class: "form-label text-primary",
                    innerHTML: e.getValueOrFunction(a.label)
                  }, null, 8, oC),
                  f("div", aC, [
                    a.prefix ? (g(), m("span", {
                      key: 0,
                      class: S(["input-group-text", { "rounded-bottom-0": a.help }]),
                      innerHTML: e.getValueOrFunction(a.prefix)
                    }, null, 10, lC)) : T("", !0),
                    a.type == "select" ? at((g(), m("select", {
                      key: 1,
                      class: "form-select",
                      required: a.required,
                      "onUpdate:modelValue": (u) => e.inputs[l] = u,
                      multiple: a.multiple
                    }, [
                      t[21] || (t[21] = f("option", null, null, -1)),
                      (g(!0), m(tt, null, st(a.options, (u) => (g(), m("option", {
                        key: u,
                        value: u.value,
                        innerHTML: e.getValueOrFunction(u.label)
                      }, null, 8, uC))), 128))
                    ], 8, cC)), [
                      [ke, e.inputs[l]]
                    ]) : at((g(), m("input", {
                      key: 2,
                      id: l,
                      name: l,
                      type: a.type,
                      "onUpdate:modelValue": (u) => e.inputs[l] = u,
                      class: S(["form-control", { "rounded-bottom-0": a.help }]),
                      placeholder: a.placeholder,
                      required: a.required
                    }, null, 10, hC)), [
                      [ge, e.inputs[l]]
                    ]),
                    a.suffix ? (g(), m("span", {
                      key: 3,
                      class: S(["input-group-text", { "rounded-bottom-0": a.help }]),
                      innerHTML: e.getValueOrFunction(a.suffix)
                    }, null, 10, dC)) : T("", !0)
                  ]),
                  a.help ? (g(), m("small", {
                    key: 0,
                    class: "d-block border border-top-0 rounded-bottom bg-light p-2 text-muted",
                    innerHTML: e.getValueOrFunction(a.help)
                  }, null, 8, fC)) : T("", !0)
                ]))
              ]))), 128))
            ])) : T("", !0),
            (g(!0), m(tt, null, st(e.settings.accepts, (a) => (g(), m("div", { key: a }, [
              a.panels.indexOf(e.auth.panel) >= 0 ? (g(), m("div", pC, [
                at(f("input", {
                  type: "checkbox",
                  class: "form-check-input",
                  id: "accept_" + a.name,
                  name: "accept_" + a.name,
                  "onUpdate:modelValue": (l) => e.accepts[a.name] = l,
                  required: a.required
                }, null, 8, gC), [
                  [pu, e.accepts[a.name]]
                ]),
                f("label", {
                  class: "form-check-label",
                  for: "accept_" + a.name,
                  innerHTML: e.getValueOrFunction(a.label)
                }, null, 8, mC)
              ])) : T("", !0)
            ]))), 128)),
            e.auth.panel == "registration" && e.settings.registration ? (g(), m("div", bC, [
              e.settings.registration.help ? (g(), m("div", {
                key: 0,
                innerHTML: e.getValueOrFunction(e.settings.registration.help)
              }, null, 8, yC)) : T("", !0)
            ])) : T("", !0),
            f("div", vC, [
              e.auth.panel != "login" ? (g(), m("button", {
                key: 0,
                type: "button",
                onClick: t[10] || (t[10] = Lt((...a) => e.toggleClear && e.toggleClear(...a), ["stop"])),
                class: "btn btn-secondary w-100 me-2 text-nowrap"
              }, t[22] || (t[22] = [
                f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1),
                pt(" Bejelentkezés ")
              ]))) : T("", !0),
              e.auth.panel == "login" ? (g(), m("button", {
                key: 1,
                type: "button",
                class: "btn btn-warning w-100 me-2 text-nowrap",
                onClick: t[11] || (t[11] = Lt((...a) => e.toggleNewRegistration && e.toggleNewRegistration(...a), ["stop"]))
              }, t[23] || (t[23] = [
                f("i", { class: "bi bi-person-plus mx-1" }, null, -1),
                pt(" Regisztráció ")
              ]))) : T("", !0),
              f("button", {
                type: "submit",
                class: S(["btn w-100 text-nowrap", { "btn-primary": e.auth.panel != "registration", "btn-warning": e.auth.panel == "registration" }])
              }, [
                pt(I(e.auth.panel == "forgot" ? "Új jelszó kérése" : e.auth.panel == "registration" ? "Regisztráció" : "Bejelentkezés") + " ", 1),
                e.auth.panel == "registration" ? (g(), m("i", _C)) : (g(), m("i", EC))
              ], 2)
            ]),
            e.responseMessage ? (g(), m("div", wC, [
              f("div", {
                class: S({ "text-danger": !e.responseOk, "text-success": e.responseOk }),
                innerHTML: e.responseMessage
              }, null, 10, TC)
            ])) : T("", !0),
            f("div", AC, [
              f("button", {
                type: "button",
                onClick: t[12] || (t[12] = Lt((...a) => e.close && e.close(...a), ["stop"])),
                class: "btn btn-light border w-100 me-1"
              }, t[24] || (t[24] = [
                f("i", { class: "bi bi-x-square mx-1" }, null, -1),
                pt(" Mégsem ")
              ]))
            ])
          ], 32))
        ])
      ])
    ]),
    f("div", {
      class: "modal shadow",
      id: e.modalId,
      tabindex: "-1"
    }, [
      f("div", NC, [
        f("div", kC, [
          e.settings.form && e.settings.form.visible && e.settings.form.groups ? (g(), ze(o, {
            key: 0,
            modelValue: e.item,
            "onUpdate:modelValue": t[17] || (t[17] = (a) => e.item = a),
            formid: e.formId,
            settings: e.settings,
            modalWindow: e.modalWindow,
            auth: e.auth,
            saveItem: e.saveItem,
            deleteItem: e.deleteItem,
            reloadTable: e.reloadTable,
            fetchRelation: e.fetchRelation
          }, null, 8, ["modelValue", "formid", "settings", "modalWindow", "auth", "saveItem", "deleteItem", "reloadTable", "fetchRelation"])) : T("", !0)
        ])
      ])
    ], 8, OC)
  ])) : T("", !0);
}
const CC = /* @__PURE__ */ oe(TS, [["render", SC]]);
sl();
const LC = {
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
      return js(e, t, this.settings, this);
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
      this.auth.visible = !this.auth.visible, this.auth.panel = this.panel ? this.panel : "login", this.updateAuth(), console.log(this.auth);
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
}, IC = LC, xC = {
  key: 0,
  class: "vua-user-button d-inline-block"
}, $C = {
  key: 0,
  class: "dropdown"
}, MC = ["innerHTML"], RC = {
  class: "dropdown-menu dropdown-menu-end",
  "aria-labelledby": "userDropdown"
}, DC = ["onClick", "innerHTML"], qC = {
  key: 1,
  class: "d-inline-block"
}, BC = ["innerHTML"];
function PC(e, t, s, n, i, r) {
  return !e.auth.user && e.panel != "login" || e.panel == "login" ? (g(), m("div", xC, [
    e.auth.user ? (g(), m("div", $C, [
      f("button", {
        class: S(["dropdown-toggle", [e.settings.class]]),
        type: "button",
        id: "userDropdown",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }, [
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, MC)
      ], 2),
      f("ul", RC, [
        (g(!0), m(tt, null, st(e.settings.dropdowns, (o) => (g(), m("li", {
          key: o,
          class: S([o.class]),
          onClick: (a) => e.dropdownAction(o),
          innerHTML: e.getValueOrFunction(o.label)
        }, null, 10, DC))), 128))
      ])
    ])) : (g(), m("div", qC, [
      f("button", {
        class: S([e.settings.class]),
        type: "button",
        onClick: t[0] || (t[0] = (...o) => e.togglePanel && e.togglePanel(...o))
      }, [
        e.settings.icon ? (g(), m("i", {
          key: 0,
          class: S([e.settings.icon])
        }, null, 2)) : T("", !0),
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, BC)
      ], 2)
    ]))
  ])) : T("", !0);
}
const VC = /* @__PURE__ */ oe(IC, [["render", PC]]), GC = {
  install(e) {
    e.component("VuAdmin", yS), e.component("VuAuth", CC), e.component("VuUserButton", VC);
  }
};
export {
  yS as VuAdmin,
  CC as VuAuth,
  VC as VuUserButton,
  GC as default
};
