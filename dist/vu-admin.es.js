var xd = Object.defineProperty;
var Cd = (e, t, s) => t in e ? xd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Q = (e, t, s) => Cd(e, typeof t != "symbol" ? t + "" : t, s);
import { createElementBlock as b, openBlock as m, createElementVNode as f, createCommentVNode as T, toDisplayString as $, Fragment as dt, renderList as bt, normalizeClass as k, createTextVNode as At, resolveComponent as qe, withDirectives as _t, vModelText as Me, withKeys as di, withModifiers as Qt, createVNode as vr, vModelSelect as Xe, createBlock as gs, vModelDynamic as Pe, vModelCheckbox as _r, vShow as Ws, normalizeStyle as ni } from "vue";
var ue = "top", ge = "bottom", me = "right", he = "left", Sr = "auto", Hn = [ue, ge, me, he], Ys = "start", In = "end", mu = "clippingParents", Ba = "viewport", yn = "popper", bu = "reference", la = /* @__PURE__ */ Hn.reduce(function(e, t) {
  return e.concat([t + "-" + Ys, t + "-" + In]);
}, []), qa = /* @__PURE__ */ [].concat(Hn, [Sr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ys, t + "-" + In]);
}, []), yu = "beforeRead", vu = "read", _u = "afterRead", Eu = "beforeMain", wu = "main", Au = "afterMain", Tu = "beforeWrite", Fu = "write", xu = "afterWrite", Cu = [yu, vu, _u, Eu, wu, Au, Tu, Fu, xu];
function ss(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function be(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Xs(e) {
  var t = be(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ce(e) {
  var t = be(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Pa(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = be(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Od(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(s) {
    var n = t.styles[s] || {}, i = t.attributes[s] || {}, r = t.elements[s];
    !Ce(r) || !ss(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(a) {
      var o = i[a];
      o === !1 ? r.removeAttribute(a) : r.setAttribute(a, o === !0 ? "" : o);
    }));
  });
}
function Nd(e) {
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
      var i = t.elements[n], r = t.attributes[n] || {}, a = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : s[n]), o = a.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !Ce(i) || !ss(i) || (Object.assign(i.style, o), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const Va = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Od,
  effect: Nd,
  requires: ["computeStyles"]
};
function Je(e) {
  return e.split("-")[0];
}
var Gs = Math.max, Er = Math.min, $n = Math.round;
function ca() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ou() {
  return !/^((?!chrome|android).)*safari/i.test(ca());
}
function Dn(e, t, s) {
  t === void 0 && (t = !1), s === void 0 && (s = !1);
  var n = e.getBoundingClientRect(), i = 1, r = 1;
  t && Ce(e) && (i = e.offsetWidth > 0 && $n(n.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && $n(n.height) / e.offsetHeight || 1);
  var a = Xs(e) ? be(e) : window, o = a.visualViewport, l = !Ou() && s, c = (n.left + (l && o ? o.offsetLeft : 0)) / i, d = (n.top + (l && o ? o.offsetTop : 0)) / r, h = n.width / i, g = n.height / r;
  return {
    width: h,
    height: g,
    top: d,
    right: c + h,
    bottom: d + g,
    left: c,
    x: c,
    y: d
  };
}
function ja(e) {
  var t = Dn(e), s = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: s,
    height: n
  };
}
function Nu(e, t) {
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
function vs(e) {
  return be(e).getComputedStyle(e);
}
function Sd(e) {
  return ["table", "td", "th"].indexOf(ss(e)) >= 0;
}
function Ms(e) {
  return ((Xs(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function kr(e) {
  return ss(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Pa(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ms(e)
  );
}
function Nl(e) {
  return !Ce(e) || // https://github.com/popperjs/popper-core/issues/837
  vs(e).position === "fixed" ? null : e.offsetParent;
}
function kd(e) {
  var t = /firefox/i.test(ca()), s = /Trident/i.test(ca());
  if (s && Ce(e)) {
    var n = vs(e);
    if (n.position === "fixed")
      return null;
  }
  var i = kr(e);
  for (Pa(i) && (i = i.host); Ce(i) && ["html", "body"].indexOf(ss(i)) < 0; ) {
    var r = vs(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Ci(e) {
  for (var t = be(e), s = Nl(e); s && Sd(s) && vs(s).position === "static"; )
    s = Nl(s);
  return s && (ss(s) === "html" || ss(s) === "body" && vs(s).position === "static") ? t : s || kd(e) || t;
}
function Ua(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function fi(e, t, s) {
  return Gs(e, Er(t, s));
}
function Ld(e, t, s) {
  var n = fi(e, t, s);
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
function ku(e) {
  return Object.assign({}, Su(), e);
}
function Lu(e, t) {
  return t.reduce(function(s, n) {
    return s[n] = e, s;
  }, {});
}
var Id = function(t, s) {
  return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
    placement: s.placement
  })) : t, ku(typeof t != "number" ? t : Lu(t, Hn));
};
function $d(e) {
  var t, s = e.state, n = e.name, i = e.options, r = s.elements.arrow, a = s.modifiersData.popperOffsets, o = Je(s.placement), l = Ua(o), c = [he, me].indexOf(o) >= 0, d = c ? "height" : "width";
  if (!(!r || !a)) {
    var h = Id(i.padding, s), g = ja(r), v = l === "y" ? ue : he, _ = l === "y" ? ge : me, F = s.rects.reference[d] + s.rects.reference[l] - a[l] - s.rects.popper[d], O = a[l] - s.rects.reference[l], I = Ci(r), j = I ? l === "y" ? I.clientHeight || 0 : I.clientWidth || 0 : 0, W = F / 2 - O / 2, Y = h[v], G = j - g[d] - h[_], X = j / 2 - g[d] / 2 + W, ft = fi(Y, X, G), pt = l;
    s.modifiersData[n] = (t = {}, t[pt] = ft, t.centerOffset = ft - X, t);
  }
}
function Dd(e) {
  var t = e.state, s = e.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Nu(t.elements.popper, i) && (t.elements.arrow = i));
}
const Iu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: $d,
  effect: Dd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Rn(e) {
  return e.split("-")[1];
}
var Rd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Md(e, t) {
  var s = e.x, n = e.y, i = t.devicePixelRatio || 1;
  return {
    x: $n(s * i) / i || 0,
    y: $n(n * i) / i || 0
  };
}
function Sl(e) {
  var t, s = e.popper, n = e.popperRect, i = e.placement, r = e.variation, a = e.offsets, o = e.position, l = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, h = e.isFixed, g = a.x, v = g === void 0 ? 0 : g, _ = a.y, F = _ === void 0 ? 0 : _, O = typeof d == "function" ? d({
    x: v,
    y: F
  }) : {
    x: v,
    y: F
  };
  v = O.x, F = O.y;
  var I = a.hasOwnProperty("x"), j = a.hasOwnProperty("y"), W = he, Y = ue, G = window;
  if (c) {
    var X = Ci(s), ft = "clientHeight", pt = "clientWidth";
    if (X === be(s) && (X = Ms(s), vs(X).position !== "static" && o === "absolute" && (ft = "scrollHeight", pt = "scrollWidth")), X = X, i === ue || (i === he || i === me) && r === In) {
      Y = ge;
      var C = h && X === G && G.visualViewport ? G.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        X[ft]
      );
      F -= C - n.height, F *= l ? 1 : -1;
    }
    if (i === he || (i === ue || i === ge) && r === In) {
      W = me;
      var P = h && X === G && G.visualViewport ? G.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        X[pt]
      );
      v -= P - n.width, v *= l ? 1 : -1;
    }
  }
  var y = Object.assign({
    position: o
  }, c && Rd), x = d === !0 ? Md({
    x: v,
    y: F
  }, be(s)) : {
    x: v,
    y: F
  };
  if (v = x.x, F = x.y, l) {
    var w;
    return Object.assign({}, y, (w = {}, w[Y] = j ? "0" : "", w[W] = I ? "0" : "", w.transform = (G.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + F + "px)" : "translate3d(" + v + "px, " + F + "px, 0)", w));
  }
  return Object.assign({}, y, (t = {}, t[Y] = j ? F + "px" : "", t[W] = I ? v + "px" : "", t.transform = "", t));
}
function Bd(e) {
  var t = e.state, s = e.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, a = r === void 0 ? !0 : r, o = s.roundOffsets, l = o === void 0 ? !0 : o, c = {
    placement: Je(t.placement),
    variation: Rn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Sl(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Sl(Object.assign({}, c, {
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
  fn: Bd,
  data: {}
};
var Xi = {
  passive: !0
};
function qd(e) {
  var t = e.state, s = e.instance, n = e.options, i = n.scroll, r = i === void 0 ? !0 : i, a = n.resize, o = a === void 0 ? !0 : a, l = be(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && c.forEach(function(d) {
    d.addEventListener("scroll", s.update, Xi);
  }), o && l.addEventListener("resize", s.update, Xi), function() {
    r && c.forEach(function(d) {
      d.removeEventListener("scroll", s.update, Xi);
    }), o && l.removeEventListener("resize", s.update, Xi);
  };
}
const Wa = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: qd,
  data: {}
};
var Pd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function fr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Pd[t];
  });
}
var Vd = {
  start: "end",
  end: "start"
};
function kl(e) {
  return e.replace(/start|end/g, function(t) {
    return Vd[t];
  });
}
function za(e) {
  var t = be(e), s = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function Ka(e) {
  return Dn(Ms(e)).left + za(e).scrollLeft;
}
function jd(e, t) {
  var s = be(e), n = Ms(e), i = s.visualViewport, r = n.clientWidth, a = n.clientHeight, o = 0, l = 0;
  if (i) {
    r = i.width, a = i.height;
    var c = Ou();
    (c || !c && t === "fixed") && (o = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: a,
    x: o + Ka(e),
    y: l
  };
}
function Ud(e) {
  var t, s = Ms(e), n = za(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = Gs(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = Gs(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), o = -n.scrollLeft + Ka(e), l = -n.scrollTop;
  return vs(i || s).direction === "rtl" && (o += Gs(s.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: a,
    x: o,
    y: l
  };
}
function Ga(e) {
  var t = vs(e), s = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(s + i + n);
}
function $u(e) {
  return ["html", "body", "#document"].indexOf(ss(e)) >= 0 ? e.ownerDocument.body : Ce(e) && Ga(e) ? e : $u(kr(e));
}
function pi(e, t) {
  var s;
  t === void 0 && (t = []);
  var n = $u(e), i = n === ((s = e.ownerDocument) == null ? void 0 : s.body), r = be(n), a = i ? [r].concat(r.visualViewport || [], Ga(n) ? n : []) : n, o = t.concat(a);
  return i ? o : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    o.concat(pi(kr(a)))
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
function Hd(e, t) {
  var s = Dn(e, !1, t === "fixed");
  return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s;
}
function Ll(e, t, s) {
  return t === Ba ? ua(jd(e, s)) : Xs(t) ? Hd(t, s) : ua(Ud(Ms(e)));
}
function Wd(e) {
  var t = pi(kr(e)), s = ["absolute", "fixed"].indexOf(vs(e).position) >= 0, n = s && Ce(e) ? Ci(e) : e;
  return Xs(n) ? t.filter(function(i) {
    return Xs(i) && Nu(i, n) && ss(i) !== "body";
  }) : [];
}
function zd(e, t, s, n) {
  var i = t === "clippingParents" ? Wd(e) : [].concat(t), r = [].concat(i, [s]), a = r[0], o = r.reduce(function(l, c) {
    var d = Ll(e, c, n);
    return l.top = Gs(d.top, l.top), l.right = Er(d.right, l.right), l.bottom = Er(d.bottom, l.bottom), l.left = Gs(d.left, l.left), l;
  }, Ll(e, a, n));
  return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
function Du(e) {
  var t = e.reference, s = e.element, n = e.placement, i = n ? Je(n) : null, r = n ? Rn(n) : null, a = t.x + t.width / 2 - s.width / 2, o = t.y + t.height / 2 - s.height / 2, l;
  switch (i) {
    case ue:
      l = {
        x: a,
        y: t.y - s.height
      };
      break;
    case ge:
      l = {
        x: a,
        y: t.y + t.height
      };
      break;
    case me:
      l = {
        x: t.x + t.width,
        y: o
      };
      break;
    case he:
      l = {
        x: t.x - s.width,
        y: o
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var c = i ? Ua(i) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (r) {
      case Ys:
        l[c] = l[c] - (t[d] / 2 - s[d] / 2);
        break;
      case In:
        l[c] = l[c] + (t[d] / 2 - s[d] / 2);
        break;
    }
  }
  return l;
}
function Mn(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = n === void 0 ? e.placement : n, r = s.strategy, a = r === void 0 ? e.strategy : r, o = s.boundary, l = o === void 0 ? mu : o, c = s.rootBoundary, d = c === void 0 ? Ba : c, h = s.elementContext, g = h === void 0 ? yn : h, v = s.altBoundary, _ = v === void 0 ? !1 : v, F = s.padding, O = F === void 0 ? 0 : F, I = ku(typeof O != "number" ? O : Lu(O, Hn)), j = g === yn ? bu : yn, W = e.rects.popper, Y = e.elements[_ ? j : g], G = zd(Xs(Y) ? Y : Y.contextElement || Ms(e.elements.popper), l, d, a), X = Dn(e.elements.reference), ft = Du({
    reference: X,
    element: W,
    placement: i
  }), pt = ua(Object.assign({}, W, ft)), C = g === yn ? pt : X, P = {
    top: G.top - C.top + I.top,
    bottom: C.bottom - G.bottom + I.bottom,
    left: G.left - C.left + I.left,
    right: C.right - G.right + I.right
  }, y = e.modifiersData.offset;
  if (g === yn && y) {
    var x = y[i];
    Object.keys(P).forEach(function(w) {
      var N = [me, ge].indexOf(w) >= 0 ? 1 : -1, R = [ue, ge].indexOf(w) >= 0 ? "y" : "x";
      P[w] += x[R] * N;
    });
  }
  return P;
}
function Kd(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = s.boundary, r = s.rootBoundary, a = s.padding, o = s.flipVariations, l = s.allowedAutoPlacements, c = l === void 0 ? qa : l, d = Rn(n), h = d ? o ? la : la.filter(function(_) {
    return Rn(_) === d;
  }) : Hn, g = h.filter(function(_) {
    return c.indexOf(_) >= 0;
  });
  g.length === 0 && (g = h);
  var v = g.reduce(function(_, F) {
    return _[F] = Mn(e, {
      placement: F,
      boundary: i,
      rootBoundary: r,
      padding: a
    })[Je(F)], _;
  }, {});
  return Object.keys(v).sort(function(_, F) {
    return v[_] - v[F];
  });
}
function Gd(e) {
  if (Je(e) === Sr)
    return [];
  var t = fr(e);
  return [kl(e), t, kl(t)];
}
function Yd(e) {
  var t = e.state, s = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, a = s.altAxis, o = a === void 0 ? !0 : a, l = s.fallbackPlacements, c = s.padding, d = s.boundary, h = s.rootBoundary, g = s.altBoundary, v = s.flipVariations, _ = v === void 0 ? !0 : v, F = s.allowedAutoPlacements, O = t.options.placement, I = Je(O), j = I === O, W = l || (j || !_ ? [fr(O)] : Gd(O)), Y = [O].concat(W).reduce(function(it, H) {
      return it.concat(Je(H) === Sr ? Kd(t, {
        placement: H,
        boundary: d,
        rootBoundary: h,
        padding: c,
        flipVariations: _,
        allowedAutoPlacements: F
      }) : H);
    }, []), G = t.rects.reference, X = t.rects.popper, ft = /* @__PURE__ */ new Map(), pt = !0, C = Y[0], P = 0; P < Y.length; P++) {
      var y = Y[P], x = Je(y), w = Rn(y) === Ys, N = [ue, ge].indexOf(x) >= 0, R = N ? "width" : "height", A = Mn(t, {
        placement: y,
        boundary: d,
        rootBoundary: h,
        altBoundary: g,
        padding: c
      }), S = N ? w ? me : he : w ? ge : ue;
      G[R] > X[R] && (S = fr(S));
      var z = fr(S), K = [];
      if (r && K.push(A[x] <= 0), o && K.push(A[S] <= 0, A[z] <= 0), K.every(function(it) {
        return it;
      })) {
        C = y, pt = !1;
        break;
      }
      ft.set(y, K);
    }
    if (pt)
      for (var U = _ ? 3 : 1, nt = function(H) {
        var Z = Y.find(function(yt) {
          var st = ft.get(yt);
          if (st)
            return st.slice(0, H).every(function(gt) {
              return gt;
            });
        });
        if (Z)
          return C = Z, "break";
      }, tt = U; tt > 0; tt--) {
        var ot = nt(tt);
        if (ot === "break") break;
      }
    t.placement !== C && (t.modifiersData[n]._skip = !0, t.placement = C, t.reset = !0);
  }
}
const Ru = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Yd,
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
function $l(e) {
  return [ue, me, ge, he].some(function(t) {
    return e[t] >= 0;
  });
}
function Xd(e) {
  var t = e.state, s = e.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, a = Mn(t, {
    elementContext: "reference"
  }), o = Mn(t, {
    altBoundary: !0
  }), l = Il(a, n), c = Il(o, i, r), d = $l(l), h = $l(c);
  t.modifiersData[s] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: d,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": h
  });
}
const Mu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Xd
};
function Zd(e, t, s) {
  var n = Je(e), i = [he, ue].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, t, {
    placement: e
  })) : s, a = r[0], o = r[1];
  return a = a || 0, o = (o || 0) * i, [he, me].indexOf(n) >= 0 ? {
    x: o,
    y: a
  } : {
    x: a,
    y: o
  };
}
function Jd(e) {
  var t = e.state, s = e.options, n = e.name, i = s.offset, r = i === void 0 ? [0, 0] : i, a = qa.reduce(function(d, h) {
    return d[h] = Zd(h, t.rects, r), d;
  }, {}), o = a[t.placement], l = o.x, c = o.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[n] = a;
}
const Bu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Jd
};
function Qd(e) {
  var t = e.state, s = e.name;
  t.modifiersData[s] = Du({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Ya = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Qd,
  data: {}
};
function tf(e) {
  return e === "x" ? "y" : "x";
}
function ef(e) {
  var t = e.state, s = e.options, n = e.name, i = s.mainAxis, r = i === void 0 ? !0 : i, a = s.altAxis, o = a === void 0 ? !1 : a, l = s.boundary, c = s.rootBoundary, d = s.altBoundary, h = s.padding, g = s.tether, v = g === void 0 ? !0 : g, _ = s.tetherOffset, F = _ === void 0 ? 0 : _, O = Mn(t, {
    boundary: l,
    rootBoundary: c,
    padding: h,
    altBoundary: d
  }), I = Je(t.placement), j = Rn(t.placement), W = !j, Y = Ua(I), G = tf(Y), X = t.modifiersData.popperOffsets, ft = t.rects.reference, pt = t.rects.popper, C = typeof F == "function" ? F(Object.assign({}, t.rects, {
    placement: t.placement
  })) : F, P = typeof C == "number" ? {
    mainAxis: C,
    altAxis: C
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, C), y = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, x = {
    x: 0,
    y: 0
  };
  if (X) {
    if (r) {
      var w, N = Y === "y" ? ue : he, R = Y === "y" ? ge : me, A = Y === "y" ? "height" : "width", S = X[Y], z = S + O[N], K = S - O[R], U = v ? -pt[A] / 2 : 0, nt = j === Ys ? ft[A] : pt[A], tt = j === Ys ? -pt[A] : -ft[A], ot = t.elements.arrow, it = v && ot ? ja(ot) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Su(), Z = H[N], yt = H[R], st = fi(0, ft[A], it[A]), gt = W ? ft[A] / 2 - U - st - Z - P.mainAxis : nt - st - Z - P.mainAxis, mt = W ? -ft[A] / 2 + U + st + yt + P.mainAxis : tt + st + yt + P.mainAxis, M = t.elements.arrow && Ci(t.elements.arrow), B = M ? Y === "y" ? M.clientTop || 0 : M.clientLeft || 0 : 0, q = (w = y == null ? void 0 : y[Y]) != null ? w : 0, J = S + gt - q - B, Rt = S + mt - q, ve = fi(v ? Er(z, J) : z, S, v ? Gs(K, Rt) : K);
      X[Y] = ve, x[Y] = ve - S;
    }
    if (o) {
      var Le, os = Y === "x" ? ue : he, as = Y === "x" ? ge : me, Zt = X[G], le = G === "y" ? "height" : "width", _e = Zt + O[os], Wt = Zt - O[as], Ct = [ue, he].indexOf(I) !== -1, lt = (Le = y == null ? void 0 : y[G]) != null ? Le : 0, ut = Ct ? _e : Zt - ft[le] - pt[le] - lt + P.altAxis, Et = Ct ? Zt + ft[le] + pt[le] - lt - P.altAxis : Wt, wt = v && Ct ? Ld(ut, Zt, Et) : fi(v ? ut : _e, Zt, v ? Et : Wt);
      X[G] = wt, x[G] = wt - Zt;
    }
    t.modifiersData[n] = x;
  }
}
const qu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ef,
  requiresIfExists: ["offset"]
};
function sf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function nf(e) {
  return e === be(e) || !Ce(e) ? za(e) : sf(e);
}
function rf(e) {
  var t = e.getBoundingClientRect(), s = $n(t.width) / e.offsetWidth || 1, n = $n(t.height) / e.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function of(e, t, s) {
  s === void 0 && (s = !1);
  var n = Ce(t), i = Ce(t) && rf(t), r = Ms(t), a = Dn(e, i, s), o = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && ((ss(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ga(r)) && (o = nf(t)), Ce(t) ? (l = Dn(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : r && (l.x = Ka(r))), {
    x: a.left + o.scrollLeft - l.x,
    y: a.top + o.scrollTop - l.y,
    width: a.width,
    height: a.height
  };
}
function af(e) {
  var t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    s.add(r.name);
    var a = [].concat(r.requires || [], r.requiresIfExists || []);
    a.forEach(function(o) {
      if (!s.has(o)) {
        var l = t.get(o);
        l && i(l);
      }
    }), n.push(r);
  }
  return e.forEach(function(r) {
    s.has(r.name) || i(r);
  }), n;
}
function lf(e) {
  var t = af(e);
  return Cu.reduce(function(s, n) {
    return s.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function cf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(s) {
      Promise.resolve().then(function() {
        t = void 0, s(e());
      });
    })), t;
  };
}
function uf(e) {
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
var Dl = {
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
function Lr(e) {
  e === void 0 && (e = {});
  var t = e, s = t.defaultModifiers, n = s === void 0 ? [] : s, i = t.defaultOptions, r = i === void 0 ? Dl : i;
  return function(o, l, c) {
    c === void 0 && (c = r);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Dl, r),
      modifiersData: {},
      elements: {
        reference: o,
        popper: l
      },
      attributes: {},
      styles: {}
    }, h = [], g = !1, v = {
      state: d,
      setOptions: function(I) {
        var j = typeof I == "function" ? I(d.options) : I;
        F(), d.options = Object.assign({}, r, d.options, j), d.scrollParents = {
          reference: Xs(o) ? pi(o) : o.contextElement ? pi(o.contextElement) : [],
          popper: pi(l)
        };
        var W = lf(uf([].concat(n, d.options.modifiers)));
        return d.orderedModifiers = W.filter(function(Y) {
          return Y.enabled;
        }), _(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var I = d.elements, j = I.reference, W = I.popper;
          if (Rl(j, W)) {
            d.rects = {
              reference: of(j, Ci(W), d.options.strategy === "fixed"),
              popper: ja(W)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(P) {
              return d.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var Y = 0; Y < d.orderedModifiers.length; Y++) {
              if (d.reset === !0) {
                d.reset = !1, Y = -1;
                continue;
              }
              var G = d.orderedModifiers[Y], X = G.fn, ft = G.options, pt = ft === void 0 ? {} : ft, C = G.name;
              typeof X == "function" && (d = X({
                state: d,
                options: pt,
                name: C,
                instance: v
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: cf(function() {
        return new Promise(function(O) {
          v.forceUpdate(), O(d);
        });
      }),
      destroy: function() {
        F(), g = !0;
      }
    };
    if (!Rl(o, l))
      return v;
    v.setOptions(c).then(function(O) {
      !g && c.onFirstUpdate && c.onFirstUpdate(O);
    });
    function _() {
      d.orderedModifiers.forEach(function(O) {
        var I = O.name, j = O.options, W = j === void 0 ? {} : j, Y = O.effect;
        if (typeof Y == "function") {
          var G = Y({
            state: d,
            name: I,
            instance: v,
            options: W
          }), X = function() {
          };
          h.push(G || X);
        }
      });
    }
    function F() {
      h.forEach(function(O) {
        return O();
      }), h = [];
    }
    return v;
  };
}
var hf = /* @__PURE__ */ Lr(), df = [Wa, Ya, Ha, Va], ff = /* @__PURE__ */ Lr({
  defaultModifiers: df
}), pf = [Wa, Ya, Ha, Va, Bu, Ru, qu, Iu, Mu], Xa = /* @__PURE__ */ Lr({
  defaultModifiers: pf
});
const Pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Au,
  afterRead: _u,
  afterWrite: xu,
  applyStyles: Va,
  arrow: Iu,
  auto: Sr,
  basePlacements: Hn,
  beforeMain: Eu,
  beforeRead: yu,
  beforeWrite: Tu,
  bottom: ge,
  clippingParents: mu,
  computeStyles: Ha,
  createPopper: Xa,
  createPopperBase: hf,
  createPopperLite: ff,
  detectOverflow: Mn,
  end: In,
  eventListeners: Wa,
  flip: Ru,
  hide: Mu,
  left: he,
  main: wu,
  modifierPhases: Cu,
  offset: Bu,
  placements: qa,
  popper: yn,
  popperGenerator: Lr,
  popperOffsets: Ya,
  preventOverflow: qu,
  read: vu,
  reference: bu,
  right: me,
  start: Ys,
  top: ue,
  variationPlacements: la,
  viewport: Ba,
  write: Fu
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.6 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Os = /* @__PURE__ */ new Map(), Lo = {
  set(e, t, s) {
    Os.has(e) || Os.set(e, /* @__PURE__ */ new Map());
    const n = Os.get(e);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, s);
  },
  get(e, t) {
    return Os.has(e) && Os.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!Os.has(e))
      return;
    const s = Os.get(e);
    s.delete(t), s.size === 0 && Os.delete(e);
  }
}, gf = 1e6, mf = 1e3, ha = "transitionend", Vu = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, s) => `#${CSS.escape(s)}`)), e), bf = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), yf = (e) => {
  do
    e += Math.floor(Math.random() * gf);
  while (document.getElementById(e));
  return e;
}, vf = (e) => {
  if (!e)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: s
  } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), i = Number.parseFloat(s);
  return !n && !i ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * mf);
}, ju = (e) => {
  e.dispatchEvent(new Event(ha));
}, bs = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Is = (e) => bs(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(Vu(e)) : null, Wn = (e) => {
  if (!bs(e) || e.getClientRects().length === 0)
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
}, $s = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Uu = (e) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof e.getRootNode == "function") {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return e instanceof ShadowRoot ? e : e.parentNode ? Uu(e.parentNode) : null;
}, wr = () => {
}, Oi = (e) => {
  e.offsetHeight;
}, Hu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Io = [], _f = (e) => {
  document.readyState === "loading" ? (Io.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Io)
      t();
  }), Io.push(e)) : e();
}, Oe = () => document.documentElement.dir === "rtl", Se = (e) => {
  _f(() => {
    const t = Hu();
    if (t) {
      const s = e.NAME, n = t.fn[s];
      t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = n, e.jQueryInterface);
    }
  });
}, pe = (e, t = [], s = e) => typeof e == "function" ? e.call(...t) : s, Wu = (e, t, s = !0) => {
  if (!s) {
    pe(e);
    return;
  }
  const i = vf(t) + 5;
  let r = !1;
  const a = ({
    target: o
  }) => {
    o === t && (r = !0, t.removeEventListener(ha, a), pe(e));
  };
  t.addEventListener(ha, a), setTimeout(() => {
    r || ju(t);
  }, i);
}, Za = (e, t, s, n) => {
  const i = e.length;
  let r = e.indexOf(t);
  return r === -1 ? !s && n ? e[i - 1] : e[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), e[Math.max(0, Math.min(r, i - 1))]);
}, Ef = /[^.]*(?=\..*)\.|.*/, wf = /\..*/, Af = /::\d+$/, $o = {};
let Ml = 1;
const zu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Tf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Ku(e, t) {
  return t && `${t}::${Ml++}` || e.uidEvent || Ml++;
}
function Gu(e) {
  const t = Ku(e);
  return e.uidEvent = t, $o[t] = $o[t] || {}, $o[t];
}
function Ff(e, t) {
  return function s(n) {
    return Ja(n, {
      delegateTarget: e
    }), s.oneOff && V.off(e, n.type, t), t.apply(e, [n]);
  };
}
function xf(e, t, s) {
  return function n(i) {
    const r = e.querySelectorAll(t);
    for (let {
      target: a
    } = i; a && a !== this; a = a.parentNode)
      for (const o of r)
        if (o === a)
          return Ja(i, {
            delegateTarget: a
          }), n.oneOff && V.off(e, i.type, t, s), s.apply(a, [i]);
  };
}
function Yu(e, t, s = null) {
  return Object.values(e).find((n) => n.callable === t && n.delegationSelector === s);
}
function Xu(e, t, s) {
  const n = typeof t == "string", i = n ? s : t || s;
  let r = Zu(e);
  return Tf.has(r) || (r = e), [n, i, r];
}
function Bl(e, t, s, n, i) {
  if (typeof t != "string" || !e)
    return;
  let [r, a, o] = Xu(t, s, n);
  t in zu && (a = ((_) => function(F) {
    if (!F.relatedTarget || F.relatedTarget !== F.delegateTarget && !F.delegateTarget.contains(F.relatedTarget))
      return _.call(this, F);
  })(a));
  const l = Gu(e), c = l[o] || (l[o] = {}), d = Yu(c, a, r ? s : null);
  if (d) {
    d.oneOff = d.oneOff && i;
    return;
  }
  const h = Ku(a, t.replace(Ef, "")), g = r ? xf(e, s, a) : Ff(e, a);
  g.delegationSelector = r ? s : null, g.callable = a, g.oneOff = i, g.uidEvent = h, c[h] = g, e.addEventListener(o, g, r);
}
function da(e, t, s, n, i) {
  const r = Yu(t[s], n, i);
  r && (e.removeEventListener(s, r, !!i), delete t[s][r.uidEvent]);
}
function Cf(e, t, s, n) {
  const i = t[s] || {};
  for (const [r, a] of Object.entries(i))
    r.includes(n) && da(e, t, s, a.callable, a.delegationSelector);
}
function Zu(e) {
  return e = e.replace(wf, ""), zu[e] || e;
}
const V = {
  on(e, t, s, n) {
    Bl(e, t, s, n, !1);
  },
  one(e, t, s, n) {
    Bl(e, t, s, n, !0);
  },
  off(e, t, s, n) {
    if (typeof t != "string" || !e)
      return;
    const [i, r, a] = Xu(t, s, n), o = a !== t, l = Gu(e), c = l[a] || {}, d = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(c).length)
        return;
      da(e, l, a, r, i ? s : null);
      return;
    }
    if (d)
      for (const h of Object.keys(l))
        Cf(e, l, h, t.slice(1));
    for (const [h, g] of Object.entries(c)) {
      const v = h.replace(Af, "");
      (!o || t.includes(v)) && da(e, l, a, g.callable, g.delegationSelector);
    }
  },
  trigger(e, t, s) {
    if (typeof t != "string" || !e)
      return null;
    const n = Hu(), i = Zu(t), r = t !== i;
    let a = null, o = !0, l = !0, c = !1;
    r && n && (a = n.Event(t, s), n(e).trigger(a), o = !a.isPropagationStopped(), l = !a.isImmediatePropagationStopped(), c = a.isDefaultPrevented());
    const d = Ja(new Event(t, {
      bubbles: o,
      cancelable: !0
    }), s);
    return c && d.preventDefault(), l && e.dispatchEvent(d), d.defaultPrevented && a && a.preventDefault(), d;
  }
};
function Ja(e, t = {}) {
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
function Do(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const ys = {
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
      i = i.charAt(0).toLowerCase() + i.slice(1), t[i] = ql(e.dataset[n]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return ql(e.getAttribute(`data-bs-${Do(t)}`));
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
    const n = bs(s) ? ys.getDataAttribute(s, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...bs(s) ? ys.getDataAttributes(s) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, s = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(s)) {
      const r = t[n], a = bs(r) ? "element" : bf(r);
      if (!new RegExp(i).test(a))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${i}".`);
    }
  }
}
const Of = "5.3.6";
class Ue extends Ni {
  constructor(t, s) {
    super(), t = Is(t), t && (this._element = t, this._config = this._getConfig(s), Lo.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Lo.remove(this._element, this.constructor.DATA_KEY), V.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  // Private
  _queueCallback(t, s, n = !0) {
    Wu(t, s, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Lo.get(Is(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, s = {}) {
    return this.getInstance(t) || new this(t, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return Of;
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
const Ro = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let s = e.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), t = s && s !== "#" ? s.trim() : null;
  }
  return t ? t.split(",").map((s) => Vu(s)).join(",") : null;
}, ht = {
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
    return this.find(t, e).filter((s) => !$s(s) && Wn(s));
  },
  getSelectorFromElement(e) {
    const t = Ro(e);
    return t && ht.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Ro(e);
    return t ? ht.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Ro(e);
    return t ? ht.find(t) : [];
  }
}, Ir = (e, t = "hide") => {
  const s = `click.dismiss${e.EVENT_KEY}`, n = e.NAME;
  V.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), $s(this))
      return;
    const r = ht.getElementFromSelector(this) || this.closest(`.${n}`);
    e.getOrCreateInstance(r)[t]();
  });
}, Nf = "alert", Sf = "bs.alert", Ju = `.${Sf}`, kf = `close${Ju}`, Lf = `closed${Ju}`, If = "fade", $f = "show";
class $r extends Ue {
  // Getters
  static get NAME() {
    return Nf;
  }
  // Public
  close() {
    if (V.trigger(this._element, kf).defaultPrevented)
      return;
    this._element.classList.remove($f);
    const s = this._element.classList.contains(If);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), V.trigger(this._element, Lf), this.dispose();
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
Ir($r, "close");
Se($r);
const Df = "button", Rf = "bs.button", Mf = `.${Rf}`, Bf = ".data-api", qf = "active", Pl = '[data-bs-toggle="button"]', Pf = `click${Mf}${Bf}`;
class Dr extends Ue {
  // Getters
  static get NAME() {
    return Df;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(qf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Dr.getOrCreateInstance(this);
      t === "toggle" && s[t]();
    });
  }
}
V.on(document, Pf, Pl, (e) => {
  e.preventDefault();
  const t = e.target.closest(Pl);
  Dr.getOrCreateInstance(t).toggle();
});
Se(Dr);
const Vf = "swipe", zn = ".bs.swipe", jf = `touchstart${zn}`, Uf = `touchmove${zn}`, Hf = `touchend${zn}`, Wf = `pointerdown${zn}`, zf = `pointerup${zn}`, Kf = "touch", Gf = "pen", Yf = "pointer-event", Xf = 40, Zf = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, Jf = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class Ar extends Ni {
  constructor(t, s) {
    super(), this._element = t, !(!t || !Ar.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return Zf;
  }
  static get DefaultType() {
    return Jf;
  }
  static get NAME() {
    return Vf;
  }
  // Public
  dispose() {
    V.off(this._element, zn);
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
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), pe(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= Xf)
      return;
    const s = t / this._deltaX;
    this._deltaX = 0, s && pe(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (V.on(this._element, Wf, (t) => this._start(t)), V.on(this._element, zf, (t) => this._end(t)), this._element.classList.add(Yf)) : (V.on(this._element, jf, (t) => this._start(t)), V.on(this._element, Uf, (t) => this._move(t)), V.on(this._element, Hf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === Gf || t.pointerType === Kf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const Qf = "carousel", tp = "bs.carousel", Bs = `.${tp}`, Qu = ".data-api", ep = "ArrowLeft", sp = "ArrowRight", np = 500, ii = "next", mn = "prev", vn = "left", pr = "right", ip = `slide${Bs}`, Mo = `slid${Bs}`, rp = `keydown${Bs}`, op = `mouseenter${Bs}`, ap = `mouseleave${Bs}`, lp = `dragstart${Bs}`, cp = `load${Bs}${Qu}`, up = `click${Bs}${Qu}`, th = "carousel", Zi = "active", hp = "slide", dp = "carousel-item-end", fp = "carousel-item-start", pp = "carousel-item-next", gp = "carousel-item-prev", eh = ".active", sh = ".carousel-item", mp = eh + sh, bp = ".carousel-item img", yp = ".carousel-indicators", vp = "[data-bs-slide], [data-bs-slide-to]", _p = '[data-bs-ride="carousel"]', Ep = {
  [ep]: pr,
  [sp]: vn
}, wp = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, Ap = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Si extends Ue {
  constructor(t, s) {
    super(t, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = ht.findOne(yp, this._element), this._addEventListeners(), this._config.ride === th && this.cycle();
  }
  // Getters
  static get Default() {
    return wp;
  }
  static get DefaultType() {
    return Ap;
  }
  static get NAME() {
    return Qf;
  }
  // Public
  next() {
    this._slide(ii);
  }
  nextWhenVisible() {
    !document.hidden && Wn(this._element) && this.next();
  }
  prev() {
    this._slide(mn);
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
        V.one(this._element, Mo, () => this.cycle());
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
      V.one(this._element, Mo, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? ii : mn;
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
    this._config.keyboard && V.on(this._element, rp, (t) => this._keydown(t)), this._config.pause === "hover" && (V.on(this._element, op, () => this.pause()), V.on(this._element, ap, () => this._maybeEnableCycle())), this._config.touch && Ar.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of ht.find(bp, this._element))
      V.on(n, lp, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(vn)),
      rightCallback: () => this._slide(this._directionToOrder(pr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), np + this._config.interval));
      }
    };
    this._swipeHelper = new Ar(this._element, s);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const s = Ep[t.key];
    s && (t.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const s = ht.findOne(eh, this._indicatorsElement);
    s.classList.remove(Zi), s.removeAttribute("aria-current");
    const n = ht.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Zi), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === ii, r = s || Za(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const a = this._getItemIndex(r), o = (v) => V.trigger(this._element, v, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: a
    });
    if (o(ip).defaultPrevented || !n || !r)
      return;
    const c = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = r;
    const d = i ? fp : dp, h = i ? pp : gp;
    r.classList.add(h), Oi(r), n.classList.add(d), r.classList.add(d);
    const g = () => {
      r.classList.remove(d, h), r.classList.add(Zi), n.classList.remove(Zi, h, d), this._isSliding = !1, o(Mo);
    };
    this._queueCallback(g, n, this._isAnimated()), c && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(hp);
  }
  _getActive() {
    return ht.findOne(mp, this._element);
  }
  _getItems() {
    return ht.find(sh, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Oe() ? t === vn ? mn : ii : t === vn ? ii : mn;
  }
  _orderToDirection(t) {
    return Oe() ? t === mn ? vn : pr : t === mn ? pr : vn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Si.getOrCreateInstance(this, t);
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
V.on(document, up, vp, function(e) {
  const t = ht.getElementFromSelector(this);
  if (!t || !t.classList.contains(th))
    return;
  e.preventDefault();
  const s = Si.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n), s._maybeEnableCycle();
    return;
  }
  if (ys.getDataAttribute(this, "slide") === "next") {
    s.next(), s._maybeEnableCycle();
    return;
  }
  s.prev(), s._maybeEnableCycle();
});
V.on(window, cp, () => {
  const e = ht.find(_p);
  for (const t of e)
    Si.getOrCreateInstance(t);
});
Se(Si);
const Tp = "collapse", Fp = "bs.collapse", ki = `.${Fp}`, xp = ".data-api", Cp = `show${ki}`, Op = `shown${ki}`, Np = `hide${ki}`, Sp = `hidden${ki}`, kp = `click${ki}${xp}`, Bo = "show", Cn = "collapse", Ji = "collapsing", Lp = "collapsed", Ip = `:scope .${Cn} .${Cn}`, $p = "collapse-horizontal", Dp = "width", Rp = "height", Mp = ".collapse.show, .collapse.collapsing", fa = '[data-bs-toggle="collapse"]', Bp = {
  parent: null,
  toggle: !0
}, qp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class vi extends Ue {
  constructor(t, s) {
    super(t, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = ht.find(fa);
    for (const i of n) {
      const r = ht.getSelectorFromElement(i), a = ht.find(r).filter((o) => o === this._element);
      r !== null && a.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Bp;
  }
  static get DefaultType() {
    return qp;
  }
  static get NAME() {
    return Tp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(Mp).filter((o) => o !== this._element).map((o) => vi.getOrCreateInstance(o, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || V.trigger(this._element, Cp).defaultPrevented)
      return;
    for (const o of t)
      o.hide();
    const n = this._getDimension();
    this._element.classList.remove(Cn), this._element.classList.add(Ji), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ji), this._element.classList.add(Cn, Bo), this._element.style[n] = "", V.trigger(this._element, Op);
    }, a = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[a]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || V.trigger(this._element, Np).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, Oi(this._element), this._element.classList.add(Ji), this._element.classList.remove(Cn, Bo);
    for (const i of this._triggerArray) {
      const r = ht.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ji), this._element.classList.add(Cn), V.trigger(this._element, Sp);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  // Private
  _isShown(t = this._element) {
    return t.classList.contains(Bo);
  }
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = Is(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains($p) ? Dp : Rp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(fa);
    for (const s of t) {
      const n = ht.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const s = ht.find(Ip, this._config.parent);
    return ht.find(t, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(t, s) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(Lp, !s), n.setAttribute("aria-expanded", s);
  }
  // Static
  static jQueryInterface(t) {
    const s = {};
    return typeof t == "string" && /show|hide/.test(t) && (s.toggle = !1), this.each(function() {
      const n = vi.getOrCreateInstance(this, s);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
V.on(document, kp, fa, function(e) {
  (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
  for (const t of ht.getMultipleElementsFromSelector(this))
    vi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Se(vi);
const Vl = "dropdown", Pp = "bs.dropdown", en = `.${Pp}`, Qa = ".data-api", Vp = "Escape", jl = "Tab", jp = "ArrowUp", Ul = "ArrowDown", Up = 2, Hp = `hide${en}`, Wp = `hidden${en}`, zp = `show${en}`, Kp = `shown${en}`, nh = `click${en}${Qa}`, ih = `keydown${en}${Qa}`, Gp = `keyup${en}${Qa}`, _n = "show", Yp = "dropup", Xp = "dropend", Zp = "dropstart", Jp = "dropup-center", Qp = "dropdown-center", zs = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', tg = `${zs}.${_n}`, gr = ".dropdown-menu", eg = ".navbar", sg = ".navbar-nav", ng = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", ig = Oe() ? "top-end" : "top-start", rg = Oe() ? "top-start" : "top-end", og = Oe() ? "bottom-end" : "bottom-start", ag = Oe() ? "bottom-start" : "bottom-end", lg = Oe() ? "left-start" : "right-start", cg = Oe() ? "right-start" : "left-start", ug = "top", hg = "bottom", dg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, fg = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Qe extends Ue {
  constructor(t, s) {
    super(t, s), this._popper = null, this._parent = this._element.parentNode, this._menu = ht.next(this._element, gr)[0] || ht.prev(this._element, gr)[0] || ht.findOne(gr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return dg;
  }
  static get DefaultType() {
    return fg;
  }
  static get NAME() {
    return Vl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if ($s(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!V.trigger(this._element, zp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(sg))
        for (const n of [].concat(...document.body.children))
          V.on(n, "mouseover", wr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(_n), this._element.classList.add(_n), V.trigger(this._element, Kp, t);
    }
  }
  hide() {
    if ($s(this._element) || !this._isShown())
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
    if (!V.trigger(this._element, Hp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          V.off(n, "mouseover", wr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(_n), this._element.classList.remove(_n), this._element.setAttribute("aria-expanded", "false"), ys.removeDataAttribute(this._menu, "popper"), V.trigger(this._element, Wp, t), this._element.focus();
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !bs(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Vl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Pu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : bs(this._config.reference) ? t = Is(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = Xa(t, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(_n);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Xp))
      return lg;
    if (t.classList.contains(Zp))
      return cg;
    if (t.classList.contains(Jp))
      return ug;
    if (t.classList.contains(Qp))
      return hg;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Yp) ? s ? rg : ig : s ? ag : og;
  }
  _detectNavbar() {
    return this._element.closest(eg) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (ys.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...pe(this._config.popperConfig, [void 0, t])
    };
  }
  _selectMenuItem({
    key: t,
    target: s
  }) {
    const n = ht.find(ng, this._menu).filter((i) => Wn(i));
    n.length && Za(n, s, t === Ul, !n.includes(s)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Qe.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Up || t.type === "keyup" && t.key !== jl)
      return;
    const s = ht.find(tg);
    for (const n of s) {
      const i = Qe.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), a = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !a || i._config.autoClose === "outside" && a || i._menu.contains(t.target) && (t.type === "keyup" && t.key === jl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const o = {
        relatedTarget: i._element
      };
      t.type === "click" && (o.clickEvent = t), i._completeHide(o);
    }
  }
  static dataApiKeydownHandler(t) {
    const s = /input|textarea/i.test(t.target.tagName), n = t.key === Vp, i = [jp, Ul].includes(t.key);
    if (!i && !n || s && !n)
      return;
    t.preventDefault();
    const r = this.matches(zs) ? this : ht.prev(this, zs)[0] || ht.next(this, zs)[0] || ht.findOne(zs, t.delegateTarget.parentNode), a = Qe.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), a.show(), a._selectMenuItem(t);
      return;
    }
    a._isShown() && (t.stopPropagation(), a.hide(), r.focus());
  }
}
V.on(document, ih, zs, Qe.dataApiKeydownHandler);
V.on(document, ih, gr, Qe.dataApiKeydownHandler);
V.on(document, nh, Qe.clearMenus);
V.on(document, Gp, Qe.clearMenus);
V.on(document, nh, zs, function(e) {
  e.preventDefault(), Qe.getOrCreateInstance(this).toggle();
});
Se(Qe);
const rh = "backdrop", pg = "fade", Hl = "show", Wl = `mousedown.bs.${rh}`, gg = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, mg = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class oh extends Ni {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return gg;
  }
  static get DefaultType() {
    return mg;
  }
  static get NAME() {
    return rh;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      pe(t);
      return;
    }
    this._append();
    const s = this._getElement();
    this._config.isAnimated && Oi(s), s.classList.add(Hl), this._emulateAnimation(() => {
      pe(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      pe(t);
      return;
    }
    this._getElement().classList.remove(Hl), this._emulateAnimation(() => {
      this.dispose(), pe(t);
    });
  }
  dispose() {
    this._isAppended && (V.off(this._element, Wl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(pg), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = Is(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), V.on(t, Wl, () => {
      pe(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Wu(t, this._getElement(), this._config.isAnimated);
  }
}
const bg = "focustrap", yg = "bs.focustrap", Tr = `.${yg}`, vg = `focusin${Tr}`, _g = `keydown.tab${Tr}`, Eg = "Tab", wg = "forward", zl = "backward", Ag = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Tg = {
  autofocus: "boolean",
  trapElement: "element"
};
class ah extends Ni {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Ag;
  }
  static get DefaultType() {
    return Tg;
  }
  static get NAME() {
    return bg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), V.off(document, Tr), V.on(document, vg, (t) => this._handleFocusin(t)), V.on(document, _g, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, V.off(document, Tr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: s
    } = this._config;
    if (t.target === document || t.target === s || s.contains(t.target))
      return;
    const n = ht.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === zl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Eg && (this._lastTabNavDirection = t.shiftKey ? zl : wg);
  }
}
const Kl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Gl = ".sticky-top", Qi = "padding-right", Yl = "margin-right";
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Qi, (s) => s + t), this._setElementAttributes(Kl, Qi, (s) => s + t), this._setElementAttributes(Gl, Yl, (s) => s - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Qi), this._resetElementAttributes(Kl, Qi), this._resetElementAttributes(Gl, Yl);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t, s, n) {
    const i = this.getWidth(), r = (a) => {
      if (a !== this._element && window.innerWidth > a.clientWidth + i)
        return;
      this._saveInitialAttribute(a, s);
      const o = window.getComputedStyle(a).getPropertyValue(s);
      a.style.setProperty(s, `${n(Number.parseFloat(o))}px`);
    };
    this._applyManipulationCallback(t, r);
  }
  _saveInitialAttribute(t, s) {
    const n = t.style.getPropertyValue(s);
    n && ys.setDataAttribute(t, s, n);
  }
  _resetElementAttributes(t, s) {
    const n = (i) => {
      const r = ys.getDataAttribute(i, s);
      if (r === null) {
        i.style.removeProperty(s);
        return;
      }
      ys.removeDataAttribute(i, s), i.style.setProperty(s, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, s) {
    if (bs(t)) {
      s(t);
      return;
    }
    for (const n of ht.find(t, this._element))
      s(n);
  }
}
const Fg = "modal", xg = "bs.modal", Ne = `.${xg}`, Cg = ".data-api", Og = "Escape", Ng = `hide${Ne}`, Sg = `hidePrevented${Ne}`, lh = `hidden${Ne}`, ch = `show${Ne}`, kg = `shown${Ne}`, Lg = `resize${Ne}`, Ig = `click.dismiss${Ne}`, $g = `mousedown.dismiss${Ne}`, Dg = `keydown.dismiss${Ne}`, Rg = `click${Ne}${Cg}`, Xl = "modal-open", Mg = "fade", Zl = "show", qo = "modal-static", Bg = ".modal.show", qg = ".modal-dialog", Pg = ".modal-body", Vg = '[data-bs-toggle="modal"]', jg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Ug = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Zs extends Ue {
  constructor(t, s) {
    super(t, s), this._dialog = ht.findOne(qg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new pa(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return jg;
  }
  static get DefaultType() {
    return Ug;
  }
  static get NAME() {
    return Fg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || V.trigger(this._element, ch, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Xl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || V.trigger(this._element, Ng).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Zl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    V.off(window, Ne), V.off(this._dialog, Ne), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new oh({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new ah({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = ht.findOne(Pg, this._dialog);
    s && (s.scrollTop = 0), Oi(this._element), this._element.classList.add(Zl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, V.trigger(this._element, kg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    V.on(this._element, Dg, (t) => {
      if (t.key === Og) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), V.on(window, Lg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), V.on(this._element, $g, (t) => {
      V.one(this._element, Ig, (s) => {
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
      document.body.classList.remove(Xl), this._resetAdjustments(), this._scrollBar.reset(), V.trigger(this._element, lh);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Mg);
  }
  _triggerBackdropTransition() {
    if (V.trigger(this._element, Sg).defaultPrevented)
      return;
    const s = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(qo) || (s || (this._element.style.overflowY = "hidden"), this._element.classList.add(qo), this._queueCallback(() => {
      this._element.classList.remove(qo), this._queueCallback(() => {
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
      const i = Oe() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${s}px`;
    }
    if (!n && t) {
      const i = Oe() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${s}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, s) {
    return this.each(function() {
      const n = Zs.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](s);
      }
    });
  }
}
V.on(document, Rg, Vg, function(e) {
  const t = ht.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), V.one(t, ch, (i) => {
    i.defaultPrevented || V.one(t, lh, () => {
      Wn(this) && this.focus();
    });
  });
  const s = ht.findOne(Bg);
  s && Zs.getInstance(s).hide(), Zs.getOrCreateInstance(t).toggle(this);
});
Ir(Zs);
Se(Zs);
const Hg = "offcanvas", Wg = "bs.offcanvas", As = `.${Wg}`, uh = ".data-api", zg = `load${As}${uh}`, Kg = "Escape", Jl = "show", Ql = "showing", tc = "hiding", Gg = "offcanvas-backdrop", hh = ".offcanvas.show", Yg = `show${As}`, Xg = `shown${As}`, Zg = `hide${As}`, ec = `hidePrevented${As}`, dh = `hidden${As}`, Jg = `resize${As}`, Qg = `click${As}${uh}`, tm = `keydown.dismiss${As}`, em = '[data-bs-toggle="offcanvas"]', sm = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, nm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class Ds extends Ue {
  constructor(t, s) {
    super(t, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return sm;
  }
  static get DefaultType() {
    return nm;
  }
  static get NAME() {
    return Hg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || V.trigger(this._element, Yg, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new pa().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Ql);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Jl), this._element.classList.remove(Ql), V.trigger(this._element, Xg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || V.trigger(this._element, Zg).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(tc), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(Jl, tc), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new pa().reset(), V.trigger(this._element, dh);
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
        V.trigger(this._element, ec);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new oh({
      className: Gg,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? t : null
    });
  }
  _initializeFocusTrap() {
    return new ah({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    V.on(this._element, tm, (t) => {
      if (t.key === Kg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        V.trigger(this._element, ec);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ds.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
V.on(document, Qg, em, function(e) {
  const t = ht.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), $s(this))
    return;
  V.one(t, dh, () => {
    Wn(this) && this.focus();
  });
  const s = ht.findOne(hh);
  s && s !== t && Ds.getInstance(s).hide(), Ds.getOrCreateInstance(t).toggle(this);
});
V.on(window, zg, () => {
  for (const e of ht.find(hh))
    Ds.getOrCreateInstance(e).show();
});
V.on(window, Jg, () => {
  for (const e of ht.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" && Ds.getOrCreateInstance(e).hide();
});
Ir(Ds);
Se(Ds);
const im = /^aria-[\w-]*$/i, fh = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", im],
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
}, rm = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), om = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, am = (e, t) => {
  const s = e.nodeName.toLowerCase();
  return t.includes(s) ? rm.has(s) ? !!om.test(e.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function lm(e, t, s) {
  if (!e.length)
    return e;
  if (s && typeof s == "function")
    return s(e);
  const i = new window.DOMParser().parseFromString(e, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const a of r) {
    const o = a.nodeName.toLowerCase();
    if (!Object.keys(t).includes(o)) {
      a.remove();
      continue;
    }
    const l = [].concat(...a.attributes), c = [].concat(t["*"] || [], t[o] || []);
    for (const d of l)
      am(d, c) || a.removeAttribute(d.nodeName);
  }
  return i.body.innerHTML;
}
const cm = "TemplateFactory", um = {
  allowList: fh,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, hm = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, dm = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class fm extends Ni {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return um;
  }
  static get DefaultType() {
    return hm;
  }
  static get NAME() {
    return cm;
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
      }, dm);
  }
  _setContent(t, s, n) {
    const i = ht.findOne(n, t);
    if (i) {
      if (s = this._resolvePossibleFunction(s), !s) {
        i.remove();
        return;
      }
      if (bs(s)) {
        this._putElementInTemplate(Is(s), i);
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
    return this._config.sanitize ? lm(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return pe(t, [void 0, this]);
  }
  _putElementInTemplate(t, s) {
    if (this._config.html) {
      s.innerHTML = "", s.append(t);
      return;
    }
    s.textContent = t.textContent;
  }
}
const pm = "tooltip", gm = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Po = "fade", mm = "modal", tr = "show", bm = ".tooltip-inner", sc = `.${mm}`, nc = "hide.bs.modal", ri = "hover", Vo = "focus", ym = "click", vm = "manual", _m = "hide", Em = "hidden", wm = "show", Am = "shown", Tm = "inserted", Fm = "click", xm = "focusin", Cm = "focusout", Om = "mouseenter", Nm = "mouseleave", Sm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Oe() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Oe() ? "right" : "left"
}, km = {
  allowList: fh,
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
}, Lm = {
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
let Rr = class ph extends Ue {
  constructor(t, s) {
    if (typeof Pu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
    super(t, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return km;
  }
  static get DefaultType() {
    return Lm;
  }
  static get NAME() {
    return pm;
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
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout), V.off(this._element.closest(sc), nc, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = V.trigger(this._element, this.constructor.eventName(wm)), n = (Uu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), V.trigger(this._element, this.constructor.eventName(Tm))), this._popper = this._createPopper(i), i.classList.add(tr), "ontouchstart" in document.documentElement)
      for (const o of [].concat(...document.body.children))
        V.on(o, "mouseover", wr);
    const a = () => {
      V.trigger(this._element, this.constructor.eventName(Am)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(a, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || V.trigger(this._element, this.constructor.eventName(_m)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(tr), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        V.off(i, "mouseover", wr);
    this._activeTrigger[ym] = !1, this._activeTrigger[Vo] = !1, this._activeTrigger[ri] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), V.trigger(this._element, this.constructor.eventName(Em)));
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
    s.classList.remove(Po, tr), s.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = yf(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(Po), s;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new fm({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [bm]: this._getTitle()
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
    return this._config.animation || this.tip && this.tip.classList.contains(Po);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(tr);
  }
  _createPopper(t) {
    const s = pe(this._config.placement, [this, t, this._element]), n = Sm[s.toUpperCase()];
    return Xa(this._element, t, this._getPopperConfig(n));
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((s) => Number.parseInt(s, 10)) : typeof t == "function" ? (s) => t(s, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return pe(t, [this._element, this._element]);
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
      ...pe(this._config.popperConfig, [void 0, s])
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const s of t)
      if (s === "click")
        V.on(this._element, this.constructor.eventName(Fm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (s !== vm) {
        const n = s === ri ? this.constructor.eventName(Om) : this.constructor.eventName(xm), i = s === ri ? this.constructor.eventName(Nm) : this.constructor.eventName(Cm);
        V.on(this._element, n, this._config.selector, (r) => {
          const a = this._initializeOnDelegatedTarget(r);
          a._activeTrigger[r.type === "focusin" ? Vo : ri] = !0, a._enter();
        }), V.on(this._element, i, this._config.selector, (r) => {
          const a = this._initializeOnDelegatedTarget(r);
          a._activeTrigger[r.type === "focusout" ? Vo : ri] = a._element.contains(r.relatedTarget), a._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, V.on(this._element.closest(sc), nc, this._hideModalHandler);
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
    const s = ys.getDataAttributes(this._element);
    for (const n of Object.keys(s))
      gm.has(n) && delete s[n];
    return t = {
      ...s,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : Is(t.container), typeof t.delay == "number" && (t.delay = {
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
      const s = ph.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
};
Se(Rr);
const Im = "popover", $m = ".popover-header", Dm = ".popover-body", Rm = {
  ...Rr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Mm = {
  ...Rr.DefaultType,
  content: "(null|string|element|function)"
};
class tl extends Rr {
  // Getters
  static get Default() {
    return Rm;
  }
  static get DefaultType() {
    return Mm;
  }
  static get NAME() {
    return Im;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [$m]: this._getTitle(),
      [Dm]: this._getContent()
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
Se(tl);
const Bm = "scrollspy", qm = "bs.scrollspy", el = `.${qm}`, Pm = ".data-api", Vm = `activate${el}`, ic = `click${el}`, jm = `load${el}${Pm}`, Um = "dropdown-item", bn = "active", Hm = '[data-bs-spy="scroll"]', jo = "[href]", Wm = ".nav, .list-group", rc = ".nav-link", zm = ".nav-item", Km = ".list-group-item", Gm = `${rc}, ${zm} > ${rc}, ${Km}`, Ym = ".dropdown", Xm = ".dropdown-toggle", Zm = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, Jm = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Mr extends Ue {
  constructor(t, s) {
    super(t, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return Zm;
  }
  static get DefaultType() {
    return Jm;
  }
  static get NAME() {
    return Bm;
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
    return t.target = Is(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((s) => Number.parseFloat(s))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (V.off(this._config.target, ic), V.on(this._config.target, ic, jo, (t) => {
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
    const s = (a) => this._targetLinks.get(`#${a.target.id}`), n = (a) => {
      this._previousScrollData.visibleEntryTop = a.target.offsetTop, this._process(s(a));
    }, i = (this._rootElement || document.documentElement).scrollTop, r = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const a of t) {
      if (!a.isIntersecting) {
        this._activeTarget = null, this._clearActiveClass(s(a));
        continue;
      }
      const o = a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && o) {
        if (n(a), !i)
          return;
        continue;
      }
      !r && !o && n(a);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const t = ht.find(jo, this._config.target);
    for (const s of t) {
      if (!s.hash || $s(s))
        continue;
      const n = ht.findOne(decodeURI(s.hash), this._element);
      Wn(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(bn), this._activateParents(t), V.trigger(this._element, Vm, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Um)) {
      ht.findOne(Xm, t.closest(Ym)).classList.add(bn);
      return;
    }
    for (const s of ht.parents(t, Wm))
      for (const n of ht.prev(s, Gm))
        n.classList.add(bn);
  }
  _clearActiveClass(t) {
    t.classList.remove(bn);
    const s = ht.find(`${jo}.${bn}`, t);
    for (const n of s)
      n.classList.remove(bn);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Mr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
V.on(window, jm, () => {
  for (const e of ht.find(Hm))
    Mr.getOrCreateInstance(e);
});
Se(Mr);
const Qm = "tab", t1 = "bs.tab", sn = `.${t1}`, e1 = `hide${sn}`, s1 = `hidden${sn}`, n1 = `show${sn}`, i1 = `shown${sn}`, r1 = `click${sn}`, o1 = `keydown${sn}`, a1 = `load${sn}`, l1 = "ArrowLeft", oc = "ArrowRight", c1 = "ArrowUp", ac = "ArrowDown", Uo = "Home", lc = "End", Ks = "active", cc = "fade", Ho = "show", u1 = "dropdown", gh = ".dropdown-toggle", h1 = ".dropdown-menu", Wo = `:not(${gh})`, d1 = '.list-group, .nav, [role="tablist"]', f1 = ".nav-item, .list-group-item", p1 = `.nav-link${Wo}, .list-group-item${Wo}, [role="tab"]${Wo}`, mh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', zo = `${p1}, ${mh}`, g1 = `.${Ks}[data-bs-toggle="tab"], .${Ks}[data-bs-toggle="pill"], .${Ks}[data-bs-toggle="list"]`;
class Bn extends Ue {
  constructor(t) {
    super(t), this._parent = this._element.closest(d1), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), V.on(this._element, o1, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return Qm;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const s = this._getActiveElem(), n = s ? V.trigger(s, e1, {
      relatedTarget: t
    }) : null;
    V.trigger(t, n1, {
      relatedTarget: s
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(s, t), this._activate(t, s));
  }
  // Private
  _activate(t, s) {
    if (!t)
      return;
    t.classList.add(Ks), this._activate(ht.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Ho);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), V.trigger(t, i1, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(cc));
  }
  _deactivate(t, s) {
    if (!t)
      return;
    t.classList.remove(Ks), t.blur(), this._deactivate(ht.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Ho);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), V.trigger(t, s1, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(cc));
  }
  _keydown(t) {
    if (![l1, oc, c1, ac, Uo, lc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const s = this._getChildren().filter((i) => !$s(i));
    let n;
    if ([Uo, lc].includes(t.key))
      n = s[t.key === Uo ? 0 : s.length - 1];
    else {
      const i = [oc, ac].includes(t.key);
      n = Za(s, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), Bn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return ht.find(zo, this._parent);
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
    const s = ht.getElementFromSelector(t);
    s && (this._setAttributeIfNotExists(s, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(s, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, s) {
    const n = this._getOuterElement(t);
    if (!n.classList.contains(u1))
      return;
    const i = (r, a) => {
      const o = ht.findOne(r, n);
      o && o.classList.toggle(a, s);
    };
    i(gh, Ks), i(h1, Ho), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(t, s, n) {
    t.hasAttribute(s) || t.setAttribute(s, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Ks);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(zo) ? t : ht.findOne(zo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(f1) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Bn.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
V.on(document, r1, mh, function(e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !$s(this) && Bn.getOrCreateInstance(this).show();
});
V.on(window, a1, () => {
  for (const e of ht.find(g1))
    Bn.getOrCreateInstance(e);
});
Se(Bn);
const m1 = "toast", b1 = "bs.toast", qs = `.${b1}`, y1 = `mouseover${qs}`, v1 = `mouseout${qs}`, _1 = `focusin${qs}`, E1 = `focusout${qs}`, w1 = `hide${qs}`, A1 = `hidden${qs}`, T1 = `show${qs}`, F1 = `shown${qs}`, x1 = "fade", uc = "hide", er = "show", sr = "showing", C1 = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, O1 = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Br extends Ue {
  constructor(t, s) {
    super(t, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return O1;
  }
  static get DefaultType() {
    return C1;
  }
  static get NAME() {
    return m1;
  }
  // Public
  show() {
    if (V.trigger(this._element, T1).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(x1);
    const s = () => {
      this._element.classList.remove(sr), V.trigger(this._element, F1), this._maybeScheduleHide();
    };
    this._element.classList.remove(uc), Oi(this._element), this._element.classList.add(er, sr), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || V.trigger(this._element, w1).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(uc), this._element.classList.remove(sr, er), V.trigger(this._element, A1);
    };
    this._element.classList.add(sr), this._queueCallback(s, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(er), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(er);
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
    V.on(this._element, y1, (t) => this._onInteraction(t, !0)), V.on(this._element, v1, (t) => this._onInteraction(t, !1)), V.on(this._element, _1, (t) => this._onInteraction(t, !0)), V.on(this._element, E1, (t) => this._onInteraction(t, !1));
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
Ir(Br);
Se(Br);
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
function qr(e, t) {
  for (const s in t)
    t[s] instanceof Object && s in e && Object.assign(t[s], qr(e[s], t[s]));
  return Object.assign(e || {}, t);
}
function nn(e, t, s, n) {
  try {
    return typeof e == "function" ? e(t, s, n) : e;
  } catch (i) {
    return console.error(i), null;
  }
}
async function On(e) {
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
function Nn(e, t) {
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
function fs(e, t, s, n) {
  if (t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), n && n.header)
    for (let i of Object.keys(n.header))
      t.options.headers[i] = n.header[i];
  return t.options.body = void 0, t.options.method = e, s && Object.assign(t.options, s), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function ps(e, t, s, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (s ? "/" + s : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function oi(e, t = "-") {
  return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function N1(e) {
  let t = [];
  for (let s of e)
    t.push(Fr(s));
  return t;
}
function Fr(e, t = "", s = {}) {
  for (let n in e) {
    let i = t ? t + "." + n : n;
    typeof e[n] == "object" && !Array.isArray(e[n]) ? Fr(e[n], i, s) : s[i] = e[n];
  }
  return s;
}
function S1(e) {
  let t = {};
  for (let s in e) {
    let n = s.split(".");
    n.reduce((i, r, a) => i[r] || (i[r] = isNaN(Number(n[a + 1])) ? n.length - 1 === a ? e[s] : {} : []), t);
  }
  return t;
}
function Kn(e, t, s, n) {
  const i = (r, a) => !r || !a ? r : r.replace(/{\s*(.*?)\s*}/g, (o, l) => a[l] ? a[l] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][e] ? i(e, s) : i(t[n][e]);
}
function k1(e, t, s = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(s), i = e.map(
    (r) => t.map((a) => {
      let o = r[a.name];
      return a.template ? a.template(o, r, e) : o !== void 0 ? o : "";
    }).join(s)
  );
  return [n, ...i].join(`
`);
}
function L1(e, t = "export.csv") {
  e = "\uFEFF" + e;
  const s = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(s), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function I1(e) {
  return [...new Set(e)];
}
function nl(e, t) {
  e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function il(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 && e.push(s.value);
}
function rl(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 ? e.push(s.value) : e.splice(e.indexOf(s.value), 1);
}
function ol(e) {
  e.length = 0;
}
function al(e, t) {
  t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function ll(e, t) {
  t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function $1(e, t) {
  Object.keys(e).forEach((s) => {
    typeof e[s] == "function" && (e[s] = e[s](t));
  });
}
function D1(e, t) {
  return e < 1024 ? e + (t ? " Byte" : "") : e < 1048576 ? (e / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : e < 1073741824 ? (e / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (e / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
}
function R1(e) {
  return e.split(".").reverse()[0];
}
var bh = typeof global == "object" && global && global.Object === Object && global, M1 = typeof self == "object" && self && self.Object === Object && self, rs = bh || M1 || Function("return this")(), Rs = rs.Symbol, yh = Object.prototype, B1 = yh.hasOwnProperty, q1 = yh.toString, ai = Rs ? Rs.toStringTag : void 0;
function P1(e) {
  var t = B1.call(e, ai), s = e[ai];
  try {
    e[ai] = void 0;
    var n = !0;
  } catch {
  }
  var i = q1.call(e);
  return n && (t ? e[ai] = s : delete e[ai]), i;
}
var V1 = Object.prototype, j1 = V1.toString;
function U1(e) {
  return j1.call(e);
}
var H1 = "[object Null]", W1 = "[object Undefined]", hc = Rs ? Rs.toStringTag : void 0;
function Gn(e) {
  return e == null ? e === void 0 ? W1 : H1 : hc && hc in Object(e) ? P1(e) : U1(e);
}
function _s(e) {
  return e != null && typeof e == "object";
}
var Js = Array.isArray;
function Ps(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function vh(e) {
  return e;
}
var z1 = "[object AsyncFunction]", K1 = "[object Function]", G1 = "[object GeneratorFunction]", Y1 = "[object Proxy]";
function cl(e) {
  if (!Ps(e))
    return !1;
  var t = Gn(e);
  return t == K1 || t == G1 || t == z1 || t == Y1;
}
var Ko = rs["__core-js_shared__"], dc = function() {
  var e = /[^.]+$/.exec(Ko && Ko.keys && Ko.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function X1(e) {
  return !!dc && dc in e;
}
var Z1 = Function.prototype, J1 = Z1.toString;
function rn(e) {
  if (e != null) {
    try {
      return J1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Q1 = /[\\^$.*+?()[\]{}|]/g, t0 = /^\[object .+?Constructor\]$/, e0 = Function.prototype, s0 = Object.prototype, n0 = e0.toString, i0 = s0.hasOwnProperty, r0 = RegExp(
  "^" + n0.call(i0).replace(Q1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function o0(e) {
  if (!Ps(e) || X1(e))
    return !1;
  var t = cl(e) ? r0 : t0;
  return t.test(rn(e));
}
function a0(e, t) {
  return e == null ? void 0 : e[t];
}
function on(e, t) {
  var s = a0(e, t);
  return o0(s) ? s : void 0;
}
var ga = on(rs, "WeakMap"), fc = Object.create, l0 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!Ps(t))
      return {};
    if (fc)
      return fc(t);
    e.prototype = t;
    var s = new e();
    return e.prototype = void 0, s;
  };
}();
function c0(e, t, s) {
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
function u0(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var h0 = 800, d0 = 16, f0 = Date.now;
function p0(e) {
  var t = 0, s = 0;
  return function() {
    var n = f0(), i = d0 - (n - s);
    if (s = n, i > 0) {
      if (++t >= h0)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function g0(e) {
  return function() {
    return e;
  };
}
var xr = function() {
  try {
    var e = on(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), m0 = xr ? function(e, t) {
  return xr(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: g0(t),
    writable: !0
  });
} : vh, b0 = p0(m0);
function y0(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var v0 = 9007199254740991, _0 = /^(?:0|[1-9]\d*)$/;
function _h(e, t) {
  var s = typeof e;
  return t = t ?? v0, !!t && (s == "number" || s != "symbol" && _0.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ul(e, t, s) {
  t == "__proto__" && xr ? xr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
function Li(e, t) {
  return e === t || e !== e && t !== t;
}
var E0 = Object.prototype, w0 = E0.hasOwnProperty;
function Eh(e, t, s) {
  var n = e[t];
  (!(w0.call(e, t) && Li(n, s)) || s === void 0 && !(t in e)) && ul(e, t, s);
}
function A0(e, t, s, n) {
  var i = !s;
  s || (s = {});
  for (var r = -1, a = t.length; ++r < a; ) {
    var o = t[r], l = void 0;
    l === void 0 && (l = e[o]), i ? ul(s, o, l) : Eh(s, o, l);
  }
  return s;
}
var pc = Math.max;
function T0(e, t, s) {
  return t = pc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = pc(n.length - t, 0), a = Array(r); ++i < r; )
      a[i] = n[t + i];
    i = -1;
    for (var o = Array(t + 1); ++i < t; )
      o[i] = n[i];
    return o[t] = s(a), c0(e, this, o);
  };
}
function F0(e, t) {
  return b0(T0(e, t, vh), e + "");
}
var x0 = 9007199254740991;
function wh(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= x0;
}
function Pr(e) {
  return e != null && wh(e.length) && !cl(e);
}
function C0(e, t, s) {
  if (!Ps(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? Pr(s) && _h(t, s.length) : n == "string" && t in s) ? Li(s[t], e) : !1;
}
function O0(e) {
  return F0(function(t, s) {
    var n = -1, i = s.length, r = i > 1 ? s[i - 1] : void 0, a = i > 2 ? s[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, a && C0(s[0], s[1], a) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var o = s[n];
      o && e(t, o, n, r);
    }
    return t;
  });
}
var N0 = Object.prototype;
function hl(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || N0;
  return e === s;
}
function S0(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var k0 = "[object Arguments]";
function gc(e) {
  return _s(e) && Gn(e) == k0;
}
var Ah = Object.prototype, L0 = Ah.hasOwnProperty, I0 = Ah.propertyIsEnumerable, ma = gc(/* @__PURE__ */ function() {
  return arguments;
}()) ? gc : function(e) {
  return _s(e) && L0.call(e, "callee") && !I0.call(e, "callee");
};
function $0() {
  return !1;
}
var Th = typeof exports == "object" && exports && !exports.nodeType && exports, mc = Th && typeof module == "object" && module && !module.nodeType && module, D0 = mc && mc.exports === Th, bc = D0 ? rs.Buffer : void 0, R0 = bc ? bc.isBuffer : void 0, _i = R0 || $0, M0 = "[object Arguments]", B0 = "[object Array]", q0 = "[object Boolean]", P0 = "[object Date]", V0 = "[object Error]", j0 = "[object Function]", U0 = "[object Map]", H0 = "[object Number]", W0 = "[object Object]", z0 = "[object RegExp]", K0 = "[object Set]", G0 = "[object String]", Y0 = "[object WeakMap]", X0 = "[object ArrayBuffer]", Z0 = "[object DataView]", J0 = "[object Float32Array]", Q0 = "[object Float64Array]", tb = "[object Int8Array]", eb = "[object Int16Array]", sb = "[object Int32Array]", nb = "[object Uint8Array]", ib = "[object Uint8ClampedArray]", rb = "[object Uint16Array]", ob = "[object Uint32Array]", kt = {};
kt[J0] = kt[Q0] = kt[tb] = kt[eb] = kt[sb] = kt[nb] = kt[ib] = kt[rb] = kt[ob] = !0;
kt[M0] = kt[B0] = kt[X0] = kt[q0] = kt[Z0] = kt[P0] = kt[V0] = kt[j0] = kt[U0] = kt[H0] = kt[W0] = kt[z0] = kt[K0] = kt[G0] = kt[Y0] = !1;
function ab(e) {
  return _s(e) && wh(e.length) && !!kt[Gn(e)];
}
function dl(e) {
  return function(t) {
    return e(t);
  };
}
var Fh = typeof exports == "object" && exports && !exports.nodeType && exports, gi = Fh && typeof module == "object" && module && !module.nodeType && module, lb = gi && gi.exports === Fh, Go = lb && bh.process, qn = function() {
  try {
    var e = gi && gi.require && gi.require("util").types;
    return e || Go && Go.binding && Go.binding("util");
  } catch {
  }
}(), yc = qn && qn.isTypedArray, fl = yc ? dl(yc) : ab, cb = Object.prototype, ub = cb.hasOwnProperty;
function xh(e, t) {
  var s = Js(e), n = !s && ma(e), i = !s && !n && _i(e), r = !s && !n && !i && fl(e), a = s || n || i || r, o = a ? S0(e.length, String) : [], l = o.length;
  for (var c in e)
    (t || ub.call(e, c)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    _h(c, l))) && o.push(c);
  return o;
}
function Ch(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var hb = Ch(Object.keys, Object), db = Object.prototype, fb = db.hasOwnProperty;
function pb(e) {
  if (!hl(e))
    return hb(e);
  var t = [];
  for (var s in Object(e))
    fb.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
function gb(e) {
  return Pr(e) ? xh(e) : pb(e);
}
function mb(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var bb = Object.prototype, yb = bb.hasOwnProperty;
function vb(e) {
  if (!Ps(e))
    return mb(e);
  var t = hl(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !yb.call(e, n)) || s.push(n);
  return s;
}
function Oh(e) {
  return Pr(e) ? xh(e, !0) : vb(e);
}
var Ei = on(Object, "create");
function _b() {
  this.__data__ = Ei ? Ei(null) : {}, this.size = 0;
}
function Eb(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var wb = "__lodash_hash_undefined__", Ab = Object.prototype, Tb = Ab.hasOwnProperty;
function Fb(e) {
  var t = this.__data__;
  if (Ei) {
    var s = t[e];
    return s === wb ? void 0 : s;
  }
  return Tb.call(t, e) ? t[e] : void 0;
}
var xb = Object.prototype, Cb = xb.hasOwnProperty;
function Ob(e) {
  var t = this.__data__;
  return Ei ? t[e] !== void 0 : Cb.call(t, e);
}
var Nb = "__lodash_hash_undefined__";
function Sb(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = Ei && t === void 0 ? Nb : t, this;
}
function Qs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Qs.prototype.clear = _b;
Qs.prototype.delete = Eb;
Qs.prototype.get = Fb;
Qs.prototype.has = Ob;
Qs.prototype.set = Sb;
function kb() {
  this.__data__ = [], this.size = 0;
}
function Vr(e, t) {
  for (var s = e.length; s--; )
    if (Li(e[s][0], t))
      return s;
  return -1;
}
var Lb = Array.prototype, Ib = Lb.splice;
function $b(e) {
  var t = this.__data__, s = Vr(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : Ib.call(t, s, 1), --this.size, !0;
}
function Db(e) {
  var t = this.__data__, s = Vr(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function Rb(e) {
  return Vr(this.__data__, e) > -1;
}
function Mb(e, t) {
  var s = this.__data__, n = Vr(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function Ts(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ts.prototype.clear = kb;
Ts.prototype.delete = $b;
Ts.prototype.get = Db;
Ts.prototype.has = Rb;
Ts.prototype.set = Mb;
var wi = on(rs, "Map");
function Bb() {
  this.size = 0, this.__data__ = {
    hash: new Qs(),
    map: new (wi || Ts)(),
    string: new Qs()
  };
}
function qb(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function jr(e, t) {
  var s = e.__data__;
  return qb(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function Pb(e) {
  var t = jr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Vb(e) {
  return jr(this, e).get(e);
}
function jb(e) {
  return jr(this, e).has(e);
}
function Ub(e, t) {
  var s = jr(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
function an(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
an.prototype.clear = Bb;
an.prototype.delete = Pb;
an.prototype.get = Vb;
an.prototype.has = jb;
an.prototype.set = Ub;
function Hb(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var Nh = Ch(Object.getPrototypeOf, Object), Wb = "[object Object]", zb = Function.prototype, Kb = Object.prototype, Sh = zb.toString, Gb = Kb.hasOwnProperty, Yb = Sh.call(Object);
function Xb(e) {
  if (!_s(e) || Gn(e) != Wb)
    return !1;
  var t = Nh(e);
  if (t === null)
    return !0;
  var s = Gb.call(t, "constructor") && t.constructor;
  return typeof s == "function" && s instanceof s && Sh.call(s) == Yb;
}
function Zb() {
  this.__data__ = new Ts(), this.size = 0;
}
function Jb(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
function Qb(e) {
  return this.__data__.get(e);
}
function ty(e) {
  return this.__data__.has(e);
}
var ey = 200;
function sy(e, t) {
  var s = this.__data__;
  if (s instanceof Ts) {
    var n = s.__data__;
    if (!wi || n.length < ey - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new an(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
function ts(e) {
  var t = this.__data__ = new Ts(e);
  this.size = t.size;
}
ts.prototype.clear = Zb;
ts.prototype.delete = Jb;
ts.prototype.get = Qb;
ts.prototype.has = ty;
ts.prototype.set = sy;
var kh = typeof exports == "object" && exports && !exports.nodeType && exports, vc = kh && typeof module == "object" && module && !module.nodeType && module, ny = vc && vc.exports === kh, _c = ny ? rs.Buffer : void 0, Ec = _c ? _c.allocUnsafe : void 0;
function Lh(e, t) {
  if (t)
    return e.slice();
  var s = e.length, n = Ec ? Ec(s) : new e.constructor(s);
  return e.copy(n), n;
}
function iy(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var a = e[s];
    t(a, s, e) && (r[i++] = a);
  }
  return r;
}
function ry() {
  return [];
}
var oy = Object.prototype, ay = oy.propertyIsEnumerable, wc = Object.getOwnPropertySymbols, ly = wc ? function(e) {
  return e == null ? [] : (e = Object(e), iy(wc(e), function(t) {
    return ay.call(e, t);
  }));
} : ry;
function cy(e, t, s) {
  var n = t(e);
  return Js(e) ? n : Hb(n, s(e));
}
function ba(e) {
  return cy(e, gb, ly);
}
var ya = on(rs, "DataView"), va = on(rs, "Promise"), _a = on(rs, "Set"), Ac = "[object Map]", uy = "[object Object]", Tc = "[object Promise]", Fc = "[object Set]", xc = "[object WeakMap]", Cc = "[object DataView]", hy = rn(ya), dy = rn(wi), fy = rn(va), py = rn(_a), gy = rn(ga), Re = Gn;
(ya && Re(new ya(new ArrayBuffer(1))) != Cc || wi && Re(new wi()) != Ac || va && Re(va.resolve()) != Tc || _a && Re(new _a()) != Fc || ga && Re(new ga()) != xc) && (Re = function(e) {
  var t = Gn(e), s = t == uy ? e.constructor : void 0, n = s ? rn(s) : "";
  if (n)
    switch (n) {
      case hy:
        return Cc;
      case dy:
        return Ac;
      case fy:
        return Tc;
      case py:
        return Fc;
      case gy:
        return xc;
    }
  return t;
});
var my = Object.prototype, by = my.hasOwnProperty;
function yy(e) {
  var t = e.length, s = new e.constructor(t);
  return t && typeof e[0] == "string" && by.call(e, "index") && (s.index = e.index, s.input = e.input), s;
}
var Cr = rs.Uint8Array;
function pl(e) {
  var t = new e.constructor(e.byteLength);
  return new Cr(t).set(new Cr(e)), t;
}
function vy(e, t) {
  var s = pl(e.buffer);
  return new e.constructor(s, e.byteOffset, e.byteLength);
}
var _y = /\w*$/;
function Ey(e) {
  var t = new e.constructor(e.source, _y.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Oc = Rs ? Rs.prototype : void 0, Nc = Oc ? Oc.valueOf : void 0;
function wy(e) {
  return Nc ? Object(Nc.call(e)) : {};
}
function Ih(e, t) {
  var s = t ? pl(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.length);
}
var Ay = "[object Boolean]", Ty = "[object Date]", Fy = "[object Map]", xy = "[object Number]", Cy = "[object RegExp]", Oy = "[object Set]", Ny = "[object String]", Sy = "[object Symbol]", ky = "[object ArrayBuffer]", Ly = "[object DataView]", Iy = "[object Float32Array]", $y = "[object Float64Array]", Dy = "[object Int8Array]", Ry = "[object Int16Array]", My = "[object Int32Array]", By = "[object Uint8Array]", qy = "[object Uint8ClampedArray]", Py = "[object Uint16Array]", Vy = "[object Uint32Array]";
function jy(e, t, s) {
  var n = e.constructor;
  switch (t) {
    case ky:
      return pl(e);
    case Ay:
    case Ty:
      return new n(+e);
    case Ly:
      return vy(e);
    case Iy:
    case $y:
    case Dy:
    case Ry:
    case My:
    case By:
    case qy:
    case Py:
    case Vy:
      return Ih(e, s);
    case Fy:
      return new n();
    case xy:
    case Ny:
      return new n(e);
    case Cy:
      return Ey(e);
    case Oy:
      return new n();
    case Sy:
      return wy(e);
  }
}
function $h(e) {
  return typeof e.constructor == "function" && !hl(e) ? l0(Nh(e)) : {};
}
var Uy = "[object Map]";
function Hy(e) {
  return _s(e) && Re(e) == Uy;
}
var Sc = qn && qn.isMap, Wy = Sc ? dl(Sc) : Hy, zy = "[object Set]";
function Ky(e) {
  return _s(e) && Re(e) == zy;
}
var kc = qn && qn.isSet, Gy = kc ? dl(kc) : Ky, Yy = 1, Dh = "[object Arguments]", Xy = "[object Array]", Zy = "[object Boolean]", Jy = "[object Date]", Qy = "[object Error]", Rh = "[object Function]", tv = "[object GeneratorFunction]", ev = "[object Map]", sv = "[object Number]", Mh = "[object Object]", nv = "[object RegExp]", iv = "[object Set]", rv = "[object String]", ov = "[object Symbol]", av = "[object WeakMap]", lv = "[object ArrayBuffer]", cv = "[object DataView]", uv = "[object Float32Array]", hv = "[object Float64Array]", dv = "[object Int8Array]", fv = "[object Int16Array]", pv = "[object Int32Array]", gv = "[object Uint8Array]", mv = "[object Uint8ClampedArray]", bv = "[object Uint16Array]", yv = "[object Uint32Array]", Nt = {};
Nt[Dh] = Nt[Xy] = Nt[lv] = Nt[cv] = Nt[Zy] = Nt[Jy] = Nt[uv] = Nt[hv] = Nt[dv] = Nt[fv] = Nt[pv] = Nt[ev] = Nt[sv] = Nt[Mh] = Nt[nv] = Nt[iv] = Nt[rv] = Nt[ov] = Nt[gv] = Nt[mv] = Nt[bv] = Nt[yv] = !0;
Nt[Qy] = Nt[Rh] = Nt[av] = !1;
function mr(e, t, s, n, i, r) {
  var a, o = t & Yy;
  if (a !== void 0)
    return a;
  if (!Ps(e))
    return e;
  var l = Js(e);
  if (l)
    a = yy(e);
  else {
    var c = Re(e), d = c == Rh || c == tv;
    if (_i(e))
      return Lh(e, o);
    if (c == Mh || c == Dh || d && !i)
      a = d ? {} : $h(e);
    else {
      if (!Nt[c])
        return i ? e : {};
      a = jy(e, c, o);
    }
  }
  r || (r = new ts());
  var h = r.get(e);
  if (h)
    return h;
  r.set(e, a), Gy(e) ? e.forEach(function(_) {
    a.add(mr(_, t, s, _, e, r));
  }) : Wy(e) && e.forEach(function(_, F) {
    a.set(F, mr(_, t, s, F, e, r));
  });
  var g = ba, v = l ? void 0 : g(e);
  return y0(v || e, function(_, F) {
    v && (F = _, _ = e[F]), Eh(a, F, mr(_, t, s, F, e, r));
  }), a;
}
var vv = 1, _v = 4;
function Sn(e) {
  return mr(e, vv | _v);
}
var Ev = "__lodash_hash_undefined__";
function wv(e) {
  return this.__data__.set(e, Ev), this;
}
function Av(e) {
  return this.__data__.has(e);
}
function Or(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new an(); ++t < s; )
    this.add(e[t]);
}
Or.prototype.add = Or.prototype.push = wv;
Or.prototype.has = Av;
function Tv(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
function Fv(e, t) {
  return e.has(t);
}
var xv = 1, Cv = 2;
function Bh(e, t, s, n, i, r) {
  var a = s & xv, o = e.length, l = t.length;
  if (o != l && !(a && l > o))
    return !1;
  var c = r.get(e), d = r.get(t);
  if (c && d)
    return c == t && d == e;
  var h = -1, g = !0, v = s & Cv ? new Or() : void 0;
  for (r.set(e, t), r.set(t, e); ++h < o; ) {
    var _ = e[h], F = t[h];
    if (n)
      var O = a ? n(F, _, h, t, e, r) : n(_, F, h, e, t, r);
    if (O !== void 0) {
      if (O)
        continue;
      g = !1;
      break;
    }
    if (v) {
      if (!Tv(t, function(I, j) {
        if (!Fv(v, j) && (_ === I || i(_, I, s, n, r)))
          return v.push(j);
      })) {
        g = !1;
        break;
      }
    } else if (!(_ === F || i(_, F, s, n, r))) {
      g = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), g;
}
function Ov(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
function Nv(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var Sv = 1, kv = 2, Lv = "[object Boolean]", Iv = "[object Date]", $v = "[object Error]", Dv = "[object Map]", Rv = "[object Number]", Mv = "[object RegExp]", Bv = "[object Set]", qv = "[object String]", Pv = "[object Symbol]", Vv = "[object ArrayBuffer]", jv = "[object DataView]", Lc = Rs ? Rs.prototype : void 0, Yo = Lc ? Lc.valueOf : void 0;
function Uv(e, t, s, n, i, r, a) {
  switch (s) {
    case jv:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Vv:
      return !(e.byteLength != t.byteLength || !r(new Cr(e), new Cr(t)));
    case Lv:
    case Iv:
    case Rv:
      return Li(+e, +t);
    case $v:
      return e.name == t.name && e.message == t.message;
    case Mv:
    case qv:
      return e == t + "";
    case Dv:
      var o = Ov;
    case Bv:
      var l = n & Sv;
      if (o || (o = Nv), e.size != t.size && !l)
        return !1;
      var c = a.get(e);
      if (c)
        return c == t;
      n |= kv, a.set(e, t);
      var d = Bh(o(e), o(t), n, i, r, a);
      return a.delete(e), d;
    case Pv:
      if (Yo)
        return Yo.call(e) == Yo.call(t);
  }
  return !1;
}
var Hv = 1, Wv = Object.prototype, zv = Wv.hasOwnProperty;
function Kv(e, t, s, n, i, r) {
  var a = s & Hv, o = ba(e), l = o.length, c = ba(t), d = c.length;
  if (l != d && !a)
    return !1;
  for (var h = l; h--; ) {
    var g = o[h];
    if (!(a ? g in t : zv.call(t, g)))
      return !1;
  }
  var v = r.get(e), _ = r.get(t);
  if (v && _)
    return v == t && _ == e;
  var F = !0;
  r.set(e, t), r.set(t, e);
  for (var O = a; ++h < l; ) {
    g = o[h];
    var I = e[g], j = t[g];
    if (n)
      var W = a ? n(j, I, g, t, e, r) : n(I, j, g, e, t, r);
    if (!(W === void 0 ? I === j || i(I, j, s, n, r) : W)) {
      F = !1;
      break;
    }
    O || (O = g == "constructor");
  }
  if (F && !O) {
    var Y = e.constructor, G = t.constructor;
    Y != G && "constructor" in e && "constructor" in t && !(typeof Y == "function" && Y instanceof Y && typeof G == "function" && G instanceof G) && (F = !1);
  }
  return r.delete(e), r.delete(t), F;
}
var Gv = 1, Ic = "[object Arguments]", $c = "[object Array]", nr = "[object Object]", Yv = Object.prototype, Dc = Yv.hasOwnProperty;
function Xv(e, t, s, n, i, r) {
  var a = Js(e), o = Js(t), l = a ? $c : Re(e), c = o ? $c : Re(t);
  l = l == Ic ? nr : l, c = c == Ic ? nr : c;
  var d = l == nr, h = c == nr, g = l == c;
  if (g && _i(e)) {
    if (!_i(t))
      return !1;
    a = !0, d = !1;
  }
  if (g && !d)
    return r || (r = new ts()), a || fl(e) ? Bh(e, t, s, n, i, r) : Uv(e, t, l, s, n, i, r);
  if (!(s & Gv)) {
    var v = d && Dc.call(e, "__wrapped__"), _ = h && Dc.call(t, "__wrapped__");
    if (v || _) {
      var F = v ? e.value() : e, O = _ ? t.value() : t;
      return r || (r = new ts()), i(F, O, s, n, r);
    }
  }
  return g ? (r || (r = new ts()), Kv(e, t, s, n, i, r)) : !1;
}
function qh(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !_s(e) && !_s(t) ? e !== e && t !== t : Xv(e, t, s, n, qh, i);
}
function Zv(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), a = n(t), o = a.length; o--; ) {
      var l = a[++i];
      if (s(r[l], l, r) === !1)
        break;
    }
    return t;
  };
}
var Jv = Zv();
function Ea(e, t, s) {
  (s !== void 0 && !Li(e[t], s) || s === void 0 && !(t in e)) && ul(e, t, s);
}
function Qv(e) {
  return _s(e) && Pr(e);
}
function wa(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function t_(e) {
  return A0(e, Oh(e));
}
function e_(e, t, s, n, i, r, a) {
  var o = wa(e, s), l = wa(t, s), c = a.get(l);
  if (c) {
    Ea(e, s, c);
    return;
  }
  var d = r ? r(o, l, s + "", e, t, a) : void 0, h = d === void 0;
  if (h) {
    var g = Js(l), v = !g && _i(l), _ = !g && !v && fl(l);
    d = l, g || v || _ ? Js(o) ? d = o : Qv(o) ? d = u0(o) : v ? (h = !1, d = Lh(l, !0)) : _ ? (h = !1, d = Ih(l, !0)) : d = [] : Xb(l) || ma(l) ? (d = o, ma(o) ? d = t_(o) : (!Ps(o) || cl(o)) && (d = $h(l))) : h = !1;
  }
  h && (a.set(l, d), i(d, l, n, r, a), a.delete(l)), Ea(e, s, d);
}
function Ph(e, t, s, n, i) {
  e !== t && Jv(t, function(r, a) {
    if (i || (i = new ts()), Ps(r))
      e_(e, t, a, s, Ph, n, i);
    else {
      var o = n ? n(wa(e, a), r, a + "", e, t, i) : void 0;
      o === void 0 && (o = r), Ea(e, a, o);
    }
  }, Oh);
}
function gl(e, t) {
  return qh(e, t);
}
var Ls = O0(function(e, t, s) {
  Ph(e, t, s);
}), at = /* @__PURE__ */ ((e) => (e[e.TYPE = 3] = "TYPE", e[e.LEVEL = 12] = "LEVEL", e[e.ATTRIBUTE = 13] = "ATTRIBUTE", e[e.BLOT = 14] = "BLOT", e[e.INLINE = 7] = "INLINE", e[e.BLOCK = 11] = "BLOCK", e[e.BLOCK_BLOT = 10] = "BLOCK_BLOT", e[e.INLINE_BLOT = 6] = "INLINE_BLOT", e[e.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", e[e.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", e[e.ANY = 15] = "ANY", e))(at || {});
class ns {
  constructor(t, s, n = {}) {
    this.attrName = t, this.keyName = s;
    const i = at.TYPE & at.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & at.LEVEL | i
    ) : at.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
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
class kn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Vh = class Aa {
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
      throw new kn(`Unable to create ${s} blot`);
    const r = i, a = (
      // @ts-expect-error Fix me later
      s instanceof Node || s.nodeType === Node.TEXT_NODE ? s : r.create(n)
    ), o = new r(t, a, n);
    return Aa.blots.set(o.domNode, o), o;
  }
  find(t, s = !1) {
    return Aa.find(t, s);
  }
  query(t, s = at.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & at.LEVEL & at.BLOCK ? n = this.types.block : t & at.LEVEL & at.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && s & at.LEVEL & n.scope && s & at.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((s) => {
      const n = "blotName" in s, i = "attrName" in s;
      if (!n && !i)
        throw new kn("Invalid definition");
      if (n && s.blotName === "abstract")
        throw new kn("Cannot register abstract class");
      const r = n ? s.blotName : i ? s.attrName : void 0;
      return this.types[r] = s, i ? typeof s.keyName == "string" && (this.attributes[s.keyName] = s) : n && (s.className && (this.classes[s.className] = s), s.tagName && (Array.isArray(s.tagName) ? s.tagName = s.tagName.map((a) => a.toUpperCase()) : s.tagName = s.tagName.toUpperCase(), (Array.isArray(s.tagName) ? s.tagName : [s.tagName]).forEach((a) => {
        (this.tags[a] == null || s.className == null) && (this.tags[a] = s);
      }))), s;
    });
  }
};
Vh.blots = /* @__PURE__ */ new WeakMap();
let Pn = Vh;
function Rc(e, t) {
  return (e.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class s_ extends ns {
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
const He = s_;
function Xo(e) {
  const t = e.split("-"), s = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + s;
}
class n_ extends ns {
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
const Vs = n_;
class i_ {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, s) {
    s ? t.add(this.domNode, s) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Pn.find(this.domNode);
    if (t == null)
      return;
    const s = ns.keys(this.domNode), n = He.keys(this.domNode), i = Vs.keys(this.domNode);
    s.concat(n).concat(i).forEach((r) => {
      const a = t.scroll.query(r, at.ATTRIBUTE);
      a instanceof ns && (this.attributes[a.attrName] = a);
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
const Ur = i_, jh = class {
  constructor(t, s) {
    this.scroll = t, this.domNode = s, Pn.blots.set(s, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new kn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Pn.blots.delete(this.domNode);
  }
  deleteAt(t, s) {
    this.isolate(t, s).remove();
  }
  formatAt(t, s, n, i) {
    const r = this.isolate(t, s);
    if (this.scroll.query(n, at.BLOT) != null && i)
      r.wrap(n, i);
    else if (this.scroll.query(n, at.ATTRIBUTE) != null) {
      const a = this.scroll.create(this.statics.scope);
      r.wrap(a), a.format(n, i);
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
      throw new kn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
jh.blotName = "abstract";
let Uh = jh;
const Hh = class extends Uh {
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
Hh.scope = at.INLINE_BLOT;
let r_ = Hh;
const oe = r_;
class o_ {
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
    let a = t - r;
    const o = this.iterator(i);
    let l = o();
    for (; l && a < t + s; ) {
      const c = l.length();
      t > a ? n(
        l,
        t - a,
        Math.min(s, a + c - t)
      ) : n(l, 0, Math.min(c, t + s - a)), a += c, l = o();
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
function Mc(e, t) {
  const s = t.find(e);
  if (s)
    return s;
  try {
    return t.create(e);
  } catch {
    const n = t.create(at.INLINE);
    return Array.from(e.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), e.parentNode && e.parentNode.replaceChild(n.domNode, e), n.attach(), n;
  }
}
const Wh = class Ns extends Uh {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, Ns.uiClass && this.uiNode.classList.add(Ns.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new o_(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const s = Mc(t, this.scroll);
        this.insertBefore(s, this.children.head || void 0);
      } catch (s) {
        if (s instanceof kn)
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
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof Ns ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, s = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      s,
      n,
      (a, o, l) => {
        (t.blotName == null && t(a) || t.blotName != null && a instanceof t) && i.push(a), a instanceof Ns && (i = i.concat(
          a.descendants(t, o, r)
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
      ) || (s.statics.scope === at.BLOCK_BLOT ? (s.next != null && this.splitAfter(s), s.prev != null && this.splitAfter(s.prev), s.parent.unwrap(), t = !0) : s instanceof Ns ? s.unwrap() : s.remove());
    });
  }
  formatAt(t, s, n, i) {
    this.children.forEachAt(t, s, (r, a, o) => {
      r.formatAt(a, o, n, i);
    });
  }
  insertAt(t, s, n) {
    const [i, r] = this.children.find(t);
    if (i)
      i.insertAt(r, s, n);
    else {
      const a = n == null ? this.scroll.create("text", s) : this.scroll.create(s, n);
      this.appendChild(a);
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
    return n instanceof Ns ? r.concat(n.path(i, s)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    return n instanceof Ns && this.moveChildren(n), super.replaceWith(n);
  }
  split(t, s = !1) {
    if (!s) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const n = this.clone();
    return this.parent && this.parent.insertBefore(n, this.next || void 0), this.children.forEachAt(t, this.length(), (i, r, a) => {
      const o = i.split(r, s);
      o != null && n.appendChild(o);
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
      const a = this.scroll.find(r);
      a != null && (a.domNode.parentNode == null || a.domNode.parentNode === this.domNode) && a.detach();
    }), n.filter((r) => r.parentNode === this.domNode && r !== this.uiNode).sort((r, a) => r === a ? 0 : r.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((r) => {
      let a = null;
      r.nextSibling != null && (a = this.scroll.find(r.nextSibling));
      const o = Mc(r, this.scroll);
      (o.next !== a || o.next == null) && (o.parent != null && o.parent.removeChild(this), this.insertBefore(o, a || void 0));
    }), this.enforceAllowedChildren();
  }
};
Wh.uiClass = "";
let a_ = Wh;
const Ve = a_;
function l_(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const En = class wn extends Ve {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(wn.blotName);
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
        n instanceof wn || (n = n.wrap(wn.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, at.INLINE);
      if (n == null)
        return;
      n instanceof ns ? this.attributes.attribute(n, s) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s);
    }
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.formats()[n] != null || this.scroll.query(n, at.ATTRIBUTE) ? this.isolate(t, s).format(n, i) : super.formatAt(t, s, n, i);
  }
  optimize(t) {
    super.optimize(t);
    const s = this.formats();
    if (Object.keys(s).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof wn && n.prev === this && l_(s, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof wn && this.attributes.move(n), n;
  }
};
En.allowedChildren = [En, oe], En.blotName = "inline", En.scope = at.INLINE_BLOT, En.tagName = "SPAN";
let c_ = En;
const ml = c_, An = class Ta extends Ve {
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
    const n = this.scroll.query(t, at.BLOCK);
    n != null && (n instanceof ns ? this.attributes.attribute(n, s) : t === this.statics.blotName && !s ? this.replaceWith(Ta.blotName) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s));
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.scroll.query(n, at.BLOCK) != null ? this.format(n, i) : super.formatAt(t, s, n, i);
  }
  insertAt(t, s, n) {
    if (n == null || this.scroll.query(s, at.INLINE) != null)
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
An.blotName = "block", An.scope = at.BLOCK_BLOT, An.tagName = "P", An.allowedChildren = [
  ml,
  An,
  oe
];
let u_ = An;
const Ai = u_, Fa = class extends Ve {
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
Fa.blotName = "container", Fa.scope = at.BLOCK_BLOT;
let h_ = Fa;
const Hr = h_;
class d_ extends oe {
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
const ye = d_, f_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, p_ = 100, Tn = class extends Ve {
  constructor(t, s) {
    super(null, s), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, f_), this.attach();
  }
  create(t, s) {
    return this.registry.create(this, t, s);
  }
  find(t, s = !1) {
    const n = this.registry.find(t, s);
    return n ? n.scroll === this ? n : s ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, s = at.ANY) {
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
    const r = (l, c = !0) => {
      l == null || l === this || l.domNode.parentNode != null && (n.has(l.domNode) || n.set(l.domNode, []), c && r(l.parent));
    }, a = (l) => {
      n.has(l.domNode) && (l instanceof Ve && l.children.forEach(a), n.delete(l.domNode), l.optimize(s));
    };
    let o = t;
    for (let l = 0; o.length > 0; l += 1) {
      if (l >= p_)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (o.forEach((c) => {
        const d = this.find(c.target, !0);
        d != null && (d.domNode === c.target && (c.type === "childList" ? (r(this.find(c.previousSibling, !1)), Array.from(c.addedNodes).forEach((h) => {
          const g = this.find(h, !1);
          r(g, !1), g instanceof Ve && g.children.forEach((v) => {
            r(v, !1);
          });
        })) : c.type === "attributes" && r(d.prev)), r(d));
      }), this.children.forEach(a), o = Array.from(this.observer.takeRecords()), i = o.slice(); i.length > 0; )
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
Tn.blotName = "scroll", Tn.defaultChild = Ai, Tn.allowedChildren = [Ai, Hr], Tn.scope = at.BLOCK_BLOT, Tn.tagName = "DIV";
let g_ = Tn;
const bl = g_, xa = class zh extends oe {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof zh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
xa.blotName = "text", xa.scope = at.INLINE_BLOT;
let m_ = xa;
const Nr = m_, b_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: ns,
  AttributorStore: Ur,
  BlockBlot: Ai,
  ClassAttributor: He,
  ContainerBlot: Hr,
  EmbedBlot: ye,
  InlineBlot: ml,
  LeafBlot: oe,
  ParentBlot: Ve,
  Registry: Pn,
  Scope: at,
  ScrollBlot: bl,
  StyleAttributor: Vs,
  TextBlot: Nr
}, Symbol.toStringTag, { value: "Module" }));
var ms = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Kh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ir = { exports: {} }, Zo, Bc;
function y_() {
  if (Bc) return Zo;
  Bc = 1;
  var e = -1, t = 1, s = 0;
  function n(y, x, w, N, R) {
    if (y === x)
      return y ? [[s, y]] : [];
    if (w != null) {
      var A = C(y, x, w);
      if (A)
        return A;
    }
    var S = o(y, x), z = y.substring(0, S);
    y = y.substring(S), x = x.substring(S), S = c(y, x);
    var K = y.substring(y.length - S);
    y = y.substring(0, y.length - S), x = x.substring(0, x.length - S);
    var U = i(y, x);
    return z && U.unshift([s, z]), K && U.push([s, K]), j(U, R), N && h(U), U;
  }
  function i(y, x) {
    var w;
    if (!y)
      return [[t, x]];
    if (!x)
      return [[e, y]];
    var N = y.length > x.length ? y : x, R = y.length > x.length ? x : y, A = N.indexOf(R);
    if (A !== -1)
      return w = [
        [t, N.substring(0, A)],
        [s, R],
        [t, N.substring(A + R.length)]
      ], y.length > x.length && (w[0][0] = w[2][0] = e), w;
    if (R.length === 1)
      return [
        [e, y],
        [t, x]
      ];
    var S = d(y, x);
    if (S) {
      var z = S[0], K = S[1], U = S[2], nt = S[3], tt = S[4], ot = n(z, U), it = n(K, nt);
      return ot.concat([[s, tt]], it);
    }
    return r(y, x);
  }
  function r(y, x) {
    for (var w = y.length, N = x.length, R = Math.ceil((w + N) / 2), A = R, S = 2 * R, z = new Array(S), K = new Array(S), U = 0; U < S; U++)
      z[U] = -1, K[U] = -1;
    z[A + 1] = 0, K[A + 1] = 0;
    for (var nt = w - N, tt = nt % 2 !== 0, ot = 0, it = 0, H = 0, Z = 0, yt = 0; yt < R; yt++) {
      for (var st = -yt + ot; st <= yt - it; st += 2) {
        var gt = A + st, mt;
        st === -yt || st !== yt && z[gt - 1] < z[gt + 1] ? mt = z[gt + 1] : mt = z[gt - 1] + 1;
        for (var M = mt - st; mt < w && M < N && y.charAt(mt) === x.charAt(M); )
          mt++, M++;
        if (z[gt] = mt, mt > w)
          it += 2;
        else if (M > N)
          ot += 2;
        else if (tt) {
          var B = A + nt - st;
          if (B >= 0 && B < S && K[B] !== -1) {
            var q = w - K[B];
            if (mt >= q)
              return a(y, x, mt, M);
          }
        }
      }
      for (var J = -yt + H; J <= yt - Z; J += 2) {
        var B = A + J, q;
        J === -yt || J !== yt && K[B - 1] < K[B + 1] ? q = K[B + 1] : q = K[B - 1] + 1;
        for (var Rt = q - J; q < w && Rt < N && y.charAt(w - q - 1) === x.charAt(N - Rt - 1); )
          q++, Rt++;
        if (K[B] = q, q > w)
          Z += 2;
        else if (Rt > N)
          H += 2;
        else if (!tt) {
          var gt = A + nt - J;
          if (gt >= 0 && gt < S && z[gt] !== -1) {
            var mt = z[gt], M = A + mt - gt;
            if (q = w - q, mt >= q)
              return a(y, x, mt, M);
          }
        }
      }
    }
    return [
      [e, y],
      [t, x]
    ];
  }
  function a(y, x, w, N) {
    var R = y.substring(0, w), A = x.substring(0, N), S = y.substring(w), z = x.substring(N), K = n(R, A), U = n(S, z);
    return K.concat(U);
  }
  function o(y, x) {
    if (!y || !x || y.charAt(0) !== x.charAt(0))
      return 0;
    for (var w = 0, N = Math.min(y.length, x.length), R = N, A = 0; w < R; )
      y.substring(A, R) == x.substring(A, R) ? (w = R, A = w) : N = R, R = Math.floor((N - w) / 2 + w);
    return W(y.charCodeAt(R - 1)) && R--, R;
  }
  function l(y, x) {
    var w = y.length, N = x.length;
    if (w == 0 || N == 0)
      return 0;
    w > N ? y = y.substring(w - N) : w < N && (x = x.substring(0, w));
    var R = Math.min(w, N);
    if (y == x)
      return R;
    for (var A = 0, S = 1; ; ) {
      var z = y.substring(R - S), K = x.indexOf(z);
      if (K == -1)
        return A;
      S += K, (K == 0 || y.substring(R - S) == x.substring(0, S)) && (A = S, S++);
    }
  }
  function c(y, x) {
    if (!y || !x || y.slice(-1) !== x.slice(-1))
      return 0;
    for (var w = 0, N = Math.min(y.length, x.length), R = N, A = 0; w < R; )
      y.substring(y.length - R, y.length - A) == x.substring(x.length - R, x.length - A) ? (w = R, A = w) : N = R, R = Math.floor((N - w) / 2 + w);
    return Y(y.charCodeAt(y.length - R)) && R--, R;
  }
  function d(y, x) {
    var w = y.length > x.length ? y : x, N = y.length > x.length ? x : y;
    if (w.length < 4 || N.length * 2 < w.length)
      return null;
    function R(it, H, Z) {
      for (var yt = it.substring(Z, Z + Math.floor(it.length / 4)), st = -1, gt = "", mt, M, B, q; (st = H.indexOf(yt, st + 1)) !== -1; ) {
        var J = o(
          it.substring(Z),
          H.substring(st)
        ), Rt = c(
          it.substring(0, Z),
          H.substring(0, st)
        );
        gt.length < Rt + J && (gt = H.substring(st - Rt, st) + H.substring(st, st + J), mt = it.substring(0, Z - Rt), M = it.substring(Z + J), B = H.substring(0, st - Rt), q = H.substring(st + J));
      }
      return gt.length * 2 >= it.length ? [
        mt,
        M,
        B,
        q,
        gt
      ] : null;
    }
    var A = R(
      w,
      N,
      Math.ceil(w.length / 4)
    ), S = R(
      w,
      N,
      Math.ceil(w.length / 2)
    ), z;
    if (!A && !S)
      return null;
    S ? A ? z = A[4].length > S[4].length ? A : S : z = S : z = A;
    var K, U, nt, tt;
    y.length > x.length ? (K = z[0], U = z[1], nt = z[2], tt = z[3]) : (nt = z[0], tt = z[1], K = z[2], U = z[3]);
    var ot = z[4];
    return [K, U, nt, tt, ot];
  }
  function h(y) {
    for (var x = !1, w = [], N = 0, R = null, A = 0, S = 0, z = 0, K = 0, U = 0; A < y.length; )
      y[A][0] == s ? (w[N++] = A, S = K, z = U, K = 0, U = 0, R = y[A][1]) : (y[A][0] == t ? K += y[A][1].length : U += y[A][1].length, R && R.length <= Math.max(S, z) && R.length <= Math.max(K, U) && (y.splice(w[N - 1], 0, [
        e,
        R
      ]), y[w[N - 1] + 1][0] = t, N--, N--, A = N > 0 ? w[N - 1] : -1, S = 0, z = 0, K = 0, U = 0, R = null, x = !0)), A++;
    for (x && j(y), I(y), A = 1; A < y.length; ) {
      if (y[A - 1][0] == e && y[A][0] == t) {
        var nt = y[A - 1][1], tt = y[A][1], ot = l(nt, tt), it = l(tt, nt);
        ot >= it ? (ot >= nt.length / 2 || ot >= tt.length / 2) && (y.splice(A, 0, [
          s,
          tt.substring(0, ot)
        ]), y[A - 1][1] = nt.substring(
          0,
          nt.length - ot
        ), y[A + 1][1] = tt.substring(ot), A++) : (it >= nt.length / 2 || it >= tt.length / 2) && (y.splice(A, 0, [
          s,
          nt.substring(0, it)
        ]), y[A - 1][0] = t, y[A - 1][1] = tt.substring(
          0,
          tt.length - it
        ), y[A + 1][0] = e, y[A + 1][1] = nt.substring(it), A++), A++;
      }
      A++;
    }
  }
  var g = /[^a-zA-Z0-9]/, v = /\s/, _ = /[\r\n]/, F = /\n\r?\n$/, O = /^\r?\n\r?\n/;
  function I(y) {
    function x(it, H) {
      if (!it || !H)
        return 6;
      var Z = it.charAt(it.length - 1), yt = H.charAt(0), st = Z.match(g), gt = yt.match(g), mt = st && Z.match(v), M = gt && yt.match(v), B = mt && Z.match(_), q = M && yt.match(_), J = B && it.match(F), Rt = q && H.match(O);
      return J || Rt ? 5 : B || q ? 4 : st && !mt && M ? 3 : mt || M ? 2 : st || gt ? 1 : 0;
    }
    for (var w = 1; w < y.length - 1; ) {
      if (y[w - 1][0] == s && y[w + 1][0] == s) {
        var N = y[w - 1][1], R = y[w][1], A = y[w + 1][1], S = c(N, R);
        if (S) {
          var z = R.substring(R.length - S);
          N = N.substring(0, N.length - S), R = z + R.substring(0, R.length - S), A = z + A;
        }
        for (var K = N, U = R, nt = A, tt = x(N, R) + x(R, A); R.charAt(0) === A.charAt(0); ) {
          N += R.charAt(0), R = R.substring(1) + A.charAt(0), A = A.substring(1);
          var ot = x(N, R) + x(R, A);
          ot >= tt && (tt = ot, K = N, U = R, nt = A);
        }
        y[w - 1][1] != K && (K ? y[w - 1][1] = K : (y.splice(w - 1, 1), w--), y[w][1] = U, nt ? y[w + 1][1] = nt : (y.splice(w + 1, 1), w--));
      }
      w++;
    }
  }
  function j(y, x) {
    y.push([s, ""]);
    for (var w = 0, N = 0, R = 0, A = "", S = "", z; w < y.length; ) {
      if (w < y.length - 1 && !y[w][1]) {
        y.splice(w, 1);
        continue;
      }
      switch (y[w][0]) {
        case t:
          R++, S += y[w][1], w++;
          break;
        case e:
          N++, A += y[w][1], w++;
          break;
        case s:
          var K = w - R - N - 1;
          if (x) {
            if (K >= 0 && X(y[K][1])) {
              var U = y[K][1].slice(-1);
              if (y[K][1] = y[K][1].slice(
                0,
                -1
              ), A = U + A, S = U + S, !y[K][1]) {
                y.splice(K, 1), w--;
                var nt = K - 1;
                y[nt] && y[nt][0] === t && (R++, S = y[nt][1] + S, nt--), y[nt] && y[nt][0] === e && (N++, A = y[nt][1] + A, nt--), K = nt;
              }
            }
            if (G(y[w][1])) {
              var U = y[w][1].charAt(0);
              y[w][1] = y[w][1].slice(1), A += U, S += U;
            }
          }
          if (w < y.length - 1 && !y[w][1]) {
            y.splice(w, 1);
            break;
          }
          if (A.length > 0 || S.length > 0) {
            A.length > 0 && S.length > 0 && (z = o(S, A), z !== 0 && (K >= 0 ? y[K][1] += S.substring(
              0,
              z
            ) : (y.splice(0, 0, [
              s,
              S.substring(0, z)
            ]), w++), S = S.substring(z), A = A.substring(z)), z = c(S, A), z !== 0 && (y[w][1] = S.substring(S.length - z) + y[w][1], S = S.substring(
              0,
              S.length - z
            ), A = A.substring(
              0,
              A.length - z
            )));
            var tt = R + N;
            A.length === 0 && S.length === 0 ? (y.splice(w - tt, tt), w = w - tt) : A.length === 0 ? (y.splice(w - tt, tt, [t, S]), w = w - tt + 1) : S.length === 0 ? (y.splice(w - tt, tt, [e, A]), w = w - tt + 1) : (y.splice(
              w - tt,
              tt,
              [e, A],
              [t, S]
            ), w = w - tt + 2);
          }
          w !== 0 && y[w - 1][0] === s ? (y[w - 1][1] += y[w][1], y.splice(w, 1)) : w++, R = 0, N = 0, A = "", S = "";
          break;
      }
    }
    y[y.length - 1][1] === "" && y.pop();
    var ot = !1;
    for (w = 1; w < y.length - 1; )
      y[w - 1][0] === s && y[w + 1][0] === s && (y[w][1].substring(
        y[w][1].length - y[w - 1][1].length
      ) === y[w - 1][1] ? (y[w][1] = y[w - 1][1] + y[w][1].substring(
        0,
        y[w][1].length - y[w - 1][1].length
      ), y[w + 1][1] = y[w - 1][1] + y[w + 1][1], y.splice(w - 1, 1), ot = !0) : y[w][1].substring(0, y[w + 1][1].length) == y[w + 1][1] && (y[w - 1][1] += y[w + 1][1], y[w][1] = y[w][1].substring(y[w + 1][1].length) + y[w + 1][1], y.splice(w + 1, 1), ot = !0)), w++;
    ot && j(y, x);
  }
  function W(y) {
    return y >= 55296 && y <= 56319;
  }
  function Y(y) {
    return y >= 56320 && y <= 57343;
  }
  function G(y) {
    return Y(y.charCodeAt(0));
  }
  function X(y) {
    return W(y.charCodeAt(y.length - 1));
  }
  function ft(y) {
    for (var x = [], w = 0; w < y.length; w++)
      y[w][1].length > 0 && x.push(y[w]);
    return x;
  }
  function pt(y, x, w, N) {
    return X(y) || G(N) ? null : ft([
      [s, y],
      [e, x],
      [t, w],
      [s, N]
    ]);
  }
  function C(y, x, w) {
    var N = typeof w == "number" ? { index: w, length: 0 } : w.oldRange, R = typeof w == "number" ? null : w.newRange, A = y.length, S = x.length;
    if (N.length === 0 && (R === null || R.length === 0)) {
      var z = N.index, K = y.slice(0, z), U = y.slice(z), nt = R ? R.index : null;
      t: {
        var tt = z + S - A;
        if (nt !== null && nt !== tt || tt < 0 || tt > S)
          break t;
        var ot = x.slice(0, tt), it = x.slice(tt);
        if (it !== U)
          break t;
        var H = Math.min(z, tt), Z = K.slice(0, H), yt = ot.slice(0, H);
        if (Z !== yt)
          break t;
        var st = K.slice(H), gt = ot.slice(H);
        return pt(Z, st, gt, U);
      }
      t: {
        if (nt !== null && nt !== z)
          break t;
        var mt = z, ot = x.slice(0, mt), it = x.slice(mt);
        if (ot !== K)
          break t;
        var M = Math.min(A - mt, S - mt), B = U.slice(U.length - M), q = it.slice(it.length - M);
        if (B !== q)
          break t;
        var st = U.slice(0, U.length - M), gt = it.slice(0, it.length - M);
        return pt(K, st, gt, B);
      }
    }
    if (N.length > 0 && R && R.length === 0)
      t: {
        var Z = y.slice(0, N.index), B = y.slice(N.index + N.length), H = Z.length, M = B.length;
        if (S < H + M)
          break t;
        var yt = x.slice(0, H), q = x.slice(S - M);
        if (Z !== yt || B !== q)
          break t;
        var st = y.slice(H, A - M), gt = x.slice(H, S - M);
        return pt(Z, st, gt, B);
      }
    return null;
  }
  function P(y, x, w, N) {
    return n(y, x, w, N, !0);
  }
  return P.INSERT = t, P.DELETE = e, P.EQUAL = s, Zo = P, Zo;
}
var ci = { exports: {} };
ci.exports;
var qc;
function Gh() {
  return qc || (qc = 1, function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", l = "[object Date]", c = "[object Error]", d = "[object Function]", h = "[object GeneratorFunction]", g = "[object Map]", v = "[object Number]", _ = "[object Object]", F = "[object Promise]", O = "[object RegExp]", I = "[object Set]", j = "[object String]", W = "[object Symbol]", Y = "[object WeakMap]", G = "[object ArrayBuffer]", X = "[object DataView]", ft = "[object Float32Array]", pt = "[object Float64Array]", C = "[object Int8Array]", P = "[object Int16Array]", y = "[object Int32Array]", x = "[object Uint8Array]", w = "[object Uint8ClampedArray]", N = "[object Uint16Array]", R = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, S = /\w*$/, z = /^\[object .+?Constructor\]$/, K = /^(?:0|[1-9]\d*)$/, U = {};
    U[r] = U[a] = U[G] = U[X] = U[o] = U[l] = U[ft] = U[pt] = U[C] = U[P] = U[y] = U[g] = U[v] = U[_] = U[O] = U[I] = U[j] = U[W] = U[x] = U[w] = U[N] = U[R] = !0, U[c] = U[d] = U[Y] = !1;
    var nt = typeof ms == "object" && ms && ms.Object === Object && ms, tt = typeof self == "object" && self && self.Object === Object && self, ot = nt || tt || Function("return this")(), it = t && !t.nodeType && t, H = it && !0 && e && !e.nodeType && e, Z = H && H.exports === it;
    function yt(u, p) {
      return u.set(p[0], p[1]), u;
    }
    function st(u, p) {
      return u.add(p), u;
    }
    function gt(u, p) {
      for (var E = -1, L = u ? u.length : 0; ++E < L && p(u[E], E, u) !== !1; )
        ;
      return u;
    }
    function mt(u, p) {
      for (var E = -1, L = p.length, vt = u.length; ++E < L; )
        u[vt + E] = p[E];
      return u;
    }
    function M(u, p, E, L) {
      for (var vt = -1, ct = u ? u.length : 0; ++vt < ct; )
        E = p(E, u[vt], vt, u);
      return E;
    }
    function B(u, p) {
      for (var E = -1, L = Array(u); ++E < u; )
        L[E] = p(E);
      return L;
    }
    function q(u, p) {
      return u == null ? void 0 : u[p];
    }
    function J(u) {
      var p = !1;
      if (u != null && typeof u.toString != "function")
        try {
          p = !!(u + "");
        } catch {
        }
      return p;
    }
    function Rt(u) {
      var p = -1, E = Array(u.size);
      return u.forEach(function(L, vt) {
        E[++p] = [vt, L];
      }), E;
    }
    function ve(u, p) {
      return function(E) {
        return u(p(E));
      };
    }
    function Le(u) {
      var p = -1, E = Array(u.size);
      return u.forEach(function(L) {
        E[++p] = L;
      }), E;
    }
    var os = Array.prototype, as = Function.prototype, Zt = Object.prototype, le = ot["__core-js_shared__"], _e = function() {
      var u = /[^.]+$/.exec(le && le.keys && le.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    }(), Wt = as.toString, Ct = Zt.hasOwnProperty, lt = Zt.toString, ut = RegExp(
      "^" + Wt.call(Ct).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Et = Z ? ot.Buffer : void 0, wt = ot.Symbol, Jt = ot.Uint8Array, St = ve(Object.getPrototypeOf, Object), zt = Object.create, Kt = Zt.propertyIsEnumerable, Gt = os.splice, Mt = Object.getOwnPropertySymbols, Lt = Et ? Et.isBuffer : void 0, Pt = ve(Object.keys, Object), Bt = Ie(ot, "DataView"), It = Ie(ot, "Map"), Ot = Ie(ot, "Promise"), qt = Ie(ot, "Set"), Vt = Ie(ot, "WeakMap"), $t = Ie(Object, "create"), jt = ce(Bt), Dt = ce(It), Ut = ce(Ot), Ht = ce(qt), Yn = ce(Vt), xs = wt ? wt.prototype : void 0, Mi = xs ? xs.valueOf : void 0;
    function ls(u) {
      var p = -1, E = u ? u.length : 0;
      for (this.clear(); ++p < E; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Gr() {
      this.__data__ = $t ? $t(null) : {};
    }
    function Yr(u) {
      return this.has(u) && delete this.__data__[u];
    }
    function Xr(u) {
      var p = this.__data__;
      if ($t) {
        var E = p[u];
        return E === n ? void 0 : E;
      }
      return Ct.call(p, u) ? p[u] : void 0;
    }
    function Bi(u) {
      var p = this.__data__;
      return $t ? p[u] !== void 0 : Ct.call(p, u);
    }
    function Xn(u, p) {
      var E = this.__data__;
      return E[u] = $t && p === void 0 ? n : p, this;
    }
    ls.prototype.clear = Gr, ls.prototype.delete = Yr, ls.prototype.get = Xr, ls.prototype.has = Bi, ls.prototype.set = Xn;
    function te(u) {
      var p = -1, E = u ? u.length : 0;
      for (this.clear(); ++p < E; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Zr() {
      this.__data__ = [];
    }
    function Jr(u) {
      var p = this.__data__, E = dn(p, u);
      if (E < 0)
        return !1;
      var L = p.length - 1;
      return E == L ? p.pop() : Gt.call(p, E, 1), !0;
    }
    function Qr(u) {
      var p = this.__data__, E = dn(p, u);
      return E < 0 ? void 0 : p[E][1];
    }
    function to(u) {
      return dn(this.__data__, u) > -1;
    }
    function eo(u, p) {
      var E = this.__data__, L = dn(E, u);
      return L < 0 ? E.push([u, p]) : E[L][1] = p, this;
    }
    te.prototype.clear = Zr, te.prototype.delete = Jr, te.prototype.get = Qr, te.prototype.has = to, te.prototype.set = eo;
    function ne(u) {
      var p = -1, E = u ? u.length : 0;
      for (this.clear(); ++p < E; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function so() {
      this.__data__ = {
        hash: new ls(),
        map: new (It || te)(),
        string: new ls()
      };
    }
    function no(u) {
      return Us(this, u).delete(u);
    }
    function io(u) {
      return Us(this, u).get(u);
    }
    function ro(u) {
      return Us(this, u).has(u);
    }
    function oo(u, p) {
      return Us(this, u).set(u, p), this;
    }
    ne.prototype.clear = so, ne.prototype.delete = no, ne.prototype.get = io, ne.prototype.has = ro, ne.prototype.set = oo;
    function de(u) {
      this.__data__ = new te(u);
    }
    function ao() {
      this.__data__ = new te();
    }
    function lo(u) {
      return this.__data__.delete(u);
    }
    function co(u) {
      return this.__data__.get(u);
    }
    function uo(u) {
      return this.__data__.has(u);
    }
    function ho(u, p) {
      var E = this.__data__;
      if (E instanceof te) {
        var L = E.__data__;
        if (!It || L.length < s - 1)
          return L.push([u, p]), this;
        E = this.__data__ = new ne(L);
      }
      return E.set(u, p), this;
    }
    de.prototype.clear = ao, de.prototype.delete = lo, de.prototype.get = co, de.prototype.has = uo, de.prototype.set = ho;
    function hn(u, p) {
      var E = ti(u) || pn(u) ? B(u.length, String) : [], L = E.length, vt = !!L;
      for (var ct in u)
        Ct.call(u, ct) && !(vt && (ct == "length" || xo(ct, L))) && E.push(ct);
      return E;
    }
    function qi(u, p, E) {
      var L = u[p];
      (!(Ct.call(u, p) && Hi(L, E)) || E === void 0 && !(p in u)) && (u[p] = E);
    }
    function dn(u, p) {
      for (var E = u.length; E--; )
        if (Hi(u[E][0], p))
          return E;
      return -1;
    }
    function Ke(u, p) {
      return u && Qn(p, si(p), u);
    }
    function Zn(u, p, E, L, vt, ct, Ft) {
      var Tt;
      if (L && (Tt = ct ? L(u, vt, ct, Ft) : L(u)), Tt !== void 0)
        return Tt;
      if (!Ye(u))
        return u;
      var Yt = ti(u);
      if (Yt) {
        if (Tt = To(u), !p)
          return Eo(u, Tt);
      } else {
        var xt = us(u), ie = xt == d || xt == h;
        if (Wi(u))
          return fn(u, p);
        if (xt == _ || xt == r || ie && !ct) {
          if (J(u))
            return ct ? u : {};
          if (Tt = Ge(ie ? {} : u), !p)
            return wo(u, Ke(Tt, u));
        } else {
          if (!U[xt])
            return ct ? u : {};
          Tt = Fo(u, xt, Zn, p);
        }
      }
      Ft || (Ft = new de());
      var fe = Ft.get(u);
      if (fe)
        return fe;
      if (Ft.set(u, Tt), !Yt)
        var Xt = E ? Ao(u) : si(u);
      return gt(Xt || u, function(re, ee) {
        Xt && (ee = re, re = u[ee]), qi(Tt, ee, Zn(re, p, E, L, ee, u, Ft));
      }), Tt;
    }
    function fo(u) {
      return Ye(u) ? zt(u) : {};
    }
    function po(u, p, E) {
      var L = p(u);
      return ti(u) ? L : mt(L, E(u));
    }
    function go(u) {
      return lt.call(u);
    }
    function mo(u) {
      if (!Ye(u) || Oo(u))
        return !1;
      var p = ei(u) || J(u) ? ut : z;
      return p.test(ce(u));
    }
    function bo(u) {
      if (!ji(u))
        return Pt(u);
      var p = [];
      for (var E in Object(u))
        Ct.call(u, E) && E != "constructor" && p.push(E);
      return p;
    }
    function fn(u, p) {
      if (p)
        return u.slice();
      var E = new u.constructor(u.length);
      return u.copy(E), E;
    }
    function Jn(u) {
      var p = new u.constructor(u.byteLength);
      return new Jt(p).set(new Jt(u)), p;
    }
    function js(u, p) {
      var E = p ? Jn(u.buffer) : u.buffer;
      return new u.constructor(E, u.byteOffset, u.byteLength);
    }
    function Pi(u, p, E) {
      var L = p ? E(Rt(u), !0) : Rt(u);
      return M(L, yt, new u.constructor());
    }
    function Vi(u) {
      var p = new u.constructor(u.source, S.exec(u));
      return p.lastIndex = u.lastIndex, p;
    }
    function yo(u, p, E) {
      var L = p ? E(Le(u), !0) : Le(u);
      return M(L, st, new u.constructor());
    }
    function vo(u) {
      return Mi ? Object(Mi.call(u)) : {};
    }
    function _o(u, p) {
      var E = p ? Jn(u.buffer) : u.buffer;
      return new u.constructor(E, u.byteOffset, u.length);
    }
    function Eo(u, p) {
      var E = -1, L = u.length;
      for (p || (p = Array(L)); ++E < L; )
        p[E] = u[E];
      return p;
    }
    function Qn(u, p, E, L) {
      E || (E = {});
      for (var vt = -1, ct = p.length; ++vt < ct; ) {
        var Ft = p[vt], Tt = void 0;
        qi(E, Ft, Tt === void 0 ? u[Ft] : Tt);
      }
      return E;
    }
    function wo(u, p) {
      return Qn(u, cs(u), p);
    }
    function Ao(u) {
      return po(u, si, cs);
    }
    function Us(u, p) {
      var E = u.__data__;
      return Co(p) ? E[typeof p == "string" ? "string" : "hash"] : E.map;
    }
    function Ie(u, p) {
      var E = q(u, p);
      return mo(E) ? E : void 0;
    }
    var cs = Mt ? ve(Mt, Object) : So, us = go;
    (Bt && us(new Bt(new ArrayBuffer(1))) != X || It && us(new It()) != g || Ot && us(Ot.resolve()) != F || qt && us(new qt()) != I || Vt && us(new Vt()) != Y) && (us = function(u) {
      var p = lt.call(u), E = p == _ ? u.constructor : void 0, L = E ? ce(E) : void 0;
      if (L)
        switch (L) {
          case jt:
            return X;
          case Dt:
            return g;
          case Ut:
            return F;
          case Ht:
            return I;
          case Yn:
            return Y;
        }
      return p;
    });
    function To(u) {
      var p = u.length, E = u.constructor(p);
      return p && typeof u[0] == "string" && Ct.call(u, "index") && (E.index = u.index, E.input = u.input), E;
    }
    function Ge(u) {
      return typeof u.constructor == "function" && !ji(u) ? fo(St(u)) : {};
    }
    function Fo(u, p, E, L) {
      var vt = u.constructor;
      switch (p) {
        case G:
          return Jn(u);
        case o:
        case l:
          return new vt(+u);
        case X:
          return js(u, L);
        case ft:
        case pt:
        case C:
        case P:
        case y:
        case x:
        case w:
        case N:
        case R:
          return _o(u, L);
        case g:
          return Pi(u, L, E);
        case v:
        case j:
          return new vt(u);
        case O:
          return Vi(u);
        case I:
          return yo(u, L, E);
        case W:
          return vo(u);
      }
    }
    function xo(u, p) {
      return p = p ?? i, !!p && (typeof u == "number" || K.test(u)) && u > -1 && u % 1 == 0 && u < p;
    }
    function Co(u) {
      var p = typeof u;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
    }
    function Oo(u) {
      return !!_e && _e in u;
    }
    function ji(u) {
      var p = u && u.constructor, E = typeof p == "function" && p.prototype || Zt;
      return u === E;
    }
    function ce(u) {
      if (u != null) {
        try {
          return Wt.call(u);
        } catch {
        }
        try {
          return u + "";
        } catch {
        }
      }
      return "";
    }
    function Ui(u) {
      return Zn(u, !0, !0);
    }
    function Hi(u, p) {
      return u === p || u !== u && p !== p;
    }
    function pn(u) {
      return No(u) && Ct.call(u, "callee") && (!Kt.call(u, "callee") || lt.call(u) == r);
    }
    var ti = Array.isArray;
    function gn(u) {
      return u != null && zi(u.length) && !ei(u);
    }
    function No(u) {
      return Ki(u) && gn(u);
    }
    var Wi = Lt || ko;
    function ei(u) {
      var p = Ye(u) ? lt.call(u) : "";
      return p == d || p == h;
    }
    function zi(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
    }
    function Ye(u) {
      var p = typeof u;
      return !!u && (p == "object" || p == "function");
    }
    function Ki(u) {
      return !!u && typeof u == "object";
    }
    function si(u) {
      return gn(u) ? hn(u) : bo(u);
    }
    function So() {
      return [];
    }
    function ko() {
      return !1;
    }
    e.exports = Ui;
  }(ci, ci.exports)), ci.exports;
}
var ui = { exports: {} };
ui.exports;
var Pc;
function Yh() {
  return Pc || (Pc = 1, function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, a = 9007199254740991, o = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", d = "[object Boolean]", h = "[object Date]", g = "[object Error]", v = "[object Function]", _ = "[object GeneratorFunction]", F = "[object Map]", O = "[object Number]", I = "[object Null]", j = "[object Object]", W = "[object Promise]", Y = "[object Proxy]", G = "[object RegExp]", X = "[object Set]", ft = "[object String]", pt = "[object Symbol]", C = "[object Undefined]", P = "[object WeakMap]", y = "[object ArrayBuffer]", x = "[object DataView]", w = "[object Float32Array]", N = "[object Float64Array]", R = "[object Int8Array]", A = "[object Int16Array]", S = "[object Int32Array]", z = "[object Uint8Array]", K = "[object Uint8ClampedArray]", U = "[object Uint16Array]", nt = "[object Uint32Array]", tt = /[\\^$.*+?()[\]{}|]/g, ot = /^\[object .+?Constructor\]$/, it = /^(?:0|[1-9]\d*)$/, H = {};
    H[w] = H[N] = H[R] = H[A] = H[S] = H[z] = H[K] = H[U] = H[nt] = !0, H[o] = H[l] = H[y] = H[d] = H[x] = H[h] = H[g] = H[v] = H[F] = H[O] = H[j] = H[G] = H[X] = H[ft] = H[P] = !1;
    var Z = typeof ms == "object" && ms && ms.Object === Object && ms, yt = typeof self == "object" && self && self.Object === Object && self, st = Z || yt || Function("return this")(), gt = t && !t.nodeType && t, mt = gt && !0 && e && !e.nodeType && e, M = mt && mt.exports === gt, B = M && Z.process, q = function() {
      try {
        return B && B.binding && B.binding("util");
      } catch {
      }
    }(), J = q && q.isTypedArray;
    function Rt(u, p) {
      for (var E = -1, L = u == null ? 0 : u.length, vt = 0, ct = []; ++E < L; ) {
        var Ft = u[E];
        p(Ft, E, u) && (ct[vt++] = Ft);
      }
      return ct;
    }
    function ve(u, p) {
      for (var E = -1, L = p.length, vt = u.length; ++E < L; )
        u[vt + E] = p[E];
      return u;
    }
    function Le(u, p) {
      for (var E = -1, L = u == null ? 0 : u.length; ++E < L; )
        if (p(u[E], E, u))
          return !0;
      return !1;
    }
    function os(u, p) {
      for (var E = -1, L = Array(u); ++E < u; )
        L[E] = p(E);
      return L;
    }
    function as(u) {
      return function(p) {
        return u(p);
      };
    }
    function Zt(u, p) {
      return u.has(p);
    }
    function le(u, p) {
      return u == null ? void 0 : u[p];
    }
    function _e(u) {
      var p = -1, E = Array(u.size);
      return u.forEach(function(L, vt) {
        E[++p] = [vt, L];
      }), E;
    }
    function Wt(u, p) {
      return function(E) {
        return u(p(E));
      };
    }
    function Ct(u) {
      var p = -1, E = Array(u.size);
      return u.forEach(function(L) {
        E[++p] = L;
      }), E;
    }
    var lt = Array.prototype, ut = Function.prototype, Et = Object.prototype, wt = st["__core-js_shared__"], Jt = ut.toString, St = Et.hasOwnProperty, zt = function() {
      var u = /[^.]+$/.exec(wt && wt.keys && wt.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    }(), Kt = Et.toString, Gt = RegExp(
      "^" + Jt.call(St).replace(tt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Mt = M ? st.Buffer : void 0, Lt = st.Symbol, Pt = st.Uint8Array, Bt = Et.propertyIsEnumerable, It = lt.splice, Ot = Lt ? Lt.toStringTag : void 0, qt = Object.getOwnPropertySymbols, Vt = Mt ? Mt.isBuffer : void 0, $t = Wt(Object.keys, Object), jt = cs(st, "DataView"), Dt = cs(st, "Map"), Ut = cs(st, "Promise"), Ht = cs(st, "Set"), Yn = cs(st, "WeakMap"), xs = cs(Object, "create"), Mi = ce(jt), ls = ce(Dt), Gr = ce(Ut), Yr = ce(Ht), Xr = ce(Yn), Bi = Lt ? Lt.prototype : void 0, Xn = Bi ? Bi.valueOf : void 0;
    function te(u) {
      var p = -1, E = u == null ? 0 : u.length;
      for (this.clear(); ++p < E; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Zr() {
      this.__data__ = xs ? xs(null) : {}, this.size = 0;
    }
    function Jr(u) {
      var p = this.has(u) && delete this.__data__[u];
      return this.size -= p ? 1 : 0, p;
    }
    function Qr(u) {
      var p = this.__data__;
      if (xs) {
        var E = p[u];
        return E === n ? void 0 : E;
      }
      return St.call(p, u) ? p[u] : void 0;
    }
    function to(u) {
      var p = this.__data__;
      return xs ? p[u] !== void 0 : St.call(p, u);
    }
    function eo(u, p) {
      var E = this.__data__;
      return this.size += this.has(u) ? 0 : 1, E[u] = xs && p === void 0 ? n : p, this;
    }
    te.prototype.clear = Zr, te.prototype.delete = Jr, te.prototype.get = Qr, te.prototype.has = to, te.prototype.set = eo;
    function ne(u) {
      var p = -1, E = u == null ? 0 : u.length;
      for (this.clear(); ++p < E; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function so() {
      this.__data__ = [], this.size = 0;
    }
    function no(u) {
      var p = this.__data__, E = fn(p, u);
      if (E < 0)
        return !1;
      var L = p.length - 1;
      return E == L ? p.pop() : It.call(p, E, 1), --this.size, !0;
    }
    function io(u) {
      var p = this.__data__, E = fn(p, u);
      return E < 0 ? void 0 : p[E][1];
    }
    function ro(u) {
      return fn(this.__data__, u) > -1;
    }
    function oo(u, p) {
      var E = this.__data__, L = fn(E, u);
      return L < 0 ? (++this.size, E.push([u, p])) : E[L][1] = p, this;
    }
    ne.prototype.clear = so, ne.prototype.delete = no, ne.prototype.get = io, ne.prototype.has = ro, ne.prototype.set = oo;
    function de(u) {
      var p = -1, E = u == null ? 0 : u.length;
      for (this.clear(); ++p < E; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function ao() {
      this.size = 0, this.__data__ = {
        hash: new te(),
        map: new (Dt || ne)(),
        string: new te()
      };
    }
    function lo(u) {
      var p = Ie(this, u).delete(u);
      return this.size -= p ? 1 : 0, p;
    }
    function co(u) {
      return Ie(this, u).get(u);
    }
    function uo(u) {
      return Ie(this, u).has(u);
    }
    function ho(u, p) {
      var E = Ie(this, u), L = E.size;
      return E.set(u, p), this.size += E.size == L ? 0 : 1, this;
    }
    de.prototype.clear = ao, de.prototype.delete = lo, de.prototype.get = co, de.prototype.has = uo, de.prototype.set = ho;
    function hn(u) {
      var p = -1, E = u == null ? 0 : u.length;
      for (this.__data__ = new de(); ++p < E; )
        this.add(u[p]);
    }
    function qi(u) {
      return this.__data__.set(u, n), this;
    }
    function dn(u) {
      return this.__data__.has(u);
    }
    hn.prototype.add = hn.prototype.push = qi, hn.prototype.has = dn;
    function Ke(u) {
      var p = this.__data__ = new ne(u);
      this.size = p.size;
    }
    function Zn() {
      this.__data__ = new ne(), this.size = 0;
    }
    function fo(u) {
      var p = this.__data__, E = p.delete(u);
      return this.size = p.size, E;
    }
    function po(u) {
      return this.__data__.get(u);
    }
    function go(u) {
      return this.__data__.has(u);
    }
    function mo(u, p) {
      var E = this.__data__;
      if (E instanceof ne) {
        var L = E.__data__;
        if (!Dt || L.length < s - 1)
          return L.push([u, p]), this.size = ++E.size, this;
        E = this.__data__ = new de(L);
      }
      return E.set(u, p), this.size = E.size, this;
    }
    Ke.prototype.clear = Zn, Ke.prototype.delete = fo, Ke.prototype.get = po, Ke.prototype.has = go, Ke.prototype.set = mo;
    function bo(u, p) {
      var E = pn(u), L = !E && Hi(u), vt = !E && !L && gn(u), ct = !E && !L && !vt && Ki(u), Ft = E || L || vt || ct, Tt = Ft ? os(u.length, String) : [], Yt = Tt.length;
      for (var xt in u)
        St.call(u, xt) && !(Ft && // Safari 9 has enumerable `arguments.length` in strict mode.
        (xt == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        vt && (xt == "offset" || xt == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        ct && (xt == "buffer" || xt == "byteLength" || xt == "byteOffset") || // Skip index properties.
        Fo(xt, Yt))) && Tt.push(xt);
      return Tt;
    }
    function fn(u, p) {
      for (var E = u.length; E--; )
        if (Ui(u[E][0], p))
          return E;
      return -1;
    }
    function Jn(u, p, E) {
      var L = p(u);
      return pn(u) ? L : ve(L, E(u));
    }
    function js(u) {
      return u == null ? u === void 0 ? C : I : Ot && Ot in Object(u) ? us(u) : ji(u);
    }
    function Pi(u) {
      return Ye(u) && js(u) == o;
    }
    function Vi(u, p, E, L, vt) {
      return u === p ? !0 : u == null || p == null || !Ye(u) && !Ye(p) ? u !== u && p !== p : yo(u, p, E, L, Vi, vt);
    }
    function yo(u, p, E, L, vt, ct) {
      var Ft = pn(u), Tt = pn(p), Yt = Ft ? l : Ge(u), xt = Tt ? l : Ge(p);
      Yt = Yt == o ? j : Yt, xt = xt == o ? j : xt;
      var ie = Yt == j, fe = xt == j, Xt = Yt == xt;
      if (Xt && gn(u)) {
        if (!gn(p))
          return !1;
        Ft = !0, ie = !1;
      }
      if (Xt && !ie)
        return ct || (ct = new Ke()), Ft || Ki(u) ? Qn(u, p, E, L, vt, ct) : wo(u, p, Yt, E, L, vt, ct);
      if (!(E & i)) {
        var re = ie && St.call(u, "__wrapped__"), ee = fe && St.call(p, "__wrapped__");
        if (re || ee) {
          var Cs = re ? u.value() : u, hs = ee ? p.value() : p;
          return ct || (ct = new Ke()), vt(Cs, hs, E, L, ct);
        }
      }
      return Xt ? (ct || (ct = new Ke()), Ao(u, p, E, L, vt, ct)) : !1;
    }
    function vo(u) {
      if (!zi(u) || Co(u))
        return !1;
      var p = Wi(u) ? Gt : ot;
      return p.test(ce(u));
    }
    function _o(u) {
      return Ye(u) && ei(u.length) && !!H[js(u)];
    }
    function Eo(u) {
      if (!Oo(u))
        return $t(u);
      var p = [];
      for (var E in Object(u))
        St.call(u, E) && E != "constructor" && p.push(E);
      return p;
    }
    function Qn(u, p, E, L, vt, ct) {
      var Ft = E & i, Tt = u.length, Yt = p.length;
      if (Tt != Yt && !(Ft && Yt > Tt))
        return !1;
      var xt = ct.get(u);
      if (xt && ct.get(p))
        return xt == p;
      var ie = -1, fe = !0, Xt = E & r ? new hn() : void 0;
      for (ct.set(u, p), ct.set(p, u); ++ie < Tt; ) {
        var re = u[ie], ee = p[ie];
        if (L)
          var Cs = Ft ? L(ee, re, ie, p, u, ct) : L(re, ee, ie, u, p, ct);
        if (Cs !== void 0) {
          if (Cs)
            continue;
          fe = !1;
          break;
        }
        if (Xt) {
          if (!Le(p, function(hs, Hs) {
            if (!Zt(Xt, Hs) && (re === hs || vt(re, hs, E, L, ct)))
              return Xt.push(Hs);
          })) {
            fe = !1;
            break;
          }
        } else if (!(re === ee || vt(re, ee, E, L, ct))) {
          fe = !1;
          break;
        }
      }
      return ct.delete(u), ct.delete(p), fe;
    }
    function wo(u, p, E, L, vt, ct, Ft) {
      switch (E) {
        case x:
          if (u.byteLength != p.byteLength || u.byteOffset != p.byteOffset)
            return !1;
          u = u.buffer, p = p.buffer;
        case y:
          return !(u.byteLength != p.byteLength || !ct(new Pt(u), new Pt(p)));
        case d:
        case h:
        case O:
          return Ui(+u, +p);
        case g:
          return u.name == p.name && u.message == p.message;
        case G:
        case ft:
          return u == p + "";
        case F:
          var Tt = _e;
        case X:
          var Yt = L & i;
          if (Tt || (Tt = Ct), u.size != p.size && !Yt)
            return !1;
          var xt = Ft.get(u);
          if (xt)
            return xt == p;
          L |= r, Ft.set(u, p);
          var ie = Qn(Tt(u), Tt(p), L, vt, ct, Ft);
          return Ft.delete(u), ie;
        case pt:
          if (Xn)
            return Xn.call(u) == Xn.call(p);
      }
      return !1;
    }
    function Ao(u, p, E, L, vt, ct) {
      var Ft = E & i, Tt = Us(u), Yt = Tt.length, xt = Us(p), ie = xt.length;
      if (Yt != ie && !Ft)
        return !1;
      for (var fe = Yt; fe--; ) {
        var Xt = Tt[fe];
        if (!(Ft ? Xt in p : St.call(p, Xt)))
          return !1;
      }
      var re = ct.get(u);
      if (re && ct.get(p))
        return re == p;
      var ee = !0;
      ct.set(u, p), ct.set(p, u);
      for (var Cs = Ft; ++fe < Yt; ) {
        Xt = Tt[fe];
        var hs = u[Xt], Hs = p[Xt];
        if (L)
          var Ol = Ft ? L(Hs, hs, Xt, p, u, ct) : L(hs, Hs, Xt, u, p, ct);
        if (!(Ol === void 0 ? hs === Hs || vt(hs, Hs, E, L, ct) : Ol)) {
          ee = !1;
          break;
        }
        Cs || (Cs = Xt == "constructor");
      }
      if (ee && !Cs) {
        var Gi = u.constructor, Yi = p.constructor;
        Gi != Yi && "constructor" in u && "constructor" in p && !(typeof Gi == "function" && Gi instanceof Gi && typeof Yi == "function" && Yi instanceof Yi) && (ee = !1);
      }
      return ct.delete(u), ct.delete(p), ee;
    }
    function Us(u) {
      return Jn(u, si, To);
    }
    function Ie(u, p) {
      var E = u.__data__;
      return xo(p) ? E[typeof p == "string" ? "string" : "hash"] : E.map;
    }
    function cs(u, p) {
      var E = le(u, p);
      return vo(E) ? E : void 0;
    }
    function us(u) {
      var p = St.call(u, Ot), E = u[Ot];
      try {
        u[Ot] = void 0;
        var L = !0;
      } catch {
      }
      var vt = Kt.call(u);
      return L && (p ? u[Ot] = E : delete u[Ot]), vt;
    }
    var To = qt ? function(u) {
      return u == null ? [] : (u = Object(u), Rt(qt(u), function(p) {
        return Bt.call(u, p);
      }));
    } : So, Ge = js;
    (jt && Ge(new jt(new ArrayBuffer(1))) != x || Dt && Ge(new Dt()) != F || Ut && Ge(Ut.resolve()) != W || Ht && Ge(new Ht()) != X || Yn && Ge(new Yn()) != P) && (Ge = function(u) {
      var p = js(u), E = p == j ? u.constructor : void 0, L = E ? ce(E) : "";
      if (L)
        switch (L) {
          case Mi:
            return x;
          case ls:
            return F;
          case Gr:
            return W;
          case Yr:
            return X;
          case Xr:
            return P;
        }
      return p;
    });
    function Fo(u, p) {
      return p = p ?? a, !!p && (typeof u == "number" || it.test(u)) && u > -1 && u % 1 == 0 && u < p;
    }
    function xo(u) {
      var p = typeof u;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
    }
    function Co(u) {
      return !!zt && zt in u;
    }
    function Oo(u) {
      var p = u && u.constructor, E = typeof p == "function" && p.prototype || Et;
      return u === E;
    }
    function ji(u) {
      return Kt.call(u);
    }
    function ce(u) {
      if (u != null) {
        try {
          return Jt.call(u);
        } catch {
        }
        try {
          return u + "";
        } catch {
        }
      }
      return "";
    }
    function Ui(u, p) {
      return u === p || u !== u && p !== p;
    }
    var Hi = Pi(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Pi : function(u) {
      return Ye(u) && St.call(u, "callee") && !Bt.call(u, "callee");
    }, pn = Array.isArray;
    function ti(u) {
      return u != null && ei(u.length) && !Wi(u);
    }
    var gn = Vt || ko;
    function No(u, p) {
      return Vi(u, p);
    }
    function Wi(u) {
      if (!zi(u))
        return !1;
      var p = js(u);
      return p == v || p == _ || p == c || p == Y;
    }
    function ei(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= a;
    }
    function zi(u) {
      var p = typeof u;
      return u != null && (p == "object" || p == "function");
    }
    function Ye(u) {
      return u != null && typeof u == "object";
    }
    var Ki = J ? as(J) : _o;
    function si(u) {
      return ti(u) ? bo(u) : Eo(u);
    }
    function So() {
      return [];
    }
    function ko() {
      return !1;
    }
    e.exports = No;
  }(ui, ui.exports)), ui.exports;
}
var rr = {}, Vc;
function v_() {
  if (Vc) return rr;
  Vc = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = Gh(), t = Yh();
  var s;
  return function(n) {
    function i(l = {}, c = {}, d = !1) {
      typeof l != "object" && (l = {}), typeof c != "object" && (c = {});
      let h = e(c);
      d || (h = Object.keys(h).reduce((g, v) => (h[v] != null && (g[v] = h[v]), g), {}));
      for (const g in l)
        l[g] !== void 0 && c[g] === void 0 && (h[g] = l[g]);
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.compose = i;
    function r(l = {}, c = {}) {
      typeof l != "object" && (l = {}), typeof c != "object" && (c = {});
      const d = Object.keys(l).concat(Object.keys(c)).reduce((h, g) => (t(l[g], c[g]) || (h[g] = c[g] === void 0 ? null : c[g]), h), {});
      return Object.keys(d).length > 0 ? d : void 0;
    }
    n.diff = r;
    function a(l = {}, c = {}) {
      l = l || {};
      const d = Object.keys(c).reduce((h, g) => (c[g] !== l[g] && l[g] !== void 0 && (h[g] = c[g]), h), {});
      return Object.keys(l).reduce((h, g) => (l[g] !== c[g] && c[g] === void 0 && (h[g] = null), h), d);
    }
    n.invert = a;
    function o(l, c, d = !1) {
      if (typeof l != "object")
        return c;
      if (typeof c != "object")
        return;
      if (!d)
        return c;
      const h = Object.keys(c).reduce((g, v) => (l[v] === void 0 && (g[v] = c[v]), g), {});
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.transform = o;
  }(s || (s = {})), rr.default = s, rr;
}
var or = {}, jc;
function Xh() {
  if (jc) return or;
  jc = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  var e;
  return function(t) {
    function s(n) {
      return typeof n.delete == "number" ? n.delete : typeof n.retain == "number" ? n.retain : typeof n.retain == "object" && n.retain !== null ? 1 : typeof n.insert == "string" ? n.insert.length : 1;
    }
    t.length = s;
  }(e || (e = {})), or.default = e, or;
}
var ar = {}, Uc;
function __() {
  if (Uc) return ar;
  Uc = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = Xh();
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
        const r = this.offset, a = e.default.length(i);
        if (n >= a - r ? (n = a - r, this.index += 1, this.offset = 0) : this.offset += n, typeof i.delete == "number")
          return { delete: n };
        {
          const o = {};
          return i.attributes && (o.attributes = i.attributes), typeof i.retain == "number" ? o.retain = n : typeof i.retain == "object" && i.retain !== null ? o.retain = i.retain : typeof i.insert == "string" ? o.insert = i.insert.substr(r, n) : o.insert = i.insert, o;
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
          const n = this.offset, i = this.index, r = this.next(), a = this.ops.slice(this.index);
          return this.offset = n, this.index = i, [r].concat(a);
        }
      } else return [];
    }
  }
  return ar.default = t, ar;
}
var Hc;
function E_() {
  return Hc || (Hc = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
    const s = y_(), n = Gh(), i = Yh(), r = v_();
    t.AttributeMap = r.default;
    const a = Xh();
    t.Op = a.default;
    const o = __();
    t.OpIterator = o.default;
    const l = "\0", c = (h, g) => {
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      if (typeof g != "object" || g === null)
        throw new Error(`cannot retain a ${typeof g}`);
      const v = Object.keys(h)[0];
      if (!v || v !== Object.keys(g)[0])
        throw new Error(`embed types not matched: ${v} != ${Object.keys(g)[0]}`);
      return [v, h[v], g[v]];
    };
    class d {
      constructor(g) {
        Array.isArray(g) ? this.ops = g : g != null && Array.isArray(g.ops) ? this.ops = g.ops : this.ops = [];
      }
      static registerEmbed(g, v) {
        this.handlers[g] = v;
      }
      static unregisterEmbed(g) {
        delete this.handlers[g];
      }
      static getHandler(g) {
        const v = this.handlers[g];
        if (!v)
          throw new Error(`no handlers for embed type "${g}"`);
        return v;
      }
      insert(g, v) {
        const _ = {};
        return typeof g == "string" && g.length === 0 ? this : (_.insert = g, v != null && typeof v == "object" && Object.keys(v).length > 0 && (_.attributes = v), this.push(_));
      }
      delete(g) {
        return g <= 0 ? this : this.push({ delete: g });
      }
      retain(g, v) {
        if (typeof g == "number" && g <= 0)
          return this;
        const _ = { retain: g };
        return v != null && typeof v == "object" && Object.keys(v).length > 0 && (_.attributes = v), this.push(_);
      }
      push(g) {
        let v = this.ops.length, _ = this.ops[v - 1];
        if (g = n(g), typeof _ == "object") {
          if (typeof g.delete == "number" && typeof _.delete == "number")
            return this.ops[v - 1] = { delete: _.delete + g.delete }, this;
          if (typeof _.delete == "number" && g.insert != null && (v -= 1, _ = this.ops[v - 1], typeof _ != "object"))
            return this.ops.unshift(g), this;
          if (i(g.attributes, _.attributes)) {
            if (typeof g.insert == "string" && typeof _.insert == "string")
              return this.ops[v - 1] = { insert: _.insert + g.insert }, typeof g.attributes == "object" && (this.ops[v - 1].attributes = g.attributes), this;
            if (typeof g.retain == "number" && typeof _.retain == "number")
              return this.ops[v - 1] = { retain: _.retain + g.retain }, typeof g.attributes == "object" && (this.ops[v - 1].attributes = g.attributes), this;
          }
        }
        return v === this.ops.length ? this.ops.push(g) : this.ops.splice(v, 0, g), this;
      }
      chop() {
        const g = this.ops[this.ops.length - 1];
        return g && typeof g.retain == "number" && !g.attributes && this.ops.pop(), this;
      }
      filter(g) {
        return this.ops.filter(g);
      }
      forEach(g) {
        this.ops.forEach(g);
      }
      map(g) {
        return this.ops.map(g);
      }
      partition(g) {
        const v = [], _ = [];
        return this.forEach((F) => {
          (g(F) ? v : _).push(F);
        }), [v, _];
      }
      reduce(g, v) {
        return this.ops.reduce(g, v);
      }
      changeLength() {
        return this.reduce((g, v) => v.insert ? g + a.default.length(v) : v.delete ? g - v.delete : g, 0);
      }
      length() {
        return this.reduce((g, v) => g + a.default.length(v), 0);
      }
      slice(g = 0, v = 1 / 0) {
        const _ = [], F = new o.default(this.ops);
        let O = 0;
        for (; O < v && F.hasNext(); ) {
          let I;
          O < g ? I = F.next(g - O) : (I = F.next(v - O), _.push(I)), O += a.default.length(I);
        }
        return new d(_);
      }
      compose(g) {
        const v = new o.default(this.ops), _ = new o.default(g.ops), F = [], O = _.peek();
        if (O != null && typeof O.retain == "number" && O.attributes == null) {
          let j = O.retain;
          for (; v.peekType() === "insert" && v.peekLength() <= j; )
            j -= v.peekLength(), F.push(v.next());
          O.retain - j > 0 && _.next(O.retain - j);
        }
        const I = new d(F);
        for (; v.hasNext() || _.hasNext(); )
          if (_.peekType() === "insert")
            I.push(_.next());
          else if (v.peekType() === "delete")
            I.push(v.next());
          else {
            const j = Math.min(v.peekLength(), _.peekLength()), W = v.next(j), Y = _.next(j);
            if (Y.retain) {
              const G = {};
              if (typeof W.retain == "number")
                G.retain = typeof Y.retain == "number" ? j : Y.retain;
              else if (typeof Y.retain == "number")
                W.retain == null ? G.insert = W.insert : G.retain = W.retain;
              else {
                const ft = W.retain == null ? "insert" : "retain", [pt, C, P] = c(W[ft], Y.retain), y = d.getHandler(pt);
                G[ft] = {
                  [pt]: y.compose(C, P, ft === "retain")
                };
              }
              const X = r.default.compose(W.attributes, Y.attributes, typeof W.retain == "number");
              if (X && (G.attributes = X), I.push(G), !_.hasNext() && i(I.ops[I.ops.length - 1], G)) {
                const ft = new d(v.rest());
                return I.concat(ft).chop();
              }
            } else typeof Y.delete == "number" && (typeof W.retain == "number" || typeof W.retain == "object" && W.retain !== null) && I.push(Y);
          }
        return I.chop();
      }
      concat(g) {
        const v = new d(this.ops.slice());
        return g.ops.length > 0 && (v.push(g.ops[0]), v.ops = v.ops.concat(g.ops.slice(1))), v;
      }
      diff(g, v) {
        if (this.ops === g.ops)
          return new d();
        const _ = [this, g].map((W) => W.map((Y) => {
          if (Y.insert != null)
            return typeof Y.insert == "string" ? Y.insert : l;
          const G = W === g ? "on" : "with";
          throw new Error("diff() called " + G + " non-document");
        }).join("")), F = new d(), O = s(_[0], _[1], v, !0), I = new o.default(this.ops), j = new o.default(g.ops);
        return O.forEach((W) => {
          let Y = W[1].length;
          for (; Y > 0; ) {
            let G = 0;
            switch (W[0]) {
              case s.INSERT:
                G = Math.min(j.peekLength(), Y), F.push(j.next(G));
                break;
              case s.DELETE:
                G = Math.min(Y, I.peekLength()), I.next(G), F.delete(G);
                break;
              case s.EQUAL:
                G = Math.min(I.peekLength(), j.peekLength(), Y);
                const X = I.next(G), ft = j.next(G);
                i(X.insert, ft.insert) ? F.retain(G, r.default.diff(X.attributes, ft.attributes)) : F.push(ft).delete(G);
                break;
            }
            Y -= G;
          }
        }), F.chop();
      }
      eachLine(g, v = `
`) {
        const _ = new o.default(this.ops);
        let F = new d(), O = 0;
        for (; _.hasNext(); ) {
          if (_.peekType() !== "insert")
            return;
          const I = _.peek(), j = a.default.length(I) - _.peekLength(), W = typeof I.insert == "string" ? I.insert.indexOf(v, j) - j : -1;
          if (W < 0)
            F.push(_.next());
          else if (W > 0)
            F.push(_.next(W));
          else {
            if (g(F, _.next(1).attributes || {}, O) === !1)
              return;
            O += 1, F = new d();
          }
        }
        F.length() > 0 && g(F, {}, O);
      }
      invert(g) {
        const v = new d();
        return this.reduce((_, F) => {
          if (F.insert)
            v.delete(a.default.length(F));
          else {
            if (typeof F.retain == "number" && F.attributes == null)
              return v.retain(F.retain), _ + F.retain;
            if (F.delete || typeof F.retain == "number") {
              const O = F.delete || F.retain;
              return g.slice(_, _ + O).forEach((j) => {
                F.delete ? v.push(j) : F.retain && F.attributes && v.retain(a.default.length(j), r.default.invert(F.attributes, j.attributes));
              }), _ + O;
            } else if (typeof F.retain == "object" && F.retain !== null) {
              const O = g.slice(_, _ + 1), I = new o.default(O.ops).next(), [j, W, Y] = c(F.retain, I.insert), G = d.getHandler(j);
              return v.retain({ [j]: G.invert(W, Y) }, r.default.invert(F.attributes, I.attributes)), _ + 1;
            }
          }
          return _;
        }, 0), v.chop();
      }
      transform(g, v = !1) {
        if (v = !!v, typeof g == "number")
          return this.transformPosition(g, v);
        const _ = g, F = new o.default(this.ops), O = new o.default(_.ops), I = new d();
        for (; F.hasNext() || O.hasNext(); )
          if (F.peekType() === "insert" && (v || O.peekType() !== "insert"))
            I.retain(a.default.length(F.next()));
          else if (O.peekType() === "insert")
            I.push(O.next());
          else {
            const j = Math.min(F.peekLength(), O.peekLength()), W = F.next(j), Y = O.next(j);
            if (W.delete)
              continue;
            if (Y.delete)
              I.push(Y);
            else {
              const G = W.retain, X = Y.retain;
              let ft = typeof X == "object" && X !== null ? X : j;
              if (typeof G == "object" && G !== null && typeof X == "object" && X !== null) {
                const pt = Object.keys(G)[0];
                if (pt === Object.keys(X)[0]) {
                  const C = d.getHandler(pt);
                  C && (ft = {
                    [pt]: C.transform(G[pt], X[pt], v)
                  });
                }
              }
              I.retain(ft, r.default.transform(W.attributes, Y.attributes, v));
            }
          }
        return I.chop();
      }
      transformPosition(g, v = !1) {
        v = !!v;
        const _ = new o.default(this.ops);
        let F = 0;
        for (; _.hasNext() && F <= g; ) {
          const O = _.peekLength(), I = _.peekType();
          if (_.next(), I === "delete") {
            g -= Math.min(O, g - F);
            continue;
          } else I === "insert" && (F < g || !v) && (g += O);
          F += O;
        }
        return g;
      }
    }
    d.Op = a.default, d.OpIterator = o.default, d.AttributeMap = r.default, d.handlers = {}, t.default = d, e.exports = d, e.exports.default = d;
  }(ir, ir.exports)), ir.exports;
}
var xe = E_();
const rt = /* @__PURE__ */ Kh(xe);
class We extends ye {
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
We.blotName = "break";
We.tagName = "BR";
let je = class extends Nr {
};
const w_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Wr(e) {
  return e.replace(/[&<>"']/g, (t) => w_[t]);
}
const Ze = class Ze extends ml {
  static compare(t, s) {
    const n = Ze.order.indexOf(t), i = Ze.order.indexOf(s);
    return n >= 0 || i >= 0 ? n - i : t === s ? 0 : t < s ? -1 : 1;
  }
  formatAt(t, s, n, i) {
    if (Ze.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, at.BLOT)) {
      const r = this.isolate(t, s);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, s, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof Ze && Ze.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const s = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(s), s.wrap(this);
    }
  }
};
Q(Ze, "allowedChildren", [Ze, We, ye, je]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Q(Ze, "order", [
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
let is = Ze;
const Wc = 1;
class se extends Ai {
  constructor() {
    super(...arguments);
    Q(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = Zh(this)), this.cache.delta;
  }
  deleteAt(s, n) {
    super.deleteAt(s, n), this.cache = {};
  }
  formatAt(s, n, i, r) {
    n <= 0 || (this.scroll.query(i, at.BLOCK) ? s + n === this.length() && this.format(i, r) : super.formatAt(s, Math.min(n, this.length() - s - 1), i, r), this.cache = {});
  }
  insertAt(s, n, i) {
    if (i != null) {
      super.insertAt(s, n, i), this.cache = {};
      return;
    }
    if (n.length === 0) return;
    const r = n.split(`
`), a = r.shift();
    a.length > 0 && (s < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(s, this.length() - 1), a) : this.children.tail.insertAt(this.children.tail.length(), a), this.cache = {});
    let o = this;
    r.reduce((l, c) => (o = o.split(l, !0), o.insertAt(0, c), c.length), s + a.length);
  }
  insertBefore(s, n) {
    const {
      head: i
    } = this.children;
    super.insertBefore(s, n), i instanceof We && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Wc), this.cache.length;
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
    if (n && (s === 0 || s >= this.length() - Wc)) {
      const r = this.clone();
      return s === 0 ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r);
    }
    const i = super.split(s, n);
    return this.cache = {}, i;
  }
}
se.blotName = "block";
se.tagName = "P";
se.defaultChild = We;
se.allowedChildren = [We, is, ye, je];
class Fe extends ye {
  attach() {
    super.attach(), this.attributes = new Ur(this.domNode);
  }
  delta() {
    return new rt().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, s) {
    const n = this.scroll.query(t, at.BLOCK_ATTRIBUTE);
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
`), r = i.pop(), a = i.map((l) => {
      const c = this.scroll.create(se.blotName);
      return c.insertAt(0, l), c;
    }), o = this.split(t);
    a.forEach((l) => {
      this.parent.insertBefore(l, o);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), o);
  }
}
Fe.scope = at.BLOCK_BLOT;
function Zh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.descendants(oe).reduce((s, n) => n.length() === 0 ? s : s.insert(n.value(), Ae(n, {}, t)), new rt()).insert(`
`, Ae(e));
}
function Ae(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return e == null || ("formats" in e && typeof e.formats == "function" && (t = {
    ...t,
    ...e.formats()
  }, s && delete t["code-token"]), e.parent == null || e.parent.statics.blotName === "scroll" || e.parent.statics.scope !== e.statics.scope) ? t : Ae(e.parent, t, s);
}
const we = class we extends ye {
  // Zero width no break space
  static value() {
  }
  constructor(t, s, n) {
    super(t, s), this.selection = n, this.textNode = document.createTextNode(we.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    for (; n != null && n.statics.scope !== at.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = we.CONTENTS.length, n.optimize(), n.formatAt(i, we.CONTENTS.length, t, s), this.savedLength = 0);
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
    const s = this.prev instanceof je ? this.prev : null, n = s ? s.length() : 0, i = this.next instanceof je ? this.next : null, r = i ? i.text : "", {
      textNode: a
    } = this, o = a.data.split(we.CONTENTS).join("");
    a.data = we.CONTENTS;
    let l;
    if (s)
      l = s, (o || i) && (s.insertAt(s.length(), o + r), i && i.remove());
    else if (i)
      l = i, i.insertAt(0, o);
    else {
      const c = document.createTextNode(o);
      l = this.scroll.create(c), this.parent.insertBefore(l, this);
    }
    if (this.remove(), t) {
      const c = (g, v) => s && g === s.domNode ? v : g === a ? n + v - 1 : i && g === i.domNode ? n + o.length + v : null, d = c(t.start.node, t.start.offset), h = c(t.end.node, t.end.offset);
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
        this.savedLength = we.CONTENTS.length, s.isolate(this.offset(s), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      s = s.parent;
    }
  }
  value() {
    return "";
  }
};
Q(we, "blotName", "cursor"), Q(we, "className", "ql-cursor"), Q(we, "tagName", "span"), Q(we, "CONTENTS", "\uFEFF");
let Vn = we;
var Jo = { exports: {} }, zc;
function A_() {
  return zc || (zc = 1, function(e) {
    var t = Object.prototype.hasOwnProperty, s = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (s = !1));
    function i(l, c, d) {
      this.fn = l, this.context = c, this.once = d || !1;
    }
    function r(l, c, d, h, g) {
      if (typeof d != "function")
        throw new TypeError("The listener must be a function");
      var v = new i(d, h || l, g), _ = s ? s + c : c;
      return l._events[_] ? l._events[_].fn ? l._events[_] = [l._events[_], v] : l._events[_].push(v) : (l._events[_] = v, l._eventsCount++), l;
    }
    function a(l, c) {
      --l._eventsCount === 0 ? l._events = new n() : delete l._events[c];
    }
    function o() {
      this._events = new n(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var c = [], d, h;
      if (this._eventsCount === 0) return c;
      for (h in d = this._events)
        t.call(d, h) && c.push(s ? h.slice(1) : h);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
    }, o.prototype.listeners = function(c) {
      var d = s ? s + c : c, h = this._events[d];
      if (!h) return [];
      if (h.fn) return [h.fn];
      for (var g = 0, v = h.length, _ = new Array(v); g < v; g++)
        _[g] = h[g].fn;
      return _;
    }, o.prototype.listenerCount = function(c) {
      var d = s ? s + c : c, h = this._events[d];
      return h ? h.fn ? 1 : h.length : 0;
    }, o.prototype.emit = function(c, d, h, g, v, _) {
      var F = s ? s + c : c;
      if (!this._events[F]) return !1;
      var O = this._events[F], I = arguments.length, j, W;
      if (O.fn) {
        switch (O.once && this.removeListener(c, O.fn, void 0, !0), I) {
          case 1:
            return O.fn.call(O.context), !0;
          case 2:
            return O.fn.call(O.context, d), !0;
          case 3:
            return O.fn.call(O.context, d, h), !0;
          case 4:
            return O.fn.call(O.context, d, h, g), !0;
          case 5:
            return O.fn.call(O.context, d, h, g, v), !0;
          case 6:
            return O.fn.call(O.context, d, h, g, v, _), !0;
        }
        for (W = 1, j = new Array(I - 1); W < I; W++)
          j[W - 1] = arguments[W];
        O.fn.apply(O.context, j);
      } else {
        var Y = O.length, G;
        for (W = 0; W < Y; W++)
          switch (O[W].once && this.removeListener(c, O[W].fn, void 0, !0), I) {
            case 1:
              O[W].fn.call(O[W].context);
              break;
            case 2:
              O[W].fn.call(O[W].context, d);
              break;
            case 3:
              O[W].fn.call(O[W].context, d, h);
              break;
            case 4:
              O[W].fn.call(O[W].context, d, h, g);
              break;
            default:
              if (!j) for (G = 1, j = new Array(I - 1); G < I; G++)
                j[G - 1] = arguments[G];
              O[W].fn.apply(O[W].context, j);
          }
      }
      return !0;
    }, o.prototype.on = function(c, d, h) {
      return r(this, c, d, h, !1);
    }, o.prototype.once = function(c, d, h) {
      return r(this, c, d, h, !0);
    }, o.prototype.removeListener = function(c, d, h, g) {
      var v = s ? s + c : c;
      if (!this._events[v]) return this;
      if (!d)
        return a(this, v), this;
      var _ = this._events[v];
      if (_.fn)
        _.fn === d && (!g || _.once) && (!h || _.context === h) && a(this, v);
      else {
        for (var F = 0, O = [], I = _.length; F < I; F++)
          (_[F].fn !== d || g && !_[F].once || h && _[F].context !== h) && O.push(_[F]);
        O.length ? this._events[v] = O.length === 1 ? O[0] : O : a(this, v);
      }
      return this;
    }, o.prototype.removeAllListeners = function(c) {
      var d;
      return c ? (d = s ? s + c : c, this._events[d] && a(this, d)) : (this._events = new n(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = s, o.EventEmitter = o, e.exports = o;
  }(Jo)), Jo.exports;
}
var T_ = A_();
const F_ = /* @__PURE__ */ Kh(T_), Ca = /* @__PURE__ */ new WeakMap(), Oa = ["error", "warn", "log", "info"];
let Na = "warn";
function Jh(e) {
  if (Na && Oa.indexOf(e) <= Oa.indexOf(Na)) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    console[e](...s);
  }
}
function Fs(e) {
  return Oa.reduce((t, s) => (t[s] = Jh.bind(console, s, e), t), {});
}
Fs.level = (e) => {
  Na = e;
};
Jh.level = Fs.level;
const Qo = Fs("quill:events"), x_ = ["selectionchange", "mousedown", "mouseup", "click"];
x_.forEach((e) => {
  document.addEventListener(e, function() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = Ca.get(i);
      r && r.emitter && r.emitter.handleDOM(...s);
    });
  });
});
class et extends F_ {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Qo.error);
  }
  emit() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    return Qo.log.call(Qo, ...s), super.emit(...s);
  }
  handleDOM(t) {
    for (var s = arguments.length, n = new Array(s > 1 ? s - 1 : 0), i = 1; i < s; i++)
      n[i - 1] = arguments[i];
    (this.domListeners[t.type] || []).forEach((r) => {
      let {
        node: a,
        handler: o
      } = r;
      (t.target === a || a.contains(t.target)) && o(t, ...n);
    });
  }
  listenDOM(t, s, n) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: s,
      handler: n
    });
  }
}
Q(et, "events", {
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
}), Q(et, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const ta = Fs("quill:selection");
class tn {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = s;
  }
}
class C_ {
  constructor(t, s) {
    this.emitter = s, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new tn(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, et.sources.USER), 1);
    }), this.emitter.on(et.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(et.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const a = r.some((o) => o.type === "characterData" || o.type === "childList" || o.type === "attributes" && o.target === this.root);
          this.update(a ? et.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(et.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: a,
          endNode: o,
          endOffset: l
        } = i.range;
        this.setNativeRange(r, a, o, l), this.update(et.sources.SILENT);
      }
    }), this.update(et.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(et.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(et.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(et.sources.USER);
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
    if (!(n == null || !n.native.collapsed || this.scroll.query(t, at.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const i = this.scroll.find(n.start.node, !1);
        if (i == null) return;
        if (i instanceof oe) {
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
    let i, [r, a] = this.scroll.leaf(t);
    if (r == null) return null;
    if (s > 0 && a === r.length()) {
      const [d] = this.scroll.leaf(t + 1);
      if (d) {
        const [h] = this.scroll.line(t), [g] = this.scroll.line(t + 1);
        h === g && (r = d, a = 0);
      }
    }
    [i, a] = r.position(a, !0);
    const o = document.createRange();
    if (s > 0)
      return o.setStart(i, a), [r, a] = this.scroll.leaf(t + s), r == null ? null : ([i, a] = r.position(a, !0), o.setEnd(i, a), o.getBoundingClientRect());
    let l = "left", c;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      a < i.data.length ? (o.setStart(i, a), o.setEnd(i, a + 1)) : (o.setStart(i, a - 1), o.setEnd(i, a), l = "right"), c = o.getBoundingClientRect();
    } else {
      if (!(r.domNode instanceof Element)) return null;
      c = r.domNode.getBoundingClientRect(), a > 0 && (l = "right");
    }
    return {
      bottom: c.top + c.height,
      height: c.height,
      left: c[l],
      right: c[l],
      top: c.top,
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
    const n = s.map((a) => {
      const [o, l] = a, c = this.scroll.find(o, !0), d = c.offset(this.scroll);
      return l === 0 ? d : c instanceof oe ? d + c.index(o, l) : d + c.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new tn(r, i - r);
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
      const [a, o] = this.scroll.leaf(i);
      return a ? a.position(o, r) : [null, -1];
    };
    return [...n(t.index, !1), ...n(t.index + t.length, !0)];
  }
  setNativeRange(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ta.info("setNativeRange", t, s, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
    n.parentNode == null))
      return;
    const a = document.getSelection();
    if (a != null)
      if (t != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: o
        } = this.getNativeRange() || {};
        if (o == null || r || t !== o.startContainer || s !== o.startOffset || n !== o.endContainer || i !== o.endOffset) {
          t instanceof Element && t.tagName === "BR" && (s = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), n instanceof Element && n.tagName === "BR" && (i = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
          const l = document.createRange();
          l.setStart(t, s), l.setEnd(n, i), a.removeAllRanges(), a.addRange(l);
        }
      } else
        a.removeAllRanges(), this.root.blur();
  }
  setRange(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : et.sources.API;
    if (typeof s == "string" && (n = s, s = !1), ta.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, s);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : et.sources.USER;
    const s = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !gl(s, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const r = [et.events.SELECTION_CHANGE, Sn(this.lastRange), Sn(s), t];
      this.emitter.emit(et.events.EDITOR_CHANGE, ...r), t !== et.sources.SILENT && this.emitter.emit(...r);
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
const O_ = /^[ -~]*$/;
class N_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let s = this.scroll.length();
    this.scroll.batchStart();
    const n = Kc(t), i = new rt();
    return k_(n.ops.slice()).reduce((a, o) => {
      const l = xe.Op.length(o);
      let c = o.attributes || {}, d = !1, h = !1;
      if (o.insert != null) {
        if (i.retain(l), typeof o.insert == "string") {
          const _ = o.insert;
          h = !_.endsWith(`
`) && (s <= a || !!this.scroll.descendant(Fe, a)[0]), this.scroll.insertAt(a, _);
          const [F, O] = this.scroll.line(a);
          let I = Ls({}, Ae(F));
          if (F instanceof se) {
            const [j] = F.descendant(oe, O);
            j && (I = Ls(I, Ae(j)));
          }
          c = xe.AttributeMap.diff(I, c) || {};
        } else if (typeof o.insert == "object") {
          const _ = Object.keys(o.insert)[0];
          if (_ == null) return a;
          const F = this.scroll.query(_, at.INLINE) != null;
          if (F)
            (s <= a || this.scroll.descendant(Fe, a)[0]) && (h = !0);
          else if (a > 0) {
            const [O, I] = this.scroll.descendant(oe, a - 1);
            O instanceof je ? O.value()[I] !== `
` && (d = !0) : O instanceof ye && O.statics.scope === at.INLINE_BLOT && (d = !0);
          }
          if (this.scroll.insertAt(a, _, o.insert[_]), F) {
            const [O] = this.scroll.descendant(oe, a);
            if (O) {
              const I = Ls({}, Ae(O));
              c = xe.AttributeMap.diff(I, c) || {};
            }
          }
        }
        s += l;
      } else if (i.push(o), o.retain !== null && typeof o.retain == "object") {
        const _ = Object.keys(o.retain)[0];
        if (_ == null) return a;
        this.scroll.updateEmbedAt(a, _, o.retain[_]);
      }
      Object.keys(c).forEach((_) => {
        this.scroll.formatAt(a, l, _, c[_]);
      });
      const g = d ? 1 : 0, v = h ? 1 : 0;
      return s += g + v, i.retain(g), i.delete(v), a + l + g + v;
    }, 0), i.reduce((a, o) => typeof o.delete == "number" ? (this.scroll.deleteAt(a, o.delete), a) : a + xe.Op.length(o), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(t, s) {
    return this.scroll.deleteAt(t, s), this.update(new rt().retain(t).delete(s));
  }
  formatLine(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(s, 1)).forEach((a) => {
        a.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new rt().retain(t).retain(s, Sn(n));
    return this.update(i);
  }
  formatText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, s, r, n[r]);
    });
    const i = new rt().retain(t).retain(s, Sn(n));
    return this.update(i);
  }
  getContents(t, s) {
    return this.delta.slice(t, t + s);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, s) => t.concat(s.delta()), new rt());
  }
  getFormat(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], i = [];
    s === 0 ? this.scroll.path(t).forEach((o) => {
      const [l] = o;
      l instanceof se ? n.push(l) : l instanceof oe && i.push(l);
    }) : (n = this.scroll.lines(t, s), i = this.scroll.descendants(oe, t, s));
    const [r, a] = [n, i].map((o) => {
      const l = o.shift();
      if (l == null) return {};
      let c = Ae(l);
      for (; Object.keys(c).length > 0; ) {
        const d = o.shift();
        if (d == null) return c;
        c = S_(Ae(d), c);
      }
      return c;
    });
    return {
      ...r,
      ...a
    };
  }
  getHTML(t, s) {
    const [n, i] = this.scroll.line(t);
    if (n) {
      const r = n.length();
      return n.length() >= i + s && !(i === 0 && s === r) ? Ti(n, i, s, !0) : Ti(this.scroll, t, s, !0);
    }
    return "";
  }
  getText(t, s) {
    return this.getContents(t, s).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, s) {
    const n = Kc(s), i = new rt().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, s, n) {
    return this.scroll.insertAt(t, s, n), this.update(new rt().retain(t).insert({
      [s]: n
    }));
  }
  insertText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return s = s.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, s), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, s.length, i, n[i]);
    }), this.update(new rt().retain(t).insert(s, Sn(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if ((t == null ? void 0 : t.statics.blotName) !== se.blotName) return !1;
    const s = t;
    return s.children.length > 1 ? !1 : s.children.head instanceof We;
  }
  removeFormat(t, s) {
    const n = this.getText(t, s), [i, r] = this.scroll.line(t + s);
    let a = 0, o = new rt();
    i != null && (a = i.length() - r, o = i.delta().slice(r, r + a - 1).insert(`
`));
    const c = this.getContents(t, s + a).diff(new rt().insert(n).concat(o)), d = new rt().retain(t).concat(c);
    return this.applyDelta(d);
  }
  update(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (s.length === 1 && s[0].type === "characterData" && // @ts-expect-error Fix me later
    s[0].target.data.match(O_) && this.scroll.find(s[0].target)) {
      const r = this.scroll.find(s[0].target), a = Ae(r), o = r.offset(this.scroll), l = s[0].oldValue.replace(Vn.CONTENTS, ""), c = new rt().insert(l), d = new rt().insert(r.value()), h = n && {
        oldRange: Gc(n.oldRange, -o),
        newRange: Gc(n.newRange, -o)
      };
      t = new rt().retain(o).concat(c.diff(d, h)).reduce((v, _) => _.insert ? v.insert(_.insert, a) : v.push(_), new rt()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !gl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function Fn(e, t, s) {
  if (e.length === 0) {
    const [v] = sa(s.pop());
    return t <= 0 ? `</li></${v}>` : `</li></${v}>${Fn([], t - 1, s)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: a,
    type: o
  }, ...l] = e, [c, d] = sa(o);
  if (a > t)
    return s.push(o), a === t + 1 ? `<${c}><li${d}>${Ti(n, i, r)}${Fn(l, a, s)}` : `<${c}><li>${Fn(e, t + 1, s)}`;
  const h = s[s.length - 1];
  if (a === t && o === h)
    return `</li><li${d}>${Ti(n, i, r)}${Fn(l, a, s)}`;
  const [g] = sa(s.pop());
  return `</li></${g}>${Fn(e, t - 1, s)}`;
}
function Ti(e, t, s) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in e && typeof e.html == "function")
    return e.html(t, s);
  if (e instanceof je)
    return Wr(e.value().slice(t, t + s)).replaceAll(" ", "&nbsp;");
  if (e instanceof Ve) {
    if (e.statics.blotName === "list-container") {
      const c = [];
      return e.children.forEachAt(t, s, (d, h, g) => {
        const v = "formats" in d && typeof d.formats == "function" ? d.formats() : {};
        c.push({
          child: d,
          offset: h,
          length: g,
          indent: v.indent || 0,
          type: v.list
        });
      }), Fn(c, -1, []);
    }
    const i = [];
    if (e.children.forEachAt(t, s, (c, d, h) => {
      i.push(Ti(c, d, h));
    }), n || e.statics.blotName === "list")
      return i.join("");
    const {
      outerHTML: r,
      innerHTML: a
    } = e.domNode, [o, l] = r.split(`>${a}<`);
    return o === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${l}` : `${o}>${i.join("")}<${l}`;
  }
  return e.domNode instanceof Element ? e.domNode.outerHTML : "";
}
function S_(e, t) {
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
function Kc(e) {
  return e.reduce((t, s) => {
    if (typeof s.insert == "string") {
      const n = s.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, s.attributes);
    }
    return t.push(s);
  }, new rt());
}
function Gc(e, t) {
  let {
    index: s,
    length: n
  } = e;
  return new tn(s + t, n);
}
function k_(e) {
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
class ze {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = s;
  }
}
Q(ze, "DEFAULTS", {});
const lr = "\uFEFF";
class yl extends ye {
  constructor(t, s) {
    super(t, s), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(lr), this.rightGuard = document.createTextNode(lr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, s) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, s);
  }
  restore(t) {
    let s = null, n;
    const i = t.data.split(lr).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof je) {
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
    else t === this.rightGuard && (this.next instanceof je ? (this.next.insertAt(0, i), s = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), s = {
      startNode: n,
      startOffset: i.length
    }));
    return t.data = lr, s;
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
class L_ {
  constructor(t, s) {
    Q(this, "isComposing", !1);
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
    s && !(s instanceof yl) && (this.emitter.emit(et.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(et.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(et.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(et.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const bi = class bi {
  constructor(t, s) {
    Q(this, "modules", {});
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
Q(bi, "DEFAULTS", {
  modules: {}
}), Q(bi, "themes", {
  default: bi
});
let jn = bi;
const I_ = (e) => e.parentElement || e.getRootNode().host || null, $_ = (e) => {
  const t = e.getBoundingClientRect(), s = "offsetWidth" in e && Math.abs(t.width) / e.offsetWidth || 1, n = "offsetHeight" in e && Math.abs(t.height) / e.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + e.clientWidth * s,
    bottom: t.top + e.clientHeight * n,
    left: t.left
  };
}, cr = (e) => {
  const t = parseInt(e, 10);
  return Number.isNaN(t) ? 0 : t;
}, Yc = (e, t, s, n, i, r) => e < s && t > n ? 0 : e < s ? -(s - e + i) : t > n ? t - e > n - s ? e + i - s : t - n + r : 0, D_ = (e, t) => {
  var r, a, o;
  const s = e.ownerDocument;
  let n = t, i = e;
  for (; i; ) {
    const l = i === s.body, c = l ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? s.documentElement.clientWidth,
      bottom: ((a = window.visualViewport) == null ? void 0 : a.height) ?? s.documentElement.clientHeight,
      left: 0
    } : $_(i), d = getComputedStyle(i), h = Yc(n.left, n.right, c.left, c.right, cr(d.scrollPaddingLeft), cr(d.scrollPaddingRight)), g = Yc(n.top, n.bottom, c.top, c.bottom, cr(d.scrollPaddingTop), cr(d.scrollPaddingBottom));
    if (h || g)
      if (l)
        (o = s.defaultView) == null || o.scrollBy(h, g);
      else {
        const {
          scrollLeft: v,
          scrollTop: _
        } = i;
        g && (i.scrollTop += g), h && (i.scrollLeft += h);
        const F = i.scrollLeft - v, O = i.scrollTop - _;
        n = {
          left: n.left - F,
          top: n.top - O,
          right: n.right - F,
          bottom: n.bottom - O
        };
      }
    i = l || d.position === "fixed" ? null : I_(i);
  }
}, R_ = 100, M_ = ["block", "break", "cursor", "inline", "scroll", "text"], B_ = (e, t, s) => {
  const n = new Pn();
  return M_.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), e.forEach((i) => {
    let r = t.query(i);
    r || s.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let a = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, a += 1, a > R_) {
        s.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, Ln = Fs("quill"), ur = new Pn();
Ve.uiClass = "ql-ui";
const De = class De {
  static debug(t) {
    t === !0 && (t = "log"), Fs.level(t);
  }
  static find(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ca.get(t) || ur.find(t, s);
  }
  static import(t) {
    return this.imports[t] == null && Ln.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, s) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], s);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && Ln.warn(`Overwriting ${t} with`, s), this.imports[t] = s, (t.startsWith("blots/") || t.startsWith("formats/")) && s && typeof s != "boolean" && s.blotName !== "abstract" && ur.register(s), typeof s.register == "function" && s.register(ur);
    }
  }
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = q_(t, s), this.container = this.options.container, this.container == null) {
      Ln.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && De.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ca.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new et();
    const i = bl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new N_(this.scroll), this.selection = new C_(this.scroll, this.emitter), this.composition = new L_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(et.events.EDITOR_CHANGE, (a) => {
      a === et.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(et.events.SCROLL_UPDATE, (a, o) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      $e.call(this, () => this.editor.update(null, o, d), a);
    }), this.emitter.on(et.events.SCROLL_EMBED_UPDATE, (a, o) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      $e.call(this, () => {
        const h = new rt().retain(a.offset(this)).retain({
          [a.statics.blotName]: o
        });
        return this.editor.update(h, [], d);
      }, De.sources.USER);
    }), n) {
      const a = this.clipboard.convert({
        html: `${n}<p><br></p>`,
        text: `
`
      });
      this.setContents(a);
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
    return [t, s, , n] = ds(t, s, n), $e.call(this, () => this.editor.deleteText(t, s), n, t, -1 * s);
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
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : et.sources.API;
    return $e.call(this, () => {
      const i = this.getSelection(!0);
      let r = new rt();
      if (i == null) return r;
      if (this.scroll.query(t, at.BLOCK))
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
      return this.setSelection(i, et.sources.SILENT), r;
    }, n);
  }
  formatLine(t, s, n, i, r) {
    let a;
    return [t, s, a, r] = ds(
      t,
      s,
      // @ts-expect-error
      n,
      i,
      r
    ), $e.call(this, () => this.editor.formatLine(t, s, a), r, t, 0);
  }
  formatText(t, s, n, i, r) {
    let a;
    return [t, s, a, r] = ds(
      // @ts-expect-error
      t,
      s,
      n,
      i,
      r
    ), $e.call(this, () => this.editor.formatText(t, s, a), r, t, 0);
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
    return [t, s] = ds(t, s), this.editor.getContents(t, s);
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
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = ds(t, s), this.editor.getHTML(t, s);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = ds(t, s), this.editor.getText(t, s);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, s, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : De.sources.API;
    return $e.call(this, () => this.editor.insertEmbed(t, s, n), i, t);
  }
  insertText(t, s, n, i, r) {
    let a;
    return [t, , a, r] = ds(t, 0, n, i, r), $e.call(this, () => this.editor.insertText(t, s, a), r, t, s.length);
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
    return [t, s, , n] = ds(t, s, n), $e.call(this, () => this.editor.removeFormat(t, s), n, t);
  }
  scrollRectIntoView(t) {
    D_(this.root, t);
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
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : et.sources.API;
    return $e.call(this, () => {
      t = new rt(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), a = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(a);
    }, s);
  }
  setSelection(t, s, n) {
    t == null ? this.selection.setRange(null, s || De.sources.API) : ([t, s, , n] = ds(t, s, n), this.selection.setRange(new tn(Math.max(0, t), s), n), n !== et.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : et.sources.API;
    const n = new rt().insert(t);
    return this.setContents(n, s);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : et.sources.USER;
    const s = this.scroll.update(t);
    return this.selection.update(t), s;
  }
  updateContents(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : et.sources.API;
    return $e.call(this, () => (t = new rt(t), this.editor.applyDelta(t)), s, !0);
  }
};
Q(De, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: ur,
  theme: "default"
}), Q(De, "events", et.events), Q(De, "sources", et.sources), Q(De, "version", "2.0.3"), Q(De, "imports", {
  delta: rt,
  parchment: b_,
  "core/module": ze,
  "core/theme": jn
});
let D = De;
function Xc(e) {
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
function Zc(e) {
  return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
}
function q_(e, t) {
  const s = Xc(e);
  if (!s)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === D.DEFAULTS.theme ? jn : D.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...a
  } = D.DEFAULTS, {
    modules: o,
    ...l
  } = i.DEFAULTS;
  let c = na(t.modules);
  c != null && c.toolbar && c.toolbar.constructor !== Object && (c = {
    ...c,
    toolbar: {
      container: c.toolbar
    }
  });
  const d = Ls({}, na(r), na(o), c), h = {
    ...a,
    ...Zc(l),
    ...Zc(t)
  };
  let g = t.registry;
  return g ? t.formats && Ln.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? B_(t.formats, h.registry, Ln) : h.registry, {
    ...h,
    registry: g,
    container: s,
    theme: i,
    modules: Object.entries(d).reduce((v, _) => {
      let [F, O] = _;
      if (!O) return v;
      const I = D.import(`modules/${F}`);
      return I == null ? (Ln.error(`Cannot load ${F} module. Are you sure you registered it?`), v) : {
        ...v,
        // @ts-expect-error
        [F]: Ls({}, I.DEFAULTS || {}, O)
      };
    }, {}),
    bounds: Xc(h.bounds)
  };
}
function $e(e, t, s, n) {
  if (!this.isEnabled() && t === et.sources.USER && !this.allowReadOnlyEdits)
    return new rt();
  let i = s == null ? null : this.getSelection();
  const r = this.editor.delta, a = e();
  if (i != null && (s === !0 && (s = i.index), n == null ? i = Jc(i, a, t) : n !== 0 && (i = Jc(i, s, n, t)), this.setSelection(i, et.sources.SILENT)), a.length() > 0) {
    const o = [et.events.TEXT_CHANGE, a, r, t];
    this.emitter.emit(et.events.EDITOR_CHANGE, ...o), t !== et.sources.SILENT && this.emitter.emit(...o);
  }
  return a;
}
function ds(e, t, s, n, i) {
  let r = {};
  return typeof e.index == "number" && typeof e.length == "number" ? typeof t != "number" ? (i = n, n = s, s = t, t = e.length, e = e.index) : (t = e.length, e = e.index) : typeof t != "number" && (i = n, n = s, s = t, t = 0), typeof s == "object" ? (r = s, i = n) : typeof s == "string" && (n != null ? r[s] = n : i = s), i = i || et.sources.API, [e, t, r, i];
}
function Jc(e, t, s, n) {
  const i = typeof s == "number" ? s : 0;
  if (e == null) return null;
  let r, a;
  return t && typeof t.transformPosition == "function" ? [r, a] = [e.index, e.index + e.length].map((o) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(o, n !== et.sources.USER)
  )) : [r, a] = [e.index, e.index + e.length].map((o) => o < t || o === t && n === et.sources.USER ? o : i >= 0 ? o + i : Math.max(t, o + i)), new tn(r, a - r);
}
class ln extends Hr {
}
function Qc(e) {
  return e instanceof se || e instanceof Fe;
}
function tu(e) {
  return typeof e.updateContent == "function";
}
class xn extends bl {
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
    this.emitter.emit(et.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(et.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, s) {
    this.emitter.emit(et.events.SCROLL_EMBED_UPDATE, t, s);
  }
  deleteAt(t, s) {
    const [n, i] = this.line(t), [r] = this.line(t + s);
    if (super.deleteAt(t, s), r != null && n !== r && i > 0) {
      if (n instanceof Fe || r instanceof Fe) {
        this.optimize();
        return;
      }
      const a = r.children.head instanceof We ? null : r.children.head;
      n.moveChildren(r, a), n.remove();
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
      if (n == null || this.scroll.query(s, at.BLOCK) == null) {
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
    if (t.statics.scope === at.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(t), super.insertBefore(n, s);
    } else
      super.insertBefore(t, s);
  }
  insertContents(t, s) {
    const n = this.deltaToRenderBlocks(s.concat(new rt().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const l = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Fe, t)[0] && t < this.length()), c = r.type === "block" ? r.delta : new rt().insert({
        [r.key]: r.value
      });
      ia(this, t, c);
      const d = r.type === "block" ? 1 : 0, h = t + c.length() + d;
      l && this.insertAt(h - 1, `
`);
      const g = Ae(this.line(t)[0]), v = xe.AttributeMap.diff(g, r.attributes) || {};
      Object.keys(v).forEach((_) => {
        this.formatAt(h - 1, 1, _, v[_]);
      }), t = h;
    }
    let [a, o] = this.children.find(t);
    if (n.length && (a && (a = a.split(o), o = 0), n.forEach((l) => {
      if (l.type === "block") {
        const c = this.createBlock(l.attributes, a || void 0);
        ia(c, 0, l.delta);
      } else {
        const c = this.create(l.key, l.value);
        this.insertBefore(c, a || void 0), Object.keys(l.attributes).forEach((d) => {
          c.format(d, l.attributes[d]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const l = a ? a.offset(a.scroll) + o : this.length();
      ia(this, l, i.delta);
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
    return n instanceof oe ? [n, i] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(Qc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, a) => {
      let o = [], l = a;
      return i.children.forEachAt(r, a, (c, d, h) => {
        Qc(c) ? o.push(c) : c instanceof Hr && (o = o.concat(n(c, d, l))), l -= h;
      }), o;
    };
    return n(this, t, s);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, s), t.length > 0 && this.emitter.emit(et.events.SCROLL_OPTIMIZE, t, s));
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
    let s = et.sources.USER;
    typeof t == "string" && (s = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((n) => {
      let {
        target: i
      } = n;
      const r = this.find(i, !0);
      return r && !tu(r);
    }), t.length > 0 && this.emitter.emit(et.events.SCROLL_BEFORE_UPDATE, s, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(et.events.SCROLL_UPDATE, s, t);
  }
  updateEmbedAt(t, s, n) {
    const [i] = this.descendant((r) => r instanceof Fe, t);
    i && i.statics.blotName === s && tu(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const s = [];
    let n = new rt();
    return t.forEach((i) => {
      const r = i == null ? void 0 : i.insert;
      if (r)
        if (typeof r == "string") {
          const a = r.split(`
`);
          a.slice(0, -1).forEach((l) => {
            n.insert(l, i.attributes), s.push({
              type: "block",
              delta: n,
              attributes: i.attributes ?? {}
            }), n = new rt();
          });
          const o = a[a.length - 1];
          o && n.insert(o, i.attributes);
        } else {
          const a = Object.keys(r)[0];
          if (!a) return;
          this.query(a, at.INLINE) ? n.push(i) : (n.length() && s.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new rt(), s.push({
            type: "blockEmbed",
            key: a,
            value: r[a],
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
    Object.entries(t).forEach((o) => {
      let [l, c] = o;
      this.query(l, at.BLOCK & at.BLOT) != null ? n = l : i[l] = c;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, s || void 0);
    const a = r.length();
    return Object.entries(i).forEach((o) => {
      let [l, c] = o;
      r.formatAt(0, a, l, c);
    }), r;
  }
}
Q(xn, "blotName", "scroll"), Q(xn, "className", "ql-editor"), Q(xn, "tagName", "DIV"), Q(xn, "defaultChild", se), Q(xn, "allowedChildren", [se, Fe, ln]);
function ia(e, t, s) {
  s.reduce((n, i) => {
    const r = xe.Op.length(i);
    let a = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const o = i.insert;
        e.insertAt(n, o);
        const [l] = e.descendant(oe, n), c = Ae(l);
        a = xe.AttributeMap.diff(c, a) || {};
      } else if (typeof i.insert == "object") {
        const o = Object.keys(i.insert)[0];
        if (o == null) return n;
        if (e.insertAt(n, o, i.insert[o]), e.scroll.query(o, at.INLINE) != null) {
          const [c] = e.descendant(oe, n), d = Ae(c);
          a = xe.AttributeMap.diff(d, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((o) => {
      e.formatAt(n, r, o, a[o]);
    }), n + r;
  }, t);
}
const vl = {
  scope: at.BLOCK,
  whitelist: ["right", "center", "justify"]
}, P_ = new ns("align", "align", vl), Qh = new He("align", "ql-align", vl), td = new Vs("align", "text-align", vl);
class ed extends Vs {
  value(t) {
    let s = super.value(t);
    return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${s.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : s;
  }
}
const V_ = new He("color", "ql-color", {
  scope: at.INLINE
}), _l = new ed("color", "color", {
  scope: at.INLINE
}), j_ = new He("background", "ql-bg", {
  scope: at.INLINE
}), El = new ed("background", "background-color", {
  scope: at.INLINE
});
class cn extends ln {
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
class ae extends se {
  static register() {
    D.register(cn);
  }
}
Q(ae, "TAB", "  ");
class wl extends is {
}
wl.blotName = "code";
wl.tagName = "CODE";
ae.blotName = "code-block";
ae.className = "ql-code-block";
ae.tagName = "DIV";
cn.blotName = "code-block-container";
cn.className = "ql-code-block-container";
cn.tagName = "DIV";
cn.allowedChildren = [ae];
ae.allowedChildren = [je, We, Vn];
ae.requiredContainer = cn;
const Al = {
  scope: at.BLOCK,
  whitelist: ["rtl"]
}, sd = new ns("direction", "dir", Al), nd = new He("direction", "ql-direction", Al), id = new Vs("direction", "direction", Al), rd = {
  scope: at.INLINE,
  whitelist: ["serif", "monospace"]
}, od = new He("font", "ql-font", rd);
class U_ extends Vs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const ad = new U_("font", "font-family", rd), ld = new He("size", "ql-size", {
  scope: at.INLINE,
  whitelist: ["small", "large", "huge"]
}), cd = new Vs("size", "font-size", {
  scope: at.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), H_ = Fs("quill:keyboard"), W_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class zr extends ze {
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
    const i = K_(t);
    if (i == null) {
      H_.warn("Attempted to add invalid keyboard binding", i);
      return;
    }
    typeof s == "function" && (s = {
      handler: s
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(i.key) ? i.key : [i.key]).forEach((a) => {
      const o = {
        ...i,
        key: a,
        ...s,
        ...n
      };
      this.bindings[o.key] = this.bindings[o.key] || [], this.bindings[o.key].push(o);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (t) => {
      if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((I) => zr.match(t, I));
      if (i.length === 0) return;
      const r = D.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [o, l] = this.quill.getLine(a.index), [c, d] = this.quill.getLeaf(a.index), [h, g] = a.length === 0 ? [c, d] : this.quill.getLeaf(a.index + a.length), v = c instanceof Nr ? c.value().slice(0, d) : "", _ = h instanceof Nr ? h.value().slice(g) : "", F = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && o.length() <= 1,
        format: this.quill.getFormat(a),
        line: o,
        offset: l,
        prefix: v,
        suffix: _,
        event: t
      };
      i.some((I) => {
        if (I.collapsed != null && I.collapsed !== F.collapsed || I.empty != null && I.empty !== F.empty || I.offset != null && I.offset !== F.offset)
          return !1;
        if (Array.isArray(I.format)) {
          if (I.format.every((j) => F.format[j] == null))
            return !1;
        } else if (typeof I.format == "object" && !Object.keys(I.format).every((j) => I.format[j] === !0 ? F.format[j] != null : I.format[j] === !1 ? F.format[j] == null : gl(I.format[j], F.format[j])))
          return !1;
        return I.prefix != null && !I.prefix.test(F.prefix) || I.suffix != null && !I.suffix.test(F.suffix) ? !1 : I.handler.call(this, a, F, I) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, s) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(s.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let a = new rt().retain(t.index - n).delete(n);
    if (s.offset === 0) {
      const [o] = this.quill.getLine(t.index - 1);
      if (o && !(o.statics.blotName === "block" && o.length() <= 1)) {
        const c = r.formats(), d = this.quill.getFormat(t.index - 1, 1);
        if (i = xe.AttributeMap.diff(c, d) || {}, Object.keys(i).length > 0) {
          const h = new rt().retain(t.index + r.length() - 2).retain(1, i);
          a = a.compose(h);
        }
      }
    }
    this.quill.updateContents(a, D.sources.USER), this.quill.focus();
  }
  handleDelete(t, s) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let a = new rt().retain(t.index).delete(n);
    if (s.offset >= r.length() - 1) {
      const [o] = this.quill.getLine(t.index + 1);
      if (o) {
        const l = r.formats(), c = this.quill.getFormat(t.index, 1);
        i = xe.AttributeMap.diff(l, c) || {}, Object.keys(i).length > 0 && (a = a.retain(o.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(a, D.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Tl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, s) {
    const n = Object.keys(s.format).reduce((r, a) => (this.quill.scroll.query(a, at.BLOCK) && !Array.isArray(s.format[a]) && (r[a] = s.format[a]), r), {}), i = new rt().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(t.index + 1, D.sources.SILENT), this.quill.focus();
  }
}
const z_ = {
  bindings: {
    bold: ra("bold"),
    italic: ra("italic"),
    underline: ra("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", D.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", D.sources.USER), !1);
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
        t.format.indent != null ? this.quill.format("indent", "-1", D.sources.USER) : t.format.list != null && this.quill.format("list", !1, D.sources.USER);
      }
    },
    "indent code-block": eu(!0),
    "outdent code-block": eu(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(e) {
        this.quill.deleteText(e.index - 1, 1, D.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(e, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const s = new rt().retain(e.index).delete(e.length).insert("	");
        return this.quill.updateContents(s, D.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index + 1, D.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, D.sources.USER);
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
        t.format.indent && (s.indent = !1), this.quill.formatLine(e.index, e.length, s, D.sources.USER);
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
        }, i = new rt().retain(e.index).insert(`
`, n).retain(t.length() - s - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(e.index + 1, D.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(e, t) {
        const [s, n] = this.quill.getLine(e.index), i = new rt().retain(e.index).insert(`
`, t.format).retain(s.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(e.index + 1, D.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [s, n, i, r] = t.getTable(e), a = G_(s, n, i, r);
          if (a == null) return;
          let o = s.offset();
          if (a < 0) {
            const l = new rt().retain(o).insert(`
`);
            this.quill.updateContents(l, D.sources.USER), this.quill.setSelection(e.index + 1, e.length, D.sources.SILENT);
          } else if (a > 0) {
            o += s.length();
            const l = new rt().retain(o).insert(`
`);
            this.quill.updateContents(l, D.sources.USER), this.quill.setSelection(o, D.sources.USER);
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
        s.shiftKey ? this.quill.setSelection(i - 1, D.sources.USER) : this.quill.setSelection(i + n.length(), D.sources.USER);
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
        this.quill.insertText(e.index, " ", D.sources.USER), this.quill.history.cutoff();
        const a = new rt().retain(e.index - i).delete(s + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(a, D.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - s, D.sources.SILENT), !1;
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
            const r = new rt().retain(e.index + t.length() - s - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, D.sources.USER), this.quill.setSelection(e.index - 1, D.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": hr("ArrowLeft", !1),
    "embed left shift": hr("ArrowLeft", !0),
    "embed right": hr("ArrowRight", !1),
    "embed right shift": hr("ArrowRight", !0),
    "table down": su(!1),
    "table up": su(!0)
  }
};
zr.DEFAULTS = z_;
function eu(e) {
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
        this.quill.insertText(t.index, r, D.sources.USER), this.quill.setSelection(t.index + r.length, D.sources.SILENT);
        return;
      }
      const a = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: o,
        length: l
      } = t;
      a.forEach((c, d) => {
        e ? (c.insertAt(0, r), d === 0 ? o += r.length : l += r.length) : c.domNode.textContent.startsWith(r) && (c.deleteAt(0, r.length), d === 0 ? o -= r.length : l -= r.length);
      }), this.quill.update(D.sources.USER), this.quill.setSelection(o, l, D.sources.SILENT);
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
      return r instanceof ye ? (e === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, D.sources.USER) : this.quill.setSelection(n.index - 1, D.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, D.sources.USER) : this.quill.setSelection(n.index + n.length + 1, D.sources.USER), !1) : !0;
    }
  };
}
function ra(e) {
  return {
    key: e[0],
    shortKey: !0,
    handler(t, s) {
      this.quill.format(e, !s.format[e], D.sources.USER);
    }
  };
}
function su(e) {
  return {
    key: e ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(t, s) {
      const n = e ? "prev" : "next", i = s.line, r = i.parent[n];
      if (r != null) {
        if (r.statics.blotName === "table-row") {
          let a = r.children.head, o = i;
          for (; o.prev != null; )
            o = o.prev, a = a.next;
          const l = a.offset(this.quill.scroll) + Math.min(s.offset, a.length() - 1);
          this.quill.setSelection(l, 0, D.sources.USER);
        }
      } else {
        const a = i.table()[n];
        a != null && (e ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, D.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, D.sources.USER));
      }
      return !1;
    }
  };
}
function K_(e) {
  if (typeof e == "string" || typeof e == "number")
    e = {
      key: e
    };
  else if (typeof e == "object")
    e = Sn(e);
  else
    return null;
  return e.shortKey && (e[W_] = e.shortKey, delete e.shortKey), e;
}
function Tl(e) {
  let {
    quill: t,
    range: s
  } = e;
  const n = t.getLines(s);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), a = n[n.length - 1].formats();
    i = xe.AttributeMap.diff(a, r) || {};
  }
  t.deleteText(s, D.sources.USER), Object.keys(i).length > 0 && t.formatLine(s.index, 1, i, D.sources.USER), t.setSelection(s.index, D.sources.SILENT);
}
function G_(e, t, s, n) {
  return t.prev == null && t.next == null ? s.prev == null && s.next == null ? n === 0 ? -1 : 1 : s.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const Y_ = /font-weight:\s*normal/, X_ = ["P", "OL", "UL"], nu = (e) => e && X_.includes(e.tagName), Z_ = (e) => {
  Array.from(e.querySelectorAll("br")).filter((t) => nu(t.previousElementSibling) && nu(t.nextElementSibling)).forEach((t) => {
    var s;
    (s = t.parentNode) == null || s.removeChild(t);
  });
}, J_ = (e) => {
  Array.from(e.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var s;
    return (s = t.getAttribute("style")) == null ? void 0 : s.match(Y_);
  }).forEach((t) => {
    var n;
    const s = e.createDocumentFragment();
    s.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(s, t);
  });
};
function Q_(e) {
  e.querySelector('[id^="docs-internal-guid-"]') && (J_(e), Z_(e));
}
const tE = /\bmso-list:[^;]*ignore/i, eE = /\bmso-list:[^;]*\bl(\d+)/i, sE = /\bmso-list:[^;]*\blevel(\d+)/i, nE = (e, t) => {
  const s = e.getAttribute("style"), n = s == null ? void 0 : s.match(eE);
  if (!n)
    return null;
  const i = Number(n[1]), r = s == null ? void 0 : s.match(sE), a = r ? Number(r[1]) : 1, o = new RegExp(`@list l${i}:level${a}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), l = t.match(o), c = l && l[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: a,
    type: c,
    element: e
  };
}, iE = (e) => {
  var a, o;
  const t = Array.from(e.querySelectorAll("[style*=mso-list]")), s = [], n = [];
  t.forEach((l) => {
    (l.getAttribute("style") || "").match(tE) ? s.push(l) : n.push(l);
  }), s.forEach((l) => {
    var c;
    return (c = l.parentNode) == null ? void 0 : c.removeChild(l);
  });
  const i = e.documentElement.innerHTML, r = n.map((l) => nE(l, i)).filter((l) => l);
  for (; r.length; ) {
    const l = [];
    let c = r.shift();
    for (; c; )
      l.push(c), c = r.length && ((a = r[0]) == null ? void 0 : a.element) === c.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === c.id ? r.shift() : null;
    const d = document.createElement("ul");
    l.forEach((v) => {
      const _ = document.createElement("li");
      _.setAttribute("data-list", v.type), v.indent > 1 && _.setAttribute("class", `ql-indent-${v.indent - 1}`), _.innerHTML = v.element.innerHTML, d.appendChild(_);
    });
    const h = (o = l[0]) == null ? void 0 : o.element, {
      parentNode: g
    } = h ?? {};
    h && (g == null || g.replaceChild(d, h)), l.slice(1).forEach((v) => {
      let {
        element: _
      } = v;
      g == null || g.removeChild(_);
    });
  }
};
function rE(e) {
  e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && iE(e);
}
const oE = [rE, Q_], aE = (e) => {
  e.documentElement && oE.forEach((t) => {
    t(e);
  });
}, lE = Fs("quill:clipboard"), cE = [[Node.TEXT_NODE, EE], [Node.TEXT_NODE, ru], ["br", pE], [Node.ELEMENT_NODE, ru], [Node.ELEMENT_NODE, fE], [Node.ELEMENT_NODE, dE], [Node.ELEMENT_NODE, vE], ["li", bE], ["ol, ul", yE], ["pre", gE], ["tr", _E], ["b", oa("bold")], ["i", oa("italic")], ["strike", oa("strike")], ["style", mE]], uE = [P_, sd].reduce((e, t) => (e[t.keyName] = t, e), {}), iu = [td, El, _l, id, ad, cd].reduce((e, t) => (e[t.keyName] = t, e), {});
class ud extends ze {
  constructor(t, s) {
    super(t, s), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], cE.concat(this.options.matchers ?? []).forEach((n) => {
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
    if (i[ae.blotName])
      return new rt().insert(n || "", {
        [ae.blotName]: i[ae.blotName]
      });
    if (!s)
      return new rt().insert(n || "", i);
    const r = this.convertHTML(s);
    return Ii(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new rt().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    aE(t);
  }
  convertHTML(t) {
    const s = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(s);
    const n = s.body, i = /* @__PURE__ */ new WeakMap(), [r, a] = this.prepareMatching(n, i);
    return Fl(this.quill.scroll, n, r, a, i);
  }
  dangerouslyPasteHTML(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : D.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, s), this.quill.setSelection(0, D.sources.SILENT);
    } else {
      const i = this.convert({
        html: s,
        text: ""
      });
      this.quill.updateContents(new rt().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), D.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    var a, o;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: r
    } = this.onCopy(n, s);
    (a = t.clipboardData) == null || a.setData("text/plain", r), (o = t.clipboardData) == null || o.setData("text/html", i), s && Tl({
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
    var a, o, l, c, d;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const s = this.quill.getSelection(!0);
    if (s == null) return;
    const n = (a = t.clipboardData) == null ? void 0 : a.getData("text/html");
    let i = (o = t.clipboardData) == null ? void 0 : o.getData("text/plain");
    if (!n && !i) {
      const h = (l = t.clipboardData) == null ? void 0 : l.getData("text/uri-list");
      h && (i = this.normalizeURIList(h));
    }
    const r = Array.from(((c = t.clipboardData) == null ? void 0 : c.files) || []);
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
    const r = this.quill.getFormat(t.index), a = this.convert({
      text: n,
      html: i
    }, r);
    lE.log("onPaste", a, {
      text: n,
      html: i
    });
    const o = new rt().retain(t.index).delete(t.length).concat(a);
    this.quill.updateContents(o, D.sources.USER), this.quill.setSelection(o.length() - t.length, D.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, s) {
    const n = [], i = [];
    return this.matchers.forEach((r) => {
      const [a, o] = r;
      switch (a) {
        case Node.TEXT_NODE:
          i.push(o);
          break;
        case Node.ELEMENT_NODE:
          n.push(o);
          break;
        default:
          Array.from(t.querySelectorAll(a)).forEach((l) => {
            if (s.has(l)) {
              const c = s.get(l);
              c == null || c.push(o);
            } else
              s.set(l, [o]);
          });
          break;
      }
    }), [n, i];
  }
}
Q(ud, "DEFAULTS", {
  matchers: []
});
function un(e, t, s, n) {
  return n.query(t) ? e.reduce((i, r) => {
    if (!r.insert) return i;
    if (r.attributes && r.attributes[t])
      return i.push(r);
    const a = s ? {
      [t]: s
    } : {};
    return i.insert(r.insert, {
      ...a,
      ...r.attributes
    });
  }, new rt()) : e;
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
function Ss(e, t) {
  if (!(e instanceof Element)) return !1;
  const s = t.query(e);
  return s && s.prototype instanceof ye ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(e.tagName.toLowerCase());
}
function hE(e, t) {
  return e.previousElementSibling && e.nextElementSibling && !Ss(e.previousElementSibling, t) && !Ss(e.nextElementSibling, t);
}
const dr = /* @__PURE__ */ new WeakMap();
function hd(e) {
  return e == null ? !1 : (dr.has(e) || (e.tagName === "PRE" ? dr.set(e, !0) : dr.set(e, hd(e.parentNode))), dr.get(e));
}
function Fl(e, t, s, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, a) => a(t, r, e), new rt()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, a) => {
    let o = Fl(e, a, s, n, i);
    return a.nodeType === t.ELEMENT_NODE && (o = s.reduce((l, c) => c(a, l, e), o), o = (i.get(a) || []).reduce((l, c) => c(a, l, e), o)), r.concat(o);
  }, new rt()) : new rt();
}
function oa(e) {
  return (t, s, n) => un(s, e, !0, n);
}
function dE(e, t, s) {
  const n = ns.keys(e), i = He.keys(e), r = Vs.keys(e), a = {};
  return n.concat(i).concat(r).forEach((o) => {
    let l = s.query(o, at.ATTRIBUTE);
    l != null && (a[l.attrName] = l.value(e), a[l.attrName]) || (l = uE[o], l != null && (l.attrName === o || l.keyName === o) && (a[l.attrName] = l.value(e) || void 0), l = iu[o], l != null && (l.attrName === o || l.keyName === o) && (l = iu[o], a[l.attrName] = l.value(e) || void 0));
  }), Object.entries(a).reduce((o, l) => {
    let [c, d] = l;
    return un(o, c, d, s);
  }, t);
}
function fE(e, t, s) {
  const n = s.query(e);
  if (n == null) return t;
  if (n.prototype instanceof ye) {
    const i = {}, r = n.value(e);
    if (r != null)
      return i[n.blotName] = r, new rt().insert(i, n.formats(e, s));
  } else if (n.prototype instanceof Ai && !Ii(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return un(t, n.blotName, n.formats(e, s), s);
  return t;
}
function pE(e, t) {
  return Ii(t, `
`) || t.insert(`
`), t;
}
function gE(e, t, s) {
  const n = s.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(e, s) : !0;
  return un(t, "code-block", i, s);
}
function mE() {
  return new rt();
}
function bE(e, t, s) {
  const n = s.query(e);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Ii(t, `
`))
    return t;
  let i = -1, r = e.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((a, o) => o.insert ? o.attributes && typeof o.attributes.indent == "number" ? a.push(o) : a.insert(o.insert, {
    indent: i,
    ...o.attributes || {}
  }) : a, new rt());
}
function yE(e, t, s) {
  const n = e;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), un(t, "list", i, s);
}
function ru(e, t, s) {
  if (!Ii(t, `
`)) {
    if (Ss(e, s) && (e.childNodes.length > 0 || e instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && e.nextSibling) {
      let n = e.nextSibling;
      for (; n != null; ) {
        if (Ss(n, s))
          return t.insert(`
`);
        const i = s.query(n);
        if (i && i.prototype instanceof Fe)
          return t.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return t;
}
function vE(e, t, s) {
  var r;
  const n = {}, i = e.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((a, o) => {
    let [l, c] = o;
    return un(a, l, c, s);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new rt().insert("	").concat(t) : t;
}
function _E(e, t, s) {
  var i, r;
  const n = ((i = e.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? e.parentElement : (r = e.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const o = Array.from(n.querySelectorAll("tr")).indexOf(e) + 1;
    return un(t, "table", o, s);
  }
  return t;
}
function EE(e, t, s) {
  var i;
  let n = e.data;
  if (((i = e.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!hd(e)) {
    if (n.trim().length === 0 && n.includes(`
`) && !hE(e, s))
      return t;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (e.previousSibling == null && e.parentElement != null && Ss(e.parentElement, s) || e.previousSibling instanceof Element && Ss(e.previousSibling, s)) && (n = n.replace(/^ /, "")), (e.nextSibling == null && e.parentElement != null && Ss(e.parentElement, s) || e.nextSibling instanceof Element && Ss(e.nextSibling, s)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return t.insert(n);
}
class dd extends ze {
  constructor(s, n) {
    super(s, n);
    Q(this, "lastRecorded", 0);
    Q(this, "ignoreChange", !1);
    Q(this, "stack", {
      undo: [],
      redo: []
    });
    Q(this, "currentRange", null);
    this.quill.on(D.events.EDITOR_CHANGE, (i, r, a, o) => {
      i === D.events.SELECTION_CHANGE ? r && o !== D.sources.SILENT && (this.currentRange = r) : i === D.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === D.sources.USER ? this.record(r, a) : this.transform(r)), this.currentRange = Sa(this.currentRange, r));
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
    const r = this.quill.getContents(), a = i.delta.invert(r);
    this.stack[n].push({
      delta: a,
      range: Sa(i.range, a)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, D.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
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
    const a = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > a && this.stack.undo.length > 0
    ) {
      const o = this.stack.undo.pop();
      o && (i = i.compose(o.delta), r = o.range);
    } else
      this.lastRecorded = a;
    i.length() !== 0 && (this.stack.undo.push({
      delta: i,
      range: r
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(s) {
    ou(this.stack.undo, s), ou(this.stack.redo, s);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(s) {
    if (s.range)
      this.quill.setSelection(s.range, D.sources.USER);
    else {
      const n = AE(this.quill.scroll, s.delta);
      this.quill.setSelection(n, D.sources.USER);
    }
  }
}
Q(dd, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function ou(e, t) {
  let s = t;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const i = e[n];
    e[n] = {
      delta: s.transform(i.delta, !0),
      range: i.range && Sa(i.range, s)
    }, s = i.delta.transform(s), e[n].delta.length() === 0 && e.splice(n, 1);
  }
}
function wE(e, t) {
  const s = t.ops[t.ops.length - 1];
  return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some((n) => e.query(n, at.BLOCK) != null) : !1;
}
function AE(e, t) {
  const s = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - s;
  return wE(e, t) && (n -= 1), n;
}
function Sa(e, t) {
  if (!e) return e;
  const s = t.transformPosition(e.index), n = t.transformPosition(e.index + e.length);
  return {
    index: s,
    length: n - s
  };
}
class fd extends ze {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("drop", (n) => {
      var a;
      n.preventDefault();
      let i = null;
      if (document.caretRangeFromPoint)
        i = document.caretRangeFromPoint(n.clientX, n.clientY);
      else if (document.caretPositionFromPoint) {
        const o = document.caretPositionFromPoint(n.clientX, n.clientY);
        i = document.createRange(), i.setStart(o.offsetNode, o.offset), i.setEnd(o.offsetNode, o.offset);
      }
      const r = i && t.selection.normalizeNative(i);
      if (r) {
        const o = t.selection.normalizedToRange(r);
        (a = n.dataTransfer) != null && a.files && this.upload(o, n.dataTransfer.files);
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
fd.DEFAULTS = {
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
      const i = n.reduce((r, a) => r.insert({
        image: a
      }), new rt().retain(e.index).delete(e.length));
      this.quill.updateContents(i, et.sources.USER), this.quill.setSelection(e.index + n.length, et.sources.SILENT);
    });
  }
};
const TE = ["insertText", "insertReplacementText"];
class FE extends ze {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(D.events.COMPOSITION_BEFORE_START, () => {
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
      this.deleteRange(t), this.quill.updateContents(new rt().retain(t.index).insert(s, n), D.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + s.length, 0, D.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !TE.includes(t.inputType))
      return;
    const s = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!s || s.collapsed === !0)
      return;
    const n = xE(t);
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
function xE(e) {
  var t;
  return typeof e.data == "string" ? e.data : (t = e.dataTransfer) != null && t.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
const CE = /Mac/i.test(navigator.platform), OE = 100, NE = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || CE && e.key === "a" && e.ctrlKey === !0);
class SE extends ze {
  constructor(s, n) {
    super(s, n);
    Q(this, "isListening", !1);
    Q(this, "selectionChangeDeadline", 0);
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
        if (!(i instanceof Ve) || !i.uiNode)
          return !0;
        const a = getComputedStyle(i.domNode).direction === "rtl";
        return a && r.key !== "ArrowRight" || !a && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(s.index - 1, s.length + (r.shiftKey ? 1 : 0), D.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (s) => {
      !s.defaultPrevented && NE(s) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + OE, this.isListening) return;
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
    if (!(i instanceof Ve) || !i.uiNode) return;
    const r = document.createRange();
    r.setStartAfter(i.uiNode), r.setEndAfter(i.uiNode), s.removeAllRanges(), s.addRange(r);
  }
}
D.register({
  "blots/block": se,
  "blots/block/embed": Fe,
  "blots/break": We,
  "blots/container": ln,
  "blots/cursor": Vn,
  "blots/embed": yl,
  "blots/inline": is,
  "blots/scroll": xn,
  "blots/text": je,
  "modules/clipboard": ud,
  "modules/history": dd,
  "modules/keyboard": zr,
  "modules/uploader": fd,
  "modules/input": FE,
  "modules/uiNode": SE
});
class kE extends He {
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
const LE = new kE("indent", "ql-indent", {
  scope: at.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class ka extends se {
}
Q(ka, "blotName", "blockquote"), Q(ka, "tagName", "blockquote");
class La extends se {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
Q(La, "blotName", "header"), Q(La, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class $i extends ln {
}
$i.blotName = "list-container";
$i.tagName = "OL";
class Di extends se {
  static create(t) {
    const s = super.create();
    return s.setAttribute("data-list", t), s;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    D.register($i);
  }
  constructor(t, s) {
    super(t, s);
    const n = s.ownerDocument.createElement("span"), i = (r) => {
      if (!t.isEnabled()) return;
      const a = this.statics.formats(s, t);
      a === "checked" ? (this.format("list", "unchecked"), r.preventDefault()) : a === "unchecked" && (this.format("list", "checked"), r.preventDefault());
    };
    n.addEventListener("mousedown", i), n.addEventListener("touchstart", i), this.attachUI(n);
  }
  format(t, s) {
    t === this.statics.blotName && s ? this.domNode.setAttribute("data-list", s) : super.format(t, s);
  }
}
Di.blotName = "list";
Di.tagName = "LI";
$i.allowedChildren = [Di];
Di.requiredContainer = $i;
class Fi extends is {
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
Q(Fi, "blotName", "bold"), Q(Fi, "tagName", ["STRONG", "B"]);
class Ia extends Fi {
}
Q(Ia, "blotName", "italic"), Q(Ia, "tagName", ["EM", "I"]);
class ks extends is {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("href", this.sanitize(t)), s.setAttribute("rel", "noopener noreferrer"), s.setAttribute("target", "_blank"), s;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return pd(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, s) {
    t !== this.statics.blotName || !s ? super.format(t, s) : this.domNode.setAttribute("href", this.constructor.sanitize(s));
  }
}
Q(ks, "blotName", "link"), Q(ks, "tagName", "A"), Q(ks, "SANITIZED_URL", "about:blank"), Q(ks, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function pd(e, t) {
  const s = document.createElement("a");
  s.href = e;
  const n = s.href.slice(0, s.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class $a extends is {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
Q($a, "blotName", "script"), Q($a, "tagName", ["SUB", "SUP"]);
class Da extends Fi {
}
Q(Da, "blotName", "strike"), Q(Da, "tagName", ["S", "STRIKE"]);
class Ra extends is {
}
Q(Ra, "blotName", "underline"), Q(Ra, "tagName", "U");
class br extends yl {
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
Q(br, "blotName", "formula"), Q(br, "className", "ql-formula"), Q(br, "tagName", "SPAN");
const au = ["alt", "height", "width"];
class Ma extends ye {
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return au.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return pd(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    au.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
}
Q(Ma, "blotName", "image"), Q(Ma, "tagName", "IMG");
const lu = ["height", "width"];
class yr extends Fe {
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return lu.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static sanitize(t) {
    return ks.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    lu.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
Q(yr, "blotName", "video"), Q(yr, "className", "ql-video"), Q(yr, "tagName", "IFRAME");
const hi = new He("code-token", "hljs", {
  scope: at.INLINE
});
class Es extends is {
  static formats(t, s) {
    for (; t != null && t !== s.domNode; ) {
      if (t.classList && t.classList.contains(ae.className))
        return super.formats(t, s);
      t = t.parentNode;
    }
  }
  constructor(t, s, n) {
    super(t, s, n), hi.add(this.domNode, n);
  }
  format(t, s) {
    t !== Es.blotName ? super.format(t, s) : s ? hi.add(this.domNode, s) : (hi.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), hi.value(this.domNode) || this.unwrap();
  }
}
Es.blotName = "code-token";
Es.className = "ql-token";
class Te extends ae {
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
    return this.formatAt(0, this.length(), Es.blotName, !1), super.replaceWith(t, s);
  }
}
class mi extends cn {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, s) {
    t === Te.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, s);
    }));
  }
  formatAt(t, s, n, i) {
    n === Te.blotName && (this.forceNext = !0), super.formatAt(t, s, n, i);
  }
  highlight(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, r = Te.formats(this.children.head.domNode);
    if (s || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((l, c) => l.concat(Zh(c, !1)), new rt()), o = t(i, r);
        a.diff(o).reduce((l, c) => {
          let {
            retain: d,
            attributes: h
          } = c;
          return d ? (h && Object.keys(h).forEach((g) => {
            [Te.blotName, Es.blotName].includes(g) && this.formatAt(l, d, g, h[g]);
          }), l + d) : l;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, s) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Te.formats(n.domNode) : "plain"}">
${Wr(this.code(t, s))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const s = Te.formats(this.children.head.domNode);
      s !== this.uiNode.value && (this.uiNode.value = s);
    }
  }
}
mi.allowedChildren = [Te];
Te.requiredContainer = mi;
Te.allowedChildren = [Es, Vn, je, We];
const IE = (e, t, s) => {
  if (typeof e.versionString == "string") {
    const n = e.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return e.highlight(s, {
        language: t
      }).value;
  }
  return e.highlight(t, s).value;
};
class gd extends ze {
  static register() {
    D.register(Es, !0), D.register(Te, !0), D.register(mi, !0);
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
    this.quill.on(D.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof mi)) return;
      const s = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const a = s.ownerDocument.createElement("option");
        a.textContent = r, a.setAttribute("value", i), s.appendChild(a);
      }), s.addEventListener("change", () => {
        t.format(Te.blotName, s.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(s), t.children.head && (s.value = Te.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(D.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(D.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(mi) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, s);
    }), this.quill.update(D.sources.SILENT), n != null && this.quill.setSelection(n, D.sources.SILENT);
  }
  highlightBlot(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (s = this.languages[s] ? s : "plain", s === "plain")
      return Wr(t).split(`
`).reduce((i, r, a) => (a !== 0 && i.insert(`
`, {
        [ae.blotName]: s
      }), i.insert(r)), new rt());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(ae.className), n.innerHTML = IE(this.options.hljs, s, t), Fl(this.quill.scroll, n, [(i, r) => {
      const a = hi.value(i);
      return a ? r.compose(new rt().retain(r.length(), {
        [Es.blotName]: a
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((a, o, l) => (l !== 0 && a.insert(`
`, {
      [ae.blotName]: s
    }), a.insert(o)), r)], /* @__PURE__ */ new WeakMap());
  }
}
gd.DEFAULTS = {
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
const yi = class yi extends se {
  static create(t) {
    const s = super.create();
    return t ? s.setAttribute("data-row", t) : s.setAttribute("data-row", xl()), s;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, s) {
    t === yi.blotName && s ? this.domNode.setAttribute("data-row", s) : super.format(t, s);
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
Q(yi, "blotName", "table"), Q(yi, "tagName", "TD");
let Be = yi;
class ws extends ln {
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
Q(ws, "blotName", "table-row"), Q(ws, "tagName", "TR");
class es extends ln {
}
Q(es, "blotName", "table-body"), Q(es, "tagName", "TBODY");
class Un extends ln {
  balanceCells() {
    const t = this.descendants(ws), s = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(s - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = Be.formats(n.children.head.domNode));
        const r = this.scroll.create(Be.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((s) => s.children.at(t));
  }
  deleteColumn(t) {
    const [s] = this.descendant(es);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [s] = this.descendant(es);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t), r = Be.formats(n.children.head.domNode), a = this.scroll.create(Be.blotName, r);
      n.insertBefore(a, i);
    });
  }
  insertRow(t) {
    const [s] = this.descendant(es);
    if (s == null || s.children.head == null) return;
    const n = xl(), i = this.scroll.create(ws.blotName);
    s.children.head.children.forEach(() => {
      const a = this.scroll.create(Be.blotName, n);
      i.appendChild(a);
    });
    const r = s.children.at(t);
    s.insertBefore(i, r);
  }
  rows() {
    const t = this.children.head;
    return t == null ? [] : t.children.map((s) => s);
  }
}
Q(Un, "blotName", "table-container"), Q(Un, "tagName", "TABLE");
Un.allowedChildren = [es];
es.requiredContainer = Un;
es.allowedChildren = [ws];
ws.requiredContainer = es;
ws.allowedChildren = [Be];
Be.requiredContainer = ws;
function xl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class $E extends ze {
  static register() {
    D.register(Be), D.register(ws), D.register(es), D.register(Un);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(Un).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , s] = this.getTable();
    s != null && (t.deleteColumn(s.cellOffset()), this.quill.update(D.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(D.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const s = t.offset();
    t.remove(), this.quill.update(D.sources.USER), this.quill.setSelection(s, D.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [s, n] = this.quill.getLine(t.index);
    if (s == null || s.statics.blotName !== Be.blotName)
      return [null, null, null, -1];
    const i = s.parent;
    return [i.parent.parent, i, s, n];
  }
  insertColumn(t) {
    const s = this.quill.getSelection();
    if (!s) return;
    const [n, i, r] = this.getTable(s);
    if (r == null) return;
    const a = r.cellOffset();
    n.insertColumn(a + t), this.quill.update(D.sources.USER);
    let o = i.rowOffset();
    t === 0 && (o += 1), this.quill.setSelection(s.index + o, s.length, D.sources.SILENT);
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
    const a = i.rowOffset();
    n.insertRow(a + t), this.quill.update(D.sources.USER), t > 0 ? this.quill.setSelection(s, D.sources.SILENT) : this.quill.setSelection(s.index + i.children.length, s.length, D.sources.SILENT);
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
      const a = new Array(s).fill(`
`).join("");
      return r.insert(a, {
        table: xl()
      });
    }, new rt().retain(n.index));
    this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(n.index, D.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(D.events.SCROLL_OPTIMIZE, (t) => {
      t.some((s) => ["TD", "TR", "TBODY", "TABLE"].includes(s.target.tagName) ? (this.quill.once(D.events.TEXT_CHANGE, (n, i, r) => {
        r === D.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const cu = Fs("quill:toolbar");
class Cl extends ze {
  constructor(t, s) {
    var n, i;
    if (super(t, s), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), DE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      cu.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var o;
      const a = (o = this.options.handlers) == null ? void 0 : o[r];
      a && this.addHandler(r, a);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(D.events.EDITOR_CHANGE, () => {
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
      cu.warn("ignoring attaching to nonexistent format", s, t);
      return;
    }
    const n = t.tagName === "SELECT" ? "change" : "click";
    t.addEventListener(n, (i) => {
      let r;
      if (t.tagName === "SELECT") {
        if (t.selectedIndex < 0) return;
        const o = t.options[t.selectedIndex];
        o.hasAttribute("selected") ? r = !1 : r = o.value || !1;
      } else
        t.classList.contains("ql-active") ? r = !1 : r = t.value || !t.hasAttribute("value"), i.preventDefault();
      this.quill.focus();
      const [a] = this.quill.selection.getRange();
      if (this.handlers[s] != null)
        this.handlers[s].call(this, r);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(s).prototype instanceof ye
      ) {
        if (r = prompt(`Enter ${s}`), !r) return;
        this.quill.updateContents(new rt().retain(a.index).delete(a.length).insert({
          [s]: r
        }), D.sources.USER);
      } else
        this.quill.format(s, r, D.sources.USER);
      this.update(a);
    }), this.controls.push([s, t]);
  }
  update(t) {
    const s = t == null ? {} : this.quill.getFormat(t);
    this.controls.forEach((n) => {
      const [i, r] = n;
      if (r.tagName === "SELECT") {
        let a = null;
        if (t == null)
          a = null;
        else if (s[i] == null)
          a = r.querySelector("option[selected]");
        else if (!Array.isArray(s[i])) {
          let o = s[i];
          typeof o == "string" && (o = o.replace(/"/g, '\\"')), a = r.querySelector(`option[value="${o}"]`);
        }
        a == null ? (r.value = "", r.selectedIndex = -1) : a.selected = !0;
      } else if (t == null)
        r.classList.remove("ql-active"), r.setAttribute("aria-pressed", "false");
      else if (r.hasAttribute("value")) {
        const a = s[i], o = a === r.getAttribute("value") || a != null && a.toString() === r.getAttribute("value") || a == null && !r.getAttribute("value");
        r.classList.toggle("ql-active", o), r.setAttribute("aria-pressed", o.toString());
      } else {
        const a = s[i] != null;
        r.classList.toggle("ql-active", a), r.setAttribute("aria-pressed", a.toString());
      }
    });
  }
}
Cl.DEFAULTS = {};
function uu(e, t, s) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), s != null ? (n.value = s, n.setAttribute("aria-label", `${t}: ${s}`)) : n.setAttribute("aria-label", t), e.appendChild(n);
}
function DE(e, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((s) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), s.forEach((i) => {
      if (typeof i == "string")
        uu(n, i);
      else {
        const r = Object.keys(i)[0], a = i[r];
        Array.isArray(a) ? RE(n, r, a) : uu(n, r, a);
      }
    }), e.appendChild(n);
  });
}
function RE(e, t, s) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), s.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), e.appendChild(n);
}
Cl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const e = this.quill.getSelection();
      if (e != null)
        if (e.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((s) => {
            this.quill.scroll.query(s, at.INLINE) != null && this.quill.format(s, !1, D.sources.USER);
          });
        } else
          this.quill.removeFormat(e.index, e.length, D.sources.USER);
    },
    direction(e) {
      const {
        align: t
      } = this.quill.getFormat();
      e === "rtl" && t == null ? this.quill.format("align", "right", D.sources.USER) : !e && t === "right" && this.quill.format("align", !1, D.sources.USER), this.quill.format("direction", e, D.sources.USER);
    },
    indent(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t), n = parseInt(s.indent || 0, 10);
      if (e === "+1" || e === "-1") {
        let i = e === "+1" ? 1 : -1;
        s.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, D.sources.USER);
      }
    },
    link(e) {
      e === !0 && (e = prompt("Enter link URL:")), this.quill.format("link", e, D.sources.USER);
    },
    list(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t);
      e === "check" ? s.list === "checked" || s.list === "unchecked" ? this.quill.format("list", !1, D.sources.USER) : this.quill.format("list", "unchecked", D.sources.USER) : this.quill.format("list", e, D.sources.USER);
    }
  }
};
const ME = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', BE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', qE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', PE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', VE = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', jE = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', UE = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', HE = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', hu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', WE = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', zE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', KE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', GE = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', YE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', XE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', ZE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', JE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', QE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', tw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', sw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', iw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', rw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', aw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', cw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', uw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', hw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', dw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', fw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', pw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', xi = {
  align: {
    "": ME,
    center: BE,
    right: qE,
    justify: PE
  },
  background: VE,
  blockquote: jE,
  bold: UE,
  clean: HE,
  code: hu,
  "code-block": hu,
  color: WE,
  direction: {
    "": zE,
    rtl: KE
  },
  formula: GE,
  header: {
    1: YE,
    2: XE,
    3: ZE,
    4: JE,
    5: QE,
    6: tw
  },
  italic: ew,
  image: sw,
  indent: {
    "+1": nw,
    "-1": iw
  },
  link: rw,
  list: {
    bullet: ow,
    check: aw,
    ordered: lw
  },
  script: {
    sub: cw,
    super: uw
  },
  strike: hw,
  table: dw,
  underline: fw,
  video: pw
}, gw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let du = 0;
function fu(e, t) {
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
    this.container.classList.toggle("ql-expanded"), fu(this.label, "aria-expanded"), fu(this.options, "aria-hidden");
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
    return t.classList.add("ql-picker-label"), t.innerHTML = gw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${du}`, du += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((s) => {
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
class md extends Kr {
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
class bd extends Kr {
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
const mw = (e) => {
  const {
    overflowY: t
  } = getComputedStyle(e, null);
  return t !== "visible" && t !== "clip";
};
class yd {
  constructor(t, s) {
    this.quill = t, this.boundsContainer = s || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, mw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
    let a = 0;
    if (r.right > i.right && (a = i.right - r.right, this.root.style.left = `${s + a}px`), r.left < i.left && (a = i.left - r.left, this.root.style.left = `${s + a}px`), r.bottom > i.bottom) {
      const o = r.bottom - r.top, l = t.bottom - t.top + o;
      this.root.style.top = `${n - l}px`, this.root.classList.add("ql-flip");
    }
    return a;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const bw = [!1, "center", "right", "justify"], yw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], vw = [!1, "serif", "monospace"], _w = ["1", "2", "3", !1], Ew = ["small", !1, "large", "huge"];
class Ri extends jn {
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
            const a = n.value || "";
            a != null && s[r][a] && (n.innerHTML = s[r][a]);
          }
      });
    });
  }
  buildPickers(t, s) {
    this.pickers = Array.from(t).map((i) => {
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && li(i, bw), typeof s.align == "object"))
        return new bd(i, s.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && li(i, yw, r === "background" ? "#ffffff" : "#000000"), new md(i, s[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? li(i, vw) : i.classList.contains("ql-header") ? li(i, _w) : i.classList.contains("ql-size") && li(i, Ew)), new Kr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(et.events.EDITOR_CHANGE, n);
  }
}
Ri.DEFAULTS = Ls({}, jn.DEFAULTS, {
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
class vd extends yd {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, et.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, et.sources.USER)), this.quill.root.scrollTop = s;
        break;
      }
      case "video":
        t = ww(t);
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
            et.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", et.sources.USER), this.quill.setSelection(n + 2, et.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function ww(e) {
  let t = e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = e.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : e;
}
function li(e, t) {
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === s ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), e.appendChild(i);
  });
}
const Aw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class _d extends vd {
  constructor(t, s) {
    super(t, s), this.quill.on(et.events.EDITOR_CHANGE, (n, i, r, a) => {
      if (n === et.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && a === et.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const o = this.quill.getLines(i.index, i.length);
          if (o.length === 1) {
            const l = this.quill.getBounds(i);
            l != null && this.position(l);
          } else {
            const l = o[o.length - 1], c = this.quill.getIndex(l), d = Math.min(l.length() - 1, i.index + i.length - c), h = this.quill.getBounds(new tn(c, d));
            h != null && this.position(h);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(et.events.SCROLL_OPTIMIZE, () => {
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
Q(_d, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Ed extends Ri {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = Aw), super(t, s), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new _d(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), xi), this.buildPickers(t.container.querySelectorAll("select"), xi));
  }
}
Ed.DEFAULTS = Ls({}, Ri.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(e) {
          e ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, D.sources.USER);
        }
      }
    }
  }
});
const Tw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class wd extends vd {
  constructor() {
    super(...arguments);
    Q(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (s) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), s.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (s) => {
      if (this.linkRange != null) {
        const n = this.linkRange;
        this.restoreFocus(), this.quill.formatText(n, "link", !1, et.sources.USER), delete this.linkRange;
      }
      s.preventDefault(), this.hide();
    }), this.quill.on(et.events.SELECTION_CHANGE, (s, n, i) => {
      if (s != null) {
        if (s.length === 0 && i === et.sources.USER) {
          const [r, a] = this.quill.scroll.descendant(ks, s.index);
          if (r != null) {
            this.linkRange = new tn(s.index - a, r.length());
            const o = ks.formats(r.domNode);
            this.preview.textContent = o, this.preview.setAttribute("href", o), this.show();
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
Q(wd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Ad extends Ri {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = Tw), super(t, s), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), xi), this.buildPickers(t.container.querySelectorAll("select"), xi), this.tooltip = new wd(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (s, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Ad.DEFAULTS = Ls({}, Ri.DEFAULTS, {
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
            this.quill.format("link", !1, D.sources.USER);
        }
      }
    }
  }
});
D.register({
  "attributors/attribute/direction": sd,
  "attributors/class/align": Qh,
  "attributors/class/background": j_,
  "attributors/class/color": V_,
  "attributors/class/direction": nd,
  "attributors/class/font": od,
  "attributors/class/size": ld,
  "attributors/style/align": td,
  "attributors/style/background": El,
  "attributors/style/color": _l,
  "attributors/style/direction": id,
  "attributors/style/font": ad,
  "attributors/style/size": cd
}, !0);
D.register({
  "formats/align": Qh,
  "formats/direction": nd,
  "formats/indent": LE,
  "formats/background": El,
  "formats/color": _l,
  "formats/font": od,
  "formats/size": ld,
  "formats/blockquote": ka,
  "formats/code-block": ae,
  "formats/header": La,
  "formats/list": Di,
  "formats/bold": Fi,
  "formats/code": wl,
  "formats/italic": Ia,
  "formats/link": ks,
  "formats/script": $a,
  "formats/strike": Da,
  "formats/underline": Ra,
  "formats/formula": br,
  "formats/image": Ma,
  "formats/video": yr,
  "modules/syntax": gd,
  "modules/table": $E,
  "modules/toolbar": Cl,
  "themes/bubble": Ed,
  "themes/snow": Ad,
  "ui/icons": xi,
  "ui/picker": Kr,
  "ui/icon-picker": bd,
  "ui/color-picker": md,
  "ui/tooltip": yd
}, !0);
const ke = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, Fw = {
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
      const e = D.import("blots/block");
      class t extends e {
      }
      t.tagName = "div", D.register(t, !0), this.quill = new D(this.$refs.editor, {
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
}, xw = Fw, Cw = { class: "ql-editor-container" }, Ow = {
  class: "",
  ref: "editor"
};
function Nw(e, t, s, n, i, r) {
  return m(), b("div", Cw, [
    f("div", Ow, null, 512)
  ]);
}
const Sw = /* @__PURE__ */ ke(xw, [["render", Nw]]), kw = {
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
}, Lw = kw, Iw = {
  key: 0,
  class: "table table-sm w-100 vsa-file-info"
}, $w = { class: "text-nowrap text-center" }, Dw = { class: "text-center" }, Rw = { class: "text-nowrap text-end" }, Mw = ["innerHTML"], Bw = { class: "text-end" }, qw = { class: "text-nowrap text-center" }, Pw = { class: "text-center" }, Vw = { class: "text-end" }, jw = ["innerHTML"], Uw = { class: "text-end" }, Hw = {
  key: 0,
  class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, Ww = { colspan: "3" }, zw = { class: "text-end" }, Kw = ["innerHTML"], Gw = { class: "d-flex justify-content-between text-nowrap" }, Yw = { class: "d-flex justify-content-between text-nowrap" }, Xw = { class: "text-muted fw-light me-3" }, Zw = {
  key: 1,
  class: "d-flex justify-content-between"
};
function Jw(e, t, s, n, i, r) {
  return m(), b("div", null, [
    e.file ? (m(), b("table", Iw, [
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
          f("td", $w, $(e.file.original.width) + " x " + $(e.file.original.height), 1),
          f("td", Dw, $(e.file.original.ratio), 1),
          f("td", Rw, [
            f("span", {
              innerHTML: e.roundFileSize(e.file.original.bytes, !0)
            }, null, 8, Mw)
          ]),
          f("td", Bw, $(e.file.original.extension), 1),
          t[1] || (t[1] = f("td", null, null, -1))
        ]),
        (m(!0), b(dt, null, bt(e.file.types, (a, o) => (m(), b("tr", { key: a }, [
          f("td", null, $(o), 1),
          f("td", qw, $(a.width) + " x " + $(a.height), 1),
          f("td", Pw, $(a.ratio), 1),
          f("td", Vw, [
            f("span", {
              class: k(["text-nowrap", { "text-danger": a.bytes > e.file.original.bytes }]),
              innerHTML: e.roundFileSize(a.bytes, !0)
            }, null, 10, jw)
          ]),
          f("td", Uw, $(a.extension), 1),
          f("td", null, [
            a.crop ? (m(), b("small", Hw, $(a.crop), 1)) : T("", !0)
          ])
        ]))), 128))
      ]),
      f("tfoot", null, [
        f("tr", null, [
          f("td", Ww, $(e.file.uploaded ? "uploaded" : "uploading"), 1),
          f("td", zw, [
            f("span", {
              class: "text-nowrap",
              innerHTML: e.roundFileSize(e.file.bytes, !0)
            }, null, 8, Kw)
          ]),
          t[2] || (t[2] = f("td", { colspan: "2" }, null, -1))
        ])
      ])
    ])) : T("", !0),
    f("small", Gw, [
      t[4] || (t[4] = f("span", { class: "text-muted fw-light me-3" }, "original filename", -1)),
      At(" " + $(e.file.original.name), 1)
    ]),
    f("small", Yw, [
      f("span", Xw, $(e.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
      t[5] || (t[5] = At()),
      f("span", null, $(e.file.slug), 1)
    ]),
    e.file.uploaded ? (m(), b("small", Zw, [
      t[6] || (t[6] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
      t[7] || (t[7] = At()),
      f("span", null, $(e.dateFormat(e.file.timestamp * 1e3)), 1)
    ])) : T("", !0)
  ]);
}
const Qw = /* @__PURE__ */ ke(Lw, [["render", Jw]]), Ee = {
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
}, tA = {
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
      uploadEvent: null,
      isDragging: !1
    };
  },
  components: {
    VuAdminFileUploadInfo: Qw
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
      return D1(e, t);
    },
    extensionByFilename(e) {
      return R1(e);
    },
    getAcceptMimeTypes(e) {
      let t = [];
      for (const s in Ee)
        if (Ee.hasOwnProperty(s)) {
          const n = Ee[s];
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
      }, e.title = e.name.split(".").slice(0, -1).join("."), e.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32), e.slug = oi(e.title), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
        bytes: e.size,
        mime: e.type,
        name: e.name,
        modified: e.lastModified,
        extension: this.extensionByFilename(e.name)
      }, Object.values(Ee.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(Ee.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(Ee.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, (e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
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
                slug: oi(t.title) + "-" + t.uid,
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
      let r = !!t.videoWidth, a, o;
      r ? (a = t.videoWidth, o = t.videoHeight) : (a = t.width, o = t.height), e.original.width = a, e.original.height = o, e.original.ratio = this.calculateAspectRatio(a, o);
      for (let l in this.params.presets) {
        let c = this.params.presets[l];
        c.key = l, c.width = c.width ? c.width : 1920, c.height = c.height ? c.height : 1080;
        let d = c.width, h = c.height;
        if (c.crop === "cover") {
          let g = Math.max(d / a, h / o), v = a * g, _ = o * g, F = (v - d) / 2, O = (_ - h) / 2;
          n.width = d, n.height = h, i.drawImage(t, -F, -O, v, _);
        } else if (c.crop === "contain") {
          let g = Math.min(d / a, h / o), v = a * g, _ = o * g, F = (d - v) / 2, O = (h - _) / 2;
          n.width = d, n.height = h, i.clearRect(0, 0, d, h), i.drawImage(t, F, O, v, _);
        } else
          a > d && (o = Math.round(o * (d / a)), a = d), o > h && (a = Math.round(a * (h / o)), o = h), n.width = a, n.height = o, i.drawImage(t, 0, 0, a, o);
        e.types[c.key] = {
          width: n.width,
          height: n.height,
          ratio: this.calculateAspectRatio(n.width, n.height),
          extension: c.extension ? c.extension : this.getExtensionByMimeType(e.type),
          quality: c.quality ? c.quality : 0.9,
          crop: c.crop ? c.crop : null
        }, e.types[c.key].slug = oi(e.title) + "-" + n.width + "x" + n.height + "-" + e.uid, e.types[c.key].mime = this.getMimeTypeByExtension(e.types[c.key].extension), e.types[c.key].data = n.toDataURL(
          e.types[c.key].mime,
          e.types[c.key].quality
        ), e.types[c.key].blob = await this.getBlob(n, e.types[c.key].mime, e.types[c.key].quality), e.types[c.key].blob && (e.types[c.key].bytes = e.types[c.key].blob.size), e.types[c.key].bytes && (e.bytes += e.types[c.key].bytes), s && s(c, e);
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
        e.slug = oi(e.title);
        for (let t in e.types) {
          let s = this.params.presets[t];
          e.types[t].slug = oi(e.title) + "-" + s.width + "x" + s.height;
        }
        this.$forceUpdate();
      }
    },
    arrayItemMoveUp(e, t) {
      al(e, t);
    },
    arrayItemMoveDown(e, t) {
      ll(e, t);
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
      for (const t in Ee)
        if (Ee.hasOwnProperty(t)) {
          const s = Ee[t];
          if (s[e])
            return s[e];
        }
      return null;
    },
    getExtensionByMimeType(e) {
      for (const t in Ee)
        if (Ee.hasOwnProperty(t)) {
          const s = Ee[t];
          for (const n in s)
            if (s[n] === e)
              return n;
        }
      return null;
    },
    calculateAspectRatio(e, t) {
      function s(l, c) {
        return c === 0 ? l : s(c, l % c);
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
      const a = `${i}:${r}`;
      return {
        "2.35:1": "2.35:1",
        "2.39:1": "2.39:1",
        "2.76:1": "2.76:1",
        // Ultra Panavision 70
        "1.85:1": "1.85:1"
      }[a] || a;
    },
    translate(e, t, s) {
      return Kn(e, this.settings.translate, t, s || this.settings.language);
    },
    dropdownSelectToggleOne(e, t) {
      nl(e, t), this.$forceUpdate();
    },
    dropdownSelectAll(e, t) {
      il(e, t), this.$forceUpdate();
    },
    dropdownSelectInvert(e, t) {
      rl(e, t), this.$forceUpdate();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : ol(e), this.$forceUpdate();
    },
    handleDrop(e) {
      e.preventDefault(), this.isDragging = !1;
      const t = e.dataTransfer.files;
      this.handleFileChange({ target: { files: t } });
    }
  }
}, eA = tA, sA = { class: "" }, nA = {
  key: 0,
  class: "vsa-image-editor p-2 text-center"
}, iA = { class: "row" }, rA = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, oA = { class: "badge bg-dark text-light fw-light mx-1" }, aA = { class: "badge bg-dark text-light fw-light mx-1" }, lA = ["src"], cA = { class: "row g-1" }, uA = { class: "col-md-6" }, hA = { class: "col-md-6" }, dA = { class: "col-md-6" }, fA = ["href"], pA = {
  key: 1,
  class: "row g-2 mb-1"
}, gA = { key: 0 }, mA = { class: "table table-sm table-responsive table-borderless" }, bA = { class: "align-middle px-0" }, yA = { class: "input-group border" }, vA = { class: "d-block p-1 px-2" }, _A = ["onClick"], EA = ["onClick"], wA = {
  key: 0,
  class: "fs-5 mx-2"
}, AA = {
  key: 1,
  class: "fs-5 mx-2"
}, TA = {
  key: 2,
  class: "fs-5 mx-2"
}, FA = ["onUpdate:modelValue", "onInput"], xA = {
  key: 3,
  class: "mx-0"
}, CA = ["href"], OA = ["src", "alt"], NA = ["src", "alt"], SA = {
  key: 4,
  class: "dropdown rounded-bottom"
}, kA = {
  class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, LA = { class: "dropdown-menu" }, IA = ["onClick"], $A = {
  key: 0,
  class: "bi bi-check-square"
}, DA = {
  key: 1,
  class: "bi bi-square"
}, RA = ["onClick"], MA = ["onClick"], BA = ["onClick"], qA = { class: "dropdown" }, PA = { class: "dropdown-menu" }, VA = { class: "p-2" }, jA = { class: "fw-light" }, UA = ["onClick"], HA = { class: "vsa-image-container h-100 position-relative" }, WA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, zA = {
  key: 1,
  class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, KA = ["href"], GA = ["src", "alt"], YA = ["src", "alt"], XA = {
  key: 2,
  class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, ZA = ["onUpdate:modelValue", "onInput"], JA = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, QA = { class: "p-1 px-2 border border-end-0 h-100" }, tT = ["onClick"], eT = ["onClick"], sT = {
  key: 0,
  class: "dropdown border border-end-0 h-100 w-100"
}, nT = {
  class: "btn btn-sm rounded-0 h-100 w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, iT = { class: "dropdown-menu" }, rT = ["onClick"], oT = {
  key: 0,
  class: "bi bi-check-square"
}, aT = {
  key: 1,
  class: "bi bi-square"
}, lT = ["onClick"], cT = ["onClick"], uT = ["onClick"], hT = { class: "dropdown border h-100 w-100" }, dT = { class: "dropdown-menu" }, fT = { class: "p-2" }, pT = { class: "fw-light" }, gT = ["onClick"], mT = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, bT = { class: "row g-1" }, yT = { class: "col-12 d-flex align-items-center justify-content-center" }, vT = ["for"], _T = { key: 0 }, ET = { key: 0 }, wT = { class: "" }, AT = { class: "" }, TT = {
  key: 1,
  class: "fs-6"
}, FT = {
  key: 0,
  class: "bi bi-list-ol"
}, xT = {
  key: 1,
  class: "bi bi-grid"
}, CT = ["disabled"], OT = { class: "col-12 text-center" }, NT = { key: 0 }, ST = ["id", "accept"];
function kT(e, t, s, n, i, r) {
  const a = qe("VuAdminFileUploadInfo");
  return m(), b("div", sA, [
    f("div", {
      class: k(["vsa-upload", { wait: e.wait }])
    }, [
      e.editfile && e.editfile.presets ? (m(), b("div", nA, [
        f("div", iA, [
          (m(!0), b(dt, null, bt(e.editfile.types, (o, l) => (m(), b("div", {
            class: "col-md-3",
            key: l
          }, [
            f("span", rA, $(o.extension), 1),
            f("span", oA, $(o.width) + " x " + $(o.height), 1),
            f("span", aA, "~" + $(e.roundFileSize(o.bytes)), 1),
            o ? (m(), b("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, lA)) : T("", !0)
          ]))), 128))
        ]),
        _t(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => e.editfile.title = o)
        }, null, 512), [
          [Me, e.editfile.title]
        ]),
        f("div", cA, [
          f("div", uA, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => e.editfile = null)
            }, " Close ")
          ]),
          f("div", hA, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => e.remove(e.index))
            }, " Remove ")
          ]),
          f("div", dA, [
            e.type && !e.type.url ? (m(), b("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => e.download(e.index, e.params))
            }, " Download ")) : T("", !0),
            e.type && e.type.url ? (m(), b("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: e.type.url
            }, " Download ", 8, fA)) : T("", !0)
          ])
        ])
      ])) : T("", !0),
      e.files && e.files.length ? (m(), b("div", pA, [
        e.params.ui === "list" ? (m(), b("div", gA, [
          f("table", mA, [
            f("tbody", null, [
              (m(!0), b(dt, null, bt(e.files, (o, l) => (m(), b("tr", { key: l }, [
                f("td", bA, [
                  f("div", yA, [
                    f("span", vA, $(l + 1), 1),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end h-100",
                      onClick: (c) => e.arrayItemMoveDown(e.files, l)
                    }, [
                      f("i", {
                        class: k(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                      }, null, 2)
                    ], 8, _A),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end h-100",
                      onClick: (c) => e.arrayItemMoveUp(e.files, l + 1)
                    }, [
                      f("i", {
                        class: k(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                      }, null, 2)
                    ], 8, EA),
                    o.isDocument ? (m(), b("span", wA, [
                      f("i", {
                        class: k(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (m(), b("span", AA, t[12] || (t[12] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (m(), b("span", TA, t[13] || (t[13] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : T("", !0),
                    _t(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
                      "onUpdate:modelValue": (c) => o.title = c,
                      onInput: (c) => e.slug(o),
                      onKeydown: t[4] || (t[4] = di(Qt(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, FA), [
                      [Me, o.title]
                    ]),
                    !o.isDocument && o.types && o.types[e.params.thumbnail] ? (m(), b("span", xA, [
                      o.types.default.url ? (m(), b("a", {
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
                        }, null, 8, OA)
                      ], 8, CA)) : (m(), b("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "transparent-background",
                        src: o.types[e.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, NA))
                    ])) : T("", !0),
                    e.params.tags ? (m(), b("div", SA, [
                      f("button", kA, [
                        t[14] || (t[14] = f("i", { class: "bi bi-tag" }, null, -1)),
                        At(" " + $(o.tags ? o.tags.length : 0), 1)
                      ]),
                      f("ul", LA, [
                        f("li", null, [
                          (m(!0), b(dt, null, bt(e.params.tags, (c) => (m(), b("span", {
                            key: c,
                            class: "dropdown-item cursor-pointer",
                            onClick: (d) => e.dropdownSelectToggleOne(o.tags, c.value)
                          }, [
                            o.tags && o.tags.indexOf(c.value) >= 0 ? (m(), b("i", $A)) : (m(), b("i", DA)),
                            At(" " + $(e.translate(c.label ? c.label : c.value)), 1)
                          ], 8, IA))), 128))
                        ]),
                        t[15] || (t[15] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectAll(o.tags, e.params.tags)
                          }, $(e.translate("Select all")), 9, RA)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectClear(o.tags)
                          }, $(e.translate("Unselect all")), 9, MA)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectInvert(o.tags, e.params.tags)
                          }, $(e.translate("Invert all")), 9, BA)
                        ])
                      ])
                    ])) : T("", !0),
                    f("div", qA, [
                      t[16] || (t[16] = f("button", {
                        class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, [
                        f("i", { class: "bi bi-list" })
                      ], -1)),
                      f("ul", PA, [
                        f("li", VA, [
                          f("small", jA, [
                            vr(a, { file: o }, null, 8, ["file"])
                          ])
                        ])
                      ])
                    ]),
                    f("button", {
                      class: "btn btn-sm btn-outline-danger border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 px-2",
                      onClick: (c) => e.remove(l),
                      type: "button"
                    }, t[17] || (t[17] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1)
                    ]), 8, UA)
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (m(!0), b(dt, { key: 1 }, bt(e.files, (o, l) => (m(), b("div", {
          class: k([e.params.colclass ? e.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          f("div", HA, [
            o.loaded ? (m(), b("div", WA, [
              T("", !0),
              o.types && o.types[e.params.thumbnail] ? (m(), b("div", zA, [
                o.types.default.url ? (m(), b("a", {
                  key: 0,
                  target: "_blank",
                  href: o.types.default.url
                }, [
                  f("img", {
                    class: "img-fluid transparent-background",
                    src: o.types[e.params.thumbnail].url,
                    alt: o.name
                  }, null, 8, GA)
                ], 8, KA)) : (m(), b("img", {
                  key: 1,
                  class: "img-fluid transparent-background",
                  src: o.types[e.params.thumbnail].data,
                  alt: o.name
                }, null, 8, YA))
              ])) : T("", !0),
              o.isDocument ? (m(), b("div", XA, [
                f("i", {
                  class: k(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : T("", !0),
              _t(f("input", {
                required: "text",
                class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
                "onUpdate:modelValue": (c) => o.title = c,
                onInput: (c) => e.slug(o),
                onKeydown: t[5] || (t[5] = di(Qt(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, ZA), [
                [Me, o.title]
              ]),
              f("div", JA, [
                f("span", QA, $(l + 1), 1),
                f("span", {
                  class: "cursor-pointer p-1 border border-end-0 h-100",
                  onClick: (c) => e.arrayItemMoveDown(e.files, l)
                }, [
                  f("i", {
                    class: k(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                  }, null, 2)
                ], 8, tT),
                f("span", {
                  class: "cursor-pointer p-1 border border-end-0 h-100",
                  onClick: (c) => e.arrayItemMoveUp(e.files, l + 1)
                }, [
                  f("i", {
                    class: k(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                  }, null, 2)
                ], 8, eT),
                e.params.tags ? (m(), b("div", sT, [
                  f("button", nT, [
                    t[21] || (t[21] = f("i", { class: "bi bi-tag" }, null, -1)),
                    At(" " + $(o.tags ? o.tags.length : 0), 1)
                  ]),
                  f("ul", iT, [
                    f("li", null, [
                      (m(!0), b(dt, null, bt(e.params.tags, (c) => (m(), b("span", {
                        key: c,
                        class: "dropdown-item cursor-pointer",
                        onClick: (d) => e.dropdownSelectToggleOne(o.tags, c.value)
                      }, [
                        o.tags && o.tags.indexOf(c.value) >= 0 ? (m(), b("i", oT)) : (m(), b("i", aT)),
                        At(" " + $(e.translate(c.label ? c.label : c.value)), 1)
                      ], 8, rT))), 128))
                    ]),
                    t[22] || (t[22] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectAll(o.tags, e.params.tags)
                      }, $(e.translate("Select all")), 9, lT)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectClear(o.tags)
                      }, $(e.translate("Unselect all")), 9, cT)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectInvert(o.tags, e.params.tags)
                      }, $(e.translate("Invert all")), 9, uT)
                    ])
                  ])
                ])) : T("", !0),
                f("div", hT, [
                  t[23] || (t[23] = f("button", {
                    class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
                    type: "button",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false"
                  }, [
                    f("i", { class: "bi bi-list" })
                  ], -1)),
                  f("ul", dT, [
                    f("li", fT, [
                      f("small", pT, [
                        vr(a, { file: o }, null, 8, ["file"])
                      ])
                    ])
                  ])
                ]),
                f("button", {
                  class: "btn btn-outline-danger border rounded-0 border-start-0 px-2 py-1",
                  onClick: (c) => e.remove(l),
                  type: "button"
                }, t[24] || (t[24] = [
                  f("i", { class: "bi bi-x-circle" }, null, -1)
                ]), 8, gT)
              ])
            ])) : (m(), b("div", mT, t[25] || (t[25] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : T("", !0),
      f("div", bT, [
        f("div", yT, [
          f("label", {
            for: e.uploadId,
            class: k([
              { "disabled bg-secondary": e.files && e.params.limit <= e.files.length },
              "btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone",
              { "vsa-drop-zone-active": e.isDragging }
            ]),
            onDragover: t[6] || (t[6] = Qt(() => {
            }, ["prevent"])),
            onDragenter: t[7] || (t[7] = Qt(() => {
            }, ["prevent"])),
            onDrop: t[8] || (t[8] = Qt((...o) => e.handleDrop && e.handleDrop(...o), ["prevent"]))
          }, [
            e.files && e.params.limit > e.files.length ? (m(), b("span", _T, [
              t[29] || (t[29] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              At(" " + $(e.params.text) + " ", 1),
              e.params.limit ? (m(), b("small", ET, [
                t[26] || (t[26] = At(" ( ")),
                f("strong", wT, $(e.files.length), 1),
                t[27] || (t[27] = At(" / ")),
                f("span", AT, $(e.params.limit), 1),
                t[28] || (t[28] = At(" ) "))
              ])) : T("", !0)
            ])) : (m(), b("span", TT, t[30] || (t[30] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              At(" You've reached the upload limit ")
            ])))
          ], 42, vT),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[9] || (t[9] = (o) => e.toggleView())
          }, [
            e.params.ui != "list" ? (m(), b("i", FT)) : T("", !0),
            e.params.ui == "list" ? (m(), b("i", xT)) : T("", !0)
          ]),
          f("button", {
            disabled: !e.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[10] || (t[10] = (o) => e.resetConfirm())
          }, t[31] || (t[31] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, CT)
        ]),
        f("div", OT, [
          f("small", null, [
            e.params.accept ? (m(), b("div", NT, [
              t[32] || (t[32] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (m(!0), b(dt, null, bt(e.params.accept, (o) => (m(), b("strong", {
                class: "ms-1 text-muted",
                key: o
              }, $(o), 1))), 128))
            ])) : T("", !0),
            T("", !0)
          ])
        ])
      ]),
      e.uploadId ? (m(), b("input", {
        key: 2,
        multiple: "",
        style: { opacity: "0", height: "1px", width: "1px" },
        id: e.uploadId,
        type: "file",
        accept: e.getAcceptMimeTypes(e.params.accept),
        onChange: t[11] || (t[11] = (...o) => e.handleFileChange && e.handleFileChange(...o))
      }, null, 40, ST)) : T("", !0)
    ], 2)
  ]);
}
const LT = /* @__PURE__ */ ke(eA, [["render", kT]]), IT = {
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
      return nn(e, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    async selectOptions(e, t) {
      return typeof e == "function" ? await e(this.item, t, this) : e;
    },
    async fetchCustom(e, t) {
      const s = await fetch(
        ps("GET", { url: e }, t),
        fs("GET", this.settings.form.api, null, this.auth)
      ), n = await On(s);
      if (!Nn(s, n.data))
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
}, $T = IT, DT = ["name", "id", "disabled", "readonly", "required"], RT = ["value"];
function MT(e, t, s, n, i, r) {
  return _t((m(), b("select", {
    class: k(["form-select", e.getValueOrFunction(e.field.inputclass ? e.field.inputclass : "", { field: e.field, item: e.item })]),
    name: e.field.name,
    id: e.formId + "_" + e.field.name,
    onChange: t[0] || (t[0] = (a) => e.handleChange(a)),
    "onUpdate:modelValue": t[1] || (t[1] = (a) => e.newitem = a),
    disabled: e.field.disabled,
    readonly: e.field.readonly,
    required: e.field.required
  }, [
    (m(!0), b(dt, null, bt(e.options, (a) => (m(), b("option", {
      class: k(e.getValueOrFunction(e.field.optionclass ? e.field.optionclass : "", { field: e.field, item: e.item, option: a })),
      key: a,
      value: a.value
    }, $(a.label ? a.label : a.value), 11, RT))), 128))
  ], 42, DT)), [
    [Xe, e.newitem]
  ]);
}
const Td = /* @__PURE__ */ ke($T, [["render", MT]]), BT = {
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
      return nn(e, t, this.settings, this);
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
      al(e, t);
    },
    arrayItemMoveDown(e, t) {
      ll(e, t);
    }
  },
  components: {
    VuAdminFormSelect: Td
  }
}, qT = BT, PT = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, VT = { class: "col-10" }, jT = { class: "row g-1 d-flex align-items-center justify-content-between" }, UT = { class: "col-10" }, HT = { class: "row g-1 d-flex align-items-center justify-content-between" }, WT = ["innerHTML"], zT = {
  key: 1,
  class: "input-group input-group-sm"
}, KT = ["type", "required", "placeholder", "onUpdate:modelValue"], GT = { class: "col-2 text-nowrap text-end" }, YT = ["onClick"], XT = ["onClick"], ZT = ["onClick"], JT = { key: 0 }, QT = { class: "row g-1 d-flex align-items-center justify-content-between" }, t2 = { class: "col-10" }, e2 = { class: "row g-1 d-flex align-items-center justify-content-between" }, s2 = { class: "input-group input-group-sm" }, n2 = {
  key: 0,
  class: "input-group-text"
}, i2 = ["type", "placeholder", "onUpdate:modelValue"], r2 = {
  key: 3,
  class: "input-group-text"
}, o2 = { class: "col-2" };
function a2(e, t, s, n, i, r) {
  const a = qe("VuAdminFormSelect");
  return m(), b("div", null, [
    f("div", PT, [
      f("div", VT, [
        f("div", jT, [
          (m(!0), b(dt, null, bt(e.field.elements, (o) => (m(), b("div", {
            key: o,
            class: k(o.class || "col")
          }, [
            f("small", null, $(o.placeholder ? o.placeholder : o.prefix ? o.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = f("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (m(!0), b(dt, null, bt(e.value, (o, l) => (m(), b("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: l
    }, [
      f("div", UT, [
        f("div", HT, [
          (m(!0), b(dt, null, bt(o, (c, d) => (m(), b("div", {
            key: d,
            class: k(e.field.elements[d].class || "col")
          }, [
            e.field.elements[d].template ? (m(), b("span", {
              key: 0,
              innerHTML: e.getValueOrFunction(e.field.elements[d].template, e.value[l])
            }, null, 8, WT)) : (m(), b("div", zT, [
              e.field.elements[d].type == "select" && e.value[l][d] ? (m(), gs(a, {
                key: 0,
                modelValue: e.value[l][d],
                "onUpdate:modelValue": (h) => e.value[l][d] = h,
                field: e.field.elements[d],
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : _t((m(), b("input", {
                key: 1,
                type: e.field.elements[d].type,
                required: e.field.elements[d].required,
                placeholder: e.field.elements[d].placeholder || d,
                class: "form-control",
                "onUpdate:modelValue": (h) => e.value[l][d] = h
              }, null, 8, KT)), [
                [Pe, e.value[l][d]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      f("div", GT, [
        e.field.sortable ? (m(), b("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (c) => e.arrayItemMoveUp(e.value, l)
        }, t[2] || (t[2] = [
          f("i", { class: "bi bi-arrow-up" }, null, -1)
        ]), 8, YT)) : T("", !0),
        e.field.sortable ? (m(), b("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (c) => e.arrayItemMoveDown(e.value, l + 1)
        }, t[3] || (t[3] = [
          f("i", { class: "bi bi-arrow-down" }, null, -1)
        ]), 8, XT)) : T("", !0),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (c) => e.arrayRemoveItem(e.value, l)
        }, t[4] || (t[4] = [
          f("i", { class: "bi bi-trash" }, null, -1)
        ]), 8, ZT)
      ])
    ]))), 128)),
    e.item[e.field.name] && e.item[e.field.name].length ? (m(), b("hr", JT)) : T("", !0),
    f("div", QT, [
      f("div", t2, [
        f("div", e2, [
          (m(!0), b(dt, null, bt(e.field.elements, (o) => (m(), b("div", {
            key: o,
            class: k(o.class || "col")
          }, [
            f("div", s2, [
              o.prefix ? (m(), b("span", n2, $(o.prefix), 1)) : T("", !0),
              o.type == "select" && (!o.relation || o.relation && o.relation.items) ? (m(), gs(a, {
                key: 1,
                modelValue: o.value,
                "onUpdate:modelValue": (l) => o.value = l,
                field: o,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : _t((m(), b("input", {
                key: 2,
                type: o.type,
                placeholder: o.placeholder || o.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (l) => o.value = l
              }, null, 8, i2)), [
                [Pe, o.value]
              ]),
              o.suffix ? (m(), b("span", r2, $(o.suffix), 1)) : T("", !0)
            ]),
            T("", !0)
          ], 2))), 128))
        ])
      ]),
      f("div", o2, [
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-primary my-1 w-100",
          onClick: t[0] || (t[0] = (o) => e.arrayAddNewItem(e.field, e.item))
        }, t[5] || (t[5] = [
          f("i", { class: "bi bi-plus" }, null, -1)
        ]))
      ])
    ])
  ]);
}
const l2 = /* @__PURE__ */ ke(qT, [["render", a2]]), c2 = {
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
      return nn(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return Kn(e, this.settings.translate, t, s || this.settings.language);
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
      al(e, t);
    },
    arrayItemMoveDown(e, t) {
      ll(e, t);
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
    },
    dropdownSelectToggleOne(e, t, s) {
      let n = s.value ? s.value : s;
      nl(t, n);
    },
    dropdownSelectAll(e, t) {
      il(e, t);
    },
    dropdownSelectInvert(e, t) {
      rl(e, t);
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : ol(e);
    }
  },
  components: {
    HtmlEditor: Sw,
    FileUpload: LT,
    VuAdminFormSelect: Td,
    VuAdminFormList: l2
  }
}, u2 = c2, h2 = { class: "row m-1" }, d2 = ["innerHTML"], f2 = {
  key: 1,
  class: "row"
}, p2 = { class: "form-group pb-3" }, g2 = { key: 0 }, m2 = {
  key: 0,
  class: "badge text-secondary fw-light"
}, b2 = ["for", "innerHTML"], y2 = {
  key: 1,
  class: "input-group"
}, v2 = ["innerHTML"], _2 = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], E2 = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "disabled", "readonly", "required"], w2 = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "disabled", "readonly", "required"], A2 = {
  key: 4,
  class: "form-check"
}, T2 = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "disabled", "readonly", "required"], F2 = ["for"], x2 = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "disabled", "required"], C2 = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], O2 = ["innerHTML"], N2 = { class: "dropdown d-inline-block" }, S2 = { class: "dropdown-menu" }, k2 = ["onClick"], L2 = {
  key: 0,
  class: "bi bi-check-square"
}, I2 = {
  key: 1,
  class: "bi bi-square"
}, $2 = ["onClick"], D2 = ["onClick"], R2 = ["onClick"], M2 = { key: 0 }, B2 = ["onClick"], q2 = { key: 6 }, P2 = { key: 0 }, V2 = ["for"], j2 = ["name", "id", "onUpdate:modelValue"], U2 = ["onClick"], H2 = ["innerHTML"], W2 = {
  key: 8,
  class: "p-1"
}, z2 = ["innerHTML"];
function K2(e, t, s, n, i, r) {
  const a = qe("VuAdminFormSelect"), o = qe("HtmlEditor"), l = qe("FileUpload"), c = qe("VuAdminFormList");
  return m(), b("div", h2, [
    (m(!0), b(dt, null, bt(e.settings.form.groups, (d) => (m(), b("div", {
      key: d,
      class: k([d.class ? d.class : "col-md-12"])
    }, [
      d.title ? (m(), b("h2", {
        key: 0,
        class: "form-row-title mb-4 fw-lighter",
        innerHTML: d.title ? d.title : ""
      }, null, 8, d2)) : T("", !0),
      e.item && d.fields ? (m(), b("div", f2, [
        (m(!0), b(dt, null, bt(d.fields, (h) => (m(), b("div", {
          class: k([e.getValueOrFunction(h.class ? h.class : "col-md-12"), "input_type_" + h.type]),
          key: h
        }, [
          f("div", p2, [
            h.label ? (m(), b("span", g2, [
              ["html", "image", "upload"].indexOf(h.type) >= 0 ? (m(), b("label", {
                key: 0,
                class: k([{ required: h.required }, "form-label text-secondary mb-1"])
              }, [
                At($(h.label ? h.label : e.translate(h.name)) + " ", 1),
                h.maxlength ? (m(), b("span", m2, $(e.item[h.name] ? e.item[h.name].length : 0) + " / " + $(h.maxlength), 1)) : T("", !0)
              ], 2)) : (m(), b("label", {
                key: 1,
                class: k([{ required: h.required }, "form-label text-secondary mb-1"]),
                for: e.formId + "_" + h.name,
                innerHTML: e.getValueOrFunction(h.label ? h.label : e.translate(h.name), { field: h, item: e.item })
              }, null, 10, b2))
            ])) : T("", !0),
            ["html", "image", "list", "addresses", "template"].indexOf(h.type) < 0 ? (m(), b("div", y2, [
              h.prefix ? (m(), b("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.prefix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, v2)) : T("", !0),
              h.type == "text" ? _t((m(), b("input", {
                key: 1,
                class: k(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "text",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, _2)), [
                [Me, e.item[h.name]]
              ]) : T("", !0),
              h.type == "number" ? _t((m(), b("input", {
                key: 2,
                class: k(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "number",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                min: h.min,
                max: h.max,
                step: h.step,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, E2)), [
                [Me, e.item[h.name]]
              ]) : T("", !0),
              ["date", "datetime", "datetime-local"].indexOf(h.type) >= 0 ? _t((m(), b("input", {
                key: 3,
                class: k(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: h.type,
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                min: h.min,
                max: h.max,
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, w2)), [
                [Pe, e.item[h.name]]
              ]) : T("", !0),
              h.type == "checkbox" ? (m(), b("div", A2, [
                _t(f("input", {
                  class: k(["form-check-input", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                  type: "checkbox",
                  name: h.name,
                  id: e.formId + "_" + h.name,
                  "true-value": h.true != null ? h.true : !0,
                  "false-value": h.false != null ? h.false : !1,
                  "onUpdate:modelValue": (g) => e.item[h.name] = g,
                  disabled: h.disabled,
                  readonly: h.readonly,
                  required: h.required
                }, null, 10, T2), [
                  [_r, e.item[h.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: e.formId + "_" + h.name
                }, $(h.checkbox), 9, F2)
              ])) : T("", !0),
              h.type == "email" ? _t((m(), b("input", {
                key: 5,
                autocomplete: "on",
                class: k(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "email",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                readonly: h.readonly,
                disabled: h.disabled,
                required: h.required
              }, null, 10, x2)), [
                [Me, e.item[h.name]]
              ]) : T("", !0),
              h.type == "select" && (!h.relation || h.relation && h.relation.items) ? (m(), gs(a, {
                key: 6,
                modelValue: e.item[h.name],
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                field: h,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                auth: e.auth
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId", "auth"])) : T("", !0),
              h.type == "textarea" ? _t((m(), b("textarea", {
                key: 7,
                class: k(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                rows: h.rows,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, "              ", 10, C2)), [
                [Me, e.item[h.name]]
              ]) : T("", !0),
              h.suffix ? (m(), b("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.suffix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, O2)) : T("", !0)
            ])) : T("", !0),
            h.type == "html" ? (m(), gs(o, {
              key: 2,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (g) => e.item[h.name] = g,
              class: k([h.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : T("", !0),
            h.type == "image" || h.type == "upload" ? (m(), gs(l, {
              key: 3,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (g) => e.item[h.name] = g,
              class: k([h.class]),
              field: h,
              settings: e.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : T("", !0),
            h.type == "list" && (!h.relation || h.relation && h.relation.items) ? (m(), gs(c, {
              key: 4,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (g) => e.item[h.name] = g,
              field: h,
              item: e.item,
              settings: e.settings,
              formId: e.formId
            }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : T("", !0),
            h.type == "dropdown" && e.item[h.name] ? (m(), b("div", {
              key: 5,
              class: k([h.class])
            }, [
              f("div", N2, [
                f("button", {
                  class: k(["btn dropdown-toggle", [h.dropdown ? h.dropdown.class : ""]]),
                  type: "button",
                  "data-bs-auto-close": "outside",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, [
                  f("span", null, $(e.translate(h.dropdown ? h.dropdown.label : "Select")), 1)
                ], 2),
                f("ul", S2, [
                  f("li", null, [
                    (m(!0), b(dt, null, bt(h.options, (g) => (m(), b("span", {
                      key: g,
                      class: k(["dropdown-item cursor-pointer", { selected: e.item[h.name].indexOf(g.value) >= 0 }]),
                      onClick: (v) => e.dropdownSelectToggleOne(h, e.item[h.name], g)
                    }, [
                      e.item[h.name].indexOf(g.value) >= 0 ? (m(), b("i", L2)) : (m(), b("i", I2)),
                      At(" " + $(e.translate(g.label ? g.label : g.value)), 1)
                    ], 10, k2))), 128))
                  ]),
                  t[0] || (t[0] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (g) => e.dropdownSelectAll(e.item[h.name], h.options)
                    }, $(e.translate("Select all")), 9, $2)
                  ]),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (g) => e.dropdownSelectClear(e.item[h.name])
                    }, $(e.translate("Unselect all")), 9, D2)
                  ]),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (g) => e.dropdownSelectInvert(e.item[h.name], h.options)
                    }, $(e.translate("Invert all")), 9, R2)
                  ])
                ])
              ]),
              e.item[h.name].length ? (m(), b("span", M2, [
                (m(!0), b(dt, null, bt(e.item[h.name], (g) => (m(), b("span", {
                  class: k(["cursor-pointer", [h.list ? h.list.class : ""]]),
                  key: g,
                  onClick: (v) => e.dropdownSelectToggleOne(h, e.item[h.name], g)
                }, [
                  At($(e.translate(g)) + " ", 1),
                  t[1] || (t[1] = f("i", { class: "bi bi-x" }, null, -1))
                ], 10, B2))), 128))
              ])) : T("", !0)
            ], 2)) : T("", !0),
            h.type == "addresses" ? (m(), b("span", q2, [
              e.item[h.name] ? (m(), b("div", P2, [
                (m(!0), b(dt, null, bt(e.item[h.name], (g) => (m(), b("div", { key: g }, [
                  At($(g) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: e.formId + "_" + h.name
                  }, $(h.label), 9, V2),
                  _t(f("input", {
                    class: "form-control",
                    type: "text",
                    name: h.name,
                    id: e.formId + "_" + h.name,
                    "onUpdate:modelValue": (v) => g.country = v
                  }, null, 8, j2), [
                    [Me, g.country]
                  ])
                ]))), 128))
              ])) : T("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (g) => e.insertAddress(h.name)
              }, " Add ", 8, U2)
            ])) : T("", !0),
            h.type == "template" ? (m(), b("div", {
              key: 7,
              innerHTML: e.getValueOrFunction(h.template, {
                field: h,
                item: e.item
              })
            }, null, 8, H2)) : T("", !0),
            h.description ? (m(), b("div", W2, [
              f("small", null, [
                f("i", {
                  class: "text-muted",
                  innerHTML: e.getValueOrFunction(h.description, {
                    field: h,
                    item: e.item
                  })
                }, null, 8, z2)
              ])
            ])) : T("", !0)
          ])
        ], 2))), 128))
      ])) : T("", !0)
    ], 2))), 128))
  ]);
}
const G2 = /* @__PURE__ */ ke(u2, [["render", K2]]), Y2 = {
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
      return Kn(e, this.settings.translate, t, s || this.settings.language);
    },
    getValueOrFunction(e, t) {
      return nn(e, t, this.settings, this);
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
          ps("GET", t.form.api, e),
          fs("GET", t.api, null, s)
        ).catch((o) => {
        }), i = await On(n);
        if (Nn(n, i.data, "form") || !i.data)
          return this.formNoWait(), !1;
        t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, n);
        let a;
        t.form.api.input.item ? a = typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, n) : a = i.data;
        for (let o of t.form.groups)
          for (let l of o.fields)
            l.type === "dropdown" && !a[l.name] && (a[l.name] = []), l.relation && t.relations[l.relation.config] && (l.relation = qr(t.relations[l.relation.config], l.relation), console.log(l.relation, s), await this.fetchRelation(l, [a], s));
        this.item = Fr(a), this.itemOriginal = Object.assign({}, a), this.loaded = !0, this.formNoWait();
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
        ), this.item = Fr(s), this.itemOriginal = Object.assign({}, s)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
          ps(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          fs("DELETE", this.settings.api, null, this.auth)
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
    VuAdminFormGroup: G2
  }
}, X2 = Y2, Z2 = ["id", "data-bs-theme"], J2 = { class: "modal-header" }, Q2 = {
  key: 0,
  class: "modal-title"
}, tF = ["innerHTML"], eF = { key: 1 }, sF = { key: 2 }, nF = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, iF = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, rF = ["innerHTML"], oF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, aF = {
  key: 0,
  class: "modal-header bg-body sticky-top"
}, lF = {
  key: 0,
  class: "d-inline-block m-1"
}, cF = { class: "dropdown d-inline-block" }, uF = ["innerHTML"], hF = { class: "dropdown-menu text-start" }, dF = { class: "me-2 text-muted" }, fF = ["innerHTML"], pF = ["disabled", "onClick"], gF = {
  key: 1,
  class: "dropdown d-inline-block"
}, mF = { class: "mx-1" }, bF = { class: "dropdown-menu px-2" }, yF = ["onClick"], vF = {
  key: 1,
  class: "modal-body custom-scroll"
}, _F = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, EF = {
  key: 3,
  class: "bg-light text-dark"
};
function wF(e, t, s, n, i, r) {
  const a = qe("VuAdminFormGroup");
  return e.item ? (m(), b("form", {
    key: 0,
    ref: "form",
    id: e.formId,
    class: k(["form", [e.settings.form.class, { wait: e.ui.wait.form }]]),
    onSubmit: t[1] || (t[1] = Qt((...o) => e.submitItem && e.submitItem(...o), ["prevent"])),
    "data-bs-theme": [e.settings.theme]
  }, [
    f("div", {
      class: k(["vua-overlay", { blocked: e.ui.block.form }])
    }, null, 2),
    f("div", J2, [
      e.loaded ? (m(), b("h5", Q2, [
        e.settings.form.title && typeof e.settings.form.title == "function" ? (m(), b("span", {
          key: 0,
          innerHTML: e.settings.form.title(e.item, e.settings)
        }, null, 8, tF)) : T("", !0),
        e.settings.form.title && typeof e.settings.form.title == "string" ? (m(), b("span", eF, $(e.translate(e.settings.form.title)), 1)) : T("", !0),
        e.settings.form.title ? T("", !0) : (m(), b("span", sF, $(e.translate("Edit")), 1)),
        e.item[e.settings.pkey] ? (m(), b("small", nF, [
          t[2] || (t[2] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          At(" " + $(e.item[e.settings.pkey]), 1)
        ])) : T("", !0)
      ])) : T("", !0),
      e.message.form ? (m(), b("span", iF, [
        f("span", {
          class: k(["text-" + e.message.form.priority])
        }, [
          t[3] || (t[3] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: e.message.form.msg
          }, null, 8, rF)
        ], 2)
      ])) : T("", !0),
      _t(f("span", oF, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ws, e.ui.wait.form]
      ]),
      t[5] || (t[5] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    e.item ? (m(), b("div", aF, [
      e.settings.form.control ? (m(), b("div", {
        key: 0,
        class: k(["w-100", e.settings.form.control.class == null ? "d-flex justify-content-center" : e.settings.form.control.class])
      }, [
        e.messages.form.length ? (m(), b("span", lF, [
          f("div", cF, [
            f("button", {
              class: k(["btn btn-sm dropdown-toggle", ["btn-" + e.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: e.messages.form.length + " " + (e.messages.form.length > 1 ? e.translate("messages") : e.translate("message"))
            }, null, 10, uF),
            f("ul", hF, [
              (m(!0), b(dt, null, bt(e.messages.form, (o) => (m(), b("li", { key: o }, [
                f("span", {
                  class: k(["dropdown-item disabled", ["text-" + o.priority]])
                }, [
                  f("small", dF, $(o.datetime), 1),
                  f("span", {
                    innerHTML: o.msg
                  }, null, 8, fF)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : T("", !0),
        (m(!0), b(dt, null, bt(e.settings.form.control.buttons, (o) => (m(), b("span", {
          key: o.action
        }, [
          o.dropdowns ? T("", !0) : (m(), b("button", {
            key: 0,
            type: "button",
            disabled: o.disabled !== void 0 ? e.getValueOrFunction(o.disabled, {
              button: o,
              item: e.item,
              form: this
            }) : !1,
            class: k([
              o.class ? o.class : e.getButtonClassByAction(o.action)
            ]),
            onClick: (l) => e.formAction(o, {
              button: o,
              item: e.item,
              form: this,
              $event: l
            })
          }, [
            f("i", {
              class: k([
                o.icon !== void 0 ? e.getValueOrFunction(o.icon, {
                  button: o,
                  item: e.item,
                  form: this
                }) : e.getButtonIconClassByAction(o.action)
              ])
            }, null, 2),
            At(" " + $(e.translate(o.title)), 1)
          ], 10, pF)),
          o.dropdowns ? (m(), b("div", gF, [
            f("button", {
              type: "button",
              class: k([[o.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", mF, [
                f("i", {
                  class: k([
                    o.icon !== void 0 ? e.getValueOrFunction(o.icon, {
                      button: o,
                      table: this
                    }) : e.getButtonIconClassByAction(o.action)
                  ])
                }, null, 2),
                At(" " + $(e.translate(o.title)), 1)
              ])
            ], 2),
            f("ul", bF, [
              (m(!0), b(dt, null, bt(o.dropdowns, (l) => (m(), b("li", { key: l }, [
                f("span", {
                  class: k([l.class ? l.class : ""]),
                  onClick: (c) => e.formAction(l, {
                    button: o,
                    item: e.item,
                    form: this,
                    $event: c
                  })
                }, [
                  l.icon ? (m(), b("i", {
                    key: 0,
                    class: k([l.icon])
                  }, null, 2)) : T("", !0),
                  At(" " + $(e.translate(l.title)), 1)
                ], 10, yF)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0)
    ])) : T("", !0),
    e.settings.form ? (m(), b("div", vF, [
      e.settings.form.visible && e.settings.form.groups ? (m(), gs(a, {
        key: 0,
        modelValue: e.item,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.item = o),
        formid: e.formId,
        settings: e.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : T("", !0)
    ])) : T("", !0),
    e.item ? (m(), b("div", _F)) : T("", !0),
    e.settings.debug > 1 ? (m(), b("pre", EF, "        " + $(e.item) + `
    `, 1)) : T("", !0)
  ], 42, Z2)) : T("", !0);
}
const Fd = /* @__PURE__ */ ke(X2, [["render", wF]]), AF = {
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
      return Kn(e, this.settings.translate, t, s || this.settings.language);
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
}, TF = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, FF = { class: "dropdown d-inline-block m-1" }, xF = { class: "mx-1" }, CF = { key: 0 }, OF = {
  key: 0,
  class: "dropdown-menu text-end"
}, NF = ["onClick"], SF = { class: "ms-2" }, kF = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, LF = {
  key: 1,
  class: "bi bi-circle ms-2"
}, IF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, $F = { class: "pagination pagination-sm m-1" }, DF = { class: "page-item" }, RF = ["innerHTML"], MF = { class: "page-item" }, BF = ["innerHTML"], qF = ["onClick"], PF = { class: "page-item" }, VF = ["innerHTML"], jF = {
  key: 0,
  class: "page-item"
}, UF = ["innerHTML"];
function HF(e, t, s, n, i, r) {
  return s.config.pagination.hidden ? T("", !0) : (m(), b("nav", TF, [
    f("div", null, [
      f("div", FF, [
        f("button", {
          type: "button",
          class: k(["btn btn-sm btn-secondary", { "dropdown-toggle": s.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          _t(f("span", xF, [
            f("strong", null, $(s.config.pagination.from) + "-" + $(s.config.pagination.to), 1),
            s.config.pagination.total ? (m(), b("span", CF, " / " + $(s.config.pagination.total), 1)) : T("", !0)
          ], 512), [
            [Ws, s.config.pagination.from > 0]
          ])
        ], 2),
        s.config.pagination.limits ? (m(), b("ul", OF, [
          f("li", null, [
            (m(!0), b(dt, null, bt(s.config.pagination.limits, (a) => (m(), b("span", {
              class: k(["dropdown-item cursor-pointer", { selected: s.config.pagination.limit == a }]),
              key: a,
              onClick: (o) => r.setPageLimit(a)
            }, [
              f("strong", null, $(a), 1),
              f("small", SF, $(r.translate("row")) + "/" + $(r.translate("page")), 1),
              s.config.pagination.limit == a ? (m(), b("i", kF)) : T("", !0),
              s.config.pagination.limit != a ? (m(), b("i", LF)) : T("", !0)
            ], 10, NF))), 128))
          ])
        ])) : T("", !0)
      ]),
      _t(f("div", IF, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ws, s.ui && s.ui.wait.table]
      ])
    ]),
    f("ul", $F, [
      f("li", DF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (a) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, RF)
        ], 2)
      ]),
      f("li", MF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (a) => r.setPage(s.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, BF)
        ], 2)
      ]),
      (m(!0), b(dt, null, bt(s.config.pagination.numbers, (a) => (m(), b("li", {
        key: a,
        class: "page-item"
      }, [
        f("a", {
          class: k(["page-link cursor-pointer", {
            disabled: a > s.config.pagination.pages,
            current: a == s.config.pagination.page
          }]),
          onClick: (o) => r.setPage(a)
        }, $(a), 11, qF)
      ]))), 128)),
      f("li", PF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (a) => r.setPage(s.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, VF)
        ], 2)
      ]),
      s.config.pagination.total ? (m(), b("li", jF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (a) => r.setPage(s.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, UF)
        ], 2)
      ])) : T("", !0)
    ])
  ]));
}
const WF = /* @__PURE__ */ ke(AF, [["render", HF]]), pu = sl(), zF = {
  name: "VuAdminTable",
  props: {
    settings: Object,
    auth: Object
  },
  components: {
    VuAdminForm: Fd,
    VuAdminTablePagination: WF
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
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Zs(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
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
      pu.emit(e + "-" + t, {
        from: this.settings.entity,
        payload: s
      });
    },
    listenEvent() {
      pu.on(`EDIT-${this.settings.entity}`, (e) => {
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
      return nn(e, t, this.settings, this);
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
          t.relation = qr(this.settings.relations[t.relation.config], t.relation);
          for (let n of e)
            n[t.relation.local] && s.push(n[t.relation.local]);
          t.relation.ids = I1(s), await this.fetchRelation(t, e, this.auth);
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
        ps("GET", e.table.api, null, t),
        fs("GET", e.table.api, null, n)
      ), r = await On(i), a = Nn(i, r.data);
      if (a) {
        this.handleTableErrors(a);
        return;
      }
      if (r.error) {
        this.handleTableErrors(r.error);
        return;
      }
      e.events && e.events.afterItemsLoad && e.events.afterItemsLoad(r.data, i);
      let o;
      e.table.api.input.items ? o = typeof e.table.api.input.items == "string" ? r.data[e.table.api.input.items] : e.table.api.input.items(r.data, i) : o = r.data, s && (e.table.api.input.total ? s.pagination.total = typeof e.table.api.input.total == "string" ? r.data[e.table.api.input.total] : e.table.api.input.total(r.data, i) : r.data.total && (s.pagination.total = r.data.total), s.pagination.items = o.length, this.calcPage());
      let l = N1(o);
      return this.convertIn(e.table.columns, l), l;
    },
    async fetchRelation(e, t, s) {
      try {
        let n = e.relation.params ? e.relation.params : {};
        e.relation.columns && (n.columns = JSON.stringify(e.relation.columns));
        let i = {};
        if (e.relation.ids && e.relation.ids.length) {
          let c = (typeof e.relation.ids[0] == "string" ? "text" : "number") === "string" ? "'" + e.relation.ids.join("','") + "'" : e.relation.ids.join(",");
          i[e.relation.foreign] = {
            type: "array",
            value: c,
            operator: "IN"
          };
        }
        n.filter = JSON.stringify(i), $1(n, {
          column: e
        });
        const r = await fetch(
          ps("GET", e.relation.api, null, n),
          fs("GET", e.relation.api, null, s)
        );
        if (r.status !== 200)
          throw new Error(
            this.translate("Response status: " + r.status)
          );
        const a = await On(r);
        if (Nn(r, a.data) || !a.data)
          return;
        if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? a.data[e.relation.api.input.items] : e.relation.api.input.items(a.data, r) : e.relation.items = a.data, t && t[0])
          for (let l of t)
            l[e.relation.local] && (l[e.relation.entity] = e.relation.items.find(
              (c, d, h) => c[e.relation.foreign] === l[e.relation.local]
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
          ps(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          fs("DELETE", this.settings.api, null, this.auth)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        let r = this.items.find((o) => o[this.settings.pkey] === s);
        r >= 0 && this.items.splice(r, 1), this.item && (this.item = {});
        const a = await i.json();
        this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(a, i), this.reloadTable();
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
          ps("DELETE", this.settings.table.api),
          fs("DELETE", this.settings.api, {
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
        let a, o;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = S1(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, e), !this.settings.form.api.output.item)
          a = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let h = {};
          h[this.settings.form.api.output.item] = i, a = JSON.stringify(h);
        } else
          a = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const l = r ? "PUT" : "POST";
        o = await fetch(
          ps(l, this.settings.form.api, r, n),
          fs(l, this.settings.form.api, {
            body: a
          }, this.auth)
        );
        const c = await On(o), d = Nn(o, c.data);
        if (d) {
          s && s(d, e, n, o);
          return;
        }
        if (c.error) {
          s && s(c.error, e, n, o);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(c.data, n), t && t(c.data, o);
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
          ps("PUT", this.settings.table.api),
          fs("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: t,
              ids: this.selected
            })
          }, this.auth)
        ).catch((r) => {
          console.error(r), this.addTableMessage(r.message, 3500, "danger", r);
        }), n = await On(s), i = Nn(s, n.data);
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
      e.multiple ? nl(e.value, s) : e.value = e.value === s ? null : s, this.reloadTable();
    },
    dropdownSelectAll(e, t) {
      il(e, t), this.reloadTable();
    },
    dropdownSelectInvert(e, t) {
      rl(e, t), this.reloadTable();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : ol(e), this.reloadTable();
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
        let n = k1(
          items,
          this.settings.table.exports[e.type].fields
        );
        L1(n, this.settings.entity + ".csv");
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
      }, (i, r, a, o) => {
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
      return Kn(e, this.settings.translate, t, s || this.settings.language);
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
}, KF = ["data-bs-theme"], GF = { class: "vua-table-title" }, YF = { class: "d-flex align-items-center justify-content-between" }, XF = { class: "d-inline-block" }, ZF = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, JF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, QF = {
  key: 0,
  class: "d-inline-block"
}, tx = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, ex = ["innerHTML"], sx = { class: "dropdown d-inline-block" }, nx = ["innerHTML"], ix = { class: "dropdown-menu text-start" }, rx = { class: "me-2 text-muted" }, ox = ["innerHTML"], ax = ["onClick"], lx = {
  key: 1,
  class: "dropdown d-inline-block"
}, cx = { class: "mx-1" }, ux = { key: 0 }, hx = { class: "dropdown-menu" }, dx = ["onClick"], fx = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, px = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, gx = { class: "badge text-secondary fw-normal" }, mx = {
  key: 2,
  class: "dropdown d-inline-block"
}, bx = { class: "mx-1" }, yx = { class: "dropdown-menu" }, vx = ["onClick"], _x = { class: "vua-table-header" }, Ex = ["width"], wx = ["onClick"], Ax = ["innerHTML"], Tx = {
  key: 0,
  class: "bi bi-arrow-down"
}, Fx = {
  key: 1,
  class: "bi bi-arrow-up"
}, xx = { key: 0 }, Cx = ["disabled", "onClick"], Ox = {
  key: 0,
  class: "vua-table-filter"
}, Nx = ["width"], Sx = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, kx = { class: "bi bi-check-all" }, Lx = { class: "bi bi-x-lg" }, Ix = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, $x = ["onUpdate:modelValue"], Dx = ["disabled", "onClick"], Rx = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, Mx = ["onUpdate:modelValue", "disabled"], Bx = { value: "=" }, qx = { value: ">" }, Px = { value: ">=" }, Vx = { value: "<" }, jx = { value: "<=" }, Ux = ["onUpdate:modelValue", "disabled"], Hx = ["value"], Wx = ["onUpdate:modelValue", "disabled", "min", "max"], zx = ["disabled", "onClick"], Kx = { key: 3 }, Gx = {
  key: 0,
  class: "dropdown"
}, Yx = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, Xx = { class: "dropdown-menu" }, Zx = ["onClick"], Jx = {
  key: 0,
  class: "bi bi-check-square"
}, Qx = {
  key: 1,
  class: "bi bi-square"
}, tC = { key: 0 }, eC = { key: 1 }, sC = ["onClick"], nC = { key: 2 }, iC = ["onClick"], rC = { key: 3 }, oC = ["onClick"], aC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, lC = ["onUpdate:modelValue", "multiple"], cC = ["value"], uC = ["disabled", "onClick"], hC = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, dC = ["onUpdate:modelValue"], fC = { value: "=" }, pC = { value: ">" }, gC = { value: ">=" }, mC = { value: "<" }, bC = { value: "<=" }, yC = ["onUpdate:modelValue"], vC = ["value"], _C = ["type", "onUpdate:modelValue"], EC = ["disabled", "onClick"], wC = ["disabled", "onClick"], AC = { class: "align-middle" }, TC = ["data-label", "width", "onClick"], FC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, xC = ["innerHTML"], CC = { key: 1 }, OC = ["innerHTML"], NC = ["aria-valuenow", "aria-valuemax"], SC = { key: 0 }, kC = {
  key: 4,
  class: "input-group input-group-sm"
}, LC = ["innerHTML"], IC = {
  key: 1,
  class: "input-group-text"
}, $C = ["name", "onUpdate:modelValue", "onChange"], DC = ["type", "onChange", "onUpdate:modelValue"], RC = ["onChange", "onUpdate:modelValue"], MC = ["value"], BC = ["innerHTML"], qC = {
  key: 5,
  class: "input-group-text"
}, PC = ["name", "onUpdate:modelValue", "onChange"], VC = { key: 5 }, jC = ["disabled", "onClick"], UC = ["innerHTML"], HC = { key: 2 }, WC = { key: 0 }, zC = ["colspan"], KC = { class: "row g-3 align-items-center" }, GC = { class: "col-form-label" }, YC = ["type", "onUpdate:modelValue", "onChange"], XC = ["onUpdate:modelValue", "onChange"], ZC = ["onUpdate:modelValue", "onChange"], JC = ["value"], QC = ["innerHTML"], tO = {
  key: 0,
  class: "bg-light text-dark"
}, eO = {
  key: 0,
  class: "vua-table-bulk border-info"
}, sO = ["data-label", "width"], nO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, iO = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, rO = ["type", "disabled", "onChange", "onUpdate:modelValue"], oO = ["disabled", "onChange", "onUpdate:modelValue"], aO = ["value"], lO = ["onClick"], cO = {
  key: 0,
  class: "bi bi-square text-secondary"
}, uO = {
  key: 1,
  class: "bi bi-check-square"
}, hO = { key: 2 }, dO = ["disabled", "onClick"], fO = ["innerHTML"], pO = { key: 2 }, gO = ["id"], mO = { class: "modal-dialog modal-xl" }, bO = { class: "modal-content h-100" };
function yO(e, t, s, n, i, r) {
  const a = qe("VuAdminTablePagination"), o = qe("VuAdminForm");
  return m(), b("div", null, [
    r.authAndSettings() ? (m(), b("div", {
      key: 0,
      class: k(["vua-table-container", [s.settings.class]]),
      "data-bs-theme": [s.settings.theme]
    }, [
      f("div", {
        class: k(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", GF, [
        f("div", YF, [
          f("div", XF, [
            s.settings.table.title ? (m(), b("h5", ZF, $(s.settings.table.title), 1)) : T("", !0),
            _t(f("div", JF, t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ws, i.ui.wait.table && s.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (m(), b("div", QF, [
            i.message.table ? (m(), b("small", tx, [
              f("span", {
                class: k(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, ex)
              ], 2)
            ])) : T("", !0),
            f("div", sx, [
              f("button", {
                class: k(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, nx),
              f("ul", ix, [
                (m(!0), b(dt, null, bt(i.messages.table, (l) => (m(), b("li", { key: l }, [
                  f("span", {
                    class: k(["dropdown-item", ["text-" + l.priority]])
                  }, [
                    f("small", rx, $(l.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: l.msg
                    }, null, 8, ox)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : T("", !0)
        ])
      ]),
      s.settings.table.control ? (m(), b("div", {
        key: 0,
        class: k(["vua-table-control", [s.settings.table.control.class]])
      }, [
        (m(!0), b(dt, null, bt(s.settings.table.control.buttons, (l) => (m(), b("span", {
          key: l.action
        }, [
          l.action !== "TABLE_COLUMNS" && !l.dropdowns ? (m(), b("button", {
            key: 0,
            type: "button",
            class: k([
              l.class ? l.class : r.getButtonClassByAction(l.action)
            ]),
            onClick: (c) => r.tableAction(l, {
              items: i.items,
              $event: c
            })
          }, [
            f("i", {
              class: k([
                l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                  button: l,
                  table: this
                }) : r.getButtonIconClassByAction(l.action)
              ])
            }, null, 2),
            At(" " + $(r.translate(l.title)), 1)
          ], 10, ax)) : T("", !0),
          l.action === "TABLE_COLUMNS" ? (m(), b("div", lx, [
            f("button", {
              type: "button",
              class: k([[
                l.class ? l.class : r.getButtonClassByAction(l.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              _t(f("span", cx, [
                f("i", {
                  class: k([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                At(" " + $(r.translate(l.title)) + " ", 1),
                r.countHiddenColumns() ? (m(), b("span", ux, " ( " + $(r.countHiddenColumns()) + " " + $(r.translate("hidden")) + " ) ", 1)) : T("", !0)
              ], 512), [
                [Ws, s.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", hx, [
              (m(!0), b(dt, null, bt(s.settings.table.columns, (c) => (m(), b("li", { key: c }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (d) => r.toggleColumn(c)
                }, [
                  c.hidden ? T("", !0) : (m(), b("i", fx)),
                  c.hidden ? (m(), b("i", px)) : T("", !0),
                  At(" " + $(c.title) + " ", 1),
                  f("small", gx, $(c.name), 1)
                ], 8, dx)
              ]))), 128)),
              t[16] || (t[16] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (c) => r.toggleColumn(!0))
                }, $(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (c) => r.toggleColumn(!1))
                }, $(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : T("", !0),
          l.dropdowns ? (m(), b("div", mx, [
            f("button", {
              type: "button",
              class: k([[l.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", bx, [
                f("i", {
                  class: k([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                At(" " + $(r.translate(l.title)), 1)
              ])
            ], 2),
            f("ul", yx, [
              (m(!0), b(dt, null, bt(l.dropdowns, (c) => (m(), b("li", { key: c }, [
                f("span", {
                  class: k(["dropdown-item cursor-pointer", [c.class]]),
                  onClick: (d) => r.tableAction(c, {
                    items: i.items,
                    $event: d
                  })
                }, [
                  c.icon ? (m(), b("i", {
                    key: 0,
                    class: k([c.icon])
                  }, null, 2)) : T("", !0),
                  At(" " + $(r.translate(c.title)), 1)
                ], 10, vx)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0),
      s.settings.table ? (m(), b("table", {
        key: 1,
        class: k(["table vua-table mb-0", [s.settings.table.class]])
      }, [
        f("thead", null, [
          f("tr", _x, [
            (m(!0), b(dt, null, bt(s.settings.table.columns, (l) => (m(), b("th", {
              class: k(["", [l.header ? l.header.class : ""]]),
              style: ni([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width
            }, [
              f("span", {
                class: k(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(l) }]),
                onClick: (c) => r.sortTable(l)
              }, [
                f("span", {
                  innerHTML: l.header && l.header.title !== void 0 ? r.translate(l.header.title) : l.title ? r.translate(l.title) : r.translate(l.name)
                }, null, 8, Ax),
                i.config.order[l.name] ? (m(), b("span", {
                  key: 0,
                  class: k(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[l.name].fixed
                  }])
                }, [
                  i.config.order[l.name].dir === "ASC" ? (m(), b("i", Tx)) : T("", !0),
                  i.config.order[l.name].dir === "DESC" ? (m(), b("i", Fx)) : T("", !0),
                  At(" " + $(i.config.order[l.name].idx + 1), 1)
                ], 2)) : T("", !0)
              ], 10, wx),
              l.header && l.header.buttons ? (m(), b("span", xx, [
                (m(!0), b(dt, null, bt(l.header.buttons, (c) => (m(), b("button", {
                  key: c.action,
                  type: "button",
                  disabled: c.disabled !== void 0 ? r.getValueOrFunction(c.disabled) : null,
                  class: k([
                    c.class ? c.class : r.getButtonClassByAction(c.action)
                  ]),
                  onClick: (d) => r.tableAction(c, {
                    items: i.items,
                    $event: d
                  })
                }, [
                  f("i", {
                    class: k([
                      c.icon !== void 0 ? r.getValueOrFunction(c.icon, {
                        button: c,
                        column: l,
                        table: this
                      }) : r.getButtonIconClassByAction(c.action)
                    ])
                  }, null, 2),
                  At(" " + $(r.translate(c.title)), 1)
                ], 10, Cx))), 128))
              ])) : T("", !0)
            ], 14, Ex))), 128))
          ]),
          r.countFilters() ? (m(), b("tr", Ox, [
            (m(!0), b(dt, null, bt(s.settings.table.columns, (l) => (m(), b("th", {
              style: ni([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width,
              class: k([l.filter ? l.filter.class : ""])
            }, [
              l.index && l.click ? (m(), b("div", Sx, [
                f("span", {
                  class: k(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (c) => r.toggleSelectedRowInPage())
                }, [
                  _t(f("i", kx, null, 512), [
                    [Ws, !r.haveSelectedRowInPage()]
                  ]),
                  _t(f("i", Lx, null, 512), [
                    [Ws, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : T("", !0),
              l.filter && l.filter.type == "text" ? (m(), b("div", Ix, [
                _t(f("input", {
                  type: "text",
                  class: k([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  onKeyup: t[3] || (t[3] = di((c) => r.reloadTable(), ["enter"]))
                }, null, 42, $x), [
                  [Me, l.filter.value]
                ]),
                l.filter.buttonx && l.filter.buttonx != !1 ? (m(), b("button", {
                  key: 0,
                  class: k(["btn btn-outline-secondary", {
                    "opacity-25": l.filter.value == null
                  }]),
                  disabled: l.filter.value == null,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, t[17] || (t[17] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, Dx)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "number" ? (m(), b("div", Rx, [
                l.filter.operators == !0 ? _t((m(), b("select", {
                  key: 0,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  disabled: l.filter.fixed,
                  onChange: t[4] || (t[4] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", Bx, $(r.translate("=")), 1),
                  f("option", qx, $(r.translate(">")), 1),
                  f("option", Px, $(r.translate(">=")), 1),
                  f("option", Vx, $(r.translate("<")), 1),
                  f("option", jx, $(r.translate("<=")), 1)
                ], 40, Mx)), [
                  [Xe, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? _t((m(), b("select", {
                  key: 1,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  disabled: l.filter.fixed,
                  onChange: t[5] || (t[5] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (m(!0), b(dt, null, bt(l.filter.operators, (c) => (m(), b("option", {
                    key: c,
                    value: c.value
                  }, $(c.label), 9, Hx))), 128))
                ], 40, Ux)), [
                  [Xe, l.filter.operator]
                ]) : T("", !0),
                _t(f("input", {
                  type: "number",
                  class: k(["form-control", {
                    fixed: l.filter.fixed
                  }]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  disabled: l.filter.fixed,
                  min: l.filter.min,
                  max: l.filter.max,
                  onChange: t[6] || (t[6] = (c) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = di((c) => r.reloadTable(), ["enter"]))
                }, null, 42, Wx), [
                  [Me, l.filter.value]
                ]),
                !l.filter.fixed && l.filter.buttonx && l.filter.buttonx != !1 ? (m(), b("button", {
                  key: 2,
                  class: k(["btn btn-outline-secondary", {
                    "opacity-25": l.filter.value == null
                  }]),
                  disabled: l.filter.value == null,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, t[18] || (t[18] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, zx)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "select" ? (m(), b("div", Kx, [
                l.filter.dropdown ? (m(), b("div", Gx, [
                  f("button", Yx, $(l.filter.multiple ? l.filter.value.length + " selected" : l.filter.value ? l.filter.value : "not selected"), 1),
                  f("ul", Xx, [
                    f("li", null, [
                      (m(!0), b(dt, null, bt(l.filter.options, (c) => (m(), b("span", {
                        key: c,
                        class: k(["dropdown-item cursor-pointer", { selected: l.filter.multiple ? l.filter.value.indexOf(c.value) >= 0 : l.filter.value === c.value }]),
                        onClick: (d) => r.dropdownSelectToggleOne(l.filter, c)
                      }, [
                        (l.filter.multiple ? l.filter.value.indexOf(c.value) >= 0 : l.filter.value === c.value) ? (m(), b("i", Jx)) : (m(), b("i", Qx)),
                        At(" " + $(r.translate(c.label ? c.label : c.value)), 1)
                      ], 10, Zx))), 128))
                    ]),
                    l.filter.multiple ? (m(), b("li", tC, t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : T("", !0),
                    l.filter.multiple ? (m(), b("li", eC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectAll(l.filter.value, l.filter.options)
                      }, $(r.translate("Select all")), 9, sC)
                    ])) : T("", !0),
                    l.filter.multiple ? (m(), b("li", nC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectClear(l.filter.value)
                      }, $(r.translate("Unselect all")), 9, iC)
                    ])) : T("", !0),
                    l.filter.multiple ? (m(), b("li", rC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectInvert(l.filter.value, l.filter.options)
                      }, $(r.translate("Invert all")), 9, oC)
                    ])) : T("", !0)
                  ])
                ])) : (m(), b("div", aC, [
                  _t(f("select", {
                    "onUpdate:modelValue": (c) => l.filter.value = c,
                    onChange: t[8] || (t[8] = (c) => r.reloadTable()),
                    multiple: l.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (m(!0), b(dt, null, bt(l.filter.options, (c) => (m(), b("option", {
                      key: c,
                      value: c.value
                    }, $(r.translate(c.label ? c.label : c.value)), 9, cC))), 128))
                  ], 40, lC), [
                    [Xe, l.filter.value]
                  ]),
                  l.filter.buttonx && l.filter.buttonx != !1 ? (m(), b("button", {
                    key: 0,
                    class: k(["btn btn-outline-secondary", {
                      "opacity-25": l.filter.value == null
                    }]),
                    disabled: l.filter.value == null,
                    onClick: (c) => {
                      l.filter.value = void 0, r.reloadTable();
                    }
                  }, t[20] || (t[20] = [
                    f("i", { class: "bi bi-x" }, null, -1)
                  ]), 10, uC)) : T("", !0)
                ]))
              ])) : T("", !0),
              l.filter && (l.filter.type == "datetime-local" || l.filter.type == "date") ? (m(), b("div", hC, [
                l.filter.operators == !0 ? _t((m(), b("select", {
                  key: 0,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  onChange: t[9] || (t[9] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", fC, $(r.translate("=")), 1),
                  f("option", pC, $(r.translate(">")), 1),
                  f("option", gC, $(r.translate(">=")), 1),
                  f("option", mC, $(r.translate("<")), 1),
                  f("option", bC, $(r.translate("<=")), 1)
                ], 40, dC)), [
                  [Xe, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? _t((m(), b("select", {
                  key: 1,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  onChange: t[10] || (t[10] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (m(!0), b(dt, null, bt(l.filter.operators, (c) => (m(), b("option", {
                    key: c,
                    value: c.value
                  }, $(r.translate(c.label)), 9, vC))), 128))
                ], 40, yC)), [
                  [Xe, l.filter.operator]
                ]) : T("", !0),
                _t(f("input", {
                  type: l.filter.type,
                  class: k([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  onChange: t[11] || (t[11] = (c) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = di((c) => r.reloadTable(), ["enter"]))
                }, null, 42, _C), [
                  [Pe, l.filter.value]
                ]),
                f("button", {
                  class: k(["btn btn-outline-secondary", {
                    "opacity-25": !l.filter.value
                  }]),
                  disabled: !l.filter.value,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, t[21] || (t[21] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, EC)
              ])) : T("", !0),
              l.filter && l.filter.buttons ? (m(), b("span", {
                key: 5,
                class: k(
                  r.getValueOrFunction(l.filter.buttons, {
                    column: l
                  })
                )
              }, [
                (m(!0), b(dt, null, bt(l.filter.buttons, (c) => (m(), b("span", {
                  key: c.action
                }, [
                  f("button", {
                    type: "button",
                    disabled: c.disabled !== void 0 ? r.getValueOrFunction(c.disabled) : null,
                    class: k([
                      c.class ? c.class : r.getButtonClassByAction(c.action)
                    ]),
                    onClick: (d) => r.tableAction(c, {
                      items: i.items,
                      $event: d
                    })
                  }, [
                    f("i", {
                      class: k([
                        c.icon !== void 0 ? r.getValueOrFunction(c.icon, {
                          button: c,
                          column: l,
                          table: this
                        }) : r.getButtonIconClassByAction(c.action)
                      ])
                    }, null, 2),
                    At(" " + $(r.translate(c.title)), 1)
                  ], 10, wC)
                ]))), 128))
              ], 2)) : T("", !0)
            ], 14, Nx))), 128))
          ])) : T("", !0)
        ]),
        f("tbody", null, [
          (m(!0), b(dt, null, bt(this.items, (l, c) => (m(), b(dt, {
            key: l.id
          }, [
            f("tr", AC, [
              (m(!0), b(dt, null, bt(s.settings.table.columns, (d) => (m(), b("td", {
                style: ni([d.hidden ? "display: none" : ""]),
                key: d.name,
                "data-label": d.title ? d.title : r.translate(d.name),
                width: d.width,
                class: k(
                  r.getValueOrFunction(d.class, {
                    column: d,
                    item: l
                  })
                ),
                onClick: (h) => r.tableAction(d, {
                  item: l,
                  index: c,
                  $event: h
                })
              }, [
                d.index ? (m(), b("div", FC, [
                  f("span", {
                    class: k(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(l[s.settings.pkey]) >= 0
                    }]),
                    innerHTML: c + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, xC)
                ])) : T("", !0),
                !d.template && !d.input && !d.progressbar ? (m(), b("span", CC, $(r.tableCellValue(d.name, l, c, d)), 1)) : T("", !0),
                d.template ? (m(), b("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(d.template, l, c, d)
                }, null, 8, OC)) : T("", !0),
                d.progressbar ? (m(), b("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": l[d.name],
                  "aria-valuemax": d.progressbar.max
                }, [
                  f("div", {
                    class: k(["progress-bar", [d.progressbar.class]]),
                    style: ni({ width: Math.round(l[d.name] / d.progressbar.max * 100) + "%" })
                  }, [
                    d.progressbar.value ? (m(), b("span", SC, $(l[d.name]), 1)) : T("", !0)
                  ], 6)
                ], 8, NC)) : T("", !0),
                d.input ? (m(), b("div", kC, [
                  d.input.prefix ? (m(), b("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.prefix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, LC)) : T("", !0),
                  d.input.prefixcheck ? (m(), b("span", IC, [
                    _t(f("input", {
                      class: "form-check p-0 m-0",
                      type: "checkbox",
                      name: d.input.prefixcheck.name,
                      "onUpdate:modelValue": (h) => l[d.input.prefixcheck.name] = h,
                      onChange: (h) => r.onRowInputChange(l[d.input.prefixcheck.name], d, l, c)
                    }, null, 40, $C), [
                      [_r, l[d.input.prefixcheck.name]]
                    ])
                  ])) : T("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    d.input.type
                  ) >= 0 ? _t((m(), b("input", {
                    key: 2,
                    type: d.input.type,
                    class: k(["form-control form-control-sm", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, c),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, null, 42, DC)), [
                    [Pe, l[d.name]]
                  ]) : T("", !0),
                  d.input.type == "select" ? _t((m(), b("select", {
                    key: 3,
                    class: k(["form-select form-select-sm pe-0", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, c),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, [
                    (m(!0), b(dt, null, bt(d.input.options, (h) => (m(), b("option", {
                      value: h.value,
                      key: h
                    }, $(r.translate(h.label)), 9, MC))), 128))
                  ], 42, RC)), [
                    [Xe, l[d.name]]
                  ]) : T("", !0),
                  d.input.suffix ? (m(), b("span", {
                    key: 4,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.suffix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, BC)) : T("", !0),
                  d.input.suffixcheck ? (m(), b("span", qC, [
                    _t(f("input", {
                      class: "form-check p-0 m-0",
                      type: "checkbox",
                      name: d.input.suffixcheck.name,
                      "onUpdate:modelValue": (h) => l[d.input.suffixcheck.name] = h,
                      onChange: (h) => r.onRowInputChange(l[d.input.suffixcheck.name], d, l, c)
                    }, null, 40, PC), [
                      [_r, l[d.input.suffixcheck.name]]
                    ])
                  ])) : T("", !0)
                ])) : T("", !0),
                d.buttons ? (m(), b("span", VC, [
                  (m(!0), b(dt, null, bt(d.buttons, (h) => (m(), b("span", {
                    key: h.action
                  }, [
                    h.hidden ? T("", !0) : (m(), b("button", {
                      key: 0,
                      type: "button",
                      disabled: h.disabled !== void 0 ? r.getValueOrFunction(h.disabled) : null,
                      class: k([
                        h.class ? r.getValueOrFunction(h.class, {
                          button: h,
                          column: d,
                          item: l,
                          table: this
                        }) : r.getButtonClassByAction(h.action)
                      ]),
                      onClick: (g) => r.tableAction(h, {
                        column: d,
                        item: l,
                        index: c,
                        $event: g
                      })
                    }, [
                      h.icon !== null ? (m(), b("i", {
                        key: 0,
                        class: k([
                          h.icon !== void 0 ? r.getValueOrFunction(h.icon, {
                            button: h,
                            column: d,
                            item: l,
                            table: this
                          }) : r.getButtonIconClassByAction(h.action)
                        ])
                      }, null, 2)) : T("", !0),
                      h.template ? (m(), b("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(h.template, l, c, d)
                      }, null, 8, UC)) : (m(), b("span", HC, $(r.translate(h.title)), 1))
                    ], 10, jC))
                  ]))), 128))
                ])) : T("", !0)
              ], 14, TC))), 128))
            ]),
            s.settings.table.details && i.details.indexOf(l[s.settings.pkey]) >= 0 ? (m(), b("tr", WC, [
              f("td", {
                class: k([s.settings.table.details.class]),
                colspan: s.settings.table.columns.length
              }, [
                (m(!0), b(dt, null, bt(s.settings.table.details.fields, (d) => (m(), b("div", {
                  class: "m-0",
                  key: d
                }, [
                  f("div", KC, [
                    f("div", {
                      class: k(["col text-end", [d.class]])
                    }, [
                      f("label", GC, $(d.label), 1)
                    ], 2),
                    f("div", {
                      class: k(["col", [d.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(d.input.type) < 0 ? _t((m(), b("input", {
                        key: 0,
                        type: d.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, null, 40, YC)), [
                        [Pe, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "textarea" ? _t((m(), b("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, `\r
                    `, 40, XC)), [
                        [Me, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "select" ? _t((m(), b("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, [
                        (m(!0), b(dt, null, bt(d.input.options, (h) => (m(), b("option", {
                          value: h.value,
                          key: h
                        }, $(r.translate(h.label)), 9, JC))), 128))
                      ], 40, ZC)), [
                        [Xe, l[d.name]]
                      ]) : T("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: s.settings.table.details.raw(l)
                }, null, 8, QC),
                s.settings.debug > 1 ? (m(), b("pre", tO, "                  " + $(l) + `
                `, 1)) : T("", !0)
              ], 10, zC)
            ])) : T("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (m(), b("tr", eO, [
            (m(!0), b(dt, null, bt(s.settings.table.columns, (l) => (m(), b("td", {
              style: ni([l.hidden ? "display: none" : ""]),
              key: l.name,
              "data-label": l.title,
              width: l.width,
              class: k(l.class)
            }, [
              l.index ? (m(), b("div", nO, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (c) => r.toggleSelectedAll())
                }, $(i.selected.length), 1)
              ])) : T("", !0),
              l.input && l.bulk && l.bulk.enabled ? (m(), b("div", iO, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  l.input.type
                ) >= 0 ? _t((m(), b("input", {
                  key: 0,
                  type: l.input.type,
                  class: k(["form-control form-control-sm", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (c) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (c) => i.bulkitem[l.name] = c
                }, null, 42, rO)), [
                  [Pe, i.bulkitem[l.name]]
                ]) : T("", !0),
                l.input.type == "select" ? _t((m(), b("select", {
                  key: 1,
                  class: k(["form-select form-select-sm pe-0", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (c) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (c) => i.bulkitem[l.name] = c
                }, [
                  (m(!0), b(dt, null, bt(l.input.options, (c) => (m(), b("option", {
                    value: c.value,
                    key: c
                  }, $(r.translate(c.label)), 9, aO))), 128))
                ], 42, oO)), [
                  [Xe, i.bulkitem[l.name]]
                ]) : T("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (c) => r.ifBulkInputClick(l)
                }, [
                  i.bulkitem[l.name] === void 0 ? (m(), b("i", cO)) : (m(), b("i", uO))
                ], 8, lO)
              ])) : T("", !0),
              l.bulk ? (m(), b("span", hO, [
                (m(!0), b(dt, null, bt(l.bulk.buttons, (c) => (m(), b("span", {
                  key: c.action
                }, [
                  f("button", {
                    type: "button",
                    class: k([
                      c.class ? c.class : r.getButtonClassByAction(c.action)
                    ]),
                    disabled: c.action === "save" && !this.bulkinputs.length,
                    onClick: (d) => r.tableBulkAction(c.action, i.bulkitem, l, d)
                  }, [
                    c.icon !== null ? (m(), b("i", {
                      key: 0,
                      class: k([
                        c.icon !== void 0 ? r.getValueOrFunction(c.icon, {
                          button: c,
                          column: l,
                          table: this
                        }) : r.getButtonIconClassByAction(c.action)
                      ])
                    }, null, 2)) : T("", !0),
                    c.template ? (m(), b("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(c.template, i.bulkitem, null, l)
                    }, null, 8, fO)) : (m(), b("span", pO, $(r.translate(c.title)), 1))
                  ], 10, dO)
                ]))), 128))
              ])) : T("", !0)
            ], 14, sO))), 128))
          ])) : T("", !0)
        ])
      ], 2)) : T("", !0),
      vr(a, {
        settings: s.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"])
    ], 10, KF)) : T("", !0),
    f("div", {
      class: "modal shadow",
      id: i.modalId,
      tabindex: "-1"
    }, [
      f("div", mO, [
        f("div", bO, [
          r.authAndSettings() && s.settings.form.visible && s.settings.form.groups ? (m(), gs(o, {
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
    ], 8, gO)
  ]);
}
const vO = /* @__PURE__ */ ke(zF, [["render", yO]]), _O = {
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
      if (!this.auth || !this.auth.success || !this.auth.user) {
        console.error("Authentication required");
        return;
      }
      if (!this.auth.settings || !this.auth.settings.entities || !this.auth.settings.entities[this.entity]) {
        console.error(`Entity config (${this.entity}) not found`);
        return;
      }
      const e = this.auth.settings.entitiesVariable ? this.auth.settings.entitiesVariable : "VuEntities";
      this.loadScript(this.auth.settings.entities[this.entity], () => {
        window[e] && window[e][this.entity] ? this.init(window[e][this.entity](this.preset)) : console.error(`Entity config (${this.entity}) not found`);
      }, e);
    },
    loadScript(e, t, s) {
      if (window[s] && window[s][this.entity]) {
        t && t();
        return;
      }
      const n = document.createElement("script");
      n.async = !0, n.src = e, n.onload = () => {
        t && t();
      }, n.onerror = () => {
      }, document.head.appendChild(n);
    },
    init(e) {
      if (e) {
        if (this.settings = qr(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
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
    VuAdminTable: vO
  }
}, EO = _O, wO = { key: 0 }, AO = ["data-bs-theme"];
function TO(e, t, s, n, i, r) {
  const a = qe("vu-admin-table");
  return e.entity && e.settings ? (m(), b("div", wO, [
    e.auth ? (m(), b("div", {
      key: 0,
      class: "vu-admin",
      "data-bs-theme": [e.settings.theme]
    }, [
      vr(a, {
        settings: e.settings,
        auth: e.auth
      }, null, 8, ["settings", "auth"])
    ], 8, AO)) : T("", !0)
  ])) : T("", !0);
}
const tS = /* @__PURE__ */ ke(EO, [["render", TO]]);
var aa = { exports: {} };
/*
 * [js-sha512]{@link https://github.com/emn178/js-sha512}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2024
 * @license MIT
 */
var gu;
function FO() {
  return gu || (gu = 1, function(e) {
    (function() {
      var t = "input is invalid type", s = "finalize already called", n = typeof window == "object", i = n ? window : {};
      i.JS_SHA512_NO_WINDOW && (n = !1);
      var r = !n && typeof self == "object", a = !i.JS_SHA512_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
      a ? i = ms : r && (i = self);
      var o = !i.JS_SHA512_NO_COMMON_JS && !0 && e.exports, l = !i.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", c = "0123456789abcdef".split(""), d = [-2147483648, 8388608, 32768, 128], h = [24, 16, 8, 0], g = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ], v = ["hex", "array", "digest", "arrayBuffer"], _ = [], F = Array.isArray;
      (i.JS_SHA512_NO_NODE_JS || !F) && (F = function(C) {
        return Object.prototype.toString.call(C) === "[object Array]";
      });
      var O = ArrayBuffer.isView;
      l && (i.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !O) && (O = function(C) {
        return typeof C == "object" && C.buffer && C.buffer.constructor === ArrayBuffer;
      });
      var I = function(C) {
        var P = typeof C;
        if (P === "string")
          return [C, !0];
        if (P !== "object" || C === null)
          throw new Error(t);
        if (l && C.constructor === ArrayBuffer)
          return [new Uint8Array(C), !1];
        if (!F(C) && !O(C))
          throw new Error(t);
        return [C, !1];
      }, j = function(C, P) {
        return function(y) {
          return new X(P, !0).update(y)[C]();
        };
      }, W = function(C) {
        var P = j("hex", C);
        P.create = function() {
          return new X(C);
        }, P.update = function(w) {
          return P.create().update(w);
        };
        for (var y = 0; y < v.length; ++y) {
          var x = v[y];
          P[x] = j(x, C);
        }
        return P;
      }, Y = function(C, P) {
        return function(y, x) {
          return new ft(y, P, !0).update(x)[C]();
        };
      }, G = function(C) {
        var P = Y("hex", C);
        P.create = function(w) {
          return new ft(w, C);
        }, P.update = function(w, N) {
          return P.create(w).update(N);
        };
        for (var y = 0; y < v.length; ++y) {
          var x = v[y];
          P[x] = Y(x, C);
        }
        return P;
      };
      function X(C, P) {
        P ? (_[0] = _[1] = _[2] = _[3] = _[4] = _[5] = _[6] = _[7] = _[8] = _[9] = _[10] = _[11] = _[12] = _[13] = _[14] = _[15] = _[16] = _[17] = _[18] = _[19] = _[20] = _[21] = _[22] = _[23] = _[24] = _[25] = _[26] = _[27] = _[28] = _[29] = _[30] = _[31] = _[32] = 0, this.blocks = _) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], C == 384 ? (this.h0h = 3418070365, this.h0l = 3238371032, this.h1h = 1654270250, this.h1l = 914150663, this.h2h = 2438529370, this.h2l = 812702999, this.h3h = 355462360, this.h3l = 4144912697, this.h4h = 1731405415, this.h4l = 4290775857, this.h5h = 2394180231, this.h5l = 1750603025, this.h6h = 3675008525, this.h6l = 1694076839, this.h7h = 1203062813, this.h7l = 3204075428) : C == 256 ? (this.h0h = 573645204, this.h0l = 4230739756, this.h1h = 2673172387, this.h1l = 3360449730, this.h2h = 596883563, this.h2l = 1867755857, this.h3h = 2520282905, this.h3l = 1497426621, this.h4h = 2519219938, this.h4l = 2827943907, this.h5h = 3193839141, this.h5l = 1401305490, this.h6h = 721525244, this.h6l = 746961066, this.h7h = 246885852, this.h7l = 2177182882) : C == 224 ? (this.h0h = 2352822216, this.h0l = 424955298, this.h1h = 1944164710, this.h1l = 2312950998, this.h2h = 502970286, this.h2l = 855612546, this.h3h = 1738396948, this.h3l = 1479516111, this.h4h = 258812777, this.h4l = 2077511080, this.h5h = 2011393907, this.h5l = 79989058, this.h6h = 1067287976, this.h6l = 1780299464, this.h7h = 286451373, this.h7l = 2446758561) : (this.h0h = 1779033703, this.h0l = 4089235720, this.h1h = 3144134277, this.h1l = 2227873595, this.h2h = 1013904242, this.h2l = 4271175723, this.h3h = 2773480762, this.h3l = 1595750129, this.h4h = 1359893119, this.h4l = 2917565137, this.h5h = 2600822924, this.h5l = 725511199, this.h6h = 528734635, this.h6l = 4215389547, this.h7h = 1541459225, this.h7l = 327033209), this.bits = C, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1;
      }
      X.prototype.update = function(C) {
        if (this.finalized)
          throw new Error(s);
        var P = I(C);
        C = P[0];
        for (var y = P[1], x, w = 0, N, R = C.length, A = this.blocks; w < R; ) {
          if (this.hashed && (this.hashed = !1, A[0] = this.block, this.block = A[1] = A[2] = A[3] = A[4] = A[5] = A[6] = A[7] = A[8] = A[9] = A[10] = A[11] = A[12] = A[13] = A[14] = A[15] = A[16] = A[17] = A[18] = A[19] = A[20] = A[21] = A[22] = A[23] = A[24] = A[25] = A[26] = A[27] = A[28] = A[29] = A[30] = A[31] = A[32] = 0), y)
            for (N = this.start; w < R && N < 128; ++w)
              x = C.charCodeAt(w), x < 128 ? A[N >>> 2] |= x << h[N++ & 3] : x < 2048 ? (A[N >>> 2] |= (192 | x >>> 6) << h[N++ & 3], A[N >>> 2] |= (128 | x & 63) << h[N++ & 3]) : x < 55296 || x >= 57344 ? (A[N >>> 2] |= (224 | x >>> 12) << h[N++ & 3], A[N >>> 2] |= (128 | x >>> 6 & 63) << h[N++ & 3], A[N >>> 2] |= (128 | x & 63) << h[N++ & 3]) : (x = 65536 + ((x & 1023) << 10 | C.charCodeAt(++w) & 1023), A[N >>> 2] |= (240 | x >>> 18) << h[N++ & 3], A[N >>> 2] |= (128 | x >>> 12 & 63) << h[N++ & 3], A[N >>> 2] |= (128 | x >>> 6 & 63) << h[N++ & 3], A[N >>> 2] |= (128 | x & 63) << h[N++ & 3]);
          else
            for (N = this.start; w < R && N < 128; ++w)
              A[N >>> 2] |= C[w] << h[N++ & 3];
          this.lastByteIndex = N, this.bytes += N - this.start, N >= 128 ? (this.block = A[32], this.start = N - 128, this.hash(), this.hashed = !0) : this.start = N;
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
      }, X.prototype.finalize = function() {
        if (!this.finalized) {
          this.finalized = !0;
          var C = this.blocks, P = this.lastByteIndex;
          C[32] = this.block, C[P >>> 2] |= d[P & 3], this.block = C[32], P >= 112 && (this.hashed || this.hash(), C[0] = this.block, C[1] = C[2] = C[3] = C[4] = C[5] = C[6] = C[7] = C[8] = C[9] = C[10] = C[11] = C[12] = C[13] = C[14] = C[15] = C[16] = C[17] = C[18] = C[19] = C[20] = C[21] = C[22] = C[23] = C[24] = C[25] = C[26] = C[27] = C[28] = C[29] = C[30] = C[31] = C[32] = 0), C[30] = this.hBytes << 3 | this.bytes >>> 29, C[31] = this.bytes << 3, this.hash();
        }
      }, X.prototype.hash = function() {
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, N = this.h2l, R = this.h3h, A = this.h3l, S = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, nt = this.h6h, tt = this.h6l, ot = this.h7h, it = this.h7l, H = this.blocks, Z, yt, st, gt, mt, M, B, q, J, Rt, ve, Le, os, as, Zt, le, _e, Wt, Ct, lt, ut, Et, wt, Jt, St;
        for (Z = 32; Z < 160; Z += 2)
          lt = H[Z - 30], ut = H[Z - 29], yt = (lt >>> 1 | ut << 31) ^ (lt >>> 8 | ut << 24) ^ lt >>> 7, st = (ut >>> 1 | lt << 31) ^ (ut >>> 8 | lt << 24) ^ (ut >>> 7 | lt << 25), lt = H[Z - 4], ut = H[Z - 3], gt = (lt >>> 19 | ut << 13) ^ (ut >>> 29 | lt << 3) ^ lt >>> 6, mt = (ut >>> 19 | lt << 13) ^ (lt >>> 29 | ut << 3) ^ (ut >>> 6 | lt << 26), lt = H[Z - 32], ut = H[Z - 31], Et = H[Z - 14], wt = H[Z - 13], M = (wt & 65535) + (ut & 65535) + (st & 65535) + (mt & 65535), B = (wt >>> 16) + (ut >>> 16) + (st >>> 16) + (mt >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (yt & 65535) + (gt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (yt >>> 16) + (gt >>> 16) + (q >>> 16), H[Z] = J << 16 | q & 65535, H[Z + 1] = B << 16 | M & 65535;
        var zt = C, Kt = P, Gt = y, Mt = x, Lt = w, Pt = N, Bt = R, It = A, Ot = S, qt = z, Vt = K, $t = U, jt = nt, Dt = tt, Ut = ot, Ht = it;
        for (le = Gt & Lt, _e = Mt & Pt, Z = 0; Z < 160; Z += 8)
          yt = (zt >>> 28 | Kt << 4) ^ (Kt >>> 2 | zt << 30) ^ (Kt >>> 7 | zt << 25), st = (Kt >>> 28 | zt << 4) ^ (zt >>> 2 | Kt << 30) ^ (zt >>> 7 | Kt << 25), gt = (Ot >>> 14 | qt << 18) ^ (Ot >>> 18 | qt << 14) ^ (qt >>> 9 | Ot << 23), mt = (qt >>> 14 | Ot << 18) ^ (qt >>> 18 | Ot << 14) ^ (Ot >>> 9 | qt << 23), Rt = zt & Gt, ve = Kt & Mt, Wt = Rt ^ zt & Lt ^ le, Ct = ve ^ Kt & Pt ^ _e, Jt = Ot & Vt ^ ~Ot & jt, St = qt & $t ^ ~qt & Dt, lt = H[Z], ut = H[Z + 1], Et = g[Z], wt = g[Z + 1], M = (wt & 65535) + (ut & 65535) + (St & 65535) + (mt & 65535) + (Ht & 65535), B = (wt >>> 16) + (ut >>> 16) + (St >>> 16) + (mt >>> 16) + (Ht >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (Jt & 65535) + (gt & 65535) + (Ut & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (Jt >>> 16) + (gt >>> 16) + (Ut >>> 16) + (q >>> 16), lt = J << 16 | q & 65535, ut = B << 16 | M & 65535, M = (Ct & 65535) + (st & 65535), B = (Ct >>> 16) + (st >>> 16) + (M >>> 16), q = (Wt & 65535) + (yt & 65535) + (B >>> 16), J = (Wt >>> 16) + (yt >>> 16) + (q >>> 16), Et = J << 16 | q & 65535, wt = B << 16 | M & 65535, M = (It & 65535) + (ut & 65535), B = (It >>> 16) + (ut >>> 16) + (M >>> 16), q = (Bt & 65535) + (lt & 65535) + (B >>> 16), J = (Bt >>> 16) + (lt >>> 16) + (q >>> 16), Ut = J << 16 | q & 65535, Ht = B << 16 | M & 65535, M = (wt & 65535) + (ut & 65535), B = (wt >>> 16) + (ut >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (q >>> 16), Bt = J << 16 | q & 65535, It = B << 16 | M & 65535, yt = (Bt >>> 28 | It << 4) ^ (It >>> 2 | Bt << 30) ^ (It >>> 7 | Bt << 25), st = (It >>> 28 | Bt << 4) ^ (Bt >>> 2 | It << 30) ^ (Bt >>> 7 | It << 25), gt = (Ut >>> 14 | Ht << 18) ^ (Ut >>> 18 | Ht << 14) ^ (Ht >>> 9 | Ut << 23), mt = (Ht >>> 14 | Ut << 18) ^ (Ht >>> 18 | Ut << 14) ^ (Ut >>> 9 | Ht << 23), Le = Bt & zt, os = It & Kt, Wt = Le ^ Bt & Gt ^ Rt, Ct = os ^ It & Mt ^ ve, Jt = Ut & Ot ^ ~Ut & Vt, St = Ht & qt ^ ~Ht & $t, lt = H[Z + 2], ut = H[Z + 3], Et = g[Z + 2], wt = g[Z + 3], M = (wt & 65535) + (ut & 65535) + (St & 65535) + (mt & 65535) + (Dt & 65535), B = (wt >>> 16) + (ut >>> 16) + (St >>> 16) + (mt >>> 16) + (Dt >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (Jt & 65535) + (gt & 65535) + (jt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (Jt >>> 16) + (gt >>> 16) + (jt >>> 16) + (q >>> 16), lt = J << 16 | q & 65535, ut = B << 16 | M & 65535, M = (Ct & 65535) + (st & 65535), B = (Ct >>> 16) + (st >>> 16) + (M >>> 16), q = (Wt & 65535) + (yt & 65535) + (B >>> 16), J = (Wt >>> 16) + (yt >>> 16) + (q >>> 16), Et = J << 16 | q & 65535, wt = B << 16 | M & 65535, M = (Pt & 65535) + (ut & 65535), B = (Pt >>> 16) + (ut >>> 16) + (M >>> 16), q = (Lt & 65535) + (lt & 65535) + (B >>> 16), J = (Lt >>> 16) + (lt >>> 16) + (q >>> 16), jt = J << 16 | q & 65535, Dt = B << 16 | M & 65535, M = (wt & 65535) + (ut & 65535), B = (wt >>> 16) + (ut >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (q >>> 16), Lt = J << 16 | q & 65535, Pt = B << 16 | M & 65535, yt = (Lt >>> 28 | Pt << 4) ^ (Pt >>> 2 | Lt << 30) ^ (Pt >>> 7 | Lt << 25), st = (Pt >>> 28 | Lt << 4) ^ (Lt >>> 2 | Pt << 30) ^ (Lt >>> 7 | Pt << 25), gt = (jt >>> 14 | Dt << 18) ^ (jt >>> 18 | Dt << 14) ^ (Dt >>> 9 | jt << 23), mt = (Dt >>> 14 | jt << 18) ^ (Dt >>> 18 | jt << 14) ^ (jt >>> 9 | Dt << 23), as = Lt & Bt, Zt = Pt & It, Wt = as ^ Lt & zt ^ Le, Ct = Zt ^ Pt & Kt ^ os, Jt = jt & Ut ^ ~jt & Ot, St = Dt & Ht ^ ~Dt & qt, lt = H[Z + 4], ut = H[Z + 5], Et = g[Z + 4], wt = g[Z + 5], M = (wt & 65535) + (ut & 65535) + (St & 65535) + (mt & 65535) + ($t & 65535), B = (wt >>> 16) + (ut >>> 16) + (St >>> 16) + (mt >>> 16) + ($t >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (Jt & 65535) + (gt & 65535) + (Vt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (Jt >>> 16) + (gt >>> 16) + (Vt >>> 16) + (q >>> 16), lt = J << 16 | q & 65535, ut = B << 16 | M & 65535, M = (Ct & 65535) + (st & 65535), B = (Ct >>> 16) + (st >>> 16) + (M >>> 16), q = (Wt & 65535) + (yt & 65535) + (B >>> 16), J = (Wt >>> 16) + (yt >>> 16) + (q >>> 16), Et = J << 16 | q & 65535, wt = B << 16 | M & 65535, M = (Mt & 65535) + (ut & 65535), B = (Mt >>> 16) + (ut >>> 16) + (M >>> 16), q = (Gt & 65535) + (lt & 65535) + (B >>> 16), J = (Gt >>> 16) + (lt >>> 16) + (q >>> 16), Vt = J << 16 | q & 65535, $t = B << 16 | M & 65535, M = (wt & 65535) + (ut & 65535), B = (wt >>> 16) + (ut >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (q >>> 16), Gt = J << 16 | q & 65535, Mt = B << 16 | M & 65535, yt = (Gt >>> 28 | Mt << 4) ^ (Mt >>> 2 | Gt << 30) ^ (Mt >>> 7 | Gt << 25), st = (Mt >>> 28 | Gt << 4) ^ (Gt >>> 2 | Mt << 30) ^ (Gt >>> 7 | Mt << 25), gt = (Vt >>> 14 | $t << 18) ^ (Vt >>> 18 | $t << 14) ^ ($t >>> 9 | Vt << 23), mt = ($t >>> 14 | Vt << 18) ^ ($t >>> 18 | Vt << 14) ^ (Vt >>> 9 | $t << 23), le = Gt & Lt, _e = Mt & Pt, Wt = le ^ Gt & Bt ^ as, Ct = _e ^ Mt & It ^ Zt, Jt = Vt & jt ^ ~Vt & Ut, St = $t & Dt ^ ~$t & Ht, lt = H[Z + 6], ut = H[Z + 7], Et = g[Z + 6], wt = g[Z + 7], M = (wt & 65535) + (ut & 65535) + (St & 65535) + (mt & 65535) + (qt & 65535), B = (wt >>> 16) + (ut >>> 16) + (St >>> 16) + (mt >>> 16) + (qt >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (Jt & 65535) + (gt & 65535) + (Ot & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (Jt >>> 16) + (gt >>> 16) + (Ot >>> 16) + (q >>> 16), lt = J << 16 | q & 65535, ut = B << 16 | M & 65535, M = (Ct & 65535) + (st & 65535), B = (Ct >>> 16) + (st >>> 16) + (M >>> 16), q = (Wt & 65535) + (yt & 65535) + (B >>> 16), J = (Wt >>> 16) + (yt >>> 16) + (q >>> 16), Et = J << 16 | q & 65535, wt = B << 16 | M & 65535, M = (Kt & 65535) + (ut & 65535), B = (Kt >>> 16) + (ut >>> 16) + (M >>> 16), q = (zt & 65535) + (lt & 65535) + (B >>> 16), J = (zt >>> 16) + (lt >>> 16) + (q >>> 16), Ot = J << 16 | q & 65535, qt = B << 16 | M & 65535, M = (wt & 65535) + (ut & 65535), B = (wt >>> 16) + (ut >>> 16) + (M >>> 16), q = (Et & 65535) + (lt & 65535) + (B >>> 16), J = (Et >>> 16) + (lt >>> 16) + (q >>> 16), zt = J << 16 | q & 65535, Kt = B << 16 | M & 65535;
        M = (P & 65535) + (Kt & 65535), B = (P >>> 16) + (Kt >>> 16) + (M >>> 16), q = (C & 65535) + (zt & 65535) + (B >>> 16), J = (C >>> 16) + (zt >>> 16) + (q >>> 16), this.h0h = J << 16 | q & 65535, this.h0l = B << 16 | M & 65535, M = (x & 65535) + (Mt & 65535), B = (x >>> 16) + (Mt >>> 16) + (M >>> 16), q = (y & 65535) + (Gt & 65535) + (B >>> 16), J = (y >>> 16) + (Gt >>> 16) + (q >>> 16), this.h1h = J << 16 | q & 65535, this.h1l = B << 16 | M & 65535, M = (N & 65535) + (Pt & 65535), B = (N >>> 16) + (Pt >>> 16) + (M >>> 16), q = (w & 65535) + (Lt & 65535) + (B >>> 16), J = (w >>> 16) + (Lt >>> 16) + (q >>> 16), this.h2h = J << 16 | q & 65535, this.h2l = B << 16 | M & 65535, M = (A & 65535) + (It & 65535), B = (A >>> 16) + (It >>> 16) + (M >>> 16), q = (R & 65535) + (Bt & 65535) + (B >>> 16), J = (R >>> 16) + (Bt >>> 16) + (q >>> 16), this.h3h = J << 16 | q & 65535, this.h3l = B << 16 | M & 65535, M = (z & 65535) + (qt & 65535), B = (z >>> 16) + (qt >>> 16) + (M >>> 16), q = (S & 65535) + (Ot & 65535) + (B >>> 16), J = (S >>> 16) + (Ot >>> 16) + (q >>> 16), this.h4h = J << 16 | q & 65535, this.h4l = B << 16 | M & 65535, M = (U & 65535) + ($t & 65535), B = (U >>> 16) + ($t >>> 16) + (M >>> 16), q = (K & 65535) + (Vt & 65535) + (B >>> 16), J = (K >>> 16) + (Vt >>> 16) + (q >>> 16), this.h5h = J << 16 | q & 65535, this.h5l = B << 16 | M & 65535, M = (tt & 65535) + (Dt & 65535), B = (tt >>> 16) + (Dt >>> 16) + (M >>> 16), q = (nt & 65535) + (jt & 65535) + (B >>> 16), J = (nt >>> 16) + (jt >>> 16) + (q >>> 16), this.h6h = J << 16 | q & 65535, this.h6l = B << 16 | M & 65535, M = (it & 65535) + (Ht & 65535), B = (it >>> 16) + (Ht >>> 16) + (M >>> 16), q = (ot & 65535) + (Ut & 65535) + (B >>> 16), J = (ot >>> 16) + (Ut >>> 16) + (q >>> 16), this.h7h = J << 16 | q & 65535, this.h7l = B << 16 | M & 65535;
      }, X.prototype.hex = function() {
        this.finalize();
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, N = this.h2l, R = this.h3h, A = this.h3l, S = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, nt = this.h6h, tt = this.h6l, ot = this.h7h, it = this.h7l, H = this.bits, Z = c[C >>> 28 & 15] + c[C >>> 24 & 15] + c[C >>> 20 & 15] + c[C >>> 16 & 15] + c[C >>> 12 & 15] + c[C >>> 8 & 15] + c[C >>> 4 & 15] + c[C & 15] + c[P >>> 28 & 15] + c[P >>> 24 & 15] + c[P >>> 20 & 15] + c[P >>> 16 & 15] + c[P >>> 12 & 15] + c[P >>> 8 & 15] + c[P >>> 4 & 15] + c[P & 15] + c[y >>> 28 & 15] + c[y >>> 24 & 15] + c[y >>> 20 & 15] + c[y >>> 16 & 15] + c[y >>> 12 & 15] + c[y >>> 8 & 15] + c[y >>> 4 & 15] + c[y & 15] + c[x >>> 28 & 15] + c[x >>> 24 & 15] + c[x >>> 20 & 15] + c[x >>> 16 & 15] + c[x >>> 12 & 15] + c[x >>> 8 & 15] + c[x >>> 4 & 15] + c[x & 15] + c[w >>> 28 & 15] + c[w >>> 24 & 15] + c[w >>> 20 & 15] + c[w >>> 16 & 15] + c[w >>> 12 & 15] + c[w >>> 8 & 15] + c[w >>> 4 & 15] + c[w & 15] + c[N >>> 28 & 15] + c[N >>> 24 & 15] + c[N >>> 20 & 15] + c[N >>> 16 & 15] + c[N >>> 12 & 15] + c[N >>> 8 & 15] + c[N >>> 4 & 15] + c[N & 15] + c[R >>> 28 & 15] + c[R >>> 24 & 15] + c[R >>> 20 & 15] + c[R >>> 16 & 15] + c[R >>> 12 & 15] + c[R >>> 8 & 15] + c[R >>> 4 & 15] + c[R & 15];
        return H >= 256 && (Z += c[A >>> 28 & 15] + c[A >>> 24 & 15] + c[A >>> 20 & 15] + c[A >>> 16 & 15] + c[A >>> 12 & 15] + c[A >>> 8 & 15] + c[A >>> 4 & 15] + c[A & 15]), H >= 384 && (Z += c[S >>> 28 & 15] + c[S >>> 24 & 15] + c[S >>> 20 & 15] + c[S >>> 16 & 15] + c[S >>> 12 & 15] + c[S >>> 8 & 15] + c[S >>> 4 & 15] + c[S & 15] + c[z >>> 28 & 15] + c[z >>> 24 & 15] + c[z >>> 20 & 15] + c[z >>> 16 & 15] + c[z >>> 12 & 15] + c[z >>> 8 & 15] + c[z >>> 4 & 15] + c[z & 15] + c[K >>> 28 & 15] + c[K >>> 24 & 15] + c[K >>> 20 & 15] + c[K >>> 16 & 15] + c[K >>> 12 & 15] + c[K >>> 8 & 15] + c[K >>> 4 & 15] + c[K & 15] + c[U >>> 28 & 15] + c[U >>> 24 & 15] + c[U >>> 20 & 15] + c[U >>> 16 & 15] + c[U >>> 12 & 15] + c[U >>> 8 & 15] + c[U >>> 4 & 15] + c[U & 15]), H == 512 && (Z += c[nt >>> 28 & 15] + c[nt >>> 24 & 15] + c[nt >>> 20 & 15] + c[nt >>> 16 & 15] + c[nt >>> 12 & 15] + c[nt >>> 8 & 15] + c[nt >>> 4 & 15] + c[nt & 15] + c[tt >>> 28 & 15] + c[tt >>> 24 & 15] + c[tt >>> 20 & 15] + c[tt >>> 16 & 15] + c[tt >>> 12 & 15] + c[tt >>> 8 & 15] + c[tt >>> 4 & 15] + c[tt & 15] + c[ot >>> 28 & 15] + c[ot >>> 24 & 15] + c[ot >>> 20 & 15] + c[ot >>> 16 & 15] + c[ot >>> 12 & 15] + c[ot >>> 8 & 15] + c[ot >>> 4 & 15] + c[ot & 15] + c[it >>> 28 & 15] + c[it >>> 24 & 15] + c[it >>> 20 & 15] + c[it >>> 16 & 15] + c[it >>> 12 & 15] + c[it >>> 8 & 15] + c[it >>> 4 & 15] + c[it & 15]), Z;
      }, X.prototype.toString = X.prototype.hex, X.prototype.digest = function() {
        this.finalize();
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, N = this.h2l, R = this.h3h, A = this.h3l, S = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, nt = this.h6h, tt = this.h6l, ot = this.h7h, it = this.h7l, H = this.bits, Z = [
          C >>> 24 & 255,
          C >>> 16 & 255,
          C >>> 8 & 255,
          C & 255,
          P >>> 24 & 255,
          P >>> 16 & 255,
          P >>> 8 & 255,
          P & 255,
          y >>> 24 & 255,
          y >>> 16 & 255,
          y >>> 8 & 255,
          y & 255,
          x >>> 24 & 255,
          x >>> 16 & 255,
          x >>> 8 & 255,
          x & 255,
          w >>> 24 & 255,
          w >>> 16 & 255,
          w >>> 8 & 255,
          w & 255,
          N >>> 24 & 255,
          N >>> 16 & 255,
          N >>> 8 & 255,
          N & 255,
          R >>> 24 & 255,
          R >>> 16 & 255,
          R >>> 8 & 255,
          R & 255
        ];
        return H >= 256 && Z.push(A >>> 24 & 255, A >>> 16 & 255, A >>> 8 & 255, A & 255), H >= 384 && Z.push(
          S >>> 24 & 255,
          S >>> 16 & 255,
          S >>> 8 & 255,
          S & 255,
          z >>> 24 & 255,
          z >>> 16 & 255,
          z >>> 8 & 255,
          z & 255,
          K >>> 24 & 255,
          K >>> 16 & 255,
          K >>> 8 & 255,
          K & 255,
          U >>> 24 & 255,
          U >>> 16 & 255,
          U >>> 8 & 255,
          U & 255
        ), H == 512 && Z.push(
          nt >>> 24 & 255,
          nt >>> 16 & 255,
          nt >>> 8 & 255,
          nt & 255,
          tt >>> 24 & 255,
          tt >>> 16 & 255,
          tt >>> 8 & 255,
          tt & 255,
          ot >>> 24 & 255,
          ot >>> 16 & 255,
          ot >>> 8 & 255,
          ot & 255,
          it >>> 24 & 255,
          it >>> 16 & 255,
          it >>> 8 & 255,
          it & 255
        ), Z;
      }, X.prototype.array = X.prototype.digest, X.prototype.arrayBuffer = function() {
        this.finalize();
        var C = this.bits, P = new ArrayBuffer(C / 8), y = new DataView(P);
        return y.setUint32(0, this.h0h), y.setUint32(4, this.h0l), y.setUint32(8, this.h1h), y.setUint32(12, this.h1l), y.setUint32(16, this.h2h), y.setUint32(20, this.h2l), y.setUint32(24, this.h3h), C >= 256 && y.setUint32(28, this.h3l), C >= 384 && (y.setUint32(32, this.h4h), y.setUint32(36, this.h4l), y.setUint32(40, this.h5h), y.setUint32(44, this.h5l)), C == 512 && (y.setUint32(48, this.h6h), y.setUint32(52, this.h6l), y.setUint32(56, this.h7h), y.setUint32(60, this.h7l)), P;
      }, X.prototype.clone = function() {
        var C = new X(this.bits, !1);
        return this.copyTo(C), C;
      }, X.prototype.copyTo = function(C) {
        var P = 0, y = [
          "h0h",
          "h0l",
          "h1h",
          "h1l",
          "h2h",
          "h2l",
          "h3h",
          "h3l",
          "h4h",
          "h4l",
          "h5h",
          "h5l",
          "h6h",
          "h6l",
          "h7h",
          "h7l",
          "start",
          "bytes",
          "hBytes",
          "finalized",
          "hashed",
          "lastByteIndex"
        ];
        for (P = 0; P < y.length; ++P)
          C[y[P]] = this[y[P]];
        for (P = 0; P < this.blocks.length; ++P)
          C.blocks[P] = this.blocks[P];
      };
      function ft(C, P, y) {
        var x, w = I(C);
        if (C = w[0], w[1]) {
          for (var N = [], R = C.length, A = 0, S, x = 0; x < R; ++x)
            S = C.charCodeAt(x), S < 128 ? N[A++] = S : S < 2048 ? (N[A++] = 192 | S >>> 6, N[A++] = 128 | S & 63) : S < 55296 || S >= 57344 ? (N[A++] = 224 | S >>> 12, N[A++] = 128 | S >>> 6 & 63, N[A++] = 128 | S & 63) : (S = 65536 + ((S & 1023) << 10 | C.charCodeAt(++x) & 1023), N[A++] = 240 | S >>> 18, N[A++] = 128 | S >>> 12 & 63, N[A++] = 128 | S >>> 6 & 63, N[A++] = 128 | S & 63);
          C = N;
        }
        C.length > 128 && (C = new X(P, !0).update(C).array());
        for (var z = [], K = [], x = 0; x < 128; ++x) {
          var U = C[x] || 0;
          z[x] = 92 ^ U, K[x] = 54 ^ U;
        }
        X.call(this, P, y), this.update(K), this.oKeyPad = z, this.inner = !0, this.sharedMemory = y;
      }
      ft.prototype = new X(), ft.prototype.finalize = function() {
        if (X.prototype.finalize.call(this), this.inner) {
          this.inner = !1;
          var C = this.array();
          X.call(this, this.bits, this.sharedMemory), this.update(this.oKeyPad), this.update(C), X.prototype.finalize.call(this);
        }
      }, ft.prototype.clone = function() {
        var C = new ft([], this.bits, !1);
        this.copyTo(C), C.inner = this.inner;
        for (var P = 0; P < this.oKeyPad.length; ++P)
          C.oKeyPad[P] = this.oKeyPad[P];
        return C;
      };
      var pt = W(512);
      pt.sha512 = pt, pt.sha384 = W(384), pt.sha512_256 = W(256), pt.sha512_224 = W(224), pt.sha512.hmac = G(512), pt.sha384.hmac = G(384), pt.sha512_256.hmac = G(256), pt.sha512_224.hmac = G(224), o ? e.exports = pt : (i.sha512 = pt.sha512, i.sha384 = pt.sha384, i.sha512_256 = pt.sha512_256, i.sha512_224 = pt.sha512_224);
    })();
  }(aa)), aa.exports;
}
var xO = FO();
sl();
const CO = {
  name: "VuAuth",
  props: {
    modelValue: Object
  },
  data() {
    return {
      theme: "light",
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
      loading: !1,
      modalId: null,
      modalElement: null,
      modalWindow: null
    };
  },
  components: {
    VuAdminForm: Fd
  },
  watch: {
    modelValue(e, t) {
      e != t && (this.auth = e, this.updateInputs(), this.$forceUpdate());
    }
  },
  methods: {
    detectQuery() {
      const e = new URL(window.location.href);
      if (e.searchParams.has("vuparams")) {
        let t = e.searchParams.get("vuparams");
        if (t) {
          let s = JSON.parse(t);
          s.panel && (this.auth.panel = s.panel, this.auth.visible = !0, this.auth.inputs = s.inputs ? s.inputs : null, this.updateInputs()), e.searchParams.delete("vuparams"), window.history.replaceState({}, "", e.toString());
        }
      }
    },
    updateInputs() {
      this.auth.inputs && (this.inputs = Object.assign(this.inputs, this.auth.inputs));
    },
    checkStorage() {
      let e = localStorage.getItem("vu-user"), t = localStorage.getItem("vu-header"), s = localStorage.getItem("vu-settings");
      typeof e == "string" && e && e[0] === "{" && (this.auth.user = JSON.parse(e)), typeof t == "string" && t && t[0] === "{" && (this.auth.header = JSON.parse(t)), typeof s == "string" && s && s[0] === "{" && (this.auth.settings = JSON.parse(s)), !this.auth.user || !this.auth.header ? this.logout() : (this.auth.success = !0, this.authUpdate());
    },
    async loadProfile() {
      try {
        if (!(await fetch(this.settings.api.profile, {
          method: "GET",
          headers: this.auth.header
        })).ok) {
          this.onError("profile");
          return;
        }
      } catch {
        this.onError("profile");
      }
    },
    logout() {
      this.auth.success = !1, this.auth.header = null, this.auth.settings = null, this.auth.user = null, this.authUpdate(), localStorage.removeItem("vu-user"), localStorage.removeItem("vu-header"), localStorage.removeItem("vu-settings");
    },
    reset() {
      this.password = "", this.password_again = "", this.auth.response = {};
    },
    close() {
      this.auth.visible = !1, this.authUpdate(), this.reset();
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
    toggleType(e) {
      this.settings[e].type = this.settings[e].type !== "password" ? "password" : "text", this.$forceUpdate();
    },
    async getStatusAndJson(e) {
      this.auth.response.code = e.status;
      try {
        this.auth.response.data = await e.json();
      } catch (t) {
        this.auth.response.data = null, console.error("Error parsing response:", t);
      }
    },
    onSuccess(e) {
      this.auth.response.ok = !0, this.settings.onSuccess && this.settings.onSuccess[e] && (this.settings.onSuccess[e](this.auth), this.auth.header || (this.auth.header = {}), this.auth.user.role ? this.auth.header["X-Auth-Role"] = this.auth.user.role : this.auth.user.roles && (this.auth.user.role = this.auth.user.roles[0], this.auth.header["X-Auth-Role"] = this.auth.user.role), this.auth.user.token && (this.auth.header["X-Auth-Token"] = this.auth.user.token), this.auth.success = !0, localStorage.setItem("vu-user", JSON.stringify(this.auth.user)), localStorage.setItem("vu-header", JSON.stringify(this.auth.header)), localStorage.setItem("vu-settings", JSON.stringify(this.auth.settings))), setTimeout(() => {
        this.authUpdate(), this.$forceUpdate();
      }, 0);
    },
    onError(e) {
      this.auth.success = !1, this.auth.response.ok = !1, this.settings.onError && this.settings.onError[e] && this.settings.onError[e](this.auth), setTimeout(() => {
        this.authUpdate(), this.$forceUpdate();
      }, 0);
    },
    onPasswordReset(e) {
      this.auth.response.ok = !0, this.settings.onSuccess && this.settings.onSuccess[e] && this.settings.onSuccess[e](this.auth), setTimeout(() => {
        this.$forceUpdate();
      }, 0);
    },
    onPasswordUpdate(e) {
      this.auth.response.ok = !0, this.settings.onSuccess && this.settings.onSuccess[e] && this.settings.onSuccess[e](this.auth), setTimeout(() => {
        this.$forceUpdate();
      }, 0);
    },
    async handleSubmit() {
      this.loading = !0;
      try {
        switch (this.auth.panel) {
          case "login":
            await this.handleLogin();
            break;
          case "forgot":
            await this.handleForgotPasswordSubmit();
            break;
          case "registration":
            await this.handleNewRegistrationSubmit();
            break;
          case "activation":
            await this.handleActivationSubmit();
            break;
          case "password":
            await this.handlePasswordSubmit();
            break;
        }
      } finally {
        this.loading = !1;
      }
    },
    async handleLogin() {
      if (this.auth.response = {}, !this.username || !this.password)
        return;
      const e = await fetch(this.settings.api.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          password: await this.hashPassword(this.password),
          accept: this.accepts
        })
      });
      await this.getStatusAndJson(e), e.ok ? (this.onSuccess("login"), this.close()) : this.onError("login");
    },
    async handleNewRegistrationSubmit() {
      if (this.auth.response = {}, !this.username || !this.password || !this.password_again || this.password !== this.password_again)
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
      await this.getStatusAndJson(e), e.ok ? this.onSuccess("registration") : this.onError("registration");
    },
    async handleActivationSubmit() {
      this.auth.response = {};
      const e = await fetch(this.settings.api.activation, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.inputs)
      });
      await this.getStatusAndJson(e), e.ok ? (this.onSuccess("activation"), this.close()) : this.onError("activation");
    },
    async handleForgotPasswordSubmit() {
      this.auth.response = {};
      try {
        const e = await fetch(this.settings.api.forgot, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username
          })
        });
        await this.getStatusAndJson(e), e.ok ? this.onPasswordReset("forgot") : this.onError("forgot");
      } catch {
        this.onError("forgot");
      }
    },
    async handlePasswordSubmit() {
      if (this.auth.response = {}, !(!this.password || !this.password_again || this.password !== this.password_again))
        try {
          const e = await fetch(this.settings.api.password, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...this.auth.header
            },
            body: JSON.stringify({
              password: await this.hashPassword(this.password),
              ...this.inputs
            })
          });
          await this.getStatusAndJson(e), e.ok ? this.onPasswordUpdate("password") : this.onError("password");
        } catch {
          this.onError("password");
        }
    },
    async hashPassword(e) {
      return this.settings.password.hash = this.settings.password.hash === void 0 ? 0 : this.settings.password.hash, this.generateHash(e, this.settings.password.hash);
    },
    async generateHash(e, t) {
      let s = e;
      for (let n = 0; n < t; n++)
        s = xO.sha512(s);
      return s;
    },
    authUpdate() {
      this.$emit("update:modelValue", this.auth);
    },
    handleEscapeKey(e) {
      e.key === "Escape" && this.close();
    },
    getValueOrFunction(e, t) {
      return nn(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return Kn(e, this.settings.translate, t, s || this.settings.language);
    },
    onCaptchaClick() {
      console.log("reCAPTCHA clicked");
    }
  },
  created() {
    window.VuSettings && window.VuSettings.auth && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", this.settings = window.VuSettings.auth);
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
      success: !1,
      response: {
        ok: !1,
        message: null,
        data: null
      }
    }), console.log(this.auth), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.detectQuery(), this.settings.debug && console.log("vu-auth mounted ", "1.2.132");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }
}, OO = CO, NO = ["data-bs-theme"], SO = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, kO = { class: "position-absolute top-0 end-0 p-0 m-2" }, LO = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary"
}, IO = { class: "text-center mt-2 mb-4" }, $O = {
  key: 0,
  class: "mb-3"
}, DO = {
  for: "email",
  class: "form-label text-primary"
}, RO = { class: "input-group" }, MO = ["type", "placeholder", "disabled"], BO = ["innerHTML"], qO = { class: "mb-3" }, PO = {
  key: 0,
  for: "password",
  class: "form-label text-primary"
}, VO = { class: "input-group" }, jO = ["type", "placeholder", "pattern", "minlength", "disabled"], UO = {
  key: 0,
  class: "bi bi-eye"
}, HO = {
  key: 1,
  class: "bi bi-eye-slash"
}, WO = ["innerHTML"], zO = {
  key: 0,
  class: "mb-4"
}, KO = {
  for: "password_again",
  class: "form-label text-primary"
}, GO = ["innerHTML"], YO = { class: "input-group" }, XO = ["type", "placeholder", "minlength", "disabled"], ZO = {
  key: 0,
  class: "bi bi-eye"
}, JO = {
  key: 1,
  class: "bi bi-eye-slash"
}, QO = ["innerHTML"], tN = { class: "mb-3 text-center" }, eN = ["data-sitekey"], sN = {
  key: 2,
  class: "mb-4 text-center"
}, nN = ["innerHTML"], iN = {
  key: 3,
  class: "d-flex mb-4"
}, rN = ["innerHTML"], oN = { class: "row" }, aN = { class: "mb-3" }, lN = ["for", "innerHTML"], cN = { class: "input-group" }, uN = ["innerHTML"], hN = ["disabled", "required", "onUpdate:modelValue", "multiple"], dN = ["value", "innerHTML"], fN = ["id", "name", "type", "onUpdate:modelValue", "placeholder", "required", "disabled"], pN = ["innerHTML"], gN = ["innerHTML"], mN = {
  key: 0,
  class: "form-check"
}, bN = ["id", "name", "onUpdate:modelValue", "required", "disabled"], yN = ["for", "innerHTML"], vN = {
  key: 4,
  class: "mt-4"
}, _N = ["innerHTML"], EN = {
  key: 5,
  class: "mt-3 text-center"
}, wN = ["innerHTML"], AN = { class: "mt-4 d-flex justify-content-between" }, TN = ["disabled"], FN = ["disabled"], xN = ["disabled"], CN = {
  key: 0,
  class: "bi bi-person-plus mx-1"
}, ON = {
  key: 1,
  class: "bi bi-arrow-right-square mx-1"
}, NN = { class: "mt-2 text-end" }, SN = ["disabled"], kN = ["id"], LN = { class: "modal-dialog modal-xl" }, IN = { class: "modal-content h-100" };
function $N(e, t, s, n, i, r) {
  const a = qe("VuAdminForm");
  return e.auth && e.auth.visible ? (m(), b("div", {
    key: 0,
    class: "vua-auth",
    "data-bs-theme": [e.theme]
  }, [
    f("div", {
      class: "row d-flex justify-content-center align-items-center min-vh-100",
      onClick: t[14] || (t[14] = Qt((...o) => e.close && e.close(...o), ["stop"]))
    }, [
      f("div", SO, [
        f("div", {
          class: "card shadow p-4 position-relative",
          onClick: t[13] || (t[13] = Qt(() => {
          }, ["stop"]))
        }, [
          f("div", kO, [
            e.loading ? (m(), b("i", LO)) : T("", !0),
            f("button", {
              type: "button",
              class: "btn p-2",
              onClick: t[0] || (t[0] = Qt((...o) => e.close && e.close(...o), ["stop"]))
            }, t[16] || (t[16] = [
              f("i", { class: "bi bi-x px-1 text-muted" }, null, -1)
            ]))
          ]),
          f("h1", IO, $(e.settings.title[e.auth.panel]), 1),
          f("form", {
            onSubmit: t[11] || (t[11] = Qt((o) => e.handleSubmit(), ["prevent"])),
            onClick: t[12] || (t[12] = Qt(() => {
            }, ["stop"]))
          }, [
            e.auth.panel != "activation" && e.auth.panel != "password" ? (m(), b("div", $O, [
              f("label", DO, $(e.settings.username.label), 1),
              f("div", RO, [
                e.settings.username.icon ? (m(), b("span", {
                  key: 0,
                  class: k(["input-group-text", { "rounded-bottom-0": e.settings.username.help }])
                }, [
                  f("i", {
                    class: k([e.settings.username.icon])
                  }, null, 2)
                ], 2)) : T("", !0),
                _t(f("input", {
                  id: "email",
                  name: "email",
                  type: e.settings.username.type,
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => e.username = o),
                  class: k(["form-control", { "rounded-bottom-0": e.settings.username.help }]),
                  placeholder: e.settings.username.placeholder,
                  required: "",
                  disabled: e.loading
                }, null, 10, MO), [
                  [Pe, e.username]
                ])
              ]),
              e.settings.username.help ? (m(), b("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                innerHTML: e.settings.username.help
              }, null, 8, BO)) : T("", !0)
            ])) : T("", !0),
            e.auth.panel != "forgot" && e.auth.panel != "activation" ? (m(), b(dt, { key: 1 }, [
              f("div", qO, [
                e.settings.password.label ? (m(), b("label", PO, $(e.settings.password.label), 1)) : T("", !0),
                f("div", VO, [
                  e.settings.password.icon ? (m(), b("span", {
                    key: 0,
                    class: k(["input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }])
                  }, [
                    f("i", {
                      class: k([e.settings.password.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  _t(f("input", {
                    id: "password",
                    name: "password",
                    type: e.settings.password.type,
                    "onUpdate:modelValue": t[2] || (t[2] = (o) => e.password = o),
                    class: k(["form-control", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    placeholder: e.settings.password.placeholder,
                    pattern: e.settings.password.pattern,
                    minlength: e.auth.panel == "registration" ? e.settings.password.minlength : 1,
                    required: "",
                    disabled: e.loading
                  }, null, 10, jO), [
                    [Pe, e.password]
                  ]),
                  e.auth.panel == "registration" || e.auth.panel == "password" ? (m(), b("span", {
                    key: 1,
                    class: k(["input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }])
                  }, [
                    f("small", {
                      class: k(["", {
                        "text-success": e.password.length >= e.settings.password.minlength,
                        "text-danger": e.password.length < e.settings.password.minlength
                      }])
                    }, $(e.password.length), 3)
                  ], 2)) : T("", !0),
                  f("span", {
                    class: k(["cursor-pointer input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }]),
                    onClick: t[3] || (t[3] = Qt((o) => e.toggleType("password"), ["stop"]))
                  }, [
                    e.settings.password.type == "password" ? (m(), b("i", UO)) : (m(), b("i", HO))
                  ], 2)
                ]),
                (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help ? (m(), b("small", {
                  key: 1,
                  class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                  innerHTML: e.settings.password.help
                }, null, 8, WO)) : T("", !0)
              ]),
              e.auth.panel === "registration" || e.auth.panel === "password" ? (m(), b("div", zO, [
                f("label", KO, [
                  At($(e.settings.password_again.label) + " ", 1),
                  e.password_again.length > 0 && e.password_again != e.password ? (m(), b("small", {
                    key: 0,
                    class: "text-danger",
                    innerHTML: e.settings.password_again.nomatch
                  }, null, 8, GO)) : T("", !0)
                ]),
                f("div", YO, [
                  e.settings.password.icon ? (m(), b("span", {
                    key: 0,
                    class: k(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("i", {
                      class: k([e.settings.password_again.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  _t(f("input", {
                    id: "password_again",
                    name: "password_again",
                    type: e.settings.password_again.type,
                    "onUpdate:modelValue": t[4] || (t[4] = (o) => e.password_again = o),
                    class: k(["form-control", { "rounded-bottom-0": e.settings.password_again.help }]),
                    placeholder: e.settings.password_again.placeholder,
                    minlength: e.settings.password.minlength,
                    required: "",
                    disabled: e.loading
                  }, null, 10, XO), [
                    [Pe, e.password_again]
                  ]),
                  f("span", {
                    class: k(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("small", {
                      class: k(["", {
                        "text-success": e.password_again.length >= e.settings.password.minlength,
                        "text-danger": e.password_again.length < e.settings.password.minlength
                      }])
                    }, $(e.password_again.length), 3)
                  ], 2),
                  f("span", {
                    class: k(["cursor-pointer input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password_again.help }]),
                    onClick: t[5] || (t[5] = Qt((o) => e.toggleType("password_again"), ["stop"]))
                  }, [
                    e.settings.password_again.type == "password" ? (m(), b("i", ZO)) : (m(), b("i", JO))
                  ], 2)
                ]),
                (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password_again.help ? (m(), b("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                  innerHTML: e.settings.password_again.help
                }, null, 8, QO)) : T("", !0)
              ])) : T("", !0),
              f("div", tN, [
                f("div", {
                  class: "g-recaptcha",
                  "data-sitekey": e.recaptchaSiteKey,
                  onClick: t[6] || (t[6] = Qt((...o) => e.onCaptchaClick && e.onCaptchaClick(...o), ["stop"]))
                }, null, 8, eN)
              ])
            ], 64)) : T("", !0),
            e.auth.panel == "login" && e.settings.password.forgot ? (m(), b("div", sN, [
              f("button", {
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[7] || (t[7] = Qt((...o) => e.toggleForgotPassword && e.toggleForgotPassword(...o), ["stop"])),
                innerHTML: e.settings.password.forgot
              }, null, 8, nN)
            ])) : T("", !0),
            e.auth.panel == "forgot" && e.settings.help && e.settings.help.forgot ? (m(), b("div", iN, [
              f("small", {
                class: "text-muted",
                innerHTML: e.settings.help.forgot
              }, null, 8, rN)
            ])) : T("", !0),
            f("div", oN, [
              (m(!0), b(dt, null, bt(e.settings.inputs, (o, l) => (m(), b(dt, { key: l }, [
                o.panels.indexOf(e.auth.panel) >= 0 && !o.hidden ? (m(), b("div", {
                  key: 0,
                  class: k([o.colclass ? o.colclass : "col-md-12"])
                }, [
                  f("div", aN, [
                    o.label ? (m(), b("label", {
                      key: 0,
                      for: l,
                      class: k(["form-label text-primary", { required: o.required }]),
                      innerHTML: e.getValueOrFunction(o.label)
                    }, null, 10, lN)) : T("", !0),
                    f("div", cN, [
                      o.prefix ? (m(), b("span", {
                        key: 0,
                        class: k(["input-group-text", { "rounded-bottom-0": o.help }]),
                        innerHTML: e.getValueOrFunction(o.prefix)
                      }, null, 10, uN)) : T("", !0),
                      o.type == "select" ? _t((m(), b("select", {
                        key: 1,
                        class: "form-select",
                        disabled: e.loading,
                        required: o.required,
                        "onUpdate:modelValue": (c) => e.inputs[l] = c,
                        multiple: o.multiple
                      }, [
                        t[17] || (t[17] = f("option", null, null, -1)),
                        (m(!0), b(dt, null, bt(o.options, (c) => (m(), b("option", {
                          key: c,
                          value: c.value,
                          innerHTML: e.getValueOrFunction(c.label)
                        }, null, 8, dN))), 128))
                      ], 8, hN)), [
                        [Xe, e.inputs[l]]
                      ]) : _t((m(), b("input", {
                        key: 2,
                        id: l,
                        name: l,
                        type: o.type,
                        "onUpdate:modelValue": (c) => e.inputs[l] = c,
                        class: k(["form-control", { "rounded-bottom-0": o.help }]),
                        placeholder: o.placeholder,
                        required: o.required,
                        disabled: e.loading
                      }, null, 10, fN)), [
                        [Pe, e.inputs[l]]
                      ]),
                      o.suffix ? (m(), b("span", {
                        key: 3,
                        class: k(["input-group-text", { "rounded-bottom-0": o.help }]),
                        innerHTML: e.getValueOrFunction(o.suffix)
                      }, null, 10, pN)) : T("", !0)
                    ]),
                    o.help ? (m(), b("small", {
                      key: 1,
                      class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                      innerHTML: e.getValueOrFunction(o.help)
                    }, null, 8, gN)) : T("", !0)
                  ])
                ], 2)) : T("", !0)
              ], 64))), 128))
            ]),
            (m(!0), b(dt, null, bt(e.settings.accepts, (o) => (m(), b("div", { key: o }, [
              o.panels.indexOf(e.auth.panel) >= 0 ? (m(), b("div", mN, [
                _t(f("input", {
                  type: "checkbox",
                  class: "form-check-input",
                  id: "accept_" + o.name,
                  name: "accept_" + o.name,
                  "onUpdate:modelValue": (l) => e.accepts[o.name] = l,
                  required: o.required,
                  disabled: e.loading
                }, null, 8, bN), [
                  [_r, e.accepts[o.name]]
                ]),
                o.label ? (m(), b("label", {
                  key: 0,
                  class: "form-check-label",
                  for: "accept_" + o.name,
                  innerHTML: e.getValueOrFunction(o.label)
                }, null, 8, yN)) : T("", !0)
              ])) : T("", !0)
            ]))), 128)),
            e.auth.panel == "registration" && e.settings.help && e.settings.help.registration ? (m(), b("div", vN, [
              f("div", {
                innerHTML: e.getValueOrFunction(e.settings.help.registration)
              }, null, 8, _N)
            ])) : T("", !0),
            e.auth.response.message ? (m(), b("div", EN, [
              f("div", {
                class: k({ "text-danger": !e.auth.response.ok, "text-success": e.auth.response.ok }),
                innerHTML: e.auth.response.message
              }, null, 10, wN)
            ])) : T("", !0),
            f("div", AN, [
              e.auth.panel != "login" && e.auth.panel != "activation" ? (m(), b("button", {
                key: 0,
                type: "button",
                onClick: t[8] || (t[8] = Qt((...o) => e.toggleClear && e.toggleClear(...o), ["stop"])),
                class: "btn btn-secondary w-100 me-2 text-nowrap",
                disabled: e.loading
              }, [
                t[18] || (t[18] = f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1)),
                At(" " + $(e.settings.submit.login), 1)
              ], 8, TN)) : T("", !0),
              e.auth.panel == "login" ? (m(), b("button", {
                key: 1,
                type: "button",
                class: "btn btn-warning w-100 me-2 text-nowrap",
                onClick: t[9] || (t[9] = Qt((...o) => e.toggleNewRegistration && e.toggleNewRegistration(...o), ["stop"])),
                disabled: e.loading
              }, [
                t[19] || (t[19] = f("i", { class: "bi bi-person-plus mx-1" }, null, -1)),
                At(" " + $(e.settings.submit.registration), 1)
              ], 8, FN)) : T("", !0),
              f("button", {
                type: "submit",
                class: k(["btn w-100 text-nowrap", { "btn-primary": e.auth.panel != "registration", "btn-warning": e.auth.panel == "registration" }]),
                disabled: e.loading
              }, [
                At($(e.settings.submit[e.auth.panel]) + " ", 1),
                e.auth.panel == "registration" ? (m(), b("i", CN)) : (m(), b("i", ON))
              ], 10, xN)
            ]),
            f("div", NN, [
              f("button", {
                type: "button",
                onClick: t[10] || (t[10] = Qt((...o) => e.close && e.close(...o), ["stop"])),
                class: "btn btn-light border w-100 me-1",
                disabled: e.loading
              }, [
                At($(e.settings.submit.cancel) + " ", 1),
                t[20] || (t[20] = f("i", { class: "bi bi-x-square mx-1" }, null, -1))
              ], 8, SN)
            ])
          ], 32)
        ])
      ])
    ]),
    f("div", {
      class: "modal shadow",
      id: e.modalId,
      tabindex: "-1"
    }, [
      f("div", LN, [
        f("div", IN, [
          e.settings.form && e.settings.form.visible && e.settings.form.groups ? (m(), gs(a, {
            key: 0,
            modelValue: e.item,
            "onUpdate:modelValue": t[15] || (t[15] = (o) => e.item = o),
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
    ], 8, kN)
  ], 8, NO)) : T("", !0);
}
const eS = /* @__PURE__ */ ke(OO, [["render", $N]]);
sl();
const DN = {
  name: "VuUserButton",
  props: {
    modelValue: Object,
    panel: String
  },
  data() {
    return {
      theme: "light",
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
    // Auth state management
    updateAuth() {
      this.$emit("update:modelValue", this.auth);
    },
    togglePanel() {
      this.auth.visible = !this.auth.visible, this.auth.panel = this.panel ? this.panel : "login", this.updateAuth();
    },
    setSelectedRole(e) {
      this.auth.user.role = e, this.auth.header["X-Auth-Role"] = this.auth.user.role, localStorage.setItem("vu-user", JSON.stringify(this.auth.user)), localStorage.setItem("vu-header", JSON.stringify(this.auth.header));
    },
    logout() {
      this.auth.visible = !1, this.auth.user = null, this.auth.header = null, this.auth.success = !1, this.auth.settings = null, this.updateAuth(), localStorage.removeItem("vu-user"), localStorage.removeItem("vu-header"), localStorage.removeItem("vu-settings");
    },
    // Dropdown handling
    dropdownAction(e, t) {
      t && t.stopPropagation(), e.action && e.action({
        dropdown: e,
        settings: this.settings
      }, this);
    },
    // Utility methods
    getValueOrFunction(e, t) {
      return nn(e, t, this.settings, this);
    }
  },
  created() {
    window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel]));
  },
  mounted() {
  }
}, RN = DN, MN = ["data-bs-theme"], BN = {
  key: 0,
  class: "dropdown"
}, qN = ["innerHTML"], PN = {
  class: "dropdown-menu dropdown-menu-end",
  "aria-labelledby": "userDropdown"
}, VN = ["innerHTML"], jN = ["onClick"], UN = ["onClick", "innerHTML"], HN = {
  key: 1,
  class: "d-inline-block"
}, WN = ["innerHTML"];
function zN(e, t, s, n, i, r) {
  return !e.auth.user && e.panel != "login" || e.panel == "login" ? (m(), b("div", {
    key: 0,
    class: "vua-user-button d-inline-block",
    "data-bs-theme": [e.theme]
  }, [
    e.auth.user ? (m(), b("div", BN, [
      f("button", {
        class: k(["dropdown-toggle", [e.settings.class]]),
        type: "button",
        id: "userDropdown",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }, [
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, qN)
      ], 2),
      f("ul", PN, [
        (m(!0), b(dt, null, bt(e.settings.dropdowns, (a) => (m(), b(dt, { key: a }, [
          a.action == "BUTTON_ROLES" ? (m(), b("li", {
            key: 0,
            class: k([[a.class], "d-flex items-align-center"])
          }, [
            f("span", {
              innerHTML: e.getValueOrFunction(a.label),
              class: "me-2"
            }, null, 8, VN),
            (m(!0), b(dt, null, bt(e.auth.user.roles, (o) => (m(), b("button", {
              key: o,
              onClick: (l) => e.setSelectedRole(o),
              class: k(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": o == e.auth.user.role }])
            }, $(o), 11, jN))), 128))
          ], 2)) : (m(), b("li", {
            key: 1,
            class: k([a.class]),
            onClick: (o) => e.dropdownAction(a),
            innerHTML: e.getValueOrFunction(a.label)
          }, null, 10, UN))
        ], 64))), 128))
      ])
    ])) : (m(), b("div", HN, [
      f("button", {
        class: k([e.settings.class]),
        type: "button",
        onClick: t[0] || (t[0] = (...a) => e.togglePanel && e.togglePanel(...a))
      }, [
        e.settings.icon ? (m(), b("i", {
          key: 0,
          class: k([e.settings.icon])
        }, null, 2)) : T("", !0),
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, WN)
      ], 2)
    ]))
  ], 8, MN)) : T("", !0);
}
const sS = /* @__PURE__ */ ke(RN, [["render", zN]]);
export {
  tS as VuAdmin,
  eS as VuAuth,
  sS as VuUserButton
};
