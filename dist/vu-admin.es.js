import { openBlock as g, createElementBlock as b, createElementVNode as f, withModifiers as Yt, withDirectives as yt, vModelText as ge, createCommentVNode as T, toDisplayString as D, Fragment as ht, renderList as mt, normalizeClass as S, createTextVNode as wt, resolveComponent as Be, withKeys as oi, createVNode as lr, vModelSelect as Ge, createBlock as hs, vModelDynamic as qe, vModelCheckbox as cr, vShow as Vs, normalizeStyle as Zn } from "vue";
var ce = "top", me = "bottom", be = "right", ue = "left", wr = "auto", Rn = [ce, me, be, ue], Ws = "start", kn = "end", Qc = "clippingParents", Fa = "viewport", gn = "popper", tu = "reference", ea = /* @__PURE__ */ Rn.reduce(function(e, t) {
  return e.concat([t + "-" + Ws, t + "-" + kn]);
}, []), xa = /* @__PURE__ */ [].concat(Rn, [wr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ws, t + "-" + kn]);
}, []), eu = "beforeRead", su = "read", nu = "afterRead", iu = "beforeMain", ru = "main", ou = "afterMain", au = "beforeWrite", lu = "write", cu = "afterWrite", uu = [eu, su, nu, iu, ru, ou, au, lu, cu];
function Je(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function ye(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function zs(e) {
  var t = ye(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ce(e) {
  var t = ye(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ca(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ye(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function dd(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(s) {
    var n = t.styles[s] || {}, i = t.attributes[s] || {}, r = t.elements[s];
    !Ce(r) || !Je(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var a = i[o];
      a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function fd(e) {
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
      var i = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : s[n]), a = o.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !Ce(i) || !Je(i) || (Object.assign(i.style, a), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const hu = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: dd,
  effect: fd,
  requires: ["computeStyles"]
};
function Ye(e) {
  return e.split("-")[0];
}
var Hs = Math.max, ur = Math.min, Nn = Math.round;
function sa() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function du() {
  return !/^((?!chrome|android).)*safari/i.test(sa());
}
function Sn(e, t, s) {
  t === void 0 && (t = !1), s === void 0 && (s = !1);
  var n = e.getBoundingClientRect(), i = 1, r = 1;
  t && Ce(e) && (i = e.offsetWidth > 0 && Nn(n.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && Nn(n.height) / e.offsetHeight || 1);
  var o = zs(e) ? ye(e) : window, a = o.visualViewport, l = !du() && s, c = (n.left + (l && a ? a.offsetLeft : 0)) / i, d = (n.top + (l && a ? a.offsetTop : 0)) / r, h = n.width / i, m = n.height / r;
  return {
    width: h,
    height: m,
    top: d,
    right: c + h,
    bottom: d + m,
    left: c,
    x: c,
    y: d
  };
}
function Oa(e) {
  var t = Sn(e), s = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: s,
    height: n
  };
}
function fu(e, t) {
  var s = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (s && Ca(s)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function gs(e) {
  return ye(e).getComputedStyle(e);
}
function pd(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function Ls(e) {
  return ((zs(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ar(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ca(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ls(e)
  );
}
function fl(e) {
  return !Ce(e) || // https://github.com/popperjs/popper-core/issues/837
  gs(e).position === "fixed" ? null : e.offsetParent;
}
function gd(e) {
  var t = /firefox/i.test(sa()), s = /Trident/i.test(sa());
  if (s && Ce(e)) {
    var n = gs(e);
    if (n.position === "fixed")
      return null;
  }
  var i = Ar(e);
  for (Ca(i) && (i = i.host); Ce(i) && ["html", "body"].indexOf(Je(i)) < 0; ) {
    var r = gs(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function yi(e) {
  for (var t = ye(e), s = fl(e); s && pd(s) && gs(s).position === "static"; )
    s = fl(s);
  return s && (Je(s) === "html" || Je(s) === "body" && gs(s).position === "static") ? t : s || gd(e) || t;
}
function ka(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ai(e, t, s) {
  return Hs(e, ur(t, s));
}
function md(e, t, s) {
  var n = ai(e, t, s);
  return n > s ? s : n;
}
function pu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function gu(e) {
  return Object.assign({}, pu(), e);
}
function mu(e, t) {
  return t.reduce(function(s, n) {
    return s[n] = e, s;
  }, {});
}
var bd = function(t, s) {
  return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
    placement: s.placement
  })) : t, gu(typeof t != "number" ? t : mu(t, Rn));
};
function yd(e) {
  var t, s = e.state, n = e.name, i = e.options, r = s.elements.arrow, o = s.modifiersData.popperOffsets, a = Ye(s.placement), l = ka(a), c = [ue, be].indexOf(a) >= 0, d = c ? "height" : "width";
  if (!(!r || !o)) {
    var h = bd(i.padding, s), m = Oa(r), v = l === "y" ? ce : ue, E = l === "y" ? me : be, F = s.rects.reference[d] + s.rects.reference[l] - o[l] - s.rects.popper[d], k = o[l] - s.rects.reference[l], I = yi(r), j = I ? l === "y" ? I.clientHeight || 0 : I.clientWidth || 0 : 0, W = F / 2 - k / 2, Y = h[v], G = j - m[d] - h[E], X = j / 2 - m[d] / 2 + W, dt = ai(Y, X, G), ft = l;
    s.modifiersData[n] = (t = {}, t[ft] = dt, t.centerOffset = dt - X, t);
  }
}
function vd(e) {
  var t = e.state, s = e.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || fu(t.elements.popper, i) && (t.elements.arrow = i));
}
const bu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: yd,
  effect: vd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ln(e) {
  return e.split("-")[1];
}
var _d = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ed(e, t) {
  var s = e.x, n = e.y, i = t.devicePixelRatio || 1;
  return {
    x: Nn(s * i) / i || 0,
    y: Nn(n * i) / i || 0
  };
}
function pl(e) {
  var t, s = e.popper, n = e.popperRect, i = e.placement, r = e.variation, o = e.offsets, a = e.position, l = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, h = e.isFixed, m = o.x, v = m === void 0 ? 0 : m, E = o.y, F = E === void 0 ? 0 : E, k = typeof d == "function" ? d({
    x: v,
    y: F
  }) : {
    x: v,
    y: F
  };
  v = k.x, F = k.y;
  var I = o.hasOwnProperty("x"), j = o.hasOwnProperty("y"), W = ue, Y = ce, G = window;
  if (c) {
    var X = yi(s), dt = "clientHeight", ft = "clientWidth";
    if (X === ye(s) && (X = Ls(s), gs(X).position !== "static" && a === "absolute" && (dt = "scrollHeight", ft = "scrollWidth")), X = X, i === ce || (i === ue || i === be) && r === kn) {
      Y = me;
      var C = h && X === G && G.visualViewport ? G.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        X[dt]
      );
      F -= C - n.height, F *= l ? 1 : -1;
    }
    if (i === ue || (i === ce || i === me) && r === kn) {
      W = be;
      var P = h && X === G && G.visualViewport ? G.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        X[ft]
      );
      v -= P - n.width, v *= l ? 1 : -1;
    }
  }
  var y = Object.assign({
    position: a
  }, c && _d), x = d === !0 ? Ed({
    x: v,
    y: F
  }, ye(s)) : {
    x: v,
    y: F
  };
  if (v = x.x, F = x.y, l) {
    var w;
    return Object.assign({}, y, (w = {}, w[Y] = j ? "0" : "", w[W] = I ? "0" : "", w.transform = (G.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + F + "px)" : "translate3d(" + v + "px, " + F + "px, 0)", w));
  }
  return Object.assign({}, y, (t = {}, t[Y] = j ? F + "px" : "", t[W] = I ? v + "px" : "", t.transform = "", t));
}
function wd(e) {
  var t = e.state, s = e.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, o = r === void 0 ? !0 : r, a = s.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: Ye(t.placement),
    variation: Ln(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, pl(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, pl(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const yu = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: wd,
  data: {}
};
var Vi = {
  passive: !0
};
function Ad(e) {
  var t = e.state, s = e.instance, n = e.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, a = o === void 0 ? !0 : o, l = ye(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && c.forEach(function(d) {
    d.addEventListener("scroll", s.update, Vi);
  }), a && l.addEventListener("resize", s.update, Vi), function() {
    r && c.forEach(function(d) {
      d.removeEventListener("scroll", s.update, Vi);
    }), a && l.removeEventListener("resize", s.update, Vi);
  };
}
const vu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ad,
  data: {}
};
var Td = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ir(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Td[t];
  });
}
var Fd = {
  start: "end",
  end: "start"
};
function gl(e) {
  return e.replace(/start|end/g, function(t) {
    return Fd[t];
  });
}
function Na(e) {
  var t = ye(e), s = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function Sa(e) {
  return Sn(Ls(e)).left + Na(e).scrollLeft;
}
function xd(e, t) {
  var s = ye(e), n = Ls(e), i = s.visualViewport, r = n.clientWidth, o = n.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, o = i.height;
    var c = du();
    (c || !c && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a + Sa(e),
    y: l
  };
}
function Cd(e) {
  var t, s = Ls(e), n = Na(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = Hs(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Hs(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -n.scrollLeft + Sa(e), l = -n.scrollTop;
  return gs(i || s).direction === "rtl" && (a += Hs(s.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: a,
    y: l
  };
}
function La(e) {
  var t = gs(e), s = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(s + i + n);
}
function _u(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : Ce(e) && La(e) ? e : _u(Ar(e));
}
function li(e, t) {
  var s;
  t === void 0 && (t = []);
  var n = _u(e), i = n === ((s = e.ownerDocument) == null ? void 0 : s.body), r = ye(n), o = i ? [r].concat(r.visualViewport || [], La(n) ? n : []) : n, a = t.concat(o);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(li(Ar(o)))
  );
}
function na(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Od(e, t) {
  var s = Sn(e, !1, t === "fixed");
  return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s;
}
function ml(e, t, s) {
  return t === Fa ? na(xd(e, s)) : zs(t) ? Od(t, s) : na(Cd(Ls(e)));
}
function kd(e) {
  var t = li(Ar(e)), s = ["absolute", "fixed"].indexOf(gs(e).position) >= 0, n = s && Ce(e) ? yi(e) : e;
  return zs(n) ? t.filter(function(i) {
    return zs(i) && fu(i, n) && Je(i) !== "body";
  }) : [];
}
function Nd(e, t, s, n) {
  var i = t === "clippingParents" ? kd(e) : [].concat(t), r = [].concat(i, [s]), o = r[0], a = r.reduce(function(l, c) {
    var d = ml(e, c, n);
    return l.top = Hs(d.top, l.top), l.right = ur(d.right, l.right), l.bottom = ur(d.bottom, l.bottom), l.left = Hs(d.left, l.left), l;
  }, ml(e, o, n));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Eu(e) {
  var t = e.reference, s = e.element, n = e.placement, i = n ? Ye(n) : null, r = n ? Ln(n) : null, o = t.x + t.width / 2 - s.width / 2, a = t.y + t.height / 2 - s.height / 2, l;
  switch (i) {
    case ce:
      l = {
        x: o,
        y: t.y - s.height
      };
      break;
    case me:
      l = {
        x: o,
        y: t.y + t.height
      };
      break;
    case be:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case ue:
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
  var c = i ? ka(i) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (r) {
      case Ws:
        l[c] = l[c] - (t[d] / 2 - s[d] / 2);
        break;
      case kn:
        l[c] = l[c] + (t[d] / 2 - s[d] / 2);
        break;
    }
  }
  return l;
}
function In(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = n === void 0 ? e.placement : n, r = s.strategy, o = r === void 0 ? e.strategy : r, a = s.boundary, l = a === void 0 ? Qc : a, c = s.rootBoundary, d = c === void 0 ? Fa : c, h = s.elementContext, m = h === void 0 ? gn : h, v = s.altBoundary, E = v === void 0 ? !1 : v, F = s.padding, k = F === void 0 ? 0 : F, I = gu(typeof k != "number" ? k : mu(k, Rn)), j = m === gn ? tu : gn, W = e.rects.popper, Y = e.elements[E ? j : m], G = Nd(zs(Y) ? Y : Y.contextElement || Ls(e.elements.popper), l, d, o), X = Sn(e.elements.reference), dt = Eu({
    reference: X,
    element: W,
    placement: i
  }), ft = na(Object.assign({}, W, dt)), C = m === gn ? ft : X, P = {
    top: G.top - C.top + I.top,
    bottom: C.bottom - G.bottom + I.bottom,
    left: G.left - C.left + I.left,
    right: C.right - G.right + I.right
  }, y = e.modifiersData.offset;
  if (m === gn && y) {
    var x = y[i];
    Object.keys(P).forEach(function(w) {
      var O = [be, me].indexOf(w) >= 0 ? 1 : -1, M = [ce, me].indexOf(w) >= 0 ? "y" : "x";
      P[w] += x[M] * O;
    });
  }
  return P;
}
function Sd(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = s.boundary, r = s.rootBoundary, o = s.padding, a = s.flipVariations, l = s.allowedAutoPlacements, c = l === void 0 ? xa : l, d = Ln(n), h = d ? a ? ea : ea.filter(function(E) {
    return Ln(E) === d;
  }) : Rn, m = h.filter(function(E) {
    return c.indexOf(E) >= 0;
  });
  m.length === 0 && (m = h);
  var v = m.reduce(function(E, F) {
    return E[F] = In(e, {
      placement: F,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[Ye(F)], E;
  }, {});
  return Object.keys(v).sort(function(E, F) {
    return v[E] - v[F];
  });
}
function Ld(e) {
  if (Ye(e) === wr)
    return [];
  var t = ir(e);
  return [gl(e), t, gl(t)];
}
function Id(e) {
  var t = e.state, s = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, a = o === void 0 ? !0 : o, l = s.fallbackPlacements, c = s.padding, d = s.boundary, h = s.rootBoundary, m = s.altBoundary, v = s.flipVariations, E = v === void 0 ? !0 : v, F = s.allowedAutoPlacements, k = t.options.placement, I = Ye(k), j = I === k, W = l || (j || !E ? [ir(k)] : Ld(k)), Y = [k].concat(W).reduce(function(nt, H) {
      return nt.concat(Ye(H) === wr ? Sd(t, {
        placement: H,
        boundary: d,
        rootBoundary: h,
        padding: c,
        flipVariations: E,
        allowedAutoPlacements: F
      }) : H);
    }, []), G = t.rects.reference, X = t.rects.popper, dt = /* @__PURE__ */ new Map(), ft = !0, C = Y[0], P = 0; P < Y.length; P++) {
      var y = Y[P], x = Ye(y), w = Ln(y) === Ws, O = [ce, me].indexOf(x) >= 0, M = O ? "width" : "height", A = In(t, {
        placement: y,
        boundary: d,
        rootBoundary: h,
        altBoundary: m,
        padding: c
      }), N = O ? w ? be : ue : w ? me : ce;
      G[M] > X[M] && (N = ir(N));
      var z = ir(N), K = [];
      if (r && K.push(A[x] <= 0), a && K.push(A[N] <= 0, A[z] <= 0), K.every(function(nt) {
        return nt;
      })) {
        C = y, ft = !1;
        break;
      }
      dt.set(y, K);
    }
    if (ft)
      for (var U = E ? 3 : 1, et = function(H) {
        var Z = Y.find(function(bt) {
          var tt = dt.get(bt);
          if (tt)
            return tt.slice(0, H).every(function(pt) {
              return pt;
            });
        });
        if (Z)
          return C = Z, "break";
      }, Q = U; Q > 0; Q--) {
        var rt = et(Q);
        if (rt === "break") break;
      }
    t.placement !== C && (t.modifiersData[n]._skip = !0, t.placement = C, t.reset = !0);
  }
}
const wu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Id,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function bl(e, t, s) {
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
function yl(e) {
  return [ce, be, me, ue].some(function(t) {
    return e[t] >= 0;
  });
}
function $d(e) {
  var t = e.state, s = e.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = In(t, {
    elementContext: "reference"
  }), a = In(t, {
    altBoundary: !0
  }), l = bl(o, n), c = bl(a, i, r), d = yl(l), h = yl(c);
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
const Au = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: $d
};
function Dd(e, t, s) {
  var n = Ye(e), i = [ue, ce].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, t, {
    placement: e
  })) : s, o = r[0], a = r[1];
  return o = o || 0, a = (a || 0) * i, [ue, be].indexOf(n) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function Md(e) {
  var t = e.state, s = e.options, n = e.name, i = s.offset, r = i === void 0 ? [0, 0] : i, o = xa.reduce(function(d, h) {
    return d[h] = Dd(h, t.rects, r), d;
  }, {}), a = o[t.placement], l = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[n] = o;
}
const Tu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Md
};
function Rd(e) {
  var t = e.state, s = e.name;
  t.modifiersData[s] = Eu({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Fu = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Rd,
  data: {}
};
function Bd(e) {
  return e === "x" ? "y" : "x";
}
function qd(e) {
  var t = e.state, s = e.options, n = e.name, i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, a = o === void 0 ? !1 : o, l = s.boundary, c = s.rootBoundary, d = s.altBoundary, h = s.padding, m = s.tether, v = m === void 0 ? !0 : m, E = s.tetherOffset, F = E === void 0 ? 0 : E, k = In(t, {
    boundary: l,
    rootBoundary: c,
    padding: h,
    altBoundary: d
  }), I = Ye(t.placement), j = Ln(t.placement), W = !j, Y = ka(I), G = Bd(Y), X = t.modifiersData.popperOffsets, dt = t.rects.reference, ft = t.rects.popper, C = typeof F == "function" ? F(Object.assign({}, t.rects, {
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
      var w, O = Y === "y" ? ce : ue, M = Y === "y" ? me : be, A = Y === "y" ? "height" : "width", N = X[Y], z = N + k[O], K = N - k[M], U = v ? -ft[A] / 2 : 0, et = j === Ws ? dt[A] : ft[A], Q = j === Ws ? -ft[A] : -dt[A], rt = t.elements.arrow, nt = v && rt ? Oa(rt) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : pu(), Z = H[O], bt = H[M], tt = ai(0, dt[A], nt[A]), pt = W ? dt[A] / 2 - U - tt - Z - P.mainAxis : et - tt - Z - P.mainAxis, gt = W ? -dt[A] / 2 + U + tt + bt + P.mainAxis : Q + tt + bt + P.mainAxis, R = t.elements.arrow && yi(t.elements.arrow), B = R ? Y === "y" ? R.clientTop || 0 : R.clientLeft || 0 : 0, q = (w = y?.[Y]) != null ? w : 0, J = N + pt - q - B, Dt = N + gt - q, _e = ai(v ? ur(z, J) : z, N, v ? Hs(K, Dt) : K);
      X[Y] = _e, x[Y] = _e - N;
    }
    if (a) {
      var Le, ss = Y === "x" ? ce : ue, ns = Y === "x" ? me : be, Zt = X[G], oe = G === "y" ? "height" : "width", Ee = Zt + k[ss], Ht = Zt - k[ns], xt = [ce, ue].indexOf(I) !== -1, at = (Le = y?.[G]) != null ? Le : 0, ct = xt ? Ee : Zt - dt[oe] - ft[oe] - at + P.altAxis, _t = xt ? Zt + dt[oe] + ft[oe] - at - P.altAxis : Ht, Et = v && xt ? md(ct, Zt, _t) : ai(v ? ct : Ee, Zt, v ? _t : Ht);
      X[G] = Et, x[G] = Et - Zt;
    }
    t.modifiersData[n] = x;
  }
}
const xu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: qd,
  requiresIfExists: ["offset"]
};
function Pd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Vd(e) {
  return e === ye(e) || !Ce(e) ? Na(e) : Pd(e);
}
function jd(e) {
  var t = e.getBoundingClientRect(), s = Nn(t.width) / e.offsetWidth || 1, n = Nn(t.height) / e.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function Ud(e, t, s) {
  s === void 0 && (s = !1);
  var n = Ce(t), i = Ce(t) && jd(t), r = Ls(t), o = Sn(e, i, s), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  La(r)) && (a = Vd(t)), Ce(t) ? (l = Sn(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : r && (l.x = Sa(r))), {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function Hd(e) {
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
function Wd(e) {
  var t = Hd(e);
  return uu.reduce(function(s, n) {
    return s.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function zd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(s) {
      Promise.resolve().then(function() {
        t = void 0, s(e());
      });
    })), t;
  };
}
function Kd(e) {
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
var vl = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function _l() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Cu(e) {
  e === void 0 && (e = {});
  var t = e, s = t.defaultModifiers, n = s === void 0 ? [] : s, i = t.defaultOptions, r = i === void 0 ? vl : i;
  return function(a, l, c) {
    c === void 0 && (c = r);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, vl, r),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, h = [], m = !1, v = {
      state: d,
      setOptions: function(I) {
        var j = typeof I == "function" ? I(d.options) : I;
        F(), d.options = Object.assign({}, r, d.options, j), d.scrollParents = {
          reference: zs(a) ? li(a) : a.contextElement ? li(a.contextElement) : [],
          popper: li(l)
        };
        var W = Wd(Kd([].concat(n, d.options.modifiers)));
        return d.orderedModifiers = W.filter(function(Y) {
          return Y.enabled;
        }), E(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!m) {
          var I = d.elements, j = I.reference, W = I.popper;
          if (_l(j, W)) {
            d.rects = {
              reference: Ud(j, yi(W), d.options.strategy === "fixed"),
              popper: Oa(W)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(P) {
              return d.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var Y = 0; Y < d.orderedModifiers.length; Y++) {
              if (d.reset === !0) {
                d.reset = !1, Y = -1;
                continue;
              }
              var G = d.orderedModifiers[Y], X = G.fn, dt = G.options, ft = dt === void 0 ? {} : dt, C = G.name;
              typeof X == "function" && (d = X({
                state: d,
                options: ft,
                name: C,
                instance: v
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: zd(function() {
        return new Promise(function(k) {
          v.forceUpdate(), k(d);
        });
      }),
      destroy: function() {
        F(), m = !0;
      }
    };
    if (!_l(a, l))
      return v;
    v.setOptions(c).then(function(k) {
      !m && c.onFirstUpdate && c.onFirstUpdate(k);
    });
    function E() {
      d.orderedModifiers.forEach(function(k) {
        var I = k.name, j = k.options, W = j === void 0 ? {} : j, Y = k.effect;
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
      h.forEach(function(k) {
        return k();
      }), h = [];
    }
    return v;
  };
}
var Gd = [vu, Fu, yu, hu, Tu, wu, xu, bu, Au], Ia = /* @__PURE__ */ Cu({
  defaultModifiers: Gd
});
const Ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: ou,
  afterRead: nu,
  afterWrite: cu,
  applyStyles: hu,
  arrow: bu,
  auto: wr,
  basePlacements: Rn,
  beforeMain: iu,
  beforeRead: eu,
  beforeWrite: au,
  bottom: me,
  clippingParents: Qc,
  computeStyles: yu,
  createPopper: Ia,
  detectOverflow: In,
  end: kn,
  eventListeners: vu,
  flip: wu,
  hide: Au,
  left: ue,
  main: ru,
  modifierPhases: uu,
  offset: Tu,
  placements: xa,
  popper: gn,
  popperGenerator: Cu,
  popperOffsets: Fu,
  preventOverflow: xu,
  read: su,
  reference: tu,
  right: be,
  start: Ws,
  top: ce,
  variationPlacements: ea,
  viewport: Fa,
  write: lu
}, Symbol.toStringTag, { value: "Module" }));
const As = /* @__PURE__ */ new Map(), Ao = {
  set(e, t, s) {
    As.has(e) || As.set(e, /* @__PURE__ */ new Map());
    const n = As.get(e);
    if (!n.has(t) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(t, s);
  },
  get(e, t) {
    return As.has(e) && As.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!As.has(e))
      return;
    const s = As.get(e);
    s.delete(t), s.size === 0 && As.delete(e);
  }
}, Yd = 1e6, Xd = 1e3, ia = "transitionend", ku = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, s) => `#${CSS.escape(s)}`)), e), Zd = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), Jd = (e) => {
  do
    e += Math.floor(Math.random() * Yd);
  while (document.getElementById(e));
  return e;
}, Qd = (e) => {
  if (!e)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: s
  } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), i = Number.parseFloat(s);
  return !n && !i ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * Xd);
}, Nu = (e) => {
  e.dispatchEvent(new Event(ia));
}, fs = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Os = (e) => fs(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(ku(e)) : null, Bn = (e) => {
  if (!fs(e) || e.getClientRects().length === 0)
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
}, ks = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Su = (e) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof e.getRootNode == "function") {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return e instanceof ShadowRoot ? e : e.parentNode ? Su(e.parentNode) : null;
}, hr = () => {
}, vi = (e) => {
  e.offsetHeight;
}, Lu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, To = [], tf = (e) => {
  document.readyState === "loading" ? (To.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of To)
      t();
  }), To.push(e)) : e();
}, Oe = () => document.documentElement.dir === "rtl", Ne = (e) => {
  tf(() => {
    const t = Lu();
    if (t) {
      const s = e.NAME, n = t.fn[s];
      t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = n, e.jQueryInterface);
    }
  });
}, pe = (e, t = [], s = e) => typeof e == "function" ? e.call(...t) : s, Iu = (e, t, s = !0) => {
  if (!s) {
    pe(e);
    return;
  }
  const i = Qd(t) + 5;
  let r = !1;
  const o = ({
    target: a
  }) => {
    a === t && (r = !0, t.removeEventListener(ia, o), pe(e));
  };
  t.addEventListener(ia, o), setTimeout(() => {
    r || Nu(t);
  }, i);
}, $a = (e, t, s, n) => {
  const i = e.length;
  let r = e.indexOf(t);
  return r === -1 ? !s && n ? e[i - 1] : e[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), e[Math.max(0, Math.min(r, i - 1))]);
}, ef = /[^.]*(?=\..*)\.|.*/, sf = /\..*/, nf = /::\d+$/, Fo = {};
let El = 1;
const $u = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, rf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Du(e, t) {
  return t && `${t}::${El++}` || e.uidEvent || El++;
}
function Mu(e) {
  const t = Du(e);
  return e.uidEvent = t, Fo[t] = Fo[t] || {}, Fo[t];
}
function of(e, t) {
  return function s(n) {
    return Da(n, {
      delegateTarget: e
    }), s.oneOff && V.off(e, n.type, t), t.apply(e, [n]);
  };
}
function af(e, t, s) {
  return function n(i) {
    const r = e.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const a of r)
        if (a === o)
          return Da(i, {
            delegateTarget: o
          }), n.oneOff && V.off(e, i.type, t, s), s.apply(o, [i]);
  };
}
function Ru(e, t, s = null) {
  return Object.values(e).find((n) => n.callable === t && n.delegationSelector === s);
}
function Bu(e, t, s) {
  const n = typeof t == "string", i = n ? s : t || s;
  let r = qu(e);
  return rf.has(r) || (r = e), [n, i, r];
}
function wl(e, t, s, n, i) {
  if (typeof t != "string" || !e)
    return;
  let [r, o, a] = Bu(t, s, n);
  t in $u && (o = ((E) => function(F) {
    if (!F.relatedTarget || F.relatedTarget !== F.delegateTarget && !F.delegateTarget.contains(F.relatedTarget))
      return E.call(this, F);
  })(o));
  const l = Mu(e), c = l[a] || (l[a] = {}), d = Ru(c, o, r ? s : null);
  if (d) {
    d.oneOff = d.oneOff && i;
    return;
  }
  const h = Du(o, t.replace(ef, "")), m = r ? af(e, s, o) : of(e, o);
  m.delegationSelector = r ? s : null, m.callable = o, m.oneOff = i, m.uidEvent = h, c[h] = m, e.addEventListener(a, m, r);
}
function ra(e, t, s, n, i) {
  const r = Ru(t[s], n, i);
  r && (e.removeEventListener(s, r, !!i), delete t[s][r.uidEvent]);
}
function lf(e, t, s, n) {
  const i = t[s] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && ra(e, t, s, o.callable, o.delegationSelector);
}
function qu(e) {
  return e = e.replace(sf, ""), $u[e] || e;
}
const V = {
  on(e, t, s, n) {
    wl(e, t, s, n, !1);
  },
  one(e, t, s, n) {
    wl(e, t, s, n, !0);
  },
  off(e, t, s, n) {
    if (typeof t != "string" || !e)
      return;
    const [i, r, o] = Bu(t, s, n), a = o !== t, l = Mu(e), c = l[o] || {}, d = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(c).length)
        return;
      ra(e, l, o, r, i ? s : null);
      return;
    }
    if (d)
      for (const h of Object.keys(l))
        lf(e, l, h, t.slice(1));
    for (const [h, m] of Object.entries(c)) {
      const v = h.replace(nf, "");
      (!a || t.includes(v)) && ra(e, l, o, m.callable, m.delegationSelector);
    }
  },
  trigger(e, t, s) {
    if (typeof t != "string" || !e)
      return null;
    const n = Lu(), i = qu(t), r = t !== i;
    let o = null, a = !0, l = !0, c = !1;
    r && n && (o = n.Event(t, s), n(e).trigger(o), a = !o.isPropagationStopped(), l = !o.isImmediatePropagationStopped(), c = o.isDefaultPrevented());
    const d = Da(new Event(t, {
      bubbles: a,
      cancelable: !0
    }), s);
    return c && d.preventDefault(), l && e.dispatchEvent(d), d.defaultPrevented && o && o.preventDefault(), d;
  }
};
function Da(e, t = {}) {
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
function Al(e) {
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
function xo(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const ps = {
  setDataAttribute(e, t, s) {
    e.setAttribute(`data-bs-${xo(t)}`, s);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${xo(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, s = Object.keys(e.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of s) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1), t[i] = Al(e.dataset[n]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Al(e.getAttribute(`data-bs-${xo(t)}`));
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
  _mergeConfigObj(t, s) {
    const n = fs(s) ? ps.getDataAttribute(s, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...fs(s) ? ps.getDataAttributes(s) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, s = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(s)) {
      const r = t[n], o = fs(r) ? "element" : Zd(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const cf = "5.3.8";
class je extends _i {
  constructor(t, s) {
    super(), t = Os(t), t && (this._element = t, this._config = this._getConfig(s), Ao.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Ao.remove(this._element, this.constructor.DATA_KEY), V.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  // Private
  _queueCallback(t, s, n = !0) {
    Iu(t, s, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Ao.get(Os(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, s = {}) {
    return this.getInstance(t) || new this(t, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return cf;
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
const Co = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let s = e.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), t = s && s !== "#" ? s.trim() : null;
  }
  return t ? t.split(",").map((s) => ku(s)).join(",") : null;
}, ut = {
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
    return this.find(t, e).filter((s) => !ks(s) && Bn(s));
  },
  getSelectorFromElement(e) {
    const t = Co(e);
    return t && ut.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Co(e);
    return t ? ut.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Co(e);
    return t ? ut.find(t) : [];
  }
}, Tr = (e, t = "hide") => {
  const s = `click.dismiss${e.EVENT_KEY}`, n = e.NAME;
  V.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), ks(this))
      return;
    const r = ut.getElementFromSelector(this) || this.closest(`.${n}`);
    e.getOrCreateInstance(r)[t]();
  });
}, uf = "alert", hf = "bs.alert", Pu = `.${hf}`, df = `close${Pu}`, ff = `closed${Pu}`, pf = "fade", gf = "show";
class Fr extends je {
  // Getters
  static get NAME() {
    return uf;
  }
  // Public
  close() {
    if (V.trigger(this._element, df).defaultPrevented)
      return;
    this._element.classList.remove(gf);
    const s = this._element.classList.contains(pf);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), V.trigger(this._element, ff), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Fr.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
Tr(Fr, "close");
Ne(Fr);
const mf = "button", bf = "bs.button", yf = `.${bf}`, vf = ".data-api", _f = "active", Tl = '[data-bs-toggle="button"]', Ef = `click${yf}${vf}`;
class xr extends je {
  // Getters
  static get NAME() {
    return mf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(_f));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = xr.getOrCreateInstance(this);
      t === "toggle" && s[t]();
    });
  }
}
V.on(document, Ef, Tl, (e) => {
  e.preventDefault();
  const t = e.target.closest(Tl);
  xr.getOrCreateInstance(t).toggle();
});
Ne(xr);
const wf = "swipe", qn = ".bs.swipe", Af = `touchstart${qn}`, Tf = `touchmove${qn}`, Ff = `touchend${qn}`, xf = `pointerdown${qn}`, Cf = `pointerup${qn}`, Of = "touch", kf = "pen", Nf = "pointer-event", Sf = 40, Lf = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, If = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class dr extends _i {
  constructor(t, s) {
    super(), this._element = t, !(!t || !dr.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return Lf;
  }
  static get DefaultType() {
    return If;
  }
  static get NAME() {
    return wf;
  }
  // Public
  dispose() {
    V.off(this._element, qn);
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
    if (t <= Sf)
      return;
    const s = t / this._deltaX;
    this._deltaX = 0, s && pe(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (V.on(this._element, xf, (t) => this._start(t)), V.on(this._element, Cf, (t) => this._end(t)), this._element.classList.add(Nf)) : (V.on(this._element, Af, (t) => this._start(t)), V.on(this._element, Tf, (t) => this._move(t)), V.on(this._element, Ff, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === kf || t.pointerType === Of);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const $f = "carousel", Df = "bs.carousel", Is = `.${Df}`, Vu = ".data-api", Mf = "ArrowLeft", Rf = "ArrowRight", Bf = 500, Jn = "next", fn = "prev", mn = "left", rr = "right", qf = `slide${Is}`, Oo = `slid${Is}`, Pf = `keydown${Is}`, Vf = `mouseenter${Is}`, jf = `mouseleave${Is}`, Uf = `dragstart${Is}`, Hf = `load${Is}${Vu}`, Wf = `click${Is}${Vu}`, ju = "carousel", ji = "active", zf = "slide", Kf = "carousel-item-end", Gf = "carousel-item-start", Yf = "carousel-item-next", Xf = "carousel-item-prev", Uu = ".active", Hu = ".carousel-item", Zf = Uu + Hu, Jf = ".carousel-item img", Qf = ".carousel-indicators", tp = "[data-bs-slide], [data-bs-slide-to]", ep = '[data-bs-ride="carousel"]', sp = {
  [Mf]: rr,
  [Rf]: mn
}, np = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, ip = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Ei extends je {
  constructor(t, s) {
    super(t, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = ut.findOne(Qf, this._element), this._addEventListeners(), this._config.ride === ju && this.cycle();
  }
  // Getters
  static get Default() {
    return np;
  }
  static get DefaultType() {
    return ip;
  }
  static get NAME() {
    return $f;
  }
  // Public
  next() {
    this._slide(Jn);
  }
  nextWhenVisible() {
    !document.hidden && Bn(this._element) && this.next();
  }
  prev() {
    this._slide(fn);
  }
  pause() {
    this._isSliding && Nu(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        V.one(this._element, Oo, () => this.cycle());
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
      V.one(this._element, Oo, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Jn : fn;
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
    this._config.keyboard && V.on(this._element, Pf, (t) => this._keydown(t)), this._config.pause === "hover" && (V.on(this._element, Vf, () => this.pause()), V.on(this._element, jf, () => this._maybeEnableCycle())), this._config.touch && dr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of ut.find(Jf, this._element))
      V.on(n, Uf, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(mn)),
      rightCallback: () => this._slide(this._directionToOrder(rr)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Bf + this._config.interval));
      }
    };
    this._swipeHelper = new dr(this._element, s);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const s = sp[t.key];
    s && (t.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const s = ut.findOne(Uu, this._indicatorsElement);
    s.classList.remove(ji), s.removeAttribute("aria-current");
    const n = ut.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(ji), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === Jn, r = s || $a(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), a = (v) => V.trigger(this._element, v, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (a(qf).defaultPrevented || !n || !r)
      return;
    const c = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const d = i ? Gf : Kf, h = i ? Yf : Xf;
    r.classList.add(h), vi(r), n.classList.add(d), r.classList.add(d);
    const m = () => {
      r.classList.remove(d, h), r.classList.add(ji), n.classList.remove(ji, h, d), this._isSliding = !1, a(Oo);
    };
    this._queueCallback(m, n, this._isAnimated()), c && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(zf);
  }
  _getActive() {
    return ut.findOne(Zf, this._element);
  }
  _getItems() {
    return ut.find(Hu, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Oe() ? t === mn ? fn : Jn : t === mn ? Jn : fn;
  }
  _orderToDirection(t) {
    return Oe() ? t === fn ? mn : rr : t === fn ? rr : mn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ei.getOrCreateInstance(this, t);
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
V.on(document, Wf, tp, function(e) {
  const t = ut.getElementFromSelector(this);
  if (!t || !t.classList.contains(ju))
    return;
  e.preventDefault();
  const s = Ei.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n), s._maybeEnableCycle();
    return;
  }
  if (ps.getDataAttribute(this, "slide") === "next") {
    s.next(), s._maybeEnableCycle();
    return;
  }
  s.prev(), s._maybeEnableCycle();
});
V.on(window, Hf, () => {
  const e = ut.find(ep);
  for (const t of e)
    Ei.getOrCreateInstance(t);
});
Ne(Ei);
const rp = "collapse", op = "bs.collapse", wi = `.${op}`, ap = ".data-api", lp = `show${wi}`, cp = `shown${wi}`, up = `hide${wi}`, hp = `hidden${wi}`, dp = `click${wi}${ap}`, ko = "show", An = "collapse", Ui = "collapsing", fp = "collapsed", pp = `:scope .${An} .${An}`, gp = "collapse-horizontal", mp = "width", bp = "height", yp = ".collapse.show, .collapse.collapsing", oa = '[data-bs-toggle="collapse"]', vp = {
  parent: null,
  toggle: !0
}, _p = {
  parent: "(null|element)",
  toggle: "boolean"
};
class hi extends je {
  constructor(t, s) {
    super(t, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = ut.find(oa);
    for (const i of n) {
      const r = ut.getSelectorFromElement(i), o = ut.find(r).filter((a) => a === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return vp;
  }
  static get DefaultType() {
    return _p;
  }
  static get NAME() {
    return rp;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(yp).filter((a) => a !== this._element).map((a) => hi.getOrCreateInstance(a, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || V.trigger(this._element, lp).defaultPrevented)
      return;
    for (const a of t)
      a.hide();
    const n = this._getDimension();
    this._element.classList.remove(An), this._element.classList.add(Ui), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ui), this._element.classList.add(An, ko), this._element.style[n] = "", V.trigger(this._element, cp);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || V.trigger(this._element, up).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, vi(this._element), this._element.classList.add(Ui), this._element.classList.remove(An, ko);
    for (const i of this._triggerArray) {
      const r = ut.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(Ui), this._element.classList.add(An), V.trigger(this._element, hp);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  // Private
  _isShown(t = this._element) {
    return t.classList.contains(ko);
  }
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = Os(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(gp) ? mp : bp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(oa);
    for (const s of t) {
      const n = ut.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const s = ut.find(pp, this._config.parent);
    return ut.find(t, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(t, s) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(fp, !s), n.setAttribute("aria-expanded", s);
  }
  // Static
  static jQueryInterface(t) {
    const s = {};
    return typeof t == "string" && /show|hide/.test(t) && (s.toggle = !1), this.each(function() {
      const n = hi.getOrCreateInstance(this, s);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
V.on(document, dp, oa, function(e) {
  (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
  for (const t of ut.getMultipleElementsFromSelector(this))
    hi.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Ne(hi);
const Fl = "dropdown", Ep = "bs.dropdown", Js = `.${Ep}`, Ma = ".data-api", wp = "Escape", xl = "Tab", Ap = "ArrowUp", Cl = "ArrowDown", Tp = 2, Fp = `hide${Js}`, xp = `hidden${Js}`, Cp = `show${Js}`, Op = `shown${Js}`, Wu = `click${Js}${Ma}`, zu = `keydown${Js}${Ma}`, kp = `keyup${Js}${Ma}`, bn = "show", Np = "dropup", Sp = "dropend", Lp = "dropstart", Ip = "dropup-center", $p = "dropdown-center", js = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Dp = `${js}.${bn}`, or = ".dropdown-menu", Mp = ".navbar", Rp = ".navbar-nav", Bp = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", qp = Oe() ? "top-end" : "top-start", Pp = Oe() ? "top-start" : "top-end", Vp = Oe() ? "bottom-end" : "bottom-start", jp = Oe() ? "bottom-start" : "bottom-end", Up = Oe() ? "left-start" : "right-start", Hp = Oe() ? "right-start" : "left-start", Wp = "top", zp = "bottom", Kp = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, Gp = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Xe extends je {
  constructor(t, s) {
    super(t, s), this._popper = null, this._parent = this._element.parentNode, this._menu = ut.next(this._element, or)[0] || ut.prev(this._element, or)[0] || ut.findOne(or, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Kp;
  }
  static get DefaultType() {
    return Gp;
  }
  static get NAME() {
    return Fl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (ks(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!V.trigger(this._element, Cp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Rp))
        for (const n of [].concat(...document.body.children))
          V.on(n, "mouseover", hr);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(bn), this._element.classList.add(bn), V.trigger(this._element, Op, t);
    }
  }
  hide() {
    if (ks(this._element) || !this._isShown())
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
    if (!V.trigger(this._element, Fp, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          V.off(n, "mouseover", hr);
      this._popper && this._popper.destroy(), this._menu.classList.remove(bn), this._element.classList.remove(bn), this._element.setAttribute("aria-expanded", "false"), ps.removeDataAttribute(this._menu, "popper"), V.trigger(this._element, xp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !fs(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Fl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Ou > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : fs(this._config.reference) ? t = Os(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = Ia(t, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(bn);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Sp))
      return Up;
    if (t.classList.contains(Lp))
      return Hp;
    if (t.classList.contains(Ip))
      return Wp;
    if (t.classList.contains($p))
      return zp;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Np) ? s ? Pp : qp : s ? jp : Vp;
  }
  _detectNavbar() {
    return this._element.closest(Mp) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (ps.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
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
    const n = ut.find(Bp, this._menu).filter((i) => Bn(i));
    n.length && $a(n, s, t === Cl, !n.includes(s)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Xe.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Tp || t.type === "keyup" && t.key !== xl)
      return;
    const s = ut.find(Dp);
    for (const n of s) {
      const i = Xe.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === xl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const a = {
        relatedTarget: i._element
      };
      t.type === "click" && (a.clickEvent = t), i._completeHide(a);
    }
  }
  static dataApiKeydownHandler(t) {
    const s = /input|textarea/i.test(t.target.tagName), n = t.key === wp, i = [Ap, Cl].includes(t.key);
    if (!i && !n || s && !n)
      return;
    t.preventDefault();
    const r = this.matches(js) ? this : ut.prev(this, js)[0] || ut.next(this, js)[0] || ut.findOne(js, t.delegateTarget.parentNode), o = Xe.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
V.on(document, zu, js, Xe.dataApiKeydownHandler);
V.on(document, zu, or, Xe.dataApiKeydownHandler);
V.on(document, Wu, Xe.clearMenus);
V.on(document, kp, Xe.clearMenus);
V.on(document, Wu, js, function(e) {
  e.preventDefault(), Xe.getOrCreateInstance(this).toggle();
});
Ne(Xe);
const Ku = "backdrop", Yp = "fade", Ol = "show", kl = `mousedown.bs.${Ku}`, Xp = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, Zp = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class Gu extends _i {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return Xp;
  }
  static get DefaultType() {
    return Zp;
  }
  static get NAME() {
    return Ku;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      pe(t);
      return;
    }
    this._append();
    const s = this._getElement();
    this._config.isAnimated && vi(s), s.classList.add(Ol), this._emulateAnimation(() => {
      pe(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      pe(t);
      return;
    }
    this._getElement().classList.remove(Ol), this._emulateAnimation(() => {
      this.dispose(), pe(t);
    });
  }
  dispose() {
    this._isAppended && (V.off(this._element, kl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(Yp), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = Os(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), V.on(t, kl, () => {
      pe(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Iu(t, this._getElement(), this._config.isAnimated);
  }
}
const Jp = "focustrap", Qp = "bs.focustrap", fr = `.${Qp}`, tg = `focusin${fr}`, eg = `keydown.tab${fr}`, sg = "Tab", ng = "forward", Nl = "backward", ig = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, rg = {
  autofocus: "boolean",
  trapElement: "element"
};
class Yu extends _i {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return ig;
  }
  static get DefaultType() {
    return rg;
  }
  static get NAME() {
    return Jp;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), V.off(document, fr), V.on(document, tg, (t) => this._handleFocusin(t)), V.on(document, eg, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, V.off(document, fr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: s
    } = this._config;
    if (t.target === document || t.target === s || s.contains(t.target))
      return;
    const n = ut.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === Nl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === sg && (this._lastTabNavDirection = t.shiftKey ? Nl : ng);
  }
}
const Sl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Ll = ".sticky-top", Hi = "padding-right", Il = "margin-right";
class aa {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Hi, (s) => s + t), this._setElementAttributes(Sl, Hi, (s) => s + t), this._setElementAttributes(Ll, Il, (s) => s - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Hi), this._resetElementAttributes(Sl, Hi), this._resetElementAttributes(Ll, Il);
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
    n && ps.setDataAttribute(t, s, n);
  }
  _resetElementAttributes(t, s) {
    const n = (i) => {
      const r = ps.getDataAttribute(i, s);
      if (r === null) {
        i.style.removeProperty(s);
        return;
      }
      ps.removeDataAttribute(i, s), i.style.setProperty(s, r);
    };
    this._applyManipulationCallback(t, n);
  }
  _applyManipulationCallback(t, s) {
    if (fs(t)) {
      s(t);
      return;
    }
    for (const n of ut.find(t, this._element))
      s(n);
  }
}
const og = "modal", ag = "bs.modal", ke = `.${ag}`, lg = ".data-api", cg = "Escape", ug = `hide${ke}`, hg = `hidePrevented${ke}`, Xu = `hidden${ke}`, Zu = `show${ke}`, dg = `shown${ke}`, fg = `resize${ke}`, pg = `click.dismiss${ke}`, gg = `mousedown.dismiss${ke}`, mg = `keydown.dismiss${ke}`, bg = `click${ke}${lg}`, $l = "modal-open", yg = "fade", Dl = "show", No = "modal-static", vg = ".modal.show", _g = ".modal-dialog", Eg = ".modal-body", wg = '[data-bs-toggle="modal"]', Ag = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Tg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Ks extends je {
  constructor(t, s) {
    super(t, s), this._dialog = ut.findOne(_g, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new aa(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Ag;
  }
  static get DefaultType() {
    return Tg;
  }
  static get NAME() {
    return og;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || V.trigger(this._element, Zu, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add($l), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || V.trigger(this._element, ug).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Dl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    V.off(window, ke), V.off(this._dialog, ke), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new Gu({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new Yu({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = ut.findOne(Eg, this._dialog);
    s && (s.scrollTop = 0), vi(this._element), this._element.classList.add(Dl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, V.trigger(this._element, dg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    V.on(this._element, mg, (t) => {
      if (t.key === cg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), V.on(window, fg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), V.on(this._element, gg, (t) => {
      V.one(this._element, pg, (s) => {
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
      document.body.classList.remove($l), this._resetAdjustments(), this._scrollBar.reset(), V.trigger(this._element, Xu);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(yg);
  }
  _triggerBackdropTransition() {
    if (V.trigger(this._element, hg).defaultPrevented)
      return;
    const s = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(No) || (s || (this._element.style.overflowY = "hidden"), this._element.classList.add(No), this._queueCallback(() => {
      this._element.classList.remove(No), this._queueCallback(() => {
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
      const n = Ks.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](s);
      }
    });
  }
}
V.on(document, bg, wg, function(e) {
  const t = ut.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), V.one(t, Zu, (i) => {
    i.defaultPrevented || V.one(t, Xu, () => {
      Bn(this) && this.focus();
    });
  });
  const s = ut.findOne(vg);
  s && Ks.getInstance(s).hide(), Ks.getOrCreateInstance(t).toggle(this);
});
Tr(Ks);
Ne(Ks);
const Fg = "offcanvas", xg = "bs.offcanvas", ys = `.${xg}`, Ju = ".data-api", Cg = `load${ys}${Ju}`, Og = "Escape", Ml = "show", Rl = "showing", Bl = "hiding", kg = "offcanvas-backdrop", Qu = ".offcanvas.show", Ng = `show${ys}`, Sg = `shown${ys}`, Lg = `hide${ys}`, ql = `hidePrevented${ys}`, th = `hidden${ys}`, Ig = `resize${ys}`, $g = `click${ys}${Ju}`, Dg = `keydown.dismiss${ys}`, Mg = '[data-bs-toggle="offcanvas"]', Rg = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, Bg = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class Ns extends je {
  constructor(t, s) {
    super(t, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Rg;
  }
  static get DefaultType() {
    return Bg;
  }
  static get NAME() {
    return Fg;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || V.trigger(this._element, Ng, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new aa().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Rl);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Ml), this._element.classList.remove(Rl), V.trigger(this._element, Sg, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || V.trigger(this._element, Lg).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Bl), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(Ml, Bl), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new aa().reset(), V.trigger(this._element, th);
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
        V.trigger(this._element, ql);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new Gu({
      className: kg,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? t : null
    });
  }
  _initializeFocusTrap() {
    return new Yu({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    V.on(this._element, Dg, (t) => {
      if (t.key === Og) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        V.trigger(this._element, ql);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ns.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
V.on(document, $g, Mg, function(e) {
  const t = ut.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), ks(this))
    return;
  V.one(t, th, () => {
    Bn(this) && this.focus();
  });
  const s = ut.findOne(Qu);
  s && s !== t && Ns.getInstance(s).hide(), Ns.getOrCreateInstance(t).toggle(this);
});
V.on(window, Cg, () => {
  for (const e of ut.find(Qu))
    Ns.getOrCreateInstance(e).show();
});
V.on(window, Ig, () => {
  for (const e of ut.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" && Ns.getOrCreateInstance(e).hide();
});
Tr(Ns);
Ne(Ns);
const qg = /^aria-[\w-]*$/i, eh = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", qg],
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
}, Pg = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), Vg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, jg = (e, t) => {
  const s = e.nodeName.toLowerCase();
  return t.includes(s) ? Pg.has(s) ? !!Vg.test(e.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function Ug(e, t, s) {
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
    const l = [].concat(...o.attributes), c = [].concat(t["*"] || [], t[a] || []);
    for (const d of l)
      jg(d, c) || o.removeAttribute(d.nodeName);
  }
  return i.body.innerHTML;
}
const Hg = "TemplateFactory", Wg = {
  allowList: eh,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, zg = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, Kg = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class Gg extends _i {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return Wg;
  }
  static get DefaultType() {
    return zg;
  }
  static get NAME() {
    return Hg;
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
      }, Kg);
  }
  _setContent(t, s, n) {
    const i = ut.findOne(n, t);
    if (i) {
      if (s = this._resolvePossibleFunction(s), !s) {
        i.remove();
        return;
      }
      if (fs(s)) {
        this._putElementInTemplate(Os(s), i);
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
    return this._config.sanitize ? Ug(t, this._config.allowList, this._config.sanitizeFn) : t;
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
const Yg = "tooltip", Xg = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), So = "fade", Zg = "modal", Wi = "show", Jg = ".tooltip-inner", Pl = `.${Zg}`, Vl = "hide.bs.modal", Qn = "hover", Lo = "focus", Io = "click", Qg = "manual", tm = "hide", em = "hidden", sm = "show", nm = "shown", im = "inserted", rm = "click", om = "focusin", am = "focusout", lm = "mouseenter", cm = "mouseleave", um = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Oe() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Oe() ? "right" : "left"
}, hm = {
  allowList: eh,
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
}, dm = {
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
let Cr = class sh extends je {
  constructor(t, s) {
    if (typeof Ou > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
    super(t, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return hm;
  }
  static get DefaultType() {
    return dm;
  }
  static get NAME() {
    return Yg;
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
    clearTimeout(this._timeout), V.off(this._element.closest(Pl), Vl, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = V.trigger(this._element, this.constructor.eventName(sm)), n = (Su(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), V.trigger(this._element, this.constructor.eventName(im))), this._popper = this._createPopper(i), i.classList.add(Wi), "ontouchstart" in document.documentElement)
      for (const a of [].concat(...document.body.children))
        V.on(a, "mouseover", hr);
    const o = () => {
      V.trigger(this._element, this.constructor.eventName(nm)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || V.trigger(this._element, this.constructor.eventName(tm)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Wi), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        V.off(i, "mouseover", hr);
    this._activeTrigger[Io] = !1, this._activeTrigger[Lo] = !1, this._activeTrigger[Qn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), V.trigger(this._element, this.constructor.eventName(em)));
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
    s.classList.remove(So, Wi), s.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Jd(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(So), s;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Gg({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [Jg]: this._getTitle()
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
    return this._config.animation || this.tip && this.tip.classList.contains(So);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Wi);
  }
  _createPopper(t) {
    const s = pe(this._config.placement, [this, t, this._element]), n = um[s.toUpperCase()];
    return Ia(this._element, t, this._getPopperConfig(n));
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
        V.on(this._element, this.constructor.eventName(rm), this._config.selector, (n) => {
          const i = this._initializeOnDelegatedTarget(n);
          i._activeTrigger[Io] = !(i._isShown() && i._activeTrigger[Io]), i.toggle();
        });
      else if (s !== Qg) {
        const n = s === Qn ? this.constructor.eventName(lm) : this.constructor.eventName(om), i = s === Qn ? this.constructor.eventName(cm) : this.constructor.eventName(am);
        V.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Lo : Qn] = !0, o._enter();
        }), V.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Lo : Qn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, V.on(this._element.closest(Pl), Vl, this._hideModalHandler);
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
    const s = ps.getDataAttributes(this._element);
    for (const n of Object.keys(s))
      Xg.has(n) && delete s[n];
    return t = {
      ...s,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : Os(t.container), typeof t.delay == "number" && (t.delay = {
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
      const s = sh.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
};
Ne(Cr);
const fm = "popover", pm = ".popover-header", gm = ".popover-body", mm = {
  ...Cr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, bm = {
  ...Cr.DefaultType,
  content: "(null|string|element|function)"
};
class Ra extends Cr {
  // Getters
  static get Default() {
    return mm;
  }
  static get DefaultType() {
    return bm;
  }
  static get NAME() {
    return fm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [pm]: this._getTitle(),
      [gm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ra.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
Ne(Ra);
const ym = "scrollspy", vm = "bs.scrollspy", Ba = `.${vm}`, _m = ".data-api", Em = `activate${Ba}`, jl = `click${Ba}`, wm = `load${Ba}${_m}`, Am = "dropdown-item", pn = "active", Tm = '[data-bs-spy="scroll"]', $o = "[href]", Fm = ".nav, .list-group", Ul = ".nav-link", xm = ".nav-item", Cm = ".list-group-item", Om = `${Ul}, ${xm} > ${Ul}, ${Cm}`, km = ".dropdown", Nm = ".dropdown-toggle", Sm = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, Lm = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Or extends je {
  constructor(t, s) {
    super(t, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return Sm;
  }
  static get DefaultType() {
    return Lm;
  }
  static get NAME() {
    return ym;
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
    return t.target = Os(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((s) => Number.parseFloat(s))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (V.off(this._config.target, jl), V.on(this._config.target, jl, $o, (t) => {
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
    const t = ut.find($o, this._config.target);
    for (const s of t) {
      if (!s.hash || ks(s))
        continue;
      const n = ut.findOne(decodeURI(s.hash), this._element);
      Bn(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(pn), this._activateParents(t), V.trigger(this._element, Em, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Am)) {
      ut.findOne(Nm, t.closest(km)).classList.add(pn);
      return;
    }
    for (const s of ut.parents(t, Fm))
      for (const n of ut.prev(s, Om))
        n.classList.add(pn);
  }
  _clearActiveClass(t) {
    t.classList.remove(pn);
    const s = ut.find(`${$o}.${pn}`, t);
    for (const n of s)
      n.classList.remove(pn);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Or.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
V.on(window, wm, () => {
  for (const e of ut.find(Tm))
    Or.getOrCreateInstance(e);
});
Ne(Or);
const Im = "tab", $m = "bs.tab", Qs = `.${$m}`, Dm = `hide${Qs}`, Mm = `hidden${Qs}`, Rm = `show${Qs}`, Bm = `shown${Qs}`, qm = `click${Qs}`, Pm = `keydown${Qs}`, Vm = `load${Qs}`, jm = "ArrowLeft", Hl = "ArrowRight", Um = "ArrowUp", Wl = "ArrowDown", Do = "Home", zl = "End", Us = "active", Kl = "fade", Mo = "show", Hm = "dropdown", nh = ".dropdown-toggle", Wm = ".dropdown-menu", Ro = `:not(${nh})`, zm = '.list-group, .nav, [role="tablist"]', Km = ".nav-item, .list-group-item", Gm = `.nav-link${Ro}, .list-group-item${Ro}, [role="tab"]${Ro}`, ih = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Bo = `${Gm}, ${ih}`, Ym = `.${Us}[data-bs-toggle="tab"], .${Us}[data-bs-toggle="pill"], .${Us}[data-bs-toggle="list"]`;
class $n extends je {
  constructor(t) {
    super(t), this._parent = this._element.closest(zm), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), V.on(this._element, Pm, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return Im;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const s = this._getActiveElem(), n = s ? V.trigger(s, Dm, {
      relatedTarget: t
    }) : null;
    V.trigger(t, Rm, {
      relatedTarget: s
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(s, t), this._activate(t, s));
  }
  // Private
  _activate(t, s) {
    if (!t)
      return;
    t.classList.add(Us), this._activate(ut.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Mo);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), V.trigger(t, Bm, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(Kl));
  }
  _deactivate(t, s) {
    if (!t)
      return;
    t.classList.remove(Us), t.blur(), this._deactivate(ut.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Mo);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), V.trigger(t, Mm, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(Kl));
  }
  _keydown(t) {
    if (![jm, Hl, Um, Wl, Do, zl].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const s = this._getChildren().filter((i) => !ks(i));
    let n;
    if ([Do, zl].includes(t.key))
      n = s[t.key === Do ? 0 : s.length - 1];
    else {
      const i = [Hl, Wl].includes(t.key);
      n = $a(s, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), $n.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return ut.find(Bo, this._parent);
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
    const s = ut.getElementFromSelector(t);
    s && (this._setAttributeIfNotExists(s, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(s, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, s) {
    const n = this._getOuterElement(t);
    if (!n.classList.contains(Hm))
      return;
    const i = (r, o) => {
      const a = ut.findOne(r, n);
      a && a.classList.toggle(o, s);
    };
    i(nh, Us), i(Wm, Mo), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(t, s, n) {
    t.hasAttribute(s) || t.setAttribute(s, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(Us);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Bo) ? t : ut.findOne(Bo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(Km) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = $n.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
V.on(document, qm, ih, function(e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !ks(this) && $n.getOrCreateInstance(this).show();
});
V.on(window, Vm, () => {
  for (const e of ut.find(Ym))
    $n.getOrCreateInstance(e);
});
Ne($n);
const Xm = "toast", Zm = "bs.toast", $s = `.${Zm}`, Jm = `mouseover${$s}`, Qm = `mouseout${$s}`, t1 = `focusin${$s}`, e1 = `focusout${$s}`, s1 = `hide${$s}`, n1 = `hidden${$s}`, i1 = `show${$s}`, r1 = `shown${$s}`, o1 = "fade", Gl = "hide", zi = "show", Ki = "showing", a1 = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, l1 = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class kr extends je {
  constructor(t, s) {
    super(t, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return l1;
  }
  static get DefaultType() {
    return a1;
  }
  static get NAME() {
    return Xm;
  }
  // Public
  show() {
    if (V.trigger(this._element, i1).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(o1);
    const s = () => {
      this._element.classList.remove(Ki), V.trigger(this._element, r1), this._maybeScheduleHide();
    };
    this._element.classList.remove(Gl), vi(this._element), this._element.classList.add(zi, Ki), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || V.trigger(this._element, s1).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(Gl), this._element.classList.remove(Ki, zi), V.trigger(this._element, n1);
    };
    this._element.classList.add(Ki), this._queueCallback(s, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(zi), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(zi);
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
    V.on(this._element, Jm, (t) => this._onInteraction(t, !0)), V.on(this._element, Qm, (t) => this._onInteraction(t, !1)), V.on(this._element, t1, (t) => this._onInteraction(t, !0)), V.on(this._element, e1, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = kr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
Tr(kr);
Ne(kr);
function qa(e) {
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
function Nr(e, t) {
  for (const s in t)
    t[s] instanceof Object && s in e && Object.assign(t[s], Nr(e[s], t[s]));
  return Object.assign(e || {}, t);
}
function tn(e, t, s, n) {
  try {
    return typeof e == "function" ? e(t, s, n) : e;
  } catch (i) {
    return console.error(i), null;
  }
}
async function Tn(e) {
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
function Fn(e, t) {
  let s = [];
  if (t && t.errors) {
    if (Array.isArray(t.errors))
      for (let n of t.errors)
        s.push({
          message: n.message || n,
          timeout: 3500,
          priority: "danger"
        });
    else if (typeof t.errors == "object") {
      if (Array.isArray(t.errors.exception))
        for (let n of t.errors.exception)
          s.push({
            message: n.message || n,
            timeout: 3500,
            priority: "danger"
          });
      else
        for (let n in t.errors)
          if (Array.isArray(t.errors[n]))
            for (let i of t.errors[n])
              s.push({
                message: i.message || i,
                timeout: 3500,
                priority: "danger"
              });
    }
  } else e.status >= 400 && e.status <= 511 && s.push({
    message: e.status + (e.statusText ? " " + e.statusText : ""),
    timeout: 3500,
    priority: "danger"
  });
  return s.length > 0 ? s : null;
}
let Ps = Date.now() ^ (typeof performance < "u" && performance.now ? performance.now() : 0) << 16;
function c1() {
  return Ps ^= Ps << 13, Ps ^= Ps >>> 17, Ps ^= Ps << 5, (Ps >>> 0) / 4294967295;
}
function rh(e = 16) {
  const t = Math.max(0, e), s = new Uint8Array(t);
  if (typeof crypto < "u" && crypto.getRandomValues)
    return crypto.getRandomValues(s), s;
  for (let n = 0; n < t; n++)
    s[n] = Math.floor(c1() * 256);
  return s;
}
function la() {
  const e = rh(4);
  return ((e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]) >>> 0) / 4294967295;
}
function pr(e) {
  return !e || e <= 0 ? 0 : Math.floor(la() * e);
}
function oh(e = 12, t = "abcdefghijklmnopqrstuvwxyz0123456789") {
  const s = rh(e);
  let n = "";
  const i = t.length;
  for (let r = 0; r < s.length; r++)
    n += t[s[r] % i];
  return n;
}
function cs(e, t, s, n) {
  if (t.options || (t.options = {}), t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), n && n.header)
    for (let i of Object.keys(n.header))
      t.options.headers[i] = n.header[i];
  return t.options.body = void 0, t.options.method = e, s && Object.assign(t.options, s), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function us(e, t, s, n) {
  let i = !1, r = Object.assign({}, n || {});
  return n && (n.filter && (r.filter = JSON.stringify(n.filter)), n.order && (r.order = JSON.stringify(n.order)), i = Object.keys(r).length), t.url + (s ? "/" + s : "") + (i ? "?" + new URLSearchParams(r).toString() : "");
}
function ti(e, t = "-") {
  return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function u1(e) {
  let t = [];
  for (let s of e)
    t.push(gr(s));
  return t;
}
function gr(e, t = "", s = {}) {
  for (let n in e) {
    let i = t ? t + "." + n : n;
    typeof e[n] == "object" && !Array.isArray(e[n]) ? gr(e[n], i, s) : s[i] = e[n];
  }
  return s;
}
function h1(e) {
  let t = {};
  for (let s in e) {
    let n = s.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? e[s] : {} : []), t);
  }
  return t;
}
function Pn(e, t, s, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (a, l) => o[l] ? o[l] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][e] ? i(e, s) : i(t[n][e]);
}
function d1(e, t, s = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(s), i = e.map(
    (r) => t.map((o) => {
      let a = r[o.name];
      return o.template ? o.template(a, r, e) : a !== void 0 ? a : "";
    }).join(s)
  );
  return [n, ...i].join(`
`);
}
function f1(e, t = "export.csv") {
  e = "\uFEFF" + e;
  const s = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(s), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function p1(e) {
  return [...new Set(e)];
}
function Pa(e, t) {
  e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function Va(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 && e.push(s.value);
}
function ja(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 ? e.push(s.value) : e.splice(e.indexOf(s.value), 1);
}
function Ua(e) {
  e.length = 0;
}
function Ha(e, t) {
  t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Wa(e, t) {
  t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function g1(e, t) {
  Object.keys(e).forEach((s) => {
    typeof e[s] == "function" && (e[s] = e[s](t));
  });
}
function m1(e, t) {
  return e < 1024 ? e + (t ? " Byte" : "") : e < 1048576 ? (e / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : e < 1073741824 ? (e / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (e / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
}
function b1(e) {
  return e.split(".").reverse()[0];
}
var ah = typeof global == "object" && global && global.Object === Object && global, y1 = typeof self == "object" && self && self.Object === Object && self, ts = ah || y1 || Function("return this")(), Ss = ts.Symbol, lh = Object.prototype, v1 = lh.hasOwnProperty, _1 = lh.toString, ei = Ss ? Ss.toStringTag : void 0;
function E1(e) {
  var t = v1.call(e, ei), s = e[ei];
  try {
    e[ei] = void 0;
    var n = !0;
  } catch {
  }
  var i = _1.call(e);
  return n && (t ? e[ei] = s : delete e[ei]), i;
}
var w1 = Object.prototype, A1 = w1.toString;
function T1(e) {
  return A1.call(e);
}
var F1 = "[object Null]", x1 = "[object Undefined]", Yl = Ss ? Ss.toStringTag : void 0;
function Vn(e) {
  return e == null ? e === void 0 ? x1 : F1 : Yl && Yl in Object(e) ? E1(e) : T1(e);
}
function ms(e) {
  return e != null && typeof e == "object";
}
var Gs = Array.isArray;
function Ds(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function ch(e) {
  return e;
}
var C1 = "[object AsyncFunction]", O1 = "[object Function]", k1 = "[object GeneratorFunction]", N1 = "[object Proxy]";
function za(e) {
  if (!Ds(e))
    return !1;
  var t = Vn(e);
  return t == O1 || t == k1 || t == C1 || t == N1;
}
var qo = ts["__core-js_shared__"], Xl = (function() {
  var e = /[^.]+$/.exec(qo && qo.keys && qo.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function S1(e) {
  return !!Xl && Xl in e;
}
var L1 = Function.prototype, I1 = L1.toString;
function en(e) {
  if (e != null) {
    try {
      return I1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var $1 = /[\\^$.*+?()[\]{}|]/g, D1 = /^\[object .+?Constructor\]$/, M1 = Function.prototype, R1 = Object.prototype, B1 = M1.toString, q1 = R1.hasOwnProperty, P1 = RegExp(
  "^" + B1.call(q1).replace($1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function V1(e) {
  if (!Ds(e) || S1(e))
    return !1;
  var t = za(e) ? P1 : D1;
  return t.test(en(e));
}
function j1(e, t) {
  return e?.[t];
}
function sn(e, t) {
  var s = j1(e, t);
  return V1(s) ? s : void 0;
}
var ca = sn(ts, "WeakMap"), Zl = Object.create, U1 = /* @__PURE__ */ (function() {
  function e() {
  }
  return function(t) {
    if (!Ds(t))
      return {};
    if (Zl)
      return Zl(t);
    e.prototype = t;
    var s = new e();
    return e.prototype = void 0, s;
  };
})();
function H1(e, t, s) {
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
function W1(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var z1 = 800, K1 = 16, G1 = Date.now;
function Y1(e) {
  var t = 0, s = 0;
  return function() {
    var n = G1(), i = K1 - (n - s);
    if (s = n, i > 0) {
      if (++t >= z1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function X1(e) {
  return function() {
    return e;
  };
}
var mr = (function() {
  try {
    var e = sn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
})(), Z1 = mr ? function(e, t) {
  return mr(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: X1(t),
    writable: !0
  });
} : ch, J1 = Y1(Z1);
function Q1(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var t0 = 9007199254740991, e0 = /^(?:0|[1-9]\d*)$/;
function uh(e, t) {
  var s = typeof e;
  return t = t ?? t0, !!t && (s == "number" || s != "symbol" && e0.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Ka(e, t, s) {
  t == "__proto__" && mr ? mr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
function Ai(e, t) {
  return e === t || e !== e && t !== t;
}
var s0 = Object.prototype, n0 = s0.hasOwnProperty;
function hh(e, t, s) {
  var n = e[t];
  (!(n0.call(e, t) && Ai(n, s)) || s === void 0 && !(t in e)) && Ka(e, t, s);
}
function i0(e, t, s, n) {
  var i = !s;
  s || (s = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var a = t[r], l = void 0;
    l === void 0 && (l = e[a]), i ? Ka(s, a, l) : hh(s, a, l);
  }
  return s;
}
var Jl = Math.max;
function r0(e, t, s) {
  return t = Jl(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = Jl(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var a = Array(t + 1); ++i < t; )
      a[i] = n[i];
    return a[t] = s(o), H1(e, this, a);
  };
}
function o0(e, t) {
  return J1(r0(e, t, ch), e + "");
}
var a0 = 9007199254740991;
function dh(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= a0;
}
function Sr(e) {
  return e != null && dh(e.length) && !za(e);
}
function l0(e, t, s) {
  if (!Ds(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? Sr(s) && uh(t, s.length) : n == "string" && t in s) ? Ai(s[t], e) : !1;
}
function c0(e) {
  return o0(function(t, s) {
    var n = -1, i = s.length, r = i > 1 ? s[i - 1] : void 0, o = i > 2 ? s[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && l0(s[0], s[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var a = s[n];
      a && e(t, a, n, r);
    }
    return t;
  });
}
var u0 = Object.prototype;
function Ga(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || u0;
  return e === s;
}
function h0(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var d0 = "[object Arguments]";
function Ql(e) {
  return ms(e) && Vn(e) == d0;
}
var fh = Object.prototype, f0 = fh.hasOwnProperty, p0 = fh.propertyIsEnumerable, ua = Ql(/* @__PURE__ */ (function() {
  return arguments;
})()) ? Ql : function(e) {
  return ms(e) && f0.call(e, "callee") && !p0.call(e, "callee");
};
function g0() {
  return !1;
}
var ph = typeof exports == "object" && exports && !exports.nodeType && exports, tc = ph && typeof module == "object" && module && !module.nodeType && module, m0 = tc && tc.exports === ph, ec = m0 ? ts.Buffer : void 0, b0 = ec ? ec.isBuffer : void 0, di = b0 || g0, y0 = "[object Arguments]", v0 = "[object Array]", _0 = "[object Boolean]", E0 = "[object Date]", w0 = "[object Error]", A0 = "[object Function]", T0 = "[object Map]", F0 = "[object Number]", x0 = "[object Object]", C0 = "[object RegExp]", O0 = "[object Set]", k0 = "[object String]", N0 = "[object WeakMap]", S0 = "[object ArrayBuffer]", L0 = "[object DataView]", I0 = "[object Float32Array]", $0 = "[object Float64Array]", D0 = "[object Int8Array]", M0 = "[object Int16Array]", R0 = "[object Int32Array]", B0 = "[object Uint8Array]", q0 = "[object Uint8ClampedArray]", P0 = "[object Uint16Array]", V0 = "[object Uint32Array]", Nt = {};
Nt[I0] = Nt[$0] = Nt[D0] = Nt[M0] = Nt[R0] = Nt[B0] = Nt[q0] = Nt[P0] = Nt[V0] = !0;
Nt[y0] = Nt[v0] = Nt[S0] = Nt[_0] = Nt[L0] = Nt[E0] = Nt[w0] = Nt[A0] = Nt[T0] = Nt[F0] = Nt[x0] = Nt[C0] = Nt[O0] = Nt[k0] = Nt[N0] = !1;
function j0(e) {
  return ms(e) && dh(e.length) && !!Nt[Vn(e)];
}
function Ya(e) {
  return function(t) {
    return e(t);
  };
}
var gh = typeof exports == "object" && exports && !exports.nodeType && exports, ci = gh && typeof module == "object" && module && !module.nodeType && module, U0 = ci && ci.exports === gh, Po = U0 && ah.process, Dn = (function() {
  try {
    var e = ci && ci.require && ci.require("util").types;
    return e || Po && Po.binding && Po.binding("util");
  } catch {
  }
})(), sc = Dn && Dn.isTypedArray, Xa = sc ? Ya(sc) : j0, H0 = Object.prototype, W0 = H0.hasOwnProperty;
function mh(e, t) {
  var s = Gs(e), n = !s && ua(e), i = !s && !n && di(e), r = !s && !n && !i && Xa(e), o = s || n || i || r, a = o ? h0(e.length, String) : [], l = a.length;
  for (var c in e)
    (t || W0.call(e, c)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    uh(c, l))) && a.push(c);
  return a;
}
function bh(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var z0 = bh(Object.keys, Object), K0 = Object.prototype, G0 = K0.hasOwnProperty;
function Y0(e) {
  if (!Ga(e))
    return z0(e);
  var t = [];
  for (var s in Object(e))
    G0.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
function X0(e) {
  return Sr(e) ? mh(e) : Y0(e);
}
function Z0(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var J0 = Object.prototype, Q0 = J0.hasOwnProperty;
function tb(e) {
  if (!Ds(e))
    return Z0(e);
  var t = Ga(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !Q0.call(e, n)) || s.push(n);
  return s;
}
function yh(e) {
  return Sr(e) ? mh(e, !0) : tb(e);
}
var fi = sn(Object, "create");
function eb() {
  this.__data__ = fi ? fi(null) : {}, this.size = 0;
}
function sb(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var nb = "__lodash_hash_undefined__", ib = Object.prototype, rb = ib.hasOwnProperty;
function ob(e) {
  var t = this.__data__;
  if (fi) {
    var s = t[e];
    return s === nb ? void 0 : s;
  }
  return rb.call(t, e) ? t[e] : void 0;
}
var ab = Object.prototype, lb = ab.hasOwnProperty;
function cb(e) {
  var t = this.__data__;
  return fi ? t[e] !== void 0 : lb.call(t, e);
}
var ub = "__lodash_hash_undefined__";
function hb(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = fi && t === void 0 ? ub : t, this;
}
function Ys(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ys.prototype.clear = eb;
Ys.prototype.delete = sb;
Ys.prototype.get = ob;
Ys.prototype.has = cb;
Ys.prototype.set = hb;
function db() {
  this.__data__ = [], this.size = 0;
}
function Lr(e, t) {
  for (var s = e.length; s--; )
    if (Ai(e[s][0], t))
      return s;
  return -1;
}
var fb = Array.prototype, pb = fb.splice;
function gb(e) {
  var t = this.__data__, s = Lr(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : pb.call(t, s, 1), --this.size, !0;
}
function mb(e) {
  var t = this.__data__, s = Lr(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function bb(e) {
  return Lr(this.__data__, e) > -1;
}
function yb(e, t) {
  var s = this.__data__, n = Lr(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function vs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
vs.prototype.clear = db;
vs.prototype.delete = gb;
vs.prototype.get = mb;
vs.prototype.has = bb;
vs.prototype.set = yb;
var pi = sn(ts, "Map");
function vb() {
  this.size = 0, this.__data__ = {
    hash: new Ys(),
    map: new (pi || vs)(),
    string: new Ys()
  };
}
function _b(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Ir(e, t) {
  var s = e.__data__;
  return _b(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function Eb(e) {
  var t = Ir(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function wb(e) {
  return Ir(this, e).get(e);
}
function Ab(e) {
  return Ir(this, e).has(e);
}
function Tb(e, t) {
  var s = Ir(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
function nn(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
nn.prototype.clear = vb;
nn.prototype.delete = Eb;
nn.prototype.get = wb;
nn.prototype.has = Ab;
nn.prototype.set = Tb;
function Fb(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var vh = bh(Object.getPrototypeOf, Object), xb = "[object Object]", Cb = Function.prototype, Ob = Object.prototype, _h = Cb.toString, kb = Ob.hasOwnProperty, Nb = _h.call(Object);
function Sb(e) {
  if (!ms(e) || Vn(e) != xb)
    return !1;
  var t = vh(e);
  if (t === null)
    return !0;
  var s = kb.call(t, "constructor") && t.constructor;
  return typeof s == "function" && s instanceof s && _h.call(s) == Nb;
}
function Lb() {
  this.__data__ = new vs(), this.size = 0;
}
function Ib(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
function $b(e) {
  return this.__data__.get(e);
}
function Db(e) {
  return this.__data__.has(e);
}
var Mb = 200;
function Rb(e, t) {
  var s = this.__data__;
  if (s instanceof vs) {
    var n = s.__data__;
    if (!pi || n.length < Mb - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new nn(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
function Ze(e) {
  var t = this.__data__ = new vs(e);
  this.size = t.size;
}
Ze.prototype.clear = Lb;
Ze.prototype.delete = Ib;
Ze.prototype.get = $b;
Ze.prototype.has = Db;
Ze.prototype.set = Rb;
var Eh = typeof exports == "object" && exports && !exports.nodeType && exports, nc = Eh && typeof module == "object" && module && !module.nodeType && module, Bb = nc && nc.exports === Eh, ic = Bb ? ts.Buffer : void 0, rc = ic ? ic.allocUnsafe : void 0;
function wh(e, t) {
  if (t)
    return e.slice();
  var s = e.length, n = rc ? rc(s) : new e.constructor(s);
  return e.copy(n), n;
}
function qb(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var o = e[s];
    t(o, s, e) && (r[i++] = o);
  }
  return r;
}
function Pb() {
  return [];
}
var Vb = Object.prototype, jb = Vb.propertyIsEnumerable, oc = Object.getOwnPropertySymbols, Ub = oc ? function(e) {
  return e == null ? [] : (e = Object(e), qb(oc(e), function(t) {
    return jb.call(e, t);
  }));
} : Pb;
function Hb(e, t, s) {
  var n = t(e);
  return Gs(e) ? n : Fb(n, s(e));
}
function ha(e) {
  return Hb(e, X0, Ub);
}
var da = sn(ts, "DataView"), fa = sn(ts, "Promise"), pa = sn(ts, "Set"), ac = "[object Map]", Wb = "[object Object]", lc = "[object Promise]", cc = "[object Set]", uc = "[object WeakMap]", hc = "[object DataView]", zb = en(da), Kb = en(pi), Gb = en(fa), Yb = en(pa), Xb = en(ca), De = Vn;
(da && De(new da(new ArrayBuffer(1))) != hc || pi && De(new pi()) != ac || fa && De(fa.resolve()) != lc || pa && De(new pa()) != cc || ca && De(new ca()) != uc) && (De = function(e) {
  var t = Vn(e), s = t == Wb ? e.constructor : void 0, n = s ? en(s) : "";
  if (n)
    switch (n) {
      case zb:
        return hc;
      case Kb:
        return ac;
      case Gb:
        return lc;
      case Yb:
        return cc;
      case Xb:
        return uc;
    }
  return t;
});
var Zb = Object.prototype, Jb = Zb.hasOwnProperty;
function Qb(e) {
  var t = e.length, s = new e.constructor(t);
  return t && typeof e[0] == "string" && Jb.call(e, "index") && (s.index = e.index, s.input = e.input), s;
}
var br = ts.Uint8Array;
function Za(e) {
  var t = new e.constructor(e.byteLength);
  return new br(t).set(new br(e)), t;
}
function ty(e, t) {
  var s = Za(e.buffer);
  return new e.constructor(s, e.byteOffset, e.byteLength);
}
var ey = /\w*$/;
function sy(e) {
  var t = new e.constructor(e.source, ey.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var dc = Ss ? Ss.prototype : void 0, fc = dc ? dc.valueOf : void 0;
function ny(e) {
  return fc ? Object(fc.call(e)) : {};
}
function Ah(e, t) {
  var s = t ? Za(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.length);
}
var iy = "[object Boolean]", ry = "[object Date]", oy = "[object Map]", ay = "[object Number]", ly = "[object RegExp]", cy = "[object Set]", uy = "[object String]", hy = "[object Symbol]", dy = "[object ArrayBuffer]", fy = "[object DataView]", py = "[object Float32Array]", gy = "[object Float64Array]", my = "[object Int8Array]", by = "[object Int16Array]", yy = "[object Int32Array]", vy = "[object Uint8Array]", _y = "[object Uint8ClampedArray]", Ey = "[object Uint16Array]", wy = "[object Uint32Array]";
function Ay(e, t, s) {
  var n = e.constructor;
  switch (t) {
    case dy:
      return Za(e);
    case iy:
    case ry:
      return new n(+e);
    case fy:
      return ty(e);
    case py:
    case gy:
    case my:
    case by:
    case yy:
    case vy:
    case _y:
    case Ey:
    case wy:
      return Ah(e, s);
    case oy:
      return new n();
    case ay:
    case uy:
      return new n(e);
    case ly:
      return sy(e);
    case cy:
      return new n();
    case hy:
      return ny(e);
  }
}
function Th(e) {
  return typeof e.constructor == "function" && !Ga(e) ? U1(vh(e)) : {};
}
var Ty = "[object Map]";
function Fy(e) {
  return ms(e) && De(e) == Ty;
}
var pc = Dn && Dn.isMap, xy = pc ? Ya(pc) : Fy, Cy = "[object Set]";
function Oy(e) {
  return ms(e) && De(e) == Cy;
}
var gc = Dn && Dn.isSet, ky = gc ? Ya(gc) : Oy, Ny = 1, Fh = "[object Arguments]", Sy = "[object Array]", Ly = "[object Boolean]", Iy = "[object Date]", $y = "[object Error]", xh = "[object Function]", Dy = "[object GeneratorFunction]", My = "[object Map]", Ry = "[object Number]", Ch = "[object Object]", By = "[object RegExp]", qy = "[object Set]", Py = "[object String]", Vy = "[object Symbol]", jy = "[object WeakMap]", Uy = "[object ArrayBuffer]", Hy = "[object DataView]", Wy = "[object Float32Array]", zy = "[object Float64Array]", Ky = "[object Int8Array]", Gy = "[object Int16Array]", Yy = "[object Int32Array]", Xy = "[object Uint8Array]", Zy = "[object Uint8ClampedArray]", Jy = "[object Uint16Array]", Qy = "[object Uint32Array]", Ot = {};
Ot[Fh] = Ot[Sy] = Ot[Uy] = Ot[Hy] = Ot[Ly] = Ot[Iy] = Ot[Wy] = Ot[zy] = Ot[Ky] = Ot[Gy] = Ot[Yy] = Ot[My] = Ot[Ry] = Ot[Ch] = Ot[By] = Ot[qy] = Ot[Py] = Ot[Vy] = Ot[Xy] = Ot[Zy] = Ot[Jy] = Ot[Qy] = !0;
Ot[$y] = Ot[xh] = Ot[jy] = !1;
function ar(e, t, s, n, i, r) {
  var o, a = t & Ny;
  if (o !== void 0)
    return o;
  if (!Ds(e))
    return e;
  var l = Gs(e);
  if (l)
    o = Qb(e);
  else {
    var c = De(e), d = c == xh || c == Dy;
    if (di(e))
      return wh(e, a);
    if (c == Ch || c == Fh || d && !i)
      o = d ? {} : Th(e);
    else {
      if (!Ot[c])
        return i ? e : {};
      o = Ay(e, c, a);
    }
  }
  r || (r = new Ze());
  var h = r.get(e);
  if (h)
    return h;
  r.set(e, o), ky(e) ? e.forEach(function(E) {
    o.add(ar(E, t, s, E, e, r));
  }) : xy(e) && e.forEach(function(E, F) {
    o.set(F, ar(E, t, s, F, e, r));
  });
  var m = ha, v = l ? void 0 : m(e);
  return Q1(v || e, function(E, F) {
    v && (F = E, E = e[F]), hh(o, F, ar(E, t, s, F, e, r));
  }), o;
}
var tv = 1, ev = 4;
function xn(e) {
  return ar(e, tv | ev);
}
var sv = "__lodash_hash_undefined__";
function nv(e) {
  return this.__data__.set(e, sv), this;
}
function iv(e) {
  return this.__data__.has(e);
}
function yr(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new nn(); ++t < s; )
    this.add(e[t]);
}
yr.prototype.add = yr.prototype.push = nv;
yr.prototype.has = iv;
function rv(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
function ov(e, t) {
  return e.has(t);
}
var av = 1, lv = 2;
function Oh(e, t, s, n, i, r) {
  var o = s & av, a = e.length, l = t.length;
  if (a != l && !(o && l > a))
    return !1;
  var c = r.get(e), d = r.get(t);
  if (c && d)
    return c == t && d == e;
  var h = -1, m = !0, v = s & lv ? new yr() : void 0;
  for (r.set(e, t), r.set(t, e); ++h < a; ) {
    var E = e[h], F = t[h];
    if (n)
      var k = o ? n(F, E, h, t, e, r) : n(E, F, h, e, t, r);
    if (k !== void 0) {
      if (k)
        continue;
      m = !1;
      break;
    }
    if (v) {
      if (!rv(t, function(I, j) {
        if (!ov(v, j) && (E === I || i(E, I, s, n, r)))
          return v.push(j);
      })) {
        m = !1;
        break;
      }
    } else if (!(E === F || i(E, F, s, n, r))) {
      m = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), m;
}
function cv(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
function uv(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var hv = 1, dv = 2, fv = "[object Boolean]", pv = "[object Date]", gv = "[object Error]", mv = "[object Map]", bv = "[object Number]", yv = "[object RegExp]", vv = "[object Set]", _v = "[object String]", Ev = "[object Symbol]", wv = "[object ArrayBuffer]", Av = "[object DataView]", mc = Ss ? Ss.prototype : void 0, Vo = mc ? mc.valueOf : void 0;
function Tv(e, t, s, n, i, r, o) {
  switch (s) {
    case Av:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case wv:
      return !(e.byteLength != t.byteLength || !r(new br(e), new br(t)));
    case fv:
    case pv:
    case bv:
      return Ai(+e, +t);
    case gv:
      return e.name == t.name && e.message == t.message;
    case yv:
    case _v:
      return e == t + "";
    case mv:
      var a = cv;
    case vv:
      var l = n & hv;
      if (a || (a = uv), e.size != t.size && !l)
        return !1;
      var c = o.get(e);
      if (c)
        return c == t;
      n |= dv, o.set(e, t);
      var d = Oh(a(e), a(t), n, i, r, o);
      return o.delete(e), d;
    case Ev:
      if (Vo)
        return Vo.call(e) == Vo.call(t);
  }
  return !1;
}
var Fv = 1, xv = Object.prototype, Cv = xv.hasOwnProperty;
function Ov(e, t, s, n, i, r) {
  var o = s & Fv, a = ha(e), l = a.length, c = ha(t), d = c.length;
  if (l != d && !o)
    return !1;
  for (var h = l; h--; ) {
    var m = a[h];
    if (!(o ? m in t : Cv.call(t, m)))
      return !1;
  }
  var v = r.get(e), E = r.get(t);
  if (v && E)
    return v == t && E == e;
  var F = !0;
  r.set(e, t), r.set(t, e);
  for (var k = o; ++h < l; ) {
    m = a[h];
    var I = e[m], j = t[m];
    if (n)
      var W = o ? n(j, I, m, t, e, r) : n(I, j, m, e, t, r);
    if (!(W === void 0 ? I === j || i(I, j, s, n, r) : W)) {
      F = !1;
      break;
    }
    k || (k = m == "constructor");
  }
  if (F && !k) {
    var Y = e.constructor, G = t.constructor;
    Y != G && "constructor" in e && "constructor" in t && !(typeof Y == "function" && Y instanceof Y && typeof G == "function" && G instanceof G) && (F = !1);
  }
  return r.delete(e), r.delete(t), F;
}
var kv = 1, bc = "[object Arguments]", yc = "[object Array]", Gi = "[object Object]", Nv = Object.prototype, vc = Nv.hasOwnProperty;
function Sv(e, t, s, n, i, r) {
  var o = Gs(e), a = Gs(t), l = o ? yc : De(e), c = a ? yc : De(t);
  l = l == bc ? Gi : l, c = c == bc ? Gi : c;
  var d = l == Gi, h = c == Gi, m = l == c;
  if (m && di(e)) {
    if (!di(t))
      return !1;
    o = !0, d = !1;
  }
  if (m && !d)
    return r || (r = new Ze()), o || Xa(e) ? Oh(e, t, s, n, i, r) : Tv(e, t, l, s, n, i, r);
  if (!(s & kv)) {
    var v = d && vc.call(e, "__wrapped__"), E = h && vc.call(t, "__wrapped__");
    if (v || E) {
      var F = v ? e.value() : e, k = E ? t.value() : t;
      return r || (r = new Ze()), i(F, k, s, n, r);
    }
  }
  return m ? (r || (r = new Ze()), Ov(e, t, s, n, i, r)) : !1;
}
function kh(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !ms(e) && !ms(t) ? e !== e && t !== t : Sv(e, t, s, n, kh, i);
}
function Lv(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), o = n(t), a = o.length; a--; ) {
      var l = o[++i];
      if (s(r[l], l, r) === !1)
        break;
    }
    return t;
  };
}
var Iv = Lv();
function ga(e, t, s) {
  (s !== void 0 && !Ai(e[t], s) || s === void 0 && !(t in e)) && Ka(e, t, s);
}
function $v(e) {
  return ms(e) && Sr(e);
}
function ma(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Dv(e) {
  return i0(e, yh(e));
}
function Mv(e, t, s, n, i, r, o) {
  var a = ma(e, s), l = ma(t, s), c = o.get(l);
  if (c) {
    ga(e, s, c);
    return;
  }
  var d = r ? r(a, l, s + "", e, t, o) : void 0, h = d === void 0;
  if (h) {
    var m = Gs(l), v = !m && di(l), E = !m && !v && Xa(l);
    d = l, m || v || E ? Gs(a) ? d = a : $v(a) ? d = W1(a) : v ? (h = !1, d = wh(l, !0)) : E ? (h = !1, d = Ah(l, !0)) : d = [] : Sb(l) || ua(l) ? (d = a, ua(a) ? d = Dv(a) : (!Ds(a) || za(a)) && (d = Th(l))) : h = !1;
  }
  h && (o.set(l, d), i(d, l, n, r, o), o.delete(l)), ga(e, s, d);
}
function Nh(e, t, s, n, i) {
  e !== t && Iv(t, function(r, o) {
    if (i || (i = new Ze()), Ds(r))
      Mv(e, t, o, s, Nh, n, i);
    else {
      var a = n ? n(ma(e, o), r, o + "", e, t, i) : void 0;
      a === void 0 && (a = r), ga(e, o, a);
    }
  }, yh);
}
function Ja(e, t) {
  return kh(e, t);
}
var xs = c0(function(e, t, s) {
  Nh(e, t, s);
}), ot = /* @__PURE__ */ ((e) => (e[e.TYPE = 3] = "TYPE", e[e.LEVEL = 12] = "LEVEL", e[e.ATTRIBUTE = 13] = "ATTRIBUTE", e[e.BLOT = 14] = "BLOT", e[e.INLINE = 7] = "INLINE", e[e.BLOCK = 11] = "BLOCK", e[e.BLOCK_BLOT = 10] = "BLOCK_BLOT", e[e.INLINE_BLOT = 6] = "INLINE_BLOT", e[e.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", e[e.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", e[e.ANY = 15] = "ANY", e))(ot || {});
class Qe {
  constructor(t, s, n = {}) {
    this.attrName = t, this.keyName = s;
    const i = ot.TYPE & ot.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & ot.LEVEL | i
    ) : ot.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
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
class Cn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const Sh = class ba {
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
      throw new Cn(`Unable to create ${s} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      s instanceof Node || s.nodeType === Node.TEXT_NODE ? s : r.create(n)
    ), a = new r(t, o, n);
    return ba.blots.set(a.domNode, a), a;
  }
  find(t, s = !1) {
    return ba.find(t, s);
  }
  query(t, s = ot.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & ot.LEVEL & ot.BLOCK ? n = this.types.block : t & ot.LEVEL & ot.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && s & ot.LEVEL & n.scope && s & ot.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((s) => {
      const n = "blotName" in s, i = "attrName" in s;
      if (!n && !i)
        throw new Cn("Invalid definition");
      if (n && s.blotName === "abstract")
        throw new Cn("Cannot register abstract class");
      const r = n ? s.blotName : i ? s.attrName : void 0;
      return this.types[r] = s, i ? typeof s.keyName == "string" && (this.attributes[s.keyName] = s) : n && (s.className && (this.classes[s.className] = s), s.tagName && (Array.isArray(s.tagName) ? s.tagName = s.tagName.map((o) => o.toUpperCase()) : s.tagName = s.tagName.toUpperCase(), (Array.isArray(s.tagName) ? s.tagName : [s.tagName]).forEach((o) => {
        (this.tags[o] == null || s.className == null) && (this.tags[o] = s);
      }))), s;
    });
  }
};
Sh.blots = /* @__PURE__ */ new WeakMap();
let Mn = Sh;
function _c(e, t) {
  return (e.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class Rv extends Qe {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((s) => s.split("-").slice(0, -1).join("-"));
  }
  add(t, s) {
    return this.canAdd(t, s) ? (this.remove(t), t.classList.add(`${this.keyName}-${s}`), !0) : !1;
  }
  remove(t) {
    _c(t, this.keyName).forEach((s) => {
      t.classList.remove(s);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const s = (_c(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, s) ? s : "";
  }
}
const Ue = Rv;
function jo(e) {
  const t = e.split("-"), s = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + s;
}
class Bv extends Qe {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((s) => s.split(":")[0].trim());
  }
  add(t, s) {
    return this.canAdd(t, s) ? (t.style[jo(this.keyName)] = s, !0) : !1;
  }
  remove(t) {
    t.style[jo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const s = t.style[jo(this.keyName)];
    return this.canAdd(t, s) ? s : "";
  }
}
const Ms = Bv;
class qv {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, s) {
    s ? t.add(this.domNode, s) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Mn.find(this.domNode);
    if (t == null)
      return;
    const s = Qe.keys(this.domNode), n = Ue.keys(this.domNode), i = Ms.keys(this.domNode);
    s.concat(n).concat(i).forEach((r) => {
      const o = t.scroll.query(r, ot.ATTRIBUTE);
      o instanceof Qe && (this.attributes[o.attrName] = o);
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
const $r = qv, Lh = class {
  constructor(t, s) {
    this.scroll = t, this.domNode = s, Mn.blots.set(s, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new Cn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Mn.blots.delete(this.domNode);
  }
  deleteAt(t, s) {
    this.isolate(t, s).remove();
  }
  formatAt(t, s, n, i) {
    const r = this.isolate(t, s);
    if (this.scroll.query(n, ot.BLOT) != null && i)
      r.wrap(n, i);
    else if (this.scroll.query(n, ot.ATTRIBUTE) != null) {
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
      throw new Cn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Lh.blotName = "abstract";
let Ih = Lh;
const $h = class extends Ih {
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
$h.scope = ot.INLINE_BLOT;
let Pv = $h;
const re = Pv;
class Vv {
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
      const c = l.length();
      t > o ? n(
        l,
        t - o,
        Math.min(s, o + c - t)
      ) : n(l, 0, Math.min(c, t + s - o)), o += c, l = a();
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
function Ec(e, t) {
  const s = t.find(e);
  if (s)
    return s;
  try {
    return t.create(e);
  } catch {
    const n = t.create(ot.INLINE);
    return Array.from(e.childNodes).forEach((i) => {
      n.domNode.appendChild(i);
    }), e.parentNode && e.parentNode.replaceChild(n.domNode, e), n.attach(), n;
  }
}
const Dh = class Ts extends Ih {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, Ts.uiClass && this.uiNode.classList.add(Ts.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new Vv(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const s = Ec(t, this.scroll);
        this.insertBefore(s, this.children.head || void 0);
      } catch (s) {
        if (s instanceof Cn)
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
    return t.blotName == null && t(n) || t.blotName != null && n instanceof t ? [n, i] : n instanceof Ts ? n.descendant(t, i) : [null, -1];
  }
  descendants(t, s = 0, n = Number.MAX_VALUE) {
    let i = [], r = n;
    return this.children.forEachAt(
      s,
      n,
      (o, a, l) => {
        (t.blotName == null && t(o) || t.blotName != null && o instanceof t) && i.push(o), o instanceof Ts && (i = i.concat(
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
      ) || (s.statics.scope === ot.BLOCK_BLOT ? (s.next != null && this.splitAfter(s), s.prev != null && this.splitAfter(s.prev), s.parent.unwrap(), t = !0) : s instanceof Ts ? s.unwrap() : s.remove());
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
    return n instanceof Ts ? r.concat(n.path(i, s)) : (n != null && r.push([n, i]), r);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, s) {
    const n = typeof t == "string" ? this.scroll.create(t, s) : t;
    return n instanceof Ts && this.moveChildren(n), super.replaceWith(n);
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
      const a = Ec(r, this.scroll);
      (a.next !== o || a.next == null) && (a.parent != null && a.parent.removeChild(this), this.insertBefore(a, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Dh.uiClass = "";
let jv = Dh;
const Pe = jv;
function Uv(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const yn = class vn extends Pe {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(vn.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, s) {
    super(t, s), this.attributes = new $r(this.domNode);
  }
  format(t, s) {
    if (t === this.statics.blotName && !s)
      this.children.forEach((n) => {
        n instanceof vn || (n = n.wrap(vn.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(t, ot.INLINE);
      if (n == null)
        return;
      n instanceof Qe ? this.attributes.attribute(n, s) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s);
    }
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.formats()[n] != null || this.scroll.query(n, ot.ATTRIBUTE) ? this.isolate(t, s).format(n, i) : super.formatAt(t, s, n, i);
  }
  optimize(t) {
    super.optimize(t);
    const s = this.formats();
    if (Object.keys(s).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof vn && n.prev === this && Uv(s, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof vn && this.attributes.move(n), n;
  }
};
yn.allowedChildren = [yn, re], yn.blotName = "inline", yn.scope = ot.INLINE_BLOT, yn.tagName = "SPAN";
let Hv = yn;
const Qa = Hv, _n = class ya extends Pe {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(ya.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, s) {
    super(t, s), this.attributes = new $r(this.domNode);
  }
  format(t, s) {
    const n = this.scroll.query(t, ot.BLOCK);
    n != null && (n instanceof Qe ? this.attributes.attribute(n, s) : t === this.statics.blotName && !s ? this.replaceWith(ya.blotName) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s));
  }
  formats() {
    const t = this.attributes.values(), s = this.statics.formats(this.domNode, this.scroll);
    return s != null && (t[this.statics.blotName] = s), t;
  }
  formatAt(t, s, n, i) {
    this.scroll.query(n, ot.BLOCK) != null ? this.format(n, i) : super.formatAt(t, s, n, i);
  }
  insertAt(t, s, n) {
    if (n == null || this.scroll.query(s, ot.INLINE) != null)
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
_n.blotName = "block", _n.scope = ot.BLOCK_BLOT, _n.tagName = "P", _n.allowedChildren = [
  Qa,
  _n,
  re
];
let Wv = _n;
const gi = Wv, va = class extends Pe {
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
va.blotName = "container", va.scope = ot.BLOCK_BLOT;
let zv = va;
const Dr = zv;
class Kv extends re {
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
const ve = Kv, Gv = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Yv = 100, En = class extends Pe {
  constructor(t, s) {
    super(null, s), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, Gv), this.attach();
  }
  create(t, s) {
    return this.registry.create(this, t, s);
  }
  find(t, s = !1) {
    const n = this.registry.find(t, s);
    return n ? n.scroll === this ? n : s ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, s = ot.ANY) {
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
    }, o = (l) => {
      n.has(l.domNode) && (l instanceof Pe && l.children.forEach(o), n.delete(l.domNode), l.optimize(s));
    };
    let a = t;
    for (let l = 0; a.length > 0; l += 1) {
      if (l >= Yv)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (a.forEach((c) => {
        const d = this.find(c.target, !0);
        d != null && (d.domNode === c.target && (c.type === "childList" ? (r(this.find(c.previousSibling, !1)), Array.from(c.addedNodes).forEach((h) => {
          const m = this.find(h, !1);
          r(m, !1), m instanceof Pe && m.children.forEach((v) => {
            r(v, !1);
          });
        })) : c.type === "attributes" && r(d.prev)), r(d));
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
En.blotName = "scroll", En.defaultChild = gi, En.allowedChildren = [gi, Dr], En.scope = ot.BLOCK_BLOT, En.tagName = "DIV";
let Xv = En;
const tl = Xv, _a = class Mh extends re {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof Mh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
_a.blotName = "text", _a.scope = ot.INLINE_BLOT;
let Zv = _a;
const vr = Zv, Jv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Qe,
  AttributorStore: $r,
  BlockBlot: gi,
  ClassAttributor: Ue,
  ContainerBlot: Dr,
  EmbedBlot: ve,
  InlineBlot: Qa,
  LeafBlot: re,
  ParentBlot: Pe,
  Registry: Mn,
  Scope: ot,
  ScrollBlot: tl,
  StyleAttributor: Ms,
  TextBlot: vr
}, Symbol.toStringTag, { value: "Module" }));
var ds = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yi = { exports: {} }, Uo, wc;
function Qv() {
  if (wc) return Uo;
  wc = 1;
  var e = -1, t = 1, s = 0;
  function n(y, x, w, O, M) {
    if (y === x)
      return y ? [[s, y]] : [];
    if (w != null) {
      var A = C(y, x, w);
      if (A)
        return A;
    }
    var N = a(y, x), z = y.substring(0, N);
    y = y.substring(N), x = x.substring(N), N = c(y, x);
    var K = y.substring(y.length - N);
    y = y.substring(0, y.length - N), x = x.substring(0, x.length - N);
    var U = i(y, x);
    return z && U.unshift([s, z]), K && U.push([s, K]), j(U, M), O && h(U), U;
  }
  function i(y, x) {
    var w;
    if (!y)
      return [[t, x]];
    if (!x)
      return [[e, y]];
    var O = y.length > x.length ? y : x, M = y.length > x.length ? x : y, A = O.indexOf(M);
    if (A !== -1)
      return w = [
        [t, O.substring(0, A)],
        [s, M],
        [t, O.substring(A + M.length)]
      ], y.length > x.length && (w[0][0] = w[2][0] = e), w;
    if (M.length === 1)
      return [
        [e, y],
        [t, x]
      ];
    var N = d(y, x);
    if (N) {
      var z = N[0], K = N[1], U = N[2], et = N[3], Q = N[4], rt = n(z, U), nt = n(K, et);
      return rt.concat([[s, Q]], nt);
    }
    return r(y, x);
  }
  function r(y, x) {
    for (var w = y.length, O = x.length, M = Math.ceil((w + O) / 2), A = M, N = 2 * M, z = new Array(N), K = new Array(N), U = 0; U < N; U++)
      z[U] = -1, K[U] = -1;
    z[A + 1] = 0, K[A + 1] = 0;
    for (var et = w - O, Q = et % 2 !== 0, rt = 0, nt = 0, H = 0, Z = 0, bt = 0; bt < M; bt++) {
      for (var tt = -bt + rt; tt <= bt - nt; tt += 2) {
        var pt = A + tt, gt;
        tt === -bt || tt !== bt && z[pt - 1] < z[pt + 1] ? gt = z[pt + 1] : gt = z[pt - 1] + 1;
        for (var R = gt - tt; gt < w && R < O && y.charAt(gt) === x.charAt(R); )
          gt++, R++;
        if (z[pt] = gt, gt > w)
          nt += 2;
        else if (R > O)
          rt += 2;
        else if (Q) {
          var B = A + et - tt;
          if (B >= 0 && B < N && K[B] !== -1) {
            var q = w - K[B];
            if (gt >= q)
              return o(y, x, gt, R);
          }
        }
      }
      for (var J = -bt + H; J <= bt - Z; J += 2) {
        var B = A + J, q;
        J === -bt || J !== bt && K[B - 1] < K[B + 1] ? q = K[B + 1] : q = K[B - 1] + 1;
        for (var Dt = q - J; q < w && Dt < O && y.charAt(w - q - 1) === x.charAt(O - Dt - 1); )
          q++, Dt++;
        if (K[B] = q, q > w)
          Z += 2;
        else if (Dt > O)
          H += 2;
        else if (!Q) {
          var pt = A + et - J;
          if (pt >= 0 && pt < N && z[pt] !== -1) {
            var gt = z[pt], R = A + gt - pt;
            if (q = w - q, gt >= q)
              return o(y, x, gt, R);
          }
        }
      }
    }
    return [
      [e, y],
      [t, x]
    ];
  }
  function o(y, x, w, O) {
    var M = y.substring(0, w), A = x.substring(0, O), N = y.substring(w), z = x.substring(O), K = n(M, A), U = n(N, z);
    return K.concat(U);
  }
  function a(y, x) {
    if (!y || !x || y.charAt(0) !== x.charAt(0))
      return 0;
    for (var w = 0, O = Math.min(y.length, x.length), M = O, A = 0; w < M; )
      y.substring(A, M) == x.substring(A, M) ? (w = M, A = w) : O = M, M = Math.floor((O - w) / 2 + w);
    return W(y.charCodeAt(M - 1)) && M--, M;
  }
  function l(y, x) {
    var w = y.length, O = x.length;
    if (w == 0 || O == 0)
      return 0;
    w > O ? y = y.substring(w - O) : w < O && (x = x.substring(0, w));
    var M = Math.min(w, O);
    if (y == x)
      return M;
    for (var A = 0, N = 1; ; ) {
      var z = y.substring(M - N), K = x.indexOf(z);
      if (K == -1)
        return A;
      N += K, (K == 0 || y.substring(M - N) == x.substring(0, N)) && (A = N, N++);
    }
  }
  function c(y, x) {
    if (!y || !x || y.slice(-1) !== x.slice(-1))
      return 0;
    for (var w = 0, O = Math.min(y.length, x.length), M = O, A = 0; w < M; )
      y.substring(y.length - M, y.length - A) == x.substring(x.length - M, x.length - A) ? (w = M, A = w) : O = M, M = Math.floor((O - w) / 2 + w);
    return Y(y.charCodeAt(y.length - M)) && M--, M;
  }
  function d(y, x) {
    var w = y.length > x.length ? y : x, O = y.length > x.length ? x : y;
    if (w.length < 4 || O.length * 2 < w.length)
      return null;
    function M(nt, H, Z) {
      for (var bt = nt.substring(Z, Z + Math.floor(nt.length / 4)), tt = -1, pt = "", gt, R, B, q; (tt = H.indexOf(bt, tt + 1)) !== -1; ) {
        var J = a(
          nt.substring(Z),
          H.substring(tt)
        ), Dt = c(
          nt.substring(0, Z),
          H.substring(0, tt)
        );
        pt.length < Dt + J && (pt = H.substring(tt - Dt, tt) + H.substring(tt, tt + J), gt = nt.substring(0, Z - Dt), R = nt.substring(Z + J), B = H.substring(0, tt - Dt), q = H.substring(tt + J));
      }
      return pt.length * 2 >= nt.length ? [
        gt,
        R,
        B,
        q,
        pt
      ] : null;
    }
    var A = M(
      w,
      O,
      Math.ceil(w.length / 4)
    ), N = M(
      w,
      O,
      Math.ceil(w.length / 2)
    ), z;
    if (!A && !N)
      return null;
    N ? A ? z = A[4].length > N[4].length ? A : N : z = N : z = A;
    var K, U, et, Q;
    y.length > x.length ? (K = z[0], U = z[1], et = z[2], Q = z[3]) : (et = z[0], Q = z[1], K = z[2], U = z[3]);
    var rt = z[4];
    return [K, U, et, Q, rt];
  }
  function h(y) {
    for (var x = !1, w = [], O = 0, M = null, A = 0, N = 0, z = 0, K = 0, U = 0; A < y.length; )
      y[A][0] == s ? (w[O++] = A, N = K, z = U, K = 0, U = 0, M = y[A][1]) : (y[A][0] == t ? K += y[A][1].length : U += y[A][1].length, M && M.length <= Math.max(N, z) && M.length <= Math.max(K, U) && (y.splice(w[O - 1], 0, [
        e,
        M
      ]), y[w[O - 1] + 1][0] = t, O--, O--, A = O > 0 ? w[O - 1] : -1, N = 0, z = 0, K = 0, U = 0, M = null, x = !0)), A++;
    for (x && j(y), I(y), A = 1; A < y.length; ) {
      if (y[A - 1][0] == e && y[A][0] == t) {
        var et = y[A - 1][1], Q = y[A][1], rt = l(et, Q), nt = l(Q, et);
        rt >= nt ? (rt >= et.length / 2 || rt >= Q.length / 2) && (y.splice(A, 0, [
          s,
          Q.substring(0, rt)
        ]), y[A - 1][1] = et.substring(
          0,
          et.length - rt
        ), y[A + 1][1] = Q.substring(rt), A++) : (nt >= et.length / 2 || nt >= Q.length / 2) && (y.splice(A, 0, [
          s,
          et.substring(0, nt)
        ]), y[A - 1][0] = t, y[A - 1][1] = Q.substring(
          0,
          Q.length - nt
        ), y[A + 1][0] = e, y[A + 1][1] = et.substring(nt), A++), A++;
      }
      A++;
    }
  }
  var m = /[^a-zA-Z0-9]/, v = /\s/, E = /[\r\n]/, F = /\n\r?\n$/, k = /^\r?\n\r?\n/;
  function I(y) {
    function x(nt, H) {
      if (!nt || !H)
        return 6;
      var Z = nt.charAt(nt.length - 1), bt = H.charAt(0), tt = Z.match(m), pt = bt.match(m), gt = tt && Z.match(v), R = pt && bt.match(v), B = gt && Z.match(E), q = R && bt.match(E), J = B && nt.match(F), Dt = q && H.match(k);
      return J || Dt ? 5 : B || q ? 4 : tt && !gt && R ? 3 : gt || R ? 2 : tt || pt ? 1 : 0;
    }
    for (var w = 1; w < y.length - 1; ) {
      if (y[w - 1][0] == s && y[w + 1][0] == s) {
        var O = y[w - 1][1], M = y[w][1], A = y[w + 1][1], N = c(O, M);
        if (N) {
          var z = M.substring(M.length - N);
          O = O.substring(0, O.length - N), M = z + M.substring(0, M.length - N), A = z + A;
        }
        for (var K = O, U = M, et = A, Q = x(O, M) + x(M, A); M.charAt(0) === A.charAt(0); ) {
          O += M.charAt(0), M = M.substring(1) + A.charAt(0), A = A.substring(1);
          var rt = x(O, M) + x(M, A);
          rt >= Q && (Q = rt, K = O, U = M, et = A);
        }
        y[w - 1][1] != K && (K ? y[w - 1][1] = K : (y.splice(w - 1, 1), w--), y[w][1] = U, et ? y[w + 1][1] = et : (y.splice(w + 1, 1), w--));
      }
      w++;
    }
  }
  function j(y, x) {
    y.push([s, ""]);
    for (var w = 0, O = 0, M = 0, A = "", N = "", z; w < y.length; ) {
      if (w < y.length - 1 && !y[w][1]) {
        y.splice(w, 1);
        continue;
      }
      switch (y[w][0]) {
        case t:
          M++, N += y[w][1], w++;
          break;
        case e:
          O++, A += y[w][1], w++;
          break;
        case s:
          var K = w - M - O - 1;
          if (x) {
            if (K >= 0 && X(y[K][1])) {
              var U = y[K][1].slice(-1);
              if (y[K][1] = y[K][1].slice(
                0,
                -1
              ), A = U + A, N = U + N, !y[K][1]) {
                y.splice(K, 1), w--;
                var et = K - 1;
                y[et] && y[et][0] === t && (M++, N = y[et][1] + N, et--), y[et] && y[et][0] === e && (O++, A = y[et][1] + A, et--), K = et;
              }
            }
            if (G(y[w][1])) {
              var U = y[w][1].charAt(0);
              y[w][1] = y[w][1].slice(1), A += U, N += U;
            }
          }
          if (w < y.length - 1 && !y[w][1]) {
            y.splice(w, 1);
            break;
          }
          if (A.length > 0 || N.length > 0) {
            A.length > 0 && N.length > 0 && (z = a(N, A), z !== 0 && (K >= 0 ? y[K][1] += N.substring(
              0,
              z
            ) : (y.splice(0, 0, [
              s,
              N.substring(0, z)
            ]), w++), N = N.substring(z), A = A.substring(z)), z = c(N, A), z !== 0 && (y[w][1] = N.substring(N.length - z) + y[w][1], N = N.substring(
              0,
              N.length - z
            ), A = A.substring(
              0,
              A.length - z
            )));
            var Q = M + O;
            A.length === 0 && N.length === 0 ? (y.splice(w - Q, Q), w = w - Q) : A.length === 0 ? (y.splice(w - Q, Q, [t, N]), w = w - Q + 1) : N.length === 0 ? (y.splice(w - Q, Q, [e, A]), w = w - Q + 1) : (y.splice(
              w - Q,
              Q,
              [e, A],
              [t, N]
            ), w = w - Q + 2);
          }
          w !== 0 && y[w - 1][0] === s ? (y[w - 1][1] += y[w][1], y.splice(w, 1)) : w++, M = 0, O = 0, A = "", N = "";
          break;
      }
    }
    y[y.length - 1][1] === "" && y.pop();
    var rt = !1;
    for (w = 1; w < y.length - 1; )
      y[w - 1][0] === s && y[w + 1][0] === s && (y[w][1].substring(
        y[w][1].length - y[w - 1][1].length
      ) === y[w - 1][1] ? (y[w][1] = y[w - 1][1] + y[w][1].substring(
        0,
        y[w][1].length - y[w - 1][1].length
      ), y[w + 1][1] = y[w - 1][1] + y[w + 1][1], y.splice(w - 1, 1), rt = !0) : y[w][1].substring(0, y[w + 1][1].length) == y[w + 1][1] && (y[w - 1][1] += y[w + 1][1], y[w][1] = y[w][1].substring(y[w + 1][1].length) + y[w + 1][1], y.splice(w + 1, 1), rt = !0)), w++;
    rt && j(y, x);
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
  function dt(y) {
    for (var x = [], w = 0; w < y.length; w++)
      y[w][1].length > 0 && x.push(y[w]);
    return x;
  }
  function ft(y, x, w, O) {
    return X(y) || G(O) ? null : dt([
      [s, y],
      [e, x],
      [t, w],
      [s, O]
    ]);
  }
  function C(y, x, w) {
    var O = typeof w == "number" ? { index: w, length: 0 } : w.oldRange, M = typeof w == "number" ? null : w.newRange, A = y.length, N = x.length;
    if (O.length === 0 && (M === null || M.length === 0)) {
      var z = O.index, K = y.slice(0, z), U = y.slice(z), et = M ? M.index : null;
      t: {
        var Q = z + N - A;
        if (et !== null && et !== Q || Q < 0 || Q > N)
          break t;
        var rt = x.slice(0, Q), nt = x.slice(Q);
        if (nt !== U)
          break t;
        var H = Math.min(z, Q), Z = K.slice(0, H), bt = rt.slice(0, H);
        if (Z !== bt)
          break t;
        var tt = K.slice(H), pt = rt.slice(H);
        return ft(Z, tt, pt, U);
      }
      t: {
        if (et !== null && et !== z)
          break t;
        var gt = z, rt = x.slice(0, gt), nt = x.slice(gt);
        if (rt !== K)
          break t;
        var R = Math.min(A - gt, N - gt), B = U.slice(U.length - R), q = nt.slice(nt.length - R);
        if (B !== q)
          break t;
        var tt = U.slice(0, U.length - R), pt = nt.slice(0, nt.length - R);
        return ft(K, tt, pt, B);
      }
    }
    if (O.length > 0 && M && M.length === 0)
      t: {
        var Z = y.slice(0, O.index), B = y.slice(O.index + O.length), H = Z.length, R = B.length;
        if (N < H + R)
          break t;
        var bt = x.slice(0, H), q = x.slice(N - R);
        if (Z !== bt || B !== q)
          break t;
        var tt = y.slice(H, A - R), pt = x.slice(H, N - R);
        return ft(Z, tt, pt, B);
      }
    return null;
  }
  function P(y, x, w, O) {
    return n(y, x, w, O, !0);
  }
  return P.INSERT = t, P.DELETE = e, P.EQUAL = s, Uo = P, Uo;
}
var ni = { exports: {} };
ni.exports;
var Ac;
function Bh() {
  return Ac || (Ac = 1, (function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", l = "[object Date]", c = "[object Error]", d = "[object Function]", h = "[object GeneratorFunction]", m = "[object Map]", v = "[object Number]", E = "[object Object]", F = "[object Promise]", k = "[object RegExp]", I = "[object Set]", j = "[object String]", W = "[object Symbol]", Y = "[object WeakMap]", G = "[object ArrayBuffer]", X = "[object DataView]", dt = "[object Float32Array]", ft = "[object Float64Array]", C = "[object Int8Array]", P = "[object Int16Array]", y = "[object Int32Array]", x = "[object Uint8Array]", w = "[object Uint8ClampedArray]", O = "[object Uint16Array]", M = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, N = /\w*$/, z = /^\[object .+?Constructor\]$/, K = /^(?:0|[1-9]\d*)$/, U = {};
    U[r] = U[o] = U[G] = U[X] = U[a] = U[l] = U[dt] = U[ft] = U[C] = U[P] = U[y] = U[m] = U[v] = U[E] = U[k] = U[I] = U[j] = U[W] = U[x] = U[w] = U[O] = U[M] = !0, U[c] = U[d] = U[Y] = !1;
    var et = typeof ds == "object" && ds && ds.Object === Object && ds, Q = typeof self == "object" && self && self.Object === Object && self, rt = et || Q || Function("return this")(), nt = t && !t.nodeType && t, H = nt && !0 && e && !e.nodeType && e, Z = H && H.exports === nt;
    function bt(u, p) {
      return u.set(p[0], p[1]), u;
    }
    function tt(u, p) {
      return u.add(p), u;
    }
    function pt(u, p) {
      for (var _ = -1, L = u ? u.length : 0; ++_ < L && p(u[_], _, u) !== !1; )
        ;
      return u;
    }
    function gt(u, p) {
      for (var _ = -1, L = p.length, vt = u.length; ++_ < L; )
        u[vt + _] = p[_];
      return u;
    }
    function R(u, p, _, L) {
      for (var vt = -1, lt = u ? u.length : 0; ++vt < lt; )
        _ = p(_, u[vt], vt, u);
      return _;
    }
    function B(u, p) {
      for (var _ = -1, L = Array(u); ++_ < u; )
        L[_] = p(_);
      return L;
    }
    function q(u, p) {
      return u?.[p];
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
    function Dt(u) {
      var p = -1, _ = Array(u.size);
      return u.forEach(function(L, vt) {
        _[++p] = [vt, L];
      }), _;
    }
    function _e(u, p) {
      return function(_) {
        return u(p(_));
      };
    }
    function Le(u) {
      var p = -1, _ = Array(u.size);
      return u.forEach(function(L) {
        _[++p] = L;
      }), _;
    }
    var ss = Array.prototype, ns = Function.prototype, Zt = Object.prototype, oe = rt["__core-js_shared__"], Ee = (function() {
      var u = /[^.]+$/.exec(oe && oe.keys && oe.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    })(), Ht = ns.toString, xt = Zt.hasOwnProperty, at = Zt.toString, ct = RegExp(
      "^" + Ht.call(xt).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), _t = Z ? rt.Buffer : void 0, Et = rt.Symbol, Jt = rt.Uint8Array, kt = _e(Object.getPrototypeOf, Object), Wt = Object.create, zt = Zt.propertyIsEnumerable, Kt = ss.splice, Mt = Object.getOwnPropertySymbols, St = _t ? _t.isBuffer : void 0, qt = _e(Object.keys, Object), Rt = Ie(rt, "DataView"), Lt = Ie(rt, "Map"), Ct = Ie(rt, "Promise"), Bt = Ie(rt, "Set"), Pt = Ie(rt, "WeakMap"), It = Ie(Object, "create"), Vt = ae(Rt), $t = ae(Lt), jt = ae(Ct), Ut = ae(Bt), Un = ae(Pt), Es = Et ? Et.prototype : void 0, Oi = Es ? Es.valueOf : void 0;
    function is(u) {
      var p = -1, _ = u ? u.length : 0;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function qr() {
      this.__data__ = It ? It(null) : {};
    }
    function Pr(u) {
      return this.has(u) && delete this.__data__[u];
    }
    function Vr(u) {
      var p = this.__data__;
      if (It) {
        var _ = p[u];
        return _ === n ? void 0 : _;
      }
      return xt.call(p, u) ? p[u] : void 0;
    }
    function ki(u) {
      var p = this.__data__;
      return It ? p[u] !== void 0 : xt.call(p, u);
    }
    function Hn(u, p) {
      var _ = this.__data__;
      return _[u] = It && p === void 0 ? n : p, this;
    }
    is.prototype.clear = qr, is.prototype.delete = Pr, is.prototype.get = Vr, is.prototype.has = ki, is.prototype.set = Hn;
    function Qt(u) {
      var p = -1, _ = u ? u.length : 0;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function jr() {
      this.__data__ = [];
    }
    function Ur(u) {
      var p = this.__data__, _ = cn(p, u);
      if (_ < 0)
        return !1;
      var L = p.length - 1;
      return _ == L ? p.pop() : Kt.call(p, _, 1), !0;
    }
    function Hr(u) {
      var p = this.__data__, _ = cn(p, u);
      return _ < 0 ? void 0 : p[_][1];
    }
    function Wr(u) {
      return cn(this.__data__, u) > -1;
    }
    function zr(u, p) {
      var _ = this.__data__, L = cn(_, u);
      return L < 0 ? _.push([u, p]) : _[L][1] = p, this;
    }
    Qt.prototype.clear = jr, Qt.prototype.delete = Ur, Qt.prototype.get = Hr, Qt.prototype.has = Wr, Qt.prototype.set = zr;
    function se(u) {
      var p = -1, _ = u ? u.length : 0;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Kr() {
      this.__data__ = {
        hash: new is(),
        map: new (Lt || Qt)(),
        string: new is()
      };
    }
    function Gr(u) {
      return Bs(this, u).delete(u);
    }
    function Yr(u) {
      return Bs(this, u).get(u);
    }
    function Xr(u) {
      return Bs(this, u).has(u);
    }
    function Zr(u, p) {
      return Bs(this, u).set(u, p), this;
    }
    se.prototype.clear = Kr, se.prototype.delete = Gr, se.prototype.get = Yr, se.prototype.has = Xr, se.prototype.set = Zr;
    function de(u) {
      this.__data__ = new Qt(u);
    }
    function Jr() {
      this.__data__ = new Qt();
    }
    function Qr(u) {
      return this.__data__.delete(u);
    }
    function to(u) {
      return this.__data__.get(u);
    }
    function eo(u) {
      return this.__data__.has(u);
    }
    function so(u, p) {
      var _ = this.__data__;
      if (_ instanceof Qt) {
        var L = _.__data__;
        if (!Lt || L.length < s - 1)
          return L.push([u, p]), this;
        _ = this.__data__ = new se(L);
      }
      return _.set(u, p), this;
    }
    de.prototype.clear = Jr, de.prototype.delete = Qr, de.prototype.get = to, de.prototype.has = eo, de.prototype.set = so;
    function ln(u, p) {
      var _ = Gn(u) || hn(u) ? B(u.length, String) : [], L = _.length, vt = !!L;
      for (var lt in u)
        xt.call(u, lt) && !(vt && (lt == "length" || bo(lt, L))) && _.push(lt);
      return _;
    }
    function Ni(u, p, _) {
      var L = u[p];
      (!(xt.call(u, p) && Di(L, _)) || _ === void 0 && !(p in u)) && (u[p] = _);
    }
    function cn(u, p) {
      for (var _ = u.length; _--; )
        if (Di(u[_][0], p))
          return _;
      return -1;
    }
    function We(u, p) {
      return u && Kn(p, Xn(p), u);
    }
    function Wn(u, p, _, L, vt, lt, Tt) {
      var At;
      if (L && (At = lt ? L(u, vt, lt, Tt) : L(u)), At !== void 0)
        return At;
      if (!Ke(u))
        return u;
      var Gt = Gn(u);
      if (Gt) {
        if (At = go(u), !p)
          return ho(u, At);
      } else {
        var Ft = os(u), ne = Ft == d || Ft == h;
        if (Mi(u))
          return un(u, p);
        if (Ft == E || Ft == r || ne && !lt) {
          if (J(u))
            return lt ? u : {};
          if (At = ze(ne ? {} : u), !p)
            return fo(u, We(At, u));
        } else {
          if (!U[Ft])
            return lt ? u : {};
          At = mo(u, Ft, Wn, p);
        }
      }
      Tt || (Tt = new de());
      var fe = Tt.get(u);
      if (fe)
        return fe;
      if (Tt.set(u, At), !Gt)
        var Xt = _ ? po(u) : Xn(u);
      return pt(Xt || u, function(ie, te) {
        Xt && (te = ie, ie = u[te]), Ni(At, te, Wn(ie, p, _, L, te, u, Tt));
      }), At;
    }
    function no(u) {
      return Ke(u) ? Wt(u) : {};
    }
    function io(u, p, _) {
      var L = p(u);
      return Gn(u) ? L : gt(L, _(u));
    }
    function ro(u) {
      return at.call(u);
    }
    function oo(u) {
      if (!Ke(u) || vo(u))
        return !1;
      var p = Yn(u) || J(u) ? ct : z;
      return p.test(ae(u));
    }
    function ao(u) {
      if (!Ii(u))
        return qt(u);
      var p = [];
      for (var _ in Object(u))
        xt.call(u, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function un(u, p) {
      if (p)
        return u.slice();
      var _ = new u.constructor(u.length);
      return u.copy(_), _;
    }
    function zn(u) {
      var p = new u.constructor(u.byteLength);
      return new Jt(p).set(new Jt(u)), p;
    }
    function Rs(u, p) {
      var _ = p ? zn(u.buffer) : u.buffer;
      return new u.constructor(_, u.byteOffset, u.byteLength);
    }
    function Si(u, p, _) {
      var L = p ? _(Dt(u), !0) : Dt(u);
      return R(L, bt, new u.constructor());
    }
    function Li(u) {
      var p = new u.constructor(u.source, N.exec(u));
      return p.lastIndex = u.lastIndex, p;
    }
    function lo(u, p, _) {
      var L = p ? _(Le(u), !0) : Le(u);
      return R(L, tt, new u.constructor());
    }
    function co(u) {
      return Oi ? Object(Oi.call(u)) : {};
    }
    function uo(u, p) {
      var _ = p ? zn(u.buffer) : u.buffer;
      return new u.constructor(_, u.byteOffset, u.length);
    }
    function ho(u, p) {
      var _ = -1, L = u.length;
      for (p || (p = Array(L)); ++_ < L; )
        p[_] = u[_];
      return p;
    }
    function Kn(u, p, _, L) {
      _ || (_ = {});
      for (var vt = -1, lt = p.length; ++vt < lt; ) {
        var Tt = p[vt], At = void 0;
        Ni(_, Tt, At === void 0 ? u[Tt] : At);
      }
      return _;
    }
    function fo(u, p) {
      return Kn(u, rs(u), p);
    }
    function po(u) {
      return io(u, Xn, rs);
    }
    function Bs(u, p) {
      var _ = u.__data__;
      return yo(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function Ie(u, p) {
      var _ = q(u, p);
      return oo(_) ? _ : void 0;
    }
    var rs = Mt ? _e(Mt, Object) : Eo, os = ro;
    (Rt && os(new Rt(new ArrayBuffer(1))) != X || Lt && os(new Lt()) != m || Ct && os(Ct.resolve()) != F || Bt && os(new Bt()) != I || Pt && os(new Pt()) != Y) && (os = function(u) {
      var p = at.call(u), _ = p == E ? u.constructor : void 0, L = _ ? ae(_) : void 0;
      if (L)
        switch (L) {
          case Vt:
            return X;
          case $t:
            return m;
          case jt:
            return F;
          case Ut:
            return I;
          case Un:
            return Y;
        }
      return p;
    });
    function go(u) {
      var p = u.length, _ = u.constructor(p);
      return p && typeof u[0] == "string" && xt.call(u, "index") && (_.index = u.index, _.input = u.input), _;
    }
    function ze(u) {
      return typeof u.constructor == "function" && !Ii(u) ? no(kt(u)) : {};
    }
    function mo(u, p, _, L) {
      var vt = u.constructor;
      switch (p) {
        case G:
          return zn(u);
        case a:
        case l:
          return new vt(+u);
        case X:
          return Rs(u, L);
        case dt:
        case ft:
        case C:
        case P:
        case y:
        case x:
        case w:
        case O:
        case M:
          return uo(u, L);
        case m:
          return Si(u, L, _);
        case v:
        case j:
          return new vt(u);
        case k:
          return Li(u);
        case I:
          return lo(u, L, _);
        case W:
          return co(u);
      }
    }
    function bo(u, p) {
      return p = p ?? i, !!p && (typeof u == "number" || K.test(u)) && u > -1 && u % 1 == 0 && u < p;
    }
    function yo(u) {
      var p = typeof u;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
    }
    function vo(u) {
      return !!Ee && Ee in u;
    }
    function Ii(u) {
      var p = u && u.constructor, _ = typeof p == "function" && p.prototype || Zt;
      return u === _;
    }
    function ae(u) {
      if (u != null) {
        try {
          return Ht.call(u);
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
      return Wn(u, !0, !0);
    }
    function Di(u, p) {
      return u === p || u !== u && p !== p;
    }
    function hn(u) {
      return _o(u) && xt.call(u, "callee") && (!zt.call(u, "callee") || at.call(u) == r);
    }
    var Gn = Array.isArray;
    function dn(u) {
      return u != null && Ri(u.length) && !Yn(u);
    }
    function _o(u) {
      return Bi(u) && dn(u);
    }
    var Mi = St || wo;
    function Yn(u) {
      var p = Ke(u) ? at.call(u) : "";
      return p == d || p == h;
    }
    function Ri(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
    }
    function Ke(u) {
      var p = typeof u;
      return !!u && (p == "object" || p == "function");
    }
    function Bi(u) {
      return !!u && typeof u == "object";
    }
    function Xn(u) {
      return dn(u) ? ln(u) : ao(u);
    }
    function Eo() {
      return [];
    }
    function wo() {
      return !1;
    }
    e.exports = $i;
  })(ni, ni.exports)), ni.exports;
}
var ii = { exports: {} };
ii.exports;
var Tc;
function qh() {
  return Tc || (Tc = 1, (function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", d = "[object Boolean]", h = "[object Date]", m = "[object Error]", v = "[object Function]", E = "[object GeneratorFunction]", F = "[object Map]", k = "[object Number]", I = "[object Null]", j = "[object Object]", W = "[object Promise]", Y = "[object Proxy]", G = "[object RegExp]", X = "[object Set]", dt = "[object String]", ft = "[object Symbol]", C = "[object Undefined]", P = "[object WeakMap]", y = "[object ArrayBuffer]", x = "[object DataView]", w = "[object Float32Array]", O = "[object Float64Array]", M = "[object Int8Array]", A = "[object Int16Array]", N = "[object Int32Array]", z = "[object Uint8Array]", K = "[object Uint8ClampedArray]", U = "[object Uint16Array]", et = "[object Uint32Array]", Q = /[\\^$.*+?()[\]{}|]/g, rt = /^\[object .+?Constructor\]$/, nt = /^(?:0|[1-9]\d*)$/, H = {};
    H[w] = H[O] = H[M] = H[A] = H[N] = H[z] = H[K] = H[U] = H[et] = !0, H[a] = H[l] = H[y] = H[d] = H[x] = H[h] = H[m] = H[v] = H[F] = H[k] = H[j] = H[G] = H[X] = H[dt] = H[P] = !1;
    var Z = typeof ds == "object" && ds && ds.Object === Object && ds, bt = typeof self == "object" && self && self.Object === Object && self, tt = Z || bt || Function("return this")(), pt = t && !t.nodeType && t, gt = pt && !0 && e && !e.nodeType && e, R = gt && gt.exports === pt, B = R && Z.process, q = (function() {
      try {
        return B && B.binding && B.binding("util");
      } catch {
      }
    })(), J = q && q.isTypedArray;
    function Dt(u, p) {
      for (var _ = -1, L = u == null ? 0 : u.length, vt = 0, lt = []; ++_ < L; ) {
        var Tt = u[_];
        p(Tt, _, u) && (lt[vt++] = Tt);
      }
      return lt;
    }
    function _e(u, p) {
      for (var _ = -1, L = p.length, vt = u.length; ++_ < L; )
        u[vt + _] = p[_];
      return u;
    }
    function Le(u, p) {
      for (var _ = -1, L = u == null ? 0 : u.length; ++_ < L; )
        if (p(u[_], _, u))
          return !0;
      return !1;
    }
    function ss(u, p) {
      for (var _ = -1, L = Array(u); ++_ < u; )
        L[_] = p(_);
      return L;
    }
    function ns(u) {
      return function(p) {
        return u(p);
      };
    }
    function Zt(u, p) {
      return u.has(p);
    }
    function oe(u, p) {
      return u?.[p];
    }
    function Ee(u) {
      var p = -1, _ = Array(u.size);
      return u.forEach(function(L, vt) {
        _[++p] = [vt, L];
      }), _;
    }
    function Ht(u, p) {
      return function(_) {
        return u(p(_));
      };
    }
    function xt(u) {
      var p = -1, _ = Array(u.size);
      return u.forEach(function(L) {
        _[++p] = L;
      }), _;
    }
    var at = Array.prototype, ct = Function.prototype, _t = Object.prototype, Et = tt["__core-js_shared__"], Jt = ct.toString, kt = _t.hasOwnProperty, Wt = (function() {
      var u = /[^.]+$/.exec(Et && Et.keys && Et.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    })(), zt = _t.toString, Kt = RegExp(
      "^" + Jt.call(kt).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Mt = R ? tt.Buffer : void 0, St = tt.Symbol, qt = tt.Uint8Array, Rt = _t.propertyIsEnumerable, Lt = at.splice, Ct = St ? St.toStringTag : void 0, Bt = Object.getOwnPropertySymbols, Pt = Mt ? Mt.isBuffer : void 0, It = Ht(Object.keys, Object), Vt = rs(tt, "DataView"), $t = rs(tt, "Map"), jt = rs(tt, "Promise"), Ut = rs(tt, "Set"), Un = rs(tt, "WeakMap"), Es = rs(Object, "create"), Oi = ae(Vt), is = ae($t), qr = ae(jt), Pr = ae(Ut), Vr = ae(Un), ki = St ? St.prototype : void 0, Hn = ki ? ki.valueOf : void 0;
    function Qt(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function jr() {
      this.__data__ = Es ? Es(null) : {}, this.size = 0;
    }
    function Ur(u) {
      var p = this.has(u) && delete this.__data__[u];
      return this.size -= p ? 1 : 0, p;
    }
    function Hr(u) {
      var p = this.__data__;
      if (Es) {
        var _ = p[u];
        return _ === n ? void 0 : _;
      }
      return kt.call(p, u) ? p[u] : void 0;
    }
    function Wr(u) {
      var p = this.__data__;
      return Es ? p[u] !== void 0 : kt.call(p, u);
    }
    function zr(u, p) {
      var _ = this.__data__;
      return this.size += this.has(u) ? 0 : 1, _[u] = Es && p === void 0 ? n : p, this;
    }
    Qt.prototype.clear = jr, Qt.prototype.delete = Ur, Qt.prototype.get = Hr, Qt.prototype.has = Wr, Qt.prototype.set = zr;
    function se(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Kr() {
      this.__data__ = [], this.size = 0;
    }
    function Gr(u) {
      var p = this.__data__, _ = un(p, u);
      if (_ < 0)
        return !1;
      var L = p.length - 1;
      return _ == L ? p.pop() : Lt.call(p, _, 1), --this.size, !0;
    }
    function Yr(u) {
      var p = this.__data__, _ = un(p, u);
      return _ < 0 ? void 0 : p[_][1];
    }
    function Xr(u) {
      return un(this.__data__, u) > -1;
    }
    function Zr(u, p) {
      var _ = this.__data__, L = un(_, u);
      return L < 0 ? (++this.size, _.push([u, p])) : _[L][1] = p, this;
    }
    se.prototype.clear = Kr, se.prototype.delete = Gr, se.prototype.get = Yr, se.prototype.has = Xr, se.prototype.set = Zr;
    function de(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Jr() {
      this.size = 0, this.__data__ = {
        hash: new Qt(),
        map: new ($t || se)(),
        string: new Qt()
      };
    }
    function Qr(u) {
      var p = Ie(this, u).delete(u);
      return this.size -= p ? 1 : 0, p;
    }
    function to(u) {
      return Ie(this, u).get(u);
    }
    function eo(u) {
      return Ie(this, u).has(u);
    }
    function so(u, p) {
      var _ = Ie(this, u), L = _.size;
      return _.set(u, p), this.size += _.size == L ? 0 : 1, this;
    }
    de.prototype.clear = Jr, de.prototype.delete = Qr, de.prototype.get = to, de.prototype.has = eo, de.prototype.set = so;
    function ln(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.__data__ = new de(); ++p < _; )
        this.add(u[p]);
    }
    function Ni(u) {
      return this.__data__.set(u, n), this;
    }
    function cn(u) {
      return this.__data__.has(u);
    }
    ln.prototype.add = ln.prototype.push = Ni, ln.prototype.has = cn;
    function We(u) {
      var p = this.__data__ = new se(u);
      this.size = p.size;
    }
    function Wn() {
      this.__data__ = new se(), this.size = 0;
    }
    function no(u) {
      var p = this.__data__, _ = p.delete(u);
      return this.size = p.size, _;
    }
    function io(u) {
      return this.__data__.get(u);
    }
    function ro(u) {
      return this.__data__.has(u);
    }
    function oo(u, p) {
      var _ = this.__data__;
      if (_ instanceof se) {
        var L = _.__data__;
        if (!$t || L.length < s - 1)
          return L.push([u, p]), this.size = ++_.size, this;
        _ = this.__data__ = new de(L);
      }
      return _.set(u, p), this.size = _.size, this;
    }
    We.prototype.clear = Wn, We.prototype.delete = no, We.prototype.get = io, We.prototype.has = ro, We.prototype.set = oo;
    function ao(u, p) {
      var _ = hn(u), L = !_ && Di(u), vt = !_ && !L && dn(u), lt = !_ && !L && !vt && Bi(u), Tt = _ || L || vt || lt, At = Tt ? ss(u.length, String) : [], Gt = At.length;
      for (var Ft in u)
        kt.call(u, Ft) && !(Tt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ft == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        vt && (Ft == "offset" || Ft == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        lt && (Ft == "buffer" || Ft == "byteLength" || Ft == "byteOffset") || // Skip index properties.
        mo(Ft, Gt))) && At.push(Ft);
      return At;
    }
    function un(u, p) {
      for (var _ = u.length; _--; )
        if ($i(u[_][0], p))
          return _;
      return -1;
    }
    function zn(u, p, _) {
      var L = p(u);
      return hn(u) ? L : _e(L, _(u));
    }
    function Rs(u) {
      return u == null ? u === void 0 ? C : I : Ct && Ct in Object(u) ? os(u) : Ii(u);
    }
    function Si(u) {
      return Ke(u) && Rs(u) == a;
    }
    function Li(u, p, _, L, vt) {
      return u === p ? !0 : u == null || p == null || !Ke(u) && !Ke(p) ? u !== u && p !== p : lo(u, p, _, L, Li, vt);
    }
    function lo(u, p, _, L, vt, lt) {
      var Tt = hn(u), At = hn(p), Gt = Tt ? l : ze(u), Ft = At ? l : ze(p);
      Gt = Gt == a ? j : Gt, Ft = Ft == a ? j : Ft;
      var ne = Gt == j, fe = Ft == j, Xt = Gt == Ft;
      if (Xt && dn(u)) {
        if (!dn(p))
          return !1;
        Tt = !0, ne = !1;
      }
      if (Xt && !ne)
        return lt || (lt = new We()), Tt || Bi(u) ? Kn(u, p, _, L, vt, lt) : fo(u, p, Gt, _, L, vt, lt);
      if (!(_ & i)) {
        var ie = ne && kt.call(u, "__wrapped__"), te = fe && kt.call(p, "__wrapped__");
        if (ie || te) {
          var ws = ie ? u.value() : u, as = te ? p.value() : p;
          return lt || (lt = new We()), vt(ws, as, _, L, lt);
        }
      }
      return Xt ? (lt || (lt = new We()), po(u, p, _, L, vt, lt)) : !1;
    }
    function co(u) {
      if (!Ri(u) || yo(u))
        return !1;
      var p = Mi(u) ? Kt : rt;
      return p.test(ae(u));
    }
    function uo(u) {
      return Ke(u) && Yn(u.length) && !!H[Rs(u)];
    }
    function ho(u) {
      if (!vo(u))
        return It(u);
      var p = [];
      for (var _ in Object(u))
        kt.call(u, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function Kn(u, p, _, L, vt, lt) {
      var Tt = _ & i, At = u.length, Gt = p.length;
      if (At != Gt && !(Tt && Gt > At))
        return !1;
      var Ft = lt.get(u);
      if (Ft && lt.get(p))
        return Ft == p;
      var ne = -1, fe = !0, Xt = _ & r ? new ln() : void 0;
      for (lt.set(u, p), lt.set(p, u); ++ne < At; ) {
        var ie = u[ne], te = p[ne];
        if (L)
          var ws = Tt ? L(te, ie, ne, p, u, lt) : L(ie, te, ne, u, p, lt);
        if (ws !== void 0) {
          if (ws)
            continue;
          fe = !1;
          break;
        }
        if (Xt) {
          if (!Le(p, function(as, qs) {
            if (!Zt(Xt, qs) && (ie === as || vt(ie, as, _, L, lt)))
              return Xt.push(qs);
          })) {
            fe = !1;
            break;
          }
        } else if (!(ie === te || vt(ie, te, _, L, lt))) {
          fe = !1;
          break;
        }
      }
      return lt.delete(u), lt.delete(p), fe;
    }
    function fo(u, p, _, L, vt, lt, Tt) {
      switch (_) {
        case x:
          if (u.byteLength != p.byteLength || u.byteOffset != p.byteOffset)
            return !1;
          u = u.buffer, p = p.buffer;
        case y:
          return !(u.byteLength != p.byteLength || !lt(new qt(u), new qt(p)));
        case d:
        case h:
        case k:
          return $i(+u, +p);
        case m:
          return u.name == p.name && u.message == p.message;
        case G:
        case dt:
          return u == p + "";
        case F:
          var At = Ee;
        case X:
          var Gt = L & i;
          if (At || (At = xt), u.size != p.size && !Gt)
            return !1;
          var Ft = Tt.get(u);
          if (Ft)
            return Ft == p;
          L |= r, Tt.set(u, p);
          var ne = Kn(At(u), At(p), L, vt, lt, Tt);
          return Tt.delete(u), ne;
        case ft:
          if (Hn)
            return Hn.call(u) == Hn.call(p);
      }
      return !1;
    }
    function po(u, p, _, L, vt, lt) {
      var Tt = _ & i, At = Bs(u), Gt = At.length, Ft = Bs(p), ne = Ft.length;
      if (Gt != ne && !Tt)
        return !1;
      for (var fe = Gt; fe--; ) {
        var Xt = At[fe];
        if (!(Tt ? Xt in p : kt.call(p, Xt)))
          return !1;
      }
      var ie = lt.get(u);
      if (ie && lt.get(p))
        return ie == p;
      var te = !0;
      lt.set(u, p), lt.set(p, u);
      for (var ws = Tt; ++fe < Gt; ) {
        Xt = At[fe];
        var as = u[Xt], qs = p[Xt];
        if (L)
          var dl = Tt ? L(qs, as, Xt, p, u, lt) : L(as, qs, Xt, u, p, lt);
        if (!(dl === void 0 ? as === qs || vt(as, qs, _, L, lt) : dl)) {
          te = !1;
          break;
        }
        ws || (ws = Xt == "constructor");
      }
      if (te && !ws) {
        var qi = u.constructor, Pi = p.constructor;
        qi != Pi && "constructor" in u && "constructor" in p && !(typeof qi == "function" && qi instanceof qi && typeof Pi == "function" && Pi instanceof Pi) && (te = !1);
      }
      return lt.delete(u), lt.delete(p), te;
    }
    function Bs(u) {
      return zn(u, Xn, go);
    }
    function Ie(u, p) {
      var _ = u.__data__;
      return bo(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function rs(u, p) {
      var _ = oe(u, p);
      return co(_) ? _ : void 0;
    }
    function os(u) {
      var p = kt.call(u, Ct), _ = u[Ct];
      try {
        u[Ct] = void 0;
        var L = !0;
      } catch {
      }
      var vt = zt.call(u);
      return L && (p ? u[Ct] = _ : delete u[Ct]), vt;
    }
    var go = Bt ? function(u) {
      return u == null ? [] : (u = Object(u), Dt(Bt(u), function(p) {
        return Rt.call(u, p);
      }));
    } : Eo, ze = Rs;
    (Vt && ze(new Vt(new ArrayBuffer(1))) != x || $t && ze(new $t()) != F || jt && ze(jt.resolve()) != W || Ut && ze(new Ut()) != X || Un && ze(new Un()) != P) && (ze = function(u) {
      var p = Rs(u), _ = p == j ? u.constructor : void 0, L = _ ? ae(_) : "";
      if (L)
        switch (L) {
          case Oi:
            return x;
          case is:
            return F;
          case qr:
            return W;
          case Pr:
            return X;
          case Vr:
            return P;
        }
      return p;
    });
    function mo(u, p) {
      return p = p ?? o, !!p && (typeof u == "number" || nt.test(u)) && u > -1 && u % 1 == 0 && u < p;
    }
    function bo(u) {
      var p = typeof u;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
    }
    function yo(u) {
      return !!Wt && Wt in u;
    }
    function vo(u) {
      var p = u && u.constructor, _ = typeof p == "function" && p.prototype || _t;
      return u === _;
    }
    function Ii(u) {
      return zt.call(u);
    }
    function ae(u) {
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
    function $i(u, p) {
      return u === p || u !== u && p !== p;
    }
    var Di = Si(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Si : function(u) {
      return Ke(u) && kt.call(u, "callee") && !Rt.call(u, "callee");
    }, hn = Array.isArray;
    function Gn(u) {
      return u != null && Yn(u.length) && !Mi(u);
    }
    var dn = Pt || wo;
    function _o(u, p) {
      return Li(u, p);
    }
    function Mi(u) {
      if (!Ri(u))
        return !1;
      var p = Rs(u);
      return p == v || p == E || p == c || p == Y;
    }
    function Yn(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
    }
    function Ri(u) {
      var p = typeof u;
      return u != null && (p == "object" || p == "function");
    }
    function Ke(u) {
      return u != null && typeof u == "object";
    }
    var Bi = J ? ns(J) : uo;
    function Xn(u) {
      return Gn(u) ? ao(u) : ho(u);
    }
    function Eo() {
      return [];
    }
    function wo() {
      return !1;
    }
    e.exports = _o;
  })(ii, ii.exports)), ii.exports;
}
var Xi = {}, Fc;
function t_() {
  if (Fc) return Xi;
  Fc = 1, Object.defineProperty(Xi, "__esModule", { value: !0 });
  const e = Bh(), t = qh();
  var s;
  return (function(n) {
    function i(l = {}, c = {}, d = !1) {
      typeof l != "object" && (l = {}), typeof c != "object" && (c = {});
      let h = e(c);
      d || (h = Object.keys(h).reduce((m, v) => (h[v] != null && (m[v] = h[v]), m), {}));
      for (const m in l)
        l[m] !== void 0 && c[m] === void 0 && (h[m] = l[m]);
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.compose = i;
    function r(l = {}, c = {}) {
      typeof l != "object" && (l = {}), typeof c != "object" && (c = {});
      const d = Object.keys(l).concat(Object.keys(c)).reduce((h, m) => (t(l[m], c[m]) || (h[m] = c[m] === void 0 ? null : c[m]), h), {});
      return Object.keys(d).length > 0 ? d : void 0;
    }
    n.diff = r;
    function o(l = {}, c = {}) {
      l = l || {};
      const d = Object.keys(c).reduce((h, m) => (c[m] !== l[m] && l[m] !== void 0 && (h[m] = c[m]), h), {});
      return Object.keys(l).reduce((h, m) => (l[m] !== c[m] && c[m] === void 0 && (h[m] = null), h), d);
    }
    n.invert = o;
    function a(l, c, d = !1) {
      if (typeof l != "object")
        return c;
      if (typeof c != "object")
        return;
      if (!d)
        return c;
      const h = Object.keys(c).reduce((m, v) => (l[v] === void 0 && (m[v] = c[v]), m), {});
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.transform = a;
  })(s || (s = {})), Xi.default = s, Xi;
}
var Zi = {}, xc;
function Ph() {
  if (xc) return Zi;
  xc = 1, Object.defineProperty(Zi, "__esModule", { value: !0 });
  var e;
  return (function(t) {
    function s(n) {
      return typeof n.delete == "number" ? n.delete : typeof n.retain == "number" ? n.retain : typeof n.retain == "object" && n.retain !== null ? 1 : typeof n.insert == "string" ? n.insert.length : 1;
    }
    t.length = s;
  })(e || (e = {})), Zi.default = e, Zi;
}
var Ji = {}, Cc;
function e_() {
  if (Cc) return Ji;
  Cc = 1, Object.defineProperty(Ji, "__esModule", { value: !0 });
  const e = Ph();
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
  return Ji.default = t, Ji;
}
var Oc;
function s_() {
  return Oc || (Oc = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
    const s = Qv(), n = Bh(), i = qh(), r = t_();
    t.AttributeMap = r.default;
    const o = Ph();
    t.Op = o.default;
    const a = e_();
    t.OpIterator = a.default;
    const l = "\0", c = (h, m) => {
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      if (typeof m != "object" || m === null)
        throw new Error(`cannot retain a ${typeof m}`);
      const v = Object.keys(h)[0];
      if (!v || v !== Object.keys(m)[0])
        throw new Error(`embed types not matched: ${v} != ${Object.keys(m)[0]}`);
      return [v, h[v], m[v]];
    };
    class d {
      constructor(m) {
        Array.isArray(m) ? this.ops = m : m != null && Array.isArray(m.ops) ? this.ops = m.ops : this.ops = [];
      }
      static registerEmbed(m, v) {
        this.handlers[m] = v;
      }
      static unregisterEmbed(m) {
        delete this.handlers[m];
      }
      static getHandler(m) {
        const v = this.handlers[m];
        if (!v)
          throw new Error(`no handlers for embed type "${m}"`);
        return v;
      }
      insert(m, v) {
        const E = {};
        return typeof m == "string" && m.length === 0 ? this : (E.insert = m, v != null && typeof v == "object" && Object.keys(v).length > 0 && (E.attributes = v), this.push(E));
      }
      delete(m) {
        return m <= 0 ? this : this.push({ delete: m });
      }
      retain(m, v) {
        if (typeof m == "number" && m <= 0)
          return this;
        const E = { retain: m };
        return v != null && typeof v == "object" && Object.keys(v).length > 0 && (E.attributes = v), this.push(E);
      }
      push(m) {
        let v = this.ops.length, E = this.ops[v - 1];
        if (m = n(m), typeof E == "object") {
          if (typeof m.delete == "number" && typeof E.delete == "number")
            return this.ops[v - 1] = { delete: E.delete + m.delete }, this;
          if (typeof E.delete == "number" && m.insert != null && (v -= 1, E = this.ops[v - 1], typeof E != "object"))
            return this.ops.unshift(m), this;
          if (i(m.attributes, E.attributes)) {
            if (typeof m.insert == "string" && typeof E.insert == "string")
              return this.ops[v - 1] = { insert: E.insert + m.insert }, typeof m.attributes == "object" && (this.ops[v - 1].attributes = m.attributes), this;
            if (typeof m.retain == "number" && typeof E.retain == "number")
              return this.ops[v - 1] = { retain: E.retain + m.retain }, typeof m.attributes == "object" && (this.ops[v - 1].attributes = m.attributes), this;
          }
        }
        return v === this.ops.length ? this.ops.push(m) : this.ops.splice(v, 0, m), this;
      }
      chop() {
        const m = this.ops[this.ops.length - 1];
        return m && typeof m.retain == "number" && !m.attributes && this.ops.pop(), this;
      }
      filter(m) {
        return this.ops.filter(m);
      }
      forEach(m) {
        this.ops.forEach(m);
      }
      map(m) {
        return this.ops.map(m);
      }
      partition(m) {
        const v = [], E = [];
        return this.forEach((F) => {
          (m(F) ? v : E).push(F);
        }), [v, E];
      }
      reduce(m, v) {
        return this.ops.reduce(m, v);
      }
      changeLength() {
        return this.reduce((m, v) => v.insert ? m + o.default.length(v) : v.delete ? m - v.delete : m, 0);
      }
      length() {
        return this.reduce((m, v) => m + o.default.length(v), 0);
      }
      slice(m = 0, v = 1 / 0) {
        const E = [], F = new a.default(this.ops);
        let k = 0;
        for (; k < v && F.hasNext(); ) {
          let I;
          k < m ? I = F.next(m - k) : (I = F.next(v - k), E.push(I)), k += o.default.length(I);
        }
        return new d(E);
      }
      compose(m) {
        const v = new a.default(this.ops), E = new a.default(m.ops), F = [], k = E.peek();
        if (k != null && typeof k.retain == "number" && k.attributes == null) {
          let j = k.retain;
          for (; v.peekType() === "insert" && v.peekLength() <= j; )
            j -= v.peekLength(), F.push(v.next());
          k.retain - j > 0 && E.next(k.retain - j);
        }
        const I = new d(F);
        for (; v.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            I.push(E.next());
          else if (v.peekType() === "delete")
            I.push(v.next());
          else {
            const j = Math.min(v.peekLength(), E.peekLength()), W = v.next(j), Y = E.next(j);
            if (Y.retain) {
              const G = {};
              if (typeof W.retain == "number")
                G.retain = typeof Y.retain == "number" ? j : Y.retain;
              else if (typeof Y.retain == "number")
                W.retain == null ? G.insert = W.insert : G.retain = W.retain;
              else {
                const dt = W.retain == null ? "insert" : "retain", [ft, C, P] = c(W[dt], Y.retain), y = d.getHandler(ft);
                G[dt] = {
                  [ft]: y.compose(C, P, dt === "retain")
                };
              }
              const X = r.default.compose(W.attributes, Y.attributes, typeof W.retain == "number");
              if (X && (G.attributes = X), I.push(G), !E.hasNext() && i(I.ops[I.ops.length - 1], G)) {
                const dt = new d(v.rest());
                return I.concat(dt).chop();
              }
            } else typeof Y.delete == "number" && (typeof W.retain == "number" || typeof W.retain == "object" && W.retain !== null) && I.push(Y);
          }
        return I.chop();
      }
      concat(m) {
        const v = new d(this.ops.slice());
        return m.ops.length > 0 && (v.push(m.ops[0]), v.ops = v.ops.concat(m.ops.slice(1))), v;
      }
      diff(m, v) {
        if (this.ops === m.ops)
          return new d();
        const E = [this, m].map((W) => W.map((Y) => {
          if (Y.insert != null)
            return typeof Y.insert == "string" ? Y.insert : l;
          const G = W === m ? "on" : "with";
          throw new Error("diff() called " + G + " non-document");
        }).join("")), F = new d(), k = s(E[0], E[1], v, !0), I = new a.default(this.ops), j = new a.default(m.ops);
        return k.forEach((W) => {
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
                const X = I.next(G), dt = j.next(G);
                i(X.insert, dt.insert) ? F.retain(G, r.default.diff(X.attributes, dt.attributes)) : F.push(dt).delete(G);
                break;
            }
            Y -= G;
          }
        }), F.chop();
      }
      eachLine(m, v = `
`) {
        const E = new a.default(this.ops);
        let F = new d(), k = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const I = E.peek(), j = o.default.length(I) - E.peekLength(), W = typeof I.insert == "string" ? I.insert.indexOf(v, j) - j : -1;
          if (W < 0)
            F.push(E.next());
          else if (W > 0)
            F.push(E.next(W));
          else {
            if (m(F, E.next(1).attributes || {}, k) === !1)
              return;
            k += 1, F = new d();
          }
        }
        F.length() > 0 && m(F, {}, k);
      }
      invert(m) {
        const v = new d();
        return this.reduce((E, F) => {
          if (F.insert)
            v.delete(o.default.length(F));
          else {
            if (typeof F.retain == "number" && F.attributes == null)
              return v.retain(F.retain), E + F.retain;
            if (F.delete || typeof F.retain == "number") {
              const k = F.delete || F.retain;
              return m.slice(E, E + k).forEach((j) => {
                F.delete ? v.push(j) : F.retain && F.attributes && v.retain(o.default.length(j), r.default.invert(F.attributes, j.attributes));
              }), E + k;
            } else if (typeof F.retain == "object" && F.retain !== null) {
              const k = m.slice(E, E + 1), I = new a.default(k.ops).next(), [j, W, Y] = c(F.retain, I.insert), G = d.getHandler(j);
              return v.retain({ [j]: G.invert(W, Y) }, r.default.invert(F.attributes, I.attributes)), E + 1;
            }
          }
          return E;
        }, 0), v.chop();
      }
      transform(m, v = !1) {
        if (v = !!v, typeof m == "number")
          return this.transformPosition(m, v);
        const E = m, F = new a.default(this.ops), k = new a.default(E.ops), I = new d();
        for (; F.hasNext() || k.hasNext(); )
          if (F.peekType() === "insert" && (v || k.peekType() !== "insert"))
            I.retain(o.default.length(F.next()));
          else if (k.peekType() === "insert")
            I.push(k.next());
          else {
            const j = Math.min(F.peekLength(), k.peekLength()), W = F.next(j), Y = k.next(j);
            if (W.delete)
              continue;
            if (Y.delete)
              I.push(Y);
            else {
              const G = W.retain, X = Y.retain;
              let dt = typeof X == "object" && X !== null ? X : j;
              if (typeof G == "object" && G !== null && typeof X == "object" && X !== null) {
                const ft = Object.keys(G)[0];
                if (ft === Object.keys(X)[0]) {
                  const C = d.getHandler(ft);
                  C && (dt = {
                    [ft]: C.transform(G[ft], X[ft], v)
                  });
                }
              }
              I.retain(dt, r.default.transform(W.attributes, Y.attributes, v));
            }
          }
        return I.chop();
      }
      transformPosition(m, v = !1) {
        v = !!v;
        const E = new a.default(this.ops);
        let F = 0;
        for (; E.hasNext() && F <= m; ) {
          const k = E.peekLength(), I = E.peekType();
          if (E.next(), I === "delete") {
            m -= Math.min(k, m - F);
            continue;
          } else I === "insert" && (F < m || !v) && (m += k);
          F += k;
        }
        return m;
      }
    }
    d.Op = o.default, d.OpIterator = a.default, d.AttributeMap = r.default, d.handlers = {}, t.default = d, e.exports = d, e.exports.default = d;
  })(Yi, Yi.exports)), Yi.exports;
}
var xe = s_();
const it = /* @__PURE__ */ Rh(xe);
class He extends ve {
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
He.blotName = "break";
He.tagName = "BR";
let Ve = class extends vr {
};
const n_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Mr(e) {
  return e.replace(/[&<>"']/g, (t) => n_[t]);
}
class le extends Qa {
  static allowedChildren = [le, He, ve, Ve];
  // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
  static order = [
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
  ];
  static compare(t, s) {
    const n = le.order.indexOf(t), i = le.order.indexOf(s);
    return n >= 0 || i >= 0 ? n - i : t === s ? 0 : t < s ? -1 : 1;
  }
  formatAt(t, s, n, i) {
    if (le.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, ot.BLOT)) {
      const r = this.isolate(t, s);
      i && r.wrap(n, i);
    } else
      super.formatAt(t, s, n, i);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof le && le.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const s = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(s), s.wrap(this);
    }
  }
}
const kc = 1;
class ee extends gi {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = Vh(this)), this.cache.delta;
  }
  deleteAt(t, s) {
    super.deleteAt(t, s), this.cache = {};
  }
  formatAt(t, s, n, i) {
    s <= 0 || (this.scroll.query(n, ot.BLOCK) ? t + s === this.length() && this.format(n, i) : super.formatAt(t, Math.min(s, this.length() - t - 1), n, i), this.cache = {});
  }
  insertAt(t, s, n) {
    if (n != null) {
      super.insertAt(t, s, n), this.cache = {};
      return;
    }
    if (s.length === 0) return;
    const i = s.split(`
`), r = i.shift();
    r.length > 0 && (t < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(t, this.length() - 1), r) : this.children.tail.insertAt(this.children.tail.length(), r), this.cache = {});
    let o = this;
    i.reduce((a, l) => (o = o.split(a, !0), o.insertAt(0, l), l.length), t + r.length);
  }
  insertBefore(t, s) {
    const {
      head: n
    } = this.children;
    super.insertBefore(t, s), n instanceof He && n.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + kc), this.cache.length;
  }
  moveChildren(t, s) {
    super.moveChildren(t, s), this.cache = {};
  }
  optimize(t) {
    super.optimize(t), this.cache = {};
  }
  path(t) {
    return super.path(t, !0);
  }
  removeChild(t) {
    super.removeChild(t), this.cache = {};
  }
  split(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (s && (t === 0 || t >= this.length() - kc)) {
      const i = this.clone();
      return t === 0 ? (this.parent.insertBefore(i, this), this) : (this.parent.insertBefore(i, this.next), i);
    }
    const n = super.split(t, s);
    return this.cache = {}, n;
  }
}
ee.blotName = "block";
ee.tagName = "P";
ee.defaultChild = He;
ee.allowedChildren = [He, le, ve, Ve];
class Fe extends ve {
  attach() {
    super.attach(), this.attributes = new $r(this.domNode);
  }
  delta() {
    return new it().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, s) {
    const n = this.scroll.query(t, ot.BLOCK_ATTRIBUTE);
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
      const c = this.scroll.create(ee.blotName);
      return c.insertAt(0, l), c;
    }), a = this.split(t);
    o.forEach((l) => {
      this.parent.insertBefore(l, a);
    }), r && this.parent.insertBefore(this.scroll.create("text", r), a);
  }
}
Fe.scope = ot.BLOCK_BLOT;
function Vh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.descendants(re).reduce((s, n) => n.length() === 0 ? s : s.insert(n.value(), Ae(n, {}, t)), new it()).insert(`
`, Ae(e));
}
function Ae(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return e == null || ("formats" in e && typeof e.formats == "function" && (t = {
    ...t,
    ...e.formats()
  }, s && delete t["code-token"]), e.parent == null || e.parent.statics.blotName === "scroll" || e.parent.statics.scope !== e.statics.scope) ? t : Ae(e.parent, t, s);
}
class Me extends ve {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(t, s, n) {
    super(t, s), this.selection = n, this.textNode = document.createTextNode(Me.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    for (; n != null && n.statics.scope !== ot.BLOCK_BLOT; )
      i += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = Me.CONTENTS.length, n.optimize(), n.formatAt(i, Me.CONTENTS.length, t, s), this.savedLength = 0);
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
    const s = this.prev instanceof Ve ? this.prev : null, n = s ? s.length() : 0, i = this.next instanceof Ve ? this.next : null, r = i ? i.text : "", {
      textNode: o
    } = this, a = o.data.split(Me.CONTENTS).join("");
    o.data = Me.CONTENTS;
    let l;
    if (s)
      l = s, (a || i) && (s.insertAt(s.length(), a + r), i && i.remove());
    else if (i)
      l = i, i.insertAt(0, a);
    else {
      const c = document.createTextNode(a);
      l = this.scroll.create(c), this.parent.insertBefore(l, this);
    }
    if (this.remove(), t) {
      const c = (m, v) => s && m === s.domNode ? v : m === o ? n + v - 1 : i && m === i.domNode ? n + a.length + v : null, d = c(t.start.node, t.start.offset), h = c(t.end.node, t.end.offset);
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
        this.savedLength = Me.CONTENTS.length, s.isolate(this.offset(s), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      s = s.parent;
    }
  }
  value() {
    return "";
  }
}
var Ho = { exports: {} }, Nc;
function i_() {
  return Nc || (Nc = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, s = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (s = !1));
    function i(l, c, d) {
      this.fn = l, this.context = c, this.once = d || !1;
    }
    function r(l, c, d, h, m) {
      if (typeof d != "function")
        throw new TypeError("The listener must be a function");
      var v = new i(d, h || l, m), E = s ? s + c : c;
      return l._events[E] ? l._events[E].fn ? l._events[E] = [l._events[E], v] : l._events[E].push(v) : (l._events[E] = v, l._eventsCount++), l;
    }
    function o(l, c) {
      --l._eventsCount === 0 ? l._events = new n() : delete l._events[c];
    }
    function a() {
      this._events = new n(), this._eventsCount = 0;
    }
    a.prototype.eventNames = function() {
      var c = [], d, h;
      if (this._eventsCount === 0) return c;
      for (h in d = this._events)
        t.call(d, h) && c.push(s ? h.slice(1) : h);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
    }, a.prototype.listeners = function(c) {
      var d = s ? s + c : c, h = this._events[d];
      if (!h) return [];
      if (h.fn) return [h.fn];
      for (var m = 0, v = h.length, E = new Array(v); m < v; m++)
        E[m] = h[m].fn;
      return E;
    }, a.prototype.listenerCount = function(c) {
      var d = s ? s + c : c, h = this._events[d];
      return h ? h.fn ? 1 : h.length : 0;
    }, a.prototype.emit = function(c, d, h, m, v, E) {
      var F = s ? s + c : c;
      if (!this._events[F]) return !1;
      var k = this._events[F], I = arguments.length, j, W;
      if (k.fn) {
        switch (k.once && this.removeListener(c, k.fn, void 0, !0), I) {
          case 1:
            return k.fn.call(k.context), !0;
          case 2:
            return k.fn.call(k.context, d), !0;
          case 3:
            return k.fn.call(k.context, d, h), !0;
          case 4:
            return k.fn.call(k.context, d, h, m), !0;
          case 5:
            return k.fn.call(k.context, d, h, m, v), !0;
          case 6:
            return k.fn.call(k.context, d, h, m, v, E), !0;
        }
        for (W = 1, j = new Array(I - 1); W < I; W++)
          j[W - 1] = arguments[W];
        k.fn.apply(k.context, j);
      } else {
        var Y = k.length, G;
        for (W = 0; W < Y; W++)
          switch (k[W].once && this.removeListener(c, k[W].fn, void 0, !0), I) {
            case 1:
              k[W].fn.call(k[W].context);
              break;
            case 2:
              k[W].fn.call(k[W].context, d);
              break;
            case 3:
              k[W].fn.call(k[W].context, d, h);
              break;
            case 4:
              k[W].fn.call(k[W].context, d, h, m);
              break;
            default:
              if (!j) for (G = 1, j = new Array(I - 1); G < I; G++)
                j[G - 1] = arguments[G];
              k[W].fn.apply(k[W].context, j);
          }
      }
      return !0;
    }, a.prototype.on = function(c, d, h) {
      return r(this, c, d, h, !1);
    }, a.prototype.once = function(c, d, h) {
      return r(this, c, d, h, !0);
    }, a.prototype.removeListener = function(c, d, h, m) {
      var v = s ? s + c : c;
      if (!this._events[v]) return this;
      if (!d)
        return o(this, v), this;
      var E = this._events[v];
      if (E.fn)
        E.fn === d && (!m || E.once) && (!h || E.context === h) && o(this, v);
      else {
        for (var F = 0, k = [], I = E.length; F < I; F++)
          (E[F].fn !== d || m && !E[F].once || h && E[F].context !== h) && k.push(E[F]);
        k.length ? this._events[v] = k.length === 1 ? k[0] : k : o(this, v);
      }
      return this;
    }, a.prototype.removeAllListeners = function(c) {
      var d;
      return c ? (d = s ? s + c : c, this._events[d] && o(this, d)) : (this._events = new n(), this._eventsCount = 0), this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = s, a.EventEmitter = a, e.exports = a;
  })(Ho)), Ho.exports;
}
var r_ = i_();
const o_ = /* @__PURE__ */ Rh(r_), Ea = /* @__PURE__ */ new WeakMap(), wa = ["error", "warn", "log", "info"];
let Aa = "warn";
function jh(e) {
  if (Aa && wa.indexOf(e) <= wa.indexOf(Aa)) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    console[e](...s);
  }
}
function _s(e) {
  return wa.reduce((t, s) => (t[s] = jh.bind(console, s, e), t), {});
}
_s.level = (e) => {
  Aa = e;
};
jh.level = _s.level;
const Wo = _s("quill:events"), a_ = ["selectionchange", "mousedown", "mouseup", "click"];
a_.forEach((e) => {
  document.addEventListener(e, function() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = Ea.get(i);
      r && r.emitter && r.emitter.handleDOM(...s);
    });
  });
});
class st extends o_ {
  static events = {
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
  };
  static sources = {
    API: "api",
    SILENT: "silent",
    USER: "user"
  };
  constructor() {
    super(), this.domListeners = {}, this.on("error", Wo.error);
  }
  emit() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    return Wo.log.call(Wo, ...s), super.emit(...s);
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
const zo = _s("quill:selection");
class Xs {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = s;
  }
}
class l_ {
  constructor(t, s) {
    this.emitter = s, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Xs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, st.sources.USER), 1);
    }), this.emitter.on(st.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(st.events.SCROLL_UPDATE, (i, r) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = r.some((a) => a.type === "characterData" || a.type === "childList" || a.type === "attributes" && a.target === this.root);
          this.update(o ? st.sources.SILENT : i);
        } catch {
        }
      });
    }), this.emitter.on(st.events.SCROLL_OPTIMIZE, (n, i) => {
      if (i.range) {
        const {
          startNode: r,
          startOffset: o,
          endNode: a,
          endOffset: l
        } = i.range;
        this.setNativeRange(r, o, a, l), this.update(st.sources.SILENT);
      }
    }), this.update(st.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(st.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(st.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(st.sources.USER);
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
    if (!(n == null || !n.native.collapsed || this.scroll.query(t, ot.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const i = this.scroll.find(n.start.node, !1);
        if (i == null) return;
        if (i instanceof re) {
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
        const [h] = this.scroll.line(t), [m] = this.scroll.line(t + 1);
        h === m && (r = d, o = 0);
      }
    }
    [i, o] = r.position(o, !0);
    const a = document.createRange();
    if (s > 0)
      return a.setStart(i, o), [r, o] = this.scroll.leaf(t + s), r == null ? null : ([i, o] = r.position(o, !0), a.setEnd(i, o), a.getBoundingClientRect());
    let l = "left", c;
    if (i instanceof Text) {
      if (!i.data.length)
        return null;
      o < i.data.length ? (a.setStart(i, o), a.setEnd(i, o + 1)) : (a.setStart(i, o - 1), a.setEnd(i, o), l = "right"), c = a.getBoundingClientRect();
    } else {
      if (!(r.domNode instanceof Element)) return null;
      c = r.domNode.getBoundingClientRect(), o > 0 && (l = "right");
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
    return zo.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const s = this.getNativeRange();
    return s == null ? [null, null] : [this.normalizedToRange(s), s];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && Ko(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const s = [[t.start.node, t.start.offset]];
    t.native.collapsed || s.push([t.end.node, t.end.offset]);
    const n = s.map((o) => {
      const [a, l] = o, c = this.scroll.find(a, !0), d = c.offset(this.scroll);
      return l === 0 ? d : c instanceof re ? d + c.index(a, l) : d + c.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Xs(r, i - r);
  }
  normalizeNative(t) {
    if (!Ko(this.root, t.startContainer) || !t.collapsed && !Ko(this.root, t.endContainer))
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
    if (zo.info("setNativeRange", t, s, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
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
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : st.sources.API;
    if (typeof s == "string" && (n = s, s = !1), zo.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, s);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st.sources.USER;
    const s = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !Ja(s, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [st.events.SELECTION_CHANGE, xn(this.lastRange), xn(s), t];
      this.emitter.emit(st.events.EDITOR_CHANGE, ...r), t !== st.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function Ko(e, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return e.contains(t);
}
const c_ = /^[ -~]*$/;
class u_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let s = this.scroll.length();
    this.scroll.batchStart();
    const n = Sc(t), i = new it();
    return d_(n.ops.slice()).reduce((o, a) => {
      const l = xe.Op.length(a);
      let c = a.attributes || {}, d = !1, h = !1;
      if (a.insert != null) {
        if (i.retain(l), typeof a.insert == "string") {
          const E = a.insert;
          h = !E.endsWith(`
`) && (s <= o || !!this.scroll.descendant(Fe, o)[0]), this.scroll.insertAt(o, E);
          const [F, k] = this.scroll.line(o);
          let I = xs({}, Ae(F));
          if (F instanceof ee) {
            const [j] = F.descendant(re, k);
            j && (I = xs(I, Ae(j)));
          }
          c = xe.AttributeMap.diff(I, c) || {};
        } else if (typeof a.insert == "object") {
          const E = Object.keys(a.insert)[0];
          if (E == null) return o;
          const F = this.scroll.query(E, ot.INLINE) != null;
          if (F)
            (s <= o || this.scroll.descendant(Fe, o)[0]) && (h = !0);
          else if (o > 0) {
            const [k, I] = this.scroll.descendant(re, o - 1);
            k instanceof Ve ? k.value()[I] !== `
` && (d = !0) : k instanceof ve && k.statics.scope === ot.INLINE_BLOT && (d = !0);
          }
          if (this.scroll.insertAt(o, E, a.insert[E]), F) {
            const [k] = this.scroll.descendant(re, o);
            if (k) {
              const I = xs({}, Ae(k));
              c = xe.AttributeMap.diff(I, c) || {};
            }
          }
        }
        s += l;
      } else if (i.push(a), a.retain !== null && typeof a.retain == "object") {
        const E = Object.keys(a.retain)[0];
        if (E == null) return o;
        this.scroll.updateEmbedAt(o, E, a.retain[E]);
      }
      Object.keys(c).forEach((E) => {
        this.scroll.formatAt(o, l, E, c[E]);
      });
      const m = d ? 1 : 0, v = h ? 1 : 0;
      return s += m + v, i.retain(m), i.delete(v), o + l + m + v;
    }, 0), i.reduce((o, a) => typeof a.delete == "number" ? (this.scroll.deleteAt(o, a.delete), o) : o + xe.Op.length(a), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(t, s) {
    return this.scroll.deleteAt(t, s), this.update(new it().retain(t).delete(s));
  }
  formatLine(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((r) => {
      this.scroll.lines(t, Math.max(s, 1)).forEach((o) => {
        o.format(r, n[r]);
      });
    }), this.scroll.optimize();
    const i = new it().retain(t).retain(s, xn(n));
    return this.update(i);
  }
  formatText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, s, r, n[r]);
    });
    const i = new it().retain(t).retain(s, xn(n));
    return this.update(i);
  }
  getContents(t, s) {
    return this.delta.slice(t, t + s);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, s) => t.concat(s.delta()), new it());
  }
  getFormat(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], i = [];
    s === 0 ? this.scroll.path(t).forEach((a) => {
      const [l] = a;
      l instanceof ee ? n.push(l) : l instanceof re && i.push(l);
    }) : (n = this.scroll.lines(t, s), i = this.scroll.descendants(re, t, s));
    const [r, o] = [n, i].map((a) => {
      const l = a.shift();
      if (l == null) return {};
      let c = Ae(l);
      for (; Object.keys(c).length > 0; ) {
        const d = a.shift();
        if (d == null) return c;
        c = h_(Ae(d), c);
      }
      return c;
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
      return n.length() >= i + s && !(i === 0 && s === r) ? mi(n, i, s, !0) : mi(this.scroll, t, s, !0);
    }
    return "";
  }
  getText(t, s) {
    return this.getContents(t, s).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, s) {
    const n = Sc(s), i = new it().retain(t).concat(n);
    return this.scroll.insertContents(t, n), this.update(i);
  }
  insertEmbed(t, s, n) {
    return this.scroll.insertAt(t, s, n), this.update(new it().retain(t).insert({
      [s]: n
    }));
  }
  insertText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return s = s.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, s), Object.keys(n).forEach((i) => {
      this.scroll.formatAt(t, s.length, i, n[i]);
    }), this.update(new it().retain(t).insert(s, xn(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if (t?.statics.blotName !== ee.blotName) return !1;
    const s = t;
    return s.children.length > 1 ? !1 : s.children.head instanceof He;
  }
  removeFormat(t, s) {
    const n = this.getText(t, s), [i, r] = this.scroll.line(t + s);
    let o = 0, a = new it();
    i != null && (o = i.length() - r, a = i.delta().slice(r, r + o - 1).insert(`
`));
    const c = this.getContents(t, s + o).diff(new it().insert(n).concat(a)), d = new it().retain(t).concat(c);
    return this.applyDelta(d);
  }
  update(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const i = this.delta;
    if (s.length === 1 && s[0].type === "characterData" && // @ts-expect-error Fix me later
    s[0].target.data.match(c_) && this.scroll.find(s[0].target)) {
      const r = this.scroll.find(s[0].target), o = Ae(r), a = r.offset(this.scroll), l = s[0].oldValue.replace(Me.CONTENTS, ""), c = new it().insert(l), d = new it().insert(r.value()), h = n && {
        oldRange: Lc(n.oldRange, -a),
        newRange: Lc(n.newRange, -a)
      };
      t = new it().retain(a).concat(c.diff(d, h)).reduce((v, E) => E.insert ? v.insert(E.insert, o) : v.push(E), new it()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !Ja(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function wn(e, t, s) {
  if (e.length === 0) {
    const [v] = Go(s.pop());
    return t <= 0 ? `</li></${v}>` : `</li></${v}>${wn([], t - 1, s)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: a
  }, ...l] = e, [c, d] = Go(a);
  if (o > t)
    return s.push(a), o === t + 1 ? `<${c}><li${d}>${mi(n, i, r)}${wn(l, o, s)}` : `<${c}><li>${wn(e, t + 1, s)}`;
  const h = s[s.length - 1];
  if (o === t && a === h)
    return `</li><li${d}>${mi(n, i, r)}${wn(l, o, s)}`;
  const [m] = Go(s.pop());
  return `</li></${m}>${wn(e, t - 1, s)}`;
}
function mi(e, t, s) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in e && typeof e.html == "function")
    return e.html(t, s);
  if (e instanceof Ve)
    return Mr(e.value().slice(t, t + s)).replaceAll(" ", "&nbsp;");
  if (e instanceof Pe) {
    if (e.statics.blotName === "list-container") {
      const c = [];
      return e.children.forEachAt(t, s, (d, h, m) => {
        const v = "formats" in d && typeof d.formats == "function" ? d.formats() : {};
        c.push({
          child: d,
          offset: h,
          length: m,
          indent: v.indent || 0,
          type: v.list
        });
      }), wn(c, -1, []);
    }
    const i = [];
    if (e.children.forEachAt(t, s, (c, d, h) => {
      i.push(mi(c, d, h));
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
function h_(e, t) {
  return Object.keys(t).reduce((s, n) => {
    if (e[n] == null) return s;
    const i = t[n];
    return i === e[n] ? s[n] = i : Array.isArray(i) ? i.indexOf(e[n]) < 0 ? s[n] = i.concat([e[n]]) : s[n] = i : s[n] = [i, e[n]], s;
  }, {});
}
function Go(e) {
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
function Sc(e) {
  return e.reduce((t, s) => {
    if (typeof s.insert == "string") {
      const n = s.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(n, s.attributes);
    }
    return t.push(s);
  }, new it());
}
function Lc(e, t) {
  let {
    index: s,
    length: n
  } = e;
  return new Xs(s + t, n);
}
function d_(e) {
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
class es {
  static DEFAULTS = {};
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = s;
  }
}
const Qi = "\uFEFF";
class el extends ve {
  constructor(t, s) {
    super(t, s), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(Qi), this.rightGuard = document.createTextNode(Qi), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, s) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, s);
  }
  restore(t) {
    let s = null, n;
    const i = t.data.split(Qi).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof Ve) {
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
    else t === this.rightGuard && (this.next instanceof Ve ? (this.next.insertAt(0, i), s = {
      startNode: this.next.domNode,
      startOffset: i.length
    }) : (n = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(n), this.next), s = {
      startNode: n,
      startOffset: i.length
    }));
    return t.data = Qi, s;
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
class f_ {
  isComposing = !1;
  constructor(t, s) {
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
    s && !(s instanceof el) && (this.emitter.emit(st.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(st.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(st.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(st.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
class jn {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: jn
  };
  modules = {};
  constructor(t, s) {
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
}
const p_ = (e) => e.parentElement || e.getRootNode().host || null, g_ = (e) => {
  const t = e.getBoundingClientRect(), s = "offsetWidth" in e && Math.abs(t.width) / e.offsetWidth || 1, n = "offsetHeight" in e && Math.abs(t.height) / e.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + e.clientWidth * s,
    bottom: t.top + e.clientHeight * n,
    left: t.left
  };
}, tr = (e) => {
  const t = parseInt(e, 10);
  return Number.isNaN(t) ? 0 : t;
}, Ic = (e, t, s, n, i, r) => e < s && t > n ? 0 : e < s ? -(s - e + i) : t > n ? t - e > n - s ? e + i - s : t - n + r : 0, m_ = (e, t) => {
  const s = e.ownerDocument;
  let n = t, i = e;
  for (; i; ) {
    const r = i === s.body, o = r ? {
      top: 0,
      right: window.visualViewport?.width ?? s.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? s.documentElement.clientHeight,
      left: 0
    } : g_(i), a = getComputedStyle(i), l = Ic(n.left, n.right, o.left, o.right, tr(a.scrollPaddingLeft), tr(a.scrollPaddingRight)), c = Ic(n.top, n.bottom, o.top, o.bottom, tr(a.scrollPaddingTop), tr(a.scrollPaddingBottom));
    if (l || c)
      if (r)
        s.defaultView?.scrollBy(l, c);
      else {
        const {
          scrollLeft: d,
          scrollTop: h
        } = i;
        c && (i.scrollTop += c), l && (i.scrollLeft += l);
        const m = i.scrollLeft - d, v = i.scrollTop - h;
        n = {
          left: n.left - m,
          top: n.top - v,
          right: n.right - m,
          bottom: n.bottom - v
        };
      }
    i = r || a.position === "fixed" ? null : p_(i);
  }
}, b_ = 100, y_ = ["block", "break", "cursor", "inline", "scroll", "text"], v_ = (e, t, s) => {
  const n = new Mn();
  return y_.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), e.forEach((i) => {
    let r = t.query(i);
    r || s.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > b_) {
        s.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, On = _s("quill"), er = new Mn();
Pe.uiClass = "ql-ui";
class $ {
  static DEFAULTS = {
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
  };
  static events = st.events;
  static sources = st.sources;
  static version = "2.0.3";
  static imports = {
    delta: it,
    parchment: Jv,
    "core/module": es,
    "core/theme": jn
  };
  static debug(t) {
    t === !0 && (t = "log"), _s.level(t);
  }
  static find(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ea.get(t) || er.find(t, s);
  }
  static import(t) {
    return this.imports[t] == null && On.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, s) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], s);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && On.warn(`Overwriting ${t} with`, s), this.imports[t] = s, (t.startsWith("blots/") || t.startsWith("formats/")) && s && typeof s != "boolean" && s.blotName !== "abstract" && er.register(s), typeof s.register == "function" && s.register(er);
    }
  }
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = __(t, s), this.container = this.options.container, this.container == null) {
      On.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ea.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new st();
    const i = tl.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new u_(this.scroll), this.selection = new l_(this.scroll, this.emitter), this.composition = new f_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(st.events.EDITOR_CHANGE, (o) => {
      o === st.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(st.events.SCROLL_UPDATE, (o, a) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      $e.call(this, () => this.editor.update(null, a, d), o);
    }), this.emitter.on(st.events.SCROLL_EMBED_UPDATE, (o, a) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      $e.call(this, () => {
        const h = new it().retain(o.offset(this)).retain({
          [o.statics.blotName]: a
        });
        return this.editor.update(h, [], d);
      }, $.sources.USER);
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
    return [t, s, , n] = ls(t, s, n), $e.call(this, () => this.editor.deleteText(t, s), n, t, -1 * s);
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
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : st.sources.API;
    return $e.call(this, () => {
      const i = this.getSelection(!0);
      let r = new it();
      if (i == null) return r;
      if (this.scroll.query(t, ot.BLOCK))
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
      return this.setSelection(i, st.sources.SILENT), r;
    }, n);
  }
  formatLine(t, s, n, i, r) {
    let o;
    return [t, s, o, r] = ls(
      t,
      s,
      // @ts-expect-error
      n,
      i,
      r
    ), $e.call(this, () => this.editor.formatLine(t, s, o), r, t, 0);
  }
  formatText(t, s, n, i, r) {
    let o;
    return [t, s, o, r] = ls(
      // @ts-expect-error
      t,
      s,
      n,
      i,
      r
    ), $e.call(this, () => this.editor.formatText(t, s, o), r, t, 0);
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
    return [t, s] = ls(t, s), this.editor.getContents(t, s);
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
    return arguments.length > 0 && arguments[0] !== void 0 && arguments[0] && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = ls(t, s), this.editor.getHTML(t, s);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (s = s ?? this.getLength() - t), [t, s] = ls(t, s), this.editor.getText(t, s);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, s, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : $.sources.API;
    return $e.call(this, () => this.editor.insertEmbed(t, s, n), i, t);
  }
  insertText(t, s, n, i, r) {
    let o;
    return [t, , o, r] = ls(t, 0, n, i, r), $e.call(this, () => this.editor.insertText(t, s, o), r, t, s.length);
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
    return [t, s, , n] = ls(t, s, n), $e.call(this, () => this.editor.removeFormat(t, s), n, t);
  }
  scrollRectIntoView(t) {
    m_(this.root, t);
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
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : st.sources.API;
    return $e.call(this, () => {
      t = new it(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, s);
  }
  setSelection(t, s, n) {
    t == null ? this.selection.setRange(null, s || $.sources.API) : ([t, s, , n] = ls(t, s, n), this.selection.setRange(new Xs(Math.max(0, t), s), n), n !== st.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : st.sources.API;
    const n = new it().insert(t);
    return this.setContents(n, s);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st.sources.USER;
    const s = this.scroll.update(t);
    return this.selection.update(t), s;
  }
  updateContents(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : st.sources.API;
    return $e.call(this, () => (t = new it(t), this.editor.applyDelta(t)), s, !0);
  }
}
function $c(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function Yo(e) {
  return Object.entries(e ?? {}).reduce((t, s) => {
    let [n, i] = s;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Dc(e) {
  return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
}
function __(e, t) {
  const s = $c(e);
  if (!s)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === $.DEFAULTS.theme ? jn : $.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = $.DEFAULTS, {
    modules: a,
    ...l
  } = i.DEFAULTS;
  let c = Yo(t.modules);
  c != null && c.toolbar && c.toolbar.constructor !== Object && (c = {
    ...c,
    toolbar: {
      container: c.toolbar
    }
  });
  const d = xs({}, Yo(r), Yo(a), c), h = {
    ...o,
    ...Dc(l),
    ...Dc(t)
  };
  let m = t.registry;
  return m ? t.formats && On.warn('Ignoring "formats" option because "registry" is specified') : m = t.formats ? v_(t.formats, h.registry, On) : h.registry, {
    ...h,
    registry: m,
    container: s,
    theme: i,
    modules: Object.entries(d).reduce((v, E) => {
      let [F, k] = E;
      if (!k) return v;
      const I = $.import(`modules/${F}`);
      return I == null ? (On.error(`Cannot load ${F} module. Are you sure you registered it?`), v) : {
        ...v,
        // @ts-expect-error
        [F]: xs({}, I.DEFAULTS || {}, k)
      };
    }, {}),
    bounds: $c(h.bounds)
  };
}
function $e(e, t, s, n) {
  if (!this.isEnabled() && t === st.sources.USER && !this.allowReadOnlyEdits)
    return new it();
  let i = s == null ? null : this.getSelection();
  const r = this.editor.delta, o = e();
  if (i != null && (s === !0 && (s = i.index), n == null ? i = Mc(i, o, t) : n !== 0 && (i = Mc(i, s, n, t)), this.setSelection(i, st.sources.SILENT)), o.length() > 0) {
    const a = [st.events.TEXT_CHANGE, o, r, t];
    this.emitter.emit(st.events.EDITOR_CHANGE, ...a), t !== st.sources.SILENT && this.emitter.emit(...a);
  }
  return o;
}
function ls(e, t, s, n, i) {
  let r = {};
  return typeof e.index == "number" && typeof e.length == "number" ? typeof t != "number" ? (i = n, n = s, s = t, t = e.length, e = e.index) : (t = e.length, e = e.index) : typeof t != "number" && (i = n, n = s, s = t, t = 0), typeof s == "object" ? (r = s, i = n) : typeof s == "string" && (n != null ? r[s] = n : i = s), i = i || st.sources.API, [e, t, r, i];
}
function Mc(e, t, s, n) {
  const i = typeof s == "number" ? s : 0;
  if (e == null) return null;
  let r, o;
  return t && typeof t.transformPosition == "function" ? [r, o] = [e.index, e.index + e.length].map((a) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(a, n !== st.sources.USER)
  )) : [r, o] = [e.index, e.index + e.length].map((a) => a < t || a === t && n === st.sources.USER ? a : i >= 0 ? a + i : Math.max(t, a + i)), new Xs(r, o - r);
}
class rn extends Dr {
}
function Rc(e) {
  return e instanceof ee || e instanceof Fe;
}
function Bc(e) {
  return typeof e.updateContent == "function";
}
class E_ extends tl {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = ee;
  static allowedChildren = [ee, Fe, rn];
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
    this.emitter.emit(st.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(st.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, s) {
    this.emitter.emit(st.events.SCROLL_EMBED_UPDATE, t, s);
  }
  deleteAt(t, s) {
    const [n, i] = this.line(t), [r] = this.line(t + s);
    if (super.deleteAt(t, s), r != null && n !== r && i > 0) {
      if (n instanceof Fe || r instanceof Fe) {
        this.optimize();
        return;
      }
      const o = r.children.head instanceof He ? null : r.children.head;
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
      if (n == null || this.scroll.query(s, ot.BLOCK) == null) {
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
    if (t.statics.scope === ot.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(t), super.insertBefore(n, s);
    } else
      super.insertBefore(t, s);
  }
  insertContents(t, s) {
    const n = this.deltaToRenderBlocks(s.concat(new it().insert(`
`))), i = n.pop();
    if (i == null) return;
    this.batchStart();
    const r = n.shift();
    if (r) {
      const l = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Fe, t)[0] && t < this.length()), c = r.type === "block" ? r.delta : new it().insert({
        [r.key]: r.value
      });
      Xo(this, t, c);
      const d = r.type === "block" ? 1 : 0, h = t + c.length() + d;
      l && this.insertAt(h - 1, `
`);
      const m = Ae(this.line(t)[0]), v = xe.AttributeMap.diff(m, r.attributes) || {};
      Object.keys(v).forEach((E) => {
        this.formatAt(h - 1, 1, E, v[E]);
      }), t = h;
    }
    let [o, a] = this.children.find(t);
    if (n.length && (o && (o = o.split(a), a = 0), n.forEach((l) => {
      if (l.type === "block") {
        const c = this.createBlock(l.attributes, o || void 0);
        Xo(c, 0, l.delta);
      } else {
        const c = this.create(l.key, l.value);
        this.insertBefore(c, o || void 0), Object.keys(l.attributes).forEach((d) => {
          c.format(d, l.attributes[d]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const l = o ? o.offset(o.scroll) + a : this.length();
      Xo(this, l, i.delta);
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
    return n instanceof re ? [n, i] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(Rc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let a = [], l = o;
      return i.children.forEachAt(r, o, (c, d, h) => {
        Rc(c) ? a.push(c) : c instanceof Dr && (a = a.concat(n(c, d, l))), l -= h;
      }), a;
    };
    return n(this, t, s);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, s), t.length > 0 && this.emitter.emit(st.events.SCROLL_OPTIMIZE, t, s));
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
    let s = st.sources.USER;
    typeof t == "string" && (s = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((n) => {
      let {
        target: i
      } = n;
      const r = this.find(i, !0);
      return r && !Bc(r);
    }), t.length > 0 && this.emitter.emit(st.events.SCROLL_BEFORE_UPDATE, s, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(st.events.SCROLL_UPDATE, s, t);
  }
  updateEmbedAt(t, s, n) {
    const [i] = this.descendant((r) => r instanceof Fe, t);
    i && i.statics.blotName === s && Bc(i) && i.updateContent(n);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const s = [];
    let n = new it();
    return t.forEach((i) => {
      const r = i?.insert;
      if (r)
        if (typeof r == "string") {
          const o = r.split(`
`);
          o.slice(0, -1).forEach((l) => {
            n.insert(l, i.attributes), s.push({
              type: "block",
              delta: n,
              attributes: i.attributes ?? {}
            }), n = new it();
          });
          const a = o[o.length - 1];
          a && n.insert(a, i.attributes);
        } else {
          const o = Object.keys(r)[0];
          if (!o) return;
          this.query(o, ot.INLINE) ? n.push(i) : (n.length() && s.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new it(), s.push({
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
      let [l, c] = a;
      this.query(l, ot.BLOCK & ot.BLOT) != null ? n = l : i[l] = c;
    });
    const r = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
    this.insertBefore(r, s || void 0);
    const o = r.length();
    return Object.entries(i).forEach((a) => {
      let [l, c] = a;
      r.formatAt(0, o, l, c);
    }), r;
  }
}
function Xo(e, t, s) {
  s.reduce((n, i) => {
    const r = xe.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const a = i.insert;
        e.insertAt(n, a);
        const [l] = e.descendant(re, n), c = Ae(l);
        o = xe.AttributeMap.diff(c, o) || {};
      } else if (typeof i.insert == "object") {
        const a = Object.keys(i.insert)[0];
        if (a == null) return n;
        if (e.insertAt(n, a, i.insert[a]), e.scroll.query(a, ot.INLINE) != null) {
          const [c] = e.descendant(re, n), d = Ae(c);
          o = xe.AttributeMap.diff(d, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((a) => {
      e.formatAt(n, r, a, o[a]);
    }), n + r;
  }, t);
}
const sl = {
  scope: ot.BLOCK,
  whitelist: ["right", "center", "justify"]
}, w_ = new Qe("align", "align", sl), Uh = new Ue("align", "ql-align", sl), Hh = new Ms("align", "text-align", sl);
class Wh extends Ms {
  value(t) {
    let s = super.value(t);
    return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${s.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : s;
  }
}
const A_ = new Ue("color", "ql-color", {
  scope: ot.INLINE
}), nl = new Wh("color", "color", {
  scope: ot.INLINE
}), T_ = new Ue("background", "ql-bg", {
  scope: ot.INLINE
}), il = new Wh("background", "background-color", {
  scope: ot.INLINE
});
class on extends rn {
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
${Mr(this.code(t, s))}
</pre>`;
  }
}
class he extends ee {
  static TAB = "  ";
  static register() {
    $.register(on);
  }
}
class rl extends le {
}
rl.blotName = "code";
rl.tagName = "CODE";
he.blotName = "code-block";
he.className = "ql-code-block";
he.tagName = "DIV";
on.blotName = "code-block-container";
on.className = "ql-code-block-container";
on.tagName = "DIV";
on.allowedChildren = [he];
he.allowedChildren = [Ve, He, Me];
he.requiredContainer = on;
const ol = {
  scope: ot.BLOCK,
  whitelist: ["rtl"]
}, zh = new Qe("direction", "dir", ol), Kh = new Ue("direction", "ql-direction", ol), Gh = new Ms("direction", "direction", ol), Yh = {
  scope: ot.INLINE,
  whitelist: ["serif", "monospace"]
}, Xh = new Ue("font", "ql-font", Yh);
class F_ extends Ms {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const Zh = new F_("font", "font-family", Yh), Jh = new Ue("size", "ql-size", {
  scope: ot.INLINE,
  whitelist: ["small", "large", "huge"]
}), Qh = new Ms("size", "font-size", {
  scope: ot.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), x_ = _s("quill:keyboard"), C_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Rr extends es {
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
    const i = k_(t);
    if (i == null) {
      x_.warn("Attempted to add invalid keyboard binding", i);
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
      const i = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((I) => Rr.match(t, I));
      if (i.length === 0) return;
      const r = $.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [a, l] = this.quill.getLine(o.index), [c, d] = this.quill.getLeaf(o.index), [h, m] = o.length === 0 ? [c, d] : this.quill.getLeaf(o.index + o.length), v = c instanceof vr ? c.value().slice(0, d) : "", E = h instanceof vr ? h.value().slice(m) : "", F = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && a.length() <= 1,
        format: this.quill.getFormat(o),
        line: a,
        offset: l,
        prefix: v,
        suffix: E,
        event: t
      };
      i.some((I) => {
        if (I.collapsed != null && I.collapsed !== F.collapsed || I.empty != null && I.empty !== F.empty || I.offset != null && I.offset !== F.offset)
          return !1;
        if (Array.isArray(I.format)) {
          if (I.format.every((j) => F.format[j] == null))
            return !1;
        } else if (typeof I.format == "object" && !Object.keys(I.format).every((j) => I.format[j] === !0 ? F.format[j] != null : I.format[j] === !1 ? F.format[j] == null : Ja(I.format[j], F.format[j])))
          return !1;
        return I.prefix != null && !I.prefix.test(F.prefix) || I.suffix != null && !I.suffix.test(F.suffix) ? !1 : I.handler.call(this, o, F, I) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, s) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(s.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new it().retain(t.index - n).delete(n);
    if (s.offset === 0) {
      const [a] = this.quill.getLine(t.index - 1);
      if (a && !(a.statics.blotName === "block" && a.length() <= 1)) {
        const c = r.formats(), d = this.quill.getFormat(t.index - 1, 1);
        if (i = xe.AttributeMap.diff(c, d) || {}, Object.keys(i).length > 0) {
          const h = new it().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(h);
        }
      }
    }
    this.quill.updateContents(o, $.sources.USER), this.quill.focus();
  }
  handleDelete(t, s) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - n) return;
    let i = {};
    const [r] = this.quill.getLine(t.index);
    let o = new it().retain(t.index).delete(n);
    if (s.offset >= r.length() - 1) {
      const [a] = this.quill.getLine(t.index + 1);
      if (a) {
        const l = r.formats(), c = this.quill.getFormat(t.index, 1);
        i = xe.AttributeMap.diff(l, c) || {}, Object.keys(i).length > 0 && (o = o.retain(a.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, $.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    al({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, s) {
    const n = Object.keys(s.format).reduce((r, o) => (this.quill.scroll.query(o, ot.BLOCK) && !Array.isArray(s.format[o]) && (r[o] = s.format[o]), r), {}), i = new it().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(t.index + 1, $.sources.SILENT), this.quill.focus();
  }
}
const O_ = {
  bindings: {
    bold: Zo("bold"),
    italic: Zo("italic"),
    underline: Zo("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", $.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(e, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", $.sources.USER), !1);
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
        t.format.indent != null ? this.quill.format("indent", "-1", $.sources.USER) : t.format.list != null && this.quill.format("list", !1, $.sources.USER);
      }
    },
    "indent code-block": qc(!0),
    "outdent code-block": qc(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(e) {
        this.quill.deleteText(e.index - 1, 1, $.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(e, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const s = new it().retain(e.index).delete(e.length).insert("	");
        return this.quill.updateContents(s, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index + 1, $.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, $.sources.USER);
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
        t.format.indent && (s.indent = !1), this.quill.formatLine(e.index, e.length, s, $.sources.USER);
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
        }, i = new it().retain(e.index).insert(`
`, n).retain(t.length() - s - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(e, t) {
        const [s, n] = this.quill.getLine(e.index), i = new it().retain(e.index).insert(`
`, t.format).retain(s.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [s, n, i, r] = t.getTable(e), o = N_(s, n, i, r);
          if (o == null) return;
          let a = s.offset();
          if (o < 0) {
            const l = new it().retain(a).insert(`
`);
            this.quill.updateContents(l, $.sources.USER), this.quill.setSelection(e.index + 1, e.length, $.sources.SILENT);
          } else if (o > 0) {
            a += s.length();
            const l = new it().retain(a).insert(`
`);
            this.quill.updateContents(l, $.sources.USER), this.quill.setSelection(a, $.sources.USER);
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
        s.shiftKey ? this.quill.setSelection(i - 1, $.sources.USER) : this.quill.setSelection(i + n.length(), $.sources.USER);
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
        this.quill.insertText(e.index, " ", $.sources.USER), this.quill.history.cutoff();
        const o = new it().retain(e.index - i).delete(s + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - s, $.sources.SILENT), !1;
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
            const r = new it().retain(e.index + t.length() - s - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(r, $.sources.USER), this.quill.setSelection(e.index - 1, $.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": sr("ArrowLeft", !1),
    "embed left shift": sr("ArrowLeft", !0),
    "embed right": sr("ArrowRight", !1),
    "embed right shift": sr("ArrowRight", !0),
    "table down": Pc(!1),
    "table up": Pc(!0)
  }
};
Rr.DEFAULTS = O_;
function qc(e) {
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
        this.quill.insertText(t.index, r, $.sources.USER), this.quill.setSelection(t.index + r.length, $.sources.SILENT);
        return;
      }
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: a,
        length: l
      } = t;
      o.forEach((c, d) => {
        e ? (c.insertAt(0, r), d === 0 ? a += r.length : l += r.length) : c.domNode.textContent.startsWith(r) && (c.deleteAt(0, r.length), d === 0 ? a -= r.length : l -= r.length);
      }), this.quill.update($.sources.USER), this.quill.setSelection(a, l, $.sources.SILENT);
    }
  };
}
function sr(e, t) {
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
      return r instanceof ve ? (e === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, $.sources.USER) : this.quill.setSelection(n.index - 1, $.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, $.sources.USER) : this.quill.setSelection(n.index + n.length + 1, $.sources.USER), !1) : !0;
    }
  };
}
function Zo(e) {
  return {
    key: e[0],
    shortKey: !0,
    handler(t, s) {
      this.quill.format(e, !s.format[e], $.sources.USER);
    }
  };
}
function Pc(e) {
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
          this.quill.setSelection(l, 0, $.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (e ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, $.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, $.sources.USER));
      }
      return !1;
    }
  };
}
function k_(e) {
  if (typeof e == "string" || typeof e == "number")
    e = {
      key: e
    };
  else if (typeof e == "object")
    e = xn(e);
  else
    return null;
  return e.shortKey && (e[C_] = e.shortKey, delete e.shortKey), e;
}
function al(e) {
  let {
    quill: t,
    range: s
  } = e;
  const n = t.getLines(s);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), o = n[n.length - 1].formats();
    i = xe.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(s, $.sources.USER), Object.keys(i).length > 0 && t.formatLine(s.index, 1, i, $.sources.USER), t.setSelection(s.index, $.sources.SILENT);
}
function N_(e, t, s, n) {
  return t.prev == null && t.next == null ? s.prev == null && s.next == null ? n === 0 ? -1 : 1 : s.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const S_ = /font-weight:\s*normal/, L_ = ["P", "OL", "UL"], Vc = (e) => e && L_.includes(e.tagName), I_ = (e) => {
  Array.from(e.querySelectorAll("br")).filter((t) => Vc(t.previousElementSibling) && Vc(t.nextElementSibling)).forEach((t) => {
    t.parentNode?.removeChild(t);
  });
}, $_ = (e) => {
  Array.from(e.querySelectorAll('b[style*="font-weight"]')).filter((t) => t.getAttribute("style")?.match(S_)).forEach((t) => {
    const s = e.createDocumentFragment();
    s.append(...t.childNodes), t.parentNode?.replaceChild(s, t);
  });
};
function D_(e) {
  e.querySelector('[id^="docs-internal-guid-"]') && ($_(e), I_(e));
}
const M_ = /\bmso-list:[^;]*ignore/i, R_ = /\bmso-list:[^;]*\bl(\d+)/i, B_ = /\bmso-list:[^;]*\blevel(\d+)/i, q_ = (e, t) => {
  const s = e.getAttribute("style"), n = s?.match(R_);
  if (!n)
    return null;
  const i = Number(n[1]), r = s?.match(B_), o = r ? Number(r[1]) : 1, a = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), l = t.match(a), c = l && l[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: c,
    element: e
  };
}, P_ = (e) => {
  const t = Array.from(e.querySelectorAll("[style*=mso-list]")), s = [], n = [];
  t.forEach((o) => {
    (o.getAttribute("style") || "").match(M_) ? s.push(o) : n.push(o);
  }), s.forEach((o) => o.parentNode?.removeChild(o));
  const i = e.documentElement.innerHTML, r = n.map((o) => q_(o, i)).filter((o) => o);
  for (; r.length; ) {
    const o = [];
    let a = r.shift();
    for (; a; )
      o.push(a), a = r.length && r[0]?.element === a.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === a.id ? r.shift() : null;
    const l = document.createElement("ul");
    o.forEach((h) => {
      const m = document.createElement("li");
      m.setAttribute("data-list", h.type), h.indent > 1 && m.setAttribute("class", `ql-indent-${h.indent - 1}`), m.innerHTML = h.element.innerHTML, l.appendChild(m);
    });
    const c = o[0]?.element, {
      parentNode: d
    } = c ?? {};
    c && d?.replaceChild(l, c), o.slice(1).forEach((h) => {
      let {
        element: m
      } = h;
      d?.removeChild(m);
    });
  }
};
function V_(e) {
  e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && P_(e);
}
const j_ = [V_, D_], U_ = (e) => {
  e.documentElement && j_.forEach((t) => {
    t(e);
  });
}, H_ = _s("quill:clipboard"), W_ = [[Node.TEXT_NODE, iE], [Node.TEXT_NODE, Uc], ["br", Z_], [Node.ELEMENT_NODE, Uc], [Node.ELEMENT_NODE, X_], [Node.ELEMENT_NODE, Y_], [Node.ELEMENT_NODE, sE], ["li", tE], ["ol, ul", eE], ["pre", J_], ["tr", nE], ["b", Jo("bold")], ["i", Jo("italic")], ["strike", Jo("strike")], ["style", Q_]], z_ = [w_, zh].reduce((e, t) => (e[t.keyName] = t, e), {}), jc = [Hh, il, nl, Gh, Zh, Qh].reduce((e, t) => (e[t.keyName] = t, e), {});
class K_ extends es {
  static DEFAULTS = {
    matchers: []
  };
  constructor(t, s) {
    super(t, s), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], W_.concat(this.options.matchers ?? []).forEach((n) => {
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
    if (i[he.blotName])
      return new it().insert(n || "", {
        [he.blotName]: i[he.blotName]
      });
    if (!s)
      return new it().insert(n || "", i);
    const r = this.convertHTML(s);
    return Ti(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new it().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    U_(t);
  }
  convertHTML(t) {
    const s = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(s);
    const n = s.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return ll(this.quill.scroll, n, r, o, i);
  }
  dangerouslyPasteHTML(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $.sources.API;
    if (typeof t == "string") {
      const i = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(i, s), this.quill.setSelection(0, $.sources.SILENT);
    } else {
      const i = this.convert({
        html: s,
        text: ""
      });
      this.quill.updateContents(new it().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), $.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: i,
      text: r
    } = this.onCopy(n, s);
    t.clipboardData?.setData("text/plain", r), t.clipboardData?.setData("text/html", i), s && al({
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
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const s = this.quill.getSelection(!0);
    if (s == null) return;
    const n = t.clipboardData?.getData("text/html");
    let i = t.clipboardData?.getData("text/plain");
    if (!n && !i) {
      const o = t.clipboardData?.getData("text/uri-list");
      o && (i = this.normalizeURIList(o));
    }
    const r = Array.from(t.clipboardData?.files || []);
    if (!n && r.length > 0) {
      this.quill.uploader.upload(s, r);
      return;
    }
    if (n && r.length > 0) {
      const o = new DOMParser().parseFromString(n, "text/html");
      if (o.body.childElementCount === 1 && o.body.firstElementChild?.tagName === "IMG") {
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
    H_.log("onPaste", o, {
      text: n,
      html: i
    });
    const a = new it().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(a, $.sources.USER), this.quill.setSelection(a.length() - t.length, $.sources.SILENT), this.quill.scrollSelectionIntoView();
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
            s.has(l) ? s.get(l)?.push(a) : s.set(l, [a]);
          });
          break;
      }
    }), [n, i];
  }
}
function an(e, t, s, n) {
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
  }, new it()) : e;
}
function Ti(e, t) {
  let s = "";
  for (let n = e.ops.length - 1; n >= 0 && s.length < t.length; --n) {
    const i = e.ops[n];
    if (typeof i.insert != "string") break;
    s = i.insert + s;
  }
  return s.slice(-1 * t.length) === t;
}
function Fs(e, t) {
  if (!(e instanceof Element)) return !1;
  const s = t.query(e);
  return s && s.prototype instanceof ve ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(e.tagName.toLowerCase());
}
function G_(e, t) {
  return e.previousElementSibling && e.nextElementSibling && !Fs(e.previousElementSibling, t) && !Fs(e.nextElementSibling, t);
}
const nr = /* @__PURE__ */ new WeakMap();
function td(e) {
  return e == null ? !1 : (nr.has(e) || (e.tagName === "PRE" ? nr.set(e, !0) : nr.set(e, td(e.parentNode))), nr.get(e));
}
function ll(e, t, s, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, e), new it()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let a = ll(e, o, s, n, i);
    return o.nodeType === t.ELEMENT_NODE && (a = s.reduce((l, c) => c(o, l, e), a), a = (i.get(o) || []).reduce((l, c) => c(o, l, e), a)), r.concat(a);
  }, new it()) : new it();
}
function Jo(e) {
  return (t, s, n) => an(s, e, !0, n);
}
function Y_(e, t, s) {
  const n = Qe.keys(e), i = Ue.keys(e), r = Ms.keys(e), o = {};
  return n.concat(i).concat(r).forEach((a) => {
    let l = s.query(a, ot.ATTRIBUTE);
    l != null && (o[l.attrName] = l.value(e), o[l.attrName]) || (l = z_[a], l != null && (l.attrName === a || l.keyName === a) && (o[l.attrName] = l.value(e) || void 0), l = jc[a], l != null && (l.attrName === a || l.keyName === a) && (l = jc[a], o[l.attrName] = l.value(e) || void 0));
  }), Object.entries(o).reduce((a, l) => {
    let [c, d] = l;
    return an(a, c, d, s);
  }, t);
}
function X_(e, t, s) {
  const n = s.query(e);
  if (n == null) return t;
  if (n.prototype instanceof ve) {
    const i = {}, r = n.value(e);
    if (r != null)
      return i[n.blotName] = r, new it().insert(i, n.formats(e, s));
  } else if (n.prototype instanceof gi && !Ti(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return an(t, n.blotName, n.formats(e, s), s);
  return t;
}
function Z_(e, t) {
  return Ti(t, `
`) || t.insert(`
`), t;
}
function J_(e, t, s) {
  const n = s.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(e, s) : !0;
  return an(t, "code-block", i, s);
}
function Q_() {
  return new it();
}
function tE(e, t, s) {
  const n = s.query(e);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Ti(t, `
`))
    return t;
  let i = -1, r = e.parentNode;
  for (; r != null; )
    ["OL", "UL"].includes(r.tagName) && (i += 1), r = r.parentNode;
  return i <= 0 ? t : t.reduce((o, a) => a.insert ? a.attributes && typeof a.attributes.indent == "number" ? o.push(a) : o.insert(a.insert, {
    indent: i,
    ...a.attributes || {}
  }) : o, new it());
}
function eE(e, t, s) {
  const n = e;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), an(t, "list", i, s);
}
function Uc(e, t, s) {
  if (!Ti(t, `
`)) {
    if (Fs(e, s) && (e.childNodes.length > 0 || e instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && e.nextSibling) {
      let n = e.nextSibling;
      for (; n != null; ) {
        if (Fs(n, s))
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
function sE(e, t, s) {
  const n = {}, i = e.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), (i.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((r, o) => {
    let [a, l] = o;
    return an(r, a, l, s);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new it().insert("	").concat(t) : t;
}
function nE(e, t, s) {
  const n = e.parentElement?.tagName === "TABLE" ? e.parentElement : e.parentElement?.parentElement;
  if (n != null) {
    const r = Array.from(n.querySelectorAll("tr")).indexOf(e) + 1;
    return an(t, "table", r, s);
  }
  return t;
}
function iE(e, t, s) {
  let n = e.data;
  if (e.parentElement?.tagName === "O:P")
    return t.insert(n.trim());
  if (!td(e)) {
    if (n.trim().length === 0 && n.includes(`
`) && !G_(e, s))
      return t;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (e.previousSibling == null && e.parentElement != null && Fs(e.parentElement, s) || e.previousSibling instanceof Element && Fs(e.previousSibling, s)) && (n = n.replace(/^ /, "")), (e.nextSibling == null && e.parentElement != null && Fs(e.parentElement, s) || e.nextSibling instanceof Element && Fs(e.nextSibling, s)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return t.insert(n);
}
class rE extends es {
  static DEFAULTS = {
    delay: 1e3,
    maxStack: 100,
    userOnly: !1
  };
  lastRecorded = 0;
  ignoreChange = !1;
  stack = {
    undo: [],
    redo: []
  };
  currentRange = null;
  constructor(t, s) {
    super(t, s), this.quill.on($.events.EDITOR_CHANGE, (n, i, r, o) => {
      n === $.events.SELECTION_CHANGE ? i && o !== $.sources.SILENT && (this.currentRange = i) : n === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === $.sources.USER ? this.record(i, r) : this.transform(i)), this.currentRange = Ta(this.currentRange, i));
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
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (n) => {
      n.inputType === "historyUndo" ? (this.undo(), n.preventDefault()) : n.inputType === "historyRedo" && (this.redo(), n.preventDefault());
    });
  }
  change(t, s) {
    if (this.stack[t].length === 0) return;
    const n = this.stack[t].pop();
    if (!n) return;
    const i = this.quill.getContents(), r = n.delta.invert(i);
    this.stack[s].push({
      delta: r,
      range: Ta(n.range, r)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(n.delta, $.sources.USER), this.ignoreChange = !1, this.restoreSelection(n);
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
  record(t, s) {
    if (t.ops.length === 0) return;
    this.stack.redo = [];
    let n = t.invert(s), i = this.currentRange;
    const r = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > r && this.stack.undo.length > 0
    ) {
      const o = this.stack.undo.pop();
      o && (n = n.compose(o.delta), i = o.range);
    } else
      this.lastRecorded = r;
    n.length() !== 0 && (this.stack.undo.push({
      delta: n,
      range: i
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(t) {
    Hc(this.stack.undo, t), Hc(this.stack.redo, t);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(t) {
    if (t.range)
      this.quill.setSelection(t.range, $.sources.USER);
    else {
      const s = aE(this.quill.scroll, t.delta);
      this.quill.setSelection(s, $.sources.USER);
    }
  }
}
function Hc(e, t) {
  let s = t;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const i = e[n];
    e[n] = {
      delta: s.transform(i.delta, !0),
      range: i.range && Ta(i.range, s)
    }, s = i.delta.transform(s), e[n].delta.length() === 0 && e.splice(n, 1);
  }
}
function oE(e, t) {
  const s = t.ops[t.ops.length - 1];
  return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some((n) => e.query(n, ot.BLOCK) != null) : !1;
}
function aE(e, t) {
  const s = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - s;
  return oE(e, t) && (n -= 1), n;
}
function Ta(e, t) {
  if (!e) return e;
  const s = t.transformPosition(e.index), n = t.transformPosition(e.index + e.length);
  return {
    index: s,
    length: n - s
  };
}
class ed extends es {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("drop", (n) => {
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
        n.dataTransfer?.files && this.upload(o, n.dataTransfer.files);
      }
    });
  }
  upload(t, s) {
    const n = [];
    Array.from(s).forEach((i) => {
      i && this.options.mimetypes?.includes(i.type) && n.push(i);
    }), n.length > 0 && this.options.handler.call(this, t, n);
  }
}
ed.DEFAULTS = {
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
      }), new it().retain(e.index).delete(e.length));
      this.quill.updateContents(i, st.sources.USER), this.quill.setSelection(e.index + n.length, st.sources.SILENT);
    });
  }
};
const lE = ["insertText", "insertReplacementText"];
class cE extends es {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on($.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    al({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (s) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new it().retain(t.index).insert(s, n), $.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + s.length, 0, $.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !lE.includes(t.inputType))
      return;
    const s = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!s || s.collapsed === !0)
      return;
    const n = uE(t);
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
function uE(e) {
  return typeof e.data == "string" ? e.data : e.dataTransfer?.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
const hE = /Mac/i.test(navigator.platform), dE = 100, fE = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || hE && e.key === "a" && e.ctrlKey === !0);
class pE extends es {
  isListening = !1;
  selectionChangeDeadline = 0;
  constructor(t, s) {
    super(t, s), this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(t, s) {
        let {
          line: n,
          event: i
        } = s;
        if (!(n instanceof Pe) || !n.uiNode)
          return !0;
        const r = getComputedStyle(n.domNode).direction === "rtl";
        return r && i.key !== "ArrowRight" || !r && i.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(t.index - 1, t.length + (i.shiftKey ? 1 : 0), $.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (t) => {
      !t.defaultPrevented && fE(t) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + dE, this.isListening) return;
    this.isListening = !0;
    const t = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", t, {
      once: !0
    });
  }
  handleSelectionChange() {
    const t = document.getSelection();
    if (!t) return;
    const s = t.getRangeAt(0);
    if (s.collapsed !== !0 || s.startOffset !== 0) return;
    const n = this.quill.scroll.find(s.startContainer);
    if (!(n instanceof Pe) || !n.uiNode) return;
    const i = document.createRange();
    i.setStartAfter(n.uiNode), i.setEndAfter(n.uiNode), t.removeAllRanges(), t.addRange(i);
  }
}
$.register({
  "blots/block": ee,
  "blots/block/embed": Fe,
  "blots/break": He,
  "blots/container": rn,
  "blots/cursor": Me,
  "blots/embed": el,
  "blots/inline": le,
  "blots/scroll": E_,
  "blots/text": Ve,
  "modules/clipboard": K_,
  "modules/history": rE,
  "modules/keyboard": Rr,
  "modules/uploader": ed,
  "modules/input": cE,
  "modules/uiNode": pE
});
class gE extends Ue {
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
const mE = new gE("indent", "ql-indent", {
  scope: ot.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class bE extends ee {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class yE extends ee {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
class Fi extends rn {
}
Fi.blotName = "list-container";
Fi.tagName = "OL";
class xi extends ee {
  static create(t) {
    const s = super.create();
    return s.setAttribute("data-list", t), s;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    $.register(Fi);
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
xi.blotName = "list";
xi.tagName = "LI";
Fi.allowedChildren = [xi];
xi.requiredContainer = Fi;
class cl extends le {
  static blotName = "bold";
  static tagName = ["STRONG", "B"];
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
class vE extends cl {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class _r extends le {
  static blotName = "link";
  static tagName = "A";
  static SANITIZED_URL = "about:blank";
  static PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel", "sms"];
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("href", this.sanitize(t)), s.setAttribute("rel", "noopener noreferrer"), s.setAttribute("target", "_blank"), s;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return sd(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, s) {
    t !== this.statics.blotName || !s ? super.format(t, s) : this.domNode.setAttribute("href", this.constructor.sanitize(s));
  }
}
function sd(e, t) {
  const s = document.createElement("a");
  s.href = e;
  const n = s.href.slice(0, s.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class _E extends le {
  static blotName = "script";
  static tagName = ["SUB", "SUP"];
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
class EE extends cl {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class wE extends le {
  static blotName = "underline";
  static tagName = "U";
}
class AE extends el {
  static blotName = "formula";
  static className = "ql-formula";
  static tagName = "SPAN";
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
const Wc = ["alt", "height", "width"];
class TE extends ve {
  static blotName = "image";
  static tagName = "IMG";
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return Wc.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return sd(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    Wc.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
}
const zc = ["height", "width"];
class FE extends Fe {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return zc.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static sanitize(t) {
    return _r.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    zc.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
const ri = new Ue("code-token", "hljs", {
  scope: ot.INLINE
});
class bs extends le {
  static formats(t, s) {
    for (; t != null && t !== s.domNode; ) {
      if (t.classList && t.classList.contains(he.className))
        return super.formats(t, s);
      t = t.parentNode;
    }
  }
  constructor(t, s, n) {
    super(t, s, n), ri.add(this.domNode, n);
  }
  format(t, s) {
    t !== bs.blotName ? super.format(t, s) : s ? ri.add(this.domNode, s) : (ri.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ri.value(this.domNode) || this.unwrap();
  }
}
bs.blotName = "code-token";
bs.className = "ql-token";
class Te extends he {
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
    return this.formatAt(0, this.length(), bs.blotName, !1), super.replaceWith(t, s);
  }
}
class ui extends on {
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
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = Te.formats(this.children.head.domNode);
    if (s || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((l, c) => l.concat(Vh(c, !1)), new it()), a = t(i, r);
        o.diff(a).reduce((l, c) => {
          let {
            retain: d,
            attributes: h
          } = c;
          return d ? (h && Object.keys(h).forEach((m) => {
            [Te.blotName, bs.blotName].includes(m) && this.formatAt(l, d, m, h[m]);
          }), l + d) : l;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, s) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Te.formats(n.domNode) : "plain"}">
${Mr(this.code(t, s))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const s = Te.formats(this.children.head.domNode);
      s !== this.uiNode.value && (this.uiNode.value = s);
    }
  }
}
ui.allowedChildren = [Te];
Te.requiredContainer = ui;
Te.allowedChildren = [bs, Me, Ve, He];
const xE = (e, t, s) => {
  if (typeof e.versionString == "string") {
    const n = e.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return e.highlight(s, {
        language: t
      }).value;
  }
  return e.highlight(t, s).value;
};
class nd extends es {
  static register() {
    $.register(bs, !0), $.register(Te, !0), $.register(ui, !0);
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
    this.quill.on($.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof ui)) return;
      const s = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const o = s.ownerDocument.createElement("option");
        o.textContent = r, o.setAttribute("value", i), s.appendChild(o);
      }), s.addEventListener("change", () => {
        t.format(Te.blotName, s.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(s), t.children.head && (s.value = Te.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on($.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update($.sources.USER);
    const n = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(ui) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, s);
    }), this.quill.update($.sources.SILENT), n != null && this.quill.setSelection(n, $.sources.SILENT);
  }
  highlightBlot(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (s = this.languages[s] ? s : "plain", s === "plain")
      return Mr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [he.blotName]: s
      }), i.insert(r)), new it());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(he.className), n.innerHTML = xE(this.options.hljs, s, t), ll(this.quill.scroll, n, [(i, r) => {
      const o = ri.value(i);
      return o ? r.compose(new it().retain(r.length(), {
        [bs.blotName]: o
      })) : r;
    }], [(i, r) => i.data.split(`
`).reduce((o, a, l) => (l !== 0 && o.insert(`
`, {
      [he.blotName]: s
    }), o.insert(a)), r)], /* @__PURE__ */ new WeakMap());
  }
}
nd.DEFAULTS = {
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
class Re extends ee {
  static blotName = "table";
  static tagName = "TD";
  static create(t) {
    const s = super.create();
    return t ? s.setAttribute("data-row", t) : s.setAttribute("data-row", ul()), s;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, s) {
    t === Re.blotName && s ? this.domNode.setAttribute("data-row", s) : super.format(t, s);
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
}
class Zs extends rn {
  static blotName = "table-row";
  static tagName = "TR";
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
class Cs extends rn {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class Er extends rn {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const t = this.descendants(Zs), s = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(s - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = Re.formats(n.children.head.domNode));
        const r = this.scroll.create(Re.blotName, i);
        n.appendChild(r), r.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((s) => s.children.at(t));
  }
  deleteColumn(t) {
    const [s] = this.descendant(Cs);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t);
      i?.remove();
    });
  }
  insertColumn(t) {
    const [s] = this.descendant(Cs);
    s == null || s.children.head == null || s.children.forEach((n) => {
      const i = n.children.at(t), r = Re.formats(n.children.head.domNode), o = this.scroll.create(Re.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [s] = this.descendant(Cs);
    if (s == null || s.children.head == null) return;
    const n = ul(), i = this.scroll.create(Zs.blotName);
    s.children.head.children.forEach(() => {
      const o = this.scroll.create(Re.blotName, n);
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
Er.allowedChildren = [Cs];
Cs.requiredContainer = Er;
Cs.allowedChildren = [Zs];
Zs.requiredContainer = Cs;
Zs.allowedChildren = [Re];
Re.requiredContainer = Zs;
function ul() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class CE extends es {
  static register() {
    $.register(Re), $.register(Zs), $.register(Cs), $.register(Er);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(Er).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , s] = this.getTable();
    s != null && (t.deleteColumn(s.cellOffset()), this.quill.update($.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update($.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const s = t.offset();
    t.remove(), this.quill.update($.sources.USER), this.quill.setSelection(s, $.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [s, n] = this.quill.getLine(t.index);
    if (s == null || s.statics.blotName !== Re.blotName)
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
    n.insertColumn(o + t), this.quill.update($.sources.USER);
    let a = i.rowOffset();
    t === 0 && (a += 1), this.quill.setSelection(s.index + a, s.length, $.sources.SILENT);
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
    n.insertRow(o + t), this.quill.update($.sources.USER), t > 0 ? this.quill.setSelection(s, $.sources.SILENT) : this.quill.setSelection(s.index + i.children.length, s.length, $.sources.SILENT);
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
        table: ul()
      });
    }, new it().retain(n.index));
    this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(n.index, $.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on($.events.SCROLL_OPTIMIZE, (t) => {
      t.some((s) => ["TD", "TR", "TBODY", "TABLE"].includes(s.target.tagName) ? (this.quill.once($.events.TEXT_CHANGE, (n, i, r) => {
        r === $.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const Kc = _s("quill:toolbar");
class hl extends es {
  constructor(t, s) {
    if (super(t, s), Array.isArray(this.options.container)) {
      const n = document.createElement("div");
      n.setAttribute("role", "toolbar"), OE(n, this.options.container), t.container?.parentNode?.insertBefore(n, t.container), this.container = n;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      Kc.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((n) => {
      const i = this.options.handlers?.[n];
      i && this.addHandler(n, i);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((n) => {
      this.attach(n);
    }), this.quill.on($.events.EDITOR_CHANGE, () => {
      const [n] = this.quill.selection.getRange();
      this.update(n);
    });
  }
  addHandler(t, s) {
    this.handlers[t] = s;
  }
  attach(t) {
    let s = Array.from(t.classList).find((i) => i.indexOf("ql-") === 0);
    if (!s) return;
    if (s = s.slice(3), t.tagName === "BUTTON" && t.setAttribute("type", "button"), this.handlers[s] == null && this.quill.scroll.query(s) == null) {
      Kc.warn("ignoring attaching to nonexistent format", s, t);
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
        this.quill.scroll.query(s).prototype instanceof ve
      ) {
        if (r = prompt(`Enter ${s}`), !r) return;
        this.quill.updateContents(new it().retain(o.index).delete(o.length).insert({
          [s]: r
        }), $.sources.USER);
      } else
        this.quill.format(s, r, $.sources.USER);
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
hl.DEFAULTS = {};
function Gc(e, t, s) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), s != null ? (n.value = s, n.setAttribute("aria-label", `${t}: ${s}`)) : n.setAttribute("aria-label", t), e.appendChild(n);
}
function OE(e, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((s) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), s.forEach((i) => {
      if (typeof i == "string")
        Gc(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? kE(n, r, o) : Gc(n, r, o);
      }
    }), e.appendChild(n);
  });
}
function kE(e, t, s) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), s.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), e.appendChild(n);
}
hl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const e = this.quill.getSelection();
      if (e != null)
        if (e.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((s) => {
            this.quill.scroll.query(s, ot.INLINE) != null && this.quill.format(s, !1, $.sources.USER);
          });
        } else
          this.quill.removeFormat(e.index, e.length, $.sources.USER);
    },
    direction(e) {
      const {
        align: t
      } = this.quill.getFormat();
      e === "rtl" && t == null ? this.quill.format("align", "right", $.sources.USER) : !e && t === "right" && this.quill.format("align", !1, $.sources.USER), this.quill.format("direction", e, $.sources.USER);
    },
    indent(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t), n = parseInt(s.indent || 0, 10);
      if (e === "+1" || e === "-1") {
        let i = e === "+1" ? 1 : -1;
        s.direction === "rtl" && (i *= -1), this.quill.format("indent", n + i, $.sources.USER);
      }
    },
    link(e) {
      e === !0 && (e = prompt("Enter link URL:")), this.quill.format("link", e, $.sources.USER);
    },
    list(e) {
      const t = this.quill.getSelection(), s = this.quill.getFormat(t);
      e === "check" ? s.list === "checked" || s.list === "unchecked" ? this.quill.format("list", !1, $.sources.USER) : this.quill.format("list", "unchecked", $.sources.USER) : this.quill.format("list", e, $.sources.USER);
    }
  }
};
const NE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', SE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', LE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', IE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', $E = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', DE = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', ME = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', RE = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', Yc = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', BE = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', qE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', PE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', VE = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', jE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', UE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', HE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', WE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', zE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', KE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', GE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', YE = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', XE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', ZE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', JE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', QE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', tw = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', sw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', nw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', iw = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', rw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', ow = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', aw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', bi = {
  align: {
    "": NE,
    center: SE,
    right: LE,
    justify: IE
  },
  background: $E,
  blockquote: DE,
  bold: ME,
  clean: RE,
  code: Yc,
  "code-block": Yc,
  color: BE,
  direction: {
    "": qE,
    rtl: PE
  },
  formula: VE,
  header: {
    1: jE,
    2: UE,
    3: HE,
    4: WE,
    5: zE,
    6: KE
  },
  italic: GE,
  image: YE,
  indent: {
    "+1": XE,
    "-1": ZE
  },
  link: JE,
  list: {
    bullet: QE,
    check: tw,
    ordered: ew
  },
  script: {
    sub: sw,
    super: nw
  },
  strike: iw,
  table: rw,
  underline: ow,
  video: aw
}, lw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let Xc = 0;
function Zc(e, t) {
  e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
}
class Br {
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
    this.container.classList.toggle("ql-expanded"), Zc(this.label, "aria-expanded"), Zc(this.options, "aria-hidden");
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
    return t.classList.add("ql-picker-label"), t.innerHTML = lw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${Xc}`, Xc += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((s) => {
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
    t !== n && (n?.classList.remove("ql-selected"), t != null && (t.classList.add("ql-selected"), this.select.selectedIndex = Array.from(t.parentNode.children).indexOf(t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), s && (this.select.dispatchEvent(new Event("change")), this.close())));
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
class id extends Br {
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
class rd extends Br {
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
const cw = (e) => {
  const {
    overflowY: t
  } = getComputedStyle(e, null);
  return t !== "visible" && t !== "clip";
};
class od {
  constructor(t, s) {
    this.quill = t, this.boundsContainer = s || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, cw(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const uw = [!1, "center", "right", "justify"], hw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], dw = [!1, "serif", "monospace"], fw = ["1", "2", "3", !1], pw = ["small", !1, "large", "huge"];
class Ci extends jn {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && si(i, uw), typeof s.align == "object"))
        return new rd(i, s.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && si(i, hw, r === "background" ? "#ffffff" : "#000000"), new id(i, s[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? si(i, dw) : i.classList.contains("ql-header") ? si(i, fw) : i.classList.contains("ql-size") && si(i, pw)), new Br(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(st.events.EDITOR_CHANGE, n);
  }
}
Ci.DEFAULTS = xs({}, jn.DEFAULTS, {
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
class ad extends od {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, st.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, st.sources.USER)), this.quill.root.scrollTop = s;
        break;
      }
      case "video":
        t = gw(t);
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
            st.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", st.sources.USER), this.quill.setSelection(n + 2, st.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function gw(e) {
  let t = e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = e.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : e;
}
function si(e, t) {
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === s ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), e.appendChild(i);
  });
}
const mw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class bw extends ad {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(t, s) {
    super(t, s), this.quill.on(st.events.EDITOR_CHANGE, (n, i, r, o) => {
      if (n === st.events.SELECTION_CHANGE)
        if (i != null && i.length > 0 && o === st.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const a = this.quill.getLines(i.index, i.length);
          if (a.length === 1) {
            const l = this.quill.getBounds(i);
            l != null && this.position(l);
          } else {
            const l = a[a.length - 1], c = this.quill.getIndex(l), d = Math.min(l.length() - 1, i.index + i.length - c), h = this.quill.getBounds(new Xs(c, d));
            h != null && this.position(h);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(st.events.SCROLL_OPTIMIZE, () => {
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
class ld extends Ci {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = mw), super(t, s), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new bw(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), bi), this.buildPickers(t.container.querySelectorAll("select"), bi));
  }
}
ld.DEFAULTS = xs({}, Ci.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(e) {
          e ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, $.sources.USER);
        }
      }
    }
  }
});
const yw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class vw extends ad {
  static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
  preview = this.root.querySelector("a.ql-preview");
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (t) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), t.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (t) => {
      if (this.linkRange != null) {
        const s = this.linkRange;
        this.restoreFocus(), this.quill.formatText(s, "link", !1, st.sources.USER), delete this.linkRange;
      }
      t.preventDefault(), this.hide();
    }), this.quill.on(st.events.SELECTION_CHANGE, (t, s, n) => {
      if (t != null) {
        if (t.length === 0 && n === st.sources.USER) {
          const [i, r] = this.quill.scroll.descendant(_r, t.index);
          if (i != null) {
            this.linkRange = new Xs(t.index - r, i.length());
            const o = _r.formats(i.domNode);
            this.preview.textContent = o, this.preview.setAttribute("href", o), this.show();
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
class cd extends Ci {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = yw), super(t, s), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), bi), this.buildPickers(t.container.querySelectorAll("select"), bi), this.tooltip = new vw(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (s, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
cd.DEFAULTS = xs({}, Ci.DEFAULTS, {
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
            this.quill.format("link", !1, $.sources.USER);
        }
      }
    }
  }
});
$.register({
  "attributors/attribute/direction": zh,
  "attributors/class/align": Uh,
  "attributors/class/background": T_,
  "attributors/class/color": A_,
  "attributors/class/direction": Kh,
  "attributors/class/font": Xh,
  "attributors/class/size": Jh,
  "attributors/style/align": Hh,
  "attributors/style/background": il,
  "attributors/style/color": nl,
  "attributors/style/direction": Gh,
  "attributors/style/font": Zh,
  "attributors/style/size": Qh
}, !0);
$.register({
  "formats/align": Uh,
  "formats/direction": Kh,
  "formats/indent": mE,
  "formats/background": il,
  "formats/color": nl,
  "formats/font": Xh,
  "formats/size": Jh,
  "formats/blockquote": bE,
  "formats/code-block": he,
  "formats/header": yE,
  "formats/list": xi,
  "formats/bold": cl,
  "formats/code": rl,
  "formats/italic": vE,
  "formats/link": _r,
  "formats/script": _E,
  "formats/strike": EE,
  "formats/underline": wE,
  "formats/formula": AE,
  "formats/image": TE,
  "formats/video": FE,
  "modules/syntax": nd,
  "modules/table": CE,
  "modules/toolbar": hl,
  "themes/bubble": ld,
  "themes/snow": cd,
  "ui/icons": bi,
  "ui/picker": Br,
  "ui/icon-picker": rd,
  "ui/color-picker": id,
  "ui/tooltip": od
}, !0);
const Se = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, _w = {
  props: ["modelValue"],
  data() {
    return {
      showHtmlModal: !1,
      htmlContent: "",
      showIframeModal: !1,
      iframeHtml: ""
    };
  },
  mounted() {
    this.initQuillEditor();
  },
  watch: {
    modelValue(e) {
      if (e || (e = ""), this.quill) {
        const t = (e || "").trim();
        this.getCleanHtmlContent() !== t && this.setHtmlContent(t);
      }
    }
  },
  methods: {
    initQuillEditor() {
      const e = $.import("blots/block");
      class t extends e {
      }
      t.tagName = "div", $.register(t, !0);
      const s = $.import("blots/embed");
      class n extends s {
        static create(o) {
          const a = document.createElement("iframe");
          if (typeof o == "string") {
            const l = document.createElement("div");
            l.innerHTML = o;
            const c = l.querySelector("iframe");
            if (c)
              return Array.from(c.attributes).forEach((d) => {
                a.setAttribute(d.name, d.value);
              }), a;
            a.setAttribute("src", o);
          } else
            Object.keys(o).forEach((l) => {
              l === "url" || l === "src" ? a.setAttribute("src", o[l]) : o[l] !== void 0 && o[l] !== null && a.setAttribute(l, o[l]);
            });
          return a.getAttribute("style") || a.setAttribute("style", "max-width: 100%; border: none;"), a;
        }
        static value(o) {
          const a = {};
          return Array.from(o.attributes).forEach((l) => {
            a[l.name] = l.value;
          }), a;
        }
      }
      n.blotName = "iframe", n.tagName = "iframe", n.className = "ql-iframe", $.register(n), this.quill = new $(this.$refs.editor, {
        theme: "snow",
        modules: {
          //syntax: true,              // Include syntax module
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["link", "image", "iframe"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ align: [] }],
              ["clean", "html"]
            ],
            handlers: {
              iframe: () => {
                this.openIframeModal();
              },
              html: () => {
                this.openHtmlModal();
              }
            }
          }
        },
        formats: [
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "image",
          "iframe",
          "list",
          "indent",
          "align"
        ]
      });
      const i = (this.modelValue || "").trim();
      this.setHtmlContent(i), this.$nextTick(() => {
        const r = this.$refs.editor.parentElement.querySelector(".ql-toolbar");
        if (r) {
          const o = r.querySelector('button[class*="iframe"], .ql-iframe');
          o && (o.innerHTML = `
              <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <line class="ql-stroke" x1="9" x2="9" y1="4" y2="14"></line>
                <line class="ql-stroke" x1="3" x2="15" y1="7" y2="7"></line>
                <line class="ql-stroke" x1="3" x2="15" y1="11" y2="11"></line>
              </svg>
            `);
          const a = r.querySelector('button[class*="html"], .ql-html');
          a && (a.innerHTML = `
              <svg viewBox="0 0 18 18">
                <polyline class="ql-stroke" points="5 7 3 9 5 11"></polyline>
                <polyline class="ql-stroke" points="13 7 15 9 13 11"></polyline>
                <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line>
              </svg>
            `, a.setAttribute("title", "HTML szerkesztés"));
        }
      }), this.quill.on("text-change", () => {
        const r = this.getCleanHtmlContent();
        this.$emit("update:modelValue", r);
      });
    },
    getCleanHtmlContent() {
      if (!this.quill) return "";
      const e = this.quill.root.innerHTML, t = document.createElement("div");
      t.innerHTML = e;
      const n = (t.textContent || "").replace(/\u200B/g, "").trim().length > 0, i = !!t.querySelector("img, video, audio, iframe, embed, object, svg"), r = t.innerHTML.trim();
      return !n && !i ? "" : r;
    },
    openHtmlModal() {
      const e = this.getCleanHtmlContent();
      this.htmlContent = e || "", this.showHtmlModal = !0, this.$nextTick(() => {
        this.$refs.htmlTextarea && this.$refs.htmlTextarea.focus();
      });
    },
    closeHtmlModal() {
      this.showHtmlModal = !1;
    },
    applyHtmlContent() {
      if (this.quill) {
        const e = (this.htmlContent || "").trim();
        this.setHtmlContent(e);
        const t = this.getCleanHtmlContent();
        this.$emit("update:modelValue", t);
      }
      this.closeHtmlModal();
    },
    openIframeModal() {
      this.iframeHtml = "", this.showIframeModal = !0, this.$nextTick(() => {
        this.$refs.iframeTextarea && (this.$refs.iframeTextarea.focus(), this.$refs.iframeTextarea.select());
      });
    },
    closeIframeModal() {
      this.showIframeModal = !1, this.iframeHtml = "";
    },
    insertIframe() {
      if (!this.iframeHtml || !this.iframeHtml.trim())
        return;
      const e = this.quill.getSelection(!0), t = e ? e.index : this.quill.getLength(), s = document.createElement("div");
      s.innerHTML = this.iframeHtml.trim();
      const n = s.querySelector("iframe");
      if (n) {
        const i = {};
        Array.from(n.attributes).forEach((o) => {
          i[o.name] = o.value;
        }), this.quill.insertText(t, `
`), this.quill.insertEmbed(t + 1, "iframe", i), this.quill.insertText(t + 2, `
`), this.quill.setSelection(t + 3);
        const r = this.getCleanHtmlContent();
        this.$emit("update:modelValue", r);
      } else {
        this.quill.insertText(t, `
`);
        const i = document.createElement("div");
        i.innerHTML = this.iframeHtml.trim();
        const r = i.firstElementChild;
        if (r) {
          this.quill.root.insertBefore(r, this.quill.root.childNodes[t + 1]), this.quill.setSelection(t + 2);
          const o = this.getCleanHtmlContent();
          this.$emit("update:modelValue", o);
        }
      }
      this.closeIframeModal();
    },
    /**
     * HTML beillesztése egységesen.
     * Üresnél töröl, különben dangerouslyPasteHTML, hogy az iframe-ek és egyéb elemek is megmaradjanak.
     */
    setHtmlContent(e) {
      if (!this.quill) return;
      const t = (e || "").trim();
      if (!t) {
        this.quill.setContents([]);
        return;
      }
      this.quill.clipboard.dangerouslyPasteHTML(t);
    }
  }
}, Ew = _w, ww = { class: "ql-editor-container" }, Aw = {
  class: "",
  ref: "editor"
}, Tw = { class: "html-modal-header" }, Fw = { class: "html-modal-body" }, xw = { class: "html-modal-footer" }, Cw = { class: "html-modal-header" }, Ow = { class: "html-modal-body" }, kw = { class: "html-modal-footer" };
function Nw(e, t, s, n, i, r) {
  return g(), b("div", ww, [
    f("div", Aw, null, 512),
    e.showHtmlModal ? (g(), b("div", {
      key: 0,
      class: "html-modal-overlay",
      onClick: t[5] || (t[5] = (...o) => e.closeHtmlModal && e.closeHtmlModal(...o))
    }, [
      f("div", {
        class: "html-modal-content",
        onClick: t[4] || (t[4] = Yt(() => {
        }, ["stop"]))
      }, [
        f("div", Tw, [
          t[12] || (t[12] = f("h5", null, "HTML szerkesztés", -1)),
          f("button", {
            type: "button",
            class: "btn-close",
            onClick: t[0] || (t[0] = (...o) => e.closeHtmlModal && e.closeHtmlModal(...o))
          })
        ]),
        f("div", Fw, [
          yt(f("textarea", {
            ref: "htmlTextarea",
            class: "form-control html-textarea",
            "onUpdate:modelValue": t[1] || (t[1] = (o) => e.htmlContent = o),
            rows: "15"
          }, null, 512), [
            [ge, e.htmlContent]
          ])
        ]),
        f("div", xw, [
          f("button", {
            type: "button",
            class: "btn btn-secondary",
            onClick: t[2] || (t[2] = (...o) => e.closeHtmlModal && e.closeHtmlModal(...o))
          }, "Mégse"),
          f("button", {
            type: "button",
            class: "btn btn-primary",
            onClick: t[3] || (t[3] = (...o) => e.applyHtmlContent && e.applyHtmlContent(...o))
          }, "Alkalmaz")
        ])
      ])
    ])) : T("", !0),
    e.showIframeModal ? (g(), b("div", {
      key: 1,
      class: "html-modal-overlay",
      onClick: t[11] || (t[11] = (...o) => e.closeIframeModal && e.closeIframeModal(...o))
    }, [
      f("div", {
        class: "html-modal-content",
        onClick: t[10] || (t[10] = Yt(() => {
        }, ["stop"]))
      }, [
        f("div", Cw, [
          t[13] || (t[13] = f("h5", null, "Iframe beillesztése", -1)),
          f("button", {
            type: "button",
            class: "btn-close",
            onClick: t[6] || (t[6] = (...o) => e.closeIframeModal && e.closeIframeModal(...o))
          })
        ]),
        f("div", Ow, [
          t[14] || (t[14] = f("label", { class: "form-label" }, "Iframe HTML kód:", -1)),
          yt(f("textarea", {
            ref: "iframeTextarea",
            class: "form-control html-textarea",
            "onUpdate:modelValue": t[7] || (t[7] = (o) => e.iframeHtml = o),
            rows: "5",
            placeholder: '<iframe src="..." width="..." height="..."></iframe>'
          }, null, 512), [
            [ge, e.iframeHtml]
          ])
        ]),
        f("div", kw, [
          f("button", {
            type: "button",
            class: "btn btn-secondary",
            onClick: t[8] || (t[8] = (...o) => e.closeIframeModal && e.closeIframeModal(...o))
          }, "Mégse"),
          f("button", {
            type: "button",
            class: "btn btn-primary",
            onClick: t[9] || (t[9] = (...o) => e.insertIframe && e.insertIframe(...o))
          }, "Beillesztés")
        ])
      ])
    ])) : T("", !0)
  ]);
}
const Sw = /* @__PURE__ */ Se(Ew, [["render", Nw]]), Lw = {
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
}, Iw = Lw, $w = {
  key: 0,
  class: "table table-sm w-100 vsa-file-info"
}, Dw = { class: "text-nowrap text-center" }, Mw = { class: "text-center" }, Rw = { class: "text-nowrap text-end" }, Bw = ["innerHTML"], qw = { class: "text-end" }, Pw = { class: "text-nowrap text-center" }, Vw = { class: "text-center" }, jw = { class: "text-end" }, Uw = ["innerHTML"], Hw = { class: "text-end" }, Ww = {
  key: 0,
  class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, zw = { colspan: "3" }, Kw = { class: "text-end" }, Gw = ["innerHTML"], Yw = { class: "d-flex justify-content-between text-nowrap" }, Xw = { class: "d-flex justify-content-between text-nowrap" }, Zw = { class: "text-muted fw-light me-3" }, Jw = {
  key: 1,
  class: "d-flex justify-content-between"
};
function Qw(e, t, s, n, i, r) {
  return g(), b("div", null, [
    e.file ? (g(), b("table", $w, [
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
          f("td", Dw, D(e.file.original.width) + " x " + D(e.file.original.height), 1),
          f("td", Mw, D(e.file.original.ratio), 1),
          f("td", Rw, [
            f("span", {
              innerHTML: e.roundFileSize(e.file.original.bytes, !0)
            }, null, 8, Bw)
          ]),
          f("td", qw, D(e.file.original.extension), 1),
          t[1] || (t[1] = f("td", null, null, -1))
        ]),
        (g(!0), b(ht, null, mt(e.file.types, (o, a) => (g(), b("tr", { key: o }, [
          f("td", null, D(a), 1),
          f("td", Pw, D(o.width) + " x " + D(o.height), 1),
          f("td", Vw, D(o.ratio), 1),
          f("td", jw, [
            f("span", {
              class: S(["text-nowrap", { "text-danger": o.bytes > e.file.original.bytes }]),
              innerHTML: e.roundFileSize(o.bytes, !0)
            }, null, 10, Uw)
          ]),
          f("td", Hw, D(o.extension), 1),
          f("td", null, [
            o.crop ? (g(), b("small", Ww, D(o.crop), 1)) : T("", !0)
          ])
        ]))), 128))
      ]),
      f("tfoot", null, [
        f("tr", null, [
          f("td", zw, D(e.file.uploaded ? "uploaded" : "uploading"), 1),
          f("td", Kw, [
            f("span", {
              class: "text-nowrap",
              innerHTML: e.roundFileSize(e.file.bytes, !0)
            }, null, 8, Gw)
          ]),
          t[2] || (t[2] = f("td", { colspan: "2" }, null, -1))
        ])
      ])
    ])) : T("", !0),
    f("small", Yw, [
      t[4] || (t[4] = f("span", { class: "text-muted fw-light me-3" }, "original filename", -1)),
      wt(" " + D(e.file.original.name), 1)
    ]),
    f("small", Xw, [
      f("span", Zw, D(e.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
      t[5] || (t[5] = wt()),
      f("span", null, D(e.file.slug), 1)
    ]),
    e.file.uploaded ? (g(), b("small", Jw, [
      t[6] || (t[6] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
      t[7] || (t[7] = wt()),
      f("span", null, D(e.dateFormat(e.file.timestamp * 1e3)), 1)
    ])) : T("", !0)
  ]);
}
const tA = /* @__PURE__ */ Se(Iw, [["render", Qw]]), we = {
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
}, eA = {
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
    VuAdminFileUploadInfo: tA
  },
  created() {
    let e = pr(1e5);
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
      return m1(e, t);
    },
    extensionByFilename(e) {
      return b1(e);
    },
    getAcceptMimeTypes(e) {
      let t = [];
      for (const s in we)
        if (we.hasOwnProperty(s)) {
          const n = we[s];
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
      }, e.title = e.name.split(".").slice(0, -1).join("."), e.uid = pr(9999999).toString(32) + Date.now().toString(32), e.slug = ti(e.title), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
        bytes: e.size,
        mime: e.type,
        name: e.name,
        modified: e.lastModified,
        extension: this.extensionByFilename(e.name)
      }, Object.values(we.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(we.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(we.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, (e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
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
          s.currentTime = s.duration * la(), e.video = s;
        }), s.addEventListener("seeked", () => {
          this.forEachPresets(e, s), e.loaded = !0, this.bytes += e.bytes;
        });
      }, n.readAsDataURL(e);
    },
    seekRandom(e) {
      e.video && (e.video.currentTime = e.video.duration * la());
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
                slug: ti(t.title) + "-" + t.uid,
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
        let c = this.params.presets[l];
        c.key = l, c.width = c.width ? c.width : 1920, c.height = c.height ? c.height : 1080;
        let d = c.width, h = c.height;
        if (c.crop === "cover") {
          let m = Math.max(d / o, h / a), v = o * m, E = a * m, F = (v - d) / 2, k = (E - h) / 2;
          n.width = d, n.height = h, i.drawImage(t, -F, -k, v, E);
        } else if (c.crop === "contain") {
          let m = Math.min(d / o, h / a), v = o * m, E = a * m, F = (d - v) / 2, k = (h - E) / 2;
          n.width = d, n.height = h, i.clearRect(0, 0, d, h), i.drawImage(t, F, k, v, E);
        } else
          o > d && (a = Math.round(a * (d / o)), o = d), a > h && (o = Math.round(o * (h / a)), a = h), n.width = o, n.height = a, i.drawImage(t, 0, 0, o, a);
        e.types[c.key] = {
          width: n.width,
          height: n.height,
          ratio: this.calculateAspectRatio(n.width, n.height),
          extension: c.extension ? c.extension : this.getExtensionByMimeType(e.type),
          quality: c.quality ? c.quality : 0.9,
          crop: c.crop ? c.crop : null
        }, e.types[c.key].slug = ti(e.title) + "-" + n.width + "x" + n.height + "-" + e.uid, e.types[c.key].mime = this.getMimeTypeByExtension(e.types[c.key].extension), e.types[c.key].data = n.toDataURL(
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
        e.slug = ti(e.title);
        for (let t in e.types) {
          let s = this.params.presets[t];
          e.types[t].slug = ti(e.title) + "-" + s.width + "x" + s.height;
        }
        this.$forceUpdate();
      }
    },
    arrayItemMoveUp(e, t) {
      Ha(e, t);
    },
    arrayItemMoveDown(e, t) {
      Wa(e, t);
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
      for (const t in we)
        if (we.hasOwnProperty(t)) {
          const s = we[t];
          if (s[e])
            return s[e];
        }
      return null;
    },
    getExtensionByMimeType(e) {
      for (const t in we)
        if (we.hasOwnProperty(t)) {
          const s = we[t];
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
      return Pn(e, this.settings.translate, t, s || this.settings.language);
    },
    dropdownSelectToggleOne(e, t) {
      Pa(e, t), this.$forceUpdate();
    },
    dropdownSelectAll(e, t) {
      Va(e, t), this.$forceUpdate();
    },
    dropdownSelectInvert(e, t) {
      ja(e, t), this.$forceUpdate();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Ua(e), this.$forceUpdate();
    },
    handleDrop(e) {
      e.preventDefault(), this.isDragging = !1;
      const t = e.dataTransfer.files;
      this.handleFileChange({ target: { files: t } });
    }
  }
}, sA = eA, nA = { class: "" }, iA = {
  key: 0,
  class: "vsa-image-editor p-2 text-center"
}, rA = { class: "row" }, oA = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, aA = { class: "badge bg-dark text-light fw-light mx-1" }, lA = { class: "badge bg-dark text-light fw-light mx-1" }, cA = ["src"], uA = { class: "row g-1" }, hA = { class: "col-md-6" }, dA = { class: "col-md-6" }, fA = { class: "col-md-6" }, pA = ["href"], gA = {
  key: 1,
  class: "row g-2 mb-1"
}, mA = { key: 0 }, bA = { class: "table table-sm table-responsive table-borderless" }, yA = { class: "align-middle px-0" }, vA = { class: "input-group border" }, _A = { class: "d-block p-1 px-2" }, EA = ["onClick"], wA = ["onClick"], AA = {
  key: 0,
  class: "fs-5 mx-2"
}, TA = {
  key: 1,
  class: "fs-5 mx-2"
}, FA = {
  key: 2,
  class: "fs-5 mx-2"
}, xA = ["onUpdate:modelValue", "onInput"], CA = {
  key: 3,
  class: "mx-0"
}, OA = ["href"], kA = ["src", "alt"], NA = ["src", "alt"], SA = {
  key: 4,
  class: "dropdown rounded-bottom"
}, LA = {
  class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, IA = { class: "dropdown-menu" }, $A = ["onClick"], DA = {
  key: 0,
  class: "bi bi-check-square"
}, MA = {
  key: 1,
  class: "bi bi-square"
}, RA = ["onClick"], BA = ["onClick"], qA = ["onClick"], PA = { class: "dropdown" }, VA = { class: "dropdown-menu" }, jA = { class: "p-2" }, UA = { class: "fw-light" }, HA = ["onClick"], WA = { class: "vsa-image-container h-100 position-relative" }, zA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, KA = {
  key: 1,
  class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, GA = ["href"], YA = ["src", "alt"], XA = ["src", "alt"], ZA = {
  key: 2,
  class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, JA = ["onUpdate:modelValue", "onInput"], QA = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, tT = { class: "p-1 px-2 border border-end-0 h-100" }, eT = ["onClick"], sT = ["onClick"], nT = {
  key: 0,
  class: "dropdown border border-end-0 h-100 w-100"
}, iT = {
  class: "btn btn-sm rounded-0 h-100 w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, rT = { class: "dropdown-menu" }, oT = ["onClick"], aT = {
  key: 0,
  class: "bi bi-check-square"
}, lT = {
  key: 1,
  class: "bi bi-square"
}, cT = ["onClick"], uT = ["onClick"], hT = ["onClick"], dT = { class: "dropdown border h-100 w-100" }, fT = { class: "dropdown-menu" }, pT = { class: "p-2" }, gT = { class: "fw-light" }, mT = ["onClick"], bT = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, yT = { class: "row g-1" }, vT = { class: "col-12 d-flex align-items-center justify-content-center" }, _T = ["for"], ET = { key: 0 }, wT = { key: 0 }, AT = { class: "" }, TT = { class: "" }, FT = {
  key: 1,
  class: "fs-6"
}, xT = {
  key: 0,
  class: "bi bi-list-ol"
}, CT = {
  key: 1,
  class: "bi bi-grid"
}, OT = ["disabled"], kT = { class: "col-12 text-center" }, NT = { key: 0 }, ST = ["id", "accept"];
function LT(e, t, s, n, i, r) {
  const o = Be("VuAdminFileUploadInfo");
  return g(), b("div", nA, [
    f("div", {
      class: S(["vsa-upload", { wait: e.wait }])
    }, [
      e.editfile && e.editfile.presets ? (g(), b("div", iA, [
        f("div", rA, [
          (g(!0), b(ht, null, mt(e.editfile.types, (a, l) => (g(), b("div", {
            class: "col-md-3",
            key: l
          }, [
            f("span", oA, D(a.extension), 1),
            f("span", aA, D(a.width) + " x " + D(a.height), 1),
            f("span", lA, "~" + D(e.roundFileSize(a.bytes)), 1),
            a ? (g(), b("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: a.url ? a.url : a.data
            }, null, 8, cA)) : T("", !0)
          ]))), 128))
        ]),
        yt(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (a) => e.editfile.title = a)
        }, null, 512), [
          [ge, e.editfile.title]
        ]),
        f("div", uA, [
          f("div", hA, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (a) => e.editfile = null)
            }, " Close ")
          ]),
          f("div", dA, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (a) => e.remove(e.index))
            }, " Remove ")
          ]),
          f("div", fA, [
            e.type && !e.type.url ? (g(), b("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (a) => e.download(e.index, e.params))
            }, " Download ")) : T("", !0),
            e.type && e.type.url ? (g(), b("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: e.type.url
            }, " Download ", 8, pA)) : T("", !0)
          ])
        ])
      ])) : T("", !0),
      e.files && e.files.length ? (g(), b("div", gA, [
        e.params.ui === "list" ? (g(), b("div", mA, [
          f("table", bA, [
            f("tbody", null, [
              (g(!0), b(ht, null, mt(e.files, (a, l) => (g(), b("tr", { key: l }, [
                f("td", yA, [
                  f("div", vA, [
                    f("span", _A, D(l + 1), 1),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end h-100",
                      onClick: (c) => e.arrayItemMoveDown(e.files, l)
                    }, [
                      f("i", {
                        class: S(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                      }, null, 2)
                    ], 8, EA),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end h-100",
                      onClick: (c) => e.arrayItemMoveUp(e.files, l + 1)
                    }, [
                      f("i", {
                        class: S(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                      }, null, 2)
                    ], 8, wA),
                    a.isDocument ? (g(), b("span", AA, [
                      f("i", {
                        class: S(["bi bi-filetype-" + a.types.default.extension])
                      }, null, 2)
                    ])) : a.isImage ? (g(), b("span", TA, [...t[12] || (t[12] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ])])) : a.isVideo ? (g(), b("span", FA, [...t[13] || (t[13] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ])])) : T("", !0),
                    yt(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
                      "onUpdate:modelValue": (c) => a.title = c,
                      onInput: (c) => e.slug(a),
                      onKeydown: t[4] || (t[4] = oi(Yt(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, xA), [
                      [ge, a.title]
                    ]),
                    !a.isDocument && a.types && a.types[e.params.thumbnail] ? (g(), b("span", CA, [
                      a.types.default.url ? (g(), b("a", {
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
                        }, null, 8, kA)
                      ], 8, OA)) : (g(), b("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "transparent-background",
                        src: a.types[e.params.thumbnail].data,
                        alt: a.name
                      }, null, 8, NA))
                    ])) : T("", !0),
                    e.params.tags ? (g(), b("div", SA, [
                      f("button", LA, [
                        t[14] || (t[14] = f("i", { class: "bi bi-tag" }, null, -1)),
                        wt(" " + D(a.tags ? a.tags.length : 0), 1)
                      ]),
                      f("ul", IA, [
                        f("li", null, [
                          (g(!0), b(ht, null, mt(e.params.tags, (c) => (g(), b("span", {
                            key: c,
                            class: "dropdown-item cursor-pointer",
                            onClick: (d) => e.dropdownSelectToggleOne(a.tags, c.value)
                          }, [
                            a.tags && a.tags.indexOf(c.value) >= 0 ? (g(), b("i", DA)) : (g(), b("i", MA)),
                            wt(" " + D(e.translate(c.label ? c.label : c.value)), 1)
                          ], 8, $A))), 128))
                        ]),
                        t[15] || (t[15] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectAll(a.tags, e.params.tags)
                          }, D(e.translate("Select all")), 9, RA)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectClear(a.tags)
                          }, D(e.translate("Unselect all")), 9, BA)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectInvert(a.tags, e.params.tags)
                          }, D(e.translate("Invert all")), 9, qA)
                        ])
                      ])
                    ])) : T("", !0),
                    f("div", PA, [
                      t[16] || (t[16] = f("button", {
                        class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, [
                        f("i", { class: "bi bi-list" })
                      ], -1)),
                      f("ul", VA, [
                        f("li", jA, [
                          f("small", UA, [
                            lr(o, { file: a }, null, 8, ["file"])
                          ])
                        ])
                      ])
                    ]),
                    f("button", {
                      class: "btn btn-sm btn-outline-danger border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 px-2",
                      onClick: (c) => e.remove(l),
                      type: "button"
                    }, [...t[17] || (t[17] = [
                      f("i", { class: "bi bi-x-circle" }, null, -1)
                    ])], 8, HA)
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (g(!0), b(ht, { key: 1 }, mt(e.files, (a, l) => (g(), b("div", {
          class: S([e.params.colclass ? e.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          f("div", WA, [
            a.loaded ? (g(), b("div", zA, [
              T("", !0),
              a.types && a.types[e.params.thumbnail] ? (g(), b("div", KA, [
                a.types.default.url ? (g(), b("a", {
                  key: 0,
                  target: "_blank",
                  href: a.types.default.url
                }, [
                  f("img", {
                    class: "img-fluid transparent-background",
                    src: a.types[e.params.thumbnail].url,
                    alt: a.name
                  }, null, 8, YA)
                ], 8, GA)) : (g(), b("img", {
                  key: 1,
                  class: "img-fluid transparent-background",
                  src: a.types[e.params.thumbnail].data,
                  alt: a.name
                }, null, 8, XA))
              ])) : T("", !0),
              a.isDocument ? (g(), b("div", ZA, [
                f("i", {
                  class: S(["bi bi-filetype-" + a.types.default.extension])
                }, null, 2)
              ])) : T("", !0),
              yt(f("input", {
                required: "text",
                class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
                "onUpdate:modelValue": (c) => a.title = c,
                onInput: (c) => e.slug(a),
                onKeydown: t[5] || (t[5] = oi(Yt(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, JA), [
                [ge, a.title]
              ]),
              f("div", QA, [
                f("span", tT, D(l + 1), 1),
                f("span", {
                  class: "cursor-pointer p-1 border border-end-0 h-100",
                  onClick: (c) => e.arrayItemMoveDown(e.files, l)
                }, [
                  f("i", {
                    class: S(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                  }, null, 2)
                ], 8, eT),
                f("span", {
                  class: "cursor-pointer p-1 border border-end-0 h-100",
                  onClick: (c) => e.arrayItemMoveUp(e.files, l + 1)
                }, [
                  f("i", {
                    class: S(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                  }, null, 2)
                ], 8, sT),
                e.params.tags ? (g(), b("div", nT, [
                  f("button", iT, [
                    t[21] || (t[21] = f("i", { class: "bi bi-tag" }, null, -1)),
                    wt(" " + D(a.tags ? a.tags.length : 0), 1)
                  ]),
                  f("ul", rT, [
                    f("li", null, [
                      (g(!0), b(ht, null, mt(e.params.tags, (c) => (g(), b("span", {
                        key: c,
                        class: "dropdown-item cursor-pointer",
                        onClick: (d) => e.dropdownSelectToggleOne(a.tags, c.value)
                      }, [
                        a.tags && a.tags.indexOf(c.value) >= 0 ? (g(), b("i", aT)) : (g(), b("i", lT)),
                        wt(" " + D(e.translate(c.label ? c.label : c.value)), 1)
                      ], 8, oT))), 128))
                    ]),
                    t[22] || (t[22] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectAll(a.tags, e.params.tags)
                      }, D(e.translate("Select all")), 9, cT)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectClear(a.tags)
                      }, D(e.translate("Unselect all")), 9, uT)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectInvert(a.tags, e.params.tags)
                      }, D(e.translate("Invert all")), 9, hT)
                    ])
                  ])
                ])) : T("", !0),
                f("div", dT, [
                  t[23] || (t[23] = f("button", {
                    class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
                    type: "button",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false"
                  }, [
                    f("i", { class: "bi bi-list" })
                  ], -1)),
                  f("ul", fT, [
                    f("li", pT, [
                      f("small", gT, [
                        lr(o, { file: a }, null, 8, ["file"])
                      ])
                    ])
                  ])
                ]),
                f("button", {
                  class: "btn btn-outline-danger border rounded-0 border-start-0 px-2 py-1",
                  onClick: (c) => e.remove(l),
                  type: "button"
                }, [...t[24] || (t[24] = [
                  f("i", { class: "bi bi-x-circle" }, null, -1)
                ])], 8, mT)
              ])
            ])) : (g(), b("div", bT, [...t[25] || (t[25] = [
              f("span", null, null, -1)
            ])]))
          ])
        ], 2))), 128))
      ])) : T("", !0),
      f("div", yT, [
        f("div", vT, [
          f("label", {
            for: e.uploadId,
            class: S([
              { "disabled bg-secondary": e.files && e.params.limit <= e.files.length },
              "btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone",
              { "vsa-drop-zone-active": e.isDragging }
            ]),
            onDragover: t[6] || (t[6] = Yt(() => {
            }, ["prevent"])),
            onDragenter: t[7] || (t[7] = Yt(() => {
            }, ["prevent"])),
            onDrop: t[8] || (t[8] = Yt((...a) => e.handleDrop && e.handleDrop(...a), ["prevent"]))
          }, [
            e.files && e.params.limit > e.files.length ? (g(), b("span", ET, [
              t[29] || (t[29] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              wt(" " + D(e.params.text) + " ", 1),
              e.params.limit ? (g(), b("small", wT, [
                t[26] || (t[26] = wt(" ( ", -1)),
                f("strong", AT, D(e.files.length), 1),
                t[27] || (t[27] = wt(" / ", -1)),
                f("span", TT, D(e.params.limit), 1),
                t[28] || (t[28] = wt(" ) ", -1))
              ])) : T("", !0)
            ])) : (g(), b("span", FT, [...t[30] || (t[30] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              wt(" You've reached the upload limit ", -1)
            ])]))
          ], 42, _T),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[9] || (t[9] = (a) => e.toggleView())
          }, [
            e.params.ui != "list" ? (g(), b("i", xT)) : T("", !0),
            e.params.ui == "list" ? (g(), b("i", CT)) : T("", !0)
          ]),
          f("button", {
            disabled: !e.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[10] || (t[10] = (a) => e.resetConfirm())
          }, [...t[31] || (t[31] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ])], 8, OT)
        ]),
        f("div", kT, [
          f("small", null, [
            e.params.accept ? (g(), b("div", NT, [
              t[32] || (t[32] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (g(!0), b(ht, null, mt(e.params.accept, (a) => (g(), b("strong", {
                class: "ms-1 text-muted",
                key: a
              }, D(a), 1))), 128))
            ])) : T("", !0),
            T("", !0)
          ])
        ])
      ]),
      e.uploadId ? (g(), b("input", {
        key: 2,
        multiple: "",
        style: { opacity: "0", height: "1px", width: "1px" },
        id: e.uploadId,
        type: "file",
        accept: e.getAcceptMimeTypes(e.params.accept),
        onChange: t[11] || (t[11] = (...a) => e.handleFileChange && e.handleFileChange(...a))
      }, null, 40, ST)) : T("", !0)
    ], 2)
  ]);
}
const IT = /* @__PURE__ */ Se(sA, [["render", LT]]), $T = {
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
      return tn(e, t, this.settings, this);
    },
    // translate(key, vars, language) {
    //   return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
    // },
    async selectOptions(e, t) {
      return typeof e == "function" ? await e(this.item, t, this) : e;
    },
    async fetchCustom(e, t) {
      const s = await fetch(
        us("GET", { url: e }, t),
        cs("GET", this.settings.form.api, null, this.auth)
      ), n = await Tn(s);
      if (!Fn(s, n.data))
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
}, DT = $T, MT = ["name", "id", "disabled", "readonly", "required"], RT = ["value"];
function BT(e, t, s, n, i, r) {
  return yt((g(), b("select", {
    class: S(["form-select", e.getValueOrFunction(e.field.inputclass ? e.field.inputclass : "", { field: e.field, item: e.item })]),
    name: e.field.name,
    id: e.formId + "_" + e.field.name,
    onChange: t[0] || (t[0] = (o) => e.handleChange(o)),
    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.newitem = o),
    disabled: e.field.disabled,
    readonly: e.field.readonly,
    required: e.field.required
  }, [
    (g(!0), b(ht, null, mt(e.options, (o) => (g(), b("option", {
      class: S(e.getValueOrFunction(e.field.optionclass ? e.field.optionclass : "", { field: e.field, item: e.item, option: o })),
      key: o,
      value: o.value
    }, D(o.label ? o.label : o.value), 11, RT))), 128))
  ], 42, MT)), [
    [Ge, e.newitem]
  ]);
}
const ud = /* @__PURE__ */ Se(DT, [["render", BT]]), qT = {
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
      return tn(e, t, this.settings, this);
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
      Ha(e, t);
    },
    arrayItemMoveDown(e, t) {
      Wa(e, t);
    }
  },
  components: {
    VuAdminFormSelect: ud
  }
}, PT = qT, VT = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, jT = { class: "col-10" }, UT = { class: "row g-1 d-flex align-items-center justify-content-between" }, HT = { class: "col-10" }, WT = { class: "row g-1 d-flex align-items-center justify-content-between" }, zT = ["innerHTML"], KT = {
  key: 1,
  class: "input-group input-group-sm"
}, GT = ["type", "required", "placeholder", "onUpdate:modelValue"], YT = { class: "col-2 text-nowrap text-end" }, XT = ["onClick"], ZT = ["onClick"], JT = ["onClick"], QT = { key: 0 }, t2 = { class: "row g-1 d-flex align-items-center justify-content-between" }, e2 = { class: "col-10" }, s2 = { class: "row g-1 d-flex align-items-center justify-content-between" }, n2 = { class: "input-group input-group-sm" }, i2 = {
  key: 0,
  class: "input-group-text"
}, r2 = ["type", "placeholder", "onUpdate:modelValue"], o2 = {
  key: 3,
  class: "input-group-text"
}, a2 = { class: "col-2" };
function l2(e, t, s, n, i, r) {
  const o = Be("VuAdminFormSelect");
  return g(), b("div", null, [
    f("div", VT, [
      f("div", jT, [
        f("div", UT, [
          (g(!0), b(ht, null, mt(e.field.elements, (a) => (g(), b("div", {
            key: a,
            class: S(a.class || "col")
          }, [
            f("small", null, D(a.placeholder ? a.placeholder : a.prefix ? a.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = f("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (g(!0), b(ht, null, mt(e.value, (a, l) => (g(), b("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: l
    }, [
      f("div", HT, [
        f("div", WT, [
          (g(!0), b(ht, null, mt(a, (c, d) => (g(), b("div", {
            key: d,
            class: S(e.field.elements[d].class || "col")
          }, [
            e.field.elements[d].template ? (g(), b("span", {
              key: 0,
              innerHTML: e.getValueOrFunction(e.field.elements[d].template, e.value[l])
            }, null, 8, zT)) : (g(), b("div", KT, [
              e.field.elements[d].type == "select" && e.value[l][d] ? (g(), hs(o, {
                key: 0,
                modelValue: e.value[l][d],
                "onUpdate:modelValue": (h) => e.value[l][d] = h,
                field: e.field.elements[d],
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : yt((g(), b("input", {
                key: 1,
                type: e.field.elements[d].type,
                required: e.field.elements[d].required,
                placeholder: e.field.elements[d].placeholder || d,
                class: "form-control",
                "onUpdate:modelValue": (h) => e.value[l][d] = h
              }, null, 8, GT)), [
                [qe, e.value[l][d]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      f("div", YT, [
        e.field.sortable ? (g(), b("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (c) => e.arrayItemMoveUp(e.value, l)
        }, [...t[2] || (t[2] = [
          f("i", { class: "bi bi-arrow-up" }, null, -1)
        ])], 8, XT)) : T("", !0),
        e.field.sortable ? (g(), b("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (c) => e.arrayItemMoveDown(e.value, l + 1)
        }, [...t[3] || (t[3] = [
          f("i", { class: "bi bi-arrow-down" }, null, -1)
        ])], 8, ZT)) : T("", !0),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (c) => e.arrayRemoveItem(e.value, l)
        }, [...t[4] || (t[4] = [
          f("i", { class: "bi bi-trash" }, null, -1)
        ])], 8, JT)
      ])
    ]))), 128)),
    e.item[e.field.name] && e.item[e.field.name].length ? (g(), b("hr", QT)) : T("", !0),
    f("div", t2, [
      f("div", e2, [
        f("div", s2, [
          (g(!0), b(ht, null, mt(e.field.elements, (a) => (g(), b("div", {
            key: a,
            class: S(a.class || "col")
          }, [
            f("div", n2, [
              a.prefix ? (g(), b("span", i2, D(a.prefix), 1)) : T("", !0),
              a.type == "select" && (!a.relation || a.relation && a.relation.items) ? (g(), hs(o, {
                key: 1,
                modelValue: a.value,
                "onUpdate:modelValue": (l) => a.value = l,
                field: a,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : yt((g(), b("input", {
                key: 2,
                type: a.type,
                placeholder: a.placeholder || a.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (l) => a.value = l
              }, null, 8, r2)), [
                [qe, a.value]
              ]),
              a.suffix ? (g(), b("span", o2, D(a.suffix), 1)) : T("", !0)
            ]),
            T("", !0)
          ], 2))), 128))
        ])
      ]),
      f("div", a2, [
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-primary my-1 w-100",
          onClick: t[0] || (t[0] = (a) => e.arrayAddNewItem(e.field, e.item))
        }, [...t[5] || (t[5] = [
          f("i", { class: "bi bi-plus" }, null, -1)
        ])])
      ])
    ])
  ]);
}
const c2 = /* @__PURE__ */ Se(PT, [["render", l2]]), u2 = {
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
      return tn(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return Pn(e, this.settings.translate, t, s || this.settings.language);
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
      Ha(e, t);
    },
    arrayItemMoveDown(e, t) {
      Wa(e, t);
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
      Pa(t, n);
    },
    dropdownSelectAll(e, t) {
      Va(e, t);
    },
    dropdownSelectInvert(e, t) {
      ja(e, t);
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Ua(e);
    }
  },
  components: {
    HtmlEditor: Sw,
    FileUpload: IT,
    VuAdminFormSelect: ud,
    VuAdminFormList: c2
  }
}, h2 = u2, d2 = { class: "row m-1" }, f2 = ["innerHTML"], p2 = {
  key: 1,
  class: "row"
}, g2 = { class: "form-group pb-3" }, m2 = { key: 0 }, b2 = {
  key: 0,
  class: "badge text-secondary fw-light"
}, y2 = ["for", "innerHTML"], v2 = {
  key: 1,
  class: "input-group"
}, _2 = ["innerHTML"], E2 = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], w2 = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "disabled", "readonly", "required"], A2 = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "disabled", "readonly", "required"], T2 = {
  key: 4,
  class: "form-check"
}, F2 = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "disabled", "readonly", "required"], x2 = ["for"], C2 = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "disabled", "required"], O2 = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], k2 = ["innerHTML"], N2 = { class: "dropdown d-inline-block" }, S2 = { class: "dropdown-menu" }, L2 = ["onClick"], I2 = {
  key: 0,
  class: "bi bi-check-square"
}, $2 = {
  key: 1,
  class: "bi bi-square"
}, D2 = ["onClick"], M2 = ["onClick"], R2 = ["onClick"], B2 = { key: 0 }, q2 = ["onClick"], P2 = { key: 6 }, V2 = { key: 0 }, j2 = ["for"], U2 = ["name", "id", "onUpdate:modelValue"], H2 = ["onClick"], W2 = ["innerHTML"], z2 = {
  key: 8,
  class: "p-1"
}, K2 = ["innerHTML"];
function G2(e, t, s, n, i, r) {
  const o = Be("VuAdminFormSelect"), a = Be("HtmlEditor"), l = Be("FileUpload"), c = Be("VuAdminFormList");
  return g(), b("div", d2, [
    (g(!0), b(ht, null, mt(e.settings.form.groups, (d) => (g(), b("div", {
      key: d,
      class: S([d.class ? d.class : "col-md-12"])
    }, [
      d.title ? (g(), b("h2", {
        key: 0,
        class: "form-row-title mb-4 fw-lighter",
        innerHTML: d.title ? d.title : ""
      }, null, 8, f2)) : T("", !0),
      e.item && d.fields ? (g(), b("div", p2, [
        (g(!0), b(ht, null, mt(d.fields, (h) => (g(), b("div", {
          class: S([e.getValueOrFunction(h.class ? h.class : "col-md-12"), "input_type_" + h.type]),
          key: h
        }, [
          f("div", g2, [
            h.label ? (g(), b("span", m2, [
              ["html", "image", "upload"].indexOf(h.type) >= 0 ? (g(), b("label", {
                key: 0,
                class: S([{ required: h.required }, "form-label text-secondary mb-1"])
              }, [
                wt(D(h.label ? h.label : e.translate(h.name)) + " ", 1),
                h.maxlength ? (g(), b("span", b2, D(e.item[h.name] ? e.item[h.name].length : 0) + " / " + D(h.maxlength), 1)) : T("", !0)
              ], 2)) : (g(), b("label", {
                key: 1,
                class: S([{ required: h.required }, "form-label text-secondary mb-1"]),
                for: e.formId + "_" + h.name,
                innerHTML: e.getValueOrFunction(h.label ? h.label : e.translate(h.name), { field: h, item: e.item })
              }, null, 10, y2))
            ])) : T("", !0),
            ["html", "image", "list", "addresses", "template"].indexOf(h.type) < 0 ? (g(), b("div", v2, [
              h.prefix ? (g(), b("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.prefix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, _2)) : T("", !0),
              h.type == "text" ? yt((g(), b("input", {
                key: 1,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "text",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (m) => e.item[h.name] = m,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, E2)), [
                [ge, e.item[h.name]]
              ]) : T("", !0),
              h.type == "number" ? yt((g(), b("input", {
                key: 2,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "number",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (m) => e.item[h.name] = m,
                min: h.min,
                max: h.max,
                step: h.step,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, w2)), [
                [ge, e.item[h.name]]
              ]) : T("", !0),
              ["date", "datetime", "datetime-local"].indexOf(h.type) >= 0 ? yt((g(), b("input", {
                key: 3,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: h.type,
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (m) => e.item[h.name] = m,
                min: h.min,
                max: h.max,
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, null, 10, A2)), [
                [qe, e.item[h.name]]
              ]) : T("", !0),
              h.type == "checkbox" ? (g(), b("div", T2, [
                yt(f("input", {
                  class: S(["form-check-input", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                  type: "checkbox",
                  name: h.name,
                  id: e.formId + "_" + h.name,
                  "true-value": h.true != null ? h.true : !0,
                  "false-value": h.false != null ? h.false : !1,
                  "onUpdate:modelValue": (m) => e.item[h.name] = m,
                  disabled: h.disabled,
                  readonly: h.readonly,
                  required: h.required
                }, null, 10, F2), [
                  [cr, e.item[h.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: e.formId + "_" + h.name
                }, D(h.checkbox), 9, x2)
              ])) : T("", !0),
              h.type == "email" ? yt((g(), b("input", {
                key: 5,
                autocomplete: "on",
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                type: "email",
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (m) => e.item[h.name] = m,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                readonly: h.readonly,
                disabled: h.disabled,
                required: h.required
              }, null, 10, C2)), [
                [ge, e.item[h.name]]
              ]) : T("", !0),
              h.type == "select" && (!h.relation || h.relation && h.relation.items) ? (g(), hs(o, {
                key: 6,
                modelValue: e.item[h.name],
                "onUpdate:modelValue": (m) => e.item[h.name] = m,
                field: h,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                auth: e.auth
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId", "auth"])) : T("", !0),
              h.type == "textarea" ? yt((g(), b("textarea", {
                key: 7,
                class: S(["form-control", e.getValueOrFunction(h.inputclass ? h.inputclass : "", { field: h, item: e.item })]),
                name: h.name,
                id: e.formId + "_" + h.name,
                "onUpdate:modelValue": (m) => e.item[h.name] = m,
                rows: h.rows,
                minlength: h.minlength,
                maxlength: h.maxlength,
                placeholder: h.placeholder ? h.placeholder : "",
                disabled: h.disabled,
                readonly: h.readonly,
                required: h.required
              }, "              ", 10, O2)), [
                [ge, e.item[h.name]]
              ]) : T("", !0),
              h.suffix ? (g(), b("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.suffix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, k2)) : T("", !0)
            ])) : T("", !0),
            h.type == "html" ? (g(), hs(a, {
              key: 2,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (m) => e.item[h.name] = m,
              class: S([h.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : T("", !0),
            h.type == "image" || h.type == "upload" ? (g(), hs(l, {
              key: 3,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (m) => e.item[h.name] = m,
              class: S([h.class]),
              field: h,
              settings: e.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : T("", !0),
            h.type == "list" && (!h.relation || h.relation && h.relation.items) ? (g(), hs(c, {
              key: 4,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (m) => e.item[h.name] = m,
              field: h,
              item: e.item,
              settings: e.settings,
              formId: e.formId
            }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : T("", !0),
            h.type == "dropdown" && e.item[h.name] ? (g(), b("div", {
              key: 5,
              class: S([h.class])
            }, [
              f("div", N2, [
                f("button", {
                  class: S(["btn dropdown-toggle", [h.dropdown ? h.dropdown.class : ""]]),
                  type: "button",
                  "data-bs-auto-close": "outside",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, [
                  f("span", null, D(e.translate(h.dropdown ? h.dropdown.label : "Select")), 1)
                ], 2),
                f("ul", S2, [
                  f("li", null, [
                    (g(!0), b(ht, null, mt(h.options, (m) => (g(), b("span", {
                      key: m,
                      class: S(["dropdown-item cursor-pointer", { selected: e.item[h.name].indexOf(m.value) >= 0 }]),
                      onClick: (v) => e.dropdownSelectToggleOne(h, e.item[h.name], m)
                    }, [
                      e.item[h.name].indexOf(m.value) >= 0 ? (g(), b("i", I2)) : (g(), b("i", $2)),
                      wt(" " + D(e.translate(m.label ? m.label : m.value)), 1)
                    ], 10, L2))), 128))
                  ]),
                  t[0] || (t[0] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (m) => e.dropdownSelectAll(e.item[h.name], h.options)
                    }, D(e.translate("Select all")), 9, D2)
                  ]),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (m) => e.dropdownSelectClear(e.item[h.name])
                    }, D(e.translate("Unselect all")), 9, M2)
                  ]),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (m) => e.dropdownSelectInvert(e.item[h.name], h.options)
                    }, D(e.translate("Invert all")), 9, R2)
                  ])
                ])
              ]),
              e.item[h.name].length ? (g(), b("span", B2, [
                (g(!0), b(ht, null, mt(e.item[h.name], (m) => (g(), b("span", {
                  class: S(["cursor-pointer", [h.list ? h.list.class : ""]]),
                  key: m,
                  onClick: (v) => e.dropdownSelectToggleOne(h, e.item[h.name], m)
                }, [
                  wt(D(e.translate(m)) + " ", 1),
                  t[1] || (t[1] = f("i", { class: "bi bi-x" }, null, -1))
                ], 10, q2))), 128))
              ])) : T("", !0)
            ], 2)) : T("", !0),
            h.type == "addresses" ? (g(), b("span", P2, [
              e.item[h.name] ? (g(), b("div", V2, [
                (g(!0), b(ht, null, mt(e.item[h.name], (m) => (g(), b("div", { key: m }, [
                  wt(D(m) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: e.formId + "_" + h.name
                  }, D(h.label), 9, j2),
                  yt(f("input", {
                    class: "form-control",
                    type: "text",
                    name: h.name,
                    id: e.formId + "_" + h.name,
                    "onUpdate:modelValue": (v) => m.country = v
                  }, null, 8, U2), [
                    [ge, m.country]
                  ])
                ]))), 128))
              ])) : T("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (m) => e.insertAddress(h.name)
              }, " Add ", 8, H2)
            ])) : T("", !0),
            h.type == "template" ? (g(), b("div", {
              key: 7,
              innerHTML: e.getValueOrFunction(h.template, {
                field: h,
                item: e.item
              })
            }, null, 8, W2)) : T("", !0),
            h.description ? (g(), b("div", z2, [
              f("small", null, [
                f("i", {
                  class: "text-muted",
                  innerHTML: e.getValueOrFunction(h.description, {
                    field: h,
                    item: e.item
                  })
                }, null, 8, K2)
              ])
            ])) : T("", !0)
          ])
        ], 2))), 128))
      ])) : T("", !0)
    ], 2))), 128))
  ]);
}
const Y2 = /* @__PURE__ */ Se(h2, [["render", G2]]), X2 = {
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
      return Pn(e, this.settings.translate, t, s || this.settings.language);
    },
    getValueOrFunction(e, t) {
      return tn(e, t, this.settings, this);
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
    handleFormErrors(e) {
      if (e == null)
        return;
      const t = 14500, s = "danger";
      if (typeof e == "string") {
        this.addFormMessage(e, t, s);
        return;
      }
      if (Array.isArray(e)) {
        for (let n of e)
          n && typeof n == "object" && n.message ? this.addFormMessage(
            n.message,
            n.timeout || t,
            n.priority || s
          ) : typeof n == "string" ? this.addFormMessage(n, t, s) : n && typeof n == "object" && this.addFormMessage(
            JSON.stringify(n),
            t,
            s
          );
        return;
      }
      if (typeof e == "object" && e.message) {
        this.addFormMessage(
          e.message,
          e.timeout || t,
          e.priority || s
        );
        return;
      }
      this.addFormMessage(
        String(e),
        t,
        s
      );
    },
    addMessage(e, t, s, n, i) {
      clearTimeout(this.messageTimeout);
      const r = `${Date.now().toString(36)}-${oh(8)}`;
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
          us("GET", t.form.api, e),
          cs("GET", t.api, null, s)
        ).catch((a) => {
        }), i = await Tn(n);
        if (Fn(n, i.data, "form") || !i.data)
          return this.formNoWait(), !1;
        t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, n);
        let o;
        t.form.api.input.item ? o = typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, n) : o = i.data;
        for (let a of t.form.groups)
          for (let l of a.fields)
            l.type === "dropdown" && !o[l.name] && (o[l.name] = []), l.relation && t.relations[l.relation.config] && (l.relation = Nr(t.relations[l.relation.config], l.relation), console.log(l.relation, s), await this.fetchRelation(l, [o], s));
        this.item = gr(o), this.itemOriginal = Object.assign({}, o), this.loaded = !0, this.formNoWait();
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
        ), this.item = gr(s), this.itemOriginal = Object.assign({}, s)), e === !0 && this.modalWindow.hide(), this.reloadTable();
      }, (t) => {
        this.handleFormErrors(t);
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
          us(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          cs("DELETE", this.settings.api, null, this.auth)
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
    VuAdminFormGroup: Y2
  }
}, Z2 = X2, J2 = ["id", "data-bs-theme"], Q2 = { class: "modal-header" }, tF = {
  key: 0,
  class: "modal-title"
}, eF = ["innerHTML"], sF = { key: 1 }, nF = { key: 2 }, iF = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, rF = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, oF = ["innerHTML"], aF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, lF = {
  key: 0,
  class: "modal-header bg-body sticky-top"
}, cF = {
  key: 0,
  class: "d-inline-block m-1"
}, uF = { class: "dropdown d-inline-block" }, hF = ["innerHTML"], dF = { class: "dropdown-menu text-start" }, fF = { class: "me-2 text-muted" }, pF = ["innerHTML"], gF = ["disabled", "onClick"], mF = {
  key: 1,
  class: "dropdown d-inline-block"
}, bF = { class: "mx-1" }, yF = { class: "dropdown-menu px-2" }, vF = ["onClick"], _F = {
  key: 1,
  class: "modal-body custom-scroll"
}, EF = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, wF = {
  key: 3,
  class: "bg-light text-dark"
};
function AF(e, t, s, n, i, r) {
  const o = Be("VuAdminFormGroup");
  return e.item ? (g(), b("form", {
    key: 0,
    ref: "form",
    id: e.formId,
    class: S(["form", [e.settings.form.class, { wait: e.ui.wait.form }]]),
    onSubmit: t[1] || (t[1] = Yt((...a) => e.submitItem && e.submitItem(...a), ["prevent"])),
    "data-bs-theme": [e.settings.theme]
  }, [
    f("div", {
      class: S(["vua-overlay", { blocked: e.ui.block.form }])
    }, null, 2),
    f("div", Q2, [
      e.loaded ? (g(), b("h5", tF, [
        e.settings.form.title && typeof e.settings.form.title == "function" ? (g(), b("span", {
          key: 0,
          innerHTML: e.settings.form.title(e.item, e.settings)
        }, null, 8, eF)) : T("", !0),
        e.settings.form.title && typeof e.settings.form.title == "string" ? (g(), b("span", sF, D(e.translate(e.settings.form.title)), 1)) : T("", !0),
        e.settings.form.title ? T("", !0) : (g(), b("span", nF, D(e.translate("Edit")), 1)),
        e.item[e.settings.pkey] ? (g(), b("small", iF, [
          t[2] || (t[2] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          wt(" " + D(e.item[e.settings.pkey]), 1)
        ])) : T("", !0)
      ])) : T("", !0),
      e.message.form ? (g(), b("span", rF, [
        f("span", {
          class: S(["text-" + e.message.form.priority])
        }, [
          t[3] || (t[3] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: e.message.form.msg
          }, null, 8, oF)
        ], 2)
      ])) : T("", !0),
      yt(f("span", aF, [...t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ])], 512), [
        [Vs, e.ui.wait.form]
      ]),
      t[5] || (t[5] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    e.item ? (g(), b("div", lF, [
      e.settings.form.control ? (g(), b("div", {
        key: 0,
        class: S(["w-100", e.settings.form.control.class == null ? "d-flex justify-content-center" : e.settings.form.control.class])
      }, [
        e.messages.form.length ? (g(), b("span", cF, [
          f("div", uF, [
            f("button", {
              class: S(["btn btn-sm dropdown-toggle", ["btn-" + e.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: e.messages.form.length + " " + (e.messages.form.length > 1 ? e.translate("messages") : e.translate("message"))
            }, null, 10, hF),
            f("ul", dF, [
              (g(!0), b(ht, null, mt(e.messages.form, (a) => (g(), b("li", { key: a }, [
                f("span", {
                  class: S(["dropdown-item disabled", ["text-" + a.priority]])
                }, [
                  f("small", fF, D(a.datetime), 1),
                  f("span", {
                    innerHTML: a.msg
                  }, null, 8, pF)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : T("", !0),
        (g(!0), b(ht, null, mt(e.settings.form.control.buttons, (a) => (g(), b("span", {
          key: a.action
        }, [
          a.dropdowns ? T("", !0) : (g(), b("button", {
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
            wt(" " + D(e.translate(a.title)), 1)
          ], 10, gF)),
          a.dropdowns ? (g(), b("div", mF, [
            f("button", {
              type: "button",
              class: S([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", bF, [
                f("i", {
                  class: S([
                    a.icon !== void 0 ? e.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : e.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                wt(" " + D(e.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", yF, [
              (g(!0), b(ht, null, mt(a.dropdowns, (l) => (g(), b("li", { key: l }, [
                f("span", {
                  class: S([l.class ? l.class : ""]),
                  onClick: (c) => e.formAction(l, {
                    button: a,
                    item: e.item,
                    form: this,
                    $event: c
                  })
                }, [
                  l.icon ? (g(), b("i", {
                    key: 0,
                    class: S([l.icon])
                  }, null, 2)) : T("", !0),
                  wt(" " + D(e.translate(l.title)), 1)
                ], 10, vF)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0)
    ])) : T("", !0),
    e.settings.form ? (g(), b("div", _F, [
      e.settings.form.visible && e.settings.form.groups ? (g(), hs(o, {
        key: 0,
        modelValue: e.item,
        "onUpdate:modelValue": t[0] || (t[0] = (a) => e.item = a),
        formid: e.formId,
        settings: e.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : T("", !0)
    ])) : T("", !0),
    e.item ? (g(), b("div", EF)) : T("", !0),
    e.settings.debug > 1 ? (g(), b("pre", wF, "        " + D(e.item) + `
    `, 1)) : T("", !0)
  ], 42, J2)) : T("", !0);
}
const hd = /* @__PURE__ */ Se(Z2, [["render", AF]]), TF = {
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
      return Pn(e, this.settings.translate, t, s || this.settings.language);
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
}, FF = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, xF = { class: "dropdown d-inline-block m-1" }, CF = { class: "mx-1" }, OF = { key: 0 }, kF = {
  key: 0,
  class: "dropdown-menu text-end"
}, NF = ["onClick"], SF = { class: "ms-2" }, LF = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, IF = {
  key: 1,
  class: "bi bi-circle ms-2"
}, $F = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, DF = { class: "pagination pagination-sm m-1" }, MF = { class: "page-item" }, RF = ["innerHTML"], BF = { class: "page-item" }, qF = ["innerHTML"], PF = ["onClick"], VF = { class: "page-item" }, jF = ["innerHTML"], UF = {
  key: 0,
  class: "page-item"
}, HF = ["innerHTML"];
function WF(e, t, s, n, i, r) {
  return s.config.pagination.hidden ? T("", !0) : (g(), b("nav", FF, [
    f("div", null, [
      f("div", xF, [
        f("button", {
          type: "button",
          class: S(["btn btn-sm btn-secondary", { "dropdown-toggle": s.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          yt(f("span", CF, [
            f("strong", null, D(s.config.pagination.from) + "-" + D(s.config.pagination.to), 1),
            s.config.pagination.total ? (g(), b("span", OF, " / " + D(s.config.pagination.total), 1)) : T("", !0)
          ], 512), [
            [Vs, s.config.pagination.from > 0]
          ])
        ], 2),
        s.config.pagination.limits ? (g(), b("ul", kF, [
          f("li", null, [
            (g(!0), b(ht, null, mt(s.config.pagination.limits, (o) => (g(), b("span", {
              class: S(["dropdown-item cursor-pointer", { selected: s.config.pagination.limit == o }]),
              key: o,
              onClick: (a) => r.setPageLimit(o)
            }, [
              f("strong", null, D(o), 1),
              f("small", SF, D(r.translate("row")) + "/" + D(r.translate("page")), 1),
              s.config.pagination.limit == o ? (g(), b("i", LF)) : T("", !0),
              s.config.pagination.limit != o ? (g(), b("i", IF)) : T("", !0)
            ], 10, NF))), 128))
          ])
        ])) : T("", !0)
      ]),
      yt(f("div", $F, [...t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ])], 512), [
        [Vs, s.ui && s.ui.wait.table]
      ])
    ]),
    f("ul", DF, [
      f("li", MF, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, RF)
        ], 2)
      ]),
      f("li", BF, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(s.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, qF)
        ], 2)
      ]),
      (g(!0), b(ht, null, mt(s.config.pagination.numbers, (o) => (g(), b("li", {
        key: o,
        class: "page-item"
      }, [
        f("a", {
          class: S(["page-link cursor-pointer", {
            disabled: o > s.config.pagination.pages,
            current: o == s.config.pagination.page
          }]),
          onClick: (a) => r.setPage(o)
        }, D(o), 11, PF)
      ]))), 128)),
      f("li", VF, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(s.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, jF)
        ], 2)
      ]),
      s.config.pagination.total ? (g(), b("li", UF, [
        f("a", {
          class: S(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(s.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, HF)
        ], 2)
      ])) : T("", !0)
    ])
  ]));
}
const zF = /* @__PURE__ */ Se(TF, [["render", WF]]), Qo = qa(), KF = {
  name: "VuAdminTable",
  props: {
    settings: Object,
    auth: Object
  },
  components: {
    VuAdminForm: hd,
    VuAdminTablePagination: zF
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
    let e = pr(1e5);
    this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e;
  },
  mounted() {
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Ks(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
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
      Qo.emit(e + "-" + t, {
        from: this.settings.entity,
        payload: s
      });
    },
    listenEvent() {
      if (Qo.on(`EDIT-${this.settings.entity}`, (e) => {
        this.editItem(e.payload.item);
      }), this.settings.table && this.settings.table.filterListen) {
        const e = this.settings.table.filterListen, t = `FILTER-${this.settings.entity}`;
        this._filterListenerRegistered || (Qo.on(t, (s) => {
          if (s.from === e.entity && s.payload) {
            const { field: n, value: i } = s.payload, r = this.settings.table.columns.find((o) => o.name === n);
            r && r.filter && (r.filter.value = i, r.filter.operator = r.filter.default_operator || "=", this.reloadTable());
          }
        }), this._filterListenerRegistered = !0);
      }
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
      return tn(e, t, this.settings, this);
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
      if (t.$event && t.$event.stopPropagation(), e.filterLink && t.item) {
        const n = t.item[e.filterLink.value || this.settings.pkey];
        n != null && this.sendEvent("FILTER", e.filterLink.entity, {
          field: e.filterLink.field,
          value: n
        });
        return;
      }
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
          t.relation = Nr(this.settings.relations[t.relation.config], t.relation);
          for (let n of e)
            n[t.relation.local] && s.push(n[t.relation.local]);
          t.relation.ids = p1(s), await this.fetchRelation(t, e, this.auth);
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
        us("GET", e.table.api, null, t),
        cs("GET", e.table.api, null, n)
      ), r = await Tn(i), o = Fn(i, r.data);
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
      let l = u1(a);
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
        n.filter = JSON.stringify(i), g1(n, {
          column: e
        });
        const r = await fetch(
          us("GET", e.relation.api, null, n),
          cs("GET", e.relation.api, null, s)
        );
        if (r.status !== 200)
          throw new Error(
            this.translate("Response status: " + r.status)
          );
        const o = await Tn(r);
        if (Fn(r, o.data) || !o.data)
          return;
        if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? o.data[e.relation.api.input.items] : e.relation.api.input.items(o.data, r) : e.relation.items = o.data, t && t[0])
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
          us(
            "DELETE",
            this.settings.form.api,
            s,
            t
          ),
          cs("DELETE", this.settings.api, null, this.auth)
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
          us("DELETE", this.settings.table.api),
          cs("DELETE", this.settings.api, {
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
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = h1(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, e), !this.settings.form.api.output.item)
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
          us(l, this.settings.form.api, r, n),
          cs(l, this.settings.form.api, {
            body: o
          }, this.auth)
        );
        const c = await Tn(a), d = Fn(a, c.data);
        if (d) {
          s && s(d, e, n, a);
          return;
        }
        if (c.error) {
          s && s(c.error, e, n, a);
          return;
        }
        this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(c.data, n), t && t(c.data, a);
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
          us("PUT", this.settings.table.api),
          cs("PUT", this.settings.table.api, {
            body: JSON.stringify({
              item: t,
              ids: this.selected
            })
          }, this.auth)
        ).catch((r) => {
          console.error(r), this.addTableMessage(r.message, 3500, "danger", r);
        }), n = await Tn(s), i = Fn(s, n.data);
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
      e.multiple ? Pa(e.value, s) : e.value = e.value === s ? null : s, this.reloadTable();
    },
    dropdownSelectAll(e, t) {
      Va(e, t), this.reloadTable();
    },
    dropdownSelectInvert(e, t) {
      ja(e, t), this.reloadTable();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Ua(e), this.reloadTable();
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
        let n = d1(
          items,
          this.settings.table.exports[e.type].fields
        );
        f1(n, this.settings.entity + ".csv");
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
      const r = `${Date.now().toString(36)}-${oh(8)}`;
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
      return Pn(e, this.settings.translate, t, s || this.settings.language);
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
}, GF = ["data-bs-theme"], YF = { class: "vua-table-title" }, XF = { class: "d-flex align-items-center justify-content-between" }, ZF = { class: "d-inline-block" }, JF = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, QF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, tx = {
  key: 0,
  class: "d-inline-block"
}, ex = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, sx = ["innerHTML"], nx = { class: "dropdown d-inline-block" }, ix = ["innerHTML"], rx = { class: "dropdown-menu text-start" }, ox = { class: "me-2 text-muted" }, ax = ["innerHTML"], lx = ["onClick"], cx = {
  key: 1,
  class: "dropdown d-inline-block"
}, ux = { class: "mx-1" }, hx = { key: 0 }, dx = { class: "dropdown-menu" }, fx = ["onClick"], px = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, gx = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, mx = { class: "badge text-secondary fw-normal" }, bx = {
  key: 2,
  class: "dropdown d-inline-block"
}, yx = { class: "mx-1" }, vx = { class: "dropdown-menu" }, _x = ["onClick"], Ex = { class: "vua-table-header" }, wx = ["width"], Ax = ["onClick"], Tx = ["innerHTML"], Fx = {
  key: 0,
  class: "bi bi-arrow-down"
}, xx = {
  key: 1,
  class: "bi bi-arrow-up"
}, Cx = { key: 0 }, Ox = ["disabled", "onClick"], kx = {
  key: 0,
  class: "vua-table-filter"
}, Nx = ["width"], Sx = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, Lx = { class: "bi bi-check-all" }, Ix = { class: "bi bi-x-lg" }, $x = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, Dx = ["onUpdate:modelValue"], Mx = ["disabled", "onClick"], Rx = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, Bx = ["onUpdate:modelValue", "disabled"], qx = { value: "=" }, Px = { value: ">" }, Vx = { value: ">=" }, jx = { value: "<" }, Ux = { value: "<=" }, Hx = ["onUpdate:modelValue", "disabled"], Wx = ["value"], zx = ["onUpdate:modelValue", "disabled", "min", "max"], Kx = ["disabled", "onClick"], Gx = { key: 3 }, Yx = {
  key: 0,
  class: "dropdown"
}, Xx = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, Zx = { class: "dropdown-menu" }, Jx = ["onClick"], Qx = {
  key: 0,
  class: "bi bi-check-square"
}, tC = {
  key: 1,
  class: "bi bi-square"
}, eC = { key: 0 }, sC = { key: 1 }, nC = ["onClick"], iC = { key: 2 }, rC = ["onClick"], oC = { key: 3 }, aC = ["onClick"], lC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, cC = ["onUpdate:modelValue", "multiple"], uC = ["value"], hC = ["disabled", "onClick"], dC = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, fC = ["onUpdate:modelValue"], pC = { value: "=" }, gC = { value: ">" }, mC = { value: ">=" }, bC = { value: "<" }, yC = { value: "<=" }, vC = ["onUpdate:modelValue"], _C = ["value"], EC = ["type", "onUpdate:modelValue"], wC = ["disabled", "onClick"], AC = ["disabled", "onClick"], TC = { class: "align-middle" }, FC = ["data-label", "width", "onClick"], xC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, CC = ["innerHTML"], OC = { key: 1 }, kC = ["innerHTML"], NC = ["aria-valuenow", "aria-valuemax"], SC = { key: 0 }, LC = {
  key: 4,
  class: "input-group input-group-sm"
}, IC = ["innerHTML"], $C = {
  key: 1,
  class: "input-group-text"
}, DC = ["name", "onUpdate:modelValue", "onChange"], MC = ["type", "onChange", "onUpdate:modelValue"], RC = ["onChange", "onUpdate:modelValue"], BC = ["value"], qC = ["innerHTML"], PC = {
  key: 5,
  class: "input-group-text"
}, VC = ["name", "onUpdate:modelValue", "onChange"], jC = { key: 5 }, UC = ["disabled", "onClick"], HC = ["innerHTML"], WC = { key: 2 }, zC = { key: 0 }, KC = ["colspan"], GC = { class: "row g-3 align-items-center" }, YC = { class: "col-form-label" }, XC = ["type", "onUpdate:modelValue", "onChange"], ZC = ["onUpdate:modelValue", "onChange"], JC = ["onUpdate:modelValue", "onChange"], QC = ["value"], tO = ["innerHTML"], eO = {
  key: 0,
  class: "bg-light text-dark"
}, sO = {
  key: 0,
  class: "vua-table-bulk border-info"
}, nO = ["data-label", "width"], iO = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, rO = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, oO = ["type", "disabled", "onChange", "onUpdate:modelValue"], aO = ["disabled", "onChange", "onUpdate:modelValue"], lO = ["value"], cO = ["onClick"], uO = {
  key: 0,
  class: "bi bi-square text-secondary"
}, hO = {
  key: 1,
  class: "bi bi-check-square"
}, dO = { key: 2 }, fO = ["disabled", "onClick"], pO = ["innerHTML"], gO = { key: 2 }, mO = ["id"], bO = { class: "modal-dialog modal-xl" }, yO = { class: "modal-content h-100" };
function vO(e, t, s, n, i, r) {
  const o = Be("VuAdminTablePagination"), a = Be("VuAdminForm");
  return g(), b("div", null, [
    r.authAndSettings() ? (g(), b("div", {
      key: 0,
      class: S(["vua-table-container", [s.settings.class]]),
      "data-bs-theme": [s.settings.theme]
    }, [
      f("div", {
        class: S(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", YF, [
        f("div", XF, [
          f("div", ZF, [
            s.settings.table.title ? (g(), b("h5", JF, D(s.settings.table.title), 1)) : T("", !0),
            yt(f("div", QF, [...t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ])], 512), [
              [Vs, i.ui.wait.table && s.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (g(), b("div", tx, [
            i.message.table ? (g(), b("small", ex, [
              f("span", {
                class: S(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, sx)
              ], 2)
            ])) : T("", !0),
            f("div", nx, [
              f("button", {
                class: S(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, ix),
              f("ul", rx, [
                (g(!0), b(ht, null, mt(i.messages.table, (l) => (g(), b("li", { key: l }, [
                  f("span", {
                    class: S(["dropdown-item", ["text-" + l.priority]])
                  }, [
                    f("small", ox, D(l.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: l.msg
                    }, null, 8, ax)
                  ], 2)
                ]))), 128))
              ])
            ])
          ])) : T("", !0)
        ])
      ]),
      s.settings.table.control ? (g(), b("div", {
        key: 0,
        class: S(["vua-table-control", [s.settings.table.control.class]])
      }, [
        (g(!0), b(ht, null, mt(s.settings.table.control.buttons, (l) => (g(), b("span", {
          key: l.action
        }, [
          l.action !== "TABLE_COLUMNS" && !l.dropdowns ? (g(), b("button", {
            key: 0,
            type: "button",
            class: S([
              l.class ? l.class : r.getButtonClassByAction(l.action)
            ]),
            onClick: (c) => r.tableAction(l, {
              items: i.items,
              $event: c
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
            wt(" " + D(r.translate(l.title)), 1)
          ], 10, lx)) : T("", !0),
          l.action === "TABLE_COLUMNS" ? (g(), b("div", cx, [
            f("button", {
              type: "button",
              class: S([[
                l.class ? l.class : r.getButtonClassByAction(l.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              yt(f("span", ux, [
                f("i", {
                  class: S([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                wt(" " + D(r.translate(l.title)) + " ", 1),
                r.countHiddenColumns() ? (g(), b("span", hx, " ( " + D(r.countHiddenColumns()) + " " + D(r.translate("hidden")) + " ) ", 1)) : T("", !0)
              ], 512), [
                [Vs, s.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", dx, [
              (g(!0), b(ht, null, mt(s.settings.table.columns, (c) => (g(), b("li", { key: c }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (d) => r.toggleColumn(c)
                }, [
                  c.hidden ? T("", !0) : (g(), b("i", px)),
                  c.hidden ? (g(), b("i", gx)) : T("", !0),
                  wt(" " + D(c.title) + " ", 1),
                  f("small", mx, D(c.name), 1)
                ], 8, fx)
              ]))), 128)),
              t[16] || (t[16] = f("li", null, [
                f("hr", { class: "dropdown-divider" })
              ], -1)),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[0] || (t[0] = (c) => r.toggleColumn(!0))
                }, D(r.translate("Visible all")), 1)
              ]),
              f("li", null, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: t[1] || (t[1] = (c) => r.toggleColumn(!1))
                }, D(r.translate("Hidden all")), 1)
              ])
            ])
          ])) : T("", !0),
          l.dropdowns ? (g(), b("div", bx, [
            f("button", {
              type: "button",
              class: S([[l.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", yx, [
                f("i", {
                  class: S([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                wt(" " + D(r.translate(l.title)), 1)
              ])
            ], 2),
            f("ul", vx, [
              (g(!0), b(ht, null, mt(l.dropdowns, (c) => (g(), b("li", { key: c }, [
                f("span", {
                  class: S(["dropdown-item cursor-pointer", [c.class]]),
                  onClick: (d) => r.tableAction(c, {
                    items: i.items,
                    $event: d
                  })
                }, [
                  c.icon ? (g(), b("i", {
                    key: 0,
                    class: S([c.icon])
                  }, null, 2)) : T("", !0),
                  wt(" " + D(r.translate(c.title)), 1)
                ], 10, _x)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0),
      s.settings.table ? (g(), b("table", {
        key: 1,
        class: S(["table vua-table mb-0", [s.settings.table.class]])
      }, [
        f("thead", null, [
          f("tr", Ex, [
            (g(!0), b(ht, null, mt(s.settings.table.columns, (l) => (g(), b("th", {
              class: S(["", [l.header ? l.header.class : ""]]),
              style: Zn([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width
            }, [
              f("span", {
                class: S(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(l) }]),
                onClick: (c) => r.sortTable(l)
              }, [
                f("span", {
                  innerHTML: l.header && l.header.title !== void 0 ? r.translate(l.header.title) : l.title ? r.translate(l.title) : r.translate(l.name)
                }, null, 8, Tx),
                i.config.order[l.name] ? (g(), b("span", {
                  key: 0,
                  class: S(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[l.name].fixed
                  }])
                }, [
                  i.config.order[l.name].dir === "ASC" ? (g(), b("i", Fx)) : T("", !0),
                  i.config.order[l.name].dir === "DESC" ? (g(), b("i", xx)) : T("", !0),
                  wt(" " + D(i.config.order[l.name].idx + 1), 1)
                ], 2)) : T("", !0)
              ], 10, Ax),
              l.header && l.header.buttons ? (g(), b("span", Cx, [
                (g(!0), b(ht, null, mt(l.header.buttons, (c) => (g(), b("button", {
                  key: c.action,
                  type: "button",
                  disabled: c.disabled !== void 0 ? r.getValueOrFunction(c.disabled) : null,
                  class: S([
                    c.class ? c.class : r.getButtonClassByAction(c.action)
                  ]),
                  onClick: (d) => r.tableAction(c, {
                    items: i.items,
                    $event: d
                  })
                }, [
                  f("i", {
                    class: S([
                      c.icon !== void 0 ? r.getValueOrFunction(c.icon, {
                        button: c,
                        column: l,
                        table: this
                      }) : r.getButtonIconClassByAction(c.action)
                    ])
                  }, null, 2),
                  wt(" " + D(r.translate(c.title)), 1)
                ], 10, Ox))), 128))
              ])) : T("", !0)
            ], 14, wx))), 128))
          ]),
          r.countFilters() ? (g(), b("tr", kx, [
            (g(!0), b(ht, null, mt(s.settings.table.columns, (l) => (g(), b("th", {
              style: Zn([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width,
              class: S([l.filter ? l.filter.class : ""])
            }, [
              l.index && l.click ? (g(), b("div", Sx, [
                f("span", {
                  class: S(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (c) => r.toggleSelectedRowInPage())
                }, [
                  yt(f("i", Lx, null, 512), [
                    [Vs, !r.haveSelectedRowInPage()]
                  ]),
                  yt(f("i", Ix, null, 512), [
                    [Vs, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : T("", !0),
              l.filter && l.filter.type == "text" ? (g(), b("div", $x, [
                yt(f("input", {
                  type: "text",
                  class: S([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  onKeyup: t[3] || (t[3] = oi((c) => r.reloadTable(), ["enter"]))
                }, null, 42, Dx), [
                  [ge, l.filter.value]
                ]),
                l.filter.buttonx && l.filter.buttonx != !1 ? (g(), b("button", {
                  key: 0,
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": l.filter.value == null
                  }]),
                  disabled: l.filter.value == null,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, [...t[17] || (t[17] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ])], 10, Mx)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "number" ? (g(), b("div", Rx, [
                l.filter.operators == !0 ? yt((g(), b("select", {
                  key: 0,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  disabled: l.filter.fixed,
                  onChange: t[4] || (t[4] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", qx, D(r.translate("=")), 1),
                  f("option", Px, D(r.translate(">")), 1),
                  f("option", Vx, D(r.translate(">=")), 1),
                  f("option", jx, D(r.translate("<")), 1),
                  f("option", Ux, D(r.translate("<=")), 1)
                ], 40, Bx)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? yt((g(), b("select", {
                  key: 1,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  disabled: l.filter.fixed,
                  onChange: t[5] || (t[5] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), b(ht, null, mt(l.filter.operators, (c) => (g(), b("option", {
                    key: c,
                    value: c.value
                  }, D(c.label), 9, Wx))), 128))
                ], 40, Hx)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                yt(f("input", {
                  type: "number",
                  class: S(["form-control", {
                    fixed: l.filter.fixed
                  }]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  disabled: l.filter.fixed,
                  min: l.filter.min,
                  max: l.filter.max,
                  onChange: t[6] || (t[6] = (c) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = oi((c) => r.reloadTable(), ["enter"]))
                }, null, 42, zx), [
                  [ge, l.filter.value]
                ]),
                !l.filter.fixed && l.filter.buttonx && l.filter.buttonx != !1 ? (g(), b("button", {
                  key: 2,
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": l.filter.value == null
                  }]),
                  disabled: l.filter.value == null,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, [...t[18] || (t[18] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ])], 10, Kx)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "select" ? (g(), b("div", Gx, [
                l.filter.dropdown ? (g(), b("div", Yx, [
                  f("button", Xx, D(l.filter.multiple ? l.filter.value.length + " selected" : l.filter.value ? l.filter.value : "not selected"), 1),
                  f("ul", Zx, [
                    f("li", null, [
                      (g(!0), b(ht, null, mt(l.filter.options, (c) => (g(), b("span", {
                        key: c,
                        class: S(["dropdown-item cursor-pointer", { selected: l.filter.multiple ? l.filter.value.indexOf(c.value) >= 0 : l.filter.value === c.value }]),
                        onClick: (d) => r.dropdownSelectToggleOne(l.filter, c)
                      }, [
                        (l.filter.multiple ? l.filter.value.indexOf(c.value) >= 0 : l.filter.value === c.value) ? (g(), b("i", Qx)) : (g(), b("i", tC)),
                        wt(" " + D(r.translate(c.label ? c.label : c.value)), 1)
                      ], 10, Jx))), 128))
                    ]),
                    l.filter.multiple ? (g(), b("li", eC, [...t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ])])) : T("", !0),
                    l.filter.multiple ? (g(), b("li", sC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectAll(l.filter.value, l.filter.options)
                      }, D(r.translate("Select all")), 9, nC)
                    ])) : T("", !0),
                    l.filter.multiple ? (g(), b("li", iC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectClear(l.filter.value)
                      }, D(r.translate("Unselect all")), 9, rC)
                    ])) : T("", !0),
                    l.filter.multiple ? (g(), b("li", oC, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectInvert(l.filter.value, l.filter.options)
                      }, D(r.translate("Invert all")), 9, aC)
                    ])) : T("", !0)
                  ])
                ])) : (g(), b("div", lC, [
                  yt(f("select", {
                    "onUpdate:modelValue": (c) => l.filter.value = c,
                    onChange: t[8] || (t[8] = (c) => r.reloadTable()),
                    multiple: l.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (g(!0), b(ht, null, mt(l.filter.options, (c) => (g(), b("option", {
                      key: c,
                      value: c.value
                    }, D(r.translate(c.label ? c.label : c.value)), 9, uC))), 128))
                  ], 40, cC), [
                    [Ge, l.filter.value]
                  ]),
                  l.filter.buttonx && l.filter.buttonx != !1 ? (g(), b("button", {
                    key: 0,
                    class: S(["btn btn-outline-secondary", {
                      "opacity-25": l.filter.value == null
                    }]),
                    disabled: l.filter.value == null,
                    onClick: (c) => {
                      l.filter.value = void 0, r.reloadTable();
                    }
                  }, [...t[20] || (t[20] = [
                    f("i", { class: "bi bi-x" }, null, -1)
                  ])], 10, hC)) : T("", !0)
                ]))
              ])) : T("", !0),
              l.filter && (l.filter.type == "datetime-local" || l.filter.type == "date") ? (g(), b("div", dC, [
                l.filter.operators == !0 ? yt((g(), b("select", {
                  key: 0,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  onChange: t[9] || (t[9] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", pC, D(r.translate("=")), 1),
                  f("option", gC, D(r.translate(">")), 1),
                  f("option", mC, D(r.translate(">=")), 1),
                  f("option", bC, D(r.translate("<")), 1),
                  f("option", yC, D(r.translate("<=")), 1)
                ], 40, fC)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? yt((g(), b("select", {
                  key: 1,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  onChange: t[10] || (t[10] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (g(!0), b(ht, null, mt(l.filter.operators, (c) => (g(), b("option", {
                    key: c,
                    value: c.value
                  }, D(r.translate(c.label)), 9, _C))), 128))
                ], 40, vC)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                yt(f("input", {
                  type: l.filter.type,
                  class: S([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  onChange: t[11] || (t[11] = (c) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = oi((c) => r.reloadTable(), ["enter"]))
                }, null, 42, EC), [
                  [qe, l.filter.value]
                ]),
                f("button", {
                  class: S(["btn btn-outline-secondary", {
                    "opacity-25": !l.filter.value
                  }]),
                  disabled: !l.filter.value,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, [...t[21] || (t[21] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ])], 10, wC)
              ])) : T("", !0),
              l.filter && l.filter.buttons ? (g(), b("span", {
                key: 5,
                class: S(
                  r.getValueOrFunction(l.filter.buttons, {
                    column: l
                  })
                )
              }, [
                (g(!0), b(ht, null, mt(l.filter.buttons, (c) => (g(), b("span", {
                  key: c.action
                }, [
                  f("button", {
                    type: "button",
                    disabled: c.disabled !== void 0 ? r.getValueOrFunction(c.disabled) : null,
                    class: S([
                      c.class ? c.class : r.getButtonClassByAction(c.action)
                    ]),
                    onClick: (d) => r.tableAction(c, {
                      items: i.items,
                      $event: d
                    })
                  }, [
                    f("i", {
                      class: S([
                        c.icon !== void 0 ? r.getValueOrFunction(c.icon, {
                          button: c,
                          column: l,
                          table: this
                        }) : r.getButtonIconClassByAction(c.action)
                      ])
                    }, null, 2),
                    wt(" " + D(r.translate(c.title)), 1)
                  ], 10, AC)
                ]))), 128))
              ], 2)) : T("", !0)
            ], 14, Nx))), 128))
          ])) : T("", !0)
        ]),
        f("tbody", null, [
          (g(!0), b(ht, null, mt(this.items, (l, c) => (g(), b(ht, {
            key: l.id
          }, [
            f("tr", TC, [
              (g(!0), b(ht, null, mt(s.settings.table.columns, (d) => (g(), b("td", {
                style: Zn([d.hidden ? "display: none" : ""]),
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
                  index: c,
                  $event: h
                })
              }, [
                d.index ? (g(), b("div", xC, [
                  f("span", {
                    class: S(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(l[s.settings.pkey]) >= 0
                    }]),
                    innerHTML: c + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, CC)
                ])) : T("", !0),
                !d.template && !d.input && !d.progressbar ? (g(), b("span", OC, D(r.tableCellValue(d.name, l, c, d)), 1)) : T("", !0),
                d.template ? (g(), b("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(d.template, l, c, d)
                }, null, 8, kC)) : T("", !0),
                d.progressbar ? (g(), b("div", {
                  key: 3,
                  class: "progress",
                  role: "progressbar",
                  "aria-label": "Warning example",
                  "aria-valuenow": l[d.name],
                  "aria-valuemax": d.progressbar.max
                }, [
                  f("div", {
                    class: S(["progress-bar", [d.progressbar.class]]),
                    style: Zn({ width: Math.round(l[d.name] / d.progressbar.max * 100) + "%" })
                  }, [
                    d.progressbar.value ? (g(), b("span", SC, D(l[d.name]), 1)) : T("", !0)
                  ], 6)
                ], 8, NC)) : T("", !0),
                d.input ? (g(), b("div", LC, [
                  d.input.prefix ? (g(), b("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.prefix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, IC)) : T("", !0),
                  d.input.prefixcheck ? (g(), b("span", $C, [
                    yt(f("input", {
                      class: "form-check p-0 m-0",
                      type: "checkbox",
                      name: d.input.prefixcheck.name,
                      "onUpdate:modelValue": (h) => l[d.input.prefixcheck.name] = h,
                      onChange: (h) => r.onRowInputChange(l[d.input.prefixcheck.name], d, l, c)
                    }, null, 40, DC), [
                      [cr, l[d.input.prefixcheck.name]]
                    ])
                  ])) : T("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    d.input.type
                  ) >= 0 ? yt((g(), b("input", {
                    key: 2,
                    type: d.input.type,
                    class: S(["form-control form-control-sm", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, c),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, null, 42, MC)), [
                    [qe, l[d.name]]
                  ]) : T("", !0),
                  d.input.type == "select" ? yt((g(), b("select", {
                    key: 3,
                    class: S(["form-select form-select-sm pe-0", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, c),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, [
                    (g(!0), b(ht, null, mt(d.input.options, (h) => (g(), b("option", {
                      value: h.value,
                      key: h
                    }, D(r.translate(h.label)), 9, BC))), 128))
                  ], 42, RC)), [
                    [Ge, l[d.name]]
                  ]) : T("", !0),
                  d.input.suffix ? (g(), b("span", {
                    key: 4,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.suffix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, qC)) : T("", !0),
                  d.input.suffixcheck ? (g(), b("span", PC, [
                    yt(f("input", {
                      class: "form-check p-0 m-0",
                      type: "checkbox",
                      name: d.input.suffixcheck.name,
                      "onUpdate:modelValue": (h) => l[d.input.suffixcheck.name] = h,
                      onChange: (h) => r.onRowInputChange(l[d.input.suffixcheck.name], d, l, c)
                    }, null, 40, VC), [
                      [cr, l[d.input.suffixcheck.name]]
                    ])
                  ])) : T("", !0)
                ])) : T("", !0),
                d.buttons ? (g(), b("span", jC, [
                  (g(!0), b(ht, null, mt(d.buttons, (h) => (g(), b("span", {
                    key: h.action
                  }, [
                    h.hidden ? T("", !0) : (g(), b("button", {
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
                      onClick: (m) => r.tableAction(h, {
                        column: d,
                        item: l,
                        index: c,
                        $event: m
                      })
                    }, [
                      h.icon !== null ? (g(), b("i", {
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
                      h.template ? (g(), b("span", {
                        key: 1,
                        innerHTML: r.tableCellTemplate(h.template, l, c, d)
                      }, null, 8, HC)) : (g(), b("span", WC, D(r.translate(h.title)), 1))
                    ], 10, UC))
                  ]))), 128))
                ])) : T("", !0)
              ], 14, FC))), 128))
            ]),
            s.settings.table.details && i.details.indexOf(l[s.settings.pkey]) >= 0 ? (g(), b("tr", zC, [
              f("td", {
                class: S([s.settings.table.details.class]),
                colspan: s.settings.table.columns.length
              }, [
                (g(!0), b(ht, null, mt(s.settings.table.details.fields, (d) => (g(), b("div", {
                  class: "m-0",
                  key: d
                }, [
                  f("div", GC, [
                    f("div", {
                      class: S(["col text-end", [d.class]])
                    }, [
                      f("label", YC, D(d.label), 1)
                    ], 2),
                    f("div", {
                      class: S(["col", [d.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(d.input.type) < 0 ? yt((g(), b("input", {
                        key: 0,
                        type: d.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, null, 40, XC)), [
                        [qe, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "textarea" ? yt((g(), b("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, `
                    `, 40, ZC)), [
                        [ge, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "select" ? yt((g(), b("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, [
                        (g(!0), b(ht, null, mt(d.input.options, (h) => (g(), b("option", {
                          value: h.value,
                          key: h
                        }, D(r.translate(h.label)), 9, QC))), 128))
                      ], 40, JC)), [
                        [Ge, l[d.name]]
                      ]) : T("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: s.settings.table.details.raw(l)
                }, null, 8, tO),
                s.settings.debug > 1 ? (g(), b("pre", eO, "                  " + D(l) + `
                `, 1)) : T("", !0)
              ], 10, KC)
            ])) : T("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (g(), b("tr", sO, [
            (g(!0), b(ht, null, mt(s.settings.table.columns, (l) => (g(), b("td", {
              style: Zn([l.hidden ? "display: none" : ""]),
              key: l.name,
              "data-label": l.title,
              width: l.width,
              class: S(l.class)
            }, [
              l.index ? (g(), b("div", iO, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (c) => r.toggleSelectedAll())
                }, D(i.selected.length), 1)
              ])) : T("", !0),
              l.input && l.bulk && l.bulk.enabled ? (g(), b("div", rO, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  l.input.type
                ) >= 0 ? yt((g(), b("input", {
                  key: 0,
                  type: l.input.type,
                  class: S(["form-control form-control-sm", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (c) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (c) => i.bulkitem[l.name] = c
                }, null, 42, oO)), [
                  [qe, i.bulkitem[l.name]]
                ]) : T("", !0),
                l.input.type == "select" ? yt((g(), b("select", {
                  key: 1,
                  class: S(["form-select form-select-sm pe-0", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (c) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (c) => i.bulkitem[l.name] = c
                }, [
                  (g(!0), b(ht, null, mt(l.input.options, (c) => (g(), b("option", {
                    value: c.value,
                    key: c
                  }, D(r.translate(c.label)), 9, lO))), 128))
                ], 42, aO)), [
                  [Ge, i.bulkitem[l.name]]
                ]) : T("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (c) => r.ifBulkInputClick(l)
                }, [
                  i.bulkitem[l.name] === void 0 ? (g(), b("i", uO)) : (g(), b("i", hO))
                ], 8, cO)
              ])) : T("", !0),
              l.bulk ? (g(), b("span", dO, [
                (g(!0), b(ht, null, mt(l.bulk.buttons, (c) => (g(), b("span", {
                  key: c.action
                }, [
                  f("button", {
                    type: "button",
                    class: S([
                      c.class ? c.class : r.getButtonClassByAction(c.action)
                    ]),
                    disabled: c.action === "save" && !this.bulkinputs.length,
                    onClick: (d) => r.tableBulkAction(c.action, i.bulkitem, l, d)
                  }, [
                    c.icon !== null ? (g(), b("i", {
                      key: 0,
                      class: S([
                        c.icon !== void 0 ? r.getValueOrFunction(c.icon, {
                          button: c,
                          column: l,
                          table: this
                        }) : r.getButtonIconClassByAction(c.action)
                      ])
                    }, null, 2)) : T("", !0),
                    c.template ? (g(), b("span", {
                      key: 1,
                      innerHTML: r.tableCellTemplate(c.template, i.bulkitem, null, l)
                    }, null, 8, pO)) : (g(), b("span", gO, D(r.translate(c.title)), 1))
                  ], 10, fO)
                ]))), 128))
              ])) : T("", !0)
            ], 14, nO))), 128))
          ])) : T("", !0)
        ])
      ], 2)) : T("", !0),
      lr(o, {
        settings: s.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"])
    ], 10, GF)) : T("", !0),
    f("div", {
      class: "modal shadow",
      id: i.modalId,
      tabindex: "-1"
    }, [
      f("div", bO, [
        f("div", yO, [
          r.authAndSettings() && s.settings.form.visible && s.settings.form.groups ? (g(), hs(a, {
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
    ], 8, mO)
  ]);
}
const _O = /* @__PURE__ */ Se(KF, [["render", vO]]), EO = {
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
        if (this.settings = Nr(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
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
    VuAdminTable: _O
  }
}, wO = EO, AO = { key: 0 }, TO = ["data-bs-theme"];
function FO(e, t, s, n, i, r) {
  const o = Be("vu-admin-table");
  return e.entity && e.settings ? (g(), b("div", AO, [
    e.auth ? (g(), b("div", {
      key: 0,
      class: "vu-admin",
      "data-bs-theme": [e.settings.theme]
    }, [
      lr(o, {
        settings: e.settings,
        auth: e.auth
      }, null, 8, ["settings", "auth"])
    ], 8, TO)) : T("", !0)
  ])) : T("", !0);
}
const tN = /* @__PURE__ */ Se(wO, [["render", FO]]);
var ta = { exports: {} };
var Jc;
function xO() {
  return Jc || (Jc = 1, (function(e) {
    (function() {
      var t = "input is invalid type", s = "finalize already called", n = typeof window == "object", i = n ? window : {};
      i.JS_SHA512_NO_WINDOW && (n = !1);
      var r = !n && typeof self == "object", o = !i.JS_SHA512_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
      o ? i = ds : r && (i = self);
      var a = !i.JS_SHA512_NO_COMMON_JS && !0 && e.exports, l = !i.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", c = "0123456789abcdef".split(""), d = [-2147483648, 8388608, 32768, 128], h = [24, 16, 8, 0], m = [
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
      ], v = ["hex", "array", "digest", "arrayBuffer"], E = [], F = Array.isArray;
      (i.JS_SHA512_NO_NODE_JS || !F) && (F = function(C) {
        return Object.prototype.toString.call(C) === "[object Array]";
      });
      var k = ArrayBuffer.isView;
      l && (i.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !k) && (k = function(C) {
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
        if (!F(C) && !k(C))
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
          return new dt(y, P, !0).update(x)[C]();
        };
      }, G = function(C) {
        var P = Y("hex", C);
        P.create = function(w) {
          return new dt(w, C);
        }, P.update = function(w, O) {
          return P.create(w).update(O);
        };
        for (var y = 0; y < v.length; ++y) {
          var x = v[y];
          P[x] = Y(x, C);
        }
        return P;
      };
      function X(C, P) {
        P ? (E[0] = E[1] = E[2] = E[3] = E[4] = E[5] = E[6] = E[7] = E[8] = E[9] = E[10] = E[11] = E[12] = E[13] = E[14] = E[15] = E[16] = E[17] = E[18] = E[19] = E[20] = E[21] = E[22] = E[23] = E[24] = E[25] = E[26] = E[27] = E[28] = E[29] = E[30] = E[31] = E[32] = 0, this.blocks = E) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], C == 384 ? (this.h0h = 3418070365, this.h0l = 3238371032, this.h1h = 1654270250, this.h1l = 914150663, this.h2h = 2438529370, this.h2l = 812702999, this.h3h = 355462360, this.h3l = 4144912697, this.h4h = 1731405415, this.h4l = 4290775857, this.h5h = 2394180231, this.h5l = 1750603025, this.h6h = 3675008525, this.h6l = 1694076839, this.h7h = 1203062813, this.h7l = 3204075428) : C == 256 ? (this.h0h = 573645204, this.h0l = 4230739756, this.h1h = 2673172387, this.h1l = 3360449730, this.h2h = 596883563, this.h2l = 1867755857, this.h3h = 2520282905, this.h3l = 1497426621, this.h4h = 2519219938, this.h4l = 2827943907, this.h5h = 3193839141, this.h5l = 1401305490, this.h6h = 721525244, this.h6l = 746961066, this.h7h = 246885852, this.h7l = 2177182882) : C == 224 ? (this.h0h = 2352822216, this.h0l = 424955298, this.h1h = 1944164710, this.h1l = 2312950998, this.h2h = 502970286, this.h2l = 855612546, this.h3h = 1738396948, this.h3l = 1479516111, this.h4h = 258812777, this.h4l = 2077511080, this.h5h = 2011393907, this.h5l = 79989058, this.h6h = 1067287976, this.h6l = 1780299464, this.h7h = 286451373, this.h7l = 2446758561) : (this.h0h = 1779033703, this.h0l = 4089235720, this.h1h = 3144134277, this.h1l = 2227873595, this.h2h = 1013904242, this.h2l = 4271175723, this.h3h = 2773480762, this.h3l = 1595750129, this.h4h = 1359893119, this.h4l = 2917565137, this.h5h = 2600822924, this.h5l = 725511199, this.h6h = 528734635, this.h6l = 4215389547, this.h7h = 1541459225, this.h7l = 327033209), this.bits = C, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1;
      }
      X.prototype.update = function(C) {
        if (this.finalized)
          throw new Error(s);
        var P = I(C);
        C = P[0];
        for (var y = P[1], x, w = 0, O, M = C.length, A = this.blocks; w < M; ) {
          if (this.hashed && (this.hashed = !1, A[0] = this.block, this.block = A[1] = A[2] = A[3] = A[4] = A[5] = A[6] = A[7] = A[8] = A[9] = A[10] = A[11] = A[12] = A[13] = A[14] = A[15] = A[16] = A[17] = A[18] = A[19] = A[20] = A[21] = A[22] = A[23] = A[24] = A[25] = A[26] = A[27] = A[28] = A[29] = A[30] = A[31] = A[32] = 0), y)
            for (O = this.start; w < M && O < 128; ++w)
              x = C.charCodeAt(w), x < 128 ? A[O >>> 2] |= x << h[O++ & 3] : x < 2048 ? (A[O >>> 2] |= (192 | x >>> 6) << h[O++ & 3], A[O >>> 2] |= (128 | x & 63) << h[O++ & 3]) : x < 55296 || x >= 57344 ? (A[O >>> 2] |= (224 | x >>> 12) << h[O++ & 3], A[O >>> 2] |= (128 | x >>> 6 & 63) << h[O++ & 3], A[O >>> 2] |= (128 | x & 63) << h[O++ & 3]) : (x = 65536 + ((x & 1023) << 10 | C.charCodeAt(++w) & 1023), A[O >>> 2] |= (240 | x >>> 18) << h[O++ & 3], A[O >>> 2] |= (128 | x >>> 12 & 63) << h[O++ & 3], A[O >>> 2] |= (128 | x >>> 6 & 63) << h[O++ & 3], A[O >>> 2] |= (128 | x & 63) << h[O++ & 3]);
          else
            for (O = this.start; w < M && O < 128; ++w)
              A[O >>> 2] |= C[w] << h[O++ & 3];
          this.lastByteIndex = O, this.bytes += O - this.start, O >= 128 ? (this.block = A[32], this.start = O - 128, this.hash(), this.hashed = !0) : this.start = O;
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
      }, X.prototype.finalize = function() {
        if (!this.finalized) {
          this.finalized = !0;
          var C = this.blocks, P = this.lastByteIndex;
          C[32] = this.block, C[P >>> 2] |= d[P & 3], this.block = C[32], P >= 112 && (this.hashed || this.hash(), C[0] = this.block, C[1] = C[2] = C[3] = C[4] = C[5] = C[6] = C[7] = C[8] = C[9] = C[10] = C[11] = C[12] = C[13] = C[14] = C[15] = C[16] = C[17] = C[18] = C[19] = C[20] = C[21] = C[22] = C[23] = C[24] = C[25] = C[26] = C[27] = C[28] = C[29] = C[30] = C[31] = C[32] = 0), C[30] = this.hBytes << 3 | this.bytes >>> 29, C[31] = this.bytes << 3, this.hash();
        }
      }, X.prototype.hash = function() {
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, O = this.h2l, M = this.h3h, A = this.h3l, N = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, et = this.h6h, Q = this.h6l, rt = this.h7h, nt = this.h7l, H = this.blocks, Z, bt, tt, pt, gt, R, B, q, J, Dt, _e, Le, ss, ns, Zt, oe, Ee, Ht, xt, at, ct, _t, Et, Jt, kt;
        for (Z = 32; Z < 160; Z += 2)
          at = H[Z - 30], ct = H[Z - 29], bt = (at >>> 1 | ct << 31) ^ (at >>> 8 | ct << 24) ^ at >>> 7, tt = (ct >>> 1 | at << 31) ^ (ct >>> 8 | at << 24) ^ (ct >>> 7 | at << 25), at = H[Z - 4], ct = H[Z - 3], pt = (at >>> 19 | ct << 13) ^ (ct >>> 29 | at << 3) ^ at >>> 6, gt = (ct >>> 19 | at << 13) ^ (at >>> 29 | ct << 3) ^ (ct >>> 6 | at << 26), at = H[Z - 32], ct = H[Z - 31], _t = H[Z - 14], Et = H[Z - 13], R = (Et & 65535) + (ct & 65535) + (tt & 65535) + (gt & 65535), B = (Et >>> 16) + (ct >>> 16) + (tt >>> 16) + (gt >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (bt & 65535) + (pt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (bt >>> 16) + (pt >>> 16) + (q >>> 16), H[Z] = J << 16 | q & 65535, H[Z + 1] = B << 16 | R & 65535;
        var Wt = C, zt = P, Kt = y, Mt = x, St = w, qt = O, Rt = M, Lt = A, Ct = N, Bt = z, Pt = K, It = U, Vt = et, $t = Q, jt = rt, Ut = nt;
        for (oe = Kt & St, Ee = Mt & qt, Z = 0; Z < 160; Z += 8)
          bt = (Wt >>> 28 | zt << 4) ^ (zt >>> 2 | Wt << 30) ^ (zt >>> 7 | Wt << 25), tt = (zt >>> 28 | Wt << 4) ^ (Wt >>> 2 | zt << 30) ^ (Wt >>> 7 | zt << 25), pt = (Ct >>> 14 | Bt << 18) ^ (Ct >>> 18 | Bt << 14) ^ (Bt >>> 9 | Ct << 23), gt = (Bt >>> 14 | Ct << 18) ^ (Bt >>> 18 | Ct << 14) ^ (Ct >>> 9 | Bt << 23), Dt = Wt & Kt, _e = zt & Mt, Ht = Dt ^ Wt & St ^ oe, xt = _e ^ zt & qt ^ Ee, Jt = Ct & Pt ^ ~Ct & Vt, kt = Bt & It ^ ~Bt & $t, at = H[Z], ct = H[Z + 1], _t = m[Z], Et = m[Z + 1], R = (Et & 65535) + (ct & 65535) + (kt & 65535) + (gt & 65535) + (Ut & 65535), B = (Et >>> 16) + (ct >>> 16) + (kt >>> 16) + (gt >>> 16) + (Ut >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (Jt & 65535) + (pt & 65535) + (jt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Jt >>> 16) + (pt >>> 16) + (jt >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | R & 65535, R = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (R >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | R & 65535, R = (Lt & 65535) + (ct & 65535), B = (Lt >>> 16) + (ct >>> 16) + (R >>> 16), q = (Rt & 65535) + (at & 65535) + (B >>> 16), J = (Rt >>> 16) + (at >>> 16) + (q >>> 16), jt = J << 16 | q & 65535, Ut = B << 16 | R & 65535, R = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), Rt = J << 16 | q & 65535, Lt = B << 16 | R & 65535, bt = (Rt >>> 28 | Lt << 4) ^ (Lt >>> 2 | Rt << 30) ^ (Lt >>> 7 | Rt << 25), tt = (Lt >>> 28 | Rt << 4) ^ (Rt >>> 2 | Lt << 30) ^ (Rt >>> 7 | Lt << 25), pt = (jt >>> 14 | Ut << 18) ^ (jt >>> 18 | Ut << 14) ^ (Ut >>> 9 | jt << 23), gt = (Ut >>> 14 | jt << 18) ^ (Ut >>> 18 | jt << 14) ^ (jt >>> 9 | Ut << 23), Le = Rt & Wt, ss = Lt & zt, Ht = Le ^ Rt & Kt ^ Dt, xt = ss ^ Lt & Mt ^ _e, Jt = jt & Ct ^ ~jt & Pt, kt = Ut & Bt ^ ~Ut & It, at = H[Z + 2], ct = H[Z + 3], _t = m[Z + 2], Et = m[Z + 3], R = (Et & 65535) + (ct & 65535) + (kt & 65535) + (gt & 65535) + ($t & 65535), B = (Et >>> 16) + (ct >>> 16) + (kt >>> 16) + (gt >>> 16) + ($t >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (Jt & 65535) + (pt & 65535) + (Vt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Jt >>> 16) + (pt >>> 16) + (Vt >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | R & 65535, R = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (R >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | R & 65535, R = (qt & 65535) + (ct & 65535), B = (qt >>> 16) + (ct >>> 16) + (R >>> 16), q = (St & 65535) + (at & 65535) + (B >>> 16), J = (St >>> 16) + (at >>> 16) + (q >>> 16), Vt = J << 16 | q & 65535, $t = B << 16 | R & 65535, R = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), St = J << 16 | q & 65535, qt = B << 16 | R & 65535, bt = (St >>> 28 | qt << 4) ^ (qt >>> 2 | St << 30) ^ (qt >>> 7 | St << 25), tt = (qt >>> 28 | St << 4) ^ (St >>> 2 | qt << 30) ^ (St >>> 7 | qt << 25), pt = (Vt >>> 14 | $t << 18) ^ (Vt >>> 18 | $t << 14) ^ ($t >>> 9 | Vt << 23), gt = ($t >>> 14 | Vt << 18) ^ ($t >>> 18 | Vt << 14) ^ (Vt >>> 9 | $t << 23), ns = St & Rt, Zt = qt & Lt, Ht = ns ^ St & Wt ^ Le, xt = Zt ^ qt & zt ^ ss, Jt = Vt & jt ^ ~Vt & Ct, kt = $t & Ut ^ ~$t & Bt, at = H[Z + 4], ct = H[Z + 5], _t = m[Z + 4], Et = m[Z + 5], R = (Et & 65535) + (ct & 65535) + (kt & 65535) + (gt & 65535) + (It & 65535), B = (Et >>> 16) + (ct >>> 16) + (kt >>> 16) + (gt >>> 16) + (It >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (Jt & 65535) + (pt & 65535) + (Pt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Jt >>> 16) + (pt >>> 16) + (Pt >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | R & 65535, R = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (R >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | R & 65535, R = (Mt & 65535) + (ct & 65535), B = (Mt >>> 16) + (ct >>> 16) + (R >>> 16), q = (Kt & 65535) + (at & 65535) + (B >>> 16), J = (Kt >>> 16) + (at >>> 16) + (q >>> 16), Pt = J << 16 | q & 65535, It = B << 16 | R & 65535, R = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), Kt = J << 16 | q & 65535, Mt = B << 16 | R & 65535, bt = (Kt >>> 28 | Mt << 4) ^ (Mt >>> 2 | Kt << 30) ^ (Mt >>> 7 | Kt << 25), tt = (Mt >>> 28 | Kt << 4) ^ (Kt >>> 2 | Mt << 30) ^ (Kt >>> 7 | Mt << 25), pt = (Pt >>> 14 | It << 18) ^ (Pt >>> 18 | It << 14) ^ (It >>> 9 | Pt << 23), gt = (It >>> 14 | Pt << 18) ^ (It >>> 18 | Pt << 14) ^ (Pt >>> 9 | It << 23), oe = Kt & St, Ee = Mt & qt, Ht = oe ^ Kt & Rt ^ ns, xt = Ee ^ Mt & Lt ^ Zt, Jt = Pt & Vt ^ ~Pt & jt, kt = It & $t ^ ~It & Ut, at = H[Z + 6], ct = H[Z + 7], _t = m[Z + 6], Et = m[Z + 7], R = (Et & 65535) + (ct & 65535) + (kt & 65535) + (gt & 65535) + (Bt & 65535), B = (Et >>> 16) + (ct >>> 16) + (kt >>> 16) + (gt >>> 16) + (Bt >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (Jt & 65535) + (pt & 65535) + (Ct & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Jt >>> 16) + (pt >>> 16) + (Ct >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | R & 65535, R = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (R >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | R & 65535, R = (zt & 65535) + (ct & 65535), B = (zt >>> 16) + (ct >>> 16) + (R >>> 16), q = (Wt & 65535) + (at & 65535) + (B >>> 16), J = (Wt >>> 16) + (at >>> 16) + (q >>> 16), Ct = J << 16 | q & 65535, Bt = B << 16 | R & 65535, R = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (R >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), Wt = J << 16 | q & 65535, zt = B << 16 | R & 65535;
        R = (P & 65535) + (zt & 65535), B = (P >>> 16) + (zt >>> 16) + (R >>> 16), q = (C & 65535) + (Wt & 65535) + (B >>> 16), J = (C >>> 16) + (Wt >>> 16) + (q >>> 16), this.h0h = J << 16 | q & 65535, this.h0l = B << 16 | R & 65535, R = (x & 65535) + (Mt & 65535), B = (x >>> 16) + (Mt >>> 16) + (R >>> 16), q = (y & 65535) + (Kt & 65535) + (B >>> 16), J = (y >>> 16) + (Kt >>> 16) + (q >>> 16), this.h1h = J << 16 | q & 65535, this.h1l = B << 16 | R & 65535, R = (O & 65535) + (qt & 65535), B = (O >>> 16) + (qt >>> 16) + (R >>> 16), q = (w & 65535) + (St & 65535) + (B >>> 16), J = (w >>> 16) + (St >>> 16) + (q >>> 16), this.h2h = J << 16 | q & 65535, this.h2l = B << 16 | R & 65535, R = (A & 65535) + (Lt & 65535), B = (A >>> 16) + (Lt >>> 16) + (R >>> 16), q = (M & 65535) + (Rt & 65535) + (B >>> 16), J = (M >>> 16) + (Rt >>> 16) + (q >>> 16), this.h3h = J << 16 | q & 65535, this.h3l = B << 16 | R & 65535, R = (z & 65535) + (Bt & 65535), B = (z >>> 16) + (Bt >>> 16) + (R >>> 16), q = (N & 65535) + (Ct & 65535) + (B >>> 16), J = (N >>> 16) + (Ct >>> 16) + (q >>> 16), this.h4h = J << 16 | q & 65535, this.h4l = B << 16 | R & 65535, R = (U & 65535) + (It & 65535), B = (U >>> 16) + (It >>> 16) + (R >>> 16), q = (K & 65535) + (Pt & 65535) + (B >>> 16), J = (K >>> 16) + (Pt >>> 16) + (q >>> 16), this.h5h = J << 16 | q & 65535, this.h5l = B << 16 | R & 65535, R = (Q & 65535) + ($t & 65535), B = (Q >>> 16) + ($t >>> 16) + (R >>> 16), q = (et & 65535) + (Vt & 65535) + (B >>> 16), J = (et >>> 16) + (Vt >>> 16) + (q >>> 16), this.h6h = J << 16 | q & 65535, this.h6l = B << 16 | R & 65535, R = (nt & 65535) + (Ut & 65535), B = (nt >>> 16) + (Ut >>> 16) + (R >>> 16), q = (rt & 65535) + (jt & 65535) + (B >>> 16), J = (rt >>> 16) + (jt >>> 16) + (q >>> 16), this.h7h = J << 16 | q & 65535, this.h7l = B << 16 | R & 65535;
      }, X.prototype.hex = function() {
        this.finalize();
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, O = this.h2l, M = this.h3h, A = this.h3l, N = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, et = this.h6h, Q = this.h6l, rt = this.h7h, nt = this.h7l, H = this.bits, Z = c[C >>> 28 & 15] + c[C >>> 24 & 15] + c[C >>> 20 & 15] + c[C >>> 16 & 15] + c[C >>> 12 & 15] + c[C >>> 8 & 15] + c[C >>> 4 & 15] + c[C & 15] + c[P >>> 28 & 15] + c[P >>> 24 & 15] + c[P >>> 20 & 15] + c[P >>> 16 & 15] + c[P >>> 12 & 15] + c[P >>> 8 & 15] + c[P >>> 4 & 15] + c[P & 15] + c[y >>> 28 & 15] + c[y >>> 24 & 15] + c[y >>> 20 & 15] + c[y >>> 16 & 15] + c[y >>> 12 & 15] + c[y >>> 8 & 15] + c[y >>> 4 & 15] + c[y & 15] + c[x >>> 28 & 15] + c[x >>> 24 & 15] + c[x >>> 20 & 15] + c[x >>> 16 & 15] + c[x >>> 12 & 15] + c[x >>> 8 & 15] + c[x >>> 4 & 15] + c[x & 15] + c[w >>> 28 & 15] + c[w >>> 24 & 15] + c[w >>> 20 & 15] + c[w >>> 16 & 15] + c[w >>> 12 & 15] + c[w >>> 8 & 15] + c[w >>> 4 & 15] + c[w & 15] + c[O >>> 28 & 15] + c[O >>> 24 & 15] + c[O >>> 20 & 15] + c[O >>> 16 & 15] + c[O >>> 12 & 15] + c[O >>> 8 & 15] + c[O >>> 4 & 15] + c[O & 15] + c[M >>> 28 & 15] + c[M >>> 24 & 15] + c[M >>> 20 & 15] + c[M >>> 16 & 15] + c[M >>> 12 & 15] + c[M >>> 8 & 15] + c[M >>> 4 & 15] + c[M & 15];
        return H >= 256 && (Z += c[A >>> 28 & 15] + c[A >>> 24 & 15] + c[A >>> 20 & 15] + c[A >>> 16 & 15] + c[A >>> 12 & 15] + c[A >>> 8 & 15] + c[A >>> 4 & 15] + c[A & 15]), H >= 384 && (Z += c[N >>> 28 & 15] + c[N >>> 24 & 15] + c[N >>> 20 & 15] + c[N >>> 16 & 15] + c[N >>> 12 & 15] + c[N >>> 8 & 15] + c[N >>> 4 & 15] + c[N & 15] + c[z >>> 28 & 15] + c[z >>> 24 & 15] + c[z >>> 20 & 15] + c[z >>> 16 & 15] + c[z >>> 12 & 15] + c[z >>> 8 & 15] + c[z >>> 4 & 15] + c[z & 15] + c[K >>> 28 & 15] + c[K >>> 24 & 15] + c[K >>> 20 & 15] + c[K >>> 16 & 15] + c[K >>> 12 & 15] + c[K >>> 8 & 15] + c[K >>> 4 & 15] + c[K & 15] + c[U >>> 28 & 15] + c[U >>> 24 & 15] + c[U >>> 20 & 15] + c[U >>> 16 & 15] + c[U >>> 12 & 15] + c[U >>> 8 & 15] + c[U >>> 4 & 15] + c[U & 15]), H == 512 && (Z += c[et >>> 28 & 15] + c[et >>> 24 & 15] + c[et >>> 20 & 15] + c[et >>> 16 & 15] + c[et >>> 12 & 15] + c[et >>> 8 & 15] + c[et >>> 4 & 15] + c[et & 15] + c[Q >>> 28 & 15] + c[Q >>> 24 & 15] + c[Q >>> 20 & 15] + c[Q >>> 16 & 15] + c[Q >>> 12 & 15] + c[Q >>> 8 & 15] + c[Q >>> 4 & 15] + c[Q & 15] + c[rt >>> 28 & 15] + c[rt >>> 24 & 15] + c[rt >>> 20 & 15] + c[rt >>> 16 & 15] + c[rt >>> 12 & 15] + c[rt >>> 8 & 15] + c[rt >>> 4 & 15] + c[rt & 15] + c[nt >>> 28 & 15] + c[nt >>> 24 & 15] + c[nt >>> 20 & 15] + c[nt >>> 16 & 15] + c[nt >>> 12 & 15] + c[nt >>> 8 & 15] + c[nt >>> 4 & 15] + c[nt & 15]), Z;
      }, X.prototype.toString = X.prototype.hex, X.prototype.digest = function() {
        this.finalize();
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, O = this.h2l, M = this.h3h, A = this.h3l, N = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, et = this.h6h, Q = this.h6l, rt = this.h7h, nt = this.h7l, H = this.bits, Z = [
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
          O >>> 24 & 255,
          O >>> 16 & 255,
          O >>> 8 & 255,
          O & 255,
          M >>> 24 & 255,
          M >>> 16 & 255,
          M >>> 8 & 255,
          M & 255
        ];
        return H >= 256 && Z.push(A >>> 24 & 255, A >>> 16 & 255, A >>> 8 & 255, A & 255), H >= 384 && Z.push(
          N >>> 24 & 255,
          N >>> 16 & 255,
          N >>> 8 & 255,
          N & 255,
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
          et >>> 24 & 255,
          et >>> 16 & 255,
          et >>> 8 & 255,
          et & 255,
          Q >>> 24 & 255,
          Q >>> 16 & 255,
          Q >>> 8 & 255,
          Q & 255,
          rt >>> 24 & 255,
          rt >>> 16 & 255,
          rt >>> 8 & 255,
          rt & 255,
          nt >>> 24 & 255,
          nt >>> 16 & 255,
          nt >>> 8 & 255,
          nt & 255
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
      function dt(C, P, y) {
        var x, w = I(C);
        if (C = w[0], w[1]) {
          for (var O = [], M = C.length, A = 0, N, x = 0; x < M; ++x)
            N = C.charCodeAt(x), N < 128 ? O[A++] = N : N < 2048 ? (O[A++] = 192 | N >>> 6, O[A++] = 128 | N & 63) : N < 55296 || N >= 57344 ? (O[A++] = 224 | N >>> 12, O[A++] = 128 | N >>> 6 & 63, O[A++] = 128 | N & 63) : (N = 65536 + ((N & 1023) << 10 | C.charCodeAt(++x) & 1023), O[A++] = 240 | N >>> 18, O[A++] = 128 | N >>> 12 & 63, O[A++] = 128 | N >>> 6 & 63, O[A++] = 128 | N & 63);
          C = O;
        }
        C.length > 128 && (C = new X(P, !0).update(C).array());
        for (var z = [], K = [], x = 0; x < 128; ++x) {
          var U = C[x] || 0;
          z[x] = 92 ^ U, K[x] = 54 ^ U;
        }
        X.call(this, P, y), this.update(K), this.oKeyPad = z, this.inner = !0, this.sharedMemory = y;
      }
      dt.prototype = new X(), dt.prototype.finalize = function() {
        if (X.prototype.finalize.call(this), this.inner) {
          this.inner = !1;
          var C = this.array();
          X.call(this, this.bits, this.sharedMemory), this.update(this.oKeyPad), this.update(C), X.prototype.finalize.call(this);
        }
      }, dt.prototype.clone = function() {
        var C = new dt([], this.bits, !1);
        this.copyTo(C), C.inner = this.inner;
        for (var P = 0; P < this.oKeyPad.length; ++P)
          C.oKeyPad[P] = this.oKeyPad[P];
        return C;
      };
      var ft = W(512);
      ft.sha512 = ft, ft.sha384 = W(384), ft.sha512_256 = W(256), ft.sha512_224 = W(224), ft.sha512.hmac = G(512), ft.sha384.hmac = G(384), ft.sha512_256.hmac = G(256), ft.sha512_224.hmac = G(224), a ? e.exports = ft : (i.sha512 = ft.sha512, i.sha384 = ft.sha384, i.sha512_256 = ft.sha512_256, i.sha512_224 = ft.sha512_224);
    })();
  })(ta)), ta.exports;
}
var CO = xO();
qa();
const OO = {
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
    VuAdminForm: hd
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
        s = CO.sha512(s);
      return s;
    },
    authUpdate() {
      this.$emit("update:modelValue", this.auth);
    },
    handleEscapeKey(e) {
      e.key === "Escape" && this.close();
    },
    getValueOrFunction(e, t) {
      return tn(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return Pn(e, this.settings.translate, t, s || this.settings.language);
    },
    onCaptchaClick() {
      console.log("reCAPTCHA clicked");
    }
  },
  created() {
    window.VuSettings && window.VuSettings.auth && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", this.settings = window.VuSettings.auth);
    let e = pr(1e5);
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
    }), console.log(this.auth), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.detectQuery(), this.settings.debug && console.log("vu-auth mounted ", "1.3.4");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }
}, kO = OO, NO = ["data-bs-theme"], SO = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, LO = { class: "position-absolute top-0 end-0 p-0 m-2" }, IO = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary"
}, $O = { class: "text-center mt-2 mb-4" }, DO = {
  key: 0,
  class: "mb-3"
}, MO = {
  for: "email",
  class: "form-label text-primary"
}, RO = { class: "input-group" }, BO = ["type", "placeholder", "disabled"], qO = ["innerHTML"], PO = { class: "mb-3" }, VO = {
  key: 0,
  for: "password",
  class: "form-label text-primary"
}, jO = { class: "input-group" }, UO = ["type", "placeholder", "pattern", "minlength", "disabled"], HO = {
  key: 0,
  class: "bi bi-eye"
}, WO = {
  key: 1,
  class: "bi bi-eye-slash"
}, zO = ["innerHTML"], KO = {
  key: 0,
  class: "mb-4"
}, GO = {
  for: "password_again",
  class: "form-label text-primary"
}, YO = ["innerHTML"], XO = { class: "input-group" }, ZO = ["type", "placeholder", "minlength", "disabled"], JO = {
  key: 0,
  class: "bi bi-eye"
}, QO = {
  key: 1,
  class: "bi bi-eye-slash"
}, tk = ["innerHTML"], ek = { class: "mb-3 text-center" }, sk = ["data-sitekey"], nk = {
  key: 2,
  class: "mb-4 text-center"
}, ik = ["innerHTML"], rk = {
  key: 3,
  class: "d-flex mb-4"
}, ok = ["innerHTML"], ak = { class: "row" }, lk = { class: "mb-3" }, ck = ["for", "innerHTML"], uk = { class: "input-group" }, hk = ["innerHTML"], dk = ["disabled", "required", "onUpdate:modelValue", "multiple"], fk = ["value", "innerHTML"], pk = ["id", "name", "type", "onUpdate:modelValue", "placeholder", "required", "disabled"], gk = ["innerHTML"], mk = ["innerHTML"], bk = {
  key: 0,
  class: "form-check"
}, yk = ["id", "name", "onUpdate:modelValue", "required", "disabled"], vk = ["for", "innerHTML"], _k = {
  key: 4,
  class: "mt-4"
}, Ek = ["innerHTML"], wk = {
  key: 5,
  class: "mt-3 text-center"
}, Ak = ["innerHTML"], Tk = { class: "mt-4 d-flex justify-content-between" }, Fk = ["disabled"], xk = ["disabled"], Ck = ["disabled"], Ok = {
  key: 0,
  class: "bi bi-person-plus mx-1"
}, kk = {
  key: 1,
  class: "bi bi-arrow-right-square mx-1"
}, Nk = { class: "mt-2 text-end" }, Sk = ["disabled"], Lk = ["id"], Ik = { class: "modal-dialog modal-xl" }, $k = { class: "modal-content h-100" };
function Dk(e, t, s, n, i, r) {
  const o = Be("VuAdminForm");
  return e.auth && e.auth.visible ? (g(), b("div", {
    key: 0,
    class: "vua-auth",
    "data-bs-theme": [e.theme]
  }, [
    f("div", {
      class: "row d-flex justify-content-center align-items-center min-vh-100",
      onClick: t[14] || (t[14] = Yt((...a) => e.close && e.close(...a), ["stop"]))
    }, [
      f("div", SO, [
        f("div", {
          class: "card shadow p-4 position-relative",
          onClick: t[13] || (t[13] = Yt(() => {
          }, ["stop"]))
        }, [
          f("div", LO, [
            e.loading ? (g(), b("i", IO)) : T("", !0),
            f("button", {
              type: "button",
              class: "btn p-2",
              onClick: t[0] || (t[0] = Yt((...a) => e.close && e.close(...a), ["stop"]))
            }, [...t[16] || (t[16] = [
              f("i", { class: "bi bi-x px-1 text-muted" }, null, -1)
            ])])
          ]),
          f("h1", $O, D(e.settings.title[e.auth.panel]), 1),
          f("form", {
            onSubmit: t[11] || (t[11] = Yt((a) => e.handleSubmit(), ["prevent"])),
            onClick: t[12] || (t[12] = Yt(() => {
            }, ["stop"]))
          }, [
            e.auth.panel != "activation" && e.auth.panel != "password" ? (g(), b("div", DO, [
              f("label", MO, D(e.settings.username.label), 1),
              f("div", RO, [
                e.settings.username.icon ? (g(), b("span", {
                  key: 0,
                  class: S(["input-group-text", { "rounded-bottom-0": e.settings.username.help }])
                }, [
                  f("i", {
                    class: S([e.settings.username.icon])
                  }, null, 2)
                ], 2)) : T("", !0),
                yt(f("input", {
                  id: "email",
                  name: "email",
                  type: e.settings.username.type,
                  "onUpdate:modelValue": t[1] || (t[1] = (a) => e.username = a),
                  class: S(["form-control", { "rounded-bottom-0": e.settings.username.help }]),
                  placeholder: e.settings.username.placeholder,
                  required: "",
                  disabled: e.loading
                }, null, 10, BO), [
                  [qe, e.username]
                ])
              ]),
              e.settings.username.help ? (g(), b("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                innerHTML: e.settings.username.help
              }, null, 8, qO)) : T("", !0)
            ])) : T("", !0),
            e.auth.panel != "forgot" && e.auth.panel != "activation" ? (g(), b(ht, { key: 1 }, [
              f("div", PO, [
                e.settings.password.label ? (g(), b("label", VO, D(e.settings.password.label), 1)) : T("", !0),
                f("div", jO, [
                  e.settings.password.icon ? (g(), b("span", {
                    key: 0,
                    class: S(["input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }])
                  }, [
                    f("i", {
                      class: S([e.settings.password.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  yt(f("input", {
                    id: "password",
                    name: "password",
                    type: e.settings.password.type,
                    "onUpdate:modelValue": t[2] || (t[2] = (a) => e.password = a),
                    class: S(["form-control", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    placeholder: e.settings.password.placeholder,
                    pattern: e.settings.password.pattern,
                    minlength: e.auth.panel == "registration" ? e.settings.password.minlength : 1,
                    required: "",
                    disabled: e.loading
                  }, null, 10, UO), [
                    [qe, e.password]
                  ]),
                  e.auth.panel == "registration" || e.auth.panel == "password" ? (g(), b("span", {
                    key: 1,
                    class: S(["input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }])
                  }, [
                    f("small", {
                      class: S(["", {
                        "text-success": e.password.length >= e.settings.password.minlength,
                        "text-danger": e.password.length < e.settings.password.minlength
                      }])
                    }, D(e.password.length), 3)
                  ], 2)) : T("", !0),
                  f("span", {
                    class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }]),
                    onClick: t[3] || (t[3] = Yt((a) => e.toggleType("password"), ["stop"]))
                  }, [
                    e.settings.password.type == "password" ? (g(), b("i", HO)) : (g(), b("i", WO))
                  ], 2)
                ]),
                (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help ? (g(), b("small", {
                  key: 1,
                  class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                  innerHTML: e.settings.password.help
                }, null, 8, zO)) : T("", !0)
              ]),
              e.auth.panel === "registration" || e.auth.panel === "password" ? (g(), b("div", KO, [
                f("label", GO, [
                  wt(D(e.settings.password_again.label) + " ", 1),
                  e.password_again.length > 0 && e.password_again != e.password ? (g(), b("small", {
                    key: 0,
                    class: "text-danger",
                    innerHTML: e.settings.password_again.nomatch
                  }, null, 8, YO)) : T("", !0)
                ]),
                f("div", XO, [
                  e.settings.password.icon ? (g(), b("span", {
                    key: 0,
                    class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("i", {
                      class: S([e.settings.password_again.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  yt(f("input", {
                    id: "password_again",
                    name: "password_again",
                    type: e.settings.password_again.type,
                    "onUpdate:modelValue": t[4] || (t[4] = (a) => e.password_again = a),
                    class: S(["form-control", { "rounded-bottom-0": e.settings.password_again.help }]),
                    placeholder: e.settings.password_again.placeholder,
                    minlength: e.settings.password.minlength,
                    required: "",
                    disabled: e.loading
                  }, null, 10, ZO), [
                    [qe, e.password_again]
                  ]),
                  f("span", {
                    class: S(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("small", {
                      class: S(["", {
                        "text-success": e.password_again.length >= e.settings.password.minlength,
                        "text-danger": e.password_again.length < e.settings.password.minlength
                      }])
                    }, D(e.password_again.length), 3)
                  ], 2),
                  f("span", {
                    class: S(["cursor-pointer input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password_again.help }]),
                    onClick: t[5] || (t[5] = Yt((a) => e.toggleType("password_again"), ["stop"]))
                  }, [
                    e.settings.password_again.type == "password" ? (g(), b("i", JO)) : (g(), b("i", QO))
                  ], 2)
                ]),
                (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password_again.help ? (g(), b("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                  innerHTML: e.settings.password_again.help
                }, null, 8, tk)) : T("", !0)
              ])) : T("", !0),
              f("div", ek, [
                f("div", {
                  class: "g-recaptcha",
                  "data-sitekey": e.recaptchaSiteKey,
                  onClick: t[6] || (t[6] = Yt((...a) => e.onCaptchaClick && e.onCaptchaClick(...a), ["stop"]))
                }, null, 8, sk)
              ])
            ], 64)) : T("", !0),
            e.auth.panel == "login" && e.settings.password.forgot ? (g(), b("div", nk, [
              f("button", {
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[7] || (t[7] = Yt((...a) => e.toggleForgotPassword && e.toggleForgotPassword(...a), ["stop"])),
                innerHTML: e.settings.password.forgot
              }, null, 8, ik)
            ])) : T("", !0),
            e.auth.panel == "forgot" && e.settings.help && e.settings.help.forgot ? (g(), b("div", rk, [
              f("small", {
                class: "text-muted",
                innerHTML: e.settings.help.forgot
              }, null, 8, ok)
            ])) : T("", !0),
            f("div", ak, [
              (g(!0), b(ht, null, mt(e.settings.inputs, (a, l) => (g(), b(ht, { key: l }, [
                a.panels.indexOf(e.auth.panel) >= 0 && !a.hidden ? (g(), b("div", {
                  key: 0,
                  class: S([a.colclass ? a.colclass : "col-md-12"])
                }, [
                  f("div", lk, [
                    a.label ? (g(), b("label", {
                      key: 0,
                      for: l,
                      class: S(["form-label text-primary", { required: a.required }]),
                      innerHTML: e.getValueOrFunction(a.label)
                    }, null, 10, ck)) : T("", !0),
                    f("div", uk, [
                      a.prefix ? (g(), b("span", {
                        key: 0,
                        class: S(["input-group-text", { "rounded-bottom-0": a.help }]),
                        innerHTML: e.getValueOrFunction(a.prefix)
                      }, null, 10, hk)) : T("", !0),
                      a.type == "select" ? yt((g(), b("select", {
                        key: 1,
                        class: "form-select",
                        disabled: e.loading,
                        required: a.required,
                        "onUpdate:modelValue": (c) => e.inputs[l] = c,
                        multiple: a.multiple
                      }, [
                        t[17] || (t[17] = f("option", null, null, -1)),
                        (g(!0), b(ht, null, mt(a.options, (c) => (g(), b("option", {
                          key: c,
                          value: c.value,
                          innerHTML: e.getValueOrFunction(c.label)
                        }, null, 8, fk))), 128))
                      ], 8, dk)), [
                        [Ge, e.inputs[l]]
                      ]) : yt((g(), b("input", {
                        key: 2,
                        id: l,
                        name: l,
                        type: a.type,
                        "onUpdate:modelValue": (c) => e.inputs[l] = c,
                        class: S(["form-control", { "rounded-bottom-0": a.help }]),
                        placeholder: a.placeholder,
                        required: a.required,
                        disabled: e.loading
                      }, null, 10, pk)), [
                        [qe, e.inputs[l]]
                      ]),
                      a.suffix ? (g(), b("span", {
                        key: 3,
                        class: S(["input-group-text", { "rounded-bottom-0": a.help }]),
                        innerHTML: e.getValueOrFunction(a.suffix)
                      }, null, 10, gk)) : T("", !0)
                    ]),
                    a.help ? (g(), b("small", {
                      key: 1,
                      class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                      innerHTML: e.getValueOrFunction(a.help)
                    }, null, 8, mk)) : T("", !0)
                  ])
                ], 2)) : T("", !0)
              ], 64))), 128))
            ]),
            (g(!0), b(ht, null, mt(e.settings.accepts, (a) => (g(), b("div", { key: a }, [
              a.panels.indexOf(e.auth.panel) >= 0 ? (g(), b("div", bk, [
                yt(f("input", {
                  type: "checkbox",
                  class: "form-check-input",
                  id: "accept_" + a.name,
                  name: "accept_" + a.name,
                  "onUpdate:modelValue": (l) => e.accepts[a.name] = l,
                  required: a.required,
                  disabled: e.loading
                }, null, 8, yk), [
                  [cr, e.accepts[a.name]]
                ]),
                a.label ? (g(), b("label", {
                  key: 0,
                  class: "form-check-label",
                  for: "accept_" + a.name,
                  innerHTML: e.getValueOrFunction(a.label)
                }, null, 8, vk)) : T("", !0)
              ])) : T("", !0)
            ]))), 128)),
            e.auth.panel == "registration" && e.settings.help && e.settings.help.registration ? (g(), b("div", _k, [
              f("div", {
                innerHTML: e.getValueOrFunction(e.settings.help.registration)
              }, null, 8, Ek)
            ])) : T("", !0),
            e.auth.response.message ? (g(), b("div", wk, [
              f("div", {
                class: S({ "text-danger": !e.auth.response.ok, "text-success": e.auth.response.ok }),
                innerHTML: e.auth.response.message
              }, null, 10, Ak)
            ])) : T("", !0),
            f("div", Tk, [
              e.auth.panel != "login" && e.auth.panel != "activation" ? (g(), b("button", {
                key: 0,
                type: "button",
                onClick: t[8] || (t[8] = Yt((...a) => e.toggleClear && e.toggleClear(...a), ["stop"])),
                class: "btn btn-secondary w-100 me-2 text-nowrap",
                disabled: e.loading
              }, [
                t[18] || (t[18] = f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1)),
                wt(" " + D(e.settings.submit.login), 1)
              ], 8, Fk)) : T("", !0),
              e.auth.panel == "login" ? (g(), b("button", {
                key: 1,
                type: "button",
                class: "btn btn-warning w-100 me-2 text-nowrap",
                onClick: t[9] || (t[9] = Yt((...a) => e.toggleNewRegistration && e.toggleNewRegistration(...a), ["stop"])),
                disabled: e.loading
              }, [
                t[19] || (t[19] = f("i", { class: "bi bi-person-plus mx-1" }, null, -1)),
                wt(" " + D(e.settings.submit.registration), 1)
              ], 8, xk)) : T("", !0),
              f("button", {
                type: "submit",
                class: S(["btn w-100 text-nowrap", { "btn-primary": e.auth.panel != "registration", "btn-warning": e.auth.panel == "registration" }]),
                disabled: e.loading
              }, [
                wt(D(e.settings.submit[e.auth.panel]) + " ", 1),
                e.auth.panel == "registration" ? (g(), b("i", Ok)) : (g(), b("i", kk))
              ], 10, Ck)
            ]),
            f("div", Nk, [
              f("button", {
                type: "button",
                onClick: t[10] || (t[10] = Yt((...a) => e.close && e.close(...a), ["stop"])),
                class: "btn btn-light border w-100 me-1",
                disabled: e.loading
              }, [
                wt(D(e.settings.submit.cancel) + " ", 1),
                t[20] || (t[20] = f("i", { class: "bi bi-x-square mx-1" }, null, -1))
              ], 8, Sk)
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
      f("div", Ik, [
        f("div", $k, [
          e.settings.form && e.settings.form.visible && e.settings.form.groups ? (g(), hs(o, {
            key: 0,
            modelValue: e.item,
            "onUpdate:modelValue": t[15] || (t[15] = (a) => e.item = a),
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
    ], 8, Lk)
  ], 8, NO)) : T("", !0);
}
const eN = /* @__PURE__ */ Se(kO, [["render", Dk]]);
qa();
const Mk = {
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
      return tn(e, t, this.settings, this);
    }
  },
  created() {
    window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel]));
  },
  mounted() {
  }
}, Rk = Mk, Bk = ["data-bs-theme"], qk = {
  key: 0,
  class: "dropdown"
}, Pk = ["innerHTML"], Vk = {
  class: "dropdown-menu dropdown-menu-end",
  "aria-labelledby": "userDropdown"
}, jk = ["innerHTML"], Uk = ["onClick"], Hk = ["onClick", "innerHTML"], Wk = {
  key: 1,
  class: "d-inline-block"
}, zk = ["innerHTML"];
function Kk(e, t, s, n, i, r) {
  return !e.auth.user && e.panel != "login" || e.panel == "login" ? (g(), b("div", {
    key: 0,
    class: "vua-user-button d-inline-block",
    "data-bs-theme": [e.theme]
  }, [
    e.auth.user ? (g(), b("div", qk, [
      f("button", {
        class: S(["dropdown-toggle", [e.settings.class]]),
        type: "button",
        id: "userDropdown",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }, [
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, Pk)
      ], 2),
      f("ul", Vk, [
        (g(!0), b(ht, null, mt(e.settings.dropdowns, (o) => (g(), b(ht, { key: o }, [
          o.action == "BUTTON_ROLES" ? (g(), b("li", {
            key: 0,
            class: S([[o.class], "d-flex items-align-center"])
          }, [
            f("span", {
              innerHTML: e.getValueOrFunction(o.label),
              class: "me-2"
            }, null, 8, jk),
            (g(!0), b(ht, null, mt(e.auth.user.roles, (a) => (g(), b("button", {
              key: a,
              onClick: (l) => e.setSelectedRole(a),
              class: S(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": a == e.auth.user.role }])
            }, D(a), 11, Uk))), 128))
          ], 2)) : (g(), b("li", {
            key: 1,
            class: S([o.class]),
            onClick: (a) => e.dropdownAction(o),
            innerHTML: e.getValueOrFunction(o.label)
          }, null, 10, Hk))
        ], 64))), 128))
      ])
    ])) : (g(), b("div", Wk, [
      f("button", {
        class: S([e.settings.class]),
        type: "button",
        onClick: t[0] || (t[0] = (...o) => e.togglePanel && e.togglePanel(...o))
      }, [
        e.settings.icon ? (g(), b("i", {
          key: 0,
          class: S([e.settings.icon])
        }, null, 2)) : T("", !0),
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, zk)
      ], 2)
    ]))
  ], 8, Bk)) : T("", !0);
}
const sN = /* @__PURE__ */ Se(Rk, [["render", Kk]]);
export {
  tN as VuAdmin,
  eN as VuAuth,
  sN as VuUserButton
};
