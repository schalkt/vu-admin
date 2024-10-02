var kd = Object.defineProperty;
var Id = (s, t, e) => t in s ? kd(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var M = (s, t, e) => Id(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as b, createElementBlock as y, createElementVNode as f, normalizeClass as R, Fragment as W, renderList as K, toDisplayString as O, createCommentVNode as A, withDirectives as G, vModelText as jt, withKeys as ni, withModifiers as na, createTextVNode as V, resolveComponent as ui, vModelCheckbox as Rd, vModelSelect as Re, createBlock as ia, vModelDynamic as dn, vShow as Ns, normalizeStyle as Yn, createVNode as fu } from "vue";
var Tt = "top", kt = "bottom", It = "right", At = "left", Ar = "auto", Sn = [Tt, kt, It, At], xs = "start", bn = "end", pu = "clippingParents", Ba = "viewport", sn = "popper", gu = "reference", ra = /* @__PURE__ */ Sn.reduce(function(s, t) {
  return s.concat([t + "-" + xs, t + "-" + bn]);
}, []), Pa = /* @__PURE__ */ [].concat(Sn, [Ar]).reduce(function(s, t) {
  return s.concat([t, t + "-" + xs, t + "-" + bn]);
}, []), mu = "beforeRead", bu = "read", yu = "afterRead", _u = "beforeMain", vu = "main", Eu = "afterMain", wu = "beforeWrite", Tu = "write", Au = "afterWrite", Nu = [mu, bu, yu, _u, vu, Eu, wu, Tu, Au];
function ve(s) {
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
function Wt(s) {
  var t = Rt(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
}
function ja(s) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Rt(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
}
function Dd(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !Wt(r) || !ve(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var c = i[o];
      c === !1 ? r.removeAttribute(o) : r.setAttribute(o, c === !0 ? "" : c);
    }));
  });
}
function Md(s) {
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
      !Wt(i) || !ve(i) || (Object.assign(i.style, c), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const Ua = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Dd,
  effect: Md,
  requires: ["computeStyles"]
};
function me(s) {
  return s.split("-")[0];
}
var Ss = Math.max, fr = Math.min, yn = Math.round;
function oa() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ou() {
  return !/^((?!chrome|android).)*safari/i.test(oa());
}
function _n(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Wt(s) && (i = s.offsetWidth > 0 && yn(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && yn(n.height) / s.offsetHeight || 1);
  var o = Ls(s) ? Rt(s) : window, c = o.visualViewport, a = !Ou() && e, l = (n.left + (a && c ? c.offsetLeft : 0)) / i, h = (n.top + (a && c ? c.offsetTop : 0)) / r, p = n.width / i, g = n.height / r;
  return {
    width: p,
    height: g,
    top: h,
    right: l + p,
    bottom: h + g,
    left: l,
    x: l,
    y: h
  };
}
function Va(s) {
  var t = _n(s), e = s.offsetWidth, n = s.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: s.offsetLeft,
    y: s.offsetTop,
    width: e,
    height: n
  };
}
function Cu(s, t) {
  var e = t.getRootNode && t.getRootNode();
  if (s.contains(t))
    return !0;
  if (e && ja(e)) {
    var n = t;
    do {
      if (n && s.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function qe(s) {
  return Rt(s).getComputedStyle(s);
}
function qd(s) {
  return ["table", "td", "th"].indexOf(ve(s)) >= 0;
}
function rs(s) {
  return ((Ls(s) ? s.ownerDocument : (
    // $FlowFixMe[prop-missing]
    s.document
  )) || window.document).documentElement;
}
function Nr(s) {
  return ve(s) === "html" ? s : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    s.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    s.parentNode || // DOM Element detected
    (ja(s) ? s.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    rs(s)
  );
}
function Ll(s) {
  return !Wt(s) || // https://github.com/popperjs/popper-core/issues/837
  qe(s).position === "fixed" ? null : s.offsetParent;
}
function $d(s) {
  var t = /firefox/i.test(oa()), e = /Trident/i.test(oa());
  if (e && Wt(s)) {
    var n = qe(s);
    if (n.position === "fixed")
      return null;
  }
  var i = Nr(s);
  for (ja(i) && (i = i.host); Wt(i) && ["html", "body"].indexOf(ve(i)) < 0; ) {
    var r = qe(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function vi(s) {
  for (var t = Rt(s), e = Ll(s); e && qd(e) && qe(e).position === "static"; )
    e = Ll(e);
  return e && (ve(e) === "html" || ve(e) === "body" && qe(e).position === "static") ? t : e || $d(s) || t;
}
function Fa(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function ii(s, t, e) {
  return Ss(s, fr(t, e));
}
function Bd(s, t, e) {
  var n = ii(s, t, e);
  return n > e ? e : n;
}
function Su() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function xu(s) {
  return Object.assign({}, Su(), s);
}
function Lu(s, t) {
  return t.reduce(function(e, n) {
    return e[n] = s, e;
  }, {});
}
var Pd = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, xu(typeof t != "number" ? t : Lu(t, Sn));
};
function jd(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, c = me(e.placement), a = Fa(c), l = [At, It].indexOf(c) >= 0, h = l ? "height" : "width";
  if (!(!r || !o)) {
    var p = Pd(i.padding, e), g = Va(r), m = a === "y" ? Tt : At, v = a === "y" ? kt : It, E = e.rects.reference[h] + e.rects.reference[a] - o[a] - e.rects.popper[h], w = o[a] - e.rects.reference[a], T = vi(r), C = T ? a === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, x = E / 2 - w / 2, L = p[m], I = C - g[h] - p[v], D = C / 2 - g[h] / 2 + x, P = ii(L, D, I), F = a;
    e.modifiersData[n] = (t = {}, t[F] = P, t.centerOffset = P - D, t);
  }
}
function Ud(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Cu(t.elements.popper, i) && (t.elements.arrow = i));
}
const ku = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: jd,
  effect: Ud,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function vn(s) {
  return s.split("-")[1];
}
var Vd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Fd(s, t) {
  var e = s.x, n = s.y, i = t.devicePixelRatio || 1;
  return {
    x: yn(e * i) / i || 0,
    y: yn(n * i) / i || 0
  };
}
function kl(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, c = s.position, a = s.gpuAcceleration, l = s.adaptive, h = s.roundOffsets, p = s.isFixed, g = o.x, m = g === void 0 ? 0 : g, v = o.y, E = v === void 0 ? 0 : v, w = typeof h == "function" ? h({
    x: m,
    y: E
  }) : {
    x: m,
    y: E
  };
  m = w.x, E = w.y;
  var T = o.hasOwnProperty("x"), C = o.hasOwnProperty("y"), x = At, L = Tt, I = window;
  if (l) {
    var D = vi(e), P = "clientHeight", F = "clientWidth";
    if (D === Rt(e) && (D = rs(e), qe(D).position !== "static" && c === "absolute" && (P = "scrollHeight", F = "scrollWidth")), D = D, i === Tt || (i === At || i === It) && r === bn) {
      L = kt;
      var J = p && D === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        D[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === At || (i === Tt || i === kt) && r === bn) {
      x = It;
      var tt = p && D === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        D[F]
      );
      m -= tt - n.width, m *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: c
  }, l && Vd), ot = h === !0 ? Fd({
    x: m,
    y: E
  }, Rt(e)) : {
    x: m,
    y: E
  };
  if (m = ot.x, E = ot.y, a) {
    var it;
    return Object.assign({}, nt, (it = {}, it[L] = C ? "0" : "", it[x] = T ? "0" : "", it.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + E + "px)" : "translate3d(" + m + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[L] = C ? E + "px" : "", t[x] = T ? m + "px" : "", t.transform = "", t));
}
function Hd(s) {
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, c = e.roundOffsets, a = c === void 0 ? !0 : c, l = {
    placement: me(t.placement),
    variation: vn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, kl(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, kl(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
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
var Gi = {
  passive: !0
};
function Wd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, c = o === void 0 ? !0 : o, a = Rt(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && l.forEach(function(h) {
    h.addEventListener("scroll", e.update, Gi);
  }), c && a.addEventListener("resize", e.update, Gi), function() {
    r && l.forEach(function(h) {
      h.removeEventListener("scroll", e.update, Gi);
    }), c && a.removeEventListener("resize", e.update, Gi);
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
function ar(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return zd[t];
  });
}
var Kd = {
  start: "end",
  end: "start"
};
function Il(s) {
  return s.replace(/start|end/g, function(t) {
    return Kd[t];
  });
}
function za(s) {
  var t = Rt(s), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Ka(s) {
  return _n(rs(s)).left + za(s).scrollLeft;
}
function Gd(s, t) {
  var e = Rt(s), n = rs(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var l = Ou();
    (l || !l && t === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: c + Ka(s),
    y: a
  };
}
function Yd(s) {
  var t, e = rs(s), n = za(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = Ss(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Ss(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -n.scrollLeft + Ka(s), a = -n.scrollTop;
  return qe(i || e).direction === "rtl" && (c += Ss(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: c,
    y: a
  };
}
function Ga(s) {
  var t = qe(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Iu(s) {
  return ["html", "body", "#document"].indexOf(ve(s)) >= 0 ? s.ownerDocument.body : Wt(s) && Ga(s) ? s : Iu(Nr(s));
}
function ri(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = Iu(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Ga(n) ? n : []) : n, c = t.concat(o);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(ri(Nr(o)))
  );
}
function aa(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
}
function Xd(s, t) {
  var e = _n(s, !1, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Rl(s, t, e) {
  return t === Ba ? aa(Gd(s, e)) : Ls(t) ? Xd(t, e) : aa(Yd(rs(s)));
}
function Zd(s) {
  var t = ri(Nr(s)), e = ["absolute", "fixed"].indexOf(qe(s).position) >= 0, n = e && Wt(s) ? vi(s) : s;
  return Ls(n) ? t.filter(function(i) {
    return Ls(i) && Cu(i, n) && ve(i) !== "body";
  }) : [];
}
function Qd(s, t, e, n) {
  var i = t === "clippingParents" ? Zd(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], c = r.reduce(function(a, l) {
    var h = Rl(s, l, n);
    return a.top = Ss(h.top, a.top), a.right = fr(h.right, a.right), a.bottom = fr(h.bottom, a.bottom), a.left = Ss(h.left, a.left), a;
  }, Rl(s, o, n));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function Ru(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? me(n) : null, r = n ? vn(n) : null, o = t.x + t.width / 2 - e.width / 2, c = t.y + t.height / 2 - e.height / 2, a;
  switch (i) {
    case Tt:
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
    case At:
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
  var l = i ? Fa(i) : null;
  if (l != null) {
    var h = l === "y" ? "height" : "width";
    switch (r) {
      case xs:
        a[l] = a[l] - (t[h] / 2 - e[h] / 2);
        break;
      case bn:
        a[l] = a[l] + (t[h] / 2 - e[h] / 2);
        break;
    }
  }
  return a;
}
function En(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, c = e.boundary, a = c === void 0 ? pu : c, l = e.rootBoundary, h = l === void 0 ? Ba : l, p = e.elementContext, g = p === void 0 ? sn : p, m = e.altBoundary, v = m === void 0 ? !1 : m, E = e.padding, w = E === void 0 ? 0 : E, T = xu(typeof w != "number" ? w : Lu(w, Sn)), C = g === sn ? gu : sn, x = s.rects.popper, L = s.elements[v ? C : g], I = Qd(Ls(L) ? L : L.contextElement || rs(s.elements.popper), a, h, o), D = _n(s.elements.reference), P = Ru({
    reference: D,
    element: x,
    strategy: "absolute",
    placement: i
  }), F = aa(Object.assign({}, x, P)), J = g === sn ? F : D, tt = {
    top: I.top - J.top + T.top,
    bottom: J.bottom - I.bottom + T.bottom,
    left: I.left - J.left + T.left,
    right: J.right - I.right + T.right
  }, nt = s.modifiersData.offset;
  if (g === sn && nt) {
    var ot = nt[i];
    Object.keys(tt).forEach(function(it) {
      var Mt = [It, kt].indexOf(it) >= 0 ? 1 : -1, qt = [Tt, kt].indexOf(it) >= 0 ? "y" : "x";
      tt[it] += ot[qt] * Mt;
    });
  }
  return tt;
}
function Jd(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, c = e.flipVariations, a = e.allowedAutoPlacements, l = a === void 0 ? Pa : a, h = vn(n), p = h ? c ? ra : ra.filter(function(v) {
    return vn(v) === h;
  }) : Sn, g = p.filter(function(v) {
    return l.indexOf(v) >= 0;
  });
  g.length === 0 && (g = p);
  var m = g.reduce(function(v, E) {
    return v[E] = En(s, {
      placement: E,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[me(E)], v;
  }, {});
  return Object.keys(m).sort(function(v, E) {
    return m[v] - m[E];
  });
}
function tf(s) {
  if (me(s) === Ar)
    return [];
  var t = ar(s);
  return [Il(s), t, Il(t)];
}
function ef(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !0 : o, a = e.fallbackPlacements, l = e.padding, h = e.boundary, p = e.rootBoundary, g = e.altBoundary, m = e.flipVariations, v = m === void 0 ? !0 : m, E = e.allowedAutoPlacements, w = t.options.placement, T = me(w), C = T === w, x = a || (C || !v ? [ar(w)] : tf(w)), L = [w].concat(x).reduce(function(Xt, z) {
      return Xt.concat(me(z) === Ar ? Jd(t, {
        placement: z,
        boundary: h,
        rootBoundary: p,
        padding: l,
        flipVariations: v,
        allowedAutoPlacements: E
      }) : z);
    }, []), I = t.rects.reference, D = t.rects.popper, P = /* @__PURE__ */ new Map(), F = !0, J = L[0], tt = 0; tt < L.length; tt++) {
      var nt = L[tt], ot = me(nt), it = vn(nt) === xs, Mt = [Tt, kt].indexOf(ot) >= 0, qt = Mt ? "width" : "height", ut = En(t, {
        placement: nt,
        boundary: h,
        rootBoundary: p,
        altBoundary: g,
        padding: l
      }), vt = Mt ? it ? It : At : it ? kt : Tt;
      I[qt] > D[qt] && (vt = ar(vt));
      var Fe = ar(vt), Yt = [];
      if (r && Yt.push(ut[ot] <= 0), c && Yt.push(ut[vt] <= 0, ut[Fe] <= 0), Yt.every(function(Xt) {
        return Xt;
      })) {
        J = nt, F = !1;
        break;
      }
      P.set(nt, Yt);
    }
    if (F)
      for (var Y = v ? 3 : 1, us = function(z) {
        var ce = L.find(function(He) {
          var at = P.get(He);
          if (at)
            return at.slice(0, z).every(function(We) {
              return We;
            });
        });
        if (ce)
          return J = ce, "break";
      }, Ae = Y; Ae > 0; Ae--) {
        var pt = us(Ae);
        if (pt === "break") break;
      }
    t.placement !== J && (t.modifiersData[n]._skip = !0, t.placement = J, t.reset = !0);
  }
}
const Du = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ef,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Dl(s, t, e) {
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
function Ml(s) {
  return [Tt, It, kt, At].some(function(t) {
    return s[t] >= 0;
  });
}
function sf(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = En(t, {
    elementContext: "reference"
  }), c = En(t, {
    altBoundary: !0
  }), a = Dl(o, n), l = Dl(c, i, r), h = Ml(a), p = Ml(l);
  t.modifiersData[e] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: l,
    isReferenceHidden: h,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": p
  });
}
const Mu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: sf
};
function nf(s, t, e) {
  var n = me(s), i = [At, Tt].indexOf(n) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: s
  })) : e, o = r[0], c = r[1];
  return o = o || 0, c = (c || 0) * i, [At, It].indexOf(n) >= 0 ? {
    x: c,
    y: o
  } : {
    x: o,
    y: c
  };
}
function rf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Pa.reduce(function(h, p) {
    return h[p] = nf(p, t.rects, r), h;
  }, {}), c = o[t.placement], a = c.x, l = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += l), t.modifiersData[n] = o;
}
const qu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: rf
};
function of(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = Ru({
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
function af(s) {
  return s === "x" ? "y" : "x";
}
function lf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !1 : o, a = e.boundary, l = e.rootBoundary, h = e.altBoundary, p = e.padding, g = e.tether, m = g === void 0 ? !0 : g, v = e.tetherOffset, E = v === void 0 ? 0 : v, w = En(t, {
    boundary: a,
    rootBoundary: l,
    padding: p,
    altBoundary: h
  }), T = me(t.placement), C = vn(t.placement), x = !C, L = Fa(T), I = af(L), D = t.modifiersData.popperOffsets, P = t.rects.reference, F = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
  if (D) {
    if (r) {
      var it, Mt = L === "y" ? Tt : At, qt = L === "y" ? kt : It, ut = L === "y" ? "height" : "width", vt = D[L], Fe = vt + w[Mt], Yt = vt - w[qt], Y = m ? -F[ut] / 2 : 0, us = C === xs ? P[ut] : F[ut], Ae = C === xs ? -F[ut] : -P[ut], pt = t.elements.arrow, Xt = m && pt ? Va(pt) : {
        width: 0,
        height: 0
      }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Su(), ce = z[Mt], He = z[qt], at = ii(0, P[ut], Xt[ut]), We = x ? P[ut] / 2 - Y - at - ce - tt.mainAxis : us - at - ce - tt.mainAxis, Fs = x ? -P[ut] / 2 + Y + at + He + tt.mainAxis : Ae + at + He + tt.mainAxis, Ne = t.elements.arrow && vi(t.elements.arrow), hs = Ne ? L === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0 : 0, ds = (it = nt == null ? void 0 : nt[L]) != null ? it : 0, fs = vt + We - ds - hs, Hs = vt + Fs - ds, ze = ii(m ? fr(Fe, fs) : Fe, vt, m ? Ss(Yt, Hs) : Yt);
      D[L] = ze, ot[L] = ze - vt;
    }
    if (c) {
      var ps, Rn = L === "x" ? Tt : At, Dn = L === "x" ? kt : It, Nt = D[I], ue = I === "y" ? "height" : "width", gs = Nt + w[Rn], ms = Nt - w[Dn], Ot = [Tt, At].indexOf(T) !== -1, Oe = (ps = nt == null ? void 0 : nt[I]) != null ? ps : 0, Ws = Ot ? gs : Nt - P[ue] - F[ue] - Oe + tt.altAxis, he = Ot ? Nt + P[ue] + F[ue] - Oe - tt.altAxis : ms, Ce = m && Ot ? Bd(Ws, Nt, he) : ii(m ? Ws : gs, Nt, m ? he : ms);
      D[I] = Ce, ot[I] = Ce - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const $u = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: lf,
  requiresIfExists: ["offset"]
};
function cf(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
}
function uf(s) {
  return s === Rt(s) || !Wt(s) ? za(s) : cf(s);
}
function hf(s) {
  var t = s.getBoundingClientRect(), e = yn(t.width) / s.offsetWidth || 1, n = yn(t.height) / s.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function df(s, t, e) {
  e === void 0 && (e = !1);
  var n = Wt(t), i = Wt(t) && hf(t), r = rs(t), o = _n(s, i, e), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((ve(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ga(r)) && (c = uf(t)), Wt(t) ? (a = _n(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Ka(r))), {
    x: o.left + c.scrollLeft - a.x,
    y: o.top + c.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function ff(s) {
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
function pf(s) {
  var t = ff(s);
  return Nu.reduce(function(e, n) {
    return e.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function gf(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(s());
      });
    })), t;
  };
}
function mf(s) {
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
var ql = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function $l() {
  for (var s = arguments.length, t = new Array(s), e = 0; e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Or(s) {
  s === void 0 && (s = {});
  var t = s, e = t.defaultModifiers, n = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? ql : i;
  return function(c, a, l) {
    l === void 0 && (l = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ql, r),
      modifiersData: {},
      elements: {
        reference: c,
        popper: a
      },
      attributes: {},
      styles: {}
    }, p = [], g = !1, m = {
      state: h,
      setOptions: function(T) {
        var C = typeof T == "function" ? T(h.options) : T;
        E(), h.options = Object.assign({}, r, h.options, C), h.scrollParents = {
          reference: Ls(c) ? ri(c) : c.contextElement ? ri(c.contextElement) : [],
          popper: ri(a)
        };
        var x = pf(mf([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = x.filter(function(L) {
          return L.enabled;
        }), v(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var T = h.elements, C = T.reference, x = T.popper;
          if ($l(C, x)) {
            h.rects = {
              reference: df(C, vi(x), h.options.strategy === "fixed"),
              popper: Va(x)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(tt) {
              return h.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var L = 0; L < h.orderedModifiers.length; L++) {
              if (h.reset === !0) {
                h.reset = !1, L = -1;
                continue;
              }
              var I = h.orderedModifiers[L], D = I.fn, P = I.options, F = P === void 0 ? {} : P, J = I.name;
              typeof D == "function" && (h = D({
                state: h,
                options: F,
                name: J,
                instance: m
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: gf(function() {
        return new Promise(function(w) {
          m.forceUpdate(), w(h);
        });
      }),
      destroy: function() {
        E(), g = !0;
      }
    };
    if (!$l(c, a))
      return m;
    m.setOptions(l).then(function(w) {
      !g && l.onFirstUpdate && l.onFirstUpdate(w);
    });
    function v() {
      h.orderedModifiers.forEach(function(w) {
        var T = w.name, C = w.options, x = C === void 0 ? {} : C, L = w.effect;
        if (typeof L == "function") {
          var I = L({
            state: h,
            name: T,
            instance: m,
            options: x
          }), D = function() {
          };
          p.push(I || D);
        }
      });
    }
    function E() {
      p.forEach(function(w) {
        return w();
      }), p = [];
    }
    return m;
  };
}
var bf = /* @__PURE__ */ Or(), yf = [Wa, Ya, Ha, Ua], _f = /* @__PURE__ */ Or({
  defaultModifiers: yf
}), vf = [Wa, Ya, Ha, Ua, qu, Du, $u, ku, Mu], Xa = /* @__PURE__ */ Or({
  defaultModifiers: vf
});
const Bu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Eu,
  afterRead: yu,
  afterWrite: Au,
  applyStyles: Ua,
  arrow: ku,
  auto: Ar,
  basePlacements: Sn,
  beforeMain: _u,
  beforeRead: mu,
  beforeWrite: wu,
  bottom: kt,
  clippingParents: pu,
  computeStyles: Ha,
  createPopper: Xa,
  createPopperBase: bf,
  createPopperLite: _f,
  detectOverflow: En,
  end: bn,
  eventListeners: Wa,
  flip: Du,
  hide: Mu,
  left: At,
  main: vu,
  modifierPhases: Nu,
  offset: qu,
  placements: Pa,
  popper: sn,
  popperGenerator: Or,
  popperOffsets: Ya,
  preventOverflow: $u,
  read: bu,
  reference: gu,
  right: It,
  start: xs,
  top: Tt,
  variationPlacements: ra,
  viewport: Ba,
  write: Tu
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Ye = /* @__PURE__ */ new Map(), xo = {
  set(s, t, e) {
    Ye.has(s) || Ye.set(s, /* @__PURE__ */ new Map());
    const n = Ye.get(s);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, e);
  },
  get(s, t) {
    return Ye.has(s) && Ye.get(s).get(t) || null;
  },
  remove(s, t) {
    if (!Ye.has(s))
      return;
    const e = Ye.get(s);
    e.delete(t), e.size === 0 && Ye.delete(s);
  }
}, Ef = 1e6, wf = 1e3, la = "transitionend", Pu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), Tf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Af = (s) => {
  do
    s += Math.floor(Math.random() * Ef);
  while (document.getElementById(s));
  return s;
}, Nf = (s) => {
  if (!s)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: e
  } = window.getComputedStyle(s);
  const n = Number.parseFloat(t), i = Number.parseFloat(e);
  return !n && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * wf);
}, ju = (s) => {
  s.dispatchEvent(new Event(la));
}, De = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), es = (s) => De(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Pu(s)) : null, xn = (s) => {
  if (!De(s) || s.getClientRects().length === 0)
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
}, ss = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false", Uu = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? Uu(s.parentNode) : null;
}, pr = () => {
}, Ei = (s) => {
  s.offsetHeight;
}, Vu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Lo = [], Of = (s) => {
  document.readyState === "loading" ? (Lo.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Lo)
      t();
  }), Lo.push(s)) : s();
}, zt = () => document.documentElement.dir === "rtl", Gt = (s) => {
  Of(() => {
    const t = Vu();
    if (t) {
      const e = s.NAME, n = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface);
    }
  });
}, xt = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e, Fu = (s, t, e = !0) => {
  if (!e) {
    xt(s);
    return;
  }
  const i = Nf(t) + 5;
  let r = !1;
  const o = ({
    target: c
  }) => {
    c === t && (r = !0, t.removeEventListener(la, o), xt(s));
  };
  t.addEventListener(la, o), setTimeout(() => {
    r || ju(t);
  }, i);
}, Za = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, Cf = /[^.]*(?=\..*)\.|.*/, Sf = /\..*/, xf = /::\d+$/, ko = {};
let Bl = 1;
const Hu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Lf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Wu(s, t) {
  return t && `${t}::${Bl++}` || s.uidEvent || Bl++;
}
function zu(s) {
  const t = Wu(s);
  return s.uidEvent = t, ko[t] = ko[t] || {}, ko[t];
}
function kf(s, t) {
  return function e(n) {
    return Qa(n, {
      delegateTarget: s
    }), e.oneOff && k.off(s, n.type, t), t.apply(s, [n]);
  };
}
function If(s, t, e) {
  return function n(i) {
    const r = s.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const c of r)
        if (c === o)
          return Qa(i, {
            delegateTarget: o
          }), n.oneOff && k.off(s, i.type, t, e), e.apply(o, [i]);
  };
}
function Ku(s, t, e = null) {
  return Object.values(s).find((n) => n.callable === t && n.delegationSelector === e);
}
function Gu(s, t, e) {
  const n = typeof t == "string", i = n ? e : t || e;
  let r = Yu(s);
  return Lf.has(r) || (r = s), [n, i, r];
}
function Pl(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, c] = Gu(t, e, n);
  t in Hu && (o = ((v) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return v.call(this, E);
  })(o));
  const a = zu(s), l = a[c] || (a[c] = {}), h = Ku(l, o, r ? e : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const p = Wu(o, t.replace(Cf, "")), g = r ? If(s, e, o) : kf(s, o);
  g.delegationSelector = r ? e : null, g.callable = o, g.oneOff = i, g.uidEvent = p, l[p] = g, s.addEventListener(c, g, r);
}
function ca(s, t, e, n, i) {
  const r = Ku(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function Rf(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && ca(s, t, e, o.callable, o.delegationSelector);
}
function Yu(s) {
  return s = s.replace(Sf, ""), Hu[s] || s;
}
const k = {
  on(s, t, e, n) {
    Pl(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    Pl(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = Gu(t, e, n), c = o !== t, a = zu(s), l = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(l).length)
        return;
      ca(s, a, o, r, i ? e : null);
      return;
    }
    if (h)
      for (const p of Object.keys(a))
        Rf(s, a, p, t.slice(1));
    for (const [p, g] of Object.entries(l)) {
      const m = p.replace(xf, "");
      (!c || t.includes(m)) && ca(s, a, o, g.callable, g.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = Vu(), i = Yu(t), r = t !== i;
    let o = null, c = !0, a = !0, l = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), c = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), l = o.isDefaultPrevented());
    const h = Qa(new Event(t, {
      bubbles: c,
      cancelable: !0
    }), e);
    return l && h.preventDefault(), a && s.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function Qa(s, t = {}) {
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
function jl(s) {
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
function Io(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Me = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-bs-${Io(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-bs-${Io(t)}`);
  },
  getDataAttributes(s) {
    if (!s)
      return {};
    const t = {}, e = Object.keys(s.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of e) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = jl(s.dataset[n]);
    }
    return t;
  },
  getDataAttribute(s, t) {
    return jl(s.getAttribute(`data-bs-${Io(t)}`));
  }
};
class wi {
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
    const n = De(e) ? Me.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...De(e) ? Me.getDataAttributes(e) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(e)) {
      const r = t[n], o = De(r) ? "element" : Tf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Df = "5.3.3";
class re extends wi {
  constructor(t, e) {
    super(), t = es(t), t && (this._element = t, this._config = this._getConfig(e), xo.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    xo.remove(this._element, this.constructor.DATA_KEY), k.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, e, n = !0) {
    Fu(t, e, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return xo.get(es(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return Df;
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
const Ro = (s) => {
  let t = s.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let e = s.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t ? t.split(",").map((e) => Pu(e)).join(",") : null;
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
    return this.find(t, s).filter((e) => !ss(e) && xn(e));
  },
  getSelectorFromElement(s) {
    const t = Ro(s);
    return t && U.findOne(t) ? t : null;
  },
  getElementFromSelector(s) {
    const t = Ro(s);
    return t ? U.findOne(t) : null;
  },
  getMultipleElementsFromSelector(s) {
    const t = Ro(s);
    return t ? U.find(t) : [];
  }
}, Cr = (s, t = "hide") => {
  const e = `click.dismiss${s.EVENT_KEY}`, n = s.NAME;
  k.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), ss(this))
      return;
    const r = U.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, Mf = "alert", qf = "bs.alert", Xu = `.${qf}`, $f = `close${Xu}`, Bf = `closed${Xu}`, Pf = "fade", jf = "show";
class Sr extends re {
  // Getters
  static get NAME() {
    return Mf;
  }
  // Public
  close() {
    if (k.trigger(this._element, $f).defaultPrevented)
      return;
    this._element.classList.remove(jf);
    const e = this._element.classList.contains(Pf);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  // Private
  _destroyElement() {
    this._element.remove(), k.trigger(this._element, Bf), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Sr.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Cr(Sr, "close");
Gt(Sr);
const Uf = "button", Vf = "bs.button", Ff = `.${Vf}`, Hf = ".data-api", Wf = "active", Ul = '[data-bs-toggle="button"]', zf = `click${Ff}${Hf}`;
class xr extends re {
  // Getters
  static get NAME() {
    return Uf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Wf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = xr.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
k.on(document, zf, Ul, (s) => {
  s.preventDefault();
  const t = s.target.closest(Ul);
  xr.getOrCreateInstance(t).toggle();
});
Gt(xr);
const Kf = "swipe", Ln = ".bs.swipe", Gf = `touchstart${Ln}`, Yf = `touchmove${Ln}`, Xf = `touchend${Ln}`, Zf = `pointerdown${Ln}`, Qf = `pointerup${Ln}`, Jf = "touch", tp = "pen", ep = "pointer-event", sp = 40, np = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, ip = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class gr extends wi {
  constructor(t, e) {
    super(), this._element = t, !(!t || !gr.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
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
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), xt(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= sp)
      return;
    const e = t / this._deltaX;
    this._deltaX = 0, e && xt(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (k.on(this._element, Zf, (t) => this._start(t)), k.on(this._element, Qf, (t) => this._end(t)), this._element.classList.add(ep)) : (k.on(this._element, Gf, (t) => this._start(t)), k.on(this._element, Yf, (t) => this._move(t)), k.on(this._element, Xf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === tp || t.pointerType === Jf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const rp = "carousel", op = "bs.carousel", os = `.${op}`, Zu = ".data-api", ap = "ArrowLeft", lp = "ArrowRight", cp = 500, Xn = "next", tn = "prev", nn = "left", lr = "right", up = `slide${os}`, Do = `slid${os}`, hp = `keydown${os}`, dp = `mouseenter${os}`, fp = `mouseleave${os}`, pp = `dragstart${os}`, gp = `load${os}${Zu}`, mp = `click${os}${Zu}`, Qu = "carousel", Yi = "active", bp = "slide", yp = "carousel-item-end", _p = "carousel-item-start", vp = "carousel-item-next", Ep = "carousel-item-prev", Ju = ".active", th = ".carousel-item", wp = Ju + th, Tp = ".carousel-item img", Ap = ".carousel-indicators", Np = "[data-bs-slide], [data-bs-slide-to]", Op = '[data-bs-ride="carousel"]', Cp = {
  [ap]: lr,
  [lp]: nn
}, Sp = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, xp = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Ti extends re {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = U.findOne(Ap, this._element), this._addEventListeners(), this._config.ride === Qu && this.cycle();
  }
  // Getters
  static get Default() {
    return Sp;
  }
  static get DefaultType() {
    return xp;
  }
  static get NAME() {
    return rp;
  }
  // Public
  next() {
    this._slide(Xn);
  }
  nextWhenVisible() {
    !document.hidden && xn(this._element) && this.next();
  }
  prev() {
    this._slide(tn);
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
        k.one(this._element, Do, () => this.cycle());
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
      k.one(this._element, Do, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Xn : tn;
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
    this._config.keyboard && k.on(this._element, hp, (t) => this._keydown(t)), this._config.pause === "hover" && (k.on(this._element, dp, () => this.pause()), k.on(this._element, fp, () => this._maybeEnableCycle())), this._config.touch && gr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of U.find(Tp, this._element))
      k.on(n, pp, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(nn)),
      rightCallback: () => this._slide(this._directionToOrder(lr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), cp + this._config.interval));
      }
    };
    this._swipeHelper = new gr(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = Cp[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const e = U.findOne(Ju, this._indicatorsElement);
    e.classList.remove(Yi), e.removeAttribute("aria-current");
    const n = U.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Yi), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === Xn, r = e || Za(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), c = (m) => k.trigger(this._element, m, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (c(up).defaultPrevented || !n || !r)
      return;
    const l = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? _p : yp, p = i ? vp : Ep;
    r.classList.add(p), Ei(r), n.classList.add(h), r.classList.add(h);
    const g = () => {
      r.classList.remove(h, p), r.classList.add(Yi), n.classList.remove(Yi, p, h), this._isSliding = !1, c(Do);
    };
    this._queueCallback(g, n, this._isAnimated()), l && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(bp);
  }
  _getActive() {
    return U.findOne(wp, this._element);
  }
  _getItems() {
    return U.find(th, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return zt() ? t === nn ? tn : Xn : t === nn ? Xn : tn;
  }
  _orderToDirection(t) {
    return zt() ? t === tn ? nn : lr : t === tn ? lr : nn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Ti.getOrCreateInstance(this, t);
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
k.on(document, mp, Np, function(s) {
  const t = U.getElementFromSelector(this);
  if (!t || !t.classList.contains(Qu))
    return;
  s.preventDefault();
  const e = Ti.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    e.to(n), e._maybeEnableCycle();
    return;
  }
  if (Me.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
k.on(window, gp, () => {
  const s = U.find(Op);
  for (const t of s)
    Ti.getOrCreateInstance(t);
});
Gt(Ti);
const Lp = "collapse", kp = "bs.collapse", Ai = `.${kp}`, Ip = ".data-api", Rp = `show${Ai}`, Dp = `shown${Ai}`, Mp = `hide${Ai}`, qp = `hidden${Ai}`, $p = `click${Ai}${Ip}`, Mo = "show", fn = "collapse", Xi = "collapsing", Bp = "collapsed", Pp = `:scope .${fn} .${fn}`, jp = "collapse-horizontal", Up = "width", Vp = "height", Fp = ".collapse.show, .collapse.collapsing", ua = '[data-bs-toggle="collapse"]', Hp = {
  parent: null,
  toggle: !0
}, Wp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class hi extends re {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = U.find(ua);
    for (const i of n) {
      const r = U.getSelectorFromElement(i), o = U.find(r).filter((c) => c === this._element);
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
    if (this._config.parent && (t = this._getFirstLevelChildren(Fp).filter((c) => c !== this._element).map((c) => hi.getOrCreateInstance(c, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || k.trigger(this._element, Rp).defaultPrevented)
      return;
    for (const c of t)
      c.hide();
    const n = this._getDimension();
    this._element.classList.remove(fn), this._element.classList.add(Xi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Xi), this._element.classList.add(fn, Mo), this._element.style[n] = "", k.trigger(this._element, Dp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || k.trigger(this._element, Mp).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Ei(this._element), this._element.classList.add(Xi), this._element.classList.remove(fn, Mo);
    for (const i of this._triggerArray) {
      const r = U.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Xi), this._element.classList.add(fn), k.trigger(this._element, qp);
    };
    this._element.style[e] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Mo);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = es(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(jp) ? Up : Vp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(ua);
    for (const e of t) {
      const n = U.getElementFromSelector(e);
      n && this._addAriaAndCollapsedClass([e], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const e = U.find(Pp, this._config.parent);
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
      const n = hi.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
k.on(document, $p, ua, function(s) {
  (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
  for (const t of U.getMultipleElementsFromSelector(this))
    hi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Gt(hi);
const Vl = "dropdown", zp = "bs.dropdown", Ms = `.${zp}`, Ja = ".data-api", Kp = "Escape", Fl = "Tab", Gp = "ArrowUp", Hl = "ArrowDown", Yp = 2, Xp = `hide${Ms}`, Zp = `hidden${Ms}`, Qp = `show${Ms}`, Jp = `shown${Ms}`, eh = `click${Ms}${Ja}`, sh = `keydown${Ms}${Ja}`, tg = `keyup${Ms}${Ja}`, rn = "show", eg = "dropup", sg = "dropend", ng = "dropstart", ig = "dropup-center", rg = "dropdown-center", Os = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', og = `${Os}.${rn}`, cr = ".dropdown-menu", ag = ".navbar", lg = ".navbar-nav", cg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", ug = zt() ? "top-end" : "top-start", hg = zt() ? "top-start" : "top-end", dg = zt() ? "bottom-end" : "bottom-start", fg = zt() ? "bottom-start" : "bottom-end", pg = zt() ? "left-start" : "right-start", gg = zt() ? "right-start" : "left-start", mg = "top", bg = "bottom", yg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, _g = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class be extends re {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = U.next(this._element, cr)[0] || U.prev(this._element, cr)[0] || U.findOne(cr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return yg;
  }
  static get DefaultType() {
    return _g;
  }
  static get NAME() {
    return Vl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (ss(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!k.trigger(this._element, Qp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(lg))
        for (const n of [].concat(...document.body.children))
          k.on(n, "mouseover", pr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(rn), this._element.classList.add(rn), k.trigger(this._element, Jp, t);
    }
  }
  hide() {
    if (ss(this._element) || !this._isShown())
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
    if (!k.trigger(this._element, Xp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          k.off(n, "mouseover", pr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(rn), this._element.classList.remove(rn), this._element.setAttribute("aria-expanded", "false"), Me.removeDataAttribute(this._menu, "popper"), k.trigger(this._element, Zp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !De(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Vl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Bu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : De(this._config.reference) ? t = es(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = Xa(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(rn);
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
    const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(eg) ? e ? hg : ug : e ? fg : dg;
  }
  _detectNavbar() {
    return this._element.closest(ag) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (Me.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
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
    const n = U.find(cg, this._menu).filter((i) => xn(i));
    n.length && Za(n, e, t === Hl, !n.includes(e)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = be.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Yp || t.type === "keyup" && t.key !== Fl)
      return;
    const e = U.find(og);
    for (const n of e) {
      const i = be.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === Fl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const c = {
        relatedTarget: i._element
      };
      t.type === "click" && (c.clickEvent = t), i._completeHide(c);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === Kp, i = [Gp, Hl].includes(t.key);
    if (!i && !n || e && !n)
      return;
    t.preventDefault();
    const r = this.matches(Os) ? this : U.prev(this, Os)[0] || U.next(this, Os)[0] || U.findOne(Os, t.delegateTarget.parentNode), o = be.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
k.on(document, sh, Os, be.dataApiKeydownHandler);
k.on(document, sh, cr, be.dataApiKeydownHandler);
k.on(document, eh, be.clearMenus);
k.on(document, tg, be.clearMenus);
k.on(document, eh, Os, function(s) {
  s.preventDefault(), be.getOrCreateInstance(this).toggle();
});
Gt(be);
const nh = "backdrop", vg = "fade", Wl = "show", zl = `mousedown.bs.${nh}`, Eg = {
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
class ih extends wi {
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
    return nh;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      xt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && Ei(e), e.classList.add(Wl), this._emulateAnimation(() => {
      xt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      xt(t);
      return;
    }
    this._getElement().classList.remove(Wl), this._emulateAnimation(() => {
      this.dispose(), xt(t);
    });
  }
  dispose() {
    this._isAppended && (k.off(this._element, zl), this._element.remove(), this._isAppended = !1);
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
    return t.rootElement = es(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), k.on(t, zl, () => {
      xt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Fu(t, this._getElement(), this._config.isAnimated);
  }
}
const Tg = "focustrap", Ag = "bs.focustrap", mr = `.${Ag}`, Ng = `focusin${mr}`, Og = `keydown.tab${mr}`, Cg = "Tab", Sg = "forward", Kl = "backward", xg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Lg = {
  autofocus: "boolean",
  trapElement: "element"
};
class rh extends wi {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return xg;
  }
  static get DefaultType() {
    return Lg;
  }
  static get NAME() {
    return Tg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), k.off(document, mr), k.on(document, Ng, (t) => this._handleFocusin(t)), k.on(document, Og, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, k.off(document, mr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: e
    } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target))
      return;
    const n = U.focusableChildren(e);
    n.length === 0 ? e.focus() : this._lastTabNavDirection === Kl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Cg && (this._lastTabNavDirection = t.shiftKey ? Kl : Sg);
  }
}
const Gl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Yl = ".sticky-top", Zi = "padding-right", Xl = "margin-right";
class ha {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Zi, (e) => e + t), this._setElementAttributes(Gl, Zi, (e) => e + t), this._setElementAttributes(Yl, Xl, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Zi), this._resetElementAttributes(Gl, Zi), this._resetElementAttributes(Yl, Xl);
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
    n && Me.setDataAttribute(t, e, n);
  }
  _resetElementAttributes(t, e) {
    const n = (i) => {
      const r = Me.getDataAttribute(i, e);
      if (r === null) {
        i.style.removeProperty(e);
        return;
      }
      Me.removeDataAttribute(i, e), i.style.setProperty(e, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, e) {
    if (De(t)) {
      e(t);
      return;
    }
    for (const n of U.find(t, this._element))
      e(n);
  }
}
const kg = "modal", Ig = "bs.modal", Kt = `.${Ig}`, Rg = ".data-api", Dg = "Escape", Mg = `hide${Kt}`, qg = `hidePrevented${Kt}`, oh = `hidden${Kt}`, ah = `show${Kt}`, $g = `shown${Kt}`, Bg = `resize${Kt}`, Pg = `click.dismiss${Kt}`, jg = `mousedown.dismiss${Kt}`, Ug = `keydown.dismiss${Kt}`, Vg = `click${Kt}${Rg}`, Zl = "modal-open", Fg = "fade", Ql = "show", qo = "modal-static", Hg = ".modal.show", Wg = ".modal-dialog", zg = ".modal-body", Kg = '[data-bs-toggle="modal"]', Gg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Yg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class ks extends re {
  constructor(t, e) {
    super(t, e), this._dialog = U.findOne(Wg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new ha(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Gg;
  }
  static get DefaultType() {
    return Yg;
  }
  static get NAME() {
    return kg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || k.trigger(this._element, ah, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Zl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || k.trigger(this._element, Mg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Ql), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    k.off(window, Kt), k.off(this._dialog, Kt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new ih({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new rh({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const e = U.findOne(zg, this._dialog);
    e && (e.scrollTop = 0), Ei(this._element), this._element.classList.add(Ql);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, k.trigger(this._element, $g, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    k.on(this._element, Ug, (t) => {
      if (t.key === Dg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), k.on(window, Bg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), k.on(this._element, jg, (t) => {
      k.one(this._element, Pg, (e) => {
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
      document.body.classList.remove(Zl), this._resetAdjustments(), this._scrollBar.reset(), k.trigger(this._element, oh);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Fg);
  }
  _triggerBackdropTransition() {
    if (k.trigger(this._element, qg).defaultPrevented)
      return;
    const e = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(qo) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(qo), this._queueCallback(() => {
      this._element.classList.remove(qo), this._queueCallback(() => {
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
      const i = zt() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${e}px`;
    }
    if (!n && t) {
      const i = zt() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${e}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, e) {
    return this.each(function() {
      const n = ks.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](e);
      }
    });
  }
}
k.on(document, Vg, Kg, function(s) {
  const t = U.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), k.one(t, ah, (i) => {
    i.defaultPrevented || k.one(t, oh, () => {
      xn(this) && this.focus();
    });
  });
  const e = U.findOne(Hg);
  e && ks.getInstance(e).hide(), ks.getOrCreateInstance(t).toggle(this);
});
Cr(ks);
Gt(ks);
const Xg = "offcanvas", Zg = "bs.offcanvas", je = `.${Zg}`, lh = ".data-api", Qg = `load${je}${lh}`, Jg = "Escape", Jl = "show", tc = "showing", ec = "hiding", tm = "offcanvas-backdrop", ch = ".offcanvas.show", em = `show${je}`, sm = `shown${je}`, nm = `hide${je}`, sc = `hidePrevented${je}`, uh = `hidden${je}`, im = `resize${je}`, rm = `click${je}${lh}`, om = `keydown.dismiss${je}`, am = '[data-bs-toggle="offcanvas"]', lm = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, cm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class ns extends re {
  constructor(t, e) {
    super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
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
    if (this._isShown || k.trigger(this._element, em, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new ha().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(tc);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Jl), this._element.classList.remove(tc), k.trigger(this._element, sm, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || k.trigger(this._element, nm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ec), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(Jl, ec), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new ha().reset(), k.trigger(this._element, uh);
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
        k.trigger(this._element, sc);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new ih({
      className: tm,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null
    });
  }
  _initializeFocusTrap() {
    return new rh({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    k.on(this._element, om, (t) => {
      if (t.key === Jg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        k.trigger(this._element, sc);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = ns.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
k.on(document, rm, am, function(s) {
  const t = U.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), ss(this))
    return;
  k.one(t, uh, () => {
    xn(this) && this.focus();
  });
  const e = U.findOne(ch);
  e && e !== t && ns.getInstance(e).hide(), ns.getOrCreateInstance(t).toggle(this);
});
k.on(window, Qg, () => {
  for (const s of U.find(ch))
    ns.getOrCreateInstance(s).show();
});
k.on(window, im, () => {
  for (const s of U.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && ns.getOrCreateInstance(s).hide();
});
Cr(ns);
Gt(ns);
const um = /^aria-[\w-]*$/i, hh = {
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
}, hm = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), dm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, fm = (s, t) => {
  const e = s.nodeName.toLowerCase();
  return t.includes(e) ? hm.has(e) ? !!dm.test(s.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(e));
};
function pm(s, t, e) {
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
      fm(h, l) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const gm = "TemplateFactory", mm = {
  allowList: hh,
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
class _m extends wi {
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
      }, ym);
  }
  _setContent(t, e, n) {
    const i = U.findOne(n, t);
    if (i) {
      if (e = this._resolvePossibleFunction(e), !e) {
        i.remove();
        return;
      }
      if (De(e)) {
        this._putElementInTemplate(es(e), i);
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
    return this._config.sanitize ? pm(t, this._config.allowList, this._config.sanitizeFn) : t;
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
const vm = "tooltip", Em = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), $o = "fade", wm = "modal", Qi = "show", Tm = ".tooltip-inner", nc = `.${wm}`, ic = "hide.bs.modal", Zn = "hover", Bo = "focus", Am = "click", Nm = "manual", Om = "hide", Cm = "hidden", Sm = "show", xm = "shown", Lm = "inserted", km = "click", Im = "focusin", Rm = "focusout", Dm = "mouseenter", Mm = "mouseleave", qm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: zt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: zt() ? "right" : "left"
}, $m = {
  allowList: hh,
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
let Lr = class dh extends re {
  constructor(t, e) {
    if (typeof Bu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return $m;
  }
  static get DefaultType() {
    return Bm;
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
    clearTimeout(this._timeout), k.off(this._element.closest(nc), ic, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = k.trigger(this._element, this.constructor.eventName(Sm)), n = (Uu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), k.trigger(this._element, this.constructor.eventName(Lm))), this._popper = this._createPopper(i), i.classList.add(Qi), "ontouchstart" in document.documentElement)
      for (const c of [].concat(...document.body.children))
        k.on(c, "mouseover", pr);
    const o = () => {
      k.trigger(this._element, this.constructor.eventName(xm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || k.trigger(this._element, this.constructor.eventName(Om)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Qi), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        k.off(i, "mouseover", pr);
    this._activeTrigger[Am] = !1, this._activeTrigger[Bo] = !1, this._activeTrigger[Zn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), k.trigger(this._element, this.constructor.eventName(Cm)));
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
    e.classList.remove($o, Qi), e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Af(this.constructor.NAME).toString();
    return e.setAttribute("id", n), this._isAnimated() && e.classList.add($o), e;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new _m({
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
    return this._config.animation || this.tip && this.tip.classList.contains($o);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Qi);
  }
  _createPopper(t) {
    const e = xt(this._config.placement, [this, t, this._element]), n = qm[e.toUpperCase()];
    return Xa(this._element, t, this._getPopperConfig(n));
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
        k.on(this._element, this.constructor.eventName(km), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (e !== Nm) {
        const n = e === Zn ? this.constructor.eventName(Dm) : this.constructor.eventName(Im), i = e === Zn ? this.constructor.eventName(Mm) : this.constructor.eventName(Rm);
        k.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Bo : Zn] = !0, o._enter();
        }), k.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Bo : Zn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, k.on(this._element.closest(nc), ic, this._hideModalHandler);
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
    const e = Me.getDataAttributes(this._element);
    for (const n of Object.keys(e))
      Em.has(n) && delete e[n];
    return t = {
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : es(t.container), typeof t.delay == "number" && (t.delay = {
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
      const e = dh.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
};
Gt(Lr);
const Pm = "popover", jm = ".popover-header", Um = ".popover-body", Vm = {
  ...Lr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Fm = {
  ...Lr.DefaultType,
  content: "(null|string|element|function)"
};
class tl extends Lr {
  // Getters
  static get Default() {
    return Vm;
  }
  static get DefaultType() {
    return Fm;
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
      [jm]: this._getTitle(),
      [Um]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = tl.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
Gt(tl);
const Hm = "scrollspy", Wm = "bs.scrollspy", el = `.${Wm}`, zm = ".data-api", Km = `activate${el}`, rc = `click${el}`, Gm = `load${el}${zm}`, Ym = "dropdown-item", en = "active", Xm = '[data-bs-spy="scroll"]', Po = "[href]", Zm = ".nav, .list-group", oc = ".nav-link", Qm = ".nav-item", Jm = ".list-group-item", tb = `${oc}, ${Qm} > ${oc}, ${Jm}`, eb = ".dropdown", sb = ".dropdown-toggle", nb = {
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
class kr extends re {
  constructor(t, e) {
    super(t, e), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
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
    return t.target = es(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (k.off(this._config.target, rc), k.on(this._config.target, rc, Po, (t) => {
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
    const t = U.find(Po, this._config.target);
    for (const e of t) {
      if (!e.hash || ss(e))
        continue;
      const n = U.findOne(decodeURI(e.hash), this._element);
      xn(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(en), this._activateParents(t), k.trigger(this._element, Km, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Ym)) {
      U.findOne(sb, t.closest(eb)).classList.add(en);
      return;
    }
    for (const e of U.parents(t, Zm))
      for (const n of U.prev(e, tb))
        n.classList.add(en);
  }
  _clearActiveClass(t) {
    t.classList.remove(en);
    const e = U.find(`${Po}.${en}`, t);
    for (const n of e)
      n.classList.remove(en);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = kr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
k.on(window, Gm, () => {
  for (const s of U.find(Xm))
    kr.getOrCreateInstance(s);
});
Gt(kr);
const rb = "tab", ob = "bs.tab", qs = `.${ob}`, ab = `hide${qs}`, lb = `hidden${qs}`, cb = `show${qs}`, ub = `shown${qs}`, hb = `click${qs}`, db = `keydown${qs}`, fb = `load${qs}`, pb = "ArrowLeft", ac = "ArrowRight", gb = "ArrowUp", lc = "ArrowDown", jo = "Home", cc = "End", Cs = "active", uc = "fade", Uo = "show", mb = "dropdown", fh = ".dropdown-toggle", bb = ".dropdown-menu", Vo = `:not(${fh})`, yb = '.list-group, .nav, [role="tablist"]', _b = ".nav-item, .list-group-item", vb = `.nav-link${Vo}, .list-group-item${Vo}, [role="tab"]${Vo}`, ph = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Fo = `${vb}, ${ph}`, Eb = `.${Cs}[data-bs-toggle="tab"], .${Cs}[data-bs-toggle="pill"], .${Cs}[data-bs-toggle="list"]`;
class wn extends re {
  constructor(t) {
    super(t), this._parent = this._element.closest(yb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), k.on(this._element, db, (e) => this._keydown(e)));
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
    const e = this._getActiveElem(), n = e ? k.trigger(e, ab, {
      relatedTarget: t
    }) : null;
    k.trigger(t, cb, {
      relatedTarget: e
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(e, t), this._activate(t, e));
  }
  // Private
  _activate(t, e) {
    if (!t)
      return;
    t.classList.add(Cs), this._activate(U.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Uo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), k.trigger(t, ub, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(uc));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(Cs), t.blur(), this._deactivate(U.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Uo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), k.trigger(t, lb, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(uc));
  }
  _keydown(t) {
    if (![pb, ac, gb, lc, jo, cc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !ss(i));
    let n;
    if ([jo, cc].includes(t.key))
      n = e[t.key === jo ? 0 : e.length - 1];
    else {
      const i = [ac, lc].includes(t.key);
      n = Za(e, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), wn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return U.find(Fo, this._parent);
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
    if (!n.classList.contains(mb))
      return;
    const i = (r, o) => {
      const c = U.findOne(r, n);
      c && c.classList.toggle(o, e);
    };
    i(fh, Cs), i(bb, Uo), n.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, n) {
    t.hasAttribute(e) || t.setAttribute(e, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Cs);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Fo) ? t : U.findOne(Fo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(_b) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = wn.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
k.on(document, hb, ph, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !ss(this) && wn.getOrCreateInstance(this).show();
});
k.on(window, fb, () => {
  for (const s of U.find(Eb))
    wn.getOrCreateInstance(s);
});
Gt(wn);
const wb = "toast", Tb = "bs.toast", as = `.${Tb}`, Ab = `mouseover${as}`, Nb = `mouseout${as}`, Ob = `focusin${as}`, Cb = `focusout${as}`, Sb = `hide${as}`, xb = `hidden${as}`, Lb = `show${as}`, kb = `shown${as}`, Ib = "fade", hc = "hide", Ji = "show", tr = "showing", Rb = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Db = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Ir extends re {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Db;
  }
  static get DefaultType() {
    return Rb;
  }
  static get NAME() {
    return wb;
  }
  // Public
  show() {
    if (k.trigger(this._element, Lb).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(Ib);
    const e = () => {
      this._element.classList.remove(tr), k.trigger(this._element, kb), this._maybeScheduleHide();
    };
    this._element.classList.remove(hc), Ei(this._element), this._element.classList.add(Ji, tr), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || k.trigger(this._element, Sb).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(hc), this._element.classList.remove(tr, Ji), k.trigger(this._element, xb);
    };
    this._element.classList.add(tr), this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(Ji), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Ji);
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
    k.on(this._element, Ab, (t) => this._onInteraction(t, !0)), k.on(this._element, Nb, (t) => this._onInteraction(t, !1)), k.on(this._element, Ob, (t) => this._onInteraction(t, !0)), k.on(this._element, Cb, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Ir.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Cr(Ir);
Gt(Ir);
function gh(s, t) {
  for (const e in t)
    t[e] instanceof Object && e in s && Object.assign(t[e], gh(s[e], t[e]));
  return Object.assign(s || {}, t);
}
function mh(s, t, e, n) {
  try {
    return typeof s == "function" ? s(t, e, n) : s;
  } catch {
    return null;
  }
}
async function Qn(s) {
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
function Jn(s, t = "-") {
  return s.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Mb(s) {
  let t = [];
  for (let e of s)
    t.push(br(e));
  return t;
}
function br(s, t = "", e = {}) {
  for (let n in s) {
    let i = t ? t + "." + n : n;
    typeof s[n] == "object" && !Array.isArray(s[n]) ? br(s[n], i, e) : e[i] = s[n];
  }
  return e;
}
function qb(s) {
  let t = {};
  for (let e in s) {
    let n = e.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? s[e] : {} : []), t);
  }
  return t;
}
function sl(s, t, e, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (c, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][s] ? i(s, e) : i(t[n][s]);
}
function $b(s, t, e = ";") {
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
function Pb(s) {
  return [...new Set(s)];
}
function jb(s, t) {
  s.indexOf(t) >= 0 ? s.splice(s.indexOf(t), 1) : s.push(t);
}
function Ub(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 && s.push(e.value);
}
function Vb(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 ? s.push(e.value) : s.splice(s.indexOf(e.value), 1);
}
function Fb(s) {
  s.length = 0;
}
function Hb(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
function Wb(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
var bh = typeof global == "object" && global && global.Object === Object && global, zb = typeof self == "object" && self && self.Object === Object && self, Te = bh || zb || Function("return this")(), is = Te.Symbol, yh = Object.prototype, Kb = yh.hasOwnProperty, Gb = yh.toString, ti = is ? is.toStringTag : void 0;
function Yb(s) {
  var t = Kb.call(s, ti), e = s[ti];
  try {
    s[ti] = void 0;
    var n = !0;
  } catch {
  }
  var i = Gb.call(s);
  return n && (t ? s[ti] = e : delete s[ti]), i;
}
var Xb = Object.prototype, Zb = Xb.toString;
function Qb(s) {
  return Zb.call(s);
}
var Jb = "[object Null]", t1 = "[object Undefined]", dc = is ? is.toStringTag : void 0;
function kn(s) {
  return s == null ? s === void 0 ? t1 : Jb : dc && dc in Object(s) ? Yb(s) : Qb(s);
}
function $e(s) {
  return s != null && typeof s == "object";
}
var Is = Array.isArray;
function ls(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function _h(s) {
  return s;
}
var e1 = "[object AsyncFunction]", s1 = "[object Function]", n1 = "[object GeneratorFunction]", i1 = "[object Proxy]";
function nl(s) {
  if (!ls(s))
    return !1;
  var t = kn(s);
  return t == s1 || t == n1 || t == e1 || t == i1;
}
var Ho = Te["__core-js_shared__"], fc = function() {
  var s = /[^.]+$/.exec(Ho && Ho.keys && Ho.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function r1(s) {
  return !!fc && fc in s;
}
var o1 = Function.prototype, a1 = o1.toString;
function $s(s) {
  if (s != null) {
    try {
      return a1.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
var l1 = /[\\^$.*+?()[\]{}|]/g, c1 = /^\[object .+?Constructor\]$/, u1 = Function.prototype, h1 = Object.prototype, d1 = u1.toString, f1 = h1.hasOwnProperty, p1 = RegExp(
  "^" + d1.call(f1).replace(l1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function g1(s) {
  if (!ls(s) || r1(s))
    return !1;
  var t = nl(s) ? p1 : c1;
  return t.test($s(s));
}
function m1(s, t) {
  return s == null ? void 0 : s[t];
}
function Bs(s, t) {
  var e = m1(s, t);
  return g1(e) ? e : void 0;
}
var da = Bs(Te, "WeakMap"), pc = Object.create, b1 = /* @__PURE__ */ function() {
  function s() {
  }
  return function(t) {
    if (!ls(t))
      return {};
    if (pc)
      return pc(t);
    s.prototype = t;
    var e = new s();
    return s.prototype = void 0, e;
  };
}();
function y1(s, t, e) {
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
function vh(s, t) {
  var e = -1, n = s.length;
  for (t || (t = Array(n)); ++e < n; )
    t[e] = s[e];
  return t;
}
var _1 = 800, v1 = 16, E1 = Date.now;
function w1(s) {
  var t = 0, e = 0;
  return function() {
    var n = E1(), i = v1 - (n - e);
    if (e = n, i > 0) {
      if (++t >= _1)
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
var yr = function() {
  try {
    var s = Bs(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
}(), A1 = yr ? function(s, t) {
  return yr(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: T1(t),
    writable: !0
  });
} : _h, N1 = w1(A1);
function O1(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var C1 = 9007199254740991, S1 = /^(?:0|[1-9]\d*)$/;
function Eh(s, t) {
  var e = typeof s;
  return t = t ?? C1, !!t && (e == "number" || e != "symbol" && S1.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
function il(s, t, e) {
  t == "__proto__" && yr ? yr(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
function Ni(s, t) {
  return s === t || s !== s && t !== t;
}
var x1 = Object.prototype, L1 = x1.hasOwnProperty;
function wh(s, t, e) {
  var n = s[t];
  (!(L1.call(s, t) && Ni(n, e)) || e === void 0 && !(t in s)) && il(s, t, e);
}
function Oi(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var c = t[r], a = void 0;
    a === void 0 && (a = s[c]), i ? il(e, c, a) : wh(e, c, a);
  }
  return e;
}
var gc = Math.max;
function k1(s, t, e) {
  return t = gc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = gc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var c = Array(t + 1); ++i < t; )
      c[i] = n[i];
    return c[t] = e(o), y1(s, this, c);
  };
}
function I1(s, t) {
  return N1(k1(s, t, _h), s + "");
}
var R1 = 9007199254740991;
function Th(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= R1;
}
function Rr(s) {
  return s != null && Th(s.length) && !nl(s);
}
function D1(s, t, e) {
  if (!ls(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? Rr(e) && Eh(t, e.length) : n == "string" && t in e) ? Ni(e[t], s) : !1;
}
function M1(s) {
  return I1(function(t, e) {
    var n = -1, i = e.length, r = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (r = s.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && D1(e[0], e[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var c = e[n];
      c && s(t, c, n, r);
    }
    return t;
  });
}
var q1 = Object.prototype;
function rl(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || q1;
  return s === e;
}
function $1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var B1 = "[object Arguments]";
function mc(s) {
  return $e(s) && kn(s) == B1;
}
var Ah = Object.prototype, P1 = Ah.hasOwnProperty, j1 = Ah.propertyIsEnumerable, fa = mc(/* @__PURE__ */ function() {
  return arguments;
}()) ? mc : function(s) {
  return $e(s) && P1.call(s, "callee") && !j1.call(s, "callee");
};
function U1() {
  return !1;
}
var Nh = typeof exports == "object" && exports && !exports.nodeType && exports, bc = Nh && typeof module == "object" && module && !module.nodeType && module, V1 = bc && bc.exports === Nh, yc = V1 ? Te.Buffer : void 0, F1 = yc ? yc.isBuffer : void 0, di = F1 || U1, H1 = "[object Arguments]", W1 = "[object Array]", z1 = "[object Boolean]", K1 = "[object Date]", G1 = "[object Error]", Y1 = "[object Function]", X1 = "[object Map]", Z1 = "[object Number]", Q1 = "[object Object]", J1 = "[object RegExp]", ty = "[object Set]", ey = "[object String]", sy = "[object WeakMap]", ny = "[object ArrayBuffer]", iy = "[object DataView]", ry = "[object Float32Array]", oy = "[object Float64Array]", ay = "[object Int8Array]", ly = "[object Int16Array]", cy = "[object Int32Array]", uy = "[object Uint8Array]", hy = "[object Uint8ClampedArray]", dy = "[object Uint16Array]", fy = "[object Uint32Array]", st = {};
st[ry] = st[oy] = st[ay] = st[ly] = st[cy] = st[uy] = st[hy] = st[dy] = st[fy] = !0;
st[H1] = st[W1] = st[ny] = st[z1] = st[iy] = st[K1] = st[G1] = st[Y1] = st[X1] = st[Z1] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = !1;
function py(s) {
  return $e(s) && Th(s.length) && !!st[kn(s)];
}
function ol(s) {
  return function(t) {
    return s(t);
  };
}
var Oh = typeof exports == "object" && exports && !exports.nodeType && exports, oi = Oh && typeof module == "object" && module && !module.nodeType && module, gy = oi && oi.exports === Oh, Wo = gy && bh.process, Tn = function() {
  try {
    var s = oi && oi.require && oi.require("util").types;
    return s || Wo && Wo.binding && Wo.binding("util");
  } catch {
  }
}(), _c = Tn && Tn.isTypedArray, al = _c ? ol(_c) : py, my = Object.prototype, by = my.hasOwnProperty;
function Ch(s, t) {
  var e = Is(s), n = !e && fa(s), i = !e && !n && di(s), r = !e && !n && !i && al(s), o = e || n || i || r, c = o ? $1(s.length, String) : [], a = c.length;
  for (var l in s)
    (t || by.call(s, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Eh(l, a))) && c.push(l);
  return c;
}
function Sh(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var yy = Sh(Object.keys, Object), _y = Object.prototype, vy = _y.hasOwnProperty;
function Ey(s) {
  if (!rl(s))
    return yy(s);
  var t = [];
  for (var e in Object(s))
    vy.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function ll(s) {
  return Rr(s) ? Ch(s) : Ey(s);
}
function wy(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
var Ty = Object.prototype, Ay = Ty.hasOwnProperty;
function Ny(s) {
  if (!ls(s))
    return wy(s);
  var t = rl(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !Ay.call(s, n)) || e.push(n);
  return e;
}
function Ci(s) {
  return Rr(s) ? Ch(s, !0) : Ny(s);
}
var fi = Bs(Object, "create");
function Oy() {
  this.__data__ = fi ? fi(null) : {}, this.size = 0;
}
function Cy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var Sy = "__lodash_hash_undefined__", xy = Object.prototype, Ly = xy.hasOwnProperty;
function ky(s) {
  var t = this.__data__;
  if (fi) {
    var e = t[s];
    return e === Sy ? void 0 : e;
  }
  return Ly.call(t, s) ? t[s] : void 0;
}
var Iy = Object.prototype, Ry = Iy.hasOwnProperty;
function Dy(s) {
  var t = this.__data__;
  return fi ? t[s] !== void 0 : Ry.call(t, s);
}
var My = "__lodash_hash_undefined__";
function qy(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = fi && t === void 0 ? My : t, this;
}
function Rs(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Rs.prototype.clear = Oy;
Rs.prototype.delete = Cy;
Rs.prototype.get = ky;
Rs.prototype.has = Dy;
Rs.prototype.set = qy;
function $y() {
  this.__data__ = [], this.size = 0;
}
function Dr(s, t) {
  for (var e = s.length; e--; )
    if (Ni(s[e][0], t))
      return e;
  return -1;
}
var By = Array.prototype, Py = By.splice;
function jy(s) {
  var t = this.__data__, e = Dr(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : Py.call(t, e, 1), --this.size, !0;
}
function Uy(s) {
  var t = this.__data__, e = Dr(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function Vy(s) {
  return Dr(this.__data__, s) > -1;
}
function Fy(s, t) {
  var e = this.__data__, n = Dr(e, s);
  return n < 0 ? (++this.size, e.push([s, t])) : e[n][1] = t, this;
}
function Ue(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Ue.prototype.clear = $y;
Ue.prototype.delete = jy;
Ue.prototype.get = Uy;
Ue.prototype.has = Vy;
Ue.prototype.set = Fy;
var pi = Bs(Te, "Map");
function Hy() {
  this.size = 0, this.__data__ = {
    hash: new Rs(),
    map: new (pi || Ue)(),
    string: new Rs()
  };
}
function Wy(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Mr(s, t) {
  var e = s.__data__;
  return Wy(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function zy(s) {
  var t = Mr(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function Ky(s) {
  return Mr(this, s).get(s);
}
function Gy(s) {
  return Mr(this, s).has(s);
}
function Yy(s, t) {
  var e = Mr(this, s), n = e.size;
  return e.set(s, t), this.size += e.size == n ? 0 : 1, this;
}
function Ps(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Ps.prototype.clear = Hy;
Ps.prototype.delete = zy;
Ps.prototype.get = Ky;
Ps.prototype.has = Gy;
Ps.prototype.set = Yy;
function xh(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var cl = Sh(Object.getPrototypeOf, Object), Xy = "[object Object]", Zy = Function.prototype, Qy = Object.prototype, Lh = Zy.toString, Jy = Qy.hasOwnProperty, t_ = Lh.call(Object);
function e_(s) {
  if (!$e(s) || kn(s) != Xy)
    return !1;
  var t = cl(s);
  if (t === null)
    return !0;
  var e = Jy.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && Lh.call(e) == t_;
}
function s_() {
  this.__data__ = new Ue(), this.size = 0;
}
function n_(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function i_(s) {
  return this.__data__.get(s);
}
function r_(s) {
  return this.__data__.has(s);
}
var o_ = 200;
function a_(s, t) {
  var e = this.__data__;
  if (e instanceof Ue) {
    var n = e.__data__;
    if (!pi || n.length < o_ - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new Ps(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function ye(s) {
  var t = this.__data__ = new Ue(s);
  this.size = t.size;
}
ye.prototype.clear = s_;
ye.prototype.delete = n_;
ye.prototype.get = i_;
ye.prototype.has = r_;
ye.prototype.set = a_;
function l_(s, t) {
  return s && Oi(t, ll(t), s);
}
function c_(s, t) {
  return s && Oi(t, Ci(t), s);
}
var kh = typeof exports == "object" && exports && !exports.nodeType && exports, vc = kh && typeof module == "object" && module && !module.nodeType && module, u_ = vc && vc.exports === kh, Ec = u_ ? Te.Buffer : void 0, wc = Ec ? Ec.allocUnsafe : void 0;
function Ih(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = wc ? wc(e) : new s.constructor(e);
  return s.copy(n), n;
}
function h_(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function Rh() {
  return [];
}
var d_ = Object.prototype, f_ = d_.propertyIsEnumerable, Tc = Object.getOwnPropertySymbols, ul = Tc ? function(s) {
  return s == null ? [] : (s = Object(s), h_(Tc(s), function(t) {
    return f_.call(s, t);
  }));
} : Rh;
function p_(s, t) {
  return Oi(s, ul(s), t);
}
var g_ = Object.getOwnPropertySymbols, Dh = g_ ? function(s) {
  for (var t = []; s; )
    xh(t, ul(s)), s = cl(s);
  return t;
} : Rh;
function m_(s, t) {
  return Oi(s, Dh(s), t);
}
function Mh(s, t, e) {
  var n = t(s);
  return Is(s) ? n : xh(n, e(s));
}
function pa(s) {
  return Mh(s, ll, ul);
}
function b_(s) {
  return Mh(s, Ci, Dh);
}
var ga = Bs(Te, "DataView"), ma = Bs(Te, "Promise"), ba = Bs(Te, "Set"), Ac = "[object Map]", y_ = "[object Object]", Nc = "[object Promise]", Oc = "[object Set]", Cc = "[object WeakMap]", Sc = "[object DataView]", __ = $s(ga), v_ = $s(pi), E_ = $s(ma), w_ = $s(ba), T_ = $s(da), ee = kn;
(ga && ee(new ga(new ArrayBuffer(1))) != Sc || pi && ee(new pi()) != Ac || ma && ee(ma.resolve()) != Nc || ba && ee(new ba()) != Oc || da && ee(new da()) != Cc) && (ee = function(s) {
  var t = kn(s), e = t == y_ ? s.constructor : void 0, n = e ? $s(e) : "";
  if (n)
    switch (n) {
      case __:
        return Sc;
      case v_:
        return Ac;
      case E_:
        return Nc;
      case w_:
        return Oc;
      case T_:
        return Cc;
    }
  return t;
});
var A_ = Object.prototype, N_ = A_.hasOwnProperty;
function O_(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && N_.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var _r = Te.Uint8Array;
function hl(s) {
  var t = new s.constructor(s.byteLength);
  return new _r(t).set(new _r(s)), t;
}
function C_(s, t) {
  var e = t ? hl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var S_ = /\w*$/;
function x_(s) {
  var t = new s.constructor(s.source, S_.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var xc = is ? is.prototype : void 0, Lc = xc ? xc.valueOf : void 0;
function L_(s) {
  return Lc ? Object(Lc.call(s)) : {};
}
function qh(s, t) {
  var e = t ? hl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var k_ = "[object Boolean]", I_ = "[object Date]", R_ = "[object Map]", D_ = "[object Number]", M_ = "[object RegExp]", q_ = "[object Set]", $_ = "[object String]", B_ = "[object Symbol]", P_ = "[object ArrayBuffer]", j_ = "[object DataView]", U_ = "[object Float32Array]", V_ = "[object Float64Array]", F_ = "[object Int8Array]", H_ = "[object Int16Array]", W_ = "[object Int32Array]", z_ = "[object Uint8Array]", K_ = "[object Uint8ClampedArray]", G_ = "[object Uint16Array]", Y_ = "[object Uint32Array]";
function X_(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case P_:
      return hl(s);
    case k_:
    case I_:
      return new n(+s);
    case j_:
      return C_(s, e);
    case U_:
    case V_:
    case F_:
    case H_:
    case W_:
    case z_:
    case K_:
    case G_:
    case Y_:
      return qh(s, e);
    case R_:
      return new n();
    case D_:
    case $_:
      return new n(s);
    case M_:
      return x_(s);
    case q_:
      return new n();
    case B_:
      return L_(s);
  }
}
function $h(s) {
  return typeof s.constructor == "function" && !rl(s) ? b1(cl(s)) : {};
}
var Z_ = "[object Map]";
function Q_(s) {
  return $e(s) && ee(s) == Z_;
}
var kc = Tn && Tn.isMap, J_ = kc ? ol(kc) : Q_, tv = "[object Set]";
function ev(s) {
  return $e(s) && ee(s) == tv;
}
var Ic = Tn && Tn.isSet, sv = Ic ? ol(Ic) : ev, nv = 1, iv = 2, rv = 4, Bh = "[object Arguments]", ov = "[object Array]", av = "[object Boolean]", lv = "[object Date]", cv = "[object Error]", Ph = "[object Function]", uv = "[object GeneratorFunction]", hv = "[object Map]", dv = "[object Number]", jh = "[object Object]", fv = "[object RegExp]", pv = "[object Set]", gv = "[object String]", mv = "[object Symbol]", bv = "[object WeakMap]", yv = "[object ArrayBuffer]", _v = "[object DataView]", vv = "[object Float32Array]", Ev = "[object Float64Array]", wv = "[object Int8Array]", Tv = "[object Int16Array]", Av = "[object Int32Array]", Nv = "[object Uint8Array]", Ov = "[object Uint8ClampedArray]", Cv = "[object Uint16Array]", Sv = "[object Uint32Array]", et = {};
et[Bh] = et[ov] = et[yv] = et[_v] = et[av] = et[lv] = et[vv] = et[Ev] = et[wv] = et[Tv] = et[Av] = et[hv] = et[dv] = et[jh] = et[fv] = et[pv] = et[gv] = et[mv] = et[Nv] = et[Ov] = et[Cv] = et[Sv] = !0;
et[cv] = et[Ph] = et[bv] = !1;
function ur(s, t, e, n, i, r) {
  var o, c = t & nv, a = t & iv, l = t & rv;
  if (o !== void 0)
    return o;
  if (!ls(s))
    return s;
  var h = Is(s);
  if (h) {
    if (o = O_(s), !c)
      return vh(s, o);
  } else {
    var p = ee(s), g = p == Ph || p == uv;
    if (di(s))
      return Ih(s, c);
    if (p == jh || p == Bh || g && !i) {
      if (o = a || g ? {} : $h(s), !c)
        return a ? m_(s, c_(o, s)) : p_(s, l_(o, s));
    } else {
      if (!et[p])
        return i ? s : {};
      o = X_(s, p, c);
    }
  }
  r || (r = new ye());
  var m = r.get(s);
  if (m)
    return m;
  r.set(s, o), sv(s) ? s.forEach(function(w) {
    o.add(ur(w, t, e, w, s, r));
  }) : J_(s) && s.forEach(function(w, T) {
    o.set(T, ur(w, t, e, T, s, r));
  });
  var v = l ? a ? b_ : pa : a ? Ci : ll, E = h ? void 0 : v(s);
  return O1(E || s, function(w, T) {
    E && (T = w, w = s[T]), wh(o, T, ur(w, t, e, T, s, r));
  }), o;
}
var xv = 1, Lv = 4;
function pn(s) {
  return ur(s, xv | Lv);
}
var kv = "__lodash_hash_undefined__";
function Iv(s) {
  return this.__data__.set(s, kv), this;
}
function Rv(s) {
  return this.__data__.has(s);
}
function vr(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new Ps(); ++t < e; )
    this.add(s[t]);
}
vr.prototype.add = vr.prototype.push = Iv;
vr.prototype.has = Rv;
function Dv(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n; )
    if (t(s[e], e, s))
      return !0;
  return !1;
}
function Mv(s, t) {
  return s.has(t);
}
var qv = 1, $v = 2;
function Uh(s, t, e, n, i, r) {
  var o = e & qv, c = s.length, a = t.length;
  if (c != a && !(o && a > c))
    return !1;
  var l = r.get(s), h = r.get(t);
  if (l && h)
    return l == t && h == s;
  var p = -1, g = !0, m = e & $v ? new vr() : void 0;
  for (r.set(s, t), r.set(t, s); ++p < c; ) {
    var v = s[p], E = t[p];
    if (n)
      var w = o ? n(E, v, p, t, s, r) : n(v, E, p, s, t, r);
    if (w !== void 0) {
      if (w)
        continue;
      g = !1;
      break;
    }
    if (m) {
      if (!Dv(t, function(T, C) {
        if (!Mv(m, C) && (v === T || i(v, T, e, n, r)))
          return m.push(C);
      })) {
        g = !1;
        break;
      }
    } else if (!(v === E || i(v, E, e, n, r))) {
      g = !1;
      break;
    }
  }
  return r.delete(s), r.delete(t), g;
}
function Bv(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n, i) {
    e[++t] = [i, n];
  }), e;
}
function Pv(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n) {
    e[++t] = n;
  }), e;
}
var jv = 1, Uv = 2, Vv = "[object Boolean]", Fv = "[object Date]", Hv = "[object Error]", Wv = "[object Map]", zv = "[object Number]", Kv = "[object RegExp]", Gv = "[object Set]", Yv = "[object String]", Xv = "[object Symbol]", Zv = "[object ArrayBuffer]", Qv = "[object DataView]", Rc = is ? is.prototype : void 0, zo = Rc ? Rc.valueOf : void 0;
function Jv(s, t, e, n, i, r, o) {
  switch (e) {
    case Qv:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case Zv:
      return !(s.byteLength != t.byteLength || !r(new _r(s), new _r(t)));
    case Vv:
    case Fv:
    case zv:
      return Ni(+s, +t);
    case Hv:
      return s.name == t.name && s.message == t.message;
    case Kv:
    case Yv:
      return s == t + "";
    case Wv:
      var c = Bv;
    case Gv:
      var a = n & jv;
      if (c || (c = Pv), s.size != t.size && !a)
        return !1;
      var l = o.get(s);
      if (l)
        return l == t;
      n |= Uv, o.set(s, t);
      var h = Uh(c(s), c(t), n, i, r, o);
      return o.delete(s), h;
    case Xv:
      if (zo)
        return zo.call(s) == zo.call(t);
  }
  return !1;
}
var t0 = 1, e0 = Object.prototype, s0 = e0.hasOwnProperty;
function n0(s, t, e, n, i, r) {
  var o = e & t0, c = pa(s), a = c.length, l = pa(t), h = l.length;
  if (a != h && !o)
    return !1;
  for (var p = a; p--; ) {
    var g = c[p];
    if (!(o ? g in t : s0.call(t, g)))
      return !1;
  }
  var m = r.get(s), v = r.get(t);
  if (m && v)
    return m == t && v == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var w = o; ++p < a; ) {
    g = c[p];
    var T = s[g], C = t[g];
    if (n)
      var x = o ? n(C, T, g, t, s, r) : n(T, C, g, s, t, r);
    if (!(x === void 0 ? T === C || i(T, C, e, n, r) : x)) {
      E = !1;
      break;
    }
    w || (w = g == "constructor");
  }
  if (E && !w) {
    var L = s.constructor, I = t.constructor;
    L != I && "constructor" in s && "constructor" in t && !(typeof L == "function" && L instanceof L && typeof I == "function" && I instanceof I) && (E = !1);
  }
  return r.delete(s), r.delete(t), E;
}
var i0 = 1, Dc = "[object Arguments]", Mc = "[object Array]", er = "[object Object]", r0 = Object.prototype, qc = r0.hasOwnProperty;
function o0(s, t, e, n, i, r) {
  var o = Is(s), c = Is(t), a = o ? Mc : ee(s), l = c ? Mc : ee(t);
  a = a == Dc ? er : a, l = l == Dc ? er : l;
  var h = a == er, p = l == er, g = a == l;
  if (g && di(s)) {
    if (!di(t))
      return !1;
    o = !0, h = !1;
  }
  if (g && !h)
    return r || (r = new ye()), o || al(s) ? Uh(s, t, e, n, i, r) : Jv(s, t, a, e, n, i, r);
  if (!(e & i0)) {
    var m = h && qc.call(s, "__wrapped__"), v = p && qc.call(t, "__wrapped__");
    if (m || v) {
      var E = m ? s.value() : s, w = v ? t.value() : t;
      return r || (r = new ye()), i(E, w, e, n, r);
    }
  }
  return g ? (r || (r = new ye()), n0(s, t, e, n, i, r)) : !1;
}
function Vh(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !$e(s) && !$e(t) ? s !== s && t !== t : o0(s, t, e, n, Vh, i);
}
function a0(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), c = o.length; c--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var l0 = a0();
function ya(s, t, e) {
  (e !== void 0 && !Ni(s[t], e) || e === void 0 && !(t in s)) && il(s, t, e);
}
function c0(s) {
  return $e(s) && Rr(s);
}
function _a(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function u0(s) {
  return Oi(s, Ci(s));
}
function h0(s, t, e, n, i, r, o) {
  var c = _a(s, e), a = _a(t, e), l = o.get(a);
  if (l) {
    ya(s, e, l);
    return;
  }
  var h = r ? r(c, a, e + "", s, t, o) : void 0, p = h === void 0;
  if (p) {
    var g = Is(a), m = !g && di(a), v = !g && !m && al(a);
    h = a, g || m || v ? Is(c) ? h = c : c0(c) ? h = vh(c) : m ? (p = !1, h = Ih(a, !0)) : v ? (p = !1, h = qh(a, !0)) : h = [] : e_(a) || fa(a) ? (h = c, fa(c) ? h = u0(c) : (!ls(c) || nl(c)) && (h = $h(a))) : p = !1;
  }
  p && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), ya(s, e, h);
}
function Fh(s, t, e, n, i) {
  s !== t && l0(t, function(r, o) {
    if (i || (i = new ye()), ls(r))
      h0(s, t, o, e, Fh, n, i);
    else {
      var c = n ? n(_a(s, o), r, o + "", s, t, i) : void 0;
      c === void 0 && (c = r), ya(s, o, c);
    }
  }, Ci);
}
function dl(s, t) {
  return Vh(s, t);
}
var ts = M1(function(s, t, e) {
  Fh(s, t, e);
}), B = /* @__PURE__ */ ((s) => (s[s.TYPE = 3] = "TYPE", s[s.LEVEL = 12] = "LEVEL", s[s.ATTRIBUTE = 13] = "ATTRIBUTE", s[s.BLOT = 14] = "BLOT", s[s.INLINE = 7] = "INLINE", s[s.BLOCK = 11] = "BLOCK", s[s.BLOCK_BLOT = 10] = "BLOCK_BLOT", s[s.INLINE_BLOT = 6] = "INLINE_BLOT", s[s.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", s[s.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", s[s.ANY = 15] = "ANY", s))(B || {});
class Ee {
  constructor(t, e, n = {}) {
    this.attrName = t, this.keyName = e;
    const i = B.TYPE & B.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & B.LEVEL | i
    ) : B.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
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
class gn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Hh = class va {
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
      throw new gn(`Unable to create ${e} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(n)
    ), c = new r(t, o, n);
    return va.blots.set(c.domNode, c), c;
  }
  find(t, e = !1) {
    return va.find(t, e);
  }
  query(t, e = B.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & B.LEVEL & B.BLOCK ? n = this.types.block : t & B.LEVEL & B.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && e & B.LEVEL & n.scope && e & B.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((e) => {
      const n = "blotName" in e, i = "attrName" in e;
      if (!n && !i)
        throw new gn("Invalid definition");
      if (n && e.blotName === "abstract")
        throw new gn("Cannot register abstract class");
      const r = n ? e.blotName : i ? e.attrName : void 0;
      return this.types[r] = e, i ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : n && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((o) => o.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((o) => {
        (this.tags[o] == null || e.className == null) && (this.tags[o] = e);
      }))), e;
    });
  }
};
Hh.blots = /* @__PURE__ */ new WeakMap();
let An = Hh;
function $c(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class d0 extends Ee {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    $c(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = ($c(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const oe = d0;
function Ko(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class f0 extends Ee {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[Ko(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[Ko(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[Ko(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
const cs = f0;
class p0 {
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
    const e = Ee.keys(this.domNode), n = oe.keys(this.domNode), i = cs.keys(this.domNode);
    e.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, B.ATTRIBUTE);
      o instanceof Ee && (this.attributes[o.attrName] = o);
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
const qr = p0, Wh = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, An.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new gn("Blot definition missing tagName");
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
    if (this.scroll.query(n, B.BLOT) != null && i)
      r.wrap(n, i);
    else if (this.scroll.query(n, B.ATTRIBUTE) != null) {
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
      throw new gn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Wh.blotName = "abstract";
let zh = Wh;
const Kh = class extends zh {
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
Kh.scope = B.INLINE_BLOT;
let g0 = Kh;
const yt = g0;
class m0 {
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
function Bc(s, t) {
  const e = t.find(s);
  if (e)
    return e;
  try {
    return t.create(s);
  } catch {
    const n = t.create(B.INLINE);
    return Array.from(s.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), s.parentNode && s.parentNode.replaceChild(n.domNode, s), n.attach(), n;
  }
}
const Gh = class Xe extends zh {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, Xe.uiClass && this.uiNode.classList.add(Xe.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new m0(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = Bc(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof gn)
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
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof Xe ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, e = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      e,
      n,
      (o, c, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof Xe && (i = i.concat(
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
      ) || (e.statics.scope === B.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof Xe ? e.unwrap() : e.remove());
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
    return n instanceof Xe ? r.concat(n.path(i, e)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, e) {
    const n = typeof t == "string" ? this.scroll.create(t, e) : t;
    return n instanceof Xe && this.moveChildren(n), super.replaceWith(n);
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
      const c = Bc(r, this.scroll);
      (c.next !== o || c.next == null) && (c.parent != null && c.parent.removeChild(this), this.insertBefore(c, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Gh.uiClass = "";
let b0 = Gh;
const ne = b0;
function y0(s, t) {
  if (Object.keys(s).length !== Object.keys(t).length)
    return !1;
  for (const e in s)
    if (s[e] !== t[e])
      return !1;
  return !0;
}
const on = class an extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(an.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new qr(this.domNode);
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((n) => {
        n instanceof an || (n = n.wrap(an.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, B.INLINE);
      if (n == null)
        return;
      n instanceof Ee ? this.attributes.attribute(n, e) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e);
    }
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, n, i) {
    this.formats()[n] != null || this.scroll.query(n, B.ATTRIBUTE) ? this.isolate(t, e).format(n, i) : super.formatAt(t, e, n, i);
  }
  optimize(t) {
    super.optimize(t);
    const e = this.formats();
    if (Object.keys(e).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof an && n.prev === this && y0(e, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof an && this.attributes.move(n), n;
  }
};
on.allowedChildren = [on, yt], on.blotName = "inline", on.scope = B.INLINE_BLOT, on.tagName = "SPAN";
let _0 = on;
const fl = _0, ln = class Ea extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(Ea.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new qr(this.domNode);
  }
  format(t, e) {
    const n = this.scroll.query(t, B.BLOCK);
    n != null && (n instanceof Ee ? this.attributes.attribute(n, e) : t === this.statics.blotName && !e ? this.replaceWith(Ea.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, n, i) {
    this.scroll.query(n, B.BLOCK) != null ? this.format(n, i) : super.formatAt(t, e, n, i);
  }
  insertAt(t, e, n) {
    if (n == null || this.scroll.query(e, B.INLINE) != null)
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
ln.blotName = "block", ln.scope = B.BLOCK_BLOT, ln.tagName = "P", ln.allowedChildren = [
  fl,
  ln,
  yt
];
let v0 = ln;
const gi = v0, wa = class extends ne {
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
wa.blotName = "container", wa.scope = B.BLOCK_BLOT;
let E0 = wa;
const $r = E0;
class w0 extends yt {
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
const Dt = w0, T0 = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, A0 = 100, cn = class extends ne {
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
  query(t, e = B.ANY) {
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
      n.has(a.domNode) && (a instanceof ne && a.children.forEach(o), n.delete(a.domNode), a.optimize(e));
    };
    let c = t;
    for (let a = 0; c.length > 0; a += 1) {
      if (a >= A0)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (c.forEach((l) => {
        const h = this.find(l.target, !0);
        h != null && (h.domNode === l.target && (l.type === "childList" ? (r(this.find(l.previousSibling, !1)), Array.from(l.addedNodes).forEach((p) => {
          const g = this.find(p, !1);
          r(g, !1), g instanceof ne && g.children.forEach((m) => {
            r(m, !1);
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
cn.blotName = "scroll", cn.defaultChild = gi, cn.allowedChildren = [gi, $r], cn.scope = B.BLOCK_BLOT, cn.tagName = "DIV";
let N0 = cn;
const pl = N0, Ta = class Yh extends yt {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Yh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Ta.blotName = "text", Ta.scope = B.INLINE_BLOT;
let O0 = Ta;
const Er = O0, C0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Ee,
  AttributorStore: qr,
  BlockBlot: gi,
  ClassAttributor: oe,
  ContainerBlot: $r,
  EmbedBlot: Dt,
  InlineBlot: fl,
  LeafBlot: yt,
  ParentBlot: ne,
  Registry: An,
  Scope: B,
  ScrollBlot: pl,
  StyleAttributor: cs,
  TextBlot: Er
}, Symbol.toStringTag, { value: "Module" }));
var Ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xh(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Aa = { exports: {} }, Lt = -1, wt = 1, ct = 0;
function mi(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = q0(s, t, e);
    if (r)
      return r;
  }
  var o = gl(s, t), c = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = Br(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var l = S0(s, t);
  return c && l.unshift([ct, c]), a && l.push([ct, a]), ml(l, i), n && k0(l), l;
}
function S0(s, t) {
  var e;
  if (!s)
    return [[wt, t]];
  if (!t)
    return [[Lt, s]];
  var n = s.length > t.length ? s : t, i = s.length > t.length ? t : s, r = n.indexOf(i);
  if (r !== -1)
    return e = [
      [wt, n.substring(0, r)],
      [ct, i],
      [wt, n.substring(r + i.length)]
    ], s.length > t.length && (e[0][0] = e[2][0] = Lt), e;
  if (i.length === 1)
    return [
      [Lt, s],
      [wt, t]
    ];
  var o = L0(s, t);
  if (o) {
    var c = o[0], a = o[1], l = o[2], h = o[3], p = o[4], g = mi(c, l), m = mi(a, h);
    return g.concat([[ct, p]], m);
  }
  return x0(s, t);
}
function x0(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, c = new Array(o), a = new Array(o), l = 0; l < o; l++)
    c[l] = -1, a[l] = -1;
  c[r + 1] = 0, a[r + 1] = 0;
  for (var h = e - n, p = h % 2 !== 0, g = 0, m = 0, v = 0, E = 0, w = 0; w < i; w++) {
    for (var T = -w + g; T <= w - m; T += 2) {
      var C = r + T, x;
      T === -w || T !== w && c[C - 1] < c[C + 1] ? x = c[C + 1] : x = c[C - 1] + 1;
      for (var L = x - T; x < e && L < n && s.charAt(x) === t.charAt(L); )
        x++, L++;
      if (c[C] = x, x > e)
        m += 2;
      else if (L > n)
        g += 2;
      else if (p) {
        var I = r + h - T;
        if (I >= 0 && I < o && a[I] !== -1) {
          var D = e - a[I];
          if (x >= D)
            return Pc(s, t, x, L);
        }
      }
    }
    for (var P = -w + v; P <= w - E; P += 2) {
      var I = r + P, D;
      P === -w || P !== w && a[I - 1] < a[I + 1] ? D = a[I + 1] : D = a[I - 1] + 1;
      for (var F = D - P; D < e && F < n && s.charAt(e - D - 1) === t.charAt(n - F - 1); )
        D++, F++;
      if (a[I] = D, D > e)
        E += 2;
      else if (F > n)
        v += 2;
      else if (!p) {
        var C = r + h - P;
        if (C >= 0 && C < o && c[C] !== -1) {
          var x = c[C], L = r + x - C;
          if (D = e - D, x >= D)
            return Pc(s, t, x, L);
        }
      }
    }
  }
  return [
    [Lt, s],
    [wt, t]
  ];
}
function Pc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), c = t.substring(n), a = mi(i, r), l = mi(o, c);
  return a.concat(l);
}
function gl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Zh(s.charCodeAt(i - 1)) && i--, i;
}
function jc(s, t) {
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
function Br(s, t) {
  if (!s || !t || s.slice(-1) !== t.slice(-1))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(s.length - i, s.length - r) == t.substring(t.length - i, t.length - r) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Qh(s.charCodeAt(s.length - i)) && i--, i;
}
function L0(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(m, v, E) {
    for (var w = m.substring(E, E + Math.floor(m.length / 4)), T = -1, C = "", x, L, I, D; (T = v.indexOf(w, T + 1)) !== -1; ) {
      var P = gl(
        m.substring(E),
        v.substring(T)
      ), F = Br(
        m.substring(0, E),
        v.substring(0, T)
      );
      C.length < F + P && (C = v.substring(T - F, T) + v.substring(T, T + P), x = m.substring(0, E - F), L = m.substring(E + P), I = v.substring(0, T - F), D = v.substring(T + P));
    }
    return C.length * 2 >= m.length ? [
      x,
      L,
      I,
      D,
      C
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
  var a, l, h, p;
  s.length > t.length ? (a = c[0], l = c[1], h = c[2], p = c[3]) : (h = c[0], p = c[1], a = c[2], l = c[3]);
  var g = c[4];
  return [a, l, h, p, g];
}
function k0(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, c = 0, a = 0, l = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, c = l, a = 0, l = 0, i = s[r][1]) : (s[r][0] == wt ? a += s[r][1].length : l += s[r][1].length, i && i.length <= Math.max(o, c) && i.length <= Math.max(a, l) && (s.splice(e[n - 1], 0, [
      Lt,
      i
    ]), s[e[n - 1] + 1][0] = wt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, c = 0, a = 0, l = 0, i = null, t = !0)), r++;
  for (t && ml(s), D0(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == Lt && s[r][0] == wt) {
      var h = s[r - 1][1], p = s[r][1], g = jc(h, p), m = jc(p, h);
      g >= m ? (g >= h.length / 2 || g >= p.length / 2) && (s.splice(r, 0, [
        ct,
        p.substring(0, g)
      ]), s[r - 1][1] = h.substring(
        0,
        h.length - g
      ), s[r + 1][1] = p.substring(g), r++) : (m >= h.length / 2 || m >= p.length / 2) && (s.splice(r, 0, [
        ct,
        h.substring(0, m)
      ]), s[r - 1][0] = wt, s[r - 1][1] = p.substring(
        0,
        p.length - m
      ), s[r + 1][0] = Lt, s[r + 1][1] = h.substring(m), r++), r++;
    }
    r++;
  }
}
var Uc = /[^a-zA-Z0-9]/, Vc = /\s/, Fc = /[\r\n]/, I0 = /\n\r?\n$/, R0 = /^\r?\n\r?\n/;
function D0(s) {
  function t(m, v) {
    if (!m || !v)
      return 6;
    var E = m.charAt(m.length - 1), w = v.charAt(0), T = E.match(Uc), C = w.match(Uc), x = T && E.match(Vc), L = C && w.match(Vc), I = x && E.match(Fc), D = L && w.match(Fc), P = I && m.match(I0), F = D && v.match(R0);
    return P || F ? 5 : I || D ? 4 : T && !x && L ? 3 : x || L ? 2 : T || C ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = Br(n, i);
      if (o) {
        var c = i.substring(i.length - o);
        n = n.substring(0, n.length - o), i = c + i.substring(0, i.length - o), r = c + r;
      }
      for (var a = n, l = i, h = r, p = t(n, i) + t(i, r); i.charAt(0) === r.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + r.charAt(0), r = r.substring(1);
        var g = t(n, i) + t(i, r);
        g >= p && (p = g, a = n, l = i, h = r);
      }
      s[e - 1][1] != a && (a ? s[e - 1][1] = a : (s.splice(e - 1, 1), e--), s[e][1] = l, h ? s[e + 1][1] = h : (s.splice(e + 1, 1), e--));
    }
    e++;
  }
}
function ml(s, t) {
  s.push([ct, ""]);
  for (var e = 0, n = 0, i = 0, r = "", o = "", c; e < s.length; ) {
    if (e < s.length - 1 && !s[e][1]) {
      s.splice(e, 1);
      continue;
    }
    switch (s[e][0]) {
      case wt:
        i++, o += s[e][1], e++;
        break;
      case Lt:
        n++, r += s[e][1], e++;
        break;
      case ct:
        var a = e - i - n - 1;
        if (t) {
          if (a >= 0 && td(s[a][1])) {
            var l = s[a][1].slice(-1);
            if (s[a][1] = s[a][1].slice(
              0,
              -1
            ), r = l + r, o = l + o, !s[a][1]) {
              s.splice(a, 1), e--;
              var h = a - 1;
              s[h] && s[h][0] === wt && (i++, o = s[h][1] + o, h--), s[h] && s[h][0] === Lt && (n++, r = s[h][1] + r, h--), a = h;
            }
          }
          if (Jh(s[e][1])) {
            var l = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += l, o += l;
          }
        }
        if (e < s.length - 1 && !s[e][1]) {
          s.splice(e, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (c = gl(o, r), c !== 0 && (a >= 0 ? s[a][1] += o.substring(
            0,
            c
          ) : (s.splice(0, 0, [
            ct,
            o.substring(0, c)
          ]), e++), o = o.substring(c), r = r.substring(c)), c = Br(o, r), c !== 0 && (s[e][1] = o.substring(o.length - c) + s[e][1], o = o.substring(
            0,
            o.length - c
          ), r = r.substring(
            0,
            r.length - c
          )));
          var p = i + n;
          r.length === 0 && o.length === 0 ? (s.splice(e - p, p), e = e - p) : r.length === 0 ? (s.splice(e - p, p, [wt, o]), e = e - p + 1) : o.length === 0 ? (s.splice(e - p, p, [Lt, r]), e = e - p + 1) : (s.splice(
            e - p,
            p,
            [Lt, r],
            [wt, o]
          ), e = e - p + 2);
        }
        e !== 0 && s[e - 1][0] === ct ? (s[e - 1][1] += s[e][1], s.splice(e, 1)) : e++, i = 0, n = 0, r = "", o = "";
        break;
    }
  }
  s[s.length - 1][1] === "" && s.pop();
  var g = !1;
  for (e = 1; e < s.length - 1; )
    s[e - 1][0] === ct && s[e + 1][0] === ct && (s[e][1].substring(
      s[e][1].length - s[e - 1][1].length
    ) === s[e - 1][1] ? (s[e][1] = s[e - 1][1] + s[e][1].substring(
      0,
      s[e][1].length - s[e - 1][1].length
    ), s[e + 1][1] = s[e - 1][1] + s[e + 1][1], s.splice(e - 1, 1), g = !0) : s[e][1].substring(0, s[e + 1][1].length) == s[e + 1][1] && (s[e - 1][1] += s[e + 1][1], s[e][1] = s[e][1].substring(s[e + 1][1].length) + s[e + 1][1], s.splice(e + 1, 1), g = !0)), e++;
  g && ml(s, t);
}
function Zh(s) {
  return s >= 55296 && s <= 56319;
}
function Qh(s) {
  return s >= 56320 && s <= 57343;
}
function Jh(s) {
  return Qh(s.charCodeAt(0));
}
function td(s) {
  return Zh(s.charCodeAt(s.length - 1));
}
function M0(s) {
  for (var t = [], e = 0; e < s.length; e++)
    s[e][1].length > 0 && t.push(s[e]);
  return t;
}
function Go(s, t, e, n) {
  return td(s) || Jh(n) ? null : M0([
    [ct, s],
    [Lt, t],
    [wt, e],
    [ct, n]
  ]);
}
function q0(s, t, e) {
  var n = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i = typeof e == "number" ? null : e.newRange, r = s.length, o = t.length;
  if (n.length === 0 && (i === null || i.length === 0)) {
    var c = n.index, a = s.slice(0, c), l = s.slice(c), h = i ? i.index : null;
    t: {
      var p = c + o - r;
      if (h !== null && h !== p || p < 0 || p > o)
        break t;
      var g = t.slice(0, p), m = t.slice(p);
      if (m !== l)
        break t;
      var v = Math.min(c, p), E = a.slice(0, v), w = g.slice(0, v);
      if (E !== w)
        break t;
      var T = a.slice(v), C = g.slice(v);
      return Go(E, T, C, l);
    }
    t: {
      if (h !== null && h !== c)
        break t;
      var x = c, g = t.slice(0, x), m = t.slice(x);
      if (g !== a)
        break t;
      var L = Math.min(r - x, o - x), I = l.slice(l.length - L), D = m.slice(m.length - L);
      if (I !== D)
        break t;
      var T = l.slice(0, l.length - L), C = m.slice(0, m.length - L);
      return Go(a, T, C, I);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), I = s.slice(n.index + n.length), v = E.length, L = I.length;
      if (o < v + L)
        break t;
      var w = t.slice(0, v), D = t.slice(o - L);
      if (E !== w || I !== D)
        break t;
      var T = s.slice(v, r - L), C = t.slice(v, o - L);
      return Go(E, T, C, I);
    }
  return null;
}
function Pr(s, t, e, n) {
  return mi(s, t, e, n, !0);
}
Pr.INSERT = wt;
Pr.DELETE = Lt;
Pr.EQUAL = ct;
var $0 = Pr, wr = { exports: {} };
wr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", c = "[object Boolean]", a = "[object Date]", l = "[object Error]", h = "[object Function]", p = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", v = "[object Object]", E = "[object Promise]", w = "[object RegExp]", T = "[object Set]", C = "[object String]", x = "[object Symbol]", L = "[object WeakMap]", I = "[object ArrayBuffer]", D = "[object DataView]", P = "[object Float32Array]", F = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Mt = "[object Uint16Array]", qt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, vt = /\w*$/, Fe = /^\[object .+?Constructor\]$/, Yt = /^(?:0|[1-9]\d*)$/, Y = {};
  Y[r] = Y[o] = Y[I] = Y[D] = Y[c] = Y[a] = Y[P] = Y[F] = Y[J] = Y[tt] = Y[nt] = Y[g] = Y[m] = Y[v] = Y[w] = Y[T] = Y[C] = Y[x] = Y[ot] = Y[it] = Y[Mt] = Y[qt] = !0, Y[l] = Y[h] = Y[L] = !1;
  var us = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, Ae = typeof self == "object" && self && self.Object === Object && self, pt = us || Ae || Function("return this")(), Xt = t && !t.nodeType && t, z = Xt && !0 && s && !s.nodeType && s, ce = z && z.exports === Xt;
  function He(u, d) {
    return u.set(d[0], d[1]), u;
  }
  function at(u, d) {
    return u.add(d), u;
  }
  function We(u, d) {
    for (var _ = -1, N = u ? u.length : 0; ++_ < N && d(u[_], _, u) !== !1; )
      ;
    return u;
  }
  function Fs(u, d) {
    for (var _ = -1, N = d.length, H = u.length; ++_ < N; )
      u[H + _] = d[_];
    return u;
  }
  function Ne(u, d, _, N) {
    for (var H = -1, j = u ? u.length : 0; ++H < j; )
      _ = d(_, u[H], H, u);
    return _;
  }
  function hs(u, d) {
    for (var _ = -1, N = Array(u); ++_ < u; )
      N[_] = d(_);
    return N;
  }
  function ds(u, d) {
    return u == null ? void 0 : u[d];
  }
  function fs(u) {
    var d = !1;
    if (u != null && typeof u.toString != "function")
      try {
        d = !!(u + "");
      } catch {
      }
    return d;
  }
  function Hs(u) {
    var d = -1, _ = Array(u.size);
    return u.forEach(function(N, H) {
      _[++d] = [H, N];
    }), _;
  }
  function ze(u, d) {
    return function(_) {
      return u(d(_));
    };
  }
  function ps(u) {
    var d = -1, _ = Array(u.size);
    return u.forEach(function(N) {
      _[++d] = N;
    }), _;
  }
  var Rn = Array.prototype, Dn = Function.prototype, Nt = Object.prototype, ue = pt["__core-js_shared__"], gs = function() {
    var u = /[^.]+$/.exec(ue && ue.keys && ue.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), ms = Dn.toString, Ot = Nt.hasOwnProperty, Oe = Nt.toString, Ws = RegExp(
    "^" + ms.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), he = ce ? pt.Buffer : void 0, Ce = pt.Symbol, Mn = pt.Uint8Array, $t = ze(Object.getPrototypeOf, Object), Ii = Object.create, Ri = Nt.propertyIsEnumerable, Hr = Rn.splice, qn = Object.getOwnPropertySymbols, zs = he ? he.isBuffer : void 0, Di = ze(Object.keys, Object), Ks = Qt(pt, "DataView"), bs = Qt(pt, "Map"), Zt = Qt(pt, "Promise"), Gs = Qt(pt, "Set"), $n = Qt(pt, "WeakMap"), ys = Qt(Object, "create"), Bn = Et(Ks), _s = Et(bs), Pn = Et(Zt), jn = Et(Gs), Un = Et($n), Ke = Ce ? Ce.prototype : void 0, Mi = Ke ? Ke.valueOf : void 0;
  function Se(u) {
    var d = -1, _ = u ? u.length : 0;
    for (this.clear(); ++d < _; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Wr() {
    this.__data__ = ys ? ys(null) : {};
  }
  function zr(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function Kr(u) {
    var d = this.__data__;
    if (ys) {
      var _ = d[u];
      return _ === n ? void 0 : _;
    }
    return Ot.call(d, u) ? d[u] : void 0;
  }
  function qi(u) {
    var d = this.__data__;
    return ys ? d[u] !== void 0 : Ot.call(d, u);
  }
  function Vn(u, d) {
    var _ = this.__data__;
    return _[u] = ys && d === void 0 ? n : d, this;
  }
  Se.prototype.clear = Wr, Se.prototype.delete = zr, Se.prototype.get = Kr, Se.prototype.has = qi, Se.prototype.set = Vn;
  function ht(u) {
    var d = -1, _ = u ? u.length : 0;
    for (this.clear(); ++d < _; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Gr() {
    this.__data__ = [];
  }
  function Yr(u) {
    var d = this.__data__, _ = Xs(d, u);
    if (_ < 0)
      return !1;
    var N = d.length - 1;
    return _ == N ? d.pop() : Hr.call(d, _, 1), !0;
  }
  function Xr(u) {
    var d = this.__data__, _ = Xs(d, u);
    return _ < 0 ? void 0 : d[_][1];
  }
  function Zr(u) {
    return Xs(this.__data__, u) > -1;
  }
  function Qr(u, d) {
    var _ = this.__data__, N = Xs(_, u);
    return N < 0 ? _.push([u, d]) : _[N][1] = d, this;
  }
  ht.prototype.clear = Gr, ht.prototype.delete = Yr, ht.prototype.get = Xr, ht.prototype.has = Zr, ht.prototype.set = Qr;
  function gt(u) {
    var d = -1, _ = u ? u.length : 0;
    for (this.clear(); ++d < _; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Jr() {
    this.__data__ = {
      hash: new Se(),
      map: new (bs || ht)(),
      string: new Se()
    };
  }
  function to(u) {
    return Es(this, u).delete(u);
  }
  function eo(u) {
    return Es(this, u).get(u);
  }
  function so(u) {
    return Es(this, u).has(u);
  }
  function no(u, d) {
    return Es(this, u).set(u, d), this;
  }
  gt.prototype.clear = Jr, gt.prototype.delete = to, gt.prototype.get = eo, gt.prototype.has = so, gt.prototype.set = no;
  function Ct(u) {
    this.__data__ = new ht(u);
  }
  function io() {
    this.__data__ = new ht();
  }
  function ro(u) {
    return this.__data__.delete(u);
  }
  function oo(u) {
    return this.__data__.get(u);
  }
  function ao(u) {
    return this.__data__.has(u);
  }
  function lo(u, d) {
    var _ = this.__data__;
    if (_ instanceof ht) {
      var N = _.__data__;
      if (!bs || N.length < e - 1)
        return N.push([u, d]), this;
      _ = this.__data__ = new gt(N);
    }
    return _.set(u, d), this;
  }
  Ct.prototype.clear = io, Ct.prototype.delete = ro, Ct.prototype.get = oo, Ct.prototype.has = ao, Ct.prototype.set = lo;
  function Ys(u, d) {
    var _ = zn(u) || Qs(u) ? hs(u.length, String) : [], N = _.length, H = !!N;
    for (var j in u)
      Ot.call(u, j) && !(H && (j == "length" || To(j, N))) && _.push(j);
    return _;
  }
  function $i(u, d, _) {
    var N = u[d];
    (!(Ot.call(u, d) && Vi(N, _)) || _ === void 0 && !(d in u)) && (u[d] = _);
  }
  function Xs(u, d) {
    for (var _ = u.length; _--; )
      if (Vi(u[_][0], d))
        return _;
    return -1;
  }
  function de(u, d) {
    return u && Wn(d, Gn(d), u);
  }
  function Fn(u, d, _, N, H, j, Z) {
    var X;
    if (N && (X = j ? N(u, H, j, Z) : N(u)), X !== void 0)
      return X;
    if (!pe(u))
      return u;
    var rt = zn(u);
    if (rt) {
      if (X = Eo(u), !d)
        return yo(u, X);
    } else {
      var Q = Le(u), mt = Q == h || Q == p;
      if (Fi(u))
        return Zs(u, d);
      if (Q == v || Q == r || mt && !j) {
        if (fs(u))
          return j ? u : {};
        if (X = fe(mt ? {} : u), !d)
          return _o(u, de(X, u));
      } else {
        if (!Y[Q])
          return j ? u : {};
        X = wo(u, Q, Fn, d);
      }
    }
    Z || (Z = new Ct());
    var St = Z.get(u);
    if (St)
      return St;
    if (Z.set(u, X), !rt)
      var lt = _ ? vo(u) : Gn(u);
    return We(lt || u, function(bt, dt) {
      lt && (dt = bt, bt = u[dt]), $i(X, dt, Fn(bt, d, _, N, dt, u, Z));
    }), X;
  }
  function co(u) {
    return pe(u) ? Ii(u) : {};
  }
  function uo(u, d, _) {
    var N = d(u);
    return zn(u) ? N : Fs(N, _(u));
  }
  function ho(u) {
    return Oe.call(u);
  }
  function fo(u) {
    if (!pe(u) || No(u))
      return !1;
    var d = Kn(u) || fs(u) ? Ws : Fe;
    return d.test(Et(u));
  }
  function po(u) {
    if (!ji(u))
      return Di(u);
    var d = [];
    for (var _ in Object(u))
      Ot.call(u, _) && _ != "constructor" && d.push(_);
    return d;
  }
  function Zs(u, d) {
    if (d)
      return u.slice();
    var _ = new u.constructor(u.length);
    return u.copy(_), _;
  }
  function Hn(u) {
    var d = new u.constructor(u.byteLength);
    return new Mn(d).set(new Mn(u)), d;
  }
  function vs(u, d) {
    var _ = d ? Hn(u.buffer) : u.buffer;
    return new u.constructor(_, u.byteOffset, u.byteLength);
  }
  function Bi(u, d, _) {
    var N = d ? _(Hs(u), !0) : Hs(u);
    return Ne(N, He, new u.constructor());
  }
  function Pi(u) {
    var d = new u.constructor(u.source, vt.exec(u));
    return d.lastIndex = u.lastIndex, d;
  }
  function go(u, d, _) {
    var N = d ? _(ps(u), !0) : ps(u);
    return Ne(N, at, new u.constructor());
  }
  function mo(u) {
    return Mi ? Object(Mi.call(u)) : {};
  }
  function bo(u, d) {
    var _ = d ? Hn(u.buffer) : u.buffer;
    return new u.constructor(_, u.byteOffset, u.length);
  }
  function yo(u, d) {
    var _ = -1, N = u.length;
    for (d || (d = Array(N)); ++_ < N; )
      d[_] = u[_];
    return d;
  }
  function Wn(u, d, _, N) {
    _ || (_ = {});
    for (var H = -1, j = d.length; ++H < j; ) {
      var Z = d[H], X = void 0;
      $i(_, Z, X === void 0 ? u[Z] : X);
    }
    return _;
  }
  function _o(u, d) {
    return Wn(u, xe(u), d);
  }
  function vo(u) {
    return uo(u, Gn, xe);
  }
  function Es(u, d) {
    var _ = u.__data__;
    return Ao(d) ? _[typeof d == "string" ? "string" : "hash"] : _.map;
  }
  function Qt(u, d) {
    var _ = ds(u, d);
    return fo(_) ? _ : void 0;
  }
  var xe = qn ? ze(qn, Object) : Co, Le = ho;
  (Ks && Le(new Ks(new ArrayBuffer(1))) != D || bs && Le(new bs()) != g || Zt && Le(Zt.resolve()) != E || Gs && Le(new Gs()) != T || $n && Le(new $n()) != L) && (Le = function(u) {
    var d = Oe.call(u), _ = d == v ? u.constructor : void 0, N = _ ? Et(_) : void 0;
    if (N)
      switch (N) {
        case Bn:
          return D;
        case _s:
          return g;
        case Pn:
          return E;
        case jn:
          return T;
        case Un:
          return L;
      }
    return d;
  });
  function Eo(u) {
    var d = u.length, _ = u.constructor(d);
    return d && typeof u[0] == "string" && Ot.call(u, "index") && (_.index = u.index, _.input = u.input), _;
  }
  function fe(u) {
    return typeof u.constructor == "function" && !ji(u) ? co($t(u)) : {};
  }
  function wo(u, d, _, N) {
    var H = u.constructor;
    switch (d) {
      case I:
        return Hn(u);
      case c:
      case a:
        return new H(+u);
      case D:
        return vs(u, N);
      case P:
      case F:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Mt:
      case qt:
        return bo(u, N);
      case g:
        return Bi(u, N, _);
      case m:
      case C:
        return new H(u);
      case w:
        return Pi(u);
      case T:
        return go(u, N, _);
      case x:
        return mo(u);
    }
  }
  function To(u, d) {
    return d = d ?? i, !!d && (typeof u == "number" || Yt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function Ao(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function No(u) {
    return !!gs && gs in u;
  }
  function ji(u) {
    var d = u && u.constructor, _ = typeof d == "function" && d.prototype || Nt;
    return u === _;
  }
  function Et(u) {
    if (u != null) {
      try {
        return ms.call(u);
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
    return Fn(u, !0, !0);
  }
  function Vi(u, d) {
    return u === d || u !== u && d !== d;
  }
  function Qs(u) {
    return Oo(u) && Ot.call(u, "callee") && (!Ri.call(u, "callee") || Oe.call(u) == r);
  }
  var zn = Array.isArray;
  function Js(u) {
    return u != null && Hi(u.length) && !Kn(u);
  }
  function Oo(u) {
    return Wi(u) && Js(u);
  }
  var Fi = zs || So;
  function Kn(u) {
    var d = pe(u) ? Oe.call(u) : "";
    return d == h || d == p;
  }
  function Hi(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
  }
  function pe(u) {
    var d = typeof u;
    return !!u && (d == "object" || d == "function");
  }
  function Wi(u) {
    return !!u && typeof u == "object";
  }
  function Gn(u) {
    return Js(u) ? Ys(u) : po(u);
  }
  function Co() {
    return [];
  }
  function So() {
    return !1;
  }
  s.exports = Ui;
})(wr, wr.exports);
var ed = wr.exports, Tr = { exports: {} };
Tr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, c = "[object Arguments]", a = "[object Array]", l = "[object AsyncFunction]", h = "[object Boolean]", p = "[object Date]", g = "[object Error]", m = "[object Function]", v = "[object GeneratorFunction]", E = "[object Map]", w = "[object Number]", T = "[object Null]", C = "[object Object]", x = "[object Promise]", L = "[object Proxy]", I = "[object RegExp]", D = "[object Set]", P = "[object String]", F = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Mt = "[object Float64Array]", qt = "[object Int8Array]", ut = "[object Int16Array]", vt = "[object Int32Array]", Fe = "[object Uint8Array]", Yt = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", us = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Xt = /^(?:0|[1-9]\d*)$/, z = {};
  z[it] = z[Mt] = z[qt] = z[ut] = z[vt] = z[Fe] = z[Yt] = z[Y] = z[us] = !0, z[c] = z[a] = z[nt] = z[h] = z[ot] = z[p] = z[g] = z[m] = z[E] = z[w] = z[C] = z[I] = z[D] = z[P] = z[tt] = !1;
  var ce = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, He = typeof self == "object" && self && self.Object === Object && self, at = ce || He || Function("return this")(), We = t && !t.nodeType && t, Fs = We && !0 && s && !s.nodeType && s, Ne = Fs && Fs.exports === We, hs = Ne && ce.process, ds = function() {
    try {
      return hs && hs.binding && hs.binding("util");
    } catch {
    }
  }(), fs = ds && ds.isTypedArray;
  function Hs(u, d) {
    for (var _ = -1, N = u == null ? 0 : u.length, H = 0, j = []; ++_ < N; ) {
      var Z = u[_];
      d(Z, _, u) && (j[H++] = Z);
    }
    return j;
  }
  function ze(u, d) {
    for (var _ = -1, N = d.length, H = u.length; ++_ < N; )
      u[H + _] = d[_];
    return u;
  }
  function ps(u, d) {
    for (var _ = -1, N = u == null ? 0 : u.length; ++_ < N; )
      if (d(u[_], _, u))
        return !0;
    return !1;
  }
  function Rn(u, d) {
    for (var _ = -1, N = Array(u); ++_ < u; )
      N[_] = d(_);
    return N;
  }
  function Dn(u) {
    return function(d) {
      return u(d);
    };
  }
  function Nt(u, d) {
    return u.has(d);
  }
  function ue(u, d) {
    return u == null ? void 0 : u[d];
  }
  function gs(u) {
    var d = -1, _ = Array(u.size);
    return u.forEach(function(N, H) {
      _[++d] = [H, N];
    }), _;
  }
  function ms(u, d) {
    return function(_) {
      return u(d(_));
    };
  }
  function Ot(u) {
    var d = -1, _ = Array(u.size);
    return u.forEach(function(N) {
      _[++d] = N;
    }), _;
  }
  var Oe = Array.prototype, Ws = Function.prototype, he = Object.prototype, Ce = at["__core-js_shared__"], Mn = Ws.toString, $t = he.hasOwnProperty, Ii = function() {
    var u = /[^.]+$/.exec(Ce && Ce.keys && Ce.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), Ri = he.toString, Hr = RegExp(
    "^" + Mn.call($t).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), qn = Ne ? at.Buffer : void 0, zs = at.Symbol, Di = at.Uint8Array, Ks = he.propertyIsEnumerable, bs = Oe.splice, Zt = zs ? zs.toStringTag : void 0, Gs = Object.getOwnPropertySymbols, $n = qn ? qn.isBuffer : void 0, ys = ms(Object.keys, Object), Bn = xe(at, "DataView"), _s = xe(at, "Map"), Pn = xe(at, "Promise"), jn = xe(at, "Set"), Un = xe(at, "WeakMap"), Ke = xe(Object, "create"), Mi = Et(Bn), Se = Et(_s), Wr = Et(Pn), zr = Et(jn), Kr = Et(Un), qi = zs ? zs.prototype : void 0, Vn = qi ? qi.valueOf : void 0;
  function ht(u) {
    var d = -1, _ = u == null ? 0 : u.length;
    for (this.clear(); ++d < _; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Gr() {
    this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
  }
  function Yr(u) {
    var d = this.has(u) && delete this.__data__[u];
    return this.size -= d ? 1 : 0, d;
  }
  function Xr(u) {
    var d = this.__data__;
    if (Ke) {
      var _ = d[u];
      return _ === n ? void 0 : _;
    }
    return $t.call(d, u) ? d[u] : void 0;
  }
  function Zr(u) {
    var d = this.__data__;
    return Ke ? d[u] !== void 0 : $t.call(d, u);
  }
  function Qr(u, d) {
    var _ = this.__data__;
    return this.size += this.has(u) ? 0 : 1, _[u] = Ke && d === void 0 ? n : d, this;
  }
  ht.prototype.clear = Gr, ht.prototype.delete = Yr, ht.prototype.get = Xr, ht.prototype.has = Zr, ht.prototype.set = Qr;
  function gt(u) {
    var d = -1, _ = u == null ? 0 : u.length;
    for (this.clear(); ++d < _; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Jr() {
    this.__data__ = [], this.size = 0;
  }
  function to(u) {
    var d = this.__data__, _ = Zs(d, u);
    if (_ < 0)
      return !1;
    var N = d.length - 1;
    return _ == N ? d.pop() : bs.call(d, _, 1), --this.size, !0;
  }
  function eo(u) {
    var d = this.__data__, _ = Zs(d, u);
    return _ < 0 ? void 0 : d[_][1];
  }
  function so(u) {
    return Zs(this.__data__, u) > -1;
  }
  function no(u, d) {
    var _ = this.__data__, N = Zs(_, u);
    return N < 0 ? (++this.size, _.push([u, d])) : _[N][1] = d, this;
  }
  gt.prototype.clear = Jr, gt.prototype.delete = to, gt.prototype.get = eo, gt.prototype.has = so, gt.prototype.set = no;
  function Ct(u) {
    var d = -1, _ = u == null ? 0 : u.length;
    for (this.clear(); ++d < _; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function io() {
    this.size = 0, this.__data__ = {
      hash: new ht(),
      map: new (_s || gt)(),
      string: new ht()
    };
  }
  function ro(u) {
    var d = Qt(this, u).delete(u);
    return this.size -= d ? 1 : 0, d;
  }
  function oo(u) {
    return Qt(this, u).get(u);
  }
  function ao(u) {
    return Qt(this, u).has(u);
  }
  function lo(u, d) {
    var _ = Qt(this, u), N = _.size;
    return _.set(u, d), this.size += _.size == N ? 0 : 1, this;
  }
  Ct.prototype.clear = io, Ct.prototype.delete = ro, Ct.prototype.get = oo, Ct.prototype.has = ao, Ct.prototype.set = lo;
  function Ys(u) {
    var d = -1, _ = u == null ? 0 : u.length;
    for (this.__data__ = new Ct(); ++d < _; )
      this.add(u[d]);
  }
  function $i(u) {
    return this.__data__.set(u, n), this;
  }
  function Xs(u) {
    return this.__data__.has(u);
  }
  Ys.prototype.add = Ys.prototype.push = $i, Ys.prototype.has = Xs;
  function de(u) {
    var d = this.__data__ = new gt(u);
    this.size = d.size;
  }
  function Fn() {
    this.__data__ = new gt(), this.size = 0;
  }
  function co(u) {
    var d = this.__data__, _ = d.delete(u);
    return this.size = d.size, _;
  }
  function uo(u) {
    return this.__data__.get(u);
  }
  function ho(u) {
    return this.__data__.has(u);
  }
  function fo(u, d) {
    var _ = this.__data__;
    if (_ instanceof gt) {
      var N = _.__data__;
      if (!_s || N.length < e - 1)
        return N.push([u, d]), this.size = ++_.size, this;
      _ = this.__data__ = new Ct(N);
    }
    return _.set(u, d), this.size = _.size, this;
  }
  de.prototype.clear = Fn, de.prototype.delete = co, de.prototype.get = uo, de.prototype.has = ho, de.prototype.set = fo;
  function po(u, d) {
    var _ = Qs(u), N = !_ && Vi(u), H = !_ && !N && Js(u), j = !_ && !N && !H && Wi(u), Z = _ || N || H || j, X = Z ? Rn(u.length, String) : [], rt = X.length;
    for (var Q in u)
      $t.call(u, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      H && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      wo(Q, rt))) && X.push(Q);
    return X;
  }
  function Zs(u, d) {
    for (var _ = u.length; _--; )
      if (Ui(u[_][0], d))
        return _;
    return -1;
  }
  function Hn(u, d, _) {
    var N = d(u);
    return Qs(u) ? N : ze(N, _(u));
  }
  function vs(u) {
    return u == null ? u === void 0 ? J : T : Zt && Zt in Object(u) ? Le(u) : ji(u);
  }
  function Bi(u) {
    return pe(u) && vs(u) == c;
  }
  function Pi(u, d, _, N, H) {
    return u === d ? !0 : u == null || d == null || !pe(u) && !pe(d) ? u !== u && d !== d : go(u, d, _, N, Pi, H);
  }
  function go(u, d, _, N, H, j) {
    var Z = Qs(u), X = Qs(d), rt = Z ? a : fe(u), Q = X ? a : fe(d);
    rt = rt == c ? C : rt, Q = Q == c ? C : Q;
    var mt = rt == C, St = Q == C, lt = rt == Q;
    if (lt && Js(u)) {
      if (!Js(d))
        return !1;
      Z = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new de()), Z || Wi(u) ? Wn(u, d, _, N, H, j) : _o(u, d, rt, _, N, H, j);
    if (!(_ & i)) {
      var bt = mt && $t.call(u, "__wrapped__"), dt = St && $t.call(d, "__wrapped__");
      if (bt || dt) {
        var Ge = bt ? u.value() : u, ke = dt ? d.value() : d;
        return j || (j = new de()), H(Ge, ke, _, N, j);
      }
    }
    return lt ? (j || (j = new de()), vo(u, d, _, N, H, j)) : !1;
  }
  function mo(u) {
    if (!Hi(u) || Ao(u))
      return !1;
    var d = Fi(u) ? Hr : pt;
    return d.test(Et(u));
  }
  function bo(u) {
    return pe(u) && Kn(u.length) && !!z[vs(u)];
  }
  function yo(u) {
    if (!No(u))
      return ys(u);
    var d = [];
    for (var _ in Object(u))
      $t.call(u, _) && _ != "constructor" && d.push(_);
    return d;
  }
  function Wn(u, d, _, N, H, j) {
    var Z = _ & i, X = u.length, rt = d.length;
    if (X != rt && !(Z && rt > X))
      return !1;
    var Q = j.get(u);
    if (Q && j.get(d))
      return Q == d;
    var mt = -1, St = !0, lt = _ & r ? new Ys() : void 0;
    for (j.set(u, d), j.set(d, u); ++mt < X; ) {
      var bt = u[mt], dt = d[mt];
      if (N)
        var Ge = Z ? N(dt, bt, mt, d, u, j) : N(bt, dt, mt, u, d, j);
      if (Ge !== void 0) {
        if (Ge)
          continue;
        St = !1;
        break;
      }
      if (lt) {
        if (!ps(d, function(ke, ws) {
          if (!Nt(lt, ws) && (bt === ke || H(bt, ke, _, N, j)))
            return lt.push(ws);
        })) {
          St = !1;
          break;
        }
      } else if (!(bt === dt || H(bt, dt, _, N, j))) {
        St = !1;
        break;
      }
    }
    return j.delete(u), j.delete(d), St;
  }
  function _o(u, d, _, N, H, j, Z) {
    switch (_) {
      case ot:
        if (u.byteLength != d.byteLength || u.byteOffset != d.byteOffset)
          return !1;
        u = u.buffer, d = d.buffer;
      case nt:
        return !(u.byteLength != d.byteLength || !j(new Di(u), new Di(d)));
      case h:
      case p:
      case w:
        return Ui(+u, +d);
      case g:
        return u.name == d.name && u.message == d.message;
      case I:
      case P:
        return u == d + "";
      case E:
        var X = gs;
      case D:
        var rt = N & i;
        if (X || (X = Ot), u.size != d.size && !rt)
          return !1;
        var Q = Z.get(u);
        if (Q)
          return Q == d;
        N |= r, Z.set(u, d);
        var mt = Wn(X(u), X(d), N, H, j, Z);
        return Z.delete(u), mt;
      case F:
        if (Vn)
          return Vn.call(u) == Vn.call(d);
    }
    return !1;
  }
  function vo(u, d, _, N, H, j) {
    var Z = _ & i, X = Es(u), rt = X.length, Q = Es(d), mt = Q.length;
    if (rt != mt && !Z)
      return !1;
    for (var St = rt; St--; ) {
      var lt = X[St];
      if (!(Z ? lt in d : $t.call(d, lt)))
        return !1;
    }
    var bt = j.get(u);
    if (bt && j.get(d))
      return bt == d;
    var dt = !0;
    j.set(u, d), j.set(d, u);
    for (var Ge = Z; ++St < rt; ) {
      lt = X[St];
      var ke = u[lt], ws = d[lt];
      if (N)
        var xl = Z ? N(ws, ke, lt, d, u, j) : N(ke, ws, lt, u, d, j);
      if (!(xl === void 0 ? ke === ws || H(ke, ws, _, N, j) : xl)) {
        dt = !1;
        break;
      }
      Ge || (Ge = lt == "constructor");
    }
    if (dt && !Ge) {
      var zi = u.constructor, Ki = d.constructor;
      zi != Ki && "constructor" in u && "constructor" in d && !(typeof zi == "function" && zi instanceof zi && typeof Ki == "function" && Ki instanceof Ki) && (dt = !1);
    }
    return j.delete(u), j.delete(d), dt;
  }
  function Es(u) {
    return Hn(u, Gn, Eo);
  }
  function Qt(u, d) {
    var _ = u.__data__;
    return To(d) ? _[typeof d == "string" ? "string" : "hash"] : _.map;
  }
  function xe(u, d) {
    var _ = ue(u, d);
    return mo(_) ? _ : void 0;
  }
  function Le(u) {
    var d = $t.call(u, Zt), _ = u[Zt];
    try {
      u[Zt] = void 0;
      var N = !0;
    } catch {
    }
    var H = Ri.call(u);
    return N && (d ? u[Zt] = _ : delete u[Zt]), H;
  }
  var Eo = Gs ? function(u) {
    return u == null ? [] : (u = Object(u), Hs(Gs(u), function(d) {
      return Ks.call(u, d);
    }));
  } : Co, fe = vs;
  (Bn && fe(new Bn(new ArrayBuffer(1))) != ot || _s && fe(new _s()) != E || Pn && fe(Pn.resolve()) != x || jn && fe(new jn()) != D || Un && fe(new Un()) != tt) && (fe = function(u) {
    var d = vs(u), _ = d == C ? u.constructor : void 0, N = _ ? Et(_) : "";
    if (N)
      switch (N) {
        case Mi:
          return ot;
        case Se:
          return E;
        case Wr:
          return x;
        case zr:
          return D;
        case Kr:
          return tt;
      }
    return d;
  });
  function wo(u, d) {
    return d = d ?? o, !!d && (typeof u == "number" || Xt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function To(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function Ao(u) {
    return !!Ii && Ii in u;
  }
  function No(u) {
    var d = u && u.constructor, _ = typeof d == "function" && d.prototype || he;
    return u === _;
  }
  function ji(u) {
    return Ri.call(u);
  }
  function Et(u) {
    if (u != null) {
      try {
        return Mn.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function Ui(u, d) {
    return u === d || u !== u && d !== d;
  }
  var Vi = Bi(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Bi : function(u) {
    return pe(u) && $t.call(u, "callee") && !Ks.call(u, "callee");
  }, Qs = Array.isArray;
  function zn(u) {
    return u != null && Kn(u.length) && !Fi(u);
  }
  var Js = $n || So;
  function Oo(u, d) {
    return Pi(u, d);
  }
  function Fi(u) {
    if (!Hi(u))
      return !1;
    var d = vs(u);
    return d == m || d == v || d == l || d == L;
  }
  function Kn(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
  }
  function Hi(u) {
    var d = typeof u;
    return u != null && (d == "object" || d == "function");
  }
  function pe(u) {
    return u != null && typeof u == "object";
  }
  var Wi = fs ? Dn(fs) : bo;
  function Gn(u) {
    return zn(u) ? po(u) : yo(u);
  }
  function Co() {
    return [];
  }
  function So() {
    return !1;
  }
  s.exports = Oo;
})(Tr, Tr.exports);
var sd = Tr.exports, bl = {};
Object.defineProperty(bl, "__esModule", { value: !0 });
const B0 = ed, P0 = sd;
var Na;
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
    const c = Object.keys(r).concat(Object.keys(o)).reduce((a, l) => (P0(r[l], o[l]) || (a[l] = o[l] === void 0 ? null : o[l]), a), {});
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
})(Na || (Na = {}));
bl.default = Na;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
var Oa;
(function(s) {
  function t(e) {
    return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
  }
  s.length = t;
})(Oa || (Oa = {}));
jr.default = Oa;
var yl = {};
Object.defineProperty(yl, "__esModule", { value: !0 });
const Hc = jr;
class j0 {
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
      const n = this.offset, i = Hc.default.length(e);
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
    return this.ops[this.index] ? Hc.default.length(this.ops[this.index]) - this.offset : 1 / 0;
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
yl.default = j0;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = $0, n = ed, i = sd, r = bl;
  t.AttributeMap = r.default;
  const o = jr;
  t.Op = o.default;
  const c = yl;
  t.OpIterator = c.default;
  const a = "\0", l = (p, g) => {
    if (typeof p != "object" || p === null)
      throw new Error(`cannot retain a ${typeof p}`);
    if (typeof g != "object" || g === null)
      throw new Error(`cannot retain a ${typeof g}`);
    const m = Object.keys(p)[0];
    if (!m || m !== Object.keys(g)[0])
      throw new Error(`embed types not matched: ${m} != ${Object.keys(g)[0]}`);
    return [m, p[m], g[m]];
  };
  class h {
    constructor(g) {
      Array.isArray(g) ? this.ops = g : g != null && Array.isArray(g.ops) ? this.ops = g.ops : this.ops = [];
    }
    static registerEmbed(g, m) {
      this.handlers[g] = m;
    }
    static unregisterEmbed(g) {
      delete this.handlers[g];
    }
    static getHandler(g) {
      const m = this.handlers[g];
      if (!m)
        throw new Error(`no handlers for embed type "${g}"`);
      return m;
    }
    insert(g, m) {
      const v = {};
      return typeof g == "string" && g.length === 0 ? this : (v.insert = g, m != null && typeof m == "object" && Object.keys(m).length > 0 && (v.attributes = m), this.push(v));
    }
    delete(g) {
      return g <= 0 ? this : this.push({ delete: g });
    }
    retain(g, m) {
      if (typeof g == "number" && g <= 0)
        return this;
      const v = { retain: g };
      return m != null && typeof m == "object" && Object.keys(m).length > 0 && (v.attributes = m), this.push(v);
    }
    push(g) {
      let m = this.ops.length, v = this.ops[m - 1];
      if (g = n(g), typeof v == "object") {
        if (typeof g.delete == "number" && typeof v.delete == "number")
          return this.ops[m - 1] = { delete: v.delete + g.delete }, this;
        if (typeof v.delete == "number" && g.insert != null && (m -= 1, v = this.ops[m - 1], typeof v != "object"))
          return this.ops.unshift(g), this;
        if (i(g.attributes, v.attributes)) {
          if (typeof g.insert == "string" && typeof v.insert == "string")
            return this.ops[m - 1] = { insert: v.insert + g.insert }, typeof g.attributes == "object" && (this.ops[m - 1].attributes = g.attributes), this;
          if (typeof g.retain == "number" && typeof v.retain == "number")
            return this.ops[m - 1] = { retain: v.retain + g.retain }, typeof g.attributes == "object" && (this.ops[m - 1].attributes = g.attributes), this;
        }
      }
      return m === this.ops.length ? this.ops.push(g) : this.ops.splice(m, 0, g), this;
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
      const m = [], v = [];
      return this.forEach((E) => {
        (g(E) ? m : v).push(E);
      }), [m, v];
    }
    reduce(g, m) {
      return this.ops.reduce(g, m);
    }
    changeLength() {
      return this.reduce((g, m) => m.insert ? g + o.default.length(m) : m.delete ? g - m.delete : g, 0);
    }
    length() {
      return this.reduce((g, m) => g + o.default.length(m), 0);
    }
    slice(g = 0, m = 1 / 0) {
      const v = [], E = new c.default(this.ops);
      let w = 0;
      for (; w < m && E.hasNext(); ) {
        let T;
        w < g ? T = E.next(g - w) : (T = E.next(m - w), v.push(T)), w += o.default.length(T);
      }
      return new h(v);
    }
    compose(g) {
      const m = new c.default(this.ops), v = new c.default(g.ops), E = [], w = v.peek();
      if (w != null && typeof w.retain == "number" && w.attributes == null) {
        let C = w.retain;
        for (; m.peekType() === "insert" && m.peekLength() <= C; )
          C -= m.peekLength(), E.push(m.next());
        w.retain - C > 0 && v.next(w.retain - C);
      }
      const T = new h(E);
      for (; m.hasNext() || v.hasNext(); )
        if (v.peekType() === "insert")
          T.push(v.next());
        else if (m.peekType() === "delete")
          T.push(m.next());
        else {
          const C = Math.min(m.peekLength(), v.peekLength()), x = m.next(C), L = v.next(C);
          if (L.retain) {
            const I = {};
            if (typeof x.retain == "number")
              I.retain = typeof L.retain == "number" ? C : L.retain;
            else if (typeof L.retain == "number")
              x.retain == null ? I.insert = x.insert : I.retain = x.retain;
            else {
              const P = x.retain == null ? "insert" : "retain", [F, J, tt] = l(x[P], L.retain), nt = h.getHandler(F);
              I[P] = {
                [F]: nt.compose(J, tt, P === "retain")
              };
            }
            const D = r.default.compose(x.attributes, L.attributes, typeof x.retain == "number");
            if (D && (I.attributes = D), T.push(I), !v.hasNext() && i(T.ops[T.ops.length - 1], I)) {
              const P = new h(m.rest());
              return T.concat(P).chop();
            }
          } else typeof L.delete == "number" && (typeof x.retain == "number" || typeof x.retain == "object" && x.retain !== null) && T.push(L);
        }
      return T.chop();
    }
    concat(g) {
      const m = new h(this.ops.slice());
      return g.ops.length > 0 && (m.push(g.ops[0]), m.ops = m.ops.concat(g.ops.slice(1))), m;
    }
    diff(g, m) {
      if (this.ops === g.ops)
        return new h();
      const v = [this, g].map((x) => x.map((L) => {
        if (L.insert != null)
          return typeof L.insert == "string" ? L.insert : a;
        const I = x === g ? "on" : "with";
        throw new Error("diff() called " + I + " non-document");
      }).join("")), E = new h(), w = e(v[0], v[1], m, !0), T = new c.default(this.ops), C = new c.default(g.ops);
      return w.forEach((x) => {
        let L = x[1].length;
        for (; L > 0; ) {
          let I = 0;
          switch (x[0]) {
            case e.INSERT:
              I = Math.min(C.peekLength(), L), E.push(C.next(I));
              break;
            case e.DELETE:
              I = Math.min(L, T.peekLength()), T.next(I), E.delete(I);
              break;
            case e.EQUAL:
              I = Math.min(T.peekLength(), C.peekLength(), L);
              const D = T.next(I), P = C.next(I);
              i(D.insert, P.insert) ? E.retain(I, r.default.diff(D.attributes, P.attributes)) : E.push(P).delete(I);
              break;
          }
          L -= I;
        }
      }), E.chop();
    }
    eachLine(g, m = `
`) {
      const v = new c.default(this.ops);
      let E = new h(), w = 0;
      for (; v.hasNext(); ) {
        if (v.peekType() !== "insert")
          return;
        const T = v.peek(), C = o.default.length(T) - v.peekLength(), x = typeof T.insert == "string" ? T.insert.indexOf(m, C) - C : -1;
        if (x < 0)
          E.push(v.next());
        else if (x > 0)
          E.push(v.next(x));
        else {
          if (g(E, v.next(1).attributes || {}, w) === !1)
            return;
          w += 1, E = new h();
        }
      }
      E.length() > 0 && g(E, {}, w);
    }
    invert(g) {
      const m = new h();
      return this.reduce((v, E) => {
        if (E.insert)
          m.delete(o.default.length(E));
        else {
          if (typeof E.retain == "number" && E.attributes == null)
            return m.retain(E.retain), v + E.retain;
          if (E.delete || typeof E.retain == "number") {
            const w = E.delete || E.retain;
            return g.slice(v, v + w).forEach((C) => {
              E.delete ? m.push(C) : E.retain && E.attributes && m.retain(o.default.length(C), r.default.invert(E.attributes, C.attributes));
            }), v + w;
          } else if (typeof E.retain == "object" && E.retain !== null) {
            const w = g.slice(v, v + 1), T = new c.default(w.ops).next(), [C, x, L] = l(E.retain, T.insert), I = h.getHandler(C);
            return m.retain({ [C]: I.invert(x, L) }, r.default.invert(E.attributes, T.attributes)), v + 1;
          }
        }
        return v;
      }, 0), m.chop();
    }
    transform(g, m = !1) {
      if (m = !!m, typeof g == "number")
        return this.transformPosition(g, m);
      const v = g, E = new c.default(this.ops), w = new c.default(v.ops), T = new h();
      for (; E.hasNext() || w.hasNext(); )
        if (E.peekType() === "insert" && (m || w.peekType() !== "insert"))
          T.retain(o.default.length(E.next()));
        else if (w.peekType() === "insert")
          T.push(w.next());
        else {
          const C = Math.min(E.peekLength(), w.peekLength()), x = E.next(C), L = w.next(C);
          if (x.delete)
            continue;
          if (L.delete)
            T.push(L);
          else {
            const I = x.retain, D = L.retain;
            let P = typeof D == "object" && D !== null ? D : C;
            if (typeof I == "object" && I !== null && typeof D == "object" && D !== null) {
              const F = Object.keys(I)[0];
              if (F === Object.keys(D)[0]) {
                const J = h.getHandler(F);
                J && (P = {
                  [F]: J.transform(I[F], D[F], m)
                });
              }
            }
            T.retain(P, r.default.transform(x.attributes, L.attributes, m));
          }
        }
      return T.chop();
    }
    transformPosition(g, m = !1) {
      m = !!m;
      const v = new c.default(this.ops);
      let E = 0;
      for (; v.hasNext() && E <= g; ) {
        const w = v.peekLength(), T = v.peekType();
        if (v.next(), T === "delete") {
          g -= Math.min(w, g - E);
          continue;
        } else T === "insert" && (E < g || !m) && (g += w);
        E += w;
      }
      return g;
    }
  }
  h.Op = o.default, h.OpIterator = c.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, s.exports = h, s.exports.default = h;
})(Aa, Aa.exports);
var Ht = Aa.exports;
const $ = /* @__PURE__ */ Xh(Ht);
class ae extends Dt {
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
ae.blotName = "break";
ae.tagName = "BR";
let ie = class extends Er {
};
function Ur(s) {
  return s.replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t]);
}
const ge = class ge extends fl {
  static compare(t, e) {
    const n = ge.order.indexOf(t), i = ge.order.indexOf(e);
    return n >= 0 || i >= 0 ? n - i : t === e ? 0 : t < e ? -1 : 1;
  }
  formatAt(t, e, n, i) {
    if (ge.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, B.BLOT)) {
      const r = this.isolate(t, e);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, e, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof ge && ge.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const e = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(e), e.wrap(this);
    }
  }
};
M(ge, "allowedChildren", [ge, ae, Dt, ie]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
M(ge, "order", [
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
let we = ge;
const Wc = 1;
class ft extends gi {
  constructor() {
    super(...arguments);
    M(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = nd(this)), this.cache.delta;
  }
  deleteAt(e, n) {
    super.deleteAt(e, n), this.cache = {};
  }
  formatAt(e, n, i, r) {
    n <= 0 || (this.scroll.query(i, B.BLOCK) ? e + n === this.length() && this.format(i, r) : super.formatAt(e, Math.min(n, this.length() - e - 1), i, r), this.cache = {});
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
    super.insertBefore(e, n), i instanceof ae && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Wc), this.cache.length;
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
    if (n && (e === 0 || e >= this.length() - Wc)) {
      const r = this.clone();
      return e === 0 ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r);
    }
    const i = super.split(e, n);
    return this.cache = {}, i;
  }
}
ft.blotName = "block";
ft.tagName = "P";
ft.defaultChild = ae;
ft.allowedChildren = [ae, we, Dt, ie];
class Ft extends Dt {
  attach() {
    super.attach(), this.attributes = new qr(this.domNode);
  }
  delta() {
    return new $().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, e) {
    const n = this.scroll.query(t, B.BLOCK_ATTRIBUTE);
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
Ft.scope = B.BLOCK_BLOT;
function nd(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return s.descendants(yt).reduce((e, n) => n.length() === 0 ? e : e.insert(n.value(), Ut(n, {}, t)), new $()).insert(`
`, Ut(s));
}
function Ut(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return s == null || ("formats" in s && typeof s.formats == "function" && (t = {
    ...t,
    ...s.formats()
  }, e && delete t["code-token"]), s.parent == null || s.parent.statics.blotName === "scroll" || s.parent.statics.scope !== s.statics.scope) ? t : Ut(s.parent, t, e);
}
const Pt = class Pt extends Dt {
  // Zero width no break space
  static value() {
  }
  constructor(t, e, n) {
    super(t, e), this.selection = n, this.textNode = document.createTextNode(Pt.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    for (; n != null && n.statics.scope !== B.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = Pt.CONTENTS.length, n.optimize(), n.formatAt(i, Pt.CONTENTS.length, t, e), this.savedLength = 0);
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
    const e = this.prev instanceof ie ? this.prev : null, n = e ? e.length() : 0, i = this.next instanceof ie ? this.next : null, r = i ? i.text : "", {
      textNode: o
    } = this, c = o.data.split(Pt.CONTENTS).join("");
    o.data = Pt.CONTENTS;
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
      const l = (g, m) => e && g === e.domNode ? m : g === o ? n + m - 1 : i && g === i.domNode ? n + c.length + m : null, h = l(t.start.node, t.start.offset), p = l(t.end.node, t.end.offset);
      if (h !== null && p !== null)
        return {
          startNode: a.domNode,
          startOffset: h,
          endNode: a.domNode,
          endOffset: p
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
        this.savedLength = Pt.CONTENTS.length, e.isolate(this.offset(e), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      e = e.parent;
    }
  }
  value() {
    return "";
  }
};
M(Pt, "blotName", "cursor"), M(Pt, "className", "ql-cursor"), M(Pt, "tagName", "span"), M(Pt, "CONTENTS", "\uFEFF");
let Nn = Pt;
var id = { exports: {} };
(function(s) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
  function i(a, l, h) {
    this.fn = a, this.context = l, this.once = h || !1;
  }
  function r(a, l, h, p, g) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var m = new i(h, p || a, g), v = e ? e + l : l;
    return a._events[v] ? a._events[v].fn ? a._events[v] = [a._events[v], m] : a._events[v].push(m) : (a._events[v] = m, a._eventsCount++), a;
  }
  function o(a, l) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[l];
  }
  function c() {
    this._events = new n(), this._eventsCount = 0;
  }
  c.prototype.eventNames = function() {
    var l = [], h, p;
    if (this._eventsCount === 0) return l;
    for (p in h = this._events)
      t.call(h, p) && l.push(e ? p.slice(1) : p);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(h)) : l;
  }, c.prototype.listeners = function(l) {
    var h = e ? e + l : l, p = this._events[h];
    if (!p) return [];
    if (p.fn) return [p.fn];
    for (var g = 0, m = p.length, v = new Array(m); g < m; g++)
      v[g] = p[g].fn;
    return v;
  }, c.prototype.listenerCount = function(l) {
    var h = e ? e + l : l, p = this._events[h];
    return p ? p.fn ? 1 : p.length : 0;
  }, c.prototype.emit = function(l, h, p, g, m, v) {
    var E = e ? e + l : l;
    if (!this._events[E]) return !1;
    var w = this._events[E], T = arguments.length, C, x;
    if (w.fn) {
      switch (w.once && this.removeListener(l, w.fn, void 0, !0), T) {
        case 1:
          return w.fn.call(w.context), !0;
        case 2:
          return w.fn.call(w.context, h), !0;
        case 3:
          return w.fn.call(w.context, h, p), !0;
        case 4:
          return w.fn.call(w.context, h, p, g), !0;
        case 5:
          return w.fn.call(w.context, h, p, g, m), !0;
        case 6:
          return w.fn.call(w.context, h, p, g, m, v), !0;
      }
      for (x = 1, C = new Array(T - 1); x < T; x++)
        C[x - 1] = arguments[x];
      w.fn.apply(w.context, C);
    } else {
      var L = w.length, I;
      for (x = 0; x < L; x++)
        switch (w[x].once && this.removeListener(l, w[x].fn, void 0, !0), T) {
          case 1:
            w[x].fn.call(w[x].context);
            break;
          case 2:
            w[x].fn.call(w[x].context, h);
            break;
          case 3:
            w[x].fn.call(w[x].context, h, p);
            break;
          case 4:
            w[x].fn.call(w[x].context, h, p, g);
            break;
          default:
            if (!C) for (I = 1, C = new Array(T - 1); I < T; I++)
              C[I - 1] = arguments[I];
            w[x].fn.apply(w[x].context, C);
        }
    }
    return !0;
  }, c.prototype.on = function(l, h, p) {
    return r(this, l, h, p, !1);
  }, c.prototype.once = function(l, h, p) {
    return r(this, l, h, p, !0);
  }, c.prototype.removeListener = function(l, h, p, g) {
    var m = e ? e + l : l;
    if (!this._events[m]) return this;
    if (!h)
      return o(this, m), this;
    var v = this._events[m];
    if (v.fn)
      v.fn === h && (!g || v.once) && (!p || v.context === p) && o(this, m);
    else {
      for (var E = 0, w = [], T = v.length; E < T; E++)
        (v[E].fn !== h || g && !v[E].once || p && v[E].context !== p) && w.push(v[E]);
      w.length ? this._events[m] = w.length === 1 ? w[0] : w : o(this, m);
    }
    return this;
  }, c.prototype.removeAllListeners = function(l) {
    var h;
    return l ? (h = e ? e + l : l, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = e, c.EventEmitter = c, s.exports = c;
})(id);
var U0 = id.exports;
const V0 = /* @__PURE__ */ Xh(U0), Ca = /* @__PURE__ */ new WeakMap(), Sa = ["error", "warn", "log", "info"];
let xa = "warn";
function rd(s) {
  if (xa && Sa.indexOf(s) <= Sa.indexOf(xa)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      e[n - 1] = arguments[n];
    console[s](...e);
  }
}
function Ve(s) {
  return Sa.reduce((t, e) => (t[e] = rd.bind(console, e, s), t), {});
}
Ve.level = (s) => {
  xa = s;
};
rd.level = Ve.level;
const Yo = Ve("quill:events"), F0 = ["selectionchange", "mousedown", "mouseup", "click"];
F0.forEach((s) => {
  document.addEventListener(s, function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = Ca.get(i);
      r && r.emitter && r.emitter.handleDOM(...e);
    });
  });
});
class q extends V0 {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Yo.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return Yo.log.call(Yo, ...e), super.emit(...e);
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
const Xo = Ve("quill:selection");
class Ds {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class H0 {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Ds(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
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
    if (!(n == null || !n.native.collapsed || this.scroll.query(t, B.BLOCK))) {
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
        const [p] = this.scroll.line(t), [g] = this.scroll.line(t + 1);
        p === g && (r = h, o = 0);
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
    return Xo.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const e = this.getNativeRange();
    return e == null ? [null, null] : [this.normalizedToRange(e), e];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && Zo(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const e = [[t.start.node, t.start.offset]];
    t.native.collapsed || e.push([t.end.node, t.end.offset]);
    const n = e.map((o) => {
      const [c, a] = o, l = this.scroll.find(c, !0), h = l.offset(this.scroll);
      return a === 0 ? h : l instanceof yt ? h + l.index(c, a) : h + l.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Ds(r, i - r);
  }
  normalizeNative(t) {
    if (!Zo(this.root, t.startContainer) || !t.collapsed && !Zo(this.root, t.endContainer))
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
    if (Xo.info("setNativeRange", t, e, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
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
    if (typeof e == "string" && (n = e, e = !1), Xo.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, e);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : q.sources.USER;
    const e = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !dl(e, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [q.events.SELECTION_CHANGE, pn(this.lastRange), pn(e), t];
      this.emitter.emit(q.events.EDITOR_CHANGE, ...r), t !== q.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function Zo(s, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return s.contains(t);
}
const W0 = /^[ -~]*$/;
class z0 {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const n = zc(t), i = new $();
    return G0(n.ops.slice()).reduce((o, c) => {
      const a = Ht.Op.length(c);
      let l = c.attributes || {}, h = !1, p = !1;
      if (c.insert != null) {
        if (i.retain(a), typeof c.insert == "string") {
          const v = c.insert;
          p = !v.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ft, o)[0]), this.scroll.insertAt(o, v);
          const [E, w] = this.scroll.line(o);
          let T = ts({}, Ut(E));
          if (E instanceof ft) {
            const [C] = E.descendant(yt, w);
            C && (T = ts(T, Ut(C)));
          }
          l = Ht.AttributeMap.diff(T, l) || {};
        } else if (typeof c.insert == "object") {
          const v = Object.keys(c.insert)[0];
          if (v == null) return o;
          const E = this.scroll.query(v, B.INLINE) != null;
          if (E)
            (e <= o || this.scroll.descendant(Ft, o)[0]) && (p = !0);
          else if (o > 0) {
            const [w, T] = this.scroll.descendant(yt, o - 1);
            w instanceof ie ? w.value()[T] !== `
` && (h = !0) : w instanceof Dt && w.statics.scope === B.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, v, c.insert[v]), E) {
            const [w] = this.scroll.descendant(yt, o);
            if (w) {
              const T = ts({}, Ut(w));
              l = Ht.AttributeMap.diff(T, l) || {};
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
      const g = h ? 1 : 0, m = p ? 1 : 0;
      return e += g + m, i.retain(g), i.delete(m), o + a + g + m;
    }, 0), i.reduce((o, c) => typeof c.delete == "number" ? (this.scroll.deleteAt(o, c.delete), o) : o + Ht.Op.length(c), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(t, e) {
    return this.scroll.deleteAt(t, e), this.update(new $().retain(t).delete(e));
  }
  formatLine(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(e, 1)).forEach((o) => {
        o.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new $().retain(t).retain(e, pn(n));
    return this.update(i);
  }
  formatText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, e, r, n[r]);
    });
    const i = new $().retain(t).retain(e, pn(n));
    return this.update(i);
  }
  getContents(t, e) {
    return this.delta.slice(t, t + e);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new $());
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
      let l = Ut(a);
      for (; Object.keys(l).length > 0; ) {
        const h = c.shift();
        if (h == null) return l;
        l = K0(Ut(h), l);
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
      return n.length() >= i + e && !(i === 0 && e === r) ? bi(n, i, e, !0) : bi(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, e) {
    const n = zc(e), i = new $().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, e, n) {
    return this.scroll.insertAt(t, e, n), this.update(new $().retain(t).insert({
      [e]: n
    }));
  }
  insertText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return e = e.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, e), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, e.length, i, n[i]);
    }), this.update(new $().retain(t).insert(e, pn(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if ((t == null ? void 0 : t.statics.blotName) !== ft.blotName) return !1;
    const e = t;
    return e.children.length > 1 ? !1 : e.children.head instanceof ae;
  }
  removeFormat(t, e) {
    const n = this.getText(t, e), [i, r] = this.scroll.line(t + e);
    let o = 0, c = new $();
    i != null && (o = i.length() - r, c = i.delta().slice(r, r + o - 1).insert(`
`));
    const l = this.getContents(t, e + o).diff(new $().insert(n).concat(c)), h = new $().retain(t).concat(l);
    return this.applyDelta(h);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(W0) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = Ut(r), c = r.offset(this.scroll), a = e[0].oldValue.replace(Nn.CONTENTS, ""), l = new $().insert(a), h = new $().insert(r.value()), p = n && {
        oldRange: Kc(n.oldRange, -c),
        newRange: Kc(n.newRange, -c)
      };
      t = new $().retain(c).concat(l.diff(h, p)).reduce((m, v) => v.insert ? m.insert(v.insert, o) : m.push(v), new $()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !dl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function un(s, t, e) {
  if (s.length === 0) {
    const [m] = Qo(e.pop());
    return t <= 0 ? `</li></${m}>` : `</li></${m}>${un([], t - 1, e)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: c
  }, ...a] = s, [l, h] = Qo(c);
  if (o > t)
    return e.push(c), o === t + 1 ? `<${l}><li${h}>${bi(n, i, r)}${un(a, o, e)}` : `<${l}><li>${un(s, t + 1, e)}`;
  const p = e[e.length - 1];
  if (o === t && c === p)
    return `</li><li${h}>${bi(n, i, r)}${un(a, o, e)}`;
  const [g] = Qo(e.pop());
  return `</li></${g}>${un(s, t - 1, e)}`;
}
function bi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof ie)
    return Ur(s.value().slice(t, t + e));
  if (s instanceof ne) {
    if (s.statics.blotName === "list-container") {
      const l = [];
      return s.children.forEachAt(t, e, (h, p, g) => {
        const m = "formats" in h && typeof h.formats == "function" ? h.formats() : {};
        l.push({
          child: h,
          offset: p,
          length: g,
          indent: m.indent || 0,
          type: m.list
        });
      }), un(l, -1, []);
    }
    const i = [];
    if (s.children.forEachAt(t, e, (l, h, p) => {
      i.push(bi(l, h, p));
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
function K0(s, t) {
  return Object.keys(t).reduce((e, n) => {
    if (s[n] == null) return e;
    const i = t[n];
    return i === s[n] ? e[n] = i : Array.isArray(i) ? i.indexOf(s[n]) < 0 ? e[n] = i.concat([s[n]]) : e[n] = i : e[n] = [i, s[n]], e;
  }, {});
}
function Qo(s) {
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
function zc(s) {
  return s.reduce((t, e) => {
    if (typeof e.insert == "string") {
      const n = e.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, e.attributes);
    }
    return t.push(e);
  }, new $());
}
function Kc(s, t) {
  let {
    index: e,
    length: n
  } = s;
  return new Ds(e + t, n);
}
function G0(s) {
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
class le {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = e;
  }
}
M(le, "DEFAULTS", {});
const sr = "\uFEFF";
class _l extends Dt {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(sr), this.rightGuard = document.createTextNode(sr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, n;
    const i = t.data.split(sr).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof ie) {
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
    else t === this.rightGuard && (this.next instanceof ie ? (this.next.insertAt(0, i), e = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), e = {
      startNode: n,
      startOffset: i.length
    }));
    return t.data = sr, e;
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
class Y0 {
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
    e && !(e instanceof _l) && (this.emitter.emit(q.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(q.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(q.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(q.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const li = class li {
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
M(li, "DEFAULTS", {
  modules: {}
}), M(li, "themes", {
  default: li
});
let On = li;
const X0 = (s) => s.parentElement || s.getRootNode().host || null, Z0 = (s) => {
  const t = s.getBoundingClientRect(), e = "offsetWidth" in s && Math.abs(t.width) / s.offsetWidth || 1, n = "offsetHeight" in s && Math.abs(t.height) / s.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + s.clientWidth * e,
    bottom: t.top + s.clientHeight * n,
    left: t.left
  };
}, nr = (s) => {
  const t = parseInt(s, 10);
  return Number.isNaN(t) ? 0 : t;
}, Gc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, Q0 = (s, t) => {
  var r, o, c;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, l = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : Z0(i), h = getComputedStyle(i), p = Gc(n.left, n.right, l.left, l.right, nr(h.scrollPaddingLeft), nr(h.scrollPaddingRight)), g = Gc(n.top, n.bottom, l.top, l.bottom, nr(h.scrollPaddingTop), nr(h.scrollPaddingBottom));
    if (p || g)
      if (a)
        (c = e.defaultView) == null || c.scrollBy(p, g);
      else {
        const {
          scrollLeft: m,
          scrollTop: v
        } = i;
        g && (i.scrollTop += g), p && (i.scrollLeft += p);
        const E = i.scrollLeft - m, w = i.scrollTop - v;
        n = {
          left: n.left - E,
          top: n.top - w,
          right: n.right - E,
          bottom: n.bottom - w
        };
      }
    i = a || h.position === "fixed" ? null : X0(i);
  }
}, J0 = 100, tE = ["block", "break", "cursor", "inline", "scroll", "text"], eE = (s, t, e) => {
  const n = new An();
  return tE.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), s.forEach((i) => {
    let r = t.query(i);
    r || e.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > J0) {
        e.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, mn = Ve("quill"), ir = new An();
ne.uiClass = "ql-ui";
const te = class te {
  static debug(t) {
    t === !0 && (t = "log"), Ve.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ca.get(t) || ir.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && mn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, e) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && mn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && ir.register(e), typeof e.register == "function" && e.register(ir);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = sE(t, e), this.container = this.options.container, this.container == null) {
      mn.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && te.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ca.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new q();
    const i = pl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new z0(this.scroll), this.selection = new H0(this.scroll, this.emitter), this.composition = new Y0(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(q.events.EDITOR_CHANGE, (o) => {
      o === q.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(q.events.SCROLL_UPDATE, (o, c) => {
      const a = this.selection.lastRange, [l] = this.selection.getRange(), h = a && l ? {
        oldRange: a,
        newRange: l
      } : void 0;
      Jt.call(this, () => this.editor.update(null, c, h), o);
    }), this.emitter.on(q.events.SCROLL_EMBED_UPDATE, (o, c) => {
      const a = this.selection.lastRange, [l] = this.selection.getRange(), h = a && l ? {
        oldRange: a,
        newRange: l
      } : void 0;
      Jt.call(this, () => {
        const p = new $().retain(o.offset(this)).retain({
          [o.statics.blotName]: c
        });
        return this.editor.update(p, [], h);
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
    return [t, e, , n] = Ie(t, e, n), Jt.call(this, () => this.editor.deleteText(t, e), n, t, -1 * e);
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
    return Jt.call(this, () => {
      const i = this.getSelection(!0);
      let r = new $();
      if (i == null) return r;
      if (this.scroll.query(t, B.BLOCK))
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
    return [t, e, o, r] = Ie(
      t,
      e,
      // @ts-expect-error
      n,
      i,
      r
    ), Jt.call(this, () => this.editor.formatLine(t, e, o), r, t, 0);
  }
  formatText(t, e, n, i, r) {
    let o;
    return [t, e, o, r] = Ie(
      // @ts-expect-error
      t,
      e,
      n,
      i,
      r
    ), Jt.call(this, () => this.editor.formatText(t, e, o), r, t, 0);
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
    return [t, e] = Ie(t, e), this.editor.getContents(t, e);
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
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = Ie(t, e), this.editor.getHTML(t, e);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = Ie(t, e), this.editor.getText(t, e);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, e, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : te.sources.API;
    return Jt.call(this, () => this.editor.insertEmbed(t, e, n), i, t);
  }
  insertText(t, e, n, i, r) {
    let o;
    return [t, , o, r] = Ie(t, 0, n, i, r), Jt.call(this, () => this.editor.insertText(t, e, o), r, t, e.length);
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
    return [t, e, , n] = Ie(t, e, n), Jt.call(this, () => this.editor.removeFormat(t, e), n, t);
  }
  scrollRectIntoView(t) {
    Q0(this.root, t);
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
    return Jt.call(this, () => {
      t = new $(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, e);
  }
  setSelection(t, e, n) {
    t == null ? this.selection.setRange(null, e || te.sources.API) : ([t, e, , n] = Ie(t, e, n), this.selection.setRange(new Ds(Math.max(0, t), e), n), n !== q.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : q.sources.API;
    const n = new $().insert(t);
    return this.setContents(n, e);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : q.sources.USER;
    const e = this.scroll.update(t);
    return this.selection.update(t), e;
  }
  updateContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : q.sources.API;
    return Jt.call(this, () => (t = new $(t), this.editor.applyDelta(t)), e, !0);
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
  registry: ir,
  theme: "default"
}), M(te, "events", q.events), M(te, "sources", q.sources), M(te, "version", "2.0.2"), M(te, "imports", {
  delta: $,
  parchment: C0,
  "core/module": le,
  "core/theme": On
});
let S = te;
function Yc(s) {
  return typeof s == "string" ? document.querySelector(s) : s;
}
function Jo(s) {
  return Object.entries(s ?? {}).reduce((t, e) => {
    let [n, i] = e;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Xc(s) {
  return Object.fromEntries(Object.entries(s).filter((t) => t[1] !== void 0));
}
function sE(s, t) {
  const e = Yc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === S.DEFAULTS.theme ? On : S.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = S.DEFAULTS, {
    modules: c,
    ...a
  } = i.DEFAULTS;
  let l = Jo(t.modules);
  l != null && l.toolbar && l.toolbar.constructor !== Object && (l = {
    ...l,
    toolbar: {
      container: l.toolbar
    }
  });
  const h = ts({}, Jo(r), Jo(c), l), p = {
    ...o,
    ...Xc(a),
    ...Xc(t)
  };
  let g = t.registry;
  return g ? t.formats && mn.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? eE(t.formats, p.registry, mn) : p.registry, {
    ...p,
    registry: g,
    container: e,
    theme: i,
    modules: Object.entries(h).reduce((m, v) => {
      let [E, w] = v;
      if (!w) return m;
      const T = S.import(`modules/${E}`);
      return T == null ? (mn.error(`Cannot load ${E} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [E]: ts({}, T.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Yc(p.bounds)
  };
}
function Jt(s, t, e, n) {
  if (!this.isEnabled() && t === q.sources.USER && !this.allowReadOnlyEdits)
    return new $();
  let i = e == null ? null : this.getSelection();
  const r = this.editor.delta, o = s();
  if (i != null && (e === !0 && (e = i.index), n == null ? i = Zc(i, o, t) : n !== 0 && (i = Zc(i, e, n, t)), this.setSelection(i, q.sources.SILENT)), o.length() > 0) {
    const c = [q.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(q.events.EDITOR_CHANGE, ...c), t !== q.sources.SILENT && this.emitter.emit(...c);
  }
  return o;
}
function Ie(s, t, e, n, i) {
  let r = {};
  return typeof s.index == "number" && typeof s.length == "number" ? typeof t != "number" ? (i = n, n = e, e = t, t = s.length, s = s.index) : (t = s.length, s = s.index) : typeof t != "number" && (i = n, n = e, e = t, t = 0), typeof e == "object" ? (r = e, i = n) : typeof e == "string" && (n != null ? r[e] = n : i = e), i = i || q.sources.API, [s, t, r, i];
}
function Zc(s, t, e, n) {
  const i = typeof e == "number" ? e : 0;
  if (s == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [s.index, s.index + s.length].map((c) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(c, n !== q.sources.USER)
  )) : [r, o] = [s.index, s.index + s.length].map((c) => c < t || c === t && n === q.sources.USER ? c : i >= 0 ? c + i : Math.max(t, c + i)), new Ds(r, o - r);
}
class js extends $r {
}
function Qc(s) {
  return s instanceof ft || s instanceof Ft;
}
function Jc(s) {
  return typeof s.updateContent == "function";
}
class hn extends pl {
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
      if (n instanceof Ft || r instanceof Ft) {
        this.optimize();
        return;
      }
      const o = r.children.head instanceof ae ? null : r.children.head;
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
      if (n == null || this.scroll.query(e, B.BLOCK) == null) {
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
    if (t.statics.scope === B.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(t), super.insertBefore(n, e);
    } else
      super.insertBefore(t, e);
  }
  insertContents(t, e) {
    const n = this.deltaToRenderBlocks(e.concat(new $().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ft, t)[0] && t < this.length()), l = r.type === "block" ? r.delta : new $().insert({
        [r.key]: r.value
      });
      ta(this, t, l);
      const h = r.type === "block" ? 1 : 0, p = t + l.length() + h;
      a && this.insertAt(p - 1, `
`);
      const g = Ut(this.line(t)[0]), m = Ht.AttributeMap.diff(g, r.attributes) || {};
      Object.keys(m).forEach((v) => {
        this.formatAt(p - 1, 1, v, m[v]);
      }), t = p;
    }
    let [o, c] = this.children.find(t);
    if (n.length && (o && (o = o.split(c), c = 0), n.forEach((a) => {
      if (a.type === "block") {
        const l = this.createBlock(a.attributes, o || void 0);
        ta(l, 0, a.delta);
      } else {
        const l = this.create(a.key, a.value);
        this.insertBefore(l, o || void 0), Object.keys(a.attributes).forEach((h) => {
          l.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + c : this.length();
      ta(this, a, i.delta);
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
    return t === this.length() ? this.line(t - 1) : this.descendant(Qc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let c = [], a = o;
      return i.children.forEachAt(r, o, (l, h, p) => {
        Qc(l) ? c.push(l) : l instanceof $r && (c = c.concat(n(l, h, a))), a -= p;
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
      return r && !Jc(r);
    }), t.length > 0 && this.emitter.emit(q.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(q.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, n) {
    const [i] = this.descendant((r) => r instanceof Ft, t);
    i && i.statics.blotName === e && Jc(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const e = [];
    let n = new $();
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
            }), n = new $();
          });
          const c = o[o.length - 1];
          c && n.insert(c, i.attributes);
        } else {
          const o = Object.keys(r)[0];
          if (!o) return;
          this.query(o, B.INLINE) ? n.push(i) : (n.length() && e.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new $(), e.push({
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
      this.query(a, B.BLOCK & B.BLOT) != null ? n = a : i[a] = l;
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
M(hn, "blotName", "scroll"), M(hn, "className", "ql-editor"), M(hn, "tagName", "DIV"), M(hn, "defaultChild", ft), M(hn, "allowedChildren", [ft, Ft, js]);
function ta(s, t, e) {
  e.reduce((n, i) => {
    const r = Ht.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const c = i.insert;
        s.insertAt(n, c);
        const [a] = s.descendant(yt, n), l = Ut(a);
        o = Ht.AttributeMap.diff(l, o) || {};
      } else if (typeof i.insert == "object") {
        const c = Object.keys(i.insert)[0];
        if (c == null) return n;
        if (s.insertAt(n, c, i.insert[c]), s.scroll.query(c, B.INLINE) != null) {
          const [l] = s.descendant(yt, n), h = Ut(l);
          o = Ht.AttributeMap.diff(h, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((c) => {
      s.formatAt(n, r, c, o[c]);
    }), n + r;
  }, t);
}
const vl = {
  scope: B.BLOCK,
  whitelist: ["right", "center", "justify"]
}, nE = new Ee("align", "align", vl), od = new oe("align", "ql-align", vl), ad = new cs("align", "text-align", vl);
class ld extends cs {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const iE = new oe("color", "ql-color", {
  scope: B.INLINE
}), El = new ld("color", "color", {
  scope: B.INLINE
}), rE = new oe("background", "ql-bg", {
  scope: B.INLINE
}), wl = new ld("background", "background-color", {
  scope: B.INLINE
});
class Us extends js {
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
${Ur(this.code(t, e))}
</pre>`;
  }
}
class _t extends ft {
  static register() {
    S.register(Us);
  }
}
M(_t, "TAB", "  ");
class Tl extends we {
}
Tl.blotName = "code";
Tl.tagName = "CODE";
_t.blotName = "code-block";
_t.className = "ql-code-block";
_t.tagName = "DIV";
Us.blotName = "code-block-container";
Us.className = "ql-code-block-container";
Us.tagName = "DIV";
Us.allowedChildren = [_t];
_t.allowedChildren = [ie, ae, Nn];
_t.requiredContainer = Us;
const Al = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, cd = new Ee("direction", "dir", Al), ud = new oe("direction", "ql-direction", Al), hd = new cs("direction", "direction", Al), dd = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, fd = new oe("font", "ql-font", dd);
class oE extends cs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const pd = new oE("font", "font-family", dd), gd = new oe("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), md = new cs("size", "font-size", {
  scope: B.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), aE = Ve("quill:keyboard"), lE = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Vr extends le {
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
    const i = uE(t);
    if (i == null) {
      aE.warn("Attempted to add invalid keyboard binding", i);
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((T) => Vr.match(t, T));
      if (i.length === 0) return;
      const r = S.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [c, a] = this.quill.getLine(o.index), [l, h] = this.quill.getLeaf(o.index), [p, g] = o.length === 0 ? [l, h] : this.quill.getLeaf(o.index + o.length), m = l instanceof Er ? l.value().slice(0, h) : "", v = p instanceof Er ? p.value().slice(g) : "", E = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && c.length() <= 1,
        format: this.quill.getFormat(o),
        line: c,
        offset: a,
        prefix: m,
        suffix: v,
        event: t
      };
      i.some((T) => {
        if (T.collapsed != null && T.collapsed !== E.collapsed || T.empty != null && T.empty !== E.empty || T.offset != null && T.offset !== E.offset)
          return !1;
        if (Array.isArray(T.format)) {
          if (T.format.every((C) => E.format[C] == null))
            return !1;
        } else if (typeof T.format == "object" && !Object.keys(T.format).every((C) => T.format[C] === !0 ? E.format[C] != null : T.format[C] === !1 ? E.format[C] == null : dl(T.format[C], E.format[C])))
          return !1;
        return T.prefix != null && !T.prefix.test(E.prefix) || T.suffix != null && !T.suffix.test(E.suffix) ? !1 : T.handler.call(this, o, E, T) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, e) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new $().retain(t.index - n).delete(n);
    if (e.offset === 0) {
      const [c] = this.quill.getLine(t.index - 1);
      if (c && !(c.statics.blotName === "block" && c.length() <= 1)) {
        const l = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = Ht.AttributeMap.diff(l, h) || {}, Object.keys(i).length > 0) {
          const p = new $().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(p);
        }
      }
    }
    this.quill.updateContents(o, S.sources.USER), this.quill.focus();
  }
  handleDelete(t, e) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new $().retain(t.index).delete(n);
    if (e.offset >= r.length() - 1) {
      const [c] = this.quill.getLine(t.index + 1);
      if (c) {
        const a = r.formats(), l = this.quill.getFormat(t.index, 1);
        i = Ht.AttributeMap.diff(a, l) || {}, Object.keys(i).length > 0 && (o = o.retain(c.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, S.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Nl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, e) {
    const n = Object.keys(e.format).reduce((r, o) => (this.quill.scroll.query(o, B.BLOCK) && !Array.isArray(e.format[o]) && (r[o] = e.format[o]), r), {}), i = new $().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, S.sources.USER), this.quill.setSelection(t.index + 1, S.sources.SILENT), this.quill.focus();
  }
}
const cE = {
  bindings: {
    bold: ea("bold"),
    italic: ea("italic"),
    underline: ea("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(s, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", S.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(s, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", S.sources.USER), !1);
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
        t.format.indent != null ? this.quill.format("indent", "-1", S.sources.USER) : t.format.list != null && this.quill.format("list", !1, S.sources.USER);
      }
    },
    "indent code-block": tu(!0),
    "outdent code-block": tu(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(s) {
        this.quill.deleteText(s.index - 1, 1, S.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(s, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const e = new $().retain(s.index).delete(s.length).insert("	");
        return this.quill.updateContents(e, S.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index + 1, S.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, S.sources.USER);
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
        t.format.indent && (e.indent = !1), this.quill.formatLine(s.index, s.length, e, S.sources.USER);
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
        }, i = new $().retain(s.index).insert(`
`, n).retain(t.length() - e - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, S.sources.USER), this.quill.setSelection(s.index + 1, S.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(s, t) {
        const [e, n] = this.quill.getLine(s.index), i = new $().retain(s.index).insert(`
`, t.format).retain(e.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, S.sources.USER), this.quill.setSelection(s.index + 1, S.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [e, n, i, r] = t.getTable(s), o = hE(e, n, i, r);
          if (o == null) return;
          let c = e.offset();
          if (o < 0) {
            const a = new $().retain(c).insert(`
`);
            this.quill.updateContents(a, S.sources.USER), this.quill.setSelection(s.index + 1, s.length, S.sources.SILENT);
          } else if (o > 0) {
            c += e.length();
            const a = new $().retain(c).insert(`
`);
            this.quill.updateContents(a, S.sources.USER), this.quill.setSelection(c, S.sources.USER);
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
        e.shiftKey ? this.quill.setSelection(i - 1, S.sources.USER) : this.quill.setSelection(i + n.length(), S.sources.USER);
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
        this.quill.insertText(s.index, " ", S.sources.USER), this.quill.history.cutoff();
        const o = new $().retain(s.index - i).delete(e + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, S.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index - e, S.sources.SILENT), !1;
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
            const r = new $().retain(s.index + t.length() - e - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, S.sources.USER), this.quill.setSelection(s.index - 1, S.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": rr("ArrowLeft", !1),
    "embed left shift": rr("ArrowLeft", !0),
    "embed right": rr("ArrowRight", !1),
    "embed right shift": rr("ArrowRight", !0),
    "table down": eu(!1),
    "table up": eu(!0)
  }
};
Vr.DEFAULTS = cE;
function tu(s) {
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
        this.quill.insertText(t.index, r, S.sources.USER), this.quill.setSelection(t.index + r.length, S.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: c,
        length: a
      } = t;
      o.forEach((l, h) => {
        s ? (l.insertAt(0, r), h === 0 ? c += r.length : a += r.length) : l.domNode.textContent.startsWith(r) && (l.deleteAt(0, r.length), h === 0 ? c -= r.length : a -= r.length);
      }), this.quill.update(S.sources.USER), this.quill.setSelection(c, a, S.sources.SILENT);
    }
  };
}
function rr(s, t) {
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
      return r instanceof Dt ? (s === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, S.sources.USER) : this.quill.setSelection(n.index - 1, S.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, S.sources.USER) : this.quill.setSelection(n.index + n.length + 1, S.sources.USER), !1) : !0;
    }
  };
}
function ea(s) {
  return {
    key: s[0],
    shortKey: !0,
    handler(t, e) {
      this.quill.format(s, !e.format[s], S.sources.USER);
    }
  };
}
function eu(s) {
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
          this.quill.setSelection(a, 0, S.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (s ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, S.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, S.sources.USER));
      }
      return !1;
    }
  };
}
function uE(s) {
  if (typeof s == "string" || typeof s == "number")
    s = {
      key: s
    };
  else if (typeof s == "object")
    s = pn(s);
  else
    return null;
  return s.shortKey && (s[lE] = s.shortKey, delete s.shortKey), s;
}
function Nl(s) {
  let {
    quill: t,
    range: e
  } = s;
  const n = t.getLines(e);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), o = n[n.length - 1].formats();
    i = Ht.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(e, S.sources.USER), Object.keys(i).length > 0 && t.formatLine(e.index, 1, i, S.sources.USER), t.setSelection(e.index, S.sources.SILENT);
}
function hE(s, t, e, n) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? n === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const dE = /font-weight:\s*normal/, fE = ["P", "OL", "UL"], su = (s) => s && fE.includes(s.tagName), pE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => su(t.previousElementSibling) && su(t.nextElementSibling)).forEach((t) => {
    var e;
    (e = t.parentNode) == null || e.removeChild(t);
  });
}, gE = (s) => {
  Array.from(s.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var e;
    return (e = t.getAttribute("style")) == null ? void 0 : e.match(dE);
  }).forEach((t) => {
    var n;
    const e = s.createDocumentFragment();
    e.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(e, t);
  });
};
function mE(s) {
  s.querySelector('[id^="docs-internal-guid-"]') && (gE(s), pE(s));
}
const bE = /\bmso-list:[^;]*ignore/i, yE = /\bmso-list:[^;]*\bl(\d+)/i, _E = /\bmso-list:[^;]*\blevel(\d+)/i, vE = (s, t) => {
  const e = s.getAttribute("style"), n = e == null ? void 0 : e.match(yE);
  if (!n)
    return null;
  const i = Number(n[1]), r = e == null ? void 0 : e.match(_E), o = r ? Number(r[1]) : 1, c = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(c), l = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: l,
    element: s
  };
}, EE = (s) => {
  var o, c;
  const t = Array.from(s.querySelectorAll("[style*=mso-list]")), e = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(bE) ? e.push(a) : n.push(a);
  }), e.forEach((a) => {
    var l;
    return (l = a.parentNode) == null ? void 0 : l.removeChild(a);
  });
  const i = s.documentElement.innerHTML, r = n.map((a) => vE(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let l = r.shift();
    for (; l; )
      a.push(l), l = r.length && ((o = r[0]) == null ? void 0 : o.element) === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === l.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((m) => {
      const v = document.createElement("li");
      v.setAttribute("data-list", m.type), m.indent > 1 && v.setAttribute("class", `ql-indent-${m.indent - 1}`), v.innerHTML = m.element.innerHTML, h.appendChild(v);
    });
    const p = (c = a[0]) == null ? void 0 : c.element, {
      parentNode: g
    } = p ?? {};
    p && (g == null || g.replaceChild(h, p)), a.slice(1).forEach((m) => {
      let {
        element: v
      } = m;
      g == null || g.removeChild(v);
    });
  }
};
function wE(s) {
  s.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && EE(s);
}
const TE = [wE, mE], AE = (s) => {
  s.documentElement && TE.forEach((t) => {
    t(s);
  });
}, NE = Ve("quill:clipboard"), OE = [[Node.TEXT_NODE, BE], [Node.TEXT_NODE, iu], ["br", kE], [Node.ELEMENT_NODE, iu], [Node.ELEMENT_NODE, LE], [Node.ELEMENT_NODE, xE], [Node.ELEMENT_NODE, qE], ["li", DE], ["ol, ul", ME], ["pre", IE], ["tr", $E], ["b", sa("bold")], ["i", sa("italic")], ["strike", sa("strike")], ["style", RE]], CE = [nE, cd].reduce((s, t) => (s[t.keyName] = t, s), {}), nu = [ad, wl, El, hd, pd, md].reduce((s, t) => (s[t.keyName] = t, s), {});
class bd extends le {
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], OE.concat(this.options.matchers ?? []).forEach((n) => {
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
      return new $().insert(n || "", {
        [_t.blotName]: i[_t.blotName]
      });
    if (!e)
      return new $().insert(n || "", i);
    const r = this.convertHTML(e);
    return Si(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new $().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    AE(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const n = e.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Ol(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : S.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, e), this.quill.setSelection(0, S.sources.SILENT);
    } else {
      const i = this.convert({
        html: e,
        text: ""
      });
      this.quill.updateContents(new $().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), S.sources.SILENT);
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
    (o = t.clipboardData) == null || o.setData("text/plain", r), (c = t.clipboardData) == null || c.setData("text/html", i), e && Nl({
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
      const p = (a = t.clipboardData) == null ? void 0 : a.getData("text/uri-list");
      p && (i = this.normalizeURIList(p));
    }
    const r = Array.from(((l = t.clipboardData) == null ? void 0 : l.files) || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(e, r);
      return;
    }
    if (n && r.length > 0) {
      const p = new DOMParser().parseFromString(n, "text/html");
      if (p.body.childElementCount === 1 && ((h = p.body.firstElementChild) == null ? void 0 : h.tagName) === "IMG") {
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
    NE.log("onPaste", o, {
      text: n,
      html: i
    });
    const c = new $().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(c, S.sources.USER), this.quill.setSelection(c.length() - t.length, S.sources.SILENT), this.quill.scrollSelectionIntoView();
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
M(bd, "DEFAULTS", {
  matchers: []
});
function Vs(s, t, e, n) {
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
  }, new $()) : s;
}
function Si(s, t) {
  let e = "";
  for (let n = s.ops.length - 1; n >= 0 && e.length < t.length; --n) {
    const i = s.ops[n];
    if (typeof i.insert != "string") break;
    e = i.insert + e;
  }
  return e.slice(-1 * t.length) === t;
}
function Qe(s, t) {
  if (!(s instanceof Element)) return !1;
  const e = t.query(s);
  return e && e.prototype instanceof Dt ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(s.tagName.toLowerCase());
}
function SE(s, t) {
  return s.previousElementSibling && s.nextElementSibling && !Qe(s.previousElementSibling, t) && !Qe(s.nextElementSibling, t);
}
const or = /* @__PURE__ */ new WeakMap();
function yd(s) {
  return s == null ? !1 : (or.has(s) || (s.tagName === "PRE" ? or.set(s, !0) : or.set(s, yd(s.parentNode))), or.get(s));
}
function Ol(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new $()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let c = Ol(s, o, e, n, i);
    return o.nodeType === t.ELEMENT_NODE && (c = e.reduce((a, l) => l(o, a, s), c), c = (i.get(o) || []).reduce((a, l) => l(o, a, s), c)), r.concat(c);
  }, new $()) : new $();
}
function sa(s) {
  return (t, e, n) => Vs(e, s, !0, n);
}
function xE(s, t, e) {
  const n = Ee.keys(s), i = oe.keys(s), r = cs.keys(s), o = {};
  return n.concat(i).concat(r).forEach((c) => {
    let a = e.query(c, B.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = CE[c], a != null && (a.attrName === c || a.keyName === c) && (o[a.attrName] = a.value(s) || void 0), a = nu[c], a != null && (a.attrName === c || a.keyName === c) && (a = nu[c], o[a.attrName] = a.value(s) || void 0));
  }), Object.entries(o).reduce((c, a) => {
    let [l, h] = a;
    return Vs(c, l, h, e);
  }, t);
}
function LE(s, t, e) {
  const n = e.query(s);
  if (n == null) return t;
  if (n.prototype instanceof Dt) {
    const i = {}, r = n.value(s);
    if (r != null)
      return i[n.blotName] = r, new $().insert(i, n.formats(s, e));
  } else if (n.prototype instanceof gi && !Si(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Vs(t, n.blotName, n.formats(s, e), e);
  return t;
}
function kE(s, t) {
  return Si(t, `
`) || t.insert(`
`), t;
}
function IE(s, t, e) {
  const n = e.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(s, e) : !0;
  return Vs(t, "code-block", i, e);
}
function RE() {
  return new $();
}
function DE(s, t, e) {
  const n = e.query(s);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Si(t, `
`))
    return t;
  let i = -1, r = s.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, c) => c.insert ? c.attributes && typeof c.attributes.indent == "number" ? o.push(c) : o.insert(c.insert, {
    indent: i,
    ...c.attributes || {}
  }) : o, new $());
}
function ME(s, t, e) {
  const n = s;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Vs(t, "list", i, e);
}
function iu(s, t, e) {
  if (!Si(t, `
`)) {
    if (Qe(s, e) && (s.childNodes.length > 0 || s instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && s.nextSibling) {
      let n = s.nextSibling;
      for (; n != null; ) {
        if (Qe(n, e))
          return t.insert(`
`);
        const i = e.query(n);
        if (i && i.prototype instanceof Ft)
          return t.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return t;
}
function qE(s, t, e) {
  var r;
  const n = {}, i = s.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, c) => {
    let [a, l] = c;
    return Vs(o, a, l, e);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new $().insert("	").concat(t) : t;
}
function $E(s, t, e) {
  var i, r;
  const n = ((i = s.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? s.parentElement : (r = s.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const c = Array.from(n.querySelectorAll("tr")).indexOf(s) + 1;
    return Vs(t, "table", c, e);
  }
  return t;
}
function BE(s, t, e) {
  var i;
  let n = s.data;
  if (((i = s.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!yd(s)) {
    if (n.trim().length === 0 && n.includes(`
`) && !SE(s, e))
      return t;
    const r = (o, c) => {
      const a = c.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (s.previousSibling == null && s.parentElement != null && Qe(s.parentElement, e) || s.previousSibling instanceof Element && Qe(s.previousSibling, e)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (s.nextSibling == null && s.parentElement != null && Qe(s.parentElement, e) || s.nextSibling instanceof Element && Qe(s.nextSibling, e)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class _d extends le {
  constructor(e, n) {
    super(e, n);
    M(this, "lastRecorded", 0);
    M(this, "ignoreChange", !1);
    M(this, "stack", {
      undo: [],
      redo: []
    });
    M(this, "currentRange", null);
    this.quill.on(S.events.EDITOR_CHANGE, (i, r, o, c) => {
      i === S.events.SELECTION_CHANGE ? r && c !== S.sources.SILENT && (this.currentRange = r) : i === S.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || c === S.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = La(this.currentRange, r));
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
      range: La(i.range, o)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(i.delta, S.sources.USER), this.ignoreChange = !1, this.restoreSelection(i);
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
    ru(this.stack.undo, e), ru(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, S.sources.USER);
    else {
      const n = jE(this.quill.scroll, e.delta);
      this.quill.setSelection(n, S.sources.USER);
    }
  }
}
M(_d, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function ru(s, t) {
  let e = t;
  for (let n = s.length - 1; n >= 0; n -= 1) {
    const i = s[n];
    s[n] = {
      delta: e.transform(i.delta, !0),
      range: i.range && La(i.range, e)
    }, e = i.delta.transform(e), s[n].delta.length() === 0 && s.splice(n, 1);
  }
}
function PE(s, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((n) => s.query(n, B.BLOCK) != null) : !1;
}
function jE(s, t) {
  const e = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - e;
  return PE(s, t) && (n -= 1), n;
}
function La(s, t) {
  if (!s) return s;
  const e = t.transformPosition(s.index), n = t.transformPosition(s.index + s.length);
  return {
    index: e,
    length: n - e
  };
}
class vd extends le {
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
vd.DEFAULTS = {
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
      }), new $().retain(s.index).delete(s.length));
      this.quill.updateContents(i, q.sources.USER), this.quill.setSelection(s.index + n.length, q.sources.SILENT);
    });
  }
};
const UE = ["insertText", "insertReplacementText"];
class VE extends le {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(S.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Nl({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (e) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new $().retain(t.index).insert(e, n), S.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + e.length, 0, S.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !UE.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const n = FE(t);
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
function FE(s) {
  var t;
  return typeof s.data == "string" ? s.data : (t = s.dataTransfer) != null && t.types.includes("text/plain") ? s.dataTransfer.getData("text/plain") : null;
}
const HE = /Mac/i.test(navigator.platform), WE = 100, zE = (s) => !!(s.key === "ArrowLeft" || s.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
s.key === "ArrowUp" || s.key === "ArrowDown" || s.key === "Home" || HE && s.key === "a" && s.ctrlKey === !0);
class KE extends le {
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
        if (!(i instanceof ne) || !i.uiNode)
          return !0;
        const o = getComputedStyle(i.domNode).direction === "rtl";
        return o && r.key !== "ArrowRight" || !o && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (r.shiftKey ? 1 : 0), S.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && zE(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + WE, this.isListening) return;
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
    if (!(i instanceof ne) || !i.uiNode) return;
    const r = document.createRange();
    r.setStartAfter(i.uiNode), r.setEndAfter(i.uiNode), e.removeAllRanges(), e.addRange(r);
  }
}
S.register({
  "blots/block": ft,
  "blots/block/embed": Ft,
  "blots/break": ae,
  "blots/container": js,
  "blots/cursor": Nn,
  "blots/embed": _l,
  "blots/inline": we,
  "blots/scroll": hn,
  "blots/text": ie,
  "modules/clipboard": bd,
  "modules/history": _d,
  "modules/keyboard": Vr,
  "modules/uploader": vd,
  "modules/input": VE,
  "modules/uiNode": KE
});
class GE extends oe {
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
const YE = new GE("indent", "ql-indent", {
  scope: B.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class ka extends ft {
}
M(ka, "blotName", "blockquote"), M(ka, "tagName", "blockquote");
class Ia extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
M(Ia, "blotName", "header"), M(Ia, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class xi extends js {
}
xi.blotName = "list-container";
xi.tagName = "OL";
class Li extends ft {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    S.register(xi);
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
Li.blotName = "list";
Li.tagName = "LI";
xi.allowedChildren = [Li];
Li.requiredContainer = xi;
class yi extends we {
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
M(yi, "blotName", "bold"), M(yi, "tagName", ["STRONG", "B"]);
class Ra extends yi {
}
M(Ra, "blotName", "italic"), M(Ra, "tagName", ["EM", "I"]);
class Je extends we {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return Ed(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
M(Je, "blotName", "link"), M(Je, "tagName", "A"), M(Je, "SANITIZED_URL", "about:blank"), M(Je, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function Ed(s, t) {
  const e = document.createElement("a");
  e.href = s;
  const n = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class Da extends we {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
M(Da, "blotName", "script"), M(Da, "tagName", ["SUB", "SUP"]);
class Ma extends yi {
}
M(Ma, "blotName", "strike"), M(Ma, "tagName", ["S", "STRIKE"]);
class qa extends we {
}
M(qa, "blotName", "underline"), M(qa, "tagName", "U");
class hr extends _l {
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
M(hr, "blotName", "formula"), M(hr, "className", "ql-formula"), M(hr, "tagName", "SPAN");
const ou = ["alt", "height", "width"];
class $a extends Dt {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return ou.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return Ed(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    ou.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
M($a, "blotName", "image"), M($a, "tagName", "IMG");
const au = ["height", "width"];
class dr extends Ft {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return au.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static sanitize(t) {
    return Je.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    au.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
M(dr, "blotName", "video"), M(dr, "className", "ql-video"), M(dr, "tagName", "IFRAME");
const si = new oe("code-token", "hljs", {
  scope: B.INLINE
});
class Be extends we {
  static formats(t, e) {
    for (; t != null && t !== e.domNode; ) {
      if (t.classList && t.classList.contains(_t.className))
        return super.formats(t, e);
      t = t.parentNode;
    }
  }
  constructor(t, e, n) {
    super(t, e, n), si.add(this.domNode, n);
  }
  format(t, e) {
    t !== Be.blotName ? super.format(t, e) : e ? si.add(this.domNode, e) : (si.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), si.value(this.domNode) || this.unwrap();
  }
}
Be.blotName = "code-token";
Be.className = "ql-token";
class Vt extends _t {
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
class ai extends Us {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, e) {
    t === Vt.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, e);
    }));
  }
  formatAt(t, e, n, i) {
    n === Vt.blotName && (this.forceNext = !0), super.formatAt(t, e, n, i);
  }
  highlight(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = Vt.formats(this.children.head.domNode);
    if (e || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((a, l) => a.concat(nd(l, !1)), new $()), c = t(i, r);
        o.diff(c).reduce((a, l) => {
          let {
            retain: h,
            attributes: p
          } = l;
          return h ? (p && Object.keys(p).forEach((g) => {
            [Vt.blotName, Be.blotName].includes(g) && this.formatAt(a, h, g, p[g]);
          }), a + h) : a;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, e) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Vt.formats(n.domNode) : "plain"}">
${Ur(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = Vt.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
ai.allowedChildren = [Vt];
Vt.requiredContainer = ai;
Vt.allowedChildren = [Be, Nn, ie, ae];
const XE = (s, t, e) => {
  if (typeof s.versionString == "string") {
    const n = s.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return s.highlight(e, {
        language: t
      }).value;
  }
  return s.highlight(t, e).value;
};
class wd extends le {
  static register() {
    S.register(Be, !0), S.register(Vt, !0), S.register(ai, !0);
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
    this.quill.on(S.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof ai)) return;
      const e = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const o = e.ownerDocument.createElement("option");
        o.textContent = r, o.setAttribute("value", i), e.appendChild(o);
      }), e.addEventListener("change", () => {
        t.format(Vt.blotName, e.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(e), t.children.head && (e.value = Vt.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(S.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(S.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(ai) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, e);
    }), this.quill.update(S.sources.SILENT), n != null && this.quill.setSelection(n, S.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return Ur(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [_t.blotName]: e
      }), i.insert(r)), new $());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(_t.className), n.innerHTML = XE(this.options.hljs, e, t), Ol(this.quill.scroll, n, [(i, r) => {
      const o = si.value(i);
      return o ? r.compose(new $().retain(r.length(), {
        [Be.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, c, a) => (a !== 0 && o.insert(`
`, {
      [_t.blotName]: e
    }), o.insert(c)), r)], /* @__PURE__ */ new WeakMap());
  }
}
wd.DEFAULTS = {
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
const ci = class ci extends ft {
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", Cl()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === ci.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
M(ci, "blotName", "table"), M(ci, "tagName", "TD");
let se = ci;
class Pe extends js {
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
M(Pe, "blotName", "table-row"), M(Pe, "tagName", "TR");
class _e extends js {
}
M(_e, "blotName", "table-body"), M(_e, "tagName", "TBODY");
class Cn extends js {
  balanceCells() {
    const t = this.descendants(Pe), e = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(e - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = se.formats(n.children.head.domNode));
        const r = this.scroll.create(se.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((e) => e.children.at(t));
  }
  deleteColumn(t) {
    const [e] = this.descendant(_e);
    e == null || e.children.head == null || e.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [e] = this.descendant(_e);
    e == null || e.children.head == null || e.children.forEach((n) => {
      const i = n.children.at(t), r = se.formats(n.children.head.domNode), o = this.scroll.create(se.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [e] = this.descendant(_e);
    if (e == null || e.children.head == null) return;
    const n = Cl(), i = this.scroll.create(Pe.blotName);
    e.children.head.children.forEach(() => {
      const o = this.scroll.create(se.blotName, n);
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
M(Cn, "blotName", "table-container"), M(Cn, "tagName", "TABLE");
Cn.allowedChildren = [_e];
_e.requiredContainer = Cn;
_e.allowedChildren = [Pe];
Pe.requiredContainer = _e;
Pe.allowedChildren = [se];
se.requiredContainer = Pe;
function Cl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class ZE extends le {
  static register() {
    S.register(se), S.register(Pe), S.register(_e), S.register(Cn);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(Cn).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , e] = this.getTable();
    e != null && (t.deleteColumn(e.cellOffset()), this.quill.update(S.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(S.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const e = t.offset();
    t.remove(), this.quill.update(S.sources.USER), this.quill.setSelection(e, S.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [e, n] = this.quill.getLine(t.index);
    if (e == null || e.statics.blotName !== se.blotName)
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
    n.insertColumn(o + t), this.quill.update(S.sources.USER);
    let c = i.rowOffset();
    t === 0 && (c += 1), this.quill.setSelection(e.index + c, e.length, S.sources.SILENT);
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
    n.insertRow(o + t), this.quill.update(S.sources.USER), t > 0 ? this.quill.setSelection(e, S.sources.SILENT) : this.quill.setSelection(e.index + i.children.length, e.length, S.sources.SILENT);
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
        table: Cl()
      });
    }, new $().retain(n.index));
    this.quill.updateContents(i, S.sources.USER), this.quill.setSelection(n.index, S.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(S.events.SCROLL_OPTIMIZE, (t) => {
      t.some((e) => ["TD", "TR", "TBODY", "TABLE"].includes(e.target.tagName) ? (this.quill.once(S.events.TEXT_CHANGE, (n, i, r) => {
        r === S.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const lu = Ve("quill:toolbar");
class Sl extends le {
  constructor(t, e) {
    var n, i;
    if (super(t, e), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), QE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      lu.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var c;
      const o = (c = this.options.handlers) == null ? void 0 : c[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(S.events.EDITOR_CHANGE, () => {
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
      lu.warn("ignoring attaching to nonexistent format", e, t);
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
        this.quill.updateContents(new $().retain(o.index).delete(o.length).insert({
          [e]: r
        }), S.sources.USER);
      } else
        this.quill.format(e, r, S.sources.USER);
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
Sl.DEFAULTS = {};
function cu(s, t, e) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), e != null ? (n.value = e, n.setAttribute("aria-label", `${t}: ${e}`)) : n.setAttribute("aria-label", t), s.appendChild(n);
}
function QE(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        cu(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? JE(n, r, o) : cu(n, r, o);
      }
    }), s.appendChild(n);
  });
}
function JE(s, t, e) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), e.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), s.appendChild(n);
}
Sl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const s = this.quill.getSelection();
      if (s != null)
        if (s.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((e) => {
            this.quill.scroll.query(e, B.INLINE) != null && this.quill.format(e, !1, S.sources.USER);
          });
        } else
          this.quill.removeFormat(s.index, s.length, S.sources.USER);
    },
    direction(s) {
      const {
        align: t
      } = this.quill.getFormat();
      s === "rtl" && t == null ? this.quill.format("align", "right", S.sources.USER) : !s && t === "right" && this.quill.format("align", !1, S.sources.USER), this.quill.format("direction", s, S.sources.USER);
    },
    indent(s) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t), n = parseInt(e.indent || 0, 10);
      if (s === "+1" || s === "-1") {
        let i = s === "+1" ? 1 : -1;
        e.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, S.sources.USER);
      }
    },
    link(s) {
      s === !0 && (s = prompt("Enter link URL:")), this.quill.format("link", s, S.sources.USER);
    },
    list(s) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t);
      s === "check" ? e.list === "checked" || e.list === "unchecked" ? this.quill.format("list", !1, S.sources.USER) : this.quill.format("list", "unchecked", S.sources.USER) : this.quill.format("list", s, S.sources.USER);
    }
  }
};
const tw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', sw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', iw = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', rw = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', ow = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', aw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', uu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', cw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', uw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', hw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', dw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', fw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', pw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', gw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', mw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', bw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', yw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', _w = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', vw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', ww = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Tw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Aw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Ow = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Cw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Sw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', xw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Lw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', kw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', _i = {
  align: {
    "": tw,
    center: ew,
    right: sw,
    justify: nw
  },
  background: iw,
  blockquote: rw,
  bold: ow,
  clean: aw,
  code: uu,
  "code-block": uu,
  color: lw,
  direction: {
    "": cw,
    rtl: uw
  },
  formula: hw,
  header: {
    1: dw,
    2: fw,
    3: pw,
    4: gw,
    5: mw,
    6: bw
  },
  italic: yw,
  image: _w,
  indent: {
    "+1": vw,
    "-1": Ew
  },
  link: ww,
  list: {
    bullet: Tw,
    check: Aw,
    ordered: Nw
  },
  script: {
    sub: Ow,
    super: Cw
  },
  strike: Sw,
  table: xw,
  underline: Lw,
  video: kw
}, Iw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let hu = 0;
function du(s, t) {
  s.setAttribute(t, `${s.getAttribute(t) !== "true"}`);
}
class Fr {
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
    this.container.classList.toggle("ql-expanded"), du(this.label, "aria-expanded"), du(this.options, "aria-hidden");
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
    return t.classList.add("ql-picker-label"), t.innerHTML = Iw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${hu}`, hu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
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
class Td extends Fr {
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
class Ad extends Fr {
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
const Rw = (s) => {
  const {
    overflowY: t
  } = getComputedStyle(s, null);
  return t !== "visible" && t !== "clip";
};
class Nd {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Rw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const Dw = [!1, "center", "right", "justify"], Mw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], qw = [!1, "serif", "monospace"], $w = ["1", "2", "3", !1], Bw = ["small", !1, "large", "huge"];
class ki extends On {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ei(i, Dw), typeof e.align == "object"))
        return new Ad(i, e.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ei(i, Mw, r === "background" ? "#ffffff" : "#000000"), new Td(i, e[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ei(i, qw) : i.classList.contains("ql-header") ? ei(i, $w) : i.classList.contains("ql-size") && ei(i, Bw)), new Fr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(q.events.EDITOR_CHANGE, n);
  }
}
ki.DEFAULTS = ts({}, On.DEFAULTS, {
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
class Od extends Nd {
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
        t = Pw(t);
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
function Pw(s) {
  let t = s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = s.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : s;
}
function ei(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === e ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), s.appendChild(i);
  });
}
const jw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Cd extends Od {
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
            const a = c[c.length - 1], l = this.quill.getIndex(a), h = Math.min(a.length() - 1, i.index + i.length - l), p = this.quill.getBounds(new Ds(l, h));
            p != null && this.position(p);
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
M(Cd, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Sd extends ki {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = jw), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Cd(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), _i), this.buildPickers(t.container.querySelectorAll("select"), _i));
  }
}
Sd.DEFAULTS = ts({}, ki.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(s) {
          s ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, S.sources.USER);
        }
      }
    }
  }
});
const Uw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class xd extends Od {
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
          const [r, o] = this.quill.scroll.descendant(Je, e.index);
          if (r != null) {
            this.linkRange = new Ds(e.index - o, r.length());
            const c = Je.formats(r.domNode);
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
M(xd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Ld extends ki {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Uw), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), _i), this.buildPickers(t.container.querySelectorAll("select"), _i), this.tooltip = new xd(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Ld.DEFAULTS = ts({}, ki.DEFAULTS, {
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
            this.quill.format("link", !1, S.sources.USER);
        }
      }
    }
  }
});
S.register({
  "attributors/attribute/direction": cd,
  "attributors/class/align": od,
  "attributors/class/background": rE,
  "attributors/class/color": iE,
  "attributors/class/direction": ud,
  "attributors/class/font": fd,
  "attributors/class/size": gd,
  "attributors/style/align": ad,
  "attributors/style/background": wl,
  "attributors/style/color": El,
  "attributors/style/direction": hd,
  "attributors/style/font": pd,
  "attributors/style/size": md
}, !0);
S.register({
  "formats/align": od,
  "formats/direction": ud,
  "formats/indent": YE,
  "formats/background": wl,
  "formats/color": El,
  "formats/font": fd,
  "formats/size": gd,
  "formats/blockquote": ka,
  "formats/code-block": _t,
  "formats/header": Ia,
  "formats/list": Li,
  "formats/bold": yi,
  "formats/code": Tl,
  "formats/italic": Ra,
  "formats/link": Je,
  "formats/script": Da,
  "formats/strike": Ma,
  "formats/underline": qa,
  "formats/formula": hr,
  "formats/image": $a,
  "formats/video": dr,
  "modules/syntax": wd,
  "modules/table": ZE,
  "modules/toolbar": Sl,
  "themes/bubble": Sd,
  "themes/snow": Ld,
  "ui/icons": _i,
  "ui/picker": Fr,
  "ui/icon-picker": Ad,
  "ui/color-picker": Td,
  "ui/tooltip": Nd
}, !0);
const In = (s, t) => {
  const e = s.__vccOpts || s;
  for (const [n, i] of t)
    e[n] = i;
  return e;
}, Vw = {
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
      this.quill = new S(this.$refs.editor, {
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
}, Fw = Vw, Hw = { class: "ql-editor-container" }, Ww = {
  class: "",
  ref: "editor"
};
function zw(s, t, e, n, i, r) {
  return b(), y("div", Hw, [
    f("div", Ww, null, 512)
  ]);
}
const Kw = /* @__PURE__ */ In(Fw, [["render", zw], ["__scopeId", "data-v-443c4edc"]]), Bt = {
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
}, Gw = {
  props: {
    modelValue: Array,
    params: Object,
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
    roundFileSize(s, t) {
      return s < 1024 ? s + (t ? " Byte" : "") : s < 1048576 ? (s / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : s < 1073741824 ? (s / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (s / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
    },
    extensionByFilename(s) {
      return s.split(".").reverse()[0];
    },
    getAcceptMimeTypes(s) {
      let t = [];
      for (const e in Bt)
        if (Bt.hasOwnProperty(e)) {
          const n = Bt[e];
          s.forEach((i) => {
            n[i] && t.push(n[i]);
          });
        }
      return t.join(",");
    },
    detect(s) {
      s.bytes = 0, s.types = {
        default: {}
      }, s.title = s.name.split(".").slice(0, -1).join("."), s.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32), s.slug = Jn(s.title), s.timestamp = Math.round(Date.now() / 1e3), s.original = {
        bytes: s.size,
        mime: s.type,
        name: s.name,
        modified: s.lastModified,
        extension: this.extensionByFilename(s.name)
      }, Object.values(Bt.video).indexOf(s.original.mime) >= 0 ? s.isVideo = !0 : Object.values(Bt.image).indexOf(s.original.mime) >= 0 ? s.isImage = !0 : Object.values(Bt.document).indexOf(s.original.mime) >= 0 ? s.isDocument = !0 : s.isUnknown = !0, (s.isVideo || s.isImage && !this.params.presets.default) && (this.params.presets.default = {
        width: 1920,
        height: 1920,
        extension: "webp",
        quality: 0.9
      });
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
      for (let t of s.target.files)
        this.count++, this.count <= this.params.limit && (this.files.push(t), this.detect(t), t.isVideo ? await this.createThumbnail(t) : t.isImage ? await this.resizeImage(t) : t.isDocument && (t.types.default = {
          extension: t.original.extension,
          mime: t.original.mime,
          slug: Jn(t.title) + "-" + t.uid,
          bytes: t.size
        }, t.loaded = !0, t.bytes += t.size, this.bytes += t.bytes));
      this.$emit("update:modelValue", this.files), this.wait = !1, this.uploadEvent.target.value = "";
    },
    async forEachPresets(s, t, e) {
      const n = document.createElement("canvas"), i = n.getContext("2d");
      let r = !!t.videoWidth, o, c;
      r ? (o = t.videoWidth, c = t.videoHeight) : (o = t.width, c = t.height), s.original.width = o, s.original.height = c;
      for (let a in this.params.presets) {
        let l = this.params.presets[a];
        l.key = a, l.width = l.width ? l.width : 1920, l.height = l.height ? l.height : 1080;
        let h = l.width, p = l.height;
        if (l.crop === "fit") {
          let g = Math.max(h / o, p / c), m = o * g, v = c * g, E = (m - h) / 2, w = (v - p) / 2;
          n.width = h, n.height = p, i.drawImage(t, -E, -w, m, v);
        } else if (l.crop === "contain") {
          let g = Math.min(h / o, p / c), m = o * g, v = c * g, E = (h - m) / 2, w = (p - v) / 2;
          n.width = h, n.height = p, i.clearRect(0, 0, h, p), i.drawImage(t, E, w, m, v);
        } else
          o > h && (c = Math.round(c * (h / o)), o = h), c > p && (o = Math.round(o * (p / c)), c = p), n.width = o, n.height = c, i.drawImage(t, 0, 0, o, c);
        s.types[l.key] = {
          width: n.width,
          height: n.height,
          extension: l.extension ? l.extension : this.getExtensionByMimeType(s.type),
          quality: l.quality ? l.quality : 0.9,
          crop: l.crop ? l.crop : null
        }, s.types[l.key].slug = Jn(s.title) + "-" + n.width + "x" + n.height + "-" + s.uid, s.types[l.key].mime = this.getMimeTypeByExtension(s.types[l.key].extension), s.types[l.key].data = n.toDataURL(
          s.types[l.key].mime,
          s.types[l.key].quality
        ), s.types[l.key].blob = await this.getBlob(n, s.types[l.key].mime, s.types[l.key].quality), s.types[l.key].blob && (s.types[l.key].bytes = s.types[l.key].blob.size), s.types[l.key].bytes && (s.bytes += s.types[l.key].bytes), e && e(l, s);
      }
    },
    getBlob(s, t, e) {
      return new Promise((n, i) => {
        s.toBlob(function(r) {
          r ? n(r) : i(new Error("Failed to convert canvas to Blob"));
        }, t, e);
      });
    },
    async resizeImage(s) {
      const t = await this.fileToBlob(s), e = await createImageBitmap(t);
      await this.forEachPresets(s, e), s.loaded = !0, this.bytes += s.bytes;
    },
    fileToBlob(s) {
      return new Promise((t) => {
        const e = new FileReader();
        e.onload = (n) => {
          t(new Blob([n.target.result], { type: s.mime }));
        }, e.readAsArrayBuffer(s);
      });
    },
    slug(s) {
      if (!s.uploaded) {
        s.slug = Jn(s.title);
        for (let t in s.types) {
          let e = this.params.presets[t];
          s.types[t].slug = Jn(s.title) + "-" + e.width + "x" + e.height;
        }
        this.$forceUpdate();
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
    toggleView() {
      this.params.ui = this.params.ui == "list" ? "grid" : "list";
    },
    dateFormat(s) {
      return new Date(s).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    getMimeTypeByExtension(s) {
      for (const t in Bt)
        if (Bt.hasOwnProperty(t)) {
          const e = Bt[t];
          if (e[s])
            return e[s];
        }
      return null;
    },
    getExtensionByMimeType(s) {
      for (const t in Bt)
        if (Bt.hasOwnProperty(t)) {
          const e = Bt[t];
          for (const n in e)
            if (e[n] === s)
              return n;
        }
      return null;
    }
  }
}, Yw = Gw, Xw = { class: "" }, Zw = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, Qw = { class: "row" }, Jw = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, tT = { class: "badge bg-dark text-light fw-light mx-1" }, eT = { class: "badge bg-dark text-light fw-light mx-1" }, sT = ["src"], nT = { class: "row g-1" }, iT = { class: "col-md-6" }, rT = { class: "col-md-6" }, oT = { class: "col-md-6" }, aT = ["href"], lT = {
  key: 1,
  class: "row g-2 mb-1"
}, cT = { key: 0 }, uT = { class: "table table-sm table-responsive table-borderless" }, hT = { class: "align-middle text-center ps-0" }, dT = { class: "align-middle px-0" }, fT = { class: "input-group border rounded" }, pT = {
  key: 0,
  class: "fs-5 ms-2"
}, gT = {
  key: 1,
  class: "fs-5 ms-2"
}, mT = {
  key: 2,
  class: "fs-5 ms-2"
}, bT = ["onUpdate:modelValue", "onInput"], yT = {
  key: 3,
  class: "mx-1"
}, _T = ["href"], vT = ["src", "alt"], ET = ["src", "alt"], wT = { class: "dropdown" }, TT = { class: "dropdown-menu" }, AT = ["onClick"], NT = { key: 0 }, OT = ["onClick"], CT = { key: 1 }, ST = { class: "dropdown-item py-0 d-flex justify-content-between" }, xT = { key: 2 }, LT = { class: "dropdown-item py-0 d-flex justify-content-between" }, kT = ["innerHTML"], IT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, RT = { key: 0 }, DT = { key: 1 }, MT = { class: "dropdown-item py-0 d-flex justify-content-between" }, qT = { class: "text-muted fw-light me-4" }, $T = { class: "text-primary" }, BT = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, PT = { class: "dropdown-item py-0 d-flex justify-content-between" }, jT = { class: "text-muted fw-light me-1" }, UT = {
  key: 0,
  class: "text-primary"
}, VT = ["innerHTML"], FT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, HT = { key: 3 }, WT = { class: "dropdown-item py-0 d-flex justify-content-between" }, zT = { class: "dropdown-item py-0 d-flex justify-content-between" }, KT = { class: "text-muted fw-light me-3" }, GT = ["innerHTML"], YT = { class: "dropdown-item py-0 d-flex justify-content-between" }, XT = { class: "text-muted fw-light me-3" }, ZT = { class: "vsa-image-container h-100 position-relative border p-1 rounded" }, QT = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, JT = {
  key: 1,
  class: "vsa-image-frame mb-auto text-center"
}, tA = ["src", "alt"], eA = {
  key: 2,
  class: "display-3 w-100 text-center mb-auto"
}, sA = ["onUpdate:modelValue", "onInput"], nA = { class: "dropdown rounded-bottom border w-100" }, iA = { class: "dropdown-menu" }, rA = ["onClick"], oA = { key: 0 }, aA = ["onClick"], lA = { key: 1 }, cA = { class: "dropdown-item py-0 d-flex justify-content-between" }, uA = { key: 2 }, hA = { class: "dropdown-item py-0 d-flex justify-content-between" }, dA = ["innerHTML"], fA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, pA = { key: 0 }, gA = { key: 1 }, mA = { class: "dropdown-item py-0 d-flex justify-content-between" }, bA = { class: "text-muted fw-light me-4" }, yA = { class: "text-primary" }, _A = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, vA = { class: "dropdown-item py-0 d-flex justify-content-between" }, EA = { class: "text-muted fw-light me-1" }, wA = {
  key: 0,
  class: "text-primary"
}, TA = ["innerHTML"], AA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, NA = { key: 3 }, OA = { class: "dropdown-item py-0 d-flex justify-content-between" }, CA = { class: "dropdown-item py-0 d-flex justify-content-between" }, SA = { class: "text-muted fw-light me-3" }, xA = ["innerHTML"], LA = { class: "dropdown-item py-0 d-flex justify-content-between" }, kA = { class: "text-muted fw-light me-3" }, IA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, RA = { class: "row g-1" }, DA = { class: "col-12 d-flex align-items-center justify-content-center" }, MA = ["for"], qA = { key: 0 }, $A = { key: 0 }, BA = { class: "" }, PA = { class: "" }, jA = {
  key: 1,
  class: "fs-6"
}, UA = {
  key: 0,
  class: "bi bi-list-ol"
}, VA = {
  key: 1,
  class: "bi bi-grid"
}, FA = ["disabled"], HA = { class: "col-12 text-center" }, WA = { key: 0 }, zA = ["id", "accept"];
function KA(s, t, e, n, i, r) {
  return b(), y("div", Xw, [
    f("div", {
      class: R(["vsa-upload", { wait: s.wait }])
    }, [
      s.editfile && s.editfile.presets ? (b(), y("div", Zw, [
        f("div", Qw, [
          (b(!0), y(W, null, K(s.editfile.types, (o, c) => (b(), y("div", {
            class: "col-md-3",
            key: c
          }, [
            f("span", Jw, O(o.extension), 1),
            f("span", tT, O(o.width) + " x " + O(o.height), 1),
            f("span", eT, "~" + O(s.roundFileSize(o.bytes)), 1),
            o ? (b(), y("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, sT)) : A("", !0)
          ]))), 128))
        ]),
        G(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o)
        }, null, 512), [
          [jt, s.editfile.title]
        ]),
        f("div", nT, [
          f("div", iT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          f("div", rT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          f("div", oT, [
            s.type && !s.type.url ? (b(), y("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => s.download(s.index, s.params))
            }, " Download ")) : A("", !0),
            s.type && s.type.url ? (b(), y("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: s.type.url
            }, " Download ", 8, aT)) : A("", !0)
          ])
        ])
      ])) : A("", !0),
      s.files && s.files.length ? (b(), y("div", lT, [
        s.params.ui === "list" ? (b(), y("div", cT, [
          f("table", uT, [
            f("tbody", null, [
              (b(!0), y(W, null, K(s.files, (o, c) => (b(), y("tr", { key: c }, [
                f("td", hT, [
                  f("small", null, O(c + 1), 1)
                ]),
                f("td", dT, [
                  f("div", fT, [
                    o.isDocument ? (b(), y("span", pT, [
                      f("i", {
                        class: R(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (b(), y("span", gT, t[9] || (t[9] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (b(), y("span", mT, t[10] || (t[10] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : A("", !0),
                    G(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (a) => o.title = a,
                      onInput: (a) => s.slug(o),
                      onKeydown: t[4] || (t[4] = ni(na(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, bT), [
                      [jt, o.title]
                    ]),
                    !o.isDocument && o.types && o.types[s.params.thumbnail] ? (b(), y("span", yT, [
                      o.types[s.params.thumbnail].url ? (b(), y("a", {
                        key: 0,
                        target: "_blank",
                        href: o.types[s.params.thumbnail].url
                      }, [
                        f("img", {
                          height: "32",
                          width: "auto",
                          class: "rounded border",
                          src: o.types[s.params.thumbnail].url,
                          alt: o.name
                        }, null, 8, vT)
                      ], 8, _T)) : (b(), y("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "",
                        src: o.types[s.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, ET))
                    ])) : A("", !0),
                    f("div", wT, [
                      t[24] || (t[24] = f("button", {
                        class: "btn btn-sm bg-light text-dark dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, null, -1)),
                      f("ul", TT, [
                        f("li", null, [
                          f("button", {
                            class: "dropdown-item text-danger py-1",
                            onClick: (a) => s.remove(c),
                            type: "button"
                          }, t[11] || (t[11] = [
                            f("i", { class: "bi bi-x-circle" }, null, -1),
                            V(" Remove ")
                          ]), 8, AT)
                        ]),
                        o.uploaded ? (b(), y("li", NT, [
                          f("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => s.download(c, s.params),
                            type: "button"
                          }, t[12] || (t[12] = [
                            f("i", { class: "bi bi-download" }, null, -1),
                            V(" Download ")
                          ]), 8, OT)
                        ])) : A("", !0),
                        t[22] || (t[22] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.original.width ? (b(), y("li", CT, [
                          f("small", ST, [
                            t[13] || (t[13] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            V(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                          ])
                        ])) : A("", !0),
                        o.isDocument ? A("", !0) : (b(), y("li", xT, [
                          f("small", LT, [
                            t[14] || (t[14] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            f("span", null, [
                              f("span", {
                                innerHTML: s.roundFileSize(o.original.bytes, !0)
                              }, null, 8, kT),
                              f("small", IT, O(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        (b(!0), y(W, null, K(o.types, (a, l) => (b(), y(W, { key: a }, [
                          o.isDocument ? A("", !0) : (b(), y("li", RT, t[15] || (t[15] = [
                            f("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (b(), y("li", DT, [
                            f("small", MT, [
                              f("span", qT, [
                                f("span", $T, O(l), 1),
                                t[16] || (t[16] = V(" resolution & crop"))
                              ]),
                              f("span", null, [
                                V(O(a.width) + " x " + O(a.height) + " ", 1),
                                a.crop ? (b(), y("small", BT, O(a.crop), 1)) : A("", !0)
                              ])
                            ])
                          ])) : A("", !0),
                          f("li", null, [
                            f("small", PT, [
                              f("span", jT, [
                                o.isDocument ? A("", !0) : (b(), y("span", UT, O(l), 1)),
                                t[17] || (t[17] = V(" size & extension"))
                              ]),
                              f("span", null, [
                                f("span", {
                                  class: R({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: s.roundFileSize(a.bytes, !0)
                                }, null, 10, VT),
                                f("small", FT, O(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[23] || (t[23] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.uploaded ? (b(), y("li", HT, [
                          f("small", WT, [
                            t[18] || (t[18] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[19] || (t[19] = V()),
                            f("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ])) : A("", !0),
                        f("li", null, [
                          f("small", zT, [
                            f("span", KT, O(o.uploaded ? "uploaded" : "uploadiing") + " bytes", 1),
                            t[20] || (t[20] = V()),
                            f("span", {
                              innerHTML: s.roundFileSize(o.bytes, !0)
                            }, null, 8, GT)
                          ])
                        ]),
                        f("li", null, [
                          f("small", YT, [
                            f("span", XT, O(o.uploaded ? "uploaded" : "uploadiing") + " filename", 1),
                            t[21] || (t[21] = V()),
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
        ])) : (b(!0), y(W, { key: 1 }, K(s.files, (o, c) => (b(), y("div", {
          class: R([s.params.colclass ? s.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: c
        }, [
          f("div", ZT, [
            o.loaded ? (b(), y("div", QT, [
              A("", !0),
              o.types && o.types[s.params.thumbnail] ? (b(), y("div", JT, [
                f("img", {
                  class: "img-fluid",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, tA)
              ])) : A("", !0),
              o.isDocument ? (b(), y("div", eA, [
                f("i", {
                  class: R(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : A("", !0),
              G(f("input", {
                required: "text",
                class: "form-control rounded-0 rounded-top py-1 px-2 fw-light",
                "onUpdate:modelValue": (a) => o.title = a,
                onInput: (a) => s.slug(o),
                onKeydown: t[5] || (t[5] = ni(na(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, sA), [
                [jt, o.title]
              ]),
              f("div", nA, [
                t[41] || (t[41] = f("button", {
                  class: "btn btn-sm bg-light text-dark dropdown-toggle w-100 h-100",
                  type: "button",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, null, -1)),
                f("ul", iA, [
                  f("li", null, [
                    f("button", {
                      class: "dropdown-item text-danger py-1",
                      onClick: (a) => s.remove(c),
                      type: "button"
                    }, t[28] || (t[28] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1),
                      V(" Remove ")
                    ]), 8, rA)
                  ]),
                  o.uploaded ? (b(), y("li", oA, [
                    f("button", {
                      class: "dropdown-item text-primary py-1",
                      onClick: (a) => s.download(c, s.params),
                      type: "button"
                    }, t[29] || (t[29] = [
                      f("i", { class: "bi bi-download" }, null, -1),
                      V(" Download ")
                    ]), 8, aA)
                  ])) : A("", !0),
                  t[39] || (t[39] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.original.width ? (b(), y("li", lA, [
                    f("small", cA, [
                      t[30] || (t[30] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                      V(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                    ])
                  ])) : A("", !0),
                  o.isDocument ? A("", !0) : (b(), y("li", uA, [
                    f("small", hA, [
                      t[31] || (t[31] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                      f("span", null, [
                        f("span", {
                          innerHTML: s.roundFileSize(o.original.bytes, !0)
                        }, null, 8, dA),
                        f("small", fA, O(o.original.extension), 1)
                      ])
                    ])
                  ])),
                  (b(!0), y(W, null, K(o.types, (a, l) => (b(), y(W, { key: a }, [
                    o.isDocument ? A("", !0) : (b(), y("li", pA, t[32] || (t[32] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))),
                    o.original.width ? (b(), y("li", gA, [
                      f("small", mA, [
                        f("span", bA, [
                          f("span", yA, O(l), 1),
                          t[33] || (t[33] = V(" resolution & crop"))
                        ]),
                        f("span", null, [
                          V(O(a.width) + " x " + O(a.height) + " ", 1),
                          a.crop ? (b(), y("small", _A, O(a.crop), 1)) : A("", !0)
                        ])
                      ])
                    ])) : A("", !0),
                    f("li", null, [
                      f("small", vA, [
                        f("span", EA, [
                          o.isDocument ? A("", !0) : (b(), y("span", wA, O(l), 1)),
                          t[34] || (t[34] = V(" size & extension"))
                        ]),
                        f("span", null, [
                          f("span", {
                            class: R({ "text-danger": a.bytes > o.original.bytes }),
                            innerHTML: s.roundFileSize(a.bytes, !0)
                          }, null, 10, TA),
                          f("small", AA, O(a.extension), 1)
                        ])
                      ])
                    ])
                  ], 64))), 128)),
                  t[40] || (t[40] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.uploaded ? (b(), y("li", NA, [
                    f("small", OA, [
                      t[35] || (t[35] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                      t[36] || (t[36] = V()),
                      f("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                    ])
                  ])) : A("", !0),
                  f("li", null, [
                    f("small", CA, [
                      f("span", SA, O(o.uploaded ? "uploaded" : "uploadiing") + " bytes", 1),
                      t[37] || (t[37] = V()),
                      f("span", {
                        innerHTML: s.roundFileSize(o.bytes, !0)
                      }, null, 8, xA)
                    ])
                  ]),
                  f("li", null, [
                    f("small", LA, [
                      f("span", kA, O(o.uploaded ? "uploaded" : "uploadiing") + " filename", 1),
                      t[38] || (t[38] = V()),
                      f("span", null, O(o.slug), 1)
                    ])
                  ])
                ])
              ])
            ])) : (b(), y("div", IA, t[42] || (t[42] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : A("", !0),
      f("div", RA, [
        f("div", DA, [
          f("label", {
            for: s.uploadId,
            class: R([{ "disabled bg-secondary": s.files && s.params.limit <= s.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            s.files && s.params.limit > s.files.length ? (b(), y("span", qA, [
              t[46] || (t[46] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              V(" " + O(s.params.text) + " ", 1),
              s.params.limit ? (b(), y("small", $A, [
                t[43] || (t[43] = V(" ( ")),
                f("strong", BA, O(s.files.length), 1),
                t[44] || (t[44] = V(" / ")),
                f("span", PA, O(s.params.limit), 1),
                t[45] || (t[45] = V(" ) "))
              ])) : A("", !0)
            ])) : (b(), y("span", jA, t[47] || (t[47] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              V(" You've reached the upload limit ")
            ])))
          ], 10, MA),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (o) => s.toggleView())
          }, [
            s.params.ui != "list" ? (b(), y("i", UA)) : A("", !0),
            s.params.ui == "list" ? (b(), y("i", VA)) : A("", !0)
          ]),
          f("button", {
            disabled: !s.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (o) => s.resetConfirm())
          }, t[48] || (t[48] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, FA)
        ]),
        f("div", HA, [
          f("small", null, [
            s.params.accept ? (b(), y("div", WA, [
              t[49] || (t[49] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (b(!0), y(W, null, K(s.params.accept, (o) => (b(), y("strong", {
                class: "ms-1 text-muted",
                key: o
              }, O(o), 1))), 128))
            ])) : A("", !0),
            A("", !0)
          ])
        ])
      ]),
      s.uploadId ? (b(), y("input", {
        key: 2,
        multiple: "",
        style: { opacity: "0", height: "1px", width: "1px" },
        id: s.uploadId,
        type: "file",
        accept: s.getAcceptMimeTypes(s.params.accept),
        onChange: t[8] || (t[8] = (...o) => s.handleFileChange && s.handleFileChange(...o))
      }, null, 40, zA)) : A("", !0)
    ], 2)
  ]);
}
const GA = /* @__PURE__ */ In(Yw, [["render", KA], ["__scopeId", "data-v-45e004bd"]]), YA = {
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
      return mh(s, t, this.settings, this);
    },
    translate(s, t, e) {
      return sl(s, this.settings.translate, t, e || this.settings.language);
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
      Hb(s, t);
    },
    arrayItemMoveDown(s, t) {
      Wb(s, t);
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
    HtmlEditor: Kw,
    FileUpload: GA
  }
}, XA = YA, ZA = { class: "row m-1" }, QA = { class: "form-row-title mb-4 fw-lighter" }, JA = {
  key: 0,
  class: "row"
}, tN = { class: "form-group pb-3" }, eN = { key: 0 }, sN = {
  key: 0,
  class: "badge text-secondary fw-light"
}, nN = ["for", "innerHTML"], iN = { class: "input-group" }, rN = ["innerHTML"], oN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], aN = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], lN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], cN = {
  key: 4,
  class: "form-check"
}, uN = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "readonly", "required"], hN = ["for"], dN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], fN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], pN = ["value"], gN = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], mN = ["innerHTML"], bN = { key: 3 }, yN = ["type", "required", "placeholder", "onUpdate:modelValue"], _N = { class: "col-2 text-nowrap text-end" }, vN = ["onClick"], EN = ["onClick"], wN = ["onClick"], TN = { key: 0 }, AN = { class: "row g-1 d-flex align-items-center justify-content-between" }, NN = ["type", "placeholder", "onUpdate:modelValue"], ON = { class: "col-2" }, CN = ["onClick"], SN = { key: 4 }, xN = { key: 0 }, LN = ["for"], kN = ["name", "id", "onUpdate:modelValue"], IN = ["onClick"], RN = {
  key: 5,
  class: "p-1"
}, DN = ["innerHTML"];
function MN(s, t, e, n, i, r) {
  const o = ui("HtmlEditor"), c = ui("FileUpload");
  return b(), y("div", ZA, [
    (b(!0), y(W, null, K(s.settings.form.groups, (a) => (b(), y("div", {
      key: a,
      class: R([a.class ? a.class : "col-md-12"])
    }, [
      f("h2", QA, O(a.title), 1),
      s.item && a.fields ? (b(), y("div", JA, [
        (b(!0), y(W, null, K(a.fields, (l) => (b(), y("div", {
          class: R([s.getValueOrFunction(l.class ? l.class : "col-md-12"), "input_type_" + l.type]),
          key: l
        }, [
          f("div", tN, [
            l.label !== null ? (b(), y("span", eN, [
              ["html", "image", "upload"].indexOf(l.type) >= 0 ? (b(), y("label", {
                key: 0,
                class: R([{ required: l.required }, "form-label text-secondary mb-1"])
              }, [
                V(O(l.label ? l.label : s.translate(l.name)) + " ", 1),
                l.maxlength ? (b(), y("span", sN, O(s.item[l.name] ? s.item[l.name].length : 0) + " / " + O(l.maxlength), 1)) : A("", !0)
              ], 2)) : (b(), y("label", {
                key: 1,
                class: R([{ required: l.required }, "form-label text-secondary mb-1"]),
                for: s.formid + "_" + l.name,
                innerHTML: s.getValueOrFunction(l.label ? l.label : s.translate(l.name), { field: l, item: s.item })
              }, null, 10, nN))
            ])) : A("", !0),
            f("div", iN, [
              l.prefix ? (b(), y("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: l.prefix
              }, null, 8, rN)) : A("", !0),
              l.type == "text" ? G((b(), y("input", {
                key: 1,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "text",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, oN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "number" ? G((b(), y("input", {
                key: 2,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
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
              }, null, 10, aN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "date" ? G((b(), y("input", {
                key: 3,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "date",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                readonly: l.readonly,
                required: l.required
              }, null, 10, lN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "checkbox" ? (b(), y("div", cN, [
                G(f("input", {
                  class: R(["form-check-input", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                  type: "checkbox",
                  name: l.name,
                  id: s.formid + "_" + l.name,
                  "true-value": l.true != null ? l.true : !0,
                  "false-value": l.false != null ? l.false : !1,
                  "onUpdate:modelValue": (h) => s.item[l.name] = h,
                  readonly: l.readonly,
                  required: l.required
                }, null, 10, uN), [
                  [Rd, s.item[l.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: s.formid + "_" + l.name
                }, O(l.checkbox), 9, hN)
              ])) : A("", !0),
              l.type == "email" ? G((b(), y("input", {
                key: 5,
                autocomplete: "on",
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "email",
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, dN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "select" ? G((b(), y("select", {
                key: 6,
                class: R(["form-select", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                readonly: l.readonly,
                required: l.required
              }, [
                (b(!0), y(W, null, K(s.selectOptions(l.options, l), (h) => (b(), y("option", {
                  class: R(s.getValueOrFunction(l.optionclass ? l.optionclass : "", { field: l, item: s.item, option: h })),
                  key: h,
                  value: h.value
                }, O(h.label ? h.label : h.value), 11, pN))), 128))
              ], 10, fN)), [
                [Re, s.item[l.name]]
              ]) : A("", !0),
              l.type == "textarea" ? G((b(), y("textarea", {
                key: 7,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                name: l.name,
                id: s.formid + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                rows: l.rows,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, "              ", 10, gN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.suffix ? (b(), y("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: l.suffix
              }, null, 8, mN)) : A("", !0)
            ]),
            l.type == "html" ? (b(), ia(o, {
              key: 1,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: R([l.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : A("", !0),
            l.type == "image" || l.type == "upload" ? (b(), ia(c, {
              key: 2,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: R([l.class]),
              params: l.params,
              settings: s.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "params", "settings"])) : A("", !0),
            l.type == "list" ? (b(), y("div", bN, [
              (b(!0), y(W, null, K(s.item[l.name], (h, p) => (b(), y("div", {
                class: "row g-1 d-flex align-items-center justify-content-between mb-1",
                key: p
              }, [
                (b(!0), y(W, null, K(h, (g, m) => (b(), y("div", {
                  key: m,
                  class: R(l.elements[m].class || "col")
                }, [
                  G(f("input", {
                    type: l.elements[m].type,
                    required: l.elements[m].required,
                    placeholder: l.elements[m].placeholder || m,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (v) => s.item[l.name][p][m] = v
                  }, null, 8, yN), [
                    [dn, s.item[l.name][p][m]]
                  ])
                ], 2))), 128)),
                f("div", _N, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (g) => s.arrayItemMoveUp(s.item[l.name], p)
                  }, t[0] || (t[0] = [
                    f("i", { class: "bi bi-arrow-up" }, null, -1)
                  ]), 8, vN),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (g) => s.arrayItemMoveDown(s.item[l.name], p + 1)
                  }, t[1] || (t[1] = [
                    f("i", { class: "bi bi-arrow-down" }, null, -1)
                  ]), 8, EN),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-danger p-1 me-1",
                    onClick: (g) => s.arrayRemoveItem(s.item[l.name], p)
                  }, t[2] || (t[2] = [
                    f("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, wN)
                ])
              ]))), 128)),
              s.item[l.name] && s.item[l.name].length ? (b(), y("hr", TN)) : A("", !0),
              f("div", AN, [
                (b(!0), y(W, null, K(l.elements, (h) => (b(), y("div", {
                  key: h,
                  class: R(h.class || "col")
                }, [
                  G(f("input", {
                    type: h.type,
                    placeholder: h.placeholder || h.name,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (p) => h.value = p
                  }, null, 8, NN), [
                    [dn, h.value]
                  ])
                ], 2))), 128)),
                f("div", ON, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-primary my-1 w-100",
                    onClick: (h) => s.arrayAddNewItem(l, s.item)
                  }, t[3] || (t[3] = [
                    f("i", { class: "bi bi-plus" }, null, -1)
                  ]), 8, CN)
                ])
              ])
            ])) : A("", !0),
            l.type == "addresses" ? (b(), y("span", SN, [
              s.item[l.name] ? (b(), y("div", xN, [
                (b(!0), y(W, null, K(s.item[l.name], (h) => (b(), y("div", { key: h }, [
                  V(O(h) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: s.formid + "_" + l.name
                  }, O(l.label), 9, LN),
                  G(f("input", {
                    class: "form-control",
                    type: "text",
                    name: l.name,
                    id: s.formid + "_" + l.name,
                    "onUpdate:modelValue": (p) => h.country = p
                  }, null, 8, kN), [
                    [jt, h.country]
                  ])
                ]))), 128))
              ])) : A("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (h) => s.insertAddress(l.name)
              }, " Add ", 8, IN)
            ])) : A("", !0),
            l.description ? (b(), y("div", RN, [
              f("i", {
                class: "text-muted",
                innerHTML: l.description
              }, null, 8, DN)
            ])) : A("", !0)
          ])
        ], 2))), 128))
      ])) : A("", !0)
    ], 2))), 128))
  ]);
}
const qN = /* @__PURE__ */ In(XA, [["render", MN], ["__scopeId", "data-v-d992c9e9"]]), $N = {
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
      return sl(s, this.settings.translate, t, e || this.settings.language);
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
}, BN = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, PN = { class: "dropdown d-inline-block m-1" }, jN = {
  type: "button",
  class: "btn btn-sm btn-secondary dropdown-toggle",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, UN = { class: "mx-1" }, VN = { key: 0 }, FN = { class: "dropdown-menu text-end" }, HN = ["onClick"], WN = { class: "ms-2" }, zN = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, KN = {
  key: 1,
  class: "bi bi-circle ms-2"
}, GN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, YN = { class: "pagination pagination-sm m-1" }, XN = { class: "page-item" }, ZN = { "aria-hidden": "true" }, QN = { class: "page-item" }, JN = { "aria-hidden": "true" }, tO = ["onClick"], eO = { class: "page-item" }, sO = { "aria-hidden": "true" }, nO = { "aria-hidden": "true" }, iO = {
  key: 0,
  class: "page-item"
}, rO = { "aria-hidden": "true" };
function oO(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? A("", !0) : (b(), y("nav", BN, [
    f("div", null, [
      f("div", PN, [
        f("button", jN, [
          G(f("span", UN, [
            f("strong", null, O(e.config.pagination.from) + "-" + O(e.config.pagination.to), 1),
            e.config.pagination.total ? (b(), y("span", VN, " / " + O(e.config.pagination.total), 1)) : A("", !0)
          ], 512), [
            [Ns, e.config.pagination.from > 0]
          ])
        ]),
        f("ul", FN, [
          f("li", null, [
            (b(!0), y(W, null, K(e.config.pagination.limits, (o) => (b(), y("span", {
              class: R(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (c) => r.setPageLimit(o)
            }, [
              f("strong", null, O(o), 1),
              f("small", WN, O(r.translate("row")) + "/" + O(r.translate("page")), 1),
              e.config.pagination.limit == o ? (b(), y("i", zN)) : A("", !0),
              e.config.pagination.limit != o ? (b(), y("i", KN)) : A("", !0)
            ], 10, HN))), 128))
          ])
        ])
      ]),
      G(f("div", GN, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ns, e.ui && e.ui.wait.table]
      ])
    ]),
    f("ul", YN, [
      f("li", XN, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", ZN, O(r.translate("First")), 1)
        ], 2)
      ]),
      f("li", QN, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{  translate('Prev')  }}"
        }, [
          f("span", JN, O(r.translate("Prev")), 1)
        ], 2)
      ]),
      (b(!0), y(W, null, K(e.config.pagination.numbers, (o) => (b(), y("li", {
        key: o,
        class: "page-item"
      }, [
        f("a", {
          class: R(["page-link cursor-pointer", {
            disabled: o > e.config.pagination.pages,
            current: o == e.config.pagination.page
          }]),
          onClick: (c) => r.setPage(o)
        }, O(o), 11, tO)
      ]))), 128)),
      f("li", eO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", sO, [
            f("span", nO, O(r.translate("Next")), 1)
          ])
        ], 2)
      ]),
      e.config.pagination.total ? (b(), y("li", iO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", rO, O(r.translate("Last")), 1)
        ], 2)
      ])) : A("", !0)
    ])
  ]));
}
const aO = /* @__PURE__ */ In($N, [["render", oO], ["__scopeId", "data-v-5ba01873"]]), lO = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminFormGroup: qN,
    VuAdminTablePagination: aO
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
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new ks(this.modalElement);
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
      return mh(s, t, this.settings, this);
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
          e[n].ids = Pb(e[n].ids), await this.fetchRelation(e[n], t);
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
      ), i = await Qn(n), r = this.getResponseErrors(n, i.data);
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
      let c = Mb(o);
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
        const r = await Qn(i);
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
        }), e = await Qn(t);
        if (this.getResponseErrors(t, e.data, "form") || !e.data)
          return this.formNoWait(), !1;
        this.settings.form.default && (e.data = Object.assign({}, this.settings.form.default, e.data)), this.settings.events && this.settings.events.afterItemLoad && this.settings.events.afterItemLoad(e.data, t);
        for (let r of this.settings.form.groups)
          for (let o of r.fields)
            o.relation && this.settings.relations[o.relation.entity] && (o.relation = Object.assign(
              {},
              this.settings.relations[o.relation.entity],
              o.relation
            ), await this.fetchRelation(o.relation));
        let i;
        this.settings.form.api.input.item ? i = typeof this.settings.form.api.input.item == "string" ? e.data[this.settings.form.api.input.item] : this.settings.form.api.input.item(e.data, t) : i = e.data, this.item = br(i), this.itemOriginal = Object.assign({}, i), this.formNoWait();
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
        ), this.item = br(e), this.itemOriginal = Object.assign({}, e)), s === !0 && this.modalWindow.hide(), this.reloadTable();
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
          for (let p in s)
            this.settings.form.api.output.fields.includes(p) && (i[p] = s[p]);
        else
          Object.assign(i, s);
        this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, s);
        let o;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = qb(i)), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let p = {};
          p[this.settings.form.api.output.item] = i, o = JSON.stringify(p);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const c = r ? "PUT" : "POST", a = await fetch(
          As(c, this.settings.form.api, r, n),
          Ts(c, this.settings.form.api, {
            body: o
          })
        ), l = await Qn(a), h = this.getResponseErrors(a, l.data);
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
        }), n = await Qn(e), i = this.getResponseErrors(e, n.data);
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
      let e = t.value;
      s.multiple ? jb(s.value, e) : s.value = s.value === e ? null : e, this.reloadTable();
    },
    dropdownSelectAll(s, t) {
      Ub(s, t), this.reloadTable();
    },
    dropdownSelectInvert(s, t) {
      Vb(s, t), this.reloadTable();
    },
    dropdownSelectClear(s) {
      typeof s != "object" ? s.value = null : Fb(s), this.reloadTable();
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
        let i = $b(
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
      return sl(s, this.settings.translate, t, e || this.settings.language);
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
}, cO = { key: 0 }, uO = ["data-bs-theme"], hO = { class: "vua-table-title" }, dO = { class: "d-flex align-items-center justify-content-between" }, fO = { class: "d-inline-block" }, pO = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, gO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, mO = {
  key: 0,
  class: "d-inline-block"
}, bO = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, yO = ["innerHTML"], _O = { class: "dropdown d-inline-block" }, vO = ["innerHTML"], EO = { class: "dropdown-menu text-start" }, wO = { class: "me-2 text-muted" }, TO = ["innerHTML"], AO = ["onClick"], NO = {
  key: 1,
  class: "dropdown d-inline-block"
}, OO = { class: "mx-1" }, CO = { key: 0 }, SO = { class: "dropdown-menu" }, xO = ["onClick"], LO = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, kO = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, IO = { class: "badge text-secondary fw-normal" }, RO = {
  key: 2,
  class: "dropdown d-inline-block"
}, DO = { class: "mx-1" }, MO = { class: "dropdown-menu" }, qO = ["onClick"], $O = { class: "vua-table-header" }, BO = ["width"], PO = ["onClick"], jO = ["innerHTML"], UO = {
  key: 0,
  class: "bi bi-arrow-down"
}, VO = {
  key: 1,
  class: "bi bi-arrow-up"
}, FO = { key: 0 }, HO = ["disabled", "onClick"], WO = {
  key: 0,
  class: "vua-table-filter"
}, zO = ["width"], KO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, GO = { class: "bi bi-check-all" }, YO = { class: "bi bi-x-lg" }, XO = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, ZO = ["onUpdate:modelValue"], QO = ["disabled", "onClick"], JO = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, tC = ["onUpdate:modelValue", "disabled"], eC = { value: "=" }, sC = { value: ">" }, nC = { value: ">=" }, iC = { value: "<" }, rC = { value: "<=" }, oC = ["onUpdate:modelValue", "disabled"], aC = ["value"], lC = ["onUpdate:modelValue", "disabled", "min", "max"], cC = ["disabled", "onClick"], uC = { key: 3 }, hC = {
  key: 0,
  class: "dropdown"
}, dC = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, fC = { class: "dropdown-menu" }, pC = ["onClick"], gC = {
  key: 0,
  class: "bi bi-check-square"
}, mC = {
  key: 1,
  class: "bi bi-square"
}, bC = { key: 0 }, yC = { key: 1 }, _C = ["onClick"], vC = { key: 2 }, EC = ["onClick"], wC = { key: 3 }, TC = ["onClick"], AC = ["onUpdate:modelValue", "multiple"], NC = ["value"], OC = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, CC = ["onUpdate:modelValue"], SC = { value: "=" }, xC = { value: ">" }, LC = { value: ">=" }, kC = { value: "<" }, IC = { value: "<=" }, RC = ["onUpdate:modelValue"], DC = ["value"], MC = ["type", "onUpdate:modelValue"], qC = ["disabled", "onClick"], $C = ["disabled", "onClick"], BC = { class: "align-middle" }, PC = ["data-label", "width", "onClick"], jC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, UC = ["innerHTML"], VC = { key: 1 }, FC = ["innerHTML"], HC = ["aria-valuenow", "aria-valuemax"], WC = { key: 0 }, zC = {
  key: 4,
  class: "input-group input-group-sm"
}, KC = ["innerHTML"], GC = ["type", "onChange", "onUpdate:modelValue"], YC = ["onChange", "onUpdate:modelValue"], XC = ["value"], ZC = ["innerHTML"], QC = { key: 5 }, JC = ["disabled", "onClick"], tS = ["innerHTML"], eS = { key: 2 }, sS = { key: 0 }, nS = ["colspan"], iS = { class: "row g-3 align-items-center" }, rS = { class: "col-form-label" }, oS = ["type", "onUpdate:modelValue", "onChange"], aS = ["onUpdate:modelValue", "onChange"], lS = ["onUpdate:modelValue", "onChange"], cS = ["value"], uS = ["innerHTML"], hS = {
  key: 0,
  class: "bg-light text-dark"
}, dS = {
  key: 0,
  class: "vua-table-bulk border-info"
}, fS = ["data-label", "width"], pS = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, gS = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, mS = ["type", "disabled", "onChange", "onUpdate:modelValue"], bS = ["disabled", "onChange", "onUpdate:modelValue"], yS = ["value"], _S = ["onClick"], vS = {
  key: 0,
  class: "bi bi-square text-secondary"
}, ES = {
  key: 1,
  class: "bi bi-check-square"
}, wS = { key: 2 }, TS = ["disabled", "onClick"], AS = ["innerHTML"], NS = { key: 2 }, OS = ["id"], CS = { class: "modal-dialog modal-xl" }, SS = { class: "modal-content h-100" }, xS = ["id", "data-bs-theme"], LS = { class: "modal-header" }, kS = { class: "modal-title" }, IS = ["innerHTML"], RS = { key: 1 }, DS = { key: 2 }, MS = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, qS = {
  key: 0,
  class: "d-inline-block ms-3 mt-1"
}, $S = ["innerHTML"], BS = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, PS = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, jS = ["disabled"], US = ["disabled"], VS = {
  key: 0,
  class: "d-inline-block m-1"
}, FS = { class: "dropdown d-inline-block" }, HS = ["innerHTML"], WS = { class: "dropdown-menu text-start" }, zS = { class: "me-2 text-muted" }, KS = ["innerHTML"], GS = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, YS = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, XS = {
  key: 1,
  class: "modal-body custom-scroll"
}, ZS = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, QS = ["disabled"], JS = ["disabled"], t2 = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, e2 = {
  type: "submit",
  class: "btn btn-primary m-1"
}, s2 = {
  key: 1,
  class: "bg-light text-dark"
};
function n2(s, t, e, n, i, r) {
  const o = ui("VuAdminTablePagination"), c = ui("VuAdminFormGroup");
  return e.settings && e.settings.table ? (b(), y("div", cO, [
    f("div", {
      class: R(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      f("div", {
        class: R(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", hO, [
        f("div", dO, [
          f("div", fO, [
            e.settings.table.title ? (b(), y("h5", pO, O(e.settings.table.title), 1)) : A("", !0),
            G(f("div", gO, t[26] || (t[26] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ns, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (b(), y("div", mO, [
            i.message.table ? (b(), y("small", bO, [
              f("span", {
                class: R(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, yO)
              ], 2)
            ])) : A("", !0),
            f("div", _O, [
              f("button", {
                class: R(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, vO),
              f("ul", EO, [
                (b(!0), y(W, null, K(i.messages.table, (a) => (b(), y("li", { key: a }, [
                  f("span", {
                    class: R(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    f("small", wO, O(a.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, TO)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : A("", !0)
        ])
      ]),
      e.settings.table.control ? (b(), y("div", {
        key: 0,
        class: R(["vua-table-control", [e.settings.table.control.class]])
      }, [
        (b(!0), y(W, null, K(e.settings.table.control.buttons, (a) => (b(), y("span", {
          key: a.action
        }, [
          a.action !== "TABLE_COLUMNS" && !a.dropdowns ? (b(), y("button", {
            key: 0,
            type: "button",
            class: R([
              a.class ? a.class : r.getButtonClassByAction(a.action)
            ]),
            onClick: (l) => r.tableAction(a, i.items, null, l)
          }, [
            f("i", {
              class: R([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            V(" " + O(r.translate(a.title)), 1)
          ], 10, AO)) : A("", !0),
          a.action === "TABLE_COLUMNS" ? (b(), y("div", NO, [
            f("button", {
              type: "button",
              class: R([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              G(f("span", OO, [
                f("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                V(" " + O(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (b(), y("span", CO, " ( " + O(r.countHiddenColumns()) + " " + O(r.translate("hidden")) + " ) ", 1)) : A("", !0)
              ], 512), [
                [Ns, e.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", SO, [
              (b(!0), y(W, null, K(e.settings.table.columns, (l) => (b(), y("li", { key: l }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(l)
                }, [
                  l.hidden ? A("", !0) : (b(), y("i", LO)),
                  l.hidden ? (b(), y("i", kO)) : A("", !0),
                  V(" " + O(l.title) + " ", 1),
                  f("small", IO, O(l.name), 1)
                ], 8, xO)
              ]))), 128)),
              t[27] || (t[27] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (l) => r.toggleColumn(!0))
                }, O(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (l) => r.toggleColumn(!1))
                }, O(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : A("", !0),
          a.dropdowns ? (b(), y("div", RO, [
            f("button", {
              type: "button",
              class: R([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", DO, [
                f("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                V(" " + O(r.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", MO, [
              (b(!0), y(W, null, K(a.dropdowns, (l) => (b(), y("li", { key: l }, [
                f("span", {
                  class: R(["dropdown-item cursor-pointer", [l.class]]),
                  onClick: (h) => r.tableAction(l, i.items, null, h)
                }, [
                  l.icon ? (b(), y("i", {
                    key: 0,
                    class: R([l.icon])
                  }, null, 2)) : A("", !0),
                  V(" " + O(r.translate(l.title)), 1)
                ], 10, qO)
              ]))), 128))
            ])
          ])) : A("", !0)
        ]))), 128))
      ], 2)) : A("", !0),
      e.settings.table ? (b(), y("table", {
        key: 1,
        class: R(["table vua-table mb-0", [e.settings.table.class]])
      }, [
        f("thead", null, [
          f("tr", $O, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("th", {
              class: R(["", [a.header ? a.header.class : ""]]),
              style: Yn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              f("span", {
                class: R(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (l) => r.sortTable(a)
              }, [
                f("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, jO),
                i.config.order[a.name] ? (b(), y("span", {
                  key: 0,
                  class: R(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (b(), y("i", UO)) : A("", !0),
                  i.config.order[a.name].dir === "DESC" ? (b(), y("i", VO)) : A("", !0),
                  V(" " + O(i.config.order[a.name].idx + 1), 1)
                ], 2)) : A("", !0)
              ], 10, PO),
              a.header && a.header.buttons ? (b(), y("span", FO, [
                (b(!0), y(W, null, K(a.header.buttons, (l) => (b(), y("button", {
                  key: l.action,
                  type: "button",
                  disabled: l.disabled !== void 0 ? r.getValueOrFunction(l.disabled) : null,
                  class: R([
                    l.class ? l.class : r.getButtonClassByAction(l.action)
                  ]),
                  onClick: (h) => r.tableAction(l, i.items, null, h)
                }, [
                  f("i", {
                    class: R([
                      l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                        button: l,
                        column: a,
                        table: this
                      }) : r.getButtonIconClassByAction(l.action)
                    ])
                  }, null, 2),
                  V(" " + O(r.translate(l.title)), 1)
                ], 10, HO))), 128))
              ])) : A("", !0)
            ], 14, BO))), 128))
          ]),
          r.countFilters() ? (b(), y("tr", WO, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("th", {
              style: Yn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: R([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (b(), y("div", KO, [
                f("span", {
                  class: R(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (l) => r.toggleSelectedRowInPage())
                }, [
                  G(f("i", GO, null, 512), [
                    [Ns, !r.haveSelectedRowInPage()]
                  ]),
                  G(f("i", YO, null, 512), [
                    [Ns, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : A("", !0),
              a.filter && a.filter.type == "text" ? (b(), y("div", XO, [
                G(f("input", {
                  type: "text",
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onKeyup: t[3] || (t[3] = ni((l) => r.reloadTable(), ["enter"]))
                }, null, 42, ZO), [
                  [jt, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 0,
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[28] || (t[28] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, QO)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "number" ? (b(), y("div", JO, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", eC, O(r.translate("=")), 1),
                  f("option", sC, O(r.translate(">")), 1),
                  f("option", nC, O(r.translate(">=")), 1),
                  f("option", iC, O(r.translate("<")), 1),
                  f("option", rC, O(r.translate("<=")), 1)
                ], 40, tC)), [
                  [Re, a.filter.operator]
                ]) : A("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (b(!0), y(W, null, K(a.filter.operators, (l) => (b(), y("option", {
                    key: l,
                    value: l.value
                  }, O(l.label), 9, aC))), 128))
                ], 40, oC)), [
                  [Re, a.filter.operator]
                ]) : A("", !0),
                G(f("input", {
                  type: "number",
                  class: R(["form-control", {
                    fixed: a.filter.fixed
                  }]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  disabled: a.filter.fixed,
                  min: a.filter.min,
                  max: a.filter.max,
                  onChange: t[6] || (t[6] = (l) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = ni((l) => r.reloadTable(), ["enter"]))
                }, null, 42, lC), [
                  [jt, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 2,
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[29] || (t[29] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, cC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "select" ? (b(), y("div", uC, [
                a.filter.dropdown ? (b(), y("div", hC, [
                  f("button", dC, O(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  f("ul", fC, [
                    f("li", null, [
                      (b(!0), y(W, null, K(a.filter.options, (l) => (b(), y("span", {
                        key: l,
                        class: R(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, l)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value) ? (b(), y("i", gC)) : (b(), y("i", mC)),
                        V(" " + O(r.translate(l.label ? l.label : l.value)), 1)
                      ], 10, pC))), 128))
                    ]),
                    a.filter.multiple ? (b(), y("li", bC, t[30] || (t[30] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : A("", !0),
                    a.filter.multiple ? (b(), y("li", yC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, O(r.translate("Select all")), 9, _C)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", vC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectClear(a.filter.value)
                      }, O(r.translate("Unselect all")), 9, EC)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", wC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, O(r.translate("Invert all")), 9, TC)
                    ])) : A("", !0)
                  ])
                ])) : G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onChange: t[8] || (t[8] = (l) => r.reloadTable()),
                  multiple: a.filter.multiple,
                  class: "form-select form-select-sm pe-0 my-1"
                }, [
                  (b(!0), y(W, null, K(a.filter.options, (l) => (b(), y("option", {
                    key: l,
                    value: l.value
                  }, O(r.translate(l.label ? l.label : l.value)), 9, NC))), 128))
                ], 40, AC)), [
                  [Re, a.filter.value]
                ])
              ])) : A("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (b(), y("div", OC, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  onChange: t[9] || (t[9] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", SC, O(r.translate("=")), 1),
                  f("option", xC, O(r.translate(">")), 1),
                  f("option", LC, O(r.translate(">=")), 1),
                  f("option", kC, O(r.translate("<")), 1),
                  f("option", IC, O(r.translate("<=")), 1)
                ], 40, CC)), [
                  [Re, a.filter.operator]
                ]) : A("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  onChange: t[10] || (t[10] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (b(!0), y(W, null, K(a.filter.operators, (l) => (b(), y("option", {
                    key: l,
                    value: l.value
                  }, O(r.translate(l.label)), 9, DC))), 128))
                ], 40, RC)), [
                  [Re, a.filter.operator]
                ]) : A("", !0),
                G(f("input", {
                  type: a.filter.type,
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onChange: t[11] || (t[11] = (l) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ni((l) => r.reloadTable(), ["enter"]))
                }, null, 42, MC), [
                  [dn, a.filter.value]
                ]),
                f("button", {
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[31] || (t[31] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, qC)
              ])) : A("", !0),
              a.filter && a.filter.buttons ? (b(), y("span", {
                key: 5,
                class: R(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (b(!0), y(W, null, K(a.filter.buttons, (l) => (b(), y("span", {
                  key: l.action
                }, [
                  f("button", {
                    type: "button",
                    disabled: l.disabled !== void 0 ? r.getValueOrFunction(l.disabled) : null,
                    class: R([
                      l.class ? l.class : r.getButtonClassByAction(l.action)
                    ]),
                    onClick: (h) => r.tableAction(l, i.items, null, h)
                  }, [
                    f("i", {
                      class: R([
                        l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                          button: l,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(l.action)
                      ])
                    }, null, 2),
                    V(" " + O(r.translate(l.title)), 1)
                  ], 10, $C)
                ]))), 128))
              ], 2)) : A("", !0)
            ], 14, zO))), 128))
          ])) : A("", !0)
        ]),
        f("tbody", null, [
          (b(!0), y(W, null, K(this.items, (a, l) => (b(), y(W, {
            key: a.id
          }, [
            f("tr", BC, [
              (b(!0), y(W, null, K(e.settings.table.columns, (h) => (b(), y("td", {
                style: Yn([h.hidden ? "display: none" : ""]),
                key: h.name,
                "data-label": h.title ? h.title : r.translate(h.name),
                width: h.width,
                class: R(
                  r.getValueOrFunction(h.class, {
                    column: h,
                    item: a
                  })
                ),
                onClick: (p) => r.tableAction(h, a, l, p)
              }, [
                h.index ? (b(), y("div", jC, [
                  f("span", {
                    class: R(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: l + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, UC)
                ])) : A("", !0),
                !h.template && !h.input && !h.progressbar ? (b(), y("span", VC, O(r.tableCellValue(h.name, a, l, h)), 1)) : A("", !0),
                h.template ? (b(), y("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, l, h)
                }, null, 8, FC)) : A("", !0),
                h.progressbar ? (b(), y("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": a[h.name],
                  "aria-valuemax": h.progressbar.max
                }, [
                  f("div", {
                    class: R(["progress-bar", [h.progressbar.class]]),
                    style: Yn({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (b(), y("span", WC, O(a[h.name]), 1)) : A("", !0)
                  ], 6)
                ], 8, HC)) : A("", !0),
                h.input ? (b(), y("div", zC, [
                  h.input.prefix ? (b(), y("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, KC)) : A("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    h.input.type
                  ) >= 0 ? G((b(), y("input", {
                    key: 1,
                    type: h.input.type,
                    class: R(["form-control form-control-sm", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (p) => r.onRowInputChange(a[h.name], h, a, l),
                    "onUpdate:modelValue": (p) => a[h.name] = p
                  }, null, 42, GC)), [
                    [dn, a[h.name]]
                  ]) : A("", !0),
                  h.input.type == "select" ? G((b(), y("select", {
                    key: 2,
                    class: R(["form-select form-select-sm pe-0", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (p) => r.onRowInputChange(a[h.name], h, a, l),
                    "onUpdate:modelValue": (p) => a[h.name] = p
                  }, [
                    (b(!0), y(W, null, K(h.input.options, (p) => (b(), y("option", {
                      value: p.value,
                      key: p
                    }, O(r.translate(p.label)), 9, XC))), 128))
                  ], 42, YC)), [
                    [Re, a[h.name]]
                  ]) : A("", !0),
                  h.input.suffix ? (b(), y("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, ZC)) : A("", !0)
                ])) : A("", !0),
                h.buttons ? (b(), y("span", QC, [
                  (b(!0), y(W, null, K(h.buttons, (p) => (b(), y("span", {
                    key: p.action
                  }, [
                    f("button", {
                      type: "button",
                      disabled: p.disabled !== void 0 ? r.getValueOrFunction(p.disabled) : null,
                      class: R([
                        p.class ? r.getValueOrFunction(p.class, {
                          button: p,
                          column: h,
                          item: a,
                          table: this
                        }) : r.getButtonClassByAction(p.action)
                      ]),
                      onClick: (g) => r.tableAction(p, a, l, g)
                    }, [
                      p.icon !== null ? (b(), y("i", {
                        key: 0,
                        class: R([
                          p.icon !== void 0 ? r.getValueOrFunction(p.icon, {
                            button: p,
                            column: h,
                            item: a,
                            table: this
                          }) : r.getButtonIconClassByAction(p.action)
                        ])
                      }, null, 2)) : A("", !0),
                      p.template ? (b(), y("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(p.template, a, l, h)
                      }, null, 8, tS)) : (b(), y("span", eS, O(r.translate(p.title)), 1))
                    ], 10, JC)
                  ]))), 128))
                ])) : A("", !0)
              ], 14, PC))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (b(), y("tr", sS, [
              f("td", {
                class: R([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (b(!0), y(W, null, K(e.settings.table.details.fields, (h) => (b(), y("div", {
                  class: "m-0",
                  key: h
                }, [
                  f("div", iS, [
                    f("div", {
                      class: R(["col text-end", [h.class]])
                    }, [
                      f("label", rS, O(h.label), 1)
                    ], 2),
                    f("div", {
                      class: R(["col", [h.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(h.input.type) < 0 ? G((b(), y("input", {
                        key: 0,
                        type: h.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (p) => a[h.name] = p,
                        onChange: (p) => r.onRowInputChange(a[h.name], h, a, l)
                      }, null, 40, oS)), [
                        [dn, a[h.name]]
                      ]) : A("", !0),
                      h.input.type == "textarea" ? G((b(), y("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (p) => a[h.name] = p,
                        onChange: (p) => r.onRowInputChange(a[h.name], h, a, l)
                      }, `\r
                    `, 40, aS)), [
                        [jt, a[h.name]]
                      ]) : A("", !0),
                      h.input.type == "select" ? G((b(), y("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (p) => a[h.name] = p,
                        onChange: (p) => r.onRowInputChange(a[h.name], h, a, l)
                      }, [
                        (b(!0), y(W, null, K(h.input.options, (p) => (b(), y("option", {
                          value: p.value,
                          key: p
                        }, O(r.translate(p.label)), 9, cS))), 128))
                      ], 40, lS)), [
                        [Re, a[h.name]]
                      ]) : A("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, uS),
                e.settings.debug ? (b(), y("pre", hS, "                " + O(a) + `
              `, 1)) : A("", !0)
              ], 10, nS)
            ])) : A("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (b(), y("tr", dS, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("td", {
              style: Yn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: R(a.class)
            }, [
              a.index ? (b(), y("div", pS, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (l) => r.toggleSelectedAll())
                }, O(i.selected.length), 1)
              ])) : A("", !0),
              a.input && a.bulk && a.bulk.enabled ? (b(), y("div", gS, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? G((b(), y("input", {
                  key: 0,
                  type: a.input.type,
                  class: R(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (l) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (l) => i.bulkitem[a.name] = l
                }, null, 42, mS)), [
                  [dn, i.bulkitem[a.name]]
                ]) : A("", !0),
                a.input.type == "select" ? G((b(), y("select", {
                  key: 1,
                  class: R(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (l) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (l) => i.bulkitem[a.name] = l
                }, [
                  (b(!0), y(W, null, K(a.input.options, (l) => (b(), y("option", {
                    value: l.value,
                    key: l
                  }, O(r.translate(l.label)), 9, yS))), 128))
                ], 42, bS)), [
                  [Re, i.bulkitem[a.name]]
                ]) : A("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (l) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (b(), y("i", vS)) : (b(), y("i", ES))
                ], 8, _S)
              ])) : A("", !0),
              a.bulk ? (b(), y("span", wS, [
                (b(!0), y(W, null, K(a.bulk.buttons, (l) => (b(), y("span", {
                  key: l.action
                }, [
                  f("button", {
                    type: "button",
                    class: R([
                      l.class ? l.class : r.getButtonClassByAction(l.action)
                    ]),
                    disabled: l.action === "save" && !this.bulkinputs.length,
                    onClick: (h) => r.tableBulkAction(l.action, i.bulkitem, a, h)
                  }, [
                    l.icon !== null ? (b(), y("i", {
                      key: 0,
                      class: R([
                        l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                          button: l,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(l.action)
                      ])
                    }, null, 2)) : A("", !0),
                    l.template ? (b(), y("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(l.template, i.bulkitem, null, a)
                    }, null, 8, AS)) : (b(), y("span", NS, O(r.translate(l.title)), 1))
                  ], 10, TS)
                ]))), 128))
              ])) : A("", !0)
            ], 14, fS))), 128))
          ])) : A("", !0)
        ])
      ], 2)) : A("", !0),
      fu(o, {
        settings: e.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"]),
      f("div", {
        class: "modal shadow",
        id: i.modalId,
        tabindex: "-1"
      }, [
        f("div", CS, [
          f("div", SS, [
            i.item ? (b(), y("form", {
              key: 0,
              ref: "form",
              id: s.formId,
              class: R(["form", [e.settings.form.class, { wait: i.ui.wait.form }]]),
              onSubmit: t[25] || (t[25] = na((...a) => r.submitItem && r.submitItem(...a), ["prevent"])),
              "data-bs-theme": [e.settings.theme]
            }, [
              f("div", {
                class: R(["vua-overlay", { blocked: i.ui.block.form }])
              }, null, 2),
              f("div", LS, [
                f("h5", kS, [
                  e.settings.form.title && typeof e.settings.form.title == "function" ? (b(), y("span", {
                    key: 0,
                    innerHTML: e.settings.form.title(i.item, e.settings)
                  }, null, 8, IS)) : A("", !0),
                  e.settings.form.title && typeof e.settings.form.title == "string" ? (b(), y("span", RS, O(r.translate(e.settings.form.title)), 1)) : A("", !0),
                  e.settings.form.title ? A("", !0) : (b(), y("span", DS, O(r.translate("Edit")), 1)),
                  i.item[e.settings.pkey] ? (b(), y("small", MS, [
                    t[32] || (t[32] = f("span", { class: "text-muted fw-light" }, "id", -1)),
                    V(" " + O(i.item[e.settings.pkey]), 1)
                  ])) : A("", !0)
                ]),
                i.message.form ? (b(), y("span", qS, [
                  f("span", {
                    class: R(["text-" + i.message.form.priority])
                  }, [
                    t[33] || (t[33] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
                    f("span", {
                      innerHTML: i.message.form.msg
                    }, null, 8, $S)
                  ], 2)
                ])) : A("", !0),
                G(f("span", BS, t[34] || (t[34] = [
                  f("span", { class: "visually-hidden" }, "Loading...", -1)
                ]), 512), [
                  [Ns, i.ui.wait.form]
                ]),
                t[35] || (t[35] = f("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "modal",
                  "aria-label": "Close"
                }, null, -1))
              ]),
              i.item ? (b(), y("div", PS, [
                f("div", null, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-secondary m-1",
                    onClick: t[14] || (t[14] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[36] || (t[36] = f("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    V(" " + O(r.translate("Reload")), 1)
                  ], 8, jS),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[15] || (t[15] = (a) => r.createItem())
                  }, [
                    t[37] || (t[37] = f("i", { class: "bi bi-plus-circle" }, null, -1)),
                    V(" " + O(r.translate("New")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[16] || (t[16] = (a) => r.copyItem())
                  }, [
                    t[38] || (t[38] = f("i", { class: "bi bi-copy" }, null, -1)),
                    V(" " + O(r.translate("Copy")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-danger m-1",
                    onClick: t[17] || (t[17] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[39] || (t[39] = f("i", { class: "bi bi-trash" }, null, -1)),
                    V(" " + O(r.translate("Delete")), 1)
                  ], 8, US)
                ]),
                f("div", null, [
                  i.messages.form.length ? (b(), y("div", VS, [
                    f("div", FS, [
                      f("button", {
                        class: R(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.form[0].priority]]),
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false",
                        innerHTML: i.messages.form.length + " " + (i.messages.form.length > 1 ? r.translate("messages") : r.translate("message"))
                      }, null, 10, HS),
                      f("ul", WS, [
                        (b(!0), y(W, null, K(i.messages.form, (a) => (b(), y("li", { key: a }, [
                          f("span", {
                            class: R(["dropdown-item", ["text-" + a.priority]])
                          }, [
                            f("small", zS, O(a.datetime), 1),
                            f("span", {
                              innerHTML: a.msg
                            }, null, 8, KS)
                          ], 2)
                        ]))), 128))
                      ])
                    ])
                  ])) : A("", !0),
                  f("button", GS, [
                    t[40] || (t[40] = f("i", { class: "bi bi-x" }, null, -1)),
                    V(" " + O(r.translate("Close")), 1)
                  ]),
                  f("button", YS, [
                    t[41] || (t[41] = f("i", { class: "bi bi-save" }, null, -1)),
                    V(" " + O(r.translate("Save")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-success m-1",
                    onClick: t[18] || (t[18] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[42] || (t[42] = f("i", { class: "bi bi-save" }, null, -1)),
                    V(" " + O(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : A("", !0),
              e.settings.form ? (b(), y("div", XS, [
                i.item && e.settings.form.groups ? (b(), ia(c, {
                  key: 0,
                  modelValue: i.item,
                  "onUpdate:modelValue": t[19] || (t[19] = (a) => i.item = a),
                  formid: s.formId,
                  settings: e.settings
                }, null, 8, ["modelValue", "formid", "settings"])) : A("", !0)
              ])) : A("", !0),
              i.item ? (b(), y("div", ZS, [
                f("div", null, [
                  f("button", {
                    type: "button",
                    class: "btn btn-secondary m-1",
                    onClick: t[20] || (t[20] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[43] || (t[43] = f("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    V(" " + O(r.translate("Reload")), 1)
                  ], 8, QS),
                  f("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[21] || (t[21] = (a) => r.createItem())
                  }, [
                    t[44] || (t[44] = f("i", { class: "bi bi-plus-circle" }, null, -1)),
                    V(" " + O(r.translate("New")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[22] || (t[22] = (a) => r.copyItem())
                  }, [
                    t[45] || (t[45] = f("i", { class: "bi bi-copy" }, null, -1)),
                    V(" " + O(r.translate("Copy")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-danger m-1",
                    onClick: t[23] || (t[23] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[46] || (t[46] = f("i", { class: "bi bi-trash" }, null, -1)),
                    V(" " + O(r.translate("Delete")), 1)
                  ], 8, JS)
                ]),
                f("div", null, [
                  f("button", t2, [
                    t[47] || (t[47] = f("i", { class: "bi bi-x" }, null, -1)),
                    V(" " + O(r.translate("Close")), 1)
                  ]),
                  f("button", e2, [
                    t[48] || (t[48] = f("i", { class: "bi bi-save" }, null, -1)),
                    V(" " + O(r.translate("Save")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-success m-1",
                    onClick: t[24] || (t[24] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[49] || (t[49] = f("i", { class: "bi bi-save" }, null, -1)),
                    V(" " + O(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : A("", !0)
            ], 42, xS)) : A("", !0),
            e.settings.debug ? (b(), y("pre", s2, "        " + O(i.item) + `
      `, 1)) : A("", !0)
          ])
        ])
      ], 8, OS)
    ], 10, uO)
  ])) : A("", !0);
}
const i2 = /* @__PURE__ */ In(lO, [["render", n2], ["__scopeId", "data-v-a93e8966"]]), r2 = {
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
      if (this.settings = gh(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, !this.settings.theme) {
        const s = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = s || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.2.5"), console.log(`Entity config (${this.entity}) initialized`));
    } else
      console.log("vu-admin ", "1.2.5"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: i2
  }
}, o2 = { key: 0 }, a2 = ["data-bs-theme"];
function l2(s, t, e, n, i, r) {
  const o = ui("vu-admin-table");
  return e.entity && i.settings ? (b(), y("div", o2, [
    f("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      fu(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, a2)
  ])) : A("", !0);
}
const c2 = /* @__PURE__ */ In(r2, [["render", l2]]), b2 = {
  install(s) {
    s.component("VuAdmin", c2);
  }
};
export {
  c2 as VuAdmin,
  b2 as default
};
