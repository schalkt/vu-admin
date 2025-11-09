import { createElementBlock as b, openBlock as m, createElementVNode as f, createCommentVNode as T, toDisplayString as $, Fragment as ht, renderList as mt, normalizeClass as k, createTextVNode as wt, resolveComponent as Be, withDirectives as vt, vModelText as Re, withKeys as ri, withModifiers as Jt, createVNode as ar, vModelSelect as Ge, createBlock as hs, vModelDynamic as qe, vModelCheckbox as lr, vShow as Ps, normalizeStyle as Xn } from "vue";
var ce = "top", ge = "bottom", me = "right", ue = "left", _r = "auto", Rn = [ce, ge, me, ue], Hs = "start", On = "end", eu = "clippingParents", wa = "viewport", pn = "popper", su = "reference", Qo = /* @__PURE__ */ Rn.reduce(function(e, t) {
  return e.concat([t + "-" + Hs, t + "-" + On]);
}, []), Aa = /* @__PURE__ */ [].concat(Rn, [_r]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Hs, t + "-" + On]);
}, []), nu = "beforeRead", iu = "read", ru = "afterRead", ou = "beforeMain", au = "main", lu = "afterMain", cu = "beforeWrite", uu = "write", hu = "afterWrite", du = [nu, iu, ru, ou, au, lu, cu, uu, hu];
function Je(e) {
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
function Ws(e) {
  var t = be(e).Element;
  return e instanceof t || e instanceof Element;
}
function xe(e) {
  var t = be(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ta(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = be(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function ad(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(s) {
    var n = t.styles[s] || {}, i = t.attributes[s] || {}, r = t.elements[s];
    !xe(r) || !Je(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
      var a = i[o];
      a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function ld(e) {
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
      !xe(i) || !Je(i) || (Object.assign(i.style, a), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const Fa = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ad,
  effect: ld,
  requires: ["computeStyles"]
};
function Ye(e) {
  return e.split("-")[0];
}
var Us = Math.max, cr = Math.min, Nn = Math.round;
function ta() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function fu() {
  return !/^((?!chrome|android).)*safari/i.test(ta());
}
function Sn(e, t, s) {
  t === void 0 && (t = !1), s === void 0 && (s = !1);
  var n = e.getBoundingClientRect(), i = 1, r = 1;
  t && xe(e) && (i = e.offsetWidth > 0 && Nn(n.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && Nn(n.height) / e.offsetHeight || 1);
  var o = Ws(e) ? be(e) : window, a = o.visualViewport, l = !fu() && s, c = (n.left + (l && a ? a.offsetLeft : 0)) / i, d = (n.top + (l && a ? a.offsetTop : 0)) / r, h = n.width / i, g = n.height / r;
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
function xa(e) {
  var t = Sn(e), s = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: s,
    height: n
  };
}
function pu(e, t) {
  var s = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (s && Ta(s)) {
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
  return be(e).getComputedStyle(e);
}
function cd(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function Ls(e) {
  return ((Ws(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Er(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ta(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ls(e)
  );
}
function pl(e) {
  return !xe(e) || // https://github.com/popperjs/popper-core/issues/837
  gs(e).position === "fixed" ? null : e.offsetParent;
}
function ud(e) {
  var t = /firefox/i.test(ta()), s = /Trident/i.test(ta());
  if (s && xe(e)) {
    var n = gs(e);
    if (n.position === "fixed")
      return null;
  }
  var i = Er(e);
  for (Ta(i) && (i = i.host); xe(i) && ["html", "body"].indexOf(Je(i)) < 0; ) {
    var r = gs(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function bi(e) {
  for (var t = be(e), s = pl(e); s && cd(s) && gs(s).position === "static"; )
    s = pl(s);
  return s && (Je(s) === "html" || Je(s) === "body" && gs(s).position === "static") ? t : s || ud(e) || t;
}
function Ca(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function oi(e, t, s) {
  return Us(e, cr(t, s));
}
function hd(e, t, s) {
  var n = oi(e, t, s);
  return n > s ? s : n;
}
function gu() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mu(e) {
  return Object.assign({}, gu(), e);
}
function bu(e, t) {
  return t.reduce(function(s, n) {
    return s[n] = e, s;
  }, {});
}
var dd = function(t, s) {
  return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
    placement: s.placement
  })) : t, mu(typeof t != "number" ? t : bu(t, Rn));
};
function fd(e) {
  var t, s = e.state, n = e.name, i = e.options, r = s.elements.arrow, o = s.modifiersData.popperOffsets, a = Ye(s.placement), l = Ca(a), c = [ue, me].indexOf(a) >= 0, d = c ? "height" : "width";
  if (!(!r || !o)) {
    var h = dd(i.padding, s), g = xa(r), v = l === "y" ? ce : ue, E = l === "y" ? ge : me, F = s.rects.reference[d] + s.rects.reference[l] - o[l] - s.rects.popper[d], N = o[l] - s.rects.reference[l], I = bi(r), j = I ? l === "y" ? I.clientHeight || 0 : I.clientWidth || 0 : 0, W = F / 2 - N / 2, Y = h[v], G = j - g[d] - h[E], X = j / 2 - g[d] / 2 + W, dt = oi(Y, X, G), ft = l;
    s.modifiersData[n] = (t = {}, t[ft] = dt, t.centerOffset = dt - X, t);
  }
}
function pd(e) {
  var t = e.state, s = e.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || pu(t.elements.popper, i) && (t.elements.arrow = i));
}
const yu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: fd,
  effect: pd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function kn(e) {
  return e.split("-")[1];
}
var gd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function md(e, t) {
  var s = e.x, n = e.y, i = t.devicePixelRatio || 1;
  return {
    x: Nn(s * i) / i || 0,
    y: Nn(n * i) / i || 0
  };
}
function gl(e) {
  var t, s = e.popper, n = e.popperRect, i = e.placement, r = e.variation, o = e.offsets, a = e.position, l = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, h = e.isFixed, g = o.x, v = g === void 0 ? 0 : g, E = o.y, F = E === void 0 ? 0 : E, N = typeof d == "function" ? d({
    x: v,
    y: F
  }) : {
    x: v,
    y: F
  };
  v = N.x, F = N.y;
  var I = o.hasOwnProperty("x"), j = o.hasOwnProperty("y"), W = ue, Y = ce, G = window;
  if (c) {
    var X = bi(s), dt = "clientHeight", ft = "clientWidth";
    if (X === be(s) && (X = Ls(s), gs(X).position !== "static" && a === "absolute" && (dt = "scrollHeight", ft = "scrollWidth")), X = X, i === ce || (i === ue || i === me) && r === On) {
      Y = ge;
      var C = h && X === G && G.visualViewport ? G.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        X[dt]
      );
      F -= C - n.height, F *= l ? 1 : -1;
    }
    if (i === ue || (i === ce || i === ge) && r === On) {
      W = me;
      var P = h && X === G && G.visualViewport ? G.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        X[ft]
      );
      v -= P - n.width, v *= l ? 1 : -1;
    }
  }
  var y = Object.assign({
    position: a
  }, c && gd), x = d === !0 ? md({
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
function bd(e) {
  var t = e.state, s = e.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, o = r === void 0 ? !0 : r, a = s.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: Ye(t.placement),
    variation: kn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, gl(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, gl(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Oa = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: bd,
  data: {}
};
var Pi = {
  passive: !0
};
function yd(e) {
  var t = e.state, s = e.instance, n = e.options, i = n.scroll, r = i === void 0 ? !0 : i, o = n.resize, a = o === void 0 ? !0 : o, l = be(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && c.forEach(function(d) {
    d.addEventListener("scroll", s.update, Pi);
  }), a && l.addEventListener("resize", s.update, Pi), function() {
    r && c.forEach(function(d) {
      d.removeEventListener("scroll", s.update, Pi);
    }), a && l.removeEventListener("resize", s.update, Pi);
  };
}
const Na = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: yd,
  data: {}
};
var vd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function nr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return vd[t];
  });
}
var _d = {
  start: "end",
  end: "start"
};
function ml(e) {
  return e.replace(/start|end/g, function(t) {
    return _d[t];
  });
}
function Sa(e) {
  var t = be(e), s = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function ka(e) {
  return Sn(Ls(e)).left + Sa(e).scrollLeft;
}
function Ed(e, t) {
  var s = be(e), n = Ls(e), i = s.visualViewport, r = n.clientWidth, o = n.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, o = i.height;
    var c = fu();
    (c || !c && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a + ka(e),
    y: l
  };
}
function wd(e) {
  var t, s = Ls(e), n = Sa(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, r = Us(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Us(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -n.scrollLeft + ka(e), l = -n.scrollTop;
  return gs(i || s).direction === "rtl" && (a += Us(s.clientWidth, i ? i.clientWidth : 0) - r), {
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
function vu(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : xe(e) && La(e) ? e : vu(Er(e));
}
function ai(e, t) {
  var s;
  t === void 0 && (t = []);
  var n = vu(e), i = n === ((s = e.ownerDocument) == null ? void 0 : s.body), r = be(n), o = i ? [r].concat(r.visualViewport || [], La(n) ? n : []) : n, a = t.concat(o);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(ai(Er(o)))
  );
}
function ea(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Ad(e, t) {
  var s = Sn(e, !1, t === "fixed");
  return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s;
}
function bl(e, t, s) {
  return t === wa ? ea(Ed(e, s)) : Ws(t) ? Ad(t, s) : ea(wd(Ls(e)));
}
function Td(e) {
  var t = ai(Er(e)), s = ["absolute", "fixed"].indexOf(gs(e).position) >= 0, n = s && xe(e) ? bi(e) : e;
  return Ws(n) ? t.filter(function(i) {
    return Ws(i) && pu(i, n) && Je(i) !== "body";
  }) : [];
}
function Fd(e, t, s, n) {
  var i = t === "clippingParents" ? Td(e) : [].concat(t), r = [].concat(i, [s]), o = r[0], a = r.reduce(function(l, c) {
    var d = bl(e, c, n);
    return l.top = Us(d.top, l.top), l.right = cr(d.right, l.right), l.bottom = cr(d.bottom, l.bottom), l.left = Us(d.left, l.left), l;
  }, bl(e, o, n));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function _u(e) {
  var t = e.reference, s = e.element, n = e.placement, i = n ? Ye(n) : null, r = n ? kn(n) : null, o = t.x + t.width / 2 - s.width / 2, a = t.y + t.height / 2 - s.height / 2, l;
  switch (i) {
    case ce:
      l = {
        x: o,
        y: t.y - s.height
      };
      break;
    case ge:
      l = {
        x: o,
        y: t.y + t.height
      };
      break;
    case me:
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
  var c = i ? Ca(i) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (r) {
      case Hs:
        l[c] = l[c] - (t[d] / 2 - s[d] / 2);
        break;
      case On:
        l[c] = l[c] + (t[d] / 2 - s[d] / 2);
        break;
    }
  }
  return l;
}
function Ln(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = n === void 0 ? e.placement : n, r = s.strategy, o = r === void 0 ? e.strategy : r, a = s.boundary, l = a === void 0 ? eu : a, c = s.rootBoundary, d = c === void 0 ? wa : c, h = s.elementContext, g = h === void 0 ? pn : h, v = s.altBoundary, E = v === void 0 ? !1 : v, F = s.padding, N = F === void 0 ? 0 : F, I = mu(typeof N != "number" ? N : bu(N, Rn)), j = g === pn ? su : pn, W = e.rects.popper, Y = e.elements[E ? j : g], G = Fd(Ws(Y) ? Y : Y.contextElement || Ls(e.elements.popper), l, d, o), X = Sn(e.elements.reference), dt = _u({
    reference: X,
    element: W,
    placement: i
  }), ft = ea(Object.assign({}, W, dt)), C = g === pn ? ft : X, P = {
    top: G.top - C.top + I.top,
    bottom: C.bottom - G.bottom + I.bottom,
    left: G.left - C.left + I.left,
    right: C.right - G.right + I.right
  }, y = e.modifiersData.offset;
  if (g === pn && y) {
    var x = y[i];
    Object.keys(P).forEach(function(w) {
      var O = [me, ge].indexOf(w) >= 0 ? 1 : -1, R = [ce, ge].indexOf(w) >= 0 ? "y" : "x";
      P[w] += x[R] * O;
    });
  }
  return P;
}
function xd(e, t) {
  t === void 0 && (t = {});
  var s = t, n = s.placement, i = s.boundary, r = s.rootBoundary, o = s.padding, a = s.flipVariations, l = s.allowedAutoPlacements, c = l === void 0 ? Aa : l, d = kn(n), h = d ? a ? Qo : Qo.filter(function(E) {
    return kn(E) === d;
  }) : Rn, g = h.filter(function(E) {
    return c.indexOf(E) >= 0;
  });
  g.length === 0 && (g = h);
  var v = g.reduce(function(E, F) {
    return E[F] = Ln(e, {
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
function Cd(e) {
  if (Ye(e) === _r)
    return [];
  var t = nr(e);
  return [ml(e), t, ml(t)];
}
function Od(e) {
  var t = e.state, s = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, a = o === void 0 ? !0 : o, l = s.fallbackPlacements, c = s.padding, d = s.boundary, h = s.rootBoundary, g = s.altBoundary, v = s.flipVariations, E = v === void 0 ? !0 : v, F = s.allowedAutoPlacements, N = t.options.placement, I = Ye(N), j = I === N, W = l || (j || !E ? [nr(N)] : Cd(N)), Y = [N].concat(W).reduce(function(nt, H) {
      return nt.concat(Ye(H) === _r ? xd(t, {
        placement: H,
        boundary: d,
        rootBoundary: h,
        padding: c,
        flipVariations: E,
        allowedAutoPlacements: F
      }) : H);
    }, []), G = t.rects.reference, X = t.rects.popper, dt = /* @__PURE__ */ new Map(), ft = !0, C = Y[0], P = 0; P < Y.length; P++) {
      var y = Y[P], x = Ye(y), w = kn(y) === Hs, O = [ce, ge].indexOf(x) >= 0, R = O ? "width" : "height", A = Ln(t, {
        placement: y,
        boundary: d,
        rootBoundary: h,
        altBoundary: g,
        padding: c
      }), S = O ? w ? me : ue : w ? ge : ce;
      G[R] > X[R] && (S = nr(S));
      var z = nr(S), K = [];
      if (r && K.push(A[x] <= 0), a && K.push(A[S] <= 0, A[z] <= 0), K.every(function(nt) {
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
const Eu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Od,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function yl(e, t, s) {
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
function vl(e) {
  return [ce, me, ge, ue].some(function(t) {
    return e[t] >= 0;
  });
}
function Nd(e) {
  var t = e.state, s = e.name, n = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = Ln(t, {
    elementContext: "reference"
  }), a = Ln(t, {
    altBoundary: !0
  }), l = yl(o, n), c = yl(a, i, r), d = vl(l), h = vl(c);
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
const wu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Nd
};
function Sd(e, t, s) {
  var n = Ye(e), i = [ue, ce].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, t, {
    placement: e
  })) : s, o = r[0], a = r[1];
  return o = o || 0, a = (a || 0) * i, [ue, me].indexOf(n) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function kd(e) {
  var t = e.state, s = e.options, n = e.name, i = s.offset, r = i === void 0 ? [0, 0] : i, o = Aa.reduce(function(d, h) {
    return d[h] = Sd(h, t.rects, r), d;
  }, {}), a = o[t.placement], l = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[n] = o;
}
const Au = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: kd
};
function Ld(e) {
  var t = e.state, s = e.name;
  t.modifiersData[s] = _u({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Ia = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ld,
  data: {}
};
function Id(e) {
  return e === "x" ? "y" : "x";
}
function $d(e) {
  var t = e.state, s = e.options, n = e.name, i = s.mainAxis, r = i === void 0 ? !0 : i, o = s.altAxis, a = o === void 0 ? !1 : o, l = s.boundary, c = s.rootBoundary, d = s.altBoundary, h = s.padding, g = s.tether, v = g === void 0 ? !0 : g, E = s.tetherOffset, F = E === void 0 ? 0 : E, N = Ln(t, {
    boundary: l,
    rootBoundary: c,
    padding: h,
    altBoundary: d
  }), I = Ye(t.placement), j = kn(t.placement), W = !j, Y = Ca(I), G = Id(Y), X = t.modifiersData.popperOffsets, dt = t.rects.reference, ft = t.rects.popper, C = typeof F == "function" ? F(Object.assign({}, t.rects, {
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
      var w, O = Y === "y" ? ce : ue, R = Y === "y" ? ge : me, A = Y === "y" ? "height" : "width", S = X[Y], z = S + N[O], K = S - N[R], U = v ? -ft[A] / 2 : 0, et = j === Hs ? dt[A] : ft[A], Q = j === Hs ? -ft[A] : -dt[A], rt = t.elements.arrow, nt = v && rt ? xa(rt) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : gu(), Z = H[O], bt = H[R], tt = oi(0, dt[A], nt[A]), pt = W ? dt[A] / 2 - U - tt - Z - P.mainAxis : et - tt - Z - P.mainAxis, gt = W ? -dt[A] / 2 + U + tt + bt + P.mainAxis : Q + tt + bt + P.mainAxis, M = t.elements.arrow && bi(t.elements.arrow), B = M ? Y === "y" ? M.clientTop || 0 : M.clientLeft || 0 : 0, q = (w = y?.[Y]) != null ? w : 0, J = S + pt - q - B, Dt = S + gt - q, ve = oi(v ? cr(z, J) : z, S, v ? Us(K, Dt) : K);
      X[Y] = ve, x[Y] = ve - S;
    }
    if (a) {
      var ke, ss = Y === "x" ? ce : ue, ns = Y === "x" ? ge : me, Xt = X[G], oe = G === "y" ? "height" : "width", _e = Xt + N[ss], Ht = Xt - N[ns], xt = [ce, ue].indexOf(I) !== -1, at = (ke = y?.[G]) != null ? ke : 0, ct = xt ? _e : Xt - dt[oe] - ft[oe] - at + P.altAxis, _t = xt ? Xt + dt[oe] + ft[oe] - at - P.altAxis : Ht, Et = v && xt ? hd(ct, Xt, _t) : oi(v ? ct : _e, Xt, v ? _t : Ht);
      X[G] = Et, x[G] = Et - Xt;
    }
    t.modifiersData[n] = x;
  }
}
const Tu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: $d,
  requiresIfExists: ["offset"]
};
function Dd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Rd(e) {
  return e === be(e) || !xe(e) ? Sa(e) : Dd(e);
}
function Md(e) {
  var t = e.getBoundingClientRect(), s = Nn(t.width) / e.offsetWidth || 1, n = Nn(t.height) / e.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function Bd(e, t, s) {
  s === void 0 && (s = !1);
  var n = xe(t), i = xe(t) && Md(t), r = Ls(t), o = Sn(e, i, s), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  La(r)) && (a = Rd(t)), xe(t) ? (l = Sn(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : r && (l.x = ka(r))), {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function qd(e) {
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
function Pd(e) {
  var t = qd(e);
  return du.reduce(function(s, n) {
    return s.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Vd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(s) {
      Promise.resolve().then(function() {
        t = void 0, s(e());
      });
    })), t;
  };
}
function jd(e) {
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
var _l = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function El() {
  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
    t[s] = arguments[s];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function wr(e) {
  e === void 0 && (e = {});
  var t = e, s = t.defaultModifiers, n = s === void 0 ? [] : s, i = t.defaultOptions, r = i === void 0 ? _l : i;
  return function(a, l, c) {
    c === void 0 && (c = r);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, _l, r),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, h = [], g = !1, v = {
      state: d,
      setOptions: function(I) {
        var j = typeof I == "function" ? I(d.options) : I;
        F(), d.options = Object.assign({}, r, d.options, j), d.scrollParents = {
          reference: Ws(a) ? ai(a) : a.contextElement ? ai(a.contextElement) : [],
          popper: ai(l)
        };
        var W = Pd(jd([].concat(n, d.options.modifiers)));
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
        if (!g) {
          var I = d.elements, j = I.reference, W = I.popper;
          if (El(j, W)) {
            d.rects = {
              reference: Bd(j, bi(W), d.options.strategy === "fixed"),
              popper: xa(W)
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
      update: Vd(function() {
        return new Promise(function(N) {
          v.forceUpdate(), N(d);
        });
      }),
      destroy: function() {
        F(), g = !0;
      }
    };
    if (!El(a, l))
      return v;
    v.setOptions(c).then(function(N) {
      !g && c.onFirstUpdate && c.onFirstUpdate(N);
    });
    function E() {
      d.orderedModifiers.forEach(function(N) {
        var I = N.name, j = N.options, W = j === void 0 ? {} : j, Y = N.effect;
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
      h.forEach(function(N) {
        return N();
      }), h = [];
    }
    return v;
  };
}
var Ud = /* @__PURE__ */ wr(), Hd = [Na, Ia, Oa, Fa], Wd = /* @__PURE__ */ wr({
  defaultModifiers: Hd
}), zd = [Na, Ia, Oa, Fa, Au, Eu, Tu, yu, wu], $a = /* @__PURE__ */ wr({
  defaultModifiers: zd
});
const Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: lu,
  afterRead: ru,
  afterWrite: hu,
  applyStyles: Fa,
  arrow: yu,
  auto: _r,
  basePlacements: Rn,
  beforeMain: ou,
  beforeRead: nu,
  beforeWrite: cu,
  bottom: ge,
  clippingParents: eu,
  computeStyles: Oa,
  createPopper: $a,
  createPopperBase: Ud,
  createPopperLite: Wd,
  detectOverflow: Ln,
  end: On,
  eventListeners: Na,
  flip: Eu,
  hide: wu,
  left: ue,
  main: au,
  modifierPhases: du,
  offset: Au,
  placements: Aa,
  popper: pn,
  popperGenerator: wr,
  popperOffsets: Ia,
  preventOverflow: Tu,
  read: iu,
  reference: su,
  right: me,
  start: Hs,
  top: ce,
  variationPlacements: Qo,
  viewport: wa,
  write: uu
}, Symbol.toStringTag, { value: "Module" }));
const As = /* @__PURE__ */ new Map(), wo = {
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
}, Kd = 1e6, Gd = 1e3, sa = "transitionend", xu = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, s) => `#${CSS.escape(s)}`)), e), Yd = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), Xd = (e) => {
  do
    e += Math.floor(Math.random() * Kd);
  while (document.getElementById(e));
  return e;
}, Zd = (e) => {
  if (!e)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: s
  } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), i = Number.parseFloat(s);
  return !n && !i ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * Gd);
}, Cu = (e) => {
  e.dispatchEvent(new Event(sa));
}, fs = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Os = (e) => fs(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(xu(e)) : null, Mn = (e) => {
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
}, Ns = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Ou = (e) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof e.getRootNode == "function") {
    const t = e.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return e instanceof ShadowRoot ? e : e.parentNode ? Ou(e.parentNode) : null;
}, ur = () => {
}, yi = (e) => {
  e.offsetHeight;
}, Nu = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Ao = [], Jd = (e) => {
  document.readyState === "loading" ? (Ao.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Ao)
      t();
  }), Ao.push(e)) : e();
}, Ce = () => document.documentElement.dir === "rtl", Ne = (e) => {
  Jd(() => {
    const t = Nu();
    if (t) {
      const s = e.NAME, n = t.fn[s];
      t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = n, e.jQueryInterface);
    }
  });
}, pe = (e, t = [], s = e) => typeof e == "function" ? e.call(...t) : s, Su = (e, t, s = !0) => {
  if (!s) {
    pe(e);
    return;
  }
  const i = Zd(t) + 5;
  let r = !1;
  const o = ({
    target: a
  }) => {
    a === t && (r = !0, t.removeEventListener(sa, o), pe(e));
  };
  t.addEventListener(sa, o), setTimeout(() => {
    r || Cu(t);
  }, i);
}, Da = (e, t, s, n) => {
  const i = e.length;
  let r = e.indexOf(t);
  return r === -1 ? !s && n ? e[i - 1] : e[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), e[Math.max(0, Math.min(r, i - 1))]);
}, Qd = /[^.]*(?=\..*)\.|.*/, tf = /\..*/, ef = /::\d+$/, To = {};
let wl = 1;
const ku = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, sf = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function Lu(e, t) {
  return t && `${t}::${wl++}` || e.uidEvent || wl++;
}
function Iu(e) {
  const t = Lu(e);
  return e.uidEvent = t, To[t] = To[t] || {}, To[t];
}
function nf(e, t) {
  return function s(n) {
    return Ra(n, {
      delegateTarget: e
    }), s.oneOff && V.off(e, n.type, t), t.apply(e, [n]);
  };
}
function rf(e, t, s) {
  return function n(i) {
    const r = e.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const a of r)
        if (a === o)
          return Ra(i, {
            delegateTarget: o
          }), n.oneOff && V.off(e, i.type, t, s), s.apply(o, [i]);
  };
}
function $u(e, t, s = null) {
  return Object.values(e).find((n) => n.callable === t && n.delegationSelector === s);
}
function Du(e, t, s) {
  const n = typeof t == "string", i = n ? s : t || s;
  let r = Ru(e);
  return sf.has(r) || (r = e), [n, i, r];
}
function Al(e, t, s, n, i) {
  if (typeof t != "string" || !e)
    return;
  let [r, o, a] = Du(t, s, n);
  t in ku && (o = ((E) => function(F) {
    if (!F.relatedTarget || F.relatedTarget !== F.delegateTarget && !F.delegateTarget.contains(F.relatedTarget))
      return E.call(this, F);
  })(o));
  const l = Iu(e), c = l[a] || (l[a] = {}), d = $u(c, o, r ? s : null);
  if (d) {
    d.oneOff = d.oneOff && i;
    return;
  }
  const h = Lu(o, t.replace(Qd, "")), g = r ? rf(e, s, o) : nf(e, o);
  g.delegationSelector = r ? s : null, g.callable = o, g.oneOff = i, g.uidEvent = h, c[h] = g, e.addEventListener(a, g, r);
}
function na(e, t, s, n, i) {
  const r = $u(t[s], n, i);
  r && (e.removeEventListener(s, r, !!i), delete t[s][r.uidEvent]);
}
function of(e, t, s, n) {
  const i = t[s] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(n) && na(e, t, s, o.callable, o.delegationSelector);
}
function Ru(e) {
  return e = e.replace(tf, ""), ku[e] || e;
}
const V = {
  on(e, t, s, n) {
    Al(e, t, s, n, !1);
  },
  one(e, t, s, n) {
    Al(e, t, s, n, !0);
  },
  off(e, t, s, n) {
    if (typeof t != "string" || !e)
      return;
    const [i, r, o] = Du(t, s, n), a = o !== t, l = Iu(e), c = l[o] || {}, d = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(c).length)
        return;
      na(e, l, o, r, i ? s : null);
      return;
    }
    if (d)
      for (const h of Object.keys(l))
        of(e, l, h, t.slice(1));
    for (const [h, g] of Object.entries(c)) {
      const v = h.replace(ef, "");
      (!a || t.includes(v)) && na(e, l, o, g.callable, g.delegationSelector);
    }
  },
  trigger(e, t, s) {
    if (typeof t != "string" || !e)
      return null;
    const n = Nu(), i = Ru(t), r = t !== i;
    let o = null, a = !0, l = !0, c = !1;
    r && n && (o = n.Event(t, s), n(e).trigger(o), a = !o.isPropagationStopped(), l = !o.isImmediatePropagationStopped(), c = o.isDefaultPrevented());
    const d = Ra(new Event(t, {
      bubbles: a,
      cancelable: !0
    }), s);
    return c && d.preventDefault(), l && e.dispatchEvent(d), d.defaultPrevented && o && o.preventDefault(), d;
  }
};
function Ra(e, t = {}) {
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
function Tl(e) {
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
function Fo(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const ps = {
  setDataAttribute(e, t, s) {
    e.setAttribute(`data-bs-${Fo(t)}`, s);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Fo(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, s = Object.keys(e.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of s) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1), t[i] = Tl(e.dataset[n]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Tl(e.getAttribute(`data-bs-${Fo(t)}`));
  }
};
class vi {
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
      const r = t[n], o = fs(r) ? "element" : Yd(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const af = "5.3.8";
class je extends vi {
  constructor(t, s) {
    super(), t = Os(t), t && (this._element = t, this._config = this._getConfig(s), wo.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    wo.remove(this._element, this.constructor.DATA_KEY), V.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  // Private
  _queueCallback(t, s, n = !0) {
    Su(t, s, n);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return wo.get(Os(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, s = {}) {
    return this.getInstance(t) || new this(t, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return af;
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
const xo = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let s = e.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), t = s && s !== "#" ? s.trim() : null;
  }
  return t ? t.split(",").map((s) => xu(s)).join(",") : null;
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
    return this.find(t, e).filter((s) => !Ns(s) && Mn(s));
  },
  getSelectorFromElement(e) {
    const t = xo(e);
    return t && ut.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = xo(e);
    return t ? ut.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = xo(e);
    return t ? ut.find(t) : [];
  }
}, Ar = (e, t = "hide") => {
  const s = `click.dismiss${e.EVENT_KEY}`, n = e.NAME;
  V.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), Ns(this))
      return;
    const r = ut.getElementFromSelector(this) || this.closest(`.${n}`);
    e.getOrCreateInstance(r)[t]();
  });
}, lf = "alert", cf = "bs.alert", Mu = `.${cf}`, uf = `close${Mu}`, hf = `closed${Mu}`, df = "fade", ff = "show";
class Tr extends je {
  // Getters
  static get NAME() {
    return lf;
  }
  // Public
  close() {
    if (V.trigger(this._element, uf).defaultPrevented)
      return;
    this._element.classList.remove(ff);
    const s = this._element.classList.contains(df);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), V.trigger(this._element, hf), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Tr.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
Ar(Tr, "close");
Ne(Tr);
const pf = "button", gf = "bs.button", mf = `.${gf}`, bf = ".data-api", yf = "active", Fl = '[data-bs-toggle="button"]', vf = `click${mf}${bf}`;
class Fr extends je {
  // Getters
  static get NAME() {
    return pf;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(yf));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Fr.getOrCreateInstance(this);
      t === "toggle" && s[t]();
    });
  }
}
V.on(document, vf, Fl, (e) => {
  e.preventDefault();
  const t = e.target.closest(Fl);
  Fr.getOrCreateInstance(t).toggle();
});
Ne(Fr);
const _f = "swipe", Bn = ".bs.swipe", Ef = `touchstart${Bn}`, wf = `touchmove${Bn}`, Af = `touchend${Bn}`, Tf = `pointerdown${Bn}`, Ff = `pointerup${Bn}`, xf = "touch", Cf = "pen", Of = "pointer-event", Nf = 40, Sf = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, kf = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class hr extends vi {
  constructor(t, s) {
    super(), this._element = t, !(!t || !hr.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return Sf;
  }
  static get DefaultType() {
    return kf;
  }
  static get NAME() {
    return _f;
  }
  // Public
  dispose() {
    V.off(this._element, Bn);
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
    if (t <= Nf)
      return;
    const s = t / this._deltaX;
    this._deltaX = 0, s && pe(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (V.on(this._element, Tf, (t) => this._start(t)), V.on(this._element, Ff, (t) => this._end(t)), this._element.classList.add(Of)) : (V.on(this._element, Ef, (t) => this._start(t)), V.on(this._element, wf, (t) => this._move(t)), V.on(this._element, Af, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === Cf || t.pointerType === xf);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const Lf = "carousel", If = "bs.carousel", Is = `.${If}`, Bu = ".data-api", $f = "ArrowLeft", Df = "ArrowRight", Rf = 500, Zn = "next", dn = "prev", gn = "left", ir = "right", Mf = `slide${Is}`, Co = `slid${Is}`, Bf = `keydown${Is}`, qf = `mouseenter${Is}`, Pf = `mouseleave${Is}`, Vf = `dragstart${Is}`, jf = `load${Is}${Bu}`, Uf = `click${Is}${Bu}`, qu = "carousel", Vi = "active", Hf = "slide", Wf = "carousel-item-end", zf = "carousel-item-start", Kf = "carousel-item-next", Gf = "carousel-item-prev", Pu = ".active", Vu = ".carousel-item", Yf = Pu + Vu, Xf = ".carousel-item img", Zf = ".carousel-indicators", Jf = "[data-bs-slide], [data-bs-slide-to]", Qf = '[data-bs-ride="carousel"]', tp = {
  [$f]: ir,
  [Df]: gn
}, ep = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, sp = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class _i extends je {
  constructor(t, s) {
    super(t, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = ut.findOne(Zf, this._element), this._addEventListeners(), this._config.ride === qu && this.cycle();
  }
  // Getters
  static get Default() {
    return ep;
  }
  static get DefaultType() {
    return sp;
  }
  static get NAME() {
    return Lf;
  }
  // Public
  next() {
    this._slide(Zn);
  }
  nextWhenVisible() {
    !document.hidden && Mn(this._element) && this.next();
  }
  prev() {
    this._slide(dn);
  }
  pause() {
    this._isSliding && Cu(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        V.one(this._element, Co, () => this.cycle());
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
      V.one(this._element, Co, () => this.to(t));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === t)
      return;
    const i = t > n ? Zn : dn;
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
    this._config.keyboard && V.on(this._element, Bf, (t) => this._keydown(t)), this._config.pause === "hover" && (V.on(this._element, qf, () => this.pause()), V.on(this._element, Pf, () => this._maybeEnableCycle())), this._config.touch && hr.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of ut.find(Xf, this._element))
      V.on(n, Vf, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(gn)),
      rightCallback: () => this._slide(this._directionToOrder(ir)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Rf + this._config.interval));
      }
    };
    this._swipeHelper = new hr(this._element, s);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const s = tp[t.key];
    s && (t.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const s = ut.findOne(Pu, this._indicatorsElement);
    s.classList.remove(Vi), s.removeAttribute("aria-current");
    const n = ut.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    n && (n.classList.add(Vi), n.setAttribute("aria-current", "true"));
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
    const n = this._getActive(), i = t === Zn, r = s || Da(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const o = this._getItemIndex(r), a = (v) => V.trigger(this._element, v, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(n),
      to: o
    });
    if (a(Mf).defaultPrevented || !n || !r)
      return;
    const c = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const d = i ? zf : Wf, h = i ? Kf : Gf;
    r.classList.add(h), yi(r), n.classList.add(d), r.classList.add(d);
    const g = () => {
      r.classList.remove(d, h), r.classList.add(Vi), n.classList.remove(Vi, h, d), this._isSliding = !1, a(Co);
    };
    this._queueCallback(g, n, this._isAnimated()), c && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(Hf);
  }
  _getActive() {
    return ut.findOne(Yf, this._element);
  }
  _getItems() {
    return ut.find(Vu, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return Ce() ? t === gn ? dn : Zn : t === gn ? Zn : dn;
  }
  _orderToDirection(t) {
    return Ce() ? t === dn ? gn : ir : t === dn ? ir : gn;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = _i.getOrCreateInstance(this, t);
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
V.on(document, Uf, Jf, function(e) {
  const t = ut.getElementFromSelector(this);
  if (!t || !t.classList.contains(qu))
    return;
  e.preventDefault();
  const s = _i.getOrCreateInstance(t), n = this.getAttribute("data-bs-slide-to");
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
V.on(window, jf, () => {
  const e = ut.find(Qf);
  for (const t of e)
    _i.getOrCreateInstance(t);
});
Ne(_i);
const np = "collapse", ip = "bs.collapse", Ei = `.${ip}`, rp = ".data-api", op = `show${Ei}`, ap = `shown${Ei}`, lp = `hide${Ei}`, cp = `hidden${Ei}`, up = `click${Ei}${rp}`, Oo = "show", wn = "collapse", ji = "collapsing", hp = "collapsed", dp = `:scope .${wn} .${wn}`, fp = "collapse-horizontal", pp = "width", gp = "height", mp = ".collapse.show, .collapse.collapsing", ia = '[data-bs-toggle="collapse"]', bp = {
  parent: null,
  toggle: !0
}, yp = {
  parent: "(null|element)",
  toggle: "boolean"
};
class ui extends je {
  constructor(t, s) {
    super(t, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = ut.find(ia);
    for (const i of n) {
      const r = ut.getSelectorFromElement(i), o = ut.find(r).filter((a) => a === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return bp;
  }
  static get DefaultType() {
    return yp;
  }
  static get NAME() {
    return np;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(mp).filter((a) => a !== this._element).map((a) => ui.getOrCreateInstance(a, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || V.trigger(this._element, op).defaultPrevented)
      return;
    for (const a of t)
      a.hide();
    const n = this._getDimension();
    this._element.classList.remove(wn), this._element.classList.add(ji), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(ji), this._element.classList.add(wn, Oo), this._element.style[n] = "", V.trigger(this._element, ap);
    }, o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || V.trigger(this._element, lp).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, yi(this._element), this._element.classList.add(ji), this._element.classList.remove(wn, Oo);
    for (const i of this._triggerArray) {
      const r = ut.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(ji), this._element.classList.add(wn), V.trigger(this._element, cp);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  // Private
  _isShown(t = this._element) {
    return t.classList.contains(Oo);
  }
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = Os(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(fp) ? pp : gp;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(ia);
    for (const s of t) {
      const n = ut.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(t) {
    const s = ut.find(dp, this._config.parent);
    return ut.find(t, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(t, s) {
    if (t.length)
      for (const n of t)
        n.classList.toggle(hp, !s), n.setAttribute("aria-expanded", s);
  }
  // Static
  static jQueryInterface(t) {
    const s = {};
    return typeof t == "string" && /show|hide/.test(t) && (s.toggle = !1), this.each(function() {
      const n = ui.getOrCreateInstance(this, s);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
V.on(document, up, ia, function(e) {
  (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
  for (const t of ut.getMultipleElementsFromSelector(this))
    ui.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
Ne(ui);
const xl = "dropdown", vp = "bs.dropdown", Zs = `.${vp}`, Ma = ".data-api", _p = "Escape", Cl = "Tab", Ep = "ArrowUp", Ol = "ArrowDown", wp = 2, Ap = `hide${Zs}`, Tp = `hidden${Zs}`, Fp = `show${Zs}`, xp = `shown${Zs}`, ju = `click${Zs}${Ma}`, Uu = `keydown${Zs}${Ma}`, Cp = `keyup${Zs}${Ma}`, mn = "show", Op = "dropup", Np = "dropend", Sp = "dropstart", kp = "dropup-center", Lp = "dropdown-center", Vs = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Ip = `${Vs}.${mn}`, rr = ".dropdown-menu", $p = ".navbar", Dp = ".navbar-nav", Rp = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Mp = Ce() ? "top-end" : "top-start", Bp = Ce() ? "top-start" : "top-end", qp = Ce() ? "bottom-end" : "bottom-start", Pp = Ce() ? "bottom-start" : "bottom-end", Vp = Ce() ? "left-start" : "right-start", jp = Ce() ? "right-start" : "left-start", Up = "top", Hp = "bottom", Wp = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, zp = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Xe extends je {
  constructor(t, s) {
    super(t, s), this._popper = null, this._parent = this._element.parentNode, this._menu = ut.next(this._element, rr)[0] || ut.prev(this._element, rr)[0] || ut.findOne(rr, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Wp;
  }
  static get DefaultType() {
    return zp;
  }
  static get NAME() {
    return xl;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Ns(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!V.trigger(this._element, Fp, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Dp))
        for (const n of [].concat(...document.body.children))
          V.on(n, "mouseover", ur);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(mn), this._element.classList.add(mn), V.trigger(this._element, xp, t);
    }
  }
  hide() {
    if (Ns(this._element) || !this._isShown())
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
    if (!V.trigger(this._element, Ap, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          V.off(n, "mouseover", ur);
      this._popper && this._popper.destroy(), this._menu.classList.remove(mn), this._element.classList.remove(mn), this._element.setAttribute("aria-expanded", "false"), ps.removeDataAttribute(this._menu, "popper"), V.trigger(this._element, Tp, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !fs(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${xl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Fu > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : fs(this._config.reference) ? t = Os(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = $a(t, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(mn);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Np))
      return Vp;
    if (t.classList.contains(Sp))
      return jp;
    if (t.classList.contains(kp))
      return Up;
    if (t.classList.contains(Lp))
      return Hp;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Op) ? s ? Bp : Mp : s ? Pp : qp;
  }
  _detectNavbar() {
    return this._element.closest($p) !== null;
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
    const n = ut.find(Rp, this._menu).filter((i) => Mn(i));
    n.length && Da(n, s, t === Ol, !n.includes(s)).focus();
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
    if (t.button === wp || t.type === "keyup" && t.key !== Cl)
      return;
    const s = ut.find(Ip);
    for (const n of s) {
      const i = Xe.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === Cl || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const a = {
        relatedTarget: i._element
      };
      t.type === "click" && (a.clickEvent = t), i._completeHide(a);
    }
  }
  static dataApiKeydownHandler(t) {
    const s = /input|textarea/i.test(t.target.tagName), n = t.key === _p, i = [Ep, Ol].includes(t.key);
    if (!i && !n || s && !n)
      return;
    t.preventDefault();
    const r = this.matches(Vs) ? this : ut.prev(this, Vs)[0] || ut.next(this, Vs)[0] || ut.findOne(Vs, t.delegateTarget.parentNode), o = Xe.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
V.on(document, Uu, Vs, Xe.dataApiKeydownHandler);
V.on(document, Uu, rr, Xe.dataApiKeydownHandler);
V.on(document, ju, Xe.clearMenus);
V.on(document, Cp, Xe.clearMenus);
V.on(document, ju, Vs, function(e) {
  e.preventDefault(), Xe.getOrCreateInstance(this).toggle();
});
Ne(Xe);
const Hu = "backdrop", Kp = "fade", Nl = "show", Sl = `mousedown.bs.${Hu}`, Gp = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, Yp = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class Wu extends vi {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return Gp;
  }
  static get DefaultType() {
    return Yp;
  }
  static get NAME() {
    return Hu;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      pe(t);
      return;
    }
    this._append();
    const s = this._getElement();
    this._config.isAnimated && yi(s), s.classList.add(Nl), this._emulateAnimation(() => {
      pe(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      pe(t);
      return;
    }
    this._getElement().classList.remove(Nl), this._emulateAnimation(() => {
      this.dispose(), pe(t);
    });
  }
  dispose() {
    this._isAppended && (V.off(this._element, Sl), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(Kp), this._element = t;
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
    this._config.rootElement.append(t), V.on(t, Sl, () => {
      pe(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Su(t, this._getElement(), this._config.isAnimated);
  }
}
const Xp = "focustrap", Zp = "bs.focustrap", dr = `.${Zp}`, Jp = `focusin${dr}`, Qp = `keydown.tab${dr}`, tg = "Tab", eg = "forward", kl = "backward", sg = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, ng = {
  autofocus: "boolean",
  trapElement: "element"
};
class zu extends vi {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return sg;
  }
  static get DefaultType() {
    return ng;
  }
  static get NAME() {
    return Xp;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), V.off(document, dr), V.on(document, Jp, (t) => this._handleFocusin(t)), V.on(document, Qp, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, V.off(document, dr));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: s
    } = this._config;
    if (t.target === document || t.target === s || s.contains(t.target))
      return;
    const n = ut.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === kl ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(t) {
    t.key === tg && (this._lastTabNavDirection = t.shiftKey ? kl : eg);
  }
}
const Ll = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Il = ".sticky-top", Ui = "padding-right", $l = "margin-right";
class ra {
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
    this._disableOverFlow(), this._setElementAttributes(this._element, Ui, (s) => s + t), this._setElementAttributes(Ll, Ui, (s) => s + t), this._setElementAttributes(Il, $l, (s) => s - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Ui), this._resetElementAttributes(Ll, Ui), this._resetElementAttributes(Il, $l);
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
const ig = "modal", rg = "bs.modal", Oe = `.${rg}`, og = ".data-api", ag = "Escape", lg = `hide${Oe}`, cg = `hidePrevented${Oe}`, Ku = `hidden${Oe}`, Gu = `show${Oe}`, ug = `shown${Oe}`, hg = `resize${Oe}`, dg = `click.dismiss${Oe}`, fg = `mousedown.dismiss${Oe}`, pg = `keydown.dismiss${Oe}`, gg = `click${Oe}${og}`, Dl = "modal-open", mg = "fade", Rl = "show", No = "modal-static", bg = ".modal.show", yg = ".modal-dialog", vg = ".modal-body", _g = '[data-bs-toggle="modal"]', Eg = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, wg = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class zs extends je {
  constructor(t, s) {
    super(t, s), this._dialog = ut.findOne(yg, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new ra(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Eg;
  }
  static get DefaultType() {
    return wg;
  }
  static get NAME() {
    return ig;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || V.trigger(this._element, Gu, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Dl), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || V.trigger(this._element, lg).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Rl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    V.off(window, Oe), V.off(this._dialog, Oe), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new Wu({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new zu({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = ut.findOne(vg, this._dialog);
    s && (s.scrollTop = 0), yi(this._element), this._element.classList.add(Rl);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, V.trigger(this._element, ug, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    V.on(this._element, pg, (t) => {
      if (t.key === ag) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), V.on(window, hg, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), V.on(this._element, fg, (t) => {
      V.one(this._element, dg, (s) => {
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
      document.body.classList.remove(Dl), this._resetAdjustments(), this._scrollBar.reset(), V.trigger(this._element, Ku);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(mg);
  }
  _triggerBackdropTransition() {
    if (V.trigger(this._element, cg).defaultPrevented)
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
      const i = Ce() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${s}px`;
    }
    if (!n && t) {
      const i = Ce() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${s}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, s) {
    return this.each(function() {
      const n = zs.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t](s);
      }
    });
  }
}
V.on(document, gg, _g, function(e) {
  const t = ut.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), V.one(t, Gu, (i) => {
    i.defaultPrevented || V.one(t, Ku, () => {
      Mn(this) && this.focus();
    });
  });
  const s = ut.findOne(bg);
  s && zs.getInstance(s).hide(), zs.getOrCreateInstance(t).toggle(this);
});
Ar(zs);
Ne(zs);
const Ag = "offcanvas", Tg = "bs.offcanvas", ys = `.${Tg}`, Yu = ".data-api", Fg = `load${ys}${Yu}`, xg = "Escape", Ml = "show", Bl = "showing", ql = "hiding", Cg = "offcanvas-backdrop", Xu = ".offcanvas.show", Og = `show${ys}`, Ng = `shown${ys}`, Sg = `hide${ys}`, Pl = `hidePrevented${ys}`, Zu = `hidden${ys}`, kg = `resize${ys}`, Lg = `click${ys}${Yu}`, Ig = `keydown.dismiss${ys}`, $g = '[data-bs-toggle="offcanvas"]', Dg = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, Rg = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class Ss extends je {
  constructor(t, s) {
    super(t, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Dg;
  }
  static get DefaultType() {
    return Rg;
  }
  static get NAME() {
    return Ag;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || V.trigger(this._element, Og, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new ra().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Bl);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Ml), this._element.classList.remove(Bl), V.trigger(this._element, Ng, {
        relatedTarget: t
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || V.trigger(this._element, Sg).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ql), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(Ml, ql), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new ra().reset(), V.trigger(this._element, Zu);
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
        V.trigger(this._element, Pl);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new Wu({
      className: Cg,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? t : null
    });
  }
  _initializeFocusTrap() {
    return new zu({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    V.on(this._element, Ig, (t) => {
      if (t.key === xg) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        V.trigger(this._element, Pl);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ss.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
V.on(document, Lg, $g, function(e) {
  const t = ut.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), Ns(this))
    return;
  V.one(t, Zu, () => {
    Mn(this) && this.focus();
  });
  const s = ut.findOne(Xu);
  s && s !== t && Ss.getInstance(s).hide(), Ss.getOrCreateInstance(t).toggle(this);
});
V.on(window, Fg, () => {
  for (const e of ut.find(Xu))
    Ss.getOrCreateInstance(e).show();
});
V.on(window, kg, () => {
  for (const e of ut.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" && Ss.getOrCreateInstance(e).hide();
});
Ar(Ss);
Ne(Ss);
const Mg = /^aria-[\w-]*$/i, Ju = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", Mg],
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
}, Bg = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), qg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Pg = (e, t) => {
  const s = e.nodeName.toLowerCase();
  return t.includes(s) ? Bg.has(s) ? !!qg.test(e.nodeValue) : !0 : t.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function Vg(e, t, s) {
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
      Pg(d, c) || o.removeAttribute(d.nodeName);
  }
  return i.body.innerHTML;
}
const jg = "TemplateFactory", Ug = {
  allowList: Ju,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, Hg = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, Wg = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class zg extends vi {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return Ug;
  }
  static get DefaultType() {
    return Hg;
  }
  static get NAME() {
    return jg;
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
      }, Wg);
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
    return this._config.sanitize ? Vg(t, this._config.allowList, this._config.sanitizeFn) : t;
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
const Kg = "tooltip", Gg = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), So = "fade", Yg = "modal", Hi = "show", Xg = ".tooltip-inner", Vl = `.${Yg}`, jl = "hide.bs.modal", Jn = "hover", ko = "focus", Lo = "click", Zg = "manual", Jg = "hide", Qg = "hidden", tm = "show", em = "shown", sm = "inserted", nm = "click", im = "focusin", rm = "focusout", om = "mouseenter", am = "mouseleave", lm = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: Ce() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: Ce() ? "right" : "left"
}, cm = {
  allowList: Ju,
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
}, um = {
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
let xr = class Qu extends je {
  constructor(t, s) {
    if (typeof Fu > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
    super(t, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return cm;
  }
  static get DefaultType() {
    return um;
  }
  static get NAME() {
    return Kg;
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
    clearTimeout(this._timeout), V.off(this._element.closest(Vl), jl, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = V.trigger(this._element, this.constructor.eventName(tm)), n = (Ou(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), V.trigger(this._element, this.constructor.eventName(sm))), this._popper = this._createPopper(i), i.classList.add(Hi), "ontouchstart" in document.documentElement)
      for (const a of [].concat(...document.body.children))
        V.on(a, "mouseover", ur);
    const o = () => {
      V.trigger(this._element, this.constructor.eventName(em)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || V.trigger(this._element, this.constructor.eventName(Jg)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Hi), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        V.off(i, "mouseover", ur);
    this._activeTrigger[Lo] = !1, this._activeTrigger[ko] = !1, this._activeTrigger[Jn] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), V.trigger(this._element, this.constructor.eventName(Qg)));
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
    s.classList.remove(So, Hi), s.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = Xd(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(So), s;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new zg({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [Xg]: this._getTitle()
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
    return this.tip && this.tip.classList.contains(Hi);
  }
  _createPopper(t) {
    const s = pe(this._config.placement, [this, t, this._element]), n = lm[s.toUpperCase()];
    return $a(this._element, t, this._getPopperConfig(n));
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
        V.on(this._element, this.constructor.eventName(nm), this._config.selector, (n) => {
          const i = this._initializeOnDelegatedTarget(n);
          i._activeTrigger[Lo] = !(i._isShown() && i._activeTrigger[Lo]), i.toggle();
        });
      else if (s !== Zg) {
        const n = s === Jn ? this.constructor.eventName(om) : this.constructor.eventName(im), i = s === Jn ? this.constructor.eventName(am) : this.constructor.eventName(rm);
        V.on(this._element, n, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? ko : Jn] = !0, o._enter();
        }), V.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? ko : Jn] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, V.on(this._element.closest(Vl), jl, this._hideModalHandler);
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
      Gg.has(n) && delete s[n];
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
      const s = Qu.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
};
Ne(xr);
const hm = "popover", dm = ".popover-header", fm = ".popover-body", pm = {
  ...xr.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, gm = {
  ...xr.DefaultType,
  content: "(null|string|element|function)"
};
class Ba extends xr {
  // Getters
  static get Default() {
    return pm;
  }
  static get DefaultType() {
    return gm;
  }
  static get NAME() {
    return hm;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [dm]: this._getTitle(),
      [fm]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Ba.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
Ne(Ba);
const mm = "scrollspy", bm = "bs.scrollspy", qa = `.${bm}`, ym = ".data-api", vm = `activate${qa}`, Ul = `click${qa}`, _m = `load${qa}${ym}`, Em = "dropdown-item", fn = "active", wm = '[data-bs-spy="scroll"]', Io = "[href]", Am = ".nav, .list-group", Hl = ".nav-link", Tm = ".nav-item", Fm = ".list-group-item", xm = `${Hl}, ${Tm} > ${Hl}, ${Fm}`, Cm = ".dropdown", Om = ".dropdown-toggle", Nm = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, Sm = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Cr extends je {
  constructor(t, s) {
    super(t, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return Nm;
  }
  static get DefaultType() {
    return Sm;
  }
  static get NAME() {
    return mm;
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
    this._config.smoothScroll && (V.off(this._config.target, Ul), V.on(this._config.target, Ul, Io, (t) => {
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
    const t = ut.find(Io, this._config.target);
    for (const s of t) {
      if (!s.hash || Ns(s))
        continue;
      const n = ut.findOne(decodeURI(s.hash), this._element);
      Mn(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(fn), this._activateParents(t), V.trigger(this._element, vm, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Em)) {
      ut.findOne(Om, t.closest(Cm)).classList.add(fn);
      return;
    }
    for (const s of ut.parents(t, Am))
      for (const n of ut.prev(s, xm))
        n.classList.add(fn);
  }
  _clearActiveClass(t) {
    t.classList.remove(fn);
    const s = ut.find(`${Io}.${fn}`, t);
    for (const n of s)
      n.classList.remove(fn);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Cr.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
V.on(window, _m, () => {
  for (const e of ut.find(wm))
    Cr.getOrCreateInstance(e);
});
Ne(Cr);
const km = "tab", Lm = "bs.tab", Js = `.${Lm}`, Im = `hide${Js}`, $m = `hidden${Js}`, Dm = `show${Js}`, Rm = `shown${Js}`, Mm = `click${Js}`, Bm = `keydown${Js}`, qm = `load${Js}`, Pm = "ArrowLeft", Wl = "ArrowRight", Vm = "ArrowUp", zl = "ArrowDown", $o = "Home", Kl = "End", js = "active", Gl = "fade", Do = "show", jm = "dropdown", th = ".dropdown-toggle", Um = ".dropdown-menu", Ro = `:not(${th})`, Hm = '.list-group, .nav, [role="tablist"]', Wm = ".nav-item, .list-group-item", zm = `.nav-link${Ro}, .list-group-item${Ro}, [role="tab"]${Ro}`, eh = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Mo = `${zm}, ${eh}`, Km = `.${js}[data-bs-toggle="tab"], .${js}[data-bs-toggle="pill"], .${js}[data-bs-toggle="list"]`;
class In extends je {
  constructor(t) {
    super(t), this._parent = this._element.closest(Hm), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), V.on(this._element, Bm, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return km;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const s = this._getActiveElem(), n = s ? V.trigger(s, Im, {
      relatedTarget: t
    }) : null;
    V.trigger(t, Dm, {
      relatedTarget: s
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(s, t), this._activate(t, s));
  }
  // Private
  _activate(t, s) {
    if (!t)
      return;
    t.classList.add(js), this._activate(ut.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Do);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), V.trigger(t, Rm, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(Gl));
  }
  _deactivate(t, s) {
    if (!t)
      return;
    t.classList.remove(js), t.blur(), this._deactivate(ut.getElementFromSelector(t));
    const n = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Do);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), V.trigger(t, $m, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, t, t.classList.contains(Gl));
  }
  _keydown(t) {
    if (![Pm, Wl, Vm, zl, $o, Kl].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const s = this._getChildren().filter((i) => !Ns(i));
    let n;
    if ([$o, Kl].includes(t.key))
      n = s[t.key === $o ? 0 : s.length - 1];
    else {
      const i = [Wl, zl].includes(t.key);
      n = Da(s, t.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), In.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return ut.find(Mo, this._parent);
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
    if (!n.classList.contains(jm))
      return;
    const i = (r, o) => {
      const a = ut.findOne(r, n);
      a && a.classList.toggle(o, s);
    };
    i(th, js), i(Um, Do), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(t, s, n) {
    t.hasAttribute(s) || t.setAttribute(s, n);
  }
  _elemIsActive(t) {
    return t.classList.contains(js);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(Mo) ? t : ut.findOne(Mo, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(Wm) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = In.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (s[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
V.on(document, Mm, eh, function(e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(), !Ns(this) && In.getOrCreateInstance(this).show();
});
V.on(window, qm, () => {
  for (const e of ut.find(Km))
    In.getOrCreateInstance(e);
});
Ne(In);
const Gm = "toast", Ym = "bs.toast", $s = `.${Ym}`, Xm = `mouseover${$s}`, Zm = `mouseout${$s}`, Jm = `focusin${$s}`, Qm = `focusout${$s}`, t1 = `hide${$s}`, e1 = `hidden${$s}`, s1 = `show${$s}`, n1 = `shown${$s}`, i1 = "fade", Yl = "hide", Wi = "show", zi = "showing", r1 = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, o1 = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Or extends je {
  constructor(t, s) {
    super(t, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return o1;
  }
  static get DefaultType() {
    return r1;
  }
  static get NAME() {
    return Gm;
  }
  // Public
  show() {
    if (V.trigger(this._element, s1).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(i1);
    const s = () => {
      this._element.classList.remove(zi), V.trigger(this._element, n1), this._maybeScheduleHide();
    };
    this._element.classList.remove(Yl), yi(this._element), this._element.classList.add(Wi, zi), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || V.trigger(this._element, t1).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(Yl), this._element.classList.remove(zi, Wi), V.trigger(this._element, e1);
    };
    this._element.classList.add(zi), this._queueCallback(s, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(Wi), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Wi);
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
    V.on(this._element, Xm, (t) => this._onInteraction(t, !0)), V.on(this._element, Zm, (t) => this._onInteraction(t, !1)), V.on(this._element, Jm, (t) => this._onInteraction(t, !0)), V.on(this._element, Qm, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const s = Or.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t](this);
      }
    });
  }
}
Ar(Or);
Ne(Or);
function Pa(e) {
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
function Qs(e, t, s, n) {
  try {
    return typeof e == "function" ? e(t, s, n) : e;
  } catch (i) {
    return console.error(i), null;
  }
}
async function An(e) {
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
function Tn(e, t) {
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
function Qn(e, t = "-") {
  return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function a1(e) {
  let t = [];
  for (let s of e)
    t.push(fr(s));
  return t;
}
function fr(e, t = "", s = {}) {
  for (let n in e) {
    let i = t ? t + "." + n : n;
    typeof e[n] == "object" && !Array.isArray(e[n]) ? fr(e[n], i, s) : s[i] = e[n];
  }
  return s;
}
function l1(e) {
  let t = {};
  for (let s in e) {
    let n = s.split(".");
    n.reduce((i, r, o) => i[r] || (i[r] = isNaN(Number(n[o + 1])) ? n.length - 1 === o ? e[s] : {} : []), t);
  }
  return t;
}
function qn(e, t, s, n) {
  const i = (r, o) => !r || !o ? r : r.replace(/{\s*(.*?)\s*}/g, (a, l) => o[l] ? o[l] : "");
  return !t || (n = n || document.documentElement.lang, !n || !t[n]) || !t[n][e] ? i(e, s) : i(t[n][e]);
}
function c1(e, t, s = ";") {
  const n = t.map((r) => r.title ? r.title : r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(s), i = e.map(
    (r) => t.map((o) => {
      let a = r[o.name];
      return o.template ? o.template(a, r, e) : a !== void 0 ? a : "";
    }).join(s)
  );
  return [n, ...i].join(`
`);
}
function u1(e, t = "export.csv") {
  e = "\uFEFF" + e;
  const s = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(s), i = document.createElement("a");
  i.href = n, i.download = t, i.click(), URL.revokeObjectURL(n);
}
function h1(e) {
  return [...new Set(e)];
}
function Va(e, t) {
  e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function ja(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 && e.push(s.value);
}
function Ua(e, t) {
  for (let s of t)
    e.indexOf(s.value) < 0 ? e.push(s.value) : e.splice(e.indexOf(s.value), 1);
}
function Ha(e) {
  e.length = 0;
}
function Wa(e, t) {
  t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function za(e, t) {
  t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function d1(e, t) {
  Object.keys(e).forEach((s) => {
    typeof e[s] == "function" && (e[s] = e[s](t));
  });
}
function f1(e, t) {
  return e < 1024 ? e + (t ? " Byte" : "") : e < 1048576 ? (e / 1024).toFixed(0) + (t ? '<span class="text-muted fw-light"> KB</span>' : "") : e < 1073741824 ? (e / 1048576).toFixed(2) + (t ? '<span class="text-muted fw-light"> MB</span>' : "") : (e / 1073741824).toFixed(2) + (t ? '<span class="text-muted fw-light"> GB</span>' : "");
}
function p1(e) {
  return e.split(".").reverse()[0];
}
var sh = typeof global == "object" && global && global.Object === Object && global, g1 = typeof self == "object" && self && self.Object === Object && self, ts = sh || g1 || Function("return this")(), ks = ts.Symbol, nh = Object.prototype, m1 = nh.hasOwnProperty, b1 = nh.toString, ti = ks ? ks.toStringTag : void 0;
function y1(e) {
  var t = m1.call(e, ti), s = e[ti];
  try {
    e[ti] = void 0;
    var n = !0;
  } catch {
  }
  var i = b1.call(e);
  return n && (t ? e[ti] = s : delete e[ti]), i;
}
var v1 = Object.prototype, _1 = v1.toString;
function E1(e) {
  return _1.call(e);
}
var w1 = "[object Null]", A1 = "[object Undefined]", Xl = ks ? ks.toStringTag : void 0;
function Pn(e) {
  return e == null ? e === void 0 ? A1 : w1 : Xl && Xl in Object(e) ? y1(e) : E1(e);
}
function ms(e) {
  return e != null && typeof e == "object";
}
var Ks = Array.isArray;
function Ds(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function ih(e) {
  return e;
}
var T1 = "[object AsyncFunction]", F1 = "[object Function]", x1 = "[object GeneratorFunction]", C1 = "[object Proxy]";
function Ka(e) {
  if (!Ds(e))
    return !1;
  var t = Pn(e);
  return t == F1 || t == x1 || t == T1 || t == C1;
}
var Bo = ts["__core-js_shared__"], Zl = (function() {
  var e = /[^.]+$/.exec(Bo && Bo.keys && Bo.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function O1(e) {
  return !!Zl && Zl in e;
}
var N1 = Function.prototype, S1 = N1.toString;
function tn(e) {
  if (e != null) {
    try {
      return S1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var k1 = /[\\^$.*+?()[\]{}|]/g, L1 = /^\[object .+?Constructor\]$/, I1 = Function.prototype, $1 = Object.prototype, D1 = I1.toString, R1 = $1.hasOwnProperty, M1 = RegExp(
  "^" + D1.call(R1).replace(k1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function B1(e) {
  if (!Ds(e) || O1(e))
    return !1;
  var t = Ka(e) ? M1 : L1;
  return t.test(tn(e));
}
function q1(e, t) {
  return e?.[t];
}
function en(e, t) {
  var s = q1(e, t);
  return B1(s) ? s : void 0;
}
var oa = en(ts, "WeakMap"), Jl = Object.create, P1 = /* @__PURE__ */ (function() {
  function e() {
  }
  return function(t) {
    if (!Ds(t))
      return {};
    if (Jl)
      return Jl(t);
    e.prototype = t;
    var s = new e();
    return e.prototype = void 0, s;
  };
})();
function V1(e, t, s) {
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
function j1(e, t) {
  var s = -1, n = e.length;
  for (t || (t = Array(n)); ++s < n; )
    t[s] = e[s];
  return t;
}
var U1 = 800, H1 = 16, W1 = Date.now;
function z1(e) {
  var t = 0, s = 0;
  return function() {
    var n = W1(), i = H1 - (n - s);
    if (s = n, i > 0) {
      if (++t >= U1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function K1(e) {
  return function() {
    return e;
  };
}
var pr = (function() {
  try {
    var e = en(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
})(), G1 = pr ? function(e, t) {
  return pr(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: K1(t),
    writable: !0
  });
} : ih, Y1 = z1(G1);
function X1(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n && t(e[s], s, e) !== !1; )
    ;
  return e;
}
var Z1 = 9007199254740991, J1 = /^(?:0|[1-9]\d*)$/;
function rh(e, t) {
  var s = typeof e;
  return t = t ?? Z1, !!t && (s == "number" || s != "symbol" && J1.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Ga(e, t, s) {
  t == "__proto__" && pr ? pr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: s,
    writable: !0
  }) : e[t] = s;
}
function wi(e, t) {
  return e === t || e !== e && t !== t;
}
var Q1 = Object.prototype, t0 = Q1.hasOwnProperty;
function oh(e, t, s) {
  var n = e[t];
  (!(t0.call(e, t) && wi(n, s)) || s === void 0 && !(t in e)) && Ga(e, t, s);
}
function e0(e, t, s, n) {
  var i = !s;
  s || (s = {});
  for (var r = -1, o = t.length; ++r < o; ) {
    var a = t[r], l = void 0;
    l === void 0 && (l = e[a]), i ? Ga(s, a, l) : oh(s, a, l);
  }
  return s;
}
var Ql = Math.max;
function s0(e, t, s) {
  return t = Ql(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, i = -1, r = Ql(n.length - t, 0), o = Array(r); ++i < r; )
      o[i] = n[t + i];
    i = -1;
    for (var a = Array(t + 1); ++i < t; )
      a[i] = n[i];
    return a[t] = s(o), V1(e, this, a);
  };
}
function n0(e, t) {
  return Y1(s0(e, t, ih), e + "");
}
var i0 = 9007199254740991;
function ah(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= i0;
}
function Sr(e) {
  return e != null && ah(e.length) && !Ka(e);
}
function r0(e, t, s) {
  if (!Ds(s))
    return !1;
  var n = typeof t;
  return (n == "number" ? Sr(s) && rh(t, s.length) : n == "string" && t in s) ? wi(s[t], e) : !1;
}
function o0(e) {
  return n0(function(t, s) {
    var n = -1, i = s.length, r = i > 1 ? s[i - 1] : void 0, o = i > 2 ? s[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (i--, r) : void 0, o && r0(s[0], s[1], o) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++n < i; ) {
      var a = s[n];
      a && e(t, a, n, r);
    }
    return t;
  });
}
var a0 = Object.prototype;
function Ya(e) {
  var t = e && e.constructor, s = typeof t == "function" && t.prototype || a0;
  return e === s;
}
function l0(e, t) {
  for (var s = -1, n = Array(e); ++s < e; )
    n[s] = t(s);
  return n;
}
var c0 = "[object Arguments]";
function tc(e) {
  return ms(e) && Pn(e) == c0;
}
var lh = Object.prototype, u0 = lh.hasOwnProperty, h0 = lh.propertyIsEnumerable, aa = tc(/* @__PURE__ */ (function() {
  return arguments;
})()) ? tc : function(e) {
  return ms(e) && u0.call(e, "callee") && !h0.call(e, "callee");
};
function d0() {
  return !1;
}
var ch = typeof exports == "object" && exports && !exports.nodeType && exports, ec = ch && typeof module == "object" && module && !module.nodeType && module, f0 = ec && ec.exports === ch, sc = f0 ? ts.Buffer : void 0, p0 = sc ? sc.isBuffer : void 0, hi = p0 || d0, g0 = "[object Arguments]", m0 = "[object Array]", b0 = "[object Boolean]", y0 = "[object Date]", v0 = "[object Error]", _0 = "[object Function]", E0 = "[object Map]", w0 = "[object Number]", A0 = "[object Object]", T0 = "[object RegExp]", F0 = "[object Set]", x0 = "[object String]", C0 = "[object WeakMap]", O0 = "[object ArrayBuffer]", N0 = "[object DataView]", S0 = "[object Float32Array]", k0 = "[object Float64Array]", L0 = "[object Int8Array]", I0 = "[object Int16Array]", $0 = "[object Int32Array]", D0 = "[object Uint8Array]", R0 = "[object Uint8ClampedArray]", M0 = "[object Uint16Array]", B0 = "[object Uint32Array]", St = {};
St[S0] = St[k0] = St[L0] = St[I0] = St[$0] = St[D0] = St[R0] = St[M0] = St[B0] = !0;
St[g0] = St[m0] = St[O0] = St[b0] = St[N0] = St[y0] = St[v0] = St[_0] = St[E0] = St[w0] = St[A0] = St[T0] = St[F0] = St[x0] = St[C0] = !1;
function q0(e) {
  return ms(e) && ah(e.length) && !!St[Pn(e)];
}
function Xa(e) {
  return function(t) {
    return e(t);
  };
}
var uh = typeof exports == "object" && exports && !exports.nodeType && exports, li = uh && typeof module == "object" && module && !module.nodeType && module, P0 = li && li.exports === uh, qo = P0 && sh.process, $n = (function() {
  try {
    var e = li && li.require && li.require("util").types;
    return e || qo && qo.binding && qo.binding("util");
  } catch {
  }
})(), nc = $n && $n.isTypedArray, Za = nc ? Xa(nc) : q0, V0 = Object.prototype, j0 = V0.hasOwnProperty;
function hh(e, t) {
  var s = Ks(e), n = !s && aa(e), i = !s && !n && hi(e), r = !s && !n && !i && Za(e), o = s || n || i || r, a = o ? l0(e.length, String) : [], l = a.length;
  for (var c in e)
    (t || j0.call(e, c)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    r && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    rh(c, l))) && a.push(c);
  return a;
}
function dh(e, t) {
  return function(s) {
    return e(t(s));
  };
}
var U0 = dh(Object.keys, Object), H0 = Object.prototype, W0 = H0.hasOwnProperty;
function z0(e) {
  if (!Ya(e))
    return U0(e);
  var t = [];
  for (var s in Object(e))
    W0.call(e, s) && s != "constructor" && t.push(s);
  return t;
}
function K0(e) {
  return Sr(e) ? hh(e) : z0(e);
}
function G0(e) {
  var t = [];
  if (e != null)
    for (var s in Object(e))
      t.push(s);
  return t;
}
var Y0 = Object.prototype, X0 = Y0.hasOwnProperty;
function Z0(e) {
  if (!Ds(e))
    return G0(e);
  var t = Ya(e), s = [];
  for (var n in e)
    n == "constructor" && (t || !X0.call(e, n)) || s.push(n);
  return s;
}
function fh(e) {
  return Sr(e) ? hh(e, !0) : Z0(e);
}
var di = en(Object, "create");
function J0() {
  this.__data__ = di ? di(null) : {}, this.size = 0;
}
function Q0(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var tb = "__lodash_hash_undefined__", eb = Object.prototype, sb = eb.hasOwnProperty;
function nb(e) {
  var t = this.__data__;
  if (di) {
    var s = t[e];
    return s === tb ? void 0 : s;
  }
  return sb.call(t, e) ? t[e] : void 0;
}
var ib = Object.prototype, rb = ib.hasOwnProperty;
function ob(e) {
  var t = this.__data__;
  return di ? t[e] !== void 0 : rb.call(t, e);
}
var ab = "__lodash_hash_undefined__";
function lb(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = di && t === void 0 ? ab : t, this;
}
function Gs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Gs.prototype.clear = J0;
Gs.prototype.delete = Q0;
Gs.prototype.get = nb;
Gs.prototype.has = ob;
Gs.prototype.set = lb;
function cb() {
  this.__data__ = [], this.size = 0;
}
function kr(e, t) {
  for (var s = e.length; s--; )
    if (wi(e[s][0], t))
      return s;
  return -1;
}
var ub = Array.prototype, hb = ub.splice;
function db(e) {
  var t = this.__data__, s = kr(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : hb.call(t, s, 1), --this.size, !0;
}
function fb(e) {
  var t = this.__data__, s = kr(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function pb(e) {
  return kr(this.__data__, e) > -1;
}
function gb(e, t) {
  var s = this.__data__, n = kr(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function vs(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
vs.prototype.clear = cb;
vs.prototype.delete = db;
vs.prototype.get = fb;
vs.prototype.has = pb;
vs.prototype.set = gb;
var fi = en(ts, "Map");
function mb() {
  this.size = 0, this.__data__ = {
    hash: new Gs(),
    map: new (fi || vs)(),
    string: new Gs()
  };
}
function bb(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Lr(e, t) {
  var s = e.__data__;
  return bb(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function yb(e) {
  var t = Lr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function vb(e) {
  return Lr(this, e).get(e);
}
function _b(e) {
  return Lr(this, e).has(e);
}
function Eb(e, t) {
  var s = Lr(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
function sn(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
sn.prototype.clear = mb;
sn.prototype.delete = yb;
sn.prototype.get = vb;
sn.prototype.has = _b;
sn.prototype.set = Eb;
function wb(e, t) {
  for (var s = -1, n = t.length, i = e.length; ++s < n; )
    e[i + s] = t[s];
  return e;
}
var ph = dh(Object.getPrototypeOf, Object), Ab = "[object Object]", Tb = Function.prototype, Fb = Object.prototype, gh = Tb.toString, xb = Fb.hasOwnProperty, Cb = gh.call(Object);
function Ob(e) {
  if (!ms(e) || Pn(e) != Ab)
    return !1;
  var t = ph(e);
  if (t === null)
    return !0;
  var s = xb.call(t, "constructor") && t.constructor;
  return typeof s == "function" && s instanceof s && gh.call(s) == Cb;
}
function Nb() {
  this.__data__ = new vs(), this.size = 0;
}
function Sb(e) {
  var t = this.__data__, s = t.delete(e);
  return this.size = t.size, s;
}
function kb(e) {
  return this.__data__.get(e);
}
function Lb(e) {
  return this.__data__.has(e);
}
var Ib = 200;
function $b(e, t) {
  var s = this.__data__;
  if (s instanceof vs) {
    var n = s.__data__;
    if (!fi || n.length < Ib - 1)
      return n.push([e, t]), this.size = ++s.size, this;
    s = this.__data__ = new sn(n);
  }
  return s.set(e, t), this.size = s.size, this;
}
function Ze(e) {
  var t = this.__data__ = new vs(e);
  this.size = t.size;
}
Ze.prototype.clear = Nb;
Ze.prototype.delete = Sb;
Ze.prototype.get = kb;
Ze.prototype.has = Lb;
Ze.prototype.set = $b;
var mh = typeof exports == "object" && exports && !exports.nodeType && exports, ic = mh && typeof module == "object" && module && !module.nodeType && module, Db = ic && ic.exports === mh, rc = Db ? ts.Buffer : void 0, oc = rc ? rc.allocUnsafe : void 0;
function bh(e, t) {
  if (t)
    return e.slice();
  var s = e.length, n = oc ? oc(s) : new e.constructor(s);
  return e.copy(n), n;
}
function Rb(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++s < n; ) {
    var o = e[s];
    t(o, s, e) && (r[i++] = o);
  }
  return r;
}
function Mb() {
  return [];
}
var Bb = Object.prototype, qb = Bb.propertyIsEnumerable, ac = Object.getOwnPropertySymbols, Pb = ac ? function(e) {
  return e == null ? [] : (e = Object(e), Rb(ac(e), function(t) {
    return qb.call(e, t);
  }));
} : Mb;
function Vb(e, t, s) {
  var n = t(e);
  return Ks(e) ? n : wb(n, s(e));
}
function la(e) {
  return Vb(e, K0, Pb);
}
var ca = en(ts, "DataView"), ua = en(ts, "Promise"), ha = en(ts, "Set"), lc = "[object Map]", jb = "[object Object]", cc = "[object Promise]", uc = "[object Set]", hc = "[object WeakMap]", dc = "[object DataView]", Ub = tn(ca), Hb = tn(fi), Wb = tn(ua), zb = tn(ha), Kb = tn(oa), $e = Pn;
(ca && $e(new ca(new ArrayBuffer(1))) != dc || fi && $e(new fi()) != lc || ua && $e(ua.resolve()) != cc || ha && $e(new ha()) != uc || oa && $e(new oa()) != hc) && ($e = function(e) {
  var t = Pn(e), s = t == jb ? e.constructor : void 0, n = s ? tn(s) : "";
  if (n)
    switch (n) {
      case Ub:
        return dc;
      case Hb:
        return lc;
      case Wb:
        return cc;
      case zb:
        return uc;
      case Kb:
        return hc;
    }
  return t;
});
var Gb = Object.prototype, Yb = Gb.hasOwnProperty;
function Xb(e) {
  var t = e.length, s = new e.constructor(t);
  return t && typeof e[0] == "string" && Yb.call(e, "index") && (s.index = e.index, s.input = e.input), s;
}
var gr = ts.Uint8Array;
function Ja(e) {
  var t = new e.constructor(e.byteLength);
  return new gr(t).set(new gr(e)), t;
}
function Zb(e, t) {
  var s = Ja(e.buffer);
  return new e.constructor(s, e.byteOffset, e.byteLength);
}
var Jb = /\w*$/;
function Qb(e) {
  var t = new e.constructor(e.source, Jb.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var fc = ks ? ks.prototype : void 0, pc = fc ? fc.valueOf : void 0;
function ty(e) {
  return pc ? Object(pc.call(e)) : {};
}
function yh(e, t) {
  var s = t ? Ja(e.buffer) : e.buffer;
  return new e.constructor(s, e.byteOffset, e.length);
}
var ey = "[object Boolean]", sy = "[object Date]", ny = "[object Map]", iy = "[object Number]", ry = "[object RegExp]", oy = "[object Set]", ay = "[object String]", ly = "[object Symbol]", cy = "[object ArrayBuffer]", uy = "[object DataView]", hy = "[object Float32Array]", dy = "[object Float64Array]", fy = "[object Int8Array]", py = "[object Int16Array]", gy = "[object Int32Array]", my = "[object Uint8Array]", by = "[object Uint8ClampedArray]", yy = "[object Uint16Array]", vy = "[object Uint32Array]";
function _y(e, t, s) {
  var n = e.constructor;
  switch (t) {
    case cy:
      return Ja(e);
    case ey:
    case sy:
      return new n(+e);
    case uy:
      return Zb(e);
    case hy:
    case dy:
    case fy:
    case py:
    case gy:
    case my:
    case by:
    case yy:
    case vy:
      return yh(e, s);
    case ny:
      return new n();
    case iy:
    case ay:
      return new n(e);
    case ry:
      return Qb(e);
    case oy:
      return new n();
    case ly:
      return ty(e);
  }
}
function vh(e) {
  return typeof e.constructor == "function" && !Ya(e) ? P1(ph(e)) : {};
}
var Ey = "[object Map]";
function wy(e) {
  return ms(e) && $e(e) == Ey;
}
var gc = $n && $n.isMap, Ay = gc ? Xa(gc) : wy, Ty = "[object Set]";
function Fy(e) {
  return ms(e) && $e(e) == Ty;
}
var mc = $n && $n.isSet, xy = mc ? Xa(mc) : Fy, Cy = 1, _h = "[object Arguments]", Oy = "[object Array]", Ny = "[object Boolean]", Sy = "[object Date]", ky = "[object Error]", Eh = "[object Function]", Ly = "[object GeneratorFunction]", Iy = "[object Map]", $y = "[object Number]", wh = "[object Object]", Dy = "[object RegExp]", Ry = "[object Set]", My = "[object String]", By = "[object Symbol]", qy = "[object WeakMap]", Py = "[object ArrayBuffer]", Vy = "[object DataView]", jy = "[object Float32Array]", Uy = "[object Float64Array]", Hy = "[object Int8Array]", Wy = "[object Int16Array]", zy = "[object Int32Array]", Ky = "[object Uint8Array]", Gy = "[object Uint8ClampedArray]", Yy = "[object Uint16Array]", Xy = "[object Uint32Array]", Ot = {};
Ot[_h] = Ot[Oy] = Ot[Py] = Ot[Vy] = Ot[Ny] = Ot[Sy] = Ot[jy] = Ot[Uy] = Ot[Hy] = Ot[Wy] = Ot[zy] = Ot[Iy] = Ot[$y] = Ot[wh] = Ot[Dy] = Ot[Ry] = Ot[My] = Ot[By] = Ot[Ky] = Ot[Gy] = Ot[Yy] = Ot[Xy] = !0;
Ot[ky] = Ot[Eh] = Ot[qy] = !1;
function or(e, t, s, n, i, r) {
  var o, a = t & Cy;
  if (o !== void 0)
    return o;
  if (!Ds(e))
    return e;
  var l = Ks(e);
  if (l)
    o = Xb(e);
  else {
    var c = $e(e), d = c == Eh || c == Ly;
    if (hi(e))
      return bh(e, a);
    if (c == wh || c == _h || d && !i)
      o = d ? {} : vh(e);
    else {
      if (!Ot[c])
        return i ? e : {};
      o = _y(e, c, a);
    }
  }
  r || (r = new Ze());
  var h = r.get(e);
  if (h)
    return h;
  r.set(e, o), xy(e) ? e.forEach(function(E) {
    o.add(or(E, t, s, E, e, r));
  }) : Ay(e) && e.forEach(function(E, F) {
    o.set(F, or(E, t, s, F, e, r));
  });
  var g = la, v = l ? void 0 : g(e);
  return X1(v || e, function(E, F) {
    v && (F = E, E = e[F]), oh(o, F, or(E, t, s, F, e, r));
  }), o;
}
var Zy = 1, Jy = 4;
function Fn(e) {
  return or(e, Zy | Jy);
}
var Qy = "__lodash_hash_undefined__";
function tv(e) {
  return this.__data__.set(e, Qy), this;
}
function ev(e) {
  return this.__data__.has(e);
}
function mr(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.__data__ = new sn(); ++t < s; )
    this.add(e[t]);
}
mr.prototype.add = mr.prototype.push = tv;
mr.prototype.has = ev;
function sv(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length; ++s < n; )
    if (t(e[s], s, e))
      return !0;
  return !1;
}
function nv(e, t) {
  return e.has(t);
}
var iv = 1, rv = 2;
function Ah(e, t, s, n, i, r) {
  var o = s & iv, a = e.length, l = t.length;
  if (a != l && !(o && l > a))
    return !1;
  var c = r.get(e), d = r.get(t);
  if (c && d)
    return c == t && d == e;
  var h = -1, g = !0, v = s & rv ? new mr() : void 0;
  for (r.set(e, t), r.set(t, e); ++h < a; ) {
    var E = e[h], F = t[h];
    if (n)
      var N = o ? n(F, E, h, t, e, r) : n(E, F, h, e, t, r);
    if (N !== void 0) {
      if (N)
        continue;
      g = !1;
      break;
    }
    if (v) {
      if (!sv(t, function(I, j) {
        if (!nv(v, j) && (E === I || i(E, I, s, n, r)))
          return v.push(j);
      })) {
        g = !1;
        break;
      }
    } else if (!(E === F || i(E, F, s, n, r))) {
      g = !1;
      break;
    }
  }
  return r.delete(e), r.delete(t), g;
}
function ov(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n, i) {
    s[++t] = [i, n];
  }), s;
}
function av(e) {
  var t = -1, s = Array(e.size);
  return e.forEach(function(n) {
    s[++t] = n;
  }), s;
}
var lv = 1, cv = 2, uv = "[object Boolean]", hv = "[object Date]", dv = "[object Error]", fv = "[object Map]", pv = "[object Number]", gv = "[object RegExp]", mv = "[object Set]", bv = "[object String]", yv = "[object Symbol]", vv = "[object ArrayBuffer]", _v = "[object DataView]", bc = ks ? ks.prototype : void 0, Po = bc ? bc.valueOf : void 0;
function Ev(e, t, s, n, i, r, o) {
  switch (s) {
    case _v:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case vv:
      return !(e.byteLength != t.byteLength || !r(new gr(e), new gr(t)));
    case uv:
    case hv:
    case pv:
      return wi(+e, +t);
    case dv:
      return e.name == t.name && e.message == t.message;
    case gv:
    case bv:
      return e == t + "";
    case fv:
      var a = ov;
    case mv:
      var l = n & lv;
      if (a || (a = av), e.size != t.size && !l)
        return !1;
      var c = o.get(e);
      if (c)
        return c == t;
      n |= cv, o.set(e, t);
      var d = Ah(a(e), a(t), n, i, r, o);
      return o.delete(e), d;
    case yv:
      if (Po)
        return Po.call(e) == Po.call(t);
  }
  return !1;
}
var wv = 1, Av = Object.prototype, Tv = Av.hasOwnProperty;
function Fv(e, t, s, n, i, r) {
  var o = s & wv, a = la(e), l = a.length, c = la(t), d = c.length;
  if (l != d && !o)
    return !1;
  for (var h = l; h--; ) {
    var g = a[h];
    if (!(o ? g in t : Tv.call(t, g)))
      return !1;
  }
  var v = r.get(e), E = r.get(t);
  if (v && E)
    return v == t && E == e;
  var F = !0;
  r.set(e, t), r.set(t, e);
  for (var N = o; ++h < l; ) {
    g = a[h];
    var I = e[g], j = t[g];
    if (n)
      var W = o ? n(j, I, g, t, e, r) : n(I, j, g, e, t, r);
    if (!(W === void 0 ? I === j || i(I, j, s, n, r) : W)) {
      F = !1;
      break;
    }
    N || (N = g == "constructor");
  }
  if (F && !N) {
    var Y = e.constructor, G = t.constructor;
    Y != G && "constructor" in e && "constructor" in t && !(typeof Y == "function" && Y instanceof Y && typeof G == "function" && G instanceof G) && (F = !1);
  }
  return r.delete(e), r.delete(t), F;
}
var xv = 1, yc = "[object Arguments]", vc = "[object Array]", Ki = "[object Object]", Cv = Object.prototype, _c = Cv.hasOwnProperty;
function Ov(e, t, s, n, i, r) {
  var o = Ks(e), a = Ks(t), l = o ? vc : $e(e), c = a ? vc : $e(t);
  l = l == yc ? Ki : l, c = c == yc ? Ki : c;
  var d = l == Ki, h = c == Ki, g = l == c;
  if (g && hi(e)) {
    if (!hi(t))
      return !1;
    o = !0, d = !1;
  }
  if (g && !d)
    return r || (r = new Ze()), o || Za(e) ? Ah(e, t, s, n, i, r) : Ev(e, t, l, s, n, i, r);
  if (!(s & xv)) {
    var v = d && _c.call(e, "__wrapped__"), E = h && _c.call(t, "__wrapped__");
    if (v || E) {
      var F = v ? e.value() : e, N = E ? t.value() : t;
      return r || (r = new Ze()), i(F, N, s, n, r);
    }
  }
  return g ? (r || (r = new Ze()), Fv(e, t, s, n, i, r)) : !1;
}
function Th(e, t, s, n, i) {
  return e === t ? !0 : e == null || t == null || !ms(e) && !ms(t) ? e !== e && t !== t : Ov(e, t, s, n, Th, i);
}
function Nv(e) {
  return function(t, s, n) {
    for (var i = -1, r = Object(t), o = n(t), a = o.length; a--; ) {
      var l = o[++i];
      if (s(r[l], l, r) === !1)
        break;
    }
    return t;
  };
}
var Sv = Nv();
function da(e, t, s) {
  (s !== void 0 && !wi(e[t], s) || s === void 0 && !(t in e)) && Ga(e, t, s);
}
function kv(e) {
  return ms(e) && Sr(e);
}
function fa(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Lv(e) {
  return e0(e, fh(e));
}
function Iv(e, t, s, n, i, r, o) {
  var a = fa(e, s), l = fa(t, s), c = o.get(l);
  if (c) {
    da(e, s, c);
    return;
  }
  var d = r ? r(a, l, s + "", e, t, o) : void 0, h = d === void 0;
  if (h) {
    var g = Ks(l), v = !g && hi(l), E = !g && !v && Za(l);
    d = l, g || v || E ? Ks(a) ? d = a : kv(a) ? d = j1(a) : v ? (h = !1, d = bh(l, !0)) : E ? (h = !1, d = yh(l, !0)) : d = [] : Ob(l) || aa(l) ? (d = a, aa(a) ? d = Lv(a) : (!Ds(a) || Ka(a)) && (d = vh(l))) : h = !1;
  }
  h && (o.set(l, d), i(d, l, n, r, o), o.delete(l)), da(e, s, d);
}
function Fh(e, t, s, n, i) {
  e !== t && Sv(t, function(r, o) {
    if (i || (i = new Ze()), Ds(r))
      Iv(e, t, o, s, Fh, n, i);
    else {
      var a = n ? n(fa(e, o), r, o + "", e, t, i) : void 0;
      a === void 0 && (a = r), da(e, o, a);
    }
  }, fh);
}
function Qa(e, t) {
  return Th(e, t);
}
var xs = o0(function(e, t, s) {
  Fh(e, t, s);
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
class xn extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const xh = class pa {
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
      throw new xn(`Unable to create ${s} blot`);
    const r = i, o = (
      // @ts-expect-error Fix me later
      s instanceof Node || s.nodeType === Node.TEXT_NODE ? s : r.create(n)
    ), a = new r(t, o, n);
    return pa.blots.set(a.domNode, a), a;
  }
  find(t, s = !1) {
    return pa.find(t, s);
  }
  query(t, s = ot.ANY) {
    let n;
    return typeof t == "string" ? n = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof t == "number" ? t & ot.LEVEL & ot.BLOCK ? n = this.types.block : t & ot.LEVEL & ot.INLINE && (n = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (n = this.classes[i], !!n)), n = n || this.tags[t.tagName]), n == null ? null : "scope" in n && s & ot.LEVEL & n.scope && s & ot.TYPE & n.scope ? n : null;
  }
  register(...t) {
    return t.map((s) => {
      const n = "blotName" in s, i = "attrName" in s;
      if (!n && !i)
        throw new xn("Invalid definition");
      if (n && s.blotName === "abstract")
        throw new xn("Cannot register abstract class");
      const r = n ? s.blotName : i ? s.attrName : void 0;
      return this.types[r] = s, i ? typeof s.keyName == "string" && (this.attributes[s.keyName] = s) : n && (s.className && (this.classes[s.className] = s), s.tagName && (Array.isArray(s.tagName) ? s.tagName = s.tagName.map((o) => o.toUpperCase()) : s.tagName = s.tagName.toUpperCase(), (Array.isArray(s.tagName) ? s.tagName : [s.tagName]).forEach((o) => {
        (this.tags[o] == null || s.className == null) && (this.tags[o] = s);
      }))), s;
    });
  }
};
xh.blots = /* @__PURE__ */ new WeakMap();
let Dn = xh;
function Ec(e, t) {
  return (e.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class $v extends Qe {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((s) => s.split("-").slice(0, -1).join("-"));
  }
  add(t, s) {
    return this.canAdd(t, s) ? (this.remove(t), t.classList.add(`${this.keyName}-${s}`), !0) : !1;
  }
  remove(t) {
    Ec(t, this.keyName).forEach((s) => {
      t.classList.remove(s);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const s = (Ec(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, s) ? s : "";
  }
}
const Ue = $v;
function Vo(e) {
  const t = e.split("-"), s = t.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return t[0] + s;
}
class Dv extends Qe {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((s) => s.split(":")[0].trim());
  }
  add(t, s) {
    return this.canAdd(t, s) ? (t.style[Vo(this.keyName)] = s, !0) : !1;
  }
  remove(t) {
    t.style[Vo(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const s = t.style[Vo(this.keyName)];
    return this.canAdd(t, s) ? s : "";
  }
}
const Rs = Dv;
class Rv {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, s) {
    s ? t.add(this.domNode, s) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = Dn.find(this.domNode);
    if (t == null)
      return;
    const s = Qe.keys(this.domNode), n = Ue.keys(this.domNode), i = Rs.keys(this.domNode);
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
const Ir = Rv, Ch = class {
  constructor(t, s) {
    this.scroll = t, this.domNode = s, Dn.blots.set(s, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new xn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Dn.blots.delete(this.domNode);
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
      throw new xn(`Cannot wrap ${t}`);
    return n.appendChild(this), n;
  }
};
Ch.blotName = "abstract";
let Oh = Ch;
const Nh = class extends Oh {
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
Nh.scope = ot.INLINE_BLOT;
let Mv = Nh;
const re = Mv;
class Bv {
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
function wc(e, t) {
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
const Sh = class Ts extends Oh {
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
    this.children = new Bv(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const s = wc(t, this.scroll);
        this.insertBefore(s, this.children.head || void 0);
      } catch (s) {
        if (s instanceof xn)
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
      const a = wc(r, this.scroll);
      (a.next !== o || a.next == null) && (a.parent != null && a.parent.removeChild(this), this.insertBefore(a, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
Sh.uiClass = "";
let qv = Sh;
const Pe = qv;
function Pv(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const bn = class yn extends Pe {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(yn.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, s) {
    super(t, s), this.attributes = new Ir(this.domNode);
  }
  format(t, s) {
    if (t === this.statics.blotName && !s)
      this.children.forEach((n) => {
        n instanceof yn || (n = n.wrap(yn.blotName, !0)), this.attributes.copy(n);
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
    n instanceof yn && n.prev === this && Pv(s, n.formats()) && (n.moveChildren(this), n.remove());
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
    return n instanceof yn && this.attributes.move(n), n;
  }
};
bn.allowedChildren = [bn, re], bn.blotName = "inline", bn.scope = ot.INLINE_BLOT, bn.tagName = "SPAN";
let Vv = bn;
const tl = Vv, vn = class ga extends Pe {
  static create(t) {
    return super.create(t);
  }
  static formats(t, s) {
    const n = s.query(ga.blotName);
    if (!(n != null && t.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, s) {
    super(t, s), this.attributes = new Ir(this.domNode);
  }
  format(t, s) {
    const n = this.scroll.query(t, ot.BLOCK);
    n != null && (n instanceof Qe ? this.attributes.attribute(n, s) : t === this.statics.blotName && !s ? this.replaceWith(ga.blotName) : s && (t !== this.statics.blotName || this.formats()[t] !== s) && this.replaceWith(t, s));
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
vn.blotName = "block", vn.scope = ot.BLOCK_BLOT, vn.tagName = "P", vn.allowedChildren = [
  tl,
  vn,
  re
];
let jv = vn;
const pi = jv, ma = class extends Pe {
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
ma.blotName = "container", ma.scope = ot.BLOCK_BLOT;
let Uv = ma;
const $r = Uv;
class Hv extends re {
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
const ye = Hv, Wv = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, zv = 100, _n = class extends Pe {
  constructor(t, s) {
    super(null, s), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, Wv), this.attach();
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
      if (l >= zv)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (a.forEach((c) => {
        const d = this.find(c.target, !0);
        d != null && (d.domNode === c.target && (c.type === "childList" ? (r(this.find(c.previousSibling, !1)), Array.from(c.addedNodes).forEach((h) => {
          const g = this.find(h, !1);
          r(g, !1), g instanceof Pe && g.children.forEach((v) => {
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
_n.blotName = "scroll", _n.defaultChild = pi, _n.allowedChildren = [pi, $r], _n.scope = ot.BLOCK_BLOT, _n.tagName = "DIV";
let Kv = _n;
const el = Kv, ba = class kh extends re {
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
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof kh && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
ba.blotName = "text", ba.scope = ot.INLINE_BLOT;
let Gv = ba;
const br = Gv, Yv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: Qe,
  AttributorStore: Ir,
  BlockBlot: pi,
  ClassAttributor: Ue,
  ContainerBlot: $r,
  EmbedBlot: ye,
  InlineBlot: tl,
  LeafBlot: re,
  ParentBlot: Pe,
  Registry: Dn,
  Scope: ot,
  ScrollBlot: el,
  StyleAttributor: Rs,
  TextBlot: br
}, Symbol.toStringTag, { value: "Module" }));
var ds = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Lh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gi = { exports: {} }, jo, Ac;
function Xv() {
  if (Ac) return jo;
  Ac = 1;
  var e = -1, t = 1, s = 0;
  function n(y, x, w, O, R) {
    if (y === x)
      return y ? [[s, y]] : [];
    if (w != null) {
      var A = C(y, x, w);
      if (A)
        return A;
    }
    var S = a(y, x), z = y.substring(0, S);
    y = y.substring(S), x = x.substring(S), S = c(y, x);
    var K = y.substring(y.length - S);
    y = y.substring(0, y.length - S), x = x.substring(0, x.length - S);
    var U = i(y, x);
    return z && U.unshift([s, z]), K && U.push([s, K]), j(U, R), O && h(U), U;
  }
  function i(y, x) {
    var w;
    if (!y)
      return [[t, x]];
    if (!x)
      return [[e, y]];
    var O = y.length > x.length ? y : x, R = y.length > x.length ? x : y, A = O.indexOf(R);
    if (A !== -1)
      return w = [
        [t, O.substring(0, A)],
        [s, R],
        [t, O.substring(A + R.length)]
      ], y.length > x.length && (w[0][0] = w[2][0] = e), w;
    if (R.length === 1)
      return [
        [e, y],
        [t, x]
      ];
    var S = d(y, x);
    if (S) {
      var z = S[0], K = S[1], U = S[2], et = S[3], Q = S[4], rt = n(z, U), nt = n(K, et);
      return rt.concat([[s, Q]], nt);
    }
    return r(y, x);
  }
  function r(y, x) {
    for (var w = y.length, O = x.length, R = Math.ceil((w + O) / 2), A = R, S = 2 * R, z = new Array(S), K = new Array(S), U = 0; U < S; U++)
      z[U] = -1, K[U] = -1;
    z[A + 1] = 0, K[A + 1] = 0;
    for (var et = w - O, Q = et % 2 !== 0, rt = 0, nt = 0, H = 0, Z = 0, bt = 0; bt < R; bt++) {
      for (var tt = -bt + rt; tt <= bt - nt; tt += 2) {
        var pt = A + tt, gt;
        tt === -bt || tt !== bt && z[pt - 1] < z[pt + 1] ? gt = z[pt + 1] : gt = z[pt - 1] + 1;
        for (var M = gt - tt; gt < w && M < O && y.charAt(gt) === x.charAt(M); )
          gt++, M++;
        if (z[pt] = gt, gt > w)
          nt += 2;
        else if (M > O)
          rt += 2;
        else if (Q) {
          var B = A + et - tt;
          if (B >= 0 && B < S && K[B] !== -1) {
            var q = w - K[B];
            if (gt >= q)
              return o(y, x, gt, M);
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
          if (pt >= 0 && pt < S && z[pt] !== -1) {
            var gt = z[pt], M = A + gt - pt;
            if (q = w - q, gt >= q)
              return o(y, x, gt, M);
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
    var R = y.substring(0, w), A = x.substring(0, O), S = y.substring(w), z = x.substring(O), K = n(R, A), U = n(S, z);
    return K.concat(U);
  }
  function a(y, x) {
    if (!y || !x || y.charAt(0) !== x.charAt(0))
      return 0;
    for (var w = 0, O = Math.min(y.length, x.length), R = O, A = 0; w < R; )
      y.substring(A, R) == x.substring(A, R) ? (w = R, A = w) : O = R, R = Math.floor((O - w) / 2 + w);
    return W(y.charCodeAt(R - 1)) && R--, R;
  }
  function l(y, x) {
    var w = y.length, O = x.length;
    if (w == 0 || O == 0)
      return 0;
    w > O ? y = y.substring(w - O) : w < O && (x = x.substring(0, w));
    var R = Math.min(w, O);
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
    for (var w = 0, O = Math.min(y.length, x.length), R = O, A = 0; w < R; )
      y.substring(y.length - R, y.length - A) == x.substring(x.length - R, x.length - A) ? (w = R, A = w) : O = R, R = Math.floor((O - w) / 2 + w);
    return Y(y.charCodeAt(y.length - R)) && R--, R;
  }
  function d(y, x) {
    var w = y.length > x.length ? y : x, O = y.length > x.length ? x : y;
    if (w.length < 4 || O.length * 2 < w.length)
      return null;
    function R(nt, H, Z) {
      for (var bt = nt.substring(Z, Z + Math.floor(nt.length / 4)), tt = -1, pt = "", gt, M, B, q; (tt = H.indexOf(bt, tt + 1)) !== -1; ) {
        var J = a(
          nt.substring(Z),
          H.substring(tt)
        ), Dt = c(
          nt.substring(0, Z),
          H.substring(0, tt)
        );
        pt.length < Dt + J && (pt = H.substring(tt - Dt, tt) + H.substring(tt, tt + J), gt = nt.substring(0, Z - Dt), M = nt.substring(Z + J), B = H.substring(0, tt - Dt), q = H.substring(tt + J));
      }
      return pt.length * 2 >= nt.length ? [
        gt,
        M,
        B,
        q,
        pt
      ] : null;
    }
    var A = R(
      w,
      O,
      Math.ceil(w.length / 4)
    ), S = R(
      w,
      O,
      Math.ceil(w.length / 2)
    ), z;
    if (!A && !S)
      return null;
    S ? A ? z = A[4].length > S[4].length ? A : S : z = S : z = A;
    var K, U, et, Q;
    y.length > x.length ? (K = z[0], U = z[1], et = z[2], Q = z[3]) : (et = z[0], Q = z[1], K = z[2], U = z[3]);
    var rt = z[4];
    return [K, U, et, Q, rt];
  }
  function h(y) {
    for (var x = !1, w = [], O = 0, R = null, A = 0, S = 0, z = 0, K = 0, U = 0; A < y.length; )
      y[A][0] == s ? (w[O++] = A, S = K, z = U, K = 0, U = 0, R = y[A][1]) : (y[A][0] == t ? K += y[A][1].length : U += y[A][1].length, R && R.length <= Math.max(S, z) && R.length <= Math.max(K, U) && (y.splice(w[O - 1], 0, [
        e,
        R
      ]), y[w[O - 1] + 1][0] = t, O--, O--, A = O > 0 ? w[O - 1] : -1, S = 0, z = 0, K = 0, U = 0, R = null, x = !0)), A++;
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
  var g = /[^a-zA-Z0-9]/, v = /\s/, E = /[\r\n]/, F = /\n\r?\n$/, N = /^\r?\n\r?\n/;
  function I(y) {
    function x(nt, H) {
      if (!nt || !H)
        return 6;
      var Z = nt.charAt(nt.length - 1), bt = H.charAt(0), tt = Z.match(g), pt = bt.match(g), gt = tt && Z.match(v), M = pt && bt.match(v), B = gt && Z.match(E), q = M && bt.match(E), J = B && nt.match(F), Dt = q && H.match(N);
      return J || Dt ? 5 : B || q ? 4 : tt && !gt && M ? 3 : gt || M ? 2 : tt || pt ? 1 : 0;
    }
    for (var w = 1; w < y.length - 1; ) {
      if (y[w - 1][0] == s && y[w + 1][0] == s) {
        var O = y[w - 1][1], R = y[w][1], A = y[w + 1][1], S = c(O, R);
        if (S) {
          var z = R.substring(R.length - S);
          O = O.substring(0, O.length - S), R = z + R.substring(0, R.length - S), A = z + A;
        }
        for (var K = O, U = R, et = A, Q = x(O, R) + x(R, A); R.charAt(0) === A.charAt(0); ) {
          O += R.charAt(0), R = R.substring(1) + A.charAt(0), A = A.substring(1);
          var rt = x(O, R) + x(R, A);
          rt >= Q && (Q = rt, K = O, U = R, et = A);
        }
        y[w - 1][1] != K && (K ? y[w - 1][1] = K : (y.splice(w - 1, 1), w--), y[w][1] = U, et ? y[w + 1][1] = et : (y.splice(w + 1, 1), w--));
      }
      w++;
    }
  }
  function j(y, x) {
    y.push([s, ""]);
    for (var w = 0, O = 0, R = 0, A = "", S = "", z; w < y.length; ) {
      if (w < y.length - 1 && !y[w][1]) {
        y.splice(w, 1);
        continue;
      }
      switch (y[w][0]) {
        case t:
          R++, S += y[w][1], w++;
          break;
        case e:
          O++, A += y[w][1], w++;
          break;
        case s:
          var K = w - R - O - 1;
          if (x) {
            if (K >= 0 && X(y[K][1])) {
              var U = y[K][1].slice(-1);
              if (y[K][1] = y[K][1].slice(
                0,
                -1
              ), A = U + A, S = U + S, !y[K][1]) {
                y.splice(K, 1), w--;
                var et = K - 1;
                y[et] && y[et][0] === t && (R++, S = y[et][1] + S, et--), y[et] && y[et][0] === e && (O++, A = y[et][1] + A, et--), K = et;
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
            A.length > 0 && S.length > 0 && (z = a(S, A), z !== 0 && (K >= 0 ? y[K][1] += S.substring(
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
            var Q = R + O;
            A.length === 0 && S.length === 0 ? (y.splice(w - Q, Q), w = w - Q) : A.length === 0 ? (y.splice(w - Q, Q, [t, S]), w = w - Q + 1) : S.length === 0 ? (y.splice(w - Q, Q, [e, A]), w = w - Q + 1) : (y.splice(
              w - Q,
              Q,
              [e, A],
              [t, S]
            ), w = w - Q + 2);
          }
          w !== 0 && y[w - 1][0] === s ? (y[w - 1][1] += y[w][1], y.splice(w, 1)) : w++, R = 0, O = 0, A = "", S = "";
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
    var O = typeof w == "number" ? { index: w, length: 0 } : w.oldRange, R = typeof w == "number" ? null : w.newRange, A = y.length, S = x.length;
    if (O.length === 0 && (R === null || R.length === 0)) {
      var z = O.index, K = y.slice(0, z), U = y.slice(z), et = R ? R.index : null;
      t: {
        var Q = z + S - A;
        if (et !== null && et !== Q || Q < 0 || Q > S)
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
        var M = Math.min(A - gt, S - gt), B = U.slice(U.length - M), q = nt.slice(nt.length - M);
        if (B !== q)
          break t;
        var tt = U.slice(0, U.length - M), pt = nt.slice(0, nt.length - M);
        return ft(K, tt, pt, B);
      }
    }
    if (O.length > 0 && R && R.length === 0)
      t: {
        var Z = y.slice(0, O.index), B = y.slice(O.index + O.length), H = Z.length, M = B.length;
        if (S < H + M)
          break t;
        var bt = x.slice(0, H), q = x.slice(S - M);
        if (Z !== bt || B !== q)
          break t;
        var tt = y.slice(H, A - M), pt = x.slice(H, S - M);
        return ft(Z, tt, pt, B);
      }
    return null;
  }
  function P(y, x, w, O) {
    return n(y, x, w, O, !0);
  }
  return P.INSERT = t, P.DELETE = e, P.EQUAL = s, jo = P, jo;
}
var si = { exports: {} };
si.exports;
var Tc;
function Ih() {
  return Tc || (Tc = 1, (function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", l = "[object Date]", c = "[object Error]", d = "[object Function]", h = "[object GeneratorFunction]", g = "[object Map]", v = "[object Number]", E = "[object Object]", F = "[object Promise]", N = "[object RegExp]", I = "[object Set]", j = "[object String]", W = "[object Symbol]", Y = "[object WeakMap]", G = "[object ArrayBuffer]", X = "[object DataView]", dt = "[object Float32Array]", ft = "[object Float64Array]", C = "[object Int8Array]", P = "[object Int16Array]", y = "[object Int32Array]", x = "[object Uint8Array]", w = "[object Uint8ClampedArray]", O = "[object Uint16Array]", R = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, S = /\w*$/, z = /^\[object .+?Constructor\]$/, K = /^(?:0|[1-9]\d*)$/, U = {};
    U[r] = U[o] = U[G] = U[X] = U[a] = U[l] = U[dt] = U[ft] = U[C] = U[P] = U[y] = U[g] = U[v] = U[E] = U[N] = U[I] = U[j] = U[W] = U[x] = U[w] = U[O] = U[R] = !0, U[c] = U[d] = U[Y] = !1;
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
      for (var _ = -1, L = p.length, yt = u.length; ++_ < L; )
        u[yt + _] = p[_];
      return u;
    }
    function M(u, p, _, L) {
      for (var yt = -1, lt = u ? u.length : 0; ++yt < lt; )
        _ = p(_, u[yt], yt, u);
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
      return u.forEach(function(L, yt) {
        _[++p] = [yt, L];
      }), _;
    }
    function ve(u, p) {
      return function(_) {
        return u(p(_));
      };
    }
    function ke(u) {
      var p = -1, _ = Array(u.size);
      return u.forEach(function(L) {
        _[++p] = L;
      }), _;
    }
    var ss = Array.prototype, ns = Function.prototype, Xt = Object.prototype, oe = rt["__core-js_shared__"], _e = (function() {
      var u = /[^.]+$/.exec(oe && oe.keys && oe.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    })(), Ht = ns.toString, xt = Xt.hasOwnProperty, at = Xt.toString, ct = RegExp(
      "^" + Ht.call(xt).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), _t = Z ? rt.Buffer : void 0, Et = rt.Symbol, Zt = rt.Uint8Array, Nt = ve(Object.getPrototypeOf, Object), Wt = Object.create, zt = Xt.propertyIsEnumerable, Kt = ss.splice, Rt = Object.getOwnPropertySymbols, kt = _t ? _t.isBuffer : void 0, qt = ve(Object.keys, Object), Mt = Le(rt, "DataView"), Lt = Le(rt, "Map"), Ct = Le(rt, "Promise"), Bt = Le(rt, "Set"), Pt = Le(rt, "WeakMap"), It = Le(Object, "create"), Vt = ae(Mt), $t = ae(Lt), jt = ae(Ct), Ut = ae(Bt), jn = ae(Pt), Es = Et ? Et.prototype : void 0, Ci = Es ? Es.valueOf : void 0;
    function is(u) {
      var p = -1, _ = u ? u.length : 0;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Br() {
      this.__data__ = It ? It(null) : {};
    }
    function qr(u) {
      return this.has(u) && delete this.__data__[u];
    }
    function Pr(u) {
      var p = this.__data__;
      if (It) {
        var _ = p[u];
        return _ === n ? void 0 : _;
      }
      return xt.call(p, u) ? p[u] : void 0;
    }
    function Oi(u) {
      var p = this.__data__;
      return It ? p[u] !== void 0 : xt.call(p, u);
    }
    function Un(u, p) {
      var _ = this.__data__;
      return _[u] = It && p === void 0 ? n : p, this;
    }
    is.prototype.clear = Br, is.prototype.delete = qr, is.prototype.get = Pr, is.prototype.has = Oi, is.prototype.set = Un;
    function Qt(u) {
      var p = -1, _ = u ? u.length : 0;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Vr() {
      this.__data__ = [];
    }
    function jr(u) {
      var p = this.__data__, _ = ln(p, u);
      if (_ < 0)
        return !1;
      var L = p.length - 1;
      return _ == L ? p.pop() : Kt.call(p, _, 1), !0;
    }
    function Ur(u) {
      var p = this.__data__, _ = ln(p, u);
      return _ < 0 ? void 0 : p[_][1];
    }
    function Hr(u) {
      return ln(this.__data__, u) > -1;
    }
    function Wr(u, p) {
      var _ = this.__data__, L = ln(_, u);
      return L < 0 ? _.push([u, p]) : _[L][1] = p, this;
    }
    Qt.prototype.clear = Vr, Qt.prototype.delete = jr, Qt.prototype.get = Ur, Qt.prototype.has = Hr, Qt.prototype.set = Wr;
    function se(u) {
      var p = -1, _ = u ? u.length : 0;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function zr() {
      this.__data__ = {
        hash: new is(),
        map: new (Lt || Qt)(),
        string: new is()
      };
    }
    function Kr(u) {
      return Bs(this, u).delete(u);
    }
    function Gr(u) {
      return Bs(this, u).get(u);
    }
    function Yr(u) {
      return Bs(this, u).has(u);
    }
    function Xr(u, p) {
      return Bs(this, u).set(u, p), this;
    }
    se.prototype.clear = zr, se.prototype.delete = Kr, se.prototype.get = Gr, se.prototype.has = Yr, se.prototype.set = Xr;
    function de(u) {
      this.__data__ = new Qt(u);
    }
    function Zr() {
      this.__data__ = new Qt();
    }
    function Jr(u) {
      return this.__data__.delete(u);
    }
    function Qr(u) {
      return this.__data__.get(u);
    }
    function to(u) {
      return this.__data__.has(u);
    }
    function eo(u, p) {
      var _ = this.__data__;
      if (_ instanceof Qt) {
        var L = _.__data__;
        if (!Lt || L.length < s - 1)
          return L.push([u, p]), this;
        _ = this.__data__ = new se(L);
      }
      return _.set(u, p), this;
    }
    de.prototype.clear = Zr, de.prototype.delete = Jr, de.prototype.get = Qr, de.prototype.has = to, de.prototype.set = eo;
    function an(u, p) {
      var _ = Kn(u) || un(u) ? B(u.length, String) : [], L = _.length, yt = !!L;
      for (var lt in u)
        xt.call(u, lt) && !(yt && (lt == "length" || mo(lt, L))) && _.push(lt);
      return _;
    }
    function Ni(u, p, _) {
      var L = u[p];
      (!(xt.call(u, p) && $i(L, _)) || _ === void 0 && !(p in u)) && (u[p] = _);
    }
    function ln(u, p) {
      for (var _ = u.length; _--; )
        if ($i(u[_][0], p))
          return _;
      return -1;
    }
    function We(u, p) {
      return u && zn(p, Yn(p), u);
    }
    function Hn(u, p, _, L, yt, lt, Tt) {
      var At;
      if (L && (At = lt ? L(u, yt, lt, Tt) : L(u)), At !== void 0)
        return At;
      if (!Ke(u))
        return u;
      var Gt = Kn(u);
      if (Gt) {
        if (At = po(u), !p)
          return uo(u, At);
      } else {
        var Ft = os(u), ne = Ft == d || Ft == h;
        if (Di(u))
          return cn(u, p);
        if (Ft == E || Ft == r || ne && !lt) {
          if (J(u))
            return lt ? u : {};
          if (At = ze(ne ? {} : u), !p)
            return ho(u, We(At, u));
        } else {
          if (!U[Ft])
            return lt ? u : {};
          At = go(u, Ft, Hn, p);
        }
      }
      Tt || (Tt = new de());
      var fe = Tt.get(u);
      if (fe)
        return fe;
      if (Tt.set(u, At), !Gt)
        var Yt = _ ? fo(u) : Yn(u);
      return pt(Yt || u, function(ie, te) {
        Yt && (te = ie, ie = u[te]), Ni(At, te, Hn(ie, p, _, L, te, u, Tt));
      }), At;
    }
    function so(u) {
      return Ke(u) ? Wt(u) : {};
    }
    function no(u, p, _) {
      var L = p(u);
      return Kn(u) ? L : gt(L, _(u));
    }
    function io(u) {
      return at.call(u);
    }
    function ro(u) {
      if (!Ke(u) || yo(u))
        return !1;
      var p = Gn(u) || J(u) ? ct : z;
      return p.test(ae(u));
    }
    function oo(u) {
      if (!Li(u))
        return qt(u);
      var p = [];
      for (var _ in Object(u))
        xt.call(u, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function cn(u, p) {
      if (p)
        return u.slice();
      var _ = new u.constructor(u.length);
      return u.copy(_), _;
    }
    function Wn(u) {
      var p = new u.constructor(u.byteLength);
      return new Zt(p).set(new Zt(u)), p;
    }
    function Ms(u, p) {
      var _ = p ? Wn(u.buffer) : u.buffer;
      return new u.constructor(_, u.byteOffset, u.byteLength);
    }
    function Si(u, p, _) {
      var L = p ? _(Dt(u), !0) : Dt(u);
      return M(L, bt, new u.constructor());
    }
    function ki(u) {
      var p = new u.constructor(u.source, S.exec(u));
      return p.lastIndex = u.lastIndex, p;
    }
    function ao(u, p, _) {
      var L = p ? _(ke(u), !0) : ke(u);
      return M(L, tt, new u.constructor());
    }
    function lo(u) {
      return Ci ? Object(Ci.call(u)) : {};
    }
    function co(u, p) {
      var _ = p ? Wn(u.buffer) : u.buffer;
      return new u.constructor(_, u.byteOffset, u.length);
    }
    function uo(u, p) {
      var _ = -1, L = u.length;
      for (p || (p = Array(L)); ++_ < L; )
        p[_] = u[_];
      return p;
    }
    function zn(u, p, _, L) {
      _ || (_ = {});
      for (var yt = -1, lt = p.length; ++yt < lt; ) {
        var Tt = p[yt], At = void 0;
        Ni(_, Tt, At === void 0 ? u[Tt] : At);
      }
      return _;
    }
    function ho(u, p) {
      return zn(u, rs(u), p);
    }
    function fo(u) {
      return no(u, Yn, rs);
    }
    function Bs(u, p) {
      var _ = u.__data__;
      return bo(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function Le(u, p) {
      var _ = q(u, p);
      return ro(_) ? _ : void 0;
    }
    var rs = Rt ? ve(Rt, Object) : _o, os = io;
    (Mt && os(new Mt(new ArrayBuffer(1))) != X || Lt && os(new Lt()) != g || Ct && os(Ct.resolve()) != F || Bt && os(new Bt()) != I || Pt && os(new Pt()) != Y) && (os = function(u) {
      var p = at.call(u), _ = p == E ? u.constructor : void 0, L = _ ? ae(_) : void 0;
      if (L)
        switch (L) {
          case Vt:
            return X;
          case $t:
            return g;
          case jt:
            return F;
          case Ut:
            return I;
          case jn:
            return Y;
        }
      return p;
    });
    function po(u) {
      var p = u.length, _ = u.constructor(p);
      return p && typeof u[0] == "string" && xt.call(u, "index") && (_.index = u.index, _.input = u.input), _;
    }
    function ze(u) {
      return typeof u.constructor == "function" && !Li(u) ? so(Nt(u)) : {};
    }
    function go(u, p, _, L) {
      var yt = u.constructor;
      switch (p) {
        case G:
          return Wn(u);
        case a:
        case l:
          return new yt(+u);
        case X:
          return Ms(u, L);
        case dt:
        case ft:
        case C:
        case P:
        case y:
        case x:
        case w:
        case O:
        case R:
          return co(u, L);
        case g:
          return Si(u, L, _);
        case v:
        case j:
          return new yt(u);
        case N:
          return ki(u);
        case I:
          return ao(u, L, _);
        case W:
          return lo(u);
      }
    }
    function mo(u, p) {
      return p = p ?? i, !!p && (typeof u == "number" || K.test(u)) && u > -1 && u % 1 == 0 && u < p;
    }
    function bo(u) {
      var p = typeof u;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
    }
    function yo(u) {
      return !!_e && _e in u;
    }
    function Li(u) {
      var p = u && u.constructor, _ = typeof p == "function" && p.prototype || Xt;
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
    function Ii(u) {
      return Hn(u, !0, !0);
    }
    function $i(u, p) {
      return u === p || u !== u && p !== p;
    }
    function un(u) {
      return vo(u) && xt.call(u, "callee") && (!zt.call(u, "callee") || at.call(u) == r);
    }
    var Kn = Array.isArray;
    function hn(u) {
      return u != null && Ri(u.length) && !Gn(u);
    }
    function vo(u) {
      return Mi(u) && hn(u);
    }
    var Di = kt || Eo;
    function Gn(u) {
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
    function Mi(u) {
      return !!u && typeof u == "object";
    }
    function Yn(u) {
      return hn(u) ? an(u) : oo(u);
    }
    function _o() {
      return [];
    }
    function Eo() {
      return !1;
    }
    e.exports = Ii;
  })(si, si.exports)), si.exports;
}
var ni = { exports: {} };
ni.exports;
var Fc;
function $h() {
  return Fc || (Fc = 1, (function(e, t) {
    var s = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", d = "[object Boolean]", h = "[object Date]", g = "[object Error]", v = "[object Function]", E = "[object GeneratorFunction]", F = "[object Map]", N = "[object Number]", I = "[object Null]", j = "[object Object]", W = "[object Promise]", Y = "[object Proxy]", G = "[object RegExp]", X = "[object Set]", dt = "[object String]", ft = "[object Symbol]", C = "[object Undefined]", P = "[object WeakMap]", y = "[object ArrayBuffer]", x = "[object DataView]", w = "[object Float32Array]", O = "[object Float64Array]", R = "[object Int8Array]", A = "[object Int16Array]", S = "[object Int32Array]", z = "[object Uint8Array]", K = "[object Uint8ClampedArray]", U = "[object Uint16Array]", et = "[object Uint32Array]", Q = /[\\^$.*+?()[\]{}|]/g, rt = /^\[object .+?Constructor\]$/, nt = /^(?:0|[1-9]\d*)$/, H = {};
    H[w] = H[O] = H[R] = H[A] = H[S] = H[z] = H[K] = H[U] = H[et] = !0, H[a] = H[l] = H[y] = H[d] = H[x] = H[h] = H[g] = H[v] = H[F] = H[N] = H[j] = H[G] = H[X] = H[dt] = H[P] = !1;
    var Z = typeof ds == "object" && ds && ds.Object === Object && ds, bt = typeof self == "object" && self && self.Object === Object && self, tt = Z || bt || Function("return this")(), pt = t && !t.nodeType && t, gt = pt && !0 && e && !e.nodeType && e, M = gt && gt.exports === pt, B = M && Z.process, q = (function() {
      try {
        return B && B.binding && B.binding("util");
      } catch {
      }
    })(), J = q && q.isTypedArray;
    function Dt(u, p) {
      for (var _ = -1, L = u == null ? 0 : u.length, yt = 0, lt = []; ++_ < L; ) {
        var Tt = u[_];
        p(Tt, _, u) && (lt[yt++] = Tt);
      }
      return lt;
    }
    function ve(u, p) {
      for (var _ = -1, L = p.length, yt = u.length; ++_ < L; )
        u[yt + _] = p[_];
      return u;
    }
    function ke(u, p) {
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
    function Xt(u, p) {
      return u.has(p);
    }
    function oe(u, p) {
      return u?.[p];
    }
    function _e(u) {
      var p = -1, _ = Array(u.size);
      return u.forEach(function(L, yt) {
        _[++p] = [yt, L];
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
    var at = Array.prototype, ct = Function.prototype, _t = Object.prototype, Et = tt["__core-js_shared__"], Zt = ct.toString, Nt = _t.hasOwnProperty, Wt = (function() {
      var u = /[^.]+$/.exec(Et && Et.keys && Et.keys.IE_PROTO || "");
      return u ? "Symbol(src)_1." + u : "";
    })(), zt = _t.toString, Kt = RegExp(
      "^" + Zt.call(Nt).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Rt = M ? tt.Buffer : void 0, kt = tt.Symbol, qt = tt.Uint8Array, Mt = _t.propertyIsEnumerable, Lt = at.splice, Ct = kt ? kt.toStringTag : void 0, Bt = Object.getOwnPropertySymbols, Pt = Rt ? Rt.isBuffer : void 0, It = Ht(Object.keys, Object), Vt = rs(tt, "DataView"), $t = rs(tt, "Map"), jt = rs(tt, "Promise"), Ut = rs(tt, "Set"), jn = rs(tt, "WeakMap"), Es = rs(Object, "create"), Ci = ae(Vt), is = ae($t), Br = ae(jt), qr = ae(Ut), Pr = ae(jn), Oi = kt ? kt.prototype : void 0, Un = Oi ? Oi.valueOf : void 0;
    function Qt(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Vr() {
      this.__data__ = Es ? Es(null) : {}, this.size = 0;
    }
    function jr(u) {
      var p = this.has(u) && delete this.__data__[u];
      return this.size -= p ? 1 : 0, p;
    }
    function Ur(u) {
      var p = this.__data__;
      if (Es) {
        var _ = p[u];
        return _ === n ? void 0 : _;
      }
      return Nt.call(p, u) ? p[u] : void 0;
    }
    function Hr(u) {
      var p = this.__data__;
      return Es ? p[u] !== void 0 : Nt.call(p, u);
    }
    function Wr(u, p) {
      var _ = this.__data__;
      return this.size += this.has(u) ? 0 : 1, _[u] = Es && p === void 0 ? n : p, this;
    }
    Qt.prototype.clear = Vr, Qt.prototype.delete = jr, Qt.prototype.get = Ur, Qt.prototype.has = Hr, Qt.prototype.set = Wr;
    function se(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function zr() {
      this.__data__ = [], this.size = 0;
    }
    function Kr(u) {
      var p = this.__data__, _ = cn(p, u);
      if (_ < 0)
        return !1;
      var L = p.length - 1;
      return _ == L ? p.pop() : Lt.call(p, _, 1), --this.size, !0;
    }
    function Gr(u) {
      var p = this.__data__, _ = cn(p, u);
      return _ < 0 ? void 0 : p[_][1];
    }
    function Yr(u) {
      return cn(this.__data__, u) > -1;
    }
    function Xr(u, p) {
      var _ = this.__data__, L = cn(_, u);
      return L < 0 ? (++this.size, _.push([u, p])) : _[L][1] = p, this;
    }
    se.prototype.clear = zr, se.prototype.delete = Kr, se.prototype.get = Gr, se.prototype.has = Yr, se.prototype.set = Xr;
    function de(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.clear(); ++p < _; ) {
        var L = u[p];
        this.set(L[0], L[1]);
      }
    }
    function Zr() {
      this.size = 0, this.__data__ = {
        hash: new Qt(),
        map: new ($t || se)(),
        string: new Qt()
      };
    }
    function Jr(u) {
      var p = Le(this, u).delete(u);
      return this.size -= p ? 1 : 0, p;
    }
    function Qr(u) {
      return Le(this, u).get(u);
    }
    function to(u) {
      return Le(this, u).has(u);
    }
    function eo(u, p) {
      var _ = Le(this, u), L = _.size;
      return _.set(u, p), this.size += _.size == L ? 0 : 1, this;
    }
    de.prototype.clear = Zr, de.prototype.delete = Jr, de.prototype.get = Qr, de.prototype.has = to, de.prototype.set = eo;
    function an(u) {
      var p = -1, _ = u == null ? 0 : u.length;
      for (this.__data__ = new de(); ++p < _; )
        this.add(u[p]);
    }
    function Ni(u) {
      return this.__data__.set(u, n), this;
    }
    function ln(u) {
      return this.__data__.has(u);
    }
    an.prototype.add = an.prototype.push = Ni, an.prototype.has = ln;
    function We(u) {
      var p = this.__data__ = new se(u);
      this.size = p.size;
    }
    function Hn() {
      this.__data__ = new se(), this.size = 0;
    }
    function so(u) {
      var p = this.__data__, _ = p.delete(u);
      return this.size = p.size, _;
    }
    function no(u) {
      return this.__data__.get(u);
    }
    function io(u) {
      return this.__data__.has(u);
    }
    function ro(u, p) {
      var _ = this.__data__;
      if (_ instanceof se) {
        var L = _.__data__;
        if (!$t || L.length < s - 1)
          return L.push([u, p]), this.size = ++_.size, this;
        _ = this.__data__ = new de(L);
      }
      return _.set(u, p), this.size = _.size, this;
    }
    We.prototype.clear = Hn, We.prototype.delete = so, We.prototype.get = no, We.prototype.has = io, We.prototype.set = ro;
    function oo(u, p) {
      var _ = un(u), L = !_ && $i(u), yt = !_ && !L && hn(u), lt = !_ && !L && !yt && Mi(u), Tt = _ || L || yt || lt, At = Tt ? ss(u.length, String) : [], Gt = At.length;
      for (var Ft in u)
        Nt.call(u, Ft) && !(Tt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ft == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        yt && (Ft == "offset" || Ft == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        lt && (Ft == "buffer" || Ft == "byteLength" || Ft == "byteOffset") || // Skip index properties.
        go(Ft, Gt))) && At.push(Ft);
      return At;
    }
    function cn(u, p) {
      for (var _ = u.length; _--; )
        if (Ii(u[_][0], p))
          return _;
      return -1;
    }
    function Wn(u, p, _) {
      var L = p(u);
      return un(u) ? L : ve(L, _(u));
    }
    function Ms(u) {
      return u == null ? u === void 0 ? C : I : Ct && Ct in Object(u) ? os(u) : Li(u);
    }
    function Si(u) {
      return Ke(u) && Ms(u) == a;
    }
    function ki(u, p, _, L, yt) {
      return u === p ? !0 : u == null || p == null || !Ke(u) && !Ke(p) ? u !== u && p !== p : ao(u, p, _, L, ki, yt);
    }
    function ao(u, p, _, L, yt, lt) {
      var Tt = un(u), At = un(p), Gt = Tt ? l : ze(u), Ft = At ? l : ze(p);
      Gt = Gt == a ? j : Gt, Ft = Ft == a ? j : Ft;
      var ne = Gt == j, fe = Ft == j, Yt = Gt == Ft;
      if (Yt && hn(u)) {
        if (!hn(p))
          return !1;
        Tt = !0, ne = !1;
      }
      if (Yt && !ne)
        return lt || (lt = new We()), Tt || Mi(u) ? zn(u, p, _, L, yt, lt) : ho(u, p, Gt, _, L, yt, lt);
      if (!(_ & i)) {
        var ie = ne && Nt.call(u, "__wrapped__"), te = fe && Nt.call(p, "__wrapped__");
        if (ie || te) {
          var ws = ie ? u.value() : u, as = te ? p.value() : p;
          return lt || (lt = new We()), yt(ws, as, _, L, lt);
        }
      }
      return Yt ? (lt || (lt = new We()), fo(u, p, _, L, yt, lt)) : !1;
    }
    function lo(u) {
      if (!Ri(u) || bo(u))
        return !1;
      var p = Di(u) ? Kt : rt;
      return p.test(ae(u));
    }
    function co(u) {
      return Ke(u) && Gn(u.length) && !!H[Ms(u)];
    }
    function uo(u) {
      if (!yo(u))
        return It(u);
      var p = [];
      for (var _ in Object(u))
        Nt.call(u, _) && _ != "constructor" && p.push(_);
      return p;
    }
    function zn(u, p, _, L, yt, lt) {
      var Tt = _ & i, At = u.length, Gt = p.length;
      if (At != Gt && !(Tt && Gt > At))
        return !1;
      var Ft = lt.get(u);
      if (Ft && lt.get(p))
        return Ft == p;
      var ne = -1, fe = !0, Yt = _ & r ? new an() : void 0;
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
        if (Yt) {
          if (!ke(p, function(as, qs) {
            if (!Xt(Yt, qs) && (ie === as || yt(ie, as, _, L, lt)))
              return Yt.push(qs);
          })) {
            fe = !1;
            break;
          }
        } else if (!(ie === te || yt(ie, te, _, L, lt))) {
          fe = !1;
          break;
        }
      }
      return lt.delete(u), lt.delete(p), fe;
    }
    function ho(u, p, _, L, yt, lt, Tt) {
      switch (_) {
        case x:
          if (u.byteLength != p.byteLength || u.byteOffset != p.byteOffset)
            return !1;
          u = u.buffer, p = p.buffer;
        case y:
          return !(u.byteLength != p.byteLength || !lt(new qt(u), new qt(p)));
        case d:
        case h:
        case N:
          return Ii(+u, +p);
        case g:
          return u.name == p.name && u.message == p.message;
        case G:
        case dt:
          return u == p + "";
        case F:
          var At = _e;
        case X:
          var Gt = L & i;
          if (At || (At = xt), u.size != p.size && !Gt)
            return !1;
          var Ft = Tt.get(u);
          if (Ft)
            return Ft == p;
          L |= r, Tt.set(u, p);
          var ne = zn(At(u), At(p), L, yt, lt, Tt);
          return Tt.delete(u), ne;
        case ft:
          if (Un)
            return Un.call(u) == Un.call(p);
      }
      return !1;
    }
    function fo(u, p, _, L, yt, lt) {
      var Tt = _ & i, At = Bs(u), Gt = At.length, Ft = Bs(p), ne = Ft.length;
      if (Gt != ne && !Tt)
        return !1;
      for (var fe = Gt; fe--; ) {
        var Yt = At[fe];
        if (!(Tt ? Yt in p : Nt.call(p, Yt)))
          return !1;
      }
      var ie = lt.get(u);
      if (ie && lt.get(p))
        return ie == p;
      var te = !0;
      lt.set(u, p), lt.set(p, u);
      for (var ws = Tt; ++fe < Gt; ) {
        Yt = At[fe];
        var as = u[Yt], qs = p[Yt];
        if (L)
          var fl = Tt ? L(qs, as, Yt, p, u, lt) : L(as, qs, Yt, u, p, lt);
        if (!(fl === void 0 ? as === qs || yt(as, qs, _, L, lt) : fl)) {
          te = !1;
          break;
        }
        ws || (ws = Yt == "constructor");
      }
      if (te && !ws) {
        var Bi = u.constructor, qi = p.constructor;
        Bi != qi && "constructor" in u && "constructor" in p && !(typeof Bi == "function" && Bi instanceof Bi && typeof qi == "function" && qi instanceof qi) && (te = !1);
      }
      return lt.delete(u), lt.delete(p), te;
    }
    function Bs(u) {
      return Wn(u, Yn, po);
    }
    function Le(u, p) {
      var _ = u.__data__;
      return mo(p) ? _[typeof p == "string" ? "string" : "hash"] : _.map;
    }
    function rs(u, p) {
      var _ = oe(u, p);
      return lo(_) ? _ : void 0;
    }
    function os(u) {
      var p = Nt.call(u, Ct), _ = u[Ct];
      try {
        u[Ct] = void 0;
        var L = !0;
      } catch {
      }
      var yt = zt.call(u);
      return L && (p ? u[Ct] = _ : delete u[Ct]), yt;
    }
    var po = Bt ? function(u) {
      return u == null ? [] : (u = Object(u), Dt(Bt(u), function(p) {
        return Mt.call(u, p);
      }));
    } : _o, ze = Ms;
    (Vt && ze(new Vt(new ArrayBuffer(1))) != x || $t && ze(new $t()) != F || jt && ze(jt.resolve()) != W || Ut && ze(new Ut()) != X || jn && ze(new jn()) != P) && (ze = function(u) {
      var p = Ms(u), _ = p == j ? u.constructor : void 0, L = _ ? ae(_) : "";
      if (L)
        switch (L) {
          case Ci:
            return x;
          case is:
            return F;
          case Br:
            return W;
          case qr:
            return X;
          case Pr:
            return P;
        }
      return p;
    });
    function go(u, p) {
      return p = p ?? o, !!p && (typeof u == "number" || nt.test(u)) && u > -1 && u % 1 == 0 && u < p;
    }
    function mo(u) {
      var p = typeof u;
      return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? u !== "__proto__" : u === null;
    }
    function bo(u) {
      return !!Wt && Wt in u;
    }
    function yo(u) {
      var p = u && u.constructor, _ = typeof p == "function" && p.prototype || _t;
      return u === _;
    }
    function Li(u) {
      return zt.call(u);
    }
    function ae(u) {
      if (u != null) {
        try {
          return Zt.call(u);
        } catch {
        }
        try {
          return u + "";
        } catch {
        }
      }
      return "";
    }
    function Ii(u, p) {
      return u === p || u !== u && p !== p;
    }
    var $i = Si(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Si : function(u) {
      return Ke(u) && Nt.call(u, "callee") && !Mt.call(u, "callee");
    }, un = Array.isArray;
    function Kn(u) {
      return u != null && Gn(u.length) && !Di(u);
    }
    var hn = Pt || Eo;
    function vo(u, p) {
      return ki(u, p);
    }
    function Di(u) {
      if (!Ri(u))
        return !1;
      var p = Ms(u);
      return p == v || p == E || p == c || p == Y;
    }
    function Gn(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
    }
    function Ri(u) {
      var p = typeof u;
      return u != null && (p == "object" || p == "function");
    }
    function Ke(u) {
      return u != null && typeof u == "object";
    }
    var Mi = J ? ns(J) : co;
    function Yn(u) {
      return Kn(u) ? oo(u) : uo(u);
    }
    function _o() {
      return [];
    }
    function Eo() {
      return !1;
    }
    e.exports = vo;
  })(ni, ni.exports)), ni.exports;
}
var Yi = {}, xc;
function Zv() {
  if (xc) return Yi;
  xc = 1, Object.defineProperty(Yi, "__esModule", { value: !0 });
  const e = Ih(), t = $h();
  var s;
  return (function(n) {
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
    function o(l = {}, c = {}) {
      l = l || {};
      const d = Object.keys(c).reduce((h, g) => (c[g] !== l[g] && l[g] !== void 0 && (h[g] = c[g]), h), {});
      return Object.keys(l).reduce((h, g) => (l[g] !== c[g] && c[g] === void 0 && (h[g] = null), h), d);
    }
    n.invert = o;
    function a(l, c, d = !1) {
      if (typeof l != "object")
        return c;
      if (typeof c != "object")
        return;
      if (!d)
        return c;
      const h = Object.keys(c).reduce((g, v) => (l[v] === void 0 && (g[v] = c[v]), g), {});
      return Object.keys(h).length > 0 ? h : void 0;
    }
    n.transform = a;
  })(s || (s = {})), Yi.default = s, Yi;
}
var Xi = {}, Cc;
function Dh() {
  if (Cc) return Xi;
  Cc = 1, Object.defineProperty(Xi, "__esModule", { value: !0 });
  var e;
  return (function(t) {
    function s(n) {
      return typeof n.delete == "number" ? n.delete : typeof n.retain == "number" ? n.retain : typeof n.retain == "object" && n.retain !== null ? 1 : typeof n.insert == "string" ? n.insert.length : 1;
    }
    t.length = s;
  })(e || (e = {})), Xi.default = e, Xi;
}
var Zi = {}, Oc;
function Jv() {
  if (Oc) return Zi;
  Oc = 1, Object.defineProperty(Zi, "__esModule", { value: !0 });
  const e = Dh();
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
  return Zi.default = t, Zi;
}
var Nc;
function Qv() {
  return Nc || (Nc = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
    const s = Xv(), n = Ih(), i = $h(), r = Zv();
    t.AttributeMap = r.default;
    const o = Dh();
    t.Op = o.default;
    const a = Jv();
    t.OpIterator = a.default;
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
        const E = {};
        return typeof g == "string" && g.length === 0 ? this : (E.insert = g, v != null && typeof v == "object" && Object.keys(v).length > 0 && (E.attributes = v), this.push(E));
      }
      delete(g) {
        return g <= 0 ? this : this.push({ delete: g });
      }
      retain(g, v) {
        if (typeof g == "number" && g <= 0)
          return this;
        const E = { retain: g };
        return v != null && typeof v == "object" && Object.keys(v).length > 0 && (E.attributes = v), this.push(E);
      }
      push(g) {
        let v = this.ops.length, E = this.ops[v - 1];
        if (g = n(g), typeof E == "object") {
          if (typeof g.delete == "number" && typeof E.delete == "number")
            return this.ops[v - 1] = { delete: E.delete + g.delete }, this;
          if (typeof E.delete == "number" && g.insert != null && (v -= 1, E = this.ops[v - 1], typeof E != "object"))
            return this.ops.unshift(g), this;
          if (i(g.attributes, E.attributes)) {
            if (typeof g.insert == "string" && typeof E.insert == "string")
              return this.ops[v - 1] = { insert: E.insert + g.insert }, typeof g.attributes == "object" && (this.ops[v - 1].attributes = g.attributes), this;
            if (typeof g.retain == "number" && typeof E.retain == "number")
              return this.ops[v - 1] = { retain: E.retain + g.retain }, typeof g.attributes == "object" && (this.ops[v - 1].attributes = g.attributes), this;
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
        const v = [], E = [];
        return this.forEach((F) => {
          (g(F) ? v : E).push(F);
        }), [v, E];
      }
      reduce(g, v) {
        return this.ops.reduce(g, v);
      }
      changeLength() {
        return this.reduce((g, v) => v.insert ? g + o.default.length(v) : v.delete ? g - v.delete : g, 0);
      }
      length() {
        return this.reduce((g, v) => g + o.default.length(v), 0);
      }
      slice(g = 0, v = 1 / 0) {
        const E = [], F = new a.default(this.ops);
        let N = 0;
        for (; N < v && F.hasNext(); ) {
          let I;
          N < g ? I = F.next(g - N) : (I = F.next(v - N), E.push(I)), N += o.default.length(I);
        }
        return new d(E);
      }
      compose(g) {
        const v = new a.default(this.ops), E = new a.default(g.ops), F = [], N = E.peek();
        if (N != null && typeof N.retain == "number" && N.attributes == null) {
          let j = N.retain;
          for (; v.peekType() === "insert" && v.peekLength() <= j; )
            j -= v.peekLength(), F.push(v.next());
          N.retain - j > 0 && E.next(N.retain - j);
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
      concat(g) {
        const v = new d(this.ops.slice());
        return g.ops.length > 0 && (v.push(g.ops[0]), v.ops = v.ops.concat(g.ops.slice(1))), v;
      }
      diff(g, v) {
        if (this.ops === g.ops)
          return new d();
        const E = [this, g].map((W) => W.map((Y) => {
          if (Y.insert != null)
            return typeof Y.insert == "string" ? Y.insert : l;
          const G = W === g ? "on" : "with";
          throw new Error("diff() called " + G + " non-document");
        }).join("")), F = new d(), N = s(E[0], E[1], v, !0), I = new a.default(this.ops), j = new a.default(g.ops);
        return N.forEach((W) => {
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
      eachLine(g, v = `
`) {
        const E = new a.default(this.ops);
        let F = new d(), N = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const I = E.peek(), j = o.default.length(I) - E.peekLength(), W = typeof I.insert == "string" ? I.insert.indexOf(v, j) - j : -1;
          if (W < 0)
            F.push(E.next());
          else if (W > 0)
            F.push(E.next(W));
          else {
            if (g(F, E.next(1).attributes || {}, N) === !1)
              return;
            N += 1, F = new d();
          }
        }
        F.length() > 0 && g(F, {}, N);
      }
      invert(g) {
        const v = new d();
        return this.reduce((E, F) => {
          if (F.insert)
            v.delete(o.default.length(F));
          else {
            if (typeof F.retain == "number" && F.attributes == null)
              return v.retain(F.retain), E + F.retain;
            if (F.delete || typeof F.retain == "number") {
              const N = F.delete || F.retain;
              return g.slice(E, E + N).forEach((j) => {
                F.delete ? v.push(j) : F.retain && F.attributes && v.retain(o.default.length(j), r.default.invert(F.attributes, j.attributes));
              }), E + N;
            } else if (typeof F.retain == "object" && F.retain !== null) {
              const N = g.slice(E, E + 1), I = new a.default(N.ops).next(), [j, W, Y] = c(F.retain, I.insert), G = d.getHandler(j);
              return v.retain({ [j]: G.invert(W, Y) }, r.default.invert(F.attributes, I.attributes)), E + 1;
            }
          }
          return E;
        }, 0), v.chop();
      }
      transform(g, v = !1) {
        if (v = !!v, typeof g == "number")
          return this.transformPosition(g, v);
        const E = g, F = new a.default(this.ops), N = new a.default(E.ops), I = new d();
        for (; F.hasNext() || N.hasNext(); )
          if (F.peekType() === "insert" && (v || N.peekType() !== "insert"))
            I.retain(o.default.length(F.next()));
          else if (N.peekType() === "insert")
            I.push(N.next());
          else {
            const j = Math.min(F.peekLength(), N.peekLength()), W = F.next(j), Y = N.next(j);
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
      transformPosition(g, v = !1) {
        v = !!v;
        const E = new a.default(this.ops);
        let F = 0;
        for (; E.hasNext() && F <= g; ) {
          const N = E.peekLength(), I = E.peekType();
          if (E.next(), I === "delete") {
            g -= Math.min(N, g - F);
            continue;
          } else I === "insert" && (F < g || !v) && (g += N);
          F += N;
        }
        return g;
      }
    }
    d.Op = o.default, d.OpIterator = a.default, d.AttributeMap = r.default, d.handlers = {}, t.default = d, e.exports = d, e.exports.default = d;
  })(Gi, Gi.exports)), Gi.exports;
}
var Fe = Qv();
const it = /* @__PURE__ */ Lh(Fe);
class He extends ye {
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
let Ve = class extends br {
};
const t_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Dr(e) {
  return e.replace(/[&<>"']/g, (t) => t_[t]);
}
class le extends tl {
  static allowedChildren = [le, He, ye, Ve];
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
const Sc = 1;
class ee extends pi {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = Rh(this)), this.cache.delta;
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
    return this.cache.length == null && (this.cache.length = super.length() + Sc), this.cache.length;
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
    if (s && (t === 0 || t >= this.length() - Sc)) {
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
ee.allowedChildren = [He, le, ye, Ve];
class Te extends ye {
  attach() {
    super.attach(), this.attributes = new Ir(this.domNode);
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
Te.scope = ot.BLOCK_BLOT;
function Rh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.descendants(re).reduce((s, n) => n.length() === 0 ? s : s.insert(n.value(), we(n, {}, t)), new it()).insert(`
`, we(e));
}
function we(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return e == null || ("formats" in e && typeof e.formats == "function" && (t = {
    ...t,
    ...e.formats()
  }, s && delete t["code-token"]), e.parent == null || e.parent.statics.blotName === "scroll" || e.parent.statics.scope !== e.statics.scope) ? t : we(e.parent, t, s);
}
class De extends ye {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(t, s, n) {
    super(t, s), this.selection = n, this.textNode = document.createTextNode(De.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    n != null && (this.savedLength = De.CONTENTS.length, n.optimize(), n.formatAt(i, De.CONTENTS.length, t, s), this.savedLength = 0);
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
    } = this, a = o.data.split(De.CONTENTS).join("");
    o.data = De.CONTENTS;
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
      const c = (g, v) => s && g === s.domNode ? v : g === o ? n + v - 1 : i && g === i.domNode ? n + a.length + v : null, d = c(t.start.node, t.start.offset), h = c(t.end.node, t.end.offset);
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
        this.savedLength = De.CONTENTS.length, s.isolate(this.offset(s), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      s = s.parent;
    }
  }
  value() {
    return "";
  }
}
var Uo = { exports: {} }, kc;
function e_() {
  return kc || (kc = 1, (function(e) {
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
      var v = new i(d, h || l, g), E = s ? s + c : c;
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
      for (var g = 0, v = h.length, E = new Array(v); g < v; g++)
        E[g] = h[g].fn;
      return E;
    }, a.prototype.listenerCount = function(c) {
      var d = s ? s + c : c, h = this._events[d];
      return h ? h.fn ? 1 : h.length : 0;
    }, a.prototype.emit = function(c, d, h, g, v, E) {
      var F = s ? s + c : c;
      if (!this._events[F]) return !1;
      var N = this._events[F], I = arguments.length, j, W;
      if (N.fn) {
        switch (N.once && this.removeListener(c, N.fn, void 0, !0), I) {
          case 1:
            return N.fn.call(N.context), !0;
          case 2:
            return N.fn.call(N.context, d), !0;
          case 3:
            return N.fn.call(N.context, d, h), !0;
          case 4:
            return N.fn.call(N.context, d, h, g), !0;
          case 5:
            return N.fn.call(N.context, d, h, g, v), !0;
          case 6:
            return N.fn.call(N.context, d, h, g, v, E), !0;
        }
        for (W = 1, j = new Array(I - 1); W < I; W++)
          j[W - 1] = arguments[W];
        N.fn.apply(N.context, j);
      } else {
        var Y = N.length, G;
        for (W = 0; W < Y; W++)
          switch (N[W].once && this.removeListener(c, N[W].fn, void 0, !0), I) {
            case 1:
              N[W].fn.call(N[W].context);
              break;
            case 2:
              N[W].fn.call(N[W].context, d);
              break;
            case 3:
              N[W].fn.call(N[W].context, d, h);
              break;
            case 4:
              N[W].fn.call(N[W].context, d, h, g);
              break;
            default:
              if (!j) for (G = 1, j = new Array(I - 1); G < I; G++)
                j[G - 1] = arguments[G];
              N[W].fn.apply(N[W].context, j);
          }
      }
      return !0;
    }, a.prototype.on = function(c, d, h) {
      return r(this, c, d, h, !1);
    }, a.prototype.once = function(c, d, h) {
      return r(this, c, d, h, !0);
    }, a.prototype.removeListener = function(c, d, h, g) {
      var v = s ? s + c : c;
      if (!this._events[v]) return this;
      if (!d)
        return o(this, v), this;
      var E = this._events[v];
      if (E.fn)
        E.fn === d && (!g || E.once) && (!h || E.context === h) && o(this, v);
      else {
        for (var F = 0, N = [], I = E.length; F < I; F++)
          (E[F].fn !== d || g && !E[F].once || h && E[F].context !== h) && N.push(E[F]);
        N.length ? this._events[v] = N.length === 1 ? N[0] : N : o(this, v);
      }
      return this;
    }, a.prototype.removeAllListeners = function(c) {
      var d;
      return c ? (d = s ? s + c : c, this._events[d] && o(this, d)) : (this._events = new n(), this._eventsCount = 0), this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = s, a.EventEmitter = a, e.exports = a;
  })(Uo)), Uo.exports;
}
var s_ = e_();
const n_ = /* @__PURE__ */ Lh(s_), ya = /* @__PURE__ */ new WeakMap(), va = ["error", "warn", "log", "info"];
let _a = "warn";
function Mh(e) {
  if (_a && va.indexOf(e) <= va.indexOf(_a)) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    console[e](...s);
  }
}
function _s(e) {
  return va.reduce((t, s) => (t[s] = Mh.bind(console, s, e), t), {});
}
_s.level = (e) => {
  _a = e;
};
Mh.level = _s.level;
const Ho = _s("quill:events"), i_ = ["selectionchange", "mousedown", "mouseup", "click"];
i_.forEach((e) => {
  document.addEventListener(e, function() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
      const r = ya.get(i);
      r && r.emitter && r.emitter.handleDOM(...s);
    });
  });
});
class st extends n_ {
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
    super(), this.domListeners = {}, this.on("error", Ho.error);
  }
  emit() {
    for (var t = arguments.length, s = new Array(t), n = 0; n < t; n++)
      s[n] = arguments[n];
    return Ho.log.call(Ho, ...s), super.emit(...s);
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
const Wo = _s("quill:selection");
class Ys {
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = s;
  }
}
class r_ {
  constructor(t, s) {
    this.emitter = s, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Ys(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
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
        const [h] = this.scroll.line(t), [g] = this.scroll.line(t + 1);
        h === g && (r = d, o = 0);
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
    return Wo.info("getNativeRange", n), n;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const s = this.getNativeRange();
    return s == null ? [null, null] : [this.normalizedToRange(s), s];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && zo(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const s = [[t.start.node, t.start.offset]];
    t.native.collapsed || s.push([t.end.node, t.end.offset]);
    const n = s.map((o) => {
      const [a, l] = o, c = this.scroll.find(a, !0), d = c.offset(this.scroll);
      return l === 0 ? d : c instanceof re ? d + c.index(a, l) : d + c.length();
    }), i = Math.min(Math.max(...n), this.scroll.length() - 1), r = Math.min(i, ...n);
    return new Ys(r, i - r);
  }
  normalizeNative(t) {
    if (!zo(this.root, t.startContainer) || !t.collapsed && !zo(this.root, t.endContainer))
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
    if (Wo.info("setNativeRange", t, s, n, i), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
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
    if (typeof s == "string" && (n = s, s = !1), Wo.info("setRange", t), t != null) {
      const i = this.rangeToNative(t);
      this.setNativeRange(...i, s);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st.sources.USER;
    const s = this.lastRange, [n, i] = this.getRange();
    if (this.lastRange = n, this.lastNative = i, this.lastRange != null && (this.savedRange = this.lastRange), !Qa(s, this.lastRange)) {
      if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const r = [st.events.SELECTION_CHANGE, Fn(this.lastRange), Fn(s), t];
      this.emitter.emit(st.events.EDITOR_CHANGE, ...r), t !== st.sources.SILENT && this.emitter.emit(...r);
    }
  }
}
function zo(e, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return e.contains(t);
}
const o_ = /^[ -~]*$/;
class a_ {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let s = this.scroll.length();
    this.scroll.batchStart();
    const n = Lc(t), i = new it();
    return c_(n.ops.slice()).reduce((o, a) => {
      const l = Fe.Op.length(a);
      let c = a.attributes || {}, d = !1, h = !1;
      if (a.insert != null) {
        if (i.retain(l), typeof a.insert == "string") {
          const E = a.insert;
          h = !E.endsWith(`
`) && (s <= o || !!this.scroll.descendant(Te, o)[0]), this.scroll.insertAt(o, E);
          const [F, N] = this.scroll.line(o);
          let I = xs({}, we(F));
          if (F instanceof ee) {
            const [j] = F.descendant(re, N);
            j && (I = xs(I, we(j)));
          }
          c = Fe.AttributeMap.diff(I, c) || {};
        } else if (typeof a.insert == "object") {
          const E = Object.keys(a.insert)[0];
          if (E == null) return o;
          const F = this.scroll.query(E, ot.INLINE) != null;
          if (F)
            (s <= o || this.scroll.descendant(Te, o)[0]) && (h = !0);
          else if (o > 0) {
            const [N, I] = this.scroll.descendant(re, o - 1);
            N instanceof Ve ? N.value()[I] !== `
` && (d = !0) : N instanceof ye && N.statics.scope === ot.INLINE_BLOT && (d = !0);
          }
          if (this.scroll.insertAt(o, E, a.insert[E]), F) {
            const [N] = this.scroll.descendant(re, o);
            if (N) {
              const I = xs({}, we(N));
              c = Fe.AttributeMap.diff(I, c) || {};
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
      const g = d ? 1 : 0, v = h ? 1 : 0;
      return s += g + v, i.retain(g), i.delete(v), o + l + g + v;
    }, 0), i.reduce((o, a) => typeof a.delete == "number" ? (this.scroll.deleteAt(o, a.delete), o) : o + Fe.Op.length(a), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
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
    const i = new it().retain(t).retain(s, Fn(n));
    return this.update(i);
  }
  formatText(t, s) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((r) => {
      this.scroll.formatAt(t, s, r, n[r]);
    });
    const i = new it().retain(t).retain(s, Fn(n));
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
      let c = we(l);
      for (; Object.keys(c).length > 0; ) {
        const d = a.shift();
        if (d == null) return c;
        c = l_(we(d), c);
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
      return n.length() >= i + s && !(i === 0 && s === r) ? gi(n, i, s, !0) : gi(this.scroll, t, s, !0);
    }
    return "";
  }
  getText(t, s) {
    return this.getContents(t, s).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(t, s) {
    const n = Lc(s), i = new it().retain(t).concat(n);
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
    }), this.update(new it().retain(t).insert(s, Fn(n)));
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
    s[0].target.data.match(o_) && this.scroll.find(s[0].target)) {
      const r = this.scroll.find(s[0].target), o = we(r), a = r.offset(this.scroll), l = s[0].oldValue.replace(De.CONTENTS, ""), c = new it().insert(l), d = new it().insert(r.value()), h = n && {
        oldRange: Ic(n.oldRange, -a),
        newRange: Ic(n.newRange, -a)
      };
      t = new it().retain(a).concat(c.diff(d, h)).reduce((v, E) => E.insert ? v.insert(E.insert, o) : v.push(E), new it()), this.delta = i.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !Qa(i.compose(t), this.delta)) && (t = i.diff(this.delta, n));
    return t;
  }
}
function En(e, t, s) {
  if (e.length === 0) {
    const [v] = Ko(s.pop());
    return t <= 0 ? `</li></${v}>` : `</li></${v}>${En([], t - 1, s)}`;
  }
  const [{
    child: n,
    offset: i,
    length: r,
    indent: o,
    type: a
  }, ...l] = e, [c, d] = Ko(a);
  if (o > t)
    return s.push(a), o === t + 1 ? `<${c}><li${d}>${gi(n, i, r)}${En(l, o, s)}` : `<${c}><li>${En(e, t + 1, s)}`;
  const h = s[s.length - 1];
  if (o === t && a === h)
    return `</li><li${d}>${gi(n, i, r)}${En(l, o, s)}`;
  const [g] = Ko(s.pop());
  return `</li></${g}>${En(e, t - 1, s)}`;
}
function gi(e, t, s) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in e && typeof e.html == "function")
    return e.html(t, s);
  if (e instanceof Ve)
    return Dr(e.value().slice(t, t + s)).replaceAll(" ", "&nbsp;");
  if (e instanceof Pe) {
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
      }), En(c, -1, []);
    }
    const i = [];
    if (e.children.forEachAt(t, s, (c, d, h) => {
      i.push(gi(c, d, h));
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
function l_(e, t) {
  return Object.keys(t).reduce((s, n) => {
    if (e[n] == null) return s;
    const i = t[n];
    return i === e[n] ? s[n] = i : Array.isArray(i) ? i.indexOf(e[n]) < 0 ? s[n] = i.concat([e[n]]) : s[n] = i : s[n] = [i, e[n]], s;
  }, {});
}
function Ko(e) {
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
function Lc(e) {
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
function Ic(e, t) {
  let {
    index: s,
    length: n
  } = e;
  return new Ys(s + t, n);
}
function c_(e) {
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
const Ji = "\uFEFF";
class sl extends ye {
  constructor(t, s) {
    super(t, s), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(Ji), this.rightGuard = document.createTextNode(Ji), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, s) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, s);
  }
  restore(t) {
    let s = null, n;
    const i = t.data.split(Ji).join("");
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
    return t.data = Ji, s;
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
class u_ {
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
    s && !(s instanceof sl) && (this.emitter.emit(st.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(st.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(st.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(st.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
class Vn {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: Vn
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
const h_ = (e) => e.parentElement || e.getRootNode().host || null, d_ = (e) => {
  const t = e.getBoundingClientRect(), s = "offsetWidth" in e && Math.abs(t.width) / e.offsetWidth || 1, n = "offsetHeight" in e && Math.abs(t.height) / e.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + e.clientWidth * s,
    bottom: t.top + e.clientHeight * n,
    left: t.left
  };
}, Qi = (e) => {
  const t = parseInt(e, 10);
  return Number.isNaN(t) ? 0 : t;
}, $c = (e, t, s, n, i, r) => e < s && t > n ? 0 : e < s ? -(s - e + i) : t > n ? t - e > n - s ? e + i - s : t - n + r : 0, f_ = (e, t) => {
  const s = e.ownerDocument;
  let n = t, i = e;
  for (; i; ) {
    const r = i === s.body, o = r ? {
      top: 0,
      right: window.visualViewport?.width ?? s.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? s.documentElement.clientHeight,
      left: 0
    } : d_(i), a = getComputedStyle(i), l = $c(n.left, n.right, o.left, o.right, Qi(a.scrollPaddingLeft), Qi(a.scrollPaddingRight)), c = $c(n.top, n.bottom, o.top, o.bottom, Qi(a.scrollPaddingTop), Qi(a.scrollPaddingBottom));
    if (l || c)
      if (r)
        s.defaultView?.scrollBy(l, c);
      else {
        const {
          scrollLeft: d,
          scrollTop: h
        } = i;
        c && (i.scrollTop += c), l && (i.scrollLeft += l);
        const g = i.scrollLeft - d, v = i.scrollTop - h;
        n = {
          left: n.left - g,
          top: n.top - v,
          right: n.right - g,
          bottom: n.bottom - v
        };
      }
    i = r || a.position === "fixed" ? null : h_(i);
  }
}, p_ = 100, g_ = ["block", "break", "cursor", "inline", "scroll", "text"], m_ = (e, t, s) => {
  const n = new Dn();
  return g_.forEach((i) => {
    const r = t.query(i);
    r && n.register(r);
  }), e.forEach((i) => {
    let r = t.query(i);
    r || s.error(`Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; r; )
      if (n.register(r), r = "blotName" in r ? r.requiredContainer ?? null : null, o += 1, o > p_) {
        s.error(`Cycle detected in registering blot requiredContainer: "${i}"`);
        break;
      }
  }), n;
}, Cn = _s("quill"), tr = new Dn();
Pe.uiClass = "ql-ui";
class D {
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
    registry: tr,
    theme: "default"
  };
  static events = st.events;
  static sources = st.sources;
  static version = "2.0.3";
  static imports = {
    delta: it,
    parchment: Yv,
    "core/module": es,
    "core/theme": Vn
  };
  static debug(t) {
    t === !0 && (t = "log"), _s.level(t);
  }
  static find(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return ya.get(t) || tr.find(t, s);
  }
  static import(t) {
    return this.imports[t] == null && Cn.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in t ? t.attrName : t.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, t, s) : Object.keys(t).forEach((i) => {
        this.register(i, t[i], s);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], s = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !n && Cn.warn(`Overwriting ${t} with`, s), this.imports[t] = s, (t.startsWith("blots/") || t.startsWith("formats/")) && s && typeof s != "boolean" && s.blotName !== "abstract" && tr.register(s), typeof s.register == "function" && s.register(tr);
    }
  }
  constructor(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = b_(t, s), this.container = this.options.container, this.container == null) {
      Cn.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && D.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", ya.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new st();
    const i = el.blotName, r = this.options.registry.query(i);
    if (!r || !("blotName" in r))
      throw new Error(`Cannot initialize Quill without "${i}" blot`);
    if (this.scroll = new r(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new a_(this.scroll), this.selection = new r_(this.scroll, this.emitter), this.composition = new u_(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(st.events.EDITOR_CHANGE, (o) => {
      o === st.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(st.events.SCROLL_UPDATE, (o, a) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      Ie.call(this, () => this.editor.update(null, a, d), o);
    }), this.emitter.on(st.events.SCROLL_EMBED_UPDATE, (o, a) => {
      const l = this.selection.lastRange, [c] = this.selection.getRange(), d = l && c ? {
        oldRange: l,
        newRange: c
      } : void 0;
      Ie.call(this, () => {
        const h = new it().retain(o.offset(this)).retain({
          [o.statics.blotName]: a
        });
        return this.editor.update(h, [], d);
      }, D.sources.USER);
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
    return [t, s, , n] = ls(t, s, n), Ie.call(this, () => this.editor.deleteText(t, s), n, t, -1 * s);
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
    return Ie.call(this, () => {
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
    ), Ie.call(this, () => this.editor.formatLine(t, s, o), r, t, 0);
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
    ), Ie.call(this, () => this.editor.formatText(t, s, o), r, t, 0);
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
    return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) && this.focus(), this.update(), this.selection.getRange()[0];
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
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : D.sources.API;
    return Ie.call(this, () => this.editor.insertEmbed(t, s, n), i, t);
  }
  insertText(t, s, n, i, r) {
    let o;
    return [t, , o, r] = ls(t, 0, n, i, r), Ie.call(this, () => this.editor.insertText(t, s, o), r, t, s.length);
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
    return [t, s, , n] = ls(t, s, n), Ie.call(this, () => this.editor.removeFormat(t, s), n, t);
  }
  scrollRectIntoView(t) {
    f_(this.root, t);
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
    return Ie.call(this, () => {
      t = new it(t);
      const n = this.getLength(), i = this.editor.deleteText(0, n), r = this.editor.insertContents(0, t), o = this.editor.deleteText(this.getLength() - 1, 1);
      return i.compose(r).compose(o);
    }, s);
  }
  setSelection(t, s, n) {
    t == null ? this.selection.setRange(null, s || D.sources.API) : ([t, s, , n] = ls(t, s, n), this.selection.setRange(new Ys(Math.max(0, t), s), n), n !== st.sources.SILENT && this.scrollSelectionIntoView());
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
    return Ie.call(this, () => (t = new it(t), this.editor.applyDelta(t)), s, !0);
  }
}
function Dc(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function Go(e) {
  return Object.entries(e ?? {}).reduce((t, s) => {
    let [n, i] = s;
    return {
      ...t,
      [n]: i === !0 ? {} : i
    };
  }, {});
}
function Rc(e) {
  return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
}
function b_(e, t) {
  const s = Dc(e);
  if (!s)
    throw new Error("Invalid Quill container");
  const i = !t.theme || t.theme === D.DEFAULTS.theme ? Vn : D.import(`themes/${t.theme}`);
  if (!i)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: r,
    ...o
  } = D.DEFAULTS, {
    modules: a,
    ...l
  } = i.DEFAULTS;
  let c = Go(t.modules);
  c != null && c.toolbar && c.toolbar.constructor !== Object && (c = {
    ...c,
    toolbar: {
      container: c.toolbar
    }
  });
  const d = xs({}, Go(r), Go(a), c), h = {
    ...o,
    ...Rc(l),
    ...Rc(t)
  };
  let g = t.registry;
  return g ? t.formats && Cn.warn('Ignoring "formats" option because "registry" is specified') : g = t.formats ? m_(t.formats, h.registry, Cn) : h.registry, {
    ...h,
    registry: g,
    container: s,
    theme: i,
    modules: Object.entries(d).reduce((v, E) => {
      let [F, N] = E;
      if (!N) return v;
      const I = D.import(`modules/${F}`);
      return I == null ? (Cn.error(`Cannot load ${F} module. Are you sure you registered it?`), v) : {
        ...v,
        // @ts-expect-error
        [F]: xs({}, I.DEFAULTS || {}, N)
      };
    }, {}),
    bounds: Dc(h.bounds)
  };
}
function Ie(e, t, s, n) {
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
  )) : [r, o] = [e.index, e.index + e.length].map((a) => a < t || a === t && n === st.sources.USER ? a : i >= 0 ? a + i : Math.max(t, a + i)), new Ys(r, o - r);
}
class nn extends $r {
}
function Bc(e) {
  return e instanceof ee || e instanceof Te;
}
function qc(e) {
  return typeof e.updateContent == "function";
}
class y_ extends el {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = ee;
  static allowedChildren = [ee, Te, nn];
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
      if (n instanceof Te || r instanceof Te) {
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
      const l = r.type === "block" && (r.delta.length() === 0 || !this.descendant(Te, t)[0] && t < this.length()), c = r.type === "block" ? r.delta : new it().insert({
        [r.key]: r.value
      });
      Yo(this, t, c);
      const d = r.type === "block" ? 1 : 0, h = t + c.length() + d;
      l && this.insertAt(h - 1, `
`);
      const g = we(this.line(t)[0]), v = Fe.AttributeMap.diff(g, r.attributes) || {};
      Object.keys(v).forEach((E) => {
        this.formatAt(h - 1, 1, E, v[E]);
      }), t = h;
    }
    let [o, a] = this.children.find(t);
    if (n.length && (o && (o = o.split(a), a = 0), n.forEach((l) => {
      if (l.type === "block") {
        const c = this.createBlock(l.attributes, o || void 0);
        Yo(c, 0, l.delta);
      } else {
        const c = this.create(l.key, l.value);
        this.insertBefore(c, o || void 0), Object.keys(l.attributes).forEach((d) => {
          c.format(d, l.attributes[d]);
        });
      }
    })), i.type === "block" && i.delta.length()) {
      const l = o ? o.offset(o.scroll) + a : this.length();
      Yo(this, l, i.delta);
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
    return t === this.length() ? this.line(t - 1) : this.descendant(Bc, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (i, r, o) => {
      let a = [], l = o;
      return i.children.forEachAt(r, o, (c, d, h) => {
        Bc(c) ? a.push(c) : c instanceof $r && (a = a.concat(n(c, d, l))), l -= h;
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
      return r && !qc(r);
    }), t.length > 0 && this.emitter.emit(st.events.SCROLL_BEFORE_UPDATE, s, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(st.events.SCROLL_UPDATE, s, t);
  }
  updateEmbedAt(t, s, n) {
    const [i] = this.descendant((r) => r instanceof Te, t);
    i && i.statics.blotName === s && qc(i) && i.updateContent(n);
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
function Yo(e, t, s) {
  s.reduce((n, i) => {
    const r = Fe.Op.length(i);
    let o = i.attributes || {};
    if (i.insert != null) {
      if (typeof i.insert == "string") {
        const a = i.insert;
        e.insertAt(n, a);
        const [l] = e.descendant(re, n), c = we(l);
        o = Fe.AttributeMap.diff(c, o) || {};
      } else if (typeof i.insert == "object") {
        const a = Object.keys(i.insert)[0];
        if (a == null) return n;
        if (e.insertAt(n, a, i.insert[a]), e.scroll.query(a, ot.INLINE) != null) {
          const [c] = e.descendant(re, n), d = we(c);
          o = Fe.AttributeMap.diff(d, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((a) => {
      e.formatAt(n, r, a, o[a]);
    }), n + r;
  }, t);
}
const nl = {
  scope: ot.BLOCK,
  whitelist: ["right", "center", "justify"]
}, v_ = new Qe("align", "align", nl), Bh = new Ue("align", "ql-align", nl), qh = new Rs("align", "text-align", nl);
class Ph extends Rs {
  value(t) {
    let s = super.value(t);
    return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${s.split(",").map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2)).join("")}`) : s;
  }
}
const __ = new Ue("color", "ql-color", {
  scope: ot.INLINE
}), il = new Ph("color", "color", {
  scope: ot.INLINE
}), E_ = new Ue("background", "ql-bg", {
  scope: ot.INLINE
}), rl = new Ph("background", "background-color", {
  scope: ot.INLINE
});
class rn extends nn {
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
${Dr(this.code(t, s))}
</pre>`;
  }
}
class he extends ee {
  static TAB = "  ";
  static register() {
    D.register(rn);
  }
}
class ol extends le {
}
ol.blotName = "code";
ol.tagName = "CODE";
he.blotName = "code-block";
he.className = "ql-code-block";
he.tagName = "DIV";
rn.blotName = "code-block-container";
rn.className = "ql-code-block-container";
rn.tagName = "DIV";
rn.allowedChildren = [he];
he.allowedChildren = [Ve, He, De];
he.requiredContainer = rn;
const al = {
  scope: ot.BLOCK,
  whitelist: ["rtl"]
}, Vh = new Qe("direction", "dir", al), jh = new Ue("direction", "ql-direction", al), Uh = new Rs("direction", "direction", al), Hh = {
  scope: ot.INLINE,
  whitelist: ["serif", "monospace"]
}, Wh = new Ue("font", "ql-font", Hh);
class w_ extends Rs {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const zh = new w_("font", "font-family", Hh), Kh = new Ue("size", "ql-size", {
  scope: ot.INLINE,
  whitelist: ["small", "large", "huge"]
}), Gh = new Rs("size", "font-size", {
  scope: ot.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), A_ = _s("quill:keyboard"), T_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
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
    const i = x_(t);
    if (i == null) {
      A_.warn("Attempted to add invalid keyboard binding", i);
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
      const r = D.find(t.target, !0);
      if (r && r.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [a, l] = this.quill.getLine(o.index), [c, d] = this.quill.getLeaf(o.index), [h, g] = o.length === 0 ? [c, d] : this.quill.getLeaf(o.index + o.length), v = c instanceof br ? c.value().slice(0, d) : "", E = h instanceof br ? h.value().slice(g) : "", F = {
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
        } else if (typeof I.format == "object" && !Object.keys(I.format).every((j) => I.format[j] === !0 ? F.format[j] != null : I.format[j] === !1 ? F.format[j] == null : Qa(I.format[j], F.format[j])))
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
        if (i = Fe.AttributeMap.diff(c, d) || {}, Object.keys(i).length > 0) {
          const h = new it().retain(t.index + r.length() - 2).retain(1, i);
          o = o.compose(h);
        }
      }
    }
    this.quill.updateContents(o, D.sources.USER), this.quill.focus();
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
        i = Fe.AttributeMap.diff(l, c) || {}, Object.keys(i).length > 0 && (o = o.retain(a.length() - 1).retain(1, i));
      }
    }
    this.quill.updateContents(o, D.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    ll({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, s) {
    const n = Object.keys(s.format).reduce((r, o) => (this.quill.scroll.query(o, ot.BLOCK) && !Array.isArray(s.format[o]) && (r[o] = s.format[o]), r), {}), i = new it().retain(t.index).delete(t.length).insert(`
`, n);
    this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(t.index + 1, D.sources.SILENT), this.quill.focus();
  }
}
const F_ = {
  bindings: {
    bold: Xo("bold"),
    italic: Xo("italic"),
    underline: Xo("underline"),
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
    "indent code-block": Pc(!0),
    "outdent code-block": Pc(!1),
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
        const s = new it().retain(e.index).delete(e.length).insert("	");
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
        }, i = new it().retain(e.index).insert(`
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
        const [s, n] = this.quill.getLine(e.index), i = new it().retain(e.index).insert(`
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
          const [s, n, i, r] = t.getTable(e), o = C_(s, n, i, r);
          if (o == null) return;
          let a = s.offset();
          if (o < 0) {
            const l = new it().retain(a).insert(`
`);
            this.quill.updateContents(l, D.sources.USER), this.quill.setSelection(e.index + 1, e.length, D.sources.SILENT);
          } else if (o > 0) {
            a += s.length();
            const l = new it().retain(a).insert(`
`);
            this.quill.updateContents(l, D.sources.USER), this.quill.setSelection(a, D.sources.USER);
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
        const o = new it().retain(e.index - i).delete(s + 1).retain(n.length() - 2 - i).retain(1, {
          list: r
        });
        return this.quill.updateContents(o, D.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - s, D.sources.SILENT), !1;
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
            return this.quill.updateContents(r, D.sources.USER), this.quill.setSelection(e.index - 1, D.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": er("ArrowLeft", !1),
    "embed left shift": er("ArrowLeft", !0),
    "embed right": er("ArrowRight", !1),
    "embed right shift": er("ArrowRight", !0),
    "table down": Vc(!1),
    "table up": Vc(!0)
  }
};
Rr.DEFAULTS = F_;
function Pc(e) {
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
      const o = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: a,
        length: l
      } = t;
      o.forEach((c, d) => {
        e ? (c.insertAt(0, r), d === 0 ? a += r.length : l += r.length) : c.domNode.textContent.startsWith(r) && (c.deleteAt(0, r.length), d === 0 ? a -= r.length : l -= r.length);
      }), this.quill.update(D.sources.USER), this.quill.setSelection(a, l, D.sources.SILENT);
    }
  };
}
function er(e, t) {
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
function Xo(e) {
  return {
    key: e[0],
    shortKey: !0,
    handler(t, s) {
      this.quill.format(e, !s.format[e], D.sources.USER);
    }
  };
}
function Vc(e) {
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
          this.quill.setSelection(l, 0, D.sources.USER);
        }
      } else {
        const o = i.table()[n];
        o != null && (e ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, D.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, D.sources.USER));
      }
      return !1;
    }
  };
}
function x_(e) {
  if (typeof e == "string" || typeof e == "number")
    e = {
      key: e
    };
  else if (typeof e == "object")
    e = Fn(e);
  else
    return null;
  return e.shortKey && (e[T_] = e.shortKey, delete e.shortKey), e;
}
function ll(e) {
  let {
    quill: t,
    range: s
  } = e;
  const n = t.getLines(s);
  let i = {};
  if (n.length > 1) {
    const r = n[0].formats(), o = n[n.length - 1].formats();
    i = Fe.AttributeMap.diff(o, r) || {};
  }
  t.deleteText(s, D.sources.USER), Object.keys(i).length > 0 && t.formatLine(s.index, 1, i, D.sources.USER), t.setSelection(s.index, D.sources.SILENT);
}
function C_(e, t, s, n) {
  return t.prev == null && t.next == null ? s.prev == null && s.next == null ? n === 0 ? -1 : 1 : s.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const O_ = /font-weight:\s*normal/, N_ = ["P", "OL", "UL"], jc = (e) => e && N_.includes(e.tagName), S_ = (e) => {
  Array.from(e.querySelectorAll("br")).filter((t) => jc(t.previousElementSibling) && jc(t.nextElementSibling)).forEach((t) => {
    t.parentNode?.removeChild(t);
  });
}, k_ = (e) => {
  Array.from(e.querySelectorAll('b[style*="font-weight"]')).filter((t) => t.getAttribute("style")?.match(O_)).forEach((t) => {
    const s = e.createDocumentFragment();
    s.append(...t.childNodes), t.parentNode?.replaceChild(s, t);
  });
};
function L_(e) {
  e.querySelector('[id^="docs-internal-guid-"]') && (k_(e), S_(e));
}
const I_ = /\bmso-list:[^;]*ignore/i, $_ = /\bmso-list:[^;]*\bl(\d+)/i, D_ = /\bmso-list:[^;]*\blevel(\d+)/i, R_ = (e, t) => {
  const s = e.getAttribute("style"), n = s?.match($_);
  if (!n)
    return null;
  const i = Number(n[1]), r = s?.match(D_), o = r ? Number(r[1]) : 1, a = new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), l = t.match(a), c = l && l[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: i,
    indent: o,
    type: c,
    element: e
  };
}, M_ = (e) => {
  const t = Array.from(e.querySelectorAll("[style*=mso-list]")), s = [], n = [];
  t.forEach((o) => {
    (o.getAttribute("style") || "").match(I_) ? s.push(o) : n.push(o);
  }), s.forEach((o) => o.parentNode?.removeChild(o));
  const i = e.documentElement.innerHTML, r = n.map((o) => R_(o, i)).filter((o) => o);
  for (; r.length; ) {
    const o = [];
    let a = r.shift();
    for (; a; )
      o.push(a), a = r.length && r[0]?.element === a.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      r[0].id === a.id ? r.shift() : null;
    const l = document.createElement("ul");
    o.forEach((h) => {
      const g = document.createElement("li");
      g.setAttribute("data-list", h.type), h.indent > 1 && g.setAttribute("class", `ql-indent-${h.indent - 1}`), g.innerHTML = h.element.innerHTML, l.appendChild(g);
    });
    const c = o[0]?.element, {
      parentNode: d
    } = c ?? {};
    c && d?.replaceChild(l, c), o.slice(1).forEach((h) => {
      let {
        element: g
      } = h;
      d?.removeChild(g);
    });
  }
};
function B_(e) {
  e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && M_(e);
}
const q_ = [B_, L_], P_ = (e) => {
  e.documentElement && q_.forEach((t) => {
    t(e);
  });
}, V_ = _s("quill:clipboard"), j_ = [[Node.TEXT_NODE, eE], [Node.TEXT_NODE, Hc], ["br", G_], [Node.ELEMENT_NODE, Hc], [Node.ELEMENT_NODE, K_], [Node.ELEMENT_NODE, z_], [Node.ELEMENT_NODE, Q_], ["li", Z_], ["ol, ul", J_], ["pre", Y_], ["tr", tE], ["b", Zo("bold")], ["i", Zo("italic")], ["strike", Zo("strike")], ["style", X_]], U_ = [v_, Vh].reduce((e, t) => (e[t.keyName] = t, e), {}), Uc = [qh, rl, il, Uh, zh, Gh].reduce((e, t) => (e[t.keyName] = t, e), {});
class H_ extends es {
  static DEFAULTS = {
    matchers: []
  };
  constructor(t, s) {
    super(t, s), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], j_.concat(this.options.matchers ?? []).forEach((n) => {
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
    return Ai(r, `
`) && (r.ops[r.ops.length - 1].attributes == null || i.table) ? r.compose(new it().retain(r.length() - 1).delete(1)) : r;
  }
  normalizeHTML(t) {
    P_(t);
  }
  convertHTML(t) {
    const s = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(s);
    const n = s.body, i = /* @__PURE__ */ new WeakMap(), [r, o] = this.prepareMatching(n, i);
    return cl(this.quill.scroll, n, r, o, i);
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
      this.quill.updateContents(new it().retain(t).concat(i), n), this.quill.setSelection(t + i.length(), D.sources.SILENT);
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
    t.clipboardData?.setData("text/plain", r), t.clipboardData?.setData("text/html", i), s && ll({
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
    V_.log("onPaste", o, {
      text: n,
      html: i
    });
    const a = new it().retain(t.index).delete(t.length).concat(o);
    this.quill.updateContents(a, D.sources.USER), this.quill.setSelection(a.length() - t.length, D.sources.SILENT), this.quill.scrollSelectionIntoView();
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
function on(e, t, s, n) {
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
function Ai(e, t) {
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
  return s && s.prototype instanceof ye ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(e.tagName.toLowerCase());
}
function W_(e, t) {
  return e.previousElementSibling && e.nextElementSibling && !Fs(e.previousElementSibling, t) && !Fs(e.nextElementSibling, t);
}
const sr = /* @__PURE__ */ new WeakMap();
function Yh(e) {
  return e == null ? !1 : (sr.has(e) || (e.tagName === "PRE" ? sr.set(e, !0) : sr.set(e, Yh(e.parentNode))), sr.get(e));
}
function cl(e, t, s, n, i) {
  return t.nodeType === t.TEXT_NODE ? n.reduce((r, o) => o(t, r, e), new it()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((r, o) => {
    let a = cl(e, o, s, n, i);
    return o.nodeType === t.ELEMENT_NODE && (a = s.reduce((l, c) => c(o, l, e), a), a = (i.get(o) || []).reduce((l, c) => c(o, l, e), a)), r.concat(a);
  }, new it()) : new it();
}
function Zo(e) {
  return (t, s, n) => on(s, e, !0, n);
}
function z_(e, t, s) {
  const n = Qe.keys(e), i = Ue.keys(e), r = Rs.keys(e), o = {};
  return n.concat(i).concat(r).forEach((a) => {
    let l = s.query(a, ot.ATTRIBUTE);
    l != null && (o[l.attrName] = l.value(e), o[l.attrName]) || (l = U_[a], l != null && (l.attrName === a || l.keyName === a) && (o[l.attrName] = l.value(e) || void 0), l = Uc[a], l != null && (l.attrName === a || l.keyName === a) && (l = Uc[a], o[l.attrName] = l.value(e) || void 0));
  }), Object.entries(o).reduce((a, l) => {
    let [c, d] = l;
    return on(a, c, d, s);
  }, t);
}
function K_(e, t, s) {
  const n = s.query(e);
  if (n == null) return t;
  if (n.prototype instanceof ye) {
    const i = {}, r = n.value(e);
    if (r != null)
      return i[n.blotName] = r, new it().insert(i, n.formats(e, s));
  } else if (n.prototype instanceof pi && !Ai(t, `
`) && t.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return on(t, n.blotName, n.formats(e, s), s);
  return t;
}
function G_(e, t) {
  return Ai(t, `
`) || t.insert(`
`), t;
}
function Y_(e, t, s) {
  const n = s.query("code-block"), i = n && "formats" in n && typeof n.formats == "function" ? n.formats(e, s) : !0;
  return on(t, "code-block", i, s);
}
function X_() {
  return new it();
}
function Z_(e, t, s) {
  const n = s.query(e);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !Ai(t, `
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
function J_(e, t, s) {
  const n = e;
  let i = n.tagName === "OL" ? "ordered" : "bullet";
  const r = n.getAttribute("data-checked");
  return r && (i = r === "true" ? "checked" : "unchecked"), on(t, "list", i, s);
}
function Hc(e, t, s) {
  if (!Ai(t, `
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
        if (i && i.prototype instanceof Te)
          return t.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return t;
}
function Q_(e, t, s) {
  const n = {}, i = e.style || {};
  return i.fontStyle === "italic" && (n.italic = !0), i.textDecoration === "underline" && (n.underline = !0), i.textDecoration === "line-through" && (n.strike = !0), (i.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(i.fontWeight, 10) >= 700) && (n.bold = !0), t = Object.entries(n).reduce((r, o) => {
    let [a, l] = o;
    return on(r, a, l, s);
  }, t), parseFloat(i.textIndent || 0) > 0 ? new it().insert("	").concat(t) : t;
}
function tE(e, t, s) {
  const n = e.parentElement?.tagName === "TABLE" ? e.parentElement : e.parentElement?.parentElement;
  if (n != null) {
    const r = Array.from(n.querySelectorAll("tr")).indexOf(e) + 1;
    return on(t, "table", r, s);
  }
  return t;
}
function eE(e, t, s) {
  let n = e.data;
  if (e.parentElement?.tagName === "O:P")
    return t.insert(n.trim());
  if (!Yh(e)) {
    if (n.trim().length === 0 && n.includes(`
`) && !W_(e, s))
      return t;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (e.previousSibling == null && e.parentElement != null && Fs(e.parentElement, s) || e.previousSibling instanceof Element && Fs(e.previousSibling, s)) && (n = n.replace(/^ /, "")), (e.nextSibling == null && e.parentElement != null && Fs(e.parentElement, s) || e.nextSibling instanceof Element && Fs(e.nextSibling, s)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return t.insert(n);
}
class sE extends es {
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
    super(t, s), this.quill.on(D.events.EDITOR_CHANGE, (n, i, r, o) => {
      n === D.events.SELECTION_CHANGE ? i && o !== D.sources.SILENT && (this.currentRange = i) : n === D.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === D.sources.USER ? this.record(i, r) : this.transform(i)), this.currentRange = Ea(this.currentRange, i));
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
      range: Ea(n.range, r)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(n.delta, D.sources.USER), this.ignoreChange = !1, this.restoreSelection(n);
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
    Wc(this.stack.undo, t), Wc(this.stack.redo, t);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(t) {
    if (t.range)
      this.quill.setSelection(t.range, D.sources.USER);
    else {
      const s = iE(this.quill.scroll, t.delta);
      this.quill.setSelection(s, D.sources.USER);
    }
  }
}
function Wc(e, t) {
  let s = t;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const i = e[n];
    e[n] = {
      delta: s.transform(i.delta, !0),
      range: i.range && Ea(i.range, s)
    }, s = i.delta.transform(s), e[n].delta.length() === 0 && e.splice(n, 1);
  }
}
function nE(e, t) {
  const s = t.ops[t.ops.length - 1];
  return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some((n) => e.query(n, ot.BLOCK) != null) : !1;
}
function iE(e, t) {
  const s = t.reduce((i, r) => i + (r.delete || 0), 0);
  let n = t.length() - s;
  return nE(e, t) && (n -= 1), n;
}
function Ea(e, t) {
  if (!e) return e;
  const s = t.transformPosition(e.index), n = t.transformPosition(e.index + e.length);
  return {
    index: s,
    length: n - s
  };
}
class Xh extends es {
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
Xh.DEFAULTS = {
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
const rE = ["insertText", "insertReplacementText"];
class oE extends es {
  constructor(t, s) {
    super(t, s), t.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || t.on(D.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    ll({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (s) {
      const n = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new it().retain(t.index).insert(s, n), D.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + s.length, 0, D.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !rE.includes(t.inputType))
      return;
    const s = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!s || s.collapsed === !0)
      return;
    const n = aE(t);
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
function aE(e) {
  return typeof e.data == "string" ? e.data : e.dataTransfer?.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
const lE = /Mac/i.test(navigator.platform), cE = 100, uE = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || lE && e.key === "a" && e.ctrlKey === !0);
class hE extends es {
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
        return r && i.key !== "ArrowRight" || !r && i.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(t.index - 1, t.length + (i.shiftKey ? 1 : 0), D.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (t) => {
      !t.defaultPrevented && uE(t) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + cE, this.isListening) return;
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
D.register({
  "blots/block": ee,
  "blots/block/embed": Te,
  "blots/break": He,
  "blots/container": nn,
  "blots/cursor": De,
  "blots/embed": sl,
  "blots/inline": le,
  "blots/scroll": y_,
  "blots/text": Ve,
  "modules/clipboard": H_,
  "modules/history": sE,
  "modules/keyboard": Rr,
  "modules/uploader": Xh,
  "modules/input": oE,
  "modules/uiNode": hE
});
class dE extends Ue {
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
const fE = new dE("indent", "ql-indent", {
  scope: ot.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class pE extends ee {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class gE extends ee {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
class Ti extends nn {
}
Ti.blotName = "list-container";
Ti.tagName = "OL";
class Fi extends ee {
  static create(t) {
    const s = super.create();
    return s.setAttribute("data-list", t), s;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    D.register(Ti);
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
Fi.blotName = "list";
Fi.tagName = "LI";
Ti.allowedChildren = [Fi];
Fi.requiredContainer = Ti;
class ul extends le {
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
class mE extends ul {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class yr extends le {
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
    return Zh(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, s) {
    t !== this.statics.blotName || !s ? super.format(t, s) : this.domNode.setAttribute("href", this.constructor.sanitize(s));
  }
}
function Zh(e, t) {
  const s = document.createElement("a");
  s.href = e;
  const n = s.href.slice(0, s.href.indexOf(":"));
  return t.indexOf(n) > -1;
}
class bE extends le {
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
class yE extends ul {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class vE extends le {
  static blotName = "underline";
  static tagName = "U";
}
class _E extends sl {
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
const zc = ["alt", "height", "width"];
class EE extends ye {
  static blotName = "image";
  static tagName = "IMG";
  static create(t) {
    const s = super.create(t);
    return typeof t == "string" && s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return zc.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return Zh(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    zc.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
}
const Kc = ["height", "width"];
class wE extends Te {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(t) {
    const s = super.create(t);
    return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("src", this.sanitize(t)), s;
  }
  static formats(t) {
    return Kc.reduce((s, n) => (t.hasAttribute(n) && (s[n] = t.getAttribute(n)), s), {});
  }
  static sanitize(t) {
    return yr.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, s) {
    Kc.indexOf(t) > -1 ? s ? this.domNode.setAttribute(t, s) : this.domNode.removeAttribute(t) : super.format(t, s);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
const ii = new Ue("code-token", "hljs", {
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
    super(t, s, n), ii.add(this.domNode, n);
  }
  format(t, s) {
    t !== bs.blotName ? super.format(t, s) : s ? ii.add(this.domNode, s) : (ii.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ii.value(this.domNode) || this.unwrap();
  }
}
bs.blotName = "code-token";
bs.className = "ql-token";
class Ae extends he {
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
class ci extends rn {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, s) {
    t === Ae.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(t, s);
    }));
  }
  formatAt(t, s, n, i) {
    n === Ae.blotName && (this.forceNext = !0), super.formatAt(t, s, n, i);
  }
  highlight(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const i = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, r = Ae.formats(this.children.head.domNode);
    if (s || this.forceNext || this.cachedText !== i) {
      if (i.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((l, c) => l.concat(Rh(c, !1)), new it()), a = t(i, r);
        o.diff(a).reduce((l, c) => {
          let {
            retain: d,
            attributes: h
          } = c;
          return d ? (h && Object.keys(h).forEach((g) => {
            [Ae.blotName, bs.blotName].includes(g) && this.formatAt(l, d, g, h[g]);
          }), l + d) : l;
        }, 0);
      }
      this.cachedText = i, this.forceNext = !1;
    }
  }
  html(t, s) {
    const [n] = this.children.find(t);
    return `<pre data-language="${n ? Ae.formats(n.domNode) : "plain"}">
${Dr(this.code(t, s))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const s = Ae.formats(this.children.head.domNode);
      s !== this.uiNode.value && (this.uiNode.value = s);
    }
  }
}
ci.allowedChildren = [Ae];
Ae.requiredContainer = ci;
Ae.allowedChildren = [bs, De, Ve, He];
const AE = (e, t, s) => {
  if (typeof e.versionString == "string") {
    const n = e.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return e.highlight(s, {
        language: t
      }).value;
  }
  return e.highlight(t, s).value;
};
class Jh extends es {
  static register() {
    D.register(bs, !0), D.register(Ae, !0), D.register(ci, !0);
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
      if (!(t instanceof ci)) return;
      const s = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: i,
          label: r
        } = n;
        const o = s.ownerDocument.createElement("option");
        o.textContent = r, o.setAttribute("value", i), s.appendChild(o);
      }), s.addEventListener("change", () => {
        t.format(Ae.blotName, s.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(s), t.children.head && (s.value = Ae.formats(t.children.head.domNode)));
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
    (t == null ? this.quill.scroll.descendants(ci) : [t]).forEach((r) => {
      r.highlight(this.highlightBlot, s);
    }), this.quill.update(D.sources.SILENT), n != null && this.quill.setSelection(n, D.sources.SILENT);
  }
  highlightBlot(t) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (s = this.languages[s] ? s : "plain", s === "plain")
      return Dr(t).split(`
`).reduce((i, r, o) => (o !== 0 && i.insert(`
`, {
        [he.blotName]: s
      }), i.insert(r)), new it());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(he.className), n.innerHTML = AE(this.options.hljs, s, t), cl(this.quill.scroll, n, [(i, r) => {
      const o = ii.value(i);
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
Jh.DEFAULTS = {
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
class Me extends ee {
  static blotName = "table";
  static tagName = "TD";
  static create(t) {
    const s = super.create();
    return t ? s.setAttribute("data-row", t) : s.setAttribute("data-row", hl()), s;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, s) {
    t === Me.blotName && s ? this.domNode.setAttribute("data-row", s) : super.format(t, s);
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
class Xs extends nn {
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
class Cs extends nn {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class vr extends nn {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const t = this.descendants(Xs), s = t.reduce((n, i) => Math.max(i.children.length, n), 0);
    t.forEach((n) => {
      new Array(s - n.children.length).fill(0).forEach(() => {
        let i;
        n.children.head != null && (i = Me.formats(n.children.head.domNode));
        const r = this.scroll.create(Me.blotName, i);
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
      const i = n.children.at(t), r = Me.formats(n.children.head.domNode), o = this.scroll.create(Me.blotName, r);
      n.insertBefore(o, i);
    });
  }
  insertRow(t) {
    const [s] = this.descendant(Cs);
    if (s == null || s.children.head == null) return;
    const n = hl(), i = this.scroll.create(Xs.blotName);
    s.children.head.children.forEach(() => {
      const o = this.scroll.create(Me.blotName, n);
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
vr.allowedChildren = [Cs];
Cs.requiredContainer = vr;
Cs.allowedChildren = [Xs];
Xs.requiredContainer = Cs;
Xs.allowedChildren = [Me];
Me.requiredContainer = Xs;
function hl() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class TE extends es {
  static register() {
    D.register(Me), D.register(Xs), D.register(Cs), D.register(vr);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(vr).forEach((t) => {
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
    if (s == null || s.statics.blotName !== Me.blotName)
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
    n.insertColumn(o + t), this.quill.update(D.sources.USER);
    let a = i.rowOffset();
    t === 0 && (a += 1), this.quill.setSelection(s.index + a, s.length, D.sources.SILENT);
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
    n.insertRow(o + t), this.quill.update(D.sources.USER), t > 0 ? this.quill.setSelection(s, D.sources.SILENT) : this.quill.setSelection(s.index + i.children.length, s.length, D.sources.SILENT);
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
        table: hl()
      });
    }, new it().retain(n.index));
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
const Gc = _s("quill:toolbar");
class dl extends es {
  constructor(t, s) {
    if (super(t, s), Array.isArray(this.options.container)) {
      const n = document.createElement("div");
      n.setAttribute("role", "toolbar"), FE(n, this.options.container), t.container?.parentNode?.insertBefore(n, t.container), this.container = n;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      Gc.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((n) => {
      const i = this.options.handlers?.[n];
      i && this.addHandler(n, i);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((n) => {
      this.attach(n);
    }), this.quill.on(D.events.EDITOR_CHANGE, () => {
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
      Gc.warn("ignoring attaching to nonexistent format", s, t);
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
        this.quill.scroll.query(s).prototype instanceof ye
      ) {
        if (r = prompt(`Enter ${s}`), !r) return;
        this.quill.updateContents(new it().retain(o.index).delete(o.length).insert({
          [s]: r
        }), D.sources.USER);
      } else
        this.quill.format(s, r, D.sources.USER);
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
dl.DEFAULTS = {};
function Yc(e, t, s) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${t}`), n.setAttribute("aria-pressed", "false"), s != null ? (n.value = s, n.setAttribute("aria-label", `${t}: ${s}`)) : n.setAttribute("aria-label", t), e.appendChild(n);
}
function FE(e, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((s) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), s.forEach((i) => {
      if (typeof i == "string")
        Yc(n, i);
      else {
        const r = Object.keys(i)[0], o = i[r];
        Array.isArray(o) ? xE(n, r, o) : Yc(n, r, o);
      }
    }), e.appendChild(n);
  });
}
function xE(e, t, s) {
  const n = document.createElement("select");
  n.classList.add(`ql-${t}`), s.forEach((i) => {
    const r = document.createElement("option");
    i !== !1 ? r.setAttribute("value", String(i)) : r.setAttribute("selected", "selected"), n.appendChild(r);
  }), e.appendChild(n);
}
dl.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const e = this.quill.getSelection();
      if (e != null)
        if (e.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((s) => {
            this.quill.scroll.query(s, ot.INLINE) != null && this.quill.format(s, !1, D.sources.USER);
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
const CE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', OE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', NE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', SE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', kE = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', LE = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', IE = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', $E = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', Xc = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', DE = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', RE = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', ME = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', BE = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', qE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', PE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', VE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', jE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', UE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', HE = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', WE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', zE = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', KE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', GE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', YE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', XE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', ZE = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', JE = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', QE = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', tw = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', ew = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', sw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', nw = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', iw = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', mi = {
  align: {
    "": CE,
    center: OE,
    right: NE,
    justify: SE
  },
  background: kE,
  blockquote: LE,
  bold: IE,
  clean: $E,
  code: Xc,
  "code-block": Xc,
  color: DE,
  direction: {
    "": RE,
    rtl: ME
  },
  formula: BE,
  header: {
    1: qE,
    2: PE,
    3: VE,
    4: jE,
    5: UE,
    6: HE
  },
  italic: WE,
  image: zE,
  indent: {
    "+1": KE,
    "-1": GE
  },
  link: YE,
  list: {
    bullet: XE,
    check: ZE,
    ordered: JE
  },
  script: {
    sub: QE,
    super: tw
  },
  strike: ew,
  table: sw,
  underline: nw,
  video: iw
}, rw = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let Zc = 0;
function Jc(e, t) {
  e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
}
class Mr {
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
    this.container.classList.toggle("ql-expanded"), Jc(this.label, "aria-expanded"), Jc(this.options, "aria-hidden");
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
    return t.classList.add("ql-picker-label"), t.innerHTML = rw, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${Zc}`, Zc += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((s) => {
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
class Qh extends Mr {
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
class td extends Mr {
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
const ow = (e) => {
  const {
    overflowY: t
  } = getComputedStyle(e, null);
  return t !== "visible" && t !== "clip";
};
class ed {
  constructor(t, s) {
    this.quill = t, this.boundsContainer = s || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, ow(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const aw = [!1, "center", "right", "justify"], lw = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], cw = [!1, "serif", "monospace"], uw = ["1", "2", "3", !1], hw = ["small", !1, "large", "huge"];
class xi extends Vn {
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
      if (i.classList.contains("ql-align") && (i.querySelector("option") == null && ei(i, aw), typeof s.align == "object"))
        return new td(i, s.align);
      if (i.classList.contains("ql-background") || i.classList.contains("ql-color")) {
        const r = i.classList.contains("ql-background") ? "background" : "color";
        return i.querySelector("option") == null && ei(i, lw, r === "background" ? "#ffffff" : "#000000"), new Qh(i, s[r]);
      }
      return i.querySelector("option") == null && (i.classList.contains("ql-font") ? ei(i, cw) : i.classList.contains("ql-header") ? ei(i, uw) : i.classList.contains("ql-size") && ei(i, hw)), new Mr(i);
    });
    const n = () => {
      this.pickers.forEach((i) => {
        i.update();
      });
    };
    this.quill.on(st.events.EDITOR_CHANGE, n);
  }
}
xi.DEFAULTS = xs({}, Vn.DEFAULTS, {
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
class sd extends ed {
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
        t = dw(t);
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
function dw(e) {
  let t = e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = e.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : e;
}
function ei(e, t) {
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((n) => {
    const i = document.createElement("option");
    n === s ? i.setAttribute("selected", "selected") : i.setAttribute("value", String(n)), e.appendChild(i);
  });
}
const fw = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class pw extends sd {
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
            const l = a[a.length - 1], c = this.quill.getIndex(l), d = Math.min(l.length() - 1, i.index + i.length - c), h = this.quill.getBounds(new Ys(c, d));
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
class nd extends xi {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = fw), super(t, s), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new pw(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), mi), this.buildPickers(t.container.querySelectorAll("select"), mi));
  }
}
nd.DEFAULTS = xs({}, xi.DEFAULTS, {
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
const gw = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class mw extends sd {
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
          const [i, r] = this.quill.scroll.descendant(yr, t.index);
          if (i != null) {
            this.linkRange = new Ys(t.index - r, i.length());
            const o = yr.formats(i.domNode);
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
class id extends xi {
  constructor(t, s) {
    s.modules.toolbar != null && s.modules.toolbar.container == null && (s.modules.toolbar.container = gw), super(t, s), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), mi), this.buildPickers(t.container.querySelectorAll("select"), mi), this.tooltip = new mw(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (s, n) => {
      t.handlers.link.call(t, !n.format.link);
    }));
  }
}
id.DEFAULTS = xs({}, xi.DEFAULTS, {
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
  "attributors/attribute/direction": Vh,
  "attributors/class/align": Bh,
  "attributors/class/background": E_,
  "attributors/class/color": __,
  "attributors/class/direction": jh,
  "attributors/class/font": Wh,
  "attributors/class/size": Kh,
  "attributors/style/align": qh,
  "attributors/style/background": rl,
  "attributors/style/color": il,
  "attributors/style/direction": Uh,
  "attributors/style/font": zh,
  "attributors/style/size": Gh
}, !0);
D.register({
  "formats/align": Bh,
  "formats/direction": jh,
  "formats/indent": fE,
  "formats/background": rl,
  "formats/color": il,
  "formats/font": Wh,
  "formats/size": Kh,
  "formats/blockquote": pE,
  "formats/code-block": he,
  "formats/header": gE,
  "formats/list": Fi,
  "formats/bold": ul,
  "formats/code": ol,
  "formats/italic": mE,
  "formats/link": yr,
  "formats/script": bE,
  "formats/strike": yE,
  "formats/underline": vE,
  "formats/formula": _E,
  "formats/image": EE,
  "formats/video": wE,
  "modules/syntax": Jh,
  "modules/table": TE,
  "modules/toolbar": dl,
  "themes/bubble": nd,
  "themes/snow": id,
  "ui/icons": mi,
  "ui/picker": Mr,
  "ui/icon-picker": td,
  "ui/color-picker": Qh,
  "ui/tooltip": ed
}, !0);
const Se = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, bw = {
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
}, yw = bw, vw = { class: "ql-editor-container" }, _w = {
  class: "",
  ref: "editor"
};
function Ew(e, t, s, n, i, r) {
  return m(), b("div", vw, [
    f("div", _w, null, 512)
  ]);
}
const ww = /* @__PURE__ */ Se(yw, [["render", Ew]]), Aw = {
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
}, Tw = Aw, Fw = {
  key: 0,
  class: "table table-sm w-100 vsa-file-info"
}, xw = { class: "text-nowrap text-center" }, Cw = { class: "text-center" }, Ow = { class: "text-nowrap text-end" }, Nw = ["innerHTML"], Sw = { class: "text-end" }, kw = { class: "text-nowrap text-center" }, Lw = { class: "text-center" }, Iw = { class: "text-end" }, $w = ["innerHTML"], Dw = { class: "text-end" }, Rw = {
  key: 0,
  class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, Mw = { colspan: "3" }, Bw = { class: "text-end" }, qw = ["innerHTML"], Pw = { class: "d-flex justify-content-between text-nowrap" }, Vw = { class: "d-flex justify-content-between text-nowrap" }, jw = { class: "text-muted fw-light me-3" }, Uw = {
  key: 1,
  class: "d-flex justify-content-between"
};
function Hw(e, t, s, n, i, r) {
  return m(), b("div", null, [
    e.file ? (m(), b("table", Fw, [
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
          f("td", xw, $(e.file.original.width) + " x " + $(e.file.original.height), 1),
          f("td", Cw, $(e.file.original.ratio), 1),
          f("td", Ow, [
            f("span", {
              innerHTML: e.roundFileSize(e.file.original.bytes, !0)
            }, null, 8, Nw)
          ]),
          f("td", Sw, $(e.file.original.extension), 1),
          t[1] || (t[1] = f("td", null, null, -1))
        ]),
        (m(!0), b(ht, null, mt(e.file.types, (o, a) => (m(), b("tr", { key: o }, [
          f("td", null, $(a), 1),
          f("td", kw, $(o.width) + " x " + $(o.height), 1),
          f("td", Lw, $(o.ratio), 1),
          f("td", Iw, [
            f("span", {
              class: k(["text-nowrap", { "text-danger": o.bytes > e.file.original.bytes }]),
              innerHTML: e.roundFileSize(o.bytes, !0)
            }, null, 10, $w)
          ]),
          f("td", Dw, $(o.extension), 1),
          f("td", null, [
            o.crop ? (m(), b("small", Rw, $(o.crop), 1)) : T("", !0)
          ])
        ]))), 128))
      ]),
      f("tfoot", null, [
        f("tr", null, [
          f("td", Mw, $(e.file.uploaded ? "uploaded" : "uploading"), 1),
          f("td", Bw, [
            f("span", {
              class: "text-nowrap",
              innerHTML: e.roundFileSize(e.file.bytes, !0)
            }, null, 8, qw)
          ]),
          t[2] || (t[2] = f("td", { colspan: "2" }, null, -1))
        ])
      ])
    ])) : T("", !0),
    f("small", Pw, [
      t[4] || (t[4] = f("span", { class: "text-muted fw-light me-3" }, "original filename", -1)),
      wt(" " + $(e.file.original.name), 1)
    ]),
    f("small", Vw, [
      f("span", jw, $(e.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
      t[5] || (t[5] = wt()),
      f("span", null, $(e.file.slug), 1)
    ]),
    e.file.uploaded ? (m(), b("small", Uw, [
      t[6] || (t[6] = f("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1)),
      t[7] || (t[7] = wt()),
      f("span", null, $(e.dateFormat(e.file.timestamp * 1e3)), 1)
    ])) : T("", !0)
  ]);
}
const Ww = /* @__PURE__ */ Se(Tw, [["render", Hw]]), Ee = {
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
}, zw = {
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
    VuAdminFileUploadInfo: Ww
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
      return f1(e, t);
    },
    extensionByFilename(e) {
      return p1(e);
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
      }, e.title = e.name.split(".").slice(0, -1).join("."), e.uid = Math.round(Math.random() * 9999999).toString(32) + Date.now().toString(32), e.slug = Qn(e.title), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
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
                slug: Qn(t.title) + "-" + t.uid,
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
          let g = Math.max(d / o, h / a), v = o * g, E = a * g, F = (v - d) / 2, N = (E - h) / 2;
          n.width = d, n.height = h, i.drawImage(t, -F, -N, v, E);
        } else if (c.crop === "contain") {
          let g = Math.min(d / o, h / a), v = o * g, E = a * g, F = (d - v) / 2, N = (h - E) / 2;
          n.width = d, n.height = h, i.clearRect(0, 0, d, h), i.drawImage(t, F, N, v, E);
        } else
          o > d && (a = Math.round(a * (d / o)), o = d), a > h && (o = Math.round(o * (h / a)), a = h), n.width = o, n.height = a, i.drawImage(t, 0, 0, o, a);
        e.types[c.key] = {
          width: n.width,
          height: n.height,
          ratio: this.calculateAspectRatio(n.width, n.height),
          extension: c.extension ? c.extension : this.getExtensionByMimeType(e.type),
          quality: c.quality ? c.quality : 0.9,
          crop: c.crop ? c.crop : null
        }, e.types[c.key].slug = Qn(e.title) + "-" + n.width + "x" + n.height + "-" + e.uid, e.types[c.key].mime = this.getMimeTypeByExtension(e.types[c.key].extension), e.types[c.key].data = n.toDataURL(
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
        e.slug = Qn(e.title);
        for (let t in e.types) {
          let s = this.params.presets[t];
          e.types[t].slug = Qn(e.title) + "-" + s.width + "x" + s.height;
        }
        this.$forceUpdate();
      }
    },
    arrayItemMoveUp(e, t) {
      Wa(e, t);
    },
    arrayItemMoveDown(e, t) {
      za(e, t);
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
      return qn(e, this.settings.translate, t, s || this.settings.language);
    },
    dropdownSelectToggleOne(e, t) {
      Va(e, t), this.$forceUpdate();
    },
    dropdownSelectAll(e, t) {
      ja(e, t), this.$forceUpdate();
    },
    dropdownSelectInvert(e, t) {
      Ua(e, t), this.$forceUpdate();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Ha(e), this.$forceUpdate();
    },
    handleDrop(e) {
      e.preventDefault(), this.isDragging = !1;
      const t = e.dataTransfer.files;
      this.handleFileChange({ target: { files: t } });
    }
  }
}, Kw = zw, Gw = { class: "" }, Yw = {
  key: 0,
  class: "vsa-image-editor p-2 text-center"
}, Xw = { class: "row" }, Zw = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, Jw = { class: "badge bg-dark text-light fw-light mx-1" }, Qw = { class: "badge bg-dark text-light fw-light mx-1" }, tA = ["src"], eA = { class: "row g-1" }, sA = { class: "col-md-6" }, nA = { class: "col-md-6" }, iA = { class: "col-md-6" }, rA = ["href"], oA = {
  key: 1,
  class: "row g-2 mb-1"
}, aA = { key: 0 }, lA = { class: "table table-sm table-responsive table-borderless" }, cA = { class: "align-middle px-0" }, uA = { class: "input-group border" }, hA = { class: "d-block p-1 px-2" }, dA = ["onClick"], fA = ["onClick"], pA = {
  key: 0,
  class: "fs-5 mx-2"
}, gA = {
  key: 1,
  class: "fs-5 mx-2"
}, mA = {
  key: 2,
  class: "fs-5 mx-2"
}, bA = ["onUpdate:modelValue", "onInput"], yA = {
  key: 3,
  class: "mx-0"
}, vA = ["href"], _A = ["src", "alt"], EA = ["src", "alt"], wA = {
  key: 4,
  class: "dropdown rounded-bottom"
}, AA = {
  class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, TA = { class: "dropdown-menu" }, FA = ["onClick"], xA = {
  key: 0,
  class: "bi bi-check-square"
}, CA = {
  key: 1,
  class: "bi bi-square"
}, OA = ["onClick"], NA = ["onClick"], SA = ["onClick"], kA = { class: "dropdown" }, LA = { class: "dropdown-menu" }, IA = { class: "p-2" }, $A = { class: "fw-light" }, DA = ["onClick"], RA = { class: "vsa-image-container h-100 position-relative" }, MA = {
  key: 0,
  class: "w-100 h-100 d-flex align-items-center flex-column"
}, BA = {
  key: 1,
  class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, qA = ["href"], PA = ["src", "alt"], VA = ["src", "alt"], jA = {
  key: 2,
  class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, UA = ["onUpdate:modelValue", "onInput"], HA = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, WA = { class: "p-1 px-2 border border-end-0 h-100" }, zA = ["onClick"], KA = ["onClick"], GA = {
  key: 0,
  class: "dropdown border border-end-0 h-100 w-100"
}, YA = {
  class: "btn btn-sm rounded-0 h-100 w-100",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, XA = { class: "dropdown-menu" }, ZA = ["onClick"], JA = {
  key: 0,
  class: "bi bi-check-square"
}, QA = {
  key: 1,
  class: "bi bi-square"
}, tT = ["onClick"], eT = ["onClick"], sT = ["onClick"], nT = { class: "dropdown border h-100 w-100" }, iT = { class: "dropdown-menu" }, rT = { class: "p-2" }, oT = { class: "fw-light" }, aT = ["onClick"], lT = {
  key: 1,
  class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, cT = { class: "row g-1" }, uT = { class: "col-12 d-flex align-items-center justify-content-center" }, hT = ["for"], dT = { key: 0 }, fT = { key: 0 }, pT = { class: "" }, gT = { class: "" }, mT = {
  key: 1,
  class: "fs-6"
}, bT = {
  key: 0,
  class: "bi bi-list-ol"
}, yT = {
  key: 1,
  class: "bi bi-grid"
}, vT = ["disabled"], _T = { class: "col-12 text-center" }, ET = { key: 0 }, wT = ["id", "accept"];
function AT(e, t, s, n, i, r) {
  const o = Be("VuAdminFileUploadInfo");
  return m(), b("div", Gw, [
    f("div", {
      class: k(["vsa-upload", { wait: e.wait }])
    }, [
      e.editfile && e.editfile.presets ? (m(), b("div", Yw, [
        f("div", Xw, [
          (m(!0), b(ht, null, mt(e.editfile.types, (a, l) => (m(), b("div", {
            class: "col-md-3",
            key: l
          }, [
            f("span", Zw, $(a.extension), 1),
            f("span", Jw, $(a.width) + " x " + $(a.height), 1),
            f("span", Qw, "~" + $(e.roundFileSize(a.bytes)), 1),
            a ? (m(), b("img", {
              key: 0,
              class: "img-thumbnail rounded",
              src: a.url ? a.url : a.data
            }, null, 8, tA)) : T("", !0)
          ]))), 128))
        ]),
        vt(f("input", {
          type: "text",
          class: "form-control form-control-sm w-100 mt-1",
          "onUpdate:modelValue": t[0] || (t[0] = (a) => e.editfile.title = a)
        }, null, 512), [
          [Re, e.editfile.title]
        ]),
        f("div", eA, [
          f("div", sA, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[1] || (t[1] = (a) => e.editfile = null)
            }, " Close ")
          ]),
          f("div", nA, [
            f("button", {
              type: "button",
              class: "btn btn-sm btn-outline-danger mt-1 w-100",
              onClick: t[2] || (t[2] = (a) => e.remove(e.index))
            }, " Remove ")
          ]),
          f("div", iA, [
            e.type && !e.type.url ? (m(), b("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              onClick: t[3] || (t[3] = (a) => e.download(e.index, e.params))
            }, " Download ")) : T("", !0),
            e.type && e.type.url ? (m(), b("a", {
              key: 1,
              type: "button",
              class: "btn btn-sm btn-outline-light mt-1 w-100",
              href: e.type.url
            }, " Download ", 8, rA)) : T("", !0)
          ])
        ])
      ])) : T("", !0),
      e.files && e.files.length ? (m(), b("div", oA, [
        e.params.ui === "list" ? (m(), b("div", aA, [
          f("table", lA, [
            f("tbody", null, [
              (m(!0), b(ht, null, mt(e.files, (a, l) => (m(), b("tr", { key: l }, [
                f("td", cA, [
                  f("div", uA, [
                    f("span", hA, $(l + 1), 1),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end h-100",
                      onClick: (c) => e.arrayItemMoveDown(e.files, l)
                    }, [
                      f("i", {
                        class: k(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                      }, null, 2)
                    ], 8, dA),
                    f("span", {
                      class: "cursor-pointer p-1 border-start border-end h-100",
                      onClick: (c) => e.arrayItemMoveUp(e.files, l + 1)
                    }, [
                      f("i", {
                        class: k(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                      }, null, 2)
                    ], 8, fA),
                    a.isDocument ? (m(), b("span", pA, [
                      f("i", {
                        class: k(["bi bi-filetype-" + a.types.default.extension])
                      }, null, 2)
                    ])) : a.isImage ? (m(), b("span", gA, [...t[12] || (t[12] = [
                      f("i", { class: "bi bi-file-image" }, null, -1)
                    ])])) : a.isVideo ? (m(), b("span", mA, [...t[13] || (t[13] = [
                      f("i", { class: "bi bi-file-play" }, null, -1)
                    ])])) : T("", !0),
                    vt(f("input", {
                      required: "text",
                      class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
                      "onUpdate:modelValue": (c) => a.title = c,
                      onInput: (c) => e.slug(a),
                      onKeydown: t[4] || (t[4] = ri(Jt(() => {
                      }, ["prevent"]), ["enter"]))
                    }, null, 40, bA), [
                      [Re, a.title]
                    ]),
                    !a.isDocument && a.types && a.types[e.params.thumbnail] ? (m(), b("span", yA, [
                      a.types.default.url ? (m(), b("a", {
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
                        }, null, 8, _A)
                      ], 8, vA)) : (m(), b("img", {
                        key: 1,
                        height: "32",
                        width: "auto",
                        class: "transparent-background",
                        src: a.types[e.params.thumbnail].data,
                        alt: a.name
                      }, null, 8, EA))
                    ])) : T("", !0),
                    e.params.tags ? (m(), b("div", wA, [
                      f("button", AA, [
                        t[14] || (t[14] = f("i", { class: "bi bi-tag" }, null, -1)),
                        wt(" " + $(a.tags ? a.tags.length : 0), 1)
                      ]),
                      f("ul", TA, [
                        f("li", null, [
                          (m(!0), b(ht, null, mt(e.params.tags, (c) => (m(), b("span", {
                            key: c,
                            class: "dropdown-item cursor-pointer",
                            onClick: (d) => e.dropdownSelectToggleOne(a.tags, c.value)
                          }, [
                            a.tags && a.tags.indexOf(c.value) >= 0 ? (m(), b("i", xA)) : (m(), b("i", CA)),
                            wt(" " + $(e.translate(c.label ? c.label : c.value)), 1)
                          ], 8, FA))), 128))
                        ]),
                        t[15] || (t[15] = f("li", null, [
                          f("hr", { class: "dropdown-divider" })
                        ], -1)),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectAll(a.tags, e.params.tags)
                          }, $(e.translate("Select all")), 9, OA)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectClear(a.tags)
                          }, $(e.translate("Unselect all")), 9, NA)
                        ]),
                        f("li", null, [
                          f("span", {
                            class: "dropdown-item cursor-pointer",
                            onClick: (c) => e.dropdownSelectInvert(a.tags, e.params.tags)
                          }, $(e.translate("Invert all")), 9, SA)
                        ])
                      ])
                    ])) : T("", !0),
                    f("div", kA, [
                      t[16] || (t[16] = f("button", {
                        class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100",
                        type: "button",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false"
                      }, [
                        f("i", { class: "bi bi-list" })
                      ], -1)),
                      f("ul", LA, [
                        f("li", IA, [
                          f("small", $A, [
                            ar(o, { file: a }, null, 8, ["file"])
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
                    ])], 8, DA)
                  ])
                ])
              ]))), 128))
            ])
          ])
        ])) : (m(!0), b(ht, { key: 1 }, mt(e.files, (a, l) => (m(), b("div", {
          class: k([e.params.colclass ? e.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
          key: l
        }, [
          f("div", RA, [
            a.loaded ? (m(), b("div", MA, [
              T("", !0),
              a.types && a.types[e.params.thumbnail] ? (m(), b("div", BA, [
                a.types.default.url ? (m(), b("a", {
                  key: 0,
                  target: "_blank",
                  href: a.types.default.url
                }, [
                  f("img", {
                    class: "img-fluid transparent-background",
                    src: a.types[e.params.thumbnail].url,
                    alt: a.name
                  }, null, 8, PA)
                ], 8, qA)) : (m(), b("img", {
                  key: 1,
                  class: "img-fluid transparent-background",
                  src: a.types[e.params.thumbnail].data,
                  alt: a.name
                }, null, 8, VA))
              ])) : T("", !0),
              a.isDocument ? (m(), b("div", jA, [
                f("i", {
                  class: k(["bi bi-filetype-" + a.types.default.extension])
                }, null, 2)
              ])) : T("", !0),
              vt(f("input", {
                required: "text",
                class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
                "onUpdate:modelValue": (c) => a.title = c,
                onInput: (c) => e.slug(a),
                onKeydown: t[5] || (t[5] = ri(Jt(() => {
                }, ["prevent"]), ["enter"]))
              }, null, 40, UA), [
                [Re, a.title]
              ]),
              f("div", HA, [
                f("span", WA, $(l + 1), 1),
                f("span", {
                  class: "cursor-pointer p-1 border border-end-0 h-100",
                  onClick: (c) => e.arrayItemMoveDown(e.files, l)
                }, [
                  f("i", {
                    class: k(["bi bi-arrow-up", { "opacity-25": l < 1 }])
                  }, null, 2)
                ], 8, zA),
                f("span", {
                  class: "cursor-pointer p-1 border border-end-0 h-100",
                  onClick: (c) => e.arrayItemMoveUp(e.files, l + 1)
                }, [
                  f("i", {
                    class: k(["bi bi-arrow-down", { "opacity-25": l >= e.files.length - 1 }])
                  }, null, 2)
                ], 8, KA),
                e.params.tags ? (m(), b("div", GA, [
                  f("button", YA, [
                    t[21] || (t[21] = f("i", { class: "bi bi-tag" }, null, -1)),
                    wt(" " + $(a.tags ? a.tags.length : 0), 1)
                  ]),
                  f("ul", XA, [
                    f("li", null, [
                      (m(!0), b(ht, null, mt(e.params.tags, (c) => (m(), b("span", {
                        key: c,
                        class: "dropdown-item cursor-pointer",
                        onClick: (d) => e.dropdownSelectToggleOne(a.tags, c.value)
                      }, [
                        a.tags && a.tags.indexOf(c.value) >= 0 ? (m(), b("i", JA)) : (m(), b("i", QA)),
                        wt(" " + $(e.translate(c.label ? c.label : c.value)), 1)
                      ], 8, ZA))), 128))
                    ]),
                    t[22] || (t[22] = f("li", null, [
                      f("hr", { class: "dropdown-divider" })
                    ], -1)),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectAll(a.tags, e.params.tags)
                      }, $(e.translate("Select all")), 9, tT)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectClear(a.tags)
                      }, $(e.translate("Unselect all")), 9, eT)
                    ]),
                    f("li", null, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => e.dropdownSelectInvert(a.tags, e.params.tags)
                      }, $(e.translate("Invert all")), 9, sT)
                    ])
                  ])
                ])) : T("", !0),
                f("div", nT, [
                  t[23] || (t[23] = f("button", {
                    class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
                    type: "button",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false"
                  }, [
                    f("i", { class: "bi bi-list" })
                  ], -1)),
                  f("ul", iT, [
                    f("li", rT, [
                      f("small", oT, [
                        ar(o, { file: a }, null, 8, ["file"])
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
                ])], 8, aT)
              ])
            ])) : (m(), b("div", lT, [...t[25] || (t[25] = [
              f("span", null, null, -1)
            ])]))
          ])
        ], 2))), 128))
      ])) : T("", !0),
      f("div", cT, [
        f("div", uT, [
          f("label", {
            for: e.uploadId,
            class: k([
              { "disabled bg-secondary": e.files && e.params.limit <= e.files.length },
              "btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone",
              { "vsa-drop-zone-active": e.isDragging }
            ]),
            onDragover: t[6] || (t[6] = Jt(() => {
            }, ["prevent"])),
            onDragenter: t[7] || (t[7] = Jt(() => {
            }, ["prevent"])),
            onDrop: t[8] || (t[8] = Jt((...a) => e.handleDrop && e.handleDrop(...a), ["prevent"]))
          }, [
            e.files && e.params.limit > e.files.length ? (m(), b("span", dT, [
              t[29] || (t[29] = f("i", { class: "bi bi-upload me-2" }, null, -1)),
              wt(" " + $(e.params.text) + " ", 1),
              e.params.limit ? (m(), b("small", fT, [
                t[26] || (t[26] = wt(" ( ", -1)),
                f("strong", pT, $(e.files.length), 1),
                t[27] || (t[27] = wt(" / ", -1)),
                f("span", gT, $(e.params.limit), 1),
                t[28] || (t[28] = wt(" ) ", -1))
              ])) : T("", !0)
            ])) : (m(), b("span", mT, [...t[30] || (t[30] = [
              f("i", { class: "bi bi-exclamation-circle" }, null, -1),
              wt(" You've reached the upload limit ", -1)
            ])]))
          ], 42, hT),
          f("button", {
            type: "button",
            class: "btn btn-outline-primary ms-1",
            onClick: t[9] || (t[9] = (a) => e.toggleView())
          }, [
            e.params.ui != "list" ? (m(), b("i", bT)) : T("", !0),
            e.params.ui == "list" ? (m(), b("i", yT)) : T("", !0)
          ]),
          f("button", {
            disabled: !e.files.length,
            type: "button",
            class: "btn btn-outline-danger ms-1",
            onClick: t[10] || (t[10] = (a) => e.resetConfirm())
          }, [...t[31] || (t[31] = [
            f("i", { class: "bi bi-trash" }, null, -1)
          ])], 8, vT)
        ]),
        f("div", _T, [
          f("small", null, [
            e.params.accept ? (m(), b("div", ET, [
              t[32] || (t[32] = f("span", { class: "text-secondary" }, "accept only", -1)),
              (m(!0), b(ht, null, mt(e.params.accept, (a) => (m(), b("strong", {
                class: "ms-1 text-muted",
                key: a
              }, $(a), 1))), 128))
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
        onChange: t[11] || (t[11] = (...a) => e.handleFileChange && e.handleFileChange(...a))
      }, null, 40, wT)) : T("", !0)
    ], 2)
  ]);
}
const TT = /* @__PURE__ */ Se(Kw, [["render", AT]]), FT = {
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
      return Qs(e, t, this.settings, this);
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
      ), n = await An(s);
      if (!Tn(s, n.data))
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
}, xT = FT, CT = ["name", "id", "disabled", "readonly", "required"], OT = ["value"];
function NT(e, t, s, n, i, r) {
  return vt((m(), b("select", {
    class: k(["form-select", e.getValueOrFunction(e.field.inputclass ? e.field.inputclass : "", { field: e.field, item: e.item })]),
    name: e.field.name,
    id: e.formId + "_" + e.field.name,
    onChange: t[0] || (t[0] = (o) => e.handleChange(o)),
    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.newitem = o),
    disabled: e.field.disabled,
    readonly: e.field.readonly,
    required: e.field.required
  }, [
    (m(!0), b(ht, null, mt(e.options, (o) => (m(), b("option", {
      class: k(e.getValueOrFunction(e.field.optionclass ? e.field.optionclass : "", { field: e.field, item: e.item, option: o })),
      key: o,
      value: o.value
    }, $(o.label ? o.label : o.value), 11, OT))), 128))
  ], 42, CT)), [
    [Ge, e.newitem]
  ]);
}
const rd = /* @__PURE__ */ Se(xT, [["render", NT]]), ST = {
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
      return Qs(e, t, this.settings, this);
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
      Wa(e, t);
    },
    arrayItemMoveDown(e, t) {
      za(e, t);
    }
  },
  components: {
    VuAdminFormSelect: rd
  }
}, kT = ST, LT = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, IT = { class: "col-10" }, $T = { class: "row g-1 d-flex align-items-center justify-content-between" }, DT = { class: "col-10" }, RT = { class: "row g-1 d-flex align-items-center justify-content-between" }, MT = ["innerHTML"], BT = {
  key: 1,
  class: "input-group input-group-sm"
}, qT = ["type", "required", "placeholder", "onUpdate:modelValue"], PT = { class: "col-2 text-nowrap text-end" }, VT = ["onClick"], jT = ["onClick"], UT = ["onClick"], HT = { key: 0 }, WT = { class: "row g-1 d-flex align-items-center justify-content-between" }, zT = { class: "col-10" }, KT = { class: "row g-1 d-flex align-items-center justify-content-between" }, GT = { class: "input-group input-group-sm" }, YT = {
  key: 0,
  class: "input-group-text"
}, XT = ["type", "placeholder", "onUpdate:modelValue"], ZT = {
  key: 3,
  class: "input-group-text"
}, JT = { class: "col-2" };
function QT(e, t, s, n, i, r) {
  const o = Be("VuAdminFormSelect");
  return m(), b("div", null, [
    f("div", LT, [
      f("div", IT, [
        f("div", $T, [
          (m(!0), b(ht, null, mt(e.field.elements, (a) => (m(), b("div", {
            key: a,
            class: k(a.class || "col")
          }, [
            f("small", null, $(a.placeholder ? a.placeholder : a.prefix ? a.prefix : ""), 1)
          ], 2))), 128))
        ])
      ]),
      t[1] || (t[1] = f("div", { class: "col-2 text-nowrap text-end" }, null, -1))
    ]),
    (m(!0), b(ht, null, mt(e.value, (a, l) => (m(), b("div", {
      class: "row g-1 d-flex align-items-center justify-content-between mb-1",
      key: l
    }, [
      f("div", DT, [
        f("div", RT, [
          (m(!0), b(ht, null, mt(a, (c, d) => (m(), b("div", {
            key: d,
            class: k(e.field.elements[d].class || "col")
          }, [
            e.field.elements[d].template ? (m(), b("span", {
              key: 0,
              innerHTML: e.getValueOrFunction(e.field.elements[d].template, e.value[l])
            }, null, 8, MT)) : (m(), b("div", BT, [
              e.field.elements[d].type == "select" && e.value[l][d] ? (m(), hs(o, {
                key: 0,
                modelValue: e.value[l][d],
                "onUpdate:modelValue": (h) => e.value[l][d] = h,
                field: e.field.elements[d],
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : vt((m(), b("input", {
                key: 1,
                type: e.field.elements[d].type,
                required: e.field.elements[d].required,
                placeholder: e.field.elements[d].placeholder || d,
                class: "form-control",
                "onUpdate:modelValue": (h) => e.value[l][d] = h
              }, null, 8, qT)), [
                [qe, e.value[l][d]]
              ])
            ]))
          ], 2))), 128))
        ])
      ]),
      f("div", PT, [
        e.field.sortable ? (m(), b("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (c) => e.arrayItemMoveUp(e.value, l)
        }, [...t[2] || (t[2] = [
          f("i", { class: "bi bi-arrow-up" }, null, -1)
        ])], 8, VT)) : T("", !0),
        e.field.sortable ? (m(), b("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-secondary p-1 me-1",
          onClick: (c) => e.arrayItemMoveDown(e.value, l + 1)
        }, [...t[3] || (t[3] = [
          f("i", { class: "bi bi-arrow-down" }, null, -1)
        ])], 8, jT)) : T("", !0),
        f("button", {
          type: "button",
          class: "btn btn-sm btn-outline-danger p-1 me-1",
          onClick: (c) => e.arrayRemoveItem(e.value, l)
        }, [...t[4] || (t[4] = [
          f("i", { class: "bi bi-trash" }, null, -1)
        ])], 8, UT)
      ])
    ]))), 128)),
    e.item[e.field.name] && e.item[e.field.name].length ? (m(), b("hr", HT)) : T("", !0),
    f("div", WT, [
      f("div", zT, [
        f("div", KT, [
          (m(!0), b(ht, null, mt(e.field.elements, (a) => (m(), b("div", {
            key: a,
            class: k(a.class || "col")
          }, [
            f("div", GT, [
              a.prefix ? (m(), b("span", YT, $(a.prefix), 1)) : T("", !0),
              a.type == "select" && (!a.relation || a.relation && a.relation.items) ? (m(), hs(o, {
                key: 1,
                modelValue: a.value,
                "onUpdate:modelValue": (l) => a.value = l,
                field: a,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                optionValue: "object"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId"])) : vt((m(), b("input", {
                key: 2,
                type: a.type,
                placeholder: a.placeholder || a.name,
                class: "form-control form-control-sm",
                "onUpdate:modelValue": (l) => a.value = l
              }, null, 8, XT)), [
                [qe, a.value]
              ]),
              a.suffix ? (m(), b("span", ZT, $(a.suffix), 1)) : T("", !0)
            ]),
            T("", !0)
          ], 2))), 128))
        ])
      ]),
      f("div", JT, [
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
const t2 = /* @__PURE__ */ Se(kT, [["render", QT]]), e2 = {
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
      return Qs(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return qn(e, this.settings.translate, t, s || this.settings.language);
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
      Wa(e, t);
    },
    arrayItemMoveDown(e, t) {
      za(e, t);
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
      Va(t, n);
    },
    dropdownSelectAll(e, t) {
      ja(e, t);
    },
    dropdownSelectInvert(e, t) {
      Ua(e, t);
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Ha(e);
    }
  },
  components: {
    HtmlEditor: ww,
    FileUpload: TT,
    VuAdminFormSelect: rd,
    VuAdminFormList: t2
  }
}, s2 = e2, n2 = { class: "row m-1" }, i2 = ["innerHTML"], r2 = {
  key: 1,
  class: "row"
}, o2 = { class: "form-group pb-3" }, a2 = { key: 0 }, l2 = {
  key: 0,
  class: "badge text-secondary fw-light"
}, c2 = ["for", "innerHTML"], u2 = {
  key: 1,
  class: "input-group"
}, h2 = ["innerHTML"], d2 = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], f2 = ["name", "id", "onUpdate:modelValue", "min", "max", "step", "placeholder", "disabled", "readonly", "required"], p2 = ["type", "name", "id", "onUpdate:modelValue", "min", "max", "disabled", "readonly", "required"], g2 = {
  key: 4,
  class: "form-check"
}, m2 = ["name", "id", "true-value", "false-value", "onUpdate:modelValue", "disabled", "readonly", "required"], b2 = ["for"], y2 = ["name", "id", "onUpdate:modelValue", "minlength", "maxlength", "placeholder", "readonly", "disabled", "required"], v2 = ["name", "id", "onUpdate:modelValue", "rows", "minlength", "maxlength", "placeholder", "disabled", "readonly", "required"], _2 = ["innerHTML"], E2 = { class: "dropdown d-inline-block" }, w2 = { class: "dropdown-menu" }, A2 = ["onClick"], T2 = {
  key: 0,
  class: "bi bi-check-square"
}, F2 = {
  key: 1,
  class: "bi bi-square"
}, x2 = ["onClick"], C2 = ["onClick"], O2 = ["onClick"], N2 = { key: 0 }, S2 = ["onClick"], k2 = { key: 6 }, L2 = { key: 0 }, I2 = ["for"], $2 = ["name", "id", "onUpdate:modelValue"], D2 = ["onClick"], R2 = ["innerHTML"], M2 = {
  key: 8,
  class: "p-1"
}, B2 = ["innerHTML"];
function q2(e, t, s, n, i, r) {
  const o = Be("VuAdminFormSelect"), a = Be("HtmlEditor"), l = Be("FileUpload"), c = Be("VuAdminFormList");
  return m(), b("div", n2, [
    (m(!0), b(ht, null, mt(e.settings.form.groups, (d) => (m(), b("div", {
      key: d,
      class: k([d.class ? d.class : "col-md-12"])
    }, [
      d.title ? (m(), b("h2", {
        key: 0,
        class: "form-row-title mb-4 fw-lighter",
        innerHTML: d.title ? d.title : ""
      }, null, 8, i2)) : T("", !0),
      e.item && d.fields ? (m(), b("div", r2, [
        (m(!0), b(ht, null, mt(d.fields, (h) => (m(), b("div", {
          class: k([e.getValueOrFunction(h.class ? h.class : "col-md-12"), "input_type_" + h.type]),
          key: h
        }, [
          f("div", o2, [
            h.label ? (m(), b("span", a2, [
              ["html", "image", "upload"].indexOf(h.type) >= 0 ? (m(), b("label", {
                key: 0,
                class: k([{ required: h.required }, "form-label text-secondary mb-1"])
              }, [
                wt($(h.label ? h.label : e.translate(h.name)) + " ", 1),
                h.maxlength ? (m(), b("span", l2, $(e.item[h.name] ? e.item[h.name].length : 0) + " / " + $(h.maxlength), 1)) : T("", !0)
              ], 2)) : (m(), b("label", {
                key: 1,
                class: k([{ required: h.required }, "form-label text-secondary mb-1"]),
                for: e.formId + "_" + h.name,
                innerHTML: e.getValueOrFunction(h.label ? h.label : e.translate(h.name), { field: h, item: e.item })
              }, null, 10, c2))
            ])) : T("", !0),
            ["html", "image", "list", "addresses", "template"].indexOf(h.type) < 0 ? (m(), b("div", u2, [
              h.prefix ? (m(), b("span", {
                key: 0,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.prefix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, h2)) : T("", !0),
              h.type == "text" ? vt((m(), b("input", {
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
              }, null, 10, d2)), [
                [Re, e.item[h.name]]
              ]) : T("", !0),
              h.type == "number" ? vt((m(), b("input", {
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
              }, null, 10, f2)), [
                [Re, e.item[h.name]]
              ]) : T("", !0),
              ["date", "datetime", "datetime-local"].indexOf(h.type) >= 0 ? vt((m(), b("input", {
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
              }, null, 10, p2)), [
                [qe, e.item[h.name]]
              ]) : T("", !0),
              h.type == "checkbox" ? (m(), b("div", g2, [
                vt(f("input", {
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
                }, null, 10, m2), [
                  [lr, e.item[h.name]]
                ]),
                f("label", {
                  class: "form-check-label cursor-pointer",
                  for: e.formId + "_" + h.name
                }, $(h.checkbox), 9, b2)
              ])) : T("", !0),
              h.type == "email" ? vt((m(), b("input", {
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
              }, null, 10, y2)), [
                [Re, e.item[h.name]]
              ]) : T("", !0),
              h.type == "select" && (!h.relation || h.relation && h.relation.items) ? (m(), hs(o, {
                key: 6,
                modelValue: e.item[h.name],
                "onUpdate:modelValue": (g) => e.item[h.name] = g,
                field: h,
                item: e.item,
                settings: e.settings,
                formId: e.formId,
                auth: e.auth
              }, null, 8, ["modelValue", "onUpdate:modelValue", "field", "item", "settings", "formId", "auth"])) : T("", !0),
              h.type == "textarea" ? vt((m(), b("textarea", {
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
              }, "              ", 10, v2)), [
                [Re, e.item[h.name]]
              ]) : T("", !0),
              h.suffix ? (m(), b("span", {
                key: 8,
                class: "input-group-text",
                innerHTML: e.getValueOrFunction(h.suffix, {
                  field: h,
                  item: e.item
                })
              }, null, 8, _2)) : T("", !0)
            ])) : T("", !0),
            h.type == "html" ? (m(), hs(a, {
              key: 2,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (g) => e.item[h.name] = g,
              class: k([h.class])
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])) : T("", !0),
            h.type == "image" || h.type == "upload" ? (m(), hs(l, {
              key: 3,
              modelValue: e.item[h.name],
              "onUpdate:modelValue": (g) => e.item[h.name] = g,
              class: k([h.class]),
              field: h,
              settings: e.settings
            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "field", "settings"])) : T("", !0),
            h.type == "list" && (!h.relation || h.relation && h.relation.items) ? (m(), hs(c, {
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
              f("div", E2, [
                f("button", {
                  class: k(["btn dropdown-toggle", [h.dropdown ? h.dropdown.class : ""]]),
                  type: "button",
                  "data-bs-auto-close": "outside",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, [
                  f("span", null, $(e.translate(h.dropdown ? h.dropdown.label : "Select")), 1)
                ], 2),
                f("ul", w2, [
                  f("li", null, [
                    (m(!0), b(ht, null, mt(h.options, (g) => (m(), b("span", {
                      key: g,
                      class: k(["dropdown-item cursor-pointer", { selected: e.item[h.name].indexOf(g.value) >= 0 }]),
                      onClick: (v) => e.dropdownSelectToggleOne(h, e.item[h.name], g)
                    }, [
                      e.item[h.name].indexOf(g.value) >= 0 ? (m(), b("i", T2)) : (m(), b("i", F2)),
                      wt(" " + $(e.translate(g.label ? g.label : g.value)), 1)
                    ], 10, A2))), 128))
                  ]),
                  t[0] || (t[0] = f("li", null, [
                    f("hr", { class: "dropdown-divider" })
                  ], -1)),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (g) => e.dropdownSelectAll(e.item[h.name], h.options)
                    }, $(e.translate("Select all")), 9, x2)
                  ]),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (g) => e.dropdownSelectClear(e.item[h.name])
                    }, $(e.translate("Unselect all")), 9, C2)
                  ]),
                  f("li", null, [
                    f("span", {
                      class: "dropdown-item cursor-pointer",
                      onClick: (g) => e.dropdownSelectInvert(e.item[h.name], h.options)
                    }, $(e.translate("Invert all")), 9, O2)
                  ])
                ])
              ]),
              e.item[h.name].length ? (m(), b("span", N2, [
                (m(!0), b(ht, null, mt(e.item[h.name], (g) => (m(), b("span", {
                  class: k(["cursor-pointer", [h.list ? h.list.class : ""]]),
                  key: g,
                  onClick: (v) => e.dropdownSelectToggleOne(h, e.item[h.name], g)
                }, [
                  wt($(e.translate(g)) + " ", 1),
                  t[1] || (t[1] = f("i", { class: "bi bi-x" }, null, -1))
                ], 10, S2))), 128))
              ])) : T("", !0)
            ], 2)) : T("", !0),
            h.type == "addresses" ? (m(), b("span", k2, [
              e.item[h.name] ? (m(), b("div", L2, [
                (m(!0), b(ht, null, mt(e.item[h.name], (g) => (m(), b("div", { key: g }, [
                  wt($(g) + " ", 1),
                  f("label", {
                    class: "form-label text-secondary mb-1",
                    for: e.formId + "_" + h.name
                  }, $(h.label), 9, I2),
                  vt(f("input", {
                    class: "form-control",
                    type: "text",
                    name: h.name,
                    id: e.formId + "_" + h.name,
                    "onUpdate:modelValue": (v) => g.country = v
                  }, null, 8, $2), [
                    [Re, g.country]
                  ])
                ]))), 128))
              ])) : T("", !0),
              f("button", {
                type: "button",
                class: "btn btn-sm btn-secondary",
                onClick: (g) => e.insertAddress(h.name)
              }, " Add ", 8, D2)
            ])) : T("", !0),
            h.type == "template" ? (m(), b("div", {
              key: 7,
              innerHTML: e.getValueOrFunction(h.template, {
                field: h,
                item: e.item
              })
            }, null, 8, R2)) : T("", !0),
            h.description ? (m(), b("div", M2, [
              f("small", null, [
                f("i", {
                  class: "text-muted",
                  innerHTML: e.getValueOrFunction(h.description, {
                    field: h,
                    item: e.item
                  })
                }, null, 8, B2)
              ])
            ])) : T("", !0)
          ])
        ], 2))), 128))
      ])) : T("", !0)
    ], 2))), 128))
  ]);
}
const P2 = /* @__PURE__ */ Se(s2, [["render", q2]]), V2 = {
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
      return qn(e, this.settings.translate, t, s || this.settings.language);
    },
    getValueOrFunction(e, t) {
      return Qs(e, t, this.settings, this);
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
          us("GET", t.form.api, e),
          cs("GET", t.api, null, s)
        ).catch((a) => {
        }), i = await An(n);
        if (Tn(n, i.data, "form") || !i.data)
          return this.formNoWait(), !1;
        t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, n);
        let o;
        t.form.api.input.item ? o = typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, n) : o = i.data;
        for (let a of t.form.groups)
          for (let l of a.fields)
            l.type === "dropdown" && !o[l.name] && (o[l.name] = []), l.relation && t.relations[l.relation.config] && (l.relation = Nr(t.relations[l.relation.config], l.relation), console.log(l.relation, s), await this.fetchRelation(l, [o], s));
        this.item = fr(o), this.itemOriginal = Object.assign({}, o), this.loaded = !0, this.formNoWait();
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
        ), this.item = fr(s), this.itemOriginal = Object.assign({}, s)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
    VuAdminFormGroup: P2
  }
}, j2 = V2, U2 = ["id", "data-bs-theme"], H2 = { class: "modal-header" }, W2 = {
  key: 0,
  class: "modal-title"
}, z2 = ["innerHTML"], K2 = { key: 1 }, G2 = { key: 2 }, Y2 = {
  key: 3,
  class: "rounded border ms-2 px-2 py-0 fs-6"
}, X2 = {
  key: 1,
  class: "d-inline-block ms-3 mt-1"
}, Z2 = ["innerHTML"], J2 = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, Q2 = {
  key: 0,
  class: "modal-header bg-body sticky-top"
}, tF = {
  key: 0,
  class: "d-inline-block m-1"
}, eF = { class: "dropdown d-inline-block" }, sF = ["innerHTML"], nF = { class: "dropdown-menu text-start" }, iF = { class: "me-2 text-muted" }, rF = ["innerHTML"], oF = ["disabled", "onClick"], aF = {
  key: 1,
  class: "dropdown d-inline-block"
}, lF = { class: "mx-1" }, cF = { class: "dropdown-menu px-2" }, uF = ["onClick"], hF = {
  key: 1,
  class: "modal-body custom-scroll"
}, dF = {
  key: 2,
  class: "modal-footer d-flex justify-content-between"
}, fF = {
  key: 3,
  class: "bg-light text-dark"
};
function pF(e, t, s, n, i, r) {
  const o = Be("VuAdminFormGroup");
  return e.item ? (m(), b("form", {
    key: 0,
    ref: "form",
    id: e.formId,
    class: k(["form", [e.settings.form.class, { wait: e.ui.wait.form }]]),
    onSubmit: t[1] || (t[1] = Jt((...a) => e.submitItem && e.submitItem(...a), ["prevent"])),
    "data-bs-theme": [e.settings.theme]
  }, [
    f("div", {
      class: k(["vua-overlay", { blocked: e.ui.block.form }])
    }, null, 2),
    f("div", H2, [
      e.loaded ? (m(), b("h5", W2, [
        e.settings.form.title && typeof e.settings.form.title == "function" ? (m(), b("span", {
          key: 0,
          innerHTML: e.settings.form.title(e.item, e.settings)
        }, null, 8, z2)) : T("", !0),
        e.settings.form.title && typeof e.settings.form.title == "string" ? (m(), b("span", K2, $(e.translate(e.settings.form.title)), 1)) : T("", !0),
        e.settings.form.title ? T("", !0) : (m(), b("span", G2, $(e.translate("Edit")), 1)),
        e.item[e.settings.pkey] ? (m(), b("small", Y2, [
          t[2] || (t[2] = f("span", { class: "text-muted fw-light" }, "id", -1)),
          wt(" " + $(e.item[e.settings.pkey]), 1)
        ])) : T("", !0)
      ])) : T("", !0),
      e.message.form ? (m(), b("span", X2, [
        f("span", {
          class: k(["text-" + e.message.form.priority])
        }, [
          t[3] || (t[3] = f("i", { class: "bi bi-envelope-fill me-2" }, null, -1)),
          f("span", {
            innerHTML: e.message.form.msg
          }, null, 8, Z2)
        ], 2)
      ])) : T("", !0),
      vt(f("span", J2, [...t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ])], 512), [
        [Ps, e.ui.wait.form]
      ]),
      t[5] || (t[5] = f("button", {
        type: "button",
        class: "btn-close",
        "data-bs-dismiss": "modal",
        "aria-label": "Close"
      }, null, -1))
    ]),
    e.item ? (m(), b("div", Q2, [
      e.settings.form.control ? (m(), b("div", {
        key: 0,
        class: k(["w-100", e.settings.form.control.class == null ? "d-flex justify-content-center" : e.settings.form.control.class])
      }, [
        e.messages.form.length ? (m(), b("span", tF, [
          f("div", eF, [
            f("button", {
              class: k(["btn btn-sm dropdown-toggle", ["btn-" + e.messages.form[0].priority]]),
              type: "button",
              "data-bs-toggle": "dropdown",
              "aria-expanded": "false",
              innerHTML: e.messages.form.length + " " + (e.messages.form.length > 1 ? e.translate("messages") : e.translate("message"))
            }, null, 10, sF),
            f("ul", nF, [
              (m(!0), b(ht, null, mt(e.messages.form, (a) => (m(), b("li", { key: a }, [
                f("span", {
                  class: k(["dropdown-item disabled", ["text-" + a.priority]])
                }, [
                  f("small", iF, $(a.datetime), 1),
                  f("span", {
                    innerHTML: a.msg
                  }, null, 8, rF)
                ], 2)
              ]))), 128))
            ])
          ])
        ])) : T("", !0),
        (m(!0), b(ht, null, mt(e.settings.form.control.buttons, (a) => (m(), b("span", {
          key: a.action
        }, [
          a.dropdowns ? T("", !0) : (m(), b("button", {
            key: 0,
            type: "button",
            disabled: a.disabled !== void 0 ? e.getValueOrFunction(a.disabled, {
              button: a,
              item: e.item,
              form: this
            }) : !1,
            class: k([
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
              class: k([
                a.icon !== void 0 ? e.getValueOrFunction(a.icon, {
                  button: a,
                  item: e.item,
                  form: this
                }) : e.getButtonIconClassByAction(a.action)
              ])
            }, null, 2),
            wt(" " + $(e.translate(a.title)), 1)
          ], 10, oF)),
          a.dropdowns ? (m(), b("div", aF, [
            f("button", {
              type: "button",
              class: k([[a.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", lF, [
                f("i", {
                  class: k([
                    a.icon !== void 0 ? e.getValueOrFunction(a.icon, {
                      button: a,
                      table: this
                    }) : e.getButtonIconClassByAction(a.action)
                  ])
                }, null, 2),
                wt(" " + $(e.translate(a.title)), 1)
              ])
            ], 2),
            f("ul", cF, [
              (m(!0), b(ht, null, mt(a.dropdowns, (l) => (m(), b("li", { key: l }, [
                f("span", {
                  class: k([l.class ? l.class : ""]),
                  onClick: (c) => e.formAction(l, {
                    button: a,
                    item: e.item,
                    form: this,
                    $event: c
                  })
                }, [
                  l.icon ? (m(), b("i", {
                    key: 0,
                    class: k([l.icon])
                  }, null, 2)) : T("", !0),
                  wt(" " + $(e.translate(l.title)), 1)
                ], 10, uF)
              ]))), 128))
            ])
          ])) : T("", !0)
        ]))), 128))
      ], 2)) : T("", !0)
    ])) : T("", !0),
    e.settings.form ? (m(), b("div", hF, [
      e.settings.form.visible && e.settings.form.groups ? (m(), hs(o, {
        key: 0,
        modelValue: e.item,
        "onUpdate:modelValue": t[0] || (t[0] = (a) => e.item = a),
        formid: e.formId,
        settings: e.settings
      }, null, 8, ["modelValue", "formid", "settings"])) : T("", !0)
    ])) : T("", !0),
    e.item ? (m(), b("div", dF)) : T("", !0),
    e.settings.debug > 1 ? (m(), b("pre", fF, "        " + $(e.item) + `
    `, 1)) : T("", !0)
  ], 42, U2)) : T("", !0);
}
const od = /* @__PURE__ */ Se(j2, [["render", pF]]), gF = {
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
      return qn(e, this.settings.translate, t, s || this.settings.language);
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
}, mF = {
  key: 0,
  "aria-label": "Page navigation",
  class: "mt-2 d-flex align-items-center justify-content-between"
}, bF = { class: "dropdown d-inline-block m-1" }, yF = { class: "mx-1" }, vF = { key: 0 }, _F = {
  key: 0,
  class: "dropdown-menu text-end"
}, EF = ["onClick"], wF = { class: "ms-2" }, AF = {
  key: 0,
  class: "bi bi-check-circle-fill ms-2"
}, TF = {
  key: 1,
  class: "bi bi-circle ms-2"
}, FF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, xF = { class: "pagination pagination-sm m-1" }, CF = { class: "page-item" }, OF = ["innerHTML"], NF = { class: "page-item" }, SF = ["innerHTML"], kF = ["onClick"], LF = { class: "page-item" }, IF = ["innerHTML"], $F = {
  key: 0,
  class: "page-item"
}, DF = ["innerHTML"];
function RF(e, t, s, n, i, r) {
  return s.config.pagination.hidden ? T("", !0) : (m(), b("nav", mF, [
    f("div", null, [
      f("div", bF, [
        f("button", {
          type: "button",
          class: k(["btn btn-sm btn-secondary", { "dropdown-toggle": s.config.pagination.limits }]),
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false"
        }, [
          vt(f("span", yF, [
            f("strong", null, $(s.config.pagination.from) + "-" + $(s.config.pagination.to), 1),
            s.config.pagination.total ? (m(), b("span", vF, " / " + $(s.config.pagination.total), 1)) : T("", !0)
          ], 512), [
            [Ps, s.config.pagination.from > 0]
          ])
        ], 2),
        s.config.pagination.limits ? (m(), b("ul", _F, [
          f("li", null, [
            (m(!0), b(ht, null, mt(s.config.pagination.limits, (o) => (m(), b("span", {
              class: k(["dropdown-item cursor-pointer", { selected: s.config.pagination.limit == o }]),
              key: o,
              onClick: (a) => r.setPageLimit(o)
            }, [
              f("strong", null, $(o), 1),
              f("small", wF, $(r.translate("row")) + "/" + $(r.translate("page")), 1),
              s.config.pagination.limit == o ? (m(), b("i", AF)) : T("", !0),
              s.config.pagination.limit != o ? (m(), b("i", TF)) : T("", !0)
            ], 10, EF))), 128))
          ])
        ])) : T("", !0)
      ]),
      vt(f("div", FF, [...t[4] || (t[4] = [
        f("span", { class: "visually-hidden" }, "Loading...", -1)
      ])], 512), [
        [Ps, s.ui && s.ui.wait.table]
      ])
    ]),
    f("ul", xF, [
      f("li", CF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.firstDisabled() }]),
          onClick: t[0] || (t[0] = (o) => r.setPage(1)),
          "aria-label": "{{  translate('First')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("First")
          }, null, 8, OF)
        ], 2)
      ]),
      f("li", NF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.prevDisabled() }]),
          onClick: t[1] || (t[1] = (o) => r.setPage(s.config.pagination.page - 1)),
          "aria-label": "{{ translate('Prev')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Prev")
          }, null, 8, SF)
        ], 2)
      ]),
      (m(!0), b(ht, null, mt(s.config.pagination.numbers, (o) => (m(), b("li", {
        key: o,
        class: "page-item"
      }, [
        f("a", {
          class: k(["page-link cursor-pointer", {
            disabled: o > s.config.pagination.pages,
            current: o == s.config.pagination.page
          }]),
          onClick: (a) => r.setPage(o)
        }, $(o), 11, kF)
      ]))), 128)),
      f("li", LF, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.nextDisabled() }]),
          onClick: t[2] || (t[2] = (o) => r.setPage(s.config.pagination.page + 1)),
          "aria-label": "{{  translate('Next')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Next")
          }, null, 8, IF)
        ], 2)
      ]),
      s.config.pagination.total ? (m(), b("li", $F, [
        f("a", {
          class: k(["page-link cursor-pointer", { disabled: r.lastDisabled() }]),
          onClick: t[3] || (t[3] = (o) => r.setPage(s.config.pagination.total)),
          "aria-label": "{{  translate('Last')  }}"
        }, [
          f("span", {
            "aria-hidden": "true",
            innerHTML: r.translate("Last")
          }, null, 8, DF)
        ], 2)
      ])) : T("", !0)
    ])
  ]));
}
const MF = /* @__PURE__ */ Se(gF, [["render", RF]]), Qc = Pa(), BF = {
  name: "VuAdminTable",
  props: {
    settings: Object,
    auth: Object
  },
  components: {
    VuAdminForm: od,
    VuAdminTablePagination: MF
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
    this.modalElement = document.getElementById(this.modalId), this.modalWindow = new zs(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
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
      Qc.emit(e + "-" + t, {
        from: this.settings.entity,
        payload: s
      });
    },
    listenEvent() {
      Qc.on(`EDIT-${this.settings.entity}`, (e) => {
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
      return Qs(e, t, this.settings, this);
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
          t.relation = Nr(this.settings.relations[t.relation.config], t.relation);
          for (let n of e)
            n[t.relation.local] && s.push(n[t.relation.local]);
          t.relation.ids = h1(s), await this.fetchRelation(t, e, this.auth);
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
      ), r = await An(i), o = Tn(i, r.data);
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
      let l = a1(a);
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
        n.filter = JSON.stringify(i), d1(n, {
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
        const o = await An(r);
        if (Tn(r, o.data) || !o.data)
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
        if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !r) && (i = l1(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, n, e), !this.settings.form.api.output.item)
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
        const c = await An(a), d = Tn(a, c.data);
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
        }), n = await An(s), i = Tn(s, n.data);
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
      e.multiple ? Va(e.value, s) : e.value = e.value === s ? null : s, this.reloadTable();
    },
    dropdownSelectAll(e, t) {
      ja(e, t), this.reloadTable();
    },
    dropdownSelectInvert(e, t) {
      Ua(e, t), this.reloadTable();
    },
    dropdownSelectClear(e) {
      typeof e != "object" ? e.value = null : Ha(e), this.reloadTable();
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
        let n = c1(
          items,
          this.settings.table.exports[e.type].fields
        );
        u1(n, this.settings.entity + ".csv");
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
      return qn(e, this.settings.translate, t, s || this.settings.language);
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
}, qF = ["data-bs-theme"], PF = { class: "vua-table-title" }, VF = { class: "d-flex align-items-center justify-content-between" }, jF = { class: "d-inline-block" }, UF = {
  key: 0,
  class: "card-title d-inline-block mb-2"
}, HF = {
  class: "spinner-border spinner-border-sm mx-2",
  role: "status"
}, WF = {
  key: 0,
  class: "d-inline-block"
}, zF = {
  key: 0,
  class: "d-inline-block px-1 mx-1"
}, KF = ["innerHTML"], GF = { class: "dropdown d-inline-block" }, YF = ["innerHTML"], XF = { class: "dropdown-menu text-start" }, ZF = { class: "me-2 text-muted" }, JF = ["innerHTML"], QF = ["onClick"], tx = {
  key: 1,
  class: "dropdown d-inline-block"
}, ex = { class: "mx-1" }, sx = { key: 0 }, nx = { class: "dropdown-menu" }, ix = ["onClick"], rx = {
  key: 0,
  class: "bi bi-check-square-fill me-2"
}, ox = {
  key: 1,
  class: "bi bi-x-square me-2 text-danger"
}, ax = { class: "badge text-secondary fw-normal" }, lx = {
  key: 2,
  class: "dropdown d-inline-block"
}, cx = { class: "mx-1" }, ux = { class: "dropdown-menu" }, hx = ["onClick"], dx = { class: "vua-table-header" }, fx = ["width"], px = ["onClick"], gx = ["innerHTML"], mx = {
  key: 0,
  class: "bi bi-arrow-down"
}, bx = {
  key: 1,
  class: "bi bi-arrow-up"
}, yx = { key: 0 }, vx = ["disabled", "onClick"], _x = {
  key: 0,
  class: "vua-table-filter"
}, Ex = ["width"], wx = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, Ax = { class: "bi bi-check-all" }, Tx = { class: "bi bi-x-lg" }, Fx = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, xx = ["onUpdate:modelValue"], Cx = ["disabled", "onClick"], Ox = {
  key: 2,
  class: "input-group input-group-sm my-1"
}, Nx = ["onUpdate:modelValue", "disabled"], Sx = { value: "=" }, kx = { value: ">" }, Lx = { value: ">=" }, Ix = { value: "<" }, $x = { value: "<=" }, Dx = ["onUpdate:modelValue", "disabled"], Rx = ["value"], Mx = ["onUpdate:modelValue", "disabled", "min", "max"], Bx = ["disabled", "onClick"], qx = { key: 3 }, Px = {
  key: 0,
  class: "dropdown"
}, Vx = {
  class: "btn btn-sm btn-secondary dropdown-toggle my-1",
  type: "button",
  "data-bs-auto-close": "outside",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, jx = { class: "dropdown-menu" }, Ux = ["onClick"], Hx = {
  key: 0,
  class: "bi bi-check-square"
}, Wx = {
  key: 1,
  class: "bi bi-square"
}, zx = { key: 0 }, Kx = { key: 1 }, Gx = ["onClick"], Yx = { key: 2 }, Xx = ["onClick"], Zx = { key: 3 }, Jx = ["onClick"], Qx = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, tC = ["onUpdate:modelValue", "multiple"], eC = ["value"], sC = ["disabled", "onClick"], nC = {
  key: 4,
  class: "input-group input-group-sm my-1"
}, iC = ["onUpdate:modelValue"], rC = { value: "=" }, oC = { value: ">" }, aC = { value: ">=" }, lC = { value: "<" }, cC = { value: "<=" }, uC = ["onUpdate:modelValue"], hC = ["value"], dC = ["type", "onUpdate:modelValue"], fC = ["disabled", "onClick"], pC = ["disabled", "onClick"], gC = { class: "align-middle" }, mC = ["data-label", "width", "onClick"], bC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, yC = ["innerHTML"], vC = { key: 1 }, _C = ["innerHTML"], EC = ["aria-valuenow", "aria-valuemax"], wC = { key: 0 }, AC = {
  key: 4,
  class: "input-group input-group-sm"
}, TC = ["innerHTML"], FC = {
  key: 1,
  class: "input-group-text"
}, xC = ["name", "onUpdate:modelValue", "onChange"], CC = ["type", "onChange", "onUpdate:modelValue"], OC = ["onChange", "onUpdate:modelValue"], NC = ["value"], SC = ["innerHTML"], kC = {
  key: 5,
  class: "input-group-text"
}, LC = ["name", "onUpdate:modelValue", "onChange"], IC = { key: 5 }, $C = ["disabled", "onClick"], DC = ["innerHTML"], RC = { key: 2 }, MC = { key: 0 }, BC = ["colspan"], qC = { class: "row g-3 align-items-center" }, PC = { class: "col-form-label" }, VC = ["type", "onUpdate:modelValue", "onChange"], jC = ["onUpdate:modelValue", "onChange"], UC = ["onUpdate:modelValue", "onChange"], HC = ["value"], WC = ["innerHTML"], zC = {
  key: 0,
  class: "bg-light text-dark"
}, KC = {
  key: 0,
  class: "vua-table-bulk border-info"
}, GC = ["data-label", "width"], YC = {
  key: 0,
  class: "d-inline-block w-100 px-1"
}, XC = {
  key: 1,
  class: "input-group input-group-sm my-1"
}, ZC = ["type", "disabled", "onChange", "onUpdate:modelValue"], JC = ["disabled", "onChange", "onUpdate:modelValue"], QC = ["value"], tO = ["onClick"], eO = {
  key: 0,
  class: "bi bi-square text-secondary"
}, sO = {
  key: 1,
  class: "bi bi-check-square"
}, nO = { key: 2 }, iO = ["disabled", "onClick"], rO = ["innerHTML"], oO = { key: 2 }, aO = ["id"], lO = { class: "modal-dialog modal-xl" }, cO = { class: "modal-content h-100" };
function uO(e, t, s, n, i, r) {
  const o = Be("VuAdminTablePagination"), a = Be("VuAdminForm");
  return m(), b("div", null, [
    r.authAndSettings() ? (m(), b("div", {
      key: 0,
      class: k(["vua-table-container", [s.settings.class]]),
      "data-bs-theme": [s.settings.theme]
    }, [
      f("div", {
        class: k(["vua-overlay", { blocked: i.ui.block.table }])
      }, null, 2),
      f("div", PF, [
        f("div", VF, [
          f("div", jF, [
            s.settings.table.title ? (m(), b("h5", UF, $(s.settings.table.title), 1)) : T("", !0),
            vt(f("div", HF, [...t[15] || (t[15] = [
              f("span", { class: "visually-hidden" }, "Loading...", -1)
            ])], 512), [
              [Ps, i.ui.wait.table && s.settings.table.title]
            ])
          ]),
          i.messages.table.length ? (m(), b("div", WF, [
            i.message.table ? (m(), b("small", zF, [
              f("span", {
                class: k(["text-" + i.message.table.priority])
              }, [
                f("span", {
                  class: "fw-bold",
                  innerHTML: i.message.table.msg
                }, null, 8, KF)
              ], 2)
            ])) : T("", !0),
            f("div", GF, [
              f("button", {
                class: k(["btn btn-sm dropdown-toggle", ["btn-" + i.messages.table[0].priority]]),
                type: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                innerHTML: i.messages.table.length + " " + (i.messages.table.length > 1 ? r.translate("messages") : r.translate("message"))
              }, null, 10, YF),
              f("ul", XF, [
                (m(!0), b(ht, null, mt(i.messages.table, (l) => (m(), b("li", { key: l }, [
                  f("span", {
                    class: k(["dropdown-item", ["text-" + l.priority]])
                  }, [
                    f("small", ZF, $(l.datetime), 1),
                    f("span", {
                      class: "fw-bold",
                      innerHTML: l.msg
                    }, null, 8, JF)
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
        (m(!0), b(ht, null, mt(s.settings.table.control.buttons, (l) => (m(), b("span", {
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
            wt(" " + $(r.translate(l.title)), 1)
          ], 10, QF)) : T("", !0),
          l.action === "TABLE_COLUMNS" ? (m(), b("div", tx, [
            f("button", {
              type: "button",
              class: k([[
                l.class ? l.class : r.getButtonClassByAction(l.action)
              ], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              vt(f("span", ex, [
                f("i", {
                  class: k([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                wt(" " + $(r.translate(l.title)) + " ", 1),
                r.countHiddenColumns() ? (m(), b("span", sx, " ( " + $(r.countHiddenColumns()) + " " + $(r.translate("hidden")) + " ) ", 1)) : T("", !0)
              ], 512), [
                [Ps, s.settings.table.columns.length > 0]
              ])
            ], 2),
            f("ul", nx, [
              (m(!0), b(ht, null, mt(s.settings.table.columns, (c) => (m(), b("li", { key: c }, [
                f("span", {
                  class: "dropdown-item cursor-pointer",
                  onClick: (d) => r.toggleColumn(c)
                }, [
                  c.hidden ? T("", !0) : (m(), b("i", rx)),
                  c.hidden ? (m(), b("i", ox)) : T("", !0),
                  wt(" " + $(c.title) + " ", 1),
                  f("small", ax, $(c.name), 1)
                ], 8, ix)
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
          l.dropdowns ? (m(), b("div", lx, [
            f("button", {
              type: "button",
              class: k([[l.class], "dropdown-toggle"]),
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, [
              f("span", cx, [
                f("i", {
                  class: k([
                    l.icon !== void 0 ? r.getValueOrFunction(l.icon, {
                      button: l,
                      table: this
                    }) : r.getButtonIconClassByAction(l.action)
                  ])
                }, null, 2),
                wt(" " + $(r.translate(l.title)), 1)
              ])
            ], 2),
            f("ul", ux, [
              (m(!0), b(ht, null, mt(l.dropdowns, (c) => (m(), b("li", { key: c }, [
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
                  wt(" " + $(r.translate(c.title)), 1)
                ], 10, hx)
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
          f("tr", dx, [
            (m(!0), b(ht, null, mt(s.settings.table.columns, (l) => (m(), b("th", {
              class: k(["", [l.header ? l.header.class : ""]]),
              style: Xn([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width
            }, [
              f("span", {
                class: k(["d-inline-block no-select text-nowrap", { "cursor-pointer": r.isSortable(l) }]),
                onClick: (c) => r.sortTable(l)
              }, [
                f("span", {
                  innerHTML: l.header && l.header.title !== void 0 ? r.translate(l.header.title) : l.title ? r.translate(l.title) : r.translate(l.name)
                }, null, 8, gx),
                i.config.order[l.name] ? (m(), b("span", {
                  key: 0,
                  class: k(["badge text-bg-light ms-1 p-badge", {
                    "opacity-50": i.config.order[l.name].fixed
                  }])
                }, [
                  i.config.order[l.name].dir === "ASC" ? (m(), b("i", mx)) : T("", !0),
                  i.config.order[l.name].dir === "DESC" ? (m(), b("i", bx)) : T("", !0),
                  wt(" " + $(i.config.order[l.name].idx + 1), 1)
                ], 2)) : T("", !0)
              ], 10, px),
              l.header && l.header.buttons ? (m(), b("span", yx, [
                (m(!0), b(ht, null, mt(l.header.buttons, (c) => (m(), b("button", {
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
                  wt(" " + $(r.translate(c.title)), 1)
                ], 10, vx))), 128))
              ])) : T("", !0)
            ], 14, fx))), 128))
          ]),
          r.countFilters() ? (m(), b("tr", _x, [
            (m(!0), b(ht, null, mt(s.settings.table.columns, (l) => (m(), b("th", {
              style: Xn([l.hidden ? "display: none" : ""]),
              key: l,
              width: l.width,
              class: k([l.filter ? l.filter.class : ""])
            }, [
              l.index && l.click ? (m(), b("div", wx, [
                f("span", {
                  class: k(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: r.haveSelectedRowInPage() }]),
                  onClick: t[2] || (t[2] = (c) => r.toggleSelectedRowInPage())
                }, [
                  vt(f("i", Ax, null, 512), [
                    [Ps, !r.haveSelectedRowInPage()]
                  ]),
                  vt(f("i", Tx, null, 512), [
                    [Ps, r.haveSelectedRowInPage()]
                  ])
                ], 2)
              ])) : T("", !0),
              l.filter && l.filter.type == "text" ? (m(), b("div", Fx, [
                vt(f("input", {
                  type: "text",
                  class: k([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  onKeyup: t[3] || (t[3] = ri((c) => r.reloadTable(), ["enter"]))
                }, null, 42, xx), [
                  [Re, l.filter.value]
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
                }, [...t[17] || (t[17] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ])], 10, Cx)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "number" ? (m(), b("div", Ox, [
                l.filter.operators == !0 ? vt((m(), b("select", {
                  key: 0,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  disabled: l.filter.fixed,
                  onChange: t[4] || (t[4] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", Sx, $(r.translate("=")), 1),
                  f("option", kx, $(r.translate(">")), 1),
                  f("option", Lx, $(r.translate(">=")), 1),
                  f("option", Ix, $(r.translate("<")), 1),
                  f("option", $x, $(r.translate("<=")), 1)
                ], 40, Nx)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? vt((m(), b("select", {
                  key: 1,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  disabled: l.filter.fixed,
                  onChange: t[5] || (t[5] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (m(!0), b(ht, null, mt(l.filter.operators, (c) => (m(), b("option", {
                    key: c,
                    value: c.value
                  }, $(c.label), 9, Rx))), 128))
                ], 40, Dx)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                vt(f("input", {
                  type: "number",
                  class: k(["form-control", {
                    fixed: l.filter.fixed
                  }]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  disabled: l.filter.fixed,
                  min: l.filter.min,
                  max: l.filter.max,
                  onChange: t[6] || (t[6] = (c) => r.reloadTable()),
                  onKeyup: t[7] || (t[7] = ri((c) => r.reloadTable(), ["enter"]))
                }, null, 42, Mx), [
                  [Re, l.filter.value]
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
                }, [...t[18] || (t[18] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ])], 10, Bx)) : T("", !0)
              ])) : T("", !0),
              l.filter && l.filter.type == "select" ? (m(), b("div", qx, [
                l.filter.dropdown ? (m(), b("div", Px, [
                  f("button", Vx, $(l.filter.multiple ? l.filter.value.length + " selected" : l.filter.value ? l.filter.value : "not selected"), 1),
                  f("ul", jx, [
                    f("li", null, [
                      (m(!0), b(ht, null, mt(l.filter.options, (c) => (m(), b("span", {
                        key: c,
                        class: k(["dropdown-item cursor-pointer", { selected: l.filter.multiple ? l.filter.value.indexOf(c.value) >= 0 : l.filter.value === c.value }]),
                        onClick: (d) => r.dropdownSelectToggleOne(l.filter, c)
                      }, [
                        (l.filter.multiple ? l.filter.value.indexOf(c.value) >= 0 : l.filter.value === c.value) ? (m(), b("i", Hx)) : (m(), b("i", Wx)),
                        wt(" " + $(r.translate(c.label ? c.label : c.value)), 1)
                      ], 10, Ux))), 128))
                    ]),
                    l.filter.multiple ? (m(), b("li", zx, [...t[19] || (t[19] = [
                      f("hr", { class: "dropdown-divider" }, null, -1)
                    ])])) : T("", !0),
                    l.filter.multiple ? (m(), b("li", Kx, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectAll(l.filter.value, l.filter.options)
                      }, $(r.translate("Select all")), 9, Gx)
                    ])) : T("", !0),
                    l.filter.multiple ? (m(), b("li", Yx, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectClear(l.filter.value)
                      }, $(r.translate("Unselect all")), 9, Xx)
                    ])) : T("", !0),
                    l.filter.multiple ? (m(), b("li", Zx, [
                      f("span", {
                        class: "dropdown-item cursor-pointer",
                        onClick: (c) => r.dropdownSelectInvert(l.filter.value, l.filter.options)
                      }, $(r.translate("Invert all")), 9, Jx)
                    ])) : T("", !0)
                  ])
                ])) : (m(), b("div", Qx, [
                  vt(f("select", {
                    "onUpdate:modelValue": (c) => l.filter.value = c,
                    onChange: t[8] || (t[8] = (c) => r.reloadTable()),
                    multiple: l.filter.multiple,
                    class: "form-select form-select-sm pe-0"
                  }, [
                    (m(!0), b(ht, null, mt(l.filter.options, (c) => (m(), b("option", {
                      key: c,
                      value: c.value
                    }, $(r.translate(c.label ? c.label : c.value)), 9, eC))), 128))
                  ], 40, tC), [
                    [Ge, l.filter.value]
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
                  }, [...t[20] || (t[20] = [
                    f("i", { class: "bi bi-x" }, null, -1)
                  ])], 10, sC)) : T("", !0)
                ]))
              ])) : T("", !0),
              l.filter && (l.filter.type == "datetime-local" || l.filter.type == "date") ? (m(), b("div", nC, [
                l.filter.operators == !0 ? vt((m(), b("select", {
                  key: 0,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  onChange: t[9] || (t[9] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  f("option", rC, $(r.translate("=")), 1),
                  f("option", oC, $(r.translate(">")), 1),
                  f("option", aC, $(r.translate(">=")), 1),
                  f("option", lC, $(r.translate("<")), 1),
                  f("option", cC, $(r.translate("<=")), 1)
                ], 40, iC)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                l.filter.operators && l.filter.operators.length > 0 ? vt((m(), b("select", {
                  key: 1,
                  "onUpdate:modelValue": (c) => l.filter.operator = c,
                  onChange: t[10] || (t[10] = (c) => r.reloadTable()),
                  class: "form-select form-select-sm pe-0"
                }, [
                  (m(!0), b(ht, null, mt(l.filter.operators, (c) => (m(), b("option", {
                    key: c,
                    value: c.value
                  }, $(r.translate(c.label)), 9, hC))), 128))
                ], 40, uC)), [
                  [Ge, l.filter.operator]
                ]) : T("", !0),
                vt(f("input", {
                  type: l.filter.type,
                  class: k([{
                    fixed: l.filter.fixed
                  }, "form-control form-control-sm"]),
                  "onUpdate:modelValue": (c) => l.filter.value = c,
                  onChange: t[11] || (t[11] = (c) => r.reloadTable()),
                  onKeyup: t[12] || (t[12] = ri((c) => r.reloadTable(), ["enter"]))
                }, null, 42, dC), [
                  [qe, l.filter.value]
                ]),
                f("button", {
                  class: k(["btn btn-outline-secondary", {
                    "opacity-25": !l.filter.value
                  }]),
                  disabled: !l.filter.value,
                  onClick: (c) => {
                    l.filter.value = void 0, r.reloadTable();
                  }
                }, [...t[21] || (t[21] = [
                  f("i", { class: "bi bi-x" }, null, -1)
                ])], 10, fC)
              ])) : T("", !0),
              l.filter && l.filter.buttons ? (m(), b("span", {
                key: 5,
                class: k(
                  r.getValueOrFunction(l.filter.buttons, {
                    column: l
                  })
                )
              }, [
                (m(!0), b(ht, null, mt(l.filter.buttons, (c) => (m(), b("span", {
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
                    wt(" " + $(r.translate(c.title)), 1)
                  ], 10, pC)
                ]))), 128))
              ], 2)) : T("", !0)
            ], 14, Ex))), 128))
          ])) : T("", !0)
        ]),
        f("tbody", null, [
          (m(!0), b(ht, null, mt(this.items, (l, c) => (m(), b(ht, {
            key: l.id
          }, [
            f("tr", gC, [
              (m(!0), b(ht, null, mt(s.settings.table.columns, (d) => (m(), b("td", {
                style: Xn([d.hidden ? "display: none" : ""]),
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
                d.index ? (m(), b("div", bC, [
                  f("span", {
                    class: k(["cursor-pointer badge border badge-index p-1 w-100", {
                      selected: i.selected.indexOf(l[s.settings.pkey]) >= 0
                    }]),
                    innerHTML: c + 1 + (i.config.pagination.page - 1) * i.config.pagination.limit
                  }, null, 10, yC)
                ])) : T("", !0),
                !d.template && !d.input && !d.progressbar ? (m(), b("span", vC, $(r.tableCellValue(d.name, l, c, d)), 1)) : T("", !0),
                d.template ? (m(), b("span", {
                  key: 2,
                  innerHTML: r.tableCellTemplate(d.template, l, c, d)
                }, null, 8, _C)) : T("", !0),
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
                    style: Xn({ width: Math.round(l[d.name] / d.progressbar.max * 100) + "%" })
                  }, [
                    d.progressbar.value ? (m(), b("span", wC, $(l[d.name]), 1)) : T("", !0)
                  ], 6)
                ], 8, EC)) : T("", !0),
                d.input ? (m(), b("div", AC, [
                  d.input.prefix ? (m(), b("span", {
                    key: 0,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.prefix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, TC)) : T("", !0),
                  d.input.prefixcheck ? (m(), b("span", FC, [
                    vt(f("input", {
                      class: "form-check p-0 m-0",
                      type: "checkbox",
                      name: d.input.prefixcheck.name,
                      "onUpdate:modelValue": (h) => l[d.input.prefixcheck.name] = h,
                      onChange: (h) => r.onRowInputChange(l[d.input.prefixcheck.name], d, l, c)
                    }, null, 40, xC), [
                      [lr, l[d.input.prefixcheck.name]]
                    ])
                  ])) : T("", !0),
                  ["text", "number", "date", "datetime-local"].indexOf(
                    d.input.type
                  ) >= 0 ? vt((m(), b("input", {
                    key: 2,
                    type: d.input.type,
                    class: k(["form-control form-control-sm", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, c),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, null, 42, CC)), [
                    [qe, l[d.name]]
                  ]) : T("", !0),
                  d.input.type == "select" ? vt((m(), b("select", {
                    key: 3,
                    class: k(["form-select form-select-sm pe-0", r.getValueOrFunction(d.input.class, {
                      column: d,
                      item: l
                    })]),
                    onChange: (h) => r.onRowInputChange(l[d.name], d, l, c),
                    "onUpdate:modelValue": (h) => l[d.name] = h
                  }, [
                    (m(!0), b(ht, null, mt(d.input.options, (h) => (m(), b("option", {
                      value: h.value,
                      key: h
                    }, $(r.translate(h.label)), 9, NC))), 128))
                  ], 42, OC)), [
                    [Ge, l[d.name]]
                  ]) : T("", !0),
                  d.input.suffix ? (m(), b("span", {
                    key: 4,
                    class: "input-group-text",
                    innerHTML: r.getValueOrFunction(d.input.suffix, {
                      column: d,
                      item: l
                    })
                  }, null, 8, SC)) : T("", !0),
                  d.input.suffixcheck ? (m(), b("span", kC, [
                    vt(f("input", {
                      class: "form-check p-0 m-0",
                      type: "checkbox",
                      name: d.input.suffixcheck.name,
                      "onUpdate:modelValue": (h) => l[d.input.suffixcheck.name] = h,
                      onChange: (h) => r.onRowInputChange(l[d.input.suffixcheck.name], d, l, c)
                    }, null, 40, LC), [
                      [lr, l[d.input.suffixcheck.name]]
                    ])
                  ])) : T("", !0)
                ])) : T("", !0),
                d.buttons ? (m(), b("span", IC, [
                  (m(!0), b(ht, null, mt(d.buttons, (h) => (m(), b("span", {
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
                      }, null, 8, DC)) : (m(), b("span", RC, $(r.translate(h.title)), 1))
                    ], 10, $C))
                  ]))), 128))
                ])) : T("", !0)
              ], 14, mC))), 128))
            ]),
            s.settings.table.details && i.details.indexOf(l[s.settings.pkey]) >= 0 ? (m(), b("tr", MC, [
              f("td", {
                class: k([s.settings.table.details.class]),
                colspan: s.settings.table.columns.length
              }, [
                (m(!0), b(ht, null, mt(s.settings.table.details.fields, (d) => (m(), b("div", {
                  class: "m-0",
                  key: d
                }, [
                  f("div", qC, [
                    f("div", {
                      class: k(["col text-end", [d.class]])
                    }, [
                      f("label", PC, $(d.label), 1)
                    ], 2),
                    f("div", {
                      class: k(["col", [d.input.class]])
                    }, [
                      ["select", "textarea"].indexOf(d.input.type) < 0 ? vt((m(), b("input", {
                        key: 0,
                        type: d.input.type,
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, null, 40, VC)), [
                        [qe, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "textarea" ? vt((m(), b("textarea", {
                        key: 1,
                        class: "form-control form-control-sm",
                        rows: "3",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, `\r
                    `, 40, jC)), [
                        [Re, l[d.name]]
                      ]) : T("", !0),
                      d.input.type == "select" ? vt((m(), b("select", {
                        key: 2,
                        class: "form-select form-select-sm pe-0",
                        "onUpdate:modelValue": (h) => l[d.name] = h,
                        onChange: (h) => r.onRowInputChange(l[d.name], d, l, c)
                      }, [
                        (m(!0), b(ht, null, mt(d.input.options, (h) => (m(), b("option", {
                          value: h.value,
                          key: h
                        }, $(r.translate(h.label)), 9, HC))), 128))
                      ], 40, UC)), [
                        [Ge, l[d.name]]
                      ]) : T("", !0)
                    ], 2)
                  ])
                ]))), 128)),
                f("span", {
                  innerHTML: s.settings.table.details.raw(l)
                }, null, 8, WC),
                s.settings.debug > 1 ? (m(), b("pre", zC, "                  " + $(l) + `
                `, 1)) : T("", !0)
              ], 10, BC)
            ])) : T("", !0)
          ], 64))), 128))
        ]),
        f("tfoot", null, [
          i.selected.length > 0 ? (m(), b("tr", KC, [
            (m(!0), b(ht, null, mt(s.settings.table.columns, (l) => (m(), b("td", {
              style: Xn([l.hidden ? "display: none" : ""]),
              key: l.name,
              "data-label": l.title,
              width: l.width,
              class: k(l.class)
            }, [
              l.index ? (m(), b("div", YC, [
                f("span", {
                  class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
                  onClick: t[13] || (t[13] = (c) => r.toggleSelectedAll())
                }, $(i.selected.length), 1)
              ])) : T("", !0),
              l.input && l.bulk && l.bulk.enabled ? (m(), b("div", XC, [
                ["text", "number", "date", "datetime-local"].indexOf(
                  l.input.type
                ) >= 0 ? vt((m(), b("input", {
                  key: 0,
                  type: l.input.type,
                  class: k(["form-control form-control-sm", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (c) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (c) => i.bulkitem[l.name] = c
                }, null, 42, ZC)), [
                  [qe, i.bulkitem[l.name]]
                ]) : T("", !0),
                l.input.type == "select" ? vt((m(), b("select", {
                  key: 1,
                  class: k(["form-select form-select-sm pe-0", l.input.class]),
                  disabled: i.bulkinputs.indexOf(l.name) < 0,
                  onChange: (c) => r.onBulkInputChange(i.bulkitem[l.name], i.bulkitem, l),
                  "onUpdate:modelValue": (c) => i.bulkitem[l.name] = c
                }, [
                  (m(!0), b(ht, null, mt(l.input.options, (c) => (m(), b("option", {
                    value: c.value,
                    key: c
                  }, $(r.translate(c.label)), 9, QC))), 128))
                ], 42, JC)), [
                  [Ge, i.bulkitem[l.name]]
                ]) : T("", !0),
                f("span", {
                  class: "input-group-text cursor-pointer",
                  onClick: (c) => r.ifBulkInputClick(l)
                }, [
                  i.bulkitem[l.name] === void 0 ? (m(), b("i", eO)) : (m(), b("i", sO))
                ], 8, tO)
              ])) : T("", !0),
              l.bulk ? (m(), b("span", nO, [
                (m(!0), b(ht, null, mt(l.bulk.buttons, (c) => (m(), b("span", {
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
                    }, null, 8, rO)) : (m(), b("span", oO, $(r.translate(c.title)), 1))
                  ], 10, iO)
                ]))), 128))
              ])) : T("", !0)
            ], 14, GC))), 128))
          ])) : T("", !0)
        ])
      ], 2)) : T("", !0),
      ar(o, {
        settings: s.settings,
        config: i.config,
        ui: i.ui,
        onSetPage: r.setPage,
        onSetPageLimit: r.setPageLimit,
        onTranslate: r.translate
      }, null, 8, ["settings", "config", "ui", "onSetPage", "onSetPageLimit", "onTranslate"])
    ], 10, qF)) : T("", !0),
    f("div", {
      class: "modal shadow",
      id: i.modalId,
      tabindex: "-1"
    }, [
      f("div", lO, [
        f("div", cO, [
          r.authAndSettings() && s.settings.form.visible && s.settings.form.groups ? (m(), hs(a, {
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
    ], 8, aO)
  ]);
}
const hO = /* @__PURE__ */ Se(BF, [["render", uO]]), dO = {
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
    VuAdminTable: hO
  }
}, fO = dO, pO = { key: 0 }, gO = ["data-bs-theme"];
function mO(e, t, s, n, i, r) {
  const o = Be("vu-admin-table");
  return e.entity && e.settings ? (m(), b("div", pO, [
    e.auth ? (m(), b("div", {
      key: 0,
      class: "vu-admin",
      "data-bs-theme": [e.settings.theme]
    }, [
      ar(o, {
        settings: e.settings,
        auth: e.auth
      }, null, 8, ["settings", "auth"])
    ], 8, gO)) : T("", !0)
  ])) : T("", !0);
}
const WN = /* @__PURE__ */ Se(fO, [["render", mO]]);
var Jo = { exports: {} };
var tu;
function bO() {
  return tu || (tu = 1, (function(e) {
    (function() {
      var t = "input is invalid type", s = "finalize already called", n = typeof window == "object", i = n ? window : {};
      i.JS_SHA512_NO_WINDOW && (n = !1);
      var r = !n && typeof self == "object", o = !i.JS_SHA512_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
      o ? i = ds : r && (i = self);
      var a = !i.JS_SHA512_NO_COMMON_JS && !0 && e.exports, l = !i.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", c = "0123456789abcdef".split(""), d = [-2147483648, 8388608, 32768, 128], h = [24, 16, 8, 0], g = [
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
      var N = ArrayBuffer.isView;
      l && (i.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !N) && (N = function(C) {
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
        if (!F(C) && !N(C))
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
        for (var y = P[1], x, w = 0, O, R = C.length, A = this.blocks; w < R; ) {
          if (this.hashed && (this.hashed = !1, A[0] = this.block, this.block = A[1] = A[2] = A[3] = A[4] = A[5] = A[6] = A[7] = A[8] = A[9] = A[10] = A[11] = A[12] = A[13] = A[14] = A[15] = A[16] = A[17] = A[18] = A[19] = A[20] = A[21] = A[22] = A[23] = A[24] = A[25] = A[26] = A[27] = A[28] = A[29] = A[30] = A[31] = A[32] = 0), y)
            for (O = this.start; w < R && O < 128; ++w)
              x = C.charCodeAt(w), x < 128 ? A[O >>> 2] |= x << h[O++ & 3] : x < 2048 ? (A[O >>> 2] |= (192 | x >>> 6) << h[O++ & 3], A[O >>> 2] |= (128 | x & 63) << h[O++ & 3]) : x < 55296 || x >= 57344 ? (A[O >>> 2] |= (224 | x >>> 12) << h[O++ & 3], A[O >>> 2] |= (128 | x >>> 6 & 63) << h[O++ & 3], A[O >>> 2] |= (128 | x & 63) << h[O++ & 3]) : (x = 65536 + ((x & 1023) << 10 | C.charCodeAt(++w) & 1023), A[O >>> 2] |= (240 | x >>> 18) << h[O++ & 3], A[O >>> 2] |= (128 | x >>> 12 & 63) << h[O++ & 3], A[O >>> 2] |= (128 | x >>> 6 & 63) << h[O++ & 3], A[O >>> 2] |= (128 | x & 63) << h[O++ & 3]);
          else
            for (O = this.start; w < R && O < 128; ++w)
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
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, O = this.h2l, R = this.h3h, A = this.h3l, S = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, et = this.h6h, Q = this.h6l, rt = this.h7h, nt = this.h7l, H = this.blocks, Z, bt, tt, pt, gt, M, B, q, J, Dt, ve, ke, ss, ns, Xt, oe, _e, Ht, xt, at, ct, _t, Et, Zt, Nt;
        for (Z = 32; Z < 160; Z += 2)
          at = H[Z - 30], ct = H[Z - 29], bt = (at >>> 1 | ct << 31) ^ (at >>> 8 | ct << 24) ^ at >>> 7, tt = (ct >>> 1 | at << 31) ^ (ct >>> 8 | at << 24) ^ (ct >>> 7 | at << 25), at = H[Z - 4], ct = H[Z - 3], pt = (at >>> 19 | ct << 13) ^ (ct >>> 29 | at << 3) ^ at >>> 6, gt = (ct >>> 19 | at << 13) ^ (at >>> 29 | ct << 3) ^ (ct >>> 6 | at << 26), at = H[Z - 32], ct = H[Z - 31], _t = H[Z - 14], Et = H[Z - 13], M = (Et & 65535) + (ct & 65535) + (tt & 65535) + (gt & 65535), B = (Et >>> 16) + (ct >>> 16) + (tt >>> 16) + (gt >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (bt & 65535) + (pt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (bt >>> 16) + (pt >>> 16) + (q >>> 16), H[Z] = J << 16 | q & 65535, H[Z + 1] = B << 16 | M & 65535;
        var Wt = C, zt = P, Kt = y, Rt = x, kt = w, qt = O, Mt = R, Lt = A, Ct = S, Bt = z, Pt = K, It = U, Vt = et, $t = Q, jt = rt, Ut = nt;
        for (oe = Kt & kt, _e = Rt & qt, Z = 0; Z < 160; Z += 8)
          bt = (Wt >>> 28 | zt << 4) ^ (zt >>> 2 | Wt << 30) ^ (zt >>> 7 | Wt << 25), tt = (zt >>> 28 | Wt << 4) ^ (Wt >>> 2 | zt << 30) ^ (Wt >>> 7 | zt << 25), pt = (Ct >>> 14 | Bt << 18) ^ (Ct >>> 18 | Bt << 14) ^ (Bt >>> 9 | Ct << 23), gt = (Bt >>> 14 | Ct << 18) ^ (Bt >>> 18 | Ct << 14) ^ (Ct >>> 9 | Bt << 23), Dt = Wt & Kt, ve = zt & Rt, Ht = Dt ^ Wt & kt ^ oe, xt = ve ^ zt & qt ^ _e, Zt = Ct & Pt ^ ~Ct & Vt, Nt = Bt & It ^ ~Bt & $t, at = H[Z], ct = H[Z + 1], _t = g[Z], Et = g[Z + 1], M = (Et & 65535) + (ct & 65535) + (Nt & 65535) + (gt & 65535) + (Ut & 65535), B = (Et >>> 16) + (ct >>> 16) + (Nt >>> 16) + (gt >>> 16) + (Ut >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (Zt & 65535) + (pt & 65535) + (jt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Zt >>> 16) + (pt >>> 16) + (jt >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | M & 65535, M = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (M >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | M & 65535, M = (Lt & 65535) + (ct & 65535), B = (Lt >>> 16) + (ct >>> 16) + (M >>> 16), q = (Mt & 65535) + (at & 65535) + (B >>> 16), J = (Mt >>> 16) + (at >>> 16) + (q >>> 16), jt = J << 16 | q & 65535, Ut = B << 16 | M & 65535, M = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), Mt = J << 16 | q & 65535, Lt = B << 16 | M & 65535, bt = (Mt >>> 28 | Lt << 4) ^ (Lt >>> 2 | Mt << 30) ^ (Lt >>> 7 | Mt << 25), tt = (Lt >>> 28 | Mt << 4) ^ (Mt >>> 2 | Lt << 30) ^ (Mt >>> 7 | Lt << 25), pt = (jt >>> 14 | Ut << 18) ^ (jt >>> 18 | Ut << 14) ^ (Ut >>> 9 | jt << 23), gt = (Ut >>> 14 | jt << 18) ^ (Ut >>> 18 | jt << 14) ^ (jt >>> 9 | Ut << 23), ke = Mt & Wt, ss = Lt & zt, Ht = ke ^ Mt & Kt ^ Dt, xt = ss ^ Lt & Rt ^ ve, Zt = jt & Ct ^ ~jt & Pt, Nt = Ut & Bt ^ ~Ut & It, at = H[Z + 2], ct = H[Z + 3], _t = g[Z + 2], Et = g[Z + 3], M = (Et & 65535) + (ct & 65535) + (Nt & 65535) + (gt & 65535) + ($t & 65535), B = (Et >>> 16) + (ct >>> 16) + (Nt >>> 16) + (gt >>> 16) + ($t >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (Zt & 65535) + (pt & 65535) + (Vt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Zt >>> 16) + (pt >>> 16) + (Vt >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | M & 65535, M = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (M >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | M & 65535, M = (qt & 65535) + (ct & 65535), B = (qt >>> 16) + (ct >>> 16) + (M >>> 16), q = (kt & 65535) + (at & 65535) + (B >>> 16), J = (kt >>> 16) + (at >>> 16) + (q >>> 16), Vt = J << 16 | q & 65535, $t = B << 16 | M & 65535, M = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), kt = J << 16 | q & 65535, qt = B << 16 | M & 65535, bt = (kt >>> 28 | qt << 4) ^ (qt >>> 2 | kt << 30) ^ (qt >>> 7 | kt << 25), tt = (qt >>> 28 | kt << 4) ^ (kt >>> 2 | qt << 30) ^ (kt >>> 7 | qt << 25), pt = (Vt >>> 14 | $t << 18) ^ (Vt >>> 18 | $t << 14) ^ ($t >>> 9 | Vt << 23), gt = ($t >>> 14 | Vt << 18) ^ ($t >>> 18 | Vt << 14) ^ (Vt >>> 9 | $t << 23), ns = kt & Mt, Xt = qt & Lt, Ht = ns ^ kt & Wt ^ ke, xt = Xt ^ qt & zt ^ ss, Zt = Vt & jt ^ ~Vt & Ct, Nt = $t & Ut ^ ~$t & Bt, at = H[Z + 4], ct = H[Z + 5], _t = g[Z + 4], Et = g[Z + 5], M = (Et & 65535) + (ct & 65535) + (Nt & 65535) + (gt & 65535) + (It & 65535), B = (Et >>> 16) + (ct >>> 16) + (Nt >>> 16) + (gt >>> 16) + (It >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (Zt & 65535) + (pt & 65535) + (Pt & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Zt >>> 16) + (pt >>> 16) + (Pt >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | M & 65535, M = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (M >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | M & 65535, M = (Rt & 65535) + (ct & 65535), B = (Rt >>> 16) + (ct >>> 16) + (M >>> 16), q = (Kt & 65535) + (at & 65535) + (B >>> 16), J = (Kt >>> 16) + (at >>> 16) + (q >>> 16), Pt = J << 16 | q & 65535, It = B << 16 | M & 65535, M = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), Kt = J << 16 | q & 65535, Rt = B << 16 | M & 65535, bt = (Kt >>> 28 | Rt << 4) ^ (Rt >>> 2 | Kt << 30) ^ (Rt >>> 7 | Kt << 25), tt = (Rt >>> 28 | Kt << 4) ^ (Kt >>> 2 | Rt << 30) ^ (Kt >>> 7 | Rt << 25), pt = (Pt >>> 14 | It << 18) ^ (Pt >>> 18 | It << 14) ^ (It >>> 9 | Pt << 23), gt = (It >>> 14 | Pt << 18) ^ (It >>> 18 | Pt << 14) ^ (Pt >>> 9 | It << 23), oe = Kt & kt, _e = Rt & qt, Ht = oe ^ Kt & Mt ^ ns, xt = _e ^ Rt & Lt ^ Xt, Zt = Pt & Vt ^ ~Pt & jt, Nt = It & $t ^ ~It & Ut, at = H[Z + 6], ct = H[Z + 7], _t = g[Z + 6], Et = g[Z + 7], M = (Et & 65535) + (ct & 65535) + (Nt & 65535) + (gt & 65535) + (Bt & 65535), B = (Et >>> 16) + (ct >>> 16) + (Nt >>> 16) + (gt >>> 16) + (Bt >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (Zt & 65535) + (pt & 65535) + (Ct & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (Zt >>> 16) + (pt >>> 16) + (Ct >>> 16) + (q >>> 16), at = J << 16 | q & 65535, ct = B << 16 | M & 65535, M = (xt & 65535) + (tt & 65535), B = (xt >>> 16) + (tt >>> 16) + (M >>> 16), q = (Ht & 65535) + (bt & 65535) + (B >>> 16), J = (Ht >>> 16) + (bt >>> 16) + (q >>> 16), _t = J << 16 | q & 65535, Et = B << 16 | M & 65535, M = (zt & 65535) + (ct & 65535), B = (zt >>> 16) + (ct >>> 16) + (M >>> 16), q = (Wt & 65535) + (at & 65535) + (B >>> 16), J = (Wt >>> 16) + (at >>> 16) + (q >>> 16), Ct = J << 16 | q & 65535, Bt = B << 16 | M & 65535, M = (Et & 65535) + (ct & 65535), B = (Et >>> 16) + (ct >>> 16) + (M >>> 16), q = (_t & 65535) + (at & 65535) + (B >>> 16), J = (_t >>> 16) + (at >>> 16) + (q >>> 16), Wt = J << 16 | q & 65535, zt = B << 16 | M & 65535;
        M = (P & 65535) + (zt & 65535), B = (P >>> 16) + (zt >>> 16) + (M >>> 16), q = (C & 65535) + (Wt & 65535) + (B >>> 16), J = (C >>> 16) + (Wt >>> 16) + (q >>> 16), this.h0h = J << 16 | q & 65535, this.h0l = B << 16 | M & 65535, M = (x & 65535) + (Rt & 65535), B = (x >>> 16) + (Rt >>> 16) + (M >>> 16), q = (y & 65535) + (Kt & 65535) + (B >>> 16), J = (y >>> 16) + (Kt >>> 16) + (q >>> 16), this.h1h = J << 16 | q & 65535, this.h1l = B << 16 | M & 65535, M = (O & 65535) + (qt & 65535), B = (O >>> 16) + (qt >>> 16) + (M >>> 16), q = (w & 65535) + (kt & 65535) + (B >>> 16), J = (w >>> 16) + (kt >>> 16) + (q >>> 16), this.h2h = J << 16 | q & 65535, this.h2l = B << 16 | M & 65535, M = (A & 65535) + (Lt & 65535), B = (A >>> 16) + (Lt >>> 16) + (M >>> 16), q = (R & 65535) + (Mt & 65535) + (B >>> 16), J = (R >>> 16) + (Mt >>> 16) + (q >>> 16), this.h3h = J << 16 | q & 65535, this.h3l = B << 16 | M & 65535, M = (z & 65535) + (Bt & 65535), B = (z >>> 16) + (Bt >>> 16) + (M >>> 16), q = (S & 65535) + (Ct & 65535) + (B >>> 16), J = (S >>> 16) + (Ct >>> 16) + (q >>> 16), this.h4h = J << 16 | q & 65535, this.h4l = B << 16 | M & 65535, M = (U & 65535) + (It & 65535), B = (U >>> 16) + (It >>> 16) + (M >>> 16), q = (K & 65535) + (Pt & 65535) + (B >>> 16), J = (K >>> 16) + (Pt >>> 16) + (q >>> 16), this.h5h = J << 16 | q & 65535, this.h5l = B << 16 | M & 65535, M = (Q & 65535) + ($t & 65535), B = (Q >>> 16) + ($t >>> 16) + (M >>> 16), q = (et & 65535) + (Vt & 65535) + (B >>> 16), J = (et >>> 16) + (Vt >>> 16) + (q >>> 16), this.h6h = J << 16 | q & 65535, this.h6l = B << 16 | M & 65535, M = (nt & 65535) + (Ut & 65535), B = (nt >>> 16) + (Ut >>> 16) + (M >>> 16), q = (rt & 65535) + (jt & 65535) + (B >>> 16), J = (rt >>> 16) + (jt >>> 16) + (q >>> 16), this.h7h = J << 16 | q & 65535, this.h7l = B << 16 | M & 65535;
      }, X.prototype.hex = function() {
        this.finalize();
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, O = this.h2l, R = this.h3h, A = this.h3l, S = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, et = this.h6h, Q = this.h6l, rt = this.h7h, nt = this.h7l, H = this.bits, Z = c[C >>> 28 & 15] + c[C >>> 24 & 15] + c[C >>> 20 & 15] + c[C >>> 16 & 15] + c[C >>> 12 & 15] + c[C >>> 8 & 15] + c[C >>> 4 & 15] + c[C & 15] + c[P >>> 28 & 15] + c[P >>> 24 & 15] + c[P >>> 20 & 15] + c[P >>> 16 & 15] + c[P >>> 12 & 15] + c[P >>> 8 & 15] + c[P >>> 4 & 15] + c[P & 15] + c[y >>> 28 & 15] + c[y >>> 24 & 15] + c[y >>> 20 & 15] + c[y >>> 16 & 15] + c[y >>> 12 & 15] + c[y >>> 8 & 15] + c[y >>> 4 & 15] + c[y & 15] + c[x >>> 28 & 15] + c[x >>> 24 & 15] + c[x >>> 20 & 15] + c[x >>> 16 & 15] + c[x >>> 12 & 15] + c[x >>> 8 & 15] + c[x >>> 4 & 15] + c[x & 15] + c[w >>> 28 & 15] + c[w >>> 24 & 15] + c[w >>> 20 & 15] + c[w >>> 16 & 15] + c[w >>> 12 & 15] + c[w >>> 8 & 15] + c[w >>> 4 & 15] + c[w & 15] + c[O >>> 28 & 15] + c[O >>> 24 & 15] + c[O >>> 20 & 15] + c[O >>> 16 & 15] + c[O >>> 12 & 15] + c[O >>> 8 & 15] + c[O >>> 4 & 15] + c[O & 15] + c[R >>> 28 & 15] + c[R >>> 24 & 15] + c[R >>> 20 & 15] + c[R >>> 16 & 15] + c[R >>> 12 & 15] + c[R >>> 8 & 15] + c[R >>> 4 & 15] + c[R & 15];
        return H >= 256 && (Z += c[A >>> 28 & 15] + c[A >>> 24 & 15] + c[A >>> 20 & 15] + c[A >>> 16 & 15] + c[A >>> 12 & 15] + c[A >>> 8 & 15] + c[A >>> 4 & 15] + c[A & 15]), H >= 384 && (Z += c[S >>> 28 & 15] + c[S >>> 24 & 15] + c[S >>> 20 & 15] + c[S >>> 16 & 15] + c[S >>> 12 & 15] + c[S >>> 8 & 15] + c[S >>> 4 & 15] + c[S & 15] + c[z >>> 28 & 15] + c[z >>> 24 & 15] + c[z >>> 20 & 15] + c[z >>> 16 & 15] + c[z >>> 12 & 15] + c[z >>> 8 & 15] + c[z >>> 4 & 15] + c[z & 15] + c[K >>> 28 & 15] + c[K >>> 24 & 15] + c[K >>> 20 & 15] + c[K >>> 16 & 15] + c[K >>> 12 & 15] + c[K >>> 8 & 15] + c[K >>> 4 & 15] + c[K & 15] + c[U >>> 28 & 15] + c[U >>> 24 & 15] + c[U >>> 20 & 15] + c[U >>> 16 & 15] + c[U >>> 12 & 15] + c[U >>> 8 & 15] + c[U >>> 4 & 15] + c[U & 15]), H == 512 && (Z += c[et >>> 28 & 15] + c[et >>> 24 & 15] + c[et >>> 20 & 15] + c[et >>> 16 & 15] + c[et >>> 12 & 15] + c[et >>> 8 & 15] + c[et >>> 4 & 15] + c[et & 15] + c[Q >>> 28 & 15] + c[Q >>> 24 & 15] + c[Q >>> 20 & 15] + c[Q >>> 16 & 15] + c[Q >>> 12 & 15] + c[Q >>> 8 & 15] + c[Q >>> 4 & 15] + c[Q & 15] + c[rt >>> 28 & 15] + c[rt >>> 24 & 15] + c[rt >>> 20 & 15] + c[rt >>> 16 & 15] + c[rt >>> 12 & 15] + c[rt >>> 8 & 15] + c[rt >>> 4 & 15] + c[rt & 15] + c[nt >>> 28 & 15] + c[nt >>> 24 & 15] + c[nt >>> 20 & 15] + c[nt >>> 16 & 15] + c[nt >>> 12 & 15] + c[nt >>> 8 & 15] + c[nt >>> 4 & 15] + c[nt & 15]), Z;
      }, X.prototype.toString = X.prototype.hex, X.prototype.digest = function() {
        this.finalize();
        var C = this.h0h, P = this.h0l, y = this.h1h, x = this.h1l, w = this.h2h, O = this.h2l, R = this.h3h, A = this.h3l, S = this.h4h, z = this.h4l, K = this.h5h, U = this.h5l, et = this.h6h, Q = this.h6l, rt = this.h7h, nt = this.h7l, H = this.bits, Z = [
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
          for (var O = [], R = C.length, A = 0, S, x = 0; x < R; ++x)
            S = C.charCodeAt(x), S < 128 ? O[A++] = S : S < 2048 ? (O[A++] = 192 | S >>> 6, O[A++] = 128 | S & 63) : S < 55296 || S >= 57344 ? (O[A++] = 224 | S >>> 12, O[A++] = 128 | S >>> 6 & 63, O[A++] = 128 | S & 63) : (S = 65536 + ((S & 1023) << 10 | C.charCodeAt(++x) & 1023), O[A++] = 240 | S >>> 18, O[A++] = 128 | S >>> 12 & 63, O[A++] = 128 | S >>> 6 & 63, O[A++] = 128 | S & 63);
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
  })(Jo)), Jo.exports;
}
var yO = bO();
Pa();
const vO = {
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
    VuAdminForm: od
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
        s = yO.sha512(s);
      return s;
    },
    authUpdate() {
      this.$emit("update:modelValue", this.auth);
    },
    handleEscapeKey(e) {
      e.key === "Escape" && this.close();
    },
    getValueOrFunction(e, t) {
      return Qs(e, t, this.settings, this);
    },
    translate(e, t, s) {
      return qn(e, this.settings.translate, t, s || this.settings.language);
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
    }), console.log(this.auth), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.detectQuery(), this.settings.debug && console.log("vu-auth mounted ", "1.2.136");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }
}, _O = vO, EO = ["data-bs-theme"], wO = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, AO = { class: "position-absolute top-0 end-0 p-0 m-2" }, TO = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary"
}, FO = { class: "text-center mt-2 mb-4" }, xO = {
  key: 0,
  class: "mb-3"
}, CO = {
  for: "email",
  class: "form-label text-primary"
}, OO = { class: "input-group" }, NO = ["type", "placeholder", "disabled"], SO = ["innerHTML"], kO = { class: "mb-3" }, LO = {
  key: 0,
  for: "password",
  class: "form-label text-primary"
}, IO = { class: "input-group" }, $O = ["type", "placeholder", "pattern", "minlength", "disabled"], DO = {
  key: 0,
  class: "bi bi-eye"
}, RO = {
  key: 1,
  class: "bi bi-eye-slash"
}, MO = ["innerHTML"], BO = {
  key: 0,
  class: "mb-4"
}, qO = {
  for: "password_again",
  class: "form-label text-primary"
}, PO = ["innerHTML"], VO = { class: "input-group" }, jO = ["type", "placeholder", "minlength", "disabled"], UO = {
  key: 0,
  class: "bi bi-eye"
}, HO = {
  key: 1,
  class: "bi bi-eye-slash"
}, WO = ["innerHTML"], zO = { class: "mb-3 text-center" }, KO = ["data-sitekey"], GO = {
  key: 2,
  class: "mb-4 text-center"
}, YO = ["innerHTML"], XO = {
  key: 3,
  class: "d-flex mb-4"
}, ZO = ["innerHTML"], JO = { class: "row" }, QO = { class: "mb-3" }, tN = ["for", "innerHTML"], eN = { class: "input-group" }, sN = ["innerHTML"], nN = ["disabled", "required", "onUpdate:modelValue", "multiple"], iN = ["value", "innerHTML"], rN = ["id", "name", "type", "onUpdate:modelValue", "placeholder", "required", "disabled"], oN = ["innerHTML"], aN = ["innerHTML"], lN = {
  key: 0,
  class: "form-check"
}, cN = ["id", "name", "onUpdate:modelValue", "required", "disabled"], uN = ["for", "innerHTML"], hN = {
  key: 4,
  class: "mt-4"
}, dN = ["innerHTML"], fN = {
  key: 5,
  class: "mt-3 text-center"
}, pN = ["innerHTML"], gN = { class: "mt-4 d-flex justify-content-between" }, mN = ["disabled"], bN = ["disabled"], yN = ["disabled"], vN = {
  key: 0,
  class: "bi bi-person-plus mx-1"
}, _N = {
  key: 1,
  class: "bi bi-arrow-right-square mx-1"
}, EN = { class: "mt-2 text-end" }, wN = ["disabled"], AN = ["id"], TN = { class: "modal-dialog modal-xl" }, FN = { class: "modal-content h-100" };
function xN(e, t, s, n, i, r) {
  const o = Be("VuAdminForm");
  return e.auth && e.auth.visible ? (m(), b("div", {
    key: 0,
    class: "vua-auth",
    "data-bs-theme": [e.theme]
  }, [
    f("div", {
      class: "row d-flex justify-content-center align-items-center min-vh-100",
      onClick: t[14] || (t[14] = Jt((...a) => e.close && e.close(...a), ["stop"]))
    }, [
      f("div", wO, [
        f("div", {
          class: "card shadow p-4 position-relative",
          onClick: t[13] || (t[13] = Jt(() => {
          }, ["stop"]))
        }, [
          f("div", AO, [
            e.loading ? (m(), b("i", TO)) : T("", !0),
            f("button", {
              type: "button",
              class: "btn p-2",
              onClick: t[0] || (t[0] = Jt((...a) => e.close && e.close(...a), ["stop"]))
            }, [...t[16] || (t[16] = [
              f("i", { class: "bi bi-x px-1 text-muted" }, null, -1)
            ])])
          ]),
          f("h1", FO, $(e.settings.title[e.auth.panel]), 1),
          f("form", {
            onSubmit: t[11] || (t[11] = Jt((a) => e.handleSubmit(), ["prevent"])),
            onClick: t[12] || (t[12] = Jt(() => {
            }, ["stop"]))
          }, [
            e.auth.panel != "activation" && e.auth.panel != "password" ? (m(), b("div", xO, [
              f("label", CO, $(e.settings.username.label), 1),
              f("div", OO, [
                e.settings.username.icon ? (m(), b("span", {
                  key: 0,
                  class: k(["input-group-text", { "rounded-bottom-0": e.settings.username.help }])
                }, [
                  f("i", {
                    class: k([e.settings.username.icon])
                  }, null, 2)
                ], 2)) : T("", !0),
                vt(f("input", {
                  id: "email",
                  name: "email",
                  type: e.settings.username.type,
                  "onUpdate:modelValue": t[1] || (t[1] = (a) => e.username = a),
                  class: k(["form-control", { "rounded-bottom-0": e.settings.username.help }]),
                  placeholder: e.settings.username.placeholder,
                  required: "",
                  disabled: e.loading
                }, null, 10, NO), [
                  [qe, e.username]
                ])
              ]),
              e.settings.username.help ? (m(), b("small", {
                key: 0,
                class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                innerHTML: e.settings.username.help
              }, null, 8, SO)) : T("", !0)
            ])) : T("", !0),
            e.auth.panel != "forgot" && e.auth.panel != "activation" ? (m(), b(ht, { key: 1 }, [
              f("div", kO, [
                e.settings.password.label ? (m(), b("label", LO, $(e.settings.password.label), 1)) : T("", !0),
                f("div", IO, [
                  e.settings.password.icon ? (m(), b("span", {
                    key: 0,
                    class: k(["input-group-text", { "rounded-bottom-0": (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help }])
                  }, [
                    f("i", {
                      class: k([e.settings.password.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  vt(f("input", {
                    id: "password",
                    name: "password",
                    type: e.settings.password.type,
                    "onUpdate:modelValue": t[2] || (t[2] = (a) => e.password = a),
                    class: k(["form-control", { "rounded-bottom-0": e.auth.panel == "registration" && e.settings.password.help }]),
                    placeholder: e.settings.password.placeholder,
                    pattern: e.settings.password.pattern,
                    minlength: e.auth.panel == "registration" ? e.settings.password.minlength : 1,
                    required: "",
                    disabled: e.loading
                  }, null, 10, $O), [
                    [qe, e.password]
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
                    onClick: t[3] || (t[3] = Jt((a) => e.toggleType("password"), ["stop"]))
                  }, [
                    e.settings.password.type == "password" ? (m(), b("i", DO)) : (m(), b("i", RO))
                  ], 2)
                ]),
                (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password.help ? (m(), b("small", {
                  key: 1,
                  class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                  innerHTML: e.settings.password.help
                }, null, 8, MO)) : T("", !0)
              ]),
              e.auth.panel === "registration" || e.auth.panel === "password" ? (m(), b("div", BO, [
                f("label", qO, [
                  wt($(e.settings.password_again.label) + " ", 1),
                  e.password_again.length > 0 && e.password_again != e.password ? (m(), b("small", {
                    key: 0,
                    class: "text-danger",
                    innerHTML: e.settings.password_again.nomatch
                  }, null, 8, PO)) : T("", !0)
                ]),
                f("div", VO, [
                  e.settings.password.icon ? (m(), b("span", {
                    key: 0,
                    class: k(["input-group-text", { "rounded-bottom-0": e.settings.password_again.help }])
                  }, [
                    f("i", {
                      class: k([e.settings.password_again.icon])
                    }, null, 2)
                  ], 2)) : T("", !0),
                  vt(f("input", {
                    id: "password_again",
                    name: "password_again",
                    type: e.settings.password_again.type,
                    "onUpdate:modelValue": t[4] || (t[4] = (a) => e.password_again = a),
                    class: k(["form-control", { "rounded-bottom-0": e.settings.password_again.help }]),
                    placeholder: e.settings.password_again.placeholder,
                    minlength: e.settings.password.minlength,
                    required: "",
                    disabled: e.loading
                  }, null, 10, jO), [
                    [qe, e.password_again]
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
                    onClick: t[5] || (t[5] = Jt((a) => e.toggleType("password_again"), ["stop"]))
                  }, [
                    e.settings.password_again.type == "password" ? (m(), b("i", UO)) : (m(), b("i", HO))
                  ], 2)
                ]),
                (e.auth.panel == "registration" || e.auth.panel == "password") && e.settings.password_again.help ? (m(), b("small", {
                  key: 0,
                  class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                  innerHTML: e.settings.password_again.help
                }, null, 8, WO)) : T("", !0)
              ])) : T("", !0),
              f("div", zO, [
                f("div", {
                  class: "g-recaptcha",
                  "data-sitekey": e.recaptchaSiteKey,
                  onClick: t[6] || (t[6] = Jt((...a) => e.onCaptchaClick && e.onCaptchaClick(...a), ["stop"]))
                }, null, 8, KO)
              ])
            ], 64)) : T("", !0),
            e.auth.panel == "login" && e.settings.password.forgot ? (m(), b("div", GO, [
              f("button", {
                type: "button",
                class: "btn btn-link p-0 text-decoration-none text-nowrap",
                onClick: t[7] || (t[7] = Jt((...a) => e.toggleForgotPassword && e.toggleForgotPassword(...a), ["stop"])),
                innerHTML: e.settings.password.forgot
              }, null, 8, YO)
            ])) : T("", !0),
            e.auth.panel == "forgot" && e.settings.help && e.settings.help.forgot ? (m(), b("div", XO, [
              f("small", {
                class: "text-muted",
                innerHTML: e.settings.help.forgot
              }, null, 8, ZO)
            ])) : T("", !0),
            f("div", JO, [
              (m(!0), b(ht, null, mt(e.settings.inputs, (a, l) => (m(), b(ht, { key: l }, [
                a.panels.indexOf(e.auth.panel) >= 0 && !a.hidden ? (m(), b("div", {
                  key: 0,
                  class: k([a.colclass ? a.colclass : "col-md-12"])
                }, [
                  f("div", QO, [
                    a.label ? (m(), b("label", {
                      key: 0,
                      for: l,
                      class: k(["form-label text-primary", { required: a.required }]),
                      innerHTML: e.getValueOrFunction(a.label)
                    }, null, 10, tN)) : T("", !0),
                    f("div", eN, [
                      a.prefix ? (m(), b("span", {
                        key: 0,
                        class: k(["input-group-text", { "rounded-bottom-0": a.help }]),
                        innerHTML: e.getValueOrFunction(a.prefix)
                      }, null, 10, sN)) : T("", !0),
                      a.type == "select" ? vt((m(), b("select", {
                        key: 1,
                        class: "form-select",
                        disabled: e.loading,
                        required: a.required,
                        "onUpdate:modelValue": (c) => e.inputs[l] = c,
                        multiple: a.multiple
                      }, [
                        t[17] || (t[17] = f("option", null, null, -1)),
                        (m(!0), b(ht, null, mt(a.options, (c) => (m(), b("option", {
                          key: c,
                          value: c.value,
                          innerHTML: e.getValueOrFunction(c.label)
                        }, null, 8, iN))), 128))
                      ], 8, nN)), [
                        [Ge, e.inputs[l]]
                      ]) : vt((m(), b("input", {
                        key: 2,
                        id: l,
                        name: l,
                        type: a.type,
                        "onUpdate:modelValue": (c) => e.inputs[l] = c,
                        class: k(["form-control", { "rounded-bottom-0": a.help }]),
                        placeholder: a.placeholder,
                        required: a.required,
                        disabled: e.loading
                      }, null, 10, rN)), [
                        [qe, e.inputs[l]]
                      ]),
                      a.suffix ? (m(), b("span", {
                        key: 3,
                        class: k(["input-group-text", { "rounded-bottom-0": a.help }]),
                        innerHTML: e.getValueOrFunction(a.suffix)
                      }, null, 10, oN)) : T("", !0)
                    ]),
                    a.help ? (m(), b("small", {
                      key: 1,
                      class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
                      innerHTML: e.getValueOrFunction(a.help)
                    }, null, 8, aN)) : T("", !0)
                  ])
                ], 2)) : T("", !0)
              ], 64))), 128))
            ]),
            (m(!0), b(ht, null, mt(e.settings.accepts, (a) => (m(), b("div", { key: a }, [
              a.panels.indexOf(e.auth.panel) >= 0 ? (m(), b("div", lN, [
                vt(f("input", {
                  type: "checkbox",
                  class: "form-check-input",
                  id: "accept_" + a.name,
                  name: "accept_" + a.name,
                  "onUpdate:modelValue": (l) => e.accepts[a.name] = l,
                  required: a.required,
                  disabled: e.loading
                }, null, 8, cN), [
                  [lr, e.accepts[a.name]]
                ]),
                a.label ? (m(), b("label", {
                  key: 0,
                  class: "form-check-label",
                  for: "accept_" + a.name,
                  innerHTML: e.getValueOrFunction(a.label)
                }, null, 8, uN)) : T("", !0)
              ])) : T("", !0)
            ]))), 128)),
            e.auth.panel == "registration" && e.settings.help && e.settings.help.registration ? (m(), b("div", hN, [
              f("div", {
                innerHTML: e.getValueOrFunction(e.settings.help.registration)
              }, null, 8, dN)
            ])) : T("", !0),
            e.auth.response.message ? (m(), b("div", fN, [
              f("div", {
                class: k({ "text-danger": !e.auth.response.ok, "text-success": e.auth.response.ok }),
                innerHTML: e.auth.response.message
              }, null, 10, pN)
            ])) : T("", !0),
            f("div", gN, [
              e.auth.panel != "login" && e.auth.panel != "activation" ? (m(), b("button", {
                key: 0,
                type: "button",
                onClick: t[8] || (t[8] = Jt((...a) => e.toggleClear && e.toggleClear(...a), ["stop"])),
                class: "btn btn-secondary w-100 me-2 text-nowrap",
                disabled: e.loading
              }, [
                t[18] || (t[18] = f("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1)),
                wt(" " + $(e.settings.submit.login), 1)
              ], 8, mN)) : T("", !0),
              e.auth.panel == "login" ? (m(), b("button", {
                key: 1,
                type: "button",
                class: "btn btn-warning w-100 me-2 text-nowrap",
                onClick: t[9] || (t[9] = Jt((...a) => e.toggleNewRegistration && e.toggleNewRegistration(...a), ["stop"])),
                disabled: e.loading
              }, [
                t[19] || (t[19] = f("i", { class: "bi bi-person-plus mx-1" }, null, -1)),
                wt(" " + $(e.settings.submit.registration), 1)
              ], 8, bN)) : T("", !0),
              f("button", {
                type: "submit",
                class: k(["btn w-100 text-nowrap", { "btn-primary": e.auth.panel != "registration", "btn-warning": e.auth.panel == "registration" }]),
                disabled: e.loading
              }, [
                wt($(e.settings.submit[e.auth.panel]) + " ", 1),
                e.auth.panel == "registration" ? (m(), b("i", vN)) : (m(), b("i", _N))
              ], 10, yN)
            ]),
            f("div", EN, [
              f("button", {
                type: "button",
                onClick: t[10] || (t[10] = Jt((...a) => e.close && e.close(...a), ["stop"])),
                class: "btn btn-light border w-100 me-1",
                disabled: e.loading
              }, [
                wt($(e.settings.submit.cancel) + " ", 1),
                t[20] || (t[20] = f("i", { class: "bi bi-x-square mx-1" }, null, -1))
              ], 8, wN)
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
      f("div", TN, [
        f("div", FN, [
          e.settings.form && e.settings.form.visible && e.settings.form.groups ? (m(), hs(o, {
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
    ], 8, AN)
  ], 8, EO)) : T("", !0);
}
const zN = /* @__PURE__ */ Se(_O, [["render", xN]]);
Pa();
const CN = {
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
      return Qs(e, t, this.settings, this);
    }
  },
  created() {
    window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel]));
  },
  mounted() {
  }
}, ON = CN, NN = ["data-bs-theme"], SN = {
  key: 0,
  class: "dropdown"
}, kN = ["innerHTML"], LN = {
  class: "dropdown-menu dropdown-menu-end",
  "aria-labelledby": "userDropdown"
}, IN = ["innerHTML"], $N = ["onClick"], DN = ["onClick", "innerHTML"], RN = {
  key: 1,
  class: "d-inline-block"
}, MN = ["innerHTML"];
function BN(e, t, s, n, i, r) {
  return !e.auth.user && e.panel != "login" || e.panel == "login" ? (m(), b("div", {
    key: 0,
    class: "vua-user-button d-inline-block",
    "data-bs-theme": [e.theme]
  }, [
    e.auth.user ? (m(), b("div", SN, [
      f("button", {
        class: k(["dropdown-toggle", [e.settings.class]]),
        type: "button",
        id: "userDropdown",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }, [
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, kN)
      ], 2),
      f("ul", LN, [
        (m(!0), b(ht, null, mt(e.settings.dropdowns, (o) => (m(), b(ht, { key: o }, [
          o.action == "BUTTON_ROLES" ? (m(), b("li", {
            key: 0,
            class: k([[o.class], "d-flex items-align-center"])
          }, [
            f("span", {
              innerHTML: e.getValueOrFunction(o.label),
              class: "me-2"
            }, null, 8, IN),
            (m(!0), b(ht, null, mt(e.auth.user.roles, (a) => (m(), b("button", {
              key: a,
              onClick: (l) => e.setSelectedRole(a),
              class: k(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": a == e.auth.user.role }])
            }, $(a), 11, $N))), 128))
          ], 2)) : (m(), b("li", {
            key: 1,
            class: k([o.class]),
            onClick: (a) => e.dropdownAction(o),
            innerHTML: e.getValueOrFunction(o.label)
          }, null, 10, DN))
        ], 64))), 128))
      ])
    ])) : (m(), b("div", RN, [
      f("button", {
        class: k([e.settings.class]),
        type: "button",
        onClick: t[0] || (t[0] = (...o) => e.togglePanel && e.togglePanel(...o))
      }, [
        e.settings.icon ? (m(), b("i", {
          key: 0,
          class: k([e.settings.icon])
        }, null, 2)) : T("", !0),
        f("span", {
          innerHTML: e.getValueOrFunction(e.settings.label)
        }, null, 8, MN)
      ], 2)
    ]))
  ], 8, NN)) : T("", !0);
}
const KN = /* @__PURE__ */ Se(ON, [["render", BN]]);
export {
  WN as VuAdmin,
  zN as VuAuth,
  KN as VuUserButton
};
