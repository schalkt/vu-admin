var Md = Object.defineProperty;
var qd = (s, t, e) => t in s ? Md(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var D = (s, t, e) => qd(s, typeof t != "symbol" ? t + "" : t, e);
import { openBlock as b, createElementBlock as y, createElementVNode as p, normalizeClass as $, Fragment as W, renderList as z, toDisplayString as O, createCommentVNode as A, withDirectives as G, vModelText as ee, withKeys as oi, withModifiers as la, createTextVNode as F, vModelSelect as $e, resolveComponent as Re, createBlock as es, vModelDynamic as Ss, vModelCheckbox as Bd, vShow as Ls, normalizeStyle as Zn, createVNode as bu } from "vue";
var Tt = "top", xt = "bottom", It = "right", At = "left", Or = "auto", xn = [Tt, xt, It, At], $s = "start", _n = "end", yu = "clippingParents", Fa = "viewport", an = "popper", vu = "reference", ca = /* @__PURE__ */ xn.reduce(function(s, t) {
  return s.concat([t + "-" + $s, t + "-" + _n]);
}, []), Ua = /* @__PURE__ */ [].concat(xn, [Or]).reduce(function(s, t) {
  return s.concat([t, t + "-" + $s, t + "-" + _n]);
}, []), _u = "beforeRead", Eu = "read", wu = "afterRead", Tu = "beforeMain", Au = "main", Nu = "afterMain", Ou = "beforeWrite", Cu = "write", Su = "afterWrite", Lu = [_u, Eu, wu, Tu, Au, Nu, Ou, Cu, Su];
function _e(s) {
  return s ? (s.nodeName || "").toLowerCase() : null;
}
function $t(s) {
  if (s == null)
    return window;
  if (s.toString() !== "[object Window]") {
    var t = s.ownerDocument;
    return t && t.defaultView || window;
  }
  return s;
}
function Rs(s) {
  var t = $t(s).Element;
  return s instanceof t || s instanceof Element;
}
function Ht(s) {
  var t = $t(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
}
function Ha(s) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = $t(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
}
function Pd(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !Ht(r) || !_e(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? r.removeAttribute(o) : r.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function jd(s) {
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
      !Ht(i) || !_e(i) || (Object.assign(i.style, l), Object.keys(r).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const Wa = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Pd,
  effect: jd,
  requires: ["computeStyles"]
};
function me(s) {
  return s.split("-")[0];
}
var Is = Math.max, gr = Math.min, En = Math.round;
function ua() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ku() {
  return !/^((?!chrome|android).)*safari/i.test(ua());
}
function wn(s, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = s.getBoundingClientRect(), i = 1, r = 1;
  t && Ht(s) && (i = s.offsetWidth > 0 && En(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && En(n.height) / s.offsetHeight || 1);
  var o = Rs(s) ? $t(s) : window, l = o.visualViewport, a = !ku() && e, u = (n.left + (a && l ? l.offsetLeft : 0)) / i, h = (n.top + (a && l ? l.offsetTop : 0)) / r, d = n.width / i, g = n.height / r;
  return {
    width: d,
    height: g,
    top: h,
    right: u + d,
    bottom: h + g,
    left: u,
    x: u,
    y: h
  };
}
function za(s) {
  var t = wn(s), e = s.offsetWidth, n = s.offsetHeight;
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
  if (e && Ha(e)) {
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
  return $t(s).getComputedStyle(s);
}
function Vd(s) {
  return ["table", "td", "th"].indexOf(_e(s)) >= 0;
}
function us(s) {
  return ((Rs(s) ? s.ownerDocument : (
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
    (Ha(s) ? s.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    us(s)
  );
}
function $l(s) {
  return !Ht(s) || // https://github.com/popperjs/popper-core/issues/837
  qe(s).position === "fixed" ? null : s.offsetParent;
}
function Fd(s) {
  var t = /firefox/i.test(ua()), e = /Trident/i.test(ua());
  if (e && Ht(s)) {
    var n = qe(s);
    if (n.position === "fixed")
      return null;
  }
  var i = Cr(s);
  for (Ha(i) && (i = i.host); Ht(i) && ["html", "body"].indexOf(_e(i)) < 0; ) {
    var r = qe(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function wi(s) {
  for (var t = $t(s), e = $l(s); e && Vd(e) && qe(e).position === "static"; )
    e = $l(e);
  return e && (_e(e) === "html" || _e(e) === "body" && qe(e).position === "static") ? t : e || Fd(s) || t;
}
function Ka(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
}
function ai(s, t, e) {
  return Is(s, gr(t, e));
}
function Ud(s, t, e) {
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
function $u(s) {
  return Object.assign({}, Iu(), s);
}
function Ru(s, t) {
  return t.reduce(function(e, n) {
    return e[n] = s, e;
  }, {});
}
var Hd = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, $u(typeof t != "number" ? t : Ru(t, xn));
};
function Wd(s) {
  var t, e = s.state, n = s.name, i = s.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, l = me(e.placement), a = Ka(l), u = [At, It].indexOf(l) >= 0, h = u ? "height" : "width";
  if (!(!r || !o)) {
    var d = Hd(i.padding, e), g = za(r), m = a === "y" ? Tt : At, _ = a === "y" ? xt : It, E = e.rects.reference[h] + e.rects.reference[a] - o[a] - e.rects.popper[h], w = o[a] - e.rects.reference[a], T = wi(r), C = T ? a === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, L = E / 2 - w / 2, k = d[m], I = C - g[h] - d[_], R = C / 2 - g[h] / 2 + L, P = ai(k, R, I), U = a;
    e.modifiersData[n] = (t = {}, t[U] = P, t.centerOffset = P - R, t);
  }
}
function zd(s) {
  var t = s.state, e = s.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || xu(t.elements.popper, i) && (t.elements.arrow = i));
}
const Du = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Wd,
  effect: zd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Tn(s) {
  return s.split("-")[1];
}
var Kd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Gd(s, t) {
  var e = s.x, n = s.y, i = t.devicePixelRatio || 1;
  return {
    x: En(e * i) / i || 0,
    y: En(n * i) / i || 0
  };
}
function Rl(s) {
  var t, e = s.popper, n = s.popperRect, i = s.placement, r = s.variation, o = s.offsets, l = s.position, a = s.gpuAcceleration, u = s.adaptive, h = s.roundOffsets, d = s.isFixed, g = o.x, m = g === void 0 ? 0 : g, _ = o.y, E = _ === void 0 ? 0 : _, w = typeof h == "function" ? h({
    x: m,
    y: E
  }) : {
    x: m,
    y: E
  };
  m = w.x, E = w.y;
  var T = o.hasOwnProperty("x"), C = o.hasOwnProperty("y"), L = At, k = Tt, I = window;
  if (u) {
    var R = wi(e), P = "clientHeight", U = "clientWidth";
    if (R === $t(e) && (R = us(e), qe(R).position !== "static" && l === "absolute" && (P = "scrollHeight", U = "scrollWidth")), R = R, i === Tt || (i === At || i === It) && r === _n) {
      k = xt;
      var J = d && R === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        R[P]
      );
      E -= J - n.height, E *= a ? 1 : -1;
    }
    if (i === At || (i === Tt || i === xt) && r === _n) {
      L = It;
      var tt = d && R === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        R[U]
      );
      m -= tt - n.width, m *= a ? 1 : -1;
    }
  }
  var nt = Object.assign({
    position: l
  }, u && Kd), ot = h === !0 ? Gd({
    x: m,
    y: E
  }, $t(e)) : {
    x: m,
    y: E
  };
  if (m = ot.x, E = ot.y, a) {
    var it;
    return Object.assign({}, nt, (it = {}, it[k] = C ? "0" : "", it[L] = T ? "0" : "", it.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + E + "px)" : "translate3d(" + m + "px, " + E + "px, 0)", it));
  }
  return Object.assign({}, nt, (t = {}, t[k] = C ? E + "px" : "", t[L] = T ? m + "px" : "", t.transform = "", t));
}
function Yd(s) {
  var t = s.state, e = s.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, l = e.roundOffsets, a = l === void 0 ? !0 : l, u = {
    placement: me(t.placement),
    variation: Tn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Rl(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Rl(Object.assign({}, u, {
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
  fn: Yd,
  data: {}
};
var Xi = {
  passive: !0
};
function Xd(s) {
  var t = s.state, e = s.instance, n = s.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, l = o === void 0 ? !0 : o, a = $t(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && u.forEach(function(h) {
    h.addEventListener("scroll", e.update, Xi);
  }), l && a.addEventListener("resize", e.update, Xi), function() {
    r && u.forEach(function(h) {
      h.removeEventListener("scroll", e.update, Xi);
    }), l && a.removeEventListener("resize", e.update, Xi);
  };
}
const Ya = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Xd,
  data: {}
};
var Zd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function cr(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return Zd[t];
  });
}
var Qd = {
  start: "end",
  end: "start"
};
function Dl(s) {
  return s.replace(/start|end/g, function(t) {
    return Qd[t];
  });
}
function Xa(s) {
  var t = $t(s), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Za(s) {
  return wn(us(s)).left + Xa(s).scrollLeft;
}
function Jd(s, t) {
  var e = $t(s), n = us(s), i = e.visualViewport, r = n.clientWidth, o = n.clientHeight, l = 0, a = 0;
  if (i) {
    r = i.width, o = i.height;
    var u = ku();
    (u || !u && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: l + Za(s),
    y: a
  };
}
function tf(s) {
  var t, e = us(s), n = Xa(s), i = (t = s.ownerDocument) == null ? void 0 : t.body, r = Is(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Is(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Za(s), a = -n.scrollTop;
  return qe(i || e).direction === "rtl" && (l += Is(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: l,
    y: a
  };
}
function Qa(s) {
  var t = qe(s), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Mu(s) {
  return ["html", "body", "#document"].indexOf(_e(s)) >= 0 ? s.ownerDocument.body : Ht(s) && Qa(s) ? s : Mu(Cr(s));
}
function li(s, t) {
  var e;
  t === void 0 && (t = []);
  var n = Mu(s), i = n === ((e = s.ownerDocument) == null ? void 0 : e.body), r = $t(n), o = i ? [r].concat(r.visualViewport || [], Qa(n) ? n : []) : n, l = t.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(li(Cr(o)))
  );
}
function ha(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
}
function ef(s, t) {
  var e = wn(s, !1, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Ml(s, t, e) {
  return t === Fa ? ha(Jd(s, e)) : Rs(t) ? ef(t, e) : ha(tf(us(s)));
}
function sf(s) {
  var t = li(Cr(s)), e = ["absolute", "fixed"].indexOf(qe(s).position) >= 0, n = e && Ht(s) ? wi(s) : s;
  return Rs(n) ? t.filter(function(i) {
    return Rs(i) && xu(i, n) && _e(i) !== "body";
  }) : [];
}
function nf(s, t, e, n) {
  var i = t === "clippingParents" ? sf(s) : [].concat(t), r = [].concat(i, [e]), o = r[0], l = r.reduce(function(a, u) {
    var h = Ml(s, u, n);
    return a.top = Is(h.top, a.top), a.right = gr(h.right, a.right), a.bottom = gr(h.bottom, a.bottom), a.left = Is(h.left, a.left), a;
  }, Ml(s, o, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function qu(s) {
  var t = s.reference, e = s.element, n = s.placement, i = n ? me(n) : null, r = n ? Tn(n) : null, o = t.x + t.width / 2 - e.width / 2, l = t.y + t.height / 2 - e.height / 2, a;
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
  var u = i ? Ka(i) : null;
  if (u != null) {
    var h = u === "y" ? "height" : "width";
    switch (r) {
      case $s:
        a[u] = a[u] - (t[h] / 2 - e[h] / 2);
        break;
      case _n:
        a[u] = a[u] + (t[h] / 2 - e[h] / 2);
        break;
    }
  }
  return a;
}
function An(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? s.placement : n, r = e.strategy, o = r === void 0 ? s.strategy : r, l = e.boundary, a = l === void 0 ? yu : l, u = e.rootBoundary, h = u === void 0 ? Fa : u, d = e.elementContext, g = d === void 0 ? an : d, m = e.altBoundary, _ = m === void 0 ? !1 : m, E = e.padding, w = E === void 0 ? 0 : E, T = $u(typeof w != "number" ? w : Ru(w, xn)), C = g === an ? vu : an, L = s.rects.popper, k = s.elements[_ ? C : g], I = nf(Rs(k) ? k : k.contextElement || us(s.elements.popper), a, h, o), R = wn(s.elements.reference), P = qu({
    reference: R,
    element: L,
    strategy: "absolute",
    placement: i
  }), U = ha(Object.assign({}, L, P)), J = g === an ? U : R, tt = {
    top: I.top - J.top + T.top,
    bottom: J.bottom - I.bottom + T.bottom,
    left: I.left - J.left + T.left,
    right: J.right - I.right + T.right
  }, nt = s.modifiersData.offset;
  if (g === an && nt) {
    var ot = nt[i];
    Object.keys(tt).forEach(function(it) {
      var Dt = [It, xt].indexOf(it) >= 0 ? 1 : -1, Mt = [Tt, xt].indexOf(it) >= 0 ? "y" : "x";
      tt[it] += ot[Mt] * Dt;
    });
  }
  return tt;
}
function rf(s, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, l = e.flipVariations, a = e.allowedAutoPlacements, u = a === void 0 ? Ua : a, h = Tn(n), d = h ? l ? ca : ca.filter(function(_) {
    return Tn(_) === h;
  }) : xn, g = d.filter(function(_) {
    return u.indexOf(_) >= 0;
  });
  g.length === 0 && (g = d);
  var m = g.reduce(function(_, E) {
    return _[E] = An(s, {
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
function of(s) {
  if (me(s) === Or)
    return [];
  var t = cr(s);
  return [Dl(s), t, Dl(t)];
}
function af(s) {
  var t = s.state, e = s.options, n = s.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, l = o === void 0 ? !0 : o, a = e.fallbackPlacements, u = e.padding, h = e.boundary, d = e.rootBoundary, g = e.altBoundary, m = e.flipVariations, _ = m === void 0 ? !0 : m, E = e.allowedAutoPlacements, w = t.options.placement, T = me(w), C = T === w, L = a || (C || !_ ? [cr(w)] : of(w)), k = [w].concat(L).reduce(function(Yt, K) {
      return Yt.concat(me(K) === Or ? rf(t, {
        placement: K,
        boundary: h,
        rootBoundary: d,
        padding: u,
        flipVariations: _,
        allowedAutoPlacements: E
      }) : K);
    }, []), I = t.rects.reference, R = t.rects.popper, P = /* @__PURE__ */ new Map(), U = !0, J = k[0], tt = 0; tt < k.length; tt++) {
      var nt = k[tt], ot = me(nt), it = Tn(nt) === $s, Dt = [Tt, xt].indexOf(ot) >= 0, Mt = Dt ? "width" : "height", ut = An(t, {
        placement: nt,
        boundary: h,
        rootBoundary: d,
        altBoundary: g,
        padding: u
      }), _t = Dt ? it ? It : At : it ? xt : Tt;
      I[Mt] > R[Mt] && (_t = cr(_t));
      var We = cr(_t), Gt = [];
      if (r && Gt.push(ut[ot] <= 0), l && Gt.push(ut[_t] <= 0, ut[We] <= 0), Gt.every(function(Yt) {
        return Yt;
      })) {
        J = nt, U = !1;
        break;
      }
      P.set(nt, Gt);
    }
    if (U)
      for (var Y = _ ? 3 : 1, gs = function(K) {
        var ce = k.find(function(ze) {
          var at = P.get(ze);
          if (at)
            return at.slice(0, K).every(function(Ke) {
              return Ke;
            });
        });
        if (ce)
          return J = ce, "break";
      }, Ae = Y; Ae > 0; Ae--) {
        var pt = gs(Ae);
        if (pt === "break") break;
      }
    t.placement !== J && (t.modifiersData[n]._skip = !0, t.placement = J, t.reset = !0);
  }
}
const Bu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: af,
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
function lf(s) {
  var t = s.state, e = s.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = An(t, {
    elementContext: "reference"
  }), l = An(t, {
    altBoundary: !0
  }), a = ql(o, n), u = ql(l, i, r), h = Bl(a), d = Bl(u);
  t.modifiersData[e] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
    isReferenceHidden: h,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": d
  });
}
const Pu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lf
};
function cf(s, t, e) {
  var n = me(s), i = [At, Tt].indexOf(n) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
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
function uf(s) {
  var t = s.state, e = s.options, n = s.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Ua.reduce(function(h, d) {
    return h[d] = cf(d, t.rects, r), h;
  }, {}), l = o[t.placement], a = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = o;
}
const ju = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: uf
};
function hf(s) {
  var t = s.state, e = s.name;
  t.modifiersData[e] = qu({
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
  fn: hf,
  data: {}
};
function df(s) {
  return s === "x" ? "y" : "x";
}
function ff(s) {
  var t = s.state, e = s.options, n = s.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, l = o === void 0 ? !1 : o, a = e.boundary, u = e.rootBoundary, h = e.altBoundary, d = e.padding, g = e.tether, m = g === void 0 ? !0 : g, _ = e.tetherOffset, E = _ === void 0 ? 0 : _, w = An(t, {
    boundary: a,
    rootBoundary: u,
    padding: d,
    altBoundary: h
  }), T = me(t.placement), C = Tn(t.placement), L = !C, k = Ka(T), I = df(k), R = t.modifiersData.popperOffsets, P = t.rects.reference, U = t.rects.popper, J = typeof E == "function" ? E(Object.assign({}, t.rects, {
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
      var it, Dt = k === "y" ? Tt : At, Mt = k === "y" ? xt : It, ut = k === "y" ? "height" : "width", _t = R[k], We = _t + w[Dt], Gt = _t - w[Mt], Y = m ? -U[ut] / 2 : 0, gs = C === $s ? P[ut] : U[ut], Ae = C === $s ? -U[ut] : -P[ut], pt = t.elements.arrow, Yt = m && pt ? za(pt) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Iu(), ce = K[Dt], ze = K[Mt], at = ai(0, P[ut], Yt[ut]), Ke = L ? P[ut] / 2 - Y - at - ce - tt.mainAxis : gs - at - ce - tt.mainAxis, Ks = L ? -P[ut] / 2 + Y + at + ze + tt.mainAxis : Ae + at + ze + tt.mainAxis, Ne = t.elements.arrow && wi(t.elements.arrow), ms = Ne ? k === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0 : 0, bs = (it = nt == null ? void 0 : nt[k]) != null ? it : 0, ys = _t + Ke - bs - ms, Gs = _t + Ks - bs, Ge = ai(m ? gr(We, ys) : We, _t, m ? Is(Gt, Gs) : Gt);
      R[k] = Ge, ot[k] = Ge - _t;
    }
    if (l) {
      var vs, Dn = k === "x" ? Tt : At, Mn = k === "x" ? xt : It, Nt = R[I], ue = I === "y" ? "height" : "width", _s = Nt + w[Dn], Es = Nt - w[Mn], Ot = [Tt, At].indexOf(T) !== -1, Oe = (vs = nt == null ? void 0 : nt[I]) != null ? vs : 0, Ys = Ot ? _s : Nt - P[ue] - U[ue] - Oe + tt.altAxis, he = Ot ? Nt + P[ue] + U[ue] - Oe - tt.altAxis : Es, Ce = m && Ot ? Ud(Ys, Nt, he) : ai(m ? Ys : _s, Nt, m ? he : Es);
      R[I] = Ce, ot[I] = Ce - Nt;
    }
    t.modifiersData[n] = ot;
  }
}
const Vu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ff,
  requiresIfExists: ["offset"]
};
function pf(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
}
function gf(s) {
  return s === $t(s) || !Ht(s) ? Xa(s) : pf(s);
}
function mf(s) {
  var t = s.getBoundingClientRect(), e = En(t.width) / s.offsetWidth || 1, n = En(t.height) / s.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function bf(s, t, e) {
  e === void 0 && (e = !1);
  var n = Ht(t), i = Ht(t) && mf(t), r = us(t), o = wn(s, i, e), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((_e(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Qa(r)) && (l = gf(t)), Ht(t) ? (a = wn(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : r && (a.x = Za(r))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function yf(s) {
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
function vf(s) {
  var t = yf(s);
  return Lu.reduce(function(e, n) {
    return e.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function _f(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(s());
      });
    })), t;
  };
}
function Ef(s) {
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
  return function(l, a, u) {
    u === void 0 && (u = r);
    var h = {
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
    }, d = [], g = !1, m = {
      state: h,
      setOptions: function(T) {
        var C = typeof T == "function" ? T(h.options) : T;
        E(), h.options = Object.assign({}, r, h.options, C), h.scrollParents = {
          reference: Rs(l) ? li(l) : l.contextElement ? li(l.contextElement) : [],
          popper: li(a)
        };
        var L = vf(Ef([].concat(n, h.options.modifiers)));
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
          if (jl(C, L)) {
            h.rects = {
              reference: bf(C, wi(L), h.options.strategy === "fixed"),
              popper: za(L)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(tt) {
              return h.modifiersData[tt.name] = Object.assign({}, tt.data);
            });
            for (var k = 0; k < h.orderedModifiers.length; k++) {
              if (h.reset === !0) {
                h.reset = !1, k = -1;
                continue;
              }
              var I = h.orderedModifiers[k], R = I.fn, P = I.options, U = P === void 0 ? {} : P, J = I.name;
              typeof R == "function" && (h = R({
                state: h,
                options: U,
                name: J,
                instance: m
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: _f(function() {
        return new Promise(function(w) {
          m.forceUpdate(), w(h);
        });
      }),
      destroy: function() {
        E(), g = !0;
      }
    };
    if (!jl(l, a))
      return m;
    m.setOptions(u).then(function(w) {
      !g && u.onFirstUpdate && u.onFirstUpdate(w);
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
          }), R = function() {
          };
          d.push(I || R);
        }
      });
    }
    function E() {
      d.forEach(function(w) {
        return w();
      }), d = [];
    }
    return m;
  };
}
var wf = /* @__PURE__ */ Sr(), Tf = [Ya, Ja, Ga, Wa], Af = /* @__PURE__ */ Sr({
  defaultModifiers: Tf
}), Nf = [Ya, Ja, Ga, Wa, ju, Bu, Vu, Du, Pu], tl = /* @__PURE__ */ Sr({
  defaultModifiers: Nf
});
const Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Nu,
  afterRead: wu,
  afterWrite: Su,
  applyStyles: Wa,
  arrow: Du,
  auto: Or,
  basePlacements: xn,
  beforeMain: Tu,
  beforeRead: _u,
  beforeWrite: Ou,
  bottom: xt,
  clippingParents: yu,
  computeStyles: Ga,
  createPopper: tl,
  createPopperBase: wf,
  createPopperLite: Af,
  detectOverflow: An,
  end: _n,
  eventListeners: Ya,
  flip: Bu,
  hide: Pu,
  left: At,
  main: Au,
  modifierPhases: Lu,
  offset: ju,
  placements: Ua,
  popper: an,
  popperGenerator: Sr,
  popperOffsets: Ja,
  preventOverflow: Vu,
  read: Eu,
  reference: vu,
  right: It,
  start: $s,
  top: Tt,
  variationPlacements: ca,
  viewport: Fa,
  write: Cu
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Ze = /* @__PURE__ */ new Map(), Ro = {
  set(s, t, e) {
    Ze.has(s) || Ze.set(s, /* @__PURE__ */ new Map());
    const n = Ze.get(s);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, e);
  },
  get(s, t) {
    return Ze.has(s) && Ze.get(s).get(t) || null;
  },
  remove(s, t) {
    if (!Ze.has(s))
      return;
    const e = Ze.get(s);
    e.delete(t), e.size === 0 && Ze.delete(s);
  }
}, Of = 1e6, Cf = 1e3, da = "transitionend", Uu = (s) => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s), Sf = (s) => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(), Lf = (s) => {
  do
    s += Math.floor(Math.random() * Of);
  while (document.getElementById(s));
  return s;
}, kf = (s) => {
  if (!s)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: e
  } = window.getComputedStyle(s);
  const n = Number.parseFloat(t), i = Number.parseFloat(e);
  return !n && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * Cf);
}, Hu = (s) => {
  s.dispatchEvent(new Event(da));
}, De = (s) => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"), os = (s) => De(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(Uu(s)) : null, In = (s) => {
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
}, as = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false", Wu = (s) => {
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
}, zu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Do = [], xf = (s) => {
  document.readyState === "loading" ? (Do.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Do)
      t();
  }), Do.push(s)) : s();
}, Wt = () => document.documentElement.dir === "rtl", Kt = (s) => {
  xf(() => {
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
  const i = kf(t) + 5;
  let r = !1;
  const o = ({
    target: l
  }) => {
    l === t && (r = !0, t.removeEventListener(da, o), Lt(s));
  };
  t.addEventListener(da, o), setTimeout(() => {
    r || Hu(t);
  }, i);
}, el = (s, t, e, n) => {
  const i = s.length;
  let r = s.indexOf(t);
  return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))]);
}, If = /[^.]*(?=\..*)\.|.*/, $f = /\..*/, Rf = /::\d+$/, Mo = {};
let Vl = 1;
const Gu = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Df = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Yu(s, t) {
  return t && `${t}::${Vl++}` || s.uidEvent || Vl++;
}
function Xu(s) {
  const t = Yu(s);
  return s.uidEvent = t, Mo[t] = Mo[t] || {}, Mo[t];
}
function Mf(s, t) {
  return function e(n) {
    return sl(n, {
      delegateTarget: s
    }), e.oneOff && x.off(s, n.type, t), t.apply(s, [n]);
  };
}
function qf(s, t, e) {
  return function n(i) {
    const r = s.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const l of r)
        if (l === o)
          return sl(i, {
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
  return Df.has(r) || (r = s), [n, i, r];
}
function Fl(s, t, e, n, i) {
  if (typeof t != "string" || !s)
    return;
  let [r, o, l] = Qu(t, e, n);
  t in Gu && (o = ((_) => function(E) {
    if (!E.relatedTarget || E.relatedTarget !== E.delegateTarget && !E.delegateTarget.contains(E.relatedTarget))
      return _.call(this, E);
  })(o));
  const a = Xu(s), u = a[l] || (a[l] = {}), h = Zu(u, o, r ? e : null);
  if (h) {
    h.oneOff = h.oneOff && i;
    return;
  }
  const d = Yu(o, t.replace(If, "")), g = r ? qf(s, e, o) : Mf(s, o);
  g.delegationSelector = r ? e : null, g.callable = o, g.oneOff = i, g.uidEvent = d, u[d] = g, s.addEventListener(l, g, r);
}
function fa(s, t, e, n, i) {
  const r = Zu(t[e], n, i);
  r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function Bf(s, t, e, n) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && fa(s, t, e, o.callable, o.delegationSelector);
}
function Ju(s) {
  return s = s.replace($f, ""), Gu[s] || s;
}
const x = {
  on(s, t, e, n) {
    Fl(s, t, e, n, !1);
  },
  one(s, t, e, n) {
    Fl(s, t, e, n, !0);
  },
  off(s, t, e, n) {
    if (typeof t != "string" || !s)
      return;
    const [i, r, o] = Qu(t, e, n), l = o !== t, a = Xu(s), u = a[o] || {}, h = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(u).length)
        return;
      fa(s, a, o, r, i ? e : null);
      return;
    }
    if (h)
      for (const d of Object.keys(a))
        Bf(s, a, d, t.slice(1));
    for (const [d, g] of Object.entries(u)) {
      const m = d.replace(Rf, "");
      (!l || t.includes(m)) && fa(s, a, o, g.callable, g.delegationSelector);
    }
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const n = zu(), i = Ju(t), r = t !== i;
    let o = null, l = !0, a = !0, u = !1;
    r && n && (o = n.Event(t, e), n(s).trigger(o), l = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), u = o.isDefaultPrevented());
    const h = sl(new Event(t, {
      bubbles: l,
      cancelable: !0
    }), e);
    return u && h.preventDefault(), a && s.dispatchEvent(h), h.defaultPrevented && o && o.preventDefault(), h;
  }
};
function sl(s, t = {}) {
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
function qo(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Me = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-bs-${qo(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-bs-${qo(t)}`);
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
    return Ul(s.getAttribute(`data-bs-${qo(t)}`));
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
      const r = t[n], o = De(r) ? "element" : Sf(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const Pf = "5.3.3";
class re extends Ai {
  constructor(t, e) {
    super(), t = os(t), t && (this._element = t, this._config = this._getConfig(e), Ro.set(this._element, this.constructor.DATA_KEY, this));
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
    return Ro.get(os(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return Pf;
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
const Bo = (s) => {
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
    return this.find(t, s).filter((e) => !as(e) && In(e));
  },
  getSelectorFromElement(s) {
    const t = Bo(s);
    return t && V.findOne(t) ? t : null;
  },
  getElementFromSelector(s) {
    const t = Bo(s);
    return t ? V.findOne(t) : null;
  },
  getMultipleElementsFromSelector(s) {
    const t = Bo(s);
    return t ? V.find(t) : [];
  }
}, Lr = (s, t = "hide") => {
  const e = `click.dismiss${s.EVENT_KEY}`, n = s.NAME;
  x.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), as(this))
      return;
    const r = V.getElementFromSelector(this) || this.closest(`.${n}`);
    s.getOrCreateInstance(r)[t]();
  });
}, jf = "alert", Vf = "bs.alert", th = `.${Vf}`, Ff = `close${th}`, Uf = `closed${th}`, Hf = "fade", Wf = "show";
class kr extends re {
  // Getters
  static get NAME() {
    return jf;
  }
  // Public
  close() {
    if (x.trigger(this._element, Ff).defaultPrevented)
      return;
    this._element.classList.remove(Wf);
    const e = this._element.classList.contains(Hf);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  // Private
  _destroyElement() {
    this._element.remove(), x.trigger(this._element, Uf), this.dispose();
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
Kt(kr);
const zf = "button", Kf = "bs.button", Gf = `.${Kf}`, Yf = ".data-api", Xf = "active", Hl = '[data-bs-toggle="button"]', Zf = `click${Gf}${Yf}`;
class xr extends re {
  // Getters
  static get NAME() {
    return zf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Xf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = xr.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
x.on(document, Zf, Hl, (s) => {
  s.preventDefault();
  const t = s.target.closest(Hl);
  xr.getOrCreateInstance(t).toggle();
});
Kt(xr);
const Qf = "swipe", $n = ".bs.swipe", Jf = `touchstart${$n}`, tp = `touchmove${$n}`, ep = `touchend${$n}`, sp = `pointerdown${$n}`, np = `pointerup${$n}`, ip = "touch", rp = "pen", op = "pointer-event", ap = 40, lp = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, cp = {
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
    return lp;
  }
  static get DefaultType() {
    return cp;
  }
  static get NAME() {
    return Qf;
  }
  // Public
  dispose() {
    x.off(this._element, $n);
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
    if (t <= ap)
      return;
    const e = t / this._deltaX;
    this._deltaX = 0, e && Lt(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (x.on(this._element, sp, (t) => this._start(t)), x.on(this._element, np, (t) => this._end(t)), this._element.classList.add(op)) : (x.on(this._element, Jf, (t) => this._start(t)), x.on(this._element, tp, (t) => this._move(t)), x.on(this._element, ep, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === rp || t.pointerType === ip);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const up = "carousel", hp = "bs.carousel", hs = `.${hp}`, eh = ".data-api", dp = "ArrowLeft", fp = "ArrowRight", pp = 500, Qn = "next", rn = "prev", ln = "left", ur = "right", gp = `slide${hs}`, Po = `slid${hs}`, mp = `keydown${hs}`, bp = `mouseenter${hs}`, yp = `mouseleave${hs}`, vp = `dragstart${hs}`, _p = `load${hs}${eh}`, Ep = `click${hs}${eh}`, sh = "carousel", Zi = "active", wp = "slide", Tp = "carousel-item-end", Ap = "carousel-item-start", Np = "carousel-item-next", Op = "carousel-item-prev", nh = ".active", ih = ".carousel-item", Cp = nh + ih, Sp = ".carousel-item img", Lp = ".carousel-indicators", kp = "[data-bs-slide], [data-bs-slide-to]", xp = '[data-bs-ride="carousel"]', Ip = {
  [dp]: ur,
  [fp]: ln
}, $p = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, Rp = {
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
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = V.findOne(Lp, this._element), this._addEventListeners(), this._config.ride === sh && this.cycle();
  }
  // Getters
  static get Default() {
    return $p;
  }
  static get DefaultType() {
    return Rp;
  }
  static get NAME() {
    return up;
  }
  // Public
  next() {
    this._slide(Qn);
  }
  nextWhenVisible() {
    !document.hidden && In(this._element) && this.next();
  }
  prev() {
    this._slide(rn);
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
        x.one(this._element, Po, () => this.cycle());
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
      x.one(this._element, Po, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Qn : rn;
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
    this._config.keyboard && x.on(this._element, mp, (t) => this._keydown(t)), this._config.pause === "hover" && (x.on(this._element, bp, () => this.pause()), x.on(this._element, yp, () => this._maybeEnableCycle())), this._config.touch && br.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of V.find(Sp, this._element))
      x.on(n, vp, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(ln)),
      rightCallback: () => this._slide(this._directionToOrder(ur)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), pp + this._config.interval));
      }
    };
    this._swipeHelper = new br(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = Ip[t.key];
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
    const n = this._getActive(), i = t === Qn, r = e || el(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), l = (m) => x.trigger(this._element, m, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (l(gp).defaultPrevented || !n || !r)
      return;
    const u = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const h = i ? Ap : Tp, d = i ? Np : Op;
    r.classList.add(d), Ti(r), n.classList.add(h), r.classList.add(h);
    const g = () => {
      r.classList.remove(h, d), r.classList.add(Zi), n.classList.remove(Zi, d, h), this._isSliding = !1, l(Po);
    };
    this._queueCallback(g, n, this._isAnimated()), u && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(wp);
  }
  _getActive() {
    return V.findOne(Cp, this._element);
  }
  _getItems() {
    return V.find(ih, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Wt() ? t === ln ? rn : Qn : t === ln ? Qn : rn;
  }
  _orderToDirection(t) {
    return Wt() ? t === rn ? ln : ur : t === rn ? ur : ln;
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
x.on(document, Ep, kp, function(s) {
  const t = V.getElementFromSelector(this);
  if (!t || !t.classList.contains(sh))
    return;
  s.preventDefault();
  const e = Ni.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
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
x.on(window, _p, () => {
  const s = V.find(xp);
  for (const t of s)
    Ni.getOrCreateInstance(t);
});
Kt(Ni);
const Dp = "collapse", Mp = "bs.collapse", Oi = `.${Mp}`, qp = ".data-api", Bp = `show${Oi}`, Pp = `shown${Oi}`, jp = `hide${Oi}`, Vp = `hidden${Oi}`, Fp = `click${Oi}${qp}`, jo = "show", mn = "collapse", Qi = "collapsing", Up = "collapsed", Hp = `:scope .${mn} .${mn}`, Wp = "collapse-horizontal", zp = "width", Kp = "height", Gp = ".collapse.show, .collapse.collapsing", pa = '[data-bs-toggle="collapse"]', Yp = {
  parent: null,
  toggle: !0
}, Xp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class fi extends re {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const n = V.find(pa);
    for (const i of n) {
      const r = V.getSelectorFromElement(i), o = V.find(r).filter((l) => l === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Yp;
  }
  static get DefaultType() {
    return Xp;
  }
  static get NAME() {
    return Dp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(Gp).filter((l) => l !== this._element).map((l) => fi.getOrCreateInstance(l, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || x.trigger(this._element, Bp).defaultPrevented)
      return;
    for (const l of t)
      l.hide();
    const n = this._getDimension();
    this._element.classList.remove(mn), this._element.classList.add(Qi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Qi), this._element.classList.add(mn, jo), this._element.style[n] = "", x.trigger(this._element, Pp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || x.trigger(this._element, jp).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Ti(this._element), this._element.classList.add(Qi), this._element.classList.remove(mn, jo);
    for (const i of this._triggerArray) {
      const r = V.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Qi), this._element.classList.add(mn), x.trigger(this._element, Vp);
    };
    this._element.style[e] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(jo);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = os(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(Wp) ? zp : Kp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(pa);
    for (const e of t) {
      const n = V.getElementFromSelector(e);
      n && this._addAriaAndCollapsedClass([e], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const e = V.find(Hp, this._config.parent);
    return V.find(t, this._config.parent).filter((n) => !e.includes(n));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(Up, !e), n.setAttribute("aria-expanded", e);
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
x.on(document, Fp, pa, function(s) {
  (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
  for (const t of V.getMultipleElementsFromSelector(this))
    fi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Kt(fi);
const Wl = "dropdown", Zp = "bs.dropdown", Ps = `.${Zp}`, nl = ".data-api", Qp = "Escape", zl = "Tab", Jp = "ArrowUp", Kl = "ArrowDown", tg = 2, eg = `hide${Ps}`, sg = `hidden${Ps}`, ng = `show${Ps}`, ig = `shown${Ps}`, rh = `click${Ps}${nl}`, oh = `keydown${Ps}${nl}`, rg = `keyup${Ps}${nl}`, cn = "show", og = "dropup", ag = "dropend", lg = "dropstart", cg = "dropup-center", ug = "dropdown-center", ks = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', hg = `${ks}.${cn}`, hr = ".dropdown-menu", dg = ".navbar", fg = ".navbar-nav", pg = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", gg = Wt() ? "top-end" : "top-start", mg = Wt() ? "top-start" : "top-end", bg = Wt() ? "bottom-end" : "bottom-start", yg = Wt() ? "bottom-start" : "bottom-end", vg = Wt() ? "left-start" : "right-start", _g = Wt() ? "right-start" : "left-start", Eg = "top", wg = "bottom", Tg = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, Ag = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class be extends re {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = V.next(this._element, hr)[0] || V.prev(this._element, hr)[0] || V.findOne(hr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Tg;
  }
  static get DefaultType() {
    return Ag;
  }
  static get NAME() {
    return Wl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (as(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!x.trigger(this._element, ng, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(fg))
        for (const n of [].concat(...document.body.children))
          x.on(n, "mouseover", mr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(cn), this._element.classList.add(cn), x.trigger(this._element, ig, t);
    }
  }
  hide() {
    if (as(this._element) || !this._isShown())
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
    if (!x.trigger(this._element, eg, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          x.off(n, "mouseover", mr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(cn), this._element.classList.remove(cn), this._element.setAttribute("aria-expanded", "false"), Me.removeDataAttribute(this._menu, "popper"), x.trigger(this._element, sg, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !De(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Wl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Fu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : De(this._config.reference) ? t = os(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = tl(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(cn);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(ag))
      return vg;
    if (t.classList.contains(lg))
      return _g;
    if (t.classList.contains(cg))
      return Eg;
    if (t.classList.contains(ug))
      return wg;
    const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(og) ? e ? mg : gg : e ? yg : bg;
  }
  _detectNavbar() {
    return this._element.closest(dg) !== null;
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
      ...Lt(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({
    key: t,
    target: e
  }) {
    const n = V.find(pg, this._menu).filter((i) => In(i));
    n.length && el(n, e, t === Kl, !n.includes(e)).focus();
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
    if (t.button === tg || t.type === "keyup" && t.key !== zl)
      return;
    const e = V.find(hg);
    for (const n of e) {
      const i = be.getInstance(n);
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
    const e = /input|textarea/i.test(t.target.tagName), n = t.key === Qp, i = [Jp, Kl].includes(t.key);
    if (!i && !n || e && !n)
      return;
    t.preventDefault();
    const r = this.matches(ks) ? this : V.prev(this, ks)[0] || V.next(this, ks)[0] || V.findOne(ks, t.delegateTarget.parentNode), o = be.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
x.on(document, oh, ks, be.dataApiKeydownHandler);
x.on(document, oh, hr, be.dataApiKeydownHandler);
x.on(document, rh, be.clearMenus);
x.on(document, rg, be.clearMenus);
x.on(document, rh, ks, function(s) {
  s.preventDefault(), be.getOrCreateInstance(this).toggle();
});
Kt(be);
const ah = "backdrop", Ng = "fade", Gl = "show", Yl = `mousedown.bs.${ah}`, Og = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, Cg = {
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
    return Og;
  }
  static get DefaultType() {
    return Cg;
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
      t.className = this._config.className, this._config.isAnimated && t.classList.add(Ng), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = os(t.rootElement), t;
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
const Sg = "focustrap", Lg = "bs.focustrap", yr = `.${Lg}`, kg = `focusin${yr}`, xg = `keydown.tab${yr}`, Ig = "Tab", $g = "forward", Xl = "backward", Rg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Dg = {
  autofocus: "boolean",
  trapElement: "element"
};
class ch extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Rg;
  }
  static get DefaultType() {
    return Dg;
  }
  static get NAME() {
    return Sg;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), x.off(document, yr), x.on(document, kg, (t) => this._handleFocusin(t)), x.on(document, xg, (t) => this._handleKeydown(t)), this._isActive = !0);
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
    t.key === Ig && (this._lastTabNavDirection = t.shiftKey ? Xl : $g);
  }
}
const Zl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Ql = ".sticky-top", Ji = "padding-right", Jl = "margin-right";
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
const Mg = "modal", qg = "bs.modal", zt = `.${qg}`, Bg = ".data-api", Pg = "Escape", jg = `hide${zt}`, Vg = `hidePrevented${zt}`, uh = `hidden${zt}`, hh = `show${zt}`, Fg = `shown${zt}`, Ug = `resize${zt}`, Hg = `click.dismiss${zt}`, Wg = `mousedown.dismiss${zt}`, zg = `keydown.dismiss${zt}`, Kg = `click${zt}${Bg}`, tc = "modal-open", Gg = "fade", ec = "show", Vo = "modal-static", Yg = ".modal.show", Xg = ".modal-dialog", Zg = ".modal-body", Qg = '[data-bs-toggle="modal"]', Jg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, tm = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Ds extends re {
  constructor(t, e) {
    super(t, e), this._dialog = V.findOne(Xg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new ga(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Jg;
  }
  static get DefaultType() {
    return tm;
  }
  static get NAME() {
    return Mg;
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
    !this._isShown || this._isTransitioning || x.trigger(this._element, jg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(ec), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    x.off(window, zt), x.off(this._dialog, zt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
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
    const e = V.findOne(Zg, this._dialog);
    e && (e.scrollTop = 0), Ti(this._element), this._element.classList.add(ec);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, x.trigger(this._element, Fg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    x.on(this._element, zg, (t) => {
      if (t.key === Pg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), x.on(window, Ug, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), x.on(this._element, Wg, (t) => {
      x.one(this._element, Hg, (e) => {
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
    return this._element.classList.contains(Gg);
  }
  _triggerBackdropTransition() {
    if (x.trigger(this._element, Vg).defaultPrevented)
      return;
    const e = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(Vo) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Vo), this._queueCallback(() => {
      this._element.classList.remove(Vo), this._queueCallback(() => {
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
      const i = Wt() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${e}px`;
    }
    if (!n && t) {
      const i = Wt() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${e}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, e) {
    return this.each(function() {
      const n = Ds.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](e);
      }
    });
  }
}
x.on(document, Kg, Qg, function(s) {
  const t = V.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), x.one(t, hh, (i) => {
    i.defaultPrevented || x.one(t, uh, () => {
      In(this) && this.focus();
    });
  });
  const e = V.findOne(Yg);
  e && Ds.getInstance(e).hide(), Ds.getOrCreateInstance(t).toggle(this);
});
Lr(Ds);
Kt(Ds);
const em = "offcanvas", sm = "bs.offcanvas", Ve = `.${sm}`, dh = ".data-api", nm = `load${Ve}${dh}`, im = "Escape", sc = "show", nc = "showing", ic = "hiding", rm = "offcanvas-backdrop", fh = ".offcanvas.show", om = `show${Ve}`, am = `shown${Ve}`, lm = `hide${Ve}`, rc = `hidePrevented${Ve}`, ph = `hidden${Ve}`, cm = `resize${Ve}`, um = `click${Ve}${dh}`, hm = `keydown.dismiss${Ve}`, dm = '[data-bs-toggle="offcanvas"]', fm = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, pm = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class ls extends re {
  constructor(t, e) {
    super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return fm;
  }
  static get DefaultType() {
    return pm;
  }
  static get NAME() {
    return em;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || x.trigger(this._element, om, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new ga().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(nc);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(sc), this._element.classList.remove(nc), x.trigger(this._element, am, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || x.trigger(this._element, lm).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ic), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(sc, ic), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new ga().reset(), x.trigger(this._element, ph);
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
      className: rm,
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
    x.on(this._element, hm, (t) => {
      if (t.key === im) {
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
      const e = ls.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
x.on(document, um, dm, function(s) {
  const t = V.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), as(this))
    return;
  x.one(t, ph, () => {
    In(this) && this.focus();
  });
  const e = V.findOne(fh);
  e && e !== t && ls.getInstance(e).hide(), ls.getOrCreateInstance(t).toggle(this);
});
x.on(window, nm, () => {
  for (const s of V.find(fh))
    ls.getOrCreateInstance(s).show();
});
x.on(window, cm, () => {
  for (const s of V.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(s).position !== "fixed" && ls.getOrCreateInstance(s).hide();
});
Lr(ls);
Kt(ls);
const gm = /^aria-[\w-]*$/i, gh = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", gm],
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
}, mm = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), bm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, ym = (s, t) => {
  const e = s.nodeName.toLowerCase();
  return t.includes(e) ? mm.has(e) ? !!bm.test(s.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(e));
};
function vm(s, t, e) {
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
      ym(h, u) || o.removeAttribute(h.nodeName);
  }
  return i.body.innerHTML;
}
const _m = "TemplateFactory", Em = {
  allowList: gh,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, wm = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, Tm = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class Am extends Ai {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return Em;
  }
  static get DefaultType() {
    return wm;
  }
  static get NAME() {
    return _m;
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
      }, Tm);
  }
  _setContent(t, e, n) {
    const i = V.findOne(n, t);
    if (i) {
      if (e = this._resolvePossibleFunction(e), !e) {
        i.remove();
        return;
      }
      if (De(e)) {
        this._putElementInTemplate(os(e), i);
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
    return this._config.sanitize ? vm(t, this._config.allowList, this._config.sanitizeFn) : t;
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
const Nm = "tooltip", Om = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Fo = "fade", Cm = "modal", tr = "show", Sm = ".tooltip-inner", oc = `.${Cm}`, ac = "hide.bs.modal", Jn = "hover", Uo = "focus", Lm = "click", km = "manual", xm = "hide", Im = "hidden", $m = "show", Rm = "shown", Dm = "inserted", Mm = "click", qm = "focusin", Bm = "focusout", Pm = "mouseenter", jm = "mouseleave", Vm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Wt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Wt() ? "right" : "left"
}, Fm = {
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
}, Um = {
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
    if (typeof Fu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Fm;
  }
  static get DefaultType() {
    return Um;
  }
  static get NAME() {
    return Nm;
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
    const t = x.trigger(this._element, this.constructor.eventName($m)), n = (Wu(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), x.trigger(this._element, this.constructor.eventName(Dm))), this._popper = this._createPopper(i), i.classList.add(tr), "ontouchstart" in document.documentElement)
      for (const l of [].concat(...document.body.children))
        x.on(l, "mouseover", mr);
    const o = () => {
      x.trigger(this._element, this.constructor.eventName(Rm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || x.trigger(this._element, this.constructor.eventName(xm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(tr), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        x.off(i, "mouseover", mr);
    this._activeTrigger[Lm] = !1, this._activeTrigger[Uo] = !1, this._activeTrigger[Jn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), x.trigger(this._element, this.constructor.eventName(Im)));
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
    e.classList.remove(Fo, tr), e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Lf(this.constructor.NAME).toString();
    return e.setAttribute("id", n), this._isAnimated() && e.classList.add(Fo), e;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Am({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [Sm]: this._getTitle()
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
    return this.tip && this.tip.classList.contains(tr);
  }
  _createPopper(t) {
    const e = Lt(this._config.placement, [this, t, this._element]), n = Vm[e.toUpperCase()];
    return tl(this._element, t, this._getPopperConfig(n));
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
        x.on(this._element, this.constructor.eventName(Mm), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (e !== km) {
        const n = e === Jn ? this.constructor.eventName(Pm) : this.constructor.eventName(qm), i = e === Jn ? this.constructor.eventName(jm) : this.constructor.eventName(Bm);
        x.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Uo : Jn] = !0, o._enter();
        }), x.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Uo : Jn] = o._element.contains(r.relatedTarget), o._leave();
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
    const e = Me.getDataAttributes(this._element);
    for (const n of Object.keys(e))
      Om.has(n) && delete e[n];
    return t = {
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : os(t.container), typeof t.delay == "number" && (t.delay = {
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
Kt(Ir);
const Hm = "popover", Wm = ".popover-header", zm = ".popover-body", Km = {
  ...Ir.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Gm = {
  ...Ir.DefaultType,
  content: "(null|string|element|function)"
};
class il extends Ir {
  // Getters
  static get Default() {
    return Km;
  }
  static get DefaultType() {
    return Gm;
  }
  static get NAME() {
    return Hm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Wm]: this._getTitle(),
      [zm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = il.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
Kt(il);
const Ym = "scrollspy", Xm = "bs.scrollspy", rl = `.${Xm}`, Zm = ".data-api", Qm = `activate${rl}`, lc = `click${rl}`, Jm = `load${rl}${Zm}`, tb = "dropdown-item", on = "active", eb = '[data-bs-spy="scroll"]', Ho = "[href]", sb = ".nav, .list-group", cc = ".nav-link", nb = ".nav-item", ib = ".list-group-item", rb = `${cc}, ${nb} > ${cc}, ${ib}`, ob = ".dropdown", ab = ".dropdown-toggle", lb = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, cb = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class $r extends re {
  constructor(t, e) {
    super(t, e), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return lb;
  }
  static get DefaultType() {
    return cb;
  }
  static get NAME() {
    return Ym;
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
    return t.target = os(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (x.off(this._config.target, lc), x.on(this._config.target, lc, Ho, (t) => {
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
    const t = V.find(Ho, this._config.target);
    for (const e of t) {
      if (!e.hash || as(e))
        continue;
      const n = V.findOne(decodeURI(e.hash), this._element);
      In(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(on), this._activateParents(t), x.trigger(this._element, Qm, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(tb)) {
      V.findOne(ab, t.closest(ob)).classList.add(on);
      return;
    }
    for (const e of V.parents(t, sb))
      for (const n of V.prev(e, rb))
        n.classList.add(on);
  }
  _clearActiveClass(t) {
    t.classList.remove(on);
    const e = V.find(`${Ho}.${on}`, t);
    for (const n of e)
      n.classList.remove(on);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = $r.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
x.on(window, Jm, () => {
  for (const s of V.find(eb))
    $r.getOrCreateInstance(s);
});
Kt($r);
const ub = "tab", hb = "bs.tab", js = `.${hb}`, db = `hide${js}`, fb = `hidden${js}`, pb = `show${js}`, gb = `shown${js}`, mb = `click${js}`, bb = `keydown${js}`, yb = `load${js}`, vb = "ArrowLeft", uc = "ArrowRight", _b = "ArrowUp", hc = "ArrowDown", Wo = "Home", dc = "End", xs = "active", fc = "fade", zo = "show", Eb = "dropdown", bh = ".dropdown-toggle", wb = ".dropdown-menu", Ko = `:not(${bh})`, Tb = '.list-group, .nav, [role="tablist"]', Ab = ".nav-item, .list-group-item", Nb = `.nav-link${Ko}, .list-group-item${Ko}, [role="tab"]${Ko}`, yh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Go = `${Nb}, ${yh}`, Ob = `.${xs}[data-bs-toggle="tab"], .${xs}[data-bs-toggle="pill"], .${xs}[data-bs-toggle="list"]`;
class Nn extends re {
  constructor(t) {
    super(t), this._parent = this._element.closest(Tb), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), x.on(this._element, bb, (e) => this._keydown(e)));
  }
  // Getters
  static get NAME() {
    return ub;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const e = this._getActiveElem(), n = e ? x.trigger(e, db, {
      relatedTarget: t
    }) : null;
    x.trigger(t, pb, {
      relatedTarget: e
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(e, t), this._activate(t, e));
  }
  // Private
  _activate(t, e) {
    if (!t)
      return;
    t.classList.add(xs), this._activate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(zo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), x.trigger(t, gb, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(fc));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(xs), t.blur(), this._deactivate(V.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(zo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), x.trigger(t, fb, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, t, t.classList.contains(fc));
  }
  _keydown(t) {
    if (![vb, uc, _b, hc, Wo, dc].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !as(i));
    let n;
    if ([Wo, dc].includes(t.key))
      n = e[t.key === Wo ? 0 : e.length - 1];
    else {
      const i = [uc, hc].includes(t.key);
      n = el(e, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), Nn.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return V.find(Go, this._parent);
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
    if (!n.classList.contains(Eb))
      return;
    const i = (r, o) => {
      const l = V.findOne(r, n);
      l && l.classList.toggle(o, e);
    };
    i(bh, xs), i(wb, zo), n.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, n) {
    t.hasAttribute(e) || t.setAttribute(e, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(xs);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Go) ? t : V.findOne(Go, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(Ab) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Nn.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
x.on(document, mb, yh, function(s) {
  ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !as(this) && Nn.getOrCreateInstance(this).show();
});
x.on(window, yb, () => {
  for (const s of V.find(Ob))
    Nn.getOrCreateInstance(s);
});
Kt(Nn);
const Cb = "toast", Sb = "bs.toast", ds = `.${Sb}`, Lb = `mouseover${ds}`, kb = `mouseout${ds}`, xb = `focusin${ds}`, Ib = `focusout${ds}`, $b = `hide${ds}`, Rb = `hidden${ds}`, Db = `show${ds}`, Mb = `shown${ds}`, qb = "fade", pc = "hide", er = "show", sr = "showing", Bb = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Pb = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Rr extends re {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Pb;
  }
  static get DefaultType() {
    return Bb;
  }
  static get NAME() {
    return Cb;
  }
  // Public
  show() {
    if (x.trigger(this._element, Db).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(qb);
    const e = () => {
      this._element.classList.remove(sr), x.trigger(this._element, Mb), this._maybeScheduleHide();
    };
    this._element.classList.remove(pc), Ti(this._element), this._element.classList.add(er, sr), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || x.trigger(this._element, $b).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(pc), this._element.classList.remove(sr, er), x.trigger(this._element, Rb);
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
    x.on(this._element, Lb, (t) => this._onInteraction(t, !0)), x.on(this._element, kb, (t) => this._onInteraction(t, !1)), x.on(this._element, xb, (t) => this._onInteraction(t, !0)), x.on(this._element, Ib, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Rr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Lr(Rr);
Kt(Rr);
function jb(s) {
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
function Mr(s, t, e, n) {
  try {
    return typeof s == "function" ? s(t, e, n) : s;
  } catch {
    return null;
  }
}
async function ni(s) {
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
function ii(s, t) {
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
function Je(s, t, e) {
  return t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), s != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), t.auth && (t.auth.type == "Basic" && t.auth.user && (t.options.headers.Authorization = "Basic " + btoa(t.auth.user + ":" + t.auth.password)), t.auth.type == "Bearer" && t.auth.token && (t.options.headers.Authorization = "Bearer " + t.auth.token), t.auth.type == "Cookie" && (t.options.credentials = "include")), t.options.body = void 0, t.options.method = s, e && Object.assign(t.options, e), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function ts(s, t, e, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (e ? "/" + e : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function ti(s, t = "-") {
  return s.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Vb(s) {
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
function Fb(s) {
  let t = {};
  for (let e in s) {
    let n = e.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? s[e] : {} : []), t);
  }
  return t;
}
function qr(s, t, e, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (l, a) => o[a] ? o[a] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][s] ? i(s, e) : i(t[n][s]);
}
function Ub(s, t, e = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(e), i = s.map(
    (r) => t.map((o) => {
      let l = r[o.name];
      return o.template ? o.template(l, r, s) : l !== void 0 ? l : "";
    }).join(e)
  );
  return [n, ...i].join(`
`);
}
function Hb(s, t = "export.csv") {
  s = "\uFEFF" + s;
  const e = new Blob([s], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(e), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function Wb(s) {
  return [...new Set(s)];
}
function zb(s, t) {
  s.indexOf(t) >= 0 ? s.splice(s.indexOf(t), 1) : s.push(t);
}
function Kb(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 && s.push(e.value);
}
function Gb(s, t) {
  for (let e of t)
    s.indexOf(e.value) < 0 ? s.push(e.value) : s.splice(s.indexOf(e.value), 1);
}
function Yb(s) {
  s.length = 0;
}
function vh(s, t) {
  t <= 0 || t >= s.length || ([s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
function _h(s, t) {
  t <= 0 || t >= s.length || (console.log(s[t - 1], s[t]), [s[t - 1], s[t]] = [s[t], s[t - 1]]);
}
function Xb(s, t) {
  Object.keys(s).forEach((e) => {
    typeof s[e] == "function" && (s[e] = s[e](t));
  });
}
var Eh = typeof global == "object" && global && global.Object === Object && global, Zb = typeof self == "object" && self && self.Object === Object && self, Te = Eh || Zb || Function("return this")(), cs = Te.Symbol, wh = Object.prototype, Qb = wh.hasOwnProperty, Jb = wh.toString, ei = cs ? cs.toStringTag : void 0;
function t1(s) {
  var t = Qb.call(s, ei), e = s[ei];
  try {
    s[ei] = void 0;
    var n = !0;
  } catch {
  }
  var i = Jb.call(s);
  return n && (t ? s[ei] = e : delete s[ei]), i;
}
var e1 = Object.prototype, s1 = e1.toString;
function n1(s) {
  return s1.call(s);
}
var i1 = "[object Null]", r1 = "[object Undefined]", gc = cs ? cs.toStringTag : void 0;
function Rn(s) {
  return s == null ? s === void 0 ? r1 : i1 : gc && gc in Object(s) ? t1(s) : n1(s);
}
function Be(s) {
  return s != null && typeof s == "object";
}
var Ms = Array.isArray;
function fs(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
function Th(s) {
  return s;
}
var o1 = "[object AsyncFunction]", a1 = "[object Function]", l1 = "[object GeneratorFunction]", c1 = "[object Proxy]";
function ol(s) {
  if (!fs(s))
    return !1;
  var t = Rn(s);
  return t == a1 || t == l1 || t == o1 || t == c1;
}
var Yo = Te["__core-js_shared__"], mc = function() {
  var s = /[^.]+$/.exec(Yo && Yo.keys && Yo.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function u1(s) {
  return !!mc && mc in s;
}
var h1 = Function.prototype, d1 = h1.toString;
function Vs(s) {
  if (s != null) {
    try {
      return d1.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
var f1 = /[\\^$.*+?()[\]{}|]/g, p1 = /^\[object .+?Constructor\]$/, g1 = Function.prototype, m1 = Object.prototype, b1 = g1.toString, y1 = m1.hasOwnProperty, v1 = RegExp(
  "^" + b1.call(y1).replace(f1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _1(s) {
  if (!fs(s) || u1(s))
    return !1;
  var t = ol(s) ? v1 : p1;
  return t.test(Vs(s));
}
function E1(s, t) {
  return s == null ? void 0 : s[t];
}
function Fs(s, t) {
  var e = E1(s, t);
  return _1(e) ? e : void 0;
}
var ma = Fs(Te, "WeakMap"), bc = Object.create, w1 = /* @__PURE__ */ function() {
  function s() {
  }
  return function(t) {
    if (!fs(t))
      return {};
    if (bc)
      return bc(t);
    s.prototype = t;
    var e = new s();
    return s.prototype = void 0, e;
  };
}();
function T1(s, t, e) {
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
function Ah(s, t) {
  var e = -1, n = s.length;
  for (t || (t = Array(n)); ++e < n; )
    t[e] = s[e];
  return t;
}
var A1 = 800, N1 = 16, O1 = Date.now;
function C1(s) {
  var t = 0, e = 0;
  return function() {
    var n = O1(), i = N1 - (n - e);
    if (e = n, i > 0) {
      if (++t >= A1)
        return arguments[0];
    } else
      t = 0;
    return s.apply(void 0, arguments);
  };
}
function S1(s) {
  return function() {
    return s;
  };
}
var _r = function() {
  try {
    var s = Fs(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
}(), L1 = _r ? function(s, t) {
  return _r(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: S1(t),
    writable: !0
  });
} : Th, k1 = C1(L1);
function x1(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var I1 = 9007199254740991, $1 = /^(?:0|[1-9]\d*)$/;
function Nh(s, t) {
  var e = typeof s;
  return t = t ?? I1, !!t && (e == "number" || e != "symbol" && $1.test(s)) && s > -1 && s % 1 == 0 && s < t;
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
var R1 = Object.prototype, D1 = R1.hasOwnProperty;
function Oh(s, t, e) {
  var n = s[t];
  (!(D1.call(s, t) && Ci(n, e)) || e === void 0 && !(t in s)) && al(s, t, e);
}
function Si(s, t, e, n) {
  var i = !e;
  e || (e = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var l = t[r], a = void 0;
    a === void 0 && (a = s[l]), i ? al(e, l, a) : Oh(e, l, a);
  }
  return e;
}
var yc = Math.max;
function M1(s, t, e) {
  return t = yc(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = yc(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var l = Array(t + 1); ++i < t; )
      l[i] = n[i];
    return l[t] = e(o), T1(s, this, l);
  };
}
function q1(s, t) {
  return k1(M1(s, t, Th), s + "");
}
var B1 = 9007199254740991;
function Ch(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= B1;
}
function Br(s) {
  return s != null && Ch(s.length) && !ol(s);
}
function P1(s, t, e) {
  if (!fs(e))
    return !1;
  var n = typeof t;
  return (n == "number" ? Br(e) && Nh(t, e.length) : n == "string" && t in e) ? Ci(e[t], s) : !1;
}
function j1(s) {
  return q1(function(t, e) {
    var n = -1, i = e.length, r = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (r = s.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && P1(e[0], e[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var l = e[n];
      l && s(t, l, n, r);
    }
    return t;
  });
}
var V1 = Object.prototype;
function ll(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || V1;
  return s === e;
}
function F1(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
var U1 = "[object Arguments]";
function vc(s) {
  return Be(s) && Rn(s) == U1;
}
var Sh = Object.prototype, H1 = Sh.hasOwnProperty, W1 = Sh.propertyIsEnumerable, ba = vc(/* @__PURE__ */ function() {
  return arguments;
}()) ? vc : function(s) {
  return Be(s) && H1.call(s, "callee") && !W1.call(s, "callee");
};
function z1() {
  return !1;
}
var Lh = typeof exports == "object" && exports && !exports.nodeType && exports, _c = Lh && typeof module == "object" && module && !module.nodeType && module, K1 = _c && _c.exports === Lh, Ec = K1 ? Te.Buffer : void 0, G1 = Ec ? Ec.isBuffer : void 0, pi = G1 || z1, Y1 = "[object Arguments]", X1 = "[object Array]", Z1 = "[object Boolean]", Q1 = "[object Date]", J1 = "[object Error]", ty = "[object Function]", ey = "[object Map]", sy = "[object Number]", ny = "[object Object]", iy = "[object RegExp]", ry = "[object Set]", oy = "[object String]", ay = "[object WeakMap]", ly = "[object ArrayBuffer]", cy = "[object DataView]", uy = "[object Float32Array]", hy = "[object Float64Array]", dy = "[object Int8Array]", fy = "[object Int16Array]", py = "[object Int32Array]", gy = "[object Uint8Array]", my = "[object Uint8ClampedArray]", by = "[object Uint16Array]", yy = "[object Uint32Array]", st = {};
st[uy] = st[hy] = st[dy] = st[fy] = st[py] = st[gy] = st[my] = st[by] = st[yy] = !0;
st[Y1] = st[X1] = st[ly] = st[Z1] = st[cy] = st[Q1] = st[J1] = st[ty] = st[ey] = st[sy] = st[ny] = st[iy] = st[ry] = st[oy] = st[ay] = !1;
function vy(s) {
  return Be(s) && Ch(s.length) && !!st[Rn(s)];
}
function cl(s) {
  return function(t) {
    return s(t);
  };
}
var kh = typeof exports == "object" && exports && !exports.nodeType && exports, ci = kh && typeof module == "object" && module && !module.nodeType && module, _y = ci && ci.exports === kh, Xo = _y && Eh.process, On = function() {
  try {
    var s = ci && ci.require && ci.require("util").types;
    return s || Xo && Xo.binding && Xo.binding("util");
  } catch {
  }
}(), wc = On && On.isTypedArray, ul = wc ? cl(wc) : vy, Ey = Object.prototype, wy = Ey.hasOwnProperty;
function xh(s, t) {
  var e = Ms(s), n = !e && ba(s), i = !e && !n && pi(s), r = !e && !n && !i && ul(s), o = e || n || i || r, l = o ? F1(s.length, String) : [], a = l.length;
  for (var u in s)
    (t || wy.call(s, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Nh(u, a))) && l.push(u);
  return l;
}
function Ih(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var Ty = Ih(Object.keys, Object), Ay = Object.prototype, Ny = Ay.hasOwnProperty;
function Oy(s) {
  if (!ll(s))
    return Ty(s);
  var t = [];
  for (var e in Object(s))
    Ny.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function hl(s) {
  return Br(s) ? xh(s) : Oy(s);
}
function Cy(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
var Sy = Object.prototype, Ly = Sy.hasOwnProperty;
function ky(s) {
  if (!fs(s))
    return Cy(s);
  var t = ll(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !Ly.call(s, n)) || e.push(n);
  return e;
}
function Li(s) {
  return Br(s) ? xh(s, !0) : ky(s);
}
var gi = Fs(Object, "create");
function xy() {
  this.__data__ = gi ? gi(null) : {}, this.size = 0;
}
function Iy(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var $y = "__lodash_hash_undefined__", Ry = Object.prototype, Dy = Ry.hasOwnProperty;
function My(s) {
  var t = this.__data__;
  if (gi) {
    var e = t[s];
    return e === $y ? void 0 : e;
  }
  return Dy.call(t, s) ? t[s] : void 0;
}
var qy = Object.prototype, By = qy.hasOwnProperty;
function Py(s) {
  var t = this.__data__;
  return gi ? t[s] !== void 0 : By.call(t, s);
}
var jy = "__lodash_hash_undefined__";
function Vy(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = gi && t === void 0 ? jy : t, this;
}
function qs(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
qs.prototype.clear = xy;
qs.prototype.delete = Iy;
qs.prototype.get = My;
qs.prototype.has = Py;
qs.prototype.set = Vy;
function Fy() {
  this.__data__ = [], this.size = 0;
}
function Pr(s, t) {
  for (var e = s.length; e--; )
    if (Ci(s[e][0], t))
      return e;
  return -1;
}
var Uy = Array.prototype, Hy = Uy.splice;
function Wy(s) {
  var t = this.__data__, e = Pr(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : Hy.call(t, e, 1), --this.size, !0;
}
function zy(s) {
  var t = this.__data__, e = Pr(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function Ky(s) {
  return Pr(this.__data__, s) > -1;
}
function Gy(s, t) {
  var e = this.__data__, n = Pr(e, s);
  return n < 0 ? (++this.size, e.push([s, t])) : e[n][1] = t, this;
}
function Fe(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Fe.prototype.clear = Fy;
Fe.prototype.delete = Wy;
Fe.prototype.get = zy;
Fe.prototype.has = Ky;
Fe.prototype.set = Gy;
var mi = Fs(Te, "Map");
function Yy() {
  this.size = 0, this.__data__ = {
    hash: new qs(),
    map: new (mi || Fe)(),
    string: new qs()
  };
}
function Xy(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function jr(s, t) {
  var e = s.__data__;
  return Xy(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function Zy(s) {
  var t = jr(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function Qy(s) {
  return jr(this, s).get(s);
}
function Jy(s) {
  return jr(this, s).has(s);
}
function tv(s, t) {
  var e = jr(this, s), n = e.size;
  return e.set(s, t), this.size += e.size == n ? 0 : 1, this;
}
function Us(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
Us.prototype.clear = Yy;
Us.prototype.delete = Zy;
Us.prototype.get = Qy;
Us.prototype.has = Jy;
Us.prototype.set = tv;
function $h(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var dl = Ih(Object.getPrototypeOf, Object), ev = "[object Object]", sv = Function.prototype, nv = Object.prototype, Rh = sv.toString, iv = nv.hasOwnProperty, rv = Rh.call(Object);
function ov(s) {
  if (!Be(s) || Rn(s) != ev)
    return !1;
  var t = dl(s);
  if (t === null)
    return !0;
  var e = iv.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && Rh.call(e) == rv;
}
function av() {
  this.__data__ = new Fe(), this.size = 0;
}
function lv(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function cv(s) {
  return this.__data__.get(s);
}
function uv(s) {
  return this.__data__.has(s);
}
var hv = 200;
function dv(s, t) {
  var e = this.__data__;
  if (e instanceof Fe) {
    var n = e.__data__;
    if (!mi || n.length < hv - 1)
      return n.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new Us(n);
  }
  return e.set(s, t), this.size = e.size, this;
}
function ye(s) {
  var t = this.__data__ = new Fe(s);
  this.size = t.size;
}
ye.prototype.clear = av;
ye.prototype.delete = lv;
ye.prototype.get = cv;
ye.prototype.has = uv;
ye.prototype.set = dv;
function fv(s, t) {
  return s && Si(t, hl(t), s);
}
function pv(s, t) {
  return s && Si(t, Li(t), s);
}
var Dh = typeof exports == "object" && exports && !exports.nodeType && exports, Tc = Dh && typeof module == "object" && module && !module.nodeType && module, gv = Tc && Tc.exports === Dh, Ac = gv ? Te.Buffer : void 0, Nc = Ac ? Ac.allocUnsafe : void 0;
function Mh(s, t) {
  if (t)
    return s.slice();
  var e = s.length, n = Nc ? Nc(e) : new s.constructor(e);
  return s.copy(n), n;
}
function mv(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length, i = 0, r = []; ++e < n; ) {
    var o = s[e];
    t(o, e, s) && (r[i++] = o);
  }
  return r;
}
function qh() {
  return [];
}
var bv = Object.prototype, yv = bv.propertyIsEnumerable, Oc = Object.getOwnPropertySymbols, fl = Oc ? function(s) {
  return s == null ? [] : (s = Object(s), mv(Oc(s), function(t) {
    return yv.call(s, t);
  }));
} : qh;
function vv(s, t) {
  return Si(s, fl(s), t);
}
var _v = Object.getOwnPropertySymbols, Bh = _v ? function(s) {
  for (var t = []; s; )
    $h(t, fl(s)), s = dl(s);
  return t;
} : qh;
function Ev(s, t) {
  return Si(s, Bh(s), t);
}
function Ph(s, t, e) {
  var n = t(s);
  return Ms(s) ? n : $h(n, e(s));
}
function ya(s) {
  return Ph(s, hl, fl);
}
function wv(s) {
  return Ph(s, Li, Bh);
}
var va = Fs(Te, "DataView"), _a = Fs(Te, "Promise"), Ea = Fs(Te, "Set"), Cc = "[object Map]", Tv = "[object Object]", Sc = "[object Promise]", Lc = "[object Set]", kc = "[object WeakMap]", xc = "[object DataView]", Av = Vs(va), Nv = Vs(mi), Ov = Vs(_a), Cv = Vs(Ea), Sv = Vs(ma), te = Rn;
(va && te(new va(new ArrayBuffer(1))) != xc || mi && te(new mi()) != Cc || _a && te(_a.resolve()) != Sc || Ea && te(new Ea()) != Lc || ma && te(new ma()) != kc) && (te = function(s) {
  var t = Rn(s), e = t == Tv ? s.constructor : void 0, n = e ? Vs(e) : "";
  if (n)
    switch (n) {
      case Av:
        return xc;
      case Nv:
        return Cc;
      case Ov:
        return Sc;
      case Cv:
        return Lc;
      case Sv:
        return kc;
    }
  return t;
});
var Lv = Object.prototype, kv = Lv.hasOwnProperty;
function xv(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && kv.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var Er = Te.Uint8Array;
function pl(s) {
  var t = new s.constructor(s.byteLength);
  return new Er(t).set(new Er(s)), t;
}
function Iv(s, t) {
  var e = t ? pl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var $v = /\w*$/;
function Rv(s) {
  var t = new s.constructor(s.source, $v.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var Ic = cs ? cs.prototype : void 0, $c = Ic ? Ic.valueOf : void 0;
function Dv(s) {
  return $c ? Object($c.call(s)) : {};
}
function jh(s, t) {
  var e = t ? pl(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var Mv = "[object Boolean]", qv = "[object Date]", Bv = "[object Map]", Pv = "[object Number]", jv = "[object RegExp]", Vv = "[object Set]", Fv = "[object String]", Uv = "[object Symbol]", Hv = "[object ArrayBuffer]", Wv = "[object DataView]", zv = "[object Float32Array]", Kv = "[object Float64Array]", Gv = "[object Int8Array]", Yv = "[object Int16Array]", Xv = "[object Int32Array]", Zv = "[object Uint8Array]", Qv = "[object Uint8ClampedArray]", Jv = "[object Uint16Array]", t0 = "[object Uint32Array]";
function e0(s, t, e) {
  var n = s.constructor;
  switch (t) {
    case Hv:
      return pl(s);
    case Mv:
    case qv:
      return new n(+s);
    case Wv:
      return Iv(s, e);
    case zv:
    case Kv:
    case Gv:
    case Yv:
    case Xv:
    case Zv:
    case Qv:
    case Jv:
    case t0:
      return jh(s, e);
    case Bv:
      return new n();
    case Pv:
    case Fv:
      return new n(s);
    case jv:
      return Rv(s);
    case Vv:
      return new n();
    case Uv:
      return Dv(s);
  }
}
function Vh(s) {
  return typeof s.constructor == "function" && !ll(s) ? w1(dl(s)) : {};
}
var s0 = "[object Map]";
function n0(s) {
  return Be(s) && te(s) == s0;
}
var Rc = On && On.isMap, i0 = Rc ? cl(Rc) : n0, r0 = "[object Set]";
function o0(s) {
  return Be(s) && te(s) == r0;
}
var Dc = On && On.isSet, a0 = Dc ? cl(Dc) : o0, l0 = 1, c0 = 2, u0 = 4, Fh = "[object Arguments]", h0 = "[object Array]", d0 = "[object Boolean]", f0 = "[object Date]", p0 = "[object Error]", Uh = "[object Function]", g0 = "[object GeneratorFunction]", m0 = "[object Map]", b0 = "[object Number]", Hh = "[object Object]", y0 = "[object RegExp]", v0 = "[object Set]", _0 = "[object String]", E0 = "[object Symbol]", w0 = "[object WeakMap]", T0 = "[object ArrayBuffer]", A0 = "[object DataView]", N0 = "[object Float32Array]", O0 = "[object Float64Array]", C0 = "[object Int8Array]", S0 = "[object Int16Array]", L0 = "[object Int32Array]", k0 = "[object Uint8Array]", x0 = "[object Uint8ClampedArray]", I0 = "[object Uint16Array]", $0 = "[object Uint32Array]", et = {};
et[Fh] = et[h0] = et[T0] = et[A0] = et[d0] = et[f0] = et[N0] = et[O0] = et[C0] = et[S0] = et[L0] = et[m0] = et[b0] = et[Hh] = et[y0] = et[v0] = et[_0] = et[E0] = et[k0] = et[x0] = et[I0] = et[$0] = !0;
et[p0] = et[Uh] = et[w0] = !1;
function dr(s, t, e, n, i, r) {
  var o, l = t & l0, a = t & c0, u = t & u0;
  if (o !== void 0)
    return o;
  if (!fs(s))
    return s;
  var h = Ms(s);
  if (h) {
    if (o = xv(s), !l)
      return Ah(s, o);
  } else {
    var d = te(s), g = d == Uh || d == g0;
    if (pi(s))
      return Mh(s, l);
    if (d == Hh || d == Fh || g && !i) {
      if (o = a || g ? {} : Vh(s), !l)
        return a ? Ev(s, pv(o, s)) : vv(s, fv(o, s));
    } else {
      if (!et[d])
        return i ? s : {};
      o = e0(s, d, l);
    }
  }
  r || (r = new ye());
  var m = r.get(s);
  if (m)
    return m;
  r.set(s, o), a0(s) ? s.forEach(function(w) {
    o.add(dr(w, t, e, w, s, r));
  }) : i0(s) && s.forEach(function(w, T) {
    o.set(T, dr(w, t, e, T, s, r));
  });
  var _ = u ? a ? wv : ya : a ? Li : hl, E = h ? void 0 : _(s);
  return x1(E || s, function(w, T) {
    E && (T = w, w = s[T]), Oh(o, T, dr(w, t, e, T, s, r));
  }), o;
}
var R0 = 1, D0 = 4;
function bn(s) {
  return dr(s, R0 | D0);
}
var M0 = "__lodash_hash_undefined__";
function q0(s) {
  return this.__data__.set(s, M0), this;
}
function B0(s) {
  return this.__data__.has(s);
}
function wr(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new Us(); ++t < e; )
    this.add(s[t]);
}
wr.prototype.add = wr.prototype.push = q0;
wr.prototype.has = B0;
function P0(s, t) {
  for (var e = -1, n = s == null ? 0 : s.length; ++e < n; )
    if (t(s[e], e, s))
      return !0;
  return !1;
}
function j0(s, t) {
  return s.has(t);
}
var V0 = 1, F0 = 2;
function Wh(s, t, e, n, i, r) {
  var o = e & V0, l = s.length, a = t.length;
  if (l != a && !(o && a > l))
    return !1;
  var u = r.get(s), h = r.get(t);
  if (u && h)
    return u == t && h == s;
  var d = -1, g = !0, m = e & F0 ? new wr() : void 0;
  for (r.set(s, t), r.set(t, s); ++d < l; ) {
    var _ = s[d], E = t[d];
    if (n)
      var w = o ? n(E, _, d, t, s, r) : n(_, E, d, s, t, r);
    if (w !== void 0) {
      if (w)
        continue;
      g = !1;
      break;
    }
    if (m) {
      if (!P0(t, function(T, C) {
        if (!j0(m, C) && (_ === T || i(_, T, e, n, r)))
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
function H0(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(n) {
    e[++t] = n;
  }), e;
}
var W0 = 1, z0 = 2, K0 = "[object Boolean]", G0 = "[object Date]", Y0 = "[object Error]", X0 = "[object Map]", Z0 = "[object Number]", Q0 = "[object RegExp]", J0 = "[object Set]", t_ = "[object String]", e_ = "[object Symbol]", s_ = "[object ArrayBuffer]", n_ = "[object DataView]", Mc = cs ? cs.prototype : void 0, Zo = Mc ? Mc.valueOf : void 0;
function i_(s, t, e, n, i, r, o) {
  switch (e) {
    case n_:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case s_:
      return !(s.byteLength != t.byteLength || !r(new Er(s), new Er(t)));
    case K0:
    case G0:
    case Z0:
      return Ci(+s, +t);
    case Y0:
      return s.name == t.name && s.message == t.message;
    case Q0:
    case t_:
      return s == t + "";
    case X0:
      var l = U0;
    case J0:
      var a = n & W0;
      if (l || (l = H0), s.size != t.size && !a)
        return !1;
      var u = o.get(s);
      if (u)
        return u == t;
      n |= z0, o.set(s, t);
      var h = Wh(l(s), l(t), n, i, r, o);
      return o.delete(s), h;
    case e_:
      if (Zo)
        return Zo.call(s) == Zo.call(t);
  }
  return !1;
}
var r_ = 1, o_ = Object.prototype, a_ = o_.hasOwnProperty;
function l_(s, t, e, n, i, r) {
  var o = e & r_, l = ya(s), a = l.length, u = ya(t), h = u.length;
  if (a != h && !o)
    return !1;
  for (var d = a; d--; ) {
    var g = l[d];
    if (!(o ? g in t : a_.call(t, g)))
      return !1;
  }
  var m = r.get(s), _ = r.get(t);
  if (m && _)
    return m == t && _ == s;
  var E = !0;
  r.set(s, t), r.set(t, s);
  for (var w = o; ++d < a; ) {
    g = l[d];
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
var c_ = 1, qc = "[object Arguments]", Bc = "[object Array]", nr = "[object Object]", u_ = Object.prototype, Pc = u_.hasOwnProperty;
function h_(s, t, e, n, i, r) {
  var o = Ms(s), l = Ms(t), a = o ? Bc : te(s), u = l ? Bc : te(t);
  a = a == qc ? nr : a, u = u == qc ? nr : u;
  var h = a == nr, d = u == nr, g = a == u;
  if (g && pi(s)) {
    if (!pi(t))
      return !1;
    o = !0, h = !1;
  }
  if (g && !h)
    return r || (r = new ye()), o || ul(s) ? Wh(s, t, e, n, i, r) : i_(s, t, a, e, n, i, r);
  if (!(e & c_)) {
    var m = h && Pc.call(s, "__wrapped__"), _ = d && Pc.call(t, "__wrapped__");
    if (m || _) {
      var E = m ? s.value() : s, w = _ ? t.value() : t;
      return r || (r = new ye()), i(E, w, e, n, r);
    }
  }
  return g ? (r || (r = new ye()), l_(s, t, e, n, i, r)) : !1;
}
function zh(s, t, e, n, i) {
  return s === t ? !0 : s == null || t == null || !Be(s) && !Be(t) ? s !== s && t !== t : h_(s, t, e, n, zh, i);
}
function d_(s) {
  return function(t, e, n) {
    for (var i = -1, r = Object(t), o = n(t), l = o.length; l--; ) {
      var a = o[++i];
      if (e(r[a], a, r) === !1)
        break;
    }
    return t;
  };
}
var f_ = d_();
function wa(s, t, e) {
  (e !== void 0 && !Ci(s[t], e) || e === void 0 && !(t in s)) && al(s, t, e);
}
function p_(s) {
  return Be(s) && Br(s);
}
function Ta(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function g_(s) {
  return Si(s, Li(s));
}
function m_(s, t, e, n, i, r, o) {
  var l = Ta(s, e), a = Ta(t, e), u = o.get(a);
  if (u) {
    wa(s, e, u);
    return;
  }
  var h = r ? r(l, a, e + "", s, t, o) : void 0, d = h === void 0;
  if (d) {
    var g = Ms(a), m = !g && pi(a), _ = !g && !m && ul(a);
    h = a, g || m || _ ? Ms(l) ? h = l : p_(l) ? h = Ah(l) : m ? (d = !1, h = Mh(a, !0)) : _ ? (d = !1, h = jh(a, !0)) : h = [] : ov(a) || ba(a) ? (h = l, ba(l) ? h = g_(l) : (!fs(l) || ol(l)) && (h = Vh(a))) : d = !1;
  }
  d && (o.set(a, h), i(h, a, n, r, o), o.delete(a)), wa(s, e, h);
}
function Kh(s, t, e, n, i) {
  s !== t && f_(t, function(r, o) {
    if (i || (i = new ye()), fs(r))
      m_(s, t, o, e, Kh, n, i);
    else {
      var l = n ? n(Ta(s, o), r, o + "", s, t, i) : void 0;
      l === void 0 && (l = r), wa(s, o, l);
    }
  }, Li);
}
function gl(s, t) {
  return zh(s, t);
}
var rs = j1(function(s, t, e) {
  Kh(s, t, e);
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
class yn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Gh = class Aa {
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
      throw new yn(`Unable to create ${e} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(n)
    ), l = new r(t, o, n);
    return Aa.blots.set(l.domNode, l), l;
  }
  find(t, e = !1) {
    return Aa.find(t, e);
  }
  query(t, e = B.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & B.LEVEL & B.BLOCK ? n = this.types.block : t & B.LEVEL & B.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && e & B.LEVEL & n.scope && e & B.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((e) => {
      const n = "blotName" in e, i = "attrName" in e;
      if (!n && !i)
        throw new yn("Invalid definition");
      if (n && e.blotName === "abstract")
        throw new yn("Cannot register abstract class");
      const r = n ? e.blotName : i ? e.attrName : void 0;
      return this.types[r] = e, i ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : n && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((o) => o.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((o) => {
        (this.tags[o] == null || e.className == null) && (this.tags[o] = e);
      }))), e;
    });
  }
};
Gh.blots = /* @__PURE__ */ new WeakMap();
let Cn = Gh;
function jc(s, t) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class b_ extends Ee {
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
const oe = b_;
function Qo(s) {
  const t = s.split("-"), e = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + e;
}
class y_ extends Ee {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[Qo(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[Qo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[Qo(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
const ps = y_;
class v_ {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Cn.find(this.domNode);
    if (t == null)
      return;
    const e = Ee.keys(this.domNode), n = oe.keys(this.domNode), i = ps.keys(this.domNode);
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
const Vr = v_, Yh = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, Cn.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new yn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Cn.blots.delete(this.domNode);
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
      throw new yn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Yh.blotName = "abstract";
let Xh = Yh;
const Zh = class extends Xh {
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
Zh.scope = B.INLINE_BLOT;
let __ = Zh;
const yt = __;
class E_ {
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
const Qh = class Qe extends Xh {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, Qe.uiClass && this.uiNode.classList.add(Qe.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new E_(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = Vc(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof yn)
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
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof Qe ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, e = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      e,
      n,
      (o, l, a) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof Qe && (i = i.concat(
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
      ) || (e.statics.scope === B.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof Qe ? e.unwrap() : e.remove());
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
    return n instanceof Qe ? r.concat(n.path(i, e)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, e) {
    const n = typeof t == "string" ? this.scroll.create(t, e) : t;
    return n instanceof Qe && this.moveChildren(n), super.replaceWith(n);
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
Qh.uiClass = "";
let w_ = Qh;
const ne = w_;
function T_(s, t) {
  if (Object.keys(s).length !== Object.keys(t).length)
    return !1;
  for (const e in s)
    if (s[e] !== t[e])
      return !1;
  return !0;
}
const un = class hn extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(hn.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new Vr(this.domNode);
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((n) => {
        n instanceof hn || (n = n.wrap(hn.blotName, !0)), this.attributes.copy(n);
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
    n instanceof hn && n.prev === this && T_(e, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof hn && this.attributes.move(n), n;
  }
};
un.allowedChildren = [un, yt], un.blotName = "inline", un.scope = B.INLINE_BLOT, un.tagName = "SPAN";
let A_ = un;
const ml = A_, dn = class Na extends ne {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const n = e.query(Na.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new Vr(this.domNode);
  }
  format(t, e) {
    const n = this.scroll.query(t, B.BLOCK);
    n != null && (n instanceof Ee ? this.attributes.attribute(n, e) : t === this.statics.blotName && !e ? this.replaceWith(Na.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
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
dn.blotName = "block", dn.scope = B.BLOCK_BLOT, dn.tagName = "P", dn.allowedChildren = [
  ml,
  dn,
  yt
];
let N_ = dn;
const bi = N_, Oa = class extends ne {
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
Oa.blotName = "container", Oa.scope = B.BLOCK_BLOT;
let O_ = Oa;
const Fr = O_;
class C_ extends yt {
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
const Rt = C_, S_ = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, L_ = 100, fn = class extends ne {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, S_), this.attach();
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
    const r = (a, u = !0) => {
      a == null || a === this || a.domNode.parentNode != null && (n.has(a.domNode) || n.set(a.domNode, []), u && r(a.parent));
    }, o = (a) => {
      n.has(a.domNode) && (a instanceof ne && a.children.forEach(o), n.delete(a.domNode), a.optimize(e));
    };
    let l = t;
    for (let a = 0; l.length > 0; a += 1) {
      if (a >= L_)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((u) => {
        const h = this.find(u.target, !0);
        h != null && (h.domNode === u.target && (u.type === "childList" ? (r(this.find(u.previousSibling, !1)), Array.from(u.addedNodes).forEach((d) => {
          const g = this.find(d, !1);
          r(g, !1), g instanceof ne && g.children.forEach((m) => {
            r(m, !1);
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
fn.blotName = "scroll", fn.defaultChild = bi, fn.allowedChildren = [bi, Fr], fn.scope = B.BLOCK_BLOT, fn.tagName = "DIV";
let k_ = fn;
const bl = k_, Ca = class Jh extends yt {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Jh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Ca.blotName = "text", Ca.scope = B.INLINE_BLOT;
let x_ = Ca;
const Tr = x_, I_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Ee,
  AttributorStore: Vr,
  BlockBlot: bi,
  ClassAttributor: oe,
  ContainerBlot: Fr,
  EmbedBlot: Rt,
  InlineBlot: ml,
  LeafBlot: yt,
  ParentBlot: ne,
  Registry: Cn,
  Scope: B,
  ScrollBlot: bl,
  StyleAttributor: ps,
  TextBlot: Tr
}, Symbol.toStringTag, { value: "Module" }));
var ss = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function td(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Sa = { exports: {} }, kt = -1, wt = 1, ct = 0;
function yi(s, t, e, n, i) {
  if (s === t)
    return s ? [[ct, s]] : [];
  if (e != null) {
    var r = V_(s, t, e);
    if (r)
      return r;
  }
  var o = yl(s, t), l = s.substring(0, o);
  s = s.substring(o), t = t.substring(o), o = Ur(s, t);
  var a = s.substring(s.length - o);
  s = s.substring(0, s.length - o), t = t.substring(0, t.length - o);
  var u = $_(s, t);
  return l && u.unshift([ct, l]), a && u.push([ct, a]), vl(u, i), n && M_(u), u;
}
function $_(s, t) {
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
    var l = o[0], a = o[1], u = o[2], h = o[3], d = o[4], g = yi(l, u), m = yi(a, h);
    return g.concat([[ct, d]], m);
  }
  return R_(s, t);
}
function R_(s, t) {
  for (var e = s.length, n = t.length, i = Math.ceil((e + n) / 2), r = i, o = 2 * i, l = new Array(o), a = new Array(o), u = 0; u < o; u++)
    l[u] = -1, a[u] = -1;
  l[r + 1] = 0, a[r + 1] = 0;
  for (var h = e - n, d = h % 2 !== 0, g = 0, m = 0, _ = 0, E = 0, w = 0; w < i; w++) {
    for (var T = -w + g; T <= w - m; T += 2) {
      var C = r + T, L;
      T === -w || T !== w && l[C - 1] < l[C + 1] ? L = l[C + 1] : L = l[C - 1] + 1;
      for (var k = L - T; L < e && k < n && s.charAt(L) === t.charAt(k); )
        L++, k++;
      if (l[C] = L, L > e)
        m += 2;
      else if (k > n)
        g += 2;
      else if (d) {
        var I = r + h - T;
        if (I >= 0 && I < o && a[I] !== -1) {
          var R = e - a[I];
          if (L >= R)
            return Fc(s, t, L, k);
        }
      }
    }
    for (var P = -w + _; P <= w - E; P += 2) {
      var I = r + P, R;
      P === -w || P !== w && a[I - 1] < a[I + 1] ? R = a[I + 1] : R = a[I - 1] + 1;
      for (var U = R - P; R < e && U < n && s.charAt(e - R - 1) === t.charAt(n - U - 1); )
        R++, U++;
      if (a[I] = R, R > e)
        E += 2;
      else if (U > n)
        _ += 2;
      else if (!d) {
        var C = r + h - P;
        if (C >= 0 && C < o && l[C] !== -1) {
          var L = l[C], k = r + L - C;
          if (R = e - R, L >= R)
            return Fc(s, t, L, k);
        }
      }
    }
  }
  return [
    [kt, s],
    [wt, t]
  ];
}
function Fc(s, t, e, n) {
  var i = s.substring(0, e), r = t.substring(0, n), o = s.substring(e), l = t.substring(n), a = yi(i, r), u = yi(o, l);
  return a.concat(u);
}
function yl(s, t) {
  if (!s || !t || s.charAt(0) !== t.charAt(0))
    return 0;
  for (var e = 0, n = Math.min(s.length, t.length), i = n, r = 0; e < i; )
    s.substring(r, i) == t.substring(r, i) ? (e = i, r = e) : n = i, i = Math.floor((n - e) / 2 + e);
  return ed(s.charCodeAt(i - 1)) && i--, i;
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
  return sd(s.charCodeAt(s.length - i)) && i--, i;
}
function D_(s, t) {
  var e = s.length > t.length ? s : t, n = s.length > t.length ? t : s;
  if (e.length < 4 || n.length * 2 < e.length)
    return null;
  function i(m, _, E) {
    for (var w = m.substring(E, E + Math.floor(m.length / 4)), T = -1, C = "", L, k, I, R; (T = _.indexOf(w, T + 1)) !== -1; ) {
      var P = yl(
        m.substring(E),
        _.substring(T)
      ), U = Ur(
        m.substring(0, E),
        _.substring(0, T)
      );
      C.length < U + P && (C = _.substring(T - U, T) + _.substring(T, T + P), L = m.substring(0, E - U), k = m.substring(E + P), I = _.substring(0, T - U), R = _.substring(T + P));
    }
    return C.length * 2 >= m.length ? [
      L,
      k,
      I,
      R,
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
  var a, u, h, d;
  s.length > t.length ? (a = l[0], u = l[1], h = l[2], d = l[3]) : (h = l[0], d = l[1], a = l[2], u = l[3]);
  var g = l[4];
  return [a, u, h, d, g];
}
function M_(s) {
  for (var t = !1, e = [], n = 0, i = null, r = 0, o = 0, l = 0, a = 0, u = 0; r < s.length; )
    s[r][0] == ct ? (e[n++] = r, o = a, l = u, a = 0, u = 0, i = s[r][1]) : (s[r][0] == wt ? a += s[r][1].length : u += s[r][1].length, i && i.length <= Math.max(o, l) && i.length <= Math.max(a, u) && (s.splice(e[n - 1], 0, [
      kt,
      i
    ]), s[e[n - 1] + 1][0] = wt, n--, n--, r = n > 0 ? e[n - 1] : -1, o = 0, l = 0, a = 0, u = 0, i = null, t = !0)), r++;
  for (t && vl(s), P_(s), r = 1; r < s.length; ) {
    if (s[r - 1][0] == kt && s[r][0] == wt) {
      var h = s[r - 1][1], d = s[r][1], g = Uc(h, d), m = Uc(d, h);
      g >= m ? (g >= h.length / 2 || g >= d.length / 2) && (s.splice(r, 0, [
        ct,
        d.substring(0, g)
      ]), s[r - 1][1] = h.substring(
        0,
        h.length - g
      ), s[r + 1][1] = d.substring(g), r++) : (m >= h.length / 2 || m >= d.length / 2) && (s.splice(r, 0, [
        ct,
        h.substring(0, m)
      ]), s[r - 1][0] = wt, s[r - 1][1] = d.substring(
        0,
        d.length - m
      ), s[r + 1][0] = kt, s[r + 1][1] = h.substring(m), r++), r++;
    }
    r++;
  }
}
var Hc = /[^a-zA-Z0-9]/, Wc = /\s/, zc = /[\r\n]/, q_ = /\n\r?\n$/, B_ = /^\r?\n\r?\n/;
function P_(s) {
  function t(m, _) {
    if (!m || !_)
      return 6;
    var E = m.charAt(m.length - 1), w = _.charAt(0), T = E.match(Hc), C = w.match(Hc), L = T && E.match(Wc), k = C && w.match(Wc), I = L && E.match(zc), R = k && w.match(zc), P = I && m.match(q_), U = R && _.match(B_);
    return P || U ? 5 : I || R ? 4 : T && !L && k ? 3 : L || k ? 2 : T || C ? 1 : 0;
  }
  for (var e = 1; e < s.length - 1; ) {
    if (s[e - 1][0] == ct && s[e + 1][0] == ct) {
      var n = s[e - 1][1], i = s[e][1], r = s[e + 1][1], o = Ur(n, i);
      if (o) {
        var l = i.substring(i.length - o);
        n = n.substring(0, n.length - o), i = l + i.substring(0, i.length - o), r = l + r;
      }
      for (var a = n, u = i, h = r, d = t(n, i) + t(i, r); i.charAt(0) === r.charAt(0); ) {
        n += i.charAt(0), i = i.substring(1) + r.charAt(0), r = r.substring(1);
        var g = t(n, i) + t(i, r);
        g >= d && (d = g, a = n, u = i, h = r);
      }
      s[e - 1][1] != a && (a ? s[e - 1][1] = a : (s.splice(e - 1, 1), e--), s[e][1] = u, h ? s[e + 1][1] = h : (s.splice(e + 1, 1), e--));
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
          if (a >= 0 && id(s[a][1])) {
            var u = s[a][1].slice(-1);
            if (s[a][1] = s[a][1].slice(
              0,
              -1
            ), r = u + r, o = u + o, !s[a][1]) {
              s.splice(a, 1), e--;
              var h = a - 1;
              s[h] && s[h][0] === wt && (i++, o = s[h][1] + o, h--), s[h] && s[h][0] === kt && (n++, r = s[h][1] + r, h--), a = h;
            }
          }
          if (nd(s[e][1])) {
            var u = s[e][1].charAt(0);
            s[e][1] = s[e][1].slice(1), r += u, o += u;
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
          var d = i + n;
          r.length === 0 && o.length === 0 ? (s.splice(e - d, d), e = e - d) : r.length === 0 ? (s.splice(e - d, d, [wt, o]), e = e - d + 1) : o.length === 0 ? (s.splice(e - d, d, [kt, r]), e = e - d + 1) : (s.splice(
            e - d,
            d,
            [kt, r],
            [wt, o]
          ), e = e - d + 2);
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
function ed(s) {
  return s >= 55296 && s <= 56319;
}
function sd(s) {
  return s >= 56320 && s <= 57343;
}
function nd(s) {
  return sd(s.charCodeAt(0));
}
function id(s) {
  return ed(s.charCodeAt(s.length - 1));
}
function j_(s) {
  for (var t = [], e = 0; e < s.length; e++)
    s[e][1].length > 0 && t.push(s[e]);
  return t;
}
function Jo(s, t, e, n) {
  return id(s) || nd(n) ? null : j_([
    [ct, s],
    [kt, t],
    [wt, e],
    [ct, n]
  ]);
}
function V_(s, t, e) {
  var n = typeof e == "number" ? { index: e, length: 0 } : e.oldRange, i = typeof e == "number" ? null : e.newRange, r = s.length, o = t.length;
  if (n.length === 0 && (i === null || i.length === 0)) {
    var l = n.index, a = s.slice(0, l), u = s.slice(l), h = i ? i.index : null;
    t: {
      var d = l + o - r;
      if (h !== null && h !== d || d < 0 || d > o)
        break t;
      var g = t.slice(0, d), m = t.slice(d);
      if (m !== u)
        break t;
      var _ = Math.min(l, d), E = a.slice(0, _), w = g.slice(0, _);
      if (E !== w)
        break t;
      var T = a.slice(_), C = g.slice(_);
      return Jo(E, T, C, u);
    }
    t: {
      if (h !== null && h !== l)
        break t;
      var L = l, g = t.slice(0, L), m = t.slice(L);
      if (g !== a)
        break t;
      var k = Math.min(r - L, o - L), I = u.slice(u.length - k), R = m.slice(m.length - k);
      if (I !== R)
        break t;
      var T = u.slice(0, u.length - k), C = m.slice(0, m.length - k);
      return Jo(a, T, C, I);
    }
  }
  if (n.length > 0 && i && i.length === 0)
    t: {
      var E = s.slice(0, n.index), I = s.slice(n.index + n.length), _ = E.length, k = I.length;
      if (o < _ + k)
        break t;
      var w = t.slice(0, _), R = t.slice(o - k);
      if (E !== w || I !== R)
        break t;
      var T = s.slice(_, r - k), C = t.slice(_, o - k);
      return Jo(E, T, C, I);
    }
  return null;
}
function Hr(s, t, e, n) {
  return yi(s, t, e, n, !0);
}
Hr.INSERT = wt;
Hr.DELETE = kt;
Hr.EQUAL = ct;
var F_ = Hr, Ar = { exports: {} };
Ar.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", a = "[object Date]", u = "[object Error]", h = "[object Function]", d = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", _ = "[object Object]", E = "[object Promise]", w = "[object RegExp]", T = "[object Set]", C = "[object String]", L = "[object Symbol]", k = "[object WeakMap]", I = "[object ArrayBuffer]", R = "[object DataView]", P = "[object Float32Array]", U = "[object Float64Array]", J = "[object Int8Array]", tt = "[object Int16Array]", nt = "[object Int32Array]", ot = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Dt = "[object Uint16Array]", Mt = "[object Uint32Array]", ut = /[\\^$.*+?()[\]{}|]/g, _t = /\w*$/, We = /^\[object .+?Constructor\]$/, Gt = /^(?:0|[1-9]\d*)$/, Y = {};
  Y[r] = Y[o] = Y[I] = Y[R] = Y[l] = Y[a] = Y[P] = Y[U] = Y[J] = Y[tt] = Y[nt] = Y[g] = Y[m] = Y[_] = Y[w] = Y[T] = Y[C] = Y[L] = Y[ot] = Y[it] = Y[Dt] = Y[Mt] = !0, Y[u] = Y[h] = Y[k] = !1;
  var gs = typeof ss == "object" && ss && ss.Object === Object && ss, Ae = typeof self == "object" && self && self.Object === Object && self, pt = gs || Ae || Function("return this")(), Yt = t && !t.nodeType && t, K = Yt && !0 && s && !s.nodeType && s, ce = K && K.exports === Yt;
  function ze(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function at(c, f) {
    return c.add(f), c;
  }
  function Ke(c, f) {
    for (var v = -1, N = c ? c.length : 0; ++v < N && f(c[v], v, c) !== !1; )
      ;
    return c;
  }
  function Ks(c, f) {
    for (var v = -1, N = f.length, H = c.length; ++v < N; )
      c[H + v] = f[v];
    return c;
  }
  function Ne(c, f, v, N) {
    for (var H = -1, j = c ? c.length : 0; ++H < j; )
      v = f(v, c[H], H, c);
    return v;
  }
  function ms(c, f) {
    for (var v = -1, N = Array(c); ++v < c; )
      N[v] = f(v);
    return N;
  }
  function bs(c, f) {
    return c == null ? void 0 : c[f];
  }
  function ys(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function Gs(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(N, H) {
      v[++f] = [H, N];
    }), v;
  }
  function Ge(c, f) {
    return function(v) {
      return c(f(v));
    };
  }
  function vs(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(N) {
      v[++f] = N;
    }), v;
  }
  var Dn = Array.prototype, Mn = Function.prototype, Nt = Object.prototype, ue = pt["__core-js_shared__"], _s = function() {
    var c = /[^.]+$/.exec(ue && ue.keys && ue.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Es = Mn.toString, Ot = Nt.hasOwnProperty, Oe = Nt.toString, Ys = RegExp(
    "^" + Es.call(Ot).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), he = ce ? pt.Buffer : void 0, Ce = pt.Symbol, qn = pt.Uint8Array, qt = Ge(Object.getPrototypeOf, Object), Ri = Object.create, Di = Nt.propertyIsEnumerable, Yr = Dn.splice, Bn = Object.getOwnPropertySymbols, Xs = he ? he.isBuffer : void 0, Mi = Ge(Object.keys, Object), Zs = Zt(pt, "DataView"), ws = Zt(pt, "Map"), Xt = Zt(pt, "Promise"), Qs = Zt(pt, "Set"), Pn = Zt(pt, "WeakMap"), Ts = Zt(Object, "create"), jn = Et(Zs), As = Et(ws), Vn = Et(Xt), Fn = Et(Qs), Un = Et(Pn), Ye = Ce ? Ce.prototype : void 0, qi = Ye ? Ye.valueOf : void 0;
  function Se(c) {
    var f = -1, v = c ? c.length : 0;
    for (this.clear(); ++f < v; ) {
      var N = c[f];
      this.set(N[0], N[1]);
    }
  }
  function Xr() {
    this.__data__ = Ts ? Ts(null) : {};
  }
  function Zr(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Qr(c) {
    var f = this.__data__;
    if (Ts) {
      var v = f[c];
      return v === n ? void 0 : v;
    }
    return Ot.call(f, c) ? f[c] : void 0;
  }
  function Bi(c) {
    var f = this.__data__;
    return Ts ? f[c] !== void 0 : Ot.call(f, c);
  }
  function Hn(c, f) {
    var v = this.__data__;
    return v[c] = Ts && f === void 0 ? n : f, this;
  }
  Se.prototype.clear = Xr, Se.prototype.delete = Zr, Se.prototype.get = Qr, Se.prototype.has = Bi, Se.prototype.set = Hn;
  function ht(c) {
    var f = -1, v = c ? c.length : 0;
    for (this.clear(); ++f < v; ) {
      var N = c[f];
      this.set(N[0], N[1]);
    }
  }
  function Jr() {
    this.__data__ = [];
  }
  function to(c) {
    var f = this.__data__, v = tn(f, c);
    if (v < 0)
      return !1;
    var N = f.length - 1;
    return v == N ? f.pop() : Yr.call(f, v, 1), !0;
  }
  function eo(c) {
    var f = this.__data__, v = tn(f, c);
    return v < 0 ? void 0 : f[v][1];
  }
  function so(c) {
    return tn(this.__data__, c) > -1;
  }
  function no(c, f) {
    var v = this.__data__, N = tn(v, c);
    return N < 0 ? v.push([c, f]) : v[N][1] = f, this;
  }
  ht.prototype.clear = Jr, ht.prototype.delete = to, ht.prototype.get = eo, ht.prototype.has = so, ht.prototype.set = no;
  function gt(c) {
    var f = -1, v = c ? c.length : 0;
    for (this.clear(); ++f < v; ) {
      var N = c[f];
      this.set(N[0], N[1]);
    }
  }
  function io() {
    this.__data__ = {
      hash: new Se(),
      map: new (ws || ht)(),
      string: new Se()
    };
  }
  function ro(c) {
    return Os(this, c).delete(c);
  }
  function oo(c) {
    return Os(this, c).get(c);
  }
  function ao(c) {
    return Os(this, c).has(c);
  }
  function lo(c, f) {
    return Os(this, c).set(c, f), this;
  }
  gt.prototype.clear = io, gt.prototype.delete = ro, gt.prototype.get = oo, gt.prototype.has = ao, gt.prototype.set = lo;
  function Ct(c) {
    this.__data__ = new ht(c);
  }
  function co() {
    this.__data__ = new ht();
  }
  function uo(c) {
    return this.__data__.delete(c);
  }
  function ho(c) {
    return this.__data__.get(c);
  }
  function fo(c) {
    return this.__data__.has(c);
  }
  function po(c, f) {
    var v = this.__data__;
    if (v instanceof ht) {
      var N = v.__data__;
      if (!ws || N.length < e - 1)
        return N.push([c, f]), this;
      v = this.__data__ = new gt(N);
    }
    return v.set(c, f), this;
  }
  Ct.prototype.clear = co, Ct.prototype.delete = uo, Ct.prototype.get = ho, Ct.prototype.has = fo, Ct.prototype.set = po;
  function Js(c, f) {
    var v = Gn(c) || sn(c) ? ms(c.length, String) : [], N = v.length, H = !!N;
    for (var j in c)
      Ot.call(c, j) && !(H && (j == "length" || So(j, N))) && v.push(j);
    return v;
  }
  function Pi(c, f, v) {
    var N = c[f];
    (!(Ot.call(c, f) && Hi(N, v)) || v === void 0 && !(f in c)) && (c[f] = v);
  }
  function tn(c, f) {
    for (var v = c.length; v--; )
      if (Hi(c[v][0], f))
        return v;
    return -1;
  }
  function de(c, f) {
    return c && Kn(f, Xn(f), c);
  }
  function Wn(c, f, v, N, H, j, Z) {
    var X;
    if (N && (X = j ? N(c, H, j, Z) : N(c)), X !== void 0)
      return X;
    if (!pe(c))
      return c;
    var rt = Gn(c);
    if (rt) {
      if (X = Oo(c), !f)
        return To(c, X);
    } else {
      var Q = ke(c), mt = Q == h || Q == d;
      if (Wi(c))
        return en(c, f);
      if (Q == _ || Q == r || mt && !j) {
        if (ys(c))
          return j ? c : {};
        if (X = fe(mt ? {} : c), !f)
          return Ao(c, de(X, c));
      } else {
        if (!Y[Q])
          return j ? c : {};
        X = Co(c, Q, Wn, f);
      }
    }
    Z || (Z = new Ct());
    var St = Z.get(c);
    if (St)
      return St;
    if (Z.set(c, X), !rt)
      var lt = v ? No(c) : Xn(c);
    return Ke(lt || c, function(bt, dt) {
      lt && (dt = bt, bt = c[dt]), Pi(X, dt, Wn(bt, f, v, N, dt, c, Z));
    }), X;
  }
  function go(c) {
    return pe(c) ? Ri(c) : {};
  }
  function mo(c, f, v) {
    var N = f(c);
    return Gn(c) ? N : Ks(N, v(c));
  }
  function bo(c) {
    return Oe.call(c);
  }
  function yo(c) {
    if (!pe(c) || ko(c))
      return !1;
    var f = Yn(c) || ys(c) ? Ys : We;
    return f.test(Et(c));
  }
  function vo(c) {
    if (!Fi(c))
      return Mi(c);
    var f = [];
    for (var v in Object(c))
      Ot.call(c, v) && v != "constructor" && f.push(v);
    return f;
  }
  function en(c, f) {
    if (f)
      return c.slice();
    var v = new c.constructor(c.length);
    return c.copy(v), v;
  }
  function zn(c) {
    var f = new c.constructor(c.byteLength);
    return new qn(f).set(new qn(c)), f;
  }
  function Ns(c, f) {
    var v = f ? zn(c.buffer) : c.buffer;
    return new c.constructor(v, c.byteOffset, c.byteLength);
  }
  function ji(c, f, v) {
    var N = f ? v(Gs(c), !0) : Gs(c);
    return Ne(N, ze, new c.constructor());
  }
  function Vi(c) {
    var f = new c.constructor(c.source, _t.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function _o(c, f, v) {
    var N = f ? v(vs(c), !0) : vs(c);
    return Ne(N, at, new c.constructor());
  }
  function Eo(c) {
    return qi ? Object(qi.call(c)) : {};
  }
  function wo(c, f) {
    var v = f ? zn(c.buffer) : c.buffer;
    return new c.constructor(v, c.byteOffset, c.length);
  }
  function To(c, f) {
    var v = -1, N = c.length;
    for (f || (f = Array(N)); ++v < N; )
      f[v] = c[v];
    return f;
  }
  function Kn(c, f, v, N) {
    v || (v = {});
    for (var H = -1, j = f.length; ++H < j; ) {
      var Z = f[H], X = void 0;
      Pi(v, Z, X === void 0 ? c[Z] : X);
    }
    return v;
  }
  function Ao(c, f) {
    return Kn(c, Le(c), f);
  }
  function No(c) {
    return mo(c, Xn, Le);
  }
  function Os(c, f) {
    var v = c.__data__;
    return Lo(f) ? v[typeof f == "string" ? "string" : "hash"] : v.map;
  }
  function Zt(c, f) {
    var v = bs(c, f);
    return yo(v) ? v : void 0;
  }
  var Le = Bn ? Ge(Bn, Object) : Io, ke = bo;
  (Zs && ke(new Zs(new ArrayBuffer(1))) != R || ws && ke(new ws()) != g || Xt && ke(Xt.resolve()) != E || Qs && ke(new Qs()) != T || Pn && ke(new Pn()) != k) && (ke = function(c) {
    var f = Oe.call(c), v = f == _ ? c.constructor : void 0, N = v ? Et(v) : void 0;
    if (N)
      switch (N) {
        case jn:
          return R;
        case As:
          return g;
        case Vn:
          return E;
        case Fn:
          return T;
        case Un:
          return k;
      }
    return f;
  });
  function Oo(c) {
    var f = c.length, v = c.constructor(f);
    return f && typeof c[0] == "string" && Ot.call(c, "index") && (v.index = c.index, v.input = c.input), v;
  }
  function fe(c) {
    return typeof c.constructor == "function" && !Fi(c) ? go(qt(c)) : {};
  }
  function Co(c, f, v, N) {
    var H = c.constructor;
    switch (f) {
      case I:
        return zn(c);
      case l:
      case a:
        return new H(+c);
      case R:
        return Ns(c, N);
      case P:
      case U:
      case J:
      case tt:
      case nt:
      case ot:
      case it:
      case Dt:
      case Mt:
        return wo(c, N);
      case g:
        return ji(c, N, v);
      case m:
      case C:
        return new H(c);
      case w:
        return Vi(c);
      case T:
        return _o(c, N, v);
      case L:
        return Eo(c);
    }
  }
  function So(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || Gt.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function Lo(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function ko(c) {
    return !!_s && _s in c;
  }
  function Fi(c) {
    var f = c && c.constructor, v = typeof f == "function" && f.prototype || Nt;
    return c === v;
  }
  function Et(c) {
    if (c != null) {
      try {
        return Es.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Ui(c) {
    return Wn(c, !0, !0);
  }
  function Hi(c, f) {
    return c === f || c !== c && f !== f;
  }
  function sn(c) {
    return xo(c) && Ot.call(c, "callee") && (!Di.call(c, "callee") || Oe.call(c) == r);
  }
  var Gn = Array.isArray;
  function nn(c) {
    return c != null && zi(c.length) && !Yn(c);
  }
  function xo(c) {
    return Ki(c) && nn(c);
  }
  var Wi = Xs || $o;
  function Yn(c) {
    var f = pe(c) ? Oe.call(c) : "";
    return f == h || f == d;
  }
  function zi(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function pe(c) {
    var f = typeof c;
    return !!c && (f == "object" || f == "function");
  }
  function Ki(c) {
    return !!c && typeof c == "object";
  }
  function Xn(c) {
    return nn(c) ? Js(c) : vo(c);
  }
  function Io() {
    return [];
  }
  function $o() {
    return !1;
  }
  s.exports = Ui;
})(Ar, Ar.exports);
var rd = Ar.exports, Nr = { exports: {} };
Nr.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, l = "[object Arguments]", a = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", d = "[object Date]", g = "[object Error]", m = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", w = "[object Number]", T = "[object Null]", C = "[object Object]", L = "[object Promise]", k = "[object Proxy]", I = "[object RegExp]", R = "[object Set]", P = "[object String]", U = "[object Symbol]", J = "[object Undefined]", tt = "[object WeakMap]", nt = "[object ArrayBuffer]", ot = "[object DataView]", it = "[object Float32Array]", Dt = "[object Float64Array]", Mt = "[object Int8Array]", ut = "[object Int16Array]", _t = "[object Int32Array]", We = "[object Uint8Array]", Gt = "[object Uint8ClampedArray]", Y = "[object Uint16Array]", gs = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, pt = /^\[object .+?Constructor\]$/, Yt = /^(?:0|[1-9]\d*)$/, K = {};
  K[it] = K[Dt] = K[Mt] = K[ut] = K[_t] = K[We] = K[Gt] = K[Y] = K[gs] = !0, K[l] = K[a] = K[nt] = K[h] = K[ot] = K[d] = K[g] = K[m] = K[E] = K[w] = K[C] = K[I] = K[R] = K[P] = K[tt] = !1;
  var ce = typeof ss == "object" && ss && ss.Object === Object && ss, ze = typeof self == "object" && self && self.Object === Object && self, at = ce || ze || Function("return this")(), Ke = t && !t.nodeType && t, Ks = Ke && !0 && s && !s.nodeType && s, Ne = Ks && Ks.exports === Ke, ms = Ne && ce.process, bs = function() {
    try {
      return ms && ms.binding && ms.binding("util");
    } catch {
    }
  }(), ys = bs && bs.isTypedArray;
  function Gs(c, f) {
    for (var v = -1, N = c == null ? 0 : c.length, H = 0, j = []; ++v < N; ) {
      var Z = c[v];
      f(Z, v, c) && (j[H++] = Z);
    }
    return j;
  }
  function Ge(c, f) {
    for (var v = -1, N = f.length, H = c.length; ++v < N; )
      c[H + v] = f[v];
    return c;
  }
  function vs(c, f) {
    for (var v = -1, N = c == null ? 0 : c.length; ++v < N; )
      if (f(c[v], v, c))
        return !0;
    return !1;
  }
  function Dn(c, f) {
    for (var v = -1, N = Array(c); ++v < c; )
      N[v] = f(v);
    return N;
  }
  function Mn(c) {
    return function(f) {
      return c(f);
    };
  }
  function Nt(c, f) {
    return c.has(f);
  }
  function ue(c, f) {
    return c == null ? void 0 : c[f];
  }
  function _s(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(N, H) {
      v[++f] = [H, N];
    }), v;
  }
  function Es(c, f) {
    return function(v) {
      return c(f(v));
    };
  }
  function Ot(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(N) {
      v[++f] = N;
    }), v;
  }
  var Oe = Array.prototype, Ys = Function.prototype, he = Object.prototype, Ce = at["__core-js_shared__"], qn = Ys.toString, qt = he.hasOwnProperty, Ri = function() {
    var c = /[^.]+$/.exec(Ce && Ce.keys && Ce.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Di = he.toString, Yr = RegExp(
    "^" + qn.call(qt).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Bn = Ne ? at.Buffer : void 0, Xs = at.Symbol, Mi = at.Uint8Array, Zs = he.propertyIsEnumerable, ws = Oe.splice, Xt = Xs ? Xs.toStringTag : void 0, Qs = Object.getOwnPropertySymbols, Pn = Bn ? Bn.isBuffer : void 0, Ts = Es(Object.keys, Object), jn = Le(at, "DataView"), As = Le(at, "Map"), Vn = Le(at, "Promise"), Fn = Le(at, "Set"), Un = Le(at, "WeakMap"), Ye = Le(Object, "create"), qi = Et(jn), Se = Et(As), Xr = Et(Vn), Zr = Et(Fn), Qr = Et(Un), Bi = Xs ? Xs.prototype : void 0, Hn = Bi ? Bi.valueOf : void 0;
  function ht(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++f < v; ) {
      var N = c[f];
      this.set(N[0], N[1]);
    }
  }
  function Jr() {
    this.__data__ = Ye ? Ye(null) : {}, this.size = 0;
  }
  function to(c) {
    var f = this.has(c) && delete this.__data__[c];
    return this.size -= f ? 1 : 0, f;
  }
  function eo(c) {
    var f = this.__data__;
    if (Ye) {
      var v = f[c];
      return v === n ? void 0 : v;
    }
    return qt.call(f, c) ? f[c] : void 0;
  }
  function so(c) {
    var f = this.__data__;
    return Ye ? f[c] !== void 0 : qt.call(f, c);
  }
  function no(c, f) {
    var v = this.__data__;
    return this.size += this.has(c) ? 0 : 1, v[c] = Ye && f === void 0 ? n : f, this;
  }
  ht.prototype.clear = Jr, ht.prototype.delete = to, ht.prototype.get = eo, ht.prototype.has = so, ht.prototype.set = no;
  function gt(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++f < v; ) {
      var N = c[f];
      this.set(N[0], N[1]);
    }
  }
  function io() {
    this.__data__ = [], this.size = 0;
  }
  function ro(c) {
    var f = this.__data__, v = en(f, c);
    if (v < 0)
      return !1;
    var N = f.length - 1;
    return v == N ? f.pop() : ws.call(f, v, 1), --this.size, !0;
  }
  function oo(c) {
    var f = this.__data__, v = en(f, c);
    return v < 0 ? void 0 : f[v][1];
  }
  function ao(c) {
    return en(this.__data__, c) > -1;
  }
  function lo(c, f) {
    var v = this.__data__, N = en(v, c);
    return N < 0 ? (++this.size, v.push([c, f])) : v[N][1] = f, this;
  }
  gt.prototype.clear = io, gt.prototype.delete = ro, gt.prototype.get = oo, gt.prototype.has = ao, gt.prototype.set = lo;
  function Ct(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++f < v; ) {
      var N = c[f];
      this.set(N[0], N[1]);
    }
  }
  function co() {
    this.size = 0, this.__data__ = {
      hash: new ht(),
      map: new (As || gt)(),
      string: new ht()
    };
  }
  function uo(c) {
    var f = Zt(this, c).delete(c);
    return this.size -= f ? 1 : 0, f;
  }
  function ho(c) {
    return Zt(this, c).get(c);
  }
  function fo(c) {
    return Zt(this, c).has(c);
  }
  function po(c, f) {
    var v = Zt(this, c), N = v.size;
    return v.set(c, f), this.size += v.size == N ? 0 : 1, this;
  }
  Ct.prototype.clear = co, Ct.prototype.delete = uo, Ct.prototype.get = ho, Ct.prototype.has = fo, Ct.prototype.set = po;
  function Js(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.__data__ = new Ct(); ++f < v; )
      this.add(c[f]);
  }
  function Pi(c) {
    return this.__data__.set(c, n), this;
  }
  function tn(c) {
    return this.__data__.has(c);
  }
  Js.prototype.add = Js.prototype.push = Pi, Js.prototype.has = tn;
  function de(c) {
    var f = this.__data__ = new gt(c);
    this.size = f.size;
  }
  function Wn() {
    this.__data__ = new gt(), this.size = 0;
  }
  function go(c) {
    var f = this.__data__, v = f.delete(c);
    return this.size = f.size, v;
  }
  function mo(c) {
    return this.__data__.get(c);
  }
  function bo(c) {
    return this.__data__.has(c);
  }
  function yo(c, f) {
    var v = this.__data__;
    if (v instanceof gt) {
      var N = v.__data__;
      if (!As || N.length < e - 1)
        return N.push([c, f]), this.size = ++v.size, this;
      v = this.__data__ = new Ct(N);
    }
    return v.set(c, f), this.size = v.size, this;
  }
  de.prototype.clear = Wn, de.prototype.delete = go, de.prototype.get = mo, de.prototype.has = bo, de.prototype.set = yo;
  function vo(c, f) {
    var v = sn(c), N = !v && Hi(c), H = !v && !N && nn(c), j = !v && !N && !H && Ki(c), Z = v || N || H || j, X = Z ? Dn(c.length, String) : [], rt = X.length;
    for (var Q in c)
      qt.call(c, Q) && !(Z && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Q == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      H && (Q == "offset" || Q == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || // Skip index properties.
      Co(Q, rt))) && X.push(Q);
    return X;
  }
  function en(c, f) {
    for (var v = c.length; v--; )
      if (Ui(c[v][0], f))
        return v;
    return -1;
  }
  function zn(c, f, v) {
    var N = f(c);
    return sn(c) ? N : Ge(N, v(c));
  }
  function Ns(c) {
    return c == null ? c === void 0 ? J : T : Xt && Xt in Object(c) ? ke(c) : Fi(c);
  }
  function ji(c) {
    return pe(c) && Ns(c) == l;
  }
  function Vi(c, f, v, N, H) {
    return c === f ? !0 : c == null || f == null || !pe(c) && !pe(f) ? c !== c && f !== f : _o(c, f, v, N, Vi, H);
  }
  function _o(c, f, v, N, H, j) {
    var Z = sn(c), X = sn(f), rt = Z ? a : fe(c), Q = X ? a : fe(f);
    rt = rt == l ? C : rt, Q = Q == l ? C : Q;
    var mt = rt == C, St = Q == C, lt = rt == Q;
    if (lt && nn(c)) {
      if (!nn(f))
        return !1;
      Z = !0, mt = !1;
    }
    if (lt && !mt)
      return j || (j = new de()), Z || Ki(c) ? Kn(c, f, v, N, H, j) : Ao(c, f, rt, v, N, H, j);
    if (!(v & i)) {
      var bt = mt && qt.call(c, "__wrapped__"), dt = St && qt.call(f, "__wrapped__");
      if (bt || dt) {
        var Xe = bt ? c.value() : c, xe = dt ? f.value() : f;
        return j || (j = new de()), H(Xe, xe, v, N, j);
      }
    }
    return lt ? (j || (j = new de()), No(c, f, v, N, H, j)) : !1;
  }
  function Eo(c) {
    if (!zi(c) || Lo(c))
      return !1;
    var f = Wi(c) ? Yr : pt;
    return f.test(Et(c));
  }
  function wo(c) {
    return pe(c) && Yn(c.length) && !!K[Ns(c)];
  }
  function To(c) {
    if (!ko(c))
      return Ts(c);
    var f = [];
    for (var v in Object(c))
      qt.call(c, v) && v != "constructor" && f.push(v);
    return f;
  }
  function Kn(c, f, v, N, H, j) {
    var Z = v & i, X = c.length, rt = f.length;
    if (X != rt && !(Z && rt > X))
      return !1;
    var Q = j.get(c);
    if (Q && j.get(f))
      return Q == f;
    var mt = -1, St = !0, lt = v & r ? new Js() : void 0;
    for (j.set(c, f), j.set(f, c); ++mt < X; ) {
      var bt = c[mt], dt = f[mt];
      if (N)
        var Xe = Z ? N(dt, bt, mt, f, c, j) : N(bt, dt, mt, c, f, j);
      if (Xe !== void 0) {
        if (Xe)
          continue;
        St = !1;
        break;
      }
      if (lt) {
        if (!vs(f, function(xe, Cs) {
          if (!Nt(lt, Cs) && (bt === xe || H(bt, xe, v, N, j)))
            return lt.push(Cs);
        })) {
          St = !1;
          break;
        }
      } else if (!(bt === dt || H(bt, dt, v, N, j))) {
        St = !1;
        break;
      }
    }
    return j.delete(c), j.delete(f), St;
  }
  function Ao(c, f, v, N, H, j, Z) {
    switch (v) {
      case ot:
        if (c.byteLength != f.byteLength || c.byteOffset != f.byteOffset)
          return !1;
        c = c.buffer, f = f.buffer;
      case nt:
        return !(c.byteLength != f.byteLength || !j(new Mi(c), new Mi(f)));
      case h:
      case d:
      case w:
        return Ui(+c, +f);
      case g:
        return c.name == f.name && c.message == f.message;
      case I:
      case P:
        return c == f + "";
      case E:
        var X = _s;
      case R:
        var rt = N & i;
        if (X || (X = Ot), c.size != f.size && !rt)
          return !1;
        var Q = Z.get(c);
        if (Q)
          return Q == f;
        N |= r, Z.set(c, f);
        var mt = Kn(X(c), X(f), N, H, j, Z);
        return Z.delete(c), mt;
      case U:
        if (Hn)
          return Hn.call(c) == Hn.call(f);
    }
    return !1;
  }
  function No(c, f, v, N, H, j) {
    var Z = v & i, X = Os(c), rt = X.length, Q = Os(f), mt = Q.length;
    if (rt != mt && !Z)
      return !1;
    for (var St = rt; St--; ) {
      var lt = X[St];
      if (!(Z ? lt in f : qt.call(f, lt)))
        return !1;
    }
    var bt = j.get(c);
    if (bt && j.get(f))
      return bt == f;
    var dt = !0;
    j.set(c, f), j.set(f, c);
    for (var Xe = Z; ++St < rt; ) {
      lt = X[St];
      var xe = c[lt], Cs = f[lt];
      if (N)
        var Il = Z ? N(Cs, xe, lt, f, c, j) : N(xe, Cs, lt, c, f, j);
      if (!(Il === void 0 ? xe === Cs || H(xe, Cs, v, N, j) : Il)) {
        dt = !1;
        break;
      }
      Xe || (Xe = lt == "constructor");
    }
    if (dt && !Xe) {
      var Gi = c.constructor, Yi = f.constructor;
      Gi != Yi && "constructor" in c && "constructor" in f && !(typeof Gi == "function" && Gi instanceof Gi && typeof Yi == "function" && Yi instanceof Yi) && (dt = !1);
    }
    return j.delete(c), j.delete(f), dt;
  }
  function Os(c) {
    return zn(c, Xn, Oo);
  }
  function Zt(c, f) {
    var v = c.__data__;
    return So(f) ? v[typeof f == "string" ? "string" : "hash"] : v.map;
  }
  function Le(c, f) {
    var v = ue(c, f);
    return Eo(v) ? v : void 0;
  }
  function ke(c) {
    var f = qt.call(c, Xt), v = c[Xt];
    try {
      c[Xt] = void 0;
      var N = !0;
    } catch {
    }
    var H = Di.call(c);
    return N && (f ? c[Xt] = v : delete c[Xt]), H;
  }
  var Oo = Qs ? function(c) {
    return c == null ? [] : (c = Object(c), Gs(Qs(c), function(f) {
      return Zs.call(c, f);
    }));
  } : Io, fe = Ns;
  (jn && fe(new jn(new ArrayBuffer(1))) != ot || As && fe(new As()) != E || Vn && fe(Vn.resolve()) != L || Fn && fe(new Fn()) != R || Un && fe(new Un()) != tt) && (fe = function(c) {
    var f = Ns(c), v = f == C ? c.constructor : void 0, N = v ? Et(v) : "";
    if (N)
      switch (N) {
        case qi:
          return ot;
        case Se:
          return E;
        case Xr:
          return L;
        case Zr:
          return R;
        case Qr:
          return tt;
      }
    return f;
  });
  function Co(c, f) {
    return f = f ?? o, !!f && (typeof c == "number" || Yt.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function So(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function Lo(c) {
    return !!Ri && Ri in c;
  }
  function ko(c) {
    var f = c && c.constructor, v = typeof f == "function" && f.prototype || he;
    return c === v;
  }
  function Fi(c) {
    return Di.call(c);
  }
  function Et(c) {
    if (c != null) {
      try {
        return qn.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Ui(c, f) {
    return c === f || c !== c && f !== f;
  }
  var Hi = ji(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ji : function(c) {
    return pe(c) && qt.call(c, "callee") && !Zs.call(c, "callee");
  }, sn = Array.isArray;
  function Gn(c) {
    return c != null && Yn(c.length) && !Wi(c);
  }
  var nn = Pn || $o;
  function xo(c, f) {
    return Vi(c, f);
  }
  function Wi(c) {
    if (!zi(c))
      return !1;
    var f = Ns(c);
    return f == m || f == _ || f == u || f == k;
  }
  function Yn(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= o;
  }
  function zi(c) {
    var f = typeof c;
    return c != null && (f == "object" || f == "function");
  }
  function pe(c) {
    return c != null && typeof c == "object";
  }
  var Ki = ys ? Mn(ys) : wo;
  function Xn(c) {
    return Gn(c) ? vo(c) : To(c);
  }
  function Io() {
    return [];
  }
  function $o() {
    return !1;
  }
  s.exports = xo;
})(Nr, Nr.exports);
var od = Nr.exports, _l = {};
Object.defineProperty(_l, "__esModule", { value: !0 });
const U_ = rd, H_ = od;
var La;
(function(s) {
  function t(r = {}, o = {}, l = !1) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    let a = U_(o);
    l || (a = Object.keys(a).reduce((u, h) => (a[h] != null && (u[h] = a[h]), u), {}));
    for (const u in r)
      r[u] !== void 0 && o[u] === void 0 && (a[u] = r[u]);
    return Object.keys(a).length > 0 ? a : void 0;
  }
  s.compose = t;
  function e(r = {}, o = {}) {
    typeof r != "object" && (r = {}), typeof o != "object" && (o = {});
    const l = Object.keys(r).concat(Object.keys(o)).reduce((a, u) => (H_(r[u], o[u]) || (a[u] = o[u] === void 0 ? null : o[u]), a), {});
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
})(La || (La = {}));
_l.default = La;
var Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
var ka;
(function(s) {
  function t(e) {
    return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
  }
  s.length = t;
})(ka || (ka = {}));
Wr.default = ka;
var El = {};
Object.defineProperty(El, "__esModule", { value: !0 });
const Kc = Wr;
class W_ {
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
El.default = W_;
(function(s, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
  const e = F_, n = rd, i = od, r = _l;
  t.AttributeMap = r.default;
  const o = Wr;
  t.Op = o.default;
  const l = El;
  t.OpIterator = l.default;
  const a = "\0", u = (d, g) => {
    if (typeof d != "object" || d === null)
      throw new Error(`cannot retain a ${typeof d}`);
    if (typeof g != "object" || g === null)
      throw new Error(`cannot retain a ${typeof g}`);
    const m = Object.keys(d)[0];
    if (!m || m !== Object.keys(g)[0])
      throw new Error(`embed types not matched: ${m} != ${Object.keys(g)[0]}`);
    return [m, d[m], g[m]];
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
      const _ = [], E = new l.default(this.ops);
      let w = 0;
      for (; w < m && E.hasNext(); ) {
        let T;
        w < g ? T = E.next(g - w) : (T = E.next(m - w), _.push(T)), w += o.default.length(T);
      }
      return new h(_);
    }
    compose(g) {
      const m = new l.default(this.ops), _ = new l.default(g.ops), E = [], w = _.peek();
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
              const P = L.retain == null ? "insert" : "retain", [U, J, tt] = u(L[P], k.retain), nt = h.getHandler(U);
              I[P] = {
                [U]: nt.compose(J, tt, P === "retain")
              };
            }
            const R = r.default.compose(L.attributes, k.attributes, typeof L.retain == "number");
            if (R && (I.attributes = R), T.push(I), !_.hasNext() && i(T.ops[T.ops.length - 1], I)) {
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
      }).join("")), E = new h(), w = e(_[0], _[1], m, !0), T = new l.default(this.ops), C = new l.default(g.ops);
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
              const R = T.next(I), P = C.next(I);
              i(R.insert, P.insert) ? E.retain(I, r.default.diff(R.attributes, P.attributes)) : E.push(P).delete(I);
              break;
          }
          k -= I;
        }
      }), E.chop();
    }
    eachLine(g, m = `
`) {
      const _ = new l.default(this.ops);
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
            const w = g.slice(_, _ + 1), T = new l.default(w.ops).next(), [C, L, k] = u(E.retain, T.insert), I = h.getHandler(C);
            return m.retain({ [C]: I.invert(L, k) }, r.default.invert(E.attributes, T.attributes)), _ + 1;
          }
        }
        return _;
      }, 0), m.chop();
    }
    transform(g, m = !1) {
      if (m = !!m, typeof g == "number")
        return this.transformPosition(g, m);
      const _ = g, E = new l.default(this.ops), w = new l.default(_.ops), T = new h();
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
            const I = L.retain, R = k.retain;
            let P = typeof R == "object" && R !== null ? R : C;
            if (typeof I == "object" && I !== null && typeof R == "object" && R !== null) {
              const U = Object.keys(I)[0];
              if (U === Object.keys(R)[0]) {
                const J = h.getHandler(U);
                J && (P = {
                  [U]: J.transform(I[U], R[U], m)
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
  h.Op = o.default, h.OpIterator = l.default, h.AttributeMap = r.default, h.handlers = {}, t.default = h, s.exports = h, s.exports.default = h;
})(Sa, Sa.exports);
var Ut = Sa.exports;
const q = /* @__PURE__ */ td(Ut);
class ae extends Rt {
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
function zr(s) {
  return s.replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t]);
}
const ge = class ge extends ml {
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
D(ge, "allowedChildren", [ge, ae, Rt, ie]), // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
D(ge, "order", [
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
const Gc = 1;
class ft extends bi {
  constructor() {
    super(...arguments);
    D(this, "cache", {});
  }
  delta() {
    return this.cache.delta == null && (this.cache.delta = ad(this)), this.cache.delta;
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
    r.reduce((a, u) => (l = l.split(a, !0), l.insertAt(0, u), u.length), e + o.length);
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
ft.allowedChildren = [ae, we, Rt, ie];
class Ft extends Rt {
  attach() {
    super.attach(), this.attributes = new Vr(this.domNode);
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
      const u = this.scroll.create(ft.blotName);
      return u.insertAt(0, a), u;
    }), l = this.split(t);
    o.forEach((a) => {
      this.parent.insertBefore(a, l);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), l);
  }
}
Ft.scope = B.BLOCK_BLOT;
function ad(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return s.descendants(yt).reduce((e, n) => n.length() === 0 ? e : e.insert(n.value(), jt(n, {}, t)), new q()).insert(`
`, jt(s));
}
function jt(s) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return s == null || ("formats" in s && typeof s.formats == "function" && (t = {
    ...t,
    ...s.formats()
  }, e && delete t["code-token"]), s.parent == null || s.parent.statics.blotName === "scroll" || s.parent.statics.scope !== s.statics.scope) ? t : jt(s.parent, t, e);
}
const Pt = class Pt extends Rt {
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
      const u = document.createTextNode(l);
      a = this.scroll.create(u), this.parent.insertBefore(a, this);
    }
    if (this.remove(), t) {
      const u = (g, m) => e && g === e.domNode ? m : g === o ? n + m - 1 : i && g === i.domNode ? n + l.length + m : null, h = u(t.start.node, t.start.offset), d = u(t.end.node, t.end.offset);
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
let Sn = Pt;
var ld = { exports: {} };
(function(s) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
  function i(a, u, h) {
    this.fn = a, this.context = u, this.once = h || !1;
  }
  function r(a, u, h, d, g) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var m = new i(h, d || a, g), _ = e ? e + u : u;
    return a._events[_] ? a._events[_].fn ? a._events[_] = [a._events[_], m] : a._events[_].push(m) : (a._events[_] = m, a._eventsCount++), a;
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
      t.call(h, d) && u.push(e ? d.slice(1) : d);
    return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(h)) : u;
  }, l.prototype.listeners = function(u) {
    var h = e ? e + u : u, d = this._events[h];
    if (!d) return [];
    if (d.fn) return [d.fn];
    for (var g = 0, m = d.length, _ = new Array(m); g < m; g++)
      _[g] = d[g].fn;
    return _;
  }, l.prototype.listenerCount = function(u) {
    var h = e ? e + u : u, d = this._events[h];
    return d ? d.fn ? 1 : d.length : 0;
  }, l.prototype.emit = function(u, h, d, g, m, _) {
    var E = e ? e + u : u;
    if (!this._events[E]) return !1;
    var w = this._events[E], T = arguments.length, C, L;
    if (w.fn) {
      switch (w.once && this.removeListener(u, w.fn, void 0, !0), T) {
        case 1:
          return w.fn.call(w.context), !0;
        case 2:
          return w.fn.call(w.context, h), !0;
        case 3:
          return w.fn.call(w.context, h, d), !0;
        case 4:
          return w.fn.call(w.context, h, d, g), !0;
        case 5:
          return w.fn.call(w.context, h, d, g, m), !0;
        case 6:
          return w.fn.call(w.context, h, d, g, m, _), !0;
      }
      for (L = 1, C = new Array(T - 1); L < T; L++)
        C[L - 1] = arguments[L];
      w.fn.apply(w.context, C);
    } else {
      var k = w.length, I;
      for (L = 0; L < k; L++)
        switch (w[L].once && this.removeListener(u, w[L].fn, void 0, !0), T) {
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
            w[L].fn.call(w[L].context, h, d, g);
            break;
          default:
            if (!C) for (I = 1, C = new Array(T - 1); I < T; I++)
              C[I - 1] = arguments[I];
            w[L].fn.apply(w[L].context, C);
        }
    }
    return !0;
  }, l.prototype.on = function(u, h, d) {
    return r(this, u, h, d, !1);
  }, l.prototype.once = function(u, h, d) {
    return r(this, u, h, d, !0);
  }, l.prototype.removeListener = function(u, h, d, g) {
    var m = e ? e + u : u;
    if (!this._events[m]) return this;
    if (!h)
      return o(this, m), this;
    var _ = this._events[m];
    if (_.fn)
      _.fn === h && (!g || _.once) && (!d || _.context === d) && o(this, m);
    else {
      for (var E = 0, w = [], T = _.length; E < T; E++)
        (_[E].fn !== h || g && !_[E].once || d && _[E].context !== d) && w.push(_[E]);
      w.length ? this._events[m] = w.length === 1 ? w[0] : w : o(this, m);
    }
    return this;
  }, l.prototype.removeAllListeners = function(u) {
    var h;
    return u ? (h = e ? e + u : u, this._events[h] && o(this, h)) : (this._events = new n(), this._eventsCount = 0), this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = e, l.EventEmitter = l, s.exports = l;
})(ld);
var z_ = ld.exports;
const K_ = /* @__PURE__ */ td(z_), xa = /* @__PURE__ */ new WeakMap(), Ia = ["error", "warn", "log", "info"];
let $a = "warn";
function cd(s) {
  if ($a && Ia.indexOf(s) <= Ia.indexOf($a)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      e[n - 1] = arguments[n];
    console[s](...e);
  }
}
function Ue(s) {
  return Ia.reduce((t, e) => (t[e] = cd.bind(console, e, s), t), {});
}
Ue.level = (s) => {
  $a = s;
};
cd.level = Ue.level;
const ta = Ue("quill:events"), G_ = ["selectionchange", "mousedown", "mouseup", "click"];
G_.forEach((s) => {
  document.addEventListener(s, function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = xa.get(i);
      r && r.emitter && r.emitter.handleDOM(...e);
    });
  });
});
class M extends K_ {
  constructor() {
    super(), this.domListeners = {}, this.on("error", ta.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return ta.log.call(ta, ...e), super.emit(...e);
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
const ea = Ue("quill:selection");
class Bs {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class Y_ {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Bs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
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
      const [h] = this.scroll.leaf(t + 1);
      if (h) {
        const [d] = this.scroll.line(t), [g] = this.scroll.line(t + 1);
        d === g && (r = h, o = 0);
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
    return ea.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const e = this.getNativeRange();
    return e == null ? [null, null] : [this.normalizedToRange(e), e];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && sa(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const e = [[t.start.node, t.start.offset]];
    t.native.collapsed || e.push([t.end.node, t.end.offset]);
    const n = e.map((o) => {
      const [l, a] = o, u = this.scroll.find(l, !0), h = u.offset(this.scroll);
      return a === 0 ? h : u instanceof yt ? h + u.index(l, a) : h + u.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Bs(r, i - r);
  }
  normalizeNative(t) {
    if (!sa(this.root, t.startContainer) || !t.collapsed && !sa(this.root, t.endContainer))
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
    if (ea.info("setNativeRange", t, e, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
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
    if (typeof e == "string" && (n = e, e = !1), ea.info("setRange", t), t != null) {
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
      const r = [M.events.SELECTION_CHANGE, bn(this.lastRange), bn(e), t];
      this.emitter.emit(M.events.EDITOR_CHANGE, ...r), t !== M.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function sa(s, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return s.contains(t);
}
const X_ = /^[ -~]*$/;
class Z_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const n = Yc(t), i = new q();
    return J_(n.ops.slice()).reduce((o, l) => {
      const a = Ut.Op.length(l);
      let u = l.attributes || {}, h = !1, d = !1;
      if (l.insert != null) {
        if (i.retain(a), typeof l.insert == "string") {
          const _ = l.insert;
          d = !_.endsWith(`
`) && (e <= o || !!this.scroll.descendant(Ft, o)[0]), this.scroll.insertAt(o, _);
          const [E, w] = this.scroll.line(o);
          let T = rs({}, jt(E));
          if (E instanceof ft) {
            const [C] = E.descendant(yt, w);
            C && (T = rs(T, jt(C)));
          }
          u = Ut.AttributeMap.diff(T, u) || {};
        } else if (typeof l.insert == "object") {
          const _ = Object.keys(l.insert)[0];
          if (_ == null) return o;
          const E = this.scroll.query(_, B.INLINE) != null;
          if (E)
            (e <= o || this.scroll.descendant(Ft, o)[0]) && (d = !0);
          else if (o > 0) {
            const [w, T] = this.scroll.descendant(yt, o - 1);
            w instanceof ie ? w.value()[T] !== `
` && (h = !0) : w instanceof Rt && w.statics.scope === B.INLINE_BLOT && (h = !0);
          }
          if (this.scroll.insertAt(o, _, l.insert[_]), E) {
            const [w] = this.scroll.descendant(yt, o);
            if (w) {
              const T = rs({}, jt(w));
              u = Ut.AttributeMap.diff(T, u) || {};
            }
          }
        }
        e += a;
      } else if (i.push(l), l.retain !== null && typeof l.retain == "object") {
        const _ = Object.keys(l.retain)[0];
        if (_ == null) return o;
        this.scroll.updateEmbedAt(o, _, l.retain[_]);
      }
      Object.keys(u).forEach((_) => {
        this.scroll.formatAt(o, a, _, u[_]);
      });
      const g = h ? 1 : 0, m = d ? 1 : 0;
      return e += g + m, i.retain(g), i.delete(m), o + a + g + m;
    }, 0), i.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + Ut.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
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
    const i = new q().retain(t).retain(e, bn(n));
    return this.update(i);
  }
  formatText(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, e, r, n[r]);
    });
    const i = new q().retain(t).retain(e, bn(n));
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
      let u = jt(a);
      for (; Object.keys(u).length > 0; ) {
        const h = l.shift();
        if (h == null) return u;
        u = Q_(jt(h), u);
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
    }), this.update(new q().retain(t).insert(e, bn(n)));
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
    const u = this.getContents(t, e + o).diff(new q().insert(n).concat(l)), h = new q().retain(t).concat(u);
    return this.applyDelta(h);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(X_) && this.scroll.find(e[0].target)) {
      const r = this.scroll.find(e[0].target), o = jt(r), l = r.offset(this.scroll), a = e[0].oldValue.replace(Sn.CONTENTS, ""), u = new q().insert(a), h = new q().insert(r.value()), d = n && {
        oldRange: Xc(n.oldRange, -l),
        newRange: Xc(n.newRange, -l)
      };
      t = new q().retain(l).concat(u.diff(h, d)).reduce((m, _) => _.insert ? m.insert(_.insert, o) : m.push(_), new q()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !gl(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function pn(s, t, e) {
  if (s.length === 0) {
    const [m] = na(e.pop());
    return t <= 0 ? `</li></${m}>` : `</li></${m}>${pn([], t - 1, e)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: l
  }, ...a] = s, [u, h] = na(l);
  if (o > t)
    return e.push(l), o === t + 1 ? `<${u}><li${h}>${vi(n, i, r)}${pn(a, o, e)}` : `<${u}><li>${pn(s, t + 1, e)}`;
  const d = e[e.length - 1];
  if (o === t && l === d)
    return `</li><li${h}>${vi(n, i, r)}${pn(a, o, e)}`;
  const [g] = na(e.pop());
  return `</li></${g}>${pn(s, t - 1, e)}`;
}
function vi(s, t, e) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(t, e);
  if (s instanceof ie)
    return zr(s.value().slice(t, t + e));
  if (s instanceof ne) {
    if (s.statics.blotName === "list-container") {
      const u = [];
      return s.children.forEachAt(t, e, (h, d, g) => {
        const m = "formats" in h && typeof h.formats == "function" ? h.formats() : {};
        u.push({
          child: h,
          offset: d,
          length: g,
          indent: m.indent || 0,
          type: m.list
        });
      }), pn(u, -1, []);
    }
    const i = [];
    if (s.children.forEachAt(t, e, (u, h, d) => {
      i.push(vi(u, h, d));
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
function Q_(s, t) {
  return Object.keys(t).reduce((e, n) => {
    if (s[n] == null) return e;
    const i = t[n];
    return i === s[n] ? e[n] = i : Array.isArray(i) ? i.indexOf(s[n]) < 0 ? e[n] = i.concat([s[n]]) : e[n] = i : e[n] = [i, s[n]], e;
  }, {});
}
function na(s) {
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
  return new Bs(e + t, n);
}
function J_(s) {
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
class wl extends Rt {
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
class tE {
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
let Ln = hi;
const eE = (s) => s.parentElement || s.getRootNode().host || null, sE = (s) => {
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
}, Zc = (s, t, e, n, i, r) => s < e && t > n ? 0 : s < e ? -(e - s + i) : t > n ? t - s > n - e ? s + i - e : t - n + r : 0, nE = (s, t) => {
  var r, o, l;
  const e = s.ownerDocument;
  let n = t, i = s;
  for (; i; ) {
    const a = i === e.body, u = a ? {
      top: 0,
      right: ((r = window.visualViewport) == null ? void 0 : r.width) ?? e.documentElement.clientWidth,
      bottom: ((o = window.visualViewport) == null ? void 0 : o.height) ?? e.documentElement.clientHeight,
      left: 0
    } : sE(i), h = getComputedStyle(i), d = Zc(n.left, n.right, u.left, u.right, rr(h.scrollPaddingLeft), rr(h.scrollPaddingRight)), g = Zc(n.top, n.bottom, u.top, u.bottom, rr(h.scrollPaddingTop), rr(h.scrollPaddingBottom));
    if (d || g)
      if (a)
        (l = e.defaultView) == null || l.scrollBy(d, g);
      else {
        const {
          scrollLeft: m,
          scrollTop: _
        } = i;
        g && (i.scrollTop += g), d && (i.scrollLeft += d);
        const E = i.scrollLeft - m, w = i.scrollTop - _;
        n = {
          left: n.left - E,
          top: n.top - w,
          right: n.right - E,
          bottom: n.bottom - w
        };
      }
    i = a || h.position === "fixed" ? null : eE(i);
  }
}, iE = 100, rE = ["block", "break", "cursor", "inline", "scroll", "text"], oE = (s, t, e) => {
  const n = new Cn();
  return rE.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), s.forEach((i) => {
    let r = t.query(i);
    r || e.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > iE) {
        e.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, vn = Ue("quill"), or = new Cn();
ne.uiClass = "ql-ui";
const Jt = class Jt {
  static debug(t) {
    t === !0 && (t = "log"), Ue.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return xa.get(t) || or.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && vn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, e) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && vn.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && or.register(e), typeof e.register == "function" && e.register(or);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = aE(t, e), this.container = this.options.container, this.container == null) {
      vn.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && Jt.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", xa.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new M();
    const i = bl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Z_(this.scroll), this.selection = new Y_(this.scroll, this.emitter), this.composition = new tE(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(M.events.EDITOR_CHANGE, (o) => {
      o === M.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(M.events.SCROLL_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      Qt.call(this, () => this.editor.update(null, l, h), o);
    }), this.emitter.on(M.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const a = this.selection.lastRange, [u] = this.selection.getRange(), h = a && u ? {
        oldRange: a,
        newRange: u
      } : void 0;
      Qt.call(this, () => {
        const d = new q().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(d, [], h);
      }, Jt.sources.USER);
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
    return [t, e, , n] = Ie(t, e, n), Qt.call(this, () => this.editor.deleteText(t, e), n, t, -1 * e);
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
    return Qt.call(this, () => {
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
    ), Qt.call(this, () => this.editor.formatLine(t, e, o), r, t, 0);
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
    ), Qt.call(this, () => this.editor.formatText(t, e, o), r, t, 0);
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
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Jt.sources.API;
    return Qt.call(this, () => this.editor.insertEmbed(t, e, n), i, t);
  }
  insertText(t, e, n, i, r) {
    let o;
    return [t, , o, r] = Ie(t, 0, n, i, r), Qt.call(this, () => this.editor.insertText(t, e, o), r, t, e.length);
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
    return [t, e, , n] = Ie(t, e, n), Qt.call(this, () => this.editor.removeFormat(t, e), n, t);
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
    const t = this.selection.lastRange, e = t && this.selection.getBounds(t.index, t.length);
    e && this.scrollRectIntoView(e);
  }
  setContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : M.sources.API;
    return Qt.call(this, () => {
      t = new q(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, e);
  }
  setSelection(t, e, n) {
    t == null ? this.selection.setRange(null, e || Jt.sources.API) : ([t, e, , n] = Ie(t, e, n), this.selection.setRange(new Bs(Math.max(0, t), e), n), n !== M.sources.SILENT && this.scrollSelectionIntoView());
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
    return Qt.call(this, () => (t = new q(t), this.editor.applyDelta(t)), e, !0);
  }
};
D(Jt, "DEFAULTS", {
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
}), D(Jt, "events", M.events), D(Jt, "sources", M.sources), D(Jt, "version", "2.0.2"), D(Jt, "imports", {
  delta: q,
  parchment: I_,
  "core/module": le,
  "core/theme": Ln
});
let S = Jt;
function Qc(s) {
  return typeof s == "string" ? document.querySelector(s) : s;
}
function ia(s) {
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
function aE(s, t) {
  const e = Qc(s);
  if (!e)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === S.DEFAULTS.theme ? Ln : S.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = S.DEFAULTS, {
    modules: l,
    ...a
  } = i.DEFAULTS;
  let u = ia(t.modules);
  u != null && u.toolbar && u.toolbar.constructor !== Object && (u = {
    ...u,
    toolbar: {
      container: u.toolbar
    }
  });
  const h = rs({}, ia(r), ia(l), u), d = {
    ...o,
    ...Jc(a),
    ...Jc(t)
  };
  let g = t.registry;
  return g ? t.formats && vn.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? oE(t.formats, d.registry, vn) : d.registry, {
    ...d,
    registry: g,
    container: e,
    theme: i,
    modules: Object.entries(h).reduce((m, _) => {
      let [E, w] = _;
      if (!w) return m;
      const T = S.import(`modules/${E}`);
      return T == null ? (vn.error(`Cannot load ${E} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [E]: rs({}, T.DEFAULTS || {}, w)
      };
    }, {}),
    bounds: Qc(d.bounds)
  };
}
function Qt(s, t, e, n) {
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
function Ie(s, t, e, n, i) {
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
  )) : [r, o] = [s.index, s.index + s.length].map((l) => l < t || l === t && n === M.sources.USER ? l : i >= 0 ? l + i : Math.max(t, l + i)), new Bs(r, o - r);
}
class Hs extends Fr {
}
function eu(s) {
  return s instanceof ft || s instanceof Ft;
}
function su(s) {
  return typeof s.updateContent == "function";
}
class gn extends bl {
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
      const a = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Ft, t)[0] && t < this.length()), u = r.type === "block" ? r.delta : new q().insert({
        [r.key]: r.value
      });
      ra(this, t, u);
      const h = r.type === "block" ? 1 : 0, d = t + u.length() + h;
      a && this.insertAt(d - 1, `
`);
      const g = jt(this.line(t)[0]), m = Ut.AttributeMap.diff(g, r.attributes) || {};
      Object.keys(m).forEach((_) => {
        this.formatAt(d - 1, 1, _, m[_]);
      }), t = d;
    }
    let [o, l] = this.children.find(t);
    if (n.length && (o && (o = o.split(l), l = 0), n.forEach((a) => {
      if (a.type === "block") {
        const u = this.createBlock(a.attributes, o || void 0);
        ra(u, 0, a.delta);
      } else {
        const u = this.create(a.key, a.value);
        this.insertBefore(u, o || void 0), Object.keys(a.attributes).forEach((h) => {
          u.format(h, a.attributes[h]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const a = o ? o.offset(o.scroll) + l : this.length();
      ra(this, a, i.delta);
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
      return i.children.forEachAt(r, o, (u, h, d) => {
        eu(u) ? l.push(u) : u instanceof Fr && (l = l.concat(n(u, h, a))), a -= d;
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
      let [a, u] = l;
      this.query(a, B.BLOCK & B.BLOT) != null ? n = a : i[a] = u;
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
D(gn, "blotName", "scroll"), D(gn, "className", "ql-editor"), D(gn, "tagName", "DIV"), D(gn, "defaultChild", ft), D(gn, "allowedChildren", [ft, Ft, Hs]);
function ra(s, t, e) {
  e.reduce((n, i) => {
    const r = Ut.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const l = i.insert;
        s.insertAt(n, l);
        const [a] = s.descendant(yt, n), u = jt(a);
        o = Ut.AttributeMap.diff(u, o) || {};
      } else if (typeof i.insert == "object") {
        const l = Object.keys(i.insert)[0];
        if (l == null) return n;
        if (s.insertAt(n, l, i.insert[l]), s.scroll.query(l, B.INLINE) != null) {
          const [u] = s.descendant(yt, n), h = jt(u);
          o = Ut.AttributeMap.diff(h, o) || {};
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
}, lE = new Ee("align", "align", Tl), ud = new oe("align", "ql-align", Tl), hd = new ps("align", "text-align", Tl);
class dd extends ps {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const cE = new oe("color", "ql-color", {
  scope: B.INLINE
}), Al = new dd("color", "color", {
  scope: B.INLINE
}), uE = new oe("background", "ql-bg", {
  scope: B.INLINE
}), Nl = new dd("background", "background-color", {
  scope: B.INLINE
});
class Ws extends Hs {
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
${zr(this.code(t, e))}
</pre>`;
  }
}
class vt extends ft {
  static register() {
    S.register(Ws);
  }
}
D(vt, "TAB", "  ");
class Ol extends we {
}
Ol.blotName = "code";
Ol.tagName = "CODE";
vt.blotName = "code-block";
vt.className = "ql-code-block";
vt.tagName = "DIV";
Ws.blotName = "code-block-container";
Ws.className = "ql-code-block-container";
Ws.tagName = "DIV";
Ws.allowedChildren = [vt];
vt.allowedChildren = [ie, ae, Sn];
vt.requiredContainer = Ws;
const Cl = {
  scope: B.BLOCK,
  whitelist: ["rtl"]
}, fd = new Ee("direction", "dir", Cl), pd = new oe("direction", "ql-direction", Cl), gd = new ps("direction", "direction", Cl), md = {
  scope: B.INLINE,
  whitelist: ["serif", "monospace"]
}, bd = new oe("font", "ql-font", md);
class hE extends ps {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const yd = new hE("font", "font-family", md), vd = new oe("size", "ql-size", {
  scope: B.INLINE,
  whitelist: ["small", "large", "huge"]
}), _d = new ps("size", "font-size", {
  scope: B.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), dE = Ue("quill:keyboard"), fE = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Kr extends le {
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
    const i = gE(t);
    if (i == null) {
      dE.warn("Attempted to add invalid keyboard binding", i);
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((T) => Kr.match(t, T));
      if (i.length === 0) return;
      const r = S.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, a] = this.quill.getLine(o.index), [u, h] = this.quill.getLeaf(o.index), [d, g] = o.length === 0 ? [u, h] : this.quill.getLeaf(o.index + o.length), m = u instanceof Tr ? u.value().slice(0, h) : "", _ = d instanceof Tr ? d.value().slice(g) : "", E = {
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
        const u = r.formats(), h = this.quill.getFormat(t.index - 1, 1);
        if (i = Ut.AttributeMap.diff(u, h) || {}, Object.keys(i).length > 0) {
          const d = new q().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(d);
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
        const a = r.formats(), u = this.quill.getFormat(t.index, 1);
        i = Ut.AttributeMap.diff(a, u) || {}, Object.keys(i).length > 0 && (o = o.retain(l.length() - 1).retain(1, i));
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
const pE = {
  bindings: {
    bold: oa("bold"),
    italic: oa("italic"),
    underline: oa("underline"),
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
          const [e, n, i, r] = t.getTable(s), o = mE(e, n, i, r);
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
Kr.DEFAULTS = pE;
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
      o.forEach((u, h) => {
        s ? (u.insertAt(0, r), h === 0 ? l += r.length : a += r.length) : u.domNode.textContent.startsWith(r) && (u.deleteAt(0, r.length), h === 0 ? l -= r.length : a -= r.length);
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
      return r instanceof Rt ? (s === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, S.sources.USER) : this.quill.setSelection(n.index - 1, S.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, S.sources.USER) : this.quill.setSelection(n.index + n.length + 1, S.sources.USER), !1) : !0;
    }
  };
}
function oa(s) {
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
function gE(s) {
  if (typeof s == "string" || typeof s == "number")
    s = {
      key: s
    };
  else if (typeof s == "object")
    s = bn(s);
  else
    return null;
  return s.shortKey && (s[fE] = s.shortKey, delete s.shortKey), s;
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
    i = Ut.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(e, S.sources.USER), Object.keys(i).length > 0 && t.formatLine(e.index, 1, i, S.sources.USER), t.setSelection(e.index, S.sources.SILENT);
}
function mE(s, t, e, n) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? n === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const bE = /font-weight:\s*normal/, yE = ["P", "OL", "UL"], ru = (s) => s && yE.includes(s.tagName), vE = (s) => {
  Array.from(s.querySelectorAll("br")).filter((t) => ru(t.previousElementSibling) && ru(t.nextElementSibling)).forEach((t) => {
    var e;
    (e = t.parentNode) == null || e.removeChild(t);
  });
}, _E = (s) => {
  Array.from(s.querySelectorAll('b[style*="font-weight"]')).filter((t) => {
    var e;
    return (e = t.getAttribute("style")) == null ? void 0 : e.match(bE);
  }).forEach((t) => {
    var n;
    const e = s.createDocumentFragment();
    e.append(...t.childNodes), (n = t.parentNode) == null || n.replaceChild(e, t);
  });
};
function EE(s) {
  s.querySelector('[id^="docs-internal-guid-"]') && (_E(s), vE(s));
}
const wE = /\bmso-list:[^;]*ignore/i, TE = /\bmso-list:[^;]*\bl(\d+)/i, AE = /\bmso-list:[^;]*\blevel(\d+)/i, NE = (s, t) => {
  const e = s.getAttribute("style"), n = e == null ? void 0 : e.match(TE);
  if (!n)
    return null;
  const i = Number(n[1]), r = e == null ? void 0 : e.match(AE), o = r ? Number(r[1]) : 1, l = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a = t.match(l), u = a && a[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: u,
    element: s
  };
}, OE = (s) => {
  var o, l;
  const t = Array.from(s.querySelectorAll("[style*=mso-list]")), e = [], n = [];
  t.forEach((a) => {
    (a.getAttribute("style") || "").match(wE) ? e.push(a) : n.push(a);
  }), e.forEach((a) => {
    var u;
    return (u = a.parentNode) == null ? void 0 : u.removeChild(a);
  });
  const i = s.documentElement.innerHTML, r = n.map((a) => NE(a, i)).filter((a) => a);
  for (; r.length; ) {
    const a = [];
    let u = r.shift();
    for (; u; )
      a.push(u), u = r.length && ((o = r[0]) == null ? void 0 : o.element) === u.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === u.id ? r.shift() : null;
    const h = document.createElement("ul");
    a.forEach((m) => {
      const _ = document.createElement("li");
      _.setAttribute("data-list", m.type), m.indent > 1 && _.setAttribute("class", `ql-indent-${m.indent - 1}`), _.innerHTML = m.element.innerHTML, h.appendChild(_);
    });
    const d = (l = a[0]) == null ? void 0 : l.element, {
      parentNode: g
    } = d ?? {};
    d && (g == null || g.replaceChild(h, d)), a.slice(1).forEach((m) => {
      let {
        element: _
      } = m;
      g == null || g.removeChild(_);
    });
  }
};
function CE(s) {
  s.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && OE(s);
}
const SE = [CE, EE], LE = (s) => {
  s.documentElement && SE.forEach((t) => {
    t(s);
  });
}, kE = Ue("quill:clipboard"), xE = [[Node.TEXT_NODE, UE], [Node.TEXT_NODE, au], ["br", ME], [Node.ELEMENT_NODE, au], [Node.ELEMENT_NODE, DE], [Node.ELEMENT_NODE, RE], [Node.ELEMENT_NODE, VE], ["li", PE], ["ol, ul", jE], ["pre", qE], ["tr", FE], ["b", aa("bold")], ["i", aa("italic")], ["strike", aa("strike")], ["style", BE]], IE = [lE, fd].reduce((s, t) => (s[t.keyName] = t, s), {}), ou = [hd, Nl, Al, gd, yd, _d].reduce((s, t) => (s[t.keyName] = t, s), {});
class Ed extends le {
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], xE.concat(this.options.matchers ?? []).forEach((n) => {
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
    LE(t);
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
    var o, l, a, u, h;
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const e = this.quill.getSelection(!0);
    if (e == null) return;
    const n = (o = t.clipboardData) == null ? void 0 : o.getData("text/html");
    let i = (l = t.clipboardData) == null ? void 0 : l.getData("text/plain");
    if (!n && !i) {
      const d = (a = t.clipboardData) == null ? void 0 : a.getData("text/uri-list");
      d && (i = this.normalizeURIList(d));
    }
    const r = Array.from(((u = t.clipboardData) == null ? void 0 : u.files) || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(e, r);
      return;
    }
    if (n && r.length > 0) {
      const d = new DOMParser().parseFromString(n, "text/html");
      if (d.body.childElementCount === 1 && ((h = d.body.firstElementChild) == null ? void 0 : h.tagName) === "IMG") {
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
    kE.log("onPaste", o, {
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
D(Ed, "DEFAULTS", {
  matchers: []
});
function zs(s, t, e, n) {
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
function ns(s, t) {
  if (!(s instanceof Element)) return !1;
  const e = t.query(s);
  return e && e.prototype instanceof Rt ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(s.tagName.toLowerCase());
}
function $E(s, t) {
  return s.previousElementSibling && s.nextElementSibling && !ns(s.previousElementSibling, t) && !ns(s.nextElementSibling, t);
}
const lr = /* @__PURE__ */ new WeakMap();
function wd(s) {
  return s == null ? !1 : (lr.has(s) || (s.tagName === "PRE" ? lr.set(s, !0) : lr.set(s, wd(s.parentNode))), lr.get(s));
}
function Ll(s, t, e, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, s), new q()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let l = Ll(s, o, e, n, i);
    return o.nodeType === t.ELEMENT_NODE && (l = e.reduce((a, u) => u(o, a, s), l), l = (i.get(o) || []).reduce((a, u) => u(o, a, s), l)), r.concat(l);
  }, new q()) : new q();
}
function aa(s) {
  return (t, e, n) => zs(e, s, !0, n);
}
function RE(s, t, e) {
  const n = Ee.keys(s), i = oe.keys(s), r = ps.keys(s), o = {};
  return n.concat(i).concat(r).forEach((l) => {
    let a = e.query(l, B.ATTRIBUTE);
    a != null && (o[a.attrName] = a.value(s), o[a.attrName]) || (a = IE[l], a != null && (a.attrName === l || a.keyName === l) && (o[a.attrName] = a.value(s) || void 0), a = ou[l], a != null && (a.attrName === l || a.keyName === l) && (a = ou[l], o[a.attrName] = a.value(s) || void 0));
  }), Object.entries(o).reduce((l, a) => {
    let [u, h] = a;
    return zs(l, u, h, e);
  }, t);
}
function DE(s, t, e) {
  const n = e.query(s);
  if (n == null) return t;
  if (n.prototype instanceof Rt) {
    const i = {}, r = n.value(s);
    if (r != null)
      return i[n.blotName] = r, new q().insert(i, n.formats(s, e));
  } else if (n.prototype instanceof bi && !ki(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return zs(t, n.blotName, n.formats(s, e), e);
  return t;
}
function ME(s, t) {
  return ki(t, `
`) || t.insert(`
`), t;
}
function qE(s, t, e) {
  const n = e.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(s, e) : !0;
  return zs(t, "code-block", i, e);
}
function BE() {
  return new q();
}
function PE(s, t, e) {
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
function jE(s, t, e) {
  const n = s;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), zs(t, "list", i, e);
}
function au(s, t, e) {
  if (!ki(t, `
`)) {
    if (ns(s, e) && (s.childNodes.length > 0 || s instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && s.nextSibling) {
      let n = s.nextSibling;
      for (; n != null; ) {
        if (ns(n, e))
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
function VE(s, t, e) {
  var r;
  const n = {}, i = s.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), ((r = i.fontWeight) != null && r.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((o, l) => {
    let [a, u] = l;
    return zs(o, a, u, e);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new q().insert("	").concat(t) : t;
}
function FE(s, t, e) {
  var i, r;
  const n = ((i = s.parentElement) == null ? void 0 : i.tagName) === "TABLE" ? s.parentElement : (r = s.parentElement) == null ? void 0 : r.parentElement;
  if (n != null) {
    const l = Array.from(n.querySelectorAll("tr")).indexOf(s) + 1;
    return zs(t, "table", l, e);
  }
  return t;
}
function UE(s, t, e) {
  var i;
  let n = s.data;
  if (((i = s.parentElement) == null ? void 0 : i.tagName) === "O:P")
    return t.insert(n.trim());
  if (!wd(s)) {
    if (n.trim().length === 0 && n.includes(`
`) && !$E(s, e))
      return t;
    const r = (o, l) => {
      const a = l.replace(/[^\u00a0]/g, "");
      return a.length < 1 && o ? " " : a;
    };
    n = n.replace(/\r\n/g, " ").replace(/\n/g, " "), n = n.replace(/\s\s+/g, r.bind(r, !0)), (s.previousSibling == null && s.parentElement != null && ns(s.parentElement, e) || s.previousSibling instanceof Element && ns(s.previousSibling, e)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (s.nextSibling == null && s.parentElement != null && ns(s.parentElement, e) || s.nextSibling instanceof Element && ns(s.nextSibling, e)) && (n = n.replace(/\s+$/, r.bind(r, !1)));
  }
  return t.insert(n);
}
class Td extends le {
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
      const n = WE(this.quill.scroll, e.delta);
      this.quill.setSelection(n, S.sources.USER);
    }
  }
}
D(Td, "DEFAULTS", {
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
function HE(s, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((n) => s.query(n, B.BLOCK) != null) : !1;
}
function WE(s, t) {
  const e = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - e;
  return HE(s, t) && (n -= 1), n;
}
function Ra(s, t) {
  if (!s) return s;
  const e = t.transformPosition(s.index), n = t.transformPosition(s.index + s.length);
  return {
    index: e,
    length: n - e
  };
}
class Ad extends le {
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
Ad.DEFAULTS = {
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
const zE = ["insertText", "insertReplacementText"];
class KE extends le {
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
    if (this.quill.composition.isComposing || t.defaultPrevented || !zE.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const n = GE(t);
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
function GE(s) {
  var t;
  return typeof s.data == "string" ? s.data : (t = s.dataTransfer) != null && t.types.includes("text/plain") ? s.dataTransfer.getData("text/plain") : null;
}
const YE = /Mac/i.test(navigator.platform), XE = 100, ZE = (s) => !!(s.key === "ArrowLeft" || s.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
s.key === "ArrowUp" || s.key === "ArrowDown" || s.key === "Home" || YE && s.key === "a" && s.ctrlKey === !0);
class QE extends le {
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
      !e.defaultPrevented && ZE(e) && this.ensureListeningToSelectionChange();
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
  "blots/container": Hs,
  "blots/cursor": Sn,
  "blots/embed": wl,
  "blots/inline": we,
  "blots/scroll": gn,
  "blots/text": ie,
  "modules/clipboard": Ed,
  "modules/history": Td,
  "modules/keyboard": Kr,
  "modules/uploader": Ad,
  "modules/input": KE,
  "modules/uiNode": QE
});
class JE extends oe {
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
const tw = new JE("indent", "ql-indent", {
  scope: B.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Da extends ft {
}
D(Da, "blotName", "blockquote"), D(Da, "tagName", "blockquote");
class Ma extends ft {
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
D(Ma, "blotName", "header"), D(Ma, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class xi extends Hs {
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
class _i extends we {
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
class qa extends _i {
}
D(qa, "blotName", "italic"), D(qa, "tagName", ["EM", "I"]);
class is extends we {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return Nd(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
D(is, "blotName", "link"), D(is, "tagName", "A"), D(is, "SANITIZED_URL", "about:blank"), D(is, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function Nd(s, t) {
  const e = document.createElement("a");
  e.href = s;
  const n = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class Ba extends we {
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
D(Ba, "blotName", "script"), D(Ba, "tagName", ["SUB", "SUP"]);
class Pa extends _i {
}
D(Pa, "blotName", "strike"), D(Pa, "tagName", ["S", "STRIKE"]);
class ja extends we {
}
D(ja, "blotName", "underline"), D(ja, "tagName", "U");
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
class Va extends Rt {
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
    return Nd(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    cu.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
D(Va, "blotName", "image"), D(Va, "tagName", "IMG");
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
    return is.sanitize(t);
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
const ri = new oe("code-token", "hljs", {
  scope: B.INLINE
});
class Pe extends we {
  static formats(t, e) {
    for (; t != null && t !== e.domNode; ) {
      if (t.classList && t.classList.contains(vt.className))
        return super.formats(t, e);
      t = t.parentNode;
    }
  }
  constructor(t, e, n) {
    super(t, e, n), ri.add(this.domNode, n);
  }
  format(t, e) {
    t !== Pe.blotName ? super.format(t, e) : e ? ri.add(this.domNode, e) : (ri.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ri.value(this.domNode) || this.unwrap();
  }
}
Pe.blotName = "code-token";
Pe.className = "ql-token";
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
    return this.formatAt(0, this.length(), Pe.blotName, !1), super.replaceWith(t, e);
  }
}
class ui extends Ws {
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
        const o = this.children.reduce((a, u) => a.concat(ad(u, !1)), new q()), l = t(i, r);
        o.diff(l).reduce((a, u) => {
          let {
            retain: h,
            attributes: d
          } = u;
          return h ? (d && Object.keys(d).forEach((g) => {
            [Vt.blotName, Pe.blotName].includes(g) && this.formatAt(a, h, g, d[g]);
          }), a + h) : a;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, e) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Vt.formats(n.domNode) : "plain"}">
${zr(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = Vt.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
ui.allowedChildren = [Vt];
Vt.requiredContainer = ui;
Vt.allowedChildren = [Pe, Sn, ie, ae];
const ew = (s, t, e) => {
  if (typeof s.versionString == "string") {
    const n = s.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return s.highlight(e, {
        language: t
      }).value;
  }
  return s.highlight(t, e).value;
};
class Od extends le {
  static register() {
    S.register(Pe, !0), S.register(Vt, !0), S.register(ui, !0);
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
    (t == null ? this.quill.scroll.descendants(ui) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, e);
    }), this.quill.update(S.sources.SILENT), n != null && this.quill.setSelection(n, S.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return zr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [vt.blotName]: e
      }), i.insert(r)), new q());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(vt.className), n.innerHTML = ew(this.options.hljs, e, t), Ll(this.quill.scroll, n, [(i, r) => {
      const o = ri.value(i);
      return o ? r.compose(new q().retain(r.length(), {
        [Pe.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, l, a) => (a !== 0 && o.insert(`
`, {
      [vt.blotName]: e
    }), o.insert(l)), r)], /* @__PURE__ */ new WeakMap());
  }
}
Od.DEFAULTS = {
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
class je extends Hs {
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
D(je, "blotName", "table-row"), D(je, "tagName", "TR");
class ve extends Hs {
}
D(ve, "blotName", "table-body"), D(ve, "tagName", "TBODY");
class kn extends Hs {
  balanceCells() {
    const t = this.descendants(je), e = t.reduce((n, i) => Math.max(i.children.length, n), 0);
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
    const n = kl(), i = this.scroll.create(je.blotName);
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
D(kn, "blotName", "table-container"), D(kn, "tagName", "TABLE");
kn.allowedChildren = [ve];
ve.requiredContainer = kn;
ve.allowedChildren = [je];
je.requiredContainer = ve;
je.allowedChildren = [se];
se.requiredContainer = je;
function kl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class sw extends le {
  static register() {
    S.register(se), S.register(je), S.register(ve), S.register(kn);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(kn).forEach((t) => {
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
        this.quill.scroll.query(e).prototype instanceof Rt
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
function nw(s, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), e.forEach((i) => {
      if (typeof i == "string")
        du(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? iw(n, r, o) : du(n, r, o);
      }
    }), s.appendChild(n);
  });
}
function iw(s, t, e) {
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
const rw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', aw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', lw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', cw = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', uw = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', hw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', dw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', fu = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', fw = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', pw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', gw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', mw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', bw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', yw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', vw = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', _w = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', Ew = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', ww = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', Tw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Aw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Nw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Ow = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', Cw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Sw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Lw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', kw = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', xw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Iw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', $w = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Rw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Dw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Mw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', Ei = {
  align: {
    "": rw,
    center: ow,
    right: aw,
    justify: lw
  },
  background: cw,
  blockquote: uw,
  bold: hw,
  clean: dw,
  code: fu,
  "code-block": fu,
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
  link: Cw,
  list: {
    bullet: Sw,
    check: Lw,
    ordered: kw
  },
  script: {
    sub: xw,
    super: Iw
  },
  strike: $w,
  table: Rw,
  underline: Dw,
  video: Mw
}, qw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let pu = 0;
function gu(s, t) {
  s.setAttribute(t, `${s.getAttribute(t) !== "true"}`);
}
class Gr {
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
    return t.classList.add("ql-picker-label"), t.innerHTML = qw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
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
class Cd extends Gr {
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
class Sd extends Gr {
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
const Bw = (s) => {
  const {
    overflowY: t
  } = getComputedStyle(s, null);
  return t !== "visible" && t !== "clip";
};
class Ld {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Bw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const Pw = [!1, "center", "right", "justify"], jw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Vw = [!1, "serif", "monospace"], Fw = ["1", "2", "3", !1], Uw = ["small", !1, "large", "huge"];
class $i extends Ln {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && si(i, Pw), typeof e.align == "object"))
        return new Sd(i, e.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && si(i, jw, r === "background" ? "#ffffff" : "#000000"), new Cd(i, e[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? si(i, Vw) : i.classList.contains("ql-header") ? si(i, Fw) : i.classList.contains("ql-size") && si(i, Uw)), new Gr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(M.events.EDITOR_CHANGE, n);
  }
}
$i.DEFAULTS = rs({}, Ln.DEFAULTS, {
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
class kd extends Ld {
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
        t = Hw(t);
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
function Hw(s) {
  let t = s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = s.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : s;
}
function si(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === e ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), s.appendChild(i);
  });
}
const Ww = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class xd extends kd {
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
            const a = l[l.length - 1], u = this.quill.getIndex(a), h = Math.min(a.length() - 1, i.index + i.length - u), d = this.quill.getBounds(new Bs(u, h));
            d != null && this.position(d);
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
D(xd, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class Id extends $i {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = Ww), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new xd(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei));
  }
}
Id.DEFAULTS = rs({}, $i.DEFAULTS, {
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
const zw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class $d extends kd {
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
          const [r, o] = this.quill.scroll.descendant(is, e.index);
          if (r != null) {
            this.linkRange = new Bs(e.index - o, r.length());
            const l = is.formats(r.domNode);
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
D($d, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class Rd extends $i {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = zw), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), Ei), this.buildPickers(t.container.querySelectorAll("select"), Ei), this.tooltip = new $d(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
Rd.DEFAULTS = rs({}, $i.DEFAULTS, {
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
  "attributors/attribute/direction": fd,
  "attributors/class/align": ud,
  "attributors/class/background": uE,
  "attributors/class/color": cE,
  "attributors/class/direction": pd,
  "attributors/class/font": bd,
  "attributors/class/size": vd,
  "attributors/style/align": hd,
  "attributors/style/background": Nl,
  "attributors/style/color": Al,
  "attributors/style/direction": gd,
  "attributors/style/font": yd,
  "attributors/style/size": _d
}, !0);
S.register({
  "formats/align": ud,
  "formats/direction": pd,
  "formats/indent": tw,
  "formats/background": Nl,
  "formats/color": Al,
  "formats/font": bd,
  "formats/size": vd,
  "formats/blockquote": Da,
  "formats/code-block": vt,
  "formats/header": Ma,
  "formats/list": Ii,
  "formats/bold": _i,
  "formats/code": Ol,
  "formats/italic": qa,
  "formats/link": is,
  "formats/script": Ba,
  "formats/strike": Pa,
  "formats/underline": ja,
  "formats/formula": fr,
  "formats/image": Va,
  "formats/video": pr,
  "modules/syntax": Od,
  "modules/table": sw,
  "modules/toolbar": xl,
  "themes/bubble": Id,
  "themes/snow": Rd,
  "ui/icons": Ei,
  "ui/picker": Gr,
  "ui/icon-picker": Sd,
  "ui/color-picker": Cd,
  "ui/tooltip": Ld
}, !0);
const He = (s, t) => {
  const e = s.__vccOpts || s;
  for (const [n, i] of t)
    e[n] = i;
  return e;
}, Kw = {
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
}, Gw = Kw, Yw = { class: "ql-editor-container" }, Xw = {
  class: "",
  ref: "editor"
};
function Zw(s, t, e, n, i, r) {
  return b(), y("div", Yw, [
    p("div", Xw, null, 512)
  ]);
}
const Qw = /* @__PURE__ */ He(Gw, [["render", Zw], ["__scopeId", "data-v-443c4edc"]]), Bt = {
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
      }, s.title = s.name.split(".").slice(0, -1).join("."), s.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32), s.slug = ti(s.title), s.timestamp = Math.round(Date.now() / 1e3), s.original = {
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
                slug: ti(t.title) + "-" + t.uid,
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
        let u = this.params.presets[a];
        u.key = a, u.width = u.width ? u.width : 1920, u.height = u.height ? u.height : 1080;
        let h = u.width, d = u.height;
        if (u.crop === "fit") {
          let g = Math.max(h / o, d / l), m = o * g, _ = l * g, E = (m - h) / 2, w = (_ - d) / 2;
          n.width = h, n.height = d, i.drawImage(t, -E, -w, m, _);
        } else if (u.crop === "contain") {
          let g = Math.min(h / o, d / l), m = o * g, _ = l * g, E = (h - m) / 2, w = (d - _) / 2;
          n.width = h, n.height = d, i.clearRect(0, 0, h, d), i.drawImage(t, E, w, m, _);
        } else
          o > h && (l = Math.round(l * (h / o)), o = h), l > d && (o = Math.round(o * (d / l)), l = d), n.width = o, n.height = l, i.drawImage(t, 0, 0, o, l);
        s.types[u.key] = {
          width: n.width,
          height: n.height,
          extension: u.extension ? u.extension : this.getExtensionByMimeType(s.type),
          quality: u.quality ? u.quality : 0.9,
          crop: u.crop ? u.crop : null
        }, s.types[u.key].slug = ti(s.title) + "-" + n.width + "x" + n.height + "-" + s.uid, s.types[u.key].mime = this.getMimeTypeByExtension(s.types[u.key].extension), s.types[u.key].data = n.toDataURL(
          s.types[u.key].mime,
          s.types[u.key].quality
        ), s.types[u.key].blob = await this.getBlob(n, s.types[u.key].mime, s.types[u.key].quality), s.types[u.key].blob && (s.types[u.key].bytes = s.types[u.key].blob.size), s.types[u.key].bytes && (s.bytes += s.types[u.key].bytes), e && e(u, s);
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
        s.slug = ti(s.title);
        for (let t in s.types) {
          let e = this.params.presets[t];
          s.types[t].slug = ti(s.title) + "-" + e.width + "x" + e.height;
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
}, tT = Jw, eT = { class: "" }, sT = {
  key: 0,
  class: "vsa-image-editor p-2 text-center text-light"
}, nT = { class: "row" }, iT = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, rT = { class: "badge bg-dark text-light fw-light mx-1" }, oT = { class: "badge bg-dark text-light fw-light mx-1" }, aT = ["src"], lT = { class: "row g-1" }, cT = { class: "col-md-6" }, uT = { class: "col-md-6" }, hT = { class: "col-md-6" }, dT = ["href"], fT = {
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
}, AT = ["href"], NT = ["src", "alt"], OT = ["src", "alt"], CT = { class: "dropdown" }, ST = { class: "dropdown-menu" }, LT = ["onClick"], kT = { key: 0 }, xT = ["onClick"], IT = { key: 1 }, $T = { class: "dropdown-item py-0 d-flex justify-content-between" }, RT = { key: 2 }, DT = { class: "dropdown-item py-0 d-flex justify-content-between" }, MT = ["innerHTML"], qT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, BT = { key: 0 }, PT = { key: 1 }, jT = { class: "dropdown-item py-0 d-flex justify-content-between" }, VT = { class: "text-muted fw-light me-4" }, FT = { class: "text-primary" }, UT = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, HT = { class: "dropdown-item py-0 d-flex justify-content-between" }, WT = { class: "text-muted fw-light me-1" }, zT = {
  key: 0,
  class: "text-primary"
}, KT = ["innerHTML"], GT = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, YT = { key: 3 }, XT = { class: "dropdown-item py-0 d-flex justify-content-between" }, ZT = { class: "dropdown-item py-0 d-flex justify-content-between" }, QT = { class: "text-muted fw-light me-3" }, JT = ["innerHTML"], tA = { class: "dropdown-item py-0 d-flex justify-content-between" }, eA = { class: "text-muted fw-light me-3" }, sA = { class: "vsa-image-container h-100 position-relative border p-1 rounded" }, nA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, iA = {
  key: 1,
  class: "vsa-image-frame mb-auto text-center"
}, rA = ["src", "alt"], oA = {
  key: 2,
  class: "display-3 w-100 text-center mb-auto"
}, aA = ["onUpdate:modelValue", "onInput"], lA = { class: "dropdown rounded-bottom border w-100" }, cA = { class: "dropdown-menu" }, uA = ["onClick"], hA = { key: 0 }, dA = ["onClick"], fA = { key: 1 }, pA = { class: "dropdown-item py-0 d-flex justify-content-between" }, gA = { key: 2 }, mA = { class: "dropdown-item py-0 d-flex justify-content-between" }, bA = ["innerHTML"], yA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, vA = { key: 0 }, _A = { key: 1 }, EA = { class: "dropdown-item py-0 d-flex justify-content-between" }, wA = { class: "text-muted fw-light me-4" }, TA = { class: "text-primary" }, AA = {
  key: 0,
  class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm"
}, NA = { class: "dropdown-item py-0 d-flex justify-content-between" }, OA = { class: "text-muted fw-light me-1" }, CA = {
  key: 0,
  class: "text-primary"
}, SA = ["innerHTML"], LA = { class: "fw-normal bg-light text-dark rounded border px-2 ms-2 shadow-sm" }, kA = { key: 3 }, xA = { class: "dropdown-item py-0 d-flex justify-content-between" }, IA = { class: "dropdown-item py-0 d-flex justify-content-between" }, $A = { class: "text-muted fw-light me-3" }, RA = ["innerHTML"], DA = { class: "dropdown-item py-0 d-flex justify-content-between" }, MA = { class: "text-muted fw-light me-3" }, qA = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, BA = { class: "row g-1" }, PA = { class: "col-12 d-flex align-items-center justify-content-center" }, jA = ["for"], VA = { key: 0 }, FA = { key: 0 }, UA = { class: "" }, HA = { class: "" }, WA = {
  key: 1,
  class: "fs-6"
}, zA = {
  key: 0,
  class: "bi bi-list-ol"
}, KA = {
  key: 1,
  class: "bi bi-grid"
}, GA = ["disabled"], YA = { class: "col-12 text-center" }, XA = { key: 0 }, ZA = ["id", "accept"];
function QA(s, t, e, n, i, r) {
  return b(), y("div", eT, [
    p("div", {
      class: $(["vsa-upload", { wait: s.wait }])
    }, [
      s.editfile && s.editfile.presets ? (b(), y("div", sT, [
        p("div", nT, [
          (b(!0), y(W, null, z(s.editfile.types, (o, l) => (b(), y("div", {
            class: "col-md-3",
            key: l
          }, [
            p("span", iT, O(o.extension), 1),
            p("span", rT, O(o.width) + " x " + O(o.height), 1),
            p("span", oT, "~" + O(s.roundFileSize(o.bytes)), 1),
            o ? (b(), y("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: o.url ? o.url : o.data
            }, null, 8, aT)) : A("", !0)
          ]))), 128))
        ]),
        G(p("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.editfile.title = o)
        }, null, 512), [
          [ee, s.editfile.title]
        ]),
        p("div", lT, [
          p("div", cT, [
            p("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (o) => s.editfile = null)
            }, " Close ")
          ]),
          p("div", uT, [
            p("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (o) => s.remove(s.index))
            }, " Remove ")
          ]),
          p("div", hT, [
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
            }, " Download ", 8, dT)) : A("", !0)
          ])
        ])
      ])) : A("", !0),
      s.files && s.files.length ? (b(), y("div", fT, [
        s.params.ui === "list" ? (b(), y("div", pT, [
          p("table", gT, [
            p("tbody", null, [
              (b(!0), y(W, null, z(s.files, (o, l) => (b(), y("tr", { key: l }, [
                p("td", mT, [
                  p("small", null, O(l + 1), 1)
                ]),
                p("td", bT, [
                  p("div", yT, [
                    o.isDocument ? (b(), y("span", vT, [
                      p("i", {
                        class: $(["bi bi-filetype-" + o.types.default.extension])
                      }, null, 2)
                    ])) : o.isImage ? (b(), y("span", _T, t[9] || (t[9] = [
                      p("i", { class: "bi bi-file-image" }, null, -1)
                    ]))) : o.isVideo ? (b(), y("span", ET, t[10] || (t[10] = [
                      p("i", { class: "bi bi-file-play" }, null, -1)
                    ]))) : A("", !0),
                    G(p("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-0 fw-light",
                      "onUpdate:modelValue": (a) => o.title = a,
                      onInput: (a) => s.slug(o),
                      onKeydown: t[4] || (t[4] = oi(la(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, wT), [
                      [ee, o.title]
                    ]),
                    !o.isDocument && o.types && o.types[s.params.thumbnail] ? (b(), y("span", TT, [
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
                        }, null, 8, NT)
                      ], 8, AT)) : (b(), y("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "",
                        src: o.types[s.params.thumbnail].data,
                        alt: o.name
                      }, null, 8, OT))
                    ])) : A("", !0),
                    p("div", CT, [
                      t[24] || (t[24] = p("button", {
                        class: "btn btn-sm bg-light text-dark dropdown-toggle h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, null, -1)),
                      p("ul", ST, [
                        p("li", null, [
                          p("button", {
                            class: "dropdown-item text-danger py-1",
                            onClick: (a) => s.remove(l),
                            type: "button"
                          }, t[11] || (t[11] = [
                            p("i", { class: "bi bi-x-circle" }, null, -1),
                            F(" Remove ")
                          ]), 8, LT)
                        ]),
                        o.uploaded ? (b(), y("li", kT, [
                          p("button", {
                            class: "dropdown-item text-primary py-1",
                            onClick: (a) => s.download(l, s.params),
                            type: "button"
                          }, t[12] || (t[12] = [
                            p("i", { class: "bi bi-download" }, null, -1),
                            F(" Download ")
                          ]), 8, xT)
                        ])) : A("", !0),
                        t[22] || (t[22] = p("li", null, [
                          p("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.original.width ? (b(), y("li", IT, [
                          p("small", $T, [
                            t[13] || (t[13] = p("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                            F(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                          ])
                        ])) : A("", !0),
                        o.isDocument ? A("", !0) : (b(), y("li", RT, [
                          p("small", DT, [
                            t[14] || (t[14] = p("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                            p("span", null, [
                              p("span", {
                                innerHTML: s.roundFileSize(o.original.bytes, !0)
                              }, null, 8, MT),
                              p("small", qT, O(o.original.extension), 1)
                            ])
                          ])
                        ])),
                        (b(!0), y(W, null, z(o.types, (a, u) => (b(), y(W, { key: a }, [
                          o.isDocument ? A("", !0) : (b(), y("li", BT, t[15] || (t[15] = [
                            p("hr", { class: "dropdown-divider" }, null, -1)
                          ]))),
                          o.original.width ? (b(), y("li", PT, [
                            p("small", jT, [
                              p("span", VT, [
                                p("span", FT, O(u), 1),
                                t[16] || (t[16] = F(" resolution & crop"))
                              ]),
                              p("span", null, [
                                F(O(a.width) + " x " + O(a.height) + " ", 1),
                                a.crop ? (b(), y("small", UT, O(a.crop), 1)) : A("", !0)
                              ])
                            ])
                          ])) : A("", !0),
                          p("li", null, [
                            p("small", HT, [
                              p("span", WT, [
                                o.isDocument ? A("", !0) : (b(), y("span", zT, O(u), 1)),
                                t[17] || (t[17] = F(" size & extension"))
                              ]),
                              p("span", null, [
                                p("span", {
                                  class: $({ "text-danger": a.bytes > o.original.bytes }),
                                  innerHTML: s.roundFileSize(a.bytes, !0)
                                }, null, 10, KT),
                                p("small", GT, O(a.extension), 1)
                              ])
                            ])
                          ])
                        ], 64))), 128)),
                        t[23] || (t[23] = p("li", null, [
                          p("hr", { class: "dropdown-divider" })
                        ], -1)),
                        o.uploaded ? (b(), y("li", YT, [
                          p("small", XT, [
                            t[18] || (t[18] = p("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                            t[19] || (t[19] = F()),
                            p("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                          ])
                        ])) : A("", !0),
                        p("li", null, [
                          p("small", ZT, [
                            p("span", QT, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                            t[20] || (t[20] = F()),
                            p("span", {
                              innerHTML: s.roundFileSize(o.bytes, !0)
                            }, null, 8, JT)
                          ])
                        ]),
                        p("li", null, [
                          p("small", tA, [
                            p("span", eA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                            t[21] || (t[21] = F()),
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
          class: $([s.params.colclass ? s.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          p("div", sA, [
            o.loaded ? (b(), y("div", nA, [
              A("", !0),
              o.types && o.types[s.params.thumbnail] ? (b(), y("div", iA, [
                p("img", {
                  class: "img-fluid",
                  src: o.types[s.params.thumbnail].url ? o.types[s.params.thumbnail].url : o.types[s.params.thumbnail].data,
                  alt: o.name
                }, null, 8, rA)
              ])) : A("", !0),
              o.isDocument ? (b(), y("div", oA, [
                p("i", {
                  class: $(["bi bi-filetype-" + o.types.default.extension])
                }, null, 2)
              ])) : A("", !0),
              G(p("input", {
                required: "text",
                class: "form-control rounded-0 rounded-top py-1 px-2 fw-light",
                "onUpdate:modelValue": (a) => o.title = a,
                onInput: (a) => s.slug(o),
                onKeydown: t[5] || (t[5] = oi(la(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, aA), [
                [ee, o.title]
              ]),
              p("div", lA, [
                t[41] || (t[41] = p("button", {
                  class: "btn btn-sm bg-light text-dark dropdown-toggle w-100 h-100",
                  type: "button",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, null, -1)),
                p("ul", cA, [
                  p("li", null, [
                    p("button", {
                      class: "dropdown-item text-danger py-1",
                      onClick: (a) => s.remove(l),
                      type: "button"
                    }, t[28] || (t[28] = [
                      p("i", { class: "bi bi-x-circle" }, null, -1),
                      F(" Remove ")
                    ]), 8, uA)
                  ]),
                  o.uploaded ? (b(), y("li", hA, [
                    p("button", {
                      class: "dropdown-item text-primary py-1",
                      onClick: (a) => s.download(l, s.params),
                      type: "button"
                    }, t[29] || (t[29] = [
                      p("i", { class: "bi bi-download" }, null, -1),
                      F(" Download ")
                    ]), 8, dA)
                  ])) : A("", !0),
                  t[39] || (t[39] = p("li", null, [
                    p("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.original.width ? (b(), y("li", fA, [
                    p("small", pA, [
                      t[30] || (t[30] = p("span", { class: "text-muted fw-light me-3" }, "original resolution", -1)),
                      F(" " + O(o.original.width) + " x " + O(o.original.height), 1)
                    ])
                  ])) : A("", !0),
                  o.isDocument ? A("", !0) : (b(), y("li", gA, [
                    p("small", mA, [
                      t[31] || (t[31] = p("span", { class: "text-muted fw-light me-3" }, "original size & extension", -1)),
                      p("span", null, [
                        p("span", {
                          innerHTML: s.roundFileSize(o.original.bytes, !0)
                        }, null, 8, bA),
                        p("small", yA, O(o.original.extension), 1)
                      ])
                    ])
                  ])),
                  (b(!0), y(W, null, z(o.types, (a, u) => (b(), y(W, { key: a }, [
                    o.isDocument ? A("", !0) : (b(), y("li", vA, t[32] || (t[32] = [
                      p("hr", { class: "dropdown-divider" }, null, -1)
                    ]))),
                    o.original.width ? (b(), y("li", _A, [
                      p("small", EA, [
                        p("span", wA, [
                          p("span", TA, O(u), 1),
                          t[33] || (t[33] = F(" resolution & crop"))
                        ]),
                        p("span", null, [
                          F(O(a.width) + " x " + O(a.height) + " ", 1),
                          a.crop ? (b(), y("small", AA, O(a.crop), 1)) : A("", !0)
                        ])
                      ])
                    ])) : A("", !0),
                    p("li", null, [
                      p("small", NA, [
                        p("span", OA, [
                          o.isDocument ? A("", !0) : (b(), y("span", CA, O(u), 1)),
                          t[34] || (t[34] = F(" size & extension"))
                        ]),
                        p("span", null, [
                          p("span", {
                            class: $({ "text-danger": a.bytes > o.original.bytes }),
                            innerHTML: s.roundFileSize(a.bytes, !0)
                          }, null, 10, SA),
                          p("small", LA, O(a.extension), 1)
                        ])
                      ])
                    ])
                  ], 64))), 128)),
                  t[40] || (t[40] = p("li", null, [
                    p("hr", { class: "dropdown-divider" })
                  ], -1)),
                  o.uploaded ? (b(), y("li", kA, [
                    p("small", xA, [
                      t[35] || (t[35] = p("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
                      t[36] || (t[36] = F()),
                      p("span", null, O(s.dateFormat(o.timestamp * 1e3)), 1)
                    ])
                  ])) : A("", !0),
                  p("li", null, [
                    p("small", IA, [
                      p("span", $A, O(o.uploaded ? "uploaded" : "uploading") + " bytes", 1),
                      t[37] || (t[37] = F()),
                      p("span", {
                        innerHTML: s.roundFileSize(o.bytes, !0)
                      }, null, 8, RA)
                    ])
                  ]),
                  p("li", null, [
                    p("small", DA, [
                      p("span", MA, O(o.uploaded ? "uploaded" : "uploading") + " filename", 1),
                      t[38] || (t[38] = F()),
                      p("span", null, O(o.slug), 1)
                    ])
                  ])
                ])
              ])
            ])) : (b(), y("div", qA, t[42] || (t[42] = [
              p("span", null, null, -1)
            ])))
          ])
        ], 2))), 128))
      ])) : A("", !0),
      p("div", BA, [
        p("div", PA, [
          p("label", {
            for: s.uploadId,
            class: $([{ "disabled bg-secondary": s.files && s.params.limit <= s.files.length }, "btn btn-light border border-dark cursor-pointer w-100"])
          }, [
            s.files && s.params.limit > s.files.length ? (b(), y("span", VA, [
              t[46] || (t[46] = p("i", { class: "bi bi-upload me-2" }, null, -1)),
              F(" " + O(s.params.text) + " ", 1),
              s.params.limit ? (b(), y("small", FA, [
                t[43] || (t[43] = F(" ( ")),
                p("strong", UA, O(s.files.length), 1),
                t[44] || (t[44] = F(" / ")),
                p("span", HA, O(s.params.limit), 1),
                t[45] || (t[45] = F(" ) "))
              ])) : A("", !0)
            ])) : (b(), y("span", WA, t[47] || (t[47] = [
              p("i", { class: "bi bi-exclamation-circle" }, null, -1),
              F(" You've reached the upload limit ")
            ])))
          ], 10, jA),
          p("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[6] || (t[6] = (o) => s.toggleView())
          }, [
            s.params.ui != "list" ? (b(), y("i", zA)) : A("", !0),
            s.params.ui == "list" ? (b(), y("i", KA)) : A("", !0)
          ]),
          p("button", {
            disabled: !s.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[7] || (t[7] = (o) => s.resetConfirm())
          }, t[48] || (t[48] = [
            p("i", { class: "bi bi-trash" }, null, -1)
          ]), 8, GA)
        ]),
        p("div", YA, [
          p("small", null, [
            s.params.accept ? (b(), y("div", XA, [
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
      }, null, 40, ZA)) : A("", !0)
    ], 2)
  ]);
}
const JA = /* @__PURE__ */ He(tT, [["render", QA], ["__scopeId", "data-v-074cafd8"]]), tN = {
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
    modelValue(s) {
      this.setNewItem(s);
    }
  },
  methods: {
    setNewItem(s) {
      this.optionValue === "object" ? this.newitem = s && s.value : this.newitem = s;
    },
    async loadOptions() {
      this.options = await this.selectOptions(this.field.options, this.field);
    },
    getValueOrFunction(s, t) {
      return Mr(s, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    async selectOptions(s, t) {
      return typeof s == "function" ? await s(this.item, t, this) : s;
    },
    handleChange(s) {
      if (this.optionValue === "object") {
        const t = this.options.find(
          (e) => e.value === this.newitem
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
}, eN = tN, sN = ["name", "id", "readonly", "required"], nN = ["value"];
function iN(s, t, e, n, i, r) {
  return G((b(), y("select", {
    class: $(["form-select", s.getValueOrFunction(s.field.inputclass ? s.field.inputclass : "", { field: s.field, item: s.item })]),
    name: s.field.name,
    id: s.formId + "_" + s.field.name,
    onChange: t[0] || (t[0] = (o) => s.handleChange(o)),
    "onUpdate:modelValue": t[1] || (t[1] = (o) => s.newitem = o),
    readonly: s.field.readonly,
    required: s.field.required
  }, [
    (b(!0), y(W, null, z(s.options, (o) => (b(), y("option", {
      class: $(s.getValueOrFunction(s.field.optionclass ? s.field.optionclass : "", { field: s.field, item: s.item, option: o })),
      key: o,
      value: o.value
    }, O(o.label ? o.label : o.value), 11, nN))), 128))
  ], 42, sN)), [
    [$e, s.newitem]
  ]);
}
const Dd = /* @__PURE__ */ He(eN, [["render", iN]]), rN = {
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
    modelValue(s) {
      this.value = s, (!this.value || typeof this.value != "object") && (this.value = []);
    }
  },
  methods: {
    getValueOrFunction(s, t) {
      return Mr(s, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    selectOptions(s, t) {
      return typeof s == "function" ? s(this.item, t, this) : s;
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
    arrayAddNewItem(s, t) {
      let e = {};
      for (let n in s.elements) {
        let i = Object.assign({}, s.elements[n]), r = i.value ? i.value : null;
        if (r != null)
          e[n] = r;
        else
          return;
      }
      this.value.push(e), this.$emit("update:modelValue", this.value);
      for (let n in s.elements)
        s.elements[n].value = null;
    },
    arrayRemoveItem(s, t) {
      s.splice(t, 1);
    },
    arrayItemMoveUp(s, t) {
      vh(s, t);
    },
    arrayItemMoveDown(s, t) {
      _h(s, t);
    }
  },
  components: {
    VuAdminFormSelect: Dd
  }
}, oN = rN, aN = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, lN = { class: "col-10" }, cN = { class: "row g-1 d-flex align-items-center justify-content-between" }, uN = { class: "col-10" }, hN = { class: "row g-1 d-flex align-items-center justify-content-between" }, dN = ["innerHTML"], fN = {
  key: 1,
  class: "input-group input-group-sm"
}, pN = ["type", "required", "placeholder", "onUpdate:modelValue"], gN = { class: "col-2 text-nowrap text-end" }, mN = ["onClick"], bN = ["onClick"], yN = ["onClick"], vN = { key: 0 }, _N = { class: "row g-1 d-flex align-items-center justify-content-between" }, EN = { class: "col-10" }, wN = { class: "row g-1 d-flex align-items-center justify-content-between" }, TN = { class: "input-group input-group-sm" }, AN = {
  key: 0,
  class: "input-group-text"
}, NN = ["type", "placeholder", "onUpdate:modelValue"], ON = {
  key: 3,
  class: "input-group-text"
}, CN = { class: "col-2" };
function SN(s, t, e, n, i, r) {
  const o = Re("VuAdminFormSelect");
  return b(), y("div", null, [
    p("div", aN, [
      p("div", lN, [
        p("div", cN, [
          (b(!0), y(W, null, z(s.field.elements, (l) => (b(), y("div", {
            key: l,
            class: $(l.class || "col")
          }, [
            p("small", null, O(l.placeholder ? l.placeholder : l.prefix ? l.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = p("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (b(!0), y(W, null, z(s.value, (l, a) => (b(), y("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: a
    }, [
      p("div", uN, [
        p("div", hN, [
          (b(!0), y(W, null, z(l, (u, h) => (b(), y("div", {
            key: h,
            class: $(s.field.elements[h].class || "col")
          }, [
            s.field.elements[h].template ? (b(), y("span", {
              key: 0,
              innerHTML: s.getValueOrFunction(s.field.elements[h].template, s.value[a])
            }, null, 8, dN)) : (b(), y("div", fN, [
              s.field.elements[h].type == "select" && s.value[a][h] ? (b(), es(o, {
                key: 0,
                modelValue: s.value[a][h],
                "onUpdate:modelValue": (d) => s.value[a][h] = d,
                field: s.field.elements[h],
                item: s.item,
                settings: s.settings,
                formId: s.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : G((b(), y("input", {
                key: 1,
                type: s.field.elements[h].type,
                required: s.field.elements[h].required,
                placeholder: s.field.elements[h].placeholder || h,
                class: "form-control",
                "onUpdate:modelValue": (d) => s.value[a][h] = d
              }, null, 8, pN)), [
                [Ss, s.value[a][h]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      p("div", gN, [
        s.field.sortable ? (b(), y("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => s.arrayItemMoveUp(s.value, a)
        }, t[2] || (t[2] = [
          p("i", { class: "bi bi-arrow-up" }, null, -1)
        ]), 8, mN)) : A("", !0),
        s.field.sortable ? (b(), y("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (u) => s.arrayItemMoveDown(s.value, a + 1)
        }, t[3] || (t[3] = [
          p("i", { class: "bi bi-arrow-down" }, null, -1)
        ]), 8, bN)) : A("", !0),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (u) => s.arrayRemoveItem(s.value, a)
        }, t[4] || (t[4] = [
          p("i", { class: "bi bi-trash" }, null, -1)
        ]), 8, yN)
      ])
    ]))), 128)),
    s.item[s.field.name] && s.item[s.field.name].length ? (b(), y("hr", vN)) : A("", !0),
    p("div", _N, [
      p("div", EN, [
        p("div", wN, [
          (b(!0), y(W, null, z(s.field.elements, (l) => (b(), y("div", {
            key: l,
            class: $(l.class || "col")
          }, [
            p("div", TN, [
              l.prefix ? (b(), y("span", AN, O(l.prefix), 1)) : A("", !0),
              l.type == "select" && (!l.relation || l.relation && l.relation.items) ? (b(), es(o, {
                key: 1,
                modelValue: l.value,
                "onUpdate:modelValue": (a) => l.value = a,
                field: l,
                item: s.item,
                settings: s.settings,
                formId: s.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : G((b(), y("input", {
                key: 2,
                type: l.type,
                placeholder: l.placeholder || l.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (a) => l.value = a
              }, null, 8, NN)), [
                [Ss, l.value]
              ]),
              l.suffix ? (b(), y("span", ON, O(l.suffix), 1)) : A("", !0)
            ]),
            A("", !0)
          ], 2))), 128))
        ])
      ]),
      p("div", CN, [
        p("button", {
          type: "button",
          class: "btn btn-sm btn-outline-primary my-1 w-100",
          onClick: t[0] || (t[0] = (l) => s.arrayAddNewItem(s.field, s.item))
        }, t[5] || (t[5] = [
          p("i", { class: "bi bi-plus" }, null, -1)
        ]))
      ])
    ])
  ]);
}
const LN = /* @__PURE__ */ He(oN, [["render", SN]]), kN = {
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
      return Mr(s, t, this.settings, this);
    },
    translate(s, t, e) {
      return qr(s, this.settings.translate, t, e || this.settings.language);
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
      vh(s, t);
    },
    arrayItemMoveDown(s, t) {
      _h(s, t);
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
    HtmlEditor: Qw,
    FileUpload: JA,
    VuAdminFormSelect: Dd,
    VuAdminFormList: LN
  }
}, xN = kN, IN = { class: "row m-1" }, $N = { class: "form-row-title mb-4 fw-lighter" }, RN = {
  key: 0,
  class: "row"
}, DN = { class: "form-group pb-3" }, MN = { key: 0 }, qN = {
  key: 0,
  class: "badge text-secondary fw-light"
}, BN = ["for", "innerHTML"], PN = { class: "input-group" }, jN = ["innerHTML"], VN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], FN = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "readonly", "required"], UN = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "readonly", "required"], HN = {
  key: 4,
  class: "form-check"
}, WN = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "readonly", "required"], zN = ["for"], KN = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "required"], GN = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "readonly", "required"], YN = ["innerHTML"], XN = { key: 4 }, ZN = { key: 0 }, QN = ["for"], JN = ["name", "id", "onUpdate:modelValue"], tO = ["onClick"], eO = {
  key: 5,
  class: "p-1"
}, sO = ["innerHTML"];
function nO(s, t, e, n, i, r) {
  const o = Re("VuAdminFormSelect"), l = Re("HtmlEditor"), a = Re("FileUpload"), u = Re("VuAdminFormList");
  return b(), y("div", IN, [
    (b(!0), y(W, null, z(s.settings.form.groups, (h) => (b(), y("div", {
      key: h,
      class: $([h.class ? h.class : "col-md-12"])
    }, [
      p("h2", $N, O(h.title), 1),
      s.item && h.fields ? (b(), y("div", RN, [
        (b(!0), y(W, null, z(h.fields, (d) => (b(), y("div", {
          class: $([s.getValueOrFunction(d.class ? d.class : "col-md-12"), "input_type_" + d.type]),
          key: d
        }, [
          p("div", DN, [
            d.label !== null ? (b(), y("span", MN, [
              ["html", "image", "upload"].indexOf(d.type) >= 0 ? (b(), y("label", {
                key: 0,
                class: $([{ required: d.required }, "form-label text-secondary mb-1"])
              }, [
                F(O(d.label ? d.label : s.translate(d.name)) + " ", 1),
                d.maxlength ? (b(), y("span", qN, O(s.item[d.name] ? s.item[d.name].length : 0) + " / " + O(d.maxlength), 1)) : A("", !0)
              ], 2)) : (b(), y("label", {
                key: 1,
                class: $([{ required: d.required }, "form-label text-secondary mb-1"]),
                for: s.formId + "_" + d.name,
                innerHTML: s.getValueOrFunction(d.label ? d.label : s.translate(d.name), { field: d, item: s.item })
              }, null, 10, BN))
            ])) : A("", !0),
            p("div", PN, [
              d.prefix ? (b(), y("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: s.getValueOrFunction(d.prefix, {
                  field: d,
                  item: s.item
                })
              }, null, 8, jN)) : A("", !0),
              d.type == "text" ? G((b(), y("input", {
                key: 1,
                class: $(["form-control", s.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: s.item })]),
                type: "text",
                name: d.name,
                id: s.formId + "_" + d.name,
                "onUpdate:modelValue": (g) => s.item[d.name] = g,
                minlength: d.minlength,
                maxlength: d.maxlength,
                placeholder: d.placeholder ? d.placeholder : "",
                readonly: d.readonly,
                required: d.required
              }, null, 10, VN)), [
                [ee, s.item[d.name]]
              ]) : A("", !0),
              d.type == "number" ? G((b(), y("input", {
                key: 2,
                class: $(["form-control", s.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: s.item })]),
                type: "number",
                name: d.name,
                id: s.formId + "_" + d.name,
                "onUpdate:modelValue": (g) => s.item[d.name] = g,
                min: d.min,
                max: d.max,
                step: d.step,
                placeholder: d.placeholder ? d.placeholder : "",
                readonly: d.readonly,
                required: d.required
              }, null, 10, FN)), [
                [ee, s.item[d.name]]
              ]) : A("", !0),
              ["date", "datetime", "datetime-local"].indexOf(d.type) >= 0 ? G((b(), y("input", {
                key: 3,
                class: $(["form-control", s.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: s.item })]),
                type: d.type,
                name: d.name,
                id: s.formId + "_" + d.name,
                "onUpdate:modelValue": (g) => s.item[d.name] = g,
                min: d.min,
                max: d.max,
                readonly: d.readonly,
                required: d.required
              }, null, 10, UN)), [
                [Ss, s.item[d.name]]
              ]) : A("", !0),
              d.type == "checkbox" ? (b(), y("div", HN, [
                G(p("input", {
                  class: $(["form-check-input", s.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: s.item })]),
                  type: "checkbox",
                  name: d.name,
                  id: s.formId + "_" + d.name,
                  "true-value": d.true != null ? d.true : !0,
                  "false-value": d.false != null ? d.false : !1,
                  "onUpdate:modelValue": (g) => s.item[d.name] = g,
                  readonly: d.readonly,
                  required: d.required
                }, null, 10, WN), [
                  [Bd, s.item[d.name]]
                ]),
                p("label", {
                  class: "form-check-label cursor-pointer",
                  for: s.formId + "_" + d.name
                }, O(d.checkbox), 9, zN)
              ])) : A("", !0),
              d.type == "email" ? G((b(), y("input", {
                key: 5,
                autocomplete: "on",
                class: $(["form-control", s.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: s.item })]),
                type: "email",
                name: d.name,
                id: s.formId + "_" + d.name,
                "onUpdate:modelValue": (g) => s.item[d.name] = g,
                minlength: d.minlength,
                maxlength: d.maxlength,
                placeholder: d.placeholder ? d.placeholder : "",
                readonly: d.readonly,
                required: d.required
              }, null, 10, KN)), [
                [ee, s.item[d.name]]
              ]) : A("", !0),
              d.type == "select" && (!d.relation || d.relation && d.relation.items) ? (b(), es(o, {
                key: 6,
                modelValue: s.item[d.name],
                "onUpdate:modelValue": (g) => s.item[d.name] = g,
                field: d,
                item: s.item,
                settings: s.settings,
                formId: s.formId
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : A("", !0),
              d.type == "textarea" ? G((b(), y("textarea", {
                key: 7,
                class: $(["form-control", s.getValueOrFunction(d.inputclass ? d.inputclass : "", { field: d, item: s.item })]),
                name: d.name,
                id: s.formId + "_" + d.name,
                "onUpdate:modelValue": (g) => s.item[d.name] = g,
                rows: d.rows,
                minlength: d.minlength,
                maxlength: d.maxlength,
                placeholder: d.placeholder ? d.placeholder : "",
                readonly: d.readonly,
                required: d.required
              }, "              ", 10, GN)), [
                [ee, s.item[d.name]]
              ]) : A("", !0),
              d.suffix ? (b(), y("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: s.getValueOrFunction(d.suffix, {
                  field: d,
                  item: s.item
                })
              }, null, 8, YN)) : A("", !0)
            ]),
            d.type == "html" ? (b(), es(l, {
              key: 1,
              modelValue: s.item[d.name],
              "onUpdate:modelValue": (g) => s.item[d.name] = g,
              class: $([d.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : A("", !0),
            d.type == "image" || d.type == "upload" ? (b(), es(a, {
              key: 2,
              modelValue: s.item[d.name],
              "onUpdate:modelValue": (g) => s.item[d.name] = g,
              class: $([d.class]),
              field: d,
              settings: s.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : A("", !0),
            d.type == "list" && (!d.relation || d.relation && d.relation.items) ? (b(), es(u, {
              key: 3,
              modelValue: s.item[d.name],
              "onUpdate:modelValue": (g) => s.item[d.name] = g,
              field: d,
              item: s.item,
              settings: s.settings,
              formId: s.formId
            }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : A("", !0),
            d.type == "addresses" ? (b(), y("span", XN, [
              s.item[d.name] ? (b(), y("div", ZN, [
                (b(!0), y(W, null, z(s.item[d.name], (g) => (b(), y("div", { key: g }, [
                  F(O(g) + " ", 1),
                  p("label", {
                    class: "form-label text-secondary mb-1",
                    for: s.formId + "_" + d.name
                  }, O(d.label), 9, QN),
                  G(p("input", {
                    class: "form-control",
                    type: "text",
                    name: d.name,
                    id: s.formId + "_" + d.name,
                    "onUpdate:modelValue": (m) => g.country = m
                  }, null, 8, JN), [
                    [ee, g.country]
                  ])
                ]))), 128))
              ])) : A("", !0),
              p("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (g) => s.insertAddress(d.name)
              }, " Add ", 8, tO)
            ])) : A("", !0),
            d.description ? (b(), y("div", eO, [
              p("i", {
                class: "text-muted",
                innerHTML: s.getValueOrFunction(d.description, {
                  field: d,
                  item: s.item
                })
              }, null, 8, sO)
            ])) : A("", !0)
          ])
        ], 2))), 128))
      ])) : A("", !0)
    ], 2))), 128))
  ]);
}
const iO = /* @__PURE__ */ He(xN, [["render", nO], ["__scopeId", "data-v-98d251d3"]]), rO = {
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
      return qr(s, this.settings.translate, t, e || this.settings.language);
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
          ts("GET", t.form.api, s),
          Je("GET", t.api)
        ).catch((o) => {
        }), n = await ni(e);
        if (ii(e, n.data, "form") || !n.data)
          return this.formNoWait(), !1;
        t.form.default && (n.data = Object.assign({}, t.form.default, n.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(n.data, e);
        let r;
        t.form.api.input.item ? r = typeof t.form.api.input.item == "string" ? n.data[t.form.api.input.item] : t.form.api.input.item(n.data, e) : r = n.data;
        for (let o of t.form.groups)
          for (let l of o.fields)
            l.relation && t.relations[l.relation.config] && (l.relation = Dr(t.relations[l.relation.config], l.relation), await this.fetchRelation(l, [r]));
        this.item = vr(r), this.itemOriginal = Object.assign({}, r), this.loaded = !0, this.formNoWait();
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
          ts(
            "DELETE",
            this.settings.form.api,
            e,
            t
          ),
          Je("DELETE", this.settings.api)
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
    VuAdminFormGroup: iO
  }
}, oO = rO, aO = ["id", "data-bs-theme"], lO = { class: "modal-header" }, cO = {
  key: 0,
  class: "modal-title"
}, uO = ["innerHTML"], hO = { key: 1 }, dO = { key: 2 }, fO = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, pO = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, gO = ["innerHTML"], mO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, bO = {
  key: 0,
  class: "modal-header d-flex justify-content-between"
}, yO = ["disabled"], vO = ["disabled"], _O = {
  key: 0,
  class: "d-inline-block m-1"
}, EO = { class: "dropdown d-inline-block" }, wO = ["innerHTML"], TO = { class: "dropdown-menu text-start" }, AO = { class: "me-2 text-muted" }, NO = ["innerHTML"], OO = {
  type: "button",
  class: "btn btn-sm btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, CO = {
  type: "submit",
  class: "btn btn-sm btn-primary m-1"
}, SO = {
  key: 1,
  class: "modal-body custom-scroll"
}, LO = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, kO = ["disabled"], xO = ["disabled"], IO = {
  type: "button",
  class: "btn btn-secondary m-1",
  "data-bs-dismiss": "modal"
}, $O = {
  type: "submit",
  class: "btn btn-primary m-1"
}, RO = {
  key: 3,
  class: "bg-light text-dark"
};
function DO(s, t, e, n, i, r) {
  const o = Re("VuAdminFormGroup");
  return s.item ? (b(), y("form", {
    key: 0,
    ref: "form",
    id: s.formId,
    class: $(["form", [s.settings.form.class, { wait: s.ui.wait.form }]]),
    onSubmit: t[11] || (t[11] = la((...l) => s.submitItem && s.submitItem(...l), ["prevent"])),
    "data-bs-theme": [s.settings.theme]
  }, [
    p("div", {
      class: $(["vua-overlay", { blocked: s.ui.block.form }])
    }, null, 2),
    p("div", lO, [
      s.loaded ? (b(), y("h5", cO, [
        s.settings.form.title && typeof s.settings.form.title == "function" ? (b(), y("span", {
          key: 0,
          innerHTML: s.settings.form.title(s.item, s.settings)
        }, null, 8, uO)) : A("", !0),
        s.settings.form.title && typeof s.settings.form.title == "string" ? (b(), y("span", hO, O(s.translate(s.settings.form.title)), 1)) : A("", !0),
        s.settings.form.title ? A("", !0) : (b(), y("span", dO, O(s.translate("Edit")), 1)),
        s.item[s.settings.pkey] ? (b(), y("small", fO, [
          t[12] || (t[12] = p("span", { class: "text-muted fw-light" }, "id", -1)),
          F(" " + O(s.item[s.settings.pkey]), 1)
        ])) : A("", !0)
      ])) : A("", !0),
      s.message.form ? (b(), y("span", pO, [
        p("span", {
          class: $(["text-" + s.message.form.priority])
        }, [
          t[13] || (t[13] = p("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          p("span", {
            innerHTML: s.message.form.msg
          }, null, 8, gO)
        ], 2)
      ])) : A("", !0),
      G(p("span", mO, t[14] || (t[14] = [
        p("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ls, s.ui.wait.form]
      ]),
      t[15] || (t[15] = p("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    s.item ? (b(), y("div", bO, [
      p("div", null, [
        p("button", {
          type: "button",
          class: "btn btn-sm btn-secondary m-1",
          onClick: t[0] || (t[0] = (l) => s.reloadItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[16] || (t[16] = p("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
          F(" " + O(s.translate("Reload")), 1)
        ], 8, yO),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-outline-warning m-1",
          onClick: t[1] || (t[1] = (l) => s.createItem())
        }, [
          t[17] || (t[17] = p("i", { class: "bi bi-plus-circle" }, null, -1)),
          F(" " + O(s.translate("New")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-outline-warning m-1",
          onClick: t[2] || (t[2] = (l) => s.copyItem())
        }, [
          t[18] || (t[18] = p("i", { class: "bi bi-copy" }, null, -1)),
          F(" " + O(s.translate("Copy")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-danger m-1",
          onClick: t[3] || (t[3] = (l) => s.deleteItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[19] || (t[19] = p("i", { class: "bi bi-trash" }, null, -1)),
          F(" " + O(s.translate("Delete")), 1)
        ], 8, vO)
      ]),
      p("div", null, [
        s.messages.form.length ? (b(), y("div", _O, [
          p("div", EO, [
            p("button", {
              class: $(["btn btn-sm dropdown-toggle", ["btn-" + s.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: s.messages.form.length + " " + (s.messages.form.length > 1 ? s.translate("messages") : s.translate("message"))
            }, null, 10, wO),
            p("ul", TO, [
              (b(!0), y(W, null, z(s.messages.form, (l) => (b(), y("li", { key: l }, [
                p("span", {
                  class: $(["dropdown-item", ["text-" + l.priority]])
                }, [
                  p("small", AO, O(l.datetime), 1),
                  p("span", {
                    innerHTML: l.msg
                  }, null, 8, NO)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : A("", !0),
        p("button", OO, [
          t[20] || (t[20] = p("i", { class: "bi bi-x" }, null, -1)),
          F(" " + O(s.translate("Close")), 1)
        ]),
        p("button", CO, [
          t[21] || (t[21] = p("i", { class: "bi bi-save" }, null, -1)),
          F(" " + O(s.translate("Save")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-sm btn-success m-1",
          onClick: t[4] || (t[4] = (...l) => s.submitAndClose && s.submitAndClose(...l))
        }, [
          t[22] || (t[22] = p("i", { class: "bi bi-save" }, null, -1)),
          F(" " + O(s.translate("Save and close")), 1)
        ])
      ])
    ])) : A("", !0),
    s.settings.form ? (b(), y("div", SO, [
      s.settings.form.visible && s.settings.form.groups ? (b(), es(o, {
        key: 0,
        modelValue: s.item,
        "onUpdate:modelValue": t[5] || (t[5] = (l) => s.item = l),
        formid: s.formId,
        settings: s.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : A("", !0)
    ])) : A("", !0),
    s.item ? (b(), y("div", LO, [
      p("div", null, [
        p("button", {
          type: "button",
          class: "btn btn-secondary m-1",
          onClick: t[6] || (t[6] = (l) => s.reloadItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[23] || (t[23] = p("i", { class: "bi bi-arrow-clockwise" }, null, -1)),
          F(" " + O(s.translate("Reload")), 1)
        ], 8, kO),
        p("button", {
          type: "button",
          class: "btn btn-outline-warning m-1",
          onClick: t[7] || (t[7] = (l) => s.createItem())
        }, [
          t[24] || (t[24] = p("i", { class: "bi bi-plus-circle" }, null, -1)),
          F(" " + O(s.translate("New")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-outline-warning m-1",
          onClick: t[8] || (t[8] = (l) => s.copyItem())
        }, [
          t[25] || (t[25] = p("i", { class: "bi bi-copy" }, null, -1)),
          F(" " + O(s.translate("Copy")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-danger m-1",
          onClick: t[9] || (t[9] = (l) => s.deleteItem()),
          disabled: !s.item[s.settings.pkey]
        }, [
          t[26] || (t[26] = p("i", { class: "bi bi-trash" }, null, -1)),
          F(" " + O(s.translate("Delete")), 1)
        ], 8, xO)
      ]),
      p("div", null, [
        p("button", IO, [
          t[27] || (t[27] = p("i", { class: "bi bi-x" }, null, -1)),
          F(" " + O(s.translate("Close")), 1)
        ]),
        p("button", $O, [
          t[28] || (t[28] = p("i", { class: "bi bi-save" }, null, -1)),
          F(" " + O(s.translate("Save")), 1)
        ]),
        p("button", {
          type: "button",
          class: "btn btn-success m-1",
          onClick: t[10] || (t[10] = (...l) => s.submitAndClose && s.submitAndClose(...l))
        }, [
          t[29] || (t[29] = p("i", { class: "bi bi-save" }, null, -1)),
          F(" " + O(s.translate("Save and close")), 1)
        ])
      ])
    ])) : A("", !0),
    s.settings.debug ? (b(), y("pre", RO, "        " + O(s.item) + `
    `, 1)) : A("", !0)
  ], 42, aO)) : A("", !0);
}
const MO = /* @__PURE__ */ He(oO, [["render", DO], ["__scopeId", "data-v-ad65ae05"]]), qO = {
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
      return qr(s, this.settings.translate, t, e || this.settings.language);
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
}, BO = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, PO = { class: "dropdown d-inline-block m-1" }, jO = { class: "mx-1" }, VO = { key: 0 }, FO = {
  key: 0,
  class: "dropdown-menu text-end"
}, UO = ["onClick"], HO = { class: "ms-2" }, WO = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, zO = {
  key: 1,
  class: "bi bi-circle ms-2"
}, KO = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, GO = { class: "pagination pagination-sm m-1" }, YO = { class: "page-item" }, XO = ["innerHTML"], ZO = { class: "page-item" }, QO = ["innerHTML"], JO = ["onClick"], tC = { class: "page-item" }, eC = ["innerHTML"], sC = {
  key: 0,
  class: "page-item"
}, nC = ["innerHTML"];
function iC(s, t, e, n, i, r) {
  return e.config.pagination.hidden ? A("", !0) : (b(), y("nav", BO, [
    p("div", null, [
      p("div", PO, [
        p("button", {
          type: "button",
          class: $(["btn btn-sm btn-secondary", { "dropdown-toggle": e.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          G(p("span", jO, [
            p("strong", null, O(e.config.pagination.from) + "-" + O(e.config.pagination.to), 1),
            e.config.pagination.total ? (b(), y("span", VO, " / " + O(e.config.pagination.total), 1)) : A("", !0)
          ], 512), [
            [Ls, e.config.pagination.from > 0]
          ])
        ], 2),
        e.config.pagination.limits ? (b(), y("ul", FO, [
          p("li", null, [
            (b(!0), y(W, null, z(e.config.pagination.limits, (o) => (b(), y("span", {
              class: $(["dropdown-item cursor-pointer", { selected: e.config.pagination.limit == o }]),
              key: o,
              onClick: (l) => r.setPageLimit(o)
            }, [
              p("strong", null, O(o), 1),
              p("small", HO, O(r.translate("row")) + "/" + O(r.translate("page")), 1),
              e.config.pagination.limit == o ? (b(), y("i", WO)) : A("", !0),
              e.config.pagination.limit != o ? (b(), y("i", zO)) : A("", !0)
            ], 10, UO))), 128))
          ])
        ])) : A("", !0)
      ]),
      G(p("div", KO, t[4] || (t[4] = [
        p("span", { class: "visually-hidden" }, "Loading...", -1)
      ]), 512), [
        [Ls, e.ui && e.ui.wait.table]
      ])
    ]),
    p("ul", GO, [
      p("li", YO, [
        p("a", {
          class: $(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          p("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, XO)
        ], 2)
      ]),
      p("li", ZO, [
        p("a", {
          class: $(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(e.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          p("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, QO)
        ], 2)
      ]),
      (b(!0), y(W, null, z(e.config.pagination.numbers, (o) => (b(), y("li", {
        key: o,
        class: "page-item"
      }, [
        p("a", {
          class: $(["page-link cursor-pointer", {
            disabled: o > e.config.pagination.pages,
            current: o == e.config.pagination.page
          }]),
          onClick: (l) => r.setPage(o)
        }, O(o), 11, JO)
      ]))), 128)),
      p("li", tC, [
        p("a", {
          class: $(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(e.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          p("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, eC)
        ], 2)
      ]),
      e.config.pagination.total ? (b(), y("li", sC, [
        p("a", {
          class: $(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(e.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          p("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, nC)
        ], 2)
      ])) : A("", !0)
    ])
  ]));
}
const rC = /* @__PURE__ */ He(qO, [["render", iC], ["__scopeId", "data-v-a7fb8960"]]), mu = jb(), oC = {
  name: "VuAdminTable",
  props: {
    settings: Object
  },
  components: {
    VuAdminForm: MO,
    VuAdminTablePagination: rC
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
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Ds(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (s) => {
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
      return Mr(s, t, this.settings, this);
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
        if (t.relation && this.settings.relations[t.relation.config]) {
          let e = [];
          t.relation = Dr(this.settings.relations[t.relation.config], t.relation);
          for (let n of s)
            n[t.relation.local] && e.push(n[t.relation.local]);
          t.relation.ids = Wb(e), await this.fetchRelation(t, s);
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
        ts("GET", s.table.api, null, t),
        Je("GET", s.table.api)
      ), i = await ni(n), r = ii(n, i.data);
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
      let l = Vb(o);
      return this.convertIn(s.table.columns, l), l;
    },
    async fetchRelation(s, t) {
      try {
        let e = s.relation.params ? s.relation.params : {};
        s.relation.columns && (e.columns = JSON.stringify(s.relation.columns));
        let n = {};
        if (s.relation.ids && s.relation.ids.length) {
          let a = (typeof s.relation.ids[0] == "string" ? "text" : "number") === "string" ? "'" + s.relation.ids.join("','") + "'" : s.relation.ids.join(",");
          n[s.relation.foreign] = {
            type: "array",
            value: a,
            operator: "IN"
          };
        }
        e.filter = JSON.stringify(n), Xb(e, {
          column: s
        });
        const i = await fetch(
          ts("GET", s.relation.api, null, e),
          Je("GET", s.relation.api)
        );
        if (i.status !== 200)
          throw new Error(
            this.translate("Response status: " + i.status)
          );
        const r = await ni(i);
        if (ii(i, r.data) || !r.data)
          return;
        if (s.relation.api.input.items ? s.relation.items = typeof s.relation.api.input.items == "string" ? r.data[s.relation.api.input.items] : s.relation.api.input.items(r.data, i) : s.relation.items = r.data, t && t[0])
          for (let l of t)
            l[s.relation.local] && (l[s.relation.entity] = s.relation.items.find(
              (a, u, h) => a[s.relation.foreign] === l[s.relation.local]
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
          ts(
            "DELETE",
            this.settings.form.api,
            e,
            t
          ),
          Je("DELETE", this.settings.api)
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
          ts("DELETE", this.settings.table.api),
          Je("DELETE", this.settings.api, {
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
          for (let d in s)
            this.settings.form.api.output.fields.includes(d) && (i[d] = s[d]);
        else
          Object.assign(i, s);
        let o, l;
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = Fb(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, s), !this.settings.form.api.output.item)
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
          ts(a, this.settings.form.api, r, n),
          Je(a, this.settings.form.api, {
            body: o
          })
        );
        const u = await ni(l), h = ii(l, u.data);
        if (h) {
          e && e(h, s, n, l);
          return;
        }
        if (u.error) {
          e && e(u.error, s, n, l);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(u.data, n), t && t(u.data, l);
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
          ts("PUT", this.settings.table.api),
          Je("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: t,
              ids: this.selected
            })
          })
        ).catch((r) => {
          console.error(r.message), this.addTableMessage(r.message, 3500, "danger", r);
        }), n = await ni(e), i = ii(e, n.data);
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
      s.multiple ? zb(s.value, e) : s.value = s.value === e ? null : e, this.reloadTable();
    },
    dropdownSelectAll(s, t) {
      Kb(s, t), this.reloadTable();
    },
    dropdownSelectInvert(s, t) {
      Gb(s, t), this.reloadTable();
    },
    dropdownSelectClear(s) {
      typeof s != "object" ? s.value = null : Yb(s), this.reloadTable();
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
        let i = Ub(
          n,
          this.settings.table.exports[s.type].fields
        );
        Hb(i, this.settings.entity + ".csv");
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
      return qr(s, this.settings.translate, t, e || this.settings.language);
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
}, aC = { key: 0 }, lC = ["data-bs-theme"], cC = { class: "vua-table-title" }, uC = { class: "d-flex align-items-center justify-content-between" }, hC = { class: "d-inline-block" }, dC = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, fC = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, pC = {
  key: 0,
  class: "d-inline-block"
}, gC = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, mC = ["innerHTML"], bC = { class: "dropdown d-inline-block" }, yC = ["innerHTML"], vC = { class: "dropdown-menu text-start" }, _C = { class: "me-2 text-muted" }, EC = ["innerHTML"], wC = ["onClick"], TC = {
  key: 1,
  class: "dropdown d-inline-block"
}, AC = { class: "mx-1" }, NC = { key: 0 }, OC = { class: "dropdown-menu" }, CC = ["onClick"], SC = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, LC = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, kC = { class: "badge text-secondary fw-normal" }, xC = {
  key: 2,
  class: "dropdown d-inline-block"
}, IC = { class: "mx-1" }, $C = { class: "dropdown-menu" }, RC = ["onClick"], DC = { class: "vua-table-header" }, MC = ["width"], qC = ["onClick"], BC = ["innerHTML"], PC = {
  key: 0,
  class: "bi bi-arrow-down"
}, jC = {
  key: 1,
  class: "bi bi-arrow-up"
}, VC = { key: 0 }, FC = ["disabled", "onClick"], UC = {
  key: 0,
  class: "vua-table-filter"
}, HC = ["width"], WC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, zC = { class: "bi bi-check-all" }, KC = { class: "bi bi-x-lg" }, GC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, YC = ["onUpdate:modelValue"], XC = ["disabled", "onClick"], ZC = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, QC = ["onUpdate:modelValue", "disabled"], JC = { value: "=" }, tS = { value: ">" }, eS = { value: ">=" }, sS = { value: "<" }, nS = { value: "<=" }, iS = ["onUpdate:modelValue", "disabled"], rS = ["value"], oS = ["onUpdate:modelValue", "disabled", "min", "max"], aS = ["disabled", "onClick"], lS = { key: 3 }, cS = {
  key: 0,
  class: "dropdown"
}, uS = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, hS = { class: "dropdown-menu" }, dS = ["onClick"], fS = {
  key: 0,
  class: "bi bi-check-square"
}, pS = {
  key: 1,
  class: "bi bi-square"
}, gS = { key: 0 }, mS = { key: 1 }, bS = ["onClick"], yS = { key: 2 }, vS = ["onClick"], _S = { key: 3 }, ES = ["onClick"], wS = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, TS = ["onUpdate:modelValue", "multiple"], AS = ["value"], NS = ["disabled", "onClick"], OS = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, CS = ["onUpdate:modelValue"], SS = { value: "=" }, LS = { value: ">" }, kS = { value: ">=" }, xS = { value: "<" }, IS = { value: "<=" }, $S = ["onUpdate:modelValue"], RS = ["value"], DS = ["type", "onUpdate:modelValue"], MS = ["disabled", "onClick"], qS = ["disabled", "onClick"], BS = { class: "align-middle" }, PS = ["data-label", "width", "onClick"], jS = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, VS = ["innerHTML"], FS = { key: 1 }, US = ["innerHTML"], HS = ["aria-valuenow", "aria-valuemax"], WS = { key: 0 }, zS = {
  key: 4,
  class: "input-group input-group-sm"
}, KS = ["innerHTML"], GS = ["type", "onChange", "onUpdate:modelValue"], YS = ["onChange", "onUpdate:modelValue"], XS = ["value"], ZS = ["innerHTML"], QS = { key: 5 }, JS = ["disabled", "onClick"], tL = ["innerHTML"], eL = { key: 2 }, sL = { key: 0 }, nL = ["colspan"], iL = { class: "row g-3 align-items-center" }, rL = { class: "col-form-label" }, oL = ["type", "onUpdate:modelValue", "onChange"], aL = ["onUpdate:modelValue", "onChange"], lL = ["onUpdate:modelValue", "onChange"], cL = ["value"], uL = ["innerHTML"], hL = {
  key: 0,
  class: "bg-light text-dark"
}, dL = {
  key: 0,
  class: "vua-table-bulk border-info"
}, fL = ["data-label", "width"], pL = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, gL = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, mL = ["type", "disabled", "onChange", "onUpdate:modelValue"], bL = ["disabled", "onChange", "onUpdate:modelValue"], yL = ["value"], vL = ["onClick"], _L = {
  key: 0,
  class: "bi bi-square text-secondary"
}, EL = {
  key: 1,
  class: "bi bi-check-square"
}, wL = { key: 2 }, TL = ["disabled", "onClick"], AL = ["innerHTML"], NL = { key: 2 }, OL = ["id"], CL = { class: "modal-dialog modal-xl" }, SL = { class: "modal-content h-100" };
function LL(s, t, e, n, i, r) {
  const o = Re("VuAdminTablePagination"), l = Re("VuAdminForm");
  return e.settings && e.settings.table ? (b(), y("div", aC, [
    p("div", {
      class: $(["vua-table-container", [e.settings.class]]),
      "data-bs-theme": [e.settings.theme]
    }, [
      p("div", {
        class: $(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      p("div", cC, [
        p("div", uC, [
          p("div", hC, [
            e.settings.table.title ? (b(), y("h5", dC, O(e.settings.table.title), 1)) : A("", !0),
            G(p("div", fC, t[15] || (t[15] = [
              p("span", { class: "visually-hidden" }, "Loading...", -1)
            ]), 512), [
              [Ls, i.ui.wait.table && e.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (b(), y("div", pC, [
            i.message.table ? (b(), y("small", gC, [
              p("span", {
                class: $(["text-" + i.message.table.priority])
              }, [
                p("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, mC)
              ], 2)
            ])) : A("", !0),
            p("div", bC, [
              p("button", {
                class: $(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, yC),
              p("ul", vC, [
                (b(!0), y(W, null, z(i.messages.table, (a) => (b(), y("li", { key: a }, [
                  p("span", {
                    class: $(["dropdown-item", ["text-" + a.priority]])
                  }, [
                    p("small", _C, O(a.datetime), 1),
                    p("span", {
                      class: "fw-bold",
                      innerHTML: a.msg
                    }, null, 8, EC)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : A("", !0)
        ])
      ]),
      e.settings.table.control ? (b(), y("div", {
        key: 0,
        class: $(["vua-table-control", [e.settings.table.control.class]])
      }, [
        (b(!0), y(W, null, z(e.settings.table.control.buttons, (a) => (b(), y("span", {
          key: a.action
        }, [
          a.action !== "TABLE_COLUMNS" && !a.dropdowns ? (b(), y("button", {
            key: 0,
            type: "button",
            class: $([
              a.class ? a.class : r.getButtonClassByAction(a.action)
            ]),
            onClick: (u) => r.tableAction(a, {
              items: i.items,
              $event: u
            })
          }, [
            p("i", {
              class: $([
                a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                  button: a,
                  table: this
                }) : r.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            F(" " + O(r.translate(a.title)), 1)
          ], 10, wC)) : A("", !0),
          a.action === "TABLE_COLUMNS" ? (b(), y("div", TC, [
            p("button", {
              type: "button",
              class: $([[
                a.class ? a.class : r.getButtonClassByAction(a.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              G(p("span", AC, [
                p("i", {
                  class: $([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                F(" " + O(r.translate(a.title)) + " ", 1),
                r.countHiddenColumns() ? (b(), y("span", NC, " ( " + O(r.countHiddenColumns()) + " " + O(r.translate("hidden")) + " ) ", 1)) : A("", !0)
              ], 512), [
                [Ls, e.settings.table.columns.length > 0]
              ])
            ], 2),
            p("ul", OC, [
              (b(!0), y(W, null, z(e.settings.table.columns, (u) => (b(), y("li", { key: u }, [
                p("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (h) => r.toggleColumn(u)
                }, [
                  u.hidden ? A("", !0) : (b(), y("i", SC)),
                  u.hidden ? (b(), y("i", LC)) : A("", !0),
                  F(" " + O(u.title) + " ", 1),
                  p("small", kC, O(u.name), 1)
                ], 8, CC)
              ]))), 128)),
              t[16] || (t[16] = p("li", null, [
                p("hr", { class: "dropdown-divider" })
              ], -1)),
              p("li", null, [
                p("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (u) => r.toggleColumn(!0))
                }, O(r.translate("Visible all")), 1)
              ]),
              p("li", null, [
                p("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (u) => r.toggleColumn(!1))
                }, O(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : A("", !0),
          a.dropdowns ? (b(), y("div", xC, [
            p("button", {
              type: "button",
              class: $([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              p("span", IC, [
                p("i", {
                  class: $([
                    a.icon !== void 0 ? r.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : r.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                F(" " + O(r.translate(a.title)), 1)
              ])
            ], 2),
            p("ul", $C, [
              (b(!0), y(W, null, z(a.dropdowns, (u) => (b(), y("li", { key: u }, [
                p("span", {
                  class: $(["dropdown-item cursor-pointer", [u.class]]),
                  onClick: (h) => r.tableAction(u, {
                    items: i.items,
                    $event: h
                  })
                }, [
                  u.icon ? (b(), y("i", {
                    key: 0,
                    class: $([u.icon])
                  }, null, 2)) : A("", !0),
                  F(" " + O(r.translate(u.title)), 1)
                ], 10, RC)
              ]))), 128))
            ])
          ])) : A("", !0)
        ]))), 128))
      ], 2)) : A("", !0),
      e.settings.table ? (b(), y("table", {
        key: 1,
        class: $(["table vua-table mb-0", [e.settings.table.class]])
      }, [
        p("thead", null, [
          p("tr", DC, [
            (b(!0), y(W, null, z(e.settings.table.columns, (a) => (b(), y("th", {
              class: $(["", [a.header ? a.header.class : ""]]),
              style: Zn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width
            }, [
              p("span", {
                class: $(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(a) }]),
                onClick: (u) => r.sortTable(a)
              }, [
                p("span", {
                  innerHTML: a.header && a.header.title !== void 0 ? r.translate(a.header.title) : a.title ? r.translate(a.title) : r.translate(a.name)
                }, null, 8, BC),
                i.config.order[a.name] ? (b(), y("span", {
                  key: 0,
                  class: $(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[a.name].fixed
                  }])
                }, [
                  i.config.order[a.name].dir === "ASC" ? (b(), y("i", PC)) : A("", !0),
                  i.config.order[a.name].dir === "DESC" ? (b(), y("i", jC)) : A("", !0),
                  F(" " + O(i.config.order[a.name].idx + 1), 1)
                ], 2)) : A("", !0)
              ], 10, qC),
              a.header && a.header.buttons ? (b(), y("span", VC, [
                (b(!0), y(W, null, z(a.header.buttons, (u) => (b(), y("button", {
                  key: u.action,
                  type: "button",
                  disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                  class: $([
                    u.class ? u.class : r.getButtonClassByAction(u.action)
                  ]),
                  onClick: (h) => r.tableAction(u, {
                    items: i.items,
                    $event: h
                  })
                }, [
                  p("i", {
                    class: $([
                      u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                        button: u,
                        column: a,
                        table: this
                      }) : r.getButtonIconClassByAction(u.action)
                    ])
                  }, null, 2),
                  F(" " + O(r.translate(u.title)), 1)
                ], 10, FC))), 128))
              ])) : A("", !0)
            ], 14, MC))), 128))
          ]),
          r.countFilters() ? (b(), y("tr", UC, [
            (b(!0), y(W, null, z(e.settings.table.columns, (a) => (b(), y("th", {
              style: Zn([a.hidden ? "display: none" : ""]),
              key: a,
              width: a.width,
              class: $([a.filter ? a.filter.class : ""])
            }, [
              a.index && a.click ? (b(), y("div", WC, [
                p("span", {
                  class: $(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (u) => r.toggleSelectedRowInPage())
                }, [
                  G(p("i", zC, null, 512), [
                    [Ls, !r.haveSelectedRowInPage()]
                  ]),
                  G(p("i", KC, null, 512), [
                    [Ls, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : A("", !0),
              a.filter && a.filter.type == "text" ? (b(), y("div", GC, [
                G(p("input", {
                  type: "text",
                  class: $([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onKeyup: t[3] || (t[3] = oi((u) => r.reloadTable(), ["enter"]))
                }, null, 42, YC), [
                  [ee, a.filter.value]
                ]),
                a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 0,
                  class: $(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[17] || (t[17] = [
                  p("i", { class: "bi bi-x" }, null, -1)
                ]), 10, XC)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "number" ? (b(), y("div", ZC, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[4] || (t[4] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  p("option", JC, O(r.translate("=")), 1),
                  p("option", tS, O(r.translate(">")), 1),
                  p("option", eS, O(r.translate(">=")), 1),
                  p("option", sS, O(r.translate("<")), 1),
                  p("option", nS, O(r.translate("<=")), 1)
                ], 40, QC)), [
                  [$e, a.filter.operator]
                ]) : A("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  disabled: a.filter.fixed,
                  onChange: t[5] || (t[5] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (b(!0), y(W, null, z(a.filter.operators, (u) => (b(), y("option", {
                    key: u,
                    value: u.value
                  }, O(u.label), 9, rS))), 128))
                ], 40, iS)), [
                  [$e, a.filter.operator]
                ]) : A("", !0),
                G(p("input", {
                  type: "number",
                  class: $(["form-control", {
                    fixed: a.filter.fixed
                  }]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  disabled: a.filter.fixed,
                  min: a.filter.min,
                  max: a.filter.max,
                  onChange: t[6] || (t[6] = (u) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = oi((u) => r.reloadTable(), ["enter"]))
                }, null, 42, oS), [
                  [ee, a.filter.value]
                ]),
                !a.filter.fixed && a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                  key: 2,
                  class: $(["btn btn-outline-secondary", {
                    "opacity-25": a.filter.value == null
                  }]),
                  disabled: a.filter.value == null,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[18] || (t[18] = [
                  p("i", { class: "bi bi-x" }, null, -1)
                ]), 10, aS)) : A("", !0)
              ])) : A("", !0),
              a.filter && a.filter.type == "select" ? (b(), y("div", lS, [
                a.filter.dropdown ? (b(), y("div", cS, [
                  p("button", uS, O(a.filter.multiple ? a.filter.value.length + " selected" : a.filter.value ? a.filter.value : "not selected"), 1),
                  p("ul", hS, [
                    p("li", null, [
                      (b(!0), y(W, null, z(a.filter.options, (u) => (b(), y("span", {
                        key: u,
                        class: $(["dropdown-item cursor-pointer", { selected: a.filter.multiple ? a.filter.value.indexOf(u.value) >= 0 : a.filter.value === u.value }]),
                        onClick: (h) => r.dropdownSelectToggleOne(a.filter, u)
                      }, [
                        (a.filter.multiple ? a.filter.value.indexOf(u.value) >= 0 : a.filter.value === u.value) ? (b(), y("i", fS)) : (b(), y("i", pS)),
                        F(" " + O(r.translate(u.label ? u.label : u.value)), 1)
                      ], 10, dS))), 128))
                    ]),
                    a.filter.multiple ? (b(), y("li", gS, t[19] || (t[19] = [
                      p("hr", { class: "dropdown-divider" }, null, -1)
                    ]))) : A("", !0),
                    a.filter.multiple ? (b(), y("li", mS, [
                      p("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectAll(a.filter.value, a.filter.options)
                      }, O(r.translate("Select all")), 9, bS)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", yS, [
                      p("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectClear(a.filter.value)
                      }, O(r.translate("Unselect all")), 9, vS)
                    ])) : A("", !0),
                    a.filter.multiple ? (b(), y("li", _S, [
                      p("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (u) => r.dropdownSelectInvert(a.filter.value, a.filter.options)
                      }, O(r.translate("Invert all")), 9, ES)
                    ])) : A("", !0)
                  ])
                ])) : (b(), y("div", wS, [
                  G(p("select", {
                    "onUpdate:modelValue": (u) => a.filter.value = u,
                    onChange: t[8] || (t[8] = (u) => r.reloadTable()),
                    multiple: a.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (b(!0), y(W, null, z(a.filter.options, (u) => (b(), y("option", {
                      key: u,
                      value: u.value
                    }, O(r.translate(u.label ? u.label : u.value)), 9, AS))), 128))
                  ], 40, TS), [
                    [$e, a.filter.value]
                  ]),
                  a.filter.buttonx && a.filter.buttonx != !1 ? (b(), y("button", {
                    key: 0,
                    class: $(["btn btn-outline-secondary", {
                      "opacity-25": a.filter.value == null
                    }]),
                    disabled: a.filter.value == null,
                    onClick: (u) => {
                      a.filter.value = void 0, r.reloadTable();
                    }
                  }, t[20] || (t[20] = [
                    p("i", { class: "bi bi-x" }, null, -1)
                  ]), 10, NS)) : A("", !0)
                ]))
              ])) : A("", !0),
              a.filter && (a.filter.type == "datetime-local" || a.filter.type == "date") ? (b(), y("div", OS, [
                a.filter.operators == !0 ? G((b(), y("select", {
                  key: 0,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[9] || (t[9] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  p("option", SS, O(r.translate("=")), 1),
                  p("option", LS, O(r.translate(">")), 1),
                  p("option", kS, O(r.translate(">=")), 1),
                  p("option", xS, O(r.translate("<")), 1),
                  p("option", IS, O(r.translate("<=")), 1)
                ], 40, CS)), [
                  [$e, a.filter.operator]
                ]) : A("", !0),
                a.filter.operators && a.filter.operators.length > 0 ? G((b(), y("select", {
                  key: 1,
                  "onUpdate:modelValue": (u) => a.filter.operator = u,
                  onChange: t[10] || (t[10] = (u) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (b(!0), y(W, null, z(a.filter.operators, (u) => (b(), y("option", {
                    key: u,
                    value: u.value
                  }, O(r.translate(u.label)), 9, RS))), 128))
                ], 40, $S)), [
                  [$e, a.filter.operator]
                ]) : A("", !0),
                G(p("input", {
                  type: a.filter.type,
                  class: $([{
                    fixed: a.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (u) => a.filter.value = u,
                  onChange: t[11] || (t[11] = (u) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = oi((u) => r.reloadTable(), ["enter"]))
                }, null, 42, DS), [
                  [Ss, a.filter.value]
                ]),
                p("button", {
                  class: $(["btn btn-outline-secondary", {
                    "opacity-25": !a.filter.value
                  }]),
                  disabled: !a.filter.value,
                  onClick: (u) => {
                    a.filter.value = void 0, r.reloadTable();
                  }
                }, t[21] || (t[21] = [
                  p("i", { class: "bi bi-x" }, null, -1)
                ]), 10, MS)
              ])) : A("", !0),
              a.filter && a.filter.buttons ? (b(), y("span", {
                key: 5,
                class: $(
                  r.getValueOrFunction(a.filter.buttons, {
                    column: a
                  })
                )
              }, [
                (b(!0), y(W, null, z(a.filter.buttons, (u) => (b(), y("span", {
                  key: u.action
                }, [
                  p("button", {
                    type: "button",
                    disabled: u.disabled !== void 0 ? r.getValueOrFunction(u.disabled) : null,
                    class: $([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    onClick: (h) => r.tableAction(u, {
                      items: i.items,
                      $event: h
                    })
                  }, [
                    p("i", {
                      class: $([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2),
                    F(" " + O(r.translate(u.title)), 1)
                  ], 10, qS)
                ]))), 128))
              ], 2)) : A("", !0)
            ], 14, HC))), 128))
          ])) : A("", !0)
        ]),
        p("tbody", null, [
          (b(!0), y(W, null, z(this.items, (a, u) => (b(), y(W, {
            key: a.id
          }, [
            p("tr", BS, [
              (b(!0), y(W, null, z(e.settings.table.columns, (h) => (b(), y("td", {
                style: Zn([h.hidden ? "display: none" : ""]),
                key: h.name,
                "data-label": h.title ? h.title : r.translate(h.name),
                width: h.width,
                class: $(
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
                h.index ? (b(), y("div", jS, [
                  p("span", {
                    class: $(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(a[e.settings.pkey]) >= 0
                    }]),
                    innerHTML: u + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, VS)
                ])) : A("", !0),
                !h.template && !h.input && !h.progressbar ? (b(), y("span", FS, O(r.tableCellValue(h.name, a, u, h)), 1)) : A("", !0),
                h.template ? (b(), y("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(h.template, a, u, h)
                }, null, 8, US)) : A("", !0),
                h.progressbar ? (b(), y("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": a[h.name],
                  "aria-valuemax": h.progressbar.max
                }, [
                  p("div", {
                    class: $(["progress-bar", [h.progressbar.class]]),
                    style: Zn({ width: Math.round(a[h.name] / h.progressbar.max * 100) + "%" })
                  }, [
                    h.progressbar.value ? (b(), y("span", WS, O(a[h.name]), 1)) : A("", !0)
                  ], 6)
                ], 8, HS)) : A("", !0),
                h.input ? (b(), y("div", zS, [
                  h.input.prefix ? (b(), y("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.prefix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, KS)) : A("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    h.input.type
                  ) >= 0 ? G((b(), y("input", {
                    key: 1,
                    type: h.input.type,
                    class: $(["form-control form-control-sm", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (d) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (d) => a[h.name] = d
                  }, null, 42, GS)), [
                    [Ss, a[h.name]]
                  ]) : A("", !0),
                  h.input.type == "select" ? G((b(), y("select", {
                    key: 2,
                    class: $(["form-select form-select-sm pe-0", r.getValueOrFunction(h.input.class, {
                      column: h,
                      item: a
                    })]),
                    onChange: (d) => r.onRowInputChange(a[h.name], h, a, u),
                    "onUpdate:modelValue": (d) => a[h.name] = d
                  }, [
                    (b(!0), y(W, null, z(h.input.options, (d) => (b(), y("option", {
                      value: d.value,
                      key: d
                    }, O(r.translate(d.label)), 9, XS))), 128))
                  ], 42, YS)), [
                    [$e, a[h.name]]
                  ]) : A("", !0),
                  h.input.suffix ? (b(), y("span", {
                    key: 3,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(h.input.suffix, {
                      column: h,
                      item: a
                    })
                  }, null, 8, ZS)) : A("", !0)
                ])) : A("", !0),
                h.buttons ? (b(), y("span", QS, [
                  (b(!0), y(W, null, z(h.buttons, (d) => (b(), y("span", {
                    key: d.action
                  }, [
                    d.hidden ? A("", !0) : (b(), y("button", {
                      key: 0,
                      type: "button",
                      disabled: d.disabled !== void 0 ? r.getValueOrFunction(d.disabled) : null,
                      class: $([
                        d.class ? r.getValueOrFunction(d.class, {
                          button: d,
                          column: h,
                          item: a,
                          table: this
                        }) : r.getButtonClassByAction(d.action)
                      ]),
                      onClick: (g) => r.tableAction(d, {
                        column: h,
                        item: a,
                        index: u,
                        $event: g
                      })
                    }, [
                      d.icon !== null ? (b(), y("i", {
                        key: 0,
                        class: $([
                          d.icon !== void 0 ? r.getValueOrFunction(d.icon, {
                            button: d,
                            column: h,
                            item: a,
                            table: this
                          }) : r.getButtonIconClassByAction(d.action)
                        ])
                      }, null, 2)) : A("", !0),
                      d.template ? (b(), y("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(d.template, a, u, h)
                      }, null, 8, tL)) : (b(), y("span", eL, O(r.translate(d.title)), 1))
                    ], 10, JS))
                  ]))), 128))
                ])) : A("", !0)
              ], 14, PS))), 128))
            ]),
            e.settings.table.details && i.details.indexOf(a[e.settings.pkey]) >= 0 ? (b(), y("tr", sL, [
              p("td", {
                class: $([e.settings.table.details.class]),
                colspan: e.settings.table.columns.length
              }, [
                (b(!0), y(W, null, z(e.settings.table.details.fields, (h) => (b(), y("div", {
                  class: "m-0",
                  key: h
                }, [
                  p("div", iL, [
                    p("div", {
                      class: $(["col text-end", [h.class]])
                    }, [
                      p("label", rL, O(h.label), 1)
                    ], 2),
                    p("div", {
                      class: $(["col", [h.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(h.input.type) < 0 ? G((b(), y("input", {
                        key: 0,
                        type: h.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, null, 40, oL)), [
                        [Ss, a[h.name]]
                      ]) : A("", !0),
                      h.input.type == "textarea" ? G((b(), y("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, `\r
                    `, 40, aL)), [
                        [ee, a[h.name]]
                      ]) : A("", !0),
                      h.input.type == "select" ? G((b(), y("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (d) => a[h.name] = d,
                        onChange: (d) => r.onRowInputChange(a[h.name], h, a, u)
                      }, [
                        (b(!0), y(W, null, z(h.input.options, (d) => (b(), y("option", {
                          value: d.value,
                          key: d
                        }, O(r.translate(d.label)), 9, cL))), 128))
                      ], 40, lL)), [
                        [$e, a[h.name]]
                      ]) : A("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                p("span", {
                  innerHTML: e.settings.table.details.raw(a)
                }, null, 8, uL),
                e.settings.debug ? (b(), y("pre", hL, "                " + O(a) + `
              `, 1)) : A("", !0)
              ], 10, nL)
            ])) : A("", !0)
          ], 64))), 128))
        ]),
        p("tfoot", null, [
          i.selected.length > 0 ? (b(), y("tr", dL, [
            (b(!0), y(W, null, z(e.settings.table.columns, (a) => (b(), y("td", {
              style: Zn([a.hidden ? "display: none" : ""]),
              key: a.name,
              "data-label": a.title,
              width: a.width,
              class: $(a.class)
            }, [
              a.index ? (b(), y("div", pL, [
                p("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (u) => r.toggleSelectedAll())
                }, O(i.selected.length), 1)
              ])) : A("", !0),
              a.input && a.bulk && a.bulk.enabled ? (b(), y("div", gL, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  a.input.type
                ) >= 0 ? G((b(), y("input", {
                  key: 0,
                  type: a.input.type,
                  class: $(["form-control form-control-sm", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, null, 42, mL)), [
                  [Ss, i.bulkitem[a.name]]
                ]) : A("", !0),
                a.input.type == "select" ? G((b(), y("select", {
                  key: 1,
                  class: $(["form-select form-select-sm pe-0", a.input.class]),
                  disabled: i.bulkinputs.indexOf(a.name) < 0,
                  onChange: (u) => r.onBulkInputChange(i.bulkitem[a.name], i.bulkitem, a),
                  "onUpdate:modelValue": (u) => i.bulkitem[a.name] = u
                }, [
                  (b(!0), y(W, null, z(a.input.options, (u) => (b(), y("option", {
                    value: u.value,
                    key: u
                  }, O(r.translate(u.label)), 9, yL))), 128))
                ], 42, bL)), [
                  [$e, i.bulkitem[a.name]]
                ]) : A("", !0),
                p("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (u) => r.ifBulkInputClick(a)
                }, [
                  i.bulkitem[a.name] === void 0 ? (b(), y("i", _L)) : (b(), y("i", EL))
                ], 8, vL)
              ])) : A("", !0),
              a.bulk ? (b(), y("span", wL, [
                (b(!0), y(W, null, z(a.bulk.buttons, (u) => (b(), y("span", {
                  key: u.action
                }, [
                  p("button", {
                    type: "button",
                    class: $([
                      u.class ? u.class : r.getButtonClassByAction(u.action)
                    ]),
                    disabled: u.action === "save" && !this.bulkinputs.length,
                    onClick: (h) => r.tableBulkAction(u.action, i.bulkitem, a, h)
                  }, [
                    u.icon !== null ? (b(), y("i", {
                      key: 0,
                      class: $([
                        u.icon !== void 0 ? r.getValueOrFunction(u.icon, {
                          button: u,
                          column: a,
                          table: this
                        }) : r.getButtonIconClassByAction(u.action)
                      ])
                    }, null, 2)) : A("", !0),
                    u.template ? (b(), y("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(u.template, i.bulkitem, null, a)
                    }, null, 8, AL)) : (b(), y("span", NL, O(r.translate(u.title)), 1))
                  ], 10, TL)
                ]))), 128))
              ])) : A("", !0)
            ], 14, fL))), 128))
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
        p("div", CL, [
          p("div", SL, [
            e.settings.form.visible && e.settings.form.groups ? (b(), es(l, {
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
      ], 8, OL)
    ], 10, lC)
  ])) : A("", !0);
}
const kL = /* @__PURE__ */ He(oC, [["render", LL], ["__scopeId", "data-v-9b760f0f"]]), xL = {
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
      if (this.settings = Dr(this.defaults, window.VuEntities[this.entity]), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
        const s = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = s || "light";
      }
      this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log("vu-admin ", "1.2.33"), console.log(`Entity config (${this.entity}) initialized`));
    } else
      console.log("vu-admin ", "1.2.33"), console.error(`Entity config (${this.entity}) not found`);
  },
  mounted() {
  },
  methods: {},
  components: {
    VuAdminTable: kL
  }
}, IL = { key: 0 }, $L = ["data-bs-theme"];
function RL(s, t, e, n, i, r) {
  const o = Re("vu-admin-table");
  return e.entity && i.settings ? (b(), y("div", IL, [
    p("div", {
      class: "vu-admin",
      "data-bs-theme": [i.settings.theme]
    }, [
      bu(o, { settings: i.settings }, null, 8, ["settings"])
    ], 8, $L)
  ])) : A("", !0);
}
const DL = /* @__PURE__ */ He(xL, [["render", RL]]), UL = {
  install(s) {
    s.component("VuAdmin", DL);
  }
};
export {
  DL as VuAdmin,
  UL as default
};
