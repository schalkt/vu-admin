var Sd = Object.defineProperty;
var xd = (s, t, e) => t in s ? Sd(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var D = (s, t, e) => xd(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as _, createElementBlock as v, createElementVNode as b, normalizeClass as M, Fragment as z, renderList as Y, toDisplayString as I, createCommentVNode as S, withDirectives as Q, vModelText as pe, createTextVNode as X, resolveComponent as oi, vModelSelect as Ie, createBlock as ea, vShow as ws, normalizeStyle as zn, withKeys as Oo, vModelDynamic as Hi, createVNode as hu, withModifiers as Ld } from "vue";
var At = "top", kt = "bottom", It = "right", wt = "left", Er = "auto", On = [At, kt, It, wt], Ss = "start", gn = "end", du = "clippingParents", Ma = "viewport", en = "popper", fu = "reference", sa = /* @__PURE__ */ On.reduce(function(s, t) {
  return s.concat([t + "-" + Ss, t + "-" + gn]);
}, []), qa = /* @__PURE__ */ [].concat(On, [Er]).reduce(function(s, t) {
  return s.concat([t, t + "-" + Ss, t + "-" + gn]);
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
function xs(s) {
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
function kd(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !Ft(r) || !_e(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? r.removeAttribute(o) : r.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function Id(s) {
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
      var i = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]), l = o.reduce(function(a, u) {
        return a[u] = "", a;
      }, {});
      !Ft(i) || !_e(i) || (Object.assign(i.style, l), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const $a = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: kd,
  effect: Id,
  requires: ["computeStyles"]
};
function ge(s) {
  return s.split("-")[0];
}
var Cs = Math.max, ur = Math.min, mn = Math.round;
function na() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function wu() {
  return !/^((?!chrome|android).)*safari/i.test(na());
}
function bn(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Ft(s) && (i = s.offsetWidth > 0 && mn(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && mn(n.height) / s.offsetHeight || 1);
  var o = xs(s) ? Rt(s) : window, l = o.visualViewport, a = !wu() && e, u = (n.left + (a && l ? l.offsetLeft : 0)) / i, h = (n.top + (a && l ? l.offsetTop : 0)) / r, f = n.width / i, p = n.height / r;
  return {
    width: f,
    height: p,
    top: h,
    right: u + f,
    bottom: h + p,
    left: u,
    x: u,
    y: h
  };
}
function Pa(s) {
  var t = bn(s), e = s.offsetWidth, n = s.offsetHeight;
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
function Rd(s) {
  return ["table", "td", "th"].indexOf(_e(s)) >= 0;
}
function is(s) {
  return ((xs(s) ? s.ownerDocument : (
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
function Dd(s) {
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
function mi(s) {
  for (var t = Rt(s), e = Cl(s); e && Rd(e) && Me(e).position === "static"; )
    e = Cl(e);
  return e && (_e(e) === "html" || _e(e) === "body" && Me(e).position === "static") ? t : e || Dd(s) || t;
}
function ja(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function ti(s, t, e) {
  return Cs(s, ur(t, e));
}
function Md(s, t, e) {
  var n = ti(s, t, e);
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
var qd = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Cu(typeof t != "number" ? t : Su(t, On));
};
function Bd(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, l = ge(e.placement), a = ja(l), u = [wt, It].indexOf(l) >= 0, h = u ? "height" : "width";
  if (!(!r || !o)) {
    var f = qd(i.padding, e), p = Pa(r), g = a === "y" ? At : wt, y = a === "y" ? kt : It, E = e.rects.reference[h] + e.rects.reference[a] - o[a] - e.rects.popper[h], T = o[a] - e.rects.reference[a], A = mi(r), N = A ? a === "y" ? A.clientHeight || 0 : A.clientWidth || 0 : 0, C = E / 2 - T / 2, x = f[g], k = N - p[h] - f[y], R = N / 2 - p[h] / 2 + C, P = ti(x, R, k), V = a;
    e.modifiersData[n] = (t = {}, t[V] = P, t.centerOffset = P - R, t);
  }
}
function $d(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Nu(t.elements.popper, i) && (t.elements.arrow = i));
}
const xu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Bd,
  effect: $d,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function yn(s) {
  return s.split("-")[1];
}
var Pd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function jd(s, t) {
  var e = s.x, n = s.y, i = t.devicePixelRatio || 1;
  return {
    x: mn(e * i) / i || 0,
    y: mn(n * i) / i || 0
  };
}
function Sl(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, l = s.position, a = s.gpuAcceleration, u = s.adaptive, h = s.roundOffsets, f = s.isFixed, p = o.x, g = p === void 0 ? 0 : p, y = o.y, E = y === void 0 ? 0 : y, T = typeof h == "function" ? h({
    x: g,
    y: E
  }) : {
    x: g,
    y: E
  };
  g = T.x, E = T.y;
  var A = o.hasOwnProperty("x"), N = o.hasOwnProperty("y"), C = wt, x = At, k = window;
  if (u) {
    var R = mi(e), P = "clientHeight", V = "clientWidth";
    if (R === Rt(e) && (R = is(e), Me(R).position !== "static" && l === "absolute" && (P = "scrollHeight", V = "scrollWidth")), R = R, i === At || (i === wt || i === It) && r === gn) {
      x = kt;
      var J = f && R === k && k.visualViewport ? k.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        R[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === wt || (i === At || i === kt) && r === gn) {
      C = It;
      var tt = f && R === k && k.visualViewport ? k.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        R[V]
      );
      g -= tt - n.width, g *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: l
  }, u && Pd), ot = h === !0 ? jd({
    x: g,
    y: E
  }, Rt(e)) : {
    x: g,
    y: E
  };
  if (g = ot.x, E = ot.y, a) {
    var it;
    return Object.assign({}, nt, (it = {}, it[x] = N ? "0" : "", it[C] = A ? "0" : "", it.transform = (k.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + E + "px)" : "translate3d(" + g + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[x] = N ? E + "px" : "", t[C] = A ? g + "px" : "", t.transform = "", t));
}
function Ud(s) {
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, l = e.roundOffsets, a = l === void 0 ? !0 : l, u = {
    placement: ge(t.placement),
    variation: yn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Sl(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Sl(Object.assign({}, u, {
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
  fn: Ud,
  data: {}
};
var Wi = {
  passive: !0
};
function Vd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, l = o === void 0 ? !0 : o, a = Rt(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && u.forEach(function(h) {
    h.addEventListener("scroll", e.update, Wi);
  }), l && a.addEventListener("resize", e.update, Wi), function() {
    r && u.forEach(function(h) {
      h.removeEventListener("scroll", e.update, Wi);
    }), l && a.removeEventListener("resize", e.update, Wi);
  };
}
const Va = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Vd,
  data: {}
};
var Fd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ir(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return Fd[t];
  });
}
var Hd = {
  start: "end",
  end: "start"
};
function xl(s) {
  return s.replace(/start|end/g, function(t) {
    return Hd[t];
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
  return bn(is(s)).left + Fa(s).scrollLeft;
}
function Wd(s, t) {
  var e = Rt(s), n = is(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, l = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var u = wu();
    (u || !u && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: l + Ha(s),
    y: a
  };
}
function Kd(s) {
  var t, e = is(s), n = Fa(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = Cs(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Cs(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Ha(s), a = -n.scrollTop;
  return Me(i || e).direction === "rtl" && (l += Cs(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: l,
    y: a
  };
}
function Wa(s) {
  var t = Me(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Lu(s) {
  return ["html", "body", "#document"].indexOf(_e(s)) >= 0 ? s.ownerDocument.body : Ft(s) && Wa(s) ? s : Lu(Tr(s));
}
function ei(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = Lu(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Wa(n) ? n : []) : n, l = t.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(ei(Tr(o)))
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
function zd(s, t) {
  var e = bn(s, !1, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Ll(s, t, e) {
  return t === Ma ? ia(Wd(s, e)) : xs(t) ? zd(t, e) : ia(Kd(is(s)));
}
function Gd(s) {
  var t = ei(Tr(s)), e = ["absolute", "fixed"].indexOf(Me(s).position) >= 0, n = e && Ft(s) ? mi(s) : s;
  return xs(n) ? t.filter(function(i) {
    return xs(i) && Nu(i, n) && _e(i) !== "body";
  }) : [];
}
function Yd(s, t, e, n) {
  var i = t === "clippingParents" ? Gd(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], l = r.reduce(function(a, u) {
    var h = Ll(s, u, n);
    return a.top = Cs(h.top, a.top), a.right = ur(h.right, a.right), a.bottom = ur(h.bottom, a.bottom), a.left = Cs(h.left, a.left), a;
  }, Ll(s, o, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function ku(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? ge(n) : null, r = n ? yn(n) : null, o = t.x + t.width / 2 - e.width / 2, l = t.y + t.height / 2 - e.height / 2, a;
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
        y: l
      };
      break;
    case wt:
      a = {
        x: t.x - e.width,
        y: l
      };
      break;
    default:
      a = {
        x: t.x,
        y: t.y
      };
  }
  var u = i ? ja(i) : null;
  if (u != null) {
    var h = u === "y" ? "height" : "width";
    switch (r) {
      case Ss:
        a[u] = a[u] - (t[h] / 2 - e[h] / 2);
        break;
      case gn:
        a[u] = a[u] + (t[h] / 2 - e[h] / 2);
        break;
    }
  }
  return a;
}
function _n(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, l = e.boundary, a = l === void 0 ? du : l, u = e.rootBoundary, h = u === void 0 ? Ma : u, f = e.elementContext, p = f === void 0 ? en : f, g = e.altBoundary, y = g === void 0 ? !1 : g, E = e.padding, T = E === void 0 ? 0 : E, A = Cu(typeof T != "number" ? T : Su(T, On)), N = p === en ? fu : en, C = s.rects.popper, x = s.elements[y ? N : p], k = Yd(xs(x) ? x : x.contextElement || is(s.elements.popper), a, h, o), R = bn(s.elements.reference), P = ku({
    reference: R,
    element: C,
    strategy: "absolute",
    placement: i
  }), V = ia(Object.assign({}, C, P)), J = p === en ? V : R, tt = {
    top: k.top - J.top + A.top,
    bottom: J.bottom - k.bottom + A.bottom,
    left: k.left - J.left + A.left,
    right: J.right - k.right + A.right
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
function Xd(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, l = e.flipVariations, a = e.allowedAutoPlacements, u = a === void 0 ? qa : a, h = yn(n), f = h ? l ? sa : sa.filter(function(y) {
    return yn(y) === h;
  }) : On, p = f.filter(function(y) {
    return u.indexOf(y) >= 0;
  });
  p.length === 0 && (p = f);
  var g = p.reduce(function(y, E) {
    return y[E] = _n(s, {
      placement: E,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[ge(E)], y;
  }, {});
  return Object.keys(g).sort(function(y, E) {
    return g[y] - g[E];
  });
}
function Zd(s) {
  if (ge(s) === Er)
    return [];
  var t = ir(s);
  return [xl(s), t, xl(t)];
}
function Qd(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, l = o === void 0 ? !0 : o, a = e.fallbackPlacements, u = e.padding, h = e.boundary, f = e.rootBoundary, p = e.altBoundary, g = e.flipVariations, y = g === void 0 ? !0 : g, E = e.allowedAutoPlacements, T = t.options.placement, A = ge(T), N = A === T, C = a || (N || !y ? [ir(T)] : Zd(T)), x = [T].concat(C).reduce(function(Gt, H) {
      return Gt.concat(ge(H) === Er ? Xd(t, {
        placement: H,
        boundary: h,
        rootBoundary: f,
        padding: u,
        flipVariations: y,
        allowedAutoPlacements: E
      }) : H);
    }, []), k = t.rects.reference, R = t.rects.popper, P = /* @__PURE__ */ new Map(), V = !0, J = x[0], tt = 0; tt < x.length; tt++) {
      var nt = x[tt], ot = ge(nt), it = yn(nt) === Ss, Mt = [At, kt].indexOf(ot) >= 0, qt = Mt ? "width" : "height", ut = _n(t, {
        placement: nt,
        boundary: h,
        rootBoundary: f,
        altBoundary: p,
        padding: u
      }), vt = Mt ? it ? It : wt : it ? kt : At;
      k[qt] > R[qt] && (vt = ir(vt));
      var Ve = ir(vt), zt = [];
      if (r && zt.push(ut[ot] <= 0), l && zt.push(ut[vt] <= 0, ut[Ve] <= 0), zt.every(function(Gt) {
        return Gt;
      })) {
        J = nt, V = !1;
        break;
      }
      P.set(nt, zt);
    }
    if (V)
      for (var W = y ? 3 : 1, cs = function(H) {
        var ae = x.find(function(Fe) {
          var at = P.get(Fe);
          if (at)
            return at.slice(0, H).every(function(He) {
              return He;
            });
        });
        if (ae)
          return J = ae, "break";
      }, Ae = W; Ae > 0; Ae--) {
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
  fn: Qd,
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
function Jd(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = _n(t, {
    elementContext: "reference"
  }), l = _n(t, {
    altBoundary: !0
  }), a = kl(o, n), u = kl(l, i, r), h = Il(a), f = Il(u);
  t.modifiersData[e] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
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
  fn: Jd
};
function tf(s, t, e) {
  var n = ge(s), i = [wt, At].indexOf(n) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: s
  })) : e, o = r[0], l = r[1];
  return o = o || 0, l = (l || 0) * i, [wt, It].indexOf(n) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function ef(s) {
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = qa.reduce(function(h, f) {
    return h[f] = tf(f, t.rects, r), h;
  }, {}), l = o[t.placement], a = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = o;
}
const Du = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ef
};
function sf(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = ku({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ka = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: sf,
  data: {}
};
function nf(s) {
  return s === "x" ? "y" : "x";
}
function rf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, l = o === void 0 ? !1 : o, a = e.boundary, u = e.rootBoundary, h = e.altBoundary, f = e.padding, p = e.tether, g = p === void 0 ? !0 : p, y = e.tetherOffset, E = y === void 0 ? 0 : y, T = _n(t, {
    boundary: a,
    rootBoundary: u,
    padding: f,
    altBoundary: h
  }), A = ge(t.placement), N = yn(t.placement), C = !N, x = ja(A), k = nf(x), R = t.modifiersData.popperOffsets, P = t.rects.reference, V = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
      var it, Mt = x === "y" ? At : wt, qt = x === "y" ? kt : It, ut = x === "y" ? "height" : "width", vt = R[x], Ve = vt + T[Mt], zt = vt - T[qt], W = g ? -V[ut] / 2 : 0, cs = N === Ss ? P[ut] : V[ut], Ae = N === Ss ? -V[ut] : -P[ut], pt = t.elements.arrow, Gt = g && pt ? Pa(pt) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ou(), ae = H[Mt], Fe = H[qt], at = ti(0, P[ut], Gt[ut]), He = C ? P[ut] / 2 - W - at - ae - tt.mainAxis : cs - at - ae - tt.mainAxis, Vs = C ? -P[ut] / 2 + W + at + Fe + tt.mainAxis : Ae + at + Fe + tt.mainAxis, we = t.elements.arrow && mi(t.elements.arrow), us = we ? x === "y" ? we.clientTop || 0 : we.clientLeft || 0 : 0, hs = (it = nt == null ? void 0 : nt[x]) != null ? it : 0, ds = vt + He - hs - us, Fs = vt + Vs - hs, We = ti(g ? ur(Ve, ds) : Ve, vt, g ? Cs(zt, Fs) : zt);
      R[x] = We, ot[x] = We - vt;
    }
    if (l) {
      var fs, kn = x === "x" ? At : wt, In = x === "x" ? kt : It, Nt = R[k], le = k === "y" ? "height" : "width", ps = Nt + T[kn], gs = Nt - T[In], Ot = [At, wt].indexOf(A) !== -1, Ne = (fs = nt == null ? void 0 : nt[k]) != null ? fs : 0, Hs = Ot ? ps : Nt - P[le] - V[le] - Ne + tt.altAxis, ce = Ot ? Nt + P[le] + V[le] - Ne - tt.altAxis : gs, Oe = g && Ot ? Md(Hs, Nt, ce) : ti(g ? Hs : ps, Nt, g ? ce : gs);
      R[k] = Oe, ot[k] = Oe - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const Mu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: rf,
  requiresIfExists: ["offset"]
};
function of(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
}
function af(s) {
  return s === Rt(s) || !Ft(s) ? Fa(s) : of(s);
}
function lf(s) {
  var t = s.getBoundingClientRect(), e = mn(t.width) / s.offsetWidth || 1, n = mn(t.height) / s.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function cf(s, t, e) {
  e === void 0 && (e = !1);
  var n = Ft(t), i = Ft(t) && lf(t), r = is(t), o = bn(s, i, e), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((_e(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Wa(r)) && (l = af(t)), Ft(t) ? (a = bn(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Ha(r))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function uf(s) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), n = [];
  s.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    e.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(l) {
      if (!e.has(l)) {
        var a = t.get(l);
        a && i(a);
      }
    }), n.push(r);
  }
  return s.forEach(function(r) {
    e.has(r.name) || i(r);
  }), n;
}
function hf(s) {
  var t = uf(s);
  return Au.reduce(function(e, n) {
    return e.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function df(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(s());
      });
    })), t;
  };
}
function ff(s) {
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
  return function(l, a, u) {
    u === void 0 && (u = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Rl, r),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, g = {
      state: h,
      setOptions: function(A) {
        var N = typeof A == "function" ? A(h.options) : A;
        E(), h.options = Object.assign({}, r, h.options, N), h.scrollParents = {
          reference: xs(l) ? ei(l) : l.contextElement ? ei(l.contextElement) : [],
          popper: ei(a)
        };
        var C = hf(ff([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = C.filter(function(x) {
          return x.enabled;
        }), y(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var A = h.elements, N = A.reference, C = A.popper;
          if (Dl(N, C)) {
            h.rects = {
              reference: cf(N, mi(C), h.options.strategy === "fixed"),
              popper: Pa(C)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(tt) {
              return h.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var x = 0; x < h.orderedModifiers.length; x++) {
              if (h.reset === !0) {
                h.reset = !1, x = -1;
                continue;
              }
              var k = h.orderedModifiers[x], R = k.fn, P = k.options, V = P === void 0 ? {} : P, J = k.name;
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
      update: df(function() {
        return new Promise(function(T) {
          g.forceUpdate(), T(h);
        });
      }),
      destroy: function() {
        E(), p = !0;
      }
    };
    if (!Dl(l, a))
      return g;
    g.setOptions(u).then(function(T) {
      !p && u.onFirstUpdate && u.onFirstUpdate(T);
    });
    function y() {
      h.orderedModifiers.forEach(function(T) {
        var A = T.name, N = T.options, C = N === void 0 ? {} : N, x = T.effect;
        if (typeof x == "function") {
          var k = x({
            state: h,
            name: A,
            instance: g,
            options: C
          }), R = function() {
          };
          f.push(k || R);
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
var pf = /* @__PURE__ */ Ar(), gf = [Va, Ka, Ua, $a], mf = /* @__PURE__ */ Ar({
  defaultModifiers: gf
}), bf = [Va, Ka, Ua, $a, Du, Iu, Mu, xu, Ru], za = /* @__PURE__ */ Ar({
  defaultModifiers: bf
});
const qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: _u,
  afterRead: mu,
  afterWrite: Tu,
  applyStyles: $a,
  arrow: xu,
  auto: Er,
  basePlacements: On,
  beforeMain: bu,
  beforeRead: pu,
  beforeWrite: vu,
  bottom: kt,
  clippingParents: du,
  computeStyles: Ua,
  createPopper: za,
  createPopperBase: pf,
  createPopperLite: mf,
  detectOverflow: _n,
  end: gn,
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
  popperOffsets: Ka,
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
}, yf = 1e6, _f = 1e3, ra = "transitionend", Bu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), vf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Ef = (s) => {
  do
    s += Math.floor(Math.random() * yf);
  while (document.getElementById(s));
  return s;
}, Tf = (s) => {
  if (!s)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: e
  } = window.getComputedStyle(s);
  const n = Number.parseFloat(t), i = Number.parseFloat(e);
  return !n && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * _f);
}, $u = (s) => {
  s.dispatchEvent(new Event(ra));
}, Re = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), ts = (s) => Re(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Bu(s)) : null, Cn = (s) => {
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
}, bi = (s) => {
  s.offsetHeight;
}, ju = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, So = [], Af = (s) => {
  document.readyState === "loading" ? (So.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of So)
      t();
  }), So.push(s)) : s();
}, Ht = () => document.documentElement.dir === "rtl", Kt = (s) => {
  Af(() => {
    const t = ju();
    if (t) {
      const e = s.NAME, n = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface);
    }
  });
}, xt = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e, Uu = (s, t, e = !0) => {
  if (!e) {
    xt(s);
    return;
  }
  const i = Tf(t) + 5;
  let r = !1;
  const o = ({
    target: l
  }) => {
    l === t && (r = !0, t.removeEventListener(ra, o), xt(s));
  };
  t.addEventListener(ra, o), setTimeout(() => {
    r || $u(t);
  }, i);
}, Ga = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, wf = /[^.]*(?=\..*)\.|.*/, Nf = /\..*/, Of = /::\d+$/, xo = {};
let Ml = 1;
const Vu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Cf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Fu(s, t) {
  return t && `${t}::${Ml++}` || s.uidEvent || Ml++;
}
function Hu(s) {
  const t = Fu(s);
  return s.uidEvent = t, xo[t] = xo[t] || {}, xo[t];
}
function Sf(s, t) {
  return function e(n) {
    return Ya(n, {
      delegateTarget: s
    }), e.oneOff && L.off(s, n.type, t), t.apply(s, [n]);
  };
}
function xf(s, t, e) {
  return function n(i) {
    const r = s.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const l of r)
        if (l === o)
          return Ya(i, {
            delegateTarget: o
          }), n.oneOff && L.off(s, i.type, t, e), e.apply(o, [i]);
  };
}
function Wu(s, t, e = null) {
  return Object.values(s).find((n) => n.callable === t && n.delegationSelector === e);
}
function Ku(s, t, e) {
  const n = typeof t == "string", i = n ? e : t || e;
  let r = zu(s);
  return Cf.has(r) || (r = s), [n, i, r];
}
function ql(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, l] = Ku(t, e, n);
  t in Vu && (o = ((y) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return y.call(this, E);
  })(o));
  const a = Hu(s), u = a[l] || (a[l] = {}), h = Wu(u, o, r ? e : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const f = Fu(o, t.replace(wf, "")), p = r ? xf(s, e, o) : Sf(s, o);
  p.delegationSelector = r ? e : null, p.callable = o, p.oneOff = i, p.uidEvent = f, u[f] = p, s.addEventListener(l, p, r);
}
function oa(s, t, e, n, i) {
  const r = Wu(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function Lf(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && oa(s, t, e, o.callable, o.delegationSelector);
}
function zu(s) {
  return s = s.replace(Nf, ""), Vu[s] || s;
}
const L = {
  on(s, t, e, n) {
    ql(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    ql(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = Ku(t, e, n), l = o !== t, a = Hu(s), u = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(u).length)
        return;
      oa(s, a, o, r, i ? e : null);
      return;
    }
    if (h)
      for (const f of Object.keys(a))
        Lf(s, a, f, t.slice(1));
    for (const [f, p] of Object.entries(u)) {
      const g = f.replace(Of, "");
      (!l || t.includes(g)) && oa(s, a, o, p.callable, p.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = ju(), i = zu(t), r = t !== i;
    let o = null, l = !0, a = !0, u = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), l = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), u = o.isDefaultPrevented());
    const h = Ya(new Event(t, {
      bubbles: l,
      cancelable: !0
    }), e);
    return u && h.preventDefault(), a && s.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
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
function Lo(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const De = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-bs-${Lo(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-bs-${Lo(t)}`);
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
    return Bl(s.getAttribute(`data-bs-${Lo(t)}`));
  }
};
class yi {
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
      const r = t[n], o = Re(r) ? "element" : vf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const kf = "5.3.3";
class ne extends yi {
  constructor(t, e) {
    super(), t = ts(t), t && (this._element = t, this._config = this._getConfig(e), Co.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Co.remove(this._element, this.constructor.DATA_KEY), L.off(this._element, this.constructor.EVENT_KEY);
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
    return kf;
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
    return this.find(t, s).filter((e) => !es(e) && Cn(e));
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
  L.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), es(this))
      return;
    const r = U.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, If = "alert", Rf = "bs.alert", Gu = `.${Rf}`, Df = `close${Gu}`, Mf = `closed${Gu}`, qf = "fade", Bf = "show";
class Nr extends ne {
  // Getters
  static get NAME() {
    return If;
  }
  // Public
  close() {
    if (L.trigger(this._element, Df).defaultPrevented)
      return;
    this._element.classList.remove(Bf);
    const e = this._element.classList.contains(qf);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  // Private
  _destroyElement() {
    this._element.remove(), L.trigger(this._element, Mf), this.dispose();
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
Kt(Nr);
const $f = "button", Pf = "bs.button", jf = `.${Pf}`, Uf = ".data-api", Vf = "active", $l = '[data-bs-toggle="button"]', Ff = `click${jf}${Uf}`;
class Or extends ne {
  // Getters
  static get NAME() {
    return $f;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Vf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Or.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
L.on(document, Ff, $l, (s) => {
  s.preventDefault();
  const t = s.target.closest($l);
  Or.getOrCreateInstance(t).toggle();
});
Kt(Or);
const Hf = "swipe", Sn = ".bs.swipe", Wf = `touchstart${Sn}`, Kf = `touchmove${Sn}`, zf = `touchend${Sn}`, Gf = `pointerdown${Sn}`, Yf = `pointerup${Sn}`, Xf = "touch", Zf = "pen", Qf = "pointer-event", Jf = 40, tp = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, ep = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class dr extends yi {
  constructor(t, e) {
    super(), this._element = t, !(!t || !dr.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return tp;
  }
  static get DefaultType() {
    return ep;
  }
  static get NAME() {
    return Hf;
  }
  // Public
  dispose() {
    L.off(this._element, Sn);
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
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), xt(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= Jf)
      return;
    const e = t / this._deltaX;
    this._deltaX = 0, e && xt(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (L.on(this._element, Gf, (t) => this._start(t)), L.on(this._element, Yf, (t) => this._end(t)), this._element.classList.add(Qf)) : (L.on(this._element, Wf, (t) => this._start(t)), L.on(this._element, Kf, (t) => this._move(t)), L.on(this._element, zf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === Zf || t.pointerType === Xf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const sp = "carousel", np = "bs.carousel", rs = `.${np}`, Yu = ".data-api", ip = "ArrowLeft", rp = "ArrowRight", op = 500, Gn = "next", Js = "prev", sn = "left", rr = "right", ap = `slide${rs}`, Io = `slid${rs}`, lp = `keydown${rs}`, cp = `mouseenter${rs}`, up = `mouseleave${rs}`, hp = `dragstart${rs}`, dp = `load${rs}${Yu}`, fp = `click${rs}${Yu}`, Xu = "carousel", Ki = "active", pp = "slide", gp = "carousel-item-end", mp = "carousel-item-start", bp = "carousel-item-next", yp = "carousel-item-prev", Zu = ".active", Qu = ".carousel-item", _p = Zu + Qu, vp = ".carousel-item img", Ep = ".carousel-indicators", Tp = "[data-bs-slide], [data-bs-slide-to]", Ap = '[data-bs-ride="carousel"]', wp = {
  [ip]: rr,
  [rp]: sn
}, Np = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, Op = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class _i extends ne {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = U.findOne(Ep, this._element), this._addEventListeners(), this._config.ride === Xu && this.cycle();
  }
  // Getters
  static get Default() {
    return Np;
  }
  static get DefaultType() {
    return Op;
  }
  static get NAME() {
    return sp;
  }
  // Public
  next() {
    this._slide(Gn);
  }
  nextWhenVisible() {
    !document.hidden && Cn(this._element) && this.next();
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
        L.one(this._element, Io, () => this.cycle());
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
      L.one(this._element, Io, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Gn : Js;
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
    this._config.keyboard && L.on(this._element, lp, (t) => this._keydown(t)), this._config.pause === "hover" && (L.on(this._element, cp, () => this.pause()), L.on(this._element, up, () => this._maybeEnableCycle())), this._config.touch && dr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of U.find(vp, this._element))
      L.on(n, hp, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(sn)),
      rightCallback: () => this._slide(this._directionToOrder(rr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), op + this._config.interval));
      }
    };
    this._swipeHelper = new dr(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = wp[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const e = U.findOne(Zu, this._indicatorsElement);
    e.classList.remove(Ki), e.removeAttribute("aria-current");
    const n = U.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Ki), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === Gn, r = e || Ga(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), l = (g) => L.trigger(this._element, g, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (l(ap).defaultPrevented || !n || !r)
      return;
    const u = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? mp : gp, f = i ? bp : yp;
    r.classList.add(f), bi(r), n.classList.add(h), r.classList.add(h);
    const p = () => {
      r.classList.remove(h, f), r.classList.add(Ki), n.classList.remove(Ki, f, h), this._isSliding = !1, l(Io);
    };
    this._queueCallback(p, n, this._isAnimated()), u && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(pp);
  }
  _getActive() {
    return U.findOne(_p, this._element);
  }
  _getItems() {
    return U.find(Qu, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Ht() ? t === sn ? Js : Gn : t === sn ? Gn : Js;
  }
  _orderToDirection(t) {
    return Ht() ? t === Js ? sn : rr : t === Js ? rr : sn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = _i.getOrCreateInstance(this, t);
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
L.on(document, fp, Tp, function(s) {
  const t = U.getElementFromSelector(this);
  if (!t || !t.classList.contains(Xu))
    return;
  s.preventDefault();
  const e = _i.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
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
L.on(window, dp, () => {
  const s = U.find(Ap);
  for (const t of s)
    _i.getOrCreateInstance(t);
});
Kt(_i);
const Cp = "collapse", Sp = "bs.collapse", vi = `.${Sp}`, xp = ".data-api", Lp = `show${vi}`, kp = `shown${vi}`, Ip = `hide${vi}`, Rp = `hidden${vi}`, Dp = `click${vi}${xp}`, Ro = "show", hn = "collapse", zi = "collapsing", Mp = "collapsed", qp = `:scope .${hn} .${hn}`, Bp = "collapse-horizontal", $p = "width", Pp = "height", jp = ".collapse.show, .collapse.collapsing", aa = '[data-bs-toggle="collapse"]', Up = {
  parent: null,
  toggle: !0
}, Vp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class ai extends ne {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = U.find(aa);
    for (const i of n) {
      const r = U.getSelectorFromElement(i), o = U.find(r).filter((l) => l === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Up;
  }
  static get DefaultType() {
    return Vp;
  }
  static get NAME() {
    return Cp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(jp).filter((l) => l !== this._element).map((l) => ai.getOrCreateInstance(l, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || L.trigger(this._element, Lp).defaultPrevented)
      return;
    for (const l of t)
      l.hide();
    const n = this._getDimension();
    this._element.classList.remove(hn), this._element.classList.add(zi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(zi), this._element.classList.add(hn, Ro), this._element.style[n] = "", L.trigger(this._element, kp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || L.trigger(this._element, Ip).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, bi(this._element), this._element.classList.add(zi), this._element.classList.remove(hn, Ro);
    for (const i of this._triggerArray) {
      const r = U.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(zi), this._element.classList.add(hn), L.trigger(this._element, Rp);
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
    return this._element.classList.contains(Bp) ? $p : Pp;
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
    const e = U.find(qp, this._config.parent);
    return U.find(t, this._config.parent).filter((n) => !e.includes(n));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(Mp, !e), n.setAttribute("aria-expanded", e);
  }
  // Static
  static jQueryInterface(t) {
    const e = {};
    return typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1), this.each(function() {
      const n = ai.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
L.on(document, Dp, aa, function(s) {
  (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
  for (const t of U.getMultipleElementsFromSelector(this))
    ai.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Kt(ai);
const Pl = "dropdown", Fp = "bs.dropdown", Ds = `.${Fp}`, Xa = ".data-api", Hp = "Escape", jl = "Tab", Wp = "ArrowUp", Ul = "ArrowDown", Kp = 2, zp = `hide${Ds}`, Gp = `hidden${Ds}`, Yp = `show${Ds}`, Xp = `shown${Ds}`, Ju = `click${Ds}${Xa}`, th = `keydown${Ds}${Xa}`, Zp = `keyup${Ds}${Xa}`, nn = "show", Qp = "dropup", Jp = "dropend", tg = "dropstart", eg = "dropup-center", sg = "dropdown-center", Ns = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', ng = `${Ns}.${nn}`, or = ".dropdown-menu", ig = ".navbar", rg = ".navbar-nav", og = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", ag = Ht() ? "top-end" : "top-start", lg = Ht() ? "top-start" : "top-end", cg = Ht() ? "bottom-end" : "bottom-start", ug = Ht() ? "bottom-start" : "bottom-end", hg = Ht() ? "left-start" : "right-start", dg = Ht() ? "right-start" : "left-start", fg = "top", pg = "bottom", gg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, mg = {
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
    return gg;
  }
  static get DefaultType() {
    return mg;
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
    if (!L.trigger(this._element, Yp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(rg))
        for (const n of [].concat(...document.body.children))
          L.on(n, "mouseover", hr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(nn), this._element.classList.add(nn), L.trigger(this._element, Xp, t);
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
    if (!L.trigger(this._element, zp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          L.off(n, "mouseover", hr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(nn), this._element.classList.remove(nn), this._element.setAttribute("aria-expanded", "false"), De.removeDataAttribute(this._menu, "popper"), L.trigger(this._element, Gp, t);
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
    this._popper = za(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(nn);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Jp))
      return hg;
    if (t.classList.contains(tg))
      return dg;
    if (t.classList.contains(eg))
      return fg;
    if (t.classList.contains(sg))
      return pg;
    const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Qp) ? e ? lg : ag : e ? ug : cg;
  }
  _detectNavbar() {
    return this._element.closest(ig) !== null;
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
      ...xt(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({
    key: t,
    target: e
  }) {
    const n = U.find(og, this._menu).filter((i) => Cn(i));
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
    if (t.button === Kp || t.type === "keyup" && t.key !== jl)
      return;
    const e = U.find(ng);
    for (const n of e) {
      const i = me.getInstance(n);
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
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === Hp, i = [Wp, Ul].includes(t.key);
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
L.on(document, th, Ns, me.dataApiKeydownHandler);
L.on(document, th, or, me.dataApiKeydownHandler);
L.on(document, Ju, me.clearMenus);
L.on(document, Zp, me.clearMenus);
L.on(document, Ju, Ns, function(s) {
  s.preventDefault(), me.getOrCreateInstance(this).toggle();
});
Kt(me);
const eh = "backdrop", bg = "fade", Vl = "show", Fl = `mousedown.bs.${eh}`, yg = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, _g = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class sh extends yi {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return yg;
  }
  static get DefaultType() {
    return _g;
  }
  static get NAME() {
    return eh;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      xt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && bi(e), e.classList.add(Vl), this._emulateAnimation(() => {
      xt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      xt(t);
      return;
    }
    this._getElement().classList.remove(Vl), this._emulateAnimation(() => {
      this.dispose(), xt(t);
    });
  }
  dispose() {
    this._isAppended && (L.off(this._element, Fl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(bg), this._element = t;
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
    this._config.rootElement.append(t), L.on(t, Fl, () => {
      xt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Uu(t, this._getElement(), this._config.isAnimated);
  }
}
const vg = "focustrap", Eg = "bs.focustrap", fr = `.${Eg}`, Tg = `focusin${fr}`, Ag = `keydown.tab${fr}`, wg = "Tab", Ng = "forward", Hl = "backward", Og = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Cg = {
  autofocus: "boolean",
  trapElement: "element"
};
class nh extends yi {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Og;
  }
  static get DefaultType() {
    return Cg;
  }
  static get NAME() {
    return vg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), L.off(document, fr), L.on(document, Tg, (t) => this._handleFocusin(t)), L.on(document, Ag, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, L.off(document, fr));
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
    t.key === wg && (this._lastTabNavDirection = t.shiftKey ? Hl : Ng);
  }
}
const Wl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Kl = ".sticky-top", Gi = "padding-right", zl = "margin-right";
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Gi, (e) => e + t), this._setElementAttributes(Wl, Gi, (e) => e + t), this._setElementAttributes(Kl, zl, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Gi), this._resetElementAttributes(Wl, Gi), this._resetElementAttributes(Kl, zl);
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
      const l = window.getComputedStyle(o).getPropertyValue(e);
      o.style.setProperty(e, `${n(Number.parseFloat(l))}px`);
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
const Sg = "modal", xg = "bs.modal", Wt = `.${xg}`, Lg = ".data-api", kg = "Escape", Ig = `hide${Wt}`, Rg = `hidePrevented${Wt}`, ih = `hidden${Wt}`, rh = `show${Wt}`, Dg = `shown${Wt}`, Mg = `resize${Wt}`, qg = `click.dismiss${Wt}`, Bg = `mousedown.dismiss${Wt}`, $g = `keydown.dismiss${Wt}`, Pg = `click${Wt}${Lg}`, Gl = "modal-open", jg = "fade", Yl = "show", Do = "modal-static", Ug = ".modal.show", Vg = ".modal-dialog", Fg = ".modal-body", Hg = '[data-bs-toggle="modal"]', Wg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Kg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Ls extends ne {
  constructor(t, e) {
    super(t, e), this._dialog = U.findOne(Vg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new la(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Wg;
  }
  static get DefaultType() {
    return Kg;
  }
  static get NAME() {
    return Sg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || L.trigger(this._element, rh, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Gl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || L.trigger(this._element, Ig).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Yl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    L.off(window, Wt), L.off(this._dialog, Wt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
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
    const e = U.findOne(Fg, this._dialog);
    e && (e.scrollTop = 0), bi(this._element), this._element.classList.add(Yl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, L.trigger(this._element, Dg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    L.on(this._element, $g, (t) => {
      if (t.key === kg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), L.on(window, Mg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), L.on(this._element, Bg, (t) => {
      L.one(this._element, qg, (e) => {
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
      document.body.classList.remove(Gl), this._resetAdjustments(), this._scrollBar.reset(), L.trigger(this._element, ih);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(jg);
  }
  _triggerBackdropTransition() {
    if (L.trigger(this._element, Rg).defaultPrevented)
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
      const n = Ls.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](e);
      }
    });
  }
}
L.on(document, Pg, Hg, function(s) {
  const t = U.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), L.one(t, rh, (i) => {
    i.defaultPrevented || L.one(t, ih, () => {
      Cn(this) && this.focus();
    });
  });
  const e = U.findOne(Ug);
  e && Ls.getInstance(e).hide(), Ls.getOrCreateInstance(t).toggle(this);
});
wr(Ls);
Kt(Ls);
const zg = "offcanvas", Gg = "bs.offcanvas", Pe = `.${Gg}`, oh = ".data-api", Yg = `load${Pe}${oh}`, Xg = "Escape", Xl = "show", Zl = "showing", Ql = "hiding", Zg = "offcanvas-backdrop", ah = ".offcanvas.show", Qg = `show${Pe}`, Jg = `shown${Pe}`, tm = `hide${Pe}`, Jl = `hidePrevented${Pe}`, lh = `hidden${Pe}`, em = `resize${Pe}`, sm = `click${Pe}${oh}`, nm = `keydown.dismiss${Pe}`, im = '[data-bs-toggle="offcanvas"]', rm = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, om = {
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
    return rm;
  }
  static get DefaultType() {
    return om;
  }
  static get NAME() {
    return zg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || L.trigger(this._element, Qg, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new la().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Zl);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Xl), this._element.classList.remove(Zl), L.trigger(this._element, Jg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || L.trigger(this._element, tm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Ql), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(Xl, Ql), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new la().reset(), L.trigger(this._element, lh);
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
        L.trigger(this._element, Jl);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new sh({
      className: Zg,
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
    L.on(this._element, nm, (t) => {
      if (t.key === Xg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        L.trigger(this._element, Jl);
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
L.on(document, sm, im, function(s) {
  const t = U.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), es(this))
    return;
  L.one(t, lh, () => {
    Cn(this) && this.focus();
  });
  const e = U.findOne(ah);
  e && e !== t && ss.getInstance(e).hide(), ss.getOrCreateInstance(t).toggle(this);
});
L.on(window, Yg, () => {
  for (const s of U.find(ah))
    ss.getOrCreateInstance(s).show();
});
L.on(window, em, () => {
  for (const s of U.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && ss.getOrCreateInstance(s).hide();
});
wr(ss);
Kt(ss);
const am = /^aria-[\w-]*$/i, ch = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", am],
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
}, lm = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), cm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, um = (s, t) => {
  const e = s.nodeName.toLowerCase();
  return t.includes(e) ? lm.has(e) ? !!cm.test(s.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(e));
};
function hm(s, t, e) {
  if (!s.length)
    return s;
  if (e && typeof e == "function")
    return e(s);
  const i = new window.DOMParser().parseFromString(s, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const o of r) {
    const l = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(l)) {
      o.remove();
      continue;
    }
    const a = [].concat(...o.attributes), u = [].concat(t["*"] || [], t[l] || []);
    for (const h of a)
      um(h, u) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const dm = "TemplateFactory", fm = {
  allowList: ch,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, pm = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, gm = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class mm extends yi {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return fm;
  }
  static get DefaultType() {
    return pm;
  }
  static get NAME() {
    return dm;
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
      }, gm);
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
    return this._config.sanitize ? hm(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return xt(t, [this]);
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      e.innerHTML = "", e.append(t);
      return;
    }
    e.textContent = t.textContent;
  }
}
const bm = "tooltip", ym = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Mo = "fade", _m = "modal", Yi = "show", vm = ".tooltip-inner", tc = `.${_m}`, ec = "hide.bs.modal", Yn = "hover", qo = "focus", Em = "click", Tm = "manual", Am = "hide", wm = "hidden", Nm = "show", Om = "shown", Cm = "inserted", Sm = "click", xm = "focusin", Lm = "focusout", km = "mouseenter", Im = "mouseleave", Rm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Ht() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Ht() ? "right" : "left"
}, Dm = {
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
}, Mm = {
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
    return Dm;
  }
  static get DefaultType() {
    return Mm;
  }
  static get NAME() {
    return bm;
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
    clearTimeout(this._timeout), L.off(this._element.closest(tc), ec, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = L.trigger(this._element, this.constructor.eventName(Nm)), n = (Pu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), L.trigger(this._element, this.constructor.eventName(Cm))), this._popper = this._createPopper(i), i.classList.add(Yi), "ontouchstart" in document.documentElement)
      for (const l of [].concat(...document.body.children))
        L.on(l, "mouseover", hr);
    const o = () => {
      L.trigger(this._element, this.constructor.eventName(Om)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || L.trigger(this._element, this.constructor.eventName(Am)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Yi), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        L.off(i, "mouseover", hr);
    this._activeTrigger[Em] = !1, this._activeTrigger[qo] = !1, this._activeTrigger[Yn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), L.trigger(this._element, this.constructor.eventName(wm)));
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
    const n = Ef(this.constructor.NAME).toString();
    return e.setAttribute("id", n), this._isAnimated() && e.classList.add(Mo), e;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new mm({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [vm]: this._getTitle()
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
    const e = xt(this._config.placement, [this, t, this._element]), n = Rm[e.toUpperCase()];
    return za(this._element, t, this._getPopperConfig(n));
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((e) => Number.parseInt(e, 10)) : typeof t == "function" ? (e) => t(e, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return xt(t, [this._element]);
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
      ...xt(this._config.popperConfig, [e])
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        L.on(this._element, this.constructor.eventName(Sm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (e !== Tm) {
        const n = e === Yn ? this.constructor.eventName(km) : this.constructor.eventName(xm), i = e === Yn ? this.constructor.eventName(Im) : this.constructor.eventName(Lm);
        L.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? qo : Yn] = !0, o._enter();
        }), L.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? qo : Yn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, L.on(this._element.closest(tc), ec, this._hideModalHandler);
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
      ym.has(n) && delete e[n];
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
Kt(Cr);
const qm = "popover", Bm = ".popover-header", $m = ".popover-body", Pm = {
  ...Cr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, jm = {
  ...Cr.DefaultType,
  content: "(null|string|element|function)"
};
class Za extends Cr {
  // Getters
  static get Default() {
    return Pm;
  }
  static get DefaultType() {
    return jm;
  }
  static get NAME() {
    return qm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Bm]: this._getTitle(),
      [$m]: this._getContent()
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
Kt(Za);
const Um = "scrollspy", Vm = "bs.scrollspy", Qa = `.${Vm}`, Fm = ".data-api", Hm = `activate${Qa}`, sc = `click${Qa}`, Wm = `load${Qa}${Fm}`, Km = "dropdown-item", tn = "active", zm = '[data-bs-spy="scroll"]', Bo = "[href]", Gm = ".nav, .list-group", nc = ".nav-link", Ym = ".nav-item", Xm = ".list-group-item", Zm = `${nc}, ${Ym} > ${nc}, ${Xm}`, Qm = ".dropdown", Jm = ".dropdown-toggle", tb = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, eb = {
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
    return tb;
  }
  static get DefaultType() {
    return eb;
  }
  static get NAME() {
    return Um;
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
    this._config.smoothScroll && (L.off(this._config.target, sc), L.on(this._config.target, sc, Bo, (t) => {
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
    const t = U.find(Bo, this._config.target);
    for (const e of t) {
      if (!e.hash || es(e))
        continue;
      const n = U.findOne(decodeURI(e.hash), this._element);
      Cn(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(tn), this._activateParents(t), L.trigger(this._element, Hm, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Km)) {
      U.findOne(Jm, t.closest(Qm)).classList.add(tn);
      return;
    }
    for (const e of U.parents(t, Gm))
      for (const n of U.prev(e, Zm))
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
L.on(window, Wm, () => {
  for (const s of U.find(zm))
    Sr.getOrCreateInstance(s);
});
Kt(Sr);
const sb = "tab", nb = "bs.tab", Ms = `.${nb}`, ib = `hide${Ms}`, rb = `hidden${Ms}`, ob = `show${Ms}`, ab = `shown${Ms}`, lb = `click${Ms}`, cb = `keydown${Ms}`, ub = `load${Ms}`, hb = "ArrowLeft", ic = "ArrowRight", db = "ArrowUp", rc = "ArrowDown", $o = "Home", oc = "End", Os = "active", ac = "fade", Po = "show", fb = "dropdown", hh = ".dropdown-toggle", pb = ".dropdown-menu", jo = `:not(${hh})`, gb = '.list-group, .nav, [role="tablist"]', mb = ".nav-item, .list-group-item", bb = `.nav-link${jo}, .list-group-item${jo}, [role="tab"]${jo}`, dh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Uo = `${bb}, ${dh}`, yb = `.${Os}[data-bs-toggle="tab"], .${Os}[data-bs-toggle="pill"], .${Os}[data-bs-toggle="list"]`;
class vn extends ne {
  constructor(t) {
    super(t), this._parent = this._element.closest(gb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), L.on(this._element, cb, (e) => this._keydown(e)));
  }
  // Getters
  static get NAME() {
    return sb;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const e = this._getActiveElem(), n = e ? L.trigger(e, ib, {
      relatedTarget: t
    }) : null;
    L.trigger(t, ob, {
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
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), L.trigger(t, ab, {
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
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), L.trigger(t, rb, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(ac));
  }
  _keydown(t) {
    if (![hb, ic, db, rc, $o, oc].includes(t.key))
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
    }), vn.getOrCreateInstance(n).show());
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
    if (!n.classList.contains(fb))
      return;
    const i = (r, o) => {
      const l = U.findOne(r, n);
      l && l.classList.toggle(o, e);
    };
    i(hh, Os), i(pb, Po), n.setAttribute("aria-expanded", e);
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
    return t.closest(mb) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = vn.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
L.on(document, lb, dh, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !es(this) && vn.getOrCreateInstance(this).show();
});
L.on(window, ub, () => {
  for (const s of U.find(yb))
    vn.getOrCreateInstance(s);
});
Kt(vn);
const _b = "toast", vb = "bs.toast", os = `.${vb}`, Eb = `mouseover${os}`, Tb = `mouseout${os}`, Ab = `focusin${os}`, wb = `focusout${os}`, Nb = `hide${os}`, Ob = `hidden${os}`, Cb = `show${os}`, Sb = `shown${os}`, xb = "fade", lc = "hide", Xi = "show", Zi = "showing", Lb = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, kb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class xr extends ne {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return kb;
  }
  static get DefaultType() {
    return Lb;
  }
  static get NAME() {
    return _b;
  }
  // Public
  show() {
    if (L.trigger(this._element, Cb).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(xb);
    const e = () => {
      this._element.classList.remove(Zi), L.trigger(this._element, Sb), this._maybeScheduleHide();
    };
    this._element.classList.remove(lc), bi(this._element), this._element.classList.add(Xi, Zi), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || L.trigger(this._element, Nb).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(lc), this._element.classList.remove(Zi, Xi), L.trigger(this._element, Ob);
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
    L.on(this._element, Eb, (t) => this._onInteraction(t, !0)), L.on(this._element, Tb, (t) => this._onInteraction(t, !1)), L.on(this._element, Ab, (t) => this._onInteraction(t, !0)), L.on(this._element, wb, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = xr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
wr(xr);
Kt(xr);
function fh(s, t, e, n) {
  try {
    return typeof s == "function" ? s(t, e, n) : s;
  } catch {
    return null;
  }
}
async function Xn(s, t) {
  try {
    return {
      data: await s.json(),
      error: null
    };
  } catch (e) {
    return {
      data: void 0,
      error: e
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
function Ib(s) {
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
function Rb(s) {
  let t = {};
  for (let e in s) {
    let n = e.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? s[e] : {} : []), t);
  }
  return t;
}
function Ja(s, t, e, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (l, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][s] ? i(s, e) : i(t[n][s]);
}
function Db(s, t, e = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(e), i = s.map(
    (r) => t.map((o) => {
      let l = r[o.name];
      return o.template ? o.template(l, r, s) : l !== void 0 ? l : "";
    }).join(e)
  );
  return [n, ...i].join(`
`);
}
function Mb(s, t = "export.csv") {
  s = "\uFEFF" + s;
  const e = new Blob([s], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(e), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function qb(s) {
  return [...new Set(s)];
}
var ph = typeof global == "object" && global && global.Object === Object && global, Bb = typeof self == "object" && self && self.Object === Object && self, Te = ph || Bb || Function("return this")(), ns = Te.Symbol, gh = Object.prototype, $b = gh.hasOwnProperty, Pb = gh.toString, Zn = ns ? ns.toStringTag : void 0;
function jb(s) {
  var t = $b.call(s, Zn), e = s[Zn];
  try {
    s[Zn] = void 0;
    var n = !0;
  } catch {
  }
  var i = Pb.call(s);
  return n && (t ? s[Zn] = e : delete s[Zn]), i;
}
var Ub = Object.prototype, Vb = Ub.toString;
function Fb(s) {
  return Vb.call(s);
}
var Hb = "[object Null]", Wb = "[object Undefined]", uc = ns ? ns.toStringTag : void 0;
function xn(s) {
  return s == null ? s === void 0 ? Wb : Hb : uc && uc in Object(s) ? jb(s) : Fb(s);
}
function qe(s) {
  return s != null && typeof s == "object";
}
var ks = Array.isArray;
function as(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function mh(s) {
  return s;
}
var Kb = "[object AsyncFunction]", zb = "[object Function]", Gb = "[object GeneratorFunction]", Yb = "[object Proxy]";
function tl(s) {
  if (!as(s))
    return !1;
  var t = xn(s);
  return t == zb || t == Gb || t == Kb || t == Yb;
}
var Vo = Te["__core-js_shared__"], hc = function() {
  var s = /[^.]+$/.exec(Vo && Vo.keys && Vo.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function Xb(s) {
  return !!hc && hc in s;
}
var Zb = Function.prototype, Qb = Zb.toString;
function qs(s) {
  if (s != null) {
    try {
      return Qb.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
var Jb = /[\\^$.*+?()[\]{}|]/g, t1 = /^\[object .+?Constructor\]$/, e1 = Function.prototype, s1 = Object.prototype, n1 = e1.toString, i1 = s1.hasOwnProperty, r1 = RegExp(
  "^" + n1.call(i1).replace(Jb, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function o1(s) {
  if (!as(s) || Xb(s))
    return !1;
  var t = tl(s) ? r1 : t1;
  return t.test(qs(s));
}
function a1(s, t) {
  return s == null ? void 0 : s[t];
}
function Bs(s, t) {
  var e = a1(s, t);
  return o1(e) ? e : void 0;
}
var ca = Bs(Te, "WeakMap"), dc = Object.create, l1 = /* @__PURE__ */ function() {
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
function c1(s, t, e) {
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
function bh(s, t) {
  var e = -1, n = s.length;
  for (t || (t = Array(n)); ++e < n; )
    t[e] = s[e];
  return t;
}
var u1 = 800, h1 = 16, d1 = Date.now;
function f1(s) {
  var t = 0, e = 0;
  return function() {
    var n = d1(), i = h1 - (n - e);
    if (e = n, i > 0) {
      if (++t >= u1)
        return arguments[0];
    } else
      t = 0;
    return s.apply(void 0, arguments);
  };
}
function p1(s) {
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
}(), g1 = gr ? function(s, t) {
  return gr(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: p1(t),
    writable: !0
  });
} : mh, m1 = f1(g1);
function b1(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var y1 = 9007199254740991, _1 = /^(?:0|[1-9]\d*)$/;
function yh(s, t) {
  var e = typeof s;
  return t = t ?? y1, !!t && (e == "number" || e != "symbol" && _1.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
function el(s, t, e) {
  t == "__proto__" && gr ? gr(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
function Ei(s, t) {
  return s === t || s !== s && t !== t;
}
var v1 = Object.prototype, E1 = v1.hasOwnProperty;
function _h(s, t, e) {
  var n = s[t];
  (!(E1.call(s, t) && Ei(n, e)) || e === void 0 && !(t in s)) && el(s, t, e);
}
function Ti(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var l = t[r], a = void 0;
    a === void 0 && (a = s[l]), i ? el(e, l, a) : _h(e, l, a);
  }
  return e;
}
var fc = Math.max;
function T1(s, t, e) {
  return t = fc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = fc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var l = Array(t + 1); ++i < t; )
      l[i] = n[i];
    return l[t] = e(o), c1(s, this, l);
  };
}
function A1(s, t) {
  return m1(T1(s, t, mh), s + "");
}
var w1 = 9007199254740991;
function vh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= w1;
}
function Lr(s) {
  return s != null && vh(s.length) && !tl(s);
}
function N1(s, t, e) {
  if (!as(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? Lr(e) && yh(t, e.length) : n == "string" && t in e) ? Ei(e[t], s) : !1;
}
function O1(s) {
  return A1(function(t, e) {
    var n = -1, i = e.length, r = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (r = s.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && N1(e[0], e[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var l = e[n];
      l && s(t, l, n, r);
    }
    return t;
  });
}
var C1 = Object.prototype;
function sl(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || C1;
  return s === e;
}
function S1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var x1 = "[object Arguments]";
function pc(s) {
  return qe(s) && xn(s) == x1;
}
var Eh = Object.prototype, L1 = Eh.hasOwnProperty, k1 = Eh.propertyIsEnumerable, ua = pc(/* @__PURE__ */ function() {
  return arguments;
}()) ? pc : function(s) {
  return qe(s) && L1.call(s, "callee") && !k1.call(s, "callee");
};
function I1() {
  return !1;
}
var Th = typeof exports == "object" && exports && !exports.nodeType && exports, gc = Th && typeof module == "object" && module && !module.nodeType && module, R1 = gc && gc.exports === Th, mc = R1 ? Te.Buffer : void 0, D1 = mc ? mc.isBuffer : void 0, li = D1 || I1, M1 = "[object Arguments]", q1 = "[object Array]", B1 = "[object Boolean]", $1 = "[object Date]", P1 = "[object Error]", j1 = "[object Function]", U1 = "[object Map]", V1 = "[object Number]", F1 = "[object Object]", H1 = "[object RegExp]", W1 = "[object Set]", K1 = "[object String]", z1 = "[object WeakMap]", G1 = "[object ArrayBuffer]", Y1 = "[object DataView]", X1 = "[object Float32Array]", Z1 = "[object Float64Array]", Q1 = "[object Int8Array]", J1 = "[object Int16Array]", ty = "[object Int32Array]", ey = "[object Uint8Array]", sy = "[object Uint8ClampedArray]", ny = "[object Uint16Array]", iy = "[object Uint32Array]", st = {};
st[X1] = st[Z1] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = st[ny] = st[iy] = !0;
st[M1] = st[q1] = st[G1] = st[B1] = st[Y1] = st[$1] = st[P1] = st[j1] = st[U1] = st[V1] = st[F1] = st[H1] = st[W1] = st[K1] = st[z1] = !1;
function ry(s) {
  return qe(s) && vh(s.length) && !!st[xn(s)];
}
function nl(s) {
  return function(t) {
    return s(t);
  };
}
var Ah = typeof exports == "object" && exports && !exports.nodeType && exports, si = Ah && typeof module == "object" && module && !module.nodeType && module, oy = si && si.exports === Ah, Fo = oy && ph.process, En = function() {
  try {
    var s = si && si.require && si.require("util").types;
    return s || Fo && Fo.binding && Fo.binding("util");
  } catch {
  }
}(), bc = En && En.isTypedArray, il = bc ? nl(bc) : ry, ay = Object.prototype, ly = ay.hasOwnProperty;
function wh(s, t) {
  var e = ks(s), n = !e && ua(s), i = !e && !n && li(s), r = !e && !n && !i && il(s), o = e || n || i || r, l = o ? S1(s.length, String) : [], a = l.length;
  for (var u in s)
    (t || ly.call(s, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    yh(u, a))) && l.push(u);
  return l;
}
function Nh(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var cy = Nh(Object.keys, Object), uy = Object.prototype, hy = uy.hasOwnProperty;
function dy(s) {
  if (!sl(s))
    return cy(s);
  var t = [];
  for (var e in Object(s))
    hy.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function rl(s) {
  return Lr(s) ? wh(s) : dy(s);
}
function fy(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
var py = Object.prototype, gy = py.hasOwnProperty;
function my(s) {
  if (!as(s))
    return fy(s);
  var t = sl(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !gy.call(s, n)) || e.push(n);
  return e;
}
function Ai(s) {
  return Lr(s) ? wh(s, !0) : my(s);
}
var ci = Bs(Object, "create");
function by() {
  this.__data__ = ci ? ci(null) : {}, this.size = 0;
}
function yy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var _y = "__lodash_hash_undefined__", vy = Object.prototype, Ey = vy.hasOwnProperty;
function Ty(s) {
  var t = this.__data__;
  if (ci) {
    var e = t[s];
    return e === _y ? void 0 : e;
  }
  return Ey.call(t, s) ? t[s] : void 0;
}
var Ay = Object.prototype, wy = Ay.hasOwnProperty;
function Ny(s) {
  var t = this.__data__;
  return ci ? t[s] !== void 0 : wy.call(t, s);
}
var Oy = "__lodash_hash_undefined__";
function Cy(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = ci && t === void 0 ? Oy : t, this;
}
function Is(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Is.prototype.clear = by;
Is.prototype.delete = yy;
Is.prototype.get = Ty;
Is.prototype.has = Ny;
Is.prototype.set = Cy;
function Sy() {
  this.__data__ = [], this.size = 0;
}
function kr(s, t) {
  for (var e = s.length; e--; )
    if (Ei(s[e][0], t))
      return e;
  return -1;
}
var xy = Array.prototype, Ly = xy.splice;
function ky(s) {
  var t = this.__data__, e = kr(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : Ly.call(t, e, 1), --this.size, !0;
}
function Iy(s) {
  var t = this.__data__, e = kr(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function Ry(s) {
  return kr(this.__data__, s) > -1;
}
function Dy(s, t) {
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
je.prototype.clear = Sy;
je.prototype.delete = ky;
je.prototype.get = Iy;
je.prototype.has = Ry;
je.prototype.set = Dy;
var ui = Bs(Te, "Map");
function My() {
  this.size = 0, this.__data__ = {
    hash: new Is(),
    map: new (ui || je)(),
    string: new Is()
  };
}
function qy(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Ir(s, t) {
  var e = s.__data__;
  return qy(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function By(s) {
  var t = Ir(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function $y(s) {
  return Ir(this, s).get(s);
}
function Py(s) {
  return Ir(this, s).has(s);
}
function jy(s, t) {
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
$s.prototype.clear = My;
$s.prototype.delete = By;
$s.prototype.get = $y;
$s.prototype.has = Py;
$s.prototype.set = jy;
function Oh(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var ol = Nh(Object.getPrototypeOf, Object), Uy = "[object Object]", Vy = Function.prototype, Fy = Object.prototype, Ch = Vy.toString, Hy = Fy.hasOwnProperty, Wy = Ch.call(Object);
function Ky(s) {
  if (!qe(s) || xn(s) != Uy)
    return !1;
  var t = ol(s);
  if (t === null)
    return !0;
  var e = Hy.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && Ch.call(e) == Wy;
}
function zy() {
  this.__data__ = new je(), this.size = 0;
}
function Gy(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function Yy(s) {
  return this.__data__.get(s);
}
function Xy(s) {
  return this.__data__.has(s);
}
var Zy = 200;
function Qy(s, t) {
  var e = this.__data__;
  if (e instanceof je) {
    var n = e.__data__;
    if (!ui || n.length < Zy - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new $s(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function be(s) {
  var t = this.__data__ = new je(s);
  this.size = t.size;
}
be.prototype.clear = zy;
be.prototype.delete = Gy;
be.prototype.get = Yy;
be.prototype.has = Xy;
be.prototype.set = Qy;
function Jy(s, t) {
  return s && Ti(t, rl(t), s);
}
function t_(s, t) {
  return s && Ti(t, Ai(t), s);
}
var Sh = typeof exports == "object" && exports && !exports.nodeType && exports, yc = Sh && typeof module == "object" && module && !module.nodeType && module, e_ = yc && yc.exports === Sh, _c = e_ ? Te.Buffer : void 0, vc = _c ? _c.allocUnsafe : void 0;
function xh(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = vc ? vc(e) : new s.constructor(e);
  return s.copy(n), n;
}
function s_(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function Lh() {
  return [];
}
var n_ = Object.prototype, i_ = n_.propertyIsEnumerable, Ec = Object.getOwnPropertySymbols, al = Ec ? function(s) {
  return s == null ? [] : (s = Object(s), s_(Ec(s), function(t) {
    return i_.call(s, t);
  }));
} : Lh;
function r_(s, t) {
  return Ti(s, al(s), t);
}
var o_ = Object.getOwnPropertySymbols, kh = o_ ? function(s) {
  for (var t = []; s; )
    Oh(t, al(s)), s = ol(s);
  return t;
} : Lh;
function a_(s, t) {
  return Ti(s, kh(s), t);
}
function Ih(s, t, e) {
  var n = t(s);
  return ks(s) ? n : Oh(n, e(s));
}
function ha(s) {
  return Ih(s, rl, al);
}
function l_(s) {
  return Ih(s, Ai, kh);
}
var da = Bs(Te, "DataView"), fa = Bs(Te, "Promise"), pa = Bs(Te, "Set"), Tc = "[object Map]", c_ = "[object Object]", Ac = "[object Promise]", wc = "[object Set]", Nc = "[object WeakMap]", Oc = "[object DataView]", u_ = qs(da), h_ = qs(ui), d_ = qs(fa), f_ = qs(pa), p_ = qs(ca), Jt = xn;
(da && Jt(new da(new ArrayBuffer(1))) != Oc || ui && Jt(new ui()) != Tc || fa && Jt(fa.resolve()) != Ac || pa && Jt(new pa()) != wc || ca && Jt(new ca()) != Nc) && (Jt = function(s) {
  var t = xn(s), e = t == c_ ? s.constructor : void 0, n = e ? qs(e) : "";
  if (n)
    switch (n) {
      case u_:
        return Oc;
      case h_:
        return Tc;
      case d_:
        return Ac;
      case f_:
        return wc;
      case p_:
        return Nc;
    }
  return t;
});
var g_ = Object.prototype, m_ = g_.hasOwnProperty;
function b_(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && m_.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var mr = Te.Uint8Array;
function ll(s) {
  var t = new s.constructor(s.byteLength);
  return new mr(t).set(new mr(s)), t;
}
function y_(s, t) {
  var e = t ? ll(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var __ = /\w*$/;
function v_(s) {
  var t = new s.constructor(s.source, __.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var Cc = ns ? ns.prototype : void 0, Sc = Cc ? Cc.valueOf : void 0;
function E_(s) {
  return Sc ? Object(Sc.call(s)) : {};
}
function Rh(s, t) {
  var e = t ? ll(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var T_ = "[object Boolean]", A_ = "[object Date]", w_ = "[object Map]", N_ = "[object Number]", O_ = "[object RegExp]", C_ = "[object Set]", S_ = "[object String]", x_ = "[object Symbol]", L_ = "[object ArrayBuffer]", k_ = "[object DataView]", I_ = "[object Float32Array]", R_ = "[object Float64Array]", D_ = "[object Int8Array]", M_ = "[object Int16Array]", q_ = "[object Int32Array]", B_ = "[object Uint8Array]", $_ = "[object Uint8ClampedArray]", P_ = "[object Uint16Array]", j_ = "[object Uint32Array]";
function U_(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case L_:
      return ll(s);
    case T_:
    case A_:
      return new n(+s);
    case k_:
      return y_(s, e);
    case I_:
    case R_:
    case D_:
    case M_:
    case q_:
    case B_:
    case $_:
    case P_:
    case j_:
      return Rh(s, e);
    case w_:
      return new n();
    case N_:
    case S_:
      return new n(s);
    case O_:
      return v_(s);
    case C_:
      return new n();
    case x_:
      return E_(s);
  }
}
function Dh(s) {
  return typeof s.constructor == "function" && !sl(s) ? l1(ol(s)) : {};
}
var V_ = "[object Map]";
function F_(s) {
  return qe(s) && Jt(s) == V_;
}
var xc = En && En.isMap, H_ = xc ? nl(xc) : F_, W_ = "[object Set]";
function K_(s) {
  return qe(s) && Jt(s) == W_;
}
var Lc = En && En.isSet, z_ = Lc ? nl(Lc) : K_, G_ = 1, Y_ = 2, X_ = 4, Mh = "[object Arguments]", Z_ = "[object Array]", Q_ = "[object Boolean]", J_ = "[object Date]", tv = "[object Error]", qh = "[object Function]", ev = "[object GeneratorFunction]", sv = "[object Map]", nv = "[object Number]", Bh = "[object Object]", iv = "[object RegExp]", rv = "[object Set]", ov = "[object String]", av = "[object Symbol]", lv = "[object WeakMap]", cv = "[object ArrayBuffer]", uv = "[object DataView]", hv = "[object Float32Array]", dv = "[object Float64Array]", fv = "[object Int8Array]", pv = "[object Int16Array]", gv = "[object Int32Array]", mv = "[object Uint8Array]", bv = "[object Uint8ClampedArray]", yv = "[object Uint16Array]", _v = "[object Uint32Array]", et = {};
et[Mh] = et[Z_] = et[cv] = et[uv] = et[Q_] = et[J_] = et[hv] = et[dv] = et[fv] = et[pv] = et[gv] = et[sv] = et[nv] = et[Bh] = et[iv] = et[rv] = et[ov] = et[av] = et[mv] = et[bv] = et[yv] = et[_v] = !0;
et[tv] = et[qh] = et[lv] = !1;
function ar(s, t, e, n, i, r) {
  var o, l = t & G_, a = t & Y_, u = t & X_;
  if (o !== void 0)
    return o;
  if (!as(s))
    return s;
  var h = ks(s);
  if (h) {
    if (o = b_(s), !l)
      return bh(s, o);
  } else {
    var f = Jt(s), p = f == qh || f == ev;
    if (li(s))
      return xh(s, l);
    if (f == Bh || f == Mh || p && !i) {
      if (o = a || p ? {} : Dh(s), !l)
        return a ? a_(s, t_(o, s)) : r_(s, Jy(o, s));
    } else {
      if (!et[f])
        return i ? s : {};
      o = U_(s, f, l);
    }
  }
  r || (r = new be());
  var g = r.get(s);
  if (g)
    return g;
  r.set(s, o), z_(s) ? s.forEach(function(T) {
    o.add(ar(T, t, e, T, s, r));
  }) : H_(s) && s.forEach(function(T, A) {
    o.set(A, ar(T, t, e, A, s, r));
  });
  var y = u ? a ? l_ : ha : a ? Ai : rl, E = h ? void 0 : y(s);
  return b1(E || s, function(T, A) {
    E && (A = T, T = s[A]), _h(o, A, ar(T, t, e, A, s, r));
  }), o;
}
var vv = 1, Ev = 4;
function dn(s) {
  return ar(s, vv | Ev);
}
var Tv = "__lodash_hash_undefined__";
function Av(s) {
  return this.__data__.set(s, Tv), this;
}
function wv(s) {
  return this.__data__.has(s);
}
function br(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new $s(); ++t < e; )
    this.add(s[t]);
}
br.prototype.add = br.prototype.push = Av;
br.prototype.has = wv;
function Nv(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n; )
    if (t(s[e], e, s))
      return !0;
  return !1;
}
function Ov(s, t) {
  return s.has(t);
}
var Cv = 1, Sv = 2;
function $h(s, t, e, n, i, r) {
  var o = e & Cv, l = s.length, a = t.length;
  if (l != a && !(o && a > l))
    return !1;
  var u = r.get(s), h = r.get(t);
  if (u && h)
    return u == t && h == s;
  var f = -1, p = !0, g = e & Sv ? new br() : void 0;
  for (r.set(s, t), r.set(t, s); ++f < l; ) {
    var y = s[f], E = t[f];
    if (n)
      var T = o ? n(E, y, f, t, s, r) : n(y, E, f, s, t, r);
    if (T !== void 0) {
      if (T)
        continue;
      p = !1;
      break;
    }
    if (g) {
      if (!Nv(t, function(A, N) {
        if (!Ov(g, N) && (y === A || i(y, A, e, n, r)))
          return g.push(N);
      })) {
        p = !1;
        break;
      }
    } else if (!(y === E || i(y, E, e, n, r))) {
      p = !1;
      break;
    }
  }
  return r.delete(s), r.delete(t), p;
}
function xv(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n, i) {
    e[++t] = [i, n];
  }), e;
}
function Lv(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n) {
    e[++t] = n;
  }), e;
}
var kv = 1, Iv = 2, Rv = "[object Boolean]", Dv = "[object Date]", Mv = "[object Error]", qv = "[object Map]", Bv = "[object Number]", $v = "[object RegExp]", Pv = "[object Set]", jv = "[object String]", Uv = "[object Symbol]", Vv = "[object ArrayBuffer]", Fv = "[object DataView]", kc = ns ? ns.prototype : void 0, Ho = kc ? kc.valueOf : void 0;
function Hv(s, t, e, n, i, r, o) {
  switch (e) {
    case Fv:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case Vv:
      return !(s.byteLength != t.byteLength || !r(new mr(s), new mr(t)));
    case Rv:
    case Dv:
    case Bv:
      return Ei(+s, +t);
    case Mv:
      return s.name == t.name && s.message == t.message;
    case $v:
    case jv:
      return s == t + "";
    case qv:
      var l = xv;
    case Pv:
      var a = n & kv;
      if (l || (l = Lv), s.size != t.size && !a)
        return !1;
      var u = o.get(s);
      if (u)
        return u == t;
      n |= Iv, o.set(s, t);
      var h = $h(l(s), l(t), n, i, r, o);
      return o.delete(s), h;
    case Uv:
      if (Ho)
        return Ho.call(s) == Ho.call(t);
  }
  return !1;
}
var Wv = 1, Kv = Object.prototype, zv = Kv.hasOwnProperty;
function Gv(s, t, e, n, i, r) {
  var o = e & Wv, l = ha(s), a = l.length, u = ha(t), h = u.length;
  if (a != h && !o)
    return !1;
  for (var f = a; f--; ) {
    var p = l[f];
    if (!(o ? p in t : zv.call(t, p)))
      return !1;
  }
  var g = r.get(s), y = r.get(t);
  if (g && y)
    return g == t && y == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var T = o; ++f < a; ) {
    p = l[f];
    var A = s[p], N = t[p];
    if (n)
      var C = o ? n(N, A, p, t, s, r) : n(A, N, p, s, t, r);
    if (!(C === void 0 ? A === N || i(A, N, e, n, r) : C)) {
      E = !1;
      break;
    }
    T || (T = p == "constructor");
  }
  if (E && !T) {
    var x = s.constructor, k = t.constructor;
    x != k && "constructor" in s && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof k == "function" && k instanceof k) && (E = !1);
  }
  return r.delete(s), r.delete(t), E;
}
var Yv = 1, Ic = "[object Arguments]", Rc = "[object Array]", Qi = "[object Object]", Xv = Object.prototype, Dc = Xv.hasOwnProperty;
function Zv(s, t, e, n, i, r) {
  var o = ks(s), l = ks(t), a = o ? Rc : Jt(s), u = l ? Rc : Jt(t);
  a = a == Ic ? Qi : a, u = u == Ic ? Qi : u;
  var h = a == Qi, f = u == Qi, p = a == u;
  if (p && li(s)) {
    if (!li(t))
      return !1;
    o = !0, h = !1;
  }
  if (p && !h)
    return r || (r = new be()), o || il(s) ? $h(s, t, e, n, i, r) : Hv(s, t, a, e, n, i, r);
  if (!(e & Yv)) {
    var g = h && Dc.call(s, "__wrapped__"), y = f && Dc.call(t, "__wrapped__");
    if (g || y) {
      var E = g ? s.value() : s, T = y ? t.value() : t;
      return r || (r = new be()), i(E, T, e, n, r);
    }
  }
  return p ? (r || (r = new be()), Gv(s, t, e, n, i, r)) : !1;
}
function Ph(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !qe(s) && !qe(t) ? s !== s && t !== t : Zv(s, t, e, n, Ph, i);
}
function Qv(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), l = o.length; l--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var Jv = Qv();
function ga(s, t, e) {
  (e !== void 0 && !Ei(s[t], e) || e === void 0 && !(t in s)) && el(s, t, e);
}
function t0(s) {
  return qe(s) && Lr(s);
}
function ma(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function e0(s) {
  return Ti(s, Ai(s));
}
function s0(s, t, e, n, i, r, o) {
  var l = ma(s, e), a = ma(t, e), u = o.get(a);
  if (u) {
    ga(s, e, u);
    return;
  }
  var h = r ? r(l, a, e + "", s, t, o) : void 0, f = h === void 0;
  if (f) {
    var p = ks(a), g = !p && li(a), y = !p && !g && il(a);
    h = a, p || g || y ? ks(l) ? h = l : t0(l) ? h = bh(l) : g ? (f = !1, h = xh(a, !0)) : y ? (f = !1, h = Rh(a, !0)) : h = [] : Ky(a) || ua(a) ? (h = l, ua(l) ? h = e0(l) : (!as(l) || tl(l)) && (h = Dh(a))) : f = !1;
  }
  f && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), ga(s, e, h);
}
function jh(s, t, e, n, i) {
  s !== t && Jv(t, function(r, o) {
    if (i || (i = new be()), as(r))
      s0(s, t, o, e, jh, n, i);
    else {
      var l = n ? n(ma(s, o), r, o + "", s, t, i) : void 0;
      l === void 0 && (l = r), ga(s, o, l);
    }
  }, Ai);
}
function cl(s, t) {
  return Ph(s, t);
}
var Je = O1(function(s, t, e) {
  jh(s, t, e);
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
class fn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Uh = class ba {
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
      throw new fn(`Unable to create ${e} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(n)
    ), l = new r(t, o, n);
    return ba.blots.set(l.domNode, l), l;
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
        throw new fn("Invalid definition");
      if (n && e.blotName === "abstract")
        throw new fn("Cannot register abstract class");
      const r = n ? e.blotName : i ? e.attrName : void 0;
      return this.types[r] = e, i ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : n && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((o) => o.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((o) => {
        (this.tags[o] == null || e.className == null) && (this.tags[o] = e);
      }))), e;
    });
  }
};
Uh.blots = /* @__PURE__ */ new WeakMap();
let Tn = Uh;
function Mc(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class n0 extends ve {
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
const ie = n0;
function Wo(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class i0 extends ve {
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
const ls = i0;
class r0 {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Tn.find(this.domNode);
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
const Rr = r0, Vh = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, Tn.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new fn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Tn.blots.delete(this.domNode);
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
      throw new fn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Vh.blotName = "abstract";
let Fh = Vh;
const Hh = class extends Fh {
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
Hh.scope = $.INLINE_BLOT;
let o0 = Hh;
const yt = o0;
class a0 {
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
    const l = this.iterator(i);
    let a = l();
    for (; a && o < t + e; ) {
      const u = a.length();
      t > o ? n(
        a,
        t - o,
        Math.min(e, o + u - t)
      ) : n(a, 0, Math.min(u, t + e - o)), o += u, a = l();
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
const Wh = class Ye extends Fh {
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
    this.children = new a0(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = qc(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof fn)
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
      (o, l, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof Ye && (i = i.concat(
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
    this.children.forEach((e) => {
      t || this.statics.allowedChildren.some(
        (n) => e instanceof n
      ) || (e.statics.scope === $.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof Ye ? e.unwrap() : e.remove());
    });
  }
  formatAt(t, e, n, i) {
    this.children.forEachAt(t, e, (r, o, l) => {
      r.formatAt(o, l, n, i);
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
      const l = i.split(r, e);
      l != null && n.appendChild(l);
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
      const l = qc(r, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Wh.uiClass = "";
let l0 = Wh;
const ee = l0;
function c0(s, t) {
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
    n instanceof on && n.prev === this && c0(e, n.formats()) && (n.moveChildren(this), n.remove());
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
let u0 = rn;
const ul = u0, an = class ya extends ee {
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
let h0 = an;
const hi = h0, _a = class extends ee {
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
let d0 = _a;
const Dr = d0;
class f0 extends yt {
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
const Dt = f0, p0 = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, g0 = 100, ln = class extends ee {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, p0), this.attach();
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
    const r = (a, u = !0) => {
      a == null || a === this || a.domNode.parentNode != null && (n.has(a.domNode) || n.set(a.domNode, []), u && r(a.parent));
    }, o = (a) => {
      n.has(a.domNode) && (a instanceof ee && a.children.forEach(o), n.delete(a.domNode), a.optimize(e));
    };
    let l = t;
    for (let a = 0; l.length > 0; a += 1) {
      if (a >= g0)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((u) => {
        const h = this.find(u.target, !0);
        h != null && (h.domNode === u.target && (u.type === "childList" ? (r(this.find(u.previousSibling, !1)), Array.from(u.addedNodes).forEach((f) => {
          const p = this.find(f, !1);
          r(p, !1), p instanceof ee && p.children.forEach((g) => {
            r(g, !1);
          });
        })) : u.type === "attributes" && r(h.prev)), r(h));
      }), this.children.forEach(o), l = Array.from(this.observer.takeRecords()), i = l.slice(); i.length > 0; )
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
ln.blotName = "scroll", ln.defaultChild = hi, ln.allowedChildren = [hi, Dr], ln.scope = $.BLOCK_BLOT, ln.tagName = "DIV";
let m0 = ln;
const hl = m0, va = class Kh extends yt {
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
let b0 = va;
const yr = b0, y0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: ve,
  AttributorStore: Rr,
  BlockBlot: hi,
  ClassAttributor: ie,
  ContainerBlot: Dr,
  EmbedBlot: Dt,
  InlineBlot: ul,
  LeafBlot: yt,
  ParentBlot: ee,
  Registry: Tn,
  Scope: $,
  ScrollBlot: hl,
  StyleAttributor: ls,
  TextBlot: yr
}, Symbol.toStringTag, { value: "Module" }));
var Xe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zh(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ea = { exports: {} }, Lt = -1, Tt = 1, ct = 0;
function di(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = C0(s, t, e);
    if (r)
      return r;
  }
  var o = dl(s, t), l = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = Mr(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var u = _0(s, t);
  return l && u.unshift([ct, l]), a && u.push([ct, a]), fl(u, i), n && T0(u), u;
}
function _0(s, t) {
  var e;
  if (!s)
    return [[Tt, t]];
  if (!t)
    return [[Lt, s]];
  var n = s.length > t.length ? s : t, i = s.length > t.length ? t : s, r = n.indexOf(i);
  if (r !== -1)
    return e = [
      [Tt, n.substring(0, r)],
      [ct, i],
      [Tt, n.substring(r + i.length)]
    ], s.length > t.length && (e[0][0] = e[2][0] = Lt), e;
  if (i.length === 1)
    return [
      [Lt, s],
      [Tt, t]
    ];
  var o = E0(s, t);
  if (o) {
    var l = o[0], a = o[1], u = o[2], h = o[3], f = o[4], p = di(l, u), g = di(a, h);
    return p.concat([[ct, f]], g);
  }
  return v0(s, t);
}
function v0(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, l = new Array(o), a = new Array(o), u = 0; u < o; u++)
    l[u] = -1, a[u] = -1;
  l[r + 1] = 0, a[r + 1] = 0;
  for (var h = e - n, f = h % 2 !== 0, p = 0, g = 0, y = 0, E = 0, T = 0; T < i; T++) {
    for (var A = -T + p; A <= T - g; A += 2) {
      var N = r + A, C;
      A === -T || A !== T && l[N - 1] < l[N + 1] ? C = l[N + 1] : C = l[N - 1] + 1;
      for (var x = C - A; C < e && x < n && s.charAt(C) === t.charAt(x); )
        C++, x++;
      if (l[N] = C, C > e)
        g += 2;
      else if (x > n)
        p += 2;
      else if (f) {
        var k = r + h - A;
        if (k >= 0 && k < o && a[k] !== -1) {
          var R = e - a[k];
          if (C >= R)
            return Bc(s, t, C, x);
        }
      }
    }
    for (var P = -T + y; P <= T - E; P += 2) {
      var k = r + P, R;
      P === -T || P !== T && a[k - 1] < a[k + 1] ? R = a[k + 1] : R = a[k - 1] + 1;
      for (var V = R - P; R < e && V < n && s.charAt(e - R - 1) === t.charAt(n - V - 1); )
        R++, V++;
      if (a[k] = R, R > e)
        E += 2;
      else if (V > n)
        y += 2;
      else if (!f) {
        var N = r + h - P;
        if (N >= 0 && N < o && l[N] !== -1) {
          var C = l[N], x = r + C - N;
          if (R = e - R, C >= R)
            return Bc(s, t, C, x);
        }
      }
    }
  }
  return [
    [Lt, s],
    [Tt, t]
  ];
}
function Bc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), l = t.substring(n), a = di(i, r), u = di(o, l);
  return a.concat(u);
}
function dl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Gh(s.charCodeAt(i - 1)) && i--, i;
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
    var l = s.substring(i - o), a = t.indexOf(l);
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
  return Yh(s.charCodeAt(s.length - i)) && i--, i;
}
function E0(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(g, y, E) {
    for (var T = g.substring(E, E + Math.floor(g.length / 4)), A = -1, N = "", C, x, k, R; (A = y.indexOf(T, A + 1)) !== -1; ) {
      var P = dl(
        g.substring(E),
        y.substring(A)
      ), V = Mr(
        g.substring(0, E),
        y.substring(0, A)
      );
      N.length < V + P && (N = y.substring(A - V, A) + y.substring(A, A + P), C = g.substring(0, E - V), x = g.substring(E + P), k = y.substring(0, A - V), R = y.substring(A + P));
    }
    return N.length * 2 >= g.length ? [
      C,
      x,
      k,
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
  ), l;
  if (!r && !o)
    return null;
  o ? r ? l = r[4].length > o[4].length ? r : o : l = o : l = r;
  var a, u, h, f;
  s.length > t.length ? (a = l[0], u = l[1], h = l[2], f = l[3]) : (h = l[0], f = l[1], a = l[2], u = l[3]);
  var p = l[4];
  return [a, u, h, f, p];
}
function T0(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, l = 0, a = 0, u = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, l = u, a = 0, u = 0, i = s[r][1]) : (s[r][0] == Tt ? a += s[r][1].length : u += s[r][1].length, i && i.length <= Math.max(o, l) && i.length <= Math.max(a, u) && (s.splice(e[n - 1], 0, [
      Lt,
      i
    ]), s[e[n - 1] + 1][0] = Tt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, l = 0, a = 0, u = 0, i = null, t = !0)), r++;
  for (t && fl(s), N0(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == Lt && s[r][0] == Tt) {
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
      ), s[r + 1][0] = Lt, s[r + 1][1] = h.substring(g), r++), r++;
    }
    r++;
  }
}
var Pc = /[^a-zA-Z0-9]/, jc = /\s/, Uc = /[\r\n]/, A0 = /\n\r?\n$/, w0 = /^\r?\n\r?\n/;
function N0(s) {
  function t(g, y) {
    if (!g || !y)
      return 6;
    var E = g.charAt(g.length - 1), T = y.charAt(0), A = E.match(Pc), N = T.match(Pc), C = A && E.match(jc), x = N && T.match(jc), k = C && E.match(Uc), R = x && T.match(Uc), P = k && g.match(A0), V = R && y.match(w0);
    return P || V ? 5 : k || R ? 4 : A && !C && x ? 3 : C || x ? 2 : A || N ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = Mr(n, i);
      if (o) {
        var l = i.substring(i.length - o);
        n = n.substring(0, n.length - o), i = l + i.substring(0, i.length - o), r = l + r;
      }
      for (var a = n, u = i, h = r, f = t(n, i) + t(i, r); i.charAt(0) === r.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + r.charAt(0), r = r.substring(1);
        var p = t(n, i) + t(i, r);
        p >= f && (f = p, a = n, u = i, h = r);
      }
      s[e - 1][1] != a && (a ? s[e - 1][1] = a : (s.splice(e - 1, 1), e--), s[e][1] = u, h ? s[e + 1][1] = h : (s.splice(e + 1, 1), e--));
    }
    e++;
  }
}
function fl(s, t) {
  s.push([ct, ""]);
  for (var e = 0, n = 0, i = 0, r = "", o = "", l; e < s.length; ) {
    if (e < s.length - 1 && !s[e][1]) {
      s.splice(e, 1);
      continue;
    }
    switch (s[e][0]) {
      case Tt:
        i++, o += s[e][1], e++;
        break;
      case Lt:
        n++, r += s[e][1], e++;
        break;
      case ct:
        var a = e - i - n - 1;
        if (t) {
          if (a >= 0 && Zh(s[a][1])) {
            var u = s[a][1].slice(-1);
            if (s[a][1] = s[a][1].slice(
              0,
              -1
            ), r = u + r, o = u + o, !s[a][1]) {
              s.splice(a, 1), e--;
              var h = a - 1;
              s[h] && s[h][0] === Tt && (i++, o = s[h][1] + o, h--), s[h] && s[h][0] === Lt && (n++, r = s[h][1] + r, h--), a = h;
            }
          }
          if (Xh(s[e][1])) {
            var u = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += u, o += u;
          }
        }
        if (e < s.length - 1 && !s[e][1]) {
          s.splice(e, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (l = dl(o, r), l !== 0 && (a >= 0 ? s[a][1] += o.substring(
            0,
            l
          ) : (s.splice(0, 0, [
            ct,
            o.substring(0, l)
          ]), e++), o = o.substring(l), r = r.substring(l)), l = Mr(o, r), l !== 0 && (s[e][1] = o.substring(o.length - l) + s[e][1], o = o.substring(
            0,
            o.length - l
          ), r = r.substring(
            0,
            r.length - l
          )));
          var f = i + n;
          r.length === 0 && o.length === 0 ? (s.splice(e - f, f), e = e - f) : r.length === 0 ? (s.splice(e - f, f, [Tt, o]), e = e - f + 1) : o.length === 0 ? (s.splice(e - f, f, [Lt, r]), e = e - f + 1) : (s.splice(
            e - f,
            f,
            [Lt, r],
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
function Gh(s) {
  return s >= 55296 && s <= 56319;
}
function Yh(s) {
  return s >= 56320 && s <= 57343;
}
function Xh(s) {
  return Yh(s.charCodeAt(0));
}
function Zh(s) {
  return Gh(s.charCodeAt(s.length - 1));
}
function O0(s) {
  for (var t = [], e = 0; e < s.length; e++)
    s[e][1].length > 0 && t.push(s[e]);
  return t;
}
function Ko(s, t, e, n) {
  return Zh(s) || Xh(n) ? null : O0([
    [ct, s],
    [Lt, t],
    [Tt, e],
    [ct, n]
  ]);
}
function C0(s, t, e) {
  var n = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i = typeof e == "number" ? null : e.newRange, r = s.length, o = t.length;
  if (n.length === 0 && (i === null || i.length === 0)) {
    var l = n.index, a = s.slice(0, l), u = s.slice(l), h = i ? i.index : null;
    t: {
      var f = l + o - r;
      if (h !== null && h !== f || f < 0 || f > o)
        break t;
      var p = t.slice(0, f), g = t.slice(f);
      if (g !== u)
        break t;
      var y = Math.min(l, f), E = a.slice(0, y), T = p.slice(0, y);
      if (E !== T)
        break t;
      var A = a.slice(y), N = p.slice(y);
      return Ko(E, A, N, u);
    }
    t: {
      if (h !== null && h !== l)
        break t;
      var C = l, p = t.slice(0, C), g = t.slice(C);
      if (p !== a)
        break t;
      var x = Math.min(r - C, o - C), k = u.slice(u.length - x), R = g.slice(g.length - x);
      if (k !== R)
        break t;
      var A = u.slice(0, u.length - x), N = g.slice(0, g.length - x);
      return Ko(a, A, N, k);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), k = s.slice(n.index + n.length), y = E.length, x = k.length;
      if (o < y + x)
        break t;
      var T = t.slice(0, y), R = t.slice(o - x);
      if (E !== T || k !== R)
        break t;
      var A = s.slice(y, r - x), N = t.slice(y, o - x);
      return Ko(E, A, N, k);
    }
  return null;
}
function qr(s, t, e, n) {
  return di(s, t, e, n, !0);
}
qr.INSERT = Tt;
qr.DELETE = Lt;
qr.EQUAL = ct;
var S0 = qr, _r = { exports: {} };
_r.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", a = "[object Date]", u = "[object Error]", h = "[object Function]", f = "[object GeneratorFunction]", p = "[object Map]", g = "[object Number]", y = "[object Object]", E = "[object Promise]", T = "[object RegExp]", A = "[object Set]", N = "[object String]", C = "[object Symbol]", x = "[object WeakMap]", k = "[object ArrayBuffer]", R = "[object DataView]", P = "[object Float32Array]", V = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Mt = "[object Uint16Array]", qt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, vt = /\w*$/, Ve = /^\[object .+?Constructor\]$/, zt = /^(?:0|[1-9]\d*)$/, W = {};
  W[r] = W[o] = W[k] = W[R] = W[l] = W[a] = W[P] = W[V] = W[J] = W[tt] = W[nt] = W[p] = W[g] = W[y] = W[T] = W[A] = W[N] = W[C] = W[ot] = W[it] = W[Mt] = W[qt] = !0, W[u] = W[h] = W[x] = !1;
  var cs = typeof Xe == "object" && Xe && Xe.Object === Object && Xe, Ae = typeof self == "object" && self && self.Object === Object && self, pt = cs || Ae || Function("return this")(), Gt = t && !t.nodeType && t, H = Gt && !0 && s && !s.nodeType && s, ae = H && H.exports === Gt;
  function Fe(c, d) {
    return c.set(d[0], d[1]), c;
  }
  function at(c, d) {
    return c.add(d), c;
  }
  function He(c, d) {
    for (var m = -1, w = c ? c.length : 0; ++m < w && d(c[m], m, c) !== !1; )
      ;
    return c;
  }
  function Vs(c, d) {
    for (var m = -1, w = d.length, F = c.length; ++m < w; )
      c[F + m] = d[m];
    return c;
  }
  function we(c, d, m, w) {
    for (var F = -1, j = c ? c.length : 0; ++F < j; )
      m = d(m, c[F], F, c);
    return m;
  }
  function us(c, d) {
    for (var m = -1, w = Array(c); ++m < c; )
      w[m] = d(m);
    return w;
  }
  function hs(c, d) {
    return c == null ? void 0 : c[d];
  }
  function ds(c) {
    var d = !1;
    if (c != null && typeof c.toString != "function")
      try {
        d = !!(c + "");
      } catch {
      }
    return d;
  }
  function Fs(c) {
    var d = -1, m = Array(c.size);
    return c.forEach(function(w, F) {
      m[++d] = [F, w];
    }), m;
  }
  function We(c, d) {
    return function(m) {
      return c(d(m));
    };
  }
  function fs(c) {
    var d = -1, m = Array(c.size);
    return c.forEach(function(w) {
      m[++d] = w;
    }), m;
  }
  var kn = Array.prototype, In = Function.prototype, Nt = Object.prototype, le = pt["__core-js_shared__"], ps = function() {
    var c = /[^.]+$/.exec(le && le.keys && le.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), gs = In.toString, Ot = Nt.hasOwnProperty, Ne = Nt.toString, Hs = RegExp(
    "^" + gs.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ce = ae ? pt.Buffer : void 0, Oe = pt.Symbol, Rn = pt.Uint8Array, Bt = We(Object.getPrototypeOf, Object), Si = Object.create, xi = Nt.propertyIsEnumerable, Ur = kn.splice, Dn = Object.getOwnPropertySymbols, Ws = ce ? ce.isBuffer : void 0, Li = We(Object.keys, Object), Ks = Xt(pt, "DataView"), ms = Xt(pt, "Map"), Yt = Xt(pt, "Promise"), zs = Xt(pt, "Set"), Mn = Xt(pt, "WeakMap"), bs = Xt(Object, "create"), qn = Et(Ks), ys = Et(ms), Bn = Et(Yt), $n = Et(zs), Pn = Et(Mn), Ke = Oe ? Oe.prototype : void 0, ki = Ke ? Ke.valueOf : void 0;
  function Ce(c) {
    var d = -1, m = c ? c.length : 0;
    for (this.clear(); ++d < m; ) {
      var w = c[d];
      this.set(w[0], w[1]);
    }
  }
  function Vr() {
    this.__data__ = bs ? bs(null) : {};
  }
  function Fr(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Hr(c) {
    var d = this.__data__;
    if (bs) {
      var m = d[c];
      return m === n ? void 0 : m;
    }
    return Ot.call(d, c) ? d[c] : void 0;
  }
  function Ii(c) {
    var d = this.__data__;
    return bs ? d[c] !== void 0 : Ot.call(d, c);
  }
  function jn(c, d) {
    var m = this.__data__;
    return m[c] = bs && d === void 0 ? n : d, this;
  }
  Ce.prototype.clear = Vr, Ce.prototype.delete = Fr, Ce.prototype.get = Hr, Ce.prototype.has = Ii, Ce.prototype.set = jn;
  function ht(c) {
    var d = -1, m = c ? c.length : 0;
    for (this.clear(); ++d < m; ) {
      var w = c[d];
      this.set(w[0], w[1]);
    }
  }
  function Wr() {
    this.__data__ = [];
  }
  function Kr(c) {
    var d = this.__data__, m = Ys(d, c);
    if (m < 0)
      return !1;
    var w = d.length - 1;
    return m == w ? d.pop() : Ur.call(d, m, 1), !0;
  }
  function zr(c) {
    var d = this.__data__, m = Ys(d, c);
    return m < 0 ? void 0 : d[m][1];
  }
  function Gr(c) {
    return Ys(this.__data__, c) > -1;
  }
  function Yr(c, d) {
    var m = this.__data__, w = Ys(m, c);
    return w < 0 ? m.push([c, d]) : m[w][1] = d, this;
  }
  ht.prototype.clear = Wr, ht.prototype.delete = Kr, ht.prototype.get = zr, ht.prototype.has = Gr, ht.prototype.set = Yr;
  function gt(c) {
    var d = -1, m = c ? c.length : 0;
    for (this.clear(); ++d < m; ) {
      var w = c[d];
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
  function Zr(c) {
    return vs(this, c).delete(c);
  }
  function Qr(c) {
    return vs(this, c).get(c);
  }
  function Jr(c) {
    return vs(this, c).has(c);
  }
  function to(c, d) {
    return vs(this, c).set(c, d), this;
  }
  gt.prototype.clear = Xr, gt.prototype.delete = Zr, gt.prototype.get = Qr, gt.prototype.has = Jr, gt.prototype.set = to;
  function Ct(c) {
    this.__data__ = new ht(c);
  }
  function eo() {
    this.__data__ = new ht();
  }
  function so(c) {
    return this.__data__.delete(c);
  }
  function no(c) {
    return this.__data__.get(c);
  }
  function io(c) {
    return this.__data__.has(c);
  }
  function ro(c, d) {
    var m = this.__data__;
    if (m instanceof ht) {
      var w = m.__data__;
      if (!ms || w.length < e - 1)
        return w.push([c, d]), this;
      m = this.__data__ = new gt(w);
    }
    return m.set(c, d), this;
  }
  Ct.prototype.clear = eo, Ct.prototype.delete = so, Ct.prototype.get = no, Ct.prototype.has = io, Ct.prototype.set = ro;
  function Gs(c, d) {
    var m = Hn(c) || Zs(c) ? us(c.length, String) : [], w = m.length, F = !!w;
    for (var j in c)
      Ot.call(c, j) && !(F && (j == "length" || vo(j, w))) && m.push(j);
    return m;
  }
  function Ri(c, d, m) {
    var w = c[d];
    (!(Ot.call(c, d) && $i(w, m)) || m === void 0 && !(d in c)) && (c[d] = m);
  }
  function Ys(c, d) {
    for (var m = c.length; m--; )
      if ($i(c[m][0], d))
        return m;
    return -1;
  }
  function ue(c, d) {
    return c && Fn(d, Kn(d), c);
  }
  function Un(c, d, m, w, F, j, G) {
    var K;
    if (w && (K = j ? w(c, F, j, G) : w(c)), K !== void 0)
      return K;
    if (!de(c))
      return c;
    var rt = Hn(c);
    if (rt) {
      if (K = yo(c), !d)
        return go(c, K);
    } else {
      var Z = xe(c), mt = Z == h || Z == f;
      if (Pi(c))
        return Xs(c, d);
      if (Z == y || Z == r || mt && !j) {
        if (ds(c))
          return j ? c : {};
        if (K = he(mt ? {} : c), !d)
          return mo(c, ue(K, c));
      } else {
        if (!W[Z])
          return j ? c : {};
        K = _o(c, Z, Un, d);
      }
    }
    G || (G = new Ct());
    var St = G.get(c);
    if (St)
      return St;
    if (G.set(c, K), !rt)
      var lt = m ? bo(c) : Kn(c);
    return He(lt || c, function(bt, dt) {
      lt && (dt = bt, bt = c[dt]), Ri(K, dt, Un(bt, d, m, w, dt, c, G));
    }), K;
  }
  function oo(c) {
    return de(c) ? Si(c) : {};
  }
  function ao(c, d, m) {
    var w = d(c);
    return Hn(c) ? w : Vs(w, m(c));
  }
  function lo(c) {
    return Ne.call(c);
  }
  function co(c) {
    if (!de(c) || To(c))
      return !1;
    var d = Wn(c) || ds(c) ? Hs : Ve;
    return d.test(Et(c));
  }
  function uo(c) {
    if (!qi(c))
      return Li(c);
    var d = [];
    for (var m in Object(c))
      Ot.call(c, m) && m != "constructor" && d.push(m);
    return d;
  }
  function Xs(c, d) {
    if (d)
      return c.slice();
    var m = new c.constructor(c.length);
    return c.copy(m), m;
  }
  function Vn(c) {
    var d = new c.constructor(c.byteLength);
    return new Rn(d).set(new Rn(c)), d;
  }
  function _s(c, d) {
    var m = d ? Vn(c.buffer) : c.buffer;
    return new c.constructor(m, c.byteOffset, c.byteLength);
  }
  function Di(c, d, m) {
    var w = d ? m(Fs(c), !0) : Fs(c);
    return we(w, Fe, new c.constructor());
  }
  function Mi(c) {
    var d = new c.constructor(c.source, vt.exec(c));
    return d.lastIndex = c.lastIndex, d;
  }
  function ho(c, d, m) {
    var w = d ? m(fs(c), !0) : fs(c);
    return we(w, at, new c.constructor());
  }
  function fo(c) {
    return ki ? Object(ki.call(c)) : {};
  }
  function po(c, d) {
    var m = d ? Vn(c.buffer) : c.buffer;
    return new c.constructor(m, c.byteOffset, c.length);
  }
  function go(c, d) {
    var m = -1, w = c.length;
    for (d || (d = Array(w)); ++m < w; )
      d[m] = c[m];
    return d;
  }
  function Fn(c, d, m, w) {
    m || (m = {});
    for (var F = -1, j = d.length; ++F < j; ) {
      var G = d[F], K = void 0;
      Ri(m, G, K === void 0 ? c[G] : K);
    }
    return m;
  }
  function mo(c, d) {
    return Fn(c, Se(c), d);
  }
  function bo(c) {
    return ao(c, Kn, Se);
  }
  function vs(c, d) {
    var m = c.__data__;
    return Eo(d) ? m[typeof d == "string" ? "string" : "hash"] : m.map;
  }
  function Xt(c, d) {
    var m = hs(c, d);
    return co(m) ? m : void 0;
  }
  var Se = Dn ? We(Dn, Object) : wo, xe = lo;
  (Ks && xe(new Ks(new ArrayBuffer(1))) != R || ms && xe(new ms()) != p || Yt && xe(Yt.resolve()) != E || zs && xe(new zs()) != A || Mn && xe(new Mn()) != x) && (xe = function(c) {
    var d = Ne.call(c), m = d == y ? c.constructor : void 0, w = m ? Et(m) : void 0;
    if (w)
      switch (w) {
        case qn:
          return R;
        case ys:
          return p;
        case Bn:
          return E;
        case $n:
          return A;
        case Pn:
          return x;
      }
    return d;
  });
  function yo(c) {
    var d = c.length, m = c.constructor(d);
    return d && typeof c[0] == "string" && Ot.call(c, "index") && (m.index = c.index, m.input = c.input), m;
  }
  function he(c) {
    return typeof c.constructor == "function" && !qi(c) ? oo(Bt(c)) : {};
  }
  function _o(c, d, m, w) {
    var F = c.constructor;
    switch (d) {
      case k:
        return Vn(c);
      case l:
      case a:
        return new F(+c);
      case R:
        return _s(c, w);
      case P:
      case V:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Mt:
      case qt:
        return po(c, w);
      case p:
        return Di(c, w, m);
      case g:
      case N:
        return new F(c);
      case T:
        return Mi(c);
      case A:
        return ho(c, w, m);
      case C:
        return fo(c);
    }
  }
  function vo(c, d) {
    return d = d ?? i, !!d && (typeof c == "number" || zt.test(c)) && c > -1 && c % 1 == 0 && c < d;
  }
  function Eo(c) {
    var d = typeof c;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? c !== "__proto__" : c === null;
  }
  function To(c) {
    return !!ps && ps in c;
  }
  function qi(c) {
    var d = c && c.constructor, m = typeof d == "function" && d.prototype || Nt;
    return c === m;
  }
  function Et(c) {
    if (c != null) {
      try {
        return gs.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Bi(c) {
    return Un(c, !0, !0);
  }
  function $i(c, d) {
    return c === d || c !== c && d !== d;
  }
  function Zs(c) {
    return Ao(c) && Ot.call(c, "callee") && (!xi.call(c, "callee") || Ne.call(c) == r);
  }
  var Hn = Array.isArray;
  function Qs(c) {
    return c != null && ji(c.length) && !Wn(c);
  }
  function Ao(c) {
    return Ui(c) && Qs(c);
  }
  var Pi = Ws || No;
  function Wn(c) {
    var d = de(c) ? Ne.call(c) : "";
    return d == h || d == f;
  }
  function ji(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function de(c) {
    var d = typeof c;
    return !!c && (d == "object" || d == "function");
  }
  function Ui(c) {
    return !!c && typeof c == "object";
  }
  function Kn(c) {
    return Qs(c) ? Gs(c) : uo(c);
  }
  function wo() {
    return [];
  }
  function No() {
    return !1;
  }
  s.exports = Bi;
})(_r, _r.exports);
var Qh = _r.exports, vr = { exports: {} };
vr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, l = "[object Arguments]", a = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", p = "[object Error]", g = "[object Function]", y = "[object GeneratorFunction]", E = "[object Map]", T = "[object Number]", A = "[object Null]", N = "[object Object]", C = "[object Promise]", x = "[object Proxy]", k = "[object RegExp]", R = "[object Set]", P = "[object String]", V = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Mt = "[object Float64Array]", qt = "[object Int8Array]", ut = "[object Int16Array]", vt = "[object Int32Array]", Ve = "[object Uint8Array]", zt = "[object Uint8ClampedArray]", W = "[object Uint16Array]", cs = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Gt = /^(?:0|[1-9]\d*)$/, H = {};
  H[it] = H[Mt] = H[qt] = H[ut] = H[vt] = H[Ve] = H[zt] = H[W] = H[cs] = !0, H[l] = H[a] = H[nt] = H[h] = H[ot] = H[f] = H[p] = H[g] = H[E] = H[T] = H[N] = H[k] = H[R] = H[P] = H[tt] = !1;
  var ae = typeof Xe == "object" && Xe && Xe.Object === Object && Xe, Fe = typeof self == "object" && self && self.Object === Object && self, at = ae || Fe || Function("return this")(), He = t && !t.nodeType && t, Vs = He && !0 && s && !s.nodeType && s, we = Vs && Vs.exports === He, us = we && ae.process, hs = function() {
    try {
      return us && us.binding && us.binding("util");
    } catch {
    }
  }(), ds = hs && hs.isTypedArray;
  function Fs(c, d) {
    for (var m = -1, w = c == null ? 0 : c.length, F = 0, j = []; ++m < w; ) {
      var G = c[m];
      d(G, m, c) && (j[F++] = G);
    }
    return j;
  }
  function We(c, d) {
    for (var m = -1, w = d.length, F = c.length; ++m < w; )
      c[F + m] = d[m];
    return c;
  }
  function fs(c, d) {
    for (var m = -1, w = c == null ? 0 : c.length; ++m < w; )
      if (d(c[m], m, c))
        return !0;
    return !1;
  }
  function kn(c, d) {
    for (var m = -1, w = Array(c); ++m < c; )
      w[m] = d(m);
    return w;
  }
  function In(c) {
    return function(d) {
      return c(d);
    };
  }
  function Nt(c, d) {
    return c.has(d);
  }
  function le(c, d) {
    return c == null ? void 0 : c[d];
  }
  function ps(c) {
    var d = -1, m = Array(c.size);
    return c.forEach(function(w, F) {
      m[++d] = [F, w];
    }), m;
  }
  function gs(c, d) {
    return function(m) {
      return c(d(m));
    };
  }
  function Ot(c) {
    var d = -1, m = Array(c.size);
    return c.forEach(function(w) {
      m[++d] = w;
    }), m;
  }
  var Ne = Array.prototype, Hs = Function.prototype, ce = Object.prototype, Oe = at["__core-js_shared__"], Rn = Hs.toString, Bt = ce.hasOwnProperty, Si = function() {
    var c = /[^.]+$/.exec(Oe && Oe.keys && Oe.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), xi = ce.toString, Ur = RegExp(
    "^" + Rn.call(Bt).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Dn = we ? at.Buffer : void 0, Ws = at.Symbol, Li = at.Uint8Array, Ks = ce.propertyIsEnumerable, ms = Ne.splice, Yt = Ws ? Ws.toStringTag : void 0, zs = Object.getOwnPropertySymbols, Mn = Dn ? Dn.isBuffer : void 0, bs = gs(Object.keys, Object), qn = Se(at, "DataView"), ys = Se(at, "Map"), Bn = Se(at, "Promise"), $n = Se(at, "Set"), Pn = Se(at, "WeakMap"), Ke = Se(Object, "create"), ki = Et(qn), Ce = Et(ys), Vr = Et(Bn), Fr = Et($n), Hr = Et(Pn), Ii = Ws ? Ws.prototype : void 0, jn = Ii ? Ii.valueOf : void 0;
  function ht(c) {
    var d = -1, m = c == null ? 0 : c.length;
    for (this.clear(); ++d < m; ) {
      var w = c[d];
      this.set(w[0], w[1]);
    }
  }
  function Wr() {
    this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
  }
  function Kr(c) {
    var d = this.has(c) && delete this.__data__[c];
    return this.size -= d ? 1 : 0, d;
  }
  function zr(c) {
    var d = this.__data__;
    if (Ke) {
      var m = d[c];
      return m === n ? void 0 : m;
    }
    return Bt.call(d, c) ? d[c] : void 0;
  }
  function Gr(c) {
    var d = this.__data__;
    return Ke ? d[c] !== void 0 : Bt.call(d, c);
  }
  function Yr(c, d) {
    var m = this.__data__;
    return this.size += this.has(c) ? 0 : 1, m[c] = Ke && d === void 0 ? n : d, this;
  }
  ht.prototype.clear = Wr, ht.prototype.delete = Kr, ht.prototype.get = zr, ht.prototype.has = Gr, ht.prototype.set = Yr;
  function gt(c) {
    var d = -1, m = c == null ? 0 : c.length;
    for (this.clear(); ++d < m; ) {
      var w = c[d];
      this.set(w[0], w[1]);
    }
  }
  function Xr() {
    this.__data__ = [], this.size = 0;
  }
  function Zr(c) {
    var d = this.__data__, m = Xs(d, c);
    if (m < 0)
      return !1;
    var w = d.length - 1;
    return m == w ? d.pop() : ms.call(d, m, 1), --this.size, !0;
  }
  function Qr(c) {
    var d = this.__data__, m = Xs(d, c);
    return m < 0 ? void 0 : d[m][1];
  }
  function Jr(c) {
    return Xs(this.__data__, c) > -1;
  }
  function to(c, d) {
    var m = this.__data__, w = Xs(m, c);
    return w < 0 ? (++this.size, m.push([c, d])) : m[w][1] = d, this;
  }
  gt.prototype.clear = Xr, gt.prototype.delete = Zr, gt.prototype.get = Qr, gt.prototype.has = Jr, gt.prototype.set = to;
  function Ct(c) {
    var d = -1, m = c == null ? 0 : c.length;
    for (this.clear(); ++d < m; ) {
      var w = c[d];
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
  function so(c) {
    var d = Xt(this, c).delete(c);
    return this.size -= d ? 1 : 0, d;
  }
  function no(c) {
    return Xt(this, c).get(c);
  }
  function io(c) {
    return Xt(this, c).has(c);
  }
  function ro(c, d) {
    var m = Xt(this, c), w = m.size;
    return m.set(c, d), this.size += m.size == w ? 0 : 1, this;
  }
  Ct.prototype.clear = eo, Ct.prototype.delete = so, Ct.prototype.get = no, Ct.prototype.has = io, Ct.prototype.set = ro;
  function Gs(c) {
    var d = -1, m = c == null ? 0 : c.length;
    for (this.__data__ = new Ct(); ++d < m; )
      this.add(c[d]);
  }
  function Ri(c) {
    return this.__data__.set(c, n), this;
  }
  function Ys(c) {
    return this.__data__.has(c);
  }
  Gs.prototype.add = Gs.prototype.push = Ri, Gs.prototype.has = Ys;
  function ue(c) {
    var d = this.__data__ = new gt(c);
    this.size = d.size;
  }
  function Un() {
    this.__data__ = new gt(), this.size = 0;
  }
  function oo(c) {
    var d = this.__data__, m = d.delete(c);
    return this.size = d.size, m;
  }
  function ao(c) {
    return this.__data__.get(c);
  }
  function lo(c) {
    return this.__data__.has(c);
  }
  function co(c, d) {
    var m = this.__data__;
    if (m instanceof gt) {
      var w = m.__data__;
      if (!ys || w.length < e - 1)
        return w.push([c, d]), this.size = ++m.size, this;
      m = this.__data__ = new Ct(w);
    }
    return m.set(c, d), this.size = m.size, this;
  }
  ue.prototype.clear = Un, ue.prototype.delete = oo, ue.prototype.get = ao, ue.prototype.has = lo, ue.prototype.set = co;
  function uo(c, d) {
    var m = Zs(c), w = !m && $i(c), F = !m && !w && Qs(c), j = !m && !w && !F && Ui(c), G = m || w || F || j, K = G ? kn(c.length, String) : [], rt = K.length;
    for (var Z in c)
      Bt.call(c, Z) && !(G && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Z == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      F && (Z == "offset" || Z == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Z == "buffer" || Z == "byteLength" || Z == "byteOffset") || // Skip index properties.
      _o(Z, rt))) && K.push(Z);
    return K;
  }
  function Xs(c, d) {
    for (var m = c.length; m--; )
      if (Bi(c[m][0], d))
        return m;
    return -1;
  }
  function Vn(c, d, m) {
    var w = d(c);
    return Zs(c) ? w : We(w, m(c));
  }
  function _s(c) {
    return c == null ? c === void 0 ? J : A : Yt && Yt in Object(c) ? xe(c) : qi(c);
  }
  function Di(c) {
    return de(c) && _s(c) == l;
  }
  function Mi(c, d, m, w, F) {
    return c === d ? !0 : c == null || d == null || !de(c) && !de(d) ? c !== c && d !== d : ho(c, d, m, w, Mi, F);
  }
  function ho(c, d, m, w, F, j) {
    var G = Zs(c), K = Zs(d), rt = G ? a : he(c), Z = K ? a : he(d);
    rt = rt == l ? N : rt, Z = Z == l ? N : Z;
    var mt = rt == N, St = Z == N, lt = rt == Z;
    if (lt && Qs(c)) {
      if (!Qs(d))
        return !1;
      G = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new ue()), G || Ui(c) ? Fn(c, d, m, w, F, j) : mo(c, d, rt, m, w, F, j);
    if (!(m & i)) {
      var bt = mt && Bt.call(c, "__wrapped__"), dt = St && Bt.call(d, "__wrapped__");
      if (bt || dt) {
        var ze = bt ? c.value() : c, Le = dt ? d.value() : d;
        return j || (j = new ue()), F(ze, Le, m, w, j);
      }
    }
    return lt ? (j || (j = new ue()), bo(c, d, m, w, F, j)) : !1;
  }
  function fo(c) {
    if (!ji(c) || Eo(c))
      return !1;
    var d = Pi(c) ? Ur : pt;
    return d.test(Et(c));
  }
  function po(c) {
    return de(c) && Wn(c.length) && !!H[_s(c)];
  }
  function go(c) {
    if (!To(c))
      return bs(c);
    var d = [];
    for (var m in Object(c))
      Bt.call(c, m) && m != "constructor" && d.push(m);
    return d;
  }
  function Fn(c, d, m, w, F, j) {
    var G = m & i, K = c.length, rt = d.length;
    if (K != rt && !(G && rt > K))
      return !1;
    var Z = j.get(c);
    if (Z && j.get(d))
      return Z == d;
    var mt = -1, St = !0, lt = m & r ? new Gs() : void 0;
    for (j.set(c, d), j.set(d, c); ++mt < K; ) {
      var bt = c[mt], dt = d[mt];
      if (w)
        var ze = G ? w(dt, bt, mt, d, c, j) : w(bt, dt, mt, c, d, j);
      if (ze !== void 0) {
        if (ze)
          continue;
        St = !1;
        break;
      }
      if (lt) {
        if (!fs(d, function(Le, Es) {
          if (!Nt(lt, Es) && (bt === Le || F(bt, Le, m, w, j)))
            return lt.push(Es);
        })) {
          St = !1;
          break;
        }
      } else if (!(bt === dt || F(bt, dt, m, w, j))) {
        St = !1;
        break;
      }
    }
    return j.delete(c), j.delete(d), St;
  }
  function mo(c, d, m, w, F, j, G) {
    switch (m) {
      case ot:
        if (c.byteLength != d.byteLength || c.byteOffset != d.byteOffset)
          return !1;
        c = c.buffer, d = d.buffer;
      case nt:
        return !(c.byteLength != d.byteLength || !j(new Li(c), new Li(d)));
      case h:
      case f:
      case T:
        return Bi(+c, +d);
      case p:
        return c.name == d.name && c.message == d.message;
      case k:
      case P:
        return c == d + "";
      case E:
        var K = ps;
      case R:
        var rt = w & i;
        if (K || (K = Ot), c.size != d.size && !rt)
          return !1;
        var Z = G.get(c);
        if (Z)
          return Z == d;
        w |= r, G.set(c, d);
        var mt = Fn(K(c), K(d), w, F, j, G);
        return G.delete(c), mt;
      case V:
        if (jn)
          return jn.call(c) == jn.call(d);
    }
    return !1;
  }
  function bo(c, d, m, w, F, j) {
    var G = m & i, K = vs(c), rt = K.length, Z = vs(d), mt = Z.length;
    if (rt != mt && !G)
      return !1;
    for (var St = rt; St--; ) {
      var lt = K[St];
      if (!(G ? lt in d : Bt.call(d, lt)))
        return !1;
    }
    var bt = j.get(c);
    if (bt && j.get(d))
      return bt == d;
    var dt = !0;
    j.set(c, d), j.set(d, c);
    for (var ze = G; ++St < rt; ) {
      lt = K[St];
      var Le = c[lt], Es = d[lt];
      if (w)
        var Ol = G ? w(Es, Le, lt, d, c, j) : w(Le, Es, lt, c, d, j);
      if (!(Ol === void 0 ? Le === Es || F(Le, Es, m, w, j) : Ol)) {
        dt = !1;
        break;
      }
      ze || (ze = lt == "constructor");
    }
    if (dt && !ze) {
      var Vi = c.constructor, Fi = d.constructor;
      Vi != Fi && "constructor" in c && "constructor" in d && !(typeof Vi == "function" && Vi instanceof Vi && typeof Fi == "function" && Fi instanceof Fi) && (dt = !1);
    }
    return j.delete(c), j.delete(d), dt;
  }
  function vs(c) {
    return Vn(c, Kn, yo);
  }
  function Xt(c, d) {
    var m = c.__data__;
    return vo(d) ? m[typeof d == "string" ? "string" : "hash"] : m.map;
  }
  function Se(c, d) {
    var m = le(c, d);
    return fo(m) ? m : void 0;
  }
  function xe(c) {
    var d = Bt.call(c, Yt), m = c[Yt];
    try {
      c[Yt] = void 0;
      var w = !0;
    } catch {
    }
    var F = xi.call(c);
    return w && (d ? c[Yt] = m : delete c[Yt]), F;
  }
  var yo = zs ? function(c) {
    return c == null ? [] : (c = Object(c), Fs(zs(c), function(d) {
      return Ks.call(c, d);
    }));
  } : wo, he = _s;
  (qn && he(new qn(new ArrayBuffer(1))) != ot || ys && he(new ys()) != E || Bn && he(Bn.resolve()) != C || $n && he(new $n()) != R || Pn && he(new Pn()) != tt) && (he = function(c) {
    var d = _s(c), m = d == N ? c.constructor : void 0, w = m ? Et(m) : "";
    if (w)
      switch (w) {
        case ki:
          return ot;
        case Ce:
          return E;
        case Vr:
          return C;
        case Fr:
          return R;
        case Hr:
          return tt;
      }
    return d;
  });
  function _o(c, d) {
    return d = d ?? o, !!d && (typeof c == "number" || Gt.test(c)) && c > -1 && c % 1 == 0 && c < d;
  }
  function vo(c) {
    var d = typeof c;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? c !== "__proto__" : c === null;
  }
  function Eo(c) {
    return !!Si && Si in c;
  }
  function To(c) {
    var d = c && c.constructor, m = typeof d == "function" && d.prototype || ce;
    return c === m;
  }
  function qi(c) {
    return xi.call(c);
  }
  function Et(c) {
    if (c != null) {
      try {
        return Rn.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Bi(c, d) {
    return c === d || c !== c && d !== d;
  }
  var $i = Di(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Di : function(c) {
    return de(c) && Bt.call(c, "callee") && !Ks.call(c, "callee");
  }, Zs = Array.isArray;
  function Hn(c) {
    return c != null && Wn(c.length) && !Pi(c);
  }
  var Qs = Mn || No;
  function Ao(c, d) {
    return Mi(c, d);
  }
  function Pi(c) {
    if (!ji(c))
      return !1;
    var d = _s(c);
    return d == g || d == y || d == u || d == x;
  }
  function Wn(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= o;
  }
  function ji(c) {
    var d = typeof c;
    return c != null && (d == "object" || d == "function");
  }
  function de(c) {
    return c != null && typeof c == "object";
  }
  var Ui = ds ? In(ds) : po;
  function Kn(c) {
    return Hn(c) ? uo(c) : go(c);
  }
  function wo() {
    return [];
  }
  function No() {
    return !1;
  }
  s.exports = Ao;
})(vr, vr.exports);
var Jh = vr.exports, pl = {};
Object.defineProperty(pl, "__esModule", { value: !0 });
const x0 = Qh, L0 = Jh;
var Ta;
(function(s) {
  function t(r = {}, o = {}, l = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = x0(o);
    l || (a = Object.keys(a).reduce((u, h) => (a[h] != null && (u[h] = a[h]), u), {}));
    for (const u in r)
      r[u] !== void 0 && o[u] === void 0 && (a[u] = r[u]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.compose = t;
  function e(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const l = Object.keys(r).concat(Object.keys(o)).reduce((a, u) => (L0(r[u], o[u]) || (a[u] = o[u] === void 0 ? null : o[u]), a), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  s.diff = e;
  function n(r = {}, o = {}) {
    r = r || {};
    const l = Object.keys(o).reduce((a, u) => (o[u] !== r[u] && r[u] !== void 0 && (a[u] = o[u]), a), {});
    return Object.keys(r).reduce((a, u) => (r[u] !== o[u] && o[u] === void 0 && (a[u] = null), a), l);
  }
  s.invert = n;
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
class k0 {
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
gl.default = k0;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = S0, n = Qh, i = Jh, r = pl;
  t.AttributeMap = r.default;
  const o = Br;
  t.Op = o.default;
  const l = gl;
  t.OpIterator = l.default;
  const a = "\0", u = (f, p) => {
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
      const y = {};
      return typeof p == "string" && p.length === 0 ? this : (y.insert = p, g != null && typeof g == "object" && Object.keys(g).length > 0 && (y.attributes = g), this.push(y));
    }
    delete(p) {
      return p <= 0 ? this : this.push({ delete: p });
    }
    retain(p, g) {
      if (typeof p == "number" && p <= 0)
        return this;
      const y = { retain: p };
      return g != null && typeof g == "object" && Object.keys(g).length > 0 && (y.attributes = g), this.push(y);
    }
    push(p) {
      let g = this.ops.length, y = this.ops[g - 1];
      if (p = n(p), typeof y == "object") {
        if (typeof p.delete == "number" && typeof y.delete == "number")
          return this.ops[g - 1] = { delete: y.delete + p.delete }, this;
        if (typeof y.delete == "number" && p.insert != null && (g -= 1, y = this.ops[g - 1], typeof y != "object"))
          return this.ops.unshift(p), this;
        if (i(p.attributes, y.attributes)) {
          if (typeof p.insert == "string" && typeof y.insert == "string")
            return this.ops[g - 1] = { insert: y.insert + p.insert }, typeof p.attributes == "object" && (this.ops[g - 1].attributes = p.attributes), this;
          if (typeof p.retain == "number" && typeof y.retain == "number")
            return this.ops[g - 1] = { retain: y.retain + p.retain }, typeof p.attributes == "object" && (this.ops[g - 1].attributes = p.attributes), this;
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
      const g = [], y = [];
      return this.forEach((E) => {
        (p(E) ? g : y).push(E);
      }), [g, y];
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
      const y = [], E = new l.default(this.ops);
      let T = 0;
      for (; T < g && E.hasNext(); ) {
        let A;
        T < p ? A = E.next(p - T) : (A = E.next(g - T), y.push(A)), T += o.default.length(A);
      }
      return new h(y);
    }
    compose(p) {
      const g = new l.default(this.ops), y = new l.default(p.ops), E = [], T = y.peek();
      if (T != null && typeof T.retain == "number" && T.attributes == null) {
        let N = T.retain;
        for (; g.peekType() === "insert" && g.peekLength() <= N; )
          N -= g.peekLength(), E.push(g.next());
        T.retain - N > 0 && y.next(T.retain - N);
      }
      const A = new h(E);
      for (; g.hasNext() || y.hasNext(); )
        if (y.peekType() === "insert")
          A.push(y.next());
        else if (g.peekType() === "delete")
          A.push(g.next());
        else {
          const N = Math.min(g.peekLength(), y.peekLength()), C = g.next(N), x = y.next(N);
          if (x.retain) {
            const k = {};
            if (typeof C.retain == "number")
              k.retain = typeof x.retain == "number" ? N : x.retain;
            else if (typeof x.retain == "number")
              C.retain == null ? k.insert = C.insert : k.retain = C.retain;
            else {
              const P = C.retain == null ? "insert" : "retain", [V, J, tt] = u(C[P], x.retain), nt = h.getHandler(V);
              k[P] = {
                [V]: nt.compose(J, tt, P === "retain")
              };
            }
            const R = r.default.compose(C.attributes, x.attributes, typeof C.retain == "number");
            if (R && (k.attributes = R), A.push(k), !y.hasNext() && i(A.ops[A.ops.length - 1], k)) {
              const P = new h(g.rest());
              return A.concat(P).chop();
            }
          } else typeof x.delete == "number" && (typeof C.retain == "number" || typeof C.retain == "object" && C.retain !== null) && A.push(x);
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
      const y = [this, p].map((C) => C.map((x) => {
        if (x.insert != null)
          return typeof x.insert == "string" ? x.insert : a;
        const k = C === p ? "on" : "with";
        throw new Error("diff() called " + k + " non-document");
      }).join("")), E = new h(), T = e(y[0], y[1], g, !0), A = new l.default(this.ops), N = new l.default(p.ops);
      return T.forEach((C) => {
        let x = C[1].length;
        for (; x > 0; ) {
          let k = 0;
          switch (C[0]) {
            case e.INSERT:
              k = Math.min(N.peekLength(), x), E.push(N.next(k));
              break;
            case e.DELETE:
              k = Math.min(x, A.peekLength()), A.next(k), E.delete(k);
              break;
            case e.EQUAL:
              k = Math.min(A.peekLength(), N.peekLength(), x);
              const R = A.next(k), P = N.next(k);
              i(R.insert, P.insert) ? E.retain(k, r.default.diff(R.attributes, P.attributes)) : E.push(P).delete(k);
              break;
          }
          x -= k;
        }
      }), E.chop();
    }
    eachLine(p, g = `
`) {
      const y = new l.default(this.ops);
      let E = new h(), T = 0;
      for (; y.hasNext(); ) {
        if (y.peekType() !== "insert")
          return;
        const A = y.peek(), N = o.default.length(A) - y.peekLength(), C = typeof A.insert == "string" ? A.insert.indexOf(g, N) - N : -1;
        if (C < 0)
          E.push(y.next());
        else if (C > 0)
          E.push(y.next(C));
        else {
          if (p(E, y.next(1).attributes || {}, T) === !1)
            return;
          T += 1, E = new h();
        }
      }
      E.length() > 0 && p(E, {}, T);
    }
    invert(p) {
      const g = new h();
      return this.reduce((y, E) => {
        if (E.insert)
          g.delete(o.default.length(E));
        else {
          if (typeof E.retain == "number" && E.attributes == null)
            return g.retain(E.retain), y + E.retain;
          if (E.delete || typeof E.retain == "number") {
            const T = E.delete || E.retain;
            return p.slice(y, y + T).forEach((N) => {
              E.delete ? g.push(N) : E.retain && E.attributes && g.retain(o.default.length(N), r.default.invert(E.attributes, N.attributes));
            }), y + T;
          } else if (typeof E.retain == "object" && E.retain !== null) {
            const T = p.slice(y, y + 1), A = new l.default(T.ops).next(), [N, C, x] = u(E.retain, A.insert), k = h.getHandler(N);
            return g.retain({ [N]: k.invert(C, x) }, r.default.invert(E.attributes, A.attributes)), y + 1;
          }
        }
        return y;
      }, 0), g.chop();
    }
    transform(p, g = !1) {
      if (g = !!g, typeof p == "number")
        return this.transformPosition(p, g);
      const y = p, E = new l.default(this.ops), T = new l.default(y.ops), A = new h();
      for (; E.hasNext() || T.hasNext(); )
        if (E.peekType() === "insert" && (g || T.peekType() !== "insert"))
          A.retain(o.default.length(E.next()));
        else if (T.peekType() === "insert")
          A.push(T.next());
        else {
          const N = Math.min(E.peekLength(), T.peekLength()), C = E.next(N), x = T.next(N);
          if (C.delete)
            continue;
          if (x.delete)
            A.push(x);
          else {
            const k = C.retain, R = x.retain;
            let P = typeof R == "object" && R !== null ? R : N;
            if (typeof k == "object" && k !== null && typeof R == "object" && R !== null) {
              const V = Object.keys(k)[0];
              if (V === Object.keys(R)[0]) {
                const J = h.getHandler(V);
                J && (P = {
                  [V]: J.transform(k[V], R[V], g)
                });
              }
            }
            A.retain(P, r.default.transform(C.attributes, x.attributes, g));
          }
        }
      return A.chop();
    }
    transformPosition(p, g = !1) {
      g = !!g;
      const y = new l.default(this.ops);
      let E = 0;
      for (; y.hasNext() && E <= p; ) {
        const T = y.peekLength(), A = y.peekType();
        if (y.next(), A === "delete") {
          p -= Math.min(T, p - E);
          continue;
        } else A === "insert" && (E < p || !g) && (p += T);
        E += T;
      }
      return p;
    }
  }
  h.Op = o.default, h.OpIterator = l.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, s.exports = h, s.exports.default = h;
})(Ea, Ea.exports);
var Vt = Ea.exports;
const B = /* @__PURE__ */ zh(Vt);
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
D(fe, "allowedChildren", [fe, re, Dt, se]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
D(fe, "order", [
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
class ft extends hi {
  constructor() {
    super(...arguments);
    D(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = td(this)), this.cache.delta;
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
    let l = this;
    r.reduce((a, u) => (l = l.split(a, !0), l.insertAt(0, u), u.length), e + o.length);
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
      const u = this.scroll.create(ft.blotName);
      return u.insertAt(0, a), u;
    }), l = this.split(t);
    o.forEach((a) => {
      this.parent.insertBefore(a, l);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), l);
  }
}
Ut.scope = $.BLOCK_BLOT;
function td(s) {
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
    } = this, l = o.data.split($t.CONTENTS).join("");
    o.data = $t.CONTENTS;
    let a;
    if (e)
      a = e, (l || i) && (e.insertAt(e.length(), l + r), i && i.remove());
    else if (i)
      a = i, i.insertAt(0, l);
    else {
      const u = document.createTextNode(l);
      a = this.scroll.create(u), this.parent.insertBefore(a, this);
    }
    if (this.remove(), t) {
      const u = (p, g) => e && p === e.domNode ? g : p === o ? n + g - 1 : i && p === i.domNode ? n + l.length + g : null, h = u(t.start.node, t.start.offset), f = u(t.end.node, t.end.offset);
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
D($t, "blotName", "cursor"), D($t, "className", "ql-cursor"), D($t, "tagName", "span"), D($t, "CONTENTS", "\uFEFF");
let An = $t;
var ed = { exports: {} };
(function(s) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
  function i(a, u, h) {
    this.fn = a, this.context = u, this.once = h || !1;
  }
  function r(a, u, h, f, p) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var g = new i(h, f || a, p), y = e ? e + u : u;
    return a._events[y] ? a._events[y].fn ? a._events[y] = [a._events[y], g] : a._events[y].push(g) : (a._events[y] = g, a._eventsCount++), a;
  }
  function o(a, u) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[u];
  }
  function l() {
    this._events = new n(), this._eventsCount = 0;
  }
  l.prototype.eventNames = function() {
    var u = [], h, f;
    if (this._eventsCount === 0) return u;
    for (f in h = this._events)
      t.call(h, f) && u.push(e ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(h)) : u;
  }, l.prototype.listeners = function(u) {
    var h = e ? e + u : u, f = this._events[h];
    if (!f) return [];
    if (f.fn) return [f.fn];
    for (var p = 0, g = f.length, y = new Array(g); p < g; p++)
      y[p] = f[p].fn;
    return y;
  }, l.prototype.listenerCount = function(u) {
    var h = e ? e + u : u, f = this._events[h];
    return f ? f.fn ? 1 : f.length : 0;
  }, l.prototype.emit = function(u, h, f, p, g, y) {
    var E = e ? e + u : u;
    if (!this._events[E]) return !1;
    var T = this._events[E], A = arguments.length, N, C;
    if (T.fn) {
      switch (T.once && this.removeListener(u, T.fn, void 0, !0), A) {
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
          return T.fn.call(T.context, h, f, p, g, y), !0;
      }
      for (C = 1, N = new Array(A - 1); C < A; C++)
        N[C - 1] = arguments[C];
      T.fn.apply(T.context, N);
    } else {
      var x = T.length, k;
      for (C = 0; C < x; C++)
        switch (T[C].once && this.removeListener(u, T[C].fn, void 0, !0), A) {
          case 1:
            T[C].fn.call(T[C].context);
            break;
          case 2:
            T[C].fn.call(T[C].context, h);
            break;
          case 3:
            T[C].fn.call(T[C].context, h, f);
            break;
          case 4:
            T[C].fn.call(T[C].context, h, f, p);
            break;
          default:
            if (!N) for (k = 1, N = new Array(A - 1); k < A; k++)
              N[k - 1] = arguments[k];
            T[C].fn.apply(T[C].context, N);
        }
    }
    return !0;
  }, l.prototype.on = function(u, h, f) {
    return r(this, u, h, f, !1);
  }, l.prototype.once = function(u, h, f) {
    return r(this, u, h, f, !0);
  }, l.prototype.removeListener = function(u, h, f, p) {
    var g = e ? e + u : u;
    if (!this._events[g]) return this;
    if (!h)
      return o(this, g), this;
    var y = this._events[g];
    if (y.fn)
      y.fn === h && (!p || y.once) && (!f || y.context === f) && o(this, g);
    else {
      for (var E = 0, T = [], A = y.length; E < A; E++)
        (y[E].fn !== h || p && !y[E].once || f && y[E].context !== f) && T.push(y[E]);
      T.length ? this._events[g] = T.length === 1 ? T[0] : T : o(this, g);
    }
    return this;
  }, l.prototype.removeAllListeners = function(u) {
    var h;
    return u ? (h = e ? e + u : u, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = e, l.EventEmitter = l, s.exports = l;
})(ed);
var I0 = ed.exports;
const R0 = /* @__PURE__ */ zh(I0), wa = /* @__PURE__ */ new WeakMap(), Na = ["error", "warn", "log", "info"];
let Oa = "warn";
function sd(s) {
  if (Oa && Na.indexOf(s) <= Na.indexOf(Oa)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      e[n - 1] = arguments[n];
    console[s](...e);
  }
}
function Ue(s) {
  return Na.reduce((t, e) => (t[e] = sd.bind(console, e, s), t), {});
}
Ue.level = (s) => {
  Oa = s;
};
sd.level = Ue.level;
const zo = Ue("quill:events"), D0 = ["selectionchange", "mousedown", "mouseup", "click"];
D0.forEach((s) => {
  document.addEventListener(s, function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = wa.get(i);
      r && r.emitter && r.emitter.handleDOM(...e);
    });
  });
});
class q extends R0 {
  constructor() {
    super(), this.domListeners = {}, this.on("error", zo.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return zo.log.call(zo, ...e), super.emit(...e);
  }
  handleDOM(t) {
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      n[i - 1] = arguments[i];
    (this.domListeners[t.type] || []).forEach((r) => {
      let {
        node: o,
        handler: l
      } = r;
      (t.target === o || o.contains(t.target)) && l(t, ...n);
    });
  }
  listenDOM(t, e, n) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: e,
      handler: n
    });
  }
}
D(q, "events", {
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
}), D(q, "sources", {
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
class M0 {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Rs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, q.sources.USER), 1);
    }), this.emitter.on(q.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(q.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? q.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(q.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: l,
          endOffset: a
        } = i.range;
        this.setNativeRange(r, o, l, a), this.update(q.sources.SILENT);
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
    const l = document.createRange();
    if (e > 0)
      return l.setStart(i, o), [r, o] = this.scroll.leaf(t + e), r == null ? null : ([i, o] = r.position(o, !0), l.setEnd(i, o), l.getBoundingClientRect());
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
      const [l, a] = o, u = this.scroll.find(l, !0), h = u.offset(this.scroll);
      return a === 0 ? h : u instanceof yt ? h + u.index(l, a) : h + u.length();
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
      const [o, l] = this.scroll.leaf(i);
      return o ? o.position(l, r) : [null, -1];
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
          native: l
        } = this.getNativeRange() || {};
        if (l == null || r || t !== l.startContainer || e !== l.startOffset || n !== l.endContainer || i !== l.endOffset) {
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
      const r = [q.events.SELECTION_CHANGE, dn(this.lastRange), dn(e), t];
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
const q0 = /^[ -~]*$/;
class B0 {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const n = Hc(t), i = new B();
    return P0(n.ops.slice()).reduce((o, l) => {
      const a = Vt.Op.length(l);
      let u = l.attributes || {}, h = !1, f = !1;
      if (l.insert != null) {
        if (i.retain(a), typeof l.insert == "string") {
          const y = l.insert;
          f = !y.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ut, o)[0]), this.scroll.insertAt(o, y);
          const [E, T] = this.scroll.line(o);
          let A = Je({}, Pt(E));
          if (E instanceof ft) {
            const [N] = E.descendant(yt, T);
            N && (A = Je(A, Pt(N)));
          }
          u = Vt.AttributeMap.diff(A, u) || {};
        } else if (typeof l.insert == "object") {
          const y = Object.keys(l.insert)[0];
          if (y == null) return o;
          const E = this.scroll.query(y, $.INLINE) != null;
          if (E)
            (e <= o || this.scroll.descendant(Ut, o)[0]) && (f = !0);
          else if (o > 0) {
            const [T, A] = this.scroll.descendant(yt, o - 1);
            T instanceof se ? T.value()[A] !== `
` && (h = !0) : T instanceof Dt && T.statics.scope === $.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, y, l.insert[y]), E) {
            const [T] = this.scroll.descendant(yt, o);
            if (T) {
              const A = Je({}, Pt(T));
              u = Vt.AttributeMap.diff(A, u) || {};
            }
          }
        }
        e += a;
      } else if (i.push(l), l.retain !== null && typeof l.retain == "object") {
        const y = Object.keys(l.retain)[0];
        if (y == null) return o;
        this.scroll.updateEmbedAt(o, y, l.retain[y]);
      }
      Object.keys(u).forEach((y) => {
        this.scroll.formatAt(o, a, y, u[y]);
      });
      const p = h ? 1 : 0, g = f ? 1 : 0;
      return e += p + g, i.retain(p), i.delete(g), o + a + p + g;
    }, 0), i.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + Vt.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
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
    const i = new B().retain(t).retain(e, dn(n));
    return this.update(i);
  }
  formatText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, e, r, n[r]);
    });
    const i = new B().retain(t).retain(e, dn(n));
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
    e === 0 ? this.scroll.path(t).forEach((l) => {
      const [a] = l;
      a instanceof ft ? n.push(a) : a instanceof yt && i.push(a);
    }) : (n = this.scroll.lines(t, e), i = this.scroll.descendants(yt, t, e));
    const [r, o] = [n, i].map((l) => {
      const a = l.shift();
      if (a == null) return {};
      let u = Pt(a);
      for (; Object.keys(u).length > 0; ) {
        const h = l.shift();
        if (h == null) return u;
        u = $0(Pt(h), u);
      }
      return u;
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
      return n.length() >= i + e && !(i === 0 && e === r) ? fi(n, i, e, !0) : fi(this.scroll, t, e, !0);
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
    }), this.update(new B().retain(t).insert(e, dn(n)));
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
    let o = 0, l = new B();
    i != null && (o = i.length() - r, l = i.delta().slice(r, r + o - 1).insert(`
`));
    const u = this.getContents(t, e + o).diff(new B().insert(n).concat(l)), h = new B().retain(t).concat(u);
    return this.applyDelta(h);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(q0) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = Pt(r), l = r.offset(this.scroll), a = e[0].oldValue.replace(An.CONTENTS, ""), u = new B().insert(a), h = new B().insert(r.value()), f = n && {
        oldRange: Wc(n.oldRange, -l),
        newRange: Wc(n.newRange, -l)
      };
      t = new B().retain(l).concat(u.diff(h, f)).reduce((g, y) => y.insert ? g.insert(y.insert, o) : g.push(y), new B()), this.delta = i.compose(t);
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
    type: l
  }, ...a] = s, [u, h] = Xo(l);
  if (o > t)
    return e.push(l), o === t + 1 ? `<${u}><li${h}>${fi(n, i, r)}${cn(a, o, e)}` : `<${u}><li>${cn(s, t + 1, e)}`;
  const f = e[e.length - 1];
  if (o === t && l === f)
    return `</li><li${h}>${fi(n, i, r)}${cn(a, o, e)}`;
  const [p] = Xo(e.pop());
  return `</li></${p}>${cn(s, t - 1, e)}`;
}
function fi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof se)
    return $r(s.value().slice(t, t + e));
  if (s instanceof ee) {
    if (s.statics.blotName === "list-container") {
      const u = [];
      return s.children.forEachAt(t, e, (h, f, p) => {
        const g = "formats" in h && typeof h.formats == "function" ? h.formats() : {};
        u.push({
          child: h,
          offset: f,
          length: p,
          indent: g.indent || 0,
          type: g.list
        });
      }), cn(u, -1, []);
    }
    const i = [];
    if (s.children.forEachAt(t, e, (u, h, f) => {
      i.push(fi(u, h, f));
    }), n || s.statics.blotName === "list")
      return i.join("");
    const {
      outerHTML: r,
      innerHTML: o
    } = s.domNode, [l, a] = r.split(`>${o}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${a}` : `${l}>${i.join("")}<${a}`;
  }
  return s.domNode instanceof Element ? s.domNode.outerHTML : "";
}
function $0(s, t) {
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
function P0(s) {
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
D(oe, "DEFAULTS", {});
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
class j0 {
  constructor(t, e) {
    D(this, "isComposing", !1);
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
const ii = class ii {
  constructor(t, e) {
    D(this, "modules", {});
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
D(ii, "DEFAULTS", {
  modules: {}
}), D(ii, "themes", {
  default: ii
});
let wn = ii;
const U0 = (s) => s.parentElement || s.getRootNode().host || null, V0 = (s) => {
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
}, Kc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, F0 = (s, t) => {
  var r, o, l;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, u = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : V0(i), h = getComputedStyle(i), f = Kc(n.left, n.right, u.left, u.right, tr(h.scrollPaddingLeft), tr(h.scrollPaddingRight)), p = Kc(n.top, n.bottom, u.top, u.bottom, tr(h.scrollPaddingTop), tr(h.scrollPaddingBottom));
    if (f || p)
      if (a)
        (l = e.defaultView) == null || l.scrollBy(f, p);
      else {
        const {
          scrollLeft: g,
          scrollTop: y
        } = i;
        p && (i.scrollTop += p), f && (i.scrollLeft += f);
        const E = i.scrollLeft - g, T = i.scrollTop - y;
        n = {
          left: n.left - E,
          top: n.top - T,
          right: n.right - E,
          bottom: n.bottom - T
        };
      }
    i = a || h.position === "fixed" ? null : U0(i);
  }
}, H0 = 100, W0 = ["block", "break", "cursor", "inline", "scroll", "text"], K0 = (s, t, e) => {
  const n = new Tn();
  return W0.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), s.forEach((i) => {
    let r = t.query(i);
    r || e.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > H0) {
        e.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, pn = Ue("quill"), er = new Tn();
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
    return this.imports[t] == null && pn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, e) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && pn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && er.register(e), typeof e.register == "function" && e.register(er);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = z0(t, e), this.container = this.options.container, this.container == null) {
      pn.error("Invalid Quill container", t);
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
    }), this.editor = new B0(this.scroll), this.selection = new M0(this.scroll, this.emitter), this.composition = new j0(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(q.events.EDITOR_CHANGE, (o) => {
      o === q.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(q.events.SCROLL_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      Zt.call(this, () => this.editor.update(null, l, h), o);
    }), this.emitter.on(q.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      Zt.call(this, () => {
        const f = new B().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
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
    F0(this.root, t);
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
D(Qt, "DEFAULTS", {
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
}), D(Qt, "events", q.events), D(Qt, "sources", q.sources), D(Qt, "version", "2.0.2"), D(Qt, "imports", {
  delta: B,
  parchment: y0,
  "core/module": oe,
  "core/theme": wn
});
let O = Qt;
function zc(s) {
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
function z0(s, t) {
  const e = zc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === O.DEFAULTS.theme ? wn : O.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = O.DEFAULTS, {
    modules: l,
    ...a
  } = i.DEFAULTS;
  let u = Zo(t.modules);
  u != null && u.toolbar && u.toolbar.constructor !== Object && (u = {
    ...u,
    toolbar: {
      container: u.toolbar
    }
  });
  const h = Je({}, Zo(r), Zo(l), u), f = {
    ...o,
    ...Gc(a),
    ...Gc(t)
  };
  let p = t.registry;
  return p ? t.formats && pn.warn('Ignoring "formats" option because "registry" is specified') : p = t.formats ? K0(t.formats, f.registry, pn) : f.registry, {
    ...f,
    registry: p,
    container: e,
    theme: i,
    modules: Object.entries(h).reduce((g, y) => {
      let [E, T] = y;
      if (!T) return g;
      const A = O.import(`modules/${E}`);
      return A == null ? (pn.error(`Cannot load ${E} module. Are you sure you registered it?`), g) : {
        ...g,
        // @ts-expect-error
        [E]: Je({}, A.DEFAULTS || {}, T)
      };
    }, {}),
    bounds: zc(f.bounds)
  };
}
function Zt(s, t, e, n) {
  if (!this.isEnabled() && t === q.sources.USER && !this.allowReadOnlyEdits)
    return new B();
  let i = e == null ? null : this.getSelection();
  const r = this.editor.delta, o = s();
  if (i != null && (e === !0 && (e = i.index), n == null ? i = Yc(i, o, t) : n !== 0 && (i = Yc(i, e, n, t)), this.setSelection(i, q.sources.SILENT)), o.length() > 0) {
    const l = [q.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(q.events.EDITOR_CHANGE, ...l), t !== q.sources.SILENT && this.emitter.emit(...l);
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
  return t && typeof t.transformPosition == "function" ? [r, o] = [s.index, s.index + s.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(l, n !== q.sources.USER)
  )) : [r, o] = [s.index, s.index + s.length].map((l) => l < t || l === t && n === q.sources.USER ? l : i >= 0 ? l + i : Math.max(t, l + i)), new Rs(r, o - r);
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
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ut, t)[0] && t < this.length()), u = r.type === "block" ? r.delta : new B().insert({
        [r.key]: r.value
      });
      Qo(this, t, u);
      const h = r.type === "block" ? 1 : 0, f = t + u.length() + h;
      a && this.insertAt(f - 1, `
`);
      const p = Pt(this.line(t)[0]), g = Vt.AttributeMap.diff(p, r.attributes) || {};
      Object.keys(g).forEach((y) => {
        this.formatAt(f - 1, 1, y, g[y]);
      }), t = f;
    }
    let [o, l] = this.children.find(t);
    if (n.length && (o && (o = o.split(l), l = 0), n.forEach((a) => {
      if (a.type === "block") {
        const u = this.createBlock(a.attributes, o || void 0);
        Qo(u, 0, a.delta);
      } else {
        const u = this.create(a.key, a.value);
        this.insertBefore(u, o || void 0), Object.keys(a.attributes).forEach((h) => {
          u.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + l : this.length();
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
      let l = [], a = o;
      return i.children.forEachAt(r, o, (u, h, f) => {
        Xc(u) ? l.push(u) : u instanceof Dr && (l = l.concat(n(u, h, a))), a -= f;
      }), l;
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
          const l = o[o.length - 1];
          l && n.insert(l, i.attributes);
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
    Object.entries(t).forEach((l) => {
      let [a, u] = l;
      this.query(a, $.BLOCK & $.BLOT) != null ? n = a : i[a] = u;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, e || void 0);
    const o = r.length();
    return Object.entries(i).forEach((l) => {
      let [a, u] = l;
      r.formatAt(0, o, a, u);
    }), r;
  }
}
D(un, "blotName", "scroll"), D(un, "className", "ql-editor"), D(un, "tagName", "DIV"), D(un, "defaultChild", ft), D(un, "allowedChildren", [ft, Ut, Ps]);
function Qo(s, t, e) {
  e.reduce((n, i) => {
    const r = Vt.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const l = i.insert;
        s.insertAt(n, l);
        const [a] = s.descendant(yt, n), u = Pt(a);
        o = Vt.AttributeMap.diff(u, o) || {};
      } else if (typeof i.insert == "object") {
        const l = Object.keys(i.insert)[0];
        if (l == null) return n;
        if (s.insertAt(n, l, i.insert[l]), s.scroll.query(l, $.INLINE) != null) {
          const [u] = s.descendant(yt, n), h = Pt(u);
          o = Vt.AttributeMap.diff(h, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      s.formatAt(n, r, l, o[l]);
    }), n + r;
  }, t);
}
const bl = {
  scope: $.BLOCK,
  whitelist: ["right", "center", "justify"]
}, G0 = new ve("align", "align", bl), nd = new ie("align", "ql-align", bl), id = new ls("align", "text-align", bl);
class rd extends ls {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const Y0 = new ie("color", "ql-color", {
  scope: $.INLINE
}), yl = new rd("color", "color", {
  scope: $.INLINE
}), X0 = new ie("background", "ql-bg", {
  scope: $.INLINE
}), _l = new rd("background", "background-color", {
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
D(_t, "TAB", "  ");
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
_t.allowedChildren = [se, re, An];
_t.requiredContainer = js;
const El = {
  scope: $.BLOCK,
  whitelist: ["rtl"]
}, od = new ve("direction", "dir", El), ad = new ie("direction", "ql-direction", El), ld = new ls("direction", "direction", El), cd = {
  scope: $.INLINE,
  whitelist: ["serif", "monospace"]
}, ud = new ie("font", "ql-font", cd);
class Z0 extends ls {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const hd = new Z0("font", "font-family", cd), dd = new ie("size", "ql-size", {
  scope: $.INLINE,
  whitelist: ["small", "large", "huge"]
}), fd = new ls("size", "font-size", {
  scope: $.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), Q0 = Ue("quill:keyboard"), J0 = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
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
    const i = eE(t);
    if (i == null) {
      Q0.warn("Attempted to add invalid keyboard binding", i);
      return;
    }
    typeof e == "function" && (e = {
      handler: e
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(i.key) ? i.key : [i.key]).forEach((o) => {
      const l = {
        ...i,
        key: o,
        ...e,
        ...n
      };
      this.bindings[l.key] = this.bindings[l.key] || [], this.bindings[l.key].push(l);
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
      const [l, a] = this.quill.getLine(o.index), [u, h] = this.quill.getLeaf(o.index), [f, p] = o.length === 0 ? [u, h] : this.quill.getLeaf(o.index + o.length), g = u instanceof yr ? u.value().slice(0, h) : "", y = f instanceof yr ? f.value().slice(p) : "", E = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
        offset: a,
        prefix: g,
        suffix: y,
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
      const [l] = this.quill.getLine(t.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const u = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = Vt.AttributeMap.diff(u, h) || {}, Object.keys(i).length > 0) {
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
      const [l] = this.quill.getLine(t.index + 1);
      if (l) {
        const a = r.formats(), u = this.quill.getFormat(t.index, 1);
        i = Vt.AttributeMap.diff(a, u) || {}, Object.keys(i).length > 0 && (o = o.retain(l.length() - 1).retain(1, i));
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
const tE = {
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
          const [e, n, i, r] = t.getTable(s), o = sE(e, n, i, r);
          if (o == null) return;
          let l = e.offset();
          if (o < 0) {
            const a = new B().retain(l).insert(`
`);
            this.quill.updateContents(a, O.sources.USER), this.quill.setSelection(s.index + 1, s.length, O.sources.SILENT);
          } else if (o > 0) {
            l += e.length();
            const a = new B().retain(l).insert(`
`);
            this.quill.updateContents(a, O.sources.USER), this.quill.setSelection(l, O.sources.USER);
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
Pr.DEFAULTS = tE;
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
        index: l,
        length: a
      } = t;
      o.forEach((u, h) => {
        s ? (u.insertAt(0, r), h === 0 ? l += r.length : a += r.length) : u.domNode.textContent.startsWith(r) && (u.deleteAt(0, r.length), h === 0 ? l -= r.length : a -= r.length);
      }), this.quill.update(O.sources.USER), this.quill.setSelection(l, a, O.sources.SILENT);
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
          let o = r.children.head, l = i;
          for (; l.prev != null; )
            l = l.prev, o = o.next;
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
function eE(s) {
  if (typeof s == "string" || typeof s == "number")
    s = {
      key: s
    };
  else if (typeof s == "object")
    s = dn(s);
  else
    return null;
  return s.shortKey && (s[J0] = s.shortKey, delete s.shortKey), s;
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
function sE(s, t, e, n) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? n === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const nE = /font-weight:\s*normal/, iE = ["P", "OL", "UL"], tu = (s) => s && iE.includes(s.tagName), rE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => tu(t.previousElementSibling) && tu(t.nextElementSibling)).forEach((t) => {
    var e;
    (e = t.parentNode) == null || e.removeChild(t);
  });
}, oE = (s) => {
  Array.from(s.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var e;
    return (e = t.getAttribute("style")) == null ? void 0 : e.match(nE);
  }).forEach((t) => {
    var n;
    const e = s.createDocumentFragment();
    e.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(e, t);
  });
};
function aE(s) {
  s.querySelector('[id^="docs-internal-guid-"]') && (oE(s), rE(s));
}
const lE = /\bmso-list:[^;]*ignore/i, cE = /\bmso-list:[^;]*\bl(\d+)/i, uE = /\bmso-list:[^;]*\blevel(\d+)/i, hE = (s, t) => {
  const e = s.getAttribute("style"), n = e == null ? void 0 : e.match(cE);
  if (!n)
    return null;
  const i = Number(n[1]), r = e == null ? void 0 : e.match(uE), o = r ? Number(r[1]) : 1, l = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(l), u = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: u,
    element: s
  };
}, dE = (s) => {
  var o, l;
  const t = Array.from(s.querySelectorAll("[style*=mso-list]")), e = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(lE) ? e.push(a) : n.push(a);
  }), e.forEach((a) => {
    var u;
    return (u = a.parentNode) == null ? void 0 : u.removeChild(a);
  });
  const i = s.documentElement.innerHTML, r = n.map((a) => hE(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let u = r.shift();
    for (; u; )
      a.push(u), u = r.length && ((o = r[0]) == null ? void 0 : o.element) === u.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === u.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((g) => {
      const y = document.createElement("li");
      y.setAttribute("data-list", g.type), g.indent > 1 && y.setAttribute("class", `ql-indent-${g.indent - 1}`), y.innerHTML = g.element.innerHTML, h.appendChild(y);
    });
    const f = (l = a[0]) == null ? void 0 : l.element, {
      parentNode: p
    } = f ?? {};
    f && (p == null || p.replaceChild(h, f)), a.slice(1).forEach((g) => {
      let {
        element: y
      } = g;
      p == null || p.removeChild(y);
    });
  }
};
function fE(s) {
  s.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && dE(s);
}
const pE = [fE, aE], gE = (s) => {
  s.documentElement && pE.forEach((t) => {
    t(s);
  });
}, mE = Ue("quill:clipboard"), bE = [[Node.TEXT_NODE, xE], [Node.TEXT_NODE, su], ["br", TE], [Node.ELEMENT_NODE, su], [Node.ELEMENT_NODE, EE], [Node.ELEMENT_NODE, vE], [Node.ELEMENT_NODE, CE], ["li", NE], ["ol, ul", OE], ["pre", AE], ["tr", SE], ["b", ta("bold")], ["i", ta("italic")], ["strike", ta("strike")], ["style", wE]], yE = [G0, od].reduce((s, t) => (s[t.keyName] = t, s), {}), eu = [id, _l, yl, ld, hd, fd].reduce((s, t) => (s[t.keyName] = t, s), {});
class pd extends oe {
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], bE.concat(this.options.matchers ?? []).forEach((n) => {
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
    return wi(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new B().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    gE(t);
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
    var o, l;
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: r
    } = this.onCopy(n, e);
    (o = t.clipboardData) == null || o.setData("text/plain", r), (l = t.clipboardData) == null || l.setData("text/html", i), e && Tl({
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
    var o, l, a, u, h;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const e = this.quill.getSelection(!0);
    if (e == null) return;
    const n = (o = t.clipboardData) == null ? void 0 : o.getData("text/html");
    let i = (l = t.clipboardData) == null ? void 0 : l.getData("text/plain");
    if (!n && !i) {
      const f = (a = t.clipboardData) == null ? void 0 : a.getData("text/uri-list");
      f && (i = this.normalizeURIList(f));
    }
    const r = Array.from(((u = t.clipboardData) == null ? void 0 : u.files) || []);
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
    mE.log("onPaste", o, {
      text: n,
      html: i
    });
    const l = new B().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(l, O.sources.USER), this.quill.setSelection(l.length() - t.length, O.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, e) {
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
            if (e.has(a)) {
              const u = e.get(a);
              u == null || u.push(l);
            } else
              e.set(a, [l]);
          });
          break;
      }
    }), [n, i];
  }
}
D(pd, "DEFAULTS", {
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
function wi(s, t) {
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
function _E(s, t) {
  return s.previousElementSibling && s.nextElementSibling && !Ze(s.previousElementSibling, t) && !Ze(s.nextElementSibling, t);
}
const nr = /* @__PURE__ */ new WeakMap();
function gd(s) {
  return s == null ? !1 : (nr.has(s) || (s.tagName === "PRE" ? nr.set(s, !0) : nr.set(s, gd(s.parentNode))), nr.get(s));
}
function Al(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new B()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let l = Al(s, o, e, n, i);
    return o.nodeType === t.ELEMENT_NODE && (l = e.reduce((a, u) => u(o, a, s), l), l = (i.get(o) || []).reduce((a, u) => u(o, a, s), l)), r.concat(l);
  }, new B()) : new B();
}
function ta(s) {
  return (t, e, n) => Us(e, s, !0, n);
}
function vE(s, t, e) {
  const n = ve.keys(s), i = ie.keys(s), r = ls.keys(s), o = {};
  return n.concat(i).concat(r).forEach((l) => {
    let a = e.query(l, $.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = yE[l], a != null && (a.attrName === l || a.keyName === l) && (o[a.attrName] = a.value(s) || void 0), a = eu[l], a != null && (a.attrName === l || a.keyName === l) && (a = eu[l], o[a.attrName] = a.value(s) || void 0));
  }), Object.entries(o).reduce((l, a) => {
    let [u, h] = a;
    return Us(l, u, h, e);
  }, t);
}
function EE(s, t, e) {
  const n = e.query(s);
  if (n == null) return t;
  if (n.prototype instanceof Dt) {
    const i = {}, r = n.value(s);
    if (r != null)
      return i[n.blotName] = r, new B().insert(i, n.formats(s, e));
  } else if (n.prototype instanceof hi && !wi(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Us(t, n.blotName, n.formats(s, e), e);
  return t;
}
function TE(s, t) {
  return wi(t, `
`) || t.insert(`
`), t;
}
function AE(s, t, e) {
  const n = e.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(s, e) : !0;
  return Us(t, "code-block", i, e);
}
function wE() {
  return new B();
}
function NE(s, t, e) {
  const n = e.query(s);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !wi(t, `
`))
    return t;
  let i = -1, r = s.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: i,
    ...l.attributes || {}
  }) : o, new B());
}
function OE(s, t, e) {
  const n = s;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Us(t, "list", i, e);
}
function su(s, t, e) {
  if (!wi(t, `
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
function CE(s, t, e) {
  var r;
  const n = {}, i = s.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, l) => {
    let [a, u] = l;
    return Us(o, a, u, e);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new B().insert("	").concat(t) : t;
}
function SE(s, t, e) {
  var i, r;
  const n = ((i = s.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? s.parentElement : (r = s.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const l = Array.from(n.querySelectorAll("tr")).indexOf(s) + 1;
    return Us(t, "table", l, e);
  }
  return t;
}
function xE(s, t, e) {
  var i;
  let n = s.data;
  if (((i = s.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!gd(s)) {
    if (n.trim().length === 0 && n.includes(`
`) && !_E(s, e))
      return t;
    const r = (o, l) => {
      const a = l.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (s.previousSibling == null && s.parentElement != null && Ze(s.parentElement, e) || s.previousSibling instanceof Element && Ze(s.previousSibling, e)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (s.nextSibling == null && s.parentElement != null && Ze(s.parentElement, e) || s.nextSibling instanceof Element && Ze(s.nextSibling, e)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class md extends oe {
  constructor(e, n) {
    super(e, n);
    D(this, "lastRecorded", 0);
    D(this, "ignoreChange", !1);
    D(this, "stack", {
      undo: [],
      redo: []
    });
    D(this, "currentRange", null);
    this.quill.on(O.events.EDITOR_CHANGE, (i, r, o, l) => {
      i === O.events.SELECTION_CHANGE ? r && l !== O.sources.SILENT && (this.currentRange = r) : i === O.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || l === O.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = Ca(this.currentRange, r));
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
      const n = kE(this.quill.scroll, e.delta);
      this.quill.setSelection(n, O.sources.USER);
    }
  }
}
D(md, "DEFAULTS", {
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
function LE(s, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((n) => s.query(n, $.BLOCK) != null) : !1;
}
function kE(s, t) {
  const e = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - e;
  return LE(s, t) && (n -= 1), n;
}
function Ca(s, t) {
  if (!s) return s;
  const e = t.transformPosition(s.index), n = t.transformPosition(s.index + s.length);
  return {
    index: e,
    length: n - e
  };
}
class bd extends oe {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("drop", (n) => {
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
  upload(t, e) {
    const n = [];
    Array.from(e).forEach((i) => {
      var r;
      i && ((r = this.options.mimetypes) != null && r.includes(i.type)) && n.push(i);
    }), n.length > 0 && this.options.handler.call(this, t, n);
  }
}
bd.DEFAULTS = {
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
const IE = ["insertText", "insertReplacementText"];
class RE extends oe {
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
    if (this.quill.composition.isComposing || t.defaultPrevented || !IE.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const n = DE(t);
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
function DE(s) {
  var t;
  return typeof s.data == "string" ? s.data : (t = s.dataTransfer) != null && t.types.includes("text/plain") ? s.dataTransfer.getData("text/plain") : null;
}
const ME = /Mac/i.test(navigator.platform), qE = 100, BE = (s) => !!(s.key === "ArrowLeft" || s.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
s.key === "ArrowUp" || s.key === "ArrowDown" || s.key === "Home" || ME && s.key === "a" && s.ctrlKey === !0);
class $E extends oe {
  constructor(e, n) {
    super(e, n);
    D(this, "isListening", !1);
    D(this, "selectionChangeDeadline", 0);
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
      !e.defaultPrevented && BE(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + qE, this.isListening) return;
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
  "blots/cursor": An,
  "blots/embed": ml,
  "blots/inline": Ee,
  "blots/scroll": un,
  "blots/text": se,
  "modules/clipboard": pd,
  "modules/history": md,
  "modules/keyboard": Pr,
  "modules/uploader": bd,
  "modules/input": RE,
  "modules/uiNode": $E
});
class PE extends ie {
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
const jE = new PE("indent", "ql-indent", {
  scope: $.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Sa extends ft {
}
D(Sa, "blotName", "blockquote"), D(Sa, "tagName", "blockquote");
class xa extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
D(xa, "blotName", "header"), D(xa, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class Ni extends Ps {
}
Ni.blotName = "list-container";
Ni.tagName = "OL";
class Oi extends ft {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    O.register(Ni);
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
Oi.blotName = "list";
Oi.tagName = "LI";
Ni.allowedChildren = [Oi];
Oi.requiredContainer = Ni;
class pi extends Ee {
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
D(pi, "blotName", "bold"), D(pi, "tagName", ["STRONG", "B"]);
class La extends pi {
}
D(La, "blotName", "italic"), D(La, "tagName", ["EM", "I"]);
class Qe extends Ee {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return yd(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
D(Qe, "blotName", "link"), D(Qe, "tagName", "A"), D(Qe, "SANITIZED_URL", "about:blank"), D(Qe, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function yd(s, t) {
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
D(ka, "blotName", "script"), D(ka, "tagName", ["SUB", "SUP"]);
class Ia extends pi {
}
D(Ia, "blotName", "strike"), D(Ia, "tagName", ["S", "STRIKE"]);
class Ra extends Ee {
}
D(Ra, "blotName", "underline"), D(Ra, "tagName", "U");
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
D(lr, "blotName", "formula"), D(lr, "className", "ql-formula"), D(lr, "tagName", "SPAN");
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
    return yd(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    iu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
D(Da, "blotName", "image"), D(Da, "tagName", "IMG");
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
D(cr, "blotName", "video"), D(cr, "className", "ql-video"), D(cr, "tagName", "IFRAME");
const Jn = new ie("code-token", "hljs", {
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
    super(t, e, n), Jn.add(this.domNode, n);
  }
  format(t, e) {
    t !== Be.blotName ? super.format(t, e) : e ? Jn.add(this.domNode, e) : (Jn.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), Jn.value(this.domNode) || this.unwrap();
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
class ni extends js {
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
        const o = this.children.reduce((a, u) => a.concat(td(u, !1)), new B()), l = t(i, r);
        o.diff(l).reduce((a, u) => {
          let {
            retain: h,
            attributes: f
          } = u;
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
ni.allowedChildren = [jt];
jt.requiredContainer = ni;
jt.allowedChildren = [Be, An, se, re];
const UE = (s, t, e) => {
  if (typeof s.versionString == "string") {
    const n = s.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return s.highlight(e, {
        language: t
      }).value;
  }
  return s.highlight(t, e).value;
};
class _d extends oe {
  static register() {
    O.register(Be, !0), O.register(jt, !0), O.register(ni, !0);
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
      if (!(t instanceof ni)) return;
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
    (t == null ? this.quill.scroll.descendants(ni) : [t]).forEach((r) => {
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
    return n.classList.add(_t.className), n.innerHTML = UE(this.options.hljs, e, t), Al(this.quill.scroll, n, [(i, r) => {
      const o = Jn.value(i);
      return o ? r.compose(new B().retain(r.length(), {
        [Be.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, l, a) => (a !== 0 && o.insert(`
`, {
      [_t.blotName]: e
    }), o.insert(l)), r)], /* @__PURE__ */ new WeakMap());
  }
}
_d.DEFAULTS = {
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
const ri = class ri extends ft {
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
    t === ri.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
D(ri, "blotName", "table"), D(ri, "tagName", "TD");
let te = ri;
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
D($e, "blotName", "table-row"), D($e, "tagName", "TR");
class ye extends Ps {
}
D(ye, "blotName", "table-body"), D(ye, "tagName", "TBODY");
class Nn extends Ps {
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
D(Nn, "blotName", "table-container"), D(Nn, "tagName", "TABLE");
Nn.allowedChildren = [ye];
ye.requiredContainer = Nn;
ye.allowedChildren = [$e];
$e.requiredContainer = ye;
$e.allowedChildren = [te];
te.requiredContainer = $e;
function wl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class VE extends oe {
  static register() {
    O.register(te), O.register($e), O.register(ye), O.register(Nn);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(Nn).forEach((t) => {
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
    let l = i.rowOffset();
    t === 0 && (l += 1), this.quill.setSelection(e.index + l, e.length, O.sources.SILENT);
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
      r.setAttribute("role", "toolbar"), FE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      ou.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var l;
      const o = (l = this.options.handlers) == null ? void 0 : l[r];
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
        const l = t.options[t.selectedIndex];
        l.hasAttribute("selected") ? r = !1 : r = l.value || !1;
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
          let l = e[i];
          typeof l == "string" && (l = l.replace(/"/g, '\\"')), o = r.querySelector(`option[value="${l}"]`);
        }
        o == null ? (r.value = "", r.selectedIndex = -1) : o.selected = !0;
      } else if (t == null)
        r.classList.remove("ql-active"), r.setAttribute("aria-pressed", "false");
      else if (r.hasAttribute("value")) {
        const o = e[i], l = o === r.getAttribute("value") || o != null && o.toString() === r.getAttribute("value") || o == null && !r.getAttribute("value");
        r.classList.toggle("ql-active", l), r.setAttribute("aria-pressed", l.toString());
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
function FE(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        au(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? HE(n, r, o) : au(n, r, o);
      }
    }), s.appendChild(n);
  });
}
function HE(s, t, e) {
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
const WE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', KE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', zE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', GE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', YE = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', XE = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', ZE = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', QE = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', lu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', JE = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', tT = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', eT = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', sT = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', nT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', iT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', rT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', oT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', aT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', lT = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', cT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', uT = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', hT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', dT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', fT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', pT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', gT = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', mT = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', bT = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', yT = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', _T = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', vT = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', ET = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', TT = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', gi = {
  align: {
    "": WE,
    center: KE,
    right: zE,
    justify: GE
  },
  background: YE,
  blockquote: XE,
  bold: ZE,
  clean: QE,
  code: lu,
  "code-block": lu,
  color: JE,
  direction: {
    "": tT,
    rtl: eT
  },
  formula: sT,
  header: {
    1: nT,
    2: iT,
    3: rT,
    4: oT,
    5: aT,
    6: lT
  },
  italic: cT,
  image: uT,
  indent: {
    "+1": hT,
    "-1": dT
  },
  link: fT,
  list: {
    bullet: pT,
    check: gT,
    ordered: mT
  },
  script: {
    sub: bT,
    super: yT
  },
  strike: _T,
  table: vT,
  underline: ET,
  video: TT
}, AT = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
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
    return t.classList.add("ql-picker-label"), t.innerHTML = AT, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
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
class vd extends jr {
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
class Ed extends jr {
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
const wT = (s) => {
  const {
    overflowY: t
  } = getComputedStyle(s, null);
  return t !== "visible" && t !== "clip";
};
class Td {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, wT(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
      const l = r.bottom - r.top, a = t.bottom - t.top + l;
      this.root.style.top = `${n - a}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const NT = [!1, "center", "right", "justify"], OT = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], CT = [!1, "serif", "monospace"], ST = ["1", "2", "3", !1], xT = ["small", !1, "large", "huge"];
class Ci extends wn {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && Qn(i, NT), typeof e.align == "object"))
        return new Ed(i, e.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && Qn(i, OT, r === "background" ? "#ffffff" : "#000000"), new vd(i, e[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? Qn(i, CT) : i.classList.contains("ql-header") ? Qn(i, ST) : i.classList.contains("ql-size") && Qn(i, xT)), new jr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(q.events.EDITOR_CHANGE, n);
  }
}
Ci.DEFAULTS = Je({}, wn.DEFAULTS, {
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
class Ad extends Td {
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
        t = LT(t);
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
function LT(s) {
  let t = s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = s.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : s;
}
function Qn(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === e ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), s.appendChild(i);
  });
}
const kT = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class wd extends Ad {
  constructor(t, e) {
    super(t, e), this.quill.on(q.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === q.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === q.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(i.index, i.length);
          if (l.length === 1) {
            const a = this.quill.getBounds(i);
            a != null && this.position(a);
          } else {
            const a = l[l.length - 1], u = this.quill.getIndex(a), h = Math.min(a.length() - 1, i.index + i.length - u), f = this.quill.getBounds(new Rs(u, h));
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
D(wd, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Nd extends Ci {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = kT), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new wd(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), gi), this.buildPickers(t.container.querySelectorAll("select"), gi));
  }
}
Nd.DEFAULTS = Je({}, Ci.DEFAULTS, {
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
const IT = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Od extends Ad {
  constructor() {
    super(...arguments);
    D(this, "preview", this.root.querySelector("a.ql-preview"));
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
            const l = Qe.formats(r.domNode);
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
D(Od, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Cd extends Ci {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = IT), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), gi), this.buildPickers(t.container.querySelectorAll("select"), gi), this.tooltip = new Od(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Cd.DEFAULTS = Je({}, Ci.DEFAULTS, {
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
  "attributors/attribute/direction": od,
  "attributors/class/align": nd,
  "attributors/class/background": X0,
  "attributors/class/color": Y0,
  "attributors/class/direction": ad,
  "attributors/class/font": ud,
  "attributors/class/size": dd,
  "attributors/style/align": id,
  "attributors/style/background": _l,
  "attributors/style/color": yl,
  "attributors/style/direction": ld,
  "attributors/style/font": hd,
  "attributors/style/size": fd
}, !0);
O.register({
  "formats/align": nd,
  "formats/direction": ad,
  "formats/indent": jE,
  "formats/background": _l,
  "formats/color": yl,
  "formats/font": ud,
  "formats/size": dd,
  "formats/blockquote": Sa,
  "formats/code-block": _t,
  "formats/header": xa,
  "formats/list": Oi,
  "formats/bold": pi,
  "formats/code": vl,
  "formats/italic": La,
  "formats/link": Qe,
  "formats/script": ka,
  "formats/strike": Ia,
  "formats/underline": Ra,
  "formats/formula": lr,
  "formats/image": Da,
  "formats/video": cr,
  "modules/syntax": _d,
  "modules/table": VE,
  "modules/toolbar": Nl,
  "themes/bubble": Nd,
  "themes/snow": Cd,
  "ui/icons": gi,
  "ui/picker": jr,
  "ui/icon-picker": Ed,
  "ui/color-picker": vd,
  "ui/tooltip": Td
}, !0);
const Ln = (s, t) => {
  const e = s.__vccOpts || s;
  for (const [n, i] of t)
    e[n] = i;
  return e;
}, RT = {
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
}, DT = RT, MT = { class: "ql-editor-container" }, qT = {
  class: "",
  ref: "editor"
};
function BT(s, t, e, n, i, r) {
  return _(), v("div", MT, [
    b("div", qT, null, 512)
  ]);
}
const $T = /* @__PURE__ */ Ln(DT, [["render", BT], ["__scopeId", "data-v-443c4edc"]]), PT = {
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
      let r = !!t.videoWidth, o, l;
      r ? (o = t.videoWidth, l = t.videoHeight) : (o = t.width, l = t.height), s.original.width = o, s.original.height = l, s.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32);
      for (let a in this.params.presets) {
        let u = this.params.presets[a];
        u.key = a, o > u.width && (l = Math.round(l * (u.width / o)), o = u.width), l > u.height && (o = Math.round(o * (u.height / l)), l = u.height), n.width = o, n.height = l, i.drawImage(t, 0, 0, o, l), s.types[u.key] = {
          width: o,
          height: l,
          convert: u.convert ? u.convert : s.type,
          quality: u.quality ? u.quality : 0.75
        }, s.types[u.key].slug = cc(s.title) + "-" + u.width + "x" + u.height + "-" + s.uid, s.types[u.key].data = n.toDataURL(
          s.types[u.key].convert,
          s.types[u.key].quality
        ), s.types[u.key].extension = this.getExtension(
          s.types[u.key].convert
        ), s.types[u.key].bytes = Math.round(
          s.types[u.key].data.length / 1.31
        ), s.bytes += s.types[u.key].bytes, e && e(u, s);
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
}, jT = PT, UT = { class: "" }, VT = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, FT = { class: "row" }, HT = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, WT = { class: "badge bg-dark text-light fw-light mx-1" }, KT = { class: "badge bg-dark text-light fw-light mx-1" }, zT = ["src"], GT = { class: "row g-1" }, YT = { class: "col-md-6" }, XT = { class: "col-md-6" }, ZT = { class: "col-md-6" }, QT = ["href"], JT = {
  key: 1,
  class: "row g-1"
}, tA = { class: "vsa-image-container border border-secondary rounded p-2 h-100 position-relative" }, eA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center"
}, sA = { class: "vsa-image-info position-absolute start-0 bottom-0 end-0 p-2 text-center text-light" }, nA = {
  key: 0,
  class: "badge bg-warning text-dark m-1"
}, iA = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, rA = { class: "badge bg-dark text-light fw-light mx-1" }, oA = { class: "badge bg-dark text-light fw-light mx-1" }, aA = { class: "bg-dark text-light rounded p-0 px-2 mb-1" }, lA = { class: "text-center mt-2" }, cA = ["onClick"], uA = ["onClick"], hA = ["href"], dA = ["onClick"], fA = ["onClick"], pA = {
  key: 0,
  class: "bi bi-film"
}, gA = {
  key: 1,
  class: "bi bi-image"
}, mA = { class: "text-light fw-light text-nowrap" }, bA = { class: "vsa-image-frame w-100 text-center" }, yA = ["src", "alt"], _A = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, vA = { class: "row g-1" }, EA = { class: "col-12" }, TA = { class: "border border-secondary rounded p-2 h-100" }, AA = ["for"], wA = { class: "fw-light" }, NA = {
  key: 0,
  class: "fs-4"
}, OA = {
  key: 1,
  class: "fs-6 text-warning"
}, CA = { class: "col-12" }, SA = { class: "border border-secondary rounded p-2 h-100" }, xA = { class: "text-center h-100 w-100 d-flex align-items-center justify-content-center" }, LA = { class: "fw-light" }, kA = {
  key: 0,
  class: "mt-1"
}, IA = { class: "badge bg-dark border border-secondary text-info mx-1" }, RA = { class: "badge bg-dark border border-secondary text-info mx-1" }, DA = {
  key: 0,
  class: "badge bg-dark border border-secondary text-info mx-1"
}, MA = {
  key: 1,
  class: "mt-1"
}, qA = { key: 2 }, BA = { class: "badge bg-dark border border-secondary text-info mx-1" }, $A = { class: "badge bg-dark border border-secondary text-info mx-1" }, PA = { class: "badge bg-dark border border-secondary text-info mx-1" }, jA = ["id", "accept"];
function UA(s, t, e, n, i, r) {
  return _(), v("div", UT, [
    b("div", {
      class: M(["vsa-upload", { wait: s.wait }])
    }, [
      s.editfile && s.editfile.presets ? (_(), v("div", VT, [
        b("div", FT, [
          (_(!0), v(z, null, Y(s.editfile.types, (o, l) => (_(), v("div", {
            class: "col-md-3",
            key: l
          }, [
            b("span", HT, I(o.convert.replace(/.*\//, "")), 1),
            b("span", WT, I(o.width) + " x " + I(o.height), 1),
            b("span", KT, "~" + I(this.round(o.bytes)), 1),
            o ? (_(), v("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, zT)) : S("", !0)
          ]))), 128))
        ]),
        Q(b("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o),
          onChange: t[1] || (t[1] = (o) => s.slug(s.index))
        }, null, 544), [
          [pe, s.editfile.title]
        ]),
        b("div", GT, [
          b("div", YT, [
            b("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          b("div", XT, [
            b("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          b("div", ZT, [
            s.type && !s.type.url ? (_(), v("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[4] || (t[4] = (o) => s.download(s.index, s.params))
            }, " Download ")) : S("", !0),
            s.type && s.type.url ? (_(), v("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: s.type.url
            }, " Download ", 8, QT)) : S("", !0)
          ])
        ])
      ])) : S("", !0),
      s.files && s.files.length ? (_(), v("div", JT, [
        (_(!0), v(z, null, Y(s.files, (o, l) => (_(), v("div", {
          class: "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3",
          key: l
        }, [
          b("div", tA, [
            o.types && o.types[s.params.thumbnail] ? (_(), v("div", eA, [
              b("div", sA, [
                t[10] || (t[10] = X(" {# ")),
                o.resized ? (_(), v("span", nA, "resized")) : S("", !0),
                t[11] || (t[11] = X(" #} {# ")),
                (_(!0), v(z, null, Y(o.types, (a, u) => (_(), v("div", {
                  class: "",
                  key: u
                }, [
                  b("span", iA, I(a.convert.replace("image/", "")), 1),
                  b("span", rA, I(a.width) + " x " + I(a.height), 1),
                  b("span", oA, "~" + I(this.round(a.bytes)), 1)
                ]))), 128)),
                t[12] || (t[12] = X(" #} ")),
                b("strong", aA, "#" + I(l + 1), 1),
                b("div", lA, [
                  b("button", {
                    title: "Delete the image",
                    type: "button",
                    class: "btn btn-sm btn-outline-danger mx-1 d-inline-block",
                    onClick: (a) => s.remove(l)
                  }, t[7] || (t[7] = [
                    b("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, cA),
                  o && o.types && o.uploaded ? (_(), v("button", {
                    key: 0,
                    title: "Download the image",
                    type: "button",
                    class: "btn btn-sm btn-outline-light mx-1",
                    onClick: (a) => s.download(l, s.params)
                  }, t[8] || (t[8] = [
                    b("i", { class: "bi bi-download" }, null, -1)
                  ]), 8, uA)) : S("", !0),
                  o && o.types && o.uploaded ? (_(), v("a", {
                    key: 1,
                    title: "Open in new tab",
                    class: "btn btn-sm btn-outline-light mx-1",
                    target: "_blank",
                    href: o.types[s.params.download].url ? o.types[s.params.download].url : o.types[s.params.download].data
                  }, t[9] || (t[9] = [
                    b("i", { class: "bi bi-box-arrow-up-right" }, null, -1)
                  ]), 8, hA)) : S("", !0),
                  o.video && !o.uploaded ? (_(), v("button", {
                    key: 2,
                    type: "button",
                    class: "btn btn-sm btn-outline-warning mx-1",
                    onClick: (a) => s.seekRandom(o)
                  }, " Seek ", 8, dA)) : S("", !0),
                  s.params.editor ? (_(), v("button", {
                    key: 3,
                    type: "button",
                    class: "btn btn-sm btn-outline-warning mx-1",
                    onClick: (a) => s.editfile = o
                  }, [
                    o.video ? (_(), v("i", pA)) : (_(), v("i", gA))
                  ], 8, fA)) : S("", !0)
                ]),
                b("div", mA, I(o.title), 1)
              ]),
              b("div", bA, [
                b("img", {
                  class: "img-fluid rounded",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, yA)
              ])
            ])) : (_(), v("div", _A, t[13] || (t[13] = [
              b("span", null, null, -1)
            ])))
          ])
        ]))), 128))
      ])) : S("", !0),
      b("div", vA, [
        b("div", EA, [
          b("div", TA, [
            b("label", {
              for: s.uploadId,
              class: M([{ disabled: s.files && s.params.limit <= s.files.length }, "btn btn-dark cursor-pointer h-100 w-100 d-flex align-items-center justify-content-center"])
            }, [
              b("span", null, [
                t[14] || (t[14] = b("span", { class: "display-3 d-block" }, "+", -1)),
                b("small", wA, [
                  s.files && s.params.limit > s.files.length ? (_(), v("div", NA, I(s.params.text), 1)) : (_(), v("div", OA, " You have reached the number of files you can upload "))
                ])
              ])
            ], 10, AA)
          ])
        ]),
        b("div", CA, [
          b("div", SA, [
            b("div", xA, [
              b("small", LA, [
                s.params.limit ? (_(), v("div", kA, [
                  t[15] || (t[15] = X(" uploaded ")),
                  b("span", IA, I(s.files.length), 1),
                  t[16] || (t[16] = X(" / ")),
                  b("span", RA, I(s.params.limit), 1),
                  this.bytes ? (_(), v("span", DA, "~" + I(this.round(this.bytes)), 1)) : S("", !0)
                ])) : S("", !0),
                s.params.accept ? (_(), v("div", MA, [
                  t[17] || (t[17] = X(" accept only ")),
                  (_(!0), v(z, null, Y(s.params.accept, (o) => (_(), v("span", {
                    class: "badge bg-dark border border-secondary text-info mx-1",
                    key: o
                  }, I(o.replace(/.*\//, "")), 1))), 128))
                ])) : S("", !0),
                s.params.presets ? (_(), v("div", qA, [
                  (_(!0), v(z, null, Y(s.params.presets, (o, l) => (_(), v("div", {
                    class: "mt-1",
                    key: l
                  }, [
                    t[18] || (t[18] = X(" preset ")),
                    b("span", BA, I(l), 1),
                    b("span", $A, I(o.width) + " x " + I(o.height), 1),
                    b("span", PA, I(o.convert.replace(/.*\//, "")), 1)
                  ]))), 128))
                ])) : S("", !0),
                s.files.length ? (_(), v("button", {
                  key: 3,
                  type: "button",
                  class: "btn btn-sm btn-danger mt-2 p-0 px-3",
                  onClick: t[5] || (t[5] = (...o) => s.resetConfirm && s.resetConfirm(...o))
                }, " remove all images ")) : S("", !0)
              ])
            ])
          ])
        ])
      ]),
      s.uploadId ? (_(), v("input", {
        key: 2,
        multiple: "",
        style: { opacity: "0", height: "1px", width: "1px" },
        id: s.uploadId,
        type: "file",
        accept: s.params.accept.join(","),
        onChange: t[6] || (t[6] = (...o) => s.handleFileChange && s.handleFileChange(...o))
      }, null, 40, jA)) : S("", !0)
    ], 2)
  ]);
}
const VA = /* @__PURE__ */ Ln(jT, [["render", UA], ["__scopeId", "data-v-044c76f0"]]), FA = {
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
      return fh(s, t);
    },
    translate(s, t, e) {
      return Ja(s, this.settings.translate, t, e);
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
    HtmlEditor: $T,
    ImageUpload: VA
  }
}, HA = FA, WA = { key: 0 }, KA = { key: 0 }, zA = {
  key: 0,
  class: "form-label text-secondary mb-1"
}, GA = {
  key: 0,
  class: "badge text-secondary fw-light"
}, YA = ["for", "innerHTML"], XA = { class: "input-group" }, ZA = ["innerHTML"], QA = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], JA = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], tw = ["name", "id", "onUpdate:modelValue", "readonly", "required"], ew = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], sw = ["name", "id", "onUpdate:modelValue", "readonly", "required"], nw = ["value"], iw = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], rw = ["innerHTML"], ow = { key: 3 }, aw = { key: 0 }, lw = ["for"], cw = ["name", "id", "onUpdate:modelValue"], uw = ["onClick"], hw = { class: "p-1" }, dw = ["innerHTML"];
function fw(s, t, e, n, i, r) {
  const o = oi("HtmlEditor"), l = oi("ImageUpload");
  return s.item && s.group.fields ? (_(), v("div", WA, [
    (_(!0), v(z, null, Y(s.group.fields, (a) => (_(), v("div", {
      class: "form-group pb-3",
      key: a
    }, [
      a.label !== null ? (_(), v("span", KA, [
        ["html", "image"].indexOf(a.type) >= 0 ? (_(), v("label", zA, [
          X(I(a.label ? a.label : s.translate(a.name)) + " ", 1),
          a.maxlength ? (_(), v("span", GA, I(s.item[a.name] ? s.item[a.name].length : 0) + " / " + I(a.maxlength), 1)) : S("", !0)
        ])) : (_(), v("label", {
          key: 1,
          class: "form-label text-secondary mb-1",
          for: s.formid + "_" + a.name,
          innerHTML: s.getValueOrFunction(a.label ? a.label : s.translate(a.name), { field: a, item: s.item })
        }, null, 8, YA))
      ])) : S("", !0),
      b("div", XA, [
        a.prefix ? (_(), v("span", {
          key: 0,
          class: "input-group-text",
          innerHTML: a.prefix
        }, null, 8, ZA)) : S("", !0),
        a.type == "text" ? Q((_(), v("input", {
          key: 1,
          class: M(["form-control", [a.class]]),
          type: "text",
          name: a.name,
          id: s.formid + "_" + a.name,
          "onUpdate:modelValue": (u) => s.item[a.name] = u,
          minlength: a.minlength,
          maxlength: a.maxlength,
          placeholder: a.placeholder ? a.placeholder : "",
          readonly: a.readonly,
          required: a.required
        }, null, 10, QA)), [
          [pe, s.item[a.name]]
        ]) : S("", !0),
        a.type == "number" ? Q((_(), v("input", {
          key: 2,
          class: M(["form-control", [a.class]]),
          type: "number",
          name: a.name,
          id: s.formid + "_" + a.name,
          "onUpdate:modelValue": (u) => s.item[a.name] = u,
          min: a.min,
          max: a.max,
          step: a.step,
          placeholder: a.placeholder ? a.placeholder : "",
          readonly: a.readonly,
          required: a.required
        }, null, 10, JA)), [
          [pe, s.item[a.name]]
        ]) : S("", !0),
        a.type == "date" ? Q((_(), v("input", {
          key: 3,
          class: M(["form-control", [a.class]]),
          type: "date",
          name: a.name,
          id: s.formid + "_" + a.name,
          "onUpdate:modelValue": (u) => s.item[a.name] = u,
          readonly: a.readonly,
          required: a.required
        }, null, 10, tw)), [
          [pe, s.item[a.name]]
        ]) : S("", !0),
        a.type == "email" ? Q((_(), v("input", {
          key: 4,
          autocomplete: "on",
          class: M(["form-control", [a.class]]),
          type: "email",
          name: a.name,
          id: s.formid + "_" + a.name,
          "onUpdate:modelValue": (u) => s.item[a.name] = u,
          minlength: a.minlength,
          maxlength: a.maxlength,
          placeholder: a.placeholder ? a.placeholder : "",
          readonly: a.readonly,
          required: a.required
        }, null, 10, ew)), [
          [pe, s.item[a.name]]
        ]) : S("", !0),
        a.type == "select" ? Q((_(), v("select", {
          key: 5,
          class: M(["form-select", [a.class]]),
          name: a.name,
          id: s.formid + "_" + a.name,
          "onUpdate:modelValue": (u) => s.item[a.name] = u,
          readonly: a.readonly,
          required: a.required
        }, [
          (_(!0), v(z, null, Y(s.selectOptions(a.options, a), (u) => (_(), v("option", {
            class: "",
            key: u,
            value: u.value
          }, I(u.label ? u.label : u.value), 9, nw))), 128))
        ], 10, sw)), [
          [Ie, s.item[a.name]]
        ]) : S("", !0),
        a.type == "textarea" ? Q((_(), v("textarea", {
          key: 6,
          class: M(["form-control", [a.class]]),
          name: a.name,
          id: s.formid + "_" + a.name,
          "onUpdate:modelValue": (u) => s.item[a.name] = u,
          rows: a.rows,
          minlength: a.minlength,
          maxlength: a.maxlength,
          placeholder: a.placeholder ? a.placeholder : "",
          readonly: a.readonly,
          required: a.required
        }, `\r
        `, 10, iw)), [
          [pe, s.item[a.name]]
        ]) : S("", !0),
        a.suffix ? (_(), v("span", {
          key: 7,
          class: "input-group-text",
          innerHTML: a.suffix
        }, null, 8, rw)) : S("", !0)
      ]),
      a.type == "html" ? (_(), ea(o, {
        key: 1,
        modelValue: s.item[a.name],
        "onUpdate:modelValue": (u) => s.item[a.name] = u,
        class: M([a.class])
      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : S("", !0),
      a.type == "image" ? (_(), ea(l, {
        key: 2,
        modelValue: s.item[a.name],
        "onUpdate:modelValue": (u) => s.item[a.name] = u,
        class: M([a.class]),
        params: a.params
      }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "params"])) : S("", !0),
      a.type == "addresses" ? (_(), v("span", ow, [
        s.item[a.name] ? (_(), v("div", aw, [
          (_(!0), v(z, null, Y(s.item[a.name], (u) => (_(), v("div", { key: u }, [
            X(I(u) + " ", 1),
            b("label", {
              class: "form-label text-secondary mb-1",
              for: s.formid + "_" + a.name
            }, I(a.label), 9, lw),
            Q(b("input", {
              class: "form-control",
              type: "text",
              name: a.name,
              id: s.formid + "_" + a.name,
              "onUpdate:modelValue": (h) => u.country = h
            }, null, 8, cw), [
              [pe, u.country]
            ])
          ]))), 128))
        ])) : S("", !0),
        b("button", {
          type: "button",
          class: "btn btn-sm btn-secondary",
          onClick: (u) => s.insertAddress(a.name)
        }, " Add ", 8, uw)
      ])) : S("", !0),
      b("div", hw, [
        b("i", {
          class: "text-muted",
          innerHTML: a.description
        }, null, 8, dw)
      ])
    ]))), 128))
  ])) : S("", !0);
}
const pw = /* @__PURE__ */ Ln(HA, [["render", fw], ["__scopeId", "data-v-90d11b51"]]), gw = {
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
    translate(s) {
      return Ja(s, this.settings.translate);
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
}, mw = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, bw = { class: "dropdown d-inline-block m-1" }, yw = {
  type: "button",
  class: "btn btn-sm btn-secondary dropdown-toggle",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, _w = { class: "mx-1" }, vw = { key: 0 }, Ew = { class: "dropdown-menu text-end" }, Tw = ["onClick"], Aw = { class: "ms-2" }, ww = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, Nw = {
  key: 1,
  class: "bi bi-circle ms-2"
}, Ow = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, Cw = { class: "pagination pagination-sm m-1" }, Sw = { class: "page-item" }, xw = { "aria-hidden": "true" }, Lw = { class: "page-item" }, kw = { "aria-hidden": "true" }, Iw = ["onClick"], Rw = { class: "page-item" }, Dw = { "aria-hidden": "true" }, Mw = { "aria-hidden": "true" }, qw = {
  key: 0,
  class: "page-item"
}, Bw = { "aria-hidden": "true" };
function $w(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? S("", !0) : (_(), v("nav", mw, [
    b("div", null, [
      b("div", bw, [
        b("button", yw, [
          Q(b("span", _w, [
            b("strong", null, I(e.config.pagination.from) + "-" + I(e.config.pagination.to), 1),
            e.config.pagination.total ? (_(), v("span", vw, " / " + I(e.config.pagination.total), 1)) : S("", !0)
          ], 512), [
            [ws, e.config.pagination.from > 0]
          ])
        ]),
        b("ul", Ew, [
          b("li", null, [
            (_(!0), v(z, null, Y(e.config.pagination.limits, (o) => (_(), v("span", {
              class: M(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (l) => r.setPageLimit(o)
            }, [
              b("strong", null, I(o), 1),
              b("small", Aw, I(r.translate("row")) + "/" + I(r.translate("page")), 1),
              e.config.pagination.limit == o ? (_(), v("i", ww)) : S("", !0),
              e.config.pagination.limit != o ? (_(), v("i", Nw)) : S("", !0)
            ], 10, Tw))), 128))
          ])
        ])
      ]),
      Q(b("div", Ow, t[4] || (t[4] = [
        b("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [ws, e.ui && e.ui.wait.table]
      ])
    ]),
    b("ul", Cw, [
      b("li", Sw, [
        b("a", {
          class: M(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          b("span", xw, I(r.translate("First")), 1)
        ], 2)
      ]),
      b("li", Lw, [
        b("a", {
          class: M(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{  translate('Prev')  }}"
        }, [
          b("span", kw, I(r.translate("Prev")), 1)
        ], 2)
      ]),
      (_(!0), v(z, null, Y(e.config.pagination.numbers, (o) => (_(), v("li", {
        key: o,
        class: "page-item"
      }, [
        b("a", {
          class: M(["page-link cursor-pointer", {
            disabled: o > e.config.pagination.pages,
            current: o == e.config.pagination.page
          }]),
          onClick: (l) => r.setPage(o)
        }, I(o), 11, Iw)
      ]))), 128)),
      b("li", Rw, [
        b("a", {
          class: M(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          b("span", Dw, [
            b("span", Mw, I(r.translate("Next")), 1)
          ])
        ], 2)
      ]),
      e.config.pagination.total ? (_(), v("li", qw, [
        b("a", {
          class: M(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          b("span", Bw, I(r.translate("Last")), 1)
        ], 2)
      ])) : S("", !0)
    ])
  ]));
}
const Pw = /* @__PURE__ */ Ln(gw, [["render", $w], ["__scopeId", "data-v-1951a01a"]]), jw = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminFormGroup: pw,
    VuAdminTablePagination: Pw
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
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Ls(this.modalElement);
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
          t.filter && (t.filter.value = t.filter.default_value !== void 0 ? t.filter.default_value : void 0, t.filter.operator = t.filter.default_operator !== void 0 ? t.filter.default_operator : void 0);
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
      return fh(s, t, this.settings, this);
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
          e[n].ids = qb(e[n].ids), await this.fetchRelation(e[n], t);
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
      ), i = await Xn(n), r = this.getResponseErrors(n, i.data);
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
      let l = Ib(o);
      return this.convertIn(s.table.columns, l), l;
    },
    async fetchRelation(s, t) {
      try {
        let e = {
          limit: 0,
          list: "select",
          columns: s.columns ? JSON.stringify(s.columns) : void 0
        };
        if (s.ids && s.ids.length) {
          let a = (typeof s.ids[0] == "string" ? "text" : "number") === "string" ? "'" + s.ids.join("','") + "'" : s.ids.join(","), u = {};
          u[s.foreign] = {
            type: "array",
            value: s.ids,
            operator: "IN"
          }, e.filter = JSON.stringify(u);
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
        const r = await Xn(i);
        if (this.getResponseErrors(i, r.data) || !r.data)
          return;
        if (n.api.input.items ? s.items = typeof n.api.input.items == "string" ? r.data[n.api.input.items] : n.api.input.items(r.data, i) : s.items = r.data, t && t[0])
          for (let l of t)
            l[s.local] && (l[s.entity] = s.items.find(
              (a, u, h) => a[s.foreign] === l[s.local]
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
        }), e = await Xn(t);
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
        let r = this.items.find((l) => l[this.settings.pkey] === e);
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
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Rb(i)), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let f = {};
          f[this.settings.form.api.output.item] = i, o = JSON.stringify(f);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const l = r ? "PUT" : "POST", a = await fetch(
          As(l, this.settings.form.api, r, n),
          Ts(l, this.settings.form.api, {
            body: o
          })
        ), u = await Xn(a), h = this.getResponseErrors(a, u.data);
        if (h) {
          e && e(h, s, n, a);
          return;
        }
        if (u.error) {
          e && e(u.error, s, n, a);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(u.data, n), t && t(u.data, a);
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
        }), n = await Xn(e), i = this.getResponseErrors(e, n.data);
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
        let i = Db(
          n,
          this.settings.table.exports[s.type].fields
        );
        Mb(i, this.settings.entity + ".csv");
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
      }, (i, r, o, l) => {
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
      return Ja(s, this.settings.translate, t, e);
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
}, Uw = { key: 0 }, Vw = ["data-bs-theme"], Fw = { class: "vua-table-title" }, Hw = { class: "d-flex align-items-center justify-content-between" }, Ww = { class: "d-inline-block" }, Kw = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, zw = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, Gw = {
  key: 0,
  class: "d-inline-block"
}, Yw = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, Xw = ["innerHTML"], Zw = { class: "dropdown d-inline-block" }, Qw = ["innerHTML"], Jw = { class: "dropdown-menu text-start" }, tN = { class: "me-2 text-muted" }, eN = ["innerHTML"], sN = ["onClick"], nN = {
  key: 1,
  class: "dropdown d-inline-block"
}, iN = { class: "mx-1" }, rN = { key: 0 }, oN = { class: "dropdown-menu" }, aN = ["onClick"], lN = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, cN = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, uN = { class: "badge text-secondary fw-normal" }, hN = {
  key: 2,
  class: "dropdown d-inline-block"
}, dN = { class: "mx-1" }, fN = { class: "dropdown-menu" }, pN = ["onClick"], gN = { class: "vua-table-header" }, mN = ["width"], bN = ["onClick"], yN = ["innerHTML"], _N = {
  key: 0,
  class: "bi bi-arrow-down"
}, vN = {
  key: 1,
  class: "bi bi-arrow-up"
}, EN = { key: 0 }, TN = ["disabled", "onClick"], AN = {
  key: 0,
  class: "vua-table-filter"
}, wN = ["width"], NN = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, ON = { class: "bi bi-check-all" }, CN = { class: "bi bi-x-lg" }, SN = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, xN = ["onUpdate:modelValue"], LN = ["disabled", "onClick"], kN = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, IN = ["onUpdate:modelValue", "disabled"], RN = { value: "=" }, DN = { value: ">" }, MN = { value: ">=" }, qN = { value: "<" }, BN = { value: "<=" }, $N = ["onUpdate:modelValue", "disabled"], PN = ["value"], jN = ["onUpdate:modelValue", "disabled", "min", "max"], UN = ["disabled", "onClick"], VN = { key: 3 }, FN = ["onUpdate:modelValue", "multiple"], HN = ["value"], WN = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, KN = ["onUpdate:modelValue"], zN = { value: "=" }, GN = { value: ">" }, YN = { value: ">=" }, XN = { value: "<" }, ZN = { value: "<=" }, QN = ["onUpdate:modelValue"], JN = ["value"], tO = ["type", "onUpdate:modelValue"], eO = ["disabled", "onClick"], sO = ["disabled", "onClick"], nO = { class: "align-middle" }, iO = ["data-label", "width", "onClick"], rO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, oO = ["innerHTML"], aO = { key: 1 }, lO = ["innerHTML"], cO = ["aria-valuenow", "aria-valuemax"], uO = { key: 0 }, hO = {
  key: 4,
  class: "input-group input-group-sm"
}, dO = ["innerHTML"], fO = ["type", "onChange", "onUpdate:modelValue"], pO = ["onChange", "onUpdate:modelValue"], gO = ["value"], mO = ["innerHTML"], bO = { key: 5 }, yO = ["disabled", "onClick"], _O = ["innerHTML"], vO = { key: 2 }, EO = { key: 0 }, TO = ["colspan"], AO = { class: "row g-3 align-items-center" }, wO = { class: "col-form-label" }, NO = ["type", "onUpdate:modelValue", "onChange"], OO = ["onUpdate:modelValue", "onChange"], CO = ["onUpdate:modelValue", "onChange"], SO = ["value"], xO = ["innerHTML"], LO = {
  key: 0,
  class: "bg-light text-dark"
}, kO = {
  key: 0,
  class: "vua-table-bulk border-info"
}, IO = ["data-label", "width"], RO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, DO = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, MO = ["type", "disabled", "onChange", "onUpdate:modelValue"], qO = ["disabled", "onChange", "onUpdate:modelValue"], BO = ["value"], $O = ["onClick"], PO = {
  key: 0,
  class: "bi bi-square text-secondary"
}, jO = {
  key: 1,
  class: "bi bi-check-square"
}, UO = { key: 2 }, VO = ["disabled", "onClick"], FO = ["innerHTML"], HO = { key: 2 }, WO = ["id"], KO = { class: "modal-dialog modal-xl" }, zO = { class: "modal-content h-100" }, GO = ["id", "data-bs-theme"], YO = { class: "modal-header" }, XO = { class: "modal-title" }, ZO = ["innerHTML"], QO = { key: 1 }, JO = { key: 2 }, tC = {
  key: 0,
  class: "d-inline-block ms-3 mt-1"
}, eC = ["innerHTML"], sC = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, nC = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, iC = ["disabled"], rC = ["disabled"], oC = {
  key: 0,
  class: "d-inline-block m-1"
}, aC = { class: "dropdown d-inline-block" }, lC = ["innerHTML"], cC = { class: "dropdown-menu text-start" }, uC = { class: "me-2 text-muted" }, hC = ["innerHTML"], dC = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, fC = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, pC = {
  key: 1,
  class: "modal-body custom-scroll"
}, gC = { class: "form-row-title mb-4 fw-lighter" }, mC = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, bC = ["disabled"], yC = ["disabled"], _C = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, vC = {
  type: "submit",
  class: "btn btn-primary m-1"
}, EC = {
  key: 1,
  class: "bg-light text-dark"
};
function TC(s, t, e, n, i, r) {
  const o = oi("VuAdminTablePagination"), l = oi("VuAdminFormGroup");
  return e.settings && e.settings.table ? (_(), v("div", Uw, [
    b("div", {
      class: M(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      b("div", {
        class: M(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      b("div", Fw, [
        b("div", Hw, [
          b("div", Ww, [
            e.settings.table.title ? (_(), v("h5", Kw, I(e.settings.table.title), 1)) : S("", !0),
            Q(b("div", zw, t[26] || (t[26] = [
              b("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [ws, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (_(), v("div", Gw, [
            i.message.table ? (_(), v("small", Yw, [
              b("span", {
                class: M(["text-" + i.message.table.priority])
              }, [
                b("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, Xw)
              ], 2)
            ])) : S("", !0),
            b("div", Zw, [
              b("button", {
                class: M(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, Qw),
              b("ul", Jw, [
                (_(!0), v(z, null, Y(i.messages.table, (a) => (_(), v("li", { key: a }, [
                  b("span", {
                    class: M(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    b("small", tN, I(a.datetime), 1),
                    b("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, eN)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : S("", !0)
        ])
      ]),
      e.settings.table.control ? (_(), v("div", {
        key: 0,
        class: M(["vua-table-control", [e.settings.table.control.class]])
      }, [
        (_(!0), v(z, null, Y(e.settings.table.control.buttons, (a) => (_(), v("span", {
          key: a.action
        }, [
          a.action !== "TABLE_COLUMNS" && !a.dropdowns ? (_(), v("button", {
            key: 0,
            type: "button",
            class: M([
              a.class ? a.class : r.getButtonClassByAction(a.action)
            ]),
            onClick: (u) => r.tableAction(a, i.items, null, u)
          }, [
            b("i", {
              class: M([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            X(" " + I(r.translate(a.title)), 1)
          ], 10, sN)) : S("", !0),
          a.action === "TABLE_COLUMNS" ? (_(), v("div", nN, [
            b("button", {
              type: "button",
              class: M([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              Q(b("span", iN, [
                b("i", {
                  class: M([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                X(" " + I(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (_(), v("span", rN, " ( " + I(r.countHiddenColumns()) + " " + I(r.translate("hidden")) + " ) ", 1)) : S("", !0)
              ], 512), [
                [ws, e.settings.table.columns.length > 0]
              ])
            ], 2),
            b("ul", oN, [
              (_(!0), v(z, null, Y(e.settings.table.columns, (u) => (_(), v("li", { key: u }, [
                b("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(u)
                }, [
                  u.hidden ? S("", !0) : (_(), v("i", lN)),
                  u.hidden ? (_(), v("i", cN)) : S("", !0),
                  X(" " + I(u.title) + " ", 1),
                  b("small", uN, I(u.name), 1)
                ], 8, aN)
              ]))), 128)),
              t[27] || (t[27] = b("li", null, [
                b("hr", { class: "dropdown-divider" })
              ], -1)),
              b("li", null, [
                b("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (u) => r.toggleColumn(!0))
                }, I(r.translate("Visible all")), 1)
              ]),
              b("li", null, [
                b("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (u) => r.toggleColumn(!1))
                }, I(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : S("", !0),
          a.dropdowns ? (_(), v("div", hN, [
            b("button", {
              type: "button",
              class: M([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              b("span", dN, [
                b("i", {
                  class: M([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                X(" " + I(r.translate(a.title)), 1)
              ])
            ], 2),
            b("ul", fN, [
              (_(!0), v(z, null, Y(a.dropdowns, (u) => (_(), v("li", { key: u }, [
                b("span", {
                  class: M(["dropdown-item cursor-pointer", [u.class]]),
                  onClick: (h) => r.tableAction(u, i.items, null, h)
                }, [
                  u.icon ? (_(), v("i", {
                    key: 0,
                    class: M([u.icon])
                  }, null, 2)) : S("", !0),
                  X(" " + I(r.translate(u.title)), 1)
                ], 10, pN)
              ]))), 128))
            ])
          ])) : S("", !0)
        ]))), 128))
      ], 2)) : S("", !0),
      e.settings.table ? (_(), v("table", {
        key: 1,
        class: M(["table vua-table mb-0", [e.settings.table.class]])
      }, [
        b("thead", null, [
          b("tr", gN, [
            (_(!0), v(z, null, Y(e.settings.table.columns, (a) => (_(), v("th", {
              class: M(["", [a.header ? a.header.class : ""]]),
              style: zn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              b("span", {
                class: M(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (u) => r.sortTable(a)
              }, [
                b("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, yN),
                i.config.order[a.name] ? (_(), v("span", {
                  key: 0,
                  class: M(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (_(), v("i", _N)) : S("", !0),
                  i.config.order[a.name].dir === "DESC" ? (_(), v("i", vN)) : S("", !0),
                  X(" " + I(i.config.order[a.name].idx + 1), 1)
                ], 2)) : S("", !0)
              ], 10, bN),
              a.header && a.header.buttons ? (_(), v("span", EN, [
                (_(!0), v(z, null, Y(a.header.buttons, (u) => (_(), v("button", {
                  key: u.action,
                  type: "button",
                  disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                  class: M([
                    u.class ? u.class : r.getButtonClassByAction(u.action)
                  ]),
                  onClick: (h) => r.tableAction(u, i.items, null, h)
                }, [
                  b("i", {
                    class: M([
                      u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                        button: u,
                        column: a,
                        table: this
                      }) : r.getButtonIconClassByAction(u.action)
                    ])
                  }, null, 2),
                  X(" " + I(r.translate(u.title)), 1)
                ], 10, TN))), 128))
              ])) : S("", !0)
            ], 14, mN))), 128))
          ]),
          r.countFilters() ? (_(), v("tr", AN, [
            (_(!0), v(z, null, Y(e.settings.table.columns, (a) => (_(), v("th", {
              style: zn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: M([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (_(), v("div", NN, [
                b("span", {
                  class: M(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (u) => r.toggleSelectedRowInPage())
                }, [
                  Q(b("i", ON, null, 512), [
                    [ws, !r.haveSelectedRowInPage()]
                  ]),
                  Q(b("i", CN, null, 512), [
                    [ws, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : S("", !0),
              a.filter && a.filter.type == "text" ? (_(), v("div", SN, [
                Q(b("input", {
                  type: "text",
                  class: M([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onKeyup: t[3] || (t[3] = Oo((u) => r.reloadTable(), ["enter"]))
                }, null, 42, xN), [
                  [pe, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (_(), v("button", {
                  key: 0,
                  class: M(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[28] || (t[28] = [
                  b("i", { class: "bi bi-x" }, null, -1)
                ]), 10, LN)) : S("", !0)
              ])) : S("", !0),
              a.filter && a.filter.type == "number" ? (_(), v("div", kN, [
                a.filter.operators == !0 ? Q((_(), v("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  b("option", RN, I(r.translate("=")), 1),
                  b("option", DN, I(r.translate(">")), 1),
                  b("option", MN, I(r.translate(">=")), 1),
                  b("option", qN, I(r.translate("<")), 1),
                  b("option", BN, I(r.translate("<=")), 1)
                ], 40, IN)), [
                  [Ie, a.filter.operator]
                ]) : S("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? Q((_(), v("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (_(!0), v(z, null, Y(a.filter.operators, (u) => (_(), v("option", {
                    key: u,
                    value: u.value
                  }, I(u.label), 9, PN))), 128))
                ], 40, $N)), [
                  [Ie, a.filter.operator]
                ]) : S("", !0),
                Q(b("input", {
                  type: "number",
                  class: M(["form-control", {
                    fixed: a.filter.fixed
                  }]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  disabled: a.filter.fixed,
                  min: a.filter.min,
                  max: a.filter.max,
                  onChange: t[6] || (t[6] = (u) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = Oo((u) => r.reloadTable(), ["enter"]))
                }, null, 42, jN), [
                  [pe, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (_(), v("button", {
                  key: 2,
                  class: M(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[29] || (t[29] = [
                  b("i", { class: "bi bi-x" }, null, -1)
                ]), 10, UN)) : S("", !0)
              ])) : S("", !0),
              a.filter && a.filter.type == "select" ? (_(), v("div", VN, [
                Q(b("select", {
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onChange: t[8] || (t[8] = (u) => r.reloadTable()),
                  multiple: a.filter.multiple,
                  class: "form-select form-select-sm pe-0 my-1"
                }, [
                  (_(!0), v(z, null, Y(a.filter.options, (u) => (_(), v("option", {
                    key: u,
                    value: u.value
                  }, I(r.translate(u.label ? u.label : u.value)), 9, HN))), 128))
                ], 40, FN), [
                  [Ie, a.filter.value]
                ])
              ])) : S("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (_(), v("div", WN, [
                a.filter.operators == !0 ? Q((_(), v("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[9] || (t[9] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  b("option", zN, I(r.translate("=")), 1),
                  b("option", GN, I(r.translate(">")), 1),
                  b("option", YN, I(r.translate(">=")), 1),
                  b("option", XN, I(r.translate("<")), 1),
                  b("option", ZN, I(r.translate("<=")), 1)
                ], 40, KN)), [
                  [Ie, a.filter.operator]
                ]) : S("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? Q((_(), v("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[10] || (t[10] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (_(!0), v(z, null, Y(a.filter.operators, (u) => (_(), v("option", {
                    key: u,
                    value: u.value
                  }, I(r.translate(u.label)), 9, JN))), 128))
                ], 40, QN)), [
                  [Ie, a.filter.operator]
                ]) : S("", !0),
                Q(b("input", {
                  type: a.filter.type,
                  class: M([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onChange: t[11] || (t[11] = (u) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = Oo((u) => r.reloadTable(), ["enter"]))
                }, null, 42, tO), [
                  [Hi, a.filter.value]
                ]),
                b("button", {
                  class: M(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[30] || (t[30] = [
                  b("i", { class: "bi bi-x" }, null, -1)
                ]), 10, eO)
              ])) : S("", !0),
              a.filter && a.filter.buttons ? (_(), v("span", {
                key: 5,
                class: M(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (_(!0), v(z, null, Y(a.filter.buttons, (u) => (_(), v("span", {
                  key: u.action
                }, [
                  b("button", {
                    type: "button",
                    disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                    class: M([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    onClick: (h) => r.tableAction(u, i.items, null, h)
                  }, [
                    b("i", {
                      class: M([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2),
                    X(" " + I(r.translate(u.title)), 1)
                  ], 10, sO)
                ]))), 128))
              ], 2)) : S("", !0)
            ], 14, wN))), 128))
          ])) : S("", !0)
        ]),
        b("tbody", null, [
          (_(!0), v(z, null, Y(this.items, (a, u) => (_(), v(z, {
            key: a.id
          }, [
            b("tr", nO, [
              (_(!0), v(z, null, Y(e.settings.table.columns, (h) => (_(), v("td", {
                style: zn([h.hidden ? "display: none" : ""]),
                key: h.name,
                "data-label": h.title ? h.title : r.translate(h.name),
                width: h.width,
                class: M(
                  r.getValueOrFunction(h.class, {
                    column: h,
                    item: a
                  })
                ),
                onClick: (f) => r.tableAction(h, a, u, f)
              }, [
                h.index ? (_(), v("div", rO, [
                  b("span", {
                    class: M(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: u + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, oO)
                ])) : S("", !0),
                !h.template && !h.input && !h.progressbar ? (_(), v("span", aO, I(r.tableCellValue(h.name, a, u, h)), 1)) : S("", !0),
                h.template ? (_(), v("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, u, h)
                }, null, 8, lO)) : S("", !0),
                h.progressbar ? (_(), v("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": a[h.name],
                  "aria-valuemax": h.progressbar.max
                }, [
                  b("div", {
                    class: M(["progress-bar", [h.progressbar.class]]),
                    style: zn({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (_(), v("span", uO, I(a[h.name]), 1)) : S("", !0)
                  ], 6)
                ], 8, cO)) : S("", !0),
                h.input ? (_(), v("div", hO, [
                  h.input.prefix ? (_(), v("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, dO)) : S("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    h.input.type
                  ) >= 0 ? Q((_(), v("input", {
                    key: 1,
                    type: h.input.type,
                    class: M(["form-control form-control-sm", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (f) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (f) => a[h.name] = f
                  }, null, 42, fO)), [
                    [Hi, a[h.name]]
                  ]) : S("", !0),
                  h.input.type == "select" ? Q((_(), v("select", {
                    key: 2,
                    class: M(["form-select form-select-sm pe-0", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (f) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (f) => a[h.name] = f
                  }, [
                    (_(!0), v(z, null, Y(h.input.options, (f) => (_(), v("option", {
                      value: f.value,
                      key: f
                    }, I(r.translate(f.label)), 9, gO))), 128))
                  ], 42, pO)), [
                    [Ie, a[h.name]]
                  ]) : S("", !0),
                  h.input.suffix ? (_(), v("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, mO)) : S("", !0)
                ])) : S("", !0),
                h.buttons ? (_(), v("span", bO, [
                  (_(!0), v(z, null, Y(h.buttons, (f) => (_(), v("span", {
                    key: f.action
                  }, [
                    b("button", {
                      type: "button",
                      disabled: f.disabled !== void 0 ? r.getValueOrFunction(f.disabled) : null,
                      class: M([
                        f.class ? r.getValueOrFunction(f.class, {
                          button: f,
                          column: h,
                          item: a,
                          table: this
                        }) : r.getButtonClassByAction(f.action)
                      ]),
                      onClick: (p) => r.tableAction(f, a, u, p)
                    }, [
                      f.icon !== null ? (_(), v("i", {
                        key: 0,
                        class: M([
                          f.icon !== void 0 ? r.getValueOrFunction(f.icon, {
                            button: f,
                            column: h,
                            item: a,
                            table: this
                          }) : r.getButtonIconClassByAction(f.action)
                        ])
                      }, null, 2)) : S("", !0),
                      f.template ? (_(), v("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(f.template, a, u, h)
                      }, null, 8, _O)) : (_(), v("span", vO, I(r.translate(f.title)), 1))
                    ], 10, yO)
                  ]))), 128))
                ])) : S("", !0)
              ], 14, iO))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (_(), v("tr", EO, [
              b("td", {
                class: M([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (_(!0), v(z, null, Y(e.settings.table.details.fields, (h) => (_(), v("div", {
                  class: "m-0",
                  key: h
                }, [
                  b("div", AO, [
                    b("div", {
                      class: M(["col text-end", [h.class]])
                    }, [
                      b("label", wO, I(h.label), 1)
                    ], 2),
                    b("div", {
                      class: M(["col", [h.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(h.input.type) < 0 ? Q((_(), v("input", {
                        key: 0,
                        type: h.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (f) => a[h.name] = f,
                        onChange: (f) => r.onRowInputChange(a[h.name], h, a, u)
                      }, null, 40, NO)), [
                        [Hi, a[h.name]]
                      ]) : S("", !0),
                      h.input.type == "textarea" ? Q((_(), v("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (f) => a[h.name] = f,
                        onChange: (f) => r.onRowInputChange(a[h.name], h, a, u)
                      }, `\r
\r
                    `, 40, OO)), [
                        [pe, a[h.name]]
                      ]) : S("", !0),
                      h.input.type == "select" ? Q((_(), v("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (f) => a[h.name] = f,
                        onChange: (f) => r.onRowInputChange(a[h.name], h, a, u)
                      }, [
                        (_(!0), v(z, null, Y(h.input.options, (f) => (_(), v("option", {
                          value: f.value,
                          key: f
                        }, I(r.translate(f.label)), 9, SO))), 128))
                      ], 40, CO)), [
                        [Ie, a[h.name]]
                      ]) : S("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                b("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, xO),
                e.settings.debug ? (_(), v("pre", LO, "                " + I(a) + `
              `, 1)) : S("", !0)
              ], 10, TO)
            ])) : S("", !0)
          ], 64))), 128))
        ]),
        b("tfoot", null, [
          i.selected.length > 0 ? (_(), v("tr", kO, [
            (_(!0), v(z, null, Y(e.settings.table.columns, (a) => (_(), v("td", {
              style: zn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: M(a.class)
            }, [
              a.index ? (_(), v("div", RO, [
                b("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (u) => r.toggleSelectedAll())
                }, I(i.selected.length), 1)
              ])) : S("", !0),
              a.input && a.bulk && a.bulk.enabled ? (_(), v("div", DO, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? Q((_(), v("input", {
                  key: 0,
                  type: a.input.type,
                  class: M(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, null, 42, MO)), [
                  [Hi, i.bulkitem[a.name]]
                ]) : S("", !0),
                a.input.type == "select" ? Q((_(), v("select", {
                  key: 1,
                  class: M(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, [
                  (_(!0), v(z, null, Y(a.input.options, (u) => (_(), v("option", {
                    value: u.value,
                    key: u
                  }, I(r.translate(u.label)), 9, BO))), 128))
                ], 42, qO)), [
                  [Ie, i.bulkitem[a.name]]
                ]) : S("", !0),
                b("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (u) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (_(), v("i", PO)) : (_(), v("i", jO))
                ], 8, $O)
              ])) : S("", !0),
              a.bulk ? (_(), v("span", UO, [
                (_(!0), v(z, null, Y(a.bulk.buttons, (u) => (_(), v("span", {
                  key: u.action
                }, [
                  b("button", {
                    type: "button",
                    class: M([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    disabled: u.action === "save" && !this.bulkinputs.length,
                    onClick: (h) => r.tableBulkAction(u.action, i.bulkitem, a, h)
                  }, [
                    u.icon !== null ? (_(), v("i", {
                      key: 0,
                      class: M([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2)) : S("", !0),
                    u.template ? (_(), v("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(u.template, i.bulkitem, null, a)
                    }, null, 8, FO)) : (_(), v("span", HO, I(r.translate(u.title)), 1))
                  ], 10, VO)
                ]))), 128))
              ])) : S("", !0)
            ], 14, IO))), 128))
          ])) : S("", !0)
        ])
      ], 2)) : S("", !0),
      hu(o, {
        settings: e.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"]),
      b("div", {
        class: "modal shadow",
        id: i.modalId,
        tabindex: "-1"
      }, [
        b("div", KO, [
          b("div", zO, [
            i.item ? (_(), v("form", {
              key: 0,
              ref: "form",
              id: s.formId,
              class: M(["form", [e.settings.form.class, { wait: i.ui.wait.form }]]),
              onSubmit: t[25] || (t[25] = Ld((...a) => r.submitItem && r.submitItem(...a), ["prevent"])),
              "data-bs-theme": [e.settings.theme]
            }, [
              b("div", {
                class: M(["vua-overlay", { blocked: i.ui.block.form }])
              }, null, 2),
              b("div", YO, [
                b("h5", XO, [
                  e.settings.form.title && typeof e.settings.form.title == "function" ? (_(), v("span", {
                    key: 0,
                    innerHTML: e.settings.form.title(i.item, e.settings)
                  }, null, 8, ZO)) : S("", !0),
                  e.settings.form.title && typeof e.settings.form.title == "string" ? (_(), v("span", QO, I(r.translate(e.settings.form.title)), 1)) : S("", !0),
                  e.settings.form.title ? S("", !0) : (_(), v("span", JO, I(r.translate("Edit")), 1))
                ]),
                i.message.form ? (_(), v("span", tC, [
                  b("span", {
                    class: M(["text-" + i.message.form.priority])
                  }, [
                    t[31] || (t[31] = b("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
                    b("span", {
                      innerHTML: i.message.form.msg
                    }, null, 8, eC)
                  ], 2)
                ])) : S("", !0),
                Q(b("span", sC, t[32] || (t[32] = [
                  b("span", { class: "visually-hidden" }, "Loading...", -1)
                ]), 512), [
                  [ws, i.ui.wait.form]
                ]),
                t[33] || (t[33] = b("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "modal",
                  "aria-label": "Close"
                }, null, -1))
              ]),
              i.item ? (_(), v("div", nC, [
                b("div", null, [
                  b("button", {
                    type: "button",
                    class: "btn btn-sm btn-secondary m-1",
                    onClick: t[14] || (t[14] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[34] || (t[34] = b("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    X(" " + I(r.translate("Reload")), 1)
                  ], 8, iC),
                  b("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[15] || (t[15] = (a) => r.createItem())
                  }, [
                    t[35] || (t[35] = b("i", { class: "bi bi-plus-circle" }, null, -1)),
                    X(" " + I(r.translate("New")), 1)
                  ]),
                  b("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[16] || (t[16] = (a) => r.copyItem())
                  }, [
                    t[36] || (t[36] = b("i", { class: "bi bi-copy" }, null, -1)),
                    X(" " + I(r.translate("Copy")), 1)
                  ]),
                  b("button", {
                    type: "button",
                    class: "btn btn-sm btn-danger m-1",
                    onClick: t[17] || (t[17] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[37] || (t[37] = b("i", { class: "bi bi-trash" }, null, -1)),
                    X(" " + I(r.translate("Delete")), 1)
                  ], 8, rC)
                ]),
                b("div", null, [
                  i.messages.form.length ? (_(), v("div", oC, [
                    b("div", aC, [
                      b("button", {
                        class: M(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.form[0].priority]]),
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false",
                        innerHTML: i.messages.form.length + " " + (i.messages.form.length > 1 ? r.translate("messages") : r.translate("message"))
                      }, null, 10, lC),
                      b("ul", cC, [
                        (_(!0), v(z, null, Y(i.messages.form, (a) => (_(), v("li", { key: a }, [
                          b("span", {
                            class: M(["dropdown-item", ["text-" + a.priority]])
                          }, [
                            b("small", uC, I(a.datetime), 1),
                            b("span", {
                              innerHTML: a.msg
                            }, null, 8, hC)
                          ], 2)
                        ]))), 128))
                      ])
                    ])
                  ])) : S("", !0),
                  b("button", dC, [
                    t[38] || (t[38] = b("i", { class: "bi bi-x" }, null, -1)),
                    X(" " + I(r.translate("Close")), 1)
                  ]),
                  b("button", fC, [
                    t[39] || (t[39] = b("i", { class: "bi bi-save" }, null, -1)),
                    X(" " + I(r.translate("Save")), 1)
                  ]),
                  b("button", {
                    type: "button",
                    class: "btn btn-sm btn-success m-1",
                    onClick: t[18] || (t[18] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[40] || (t[40] = b("i", { class: "bi bi-save" }, null, -1)),
                    X(" " + I(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : S("", !0),
              e.settings.form ? (_(), v("div", pC, [
                b("div", {
                  class: M(["row", [e.settings.form.rowclass ? e.settings.form.rowclass : ""]])
                }, [
                  (_(!0), v(z, null, Y(e.settings.form.groups, (a) => (_(), v("div", {
                    class: M(["pb-5", [a.class ? a.class : "col-md-12"]]),
                    key: a
                  }, [
                    b("h2", gC, I(a.title), 1),
                    i.item && a ? (_(), ea(l, {
                      key: 0,
                      modelValue: i.item,
                      "onUpdate:modelValue": t[19] || (t[19] = (u) => i.item = u),
                      group: a,
                      formid: s.formId,
                      settings: e.settings
                    }, null, 8, ["modelValue", "group", "formid", "settings"])) : S("", !0)
                  ], 2))), 128))
                ], 2)
              ])) : S("", !0),
              i.item ? (_(), v("div", mC, [
                b("div", null, [
                  b("button", {
                    type: "button",
                    class: "btn btn-secondary m-1",
                    onClick: t[20] || (t[20] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[41] || (t[41] = b("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    X(" " + I(r.translate("Reload")), 1)
                  ], 8, bC),
                  b("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[21] || (t[21] = (a) => r.createItem())
                  }, [
                    t[42] || (t[42] = b("i", { class: "bi bi-plus-circle" }, null, -1)),
                    X(" " + I(r.translate("New")), 1)
                  ]),
                  b("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[22] || (t[22] = (a) => r.copyItem())
                  }, [
                    t[43] || (t[43] = b("i", { class: "bi bi-copy" }, null, -1)),
                    X(" " + I(r.translate("Copy")), 1)
                  ]),
                  b("button", {
                    type: "button",
                    class: "btn btn-danger m-1",
                    onClick: t[23] || (t[23] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[44] || (t[44] = b("i", { class: "bi bi-trash" }, null, -1)),
                    X(" " + I(r.translate("Delete")), 1)
                  ], 8, yC)
                ]),
                b("div", null, [
                  b("button", _C, [
                    t[45] || (t[45] = b("i", { class: "bi bi-x" }, null, -1)),
                    X(" " + I(r.translate("Close")), 1)
                  ]),
                  b("button", vC, [
                    t[46] || (t[46] = b("i", { class: "bi bi-save" }, null, -1)),
                    X(" " + I(r.translate("Save")), 1)
                  ]),
                  b("button", {
                    type: "button",
                    class: "btn btn-success m-1",
                    onClick: t[24] || (t[24] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[47] || (t[47] = b("i", { class: "bi bi-save" }, null, -1)),
                    X(" " + I(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : S("", !0)
            ], 42, GO)) : S("", !0),
            e.settings.debug ? (_(), v("pre", EC, "        " + I(i.item) + `
      `, 1)) : S("", !0)
          ])
        ])
      ], 8, WO)
    ], 10, Vw)
  ])) : S("", !0);
}
const AC = /* @__PURE__ */ Ln(jw, [["render", TC], ["__scopeId", "data-v-5d6e996a"]]), wC = {
  name: "VuAdmin",
  props: {
    entity: {
      type: String,
      required: !0
    }
  },
  init: (s) => {
    s && console.log("", s);
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
      if (this.settings = Object.assign({}, this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, !this.settings.theme) {
        const s = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = s || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings);
    } else
      console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: AC
  }
}, NC = { key: 0 }, OC = ["data-bs-theme"];
function CC(s, t, e, n, i, r) {
  const o = oi("vu-admin-table");
  return e.entity && i.settings ? (_(), v("div", NC, [
    b("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      hu(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, OC)
  ])) : S("", !0);
}
const SC = /* @__PURE__ */ Ln(wC, [["render", CC]]), qC = {
  install(s) {
    s.component("VuAdmin", SC);
  }
};
export {
  SC as VuAdmin,
  qC as default
};
