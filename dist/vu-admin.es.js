var Rd = Object.defineProperty;
var Dd = (s, t, e) => t in s ? Rd(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var $ = (s, t, e) => Dd(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as b, createElementBlock as y, createElementVNode as f, normalizeClass as R, Fragment as W, renderList as K, toDisplayString as O, createCommentVNode as A, withDirectives as G, vModelText as jt, withKeys as ri, withModifiers as aa, createTextVNode as U, resolveComponent as yn, vModelCheckbox as $d, vModelSelect as Re, createBlock as pr, vModelDynamic as fn, vShow as Ns, normalizeStyle as Xn, createVNode as mu } from "vue";
var Tt = "top", xt = "bottom", It = "right", At = "left", Or = "auto", kn = [Tt, xt, It, At], Ls = "start", vn = "end", bu = "clippingParents", Va = "viewport", nn = "popper", yu = "reference", la = /* @__PURE__ */ kn.reduce(function(s, t) {
  return s.concat([t + "-" + Ls, t + "-" + vn]);
}, []), Ua = /* @__PURE__ */ [].concat(kn, [Or]).reduce(function(s, t) {
  return s.concat([t, t + "-" + Ls, t + "-" + vn]);
}, []), vu = "beforeRead", _u = "read", Eu = "afterRead", wu = "beforeMain", Tu = "main", Au = "afterMain", Nu = "beforeWrite", Ou = "write", Cu = "afterWrite", Su = [vu, _u, Eu, wu, Tu, Au, Nu, Ou, Cu];
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
function ks(s) {
  var t = Rt(s).Element;
  return s instanceof t || s instanceof Element;
}
function Wt(s) {
  var t = Rt(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
}
function Fa(s) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Rt(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
}
function Md(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !Wt(r) || !_e(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var c = i[o];
      c === !1 ? r.removeAttribute(o) : r.setAttribute(o, c === !0 ? "" : c);
    }));
  });
}
function qd(s) {
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
const Ha = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Md,
  effect: qd,
  requires: ["computeStyles"]
};
function me(s) {
  return s.split("-")[0];
}
var Ss = Math.max, gr = Math.min, _n = Math.round;
function ca() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Lu() {
  return !/^((?!chrome|android).)*safari/i.test(ca());
}
function En(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Wt(s) && (i = s.offsetWidth > 0 && _n(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && _n(n.height) / s.offsetHeight || 1);
  var o = ks(s) ? Rt(s) : window, c = o.visualViewport, a = !Lu() && e, l = (n.left + (a && c ? c.offsetLeft : 0)) / i, h = (n.top + (a && c ? c.offsetTop : 0)) / r, p = n.width / i, g = n.height / r;
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
function Wa(s) {
  var t = En(s), e = s.offsetWidth, n = s.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: s.offsetLeft,
    y: s.offsetTop,
    width: e,
    height: n
  };
}
function ku(s, t) {
  var e = t.getRootNode && t.getRootNode();
  if (s.contains(t))
    return !0;
  if (e && Fa(e)) {
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
function Bd(s) {
  return ["table", "td", "th"].indexOf(_e(s)) >= 0;
}
function rs(s) {
  return ((ks(s) ? s.ownerDocument : (
    // $FlowFixMe[prop-missing]
    s.document
  )) || window.document).documentElement;
}
function Cr(s) {
  return _e(s) === "html" ? s : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    s.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    s.parentNode || // DOM Element detected
    (Fa(s) ? s.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    rs(s)
  );
}
function Il(s) {
  return !Wt(s) || // https://github.com/popperjs/popper-core/issues/837
  Me(s).position === "fixed" ? null : s.offsetParent;
}
function Pd(s) {
  var t = /firefox/i.test(ca()), e = /Trident/i.test(ca());
  if (e && Wt(s)) {
    var n = Me(s);
    if (n.position === "fixed")
      return null;
  }
  var i = Cr(s);
  for (Fa(i) && (i = i.host); Wt(i) && ["html", "body"].indexOf(_e(i)) < 0; ) {
    var r = Me(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Ei(s) {
  for (var t = Rt(s), e = Il(s); e && Bd(e) && Me(e).position === "static"; )
    e = Il(e);
  return e && (_e(e) === "html" || _e(e) === "body" && Me(e).position === "static") ? t : e || Pd(s) || t;
}
function za(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function oi(s, t, e) {
  return Ss(s, gr(t, e));
}
function jd(s, t, e) {
  var n = oi(s, t, e);
  return n > e ? e : n;
}
function xu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Iu(s) {
  return Object.assign({}, xu(), s);
}
function Ru(s, t) {
  return t.reduce(function(e, n) {
    return e[n] = s, e;
  }, {});
}
var Vd = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Iu(typeof t != "number" ? t : Ru(t, kn));
};
function Ud(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, c = me(e.placement), a = za(c), l = [At, It].indexOf(c) >= 0, h = l ? "height" : "width";
  if (!(!r || !o)) {
    var p = Vd(i.padding, e), g = Wa(r), m = a === "y" ? Tt : At, _ = a === "y" ? xt : It, E = e.rects.reference[h] + e.rects.reference[a] - o[a] - e.rects.popper[h], w = o[a] - e.rects.reference[a], T = Ei(r), C = T ? a === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, L = E / 2 - w / 2, k = p[m], I = C - g[h] - p[_], D = C / 2 - g[h] / 2 + L, P = oi(k, D, I), F = a;
    e.modifiersData[n] = (t = {}, t[F] = P, t.centerOffset = P - D, t);
  }
}
function Fd(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || ku(t.elements.popper, i) && (t.elements.arrow = i));
}
const Du = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ud,
  effect: Fd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function wn(s) {
  return s.split("-")[1];
}
var Hd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Wd(s, t) {
  var e = s.x, n = s.y, i = t.devicePixelRatio || 1;
  return {
    x: _n(e * i) / i || 0,
    y: _n(n * i) / i || 0
  };
}
function Rl(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, c = s.position, a = s.gpuAcceleration, l = s.adaptive, h = s.roundOffsets, p = s.isFixed, g = o.x, m = g === void 0 ? 0 : g, _ = o.y, E = _ === void 0 ? 0 : _, w = typeof h == "function" ? h({
    x: m,
    y: E
  }) : {
    x: m,
    y: E
  };
  m = w.x, E = w.y;
  var T = o.hasOwnProperty("x"), C = o.hasOwnProperty("y"), L = At, k = Tt, I = window;
  if (l) {
    var D = Ei(e), P = "clientHeight", F = "clientWidth";
    if (D === Rt(e) && (D = rs(e), Me(D).position !== "static" && c === "absolute" && (P = "scrollHeight", F = "scrollWidth")), D = D, i === Tt || (i === At || i === It) && r === vn) {
      k = xt;
      var J = p && D === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        D[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === At || (i === Tt || i === xt) && r === vn) {
      L = It;
      var tt = p && D === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        D[F]
      );
      m -= tt - n.width, m *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: c
  }, l && Hd), ot = h === !0 ? Wd({
    x: m,
    y: E
  }, Rt(e)) : {
    x: m,
    y: E
  };
  if (m = ot.x, E = ot.y, a) {
    var it;
    return Object.assign({}, nt, (it = {}, it[k] = C ? "0" : "", it[L] = T ? "0" : "", it.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + E + "px)" : "translate3d(" + m + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[k] = C ? E + "px" : "", t[L] = T ? m + "px" : "", t.transform = "", t));
}
function zd(s) {
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, c = e.roundOffsets, a = c === void 0 ? !0 : c, l = {
    placement: me(t.placement),
    variation: wn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Rl(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Rl(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Ka = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: zd,
  data: {}
};
var Yi = {
  passive: !0
};
function Kd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, c = o === void 0 ? !0 : o, a = Rt(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && l.forEach(function(h) {
    h.addEventListener("scroll", e.update, Yi);
  }), c && a.addEventListener("resize", e.update, Yi), function() {
    r && l.forEach(function(h) {
      h.removeEventListener("scroll", e.update, Yi);
    }), c && a.removeEventListener("resize", e.update, Yi);
  };
}
const Ga = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Kd,
  data: {}
};
var Gd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function lr(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return Gd[t];
  });
}
var Yd = {
  start: "end",
  end: "start"
};
function Dl(s) {
  return s.replace(/start|end/g, function(t) {
    return Yd[t];
  });
}
function Ya(s) {
  var t = Rt(s), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Xa(s) {
  return En(rs(s)).left + Ya(s).scrollLeft;
}
function Xd(s, t) {
  var e = Rt(s), n = rs(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var l = Lu();
    (l || !l && t === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: c + Xa(s),
    y: a
  };
}
function Zd(s) {
  var t, e = rs(s), n = Ya(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = Ss(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Ss(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -n.scrollLeft + Xa(s), a = -n.scrollTop;
  return Me(i || e).direction === "rtl" && (c += Ss(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: c,
    y: a
  };
}
function Za(s) {
  var t = Me(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function $u(s) {
  return ["html", "body", "#document"].indexOf(_e(s)) >= 0 ? s.ownerDocument.body : Wt(s) && Za(s) ? s : $u(Cr(s));
}
function ai(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = $u(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Za(n) ? n : []) : n, c = t.concat(o);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(ai(Cr(o)))
  );
}
function ua(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
}
function Qd(s, t) {
  var e = En(s, !1, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
}
function $l(s, t, e) {
  return t === Va ? ua(Xd(s, e)) : ks(t) ? Qd(t, e) : ua(Zd(rs(s)));
}
function Jd(s) {
  var t = ai(Cr(s)), e = ["absolute", "fixed"].indexOf(Me(s).position) >= 0, n = e && Wt(s) ? Ei(s) : s;
  return ks(n) ? t.filter(function(i) {
    return ks(i) && ku(i, n) && _e(i) !== "body";
  }) : [];
}
function tf(s, t, e, n) {
  var i = t === "clippingParents" ? Jd(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], c = r.reduce(function(a, l) {
    var h = $l(s, l, n);
    return a.top = Ss(h.top, a.top), a.right = gr(h.right, a.right), a.bottom = gr(h.bottom, a.bottom), a.left = Ss(h.left, a.left), a;
  }, $l(s, o, n));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function Mu(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? me(n) : null, r = n ? wn(n) : null, o = t.x + t.width / 2 - e.width / 2, c = t.y + t.height / 2 - e.height / 2, a;
  switch (i) {
    case Tt:
      a = {
        x: o,
        y: t.y - e.height
      };
      break;
    case xt:
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
  var l = i ? za(i) : null;
  if (l != null) {
    var h = l === "y" ? "height" : "width";
    switch (r) {
      case Ls:
        a[l] = a[l] - (t[h] / 2 - e[h] / 2);
        break;
      case vn:
        a[l] = a[l] + (t[h] / 2 - e[h] / 2);
        break;
    }
  }
  return a;
}
function Tn(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, c = e.boundary, a = c === void 0 ? bu : c, l = e.rootBoundary, h = l === void 0 ? Va : l, p = e.elementContext, g = p === void 0 ? nn : p, m = e.altBoundary, _ = m === void 0 ? !1 : m, E = e.padding, w = E === void 0 ? 0 : E, T = Iu(typeof w != "number" ? w : Ru(w, kn)), C = g === nn ? yu : nn, L = s.rects.popper, k = s.elements[_ ? C : g], I = tf(ks(k) ? k : k.contextElement || rs(s.elements.popper), a, h, o), D = En(s.elements.reference), P = Mu({
    reference: D,
    element: L,
    strategy: "absolute",
    placement: i
  }), F = ua(Object.assign({}, L, P)), J = g === nn ? F : D, tt = {
    top: I.top - J.top + T.top,
    bottom: J.bottom - I.bottom + T.bottom,
    left: I.left - J.left + T.left,
    right: J.right - I.right + T.right
  }, nt = s.modifiersData.offset;
  if (g === nn && nt) {
    var ot = nt[i];
    Object.keys(tt).forEach(function(it) {
      var $t = [It, xt].indexOf(it) >= 0 ? 1 : -1, Mt = [Tt, xt].indexOf(it) >= 0 ? "y" : "x";
      tt[it] += ot[Mt] * $t;
    });
  }
  return tt;
}
function ef(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, c = e.flipVariations, a = e.allowedAutoPlacements, l = a === void 0 ? Ua : a, h = wn(n), p = h ? c ? la : la.filter(function(_) {
    return wn(_) === h;
  }) : kn, g = p.filter(function(_) {
    return l.indexOf(_) >= 0;
  });
  g.length === 0 && (g = p);
  var m = g.reduce(function(_, E) {
    return _[E] = Tn(s, {
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
function sf(s) {
  if (me(s) === Or)
    return [];
  var t = lr(s);
  return [Dl(s), t, Dl(t)];
}
function nf(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !0 : o, a = e.fallbackPlacements, l = e.padding, h = e.boundary, p = e.rootBoundary, g = e.altBoundary, m = e.flipVariations, _ = m === void 0 ? !0 : m, E = e.allowedAutoPlacements, w = t.options.placement, T = me(w), C = T === w, L = a || (C || !_ ? [lr(w)] : sf(w)), k = [w].concat(L).reduce(function(Xt, z) {
      return Xt.concat(me(z) === Or ? ef(t, {
        placement: z,
        boundary: h,
        rootBoundary: p,
        padding: l,
        flipVariations: _,
        allowedAutoPlacements: E
      }) : z);
    }, []), I = t.rects.reference, D = t.rects.popper, P = /* @__PURE__ */ new Map(), F = !0, J = k[0], tt = 0; tt < k.length; tt++) {
      var nt = k[tt], ot = me(nt), it = wn(nt) === Ls, $t = [Tt, xt].indexOf(ot) >= 0, Mt = $t ? "width" : "height", ut = Tn(t, {
        placement: nt,
        boundary: h,
        rootBoundary: p,
        altBoundary: g,
        padding: l
      }), _t = $t ? it ? It : At : it ? xt : Tt;
      I[Mt] > D[Mt] && (_t = lr(_t));
      var Fe = lr(_t), Yt = [];
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
        var ce = k.find(function(He) {
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
const qu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: nf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ml(s, t, e) {
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
function ql(s) {
  return [Tt, It, xt, At].some(function(t) {
    return s[t] >= 0;
  });
}
function rf(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = Tn(t, {
    elementContext: "reference"
  }), c = Tn(t, {
    altBoundary: !0
  }), a = Ml(o, n), l = Ml(c, i, r), h = ql(a), p = ql(l);
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
const Bu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: rf
};
function of(s, t, e) {
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
function af(s) {
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Ua.reduce(function(h, p) {
    return h[p] = of(p, t.rects, r), h;
  }, {}), c = o[t.placement], a = c.x, l = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += l), t.modifiersData[n] = o;
}
const Pu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: af
};
function lf(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = Mu({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Qa = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: lf,
  data: {}
};
function cf(s) {
  return s === "x" ? "y" : "x";
}
function uf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, c = o === void 0 ? !1 : o, a = e.boundary, l = e.rootBoundary, h = e.altBoundary, p = e.padding, g = e.tether, m = g === void 0 ? !0 : g, _ = e.tetherOffset, E = _ === void 0 ? 0 : _, w = Tn(t, {
    boundary: a,
    rootBoundary: l,
    padding: p,
    altBoundary: h
  }), T = me(t.placement), C = wn(t.placement), L = !C, k = za(T), I = cf(k), D = t.modifiersData.popperOffsets, P = t.rects.reference, F = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
      var it, $t = k === "y" ? Tt : At, Mt = k === "y" ? xt : It, ut = k === "y" ? "height" : "width", _t = D[k], Fe = _t + w[$t], Yt = _t - w[Mt], Y = m ? -F[ut] / 2 : 0, us = C === Ls ? P[ut] : F[ut], Ae = C === Ls ? -F[ut] : -P[ut], pt = t.elements.arrow, Xt = m && pt ? Wa(pt) : {
        width: 0,
        height: 0
      }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : xu(), ce = z[$t], He = z[Mt], at = oi(0, P[ut], Xt[ut]), We = L ? P[ut] / 2 - Y - at - ce - tt.mainAxis : us - at - ce - tt.mainAxis, Hs = L ? -P[ut] / 2 + Y + at + He + tt.mainAxis : Ae + at + He + tt.mainAxis, Ne = t.elements.arrow && Ei(t.elements.arrow), hs = Ne ? k === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0 : 0, ds = (it = nt == null ? void 0 : nt[k]) != null ? it : 0, fs = _t + We - ds - hs, Ws = _t + Hs - ds, ze = oi(m ? gr(Fe, fs) : Fe, _t, m ? Ss(Yt, Ws) : Yt);
      D[k] = ze, ot[k] = ze - _t;
    }
    if (c) {
      var ps, Dn = k === "x" ? Tt : At, $n = k === "x" ? xt : It, Nt = D[I], ue = I === "y" ? "height" : "width", gs = Nt + w[Dn], ms = Nt - w[$n], Ot = [Tt, At].indexOf(T) !== -1, Oe = (ps = nt == null ? void 0 : nt[I]) != null ? ps : 0, zs = Ot ? gs : Nt - P[ue] - F[ue] - Oe + tt.altAxis, he = Ot ? Nt + P[ue] + F[ue] - Oe - tt.altAxis : ms, Ce = m && Ot ? jd(zs, Nt, he) : oi(m ? zs : gs, Nt, m ? he : ms);
      D[I] = Ce, ot[I] = Ce - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const ju = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: uf,
  requiresIfExists: ["offset"]
};
function hf(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
}
function df(s) {
  return s === Rt(s) || !Wt(s) ? Ya(s) : hf(s);
}
function ff(s) {
  var t = s.getBoundingClientRect(), e = _n(t.width) / s.offsetWidth || 1, n = _n(t.height) / s.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function pf(s, t, e) {
  e === void 0 && (e = !1);
  var n = Wt(t), i = Wt(t) && ff(t), r = rs(t), o = En(s, i, e), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((_e(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Za(r)) && (c = df(t)), Wt(t) ? (a = En(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Xa(r))), {
    x: o.left + c.scrollLeft - a.x,
    y: o.top + c.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function gf(s) {
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
function mf(s) {
  var t = gf(s);
  return Su.reduce(function(e, n) {
    return e.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function bf(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(s());
      });
    })), t;
  };
}
function yf(s) {
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
var Bl = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Pl() {
  for (var s = arguments.length, t = new Array(s), e = 0; e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Sr(s) {
  s === void 0 && (s = {});
  var t = s, e = t.defaultModifiers, n = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? Bl : i;
  return function(c, a, l) {
    l === void 0 && (l = r);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Bl, r),
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
          reference: ks(c) ? ai(c) : c.contextElement ? ai(c.contextElement) : [],
          popper: ai(a)
        };
        var L = mf(yf([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = L.filter(function(k) {
          return k.enabled;
        }), _(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var T = h.elements, C = T.reference, L = T.popper;
          if (Pl(C, L)) {
            h.rects = {
              reference: pf(C, Ei(L), h.options.strategy === "fixed"),
              popper: Wa(L)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(tt) {
              return h.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var k = 0; k < h.orderedModifiers.length; k++) {
              if (h.reset === !0) {
                h.reset = !1, k = -1;
                continue;
              }
              var I = h.orderedModifiers[k], D = I.fn, P = I.options, F = P === void 0 ? {} : P, J = I.name;
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
      update: bf(function() {
        return new Promise(function(w) {
          m.forceUpdate(), w(h);
        });
      }),
      destroy: function() {
        E(), g = !0;
      }
    };
    if (!Pl(c, a))
      return m;
    m.setOptions(l).then(function(w) {
      !g && l.onFirstUpdate && l.onFirstUpdate(w);
    });
    function _() {
      h.orderedModifiers.forEach(function(w) {
        var T = w.name, C = w.options, L = C === void 0 ? {} : C, k = w.effect;
        if (typeof k == "function") {
          var I = k({
            state: h,
            name: T,
            instance: m,
            options: L
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
var vf = /* @__PURE__ */ Sr(), _f = [Ga, Qa, Ka, Ha], Ef = /* @__PURE__ */ Sr({
  defaultModifiers: _f
}), wf = [Ga, Qa, Ka, Ha, Pu, qu, ju, Du, Bu], Ja = /* @__PURE__ */ Sr({
  defaultModifiers: wf
});
const Vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Au,
  afterRead: Eu,
  afterWrite: Cu,
  applyStyles: Ha,
  arrow: Du,
  auto: Or,
  basePlacements: kn,
  beforeMain: wu,
  beforeRead: vu,
  beforeWrite: Nu,
  bottom: xt,
  clippingParents: bu,
  computeStyles: Ka,
  createPopper: Ja,
  createPopperBase: vf,
  createPopperLite: Ef,
  detectOverflow: Tn,
  end: vn,
  eventListeners: Ga,
  flip: qu,
  hide: Bu,
  left: At,
  main: Tu,
  modifierPhases: Su,
  offset: Pu,
  placements: Ua,
  popper: nn,
  popperGenerator: Sr,
  popperOffsets: Qa,
  preventOverflow: ju,
  read: _u,
  reference: yu,
  right: It,
  start: Ls,
  top: Tt,
  variationPlacements: la,
  viewport: Va,
  write: Ou
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Ye = /* @__PURE__ */ new Map(), Ro = {
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
}, Tf = 1e6, Af = 1e3, ha = "transitionend", Uu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), Nf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Of = (s) => {
  do
    s += Math.floor(Math.random() * Tf);
  while (document.getElementById(s));
  return s;
}, Cf = (s) => {
  if (!s)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: e
  } = window.getComputedStyle(s);
  const n = Number.parseFloat(t), i = Number.parseFloat(e);
  return !n && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * Af);
}, Fu = (s) => {
  s.dispatchEvent(new Event(ha));
}, De = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), es = (s) => De(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Uu(s)) : null, xn = (s) => {
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
}, ss = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false", Hu = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? Hu(s.parentNode) : null;
}, mr = () => {
}, wi = (s) => {
  s.offsetHeight;
}, Wu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Do = [], Sf = (s) => {
  document.readyState === "loading" ? (Do.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Do)
      t();
  }), Do.push(s)) : s();
}, zt = () => document.documentElement.dir === "rtl", Gt = (s) => {
  Sf(() => {
    const t = Wu();
    if (t) {
      const e = s.NAME, n = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface);
    }
  });
}, Lt = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e, zu = (s, t, e = !0) => {
  if (!e) {
    Lt(s);
    return;
  }
  const i = Cf(t) + 5;
  let r = !1;
  const o = ({
    target: c
  }) => {
    c === t && (r = !0, t.removeEventListener(ha, o), Lt(s));
  };
  t.addEventListener(ha, o), setTimeout(() => {
    r || Fu(t);
  }, i);
}, tl = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, Lf = /[^.]*(?=\..*)\.|.*/, kf = /\..*/, xf = /::\d+$/, $o = {};
let jl = 1;
const Ku = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, If = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Gu(s, t) {
  return t && `${t}::${jl++}` || s.uidEvent || jl++;
}
function Yu(s) {
  const t = Gu(s);
  return s.uidEvent = t, $o[t] = $o[t] || {}, $o[t];
}
function Rf(s, t) {
  return function e(n) {
    return el(n, {
      delegateTarget: s
    }), e.oneOff && x.off(s, n.type, t), t.apply(s, [n]);
  };
}
function Df(s, t, e) {
  return function n(i) {
    const r = s.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const c of r)
        if (c === o)
          return el(i, {
            delegateTarget: o
          }), n.oneOff && x.off(s, i.type, t, e), e.apply(o, [i]);
  };
}
function Xu(s, t, e = null) {
  return Object.values(s).find((n) => n.callable === t && n.delegationSelector === e);
}
function Zu(s, t, e) {
  const n = typeof t == "string", i = n ? e : t || e;
  let r = Qu(s);
  return If.has(r) || (r = s), [n, i, r];
}
function Vl(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, c] = Zu(t, e, n);
  t in Ku && (o = ((_) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return _.call(this, E);
  })(o));
  const a = Yu(s), l = a[c] || (a[c] = {}), h = Xu(l, o, r ? e : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const p = Gu(o, t.replace(Lf, "")), g = r ? Df(s, e, o) : Rf(s, o);
  g.delegationSelector = r ? e : null, g.callable = o, g.oneOff = i, g.uidEvent = p, l[p] = g, s.addEventListener(c, g, r);
}
function da(s, t, e, n, i) {
  const r = Xu(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function $f(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && da(s, t, e, o.callable, o.delegationSelector);
}
function Qu(s) {
  return s = s.replace(kf, ""), Ku[s] || s;
}
const x = {
  on(s, t, e, n) {
    Vl(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    Vl(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = Zu(t, e, n), c = o !== t, a = Yu(s), l = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(l).length)
        return;
      da(s, a, o, r, i ? e : null);
      return;
    }
    if (h)
      for (const p of Object.keys(a))
        $f(s, a, p, t.slice(1));
    for (const [p, g] of Object.entries(l)) {
      const m = p.replace(xf, "");
      (!c || t.includes(m)) && da(s, a, o, g.callable, g.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = Wu(), i = Qu(t), r = t !== i;
    let o = null, c = !0, a = !0, l = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), c = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), l = o.isDefaultPrevented());
    const h = el(new Event(t, {
      bubbles: c,
      cancelable: !0
    }), e);
    return l && h.preventDefault(), a && s.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function el(s, t = {}) {
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
function Ul(s) {
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
function Mo(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const $e = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-bs-${Mo(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-bs-${Mo(t)}`);
  },
  getDataAttributes(s) {
    if (!s)
      return {};
    const t = {}, e = Object.keys(s.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of e) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Ul(s.dataset[n]);
    }
    return t;
  },
  getDataAttribute(s, t) {
    return Ul(s.getAttribute(`data-bs-${Mo(t)}`));
  }
};
class Ti {
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
    const n = De(e) ? $e.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...De(e) ? $e.getDataAttributes(e) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(e)) {
      const r = t[n], o = De(r) ? "element" : Nf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Mf = "5.3.3";
class re extends Ti {
  constructor(t, e) {
    super(), t = es(t), t && (this._element = t, this._config = this._getConfig(e), Ro.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Ro.remove(this._element, this.constructor.DATA_KEY), x.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, e, n = !0) {
    zu(t, e, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Ro.get(es(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
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
const qo = (s) => {
  let t = s.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let e = s.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t ? t.split(",").map((e) => Uu(e)).join(",") : null;
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
    const t = qo(s);
    return t && V.findOne(t) ? t : null;
  },
  getElementFromSelector(s) {
    const t = qo(s);
    return t ? V.findOne(t) : null;
  },
  getMultipleElementsFromSelector(s) {
    const t = qo(s);
    return t ? V.find(t) : [];
  }
}, Lr = (s, t = "hide") => {
  const e = `click.dismiss${s.EVENT_KEY}`, n = s.NAME;
  x.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), ss(this))
      return;
    const r = V.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, qf = "alert", Bf = "bs.alert", Ju = `.${Bf}`, Pf = `close${Ju}`, jf = `closed${Ju}`, Vf = "fade", Uf = "show";
class kr extends re {
  // Getters
  static get NAME() {
    return qf;
  }
  // Public
  close() {
    if (x.trigger(this._element, Pf).defaultPrevented)
      return;
    this._element.classList.remove(Uf);
    const e = this._element.classList.contains(Vf);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  // Private
  _destroyElement() {
    this._element.remove(), x.trigger(this._element, jf), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = kr.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Lr(kr, "close");
Gt(kr);
const Ff = "button", Hf = "bs.button", Wf = `.${Hf}`, zf = ".data-api", Kf = "active", Fl = '[data-bs-toggle="button"]', Gf = `click${Wf}${zf}`;
class xr extends re {
  // Getters
  static get NAME() {
    return Ff;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Kf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = xr.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
x.on(document, Gf, Fl, (s) => {
  s.preventDefault();
  const t = s.target.closest(Fl);
  xr.getOrCreateInstance(t).toggle();
});
Gt(xr);
const Yf = "swipe", In = ".bs.swipe", Xf = `touchstart${In}`, Zf = `touchmove${In}`, Qf = `touchend${In}`, Jf = `pointerdown${In}`, tp = `pointerup${In}`, ep = "touch", sp = "pen", np = "pointer-event", ip = 40, rp = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, op = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class br extends Ti {
  constructor(t, e) {
    super(), this._element = t, !(!t || !br.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return rp;
  }
  static get DefaultType() {
    return op;
  }
  static get NAME() {
    return Yf;
  }
  // Public
  dispose() {
    x.off(this._element, In);
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
    if (t <= ip)
      return;
    const e = t / this._deltaX;
    this._deltaX = 0, e && Lt(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (x.on(this._element, Jf, (t) => this._start(t)), x.on(this._element, tp, (t) => this._end(t)), this._element.classList.add(np)) : (x.on(this._element, Xf, (t) => this._start(t)), x.on(this._element, Zf, (t) => this._move(t)), x.on(this._element, Qf, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === sp || t.pointerType === ep);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const ap = "carousel", lp = "bs.carousel", os = `.${lp}`, th = ".data-api", cp = "ArrowLeft", up = "ArrowRight", hp = 500, Zn = "next", en = "prev", rn = "left", cr = "right", dp = `slide${os}`, Bo = `slid${os}`, fp = `keydown${os}`, pp = `mouseenter${os}`, gp = `mouseleave${os}`, mp = `dragstart${os}`, bp = `load${os}${th}`, yp = `click${os}${th}`, eh = "carousel", Xi = "active", vp = "slide", _p = "carousel-item-end", Ep = "carousel-item-start", wp = "carousel-item-next", Tp = "carousel-item-prev", sh = ".active", nh = ".carousel-item", Ap = sh + nh, Np = ".carousel-item img", Op = ".carousel-indicators", Cp = "[data-bs-slide], [data-bs-slide-to]", Sp = '[data-bs-ride="carousel"]', Lp = {
  [cp]: cr,
  [up]: rn
}, kp = {
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
class Ai extends re {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = V.findOne(Op, this._element), this._addEventListeners(), this._config.ride === eh && this.cycle();
  }
  // Getters
  static get Default() {
    return kp;
  }
  static get DefaultType() {
    return xp;
  }
  static get NAME() {
    return ap;
  }
  // Public
  next() {
    this._slide(Zn);
  }
  nextWhenVisible() {
    !document.hidden && xn(this._element) && this.next();
  }
  prev() {
    this._slide(en);
  }
  pause() {
    this._isSliding && Fu(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        x.one(this._element, Bo, () => this.cycle());
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
      x.one(this._element, Bo, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Zn : en;
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
    this._config.keyboard && x.on(this._element, fp, (t) => this._keydown(t)), this._config.pause === "hover" && (x.on(this._element, pp, () => this.pause()), x.on(this._element, gp, () => this._maybeEnableCycle())), this._config.touch && br.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of V.find(Np, this._element))
      x.on(n, mp, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(rn)),
      rightCallback: () => this._slide(this._directionToOrder(cr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), hp + this._config.interval));
      }
    };
    this._swipeHelper = new br(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = Lp[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const e = V.findOne(sh, this._indicatorsElement);
    e.classList.remove(Xi), e.removeAttribute("aria-current");
    const n = V.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Xi), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === Zn, r = e || tl(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), c = (m) => x.trigger(this._element, m, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (c(dp).defaultPrevented || !n || !r)
      return;
    const l = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? Ep : _p, p = i ? wp : Tp;
    r.classList.add(p), wi(r), n.classList.add(h), r.classList.add(h);
    const g = () => {
      r.classList.remove(h, p), r.classList.add(Xi), n.classList.remove(Xi, p, h), this._isSliding = !1, c(Bo);
    };
    this._queueCallback(g, n, this._isAnimated()), l && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(vp);
  }
  _getActive() {
    return V.findOne(Ap, this._element);
  }
  _getItems() {
    return V.find(nh, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return zt() ? t === rn ? en : Zn : t === rn ? Zn : en;
  }
  _orderToDirection(t) {
    return zt() ? t === en ? rn : cr : t === en ? cr : rn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Ai.getOrCreateInstance(this, t);
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
x.on(document, yp, Cp, function(s) {
  const t = V.getElementFromSelector(this);
  if (!t || !t.classList.contains(eh))
    return;
  s.preventDefault();
  const e = Ai.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    e.to(n), e._maybeEnableCycle();
    return;
  }
  if ($e.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
x.on(window, bp, () => {
  const s = V.find(Sp);
  for (const t of s)
    Ai.getOrCreateInstance(t);
});
Gt(Ai);
const Ip = "collapse", Rp = "bs.collapse", Ni = `.${Rp}`, Dp = ".data-api", $p = `show${Ni}`, Mp = `shown${Ni}`, qp = `hide${Ni}`, Bp = `hidden${Ni}`, Pp = `click${Ni}${Dp}`, Po = "show", pn = "collapse", Zi = "collapsing", jp = "collapsed", Vp = `:scope .${pn} .${pn}`, Up = "collapse-horizontal", Fp = "width", Hp = "height", Wp = ".collapse.show, .collapse.collapsing", fa = '[data-bs-toggle="collapse"]', zp = {
  parent: null,
  toggle: !0
}, Kp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class di extends re {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = V.find(fa);
    for (const i of n) {
      const r = V.getSelectorFromElement(i), o = V.find(r).filter((c) => c === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return zp;
  }
  static get DefaultType() {
    return Kp;
  }
  static get NAME() {
    return Ip;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(Wp).filter((c) => c !== this._element).map((c) => di.getOrCreateInstance(c, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || x.trigger(this._element, $p).defaultPrevented)
      return;
    for (const c of t)
      c.hide();
    const n = this._getDimension();
    this._element.classList.remove(pn), this._element.classList.add(Zi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Zi), this._element.classList.add(pn, Po), this._element.style[n] = "", x.trigger(this._element, Mp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || x.trigger(this._element, qp).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, wi(this._element), this._element.classList.add(Zi), this._element.classList.remove(pn, Po);
    for (const i of this._triggerArray) {
      const r = V.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Zi), this._element.classList.add(pn), x.trigger(this._element, Bp);
    };
    this._element.style[e] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Po);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = es(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(Up) ? Fp : Hp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(fa);
    for (const e of t) {
      const n = V.getElementFromSelector(e);
      n && this._addAriaAndCollapsedClass([e], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const e = V.find(Vp, this._config.parent);
    return V.find(t, this._config.parent).filter((n) => !e.includes(n));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(jp, !e), n.setAttribute("aria-expanded", e);
  }
  // Static
  static jQueryInterface(t) {
    const e = {};
    return typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1), this.each(function() {
      const n = di.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
x.on(document, Pp, fa, function(s) {
  (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
  for (const t of V.getMultipleElementsFromSelector(this))
    di.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Gt(di);
const Hl = "dropdown", Gp = "bs.dropdown", $s = `.${Gp}`, sl = ".data-api", Yp = "Escape", Wl = "Tab", Xp = "ArrowUp", zl = "ArrowDown", Zp = 2, Qp = `hide${$s}`, Jp = `hidden${$s}`, tg = `show${$s}`, eg = `shown${$s}`, ih = `click${$s}${sl}`, rh = `keydown${$s}${sl}`, sg = `keyup${$s}${sl}`, on = "show", ng = "dropup", ig = "dropend", rg = "dropstart", og = "dropup-center", ag = "dropdown-center", Os = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', lg = `${Os}.${on}`, ur = ".dropdown-menu", cg = ".navbar", ug = ".navbar-nav", hg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", dg = zt() ? "top-end" : "top-start", fg = zt() ? "top-start" : "top-end", pg = zt() ? "bottom-end" : "bottom-start", gg = zt() ? "bottom-start" : "bottom-end", mg = zt() ? "left-start" : "right-start", bg = zt() ? "right-start" : "left-start", yg = "top", vg = "bottom", _g = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, Eg = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class be extends re {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = V.next(this._element, ur)[0] || V.prev(this._element, ur)[0] || V.findOne(ur, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return _g;
  }
  static get DefaultType() {
    return Eg;
  }
  static get NAME() {
    return Hl;
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
    if (!x.trigger(this._element, tg, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(ug))
        for (const n of [].concat(...document.body.children))
          x.on(n, "mouseover", mr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(on), this._element.classList.add(on), x.trigger(this._element, eg, t);
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
    if (!x.trigger(this._element, Qp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          x.off(n, "mouseover", mr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(on), this._element.classList.remove(on), this._element.setAttribute("aria-expanded", "false"), $e.removeDataAttribute(this._menu, "popper"), x.trigger(this._element, Jp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !De(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Hl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Vu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : De(this._config.reference) ? t = es(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = Ja(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(on);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(ig))
      return mg;
    if (t.classList.contains(rg))
      return bg;
    if (t.classList.contains(og))
      return yg;
    if (t.classList.contains(ag))
      return vg;
    const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(ng) ? e ? fg : dg : e ? gg : pg;
  }
  _detectNavbar() {
    return this._element.closest(cg) !== null;
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
    return (this._inNavbar || this._config.display === "static") && ($e.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
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
    const n = V.find(hg, this._menu).filter((i) => xn(i));
    n.length && tl(n, e, t === zl, !n.includes(e)).focus();
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
    if (t.button === Zp || t.type === "keyup" && t.key !== Wl)
      return;
    const e = V.find(lg);
    for (const n of e) {
      const i = be.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === Wl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const c = {
        relatedTarget: i._element
      };
      t.type === "click" && (c.clickEvent = t), i._completeHide(c);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === Yp, i = [Xp, zl].includes(t.key);
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
x.on(document, rh, Os, be.dataApiKeydownHandler);
x.on(document, rh, ur, be.dataApiKeydownHandler);
x.on(document, ih, be.clearMenus);
x.on(document, sg, be.clearMenus);
x.on(document, ih, Os, function(s) {
  s.preventDefault(), be.getOrCreateInstance(this).toggle();
});
Gt(be);
const oh = "backdrop", wg = "fade", Kl = "show", Gl = `mousedown.bs.${oh}`, Tg = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, Ag = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class ah extends Ti {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return Tg;
  }
  static get DefaultType() {
    return Ag;
  }
  static get NAME() {
    return oh;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && wi(e), e.classList.add(Kl), this._emulateAnimation(() => {
      Lt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._getElement().classList.remove(Kl), this._emulateAnimation(() => {
      this.dispose(), Lt(t);
    });
  }
  dispose() {
    this._isAppended && (x.off(this._element, Gl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(wg), this._element = t;
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
    this._config.rootElement.append(t), x.on(t, Gl, () => {
      Lt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    zu(t, this._getElement(), this._config.isAnimated);
  }
}
const Ng = "focustrap", Og = "bs.focustrap", yr = `.${Og}`, Cg = `focusin${yr}`, Sg = `keydown.tab${yr}`, Lg = "Tab", kg = "forward", Yl = "backward", xg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Ig = {
  autofocus: "boolean",
  trapElement: "element"
};
class lh extends Ti {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return xg;
  }
  static get DefaultType() {
    return Ig;
  }
  static get NAME() {
    return Ng;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), x.off(document, yr), x.on(document, Cg, (t) => this._handleFocusin(t)), x.on(document, Sg, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, x.off(document, yr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: e
    } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target))
      return;
    const n = V.focusableChildren(e);
    n.length === 0 ? e.focus() : this._lastTabNavDirection === Yl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Lg && (this._lastTabNavDirection = t.shiftKey ? Yl : kg);
  }
}
const Xl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Zl = ".sticky-top", Qi = "padding-right", Ql = "margin-right";
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Qi, (e) => e + t), this._setElementAttributes(Xl, Qi, (e) => e + t), this._setElementAttributes(Zl, Ql, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Qi), this._resetElementAttributes(Xl, Qi), this._resetElementAttributes(Zl, Ql);
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
    n && $e.setDataAttribute(t, e, n);
  }
  _resetElementAttributes(t, e) {
    const n = (i) => {
      const r = $e.getDataAttribute(i, e);
      if (r === null) {
        i.style.removeProperty(e);
        return;
      }
      $e.removeDataAttribute(i, e), i.style.setProperty(e, r);
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
const Rg = "modal", Dg = "bs.modal", Kt = `.${Dg}`, $g = ".data-api", Mg = "Escape", qg = `hide${Kt}`, Bg = `hidePrevented${Kt}`, ch = `hidden${Kt}`, uh = `show${Kt}`, Pg = `shown${Kt}`, jg = `resize${Kt}`, Vg = `click.dismiss${Kt}`, Ug = `mousedown.dismiss${Kt}`, Fg = `keydown.dismiss${Kt}`, Hg = `click${Kt}${$g}`, Jl = "modal-open", Wg = "fade", tc = "show", jo = "modal-static", zg = ".modal.show", Kg = ".modal-dialog", Gg = ".modal-body", Yg = '[data-bs-toggle="modal"]', Xg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Zg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class xs extends re {
  constructor(t, e) {
    super(t, e), this._dialog = V.findOne(Kg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new pa(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Xg;
  }
  static get DefaultType() {
    return Zg;
  }
  static get NAME() {
    return Rg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || x.trigger(this._element, uh, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Jl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || x.trigger(this._element, qg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(tc), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    x.off(window, Kt), x.off(this._dialog, Kt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new ah({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new lh({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const e = V.findOne(Gg, this._dialog);
    e && (e.scrollTop = 0), wi(this._element), this._element.classList.add(tc);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, x.trigger(this._element, Pg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    x.on(this._element, Fg, (t) => {
      if (t.key === Mg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), x.on(window, jg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), x.on(this._element, Ug, (t) => {
      x.one(this._element, Vg, (e) => {
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
      document.body.classList.remove(Jl), this._resetAdjustments(), this._scrollBar.reset(), x.trigger(this._element, ch);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Wg);
  }
  _triggerBackdropTransition() {
    if (x.trigger(this._element, Bg).defaultPrevented)
      return;
    const e = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(jo) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(jo), this._queueCallback(() => {
      this._element.classList.remove(jo), this._queueCallback(() => {
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
      const n = xs.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](e);
      }
    });
  }
}
x.on(document, Hg, Yg, function(s) {
  const t = V.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), x.one(t, uh, (i) => {
    i.defaultPrevented || x.one(t, ch, () => {
      xn(this) && this.focus();
    });
  });
  const e = V.findOne(zg);
  e && xs.getInstance(e).hide(), xs.getOrCreateInstance(t).toggle(this);
});
Lr(xs);
Gt(xs);
const Qg = "offcanvas", Jg = "bs.offcanvas", je = `.${Jg}`, hh = ".data-api", tm = `load${je}${hh}`, em = "Escape", ec = "show", sc = "showing", nc = "hiding", sm = "offcanvas-backdrop", dh = ".offcanvas.show", nm = `show${je}`, im = `shown${je}`, rm = `hide${je}`, ic = `hidePrevented${je}`, fh = `hidden${je}`, om = `resize${je}`, am = `click${je}${hh}`, lm = `keydown.dismiss${je}`, cm = '[data-bs-toggle="offcanvas"]', um = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, hm = {
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
    return um;
  }
  static get DefaultType() {
    return hm;
  }
  static get NAME() {
    return Qg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || x.trigger(this._element, nm, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new pa().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(sc);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(ec), this._element.classList.remove(sc), x.trigger(this._element, im, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || x.trigger(this._element, rm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(nc), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(ec, nc), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new pa().reset(), x.trigger(this._element, fh);
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
        x.trigger(this._element, ic);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new ah({
      className: sm,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null
    });
  }
  _initializeFocusTrap() {
    return new lh({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    x.on(this._element, lm, (t) => {
      if (t.key === em) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        x.trigger(this._element, ic);
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
x.on(document, am, cm, function(s) {
  const t = V.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), ss(this))
    return;
  x.one(t, fh, () => {
    xn(this) && this.focus();
  });
  const e = V.findOne(dh);
  e && e !== t && ns.getInstance(e).hide(), ns.getOrCreateInstance(t).toggle(this);
});
x.on(window, tm, () => {
  for (const s of V.find(dh))
    ns.getOrCreateInstance(s).show();
});
x.on(window, om, () => {
  for (const s of V.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && ns.getOrCreateInstance(s).hide();
});
Lr(ns);
Gt(ns);
const dm = /^aria-[\w-]*$/i, ph = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", dm],
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
}, fm = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), pm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, gm = (s, t) => {
  const e = s.nodeName.toLowerCase();
  return t.includes(e) ? fm.has(e) ? !!pm.test(s.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(e));
};
function mm(s, t, e) {
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
      gm(h, l) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const bm = "TemplateFactory", ym = {
  allowList: ph,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, vm = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, _m = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class Em extends Ti {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return ym;
  }
  static get DefaultType() {
    return vm;
  }
  static get NAME() {
    return bm;
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
      }, _m);
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
    return this._config.sanitize ? mm(t, this._config.allowList, this._config.sanitizeFn) : t;
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
const wm = "tooltip", Tm = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Vo = "fade", Am = "modal", Ji = "show", Nm = ".tooltip-inner", rc = `.${Am}`, oc = "hide.bs.modal", Qn = "hover", Uo = "focus", Om = "click", Cm = "manual", Sm = "hide", Lm = "hidden", km = "show", xm = "shown", Im = "inserted", Rm = "click", Dm = "focusin", $m = "focusout", Mm = "mouseenter", qm = "mouseleave", Bm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: zt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: zt() ? "right" : "left"
}, Pm = {
  allowList: ph,
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
}, jm = {
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
let Ir = class gh extends re {
  constructor(t, e) {
    if (typeof Vu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Pm;
  }
  static get DefaultType() {
    return jm;
  }
  static get NAME() {
    return wm;
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
    clearTimeout(this._timeout), x.off(this._element.closest(rc), oc, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = x.trigger(this._element, this.constructor.eventName(km)), n = (Hu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), x.trigger(this._element, this.constructor.eventName(Im))), this._popper = this._createPopper(i), i.classList.add(Ji), "ontouchstart" in document.documentElement)
      for (const c of [].concat(...document.body.children))
        x.on(c, "mouseover", mr);
    const o = () => {
      x.trigger(this._element, this.constructor.eventName(xm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || x.trigger(this._element, this.constructor.eventName(Sm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Ji), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        x.off(i, "mouseover", mr);
    this._activeTrigger[Om] = !1, this._activeTrigger[Uo] = !1, this._activeTrigger[Qn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), x.trigger(this._element, this.constructor.eventName(Lm)));
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
    e.classList.remove(Vo, Ji), e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Of(this.constructor.NAME).toString();
    return e.setAttribute("id", n), this._isAnimated() && e.classList.add(Vo), e;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Em({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [Nm]: this._getTitle()
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
    return this._config.animation || this.tip && this.tip.classList.contains(Vo);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Ji);
  }
  _createPopper(t) {
    const e = Lt(this._config.placement, [this, t, this._element]), n = Bm[e.toUpperCase()];
    return Ja(this._element, t, this._getPopperConfig(n));
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
        x.on(this._element, this.constructor.eventName(Rm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (e !== Cm) {
        const n = e === Qn ? this.constructor.eventName(Mm) : this.constructor.eventName(Dm), i = e === Qn ? this.constructor.eventName(qm) : this.constructor.eventName($m);
        x.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Uo : Qn] = !0, o._enter();
        }), x.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Uo : Qn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, x.on(this._element.closest(rc), oc, this._hideModalHandler);
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
    const e = $e.getDataAttributes(this._element);
    for (const n of Object.keys(e))
      Tm.has(n) && delete e[n];
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
      const e = gh.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
};
Gt(Ir);
const Vm = "popover", Um = ".popover-header", Fm = ".popover-body", Hm = {
  ...Ir.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Wm = {
  ...Ir.DefaultType,
  content: "(null|string|element|function)"
};
class nl extends Ir {
  // Getters
  static get Default() {
    return Hm;
  }
  static get DefaultType() {
    return Wm;
  }
  static get NAME() {
    return Vm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Um]: this._getTitle(),
      [Fm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = nl.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
Gt(nl);
const zm = "scrollspy", Km = "bs.scrollspy", il = `.${Km}`, Gm = ".data-api", Ym = `activate${il}`, ac = `click${il}`, Xm = `load${il}${Gm}`, Zm = "dropdown-item", sn = "active", Qm = '[data-bs-spy="scroll"]', Fo = "[href]", Jm = ".nav, .list-group", lc = ".nav-link", tb = ".nav-item", eb = ".list-group-item", sb = `${lc}, ${tb} > ${lc}, ${eb}`, nb = ".dropdown", ib = ".dropdown-toggle", rb = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, ob = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Rr extends re {
  constructor(t, e) {
    super(t, e), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return rb;
  }
  static get DefaultType() {
    return ob;
  }
  static get NAME() {
    return zm;
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
    this._config.smoothScroll && (x.off(this._config.target, ac), x.on(this._config.target, ac, Fo, (t) => {
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
    const t = V.find(Fo, this._config.target);
    for (const e of t) {
      if (!e.hash || ss(e))
        continue;
      const n = V.findOne(decodeURI(e.hash), this._element);
      xn(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(sn), this._activateParents(t), x.trigger(this._element, Ym, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Zm)) {
      V.findOne(ib, t.closest(nb)).classList.add(sn);
      return;
    }
    for (const e of V.parents(t, Jm))
      for (const n of V.prev(e, sb))
        n.classList.add(sn);
  }
  _clearActiveClass(t) {
    t.classList.remove(sn);
    const e = V.find(`${Fo}.${sn}`, t);
    for (const n of e)
      n.classList.remove(sn);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Rr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
x.on(window, Xm, () => {
  for (const s of V.find(Qm))
    Rr.getOrCreateInstance(s);
});
Gt(Rr);
const ab = "tab", lb = "bs.tab", Ms = `.${lb}`, cb = `hide${Ms}`, ub = `hidden${Ms}`, hb = `show${Ms}`, db = `shown${Ms}`, fb = `click${Ms}`, pb = `keydown${Ms}`, gb = `load${Ms}`, mb = "ArrowLeft", cc = "ArrowRight", bb = "ArrowUp", uc = "ArrowDown", Ho = "Home", hc = "End", Cs = "active", dc = "fade", Wo = "show", yb = "dropdown", mh = ".dropdown-toggle", vb = ".dropdown-menu", zo = `:not(${mh})`, _b = '.list-group, .nav, [role="tablist"]', Eb = ".nav-item, .list-group-item", wb = `.nav-link${zo}, .list-group-item${zo}, [role="tab"]${zo}`, bh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Ko = `${wb}, ${bh}`, Tb = `.${Cs}[data-bs-toggle="tab"], .${Cs}[data-bs-toggle="pill"], .${Cs}[data-bs-toggle="list"]`;
class An extends re {
  constructor(t) {
    super(t), this._parent = this._element.closest(_b), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), x.on(this._element, pb, (e) => this._keydown(e)));
  }
  // Getters
  static get NAME() {
    return ab;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const e = this._getActiveElem(), n = e ? x.trigger(e, cb, {
      relatedTarget: t
    }) : null;
    x.trigger(t, hb, {
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
        t.classList.add(Wo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), x.trigger(t, db, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(dc));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(Cs), t.blur(), this._deactivate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Wo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), x.trigger(t, ub, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(dc));
  }
  _keydown(t) {
    if (![mb, cc, bb, uc, Ho, hc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !ss(i));
    let n;
    if ([Ho, hc].includes(t.key))
      n = e[t.key === Ho ? 0 : e.length - 1];
    else {
      const i = [cc, uc].includes(t.key);
      n = tl(e, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), An.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return V.find(Ko, this._parent);
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
    if (!n.classList.contains(yb))
      return;
    const i = (r, o) => {
      const c = V.findOne(r, n);
      c && c.classList.toggle(o, e);
    };
    i(mh, Cs), i(vb, Wo), n.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, n) {
    t.hasAttribute(e) || t.setAttribute(e, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Cs);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Ko) ? t : V.findOne(Ko, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(Eb) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = An.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
x.on(document, fb, bh, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !ss(this) && An.getOrCreateInstance(this).show();
});
x.on(window, gb, () => {
  for (const s of V.find(Tb))
    An.getOrCreateInstance(s);
});
Gt(An);
const Ab = "toast", Nb = "bs.toast", as = `.${Nb}`, Ob = `mouseover${as}`, Cb = `mouseout${as}`, Sb = `focusin${as}`, Lb = `focusout${as}`, kb = `hide${as}`, xb = `hidden${as}`, Ib = `show${as}`, Rb = `shown${as}`, Db = "fade", fc = "hide", tr = "show", er = "showing", $b = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Mb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Dr extends re {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Mb;
  }
  static get DefaultType() {
    return $b;
  }
  static get NAME() {
    return Ab;
  }
  // Public
  show() {
    if (x.trigger(this._element, Ib).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(Db);
    const e = () => {
      this._element.classList.remove(er), x.trigger(this._element, Rb), this._maybeScheduleHide();
    };
    this._element.classList.remove(fc), wi(this._element), this._element.classList.add(tr, er), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || x.trigger(this._element, kb).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(fc), this._element.classList.remove(er, tr), x.trigger(this._element, xb);
    };
    this._element.classList.add(er), this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(tr), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(tr);
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
    x.on(this._element, Ob, (t) => this._onInteraction(t, !0)), x.on(this._element, Cb, (t) => this._onInteraction(t, !1)), x.on(this._element, Sb, (t) => this._onInteraction(t, !0)), x.on(this._element, Lb, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Dr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Lr(Dr);
Gt(Dr);
function qb(s) {
  return { all: s = s || /* @__PURE__ */ new Map(), on: function(t, e) {
    var n = s.get(t);
    n ? n.push(e) : s.set(t, [e]);
  }, off: function(t, e) {
    var n = s.get(t);
    n && (e ? n.splice(n.indexOf(e) >>> 0, 1) : s.set(t, []));
  }, emit: function(t, e) {
    var n = s.get(t);
    n && n.slice().map(function(i) {
      i(e);
    }), (n = s.get("*")) && n.slice().map(function(i) {
      i(t, e);
    });
  } };
}
function $r(s, t) {
  for (const e in t)
    t[e] instanceof Object && e in s && Object.assign(t[e], $r(s[e], t[e]));
  return Object.assign(s || {}, t);
}
function yh(s, t, e, n) {
  try {
    return typeof s == "function" ? s(t, e, n) : s;
  } catch {
    return null;
  }
}
async function si(s) {
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
function ni(s, t) {
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
function Bb(s) {
  let t = [];
  for (let e of s)
    t.push(vr(e));
  return t;
}
function vr(s, t = "", e = {}) {
  for (let n in s) {
    let i = t ? t + "." + n : n;
    typeof s[n] == "object" && !Array.isArray(s[n]) ? vr(s[n], i, e) : e[i] = s[n];
  }
  return e;
}
function Pb(s) {
  let t = {};
  for (let e in s) {
    let n = e.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? s[e] : {} : []), t);
  }
  return t;
}
function Mr(s, t, e, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (c, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][s] ? i(s, e) : i(t[n][s]);
}
function jb(s, t, e = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(e), i = s.map(
    (r) => t.map((o) => {
      let c = r[o.name];
      return o.template ? o.template(c, r, s) : c !== void 0 ? c : "";
    }).join(e)
  );
  return [n, ...i].join(`
`);
}
function Vb(s, t = "export.csv") {
  s = "\uFEFF" + s;
  const e = new Blob([s], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(e), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function Ub(s) {
  return [...new Set(s)];
}
function Fb(s, t) {
  s.indexOf(t) >= 0 ? s.splice(s.indexOf(t), 1) : s.push(t);
}
function Hb(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 && s.push(e.value);
}
function Wb(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 ? s.push(e.value) : s.splice(s.indexOf(e.value), 1);
}
function zb(s) {
  s.length = 0;
}
function Kb(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
function Gb(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
function Yb(s, t) {
  Object.keys(s).forEach((e) => {
    typeof s[e] == "function" && (s[e] = s[e](t));
  });
}
var vh = typeof global == "object" && global && global.Object === Object && global, Xb = typeof self == "object" && self && self.Object === Object && self, Te = vh || Xb || Function("return this")(), is = Te.Symbol, _h = Object.prototype, Zb = _h.hasOwnProperty, Qb = _h.toString, ti = is ? is.toStringTag : void 0;
function Jb(s) {
  var t = Zb.call(s, ti), e = s[ti];
  try {
    s[ti] = void 0;
    var n = !0;
  } catch {
  }
  var i = Qb.call(s);
  return n && (t ? s[ti] = e : delete s[ti]), i;
}
var t1 = Object.prototype, e1 = t1.toString;
function s1(s) {
  return e1.call(s);
}
var n1 = "[object Null]", i1 = "[object Undefined]", pc = is ? is.toStringTag : void 0;
function Rn(s) {
  return s == null ? s === void 0 ? i1 : n1 : pc && pc in Object(s) ? Jb(s) : s1(s);
}
function qe(s) {
  return s != null && typeof s == "object";
}
var Is = Array.isArray;
function ls(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function Eh(s) {
  return s;
}
var r1 = "[object AsyncFunction]", o1 = "[object Function]", a1 = "[object GeneratorFunction]", l1 = "[object Proxy]";
function rl(s) {
  if (!ls(s))
    return !1;
  var t = Rn(s);
  return t == o1 || t == a1 || t == r1 || t == l1;
}
var Go = Te["__core-js_shared__"], gc = function() {
  var s = /[^.]+$/.exec(Go && Go.keys && Go.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function c1(s) {
  return !!gc && gc in s;
}
var u1 = Function.prototype, h1 = u1.toString;
function qs(s) {
  if (s != null) {
    try {
      return h1.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
var d1 = /[\\^$.*+?()[\]{}|]/g, f1 = /^\[object .+?Constructor\]$/, p1 = Function.prototype, g1 = Object.prototype, m1 = p1.toString, b1 = g1.hasOwnProperty, y1 = RegExp(
  "^" + m1.call(b1).replace(d1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function v1(s) {
  if (!ls(s) || c1(s))
    return !1;
  var t = rl(s) ? y1 : f1;
  return t.test(qs(s));
}
function _1(s, t) {
  return s == null ? void 0 : s[t];
}
function Bs(s, t) {
  var e = _1(s, t);
  return v1(e) ? e : void 0;
}
var ga = Bs(Te, "WeakMap"), mc = Object.create, E1 = /* @__PURE__ */ function() {
  function s() {
  }
  return function(t) {
    if (!ls(t))
      return {};
    if (mc)
      return mc(t);
    s.prototype = t;
    var e = new s();
    return s.prototype = void 0, e;
  };
}();
function w1(s, t, e) {
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
function wh(s, t) {
  var e = -1, n = s.length;
  for (t || (t = Array(n)); ++e < n; )
    t[e] = s[e];
  return t;
}
var T1 = 800, A1 = 16, N1 = Date.now;
function O1(s) {
  var t = 0, e = 0;
  return function() {
    var n = N1(), i = A1 - (n - e);
    if (e = n, i > 0) {
      if (++t >= T1)
        return arguments[0];
    } else
      t = 0;
    return s.apply(void 0, arguments);
  };
}
function C1(s) {
  return function() {
    return s;
  };
}
var _r = function() {
  try {
    var s = Bs(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
}(), S1 = _r ? function(s, t) {
  return _r(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: C1(t),
    writable: !0
  });
} : Eh, L1 = O1(S1);
function k1(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var x1 = 9007199254740991, I1 = /^(?:0|[1-9]\d*)$/;
function Th(s, t) {
  var e = typeof s;
  return t = t ?? x1, !!t && (e == "number" || e != "symbol" && I1.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
function ol(s, t, e) {
  t == "__proto__" && _r ? _r(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
function Oi(s, t) {
  return s === t || s !== s && t !== t;
}
var R1 = Object.prototype, D1 = R1.hasOwnProperty;
function Ah(s, t, e) {
  var n = s[t];
  (!(D1.call(s, t) && Oi(n, e)) || e === void 0 && !(t in s)) && ol(s, t, e);
}
function Ci(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var c = t[r], a = void 0;
    a === void 0 && (a = s[c]), i ? ol(e, c, a) : Ah(e, c, a);
  }
  return e;
}
var bc = Math.max;
function $1(s, t, e) {
  return t = bc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = bc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var c = Array(t + 1); ++i < t; )
      c[i] = n[i];
    return c[t] = e(o), w1(s, this, c);
  };
}
function M1(s, t) {
  return L1($1(s, t, Eh), s + "");
}
var q1 = 9007199254740991;
function Nh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= q1;
}
function qr(s) {
  return s != null && Nh(s.length) && !rl(s);
}
function B1(s, t, e) {
  if (!ls(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? qr(e) && Th(t, e.length) : n == "string" && t in e) ? Oi(e[t], s) : !1;
}
function P1(s) {
  return M1(function(t, e) {
    var n = -1, i = e.length, r = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (r = s.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && B1(e[0], e[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var c = e[n];
      c && s(t, c, n, r);
    }
    return t;
  });
}
var j1 = Object.prototype;
function al(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || j1;
  return s === e;
}
function V1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var U1 = "[object Arguments]";
function yc(s) {
  return qe(s) && Rn(s) == U1;
}
var Oh = Object.prototype, F1 = Oh.hasOwnProperty, H1 = Oh.propertyIsEnumerable, ma = yc(/* @__PURE__ */ function() {
  return arguments;
}()) ? yc : function(s) {
  return qe(s) && F1.call(s, "callee") && !H1.call(s, "callee");
};
function W1() {
  return !1;
}
var Ch = typeof exports == "object" && exports && !exports.nodeType && exports, vc = Ch && typeof module == "object" && module && !module.nodeType && module, z1 = vc && vc.exports === Ch, _c = z1 ? Te.Buffer : void 0, K1 = _c ? _c.isBuffer : void 0, fi = K1 || W1, G1 = "[object Arguments]", Y1 = "[object Array]", X1 = "[object Boolean]", Z1 = "[object Date]", Q1 = "[object Error]", J1 = "[object Function]", ty = "[object Map]", ey = "[object Number]", sy = "[object Object]", ny = "[object RegExp]", iy = "[object Set]", ry = "[object String]", oy = "[object WeakMap]", ay = "[object ArrayBuffer]", ly = "[object DataView]", cy = "[object Float32Array]", uy = "[object Float64Array]", hy = "[object Int8Array]", dy = "[object Int16Array]", fy = "[object Int32Array]", py = "[object Uint8Array]", gy = "[object Uint8ClampedArray]", my = "[object Uint16Array]", by = "[object Uint32Array]", st = {};
st[cy] = st[uy] = st[hy] = st[dy] = st[fy] = st[py] = st[gy] = st[my] = st[by] = !0;
st[G1] = st[Y1] = st[ay] = st[X1] = st[ly] = st[Z1] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = st[ny] = st[iy] = st[ry] = st[oy] = !1;
function yy(s) {
  return qe(s) && Nh(s.length) && !!st[Rn(s)];
}
function ll(s) {
  return function(t) {
    return s(t);
  };
}
var Sh = typeof exports == "object" && exports && !exports.nodeType && exports, li = Sh && typeof module == "object" && module && !module.nodeType && module, vy = li && li.exports === Sh, Yo = vy && vh.process, Nn = function() {
  try {
    var s = li && li.require && li.require("util").types;
    return s || Yo && Yo.binding && Yo.binding("util");
  } catch {
  }
}(), Ec = Nn && Nn.isTypedArray, cl = Ec ? ll(Ec) : yy, _y = Object.prototype, Ey = _y.hasOwnProperty;
function Lh(s, t) {
  var e = Is(s), n = !e && ma(s), i = !e && !n && fi(s), r = !e && !n && !i && cl(s), o = e || n || i || r, c = o ? V1(s.length, String) : [], a = c.length;
  for (var l in s)
    (t || Ey.call(s, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Th(l, a))) && c.push(l);
  return c;
}
function kh(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var wy = kh(Object.keys, Object), Ty = Object.prototype, Ay = Ty.hasOwnProperty;
function Ny(s) {
  if (!al(s))
    return wy(s);
  var t = [];
  for (var e in Object(s))
    Ay.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function ul(s) {
  return qr(s) ? Lh(s) : Ny(s);
}
function Oy(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
var Cy = Object.prototype, Sy = Cy.hasOwnProperty;
function Ly(s) {
  if (!ls(s))
    return Oy(s);
  var t = al(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !Sy.call(s, n)) || e.push(n);
  return e;
}
function Si(s) {
  return qr(s) ? Lh(s, !0) : Ly(s);
}
var pi = Bs(Object, "create");
function ky() {
  this.__data__ = pi ? pi(null) : {}, this.size = 0;
}
function xy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var Iy = "__lodash_hash_undefined__", Ry = Object.prototype, Dy = Ry.hasOwnProperty;
function $y(s) {
  var t = this.__data__;
  if (pi) {
    var e = t[s];
    return e === Iy ? void 0 : e;
  }
  return Dy.call(t, s) ? t[s] : void 0;
}
var My = Object.prototype, qy = My.hasOwnProperty;
function By(s) {
  var t = this.__data__;
  return pi ? t[s] !== void 0 : qy.call(t, s);
}
var Py = "__lodash_hash_undefined__";
function jy(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = pi && t === void 0 ? Py : t, this;
}
function Rs(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Rs.prototype.clear = ky;
Rs.prototype.delete = xy;
Rs.prototype.get = $y;
Rs.prototype.has = By;
Rs.prototype.set = jy;
function Vy() {
  this.__data__ = [], this.size = 0;
}
function Br(s, t) {
  for (var e = s.length; e--; )
    if (Oi(s[e][0], t))
      return e;
  return -1;
}
var Uy = Array.prototype, Fy = Uy.splice;
function Hy(s) {
  var t = this.__data__, e = Br(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : Fy.call(t, e, 1), --this.size, !0;
}
function Wy(s) {
  var t = this.__data__, e = Br(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function zy(s) {
  return Br(this.__data__, s) > -1;
}
function Ky(s, t) {
  var e = this.__data__, n = Br(e, s);
  return n < 0 ? (++this.size, e.push([s, t])) : e[n][1] = t, this;
}
function Ve(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Ve.prototype.clear = Vy;
Ve.prototype.delete = Hy;
Ve.prototype.get = Wy;
Ve.prototype.has = zy;
Ve.prototype.set = Ky;
var gi = Bs(Te, "Map");
function Gy() {
  this.size = 0, this.__data__ = {
    hash: new Rs(),
    map: new (gi || Ve)(),
    string: new Rs()
  };
}
function Yy(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Pr(s, t) {
  var e = s.__data__;
  return Yy(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function Xy(s) {
  var t = Pr(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function Zy(s) {
  return Pr(this, s).get(s);
}
function Qy(s) {
  return Pr(this, s).has(s);
}
function Jy(s, t) {
  var e = Pr(this, s), n = e.size;
  return e.set(s, t), this.size += e.size == n ? 0 : 1, this;
}
function Ps(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Ps.prototype.clear = Gy;
Ps.prototype.delete = Xy;
Ps.prototype.get = Zy;
Ps.prototype.has = Qy;
Ps.prototype.set = Jy;
function xh(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var hl = kh(Object.getPrototypeOf, Object), tv = "[object Object]", ev = Function.prototype, sv = Object.prototype, Ih = ev.toString, nv = sv.hasOwnProperty, iv = Ih.call(Object);
function rv(s) {
  if (!qe(s) || Rn(s) != tv)
    return !1;
  var t = hl(s);
  if (t === null)
    return !0;
  var e = nv.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && Ih.call(e) == iv;
}
function ov() {
  this.__data__ = new Ve(), this.size = 0;
}
function av(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function lv(s) {
  return this.__data__.get(s);
}
function cv(s) {
  return this.__data__.has(s);
}
var uv = 200;
function hv(s, t) {
  var e = this.__data__;
  if (e instanceof Ve) {
    var n = e.__data__;
    if (!gi || n.length < uv - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new Ps(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function ye(s) {
  var t = this.__data__ = new Ve(s);
  this.size = t.size;
}
ye.prototype.clear = ov;
ye.prototype.delete = av;
ye.prototype.get = lv;
ye.prototype.has = cv;
ye.prototype.set = hv;
function dv(s, t) {
  return s && Ci(t, ul(t), s);
}
function fv(s, t) {
  return s && Ci(t, Si(t), s);
}
var Rh = typeof exports == "object" && exports && !exports.nodeType && exports, wc = Rh && typeof module == "object" && module && !module.nodeType && module, pv = wc && wc.exports === Rh, Tc = pv ? Te.Buffer : void 0, Ac = Tc ? Tc.allocUnsafe : void 0;
function Dh(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = Ac ? Ac(e) : new s.constructor(e);
  return s.copy(n), n;
}
function gv(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function $h() {
  return [];
}
var mv = Object.prototype, bv = mv.propertyIsEnumerable, Nc = Object.getOwnPropertySymbols, dl = Nc ? function(s) {
  return s == null ? [] : (s = Object(s), gv(Nc(s), function(t) {
    return bv.call(s, t);
  }));
} : $h;
function yv(s, t) {
  return Ci(s, dl(s), t);
}
var vv = Object.getOwnPropertySymbols, Mh = vv ? function(s) {
  for (var t = []; s; )
    xh(t, dl(s)), s = hl(s);
  return t;
} : $h;
function _v(s, t) {
  return Ci(s, Mh(s), t);
}
function qh(s, t, e) {
  var n = t(s);
  return Is(s) ? n : xh(n, e(s));
}
function ba(s) {
  return qh(s, ul, dl);
}
function Ev(s) {
  return qh(s, Si, Mh);
}
var ya = Bs(Te, "DataView"), va = Bs(Te, "Promise"), _a = Bs(Te, "Set"), Oc = "[object Map]", wv = "[object Object]", Cc = "[object Promise]", Sc = "[object Set]", Lc = "[object WeakMap]", kc = "[object DataView]", Tv = qs(ya), Av = qs(gi), Nv = qs(va), Ov = qs(_a), Cv = qs(ga), ee = Rn;
(ya && ee(new ya(new ArrayBuffer(1))) != kc || gi && ee(new gi()) != Oc || va && ee(va.resolve()) != Cc || _a && ee(new _a()) != Sc || ga && ee(new ga()) != Lc) && (ee = function(s) {
  var t = Rn(s), e = t == wv ? s.constructor : void 0, n = e ? qs(e) : "";
  if (n)
    switch (n) {
      case Tv:
        return kc;
      case Av:
        return Oc;
      case Nv:
        return Cc;
      case Ov:
        return Sc;
      case Cv:
        return Lc;
    }
  return t;
});
var Sv = Object.prototype, Lv = Sv.hasOwnProperty;
function kv(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && Lv.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var Er = Te.Uint8Array;
function fl(s) {
  var t = new s.constructor(s.byteLength);
  return new Er(t).set(new Er(s)), t;
}
function xv(s, t) {
  var e = t ? fl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var Iv = /\w*$/;
function Rv(s) {
  var t = new s.constructor(s.source, Iv.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var xc = is ? is.prototype : void 0, Ic = xc ? xc.valueOf : void 0;
function Dv(s) {
  return Ic ? Object(Ic.call(s)) : {};
}
function Bh(s, t) {
  var e = t ? fl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var $v = "[object Boolean]", Mv = "[object Date]", qv = "[object Map]", Bv = "[object Number]", Pv = "[object RegExp]", jv = "[object Set]", Vv = "[object String]", Uv = "[object Symbol]", Fv = "[object ArrayBuffer]", Hv = "[object DataView]", Wv = "[object Float32Array]", zv = "[object Float64Array]", Kv = "[object Int8Array]", Gv = "[object Int16Array]", Yv = "[object Int32Array]", Xv = "[object Uint8Array]", Zv = "[object Uint8ClampedArray]", Qv = "[object Uint16Array]", Jv = "[object Uint32Array]";
function t0(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case Fv:
      return fl(s);
    case $v:
    case Mv:
      return new n(+s);
    case Hv:
      return xv(s, e);
    case Wv:
    case zv:
    case Kv:
    case Gv:
    case Yv:
    case Xv:
    case Zv:
    case Qv:
    case Jv:
      return Bh(s, e);
    case qv:
      return new n();
    case Bv:
    case Vv:
      return new n(s);
    case Pv:
      return Rv(s);
    case jv:
      return new n();
    case Uv:
      return Dv(s);
  }
}
function Ph(s) {
  return typeof s.constructor == "function" && !al(s) ? E1(hl(s)) : {};
}
var e0 = "[object Map]";
function s0(s) {
  return qe(s) && ee(s) == e0;
}
var Rc = Nn && Nn.isMap, n0 = Rc ? ll(Rc) : s0, i0 = "[object Set]";
function r0(s) {
  return qe(s) && ee(s) == i0;
}
var Dc = Nn && Nn.isSet, o0 = Dc ? ll(Dc) : r0, a0 = 1, l0 = 2, c0 = 4, jh = "[object Arguments]", u0 = "[object Array]", h0 = "[object Boolean]", d0 = "[object Date]", f0 = "[object Error]", Vh = "[object Function]", p0 = "[object GeneratorFunction]", g0 = "[object Map]", m0 = "[object Number]", Uh = "[object Object]", b0 = "[object RegExp]", y0 = "[object Set]", v0 = "[object String]", _0 = "[object Symbol]", E0 = "[object WeakMap]", w0 = "[object ArrayBuffer]", T0 = "[object DataView]", A0 = "[object Float32Array]", N0 = "[object Float64Array]", O0 = "[object Int8Array]", C0 = "[object Int16Array]", S0 = "[object Int32Array]", L0 = "[object Uint8Array]", k0 = "[object Uint8ClampedArray]", x0 = "[object Uint16Array]", I0 = "[object Uint32Array]", et = {};
et[jh] = et[u0] = et[w0] = et[T0] = et[h0] = et[d0] = et[A0] = et[N0] = et[O0] = et[C0] = et[S0] = et[g0] = et[m0] = et[Uh] = et[b0] = et[y0] = et[v0] = et[_0] = et[L0] = et[k0] = et[x0] = et[I0] = !0;
et[f0] = et[Vh] = et[E0] = !1;
function hr(s, t, e, n, i, r) {
  var o, c = t & a0, a = t & l0, l = t & c0;
  if (o !== void 0)
    return o;
  if (!ls(s))
    return s;
  var h = Is(s);
  if (h) {
    if (o = kv(s), !c)
      return wh(s, o);
  } else {
    var p = ee(s), g = p == Vh || p == p0;
    if (fi(s))
      return Dh(s, c);
    if (p == Uh || p == jh || g && !i) {
      if (o = a || g ? {} : Ph(s), !c)
        return a ? _v(s, fv(o, s)) : yv(s, dv(o, s));
    } else {
      if (!et[p])
        return i ? s : {};
      o = t0(s, p, c);
    }
  }
  r || (r = new ye());
  var m = r.get(s);
  if (m)
    return m;
  r.set(s, o), o0(s) ? s.forEach(function(w) {
    o.add(hr(w, t, e, w, s, r));
  }) : n0(s) && s.forEach(function(w, T) {
    o.set(T, hr(w, t, e, T, s, r));
  });
  var _ = l ? a ? Ev : ba : a ? Si : ul, E = h ? void 0 : _(s);
  return k1(E || s, function(w, T) {
    E && (T = w, w = s[T]), Ah(o, T, hr(w, t, e, T, s, r));
  }), o;
}
var R0 = 1, D0 = 4;
function gn(s) {
  return hr(s, R0 | D0);
}
var $0 = "__lodash_hash_undefined__";
function M0(s) {
  return this.__data__.set(s, $0), this;
}
function q0(s) {
  return this.__data__.has(s);
}
function wr(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new Ps(); ++t < e; )
    this.add(s[t]);
}
wr.prototype.add = wr.prototype.push = M0;
wr.prototype.has = q0;
function B0(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n; )
    if (t(s[e], e, s))
      return !0;
  return !1;
}
function P0(s, t) {
  return s.has(t);
}
var j0 = 1, V0 = 2;
function Fh(s, t, e, n, i, r) {
  var o = e & j0, c = s.length, a = t.length;
  if (c != a && !(o && a > c))
    return !1;
  var l = r.get(s), h = r.get(t);
  if (l && h)
    return l == t && h == s;
  var p = -1, g = !0, m = e & V0 ? new wr() : void 0;
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
      if (!B0(t, function(T, C) {
        if (!P0(m, C) && (_ === T || i(_, T, e, n, r)))
          return m.push(C);
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
function U0(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n, i) {
    e[++t] = [i, n];
  }), e;
}
function F0(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n) {
    e[++t] = n;
  }), e;
}
var H0 = 1, W0 = 2, z0 = "[object Boolean]", K0 = "[object Date]", G0 = "[object Error]", Y0 = "[object Map]", X0 = "[object Number]", Z0 = "[object RegExp]", Q0 = "[object Set]", J0 = "[object String]", t_ = "[object Symbol]", e_ = "[object ArrayBuffer]", s_ = "[object DataView]", $c = is ? is.prototype : void 0, Xo = $c ? $c.valueOf : void 0;
function n_(s, t, e, n, i, r, o) {
  switch (e) {
    case s_:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case e_:
      return !(s.byteLength != t.byteLength || !r(new Er(s), new Er(t)));
    case z0:
    case K0:
    case X0:
      return Oi(+s, +t);
    case G0:
      return s.name == t.name && s.message == t.message;
    case Z0:
    case J0:
      return s == t + "";
    case Y0:
      var c = U0;
    case Q0:
      var a = n & H0;
      if (c || (c = F0), s.size != t.size && !a)
        return !1;
      var l = o.get(s);
      if (l)
        return l == t;
      n |= W0, o.set(s, t);
      var h = Fh(c(s), c(t), n, i, r, o);
      return o.delete(s), h;
    case t_:
      if (Xo)
        return Xo.call(s) == Xo.call(t);
  }
  return !1;
}
var i_ = 1, r_ = Object.prototype, o_ = r_.hasOwnProperty;
function a_(s, t, e, n, i, r) {
  var o = e & i_, c = ba(s), a = c.length, l = ba(t), h = l.length;
  if (a != h && !o)
    return !1;
  for (var p = a; p--; ) {
    var g = c[p];
    if (!(o ? g in t : o_.call(t, g)))
      return !1;
  }
  var m = r.get(s), _ = r.get(t);
  if (m && _)
    return m == t && _ == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var w = o; ++p < a; ) {
    g = c[p];
    var T = s[g], C = t[g];
    if (n)
      var L = o ? n(C, T, g, t, s, r) : n(T, C, g, s, t, r);
    if (!(L === void 0 ? T === C || i(T, C, e, n, r) : L)) {
      E = !1;
      break;
    }
    w || (w = g == "constructor");
  }
  if (E && !w) {
    var k = s.constructor, I = t.constructor;
    k != I && "constructor" in s && "constructor" in t && !(typeof k == "function" && k instanceof k && typeof I == "function" && I instanceof I) && (E = !1);
  }
  return r.delete(s), r.delete(t), E;
}
var l_ = 1, Mc = "[object Arguments]", qc = "[object Array]", sr = "[object Object]", c_ = Object.prototype, Bc = c_.hasOwnProperty;
function u_(s, t, e, n, i, r) {
  var o = Is(s), c = Is(t), a = o ? qc : ee(s), l = c ? qc : ee(t);
  a = a == Mc ? sr : a, l = l == Mc ? sr : l;
  var h = a == sr, p = l == sr, g = a == l;
  if (g && fi(s)) {
    if (!fi(t))
      return !1;
    o = !0, h = !1;
  }
  if (g && !h)
    return r || (r = new ye()), o || cl(s) ? Fh(s, t, e, n, i, r) : n_(s, t, a, e, n, i, r);
  if (!(e & l_)) {
    var m = h && Bc.call(s, "__wrapped__"), _ = p && Bc.call(t, "__wrapped__");
    if (m || _) {
      var E = m ? s.value() : s, w = _ ? t.value() : t;
      return r || (r = new ye()), i(E, w, e, n, r);
    }
  }
  return g ? (r || (r = new ye()), a_(s, t, e, n, i, r)) : !1;
}
function Hh(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !qe(s) && !qe(t) ? s !== s && t !== t : u_(s, t, e, n, Hh, i);
}
function h_(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), c = o.length; c--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var d_ = h_();
function Ea(s, t, e) {
  (e !== void 0 && !Oi(s[t], e) || e === void 0 && !(t in s)) && ol(s, t, e);
}
function f_(s) {
  return qe(s) && qr(s);
}
function wa(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function p_(s) {
  return Ci(s, Si(s));
}
function g_(s, t, e, n, i, r, o) {
  var c = wa(s, e), a = wa(t, e), l = o.get(a);
  if (l) {
    Ea(s, e, l);
    return;
  }
  var h = r ? r(c, a, e + "", s, t, o) : void 0, p = h === void 0;
  if (p) {
    var g = Is(a), m = !g && fi(a), _ = !g && !m && cl(a);
    h = a, g || m || _ ? Is(c) ? h = c : f_(c) ? h = wh(c) : m ? (p = !1, h = Dh(a, !0)) : _ ? (p = !1, h = Bh(a, !0)) : h = [] : rv(a) || ma(a) ? (h = c, ma(c) ? h = p_(c) : (!ls(c) || rl(c)) && (h = Ph(a))) : p = !1;
  }
  p && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), Ea(s, e, h);
}
function Wh(s, t, e, n, i) {
  s !== t && d_(t, function(r, o) {
    if (i || (i = new ye()), ls(r))
      g_(s, t, o, e, Wh, n, i);
    else {
      var c = n ? n(wa(s, o), r, o + "", s, t, i) : void 0;
      c === void 0 && (c = r), Ea(s, o, c);
    }
  }, Si);
}
function pl(s, t) {
  return Hh(s, t);
}
var ts = P1(function(s, t, e) {
  Wh(s, t, e);
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
class mn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const zh = class Ta {
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
      throw new mn(`Unable to create ${e} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(n)
    ), c = new r(t, o, n);
    return Ta.blots.set(c.domNode, c), c;
  }
  find(t, e = !1) {
    return Ta.find(t, e);
  }
  query(t, e = B.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & B.LEVEL & B.BLOCK ? n = this.types.block : t & B.LEVEL & B.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && e & B.LEVEL & n.scope && e & B.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((e) => {
      const n = "blotName" in e, i = "attrName" in e;
      if (!n && !i)
        throw new mn("Invalid definition");
      if (n && e.blotName === "abstract")
        throw new mn("Cannot register abstract class");
      const r = n ? e.blotName : i ? e.attrName : void 0;
      return this.types[r] = e, i ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : n && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((o) => o.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((o) => {
        (this.tags[o] == null || e.className == null) && (this.tags[o] = e);
      }))), e;
    });
  }
};
zh.blots = /* @__PURE__ */ new WeakMap();
let On = zh;
function Pc(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class m_ extends Ee {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    Pc(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = (Pc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const oe = m_;
function Zo(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class b_ extends Ee {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[Zo(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[Zo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[Zo(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
const cs = b_;
class y_ {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = On.find(this.domNode);
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
const jr = y_, Kh = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, On.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new mn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), On.blots.delete(this.domNode);
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
      throw new mn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Kh.blotName = "abstract";
let Gh = Kh;
const Yh = class extends Gh {
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
Yh.scope = B.INLINE_BLOT;
let v_ = Yh;
const yt = v_;
class __ {
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
function jc(s, t) {
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
const Xh = class Xe extends Gh {
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
    this.children = new __(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = jc(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof mn)
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
      const c = jc(r, this.scroll);
      (c.next !== o || c.next == null) && (c.parent != null && c.parent.removeChild(this), this.insertBefore(c, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Xh.uiClass = "";
let E_ = Xh;
const ne = E_;
function w_(s, t) {
  if (Object.keys(s).length !== Object.keys(t).length)
    return !1;
  for (const e in s)
    if (s[e] !== t[e])
      return !1;
  return !0;
}
const an = class ln extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(ln.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new jr(this.domNode);
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((n) => {
        n instanceof ln || (n = n.wrap(ln.blotName, !0)), this.attributes.copy(n);
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
    n instanceof ln && n.prev === this && w_(e, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof ln && this.attributes.move(n), n;
  }
};
an.allowedChildren = [an, yt], an.blotName = "inline", an.scope = B.INLINE_BLOT, an.tagName = "SPAN";
let T_ = an;
const gl = T_, cn = class Aa extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(Aa.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new jr(this.domNode);
  }
  format(t, e) {
    const n = this.scroll.query(t, B.BLOCK);
    n != null && (n instanceof Ee ? this.attributes.attribute(n, e) : t === this.statics.blotName && !e ? this.replaceWith(Aa.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
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
cn.blotName = "block", cn.scope = B.BLOCK_BLOT, cn.tagName = "P", cn.allowedChildren = [
  gl,
  cn,
  yt
];
let A_ = cn;
const mi = A_, Na = class extends ne {
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
Na.blotName = "container", Na.scope = B.BLOCK_BLOT;
let N_ = Na;
const Vr = N_;
class O_ extends yt {
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
const Dt = O_, C_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, S_ = 100, un = class extends ne {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, C_), this.attach();
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
      if (a >= S_)
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
un.blotName = "scroll", un.defaultChild = mi, un.allowedChildren = [mi, Vr], un.scope = B.BLOCK_BLOT, un.tagName = "DIV";
let L_ = un;
const ml = L_, Oa = class Zh extends yt {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Zh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Oa.blotName = "text", Oa.scope = B.INLINE_BLOT;
let k_ = Oa;
const Tr = k_, x_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Ee,
  AttributorStore: jr,
  BlockBlot: mi,
  ClassAttributor: oe,
  ContainerBlot: Vr,
  EmbedBlot: Dt,
  InlineBlot: gl,
  LeafBlot: yt,
  ParentBlot: ne,
  Registry: On,
  Scope: B,
  ScrollBlot: ml,
  StyleAttributor: cs,
  TextBlot: Tr
}, Symbol.toStringTag, { value: "Module" }));
var Ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qh(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ca = { exports: {} }, kt = -1, wt = 1, ct = 0;
function bi(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = j_(s, t, e);
    if (r)
      return r;
  }
  var o = bl(s, t), c = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = Ur(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var l = I_(s, t);
  return c && l.unshift([ct, c]), a && l.push([ct, a]), yl(l, i), n && $_(l), l;
}
function I_(s, t) {
  var e;
  if (!s)
    return [[wt, t]];
  if (!t)
    return [[kt, s]];
  var n = s.length > t.length ? s : t, i = s.length > t.length ? t : s, r = n.indexOf(i);
  if (r !== -1)
    return e = [
      [wt, n.substring(0, r)],
      [ct, i],
      [wt, n.substring(r + i.length)]
    ], s.length > t.length && (e[0][0] = e[2][0] = kt), e;
  if (i.length === 1)
    return [
      [kt, s],
      [wt, t]
    ];
  var o = D_(s, t);
  if (o) {
    var c = o[0], a = o[1], l = o[2], h = o[3], p = o[4], g = bi(c, l), m = bi(a, h);
    return g.concat([[ct, p]], m);
  }
  return R_(s, t);
}
function R_(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, c = new Array(o), a = new Array(o), l = 0; l < o; l++)
    c[l] = -1, a[l] = -1;
  c[r + 1] = 0, a[r + 1] = 0;
  for (var h = e - n, p = h % 2 !== 0, g = 0, m = 0, _ = 0, E = 0, w = 0; w < i; w++) {
    for (var T = -w + g; T <= w - m; T += 2) {
      var C = r + T, L;
      T === -w || T !== w && c[C - 1] < c[C + 1] ? L = c[C + 1] : L = c[C - 1] + 1;
      for (var k = L - T; L < e && k < n && s.charAt(L) === t.charAt(k); )
        L++, k++;
      if (c[C] = L, L > e)
        m += 2;
      else if (k > n)
        g += 2;
      else if (p) {
        var I = r + h - T;
        if (I >= 0 && I < o && a[I] !== -1) {
          var D = e - a[I];
          if (L >= D)
            return Vc(s, t, L, k);
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
        var C = r + h - P;
        if (C >= 0 && C < o && c[C] !== -1) {
          var L = c[C], k = r + L - C;
          if (D = e - D, L >= D)
            return Vc(s, t, L, k);
        }
      }
    }
  }
  return [
    [kt, s],
    [wt, t]
  ];
}
function Vc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), c = t.substring(n), a = bi(i, r), l = bi(o, c);
  return a.concat(l);
}
function bl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Jh(s.charCodeAt(i - 1)) && i--, i;
}
function Uc(s, t) {
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
function Ur(s, t) {
  if (!s || !t || s.slice(-1) !== t.slice(-1))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(s.length - i, s.length - r) == t.substring(t.length - i, t.length - r) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return td(s.charCodeAt(s.length - i)) && i--, i;
}
function D_(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(m, _, E) {
    for (var w = m.substring(E, E + Math.floor(m.length / 4)), T = -1, C = "", L, k, I, D; (T = _.indexOf(w, T + 1)) !== -1; ) {
      var P = bl(
        m.substring(E),
        _.substring(T)
      ), F = Ur(
        m.substring(0, E),
        _.substring(0, T)
      );
      C.length < F + P && (C = _.substring(T - F, T) + _.substring(T, T + P), L = m.substring(0, E - F), k = m.substring(E + P), I = _.substring(0, T - F), D = _.substring(T + P));
    }
    return C.length * 2 >= m.length ? [
      L,
      k,
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
function $_(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, c = 0, a = 0, l = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, c = l, a = 0, l = 0, i = s[r][1]) : (s[r][0] == wt ? a += s[r][1].length : l += s[r][1].length, i && i.length <= Math.max(o, c) && i.length <= Math.max(a, l) && (s.splice(e[n - 1], 0, [
      kt,
      i
    ]), s[e[n - 1] + 1][0] = wt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, c = 0, a = 0, l = 0, i = null, t = !0)), r++;
  for (t && yl(s), B_(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == kt && s[r][0] == wt) {
      var h = s[r - 1][1], p = s[r][1], g = Uc(h, p), m = Uc(p, h);
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
      ), s[r + 1][0] = kt, s[r + 1][1] = h.substring(m), r++), r++;
    }
    r++;
  }
}
var Fc = /[^a-zA-Z0-9]/, Hc = /\s/, Wc = /[\r\n]/, M_ = /\n\r?\n$/, q_ = /^\r?\n\r?\n/;
function B_(s) {
  function t(m, _) {
    if (!m || !_)
      return 6;
    var E = m.charAt(m.length - 1), w = _.charAt(0), T = E.match(Fc), C = w.match(Fc), L = T && E.match(Hc), k = C && w.match(Hc), I = L && E.match(Wc), D = k && w.match(Wc), P = I && m.match(M_), F = D && _.match(q_);
    return P || F ? 5 : I || D ? 4 : T && !L && k ? 3 : L || k ? 2 : T || C ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = Ur(n, i);
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
function yl(s, t) {
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
      case kt:
        n++, r += s[e][1], e++;
        break;
      case ct:
        var a = e - i - n - 1;
        if (t) {
          if (a >= 0 && sd(s[a][1])) {
            var l = s[a][1].slice(-1);
            if (s[a][1] = s[a][1].slice(
              0,
              -1
            ), r = l + r, o = l + o, !s[a][1]) {
              s.splice(a, 1), e--;
              var h = a - 1;
              s[h] && s[h][0] === wt && (i++, o = s[h][1] + o, h--), s[h] && s[h][0] === kt && (n++, r = s[h][1] + r, h--), a = h;
            }
          }
          if (ed(s[e][1])) {
            var l = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += l, o += l;
          }
        }
        if (e < s.length - 1 && !s[e][1]) {
          s.splice(e, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (c = bl(o, r), c !== 0 && (a >= 0 ? s[a][1] += o.substring(
            0,
            c
          ) : (s.splice(0, 0, [
            ct,
            o.substring(0, c)
          ]), e++), o = o.substring(c), r = r.substring(c)), c = Ur(o, r), c !== 0 && (s[e][1] = o.substring(o.length - c) + s[e][1], o = o.substring(
            0,
            o.length - c
          ), r = r.substring(
            0,
            r.length - c
          )));
          var p = i + n;
          r.length === 0 && o.length === 0 ? (s.splice(e - p, p), e = e - p) : r.length === 0 ? (s.splice(e - p, p, [wt, o]), e = e - p + 1) : o.length === 0 ? (s.splice(e - p, p, [kt, r]), e = e - p + 1) : (s.splice(
            e - p,
            p,
            [kt, r],
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
  g && yl(s, t);
}
function Jh(s) {
  return s >= 55296 && s <= 56319;
}
function td(s) {
  return s >= 56320 && s <= 57343;
}
function ed(s) {
  return td(s.charCodeAt(0));
}
function sd(s) {
  return Jh(s.charCodeAt(s.length - 1));
}
function P_(s) {
  for (var t = [], e = 0; e < s.length; e++)
    s[e][1].length > 0 && t.push(s[e]);
  return t;
}
function Qo(s, t, e, n) {
  return sd(s) || ed(n) ? null : P_([
    [ct, s],
    [kt, t],
    [wt, e],
    [ct, n]
  ]);
}
function j_(s, t, e) {
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
      var T = a.slice(_), C = g.slice(_);
      return Qo(E, T, C, l);
    }
    t: {
      if (h !== null && h !== c)
        break t;
      var L = c, g = t.slice(0, L), m = t.slice(L);
      if (g !== a)
        break t;
      var k = Math.min(r - L, o - L), I = l.slice(l.length - k), D = m.slice(m.length - k);
      if (I !== D)
        break t;
      var T = l.slice(0, l.length - k), C = m.slice(0, m.length - k);
      return Qo(a, T, C, I);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), I = s.slice(n.index + n.length), _ = E.length, k = I.length;
      if (o < _ + k)
        break t;
      var w = t.slice(0, _), D = t.slice(o - k);
      if (E !== w || I !== D)
        break t;
      var T = s.slice(_, r - k), C = t.slice(_, o - k);
      return Qo(E, T, C, I);
    }
  return null;
}
function Fr(s, t, e, n) {
  return bi(s, t, e, n, !0);
}
Fr.INSERT = wt;
Fr.DELETE = kt;
Fr.EQUAL = ct;
var V_ = Fr, Ar = { exports: {} };
Ar.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", c = "[object Boolean]", a = "[object Date]", l = "[object Error]", h = "[object Function]", p = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", _ = "[object Object]", E = "[object Promise]", w = "[object RegExp]", T = "[object Set]", C = "[object String]", L = "[object Symbol]", k = "[object WeakMap]", I = "[object ArrayBuffer]", D = "[object DataView]", P = "[object Float32Array]", F = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", $t = "[object Uint16Array]", Mt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, _t = /\w*$/, Fe = /^\[object .+?Constructor\]$/, Yt = /^(?:0|[1-9]\d*)$/, Y = {};
  Y[r] = Y[o] = Y[I] = Y[D] = Y[c] = Y[a] = Y[P] = Y[F] = Y[J] = Y[tt] = Y[nt] = Y[g] = Y[m] = Y[_] = Y[w] = Y[T] = Y[C] = Y[L] = Y[ot] = Y[it] = Y[$t] = Y[Mt] = !0, Y[l] = Y[h] = Y[k] = !1;
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
  function Hs(u, d) {
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
  function Ws(u) {
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
  var Dn = Array.prototype, $n = Function.prototype, Nt = Object.prototype, ue = pt["__core-js_shared__"], gs = function() {
    var u = /[^.]+$/.exec(ue && ue.keys && ue.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), ms = $n.toString, Ot = Nt.hasOwnProperty, Oe = Nt.toString, zs = RegExp(
    "^" + ms.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), he = ce ? pt.Buffer : void 0, Ce = pt.Symbol, Mn = pt.Uint8Array, qt = ze(Object.getPrototypeOf, Object), Ri = Object.create, Di = Nt.propertyIsEnumerable, Gr = Dn.splice, qn = Object.getOwnPropertySymbols, Ks = he ? he.isBuffer : void 0, $i = ze(Object.keys, Object), Gs = Qt(pt, "DataView"), bs = Qt(pt, "Map"), Zt = Qt(pt, "Promise"), Ys = Qt(pt, "Set"), Bn = Qt(pt, "WeakMap"), ys = Qt(Object, "create"), Pn = Et(Gs), vs = Et(bs), jn = Et(Zt), Vn = Et(Ys), Un = Et(Bn), Ke = Ce ? Ce.prototype : void 0, Mi = Ke ? Ke.valueOf : void 0;
  function Se(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Yr() {
    this.__data__ = ys ? ys(null) : {};
  }
  function Xr(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function Zr(u) {
    var d = this.__data__;
    if (ys) {
      var v = d[u];
      return v === n ? void 0 : v;
    }
    return Ot.call(d, u) ? d[u] : void 0;
  }
  function qi(u) {
    var d = this.__data__;
    return ys ? d[u] !== void 0 : Ot.call(d, u);
  }
  function Fn(u, d) {
    var v = this.__data__;
    return v[u] = ys && d === void 0 ? n : d, this;
  }
  Se.prototype.clear = Yr, Se.prototype.delete = Xr, Se.prototype.get = Zr, Se.prototype.has = qi, Se.prototype.set = Fn;
  function ht(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Qr() {
    this.__data__ = [];
  }
  function Jr(u) {
    var d = this.__data__, v = Zs(d, u);
    if (v < 0)
      return !1;
    var N = d.length - 1;
    return v == N ? d.pop() : Gr.call(d, v, 1), !0;
  }
  function to(u) {
    var d = this.__data__, v = Zs(d, u);
    return v < 0 ? void 0 : d[v][1];
  }
  function eo(u) {
    return Zs(this.__data__, u) > -1;
  }
  function so(u, d) {
    var v = this.__data__, N = Zs(v, u);
    return N < 0 ? v.push([u, d]) : v[N][1] = d, this;
  }
  ht.prototype.clear = Qr, ht.prototype.delete = Jr, ht.prototype.get = to, ht.prototype.has = eo, ht.prototype.set = so;
  function gt(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function no() {
    this.__data__ = {
      hash: new Se(),
      map: new (bs || ht)(),
      string: new Se()
    };
  }
  function io(u) {
    return Es(this, u).delete(u);
  }
  function ro(u) {
    return Es(this, u).get(u);
  }
  function oo(u) {
    return Es(this, u).has(u);
  }
  function ao(u, d) {
    return Es(this, u).set(u, d), this;
  }
  gt.prototype.clear = no, gt.prototype.delete = io, gt.prototype.get = ro, gt.prototype.has = oo, gt.prototype.set = ao;
  function Ct(u) {
    this.__data__ = new ht(u);
  }
  function lo() {
    this.__data__ = new ht();
  }
  function co(u) {
    return this.__data__.delete(u);
  }
  function uo(u) {
    return this.__data__.get(u);
  }
  function ho(u) {
    return this.__data__.has(u);
  }
  function fo(u, d) {
    var v = this.__data__;
    if (v instanceof ht) {
      var N = v.__data__;
      if (!bs || N.length < e - 1)
        return N.push([u, d]), this;
      v = this.__data__ = new gt(N);
    }
    return v.set(u, d), this;
  }
  Ct.prototype.clear = lo, Ct.prototype.delete = co, Ct.prototype.get = uo, Ct.prototype.has = ho, Ct.prototype.set = fo;
  function Xs(u, d) {
    var v = Kn(u) || Js(u) ? hs(u.length, String) : [], N = v.length, H = !!N;
    for (var j in u)
      Ot.call(u, j) && !(H && (j == "length" || Co(j, N))) && v.push(j);
    return v;
  }
  function Bi(u, d, v) {
    var N = u[d];
    (!(Ot.call(u, d) && Fi(N, v)) || v === void 0 && !(d in u)) && (u[d] = v);
  }
  function Zs(u, d) {
    for (var v = u.length; v--; )
      if (Fi(u[v][0], d))
        return v;
    return -1;
  }
  function de(u, d) {
    return u && zn(d, Yn(d), u);
  }
  function Hn(u, d, v, N, H, j, Z) {
    var X;
    if (N && (X = j ? N(u, H, j, Z) : N(u)), X !== void 0)
      return X;
    if (!pe(u))
      return u;
    var rt = Kn(u);
    if (rt) {
      if (X = No(u), !d)
        return wo(u, X);
    } else {
      var Q = ke(u), mt = Q == h || Q == p;
      if (Hi(u))
        return Qs(u, d);
      if (Q == _ || Q == r || mt && !j) {
        if (fs(u))
          return j ? u : {};
        if (X = fe(mt ? {} : u), !d)
          return To(u, de(X, u));
      } else {
        if (!Y[Q])
          return j ? u : {};
        X = Oo(u, Q, Hn, d);
      }
    }
    Z || (Z = new Ct());
    var St = Z.get(u);
    if (St)
      return St;
    if (Z.set(u, X), !rt)
      var lt = v ? Ao(u) : Yn(u);
    return We(lt || u, function(bt, dt) {
      lt && (dt = bt, bt = u[dt]), Bi(X, dt, Hn(bt, d, v, N, dt, u, Z));
    }), X;
  }
  function po(u) {
    return pe(u) ? Ri(u) : {};
  }
  function go(u, d, v) {
    var N = d(u);
    return Kn(u) ? N : Hs(N, v(u));
  }
  function mo(u) {
    return Oe.call(u);
  }
  function bo(u) {
    if (!pe(u) || Lo(u))
      return !1;
    var d = Gn(u) || fs(u) ? zs : Fe;
    return d.test(Et(u));
  }
  function yo(u) {
    if (!Vi(u))
      return $i(u);
    var d = [];
    for (var v in Object(u))
      Ot.call(u, v) && v != "constructor" && d.push(v);
    return d;
  }
  function Qs(u, d) {
    if (d)
      return u.slice();
    var v = new u.constructor(u.length);
    return u.copy(v), v;
  }
  function Wn(u) {
    var d = new u.constructor(u.byteLength);
    return new Mn(d).set(new Mn(u)), d;
  }
  function _s(u, d) {
    var v = d ? Wn(u.buffer) : u.buffer;
    return new u.constructor(v, u.byteOffset, u.byteLength);
  }
  function Pi(u, d, v) {
    var N = d ? v(Ws(u), !0) : Ws(u);
    return Ne(N, He, new u.constructor());
  }
  function ji(u) {
    var d = new u.constructor(u.source, _t.exec(u));
    return d.lastIndex = u.lastIndex, d;
  }
  function vo(u, d, v) {
    var N = d ? v(ps(u), !0) : ps(u);
    return Ne(N, at, new u.constructor());
  }
  function _o(u) {
    return Mi ? Object(Mi.call(u)) : {};
  }
  function Eo(u, d) {
    var v = d ? Wn(u.buffer) : u.buffer;
    return new u.constructor(v, u.byteOffset, u.length);
  }
  function wo(u, d) {
    var v = -1, N = u.length;
    for (d || (d = Array(N)); ++v < N; )
      d[v] = u[v];
    return d;
  }
  function zn(u, d, v, N) {
    v || (v = {});
    for (var H = -1, j = d.length; ++H < j; ) {
      var Z = d[H], X = void 0;
      Bi(v, Z, X === void 0 ? u[Z] : X);
    }
    return v;
  }
  function To(u, d) {
    return zn(u, Le(u), d);
  }
  function Ao(u) {
    return go(u, Yn, Le);
  }
  function Es(u, d) {
    var v = u.__data__;
    return So(d) ? v[typeof d == "string" ? "string" : "hash"] : v.map;
  }
  function Qt(u, d) {
    var v = ds(u, d);
    return bo(v) ? v : void 0;
  }
  var Le = qn ? ze(qn, Object) : xo, ke = mo;
  (Gs && ke(new Gs(new ArrayBuffer(1))) != D || bs && ke(new bs()) != g || Zt && ke(Zt.resolve()) != E || Ys && ke(new Ys()) != T || Bn && ke(new Bn()) != k) && (ke = function(u) {
    var d = Oe.call(u), v = d == _ ? u.constructor : void 0, N = v ? Et(v) : void 0;
    if (N)
      switch (N) {
        case Pn:
          return D;
        case vs:
          return g;
        case jn:
          return E;
        case Vn:
          return T;
        case Un:
          return k;
      }
    return d;
  });
  function No(u) {
    var d = u.length, v = u.constructor(d);
    return d && typeof u[0] == "string" && Ot.call(u, "index") && (v.index = u.index, v.input = u.input), v;
  }
  function fe(u) {
    return typeof u.constructor == "function" && !Vi(u) ? po(qt(u)) : {};
  }
  function Oo(u, d, v, N) {
    var H = u.constructor;
    switch (d) {
      case I:
        return Wn(u);
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
      case $t:
      case Mt:
        return Eo(u, N);
      case g:
        return Pi(u, N, v);
      case m:
      case C:
        return new H(u);
      case w:
        return ji(u);
      case T:
        return vo(u, N, v);
      case L:
        return _o(u);
    }
  }
  function Co(u, d) {
    return d = d ?? i, !!d && (typeof u == "number" || Yt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function So(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function Lo(u) {
    return !!gs && gs in u;
  }
  function Vi(u) {
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
  function Ui(u) {
    return Hn(u, !0, !0);
  }
  function Fi(u, d) {
    return u === d || u !== u && d !== d;
  }
  function Js(u) {
    return ko(u) && Ot.call(u, "callee") && (!Di.call(u, "callee") || Oe.call(u) == r);
  }
  var Kn = Array.isArray;
  function tn(u) {
    return u != null && Wi(u.length) && !Gn(u);
  }
  function ko(u) {
    return zi(u) && tn(u);
  }
  var Hi = Ks || Io;
  function Gn(u) {
    var d = pe(u) ? Oe.call(u) : "";
    return d == h || d == p;
  }
  function Wi(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
  }
  function pe(u) {
    var d = typeof u;
    return !!u && (d == "object" || d == "function");
  }
  function zi(u) {
    return !!u && typeof u == "object";
  }
  function Yn(u) {
    return tn(u) ? Xs(u) : yo(u);
  }
  function xo() {
    return [];
  }
  function Io() {
    return !1;
  }
  s.exports = Ui;
})(Ar, Ar.exports);
var nd = Ar.exports, Nr = { exports: {} };
Nr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, c = "[object Arguments]", a = "[object Array]", l = "[object AsyncFunction]", h = "[object Boolean]", p = "[object Date]", g = "[object Error]", m = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", w = "[object Number]", T = "[object Null]", C = "[object Object]", L = "[object Promise]", k = "[object Proxy]", I = "[object RegExp]", D = "[object Set]", P = "[object String]", F = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", $t = "[object Float64Array]", Mt = "[object Int8Array]", ut = "[object Int16Array]", _t = "[object Int32Array]", Fe = "[object Uint8Array]", Yt = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", us = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Xt = /^(?:0|[1-9]\d*)$/, z = {};
  z[it] = z[$t] = z[Mt] = z[ut] = z[_t] = z[Fe] = z[Yt] = z[Y] = z[us] = !0, z[c] = z[a] = z[nt] = z[h] = z[ot] = z[p] = z[g] = z[m] = z[E] = z[w] = z[C] = z[I] = z[D] = z[P] = z[tt] = !1;
  var ce = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, He = typeof self == "object" && self && self.Object === Object && self, at = ce || He || Function("return this")(), We = t && !t.nodeType && t, Hs = We && !0 && s && !s.nodeType && s, Ne = Hs && Hs.exports === We, hs = Ne && ce.process, ds = function() {
    try {
      return hs && hs.binding && hs.binding("util");
    } catch {
    }
  }(), fs = ds && ds.isTypedArray;
  function Ws(u, d) {
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
  function Dn(u, d) {
    for (var v = -1, N = Array(u); ++v < u; )
      N[v] = d(v);
    return N;
  }
  function $n(u) {
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
  var Oe = Array.prototype, zs = Function.prototype, he = Object.prototype, Ce = at["__core-js_shared__"], Mn = zs.toString, qt = he.hasOwnProperty, Ri = function() {
    var u = /[^.]+$/.exec(Ce && Ce.keys && Ce.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), Di = he.toString, Gr = RegExp(
    "^" + Mn.call(qt).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), qn = Ne ? at.Buffer : void 0, Ks = at.Symbol, $i = at.Uint8Array, Gs = he.propertyIsEnumerable, bs = Oe.splice, Zt = Ks ? Ks.toStringTag : void 0, Ys = Object.getOwnPropertySymbols, Bn = qn ? qn.isBuffer : void 0, ys = ms(Object.keys, Object), Pn = Le(at, "DataView"), vs = Le(at, "Map"), jn = Le(at, "Promise"), Vn = Le(at, "Set"), Un = Le(at, "WeakMap"), Ke = Le(Object, "create"), Mi = Et(Pn), Se = Et(vs), Yr = Et(jn), Xr = Et(Vn), Zr = Et(Un), qi = Ks ? Ks.prototype : void 0, Fn = qi ? qi.valueOf : void 0;
  function ht(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Qr() {
    this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
  }
  function Jr(u) {
    var d = this.has(u) && delete this.__data__[u];
    return this.size -= d ? 1 : 0, d;
  }
  function to(u) {
    var d = this.__data__;
    if (Ke) {
      var v = d[u];
      return v === n ? void 0 : v;
    }
    return qt.call(d, u) ? d[u] : void 0;
  }
  function eo(u) {
    var d = this.__data__;
    return Ke ? d[u] !== void 0 : qt.call(d, u);
  }
  function so(u, d) {
    var v = this.__data__;
    return this.size += this.has(u) ? 0 : 1, v[u] = Ke && d === void 0 ? n : d, this;
  }
  ht.prototype.clear = Qr, ht.prototype.delete = Jr, ht.prototype.get = to, ht.prototype.has = eo, ht.prototype.set = so;
  function gt(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function no() {
    this.__data__ = [], this.size = 0;
  }
  function io(u) {
    var d = this.__data__, v = Qs(d, u);
    if (v < 0)
      return !1;
    var N = d.length - 1;
    return v == N ? d.pop() : bs.call(d, v, 1), --this.size, !0;
  }
  function ro(u) {
    var d = this.__data__, v = Qs(d, u);
    return v < 0 ? void 0 : d[v][1];
  }
  function oo(u) {
    return Qs(this.__data__, u) > -1;
  }
  function ao(u, d) {
    var v = this.__data__, N = Qs(v, u);
    return N < 0 ? (++this.size, v.push([u, d])) : v[N][1] = d, this;
  }
  gt.prototype.clear = no, gt.prototype.delete = io, gt.prototype.get = ro, gt.prototype.has = oo, gt.prototype.set = ao;
  function Ct(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function lo() {
    this.size = 0, this.__data__ = {
      hash: new ht(),
      map: new (vs || gt)(),
      string: new ht()
    };
  }
  function co(u) {
    var d = Qt(this, u).delete(u);
    return this.size -= d ? 1 : 0, d;
  }
  function uo(u) {
    return Qt(this, u).get(u);
  }
  function ho(u) {
    return Qt(this, u).has(u);
  }
  function fo(u, d) {
    var v = Qt(this, u), N = v.size;
    return v.set(u, d), this.size += v.size == N ? 0 : 1, this;
  }
  Ct.prototype.clear = lo, Ct.prototype.delete = co, Ct.prototype.get = uo, Ct.prototype.has = ho, Ct.prototype.set = fo;
  function Xs(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.__data__ = new Ct(); ++d < v; )
      this.add(u[d]);
  }
  function Bi(u) {
    return this.__data__.set(u, n), this;
  }
  function Zs(u) {
    return this.__data__.has(u);
  }
  Xs.prototype.add = Xs.prototype.push = Bi, Xs.prototype.has = Zs;
  function de(u) {
    var d = this.__data__ = new gt(u);
    this.size = d.size;
  }
  function Hn() {
    this.__data__ = new gt(), this.size = 0;
  }
  function po(u) {
    var d = this.__data__, v = d.delete(u);
    return this.size = d.size, v;
  }
  function go(u) {
    return this.__data__.get(u);
  }
  function mo(u) {
    return this.__data__.has(u);
  }
  function bo(u, d) {
    var v = this.__data__;
    if (v instanceof gt) {
      var N = v.__data__;
      if (!vs || N.length < e - 1)
        return N.push([u, d]), this.size = ++v.size, this;
      v = this.__data__ = new Ct(N);
    }
    return v.set(u, d), this.size = v.size, this;
  }
  de.prototype.clear = Hn, de.prototype.delete = po, de.prototype.get = go, de.prototype.has = mo, de.prototype.set = bo;
  function yo(u, d) {
    var v = Js(u), N = !v && Fi(u), H = !v && !N && tn(u), j = !v && !N && !H && zi(u), Z = v || N || H || j, X = Z ? Dn(u.length, String) : [], rt = X.length;
    for (var Q in u)
      qt.call(u, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      H && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      Oo(Q, rt))) && X.push(Q);
    return X;
  }
  function Qs(u, d) {
    for (var v = u.length; v--; )
      if (Ui(u[v][0], d))
        return v;
    return -1;
  }
  function Wn(u, d, v) {
    var N = d(u);
    return Js(u) ? N : ze(N, v(u));
  }
  function _s(u) {
    return u == null ? u === void 0 ? J : T : Zt && Zt in Object(u) ? ke(u) : Vi(u);
  }
  function Pi(u) {
    return pe(u) && _s(u) == c;
  }
  function ji(u, d, v, N, H) {
    return u === d ? !0 : u == null || d == null || !pe(u) && !pe(d) ? u !== u && d !== d : vo(u, d, v, N, ji, H);
  }
  function vo(u, d, v, N, H, j) {
    var Z = Js(u), X = Js(d), rt = Z ? a : fe(u), Q = X ? a : fe(d);
    rt = rt == c ? C : rt, Q = Q == c ? C : Q;
    var mt = rt == C, St = Q == C, lt = rt == Q;
    if (lt && tn(u)) {
      if (!tn(d))
        return !1;
      Z = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new de()), Z || zi(u) ? zn(u, d, v, N, H, j) : To(u, d, rt, v, N, H, j);
    if (!(v & i)) {
      var bt = mt && qt.call(u, "__wrapped__"), dt = St && qt.call(d, "__wrapped__");
      if (bt || dt) {
        var Ge = bt ? u.value() : u, xe = dt ? d.value() : d;
        return j || (j = new de()), H(Ge, xe, v, N, j);
      }
    }
    return lt ? (j || (j = new de()), Ao(u, d, v, N, H, j)) : !1;
  }
  function _o(u) {
    if (!Wi(u) || So(u))
      return !1;
    var d = Hi(u) ? Gr : pt;
    return d.test(Et(u));
  }
  function Eo(u) {
    return pe(u) && Gn(u.length) && !!z[_s(u)];
  }
  function wo(u) {
    if (!Lo(u))
      return ys(u);
    var d = [];
    for (var v in Object(u))
      qt.call(u, v) && v != "constructor" && d.push(v);
    return d;
  }
  function zn(u, d, v, N, H, j) {
    var Z = v & i, X = u.length, rt = d.length;
    if (X != rt && !(Z && rt > X))
      return !1;
    var Q = j.get(u);
    if (Q && j.get(d))
      return Q == d;
    var mt = -1, St = !0, lt = v & r ? new Xs() : void 0;
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
        if (!ps(d, function(xe, ws) {
          if (!Nt(lt, ws) && (bt === xe || H(bt, xe, v, N, j)))
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
  function To(u, d, v, N, H, j, Z) {
    switch (v) {
      case ot:
        if (u.byteLength != d.byteLength || u.byteOffset != d.byteOffset)
          return !1;
        u = u.buffer, d = d.buffer;
      case nt:
        return !(u.byteLength != d.byteLength || !j(new $i(u), new $i(d)));
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
        var mt = zn(X(u), X(d), N, H, j, Z);
        return Z.delete(u), mt;
      case F:
        if (Fn)
          return Fn.call(u) == Fn.call(d);
    }
    return !1;
  }
  function Ao(u, d, v, N, H, j) {
    var Z = v & i, X = Es(u), rt = X.length, Q = Es(d), mt = Q.length;
    if (rt != mt && !Z)
      return !1;
    for (var St = rt; St--; ) {
      var lt = X[St];
      if (!(Z ? lt in d : qt.call(d, lt)))
        return !1;
    }
    var bt = j.get(u);
    if (bt && j.get(d))
      return bt == d;
    var dt = !0;
    j.set(u, d), j.set(d, u);
    for (var Ge = Z; ++St < rt; ) {
      lt = X[St];
      var xe = u[lt], ws = d[lt];
      if (N)
        var xl = Z ? N(ws, xe, lt, d, u, j) : N(xe, ws, lt, u, d, j);
      if (!(xl === void 0 ? xe === ws || H(xe, ws, v, N, j) : xl)) {
        dt = !1;
        break;
      }
      Ge || (Ge = lt == "constructor");
    }
    if (dt && !Ge) {
      var Ki = u.constructor, Gi = d.constructor;
      Ki != Gi && "constructor" in u && "constructor" in d && !(typeof Ki == "function" && Ki instanceof Ki && typeof Gi == "function" && Gi instanceof Gi) && (dt = !1);
    }
    return j.delete(u), j.delete(d), dt;
  }
  function Es(u) {
    return Wn(u, Yn, No);
  }
  function Qt(u, d) {
    var v = u.__data__;
    return Co(d) ? v[typeof d == "string" ? "string" : "hash"] : v.map;
  }
  function Le(u, d) {
    var v = ue(u, d);
    return _o(v) ? v : void 0;
  }
  function ke(u) {
    var d = qt.call(u, Zt), v = u[Zt];
    try {
      u[Zt] = void 0;
      var N = !0;
    } catch {
    }
    var H = Di.call(u);
    return N && (d ? u[Zt] = v : delete u[Zt]), H;
  }
  var No = Ys ? function(u) {
    return u == null ? [] : (u = Object(u), Ws(Ys(u), function(d) {
      return Gs.call(u, d);
    }));
  } : xo, fe = _s;
  (Pn && fe(new Pn(new ArrayBuffer(1))) != ot || vs && fe(new vs()) != E || jn && fe(jn.resolve()) != L || Vn && fe(new Vn()) != D || Un && fe(new Un()) != tt) && (fe = function(u) {
    var d = _s(u), v = d == C ? u.constructor : void 0, N = v ? Et(v) : "";
    if (N)
      switch (N) {
        case Mi:
          return ot;
        case Se:
          return E;
        case Yr:
          return L;
        case Xr:
          return D;
        case Zr:
          return tt;
      }
    return d;
  });
  function Oo(u, d) {
    return d = d ?? o, !!d && (typeof u == "number" || Xt.test(u)) && u > -1 && u % 1 == 0 && u < d;
  }
  function Co(u) {
    var d = typeof u;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? u !== "__proto__" : u === null;
  }
  function So(u) {
    return !!Ri && Ri in u;
  }
  function Lo(u) {
    var d = u && u.constructor, v = typeof d == "function" && d.prototype || he;
    return u === v;
  }
  function Vi(u) {
    return Di.call(u);
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
  var Fi = Pi(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Pi : function(u) {
    return pe(u) && qt.call(u, "callee") && !Gs.call(u, "callee");
  }, Js = Array.isArray;
  function Kn(u) {
    return u != null && Gn(u.length) && !Hi(u);
  }
  var tn = Bn || Io;
  function ko(u, d) {
    return ji(u, d);
  }
  function Hi(u) {
    if (!Wi(u))
      return !1;
    var d = _s(u);
    return d == m || d == _ || d == l || d == k;
  }
  function Gn(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
  }
  function Wi(u) {
    var d = typeof u;
    return u != null && (d == "object" || d == "function");
  }
  function pe(u) {
    return u != null && typeof u == "object";
  }
  var zi = fs ? $n(fs) : Eo;
  function Yn(u) {
    return Kn(u) ? yo(u) : wo(u);
  }
  function xo() {
    return [];
  }
  function Io() {
    return !1;
  }
  s.exports = ko;
})(Nr, Nr.exports);
var id = Nr.exports, vl = {};
Object.defineProperty(vl, "__esModule", { value: !0 });
const U_ = nd, F_ = id;
var Sa;
(function(s) {
  function t(r = {}, o = {}, c = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = U_(o);
    c || (a = Object.keys(a).reduce((l, h) => (a[h] != null && (l[h] = a[h]), l), {}));
    for (const l in r)
      r[l] !== void 0 && o[l] === void 0 && (a[l] = r[l]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.compose = t;
  function e(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const c = Object.keys(r).concat(Object.keys(o)).reduce((a, l) => (F_(r[l], o[l]) || (a[l] = o[l] === void 0 ? null : o[l]), a), {});
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
})(Sa || (Sa = {}));
vl.default = Sa;
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
var La;
(function(s) {
  function t(e) {
    return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
  }
  s.length = t;
})(La || (La = {}));
Hr.default = La;
var _l = {};
Object.defineProperty(_l, "__esModule", { value: !0 });
const zc = Hr;
class H_ {
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
      const n = this.offset, i = zc.default.length(e);
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
    return this.ops[this.index] ? zc.default.length(this.ops[this.index]) - this.offset : 1 / 0;
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
_l.default = H_;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = V_, n = nd, i = id, r = vl;
  t.AttributeMap = r.default;
  const o = Hr;
  t.Op = o.default;
  const c = _l;
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
        let C = w.retain;
        for (; m.peekType() === "insert" && m.peekLength() <= C; )
          C -= m.peekLength(), E.push(m.next());
        w.retain - C > 0 && _.next(w.retain - C);
      }
      const T = new h(E);
      for (; m.hasNext() || _.hasNext(); )
        if (_.peekType() === "insert")
          T.push(_.next());
        else if (m.peekType() === "delete")
          T.push(m.next());
        else {
          const C = Math.min(m.peekLength(), _.peekLength()), L = m.next(C), k = _.next(C);
          if (k.retain) {
            const I = {};
            if (typeof L.retain == "number")
              I.retain = typeof k.retain == "number" ? C : k.retain;
            else if (typeof k.retain == "number")
              L.retain == null ? I.insert = L.insert : I.retain = L.retain;
            else {
              const P = L.retain == null ? "insert" : "retain", [F, J, tt] = l(L[P], k.retain), nt = h.getHandler(F);
              I[P] = {
                [F]: nt.compose(J, tt, P === "retain")
              };
            }
            const D = r.default.compose(L.attributes, k.attributes, typeof L.retain == "number");
            if (D && (I.attributes = D), T.push(I), !_.hasNext() && i(T.ops[T.ops.length - 1], I)) {
              const P = new h(m.rest());
              return T.concat(P).chop();
            }
          } else typeof k.delete == "number" && (typeof L.retain == "number" || typeof L.retain == "object" && L.retain !== null) && T.push(k);
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
      const _ = [this, g].map((L) => L.map((k) => {
        if (k.insert != null)
          return typeof k.insert == "string" ? k.insert : a;
        const I = L === g ? "on" : "with";
        throw new Error("diff() called " + I + " non-document");
      }).join("")), E = new h(), w = e(_[0], _[1], m, !0), T = new c.default(this.ops), C = new c.default(g.ops);
      return w.forEach((L) => {
        let k = L[1].length;
        for (; k > 0; ) {
          let I = 0;
          switch (L[0]) {
            case e.INSERT:
              I = Math.min(C.peekLength(), k), E.push(C.next(I));
              break;
            case e.DELETE:
              I = Math.min(k, T.peekLength()), T.next(I), E.delete(I);
              break;
            case e.EQUAL:
              I = Math.min(T.peekLength(), C.peekLength(), k);
              const D = T.next(I), P = C.next(I);
              i(D.insert, P.insert) ? E.retain(I, r.default.diff(D.attributes, P.attributes)) : E.push(P).delete(I);
              break;
          }
          k -= I;
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
        const T = _.peek(), C = o.default.length(T) - _.peekLength(), L = typeof T.insert == "string" ? T.insert.indexOf(m, C) - C : -1;
        if (L < 0)
          E.push(_.next());
        else if (L > 0)
          E.push(_.next(L));
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
            return g.slice(_, _ + w).forEach((C) => {
              E.delete ? m.push(C) : E.retain && E.attributes && m.retain(o.default.length(C), r.default.invert(E.attributes, C.attributes));
            }), _ + w;
          } else if (typeof E.retain == "object" && E.retain !== null) {
            const w = g.slice(_, _ + 1), T = new c.default(w.ops).next(), [C, L, k] = l(E.retain, T.insert), I = h.getHandler(C);
            return m.retain({ [C]: I.invert(L, k) }, r.default.invert(E.attributes, T.attributes)), _ + 1;
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
          const C = Math.min(E.peekLength(), w.peekLength()), L = E.next(C), k = w.next(C);
          if (L.delete)
            continue;
          if (k.delete)
            T.push(k);
          else {
            const I = L.retain, D = k.retain;
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
            T.retain(P, r.default.transform(L.attributes, k.attributes, m));
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
})(Ca, Ca.exports);
var Ht = Ca.exports;
const q = /* @__PURE__ */ Qh(Ht);
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
let ie = class extends Tr {
};
function Wr(s) {
  return s.replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t]);
}
const ge = class ge extends gl {
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
$(ge, "allowedChildren", [ge, ae, Dt, ie]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
$(ge, "order", [
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
const Kc = 1;
class ft extends mi {
  constructor() {
    super(...arguments);
    $(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = rd(this)), this.cache.delta;
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
    return this.cache.length == null && (this.cache.length = super.length() + Kc), this.cache.length;
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
    if (n && (e === 0 || e >= this.length() - Kc)) {
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
    super.attach(), this.attributes = new jr(this.domNode);
  }
  delta() {
    return new q().insert(this.value(), {
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
function rd(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return s.descendants(yt).reduce((e, n) => n.length() === 0 ? e : e.insert(n.value(), Vt(n, {}, t)), new q()).insert(`
`, Vt(s));
}
function Vt(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return s == null || ("formats" in s && typeof s.formats == "function" && (t = {
    ...t,
    ...s.formats()
  }, e && delete t["code-token"]), s.parent == null || s.parent.statics.blotName === "scroll" || s.parent.statics.scope !== s.statics.scope) ? t : Vt(s.parent, t, e);
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
$(Pt, "blotName", "cursor"), $(Pt, "className", "ql-cursor"), $(Pt, "tagName", "span"), $(Pt, "CONTENTS", "\uFEFF");
let Cn = Pt;
var od = { exports: {} };
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
    var w = this._events[E], T = arguments.length, C, L;
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
      for (L = 1, C = new Array(T - 1); L < T; L++)
        C[L - 1] = arguments[L];
      w.fn.apply(w.context, C);
    } else {
      var k = w.length, I;
      for (L = 0; L < k; L++)
        switch (w[L].once && this.removeListener(l, w[L].fn, void 0, !0), T) {
          case 1:
            w[L].fn.call(w[L].context);
            break;
          case 2:
            w[L].fn.call(w[L].context, h);
            break;
          case 3:
            w[L].fn.call(w[L].context, h, p);
            break;
          case 4:
            w[L].fn.call(w[L].context, h, p, g);
            break;
          default:
            if (!C) for (I = 1, C = new Array(T - 1); I < T; I++)
              C[I - 1] = arguments[I];
            w[L].fn.apply(w[L].context, C);
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
})(od);
var W_ = od.exports;
const z_ = /* @__PURE__ */ Qh(W_), ka = /* @__PURE__ */ new WeakMap(), xa = ["error", "warn", "log", "info"];
let Ia = "warn";
function ad(s) {
  if (Ia && xa.indexOf(s) <= xa.indexOf(Ia)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      e[n - 1] = arguments[n];
    console[s](...e);
  }
}
function Ue(s) {
  return xa.reduce((t, e) => (t[e] = ad.bind(console, e, s), t), {});
}
Ue.level = (s) => {
  Ia = s;
};
ad.level = Ue.level;
const Jo = Ue("quill:events"), K_ = ["selectionchange", "mousedown", "mouseup", "click"];
K_.forEach((s) => {
  document.addEventListener(s, function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = ka.get(i);
      r && r.emitter && r.emitter.handleDOM(...e);
    });
  });
});
class M extends z_ {
  constructor() {
    super(), this.domListeners = {}, this.on("error", Jo.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return Jo.log.call(Jo, ...e), super.emit(...e);
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
$(M, "events", {
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
}), $(M, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const ta = Ue("quill:selection");
class Ds {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class G_ {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Ds(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, M.sources.USER), 1);
    }), this.emitter.on(M.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(M.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((c) => c.type === "characterData" || c.type === "childList" || c.type === "attributes" && c.target === this.root);
          this.update(o ? M.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(M.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: c,
          endOffset: a
        } = i.range;
        this.setNativeRange(r, o, c, a), this.update(M.sources.SILENT);
      }
    }), this.update(M.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(M.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(M.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(M.sources.USER);
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
    return ta.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const e = this.getNativeRange();
    return e == null ? [null, null] : [this.normalizedToRange(e), e];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && ea(this.root, document.activeElement);
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
    if (!ea(this.root, t.startContainer) || !t.collapsed && !ea(this.root, t.endContainer))
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
    if (ta.info("setNativeRange", t, e, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : M.sources.API;
    if (typeof e == "string" && (n = e, e = !1), ta.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, e);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : M.sources.USER;
    const e = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !pl(e, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [M.events.SELECTION_CHANGE, gn(this.lastRange), gn(e), t];
      this.emitter.emit(M.events.EDITOR_CHANGE, ...r), t !== M.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function ea(s, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return s.contains(t);
}
const Y_ = /^[ -~]*$/;
class X_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const n = Gc(t), i = new q();
    return Q_(n.ops.slice()).reduce((o, c) => {
      const a = Ht.Op.length(c);
      let l = c.attributes || {}, h = !1, p = !1;
      if (c.insert != null) {
        if (i.retain(a), typeof c.insert == "string") {
          const _ = c.insert;
          p = !_.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ft, o)[0]), this.scroll.insertAt(o, _);
          const [E, w] = this.scroll.line(o);
          let T = ts({}, Vt(E));
          if (E instanceof ft) {
            const [C] = E.descendant(yt, w);
            C && (T = ts(T, Vt(C)));
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
              const T = ts({}, Vt(w));
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
    return this.scroll.deleteAt(t, e), this.update(new q().retain(t).delete(e));
  }
  formatLine(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(e, 1)).forEach((o) => {
        o.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new q().retain(t).retain(e, gn(n));
    return this.update(i);
  }
  formatText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, e, r, n[r]);
    });
    const i = new q().retain(t).retain(e, gn(n));
    return this.update(i);
  }
  getContents(t, e) {
    return this.delta.slice(t, t + e);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new q());
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
      let l = Vt(a);
      for (; Object.keys(l).length > 0; ) {
        const h = c.shift();
        if (h == null) return l;
        l = Z_(Vt(h), l);
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
      return n.length() >= i + e && !(i === 0 && e === r) ? yi(n, i, e, !0) : yi(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, e) {
    const n = Gc(e), i = new q().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, e, n) {
    return this.scroll.insertAt(t, e, n), this.update(new q().retain(t).insert({
      [e]: n
    }));
  }
  insertText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return e = e.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, e), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, e.length, i, n[i]);
    }), this.update(new q().retain(t).insert(e, gn(n)));
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
    let o = 0, c = new q();
    i != null && (o = i.length() - r, c = i.delta().slice(r, r + o - 1).insert(`
`));
    const l = this.getContents(t, e + o).diff(new q().insert(n).concat(c)), h = new q().retain(t).concat(l);
    return this.applyDelta(h);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(Y_) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = Vt(r), c = r.offset(this.scroll), a = e[0].oldValue.replace(Cn.CONTENTS, ""), l = new q().insert(a), h = new q().insert(r.value()), p = n && {
        oldRange: Yc(n.oldRange, -c),
        newRange: Yc(n.newRange, -c)
      };
      t = new q().retain(c).concat(l.diff(h, p)).reduce((m, _) => _.insert ? m.insert(_.insert, o) : m.push(_), new q()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !pl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function hn(s, t, e) {
  if (s.length === 0) {
    const [m] = sa(e.pop());
    return t <= 0 ? `</li></${m}>` : `</li></${m}>${hn([], t - 1, e)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: c
  }, ...a] = s, [l, h] = sa(c);
  if (o > t)
    return e.push(c), o === t + 1 ? `<${l}><li${h}>${yi(n, i, r)}${hn(a, o, e)}` : `<${l}><li>${hn(s, t + 1, e)}`;
  const p = e[e.length - 1];
  if (o === t && c === p)
    return `</li><li${h}>${yi(n, i, r)}${hn(a, o, e)}`;
  const [g] = sa(e.pop());
  return `</li></${g}>${hn(s, t - 1, e)}`;
}
function yi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof ie)
    return Wr(s.value().slice(t, t + e));
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
      }), hn(l, -1, []);
    }
    const i = [];
    if (s.children.forEachAt(t, e, (l, h, p) => {
      i.push(yi(l, h, p));
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
function Z_(s, t) {
  return Object.keys(t).reduce((e, n) => {
    if (s[n] == null) return e;
    const i = t[n];
    return i === s[n] ? e[n] = i : Array.isArray(i) ? i.indexOf(s[n]) < 0 ? e[n] = i.concat([s[n]]) : e[n] = i : e[n] = [i, s[n]], e;
  }, {});
}
function sa(s) {
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
function Gc(s) {
  return s.reduce((t, e) => {
    if (typeof e.insert == "string") {
      const n = e.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, e.attributes);
    }
    return t.push(e);
  }, new q());
}
function Yc(s, t) {
  let {
    index: e,
    length: n
  } = s;
  return new Ds(e + t, n);
}
function Q_(s) {
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
$(le, "DEFAULTS", {});
const nr = "\uFEFF";
class El extends Dt {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(nr), this.rightGuard = document.createTextNode(nr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, n;
    const i = t.data.split(nr).join("");
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
    return t.data = nr, e;
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
class J_ {
  constructor(t, e) {
    $(this, "isComposing", !1);
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
    e && !(e instanceof El) && (this.emitter.emit(M.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(M.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(M.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(M.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const ui = class ui {
  constructor(t, e) {
    $(this, "modules", {});
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
$(ui, "DEFAULTS", {
  modules: {}
}), $(ui, "themes", {
  default: ui
});
let Sn = ui;
const tE = (s) => s.parentElement || s.getRootNode().host || null, eE = (s) => {
  const t = s.getBoundingClientRect(), e = "offsetWidth" in s && Math.abs(t.width) / s.offsetWidth || 1, n = "offsetHeight" in s && Math.abs(t.height) / s.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + s.clientWidth * e,
    bottom: t.top + s.clientHeight * n,
    left: t.left
  };
}, ir = (s) => {
  const t = parseInt(s, 10);
  return Number.isNaN(t) ? 0 : t;
}, Xc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, sE = (s, t) => {
  var r, o, c;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, l = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : eE(i), h = getComputedStyle(i), p = Xc(n.left, n.right, l.left, l.right, ir(h.scrollPaddingLeft), ir(h.scrollPaddingRight)), g = Xc(n.top, n.bottom, l.top, l.bottom, ir(h.scrollPaddingTop), ir(h.scrollPaddingBottom));
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
    i = a || h.position === "fixed" ? null : tE(i);
  }
}, nE = 100, iE = ["block", "break", "cursor", "inline", "scroll", "text"], rE = (s, t, e) => {
  const n = new On();
  return iE.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), s.forEach((i) => {
    let r = t.query(i);
    r || e.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > nE) {
        e.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, bn = Ue("quill"), rr = new On();
ne.uiClass = "ql-ui";
const te = class te {
  static debug(t) {
    t === !0 && (t = "log"), Ue.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return ka.get(t) || rr.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && bn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, e) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && bn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && rr.register(e), typeof e.register == "function" && e.register(rr);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = oE(t, e), this.container = this.options.container, this.container == null) {
      bn.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && te.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", ka.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new M();
    const i = ml.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new X_(this.scroll), this.selection = new G_(this.scroll, this.emitter), this.composition = new J_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(M.events.EDITOR_CHANGE, (o) => {
      o === M.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(M.events.SCROLL_UPDATE, (o, c) => {
      const a = this.selection.lastRange, [l] = this.selection.getRange(), h = a && l ? {
        oldRange: a,
        newRange: l
      } : void 0;
      Jt.call(this, () => this.editor.update(null, c, h), o);
    }), this.emitter.on(M.events.SCROLL_EMBED_UPDATE, (o, c) => {
      const a = this.selection.lastRange, [l] = this.selection.getRange(), h = a && l ? {
        oldRange: a,
        newRange: l
      } : void 0;
      Jt.call(this, () => {
        const p = new q().retain(o.offset(this)).retain({
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
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : M.sources.API;
    return Jt.call(this, () => {
      const i = this.getSelection(!0);
      let r = new q();
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
      return this.setSelection(i, M.sources.SILENT), r;
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
    sE(this.root, t);
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
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : M.sources.API;
    return Jt.call(this, () => {
      t = new q(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, e);
  }
  setSelection(t, e, n) {
    t == null ? this.selection.setRange(null, e || te.sources.API) : ([t, e, , n] = Ie(t, e, n), this.selection.setRange(new Ds(Math.max(0, t), e), n), n !== M.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : M.sources.API;
    const n = new q().insert(t);
    return this.setContents(n, e);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : M.sources.USER;
    const e = this.scroll.update(t);
    return this.selection.update(t), e;
  }
  updateContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : M.sources.API;
    return Jt.call(this, () => (t = new q(t), this.editor.applyDelta(t)), e, !0);
  }
};
$(te, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: rr,
  theme: "default"
}), $(te, "events", M.events), $(te, "sources", M.sources), $(te, "version", "2.0.2"), $(te, "imports", {
  delta: q,
  parchment: x_,
  "core/module": le,
  "core/theme": Sn
});
let S = te;
function Zc(s) {
  return typeof s == "string" ? document.querySelector(s) : s;
}
function na(s) {
  return Object.entries(s ?? {}).reduce((t, e) => {
    let [n, i] = e;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Qc(s) {
  return Object.fromEntries(Object.entries(s).filter((t) => t[1] !== void 0));
}
function oE(s, t) {
  const e = Zc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === S.DEFAULTS.theme ? Sn : S.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = S.DEFAULTS, {
    modules: c,
    ...a
  } = i.DEFAULTS;
  let l = na(t.modules);
  l != null && l.toolbar && l.toolbar.constructor !== Object && (l = {
    ...l,
    toolbar: {
      container: l.toolbar
    }
  });
  const h = ts({}, na(r), na(c), l), p = {
    ...o,
    ...Qc(a),
    ...Qc(t)
  };
  let g = t.registry;
  return g ? t.formats && bn.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? rE(t.formats, p.registry, bn) : p.registry, {
    ...p,
    registry: g,
    container: e,
    theme: i,
    modules: Object.entries(h).reduce((m, _) => {
      let [E, w] = _;
      if (!w) return m;
      const T = S.import(`modules/${E}`);
      return T == null ? (bn.error(`Cannot load ${E} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [E]: ts({}, T.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Zc(p.bounds)
  };
}
function Jt(s, t, e, n) {
  if (!this.isEnabled() && t === M.sources.USER && !this.allowReadOnlyEdits)
    return new q();
  let i = e == null ? null : this.getSelection();
  const r = this.editor.delta, o = s();
  if (i != null && (e === !0 && (e = i.index), n == null ? i = Jc(i, o, t) : n !== 0 && (i = Jc(i, e, n, t)), this.setSelection(i, M.sources.SILENT)), o.length() > 0) {
    const c = [M.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(M.events.EDITOR_CHANGE, ...c), t !== M.sources.SILENT && this.emitter.emit(...c);
  }
  return o;
}
function Ie(s, t, e, n, i) {
  let r = {};
  return typeof s.index == "number" && typeof s.length == "number" ? typeof t != "number" ? (i = n, n = e, e = t, t = s.length, s = s.index) : (t = s.length, s = s.index) : typeof t != "number" && (i = n, n = e, e = t, t = 0), typeof e == "object" ? (r = e, i = n) : typeof e == "string" && (n != null ? r[e] = n : i = e), i = i || M.sources.API, [s, t, r, i];
}
function Jc(s, t, e, n) {
  const i = typeof e == "number" ? e : 0;
  if (s == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [s.index, s.index + s.length].map((c) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(c, n !== M.sources.USER)
  )) : [r, o] = [s.index, s.index + s.length].map((c) => c < t || c === t && n === M.sources.USER ? c : i >= 0 ? c + i : Math.max(t, c + i)), new Ds(r, o - r);
}
class js extends Vr {
}
function tu(s) {
  return s instanceof ft || s instanceof Ft;
}
function eu(s) {
  return typeof s.updateContent == "function";
}
class dn extends ml {
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
    this.emitter.emit(M.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(M.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, e) {
    this.emitter.emit(M.events.SCROLL_EMBED_UPDATE, t, e);
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
    const n = this.deltaToRenderBlocks(e.concat(new q().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ft, t)[0] && t < this.length()), l = r.type === "block" ? r.delta : new q().insert({
        [r.key]: r.value
      });
      ia(this, t, l);
      const h = r.type === "block" ? 1 : 0, p = t + l.length() + h;
      a && this.insertAt(p - 1, `
`);
      const g = Vt(this.line(t)[0]), m = Ht.AttributeMap.diff(g, r.attributes) || {};
      Object.keys(m).forEach((_) => {
        this.formatAt(p - 1, 1, _, m[_]);
      }), t = p;
    }
    let [o, c] = this.children.find(t);
    if (n.length && (o && (o = o.split(c), c = 0), n.forEach((a) => {
      if (a.type === "block") {
        const l = this.createBlock(a.attributes, o || void 0);
        ia(l, 0, a.delta);
      } else {
        const l = this.create(a.key, a.value);
        this.insertBefore(l, o || void 0), Object.keys(a.attributes).forEach((h) => {
          l.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + c : this.length();
      ia(this, a, i.delta);
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
    return t === this.length() ? this.line(t - 1) : this.descendant(tu, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let c = [], a = o;
      return i.children.forEachAt(r, o, (l, h, p) => {
        tu(l) ? c.push(l) : l instanceof Vr && (c = c.concat(n(l, h, a))), a -= p;
      }), c;
    };
    return n(this, t, e);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, e), t.length > 0 && this.emitter.emit(M.events.SCROLL_OPTIMIZE, t, e));
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
    let e = M.sources.USER;
    typeof t == "string" && (e = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((n) => {
      let {
        target: i
      } = n;
      const r = this.find(i, !0);
      return r && !eu(r);
    }), t.length > 0 && this.emitter.emit(M.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(M.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, n) {
    const [i] = this.descendant((r) => r instanceof Ft, t);
    i && i.statics.blotName === e && eu(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const e = [];
    let n = new q();
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
            }), n = new q();
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
          }), n = new q(), e.push({
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
$(dn, "blotName", "scroll"), $(dn, "className", "ql-editor"), $(dn, "tagName", "DIV"), $(dn, "defaultChild", ft), $(dn, "allowedChildren", [ft, Ft, js]);
function ia(s, t, e) {
  e.reduce((n, i) => {
    const r = Ht.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const c = i.insert;
        s.insertAt(n, c);
        const [a] = s.descendant(yt, n), l = Vt(a);
        o = Ht.AttributeMap.diff(l, o) || {};
      } else if (typeof i.insert == "object") {
        const c = Object.keys(i.insert)[0];
        if (c == null) return n;
        if (s.insertAt(n, c, i.insert[c]), s.scroll.query(c, B.INLINE) != null) {
          const [l] = s.descendant(yt, n), h = Vt(l);
          o = Ht.AttributeMap.diff(h, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((c) => {
      s.formatAt(n, r, c, o[c]);
    }), n + r;
  }, t);
}
const wl = {
  scope: B.BLOCK,
  whitelist: ["right", "center", "justify"]
}, aE = new Ee("align", "align", wl), ld = new oe("align", "ql-align", wl), cd = new cs("align", "text-align", wl);
class ud extends cs {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const lE = new oe("color", "ql-color", {
  scope: B.INLINE
}), Tl = new ud("color", "color", {
  scope: B.INLINE
}), cE = new oe("background", "ql-bg", {
  scope: B.INLINE
}), Al = new ud("background", "background-color", {
  scope: B.INLINE
});
class Vs extends js {
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
${Wr(this.code(t, e))}
</pre>`;
  }
}
class vt extends ft {
  static register() {
    S.register(Vs);
  }
}
$(vt, "TAB", "  ");
class Nl extends we {
}
Nl.blotName = "code";
Nl.tagName = "CODE";
vt.blotName = "code-block";
vt.className = "ql-code-block";
vt.tagName = "DIV";
Vs.blotName = "code-block-container";
Vs.className = "ql-code-block-container";
Vs.tagName = "DIV";
Vs.allowedChildren = [vt];
vt.allowedChildren = [ie, ae, Cn];
vt.requiredContainer = Vs;
const Ol = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, hd = new Ee("direction", "dir", Ol), dd = new oe("direction", "ql-direction", Ol), fd = new cs("direction", "direction", Ol), pd = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, gd = new oe("font", "ql-font", pd);
class uE extends cs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const md = new uE("font", "font-family", pd), bd = new oe("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), yd = new cs("size", "font-size", {
  scope: B.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), hE = Ue("quill:keyboard"), dE = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class zr extends le {
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
    const i = pE(t);
    if (i == null) {
      hE.warn("Attempted to add invalid keyboard binding", i);
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((T) => zr.match(t, T));
      if (i.length === 0) return;
      const r = S.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [c, a] = this.quill.getLine(o.index), [l, h] = this.quill.getLeaf(o.index), [p, g] = o.length === 0 ? [l, h] : this.quill.getLeaf(o.index + o.length), m = l instanceof Tr ? l.value().slice(0, h) : "", _ = p instanceof Tr ? p.value().slice(g) : "", E = {
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
          if (T.format.every((C) => E.format[C] == null))
            return !1;
        } else if (typeof T.format == "object" && !Object.keys(T.format).every((C) => T.format[C] === !0 ? E.format[C] != null : T.format[C] === !1 ? E.format[C] == null : pl(T.format[C], E.format[C])))
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
    let o = new q().retain(t.index - n).delete(n);
    if (e.offset === 0) {
      const [c] = this.quill.getLine(t.index - 1);
      if (c && !(c.statics.blotName === "block" && c.length() <= 1)) {
        const l = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = Ht.AttributeMap.diff(l, h) || {}, Object.keys(i).length > 0) {
          const p = new q().retain(t.index + r.length() - 2).retain(1, i);
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
    let o = new q().retain(t.index).delete(n);
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
    Cl({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, e) {
    const n = Object.keys(e.format).reduce((r, o) => (this.quill.scroll.query(o, B.BLOCK) && !Array.isArray(e.format[o]) && (r[o] = e.format[o]), r), {}), i = new q().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, S.sources.USER), this.quill.setSelection(t.index + 1, S.sources.SILENT), this.quill.focus();
  }
}
const fE = {
  bindings: {
    bold: ra("bold"),
    italic: ra("italic"),
    underline: ra("underline"),
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
    "indent code-block": su(!0),
    "outdent code-block": su(!1),
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
        const e = new q().retain(s.index).delete(s.length).insert("	");
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
        }, i = new q().retain(s.index).insert(`
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
        const [e, n] = this.quill.getLine(s.index), i = new q().retain(s.index).insert(`
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
          const [e, n, i, r] = t.getTable(s), o = gE(e, n, i, r);
          if (o == null) return;
          let c = e.offset();
          if (o < 0) {
            const a = new q().retain(c).insert(`
`);
            this.quill.updateContents(a, S.sources.USER), this.quill.setSelection(s.index + 1, s.length, S.sources.SILENT);
          } else if (o > 0) {
            c += e.length();
            const a = new q().retain(c).insert(`
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
        const o = new q().retain(s.index - i).delete(e + 1).retain(n.length() - 2 - i).retain(1, {
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
            const r = new q().retain(s.index + t.length() - e - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, S.sources.USER), this.quill.setSelection(s.index - 1, S.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": or("ArrowLeft", !1),
    "embed left shift": or("ArrowLeft", !0),
    "embed right": or("ArrowRight", !1),
    "embed right shift": or("ArrowRight", !0),
    "table down": nu(!1),
    "table up": nu(!0)
  }
};
zr.DEFAULTS = fE;
function su(s) {
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
function or(s, t) {
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
function ra(s) {
  return {
    key: s[0],
    shortKey: !0,
    handler(t, e) {
      this.quill.format(s, !e.format[s], S.sources.USER);
    }
  };
}
function nu(s) {
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
function pE(s) {
  if (typeof s == "string" || typeof s == "number")
    s = {
      key: s
    };
  else if (typeof s == "object")
    s = gn(s);
  else
    return null;
  return s.shortKey && (s[dE] = s.shortKey, delete s.shortKey), s;
}
function Cl(s) {
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
function gE(s, t, e, n) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? n === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const mE = /font-weight:\s*normal/, bE = ["P", "OL", "UL"], iu = (s) => s && bE.includes(s.tagName), yE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => iu(t.previousElementSibling) && iu(t.nextElementSibling)).forEach((t) => {
    var e;
    (e = t.parentNode) == null || e.removeChild(t);
  });
}, vE = (s) => {
  Array.from(s.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var e;
    return (e = t.getAttribute("style")) == null ? void 0 : e.match(mE);
  }).forEach((t) => {
    var n;
    const e = s.createDocumentFragment();
    e.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(e, t);
  });
};
function _E(s) {
  s.querySelector('[id^="docs-internal-guid-"]') && (vE(s), yE(s));
}
const EE = /\bmso-list:[^;]*ignore/i, wE = /\bmso-list:[^;]*\bl(\d+)/i, TE = /\bmso-list:[^;]*\blevel(\d+)/i, AE = (s, t) => {
  const e = s.getAttribute("style"), n = e == null ? void 0 : e.match(wE);
  if (!n)
    return null;
  const i = Number(n[1]), r = e == null ? void 0 : e.match(TE), o = r ? Number(r[1]) : 1, c = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(c), l = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: l,
    element: s
  };
}, NE = (s) => {
  var o, c;
  const t = Array.from(s.querySelectorAll("[style*=mso-list]")), e = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(EE) ? e.push(a) : n.push(a);
  }), e.forEach((a) => {
    var l;
    return (l = a.parentNode) == null ? void 0 : l.removeChild(a);
  });
  const i = s.documentElement.innerHTML, r = n.map((a) => AE(a, i)).filter((a) => a);
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
function OE(s) {
  s.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && NE(s);
}
const CE = [OE, _E], SE = (s) => {
  s.documentElement && CE.forEach((t) => {
    t(s);
  });
}, LE = Ue("quill:clipboard"), kE = [[Node.TEXT_NODE, UE], [Node.TEXT_NODE, ou], ["br", $E], [Node.ELEMENT_NODE, ou], [Node.ELEMENT_NODE, DE], [Node.ELEMENT_NODE, RE], [Node.ELEMENT_NODE, jE], ["li", BE], ["ol, ul", PE], ["pre", ME], ["tr", VE], ["b", oa("bold")], ["i", oa("italic")], ["strike", oa("strike")], ["style", qE]], xE = [aE, hd].reduce((s, t) => (s[t.keyName] = t, s), {}), ru = [cd, Al, Tl, fd, md, yd].reduce((s, t) => (s[t.keyName] = t, s), {});
class vd extends le {
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], kE.concat(this.options.matchers ?? []).forEach((n) => {
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
      return new q().insert(n || "", {
        [vt.blotName]: i[vt.blotName]
      });
    if (!e)
      return new q().insert(n || "", i);
    const r = this.convertHTML(e);
    return Li(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new q().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    SE(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const n = e.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Sl(this.quill.scroll, n, r, o, i);
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
      this.quill.updateContents(new q().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), S.sources.SILENT);
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
    (o = t.clipboardData) == null || o.setData("text/plain", r), (c = t.clipboardData) == null || c.setData("text/html", i), e && Cl({
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
    LE.log("onPaste", o, {
      text: n,
      html: i
    });
    const c = new q().retain(t.index).delete(t.length).concat(o);
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
$(vd, "DEFAULTS", {
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
  }, new q()) : s;
}
function Li(s, t) {
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
function IE(s, t) {
  return s.previousElementSibling && s.nextElementSibling && !Qe(s.previousElementSibling, t) && !Qe(s.nextElementSibling, t);
}
const ar = /* @__PURE__ */ new WeakMap();
function _d(s) {
  return s == null ? !1 : (ar.has(s) || (s.tagName === "PRE" ? ar.set(s, !0) : ar.set(s, _d(s.parentNode))), ar.get(s));
}
function Sl(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new q()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let c = Sl(s, o, e, n, i);
    return o.nodeType === t.ELEMENT_NODE && (c = e.reduce((a, l) => l(o, a, s), c), c = (i.get(o) || []).reduce((a, l) => l(o, a, s), c)), r.concat(c);
  }, new q()) : new q();
}
function oa(s) {
  return (t, e, n) => Us(e, s, !0, n);
}
function RE(s, t, e) {
  const n = Ee.keys(s), i = oe.keys(s), r = cs.keys(s), o = {};
  return n.concat(i).concat(r).forEach((c) => {
    let a = e.query(c, B.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = xE[c], a != null && (a.attrName === c || a.keyName === c) && (o[a.attrName] = a.value(s) || void 0), a = ru[c], a != null && (a.attrName === c || a.keyName === c) && (a = ru[c], o[a.attrName] = a.value(s) || void 0));
  }), Object.entries(o).reduce((c, a) => {
    let [l, h] = a;
    return Us(c, l, h, e);
  }, t);
}
function DE(s, t, e) {
  const n = e.query(s);
  if (n == null) return t;
  if (n.prototype instanceof Dt) {
    const i = {}, r = n.value(s);
    if (r != null)
      return i[n.blotName] = r, new q().insert(i, n.formats(s, e));
  } else if (n.prototype instanceof mi && !Li(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Us(t, n.blotName, n.formats(s, e), e);
  return t;
}
function $E(s, t) {
  return Li(t, `
`) || t.insert(`
`), t;
}
function ME(s, t, e) {
  const n = e.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(s, e) : !0;
  return Us(t, "code-block", i, e);
}
function qE() {
  return new q();
}
function BE(s, t, e) {
  const n = e.query(s);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Li(t, `
`))
    return t;
  let i = -1, r = s.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, c) => c.insert ? c.attributes && typeof c.attributes.indent == "number" ? o.push(c) : o.insert(c.insert, {
    indent: i,
    ...c.attributes || {}
  }) : o, new q());
}
function PE(s, t, e) {
  const n = s;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Us(t, "list", i, e);
}
function ou(s, t, e) {
  if (!Li(t, `
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
function jE(s, t, e) {
  var r;
  const n = {}, i = s.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, c) => {
    let [a, l] = c;
    return Us(o, a, l, e);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new q().insert("	").concat(t) : t;
}
function VE(s, t, e) {
  var i, r;
  const n = ((i = s.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? s.parentElement : (r = s.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const c = Array.from(n.querySelectorAll("tr")).indexOf(s) + 1;
    return Us(t, "table", c, e);
  }
  return t;
}
function UE(s, t, e) {
  var i;
  let n = s.data;
  if (((i = s.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!_d(s)) {
    if (n.trim().length === 0 && n.includes(`
`) && !IE(s, e))
      return t;
    const r = (o, c) => {
      const a = c.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (s.previousSibling == null && s.parentElement != null && Qe(s.parentElement, e) || s.previousSibling instanceof Element && Qe(s.previousSibling, e)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (s.nextSibling == null && s.parentElement != null && Qe(s.parentElement, e) || s.nextSibling instanceof Element && Qe(s.nextSibling, e)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class Ed extends le {
  constructor(e, n) {
    super(e, n);
    $(this, "lastRecorded", 0);
    $(this, "ignoreChange", !1);
    $(this, "stack", {
      undo: [],
      redo: []
    });
    $(this, "currentRange", null);
    this.quill.on(S.events.EDITOR_CHANGE, (i, r, o, c) => {
      i === S.events.SELECTION_CHANGE ? r && c !== S.sources.SILENT && (this.currentRange = r) : i === S.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || c === S.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = Ra(this.currentRange, r));
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
      range: Ra(i.range, o)
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
    au(this.stack.undo, e), au(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, S.sources.USER);
    else {
      const n = HE(this.quill.scroll, e.delta);
      this.quill.setSelection(n, S.sources.USER);
    }
  }
}
$(Ed, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function au(s, t) {
  let e = t;
  for (let n = s.length - 1; n >= 0; n -= 1) {
    const i = s[n];
    s[n] = {
      delta: e.transform(i.delta, !0),
      range: i.range && Ra(i.range, e)
    }, e = i.delta.transform(e), s[n].delta.length() === 0 && s.splice(n, 1);
  }
}
function FE(s, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((n) => s.query(n, B.BLOCK) != null) : !1;
}
function HE(s, t) {
  const e = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - e;
  return FE(s, t) && (n -= 1), n;
}
function Ra(s, t) {
  if (!s) return s;
  const e = t.transformPosition(s.index), n = t.transformPosition(s.index + s.length);
  return {
    index: e,
    length: n - e
  };
}
class wd extends le {
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
wd.DEFAULTS = {
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
      }), new q().retain(s.index).delete(s.length));
      this.quill.updateContents(i, M.sources.USER), this.quill.setSelection(s.index + n.length, M.sources.SILENT);
    });
  }
};
const WE = ["insertText", "insertReplacementText"];
class zE extends le {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(S.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Cl({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (e) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new q().retain(t.index).insert(e, n), S.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + e.length, 0, S.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !WE.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const n = KE(t);
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
function KE(s) {
  var t;
  return typeof s.data == "string" ? s.data : (t = s.dataTransfer) != null && t.types.includes("text/plain") ? s.dataTransfer.getData("text/plain") : null;
}
const GE = /Mac/i.test(navigator.platform), YE = 100, XE = (s) => !!(s.key === "ArrowLeft" || s.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
s.key === "ArrowUp" || s.key === "ArrowDown" || s.key === "Home" || GE && s.key === "a" && s.ctrlKey === !0);
class ZE extends le {
  constructor(e, n) {
    super(e, n);
    $(this, "isListening", !1);
    $(this, "selectionChangeDeadline", 0);
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
      !e.defaultPrevented && XE(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + YE, this.isListening) return;
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
  "blots/cursor": Cn,
  "blots/embed": El,
  "blots/inline": we,
  "blots/scroll": dn,
  "blots/text": ie,
  "modules/clipboard": vd,
  "modules/history": Ed,
  "modules/keyboard": zr,
  "modules/uploader": wd,
  "modules/input": zE,
  "modules/uiNode": ZE
});
class QE extends oe {
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
const JE = new QE("indent", "ql-indent", {
  scope: B.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Da extends ft {
}
$(Da, "blotName", "blockquote"), $(Da, "tagName", "blockquote");
class $a extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
$($a, "blotName", "header"), $($a, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class ki extends js {
}
ki.blotName = "list-container";
ki.tagName = "OL";
class xi extends ft {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    S.register(ki);
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
xi.blotName = "list";
xi.tagName = "LI";
ki.allowedChildren = [xi];
xi.requiredContainer = ki;
class vi extends we {
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
$(vi, "blotName", "bold"), $(vi, "tagName", ["STRONG", "B"]);
class Ma extends vi {
}
$(Ma, "blotName", "italic"), $(Ma, "tagName", ["EM", "I"]);
class Je extends we {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return Td(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
$(Je, "blotName", "link"), $(Je, "tagName", "A"), $(Je, "SANITIZED_URL", "about:blank"), $(Je, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function Td(s, t) {
  const e = document.createElement("a");
  e.href = s;
  const n = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class qa extends we {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
$(qa, "blotName", "script"), $(qa, "tagName", ["SUB", "SUP"]);
class Ba extends vi {
}
$(Ba, "blotName", "strike"), $(Ba, "tagName", ["S", "STRIKE"]);
class Pa extends we {
}
$(Pa, "blotName", "underline"), $(Pa, "tagName", "U");
class dr extends El {
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
$(dr, "blotName", "formula"), $(dr, "className", "ql-formula"), $(dr, "tagName", "SPAN");
const lu = ["alt", "height", "width"];
class ja extends Dt {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return lu.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return Td(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    lu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
$(ja, "blotName", "image"), $(ja, "tagName", "IMG");
const cu = ["height", "width"];
class fr extends Ft {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return cu.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static sanitize(t) {
    return Je.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    cu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
$(fr, "blotName", "video"), $(fr, "className", "ql-video"), $(fr, "tagName", "IFRAME");
const ii = new oe("code-token", "hljs", {
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
    super(t, e, n), ii.add(this.domNode, n);
  }
  format(t, e) {
    t !== Be.blotName ? super.format(t, e) : e ? ii.add(this.domNode, e) : (ii.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ii.value(this.domNode) || this.unwrap();
  }
}
Be.blotName = "code-token";
Be.className = "ql-token";
class Ut extends vt {
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
class ci extends Vs {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, e) {
    t === Ut.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, e);
    }));
  }
  formatAt(t, e, n, i) {
    n === Ut.blotName && (this.forceNext = !0), super.formatAt(t, e, n, i);
  }
  highlight(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = Ut.formats(this.children.head.domNode);
    if (e || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((a, l) => a.concat(rd(l, !1)), new q()), c = t(i, r);
        o.diff(c).reduce((a, l) => {
          let {
            retain: h,
            attributes: p
          } = l;
          return h ? (p && Object.keys(p).forEach((g) => {
            [Ut.blotName, Be.blotName].includes(g) && this.formatAt(a, h, g, p[g]);
          }), a + h) : a;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, e) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Ut.formats(n.domNode) : "plain"}">
${Wr(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = Ut.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
ci.allowedChildren = [Ut];
Ut.requiredContainer = ci;
Ut.allowedChildren = [Be, Cn, ie, ae];
const tw = (s, t, e) => {
  if (typeof s.versionString == "string") {
    const n = s.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return s.highlight(e, {
        language: t
      }).value;
  }
  return s.highlight(t, e).value;
};
class Ad extends le {
  static register() {
    S.register(Be, !0), S.register(Ut, !0), S.register(ci, !0);
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
      if (!(t instanceof ci)) return;
      const e = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const o = e.ownerDocument.createElement("option");
        o.textContent = r, o.setAttribute("value", i), e.appendChild(o);
      }), e.addEventListener("change", () => {
        t.format(Ut.blotName, e.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(e), t.children.head && (e.value = Ut.formats(t.children.head.domNode)));
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
    (t == null ? this.quill.scroll.descendants(ci) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, e);
    }), this.quill.update(S.sources.SILENT), n != null && this.quill.setSelection(n, S.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return Wr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [vt.blotName]: e
      }), i.insert(r)), new q());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(vt.className), n.innerHTML = tw(this.options.hljs, e, t), Sl(this.quill.scroll, n, [(i, r) => {
      const o = ii.value(i);
      return o ? r.compose(new q().retain(r.length(), {
        [Be.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, c, a) => (a !== 0 && o.insert(`
`, {
      [vt.blotName]: e
    }), o.insert(c)), r)], /* @__PURE__ */ new WeakMap());
  }
}
Ad.DEFAULTS = {
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
const hi = class hi extends ft {
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", Ll()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === hi.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
$(hi, "blotName", "table"), $(hi, "tagName", "TD");
let se = hi;
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
$(Pe, "blotName", "table-row"), $(Pe, "tagName", "TR");
class ve extends js {
}
$(ve, "blotName", "table-body"), $(ve, "tagName", "TBODY");
class Ln extends js {
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
    const n = Ll(), i = this.scroll.create(Pe.blotName);
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
$(Ln, "blotName", "table-container"), $(Ln, "tagName", "TABLE");
Ln.allowedChildren = [ve];
ve.requiredContainer = Ln;
ve.allowedChildren = [Pe];
Pe.requiredContainer = ve;
Pe.allowedChildren = [se];
se.requiredContainer = Pe;
function Ll() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class ew extends le {
  static register() {
    S.register(se), S.register(Pe), S.register(ve), S.register(Ln);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(Ln).forEach((t) => {
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
        table: Ll()
      });
    }, new q().retain(n.index));
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
const uu = Ue("quill:toolbar");
class kl extends le {
  constructor(t, e) {
    var n, i;
    if (super(t, e), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), sw(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      uu.error("Container required for toolbar", this.options);
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
      uu.warn("ignoring attaching to nonexistent format", e, t);
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
        this.quill.updateContents(new q().retain(o.index).delete(o.length).insert({
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
kl.DEFAULTS = {};
function hu(s, t, e) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), e != null ? (n.value = e, n.setAttribute("aria-label", `${t}: ${e}`)) : n.setAttribute("aria-label", t), s.appendChild(n);
}
function sw(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        hu(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? nw(n, r, o) : hu(n, r, o);
      }
    }), s.appendChild(n);
  });
}
function nw(s, t, e) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), e.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), s.appendChild(n);
}
kl.DEFAULTS = {
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
const iw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', rw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', lw = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', cw = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', uw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', hw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', du = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', dw = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', fw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', pw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', gw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', mw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', bw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', yw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', vw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', _w = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Ew = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', ww = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Tw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', Ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Cw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Sw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', kw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', xw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Iw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Rw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Dw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', $w = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', _i = {
  align: {
    "": iw,
    center: rw,
    right: ow,
    justify: aw
  },
  background: lw,
  blockquote: cw,
  bold: uw,
  clean: hw,
  code: du,
  "code-block": du,
  color: dw,
  direction: {
    "": fw,
    rtl: pw
  },
  formula: gw,
  header: {
    1: mw,
    2: bw,
    3: yw,
    4: vw,
    5: _w,
    6: Ew
  },
  italic: ww,
  image: Tw,
  indent: {
    "+1": Aw,
    "-1": Nw
  },
  link: Ow,
  list: {
    bullet: Cw,
    check: Sw,
    ordered: Lw
  },
  script: {
    sub: kw,
    super: xw
  },
  strike: Iw,
  table: Rw,
  underline: Dw,
  video: $w
}, Mw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let fu = 0;
function pu(s, t) {
  s.setAttribute(t, `${s.getAttribute(t) !== "true"}`);
}
class Kr {
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
    this.container.classList.toggle("ql-expanded"), pu(this.label, "aria-expanded"), pu(this.options, "aria-hidden");
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
    return t.classList.add("ql-picker-label"), t.innerHTML = Mw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${fu}`, fu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
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
class Nd extends Kr {
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
class Od extends Kr {
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
const qw = (s) => {
  const {
    overflowY: t
  } = getComputedStyle(s, null);
  return t !== "visible" && t !== "clip";
};
class Cd {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, qw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const Bw = [!1, "center", "right", "justify"], Pw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], jw = [!1, "serif", "monospace"], Vw = ["1", "2", "3", !1], Uw = ["small", !1, "large", "huge"];
class Ii extends Sn {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ei(i, Bw), typeof e.align == "object"))
        return new Od(i, e.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ei(i, Pw, r === "background" ? "#ffffff" : "#000000"), new Nd(i, e[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ei(i, jw) : i.classList.contains("ql-header") ? ei(i, Vw) : i.classList.contains("ql-size") && ei(i, Uw)), new Kr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(M.events.EDITOR_CHANGE, n);
  }
}
Ii.DEFAULTS = ts({}, Sn.DEFAULTS, {
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
class Sd extends Cd {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, M.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, M.sources.USER)), this.quill.root.scrollTop = e;
        break;
      }
      case "video":
        t = Fw(t);
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
            M.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", M.sources.USER), this.quill.setSelection(n + 2, M.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function Fw(s) {
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
const Hw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Ld extends Sd {
  constructor(t, e) {
    super(t, e), this.quill.on(M.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === M.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === M.sources.USER) {
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
    }), this.quill.on(M.events.SCROLL_OPTIMIZE, () => {
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
$(Ld, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class kd extends Ii {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Hw), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Ld(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), _i), this.buildPickers(t.container.querySelectorAll("select"), _i));
  }
}
kd.DEFAULTS = ts({}, Ii.DEFAULTS, {
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
const Ww = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class xd extends Sd {
  constructor() {
    super(...arguments);
    $(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
      if (this.linkRange != null) {
        const n = this.linkRange;
        this.restoreFocus(), this.quill.formatText(n, "link", !1, M.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(M.events.SELECTION_CHANGE, (e, n, i) => {
      if (e != null) {
        if (e.length === 0 && i === M.sources.USER) {
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
$(xd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Id extends Ii {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Ww), super(t, e), this.quill.container.classList.add("ql-snow");
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
Id.DEFAULTS = ts({}, Ii.DEFAULTS, {
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
  "attributors/attribute/direction": hd,
  "attributors/class/align": ld,
  "attributors/class/background": cE,
  "attributors/class/color": lE,
  "attributors/class/direction": dd,
  "attributors/class/font": gd,
  "attributors/class/size": bd,
  "attributors/style/align": cd,
  "attributors/style/background": Al,
  "attributors/style/color": Tl,
  "attributors/style/direction": fd,
  "attributors/style/font": md,
  "attributors/style/size": yd
}, !0);
S.register({
  "formats/align": ld,
  "formats/direction": dd,
  "formats/indent": JE,
  "formats/background": Al,
  "formats/color": Tl,
  "formats/font": gd,
  "formats/size": bd,
  "formats/blockquote": Da,
  "formats/code-block": vt,
  "formats/header": $a,
  "formats/list": xi,
  "formats/bold": vi,
  "formats/code": Nl,
  "formats/italic": Ma,
  "formats/link": Je,
  "formats/script": qa,
  "formats/strike": Ba,
  "formats/underline": Pa,
  "formats/formula": dr,
  "formats/image": ja,
  "formats/video": fr,
  "modules/syntax": Ad,
  "modules/table": ew,
  "modules/toolbar": kl,
  "themes/bubble": kd,
  "themes/snow": Id,
  "ui/icons": _i,
  "ui/picker": Kr,
  "ui/icon-picker": Od,
  "ui/color-picker": Nd,
  "ui/tooltip": Cd
}, !0);
const Fs = (s, t) => {
  const e = s.__vccOpts || s;
  for (const [n, i] of t)
    e[n] = i;
  return e;
}, zw = {
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
}, Kw = zw, Gw = { class: "ql-editor-container" }, Yw = {
  class: "",
  ref: "editor"
};
function Xw(s, t, e, n, i, r) {
  return b(), y("div", Gw, [
    f("div", Yw, null, 512)
  ]);
}
const Zw = /* @__PURE__ */ Fs(Kw, [["render", Xw], ["__scopeId", "data-v-443c4edc"]]), Bt = {
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
}, Qw = {
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
    let s = Math.round(Math.random() * 1e5);
    this.uploadId = "image_upload_" + s, this.params = this.field.params;
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
        if (this.count++, this.count <= this.params.limit) {
          if (this.files.push(t), this.detect(t), t.isVideo)
            await this.createThumbnail(t);
          else if (t.isImage)
            await this.resizeImage(t);
          else if (t.isDocument) {
            const e = new FileReader();
            e.addEventListener("load", (n) => {
              t.types.default = {
                extension: t.original.extension,
                mime: t.original.mime,
                slug: Jn(t.title) + "-" + t.uid,
                bytes: t.size,
                data: n.target.result
              }, t.loaded = !0, t.bytes += t.size, this.bytes += t.bytes;
            }), e.readAsDataURL(t);
          }
        }
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
}, Jw = Qw, tT = { class: "" }, eT = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, sT = { class: "row" }, nT = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, iT = { class: "badge bg-dark text-light fw-light mx-1" }, rT = { class: "badge bg-dark text-light fw-light mx-1" }, oT = ["src"], aT = { class: "row g-1" }, lT = { class: "col-md-6" }, cT = { class: "col-md-6" }, uT = { class: "col-md-6" }, hT = ["href"], dT = {
  key: 1,
  class: "row g-2 mb-1"
}, fT = { key: 0 }, pT = { class: "table table-sm table-responsive table-borderless" }, gT = { class: "align-middle text-center ps-0" }, mT = { class: "align-middle px-0" }, bT = { class: "input-group border rounded" }, yT = {
  key: 0,
  class: "fs-5 ms-2"
}, vT = {
  key: 1,
  class: "fs-5 ms-2"
}, _T = {
  key: 2,
  class: "fs-5 ms-2"
}, ET = ["onUpdate:modelValue", "onInput"], wT = {
  key: 3,
  class: "mx-1"
}, TT = ["href"], AT = ["src", "alt"], NT = ["src", "alt"], OT = { class: "dropdown" }, CT = { class: "dropdown-menu" }, ST = ["onClick"], LT = { key: 0 }, kT = ["onClick"], xT = { key: 1 }, IT = { class: "dropdown-item py-0 d-flex justify-content-between" }, RT = { key: 2 }, DT = { class: "dropdown-item py-0 d-flex justify-content-between" }, $T = ["innerHTML"], MT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, qT = { key: 0 }, BT = { key: 1 }, PT = { class: "dropdown-item py-0 d-flex justify-content-between" }, jT = { class: "text-muted fw-light me-4" }, VT = { class: "text-primary" }, UT = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, FT = { class: "dropdown-item py-0 d-flex justify-content-between" }, HT = { class: "text-muted fw-light me-1" }, WT = {
  key: 0,
  class: "text-primary"
}, zT = ["innerHTML"], KT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, GT = { key: 3 }, YT = { class: "dropdown-item py-0 d-flex justify-content-between" }, XT = { class: "dropdown-item py-0 d-flex justify-content-between" }, ZT = { class: "text-muted fw-light me-3" }, QT = ["innerHTML"], JT = { class: "dropdown-item py-0 d-flex justify-content-between" }, tA = { class: "text-muted fw-light me-3" }, eA = { class: "vsa-image-container h-100 position-relative border p-1 rounded" }, sA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, nA = {
  key: 1,
  class: "vsa-image-frame mb-auto text-center"
}, iA = ["src", "alt"], rA = {
  key: 2,
  class: "display-3 w-100 text-center mb-auto"
}, oA = ["onUpdate:modelValue", "onInput"], aA = { class: "dropdown rounded-bottom border w-100" }, lA = { class: "dropdown-menu" }, cA = ["onClick"], uA = { key: 0 }, hA = ["onClick"], dA = { key: 1 }, fA = { class: "dropdown-item py-0 d-flex justify-content-between" }, pA = { key: 2 }, gA = { class: "dropdown-item py-0 d-flex justify-content-between" }, mA = ["innerHTML"], bA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, yA = { key: 0 }, vA = { key: 1 }, _A = { class: "dropdown-item py-0 d-flex justify-content-between" }, EA = { class: "text-muted fw-light me-4" }, wA = { class: "text-primary" }, TA = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, AA = { class: "dropdown-item py-0 d-flex justify-content-between" }, NA = { class: "text-muted fw-light me-1" }, OA = {
  key: 0,
  class: "text-primary"
}, CA = ["innerHTML"], SA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, LA = { key: 3 }, kA = { class: "dropdown-item py-0 d-flex justify-content-between" }, xA = { class: "dropdown-item py-0 d-flex justify-content-between" }, IA = { class: "text-muted fw-light me-3" }, RA = ["innerHTML"], DA = { class: "dropdown-item py-0 d-flex justify-content-between" }, $A = { class: "text-muted fw-light me-3" }, MA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, qA = { class: "row g-1" }, BA = { class: "col-12 d-flex align-items-center justify-content-center" }, PA = ["for"], jA = { key: 0 }, VA = { key: 0 }, UA = { class: "" }, FA = { class: "" }, HA = {
  key: 1,
  class: "fs-6"
}, WA = {
  key: 0,
  class: "bi bi-list-ol"
}, zA = {
  key: 1,
  class: "bi bi-grid"
}, KA = ["disabled"], GA = { class: "col-12 text-center" }, YA = { key: 0 }, XA = ["id", "accept"];
function ZA(s, t, e, n, i, r) {
  return b(), y("div", tT, [
    f("div", {
      class: R(["vsa-upload", { wait: s.wait }])
    }, [
      s.editfile && s.editfile.presets ? (b(), y("div", eT, [
        f("div", sT, [
          (b(!0), y(W, null, K(s.editfile.types, (o, c) => (b(), y("div", {
            class: "col-md-3",
            key: c
          }, [
            f("span", nT, O(o.extension), 1),
            f("span", iT, O(o.width) + " x " + O(o.height), 1),
            f("span", rT, "~" + O(s.roundFileSize(o.bytes)), 1),
            o ? (b(), y("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, oT)) : A("", !0)
          ]))), 128))
        ]),
        G(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o)
        }, null, 512), [
          [jt, s.editfile.title]
        ]),
        f("div", aT, [
          f("div", lT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          f("div", cT, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          f("div", uT, [
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
            }, " Download ", 8, hT)) : A("", !0)
          ])
        ])
      ])) : A("", !0),
      s.files && s.files.length ? (b(), y("div", dT, [
        s.params.ui === "list" ? (b(), y("div", fT, [
          f("table", pT, [
            f("tbody", null, [
              (b(!0), y(W, null, K(s.files, (o, c) => (b(), y("tr", { key: c }, [
                f("td", gT, [
                  f("small", null, O(c + 1), 1)
                ]),
                f("td", mT, [
                  f("div", bT, [
                    o.isDocument ? (b(), y("span", yT, [
                      f("i", {
                        class: R(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (b(), y("span", vT, t[9] || (t[9] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (b(), y("span", _T, t[10] || (t[10] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : A("", !0),
                    G(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (a) => o.title = a,
                      onInput: (a) => s.slug(o),
                      onKeydown: t[4] || (t[4] = ri(aa(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, ET), [
                      [jt, o.title]
                    ]),
                    !o.isDocument && o.types && o.types[s.params.thumbnail] ? (b(), y("span", wT, [
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
                        }, null, 8, AT)
                      ], 8, TT)) : (b(), y("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "",
                        src: o.types[s.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, NT))
                    ])) : A("", !0),
                    f("div", OT, [
                      t[24] || (t[24] = f("button", {
                        class: "btn btn-sm bg-light text-dark dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, null, -1)),
                      f("ul", CT, [
                        f("li", null, [
                          f("button", {
                            class: "dropdown-item text-danger py-1",
                            onClick: (a) => s.remove(c),
                            type: "button"
                          }, t[11] || (t[11] = [
                            f("i", { class: "bi bi-x-circle" }, null, -1),
                            U(" Remove ")
                          ]), 8, ST)
                        ]),
                        o.uploaded ? (b(), y("li", LT, [
                          f("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => s.download(c, s.params),
                            type: "button"
                          }, t[12] || (t[12] = [
                            f("i", { class: "bi bi-download" }, null, -1),
                            U(" Download ")
                          ]), 8, kT)
                        ])) : A("", !0),
                        t[22] || (t[22] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.original.width ? (b(), y("li", xT, [
                          f("small", IT, [
                            t[13] || (t[13] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            U(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                          ])
                        ])) : A("", !0),
                        o.isDocument ? A("", !0) : (b(), y("li", RT, [
                          f("small", DT, [
                            t[14] || (t[14] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            f("span", null, [
                              f("span", {
                                innerHTML: s.roundFileSize(o.original.bytes, !0)
                              }, null, 8, $T),
                              f("small", MT, O(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        (b(!0), y(W, null, K(o.types, (a, l) => (b(), y(W, { key: a }, [
                          o.isDocument ? A("", !0) : (b(), y("li", qT, t[15] || (t[15] = [
                            f("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (b(), y("li", BT, [
                            f("small", PT, [
                              f("span", jT, [
                                f("span", VT, O(l), 1),
                                t[16] || (t[16] = U(" resolution & crop"))
                              ]),
                              f("span", null, [
                                U(O(a.width) + " x " + O(a.height) + " ", 1),
                                a.crop ? (b(), y("small", UT, O(a.crop), 1)) : A("", !0)
                              ])
                            ])
                          ])) : A("", !0),
                          f("li", null, [
                            f("small", FT, [
                              f("span", HT, [
                                o.isDocument ? A("", !0) : (b(), y("span", WT, O(l), 1)),
                                t[17] || (t[17] = U(" size & extension"))
                              ]),
                              f("span", null, [
                                f("span", {
                                  class: R({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: s.roundFileSize(a.bytes, !0)
                                }, null, 10, zT),
                                f("small", KT, O(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[23] || (t[23] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.uploaded ? (b(), y("li", GT, [
                          f("small", YT, [
                            t[18] || (t[18] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[19] || (t[19] = U()),
                            f("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ])) : A("", !0),
                        f("li", null, [
                          f("small", XT, [
                            f("span", ZT, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                            t[20] || (t[20] = U()),
                            f("span", {
                              innerHTML: s.roundFileSize(o.bytes, !0)
                            }, null, 8, QT)
                          ])
                        ]),
                        f("li", null, [
                          f("small", JT, [
                            f("span", tA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                            t[21] || (t[21] = U()),
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
          f("div", eA, [
            o.loaded ? (b(), y("div", sA, [
              A("", !0),
              o.types && o.types[s.params.thumbnail] ? (b(), y("div", nA, [
                f("img", {
                  class: "img-fluid",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, iA)
              ])) : A("", !0),
              o.isDocument ? (b(), y("div", rA, [
                f("i", {
                  class: R(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : A("", !0),
              G(f("input", {
                required: "text",
                class: "form-control rounded-0 rounded-top py-1 px-2 fw-light",
                "onUpdate:modelValue": (a) => o.title = a,
                onInput: (a) => s.slug(o),
                onKeydown: t[5] || (t[5] = ri(aa(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, oA), [
                [jt, o.title]
              ]),
              f("div", aA, [
                t[41] || (t[41] = f("button", {
                  class: "btn btn-sm bg-light text-dark dropdown-toggle w-100 h-100",
                  type: "button",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, null, -1)),
                f("ul", lA, [
                  f("li", null, [
                    f("button", {
                      class: "dropdown-item text-danger py-1",
                      onClick: (a) => s.remove(c),
                      type: "button"
                    }, t[28] || (t[28] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1),
                      U(" Remove ")
                    ]), 8, cA)
                  ]),
                  o.uploaded ? (b(), y("li", uA, [
                    f("button", {
                      class: "dropdown-item text-primary py-1",
                      onClick: (a) => s.download(c, s.params),
                      type: "button"
                    }, t[29] || (t[29] = [
                      f("i", { class: "bi bi-download" }, null, -1),
                      U(" Download ")
                    ]), 8, hA)
                  ])) : A("", !0),
                  t[39] || (t[39] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.original.width ? (b(), y("li", dA, [
                    f("small", fA, [
                      t[30] || (t[30] = f("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                      U(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                    ])
                  ])) : A("", !0),
                  o.isDocument ? A("", !0) : (b(), y("li", pA, [
                    f("small", gA, [
                      t[31] || (t[31] = f("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                      f("span", null, [
                        f("span", {
                          innerHTML: s.roundFileSize(o.original.bytes, !0)
                        }, null, 8, mA),
                        f("small", bA, O(o.original.extension), 1)
                      ])
                    ])
                  ])),
                  (b(!0), y(W, null, K(o.types, (a, l) => (b(), y(W, { key: a }, [
                    o.isDocument ? A("", !0) : (b(), y("li", yA, t[32] || (t[32] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))),
                    o.original.width ? (b(), y("li", vA, [
                      f("small", _A, [
                        f("span", EA, [
                          f("span", wA, O(l), 1),
                          t[33] || (t[33] = U(" resolution & crop"))
                        ]),
                        f("span", null, [
                          U(O(a.width) + " x " + O(a.height) + " ", 1),
                          a.crop ? (b(), y("small", TA, O(a.crop), 1)) : A("", !0)
                        ])
                      ])
                    ])) : A("", !0),
                    f("li", null, [
                      f("small", AA, [
                        f("span", NA, [
                          o.isDocument ? A("", !0) : (b(), y("span", OA, O(l), 1)),
                          t[34] || (t[34] = U(" size & extension"))
                        ]),
                        f("span", null, [
                          f("span", {
                            class: R({ "text-danger": a.bytes > o.original.bytes }),
                            innerHTML: s.roundFileSize(a.bytes, !0)
                          }, null, 10, CA),
                          f("small", SA, O(a.extension), 1)
                        ])
                      ])
                    ])
                  ], 64))), 128)),
                  t[40] || (t[40] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.uploaded ? (b(), y("li", LA, [
                    f("small", kA, [
                      t[35] || (t[35] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                      t[36] || (t[36] = U()),
                      f("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                    ])
                  ])) : A("", !0),
                  f("li", null, [
                    f("small", xA, [
                      f("span", IA, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                      t[37] || (t[37] = U()),
                      f("span", {
                        innerHTML: s.roundFileSize(o.bytes, !0)
                      }, null, 8, RA)
                    ])
                  ]),
                  f("li", null, [
                    f("small", DA, [
                      f("span", $A, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                      t[38] || (t[38] = U()),
                      f("span", null, O(o.slug), 1)
                    ])
                  ])
                ])
              ])
            ])) : (b(), y("div", MA, t[42] || (t[42] = [
              f("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : A("", !0),
      f("div", qA, [
        f("div", BA, [
          f("label", {
            for: s.uploadId,
            class: R([{ "disabled bg-secondary": s.files && s.params.limit <= s.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            s.files && s.params.limit > s.files.length ? (b(), y("span", jA, [
              t[46] || (t[46] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              U(" " + O(s.params.text) + " ", 1),
              s.params.limit ? (b(), y("small", VA, [
                t[43] || (t[43] = U(" ( ")),
                f("strong", UA, O(s.files.length), 1),
                t[44] || (t[44] = U(" / ")),
                f("span", FA, O(s.params.limit), 1),
                t[45] || (t[45] = U(" ) "))
              ])) : A("", !0)
            ])) : (b(), y("span", HA, t[47] || (t[47] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              U(" You've reached the upload limit ")
            ])))
          ], 10, PA),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (o) => s.toggleView())
          }, [
            s.params.ui != "list" ? (b(), y("i", WA)) : A("", !0),
            s.params.ui == "list" ? (b(), y("i", zA)) : A("", !0)
          ]),
          f("button", {
            disabled: !s.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (o) => s.resetConfirm())
          }, t[48] || (t[48] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, KA)
        ]),
        f("div", GA, [
          f("small", null, [
            s.params.accept ? (b(), y("div", YA, [
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
      }, null, 40, XA)) : A("", !0)
    ], 2)
  ]);
}
const QA = /* @__PURE__ */ Fs(Jw, [["render", ZA], ["__scopeId", "data-v-074cafd8"]]), JA = {
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
    modelValue(s) {
      this.item = this.modelValue;
    }
  },
  methods: {
    getValueOrFunction(s, t) {
      return yh(s, t, this.settings, this);
    },
    translate(s, t, e) {
      return Mr(s, this.settings.translate, t, e || this.settings.language);
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
      Kb(s, t);
    },
    arrayItemMoveDown(s, t) {
      Gb(s, t);
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
    HtmlEditor: Zw,
    FileUpload: QA
  }
}, tN = JA, eN = { class: "row m-1" }, sN = { class: "form-row-title mb-4 fw-lighter" }, nN = {
  key: 0,
  class: "row"
}, iN = { class: "form-group pb-3" }, rN = { key: 0 }, oN = {
  key: 0,
  class: "badge text-secondary fw-light"
}, aN = ["for", "innerHTML"], lN = { class: "input-group" }, cN = ["innerHTML"], uN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], hN = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], dN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], fN = {
  key: 4,
  class: "form-check"
}, pN = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "readonly", "required"], gN = ["for"], mN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], bN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], yN = ["value"], vN = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], _N = ["innerHTML"], EN = { key: 3 }, wN = ["type", "required", "placeholder", "onUpdate:modelValue"], TN = { class: "col-2 text-nowrap text-end" }, AN = ["onClick"], NN = ["onClick"], ON = ["onClick"], CN = { key: 0 }, SN = { class: "row g-1 d-flex align-items-center justify-content-between" }, LN = ["type", "placeholder", "onUpdate:modelValue"], kN = { class: "col-2" }, xN = ["onClick"], IN = { key: 4 }, RN = { key: 0 }, DN = ["for"], $N = ["name", "id", "onUpdate:modelValue"], MN = ["onClick"], qN = {
  key: 5,
  class: "p-1"
}, BN = ["innerHTML"];
function PN(s, t, e, n, i, r) {
  const o = yn("HtmlEditor"), c = yn("FileUpload");
  return b(), y("div", eN, [
    (b(!0), y(W, null, K(s.settings.form.groups, (a) => (b(), y("div", {
      key: a,
      class: R([a.class ? a.class : "col-md-12"])
    }, [
      f("h2", sN, O(a.title), 1),
      s.item && a.fields ? (b(), y("div", nN, [
        (b(!0), y(W, null, K(a.fields, (l) => (b(), y("div", {
          class: R([s.getValueOrFunction(l.class ? l.class : "col-md-12"), "input_type_" + l.type]),
          key: l
        }, [
          f("div", iN, [
            l.label !== null ? (b(), y("span", rN, [
              ["html", "image", "upload"].indexOf(l.type) >= 0 ? (b(), y("label", {
                key: 0,
                class: R([{ required: l.required }, "form-label text-secondary mb-1"])
              }, [
                U(O(l.label ? l.label : s.translate(l.name)) + " ", 1),
                l.maxlength ? (b(), y("span", oN, O(s.item[l.name] ? s.item[l.name].length : 0) + " / " + O(l.maxlength), 1)) : A("", !0)
              ], 2)) : (b(), y("label", {
                key: 1,
                class: R([{ required: l.required }, "form-label text-secondary mb-1"]),
                for: s.formId + "_" + l.name,
                innerHTML: s.getValueOrFunction(l.label ? l.label : s.translate(l.name), { field: l, item: s.item })
              }, null, 10, aN))
            ])) : A("", !0),
            f("div", lN, [
              l.prefix ? (b(), y("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: l.prefix
              }, null, 8, cN)) : A("", !0),
              l.type == "text" ? G((b(), y("input", {
                key: 1,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "text",
                name: l.name,
                id: s.formId + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, uN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "number" ? G((b(), y("input", {
                key: 2,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "number",
                name: l.name,
                id: s.formId + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                min: l.min,
                max: l.max,
                step: l.step,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, hN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "date" ? G((b(), y("input", {
                key: 3,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "date",
                name: l.name,
                id: s.formId + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                readonly: l.readonly,
                required: l.required
              }, null, 10, dN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "checkbox" ? (b(), y("div", fN, [
                G(f("input", {
                  class: R(["form-check-input", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                  type: "checkbox",
                  name: l.name,
                  id: s.formId + "_" + l.name,
                  "true-value": l.true != null ? l.true : !0,
                  "false-value": l.false != null ? l.false : !1,
                  "onUpdate:modelValue": (h) => s.item[l.name] = h,
                  readonly: l.readonly,
                  required: l.required
                }, null, 10, pN), [
                  [$d, s.item[l.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: s.formId + "_" + l.name
                }, O(l.checkbox), 9, gN)
              ])) : A("", !0),
              l.type == "email" ? G((b(), y("input", {
                key: 5,
                autocomplete: "on",
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                type: "email",
                name: l.name,
                id: s.formId + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, null, 10, mN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.type == "select" && (!l.relation || l.relation && l.relation.items) ? G((b(), y("select", {
                key: 6,
                class: R(["form-select", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                name: l.name,
                id: s.formId + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                readonly: l.readonly,
                required: l.required
              }, [
                (b(!0), y(W, null, K(s.selectOptions(l.options, l), (h) => (b(), y("option", {
                  class: R(s.getValueOrFunction(l.optionclass ? l.optionclass : "", { field: l, item: s.item, option: h })),
                  key: h,
                  value: h.value
                }, O(h.label ? h.label : h.value), 11, yN))), 128))
              ], 10, bN)), [
                [Re, s.item[l.name]]
              ]) : A("", !0),
              l.type == "textarea" ? G((b(), y("textarea", {
                key: 7,
                class: R(["form-control", s.getValueOrFunction(l.inputclass ? l.inputclass : "", { field: l, item: s.item })]),
                name: l.name,
                id: s.formId + "_" + l.name,
                "onUpdate:modelValue": (h) => s.item[l.name] = h,
                rows: l.rows,
                minlength: l.minlength,
                maxlength: l.maxlength,
                placeholder: l.placeholder ? l.placeholder : "",
                readonly: l.readonly,
                required: l.required
              }, "              ", 10, vN)), [
                [jt, s.item[l.name]]
              ]) : A("", !0),
              l.suffix ? (b(), y("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: l.suffix
              }, null, 8, _N)) : A("", !0)
            ]),
            l.type == "html" ? (b(), pr(o, {
              key: 1,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: R([l.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : A("", !0),
            l.type == "image" || l.type == "upload" ? (b(), pr(c, {
              key: 2,
              modelValue: s.item[l.name],
              "onUpdate:modelValue": (h) => s.item[l.name] = h,
              class: R([l.class]),
              field: l,
              settings: s.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : A("", !0),
            l.type == "list" ? (b(), y("div", EN, [
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
                  }, null, 8, wN), [
                    [fn, s.item[l.name][p][m]]
                  ])
                ], 2))), 128)),
                f("div", TN, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (g) => s.arrayItemMoveUp(s.item[l.name], p)
                  }, t[0] || (t[0] = [
                    f("i", { class: "bi bi-arrow-up" }, null, -1)
                  ]), 8, AN),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (g) => s.arrayItemMoveDown(s.item[l.name], p + 1)
                  }, t[1] || (t[1] = [
                    f("i", { class: "bi bi-arrow-down" }, null, -1)
                  ]), 8, NN),
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-danger p-1 me-1",
                    onClick: (g) => s.arrayRemoveItem(s.item[l.name], p)
                  }, t[2] || (t[2] = [
                    f("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, ON)
                ])
              ]))), 128)),
              s.item[l.name] && s.item[l.name].length ? (b(), y("hr", CN)) : A("", !0),
              f("div", SN, [
                (b(!0), y(W, null, K(l.elements, (h) => (b(), y("div", {
                  key: h,
                  class: R(h.class || "col")
                }, [
                  G(f("input", {
                    type: h.type,
                    placeholder: h.placeholder || h.name,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (p) => h.value = p
                  }, null, 8, LN), [
                    [fn, h.value]
                  ])
                ], 2))), 128)),
                f("div", kN, [
                  f("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-primary my-1 w-100",
                    onClick: (h) => s.arrayAddNewItem(l, s.item)
                  }, t[3] || (t[3] = [
                    f("i", { class: "bi bi-plus" }, null, -1)
                  ]), 8, xN)
                ])
              ])
            ])) : A("", !0),
            l.type == "addresses" ? (b(), y("span", IN, [
              s.item[l.name] ? (b(), y("div", RN, [
                (b(!0), y(W, null, K(s.item[l.name], (h) => (b(), y("div", { key: h }, [
                  U(O(h) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: s.formId + "_" + l.name
                  }, O(l.label), 9, DN),
                  G(f("input", {
                    class: "form-control",
                    type: "text",
                    name: l.name,
                    id: s.formId + "_" + l.name,
                    "onUpdate:modelValue": (p) => h.country = p
                  }, null, 8, $N), [
                    [jt, h.country]
                  ])
                ]))), 128))
              ])) : A("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (h) => s.insertAddress(l.name)
              }, " Add ", 8, MN)
            ])) : A("", !0),
            l.description ? (b(), y("div", qN, [
              f("i", {
                class: "text-muted",
                innerHTML: l.description
              }, null, 8, BN)
            ])) : A("", !0)
          ])
        ], 2))), 128))
      ])) : A("", !0)
    ], 2))), 128))
  ]);
}
const jN = /* @__PURE__ */ Fs(tN, [["render", PN], ["__scopeId", "data-v-a6576df3"]]), VN = {
  props: {
    modelValue: Object,
    modalWindow: Object,
    saveItem: Function,
    deleteItem: Function,
    reloadTable: Function,
    fetchRelation: Function,
    group: Object,
    formId: String,
    settings: Object
  },
  data: function() {
    return {
      item: {},
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
    let s = this.item[this.settings.pkey];
    this.fetchItem(s, this.settings);
  },
  watch: {
    modelValue(s) {
      this.item = this.modelValue;
    }
  },
  methods: {
    translate(s, t, e) {
      return Mr(s, this.settings.translate, t, e || this.settings.language);
    },
    formWait(s) {
      this.ui.wait.form = !0, this.ui.block.form = s;
    },
    formNoWait() {
      this.ui.wait.form = !1, this.ui.block.form = !1;
    },
    addFormMessage(s, t, e, n) {
      this.addMessage("form", s, t, e, n);
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
      let s = this.item[this.settings.pkey];
      this.fetchItem(s);
    },
    async fetchItem(s, t) {
      try {
        if (t = t || this.settings, !t.form || !t.form.api)
          return !1;
        this.formWait(!0);
        const e = await fetch(
          As("GET", t.form.api, s),
          Ts("GET", t.api)
        ).catch((o) => {
        }), n = await si(e);
        if (ni(e, n.data, "form") || !n.data)
          return this.formNoWait(), !1;
        t.form.default && (n.data = Object.assign({}, t.form.default, n.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(n.data, e);
        let r;
        t.form.api.input.item ? r = typeof t.form.api.input.item == "string" ? n.data[t.form.api.input.item] : t.form.api.input.item(n.data, e) : r = n.data;
        for (let o of t.form.groups)
          for (let c of o.fields)
            c.relation && t.relations[c.relation.entity] && (c.relation = $r(t.relations[c.relation.entity], c.relation), await this.fetchRelation(c, [r]));
        this.item = vr(r), this.itemOriginal = Object.assign({}, r), this.formNoWait();
      } catch (e) {
        console.error(e), this.formNoWait();
      }
    },
    async submitAndClose() {
      let s = this.$refs.form;
      s.checkValidity() ? this.submitItem(!0) : s.reportValidity();
    },
    async submitItem(s) {
      this.saveItem(this.item, (t) => {
        let e = {};
        this.settings.form.api.input.item ? e = typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t, response) : e = t, e && (this.addFormMessage(
          this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${e[this.settings.pkey]} )</small>`,
          2500
        ), this.item = vr(e), this.itemOriginal = Object.assign({}, e)), s === !0 && this.modalWindow.hide(), this.reloadTable();
      }, (t) => {
        console.log(t), this.addFormMessage(t.message, 14500, "danger");
      });
    }
  },
  components: {
    VuAdminFormGroup: jN
  }
}, UN = VN, FN = ["id", "data-bs-theme"], HN = { class: "modal-header" }, WN = { class: "modal-title" }, zN = ["innerHTML"], KN = { key: 1 }, GN = { key: 2 }, YN = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, XN = {
  key: 0,
  class: "d-inline-block ms-3 mt-1"
}, ZN = ["innerHTML"], QN = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, JN = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, tO = ["disabled"], eO = ["disabled"], sO = {
  key: 0,
  class: "d-inline-block m-1"
}, nO = { class: "dropdown d-inline-block" }, iO = ["innerHTML"], rO = { class: "dropdown-menu text-start" }, oO = { class: "me-2 text-muted" }, aO = ["innerHTML"], lO = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, cO = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, uO = {
  key: 1,
  class: "modal-body custom-scroll"
}, hO = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, dO = ["disabled"], fO = ["disabled"], pO = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, gO = {
  type: "submit",
  class: "btn btn-primary m-1"
}, mO = {
  key: 3,
  class: "bg-light text-dark"
};
function bO(s, t, e, n, i, r) {
  const o = yn("VuAdminFormGroup");
  return s.item ? (b(), y("form", {
    key: 0,
    ref: "form",
    id: s.formId,
    class: R(["form", [s.settings.form.class, { wait: s.ui.wait.form }]]),
    onSubmit: t[11] || (t[11] = aa((...c) => s.submitItem && s.submitItem(...c), ["prevent"])),
    "data-bs-theme": [s.settings.theme]
  }, [
    f("div", {
      class: R(["vua-overlay", { blocked: s.ui.block.form }])
    }, null, 2),
    f("div", HN, [
      f("h5", WN, [
        s.settings.form.title && typeof s.settings.form.title == "function" ? (b(), y("span", {
          key: 0,
          innerHTML: s.settings.form.title(s.item, s.settings)
        }, null, 8, zN)) : A("", !0),
        s.settings.form.title && typeof s.settings.form.title == "string" ? (b(), y("span", KN, O(s.translate(s.settings.form.title)), 1)) : A("", !0),
        s.settings.form.title ? A("", !0) : (b(), y("span", GN, O(s.translate("Edit")), 1)),
        s.item[s.settings.pkey] ? (b(), y("small", YN, [
          t[12] || (t[12] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          U(" " + O(s.item[s.settings.pkey]), 1)
        ])) : A("", !0)
      ]),
      s.message.form ? (b(), y("span", XN, [
        f("span", {
          class: R(["text-" + s.message.form.priority])
        }, [
          t[13] || (t[13] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: s.message.form.msg
          }, null, 8, ZN)
        ], 2)
      ])) : A("", !0),
      G(f("span", QN, t[14] || (t[14] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ns, s.ui.wait.form]
      ]),
      t[15] || (t[15] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    s.item ? (b(), y("div", JN, [
      f("div", null, [
        f("button", {
          type: "button",
          class: "btn btn-sm btn-secondary m-1",
          onClick: t[0] || (t[0] = (c) => s.reloadItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[16] || (t[16] = f("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
          U(" " + O(s.translate("Reload")), 1)
        ], 8, tO),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-warning m-1",
          onClick: t[1] || (t[1] = (c) => s.createItem())
        }, [
          t[17] || (t[17] = f("i", { class: "bi bi-plus-circle" }, null, -1)),
          U(" " + O(s.translate("New")), 1)
        ]),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-warning m-1",
          onClick: t[2] || (t[2] = (c) => s.copyItem())
        }, [
          t[18] || (t[18] = f("i", { class: "bi bi-copy" }, null, -1)),
          U(" " + O(s.translate("Copy")), 1)
        ]),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-danger m-1",
          onClick: t[3] || (t[3] = (c) => s.deleteItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[19] || (t[19] = f("i", { class: "bi bi-trash" }, null, -1)),
          U(" " + O(s.translate("Delete")), 1)
        ], 8, eO)
      ]),
      f("div", null, [
        s.messages.form.length ? (b(), y("div", sO, [
          f("div", nO, [
            f("button", {
              class: R(["btn btn-sm dropdown-toggle", ["btn-" + s.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: s.messages.form.length + " " + (s.messages.form.length > 1 ? s.translate("messages") : s.translate("message"))
            }, null, 10, iO),
            f("ul", rO, [
              (b(!0), y(W, null, K(s.messages.form, (c) => (b(), y("li", { key: c }, [
                f("span", {
                  class: R(["dropdown-item", ["text-" + c.priority]])
                }, [
                  f("small", oO, O(c.datetime), 1),
                  f("span", {
                    innerHTML: c.msg
                  }, null, 8, aO)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : A("", !0),
        f("button", lO, [
          t[20] || (t[20] = f("i", { class: "bi bi-x" }, null, -1)),
          U(" " + O(s.translate("Close")), 1)
        ]),
        f("button", cO, [
          t[21] || (t[21] = f("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save")), 1)
        ]),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-success m-1",
          onClick: t[4] || (t[4] = (...c) => s.submitAndClose && s.submitAndClose(...c))
        }, [
          t[22] || (t[22] = f("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save and close")), 1)
        ])
      ])
    ])) : A("", !0),
    s.settings.form ? (b(), y("div", uO, [
      s.settings.form.visible && s.settings.form.groups ? (b(), pr(o, {
        key: 0,
        modelValue: s.item,
        "onUpdate:modelValue": t[5] || (t[5] = (c) => s.item = c),
        formid: s.formId,
        settings: s.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : A("", !0)
    ])) : A("", !0),
    s.item ? (b(), y("div", hO, [
      f("div", null, [
        f("button", {
          type: "button",
          class: "btn btn-secondary m-1",
          onClick: t[6] || (t[6] = (c) => s.reloadItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[23] || (t[23] = f("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
          U(" " + O(s.translate("Reload")), 1)
        ], 8, dO),
        f("button", {
          type: "button",
          class: "btn btn-outline-warning m-1",
          onClick: t[7] || (t[7] = (c) => s.createItem())
        }, [
          t[24] || (t[24] = f("i", { class: "bi bi-plus-circle" }, null, -1)),
          U(" " + O(s.translate("New")), 1)
        ]),
        f("button", {
          type: "button",
          class: "btn btn-outline-warning m-1",
          onClick: t[8] || (t[8] = (c) => s.copyItem())
        }, [
          t[25] || (t[25] = f("i", { class: "bi bi-copy" }, null, -1)),
          U(" " + O(s.translate("Copy")), 1)
        ]),
        f("button", {
          type: "button",
          class: "btn btn-danger m-1",
          onClick: t[9] || (t[9] = (c) => s.deleteItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[26] || (t[26] = f("i", { class: "bi bi-trash" }, null, -1)),
          U(" " + O(s.translate("Delete")), 1)
        ], 8, fO)
      ]),
      f("div", null, [
        f("button", pO, [
          t[27] || (t[27] = f("i", { class: "bi bi-x" }, null, -1)),
          U(" " + O(s.translate("Close")), 1)
        ]),
        f("button", gO, [
          t[28] || (t[28] = f("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save")), 1)
        ]),
        f("button", {
          type: "button",
          class: "btn btn-success m-1",
          onClick: t[10] || (t[10] = (...c) => s.submitAndClose && s.submitAndClose(...c))
        }, [
          t[29] || (t[29] = f("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save and close")), 1)
        ])
      ])
    ])) : A("", !0),
    s.settings.debug ? (b(), y("pre", mO, "        " + O(s.item) + `
    `, 1)) : A("", !0)
  ], 42, FN)) : A("", !0);
}
const yO = /* @__PURE__ */ Fs(UN, [["render", bO], ["__scopeId", "data-v-392974e5"]]), vO = {
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
      return Mr(s, this.settings.translate, t, e || this.settings.language);
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
}, _O = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, EO = { class: "dropdown d-inline-block m-1" }, wO = {
  type: "button",
  class: "btn btn-sm btn-secondary dropdown-toggle",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, TO = { class: "mx-1" }, AO = { key: 0 }, NO = { class: "dropdown-menu text-end" }, OO = ["onClick"], CO = { class: "ms-2" }, SO = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, LO = {
  key: 1,
  class: "bi bi-circle ms-2"
}, kO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, xO = { class: "pagination pagination-sm m-1" }, IO = { class: "page-item" }, RO = { "aria-hidden": "true" }, DO = { class: "page-item" }, $O = { "aria-hidden": "true" }, MO = ["onClick"], qO = { class: "page-item" }, BO = { "aria-hidden": "true" }, PO = { "aria-hidden": "true" }, jO = {
  key: 0,
  class: "page-item"
}, VO = { "aria-hidden": "true" };
function UO(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? A("", !0) : (b(), y("nav", _O, [
    f("div", null, [
      f("div", EO, [
        f("button", wO, [
          G(f("span", TO, [
            f("strong", null, O(e.config.pagination.from) + "-" + O(e.config.pagination.to), 1),
            e.config.pagination.total ? (b(), y("span", AO, " / " + O(e.config.pagination.total), 1)) : A("", !0)
          ], 512), [
            [Ns, e.config.pagination.from > 0]
          ])
        ]),
        f("ul", NO, [
          f("li", null, [
            (b(!0), y(W, null, K(e.config.pagination.limits, (o) => (b(), y("span", {
              class: R(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (c) => r.setPageLimit(o)
            }, [
              f("strong", null, O(o), 1),
              f("small", CO, O(r.translate("row")) + "/" + O(r.translate("page")), 1),
              e.config.pagination.limit == o ? (b(), y("i", SO)) : A("", !0),
              e.config.pagination.limit != o ? (b(), y("i", LO)) : A("", !0)
            ], 10, OO))), 128))
          ])
        ])
      ]),
      G(f("div", kO, t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ns, e.ui && e.ui.wait.table]
      ])
    ]),
    f("ul", xO, [
      f("li", IO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", RO, O(r.translate("First")), 1)
        ], 2)
      ]),
      f("li", DO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{  translate('Prev')  }}"
        }, [
          f("span", $O, O(r.translate("Prev")), 1)
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
        }, O(o), 11, MO)
      ]))), 128)),
      f("li", qO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", BO, [
            f("span", PO, O(r.translate("Next")), 1)
          ])
        ], 2)
      ]),
      e.config.pagination.total ? (b(), y("li", jO, [
        f("a", {
          class: R(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", VO, O(r.translate("Last")), 1)
        ], 2)
      ])) : A("", !0)
    ])
  ]));
}
const FO = /* @__PURE__ */ Fs(vO, [["render", UO], ["__scopeId", "data-v-5ba01873"]]), gu = qb(), HO = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminForm: yO,
    VuAdminTablePagination: FO
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
    let s = Math.round(Math.random() * 1e5);
    this.formId = "form_" + this.settings.entity + "_" + s, this.modalId = "modal_" + this.settings.entity + "_" + s, this.resetTable();
  },
  mounted() {
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new xs(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (s) => {
      this.settings.form.visible = !1;
    }), this.modalElement.addEventListener("show.bs.modal", (s) => {
      this.settings.form.visible = !0;
    }), this.listenEvent();
  },
  methods: {
    sendEvent(s, t, e) {
      gu.emit(s + "-" + t, {
        from: this.settings.entity,
        payload: e
      });
    },
    listenEvent() {
      gu.on(`EDIT-${this.settings.entity}`, (s) => {
        this.editItem(s.payload.item);
      });
    },
    tableWait(s) {
      this.ui.wait.table = !0, this.ui.block.table = s;
    },
    tableNoWait() {
      this.ui.wait.table = !1, this.ui.block.table = !1;
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
      return yh(s, t, this.settings, this);
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
    tableAction(s, t) {
      t.$event && t.$event.stopPropagation();
      let e = s.action ? s.action : s.click ? s.click : null;
      if (e && typeof e != "string") {
        e(t.item, t, this);
        return;
      }
      switch (e) {
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
          this.tableRowSave(t.item, s.params);
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
            s.params
          );
          break;
        case "FORM_CREATE":
          this.createItem(t.item, s.params);
          break;
        case "TABLE_ROW_DELETE":
        case "FORM_DELETE":
          this.deleteItem(t.item, s.params);
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
    async fetchTableRelations(s) {
      for (let t of this.settings.table.columns)
        if (t.relation && this.settings.relations[t.relation.entity]) {
          let e = [];
          t.relation = $r(this.settings.relations[t.relation.entity], t.relation);
          for (let n of s)
            n[t.relation.local] && e.push(n[t.relation.local]);
          t.relation.ids = Ub(e), await this.fetchRelation(t, s);
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
    async fetchTable(s) {
      try {
        this.tableWait(!0), s = s || {}, s.filter = this.getFiltersForFetch(), s.order = this.getOrdersForFetch(), this.config.pagination.page !== null && this.config.pagination.page !== void 0 && (s.page = this.config.pagination.page), this.config.pagination.limit !== null && this.config.pagination.limit !== void 0 && (s.limit = this.config.pagination.limit), s.page && s.limit && (s.skip = (s.page - 1) * s.limit);
        let t = await this.fetchItems(this.settings, s, this.config);
        if (t === !1)
          return this.tableNoWait(), !1;
        await this.fetchTableRelations(t), this.items = t, this.tableNoWait();
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger"), this.tableNoWait();
      }
    },
    async fetchItems(s, t, e) {
      s.events && s.events.beforeItemsLoad && s.events.beforeItemsLoad(t, s);
      const n = await fetch(
        As("GET", s.table.api, null, t),
        Ts("GET", s.table.api)
      ), i = await si(n), r = ni(n, i.data);
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
      let c = Bb(o);
      return this.convertIn(s.table.columns, c), c;
    },
    async fetchRelation(s, t) {
      try {
        let e = s.relation.params ? s.relation.params : {};
        if (s.relation.columns && (e.columns = JSON.stringify(s.relation.columns)), !s.relation.ids || !s.relation.ids.length)
          return;
        let i = (typeof s.relation.ids[0] == "string" ? "text" : "number") === "string" ? "'" + s.relation.ids.join("','") + "'" : s.relation.ids.join(","), r = {};
        r[s.relation.foreign] = {
          type: "array",
          value: i,
          operator: "IN"
        }, e.filter = JSON.stringify(r);
        let o = window.VuEntities[s.relation.entity];
        s.relation.settings = o, Yb(e, {
          column: s,
          settings: o
        });
        const c = await fetch(
          As("GET", o.api, null, e),
          Ts("GET", o.api)
        );
        if (c.status !== 200)
          throw new Error(
            this.translate("Response status: " + c.status)
          );
        const a = await si(c);
        if (ni(c, a.data) || !a.data)
          return;
        if (o.api.input.items ? s.relation.items = typeof o.api.input.items == "string" ? a.data[o.api.input.items] : o.api.input.items(a.data, c) : s.relation.items = a.data, t && t[0])
          for (let h of t)
            h[s.relation.local] && (h[s.relation.entity] = s.relation.items.find(
              (p, g, m) => p[s.relation.foreign] === h[s.relation.local]
            ));
      } catch (e) {
        console.error(e.message);
      }
    },
    async editItem(s) {
      if (!this.settings.form || !this.settings.form.api)
        return !1;
      this.item = s, this.message.form = null, this.messages.form = [], this.modalWindow.show();
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
        r >= 0 && this.items.splice(r, 1), this.item && (this.item = {});
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
    // submitForm(item, onSuccess, onError, urlParams) {
    //   this.formWait(true);
    //   this.saveItem(item, () => {
    //   }, () => {
    //   }, urlParams);
    // },
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
    getColumnByName(s) {
      return this.settings.table.columns.find((t) => t.name === s);
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
    async saveItem(s, t, e, n) {
      try {
        n = n || {};
        let i = {}, r = s[this.settings.pkey];
        if (this.settings.form.api.output && this.settings.form.api.output.fields)
          for (let p in s)
            this.settings.form.api.output.fields.includes(p) && (i[p] = s[p]);
        else
          Object.assign(i, s);
        let o, c;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Pb(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, s), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let p = {};
          p[this.settings.form.api.output.item] = i, o = JSON.stringify(p);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const a = r ? "PUT" : "POST";
        c = await fetch(
          As(a, this.settings.form.api, r, n),
          Ts(a, this.settings.form.api, {
            body: o
          })
        );
        const l = await si(c), h = ni(c, l.data);
        if (h) {
          e && e(h, s, n, c);
          return;
        }
        if (l.error) {
          e && e(l.error, s, n, c);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(l.data, n), t && t(l.data, c);
      } catch (i) {
        e && e(i, s, n);
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
        }), n = await si(e), i = ni(e, n.data);
        if (this.tableNoWait(), i)
          return;
        s && s(n.data), this.reloadTable();
      } catch (t) {
        console.error(t.message), this.addTableMessage(t.message, 3500, "danger", t), this.tableNoWait();
      }
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
      s.multiple ? Fb(s.value, e) : s.value = s.value === e ? null : e, this.reloadTable();
    },
    dropdownSelectAll(s, t) {
      Hb(s, t), this.reloadTable();
    },
    dropdownSelectInvert(s, t) {
      Wb(s, t), this.reloadTable();
    },
    dropdownSelectClear(s) {
      typeof s != "object" ? s.value = null : zb(s), this.reloadTable();
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
        let i = jb(
          n,
          this.settings.table.exports[s.type].fields
        );
        Vb(i, this.settings.entity + ".csv");
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
      return Mr(s, this.settings.translate, t, e || this.settings.language);
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
}, WO = { key: 0 }, zO = ["data-bs-theme"], KO = { class: "vua-table-title" }, GO = { class: "d-flex align-items-center justify-content-between" }, YO = { class: "d-inline-block" }, XO = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, ZO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, QO = {
  key: 0,
  class: "d-inline-block"
}, JO = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, tC = ["innerHTML"], eC = { class: "dropdown d-inline-block" }, sC = ["innerHTML"], nC = { class: "dropdown-menu text-start" }, iC = { class: "me-2 text-muted" }, rC = ["innerHTML"], oC = ["onClick"], aC = {
  key: 1,
  class: "dropdown d-inline-block"
}, lC = { class: "mx-1" }, cC = { key: 0 }, uC = { class: "dropdown-menu" }, hC = ["onClick"], dC = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, fC = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, pC = { class: "badge text-secondary fw-normal" }, gC = {
  key: 2,
  class: "dropdown d-inline-block"
}, mC = { class: "mx-1" }, bC = { class: "dropdown-menu" }, yC = ["onClick"], vC = { class: "vua-table-header" }, _C = ["width"], EC = ["onClick"], wC = ["innerHTML"], TC = {
  key: 0,
  class: "bi bi-arrow-down"
}, AC = {
  key: 1,
  class: "bi bi-arrow-up"
}, NC = { key: 0 }, OC = ["disabled", "onClick"], CC = {
  key: 0,
  class: "vua-table-filter"
}, SC = ["width"], LC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, kC = { class: "bi bi-check-all" }, xC = { class: "bi bi-x-lg" }, IC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, RC = ["onUpdate:modelValue"], DC = ["disabled", "onClick"], $C = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, MC = ["onUpdate:modelValue", "disabled"], qC = { value: "=" }, BC = { value: ">" }, PC = { value: ">=" }, jC = { value: "<" }, VC = { value: "<=" }, UC = ["onUpdate:modelValue", "disabled"], FC = ["value"], HC = ["onUpdate:modelValue", "disabled", "min", "max"], WC = ["disabled", "onClick"], zC = { key: 3 }, KC = {
  key: 0,
  class: "dropdown"
}, GC = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, YC = { class: "dropdown-menu" }, XC = ["onClick"], ZC = {
  key: 0,
  class: "bi bi-check-square"
}, QC = {
  key: 1,
  class: "bi bi-square"
}, JC = { key: 0 }, t2 = { key: 1 }, e2 = ["onClick"], s2 = { key: 2 }, n2 = ["onClick"], i2 = { key: 3 }, r2 = ["onClick"], o2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, a2 = ["onUpdate:modelValue", "multiple"], l2 = ["value"], c2 = ["disabled", "onClick"], u2 = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, h2 = ["onUpdate:modelValue"], d2 = { value: "=" }, f2 = { value: ">" }, p2 = { value: ">=" }, g2 = { value: "<" }, m2 = { value: "<=" }, b2 = ["onUpdate:modelValue"], y2 = ["value"], v2 = ["type", "onUpdate:modelValue"], _2 = ["disabled", "onClick"], E2 = ["disabled", "onClick"], w2 = { class: "align-middle" }, T2 = ["data-label", "width", "onClick"], A2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, N2 = ["innerHTML"], O2 = { key: 1 }, C2 = ["innerHTML"], S2 = ["aria-valuenow", "aria-valuemax"], L2 = { key: 0 }, k2 = {
  key: 4,
  class: "input-group input-group-sm"
}, x2 = ["innerHTML"], I2 = ["type", "onChange", "onUpdate:modelValue"], R2 = ["onChange", "onUpdate:modelValue"], D2 = ["value"], $2 = ["innerHTML"], M2 = { key: 5 }, q2 = ["disabled", "onClick"], B2 = ["innerHTML"], P2 = { key: 2 }, j2 = { key: 0 }, V2 = ["colspan"], U2 = { class: "row g-3 align-items-center" }, F2 = { class: "col-form-label" }, H2 = ["type", "onUpdate:modelValue", "onChange"], W2 = ["onUpdate:modelValue", "onChange"], z2 = ["onUpdate:modelValue", "onChange"], K2 = ["value"], G2 = ["innerHTML"], Y2 = {
  key: 0,
  class: "bg-light text-dark"
}, X2 = {
  key: 0,
  class: "vua-table-bulk border-info"
}, Z2 = ["data-label", "width"], Q2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, J2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, tS = ["type", "disabled", "onChange", "onUpdate:modelValue"], eS = ["disabled", "onChange", "onUpdate:modelValue"], sS = ["value"], nS = ["onClick"], iS = {
  key: 0,
  class: "bi bi-square text-secondary"
}, rS = {
  key: 1,
  class: "bi bi-check-square"
}, oS = { key: 2 }, aS = ["disabled", "onClick"], lS = ["innerHTML"], cS = { key: 2 }, uS = ["id"], hS = { class: "modal-dialog modal-xl" }, dS = { class: "modal-content h-100" };
function fS(s, t, e, n, i, r) {
  const o = yn("VuAdminTablePagination"), c = yn("VuAdminForm");
  return e.settings && e.settings.table ? (b(), y("div", WO, [
    f("div", {
      class: R(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      f("div", {
        class: R(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", KO, [
        f("div", GO, [
          f("div", YO, [
            e.settings.table.title ? (b(), y("h5", XO, O(e.settings.table.title), 1)) : A("", !0),
            G(f("div", ZO, t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ns, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (b(), y("div", QO, [
            i.message.table ? (b(), y("small", JO, [
              f("span", {
                class: R(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, tC)
              ], 2)
            ])) : A("", !0),
            f("div", eC, [
              f("button", {
                class: R(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, sC),
              f("ul", nC, [
                (b(!0), y(W, null, K(i.messages.table, (a) => (b(), y("li", { key: a }, [
                  f("span", {
                    class: R(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    f("small", iC, O(a.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, rC)
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
            onClick: (l) => r.tableAction(a, {
              items: i.items,
              $event: l
            })
          }, [
            f("i", {
              class: R([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            U(" " + O(r.translate(a.title)), 1)
          ], 10, oC)) : A("", !0),
          a.action === "TABLE_COLUMNS" ? (b(), y("div", aC, [
            f("button", {
              type: "button",
              class: R([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              G(f("span", lC, [
                f("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + O(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (b(), y("span", cC, " ( " + O(r.countHiddenColumns()) + " " + O(r.translate("hidden")) + " ) ", 1)) : A("", !0)
              ], 512), [
                [Ns, e.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", uC, [
              (b(!0), y(W, null, K(e.settings.table.columns, (l) => (b(), y("li", { key: l }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(l)
                }, [
                  l.hidden ? A("", !0) : (b(), y("i", dC)),
                  l.hidden ? (b(), y("i", fC)) : A("", !0),
                  U(" " + O(l.title) + " ", 1),
                  f("small", pC, O(l.name), 1)
                ], 8, hC)
              ]))), 128)),
              t[16] || (t[16] = f("li", null, [
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
          a.dropdowns ? (b(), y("div", gC, [
            f("button", {
              type: "button",
              class: R([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", mC, [
                f("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + O(r.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", bC, [
              (b(!0), y(W, null, K(a.dropdowns, (l) => (b(), y("li", { key: l }, [
                f("span", {
                  class: R(["dropdown-item cursor-pointer", [l.class]]),
                  onClick: (h) => r.tableAction(l, {
                    items: i.items,
                    $event: h
                  })
                }, [
                  l.icon ? (b(), y("i", {
                    key: 0,
                    class: R([l.icon])
                  }, null, 2)) : A("", !0),
                  U(" " + O(r.translate(l.title)), 1)
                ], 10, yC)
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
          f("tr", vC, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("th", {
              class: R(["", [a.header ? a.header.class : ""]]),
              style: Xn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              f("span", {
                class: R(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (l) => r.sortTable(a)
              }, [
                f("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, wC),
                i.config.order[a.name] ? (b(), y("span", {
                  key: 0,
                  class: R(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (b(), y("i", TC)) : A("", !0),
                  i.config.order[a.name].dir === "DESC" ? (b(), y("i", AC)) : A("", !0),
                  U(" " + O(i.config.order[a.name].idx + 1), 1)
                ], 2)) : A("", !0)
              ], 10, EC),
              a.header && a.header.buttons ? (b(), y("span", NC, [
                (b(!0), y(W, null, K(a.header.buttons, (l) => (b(), y("button", {
                  key: l.action,
                  type: "button",
                  disabled: l.disabled !== void 0 ? r.getValueOrFunction(l.disabled) : null,
                  class: R([
                    l.class ? l.class : r.getButtonClassByAction(l.action)
                  ]),
                  onClick: (h) => r.tableAction(l, {
                    items: i.items,
                    $event: h
                  })
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
                  U(" " + O(r.translate(l.title)), 1)
                ], 10, OC))), 128))
              ])) : A("", !0)
            ], 14, _C))), 128))
          ]),
          r.countFilters() ? (b(), y("tr", CC, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("th", {
              style: Xn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: R([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (b(), y("div", LC, [
                f("span", {
                  class: R(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (l) => r.toggleSelectedRowInPage())
                }, [
                  G(f("i", kC, null, 512), [
                    [Ns, !r.haveSelectedRowInPage()]
                  ]),
                  G(f("i", xC, null, 512), [
                    [Ns, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : A("", !0),
              a.filter && a.filter.type == "text" ? (b(), y("div", IC, [
                G(f("input", {
                  type: "text",
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onKeyup: t[3] || (t[3] = ri((l) => r.reloadTable(), ["enter"]))
                }, null, 42, RC), [
                  [jt, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 0,
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[17] || (t[17] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, DC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "number" ? (b(), y("div", $C, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", qC, O(r.translate("=")), 1),
                  f("option", BC, O(r.translate(">")), 1),
                  f("option", PC, O(r.translate(">=")), 1),
                  f("option", jC, O(r.translate("<")), 1),
                  f("option", VC, O(r.translate("<=")), 1)
                ], 40, MC)), [
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
                  }, O(l.label), 9, FC))), 128))
                ], 40, UC)), [
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
                  onKeyup: t[7] || (t[7] = ri((l) => r.reloadTable(), ["enter"]))
                }, null, 42, HC), [
                  [jt, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 2,
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[18] || (t[18] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, WC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "select" ? (b(), y("div", zC, [
                a.filter.dropdown ? (b(), y("div", KC, [
                  f("button", GC, O(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  f("ul", YC, [
                    f("li", null, [
                      (b(!0), y(W, null, K(a.filter.options, (l) => (b(), y("span", {
                        key: l,
                        class: R(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, l)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(l.value) >= 0 : a.filter.value === l.value) ? (b(), y("i", ZC)) : (b(), y("i", QC)),
                        U(" " + O(r.translate(l.label ? l.label : l.value)), 1)
                      ], 10, XC))), 128))
                    ]),
                    a.filter.multiple ? (b(), y("li", JC, t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : A("", !0),
                    a.filter.multiple ? (b(), y("li", t2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, O(r.translate("Select all")), 9, e2)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", s2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectClear(a.filter.value)
                      }, O(r.translate("Unselect all")), 9, n2)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", i2, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (l) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, O(r.translate("Invert all")), 9, r2)
                    ])) : A("", !0)
                  ])
                ])) : (b(), y("div", o2, [
                  G(f("select", {
                    "onUpdate:modelValue": (l) => a.filter.value = l,
                    onChange: t[8] || (t[8] = (l) => r.reloadTable()),
                    multiple: a.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (b(!0), y(W, null, K(a.filter.options, (l) => (b(), y("option", {
                      key: l,
                      value: l.value
                    }, O(r.translate(l.label ? l.label : l.value)), 9, l2))), 128))
                  ], 40, a2), [
                    [Re, a.filter.value]
                  ]),
                  a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                    key: 0,
                    class: R(["btn btn-outline-secondary", {
                      "opacity-25": a.filter.value == null
                    }]),
                    disabled: a.filter.value == null,
                    onClick: (l) => {
                      a.filter.value = void 0, r.reloadTable();
                    }
                  }, t[20] || (t[20] = [
                    f("i", { class: "bi bi-x" }, null, -1)
                  ]), 10, c2)) : A("", !0)
                ]))
              ])) : A("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (b(), y("div", u2, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (l) => a.filter.operator = l,
                  onChange: t[9] || (t[9] = (l) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", d2, O(r.translate("=")), 1),
                  f("option", f2, O(r.translate(">")), 1),
                  f("option", p2, O(r.translate(">=")), 1),
                  f("option", g2, O(r.translate("<")), 1),
                  f("option", m2, O(r.translate("<=")), 1)
                ], 40, h2)), [
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
                  }, O(r.translate(l.label)), 9, y2))), 128))
                ], 40, b2)), [
                  [Re, a.filter.operator]
                ]) : A("", !0),
                G(f("input", {
                  type: a.filter.type,
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (l) => a.filter.value = l,
                  onChange: t[11] || (t[11] = (l) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ri((l) => r.reloadTable(), ["enter"]))
                }, null, 42, v2), [
                  [fn, a.filter.value]
                ]),
                f("button", {
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (l) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[21] || (t[21] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ]), 10, _2)
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
                    onClick: (h) => r.tableAction(l, {
                      items: i.items,
                      $event: h
                    })
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
                    U(" " + O(r.translate(l.title)), 1)
                  ], 10, E2)
                ]))), 128))
              ], 2)) : A("", !0)
            ], 14, SC))), 128))
          ])) : A("", !0)
        ]),
        f("tbody", null, [
          (b(!0), y(W, null, K(this.items, (a, l) => (b(), y(W, {
            key: a.id
          }, [
            f("tr", w2, [
              (b(!0), y(W, null, K(e.settings.table.columns, (h) => (b(), y("td", {
                style: Xn([h.hidden ? "display: none" : ""]),
                key: h.name,
                "data-label": h.title ? h.title : r.translate(h.name),
                width: h.width,
                class: R(
                  r.getValueOrFunction(h.class, {
                    column: h,
                    item: a
                  })
                ),
                onClick: (p) => r.tableAction(h, {
                  item: a,
                  index: l,
                  $event: p
                })
              }, [
                h.index ? (b(), y("div", A2, [
                  f("span", {
                    class: R(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: l + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, N2)
                ])) : A("", !0),
                !h.template && !h.input && !h.progressbar ? (b(), y("span", O2, O(r.tableCellValue(h.name, a, l, h)), 1)) : A("", !0),
                h.template ? (b(), y("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, l, h)
                }, null, 8, C2)) : A("", !0),
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
                    style: Xn({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (b(), y("span", L2, O(a[h.name]), 1)) : A("", !0)
                  ], 6)
                ], 8, S2)) : A("", !0),
                h.input ? (b(), y("div", k2, [
                  h.input.prefix ? (b(), y("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, x2)) : A("", !0),
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
                  }, null, 42, I2)), [
                    [fn, a[h.name]]
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
                    }, O(r.translate(p.label)), 9, D2))), 128))
                  ], 42, R2)), [
                    [Re, a[h.name]]
                  ]) : A("", !0),
                  h.input.suffix ? (b(), y("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, $2)) : A("", !0)
                ])) : A("", !0),
                h.buttons ? (b(), y("span", M2, [
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
                      onClick: (g) => r.tableAction(p, {
                        column: h,
                        item: a,
                        index: l,
                        $event: g
                      })
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
                      }, null, 8, B2)) : (b(), y("span", P2, O(r.translate(p.title)), 1))
                    ], 10, q2)
                  ]))), 128))
                ])) : A("", !0)
              ], 14, T2))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (b(), y("tr", j2, [
              f("td", {
                class: R([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (b(!0), y(W, null, K(e.settings.table.details.fields, (h) => (b(), y("div", {
                  class: "m-0",
                  key: h
                }, [
                  f("div", U2, [
                    f("div", {
                      class: R(["col text-end", [h.class]])
                    }, [
                      f("label", F2, O(h.label), 1)
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
                      }, null, 40, H2)), [
                        [fn, a[h.name]]
                      ]) : A("", !0),
                      h.input.type == "textarea" ? G((b(), y("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (p) => a[h.name] = p,
                        onChange: (p) => r.onRowInputChange(a[h.name], h, a, l)
                      }, `\r
                    `, 40, W2)), [
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
                        }, O(r.translate(p.label)), 9, K2))), 128))
                      ], 40, z2)), [
                        [Re, a[h.name]]
                      ]) : A("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, G2),
                e.settings.debug ? (b(), y("pre", Y2, "                " + O(a) + `
              `, 1)) : A("", !0)
              ], 10, V2)
            ])) : A("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (b(), y("tr", X2, [
            (b(!0), y(W, null, K(e.settings.table.columns, (a) => (b(), y("td", {
              style: Xn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: R(a.class)
            }, [
              a.index ? (b(), y("div", Q2, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (l) => r.toggleSelectedAll())
                }, O(i.selected.length), 1)
              ])) : A("", !0),
              a.input && a.bulk && a.bulk.enabled ? (b(), y("div", J2, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? G((b(), y("input", {
                  key: 0,
                  type: a.input.type,
                  class: R(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (l) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (l) => i.bulkitem[a.name] = l
                }, null, 42, tS)), [
                  [fn, i.bulkitem[a.name]]
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
                  }, O(r.translate(l.label)), 9, sS))), 128))
                ], 42, eS)), [
                  [Re, i.bulkitem[a.name]]
                ]) : A("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (l) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (b(), y("i", iS)) : (b(), y("i", rS))
                ], 8, nS)
              ])) : A("", !0),
              a.bulk ? (b(), y("span", oS, [
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
                    }, null, 8, lS)) : (b(), y("span", cS, O(r.translate(l.title)), 1))
                  ], 10, aS)
                ]))), 128))
              ])) : A("", !0)
            ], 14, Z2))), 128))
          ])) : A("", !0)
        ])
      ], 2)) : A("", !0),
      mu(o, {
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
        f("div", hS, [
          f("div", dS, [
            e.settings.form.visible && e.settings.form.groups ? (b(), pr(c, {
              key: 0,
              modelValue: i.item,
              "onUpdate:modelValue": t[14] || (t[14] = (a) => i.item = a),
              formid: i.formId,
              settings: e.settings,
              modalWindow: i.modalWindow,
              saveItem: r.saveItem,
              deleteItem: r.deleteItem,
              reloadTable: r.reloadTable,
              fetchRelation: r.fetchRelation
            }, null, 8, ["modelValue", "formid", "settings", "modalWindow", "saveItem", "deleteItem", "reloadTable", "fetchRelation"])) : A("", !0)
          ])
        ])
      ], 8, uS)
    ], 10, zO)
  ])) : A("", !0);
}
const pS = /* @__PURE__ */ Fs(HO, [["render", fS], ["__scopeId", "data-v-cc1a0a96"]]), gS = {
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
      if (this.settings = $r(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, !this.settings.theme) {
        const s = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = s || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.2.20"), console.log(`Entity config (${this.entity}) initialized`));
    } else
      console.log("vu-admin ", "1.2.20"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: pS
  }
}, mS = { key: 0 }, bS = ["data-bs-theme"];
function yS(s, t, e, n, i, r) {
  const o = yn("vu-admin-table");
  return e.entity && i.settings ? (b(), y("div", mS, [
    f("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      mu(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, bS)
  ])) : A("", !0);
}
const vS = /* @__PURE__ */ Fs(gS, [["render", yS]]), CS = {
  install(s) {
    s.component("VuAdmin", vS);
  }
};
export {
  vS as VuAdmin,
  CS as default
};
