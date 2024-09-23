var Ld = Object.defineProperty;
var xd = (s, t, e) => t in s ? Ld(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var M = (s, t, e) => xd(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as y, createElementBlock as _, createElementVNode as m, normalizeClass as D, Fragment as W, renderList as z, toDisplayString as x, createCommentVNode as C, withDirectives as X, vModelText as pe, createTextVNode as Y, resolveComponent as ai, vModelCheckbox as kd, vModelSelect as Ie, createBlock as ea, vModelDynamic as hn, vShow as ws, normalizeStyle as Gn, withKeys as Oo, createVNode as hu, withModifiers as Id } from "vue";
var At = "top", kt = "bottom", It = "right", wt = "left", Er = "auto", Cn = [At, kt, It, wt], Ss = "start", mn = "end", du = "clippingParents", Ma = "viewport", en = "popper", fu = "reference", sa = /* @__PURE__ */ Cn.reduce(function(s, t) {
  return s.concat([t + "-" + Ss, t + "-" + mn]);
}, []), qa = /* @__PURE__ */ [].concat(Cn, [Er]).reduce(function(s, t) {
  return s.concat([t, t + "-" + Ss, t + "-" + mn]);
}, []), pu = "beforeRead", gu = "read", mu = "afterRead", bu = "beforeMain", yu = "main", _u = "afterMain", vu = "beforeWrite", Eu = "write", Tu = "afterWrite", Au = [pu, gu, mu, bu, yu, _u, vu, Eu, Tu];
function _e(s) {
  return s ? (s.nodeName || "").toLowerCase() : null;
}
function Rt(s) {
  if (s == null)
    return window;
  if (s.toString() !== "[object Window]") {
    var t = s.ownerDocument;
    return t && t.defaultView || window;
  }
  return s;
}
function Ls(s) {
  var t = Rt(s).Element;
  return s instanceof t || s instanceof Element;
}
function Ft(s) {
  var t = Rt(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
}
function Ba(s) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Rt(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
}
function Rd(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !Ft(r) || !_e(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var c = i[o];
      c === !1 ? r.removeAttribute(o) : r.setAttribute(o, c === !0 ? "" : c);
    }));
  });
}
function Dd(s) {
  var t = s.state, e = {
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
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var i = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]), c = o.reduce(function(a, l) {
        return a[l] = "", a;
      }, {});
      !Ft(i) || !_e(i) || (Object.assign(i.style, c), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const $a = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Rd,
  effect: Dd,
  requires: ["computeStyles"]
};
function ge(s) {
  return s.split("-")[0];
}
var Cs = Math.max, ur = Math.min, bn = Math.round;
function na() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function wu() {
  return !/^((?!chrome|android).)*safari/i.test(na());
}
function yn(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Ft(s) && (i = s.offsetWidth > 0 && bn(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && bn(n.height) / s.offsetHeight || 1);
  var o = Ls(s) ? Rt(s) : window, c = o.visualViewport, a = !wu() && e, l = (n.left + (a && c ? c.offsetLeft : 0)) / i, h = (n.top + (a && c ? c.offsetTop : 0)) / r, f = n.width / i, p = n.height / r;
  return {
    width: f,
    height: p,
    top: h,
    right: l + f,
    bottom: h + p,
    left: l,
    x: l,
    y: h
  };
}
function Pa(s) {
  var t = yn(s), e = s.offsetWidth, n = s.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: s.offsetLeft,
    y: s.offsetTop,
    width: e,
    height: n
  };
}
function Nu(s, t) {
  var e = t.getRootNode && t.getRootNode();
  if (s.contains(t))
    return !0;
  if (e && Ba(e)) {
    var n = t;
    do {
      if (n && s.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function Me(s) {
  return Rt(s).getComputedStyle(s);
}
function Md(s) {
  return ["table", "td", "th"].indexOf(_e(s)) >= 0;
}
function is(s) {
  return ((Ls(s) ? s.ownerDocument : (
    // $FlowFixMe[prop-missing]
    s.document
  )) || window.document).documentElement;
}
function Tr(s) {
  return _e(s) === "html" ? s : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    s.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    s.parentNode || // DOM Element detected
    (Ba(s) ? s.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    is(s)
  );
}
function Cl(s) {
  return !Ft(s) || // https://github.com/popperjs/popper-core/issues/837
  Me(s).position === "fixed" ? null : s.offsetParent;
}
function qd(s) {
  var t = /firefox/i.test(na()), e = /Trident/i.test(na());
  if (e && Ft(s)) {
    var n = Me(s);
    if (n.position === "fixed")
      return null;
  }
  var i = Tr(s);
  for (Ba(i) && (i = i.host); Ft(i) && ["html", "body"].indexOf(_e(i)) < 0; ) {
    var r = Me(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function bi(s) {
  for (var t = Rt(s), e = Cl(s); e && Md(e) && Me(e).position === "static"; )
    e = Cl(e);
  return e && (_e(e) === "html" || _e(e) === "body" && Me(e).position === "static") ? t : e || qd(s) || t;
}
function ja(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function ei(s, t, e) {
  return Cs(s, ur(t, e));
}
function Bd(s, t, e) {
  var n = ei(s, t, e);
  return n > e ? e : n;
}
function Ou() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Cu(s) {
  return Object.assign({}, Ou(), s);
}
function Su(s, t) {
  return t.reduce(function(e, n) {
    return e[n] = s, e;
  }, {});
}
var $d = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Cu(typeof t != "number" ? t : Su(t, Cn));
};
function Pd(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, c = ge(e.placement), a = ja(c), l = [wt, It].indexOf(c) >= 0, h = l ? "height" : "width";
  if (!(!r || !o)) {
    var f = $d(i.padding, e), p = Pa(r), g = a === "y" ? At : wt, v = a === "y" ? kt : It, E = e.rects.reference[h] + e.rects.reference[a] - o[a] - e.rects.popper[h], T = o[a] - e.rects.reference[a], A = bi(r), N = A ? a === "y" ? A.clientHeight || 0 : A.clientWidth || 0 : 0, S = E / 2 - T / 2, L = f[g], I = N - p[h] - f[v], R = N / 2 - p[h] / 2 + S, P = ei(L, R, I), V = a;
    e.modifiersData[n] = (t = {}, t[V] = P, t.centerOffset = P - R, t);
  }
}
function jd(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Nu(t.elements.popper, i) && (t.elements.arrow = i));
}
const Lu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Pd,
  effect: jd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function _n(s) {
  return s.split("-")[1];
}
var Ud = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Vd(s, t) {
  var e = s.x, n = s.y, i = t.devicePixelRatio || 1;
  return {
    x: bn(e * i) / i || 0,
    y: bn(n * i) / i || 0
  };
}
function Sl(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, c = s.position, a = s.gpuAcceleration, l = s.adaptive, h = s.roundOffsets, f = s.isFixed, p = o.x, g = p === void 0 ? 0 : p, v = o.y, E = v === void 0 ? 0 : v, T = typeof h == "function" ? h({
    x: g,
    y: E
  }) : {
    x: g,
    y: E
  };
  g = T.x, E = T.y;
  var A = o.hasOwnProperty("x"), N = o.hasOwnProperty("y"), S = wt, L = At, I = window;
  if (l) {
    var R = bi(e), P = "clientHeight", V = "clientWidth";
    if (R === Rt(e) && (R = is(e), Me(R).position !== "static" && c === "absolute" && (P = "scrollHeight", V = "scrollWidth")), R = R, i === At || (i === wt || i === It) && r === mn) {
      L = kt;
      var J = f && R === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        R[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === wt || (i === At || i === kt) && r === mn) {
      S = It;
      var tt = f && R === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        R[V]
      );
      g -= tt - n.width, g *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: c
  }, l && Ud), ot = h === !0 ? Vd({
    x: g,
    y: E
  }, Rt(e)) : {
    x: g,
    y: E
  };
  if (g = ot.x, E = ot.y, a) {
    var it;
    return Object.assign({}, nt, (it = {}, it[L] = N ? "0" : "", it[S] = A ? "0" : "", it.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + E + "px)" : "translate3d(" + g + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[L] = N ? E + "px" : "", t[S] = A ? g + "px" : "", t.transform = "", t));
}
function Fd(s) {
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, c = e.roundOffsets, a = c === void 0 ? !0 : c, l = {
    placement: ge(t.placement),
    variation: _n(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Sl(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Sl(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Ua = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Fd,
  data: {}
};
var Wi = {
  passive: !0
};
function Hd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, c = o === void 0 ? !0 : o, a = Rt(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && l.forEach(function(h) {
    h.addEventListener("scroll", e.update, Wi);
  }), c && a.addEventListener("resize", e.update, Wi), function() {
    r && l.forEach(function(h) {
      h.removeEventListener("scroll", e.update, Wi);
    }), c && a.removeEventListener("resize", e.update, Wi);
  };
}
const Va = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Hd,
  data: {}
};
var Wd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ir(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return Wd[t];
  });
}
var zd = {
  start: "end",
  end: "start"
};
function Ll(s) {
  return s.replace(/start|end/g, function(t) {
    return zd[t];
  });
}
function Fa(s) {
  var t = Rt(s), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Ha(s) {
  return yn(is(s)).left + Fa(s).scrollLeft;
}
function Kd(s, t) {
  var e = Rt(s), n = is(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var l = wu();
    (l || !l && t === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: c + Ha(s),
    y: a
  };
}
function Gd(s) {
  var t, e = is(s), n = Fa(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = Cs(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Cs(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -n.scrollLeft + Ha(s), a = -n.scrollTop;
  return Me(i || e).direction === "rtl" && (c += Cs(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: c,
    y: a
  };
}
function Wa(s) {
  var t = Me(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function xu(s) {
  return ["html", "body", "#document"].indexOf(_e(s)) >= 0 ? s.ownerDocument.body : Ft(s) && Wa(s) ? s : xu(Tr(s));
}
function si(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = xu(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Wa(n) ? n : []) : n, c = t.concat(o);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(si(Tr(o)))
  );
}
function ia(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
}
function Yd(s, t) {
  var e = yn(s, !1, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
}
function xl(s, t, e) {
  return t === Ma ? ia(Kd(s, e)) : Ls(t) ? Yd(t, e) : ia(Gd(is(s)));
}
function Xd(s) {
  var t = si(Tr(s)), e = ["absolute", "fixed"].indexOf(Me(s).position) >= 0, n = e && Ft(s) ? bi(s) : s;
  return Ls(n) ? t.filter(function(i) {
    return Ls(i) && Nu(i, n) && _e(i) !== "body";
  }) : [];
}
function Zd(s, t, e, n) {
  var i = t === "clippingParents" ? Xd(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], c = r.reduce(function(a, l) {
    var h = xl(s, l, n);
    return a.top = Cs(h.top, a.top), a.right = ur(h.right, a.right), a.bottom = ur(h.bottom, a.bottom), a.left = Cs(h.left, a.left), a;
  }, xl(s, o, n));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function ku(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? ge(n) : null, r = n ? _n(n) : null, o = t.x + t.width / 2 - e.width / 2, c = t.y + t.height / 2 - e.height / 2, a;
  switch (i) {
    case At:
      a = {
        x: o,
        y: t.y - e.height
      };
      break;
    case kt:
      a = {
        x: o,
        y: t.y + t.height
      };
      break;
    case It:
      a = {
        x: t.x + t.width,
        y: c
      };
      break;
    case wt:
      a = {
        x: t.x - e.width,
        y: c
      };
      break;
    default:
      a = {
        x: t.x,
        y: t.y
      };
  }
  var l = i ? ja(i) : null;
  if (l != null) {
    var h = l === "y" ? "height" : "width";
    switch (r) {
      case Ss:
        a[l] = a[l] - (t[h] / 2 - e[h] / 2);
        break;
      case mn:
        a[l] = a[l] + (t[h] / 2 - e[h] / 2);
        break;
    }
  }
  return a;
}
function vn(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, c = e.boundary, a = c === void 0 ? du : c, l = e.rootBoundary, h = l === void 0 ? Ma : l, f = e.elementContext, p = f === void 0 ? en : f, g = e.altBoundary, v = g === void 0 ? !1 : g, E = e.padding, T = E === void 0 ? 0 : E, A = Cu(typeof T != "number" ? T : Su(T, Cn)), N = p === en ? fu : en, S = s.rects.popper, L = s.elements[v ? N : p], I = Zd(Ls(L) ? L : L.contextElement || is(s.elements.popper), a, h, o), R = yn(s.elements.reference), P = ku({
    reference: R,
    element: S,
    strategy: "absolute",
    placement: i
  }), V = ia(Object.assign({}, S, P)), J = p === en ? V : R, tt = {
    top: I.top - J.top + A.top,
    bottom: J.bottom - I.bottom + A.bottom,
    left: I.left - J.left + A.left,
    right: J.right - I.right + A.right
  }, nt = s.modifiersData.offset;
  if (p === en && nt) {
    var ot = nt[i];
    Object.keys(tt).forEach(function(it) {
      var Mt = [It, kt].indexOf(it) >= 0 ? 1 : -1, qt = [At, kt].indexOf(it) >= 0 ? "y" : "x";
      tt[it] += ot[qt] * Mt;
    });
  }
  return tt;
}
function Qd(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, c = e.flipVariations, a = e.allowedAutoPlacements, l = a === void 0 ? qa : a, h = _n(n), f = h ? c ? sa : sa.filter(function(v) {
    return _n(v) === h;
  }) : Cn, p = f.filter(function(v) {
    return l.indexOf(v) >= 0;
  });
  p.length === 0 && (p = f);
  var g = p.reduce(function(v, E) {
    return v[E] = vn(s, {
      placement: E,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[ge(E)], v;
  }, {});
  return Object.keys(g).sort(function(v, E) {
    return g[v] - g[E];
  });
}
function Jd(s) {
  if (ge(s) === Er)
    return [];
  var t = ir(s);
  return [Ll(s), t, Ll(t)];
}
function tf(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !0 : o, a = e.fallbackPlacements, l = e.padding, h = e.boundary, f = e.rootBoundary, p = e.altBoundary, g = e.flipVariations, v = g === void 0 ? !0 : g, E = e.allowedAutoPlacements, T = t.options.placement, A = ge(T), N = A === T, S = a || (N || !v ? [ir(T)] : Jd(T)), L = [T].concat(S).reduce(function(Gt, H) {
      return Gt.concat(ge(H) === Er ? Qd(t, {
        placement: H,
        boundary: h,
        rootBoundary: f,
        padding: l,
        flipVariations: v,
        allowedAutoPlacements: E
      }) : H);
    }, []), I = t.rects.reference, R = t.rects.popper, P = /* @__PURE__ */ new Map(), V = !0, J = L[0], tt = 0; tt < L.length; tt++) {
      var nt = L[tt], ot = ge(nt), it = _n(nt) === Ss, Mt = [At, kt].indexOf(ot) >= 0, qt = Mt ? "width" : "height", ut = vn(t, {
        placement: nt,
        boundary: h,
        rootBoundary: f,
        altBoundary: p,
        padding: l
      }), vt = Mt ? it ? It : wt : it ? kt : At;
      I[qt] > R[qt] && (vt = ir(vt));
      var Ve = ir(vt), Kt = [];
      if (r && Kt.push(ut[ot] <= 0), c && Kt.push(ut[vt] <= 0, ut[Ve] <= 0), Kt.every(function(Gt) {
        return Gt;
      })) {
        J = nt, V = !1;
        break;
      }
      P.set(nt, Kt);
    }
    if (V)
      for (var K = v ? 3 : 1, cs = function(H) {
        var ae = L.find(function(Fe) {
          var at = P.get(Fe);
          if (at)
            return at.slice(0, H).every(function(He) {
              return He;
            });
        });
        if (ae)
          return J = ae, "break";
      }, Ae = K; Ae > 0; Ae--) {
        var pt = cs(Ae);
        if (pt === "break") break;
      }
    t.placement !== J && (t.modifiersData[n]._skip = !0, t.placement = J, t.reset = !0);
  }
}
const Iu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: tf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function kl(s, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: s.top - t.height - e.y,
    right: s.right - t.width + e.x,
    bottom: s.bottom - t.height + e.y,
    left: s.left - t.width - e.x
  };
}
function Il(s) {
  return [At, It, kt, wt].some(function(t) {
    return s[t] >= 0;
  });
}
function ef(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = vn(t, {
    elementContext: "reference"
  }), c = vn(t, {
    altBoundary: !0
  }), a = kl(o, n), l = kl(c, i, r), h = Il(a), f = Il(l);
  t.modifiersData[e] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: l,
    isReferenceHidden: h,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": f
  });
}
const Ru = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ef
};
function sf(s, t, e) {
  var n = ge(s), i = [wt, At].indexOf(n) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: s
  })) : e, o = r[0], c = r[1];
  return o = o || 0, c = (c || 0) * i, [wt, It].indexOf(n) >= 0 ? {
    x: c,
    y: o
  } : {
    x: o,
    y: c
  };
}
function nf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = qa.reduce(function(h, f) {
    return h[f] = sf(f, t.rects, r), h;
  }, {}), c = o[t.placement], a = c.x, l = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += l), t.modifiersData[n] = o;
}
const Du = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: nf
};
function rf(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = ku({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const za = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: rf,
  data: {}
};
function of(s) {
  return s === "x" ? "y" : "x";
}
function af(s) {
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !1 : o, a = e.boundary, l = e.rootBoundary, h = e.altBoundary, f = e.padding, p = e.tether, g = p === void 0 ? !0 : p, v = e.tetherOffset, E = v === void 0 ? 0 : v, T = vn(t, {
    boundary: a,
    rootBoundary: l,
    padding: f,
    altBoundary: h
  }), A = ge(t.placement), N = _n(t.placement), S = !N, L = ja(A), I = of(L), R = t.modifiersData.popperOffsets, P = t.rects.reference, V = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
      var it, Mt = L === "y" ? At : wt, qt = L === "y" ? kt : It, ut = L === "y" ? "height" : "width", vt = R[L], Ve = vt + T[Mt], Kt = vt - T[qt], K = g ? -V[ut] / 2 : 0, cs = N === Ss ? P[ut] : V[ut], Ae = N === Ss ? -V[ut] : -P[ut], pt = t.elements.arrow, Gt = g && pt ? Pa(pt) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ou(), ae = H[Mt], Fe = H[qt], at = ei(0, P[ut], Gt[ut]), He = S ? P[ut] / 2 - K - at - ae - tt.mainAxis : cs - at - ae - tt.mainAxis, Vs = S ? -P[ut] / 2 + K + at + Fe + tt.mainAxis : Ae + at + Fe + tt.mainAxis, we = t.elements.arrow && bi(t.elements.arrow), us = we ? L === "y" ? we.clientTop || 0 : we.clientLeft || 0 : 0, hs = (it = nt == null ? void 0 : nt[L]) != null ? it : 0, ds = vt + He - hs - us, Fs = vt + Vs - hs, We = ei(g ? ur(Ve, ds) : Ve, vt, g ? Cs(Kt, Fs) : Kt);
      R[L] = We, ot[L] = We - vt;
    }
    if (c) {
      var fs, In = L === "x" ? At : wt, Rn = L === "x" ? kt : It, Nt = R[I], le = I === "y" ? "height" : "width", ps = Nt + T[In], gs = Nt - T[Rn], Ot = [At, wt].indexOf(A) !== -1, Ne = (fs = nt == null ? void 0 : nt[I]) != null ? fs : 0, Hs = Ot ? ps : Nt - P[le] - V[le] - Ne + tt.altAxis, ce = Ot ? Nt + P[le] + V[le] - Ne - tt.altAxis : gs, Oe = g && Ot ? Bd(Hs, Nt, ce) : ei(g ? Hs : ps, Nt, g ? ce : gs);
      R[I] = Oe, ot[I] = Oe - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const Mu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: af,
  requiresIfExists: ["offset"]
};
function lf(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
}
function cf(s) {
  return s === Rt(s) || !Ft(s) ? Fa(s) : lf(s);
}
function uf(s) {
  var t = s.getBoundingClientRect(), e = bn(t.width) / s.offsetWidth || 1, n = bn(t.height) / s.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function hf(s, t, e) {
  e === void 0 && (e = !1);
  var n = Ft(t), i = Ft(t) && uf(t), r = is(t), o = yn(s, i, e), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((_e(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Wa(r)) && (c = cf(t)), Ft(t) ? (a = yn(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Ha(r))), {
    x: o.left + c.scrollLeft - a.x,
    y: o.top + c.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function df(s) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), n = [];
  s.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    e.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(c) {
      if (!e.has(c)) {
        var a = t.get(c);
        a && i(a);
      }
    }), n.push(r);
  }
  return s.forEach(function(r) {
    e.has(r.name) || i(r);
  }), n;
}
function ff(s) {
  var t = df(s);
  return Au.reduce(function(e, n) {
    return e.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function pf(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(s());
      });
    })), t;
  };
}
function gf(s) {
  var t = s.reduce(function(e, n) {
    var i = e[n.name];
    return e[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var Rl = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Dl() {
  for (var s = arguments.length, t = new Array(s), e = 0; e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Ar(s) {
  s === void 0 && (s = {});
  var t = s, e = t.defaultModifiers, n = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? Rl : i;
  return function(c, a, l) {
    l === void 0 && (l = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Rl, r),
      modifiersData: {},
      elements: {
        reference: c,
        popper: a
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, g = {
      state: h,
      setOptions: function(A) {
        var N = typeof A == "function" ? A(h.options) : A;
        E(), h.options = Object.assign({}, r, h.options, N), h.scrollParents = {
          reference: Ls(c) ? si(c) : c.contextElement ? si(c.contextElement) : [],
          popper: si(a)
        };
        var S = ff(gf([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = S.filter(function(L) {
          return L.enabled;
        }), v(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var A = h.elements, N = A.reference, S = A.popper;
          if (Dl(N, S)) {
            h.rects = {
              reference: hf(N, bi(S), h.options.strategy === "fixed"),
              popper: Pa(S)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(tt) {
              return h.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var L = 0; L < h.orderedModifiers.length; L++) {
              if (h.reset === !0) {
                h.reset = !1, L = -1;
                continue;
              }
              var I = h.orderedModifiers[L], R = I.fn, P = I.options, V = P === void 0 ? {} : P, J = I.name;
              typeof R == "function" && (h = R({
                state: h,
                options: V,
                name: J,
                instance: g
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: pf(function() {
        return new Promise(function(T) {
          g.forceUpdate(), T(h);
        });
      }),
      destroy: function() {
        E(), p = !0;
      }
    };
    if (!Dl(c, a))
      return g;
    g.setOptions(l).then(function(T) {
      !p && l.onFirstUpdate && l.onFirstUpdate(T);
    });
    function v() {
      h.orderedModifiers.forEach(function(T) {
        var A = T.name, N = T.options, S = N === void 0 ? {} : N, L = T.effect;
        if (typeof L == "function") {
          var I = L({
            state: h,
            name: A,
            instance: g,
            options: S
          }), R = function() {
          };
          f.push(I || R);
        }
      });
    }
    function E() {
      f.forEach(function(T) {
        return T();
      }), f = [];
    }
    return g;
  };
}
var mf = /* @__PURE__ */ Ar(), bf = [Va, za, Ua, $a], yf = /* @__PURE__ */ Ar({
  defaultModifiers: bf
}), _f = [Va, za, Ua, $a, Du, Iu, Mu, Lu, Ru], Ka = /* @__PURE__ */ Ar({
  defaultModifiers: _f
});
const qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: _u,
  afterRead: mu,
  afterWrite: Tu,
  applyStyles: $a,
  arrow: Lu,
  auto: Er,
  basePlacements: Cn,
  beforeMain: bu,
  beforeRead: pu,
  beforeWrite: vu,
  bottom: kt,
  clippingParents: du,
  computeStyles: Ua,
  createPopper: Ka,
  createPopperBase: mf,
  createPopperLite: yf,
  detectOverflow: vn,
  end: mn,
  eventListeners: Va,
  flip: Iu,
  hide: Ru,
  left: wt,
  main: yu,
  modifierPhases: Au,
  offset: Du,
  placements: qa,
  popper: en,
  popperGenerator: Ar,
  popperOffsets: za,
  preventOverflow: Mu,
  read: gu,
  reference: fu,
  right: It,
  start: Ss,
  top: At,
  variationPlacements: sa,
  viewport: Ma,
  write: Eu
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Ge = /* @__PURE__ */ new Map(), Co = {
  set(s, t, e) {
    Ge.has(s) || Ge.set(s, /* @__PURE__ */ new Map());
    const n = Ge.get(s);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, e);
  },
  get(s, t) {
    return Ge.has(s) && Ge.get(s).get(t) || null;
  },
  remove(s, t) {
    if (!Ge.has(s))
      return;
    const e = Ge.get(s);
    e.delete(t), e.size === 0 && Ge.delete(s);
  }
}, vf = 1e6, Ef = 1e3, ra = "transitionend", Bu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), Tf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Af = (s) => {
  do
    s += Math.floor(Math.random() * vf);
  while (document.getElementById(s));
  return s;
}, wf = (s) => {
  if (!s)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: e
  } = window.getComputedStyle(s);
  const n = Number.parseFloat(t), i = Number.parseFloat(e);
  return !n && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * Ef);
}, $u = (s) => {
  s.dispatchEvent(new Event(ra));
}, Re = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), ts = (s) => Re(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Bu(s)) : null, Sn = (s) => {
  if (!Re(s) || s.getClientRects().length === 0)
    return !1;
  const t = getComputedStyle(s).getPropertyValue("visibility") === "visible", e = s.closest("details:not([open])");
  if (!e)
    return t;
  if (e !== s) {
    const n = s.closest("summary");
    if (n && n.parentNode !== e || n === null)
      return !1;
  }
  return t;
}, es = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false", Pu = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? Pu(s.parentNode) : null;
}, hr = () => {
}, yi = (s) => {
  s.offsetHeight;
}, ju = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, So = [], Nf = (s) => {
  document.readyState === "loading" ? (So.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of So)
      t();
  }), So.push(s)) : s();
}, Ht = () => document.documentElement.dir === "rtl", zt = (s) => {
  Nf(() => {
    const t = ju();
    if (t) {
      const e = s.NAME, n = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface);
    }
  });
}, Lt = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e, Uu = (s, t, e = !0) => {
  if (!e) {
    Lt(s);
    return;
  }
  const i = wf(t) + 5;
  let r = !1;
  const o = ({
    target: c
  }) => {
    c === t && (r = !0, t.removeEventListener(ra, o), Lt(s));
  };
  t.addEventListener(ra, o), setTimeout(() => {
    r || $u(t);
  }, i);
}, Ga = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, Of = /[^.]*(?=\..*)\.|.*/, Cf = /\..*/, Sf = /::\d+$/, Lo = {};
let Ml = 1;
const Vu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Lf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Fu(s, t) {
  return t && `${t}::${Ml++}` || s.uidEvent || Ml++;
}
function Hu(s) {
  const t = Fu(s);
  return s.uidEvent = t, Lo[t] = Lo[t] || {}, Lo[t];
}
function xf(s, t) {
  return function e(n) {
    return Ya(n, {
      delegateTarget: s
    }), e.oneOff && k.off(s, n.type, t), t.apply(s, [n]);
  };
}
function kf(s, t, e) {
  return function n(i) {
    const r = s.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const c of r)
        if (c === o)
          return Ya(i, {
            delegateTarget: o
          }), n.oneOff && k.off(s, i.type, t, e), e.apply(o, [i]);
  };
}
function Wu(s, t, e = null) {
  return Object.values(s).find((n) => n.callable === t && n.delegationSelector === e);
}
function zu(s, t, e) {
  const n = typeof t == "string", i = n ? e : t || e;
  let r = Ku(s);
  return Lf.has(r) || (r = s), [n, i, r];
}
function ql(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, c] = zu(t, e, n);
  t in Vu && (o = ((v) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return v.call(this, E);
  })(o));
  const a = Hu(s), l = a[c] || (a[c] = {}), h = Wu(l, o, r ? e : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const f = Fu(o, t.replace(Of, "")), p = r ? kf(s, e, o) : xf(s, o);
  p.delegationSelector = r ? e : null, p.callable = o, p.oneOff = i, p.uidEvent = f, l[f] = p, s.addEventListener(c, p, r);
}
function oa(s, t, e, n, i) {
  const r = Wu(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function If(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && oa(s, t, e, o.callable, o.delegationSelector);
}
function Ku(s) {
  return s = s.replace(Cf, ""), Vu[s] || s;
}
const k = {
  on(s, t, e, n) {
    ql(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    ql(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = zu(t, e, n), c = o !== t, a = Hu(s), l = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(l).length)
        return;
      oa(s, a, o, r, i ? e : null);
      return;
    }
    if (h)
      for (const f of Object.keys(a))
        If(s, a, f, t.slice(1));
    for (const [f, p] of Object.entries(l)) {
      const g = f.replace(Sf, "");
      (!c || t.includes(g)) && oa(s, a, o, p.callable, p.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = ju(), i = Ku(t), r = t !== i;
    let o = null, c = !0, a = !0, l = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), c = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), l = o.isDefaultPrevented());
    const h = Ya(new Event(t, {
      bubbles: c,
      cancelable: !0
    }), e);
    return l && h.preventDefault(), a && s.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function Ya(s, t = {}) {
  for (const [e, n] of Object.entries(t))
    try {
      s[e] = n;
    } catch {
      Object.defineProperty(s, e, {
        configurable: !0,
        get() {
          return n;
        }
      });
    }
  return s;
}
function Bl(s) {
  if (s === "true")
    return !0;
  if (s === "false")
    return !1;
  if (s === Number(s).toString())
    return Number(s);
  if (s === "" || s === "null")
    return null;
  if (typeof s != "string")
    return s;
  try {
    return JSON.parse(decodeURIComponent(s));
  } catch {
    return s;
  }
}
function xo(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const De = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-bs-${xo(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-bs-${xo(t)}`);
  },
  getDataAttributes(s) {
    if (!s)
      return {};
    const t = {}, e = Object.keys(s.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of e) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Bl(s.dataset[n]);
    }
    return t;
  },
  getDataAttribute(s, t) {
    return Bl(s.getAttribute(`data-bs-${xo(t)}`));
  }
};
class _i {
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
  _mergeConfigObj(t, e) {
    const n = Re(e) ? De.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...Re(e) ? De.getDataAttributes(e) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(e)) {
      const r = t[n], o = Re(r) ? "element" : Tf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Rf = "5.3.3";
class ne extends _i {
  constructor(t, e) {
    super(), t = ts(t), t && (this._element = t, this._config = this._getConfig(e), Co.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Co.remove(this._element, this.constructor.DATA_KEY), k.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, e, n = !0) {
    Uu(t, e, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Co.get(ts(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return Rf;
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
const ko = (s) => {
  let t = s.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let e = s.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t ? t.split(",").map((e) => Bu(e)).join(",") : null;
}, U = {
  find(s, t = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t, s));
  },
  findOne(s, t = document.documentElement) {
    return Element.prototype.querySelector.call(t, s);
  },
  children(s, t) {
    return [].concat(...s.children).filter((e) => e.matches(t));
  },
  parents(s, t) {
    const e = [];
    let n = s.parentNode.closest(t);
    for (; n; )
      e.push(n), n = n.parentNode.closest(t);
    return e;
  },
  prev(s, t) {
    let e = s.previousElementSibling;
    for (; e; ) {
      if (e.matches(t))
        return [e];
      e = e.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(s, t) {
    let e = s.nextElementSibling;
    for (; e; ) {
      if (e.matches(t))
        return [e];
      e = e.nextElementSibling;
    }
    return [];
  },
  focusableChildren(s) {
    const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((e) => `${e}:not([tabindex^="-"])`).join(",");
    return this.find(t, s).filter((e) => !es(e) && Sn(e));
  },
  getSelectorFromElement(s) {
    const t = ko(s);
    return t && U.findOne(t) ? t : null;
  },
  getElementFromSelector(s) {
    const t = ko(s);
    return t ? U.findOne(t) : null;
  },
  getMultipleElementsFromSelector(s) {
    const t = ko(s);
    return t ? U.find(t) : [];
  }
}, wr = (s, t = "hide") => {
  const e = `click.dismiss${s.EVENT_KEY}`, n = s.NAME;
  k.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), es(this))
      return;
    const r = U.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, Df = "alert", Mf = "bs.alert", Gu = `.${Mf}`, qf = `close${Gu}`, Bf = `closed${Gu}`, $f = "fade", Pf = "show";
class Nr extends ne {
  // Getters
  static get NAME() {
    return Df;
  }
  // Public
  close() {
    if (k.trigger(this._element, qf).defaultPrevented)
      return;
    this._element.classList.remove(Pf);
    const e = this._element.classList.contains($f);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  // Private
  _destroyElement() {
    this._element.remove(), k.trigger(this._element, Bf), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Nr.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
wr(Nr, "close");
zt(Nr);
const jf = "button", Uf = "bs.button", Vf = `.${Uf}`, Ff = ".data-api", Hf = "active", $l = '[data-bs-toggle="button"]', Wf = `click${Vf}${Ff}`;
class Or extends ne {
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
      const e = Or.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
k.on(document, Wf, $l, (s) => {
  s.preventDefault();
  const t = s.target.closest($l);
  Or.getOrCreateInstance(t).toggle();
});
zt(Or);
const zf = "swipe", Ln = ".bs.swipe", Kf = `touchstart${Ln}`, Gf = `touchmove${Ln}`, Yf = `touchend${Ln}`, Xf = `pointerdown${Ln}`, Zf = `pointerup${Ln}`, Qf = "touch", Jf = "pen", tp = "pointer-event", ep = 40, sp = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, np = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class dr extends _i {
  constructor(t, e) {
    super(), this._element = t, !(!t || !dr.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return sp;
  }
  static get DefaultType() {
    return np;
  }
  static get NAME() {
    return zf;
  }
  // Public
  dispose() {
    k.off(this._element, Ln);
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
    if (t <= ep)
      return;
    const e = t / this._deltaX;
    this._deltaX = 0, e && Lt(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (k.on(this._element, Xf, (t) => this._start(t)), k.on(this._element, Zf, (t) => this._end(t)), this._element.classList.add(tp)) : (k.on(this._element, Kf, (t) => this._start(t)), k.on(this._element, Gf, (t) => this._move(t)), k.on(this._element, Yf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === Jf || t.pointerType === Qf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const ip = "carousel", rp = "bs.carousel", rs = `.${rp}`, Yu = ".data-api", op = "ArrowLeft", ap = "ArrowRight", lp = 500, Yn = "next", Js = "prev", sn = "left", rr = "right", cp = `slide${rs}`, Io = `slid${rs}`, up = `keydown${rs}`, hp = `mouseenter${rs}`, dp = `mouseleave${rs}`, fp = `dragstart${rs}`, pp = `load${rs}${Yu}`, gp = `click${rs}${Yu}`, Xu = "carousel", zi = "active", mp = "slide", bp = "carousel-item-end", yp = "carousel-item-start", _p = "carousel-item-next", vp = "carousel-item-prev", Zu = ".active", Qu = ".carousel-item", Ep = Zu + Qu, Tp = ".carousel-item img", Ap = ".carousel-indicators", wp = "[data-bs-slide], [data-bs-slide-to]", Np = '[data-bs-ride="carousel"]', Op = {
  [op]: rr,
  [ap]: sn
}, Cp = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, Sp = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class vi extends ne {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = U.findOne(Ap, this._element), this._addEventListeners(), this._config.ride === Xu && this.cycle();
  }
  // Getters
  static get Default() {
    return Cp;
  }
  static get DefaultType() {
    return Sp;
  }
  static get NAME() {
    return ip;
  }
  // Public
  next() {
    this._slide(Yn);
  }
  nextWhenVisible() {
    !document.hidden && Sn(this._element) && this.next();
  }
  prev() {
    this._slide(Js);
  }
  pause() {
    this._isSliding && $u(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        k.one(this._element, Io, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const e = this._getItems();
    if (t > e.length - 1 || t < 0)
      return;
    if (this._isSliding) {
      k.one(this._element, Io, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Yn : Js;
    this._slide(i, e[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  // Private
  _configAfterMerge(t) {
    return t.defaultInterval = t.interval, t;
  }
  _addEventListeners() {
    this._config.keyboard && k.on(this._element, up, (t) => this._keydown(t)), this._config.pause === "hover" && (k.on(this._element, hp, () => this.pause()), k.on(this._element, dp, () => this._maybeEnableCycle())), this._config.touch && dr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of U.find(Tp, this._element))
      k.on(n, fp, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(sn)),
      rightCallback: () => this._slide(this._directionToOrder(rr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), lp + this._config.interval));
      }
    };
    this._swipeHelper = new dr(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = Op[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const e = U.findOne(Zu, this._indicatorsElement);
    e.classList.remove(zi), e.removeAttribute("aria-current");
    const n = U.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(zi), n.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t)
      return;
    const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = e || this._config.defaultInterval;
  }
  _slide(t, e = null) {
    if (this._isSliding)
      return;
    const n = this._getActive(), i = t === Yn, r = e || Ga(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), c = (g) => k.trigger(this._element, g, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (c(cp).defaultPrevented || !n || !r)
      return;
    const l = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? yp : bp, f = i ? _p : vp;
    r.classList.add(f), yi(r), n.classList.add(h), r.classList.add(h);
    const p = () => {
      r.classList.remove(h, f), r.classList.add(zi), n.classList.remove(zi, f, h), this._isSliding = !1, c(Io);
    };
    this._queueCallback(p, n, this._isAnimated()), l && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(mp);
  }
  _getActive() {
    return U.findOne(Ep, this._element);
  }
  _getItems() {
    return U.find(Qu, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Ht() ? t === sn ? Js : Yn : t === sn ? Yn : Js;
  }
  _orderToDirection(t) {
    return Ht() ? t === Js ? sn : rr : t === Js ? rr : sn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = vi.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        e.to(t);
        return;
      }
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
k.on(document, gp, wp, function(s) {
  const t = U.getElementFromSelector(this);
  if (!t || !t.classList.contains(Xu))
    return;
  s.preventDefault();
  const e = vi.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    e.to(n), e._maybeEnableCycle();
    return;
  }
  if (De.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
k.on(window, pp, () => {
  const s = U.find(Np);
  for (const t of s)
    vi.getOrCreateInstance(t);
});
zt(vi);
const Lp = "collapse", xp = "bs.collapse", Ei = `.${xp}`, kp = ".data-api", Ip = `show${Ei}`, Rp = `shown${Ei}`, Dp = `hide${Ei}`, Mp = `hidden${Ei}`, qp = `click${Ei}${kp}`, Ro = "show", dn = "collapse", Ki = "collapsing", Bp = "collapsed", $p = `:scope .${dn} .${dn}`, Pp = "collapse-horizontal", jp = "width", Up = "height", Vp = ".collapse.show, .collapse.collapsing", aa = '[data-bs-toggle="collapse"]', Fp = {
  parent: null,
  toggle: !0
}, Hp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class li extends ne {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = U.find(aa);
    for (const i of n) {
      const r = U.getSelectorFromElement(i), o = U.find(r).filter((c) => c === this._element);
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
    if (this._config.parent && (t = this._getFirstLevelChildren(Vp).filter((c) => c !== this._element).map((c) => li.getOrCreateInstance(c, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || k.trigger(this._element, Ip).defaultPrevented)
      return;
    for (const c of t)
      c.hide();
    const n = this._getDimension();
    this._element.classList.remove(dn), this._element.classList.add(Ki), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ki), this._element.classList.add(dn, Ro), this._element.style[n] = "", k.trigger(this._element, Rp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || k.trigger(this._element, Dp).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, yi(this._element), this._element.classList.add(Ki), this._element.classList.remove(dn, Ro);
    for (const i of this._triggerArray) {
      const r = U.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ki), this._element.classList.add(dn), k.trigger(this._element, Mp);
    };
    this._element.style[e] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Ro);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = ts(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(Pp) ? jp : Up;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(aa);
    for (const e of t) {
      const n = U.getElementFromSelector(e);
      n && this._addAriaAndCollapsedClass([e], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const e = U.find($p, this._config.parent);
    return U.find(t, this._config.parent).filter((n) => !e.includes(n));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(Bp, !e), n.setAttribute("aria-expanded", e);
  }
  // Static
  static jQueryInterface(t) {
    const e = {};
    return typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1), this.each(function() {
      const n = li.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
k.on(document, qp, aa, function(s) {
  (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
  for (const t of U.getMultipleElementsFromSelector(this))
    li.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
zt(li);
const Pl = "dropdown", Wp = "bs.dropdown", Ds = `.${Wp}`, Xa = ".data-api", zp = "Escape", jl = "Tab", Kp = "ArrowUp", Ul = "ArrowDown", Gp = 2, Yp = `hide${Ds}`, Xp = `hidden${Ds}`, Zp = `show${Ds}`, Qp = `shown${Ds}`, Ju = `click${Ds}${Xa}`, th = `keydown${Ds}${Xa}`, Jp = `keyup${Ds}${Xa}`, nn = "show", tg = "dropup", eg = "dropend", sg = "dropstart", ng = "dropup-center", ig = "dropdown-center", Ns = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', rg = `${Ns}.${nn}`, or = ".dropdown-menu", og = ".navbar", ag = ".navbar-nav", lg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", cg = Ht() ? "top-end" : "top-start", ug = Ht() ? "top-start" : "top-end", hg = Ht() ? "bottom-end" : "bottom-start", dg = Ht() ? "bottom-start" : "bottom-end", fg = Ht() ? "left-start" : "right-start", pg = Ht() ? "right-start" : "left-start", gg = "top", mg = "bottom", bg = {
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
class me extends ne {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = U.next(this._element, or)[0] || U.prev(this._element, or)[0] || U.findOne(or, this._parent), this._inNavbar = this._detectNavbar();
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
    if (es(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!k.trigger(this._element, Zp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(ag))
        for (const n of [].concat(...document.body.children))
          k.on(n, "mouseover", hr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(nn), this._element.classList.add(nn), k.trigger(this._element, Qp, t);
    }
  }
  hide() {
    if (es(this._element) || !this._isShown())
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
    if (!k.trigger(this._element, Yp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          k.off(n, "mouseover", hr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(nn), this._element.classList.remove(nn), this._element.setAttribute("aria-expanded", "false"), De.removeDataAttribute(this._menu, "popper"), k.trigger(this._element, Xp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !Re(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Pl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof qu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : Re(this._config.reference) ? t = ts(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = Ka(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(nn);
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
    const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(tg) ? e ? ug : cg : e ? dg : hg;
  }
  _detectNavbar() {
    return this._element.closest(og) !== null;
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((e) => Number.parseInt(e, 10)) : typeof t == "function" ? (e) => t(e, this._element) : t;
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
    return (this._inNavbar || this._config.display === "static") && (De.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Lt(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({
    key: t,
    target: e
  }) {
    const n = U.find(lg, this._menu).filter((i) => Sn(i));
    n.length && Ga(n, e, t === Ul, !n.includes(e)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = me.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Gp || t.type === "keyup" && t.key !== jl)
      return;
    const e = U.find(rg);
    for (const n of e) {
      const i = me.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === jl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const c = {
        relatedTarget: i._element
      };
      t.type === "click" && (c.clickEvent = t), i._completeHide(c);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === zp, i = [Kp, Ul].includes(t.key);
    if (!i && !n || e && !n)
      return;
    t.preventDefault();
    const r = this.matches(Ns) ? this : U.prev(this, Ns)[0] || U.next(this, Ns)[0] || U.findOne(Ns, t.delegateTarget.parentNode), o = me.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
k.on(document, th, Ns, me.dataApiKeydownHandler);
k.on(document, th, or, me.dataApiKeydownHandler);
k.on(document, Ju, me.clearMenus);
k.on(document, Jp, me.clearMenus);
k.on(document, Ju, Ns, function(s) {
  s.preventDefault(), me.getOrCreateInstance(this).toggle();
});
zt(me);
const eh = "backdrop", _g = "fade", Vl = "show", Fl = `mousedown.bs.${eh}`, vg = {
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
class sh extends _i {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return vg;
  }
  static get DefaultType() {
    return Eg;
  }
  static get NAME() {
    return eh;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && yi(e), e.classList.add(Vl), this._emulateAnimation(() => {
      Lt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._getElement().classList.remove(Vl), this._emulateAnimation(() => {
      this.dispose(), Lt(t);
    });
  }
  dispose() {
    this._isAppended && (k.off(this._element, Fl), this._element.remove(), this._isAppended = !1);
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
    return t.rootElement = ts(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), k.on(t, Fl, () => {
      Lt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Uu(t, this._getElement(), this._config.isAnimated);
  }
}
const Tg = "focustrap", Ag = "bs.focustrap", fr = `.${Ag}`, wg = `focusin${fr}`, Ng = `keydown.tab${fr}`, Og = "Tab", Cg = "forward", Hl = "backward", Sg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Lg = {
  autofocus: "boolean",
  trapElement: "element"
};
class nh extends _i {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Sg;
  }
  static get DefaultType() {
    return Lg;
  }
  static get NAME() {
    return Tg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), k.off(document, fr), k.on(document, wg, (t) => this._handleFocusin(t)), k.on(document, Ng, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, k.off(document, fr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: e
    } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target))
      return;
    const n = U.focusableChildren(e);
    n.length === 0 ? e.focus() : this._lastTabNavDirection === Hl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Og && (this._lastTabNavDirection = t.shiftKey ? Hl : Cg);
  }
}
const Wl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", zl = ".sticky-top", Gi = "padding-right", Kl = "margin-right";
class la {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Gi, (e) => e + t), this._setElementAttributes(Wl, Gi, (e) => e + t), this._setElementAttributes(zl, Kl, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Gi), this._resetElementAttributes(Wl, Gi), this._resetElementAttributes(zl, Kl);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t, e, n) {
    const i = this.getWidth(), r = (o) => {
      if (o !== this._element && window.innerWidth > o.clientWidth + i)
        return;
      this._saveInitialAttribute(o, e);
      const c = window.getComputedStyle(o).getPropertyValue(e);
      o.style.setProperty(e, `${n(Number.parseFloat(c))}px`);
    };
    this._applyManipulationCallback(t, r);
  }
  _saveInitialAttribute(t, e) {
    const n = t.style.getPropertyValue(e);
    n && De.setDataAttribute(t, e, n);
  }
  _resetElementAttributes(t, e) {
    const n = (i) => {
      const r = De.getDataAttribute(i, e);
      if (r === null) {
        i.style.removeProperty(e);
        return;
      }
      De.removeDataAttribute(i, e), i.style.setProperty(e, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, e) {
    if (Re(t)) {
      e(t);
      return;
    }
    for (const n of U.find(t, this._element))
      e(n);
  }
}
const xg = "modal", kg = "bs.modal", Wt = `.${kg}`, Ig = ".data-api", Rg = "Escape", Dg = `hide${Wt}`, Mg = `hidePrevented${Wt}`, ih = `hidden${Wt}`, rh = `show${Wt}`, qg = `shown${Wt}`, Bg = `resize${Wt}`, $g = `click.dismiss${Wt}`, Pg = `mousedown.dismiss${Wt}`, jg = `keydown.dismiss${Wt}`, Ug = `click${Wt}${Ig}`, Gl = "modal-open", Vg = "fade", Yl = "show", Do = "modal-static", Fg = ".modal.show", Hg = ".modal-dialog", Wg = ".modal-body", zg = '[data-bs-toggle="modal"]', Kg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Gg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class xs extends ne {
  constructor(t, e) {
    super(t, e), this._dialog = U.findOne(Hg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new la(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Kg;
  }
  static get DefaultType() {
    return Gg;
  }
  static get NAME() {
    return xg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || k.trigger(this._element, rh, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Gl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || k.trigger(this._element, Dg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Yl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    k.off(window, Wt), k.off(this._dialog, Wt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new sh({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new nh({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const e = U.findOne(Wg, this._dialog);
    e && (e.scrollTop = 0), yi(this._element), this._element.classList.add(Yl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, k.trigger(this._element, qg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    k.on(this._element, jg, (t) => {
      if (t.key === Rg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), k.on(window, Bg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), k.on(this._element, Pg, (t) => {
      k.one(this._element, $g, (e) => {
        if (!(this._element !== t.target || this._element !== e.target)) {
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
      document.body.classList.remove(Gl), this._resetAdjustments(), this._scrollBar.reset(), k.trigger(this._element, ih);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Vg);
  }
  _triggerBackdropTransition() {
    if (k.trigger(this._element, Mg).defaultPrevented)
      return;
    const e = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(Do) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Do), this._queueCallback(() => {
      this._element.classList.remove(Do), this._queueCallback(() => {
        this._element.style.overflowY = n;
      }, this._dialog);
    }, this._dialog), this._element.focus());
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const t = this._element.scrollHeight > document.documentElement.clientHeight, e = this._scrollBar.getWidth(), n = e > 0;
    if (n && !t) {
      const i = Ht() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${e}px`;
    }
    if (!n && t) {
      const i = Ht() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${e}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, e) {
    return this.each(function() {
      const n = xs.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](e);
      }
    });
  }
}
k.on(document, Ug, zg, function(s) {
  const t = U.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), k.one(t, rh, (i) => {
    i.defaultPrevented || k.one(t, ih, () => {
      Sn(this) && this.focus();
    });
  });
  const e = U.findOne(Fg);
  e && xs.getInstance(e).hide(), xs.getOrCreateInstance(t).toggle(this);
});
wr(xs);
zt(xs);
const Yg = "offcanvas", Xg = "bs.offcanvas", Pe = `.${Xg}`, oh = ".data-api", Zg = `load${Pe}${oh}`, Qg = "Escape", Xl = "show", Zl = "showing", Ql = "hiding", Jg = "offcanvas-backdrop", ah = ".offcanvas.show", tm = `show${Pe}`, em = `shown${Pe}`, sm = `hide${Pe}`, Jl = `hidePrevented${Pe}`, lh = `hidden${Pe}`, nm = `resize${Pe}`, im = `click${Pe}${oh}`, rm = `keydown.dismiss${Pe}`, om = '[data-bs-toggle="offcanvas"]', am = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, lm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class ss extends ne {
  constructor(t, e) {
    super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
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
    if (this._isShown || k.trigger(this._element, tm, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new la().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Zl);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Xl), this._element.classList.remove(Zl), k.trigger(this._element, em, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || k.trigger(this._element, sm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Ql), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(Xl, Ql), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new la().reset(), k.trigger(this._element, lh);
    };
    this._queueCallback(e, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const t = () => {
      if (this._config.backdrop === "static") {
        k.trigger(this._element, Jl);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new sh({
      className: Jg,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null
    });
  }
  _initializeFocusTrap() {
    return new nh({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    k.on(this._element, rm, (t) => {
      if (t.key === Qg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        k.trigger(this._element, Jl);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = ss.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
k.on(document, im, om, function(s) {
  const t = U.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), es(this))
    return;
  k.one(t, lh, () => {
    Sn(this) && this.focus();
  });
  const e = U.findOne(ah);
  e && e !== t && ss.getInstance(e).hide(), ss.getOrCreateInstance(t).toggle(this);
});
k.on(window, Zg, () => {
  for (const s of U.find(ah))
    ss.getOrCreateInstance(s).show();
});
k.on(window, nm, () => {
  for (const s of U.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && ss.getOrCreateInstance(s).hide();
});
wr(ss);
zt(ss);
const cm = /^aria-[\w-]*$/i, ch = {
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
}, um = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), hm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, dm = (s, t) => {
  const e = s.nodeName.toLowerCase();
  return t.includes(e) ? um.has(e) ? !!hm.test(s.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(e));
};
function fm(s, t, e) {
  if (!s.length)
    return s;
  if (e && typeof e == "function")
    return e(s);
  const i = new window.DOMParser().parseFromString(s, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const o of r) {
    const c = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(c)) {
      o.remove();
      continue;
    }
    const a = [].concat(...o.attributes), l = [].concat(t["*"] || [], t[c] || []);
    for (const h of a)
      dm(h, l) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const pm = "TemplateFactory", gm = {
  allowList: ch,
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
class ym extends _i {
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
    const e = t.children[0], n = this._resolvePossibleFunction(this._config.extraClass);
    return n && e.classList.add(...n.split(" ")), e;
  }
  // Private
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [e, n] of Object.entries(t))
      super._typeCheckConfig({
        selector: e,
        entry: n
      }, bm);
  }
  _setContent(t, e, n) {
    const i = U.findOne(n, t);
    if (i) {
      if (e = this._resolvePossibleFunction(e), !e) {
        i.remove();
        return;
      }
      if (Re(e)) {
        this._putElementInTemplate(ts(e), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(e);
        return;
      }
      i.textContent = e;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize ? fm(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return Lt(t, [this]);
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      e.innerHTML = "", e.append(t);
      return;
    }
    e.textContent = t.textContent;
  }
}
const _m = "tooltip", vm = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Mo = "fade", Em = "modal", Yi = "show", Tm = ".tooltip-inner", tc = `.${Em}`, ec = "hide.bs.modal", Xn = "hover", qo = "focus", Am = "click", wm = "manual", Nm = "hide", Om = "hidden", Cm = "show", Sm = "shown", Lm = "inserted", xm = "click", km = "focusin", Im = "focusout", Rm = "mouseenter", Dm = "mouseleave", Mm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Ht() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Ht() ? "right" : "left"
}, qm = {
  allowList: ch,
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
let Cr = class uh extends ne {
  constructor(t, e) {
    if (typeof qu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
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
    clearTimeout(this._timeout), k.off(this._element.closest(tc), ec, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = k.trigger(this._element, this.constructor.eventName(Cm)), n = (Pu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), k.trigger(this._element, this.constructor.eventName(Lm))), this._popper = this._createPopper(i), i.classList.add(Yi), "ontouchstart" in document.documentElement)
      for (const c of [].concat(...document.body.children))
        k.on(c, "mouseover", hr);
    const o = () => {
      k.trigger(this._element, this.constructor.eventName(Sm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || k.trigger(this._element, this.constructor.eventName(Nm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Yi), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        k.off(i, "mouseover", hr);
    this._activeTrigger[Am] = !1, this._activeTrigger[qo] = !1, this._activeTrigger[Xn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), k.trigger(this._element, this.constructor.eventName(Om)));
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
    const e = this._getTemplateFactory(t).toHtml();
    if (!e)
      return null;
    e.classList.remove(Mo, Yi), e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Af(this.constructor.NAME).toString();
    return e.setAttribute("id", n), this._isAnimated() && e.classList.add(Mo), e;
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
    return this._config.animation || this.tip && this.tip.classList.contains(Mo);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Yi);
  }
  _createPopper(t) {
    const e = Lt(this._config.placement, [this, t, this._element]), n = Mm[e.toUpperCase()];
    return Ka(this._element, t, this._getPopperConfig(n));
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((e) => Number.parseInt(e, 10)) : typeof t == "function" ? (e) => t(e, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return Lt(t, [this._element]);
  }
  _getPopperConfig(t) {
    const e = {
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
      ...e,
      ...Lt(this._config.popperConfig, [e])
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        k.on(this._element, this.constructor.eventName(xm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (e !== wm) {
        const n = e === Xn ? this.constructor.eventName(Rm) : this.constructor.eventName(km), i = e === Xn ? this.constructor.eventName(Dm) : this.constructor.eventName(Im);
        k.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? qo : Xn] = !0, o._enter();
        }), k.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? qo : Xn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, k.on(this._element.closest(tc), ec, this._hideModalHandler);
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
  _setTimeout(t, e) {
    clearTimeout(this._timeout), this._timeout = setTimeout(t, e);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const e = De.getDataAttributes(this._element);
    for (const n of Object.keys(e))
      vm.has(n) && delete e[n];
    return t = {
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : ts(t.container), typeof t.delay == "number" && (t.delay = {
      show: t.delay,
      hide: t.delay
    }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), t;
  }
  _getDelegateConfig() {
    const t = {};
    for (const [e, n] of Object.entries(this._config))
      this.constructor.Default[e] !== n && (t[e] = n);
    return t.selector = !1, t.trigger = "manual", t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = uh.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
};
zt(Cr);
const $m = "popover", Pm = ".popover-header", jm = ".popover-body", Um = {
  ...Cr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Vm = {
  ...Cr.DefaultType,
  content: "(null|string|element|function)"
};
class Za extends Cr {
  // Getters
  static get Default() {
    return Um;
  }
  static get DefaultType() {
    return Vm;
  }
  static get NAME() {
    return $m;
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
      const e = Za.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
zt(Za);
const Fm = "scrollspy", Hm = "bs.scrollspy", Qa = `.${Hm}`, Wm = ".data-api", zm = `activate${Qa}`, sc = `click${Qa}`, Km = `load${Qa}${Wm}`, Gm = "dropdown-item", tn = "active", Ym = '[data-bs-spy="scroll"]', Bo = "[href]", Xm = ".nav, .list-group", nc = ".nav-link", Zm = ".nav-item", Qm = ".list-group-item", Jm = `${nc}, ${Zm} > ${nc}, ${Qm}`, tb = ".dropdown", eb = ".dropdown-toggle", sb = {
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
class Sr extends ne {
  constructor(t, e) {
    super(t, e), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
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
    return t.target = ts(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (k.off(this._config.target, sc), k.on(this._config.target, sc, Bo, (t) => {
      const e = this._observableSections.get(t.target.hash);
      if (e) {
        t.preventDefault();
        const n = this._rootElement || window, i = e.offsetTop - this._element.offsetTop;
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
    return new IntersectionObserver((e) => this._observerCallback(e), t);
  }
  // The logic of selection
  _observerCallback(t) {
    const e = (o) => this._targetLinks.get(`#${o.target.id}`), n = (o) => {
      this._previousScrollData.visibleEntryTop = o.target.offsetTop, this._process(e(o));
    }, i = (this._rootElement || document.documentElement).scrollTop, r = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const o of t) {
      if (!o.isIntersecting) {
        this._activeTarget = null, this._clearActiveClass(e(o));
        continue;
      }
      const c = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && c) {
        if (n(o), !i)
          return;
        continue;
      }
      !r && !c && n(o);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const t = U.find(Bo, this._config.target);
    for (const e of t) {
      if (!e.hash || es(e))
        continue;
      const n = U.findOne(decodeURI(e.hash), this._element);
      Sn(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(tn), this._activateParents(t), k.trigger(this._element, zm, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Gm)) {
      U.findOne(eb, t.closest(tb)).classList.add(tn);
      return;
    }
    for (const e of U.parents(t, Xm))
      for (const n of U.prev(e, Jm))
        n.classList.add(tn);
  }
  _clearActiveClass(t) {
    t.classList.remove(tn);
    const e = U.find(`${Bo}.${tn}`, t);
    for (const n of e)
      n.classList.remove(tn);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Sr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
k.on(window, Km, () => {
  for (const s of U.find(Ym))
    Sr.getOrCreateInstance(s);
});
zt(Sr);
const ib = "tab", rb = "bs.tab", Ms = `.${rb}`, ob = `hide${Ms}`, ab = `hidden${Ms}`, lb = `show${Ms}`, cb = `shown${Ms}`, ub = `click${Ms}`, hb = `keydown${Ms}`, db = `load${Ms}`, fb = "ArrowLeft", ic = "ArrowRight", pb = "ArrowUp", rc = "ArrowDown", $o = "Home", oc = "End", Os = "active", ac = "fade", Po = "show", gb = "dropdown", hh = ".dropdown-toggle", mb = ".dropdown-menu", jo = `:not(${hh})`, bb = '.list-group, .nav, [role="tablist"]', yb = ".nav-item, .list-group-item", _b = `.nav-link${jo}, .list-group-item${jo}, [role="tab"]${jo}`, dh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Uo = `${_b}, ${dh}`, vb = `.${Os}[data-bs-toggle="tab"], .${Os}[data-bs-toggle="pill"], .${Os}[data-bs-toggle="list"]`;
class En extends ne {
  constructor(t) {
    super(t), this._parent = this._element.closest(bb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), k.on(this._element, hb, (e) => this._keydown(e)));
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
    const e = this._getActiveElem(), n = e ? k.trigger(e, ob, {
      relatedTarget: t
    }) : null;
    k.trigger(t, lb, {
      relatedTarget: e
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(e, t), this._activate(t, e));
  }
  // Private
  _activate(t, e) {
    if (!t)
      return;
    t.classList.add(Os), this._activate(U.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Po);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), k.trigger(t, cb, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(ac));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(Os), t.blur(), this._deactivate(U.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Po);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), k.trigger(t, ab, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(ac));
  }
  _keydown(t) {
    if (![fb, ic, pb, rc, $o, oc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !es(i));
    let n;
    if ([$o, oc].includes(t.key))
      n = e[t.key === $o ? 0 : e.length - 1];
    else {
      const i = [ic, rc].includes(t.key);
      n = Ga(e, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), En.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return U.find(Uo, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, e) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const n of e)
      this._setInitialAttributesOnChild(n);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const e = this._elemIsActive(t), n = this._getOuterElement(t);
    t.setAttribute("aria-selected", e), n !== t && this._setAttributeIfNotExists(n, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const e = U.getElementFromSelector(t);
    e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, e) {
    const n = this._getOuterElement(t);
    if (!n.classList.contains(gb))
      return;
    const i = (r, o) => {
      const c = U.findOne(r, n);
      c && c.classList.toggle(o, e);
    };
    i(hh, Os), i(mb, Po), n.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, n) {
    t.hasAttribute(e) || t.setAttribute(e, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Os);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Uo) ? t : U.findOne(Uo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(yb) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = En.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
k.on(document, ub, dh, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !es(this) && En.getOrCreateInstance(this).show();
});
k.on(window, db, () => {
  for (const s of U.find(vb))
    En.getOrCreateInstance(s);
});
zt(En);
const Eb = "toast", Tb = "bs.toast", os = `.${Tb}`, Ab = `mouseover${os}`, wb = `mouseout${os}`, Nb = `focusin${os}`, Ob = `focusout${os}`, Cb = `hide${os}`, Sb = `hidden${os}`, Lb = `show${os}`, xb = `shown${os}`, kb = "fade", lc = "hide", Xi = "show", Zi = "showing", Ib = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Rb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Lr extends ne {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Rb;
  }
  static get DefaultType() {
    return Ib;
  }
  static get NAME() {
    return Eb;
  }
  // Public
  show() {
    if (k.trigger(this._element, Lb).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(kb);
    const e = () => {
      this._element.classList.remove(Zi), k.trigger(this._element, xb), this._maybeScheduleHide();
    };
    this._element.classList.remove(lc), yi(this._element), this._element.classList.add(Xi, Zi), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || k.trigger(this._element, Cb).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(lc), this._element.classList.remove(Zi, Xi), k.trigger(this._element, Sb);
    };
    this._element.classList.add(Zi), this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(Xi), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Xi);
  }
  // Private
  _maybeScheduleHide() {
    this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay)));
  }
  _onInteraction(t, e) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = e;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = e;
        break;
      }
    }
    if (e) {
      this._clearTimeout();
      return;
    }
    const n = t.relatedTarget;
    this._element === n || this._element.contains(n) || this._maybeScheduleHide();
  }
  _setListeners() {
    k.on(this._element, Ab, (t) => this._onInteraction(t, !0)), k.on(this._element, wb, (t) => this._onInteraction(t, !1)), k.on(this._element, Nb, (t) => this._onInteraction(t, !0)), k.on(this._element, Ob, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Lr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
wr(Lr);
zt(Lr);
function fh(s, t) {
  for (const e in t)
    t[e] instanceof Object && e in s && Object.assign(t[e], fh(s[e], t[e]));
  return Object.assign(s || {}, t);
}
function ph(s, t, e, n) {
  try {
    return typeof s == "function" ? s(t, e, n) : s;
  } catch {
    return null;
  }
}
async function Zn(s) {
  try {
    return {
      data: await s.json(),
      error: null
    };
  } catch (t) {
    return {
      data: void 0,
      error: t
    };
  }
}
function Ts(s, t, e) {
  return t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), s != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), t.auth && (t.auth.type == "Basic" && t.auth.user && (t.options.headers.Authorization = "Basic " + btoa(t.auth.user + ":" + t.auth.password)), t.auth.type == "Bearer" && t.auth.token && (t.options.headers.Authorization = "Bearer " + t.auth.token), t.auth.type == "Cookie" && (t.options.credentials = "include")), t.options.body = void 0, t.options.method = s, e && Object.assign(t.options, e), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function As(s, t, e, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (e ? "/" + e : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function cc(s, t = "-") {
  return s.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Db(s) {
  let t = [];
  for (let e of s)
    t.push(pr(e));
  return t;
}
function pr(s, t = "", e = {}) {
  for (let n in s) {
    let i = t ? t + "." + n : n;
    typeof s[n] == "object" && !Array.isArray(s[n]) ? pr(s[n], i, e) : e[i] = s[n];
  }
  return e;
}
function Mb(s) {
  let t = {};
  for (let e in s) {
    let n = e.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? s[e] : {} : []), t);
  }
  return t;
}
function Ja(s, t, e, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (c, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][s] ? i(s, e) : i(t[n][s]);
}
function qb(s, t, e = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(e), i = s.map(
    (r) => t.map((o) => {
      let c = r[o.name];
      return o.template ? o.template(c, r, s) : c !== void 0 ? c : "";
    }).join(e)
  );
  return [n, ...i].join(`
`);
}
function Bb(s, t = "export.csv") {
  s = "\uFEFF" + s;
  const e = new Blob([s], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(e), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function $b(s) {
  return [...new Set(s)];
}
function Pb(s, t) {
  s.indexOf(t) >= 0 ? s.splice(s.indexOf(t), 1) : s.push(t);
}
function jb(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 && s.push(e.value);
}
function Ub(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 ? s.push(e.value) : s.splice(s.indexOf(e.value), 1);
}
function Vb(s) {
  s.length = 0;
}
function Fb(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
function Hb(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
var gh = typeof global == "object" && global && global.Object === Object && global, Wb = typeof self == "object" && self && self.Object === Object && self, Te = gh || Wb || Function("return this")(), ns = Te.Symbol, mh = Object.prototype, zb = mh.hasOwnProperty, Kb = mh.toString, Qn = ns ? ns.toStringTag : void 0;
function Gb(s) {
  var t = zb.call(s, Qn), e = s[Qn];
  try {
    s[Qn] = void 0;
    var n = !0;
  } catch {
  }
  var i = Kb.call(s);
  return n && (t ? s[Qn] = e : delete s[Qn]), i;
}
var Yb = Object.prototype, Xb = Yb.toString;
function Zb(s) {
  return Xb.call(s);
}
var Qb = "[object Null]", Jb = "[object Undefined]", uc = ns ? ns.toStringTag : void 0;
function xn(s) {
  return s == null ? s === void 0 ? Jb : Qb : uc && uc in Object(s) ? Gb(s) : Zb(s);
}
function qe(s) {
  return s != null && typeof s == "object";
}
var ks = Array.isArray;
function as(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function bh(s) {
  return s;
}
var t1 = "[object AsyncFunction]", e1 = "[object Function]", s1 = "[object GeneratorFunction]", n1 = "[object Proxy]";
function tl(s) {
  if (!as(s))
    return !1;
  var t = xn(s);
  return t == e1 || t == s1 || t == t1 || t == n1;
}
var Vo = Te["__core-js_shared__"], hc = function() {
  var s = /[^.]+$/.exec(Vo && Vo.keys && Vo.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function i1(s) {
  return !!hc && hc in s;
}
var r1 = Function.prototype, o1 = r1.toString;
function qs(s) {
  if (s != null) {
    try {
      return o1.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
var a1 = /[\\^$.*+?()[\]{}|]/g, l1 = /^\[object .+?Constructor\]$/, c1 = Function.prototype, u1 = Object.prototype, h1 = c1.toString, d1 = u1.hasOwnProperty, f1 = RegExp(
  "^" + h1.call(d1).replace(a1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function p1(s) {
  if (!as(s) || i1(s))
    return !1;
  var t = tl(s) ? f1 : l1;
  return t.test(qs(s));
}
function g1(s, t) {
  return s == null ? void 0 : s[t];
}
function Bs(s, t) {
  var e = g1(s, t);
  return p1(e) ? e : void 0;
}
var ca = Bs(Te, "WeakMap"), dc = Object.create, m1 = /* @__PURE__ */ function() {
  function s() {
  }
  return function(t) {
    if (!as(t))
      return {};
    if (dc)
      return dc(t);
    s.prototype = t;
    var e = new s();
    return s.prototype = void 0, e;
  };
}();
function b1(s, t, e) {
  switch (e.length) {
    case 0:
      return s.call(t);
    case 1:
      return s.call(t, e[0]);
    case 2:
      return s.call(t, e[0], e[1]);
    case 3:
      return s.call(t, e[0], e[1], e[2]);
  }
  return s.apply(t, e);
}
function yh(s, t) {
  var e = -1, n = s.length;
  for (t || (t = Array(n)); ++e < n; )
    t[e] = s[e];
  return t;
}
var y1 = 800, _1 = 16, v1 = Date.now;
function E1(s) {
  var t = 0, e = 0;
  return function() {
    var n = v1(), i = _1 - (n - e);
    if (e = n, i > 0) {
      if (++t >= y1)
        return arguments[0];
    } else
      t = 0;
    return s.apply(void 0, arguments);
  };
}
function T1(s) {
  return function() {
    return s;
  };
}
var gr = function() {
  try {
    var s = Bs(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
}(), A1 = gr ? function(s, t) {
  return gr(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: T1(t),
    writable: !0
  });
} : bh, w1 = E1(A1);
function N1(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var O1 = 9007199254740991, C1 = /^(?:0|[1-9]\d*)$/;
function _h(s, t) {
  var e = typeof s;
  return t = t ?? O1, !!t && (e == "number" || e != "symbol" && C1.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
function el(s, t, e) {
  t == "__proto__" && gr ? gr(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
function Ti(s, t) {
  return s === t || s !== s && t !== t;
}
var S1 = Object.prototype, L1 = S1.hasOwnProperty;
function vh(s, t, e) {
  var n = s[t];
  (!(L1.call(s, t) && Ti(n, e)) || e === void 0 && !(t in s)) && el(s, t, e);
}
function Ai(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var c = t[r], a = void 0;
    a === void 0 && (a = s[c]), i ? el(e, c, a) : vh(e, c, a);
  }
  return e;
}
var fc = Math.max;
function x1(s, t, e) {
  return t = fc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = fc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var c = Array(t + 1); ++i < t; )
      c[i] = n[i];
    return c[t] = e(o), b1(s, this, c);
  };
}
function k1(s, t) {
  return w1(x1(s, t, bh), s + "");
}
var I1 = 9007199254740991;
function Eh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= I1;
}
function xr(s) {
  return s != null && Eh(s.length) && !tl(s);
}
function R1(s, t, e) {
  if (!as(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? xr(e) && _h(t, e.length) : n == "string" && t in e) ? Ti(e[t], s) : !1;
}
function D1(s) {
  return k1(function(t, e) {
    var n = -1, i = e.length, r = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (r = s.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && R1(e[0], e[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var c = e[n];
      c && s(t, c, n, r);
    }
    return t;
  });
}
var M1 = Object.prototype;
function sl(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || M1;
  return s === e;
}
function q1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var B1 = "[object Arguments]";
function pc(s) {
  return qe(s) && xn(s) == B1;
}
var Th = Object.prototype, $1 = Th.hasOwnProperty, P1 = Th.propertyIsEnumerable, ua = pc(/* @__PURE__ */ function() {
  return arguments;
}()) ? pc : function(s) {
  return qe(s) && $1.call(s, "callee") && !P1.call(s, "callee");
};
function j1() {
  return !1;
}
var Ah = typeof exports == "object" && exports && !exports.nodeType && exports, gc = Ah && typeof module == "object" && module && !module.nodeType && module, U1 = gc && gc.exports === Ah, mc = U1 ? Te.Buffer : void 0, V1 = mc ? mc.isBuffer : void 0, ci = V1 || j1, F1 = "[object Arguments]", H1 = "[object Array]", W1 = "[object Boolean]", z1 = "[object Date]", K1 = "[object Error]", G1 = "[object Function]", Y1 = "[object Map]", X1 = "[object Number]", Z1 = "[object Object]", Q1 = "[object RegExp]", J1 = "[object Set]", ty = "[object String]", ey = "[object WeakMap]", sy = "[object ArrayBuffer]", ny = "[object DataView]", iy = "[object Float32Array]", ry = "[object Float64Array]", oy = "[object Int8Array]", ay = "[object Int16Array]", ly = "[object Int32Array]", cy = "[object Uint8Array]", uy = "[object Uint8ClampedArray]", hy = "[object Uint16Array]", dy = "[object Uint32Array]", st = {};
st[iy] = st[ry] = st[oy] = st[ay] = st[ly] = st[cy] = st[uy] = st[hy] = st[dy] = !0;
st[F1] = st[H1] = st[sy] = st[W1] = st[ny] = st[z1] = st[K1] = st[G1] = st[Y1] = st[X1] = st[Z1] = st[Q1] = st[J1] = st[ty] = st[ey] = !1;
function fy(s) {
  return qe(s) && Eh(s.length) && !!st[xn(s)];
}
function nl(s) {
  return function(t) {
    return s(t);
  };
}
var wh = typeof exports == "object" && exports && !exports.nodeType && exports, ni = wh && typeof module == "object" && module && !module.nodeType && module, py = ni && ni.exports === wh, Fo = py && gh.process, Tn = function() {
  try {
    var s = ni && ni.require && ni.require("util").types;
    return s || Fo && Fo.binding && Fo.binding("util");
  } catch {
  }
}(), bc = Tn && Tn.isTypedArray, il = bc ? nl(bc) : fy, gy = Object.prototype, my = gy.hasOwnProperty;
function Nh(s, t) {
  var e = ks(s), n = !e && ua(s), i = !e && !n && ci(s), r = !e && !n && !i && il(s), o = e || n || i || r, c = o ? q1(s.length, String) : [], a = c.length;
  for (var l in s)
    (t || my.call(s, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    _h(l, a))) && c.push(l);
  return c;
}
function Oh(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var by = Oh(Object.keys, Object), yy = Object.prototype, _y = yy.hasOwnProperty;
function vy(s) {
  if (!sl(s))
    return by(s);
  var t = [];
  for (var e in Object(s))
    _y.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function rl(s) {
  return xr(s) ? Nh(s) : vy(s);
}
function Ey(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
var Ty = Object.prototype, Ay = Ty.hasOwnProperty;
function wy(s) {
  if (!as(s))
    return Ey(s);
  var t = sl(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !Ay.call(s, n)) || e.push(n);
  return e;
}
function wi(s) {
  return xr(s) ? Nh(s, !0) : wy(s);
}
var ui = Bs(Object, "create");
function Ny() {
  this.__data__ = ui ? ui(null) : {}, this.size = 0;
}
function Oy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var Cy = "__lodash_hash_undefined__", Sy = Object.prototype, Ly = Sy.hasOwnProperty;
function xy(s) {
  var t = this.__data__;
  if (ui) {
    var e = t[s];
    return e === Cy ? void 0 : e;
  }
  return Ly.call(t, s) ? t[s] : void 0;
}
var ky = Object.prototype, Iy = ky.hasOwnProperty;
function Ry(s) {
  var t = this.__data__;
  return ui ? t[s] !== void 0 : Iy.call(t, s);
}
var Dy = "__lodash_hash_undefined__";
function My(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = ui && t === void 0 ? Dy : t, this;
}
function Is(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Is.prototype.clear = Ny;
Is.prototype.delete = Oy;
Is.prototype.get = xy;
Is.prototype.has = Ry;
Is.prototype.set = My;
function qy() {
  this.__data__ = [], this.size = 0;
}
function kr(s, t) {
  for (var e = s.length; e--; )
    if (Ti(s[e][0], t))
      return e;
  return -1;
}
var By = Array.prototype, $y = By.splice;
function Py(s) {
  var t = this.__data__, e = kr(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : $y.call(t, e, 1), --this.size, !0;
}
function jy(s) {
  var t = this.__data__, e = kr(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function Uy(s) {
  return kr(this.__data__, s) > -1;
}
function Vy(s, t) {
  var e = this.__data__, n = kr(e, s);
  return n < 0 ? (++this.size, e.push([s, t])) : e[n][1] = t, this;
}
function je(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
je.prototype.clear = qy;
je.prototype.delete = Py;
je.prototype.get = jy;
je.prototype.has = Uy;
je.prototype.set = Vy;
var hi = Bs(Te, "Map");
function Fy() {
  this.size = 0, this.__data__ = {
    hash: new Is(),
    map: new (hi || je)(),
    string: new Is()
  };
}
function Hy(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Ir(s, t) {
  var e = s.__data__;
  return Hy(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function Wy(s) {
  var t = Ir(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function zy(s) {
  return Ir(this, s).get(s);
}
function Ky(s) {
  return Ir(this, s).has(s);
}
function Gy(s, t) {
  var e = Ir(this, s), n = e.size;
  return e.set(s, t), this.size += e.size == n ? 0 : 1, this;
}
function $s(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
$s.prototype.clear = Fy;
$s.prototype.delete = Wy;
$s.prototype.get = zy;
$s.prototype.has = Ky;
$s.prototype.set = Gy;
function Ch(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var ol = Oh(Object.getPrototypeOf, Object), Yy = "[object Object]", Xy = Function.prototype, Zy = Object.prototype, Sh = Xy.toString, Qy = Zy.hasOwnProperty, Jy = Sh.call(Object);
function t_(s) {
  if (!qe(s) || xn(s) != Yy)
    return !1;
  var t = ol(s);
  if (t === null)
    return !0;
  var e = Qy.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && Sh.call(e) == Jy;
}
function e_() {
  this.__data__ = new je(), this.size = 0;
}
function s_(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function n_(s) {
  return this.__data__.get(s);
}
function i_(s) {
  return this.__data__.has(s);
}
var r_ = 200;
function o_(s, t) {
  var e = this.__data__;
  if (e instanceof je) {
    var n = e.__data__;
    if (!hi || n.length < r_ - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new $s(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function be(s) {
  var t = this.__data__ = new je(s);
  this.size = t.size;
}
be.prototype.clear = e_;
be.prototype.delete = s_;
be.prototype.get = n_;
be.prototype.has = i_;
be.prototype.set = o_;
function a_(s, t) {
  return s && Ai(t, rl(t), s);
}
function l_(s, t) {
  return s && Ai(t, wi(t), s);
}
var Lh = typeof exports == "object" && exports && !exports.nodeType && exports, yc = Lh && typeof module == "object" && module && !module.nodeType && module, c_ = yc && yc.exports === Lh, _c = c_ ? Te.Buffer : void 0, vc = _c ? _c.allocUnsafe : void 0;
function xh(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = vc ? vc(e) : new s.constructor(e);
  return s.copy(n), n;
}
function u_(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function kh() {
  return [];
}
var h_ = Object.prototype, d_ = h_.propertyIsEnumerable, Ec = Object.getOwnPropertySymbols, al = Ec ? function(s) {
  return s == null ? [] : (s = Object(s), u_(Ec(s), function(t) {
    return d_.call(s, t);
  }));
} : kh;
function f_(s, t) {
  return Ai(s, al(s), t);
}
var p_ = Object.getOwnPropertySymbols, Ih = p_ ? function(s) {
  for (var t = []; s; )
    Ch(t, al(s)), s = ol(s);
  return t;
} : kh;
function g_(s, t) {
  return Ai(s, Ih(s), t);
}
function Rh(s, t, e) {
  var n = t(s);
  return ks(s) ? n : Ch(n, e(s));
}
function ha(s) {
  return Rh(s, rl, al);
}
function m_(s) {
  return Rh(s, wi, Ih);
}
var da = Bs(Te, "DataView"), fa = Bs(Te, "Promise"), pa = Bs(Te, "Set"), Tc = "[object Map]", b_ = "[object Object]", Ac = "[object Promise]", wc = "[object Set]", Nc = "[object WeakMap]", Oc = "[object DataView]", y_ = qs(da), __ = qs(hi), v_ = qs(fa), E_ = qs(pa), T_ = qs(ca), Jt = xn;
(da && Jt(new da(new ArrayBuffer(1))) != Oc || hi && Jt(new hi()) != Tc || fa && Jt(fa.resolve()) != Ac || pa && Jt(new pa()) != wc || ca && Jt(new ca()) != Nc) && (Jt = function(s) {
  var t = xn(s), e = t == b_ ? s.constructor : void 0, n = e ? qs(e) : "";
  if (n)
    switch (n) {
      case y_:
        return Oc;
      case __:
        return Tc;
      case v_:
        return Ac;
      case E_:
        return wc;
      case T_:
        return Nc;
    }
  return t;
});
var A_ = Object.prototype, w_ = A_.hasOwnProperty;
function N_(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && w_.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var mr = Te.Uint8Array;
function ll(s) {
  var t = new s.constructor(s.byteLength);
  return new mr(t).set(new mr(s)), t;
}
function O_(s, t) {
  var e = t ? ll(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var C_ = /\w*$/;
function S_(s) {
  var t = new s.constructor(s.source, C_.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var Cc = ns ? ns.prototype : void 0, Sc = Cc ? Cc.valueOf : void 0;
function L_(s) {
  return Sc ? Object(Sc.call(s)) : {};
}
function Dh(s, t) {
  var e = t ? ll(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var x_ = "[object Boolean]", k_ = "[object Date]", I_ = "[object Map]", R_ = "[object Number]", D_ = "[object RegExp]", M_ = "[object Set]", q_ = "[object String]", B_ = "[object Symbol]", $_ = "[object ArrayBuffer]", P_ = "[object DataView]", j_ = "[object Float32Array]", U_ = "[object Float64Array]", V_ = "[object Int8Array]", F_ = "[object Int16Array]", H_ = "[object Int32Array]", W_ = "[object Uint8Array]", z_ = "[object Uint8ClampedArray]", K_ = "[object Uint16Array]", G_ = "[object Uint32Array]";
function Y_(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case $_:
      return ll(s);
    case x_:
    case k_:
      return new n(+s);
    case P_:
      return O_(s, e);
    case j_:
    case U_:
    case V_:
    case F_:
    case H_:
    case W_:
    case z_:
    case K_:
    case G_:
      return Dh(s, e);
    case I_:
      return new n();
    case R_:
    case q_:
      return new n(s);
    case D_:
      return S_(s);
    case M_:
      return new n();
    case B_:
      return L_(s);
  }
}
function Mh(s) {
  return typeof s.constructor == "function" && !sl(s) ? m1(ol(s)) : {};
}
var X_ = "[object Map]";
function Z_(s) {
  return qe(s) && Jt(s) == X_;
}
var Lc = Tn && Tn.isMap, Q_ = Lc ? nl(Lc) : Z_, J_ = "[object Set]";
function tv(s) {
  return qe(s) && Jt(s) == J_;
}
var xc = Tn && Tn.isSet, ev = xc ? nl(xc) : tv, sv = 1, nv = 2, iv = 4, qh = "[object Arguments]", rv = "[object Array]", ov = "[object Boolean]", av = "[object Date]", lv = "[object Error]", Bh = "[object Function]", cv = "[object GeneratorFunction]", uv = "[object Map]", hv = "[object Number]", $h = "[object Object]", dv = "[object RegExp]", fv = "[object Set]", pv = "[object String]", gv = "[object Symbol]", mv = "[object WeakMap]", bv = "[object ArrayBuffer]", yv = "[object DataView]", _v = "[object Float32Array]", vv = "[object Float64Array]", Ev = "[object Int8Array]", Tv = "[object Int16Array]", Av = "[object Int32Array]", wv = "[object Uint8Array]", Nv = "[object Uint8ClampedArray]", Ov = "[object Uint16Array]", Cv = "[object Uint32Array]", et = {};
et[qh] = et[rv] = et[bv] = et[yv] = et[ov] = et[av] = et[_v] = et[vv] = et[Ev] = et[Tv] = et[Av] = et[uv] = et[hv] = et[$h] = et[dv] = et[fv] = et[pv] = et[gv] = et[wv] = et[Nv] = et[Ov] = et[Cv] = !0;
et[lv] = et[Bh] = et[mv] = !1;
function ar(s, t, e, n, i, r) {
  var o, c = t & sv, a = t & nv, l = t & iv;
  if (o !== void 0)
    return o;
  if (!as(s))
    return s;
  var h = ks(s);
  if (h) {
    if (o = N_(s), !c)
      return yh(s, o);
  } else {
    var f = Jt(s), p = f == Bh || f == cv;
    if (ci(s))
      return xh(s, c);
    if (f == $h || f == qh || p && !i) {
      if (o = a || p ? {} : Mh(s), !c)
        return a ? g_(s, l_(o, s)) : f_(s, a_(o, s));
    } else {
      if (!et[f])
        return i ? s : {};
      o = Y_(s, f, c);
    }
  }
  r || (r = new be());
  var g = r.get(s);
  if (g)
    return g;
  r.set(s, o), ev(s) ? s.forEach(function(T) {
    o.add(ar(T, t, e, T, s, r));
  }) : Q_(s) && s.forEach(function(T, A) {
    o.set(A, ar(T, t, e, A, s, r));
  });
  var v = l ? a ? m_ : ha : a ? wi : rl, E = h ? void 0 : v(s);
  return N1(E || s, function(T, A) {
    E && (A = T, T = s[A]), vh(o, A, ar(T, t, e, A, s, r));
  }), o;
}
var Sv = 1, Lv = 4;
function fn(s) {
  return ar(s, Sv | Lv);
}
var xv = "__lodash_hash_undefined__";
function kv(s) {
  return this.__data__.set(s, xv), this;
}
function Iv(s) {
  return this.__data__.has(s);
}
function br(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new $s(); ++t < e; )
    this.add(s[t]);
}
br.prototype.add = br.prototype.push = kv;
br.prototype.has = Iv;
function Rv(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n; )
    if (t(s[e], e, s))
      return !0;
  return !1;
}
function Dv(s, t) {
  return s.has(t);
}
var Mv = 1, qv = 2;
function Ph(s, t, e, n, i, r) {
  var o = e & Mv, c = s.length, a = t.length;
  if (c != a && !(o && a > c))
    return !1;
  var l = r.get(s), h = r.get(t);
  if (l && h)
    return l == t && h == s;
  var f = -1, p = !0, g = e & qv ? new br() : void 0;
  for (r.set(s, t), r.set(t, s); ++f < c; ) {
    var v = s[f], E = t[f];
    if (n)
      var T = o ? n(E, v, f, t, s, r) : n(v, E, f, s, t, r);
    if (T !== void 0) {
      if (T)
        continue;
      p = !1;
      break;
    }
    if (g) {
      if (!Rv(t, function(A, N) {
        if (!Dv(g, N) && (v === A || i(v, A, e, n, r)))
          return g.push(N);
      })) {
        p = !1;
        break;
      }
    } else if (!(v === E || i(v, E, e, n, r))) {
      p = !1;
      break;
    }
  }
  return r.delete(s), r.delete(t), p;
}
function Bv(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n, i) {
    e[++t] = [i, n];
  }), e;
}
function $v(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n) {
    e[++t] = n;
  }), e;
}
var Pv = 1, jv = 2, Uv = "[object Boolean]", Vv = "[object Date]", Fv = "[object Error]", Hv = "[object Map]", Wv = "[object Number]", zv = "[object RegExp]", Kv = "[object Set]", Gv = "[object String]", Yv = "[object Symbol]", Xv = "[object ArrayBuffer]", Zv = "[object DataView]", kc = ns ? ns.prototype : void 0, Ho = kc ? kc.valueOf : void 0;
function Qv(s, t, e, n, i, r, o) {
  switch (e) {
    case Zv:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case Xv:
      return !(s.byteLength != t.byteLength || !r(new mr(s), new mr(t)));
    case Uv:
    case Vv:
    case Wv:
      return Ti(+s, +t);
    case Fv:
      return s.name == t.name && s.message == t.message;
    case zv:
    case Gv:
      return s == t + "";
    case Hv:
      var c = Bv;
    case Kv:
      var a = n & Pv;
      if (c || (c = $v), s.size != t.size && !a)
        return !1;
      var l = o.get(s);
      if (l)
        return l == t;
      n |= jv, o.set(s, t);
      var h = Ph(c(s), c(t), n, i, r, o);
      return o.delete(s), h;
    case Yv:
      if (Ho)
        return Ho.call(s) == Ho.call(t);
  }
  return !1;
}
var Jv = 1, t0 = Object.prototype, e0 = t0.hasOwnProperty;
function s0(s, t, e, n, i, r) {
  var o = e & Jv, c = ha(s), a = c.length, l = ha(t), h = l.length;
  if (a != h && !o)
    return !1;
  for (var f = a; f--; ) {
    var p = c[f];
    if (!(o ? p in t : e0.call(t, p)))
      return !1;
  }
  var g = r.get(s), v = r.get(t);
  if (g && v)
    return g == t && v == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var T = o; ++f < a; ) {
    p = c[f];
    var A = s[p], N = t[p];
    if (n)
      var S = o ? n(N, A, p, t, s, r) : n(A, N, p, s, t, r);
    if (!(S === void 0 ? A === N || i(A, N, e, n, r) : S)) {
      E = !1;
      break;
    }
    T || (T = p == "constructor");
  }
  if (E && !T) {
    var L = s.constructor, I = t.constructor;
    L != I && "constructor" in s && "constructor" in t && !(typeof L == "function" && L instanceof L && typeof I == "function" && I instanceof I) && (E = !1);
  }
  return r.delete(s), r.delete(t), E;
}
var n0 = 1, Ic = "[object Arguments]", Rc = "[object Array]", Qi = "[object Object]", i0 = Object.prototype, Dc = i0.hasOwnProperty;
function r0(s, t, e, n, i, r) {
  var o = ks(s), c = ks(t), a = o ? Rc : Jt(s), l = c ? Rc : Jt(t);
  a = a == Ic ? Qi : a, l = l == Ic ? Qi : l;
  var h = a == Qi, f = l == Qi, p = a == l;
  if (p && ci(s)) {
    if (!ci(t))
      return !1;
    o = !0, h = !1;
  }
  if (p && !h)
    return r || (r = new be()), o || il(s) ? Ph(s, t, e, n, i, r) : Qv(s, t, a, e, n, i, r);
  if (!(e & n0)) {
    var g = h && Dc.call(s, "__wrapped__"), v = f && Dc.call(t, "__wrapped__");
    if (g || v) {
      var E = g ? s.value() : s, T = v ? t.value() : t;
      return r || (r = new be()), i(E, T, e, n, r);
    }
  }
  return p ? (r || (r = new be()), s0(s, t, e, n, i, r)) : !1;
}
function jh(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !qe(s) && !qe(t) ? s !== s && t !== t : r0(s, t, e, n, jh, i);
}
function o0(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), c = o.length; c--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var a0 = o0();
function ga(s, t, e) {
  (e !== void 0 && !Ti(s[t], e) || e === void 0 && !(t in s)) && el(s, t, e);
}
function l0(s) {
  return qe(s) && xr(s);
}
function ma(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function c0(s) {
  return Ai(s, wi(s));
}
function u0(s, t, e, n, i, r, o) {
  var c = ma(s, e), a = ma(t, e), l = o.get(a);
  if (l) {
    ga(s, e, l);
    return;
  }
  var h = r ? r(c, a, e + "", s, t, o) : void 0, f = h === void 0;
  if (f) {
    var p = ks(a), g = !p && ci(a), v = !p && !g && il(a);
    h = a, p || g || v ? ks(c) ? h = c : l0(c) ? h = yh(c) : g ? (f = !1, h = xh(a, !0)) : v ? (f = !1, h = Dh(a, !0)) : h = [] : t_(a) || ua(a) ? (h = c, ua(c) ? h = c0(c) : (!as(c) || tl(c)) && (h = Mh(a))) : f = !1;
  }
  f && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), ga(s, e, h);
}
function Uh(s, t, e, n, i) {
  s !== t && a0(t, function(r, o) {
    if (i || (i = new be()), as(r))
      u0(s, t, o, e, Uh, n, i);
    else {
      var c = n ? n(ma(s, o), r, o + "", s, t, i) : void 0;
      c === void 0 && (c = r), ga(s, o, c);
    }
  }, wi);
}
function cl(s, t) {
  return jh(s, t);
}
var Je = D1(function(s, t, e) {
  Uh(s, t, e);
}), $ = /* @__PURE__ */ ((s) => (s[s.TYPE = 3] = "TYPE", s[s.LEVEL = 12] = "LEVEL", s[s.ATTRIBUTE = 13] = "ATTRIBUTE", s[s.BLOT = 14] = "BLOT", s[s.INLINE = 7] = "INLINE", s[s.BLOCK = 11] = "BLOCK", s[s.BLOCK_BLOT = 10] = "BLOCK_BLOT", s[s.INLINE_BLOT = 6] = "INLINE_BLOT", s[s.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", s[s.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", s[s.ANY = 15] = "ANY", s))($ || {});
class ve {
  constructor(t, e, n = {}) {
    this.attrName = t, this.keyName = e;
    const i = $.TYPE & $.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & $.LEVEL | i
    ) : $.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
  }
  static keys(t) {
    return Array.from(t.attributes).map((e) => e.name);
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.setAttribute(this.keyName, e), !0) : !1;
  }
  canAdd(t, e) {
    return this.whitelist == null ? !0 : typeof e == "string" ? this.whitelist.indexOf(e.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e) > -1;
  }
  remove(t) {
    t.removeAttribute(this.keyName);
  }
  value(t) {
    const e = t.getAttribute(this.keyName);
    return this.canAdd(t, e) && e ? e : "";
  }
}
class pn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Vh = class ba {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(t, e = !1) {
    if (t == null)
      return null;
    if (this.blots.has(t))
      return this.blots.get(t) || null;
    if (e) {
      let n = null;
      try {
        n = t.parentNode;
      } catch {
        return null;
      }
      return this.find(n, e);
    }
    return null;
  }
  create(t, e, n) {
    const i = this.query(e);
    if (i == null)
      throw new pn(`Unable to create ${e} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(n)
    ), c = new r(t, o, n);
    return ba.blots.set(c.domNode, c), c;
  }
  find(t, e = !1) {
    return ba.find(t, e);
  }
  query(t, e = $.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & $.LEVEL & $.BLOCK ? n = this.types.block : t & $.LEVEL & $.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && e & $.LEVEL & n.scope && e & $.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((e) => {
      const n = "blotName" in e, i = "attrName" in e;
      if (!n && !i)
        throw new pn("Invalid definition");
      if (n && e.blotName === "abstract")
        throw new pn("Cannot register abstract class");
      const r = n ? e.blotName : i ? e.attrName : void 0;
      return this.types[r] = e, i ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : n && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((o) => o.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((o) => {
        (this.tags[o] == null || e.className == null) && (this.tags[o] = e);
      }))), e;
    });
  }
};
Vh.blots = /* @__PURE__ */ new WeakMap();
let An = Vh;
function Mc(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class h0 extends ve {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    Mc(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = (Mc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const ie = h0;
function Wo(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class d0 extends ve {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[Wo(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[Wo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[Wo(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
const ls = d0;
class f0 {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = An.find(this.domNode);
    if (t == null)
      return;
    const e = ve.keys(this.domNode), n = ie.keys(this.domNode), i = ls.keys(this.domNode);
    e.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, $.ATTRIBUTE);
      o instanceof ve && (this.attributes[o.attrName] = o);
    });
  }
  copy(t) {
    Object.keys(this.attributes).forEach((e) => {
      const n = this.attributes[e].value(this.domNode);
      t.format(e, n);
    });
  }
  move(t) {
    this.copy(t), Object.keys(this.attributes).forEach((e) => {
      this.attributes[e].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (t, e) => (t[e] = this.attributes[e].value(this.domNode), t),
      {}
    );
  }
}
const Rr = f0, Fh = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, An.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new pn("Blot definition missing tagName");
    let e, n;
    return Array.isArray(this.tagName) ? (typeof t == "string" ? (n = t.toUpperCase(), parseInt(n, 10).toString() === n && (n = parseInt(n, 10))) : typeof t == "number" && (n = t), typeof n == "number" ? e = document.createElement(this.tagName[n - 1]) : n && this.tagName.indexOf(n) > -1 ? e = document.createElement(n) : e = document.createElement(this.tagName[0])) : e = document.createElement(this.tagName), this.className && e.classList.add(this.className), e;
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
    this.parent != null && this.parent.removeChild(this), An.blots.delete(this.domNode);
  }
  deleteAt(t, e) {
    this.isolate(t, e).remove();
  }
  formatAt(t, e, n, i) {
    const r = this.isolate(t, e);
    if (this.scroll.query(n, $.BLOT) != null && i)
      r.wrap(n, i);
    else if (this.scroll.query(n, $.ATTRIBUTE) != null) {
      const o = this.scroll.create(this.statics.scope);
      r.wrap(o), o.format(n, i);
    }
  }
  insertAt(t, e, n) {
    const i = n == null ? this.scroll.create("text", e) : this.scroll.create(e, n), r = this.split(t);
    this.parent.insertBefore(i, r || void 0);
  }
  isolate(t, e) {
    const n = this.split(t);
    if (n == null)
      throw new Error("Attempt to isolate at end");
    return n.split(e), n;
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
  replaceWith(t, e) {
    const n = typeof t == "string" ? this.scroll.create(t, e) : t;
    return this.parent != null && (this.parent.insertBefore(n, this.next || void 0), this.remove()), n;
  }
  split(t, e) {
    return t === 0 ? this : this.next;
  }
  update(t, e) {
  }
  wrap(t, e) {
    const n = typeof t == "string" ? this.scroll.create(t, e) : t;
    if (this.parent != null && this.parent.insertBefore(n, this.next || void 0), typeof n.appendChild != "function")
      throw new pn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Fh.blotName = "abstract";
let Hh = Fh;
const Wh = class extends Hh {
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
  index(t, e) {
    return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(t, e) {
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
Wh.scope = $.INLINE_BLOT;
let p0 = Wh;
const yt = p0;
class g0 {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...t) {
    if (this.insertBefore(t[0], null), t.length > 1) {
      const e = t.slice(1);
      this.append(...e);
    }
  }
  at(t) {
    const e = this.iterator();
    let n = e();
    for (; n && t > 0; )
      t -= 1, n = e();
    return n;
  }
  contains(t) {
    const e = this.iterator();
    let n = e();
    for (; n; ) {
      if (n === t)
        return !0;
      n = e();
    }
    return !1;
  }
  indexOf(t) {
    const e = this.iterator();
    let n = e(), i = 0;
    for (; n; ) {
      if (n === t)
        return i;
      i += 1, n = e();
    }
    return -1;
  }
  insertBefore(t, e) {
    t != null && (this.remove(t), t.next = e, e != null ? (t.prev = e.prev, e.prev != null && (e.prev.next = t), e.prev = t, e === this.head && (this.head = t)) : this.tail != null ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1);
  }
  offset(t) {
    let e = 0, n = this.head;
    for (; n != null; ) {
      if (n === t)
        return e;
      e += n.length(), n = n.next;
    }
    return -1;
  }
  remove(t) {
    this.contains(t) && (t.prev != null && (t.prev.next = t.next), t.next != null && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1);
  }
  iterator(t = this.head) {
    return () => {
      const e = t;
      return t != null && (t = t.next), e;
    };
  }
  find(t, e = !1) {
    const n = this.iterator();
    let i = n();
    for (; i; ) {
      const r = i.length();
      if (t < r || e && t === r && (i.next == null || i.next.length() !== 0))
        return [i, t];
      t -= r, i = n();
    }
    return [null, 0];
  }
  forEach(t) {
    const e = this.iterator();
    let n = e();
    for (; n; )
      t(n), n = e();
  }
  forEachAt(t, e, n) {
    if (e <= 0)
      return;
    const [i, r] = this.find(t);
    let o = t - r;
    const c = this.iterator(i);
    let a = c();
    for (; a && o < t + e; ) {
      const l = a.length();
      t > o ? n(
        a,
        t - o,
        Math.min(e, o + l - t)
      ) : n(a, 0, Math.min(l, t + e - o)), o += l, a = c();
    }
  }
  map(t) {
    return this.reduce((e, n) => (e.push(t(n)), e), []);
  }
  reduce(t, e) {
    const n = this.iterator();
    let i = n();
    for (; i; )
      e = t(e, i), i = n();
    return e;
  }
}
function qc(s, t) {
  const e = t.find(s);
  if (e)
    return e;
  try {
    return t.create(s);
  } catch {
    const n = t.create($.INLINE);
    return Array.from(s.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), s.parentNode && s.parentNode.replaceChild(n.domNode, s), n.attach(), n;
  }
}
const zh = class Ye extends Hh {
  constructor(t, e) {
    super(t, e), this.uiNode = null, this.build();
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, Ye.uiClass && this.uiNode.classList.add(Ye.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new g0(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = qc(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof pn)
          return;
        throw e;
      }
    });
  }
  deleteAt(t, e) {
    if (t === 0 && e === this.length())
      return this.remove();
    this.children.forEachAt(t, e, (n, i, r) => {
      n.deleteAt(i, r);
    });
  }
  descendant(t, e = 0) {
    const [n, i] = this.children.find(e);
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof Ye ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, e = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      e,
      n,
      (o, c, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof Ye && (i = i.concat(
          o.descendants(t, c, r)
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
    this.children.forEach((e) => {
      t || this.statics.allowedChildren.some(
        (n) => e instanceof n
      ) || (e.statics.scope === $.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof Ye ? e.unwrap() : e.remove());
    });
  }
  formatAt(t, e, n, i) {
    this.children.forEachAt(t, e, (r, o, c) => {
      r.formatAt(o, c, n, i);
    });
  }
  insertAt(t, e, n) {
    const [i, r] = this.children.find(t);
    if (i)
      i.insertAt(r, e, n);
    else {
      const o = n == null ? this.scroll.create("text", e) : this.scroll.create(e, n);
      this.appendChild(o);
    }
  }
  insertBefore(t, e) {
    t.parent != null && t.parent.children.remove(t);
    let n = null;
    this.children.insertBefore(t, e || null), t.parent = this, e != null && (n = e.domNode), (this.domNode.parentNode !== t.domNode || this.domNode.nextSibling !== n) && this.domNode.insertBefore(t.domNode, n), t.attach();
  }
  length() {
    return this.children.reduce((t, e) => t + e.length(), 0);
  }
  moveChildren(t, e) {
    this.children.forEach((n) => {
      t.insertBefore(n, e);
    });
  }
  optimize(t) {
    if (super.optimize(t), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const e = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(e);
      } else
        this.remove();
  }
  path(t, e = !1) {
    const [n, i] = this.children.find(t, e), r = [[this, t]];
    return n instanceof Ye ? r.concat(n.path(i, e)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, e) {
    const n = typeof t == "string" ? this.scroll.create(t, e) : t;
    return n instanceof Ye && this.moveChildren(n), super.replaceWith(n);
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const n = this.clone();
    return this.parent && this.parent.insertBefore(n, this.next || void 0), this.children.forEachAt(t, this.length(), (i, r, o) => {
      const c = i.split(r, e);
      c != null && n.appendChild(c);
    }), n;
  }
  splitAfter(t) {
    const e = this.clone();
    for (; t.next != null; )
      e.appendChild(t.next);
    return this.parent && this.parent.insertBefore(e, this.next || void 0), e;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(t, e) {
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
      const c = qc(r, this.scroll);
      (c.next !== o || c.next == null) && (c.parent != null && c.parent.removeChild(this), this.insertBefore(c, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
zh.uiClass = "";
let m0 = zh;
const ee = m0;
function b0(s, t) {
  if (Object.keys(s).length !== Object.keys(t).length)
    return !1;
  for (const e in s)
    if (s[e] !== t[e])
      return !1;
  return !0;
}
const rn = class on extends ee {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(on.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new Rr(this.domNode);
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((n) => {
        n instanceof on || (n = n.wrap(on.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, $.INLINE);
      if (n == null)
        return;
      n instanceof ve ? this.attributes.attribute(n, e) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e);
    }
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, n, i) {
    this.formats()[n] != null || this.scroll.query(n, $.ATTRIBUTE) ? this.isolate(t, e).format(n, i) : super.formatAt(t, e, n, i);
  }
  optimize(t) {
    super.optimize(t);
    const e = this.formats();
    if (Object.keys(e).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof on && n.prev === this && b0(e, n.formats()) && (n.moveChildren(this), n.remove());
  }
  replaceWith(t, e) {
    const n = super.replaceWith(t, e);
    return this.attributes.copy(n), n;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(t, e) {
    const n = super.wrap(t, e);
    return n instanceof on && this.attributes.move(n), n;
  }
};
rn.allowedChildren = [rn, yt], rn.blotName = "inline", rn.scope = $.INLINE_BLOT, rn.tagName = "SPAN";
let y0 = rn;
const ul = y0, an = class ya extends ee {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(ya.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new Rr(this.domNode);
  }
  format(t, e) {
    const n = this.scroll.query(t, $.BLOCK);
    n != null && (n instanceof ve ? this.attributes.attribute(n, e) : t === this.statics.blotName && !e ? this.replaceWith(ya.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, n, i) {
    this.scroll.query(n, $.BLOCK) != null ? this.format(n, i) : super.formatAt(t, e, n, i);
  }
  insertAt(t, e, n) {
    if (n == null || this.scroll.query(e, $.INLINE) != null)
      super.insertAt(t, e, n);
    else {
      const i = this.split(t);
      if (i != null) {
        const r = this.scroll.create(e, n);
        i.parent.insertBefore(r, i);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(t, e) {
    const n = super.replaceWith(t, e);
    return this.attributes.copy(n), n;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
};
an.blotName = "block", an.scope = $.BLOCK_BLOT, an.tagName = "P", an.allowedChildren = [
  ul,
  an,
  yt
];
let _0 = an;
const di = _0, _a = class extends ee {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(t, e) {
    super.deleteAt(t, e), this.enforceAllowedChildren();
  }
  formatAt(t, e, n, i) {
    super.formatAt(t, e, n, i), this.enforceAllowedChildren();
  }
  insertAt(t, e, n) {
    super.insertAt(t, e, n), this.enforceAllowedChildren();
  }
  optimize(t) {
    super.optimize(t), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
_a.blotName = "container", _a.scope = $.BLOCK_BLOT;
let v0 = _a;
const Dr = v0;
class E0 extends yt {
  static formats(t, e) {
  }
  format(t, e) {
    super.formatAt(0, this.length(), t, e);
  }
  formatAt(t, e, n, i) {
    t === 0 && e === this.length() ? this.format(n, i) : super.formatAt(t, e, n, i);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Dt = E0, T0 = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, A0 = 100, ln = class extends ee {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, T0), this.attach();
  }
  create(t, e) {
    return this.registry.create(this, t, e);
  }
  find(t, e = !1) {
    const n = this.registry.find(t, e);
    return n ? n.scroll === this ? n : e ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, e = $.ANY) {
    return this.registry.query(t, e);
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
  deleteAt(t, e) {
    this.update(), t === 0 && e === this.length() ? this.children.forEach((n) => {
      n.remove();
    }) : super.deleteAt(t, e);
  }
  formatAt(t, e, n, i) {
    this.update(), super.formatAt(t, e, n, i);
  }
  insertAt(t, e, n) {
    this.update(), super.insertAt(t, e, n);
  }
  optimize(t = [], e = {}) {
    super.optimize(e);
    const n = e.mutationsMap || /* @__PURE__ */ new WeakMap();
    let i = Array.from(this.observer.takeRecords());
    for (; i.length > 0; )
      t.push(i.pop());
    const r = (a, l = !0) => {
      a == null || a === this || a.domNode.parentNode != null && (n.has(a.domNode) || n.set(a.domNode, []), l && r(a.parent));
    }, o = (a) => {
      n.has(a.domNode) && (a instanceof ee && a.children.forEach(o), n.delete(a.domNode), a.optimize(e));
    };
    let c = t;
    for (let a = 0; c.length > 0; a += 1) {
      if (a >= A0)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (c.forEach((l) => {
        const h = this.find(l.target, !0);
        h != null && (h.domNode === l.target && (l.type === "childList" ? (r(this.find(l.previousSibling, !1)), Array.from(l.addedNodes).forEach((f) => {
          const p = this.find(f, !1);
          r(p, !1), p instanceof ee && p.children.forEach((g) => {
            r(g, !1);
          });
        })) : l.type === "attributes" && r(h.prev)), r(h));
      }), this.children.forEach(o), c = Array.from(this.observer.takeRecords()), i = c.slice(); i.length > 0; )
        t.push(i.pop());
    }
  }
  update(t, e = {}) {
    t = t || this.observer.takeRecords();
    const n = /* @__PURE__ */ new WeakMap();
    t.map((i) => {
      const r = this.find(i.target, !0);
      return r == null ? null : n.has(r.domNode) ? (n.get(r.domNode).push(i), null) : (n.set(r.domNode, [i]), r);
    }).forEach((i) => {
      i != null && i !== this && n.has(i.domNode) && i.update(n.get(i.domNode) || [], e);
    }), e.mutationsMap = n, n.has(this.domNode) && super.update(n.get(this.domNode), e), this.optimize(t, e);
  }
};
ln.blotName = "scroll", ln.defaultChild = di, ln.allowedChildren = [di, Dr], ln.scope = $.BLOCK_BLOT, ln.tagName = "DIV";
let w0 = ln;
const hl = w0, va = class Kh extends yt {
  static create(t) {
    return document.createTextNode(t);
  }
  static value(t) {
    return t.data;
  }
  constructor(t, e) {
    super(t, e), this.text = this.statics.value(this.domNode);
  }
  deleteAt(t, e) {
    this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
  }
  index(t, e) {
    return this.domNode === t ? e : -1;
  }
  insertAt(t, e, n) {
    n == null ? (this.text = this.text.slice(0, t) + e + this.text.slice(t), this.domNode.data = this.text) : super.insertAt(t, e, n);
  }
  length() {
    return this.text.length;
  }
  optimize(t) {
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Kh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(t, e = !1) {
    return [this.domNode, t];
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const n = this.scroll.create(this.domNode.splitText(t));
    return this.parent.insertBefore(n, this.next || void 0), this.text = this.statics.value(this.domNode), n;
  }
  update(t, e) {
    t.some((n) => n.type === "characterData" && n.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
va.blotName = "text", va.scope = $.INLINE_BLOT;
let N0 = va;
const yr = N0, O0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: ve,
  AttributorStore: Rr,
  BlockBlot: di,
  ClassAttributor: ie,
  ContainerBlot: Dr,
  EmbedBlot: Dt,
  InlineBlot: ul,
  LeafBlot: yt,
  ParentBlot: ee,
  Registry: An,
  Scope: $,
  ScrollBlot: hl,
  StyleAttributor: ls,
  TextBlot: yr
}, Symbol.toStringTag, { value: "Module" }));
var Xe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gh(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ea = { exports: {} }, xt = -1, Tt = 1, ct = 0;
function fi(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = M0(s, t, e);
    if (r)
      return r;
  }
  var o = dl(s, t), c = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = Mr(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var l = C0(s, t);
  return c && l.unshift([ct, c]), a && l.push([ct, a]), fl(l, i), n && x0(l), l;
}
function C0(s, t) {
  var e;
  if (!s)
    return [[Tt, t]];
  if (!t)
    return [[xt, s]];
  var n = s.length > t.length ? s : t, i = s.length > t.length ? t : s, r = n.indexOf(i);
  if (r !== -1)
    return e = [
      [Tt, n.substring(0, r)],
      [ct, i],
      [Tt, n.substring(r + i.length)]
    ], s.length > t.length && (e[0][0] = e[2][0] = xt), e;
  if (i.length === 1)
    return [
      [xt, s],
      [Tt, t]
    ];
  var o = L0(s, t);
  if (o) {
    var c = o[0], a = o[1], l = o[2], h = o[3], f = o[4], p = fi(c, l), g = fi(a, h);
    return p.concat([[ct, f]], g);
  }
  return S0(s, t);
}
function S0(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, c = new Array(o), a = new Array(o), l = 0; l < o; l++)
    c[l] = -1, a[l] = -1;
  c[r + 1] = 0, a[r + 1] = 0;
  for (var h = e - n, f = h % 2 !== 0, p = 0, g = 0, v = 0, E = 0, T = 0; T < i; T++) {
    for (var A = -T + p; A <= T - g; A += 2) {
      var N = r + A, S;
      A === -T || A !== T && c[N - 1] < c[N + 1] ? S = c[N + 1] : S = c[N - 1] + 1;
      for (var L = S - A; S < e && L < n && s.charAt(S) === t.charAt(L); )
        S++, L++;
      if (c[N] = S, S > e)
        g += 2;
      else if (L > n)
        p += 2;
      else if (f) {
        var I = r + h - A;
        if (I >= 0 && I < o && a[I] !== -1) {
          var R = e - a[I];
          if (S >= R)
            return Bc(s, t, S, L);
        }
      }
    }
    for (var P = -T + v; P <= T - E; P += 2) {
      var I = r + P, R;
      P === -T || P !== T && a[I - 1] < a[I + 1] ? R = a[I + 1] : R = a[I - 1] + 1;
      for (var V = R - P; R < e && V < n && s.charAt(e - R - 1) === t.charAt(n - V - 1); )
        R++, V++;
      if (a[I] = R, R > e)
        E += 2;
      else if (V > n)
        v += 2;
      else if (!f) {
        var N = r + h - P;
        if (N >= 0 && N < o && c[N] !== -1) {
          var S = c[N], L = r + S - N;
          if (R = e - R, S >= R)
            return Bc(s, t, S, L);
        }
      }
    }
  }
  return [
    [xt, s],
    [Tt, t]
  ];
}
function Bc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), c = t.substring(n), a = fi(i, r), l = fi(o, c);
  return a.concat(l);
}
function dl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Yh(s.charCodeAt(i - 1)) && i--, i;
}
function $c(s, t) {
  var e = s.length, n = t.length;
  if (e == 0 || n == 0)
    return 0;
  e > n ? s = s.substring(e - n) : e < n && (t = t.substring(0, e));
  var i = Math.min(e, n);
  if (s == t)
    return i;
  for (var r = 0, o = 1; ; ) {
    var c = s.substring(i - o), a = t.indexOf(c);
    if (a == -1)
      return r;
    o += a, (a == 0 || s.substring(i - o) == t.substring(0, o)) && (r = o, o++);
  }
}
function Mr(s, t) {
  if (!s || !t || s.slice(-1) !== t.slice(-1))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(s.length - i, s.length - r) == t.substring(t.length - i, t.length - r) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Xh(s.charCodeAt(s.length - i)) && i--, i;
}
function L0(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(g, v, E) {
    for (var T = g.substring(E, E + Math.floor(g.length / 4)), A = -1, N = "", S, L, I, R; (A = v.indexOf(T, A + 1)) !== -1; ) {
      var P = dl(
        g.substring(E),
        v.substring(A)
      ), V = Mr(
        g.substring(0, E),
        v.substring(0, A)
      );
      N.length < V + P && (N = v.substring(A - V, A) + v.substring(A, A + P), S = g.substring(0, E - V), L = g.substring(E + P), I = v.substring(0, A - V), R = v.substring(A + P));
    }
    return N.length * 2 >= g.length ? [
      S,
      L,
      I,
      R,
      N
    ] : null;
  }
  var r = i(
    e,
    n,
    Math.ceil(e.length / 4)
  ), o = i(
    e,
    n,
    Math.ceil(e.length / 2)
  ), c;
  if (!r && !o)
    return null;
  o ? r ? c = r[4].length > o[4].length ? r : o : c = o : c = r;
  var a, l, h, f;
  s.length > t.length ? (a = c[0], l = c[1], h = c[2], f = c[3]) : (h = c[0], f = c[1], a = c[2], l = c[3]);
  var p = c[4];
  return [a, l, h, f, p];
}
function x0(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, c = 0, a = 0, l = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, c = l, a = 0, l = 0, i = s[r][1]) : (s[r][0] == Tt ? a += s[r][1].length : l += s[r][1].length, i && i.length <= Math.max(o, c) && i.length <= Math.max(a, l) && (s.splice(e[n - 1], 0, [
      xt,
      i
    ]), s[e[n - 1] + 1][0] = Tt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, c = 0, a = 0, l = 0, i = null, t = !0)), r++;
  for (t && fl(s), R0(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == xt && s[r][0] == Tt) {
      var h = s[r - 1][1], f = s[r][1], p = $c(h, f), g = $c(f, h);
      p >= g ? (p >= h.length / 2 || p >= f.length / 2) && (s.splice(r, 0, [
        ct,
        f.substring(0, p)
      ]), s[r - 1][1] = h.substring(
        0,
        h.length - p
      ), s[r + 1][1] = f.substring(p), r++) : (g >= h.length / 2 || g >= f.length / 2) && (s.splice(r, 0, [
        ct,
        h.substring(0, g)
      ]), s[r - 1][0] = Tt, s[r - 1][1] = f.substring(
        0,
        f.length - g
      ), s[r + 1][0] = xt, s[r + 1][1] = h.substring(g), r++), r++;
    }
    r++;
  }
}
var Pc = /[^a-zA-Z0-9]/, jc = /\s/, Uc = /[\r\n]/, k0 = /\n\r?\n$/, I0 = /^\r?\n\r?\n/;
function R0(s) {
  function t(g, v) {
    if (!g || !v)
      return 6;
    var E = g.charAt(g.length - 1), T = v.charAt(0), A = E.match(Pc), N = T.match(Pc), S = A && E.match(jc), L = N && T.match(jc), I = S && E.match(Uc), R = L && T.match(Uc), P = I && g.match(k0), V = R && v.match(I0);
    return P || V ? 5 : I || R ? 4 : A && !S && L ? 3 : S || L ? 2 : A || N ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = Mr(n, i);
      if (o) {
        var c = i.substring(i.length - o);
        n = n.substring(0, n.length - o), i = c + i.substring(0, i.length - o), r = c + r;
      }
      for (var a = n, l = i, h = r, f = t(n, i) + t(i, r); i.charAt(0) === r.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + r.charAt(0), r = r.substring(1);
        var p = t(n, i) + t(i, r);
        p >= f && (f = p, a = n, l = i, h = r);
      }
      s[e - 1][1] != a && (a ? s[e - 1][1] = a : (s.splice(e - 1, 1), e--), s[e][1] = l, h ? s[e + 1][1] = h : (s.splice(e + 1, 1), e--));
    }
    e++;
  }
}
function fl(s, t) {
  s.push([ct, ""]);
  for (var e = 0, n = 0, i = 0, r = "", o = "", c; e < s.length; ) {
    if (e < s.length - 1 && !s[e][1]) {
      s.splice(e, 1);
      continue;
    }
    switch (s[e][0]) {
      case Tt:
        i++, o += s[e][1], e++;
        break;
      case xt:
        n++, r += s[e][1], e++;
        break;
      case ct:
        var a = e - i - n - 1;
        if (t) {
          if (a >= 0 && Qh(s[a][1])) {
            var l = s[a][1].slice(-1);
            if (s[a][1] = s[a][1].slice(
              0,
              -1
            ), r = l + r, o = l + o, !s[a][1]) {
              s.splice(a, 1), e--;
              var h = a - 1;
              s[h] && s[h][0] === Tt && (i++, o = s[h][1] + o, h--), s[h] && s[h][0] === xt && (n++, r = s[h][1] + r, h--), a = h;
            }
          }
          if (Zh(s[e][1])) {
            var l = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += l, o += l;
          }
        }
        if (e < s.length - 1 && !s[e][1]) {
          s.splice(e, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (c = dl(o, r), c !== 0 && (a >= 0 ? s[a][1] += o.substring(
            0,
            c
          ) : (s.splice(0, 0, [
            ct,
            o.substring(0, c)
          ]), e++), o = o.substring(c), r = r.substring(c)), c = Mr(o, r), c !== 0 && (s[e][1] = o.substring(o.length - c) + s[e][1], o = o.substring(
            0,
            o.length - c
          ), r = r.substring(
            0,
            r.length - c
          )));
          var f = i + n;
          r.length === 0 && o.length === 0 ? (s.splice(e - f, f), e = e - f) : r.length === 0 ? (s.splice(e - f, f, [Tt, o]), e = e - f + 1) : o.length === 0 ? (s.splice(e - f, f, [xt, r]), e = e - f + 1) : (s.splice(
            e - f,
            f,
            [xt, r],
            [Tt, o]
          ), e = e - f + 2);
        }
        e !== 0 && s[e - 1][0] === ct ? (s[e - 1][1] += s[e][1], s.splice(e, 1)) : e++, i = 0, n = 0, r = "", o = "";
        break;
    }
  }
  s[s.length - 1][1] === "" && s.pop();
  var p = !1;
  for (e = 1; e < s.length - 1; )
    s[e - 1][0] === ct && s[e + 1][0] === ct && (s[e][1].substring(
      s[e][1].length - s[e - 1][1].length
    ) === s[e - 1][1] ? (s[e][1] = s[e - 1][1] + s[e][1].substring(
      0,
      s[e][1].length - s[e - 1][1].length
    ), s[e + 1][1] = s[e - 1][1] + s[e + 1][1], s.splice(e - 1, 1), p = !0) : s[e][1].substring(0, s[e + 1][1].length) == s[e + 1][1] && (s[e - 1][1] += s[e + 1][1], s[e][1] = s[e][1].substring(s[e + 1][1].length) + s[e + 1][1], s.splice(e + 1, 1), p = !0)), e++;
  p && fl(s, t);
}
function Yh(s) {
  return s >= 55296 && s <= 56319;
}
function Xh(s) {
  return s >= 56320 && s <= 57343;
}
function Zh(s) {
  return Xh(s.charCodeAt(0));
}
function Qh(s) {
  return Yh(s.charCodeAt(s.length - 1));
}
function D0(s) {
  for (var t = [], e = 0; e < s.length; e++)
    s[e][1].length > 0 && t.push(s[e]);
  return t;
}
function zo(s, t, e, n) {
  return Qh(s) || Zh(n) ? null : D0([
    [ct, s],
    [xt, t],
    [Tt, e],
    [ct, n]
  ]);
}
function M0(s, t, e) {
  var n = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i = typeof e == "number" ? null : e.newRange, r = s.length, o = t.length;
  if (n.length === 0 && (i === null || i.length === 0)) {
    var c = n.index, a = s.slice(0, c), l = s.slice(c), h = i ? i.index : null;
    t: {
      var f = c + o - r;
      if (h !== null && h !== f || f < 0 || f > o)
        break t;
      var p = t.slice(0, f), g = t.slice(f);
      if (g !== l)
        break t;
      var v = Math.min(c, f), E = a.slice(0, v), T = p.slice(0, v);
      if (E !== T)
        break t;
      var A = a.slice(v), N = p.slice(v);
      return zo(E, A, N, l);
    }
    t: {
      if (h !== null && h !== c)
        break t;
      var S = c, p = t.slice(0, S), g = t.slice(S);
      if (p !== a)
        break t;
      var L = Math.min(r - S, o - S), I = l.slice(l.length - L), R = g.slice(g.length - L);
      if (I !== R)
        break t;
      var A = l.slice(0, l.length - L), N = g.slice(0, g.length - L);
      return zo(a, A, N, I);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), I = s.slice(n.index + n.length), v = E.length, L = I.length;
      if (o < v + L)
        break t;
      var T = t.slice(0, v), R = t.slice(o - L);
      if (E !== T || I !== R)
        break t;
      var A = s.slice(v, r - L), N = t.slice(v, o - L);
      return zo(E, A, N, I);
    }
  return null;
}
function qr(s, t, e, n) {
  return fi(s, t, e, n, !0);
}
qr.INSERT = Tt;
qr.DELETE = xt;
qr.EQUAL = ct;
var q0 = qr, _r = { exports: {} };
_r.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", c = "[object Boolean]", a = "[object Date]", l = "[object Error]", h = "[object Function]", f = "[object GeneratorFunction]", p = "[object Map]", g = "[object Number]", v = "[object Object]", E = "[object Promise]", T = "[object RegExp]", A = "[object Set]", N = "[object String]", S = "[object Symbol]", L = "[object WeakMap]", I = "[object ArrayBuffer]", R = "[object DataView]", P = "[object Float32Array]", V = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Mt = "[object Uint16Array]", qt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, vt = /\w*$/, Ve = /^\[object .+?Constructor\]$/, Kt = /^(?:0|[1-9]\d*)$/, K = {};
  K[r] = K[o] = K[I] = K[R] = K[c] = K[a] = K[P] = K[V] = K[J] = K[tt] = K[nt] = K[p] = K[g] = K[v] = K[T] = K[A] = K[N] = K[S] = K[ot] = K[it] = K[Mt] = K[qt] = !0, K[l] = K[h] = K[L] = !1;
  var cs = typeof Xe == "object" && Xe && Xe.Object === Object && Xe, Ae = typeof self == "object" && self && self.Object === Object && self, pt = cs || Ae || Function("return this")(), Gt = t && !t.nodeType && t, H = Gt && !0 && s && !s.nodeType && s, ae = H && H.exports === Gt;
  function Fe(u, d) {
    return u.set(d[0], d[1]), u;
  }
  function at(u, d) {
    return u.add(d), u;
  }
  function He(u, d) {
    for (var b = -1, w = u ? u.length : 0; ++b < w && d(u[b], b, u) !== !1; )
      ;
    return u;
  }
  function Vs(u, d) {
    for (var b = -1, w = d.length, F = u.length; ++b < w; )
      u[F + b] = d[b];
    return u;
  }
  function we(u, d, b, w) {
    for (var F = -1, j = u ? u.length : 0; ++F < j; )
      b = d(b, u[F], F, u);
    return b;
  }
  function us(u, d) {
    for (var b = -1, w = Array(u); ++b < u; )
      w[b] = d(b);
    return w;
  }
  function hs(u, d) {
    return u == null ? void 0 : u[d];
  }
  function ds(u) {
    var d = !1;
    if (u != null && typeof u.toString != "function")
      try {
        d = !!(u + "");
      } catch {
      }
    return d;
  }
  function Fs(u) {
    var d = -1, b = Array(u.size);
    return u.forEach(function(w, F) {
      b[++d] = [F, w];
    }), b;
  }
  function We(u, d) {
    return function(b) {
      return u(d(b));
    };
  }
  function fs(u) {
    var d = -1, b = Array(u.size);
    return u.forEach(function(w) {
      b[++d] = w;
    }), b;
  }
  var In = Array.prototype, Rn = Function.prototype, Nt = Object.prototype, le = pt["__core-js_shared__"], ps = function() {
    var u = /[^.]+$/.exec(le && le.keys && le.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), gs = Rn.toString, Ot = Nt.hasOwnProperty, Ne = Nt.toString, Hs = RegExp(
    "^" + gs.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ce = ae ? pt.Buffer : void 0, Oe = pt.Symbol, Dn = pt.Uint8Array, Bt = We(Object.getPrototypeOf, Object), Li = Object.create, xi = Nt.propertyIsEnumerable, Ur = In.splice, Mn = Object.getOwnPropertySymbols, Ws = ce ? ce.isBuffer : void 0, ki = We(Object.keys, Object), zs = Xt(pt, "DataView"), ms = Xt(pt, "Map"), Yt = Xt(pt, "Promise"), Ks = Xt(pt, "Set"), qn = Xt(pt, "WeakMap"), bs = Xt(Object, "create"), Bn = Et(zs), ys = Et(ms), $n = Et(Yt), Pn = Et(Ks), jn = Et(qn), ze = Oe ? Oe.prototype : void 0, Ii = ze ? ze.valueOf : void 0;
  function Ce(u) {
    var d = -1, b = u ? u.length : 0;
    for (this.clear(); ++d < b; ) {
      var w = u[d];
      this.set(w[0], w[1]);
    }
  }
  function Vr() {
    this.__data__ = bs ? bs(null) : {};
  }
  function Fr(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function Hr(u) {
    var d = this.__data__;
    if (bs) {
      var b = d[u];
      return b === n ? void 0 : b;
    }
    return Ot.call(d, u) ? d[u] : void 0;
  }
  function Ri(u) {
    var d = this.__data__;
    return bs ? d[u] !== void 0 : Ot.call(d, u);
  }
  function Un(u, d) {
    var b = this.__data__;
    return b[u] = bs && d === void 0 ? n : d, this;
  }
  Ce.prototype.clear = Vr, Ce.prototype.delete = Fr, Ce.prototype.get = Hr, Ce.prototype.has = Ri, Ce.prototype.set = Un;
  function ht(u) {
    var d = -1, b = u ? u.length : 0;
    for (this.clear(); ++d < b; ) {
      var w = u[d];
      this.set(w[0], w[1]);
    }
  }
  function Wr() {
    this.__data__ = [];
  }
  function zr(u) {
    var d = this.__data__, b = Ys(d, u);
    if (b < 0)
      return !1;
    var w = d.length - 1;
    return b == w ? d.pop() : Ur.call(d, b, 1), !0;
  }
  function Kr(u) {
    var d = this.__data__, b = Ys(d, u);
    return b < 0 ? void 0 : d[b][1];
  }
  function Gr(u) {
    return Ys(this.__data__, u) > -1;
  }
  function Yr(u, d) {
    var b = this.__data__, w = Ys(b, u);
    return w < 0 ? b.push([u, d]) : b[w][1] = d, this;
  }
  ht.prototype.clear = Wr, ht.prototype.delete = zr, ht.prototype.get = Kr, ht.prototype.has = Gr, ht.prototype.set = Yr;
  function gt(u) {
    var d = -1, b = u ? u.length : 0;
    for (this.clear(); ++d < b; ) {
      var w = u[d];
      this.set(w[0], w[1]);
    }
  }
  function Xr() {
    this.__data__ = {
      hash: new Ce(),
      map: new (ms || ht)(),
      string: new Ce()
    };
  }
  function Zr(u) {
    return vs(this, u).delete(u);
  }
  function Qr(u) {
    return vs(this, u).get(u);
  }
  function Jr(u) {
    return vs(this, u).has(u);
  }
  function to(u, d) {
    return vs(this, u).set(u, d), this;
  }
  gt.prototype.clear = Xr, gt.prototype.delete = Zr, gt.prototype.get = Qr, gt.prototype.has = Jr, gt.prototype.set = to;
  function Ct(u) {
    this.__data__ = new ht(u);
  }
  function eo() {
    this.__data__ = new ht();
  }
  function so(u) {
    return this.__data__.delete(u);
  }
  function no(u) {
    return this.__data__.get(u);
  }
  function io(u) {
    return this.__data__.has(u);
  }
  function ro(u, d) {
    var b = this.__data__;
    if (b instanceof ht) {
      var w = b.__data__;
      if (!ms || w.length < e - 1)
        return w.push([u, d]), this;
      b = this.__data__ = new gt(w);
    }
    return b.set(u, d), this;
  }
  Ct.prototype.clear = eo, Ct.prototype.delete = so, Ct.prototype.get = no, Ct.prototype.has = io, Ct.prototype.set = ro;
  function Gs(u, d) {
    var b = Wn(u) || Zs(u) ? us(u.length, String) : [], w = b.length, F = !!w;
    for (var j in u)
      Ot.call(u, j) && !(F && (j == "length" || vo(j, w))) && b.push(j);
    return b;
  }
  function Di(u, d, b) {
    var w = u[d];
    (!(Ot.call(u, d) && Pi(w, b)) || b === void 0 && !(d in u)) && (u[d] = b);
  }
  function Ys(u, d) {
    for (var b = u.length; b--; )
      if (Pi(u[b][0], d))
        return b;
    return -1;
  }
  function ue(u, d) {
    return u && Hn(d, Kn(d), u);
  }
  function Vn(u, d, b, w, F, j, Z) {
    var G;
    if (w && (G = j ? w(u, F, j, Z) : w(u)), G !== void 0)
      return G;
    if (!de(u))
      return u;
    var rt = Wn(u);
    if (rt) {
      if (G = yo(u), !d)
        return go(u, G);
    } else {
      var Q = Le(u), mt = Q == h || Q == f;
      if (ji(u))
        return Xs(u, d);
      if (Q == v || Q == r || mt && !j) {
        if (ds(u))
          return j ? u : {};
        if (G = he(mt ? {} : u), !d)
          return mo(u, ue(G, u));
      } else {
        if (!K[Q])
          return j ? u : {};
        G = _o(u, Q, Vn, d);
      }
    }
    Z || (Z = new Ct());
    var St = Z.get(u);
    if (St)
      return St;
    if (Z.set(u, G), !rt)
      var lt = b ? bo(u) : Kn(u);
    return He(lt || u, function(bt, dt) {
      lt && (dt = bt, bt = u[dt]), Di(G, dt, Vn(bt, d, b, w, dt, u, Z));
    }), G;
  }
  function oo(u) {
    return de(u) ? Li(u) : {};
  }
  function ao(u, d, b) {
    var w = d(u);
    return Wn(u) ? w : Vs(w, b(u));
  }
  function lo(u) {
    return Ne.call(u);
  }
  function co(u) {
    if (!de(u) || To(u))
      return !1;
    var d = zn(u) || ds(u) ? Hs : Ve;
    return d.test(Et(u));
  }
  function uo(u) {
    if (!Bi(u))
      return ki(u);
    var d = [];
    for (var b in Object(u))
      Ot.call(u, b) && b != "constructor" && d.push(b);
    return d;
  }
  function Xs(u, d) {
    if (d)
      return u.slice();
    var b = new u.constructor(u.length);
    return u.copy(b), b;
  }
  function Fn(u) {
    var d = new u.constructor(u.byteLength);
    return new Dn(d).set(new Dn(u)), d;
  }
  function _s(u, d) {
    var b = d ? Fn(u.buffer) : u.buffer;
    return new u.constructor(b, u.byteOffset, u.byteLength);
  }
  function Mi(u, d, b) {
    var w = d ? b(Fs(u), !0) : Fs(u);
    return we(w, Fe, new u.constructor());
  }
  function qi(u) {
    var d = new u.constructor(u.source, vt.exec(u));
    return d.lastIndex = u.lastIndex, d;
  }
  function ho(u, d, b) {
    var w = d ? b(fs(u), !0) : fs(u);
    return we(w, at, new u.constructor());
  }
  function fo(u) {
    return Ii ? Object(Ii.call(u)) : {};
  }
  function po(u, d) {
    var b = d ? Fn(u.buffer) : u.buffer;
    return new u.constructor(b, u.byteOffset, u.length);
  }
  function go(u, d) {
    var b = -1, w = u.length;
    for (d || (d = Array(w)); ++b < w; )
      d[b] = u[b];
    return d;
  }
  function Hn(u, d, b, w) {
    b || (b = {});
    for (var F = -1, j = d.length; ++F < j; ) {
      var Z = d[F], G = void 0;
      Di(b, Z, G === void 0 ? u[Z] : G);
    }
    return b;
  }
  function mo(u, d) {
    return Hn(u, Se(u), d);
  }
  function bo(u) {
    return ao(u, Kn, Se);
  }
  function vs(u, d) {
    var b = u.__data__;
    return Eo(d) ? b[typeof d == "string" ? "string" : "hash"] : b.map;
  }
  function Xt(u, d) {
    var b = hs(u, d);
    return co(b) ? b : void 0;
  }
  var Se = Mn ? We(Mn, Object) : wo, Le = lo;
  (zs && Le(new zs(new ArrayBuffer(1))) != R || ms && Le(new ms()) != p || Yt && Le(Yt.resolve()) != E || Ks && Le(new Ks()) != A || qn && Le(new qn()) != L) && (Le = function(u) {
    var d = Ne.call(u), b = d == v ? u.constructor : void 0, w = b ? Et(b) : void 0;
    if (w)
      switch (w) {
        case Bn:
          return R;
        case ys:
          return p;
        case $n:
          return E;
        case Pn:
          return A;
        case jn:
          return L;
      }
    return d;
  });
  function yo(u) {
    var d = u.length, b = u.constructor(d);
    return d && typeof u[0] == "string" && Ot.call(u, "index") && (b.index = u.index, b.input = u.input), b;
  }
  function he(u) {
    return typeof u.constructor == "function" && !Bi(u) ? oo(Bt(u)) : {};
  }
  function _o(u, d, b, w) {
    var F = u.constructor;
    switch (d) {
      case I:
        return Fn(u);
      case c:
      case a:
        return new F(+u);
      case R:
        return _s(u, w);
      case P:
      case V:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Mt:
      case qt:
        return po(u, w);
      case p:
        return Mi(u, w, b);
      case g:
      case N:
        return new F(u);
      case T:
        return qi(u);
      case A:
        return ho(u, w, b);
      case S:
        return fo(u);
    }
  }
  function vo(u, d) {
    return d = d ?? i, !!d && (typeof u == "number" || Kt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function Eo(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function To(u) {
    return !!ps && ps in u;
  }
  function Bi(u) {
    var d = u && u.constructor, b = typeof d == "function" && d.prototype || Nt;
    return u === b;
  }
  function Et(u) {
    if (u != null) {
      try {
        return gs.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function $i(u) {
    return Vn(u, !0, !0);
  }
  function Pi(u, d) {
    return u === d || u !== u && d !== d;
  }
  function Zs(u) {
    return Ao(u) && Ot.call(u, "callee") && (!xi.call(u, "callee") || Ne.call(u) == r);
  }
  var Wn = Array.isArray;
  function Qs(u) {
    return u != null && Ui(u.length) && !zn(u);
  }
  function Ao(u) {
    return Vi(u) && Qs(u);
  }
  var ji = Ws || No;
  function zn(u) {
    var d = de(u) ? Ne.call(u) : "";
    return d == h || d == f;
  }
  function Ui(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
  }
  function de(u) {
    var d = typeof u;
    return !!u && (d == "object" || d == "function");
  }
  function Vi(u) {
    return !!u && typeof u == "object";
  }
  function Kn(u) {
    return Qs(u) ? Gs(u) : uo(u);
  }
  function wo() {
    return [];
  }
  function No() {
    return !1;
  }
  s.exports = $i;
})(_r, _r.exports);
var Jh = _r.exports, vr = { exports: {} };
vr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, c = "[object Arguments]", a = "[object Array]", l = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", p = "[object Error]", g = "[object Function]", v = "[object GeneratorFunction]", E = "[object Map]", T = "[object Number]", A = "[object Null]", N = "[object Object]", S = "[object Promise]", L = "[object Proxy]", I = "[object RegExp]", R = "[object Set]", P = "[object String]", V = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Mt = "[object Float64Array]", qt = "[object Int8Array]", ut = "[object Int16Array]", vt = "[object Int32Array]", Ve = "[object Uint8Array]", Kt = "[object Uint8ClampedArray]", K = "[object Uint16Array]", cs = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Gt = /^(?:0|[1-9]\d*)$/, H = {};
  H[it] = H[Mt] = H[qt] = H[ut] = H[vt] = H[Ve] = H[Kt] = H[K] = H[cs] = !0, H[c] = H[a] = H[nt] = H[h] = H[ot] = H[f] = H[p] = H[g] = H[E] = H[T] = H[N] = H[I] = H[R] = H[P] = H[tt] = !1;
  var ae = typeof Xe == "object" && Xe && Xe.Object === Object && Xe, Fe = typeof self == "object" && self && self.Object === Object && self, at = ae || Fe || Function("return this")(), He = t && !t.nodeType && t, Vs = He && !0 && s && !s.nodeType && s, we = Vs && Vs.exports === He, us = we && ae.process, hs = function() {
    try {
      return us && us.binding && us.binding("util");
    } catch {
    }
  }(), ds = hs && hs.isTypedArray;
  function Fs(u, d) {
    for (var b = -1, w = u == null ? 0 : u.length, F = 0, j = []; ++b < w; ) {
      var Z = u[b];
      d(Z, b, u) && (j[F++] = Z);
    }
    return j;
  }
  function We(u, d) {
    for (var b = -1, w = d.length, F = u.length; ++b < w; )
      u[F + b] = d[b];
    return u;
  }
  function fs(u, d) {
    for (var b = -1, w = u == null ? 0 : u.length; ++b < w; )
      if (d(u[b], b, u))
        return !0;
    return !1;
  }
  function In(u, d) {
    for (var b = -1, w = Array(u); ++b < u; )
      w[b] = d(b);
    return w;
  }
  function Rn(u) {
    return function(d) {
      return u(d);
    };
  }
  function Nt(u, d) {
    return u.has(d);
  }
  function le(u, d) {
    return u == null ? void 0 : u[d];
  }
  function ps(u) {
    var d = -1, b = Array(u.size);
    return u.forEach(function(w, F) {
      b[++d] = [F, w];
    }), b;
  }
  function gs(u, d) {
    return function(b) {
      return u(d(b));
    };
  }
  function Ot(u) {
    var d = -1, b = Array(u.size);
    return u.forEach(function(w) {
      b[++d] = w;
    }), b;
  }
  var Ne = Array.prototype, Hs = Function.prototype, ce = Object.prototype, Oe = at["__core-js_shared__"], Dn = Hs.toString, Bt = ce.hasOwnProperty, Li = function() {
    var u = /[^.]+$/.exec(Oe && Oe.keys && Oe.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), xi = ce.toString, Ur = RegExp(
    "^" + Dn.call(Bt).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Mn = we ? at.Buffer : void 0, Ws = at.Symbol, ki = at.Uint8Array, zs = ce.propertyIsEnumerable, ms = Ne.splice, Yt = Ws ? Ws.toStringTag : void 0, Ks = Object.getOwnPropertySymbols, qn = Mn ? Mn.isBuffer : void 0, bs = gs(Object.keys, Object), Bn = Se(at, "DataView"), ys = Se(at, "Map"), $n = Se(at, "Promise"), Pn = Se(at, "Set"), jn = Se(at, "WeakMap"), ze = Se(Object, "create"), Ii = Et(Bn), Ce = Et(ys), Vr = Et($n), Fr = Et(Pn), Hr = Et(jn), Ri = Ws ? Ws.prototype : void 0, Un = Ri ? Ri.valueOf : void 0;
  function ht(u) {
    var d = -1, b = u == null ? 0 : u.length;
    for (this.clear(); ++d < b; ) {
      var w = u[d];
      this.set(w[0], w[1]);
    }
  }
  function Wr() {
    this.__data__ = ze ? ze(null) : {}, this.size = 0;
  }
  function zr(u) {
    var d = this.has(u) && delete this.__data__[u];
    return this.size -= d ? 1 : 0, d;
  }
  function Kr(u) {
    var d = this.__data__;
    if (ze) {
      var b = d[u];
      return b === n ? void 0 : b;
    }
    return Bt.call(d, u) ? d[u] : void 0;
  }
  function Gr(u) {
    var d = this.__data__;
    return ze ? d[u] !== void 0 : Bt.call(d, u);
  }
  function Yr(u, d) {
    var b = this.__data__;
    return this.size += this.has(u) ? 0 : 1, b[u] = ze && d === void 0 ? n : d, this;
  }
  ht.prototype.clear = Wr, ht.prototype.delete = zr, ht.prototype.get = Kr, ht.prototype.has = Gr, ht.prototype.set = Yr;
  function gt(u) {
    var d = -1, b = u == null ? 0 : u.length;
    for (this.clear(); ++d < b; ) {
      var w = u[d];
      this.set(w[0], w[1]);
    }
  }
  function Xr() {
    this.__data__ = [], this.size = 0;
  }
  function Zr(u) {
    var d = this.__data__, b = Xs(d, u);
    if (b < 0)
      return !1;
    var w = d.length - 1;
    return b == w ? d.pop() : ms.call(d, b, 1), --this.size, !0;
  }
  function Qr(u) {
    var d = this.__data__, b = Xs(d, u);
    return b < 0 ? void 0 : d[b][1];
  }
  function Jr(u) {
    return Xs(this.__data__, u) > -1;
  }
  function to(u, d) {
    var b = this.__data__, w = Xs(b, u);
    return w < 0 ? (++this.size, b.push([u, d])) : b[w][1] = d, this;
  }
  gt.prototype.clear = Xr, gt.prototype.delete = Zr, gt.prototype.get = Qr, gt.prototype.has = Jr, gt.prototype.set = to;
  function Ct(u) {
    var d = -1, b = u == null ? 0 : u.length;
    for (this.clear(); ++d < b; ) {
      var w = u[d];
      this.set(w[0], w[1]);
    }
  }
  function eo() {
    this.size = 0, this.__data__ = {
      hash: new ht(),
      map: new (ys || gt)(),
      string: new ht()
    };
  }
  function so(u) {
    var d = Xt(this, u).delete(u);
    return this.size -= d ? 1 : 0, d;
  }
  function no(u) {
    return Xt(this, u).get(u);
  }
  function io(u) {
    return Xt(this, u).has(u);
  }
  function ro(u, d) {
    var b = Xt(this, u), w = b.size;
    return b.set(u, d), this.size += b.size == w ? 0 : 1, this;
  }
  Ct.prototype.clear = eo, Ct.prototype.delete = so, Ct.prototype.get = no, Ct.prototype.has = io, Ct.prototype.set = ro;
  function Gs(u) {
    var d = -1, b = u == null ? 0 : u.length;
    for (this.__data__ = new Ct(); ++d < b; )
      this.add(u[d]);
  }
  function Di(u) {
    return this.__data__.set(u, n), this;
  }
  function Ys(u) {
    return this.__data__.has(u);
  }
  Gs.prototype.add = Gs.prototype.push = Di, Gs.prototype.has = Ys;
  function ue(u) {
    var d = this.__data__ = new gt(u);
    this.size = d.size;
  }
  function Vn() {
    this.__data__ = new gt(), this.size = 0;
  }
  function oo(u) {
    var d = this.__data__, b = d.delete(u);
    return this.size = d.size, b;
  }
  function ao(u) {
    return this.__data__.get(u);
  }
  function lo(u) {
    return this.__data__.has(u);
  }
  function co(u, d) {
    var b = this.__data__;
    if (b instanceof gt) {
      var w = b.__data__;
      if (!ys || w.length < e - 1)
        return w.push([u, d]), this.size = ++b.size, this;
      b = this.__data__ = new Ct(w);
    }
    return b.set(u, d), this.size = b.size, this;
  }
  ue.prototype.clear = Vn, ue.prototype.delete = oo, ue.prototype.get = ao, ue.prototype.has = lo, ue.prototype.set = co;
  function uo(u, d) {
    var b = Zs(u), w = !b && Pi(u), F = !b && !w && Qs(u), j = !b && !w && !F && Vi(u), Z = b || w || F || j, G = Z ? In(u.length, String) : [], rt = G.length;
    for (var Q in u)
      Bt.call(u, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      F && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      _o(Q, rt))) && G.push(Q);
    return G;
  }
  function Xs(u, d) {
    for (var b = u.length; b--; )
      if ($i(u[b][0], d))
        return b;
    return -1;
  }
  function Fn(u, d, b) {
    var w = d(u);
    return Zs(u) ? w : We(w, b(u));
  }
  function _s(u) {
    return u == null ? u === void 0 ? J : A : Yt && Yt in Object(u) ? Le(u) : Bi(u);
  }
  function Mi(u) {
    return de(u) && _s(u) == c;
  }
  function qi(u, d, b, w, F) {
    return u === d ? !0 : u == null || d == null || !de(u) && !de(d) ? u !== u && d !== d : ho(u, d, b, w, qi, F);
  }
  function ho(u, d, b, w, F, j) {
    var Z = Zs(u), G = Zs(d), rt = Z ? a : he(u), Q = G ? a : he(d);
    rt = rt == c ? N : rt, Q = Q == c ? N : Q;
    var mt = rt == N, St = Q == N, lt = rt == Q;
    if (lt && Qs(u)) {
      if (!Qs(d))
        return !1;
      Z = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new ue()), Z || Vi(u) ? Hn(u, d, b, w, F, j) : mo(u, d, rt, b, w, F, j);
    if (!(b & i)) {
      var bt = mt && Bt.call(u, "__wrapped__"), dt = St && Bt.call(d, "__wrapped__");
      if (bt || dt) {
        var Ke = bt ? u.value() : u, xe = dt ? d.value() : d;
        return j || (j = new ue()), F(Ke, xe, b, w, j);
      }
    }
    return lt ? (j || (j = new ue()), bo(u, d, b, w, F, j)) : !1;
  }
  function fo(u) {
    if (!Ui(u) || Eo(u))
      return !1;
    var d = ji(u) ? Ur : pt;
    return d.test(Et(u));
  }
  function po(u) {
    return de(u) && zn(u.length) && !!H[_s(u)];
  }
  function go(u) {
    if (!To(u))
      return bs(u);
    var d = [];
    for (var b in Object(u))
      Bt.call(u, b) && b != "constructor" && d.push(b);
    return d;
  }
  function Hn(u, d, b, w, F, j) {
    var Z = b & i, G = u.length, rt = d.length;
    if (G != rt && !(Z && rt > G))
      return !1;
    var Q = j.get(u);
    if (Q && j.get(d))
      return Q == d;
    var mt = -1, St = !0, lt = b & r ? new Gs() : void 0;
    for (j.set(u, d), j.set(d, u); ++mt < G; ) {
      var bt = u[mt], dt = d[mt];
      if (w)
        var Ke = Z ? w(dt, bt, mt, d, u, j) : w(bt, dt, mt, u, d, j);
      if (Ke !== void 0) {
        if (Ke)
          continue;
        St = !1;
        break;
      }
      if (lt) {
        if (!fs(d, function(xe, Es) {
          if (!Nt(lt, Es) && (bt === xe || F(bt, xe, b, w, j)))
            return lt.push(Es);
        })) {
          St = !1;
          break;
        }
      } else if (!(bt === dt || F(bt, dt, b, w, j))) {
        St = !1;
        break;
      }
    }
    return j.delete(u), j.delete(d), St;
  }
  function mo(u, d, b, w, F, j, Z) {
    switch (b) {
      case ot:
        if (u.byteLength != d.byteLength || u.byteOffset != d.byteOffset)
          return !1;
        u = u.buffer, d = d.buffer;
      case nt:
        return !(u.byteLength != d.byteLength || !j(new ki(u), new ki(d)));
      case h:
      case f:
      case T:
        return $i(+u, +d);
      case p:
        return u.name == d.name && u.message == d.message;
      case I:
      case P:
        return u == d + "";
      case E:
        var G = ps;
      case R:
        var rt = w & i;
        if (G || (G = Ot), u.size != d.size && !rt)
          return !1;
        var Q = Z.get(u);
        if (Q)
          return Q == d;
        w |= r, Z.set(u, d);
        var mt = Hn(G(u), G(d), w, F, j, Z);
        return Z.delete(u), mt;
      case V:
        if (Un)
          return Un.call(u) == Un.call(d);
    }
    return !1;
  }
  function bo(u, d, b, w, F, j) {
    var Z = b & i, G = vs(u), rt = G.length, Q = vs(d), mt = Q.length;
    if (rt != mt && !Z)
      return !1;
    for (var St = rt; St--; ) {
      var lt = G[St];
      if (!(Z ? lt in d : Bt.call(d, lt)))
        return !1;
    }
    var bt = j.get(u);
    if (bt && j.get(d))
      return bt == d;
    var dt = !0;
    j.set(u, d), j.set(d, u);
    for (var Ke = Z; ++St < rt; ) {
      lt = G[St];
      var xe = u[lt], Es = d[lt];
      if (w)
        var Ol = Z ? w(Es, xe, lt, d, u, j) : w(xe, Es, lt, u, d, j);
      if (!(Ol === void 0 ? xe === Es || F(xe, Es, b, w, j) : Ol)) {
        dt = !1;
        break;
      }
      Ke || (Ke = lt == "constructor");
    }
    if (dt && !Ke) {
      var Fi = u.constructor, Hi = d.constructor;
      Fi != Hi && "constructor" in u && "constructor" in d && !(typeof Fi == "function" && Fi instanceof Fi && typeof Hi == "function" && Hi instanceof Hi) && (dt = !1);
    }
    return j.delete(u), j.delete(d), dt;
  }
  function vs(u) {
    return Fn(u, Kn, yo);
  }
  function Xt(u, d) {
    var b = u.__data__;
    return vo(d) ? b[typeof d == "string" ? "string" : "hash"] : b.map;
  }
  function Se(u, d) {
    var b = le(u, d);
    return fo(b) ? b : void 0;
  }
  function Le(u) {
    var d = Bt.call(u, Yt), b = u[Yt];
    try {
      u[Yt] = void 0;
      var w = !0;
    } catch {
    }
    var F = xi.call(u);
    return w && (d ? u[Yt] = b : delete u[Yt]), F;
  }
  var yo = Ks ? function(u) {
    return u == null ? [] : (u = Object(u), Fs(Ks(u), function(d) {
      return zs.call(u, d);
    }));
  } : wo, he = _s;
  (Bn && he(new Bn(new ArrayBuffer(1))) != ot || ys && he(new ys()) != E || $n && he($n.resolve()) != S || Pn && he(new Pn()) != R || jn && he(new jn()) != tt) && (he = function(u) {
    var d = _s(u), b = d == N ? u.constructor : void 0, w = b ? Et(b) : "";
    if (w)
      switch (w) {
        case Ii:
          return ot;
        case Ce:
          return E;
        case Vr:
          return S;
        case Fr:
          return R;
        case Hr:
          return tt;
      }
    return d;
  });
  function _o(u, d) {
    return d = d ?? o, !!d && (typeof u == "number" || Gt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function vo(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function Eo(u) {
    return !!Li && Li in u;
  }
  function To(u) {
    var d = u && u.constructor, b = typeof d == "function" && d.prototype || ce;
    return u === b;
  }
  function Bi(u) {
    return xi.call(u);
  }
  function Et(u) {
    if (u != null) {
      try {
        return Dn.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function $i(u, d) {
    return u === d || u !== u && d !== d;
  }
  var Pi = Mi(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Mi : function(u) {
    return de(u) && Bt.call(u, "callee") && !zs.call(u, "callee");
  }, Zs = Array.isArray;
  function Wn(u) {
    return u != null && zn(u.length) && !ji(u);
  }
  var Qs = qn || No;
  function Ao(u, d) {
    return qi(u, d);
  }
  function ji(u) {
    if (!Ui(u))
      return !1;
    var d = _s(u);
    return d == g || d == v || d == l || d == L;
  }
  function zn(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
  }
  function Ui(u) {
    var d = typeof u;
    return u != null && (d == "object" || d == "function");
  }
  function de(u) {
    return u != null && typeof u == "object";
  }
  var Vi = ds ? Rn(ds) : po;
  function Kn(u) {
    return Wn(u) ? uo(u) : go(u);
  }
  function wo() {
    return [];
  }
  function No() {
    return !1;
  }
  s.exports = Ao;
})(vr, vr.exports);
var td = vr.exports, pl = {};
Object.defineProperty(pl, "__esModule", { value: !0 });
const B0 = Jh, $0 = td;
var Ta;
(function(s) {
  function t(r = {}, o = {}, c = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = B0(o);
    c || (a = Object.keys(a).reduce((l, h) => (a[h] != null && (l[h] = a[h]), l), {}));
    for (const l in r)
      r[l] !== void 0 && o[l] === void 0 && (a[l] = r[l]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.compose = t;
  function e(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const c = Object.keys(r).concat(Object.keys(o)).reduce((a, l) => ($0(r[l], o[l]) || (a[l] = o[l] === void 0 ? null : o[l]), a), {});
    return Object.keys(c).length > 0 ? c : void 0;
  }
  s.diff = e;
  function n(r = {}, o = {}) {
    r = r || {};
    const c = Object.keys(o).reduce((a, l) => (o[l] !== r[l] && r[l] !== void 0 && (a[l] = o[l]), a), {});
    return Object.keys(r).reduce((a, l) => (r[l] !== o[l] && o[l] === void 0 && (a[l] = null), a), c);
  }
  s.invert = n;
  function i(r, o, c = !1) {
    if (typeof r != "object")
      return o;
    if (typeof o != "object")
      return;
    if (!c)
      return o;
    const a = Object.keys(o).reduce((l, h) => (r[h] === void 0 && (l[h] = o[h]), l), {});
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.transform = i;
})(Ta || (Ta = {}));
pl.default = Ta;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
var Aa;
(function(s) {
  function t(e) {
    return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
  }
  s.length = t;
})(Aa || (Aa = {}));
Br.default = Aa;
var gl = {};
Object.defineProperty(gl, "__esModule", { value: !0 });
const Vc = Br;
class P0 {
  constructor(t) {
    this.ops = t, this.index = 0, this.offset = 0;
  }
  hasNext() {
    return this.peekLength() < 1 / 0;
  }
  next(t) {
    t || (t = 1 / 0);
    const e = this.ops[this.index];
    if (e) {
      const n = this.offset, i = Vc.default.length(e);
      if (t >= i - n ? (t = i - n, this.index += 1, this.offset = 0) : this.offset += t, typeof e.delete == "number")
        return { delete: t };
      {
        const r = {};
        return e.attributes && (r.attributes = e.attributes), typeof e.retain == "number" ? r.retain = t : typeof e.retain == "object" && e.retain !== null ? r.retain = e.retain : typeof e.insert == "string" ? r.insert = e.insert.substr(n, t) : r.insert = e.insert, r;
      }
    } else
      return { retain: 1 / 0 };
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    return this.ops[this.index] ? Vc.default.length(this.ops[this.index]) - this.offset : 1 / 0;
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
        const t = this.offset, e = this.index, n = this.next(), i = this.ops.slice(this.index);
        return this.offset = t, this.index = e, [n].concat(i);
      }
    } else return [];
  }
}
gl.default = P0;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = q0, n = Jh, i = td, r = pl;
  t.AttributeMap = r.default;
  const o = Br;
  t.Op = o.default;
  const c = gl;
  t.OpIterator = c.default;
  const a = "\0", l = (f, p) => {
    if (typeof f != "object" || f === null)
      throw new Error(`cannot retain a ${typeof f}`);
    if (typeof p != "object" || p === null)
      throw new Error(`cannot retain a ${typeof p}`);
    const g = Object.keys(f)[0];
    if (!g || g !== Object.keys(p)[0])
      throw new Error(`embed types not matched: ${g} != ${Object.keys(p)[0]}`);
    return [g, f[g], p[g]];
  };
  class h {
    constructor(p) {
      Array.isArray(p) ? this.ops = p : p != null && Array.isArray(p.ops) ? this.ops = p.ops : this.ops = [];
    }
    static registerEmbed(p, g) {
      this.handlers[p] = g;
    }
    static unregisterEmbed(p) {
      delete this.handlers[p];
    }
    static getHandler(p) {
      const g = this.handlers[p];
      if (!g)
        throw new Error(`no handlers for embed type "${p}"`);
      return g;
    }
    insert(p, g) {
      const v = {};
      return typeof p == "string" && p.length === 0 ? this : (v.insert = p, g != null && typeof g == "object" && Object.keys(g).length > 0 && (v.attributes = g), this.push(v));
    }
    delete(p) {
      return p <= 0 ? this : this.push({ delete: p });
    }
    retain(p, g) {
      if (typeof p == "number" && p <= 0)
        return this;
      const v = { retain: p };
      return g != null && typeof g == "object" && Object.keys(g).length > 0 && (v.attributes = g), this.push(v);
    }
    push(p) {
      let g = this.ops.length, v = this.ops[g - 1];
      if (p = n(p), typeof v == "object") {
        if (typeof p.delete == "number" && typeof v.delete == "number")
          return this.ops[g - 1] = { delete: v.delete + p.delete }, this;
        if (typeof v.delete == "number" && p.insert != null && (g -= 1, v = this.ops[g - 1], typeof v != "object"))
          return this.ops.unshift(p), this;
        if (i(p.attributes, v.attributes)) {
          if (typeof p.insert == "string" && typeof v.insert == "string")
            return this.ops[g - 1] = { insert: v.insert + p.insert }, typeof p.attributes == "object" && (this.ops[g - 1].attributes = p.attributes), this;
          if (typeof p.retain == "number" && typeof v.retain == "number")
            return this.ops[g - 1] = { retain: v.retain + p.retain }, typeof p.attributes == "object" && (this.ops[g - 1].attributes = p.attributes), this;
        }
      }
      return g === this.ops.length ? this.ops.push(p) : this.ops.splice(g, 0, p), this;
    }
    chop() {
      const p = this.ops[this.ops.length - 1];
      return p && typeof p.retain == "number" && !p.attributes && this.ops.pop(), this;
    }
    filter(p) {
      return this.ops.filter(p);
    }
    forEach(p) {
      this.ops.forEach(p);
    }
    map(p) {
      return this.ops.map(p);
    }
    partition(p) {
      const g = [], v = [];
      return this.forEach((E) => {
        (p(E) ? g : v).push(E);
      }), [g, v];
    }
    reduce(p, g) {
      return this.ops.reduce(p, g);
    }
    changeLength() {
      return this.reduce((p, g) => g.insert ? p + o.default.length(g) : g.delete ? p - g.delete : p, 0);
    }
    length() {
      return this.reduce((p, g) => p + o.default.length(g), 0);
    }
    slice(p = 0, g = 1 / 0) {
      const v = [], E = new c.default(this.ops);
      let T = 0;
      for (; T < g && E.hasNext(); ) {
        let A;
        T < p ? A = E.next(p - T) : (A = E.next(g - T), v.push(A)), T += o.default.length(A);
      }
      return new h(v);
    }
    compose(p) {
      const g = new c.default(this.ops), v = new c.default(p.ops), E = [], T = v.peek();
      if (T != null && typeof T.retain == "number" && T.attributes == null) {
        let N = T.retain;
        for (; g.peekType() === "insert" && g.peekLength() <= N; )
          N -= g.peekLength(), E.push(g.next());
        T.retain - N > 0 && v.next(T.retain - N);
      }
      const A = new h(E);
      for (; g.hasNext() || v.hasNext(); )
        if (v.peekType() === "insert")
          A.push(v.next());
        else if (g.peekType() === "delete")
          A.push(g.next());
        else {
          const N = Math.min(g.peekLength(), v.peekLength()), S = g.next(N), L = v.next(N);
          if (L.retain) {
            const I = {};
            if (typeof S.retain == "number")
              I.retain = typeof L.retain == "number" ? N : L.retain;
            else if (typeof L.retain == "number")
              S.retain == null ? I.insert = S.insert : I.retain = S.retain;
            else {
              const P = S.retain == null ? "insert" : "retain", [V, J, tt] = l(S[P], L.retain), nt = h.getHandler(V);
              I[P] = {
                [V]: nt.compose(J, tt, P === "retain")
              };
            }
            const R = r.default.compose(S.attributes, L.attributes, typeof S.retain == "number");
            if (R && (I.attributes = R), A.push(I), !v.hasNext() && i(A.ops[A.ops.length - 1], I)) {
              const P = new h(g.rest());
              return A.concat(P).chop();
            }
          } else typeof L.delete == "number" && (typeof S.retain == "number" || typeof S.retain == "object" && S.retain !== null) && A.push(L);
        }
      return A.chop();
    }
    concat(p) {
      const g = new h(this.ops.slice());
      return p.ops.length > 0 && (g.push(p.ops[0]), g.ops = g.ops.concat(p.ops.slice(1))), g;
    }
    diff(p, g) {
      if (this.ops === p.ops)
        return new h();
      const v = [this, p].map((S) => S.map((L) => {
        if (L.insert != null)
          return typeof L.insert == "string" ? L.insert : a;
        const I = S === p ? "on" : "with";
        throw new Error("diff() called " + I + " non-document");
      }).join("")), E = new h(), T = e(v[0], v[1], g, !0), A = new c.default(this.ops), N = new c.default(p.ops);
      return T.forEach((S) => {
        let L = S[1].length;
        for (; L > 0; ) {
          let I = 0;
          switch (S[0]) {
            case e.INSERT:
              I = Math.min(N.peekLength(), L), E.push(N.next(I));
              break;
            case e.DELETE:
              I = Math.min(L, A.peekLength()), A.next(I), E.delete(I);
              break;
            case e.EQUAL:
              I = Math.min(A.peekLength(), N.peekLength(), L);
              const R = A.next(I), P = N.next(I);
              i(R.insert, P.insert) ? E.retain(I, r.default.diff(R.attributes, P.attributes)) : E.push(P).delete(I);
              break;
          }
          L -= I;
        }
      }), E.chop();
    }
    eachLine(p, g = `
`) {
      const v = new c.default(this.ops);
      let E = new h(), T = 0;
      for (; v.hasNext(); ) {
        if (v.peekType() !== "insert")
          return;
        const A = v.peek(), N = o.default.length(A) - v.peekLength(), S = typeof A.insert == "string" ? A.insert.indexOf(g, N) - N : -1;
        if (S < 0)
          E.push(v.next());
        else if (S > 0)
          E.push(v.next(S));
        else {
          if (p(E, v.next(1).attributes || {}, T) === !1)
            return;
          T += 1, E = new h();
        }
      }
      E.length() > 0 && p(E, {}, T);
    }
    invert(p) {
      const g = new h();
      return this.reduce((v, E) => {
        if (E.insert)
          g.delete(o.default.length(E));
        else {
          if (typeof E.retain == "number" && E.attributes == null)
            return g.retain(E.retain), v + E.retain;
          if (E.delete || typeof E.retain == "number") {
            const T = E.delete || E.retain;
            return p.slice(v, v + T).forEach((N) => {
              E.delete ? g.push(N) : E.retain && E.attributes && g.retain(o.default.length(N), r.default.invert(E.attributes, N.attributes));
            }), v + T;
          } else if (typeof E.retain == "object" && E.retain !== null) {
            const T = p.slice(v, v + 1), A = new c.default(T.ops).next(), [N, S, L] = l(E.retain, A.insert), I = h.getHandler(N);
            return g.retain({ [N]: I.invert(S, L) }, r.default.invert(E.attributes, A.attributes)), v + 1;
          }
        }
        return v;
      }, 0), g.chop();
    }
    transform(p, g = !1) {
      if (g = !!g, typeof p == "number")
        return this.transformPosition(p, g);
      const v = p, E = new c.default(this.ops), T = new c.default(v.ops), A = new h();
      for (; E.hasNext() || T.hasNext(); )
        if (E.peekType() === "insert" && (g || T.peekType() !== "insert"))
          A.retain(o.default.length(E.next()));
        else if (T.peekType() === "insert")
          A.push(T.next());
        else {
          const N = Math.min(E.peekLength(), T.peekLength()), S = E.next(N), L = T.next(N);
          if (S.delete)
            continue;
          if (L.delete)
            A.push(L);
          else {
            const I = S.retain, R = L.retain;
            let P = typeof R == "object" && R !== null ? R : N;
            if (typeof I == "object" && I !== null && typeof R == "object" && R !== null) {
              const V = Object.keys(I)[0];
              if (V === Object.keys(R)[0]) {
                const J = h.getHandler(V);
                J && (P = {
                  [V]: J.transform(I[V], R[V], g)
                });
              }
            }
            A.retain(P, r.default.transform(S.attributes, L.attributes, g));
          }
        }
      return A.chop();
    }
    transformPosition(p, g = !1) {
      g = !!g;
      const v = new c.default(this.ops);
      let E = 0;
      for (; v.hasNext() && E <= p; ) {
        const T = v.peekLength(), A = v.peekType();
        if (v.next(), A === "delete") {
          p -= Math.min(T, p - E);
          continue;
        } else A === "insert" && (E < p || !g) && (p += T);
        E += T;
      }
      return p;
    }
  }
  h.Op = o.default, h.OpIterator = c.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, s.exports = h, s.exports.default = h;
})(Ea, Ea.exports);
var Vt = Ea.exports;
const B = /* @__PURE__ */ Gh(Vt);
class re extends Dt {
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
re.blotName = "break";
re.tagName = "BR";
let se = class extends yr {
};
function $r(s) {
  return s.replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t]);
}
const fe = class fe extends ul {
  static compare(t, e) {
    const n = fe.order.indexOf(t), i = fe.order.indexOf(e);
    return n >= 0 || i >= 0 ? n - i : t === e ? 0 : t < e ? -1 : 1;
  }
  formatAt(t, e, n, i) {
    if (fe.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, $.BLOT)) {
      const r = this.isolate(t, e);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, e, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof fe && fe.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const e = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(e), e.wrap(this);
    }
  }
};
M(fe, "allowedChildren", [fe, re, Dt, se]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
M(fe, "order", [
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
let Ee = fe;
const Fc = 1;
class ft extends di {
  constructor() {
    super(...arguments);
    M(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = ed(this)), this.cache.delta;
  }
  deleteAt(e, n) {
    super.deleteAt(e, n), this.cache = {};
  }
  formatAt(e, n, i, r) {
    n <= 0 || (this.scroll.query(i, $.BLOCK) ? e + n === this.length() && this.format(i, r) : super.formatAt(e, Math.min(n, this.length() - e - 1), i, r), this.cache = {});
  }
  insertAt(e, n, i) {
    if (i != null) {
      super.insertAt(e, n, i), this.cache = {};
      return;
    }
    if (n.length === 0) return;
    const r = n.split(`
`), o = r.shift();
    o.length > 0 && (e < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(e, this.length() - 1), o) : this.children.tail.insertAt(this.children.tail.length(), o), this.cache = {});
    let c = this;
    r.reduce((a, l) => (c = c.split(a, !0), c.insertAt(0, l), l.length), e + o.length);
  }
  insertBefore(e, n) {
    const {
      head: i
    } = this.children;
    super.insertBefore(e, n), i instanceof re && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Fc), this.cache.length;
  }
  moveChildren(e, n) {
    super.moveChildren(e, n), this.cache = {};
  }
  optimize(e) {
    super.optimize(e), this.cache = {};
  }
  path(e) {
    return super.path(e, !0);
  }
  removeChild(e) {
    super.removeChild(e), this.cache = {};
  }
  split(e) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (n && (e === 0 || e >= this.length() - Fc)) {
      const r = this.clone();
      return e === 0 ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r);
    }
    const i = super.split(e, n);
    return this.cache = {}, i;
  }
}
ft.blotName = "block";
ft.tagName = "P";
ft.defaultChild = re;
ft.allowedChildren = [re, Ee, Dt, se];
class Ut extends Dt {
  attach() {
    super.attach(), this.attributes = new Rr(this.domNode);
  }
  delta() {
    return new B().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, e) {
    const n = this.scroll.query(t, $.BLOCK_ATTRIBUTE);
    n != null && this.attributes.attribute(n, e);
  }
  formatAt(t, e, n, i) {
    this.format(n, i);
  }
  insertAt(t, e, n) {
    if (n != null) {
      super.insertAt(t, e, n);
      return;
    }
    const i = e.split(`
`), r = i.pop(), o = i.map((a) => {
      const l = this.scroll.create(ft.blotName);
      return l.insertAt(0, a), l;
    }), c = this.split(t);
    o.forEach((a) => {
      this.parent.insertBefore(a, c);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), c);
  }
}
Ut.scope = $.BLOCK_BLOT;
function ed(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return s.descendants(yt).reduce((e, n) => n.length() === 0 ? e : e.insert(n.value(), Pt(n, {}, t)), new B()).insert(`
`, Pt(s));
}
function Pt(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return s == null || ("formats" in s && typeof s.formats == "function" && (t = {
    ...t,
    ...s.formats()
  }, e && delete t["code-token"]), s.parent == null || s.parent.statics.blotName === "scroll" || s.parent.statics.scope !== s.statics.scope) ? t : Pt(s.parent, t, e);
}
const $t = class $t extends Dt {
  // Zero width no break space
  static value() {
  }
  constructor(t, e, n) {
    super(t, e), this.selection = n, this.textNode = document.createTextNode($t.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(t, e) {
    if (this.savedLength !== 0) {
      super.format(t, e);
      return;
    }
    let n = this, i = 0;
    for (; n != null && n.statics.scope !== $.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = $t.CONTENTS.length, n.optimize(), n.formatAt(i, $t.CONTENTS.length, t, e), this.savedLength = 0);
  }
  index(t, e) {
    return t === this.textNode ? 0 : super.index(t, e);
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
    const e = this.prev instanceof se ? this.prev : null, n = e ? e.length() : 0, i = this.next instanceof se ? this.next : null, r = i ? i.text : "", {
      textNode: o
    } = this, c = o.data.split($t.CONTENTS).join("");
    o.data = $t.CONTENTS;
    let a;
    if (e)
      a = e, (c || i) && (e.insertAt(e.length(), c + r), i && i.remove());
    else if (i)
      a = i, i.insertAt(0, c);
    else {
      const l = document.createTextNode(c);
      a = this.scroll.create(l), this.parent.insertBefore(a, this);
    }
    if (this.remove(), t) {
      const l = (p, g) => e && p === e.domNode ? g : p === o ? n + g - 1 : i && p === i.domNode ? n + c.length + g : null, h = l(t.start.node, t.start.offset), f = l(t.end.node, t.end.offset);
      if (h !== null && f !== null)
        return {
          startNode: a.domNode,
          startOffset: h,
          endNode: a.domNode,
          endOffset: f
        };
    }
    return null;
  }
  update(t, e) {
    if (t.some((n) => n.type === "characterData" && n.target === this.textNode)) {
      const n = this.restore();
      n && (e.range = n);
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
      parent: e
    } = this;
    for (; e; ) {
      if (e.domNode.tagName === "A") {
        this.savedLength = $t.CONTENTS.length, e.isolate(this.offset(e), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      e = e.parent;
    }
  }
  value() {
    return "";
  }
};
M($t, "blotName", "cursor"), M($t, "className", "ql-cursor"), M($t, "tagName", "span"), M($t, "CONTENTS", "\uFEFF");
let wn = $t;
var sd = { exports: {} };
(function(s) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
  function i(a, l, h) {
    this.fn = a, this.context = l, this.once = h || !1;
  }
  function r(a, l, h, f, p) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var g = new i(h, f || a, p), v = e ? e + l : l;
    return a._events[v] ? a._events[v].fn ? a._events[v] = [a._events[v], g] : a._events[v].push(g) : (a._events[v] = g, a._eventsCount++), a;
  }
  function o(a, l) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[l];
  }
  function c() {
    this._events = new n(), this._eventsCount = 0;
  }
  c.prototype.eventNames = function() {
    var l = [], h, f;
    if (this._eventsCount === 0) return l;
    for (f in h = this._events)
      t.call(h, f) && l.push(e ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(h)) : l;
  }, c.prototype.listeners = function(l) {
    var h = e ? e + l : l, f = this._events[h];
    if (!f) return [];
    if (f.fn) return [f.fn];
    for (var p = 0, g = f.length, v = new Array(g); p < g; p++)
      v[p] = f[p].fn;
    return v;
  }, c.prototype.listenerCount = function(l) {
    var h = e ? e + l : l, f = this._events[h];
    return f ? f.fn ? 1 : f.length : 0;
  }, c.prototype.emit = function(l, h, f, p, g, v) {
    var E = e ? e + l : l;
    if (!this._events[E]) return !1;
    var T = this._events[E], A = arguments.length, N, S;
    if (T.fn) {
      switch (T.once && this.removeListener(l, T.fn, void 0, !0), A) {
        case 1:
          return T.fn.call(T.context), !0;
        case 2:
          return T.fn.call(T.context, h), !0;
        case 3:
          return T.fn.call(T.context, h, f), !0;
        case 4:
          return T.fn.call(T.context, h, f, p), !0;
        case 5:
          return T.fn.call(T.context, h, f, p, g), !0;
        case 6:
          return T.fn.call(T.context, h, f, p, g, v), !0;
      }
      for (S = 1, N = new Array(A - 1); S < A; S++)
        N[S - 1] = arguments[S];
      T.fn.apply(T.context, N);
    } else {
      var L = T.length, I;
      for (S = 0; S < L; S++)
        switch (T[S].once && this.removeListener(l, T[S].fn, void 0, !0), A) {
          case 1:
            T[S].fn.call(T[S].context);
            break;
          case 2:
            T[S].fn.call(T[S].context, h);
            break;
          case 3:
            T[S].fn.call(T[S].context, h, f);
            break;
          case 4:
            T[S].fn.call(T[S].context, h, f, p);
            break;
          default:
            if (!N) for (I = 1, N = new Array(A - 1); I < A; I++)
              N[I - 1] = arguments[I];
            T[S].fn.apply(T[S].context, N);
        }
    }
    return !0;
  }, c.prototype.on = function(l, h, f) {
    return r(this, l, h, f, !1);
  }, c.prototype.once = function(l, h, f) {
    return r(this, l, h, f, !0);
  }, c.prototype.removeListener = function(l, h, f, p) {
    var g = e ? e + l : l;
    if (!this._events[g]) return this;
    if (!h)
      return o(this, g), this;
    var v = this._events[g];
    if (v.fn)
      v.fn === h && (!p || v.once) && (!f || v.context === f) && o(this, g);
    else {
      for (var E = 0, T = [], A = v.length; E < A; E++)
        (v[E].fn !== h || p && !v[E].once || f && v[E].context !== f) && T.push(v[E]);
      T.length ? this._events[g] = T.length === 1 ? T[0] : T : o(this, g);
    }
    return this;
  }, c.prototype.removeAllListeners = function(l) {
    var h;
    return l ? (h = e ? e + l : l, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = e, c.EventEmitter = c, s.exports = c;
})(sd);
var j0 = sd.exports;
const U0 = /* @__PURE__ */ Gh(j0), wa = /* @__PURE__ */ new WeakMap(), Na = ["error", "warn", "log", "info"];
let Oa = "warn";
function nd(s) {
  if (Oa && Na.indexOf(s) <= Na.indexOf(Oa)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      e[n - 1] = arguments[n];
    console[s](...e);
  }
}
function Ue(s) {
  return Na.reduce((t, e) => (t[e] = nd.bind(console, e, s), t), {});
}
Ue.level = (s) => {
  Oa = s;
};
nd.level = Ue.level;
const Ko = Ue("quill:events"), V0 = ["selectionchange", "mousedown", "mouseup", "click"];
V0.forEach((s) => {
  document.addEventListener(s, function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = wa.get(i);
      r && r.emitter && r.emitter.handleDOM(...e);
    });
  });
});
class q extends U0 {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Ko.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return Ko.log.call(Ko, ...e), super.emit(...e);
  }
  handleDOM(t) {
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      n[i - 1] = arguments[i];
    (this.domListeners[t.type] || []).forEach((r) => {
      let {
        node: o,
        handler: c
      } = r;
      (t.target === o || o.contains(t.target)) && c(t, ...n);
    });
  }
  listenDOM(t, e, n) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: e,
      handler: n
    });
  }
}
M(q, "events", {
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
}), M(q, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const Go = Ue("quill:selection");
class Rs {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class F0 {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Rs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, q.sources.USER), 1);
    }), this.emitter.on(q.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(q.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((c) => c.type === "characterData" || c.type === "childList" || c.type === "attributes" && c.target === this.root);
          this.update(o ? q.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(q.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: c,
          endOffset: a
        } = i.range;
        this.setNativeRange(r, o, c, a), this.update(q.sources.SILENT);
      }
    }), this.update(q.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(q.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(q.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(q.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(t, e) {
    this.scroll.update();
    const n = this.getNativeRange();
    if (!(n == null || !n.native.collapsed || this.scroll.query(t, $.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const i = this.scroll.find(n.start.node, !1);
        if (i == null) return;
        if (i instanceof yt) {
          const r = i.split(n.start.offset);
          i.parent.insertBefore(this.cursor, r);
        } else
          i.insertBefore(this.cursor, n.start.node);
        this.cursor.attach();
      }
      this.cursor.format(t, e), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const n = this.scroll.length();
    t = Math.min(t, n - 1), e = Math.min(t + e, n - 1) - t;
    let i, [r, o] = this.scroll.leaf(t);
    if (r == null) return null;
    if (e > 0 && o === r.length()) {
      const [h] = this.scroll.leaf(t + 1);
      if (h) {
        const [f] = this.scroll.line(t), [p] = this.scroll.line(t + 1);
        f === p && (r = h, o = 0);
      }
    }
    [i, o] = r.position(o, !0);
    const c = document.createRange();
    if (e > 0)
      return c.setStart(i, o), [r, o] = this.scroll.leaf(t + e), r == null ? null : ([i, o] = r.position(o, !0), c.setEnd(i, o), c.getBoundingClientRect());
    let a = "left", l;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      o < i.data.length ? (c.setStart(i, o), c.setEnd(i, o + 1)) : (c.setStart(i, o - 1), c.setEnd(i, o), a = "right"), l = c.getBoundingClientRect();
    } else {
      if (!(r.domNode instanceof Element)) return null;
      l = r.domNode.getBoundingClientRect(), o > 0 && (a = "right");
    }
    return {
      bottom: l.top + l.height,
      height: l.height,
      left: l[a],
      right: l[a],
      top: l.top,
      width: 0
    };
  }
  getNativeRange() {
    const t = document.getSelection();
    if (t == null || t.rangeCount <= 0) return null;
    const e = t.getRangeAt(0);
    if (e == null) return null;
    const n = this.normalizeNative(e);
    return Go.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const e = this.getNativeRange();
    return e == null ? [null, null] : [this.normalizedToRange(e), e];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && Yo(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const e = [[t.start.node, t.start.offset]];
    t.native.collapsed || e.push([t.end.node, t.end.offset]);
    const n = e.map((o) => {
      const [c, a] = o, l = this.scroll.find(c, !0), h = l.offset(this.scroll);
      return a === 0 ? h : l instanceof yt ? h + l.index(c, a) : h + l.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Rs(r, i - r);
  }
  normalizeNative(t) {
    if (!Yo(this.root, t.startContainer) || !t.collapsed && !Yo(this.root, t.endContainer))
      return null;
    const e = {
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
    return [e.start, e.end].forEach((n) => {
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
    }), e;
  }
  rangeToNative(t) {
    const e = this.scroll.length(), n = (i, r) => {
      i = Math.min(e - 1, i);
      const [o, c] = this.scroll.leaf(i);
      return o ? o.position(c, r) : [null, -1];
    };
    return [...n(t.index, !1), ...n(t.index + t.length, !0)];
  }
  setNativeRange(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : e, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (Go.info("setNativeRange", t, e, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
    n.parentNode == null))
      return;
    const o = document.getSelection();
    if (o != null)
      if (t != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: c
        } = this.getNativeRange() || {};
        if (c == null || r || t !== c.startContainer || e !== c.startOffset || n !== c.endContainer || i !== c.endOffset) {
          t instanceof Element && t.tagName === "BR" && (e = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), n instanceof Element && n.tagName === "BR" && (i = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
          const a = document.createRange();
          a.setStart(t, e), a.setEnd(n, i), o.removeAllRanges(), o.addRange(a);
        }
      } else
        o.removeAllRanges(), this.root.blur();
  }
  setRange(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : q.sources.API;
    if (typeof e == "string" && (n = e, e = !1), Go.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, e);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : q.sources.USER;
    const e = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !cl(e, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [q.events.SELECTION_CHANGE, fn(this.lastRange), fn(e), t];
      this.emitter.emit(q.events.EDITOR_CHANGE, ...r), t !== q.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function Yo(s, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return s.contains(t);
}
const H0 = /^[ -~]*$/;
class W0 {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const n = Hc(t), i = new B();
    return K0(n.ops.slice()).reduce((o, c) => {
      const a = Vt.Op.length(c);
      let l = c.attributes || {}, h = !1, f = !1;
      if (c.insert != null) {
        if (i.retain(a), typeof c.insert == "string") {
          const v = c.insert;
          f = !v.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ut, o)[0]), this.scroll.insertAt(o, v);
          const [E, T] = this.scroll.line(o);
          let A = Je({}, Pt(E));
          if (E instanceof ft) {
            const [N] = E.descendant(yt, T);
            N && (A = Je(A, Pt(N)));
          }
          l = Vt.AttributeMap.diff(A, l) || {};
        } else if (typeof c.insert == "object") {
          const v = Object.keys(c.insert)[0];
          if (v == null) return o;
          const E = this.scroll.query(v, $.INLINE) != null;
          if (E)
            (e <= o || this.scroll.descendant(Ut, o)[0]) && (f = !0);
          else if (o > 0) {
            const [T, A] = this.scroll.descendant(yt, o - 1);
            T instanceof se ? T.value()[A] !== `
` && (h = !0) : T instanceof Dt && T.statics.scope === $.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, v, c.insert[v]), E) {
            const [T] = this.scroll.descendant(yt, o);
            if (T) {
              const A = Je({}, Pt(T));
              l = Vt.AttributeMap.diff(A, l) || {};
            }
          }
        }
        e += a;
      } else if (i.push(c), c.retain !== null && typeof c.retain == "object") {
        const v = Object.keys(c.retain)[0];
        if (v == null) return o;
        this.scroll.updateEmbedAt(o, v, c.retain[v]);
      }
      Object.keys(l).forEach((v) => {
        this.scroll.formatAt(o, a, v, l[v]);
      });
      const p = h ? 1 : 0, g = f ? 1 : 0;
      return e += p + g, i.retain(p), i.delete(g), o + a + p + g;
    }, 0), i.reduce((o, c) => typeof c.delete == "number" ? (this.scroll.deleteAt(o, c.delete), o) : o + Vt.Op.length(c), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(t, e) {
    return this.scroll.deleteAt(t, e), this.update(new B().retain(t).delete(e));
  }
  formatLine(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(e, 1)).forEach((o) => {
        o.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new B().retain(t).retain(e, fn(n));
    return this.update(i);
  }
  formatText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, e, r, n[r]);
    });
    const i = new B().retain(t).retain(e, fn(n));
    return this.update(i);
  }
  getContents(t, e) {
    return this.delta.slice(t, t + e);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new B());
  }
  getFormat(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], i = [];
    e === 0 ? this.scroll.path(t).forEach((c) => {
      const [a] = c;
      a instanceof ft ? n.push(a) : a instanceof yt && i.push(a);
    }) : (n = this.scroll.lines(t, e), i = this.scroll.descendants(yt, t, e));
    const [r, o] = [n, i].map((c) => {
      const a = c.shift();
      if (a == null) return {};
      let l = Pt(a);
      for (; Object.keys(l).length > 0; ) {
        const h = c.shift();
        if (h == null) return l;
        l = z0(Pt(h), l);
      }
      return l;
    });
    return {
      ...r,
      ...o
    };
  }
  getHTML(t, e) {
    const [n, i] = this.scroll.line(t);
    if (n) {
      const r = n.length();
      return n.length() >= i + e && !(i === 0 && e === r) ? pi(n, i, e, !0) : pi(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, e) {
    const n = Hc(e), i = new B().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, e, n) {
    return this.scroll.insertAt(t, e, n), this.update(new B().retain(t).insert({
      [e]: n
    }));
  }
  insertText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return e = e.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, e), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, e.length, i, n[i]);
    }), this.update(new B().retain(t).insert(e, fn(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if ((t == null ? void 0 : t.statics.blotName) !== ft.blotName) return !1;
    const e = t;
    return e.children.length > 1 ? !1 : e.children.head instanceof re;
  }
  removeFormat(t, e) {
    const n = this.getText(t, e), [i, r] = this.scroll.line(t + e);
    let o = 0, c = new B();
    i != null && (o = i.length() - r, c = i.delta().slice(r, r + o - 1).insert(`
`));
    const l = this.getContents(t, e + o).diff(new B().insert(n).concat(c)), h = new B().retain(t).concat(l);
    return this.applyDelta(h);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(H0) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = Pt(r), c = r.offset(this.scroll), a = e[0].oldValue.replace(wn.CONTENTS, ""), l = new B().insert(a), h = new B().insert(r.value()), f = n && {
        oldRange: Wc(n.oldRange, -c),
        newRange: Wc(n.newRange, -c)
      };
      t = new B().retain(c).concat(l.diff(h, f)).reduce((g, v) => v.insert ? g.insert(v.insert, o) : g.push(v), new B()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !cl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function cn(s, t, e) {
  if (s.length === 0) {
    const [g] = Xo(e.pop());
    return t <= 0 ? `</li></${g}>` : `</li></${g}>${cn([], t - 1, e)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: c
  }, ...a] = s, [l, h] = Xo(c);
  if (o > t)
    return e.push(c), o === t + 1 ? `<${l}><li${h}>${pi(n, i, r)}${cn(a, o, e)}` : `<${l}><li>${cn(s, t + 1, e)}`;
  const f = e[e.length - 1];
  if (o === t && c === f)
    return `</li><li${h}>${pi(n, i, r)}${cn(a, o, e)}`;
  const [p] = Xo(e.pop());
  return `</li></${p}>${cn(s, t - 1, e)}`;
}
function pi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof se)
    return $r(s.value().slice(t, t + e));
  if (s instanceof ee) {
    if (s.statics.blotName === "list-container") {
      const l = [];
      return s.children.forEachAt(t, e, (h, f, p) => {
        const g = "formats" in h && typeof h.formats == "function" ? h.formats() : {};
        l.push({
          child: h,
          offset: f,
          length: p,
          indent: g.indent || 0,
          type: g.list
        });
      }), cn(l, -1, []);
    }
    const i = [];
    if (s.children.forEachAt(t, e, (l, h, f) => {
      i.push(pi(l, h, f));
    }), n || s.statics.blotName === "list")
      return i.join("");
    const {
      outerHTML: r,
      innerHTML: o
    } = s.domNode, [c, a] = r.split(`>${o}<`);
    return c === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${a}` : `${c}>${i.join("")}<${a}`;
  }
  return s.domNode instanceof Element ? s.domNode.outerHTML : "";
}
function z0(s, t) {
  return Object.keys(t).reduce((e, n) => {
    if (s[n] == null) return e;
    const i = t[n];
    return i === s[n] ? e[n] = i : Array.isArray(i) ? i.indexOf(s[n]) < 0 ? e[n] = i.concat([s[n]]) : e[n] = i : e[n] = [i, s[n]], e;
  }, {});
}
function Xo(s) {
  const t = s === "ordered" ? "ol" : "ul";
  switch (s) {
    case "checked":
      return [t, ' data-list="checked"'];
    case "unchecked":
      return [t, ' data-list="unchecked"'];
    default:
      return [t, ""];
  }
}
function Hc(s) {
  return s.reduce((t, e) => {
    if (typeof e.insert == "string") {
      const n = e.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, e.attributes);
    }
    return t.push(e);
  }, new B());
}
function Wc(s, t) {
  let {
    index: e,
    length: n
  } = s;
  return new Rs(e + t, n);
}
function K0(s) {
  const t = [];
  return s.forEach((e) => {
    typeof e.insert == "string" ? e.insert.split(`
`).forEach((i, r) => {
      r && t.push({
        insert: `
`,
        attributes: e.attributes
      }), i && t.push({
        insert: i,
        attributes: e.attributes
      });
    }) : t.push(e);
  }), t;
}
class oe {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = e;
  }
}
M(oe, "DEFAULTS", {});
const Ji = "\uFEFF";
class ml extends Dt {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(Ji), this.rightGuard = document.createTextNode(Ji), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, n;
    const i = t.data.split(Ji).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof se) {
        const r = this.prev.length();
        this.prev.insertAt(r, i), e = {
          startNode: this.prev.domNode,
          startOffset: r + i.length
        };
      } else
        n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this), e = {
          startNode: n,
          startOffset: i.length
        };
    else t === this.rightGuard && (this.next instanceof se ? (this.next.insertAt(0, i), e = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), e = {
      startNode: n,
      startOffset: i.length
    }));
    return t.data = Ji, e;
  }
  update(t, e) {
    t.forEach((n) => {
      if (n.type === "characterData" && (n.target === this.leftGuard || n.target === this.rightGuard)) {
        const i = this.restore(n.target);
        i && (e.range = i);
      }
    });
  }
}
class G0 {
  constructor(t, e) {
    M(this, "isComposing", !1);
    this.scroll = t, this.emitter = e, this.setupListeners();
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
    const e = t.target instanceof Node ? this.scroll.find(t.target, !0) : null;
    e && !(e instanceof ml) && (this.emitter.emit(q.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(q.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(q.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(q.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const ri = class ri {
  constructor(t, e) {
    M(this, "modules", {});
    this.quill = t, this.options = e;
  }
  init() {
    Object.keys(this.options.modules).forEach((t) => {
      this.modules[t] == null && this.addModule(t);
    });
  }
  addModule(t) {
    const e = this.quill.constructor.import(`modules/${t}`);
    return this.modules[t] = new e(this.quill, this.options.modules[t] || {}), this.modules[t];
  }
};
M(ri, "DEFAULTS", {
  modules: {}
}), M(ri, "themes", {
  default: ri
});
let Nn = ri;
const Y0 = (s) => s.parentElement || s.getRootNode().host || null, X0 = (s) => {
  const t = s.getBoundingClientRect(), e = "offsetWidth" in s && Math.abs(t.width) / s.offsetWidth || 1, n = "offsetHeight" in s && Math.abs(t.height) / s.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + s.clientWidth * e,
    bottom: t.top + s.clientHeight * n,
    left: t.left
  };
}, tr = (s) => {
  const t = parseInt(s, 10);
  return Number.isNaN(t) ? 0 : t;
}, zc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, Z0 = (s, t) => {
  var r, o, c;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, l = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : X0(i), h = getComputedStyle(i), f = zc(n.left, n.right, l.left, l.right, tr(h.scrollPaddingLeft), tr(h.scrollPaddingRight)), p = zc(n.top, n.bottom, l.top, l.bottom, tr(h.scrollPaddingTop), tr(h.scrollPaddingBottom));
    if (f || p)
      if (a)
        (c = e.defaultView) == null || c.scrollBy(f, p);
      else {
        const {
          scrollLeft: g,
          scrollTop: v
        } = i;
        p && (i.scrollTop += p), f && (i.scrollLeft += f);
        const E = i.scrollLeft - g, T = i.scrollTop - v;
        n = {
          left: n.left - E,
          top: n.top - T,
          right: n.right - E,
          bottom: n.bottom - T
        };
      }
    i = a || h.position === "fixed" ? null : Y0(i);
  }
}, Q0 = 100, J0 = ["block", "break", "cursor", "inline", "scroll", "text"], tE = (s, t, e) => {
  const n = new An();
  return J0.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), s.forEach((i) => {
    let r = t.query(i);
    r || e.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > Q0) {
        e.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, gn = Ue("quill"), er = new An();
ee.uiClass = "ql-ui";
const Qt = class Qt {
  static debug(t) {
    t === !0 && (t = "log"), Ue.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return wa.get(t) || er.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && gn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, e) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && gn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && er.register(e), typeof e.register == "function" && e.register(er);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = eE(t, e), this.container = this.options.container, this.container == null) {
      gn.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && Qt.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", wa.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new q();
    const i = hl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new W0(this.scroll), this.selection = new F0(this.scroll, this.emitter), this.composition = new G0(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(q.events.EDITOR_CHANGE, (o) => {
      o === q.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(q.events.SCROLL_UPDATE, (o, c) => {
      const a = this.selection.lastRange, [l] = this.selection.getRange(), h = a && l ? {
        oldRange: a,
        newRange: l
      } : void 0;
      Zt.call(this, () => this.editor.update(null, c, h), o);
    }), this.emitter.on(q.events.SCROLL_EMBED_UPDATE, (o, c) => {
      const a = this.selection.lastRange, [l] = this.selection.getRange(), h = a && l ? {
        oldRange: a,
        newRange: l
      } : void 0;
      Zt.call(this, () => {
        const f = new B().retain(o.offset(this)).retain({
          [o.statics.blotName]: c
        });
        return this.editor.update(f, [], h);
      }, Qt.sources.USER);
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof t == "string") {
      const n = t;
      t = document.createElement("div"), t.classList.add(n);
    }
    return this.container.insertBefore(t, e), t;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(t, e, n) {
    return [t, e, , n] = ke(t, e, n), Zt.call(this, () => this.editor.deleteText(t, e), n, t, -1 * e);
  }
  disable() {
    this.enable(!1);
  }
  editReadOnly(t) {
    this.allowReadOnlyEdits = !0;
    const e = t();
    return this.allowReadOnlyEdits = !1, e;
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.scroll.enable(t), this.container.classList.toggle("ql-disabled", !t);
  }
  focus() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus(), t.preventScroll || this.scrollSelectionIntoView();
  }
  format(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : q.sources.API;
    return Zt.call(this, () => {
      const i = this.getSelection(!0);
      let r = new B();
      if (i == null) return r;
      if (this.scroll.query(t, $.BLOCK))
        r = this.editor.formatLine(i.index, i.length, {
          [t]: e
        });
      else {
        if (i.length === 0)
          return this.selection.format(t, e), r;
        r = this.editor.formatText(i.index, i.length, {
          [t]: e
        });
      }
      return this.setSelection(i, q.sources.SILENT), r;
    }, n);
  }
  formatLine(t, e, n, i, r) {
    let o;
    return [t, e, o, r] = ke(
      t,
      e,
      // @ts-expect-error
      n,
      i,
      r
    ), Zt.call(this, () => this.editor.formatLine(t, e, o), r, t, 0);
  }
  formatText(t, e, n, i, r) {
    let o;
    return [t, e, o, r] = ke(
      // @ts-expect-error
      t,
      e,
      n,
      i,
      r
    ), Zt.call(this, () => this.editor.formatText(t, e, o), r, t, 0);
  }
  getBounds(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = null;
    if (typeof t == "number" ? n = this.selection.getBounds(t, e) : n = this.selection.getBounds(t.index, t.length), !n) return null;
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
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - t;
    return [t, e] = ke(t, e), this.editor.getContents(t, e);
  }
  getFormat() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return typeof t == "number" ? this.editor.getFormat(t, e) : this.editor.getFormat(t.index, t.length);
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
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    return typeof t != "number" ? this.scroll.lines(t.index, t.length) : this.scroll.lines(t, e);
  }
  getModule(t) {
    return this.theme.modules[t];
  }
  getSelection() {
    return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = ke(t, e), this.editor.getHTML(t, e);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = ke(t, e), this.editor.getText(t, e);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, e, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Qt.sources.API;
    return Zt.call(this, () => this.editor.insertEmbed(t, e, n), i, t);
  }
  insertText(t, e, n, i, r) {
    let o;
    return [t, , o, r] = ke(t, 0, n, i, r), Zt.call(this, () => this.editor.insertText(t, e, o), r, t, e.length);
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
  removeFormat(t, e, n) {
    return [t, e, , n] = ke(t, e, n), Zt.call(this, () => this.editor.removeFormat(t, e), n, t);
  }
  scrollRectIntoView(t) {
    Z0(this.root, t);
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
    const t = this.selection.lastRange, e = t && this.selection.getBounds(t.index, t.length);
    e && this.scrollRectIntoView(e);
  }
  setContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : q.sources.API;
    return Zt.call(this, () => {
      t = new B(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, e);
  }
  setSelection(t, e, n) {
    t == null ? this.selection.setRange(null, e || Qt.sources.API) : ([t, e, , n] = ke(t, e, n), this.selection.setRange(new Rs(Math.max(0, t), e), n), n !== q.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : q.sources.API;
    const n = new B().insert(t);
    return this.setContents(n, e);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : q.sources.USER;
    const e = this.scroll.update(t);
    return this.selection.update(t), e;
  }
  updateContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : q.sources.API;
    return Zt.call(this, () => (t = new B(t), this.editor.applyDelta(t)), e, !0);
  }
};
M(Qt, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: er,
  theme: "default"
}), M(Qt, "events", q.events), M(Qt, "sources", q.sources), M(Qt, "version", "2.0.2"), M(Qt, "imports", {
  delta: B,
  parchment: O0,
  "core/module": oe,
  "core/theme": Nn
});
let O = Qt;
function Kc(s) {
  return typeof s == "string" ? document.querySelector(s) : s;
}
function Zo(s) {
  return Object.entries(s ?? {}).reduce((t, e) => {
    let [n, i] = e;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Gc(s) {
  return Object.fromEntries(Object.entries(s).filter((t) => t[1] !== void 0));
}
function eE(s, t) {
  const e = Kc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === O.DEFAULTS.theme ? Nn : O.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = O.DEFAULTS, {
    modules: c,
    ...a
  } = i.DEFAULTS;
  let l = Zo(t.modules);
  l != null && l.toolbar && l.toolbar.constructor !== Object && (l = {
    ...l,
    toolbar: {
      container: l.toolbar
    }
  });
  const h = Je({}, Zo(r), Zo(c), l), f = {
    ...o,
    ...Gc(a),
    ...Gc(t)
  };
  let p = t.registry;
  return p ? t.formats && gn.warn('Ignoring "formats" option because "registry" is specified') : p = t.formats ? tE(t.formats, f.registry, gn) : f.registry, {
    ...f,
    registry: p,
    container: e,
    theme: i,
    modules: Object.entries(h).reduce((g, v) => {
      let [E, T] = v;
      if (!T) return g;
      const A = O.import(`modules/${E}`);
      return A == null ? (gn.error(`Cannot load ${E} module. Are you sure you registered it?`), g) : {
        ...g,
        // @ts-expect-error
        [E]: Je({}, A.DEFAULTS || {}, T)
      };
    }, {}),
    bounds: Kc(f.bounds)
  };
}
function Zt(s, t, e, n) {
  if (!this.isEnabled() && t === q.sources.USER && !this.allowReadOnlyEdits)
    return new B();
  let i = e == null ? null : this.getSelection();
  const r = this.editor.delta, o = s();
  if (i != null && (e === !0 && (e = i.index), n == null ? i = Yc(i, o, t) : n !== 0 && (i = Yc(i, e, n, t)), this.setSelection(i, q.sources.SILENT)), o.length() > 0) {
    const c = [q.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(q.events.EDITOR_CHANGE, ...c), t !== q.sources.SILENT && this.emitter.emit(...c);
  }
  return o;
}
function ke(s, t, e, n, i) {
  let r = {};
  return typeof s.index == "number" && typeof s.length == "number" ? typeof t != "number" ? (i = n, n = e, e = t, t = s.length, s = s.index) : (t = s.length, s = s.index) : typeof t != "number" && (i = n, n = e, e = t, t = 0), typeof e == "object" ? (r = e, i = n) : typeof e == "string" && (n != null ? r[e] = n : i = e), i = i || q.sources.API, [s, t, r, i];
}
function Yc(s, t, e, n) {
  const i = typeof e == "number" ? e : 0;
  if (s == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [s.index, s.index + s.length].map((c) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(c, n !== q.sources.USER)
  )) : [r, o] = [s.index, s.index + s.length].map((c) => c < t || c === t && n === q.sources.USER ? c : i >= 0 ? c + i : Math.max(t, c + i)), new Rs(r, o - r);
}
class Ps extends Dr {
}
function Xc(s) {
  return s instanceof ft || s instanceof Ut;
}
function Zc(s) {
  return typeof s.updateContent == "function";
}
class un extends hl {
  constructor(t, e, n) {
    let {
      emitter: i
    } = n;
    super(t, e), this.emitter = i, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (r) => this.handleDragStart(r));
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
    this.emitter.emit(q.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(q.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, e) {
    this.emitter.emit(q.events.SCROLL_EMBED_UPDATE, t, e);
  }
  deleteAt(t, e) {
    const [n, i] = this.line(t), [r] = this.line(t + e);
    if (super.deleteAt(t, e), r != null && n !== r && i > 0) {
      if (n instanceof Ut || r instanceof Ut) {
        this.optimize();
        return;
      }
      const o = r.children.head instanceof re ? null : r.children.head;
      n.moveChildren(r, o), n.remove();
    }
    this.optimize();
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", t ? "true" : "false");
  }
  formatAt(t, e, n, i) {
    super.formatAt(t, e, n, i), this.optimize();
  }
  insertAt(t, e, n) {
    if (t >= this.length())
      if (n == null || this.scroll.query(e, $.BLOCK) == null) {
        const i = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(i), n == null && e.endsWith(`
`) ? i.insertAt(0, e.slice(0, -1), n) : i.insertAt(0, e, n);
      } else {
        const i = this.scroll.create(e, n);
        this.appendChild(i);
      }
    else
      super.insertAt(t, e, n);
    this.optimize();
  }
  insertBefore(t, e) {
    if (t.statics.scope === $.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(t), super.insertBefore(n, e);
    } else
      super.insertBefore(t, e);
  }
  insertContents(t, e) {
    const n = this.deltaToRenderBlocks(e.concat(new B().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ut, t)[0] && t < this.length()), l = r.type === "block" ? r.delta : new B().insert({
        [r.key]: r.value
      });
      Qo(this, t, l);
      const h = r.type === "block" ? 1 : 0, f = t + l.length() + h;
      a && this.insertAt(f - 1, `
`);
      const p = Pt(this.line(t)[0]), g = Vt.AttributeMap.diff(p, r.attributes) || {};
      Object.keys(g).forEach((v) => {
        this.formatAt(f - 1, 1, v, g[v]);
      }), t = f;
    }
    let [o, c] = this.children.find(t);
    if (n.length && (o && (o = o.split(c), c = 0), n.forEach((a) => {
      if (a.type === "block") {
        const l = this.createBlock(a.attributes, o || void 0);
        Qo(l, 0, a.delta);
      } else {
        const l = this.create(a.key, a.value);
        this.insertBefore(l, o || void 0), Object.keys(a.attributes).forEach((h) => {
          l.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + c : this.length();
      Qo(this, a, i.delta);
    }
    this.batchEnd(), this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(t) {
    const e = this.path(t).pop();
    if (!e)
      return [null, -1];
    const [n, i] = e;
    return n instanceof yt ? [n, i] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(Xc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let c = [], a = o;
      return i.children.forEachAt(r, o, (l, h, f) => {
        Xc(l) ? c.push(l) : l instanceof Dr && (c = c.concat(n(l, h, a))), a -= f;
      }), c;
    };
    return n(this, t, e);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, e), t.length > 0 && this.emitter.emit(q.events.SCROLL_OPTIMIZE, t, e));
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
    let e = q.sources.USER;
    typeof t == "string" && (e = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((n) => {
      let {
        target: i
      } = n;
      const r = this.find(i, !0);
      return r && !Zc(r);
    }), t.length > 0 && this.emitter.emit(q.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(q.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, n) {
    const [i] = this.descendant((r) => r instanceof Ut, t);
    i && i.statics.blotName === e && Zc(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const e = [];
    let n = new B();
    return t.forEach((i) => {
      const r = i == null ? void 0 : i.insert;
      if (r)
        if (typeof r == "string") {
          const o = r.split(`
`);
          o.slice(0, -1).forEach((a) => {
            n.insert(a, i.attributes), e.push({
              type: "block",
              delta: n,
              attributes: i.attributes ?? {}
            }), n = new B();
          });
          const c = o[o.length - 1];
          c && n.insert(c, i.attributes);
        } else {
          const o = Object.keys(r)[0];
          if (!o) return;
          this.query(o, $.INLINE) ? n.push(i) : (n.length() && e.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new B(), e.push({
            type: "blockEmbed",
            key: o,
            value: r[o],
            attributes: i.attributes ?? {}
          }));
        }
    }), n.length() && e.push({
      type: "block",
      delta: n,
      attributes: {}
    }), e;
  }
  createBlock(t, e) {
    let n;
    const i = {};
    Object.entries(t).forEach((c) => {
      let [a, l] = c;
      this.query(a, $.BLOCK & $.BLOT) != null ? n = a : i[a] = l;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, e || void 0);
    const o = r.length();
    return Object.entries(i).forEach((c) => {
      let [a, l] = c;
      r.formatAt(0, o, a, l);
    }), r;
  }
}
M(un, "blotName", "scroll"), M(un, "className", "ql-editor"), M(un, "tagName", "DIV"), M(un, "defaultChild", ft), M(un, "allowedChildren", [ft, Ut, Ps]);
function Qo(s, t, e) {
  e.reduce((n, i) => {
    const r = Vt.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const c = i.insert;
        s.insertAt(n, c);
        const [a] = s.descendant(yt, n), l = Pt(a);
        o = Vt.AttributeMap.diff(l, o) || {};
      } else if (typeof i.insert == "object") {
        const c = Object.keys(i.insert)[0];
        if (c == null) return n;
        if (s.insertAt(n, c, i.insert[c]), s.scroll.query(c, $.INLINE) != null) {
          const [l] = s.descendant(yt, n), h = Pt(l);
          o = Vt.AttributeMap.diff(h, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((c) => {
      s.formatAt(n, r, c, o[c]);
    }), n + r;
  }, t);
}
const bl = {
  scope: $.BLOCK,
  whitelist: ["right", "center", "justify"]
}, sE = new ve("align", "align", bl), id = new ie("align", "ql-align", bl), rd = new ls("align", "text-align", bl);
class od extends ls {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const nE = new ie("color", "ql-color", {
  scope: $.INLINE
}), yl = new od("color", "color", {
  scope: $.INLINE
}), iE = new ie("background", "ql-bg", {
  scope: $.INLINE
}), _l = new od("background", "background-color", {
  scope: $.INLINE
});
class js extends Ps {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("spellcheck", "false"), e;
  }
  code(t, e) {
    return this.children.map((n) => n.length() <= 1 ? "" : n.domNode.innerText).join(`
`).slice(t, t + e);
  }
  html(t, e) {
    return `<pre>
${$r(this.code(t, e))}
</pre>`;
  }
}
class _t extends ft {
  static register() {
    O.register(js);
  }
}
M(_t, "TAB", "  ");
class vl extends Ee {
}
vl.blotName = "code";
vl.tagName = "CODE";
_t.blotName = "code-block";
_t.className = "ql-code-block";
_t.tagName = "DIV";
js.blotName = "code-block-container";
js.className = "ql-code-block-container";
js.tagName = "DIV";
js.allowedChildren = [_t];
_t.allowedChildren = [se, re, wn];
_t.requiredContainer = js;
const El = {
  scope: $.BLOCK,
  whitelist: ["rtl"]
}, ad = new ve("direction", "dir", El), ld = new ie("direction", "ql-direction", El), cd = new ls("direction", "direction", El), ud = {
  scope: $.INLINE,
  whitelist: ["serif", "monospace"]
}, hd = new ie("font", "ql-font", ud);
class rE extends ls {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const dd = new rE("font", "font-family", ud), fd = new ie("size", "ql-size", {
  scope: $.INLINE,
  whitelist: ["small", "large", "huge"]
}), pd = new ls("size", "font-size", {
  scope: $.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), oE = Ue("quill:keyboard"), aE = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Pr extends oe {
  static match(t, e) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((n) => !!e[n] !== t[n] && e[n] !== null) ? !1 : e.key === t.key || e.key === t.which;
  }
  constructor(t, e) {
    super(t, e), this.bindings = {}, Object.keys(this.options.bindings).forEach((n) => {
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = cE(t);
    if (i == null) {
      oE.warn("Attempted to add invalid keyboard binding", i);
      return;
    }
    typeof e == "function" && (e = {
      handler: e
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(i.key) ? i.key : [i.key]).forEach((o) => {
      const c = {
        ...i,
        key: o,
        ...e,
        ...n
      };
      this.bindings[c.key] = this.bindings[c.key] || [], this.bindings[c.key].push(c);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (t) => {
      if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((A) => Pr.match(t, A));
      if (i.length === 0) return;
      const r = O.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [c, a] = this.quill.getLine(o.index), [l, h] = this.quill.getLeaf(o.index), [f, p] = o.length === 0 ? [l, h] : this.quill.getLeaf(o.index + o.length), g = l instanceof yr ? l.value().slice(0, h) : "", v = f instanceof yr ? f.value().slice(p) : "", E = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && c.length() <= 1,
        format: this.quill.getFormat(o),
        line: c,
        offset: a,
        prefix: g,
        suffix: v,
        event: t
      };
      i.some((A) => {
        if (A.collapsed != null && A.collapsed !== E.collapsed || A.empty != null && A.empty !== E.empty || A.offset != null && A.offset !== E.offset)
          return !1;
        if (Array.isArray(A.format)) {
          if (A.format.every((N) => E.format[N] == null))
            return !1;
        } else if (typeof A.format == "object" && !Object.keys(A.format).every((N) => A.format[N] === !0 ? E.format[N] != null : A.format[N] === !1 ? E.format[N] == null : cl(A.format[N], E.format[N])))
          return !1;
        return A.prefix != null && !A.prefix.test(E.prefix) || A.suffix != null && !A.suffix.test(E.suffix) ? !1 : A.handler.call(this, o, E, A) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, e) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new B().retain(t.index - n).delete(n);
    if (e.offset === 0) {
      const [c] = this.quill.getLine(t.index - 1);
      if (c && !(c.statics.blotName === "block" && c.length() <= 1)) {
        const l = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = Vt.AttributeMap.diff(l, h) || {}, Object.keys(i).length > 0) {
          const f = new B().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(f);
        }
      }
    }
    this.quill.updateContents(o, O.sources.USER), this.quill.focus();
  }
  handleDelete(t, e) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new B().retain(t.index).delete(n);
    if (e.offset >= r.length() - 1) {
      const [c] = this.quill.getLine(t.index + 1);
      if (c) {
        const a = r.formats(), l = this.quill.getFormat(t.index, 1);
        i = Vt.AttributeMap.diff(a, l) || {}, Object.keys(i).length > 0 && (o = o.retain(c.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, O.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Tl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, e) {
    const n = Object.keys(e.format).reduce((r, o) => (this.quill.scroll.query(o, $.BLOCK) && !Array.isArray(e.format[o]) && (r[o] = e.format[o]), r), {}), i = new B().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, O.sources.USER), this.quill.setSelection(t.index + 1, O.sources.SILENT), this.quill.focus();
  }
}
const lE = {
  bindings: {
    bold: Jo("bold"),
    italic: Jo("italic"),
    underline: Jo("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(s, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", O.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(s, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", O.sources.USER), !1);
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
      handler(s, t) {
        t.format.indent != null ? this.quill.format("indent", "-1", O.sources.USER) : t.format.list != null && this.quill.format("list", !1, O.sources.USER);
      }
    },
    "indent code-block": Qc(!0),
    "outdent code-block": Qc(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(s) {
        this.quill.deleteText(s.index - 1, 1, O.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(s, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const e = new B().retain(s.index).delete(s.length).insert("	");
        return this.quill.updateContents(e, O.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index + 1, O.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, O.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(s, t) {
        const e = {
          list: !1
        };
        t.format.indent && (e.indent = !1), this.quill.formatLine(s.index, s.length, e, O.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(s) {
        const [t, e] = this.quill.getLine(s.index), n = {
          // @ts-expect-error Fix me later
          ...t.formats(),
          list: "checked"
        }, i = new B().retain(s.index).insert(`
`, n).retain(t.length() - e - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, O.sources.USER), this.quill.setSelection(s.index + 1, O.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(s, t) {
        const [e, n] = this.quill.getLine(s.index), i = new B().retain(s.index).insert(`
`, t.format).retain(e.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, O.sources.USER), this.quill.setSelection(s.index + 1, O.sources.SILENT), this.quill.scrollSelectionIntoView();
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
      handler(s) {
        const t = this.quill.getModule("table");
        if (t) {
          const [e, n, i, r] = t.getTable(s), o = uE(e, n, i, r);
          if (o == null) return;
          let c = e.offset();
          if (o < 0) {
            const a = new B().retain(c).insert(`
`);
            this.quill.updateContents(a, O.sources.USER), this.quill.setSelection(s.index + 1, s.length, O.sources.SILENT);
          } else if (o > 0) {
            c += e.length();
            const a = new B().retain(c).insert(`
`);
            this.quill.updateContents(a, O.sources.USER), this.quill.setSelection(c, O.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(s, t) {
        const {
          event: e,
          line: n
        } = t, i = n.offset(this.quill.scroll);
        e.shiftKey ? this.quill.setSelection(i - 1, O.sources.USER) : this.quill.setSelection(i + n.length(), O.sources.USER);
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
      handler(s, t) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: e
        } = t.prefix, [n, i] = this.quill.getLine(s.index);
        if (i > e) return !0;
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
        this.quill.insertText(s.index, " ", O.sources.USER), this.quill.history.cutoff();
        const o = new B().retain(s.index - i).delete(e + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, O.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index - e, O.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(s) {
        const [t, e] = this.quill.getLine(s.index);
        let n = 2, i = t;
        for (; i != null && i.length() <= 1 && i.formats()["code-block"]; )
          if (i = i.prev, n -= 1, n <= 0) {
            const r = new B().retain(s.index + t.length() - e - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, O.sources.USER), this.quill.setSelection(s.index - 1, O.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": sr("ArrowLeft", !1),
    "embed left shift": sr("ArrowLeft", !0),
    "embed right": sr("ArrowRight", !1),
    "embed right shift": sr("ArrowRight", !0),
    "table down": Jc(!1),
    "table up": Jc(!0)
  }
};
Pr.DEFAULTS = lE;
function Qc(s) {
  return {
    key: "Tab",
    shiftKey: !s,
    format: {
      "code-block": !0
    },
    handler(t, e) {
      let {
        event: n
      } = e;
      const i = this.quill.scroll.query("code-block"), {
        TAB: r
      } = i;
      if (t.length === 0 && !n.shiftKey) {
        this.quill.insertText(t.index, r, O.sources.USER), this.quill.setSelection(t.index + r.length, O.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: c,
        length: a
      } = t;
      o.forEach((l, h) => {
        s ? (l.insertAt(0, r), h === 0 ? c += r.length : a += r.length) : l.domNode.textContent.startsWith(r) && (l.deleteAt(0, r.length), h === 0 ? c -= r.length : a -= r.length);
      }), this.quill.update(O.sources.USER), this.quill.setSelection(c, a, O.sources.SILENT);
    }
  };
}
function sr(s, t) {
  return {
    key: s,
    shiftKey: t,
    altKey: null,
    [s === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(n) {
      let {
        index: i
      } = n;
      s === "ArrowRight" && (i += n.length + 1);
      const [r] = this.quill.getLeaf(i);
      return r instanceof Dt ? (s === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, O.sources.USER) : this.quill.setSelection(n.index - 1, O.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, O.sources.USER) : this.quill.setSelection(n.index + n.length + 1, O.sources.USER), !1) : !0;
    }
  };
}
function Jo(s) {
  return {
    key: s[0],
    shortKey: !0,
    handler(t, e) {
      this.quill.format(s, !e.format[s], O.sources.USER);
    }
  };
}
function Jc(s) {
  return {
    key: s ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(t, e) {
      const n = s ? "prev" : "next", i = e.line, r = i.parent[n];
      if (r != null) {
        if (r.statics.blotName === "table-row") {
          let o = r.children.head, c = i;
          for (; c.prev != null; )
            c = c.prev, o = o.next;
          const a = o.offset(this.quill.scroll) + Math.min(e.offset, o.length() - 1);
          this.quill.setSelection(a, 0, O.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (s ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, O.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, O.sources.USER));
      }
      return !1;
    }
  };
}
function cE(s) {
  if (typeof s == "string" || typeof s == "number")
    s = {
      key: s
    };
  else if (typeof s == "object")
    s = fn(s);
  else
    return null;
  return s.shortKey && (s[aE] = s.shortKey, delete s.shortKey), s;
}
function Tl(s) {
  let {
    quill: t,
    range: e
  } = s;
  const n = t.getLines(e);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), o = n[n.length - 1].formats();
    i = Vt.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(e, O.sources.USER), Object.keys(i).length > 0 && t.formatLine(e.index, 1, i, O.sources.USER), t.setSelection(e.index, O.sources.SILENT);
}
function uE(s, t, e, n) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? n === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const hE = /font-weight:\s*normal/, dE = ["P", "OL", "UL"], tu = (s) => s && dE.includes(s.tagName), fE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => tu(t.previousElementSibling) && tu(t.nextElementSibling)).forEach((t) => {
    var e;
    (e = t.parentNode) == null || e.removeChild(t);
  });
}, pE = (s) => {
  Array.from(s.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var e;
    return (e = t.getAttribute("style")) == null ? void 0 : e.match(hE);
  }).forEach((t) => {
    var n;
    const e = s.createDocumentFragment();
    e.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(e, t);
  });
};
function gE(s) {
  s.querySelector('[id^="docs-internal-guid-"]') && (pE(s), fE(s));
}
const mE = /\bmso-list:[^;]*ignore/i, bE = /\bmso-list:[^;]*\bl(\d+)/i, yE = /\bmso-list:[^;]*\blevel(\d+)/i, _E = (s, t) => {
  const e = s.getAttribute("style"), n = e == null ? void 0 : e.match(bE);
  if (!n)
    return null;
  const i = Number(n[1]), r = e == null ? void 0 : e.match(yE), o = r ? Number(r[1]) : 1, c = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(c), l = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: l,
    element: s
  };
}, vE = (s) => {
  var o, c;
  const t = Array.from(s.querySelectorAll("[style*=mso-list]")), e = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(mE) ? e.push(a) : n.push(a);
  }), e.forEach((a) => {
    var l;
    return (l = a.parentNode) == null ? void 0 : l.removeChild(a);
  });
  const i = s.documentElement.innerHTML, r = n.map((a) => _E(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let l = r.shift();
    for (; l; )
      a.push(l), l = r.length && ((o = r[0]) == null ? void 0 : o.element) === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === l.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((g) => {
      const v = document.createElement("li");
      v.setAttribute("data-list", g.type), g.indent > 1 && v.setAttribute("class", `ql-indent-${g.indent - 1}`), v.innerHTML = g.element.innerHTML, h.appendChild(v);
    });
    const f = (c = a[0]) == null ? void 0 : c.element, {
      parentNode: p
    } = f ?? {};
    f && (p == null || p.replaceChild(h, f)), a.slice(1).forEach((g) => {
      let {
        element: v
      } = g;
      p == null || p.removeChild(v);
    });
  }
};
function EE(s) {
  s.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && vE(s);
}
const TE = [EE, gE], AE = (s) => {
  s.documentElement && TE.forEach((t) => {
    t(s);
  });
}, wE = Ue("quill:clipboard"), NE = [[Node.TEXT_NODE, BE], [Node.TEXT_NODE, su], ["br", xE], [Node.ELEMENT_NODE, su], [Node.ELEMENT_NODE, LE], [Node.ELEMENT_NODE, SE], [Node.ELEMENT_NODE, ME], ["li", RE], ["ol, ul", DE], ["pre", kE], ["tr", qE], ["b", ta("bold")], ["i", ta("italic")], ["strike", ta("strike")], ["style", IE]], OE = [sE, ad].reduce((s, t) => (s[t.keyName] = t, s), {}), eu = [rd, _l, yl, cd, dd, pd].reduce((s, t) => (s[t.keyName] = t, s), {});
class gd extends oe {
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], NE.concat(this.options.matchers ?? []).forEach((n) => {
      let [i, r] = n;
      this.addMatcher(i, r);
    });
  }
  addMatcher(t, e) {
    this.matchers.push([t, e]);
  }
  convert(t) {
    let {
      html: e,
      text: n
    } = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i[_t.blotName])
      return new B().insert(n || "", {
        [_t.blotName]: i[_t.blotName]
      });
    if (!e)
      return new B().insert(n || "", i);
    const r = this.convertHTML(e);
    return Ni(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new B().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    AE(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const n = e.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Al(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : O.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, e), this.quill.setSelection(0, O.sources.SILENT);
    } else {
      const i = this.convert({
        html: e,
        text: ""
      });
      this.quill.updateContents(new B().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), O.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    var o, c;
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: r
    } = this.onCopy(n, e);
    (o = t.clipboardData) == null || o.setData("text/plain", r), (c = t.clipboardData) == null || c.setData("text/html", i), e && Tl({
      range: n,
      quill: this.quill
    });
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(t) {
    return t.split(/\r?\n/).filter((e) => e[0] !== "#").join(`
`);
  }
  onCapturePaste(t) {
    var o, c, a, l, h;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const e = this.quill.getSelection(!0);
    if (e == null) return;
    const n = (o = t.clipboardData) == null ? void 0 : o.getData("text/html");
    let i = (c = t.clipboardData) == null ? void 0 : c.getData("text/plain");
    if (!n && !i) {
      const f = (a = t.clipboardData) == null ? void 0 : a.getData("text/uri-list");
      f && (i = this.normalizeURIList(f));
    }
    const r = Array.from(((l = t.clipboardData) == null ? void 0 : l.files) || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(e, r);
      return;
    }
    if (n && r.length > 0) {
      const f = new DOMParser().parseFromString(n, "text/html");
      if (f.body.childElementCount === 1 && ((h = f.body.firstElementChild) == null ? void 0 : h.tagName) === "IMG") {
        this.quill.uploader.upload(e, r);
        return;
      }
    }
    this.onPaste(e, {
      html: n,
      text: i
    });
  }
  onCopy(t) {
    const e = this.quill.getText(t);
    return {
      html: this.quill.getSemanticHTML(t),
      text: e
    };
  }
  onPaste(t, e) {
    let {
      text: n,
      html: i
    } = e;
    const r = this.quill.getFormat(t.index), o = this.convert({
      text: n,
      html: i
    }, r);
    wE.log("onPaste", o, {
      text: n,
      html: i
    });
    const c = new B().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(c, O.sources.USER), this.quill.setSelection(c.length() - t.length, O.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, e) {
    const n = [], i = [];
    return this.matchers.forEach((r) => {
      const [o, c] = r;
      switch (o) {
        case Node.TEXT_NODE:
          i.push(c);
          break;
        case Node.ELEMENT_NODE:
          n.push(c);
          break;
        default:
          Array.from(t.querySelectorAll(o)).forEach((a) => {
            if (e.has(a)) {
              const l = e.get(a);
              l == null || l.push(c);
            } else
              e.set(a, [c]);
          });
          break;
      }
    }), [n, i];
  }
}
M(gd, "DEFAULTS", {
  matchers: []
});
function Us(s, t, e, n) {
  return n.query(t) ? s.reduce((i, r) => {
    if (!r.insert) return i;
    if (r.attributes && r.attributes[t])
      return i.push(r);
    const o = e ? {
      [t]: e
    } : {};
    return i.insert(r.insert, {
      ...o,
      ...r.attributes
    });
  }, new B()) : s;
}
function Ni(s, t) {
  let e = "";
  for (let n = s.ops.length - 1; n >= 0 && e.length < t.length; --n) {
    const i = s.ops[n];
    if (typeof i.insert != "string") break;
    e = i.insert + e;
  }
  return e.slice(-1 * t.length) === t;
}
function Ze(s, t) {
  if (!(s instanceof Element)) return !1;
  const e = t.query(s);
  return e && e.prototype instanceof Dt ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(s.tagName.toLowerCase());
}
function CE(s, t) {
  return s.previousElementSibling && s.nextElementSibling && !Ze(s.previousElementSibling, t) && !Ze(s.nextElementSibling, t);
}
const nr = /* @__PURE__ */ new WeakMap();
function md(s) {
  return s == null ? !1 : (nr.has(s) || (s.tagName === "PRE" ? nr.set(s, !0) : nr.set(s, md(s.parentNode))), nr.get(s));
}
function Al(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new B()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let c = Al(s, o, e, n, i);
    return o.nodeType === t.ELEMENT_NODE && (c = e.reduce((a, l) => l(o, a, s), c), c = (i.get(o) || []).reduce((a, l) => l(o, a, s), c)), r.concat(c);
  }, new B()) : new B();
}
function ta(s) {
  return (t, e, n) => Us(e, s, !0, n);
}
function SE(s, t, e) {
  const n = ve.keys(s), i = ie.keys(s), r = ls.keys(s), o = {};
  return n.concat(i).concat(r).forEach((c) => {
    let a = e.query(c, $.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = OE[c], a != null && (a.attrName === c || a.keyName === c) && (o[a.attrName] = a.value(s) || void 0), a = eu[c], a != null && (a.attrName === c || a.keyName === c) && (a = eu[c], o[a.attrName] = a.value(s) || void 0));
  }), Object.entries(o).reduce((c, a) => {
    let [l, h] = a;
    return Us(c, l, h, e);
  }, t);
}
function LE(s, t, e) {
  const n = e.query(s);
  if (n == null) return t;
  if (n.prototype instanceof Dt) {
    const i = {}, r = n.value(s);
    if (r != null)
      return i[n.blotName] = r, new B().insert(i, n.formats(s, e));
  } else if (n.prototype instanceof di && !Ni(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Us(t, n.blotName, n.formats(s, e), e);
  return t;
}
function xE(s, t) {
  return Ni(t, `
`) || t.insert(`
`), t;
}
function kE(s, t, e) {
  const n = e.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(s, e) : !0;
  return Us(t, "code-block", i, e);
}
function IE() {
  return new B();
}
function RE(s, t, e) {
  const n = e.query(s);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Ni(t, `
`))
    return t;
  let i = -1, r = s.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, c) => c.insert ? c.attributes && typeof c.attributes.indent == "number" ? o.push(c) : o.insert(c.insert, {
    indent: i,
    ...c.attributes || {}
  }) : o, new B());
}
function DE(s, t, e) {
  const n = s;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Us(t, "list", i, e);
}
function su(s, t, e) {
  if (!Ni(t, `
`)) {
    if (Ze(s, e) && (s.childNodes.length > 0 || s instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && s.nextSibling) {
      let n = s.nextSibling;
      for (; n != null; ) {
        if (Ze(n, e))
          return t.insert(`
`);
        const i = e.query(n);
        if (i && i.prototype instanceof Ut)
          return t.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return t;
}
function ME(s, t, e) {
  var r;
  const n = {}, i = s.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, c) => {
    let [a, l] = c;
    return Us(o, a, l, e);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new B().insert("	").concat(t) : t;
}
function qE(s, t, e) {
  var i, r;
  const n = ((i = s.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? s.parentElement : (r = s.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const c = Array.from(n.querySelectorAll("tr")).indexOf(s) + 1;
    return Us(t, "table", c, e);
  }
  return t;
}
function BE(s, t, e) {
  var i;
  let n = s.data;
  if (((i = s.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!md(s)) {
    if (n.trim().length === 0 && n.includes(`
`) && !CE(s, e))
      return t;
    const r = (o, c) => {
      const a = c.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (s.previousSibling == null && s.parentElement != null && Ze(s.parentElement, e) || s.previousSibling instanceof Element && Ze(s.previousSibling, e)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (s.nextSibling == null && s.parentElement != null && Ze(s.parentElement, e) || s.nextSibling instanceof Element && Ze(s.nextSibling, e)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class bd extends oe {
  constructor(e, n) {
    super(e, n);
    M(this, "lastRecorded", 0);
    M(this, "ignoreChange", !1);
    M(this, "stack", {
      undo: [],
      redo: []
    });
    M(this, "currentRange", null);
    this.quill.on(O.events.EDITOR_CHANGE, (i, r, o, c) => {
      i === O.events.SELECTION_CHANGE ? r && c !== O.sources.SILENT && (this.currentRange = r) : i === O.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || c === O.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = Ca(this.currentRange, r));
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
  change(e, n) {
    if (this.stack[e].length === 0) return;
    const i = this.stack[e].pop();
    if (!i) return;
    const r = this.quill.getContents(), o = i.delta.invert(r);
    this.stack[n].push({
      delta: o,
      range: Ca(i.range, o)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, O.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
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
  record(e, n) {
    if (e.ops.length === 0) return;
    this.stack.redo = [];
    let i = e.invert(n), r = this.currentRange;
    const o = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > o && this.stack.undo.length > 0
    ) {
      const c = this.stack.undo.pop();
      c && (i = i.compose(c.delta), r = c.range);
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
  transform(e) {
    nu(this.stack.undo, e), nu(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, O.sources.USER);
    else {
      const n = PE(this.quill.scroll, e.delta);
      this.quill.setSelection(n, O.sources.USER);
    }
  }
}
M(bd, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function nu(s, t) {
  let e = t;
  for (let n = s.length - 1; n >= 0; n -= 1) {
    const i = s[n];
    s[n] = {
      delta: e.transform(i.delta, !0),
      range: i.range && Ca(i.range, e)
    }, e = i.delta.transform(e), s[n].delta.length() === 0 && s.splice(n, 1);
  }
}
function $E(s, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((n) => s.query(n, $.BLOCK) != null) : !1;
}
function PE(s, t) {
  const e = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - e;
  return $E(s, t) && (n -= 1), n;
}
function Ca(s, t) {
  if (!s) return s;
  const e = t.transformPosition(s.index), n = t.transformPosition(s.index + s.length);
  return {
    index: e,
    length: n - e
  };
}
class yd extends oe {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("drop", (n) => {
      var o;
      n.preventDefault();
      let i = null;
      if (document.caretRangeFromPoint)
        i = document.caretRangeFromPoint(n.clientX, n.clientY);
      else if (document.caretPositionFromPoint) {
        const c = document.caretPositionFromPoint(n.clientX, n.clientY);
        i = document.createRange(), i.setStart(c.offsetNode, c.offset), i.setEnd(c.offsetNode, c.offset);
      }
      const r = i && t.selection.normalizeNative(i);
      if (r) {
        const c = t.selection.normalizedToRange(r);
        (o = n.dataTransfer) != null && o.files && this.upload(c, n.dataTransfer.files);
      }
    });
  }
  upload(t, e) {
    const n = [];
    Array.from(e).forEach((i) => {
      var r;
      i && ((r = this.options.mimetypes) != null && r.includes(i.type)) && n.push(i);
    }), n.length > 0 && this.options.handler.call(this, t, n);
  }
}
yd.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(s, t) {
    if (!this.quill.scroll.query("image"))
      return;
    const e = t.map((n) => new Promise((i) => {
      const r = new FileReader();
      r.onload = () => {
        i(r.result);
      }, r.readAsDataURL(n);
    }));
    Promise.all(e).then((n) => {
      const i = n.reduce((r, o) => r.insert({
        image: o
      }), new B().retain(s.index).delete(s.length));
      this.quill.updateContents(i, q.sources.USER), this.quill.setSelection(s.index + n.length, q.sources.SILENT);
    });
  }
};
const jE = ["insertText", "insertReplacementText"];
class UE extends oe {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(O.events.COMPOSITION_BEFORE_START, () => {
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (e) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new B().retain(t.index).insert(e, n), O.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + e.length, 0, O.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !jE.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const n = VE(t);
    if (n == null)
      return;
    const i = this.quill.selection.normalizeNative(e), r = i ? this.quill.selection.normalizedToRange(i) : null;
    r && this.replaceText(r, n) && t.preventDefault();
  }
  handleCompositionStart() {
    const t = this.quill.getSelection();
    t && this.replaceText(t);
  }
}
function VE(s) {
  var t;
  return typeof s.data == "string" ? s.data : (t = s.dataTransfer) != null && t.types.includes("text/plain") ? s.dataTransfer.getData("text/plain") : null;
}
const FE = /Mac/i.test(navigator.platform), HE = 100, WE = (s) => !!(s.key === "ArrowLeft" || s.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
s.key === "ArrowUp" || s.key === "ArrowDown" || s.key === "Home" || FE && s.key === "a" && s.ctrlKey === !0);
class zE extends oe {
  constructor(e, n) {
    super(e, n);
    M(this, "isListening", !1);
    M(this, "selectionChangeDeadline", 0);
    this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(e, n) {
        let {
          line: i,
          event: r
        } = n;
        if (!(i instanceof ee) || !i.uiNode)
          return !0;
        const o = getComputedStyle(i.domNode).direction === "rtl";
        return o && r.key !== "ArrowRight" || !o && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (r.shiftKey ? 1 : 0), O.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && WE(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + HE, this.isListening) return;
    this.isListening = !0;
    const e = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", e, {
      once: !0
    });
  }
  handleSelectionChange() {
    const e = document.getSelection();
    if (!e) return;
    const n = e.getRangeAt(0);
    if (n.collapsed !== !0 || n.startOffset !== 0) return;
    const i = this.quill.scroll.find(n.startContainer);
    if (!(i instanceof ee) || !i.uiNode) return;
    const r = document.createRange();
    r.setStartAfter(i.uiNode), r.setEndAfter(i.uiNode), e.removeAllRanges(), e.addRange(r);
  }
}
O.register({
  "blots/block": ft,
  "blots/block/embed": Ut,
  "blots/break": re,
  "blots/container": Ps,
  "blots/cursor": wn,
  "blots/embed": ml,
  "blots/inline": Ee,
  "blots/scroll": un,
  "blots/text": se,
  "modules/clipboard": gd,
  "modules/history": bd,
  "modules/keyboard": Pr,
  "modules/uploader": yd,
  "modules/input": UE,
  "modules/uiNode": zE
});
class KE extends ie {
  add(t, e) {
    let n = 0;
    if (e === "+1" || e === "-1") {
      const i = this.value(t) || 0;
      n = e === "+1" ? i + 1 : i - 1;
    } else typeof e == "number" && (n = e);
    return n === 0 ? (this.remove(t), !0) : super.add(t, n.toString());
  }
  canAdd(t, e) {
    return super.canAdd(t, e) || super.canAdd(t, parseInt(e, 10));
  }
  value(t) {
    return parseInt(super.value(t), 10) || void 0;
  }
}
const GE = new KE("indent", "ql-indent", {
  scope: $.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Sa extends ft {
}
M(Sa, "blotName", "blockquote"), M(Sa, "tagName", "blockquote");
class La extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
M(La, "blotName", "header"), M(La, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class Oi extends Ps {
}
Oi.blotName = "list-container";
Oi.tagName = "OL";
class Ci extends ft {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    O.register(Oi);
  }
  constructor(t, e) {
    super(t, e);
    const n = e.ownerDocument.createElement("span"), i = (r) => {
      if (!t.isEnabled()) return;
      const o = this.statics.formats(e, t);
      o === "checked" ? (this.format("list", "unchecked"), r.preventDefault()) : o === "unchecked" && (this.format("list", "checked"), r.preventDefault());
    };
    n.addEventListener("mousedown", i), n.addEventListener("touchstart", i), this.attachUI(n);
  }
  format(t, e) {
    t === this.statics.blotName && e ? this.domNode.setAttribute("data-list", e) : super.format(t, e);
  }
}
Ci.blotName = "list";
Ci.tagName = "LI";
Oi.allowedChildren = [Ci];
Ci.requiredContainer = Oi;
class gi extends Ee {
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
M(gi, "blotName", "bold"), M(gi, "tagName", ["STRONG", "B"]);
class xa extends gi {
}
M(xa, "blotName", "italic"), M(xa, "tagName", ["EM", "I"]);
class Qe extends Ee {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return _d(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
M(Qe, "blotName", "link"), M(Qe, "tagName", "A"), M(Qe, "SANITIZED_URL", "about:blank"), M(Qe, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function _d(s, t) {
  const e = document.createElement("a");
  e.href = s;
  const n = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class ka extends Ee {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
M(ka, "blotName", "script"), M(ka, "tagName", ["SUB", "SUP"]);
class Ia extends gi {
}
M(Ia, "blotName", "strike"), M(Ia, "tagName", ["S", "STRIKE"]);
class Ra extends Ee {
}
M(Ra, "blotName", "underline"), M(Ra, "tagName", "U");
class lr extends ml {
  static create(t) {
    if (window.katex == null)
      throw new Error("Formula module requires KaTeX.");
    const e = super.create(t);
    return typeof t == "string" && (window.katex.render(t, e, {
      throwOnError: !1,
      errorColor: "#f00"
    }), e.setAttribute("data-value", t)), e;
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
M(lr, "blotName", "formula"), M(lr, "className", "ql-formula"), M(lr, "tagName", "SPAN");
const iu = ["alt", "height", "width"];
class Da extends Dt {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return iu.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
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
  format(t, e) {
    iu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
M(Da, "blotName", "image"), M(Da, "tagName", "IMG");
const ru = ["height", "width"];
class cr extends Ut {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return ru.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static sanitize(t) {
    return Qe.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    ru.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
M(cr, "blotName", "video"), M(cr, "className", "ql-video"), M(cr, "tagName", "IFRAME");
const ti = new ie("code-token", "hljs", {
  scope: $.INLINE
});
class Be extends Ee {
  static formats(t, e) {
    for (; t != null && t !== e.domNode; ) {
      if (t.classList && t.classList.contains(_t.className))
        return super.formats(t, e);
      t = t.parentNode;
    }
  }
  constructor(t, e, n) {
    super(t, e, n), ti.add(this.domNode, n);
  }
  format(t, e) {
    t !== Be.blotName ? super.format(t, e) : e ? ti.add(this.domNode, e) : (ti.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ti.value(this.domNode) || this.unwrap();
  }
}
Be.blotName = "code-token";
Be.className = "ql-token";
class jt extends _t {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("data-language", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(t, e) {
    t === this.statics.blotName && e ? this.domNode.setAttribute("data-language", e) : super.format(t, e);
  }
  replaceWith(t, e) {
    return this.formatAt(0, this.length(), Be.blotName, !1), super.replaceWith(t, e);
  }
}
class ii extends js {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, e) {
    t === jt.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, e);
    }));
  }
  formatAt(t, e, n, i) {
    n === jt.blotName && (this.forceNext = !0), super.formatAt(t, e, n, i);
  }
  highlight(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = jt.formats(this.children.head.domNode);
    if (e || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((a, l) => a.concat(ed(l, !1)), new B()), c = t(i, r);
        o.diff(c).reduce((a, l) => {
          let {
            retain: h,
            attributes: f
          } = l;
          return h ? (f && Object.keys(f).forEach((p) => {
            [jt.blotName, Be.blotName].includes(p) && this.formatAt(a, h, p, f[p]);
          }), a + h) : a;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, e) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? jt.formats(n.domNode) : "plain"}">
${$r(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = jt.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
ii.allowedChildren = [jt];
jt.requiredContainer = ii;
jt.allowedChildren = [Be, wn, se, re];
const YE = (s, t, e) => {
  if (typeof s.versionString == "string") {
    const n = s.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return s.highlight(e, {
        language: t
      }).value;
  }
  return s.highlight(t, e).value;
};
class vd extends oe {
  static register() {
    O.register(Be, !0), O.register(jt, !0), O.register(ii, !0);
  }
  constructor(t, e) {
    if (super(t, e), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((n, i) => {
      let {
        key: r
      } = i;
      return n[r] = !0, n;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on(O.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof ii)) return;
      const e = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const o = e.ownerDocument.createElement("option");
        o.textContent = r, o.setAttribute("value", i), e.appendChild(o);
      }), e.addEventListener("change", () => {
        t.format(jt.blotName, e.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(e), t.children.head && (e.value = jt.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(O.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(O.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(ii) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, e);
    }), this.quill.update(O.sources.SILENT), n != null && this.quill.setSelection(n, O.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return $r(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [_t.blotName]: e
      }), i.insert(r)), new B());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(_t.className), n.innerHTML = YE(this.options.hljs, e, t), Al(this.quill.scroll, n, [(i, r) => {
      const o = ti.value(i);
      return o ? r.compose(new B().retain(r.length(), {
        [Be.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, c, a) => (a !== 0 && o.insert(`
`, {
      [_t.blotName]: e
    }), o.insert(c)), r)], /* @__PURE__ */ new WeakMap());
  }
}
vd.DEFAULTS = {
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
const oi = class oi extends ft {
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", wl()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === oi.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
M(oi, "blotName", "table"), M(oi, "tagName", "TD");
let te = oi;
class $e extends Ps {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const t = this.children.head.formats(), e = this.children.tail.formats(), n = this.next.children.head.formats(), i = this.next.children.tail.formats();
      return t.table === e.table && t.table === n.table && t.table === i.table;
    }
    return !1;
  }
  optimize(t) {
    super.optimize(t), this.children.forEach((e) => {
      if (e.next == null) return;
      const n = e.formats(), i = e.next.formats();
      if (n.table !== i.table) {
        const r = this.splitAfter(e);
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
M($e, "blotName", "table-row"), M($e, "tagName", "TR");
class ye extends Ps {
}
M(ye, "blotName", "table-body"), M(ye, "tagName", "TBODY");
class On extends Ps {
  balanceCells() {
    const t = this.descendants($e), e = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(e - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = te.formats(n.children.head.domNode));
        const r = this.scroll.create(te.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((e) => e.children.at(t));
  }
  deleteColumn(t) {
    const [e] = this.descendant(ye);
    e == null || e.children.head == null || e.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [e] = this.descendant(ye);
    e == null || e.children.head == null || e.children.forEach((n) => {
      const i = n.children.at(t), r = te.formats(n.children.head.domNode), o = this.scroll.create(te.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [e] = this.descendant(ye);
    if (e == null || e.children.head == null) return;
    const n = wl(), i = this.scroll.create($e.blotName);
    e.children.head.children.forEach(() => {
      const o = this.scroll.create(te.blotName, n);
      i.appendChild(o);
    });
    const r = e.children.at(t);
    e.insertBefore(i, r);
  }
  rows() {
    const t = this.children.head;
    return t == null ? [] : t.children.map((e) => e);
  }
}
M(On, "blotName", "table-container"), M(On, "tagName", "TABLE");
On.allowedChildren = [ye];
ye.requiredContainer = On;
ye.allowedChildren = [$e];
$e.requiredContainer = ye;
$e.allowedChildren = [te];
te.requiredContainer = $e;
function wl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class XE extends oe {
  static register() {
    O.register(te), O.register($e), O.register(ye), O.register(On);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(On).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , e] = this.getTable();
    e != null && (t.deleteColumn(e.cellOffset()), this.quill.update(O.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(O.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const e = t.offset();
    t.remove(), this.quill.update(O.sources.USER), this.quill.setSelection(e, O.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [e, n] = this.quill.getLine(t.index);
    if (e == null || e.statics.blotName !== te.blotName)
      return [null, null, null, -1];
    const i = e.parent;
    return [i.parent.parent, i, e, n];
  }
  insertColumn(t) {
    const e = this.quill.getSelection();
    if (!e) return;
    const [n, i, r] = this.getTable(e);
    if (r == null) return;
    const o = r.cellOffset();
    n.insertColumn(o + t), this.quill.update(O.sources.USER);
    let c = i.rowOffset();
    t === 0 && (c += 1), this.quill.setSelection(e.index + c, e.length, O.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(t) {
    const e = this.quill.getSelection();
    if (!e) return;
    const [n, i, r] = this.getTable(e);
    if (r == null) return;
    const o = i.rowOffset();
    n.insertRow(o + t), this.quill.update(O.sources.USER), t > 0 ? this.quill.setSelection(e, O.sources.SILENT) : this.quill.setSelection(e.index + i.children.length, e.length, O.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(t, e) {
    const n = this.quill.getSelection();
    if (n == null) return;
    const i = new Array(t).fill(0).reduce((r) => {
      const o = new Array(e).fill(`
`).join("");
      return r.insert(o, {
        table: wl()
      });
    }, new B().retain(n.index));
    this.quill.updateContents(i, O.sources.USER), this.quill.setSelection(n.index, O.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(O.events.SCROLL_OPTIMIZE, (t) => {
      t.some((e) => ["TD", "TR", "TBODY", "TABLE"].includes(e.target.tagName) ? (this.quill.once(O.events.TEXT_CHANGE, (n, i, r) => {
        r === O.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const ou = Ue("quill:toolbar");
class Nl extends oe {
  constructor(t, e) {
    var n, i;
    if (super(t, e), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), ZE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      ou.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var c;
      const o = (c = this.options.handlers) == null ? void 0 : c[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(O.events.EDITOR_CHANGE, () => {
      const [r] = this.quill.selection.getRange();
      this.update(r);
    });
  }
  addHandler(t, e) {
    this.handlers[t] = e;
  }
  attach(t) {
    let e = Array.from(t.classList).find((i) => i.indexOf("ql-") === 0);
    if (!e) return;
    if (e = e.slice(3), t.tagName === "BUTTON" && t.setAttribute("type", "button"), this.handlers[e] == null && this.quill.scroll.query(e) == null) {
      ou.warn("ignoring attaching to nonexistent format", e, t);
      return;
    }
    const n = t.tagName === "SELECT" ? "change" : "click";
    t.addEventListener(n, (i) => {
      let r;
      if (t.tagName === "SELECT") {
        if (t.selectedIndex < 0) return;
        const c = t.options[t.selectedIndex];
        c.hasAttribute("selected") ? r = !1 : r = c.value || !1;
      } else
        t.classList.contains("ql-active") ? r = !1 : r = t.value || !t.hasAttribute("value"), i.preventDefault();
      this.quill.focus();
      const [o] = this.quill.selection.getRange();
      if (this.handlers[e] != null)
        this.handlers[e].call(this, r);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(e).prototype instanceof Dt
      ) {
        if (r = prompt(`Enter ${e}`), !r) return;
        this.quill.updateContents(new B().retain(o.index).delete(o.length).insert({
          [e]: r
        }), O.sources.USER);
      } else
        this.quill.format(e, r, O.sources.USER);
      this.update(o);
    }), this.controls.push([e, t]);
  }
  update(t) {
    const e = t == null ? {} : this.quill.getFormat(t);
    this.controls.forEach((n) => {
      const [i, r] = n;
      if (r.tagName === "SELECT") {
        let o = null;
        if (t == null)
          o = null;
        else if (e[i] == null)
          o = r.querySelector("option[selected]");
        else if (!Array.isArray(e[i])) {
          let c = e[i];
          typeof c == "string" && (c = c.replace(/"/g, '\\"')), o = r.querySelector(`option[value="${c}"]`);
        }
        o == null ? (r.value = "", r.selectedIndex = -1) : o.selected = !0;
      } else if (t == null)
        r.classList.remove("ql-active"), r.setAttribute("aria-pressed", "false");
      else if (r.hasAttribute("value")) {
        const o = e[i], c = o === r.getAttribute("value") || o != null && o.toString() === r.getAttribute("value") || o == null && !r.getAttribute("value");
        r.classList.toggle("ql-active", c), r.setAttribute("aria-pressed", c.toString());
      } else {
        const o = e[i] != null;
        r.classList.toggle("ql-active", o), r.setAttribute("aria-pressed", o.toString());
      }
    });
  }
}
Nl.DEFAULTS = {};
function au(s, t, e) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), e != null ? (n.value = e, n.setAttribute("aria-label", `${t}: ${e}`)) : n.setAttribute("aria-label", t), s.appendChild(n);
}
function ZE(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        au(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? QE(n, r, o) : au(n, r, o);
      }
    }), s.appendChild(n);
  });
}
function QE(s, t, e) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), e.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), s.appendChild(n);
}
Nl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const s = this.quill.getSelection();
      if (s != null)
        if (s.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((e) => {
            this.quill.scroll.query(e, $.INLINE) != null && this.quill.format(e, !1, O.sources.USER);
          });
        } else
          this.quill.removeFormat(s.index, s.length, O.sources.USER);
    },
    direction(s) {
      const {
        align: t
      } = this.quill.getFormat();
      s === "rtl" && t == null ? this.quill.format("align", "right", O.sources.USER) : !s && t === "right" && this.quill.format("align", !1, O.sources.USER), this.quill.format("direction", s, O.sources.USER);
    },
    indent(s) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t), n = parseInt(e.indent || 0, 10);
      if (s === "+1" || s === "-1") {
        let i = s === "+1" ? 1 : -1;
        e.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, O.sources.USER);
      }
    },
    link(s) {
      s === !0 && (s = prompt("Enter link URL:")), this.quill.format("link", s, O.sources.USER);
    },
    list(s) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t);
      s === "check" ? e.list === "checked" || e.list === "unchecked" ? this.quill.format("list", !1, O.sources.USER) : this.quill.format("list", "unchecked", O.sources.USER) : this.quill.format("list", s, O.sources.USER);
    }
  }
};
const JE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', tT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', eT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', sT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', nT = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', iT = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', rT = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', oT = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', lu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', aT = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', lT = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', cT = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', uT = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', hT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', dT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', fT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', pT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', gT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', mT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', bT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', yT = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', _T = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', vT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', ET = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', TT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', AT = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', wT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', NT = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', OT = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', CT = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', ST = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', LT = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', xT = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', mi = {
  align: {
    "": JE,
    center: tT,
    right: eT,
    justify: sT
  },
  background: nT,
  blockquote: iT,
  bold: rT,
  clean: oT,
  code: lu,
  "code-block": lu,
  color: aT,
  direction: {
    "": lT,
    rtl: cT
  },
  formula: uT,
  header: {
    1: hT,
    2: dT,
    3: fT,
    4: pT,
    5: gT,
    6: mT
  },
  italic: bT,
  image: yT,
  indent: {
    "+1": _T,
    "-1": vT
  },
  link: ET,
  list: {
    bullet: TT,
    check: AT,
    ordered: wT
  },
  script: {
    sub: NT,
    super: OT
  },
  strike: CT,
  table: ST,
  underline: LT,
  video: xT
}, kT = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let cu = 0;
function uu(s, t) {
  s.setAttribute(t, `${s.getAttribute(t) !== "true"}`);
}
class jr {
  constructor(t) {
    this.select = t, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    }), this.label.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape(), e.preventDefault();
          break;
      }
    }), this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded"), uu(this.label, "aria-expanded"), uu(this.options, "aria-hidden");
  }
  buildItem(t) {
    const e = document.createElement("span");
    e.tabIndex = "0", e.setAttribute("role", "button"), e.classList.add("ql-picker-item");
    const n = t.getAttribute("value");
    return n && e.setAttribute("data-value", n), t.textContent && e.setAttribute("data-label", t.textContent), e.addEventListener("click", () => {
      this.selectItem(e, !0);
    }), e.addEventListener("keydown", (i) => {
      switch (i.key) {
        case "Enter":
          this.selectItem(e, !0), i.preventDefault();
          break;
        case "Escape":
          this.escape(), i.preventDefault();
          break;
      }
    }), e;
  }
  buildLabel() {
    const t = document.createElement("span");
    return t.classList.add("ql-picker-label"), t.innerHTML = kT, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${cu}`, cu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
      const n = this.buildItem(e);
      t.appendChild(n), e.selected === !0 && this.selectItem(n);
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const n = this.container.querySelector(".ql-selected");
    t !== n && (n != null && n.classList.remove("ql-selected"), t != null && (t.classList.add("ql-selected"), this.select.selectedIndex = Array.from(t.parentNode.children).indexOf(t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e && (this.select.dispatchEvent(new Event("change")), this.close())));
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
    const e = t != null && t !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", e);
  }
}
class Ed extends jr {
  constructor(t, e) {
    super(t), this.label.innerHTML = e, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((n) => {
      n.classList.add("ql-primary");
    });
  }
  buildItem(t) {
    const e = super.buildItem(t);
    return e.style.backgroundColor = t.getAttribute("value") || "", e;
  }
  selectItem(t, e) {
    super.selectItem(t, e);
    const n = this.label.querySelector(".ql-color-label"), i = t && t.getAttribute("data-value") || "";
    n && (n.tagName === "line" ? n.style.stroke = i : n.style.fill = i);
  }
}
class Td extends jr {
  constructor(t, e) {
    super(t), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((n) => {
      n.innerHTML = e[n.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(t, e) {
    super.selectItem(t, e);
    const n = t || this.defaultItem;
    if (n != null) {
      if (this.label.innerHTML === n.innerHTML) return;
      this.label.innerHTML = n.innerHTML;
    }
  }
}
const IT = (s) => {
  const {
    overflowY: t
  } = getComputedStyle(s, null);
  return t !== "visible" && t !== "clip";
};
class Ad {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, IT(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(t) {
    const e = t.left + t.width / 2 - this.root.offsetWidth / 2, n = t.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${e}px`, this.root.style.top = `${n}px`, this.root.classList.remove("ql-flip");
    const i = this.boundsContainer.getBoundingClientRect(), r = this.root.getBoundingClientRect();
    let o = 0;
    if (r.right > i.right && (o = i.right - r.right, this.root.style.left = `${e + o}px`), r.left < i.left && (o = i.left - r.left, this.root.style.left = `${e + o}px`), r.bottom > i.bottom) {
      const c = r.bottom - r.top, a = t.bottom - t.top + c;
      this.root.style.top = `${n - a}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const RT = [!1, "center", "right", "justify"], DT = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], MT = [!1, "serif", "monospace"], qT = ["1", "2", "3", !1], BT = ["small", !1, "large", "huge"];
class Si extends Nn {
  constructor(t, e) {
    super(t, e);
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
    const e = super.addModule(t);
    return t === "toolbar" && this.extendToolbar(e), e;
  }
  buildButtons(t, e) {
    Array.from(t).forEach((n) => {
      (n.getAttribute("class") || "").split(/\s+/).forEach((r) => {
        if (r.startsWith("ql-") && (r = r.slice(3), e[r] != null))
          if (r === "direction")
            n.innerHTML = e[r][""] + e[r].rtl;
          else if (typeof e[r] == "string")
            n.innerHTML = e[r];
          else {
            const o = n.value || "";
            o != null && e[r][o] && (n.innerHTML = e[r][o]);
          }
      });
    });
  }
  buildPickers(t, e) {
    this.pickers = Array.from(t).map((i) => {
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && Jn(i, RT), typeof e.align == "object"))
        return new Td(i, e.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && Jn(i, DT, r === "background" ? "#ffffff" : "#000000"), new Ed(i, e[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? Jn(i, MT) : i.classList.contains("ql-header") ? Jn(i, qT) : i.classList.contains("ql-size") && Jn(i, BT)), new jr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(q.events.EDITOR_CHANGE, n);
  }
}
Si.DEFAULTS = Je({}, Nn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let s = this.container.querySelector("input.ql-image[type=file]");
          s == null && (s = document.createElement("input"), s.setAttribute("type", "file"), s.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), s.classList.add("ql-image"), s.addEventListener("change", () => {
            const t = this.quill.getSelection(!0);
            this.quill.uploader.upload(t, s.files), s.value = "";
          }), this.container.appendChild(s)), s.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class wd extends Ad {
  constructor(t, e) {
    super(t, e), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
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
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
    e != null ? this.textbox.value = e : t !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
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
          scrollTop: e
        } = this.quill.root;
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, q.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, q.sources.USER)), this.quill.root.scrollTop = e;
        break;
      }
      case "video":
        t = $T(t);
      case "formula": {
        if (!t) break;
        const e = this.quill.getSelection(!0);
        if (e != null) {
          const n = e.index + e.length;
          this.quill.insertEmbed(
            n,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            t,
            q.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", q.sources.USER), this.quill.setSelection(n + 2, q.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function $T(s) {
  let t = s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = s.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : s;
}
function Jn(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === e ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), s.appendChild(i);
  });
}
const PT = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Nd extends wd {
  constructor(t, e) {
    super(t, e), this.quill.on(q.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === q.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === q.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const c = this.quill.getLines(i.index, i.length);
          if (c.length === 1) {
            const a = this.quill.getBounds(i);
            a != null && this.position(a);
          } else {
            const a = c[c.length - 1], l = this.quill.getIndex(a), h = Math.min(a.length() - 1, i.index + i.length - l), f = this.quill.getBounds(new Rs(l, h));
            f != null && this.position(f);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(q.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const t = this.quill.getSelection();
        if (t != null) {
          const e = this.quill.getBounds(t);
          e != null && this.position(e);
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(t) {
    const e = super.position(t), n = this.root.querySelector(".ql-tooltip-arrow");
    return n.style.marginLeft = "", e !== 0 && (n.style.marginLeft = `${-1 * e - n.offsetWidth / 2}px`), e;
  }
}
M(Nd, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Od extends Si {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = PT), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Nd(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), mi), this.buildPickers(t.container.querySelectorAll("select"), mi));
  }
}
Od.DEFAULTS = Je({}, Si.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(s) {
          s ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, O.sources.USER);
        }
      }
    }
  }
});
const jT = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Cd extends wd {
  constructor() {
    super(...arguments);
    M(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
      if (this.linkRange != null) {
        const n = this.linkRange;
        this.restoreFocus(), this.quill.formatText(n, "link", !1, q.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(q.events.SELECTION_CHANGE, (e, n, i) => {
      if (e != null) {
        if (e.length === 0 && i === q.sources.USER) {
          const [r, o] = this.quill.scroll.descendant(Qe, e.index);
          if (r != null) {
            this.linkRange = new Rs(e.index - o, r.length());
            const c = Qe.formats(r.domNode);
            this.preview.textContent = c, this.preview.setAttribute("href", c), this.show();
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
M(Cd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Sd extends Si {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = jT), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), mi), this.buildPickers(t.container.querySelectorAll("select"), mi), this.tooltip = new Cd(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Sd.DEFAULTS = Je({}, Si.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(s) {
          if (s) {
            const t = this.quill.getSelection();
            if (t == null || t.length === 0) return;
            let e = this.quill.getText(t);
            /^\S+@\S+\.\S+$/.test(e) && e.indexOf("mailto:") !== 0 && (e = `mailto:${e}`);
            const {
              tooltip: n
            } = this.quill.theme;
            n.edit("link", e);
          } else
            this.quill.format("link", !1, O.sources.USER);
        }
      }
    }
  }
});
O.register({
  "attributors/attribute/direction": ad,
  "attributors/class/align": id,
  "attributors/class/background": iE,
  "attributors/class/color": nE,
  "attributors/class/direction": ld,
  "attributors/class/font": hd,
  "attributors/class/size": fd,
  "attributors/style/align": rd,
  "attributors/style/background": _l,
  "attributors/style/color": yl,
  "attributors/style/direction": cd,
  "attributors/style/font": dd,
  "attributors/style/size": pd
}, !0);
O.register({
  "formats/align": id,
  "formats/direction": ld,
  "formats/indent": GE,
  "formats/background": _l,
  "formats/color": yl,
  "formats/font": hd,
  "formats/size": fd,
  "formats/blockquote": Sa,
  "formats/code-block": _t,
  "formats/header": La,
  "formats/list": Ci,
  "formats/bold": gi,
  "formats/code": vl,
  "formats/italic": xa,
  "formats/link": Qe,
  "formats/script": ka,
  "formats/strike": Ia,
  "formats/underline": Ra,
  "formats/formula": lr,
  "formats/image": Da,
  "formats/video": cr,
  "modules/syntax": vd,
  "modules/table": XE,
  "modules/toolbar": Nl,
  "themes/bubble": Od,
  "themes/snow": Sd,
  "ui/icons": mi,
  "ui/picker": jr,
  "ui/icon-picker": Td,
  "ui/color-picker": Ed,
  "ui/tooltip": Ad
}, !0);
const kn = (s, t) => {
  const e = s.__vccOpts || s;
  for (const [n, i] of t)
    e[n] = i;
  return e;
}, UT = {
  props: ["modelValue"],
  mounted() {
    this.initQuillEditor();
  },
  watch: {
    modelValue(s) {
      s || (s = ""), this.quill.root.innerHTML != s && (this.quill.root.innerHTML = s);
    }
  },
  methods: {
    initQuillEditor() {
      this.quill = new O(this.$refs.editor, {
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
}, VT = UT, FT = { class: "ql-editor-container" }, HT = {
  class: "",
  ref: "editor"
};
function WT(s, t, e, n, i, r) {
  return y(), _("div", FT, [
    m("div", HT, null, 512)
  ]);
}
const zT = /* @__PURE__ */ kn(VT, [["render", WT], ["__scopeId", "data-v-443c4edc"]]), KT = {
  props: {
    modelValue: Array,
    params: Object
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
    let s = Math.round(Math.random() * 1e5);
    this.uploadId = "image_upload_" + s;
  },
  mounted() {
    this.editfile = this.modelValue, this.editfile || (this.editfile = []);
  },
  watch: {
    modelValue(s) {
      s == null ? this.reset() : this.files = s;
    }
  },
  methods: {
    round(s) {
      return s < 1024 ? s + " Byte" : s < 1048576 ? (s / 1024).toFixed(0) + " KB" : s < 1073741824 ? (s / 1048576).toFixed(2) + " MB" : (s / 1073741824).toFixed(2) + " GB";
    },
    extension(s) {
      return s.split(".").reverse()[0];
    },
    detect(s) {
      s.bytes = 0, s.types = {}, s.title = s.name.split(".").slice(0, -1).join("."), s.original = {
        size: s.size,
        type: s.type,
        modified: s.lastModified,
        name: s.name
      };
    },
    async createThumbnail(s, t) {
      const e = document.createElement("video"), n = new FileReader();
      n.onload = (i) => {
        e.src = i.target.result, e.addEventListener("loadeddata", () => {
          e.currentTime = e.duration * Math.random(), s.video = e;
        }), e.addEventListener("seeked", () => {
          this.forEachPresets(s, e), s.loaded = !0, this.bytes += s.bytes;
        });
      }, n.readAsDataURL(s);
    },
    seekRandom(s) {
      s.video && (s.video.currentTime = s.video.duration * Math.random());
    },
    async handleFileChange(s) {
      this.uploadEvent = s, this.count = this.files ? this.files.length : 0, this.wait = !0;
      let t = ["video/mpeg", "video/mp4"];
      for (let e of s.target.files)
        this.count++, this.count <= this.params.limit && (this.files.push(e), this.detect(e), t.indexOf(e.type) >= 0 ? await this.createThumbnail(e) : await this.resizeImage(e));
      this.$emit("update:modelValue", this.files), this.wait = !1, this.uploadEvent.target.value = "";
    },
    forEachPresets(s, t, e) {
      const n = document.createElement("canvas"), i = n.getContext("2d");
      let r = !!t.videoWidth, o, c;
      r ? (o = t.videoWidth, c = t.videoHeight) : (o = t.width, c = t.height), s.original.width = o, s.original.height = c, s.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32);
      for (let a in this.params.presets) {
        let l = this.params.presets[a];
        l.key = a, o > l.width && (c = Math.round(c * (l.width / o)), o = l.width), c > l.height && (o = Math.round(o * (l.height / c)), c = l.height), n.width = o, n.height = c, i.drawImage(t, 0, 0, o, c), s.types[l.key] = {
          width: o,
          height: c,
          convert: l.convert ? l.convert : s.type,
          quality: l.quality ? l.quality : 0.75
        }, s.types[l.key].slug = cc(s.title) + "-" + l.width + "x" + l.height + "-" + s.uid, s.types[l.key].data = n.toDataURL(
          s.types[l.key].convert,
          s.types[l.key].quality
        ), s.types[l.key].extension = this.getExtension(
          s.types[l.key].convert
        ), s.types[l.key].bytes = Math.round(
          s.types[l.key].data.length / 1.31
        ), s.bytes += s.types[l.key].bytes, e && e(l, s);
      }
    },
    async resizeImage(s) {
      const t = await this.fileToBlob(s), e = await createImageBitmap(t);
      this.forEachPresets(s, e), s.loaded = !0, this.bytes += s.bytes;
    },
    fileToBlob(s) {
      return new Promise((t) => {
        const e = new FileReader();
        e.onload = (n) => {
          t(new Blob([n.target.result], { type: s.type }));
        }, e.readAsArrayBuffer(s);
      });
    },
    slug(s) {
      let t = this.files[s];
      for (let e in t.types) {
        let n = t.types[e], i = this.params.presets[e];
        n.slug = cc(t.title) + "-" + i.width + "x" + i.height;
      }
    },
    download(s, t) {
      let e = this.files[s].types[t.download], n = document.createElement("a");
      n.href = e.url, n.download = e.slug + "." + e.extension, n.click();
    },
    remove(s) {
      confirm("Are you sure you want to remove?") && (this.bytes -= this.files[s].bytes, this.files.splice(s, 1), this.count = this.files.length);
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
    getExtension(s) {
      return {
        "image/webp": "webp",
        "image/jpeg": "jpg",
        "image/png": "png"
      }[s];
    }
  }
}, GT = KT, YT = { class: "" }, XT = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, ZT = { class: "row" }, QT = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, JT = { class: "badge bg-dark text-light fw-light mx-1" }, tA = { class: "badge bg-dark text-light fw-light mx-1" }, eA = ["src"], sA = { class: "row g-1" }, nA = { class: "col-md-6" }, iA = { class: "col-md-6" }, rA = { class: "col-md-6" }, oA = ["href"], aA = {
  key: 1,
  class: "row g-1"
}, lA = { class: "vsa-image-container border border-secondary rounded p-2 h-100 position-relative" }, cA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center"
}, uA = { class: "vsa-image-info position-absolute start-0 bottom-0 end-0 p-2 text-center text-light" }, hA = {
  key: 0,
  class: "badge bg-warning text-dark m-1"
}, dA = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, fA = { class: "badge bg-dark text-light fw-light mx-1" }, pA = { class: "badge bg-dark text-light fw-light mx-1" }, gA = { class: "bg-dark text-light rounded p-0 px-2 mb-1" }, mA = { class: "text-center mt-2" }, bA = ["onClick"], yA = ["onClick"], _A = ["href"], vA = ["onClick"], EA = ["onClick"], TA = {
  key: 0,
  class: "bi bi-film"
}, AA = {
  key: 1,
  class: "bi bi-image"
}, wA = { class: "text-light fw-light text-nowrap" }, NA = { class: "vsa-image-frame w-100 text-center" }, OA = ["src", "alt"], CA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, SA = { class: "row g-1" }, LA = { class: "col-12" }, xA = { class: "border border-secondary rounded p-2 h-100" }, kA = ["for"], IA = { class: "fw-light" }, RA = {
  key: 0,
  class: "fs-4"
}, DA = {
  key: 1,
  class: "fs-6 text-warning"
}, MA = { class: "col-12" }, qA = { class: "border border-secondary rounded p-2 h-100" }, BA = { class: "text-center h-100 w-100 d-flex align-items-center justify-content-center" }, $A = { class: "fw-light" }, PA = {
  key: 0,
  class: "mt-1"
}, jA = { class: "badge bg-dark border border-secondary text-info mx-1" }, UA = { class: "badge bg-dark border border-secondary text-info mx-1" }, VA = {
  key: 0,
  class: "badge bg-dark border border-secondary text-info mx-1"
}, FA = {
  key: 1,
  class: "mt-1"
}, HA = { key: 2 }, WA = { class: "badge bg-dark border border-secondary text-info mx-1" }, zA = { class: "badge bg-dark border border-secondary text-info mx-1" }, KA = { class: "badge bg-dark border border-secondary text-info mx-1" }, GA = ["id", "accept"];
function YA(s, t, e, n, i, r) {
  return y(), _("div", YT, [
    m("div", {
      class: D(["vsa-upload", { wait: s.wait }])
    }, [
      s.editfile && s.editfile.presets ? (y(), _("div", XT, [
        m("div", ZT, [
          (y(!0), _(W, null, z(s.editfile.types, (o, c) => (y(), _("div", {
            class: "col-md-3",
            key: c
          }, [
            m("span", QT, x(o.convert.replace(/.*\//, "")), 1),
            m("span", JT, x(o.width) + " x " + x(o.height), 1),
            m("span", tA, "~" + x(this.round(o.bytes)), 1),
            o ? (y(), _("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, eA)) : C("", !0)
          ]))), 128))
        ]),
        X(m("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o),
          onChange: t[1] || (t[1] = (o) => s.slug(s.index))
        }, null, 544), [
          [pe, s.editfile.title]
        ]),
        m("div", sA, [
          m("div", nA, [
            m("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          m("div", iA, [
            m("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          m("div", rA, [
            s.type && !s.type.url ? (y(), _("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[4] || (t[4] = (o) => s.download(s.index, s.params))
            }, " Download ")) : C("", !0),
            s.type && s.type.url ? (y(), _("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: s.type.url
            }, " Download ", 8, oA)) : C("", !0)
          ])
        ])
      ])) : C("", !0),
      s.files && s.files.length ? (y(), _("div", aA, [
        (y(!0), _(W, null, z(s.files, (o, c) => (y(), _("div", {
          class: "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3",
          key: c
        }, [
          m("div", lA, [
            o.types && o.types[s.params.thumbnail] ? (y(), _("div", cA, [
              m("div", uA, [
                t[10] || (t[10] = Y(" {# ")),
                o.resized ? (y(), _("span", hA, "resized")) : C("", !0),
                t[11] || (t[11] = Y(" #} {# ")),
                (y(!0), _(W, null, z(o.types, (a, l) => (y(), _("div", {
                  class: "",
                  key: l
                }, [
                  m("span", dA, x(a.convert.replace("image/", "")), 1),
                  m("span", fA, x(a.width) + " x " + x(a.height), 1),
                  m("span", pA, "~" + x(this.round(a.bytes)), 1)
                ]))), 128)),
                t[12] || (t[12] = Y(" #} ")),
                m("strong", gA, "#" + x(c + 1), 1),
                m("div", mA, [
                  m("button", {
                    title: "Delete the image",
                    type: "button",
                    class: "btn btn-sm btn-outline-danger mx-1 d-inline-block",
                    onClick: (a) => s.remove(c)
                  }, t[7] || (t[7] = [
                    m("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, bA),
                  o && o.types && o.uploaded ? (y(), _("button", {
                    key: 0,
                    title: "Download the image",
                    type: "button",
                    class: "btn btn-sm btn-outline-light mx-1",
                    onClick: (a) => s.download(c, s.params)
                  }, t[8] || (t[8] = [
                    m("i", { class: "bi bi-download" }, null, -1)
                  ]), 8, yA)) : C("", !0),
                  o && o.types && o.uploaded ? (y(), _("a", {
                    key: 1,
                    title: "Open in new tab",
                    class: "btn btn-sm btn-outline-light mx-1",
                    target: "_blank",
                    href: o.types[s.params.download].url ? o.types[s.params.download].url : o.types[s.params.download].data
                  }, t[9] || (t[9] = [
                    m("i", { class: "bi bi-box-arrow-up-right" }, null, -1)
                  ]), 8, _A)) : C("", !0),
                  o.video && !o.uploaded ? (y(), _("button", {
                    key: 2,
                    type: "button",
                    class: "btn btn-sm btn-outline-warning mx-1",
                    onClick: (a) => s.seekRandom(o)
                  }, " Seek ", 8, vA)) : C("", !0),
                  s.params.editor ? (y(), _("button", {
                    key: 3,
                    type: "button",
                    class: "btn btn-sm btn-outline-warning mx-1",
                    onClick: (a) => s.editfile = o
                  }, [
                    o.video ? (y(), _("i", TA)) : (y(), _("i", AA))
                  ], 8, EA)) : C("", !0)
                ]),
                m("div", wA, x(o.title), 1)
              ]),
              m("div", NA, [
                m("img", {
                  class: "img-fluid rounded",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, OA)
              ])
            ])) : (y(), _("div", CA, t[13] || (t[13] = [
              m("span", null, null, -1)
            ])))
          ])
        ]))), 128))
      ])) : C("", !0),
      m("div", SA, [
        m("div", LA, [
          m("div", xA, [
            m("label", {
              for: s.uploadId,
              class: D([{ disabled: s.files && s.params.limit <= s.files.length }, "btn btn-dark cursor-pointer h-100 w-100 d-flex align-items-center justify-content-center"])
            }, [
              m("span", null, [
                t[14] || (t[14] = m("span", { class: "display-3 d-block" }, "+", -1)),
                m("small", IA, [
                  s.files && s.params.limit > s.files.length ? (y(), _("div", RA, x(s.params.text), 1)) : (y(), _("div", DA, " You have reached the number of files you can upload "))
                ])
              ])
            ], 10, kA)
          ])
        ]),
        m("div", MA, [
          m("div", qA, [
            m("div", BA, [
              m("small", $A, [
                s.params.limit ? (y(), _("div", PA, [
                  t[15] || (t[15] = Y(" uploaded ")),
                  m("span", jA, x(s.files.length), 1),
                  t[16] || (t[16] = Y(" / ")),
                  m("span", UA, x(s.params.limit), 1),
                  this.bytes ? (y(), _("span", VA, "~" + x(this.round(this.bytes)), 1)) : C("", !0)
                ])) : C("", !0),
                s.params.accept ? (y(), _("div", FA, [
                  t[17] || (t[17] = Y(" accept only ")),
                  (y(!0), _(W, null, z(s.params.accept, (o) => (y(), _("span", {
                    class: "badge bg-dark border border-secondary text-info mx-1",
                    key: o
                  }, x(o.replace(/.*\//, "")), 1))), 128))
                ])) : C("", !0),
                s.params.presets ? (y(), _("div", HA, [
                  (y(!0), _(W, null, z(s.params.presets, (o, c) => (y(), _("div", {
                    class: "mt-1",
                    key: c
                  }, [
                    t[18] || (t[18] = Y(" preset ")),
                    m("span", WA, x(c), 1),
                    m("span", zA, x(o.width) + " x " + x(o.height), 1),
                    m("span", KA, x(o.convert.replace(/.*\//, "")), 1)
                  ]))), 128))
                ])) : C("", !0),
                s.files.length ? (y(), _("button", {
                  key: 3,
                  type: "button",
                  class: "btn btn-sm btn-danger mt-2 p-0 px-3",
                  onClick: t[5] || (t[5] = (...o) => s.resetConfirm && s.resetConfirm(...o))
                }, " remove all images ")) : C("", !0)
              ])
            ])
          ])
        ])
      ]),
      s.uploadId ? (y(), _("input", {
        key: 2,
        multiple: "",
        style: { opacity: "0", height: "1px", width: "1px" },
        id: s.uploadId,
        type: "file",
        accept: s.params.accept.join(","),
        onChange: t[6] || (t[6] = (...o) => s.handleFileChange && s.handleFileChange(...o))
      }, null, 40, GA)) : C("", !0)
    ], 2)
  ]);
}
const XA = /* @__PURE__ */ kn(GT, [["render", YA], ["__scopeId", "data-v-044c76f0"]]), ZA = {
  props: {
    modelValue: Object,
    group: Object,
    formid: String,
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
    modelValue(s) {
      this.item = this.modelValue;
    }
  },
  methods: {
    getValueOrFunction(s, t) {
      return ph(s, t);
    },
    translate(s, t, e) {
      return Ja(s, this.settings.translate, t, e || this.settings.language);
    },
    selectOptions(s, t) {
      return typeof s == "function" ? s(this.item, t, this) : s;
    },
    renderOptions(s, t, e) {
      let n = [];
      if (!s || !s.length)
        return [];
      for (let i of s)
        n.push({
          value: i[t],
          label: i[e] ? i[e] : i[t]
        });
      return n;
    },
    arrayAddNewItem(s, t) {
      (!t[s.name] || typeof t[s.name] != "object") && (t[s.name] = []);
      let e = {};
      for (let n in s.elements) {
        let i = s.elements[n];
        e[n] = i.value, i.value = void 0;
      }
      t[s.name].push(e);
    },
    arrayRemoveItem(s, t) {
      s.splice(t, 1);
    },
    arrayItemMoveUp(s, t) {
      Fb(s, t);
    },
    arrayItemMoveDown(s, t) {
      Hb(s, t);
    },
    insertAddress(s) {
      this.item[s] || (this.item[s] = []), this.item[s].push({
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
    HtmlEditor: zT,
    ImageUpload: XA
  }
}, QA = ZA, JA = { class: "row m-1" }, tw = { class: "form-row-title mb-4 fw-lighter" }, ew = {
  key: 0,
  class: "row"
}, sw = { class: "form-group pb-3" }, nw = { key: 0 }, iw = {
  key: 0,
  class: "badge text-secondary fw-light"
}, rw = ["for", "innerHTML"], ow = { class: "input-group" }, aw = ["innerHTML"], lw = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], cw = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], uw = ["name", "id", "onUpdate:modelValue", "readonly", "required"], hw = {
  key: 4,
  class: "form-check"
}, dw = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "readonly", "required"], fw = ["for"], pw = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], gw = ["name", "id", "onUpdate:modelValue", "readonly", "required"], mw = ["value"], bw = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], yw = ["innerHTML"], _w = { key: 3 }, vw = ["type", "required", "placeholder", "onUpdate:modelValue"], Ew = { class: "col-2 text-nowrap text-end" }, Tw = ["onClick"], Aw = ["onClick"], ww = ["onClick"], Nw = { key: 0 }, Ow = { class: "row g-1 d-flex align-items-center justify-content-between" }, Cw = ["type", "placeholder", "onUpdate:modelValue"], Sw = { class: "col-2" }, Lw = ["onClick"], xw = { key: 4 }, kw = { key: 0 }, Iw = ["for"], Rw = ["name", "id", "onUpdate:modelValue"], Dw = ["onClick"], Mw = {
  key: 5,
  class: "p-1"
}, qw = ["innerHTML"];
function Bw(s, t, e, n, i, r) {
  const o = ai("HtmlEditor"), c = ai("ImageUpload");
  return y(), _("div", JA, [
    (y(!0), _(W, null, z(s.settings.form.groups, (a) => (y(), _("div", {
      key: a,
      class: D([a.class ? a.class : "col-md-12"])
    }, [
      m("h2", tw, x(a.title), 1),
      s.item && a.fields ? (y(), _("div", ew, [
        (y(!0), _(W, null, z(a.fields, (l) => (y(), _("div", {
          class: D([l.class ? l.class : "col-md-12", "input_type_" + l.type]),
          key: l
        }, [
          m("div", sw, [
            l.label !== null ? (y(), _("span", nw, [
              ["html", "image"].indexOf(l.type) >= 0 ? (y(), _("label", {
                key: 0,
                class: D([{ required: l.required }, "form-label text-secondary mb-1"])
              }, [
                Y(x(l.label ? l.label : s.translate(l.name)) + " ", 1),
                l.maxlength ? (y(), _("span", iw, x(s.item[l.name] ? s.item[l.name].length : 0) + " / " + x(l.maxlength), 1)) : C("", !0)
              ], 2)) : (y(), _("label", {
                key: 1,
                class: D([{ required: l.required }, "form-label text-secondary mb-1"]),
                for: s.formid + "_" + l.name,
                innerHTML: s.getValueOrFunction(l.label ? l.label : s.translate(l.name), { field: l, item: s.item })
              }, null, 10, rw))
            ])) : C("", !0),
            m("div", ow, [
              l.prefix ? (y(), _("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: l.prefix
              }, null, 8, aw)) : C("", !0),
              l.type == "text" ? X((y(), _("input", {
                key: 1,
                class: D(["form-control", [l.class]]),
                type: "text",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, lw)), [
                [pe, s.item[l.name]]
              ]) : C("", !0),
              l.type == "number" ? X((y(), _("input", {
                key: 2,
                class: D(["form-control", [l.class]]),
                type: "number",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                min: l.min,
                max: l.max,
                step: l.step,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, cw)), [
                [pe, s.item[l.name]]
              ]) : C("", !0),
              l.type == "date" ? X((y(), _("input", {
                key: 3,
                class: D(["form-control", [l.class]]),
                type: "date",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                readonly: l.readonly,
                required: l.required
              }, null, 10, uw)), [
                [pe, s.item[l.name]]
              ]) : C("", !0),
              l.type == "checkbox" ? (y(), _("div", hw, [
                X(m("input", {
                  class: D(["form-check-input", [l.class]]),
                  type: "checkbox",
                  name: l.name,
                  id: s.formid + "_" + l.name,
                  "true-value": l.true != null ? l.true : !0,
                  "false-value": l.false != null ? l.false : !1,
                  "onUpdate:modelValue": (h) => s.item[l.name] = h,
                  readonly: l.readonly,
                  required: l.required
                }, null, 10, dw), [
                  [kd, s.item[l.name]]
                ]),
                m("label", {
                  class: "form-check-label cursor-pointer",
                  for: s.formid + "_" + l.name
                }, x(l.checkbox), 9, fw)
              ])) : C("", !0),
              l.type == "email" ? X((y(), _("input", {
                key: 5,
                autocomplete: "on",
                class: D(["form-control", [l.class]]),
                type: "email",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, pw)), [
                [pe, s.item[l.name]]
              ]) : C("", !0),
              l.type == "select" ? X((y(), _("select", {
                key: 6,
                class: D(["form-select", [l.class]]),
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                readonly: l.readonly,
                required: l.required
              }, [
                (y(!0), _(W, null, z(s.selectOptions(l.options, l), (h) => (y(), _("option", {
                  class: "",
                  key: h,
                  value: h.value
                }, x(h.label ? h.label : h.value), 9, mw))), 128))
              ], 10, gw)), [
                [Ie, s.item[l.name]]
              ]) : C("", !0),
              l.type == "textarea" ? X((y(), _("textarea", {
                key: 7,
                class: D(["form-control", [l.class]]),
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                rows: l.rows,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, "              ", 10, bw)), [
                [pe, s.item[l.name]]
              ]) : C("", !0),
              l.suffix ? (y(), _("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: l.suffix
              }, null, 8, yw)) : C("", !0)
            ]),
            l.type == "html" ? (y(), ea(o, {
              key: 1,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: D([l.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : C("", !0),
            l.type == "image" ? (y(), ea(c, {
              key: 2,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: D([l.class]),
              params: l.params
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "params"])) : C("", !0),
            l.type == "list" ? (y(), _("div", _w, [
              (y(!0), _(W, null, z(s.item[l.name], (h, f) => (y(), _("div", {
                class: "row g-1 d-flex align-items-center justify-content-between mb-1",
                key: f
              }, [
                (y(!0), _(W, null, z(h, (p, g) => (y(), _("div", {
                  key: g,
                  class: D(l.elements[g].class || "col")
                }, [
                  X(m("input", {
                    type: l.elements[g].type,
                    required: l.elements[g].required,
                    placeholder: l.elements[g].placeholder || g,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (v) => s.item[l.name][f][g] = v
                  }, null, 8, vw), [
                    [hn, s.item[l.name][f][g]]
                  ])
                ], 2))), 128)),
                m("div", Ew, [
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (p) => s.arrayItemMoveUp(s.item[l.name], f)
                  }, t[0] || (t[0] = [
                    m("i", { class: "bi bi-arrow-up" }, null, -1)
                  ]), 8, Tw),
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (p) => s.arrayItemMoveDown(s.item[l.name], f + 1)
                  }, t[1] || (t[1] = [
                    m("i", { class: "bi bi-arrow-down" }, null, -1)
                  ]), 8, Aw),
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-danger p-1 me-1",
                    onClick: (p) => s.arrayRemoveItem(s.item[l.name], f)
                  }, t[2] || (t[2] = [
                    m("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, ww)
                ])
              ]))), 128)),
              s.item[l.name] && s.item[l.name].length ? (y(), _("hr", Nw)) : C("", !0),
              m("div", Ow, [
                (y(!0), _(W, null, z(l.elements, (h) => (y(), _("div", {
                  key: h,
                  class: D(h.class || "col")
                }, [
                  X(m("input", {
                    type: h.type,
                    placeholder: h.placeholder || h.name,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (f) => h.value = f
                  }, null, 8, Cw), [
                    [hn, h.value]
                  ])
                ], 2))), 128)),
                m("div", Sw, [
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-primary my-1 w-100",
                    onClick: (h) => s.arrayAddNewItem(l, s.item)
                  }, t[3] || (t[3] = [
                    m("i", { class: "bi bi-plus" }, null, -1)
                  ]), 8, Lw)
                ])
              ])
            ])) : C("", !0),
            l.type == "addresses" ? (y(), _("span", xw, [
              s.item[l.name] ? (y(), _("div", kw, [
                (y(!0), _(W, null, z(s.item[l.name], (h) => (y(), _("div", { key: h }, [
                  Y(x(h) + " ", 1),
                  m("label", {
                    class: "form-label text-secondary mb-1",
                    for: s.formid + "_" + l.name
                  }, x(l.label), 9, Iw),
                  X(m("input", {
                    class: "form-control",
                    type: "text",
                    name: l.name,
                    id: s.formid + "_" + l.name,
                    "onUpdate:modelValue": (f) => h.country = f
                  }, null, 8, Rw), [
                    [pe, h.country]
                  ])
                ]))), 128))
              ])) : C("", !0),
              m("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (h) => s.insertAddress(l.name)
              }, " Add ", 8, Dw)
            ])) : C("", !0),
            l.description ? (y(), _("div", Mw, [
              m("i", {
                class: "text-muted",
                innerHTML: l.description
              }, null, 8, qw)
            ])) : C("", !0)
          ])
        ], 2))), 128))
      ])) : C("", !0)
    ], 2))), 128))
  ]);
}
const $w = /* @__PURE__ */ kn(QA, [["render", Bw], ["__scopeId", "data-v-bdb006ae"]]), Pw = {
  name: "VuAdminTablePagination",
  emits: ["setPage", "setPageLimit", "translate"],
  props: {
    config: Object,
    settings: Object,
    ui: Object
  },
  methods: {
    setPage(s) {
      this.$emit("setPage", s);
    },
    setPageLimit(s) {
      this.$emit("setPageLimit", s);
    },
    translate(s, t, e) {
      return Ja(s, this.settings.translate, t, e || this.settings.language);
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
}, jw = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, Uw = { class: "dropdown d-inline-block m-1" }, Vw = {
  type: "button",
  class: "btn btn-sm btn-secondary dropdown-toggle",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, Fw = { class: "mx-1" }, Hw = { key: 0 }, Ww = { class: "dropdown-menu text-end" }, zw = ["onClick"], Kw = { class: "ms-2" }, Gw = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, Yw = {
  key: 1,
  class: "bi bi-circle ms-2"
}, Xw = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, Zw = { class: "pagination pagination-sm m-1" }, Qw = { class: "page-item" }, Jw = { "aria-hidden": "true" }, tN = { class: "page-item" }, eN = { "aria-hidden": "true" }, sN = ["onClick"], nN = { class: "page-item" }, iN = { "aria-hidden": "true" }, rN = { "aria-hidden": "true" }, oN = {
  key: 0,
  class: "page-item"
}, aN = { "aria-hidden": "true" };
function lN(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? C("", !0) : (y(), _("nav", jw, [
    m("div", null, [
      m("div", Uw, [
        m("button", Vw, [
          X(m("span", Fw, [
            m("strong", null, x(e.config.pagination.from) + "-" + x(e.config.pagination.to), 1),
            e.config.pagination.total ? (y(), _("span", Hw, " / " + x(e.config.pagination.total), 1)) : C("", !0)
          ], 512), [
            [ws, e.config.pagination.from > 0]
          ])
        ]),
        m("ul", Ww, [
          m("li", null, [
            (y(!0), _(W, null, z(e.config.pagination.limits, (o) => (y(), _("span", {
              class: D(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (c) => r.setPageLimit(o)
            }, [
              m("strong", null, x(o), 1),
              m("small", Kw, x(r.translate("row")) + "/" + x(r.translate("page")), 1),
              e.config.pagination.limit == o ? (y(), _("i", Gw)) : C("", !0),
              e.config.pagination.limit != o ? (y(), _("i", Yw)) : C("", !0)
            ], 10, zw))), 128))
          ])
        ])
      ]),
      X(m("div", Xw, t[4] || (t[4] = [
        m("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [ws, e.ui && e.ui.wait.table]
      ])
    ]),
    m("ul", Zw, [
      m("li", Qw, [
        m("a", {
          class: D(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          m("span", Jw, x(r.translate("First")), 1)
        ], 2)
      ]),
      m("li", tN, [
        m("a", {
          class: D(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{  translate('Prev')  }}"
        }, [
          m("span", eN, x(r.translate("Prev")), 1)
        ], 2)
      ]),
      (y(!0), _(W, null, z(e.config.pagination.numbers, (o) => (y(), _("li", {
        key: o,
        class: "page-item"
      }, [
        m("a", {
          class: D(["page-link cursor-pointer", {
            disabled: o > e.config.pagination.pages,
            current: o == e.config.pagination.page
          }]),
          onClick: (c) => r.setPage(o)
        }, x(o), 11, sN)
      ]))), 128)),
      m("li", nN, [
        m("a", {
          class: D(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          m("span", iN, [
            m("span", rN, x(r.translate("Next")), 1)
          ])
        ], 2)
      ]),
      e.config.pagination.total ? (y(), _("li", oN, [
        m("a", {
          class: D(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          m("span", aN, x(r.translate("Last")), 1)
        ], 2)
      ])) : C("", !0)
    ])
  ]));
}
const cN = /* @__PURE__ */ kn(Pw, [["render", lN], ["__scopeId", "data-v-5ba01873"]]), uN = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminFormGroup: $w,
    VuAdminTablePagination: cN
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
    let s = Math.round(Math.random() * 1e5);
    this.formId = "form_" + this.settings.entity + "_" + s, this.modalId = "modal_" + this.settings.entity + "_" + s, this.resetTable();
  },
  mounted() {
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new xs(this.modalElement);
  },
  methods: {
    tableWait(s) {
      this.ui.wait.table = !0, this.ui.block.table = s;
    },
    tableNoWait() {
      this.ui.wait.table = !1, this.ui.block.table = !1;
    },
    formWait(s) {
      this.ui.wait.form = !0, this.ui.block.form = s;
    },
    formNoWait() {
      this.ui.wait.form = !1, this.ui.block.form = !1;
    },
    countFilters() {
      return this.settings.table.columns.filter(
        (s) => s.filter && !s.hidden
      ).length;
    },
    resetTable() {
      this.settings.table.pagination && (this.config.pagination.limit = this.settings.table.pagination.limit), this.resetFilter(), this.resetOrder(!0);
    },
    resetFilter(s) {
      if (this.settings.table.columns) {
        for (let t of this.settings.table.columns)
          t.filter && (t.filter.value = t.filter.default_value !== void 0 ? t.filter.default_value : t.filter.multiple ? [] : void 0, t.filter.operator = t.filter.default_operator !== void 0 ? t.filter.default_operator : void 0);
        s && (this.reloadTable(), this.calcPage());
      }
    },
    resetOrder(s) {
      this.settings.table.order ? this.config.order = Object.assign({}, this.settings.table.order) : this.config.order = {}, s && (this.reloadTable(), this.calcPage());
    },
    reloadTable(s) {
      this.fetchTable(s);
    },
    createItem() {
      this.item = this.settings.form.default ? this.settings.form.default : {}, this.modalWindow.show(), setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },
    copyItem() {
      this.item[this.settings.pkey] = void 0, this.modalWindow.show(), setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },
    calcPage() {
      if (!(this.config.pagination.items === null || this.config.pagination.items === void 0)) {
        if (this.config.pagination.total !== null && this.config.pagination.total !== void 0 && (this.config.pagination.pages = Math.ceil(
          this.config.pagination.total / this.config.pagination.limit
        )), this.config.pagination.pages !== null) {
          let s = Math.floor((this.config.pagination.size - 1) / 2), t = this.config.pagination.page - s;
          this.config.pagination.page > this.config.pagination.pages && (this.config.pagination.page = this.config.pagination.pages), this.config.pagination.page < 1 && (this.config.pagination.page = 1), t + this.config.pagination.size > this.config.pagination.pages && (t = this.config.pagination.pages - this.config.pagination.size + 1), t < 1 && (t = 1), this.config.pagination.numbers = Array.from(
            { length: this.config.pagination.size },
            (e, n) => t + n
          );
        }
        this.config.pagination.from = this.config.pagination.skip + 1, this.config.pagination.to = this.config.pagination.skip + (this.config.pagination.items !== null ? this.config.pagination.items : this.config.pagination.limit);
      }
    },
    setPage(s, t) {
      t = t !== void 0 ? t : !0, s < 1 && (s = 1), this.config.pagination.pages !== null && this.config.pagination.pages !== void 0 && s > this.config.pagination.pages && (s = this.config.pagination.pages), this.config.pagination.skip = (s - 1) * this.config.pagination.limit, this.config.pagination.page != s && t && (this.config.pagination.page = s, this.reloadTable());
    },
    setPageLimit(s) {
      s != this.config.pagination.limit && (this.config.pagination.limit = s, this.setPage(1), this.calcPage(), this.reloadTable());
    },
    getValueOrFunction(s, t) {
      return ph(s, t, this.settings, this);
    },
    getButtonClassByAction(s) {
      switch (s) {
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
    getButtonIconClassByAction(s) {
      switch (s) {
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
    tableCellValue(s, t, e, n) {
      try {
        return s === void 0 || t === void 0 ? void 0 : n.value ? n.value(s, t, e, n) : t[s] !== void 0 || !s.includes(".") ? t[s] : s.split(".").reduce((i, r) => i && i[r], t);
      } catch (i) {
        return i.message;
      }
    },
    tableCellTemplate(s, t, e, n) {
      try {
        return typeof s == "string" ? s : s(t[n.name], t, e, n);
      } catch (i) {
        return i.message;
      }
    },
    tableAction(s, t, e, n) {
      n && n.stopPropagation();
      let i = s.action ? s.action : s.click ? s.click : null;
      if (i && typeof i != "string") {
        i(t, this);
        return;
      }
      switch (i) {
        case "TABLE_ROW_SELECT":
          this.toggleSelected(t[this.settings.pkey]);
          break;
        case "TABLE_ROW_DETAIL":
          this.toggleDetail(t[this.settings.pkey]);
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
          this.editItem(t);
          break;
        case "TABLE_ROW_SAVE":
          this.tableRowSave(t, s.params);
          break;
        case "FORM_SUBMIT":
          this.saveForm(t);
          break;
        case "___save":
          this.saveItem(
            t,
            () => {
              this.addTableMessage(
                this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${t[this.settings.pkey]} )</small>`,
                2500
              );
            },
            (r) => {
              this.addTableMessage(r.message, 3500, "danger");
            },
            s.params
          );
          break;
        case "FORM_CREATE":
          this.createItem(t, s.params);
          break;
        case "TABLE_ROW_DELETE":
        case "FORM_DELETE":
          this.deleteItem(t, s.params);
          break;
        case "TABLE_RELOAD":
          this.reloadTable(s.params);
          break;
        case "TABLE_EXPORT":
          this.exportTable(s.params);
          break;
      }
    },
    tableBulkAction(s, t, e, n) {
      if (n && n.stopPropagation(), s && typeof s != "string") {
        s(item, this);
        return;
      }
      switch (s) {
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
    isSortable(s) {
      return s.sortable === void 0 || s.sortable;
    },
    sortTable(s) {
      if (this.config.order[s.name] && this.config.order[s.name].fixed || !this.isSortable(s))
        return;
      this.config.order[s.name] === void 0 || this.config.order[s.name] === null ? this.config.order[s.name] = {
        dir: "ASC",
        idx: this.config.orderIndex++
      } : this.config.order[s.name].dir === "ASC" ? this.config.order[s.name] = {
        dir: "DESC",
        idx: this.config.orderIndex++
      } : delete this.config.order[s.name], Object.entries(this.config.order).sort(
        (e, n) => e[1].idx - n[1].idx
      ).forEach((e, n) => {
        e[1].idx = n;
      }), this.reloadTable();
    },
    getOrdersForFetch() {
      let s = [], t = !1;
      for (let e of Object.keys(this.config.order))
        t = !0, s[this.config.order[e].idx] = {
          key: e,
          dir: this.config.order[e].dir
        };
      return t ? s : null;
    },
    getFiltersForFetch() {
      let s = {}, t = !1;
      for (let e of this.settings.table.columns)
        e.filter && e.filter.value !== void 0 && (t = !0, s[e.name] = {
          type: e.filter.type,
          value: e.filter.onchange ? e.filter.onchange(e.filter) : e.filter.value,
          operator: e.filter.operator
        });
      return t ? s : null;
    },
    getRelationsForFetch() {
      let s = {};
      for (let t of this.settings.table.columns)
        t.relation && this.settings.relations[t.relation.entity] && (s[t.relation.entity] = Object.assign(
          {},
          this.settings.relations[t.relation.entity]
        ), s[t.relation.entity].columns = t.relation.columns);
      return s;
    },
    async fetchTable(s) {
      try {
        this.tableWait(!0), s = s || {}, s.filter = this.getFiltersForFetch(), s.order = this.getOrdersForFetch(), this.config.pagination.page !== null && this.config.pagination.page !== void 0 && (s.page = this.config.pagination.page), this.config.pagination.limit !== null && this.config.pagination.limit !== void 0 && (s.limit = this.config.pagination.limit), s.page && s.limit && (s.skip = (s.page - 1) * s.limit);
        let t = await this.fetchItems(this.settings, s, this.config);
        if (t === !1)
          return this.tableNoWait(), !1;
        let e = this.getRelationsForFetch();
        for (let n of Object.keys(e)) {
          e[n].ids = [];
          for (let i of t) {
            let r = i[e[n].local];
            r && e[n].ids.push(r);
          }
          e[n].ids = $b(e[n].ids), await this.fetchRelation(e[n], t);
        }
        this.items = t, this.tableNoWait();
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger"), this.tableNoWait();
      }
    },
    async fetchItems(s, t, e) {
      s.events && s.events.beforeItemsLoad && s.events.beforeItemsLoad(t, s);
      const n = await fetch(
        As("GET", s.table.api, null, t),
        Ts("GET", s.table.api)
      ), i = await Zn(n), r = this.getResponseErrors(n, i.data);
      if (r) {
        this.handleTableErrors(r);
        return;
      }
      if (i.error) {
        this.handleTableErrors(i.error);
        return;
      }
      s.events && s.events.afterItemsLoad && s.events.afterItemsLoad(i.data, n);
      let o;
      s.table.api.input.items ? o = typeof s.table.api.input.items == "string" ? i.data[s.table.api.input.items] : s.table.api.input.items(i.data, n) : o = i.data, e && (s.table.api.input.total ? e.pagination.total = typeof s.table.api.input.total == "string" ? i.data[s.table.api.input.total] : s.table.api.input.total(i.data, n) : i.data.total && (e.pagination.total = i.data.total), e.pagination.items = o.length, this.calcPage());
      let c = Db(o);
      return this.convertIn(s.table.columns, c), c;
    },
    async fetchRelation(s, t) {
      try {
        let e = {
          limit: 0,
          list: "select",
          columns: s.columns ? JSON.stringify(s.columns) : void 0
        };
        if (s.ids && s.ids.length) {
          let a = (typeof s.ids[0] == "string" ? "text" : "number") === "string" ? "'" + s.ids.join("','") + "'" : s.ids.join(","), l = {};
          l[s.foreign] = {
            type: "array",
            value: s.ids,
            operator: "IN"
          }, e.filter = JSON.stringify(l);
        }
        let n = window.VuEntities[s.entity];
        const i = await fetch(
          As("GET", n.api, null, e),
          Ts("GET", n.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        const r = await Zn(i);
        if (this.getResponseErrors(i, r.data) || !r.data)
          return;
        if (n.api.input.items ? s.items = typeof n.api.input.items == "string" ? r.data[n.api.input.items] : n.api.input.items(r.data, i) : s.items = r.data, t && t[0])
          for (let c of t)
            c[s.local] && (c[s.entity] = s.items.find(
              (a, l, h) => a[s.foreign] === c[s.local]
            ));
      } catch (e) {
        console.error(e.message);
      }
    },
    async editItem(s) {
      this.item = s, this.message.form = null, this.messages.form = [], this.modalWindow.show();
      let t = s[this.settings.pkey];
      this.fetchItem(t), setTimeout(() => {
      }, 100);
    },
    async fetchItem(s) {
      try {
        this.formWait(!0);
        const t = await fetch(
          As(
            "GET",
            this.settings.form.api,
            s
          ),
          Ts("GET", this.settings.api)
        ).catch((r) => {
        }), e = await Zn(t);
        if (this.getResponseErrors(t, e.data, "form") || !e.data)
          return this.formNoWait(), !1;
        this.settings.events && this.settings.events.afterItemLoad && this.settings.events.afterItemLoad(e.data, t);
        for (let r of this.settings.form.groups)
          for (let o of r.fields)
            o.relation && this.settings.relations[o.relation.entity] && (o.relation = Object.assign(
              {},
              this.settings.relations[o.relation.entity],
              o.relation
            ), await this.fetchRelation(o.relation));
        let i;
        this.settings.form.api.input.item ? i = typeof this.settings.form.api.input.item == "string" ? e.data[this.settings.form.api.input.item] : this.settings.form.api.input.item(e.data, t) : i = e.data, this.item = pr(i), this.itemOriginal = Object.assign({}, i), this.formNoWait();
      } catch (t) {
        console.error(t), this.formNoWait();
      }
    },
    async deleteItem(s, t) {
      try {
        s || (s = this.item);
        let e = s[this.settings.pkey];
        if (!e || !confirm("Are you sure you want to delete this post"))
          return;
        this.formWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(s);
        const i = await fetch(
          As(
            "DELETE",
            this.settings.form.api,
            e,
            t
          ),
          Ts("DELETE", this.settings.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        let r = this.items.find((c) => c[this.settings.pkey] === e);
        console.log(r, e), r >= 0 && this.items.splice(r, 1), this.item && (this.item = {});
        const o = await i.json();
        this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(o, i), this.reloadTable(), this.formNoWait();
      } catch (e) {
        console.error(e.message), this.formNoWait();
      }
    },
    async deleteItems(s, t) {
      try {
        if (!s || !confirm(
          this.translate("Are you sure you want to delete all selected items?")
        ))
          return;
        this.tableWait(!0);
        const n = await fetch(
          As("DELETE", this.settings.table.api),
          Ts("DELETE", this.settings.api, {
            body: JSON.stringify({
              ids: s
            })
          })
        );
        if (n.status !== 200)
          throw new Error(
            this.translate("Response status: " + n.status)
          );
        t && t(n), this.reloadTable(), this.tableNoWait();
      } catch (e) {
        console.error(e.message), this.tableNoWait();
      }
    },
    reloadItem() {
      let s = this.item[this.settings.pkey];
      this.fetchItem(s);
    },
    async submitItem(s) {
      this.saveItem(this.item, (t) => {
        let e = {};
        this.settings.form.api.input.item ? e = typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t, response) : e = t, e && (this.addFormMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${e[this.settings.pkey]} )</small>`,
          2500
        ), this.item = pr(e), this.itemOriginal = Object.assign({}, e)), s === !0 && this.modalWindow.hide(), this.reloadTable();
      }, (t) => {
        console.log(t), this.addFormMessage(t.message, 14500, "danger");
      });
    },
    async submitAndClose() {
      let s = this.$refs.form;
      s.checkValidity() ? this.submitItem(!0) : s.reportValidity();
    },
    tableRowSave(s, t) {
      this.tableWait(), this.saveItem(s, () => {
        this.tableNoWait(), this.addTableMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${s[this.settings.pkey]} )</small>`,
          2500
        );
      }, (e, n, i, r) => {
        this.tableNoWait(), this.handleTableErrors(e);
      }, t);
    },
    submitForm(s, t, e, n) {
      this.formWait(!0), this.saveItem(s, () => {
      }, () => {
      }, n);
    },
    handleTableErrors(s) {
      if (console.log(s), s == null)
        return;
      const t = 3500, e = "danger";
      if (typeof s == "string") {
        this.addTableMessage(s, t, e);
        return;
      }
      if (s.length > 0)
        for (let n of s)
          this.addTableMessage(n.message, n.timeout, n.priority);
    },
    handleFormErrors() {
      if (errors == null)
        return;
      const s = 3500, t = "danger";
      if (typeof errors == "string") {
        this.addTableMessage(errors, s, t);
        return;
      }
      if (errors.length > 0)
        for (let e of errors)
          this.addTableMessage(e.message, e.timeout, e.priority);
    },
    async saveItem(s, t, e, n) {
      try {
        n = n || {};
        let i = {}, r = s[this.settings.pkey];
        if (this.settings.form.api.output && this.settings.form.api.output.fields)
          for (let f in s)
            this.settings.form.api.output.fields.includes(f) && (i[f] = s[f]);
        else
          Object.assign(i, s);
        this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, s);
        let o;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Mb(i)), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let f = {};
          f[this.settings.form.api.output.item] = i, o = JSON.stringify(f);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const c = r ? "PUT" : "POST", a = await fetch(
          As(c, this.settings.form.api, r, n),
          Ts(c, this.settings.form.api, {
            body: o
          })
        ), l = await Zn(a), h = this.getResponseErrors(a, l.data);
        if (h) {
          e && e(h, s, n, a);
          return;
        }
        if (l.error) {
          e && e(l.error, s, n, a);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(l.data, n), t && t(l.data, a);
      } catch (i) {
        e && e(i, s, n, response);
      }
    },
    async saveBulk(s) {
      try {
        this.tableWait(!0);
        let t = {};
        this.settings.events && this.settings.events.beforeBulkSave && this.settings.events.beforeBulkSave(this.bulkitem);
        for (let r in this.bulkitem)
          this.bulkinputs.indexOf(r) >= 0 && this.settings.table.api.output.fields.includes(r) && (t[r] = this.bulkitem[r]);
        this.convertOut(this.settings.table.columns, [t]);
        const e = await fetch(
          As("PUT", this.settings.table.api),
          Ts("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: t,
              ids: this.selected
            })
          })
        ).catch((r) => {
          console.error(r.message), this.addTableMessage(r.message, 3500, "danger", r);
        }), n = await Zn(e), i = this.getResponseErrors(e, n.data);
        if (this.tableNoWait(), i)
          return;
        s && s(n.data), this.reloadTable();
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger", t), this.tableNoWait();
      }
    },
    getResponseErrors(s, t) {
      let e = [];
      if (t && t.errors)
        for (let n of t.errors)
          e.push({
            message: n.message,
            timeout: 3500,
            priority: "danger"
          });
      else s.status >= 400 && s.status <= 511 && e.push({
        message: s.status + (s.statusText ? " " + s.statusText : ""),
        timeout: 3500,
        priority: "danger"
      });
      return e.length > 0 ? e : null;
    },
    countHiddenColumns() {
      return this.settings.table.columns.filter(
        (s) => s.hidden === !0
      ).length;
    },
    toggleColumn(s) {
      s === !0 ? this.settings.table.columns.map((t) => {
        t.hidden = !1;
      }) : s === !1 ? this.settings.table.columns.map((t) => {
        t.hidden = !0;
      }) : s.hidden = !s.hidden;
    },
    toggleSelectedAll() {
      this.selected.length ? this.selected = [] : this.selected = this.items.map((s) => s[this.settings.pkey]);
    },
    toggleSelected(s) {
      let t = this.selected.indexOf(s);
      t >= 0 ? this.selected.splice(t, 1) : this.selected.push(s);
    },
    toggleSelectedRowInPage() {
      if (this.haveSelectedRowInPage())
        for (let s of this.items) {
          let t = this.selected.indexOf(s[this.settings.pkey]);
          t >= 0 && this.selected.splice(t, 1);
        }
      else
        for (let s of this.items)
          this.selected.indexOf(s[this.settings.pkey]) < 0 && this.selected.push(s[this.settings.pkey]);
      this.selected.length || (this.bulkitem = {});
    },
    haveSelectedRowInPage() {
      if (!this.items || !this.items.length)
        return !1;
      for (let s of this.items)
        if (this.selected.indexOf(s[this.settings.pkey]) >= 0)
          return !0;
      return !1;
    },
    toggleDetail(s) {
      let t = this.details.indexOf(s);
      t >= 0 ? this.details.splice(t, 1) : this.details.push(s);
    },
    dropdownSelectToggleOne(s, t) {
      s.multiple ? Pb(s.value, t) : s.value = s.value === t ? null : t, this.reloadTable();
    },
    dropdownSelectAll(s, t) {
      jb(s, t), this.reloadTable();
    },
    dropdownSelectInvert(s, t) {
      Ub(s, t), this.reloadTable();
    },
    dropdownSelectClear(s) {
      typeof s != "object" ? s.value = null : Vb(s), this.reloadTable();
    },
    async exportTable(s) {
      try {
        s.limit = this.config.pagination.total ? this.config.pagination.total : 0;
        let t = this.getFiltersForFetch(), e = this.getOrdersForFetch();
        this.selected.length > 0 && (t[this.settings.pkey] = {
          type: "string",
          value: this.selected,
          operator: "in"
        }), s.filter = t, s.order = e;
        let n = await this.fetchItems(this.settings, s, null, () => {
        });
        this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(n);
        let i = qb(
          n,
          this.settings.table.exports[s.type].fields
        );
        Bb(i, this.settings.entity + ".csv");
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger");
      }
    },
    onRowInputChange(s, t, e, n) {
      !t || !t.input || (t.input.onchange && t.input.onchange(s, t, e), t.input.autosave && (this.tableWait(), this.saveItem(e, () => {
        this.tableNoWait(), this.addTableMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${e[this.settings.pkey]} )</small>`,
          2500
        );
      }, (i, r, o, c) => {
        this.tableNoWait(), this.handleTableErrors(i);
      })));
    },
    onBulkInputChange(s, t, e) {
      !e || !e.input || e.input.onchange && e.input.onchange(s, e);
    },
    ifBulkInputClick(s) {
      let t = this.bulkinputs.indexOf(s.name);
      t < 0 ? this.bulkinputs.push(s.name) : this.bulkinputs.splice(t, 1), this.bulkitem[s.name] === void 0 ? this.bulkitem[s.name] = null : this.bulkitem[s.name] = void 0;
    },
    addFormMessage(s, t, e, n) {
      this.addMessage("form", s, t, e, n);
    },
    addTableMessage(s, t, e, n) {
      this.addMessage("table", s, t, e, n);
    },
    addMessage(s, t, e, n, i) {
      clearTimeout(this.messageTimeout);
      const r = Date.now() + Math.random().toString(36).substring(2, 9);
      this.message[s] = {
        uid: r,
        msg: t,
        timeout: e !== void 0 ? e : 2500,
        datetime: (/* @__PURE__ */ new Date()).toLocaleString("hu-HU"),
        priority: n || "secondary",
        details: i
      }, this.messages[s].unshift(this.message[s]), clearTimeout(this.messageTimeOut), this.messageTimeOut = setTimeout(() => {
        this.message[s] = null, this.messages[s].length > 10 && this.messages[s].splice(10);
      }, this.message[s].timeout);
    },
    translate(s, t, e) {
      return Ja(s, this.settings.translate, t, e || this.settings.language);
    },
    convertIn(s, t) {
      for (let e of s)
        if (e.convert && e.convert.in)
          for (let n of t)
            n[e.name] = e.convert.in(n[e.name], n, e);
    },
    convertOut(s, t) {
      for (let e of s)
        if (e.convert && e.convert.out)
          for (let n of t)
            n[e.name] = e.convert.out(n[e.name], n, e);
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
}, hN = { key: 0 }, dN = ["data-bs-theme"], fN = { class: "vua-table-title" }, pN = { class: "d-flex align-items-center justify-content-between" }, gN = { class: "d-inline-block" }, mN = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, bN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, yN = {
  key: 0,
  class: "d-inline-block"
}, _N = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, vN = ["innerHTML"], EN = { class: "dropdown d-inline-block" }, TN = ["innerHTML"], AN = { class: "dropdown-menu text-start" }, wN = { class: "me-2 text-muted" }, NN = ["innerHTML"], ON = ["onClick"], CN = {
  key: 1,
  class: "dropdown d-inline-block"
}, SN = { class: "mx-1" }, LN = { key: 0 }, xN = { class: "dropdown-menu" }, kN = ["onClick"], IN = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, RN = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, DN = { class: "badge text-secondary fw-normal" }, MN = {
  key: 2,
  class: "dropdown d-inline-block"
}, qN = { class: "mx-1" }, BN = { class: "dropdown-menu" }, $N = ["onClick"], PN = { class: "vua-table-header" }, jN = ["width"], UN = ["onClick"], VN = ["innerHTML"], FN = {
  key: 0,
  class: "bi bi-arrow-down"
}, HN = {
  key: 1,
  class: "bi bi-arrow-up"
}, WN = { key: 0 }, zN = ["disabled", "onClick"], KN = {
  key: 0,
  class: "vua-table-filter"
}, GN = ["width"], YN = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, XN = { class: "bi bi-check-all" }, ZN = { class: "bi bi-x-lg" }, QN = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, JN = ["onUpdate:modelValue"], tO = ["disabled", "onClick"], eO = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, sO = ["onUpdate:modelValue", "disabled"], nO = { value: "=" }, iO = { value: ">" }, rO = { value: ">=" }, oO = { value: "<" }, aO = { value: "<=" }, lO = ["onUpdate:modelValue", "disabled"], cO = ["value"], uO = ["onUpdate:modelValue", "disabled", "min", "max"], hO = ["disabled", "onClick"], dO = { key: 3 }, fO = {
  key: 0,
  class: "dropdown"
}, pO = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, gO = { class: "dropdown-menu" }, mO = ["onClick"], bO = {
  key: 0,
  class: "bi bi-check-square"
}, yO = {
  key: 1,
  class: "bi bi-square"
}, _O = { key: 0 }, vO = { key: 1 }, EO = ["onClick"], TO = { key: 2 }, AO = ["onClick"], wO = { key: 3 }, NO = ["onClick"], OO = ["onUpdate:modelValue", "multiple"], CO = ["value"], SO = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, LO = ["onUpdate:modelValue"], xO = { value: "=" }, kO = { value: ">" }, IO = { value: ">=" }, RO = { value: "<" }, DO = { value: "<=" }, MO = ["onUpdate:modelValue"], qO = ["value"], BO = ["type", "onUpdate:modelValue"], $O = ["disabled", "onClick"], PO = ["disabled", "onClick"], jO = { class: "align-middle" }, UO = ["data-label", "width", "onClick"], VO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, FO = ["innerHTML"], HO = { key: 1 }, WO = ["innerHTML"], zO = ["aria-valuenow", "aria-valuemax"], KO = { key: 0 }, GO = {
  key: 4,
  class: "input-group input-group-sm"
}, YO = ["innerHTML"], XO = ["type", "onChange", "onUpdate:modelValue"], ZO = ["onChange", "onUpdate:modelValue"], QO = ["value"], JO = ["innerHTML"], tC = { key: 5 }, eC = ["disabled", "onClick"], sC = ["innerHTML"], nC = { key: 2 }, iC = { key: 0 }, rC = ["colspan"], oC = { class: "row g-3 align-items-center" }, aC = { class: "col-form-label" }, lC = ["type", "onUpdate:modelValue", "onChange"], cC = ["onUpdate:modelValue", "onChange"], uC = ["onUpdate:modelValue", "onChange"], hC = ["value"], dC = ["innerHTML"], fC = {
  key: 0,
  class: "bg-light text-dark"
}, pC = {
  key: 0,
  class: "vua-table-bulk border-info"
}, gC = ["data-label", "width"], mC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, bC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, yC = ["type", "disabled", "onChange", "onUpdate:modelValue"], _C = ["disabled", "onChange", "onUpdate:modelValue"], vC = ["value"], EC = ["onClick"], TC = {
  key: 0,
  class: "bi bi-square text-secondary"
}, AC = {
  key: 1,
  class: "bi bi-check-square"
}, wC = { key: 2 }, NC = ["disabled", "onClick"], OC = ["innerHTML"], CC = { key: 2 }, SC = ["id"], LC = { class: "modal-dialog modal-xl" }, xC = { class: "modal-content h-100" }, kC = ["id", "data-bs-theme"], IC = { class: "modal-header" }, RC = { class: "modal-title" }, DC = ["innerHTML"], MC = { key: 1 }, qC = { key: 2 }, BC = {
  key: 3,
  class: "badge border text-dark ms-2 p-badge"
}, $C = {
  key: 0,
  class: "d-inline-block ms-3 mt-1"
}, PC = ["innerHTML"], jC = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, UC = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, VC = ["disabled"], FC = ["disabled"], HC = {
  key: 0,
  class: "d-inline-block m-1"
}, WC = { class: "dropdown d-inline-block" }, zC = ["innerHTML"], KC = { class: "dropdown-menu text-start" }, GC = { class: "me-2 text-muted" }, YC = ["innerHTML"], XC = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, ZC = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, QC = {
  key: 1,
  class: "modal-body custom-scroll"
}, JC = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, tS = ["disabled"], eS = ["disabled"], sS = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, nS = {
  type: "submit",
  class: "btn btn-primary m-1"
}, iS = {
  key: 1,
  class: "bg-light text-dark"
};
function rS(s, t, e, n, i, r) {
  const o = ai("VuAdminTablePagination"), c = ai("VuAdminFormGroup");
  return e.settings && e.settings.table ? (y(), _("div", hN, [
    m("div", {
      class: D(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      m("div", {
        class: D(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      m("div", fN, [
        m("div", pN, [
          m("div", gN, [
            e.settings.table.title ? (y(), _("h5", mN, x(e.settings.table.title), 1)) : C("", !0),
            X(m("div", bN, t[26] || (t[26] = [
              m("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [ws, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (y(), _("div", yN, [
            i.message.table ? (y(), _("small", _N, [
              m("span", {
                class: D(["text-" + i.message.table.priority])
              }, [
                m("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, vN)
              ], 2)
            ])) : C("", !0),
            m("div", EN, [
              m("button", {
                class: D(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, TN),
              m("ul", AN, [
                (y(!0), _(W, null, z(i.messages.table, (a) => (y(), _("li", { key: a }, [
                  m("span", {
                    class: D(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    m("small", wN, x(a.datetime), 1),
                    m("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, NN)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : C("", !0)
        ])
      ]),
      e.settings.table.control ? (y(), _("div", {
        key: 0,
        class: D(["vua-table-control", [e.settings.table.control.class]])
      }, [
        (y(!0), _(W, null, z(e.settings.table.control.buttons, (a) => (y(), _("span", {
          key: a.action
        }, [
          a.action !== "TABLE_COLUMNS" && !a.dropdowns ? (y(), _("button", {
            key: 0,
            type: "button",
            class: D([
              a.class ? a.class : r.getButtonClassByAction(a.action)
            ]),
            onClick: (l) => r.tableAction(a, i.items, null, l)
          }, [
            m("i", {
              class: D([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            Y(" " + x(r.translate(a.title)), 1)
          ], 10, ON)) : C("", !0),
          a.action === "TABLE_COLUMNS" ? (y(), _("div", CN, [
            m("button", {
              type: "button",
              class: D([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              X(m("span", SN, [
                m("i", {
                  class: D([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                Y(" " + x(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (y(), _("span", LN, " ( " + x(r.countHiddenColumns()) + " " + x(r.translate("hidden")) + " ) ", 1)) : C("", !0)
              ], 512), [
                [ws, e.settings.table.columns.length > 0]
              ])
            ], 2),
            m("ul", xN, [
              (y(!0), _(W, null, z(e.settings.table.columns, (l) => (y(), _("li", { key: l }, [
                m("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(l)
                }, [
                  l.hidden ? C("", !0) : (y(), _("i", IN)),
                  l.hidden ? (y(), _("i", RN)) : C("", !0),
                  Y(" " + x(l.title) + " ", 1),
                  m("small", DN, x(l.name), 1)
                ], 8, kN)
              ]))), 128)),
              t[27] || (t[27] = m("li", null, [
                m("hr", { class: "dropdown-divider" })
              ], -1)),
              m("li", null, [
                m("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (l) => r.toggleColumn(!0))
                }, x(r.translate("Visible all")), 1)
              ]),
              m("li", null, [
                m("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (l) => r.toggleColumn(!1))
                }, x(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : C("", !0),
          a.dropdowns ? (y(), _("div", MN, [
            m("button", {
              type: "button",
              class: D([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              m("span", qN, [
                m("i", {
                  class: D([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                Y(" " + x(r.translate(a.title)), 1)
              ])
            ], 2),
            m("ul", BN, [
              (y(!0), _(W, null, z(a.dropdowns, (l) => (y(), _("li", { key: l }, [
                m("span", {
                  class: D(["dropdown-item cursor-pointer", [l.class]]),
                  onClick: (h) => r.tableAction(l, i.items, null, h)
                }, [
                  l.icon ? (y(), _("i", {
                    key: 0,
                    class: D([l.icon])
                  }, null, 2)) : C("", !0),
                  Y(" " + x(r.translate(l.title)), 1)
                ], 10, $N)
              ]))), 128))
            ])
          ])) : C("", !0)
        ]))), 128))
      ], 2)) : C("", !0),
      e.settings.table ? (y(), _("table", {
        key: 1,
        class: D(["table vua-table mb-0", [e.settings.table.class]])
      }, [
        m("thead", null, [
          m("tr", PN, [
            (y(!0), _(W, null, z(e.settings.table.columns, (a) => (y(), _("th", {
              class: D(["", [a.header ? a.header.class : ""]]),
              style: Gn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              m("span", {
                class: D(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (l) => r.sortTable(a)
              }, [
                m("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, VN),
                i.config.order[a.name] ? (y(), _("span", {
                  key: 0,
                  class: D(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (y(), _("i", FN)) : C("", !0),
                  i.config.order[a.name].dir === "DESC" ? (y(), _("i", HN)) : C("", !0),
                  Y(" " + x(i.config.order[a.name].idx + 1), 1)
                ], 2)) : C("", !0)
              ], 10, UN),
              a.header && a.header.buttons ? (y(), _("span", WN, [
                (y(!0), _(W, null, z(a.header.buttons, (l) => (y(), _("button", {
                  key: l.action,
                  type: "button",
                  disabled: l.disabled !== void 0 ? r.getValueOrFunction(l.disabled) : null,
                  class: D([
                    l.class ? l.class : r.getButtonClassByAction(l.action)
                  ]),
                  onClick: (h) => r.tableAction(l, i.items, null, h)
                }, [
                  m("i", {
                    class: D([
                      l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                        button: l,
                        column: a,
                        table: this
                      }) : r.getButtonIconClassByAction(l.action)
                    ])
                  }, null, 2),
                  Y(" " + x(r.translate(l.title)), 1)
                ], 10, zN))), 128))
              ])) : C("", !0)
            ], 14, jN))), 128))
          ]),
          r.countFilters() ? (y(), _("tr", KN, [
            (y(!0), _(W, null, z(e.settings.table.columns, (a) => (y(), _("th", {
              style: Gn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: D([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (y(), _("div", YN, [
                m("span", {
                  class: D(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (l) => r.toggleSelectedRowInPage())
                }, [
                  X(m("i", XN, null, 512), [
                    [ws, !r.haveSelectedRowInPage()]
                  ]),
                  X(m("i", ZN, null, 512), [
                    [ws, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : C("", !0),
              a.filter && a.filter.type == "text" ? (y(), _("div", QN, [
                X(m("input", {
                  type: "text",
                  class: D([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onKeyup: t[3] || (t[3] = Oo((l) => r.reloadTable(), ["enter"]))
                }, null, 42, JN), [
                  [pe, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (y(), _("button", {
                  key: 0,
                  class: D(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[28] || (t[28] = [
                  m("i", { class: "bi bi-x" }, null, -1)
                ]), 10, tO)) : C("", !0)
              ])) : C("", !0),
              a.filter && a.filter.type == "number" ? (y(), _("div", eO, [
                a.filter.operators == !0 ? X((y(), _("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  m("option", nO, x(r.translate("=")), 1),
                  m("option", iO, x(r.translate(">")), 1),
                  m("option", rO, x(r.translate(">=")), 1),
                  m("option", oO, x(r.translate("<")), 1),
                  m("option", aO, x(r.translate("<=")), 1)
                ], 40, sO)), [
                  [Ie, a.filter.operator]
                ]) : C("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? X((y(), _("select", {
                  key: 1,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (y(!0), _(W, null, z(a.filter.operators, (l) => (y(), _("option", {
                    key: l,
                    value: l.value
                  }, x(l.label), 9, cO))), 128))
                ], 40, lO)), [
                  [Ie, a.filter.operator]
                ]) : C("", !0),
                X(m("input", {
                  type: "number",
                  class: D(["form-control", {
                    fixed: a.filter.fixed
                  }]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  disabled: a.filter.fixed,
                  min: a.filter.min,
                  max: a.filter.max,
                  onChange: t[6] || (t[6] = (l) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = Oo((l) => r.reloadTable(), ["enter"]))
                }, null, 42, uO), [
                  [pe, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (y(), _("button", {
                  key: 2,
                  class: D(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[29] || (t[29] = [
                  m("i", { class: "bi bi-x" }, null, -1)
                ]), 10, hO)) : C("", !0)
              ])) : C("", !0),
              a.filter && a.filter.type == "select" ? (y(), _("div", dO, [
                a.filter.dropdown ? (y(), _("div", fO, [
                  m("button", pO, x(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  m("ul", gO, [
                    m("li", null, [
                      (y(!0), _(W, null, z(a.filter.options, (l) => (y(), _("span", {
                        key: l,
                        class: D(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, l.value)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value) ? (y(), _("i", bO)) : (y(), _("i", yO)),
                        Y(" " + x(r.translate(l.label ? l.label : l.value)), 1)
                      ], 10, mO))), 128))
                    ]),
                    a.filter.multiple ? (y(), _("li", _O, t[30] || (t[30] = [
                      m("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : C("", !0),
                    a.filter.multiple ? (y(), _("li", vO, [
                      m("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, x(r.translate("Select all")), 9, EO)
                    ])) : C("", !0),
                    a.filter.multiple ? (y(), _("li", TO, [
                      m("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectClear(a.filter.value)
                      }, x(r.translate("Unselect all")), 9, AO)
                    ])) : C("", !0),
                    a.filter.multiple ? (y(), _("li", wO, [
                      m("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, x(r.translate("Invert all")), 9, NO)
                    ])) : C("", !0)
                  ])
                ])) : X((y(), _("select", {
                  key: 1,
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onChange: t[8] || (t[8] = (l) => r.reloadTable()),
                  multiple: a.filter.multiple,
                  class: "form-select form-select-sm pe-0 my-1"
                }, [
                  (y(!0), _(W, null, z(a.filter.options, (l) => (y(), _("option", {
                    key: l,
                    value: l.value
                  }, x(r.translate(l.label ? l.label : l.value)), 9, CO))), 128))
                ], 40, OO)), [
                  [Ie, a.filter.value]
                ])
              ])) : C("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (y(), _("div", SO, [
                a.filter.operators == !0 ? X((y(), _("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  onChange: t[9] || (t[9] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  m("option", xO, x(r.translate("=")), 1),
                  m("option", kO, x(r.translate(">")), 1),
                  m("option", IO, x(r.translate(">=")), 1),
                  m("option", RO, x(r.translate("<")), 1),
                  m("option", DO, x(r.translate("<=")), 1)
                ], 40, LO)), [
                  [Ie, a.filter.operator]
                ]) : C("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? X((y(), _("select", {
                  key: 1,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  onChange: t[10] || (t[10] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (y(!0), _(W, null, z(a.filter.operators, (l) => (y(), _("option", {
                    key: l,
                    value: l.value
                  }, x(r.translate(l.label)), 9, qO))), 128))
                ], 40, MO)), [
                  [Ie, a.filter.operator]
                ]) : C("", !0),
                X(m("input", {
                  type: a.filter.type,
                  class: D([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onChange: t[11] || (t[11] = (l) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = Oo((l) => r.reloadTable(), ["enter"]))
                }, null, 42, BO), [
                  [hn, a.filter.value]
                ]),
                m("button", {
                  class: D(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[31] || (t[31] = [
                  m("i", { class: "bi bi-x" }, null, -1)
                ]), 10, $O)
              ])) : C("", !0),
              a.filter && a.filter.buttons ? (y(), _("span", {
                key: 5,
                class: D(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (y(!0), _(W, null, z(a.filter.buttons, (l) => (y(), _("span", {
                  key: l.action
                }, [
                  m("button", {
                    type: "button",
                    disabled: l.disabled !== void 0 ? r.getValueOrFunction(l.disabled) : null,
                    class: D([
                      l.class ? l.class : r.getButtonClassByAction(l.action)
                    ]),
                    onClick: (h) => r.tableAction(l, i.items, null, h)
                  }, [
                    m("i", {
                      class: D([
                        l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                          button: l,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(l.action)
                      ])
                    }, null, 2),
                    Y(" " + x(r.translate(l.title)), 1)
                  ], 10, PO)
                ]))), 128))
              ], 2)) : C("", !0)
            ], 14, GN))), 128))
          ])) : C("", !0)
        ]),
        m("tbody", null, [
          (y(!0), _(W, null, z(this.items, (a, l) => (y(), _(W, {
            key: a.id
          }, [
            m("tr", jO, [
              (y(!0), _(W, null, z(e.settings.table.columns, (h) => (y(), _("td", {
                style: Gn([h.hidden ? "display: none" : ""]),
                key: h.name,
                "data-label": h.title ? h.title : r.translate(h.name),
                width: h.width,
                class: D(
                  r.getValueOrFunction(h.class, {
                    column: h,
                    item: a
                  })
                ),
                onClick: (f) => r.tableAction(h, a, l, f)
              }, [
                h.index ? (y(), _("div", VO, [
                  m("span", {
                    class: D(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: l + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, FO)
                ])) : C("", !0),
                !h.template && !h.input && !h.progressbar ? (y(), _("span", HO, x(r.tableCellValue(h.name, a, l, h)), 1)) : C("", !0),
                h.template ? (y(), _("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, l, h)
                }, null, 8, WO)) : C("", !0),
                h.progressbar ? (y(), _("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": a[h.name],
                  "aria-valuemax": h.progressbar.max
                }, [
                  m("div", {
                    class: D(["progress-bar", [h.progressbar.class]]),
                    style: Gn({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (y(), _("span", KO, x(a[h.name]), 1)) : C("", !0)
                  ], 6)
                ], 8, zO)) : C("", !0),
                h.input ? (y(), _("div", GO, [
                  h.input.prefix ? (y(), _("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, YO)) : C("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    h.input.type
                  ) >= 0 ? X((y(), _("input", {
                    key: 1,
                    type: h.input.type,
                    class: D(["form-control form-control-sm", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (f) => r.onRowInputChange(a[h.name], h, a, l),
                    "onUpdate:modelValue": (f) => a[h.name] = f
                  }, null, 42, XO)), [
                    [hn, a[h.name]]
                  ]) : C("", !0),
                  h.input.type == "select" ? X((y(), _("select", {
                    key: 2,
                    class: D(["form-select form-select-sm pe-0", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (f) => r.onRowInputChange(a[h.name], h, a, l),
                    "onUpdate:modelValue": (f) => a[h.name] = f
                  }, [
                    (y(!0), _(W, null, z(h.input.options, (f) => (y(), _("option", {
                      value: f.value,
                      key: f
                    }, x(r.translate(f.label)), 9, QO))), 128))
                  ], 42, ZO)), [
                    [Ie, a[h.name]]
                  ]) : C("", !0),
                  h.input.suffix ? (y(), _("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, JO)) : C("", !0)
                ])) : C("", !0),
                h.buttons ? (y(), _("span", tC, [
                  (y(!0), _(W, null, z(h.buttons, (f) => (y(), _("span", {
                    key: f.action
                  }, [
                    m("button", {
                      type: "button",
                      disabled: f.disabled !== void 0 ? r.getValueOrFunction(f.disabled) : null,
                      class: D([
                        f.class ? r.getValueOrFunction(f.class, {
                          button: f,
                          column: h,
                          item: a,
                          table: this
                        }) : r.getButtonClassByAction(f.action)
                      ]),
                      onClick: (p) => r.tableAction(f, a, l, p)
                    }, [
                      f.icon !== null ? (y(), _("i", {
                        key: 0,
                        class: D([
                          f.icon !== void 0 ? r.getValueOrFunction(f.icon, {
                            button: f,
                            column: h,
                            item: a,
                            table: this
                          }) : r.getButtonIconClassByAction(f.action)
                        ])
                      }, null, 2)) : C("", !0),
                      f.template ? (y(), _("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(f.template, a, l, h)
                      }, null, 8, sC)) : (y(), _("span", nC, x(r.translate(f.title)), 1))
                    ], 10, eC)
                  ]))), 128))
                ])) : C("", !0)
              ], 14, UO))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (y(), _("tr", iC, [
              m("td", {
                class: D([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (y(!0), _(W, null, z(e.settings.table.details.fields, (h) => (y(), _("div", {
                  class: "m-0",
                  key: h
                }, [
                  m("div", oC, [
                    m("div", {
                      class: D(["col text-end", [h.class]])
                    }, [
                      m("label", aC, x(h.label), 1)
                    ], 2),
                    m("div", {
                      class: D(["col", [h.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(h.input.type) < 0 ? X((y(), _("input", {
                        key: 0,
                        type: h.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (f) => a[h.name] = f,
                        onChange: (f) => r.onRowInputChange(a[h.name], h, a, l)
                      }, null, 40, lC)), [
                        [hn, a[h.name]]
                      ]) : C("", !0),
                      h.input.type == "textarea" ? X((y(), _("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (f) => a[h.name] = f,
                        onChange: (f) => r.onRowInputChange(a[h.name], h, a, l)
                      }, `\r
                    `, 40, cC)), [
                        [pe, a[h.name]]
                      ]) : C("", !0),
                      h.input.type == "select" ? X((y(), _("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (f) => a[h.name] = f,
                        onChange: (f) => r.onRowInputChange(a[h.name], h, a, l)
                      }, [
                        (y(!0), _(W, null, z(h.input.options, (f) => (y(), _("option", {
                          value: f.value,
                          key: f
                        }, x(r.translate(f.label)), 9, hC))), 128))
                      ], 40, uC)), [
                        [Ie, a[h.name]]
                      ]) : C("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                m("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, dC),
                e.settings.debug ? (y(), _("pre", fC, "                " + x(a) + `
              `, 1)) : C("", !0)
              ], 10, rC)
            ])) : C("", !0)
          ], 64))), 128))
        ]),
        m("tfoot", null, [
          i.selected.length > 0 ? (y(), _("tr", pC, [
            (y(!0), _(W, null, z(e.settings.table.columns, (a) => (y(), _("td", {
              style: Gn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: D(a.class)
            }, [
              a.index ? (y(), _("div", mC, [
                m("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (l) => r.toggleSelectedAll())
                }, x(i.selected.length), 1)
              ])) : C("", !0),
              a.input && a.bulk && a.bulk.enabled ? (y(), _("div", bC, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? X((y(), _("input", {
                  key: 0,
                  type: a.input.type,
                  class: D(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (l) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (l) => i.bulkitem[a.name] = l
                }, null, 42, yC)), [
                  [hn, i.bulkitem[a.name]]
                ]) : C("", !0),
                a.input.type == "select" ? X((y(), _("select", {
                  key: 1,
                  class: D(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (l) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (l) => i.bulkitem[a.name] = l
                }, [
                  (y(!0), _(W, null, z(a.input.options, (l) => (y(), _("option", {
                    value: l.value,
                    key: l
                  }, x(r.translate(l.label)), 9, vC))), 128))
                ], 42, _C)), [
                  [Ie, i.bulkitem[a.name]]
                ]) : C("", !0),
                m("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (l) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (y(), _("i", TC)) : (y(), _("i", AC))
                ], 8, EC)
              ])) : C("", !0),
              a.bulk ? (y(), _("span", wC, [
                (y(!0), _(W, null, z(a.bulk.buttons, (l) => (y(), _("span", {
                  key: l.action
                }, [
                  m("button", {
                    type: "button",
                    class: D([
                      l.class ? l.class : r.getButtonClassByAction(l.action)
                    ]),
                    disabled: l.action === "save" && !this.bulkinputs.length,
                    onClick: (h) => r.tableBulkAction(l.action, i.bulkitem, a, h)
                  }, [
                    l.icon !== null ? (y(), _("i", {
                      key: 0,
                      class: D([
                        l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                          button: l,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(l.action)
                      ])
                    }, null, 2)) : C("", !0),
                    l.template ? (y(), _("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(l.template, i.bulkitem, null, a)
                    }, null, 8, OC)) : (y(), _("span", CC, x(r.translate(l.title)), 1))
                  ], 10, NC)
                ]))), 128))
              ])) : C("", !0)
            ], 14, gC))), 128))
          ])) : C("", !0)
        ])
      ], 2)) : C("", !0),
      hu(o, {
        settings: e.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"]),
      m("div", {
        class: "modal shadow",
        id: i.modalId,
        tabindex: "-1"
      }, [
        m("div", LC, [
          m("div", xC, [
            i.item ? (y(), _("form", {
              key: 0,
              ref: "form",
              id: s.formId,
              class: D(["form", [e.settings.form.class, { wait: i.ui.wait.form }]]),
              onSubmit: t[25] || (t[25] = Id((...a) => r.submitItem && r.submitItem(...a), ["prevent"])),
              "data-bs-theme": [e.settings.theme]
            }, [
              m("div", {
                class: D(["vua-overlay", { blocked: i.ui.block.form }])
              }, null, 2),
              m("div", IC, [
                m("h5", RC, [
                  e.settings.form.title && typeof e.settings.form.title == "function" ? (y(), _("span", {
                    key: 0,
                    innerHTML: e.settings.form.title(i.item, e.settings)
                  }, null, 8, DC)) : C("", !0),
                  e.settings.form.title && typeof e.settings.form.title == "string" ? (y(), _("span", MC, x(r.translate(e.settings.form.title)), 1)) : C("", !0),
                  e.settings.form.title ? C("", !0) : (y(), _("span", qC, x(r.translate("Edit")), 1)),
                  i.item[e.settings.pkey] ? (y(), _("span", BC, [
                    t[32] || (t[32] = m("span", { class: "text-secondary fw-light" }, "id", -1)),
                    Y(" " + x(i.item[e.settings.pkey]), 1)
                  ])) : C("", !0)
                ]),
                i.message.form ? (y(), _("span", $C, [
                  m("span", {
                    class: D(["text-" + i.message.form.priority])
                  }, [
                    t[33] || (t[33] = m("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
                    m("span", {
                      innerHTML: i.message.form.msg
                    }, null, 8, PC)
                  ], 2)
                ])) : C("", !0),
                X(m("span", jC, t[34] || (t[34] = [
                  m("span", { class: "visually-hidden" }, "Loading...", -1)
                ]), 512), [
                  [ws, i.ui.wait.form]
                ]),
                t[35] || (t[35] = m("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "modal",
                  "aria-label": "Close"
                }, null, -1))
              ]),
              i.item ? (y(), _("div", UC, [
                m("div", null, [
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-secondary m-1",
                    onClick: t[14] || (t[14] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[36] || (t[36] = m("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    Y(" " + x(r.translate("Reload")), 1)
                  ], 8, VC),
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[15] || (t[15] = (a) => r.createItem())
                  }, [
                    t[37] || (t[37] = m("i", { class: "bi bi-plus-circle" }, null, -1)),
                    Y(" " + x(r.translate("New")), 1)
                  ]),
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[16] || (t[16] = (a) => r.copyItem())
                  }, [
                    t[38] || (t[38] = m("i", { class: "bi bi-copy" }, null, -1)),
                    Y(" " + x(r.translate("Copy")), 1)
                  ]),
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-danger m-1",
                    onClick: t[17] || (t[17] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[39] || (t[39] = m("i", { class: "bi bi-trash" }, null, -1)),
                    Y(" " + x(r.translate("Delete")), 1)
                  ], 8, FC)
                ]),
                m("div", null, [
                  i.messages.form.length ? (y(), _("div", HC, [
                    m("div", WC, [
                      m("button", {
                        class: D(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.form[0].priority]]),
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false",
                        innerHTML: i.messages.form.length + " " + (i.messages.form.length > 1 ? r.translate("messages") : r.translate("message"))
                      }, null, 10, zC),
                      m("ul", KC, [
                        (y(!0), _(W, null, z(i.messages.form, (a) => (y(), _("li", { key: a }, [
                          m("span", {
                            class: D(["dropdown-item", ["text-" + a.priority]])
                          }, [
                            m("small", GC, x(a.datetime), 1),
                            m("span", {
                              innerHTML: a.msg
                            }, null, 8, YC)
                          ], 2)
                        ]))), 128))
                      ])
                    ])
                  ])) : C("", !0),
                  m("button", XC, [
                    t[40] || (t[40] = m("i", { class: "bi bi-x" }, null, -1)),
                    Y(" " + x(r.translate("Close")), 1)
                  ]),
                  m("button", ZC, [
                    t[41] || (t[41] = m("i", { class: "bi bi-save" }, null, -1)),
                    Y(" " + x(r.translate("Save")), 1)
                  ]),
                  m("button", {
                    type: "button",
                    class: "btn btn-sm btn-success m-1",
                    onClick: t[18] || (t[18] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[42] || (t[42] = m("i", { class: "bi bi-save" }, null, -1)),
                    Y(" " + x(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : C("", !0),
              e.settings.form ? (y(), _("div", QC, [
                i.item && e.settings.form.groups ? (y(), ea(c, {
                  key: 0,
                  modelValue: i.item,
                  "onUpdate:modelValue": t[19] || (t[19] = (a) => i.item = a),
                  formid: s.formId,
                  settings: e.settings
                }, null, 8, ["modelValue", "formid", "settings"])) : C("", !0)
              ])) : C("", !0),
              i.item ? (y(), _("div", JC, [
                m("div", null, [
                  m("button", {
                    type: "button",
                    class: "btn btn-secondary m-1",
                    onClick: t[20] || (t[20] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[43] || (t[43] = m("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    Y(" " + x(r.translate("Reload")), 1)
                  ], 8, tS),
                  m("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[21] || (t[21] = (a) => r.createItem())
                  }, [
                    t[44] || (t[44] = m("i", { class: "bi bi-plus-circle" }, null, -1)),
                    Y(" " + x(r.translate("New")), 1)
                  ]),
                  m("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[22] || (t[22] = (a) => r.copyItem())
                  }, [
                    t[45] || (t[45] = m("i", { class: "bi bi-copy" }, null, -1)),
                    Y(" " + x(r.translate("Copy")), 1)
                  ]),
                  m("button", {
                    type: "button",
                    class: "btn btn-danger m-1",
                    onClick: t[23] || (t[23] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[46] || (t[46] = m("i", { class: "bi bi-trash" }, null, -1)),
                    Y(" " + x(r.translate("Delete")), 1)
                  ], 8, eS)
                ]),
                m("div", null, [
                  m("button", sS, [
                    t[47] || (t[47] = m("i", { class: "bi bi-x" }, null, -1)),
                    Y(" " + x(r.translate("Close")), 1)
                  ]),
                  m("button", nS, [
                    t[48] || (t[48] = m("i", { class: "bi bi-save" }, null, -1)),
                    Y(" " + x(r.translate("Save")), 1)
                  ]),
                  m("button", {
                    type: "button",
                    class: "btn btn-success m-1",
                    onClick: t[24] || (t[24] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[49] || (t[49] = m("i", { class: "bi bi-save" }, null, -1)),
                    Y(" " + x(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : C("", !0)
            ], 42, kC)) : C("", !0),
            e.settings.debug ? (y(), _("pre", iS, "        " + x(i.item) + `
      `, 1)) : C("", !0)
          ])
        ])
      ], 8, SC)
    ], 10, dN)
  ])) : C("", !0);
}
const oS = /* @__PURE__ */ kn(uN, [["render", rS], ["__scopeId", "data-v-44f04eab"]]), aS = {
  name: "VuAdmin",
  props: {
    entity: {
      type: String,
      required: !0
    }
  },
  init: (s) => {
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
      if (this.settings = fh(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, !this.settings.theme) {
        const s = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = s || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.1.2"), console.log(`Entity config (${this.entity}) initialized`));
    } else
      console.log("vu-admin ", "1.1.2"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: oS
  }
}, lS = { key: 0 }, cS = ["data-bs-theme"];
function uS(s, t, e, n, i, r) {
  const o = ai("vu-admin-table");
  return e.entity && i.settings ? (y(), _("div", lS, [
    m("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      hu(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, cS)
  ])) : C("", !0);
}
const hS = /* @__PURE__ */ kn(aS, [["render", uS]]), _S = {
  install(s) {
    s.component("VuAdmin", hS);
  }
};
export {
  hS as VuAdmin,
  _S as default
};
