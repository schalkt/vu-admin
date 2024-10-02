var Ld = Object.defineProperty;
var kd = (s, t, e) => t in s ? Ld(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var M = (s, t, e) => kd(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as b, createElementBlock as y, createElementVNode as f, normalizeClass as R, Fragment as W, renderList as K, toDisplayString as S, createCommentVNode as A, withDirectives as G, vModelText as jt, createTextVNode as U, resolveComponent as li, vModelCheckbox as Id, vModelSelect as Re, createBlock as na, vModelDynamic as dn, vShow as Ns, normalizeStyle as Yn, withKeys as Co, createVNode as du, withModifiers as Rd } from "vue";
var Tt = "top", kt = "bottom", It = "right", At = "left", wr = "auto", Sn = [Tt, kt, It, At], xs = "start", bn = "end", fu = "clippingParents", $a = "viewport", sn = "popper", pu = "reference", ia = /* @__PURE__ */ Sn.reduce(function(s, t) {
  return s.concat([t + "-" + xs, t + "-" + bn]);
}, []), Ba = /* @__PURE__ */ [].concat(Sn, [wr]).reduce(function(s, t) {
  return s.concat([t, t + "-" + xs, t + "-" + bn]);
}, []), gu = "beforeRead", mu = "read", bu = "afterRead", yu = "beforeMain", vu = "main", _u = "afterMain", Eu = "beforeWrite", wu = "write", Tu = "afterWrite", Au = [gu, mu, bu, yu, vu, _u, Eu, wu, Tu];
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
function Wt(s) {
  var t = Rt(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
}
function Pa(s) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Rt(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
}
function Dd(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !Wt(r) || !_e(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
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
      !Wt(i) || !_e(i) || (Object.assign(i.style, c), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const ja = {
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
var Ss = Math.max, hr = Math.min, yn = Math.round;
function ra() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Nu() {
  return !/^((?!chrome|android).)*safari/i.test(ra());
}
function vn(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Wt(s) && (i = s.offsetWidth > 0 && yn(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && yn(n.height) / s.offsetHeight || 1);
  var o = Ls(s) ? Rt(s) : window, c = o.visualViewport, a = !Nu() && e, l = (n.left + (a && c ? c.offsetLeft : 0)) / i, h = (n.top + (a && c ? c.offsetTop : 0)) / r, p = n.width / i, g = n.height / r;
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
function Ua(s) {
  var t = vn(s), e = s.offsetWidth, n = s.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: s.offsetLeft,
    y: s.offsetTop,
    width: e,
    height: n
  };
}
function Ou(s, t) {
  var e = t.getRootNode && t.getRootNode();
  if (s.contains(t))
    return !0;
  if (e && Pa(e)) {
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
  return ["table", "td", "th"].indexOf(_e(s)) >= 0;
}
function rs(s) {
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
    (Pa(s) ? s.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    rs(s)
  );
}
function xl(s) {
  return !Wt(s) || // https://github.com/popperjs/popper-core/issues/837
  qe(s).position === "fixed" ? null : s.offsetParent;
}
function $d(s) {
  var t = /firefox/i.test(ra()), e = /Trident/i.test(ra());
  if (e && Wt(s)) {
    var n = qe(s);
    if (n.position === "fixed")
      return null;
  }
  var i = Tr(s);
  for (Pa(i) && (i = i.host); Wt(i) && ["html", "body"].indexOf(_e(i)) < 0; ) {
    var r = qe(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function yi(s) {
  for (var t = Rt(s), e = xl(s); e && qd(e) && qe(e).position === "static"; )
    e = xl(e);
  return e && (_e(e) === "html" || _e(e) === "body" && qe(e).position === "static") ? t : e || $d(s) || t;
}
function Va(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function si(s, t, e) {
  return Ss(s, hr(t, e));
}
function Bd(s, t, e) {
  var n = si(s, t, e);
  return n > e ? e : n;
}
function Cu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Su(s) {
  return Object.assign({}, Cu(), s);
}
function xu(s, t) {
  return t.reduce(function(e, n) {
    return e[n] = s, e;
  }, {});
}
var Pd = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Su(typeof t != "number" ? t : xu(t, Sn));
};
function jd(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, c = me(e.placement), a = Va(c), l = [At, It].indexOf(c) >= 0, h = l ? "height" : "width";
  if (!(!r || !o)) {
    var p = Pd(i.padding, e), g = Ua(r), m = a === "y" ? Tt : At, _ = a === "y" ? kt : It, E = e.rects.reference[h] + e.rects.reference[a] - o[a] - e.rects.popper[h], w = o[a] - e.rects.reference[a], T = yi(r), O = T ? a === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, x = E / 2 - w / 2, L = p[m], I = O - g[h] - p[_], D = O / 2 - g[h] / 2 + x, P = si(L, D, I), F = a;
    e.modifiersData[n] = (t = {}, t[F] = P, t.centerOffset = P - D, t);
  }
}
function Ud(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Ou(t.elements.popper, i) && (t.elements.arrow = i));
}
const Lu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: jd,
  effect: Ud,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function _n(s) {
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
function Ll(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, c = s.position, a = s.gpuAcceleration, l = s.adaptive, h = s.roundOffsets, p = s.isFixed, g = o.x, m = g === void 0 ? 0 : g, _ = o.y, E = _ === void 0 ? 0 : _, w = typeof h == "function" ? h({
    x: m,
    y: E
  }) : {
    x: m,
    y: E
  };
  m = w.x, E = w.y;
  var T = o.hasOwnProperty("x"), O = o.hasOwnProperty("y"), x = At, L = Tt, I = window;
  if (l) {
    var D = yi(e), P = "clientHeight", F = "clientWidth";
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
    return Object.assign({}, nt, (it = {}, it[L] = O ? "0" : "", it[x] = T ? "0" : "", it.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + E + "px)" : "translate3d(" + m + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[L] = O ? E + "px" : "", t[x] = T ? m + "px" : "", t.transform = "", t));
}
function Hd(s) {
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, c = e.roundOffsets, a = c === void 0 ? !0 : c, l = {
    placement: me(t.placement),
    variation: _n(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ll(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ll(Object.assign({}, l, {
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
  fn: Hd,
  data: {}
};
var zi = {
  passive: !0
};
function Wd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, c = o === void 0 ? !0 : o, a = Rt(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && l.forEach(function(h) {
    h.addEventListener("scroll", e.update, zi);
  }), c && a.addEventListener("resize", e.update, zi), function() {
    r && l.forEach(function(h) {
      h.removeEventListener("scroll", e.update, zi);
    }), c && a.removeEventListener("resize", e.update, zi);
  };
}
const Ha = {
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
function rr(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return zd[t];
  });
}
var Kd = {
  start: "end",
  end: "start"
};
function kl(s) {
  return s.replace(/start|end/g, function(t) {
    return Kd[t];
  });
}
function Wa(s) {
  var t = Rt(s), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function za(s) {
  return vn(rs(s)).left + Wa(s).scrollLeft;
}
function Gd(s, t) {
  var e = Rt(s), n = rs(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var l = Nu();
    (l || !l && t === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: c + za(s),
    y: a
  };
}
function Yd(s) {
  var t, e = rs(s), n = Wa(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = Ss(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Ss(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -n.scrollLeft + za(s), a = -n.scrollTop;
  return qe(i || e).direction === "rtl" && (c += Ss(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: c,
    y: a
  };
}
function Ka(s) {
  var t = qe(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function ku(s) {
  return ["html", "body", "#document"].indexOf(_e(s)) >= 0 ? s.ownerDocument.body : Wt(s) && Ka(s) ? s : ku(Tr(s));
}
function ni(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = ku(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Ka(n) ? n : []) : n, c = t.concat(o);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(ni(Tr(o)))
  );
}
function oa(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
}
function Xd(s, t) {
  var e = vn(s, !1, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Il(s, t, e) {
  return t === $a ? oa(Gd(s, e)) : Ls(t) ? Xd(t, e) : oa(Yd(rs(s)));
}
function Zd(s) {
  var t = ni(Tr(s)), e = ["absolute", "fixed"].indexOf(qe(s).position) >= 0, n = e && Wt(s) ? yi(s) : s;
  return Ls(n) ? t.filter(function(i) {
    return Ls(i) && Ou(i, n) && _e(i) !== "body";
  }) : [];
}
function Qd(s, t, e, n) {
  var i = t === "clippingParents" ? Zd(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], c = r.reduce(function(a, l) {
    var h = Il(s, l, n);
    return a.top = Ss(h.top, a.top), a.right = hr(h.right, a.right), a.bottom = hr(h.bottom, a.bottom), a.left = Ss(h.left, a.left), a;
  }, Il(s, o, n));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function Iu(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? me(n) : null, r = n ? _n(n) : null, o = t.x + t.width / 2 - e.width / 2, c = t.y + t.height / 2 - e.height / 2, a;
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
  var l = i ? Va(i) : null;
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
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, c = e.boundary, a = c === void 0 ? fu : c, l = e.rootBoundary, h = l === void 0 ? $a : l, p = e.elementContext, g = p === void 0 ? sn : p, m = e.altBoundary, _ = m === void 0 ? !1 : m, E = e.padding, w = E === void 0 ? 0 : E, T = Su(typeof w != "number" ? w : xu(w, Sn)), O = g === sn ? pu : sn, x = s.rects.popper, L = s.elements[_ ? O : g], I = Qd(Ls(L) ? L : L.contextElement || rs(s.elements.popper), a, h, o), D = vn(s.elements.reference), P = Iu({
    reference: D,
    element: x,
    strategy: "absolute",
    placement: i
  }), F = oa(Object.assign({}, x, P)), J = g === sn ? F : D, tt = {
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
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, c = e.flipVariations, a = e.allowedAutoPlacements, l = a === void 0 ? Ba : a, h = _n(n), p = h ? c ? ia : ia.filter(function(_) {
    return _n(_) === h;
  }) : Sn, g = p.filter(function(_) {
    return l.indexOf(_) >= 0;
  });
  g.length === 0 && (g = p);
  var m = g.reduce(function(_, E) {
    return _[E] = En(s, {
      placement: E,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[me(E)], _;
  }, {});
  return Object.keys(m).sort(function(_, E) {
    return m[_] - m[E];
  });
}
function tf(s) {
  if (me(s) === wr)
    return [];
  var t = rr(s);
  return [kl(s), t, kl(t)];
}
function ef(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !0 : o, a = e.fallbackPlacements, l = e.padding, h = e.boundary, p = e.rootBoundary, g = e.altBoundary, m = e.flipVariations, _ = m === void 0 ? !0 : m, E = e.allowedAutoPlacements, w = t.options.placement, T = me(w), O = T === w, x = a || (O || !_ ? [rr(w)] : tf(w)), L = [w].concat(x).reduce(function(Xt, z) {
      return Xt.concat(me(z) === wr ? Jd(t, {
        placement: z,
        boundary: h,
        rootBoundary: p,
        padding: l,
        flipVariations: _,
        allowedAutoPlacements: E
      }) : z);
    }, []), I = t.rects.reference, D = t.rects.popper, P = /* @__PURE__ */ new Map(), F = !0, J = L[0], tt = 0; tt < L.length; tt++) {
      var nt = L[tt], ot = me(nt), it = _n(nt) === xs, Mt = [Tt, kt].indexOf(ot) >= 0, qt = Mt ? "width" : "height", ut = En(t, {
        placement: nt,
        boundary: h,
        rootBoundary: p,
        altBoundary: g,
        padding: l
      }), _t = Mt ? it ? It : At : it ? kt : Tt;
      I[qt] > D[qt] && (_t = rr(_t));
      var Fe = rr(_t), Yt = [];
      if (r && Yt.push(ut[ot] <= 0), c && Yt.push(ut[_t] <= 0, ut[Fe] <= 0), Yt.every(function(Xt) {
        return Xt;
      })) {
        J = nt, F = !1;
        break;
      }
      P.set(nt, Yt);
    }
    if (F)
      for (var Y = _ ? 3 : 1, us = function(z) {
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
function Rl(s, t, e) {
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
function Dl(s) {
  return [Tt, It, kt, At].some(function(t) {
    return s[t] >= 0;
  });
}
function sf(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = En(t, {
    elementContext: "reference"
  }), c = En(t, {
    altBoundary: !0
  }), a = Rl(o, n), l = Rl(c, i, r), h = Dl(a), p = Dl(l);
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
const Du = {
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
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Ba.reduce(function(h, p) {
    return h[p] = nf(p, t.rects, r), h;
  }, {}), c = o[t.placement], a = c.x, l = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += l), t.modifiersData[n] = o;
}
const Mu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: rf
};
function of(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = Iu({
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
  fn: of,
  data: {}
};
function af(s) {
  return s === "x" ? "y" : "x";
}
function lf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !1 : o, a = e.boundary, l = e.rootBoundary, h = e.altBoundary, p = e.padding, g = e.tether, m = g === void 0 ? !0 : g, _ = e.tetherOffset, E = _ === void 0 ? 0 : _, w = En(t, {
    boundary: a,
    rootBoundary: l,
    padding: p,
    altBoundary: h
  }), T = me(t.placement), O = _n(t.placement), x = !O, L = Va(T), I = af(L), D = t.modifiersData.popperOffsets, P = t.rects.reference, F = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
      var it, Mt = L === "y" ? Tt : At, qt = L === "y" ? kt : It, ut = L === "y" ? "height" : "width", _t = D[L], Fe = _t + w[Mt], Yt = _t - w[qt], Y = m ? -F[ut] / 2 : 0, us = O === xs ? P[ut] : F[ut], Ae = O === xs ? -F[ut] : -P[ut], pt = t.elements.arrow, Xt = m && pt ? Ua(pt) : {
        width: 0,
        height: 0
      }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Cu(), ce = z[Mt], He = z[qt], at = si(0, P[ut], Xt[ut]), We = x ? P[ut] / 2 - Y - at - ce - tt.mainAxis : us - at - ce - tt.mainAxis, Fs = x ? -P[ut] / 2 + Y + at + He + tt.mainAxis : Ae + at + He + tt.mainAxis, Ne = t.elements.arrow && yi(t.elements.arrow), hs = Ne ? L === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0 : 0, ds = (it = nt == null ? void 0 : nt[L]) != null ? it : 0, fs = _t + We - ds - hs, Hs = _t + Fs - ds, ze = si(m ? hr(Fe, fs) : Fe, _t, m ? Ss(Yt, Hs) : Yt);
      D[L] = ze, ot[L] = ze - _t;
    }
    if (c) {
      var ps, Rn = L === "x" ? Tt : At, Dn = L === "x" ? kt : It, Nt = D[I], ue = I === "y" ? "height" : "width", gs = Nt + w[Rn], ms = Nt - w[Dn], Ot = [Tt, At].indexOf(T) !== -1, Oe = (ps = nt == null ? void 0 : nt[I]) != null ? ps : 0, Ws = Ot ? gs : Nt - P[ue] - F[ue] - Oe + tt.altAxis, he = Ot ? Nt + P[ue] + F[ue] - Oe - tt.altAxis : ms, Ce = m && Ot ? Bd(Ws, Nt, he) : si(m ? Ws : gs, Nt, m ? he : ms);
      D[I] = Ce, ot[I] = Ce - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const qu = {
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
  return s === Rt(s) || !Wt(s) ? Wa(s) : cf(s);
}
function hf(s) {
  var t = s.getBoundingClientRect(), e = yn(t.width) / s.offsetWidth || 1, n = yn(t.height) / s.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function df(s, t, e) {
  e === void 0 && (e = !1);
  var n = Wt(t), i = Wt(t) && hf(t), r = rs(t), o = vn(s, i, e), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((_e(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ka(r)) && (c = uf(t)), Wt(t) ? (a = vn(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = za(r))), {
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
  return Au.reduce(function(e, n) {
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
var Ml = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ql() {
  for (var s = arguments.length, t = new Array(s), e = 0; e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Ar(s) {
  s === void 0 && (s = {});
  var t = s, e = t.defaultModifiers, n = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? Ml : i;
  return function(c, a, l) {
    l === void 0 && (l = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ml, r),
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
        var O = typeof T == "function" ? T(h.options) : T;
        E(), h.options = Object.assign({}, r, h.options, O), h.scrollParents = {
          reference: Ls(c) ? ni(c) : c.contextElement ? ni(c.contextElement) : [],
          popper: ni(a)
        };
        var x = pf(mf([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = x.filter(function(L) {
          return L.enabled;
        }), _(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var T = h.elements, O = T.reference, x = T.popper;
          if (ql(O, x)) {
            h.rects = {
              reference: df(O, yi(x), h.options.strategy === "fixed"),
              popper: Ua(x)
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
    if (!ql(c, a))
      return m;
    m.setOptions(l).then(function(w) {
      !g && l.onFirstUpdate && l.onFirstUpdate(w);
    });
    function _() {
      h.orderedModifiers.forEach(function(w) {
        var T = w.name, O = w.options, x = O === void 0 ? {} : O, L = w.effect;
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
var bf = /* @__PURE__ */ Ar(), yf = [Ha, Ga, Fa, ja], vf = /* @__PURE__ */ Ar({
  defaultModifiers: yf
}), _f = [Ha, Ga, Fa, ja, Mu, Ru, qu, Lu, Du], Ya = /* @__PURE__ */ Ar({
  defaultModifiers: _f
});
const $u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: _u,
  afterRead: bu,
  afterWrite: Tu,
  applyStyles: ja,
  arrow: Lu,
  auto: wr,
  basePlacements: Sn,
  beforeMain: yu,
  beforeRead: gu,
  beforeWrite: Eu,
  bottom: kt,
  clippingParents: fu,
  computeStyles: Fa,
  createPopper: Ya,
  createPopperBase: bf,
  createPopperLite: vf,
  detectOverflow: En,
  end: bn,
  eventListeners: Ha,
  flip: Ru,
  hide: Du,
  left: At,
  main: vu,
  modifierPhases: Au,
  offset: Mu,
  placements: Ba,
  popper: sn,
  popperGenerator: Ar,
  popperOffsets: Ga,
  preventOverflow: qu,
  read: mu,
  reference: pu,
  right: It,
  start: xs,
  top: Tt,
  variationPlacements: ia,
  viewport: $a,
  write: wu
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Ye = /* @__PURE__ */ new Map(), So = {
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
}, Ef = 1e6, wf = 1e3, aa = "transitionend", Bu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), Tf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Af = (s) => {
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
}, Pu = (s) => {
  s.dispatchEvent(new Event(aa));
}, De = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), es = (s) => De(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Bu(s)) : null, xn = (s) => {
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
}, ss = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false", ju = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? ju(s.parentNode) : null;
}, dr = () => {
}, vi = (s) => {
  s.offsetHeight;
}, Uu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, xo = [], Of = (s) => {
  document.readyState === "loading" ? (xo.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of xo)
      t();
  }), xo.push(s)) : s();
}, zt = () => document.documentElement.dir === "rtl", Gt = (s) => {
  Of(() => {
    const t = Uu();
    if (t) {
      const e = s.NAME, n = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface);
    }
  });
}, xt = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e, Vu = (s, t, e = !0) => {
  if (!e) {
    xt(s);
    return;
  }
  const i = Nf(t) + 5;
  let r = !1;
  const o = ({
    target: c
  }) => {
    c === t && (r = !0, t.removeEventListener(aa, o), xt(s));
  };
  t.addEventListener(aa, o), setTimeout(() => {
    r || Pu(t);
  }, i);
}, Xa = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, Cf = /[^.]*(?=\..*)\.|.*/, Sf = /\..*/, xf = /::\d+$/, Lo = {};
let $l = 1;
const Fu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Lf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Hu(s, t) {
  return t && `${t}::${$l++}` || s.uidEvent || $l++;
}
function Wu(s) {
  const t = Hu(s);
  return s.uidEvent = t, Lo[t] = Lo[t] || {}, Lo[t];
}
function kf(s, t) {
  return function e(n) {
    return Za(n, {
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
          return Za(i, {
            delegateTarget: o
          }), n.oneOff && k.off(s, i.type, t, e), e.apply(o, [i]);
  };
}
function zu(s, t, e = null) {
  return Object.values(s).find((n) => n.callable === t && n.delegationSelector === e);
}
function Ku(s, t, e) {
  const n = typeof t == "string", i = n ? e : t || e;
  let r = Gu(s);
  return Lf.has(r) || (r = s), [n, i, r];
}
function Bl(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, c] = Ku(t, e, n);
  t in Fu && (o = ((_) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return _.call(this, E);
  })(o));
  const a = Wu(s), l = a[c] || (a[c] = {}), h = zu(l, o, r ? e : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const p = Hu(o, t.replace(Cf, "")), g = r ? If(s, e, o) : kf(s, o);
  g.delegationSelector = r ? e : null, g.callable = o, g.oneOff = i, g.uidEvent = p, l[p] = g, s.addEventListener(c, g, r);
}
function la(s, t, e, n, i) {
  const r = zu(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function Rf(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && la(s, t, e, o.callable, o.delegationSelector);
}
function Gu(s) {
  return s = s.replace(Sf, ""), Fu[s] || s;
}
const k = {
  on(s, t, e, n) {
    Bl(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    Bl(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = Ku(t, e, n), c = o !== t, a = Wu(s), l = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(l).length)
        return;
      la(s, a, o, r, i ? e : null);
      return;
    }
    if (h)
      for (const p of Object.keys(a))
        Rf(s, a, p, t.slice(1));
    for (const [p, g] of Object.entries(l)) {
      const m = p.replace(xf, "");
      (!c || t.includes(m)) && la(s, a, o, g.callable, g.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = Uu(), i = Gu(t), r = t !== i;
    let o = null, c = !0, a = !0, l = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), c = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), l = o.isDefaultPrevented());
    const h = Za(new Event(t, {
      bubbles: c,
      cancelable: !0
    }), e);
    return l && h.preventDefault(), a && s.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function Za(s, t = {}) {
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
function Pl(s) {
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
function ko(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Me = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-bs-${ko(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-bs-${ko(t)}`);
  },
  getDataAttributes(s) {
    if (!s)
      return {};
    const t = {}, e = Object.keys(s.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of e) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Pl(s.dataset[n]);
    }
    return t;
  },
  getDataAttribute(s, t) {
    return Pl(s.getAttribute(`data-bs-${ko(t)}`));
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
class re extends _i {
  constructor(t, e) {
    super(), t = es(t), t && (this._element = t, this._config = this._getConfig(e), So.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    So.remove(this._element, this.constructor.DATA_KEY), k.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, e, n = !0) {
    Vu(t, e, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return So.get(es(t), this.DATA_KEY);
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
const Io = (s) => {
  let t = s.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let e = s.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t ? t.split(",").map((e) => Bu(e)).join(",") : null;
}, V = {
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
    const t = Io(s);
    return t && V.findOne(t) ? t : null;
  },
  getElementFromSelector(s) {
    const t = Io(s);
    return t ? V.findOne(t) : null;
  },
  getMultipleElementsFromSelector(s) {
    const t = Io(s);
    return t ? V.find(t) : [];
  }
}, Nr = (s, t = "hide") => {
  const e = `click.dismiss${s.EVENT_KEY}`, n = s.NAME;
  k.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), ss(this))
      return;
    const r = V.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, Mf = "alert", qf = "bs.alert", Yu = `.${qf}`, $f = `close${Yu}`, Bf = `closed${Yu}`, Pf = "fade", jf = "show";
class Or extends re {
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
      const e = Or.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Nr(Or, "close");
Gt(Or);
const Uf = "button", Vf = "bs.button", Ff = `.${Vf}`, Hf = ".data-api", Wf = "active", jl = '[data-bs-toggle="button"]', zf = `click${Ff}${Hf}`;
class Cr extends re {
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
      const e = Cr.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
k.on(document, zf, jl, (s) => {
  s.preventDefault();
  const t = s.target.closest(jl);
  Cr.getOrCreateInstance(t).toggle();
});
Gt(Cr);
const Kf = "swipe", Ln = ".bs.swipe", Gf = `touchstart${Ln}`, Yf = `touchmove${Ln}`, Xf = `touchend${Ln}`, Zf = `pointerdown${Ln}`, Qf = `pointerup${Ln}`, Jf = "touch", tp = "pen", ep = "pointer-event", sp = 40, np = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, ip = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class fr extends _i {
  constructor(t, e) {
    super(), this._element = t, !(!t || !fr.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
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
const rp = "carousel", op = "bs.carousel", os = `.${op}`, Xu = ".data-api", ap = "ArrowLeft", lp = "ArrowRight", cp = 500, Xn = "next", tn = "prev", nn = "left", or = "right", up = `slide${os}`, Ro = `slid${os}`, hp = `keydown${os}`, dp = `mouseenter${os}`, fp = `mouseleave${os}`, pp = `dragstart${os}`, gp = `load${os}${Xu}`, mp = `click${os}${Xu}`, Zu = "carousel", Ki = "active", bp = "slide", yp = "carousel-item-end", vp = "carousel-item-start", _p = "carousel-item-next", Ep = "carousel-item-prev", Qu = ".active", Ju = ".carousel-item", wp = Qu + Ju, Tp = ".carousel-item img", Ap = ".carousel-indicators", Np = "[data-bs-slide], [data-bs-slide-to]", Op = '[data-bs-ride="carousel"]', Cp = {
  [ap]: or,
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
class Ei extends re {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = V.findOne(Ap, this._element), this._addEventListeners(), this._config.ride === Zu && this.cycle();
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
    this._isSliding && Pu(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        k.one(this._element, Ro, () => this.cycle());
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
      k.one(this._element, Ro, () => this.to(t));
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
    this._config.keyboard && k.on(this._element, hp, (t) => this._keydown(t)), this._config.pause === "hover" && (k.on(this._element, dp, () => this.pause()), k.on(this._element, fp, () => this._maybeEnableCycle())), this._config.touch && fr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of V.find(Tp, this._element))
      k.on(n, pp, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(nn)),
      rightCallback: () => this._slide(this._directionToOrder(or)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), cp + this._config.interval));
      }
    };
    this._swipeHelper = new fr(this._element, e);
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
    const e = V.findOne(Qu, this._indicatorsElement);
    e.classList.remove(Ki), e.removeAttribute("aria-current");
    const n = V.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
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
    const n = this._getActive(), i = t === Xn, r = e || Xa(this._getItems(), n, i, this._config.wrap);
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
    const h = i ? vp : yp, p = i ? _p : Ep;
    r.classList.add(p), vi(r), n.classList.add(h), r.classList.add(h);
    const g = () => {
      r.classList.remove(h, p), r.classList.add(Ki), n.classList.remove(Ki, p, h), this._isSliding = !1, c(Ro);
    };
    this._queueCallback(g, n, this._isAnimated()), l && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(bp);
  }
  _getActive() {
    return V.findOne(wp, this._element);
  }
  _getItems() {
    return V.find(Ju, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return zt() ? t === nn ? tn : Xn : t === nn ? Xn : tn;
  }
  _orderToDirection(t) {
    return zt() ? t === tn ? nn : or : t === tn ? or : nn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Ei.getOrCreateInstance(this, t);
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
  const t = V.getElementFromSelector(this);
  if (!t || !t.classList.contains(Zu))
    return;
  s.preventDefault();
  const e = Ei.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
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
  const s = V.find(Op);
  for (const t of s)
    Ei.getOrCreateInstance(t);
});
Gt(Ei);
const Lp = "collapse", kp = "bs.collapse", wi = `.${kp}`, Ip = ".data-api", Rp = `show${wi}`, Dp = `shown${wi}`, Mp = `hide${wi}`, qp = `hidden${wi}`, $p = `click${wi}${Ip}`, Do = "show", fn = "collapse", Gi = "collapsing", Bp = "collapsed", Pp = `:scope .${fn} .${fn}`, jp = "collapse-horizontal", Up = "width", Vp = "height", Fp = ".collapse.show, .collapse.collapsing", ca = '[data-bs-toggle="collapse"]', Hp = {
  parent: null,
  toggle: !0
}, Wp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class ci extends re {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = V.find(ca);
    for (const i of n) {
      const r = V.getSelectorFromElement(i), o = V.find(r).filter((c) => c === this._element);
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
    if (this._config.parent && (t = this._getFirstLevelChildren(Fp).filter((c) => c !== this._element).map((c) => ci.getOrCreateInstance(c, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || k.trigger(this._element, Rp).defaultPrevented)
      return;
    for (const c of t)
      c.hide();
    const n = this._getDimension();
    this._element.classList.remove(fn), this._element.classList.add(Gi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Gi), this._element.classList.add(fn, Do), this._element.style[n] = "", k.trigger(this._element, Dp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || k.trigger(this._element, Mp).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, vi(this._element), this._element.classList.add(Gi), this._element.classList.remove(fn, Do);
    for (const i of this._triggerArray) {
      const r = V.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Gi), this._element.classList.add(fn), k.trigger(this._element, qp);
    };
    this._element.style[e] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Do);
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
    const t = this._getFirstLevelChildren(ca);
    for (const e of t) {
      const n = V.getElementFromSelector(e);
      n && this._addAriaAndCollapsedClass([e], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const e = V.find(Pp, this._config.parent);
    return V.find(t, this._config.parent).filter((n) => !e.includes(n));
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
      const n = ci.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
k.on(document, $p, ca, function(s) {
  (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
  for (const t of V.getMultipleElementsFromSelector(this))
    ci.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Gt(ci);
const Ul = "dropdown", zp = "bs.dropdown", Ms = `.${zp}`, Qa = ".data-api", Kp = "Escape", Vl = "Tab", Gp = "ArrowUp", Fl = "ArrowDown", Yp = 2, Xp = `hide${Ms}`, Zp = `hidden${Ms}`, Qp = `show${Ms}`, Jp = `shown${Ms}`, th = `click${Ms}${Qa}`, eh = `keydown${Ms}${Qa}`, tg = `keyup${Ms}${Qa}`, rn = "show", eg = "dropup", sg = "dropend", ng = "dropstart", ig = "dropup-center", rg = "dropdown-center", Os = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', og = `${Os}.${rn}`, ar = ".dropdown-menu", ag = ".navbar", lg = ".navbar-nav", cg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", ug = zt() ? "top-end" : "top-start", hg = zt() ? "top-start" : "top-end", dg = zt() ? "bottom-end" : "bottom-start", fg = zt() ? "bottom-start" : "bottom-end", pg = zt() ? "left-start" : "right-start", gg = zt() ? "right-start" : "left-start", mg = "top", bg = "bottom", yg = {
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
class be extends re {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = V.next(this._element, ar)[0] || V.prev(this._element, ar)[0] || V.findOne(ar, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return yg;
  }
  static get DefaultType() {
    return vg;
  }
  static get NAME() {
    return Ul;
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
          k.on(n, "mouseover", dr);
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
          k.off(n, "mouseover", dr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(rn), this._element.classList.remove(rn), this._element.setAttribute("aria-expanded", "false"), Me.removeDataAttribute(this._menu, "popper"), k.trigger(this._element, Zp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !De(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Ul.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof $u > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : De(this._config.reference) ? t = es(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = Ya(t, this._menu, e);
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
    const n = V.find(cg, this._menu).filter((i) => xn(i));
    n.length && Xa(n, e, t === Fl, !n.includes(e)).focus();
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
    if (t.button === Yp || t.type === "keyup" && t.key !== Vl)
      return;
    const e = V.find(og);
    for (const n of e) {
      const i = be.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === Vl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const c = {
        relatedTarget: i._element
      };
      t.type === "click" && (c.clickEvent = t), i._completeHide(c);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === Kp, i = [Gp, Fl].includes(t.key);
    if (!i && !n || e && !n)
      return;
    t.preventDefault();
    const r = this.matches(Os) ? this : V.prev(this, Os)[0] || V.next(this, Os)[0] || V.findOne(Os, t.delegateTarget.parentNode), o = be.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
k.on(document, eh, Os, be.dataApiKeydownHandler);
k.on(document, eh, ar, be.dataApiKeydownHandler);
k.on(document, th, be.clearMenus);
k.on(document, tg, be.clearMenus);
k.on(document, th, Os, function(s) {
  s.preventDefault(), be.getOrCreateInstance(this).toggle();
});
Gt(be);
const sh = "backdrop", _g = "fade", Hl = "show", Wl = `mousedown.bs.${sh}`, Eg = {
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
class nh extends _i {
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
    return sh;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      xt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && vi(e), e.classList.add(Hl), this._emulateAnimation(() => {
      xt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      xt(t);
      return;
    }
    this._getElement().classList.remove(Hl), this._emulateAnimation(() => {
      this.dispose(), xt(t);
    });
  }
  dispose() {
    this._isAppended && (k.off(this._element, Wl), this._element.remove(), this._isAppended = !1);
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
    return t.rootElement = es(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), k.on(t, Wl, () => {
      xt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Vu(t, this._getElement(), this._config.isAnimated);
  }
}
const Tg = "focustrap", Ag = "bs.focustrap", pr = `.${Ag}`, Ng = `focusin${pr}`, Og = `keydown.tab${pr}`, Cg = "Tab", Sg = "forward", zl = "backward", xg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Lg = {
  autofocus: "boolean",
  trapElement: "element"
};
class ih extends _i {
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
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), k.off(document, pr), k.on(document, Ng, (t) => this._handleFocusin(t)), k.on(document, Og, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, k.off(document, pr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: e
    } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target))
      return;
    const n = V.focusableChildren(e);
    n.length === 0 ? e.focus() : this._lastTabNavDirection === zl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Cg && (this._lastTabNavDirection = t.shiftKey ? zl : Sg);
  }
}
const Kl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Gl = ".sticky-top", Yi = "padding-right", Yl = "margin-right";
class ua {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Yi, (e) => e + t), this._setElementAttributes(Kl, Yi, (e) => e + t), this._setElementAttributes(Gl, Yl, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Yi), this._resetElementAttributes(Kl, Yi), this._resetElementAttributes(Gl, Yl);
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
    for (const n of V.find(t, this._element))
      e(n);
  }
}
const kg = "modal", Ig = "bs.modal", Kt = `.${Ig}`, Rg = ".data-api", Dg = "Escape", Mg = `hide${Kt}`, qg = `hidePrevented${Kt}`, rh = `hidden${Kt}`, oh = `show${Kt}`, $g = `shown${Kt}`, Bg = `resize${Kt}`, Pg = `click.dismiss${Kt}`, jg = `mousedown.dismiss${Kt}`, Ug = `keydown.dismiss${Kt}`, Vg = `click${Kt}${Rg}`, Xl = "modal-open", Fg = "fade", Zl = "show", Mo = "modal-static", Hg = ".modal.show", Wg = ".modal-dialog", zg = ".modal-body", Kg = '[data-bs-toggle="modal"]', Gg = {
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
    super(t, e), this._dialog = V.findOne(Wg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new ua(), this._addEventListeners();
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
    this._isShown || this._isTransitioning || k.trigger(this._element, oh, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Xl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || k.trigger(this._element, Mg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Zl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    k.off(window, Kt), k.off(this._dialog, Kt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new nh({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new ih({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const e = V.findOne(zg, this._dialog);
    e && (e.scrollTop = 0), vi(this._element), this._element.classList.add(Zl);
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
      document.body.classList.remove(Xl), this._resetAdjustments(), this._scrollBar.reset(), k.trigger(this._element, rh);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Fg);
  }
  _triggerBackdropTransition() {
    if (k.trigger(this._element, qg).defaultPrevented)
      return;
    const e = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(Mo) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Mo), this._queueCallback(() => {
      this._element.classList.remove(Mo), this._queueCallback(() => {
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
  const t = V.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), k.one(t, oh, (i) => {
    i.defaultPrevented || k.one(t, rh, () => {
      xn(this) && this.focus();
    });
  });
  const e = V.findOne(Hg);
  e && ks.getInstance(e).hide(), ks.getOrCreateInstance(t).toggle(this);
});
Nr(ks);
Gt(ks);
const Xg = "offcanvas", Zg = "bs.offcanvas", je = `.${Zg}`, ah = ".data-api", Qg = `load${je}${ah}`, Jg = "Escape", Ql = "show", Jl = "showing", tc = "hiding", tm = "offcanvas-backdrop", lh = ".offcanvas.show", em = `show${je}`, sm = `shown${je}`, nm = `hide${je}`, ec = `hidePrevented${je}`, ch = `hidden${je}`, im = `resize${je}`, rm = `click${je}${ah}`, om = `keydown.dismiss${je}`, am = '[data-bs-toggle="offcanvas"]', lm = {
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
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new ua().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Jl);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Ql), this._element.classList.remove(Jl), k.trigger(this._element, sm, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || k.trigger(this._element, nm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(tc), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(Ql, tc), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new ua().reset(), k.trigger(this._element, ch);
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
        k.trigger(this._element, ec);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new nh({
      className: tm,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null
    });
  }
  _initializeFocusTrap() {
    return new ih({
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
        k.trigger(this._element, ec);
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
  const t = V.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), ss(this))
    return;
  k.one(t, ch, () => {
    xn(this) && this.focus();
  });
  const e = V.findOne(lh);
  e && e !== t && ns.getInstance(e).hide(), ns.getOrCreateInstance(t).toggle(this);
});
k.on(window, Qg, () => {
  for (const s of V.find(lh))
    ns.getOrCreateInstance(s).show();
});
k.on(window, im, () => {
  for (const s of V.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && ns.getOrCreateInstance(s).hide();
});
Nr(ns);
Gt(ns);
const um = /^aria-[\w-]*$/i, uh = {
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
  allowList: uh,
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
class vm extends _i {
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
    const i = V.findOne(n, t);
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
const _m = "tooltip", Em = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), qo = "fade", wm = "modal", Xi = "show", Tm = ".tooltip-inner", sc = `.${wm}`, nc = "hide.bs.modal", Zn = "hover", $o = "focus", Am = "click", Nm = "manual", Om = "hide", Cm = "hidden", Sm = "show", xm = "shown", Lm = "inserted", km = "click", Im = "focusin", Rm = "focusout", Dm = "mouseenter", Mm = "mouseleave", qm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: zt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: zt() ? "right" : "left"
}, $m = {
  allowList: uh,
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
let Sr = class hh extends re {
  constructor(t, e) {
    if (typeof $u > "u")
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
    clearTimeout(this._timeout), k.off(this._element.closest(sc), nc, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = k.trigger(this._element, this.constructor.eventName(Sm)), n = (ju(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), k.trigger(this._element, this.constructor.eventName(Lm))), this._popper = this._createPopper(i), i.classList.add(Xi), "ontouchstart" in document.documentElement)
      for (const c of [].concat(...document.body.children))
        k.on(c, "mouseover", dr);
    const o = () => {
      k.trigger(this._element, this.constructor.eventName(xm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || k.trigger(this._element, this.constructor.eventName(Om)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Xi), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        k.off(i, "mouseover", dr);
    this._activeTrigger[Am] = !1, this._activeTrigger[$o] = !1, this._activeTrigger[Zn] = !1, this._isHovered = null;
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
    e.classList.remove(qo, Xi), e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Af(this.constructor.NAME).toString();
    return e.setAttribute("id", n), this._isAnimated() && e.classList.add(qo), e;
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
    return this._config.animation || this.tip && this.tip.classList.contains(qo);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Xi);
  }
  _createPopper(t) {
    const e = xt(this._config.placement, [this, t, this._element]), n = qm[e.toUpperCase()];
    return Ya(this._element, t, this._getPopperConfig(n));
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
          o._activeTrigger[r.type === "focusin" ? $o : Zn] = !0, o._enter();
        }), k.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? $o : Zn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, k.on(this._element.closest(sc), nc, this._hideModalHandler);
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
      const e = hh.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
};
Gt(Sr);
const Pm = "popover", jm = ".popover-header", Um = ".popover-body", Vm = {
  ...Sr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Fm = {
  ...Sr.DefaultType,
  content: "(null|string|element|function)"
};
class Ja extends Sr {
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
      const e = Ja.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
Gt(Ja);
const Hm = "scrollspy", Wm = "bs.scrollspy", tl = `.${Wm}`, zm = ".data-api", Km = `activate${tl}`, ic = `click${tl}`, Gm = `load${tl}${zm}`, Ym = "dropdown-item", en = "active", Xm = '[data-bs-spy="scroll"]', Bo = "[href]", Zm = ".nav, .list-group", rc = ".nav-link", Qm = ".nav-item", Jm = ".list-group-item", tb = `${rc}, ${Qm} > ${rc}, ${Jm}`, eb = ".dropdown", sb = ".dropdown-toggle", nb = {
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
class xr extends re {
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
    this._config.smoothScroll && (k.off(this._config.target, ic), k.on(this._config.target, ic, Bo, (t) => {
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
    const t = V.find(Bo, this._config.target);
    for (const e of t) {
      if (!e.hash || ss(e))
        continue;
      const n = V.findOne(decodeURI(e.hash), this._element);
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
      V.findOne(sb, t.closest(eb)).classList.add(en);
      return;
    }
    for (const e of V.parents(t, Zm))
      for (const n of V.prev(e, tb))
        n.classList.add(en);
  }
  _clearActiveClass(t) {
    t.classList.remove(en);
    const e = V.find(`${Bo}.${en}`, t);
    for (const n of e)
      n.classList.remove(en);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = xr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
k.on(window, Gm, () => {
  for (const s of V.find(Xm))
    xr.getOrCreateInstance(s);
});
Gt(xr);
const rb = "tab", ob = "bs.tab", qs = `.${ob}`, ab = `hide${qs}`, lb = `hidden${qs}`, cb = `show${qs}`, ub = `shown${qs}`, hb = `click${qs}`, db = `keydown${qs}`, fb = `load${qs}`, pb = "ArrowLeft", oc = "ArrowRight", gb = "ArrowUp", ac = "ArrowDown", Po = "Home", lc = "End", Cs = "active", cc = "fade", jo = "show", mb = "dropdown", dh = ".dropdown-toggle", bb = ".dropdown-menu", Uo = `:not(${dh})`, yb = '.list-group, .nav, [role="tablist"]', vb = ".nav-item, .list-group-item", _b = `.nav-link${Uo}, .list-group-item${Uo}, [role="tab"]${Uo}`, fh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Vo = `${_b}, ${fh}`, Eb = `.${Cs}[data-bs-toggle="tab"], .${Cs}[data-bs-toggle="pill"], .${Cs}[data-bs-toggle="list"]`;
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
    t.classList.add(Cs), this._activate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(jo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), k.trigger(t, ub, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(cc));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(Cs), t.blur(), this._deactivate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(jo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), k.trigger(t, lb, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(cc));
  }
  _keydown(t) {
    if (![pb, oc, gb, ac, Po, lc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !ss(i));
    let n;
    if ([Po, lc].includes(t.key))
      n = e[t.key === Po ? 0 : e.length - 1];
    else {
      const i = [oc, ac].includes(t.key);
      n = Xa(e, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), wn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return V.find(Vo, this._parent);
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
    const e = V.getElementFromSelector(t);
    e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, e) {
    const n = this._getOuterElement(t);
    if (!n.classList.contains(mb))
      return;
    const i = (r, o) => {
      const c = V.findOne(r, n);
      c && c.classList.toggle(o, e);
    };
    i(dh, Cs), i(bb, jo), n.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, n) {
    t.hasAttribute(e) || t.setAttribute(e, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Cs);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Vo) ? t : V.findOne(Vo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(vb) || t;
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
k.on(document, hb, fh, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !ss(this) && wn.getOrCreateInstance(this).show();
});
k.on(window, fb, () => {
  for (const s of V.find(Eb))
    wn.getOrCreateInstance(s);
});
Gt(wn);
const wb = "toast", Tb = "bs.toast", as = `.${Tb}`, Ab = `mouseover${as}`, Nb = `mouseout${as}`, Ob = `focusin${as}`, Cb = `focusout${as}`, Sb = `hide${as}`, xb = `hidden${as}`, Lb = `show${as}`, kb = `shown${as}`, Ib = "fade", uc = "hide", Zi = "show", Qi = "showing", Rb = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Db = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Lr extends re {
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
      this._element.classList.remove(Qi), k.trigger(this._element, kb), this._maybeScheduleHide();
    };
    this._element.classList.remove(uc), vi(this._element), this._element.classList.add(Zi, Qi), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || k.trigger(this._element, Sb).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(uc), this._element.classList.remove(Qi, Zi), k.trigger(this._element, xb);
    };
    this._element.classList.add(Qi), this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(Zi), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Zi);
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
      const e = Lr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Nr(Lr);
Gt(Lr);
function ph(s, t) {
  for (const e in t)
    t[e] instanceof Object && e in s && Object.assign(t[e], ph(s[e], t[e]));
  return Object.assign(s || {}, t);
}
function gh(s, t, e, n) {
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
function Fo(s, t = "-") {
  return s.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Mb(s) {
  let t = [];
  for (let e of s)
    t.push(gr(e));
  return t;
}
function gr(s, t = "", e = {}) {
  for (let n in s) {
    let i = t ? t + "." + n : n;
    typeof s[n] == "object" && !Array.isArray(s[n]) ? gr(s[n], i, e) : e[i] = s[n];
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
function el(s, t, e, n) {
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
var mh = typeof global == "object" && global && global.Object === Object && global, zb = typeof self == "object" && self && self.Object === Object && self, Te = mh || zb || Function("return this")(), is = Te.Symbol, bh = Object.prototype, Kb = bh.hasOwnProperty, Gb = bh.toString, Jn = is ? is.toStringTag : void 0;
function Yb(s) {
  var t = Kb.call(s, Jn), e = s[Jn];
  try {
    s[Jn] = void 0;
    var n = !0;
  } catch {
  }
  var i = Gb.call(s);
  return n && (t ? s[Jn] = e : delete s[Jn]), i;
}
var Xb = Object.prototype, Zb = Xb.toString;
function Qb(s) {
  return Zb.call(s);
}
var Jb = "[object Null]", t1 = "[object Undefined]", hc = is ? is.toStringTag : void 0;
function kn(s) {
  return s == null ? s === void 0 ? t1 : Jb : hc && hc in Object(s) ? Yb(s) : Qb(s);
}
function $e(s) {
  return s != null && typeof s == "object";
}
var Is = Array.isArray;
function ls(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function yh(s) {
  return s;
}
var e1 = "[object AsyncFunction]", s1 = "[object Function]", n1 = "[object GeneratorFunction]", i1 = "[object Proxy]";
function sl(s) {
  if (!ls(s))
    return !1;
  var t = kn(s);
  return t == s1 || t == n1 || t == e1 || t == i1;
}
var Ho = Te["__core-js_shared__"], dc = function() {
  var s = /[^.]+$/.exec(Ho && Ho.keys && Ho.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function r1(s) {
  return !!dc && dc in s;
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
  var t = sl(s) ? p1 : c1;
  return t.test($s(s));
}
function m1(s, t) {
  return s == null ? void 0 : s[t];
}
function Bs(s, t) {
  var e = m1(s, t);
  return g1(e) ? e : void 0;
}
var ha = Bs(Te, "WeakMap"), fc = Object.create, b1 = /* @__PURE__ */ function() {
  function s() {
  }
  return function(t) {
    if (!ls(t))
      return {};
    if (fc)
      return fc(t);
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
var v1 = 800, _1 = 16, E1 = Date.now;
function w1(s) {
  var t = 0, e = 0;
  return function() {
    var n = E1(), i = _1 - (n - e);
    if (e = n, i > 0) {
      if (++t >= v1)
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
var mr = function() {
  try {
    var s = Bs(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
}(), A1 = mr ? function(s, t) {
  return mr(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: T1(t),
    writable: !0
  });
} : yh, N1 = w1(A1);
function O1(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var C1 = 9007199254740991, S1 = /^(?:0|[1-9]\d*)$/;
function _h(s, t) {
  var e = typeof s;
  return t = t ?? C1, !!t && (e == "number" || e != "symbol" && S1.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
function nl(s, t, e) {
  t == "__proto__" && mr ? mr(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
function Ti(s, t) {
  return s === t || s !== s && t !== t;
}
var x1 = Object.prototype, L1 = x1.hasOwnProperty;
function Eh(s, t, e) {
  var n = s[t];
  (!(L1.call(s, t) && Ti(n, e)) || e === void 0 && !(t in s)) && nl(s, t, e);
}
function Ai(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var c = t[r], a = void 0;
    a === void 0 && (a = s[c]), i ? nl(e, c, a) : Eh(e, c, a);
  }
  return e;
}
var pc = Math.max;
function k1(s, t, e) {
  return t = pc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = pc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var c = Array(t + 1); ++i < t; )
      c[i] = n[i];
    return c[t] = e(o), y1(s, this, c);
  };
}
function I1(s, t) {
  return N1(k1(s, t, yh), s + "");
}
var R1 = 9007199254740991;
function wh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= R1;
}
function kr(s) {
  return s != null && wh(s.length) && !sl(s);
}
function D1(s, t, e) {
  if (!ls(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? kr(e) && _h(t, e.length) : n == "string" && t in e) ? Ti(e[t], s) : !1;
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
function il(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || q1;
  return s === e;
}
function $1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var B1 = "[object Arguments]";
function gc(s) {
  return $e(s) && kn(s) == B1;
}
var Th = Object.prototype, P1 = Th.hasOwnProperty, j1 = Th.propertyIsEnumerable, da = gc(/* @__PURE__ */ function() {
  return arguments;
}()) ? gc : function(s) {
  return $e(s) && P1.call(s, "callee") && !j1.call(s, "callee");
};
function U1() {
  return !1;
}
var Ah = typeof exports == "object" && exports && !exports.nodeType && exports, mc = Ah && typeof module == "object" && module && !module.nodeType && module, V1 = mc && mc.exports === Ah, bc = V1 ? Te.Buffer : void 0, F1 = bc ? bc.isBuffer : void 0, ui = F1 || U1, H1 = "[object Arguments]", W1 = "[object Array]", z1 = "[object Boolean]", K1 = "[object Date]", G1 = "[object Error]", Y1 = "[object Function]", X1 = "[object Map]", Z1 = "[object Number]", Q1 = "[object Object]", J1 = "[object RegExp]", ty = "[object Set]", ey = "[object String]", sy = "[object WeakMap]", ny = "[object ArrayBuffer]", iy = "[object DataView]", ry = "[object Float32Array]", oy = "[object Float64Array]", ay = "[object Int8Array]", ly = "[object Int16Array]", cy = "[object Int32Array]", uy = "[object Uint8Array]", hy = "[object Uint8ClampedArray]", dy = "[object Uint16Array]", fy = "[object Uint32Array]", st = {};
st[ry] = st[oy] = st[ay] = st[ly] = st[cy] = st[uy] = st[hy] = st[dy] = st[fy] = !0;
st[H1] = st[W1] = st[ny] = st[z1] = st[iy] = st[K1] = st[G1] = st[Y1] = st[X1] = st[Z1] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = !1;
function py(s) {
  return $e(s) && wh(s.length) && !!st[kn(s)];
}
function rl(s) {
  return function(t) {
    return s(t);
  };
}
var Nh = typeof exports == "object" && exports && !exports.nodeType && exports, ii = Nh && typeof module == "object" && module && !module.nodeType && module, gy = ii && ii.exports === Nh, Wo = gy && mh.process, Tn = function() {
  try {
    var s = ii && ii.require && ii.require("util").types;
    return s || Wo && Wo.binding && Wo.binding("util");
  } catch {
  }
}(), yc = Tn && Tn.isTypedArray, ol = yc ? rl(yc) : py, my = Object.prototype, by = my.hasOwnProperty;
function Oh(s, t) {
  var e = Is(s), n = !e && da(s), i = !e && !n && ui(s), r = !e && !n && !i && ol(s), o = e || n || i || r, c = o ? $1(s.length, String) : [], a = c.length;
  for (var l in s)
    (t || by.call(s, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    _h(l, a))) && c.push(l);
  return c;
}
function Ch(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var yy = Ch(Object.keys, Object), vy = Object.prototype, _y = vy.hasOwnProperty;
function Ey(s) {
  if (!il(s))
    return yy(s);
  var t = [];
  for (var e in Object(s))
    _y.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function al(s) {
  return kr(s) ? Oh(s) : Ey(s);
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
  var t = il(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !Ay.call(s, n)) || e.push(n);
  return e;
}
function Ni(s) {
  return kr(s) ? Oh(s, !0) : Ny(s);
}
var hi = Bs(Object, "create");
function Oy() {
  this.__data__ = hi ? hi(null) : {}, this.size = 0;
}
function Cy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var Sy = "__lodash_hash_undefined__", xy = Object.prototype, Ly = xy.hasOwnProperty;
function ky(s) {
  var t = this.__data__;
  if (hi) {
    var e = t[s];
    return e === Sy ? void 0 : e;
  }
  return Ly.call(t, s) ? t[s] : void 0;
}
var Iy = Object.prototype, Ry = Iy.hasOwnProperty;
function Dy(s) {
  var t = this.__data__;
  return hi ? t[s] !== void 0 : Ry.call(t, s);
}
var My = "__lodash_hash_undefined__";
function qy(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = hi && t === void 0 ? My : t, this;
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
function Ir(s, t) {
  for (var e = s.length; e--; )
    if (Ti(s[e][0], t))
      return e;
  return -1;
}
var By = Array.prototype, Py = By.splice;
function jy(s) {
  var t = this.__data__, e = Ir(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : Py.call(t, e, 1), --this.size, !0;
}
function Uy(s) {
  var t = this.__data__, e = Ir(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function Vy(s) {
  return Ir(this.__data__, s) > -1;
}
function Fy(s, t) {
  var e = this.__data__, n = Ir(e, s);
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
var di = Bs(Te, "Map");
function Hy() {
  this.size = 0, this.__data__ = {
    hash: new Rs(),
    map: new (di || Ue)(),
    string: new Rs()
  };
}
function Wy(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Rr(s, t) {
  var e = s.__data__;
  return Wy(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function zy(s) {
  var t = Rr(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function Ky(s) {
  return Rr(this, s).get(s);
}
function Gy(s) {
  return Rr(this, s).has(s);
}
function Yy(s, t) {
  var e = Rr(this, s), n = e.size;
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
function Sh(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var ll = Ch(Object.getPrototypeOf, Object), Xy = "[object Object]", Zy = Function.prototype, Qy = Object.prototype, xh = Zy.toString, Jy = Qy.hasOwnProperty, t0 = xh.call(Object);
function e0(s) {
  if (!$e(s) || kn(s) != Xy)
    return !1;
  var t = ll(s);
  if (t === null)
    return !0;
  var e = Jy.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && xh.call(e) == t0;
}
function s0() {
  this.__data__ = new Ue(), this.size = 0;
}
function n0(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function i0(s) {
  return this.__data__.get(s);
}
function r0(s) {
  return this.__data__.has(s);
}
var o0 = 200;
function a0(s, t) {
  var e = this.__data__;
  if (e instanceof Ue) {
    var n = e.__data__;
    if (!di || n.length < o0 - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new Ps(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function ye(s) {
  var t = this.__data__ = new Ue(s);
  this.size = t.size;
}
ye.prototype.clear = s0;
ye.prototype.delete = n0;
ye.prototype.get = i0;
ye.prototype.has = r0;
ye.prototype.set = a0;
function l0(s, t) {
  return s && Ai(t, al(t), s);
}
function c0(s, t) {
  return s && Ai(t, Ni(t), s);
}
var Lh = typeof exports == "object" && exports && !exports.nodeType && exports, vc = Lh && typeof module == "object" && module && !module.nodeType && module, u0 = vc && vc.exports === Lh, _c = u0 ? Te.Buffer : void 0, Ec = _c ? _c.allocUnsafe : void 0;
function kh(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = Ec ? Ec(e) : new s.constructor(e);
  return s.copy(n), n;
}
function h0(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function Ih() {
  return [];
}
var d0 = Object.prototype, f0 = d0.propertyIsEnumerable, wc = Object.getOwnPropertySymbols, cl = wc ? function(s) {
  return s == null ? [] : (s = Object(s), h0(wc(s), function(t) {
    return f0.call(s, t);
  }));
} : Ih;
function p0(s, t) {
  return Ai(s, cl(s), t);
}
var g0 = Object.getOwnPropertySymbols, Rh = g0 ? function(s) {
  for (var t = []; s; )
    Sh(t, cl(s)), s = ll(s);
  return t;
} : Ih;
function m0(s, t) {
  return Ai(s, Rh(s), t);
}
function Dh(s, t, e) {
  var n = t(s);
  return Is(s) ? n : Sh(n, e(s));
}
function fa(s) {
  return Dh(s, al, cl);
}
function b0(s) {
  return Dh(s, Ni, Rh);
}
var pa = Bs(Te, "DataView"), ga = Bs(Te, "Promise"), ma = Bs(Te, "Set"), Tc = "[object Map]", y0 = "[object Object]", Ac = "[object Promise]", Nc = "[object Set]", Oc = "[object WeakMap]", Cc = "[object DataView]", v0 = $s(pa), _0 = $s(di), E0 = $s(ga), w0 = $s(ma), T0 = $s(ha), ee = kn;
(pa && ee(new pa(new ArrayBuffer(1))) != Cc || di && ee(new di()) != Tc || ga && ee(ga.resolve()) != Ac || ma && ee(new ma()) != Nc || ha && ee(new ha()) != Oc) && (ee = function(s) {
  var t = kn(s), e = t == y0 ? s.constructor : void 0, n = e ? $s(e) : "";
  if (n)
    switch (n) {
      case v0:
        return Cc;
      case _0:
        return Tc;
      case E0:
        return Ac;
      case w0:
        return Nc;
      case T0:
        return Oc;
    }
  return t;
});
var A0 = Object.prototype, N0 = A0.hasOwnProperty;
function O0(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && N0.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var br = Te.Uint8Array;
function ul(s) {
  var t = new s.constructor(s.byteLength);
  return new br(t).set(new br(s)), t;
}
function C0(s, t) {
  var e = t ? ul(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var S0 = /\w*$/;
function x0(s) {
  var t = new s.constructor(s.source, S0.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var Sc = is ? is.prototype : void 0, xc = Sc ? Sc.valueOf : void 0;
function L0(s) {
  return xc ? Object(xc.call(s)) : {};
}
function Mh(s, t) {
  var e = t ? ul(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var k0 = "[object Boolean]", I0 = "[object Date]", R0 = "[object Map]", D0 = "[object Number]", M0 = "[object RegExp]", q0 = "[object Set]", $0 = "[object String]", B0 = "[object Symbol]", P0 = "[object ArrayBuffer]", j0 = "[object DataView]", U0 = "[object Float32Array]", V0 = "[object Float64Array]", F0 = "[object Int8Array]", H0 = "[object Int16Array]", W0 = "[object Int32Array]", z0 = "[object Uint8Array]", K0 = "[object Uint8ClampedArray]", G0 = "[object Uint16Array]", Y0 = "[object Uint32Array]";
function X0(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case P0:
      return ul(s);
    case k0:
    case I0:
      return new n(+s);
    case j0:
      return C0(s, e);
    case U0:
    case V0:
    case F0:
    case H0:
    case W0:
    case z0:
    case K0:
    case G0:
    case Y0:
      return Mh(s, e);
    case R0:
      return new n();
    case D0:
    case $0:
      return new n(s);
    case M0:
      return x0(s);
    case q0:
      return new n();
    case B0:
      return L0(s);
  }
}
function qh(s) {
  return typeof s.constructor == "function" && !il(s) ? b1(ll(s)) : {};
}
var Z0 = "[object Map]";
function Q0(s) {
  return $e(s) && ee(s) == Z0;
}
var Lc = Tn && Tn.isMap, J0 = Lc ? rl(Lc) : Q0, tv = "[object Set]";
function ev(s) {
  return $e(s) && ee(s) == tv;
}
var kc = Tn && Tn.isSet, sv = kc ? rl(kc) : ev, nv = 1, iv = 2, rv = 4, $h = "[object Arguments]", ov = "[object Array]", av = "[object Boolean]", lv = "[object Date]", cv = "[object Error]", Bh = "[object Function]", uv = "[object GeneratorFunction]", hv = "[object Map]", dv = "[object Number]", Ph = "[object Object]", fv = "[object RegExp]", pv = "[object Set]", gv = "[object String]", mv = "[object Symbol]", bv = "[object WeakMap]", yv = "[object ArrayBuffer]", vv = "[object DataView]", _v = "[object Float32Array]", Ev = "[object Float64Array]", wv = "[object Int8Array]", Tv = "[object Int16Array]", Av = "[object Int32Array]", Nv = "[object Uint8Array]", Ov = "[object Uint8ClampedArray]", Cv = "[object Uint16Array]", Sv = "[object Uint32Array]", et = {};
et[$h] = et[ov] = et[yv] = et[vv] = et[av] = et[lv] = et[_v] = et[Ev] = et[wv] = et[Tv] = et[Av] = et[hv] = et[dv] = et[Ph] = et[fv] = et[pv] = et[gv] = et[mv] = et[Nv] = et[Ov] = et[Cv] = et[Sv] = !0;
et[cv] = et[Bh] = et[bv] = !1;
function lr(s, t, e, n, i, r) {
  var o, c = t & nv, a = t & iv, l = t & rv;
  if (o !== void 0)
    return o;
  if (!ls(s))
    return s;
  var h = Is(s);
  if (h) {
    if (o = O0(s), !c)
      return vh(s, o);
  } else {
    var p = ee(s), g = p == Bh || p == uv;
    if (ui(s))
      return kh(s, c);
    if (p == Ph || p == $h || g && !i) {
      if (o = a || g ? {} : qh(s), !c)
        return a ? m0(s, c0(o, s)) : p0(s, l0(o, s));
    } else {
      if (!et[p])
        return i ? s : {};
      o = X0(s, p, c);
    }
  }
  r || (r = new ye());
  var m = r.get(s);
  if (m)
    return m;
  r.set(s, o), sv(s) ? s.forEach(function(w) {
    o.add(lr(w, t, e, w, s, r));
  }) : J0(s) && s.forEach(function(w, T) {
    o.set(T, lr(w, t, e, T, s, r));
  });
  var _ = l ? a ? b0 : fa : a ? Ni : al, E = h ? void 0 : _(s);
  return O1(E || s, function(w, T) {
    E && (T = w, w = s[T]), Eh(o, T, lr(w, t, e, T, s, r));
  }), o;
}
var xv = 1, Lv = 4;
function pn(s) {
  return lr(s, xv | Lv);
}
var kv = "__lodash_hash_undefined__";
function Iv(s) {
  return this.__data__.set(s, kv), this;
}
function Rv(s) {
  return this.__data__.has(s);
}
function yr(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new Ps(); ++t < e; )
    this.add(s[t]);
}
yr.prototype.add = yr.prototype.push = Iv;
yr.prototype.has = Rv;
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
function jh(s, t, e, n, i, r) {
  var o = e & qv, c = s.length, a = t.length;
  if (c != a && !(o && a > c))
    return !1;
  var l = r.get(s), h = r.get(t);
  if (l && h)
    return l == t && h == s;
  var p = -1, g = !0, m = e & $v ? new yr() : void 0;
  for (r.set(s, t), r.set(t, s); ++p < c; ) {
    var _ = s[p], E = t[p];
    if (n)
      var w = o ? n(E, _, p, t, s, r) : n(_, E, p, s, t, r);
    if (w !== void 0) {
      if (w)
        continue;
      g = !1;
      break;
    }
    if (m) {
      if (!Dv(t, function(T, O) {
        if (!Mv(m, O) && (_ === T || i(_, T, e, n, r)))
          return m.push(O);
      })) {
        g = !1;
        break;
      }
    } else if (!(_ === E || i(_, E, e, n, r))) {
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
var jv = 1, Uv = 2, Vv = "[object Boolean]", Fv = "[object Date]", Hv = "[object Error]", Wv = "[object Map]", zv = "[object Number]", Kv = "[object RegExp]", Gv = "[object Set]", Yv = "[object String]", Xv = "[object Symbol]", Zv = "[object ArrayBuffer]", Qv = "[object DataView]", Ic = is ? is.prototype : void 0, zo = Ic ? Ic.valueOf : void 0;
function Jv(s, t, e, n, i, r, o) {
  switch (e) {
    case Qv:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case Zv:
      return !(s.byteLength != t.byteLength || !r(new br(s), new br(t)));
    case Vv:
    case Fv:
    case zv:
      return Ti(+s, +t);
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
      var h = jh(c(s), c(t), n, i, r, o);
      return o.delete(s), h;
    case Xv:
      if (zo)
        return zo.call(s) == zo.call(t);
  }
  return !1;
}
var t_ = 1, e_ = Object.prototype, s_ = e_.hasOwnProperty;
function n_(s, t, e, n, i, r) {
  var o = e & t_, c = fa(s), a = c.length, l = fa(t), h = l.length;
  if (a != h && !o)
    return !1;
  for (var p = a; p--; ) {
    var g = c[p];
    if (!(o ? g in t : s_.call(t, g)))
      return !1;
  }
  var m = r.get(s), _ = r.get(t);
  if (m && _)
    return m == t && _ == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var w = o; ++p < a; ) {
    g = c[p];
    var T = s[g], O = t[g];
    if (n)
      var x = o ? n(O, T, g, t, s, r) : n(T, O, g, s, t, r);
    if (!(x === void 0 ? T === O || i(T, O, e, n, r) : x)) {
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
var i_ = 1, Rc = "[object Arguments]", Dc = "[object Array]", Ji = "[object Object]", r_ = Object.prototype, Mc = r_.hasOwnProperty;
function o_(s, t, e, n, i, r) {
  var o = Is(s), c = Is(t), a = o ? Dc : ee(s), l = c ? Dc : ee(t);
  a = a == Rc ? Ji : a, l = l == Rc ? Ji : l;
  var h = a == Ji, p = l == Ji, g = a == l;
  if (g && ui(s)) {
    if (!ui(t))
      return !1;
    o = !0, h = !1;
  }
  if (g && !h)
    return r || (r = new ye()), o || ol(s) ? jh(s, t, e, n, i, r) : Jv(s, t, a, e, n, i, r);
  if (!(e & i_)) {
    var m = h && Mc.call(s, "__wrapped__"), _ = p && Mc.call(t, "__wrapped__");
    if (m || _) {
      var E = m ? s.value() : s, w = _ ? t.value() : t;
      return r || (r = new ye()), i(E, w, e, n, r);
    }
  }
  return g ? (r || (r = new ye()), n_(s, t, e, n, i, r)) : !1;
}
function Uh(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !$e(s) && !$e(t) ? s !== s && t !== t : o_(s, t, e, n, Uh, i);
}
function a_(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), c = o.length; c--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var l_ = a_();
function ba(s, t, e) {
  (e !== void 0 && !Ti(s[t], e) || e === void 0 && !(t in s)) && nl(s, t, e);
}
function c_(s) {
  return $e(s) && kr(s);
}
function ya(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function u_(s) {
  return Ai(s, Ni(s));
}
function h_(s, t, e, n, i, r, o) {
  var c = ya(s, e), a = ya(t, e), l = o.get(a);
  if (l) {
    ba(s, e, l);
    return;
  }
  var h = r ? r(c, a, e + "", s, t, o) : void 0, p = h === void 0;
  if (p) {
    var g = Is(a), m = !g && ui(a), _ = !g && !m && ol(a);
    h = a, g || m || _ ? Is(c) ? h = c : c_(c) ? h = vh(c) : m ? (p = !1, h = kh(a, !0)) : _ ? (p = !1, h = Mh(a, !0)) : h = [] : e0(a) || da(a) ? (h = c, da(c) ? h = u_(c) : (!ls(c) || sl(c)) && (h = qh(a))) : p = !1;
  }
  p && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), ba(s, e, h);
}
function Vh(s, t, e, n, i) {
  s !== t && l_(t, function(r, o) {
    if (i || (i = new ye()), ls(r))
      h_(s, t, o, e, Vh, n, i);
    else {
      var c = n ? n(ya(s, o), r, o + "", s, t, i) : void 0;
      c === void 0 && (c = r), ba(s, o, c);
    }
  }, Ni);
}
function hl(s, t) {
  return Uh(s, t);
}
var ts = M1(function(s, t, e) {
  Vh(s, t, e);
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
const Fh = class va {
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
Fh.blots = /* @__PURE__ */ new WeakMap();
let An = Fh;
function qc(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class d_ extends Ee {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    qc(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = (qc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const oe = d_;
function Ko(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class f_ extends Ee {
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
const cs = f_;
class p_ {
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
const Dr = p_, Hh = class {
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
Hh.blotName = "abstract";
let Wh = Hh;
const zh = class extends Wh {
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
zh.scope = B.INLINE_BLOT;
let g_ = zh;
const yt = g_;
class m_ {
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
function $c(s, t) {
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
const Kh = class Xe extends Wh {
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
    this.children = new m_(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = $c(t, this.scroll);
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
      const c = $c(r, this.scroll);
      (c.next !== o || c.next == null) && (c.parent != null && c.parent.removeChild(this), this.insertBefore(c, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Kh.uiClass = "";
let b_ = Kh;
const ne = b_;
function y_(s, t) {
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
    super(t, e), this.attributes = new Dr(this.domNode);
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
    n instanceof an && n.prev === this && y_(e, n.formats()) && (n.moveChildren(this), n.remove());
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
let v_ = on;
const dl = v_, ln = class _a extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(_a.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new Dr(this.domNode);
  }
  format(t, e) {
    const n = this.scroll.query(t, B.BLOCK);
    n != null && (n instanceof Ee ? this.attributes.attribute(n, e) : t === this.statics.blotName && !e ? this.replaceWith(_a.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
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
  dl,
  ln,
  yt
];
let __ = ln;
const fi = __, Ea = class extends ne {
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
Ea.blotName = "container", Ea.scope = B.BLOCK_BLOT;
let E_ = Ea;
const Mr = E_;
class w_ extends yt {
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
const Dt = w_, T_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, A_ = 100, cn = class extends ne {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, T_), this.attach();
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
      if (a >= A_)
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
cn.blotName = "scroll", cn.defaultChild = fi, cn.allowedChildren = [fi, Mr], cn.scope = B.BLOCK_BLOT, cn.tagName = "DIV";
let N_ = cn;
const fl = N_, wa = class Gh extends yt {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Gh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
wa.blotName = "text", wa.scope = B.INLINE_BLOT;
let O_ = wa;
const vr = O_, C_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Ee,
  AttributorStore: Dr,
  BlockBlot: fi,
  ClassAttributor: oe,
  ContainerBlot: Mr,
  EmbedBlot: Dt,
  InlineBlot: dl,
  LeafBlot: yt,
  ParentBlot: ne,
  Registry: An,
  Scope: B,
  ScrollBlot: fl,
  StyleAttributor: cs,
  TextBlot: vr
}, Symbol.toStringTag, { value: "Module" }));
var Ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yh(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ta = { exports: {} }, Lt = -1, wt = 1, ct = 0;
function pi(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = q_(s, t, e);
    if (r)
      return r;
  }
  var o = pl(s, t), c = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = qr(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var l = S_(s, t);
  return c && l.unshift([ct, c]), a && l.push([ct, a]), gl(l, i), n && k_(l), l;
}
function S_(s, t) {
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
  var o = L_(s, t);
  if (o) {
    var c = o[0], a = o[1], l = o[2], h = o[3], p = o[4], g = pi(c, l), m = pi(a, h);
    return g.concat([[ct, p]], m);
  }
  return x_(s, t);
}
function x_(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, c = new Array(o), a = new Array(o), l = 0; l < o; l++)
    c[l] = -1, a[l] = -1;
  c[r + 1] = 0, a[r + 1] = 0;
  for (var h = e - n, p = h % 2 !== 0, g = 0, m = 0, _ = 0, E = 0, w = 0; w < i; w++) {
    for (var T = -w + g; T <= w - m; T += 2) {
      var O = r + T, x;
      T === -w || T !== w && c[O - 1] < c[O + 1] ? x = c[O + 1] : x = c[O - 1] + 1;
      for (var L = x - T; x < e && L < n && s.charAt(x) === t.charAt(L); )
        x++, L++;
      if (c[O] = x, x > e)
        m += 2;
      else if (L > n)
        g += 2;
      else if (p) {
        var I = r + h - T;
        if (I >= 0 && I < o && a[I] !== -1) {
          var D = e - a[I];
          if (x >= D)
            return Bc(s, t, x, L);
        }
      }
    }
    for (var P = -w + _; P <= w - E; P += 2) {
      var I = r + P, D;
      P === -w || P !== w && a[I - 1] < a[I + 1] ? D = a[I + 1] : D = a[I - 1] + 1;
      for (var F = D - P; D < e && F < n && s.charAt(e - D - 1) === t.charAt(n - F - 1); )
        D++, F++;
      if (a[I] = D, D > e)
        E += 2;
      else if (F > n)
        _ += 2;
      else if (!p) {
        var O = r + h - P;
        if (O >= 0 && O < o && c[O] !== -1) {
          var x = c[O], L = r + x - O;
          if (D = e - D, x >= D)
            return Bc(s, t, x, L);
        }
      }
    }
  }
  return [
    [Lt, s],
    [wt, t]
  ];
}
function Bc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), c = t.substring(n), a = pi(i, r), l = pi(o, c);
  return a.concat(l);
}
function pl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Xh(s.charCodeAt(i - 1)) && i--, i;
}
function Pc(s, t) {
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
function qr(s, t) {
  if (!s || !t || s.slice(-1) !== t.slice(-1))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(s.length - i, s.length - r) == t.substring(t.length - i, t.length - r) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Zh(s.charCodeAt(s.length - i)) && i--, i;
}
function L_(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(m, _, E) {
    for (var w = m.substring(E, E + Math.floor(m.length / 4)), T = -1, O = "", x, L, I, D; (T = _.indexOf(w, T + 1)) !== -1; ) {
      var P = pl(
        m.substring(E),
        _.substring(T)
      ), F = qr(
        m.substring(0, E),
        _.substring(0, T)
      );
      O.length < F + P && (O = _.substring(T - F, T) + _.substring(T, T + P), x = m.substring(0, E - F), L = m.substring(E + P), I = _.substring(0, T - F), D = _.substring(T + P));
    }
    return O.length * 2 >= m.length ? [
      x,
      L,
      I,
      D,
      O
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
function k_(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, c = 0, a = 0, l = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, c = l, a = 0, l = 0, i = s[r][1]) : (s[r][0] == wt ? a += s[r][1].length : l += s[r][1].length, i && i.length <= Math.max(o, c) && i.length <= Math.max(a, l) && (s.splice(e[n - 1], 0, [
      Lt,
      i
    ]), s[e[n - 1] + 1][0] = wt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, c = 0, a = 0, l = 0, i = null, t = !0)), r++;
  for (t && gl(s), D_(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == Lt && s[r][0] == wt) {
      var h = s[r - 1][1], p = s[r][1], g = Pc(h, p), m = Pc(p, h);
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
var jc = /[^a-zA-Z0-9]/, Uc = /\s/, Vc = /[\r\n]/, I_ = /\n\r?\n$/, R_ = /^\r?\n\r?\n/;
function D_(s) {
  function t(m, _) {
    if (!m || !_)
      return 6;
    var E = m.charAt(m.length - 1), w = _.charAt(0), T = E.match(jc), O = w.match(jc), x = T && E.match(Uc), L = O && w.match(Uc), I = x && E.match(Vc), D = L && w.match(Vc), P = I && m.match(I_), F = D && _.match(R_);
    return P || F ? 5 : I || D ? 4 : T && !x && L ? 3 : x || L ? 2 : T || O ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = qr(n, i);
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
function gl(s, t) {
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
          if (a >= 0 && Jh(s[a][1])) {
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
          if (Qh(s[e][1])) {
            var l = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += l, o += l;
          }
        }
        if (e < s.length - 1 && !s[e][1]) {
          s.splice(e, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (c = pl(o, r), c !== 0 && (a >= 0 ? s[a][1] += o.substring(
            0,
            c
          ) : (s.splice(0, 0, [
            ct,
            o.substring(0, c)
          ]), e++), o = o.substring(c), r = r.substring(c)), c = qr(o, r), c !== 0 && (s[e][1] = o.substring(o.length - c) + s[e][1], o = o.substring(
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
  g && gl(s, t);
}
function Xh(s) {
  return s >= 55296 && s <= 56319;
}
function Zh(s) {
  return s >= 56320 && s <= 57343;
}
function Qh(s) {
  return Zh(s.charCodeAt(0));
}
function Jh(s) {
  return Xh(s.charCodeAt(s.length - 1));
}
function M_(s) {
  for (var t = [], e = 0; e < s.length; e++)
    s[e][1].length > 0 && t.push(s[e]);
  return t;
}
function Go(s, t, e, n) {
  return Jh(s) || Qh(n) ? null : M_([
    [ct, s],
    [Lt, t],
    [wt, e],
    [ct, n]
  ]);
}
function q_(s, t, e) {
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
      var _ = Math.min(c, p), E = a.slice(0, _), w = g.slice(0, _);
      if (E !== w)
        break t;
      var T = a.slice(_), O = g.slice(_);
      return Go(E, T, O, l);
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
      var T = l.slice(0, l.length - L), O = m.slice(0, m.length - L);
      return Go(a, T, O, I);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), I = s.slice(n.index + n.length), _ = E.length, L = I.length;
      if (o < _ + L)
        break t;
      var w = t.slice(0, _), D = t.slice(o - L);
      if (E !== w || I !== D)
        break t;
      var T = s.slice(_, r - L), O = t.slice(_, o - L);
      return Go(E, T, O, I);
    }
  return null;
}
function $r(s, t, e, n) {
  return pi(s, t, e, n, !0);
}
$r.INSERT = wt;
$r.DELETE = Lt;
$r.EQUAL = ct;
var $_ = $r, _r = { exports: {} };
_r.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", c = "[object Boolean]", a = "[object Date]", l = "[object Error]", h = "[object Function]", p = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", _ = "[object Object]", E = "[object Promise]", w = "[object RegExp]", T = "[object Set]", O = "[object String]", x = "[object Symbol]", L = "[object WeakMap]", I = "[object ArrayBuffer]", D = "[object DataView]", P = "[object Float32Array]", F = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Mt = "[object Uint16Array]", qt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, _t = /\w*$/, Fe = /^\[object .+?Constructor\]$/, Yt = /^(?:0|[1-9]\d*)$/, Y = {};
  Y[r] = Y[o] = Y[I] = Y[D] = Y[c] = Y[a] = Y[P] = Y[F] = Y[J] = Y[tt] = Y[nt] = Y[g] = Y[m] = Y[_] = Y[w] = Y[T] = Y[O] = Y[x] = Y[ot] = Y[it] = Y[Mt] = Y[qt] = !0, Y[l] = Y[h] = Y[L] = !1;
  var us = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, Ae = typeof self == "object" && self && self.Object === Object && self, pt = us || Ae || Function("return this")(), Xt = t && !t.nodeType && t, z = Xt && !0 && s && !s.nodeType && s, ce = z && z.exports === Xt;
  function He(u, d) {
    return u.set(d[0], d[1]), u;
  }
  function at(u, d) {
    return u.add(d), u;
  }
  function We(u, d) {
    for (var v = -1, N = u ? u.length : 0; ++v < N && d(u[v], v, u) !== !1; )
      ;
    return u;
  }
  function Fs(u, d) {
    for (var v = -1, N = d.length, H = u.length; ++v < N; )
      u[H + v] = d[v];
    return u;
  }
  function Ne(u, d, v, N) {
    for (var H = -1, j = u ? u.length : 0; ++H < j; )
      v = d(v, u[H], H, u);
    return v;
  }
  function hs(u, d) {
    for (var v = -1, N = Array(u); ++v < u; )
      N[v] = d(v);
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
    var d = -1, v = Array(u.size);
    return u.forEach(function(N, H) {
      v[++d] = [H, N];
    }), v;
  }
  function ze(u, d) {
    return function(v) {
      return u(d(v));
    };
  }
  function ps(u) {
    var d = -1, v = Array(u.size);
    return u.forEach(function(N) {
      v[++d] = N;
    }), v;
  }
  var Rn = Array.prototype, Dn = Function.prototype, Nt = Object.prototype, ue = pt["__core-js_shared__"], gs = function() {
    var u = /[^.]+$/.exec(ue && ue.keys && ue.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), ms = Dn.toString, Ot = Nt.hasOwnProperty, Oe = Nt.toString, Ws = RegExp(
    "^" + ms.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), he = ce ? pt.Buffer : void 0, Ce = pt.Symbol, Mn = pt.Uint8Array, $t = ze(Object.getPrototypeOf, Object), Li = Object.create, ki = Nt.propertyIsEnumerable, Vr = Rn.splice, qn = Object.getOwnPropertySymbols, zs = he ? he.isBuffer : void 0, Ii = ze(Object.keys, Object), Ks = Qt(pt, "DataView"), bs = Qt(pt, "Map"), Zt = Qt(pt, "Promise"), Gs = Qt(pt, "Set"), $n = Qt(pt, "WeakMap"), ys = Qt(Object, "create"), Bn = Et(Ks), vs = Et(bs), Pn = Et(Zt), jn = Et(Gs), Un = Et($n), Ke = Ce ? Ce.prototype : void 0, Ri = Ke ? Ke.valueOf : void 0;
  function Se(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Fr() {
    this.__data__ = ys ? ys(null) : {};
  }
  function Hr(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function Wr(u) {
    var d = this.__data__;
    if (ys) {
      var v = d[u];
      return v === n ? void 0 : v;
    }
    return Ot.call(d, u) ? d[u] : void 0;
  }
  function Di(u) {
    var d = this.__data__;
    return ys ? d[u] !== void 0 : Ot.call(d, u);
  }
  function Vn(u, d) {
    var v = this.__data__;
    return v[u] = ys && d === void 0 ? n : d, this;
  }
  Se.prototype.clear = Fr, Se.prototype.delete = Hr, Se.prototype.get = Wr, Se.prototype.has = Di, Se.prototype.set = Vn;
  function ht(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function zr() {
    this.__data__ = [];
  }
  function Kr(u) {
    var d = this.__data__, v = Xs(d, u);
    if (v < 0)
      return !1;
    var N = d.length - 1;
    return v == N ? d.pop() : Vr.call(d, v, 1), !0;
  }
  function Gr(u) {
    var d = this.__data__, v = Xs(d, u);
    return v < 0 ? void 0 : d[v][1];
  }
  function Yr(u) {
    return Xs(this.__data__, u) > -1;
  }
  function Xr(u, d) {
    var v = this.__data__, N = Xs(v, u);
    return N < 0 ? v.push([u, d]) : v[N][1] = d, this;
  }
  ht.prototype.clear = zr, ht.prototype.delete = Kr, ht.prototype.get = Gr, ht.prototype.has = Yr, ht.prototype.set = Xr;
  function gt(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Zr() {
    this.__data__ = {
      hash: new Se(),
      map: new (bs || ht)(),
      string: new Se()
    };
  }
  function Qr(u) {
    return Es(this, u).delete(u);
  }
  function Jr(u) {
    return Es(this, u).get(u);
  }
  function to(u) {
    return Es(this, u).has(u);
  }
  function eo(u, d) {
    return Es(this, u).set(u, d), this;
  }
  gt.prototype.clear = Zr, gt.prototype.delete = Qr, gt.prototype.get = Jr, gt.prototype.has = to, gt.prototype.set = eo;
  function Ct(u) {
    this.__data__ = new ht(u);
  }
  function so() {
    this.__data__ = new ht();
  }
  function no(u) {
    return this.__data__.delete(u);
  }
  function io(u) {
    return this.__data__.get(u);
  }
  function ro(u) {
    return this.__data__.has(u);
  }
  function oo(u, d) {
    var v = this.__data__;
    if (v instanceof ht) {
      var N = v.__data__;
      if (!bs || N.length < e - 1)
        return N.push([u, d]), this;
      v = this.__data__ = new gt(N);
    }
    return v.set(u, d), this;
  }
  Ct.prototype.clear = so, Ct.prototype.delete = no, Ct.prototype.get = io, Ct.prototype.has = ro, Ct.prototype.set = oo;
  function Ys(u, d) {
    var v = zn(u) || Qs(u) ? hs(u.length, String) : [], N = v.length, H = !!N;
    for (var j in u)
      Ot.call(u, j) && !(H && (j == "length" || Eo(j, N))) && v.push(j);
    return v;
  }
  function Mi(u, d, v) {
    var N = u[d];
    (!(Ot.call(u, d) && ji(N, v)) || v === void 0 && !(d in u)) && (u[d] = v);
  }
  function Xs(u, d) {
    for (var v = u.length; v--; )
      if (ji(u[v][0], d))
        return v;
    return -1;
  }
  function de(u, d) {
    return u && Wn(d, Gn(d), u);
  }
  function Fn(u, d, v, N, H, j, Z) {
    var X;
    if (N && (X = j ? N(u, H, j, Z) : N(u)), X !== void 0)
      return X;
    if (!pe(u))
      return u;
    var rt = zn(u);
    if (rt) {
      if (X = vo(u), !d)
        return mo(u, X);
    } else {
      var Q = Le(u), mt = Q == h || Q == p;
      if (Ui(u))
        return Zs(u, d);
      if (Q == _ || Q == r || mt && !j) {
        if (fs(u))
          return j ? u : {};
        if (X = fe(mt ? {} : u), !d)
          return bo(u, de(X, u));
      } else {
        if (!Y[Q])
          return j ? u : {};
        X = _o(u, Q, Fn, d);
      }
    }
    Z || (Z = new Ct());
    var St = Z.get(u);
    if (St)
      return St;
    if (Z.set(u, X), !rt)
      var lt = v ? yo(u) : Gn(u);
    return We(lt || u, function(bt, dt) {
      lt && (dt = bt, bt = u[dt]), Mi(X, dt, Fn(bt, d, v, N, dt, u, Z));
    }), X;
  }
  function ao(u) {
    return pe(u) ? Li(u) : {};
  }
  function lo(u, d, v) {
    var N = d(u);
    return zn(u) ? N : Fs(N, v(u));
  }
  function co(u) {
    return Oe.call(u);
  }
  function uo(u) {
    if (!pe(u) || To(u))
      return !1;
    var d = Kn(u) || fs(u) ? Ws : Fe;
    return d.test(Et(u));
  }
  function ho(u) {
    if (!Bi(u))
      return Ii(u);
    var d = [];
    for (var v in Object(u))
      Ot.call(u, v) && v != "constructor" && d.push(v);
    return d;
  }
  function Zs(u, d) {
    if (d)
      return u.slice();
    var v = new u.constructor(u.length);
    return u.copy(v), v;
  }
  function Hn(u) {
    var d = new u.constructor(u.byteLength);
    return new Mn(d).set(new Mn(u)), d;
  }
  function _s(u, d) {
    var v = d ? Hn(u.buffer) : u.buffer;
    return new u.constructor(v, u.byteOffset, u.byteLength);
  }
  function qi(u, d, v) {
    var N = d ? v(Hs(u), !0) : Hs(u);
    return Ne(N, He, new u.constructor());
  }
  function $i(u) {
    var d = new u.constructor(u.source, _t.exec(u));
    return d.lastIndex = u.lastIndex, d;
  }
  function fo(u, d, v) {
    var N = d ? v(ps(u), !0) : ps(u);
    return Ne(N, at, new u.constructor());
  }
  function po(u) {
    return Ri ? Object(Ri.call(u)) : {};
  }
  function go(u, d) {
    var v = d ? Hn(u.buffer) : u.buffer;
    return new u.constructor(v, u.byteOffset, u.length);
  }
  function mo(u, d) {
    var v = -1, N = u.length;
    for (d || (d = Array(N)); ++v < N; )
      d[v] = u[v];
    return d;
  }
  function Wn(u, d, v, N) {
    v || (v = {});
    for (var H = -1, j = d.length; ++H < j; ) {
      var Z = d[H], X = void 0;
      Mi(v, Z, X === void 0 ? u[Z] : X);
    }
    return v;
  }
  function bo(u, d) {
    return Wn(u, xe(u), d);
  }
  function yo(u) {
    return lo(u, Gn, xe);
  }
  function Es(u, d) {
    var v = u.__data__;
    return wo(d) ? v[typeof d == "string" ? "string" : "hash"] : v.map;
  }
  function Qt(u, d) {
    var v = ds(u, d);
    return uo(v) ? v : void 0;
  }
  var xe = qn ? ze(qn, Object) : No, Le = co;
  (Ks && Le(new Ks(new ArrayBuffer(1))) != D || bs && Le(new bs()) != g || Zt && Le(Zt.resolve()) != E || Gs && Le(new Gs()) != T || $n && Le(new $n()) != L) && (Le = function(u) {
    var d = Oe.call(u), v = d == _ ? u.constructor : void 0, N = v ? Et(v) : void 0;
    if (N)
      switch (N) {
        case Bn:
          return D;
        case vs:
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
  function vo(u) {
    var d = u.length, v = u.constructor(d);
    return d && typeof u[0] == "string" && Ot.call(u, "index") && (v.index = u.index, v.input = u.input), v;
  }
  function fe(u) {
    return typeof u.constructor == "function" && !Bi(u) ? ao($t(u)) : {};
  }
  function _o(u, d, v, N) {
    var H = u.constructor;
    switch (d) {
      case I:
        return Hn(u);
      case c:
      case a:
        return new H(+u);
      case D:
        return _s(u, N);
      case P:
      case F:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Mt:
      case qt:
        return go(u, N);
      case g:
        return qi(u, N, v);
      case m:
      case O:
        return new H(u);
      case w:
        return $i(u);
      case T:
        return fo(u, N, v);
      case x:
        return po(u);
    }
  }
  function Eo(u, d) {
    return d = d ?? i, !!d && (typeof u == "number" || Yt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function wo(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function To(u) {
    return !!gs && gs in u;
  }
  function Bi(u) {
    var d = u && u.constructor, v = typeof d == "function" && d.prototype || Nt;
    return u === v;
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
  function Pi(u) {
    return Fn(u, !0, !0);
  }
  function ji(u, d) {
    return u === d || u !== u && d !== d;
  }
  function Qs(u) {
    return Ao(u) && Ot.call(u, "callee") && (!ki.call(u, "callee") || Oe.call(u) == r);
  }
  var zn = Array.isArray;
  function Js(u) {
    return u != null && Vi(u.length) && !Kn(u);
  }
  function Ao(u) {
    return Fi(u) && Js(u);
  }
  var Ui = zs || Oo;
  function Kn(u) {
    var d = pe(u) ? Oe.call(u) : "";
    return d == h || d == p;
  }
  function Vi(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
  }
  function pe(u) {
    var d = typeof u;
    return !!u && (d == "object" || d == "function");
  }
  function Fi(u) {
    return !!u && typeof u == "object";
  }
  function Gn(u) {
    return Js(u) ? Ys(u) : ho(u);
  }
  function No() {
    return [];
  }
  function Oo() {
    return !1;
  }
  s.exports = Pi;
})(_r, _r.exports);
var td = _r.exports, Er = { exports: {} };
Er.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, c = "[object Arguments]", a = "[object Array]", l = "[object AsyncFunction]", h = "[object Boolean]", p = "[object Date]", g = "[object Error]", m = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", w = "[object Number]", T = "[object Null]", O = "[object Object]", x = "[object Promise]", L = "[object Proxy]", I = "[object RegExp]", D = "[object Set]", P = "[object String]", F = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Mt = "[object Float64Array]", qt = "[object Int8Array]", ut = "[object Int16Array]", _t = "[object Int32Array]", Fe = "[object Uint8Array]", Yt = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", us = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Xt = /^(?:0|[1-9]\d*)$/, z = {};
  z[it] = z[Mt] = z[qt] = z[ut] = z[_t] = z[Fe] = z[Yt] = z[Y] = z[us] = !0, z[c] = z[a] = z[nt] = z[h] = z[ot] = z[p] = z[g] = z[m] = z[E] = z[w] = z[O] = z[I] = z[D] = z[P] = z[tt] = !1;
  var ce = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, He = typeof self == "object" && self && self.Object === Object && self, at = ce || He || Function("return this")(), We = t && !t.nodeType && t, Fs = We && !0 && s && !s.nodeType && s, Ne = Fs && Fs.exports === We, hs = Ne && ce.process, ds = function() {
    try {
      return hs && hs.binding && hs.binding("util");
    } catch {
    }
  }(), fs = ds && ds.isTypedArray;
  function Hs(u, d) {
    for (var v = -1, N = u == null ? 0 : u.length, H = 0, j = []; ++v < N; ) {
      var Z = u[v];
      d(Z, v, u) && (j[H++] = Z);
    }
    return j;
  }
  function ze(u, d) {
    for (var v = -1, N = d.length, H = u.length; ++v < N; )
      u[H + v] = d[v];
    return u;
  }
  function ps(u, d) {
    for (var v = -1, N = u == null ? 0 : u.length; ++v < N; )
      if (d(u[v], v, u))
        return !0;
    return !1;
  }
  function Rn(u, d) {
    for (var v = -1, N = Array(u); ++v < u; )
      N[v] = d(v);
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
    var d = -1, v = Array(u.size);
    return u.forEach(function(N, H) {
      v[++d] = [H, N];
    }), v;
  }
  function ms(u, d) {
    return function(v) {
      return u(d(v));
    };
  }
  function Ot(u) {
    var d = -1, v = Array(u.size);
    return u.forEach(function(N) {
      v[++d] = N;
    }), v;
  }
  var Oe = Array.prototype, Ws = Function.prototype, he = Object.prototype, Ce = at["__core-js_shared__"], Mn = Ws.toString, $t = he.hasOwnProperty, Li = function() {
    var u = /[^.]+$/.exec(Ce && Ce.keys && Ce.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), ki = he.toString, Vr = RegExp(
    "^" + Mn.call($t).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), qn = Ne ? at.Buffer : void 0, zs = at.Symbol, Ii = at.Uint8Array, Ks = he.propertyIsEnumerable, bs = Oe.splice, Zt = zs ? zs.toStringTag : void 0, Gs = Object.getOwnPropertySymbols, $n = qn ? qn.isBuffer : void 0, ys = ms(Object.keys, Object), Bn = xe(at, "DataView"), vs = xe(at, "Map"), Pn = xe(at, "Promise"), jn = xe(at, "Set"), Un = xe(at, "WeakMap"), Ke = xe(Object, "create"), Ri = Et(Bn), Se = Et(vs), Fr = Et(Pn), Hr = Et(jn), Wr = Et(Un), Di = zs ? zs.prototype : void 0, Vn = Di ? Di.valueOf : void 0;
  function ht(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function zr() {
    this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
  }
  function Kr(u) {
    var d = this.has(u) && delete this.__data__[u];
    return this.size -= d ? 1 : 0, d;
  }
  function Gr(u) {
    var d = this.__data__;
    if (Ke) {
      var v = d[u];
      return v === n ? void 0 : v;
    }
    return $t.call(d, u) ? d[u] : void 0;
  }
  function Yr(u) {
    var d = this.__data__;
    return Ke ? d[u] !== void 0 : $t.call(d, u);
  }
  function Xr(u, d) {
    var v = this.__data__;
    return this.size += this.has(u) ? 0 : 1, v[u] = Ke && d === void 0 ? n : d, this;
  }
  ht.prototype.clear = zr, ht.prototype.delete = Kr, ht.prototype.get = Gr, ht.prototype.has = Yr, ht.prototype.set = Xr;
  function gt(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Zr() {
    this.__data__ = [], this.size = 0;
  }
  function Qr(u) {
    var d = this.__data__, v = Zs(d, u);
    if (v < 0)
      return !1;
    var N = d.length - 1;
    return v == N ? d.pop() : bs.call(d, v, 1), --this.size, !0;
  }
  function Jr(u) {
    var d = this.__data__, v = Zs(d, u);
    return v < 0 ? void 0 : d[v][1];
  }
  function to(u) {
    return Zs(this.__data__, u) > -1;
  }
  function eo(u, d) {
    var v = this.__data__, N = Zs(v, u);
    return N < 0 ? (++this.size, v.push([u, d])) : v[N][1] = d, this;
  }
  gt.prototype.clear = Zr, gt.prototype.delete = Qr, gt.prototype.get = Jr, gt.prototype.has = to, gt.prototype.set = eo;
  function Ct(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function so() {
    this.size = 0, this.__data__ = {
      hash: new ht(),
      map: new (vs || gt)(),
      string: new ht()
    };
  }
  function no(u) {
    var d = Qt(this, u).delete(u);
    return this.size -= d ? 1 : 0, d;
  }
  function io(u) {
    return Qt(this, u).get(u);
  }
  function ro(u) {
    return Qt(this, u).has(u);
  }
  function oo(u, d) {
    var v = Qt(this, u), N = v.size;
    return v.set(u, d), this.size += v.size == N ? 0 : 1, this;
  }
  Ct.prototype.clear = so, Ct.prototype.delete = no, Ct.prototype.get = io, Ct.prototype.has = ro, Ct.prototype.set = oo;
  function Ys(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.__data__ = new Ct(); ++d < v; )
      this.add(u[d]);
  }
  function Mi(u) {
    return this.__data__.set(u, n), this;
  }
  function Xs(u) {
    return this.__data__.has(u);
  }
  Ys.prototype.add = Ys.prototype.push = Mi, Ys.prototype.has = Xs;
  function de(u) {
    var d = this.__data__ = new gt(u);
    this.size = d.size;
  }
  function Fn() {
    this.__data__ = new gt(), this.size = 0;
  }
  function ao(u) {
    var d = this.__data__, v = d.delete(u);
    return this.size = d.size, v;
  }
  function lo(u) {
    return this.__data__.get(u);
  }
  function co(u) {
    return this.__data__.has(u);
  }
  function uo(u, d) {
    var v = this.__data__;
    if (v instanceof gt) {
      var N = v.__data__;
      if (!vs || N.length < e - 1)
        return N.push([u, d]), this.size = ++v.size, this;
      v = this.__data__ = new Ct(N);
    }
    return v.set(u, d), this.size = v.size, this;
  }
  de.prototype.clear = Fn, de.prototype.delete = ao, de.prototype.get = lo, de.prototype.has = co, de.prototype.set = uo;
  function ho(u, d) {
    var v = Qs(u), N = !v && ji(u), H = !v && !N && Js(u), j = !v && !N && !H && Fi(u), Z = v || N || H || j, X = Z ? Rn(u.length, String) : [], rt = X.length;
    for (var Q in u)
      $t.call(u, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      H && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      _o(Q, rt))) && X.push(Q);
    return X;
  }
  function Zs(u, d) {
    for (var v = u.length; v--; )
      if (Pi(u[v][0], d))
        return v;
    return -1;
  }
  function Hn(u, d, v) {
    var N = d(u);
    return Qs(u) ? N : ze(N, v(u));
  }
  function _s(u) {
    return u == null ? u === void 0 ? J : T : Zt && Zt in Object(u) ? Le(u) : Bi(u);
  }
  function qi(u) {
    return pe(u) && _s(u) == c;
  }
  function $i(u, d, v, N, H) {
    return u === d ? !0 : u == null || d == null || !pe(u) && !pe(d) ? u !== u && d !== d : fo(u, d, v, N, $i, H);
  }
  function fo(u, d, v, N, H, j) {
    var Z = Qs(u), X = Qs(d), rt = Z ? a : fe(u), Q = X ? a : fe(d);
    rt = rt == c ? O : rt, Q = Q == c ? O : Q;
    var mt = rt == O, St = Q == O, lt = rt == Q;
    if (lt && Js(u)) {
      if (!Js(d))
        return !1;
      Z = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new de()), Z || Fi(u) ? Wn(u, d, v, N, H, j) : bo(u, d, rt, v, N, H, j);
    if (!(v & i)) {
      var bt = mt && $t.call(u, "__wrapped__"), dt = St && $t.call(d, "__wrapped__");
      if (bt || dt) {
        var Ge = bt ? u.value() : u, ke = dt ? d.value() : d;
        return j || (j = new de()), H(Ge, ke, v, N, j);
      }
    }
    return lt ? (j || (j = new de()), yo(u, d, v, N, H, j)) : !1;
  }
  function po(u) {
    if (!Vi(u) || wo(u))
      return !1;
    var d = Ui(u) ? Vr : pt;
    return d.test(Et(u));
  }
  function go(u) {
    return pe(u) && Kn(u.length) && !!z[_s(u)];
  }
  function mo(u) {
    if (!To(u))
      return ys(u);
    var d = [];
    for (var v in Object(u))
      $t.call(u, v) && v != "constructor" && d.push(v);
    return d;
  }
  function Wn(u, d, v, N, H, j) {
    var Z = v & i, X = u.length, rt = d.length;
    if (X != rt && !(Z && rt > X))
      return !1;
    var Q = j.get(u);
    if (Q && j.get(d))
      return Q == d;
    var mt = -1, St = !0, lt = v & r ? new Ys() : void 0;
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
          if (!Nt(lt, ws) && (bt === ke || H(bt, ke, v, N, j)))
            return lt.push(ws);
        })) {
          St = !1;
          break;
        }
      } else if (!(bt === dt || H(bt, dt, v, N, j))) {
        St = !1;
        break;
      }
    }
    return j.delete(u), j.delete(d), St;
  }
  function bo(u, d, v, N, H, j, Z) {
    switch (v) {
      case ot:
        if (u.byteLength != d.byteLength || u.byteOffset != d.byteOffset)
          return !1;
        u = u.buffer, d = d.buffer;
      case nt:
        return !(u.byteLength != d.byteLength || !j(new Ii(u), new Ii(d)));
      case h:
      case p:
      case w:
        return Pi(+u, +d);
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
  function yo(u, d, v, N, H, j) {
    var Z = v & i, X = Es(u), rt = X.length, Q = Es(d), mt = Q.length;
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
        var Sl = Z ? N(ws, ke, lt, d, u, j) : N(ke, ws, lt, u, d, j);
      if (!(Sl === void 0 ? ke === ws || H(ke, ws, v, N, j) : Sl)) {
        dt = !1;
        break;
      }
      Ge || (Ge = lt == "constructor");
    }
    if (dt && !Ge) {
      var Hi = u.constructor, Wi = d.constructor;
      Hi != Wi && "constructor" in u && "constructor" in d && !(typeof Hi == "function" && Hi instanceof Hi && typeof Wi == "function" && Wi instanceof Wi) && (dt = !1);
    }
    return j.delete(u), j.delete(d), dt;
  }
  function Es(u) {
    return Hn(u, Gn, vo);
  }
  function Qt(u, d) {
    var v = u.__data__;
    return Eo(d) ? v[typeof d == "string" ? "string" : "hash"] : v.map;
  }
  function xe(u, d) {
    var v = ue(u, d);
    return po(v) ? v : void 0;
  }
  function Le(u) {
    var d = $t.call(u, Zt), v = u[Zt];
    try {
      u[Zt] = void 0;
      var N = !0;
    } catch {
    }
    var H = ki.call(u);
    return N && (d ? u[Zt] = v : delete u[Zt]), H;
  }
  var vo = Gs ? function(u) {
    return u == null ? [] : (u = Object(u), Hs(Gs(u), function(d) {
      return Ks.call(u, d);
    }));
  } : No, fe = _s;
  (Bn && fe(new Bn(new ArrayBuffer(1))) != ot || vs && fe(new vs()) != E || Pn && fe(Pn.resolve()) != x || jn && fe(new jn()) != D || Un && fe(new Un()) != tt) && (fe = function(u) {
    var d = _s(u), v = d == O ? u.constructor : void 0, N = v ? Et(v) : "";
    if (N)
      switch (N) {
        case Ri:
          return ot;
        case Se:
          return E;
        case Fr:
          return x;
        case Hr:
          return D;
        case Wr:
          return tt;
      }
    return d;
  });
  function _o(u, d) {
    return d = d ?? o, !!d && (typeof u == "number" || Xt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function Eo(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function wo(u) {
    return !!Li && Li in u;
  }
  function To(u) {
    var d = u && u.constructor, v = typeof d == "function" && d.prototype || he;
    return u === v;
  }
  function Bi(u) {
    return ki.call(u);
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
  function Pi(u, d) {
    return u === d || u !== u && d !== d;
  }
  var ji = qi(/* @__PURE__ */ function() {
    return arguments;
  }()) ? qi : function(u) {
    return pe(u) && $t.call(u, "callee") && !Ks.call(u, "callee");
  }, Qs = Array.isArray;
  function zn(u) {
    return u != null && Kn(u.length) && !Ui(u);
  }
  var Js = $n || Oo;
  function Ao(u, d) {
    return $i(u, d);
  }
  function Ui(u) {
    if (!Vi(u))
      return !1;
    var d = _s(u);
    return d == m || d == _ || d == l || d == L;
  }
  function Kn(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
  }
  function Vi(u) {
    var d = typeof u;
    return u != null && (d == "object" || d == "function");
  }
  function pe(u) {
    return u != null && typeof u == "object";
  }
  var Fi = fs ? Dn(fs) : go;
  function Gn(u) {
    return zn(u) ? ho(u) : mo(u);
  }
  function No() {
    return [];
  }
  function Oo() {
    return !1;
  }
  s.exports = Ao;
})(Er, Er.exports);
var ed = Er.exports, ml = {};
Object.defineProperty(ml, "__esModule", { value: !0 });
const B_ = td, P_ = ed;
var Aa;
(function(s) {
  function t(r = {}, o = {}, c = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = B_(o);
    c || (a = Object.keys(a).reduce((l, h) => (a[h] != null && (l[h] = a[h]), l), {}));
    for (const l in r)
      r[l] !== void 0 && o[l] === void 0 && (a[l] = r[l]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.compose = t;
  function e(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const c = Object.keys(r).concat(Object.keys(o)).reduce((a, l) => (P_(r[l], o[l]) || (a[l] = o[l] === void 0 ? null : o[l]), a), {});
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
})(Aa || (Aa = {}));
ml.default = Aa;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
var Na;
(function(s) {
  function t(e) {
    return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
  }
  s.length = t;
})(Na || (Na = {}));
Br.default = Na;
var bl = {};
Object.defineProperty(bl, "__esModule", { value: !0 });
const Fc = Br;
class j_ {
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
      const n = this.offset, i = Fc.default.length(e);
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
    return this.ops[this.index] ? Fc.default.length(this.ops[this.index]) - this.offset : 1 / 0;
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
bl.default = j_;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = $_, n = td, i = ed, r = ml;
  t.AttributeMap = r.default;
  const o = Br;
  t.Op = o.default;
  const c = bl;
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
      const _ = {};
      return typeof g == "string" && g.length === 0 ? this : (_.insert = g, m != null && typeof m == "object" && Object.keys(m).length > 0 && (_.attributes = m), this.push(_));
    }
    delete(g) {
      return g <= 0 ? this : this.push({ delete: g });
    }
    retain(g, m) {
      if (typeof g == "number" && g <= 0)
        return this;
      const _ = { retain: g };
      return m != null && typeof m == "object" && Object.keys(m).length > 0 && (_.attributes = m), this.push(_);
    }
    push(g) {
      let m = this.ops.length, _ = this.ops[m - 1];
      if (g = n(g), typeof _ == "object") {
        if (typeof g.delete == "number" && typeof _.delete == "number")
          return this.ops[m - 1] = { delete: _.delete + g.delete }, this;
        if (typeof _.delete == "number" && g.insert != null && (m -= 1, _ = this.ops[m - 1], typeof _ != "object"))
          return this.ops.unshift(g), this;
        if (i(g.attributes, _.attributes)) {
          if (typeof g.insert == "string" && typeof _.insert == "string")
            return this.ops[m - 1] = { insert: _.insert + g.insert }, typeof g.attributes == "object" && (this.ops[m - 1].attributes = g.attributes), this;
          if (typeof g.retain == "number" && typeof _.retain == "number")
            return this.ops[m - 1] = { retain: _.retain + g.retain }, typeof g.attributes == "object" && (this.ops[m - 1].attributes = g.attributes), this;
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
      const m = [], _ = [];
      return this.forEach((E) => {
        (g(E) ? m : _).push(E);
      }), [m, _];
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
      const _ = [], E = new c.default(this.ops);
      let w = 0;
      for (; w < m && E.hasNext(); ) {
        let T;
        w < g ? T = E.next(g - w) : (T = E.next(m - w), _.push(T)), w += o.default.length(T);
      }
      return new h(_);
    }
    compose(g) {
      const m = new c.default(this.ops), _ = new c.default(g.ops), E = [], w = _.peek();
      if (w != null && typeof w.retain == "number" && w.attributes == null) {
        let O = w.retain;
        for (; m.peekType() === "insert" && m.peekLength() <= O; )
          O -= m.peekLength(), E.push(m.next());
        w.retain - O > 0 && _.next(w.retain - O);
      }
      const T = new h(E);
      for (; m.hasNext() || _.hasNext(); )
        if (_.peekType() === "insert")
          T.push(_.next());
        else if (m.peekType() === "delete")
          T.push(m.next());
        else {
          const O = Math.min(m.peekLength(), _.peekLength()), x = m.next(O), L = _.next(O);
          if (L.retain) {
            const I = {};
            if (typeof x.retain == "number")
              I.retain = typeof L.retain == "number" ? O : L.retain;
            else if (typeof L.retain == "number")
              x.retain == null ? I.insert = x.insert : I.retain = x.retain;
            else {
              const P = x.retain == null ? "insert" : "retain", [F, J, tt] = l(x[P], L.retain), nt = h.getHandler(F);
              I[P] = {
                [F]: nt.compose(J, tt, P === "retain")
              };
            }
            const D = r.default.compose(x.attributes, L.attributes, typeof x.retain == "number");
            if (D && (I.attributes = D), T.push(I), !_.hasNext() && i(T.ops[T.ops.length - 1], I)) {
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
      const _ = [this, g].map((x) => x.map((L) => {
        if (L.insert != null)
          return typeof L.insert == "string" ? L.insert : a;
        const I = x === g ? "on" : "with";
        throw new Error("diff() called " + I + " non-document");
      }).join("")), E = new h(), w = e(_[0], _[1], m, !0), T = new c.default(this.ops), O = new c.default(g.ops);
      return w.forEach((x) => {
        let L = x[1].length;
        for (; L > 0; ) {
          let I = 0;
          switch (x[0]) {
            case e.INSERT:
              I = Math.min(O.peekLength(), L), E.push(O.next(I));
              break;
            case e.DELETE:
              I = Math.min(L, T.peekLength()), T.next(I), E.delete(I);
              break;
            case e.EQUAL:
              I = Math.min(T.peekLength(), O.peekLength(), L);
              const D = T.next(I), P = O.next(I);
              i(D.insert, P.insert) ? E.retain(I, r.default.diff(D.attributes, P.attributes)) : E.push(P).delete(I);
              break;
          }
          L -= I;
        }
      }), E.chop();
    }
    eachLine(g, m = `
`) {
      const _ = new c.default(this.ops);
      let E = new h(), w = 0;
      for (; _.hasNext(); ) {
        if (_.peekType() !== "insert")
          return;
        const T = _.peek(), O = o.default.length(T) - _.peekLength(), x = typeof T.insert == "string" ? T.insert.indexOf(m, O) - O : -1;
        if (x < 0)
          E.push(_.next());
        else if (x > 0)
          E.push(_.next(x));
        else {
          if (g(E, _.next(1).attributes || {}, w) === !1)
            return;
          w += 1, E = new h();
        }
      }
      E.length() > 0 && g(E, {}, w);
    }
    invert(g) {
      const m = new h();
      return this.reduce((_, E) => {
        if (E.insert)
          m.delete(o.default.length(E));
        else {
          if (typeof E.retain == "number" && E.attributes == null)
            return m.retain(E.retain), _ + E.retain;
          if (E.delete || typeof E.retain == "number") {
            const w = E.delete || E.retain;
            return g.slice(_, _ + w).forEach((O) => {
              E.delete ? m.push(O) : E.retain && E.attributes && m.retain(o.default.length(O), r.default.invert(E.attributes, O.attributes));
            }), _ + w;
          } else if (typeof E.retain == "object" && E.retain !== null) {
            const w = g.slice(_, _ + 1), T = new c.default(w.ops).next(), [O, x, L] = l(E.retain, T.insert), I = h.getHandler(O);
            return m.retain({ [O]: I.invert(x, L) }, r.default.invert(E.attributes, T.attributes)), _ + 1;
          }
        }
        return _;
      }, 0), m.chop();
    }
    transform(g, m = !1) {
      if (m = !!m, typeof g == "number")
        return this.transformPosition(g, m);
      const _ = g, E = new c.default(this.ops), w = new c.default(_.ops), T = new h();
      for (; E.hasNext() || w.hasNext(); )
        if (E.peekType() === "insert" && (m || w.peekType() !== "insert"))
          T.retain(o.default.length(E.next()));
        else if (w.peekType() === "insert")
          T.push(w.next());
        else {
          const O = Math.min(E.peekLength(), w.peekLength()), x = E.next(O), L = w.next(O);
          if (x.delete)
            continue;
          if (L.delete)
            T.push(L);
          else {
            const I = x.retain, D = L.retain;
            let P = typeof D == "object" && D !== null ? D : O;
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
      const _ = new c.default(this.ops);
      let E = 0;
      for (; _.hasNext() && E <= g; ) {
        const w = _.peekLength(), T = _.peekType();
        if (_.next(), T === "delete") {
          g -= Math.min(w, g - E);
          continue;
        } else T === "insert" && (E < g || !m) && (g += w);
        E += w;
      }
      return g;
    }
  }
  h.Op = o.default, h.OpIterator = c.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, s.exports = h, s.exports.default = h;
})(Ta, Ta.exports);
var Ht = Ta.exports;
const $ = /* @__PURE__ */ Yh(Ht);
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
let ie = class extends vr {
};
function Pr(s) {
  return s.replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t]);
}
const ge = class ge extends dl {
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
const Hc = 1;
class ft extends fi {
  constructor() {
    super(...arguments);
    M(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = sd(this)), this.cache.delta;
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
    return this.cache.length == null && (this.cache.length = super.length() + Hc), this.cache.length;
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
    if (n && (e === 0 || e >= this.length() - Hc)) {
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
    super.attach(), this.attributes = new Dr(this.domNode);
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
function sd(s) {
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
var nd = { exports: {} };
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
    var m = new i(h, p || a, g), _ = e ? e + l : l;
    return a._events[_] ? a._events[_].fn ? a._events[_] = [a._events[_], m] : a._events[_].push(m) : (a._events[_] = m, a._eventsCount++), a;
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
    for (var g = 0, m = p.length, _ = new Array(m); g < m; g++)
      _[g] = p[g].fn;
    return _;
  }, c.prototype.listenerCount = function(l) {
    var h = e ? e + l : l, p = this._events[h];
    return p ? p.fn ? 1 : p.length : 0;
  }, c.prototype.emit = function(l, h, p, g, m, _) {
    var E = e ? e + l : l;
    if (!this._events[E]) return !1;
    var w = this._events[E], T = arguments.length, O, x;
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
          return w.fn.call(w.context, h, p, g, m, _), !0;
      }
      for (x = 1, O = new Array(T - 1); x < T; x++)
        O[x - 1] = arguments[x];
      w.fn.apply(w.context, O);
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
            if (!O) for (I = 1, O = new Array(T - 1); I < T; I++)
              O[I - 1] = arguments[I];
            w[x].fn.apply(w[x].context, O);
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
    var _ = this._events[m];
    if (_.fn)
      _.fn === h && (!g || _.once) && (!p || _.context === p) && o(this, m);
    else {
      for (var E = 0, w = [], T = _.length; E < T; E++)
        (_[E].fn !== h || g && !_[E].once || p && _[E].context !== p) && w.push(_[E]);
      w.length ? this._events[m] = w.length === 1 ? w[0] : w : o(this, m);
    }
    return this;
  }, c.prototype.removeAllListeners = function(l) {
    var h;
    return l ? (h = e ? e + l : l, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = e, c.EventEmitter = c, s.exports = c;
})(nd);
var U_ = nd.exports;
const V_ = /* @__PURE__ */ Yh(U_), Oa = /* @__PURE__ */ new WeakMap(), Ca = ["error", "warn", "log", "info"];
let Sa = "warn";
function id(s) {
  if (Sa && Ca.indexOf(s) <= Ca.indexOf(Sa)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      e[n - 1] = arguments[n];
    console[s](...e);
  }
}
function Ve(s) {
  return Ca.reduce((t, e) => (t[e] = id.bind(console, e, s), t), {});
}
Ve.level = (s) => {
  Sa = s;
};
id.level = Ve.level;
const Yo = Ve("quill:events"), F_ = ["selectionchange", "mousedown", "mouseup", "click"];
F_.forEach((s) => {
  document.addEventListener(s, function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = Oa.get(i);
      r && r.emitter && r.emitter.handleDOM(...e);
    });
  });
});
class q extends V_ {
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
class H_ {
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
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !hl(e, this.lastRange)) {
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
const W_ = /^[ -~]*$/;
class z_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const n = Wc(t), i = new $();
    return G_(n.ops.slice()).reduce((o, c) => {
      const a = Ht.Op.length(c);
      let l = c.attributes || {}, h = !1, p = !1;
      if (c.insert != null) {
        if (i.retain(a), typeof c.insert == "string") {
          const _ = c.insert;
          p = !_.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ft, o)[0]), this.scroll.insertAt(o, _);
          const [E, w] = this.scroll.line(o);
          let T = ts({}, Ut(E));
          if (E instanceof ft) {
            const [O] = E.descendant(yt, w);
            O && (T = ts(T, Ut(O)));
          }
          l = Ht.AttributeMap.diff(T, l) || {};
        } else if (typeof c.insert == "object") {
          const _ = Object.keys(c.insert)[0];
          if (_ == null) return o;
          const E = this.scroll.query(_, B.INLINE) != null;
          if (E)
            (e <= o || this.scroll.descendant(Ft, o)[0]) && (p = !0);
          else if (o > 0) {
            const [w, T] = this.scroll.descendant(yt, o - 1);
            w instanceof ie ? w.value()[T] !== `
` && (h = !0) : w instanceof Dt && w.statics.scope === B.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, _, c.insert[_]), E) {
            const [w] = this.scroll.descendant(yt, o);
            if (w) {
              const T = ts({}, Ut(w));
              l = Ht.AttributeMap.diff(T, l) || {};
            }
          }
        }
        e += a;
      } else if (i.push(c), c.retain !== null && typeof c.retain == "object") {
        const _ = Object.keys(c.retain)[0];
        if (_ == null) return o;
        this.scroll.updateEmbedAt(o, _, c.retain[_]);
      }
      Object.keys(l).forEach((_) => {
        this.scroll.formatAt(o, a, _, l[_]);
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
        l = K_(Ut(h), l);
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
      return n.length() >= i + e && !(i === 0 && e === r) ? gi(n, i, e, !0) : gi(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, e) {
    const n = Wc(e), i = new $().retain(t).concat(n);
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
    e[0].target.data.match(W_) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = Ut(r), c = r.offset(this.scroll), a = e[0].oldValue.replace(Nn.CONTENTS, ""), l = new $().insert(a), h = new $().insert(r.value()), p = n && {
        oldRange: zc(n.oldRange, -c),
        newRange: zc(n.newRange, -c)
      };
      t = new $().retain(c).concat(l.diff(h, p)).reduce((m, _) => _.insert ? m.insert(_.insert, o) : m.push(_), new $()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !hl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
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
    return e.push(c), o === t + 1 ? `<${l}><li${h}>${gi(n, i, r)}${un(a, o, e)}` : `<${l}><li>${un(s, t + 1, e)}`;
  const p = e[e.length - 1];
  if (o === t && c === p)
    return `</li><li${h}>${gi(n, i, r)}${un(a, o, e)}`;
  const [g] = Qo(e.pop());
  return `</li></${g}>${un(s, t - 1, e)}`;
}
function gi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof ie)
    return Pr(s.value().slice(t, t + e));
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
      i.push(gi(l, h, p));
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
function K_(s, t) {
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
function Wc(s) {
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
function zc(s, t) {
  let {
    index: e,
    length: n
  } = s;
  return new Ds(e + t, n);
}
function G_(s) {
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
const tr = "\uFEFF";
class yl extends Dt {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(tr), this.rightGuard = document.createTextNode(tr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, n;
    const i = t.data.split(tr).join("");
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
    return t.data = tr, e;
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
class Y_ {
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
    e && !(e instanceof yl) && (this.emitter.emit(q.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(q.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(q.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(q.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const oi = class oi {
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
M(oi, "DEFAULTS", {
  modules: {}
}), M(oi, "themes", {
  default: oi
});
let On = oi;
const X_ = (s) => s.parentElement || s.getRootNode().host || null, Z_ = (s) => {
  const t = s.getBoundingClientRect(), e = "offsetWidth" in s && Math.abs(t.width) / s.offsetWidth || 1, n = "offsetHeight" in s && Math.abs(t.height) / s.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + s.clientWidth * e,
    bottom: t.top + s.clientHeight * n,
    left: t.left
  };
}, er = (s) => {
  const t = parseInt(s, 10);
  return Number.isNaN(t) ? 0 : t;
}, Kc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, Q_ = (s, t) => {
  var r, o, c;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, l = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : Z_(i), h = getComputedStyle(i), p = Kc(n.left, n.right, l.left, l.right, er(h.scrollPaddingLeft), er(h.scrollPaddingRight)), g = Kc(n.top, n.bottom, l.top, l.bottom, er(h.scrollPaddingTop), er(h.scrollPaddingBottom));
    if (p || g)
      if (a)
        (c = e.defaultView) == null || c.scrollBy(p, g);
      else {
        const {
          scrollLeft: m,
          scrollTop: _
        } = i;
        g && (i.scrollTop += g), p && (i.scrollLeft += p);
        const E = i.scrollLeft - m, w = i.scrollTop - _;
        n = {
          left: n.left - E,
          top: n.top - w,
          right: n.right - E,
          bottom: n.bottom - w
        };
      }
    i = a || h.position === "fixed" ? null : X_(i);
  }
}, J_ = 100, tE = ["block", "break", "cursor", "inline", "scroll", "text"], eE = (s, t, e) => {
  const n = new An();
  return tE.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), s.forEach((i) => {
    let r = t.query(i);
    r || e.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > J_) {
        e.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, mn = Ve("quill"), sr = new An();
ne.uiClass = "ql-ui";
const te = class te {
  static debug(t) {
    t === !0 && (t = "log"), Ve.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Oa.get(t) || sr.find(t, e);
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
      this.imports[t] != null && !n && mn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && sr.register(e), typeof e.register == "function" && e.register(sr);
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
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Oa.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new q();
    const i = fl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new z_(this.scroll), this.selection = new H_(this.scroll, this.emitter), this.composition = new Y_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(q.events.EDITOR_CHANGE, (o) => {
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
    Q_(this.root, t);
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
  registry: sr,
  theme: "default"
}), M(te, "events", q.events), M(te, "sources", q.sources), M(te, "version", "2.0.2"), M(te, "imports", {
  delta: $,
  parchment: C_,
  "core/module": le,
  "core/theme": On
});
let C = te;
function Gc(s) {
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
function Yc(s) {
  return Object.fromEntries(Object.entries(s).filter((t) => t[1] !== void 0));
}
function sE(s, t) {
  const e = Gc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === C.DEFAULTS.theme ? On : C.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = C.DEFAULTS, {
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
    ...Yc(a),
    ...Yc(t)
  };
  let g = t.registry;
  return g ? t.formats && mn.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? eE(t.formats, p.registry, mn) : p.registry, {
    ...p,
    registry: g,
    container: e,
    theme: i,
    modules: Object.entries(h).reduce((m, _) => {
      let [E, w] = _;
      if (!w) return m;
      const T = C.import(`modules/${E}`);
      return T == null ? (mn.error(`Cannot load ${E} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [E]: ts({}, T.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Gc(p.bounds)
  };
}
function Jt(s, t, e, n) {
  if (!this.isEnabled() && t === q.sources.USER && !this.allowReadOnlyEdits)
    return new $();
  let i = e == null ? null : this.getSelection();
  const r = this.editor.delta, o = s();
  if (i != null && (e === !0 && (e = i.index), n == null ? i = Xc(i, o, t) : n !== 0 && (i = Xc(i, e, n, t)), this.setSelection(i, q.sources.SILENT)), o.length() > 0) {
    const c = [q.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(q.events.EDITOR_CHANGE, ...c), t !== q.sources.SILENT && this.emitter.emit(...c);
  }
  return o;
}
function Ie(s, t, e, n, i) {
  let r = {};
  return typeof s.index == "number" && typeof s.length == "number" ? typeof t != "number" ? (i = n, n = e, e = t, t = s.length, s = s.index) : (t = s.length, s = s.index) : typeof t != "number" && (i = n, n = e, e = t, t = 0), typeof e == "object" ? (r = e, i = n) : typeof e == "string" && (n != null ? r[e] = n : i = e), i = i || q.sources.API, [s, t, r, i];
}
function Xc(s, t, e, n) {
  const i = typeof e == "number" ? e : 0;
  if (s == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [s.index, s.index + s.length].map((c) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(c, n !== q.sources.USER)
  )) : [r, o] = [s.index, s.index + s.length].map((c) => c < t || c === t && n === q.sources.USER ? c : i >= 0 ? c + i : Math.max(t, c + i)), new Ds(r, o - r);
}
class js extends Mr {
}
function Zc(s) {
  return s instanceof ft || s instanceof Ft;
}
function Qc(s) {
  return typeof s.updateContent == "function";
}
class hn extends fl {
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
      Object.keys(m).forEach((_) => {
        this.formatAt(p - 1, 1, _, m[_]);
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
    return t === this.length() ? this.line(t - 1) : this.descendant(Zc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let c = [], a = o;
      return i.children.forEachAt(r, o, (l, h, p) => {
        Zc(l) ? c.push(l) : l instanceof Mr && (c = c.concat(n(l, h, a))), a -= p;
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
      return r && !Qc(r);
    }), t.length > 0 && this.emitter.emit(q.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(q.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, n) {
    const [i] = this.descendant((r) => r instanceof Ft, t);
    i && i.statics.blotName === e && Qc(i) && i.updateContent(n);
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
}, nE = new Ee("align", "align", vl), rd = new oe("align", "ql-align", vl), od = new cs("align", "text-align", vl);
class ad extends cs {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const iE = new oe("color", "ql-color", {
  scope: B.INLINE
}), _l = new ad("color", "color", {
  scope: B.INLINE
}), rE = new oe("background", "ql-bg", {
  scope: B.INLINE
}), El = new ad("background", "background-color", {
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
${Pr(this.code(t, e))}
</pre>`;
  }
}
class vt extends ft {
  static register() {
    C.register(Us);
  }
}
M(vt, "TAB", "  ");
class wl extends we {
}
wl.blotName = "code";
wl.tagName = "CODE";
vt.blotName = "code-block";
vt.className = "ql-code-block";
vt.tagName = "DIV";
Us.blotName = "code-block-container";
Us.className = "ql-code-block-container";
Us.tagName = "DIV";
Us.allowedChildren = [vt];
vt.allowedChildren = [ie, ae, Nn];
vt.requiredContainer = Us;
const Tl = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, ld = new Ee("direction", "dir", Tl), cd = new oe("direction", "ql-direction", Tl), ud = new cs("direction", "direction", Tl), hd = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, dd = new oe("font", "ql-font", hd);
class oE extends cs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const fd = new oE("font", "font-family", hd), pd = new oe("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), gd = new cs("size", "font-size", {
  scope: B.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), aE = Ve("quill:keyboard"), lE = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class jr extends le {
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((T) => jr.match(t, T));
      if (i.length === 0) return;
      const r = C.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [c, a] = this.quill.getLine(o.index), [l, h] = this.quill.getLeaf(o.index), [p, g] = o.length === 0 ? [l, h] : this.quill.getLeaf(o.index + o.length), m = l instanceof vr ? l.value().slice(0, h) : "", _ = p instanceof vr ? p.value().slice(g) : "", E = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && c.length() <= 1,
        format: this.quill.getFormat(o),
        line: c,
        offset: a,
        prefix: m,
        suffix: _,
        event: t
      };
      i.some((T) => {
        if (T.collapsed != null && T.collapsed !== E.collapsed || T.empty != null && T.empty !== E.empty || T.offset != null && T.offset !== E.offset)
          return !1;
        if (Array.isArray(T.format)) {
          if (T.format.every((O) => E.format[O] == null))
            return !1;
        } else if (typeof T.format == "object" && !Object.keys(T.format).every((O) => T.format[O] === !0 ? E.format[O] != null : T.format[O] === !1 ? E.format[O] == null : hl(T.format[O], E.format[O])))
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
    this.quill.updateContents(o, C.sources.USER), this.quill.focus();
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
    this.quill.updateContents(o, C.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Al({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, e) {
    const n = Object.keys(e.format).reduce((r, o) => (this.quill.scroll.query(o, B.BLOCK) && !Array.isArray(e.format[o]) && (r[o] = e.format[o]), r), {}), i = new $().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(t.index + 1, C.sources.SILENT), this.quill.focus();
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
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", C.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(s, t) {
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
      handler(s, t) {
        t.format.indent != null ? this.quill.format("indent", "-1", C.sources.USER) : t.format.list != null && this.quill.format("list", !1, C.sources.USER);
      }
    },
    "indent code-block": Jc(!0),
    "outdent code-block": Jc(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(s) {
        this.quill.deleteText(s.index - 1, 1, C.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(s, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const e = new $().retain(s.index).delete(s.length).insert("	");
        return this.quill.updateContents(e, C.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index + 1, C.sources.SILENT), !1;
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
      handler(s, t) {
        const e = {
          list: !1
        };
        t.format.indent && (e.indent = !1), this.quill.formatLine(s.index, s.length, e, C.sources.USER);
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
        this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(s.index + 1, C.sources.SILENT), this.quill.scrollSelectionIntoView();
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
        this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(s.index + 1, C.sources.SILENT), this.quill.scrollSelectionIntoView();
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
            this.quill.updateContents(a, C.sources.USER), this.quill.setSelection(s.index + 1, s.length, C.sources.SILENT);
          } else if (o > 0) {
            c += e.length();
            const a = new $().retain(c).insert(`
`);
            this.quill.updateContents(a, C.sources.USER), this.quill.setSelection(c, C.sources.USER);
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
        e.shiftKey ? this.quill.setSelection(i - 1, C.sources.USER) : this.quill.setSelection(i + n.length(), C.sources.USER);
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
        this.quill.insertText(s.index, " ", C.sources.USER), this.quill.history.cutoff();
        const o = new $().retain(s.index - i).delete(e + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, C.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index - e, C.sources.SILENT), !1;
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
            return this.quill.updateContents(r, C.sources.USER), this.quill.setSelection(s.index - 1, C.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": nr("ArrowLeft", !1),
    "embed left shift": nr("ArrowLeft", !0),
    "embed right": nr("ArrowRight", !1),
    "embed right shift": nr("ArrowRight", !0),
    "table down": tu(!1),
    "table up": tu(!0)
  }
};
jr.DEFAULTS = cE;
function Jc(s) {
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
        this.quill.insertText(t.index, r, C.sources.USER), this.quill.setSelection(t.index + r.length, C.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: c,
        length: a
      } = t;
      o.forEach((l, h) => {
        s ? (l.insertAt(0, r), h === 0 ? c += r.length : a += r.length) : l.domNode.textContent.startsWith(r) && (l.deleteAt(0, r.length), h === 0 ? c -= r.length : a -= r.length);
      }), this.quill.update(C.sources.USER), this.quill.setSelection(c, a, C.sources.SILENT);
    }
  };
}
function nr(s, t) {
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
      return r instanceof Dt ? (s === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, C.sources.USER) : this.quill.setSelection(n.index - 1, C.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, C.sources.USER) : this.quill.setSelection(n.index + n.length + 1, C.sources.USER), !1) : !0;
    }
  };
}
function ea(s) {
  return {
    key: s[0],
    shortKey: !0,
    handler(t, e) {
      this.quill.format(s, !e.format[s], C.sources.USER);
    }
  };
}
function tu(s) {
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
          this.quill.setSelection(a, 0, C.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (s ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, C.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, C.sources.USER));
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
function Al(s) {
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
  t.deleteText(e, C.sources.USER), Object.keys(i).length > 0 && t.formatLine(e.index, 1, i, C.sources.USER), t.setSelection(e.index, C.sources.SILENT);
}
function hE(s, t, e, n) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? n === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const dE = /font-weight:\s*normal/, fE = ["P", "OL", "UL"], eu = (s) => s && fE.includes(s.tagName), pE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => eu(t.previousElementSibling) && eu(t.nextElementSibling)).forEach((t) => {
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
const bE = /\bmso-list:[^;]*ignore/i, yE = /\bmso-list:[^;]*\bl(\d+)/i, vE = /\bmso-list:[^;]*\blevel(\d+)/i, _E = (s, t) => {
  const e = s.getAttribute("style"), n = e == null ? void 0 : e.match(yE);
  if (!n)
    return null;
  const i = Number(n[1]), r = e == null ? void 0 : e.match(vE), o = r ? Number(r[1]) : 1, c = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(c), l = a && a[1] === "bullet" ? "bullet" : "ordered";
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
  const i = s.documentElement.innerHTML, r = n.map((a) => _E(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let l = r.shift();
    for (; l; )
      a.push(l), l = r.length && ((o = r[0]) == null ? void 0 : o.element) === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === l.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((m) => {
      const _ = document.createElement("li");
      _.setAttribute("data-list", m.type), m.indent > 1 && _.setAttribute("class", `ql-indent-${m.indent - 1}`), _.innerHTML = m.element.innerHTML, h.appendChild(_);
    });
    const p = (c = a[0]) == null ? void 0 : c.element, {
      parentNode: g
    } = p ?? {};
    p && (g == null || g.replaceChild(h, p)), a.slice(1).forEach((m) => {
      let {
        element: _
      } = m;
      g == null || g.removeChild(_);
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
}, NE = Ve("quill:clipboard"), OE = [[Node.TEXT_NODE, BE], [Node.TEXT_NODE, nu], ["br", kE], [Node.ELEMENT_NODE, nu], [Node.ELEMENT_NODE, LE], [Node.ELEMENT_NODE, xE], [Node.ELEMENT_NODE, qE], ["li", DE], ["ol, ul", ME], ["pre", IE], ["tr", $E], ["b", sa("bold")], ["i", sa("italic")], ["strike", sa("strike")], ["style", RE]], CE = [nE, ld].reduce((s, t) => (s[t.keyName] = t, s), {}), su = [od, El, _l, ud, fd, gd].reduce((s, t) => (s[t.keyName] = t, s), {});
class md extends le {
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
    if (i[vt.blotName])
      return new $().insert(n || "", {
        [vt.blotName]: i[vt.blotName]
      });
    if (!e)
      return new $().insert(n || "", i);
    const r = this.convertHTML(e);
    return Oi(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new $().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    AE(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const n = e.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Nl(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : C.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, e), this.quill.setSelection(0, C.sources.SILENT);
    } else {
      const i = this.convert({
        html: e,
        text: ""
      });
      this.quill.updateContents(new $().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), C.sources.SILENT);
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
    (o = t.clipboardData) == null || o.setData("text/plain", r), (c = t.clipboardData) == null || c.setData("text/html", i), e && Al({
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
    this.quill.updateContents(c, C.sources.USER), this.quill.setSelection(c.length() - t.length, C.sources.SILENT), this.quill.scrollSelectionIntoView();
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
M(md, "DEFAULTS", {
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
function Oi(s, t) {
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
const ir = /* @__PURE__ */ new WeakMap();
function bd(s) {
  return s == null ? !1 : (ir.has(s) || (s.tagName === "PRE" ? ir.set(s, !0) : ir.set(s, bd(s.parentNode))), ir.get(s));
}
function Nl(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new $()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let c = Nl(s, o, e, n, i);
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
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = CE[c], a != null && (a.attrName === c || a.keyName === c) && (o[a.attrName] = a.value(s) || void 0), a = su[c], a != null && (a.attrName === c || a.keyName === c) && (a = su[c], o[a.attrName] = a.value(s) || void 0));
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
  } else if (n.prototype instanceof fi && !Oi(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Vs(t, n.blotName, n.formats(s, e), e);
  return t;
}
function kE(s, t) {
  return Oi(t, `
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
  n.blotName !== "list" || !Oi(t, `
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
function nu(s, t, e) {
  if (!Oi(t, `
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
  if (!bd(s)) {
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
class yd extends le {
  constructor(e, n) {
    super(e, n);
    M(this, "lastRecorded", 0);
    M(this, "ignoreChange", !1);
    M(this, "stack", {
      undo: [],
      redo: []
    });
    M(this, "currentRange", null);
    this.quill.on(C.events.EDITOR_CHANGE, (i, r, o, c) => {
      i === C.events.SELECTION_CHANGE ? r && c !== C.sources.SILENT && (this.currentRange = r) : i === C.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || c === C.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = xa(this.currentRange, r));
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
      range: xa(i.range, o)
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
    iu(this.stack.undo, e), iu(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, C.sources.USER);
    else {
      const n = jE(this.quill.scroll, e.delta);
      this.quill.setSelection(n, C.sources.USER);
    }
  }
}
M(yd, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function iu(s, t) {
  let e = t;
  for (let n = s.length - 1; n >= 0; n -= 1) {
    const i = s[n];
    s[n] = {
      delta: e.transform(i.delta, !0),
      range: i.range && xa(i.range, e)
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
function xa(s, t) {
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
    }), /Android/i.test(navigator.userAgent) || t.on(C.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Al({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (e) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new $().retain(t.index).insert(e, n), C.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + e.length, 0, C.sources.SILENT), !0;
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
        return o && r.key !== "ArrowRight" || !o && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (r.shiftKey ? 1 : 0), C.sources.USER), !1);
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
C.register({
  "blots/block": ft,
  "blots/block/embed": Ft,
  "blots/break": ae,
  "blots/container": js,
  "blots/cursor": Nn,
  "blots/embed": yl,
  "blots/inline": we,
  "blots/scroll": hn,
  "blots/text": ie,
  "modules/clipboard": md,
  "modules/history": yd,
  "modules/keyboard": jr,
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
class La extends ft {
}
M(La, "blotName", "blockquote"), M(La, "tagName", "blockquote");
class ka extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
M(ka, "blotName", "header"), M(ka, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class Ci extends js {
}
Ci.blotName = "list-container";
Ci.tagName = "OL";
class Si extends ft {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    C.register(Ci);
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
Si.blotName = "list";
Si.tagName = "LI";
Ci.allowedChildren = [Si];
Si.requiredContainer = Ci;
class mi extends we {
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
M(mi, "blotName", "bold"), M(mi, "tagName", ["STRONG", "B"]);
class Ia extends mi {
}
M(Ia, "blotName", "italic"), M(Ia, "tagName", ["EM", "I"]);
class Je extends we {
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
M(Je, "blotName", "link"), M(Je, "tagName", "A"), M(Je, "SANITIZED_URL", "about:blank"), M(Je, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function _d(s, t) {
  const e = document.createElement("a");
  e.href = s;
  const n = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class Ra extends we {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
M(Ra, "blotName", "script"), M(Ra, "tagName", ["SUB", "SUP"]);
class Da extends mi {
}
M(Da, "blotName", "strike"), M(Da, "tagName", ["S", "STRIKE"]);
class Ma extends we {
}
M(Ma, "blotName", "underline"), M(Ma, "tagName", "U");
class cr extends yl {
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
M(cr, "blotName", "formula"), M(cr, "className", "ql-formula"), M(cr, "tagName", "SPAN");
const ru = ["alt", "height", "width"];
class qa extends Dt {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return ru.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
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
    ru.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
M(qa, "blotName", "image"), M(qa, "tagName", "IMG");
const ou = ["height", "width"];
class ur extends Ft {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return ou.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static sanitize(t) {
    return Je.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    ou.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
M(ur, "blotName", "video"), M(ur, "className", "ql-video"), M(ur, "tagName", "IFRAME");
const ei = new oe("code-token", "hljs", {
  scope: B.INLINE
});
class Be extends we {
  static formats(t, e) {
    for (; t != null && t !== e.domNode; ) {
      if (t.classList && t.classList.contains(vt.className))
        return super.formats(t, e);
      t = t.parentNode;
    }
  }
  constructor(t, e, n) {
    super(t, e, n), ei.add(this.domNode, n);
  }
  format(t, e) {
    t !== Be.blotName ? super.format(t, e) : e ? ei.add(this.domNode, e) : (ei.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ei.value(this.domNode) || this.unwrap();
  }
}
Be.blotName = "code-token";
Be.className = "ql-token";
class Vt extends vt {
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
class ri extends Us {
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
        const o = this.children.reduce((a, l) => a.concat(sd(l, !1)), new $()), c = t(i, r);
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
${Pr(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = Vt.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
ri.allowedChildren = [Vt];
Vt.requiredContainer = ri;
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
class Ed extends le {
  static register() {
    C.register(Be, !0), C.register(Vt, !0), C.register(ri, !0);
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
    this.quill.on(C.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof ri)) return;
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
    this.quill.on(C.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(C.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(ri) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, e);
    }), this.quill.update(C.sources.SILENT), n != null && this.quill.setSelection(n, C.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return Pr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [vt.blotName]: e
      }), i.insert(r)), new $());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(vt.className), n.innerHTML = XE(this.options.hljs, e, t), Nl(this.quill.scroll, n, [(i, r) => {
      const o = ei.value(i);
      return o ? r.compose(new $().retain(r.length(), {
        [Be.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, c, a) => (a !== 0 && o.insert(`
`, {
      [vt.blotName]: e
    }), o.insert(c)), r)], /* @__PURE__ */ new WeakMap());
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
const ai = class ai extends ft {
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", Ol()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === ai.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
M(ai, "blotName", "table"), M(ai, "tagName", "TD");
let se = ai;
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
class ve extends js {
}
M(ve, "blotName", "table-body"), M(ve, "tagName", "TBODY");
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
    const [e] = this.descendant(ve);
    e == null || e.children.head == null || e.children.forEach((n) => {
      const i = n.children.at(t);
      i != null && i.remove();
    });
  }
  insertColumn(t) {
    const [e] = this.descendant(ve);
    e == null || e.children.head == null || e.children.forEach((n) => {
      const i = n.children.at(t), r = se.formats(n.children.head.domNode), o = this.scroll.create(se.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [e] = this.descendant(ve);
    if (e == null || e.children.head == null) return;
    const n = Ol(), i = this.scroll.create(Pe.blotName);
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
Cn.allowedChildren = [ve];
ve.requiredContainer = Cn;
ve.allowedChildren = [Pe];
Pe.requiredContainer = ve;
Pe.allowedChildren = [se];
se.requiredContainer = Pe;
function Ol() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class ZE extends le {
  static register() {
    C.register(se), C.register(Pe), C.register(ve), C.register(Cn);
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
    e != null && (t.deleteColumn(e.cellOffset()), this.quill.update(C.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(C.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const e = t.offset();
    t.remove(), this.quill.update(C.sources.USER), this.quill.setSelection(e, C.sources.SILENT);
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
    n.insertColumn(o + t), this.quill.update(C.sources.USER);
    let c = i.rowOffset();
    t === 0 && (c += 1), this.quill.setSelection(e.index + c, e.length, C.sources.SILENT);
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
    n.insertRow(o + t), this.quill.update(C.sources.USER), t > 0 ? this.quill.setSelection(e, C.sources.SILENT) : this.quill.setSelection(e.index + i.children.length, e.length, C.sources.SILENT);
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
        table: Ol()
      });
    }, new $().retain(n.index));
    this.quill.updateContents(i, C.sources.USER), this.quill.setSelection(n.index, C.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(C.events.SCROLL_OPTIMIZE, (t) => {
      t.some((e) => ["TD", "TR", "TBODY", "TABLE"].includes(e.target.tagName) ? (this.quill.once(C.events.TEXT_CHANGE, (n, i, r) => {
        r === C.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const au = Ve("quill:toolbar");
class Cl extends le {
  constructor(t, e) {
    var n, i;
    if (super(t, e), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), QE(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      au.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      var c;
      const o = (c = this.options.handlers) == null ? void 0 : c[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(C.events.EDITOR_CHANGE, () => {
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
      au.warn("ignoring attaching to nonexistent format", e, t);
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
        }), C.sources.USER);
      } else
        this.quill.format(e, r, C.sources.USER);
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
Cl.DEFAULTS = {};
function lu(s, t, e) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), e != null ? (n.value = e, n.setAttribute("aria-label", `${t}: ${e}`)) : n.setAttribute("aria-label", t), s.appendChild(n);
}
function QE(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        lu(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? JE(n, r, o) : lu(n, r, o);
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
Cl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const s = this.quill.getSelection();
      if (s != null)
        if (s.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((e) => {
            this.quill.scroll.query(e, B.INLINE) != null && this.quill.format(e, !1, C.sources.USER);
          });
        } else
          this.quill.removeFormat(s.index, s.length, C.sources.USER);
    },
    direction(s) {
      const {
        align: t
      } = this.quill.getFormat();
      s === "rtl" && t == null ? this.quill.format("align", "right", C.sources.USER) : !s && t === "right" && this.quill.format("align", !1, C.sources.USER), this.quill.format("direction", s, C.sources.USER);
    },
    indent(s) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t), n = parseInt(e.indent || 0, 10);
      if (s === "+1" || s === "-1") {
        let i = s === "+1" ? 1 : -1;
        e.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, C.sources.USER);
      }
    },
    link(s) {
      s === !0 && (s = prompt("Enter link URL:")), this.quill.format("link", s, C.sources.USER);
    },
    list(s) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t);
      s === "check" ? e.list === "checked" || e.list === "unchecked" ? this.quill.format("list", !1, C.sources.USER) : this.quill.format("list", "unchecked", C.sources.USER) : this.quill.format("list", s, C.sources.USER);
    }
  }
};
const tw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', sw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', iw = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', rw = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', ow = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', aw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', cu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', cw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', uw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', hw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', dw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', fw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', pw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', gw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', mw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', bw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', yw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', vw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', _w = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', ww = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Tw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Aw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Ow = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Cw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Sw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', xw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Lw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', kw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', bi = {
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
  code: cu,
  "code-block": cu,
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
  image: vw,
  indent: {
    "+1": _w,
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
let uu = 0;
function hu(s, t) {
  s.setAttribute(t, `${s.getAttribute(t) !== "true"}`);
}
class Ur {
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
    this.container.classList.toggle("ql-expanded"), hu(this.label, "aria-expanded"), hu(this.options, "aria-hidden");
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
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${uu}`, uu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
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
class wd extends Ur {
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
class Td extends Ur {
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
class Ad {
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
class xi extends On {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ti(i, Dw), typeof e.align == "object"))
        return new Td(i, e.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ti(i, Mw, r === "background" ? "#ffffff" : "#000000"), new wd(i, e[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ti(i, qw) : i.classList.contains("ql-header") ? ti(i, $w) : i.classList.contains("ql-size") && ti(i, Bw)), new Ur(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(q.events.EDITOR_CHANGE, n);
  }
}
xi.DEFAULTS = ts({}, On.DEFAULTS, {
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
class Nd extends Ad {
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
function ti(s, t) {
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
class Od extends Nd {
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
M(Od, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Cd extends xi {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = jw), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Od(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), bi), this.buildPickers(t.container.querySelectorAll("select"), bi));
  }
}
Cd.DEFAULTS = ts({}, xi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(s) {
          s ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, C.sources.USER);
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
class Sd extends Nd {
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
M(Sd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class xd extends xi {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Uw), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), bi), this.buildPickers(t.container.querySelectorAll("select"), bi), this.tooltip = new Sd(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
xd.DEFAULTS = ts({}, xi.DEFAULTS, {
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
            this.quill.format("link", !1, C.sources.USER);
        }
      }
    }
  }
});
C.register({
  "attributors/attribute/direction": ld,
  "attributors/class/align": rd,
  "attributors/class/background": rE,
  "attributors/class/color": iE,
  "attributors/class/direction": cd,
  "attributors/class/font": dd,
  "attributors/class/size": pd,
  "attributors/style/align": od,
  "attributors/style/background": El,
  "attributors/style/color": _l,
  "attributors/style/direction": ud,
  "attributors/style/font": fd,
  "attributors/style/size": gd
}, !0);
C.register({
  "formats/align": rd,
  "formats/direction": cd,
  "formats/indent": YE,
  "formats/background": El,
  "formats/color": _l,
  "formats/font": dd,
  "formats/size": pd,
  "formats/blockquote": La,
  "formats/code-block": vt,
  "formats/header": ka,
  "formats/list": Si,
  "formats/bold": mi,
  "formats/code": wl,
  "formats/italic": Ia,
  "formats/link": Je,
  "formats/script": Ra,
  "formats/strike": Da,
  "formats/underline": Ma,
  "formats/formula": cr,
  "formats/image": qa,
  "formats/video": ur,
  "modules/syntax": Ed,
  "modules/table": ZE,
  "modules/toolbar": Cl,
  "themes/bubble": Cd,
  "themes/snow": xd,
  "ui/icons": bi,
  "ui/picker": Ur,
  "ui/icon-picker": Td,
  "ui/color-picker": wd,
  "ui/tooltip": Ad
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
      }, s.title = s.name.split(".").slice(0, -1).join("."), s.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32), s.timestamp = Math.round(Date.now() / 1e3), s.original = {
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
          slug: Fo(t.title) + "-" + t.uid,
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
          let g = Math.max(h / o, p / c), m = o * g, _ = c * g, E = (m - h) / 2, w = (_ - p) / 2;
          n.width = h, n.height = p, i.drawImage(t, -E, -w, m, _);
        } else if (l.crop === "contain") {
          let g = Math.min(h / o, p / c), m = o * g, _ = c * g, E = (h - m) / 2, w = (p - _) / 2;
          n.width = h, n.height = p, i.clearRect(0, 0, h, p), i.drawImage(t, E, w, m, _);
        } else
          o > h && (c = Math.round(c * (h / o)), o = h), c > p && (o = Math.round(o * (p / c)), c = p), n.width = o, n.height = c, i.drawImage(t, 0, 0, o, c);
        s.types[l.key] = {
          width: n.width,
          height: n.height,
          extension: l.extension ? l.extension : this.getExtensionByMimeType(s.type),
          quality: l.quality ? l.quality : 0.9,
          crop: l.crop ? l.crop : null
        }, s.types[l.key].slug = Fo(s.title) + "-" + n.width + "x" + n.height + "-" + s.uid, s.types[l.key].mime = this.getMimeTypeByExtension(s.types[l.key].extension), s.types[l.key].data = n.toDataURL(
          s.types[l.key].mime,
          s.types[l.key].quality
        ), s.types[l.key].blob = await this.getBlob(n, s.types[l.key].mime, s.types[l.key].quality), s.types[l.key].blob && (console.log(s.types[l.key].blob), s.types[l.key].bytes = s.types[l.key].blob.size), s.types[l.key].bytes && (s.bytes += s.types[l.key].bytes), console.log(s.types[l.key]), e && e(l, s);
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
      let t = this.files[s];
      for (let e in t.types) {
        let n = t.types[e], i = this.params.presets[e];
        n.slug = Fo(t.title) + "-" + i.width + "x" + i.height;
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
}, bT = ["onUpdate:modelValue"], yT = {
  key: 3,
  class: "mx-1"
}, vT = ["href"], _T = ["src", "alt"], ET = ["src", "alt"], wT = { class: "dropdown" }, TT = { class: "dropdown-menu" }, AT = ["onClick"], NT = { key: 0 }, OT = ["onClick"], CT = { key: 1 }, ST = { class: "dropdown-item py-0 d-flex justify-content-between" }, xT = { key: 2 }, LT = { class: "dropdown-item py-0 d-flex justify-content-between" }, kT = ["innerHTML"], IT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, RT = { key: 0 }, DT = { key: 1 }, MT = { class: "dropdown-item py-0 d-flex justify-content-between" }, qT = { class: "text-muted fw-light me-4" }, $T = { class: "text-primary" }, BT = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, PT = { class: "dropdown-item py-0 d-flex justify-content-between" }, jT = { class: "text-muted fw-light me-1" }, UT = {
  key: 0,
  class: "text-primary"
}, VT = ["innerHTML"], FT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, HT = { class: "dropdown-item py-0 d-flex justify-content-between" }, WT = { class: "dropdown-item py-0 d-flex justify-content-between" }, zT = ["innerHTML"], KT = { class: "vsa-image-container h-100 position-relative border p-1 rounded" }, GT = {
  key: 0,
  class: "w-100 h-100"
}, YT = {
  key: 1,
  class: "vsa-image-frame w-100 text-center"
}, XT = ["src", "alt"], ZT = {
  key: 2,
  class: "fs-5 ms-2"
}, QT = ["onUpdate:modelValue"], JT = { class: "dropdown" }, tA = { class: "dropdown-menu" }, eA = ["onClick"], sA = { key: 0 }, nA = ["onClick"], iA = { key: 1 }, rA = { class: "dropdown-item py-0 d-flex justify-content-between" }, oA = { key: 2 }, aA = { class: "dropdown-item py-0 d-flex justify-content-between" }, lA = { key: 3 }, cA = { class: "dropdown-item py-0 d-flex justify-content-between" }, uA = ["innerHTML"], hA = { key: 0 }, dA = { key: 1 }, fA = { class: "dropdown-item py-0 d-flex justify-content-between" }, pA = { class: "text-muted fw-light me-3" }, gA = { class: "text-primary" }, mA = { class: "dropdown-item py-0 d-flex justify-content-between" }, bA = { class: "text-muted fw-light me-3" }, yA = {
  key: 0,
  class: "text-primary"
}, vA = { class: "dropdown-item py-0 d-flex justify-content-between" }, _A = { class: "text-muted fw-light me-3" }, EA = {
  key: 0,
  class: "text-primary"
}, wA = { class: "dropdown-item py-0 d-flex justify-content-between" }, TA = { class: "text-muted fw-light me-3" }, AA = {
  key: 0,
  class: "text-primary"
}, NA = ["innerHTML"], OA = { class: "dropdown-item py-0 d-flex justify-content-between" }, CA = { class: "dropdown-item py-0 d-flex justify-content-between" }, SA = ["innerHTML"], xA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, LA = { class: "row g-1" }, kA = { class: "col-12 d-flex align-items-center justify-content-center" }, IA = ["for"], RA = { key: 0 }, DA = { key: 0 }, MA = { class: "" }, qA = { class: "" }, $A = {
  key: 1,
  class: "fs-6"
}, BA = {
  key: 0,
  class: "bi bi-list-ol"
}, PA = {
  key: 1,
  class: "bi bi-grid"
}, jA = ["disabled"], UA = { class: "col-12 text-center" }, VA = { key: 0 }, FA = ["id", "accept"];
function HA(s, t, e, n, i, r) {
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
            f("span", Jw, S(o.extension), 1),
            f("span", tT, S(o.width) + " x " + S(o.height), 1),
            f("span", eT, "~" + S(s.roundFileSize(o.bytes)), 1),
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
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o),
          onChange: t[1] || (t[1] = (o) => s.slug(s.index))
        }, null, 544), [
          [jt, s.editfile.title]
        ]),
        f("div", nT, [
          f("div", iT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          f("div", rT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[3] || (t[3] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          f("div", oT, [
            s.type && !s.type.url ? (b(), y("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[4] || (t[4] = (o) => s.download(s.index, s.params))
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
                  f("small", null, S(c + 1), 1)
                ]),
                f("td", dT, [
                  f("div", fT, [
                    o.isDocument ? (b(), y("span", pT, [
                      f("i", {
                        class: R(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (b(), y("span", gT, t[8] || (t[8] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (b(), y("span", mT, t[9] || (t[9] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : A("", !0),
                    G(f("input", {
                      type: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (a) => o.title = a
                    }, null, 8, bT), [
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
                        }, null, 8, _T)
                      ], 8, vT)) : (b(), y("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "",
                        src: o.types[s.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, ET))
                    ])) : A("", !0),
                    f("div", wT, [
                      t[23] || (t[23] = f("button", {
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
                          }, t[10] || (t[10] = [
                            f("i", { class: "bi bi-x-circle" }, null, -1),
                            U(" Remove ")
                          ]), 8, AT)
                        ]),
                        o.uploaded ? (b(), y("li", NT, [
                          f("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => s.download(c, s.params),
                            type: "button"
                          }, t[11] || (t[11] = [
                            f("i", { class: "bi bi-download" }, null, -1),
                            U(" Download ")
                          ]), 8, OT)
                        ])) : A("", !0),
                        t[21] || (t[21] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.original.width ? (b(), y("li", CT, [
                          f("small", ST, [
                            t[12] || (t[12] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            U(" " + S(o.original.width) + " x " + S(o.original.height), 1)
                          ])
                        ])) : A("", !0),
                        o.isDocument ? A("", !0) : (b(), y("li", xT, [
                          f("small", LT, [
                            t[13] || (t[13] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            f("span", null, [
                              f("span", {
                                innerHTML: s.roundFileSize(o.original.bytes, !0)
                              }, null, 8, kT),
                              f("small", IT, S(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        (b(!0), y(W, null, K(o.types, (a, l) => (b(), y(W, { key: a }, [
                          o.isDocument ? A("", !0) : (b(), y("li", RT, t[14] || (t[14] = [
                            f("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (b(), y("li", DT, [
                            f("small", MT, [
                              f("span", qT, [
                                f("span", $T, S(l), 1),
                                t[15] || (t[15] = U(" resolution & crop"))
                              ]),
                              f("span", null, [
                                U(S(a.width) + " x " + S(a.height) + " ", 1),
                                a.crop ? (b(), y("small", BT, S(a.crop), 1)) : A("", !0)
                              ])
                            ])
                          ])) : A("", !0),
                          f("li", null, [
                            f("small", PT, [
                              f("span", jT, [
                                o.isDocument ? A("", !0) : (b(), y("span", UT, S(l), 1)),
                                t[16] || (t[16] = U(" size & extension"))
                              ]),
                              f("span", null, [
                                f("span", {
                                  class: R({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: s.roundFileSize(a.bytes, !0)
                                }, null, 10, VT),
                                f("small", FT, S(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[22] || (t[22] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("small", HT, [
                            t[17] || (t[17] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[18] || (t[18] = U()),
                            f("span", null, S(s.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ]),
                        f("li", null, [
                          f("small", WT, [
                            t[19] || (t[19] = f("span", { class: "text-muted fw-light me-3" }, "uploaded bytes", -1)),
                            t[20] || (t[20] = U()),
                            f("span", {
                              innerHTML: s.roundFileSize(o.bytes, !0)
                            }, null, 8, zT)
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
          f("div", KT, [
            o.loaded ? (b(), y("div", GT, [
              A("", !0),
              o.types && o.types[s.params.thumbnail] ? (b(), y("div", YT, [
                f("img", {
                  class: "img-fluid",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, XT)
              ])) : A("", !0),
              o.isDocument ? (b(), y("span", ZT, [
                f("i", {
                  class: R(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : A("", !0),
              G(f("input", {
                type: "text",
                class: "form-control py-0 px-2 fw-light",
                "onUpdate:modelValue": (a) => o.title = a
              }, null, 8, QT), [
                [jt, o.title]
              ]),
              f("div", JT, [
                t[48] || (t[48] = f("button", {
                  class: "btn btn-sm bg-light text-dark dropdown-toggle w-100",
                  type: "button",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, null, -1)),
                f("ul", tA, [
                  f("li", null, [
                    f("button", {
                      class: "dropdown-item text-danger py-1",
                      onClick: (a) => s.remove(c),
                      type: "button"
                    }, t[27] || (t[27] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1),
                      U(" Remove ")
                    ]), 8, eA)
                  ]),
                  o.uploaded ? (b(), y("li", sA, [
                    f("button", {
                      class: "dropdown-item text-primary py-1",
                      onClick: (a) => s.download(c, s.params),
                      type: "button"
                    }, t[28] || (t[28] = [
                      f("i", { class: "bi bi-download" }, null, -1),
                      U(" Download ")
                    ]), 8, nA)
                  ])) : A("", !0),
                  t[46] || (t[46] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.original.width ? (b(), y("li", iA, [
                    f("small", rA, [
                      t[29] || (t[29] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                      U(" " + S(o.original.width) + " x " + S(o.original.height), 1)
                    ])
                  ])) : A("", !0),
                  o.isDocument ? A("", !0) : (b(), y("li", oA, [
                    f("small", aA, [
                      t[30] || (t[30] = f("span", { class: "text-muted fw-light me-3" }, "original extension", -1)),
                      t[31] || (t[31] = U()),
                      f("span", null, S(o.original.extension), 1)
                    ])
                  ])),
                  o.isDocument ? A("", !0) : (b(), y("li", lA, [
                    f("small", cA, [
                      t[32] || (t[32] = f("span", { class: "text-muted fw-light me-3" }, "original size", -1)),
                      t[33] || (t[33] = U()),
                      f("span", {
                        innerHTML: s.roundFileSize(o.original.bytes, !0)
                      }, null, 8, uA)
                    ])
                  ])),
                  (b(!0), y(W, null, K(o.types, (a, l) => (b(), y(W, { key: a }, [
                    o.isDocument ? A("", !0) : (b(), y("li", hA, t[34] || (t[34] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))),
                    o.original.width ? (b(), y("li", dA, [
                      f("small", fA, [
                        f("span", pA, [
                          f("span", gA, S(l), 1),
                          t[35] || (t[35] = U(" resolution"))
                        ]),
                        U(" " + S(a.width) + " x " + S(a.height), 1)
                      ])
                    ])) : A("", !0),
                    f("li", null, [
                      f("small", mA, [
                        f("span", bA, [
                          o.isDocument ? A("", !0) : (b(), y("span", yA, S(l), 1)),
                          t[36] || (t[36] = U(" extension"))
                        ]),
                        t[37] || (t[37] = U()),
                        f("span", null, S(a.extension), 1)
                      ])
                    ]),
                    f("li", null, [
                      f("small", vA, [
                        f("span", _A, [
                          o.isDocument ? A("", !0) : (b(), y("span", EA, S(l), 1)),
                          t[38] || (t[38] = U(" crop"))
                        ]),
                        t[39] || (t[39] = U()),
                        f("span", null, S(a.crop), 1)
                      ])
                    ]),
                    f("li", null, [
                      f("small", wA, [
                        f("span", TA, [
                          o.isDocument ? A("", !0) : (b(), y("span", AA, S(l), 1)),
                          t[40] || (t[40] = U(" size"))
                        ]),
                        t[41] || (t[41] = U()),
                        f("span", {
                          class: R({ "text-danger": a.bytes > o.original.bytes }),
                          innerHTML: s.roundFileSize(a.bytes, !0)
                        }, null, 10, NA)
                      ])
                    ])
                  ], 64))), 128)),
                  t[47] || (t[47] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  f("li", null, [
                    f("small", OA, [
                      t[42] || (t[42] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                      t[43] || (t[43] = U()),
                      f("span", null, S(s.dateFormat(o.timestamp * 1e3)), 1)
                    ])
                  ]),
                  f("li", null, [
                    f("small", CA, [
                      t[44] || (t[44] = f("span", { class: "text-muted fw-light me-3" }, "uploaded bytes", -1)),
                      t[45] || (t[45] = U()),
                      f("span", {
                        innerHTML: s.roundFileSize(o.bytes, !0)
                      }, null, 8, SA)
                    ])
                  ])
                ])
              ])
            ])) : (b(), y("div", xA, t[49] || (t[49] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : A("", !0),
      f("div", LA, [
        f("div", kA, [
          f("label", {
            for: s.uploadId,
            class: R([{ "disabled bg-secondary": s.files && s.params.limit <= s.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            s.files && s.params.limit > s.files.length ? (b(), y("span", RA, [
              t[53] || (t[53] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              U(" " + S(s.params.text) + " ", 1),
              s.params.limit ? (b(), y("small", DA, [
                t[50] || (t[50] = U(" ( ")),
                f("strong", MA, S(s.files.length), 1),
                t[51] || (t[51] = U(" / ")),
                f("span", qA, S(s.params.limit), 1),
                t[52] || (t[52] = U(" ) "))
              ])) : A("", !0)
            ])) : (b(), y("span", $A, t[54] || (t[54] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              U(" You've reached the upload limit ")
            ])))
          ], 10, IA),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[5] || (t[5] = (o) => s.toggleView())
          }, [
            s.params.ui != "list" ? (b(), y("i", BA)) : A("", !0),
            s.params.ui == "list" ? (b(), y("i", PA)) : A("", !0)
          ]),
          f("button", {
            disabled: !s.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[6] || (t[6] = (o) => s.resetConfirm())
          }, t[55] || (t[55] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, jA)
        ]),
        f("div", UA, [
          f("small", null, [
            s.params.accept ? (b(), y("div", VA, [
              t[56] || (t[56] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (b(!0), y(W, null, K(s.params.accept, (o) => (b(), y("strong", {
                class: "ms-1 text-muted",
                key: o
              }, S(o), 1))), 128))
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
        onChange: t[7] || (t[7] = (...o) => s.handleFileChange && s.handleFileChange(...o))
      }, null, 40, FA)) : A("", !0)
    ], 2)
  ]);
}
const WA = /* @__PURE__ */ In(Yw, [["render", HA], ["__scopeId", "data-v-630adef9"]]), zA = {
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
      return gh(s, t, this.settings, this);
    },
    translate(s, t, e) {
      return el(s, this.settings.translate, t, e || this.settings.language);
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
    ImageUpload: WA
  }
}, KA = zA, GA = { class: "row m-1" }, YA = { class: "form-row-title mb-4 fw-lighter" }, XA = {
  key: 0,
  class: "row"
}, ZA = { class: "form-group pb-3" }, QA = { key: 0 }, JA = {
  key: 0,
  class: "badge text-secondary fw-light"
}, tN = ["for", "innerHTML"], eN = { class: "input-group" }, sN = ["innerHTML"], nN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], iN = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], rN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], oN = {
  key: 4,
  class: "form-check"
}, aN = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "readonly", "required"], lN = ["for"], cN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], uN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], hN = ["value"], dN = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], fN = ["innerHTML"], pN = { key: 3 }, gN = ["type", "required", "placeholder", "onUpdate:modelValue"], mN = { class: "col-2 text-nowrap text-end" }, bN = ["onClick"], yN = ["onClick"], vN = ["onClick"], _N = { key: 0 }, EN = { class: "row g-1 d-flex align-items-center justify-content-between" }, wN = ["type", "placeholder", "onUpdate:modelValue"], TN = { class: "col-2" }, AN = ["onClick"], NN = { key: 4 }, ON = { key: 0 }, CN = ["for"], SN = ["name", "id", "onUpdate:modelValue"], xN = ["onClick"], LN = {
  key: 5,
  class: "p-1"
}, kN = ["innerHTML"];
function IN(s, t, e, n, i, r) {
  const o = li("HtmlEditor"), c = li("ImageUpload");
  return b(), y("div", GA, [
    (b(!0), y(W, null, K(s.settings.form.groups, (a) => (b(), y("div", {
      key: a,
      class: R([a.class ? a.class : "col-md-12"])
    }, [
      f("h2", YA, S(a.title), 1),
      s.item && a.fields ? (b(), y("div", XA, [
        (b(!0), y(W, null, K(a.fields, (l) => (b(), y("div", {
          class: R([s.getValueOrFunction(l.class ? l.class : "col-md-12"), "input_type_" + l.type]),
          key: l
        }, [
          f("div", ZA, [
            l.label !== null ? (b(), y("span", QA, [
              ["html", "image", "upload"].indexOf(l.type) >= 0 ? (b(), y("label", {
                key: 0,
                class: R([{ required: l.required }, "form-label text-secondary mb-1"])
              }, [
                U(S(l.label ? l.label : s.translate(l.name)) + " ", 1),
                l.maxlength ? (b(), y("span", JA, S(s.item[l.name] ? s.item[l.name].length : 0) + " / " + S(l.maxlength), 1)) : A("", !0)
              ], 2)) : (b(), y("label", {
                key: 1,
                class: R([{ required: l.required }, "form-label text-secondary mb-1"]),
                for: s.formid + "_" + l.name,
                innerHTML: s.getValueOrFunction(l.label ? l.label : s.translate(l.name), { field: l, item: s.item })
              }, null, 10, tN))
            ])) : A("", !0),
            f("div", eN, [
              l.prefix ? (b(), y("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: l.prefix
              }, null, 8, sN)) : A("", !0),
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
              }, null, 10, nN)), [
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
              }, null, 10, iN)), [
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
              }, null, 10, rN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "checkbox" ? (b(), y("div", oN, [
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
                }, null, 10, aN), [
                  [Id, s.item[l.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: s.formid + "_" + l.name
                }, S(l.checkbox), 9, lN)
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
              }, null, 10, cN)), [
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
                }, S(h.label ? h.label : h.value), 11, hN))), 128))
              ], 10, uN)), [
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
              }, "              ", 10, dN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.suffix ? (b(), y("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: l.suffix
              }, null, 8, fN)) : A("", !0)
            ]),
            l.type == "html" ? (b(), na(o, {
              key: 1,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: R([l.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : A("", !0),
            l.type == "image" || l.type == "upload" ? (b(), na(c, {
              key: 2,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: R([l.class]),
              params: l.params,
              settings: s.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "params", "settings"])) : A("", !0),
            l.type == "list" ? (b(), y("div", pN, [
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
                    "onUpdate:modelValue": (_) => s.item[l.name][p][m] = _
                  }, null, 8, gN), [
                    [dn, s.item[l.name][p][m]]
                  ])
                ], 2))), 128)),
                f("div", mN, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (g) => s.arrayItemMoveUp(s.item[l.name], p)
                  }, t[0] || (t[0] = [
                    f("i", { class: "bi bi-arrow-up" }, null, -1)
                  ]), 8, bN),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (g) => s.arrayItemMoveDown(s.item[l.name], p + 1)
                  }, t[1] || (t[1] = [
                    f("i", { class: "bi bi-arrow-down" }, null, -1)
                  ]), 8, yN),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-danger p-1 me-1",
                    onClick: (g) => s.arrayRemoveItem(s.item[l.name], p)
                  }, t[2] || (t[2] = [
                    f("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, vN)
                ])
              ]))), 128)),
              s.item[l.name] && s.item[l.name].length ? (b(), y("hr", _N)) : A("", !0),
              f("div", EN, [
                (b(!0), y(W, null, K(l.elements, (h) => (b(), y("div", {
                  key: h,
                  class: R(h.class || "col")
                }, [
                  G(f("input", {
                    type: h.type,
                    placeholder: h.placeholder || h.name,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (p) => h.value = p
                  }, null, 8, wN), [
                    [dn, h.value]
                  ])
                ], 2))), 128)),
                f("div", TN, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-primary my-1 w-100",
                    onClick: (h) => s.arrayAddNewItem(l, s.item)
                  }, t[3] || (t[3] = [
                    f("i", { class: "bi bi-plus" }, null, -1)
                  ]), 8, AN)
                ])
              ])
            ])) : A("", !0),
            l.type == "addresses" ? (b(), y("span", NN, [
              s.item[l.name] ? (b(), y("div", ON, [
                (b(!0), y(W, null, K(s.item[l.name], (h) => (b(), y("div", { key: h }, [
                  U(S(h) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: s.formid + "_" + l.name
                  }, S(l.label), 9, CN),
                  G(f("input", {
                    class: "form-control",
                    type: "text",
                    name: l.name,
                    id: s.formid + "_" + l.name,
                    "onUpdate:modelValue": (p) => h.country = p
                  }, null, 8, SN), [
                    [jt, h.country]
                  ])
                ]))), 128))
              ])) : A("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (h) => s.insertAddress(l.name)
              }, " Add ", 8, xN)
            ])) : A("", !0),
            l.description ? (b(), y("div", LN, [
              f("i", {
                class: "text-muted",
                innerHTML: l.description
              }, null, 8, kN)
            ])) : A("", !0)
          ])
        ], 2))), 128))
      ])) : A("", !0)
    ], 2))), 128))
  ]);
}
const RN = /* @__PURE__ */ In(KA, [["render", IN], ["__scopeId", "data-v-064c6d67"]]), DN = {
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
      return el(s, this.settings.translate, t, e || this.settings.language);
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
}, MN = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, qN = { class: "dropdown d-inline-block m-1" }, $N = {
  type: "button",
  class: "btn btn-sm btn-secondary dropdown-toggle",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, BN = { class: "mx-1" }, PN = { key: 0 }, jN = { class: "dropdown-menu text-end" }, UN = ["onClick"], VN = { class: "ms-2" }, FN = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, HN = {
  key: 1,
  class: "bi bi-circle ms-2"
}, WN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, zN = { class: "pagination pagination-sm m-1" }, KN = { class: "page-item" }, GN = { "aria-hidden": "true" }, YN = { class: "page-item" }, XN = { "aria-hidden": "true" }, ZN = ["onClick"], QN = { class: "page-item" }, JN = { "aria-hidden": "true" }, tO = { "aria-hidden": "true" }, eO = {
  key: 0,
  class: "page-item"
}, sO = { "aria-hidden": "true" };
function nO(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? A("", !0) : (b(), y("nav", MN, [
    f("div", null, [
      f("div", qN, [
        f("button", $N, [
          G(f("span", BN, [
            f("strong", null, S(e.config.pagination.from) + "-" + S(e.config.pagination.to), 1),
            e.config.pagination.total ? (b(), y("span", PN, " / " + S(e.config.pagination.total), 1)) : A("", !0)
          ], 512), [
            [Ns, e.config.pagination.from > 0]
          ])
        ]),
        f("ul", jN, [
          f("li", null, [
            (b(!0), y(W, null, K(e.config.pagination.limits, (o) => (b(), y("span", {
              class: R(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (c) => r.setPageLimit(o)
            }, [
              f("strong", null, S(o), 1),
              f("small", VN, S(r.translate("row")) + "/" + S(r.translate("page")), 1),
              e.config.pagination.limit == o ? (b(), y("i", FN)) : A("", !0),
              e.config.pagination.limit != o ? (b(), y("i", HN)) : A("", !0)
            ], 10, UN))), 128))
          ])
        ])
      ]),
      G(f("div", WN, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ns, e.ui && e.ui.wait.table]
      ])
    ]),
    f("ul", zN, [
      f("li", KN, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", GN, S(r.translate("First")), 1)
        ], 2)
      ]),
      f("li", YN, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{  translate('Prev')  }}"
        }, [
          f("span", XN, S(r.translate("Prev")), 1)
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
        }, S(o), 11, ZN)
      ]))), 128)),
      f("li", QN, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", JN, [
            f("span", tO, S(r.translate("Next")), 1)
          ])
        ], 2)
      ]),
      e.config.pagination.total ? (b(), y("li", eO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", sO, S(r.translate("Last")), 1)
        ], 2)
      ])) : A("", !0)
    ])
  ]));
}
const iO = /* @__PURE__ */ In(DN, [["render", nO], ["__scopeId", "data-v-5ba01873"]]), rO = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminFormGroup: RN,
    VuAdminTablePagination: iO
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
      return gh(s, t, this.settings, this);
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
        this.settings.form.api.input.item ? i = typeof this.settings.form.api.input.item == "string" ? e.data[this.settings.form.api.input.item] : this.settings.form.api.input.item(e.data, t) : i = e.data, this.item = gr(i), this.itemOriginal = Object.assign({}, i), this.formNoWait();
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
        ), this.item = gr(e), this.itemOriginal = Object.assign({}, e)), s === !0 && this.modalWindow.hide(), this.reloadTable();
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
      return el(s, this.settings.translate, t, e || this.settings.language);
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
}, oO = { key: 0 }, aO = ["data-bs-theme"], lO = { class: "vua-table-title" }, cO = { class: "d-flex align-items-center justify-content-between" }, uO = { class: "d-inline-block" }, hO = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, dO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, fO = {
  key: 0,
  class: "d-inline-block"
}, pO = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, gO = ["innerHTML"], mO = { class: "dropdown d-inline-block" }, bO = ["innerHTML"], yO = { class: "dropdown-menu text-start" }, vO = { class: "me-2 text-muted" }, _O = ["innerHTML"], EO = ["onClick"], wO = {
  key: 1,
  class: "dropdown d-inline-block"
}, TO = { class: "mx-1" }, AO = { key: 0 }, NO = { class: "dropdown-menu" }, OO = ["onClick"], CO = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, SO = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, xO = { class: "badge text-secondary fw-normal" }, LO = {
  key: 2,
  class: "dropdown d-inline-block"
}, kO = { class: "mx-1" }, IO = { class: "dropdown-menu" }, RO = ["onClick"], DO = { class: "vua-table-header" }, MO = ["width"], qO = ["onClick"], $O = ["innerHTML"], BO = {
  key: 0,
  class: "bi bi-arrow-down"
}, PO = {
  key: 1,
  class: "bi bi-arrow-up"
}, jO = { key: 0 }, UO = ["disabled", "onClick"], VO = {
  key: 0,
  class: "vua-table-filter"
}, FO = ["width"], HO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, WO = { class: "bi bi-check-all" }, zO = { class: "bi bi-x-lg" }, KO = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, GO = ["onUpdate:modelValue"], YO = ["disabled", "onClick"], XO = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, ZO = ["onUpdate:modelValue", "disabled"], QO = { value: "=" }, JO = { value: ">" }, tC = { value: ">=" }, eC = { value: "<" }, sC = { value: "<=" }, nC = ["onUpdate:modelValue", "disabled"], iC = ["value"], rC = ["onUpdate:modelValue", "disabled", "min", "max"], oC = ["disabled", "onClick"], aC = { key: 3 }, lC = {
  key: 0,
  class: "dropdown"
}, cC = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, uC = { class: "dropdown-menu" }, hC = ["onClick"], dC = {
  key: 0,
  class: "bi bi-check-square"
}, fC = {
  key: 1,
  class: "bi bi-square"
}, pC = { key: 0 }, gC = { key: 1 }, mC = ["onClick"], bC = { key: 2 }, yC = ["onClick"], vC = { key: 3 }, _C = ["onClick"], EC = ["onUpdate:modelValue", "multiple"], wC = ["value"], TC = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, AC = ["onUpdate:modelValue"], NC = { value: "=" }, OC = { value: ">" }, CC = { value: ">=" }, SC = { value: "<" }, xC = { value: "<=" }, LC = ["onUpdate:modelValue"], kC = ["value"], IC = ["type", "onUpdate:modelValue"], RC = ["disabled", "onClick"], DC = ["disabled", "onClick"], MC = { class: "align-middle" }, qC = ["data-label", "width", "onClick"], $C = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, BC = ["innerHTML"], PC = { key: 1 }, jC = ["innerHTML"], UC = ["aria-valuenow", "aria-valuemax"], VC = { key: 0 }, FC = {
  key: 4,
  class: "input-group input-group-sm"
}, HC = ["innerHTML"], WC = ["type", "onChange", "onUpdate:modelValue"], zC = ["onChange", "onUpdate:modelValue"], KC = ["value"], GC = ["innerHTML"], YC = { key: 5 }, XC = ["disabled", "onClick"], ZC = ["innerHTML"], QC = { key: 2 }, JC = { key: 0 }, tS = ["colspan"], eS = { class: "row g-3 align-items-center" }, sS = { class: "col-form-label" }, nS = ["type", "onUpdate:modelValue", "onChange"], iS = ["onUpdate:modelValue", "onChange"], rS = ["onUpdate:modelValue", "onChange"], oS = ["value"], aS = ["innerHTML"], lS = {
  key: 0,
  class: "bg-light text-dark"
}, cS = {
  key: 0,
  class: "vua-table-bulk border-info"
}, uS = ["data-label", "width"], hS = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, dS = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, fS = ["type", "disabled", "onChange", "onUpdate:modelValue"], pS = ["disabled", "onChange", "onUpdate:modelValue"], gS = ["value"], mS = ["onClick"], bS = {
  key: 0,
  class: "bi bi-square text-secondary"
}, yS = {
  key: 1,
  class: "bi bi-check-square"
}, vS = { key: 2 }, _S = ["disabled", "onClick"], ES = ["innerHTML"], wS = { key: 2 }, TS = ["id"], AS = { class: "modal-dialog modal-xl" }, NS = { class: "modal-content h-100" }, OS = ["id", "data-bs-theme"], CS = { class: "modal-header" }, SS = { class: "modal-title" }, xS = ["innerHTML"], LS = { key: 1 }, kS = { key: 2 }, IS = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, RS = {
  key: 0,
  class: "d-inline-block ms-3 mt-1"
}, DS = ["innerHTML"], MS = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, qS = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, $S = ["disabled"], BS = ["disabled"], PS = {
  key: 0,
  class: "d-inline-block m-1"
}, jS = { class: "dropdown d-inline-block" }, US = ["innerHTML"], VS = { class: "dropdown-menu text-start" }, FS = { class: "me-2 text-muted" }, HS = ["innerHTML"], WS = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, zS = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, KS = {
  key: 1,
  class: "modal-body custom-scroll"
}, GS = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, YS = ["disabled"], XS = ["disabled"], ZS = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, QS = {
  type: "submit",
  class: "btn btn-primary m-1"
}, JS = {
  key: 1,
  class: "bg-light text-dark"
};
function t2(s, t, e, n, i, r) {
  const o = li("VuAdminTablePagination"), c = li("VuAdminFormGroup");
  return e.settings && e.settings.table ? (b(), y("div", oO, [
    f("div", {
      class: R(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      f("div", {
        class: R(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", lO, [
        f("div", cO, [
          f("div", uO, [
            e.settings.table.title ? (b(), y("h5", hO, S(e.settings.table.title), 1)) : A("", !0),
            G(f("div", dO, t[26] || (t[26] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ns, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (b(), y("div", fO, [
            i.message.table ? (b(), y("small", pO, [
              f("span", {
                class: R(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, gO)
              ], 2)
            ])) : A("", !0),
            f("div", mO, [
              f("button", {
                class: R(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, bO),
              f("ul", yO, [
                (b(!0), y(W, null, K(i.messages.table, (a) => (b(), y("li", { key: a }, [
                  f("span", {
                    class: R(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    f("small", vO, S(a.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, _O)
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
            U(" " + S(r.translate(a.title)), 1)
          ], 10, EO)) : A("", !0),
          a.action === "TABLE_COLUMNS" ? (b(), y("div", wO, [
            f("button", {
              type: "button",
              class: R([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              G(f("span", TO, [
                f("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + S(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (b(), y("span", AO, " ( " + S(r.countHiddenColumns()) + " " + S(r.translate("hidden")) + " ) ", 1)) : A("", !0)
              ], 512), [
                [Ns, e.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", NO, [
              (b(!0), y(W, null, K(e.settings.table.columns, (l) => (b(), y("li", { key: l }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(l)
                }, [
                  l.hidden ? A("", !0) : (b(), y("i", CO)),
                  l.hidden ? (b(), y("i", SO)) : A("", !0),
                  U(" " + S(l.title) + " ", 1),
                  f("small", xO, S(l.name), 1)
                ], 8, OO)
              ]))), 128)),
              t[27] || (t[27] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (l) => r.toggleColumn(!0))
                }, S(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (l) => r.toggleColumn(!1))
                }, S(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : A("", !0),
          a.dropdowns ? (b(), y("div", LO, [
            f("button", {
              type: "button",
              class: R([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", kO, [
                f("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + S(r.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", IO, [
              (b(!0), y(W, null, K(a.dropdowns, (l) => (b(), y("li", { key: l }, [
                f("span", {
                  class: R(["dropdown-item cursor-pointer", [l.class]]),
                  onClick: (h) => r.tableAction(l, i.items, null, h)
                }, [
                  l.icon ? (b(), y("i", {
                    key: 0,
                    class: R([l.icon])
                  }, null, 2)) : A("", !0),
                  U(" " + S(r.translate(l.title)), 1)
                ], 10, RO)
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
          f("tr", DO, [
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
                }, null, 8, $O),
                i.config.order[a.name] ? (b(), y("span", {
                  key: 0,
                  class: R(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (b(), y("i", BO)) : A("", !0),
                  i.config.order[a.name].dir === "DESC" ? (b(), y("i", PO)) : A("", !0),
                  U(" " + S(i.config.order[a.name].idx + 1), 1)
                ], 2)) : A("", !0)
              ], 10, qO),
              a.header && a.header.buttons ? (b(), y("span", jO, [
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
                  U(" " + S(r.translate(l.title)), 1)
                ], 10, UO))), 128))
              ])) : A("", !0)
            ], 14, MO))), 128))
          ]),
          r.countFilters() ? (b(), y("tr", VO, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("th", {
              style: Yn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: R([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (b(), y("div", HO, [
                f("span", {
                  class: R(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (l) => r.toggleSelectedRowInPage())
                }, [
                  G(f("i", WO, null, 512), [
                    [Ns, !r.haveSelectedRowInPage()]
                  ]),
                  G(f("i", zO, null, 512), [
                    [Ns, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : A("", !0),
              a.filter && a.filter.type == "text" ? (b(), y("div", KO, [
                G(f("input", {
                  type: "text",
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onKeyup: t[3] || (t[3] = Co((l) => r.reloadTable(), ["enter"]))
                }, null, 42, GO), [
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
                ]), 10, YO)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "number" ? (b(), y("div", XO, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", QO, S(r.translate("=")), 1),
                  f("option", JO, S(r.translate(">")), 1),
                  f("option", tC, S(r.translate(">=")), 1),
                  f("option", eC, S(r.translate("<")), 1),
                  f("option", sC, S(r.translate("<=")), 1)
                ], 40, ZO)), [
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
                  }, S(l.label), 9, iC))), 128))
                ], 40, nC)), [
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
                  onKeyup: t[7] || (t[7] = Co((l) => r.reloadTable(), ["enter"]))
                }, null, 42, rC), [
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
                ]), 10, oC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "select" ? (b(), y("div", aC, [
                a.filter.dropdown ? (b(), y("div", lC, [
                  f("button", cC, S(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  f("ul", uC, [
                    f("li", null, [
                      (b(!0), y(W, null, K(a.filter.options, (l) => (b(), y("span", {
                        key: l,
                        class: R(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, l)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value) ? (b(), y("i", dC)) : (b(), y("i", fC)),
                        U(" " + S(r.translate(l.label ? l.label : l.value)), 1)
                      ], 10, hC))), 128))
                    ]),
                    a.filter.multiple ? (b(), y("li", pC, t[30] || (t[30] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : A("", !0),
                    a.filter.multiple ? (b(), y("li", gC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, S(r.translate("Select all")), 9, mC)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", bC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectClear(a.filter.value)
                      }, S(r.translate("Unselect all")), 9, yC)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", vC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, S(r.translate("Invert all")), 9, _C)
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
                  }, S(r.translate(l.label ? l.label : l.value)), 9, wC))), 128))
                ], 40, EC)), [
                  [Re, a.filter.value]
                ])
              ])) : A("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (b(), y("div", TC, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  onChange: t[9] || (t[9] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", NC, S(r.translate("=")), 1),
                  f("option", OC, S(r.translate(">")), 1),
                  f("option", CC, S(r.translate(">=")), 1),
                  f("option", SC, S(r.translate("<")), 1),
                  f("option", xC, S(r.translate("<=")), 1)
                ], 40, AC)), [
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
                  }, S(r.translate(l.label)), 9, kC))), 128))
                ], 40, LC)), [
                  [Re, a.filter.operator]
                ]) : A("", !0),
                G(f("input", {
                  type: a.filter.type,
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onChange: t[11] || (t[11] = (l) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = Co((l) => r.reloadTable(), ["enter"]))
                }, null, 42, IC), [
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
                ]), 10, RC)
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
                    U(" " + S(r.translate(l.title)), 1)
                  ], 10, DC)
                ]))), 128))
              ], 2)) : A("", !0)
            ], 14, FO))), 128))
          ])) : A("", !0)
        ]),
        f("tbody", null, [
          (b(!0), y(W, null, K(this.items, (a, l) => (b(), y(W, {
            key: a.id
          }, [
            f("tr", MC, [
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
                h.index ? (b(), y("div", $C, [
                  f("span", {
                    class: R(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: l + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, BC)
                ])) : A("", !0),
                !h.template && !h.input && !h.progressbar ? (b(), y("span", PC, S(r.tableCellValue(h.name, a, l, h)), 1)) : A("", !0),
                h.template ? (b(), y("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, l, h)
                }, null, 8, jC)) : A("", !0),
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
                    h.progressbar.value ? (b(), y("span", VC, S(a[h.name]), 1)) : A("", !0)
                  ], 6)
                ], 8, UC)) : A("", !0),
                h.input ? (b(), y("div", FC, [
                  h.input.prefix ? (b(), y("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, HC)) : A("", !0),
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
                  }, null, 42, WC)), [
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
                    }, S(r.translate(p.label)), 9, KC))), 128))
                  ], 42, zC)), [
                    [Re, a[h.name]]
                  ]) : A("", !0),
                  h.input.suffix ? (b(), y("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, GC)) : A("", !0)
                ])) : A("", !0),
                h.buttons ? (b(), y("span", YC, [
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
                      }, null, 8, ZC)) : (b(), y("span", QC, S(r.translate(p.title)), 1))
                    ], 10, XC)
                  ]))), 128))
                ])) : A("", !0)
              ], 14, qC))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (b(), y("tr", JC, [
              f("td", {
                class: R([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (b(!0), y(W, null, K(e.settings.table.details.fields, (h) => (b(), y("div", {
                  class: "m-0",
                  key: h
                }, [
                  f("div", eS, [
                    f("div", {
                      class: R(["col text-end", [h.class]])
                    }, [
                      f("label", sS, S(h.label), 1)
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
                      }, null, 40, nS)), [
                        [dn, a[h.name]]
                      ]) : A("", !0),
                      h.input.type == "textarea" ? G((b(), y("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (p) => a[h.name] = p,
                        onChange: (p) => r.onRowInputChange(a[h.name], h, a, l)
                      }, `\r
                    `, 40, iS)), [
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
                        }, S(r.translate(p.label)), 9, oS))), 128))
                      ], 40, rS)), [
                        [Re, a[h.name]]
                      ]) : A("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, aS),
                e.settings.debug ? (b(), y("pre", lS, "                " + S(a) + `
              `, 1)) : A("", !0)
              ], 10, tS)
            ])) : A("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (b(), y("tr", cS, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("td", {
              style: Yn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: R(a.class)
            }, [
              a.index ? (b(), y("div", hS, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (l) => r.toggleSelectedAll())
                }, S(i.selected.length), 1)
              ])) : A("", !0),
              a.input && a.bulk && a.bulk.enabled ? (b(), y("div", dS, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? G((b(), y("input", {
                  key: 0,
                  type: a.input.type,
                  class: R(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (l) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (l) => i.bulkitem[a.name] = l
                }, null, 42, fS)), [
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
                  }, S(r.translate(l.label)), 9, gS))), 128))
                ], 42, pS)), [
                  [Re, i.bulkitem[a.name]]
                ]) : A("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (l) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (b(), y("i", bS)) : (b(), y("i", yS))
                ], 8, mS)
              ])) : A("", !0),
              a.bulk ? (b(), y("span", vS, [
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
                    }, null, 8, ES)) : (b(), y("span", wS, S(r.translate(l.title)), 1))
                  ], 10, _S)
                ]))), 128))
              ])) : A("", !0)
            ], 14, uS))), 128))
          ])) : A("", !0)
        ])
      ], 2)) : A("", !0),
      du(o, {
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
        f("div", AS, [
          f("div", NS, [
            i.item ? (b(), y("form", {
              key: 0,
              ref: "form",
              id: s.formId,
              class: R(["form", [e.settings.form.class, { wait: i.ui.wait.form }]]),
              onSubmit: t[25] || (t[25] = Rd((...a) => r.submitItem && r.submitItem(...a), ["prevent"])),
              "data-bs-theme": [e.settings.theme]
            }, [
              f("div", {
                class: R(["vua-overlay", { blocked: i.ui.block.form }])
              }, null, 2),
              f("div", CS, [
                f("h5", SS, [
                  e.settings.form.title && typeof e.settings.form.title == "function" ? (b(), y("span", {
                    key: 0,
                    innerHTML: e.settings.form.title(i.item, e.settings)
                  }, null, 8, xS)) : A("", !0),
                  e.settings.form.title && typeof e.settings.form.title == "string" ? (b(), y("span", LS, S(r.translate(e.settings.form.title)), 1)) : A("", !0),
                  e.settings.form.title ? A("", !0) : (b(), y("span", kS, S(r.translate("Edit")), 1)),
                  i.item[e.settings.pkey] ? (b(), y("small", IS, [
                    t[32] || (t[32] = f("span", { class: "text-muted fw-light" }, "id", -1)),
                    U(" " + S(i.item[e.settings.pkey]), 1)
                  ])) : A("", !0)
                ]),
                i.message.form ? (b(), y("span", RS, [
                  f("span", {
                    class: R(["text-" + i.message.form.priority])
                  }, [
                    t[33] || (t[33] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
                    f("span", {
                      innerHTML: i.message.form.msg
                    }, null, 8, DS)
                  ], 2)
                ])) : A("", !0),
                G(f("span", MS, t[34] || (t[34] = [
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
              i.item ? (b(), y("div", qS, [
                f("div", null, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-secondary m-1",
                    onClick: t[14] || (t[14] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[36] || (t[36] = f("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    U(" " + S(r.translate("Reload")), 1)
                  ], 8, $S),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[15] || (t[15] = (a) => r.createItem())
                  }, [
                    t[37] || (t[37] = f("i", { class: "bi bi-plus-circle" }, null, -1)),
                    U(" " + S(r.translate("New")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning m-1",
                    onClick: t[16] || (t[16] = (a) => r.copyItem())
                  }, [
                    t[38] || (t[38] = f("i", { class: "bi bi-copy" }, null, -1)),
                    U(" " + S(r.translate("Copy")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-danger m-1",
                    onClick: t[17] || (t[17] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[39] || (t[39] = f("i", { class: "bi bi-trash" }, null, -1)),
                    U(" " + S(r.translate("Delete")), 1)
                  ], 8, BS)
                ]),
                f("div", null, [
                  i.messages.form.length ? (b(), y("div", PS, [
                    f("div", jS, [
                      f("button", {
                        class: R(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.form[0].priority]]),
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false",
                        innerHTML: i.messages.form.length + " " + (i.messages.form.length > 1 ? r.translate("messages") : r.translate("message"))
                      }, null, 10, US),
                      f("ul", VS, [
                        (b(!0), y(W, null, K(i.messages.form, (a) => (b(), y("li", { key: a }, [
                          f("span", {
                            class: R(["dropdown-item", ["text-" + a.priority]])
                          }, [
                            f("small", FS, S(a.datetime), 1),
                            f("span", {
                              innerHTML: a.msg
                            }, null, 8, HS)
                          ], 2)
                        ]))), 128))
                      ])
                    ])
                  ])) : A("", !0),
                  f("button", WS, [
                    t[40] || (t[40] = f("i", { class: "bi bi-x" }, null, -1)),
                    U(" " + S(r.translate("Close")), 1)
                  ]),
                  f("button", zS, [
                    t[41] || (t[41] = f("i", { class: "bi bi-save" }, null, -1)),
                    U(" " + S(r.translate("Save")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-success m-1",
                    onClick: t[18] || (t[18] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[42] || (t[42] = f("i", { class: "bi bi-save" }, null, -1)),
                    U(" " + S(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : A("", !0),
              e.settings.form ? (b(), y("div", KS, [
                i.item && e.settings.form.groups ? (b(), na(c, {
                  key: 0,
                  modelValue: i.item,
                  "onUpdate:modelValue": t[19] || (t[19] = (a) => i.item = a),
                  formid: s.formId,
                  settings: e.settings
                }, null, 8, ["modelValue", "formid", "settings"])) : A("", !0)
              ])) : A("", !0),
              i.item ? (b(), y("div", GS, [
                f("div", null, [
                  f("button", {
                    type: "button",
                    class: "btn btn-secondary m-1",
                    onClick: t[20] || (t[20] = (a) => r.reloadItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[43] || (t[43] = f("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
                    U(" " + S(r.translate("Reload")), 1)
                  ], 8, YS),
                  f("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[21] || (t[21] = (a) => r.createItem())
                  }, [
                    t[44] || (t[44] = f("i", { class: "bi bi-plus-circle" }, null, -1)),
                    U(" " + S(r.translate("New")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-outline-warning m-1",
                    onClick: t[22] || (t[22] = (a) => r.copyItem())
                  }, [
                    t[45] || (t[45] = f("i", { class: "bi bi-copy" }, null, -1)),
                    U(" " + S(r.translate("Copy")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-danger m-1",
                    onClick: t[23] || (t[23] = (a) => r.deleteItem()),
                    disabled: !i.item[e.settings.pkey]
                  }, [
                    t[46] || (t[46] = f("i", { class: "bi bi-trash" }, null, -1)),
                    U(" " + S(r.translate("Delete")), 1)
                  ], 8, XS)
                ]),
                f("div", null, [
                  f("button", ZS, [
                    t[47] || (t[47] = f("i", { class: "bi bi-x" }, null, -1)),
                    U(" " + S(r.translate("Close")), 1)
                  ]),
                  f("button", QS, [
                    t[48] || (t[48] = f("i", { class: "bi bi-save" }, null, -1)),
                    U(" " + S(r.translate("Save")), 1)
                  ]),
                  f("button", {
                    type: "button",
                    class: "btn btn-success m-1",
                    onClick: t[24] || (t[24] = (...a) => r.submitAndClose && r.submitAndClose(...a))
                  }, [
                    t[49] || (t[49] = f("i", { class: "bi bi-save" }, null, -1)),
                    U(" " + S(r.translate("Save and close")), 1)
                  ])
                ])
              ])) : A("", !0)
            ], 42, OS)) : A("", !0),
            e.settings.debug ? (b(), y("pre", JS, "        " + S(i.item) + `
      `, 1)) : A("", !0)
          ])
        ])
      ], 8, TS)
    ], 10, aO)
  ])) : A("", !0);
}
const e2 = /* @__PURE__ */ In(rO, [["render", t2], ["__scopeId", "data-v-a93e8966"]]), s2 = {
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
      if (this.settings = ph(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, !this.settings.theme) {
        const s = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = s || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.2.1"), console.log(`Entity config (${this.entity}) initialized`));
    } else
      console.log("vu-admin ", "1.2.1"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: e2
  }
}, n2 = { key: 0 }, i2 = ["data-bs-theme"];
function r2(s, t, e, n, i, r) {
  const o = li("vu-admin-table");
  return e.entity && i.settings ? (b(), y("div", n2, [
    f("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      du(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, i2)
  ])) : A("", !0);
}
const o2 = /* @__PURE__ */ In(s2, [["render", r2]]), p2 = {
  install(s) {
    s.component("VuAdmin", o2);
  }
};
export {
  o2 as VuAdmin,
  p2 as default
};
