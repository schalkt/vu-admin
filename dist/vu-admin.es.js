var Rd = Object.defineProperty;
var $d = (s, t, e) => t in s ? Rd(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var D = (s, t, e) => $d(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as b, createElementBlock as y, createElementVNode as p, normalizeClass as R, Fragment as W, renderList as z, toDisplayString as O, createCommentVNode as A, withDirectives as G, vModelText as jt, withKeys as ri, withModifiers as aa, createTextVNode as U, vModelSelect as ge, resolveComponent as Ls, vModelCheckbox as Dd, createBlock as oi, vModelDynamic as pn, vShow as Os, normalizeStyle as Xn, createVNode as bu } from "vue";
var Tt = "top", xt = "bottom", It = "right", At = "left", Or = "auto", kn = [Tt, xt, It, At], xs = "start", vn = "end", yu = "clippingParents", Va = "viewport", rn = "popper", vu = "reference", la = /* @__PURE__ */ kn.reduce(function(s, t) {
  return s.concat([t + "-" + xs, t + "-" + vn]);
}, []), Ua = /* @__PURE__ */ [].concat(kn, [Or]).reduce(function(s, t) {
  return s.concat([t, t + "-" + xs, t + "-" + vn]);
}, []), _u = "beforeRead", Eu = "read", wu = "afterRead", Tu = "beforeMain", Au = "main", Nu = "afterMain", Ou = "beforeWrite", Cu = "write", Su = "afterWrite", Lu = [_u, Eu, wu, Tu, Au, Nu, Ou, Cu, Su];
function Ee(s) {
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
function Is(s) {
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
    !Wt(r) || !Ee(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? r.removeAttribute(o) : r.setAttribute(o, l === !0 ? "" : l);
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
      var i = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]), l = o.reduce(function(a, h) {
        return a[h] = "", a;
      }, {});
      !Wt(i) || !Ee(i) || (Object.assign(i.style, l), Object.keys(r).forEach(function(a) {
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
function be(s) {
  return s.split("-")[0];
}
var ks = Math.max, gr = Math.min, _n = Math.round;
function ca() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ku() {
  return !/^((?!chrome|android).)*safari/i.test(ca());
}
function En(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Wt(s) && (i = s.offsetWidth > 0 && _n(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && _n(n.height) / s.offsetHeight || 1);
  var o = Is(s) ? Rt(s) : window, l = o.visualViewport, a = !ku() && e, h = (n.left + (a && l ? l.offsetLeft : 0)) / i, c = (n.top + (a && l ? l.offsetTop : 0)) / r, f = n.width / i, g = n.height / r;
  return {
    width: f,
    height: g,
    top: c,
    right: h + f,
    bottom: c + g,
    left: h,
    x: h,
    y: c
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
function xu(s, t) {
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
  return ["table", "td", "th"].indexOf(Ee(s)) >= 0;
}
function as(s) {
  return ((Is(s) ? s.ownerDocument : (
    // $FlowFixMe[prop-missing]
    s.document
  )) || window.document).documentElement;
}
function Cr(s) {
  return Ee(s) === "html" ? s : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    s.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    s.parentNode || // DOM Element detected
    (Fa(s) ? s.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    as(s)
  );
}
function Rl(s) {
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
  for (Fa(i) && (i = i.host); Wt(i) && ["html", "body"].indexOf(Ee(i)) < 0; ) {
    var r = Me(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function wi(s) {
  for (var t = Rt(s), e = Rl(s); e && Bd(e) && Me(e).position === "static"; )
    e = Rl(e);
  return e && (Ee(e) === "html" || Ee(e) === "body" && Me(e).position === "static") ? t : e || Pd(s) || t;
}
function za(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function ai(s, t, e) {
  return ks(s, gr(t, e));
}
function jd(s, t, e) {
  var n = ai(s, t, e);
  return n > e ? e : n;
}
function Iu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ru(s) {
  return Object.assign({}, Iu(), s);
}
function $u(s, t) {
  return t.reduce(function(e, n) {
    return e[n] = s, e;
  }, {});
}
var Vd = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Ru(typeof t != "number" ? t : $u(t, kn));
};
function Ud(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, l = be(e.placement), a = za(l), h = [At, It].indexOf(l) >= 0, c = h ? "height" : "width";
  if (!(!r || !o)) {
    var f = Vd(i.padding, e), g = Wa(r), m = a === "y" ? Tt : At, _ = a === "y" ? xt : It, E = e.rects.reference[c] + e.rects.reference[a] - o[a] - e.rects.popper[c], w = o[a] - e.rects.reference[a], T = wi(r), C = T ? a === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, L = E / 2 - w / 2, k = f[m], I = C - g[c] - f[_], $ = C / 2 - g[c] / 2 + L, P = ai(k, $, I), F = a;
    e.modifiersData[n] = (t = {}, t[F] = P, t.centerOffset = P - $, t);
  }
}
function Fd(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || xu(t.elements.popper, i) && (t.elements.arrow = i));
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
function $l(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, l = s.position, a = s.gpuAcceleration, h = s.adaptive, c = s.roundOffsets, f = s.isFixed, g = o.x, m = g === void 0 ? 0 : g, _ = o.y, E = _ === void 0 ? 0 : _, w = typeof c == "function" ? c({
    x: m,
    y: E
  }) : {
    x: m,
    y: E
  };
  m = w.x, E = w.y;
  var T = o.hasOwnProperty("x"), C = o.hasOwnProperty("y"), L = At, k = Tt, I = window;
  if (h) {
    var $ = wi(e), P = "clientHeight", F = "clientWidth";
    if ($ === Rt(e) && ($ = as(e), Me($).position !== "static" && l === "absolute" && (P = "scrollHeight", F = "scrollWidth")), $ = $, i === Tt || (i === At || i === It) && r === vn) {
      k = xt;
      var J = f && $ === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        $[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === At || (i === Tt || i === xt) && r === vn) {
      L = It;
      var tt = f && $ === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        $[F]
      );
      m -= tt - n.width, m *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: l
  }, h && Hd), ot = c === !0 ? Wd({
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
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, l = e.roundOffsets, a = l === void 0 ? !0 : l, h = {
    placement: be(t.placement),
    variation: wn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, $l(Object.assign({}, h, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, $l(Object.assign({}, h, {
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
var Xi = {
  passive: !0
};
function Kd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, l = o === void 0 ? !0 : o, a = Rt(t.elements.popper), h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && h.forEach(function(c) {
    c.addEventListener("scroll", e.update, Xi);
  }), l && a.addEventListener("resize", e.update, Xi), function() {
    r && h.forEach(function(c) {
      c.removeEventListener("scroll", e.update, Xi);
    }), l && a.removeEventListener("resize", e.update, Xi);
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
function cr(s) {
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
  return En(as(s)).left + Ya(s).scrollLeft;
}
function Xd(s, t) {
  var e = Rt(s), n = as(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, l = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var h = ku();
    (h || !h && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: l + Xa(s),
    y: a
  };
}
function Zd(s) {
  var t, e = as(s), n = Ya(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = ks(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = ks(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Xa(s), a = -n.scrollTop;
  return Me(i || e).direction === "rtl" && (l += ks(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: l,
    y: a
  };
}
function Za(s) {
  var t = Me(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Mu(s) {
  return ["html", "body", "#document"].indexOf(Ee(s)) >= 0 ? s.ownerDocument.body : Wt(s) && Za(s) ? s : Mu(Cr(s));
}
function li(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = Mu(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = Rt(n), o = i ? [r].concat(r.visualViewport || [], Za(n) ? n : []) : n, l = t.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(li(Cr(o)))
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
function Ml(s, t, e) {
  return t === Va ? ua(Xd(s, e)) : Is(t) ? Qd(t, e) : ua(Zd(as(s)));
}
function Jd(s) {
  var t = li(Cr(s)), e = ["absolute", "fixed"].indexOf(Me(s).position) >= 0, n = e && Wt(s) ? wi(s) : s;
  return Is(n) ? t.filter(function(i) {
    return Is(i) && xu(i, n) && Ee(i) !== "body";
  }) : [];
}
function tf(s, t, e, n) {
  var i = t === "clippingParents" ? Jd(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], l = r.reduce(function(a, h) {
    var c = Ml(s, h, n);
    return a.top = ks(c.top, a.top), a.right = gr(c.right, a.right), a.bottom = gr(c.bottom, a.bottom), a.left = ks(c.left, a.left), a;
  }, Ml(s, o, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function qu(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? be(n) : null, r = n ? wn(n) : null, o = t.x + t.width / 2 - e.width / 2, l = t.y + t.height / 2 - e.height / 2, a;
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
        y: l
      };
      break;
    case At:
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
  var h = i ? za(i) : null;
  if (h != null) {
    var c = h === "y" ? "height" : "width";
    switch (r) {
      case xs:
        a[h] = a[h] - (t[c] / 2 - e[c] / 2);
        break;
      case vn:
        a[h] = a[h] + (t[c] / 2 - e[c] / 2);
        break;
    }
  }
  return a;
}
function Tn(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, l = e.boundary, a = l === void 0 ? yu : l, h = e.rootBoundary, c = h === void 0 ? Va : h, f = e.elementContext, g = f === void 0 ? rn : f, m = e.altBoundary, _ = m === void 0 ? !1 : m, E = e.padding, w = E === void 0 ? 0 : E, T = Ru(typeof w != "number" ? w : $u(w, kn)), C = g === rn ? vu : rn, L = s.rects.popper, k = s.elements[_ ? C : g], I = tf(Is(k) ? k : k.contextElement || as(s.elements.popper), a, c, o), $ = En(s.elements.reference), P = qu({
    reference: $,
    element: L,
    strategy: "absolute",
    placement: i
  }), F = ua(Object.assign({}, L, P)), J = g === rn ? F : $, tt = {
    top: I.top - J.top + T.top,
    bottom: J.bottom - I.bottom + T.bottom,
    left: I.left - J.left + T.left,
    right: J.right - I.right + T.right
  }, nt = s.modifiersData.offset;
  if (g === rn && nt) {
    var ot = nt[i];
    Object.keys(tt).forEach(function(it) {
      var Dt = [It, xt].indexOf(it) >= 0 ? 1 : -1, Mt = [Tt, xt].indexOf(it) >= 0 ? "y" : "x";
      tt[it] += ot[Mt] * Dt;
    });
  }
  return tt;
}
function ef(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, l = e.flipVariations, a = e.allowedAutoPlacements, h = a === void 0 ? Ua : a, c = wn(n), f = c ? l ? la : la.filter(function(_) {
    return wn(_) === c;
  }) : kn, g = f.filter(function(_) {
    return h.indexOf(_) >= 0;
  });
  g.length === 0 && (g = f);
  var m = g.reduce(function(_, E) {
    return _[E] = Tn(s, {
      placement: E,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[be(E)], _;
  }, {});
  return Object.keys(m).sort(function(_, E) {
    return m[_] - m[E];
  });
}
function sf(s) {
  if (be(s) === Or)
    return [];
  var t = cr(s);
  return [Dl(s), t, Dl(t)];
}
function nf(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, l = o === void 0 ? !0 : o, a = e.fallbackPlacements, h = e.padding, c = e.boundary, f = e.rootBoundary, g = e.altBoundary, m = e.flipVariations, _ = m === void 0 ? !0 : m, E = e.allowedAutoPlacements, w = t.options.placement, T = be(w), C = T === w, L = a || (C || !_ ? [cr(w)] : sf(w)), k = [w].concat(L).reduce(function(Xt, K) {
      return Xt.concat(be(K) === Or ? ef(t, {
        placement: K,
        boundary: c,
        rootBoundary: f,
        padding: h,
        flipVariations: _,
        allowedAutoPlacements: E
      }) : K);
    }, []), I = t.rects.reference, $ = t.rects.popper, P = /* @__PURE__ */ new Map(), F = !0, J = k[0], tt = 0; tt < k.length; tt++) {
      var nt = k[tt], ot = be(nt), it = wn(nt) === xs, Dt = [Tt, xt].indexOf(ot) >= 0, Mt = Dt ? "width" : "height", ut = Tn(t, {
        placement: nt,
        boundary: c,
        rootBoundary: f,
        altBoundary: g,
        padding: h
      }), _t = Dt ? it ? It : At : it ? xt : Tt;
      I[Mt] > $[Mt] && (_t = cr(_t));
      var Fe = cr(_t), Yt = [];
      if (r && Yt.push(ut[ot] <= 0), l && Yt.push(ut[_t] <= 0, ut[Fe] <= 0), Yt.every(function(Xt) {
        return Xt;
      })) {
        J = nt, F = !1;
        break;
      }
      P.set(nt, Yt);
    }
    if (F)
      for (var Y = _ ? 3 : 1, fs = function(K) {
        var ce = k.find(function(He) {
          var at = P.get(He);
          if (at)
            return at.slice(0, K).every(function(We) {
              return We;
            });
        });
        if (ce)
          return J = ce, "break";
      }, Ne = Y; Ne > 0; Ne--) {
        var pt = fs(Ne);
        if (pt === "break") break;
      }
    t.placement !== J && (t.modifiersData[n]._skip = !0, t.placement = J, t.reset = !0);
  }
}
const Bu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: nf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ql(s, t, e) {
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
function Bl(s) {
  return [Tt, It, xt, At].some(function(t) {
    return s[t] >= 0;
  });
}
function rf(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = Tn(t, {
    elementContext: "reference"
  }), l = Tn(t, {
    altBoundary: !0
  }), a = ql(o, n), h = ql(l, i, r), c = Bl(a), f = Bl(h);
  t.modifiersData[e] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: h,
    isReferenceHidden: c,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": f
  });
}
const Pu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: rf
};
function of(s, t, e) {
  var n = be(s), i = [At, Tt].indexOf(n) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: s
  })) : e, o = r[0], l = r[1];
  return o = o || 0, l = (l || 0) * i, [At, It].indexOf(n) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function af(s) {
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Ua.reduce(function(c, f) {
    return c[f] = of(f, t.rects, r), c;
  }, {}), l = o[t.placement], a = l.x, h = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += h), t.modifiersData[n] = o;
}
const ju = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: af
};
function lf(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = qu({
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
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, l = o === void 0 ? !1 : o, a = e.boundary, h = e.rootBoundary, c = e.altBoundary, f = e.padding, g = e.tether, m = g === void 0 ? !0 : g, _ = e.tetherOffset, E = _ === void 0 ? 0 : _, w = Tn(t, {
    boundary: a,
    rootBoundary: h,
    padding: f,
    altBoundary: c
  }), T = be(t.placement), C = wn(t.placement), L = !C, k = za(T), I = cf(k), $ = t.modifiersData.popperOffsets, P = t.rects.reference, F = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
  if ($) {
    if (r) {
      var it, Dt = k === "y" ? Tt : At, Mt = k === "y" ? xt : It, ut = k === "y" ? "height" : "width", _t = $[k], Fe = _t + w[Dt], Yt = _t - w[Mt], Y = m ? -F[ut] / 2 : 0, fs = C === xs ? P[ut] : F[ut], Ne = C === xs ? -F[ut] : -P[ut], pt = t.elements.arrow, Xt = m && pt ? Wa(pt) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Iu(), ce = K[Dt], He = K[Mt], at = ai(0, P[ut], Xt[ut]), We = L ? P[ut] / 2 - Y - at - ce - tt.mainAxis : fs - at - ce - tt.mainAxis, Ws = L ? -P[ut] / 2 + Y + at + He + tt.mainAxis : Ne + at + He + tt.mainAxis, Oe = t.elements.arrow && wi(t.elements.arrow), ps = Oe ? k === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0, gs = (it = nt == null ? void 0 : nt[k]) != null ? it : 0, ms = _t + We - gs - ps, zs = _t + Ws - gs, ze = ai(m ? gr(Fe, ms) : Fe, _t, m ? ks(Yt, zs) : Yt);
      $[k] = ze, ot[k] = ze - _t;
    }
    if (l) {
      var bs, $n = k === "x" ? Tt : At, Dn = k === "x" ? xt : It, Nt = $[I], ue = I === "y" ? "height" : "width", ys = Nt + w[$n], vs = Nt - w[Dn], Ot = [Tt, At].indexOf(T) !== -1, Ce = (bs = nt == null ? void 0 : nt[I]) != null ? bs : 0, Ks = Ot ? ys : Nt - P[ue] - F[ue] - Ce + tt.altAxis, he = Ot ? Nt + P[ue] + F[ue] - Ce - tt.altAxis : vs, Se = m && Ot ? jd(Ks, Nt, he) : ai(m ? Ks : ys, Nt, m ? he : vs);
      $[I] = Se, ot[I] = Se - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const Vu = {
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
  var n = Wt(t), i = Wt(t) && ff(t), r = as(t), o = En(s, i, e), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((Ee(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Za(r)) && (l = df(t)), Wt(t) ? (a = En(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Xa(r))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
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
function mf(s) {
  var t = gf(s);
  return Lu.reduce(function(e, n) {
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
var Pl = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function jl() {
  for (var s = arguments.length, t = new Array(s), e = 0; e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Sr(s) {
  s === void 0 && (s = {});
  var t = s, e = t.defaultModifiers, n = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? Pl : i;
  return function(l, a, h) {
    h === void 0 && (h = r);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Pl, r),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, f = [], g = !1, m = {
      state: c,
      setOptions: function(T) {
        var C = typeof T == "function" ? T(c.options) : T;
        E(), c.options = Object.assign({}, r, c.options, C), c.scrollParents = {
          reference: Is(l) ? li(l) : l.contextElement ? li(l.contextElement) : [],
          popper: li(a)
        };
        var L = mf(yf([].concat(n, c.options.modifiers)));
        return c.orderedModifiers = L.filter(function(k) {
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
          var T = c.elements, C = T.reference, L = T.popper;
          if (jl(C, L)) {
            c.rects = {
              reference: pf(C, wi(L), c.options.strategy === "fixed"),
              popper: Wa(L)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(tt) {
              return c.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var k = 0; k < c.orderedModifiers.length; k++) {
              if (c.reset === !0) {
                c.reset = !1, k = -1;
                continue;
              }
              var I = c.orderedModifiers[k], $ = I.fn, P = I.options, F = P === void 0 ? {} : P, J = I.name;
              typeof $ == "function" && (c = $({
                state: c,
                options: F,
                name: J,
                instance: m
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: bf(function() {
        return new Promise(function(w) {
          m.forceUpdate(), w(c);
        });
      }),
      destroy: function() {
        E(), g = !0;
      }
    };
    if (!jl(l, a))
      return m;
    m.setOptions(h).then(function(w) {
      !g && h.onFirstUpdate && h.onFirstUpdate(w);
    });
    function _() {
      c.orderedModifiers.forEach(function(w) {
        var T = w.name, C = w.options, L = C === void 0 ? {} : C, k = w.effect;
        if (typeof k == "function") {
          var I = k({
            state: c,
            name: T,
            instance: m,
            options: L
          }), $ = function() {
          };
          f.push(I || $);
        }
      });
    }
    function E() {
      f.forEach(function(w) {
        return w();
      }), f = [];
    }
    return m;
  };
}
var vf = /* @__PURE__ */ Sr(), _f = [Ga, Qa, Ka, Ha], Ef = /* @__PURE__ */ Sr({
  defaultModifiers: _f
}), wf = [Ga, Qa, Ka, Ha, ju, Bu, Vu, Du, Pu], Ja = /* @__PURE__ */ Sr({
  defaultModifiers: wf
});
const Uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Nu,
  afterRead: wu,
  afterWrite: Su,
  applyStyles: Ha,
  arrow: Du,
  auto: Or,
  basePlacements: kn,
  beforeMain: Tu,
  beforeRead: _u,
  beforeWrite: Ou,
  bottom: xt,
  clippingParents: yu,
  computeStyles: Ka,
  createPopper: Ja,
  createPopperBase: vf,
  createPopperLite: Ef,
  detectOverflow: Tn,
  end: vn,
  eventListeners: Ga,
  flip: Bu,
  hide: Pu,
  left: At,
  main: Au,
  modifierPhases: Lu,
  offset: ju,
  placements: Ua,
  popper: rn,
  popperGenerator: Sr,
  popperOffsets: Qa,
  preventOverflow: Vu,
  read: Eu,
  reference: vu,
  right: It,
  start: xs,
  top: Tt,
  variationPlacements: la,
  viewport: Va,
  write: Cu
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
}, Tf = 1e6, Af = 1e3, ha = "transitionend", Fu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), Nf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Of = (s) => {
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
}, Hu = (s) => {
  s.dispatchEvent(new Event(ha));
}, $e = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), ns = (s) => $e(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Fu(s)) : null, xn = (s) => {
  if (!$e(s) || s.getClientRects().length === 0)
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
}, is = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false", Wu = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? Wu(s.parentNode) : null;
}, mr = () => {
}, Ti = (s) => {
  s.offsetHeight;
}, zu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, $o = [], Sf = (s) => {
  document.readyState === "loading" ? ($o.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of $o)
      t();
  }), $o.push(s)) : s();
}, zt = () => document.documentElement.dir === "rtl", Gt = (s) => {
  Sf(() => {
    const t = zu();
    if (t) {
      const e = s.NAME, n = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface);
    }
  });
}, Lt = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e, Ku = (s, t, e = !0) => {
  if (!e) {
    Lt(s);
    return;
  }
  const i = Cf(t) + 5;
  let r = !1;
  const o = ({
    target: l
  }) => {
    l === t && (r = !0, t.removeEventListener(ha, o), Lt(s));
  };
  t.addEventListener(ha, o), setTimeout(() => {
    r || Hu(t);
  }, i);
}, tl = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, Lf = /[^.]*(?=\..*)\.|.*/, kf = /\..*/, xf = /::\d+$/, Do = {};
let Vl = 1;
const Gu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, If = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Yu(s, t) {
  return t && `${t}::${Vl++}` || s.uidEvent || Vl++;
}
function Xu(s) {
  const t = Yu(s);
  return s.uidEvent = t, Do[t] = Do[t] || {}, Do[t];
}
function Rf(s, t) {
  return function e(n) {
    return el(n, {
      delegateTarget: s
    }), e.oneOff && x.off(s, n.type, t), t.apply(s, [n]);
  };
}
function $f(s, t, e) {
  return function n(i) {
    const r = s.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const l of r)
        if (l === o)
          return el(i, {
            delegateTarget: o
          }), n.oneOff && x.off(s, i.type, t, e), e.apply(o, [i]);
  };
}
function Zu(s, t, e = null) {
  return Object.values(s).find((n) => n.callable === t && n.delegationSelector === e);
}
function Qu(s, t, e) {
  const n = typeof t == "string", i = n ? e : t || e;
  let r = Ju(s);
  return If.has(r) || (r = s), [n, i, r];
}
function Ul(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, l] = Qu(t, e, n);
  t in Gu && (o = ((_) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return _.call(this, E);
  })(o));
  const a = Xu(s), h = a[l] || (a[l] = {}), c = Zu(h, o, r ? e : null);
  if (c) {
    c.oneOff = c.oneOff && i;
    return;
  }
  const f = Yu(o, t.replace(Lf, "")), g = r ? $f(s, e, o) : Rf(s, o);
  g.delegationSelector = r ? e : null, g.callable = o, g.oneOff = i, g.uidEvent = f, h[f] = g, s.addEventListener(l, g, r);
}
function da(s, t, e, n, i) {
  const r = Zu(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function Df(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && da(s, t, e, o.callable, o.delegationSelector);
}
function Ju(s) {
  return s = s.replace(kf, ""), Gu[s] || s;
}
const x = {
  on(s, t, e, n) {
    Ul(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    Ul(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = Qu(t, e, n), l = o !== t, a = Xu(s), h = a[o] || {}, c = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(h).length)
        return;
      da(s, a, o, r, i ? e : null);
      return;
    }
    if (c)
      for (const f of Object.keys(a))
        Df(s, a, f, t.slice(1));
    for (const [f, g] of Object.entries(h)) {
      const m = f.replace(xf, "");
      (!l || t.includes(m)) && da(s, a, o, g.callable, g.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = zu(), i = Ju(t), r = t !== i;
    let o = null, l = !0, a = !0, h = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), l = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), h = o.isDefaultPrevented());
    const c = el(new Event(t, {
      bubbles: l,
      cancelable: !0
    }), e);
    return h && c.preventDefault(), a && s.dispatchEvent(c), c.defaultPrevented && o && o.preventDefault(), c;
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
function Fl(s) {
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
const De = {
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
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Fl(s.dataset[n]);
    }
    return t;
  },
  getDataAttribute(s, t) {
    return Fl(s.getAttribute(`data-bs-${Mo(t)}`));
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
  _mergeConfigObj(t, e) {
    const n = $e(e) ? De.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...$e(e) ? De.getDataAttributes(e) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(e)) {
      const r = t[n], o = $e(r) ? "element" : Nf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Mf = "5.3.3";
class re extends Ai {
  constructor(t, e) {
    super(), t = ns(t), t && (this._element = t, this._config = this._getConfig(e), Ro.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Ro.remove(this._element, this.constructor.DATA_KEY), x.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, e, n = !0) {
    Ku(t, e, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Ro.get(ns(t), this.DATA_KEY);
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
  return t ? t.split(",").map((e) => Fu(e)).join(",") : null;
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
    return this.find(t, s).filter((e) => !is(e) && xn(e));
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
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), is(this))
      return;
    const r = V.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, qf = "alert", Bf = "bs.alert", th = `.${Bf}`, Pf = `close${th}`, jf = `closed${th}`, Vf = "fade", Uf = "show";
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
const Ff = "button", Hf = "bs.button", Wf = `.${Hf}`, zf = ".data-api", Kf = "active", Hl = '[data-bs-toggle="button"]', Gf = `click${Wf}${zf}`;
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
x.on(document, Gf, Hl, (s) => {
  s.preventDefault();
  const t = s.target.closest(Hl);
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
class br extends Ai {
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
const ap = "carousel", lp = "bs.carousel", ls = `.${lp}`, eh = ".data-api", cp = "ArrowLeft", up = "ArrowRight", hp = 500, Zn = "next", sn = "prev", on = "left", ur = "right", dp = `slide${ls}`, Bo = `slid${ls}`, fp = `keydown${ls}`, pp = `mouseenter${ls}`, gp = `mouseleave${ls}`, mp = `dragstart${ls}`, bp = `load${ls}${eh}`, yp = `click${ls}${eh}`, sh = "carousel", Zi = "active", vp = "slide", _p = "carousel-item-end", Ep = "carousel-item-start", wp = "carousel-item-next", Tp = "carousel-item-prev", nh = ".active", ih = ".carousel-item", Ap = nh + ih, Np = ".carousel-item img", Op = ".carousel-indicators", Cp = "[data-bs-slide], [data-bs-slide-to]", Sp = '[data-bs-ride="carousel"]', Lp = {
  [cp]: ur,
  [up]: on
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
class Ni extends re {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = V.findOne(Op, this._element), this._addEventListeners(), this._config.ride === sh && this.cycle();
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
    this._slide(sn);
  }
  pause() {
    this._isSliding && Hu(this._element), this._clearInterval();
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
    const i = t > n ? Zn : sn;
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
      leftCallback: () => this._slide(this._directionToOrder(on)),
      rightCallback: () => this._slide(this._directionToOrder(ur)),
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
    const e = V.findOne(nh, this._indicatorsElement);
    e.classList.remove(Zi), e.removeAttribute("aria-current");
    const n = V.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Zi), n.setAttribute("aria-current", "true"));
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
    const o = this._getItemIndex(r), l = (m) => x.trigger(this._element, m, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (l(dp).defaultPrevented || !n || !r)
      return;
    const h = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const c = i ? Ep : _p, f = i ? wp : Tp;
    r.classList.add(f), Ti(r), n.classList.add(c), r.classList.add(c);
    const g = () => {
      r.classList.remove(c, f), r.classList.add(Zi), n.classList.remove(Zi, f, c), this._isSliding = !1, l(Bo);
    };
    this._queueCallback(g, n, this._isAnimated()), h && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(vp);
  }
  _getActive() {
    return V.findOne(Ap, this._element);
  }
  _getItems() {
    return V.find(ih, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return zt() ? t === on ? sn : Zn : t === on ? Zn : sn;
  }
  _orderToDirection(t) {
    return zt() ? t === sn ? on : ur : t === sn ? ur : on;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Ni.getOrCreateInstance(this, t);
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
  if (!t || !t.classList.contains(sh))
    return;
  s.preventDefault();
  const e = Ni.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
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
x.on(window, bp, () => {
  const s = V.find(Sp);
  for (const t of s)
    Ni.getOrCreateInstance(t);
});
Gt(Ni);
const Ip = "collapse", Rp = "bs.collapse", Oi = `.${Rp}`, $p = ".data-api", Dp = `show${Oi}`, Mp = `shown${Oi}`, qp = `hide${Oi}`, Bp = `hidden${Oi}`, Pp = `click${Oi}${$p}`, Po = "show", gn = "collapse", Qi = "collapsing", jp = "collapsed", Vp = `:scope .${gn} .${gn}`, Up = "collapse-horizontal", Fp = "width", Hp = "height", Wp = ".collapse.show, .collapse.collapsing", fa = '[data-bs-toggle="collapse"]', zp = {
  parent: null,
  toggle: !0
}, Kp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class fi extends re {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = V.find(fa);
    for (const i of n) {
      const r = V.getSelectorFromElement(i), o = V.find(r).filter((l) => l === this._element);
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
    if (this._config.parent && (t = this._getFirstLevelChildren(Wp).filter((l) => l !== this._element).map((l) => fi.getOrCreateInstance(l, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || x.trigger(this._element, Dp).defaultPrevented)
      return;
    for (const l of t)
      l.hide();
    const n = this._getDimension();
    this._element.classList.remove(gn), this._element.classList.add(Qi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Qi), this._element.classList.add(gn, Po), this._element.style[n] = "", x.trigger(this._element, Mp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || x.trigger(this._element, qp).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Ti(this._element), this._element.classList.add(Qi), this._element.classList.remove(gn, Po);
    for (const i of this._triggerArray) {
      const r = V.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Qi), this._element.classList.add(gn), x.trigger(this._element, Bp);
    };
    this._element.style[e] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Po);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = ns(t.parent), t;
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
      const n = fi.getOrCreateInstance(this, e);
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
    fi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Gt(fi);
const Wl = "dropdown", Gp = "bs.dropdown", qs = `.${Gp}`, sl = ".data-api", Yp = "Escape", zl = "Tab", Xp = "ArrowUp", Kl = "ArrowDown", Zp = 2, Qp = `hide${qs}`, Jp = `hidden${qs}`, tg = `show${qs}`, eg = `shown${qs}`, rh = `click${qs}${sl}`, oh = `keydown${qs}${sl}`, sg = `keyup${qs}${sl}`, an = "show", ng = "dropup", ig = "dropend", rg = "dropstart", og = "dropup-center", ag = "dropdown-center", Cs = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', lg = `${Cs}.${an}`, hr = ".dropdown-menu", cg = ".navbar", ug = ".navbar-nav", hg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", dg = zt() ? "top-end" : "top-start", fg = zt() ? "top-start" : "top-end", pg = zt() ? "bottom-end" : "bottom-start", gg = zt() ? "bottom-start" : "bottom-end", mg = zt() ? "left-start" : "right-start", bg = zt() ? "right-start" : "left-start", yg = "top", vg = "bottom", _g = {
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
class ye extends re {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = V.next(this._element, hr)[0] || V.prev(this._element, hr)[0] || V.findOne(hr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return _g;
  }
  static get DefaultType() {
    return Eg;
  }
  static get NAME() {
    return Wl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (is(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!x.trigger(this._element, tg, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(ug))
        for (const n of [].concat(...document.body.children))
          x.on(n, "mouseover", mr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(an), this._element.classList.add(an), x.trigger(this._element, eg, t);
    }
  }
  hide() {
    if (is(this._element) || !this._isShown())
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
      this._popper && this._popper.destroy(), this._menu.classList.remove(an), this._element.classList.remove(an), this._element.setAttribute("aria-expanded", "false"), De.removeDataAttribute(this._menu, "popper"), x.trigger(this._element, Jp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !$e(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Wl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Uu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : $e(this._config.reference) ? t = ns(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = Ja(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(an);
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
    const n = V.find(hg, this._menu).filter((i) => xn(i));
    n.length && tl(n, e, t === Kl, !n.includes(e)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = ye.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Zp || t.type === "keyup" && t.key !== zl)
      return;
    const e = V.find(lg);
    for (const n of e) {
      const i = ye.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === zl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const l = {
        relatedTarget: i._element
      };
      t.type === "click" && (l.clickEvent = t), i._completeHide(l);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === Yp, i = [Xp, Kl].includes(t.key);
    if (!i && !n || e && !n)
      return;
    t.preventDefault();
    const r = this.matches(Cs) ? this : V.prev(this, Cs)[0] || V.next(this, Cs)[0] || V.findOne(Cs, t.delegateTarget.parentNode), o = ye.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
x.on(document, oh, Cs, ye.dataApiKeydownHandler);
x.on(document, oh, hr, ye.dataApiKeydownHandler);
x.on(document, rh, ye.clearMenus);
x.on(document, sg, ye.clearMenus);
x.on(document, rh, Cs, function(s) {
  s.preventDefault(), ye.getOrCreateInstance(this).toggle();
});
Gt(ye);
const ah = "backdrop", wg = "fade", Gl = "show", Yl = `mousedown.bs.${ah}`, Tg = {
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
class lh extends Ai {
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
    return ah;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && Ti(e), e.classList.add(Gl), this._emulateAnimation(() => {
      Lt(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      Lt(t);
      return;
    }
    this._getElement().classList.remove(Gl), this._emulateAnimation(() => {
      this.dispose(), Lt(t);
    });
  }
  dispose() {
    this._isAppended && (x.off(this._element, Yl), this._element.remove(), this._isAppended = !1);
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
    return t.rootElement = ns(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), x.on(t, Yl, () => {
      Lt(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Ku(t, this._getElement(), this._config.isAnimated);
  }
}
const Ng = "focustrap", Og = "bs.focustrap", yr = `.${Og}`, Cg = `focusin${yr}`, Sg = `keydown.tab${yr}`, Lg = "Tab", kg = "forward", Xl = "backward", xg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Ig = {
  autofocus: "boolean",
  trapElement: "element"
};
class ch extends Ai {
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
    n.length === 0 ? e.focus() : this._lastTabNavDirection === Xl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === Lg && (this._lastTabNavDirection = t.shiftKey ? Xl : kg);
  }
}
const Zl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Ql = ".sticky-top", Ji = "padding-right", Jl = "margin-right";
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Ji, (e) => e + t), this._setElementAttributes(Zl, Ji, (e) => e + t), this._setElementAttributes(Ql, Jl, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Ji), this._resetElementAttributes(Zl, Ji), this._resetElementAttributes(Ql, Jl);
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
    if ($e(t)) {
      e(t);
      return;
    }
    for (const n of V.find(t, this._element))
      e(n);
  }
}
const Rg = "modal", $g = "bs.modal", Kt = `.${$g}`, Dg = ".data-api", Mg = "Escape", qg = `hide${Kt}`, Bg = `hidePrevented${Kt}`, uh = `hidden${Kt}`, hh = `show${Kt}`, Pg = `shown${Kt}`, jg = `resize${Kt}`, Vg = `click.dismiss${Kt}`, Ug = `mousedown.dismiss${Kt}`, Fg = `keydown.dismiss${Kt}`, Hg = `click${Kt}${Dg}`, tc = "modal-open", Wg = "fade", ec = "show", jo = "modal-static", zg = ".modal.show", Kg = ".modal-dialog", Gg = ".modal-body", Yg = '[data-bs-toggle="modal"]', Xg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Zg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Rs extends re {
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
    this._isShown || this._isTransitioning || x.trigger(this._element, hh, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(tc), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || x.trigger(this._element, qg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(ec), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    x.off(window, Kt), x.off(this._dialog, Kt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new lh({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new ch({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const e = V.findOne(Gg, this._dialog);
    e && (e.scrollTop = 0), Ti(this._element), this._element.classList.add(ec);
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
      document.body.classList.remove(tc), this._resetAdjustments(), this._scrollBar.reset(), x.trigger(this._element, uh);
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
      const n = Rs.getOrCreateInstance(this, t);
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
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), x.one(t, hh, (i) => {
    i.defaultPrevented || x.one(t, uh, () => {
      xn(this) && this.focus();
    });
  });
  const e = V.findOne(zg);
  e && Rs.getInstance(e).hide(), Rs.getOrCreateInstance(t).toggle(this);
});
Lr(Rs);
Gt(Rs);
const Qg = "offcanvas", Jg = "bs.offcanvas", je = `.${Jg}`, dh = ".data-api", tm = `load${je}${dh}`, em = "Escape", sc = "show", nc = "showing", ic = "hiding", sm = "offcanvas-backdrop", fh = ".offcanvas.show", nm = `show${je}`, im = `shown${je}`, rm = `hide${je}`, rc = `hidePrevented${je}`, ph = `hidden${je}`, om = `resize${je}`, am = `click${je}${dh}`, lm = `keydown.dismiss${je}`, cm = '[data-bs-toggle="offcanvas"]', um = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, hm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class rs extends re {
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
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new pa().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(nc);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(sc), this._element.classList.remove(nc), x.trigger(this._element, im, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || x.trigger(this._element, rm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ic), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(sc, ic), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new pa().reset(), x.trigger(this._element, ph);
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
        x.trigger(this._element, rc);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new lh({
      className: sm,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null
    });
  }
  _initializeFocusTrap() {
    return new ch({
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
        x.trigger(this._element, rc);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = rs.getOrCreateInstance(this, t);
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
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), is(this))
    return;
  x.one(t, ph, () => {
    xn(this) && this.focus();
  });
  const e = V.findOne(fh);
  e && e !== t && rs.getInstance(e).hide(), rs.getOrCreateInstance(t).toggle(this);
});
x.on(window, tm, () => {
  for (const s of V.find(fh))
    rs.getOrCreateInstance(s).show();
});
x.on(window, om, () => {
  for (const s of V.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && rs.getOrCreateInstance(s).hide();
});
Lr(rs);
Gt(rs);
const dm = /^aria-[\w-]*$/i, gh = {
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
    const l = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(l)) {
      o.remove();
      continue;
    }
    const a = [].concat(...o.attributes), h = [].concat(t["*"] || [], t[l] || []);
    for (const c of a)
      gm(c, h) || o.removeAttribute(c.nodeName);
  }
  return i.body.innerHTML;
}
const bm = "TemplateFactory", ym = {
  allowList: gh,
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
class Em extends Ai {
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
      if ($e(e)) {
        this._putElementInTemplate(ns(e), i);
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
const wm = "tooltip", Tm = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Vo = "fade", Am = "modal", tr = "show", Nm = ".tooltip-inner", oc = `.${Am}`, ac = "hide.bs.modal", Qn = "hover", Uo = "focus", Om = "click", Cm = "manual", Sm = "hide", Lm = "hidden", km = "show", xm = "shown", Im = "inserted", Rm = "click", $m = "focusin", Dm = "focusout", Mm = "mouseenter", qm = "mouseleave", Bm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: zt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: zt() ? "right" : "left"
}, Pm = {
  allowList: gh,
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
let Ir = class mh extends re {
  constructor(t, e) {
    if (typeof Uu > "u")
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
    clearTimeout(this._timeout), x.off(this._element.closest(oc), ac, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = x.trigger(this._element, this.constructor.eventName(km)), n = (Wu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), x.trigger(this._element, this.constructor.eventName(Im))), this._popper = this._createPopper(i), i.classList.add(tr), "ontouchstart" in document.documentElement)
      for (const l of [].concat(...document.body.children))
        x.on(l, "mouseover", mr);
    const o = () => {
      x.trigger(this._element, this.constructor.eventName(xm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || x.trigger(this._element, this.constructor.eventName(Sm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(tr), "ontouchstart" in document.documentElement)
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
    e.classList.remove(Vo, tr), e.classList.add(`bs-${this.constructor.NAME}-auto`);
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
    return this.tip && this.tip.classList.contains(tr);
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
        const n = e === Qn ? this.constructor.eventName(Mm) : this.constructor.eventName($m), i = e === Qn ? this.constructor.eventName(qm) : this.constructor.eventName(Dm);
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
    }, x.on(this._element.closest(oc), ac, this._hideModalHandler);
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
      Tm.has(n) && delete e[n];
    return t = {
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : ns(t.container), typeof t.delay == "number" && (t.delay = {
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
      const e = mh.getOrCreateInstance(this, t);
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
const zm = "scrollspy", Km = "bs.scrollspy", il = `.${Km}`, Gm = ".data-api", Ym = `activate${il}`, lc = `click${il}`, Xm = `load${il}${Gm}`, Zm = "dropdown-item", nn = "active", Qm = '[data-bs-spy="scroll"]', Fo = "[href]", Jm = ".nav, .list-group", cc = ".nav-link", tb = ".nav-item", eb = ".list-group-item", sb = `${cc}, ${tb} > ${cc}, ${eb}`, nb = ".dropdown", ib = ".dropdown-toggle", rb = {
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
    return t.target = ns(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (x.off(this._config.target, lc), x.on(this._config.target, lc, Fo, (t) => {
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
    const t = V.find(Fo, this._config.target);
    for (const e of t) {
      if (!e.hash || is(e))
        continue;
      const n = V.findOne(decodeURI(e.hash), this._element);
      xn(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(nn), this._activateParents(t), x.trigger(this._element, Ym, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Zm)) {
      V.findOne(ib, t.closest(nb)).classList.add(nn);
      return;
    }
    for (const e of V.parents(t, Jm))
      for (const n of V.prev(e, sb))
        n.classList.add(nn);
  }
  _clearActiveClass(t) {
    t.classList.remove(nn);
    const e = V.find(`${Fo}.${nn}`, t);
    for (const n of e)
      n.classList.remove(nn);
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
const ab = "tab", lb = "bs.tab", Bs = `.${lb}`, cb = `hide${Bs}`, ub = `hidden${Bs}`, hb = `show${Bs}`, db = `shown${Bs}`, fb = `click${Bs}`, pb = `keydown${Bs}`, gb = `load${Bs}`, mb = "ArrowLeft", uc = "ArrowRight", bb = "ArrowUp", hc = "ArrowDown", Ho = "Home", dc = "End", Ss = "active", fc = "fade", Wo = "show", yb = "dropdown", bh = ".dropdown-toggle", vb = ".dropdown-menu", zo = `:not(${bh})`, _b = '.list-group, .nav, [role="tablist"]', Eb = ".nav-item, .list-group-item", wb = `.nav-link${zo}, .list-group-item${zo}, [role="tab"]${zo}`, yh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Ko = `${wb}, ${yh}`, Tb = `.${Ss}[data-bs-toggle="tab"], .${Ss}[data-bs-toggle="pill"], .${Ss}[data-bs-toggle="list"]`;
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
    t.classList.add(Ss), this._activate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Wo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), x.trigger(t, db, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(fc));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(Ss), t.blur(), this._deactivate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Wo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), x.trigger(t, ub, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(fc));
  }
  _keydown(t) {
    if (![mb, uc, bb, hc, Ho, dc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !is(i));
    let n;
    if ([Ho, dc].includes(t.key))
      n = e[t.key === Ho ? 0 : e.length - 1];
    else {
      const i = [uc, hc].includes(t.key);
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
      const l = V.findOne(r, n);
      l && l.classList.toggle(o, e);
    };
    i(bh, Ss), i(vb, Wo), n.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, n) {
    t.hasAttribute(e) || t.setAttribute(e, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Ss);
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
x.on(document, fb, yh, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !is(this) && An.getOrCreateInstance(this).show();
});
x.on(window, gb, () => {
  for (const s of V.find(Tb))
    An.getOrCreateInstance(s);
});
Gt(An);
const Ab = "toast", Nb = "bs.toast", cs = `.${Nb}`, Ob = `mouseover${cs}`, Cb = `mouseout${cs}`, Sb = `focusin${cs}`, Lb = `focusout${cs}`, kb = `hide${cs}`, xb = `hidden${cs}`, Ib = `show${cs}`, Rb = `shown${cs}`, $b = "fade", pc = "hide", er = "show", sr = "showing", Db = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Mb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class $r extends re {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Mb;
  }
  static get DefaultType() {
    return Db;
  }
  static get NAME() {
    return Ab;
  }
  // Public
  show() {
    if (x.trigger(this._element, Ib).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add($b);
    const e = () => {
      this._element.classList.remove(sr), x.trigger(this._element, Rb), this._maybeScheduleHide();
    };
    this._element.classList.remove(pc), Ti(this._element), this._element.classList.add(er, sr), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || x.trigger(this._element, kb).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(pc), this._element.classList.remove(sr, er), x.trigger(this._element, xb);
    };
    this._element.classList.add(sr), this._queueCallback(e, this._element, this._config.animation);
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
      const e = $r.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Lr($r);
Gt($r);
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
function Dr(s, t) {
  for (const e in t)
    t[e] instanceof Object && e in s && Object.assign(t[e], Dr(s[e], t[e]));
  return Object.assign(s || {}, t);
}
function rl(s, t, e, n) {
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
function Ze(s, t, e) {
  return t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), s != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), t.auth && (t.auth.type == "Basic" && t.auth.user && (t.options.headers.Authorization = "Basic " + btoa(t.auth.user + ":" + t.auth.password)), t.auth.type == "Bearer" && t.auth.token && (t.options.headers.Authorization = "Bearer " + t.auth.token), t.auth.type == "Cookie" && (t.options.credentials = "include")), t.options.body = void 0, t.options.method = s, e && Object.assign(t.options, e), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function Qe(s, t, e, n) {
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
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (l, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][s] ? i(s, e) : i(t[n][s]);
}
function jb(s, t, e = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(e), i = s.map(
    (r) => t.map((o) => {
      let l = r[o.name];
      return o.template ? o.template(l, r, s) : l !== void 0 ? l : "";
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
var vh = typeof global == "object" && global && global.Object === Object && global, Xb = typeof self == "object" && self && self.Object === Object && self, Ae = vh || Xb || Function("return this")(), os = Ae.Symbol, _h = Object.prototype, Zb = _h.hasOwnProperty, Qb = _h.toString, ti = os ? os.toStringTag : void 0;
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
var n1 = "[object Null]", i1 = "[object Undefined]", gc = os ? os.toStringTag : void 0;
function Rn(s) {
  return s == null ? s === void 0 ? i1 : n1 : gc && gc in Object(s) ? Jb(s) : s1(s);
}
function qe(s) {
  return s != null && typeof s == "object";
}
var $s = Array.isArray;
function us(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function Eh(s) {
  return s;
}
var r1 = "[object AsyncFunction]", o1 = "[object Function]", a1 = "[object GeneratorFunction]", l1 = "[object Proxy]";
function ol(s) {
  if (!us(s))
    return !1;
  var t = Rn(s);
  return t == o1 || t == a1 || t == r1 || t == l1;
}
var Go = Ae["__core-js_shared__"], mc = function() {
  var s = /[^.]+$/.exec(Go && Go.keys && Go.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function c1(s) {
  return !!mc && mc in s;
}
var u1 = Function.prototype, h1 = u1.toString;
function Ps(s) {
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
  if (!us(s) || c1(s))
    return !1;
  var t = ol(s) ? y1 : f1;
  return t.test(Ps(s));
}
function _1(s, t) {
  return s == null ? void 0 : s[t];
}
function js(s, t) {
  var e = _1(s, t);
  return v1(e) ? e : void 0;
}
var ga = js(Ae, "WeakMap"), bc = Object.create, E1 = /* @__PURE__ */ function() {
  function s() {
  }
  return function(t) {
    if (!us(t))
      return {};
    if (bc)
      return bc(t);
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
    var s = js(Object, "defineProperty");
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
function al(s, t, e) {
  t == "__proto__" && _r ? _r(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
function Ci(s, t) {
  return s === t || s !== s && t !== t;
}
var R1 = Object.prototype, $1 = R1.hasOwnProperty;
function Ah(s, t, e) {
  var n = s[t];
  (!($1.call(s, t) && Ci(n, e)) || e === void 0 && !(t in s)) && al(s, t, e);
}
function Si(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var l = t[r], a = void 0;
    a === void 0 && (a = s[l]), i ? al(e, l, a) : Ah(e, l, a);
  }
  return e;
}
var yc = Math.max;
function D1(s, t, e) {
  return t = yc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = yc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var l = Array(t + 1); ++i < t; )
      l[i] = n[i];
    return l[t] = e(o), w1(s, this, l);
  };
}
function M1(s, t) {
  return L1(D1(s, t, Eh), s + "");
}
var q1 = 9007199254740991;
function Nh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= q1;
}
function qr(s) {
  return s != null && Nh(s.length) && !ol(s);
}
function B1(s, t, e) {
  if (!us(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? qr(e) && Th(t, e.length) : n == "string" && t in e) ? Ci(e[t], s) : !1;
}
function P1(s) {
  return M1(function(t, e) {
    var n = -1, i = e.length, r = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (r = s.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && B1(e[0], e[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var l = e[n];
      l && s(t, l, n, r);
    }
    return t;
  });
}
var j1 = Object.prototype;
function ll(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || j1;
  return s === e;
}
function V1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var U1 = "[object Arguments]";
function vc(s) {
  return qe(s) && Rn(s) == U1;
}
var Oh = Object.prototype, F1 = Oh.hasOwnProperty, H1 = Oh.propertyIsEnumerable, ma = vc(/* @__PURE__ */ function() {
  return arguments;
}()) ? vc : function(s) {
  return qe(s) && F1.call(s, "callee") && !H1.call(s, "callee");
};
function W1() {
  return !1;
}
var Ch = typeof exports == "object" && exports && !exports.nodeType && exports, _c = Ch && typeof module == "object" && module && !module.nodeType && module, z1 = _c && _c.exports === Ch, Ec = z1 ? Ae.Buffer : void 0, K1 = Ec ? Ec.isBuffer : void 0, pi = K1 || W1, G1 = "[object Arguments]", Y1 = "[object Array]", X1 = "[object Boolean]", Z1 = "[object Date]", Q1 = "[object Error]", J1 = "[object Function]", ty = "[object Map]", ey = "[object Number]", sy = "[object Object]", ny = "[object RegExp]", iy = "[object Set]", ry = "[object String]", oy = "[object WeakMap]", ay = "[object ArrayBuffer]", ly = "[object DataView]", cy = "[object Float32Array]", uy = "[object Float64Array]", hy = "[object Int8Array]", dy = "[object Int16Array]", fy = "[object Int32Array]", py = "[object Uint8Array]", gy = "[object Uint8ClampedArray]", my = "[object Uint16Array]", by = "[object Uint32Array]", st = {};
st[cy] = st[uy] = st[hy] = st[dy] = st[fy] = st[py] = st[gy] = st[my] = st[by] = !0;
st[G1] = st[Y1] = st[ay] = st[X1] = st[ly] = st[Z1] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = st[ny] = st[iy] = st[ry] = st[oy] = !1;
function yy(s) {
  return qe(s) && Nh(s.length) && !!st[Rn(s)];
}
function cl(s) {
  return function(t) {
    return s(t);
  };
}
var Sh = typeof exports == "object" && exports && !exports.nodeType && exports, ci = Sh && typeof module == "object" && module && !module.nodeType && module, vy = ci && ci.exports === Sh, Yo = vy && vh.process, Nn = function() {
  try {
    var s = ci && ci.require && ci.require("util").types;
    return s || Yo && Yo.binding && Yo.binding("util");
  } catch {
  }
}(), wc = Nn && Nn.isTypedArray, ul = wc ? cl(wc) : yy, _y = Object.prototype, Ey = _y.hasOwnProperty;
function Lh(s, t) {
  var e = $s(s), n = !e && ma(s), i = !e && !n && pi(s), r = !e && !n && !i && ul(s), o = e || n || i || r, l = o ? V1(s.length, String) : [], a = l.length;
  for (var h in s)
    (t || Ey.call(s, h)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    Th(h, a))) && l.push(h);
  return l;
}
function kh(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var wy = kh(Object.keys, Object), Ty = Object.prototype, Ay = Ty.hasOwnProperty;
function Ny(s) {
  if (!ll(s))
    return wy(s);
  var t = [];
  for (var e in Object(s))
    Ay.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function hl(s) {
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
  if (!us(s))
    return Oy(s);
  var t = ll(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !Sy.call(s, n)) || e.push(n);
  return e;
}
function Li(s) {
  return qr(s) ? Lh(s, !0) : Ly(s);
}
var gi = js(Object, "create");
function ky() {
  this.__data__ = gi ? gi(null) : {}, this.size = 0;
}
function xy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var Iy = "__lodash_hash_undefined__", Ry = Object.prototype, $y = Ry.hasOwnProperty;
function Dy(s) {
  var t = this.__data__;
  if (gi) {
    var e = t[s];
    return e === Iy ? void 0 : e;
  }
  return $y.call(t, s) ? t[s] : void 0;
}
var My = Object.prototype, qy = My.hasOwnProperty;
function By(s) {
  var t = this.__data__;
  return gi ? t[s] !== void 0 : qy.call(t, s);
}
var Py = "__lodash_hash_undefined__";
function jy(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = gi && t === void 0 ? Py : t, this;
}
function Ds(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Ds.prototype.clear = ky;
Ds.prototype.delete = xy;
Ds.prototype.get = Dy;
Ds.prototype.has = By;
Ds.prototype.set = jy;
function Vy() {
  this.__data__ = [], this.size = 0;
}
function Br(s, t) {
  for (var e = s.length; e--; )
    if (Ci(s[e][0], t))
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
var mi = js(Ae, "Map");
function Gy() {
  this.size = 0, this.__data__ = {
    hash: new Ds(),
    map: new (mi || Ve)(),
    string: new Ds()
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
function Vs(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Vs.prototype.clear = Gy;
Vs.prototype.delete = Xy;
Vs.prototype.get = Zy;
Vs.prototype.has = Qy;
Vs.prototype.set = Jy;
function xh(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var dl = kh(Object.getPrototypeOf, Object), tv = "[object Object]", ev = Function.prototype, sv = Object.prototype, Ih = ev.toString, nv = sv.hasOwnProperty, iv = Ih.call(Object);
function rv(s) {
  if (!qe(s) || Rn(s) != tv)
    return !1;
  var t = dl(s);
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
    if (!mi || n.length < uv - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new Vs(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function ve(s) {
  var t = this.__data__ = new Ve(s);
  this.size = t.size;
}
ve.prototype.clear = ov;
ve.prototype.delete = av;
ve.prototype.get = lv;
ve.prototype.has = cv;
ve.prototype.set = hv;
function dv(s, t) {
  return s && Si(t, hl(t), s);
}
function fv(s, t) {
  return s && Si(t, Li(t), s);
}
var Rh = typeof exports == "object" && exports && !exports.nodeType && exports, Tc = Rh && typeof module == "object" && module && !module.nodeType && module, pv = Tc && Tc.exports === Rh, Ac = pv ? Ae.Buffer : void 0, Nc = Ac ? Ac.allocUnsafe : void 0;
function $h(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = Nc ? Nc(e) : new s.constructor(e);
  return s.copy(n), n;
}
function gv(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function Dh() {
  return [];
}
var mv = Object.prototype, bv = mv.propertyIsEnumerable, Oc = Object.getOwnPropertySymbols, fl = Oc ? function(s) {
  return s == null ? [] : (s = Object(s), gv(Oc(s), function(t) {
    return bv.call(s, t);
  }));
} : Dh;
function yv(s, t) {
  return Si(s, fl(s), t);
}
var vv = Object.getOwnPropertySymbols, Mh = vv ? function(s) {
  for (var t = []; s; )
    xh(t, fl(s)), s = dl(s);
  return t;
} : Dh;
function _v(s, t) {
  return Si(s, Mh(s), t);
}
function qh(s, t, e) {
  var n = t(s);
  return $s(s) ? n : xh(n, e(s));
}
function ba(s) {
  return qh(s, hl, fl);
}
function Ev(s) {
  return qh(s, Li, Mh);
}
var ya = js(Ae, "DataView"), va = js(Ae, "Promise"), _a = js(Ae, "Set"), Cc = "[object Map]", wv = "[object Object]", Sc = "[object Promise]", Lc = "[object Set]", kc = "[object WeakMap]", xc = "[object DataView]", Tv = Ps(ya), Av = Ps(mi), Nv = Ps(va), Ov = Ps(_a), Cv = Ps(ga), ee = Rn;
(ya && ee(new ya(new ArrayBuffer(1))) != xc || mi && ee(new mi()) != Cc || va && ee(va.resolve()) != Sc || _a && ee(new _a()) != Lc || ga && ee(new ga()) != kc) && (ee = function(s) {
  var t = Rn(s), e = t == wv ? s.constructor : void 0, n = e ? Ps(e) : "";
  if (n)
    switch (n) {
      case Tv:
        return xc;
      case Av:
        return Cc;
      case Nv:
        return Sc;
      case Ov:
        return Lc;
      case Cv:
        return kc;
    }
  return t;
});
var Sv = Object.prototype, Lv = Sv.hasOwnProperty;
function kv(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && Lv.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var Er = Ae.Uint8Array;
function pl(s) {
  var t = new s.constructor(s.byteLength);
  return new Er(t).set(new Er(s)), t;
}
function xv(s, t) {
  var e = t ? pl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var Iv = /\w*$/;
function Rv(s) {
  var t = new s.constructor(s.source, Iv.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var Ic = os ? os.prototype : void 0, Rc = Ic ? Ic.valueOf : void 0;
function $v(s) {
  return Rc ? Object(Rc.call(s)) : {};
}
function Bh(s, t) {
  var e = t ? pl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var Dv = "[object Boolean]", Mv = "[object Date]", qv = "[object Map]", Bv = "[object Number]", Pv = "[object RegExp]", jv = "[object Set]", Vv = "[object String]", Uv = "[object Symbol]", Fv = "[object ArrayBuffer]", Hv = "[object DataView]", Wv = "[object Float32Array]", zv = "[object Float64Array]", Kv = "[object Int8Array]", Gv = "[object Int16Array]", Yv = "[object Int32Array]", Xv = "[object Uint8Array]", Zv = "[object Uint8ClampedArray]", Qv = "[object Uint16Array]", Jv = "[object Uint32Array]";
function t0(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case Fv:
      return pl(s);
    case Dv:
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
      return $v(s);
  }
}
function Ph(s) {
  return typeof s.constructor == "function" && !ll(s) ? E1(dl(s)) : {};
}
var e0 = "[object Map]";
function s0(s) {
  return qe(s) && ee(s) == e0;
}
var $c = Nn && Nn.isMap, n0 = $c ? cl($c) : s0, i0 = "[object Set]";
function r0(s) {
  return qe(s) && ee(s) == i0;
}
var Dc = Nn && Nn.isSet, o0 = Dc ? cl(Dc) : r0, a0 = 1, l0 = 2, c0 = 4, jh = "[object Arguments]", u0 = "[object Array]", h0 = "[object Boolean]", d0 = "[object Date]", f0 = "[object Error]", Vh = "[object Function]", p0 = "[object GeneratorFunction]", g0 = "[object Map]", m0 = "[object Number]", Uh = "[object Object]", b0 = "[object RegExp]", y0 = "[object Set]", v0 = "[object String]", _0 = "[object Symbol]", E0 = "[object WeakMap]", w0 = "[object ArrayBuffer]", T0 = "[object DataView]", A0 = "[object Float32Array]", N0 = "[object Float64Array]", O0 = "[object Int8Array]", C0 = "[object Int16Array]", S0 = "[object Int32Array]", L0 = "[object Uint8Array]", k0 = "[object Uint8ClampedArray]", x0 = "[object Uint16Array]", I0 = "[object Uint32Array]", et = {};
et[jh] = et[u0] = et[w0] = et[T0] = et[h0] = et[d0] = et[A0] = et[N0] = et[O0] = et[C0] = et[S0] = et[g0] = et[m0] = et[Uh] = et[b0] = et[y0] = et[v0] = et[_0] = et[L0] = et[k0] = et[x0] = et[I0] = !0;
et[f0] = et[Vh] = et[E0] = !1;
function dr(s, t, e, n, i, r) {
  var o, l = t & a0, a = t & l0, h = t & c0;
  if (o !== void 0)
    return o;
  if (!us(s))
    return s;
  var c = $s(s);
  if (c) {
    if (o = kv(s), !l)
      return wh(s, o);
  } else {
    var f = ee(s), g = f == Vh || f == p0;
    if (pi(s))
      return $h(s, l);
    if (f == Uh || f == jh || g && !i) {
      if (o = a || g ? {} : Ph(s), !l)
        return a ? _v(s, fv(o, s)) : yv(s, dv(o, s));
    } else {
      if (!et[f])
        return i ? s : {};
      o = t0(s, f, l);
    }
  }
  r || (r = new ve());
  var m = r.get(s);
  if (m)
    return m;
  r.set(s, o), o0(s) ? s.forEach(function(w) {
    o.add(dr(w, t, e, w, s, r));
  }) : n0(s) && s.forEach(function(w, T) {
    o.set(T, dr(w, t, e, T, s, r));
  });
  var _ = h ? a ? Ev : ba : a ? Li : hl, E = c ? void 0 : _(s);
  return k1(E || s, function(w, T) {
    E && (T = w, w = s[T]), Ah(o, T, dr(w, t, e, T, s, r));
  }), o;
}
var R0 = 1, $0 = 4;
function mn(s) {
  return dr(s, R0 | $0);
}
var D0 = "__lodash_hash_undefined__";
function M0(s) {
  return this.__data__.set(s, D0), this;
}
function q0(s) {
  return this.__data__.has(s);
}
function wr(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new Vs(); ++t < e; )
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
  var o = e & j0, l = s.length, a = t.length;
  if (l != a && !(o && a > l))
    return !1;
  var h = r.get(s), c = r.get(t);
  if (h && c)
    return h == t && c == s;
  var f = -1, g = !0, m = e & V0 ? new wr() : void 0;
  for (r.set(s, t), r.set(t, s); ++f < l; ) {
    var _ = s[f], E = t[f];
    if (n)
      var w = o ? n(E, _, f, t, s, r) : n(_, E, f, s, t, r);
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
var H0 = 1, W0 = 2, z0 = "[object Boolean]", K0 = "[object Date]", G0 = "[object Error]", Y0 = "[object Map]", X0 = "[object Number]", Z0 = "[object RegExp]", Q0 = "[object Set]", J0 = "[object String]", t_ = "[object Symbol]", e_ = "[object ArrayBuffer]", s_ = "[object DataView]", Mc = os ? os.prototype : void 0, Xo = Mc ? Mc.valueOf : void 0;
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
      return Ci(+s, +t);
    case G0:
      return s.name == t.name && s.message == t.message;
    case Z0:
    case J0:
      return s == t + "";
    case Y0:
      var l = U0;
    case Q0:
      var a = n & H0;
      if (l || (l = F0), s.size != t.size && !a)
        return !1;
      var h = o.get(s);
      if (h)
        return h == t;
      n |= W0, o.set(s, t);
      var c = Fh(l(s), l(t), n, i, r, o);
      return o.delete(s), c;
    case t_:
      if (Xo)
        return Xo.call(s) == Xo.call(t);
  }
  return !1;
}
var i_ = 1, r_ = Object.prototype, o_ = r_.hasOwnProperty;
function a_(s, t, e, n, i, r) {
  var o = e & i_, l = ba(s), a = l.length, h = ba(t), c = h.length;
  if (a != c && !o)
    return !1;
  for (var f = a; f--; ) {
    var g = l[f];
    if (!(o ? g in t : o_.call(t, g)))
      return !1;
  }
  var m = r.get(s), _ = r.get(t);
  if (m && _)
    return m == t && _ == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var w = o; ++f < a; ) {
    g = l[f];
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
var l_ = 1, qc = "[object Arguments]", Bc = "[object Array]", nr = "[object Object]", c_ = Object.prototype, Pc = c_.hasOwnProperty;
function u_(s, t, e, n, i, r) {
  var o = $s(s), l = $s(t), a = o ? Bc : ee(s), h = l ? Bc : ee(t);
  a = a == qc ? nr : a, h = h == qc ? nr : h;
  var c = a == nr, f = h == nr, g = a == h;
  if (g && pi(s)) {
    if (!pi(t))
      return !1;
    o = !0, c = !1;
  }
  if (g && !c)
    return r || (r = new ve()), o || ul(s) ? Fh(s, t, e, n, i, r) : n_(s, t, a, e, n, i, r);
  if (!(e & l_)) {
    var m = c && Pc.call(s, "__wrapped__"), _ = f && Pc.call(t, "__wrapped__");
    if (m || _) {
      var E = m ? s.value() : s, w = _ ? t.value() : t;
      return r || (r = new ve()), i(E, w, e, n, r);
    }
  }
  return g ? (r || (r = new ve()), a_(s, t, e, n, i, r)) : !1;
}
function Hh(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !qe(s) && !qe(t) ? s !== s && t !== t : u_(s, t, e, n, Hh, i);
}
function h_(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), l = o.length; l--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var d_ = h_();
function Ea(s, t, e) {
  (e !== void 0 && !Ci(s[t], e) || e === void 0 && !(t in s)) && al(s, t, e);
}
function f_(s) {
  return qe(s) && qr(s);
}
function wa(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function p_(s) {
  return Si(s, Li(s));
}
function g_(s, t, e, n, i, r, o) {
  var l = wa(s, e), a = wa(t, e), h = o.get(a);
  if (h) {
    Ea(s, e, h);
    return;
  }
  var c = r ? r(l, a, e + "", s, t, o) : void 0, f = c === void 0;
  if (f) {
    var g = $s(a), m = !g && pi(a), _ = !g && !m && ul(a);
    c = a, g || m || _ ? $s(l) ? c = l : f_(l) ? c = wh(l) : m ? (f = !1, c = $h(a, !0)) : _ ? (f = !1, c = Bh(a, !0)) : c = [] : rv(a) || ma(a) ? (c = l, ma(l) ? c = p_(l) : (!us(l) || ol(l)) && (c = Ph(a))) : f = !1;
  }
  f && (o.set(a, c), i(c, a, n, r, o), o.delete(a)), Ea(s, e, c);
}
function Wh(s, t, e, n, i) {
  s !== t && d_(t, function(r, o) {
    if (i || (i = new ve()), us(r))
      g_(s, t, o, e, Wh, n, i);
    else {
      var l = n ? n(wa(s, o), r, o + "", s, t, i) : void 0;
      l === void 0 && (l = r), Ea(s, o, l);
    }
  }, Li);
}
function gl(s, t) {
  return Hh(s, t);
}
var ss = P1(function(s, t, e) {
  Wh(s, t, e);
}), B = /* @__PURE__ */ ((s) => (s[s.TYPE = 3] = "TYPE", s[s.LEVEL = 12] = "LEVEL", s[s.ATTRIBUTE = 13] = "ATTRIBUTE", s[s.BLOT = 14] = "BLOT", s[s.INLINE = 7] = "INLINE", s[s.BLOCK = 11] = "BLOCK", s[s.BLOCK_BLOT = 10] = "BLOCK_BLOT", s[s.INLINE_BLOT = 6] = "INLINE_BLOT", s[s.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", s[s.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", s[s.ANY = 15] = "ANY", s))(B || {});
class we {
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
class bn extends Error {
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
      throw new bn(`Unable to create ${e} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(n)
    ), l = new r(t, o, n);
    return Ta.blots.set(l.domNode, l), l;
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
        throw new bn("Invalid definition");
      if (n && e.blotName === "abstract")
        throw new bn("Cannot register abstract class");
      const r = n ? e.blotName : i ? e.attrName : void 0;
      return this.types[r] = e, i ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : n && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((o) => o.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((o) => {
        (this.tags[o] == null || e.className == null) && (this.tags[o] = e);
      }))), e;
    });
  }
};
zh.blots = /* @__PURE__ */ new WeakMap();
let On = zh;
function jc(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class m_ extends we {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    jc(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = (jc(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const oe = m_;
function Zo(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class b_ extends we {
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
const hs = b_;
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
    const e = we.keys(this.domNode), n = oe.keys(this.domNode), i = hs.keys(this.domNode);
    e.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, B.ATTRIBUTE);
      o instanceof we && (this.attributes[o.attrName] = o);
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
      throw new bn("Blot definition missing tagName");
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
      throw new bn(`Cannot wrap ${t}`);
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
    const l = this.iterator(i);
    let a = l();
    for (; a && o < t + e; ) {
      const h = a.length();
      t > o ? n(
        a,
        t - o,
        Math.min(e, o + h - t)
      ) : n(a, 0, Math.min(h, t + e - o)), o += h, a = l();
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
function Vc(s, t) {
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
        const e = Vc(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof bn)
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
      (o, l, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof Xe && (i = i.concat(
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
      ) || (e.statics.scope === B.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof Xe ? e.unwrap() : e.remove());
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
      const l = Vc(r, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
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
const ln = class cn extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(cn.blotName);
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
        n instanceof cn || (n = n.wrap(cn.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, B.INLINE);
      if (n == null)
        return;
      n instanceof we ? this.attributes.attribute(n, e) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e);
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
    n instanceof cn && n.prev === this && w_(e, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof cn && this.attributes.move(n), n;
  }
};
ln.allowedChildren = [ln, yt], ln.blotName = "inline", ln.scope = B.INLINE_BLOT, ln.tagName = "SPAN";
let T_ = ln;
const ml = T_, un = class Aa extends ne {
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
    n != null && (n instanceof we ? this.attributes.attribute(n, e) : t === this.statics.blotName && !e ? this.replaceWith(Aa.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
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
un.blotName = "block", un.scope = B.BLOCK_BLOT, un.tagName = "P", un.allowedChildren = [
  ml,
  un,
  yt
];
let A_ = un;
const bi = A_, Na = class extends ne {
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
const $t = O_, C_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, S_ = 100, hn = class extends ne {
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
    const r = (a, h = !0) => {
      a == null || a === this || a.domNode.parentNode != null && (n.has(a.domNode) || n.set(a.domNode, []), h && r(a.parent));
    }, o = (a) => {
      n.has(a.domNode) && (a instanceof ne && a.children.forEach(o), n.delete(a.domNode), a.optimize(e));
    };
    let l = t;
    for (let a = 0; l.length > 0; a += 1) {
      if (a >= S_)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((h) => {
        const c = this.find(h.target, !0);
        c != null && (c.domNode === h.target && (h.type === "childList" ? (r(this.find(h.previousSibling, !1)), Array.from(h.addedNodes).forEach((f) => {
          const g = this.find(f, !1);
          r(g, !1), g instanceof ne && g.children.forEach((m) => {
            r(m, !1);
          });
        })) : h.type === "attributes" && r(c.prev)), r(c));
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
hn.blotName = "scroll", hn.defaultChild = bi, hn.allowedChildren = [bi, Vr], hn.scope = B.BLOCK_BLOT, hn.tagName = "DIV";
let L_ = hn;
const bl = L_, Oa = class Zh extends yt {
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
  Attributor: we,
  AttributorStore: jr,
  BlockBlot: bi,
  ClassAttributor: oe,
  ContainerBlot: Vr,
  EmbedBlot: $t,
  InlineBlot: ml,
  LeafBlot: yt,
  ParentBlot: ne,
  Registry: On,
  Scope: B,
  ScrollBlot: bl,
  StyleAttributor: hs,
  TextBlot: Tr
}, Symbol.toStringTag, { value: "Module" }));
var Je = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qh(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ca = { exports: {} }, kt = -1, wt = 1, ct = 0;
function yi(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = j_(s, t, e);
    if (r)
      return r;
  }
  var o = yl(s, t), l = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = Ur(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var h = I_(s, t);
  return l && h.unshift([ct, l]), a && h.push([ct, a]), vl(h, i), n && D_(h), h;
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
  var o = $_(s, t);
  if (o) {
    var l = o[0], a = o[1], h = o[2], c = o[3], f = o[4], g = yi(l, h), m = yi(a, c);
    return g.concat([[ct, f]], m);
  }
  return R_(s, t);
}
function R_(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, l = new Array(o), a = new Array(o), h = 0; h < o; h++)
    l[h] = -1, a[h] = -1;
  l[r + 1] = 0, a[r + 1] = 0;
  for (var c = e - n, f = c % 2 !== 0, g = 0, m = 0, _ = 0, E = 0, w = 0; w < i; w++) {
    for (var T = -w + g; T <= w - m; T += 2) {
      var C = r + T, L;
      T === -w || T !== w && l[C - 1] < l[C + 1] ? L = l[C + 1] : L = l[C - 1] + 1;
      for (var k = L - T; L < e && k < n && s.charAt(L) === t.charAt(k); )
        L++, k++;
      if (l[C] = L, L > e)
        m += 2;
      else if (k > n)
        g += 2;
      else if (f) {
        var I = r + c - T;
        if (I >= 0 && I < o && a[I] !== -1) {
          var $ = e - a[I];
          if (L >= $)
            return Uc(s, t, L, k);
        }
      }
    }
    for (var P = -w + _; P <= w - E; P += 2) {
      var I = r + P, $;
      P === -w || P !== w && a[I - 1] < a[I + 1] ? $ = a[I + 1] : $ = a[I - 1] + 1;
      for (var F = $ - P; $ < e && F < n && s.charAt(e - $ - 1) === t.charAt(n - F - 1); )
        $++, F++;
      if (a[I] = $, $ > e)
        E += 2;
      else if (F > n)
        _ += 2;
      else if (!f) {
        var C = r + c - P;
        if (C >= 0 && C < o && l[C] !== -1) {
          var L = l[C], k = r + L - C;
          if ($ = e - $, L >= $)
            return Uc(s, t, L, k);
        }
      }
    }
  }
  return [
    [kt, s],
    [wt, t]
  ];
}
function Uc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), l = t.substring(n), a = yi(i, r), h = yi(o, l);
  return a.concat(h);
}
function yl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return Jh(s.charCodeAt(i - 1)) && i--, i;
}
function Fc(s, t) {
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
function Ur(s, t) {
  if (!s || !t || s.slice(-1) !== t.slice(-1))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(s.length - i, s.length - r) == t.substring(t.length - i, t.length - r) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return td(s.charCodeAt(s.length - i)) && i--, i;
}
function $_(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(m, _, E) {
    for (var w = m.substring(E, E + Math.floor(m.length / 4)), T = -1, C = "", L, k, I, $; (T = _.indexOf(w, T + 1)) !== -1; ) {
      var P = yl(
        m.substring(E),
        _.substring(T)
      ), F = Ur(
        m.substring(0, E),
        _.substring(0, T)
      );
      C.length < F + P && (C = _.substring(T - F, T) + _.substring(T, T + P), L = m.substring(0, E - F), k = m.substring(E + P), I = _.substring(0, T - F), $ = _.substring(T + P));
    }
    return C.length * 2 >= m.length ? [
      L,
      k,
      I,
      $,
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
  ), l;
  if (!r && !o)
    return null;
  o ? r ? l = r[4].length > o[4].length ? r : o : l = o : l = r;
  var a, h, c, f;
  s.length > t.length ? (a = l[0], h = l[1], c = l[2], f = l[3]) : (c = l[0], f = l[1], a = l[2], h = l[3]);
  var g = l[4];
  return [a, h, c, f, g];
}
function D_(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, l = 0, a = 0, h = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, l = h, a = 0, h = 0, i = s[r][1]) : (s[r][0] == wt ? a += s[r][1].length : h += s[r][1].length, i && i.length <= Math.max(o, l) && i.length <= Math.max(a, h) && (s.splice(e[n - 1], 0, [
      kt,
      i
    ]), s[e[n - 1] + 1][0] = wt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, l = 0, a = 0, h = 0, i = null, t = !0)), r++;
  for (t && vl(s), B_(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == kt && s[r][0] == wt) {
      var c = s[r - 1][1], f = s[r][1], g = Fc(c, f), m = Fc(f, c);
      g >= m ? (g >= c.length / 2 || g >= f.length / 2) && (s.splice(r, 0, [
        ct,
        f.substring(0, g)
      ]), s[r - 1][1] = c.substring(
        0,
        c.length - g
      ), s[r + 1][1] = f.substring(g), r++) : (m >= c.length / 2 || m >= f.length / 2) && (s.splice(r, 0, [
        ct,
        c.substring(0, m)
      ]), s[r - 1][0] = wt, s[r - 1][1] = f.substring(
        0,
        f.length - m
      ), s[r + 1][0] = kt, s[r + 1][1] = c.substring(m), r++), r++;
    }
    r++;
  }
}
var Hc = /[^a-zA-Z0-9]/, Wc = /\s/, zc = /[\r\n]/, M_ = /\n\r?\n$/, q_ = /^\r?\n\r?\n/;
function B_(s) {
  function t(m, _) {
    if (!m || !_)
      return 6;
    var E = m.charAt(m.length - 1), w = _.charAt(0), T = E.match(Hc), C = w.match(Hc), L = T && E.match(Wc), k = C && w.match(Wc), I = L && E.match(zc), $ = k && w.match(zc), P = I && m.match(M_), F = $ && _.match(q_);
    return P || F ? 5 : I || $ ? 4 : T && !L && k ? 3 : L || k ? 2 : T || C ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = Ur(n, i);
      if (o) {
        var l = i.substring(i.length - o);
        n = n.substring(0, n.length - o), i = l + i.substring(0, i.length - o), r = l + r;
      }
      for (var a = n, h = i, c = r, f = t(n, i) + t(i, r); i.charAt(0) === r.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + r.charAt(0), r = r.substring(1);
        var g = t(n, i) + t(i, r);
        g >= f && (f = g, a = n, h = i, c = r);
      }
      s[e - 1][1] != a && (a ? s[e - 1][1] = a : (s.splice(e - 1, 1), e--), s[e][1] = h, c ? s[e + 1][1] = c : (s.splice(e + 1, 1), e--));
    }
    e++;
  }
}
function vl(s, t) {
  s.push([ct, ""]);
  for (var e = 0, n = 0, i = 0, r = "", o = "", l; e < s.length; ) {
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
            var h = s[a][1].slice(-1);
            if (s[a][1] = s[a][1].slice(
              0,
              -1
            ), r = h + r, o = h + o, !s[a][1]) {
              s.splice(a, 1), e--;
              var c = a - 1;
              s[c] && s[c][0] === wt && (i++, o = s[c][1] + o, c--), s[c] && s[c][0] === kt && (n++, r = s[c][1] + r, c--), a = c;
            }
          }
          if (ed(s[e][1])) {
            var h = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += h, o += h;
          }
        }
        if (e < s.length - 1 && !s[e][1]) {
          s.splice(e, 1);
          break;
        }
        if (r.length > 0 || o.length > 0) {
          r.length > 0 && o.length > 0 && (l = yl(o, r), l !== 0 && (a >= 0 ? s[a][1] += o.substring(
            0,
            l
          ) : (s.splice(0, 0, [
            ct,
            o.substring(0, l)
          ]), e++), o = o.substring(l), r = r.substring(l)), l = Ur(o, r), l !== 0 && (s[e][1] = o.substring(o.length - l) + s[e][1], o = o.substring(
            0,
            o.length - l
          ), r = r.substring(
            0,
            r.length - l
          )));
          var f = i + n;
          r.length === 0 && o.length === 0 ? (s.splice(e - f, f), e = e - f) : r.length === 0 ? (s.splice(e - f, f, [wt, o]), e = e - f + 1) : o.length === 0 ? (s.splice(e - f, f, [kt, r]), e = e - f + 1) : (s.splice(
            e - f,
            f,
            [kt, r],
            [wt, o]
          ), e = e - f + 2);
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
  g && vl(s, t);
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
    var l = n.index, a = s.slice(0, l), h = s.slice(l), c = i ? i.index : null;
    t: {
      var f = l + o - r;
      if (c !== null && c !== f || f < 0 || f > o)
        break t;
      var g = t.slice(0, f), m = t.slice(f);
      if (m !== h)
        break t;
      var _ = Math.min(l, f), E = a.slice(0, _), w = g.slice(0, _);
      if (E !== w)
        break t;
      var T = a.slice(_), C = g.slice(_);
      return Qo(E, T, C, h);
    }
    t: {
      if (c !== null && c !== l)
        break t;
      var L = l, g = t.slice(0, L), m = t.slice(L);
      if (g !== a)
        break t;
      var k = Math.min(r - L, o - L), I = h.slice(h.length - k), $ = m.slice(m.length - k);
      if (I !== $)
        break t;
      var T = h.slice(0, h.length - k), C = m.slice(0, m.length - k);
      return Qo(a, T, C, I);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), I = s.slice(n.index + n.length), _ = E.length, k = I.length;
      if (o < _ + k)
        break t;
      var w = t.slice(0, _), $ = t.slice(o - k);
      if (E !== w || I !== $)
        break t;
      var T = s.slice(_, r - k), C = t.slice(_, o - k);
      return Qo(E, T, C, I);
    }
  return null;
}
function Fr(s, t, e, n) {
  return yi(s, t, e, n, !0);
}
Fr.INSERT = wt;
Fr.DELETE = kt;
Fr.EQUAL = ct;
var V_ = Fr, Ar = { exports: {} };
Ar.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", a = "[object Date]", h = "[object Error]", c = "[object Function]", f = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", _ = "[object Object]", E = "[object Promise]", w = "[object RegExp]", T = "[object Set]", C = "[object String]", L = "[object Symbol]", k = "[object WeakMap]", I = "[object ArrayBuffer]", $ = "[object DataView]", P = "[object Float32Array]", F = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Dt = "[object Uint16Array]", Mt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, _t = /\w*$/, Fe = /^\[object .+?Constructor\]$/, Yt = /^(?:0|[1-9]\d*)$/, Y = {};
  Y[r] = Y[o] = Y[I] = Y[$] = Y[l] = Y[a] = Y[P] = Y[F] = Y[J] = Y[tt] = Y[nt] = Y[g] = Y[m] = Y[_] = Y[w] = Y[T] = Y[C] = Y[L] = Y[ot] = Y[it] = Y[Dt] = Y[Mt] = !0, Y[h] = Y[c] = Y[k] = !1;
  var fs = typeof Je == "object" && Je && Je.Object === Object && Je, Ne = typeof self == "object" && self && self.Object === Object && self, pt = fs || Ne || Function("return this")(), Xt = t && !t.nodeType && t, K = Xt && !0 && s && !s.nodeType && s, ce = K && K.exports === Xt;
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
  function Ws(u, d) {
    for (var v = -1, N = d.length, H = u.length; ++v < N; )
      u[H + v] = d[v];
    return u;
  }
  function Oe(u, d, v, N) {
    for (var H = -1, j = u ? u.length : 0; ++H < j; )
      v = d(v, u[H], H, u);
    return v;
  }
  function ps(u, d) {
    for (var v = -1, N = Array(u); ++v < u; )
      N[v] = d(v);
    return N;
  }
  function gs(u, d) {
    return u == null ? void 0 : u[d];
  }
  function ms(u) {
    var d = !1;
    if (u != null && typeof u.toString != "function")
      try {
        d = !!(u + "");
      } catch {
      }
    return d;
  }
  function zs(u) {
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
  function bs(u) {
    var d = -1, v = Array(u.size);
    return u.forEach(function(N) {
      v[++d] = N;
    }), v;
  }
  var $n = Array.prototype, Dn = Function.prototype, Nt = Object.prototype, ue = pt["__core-js_shared__"], ys = function() {
    var u = /[^.]+$/.exec(ue && ue.keys && ue.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), vs = Dn.toString, Ot = Nt.hasOwnProperty, Ce = Nt.toString, Ks = RegExp(
    "^" + vs.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), he = ce ? pt.Buffer : void 0, Se = pt.Symbol, Mn = pt.Uint8Array, qt = ze(Object.getPrototypeOf, Object), $i = Object.create, Di = Nt.propertyIsEnumerable, Gr = $n.splice, qn = Object.getOwnPropertySymbols, Gs = he ? he.isBuffer : void 0, Mi = ze(Object.keys, Object), Ys = Qt(pt, "DataView"), _s = Qt(pt, "Map"), Zt = Qt(pt, "Promise"), Xs = Qt(pt, "Set"), Bn = Qt(pt, "WeakMap"), Es = Qt(Object, "create"), Pn = Et(Ys), ws = Et(_s), jn = Et(Zt), Vn = Et(Xs), Un = Et(Bn), Ke = Se ? Se.prototype : void 0, qi = Ke ? Ke.valueOf : void 0;
  function Le(u) {
    var d = -1, v = u ? u.length : 0;
    for (this.clear(); ++d < v; ) {
      var N = u[d];
      this.set(N[0], N[1]);
    }
  }
  function Yr() {
    this.__data__ = Es ? Es(null) : {};
  }
  function Xr(u) {
    return this.has(u) && delete this.__data__[u];
  }
  function Zr(u) {
    var d = this.__data__;
    if (Es) {
      var v = d[u];
      return v === n ? void 0 : v;
    }
    return Ot.call(d, u) ? d[u] : void 0;
  }
  function Bi(u) {
    var d = this.__data__;
    return Es ? d[u] !== void 0 : Ot.call(d, u);
  }
  function Fn(u, d) {
    var v = this.__data__;
    return v[u] = Es && d === void 0 ? n : d, this;
  }
  Le.prototype.clear = Yr, Le.prototype.delete = Xr, Le.prototype.get = Zr, Le.prototype.has = Bi, Le.prototype.set = Fn;
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
    var d = this.__data__, v = Qs(d, u);
    if (v < 0)
      return !1;
    var N = d.length - 1;
    return v == N ? d.pop() : Gr.call(d, v, 1), !0;
  }
  function to(u) {
    var d = this.__data__, v = Qs(d, u);
    return v < 0 ? void 0 : d[v][1];
  }
  function eo(u) {
    return Qs(this.__data__, u) > -1;
  }
  function so(u, d) {
    var v = this.__data__, N = Qs(v, u);
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
      hash: new Le(),
      map: new (_s || ht)(),
      string: new Le()
    };
  }
  function io(u) {
    return As(this, u).delete(u);
  }
  function ro(u) {
    return As(this, u).get(u);
  }
  function oo(u) {
    return As(this, u).has(u);
  }
  function ao(u, d) {
    return As(this, u).set(u, d), this;
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
      if (!_s || N.length < e - 1)
        return N.push([u, d]), this;
      v = this.__data__ = new gt(N);
    }
    return v.set(u, d), this;
  }
  Ct.prototype.clear = lo, Ct.prototype.delete = co, Ct.prototype.get = uo, Ct.prototype.has = ho, Ct.prototype.set = fo;
  function Zs(u, d) {
    var v = Kn(u) || tn(u) ? ps(u.length, String) : [], N = v.length, H = !!N;
    for (var j in u)
      Ot.call(u, j) && !(H && (j == "length" || Co(j, N))) && v.push(j);
    return v;
  }
  function Pi(u, d, v) {
    var N = u[d];
    (!(Ot.call(u, d) && Hi(N, v)) || v === void 0 && !(d in u)) && (u[d] = v);
  }
  function Qs(u, d) {
    for (var v = u.length; v--; )
      if (Hi(u[v][0], d))
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
      var Q = xe(u), mt = Q == c || Q == f;
      if (Wi(u))
        return Js(u, d);
      if (Q == _ || Q == r || mt && !j) {
        if (ms(u))
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
      lt && (dt = bt, bt = u[dt]), Pi(X, dt, Hn(bt, d, v, N, dt, u, Z));
    }), X;
  }
  function po(u) {
    return pe(u) ? $i(u) : {};
  }
  function go(u, d, v) {
    var N = d(u);
    return Kn(u) ? N : Ws(N, v(u));
  }
  function mo(u) {
    return Ce.call(u);
  }
  function bo(u) {
    if (!pe(u) || Lo(u))
      return !1;
    var d = Gn(u) || ms(u) ? Ks : Fe;
    return d.test(Et(u));
  }
  function yo(u) {
    if (!Ui(u))
      return Mi(u);
    var d = [];
    for (var v in Object(u))
      Ot.call(u, v) && v != "constructor" && d.push(v);
    return d;
  }
  function Js(u, d) {
    if (d)
      return u.slice();
    var v = new u.constructor(u.length);
    return u.copy(v), v;
  }
  function Wn(u) {
    var d = new u.constructor(u.byteLength);
    return new Mn(d).set(new Mn(u)), d;
  }
  function Ts(u, d) {
    var v = d ? Wn(u.buffer) : u.buffer;
    return new u.constructor(v, u.byteOffset, u.byteLength);
  }
  function ji(u, d, v) {
    var N = d ? v(zs(u), !0) : zs(u);
    return Oe(N, He, new u.constructor());
  }
  function Vi(u) {
    var d = new u.constructor(u.source, _t.exec(u));
    return d.lastIndex = u.lastIndex, d;
  }
  function vo(u, d, v) {
    var N = d ? v(bs(u), !0) : bs(u);
    return Oe(N, at, new u.constructor());
  }
  function _o(u) {
    return qi ? Object(qi.call(u)) : {};
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
      Pi(v, Z, X === void 0 ? u[Z] : X);
    }
    return v;
  }
  function To(u, d) {
    return zn(u, ke(u), d);
  }
  function Ao(u) {
    return go(u, Yn, ke);
  }
  function As(u, d) {
    var v = u.__data__;
    return So(d) ? v[typeof d == "string" ? "string" : "hash"] : v.map;
  }
  function Qt(u, d) {
    var v = gs(u, d);
    return bo(v) ? v : void 0;
  }
  var ke = qn ? ze(qn, Object) : xo, xe = mo;
  (Ys && xe(new Ys(new ArrayBuffer(1))) != $ || _s && xe(new _s()) != g || Zt && xe(Zt.resolve()) != E || Xs && xe(new Xs()) != T || Bn && xe(new Bn()) != k) && (xe = function(u) {
    var d = Ce.call(u), v = d == _ ? u.constructor : void 0, N = v ? Et(v) : void 0;
    if (N)
      switch (N) {
        case Pn:
          return $;
        case ws:
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
    return typeof u.constructor == "function" && !Ui(u) ? po(qt(u)) : {};
  }
  function Oo(u, d, v, N) {
    var H = u.constructor;
    switch (d) {
      case I:
        return Wn(u);
      case l:
      case a:
        return new H(+u);
      case $:
        return Ts(u, N);
      case P:
      case F:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Dt:
      case Mt:
        return Eo(u, N);
      case g:
        return ji(u, N, v);
      case m:
      case C:
        return new H(u);
      case w:
        return Vi(u);
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
    return !!ys && ys in u;
  }
  function Ui(u) {
    var d = u && u.constructor, v = typeof d == "function" && d.prototype || Nt;
    return u === v;
  }
  function Et(u) {
    if (u != null) {
      try {
        return vs.call(u);
      } catch {
      }
      try {
        return u + "";
      } catch {
      }
    }
    return "";
  }
  function Fi(u) {
    return Hn(u, !0, !0);
  }
  function Hi(u, d) {
    return u === d || u !== u && d !== d;
  }
  function tn(u) {
    return ko(u) && Ot.call(u, "callee") && (!Di.call(u, "callee") || Ce.call(u) == r);
  }
  var Kn = Array.isArray;
  function en(u) {
    return u != null && zi(u.length) && !Gn(u);
  }
  function ko(u) {
    return Ki(u) && en(u);
  }
  var Wi = Gs || Io;
  function Gn(u) {
    var d = pe(u) ? Ce.call(u) : "";
    return d == c || d == f;
  }
  function zi(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
  }
  function pe(u) {
    var d = typeof u;
    return !!u && (d == "object" || d == "function");
  }
  function Ki(u) {
    return !!u && typeof u == "object";
  }
  function Yn(u) {
    return en(u) ? Zs(u) : yo(u);
  }
  function xo() {
    return [];
  }
  function Io() {
    return !1;
  }
  s.exports = Fi;
})(Ar, Ar.exports);
var nd = Ar.exports, Nr = { exports: {} };
Nr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, l = "[object Arguments]", a = "[object Array]", h = "[object AsyncFunction]", c = "[object Boolean]", f = "[object Date]", g = "[object Error]", m = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", w = "[object Number]", T = "[object Null]", C = "[object Object]", L = "[object Promise]", k = "[object Proxy]", I = "[object RegExp]", $ = "[object Set]", P = "[object String]", F = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Dt = "[object Float64Array]", Mt = "[object Int8Array]", ut = "[object Int16Array]", _t = "[object Int32Array]", Fe = "[object Uint8Array]", Yt = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", fs = "[object Uint32Array]", Ne = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Xt = /^(?:0|[1-9]\d*)$/, K = {};
  K[it] = K[Dt] = K[Mt] = K[ut] = K[_t] = K[Fe] = K[Yt] = K[Y] = K[fs] = !0, K[l] = K[a] = K[nt] = K[c] = K[ot] = K[f] = K[g] = K[m] = K[E] = K[w] = K[C] = K[I] = K[$] = K[P] = K[tt] = !1;
  var ce = typeof Je == "object" && Je && Je.Object === Object && Je, He = typeof self == "object" && self && self.Object === Object && self, at = ce || He || Function("return this")(), We = t && !t.nodeType && t, Ws = We && !0 && s && !s.nodeType && s, Oe = Ws && Ws.exports === We, ps = Oe && ce.process, gs = function() {
    try {
      return ps && ps.binding && ps.binding("util");
    } catch {
    }
  }(), ms = gs && gs.isTypedArray;
  function zs(u, d) {
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
  function bs(u, d) {
    for (var v = -1, N = u == null ? 0 : u.length; ++v < N; )
      if (d(u[v], v, u))
        return !0;
    return !1;
  }
  function $n(u, d) {
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
  function ys(u) {
    var d = -1, v = Array(u.size);
    return u.forEach(function(N, H) {
      v[++d] = [H, N];
    }), v;
  }
  function vs(u, d) {
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
  var Ce = Array.prototype, Ks = Function.prototype, he = Object.prototype, Se = at["__core-js_shared__"], Mn = Ks.toString, qt = he.hasOwnProperty, $i = function() {
    var u = /[^.]+$/.exec(Se && Se.keys && Se.keys.IE_PROTO || "");
    return u ? "Symbol(src)_1." + u : "";
  }(), Di = he.toString, Gr = RegExp(
    "^" + Mn.call(qt).replace(Ne, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), qn = Oe ? at.Buffer : void 0, Gs = at.Symbol, Mi = at.Uint8Array, Ys = he.propertyIsEnumerable, _s = Ce.splice, Zt = Gs ? Gs.toStringTag : void 0, Xs = Object.getOwnPropertySymbols, Bn = qn ? qn.isBuffer : void 0, Es = vs(Object.keys, Object), Pn = ke(at, "DataView"), ws = ke(at, "Map"), jn = ke(at, "Promise"), Vn = ke(at, "Set"), Un = ke(at, "WeakMap"), Ke = ke(Object, "create"), qi = Et(Pn), Le = Et(ws), Yr = Et(jn), Xr = Et(Vn), Zr = Et(Un), Bi = Gs ? Gs.prototype : void 0, Fn = Bi ? Bi.valueOf : void 0;
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
    var d = this.__data__, v = Js(d, u);
    if (v < 0)
      return !1;
    var N = d.length - 1;
    return v == N ? d.pop() : _s.call(d, v, 1), --this.size, !0;
  }
  function ro(u) {
    var d = this.__data__, v = Js(d, u);
    return v < 0 ? void 0 : d[v][1];
  }
  function oo(u) {
    return Js(this.__data__, u) > -1;
  }
  function ao(u, d) {
    var v = this.__data__, N = Js(v, u);
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
      map: new (ws || gt)(),
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
  function Zs(u) {
    var d = -1, v = u == null ? 0 : u.length;
    for (this.__data__ = new Ct(); ++d < v; )
      this.add(u[d]);
  }
  function Pi(u) {
    return this.__data__.set(u, n), this;
  }
  function Qs(u) {
    return this.__data__.has(u);
  }
  Zs.prototype.add = Zs.prototype.push = Pi, Zs.prototype.has = Qs;
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
      if (!ws || N.length < e - 1)
        return N.push([u, d]), this.size = ++v.size, this;
      v = this.__data__ = new Ct(N);
    }
    return v.set(u, d), this.size = v.size, this;
  }
  de.prototype.clear = Hn, de.prototype.delete = po, de.prototype.get = go, de.prototype.has = mo, de.prototype.set = bo;
  function yo(u, d) {
    var v = tn(u), N = !v && Hi(u), H = !v && !N && en(u), j = !v && !N && !H && Ki(u), Z = v || N || H || j, X = Z ? $n(u.length, String) : [], rt = X.length;
    for (var Q in u)
      qt.call(u, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      H && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      Oo(Q, rt))) && X.push(Q);
    return X;
  }
  function Js(u, d) {
    for (var v = u.length; v--; )
      if (Fi(u[v][0], d))
        return v;
    return -1;
  }
  function Wn(u, d, v) {
    var N = d(u);
    return tn(u) ? N : ze(N, v(u));
  }
  function Ts(u) {
    return u == null ? u === void 0 ? J : T : Zt && Zt in Object(u) ? xe(u) : Ui(u);
  }
  function ji(u) {
    return pe(u) && Ts(u) == l;
  }
  function Vi(u, d, v, N, H) {
    return u === d ? !0 : u == null || d == null || !pe(u) && !pe(d) ? u !== u && d !== d : vo(u, d, v, N, Vi, H);
  }
  function vo(u, d, v, N, H, j) {
    var Z = tn(u), X = tn(d), rt = Z ? a : fe(u), Q = X ? a : fe(d);
    rt = rt == l ? C : rt, Q = Q == l ? C : Q;
    var mt = rt == C, St = Q == C, lt = rt == Q;
    if (lt && en(u)) {
      if (!en(d))
        return !1;
      Z = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new de()), Z || Ki(u) ? zn(u, d, v, N, H, j) : To(u, d, rt, v, N, H, j);
    if (!(v & i)) {
      var bt = mt && qt.call(u, "__wrapped__"), dt = St && qt.call(d, "__wrapped__");
      if (bt || dt) {
        var Ge = bt ? u.value() : u, Ie = dt ? d.value() : d;
        return j || (j = new de()), H(Ge, Ie, v, N, j);
      }
    }
    return lt ? (j || (j = new de()), Ao(u, d, v, N, H, j)) : !1;
  }
  function _o(u) {
    if (!zi(u) || So(u))
      return !1;
    var d = Wi(u) ? Gr : pt;
    return d.test(Et(u));
  }
  function Eo(u) {
    return pe(u) && Gn(u.length) && !!K[Ts(u)];
  }
  function wo(u) {
    if (!Lo(u))
      return Es(u);
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
    var mt = -1, St = !0, lt = v & r ? new Zs() : void 0;
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
        if (!bs(d, function(Ie, Ns) {
          if (!Nt(lt, Ns) && (bt === Ie || H(bt, Ie, v, N, j)))
            return lt.push(Ns);
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
        return !(u.byteLength != d.byteLength || !j(new Mi(u), new Mi(d)));
      case c:
      case f:
      case w:
        return Fi(+u, +d);
      case g:
        return u.name == d.name && u.message == d.message;
      case I:
      case P:
        return u == d + "";
      case E:
        var X = ys;
      case $:
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
    var Z = v & i, X = As(u), rt = X.length, Q = As(d), mt = Q.length;
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
      var Ie = u[lt], Ns = d[lt];
      if (N)
        var Il = Z ? N(Ns, Ie, lt, d, u, j) : N(Ie, Ns, lt, u, d, j);
      if (!(Il === void 0 ? Ie === Ns || H(Ie, Ns, v, N, j) : Il)) {
        dt = !1;
        break;
      }
      Ge || (Ge = lt == "constructor");
    }
    if (dt && !Ge) {
      var Gi = u.constructor, Yi = d.constructor;
      Gi != Yi && "constructor" in u && "constructor" in d && !(typeof Gi == "function" && Gi instanceof Gi && typeof Yi == "function" && Yi instanceof Yi) && (dt = !1);
    }
    return j.delete(u), j.delete(d), dt;
  }
  function As(u) {
    return Wn(u, Yn, No);
  }
  function Qt(u, d) {
    var v = u.__data__;
    return Co(d) ? v[typeof d == "string" ? "string" : "hash"] : v.map;
  }
  function ke(u, d) {
    var v = ue(u, d);
    return _o(v) ? v : void 0;
  }
  function xe(u) {
    var d = qt.call(u, Zt), v = u[Zt];
    try {
      u[Zt] = void 0;
      var N = !0;
    } catch {
    }
    var H = Di.call(u);
    return N && (d ? u[Zt] = v : delete u[Zt]), H;
  }
  var No = Xs ? function(u) {
    return u == null ? [] : (u = Object(u), zs(Xs(u), function(d) {
      return Ys.call(u, d);
    }));
  } : xo, fe = Ts;
  (Pn && fe(new Pn(new ArrayBuffer(1))) != ot || ws && fe(new ws()) != E || jn && fe(jn.resolve()) != L || Vn && fe(new Vn()) != $ || Un && fe(new Un()) != tt) && (fe = function(u) {
    var d = Ts(u), v = d == C ? u.constructor : void 0, N = v ? Et(v) : "";
    if (N)
      switch (N) {
        case qi:
          return ot;
        case Le:
          return E;
        case Yr:
          return L;
        case Xr:
          return $;
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
    return !!$i && $i in u;
  }
  function Lo(u) {
    var d = u && u.constructor, v = typeof d == "function" && d.prototype || he;
    return u === v;
  }
  function Ui(u) {
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
  function Fi(u, d) {
    return u === d || u !== u && d !== d;
  }
  var Hi = ji(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ji : function(u) {
    return pe(u) && qt.call(u, "callee") && !Ys.call(u, "callee");
  }, tn = Array.isArray;
  function Kn(u) {
    return u != null && Gn(u.length) && !Wi(u);
  }
  var en = Bn || Io;
  function ko(u, d) {
    return Vi(u, d);
  }
  function Wi(u) {
    if (!zi(u))
      return !1;
    var d = Ts(u);
    return d == m || d == _ || d == h || d == k;
  }
  function Gn(u) {
    return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
  }
  function zi(u) {
    var d = typeof u;
    return u != null && (d == "object" || d == "function");
  }
  function pe(u) {
    return u != null && typeof u == "object";
  }
  var Ki = ms ? Dn(ms) : Eo;
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
var id = Nr.exports, _l = {};
Object.defineProperty(_l, "__esModule", { value: !0 });
const U_ = nd, F_ = id;
var Sa;
(function(s) {
  function t(r = {}, o = {}, l = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = U_(o);
    l || (a = Object.keys(a).reduce((h, c) => (a[c] != null && (h[c] = a[c]), h), {}));
    for (const h in r)
      r[h] !== void 0 && o[h] === void 0 && (a[h] = r[h]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.compose = t;
  function e(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const l = Object.keys(r).concat(Object.keys(o)).reduce((a, h) => (F_(r[h], o[h]) || (a[h] = o[h] === void 0 ? null : o[h]), a), {});
    return Object.keys(l).length > 0 ? l : void 0;
  }
  s.diff = e;
  function n(r = {}, o = {}) {
    r = r || {};
    const l = Object.keys(o).reduce((a, h) => (o[h] !== r[h] && r[h] !== void 0 && (a[h] = o[h]), a), {});
    return Object.keys(r).reduce((a, h) => (r[h] !== o[h] && o[h] === void 0 && (a[h] = null), a), l);
  }
  s.invert = n;
  function i(r, o, l = !1) {
    if (typeof r != "object")
      return o;
    if (typeof o != "object")
      return;
    if (!l)
      return o;
    const a = Object.keys(o).reduce((h, c) => (r[c] === void 0 && (h[c] = o[c]), h), {});
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.transform = i;
})(Sa || (Sa = {}));
_l.default = Sa;
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
var El = {};
Object.defineProperty(El, "__esModule", { value: !0 });
const Kc = Hr;
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
      const n = this.offset, i = Kc.default.length(e);
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
    return this.ops[this.index] ? Kc.default.length(this.ops[this.index]) - this.offset : 1 / 0;
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
El.default = H_;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = V_, n = nd, i = id, r = _l;
  t.AttributeMap = r.default;
  const o = Hr;
  t.Op = o.default;
  const l = El;
  t.OpIterator = l.default;
  const a = "\0", h = (f, g) => {
    if (typeof f != "object" || f === null)
      throw new Error(`cannot retain a ${typeof f}`);
    if (typeof g != "object" || g === null)
      throw new Error(`cannot retain a ${typeof g}`);
    const m = Object.keys(f)[0];
    if (!m || m !== Object.keys(g)[0])
      throw new Error(`embed types not matched: ${m} != ${Object.keys(g)[0]}`);
    return [m, f[m], g[m]];
  };
  class c {
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
      const _ = [], E = new l.default(this.ops);
      let w = 0;
      for (; w < m && E.hasNext(); ) {
        let T;
        w < g ? T = E.next(g - w) : (T = E.next(m - w), _.push(T)), w += o.default.length(T);
      }
      return new c(_);
    }
    compose(g) {
      const m = new l.default(this.ops), _ = new l.default(g.ops), E = [], w = _.peek();
      if (w != null && typeof w.retain == "number" && w.attributes == null) {
        let C = w.retain;
        for (; m.peekType() === "insert" && m.peekLength() <= C; )
          C -= m.peekLength(), E.push(m.next());
        w.retain - C > 0 && _.next(w.retain - C);
      }
      const T = new c(E);
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
              const P = L.retain == null ? "insert" : "retain", [F, J, tt] = h(L[P], k.retain), nt = c.getHandler(F);
              I[P] = {
                [F]: nt.compose(J, tt, P === "retain")
              };
            }
            const $ = r.default.compose(L.attributes, k.attributes, typeof L.retain == "number");
            if ($ && (I.attributes = $), T.push(I), !_.hasNext() && i(T.ops[T.ops.length - 1], I)) {
              const P = new c(m.rest());
              return T.concat(P).chop();
            }
          } else typeof k.delete == "number" && (typeof L.retain == "number" || typeof L.retain == "object" && L.retain !== null) && T.push(k);
        }
      return T.chop();
    }
    concat(g) {
      const m = new c(this.ops.slice());
      return g.ops.length > 0 && (m.push(g.ops[0]), m.ops = m.ops.concat(g.ops.slice(1))), m;
    }
    diff(g, m) {
      if (this.ops === g.ops)
        return new c();
      const _ = [this, g].map((L) => L.map((k) => {
        if (k.insert != null)
          return typeof k.insert == "string" ? k.insert : a;
        const I = L === g ? "on" : "with";
        throw new Error("diff() called " + I + " non-document");
      }).join("")), E = new c(), w = e(_[0], _[1], m, !0), T = new l.default(this.ops), C = new l.default(g.ops);
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
              const $ = T.next(I), P = C.next(I);
              i($.insert, P.insert) ? E.retain(I, r.default.diff($.attributes, P.attributes)) : E.push(P).delete(I);
              break;
          }
          k -= I;
        }
      }), E.chop();
    }
    eachLine(g, m = `
`) {
      const _ = new l.default(this.ops);
      let E = new c(), w = 0;
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
          w += 1, E = new c();
        }
      }
      E.length() > 0 && g(E, {}, w);
    }
    invert(g) {
      const m = new c();
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
            const w = g.slice(_, _ + 1), T = new l.default(w.ops).next(), [C, L, k] = h(E.retain, T.insert), I = c.getHandler(C);
            return m.retain({ [C]: I.invert(L, k) }, r.default.invert(E.attributes, T.attributes)), _ + 1;
          }
        }
        return _;
      }, 0), m.chop();
    }
    transform(g, m = !1) {
      if (m = !!m, typeof g == "number")
        return this.transformPosition(g, m);
      const _ = g, E = new l.default(this.ops), w = new l.default(_.ops), T = new c();
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
            const I = L.retain, $ = k.retain;
            let P = typeof $ == "object" && $ !== null ? $ : C;
            if (typeof I == "object" && I !== null && typeof $ == "object" && $ !== null) {
              const F = Object.keys(I)[0];
              if (F === Object.keys($)[0]) {
                const J = c.getHandler(F);
                J && (P = {
                  [F]: J.transform(I[F], $[F], m)
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
      const _ = new l.default(this.ops);
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
  c.Op = o.default, c.OpIterator = l.default, c.AttributeMap = r.default, c.handlers = {}, t.default = c, s.exports = c, s.exports.default = c;
})(Ca, Ca.exports);
var Ht = Ca.exports;
const q = /* @__PURE__ */ Qh(Ht);
class ae extends $t {
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
const me = class me extends ml {
  static compare(t, e) {
    const n = me.order.indexOf(t), i = me.order.indexOf(e);
    return n >= 0 || i >= 0 ? n - i : t === e ? 0 : t < e ? -1 : 1;
  }
  formatAt(t, e, n, i) {
    if (me.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, B.BLOT)) {
      const r = this.isolate(t, e);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, e, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof me && me.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const e = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(e), e.wrap(this);
    }
  }
};
D(me, "allowedChildren", [me, ae, $t, ie]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
D(me, "order", [
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
let Te = me;
const Gc = 1;
class ft extends bi {
  constructor() {
    super(...arguments);
    D(this, "cache", {});
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
    let l = this;
    r.reduce((a, h) => (l = l.split(a, !0), l.insertAt(0, h), h.length), e + o.length);
  }
  insertBefore(e, n) {
    const {
      head: i
    } = this.children;
    super.insertBefore(e, n), i instanceof ae && i.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Gc), this.cache.length;
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
    if (n && (e === 0 || e >= this.length() - Gc)) {
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
ft.allowedChildren = [ae, Te, $t, ie];
class Ft extends $t {
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
      const h = this.scroll.create(ft.blotName);
      return h.insertAt(0, a), h;
    }), l = this.split(t);
    o.forEach((a) => {
      this.parent.insertBefore(a, l);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), l);
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
const Pt = class Pt extends $t {
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
    } = this, l = o.data.split(Pt.CONTENTS).join("");
    o.data = Pt.CONTENTS;
    let a;
    if (e)
      a = e, (l || i) && (e.insertAt(e.length(), l + r), i && i.remove());
    else if (i)
      a = i, i.insertAt(0, l);
    else {
      const h = document.createTextNode(l);
      a = this.scroll.create(h), this.parent.insertBefore(a, this);
    }
    if (this.remove(), t) {
      const h = (g, m) => e && g === e.domNode ? m : g === o ? n + m - 1 : i && g === i.domNode ? n + l.length + m : null, c = h(t.start.node, t.start.offset), f = h(t.end.node, t.end.offset);
      if (c !== null && f !== null)
        return {
          startNode: a.domNode,
          startOffset: c,
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
D(Pt, "blotName", "cursor"), D(Pt, "className", "ql-cursor"), D(Pt, "tagName", "span"), D(Pt, "CONTENTS", "\uFEFF");
let Cn = Pt;
var od = { exports: {} };
(function(s) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
  function i(a, h, c) {
    this.fn = a, this.context = h, this.once = c || !1;
  }
  function r(a, h, c, f, g) {
    if (typeof c != "function")
      throw new TypeError("The listener must be a function");
    var m = new i(c, f || a, g), _ = e ? e + h : h;
    return a._events[_] ? a._events[_].fn ? a._events[_] = [a._events[_], m] : a._events[_].push(m) : (a._events[_] = m, a._eventsCount++), a;
  }
  function o(a, h) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[h];
  }
  function l() {
    this._events = new n(), this._eventsCount = 0;
  }
  l.prototype.eventNames = function() {
    var h = [], c, f;
    if (this._eventsCount === 0) return h;
    for (f in c = this._events)
      t.call(c, f) && h.push(e ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(c)) : h;
  }, l.prototype.listeners = function(h) {
    var c = e ? e + h : h, f = this._events[c];
    if (!f) return [];
    if (f.fn) return [f.fn];
    for (var g = 0, m = f.length, _ = new Array(m); g < m; g++)
      _[g] = f[g].fn;
    return _;
  }, l.prototype.listenerCount = function(h) {
    var c = e ? e + h : h, f = this._events[c];
    return f ? f.fn ? 1 : f.length : 0;
  }, l.prototype.emit = function(h, c, f, g, m, _) {
    var E = e ? e + h : h;
    if (!this._events[E]) return !1;
    var w = this._events[E], T = arguments.length, C, L;
    if (w.fn) {
      switch (w.once && this.removeListener(h, w.fn, void 0, !0), T) {
        case 1:
          return w.fn.call(w.context), !0;
        case 2:
          return w.fn.call(w.context, c), !0;
        case 3:
          return w.fn.call(w.context, c, f), !0;
        case 4:
          return w.fn.call(w.context, c, f, g), !0;
        case 5:
          return w.fn.call(w.context, c, f, g, m), !0;
        case 6:
          return w.fn.call(w.context, c, f, g, m, _), !0;
      }
      for (L = 1, C = new Array(T - 1); L < T; L++)
        C[L - 1] = arguments[L];
      w.fn.apply(w.context, C);
    } else {
      var k = w.length, I;
      for (L = 0; L < k; L++)
        switch (w[L].once && this.removeListener(h, w[L].fn, void 0, !0), T) {
          case 1:
            w[L].fn.call(w[L].context);
            break;
          case 2:
            w[L].fn.call(w[L].context, c);
            break;
          case 3:
            w[L].fn.call(w[L].context, c, f);
            break;
          case 4:
            w[L].fn.call(w[L].context, c, f, g);
            break;
          default:
            if (!C) for (I = 1, C = new Array(T - 1); I < T; I++)
              C[I - 1] = arguments[I];
            w[L].fn.apply(w[L].context, C);
        }
    }
    return !0;
  }, l.prototype.on = function(h, c, f) {
    return r(this, h, c, f, !1);
  }, l.prototype.once = function(h, c, f) {
    return r(this, h, c, f, !0);
  }, l.prototype.removeListener = function(h, c, f, g) {
    var m = e ? e + h : h;
    if (!this._events[m]) return this;
    if (!c)
      return o(this, m), this;
    var _ = this._events[m];
    if (_.fn)
      _.fn === c && (!g || _.once) && (!f || _.context === f) && o(this, m);
    else {
      for (var E = 0, w = [], T = _.length; E < T; E++)
        (_[E].fn !== c || g && !_[E].once || f && _[E].context !== f) && w.push(_[E]);
      w.length ? this._events[m] = w.length === 1 ? w[0] : w : o(this, m);
    }
    return this;
  }, l.prototype.removeAllListeners = function(h) {
    var c;
    return h ? (c = e ? e + h : h, this._events[c] && o(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = e, l.EventEmitter = l, s.exports = l;
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
D(M, "events", {
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
}), D(M, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const ta = Ue("quill:selection");
class Ms {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class G_ {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Ms(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, M.sources.USER), 1);
    }), this.emitter.on(M.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(M.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? M.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(M.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: l,
          endOffset: a
        } = i.range;
        this.setNativeRange(r, o, l, a), this.update(M.sources.SILENT);
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
      const [c] = this.scroll.leaf(t + 1);
      if (c) {
        const [f] = this.scroll.line(t), [g] = this.scroll.line(t + 1);
        f === g && (r = c, o = 0);
      }
    }
    [i, o] = r.position(o, !0);
    const l = document.createRange();
    if (e > 0)
      return l.setStart(i, o), [r, o] = this.scroll.leaf(t + e), r == null ? null : ([i, o] = r.position(o, !0), l.setEnd(i, o), l.getBoundingClientRect());
    let a = "left", h;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      o < i.data.length ? (l.setStart(i, o), l.setEnd(i, o + 1)) : (l.setStart(i, o - 1), l.setEnd(i, o), a = "right"), h = l.getBoundingClientRect();
    } else {
      if (!(r.domNode instanceof Element)) return null;
      h = r.domNode.getBoundingClientRect(), o > 0 && (a = "right");
    }
    return {
      bottom: h.top + h.height,
      height: h.height,
      left: h[a],
      right: h[a],
      top: h.top,
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
      const [l, a] = o, h = this.scroll.find(l, !0), c = h.offset(this.scroll);
      return a === 0 ? c : h instanceof yt ? c + h.index(l, a) : c + h.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Ms(r, i - r);
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
      const [o, l] = this.scroll.leaf(i);
      return o ? o.position(l, r) : [null, -1];
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
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !gl(e, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [M.events.SELECTION_CHANGE, mn(this.lastRange), mn(e), t];
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
    const n = Yc(t), i = new q();
    return Q_(n.ops.slice()).reduce((o, l) => {
      const a = Ht.Op.length(l);
      let h = l.attributes || {}, c = !1, f = !1;
      if (l.insert != null) {
        if (i.retain(a), typeof l.insert == "string") {
          const _ = l.insert;
          f = !_.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ft, o)[0]), this.scroll.insertAt(o, _);
          const [E, w] = this.scroll.line(o);
          let T = ss({}, Vt(E));
          if (E instanceof ft) {
            const [C] = E.descendant(yt, w);
            C && (T = ss(T, Vt(C)));
          }
          h = Ht.AttributeMap.diff(T, h) || {};
        } else if (typeof l.insert == "object") {
          const _ = Object.keys(l.insert)[0];
          if (_ == null) return o;
          const E = this.scroll.query(_, B.INLINE) != null;
          if (E)
            (e <= o || this.scroll.descendant(Ft, o)[0]) && (f = !0);
          else if (o > 0) {
            const [w, T] = this.scroll.descendant(yt, o - 1);
            w instanceof ie ? w.value()[T] !== `
` && (c = !0) : w instanceof $t && w.statics.scope === B.INLINE_BLOT && (c = !0);
          }
          if (this.scroll.insertAt(o, _, l.insert[_]), E) {
            const [w] = this.scroll.descendant(yt, o);
            if (w) {
              const T = ss({}, Vt(w));
              h = Ht.AttributeMap.diff(T, h) || {};
            }
          }
        }
        e += a;
      } else if (i.push(l), l.retain !== null && typeof l.retain == "object") {
        const _ = Object.keys(l.retain)[0];
        if (_ == null) return o;
        this.scroll.updateEmbedAt(o, _, l.retain[_]);
      }
      Object.keys(h).forEach((_) => {
        this.scroll.formatAt(o, a, _, h[_]);
      });
      const g = c ? 1 : 0, m = f ? 1 : 0;
      return e += g + m, i.retain(g), i.delete(m), o + a + g + m;
    }, 0), i.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + Ht.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
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
    const i = new q().retain(t).retain(e, mn(n));
    return this.update(i);
  }
  formatText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, e, r, n[r]);
    });
    const i = new q().retain(t).retain(e, mn(n));
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
    e === 0 ? this.scroll.path(t).forEach((l) => {
      const [a] = l;
      a instanceof ft ? n.push(a) : a instanceof yt && i.push(a);
    }) : (n = this.scroll.lines(t, e), i = this.scroll.descendants(yt, t, e));
    const [r, o] = [n, i].map((l) => {
      const a = l.shift();
      if (a == null) return {};
      let h = Vt(a);
      for (; Object.keys(h).length > 0; ) {
        const c = l.shift();
        if (c == null) return h;
        h = Z_(Vt(c), h);
      }
      return h;
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
      return n.length() >= i + e && !(i === 0 && e === r) ? vi(n, i, e, !0) : vi(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, e) {
    const n = Yc(e), i = new q().retain(t).concat(n);
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
    }), this.update(new q().retain(t).insert(e, mn(n)));
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
    let o = 0, l = new q();
    i != null && (o = i.length() - r, l = i.delta().slice(r, r + o - 1).insert(`
`));
    const h = this.getContents(t, e + o).diff(new q().insert(n).concat(l)), c = new q().retain(t).concat(h);
    return this.applyDelta(c);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(Y_) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = Vt(r), l = r.offset(this.scroll), a = e[0].oldValue.replace(Cn.CONTENTS, ""), h = new q().insert(a), c = new q().insert(r.value()), f = n && {
        oldRange: Xc(n.oldRange, -l),
        newRange: Xc(n.newRange, -l)
      };
      t = new q().retain(l).concat(h.diff(c, f)).reduce((m, _) => _.insert ? m.insert(_.insert, o) : m.push(_), new q()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !gl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function dn(s, t, e) {
  if (s.length === 0) {
    const [m] = sa(e.pop());
    return t <= 0 ? `</li></${m}>` : `</li></${m}>${dn([], t - 1, e)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: l
  }, ...a] = s, [h, c] = sa(l);
  if (o > t)
    return e.push(l), o === t + 1 ? `<${h}><li${c}>${vi(n, i, r)}${dn(a, o, e)}` : `<${h}><li>${dn(s, t + 1, e)}`;
  const f = e[e.length - 1];
  if (o === t && l === f)
    return `</li><li${c}>${vi(n, i, r)}${dn(a, o, e)}`;
  const [g] = sa(e.pop());
  return `</li></${g}>${dn(s, t - 1, e)}`;
}
function vi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof ie)
    return Wr(s.value().slice(t, t + e));
  if (s instanceof ne) {
    if (s.statics.blotName === "list-container") {
      const h = [];
      return s.children.forEachAt(t, e, (c, f, g) => {
        const m = "formats" in c && typeof c.formats == "function" ? c.formats() : {};
        h.push({
          child: c,
          offset: f,
          length: g,
          indent: m.indent || 0,
          type: m.list
        });
      }), dn(h, -1, []);
    }
    const i = [];
    if (s.children.forEachAt(t, e, (h, c, f) => {
      i.push(vi(h, c, f));
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
function Yc(s) {
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
function Xc(s, t) {
  let {
    index: e,
    length: n
  } = s;
  return new Ms(e + t, n);
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
D(le, "DEFAULTS", {});
const ir = "\uFEFF";
class wl extends $t {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(ir), this.rightGuard = document.createTextNode(ir), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, n;
    const i = t.data.split(ir).join("");
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
    return t.data = ir, e;
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
    e && !(e instanceof wl) && (this.emitter.emit(M.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(M.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(M.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(M.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
const hi = class hi {
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
D(hi, "DEFAULTS", {
  modules: {}
}), D(hi, "themes", {
  default: hi
});
let Sn = hi;
const tE = (s) => s.parentElement || s.getRootNode().host || null, eE = (s) => {
  const t = s.getBoundingClientRect(), e = "offsetWidth" in s && Math.abs(t.width) / s.offsetWidth || 1, n = "offsetHeight" in s && Math.abs(t.height) / s.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + s.clientWidth * e,
    bottom: t.top + s.clientHeight * n,
    left: t.left
  };
}, rr = (s) => {
  const t = parseInt(s, 10);
  return Number.isNaN(t) ? 0 : t;
}, Zc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, sE = (s, t) => {
  var r, o, l;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, h = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : eE(i), c = getComputedStyle(i), f = Zc(n.left, n.right, h.left, h.right, rr(c.scrollPaddingLeft), rr(c.scrollPaddingRight)), g = Zc(n.top, n.bottom, h.top, h.bottom, rr(c.scrollPaddingTop), rr(c.scrollPaddingBottom));
    if (f || g)
      if (a)
        (l = e.defaultView) == null || l.scrollBy(f, g);
      else {
        const {
          scrollLeft: m,
          scrollTop: _
        } = i;
        g && (i.scrollTop += g), f && (i.scrollLeft += f);
        const E = i.scrollLeft - m, w = i.scrollTop - _;
        n = {
          left: n.left - E,
          top: n.top - w,
          right: n.right - E,
          bottom: n.bottom - w
        };
      }
    i = a || c.position === "fixed" ? null : tE(i);
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
}, yn = Ue("quill"), or = new On();
ne.uiClass = "ql-ui";
const te = class te {
  static debug(t) {
    t === !0 && (t = "log"), Ue.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return ka.get(t) || or.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && yn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, e) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && yn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && or.register(e), typeof e.register == "function" && e.register(or);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = oE(t, e), this.container = this.options.container, this.container == null) {
      yn.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && te.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", ka.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new M();
    const i = bl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new X_(this.scroll), this.selection = new G_(this.scroll, this.emitter), this.composition = new J_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(M.events.EDITOR_CHANGE, (o) => {
      o === M.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(M.events.SCROLL_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [h] = this.selection.getRange(), c = a && h ? {
        oldRange: a,
        newRange: h
      } : void 0;
      Jt.call(this, () => this.editor.update(null, l, c), o);
    }), this.emitter.on(M.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [h] = this.selection.getRange(), c = a && h ? {
        oldRange: a,
        newRange: h
      } : void 0;
      Jt.call(this, () => {
        const f = new q().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(f, [], c);
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
    return [t, e, , n] = Re(t, e, n), Jt.call(this, () => this.editor.deleteText(t, e), n, t, -1 * e);
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
    return [t, e, o, r] = Re(
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
    return [t, e, o, r] = Re(
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
    return [t, e] = Re(t, e), this.editor.getContents(t, e);
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
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = Re(t, e), this.editor.getHTML(t, e);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = Re(t, e), this.editor.getText(t, e);
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
    return [t, , o, r] = Re(t, 0, n, i, r), Jt.call(this, () => this.editor.insertText(t, e, o), r, t, e.length);
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
    return [t, e, , n] = Re(t, e, n), Jt.call(this, () => this.editor.removeFormat(t, e), n, t);
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
    t == null ? this.selection.setRange(null, e || te.sources.API) : ([t, e, , n] = Re(t, e, n), this.selection.setRange(new Ms(Math.max(0, t), e), n), n !== M.sources.SILENT && this.scrollSelectionIntoView());
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
D(te, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: !0,
    keyboard: !0,
    history: !0,
    uploader: !0
  },
  placeholder: "",
  readOnly: !1,
  registry: or,
  theme: "default"
}), D(te, "events", M.events), D(te, "sources", M.sources), D(te, "version", "2.0.2"), D(te, "imports", {
  delta: q,
  parchment: x_,
  "core/module": le,
  "core/theme": Sn
});
let S = te;
function Qc(s) {
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
function Jc(s) {
  return Object.fromEntries(Object.entries(s).filter((t) => t[1] !== void 0));
}
function oE(s, t) {
  const e = Qc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === S.DEFAULTS.theme ? Sn : S.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = S.DEFAULTS, {
    modules: l,
    ...a
  } = i.DEFAULTS;
  let h = na(t.modules);
  h != null && h.toolbar && h.toolbar.constructor !== Object && (h = {
    ...h,
    toolbar: {
      container: h.toolbar
    }
  });
  const c = ss({}, na(r), na(l), h), f = {
    ...o,
    ...Jc(a),
    ...Jc(t)
  };
  let g = t.registry;
  return g ? t.formats && yn.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? rE(t.formats, f.registry, yn) : f.registry, {
    ...f,
    registry: g,
    container: e,
    theme: i,
    modules: Object.entries(c).reduce((m, _) => {
      let [E, w] = _;
      if (!w) return m;
      const T = S.import(`modules/${E}`);
      return T == null ? (yn.error(`Cannot load ${E} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [E]: ss({}, T.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Qc(f.bounds)
  };
}
function Jt(s, t, e, n) {
  if (!this.isEnabled() && t === M.sources.USER && !this.allowReadOnlyEdits)
    return new q();
  let i = e == null ? null : this.getSelection();
  const r = this.editor.delta, o = s();
  if (i != null && (e === !0 && (e = i.index), n == null ? i = tu(i, o, t) : n !== 0 && (i = tu(i, e, n, t)), this.setSelection(i, M.sources.SILENT)), o.length() > 0) {
    const l = [M.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(M.events.EDITOR_CHANGE, ...l), t !== M.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function Re(s, t, e, n, i) {
  let r = {};
  return typeof s.index == "number" && typeof s.length == "number" ? typeof t != "number" ? (i = n, n = e, e = t, t = s.length, s = s.index) : (t = s.length, s = s.index) : typeof t != "number" && (i = n, n = e, e = t, t = 0), typeof e == "object" ? (r = e, i = n) : typeof e == "string" && (n != null ? r[e] = n : i = e), i = i || M.sources.API, [s, t, r, i];
}
function tu(s, t, e, n) {
  const i = typeof e == "number" ? e : 0;
  if (s == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [s.index, s.index + s.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(l, n !== M.sources.USER)
  )) : [r, o] = [s.index, s.index + s.length].map((l) => l < t || l === t && n === M.sources.USER ? l : i >= 0 ? l + i : Math.max(t, l + i)), new Ms(r, o - r);
}
class Us extends Vr {
}
function eu(s) {
  return s instanceof ft || s instanceof Ft;
}
function su(s) {
  return typeof s.updateContent == "function";
}
class fn extends bl {
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
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ft, t)[0] && t < this.length()), h = r.type === "block" ? r.delta : new q().insert({
        [r.key]: r.value
      });
      ia(this, t, h);
      const c = r.type === "block" ? 1 : 0, f = t + h.length() + c;
      a && this.insertAt(f - 1, `
`);
      const g = Vt(this.line(t)[0]), m = Ht.AttributeMap.diff(g, r.attributes) || {};
      Object.keys(m).forEach((_) => {
        this.formatAt(f - 1, 1, _, m[_]);
      }), t = f;
    }
    let [o, l] = this.children.find(t);
    if (n.length && (o && (o = o.split(l), l = 0), n.forEach((a) => {
      if (a.type === "block") {
        const h = this.createBlock(a.attributes, o || void 0);
        ia(h, 0, a.delta);
      } else {
        const h = this.create(a.key, a.value);
        this.insertBefore(h, o || void 0), Object.keys(a.attributes).forEach((c) => {
          h.format(c, a.attributes[c]);
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
    const e = this.path(t).pop();
    if (!e)
      return [null, -1];
    const [n, i] = e;
    return n instanceof yt ? [n, i] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(eu, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let l = [], a = o;
      return i.children.forEachAt(r, o, (h, c, f) => {
        eu(h) ? l.push(h) : h instanceof Vr && (l = l.concat(n(h, c, a))), a -= f;
      }), l;
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
      return r && !su(r);
    }), t.length > 0 && this.emitter.emit(M.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(M.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, n) {
    const [i] = this.descendant((r) => r instanceof Ft, t);
    i && i.statics.blotName === e && su(i) && i.updateContent(n);
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
          const l = o[o.length - 1];
          l && n.insert(l, i.attributes);
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
    Object.entries(t).forEach((l) => {
      let [a, h] = l;
      this.query(a, B.BLOCK & B.BLOT) != null ? n = a : i[a] = h;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, e || void 0);
    const o = r.length();
    return Object.entries(i).forEach((l) => {
      let [a, h] = l;
      r.formatAt(0, o, a, h);
    }), r;
  }
}
D(fn, "blotName", "scroll"), D(fn, "className", "ql-editor"), D(fn, "tagName", "DIV"), D(fn, "defaultChild", ft), D(fn, "allowedChildren", [ft, Ft, Us]);
function ia(s, t, e) {
  e.reduce((n, i) => {
    const r = Ht.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const l = i.insert;
        s.insertAt(n, l);
        const [a] = s.descendant(yt, n), h = Vt(a);
        o = Ht.AttributeMap.diff(h, o) || {};
      } else if (typeof i.insert == "object") {
        const l = Object.keys(i.insert)[0];
        if (l == null) return n;
        if (s.insertAt(n, l, i.insert[l]), s.scroll.query(l, B.INLINE) != null) {
          const [h] = s.descendant(yt, n), c = Vt(h);
          o = Ht.AttributeMap.diff(c, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      s.formatAt(n, r, l, o[l]);
    }), n + r;
  }, t);
}
const Tl = {
  scope: B.BLOCK,
  whitelist: ["right", "center", "justify"]
}, aE = new we("align", "align", Tl), ld = new oe("align", "ql-align", Tl), cd = new hs("align", "text-align", Tl);
class ud extends hs {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const lE = new oe("color", "ql-color", {
  scope: B.INLINE
}), Al = new ud("color", "color", {
  scope: B.INLINE
}), cE = new oe("background", "ql-bg", {
  scope: B.INLINE
}), Nl = new ud("background", "background-color", {
  scope: B.INLINE
});
class Fs extends Us {
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
    S.register(Fs);
  }
}
D(vt, "TAB", "  ");
class Ol extends Te {
}
Ol.blotName = "code";
Ol.tagName = "CODE";
vt.blotName = "code-block";
vt.className = "ql-code-block";
vt.tagName = "DIV";
Fs.blotName = "code-block-container";
Fs.className = "ql-code-block-container";
Fs.tagName = "DIV";
Fs.allowedChildren = [vt];
vt.allowedChildren = [ie, ae, Cn];
vt.requiredContainer = Fs;
const Cl = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, hd = new we("direction", "dir", Cl), dd = new oe("direction", "ql-direction", Cl), fd = new hs("direction", "direction", Cl), pd = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, gd = new oe("font", "ql-font", pd);
class uE extends hs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const md = new uE("font", "font-family", pd), bd = new oe("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), yd = new hs("size", "font-size", {
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((T) => zr.match(t, T));
      if (i.length === 0) return;
      const r = S.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, a] = this.quill.getLine(o.index), [h, c] = this.quill.getLeaf(o.index), [f, g] = o.length === 0 ? [h, c] : this.quill.getLeaf(o.index + o.length), m = h instanceof Tr ? h.value().slice(0, c) : "", _ = f instanceof Tr ? f.value().slice(g) : "", E = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
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
        } else if (typeof T.format == "object" && !Object.keys(T.format).every((C) => T.format[C] === !0 ? E.format[C] != null : T.format[C] === !1 ? E.format[C] == null : gl(T.format[C], E.format[C])))
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
      const [l] = this.quill.getLine(t.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const h = r.formats(), c = this.quill.getFormat(t.index - 1, 1);
        if (i = Ht.AttributeMap.diff(h, c) || {}, Object.keys(i).length > 0) {
          const f = new q().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(f);
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
      const [l] = this.quill.getLine(t.index + 1);
      if (l) {
        const a = r.formats(), h = this.quill.getFormat(t.index, 1);
        i = Ht.AttributeMap.diff(a, h) || {}, Object.keys(i).length > 0 && (o = o.retain(l.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, S.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Sl({
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
    "indent code-block": nu(!0),
    "outdent code-block": nu(!1),
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
          let l = e.offset();
          if (o < 0) {
            const a = new q().retain(l).insert(`
`);
            this.quill.updateContents(a, S.sources.USER), this.quill.setSelection(s.index + 1, s.length, S.sources.SILENT);
          } else if (o > 0) {
            l += e.length();
            const a = new q().retain(l).insert(`
`);
            this.quill.updateContents(a, S.sources.USER), this.quill.setSelection(l, S.sources.USER);
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
    "embed left": ar("ArrowLeft", !1),
    "embed left shift": ar("ArrowLeft", !0),
    "embed right": ar("ArrowRight", !1),
    "embed right shift": ar("ArrowRight", !0),
    "table down": iu(!1),
    "table up": iu(!0)
  }
};
zr.DEFAULTS = fE;
function nu(s) {
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
        index: l,
        length: a
      } = t;
      o.forEach((h, c) => {
        s ? (h.insertAt(0, r), c === 0 ? l += r.length : a += r.length) : h.domNode.textContent.startsWith(r) && (h.deleteAt(0, r.length), c === 0 ? l -= r.length : a -= r.length);
      }), this.quill.update(S.sources.USER), this.quill.setSelection(l, a, S.sources.SILENT);
    }
  };
}
function ar(s, t) {
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
      return r instanceof $t ? (s === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, S.sources.USER) : this.quill.setSelection(n.index - 1, S.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, S.sources.USER) : this.quill.setSelection(n.index + n.length + 1, S.sources.USER), !1) : !0;
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
function iu(s) {
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
    s = mn(s);
  else
    return null;
  return s.shortKey && (s[dE] = s.shortKey, delete s.shortKey), s;
}
function Sl(s) {
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
const mE = /font-weight:\s*normal/, bE = ["P", "OL", "UL"], ru = (s) => s && bE.includes(s.tagName), yE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => ru(t.previousElementSibling) && ru(t.nextElementSibling)).forEach((t) => {
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
  const i = Number(n[1]), r = e == null ? void 0 : e.match(TE), o = r ? Number(r[1]) : 1, l = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(l), h = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: h,
    element: s
  };
}, NE = (s) => {
  var o, l;
  const t = Array.from(s.querySelectorAll("[style*=mso-list]")), e = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(EE) ? e.push(a) : n.push(a);
  }), e.forEach((a) => {
    var h;
    return (h = a.parentNode) == null ? void 0 : h.removeChild(a);
  });
  const i = s.documentElement.innerHTML, r = n.map((a) => AE(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let h = r.shift();
    for (; h; )
      a.push(h), h = r.length && ((o = r[0]) == null ? void 0 : o.element) === h.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === h.id ? r.shift() : null;
    const c = document.createElement("ul");
    a.forEach((m) => {
      const _ = document.createElement("li");
      _.setAttribute("data-list", m.type), m.indent > 1 && _.setAttribute("class", `ql-indent-${m.indent - 1}`), _.innerHTML = m.element.innerHTML, c.appendChild(_);
    });
    const f = (l = a[0]) == null ? void 0 : l.element, {
      parentNode: g
    } = f ?? {};
    f && (g == null || g.replaceChild(c, f)), a.slice(1).forEach((m) => {
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
}, LE = Ue("quill:clipboard"), kE = [[Node.TEXT_NODE, UE], [Node.TEXT_NODE, au], ["br", DE], [Node.ELEMENT_NODE, au], [Node.ELEMENT_NODE, $E], [Node.ELEMENT_NODE, RE], [Node.ELEMENT_NODE, jE], ["li", BE], ["ol, ul", PE], ["pre", ME], ["tr", VE], ["b", oa("bold")], ["i", oa("italic")], ["strike", oa("strike")], ["style", qE]], xE = [aE, hd].reduce((s, t) => (s[t.keyName] = t, s), {}), ou = [cd, Nl, Al, fd, md, yd].reduce((s, t) => (s[t.keyName] = t, s), {});
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
    return ki(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new q().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    SE(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const n = e.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return Ll(this.quill.scroll, n, r, o, i);
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
    (o = t.clipboardData) == null || o.setData("text/plain", r), (l = t.clipboardData) == null || l.setData("text/html", i), e && Sl({
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
    var o, l, a, h, c;
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
    const r = Array.from(((h = t.clipboardData) == null ? void 0 : h.files) || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(e, r);
      return;
    }
    if (n && r.length > 0) {
      const f = new DOMParser().parseFromString(n, "text/html");
      if (f.body.childElementCount === 1 && ((c = f.body.firstElementChild) == null ? void 0 : c.tagName) === "IMG") {
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
    const l = new q().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(l, S.sources.USER), this.quill.setSelection(l.length() - t.length, S.sources.SILENT), this.quill.scrollSelectionIntoView();
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
              const h = e.get(a);
              h == null || h.push(l);
            } else
              e.set(a, [l]);
          });
          break;
      }
    }), [n, i];
  }
}
D(vd, "DEFAULTS", {
  matchers: []
});
function Hs(s, t, e, n) {
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
function ki(s, t) {
  let e = "";
  for (let n = s.ops.length - 1; n >= 0 && e.length < t.length; --n) {
    const i = s.ops[n];
    if (typeof i.insert != "string") break;
    e = i.insert + e;
  }
  return e.slice(-1 * t.length) === t;
}
function ts(s, t) {
  if (!(s instanceof Element)) return !1;
  const e = t.query(s);
  return e && e.prototype instanceof $t ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(s.tagName.toLowerCase());
}
function IE(s, t) {
  return s.previousElementSibling && s.nextElementSibling && !ts(s.previousElementSibling, t) && !ts(s.nextElementSibling, t);
}
const lr = /* @__PURE__ */ new WeakMap();
function _d(s) {
  return s == null ? !1 : (lr.has(s) || (s.tagName === "PRE" ? lr.set(s, !0) : lr.set(s, _d(s.parentNode))), lr.get(s));
}
function Ll(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new q()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let l = Ll(s, o, e, n, i);
    return o.nodeType === t.ELEMENT_NODE && (l = e.reduce((a, h) => h(o, a, s), l), l = (i.get(o) || []).reduce((a, h) => h(o, a, s), l)), r.concat(l);
  }, new q()) : new q();
}
function oa(s) {
  return (t, e, n) => Hs(e, s, !0, n);
}
function RE(s, t, e) {
  const n = we.keys(s), i = oe.keys(s), r = hs.keys(s), o = {};
  return n.concat(i).concat(r).forEach((l) => {
    let a = e.query(l, B.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = xE[l], a != null && (a.attrName === l || a.keyName === l) && (o[a.attrName] = a.value(s) || void 0), a = ou[l], a != null && (a.attrName === l || a.keyName === l) && (a = ou[l], o[a.attrName] = a.value(s) || void 0));
  }), Object.entries(o).reduce((l, a) => {
    let [h, c] = a;
    return Hs(l, h, c, e);
  }, t);
}
function $E(s, t, e) {
  const n = e.query(s);
  if (n == null) return t;
  if (n.prototype instanceof $t) {
    const i = {}, r = n.value(s);
    if (r != null)
      return i[n.blotName] = r, new q().insert(i, n.formats(s, e));
  } else if (n.prototype instanceof bi && !ki(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return Hs(t, n.blotName, n.formats(s, e), e);
  return t;
}
function DE(s, t) {
  return ki(t, `
`) || t.insert(`
`), t;
}
function ME(s, t, e) {
  const n = e.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(s, e) : !0;
  return Hs(t, "code-block", i, e);
}
function qE() {
  return new q();
}
function BE(s, t, e) {
  const n = e.query(s);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !ki(t, `
`))
    return t;
  let i = -1, r = s.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: i,
    ...l.attributes || {}
  }) : o, new q());
}
function PE(s, t, e) {
  const n = s;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), Hs(t, "list", i, e);
}
function au(s, t, e) {
  if (!ki(t, `
`)) {
    if (ts(s, e) && (s.childNodes.length > 0 || s instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && s.nextSibling) {
      let n = s.nextSibling;
      for (; n != null; ) {
        if (ts(n, e))
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
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, l) => {
    let [a, h] = l;
    return Hs(o, a, h, e);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new q().insert("	").concat(t) : t;
}
function VE(s, t, e) {
  var i, r;
  const n = ((i = s.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? s.parentElement : (r = s.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const l = Array.from(n.querySelectorAll("tr")).indexOf(s) + 1;
    return Hs(t, "table", l, e);
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
    const r = (o, l) => {
      const a = l.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (s.previousSibling == null && s.parentElement != null && ts(s.parentElement, e) || s.previousSibling instanceof Element && ts(s.previousSibling, e)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (s.nextSibling == null && s.parentElement != null && ts(s.parentElement, e) || s.nextSibling instanceof Element && ts(s.nextSibling, e)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class Ed extends le {
  constructor(e, n) {
    super(e, n);
    D(this, "lastRecorded", 0);
    D(this, "ignoreChange", !1);
    D(this, "stack", {
      undo: [],
      redo: []
    });
    D(this, "currentRange", null);
    this.quill.on(S.events.EDITOR_CHANGE, (i, r, o, l) => {
      i === S.events.SELECTION_CHANGE ? r && l !== S.sources.SILENT && (this.currentRange = r) : i === S.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || l === S.sources.USER ? this.record(r, o) : this.transform(r)), this.currentRange = Ra(this.currentRange, r));
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
    lu(this.stack.undo, e), lu(this.stack.redo, e);
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
D(Ed, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: !1
});
function lu(s, t) {
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
    Sl({
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
  "blots/container": Us,
  "blots/cursor": Cn,
  "blots/embed": wl,
  "blots/inline": Te,
  "blots/scroll": fn,
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
class $a extends ft {
}
D($a, "blotName", "blockquote"), D($a, "tagName", "blockquote");
class Da extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
D(Da, "blotName", "header"), D(Da, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class xi extends Us {
}
xi.blotName = "list-container";
xi.tagName = "OL";
class Ii extends ft {
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
Ii.blotName = "list";
Ii.tagName = "LI";
xi.allowedChildren = [Ii];
Ii.requiredContainer = xi;
class _i extends Te {
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
D(_i, "blotName", "bold"), D(_i, "tagName", ["STRONG", "B"]);
class Ma extends _i {
}
D(Ma, "blotName", "italic"), D(Ma, "tagName", ["EM", "I"]);
class es extends Te {
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
D(es, "blotName", "link"), D(es, "tagName", "A"), D(es, "SANITIZED_URL", "about:blank"), D(es, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function Td(s, t) {
  const e = document.createElement("a");
  e.href = s;
  const n = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class qa extends Te {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
D(qa, "blotName", "script"), D(qa, "tagName", ["SUB", "SUP"]);
class Ba extends _i {
}
D(Ba, "blotName", "strike"), D(Ba, "tagName", ["S", "STRIKE"]);
class Pa extends Te {
}
D(Pa, "blotName", "underline"), D(Pa, "tagName", "U");
class fr extends wl {
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
D(fr, "blotName", "formula"), D(fr, "className", "ql-formula"), D(fr, "tagName", "SPAN");
const cu = ["alt", "height", "width"];
class ja extends $t {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return cu.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
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
    cu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
D(ja, "blotName", "image"), D(ja, "tagName", "IMG");
const uu = ["height", "width"];
class pr extends Ft {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return uu.reduce((e, n) => (t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e), {});
  }
  static sanitize(t) {
    return es.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    uu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
D(pr, "blotName", "video"), D(pr, "className", "ql-video"), D(pr, "tagName", "IFRAME");
const ii = new oe("code-token", "hljs", {
  scope: B.INLINE
});
class Be extends Te {
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
class ui extends Fs {
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
        const o = this.children.reduce((a, h) => a.concat(rd(h, !1)), new q()), l = t(i, r);
        o.diff(l).reduce((a, h) => {
          let {
            retain: c,
            attributes: f
          } = h;
          return c ? (f && Object.keys(f).forEach((g) => {
            [Ut.blotName, Be.blotName].includes(g) && this.formatAt(a, c, g, f[g]);
          }), a + c) : a;
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
ui.allowedChildren = [Ut];
Ut.requiredContainer = ui;
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
    S.register(Be, !0), S.register(Ut, !0), S.register(ui, !0);
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
      if (!(t instanceof ui)) return;
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
    (t == null ? this.quill.scroll.descendants(ui) : [t]).forEach((r) => {
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
    return n.classList.add(vt.className), n.innerHTML = tw(this.options.hljs, e, t), Ll(this.quill.scroll, n, [(i, r) => {
      const o = ii.value(i);
      return o ? r.compose(new q().retain(r.length(), {
        [Be.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, l, a) => (a !== 0 && o.insert(`
`, {
      [vt.blotName]: e
    }), o.insert(l)), r)], /* @__PURE__ */ new WeakMap());
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
const di = class di extends ft {
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", kl()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === di.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
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
D(di, "blotName", "table"), D(di, "tagName", "TD");
let se = di;
class Pe extends Us {
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
D(Pe, "blotName", "table-row"), D(Pe, "tagName", "TR");
class _e extends Us {
}
D(_e, "blotName", "table-body"), D(_e, "tagName", "TBODY");
class Ln extends Us {
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
    const n = kl(), i = this.scroll.create(Pe.blotName);
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
D(Ln, "blotName", "table-container"), D(Ln, "tagName", "TABLE");
Ln.allowedChildren = [_e];
_e.requiredContainer = Ln;
_e.allowedChildren = [Pe];
Pe.requiredContainer = _e;
Pe.allowedChildren = [se];
se.requiredContainer = Pe;
function kl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class ew extends le {
  static register() {
    S.register(se), S.register(Pe), S.register(_e), S.register(Ln);
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
    let l = i.rowOffset();
    t === 0 && (l += 1), this.quill.setSelection(e.index + l, e.length, S.sources.SILENT);
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
        table: kl()
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
const hu = Ue("quill:toolbar");
class xl extends le {
  constructor(t, e) {
    var n, i;
    if (super(t, e), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), sw(r, this.options.container), (i = (n = t.container) == null ? void 0 : n.parentNode) == null || i.insertBefore(r, t.container), this.container = r;
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
      hu.warn("ignoring attaching to nonexistent format", e, t);
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
        this.quill.scroll.query(e).prototype instanceof $t
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
xl.DEFAULTS = {};
function du(s, t, e) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), e != null ? (n.value = e, n.setAttribute("aria-label", `${t}: ${e}`)) : n.setAttribute("aria-label", t), s.appendChild(n);
}
function sw(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        du(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? nw(n, r, o) : du(n, r, o);
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
xl.DEFAULTS = {
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
const iw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', rw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', lw = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', cw = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', uw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', hw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', fu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', dw = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', fw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', pw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', gw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', mw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', bw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', yw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', vw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', _w = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Ew = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', ww = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Tw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', Ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Cw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Sw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', kw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', xw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Iw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Rw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', $w = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Dw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', Ei = {
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
  code: fu,
  "code-block": fu,
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
  underline: $w,
  video: Dw
}, Mw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let pu = 0;
function gu(s, t) {
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
    this.container.classList.toggle("ql-expanded"), gu(this.label, "aria-expanded"), gu(this.options, "aria-hidden");
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
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${pu}`, pu += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
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
      const l = r.bottom - r.top, a = t.bottom - t.top + l;
      this.root.style.top = `${n - a}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Bw = [!1, "center", "right", "justify"], Pw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], jw = [!1, "serif", "monospace"], Vw = ["1", "2", "3", !1], Uw = ["small", !1, "large", "huge"];
class Ri extends Sn {
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
Ri.DEFAULTS = ss({}, Sn.DEFAULTS, {
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
          const l = this.quill.getLines(i.index, i.length);
          if (l.length === 1) {
            const a = this.quill.getBounds(i);
            a != null && this.position(a);
          } else {
            const a = l[l.length - 1], h = this.quill.getIndex(a), c = Math.min(a.length() - 1, i.index + i.length - h), f = this.quill.getBounds(new Ms(h, c));
            f != null && this.position(f);
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
D(Ld, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class kd extends Ri {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Hw), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new Ld(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei));
  }
}
kd.DEFAULTS = ss({}, Ri.DEFAULTS, {
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
    D(this, "preview", this.root.querySelector("a.ql-preview"));
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
          const [r, o] = this.quill.scroll.descendant(es, e.index);
          if (r != null) {
            this.linkRange = new Ms(e.index - o, r.length());
            const l = es.formats(r.domNode);
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
D(xd, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Id extends Ri {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Ww), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei), this.tooltip = new xd(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Id.DEFAULTS = ss({}, Ri.DEFAULTS, {
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
  "attributors/style/background": Nl,
  "attributors/style/color": Al,
  "attributors/style/direction": fd,
  "attributors/style/font": md,
  "attributors/style/size": yd
}, !0);
S.register({
  "formats/align": ld,
  "formats/direction": dd,
  "formats/indent": JE,
  "formats/background": Nl,
  "formats/color": Al,
  "formats/font": gd,
  "formats/size": bd,
  "formats/blockquote": $a,
  "formats/code-block": vt,
  "formats/header": Da,
  "formats/list": Ii,
  "formats/bold": _i,
  "formats/code": Ol,
  "formats/italic": Ma,
  "formats/link": es,
  "formats/script": qa,
  "formats/strike": Ba,
  "formats/underline": Pa,
  "formats/formula": fr,
  "formats/image": ja,
  "formats/video": pr,
  "modules/syntax": Ad,
  "modules/table": ew,
  "modules/toolbar": xl,
  "themes/bubble": kd,
  "themes/snow": Id,
  "ui/icons": Ei,
  "ui/picker": Kr,
  "ui/icon-picker": Od,
  "ui/color-picker": Nd,
  "ui/tooltip": Cd
}, !0);
const ds = (s, t) => {
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
    p("div", Yw, null, 512)
  ]);
}
const Zw = /* @__PURE__ */ ds(Kw, [["render", Xw], ["__scopeId", "data-v-443c4edc"]]), Bt = {
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
      let r = !!t.videoWidth, o, l;
      r ? (o = t.videoWidth, l = t.videoHeight) : (o = t.width, l = t.height), s.original.width = o, s.original.height = l;
      for (let a in this.params.presets) {
        let h = this.params.presets[a];
        h.key = a, h.width = h.width ? h.width : 1920, h.height = h.height ? h.height : 1080;
        let c = h.width, f = h.height;
        if (h.crop === "fit") {
          let g = Math.max(c / o, f / l), m = o * g, _ = l * g, E = (m - c) / 2, w = (_ - f) / 2;
          n.width = c, n.height = f, i.drawImage(t, -E, -w, m, _);
        } else if (h.crop === "contain") {
          let g = Math.min(c / o, f / l), m = o * g, _ = l * g, E = (c - m) / 2, w = (f - _) / 2;
          n.width = c, n.height = f, i.clearRect(0, 0, c, f), i.drawImage(t, E, w, m, _);
        } else
          o > c && (l = Math.round(l * (c / o)), o = c), l > f && (o = Math.round(o * (f / l)), l = f), n.width = o, n.height = l, i.drawImage(t, 0, 0, o, l);
        s.types[h.key] = {
          width: n.width,
          height: n.height,
          extension: h.extension ? h.extension : this.getExtensionByMimeType(s.type),
          quality: h.quality ? h.quality : 0.9,
          crop: h.crop ? h.crop : null
        }, s.types[h.key].slug = Jn(s.title) + "-" + n.width + "x" + n.height + "-" + s.uid, s.types[h.key].mime = this.getMimeTypeByExtension(s.types[h.key].extension), s.types[h.key].data = n.toDataURL(
          s.types[h.key].mime,
          s.types[h.key].quality
        ), s.types[h.key].blob = await this.getBlob(n, s.types[h.key].mime, s.types[h.key].quality), s.types[h.key].blob && (s.types[h.key].bytes = s.types[h.key].blob.size), s.types[h.key].bytes && (s.bytes += s.types[h.key].bytes), e && e(h, s);
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
}, TT = ["href"], AT = ["src", "alt"], NT = ["src", "alt"], OT = { class: "dropdown" }, CT = { class: "dropdown-menu" }, ST = ["onClick"], LT = { key: 0 }, kT = ["onClick"], xT = { key: 1 }, IT = { class: "dropdown-item py-0 d-flex justify-content-between" }, RT = { key: 2 }, $T = { class: "dropdown-item py-0 d-flex justify-content-between" }, DT = ["innerHTML"], MT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, qT = { key: 0 }, BT = { key: 1 }, PT = { class: "dropdown-item py-0 d-flex justify-content-between" }, jT = { class: "text-muted fw-light me-4" }, VT = { class: "text-primary" }, UT = {
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
}, CA = ["innerHTML"], SA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, LA = { key: 3 }, kA = { class: "dropdown-item py-0 d-flex justify-content-between" }, xA = { class: "dropdown-item py-0 d-flex justify-content-between" }, IA = { class: "text-muted fw-light me-3" }, RA = ["innerHTML"], $A = { class: "dropdown-item py-0 d-flex justify-content-between" }, DA = { class: "text-muted fw-light me-3" }, MA = {
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
    p("div", {
      class: R(["vsa-upload", { wait: s.wait }])
    }, [
      s.editfile && s.editfile.presets ? (b(), y("div", eT, [
        p("div", sT, [
          (b(!0), y(W, null, z(s.editfile.types, (o, l) => (b(), y("div", {
            class: "col-md-3",
            key: l
          }, [
            p("span", nT, O(o.extension), 1),
            p("span", iT, O(o.width) + " x " + O(o.height), 1),
            p("span", rT, "~" + O(s.roundFileSize(o.bytes)), 1),
            o ? (b(), y("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, oT)) : A("", !0)
          ]))), 128))
        ]),
        G(p("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o)
        }, null, 512), [
          [jt, s.editfile.title]
        ]),
        p("div", aT, [
          p("div", lT, [
            p("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          p("div", cT, [
            p("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          p("div", uT, [
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
          p("table", pT, [
            p("tbody", null, [
              (b(!0), y(W, null, z(s.files, (o, l) => (b(), y("tr", { key: l }, [
                p("td", gT, [
                  p("small", null, O(l + 1), 1)
                ]),
                p("td", mT, [
                  p("div", bT, [
                    o.isDocument ? (b(), y("span", yT, [
                      p("i", {
                        class: R(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (b(), y("span", vT, t[9] || (t[9] = [
                      p("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (b(), y("span", _T, t[10] || (t[10] = [
                      p("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : A("", !0),
                    G(p("input", {
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
                        p("img", {
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
                    p("div", OT, [
                      t[24] || (t[24] = p("button", {
                        class: "btn btn-sm bg-light text-dark dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, null, -1)),
                      p("ul", CT, [
                        p("li", null, [
                          p("button", {
                            class: "dropdown-item text-danger py-1",
                            onClick: (a) => s.remove(l),
                            type: "button"
                          }, t[11] || (t[11] = [
                            p("i", { class: "bi bi-x-circle" }, null, -1),
                            U(" Remove ")
                          ]), 8, ST)
                        ]),
                        o.uploaded ? (b(), y("li", LT, [
                          p("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => s.download(l, s.params),
                            type: "button"
                          }, t[12] || (t[12] = [
                            p("i", { class: "bi bi-download" }, null, -1),
                            U(" Download ")
                          ]), 8, kT)
                        ])) : A("", !0),
                        t[22] || (t[22] = p("li", null, [
                          p("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.original.width ? (b(), y("li", xT, [
                          p("small", IT, [
                            t[13] || (t[13] = p("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            U(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                          ])
                        ])) : A("", !0),
                        o.isDocument ? A("", !0) : (b(), y("li", RT, [
                          p("small", $T, [
                            t[14] || (t[14] = p("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            p("span", null, [
                              p("span", {
                                innerHTML: s.roundFileSize(o.original.bytes, !0)
                              }, null, 8, DT),
                              p("small", MT, O(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        (b(!0), y(W, null, z(o.types, (a, h) => (b(), y(W, { key: a }, [
                          o.isDocument ? A("", !0) : (b(), y("li", qT, t[15] || (t[15] = [
                            p("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (b(), y("li", BT, [
                            p("small", PT, [
                              p("span", jT, [
                                p("span", VT, O(h), 1),
                                t[16] || (t[16] = U(" resolution & crop"))
                              ]),
                              p("span", null, [
                                U(O(a.width) + " x " + O(a.height) + " ", 1),
                                a.crop ? (b(), y("small", UT, O(a.crop), 1)) : A("", !0)
                              ])
                            ])
                          ])) : A("", !0),
                          p("li", null, [
                            p("small", FT, [
                              p("span", HT, [
                                o.isDocument ? A("", !0) : (b(), y("span", WT, O(h), 1)),
                                t[17] || (t[17] = U(" size & extension"))
                              ]),
                              p("span", null, [
                                p("span", {
                                  class: R({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: s.roundFileSize(a.bytes, !0)
                                }, null, 10, zT),
                                p("small", KT, O(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[23] || (t[23] = p("li", null, [
                          p("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.uploaded ? (b(), y("li", GT, [
                          p("small", YT, [
                            t[18] || (t[18] = p("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[19] || (t[19] = U()),
                            p("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ])) : A("", !0),
                        p("li", null, [
                          p("small", XT, [
                            p("span", ZT, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                            t[20] || (t[20] = U()),
                            p("span", {
                              innerHTML: s.roundFileSize(o.bytes, !0)
                            }, null, 8, QT)
                          ])
                        ]),
                        p("li", null, [
                          p("small", JT, [
                            p("span", tA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                            t[21] || (t[21] = U()),
                            p("span", null, O(o.slug), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (b(!0), y(W, { key: 1 }, z(s.files, (o, l) => (b(), y("div", {
          class: R([s.params.colclass ? s.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          p("div", eA, [
            o.loaded ? (b(), y("div", sA, [
              A("", !0),
              o.types && o.types[s.params.thumbnail] ? (b(), y("div", nA, [
                p("img", {
                  class: "img-fluid",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, iA)
              ])) : A("", !0),
              o.isDocument ? (b(), y("div", rA, [
                p("i", {
                  class: R(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : A("", !0),
              G(p("input", {
                required: "text",
                class: "form-control rounded-0 rounded-top py-1 px-2 fw-light",
                "onUpdate:modelValue": (a) => o.title = a,
                onInput: (a) => s.slug(o),
                onKeydown: t[5] || (t[5] = ri(aa(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, oA), [
                [jt, o.title]
              ]),
              p("div", aA, [
                t[41] || (t[41] = p("button", {
                  class: "btn btn-sm bg-light text-dark dropdown-toggle w-100 h-100",
                  type: "button",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, null, -1)),
                p("ul", lA, [
                  p("li", null, [
                    p("button", {
                      class: "dropdown-item text-danger py-1",
                      onClick: (a) => s.remove(l),
                      type: "button"
                    }, t[28] || (t[28] = [
                      p("i", { class: "bi bi-x-circle" }, null, -1),
                      U(" Remove ")
                    ]), 8, cA)
                  ]),
                  o.uploaded ? (b(), y("li", uA, [
                    p("button", {
                      class: "dropdown-item text-primary py-1",
                      onClick: (a) => s.download(l, s.params),
                      type: "button"
                    }, t[29] || (t[29] = [
                      p("i", { class: "bi bi-download" }, null, -1),
                      U(" Download ")
                    ]), 8, hA)
                  ])) : A("", !0),
                  t[39] || (t[39] = p("li", null, [
                    p("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.original.width ? (b(), y("li", dA, [
                    p("small", fA, [
                      t[30] || (t[30] = p("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                      U(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                    ])
                  ])) : A("", !0),
                  o.isDocument ? A("", !0) : (b(), y("li", pA, [
                    p("small", gA, [
                      t[31] || (t[31] = p("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                      p("span", null, [
                        p("span", {
                          innerHTML: s.roundFileSize(o.original.bytes, !0)
                        }, null, 8, mA),
                        p("small", bA, O(o.original.extension), 1)
                      ])
                    ])
                  ])),
                  (b(!0), y(W, null, z(o.types, (a, h) => (b(), y(W, { key: a }, [
                    o.isDocument ? A("", !0) : (b(), y("li", yA, t[32] || (t[32] = [
                      p("hr", { class: "dropdown-divider" }, null, -1)
                    ]))),
                    o.original.width ? (b(), y("li", vA, [
                      p("small", _A, [
                        p("span", EA, [
                          p("span", wA, O(h), 1),
                          t[33] || (t[33] = U(" resolution & crop"))
                        ]),
                        p("span", null, [
                          U(O(a.width) + " x " + O(a.height) + " ", 1),
                          a.crop ? (b(), y("small", TA, O(a.crop), 1)) : A("", !0)
                        ])
                      ])
                    ])) : A("", !0),
                    p("li", null, [
                      p("small", AA, [
                        p("span", NA, [
                          o.isDocument ? A("", !0) : (b(), y("span", OA, O(h), 1)),
                          t[34] || (t[34] = U(" size & extension"))
                        ]),
                        p("span", null, [
                          p("span", {
                            class: R({ "text-danger": a.bytes > o.original.bytes }),
                            innerHTML: s.roundFileSize(a.bytes, !0)
                          }, null, 10, CA),
                          p("small", SA, O(a.extension), 1)
                        ])
                      ])
                    ])
                  ], 64))), 128)),
                  t[40] || (t[40] = p("li", null, [
                    p("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.uploaded ? (b(), y("li", LA, [
                    p("small", kA, [
                      t[35] || (t[35] = p("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                      t[36] || (t[36] = U()),
                      p("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                    ])
                  ])) : A("", !0),
                  p("li", null, [
                    p("small", xA, [
                      p("span", IA, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                      t[37] || (t[37] = U()),
                      p("span", {
                        innerHTML: s.roundFileSize(o.bytes, !0)
                      }, null, 8, RA)
                    ])
                  ]),
                  p("li", null, [
                    p("small", $A, [
                      p("span", DA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                      t[38] || (t[38] = U()),
                      p("span", null, O(o.slug), 1)
                    ])
                  ])
                ])
              ])
            ])) : (b(), y("div", MA, t[42] || (t[42] = [
              p("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : A("", !0),
      p("div", qA, [
        p("div", BA, [
          p("label", {
            for: s.uploadId,
            class: R([{ "disabled bg-secondary": s.files && s.params.limit <= s.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            s.files && s.params.limit > s.files.length ? (b(), y("span", jA, [
              t[46] || (t[46] = p("i", { class: "bi bi-upload me-2" }, null, -1)),
              U(" " + O(s.params.text) + " ", 1),
              s.params.limit ? (b(), y("small", VA, [
                t[43] || (t[43] = U(" ( ")),
                p("strong", UA, O(s.files.length), 1),
                t[44] || (t[44] = U(" / ")),
                p("span", FA, O(s.params.limit), 1),
                t[45] || (t[45] = U(" ) "))
              ])) : A("", !0)
            ])) : (b(), y("span", HA, t[47] || (t[47] = [
              p("i", { class: "bi bi-exclamation-circle" }, null, -1),
              U(" You've reached the upload limit ")
            ])))
          ], 10, PA),
          p("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (o) => s.toggleView())
          }, [
            s.params.ui != "list" ? (b(), y("i", WA)) : A("", !0),
            s.params.ui == "list" ? (b(), y("i", zA)) : A("", !0)
          ]),
          p("button", {
            disabled: !s.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (o) => s.resetConfirm())
          }, t[48] || (t[48] = [
            p("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, KA)
        ]),
        p("div", GA, [
          p("small", null, [
            s.params.accept ? (b(), y("div", YA, [
              t[49] || (t[49] = p("span", { class: "text-secondary" }, "accept only", -1)),
              (b(!0), y(W, null, z(s.params.accept, (o) => (b(), y("strong", {
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
const QA = /* @__PURE__ */ ds(Jw, [["render", ZA], ["__scopeId", "data-v-074cafd8"]]), JA = {
  props: {
    modelValue: String | Object | Number,
    field: Object,
    item: Object,
    settings: Object,
    formId: String
  },
  data: function() {
    return {
      value: void 0
    };
  },
  created() {
  },
  mounted() {
    this.value = this.modelValue;
  },
  watch: {
    modelValue(s) {
      this.value = this.modelValue;
    }
  },
  methods: {
    getValueOrFunction(s, t) {
      return rl(s, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    selectOptions(s, t) {
      return typeof s == "function" ? s(this.item, t, this) : s;
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
}, tN = JA, eN = ["name", "id", "readonly", "required"], sN = ["value"];
function nN(s, t, e, n, i, r) {
  return G((b(), y("select", {
    class: R(["form-select", s.getValueOrFunction(s.field.inputclass ? s.field.inputclass : "", { field: s.field, item: s.item })]),
    name: s.field.name,
    id: s.formId + "_" + s.field.name,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => s.item[s.field.name] = o),
    readonly: s.field.readonly,
    required: s.field.required
  }, [
    (b(!0), y(W, null, z(s.selectOptions(s.field.options, s.field), (o) => (b(), y("option", {
      class: R(s.getValueOrFunction(s.field.optionclass ? s.field.optionclass : "", { field: s.field, item: s.item, option: o })),
      key: o,
      value: o.value
    }, O(o.label ? o.label : o.value), 11, sN))), 128))
  ], 10, eN)), [
    [ge, s.item[s.field.name]]
  ]);
}
const iN = /* @__PURE__ */ ds(tN, [["render", nN]]), rN = {
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
      return rl(s, t, this.settings, this);
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
    FileUpload: QA,
    VuAdminFormSelect: iN
  }
}, oN = rN, aN = { class: "row m-1" }, lN = { class: "form-row-title mb-4 fw-lighter" }, cN = {
  key: 0,
  class: "row"
}, uN = { class: "form-group pb-3" }, hN = { key: 0 }, dN = {
  key: 0,
  class: "badge text-secondary fw-light"
}, fN = ["for", "innerHTML"], pN = { class: "input-group" }, gN = ["innerHTML"], mN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], bN = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], yN = ["name", "id", "onUpdate:modelValue", "readonly", "required"], vN = {
  key: 4,
  class: "form-check"
}, _N = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "readonly", "required"], EN = ["for"], wN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], TN = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], AN = ["innerHTML"], NN = { key: 3 }, ON = ["innerHTML"], CN = ["type", "required", "placeholder", "onUpdate:modelValue"], SN = { class: "col-2 text-nowrap text-end" }, LN = ["onClick"], kN = ["onClick"], xN = ["onClick"], IN = { key: 0 }, RN = { class: "row g-1 d-flex align-items-center justify-content-between" }, $N = ["onUpdate:modelValue"], DN = ["value"], MN = ["type", "placeholder", "onUpdate:modelValue"], qN = { class: "col-2" }, BN = ["onClick"], PN = { key: 4 }, jN = { key: 0 }, VN = ["for"], UN = ["name", "id", "onUpdate:modelValue"], FN = ["onClick"], HN = {
  key: 5,
  class: "p-1"
}, WN = ["innerHTML"];
function zN(s, t, e, n, i, r) {
  const o = Ls("VuAdminFormSelect"), l = Ls("HtmlEditor"), a = Ls("FileUpload");
  return b(), y("div", aN, [
    (b(!0), y(W, null, z(s.settings.form.groups, (h) => (b(), y("div", {
      key: h,
      class: R([h.class ? h.class : "col-md-12"])
    }, [
      p("h2", lN, O(h.title), 1),
      s.item && h.fields ? (b(), y("div", cN, [
        (b(!0), y(W, null, z(h.fields, (c) => (b(), y("div", {
          class: R([s.getValueOrFunction(c.class ? c.class : "col-md-12"), "input_type_" + c.type]),
          key: c
        }, [
          p("div", uN, [
            c.label !== null ? (b(), y("span", hN, [
              ["html", "image", "upload"].indexOf(c.type) >= 0 ? (b(), y("label", {
                key: 0,
                class: R([{ required: c.required }, "form-label text-secondary mb-1"])
              }, [
                U(O(c.label ? c.label : s.translate(c.name)) + " ", 1),
                c.maxlength ? (b(), y("span", dN, O(s.item[c.name] ? s.item[c.name].length : 0) + " / " + O(c.maxlength), 1)) : A("", !0)
              ], 2)) : (b(), y("label", {
                key: 1,
                class: R([{ required: c.required }, "form-label text-secondary mb-1"]),
                for: s.formId + "_" + c.name,
                innerHTML: s.getValueOrFunction(c.label ? c.label : s.translate(c.name), { field: c, item: s.item })
              }, null, 10, fN))
            ])) : A("", !0),
            p("div", pN, [
              c.prefix ? (b(), y("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: c.prefix
              }, null, 8, gN)) : A("", !0),
              c.type == "text" ? G((b(), y("input", {
                key: 1,
                class: R(["form-control", s.getValueOrFunction(c.inputclass ? c.inputclass : "", { field: c, item: s.item })]),
                type: "text",
                name: c.name,
                id: s.formId + "_" + c.name,
                "onUpdate:modelValue": (f) => s.item[c.name] = f,
                minlength: c.minlength,
                maxlength: c.maxlength,
                placeholder: c.placeholder ? c.placeholder : "",
                readonly: c.readonly,
                required: c.required
              }, null, 10, mN)), [
                [jt, s.item[c.name]]
              ]) : A("", !0),
              c.type == "number" ? G((b(), y("input", {
                key: 2,
                class: R(["form-control", s.getValueOrFunction(c.inputclass ? c.inputclass : "", { field: c, item: s.item })]),
                type: "number",
                name: c.name,
                id: s.formId + "_" + c.name,
                "onUpdate:modelValue": (f) => s.item[c.name] = f,
                min: c.min,
                max: c.max,
                step: c.step,
                placeholder: c.placeholder ? c.placeholder : "",
                readonly: c.readonly,
                required: c.required
              }, null, 10, bN)), [
                [jt, s.item[c.name]]
              ]) : A("", !0),
              c.type == "date" ? G((b(), y("input", {
                key: 3,
                class: R(["form-control", s.getValueOrFunction(c.inputclass ? c.inputclass : "", { field: c, item: s.item })]),
                type: "date",
                name: c.name,
                id: s.formId + "_" + c.name,
                "onUpdate:modelValue": (f) => s.item[c.name] = f,
                readonly: c.readonly,
                required: c.required
              }, null, 10, yN)), [
                [jt, s.item[c.name]]
              ]) : A("", !0),
              c.type == "checkbox" ? (b(), y("div", vN, [
                G(p("input", {
                  class: R(["form-check-input", s.getValueOrFunction(c.inputclass ? c.inputclass : "", { field: c, item: s.item })]),
                  type: "checkbox",
                  name: c.name,
                  id: s.formId + "_" + c.name,
                  "true-value": c.true != null ? c.true : !0,
                  "false-value": c.false != null ? c.false : !1,
                  "onUpdate:modelValue": (f) => s.item[c.name] = f,
                  readonly: c.readonly,
                  required: c.required
                }, null, 10, _N), [
                  [Dd, s.item[c.name]]
                ]),
                p("label", {
                  class: "form-check-label cursor-pointer",
                  for: s.formId + "_" + c.name
                }, O(c.checkbox), 9, EN)
              ])) : A("", !0),
              c.type == "email" ? G((b(), y("input", {
                key: 5,
                autocomplete: "on",
                class: R(["form-control", s.getValueOrFunction(c.inputclass ? c.inputclass : "", { field: c, item: s.item })]),
                type: "email",
                name: c.name,
                id: s.formId + "_" + c.name,
                "onUpdate:modelValue": (f) => s.item[c.name] = f,
                minlength: c.minlength,
                maxlength: c.maxlength,
                placeholder: c.placeholder ? c.placeholder : "",
                readonly: c.readonly,
                required: c.required
              }, null, 10, wN)), [
                [jt, s.item[c.name]]
              ]) : A("", !0),
              c.type == "select" && (!c.relation || c.relation && c.relation.items) ? (b(), oi(o, {
                key: 6,
                modelValue: s.item[c.name],
                "onUpdate:modelValue": (f) => s.item[c.name] = f,
                field: c,
                item: s.item,
                settings: s.settings,
                formId: s.formId
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : A("", !0),
              c.type == "textarea" ? G((b(), y("textarea", {
                key: 7,
                class: R(["form-control", s.getValueOrFunction(c.inputclass ? c.inputclass : "", { field: c, item: s.item })]),
                name: c.name,
                id: s.formId + "_" + c.name,
                "onUpdate:modelValue": (f) => s.item[c.name] = f,
                rows: c.rows,
                minlength: c.minlength,
                maxlength: c.maxlength,
                placeholder: c.placeholder ? c.placeholder : "",
                readonly: c.readonly,
                required: c.required
              }, "              ", 10, TN)), [
                [jt, s.item[c.name]]
              ]) : A("", !0),
              c.suffix ? (b(), y("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: c.suffix
              }, null, 8, AN)) : A("", !0)
            ]),
            c.type == "html" ? (b(), oi(l, {
              key: 1,
              modelValue: s.item[c.name],
              "onUpdate:modelValue": (f) => s.item[c.name] = f,
              class: R([c.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : A("", !0),
            c.type == "image" || c.type == "upload" ? (b(), oi(a, {
              key: 2,
              modelValue: s.item[c.name],
              "onUpdate:modelValue": (f) => s.item[c.name] = f,
              class: R([c.class]),
              field: c,
              settings: s.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : A("", !0),
            c.type == "list" ? (b(), y("div", NN, [
              (b(!0), y(W, null, z(s.item[c.name], (f, g) => (b(), y("div", {
                class: "row g-1 d-flex align-items-center justify-content-between mb-1",
                key: g
              }, [
                (b(!0), y(W, null, z(f, (m, _) => (b(), y("div", {
                  key: _,
                  class: R(c.elements[_].class || "col")
                }, [
                  c.elements[_].template ? (b(), y("span", {
                    key: 0,
                    innerHTML: s.getValueOrFunction(c.elements[_].template, s.item[c.name][g])
                  }, null, 8, ON)) : G((b(), y("input", {
                    key: 1,
                    type: c.elements[_].type,
                    required: c.elements[_].required,
                    placeholder: c.elements[_].placeholder || _,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (E) => s.item[c.name][g][_] = E
                  }, null, 8, CN)), [
                    [pn, s.item[c.name][g][_]]
                  ])
                ], 2))), 128)),
                p("div", SN, [
                  c.sort ? (b(), y("button", {
                    key: 0,
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (m) => s.arrayItemMoveUp(s.item[c.name], g)
                  }, t[0] || (t[0] = [
                    p("i", { class: "bi bi-arrow-up" }, null, -1)
                  ]), 8, LN)) : A("", !0),
                  c.sort ? (b(), y("button", {
                    key: 1,
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary p-1 me-1",
                    onClick: (m) => s.arrayItemMoveDown(s.item[c.name], g + 1)
                  }, t[1] || (t[1] = [
                    p("i", { class: "bi bi-arrow-down" }, null, -1)
                  ]), 8, kN)) : A("", !0),
                  p("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-danger p-1 me-1",
                    onClick: (m) => s.arrayRemoveItem(s.item[c.name], g)
                  }, t[2] || (t[2] = [
                    p("i", { class: "bi bi-trash" }, null, -1)
                  ]), 8, xN)
                ])
              ]))), 128)),
              s.item[c.name] && s.item[c.name].length ? (b(), y("hr", IN)) : A("", !0),
              p("div", RN, [
                (b(!0), y(W, null, z(c.elements, (f) => (b(), y("div", {
                  key: f,
                  class: R(f.class || "col")
                }, [
                  f.type === "select" ? G((b(), y("select", {
                    key: 0,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (g) => f.value = g
                  }, [
                    (b(!0), y(W, null, z(s.selectOptions(f.options, f), (g) => (b(), y("option", {
                      key: g,
                      value: g.value
                    }, O(g.label ? g.label : g.value), 9, DN))), 128))
                  ], 8, $N)), [
                    [ge, f.value]
                  ]) : G((b(), y("input", {
                    key: 1,
                    type: f.type,
                    placeholder: f.placeholder || f.name,
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": (g) => f.value = g
                  }, null, 8, MN)), [
                    [pn, f.value]
                  ])
                ], 2))), 128)),
                p("div", qN, [
                  p("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-primary my-1 w-100",
                    onClick: (f) => s.arrayAddNewItem(c, s.item)
                  }, t[3] || (t[3] = [
                    p("i", { class: "bi bi-plus" }, null, -1)
                  ]), 8, BN)
                ])
              ])
            ])) : A("", !0),
            c.type == "addresses" ? (b(), y("span", PN, [
              s.item[c.name] ? (b(), y("div", jN, [
                (b(!0), y(W, null, z(s.item[c.name], (f) => (b(), y("div", { key: f }, [
                  U(O(f) + " ", 1),
                  p("label", {
                    class: "form-label text-secondary mb-1",
                    for: s.formId + "_" + c.name
                  }, O(c.label), 9, VN),
                  G(p("input", {
                    class: "form-control",
                    type: "text",
                    name: c.name,
                    id: s.formId + "_" + c.name,
                    "onUpdate:modelValue": (g) => f.country = g
                  }, null, 8, UN), [
                    [jt, f.country]
                  ])
                ]))), 128))
              ])) : A("", !0),
              p("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (f) => s.insertAddress(c.name)
              }, " Add ", 8, FN)
            ])) : A("", !0),
            c.description ? (b(), y("div", HN, [
              p("i", {
                class: "text-muted",
                innerHTML: c.description
              }, null, 8, WN)
            ])) : A("", !0)
          ])
        ], 2))), 128))
      ])) : A("", !0)
    ], 2))), 128))
  ]);
}
const KN = /* @__PURE__ */ ds(oN, [["render", zN], ["__scopeId", "data-v-10456ef6"]]), GN = {
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
          Qe("GET", t.form.api, s),
          Ze("GET", t.api)
        ).catch((o) => {
        }), n = await si(e);
        if (ni(e, n.data, "form") || !n.data)
          return this.formNoWait(), !1;
        t.form.default && (n.data = Object.assign({}, t.form.default, n.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(n.data, e);
        let r;
        t.form.api.input.item ? r = typeof t.form.api.input.item == "string" ? n.data[t.form.api.input.item] : t.form.api.input.item(n.data, e) : r = n.data;
        for (let o of t.form.groups)
          for (let l of o.fields)
            l.relation && t.relations[l.relation.entity] && (l.relation = Dr(t.relations[l.relation.entity], l.relation), await this.fetchRelation(l, [r]));
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
    },
    async deleteItem(s, t) {
      try {
        s || (s = this.item);
        let e = s[this.settings.pkey];
        if (!e || !confirm("Are you sure you want to delete this post"))
          return;
        this.formWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(s);
        const i = await fetch(
          Qe(
            "DELETE",
            this.settings.form.api,
            e,
            t
          ),
          Ze("DELETE", this.settings.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        this.item && (this.item = {}, this.modalWindow.hide());
        const r = await i.json();
        this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(r, i), this.reloadTable(), this.formNoWait();
      } catch (e) {
        console.error(e.message), this.formNoWait();
      }
    }
  },
  components: {
    VuAdminFormGroup: KN
  }
}, YN = GN, XN = ["id", "data-bs-theme"], ZN = { class: "modal-header" }, QN = { class: "modal-title" }, JN = ["innerHTML"], tO = { key: 1 }, eO = { key: 2 }, sO = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, nO = {
  key: 0,
  class: "d-inline-block ms-3 mt-1"
}, iO = ["innerHTML"], rO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, oO = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, aO = ["disabled"], lO = ["disabled"], cO = {
  key: 0,
  class: "d-inline-block m-1"
}, uO = { class: "dropdown d-inline-block" }, hO = ["innerHTML"], dO = { class: "dropdown-menu text-start" }, fO = { class: "me-2 text-muted" }, pO = ["innerHTML"], gO = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, mO = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, bO = {
  key: 1,
  class: "modal-body custom-scroll"
}, yO = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, vO = ["disabled"], _O = ["disabled"], EO = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, wO = {
  type: "submit",
  class: "btn btn-primary m-1"
}, TO = {
  key: 3,
  class: "bg-light text-dark"
};
function AO(s, t, e, n, i, r) {
  const o = Ls("VuAdminFormGroup");
  return s.item ? (b(), y("form", {
    key: 0,
    ref: "form",
    id: s.formId,
    class: R(["form", [s.settings.form.class, { wait: s.ui.wait.form }]]),
    onSubmit: t[11] || (t[11] = aa((...l) => s.submitItem && s.submitItem(...l), ["prevent"])),
    "data-bs-theme": [s.settings.theme]
  }, [
    p("div", {
      class: R(["vua-overlay", { blocked: s.ui.block.form }])
    }, null, 2),
    p("div", ZN, [
      p("h5", QN, [
        s.settings.form.title && typeof s.settings.form.title == "function" ? (b(), y("span", {
          key: 0,
          innerHTML: s.settings.form.title(s.item, s.settings)
        }, null, 8, JN)) : A("", !0),
        s.settings.form.title && typeof s.settings.form.title == "string" ? (b(), y("span", tO, O(s.translate(s.settings.form.title)), 1)) : A("", !0),
        s.settings.form.title ? A("", !0) : (b(), y("span", eO, O(s.translate("Edit")), 1)),
        s.item[s.settings.pkey] ? (b(), y("small", sO, [
          t[12] || (t[12] = p("span", { class: "text-muted fw-light" }, "id", -1)),
          U(" " + O(s.item[s.settings.pkey]), 1)
        ])) : A("", !0)
      ]),
      s.message.form ? (b(), y("span", nO, [
        p("span", {
          class: R(["text-" + s.message.form.priority])
        }, [
          t[13] || (t[13] = p("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          p("span", {
            innerHTML: s.message.form.msg
          }, null, 8, iO)
        ], 2)
      ])) : A("", !0),
      G(p("span", rO, t[14] || (t[14] = [
        p("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Os, s.ui.wait.form]
      ]),
      t[15] || (t[15] = p("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    s.item ? (b(), y("div", oO, [
      p("div", null, [
        p("button", {
          type: "button",
          class: "btn btn-sm btn-secondary m-1",
          onClick: t[0] || (t[0] = (l) => s.reloadItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[16] || (t[16] = p("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
          U(" " + O(s.translate("Reload")), 1)
        ], 8, aO),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-outline-warning m-1",
          onClick: t[1] || (t[1] = (l) => s.createItem())
        }, [
          t[17] || (t[17] = p("i", { class: "bi bi-plus-circle" }, null, -1)),
          U(" " + O(s.translate("New")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-outline-warning m-1",
          onClick: t[2] || (t[2] = (l) => s.copyItem())
        }, [
          t[18] || (t[18] = p("i", { class: "bi bi-copy" }, null, -1)),
          U(" " + O(s.translate("Copy")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-danger m-1",
          onClick: t[3] || (t[3] = (l) => s.deleteItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[19] || (t[19] = p("i", { class: "bi bi-trash" }, null, -1)),
          U(" " + O(s.translate("Delete")), 1)
        ], 8, lO)
      ]),
      p("div", null, [
        s.messages.form.length ? (b(), y("div", cO, [
          p("div", uO, [
            p("button", {
              class: R(["btn btn-sm dropdown-toggle", ["btn-" + s.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: s.messages.form.length + " " + (s.messages.form.length > 1 ? s.translate("messages") : s.translate("message"))
            }, null, 10, hO),
            p("ul", dO, [
              (b(!0), y(W, null, z(s.messages.form, (l) => (b(), y("li", { key: l }, [
                p("span", {
                  class: R(["dropdown-item", ["text-" + l.priority]])
                }, [
                  p("small", fO, O(l.datetime), 1),
                  p("span", {
                    innerHTML: l.msg
                  }, null, 8, pO)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : A("", !0),
        p("button", gO, [
          t[20] || (t[20] = p("i", { class: "bi bi-x" }, null, -1)),
          U(" " + O(s.translate("Close")), 1)
        ]),
        p("button", mO, [
          t[21] || (t[21] = p("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-success m-1",
          onClick: t[4] || (t[4] = (...l) => s.submitAndClose && s.submitAndClose(...l))
        }, [
          t[22] || (t[22] = p("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save and close")), 1)
        ])
      ])
    ])) : A("", !0),
    s.settings.form ? (b(), y("div", bO, [
      s.settings.form.visible && s.settings.form.groups ? (b(), oi(o, {
        key: 0,
        modelValue: s.item,
        "onUpdate:modelValue": t[5] || (t[5] = (l) => s.item = l),
        formid: s.formId,
        settings: s.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : A("", !0)
    ])) : A("", !0),
    s.item ? (b(), y("div", yO, [
      p("div", null, [
        p("button", {
          type: "button",
          class: "btn btn-secondary m-1",
          onClick: t[6] || (t[6] = (l) => s.reloadItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[23] || (t[23] = p("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
          U(" " + O(s.translate("Reload")), 1)
        ], 8, vO),
        p("button", {
          type: "button",
          class: "btn btn-outline-warning m-1",
          onClick: t[7] || (t[7] = (l) => s.createItem())
        }, [
          t[24] || (t[24] = p("i", { class: "bi bi-plus-circle" }, null, -1)),
          U(" " + O(s.translate("New")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-outline-warning m-1",
          onClick: t[8] || (t[8] = (l) => s.copyItem())
        }, [
          t[25] || (t[25] = p("i", { class: "bi bi-copy" }, null, -1)),
          U(" " + O(s.translate("Copy")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-danger m-1",
          onClick: t[9] || (t[9] = (l) => s.deleteItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[26] || (t[26] = p("i", { class: "bi bi-trash" }, null, -1)),
          U(" " + O(s.translate("Delete")), 1)
        ], 8, _O)
      ]),
      p("div", null, [
        p("button", EO, [
          t[27] || (t[27] = p("i", { class: "bi bi-x" }, null, -1)),
          U(" " + O(s.translate("Close")), 1)
        ]),
        p("button", wO, [
          t[28] || (t[28] = p("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-success m-1",
          onClick: t[10] || (t[10] = (...l) => s.submitAndClose && s.submitAndClose(...l))
        }, [
          t[29] || (t[29] = p("i", { class: "bi bi-save" }, null, -1)),
          U(" " + O(s.translate("Save and close")), 1)
        ])
      ])
    ])) : A("", !0),
    s.settings.debug ? (b(), y("pre", TO, "        " + O(s.item) + `
    `, 1)) : A("", !0)
  ], 42, XN)) : A("", !0);
}
const NO = /* @__PURE__ */ ds(YN, [["render", AO], ["__scopeId", "data-v-e4adfd05"]]), OO = {
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
}, CO = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, SO = { class: "dropdown d-inline-block m-1" }, LO = {
  type: "button",
  class: "btn btn-sm btn-secondary dropdown-toggle",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, kO = { class: "mx-1" }, xO = { key: 0 }, IO = { class: "dropdown-menu text-end" }, RO = ["onClick"], $O = { class: "ms-2" }, DO = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, MO = {
  key: 1,
  class: "bi bi-circle ms-2"
}, qO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, BO = { class: "pagination pagination-sm m-1" }, PO = { class: "page-item" }, jO = { "aria-hidden": "true" }, VO = { class: "page-item" }, UO = { "aria-hidden": "true" }, FO = ["onClick"], HO = { class: "page-item" }, WO = { "aria-hidden": "true" }, zO = { "aria-hidden": "true" }, KO = {
  key: 0,
  class: "page-item"
}, GO = { "aria-hidden": "true" };
function YO(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? A("", !0) : (b(), y("nav", CO, [
    p("div", null, [
      p("div", SO, [
        p("button", LO, [
          G(p("span", kO, [
            p("strong", null, O(e.config.pagination.from) + "-" + O(e.config.pagination.to), 1),
            e.config.pagination.total ? (b(), y("span", xO, " / " + O(e.config.pagination.total), 1)) : A("", !0)
          ], 512), [
            [Os, e.config.pagination.from > 0]
          ])
        ]),
        p("ul", IO, [
          p("li", null, [
            (b(!0), y(W, null, z(e.config.pagination.limits, (o) => (b(), y("span", {
              class: R(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (l) => r.setPageLimit(o)
            }, [
              p("strong", null, O(o), 1),
              p("small", $O, O(r.translate("row")) + "/" + O(r.translate("page")), 1),
              e.config.pagination.limit == o ? (b(), y("i", DO)) : A("", !0),
              e.config.pagination.limit != o ? (b(), y("i", MO)) : A("", !0)
            ], 10, RO))), 128))
          ])
        ])
      ]),
      G(p("div", qO, t[4] || (t[4] = [
        p("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Os, e.ui && e.ui.wait.table]
      ])
    ]),
    p("ul", BO, [
      p("li", PO, [
        p("a", {
          class: R(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          p("span", jO, O(r.translate("First")), 1)
        ], 2)
      ]),
      p("li", VO, [
        p("a", {
          class: R(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{  translate('Prev')  }}"
        }, [
          p("span", UO, O(r.translate("Prev")), 1)
        ], 2)
      ]),
      (b(!0), y(W, null, z(e.config.pagination.numbers, (o) => (b(), y("li", {
        key: o,
        class: "page-item"
      }, [
        p("a", {
          class: R(["page-link cursor-pointer", {
            disabled: o > e.config.pagination.pages,
            current: o == e.config.pagination.page
          }]),
          onClick: (l) => r.setPage(o)
        }, O(o), 11, FO)
      ]))), 128)),
      p("li", HO, [
        p("a", {
          class: R(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          p("span", WO, [
            p("span", zO, O(r.translate("Next")), 1)
          ])
        ], 2)
      ]),
      e.config.pagination.total ? (b(), y("li", KO, [
        p("a", {
          class: R(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          p("span", GO, O(r.translate("Last")), 1)
        ], 2)
      ])) : A("", !0)
    ])
  ]));
}
const XO = /* @__PURE__ */ ds(OO, [["render", YO], ["__scopeId", "data-v-5ba01873"]]), mu = qb(), ZO = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminForm: NO,
    VuAdminTablePagination: XO
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
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Rs(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (s) => {
      this.settings.form.visible = !1;
    }), this.modalElement.addEventListener("show.bs.modal", (s) => {
      this.settings.form.visible = !0;
    }), this.listenEvent();
  },
  methods: {
    sendEvent(s, t, e) {
      mu.emit(s + "-" + t, {
        from: this.settings.entity,
        payload: e
      });
    },
    listenEvent() {
      mu.on(`EDIT-${this.settings.entity}`, (s) => {
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
      return rl(s, t, this.settings, this);
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
          this.deleteItem(t.item, s.params);
          break;
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
          t.relation = Dr(this.settings.relations[t.relation.entity], t.relation);
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
        Qe("GET", s.table.api, null, t),
        Ze("GET", s.table.api)
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
      let l = Bb(o);
      return this.convertIn(s.table.columns, l), l;
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
        const l = await fetch(
          Qe("GET", o.api, null, e),
          Ze("GET", o.api)
        );
        if (l.status !== 200)
          throw new Error(
            this.translate("Response status: " + l.status)
          );
        const a = await si(l);
        if (ni(l, a.data) || !a.data)
          return;
        if (o.api.input.items ? s.relation.items = typeof o.api.input.items == "string" ? a.data[o.api.input.items] : o.api.input.items(a.data, l) : s.relation.items = a.data, t && t[0])
          for (let c of t)
            c[s.relation.local] && (c[s.relation.entity] = s.relation.items.find(
              (f, g, m) => f[s.relation.foreign] === c[s.relation.local]
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
        this.tableWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(s);
        const i = await fetch(
          Qe(
            "DELETE",
            this.settings.form.api,
            e,
            t
          ),
          Ze("DELETE", this.settings.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        let r = this.items.find((l) => l[this.settings.pkey] === e);
        r >= 0 && this.items.splice(r, 1), this.item && (this.item = {});
        const o = await i.json();
        this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(o, i), this.reloadTable();
      } catch (e) {
        console.error(e.message), this.tableNoWait();
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
          Qe("DELETE", this.settings.table.api),
          Ze("DELETE", this.settings.api, {
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
          for (let f in s)
            this.settings.form.api.output.fields.includes(f) && (i[f] = s[f]);
        else
          Object.assign(i, s);
        let o, l;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Pb(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, s), !this.settings.form.api.output.item)
          o = JSON.stringify(i);
        else if (typeof this.settings.form.api.output.item == "string") {
          let f = {};
          f[this.settings.form.api.output.item] = i, o = JSON.stringify(f);
        } else
          o = JSON.stringify(
            this.settings.form.api.output.item(i, options)
          );
        const a = r ? "PUT" : "POST";
        l = await fetch(
          Qe(a, this.settings.form.api, r, n),
          Ze(a, this.settings.form.api, {
            body: o
          })
        );
        const h = await si(l), c = ni(l, h.data);
        if (c) {
          e && e(c, s, n, l);
          return;
        }
        if (h.error) {
          e && e(h.error, s, n, l);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(h.data, n), t && t(h.data, l);
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
          Qe("PUT", this.settings.table.api),
          Ze("PUT", this.settings.table.api, {
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
}, QO = { key: 0 }, JO = ["data-bs-theme"], tC = { class: "vua-table-title" }, eC = { class: "d-flex align-items-center justify-content-between" }, sC = { class: "d-inline-block" }, nC = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, iC = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, rC = {
  key: 0,
  class: "d-inline-block"
}, oC = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, aC = ["innerHTML"], lC = { class: "dropdown d-inline-block" }, cC = ["innerHTML"], uC = { class: "dropdown-menu text-start" }, hC = { class: "me-2 text-muted" }, dC = ["innerHTML"], fC = ["onClick"], pC = {
  key: 1,
  class: "dropdown d-inline-block"
}, gC = { class: "mx-1" }, mC = { key: 0 }, bC = { class: "dropdown-menu" }, yC = ["onClick"], vC = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, _C = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, EC = { class: "badge text-secondary fw-normal" }, wC = {
  key: 2,
  class: "dropdown d-inline-block"
}, TC = { class: "mx-1" }, AC = { class: "dropdown-menu" }, NC = ["onClick"], OC = { class: "vua-table-header" }, CC = ["width"], SC = ["onClick"], LC = ["innerHTML"], kC = {
  key: 0,
  class: "bi bi-arrow-down"
}, xC = {
  key: 1,
  class: "bi bi-arrow-up"
}, IC = { key: 0 }, RC = ["disabled", "onClick"], $C = {
  key: 0,
  class: "vua-table-filter"
}, DC = ["width"], MC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, qC = { class: "bi bi-check-all" }, BC = { class: "bi bi-x-lg" }, PC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, jC = ["onUpdate:modelValue"], VC = ["disabled", "onClick"], UC = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, FC = ["onUpdate:modelValue", "disabled"], HC = { value: "=" }, WC = { value: ">" }, zC = { value: ">=" }, KC = { value: "<" }, GC = { value: "<=" }, YC = ["onUpdate:modelValue", "disabled"], XC = ["value"], ZC = ["onUpdate:modelValue", "disabled", "min", "max"], QC = ["disabled", "onClick"], JC = { key: 3 }, t2 = {
  key: 0,
  class: "dropdown"
}, e2 = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, s2 = { class: "dropdown-menu" }, n2 = ["onClick"], i2 = {
  key: 0,
  class: "bi bi-check-square"
}, r2 = {
  key: 1,
  class: "bi bi-square"
}, o2 = { key: 0 }, a2 = { key: 1 }, l2 = ["onClick"], c2 = { key: 2 }, u2 = ["onClick"], h2 = { key: 3 }, d2 = ["onClick"], f2 = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, p2 = ["onUpdate:modelValue", "multiple"], g2 = ["value"], m2 = ["disabled", "onClick"], b2 = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, y2 = ["onUpdate:modelValue"], v2 = { value: "=" }, _2 = { value: ">" }, E2 = { value: ">=" }, w2 = { value: "<" }, T2 = { value: "<=" }, A2 = ["onUpdate:modelValue"], N2 = ["value"], O2 = ["type", "onUpdate:modelValue"], C2 = ["disabled", "onClick"], S2 = ["disabled", "onClick"], L2 = { class: "align-middle" }, k2 = ["data-label", "width", "onClick"], x2 = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, I2 = ["innerHTML"], R2 = { key: 1 }, $2 = ["innerHTML"], D2 = ["aria-valuenow", "aria-valuemax"], M2 = { key: 0 }, q2 = {
  key: 4,
  class: "input-group input-group-sm"
}, B2 = ["innerHTML"], P2 = ["type", "onChange", "onUpdate:modelValue"], j2 = ["onChange", "onUpdate:modelValue"], V2 = ["value"], U2 = ["innerHTML"], F2 = { key: 5 }, H2 = ["disabled", "onClick"], W2 = ["innerHTML"], z2 = { key: 2 }, K2 = { key: 0 }, G2 = ["colspan"], Y2 = { class: "row g-3 align-items-center" }, X2 = { class: "col-form-label" }, Z2 = ["type", "onUpdate:modelValue", "onChange"], Q2 = ["onUpdate:modelValue", "onChange"], J2 = ["onUpdate:modelValue", "onChange"], tS = ["value"], eS = ["innerHTML"], sS = {
  key: 0,
  class: "bg-light text-dark"
}, nS = {
  key: 0,
  class: "vua-table-bulk border-info"
}, iS = ["data-label", "width"], rS = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, oS = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, aS = ["type", "disabled", "onChange", "onUpdate:modelValue"], lS = ["disabled", "onChange", "onUpdate:modelValue"], cS = ["value"], uS = ["onClick"], hS = {
  key: 0,
  class: "bi bi-square text-secondary"
}, dS = {
  key: 1,
  class: "bi bi-check-square"
}, fS = { key: 2 }, pS = ["disabled", "onClick"], gS = ["innerHTML"], mS = { key: 2 }, bS = ["id"], yS = { class: "modal-dialog modal-xl" }, vS = { class: "modal-content h-100" };
function _S(s, t, e, n, i, r) {
  const o = Ls("VuAdminTablePagination"), l = Ls("VuAdminForm");
  return e.settings && e.settings.table ? (b(), y("div", QO, [
    p("div", {
      class: R(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      p("div", {
        class: R(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      p("div", tC, [
        p("div", eC, [
          p("div", sC, [
            e.settings.table.title ? (b(), y("h5", nC, O(e.settings.table.title), 1)) : A("", !0),
            G(p("div", iC, t[15] || (t[15] = [
              p("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Os, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (b(), y("div", rC, [
            i.message.table ? (b(), y("small", oC, [
              p("span", {
                class: R(["text-" + i.message.table.priority])
              }, [
                p("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, aC)
              ], 2)
            ])) : A("", !0),
            p("div", lC, [
              p("button", {
                class: R(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, cC),
              p("ul", uC, [
                (b(!0), y(W, null, z(i.messages.table, (a) => (b(), y("li", { key: a }, [
                  p("span", {
                    class: R(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    p("small", hC, O(a.datetime), 1),
                    p("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, dC)
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
        (b(!0), y(W, null, z(e.settings.table.control.buttons, (a) => (b(), y("span", {
          key: a.action
        }, [
          a.action !== "TABLE_COLUMNS" && !a.dropdowns ? (b(), y("button", {
            key: 0,
            type: "button",
            class: R([
              a.class ? a.class : r.getButtonClassByAction(a.action)
            ]),
            onClick: (h) => r.tableAction(a, {
              items: i.items,
              $event: h
            })
          }, [
            p("i", {
              class: R([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            U(" " + O(r.translate(a.title)), 1)
          ], 10, fC)) : A("", !0),
          a.action === "TABLE_COLUMNS" ? (b(), y("div", pC, [
            p("button", {
              type: "button",
              class: R([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              G(p("span", gC, [
                p("i", {
                  class: R([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                U(" " + O(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (b(), y("span", mC, " ( " + O(r.countHiddenColumns()) + " " + O(r.translate("hidden")) + " ) ", 1)) : A("", !0)
              ], 512), [
                [Os, e.settings.table.columns.length > 0]
              ])
            ], 2),
            p("ul", bC, [
              (b(!0), y(W, null, z(e.settings.table.columns, (h) => (b(), y("li", { key: h }, [
                p("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (c) => r.toggleColumn(h)
                }, [
                  h.hidden ? A("", !0) : (b(), y("i", vC)),
                  h.hidden ? (b(), y("i", _C)) : A("", !0),
                  U(" " + O(h.title) + " ", 1),
                  p("small", EC, O(h.name), 1)
                ], 8, yC)
              ]))), 128)),
              t[16] || (t[16] = p("li", null, [
                p("hr", { class: "dropdown-divider" })
              ], -1)),
              p("li", null, [
                p("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (h) => r.toggleColumn(!0))
                }, O(r.translate("Visible all")), 1)
              ]),
              p("li", null, [
                p("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (h) => r.toggleColumn(!1))
                }, O(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : A("", !0),
          a.dropdowns ? (b(), y("div", wC, [
            p("button", {
              type: "button",
              class: R([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              p("span", TC, [
                p("i", {
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
            p("ul", AC, [
              (b(!0), y(W, null, z(a.dropdowns, (h) => (b(), y("li", { key: h }, [
                p("span", {
                  class: R(["dropdown-item cursor-pointer", [h.class]]),
                  onClick: (c) => r.tableAction(h, {
                    items: i.items,
                    $event: c
                  })
                }, [
                  h.icon ? (b(), y("i", {
                    key: 0,
                    class: R([h.icon])
                  }, null, 2)) : A("", !0),
                  U(" " + O(r.translate(h.title)), 1)
                ], 10, NC)
              ]))), 128))
            ])
          ])) : A("", !0)
        ]))), 128))
      ], 2)) : A("", !0),
      e.settings.table ? (b(), y("table", {
        key: 1,
        class: R(["table vua-table mb-0", [e.settings.table.class]])
      }, [
        p("thead", null, [
          p("tr", OC, [
            (b(!0), y(W, null, z(e.settings.table.columns, (a) => (b(), y("th", {
              class: R(["", [a.header ? a.header.class : ""]]),
              style: Xn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              p("span", {
                class: R(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (h) => r.sortTable(a)
              }, [
                p("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, LC),
                i.config.order[a.name] ? (b(), y("span", {
                  key: 0,
                  class: R(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (b(), y("i", kC)) : A("", !0),
                  i.config.order[a.name].dir === "DESC" ? (b(), y("i", xC)) : A("", !0),
                  U(" " + O(i.config.order[a.name].idx + 1), 1)
                ], 2)) : A("", !0)
              ], 10, SC),
              a.header && a.header.buttons ? (b(), y("span", IC, [
                (b(!0), y(W, null, z(a.header.buttons, (h) => (b(), y("button", {
                  key: h.action,
                  type: "button",
                  disabled: h.disabled !== void 0 ? r.getValueOrFunction(h.disabled) : null,
                  class: R([
                    h.class ? h.class : r.getButtonClassByAction(h.action)
                  ]),
                  onClick: (c) => r.tableAction(h, {
                    items: i.items,
                    $event: c
                  })
                }, [
                  p("i", {
                    class: R([
                      h.icon !== void 0 ? r.getValueOrFunction(h.icon, {
                        button: h,
                        column: a,
                        table: this
                      }) : r.getButtonIconClassByAction(h.action)
                    ])
                  }, null, 2),
                  U(" " + O(r.translate(h.title)), 1)
                ], 10, RC))), 128))
              ])) : A("", !0)
            ], 14, CC))), 128))
          ]),
          r.countFilters() ? (b(), y("tr", $C, [
            (b(!0), y(W, null, z(e.settings.table.columns, (a) => (b(), y("th", {
              style: Xn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: R([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (b(), y("div", MC, [
                p("span", {
                  class: R(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (h) => r.toggleSelectedRowInPage())
                }, [
                  G(p("i", qC, null, 512), [
                    [Os, !r.haveSelectedRowInPage()]
                  ]),
                  G(p("i", BC, null, 512), [
                    [Os, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : A("", !0),
              a.filter && a.filter.type == "text" ? (b(), y("div", PC, [
                G(p("input", {
                  type: "text",
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (h) => a.filter.value = h,
                  onKeyup: t[3] || (t[3] = ri((h) => r.reloadTable(), ["enter"]))
                }, null, 42, jC), [
                  [jt, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 0,
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (h) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[17] || (t[17] = [
                  p("i", { class: "bi bi-x" }, null, -1)
                ]), 10, VC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "number" ? (b(), y("div", UC, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (h) => a.filter.operator = h,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (h) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  p("option", HC, O(r.translate("=")), 1),
                  p("option", WC, O(r.translate(">")), 1),
                  p("option", zC, O(r.translate(">=")), 1),
                  p("option", KC, O(r.translate("<")), 1),
                  p("option", GC, O(r.translate("<=")), 1)
                ], 40, FC)), [
                  [ge, a.filter.operator]
                ]) : A("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (h) => a.filter.operator = h,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (h) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (b(!0), y(W, null, z(a.filter.operators, (h) => (b(), y("option", {
                    key: h,
                    value: h.value
                  }, O(h.label), 9, XC))), 128))
                ], 40, YC)), [
                  [ge, a.filter.operator]
                ]) : A("", !0),
                G(p("input", {
                  type: "number",
                  class: R(["form-control", {
                    fixed: a.filter.fixed
                  }]),
                  "onUpdate:modelValue": (h) => a.filter.value = h,
                  disabled: a.filter.fixed,
                  min: a.filter.min,
                  max: a.filter.max,
                  onChange: t[6] || (t[6] = (h) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = ri((h) => r.reloadTable(), ["enter"]))
                }, null, 42, ZC), [
                  [jt, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 2,
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (h) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[18] || (t[18] = [
                  p("i", { class: "bi bi-x" }, null, -1)
                ]), 10, QC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "select" ? (b(), y("div", JC, [
                a.filter.dropdown ? (b(), y("div", t2, [
                  p("button", e2, O(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  p("ul", s2, [
                    p("li", null, [
                      (b(!0), y(W, null, z(a.filter.options, (h) => (b(), y("span", {
                        key: h,
                        class: R(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(h.value) >= 0 : a.filter.value === h.value }]),
                        onClick: (c) => r.dropdownSelectToggleOne(a.filter, h)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(h.value) >= 0 : a.filter.value === h.value) ? (b(), y("i", i2)) : (b(), y("i", r2)),
                        U(" " + O(r.translate(h.label ? h.label : h.value)), 1)
                      ], 10, n2))), 128))
                    ]),
                    a.filter.multiple ? (b(), y("li", o2, t[19] || (t[19] = [
                      p("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : A("", !0),
                    a.filter.multiple ? (b(), y("li", a2, [
                      p("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (h) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, O(r.translate("Select all")), 9, l2)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", c2, [
                      p("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (h) => r.dropdownSelectClear(a.filter.value)
                      }, O(r.translate("Unselect all")), 9, u2)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", h2, [
                      p("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (h) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, O(r.translate("Invert all")), 9, d2)
                    ])) : A("", !0)
                  ])
                ])) : (b(), y("div", f2, [
                  G(p("select", {
                    "onUpdate:modelValue": (h) => a.filter.value = h,
                    onChange: t[8] || (t[8] = (h) => r.reloadTable()),
                    multiple: a.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (b(!0), y(W, null, z(a.filter.options, (h) => (b(), y("option", {
                      key: h,
                      value: h.value
                    }, O(r.translate(h.label ? h.label : h.value)), 9, g2))), 128))
                  ], 40, p2), [
                    [ge, a.filter.value]
                  ]),
                  a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                    key: 0,
                    class: R(["btn btn-outline-secondary", {
                      "opacity-25": a.filter.value == null
                    }]),
                    disabled: a.filter.value == null,
                    onClick: (h) => {
                      a.filter.value = void 0, r.reloadTable();
                    }
                  }, t[20] || (t[20] = [
                    p("i", { class: "bi bi-x" }, null, -1)
                  ]), 10, m2)) : A("", !0)
                ]))
              ])) : A("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (b(), y("div", b2, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (h) => a.filter.operator = h,
                  onChange: t[9] || (t[9] = (h) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  p("option", v2, O(r.translate("=")), 1),
                  p("option", _2, O(r.translate(">")), 1),
                  p("option", E2, O(r.translate(">=")), 1),
                  p("option", w2, O(r.translate("<")), 1),
                  p("option", T2, O(r.translate("<=")), 1)
                ], 40, y2)), [
                  [ge, a.filter.operator]
                ]) : A("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (h) => a.filter.operator = h,
                  onChange: t[10] || (t[10] = (h) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (b(!0), y(W, null, z(a.filter.operators, (h) => (b(), y("option", {
                    key: h,
                    value: h.value
                  }, O(r.translate(h.label)), 9, N2))), 128))
                ], 40, A2)), [
                  [ge, a.filter.operator]
                ]) : A("", !0),
                G(p("input", {
                  type: a.filter.type,
                  class: R([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (h) => a.filter.value = h,
                  onChange: t[11] || (t[11] = (h) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ri((h) => r.reloadTable(), ["enter"]))
                }, null, 42, O2), [
                  [pn, a.filter.value]
                ]),
                p("button", {
                  class: R(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (h) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[21] || (t[21] = [
                  p("i", { class: "bi bi-x" }, null, -1)
                ]), 10, C2)
              ])) : A("", !0),
              a.filter && a.filter.buttons ? (b(), y("span", {
                key: 5,
                class: R(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (b(!0), y(W, null, z(a.filter.buttons, (h) => (b(), y("span", {
                  key: h.action
                }, [
                  p("button", {
                    type: "button",
                    disabled: h.disabled !== void 0 ? r.getValueOrFunction(h.disabled) : null,
                    class: R([
                      h.class ? h.class : r.getButtonClassByAction(h.action)
                    ]),
                    onClick: (c) => r.tableAction(h, {
                      items: i.items,
                      $event: c
                    })
                  }, [
                    p("i", {
                      class: R([
                        h.icon !== void 0 ? r.getValueOrFunction(h.icon, {
                          button: h,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(h.action)
                      ])
                    }, null, 2),
                    U(" " + O(r.translate(h.title)), 1)
                  ], 10, S2)
                ]))), 128))
              ], 2)) : A("", !0)
            ], 14, DC))), 128))
          ])) : A("", !0)
        ]),
        p("tbody", null, [
          (b(!0), y(W, null, z(this.items, (a, h) => (b(), y(W, {
            key: a.id
          }, [
            p("tr", L2, [
              (b(!0), y(W, null, z(e.settings.table.columns, (c) => (b(), y("td", {
                style: Xn([c.hidden ? "display: none" : ""]),
                key: c.name,
                "data-label": c.title ? c.title : r.translate(c.name),
                width: c.width,
                class: R(
                  r.getValueOrFunction(c.class, {
                    column: c,
                    item: a
                  })
                ),
                onClick: (f) => r.tableAction(c, {
                  item: a,
                  index: h,
                  $event: f
                })
              }, [
                c.index ? (b(), y("div", x2, [
                  p("span", {
                    class: R(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: h + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, I2)
                ])) : A("", !0),
                !c.template && !c.input && !c.progressbar ? (b(), y("span", R2, O(r.tableCellValue(c.name, a, h, c)), 1)) : A("", !0),
                c.template ? (b(), y("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(c.template, a, h, c)
                }, null, 8, $2)) : A("", !0),
                c.progressbar ? (b(), y("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": a[c.name],
                  "aria-valuemax": c.progressbar.max
                }, [
                  p("div", {
                    class: R(["progress-bar", [c.progressbar.class]]),
                    style: Xn({ width: Math.round(a[c.name] / c.progressbar.max * 100) + "%" })
                  }, [
                    c.progressbar.value ? (b(), y("span", M2, O(a[c.name]), 1)) : A("", !0)
                  ], 6)
                ], 8, D2)) : A("", !0),
                c.input ? (b(), y("div", q2, [
                  c.input.prefix ? (b(), y("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(c.input.prefix, {
                      column: c,
                      item: a
                    })
                  }, null, 8, B2)) : A("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    c.input.type
                  ) >= 0 ? G((b(), y("input", {
                    key: 1,
                    type: c.input.type,
                    class: R(["form-control form-control-sm", r.getValueOrFunction(c.input.class, {
                      column: c,
                      item: a
                    })]),
                    onChange: (f) => r.onRowInputChange(a[c.name], c, a, h),
                    "onUpdate:modelValue": (f) => a[c.name] = f
                  }, null, 42, P2)), [
                    [pn, a[c.name]]
                  ]) : A("", !0),
                  c.input.type == "select" ? G((b(), y("select", {
                    key: 2,
                    class: R(["form-select form-select-sm pe-0", r.getValueOrFunction(c.input.class, {
                      column: c,
                      item: a
                    })]),
                    onChange: (f) => r.onRowInputChange(a[c.name], c, a, h),
                    "onUpdate:modelValue": (f) => a[c.name] = f
                  }, [
                    (b(!0), y(W, null, z(c.input.options, (f) => (b(), y("option", {
                      value: f.value,
                      key: f
                    }, O(r.translate(f.label)), 9, V2))), 128))
                  ], 42, j2)), [
                    [ge, a[c.name]]
                  ]) : A("", !0),
                  c.input.suffix ? (b(), y("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(c.input.suffix, {
                      column: c,
                      item: a
                    })
                  }, null, 8, U2)) : A("", !0)
                ])) : A("", !0),
                c.buttons ? (b(), y("span", F2, [
                  (b(!0), y(W, null, z(c.buttons, (f) => (b(), y("span", {
                    key: f.action
                  }, [
                    p("button", {
                      type: "button",
                      disabled: f.disabled !== void 0 ? r.getValueOrFunction(f.disabled) : null,
                      class: R([
                        f.class ? r.getValueOrFunction(f.class, {
                          button: f,
                          column: c,
                          item: a,
                          table: this
                        }) : r.getButtonClassByAction(f.action)
                      ]),
                      onClick: (g) => r.tableAction(f, {
                        column: c,
                        item: a,
                        index: h,
                        $event: g
                      })
                    }, [
                      f.icon !== null ? (b(), y("i", {
                        key: 0,
                        class: R([
                          f.icon !== void 0 ? r.getValueOrFunction(f.icon, {
                            button: f,
                            column: c,
                            item: a,
                            table: this
                          }) : r.getButtonIconClassByAction(f.action)
                        ])
                      }, null, 2)) : A("", !0),
                      f.template ? (b(), y("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(f.template, a, h, c)
                      }, null, 8, W2)) : (b(), y("span", z2, O(r.translate(f.title)), 1))
                    ], 10, H2)
                  ]))), 128))
                ])) : A("", !0)
              ], 14, k2))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (b(), y("tr", K2, [
              p("td", {
                class: R([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (b(!0), y(W, null, z(e.settings.table.details.fields, (c) => (b(), y("div", {
                  class: "m-0",
                  key: c
                }, [
                  p("div", Y2, [
                    p("div", {
                      class: R(["col text-end", [c.class]])
                    }, [
                      p("label", X2, O(c.label), 1)
                    ], 2),
                    p("div", {
                      class: R(["col", [c.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(c.input.type) < 0 ? G((b(), y("input", {
                        key: 0,
                        type: c.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (f) => a[c.name] = f,
                        onChange: (f) => r.onRowInputChange(a[c.name], c, a, h)
                      }, null, 40, Z2)), [
                        [pn, a[c.name]]
                      ]) : A("", !0),
                      c.input.type == "textarea" ? G((b(), y("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (f) => a[c.name] = f,
                        onChange: (f) => r.onRowInputChange(a[c.name], c, a, h)
                      }, `\r
                    `, 40, Q2)), [
                        [jt, a[c.name]]
                      ]) : A("", !0),
                      c.input.type == "select" ? G((b(), y("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (f) => a[c.name] = f,
                        onChange: (f) => r.onRowInputChange(a[c.name], c, a, h)
                      }, [
                        (b(!0), y(W, null, z(c.input.options, (f) => (b(), y("option", {
                          value: f.value,
                          key: f
                        }, O(r.translate(f.label)), 9, tS))), 128))
                      ], 40, J2)), [
                        [ge, a[c.name]]
                      ]) : A("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                p("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, eS),
                e.settings.debug ? (b(), y("pre", sS, "                " + O(a) + `
              `, 1)) : A("", !0)
              ], 10, G2)
            ])) : A("", !0)
          ], 64))), 128))
        ]),
        p("tfoot", null, [
          i.selected.length > 0 ? (b(), y("tr", nS, [
            (b(!0), y(W, null, z(e.settings.table.columns, (a) => (b(), y("td", {
              style: Xn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: R(a.class)
            }, [
              a.index ? (b(), y("div", rS, [
                p("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (h) => r.toggleSelectedAll())
                }, O(i.selected.length), 1)
              ])) : A("", !0),
              a.input && a.bulk && a.bulk.enabled ? (b(), y("div", oS, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? G((b(), y("input", {
                  key: 0,
                  type: a.input.type,
                  class: R(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (h) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (h) => i.bulkitem[a.name] = h
                }, null, 42, aS)), [
                  [pn, i.bulkitem[a.name]]
                ]) : A("", !0),
                a.input.type == "select" ? G((b(), y("select", {
                  key: 1,
                  class: R(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (h) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (h) => i.bulkitem[a.name] = h
                }, [
                  (b(!0), y(W, null, z(a.input.options, (h) => (b(), y("option", {
                    value: h.value,
                    key: h
                  }, O(r.translate(h.label)), 9, cS))), 128))
                ], 42, lS)), [
                  [ge, i.bulkitem[a.name]]
                ]) : A("", !0),
                p("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (h) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (b(), y("i", hS)) : (b(), y("i", dS))
                ], 8, uS)
              ])) : A("", !0),
              a.bulk ? (b(), y("span", fS, [
                (b(!0), y(W, null, z(a.bulk.buttons, (h) => (b(), y("span", {
                  key: h.action
                }, [
                  p("button", {
                    type: "button",
                    class: R([
                      h.class ? h.class : r.getButtonClassByAction(h.action)
                    ]),
                    disabled: h.action === "save" && !this.bulkinputs.length,
                    onClick: (c) => r.tableBulkAction(h.action, i.bulkitem, a, c)
                  }, [
                    h.icon !== null ? (b(), y("i", {
                      key: 0,
                      class: R([
                        h.icon !== void 0 ? r.getValueOrFunction(h.icon, {
                          button: h,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(h.action)
                      ])
                    }, null, 2)) : A("", !0),
                    h.template ? (b(), y("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(h.template, i.bulkitem, null, a)
                    }, null, 8, gS)) : (b(), y("span", mS, O(r.translate(h.title)), 1))
                  ], 10, pS)
                ]))), 128))
              ])) : A("", !0)
            ], 14, iS))), 128))
          ])) : A("", !0)
        ])
      ], 2)) : A("", !0),
      bu(o, {
        settings: e.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"]),
      p("div", {
        class: "modal shadow",
        id: i.modalId,
        tabindex: "-1"
      }, [
        p("div", yS, [
          p("div", vS, [
            e.settings.form.visible && e.settings.form.groups ? (b(), oi(l, {
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
      ], 8, bS)
    ], 10, JO)
  ])) : A("", !0);
}
const ES = /* @__PURE__ */ ds(ZO, [["render", _S], ["__scopeId", "data-v-28625378"]]), wS = {
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
      if (this.settings = Dr(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, !this.settings.theme) {
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
    VuAdminTable: ES
  }
}, TS = { key: 0 }, AS = ["data-bs-theme"];
function NS(s, t, e, n, i, r) {
  const o = Ls("vu-admin-table");
  return e.entity && i.settings ? (b(), y("div", TS, [
    p("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      bu(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, AS)
  ])) : A("", !0);
}
const OS = /* @__PURE__ */ ds(wS, [["render", NS]]), $S = {
  install(s) {
    s.component("VuAdmin", OS);
  }
};
export {
  OS as VuAdmin,
  $S as default
};
