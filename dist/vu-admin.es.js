import { Fragment as e, Teleport as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, customRef as c, defineComponent as l, getCurrentInstance as u, h as d, markRaw as f, nextTick as p, normalizeClass as m, normalizeStyle as h, onBeforeUnmount as g, openBlock as _, ref as v, renderList as y, resolveComponent as b, toDisplayString as x, unref as S, vModelCheckbox as C, vModelDynamic as w, vModelSelect as T, vModelText as E, vShow as ee, watchEffect as te, withDirectives as D, withKeys as ne, withModifiers as O } from "vue";
// \0rolldown/runtime.js
var re = Object.defineProperty, ie = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), ae = (e, t) => {
	let n = {};
	for (var r in e) re(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || re(n, Symbol.toStringTag, { value: "Module" }), n;
}, oe = "bottom", se = "right", k = "left", A = "auto", j = [
	"top",
	oe,
	se,
	k
], M = "start", ce = "clippingParents", le = "viewport", ue = "popper", de = "reference", fe = /*#__PURE__*/ j.reduce(function(e, t) {
	return e.concat([t + "-" + M, t + "-end"]);
}, []), N = /*#__PURE__*/ [].concat(j, [A]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + M,
		t + "-end"
	]);
}, []), pe = "beforeRead", me = "read", he = "afterRead", ge = "beforeMain", _e = "main", ve = "afterMain", ye = "beforeWrite", be = "write", xe = "afterWrite", Se = [
	pe,
	me,
	he,
	ge,
	_e,
	ve,
	ye,
	be,
	xe
];
// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function P(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function F(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function Ce(e) {
	return e instanceof F(e).Element || e instanceof Element;
}
function we(e) {
	return e instanceof F(e).HTMLElement || e instanceof HTMLElement;
}
function Te(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof F(e).ShadowRoot || e instanceof ShadowRoot;
}
// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function Ee(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		we(i) && P(i) && (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function De(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var r = t.elements[e], i = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			we(r) && P(r) && (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var Oe = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: Ee,
	effect: De,
	requires: ["computeStyles"]
};
// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function ke(e) {
	return e.split("-")[0];
}
// node_modules/@popperjs/core/lib/utils/math.js
var Ae = Math.max, je = Math.min, Me = Math.round;
// node_modules/@popperjs/core/lib/utils/userAgent.js
function Ne() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function Pe() {
	return !/^((?!chrome|android).)*safari/i.test(Ne());
}
// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function Fe(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && we(e) && (i = e.offsetWidth > 0 && Me(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Me(r.height) / e.offsetHeight || 1);
	var o = (Ce(e) ? F(e) : window).visualViewport, s = !Pe() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
	return {
		width: u,
		height: d,
		top: l,
		right: c + u,
		bottom: l + d,
		left: c,
		x: c,
		y: l
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function Ie(e) {
	var t = Fe(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
// node_modules/@popperjs/core/lib/dom-utils/contains.js
function Le(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && Te(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function Re(e) {
	return F(e).getComputedStyle(e);
}
// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function ze(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(P(e)) >= 0;
}
// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function Be(e) {
	return ((Ce(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function Ve(e) {
	return P(e) === "html" ? e : e.assignedSlot || e.parentNode || (Te(e) ? e.host : null) || Be(e);
}
// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function He(e) {
	return !we(e) || Re(e).position === "fixed" ? null : e.offsetParent;
}
function Ue(e) {
	var t = /firefox/i.test(Ne());
	if (/Trident/i.test(Ne()) && we(e) && Re(e).position === "fixed") return null;
	var n = Ve(e);
	for (Te(n) && (n = n.host); we(n) && ["html", "body"].indexOf(P(n)) < 0;) {
		var r = Re(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function We(e) {
	for (var t = F(e), n = He(e); n && ze(n) && Re(n).position === "static";) n = He(n);
	return n && (P(n) === "html" || P(n) === "body" && Re(n).position === "static") ? t : n || Ue(e) || t;
}
// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function Ge(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
// node_modules/@popperjs/core/lib/utils/within.js
function Ke(e, t, n) {
	return Ae(e, je(t, n));
}
function qe(e, t, n) {
	var r = Ke(e, t, n);
	return r > n ? n : r;
}
// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function Je() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function Ye(e) {
	return Object.assign({}, Je(), e);
}
// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function Xe(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
// node_modules/@popperjs/core/lib/modifiers/arrow.js
var Ze = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Ye(typeof e == "number" ? Xe(e, j) : e);
};
function Qe(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = ke(n.placement), c = Ge(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (a && o) {
		var u = Ze(i.padding, n), d = Ie(a), f = c === "y" ? "top" : k, p = c === "y" ? oe : se, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = We(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = Ke(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function $e(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Le(t.elements.popper, r) && (t.elements.arrow = r));
}
var et = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: Qe,
	effect: $e,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
// node_modules/@popperjs/core/lib/utils/getVariation.js
function tt(e) {
	return e.split("-")[1];
}
// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var nt = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function rt(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: Me(n * i) / i || 0,
		y: Me(r * i) / i || 0
	};
}
function it(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = k, b = "top", x = window;
	if (l) {
		var S = We(n), C = "clientHeight", w = "clientWidth";
		if (S === F(n) && (S = Be(n), Re(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = oe;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = se;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var ee = Object.assign({ position: s }, l && nt), te = u === !0 ? rt({
		x: p,
		y: h
	}, F(n)) : {
		x: p,
		y: h
	};
	if (p = te.x, h = te.y, c) {
		var D;
		return Object.assign({}, ee, (D = {}, D[b] = v ? "0" : "", D[y] = _ ? "0" : "", D.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", D));
	}
	return Object.assign({}, ee, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function at(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: ke(t.placement),
		variation: tt(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, it(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, it(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var ot = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: at,
	data: {}
}, st = { passive: !0 };
function ct(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = F(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, st);
	}), s && c.addEventListener("resize", n.update, st), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, st);
		}), s && c.removeEventListener("resize", n.update, st);
	};
}
var lt = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: ct,
	data: {}
}, ut = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function dt(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return ut[e];
	});
}
// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var ft = {
	start: "end",
	end: "start"
};
function pt(e) {
	return e.replace(/start|end/g, function(e) {
		return ft[e];
	});
}
// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function mt(e) {
	var t = F(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function ht(e) {
	return Fe(Be(e)).left + mt(e).scrollLeft;
}
// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function gt(e, t) {
	var n = F(e), r = Be(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = Pe();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + ht(e),
		y: c
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function _t(e) {
	var t = Be(e), n = mt(e), r = e.ownerDocument?.body, i = Ae(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = Ae(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + ht(e), s = -n.scrollTop;
	return Re(r || t).direction === "rtl" && (o += Ae(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function vt(e) {
	var t = Re(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function yt(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(P(e)) >= 0 ? e.ownerDocument.body : we(e) && vt(e) ? e : yt(Ve(e));
}
// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function bt(e, t) {
	t === void 0 && (t = []);
	var n = yt(e), r = n === e.ownerDocument?.body, i = F(n), a = r ? [i].concat(i.visualViewport || [], vt(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(bt(Ve(a)));
}
// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function xt(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function St(e, t) {
	var n = Fe(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ct(e, t, n) {
	return t === "viewport" ? xt(gt(e, n)) : Ce(t) ? St(t, n) : xt(_t(Be(e)));
}
function wt(e) {
	var t = bt(Ve(e)), n = ["absolute", "fixed"].indexOf(Re(e).position) >= 0 && we(e) ? We(e) : e;
	return Ce(n) ? t.filter(function(e) {
		return Ce(e) && Le(e, n) && P(e) !== "body";
	}) : [];
}
function Tt(e, t, n, r) {
	var i = t === "clippingParents" ? wt(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = Ct(e, n, r);
		return t.top = Ae(i.top, t.top), t.right = je(i.right, t.right), t.bottom = je(i.bottom, t.bottom), t.left = Ae(i.left, t.left), t;
	}, Ct(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Et(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? ke(r) : null, a = r ? tt(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case oe:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case se:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case k:
			c = {
				x: t.x - n.width,
				y: s
			};
			break;
		default: c = {
			x: t.x,
			y: t.y
		};
	}
	var l = i ? Ge(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case M:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end": c[l] = c[l] + (t[u] / 2 - n[u] / 2);
		}
	}
	return c;
}
// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function Dt(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? ce : s, l = n.rootBoundary, u = l === void 0 ? le : l, d = n.elementContext, f = d === void 0 ? ue : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = Ye(typeof g == "number" ? Xe(g, j) : g), v = f === "popper" ? de : ue, y = e.rects.popper, b = e.elements[m ? v : f], x = Tt(Ce(b) ? b : b.contextElement || Be(e.elements.popper), c, u, o), S = Fe(e.elements.reference), C = Et({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = xt(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, ee = e.modifiersData.offset;
	if (f === "popper" && ee) {
		var te = ee[i];
		Object.keys(E).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			E[e] += te[n] * t;
		});
	}
	return E;
}
// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Ot(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? N : c, u = tt(r), d = u ? s ? fe : fe.filter(function(e) {
		return tt(e) === u;
	}) : j, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = Dt(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[ke(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
// node_modules/@popperjs/core/lib/modifiers/flip.js
function kt(e) {
	if (ke(e) === "auto") return [];
	var t = dt(e);
	return [
		pt(e),
		t,
		pt(t)
	];
}
function At(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, _ = ke(g) === g, v = c || (_ || !m ? [dt(g)] : kt(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(ke(n) === "auto" ? Ot(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], ee = ke(E), te = tt(E) === M, D = ["top", oe].indexOf(ee) >= 0, ne = D ? "width" : "height", O = Dt(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), re = D ? te ? se : k : te ? oe : "top";
			b[ne] > x[ne] && (re = dt(re));
			var ie = dt(re), ae = [];
			if (a && ae.push(O[ee] <= 0), s && ae.push(O[re] <= 0, O[ie] <= 0), ae.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, ae);
		}
		if (C) for (var A = m ? 3 : 1, j = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, ce = A; ce > 0 && j(ce) !== "break"; ce--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var jt = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: At,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
// node_modules/@popperjs/core/lib/modifiers/hide.js
function Mt(e, t, n) {
	return n === void 0 && (n = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - n.y,
		right: e.right - t.width + n.x,
		bottom: e.bottom - t.height + n.y,
		left: e.left - t.width - n.x
	};
}
function Nt(e) {
	return [
		"top",
		se,
		oe,
		k
	].some(function(t) {
		return e[t] >= 0;
	});
}
function Pt(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = Dt(t, { elementContext: "reference" }), s = Dt(t, { altBoundary: !0 }), c = Mt(o, r), l = Mt(s, i, a), u = Nt(c), d = Nt(l);
	t.modifiersData[n] = {
		referenceClippingOffsets: c,
		popperEscapeOffsets: l,
		isReferenceHidden: u,
		hasPopperEscaped: d
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": u,
		"data-popper-escaped": d
	});
}
var Ft = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: Pt
};
// node_modules/@popperjs/core/lib/modifiers/offset.js
function It(e, t, n) {
	var r = ke(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function Lt(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = N.reduce(function(e, n) {
		return e[n] = It(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var Rt = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: Lt
};
// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function zt(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Et({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var Bt = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: zt,
	data: {}
};
// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function Vt(e) {
	return e === "x" ? "y" : "x";
}
// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function Ht(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = Dt(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = ke(t.placement), v = tt(t.placement), y = !v, b = Ge(_), x = Vt(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
		mainAxis: T,
		altAxis: T
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, T), ee = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, te = {
		x: 0,
		y: 0
	};
	if (S) {
		if (a) {
			var D = b === "y" ? "top" : k, ne = b === "y" ? oe : se, O = b === "y" ? "height" : "width", re = S[b], ie = re + g[D], ae = re - g[ne], A = p ? -w[O] / 2 : 0, j = v === "start" ? C[O] : w[O], M = v === "start" ? -w[O] : -C[O], ce = t.elements.arrow, le = p && ce ? Ie(ce) : {
				width: 0,
				height: 0
			}, ue = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Je(), de = ue[D], fe = ue[ne], N = Ke(0, C[O], le[O]), pe = y ? C[O] / 2 - A - N - de - E.mainAxis : j - N - de - E.mainAxis, me = y ? -C[O] / 2 + A + N + fe + E.mainAxis : M + N + fe + E.mainAxis, he = t.elements.arrow && We(t.elements.arrow), ge = he ? b === "y" ? he.clientTop || 0 : he.clientLeft || 0 : 0, _e = ee?.[b] ?? 0, ve = re + pe - _e - ge, ye = re + me - _e, be = Ke(p ? je(ie, ve) : ie, re, p ? Ae(ae, ye) : ae);
			S[b] = be, te[b] = be - re;
		}
		if (s) {
			var xe = b === "x" ? "top" : k, Se = b === "x" ? oe : se, P = S[x], F = x === "y" ? "height" : "width", Ce = P + g[xe], we = P - g[Se], Te = ["top", k].indexOf(_) !== -1, Ee = ee?.[x] ?? 0, De = Te ? Ce : P - C[F] - w[F] - Ee + E.altAxis, Oe = Te ? P + C[F] + w[F] - Ee - E.altAxis : we, Me = p && Te ? qe(De, P, Oe) : Ke(p ? De : Ce, P, p ? Oe : we);
			S[x] = Me, te[x] = Me - P;
		}
		t.modifiersData[r] = te;
	}
}
var Ut = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: Ht,
	requiresIfExists: ["offset"]
};
// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function Wt(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function Gt(e) {
	return e === F(e) || !we(e) ? mt(e) : Wt(e);
}
// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function Kt(e) {
	var t = e.getBoundingClientRect(), n = Me(t.width) / e.offsetWidth || 1, r = Me(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function qt(e, t, n) {
	n === void 0 && (n = !1);
	var r = we(t), i = we(t) && Kt(t), a = Be(t), o = Fe(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((P(t) !== "body" || vt(a)) && (s = Gt(t)), we(t) ? (c = Fe(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = ht(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function Jt(e) {
	var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function i(e) {
		n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!n.has(e)) {
				var r = t.get(e);
				r && i(r);
			}
		}), r.push(e);
	}
	return e.forEach(function(e) {
		n.has(e.name) || i(e);
	}), r;
}
function Yt(e) {
	var t = Jt(e);
	return Se.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
// node_modules/@popperjs/core/lib/utils/debounce.js
function Xt(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
// node_modules/@popperjs/core/lib/utils/mergeByName.js
function Zt(e) {
	var t = e.reduce(function(e, t) {
		var n = e[t.name];
		return e[t.name] = n ? Object.assign({}, n, t, {
			options: Object.assign({}, n.options, t.options),
			data: Object.assign({}, n.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
// node_modules/@popperjs/core/lib/createPopper.js
var Qt = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function $t() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function en(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? Qt : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, Qt, a),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, o = [], s = !1, c = {
			state: i,
			setOptions: function(n) {
				var o = typeof n == "function" ? n(i.options) : n;
				u(), i.options = Object.assign({}, a, i.options, o), i.scrollParents = {
					reference: Ce(e) ? bt(e) : e.contextElement ? bt(e.contextElement) : [],
					popper: bt(t)
				};
				var s = Yt(Zt([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if ($t(t, n)) {
						i.rects = {
							reference: qt(t, We(n), i.options.strategy === "fixed"),
							popper: Ie(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) if (i.reset === !0) i.reset = !1, r = -1;
						else {
							var a = i.orderedModifiers[r], o = a.fn, l = a.options, u = l === void 0 ? {} : l, d = a.name;
							typeof o == "function" && (i = o({
								state: i,
								options: u,
								name: d,
								instance: c
							}) || i);
						}
					}
				}
			},
			update: Xt(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!$t(e, t)) return c;
		c.setOptions(n).then(function(e) {
			!s && n.onFirstUpdate && n.onFirstUpdate(e);
		});
		function l() {
			i.orderedModifiers.forEach(function(e) {
				var t = e.name, n = e.options, r = n === void 0 ? {} : n, a = e.effect;
				if (typeof a == "function") {
					var s = a({
						state: i,
						name: t,
						instance: c,
						options: r
					});
					o.push(s || function() {});
				}
			});
		}
		function u() {
			o.forEach(function(e) {
				return e();
			}), o = [];
		}
		return c;
	};
}
var tn = /*#__PURE__*/ en(), nn = /*#__PURE__*/ en({ defaultModifiers: [
	lt,
	Bt,
	ot,
	Oe
] }), rn = /*#__PURE__*/ en({ defaultModifiers: [
	lt,
	Bt,
	ot,
	Oe,
	Rt,
	jt,
	Ut,
	et,
	Ft
] }), an = /* @__PURE__ */ ae({
	afterMain: () => ve,
	afterRead: () => he,
	afterWrite: () => xe,
	applyStyles: () => Oe,
	arrow: () => et,
	auto: () => A,
	basePlacements: () => j,
	beforeMain: () => ge,
	beforeRead: () => pe,
	beforeWrite: () => ye,
	bottom: () => oe,
	clippingParents: () => ce,
	computeStyles: () => ot,
	createPopper: () => rn,
	createPopperBase: () => tn,
	createPopperLite: () => nn,
	detectOverflow: () => Dt,
	end: () => "end",
	eventListeners: () => lt,
	flip: () => jt,
	hide: () => Ft,
	left: () => k,
	main: () => _e,
	modifierPhases: () => Se,
	offset: () => Rt,
	placements: () => N,
	popper: () => ue,
	popperGenerator: () => en,
	popperOffsets: () => Bt,
	preventOverflow: () => Ut,
	read: () => me,
	reference: () => de,
	right: () => se,
	start: () => M,
	top: () => "top",
	variationPlacements: () => fe,
	viewport: () => le,
	write: () => be
}), on = /* @__PURE__ */ new Map(), sn = {
	set(e, t, n) {
		on.has(e) || on.set(e, /* @__PURE__ */ new Map());
		let r = on.get(e);
		!r.has(t) && r.size !== 0 ? console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`) : r.set(t, n);
	},
	get(e, t) {
		return on.has(e) && on.get(e).get(t) || null;
	},
	remove(e, t) {
		if (!on.has(e)) return;
		let n = on.get(e);
		n.delete(t), n.size === 0 && on.delete(e);
	}
}, cn = 1e6, ln = 1e3, un = "transitionend", dn = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)), e), fn = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), pn = (e) => {
	do
		e += Math.floor(Math.random() * cn);
	while (document.getElementById(e));
	return e;
}, mn = (e) => {
	if (!e) return 0;
	let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
	return !Number.parseFloat(t) && !Number.parseFloat(n) ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * ln);
}, hn = (e) => {
	e.dispatchEvent(new Event(un));
}, gn = (e) => !e || typeof e != "object" ? !1 : (e.jquery !== void 0 && (e = e[0]), e.nodeType !== void 0), _n = (e) => gn(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(dn(e)) : null, vn = (e) => {
	if (!gn(e) || e.getClientRects().length === 0) return !1;
	let t = getComputedStyle(e).getPropertyValue("visibility") === "visible", n = e.closest("details:not([open])");
	if (!n) return t;
	if (n !== e) {
		let t = e.closest("summary");
		if (t && t.parentNode !== n || t === null) return !1;
	}
	return t;
}, yn = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : e.disabled === void 0 ? e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false" : e.disabled, bn = (e) => {
	if (!document.documentElement.attachShadow) return null;
	if (typeof e.getRootNode == "function") {
		let t = e.getRootNode();
		return t instanceof ShadowRoot ? t : null;
	}
	return e instanceof ShadowRoot ? e : e.parentNode ? bn(e.parentNode) : null;
}, xn = () => {}, Sn = (e) => {
	e.offsetHeight;
}, Cn = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, wn = [], Tn = (e) => {
	document.readyState === "loading" ? (wn.length || document.addEventListener("DOMContentLoaded", () => {
		for (let e of wn) e();
	}), wn.push(e)) : e();
}, En = () => document.documentElement.dir === "rtl", Dn = (e) => {
	Tn(() => {
		let t = Cn();
		/* istanbul ignore if */
		if (t) {
			let n = e.NAME, r = t.fn[n];
			t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
		}
	});
}, On = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, kn = (e, t, n = !0) => {
	if (!n) {
		On(e);
		return;
	}
	let r = mn(t) + 5, i = !1, a = ({ target: n }) => {
		n === t && (i = !0, t.removeEventListener(un, a), On(e));
	};
	t.addEventListener(un, a), setTimeout(() => {
		i || hn(t);
	}, r);
}, An = (e, t, n, r) => {
	let i = e.length, a = e.indexOf(t);
	return a === -1 ? !n && r ? e[i - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + i) % i), e[Math.max(0, Math.min(a, i - 1))]);
}, jn = /[^.]*(?=\..*)\.|.*/, Mn = /\..*/, Nn = /::\d+$/, Pn = {}, Fn = 1, In = {
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, Ln = /* @__PURE__ */ new Set(/* @__PURE__ */ "click.dblclick.mouseup.mousedown.contextmenu.mousewheel.DOMMouseScroll.mouseover.mouseout.mousemove.selectstart.selectend.keydown.keypress.keyup.orientationchange.touchstart.touchmove.touchend.touchcancel.pointerdown.pointermove.pointerup.pointerleave.pointercancel.gesturestart.gesturechange.gestureend.focus.blur.change.reset.select.submit.focusin.focusout.load.unload.beforeunload.resize.move.DOMContentLoaded.readystatechange.error.abort.scroll".split("."));
function Rn(e, t) {
	return t && `${t}::${Fn++}` || e.uidEvent || Fn++;
}
function zn(e) {
	let t = Rn(e);
	return e.uidEvent = t, Pn[t] = Pn[t] || {}, Pn[t];
}
function Bn(e, t) {
	return function n(r) {
		return Jn(r, { delegateTarget: e }), n.oneOff && I.off(e, r.type, t), t.apply(e, [r]);
	};
}
function Vn(e, t, n) {
	return function r(i) {
		let a = e.querySelectorAll(t);
		for (let { target: o } = i; o && o !== this; o = o.parentNode) for (let s of a) if (s === o) return Jn(i, { delegateTarget: o }), r.oneOff && I.off(e, i.type, t, n), n.apply(o, [i]);
	};
}
function Hn(e, t, n = null) {
	return Object.values(e).find((e) => e.callable === t && e.delegationSelector === n);
}
function Un(e, t, n) {
	let r = typeof t == "string", i = r ? n : t || n, a = qn(e);
	return Ln.has(a) || (a = e), [
		r,
		i,
		a
	];
}
function Wn(e, t, n, r, i) {
	if (typeof t != "string" || !e) return;
	let [a, o, s] = Un(t, n, r);
	t in In && (o = ((e) => function(t) {
		if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t);
	})(o));
	let c = zn(e), l = c[s] || (c[s] = {}), u = Hn(l, o, a ? n : null);
	if (u) {
		u.oneOff = u.oneOff && i;
		return;
	}
	let d = Rn(o, t.replace(jn, "")), f = a ? Vn(e, n, o) : Bn(e, o);
	f.delegationSelector = a ? n : null, f.callable = o, f.oneOff = i, f.uidEvent = d, l[d] = f, e.addEventListener(s, f, a);
}
function Gn(e, t, n, r, i) {
	let a = Hn(t[n], r, i);
	a && (e.removeEventListener(n, a, !!i), delete t[n][a.uidEvent]);
}
function Kn(e, t, n, r) {
	let i = t[n] || {};
	for (let [a, o] of Object.entries(i)) a.includes(r) && Gn(e, t, n, o.callable, o.delegationSelector);
}
function qn(e) {
	return e = e.replace(Mn, ""), In[e] || e;
}
var I = {
	on(e, t, n, r) {
		Wn(e, t, n, r, !1);
	},
	one(e, t, n, r) {
		Wn(e, t, n, r, !0);
	},
	off(e, t, n, r) {
		if (typeof t != "string" || !e) return;
		let [i, a, o] = Un(t, n, r), s = o !== t, c = zn(e), l = c[o] || {}, u = t.startsWith(".");
		if (a !== void 0) {
			if (!Object.keys(l).length) return;
			Gn(e, c, o, a, i ? n : null);
		} else {
			if (u) for (let n of Object.keys(c)) Kn(e, c, n, t.slice(1));
			for (let [n, r] of Object.entries(l)) {
				let i = n.replace(Nn, "");
				(!s || t.includes(i)) && Gn(e, c, o, r.callable, r.delegationSelector);
			}
		}
	},
	trigger(e, t, n) {
		if (typeof t != "string" || !e) return null;
		let r = Cn(), i = t !== qn(t), a = null, o = !0, s = !0, c = !1;
		i && r && (a = r.Event(t, n), r(e).trigger(a), o = !a.isPropagationStopped(), s = !a.isImmediatePropagationStopped(), c = a.isDefaultPrevented());
		let l = Jn(new Event(t, {
			bubbles: o,
			cancelable: !0
		}), n);
		return c && l.preventDefault(), s && e.dispatchEvent(l), l.defaultPrevented && a && a.preventDefault(), l;
	}
};
function Jn(e, t = {}) {
	for (let [n, r] of Object.entries(t)) try {
		e[n] = r;
	} catch {
		Object.defineProperty(e, n, {
			configurable: !0,
			get() {
				return r;
			}
		});
	}
	return e;
}
function Yn(e) {
	if (e === "true") return !0;
	if (e === "false") return !1;
	if (e === Number(e).toString()) return Number(e);
	if (e === "" || e === "null") return null;
	if (typeof e != "string") return e;
	try {
		return JSON.parse(decodeURIComponent(e));
	} catch {
		return e;
	}
}
function Xn(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
var Zn = {
	setDataAttribute(e, t, n) {
		e.setAttribute(`data-bs-${Xn(t)}`, n);
	},
	removeDataAttribute(e, t) {
		e.removeAttribute(`data-bs-${Xn(t)}`);
	},
	getDataAttributes(e) {
		if (!e) return {};
		let t = {}, n = Object.keys(e.dataset).filter((e) => e.startsWith("bs") && !e.startsWith("bsConfig"));
		for (let r of n) {
			let n = r.replace(/^bs/, "");
			n = n.charAt(0).toLowerCase() + n.slice(1), t[n] = Yn(e.dataset[r]);
		}
		return t;
	},
	getDataAttribute(e, t) {
		return Yn(e.getAttribute(`data-bs-${Xn(t)}`));
	}
}, Qn = class {
	static get Default() {
		return {};
	}
	static get DefaultType() {
		return {};
	}
	static get NAME() {
		throw Error("You have to implement the static method \"NAME\", for each component!");
	}
	_getConfig(e) {
		return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	_configAfterMerge(e) {
		return e;
	}
	_mergeConfigObj(e, t) {
		let n = gn(t) ? Zn.getDataAttribute(t, "config") : {};
		return {
			...this.constructor.Default,
			...typeof n == "object" ? n : {},
			...gn(t) ? Zn.getDataAttributes(t) : {},
			...typeof e == "object" ? e : {}
		};
	}
	_typeCheckConfig(e, t = this.constructor.DefaultType) {
		for (let [n, r] of Object.entries(t)) {
			let t = e[n], i = gn(t) ? "element" : fn(t);
			if (!new RegExp(r).test(i)) throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${i}" but expected type "${r}".`);
		}
	}
}, $n = "5.3.8", er = class extends Qn {
	constructor(e, t) {
		super(), e = _n(e), e && (this._element = e, this._config = this._getConfig(t), sn.set(this._element, this.constructor.DATA_KEY, this));
	}
	dispose() {
		sn.remove(this._element, this.constructor.DATA_KEY), I.off(this._element, this.constructor.EVENT_KEY);
		for (let e of Object.getOwnPropertyNames(this)) this[e] = null;
	}
	_queueCallback(e, t, n = !0) {
		kn(e, t, n);
	}
	_getConfig(e) {
		return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	static getInstance(e) {
		return sn.get(_n(e), this.DATA_KEY);
	}
	static getOrCreateInstance(e, t = {}) {
		return this.getInstance(e) || new this(e, typeof t == "object" ? t : null);
	}
	static get VERSION() {
		return $n;
	}
	static get DATA_KEY() {
		return `bs.${this.NAME}`;
	}
	static get EVENT_KEY() {
		return `.${this.DATA_KEY}`;
	}
	static eventName(e) {
		return `${e}${this.EVENT_KEY}`;
	}
}, tr = (e) => {
	let t = e.getAttribute("data-bs-target");
	if (!t || t === "#") {
		let n = e.getAttribute("href");
		if (!n || !n.includes("#") && !n.startsWith(".")) return null;
		n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
	}
	return t ? t.split(",").map((e) => dn(e)).join(",") : null;
}, L = {
	find(e, t = document.documentElement) {
		return [].concat(...Element.prototype.querySelectorAll.call(t, e));
	},
	findOne(e, t = document.documentElement) {
		return Element.prototype.querySelector.call(t, e);
	},
	children(e, t) {
		return [].concat(...e.children).filter((e) => e.matches(t));
	},
	parents(e, t) {
		let n = [], r = e.parentNode.closest(t);
		for (; r;) n.push(r), r = r.parentNode.closest(t);
		return n;
	},
	prev(e, t) {
		let n = e.previousElementSibling;
		for (; n;) {
			if (n.matches(t)) return [n];
			n = n.previousElementSibling;
		}
		return [];
	},
	next(e, t) {
		let n = e.nextElementSibling;
		for (; n;) {
			if (n.matches(t)) return [n];
			n = n.nextElementSibling;
		}
		return [];
	},
	focusableChildren(e) {
		let t = [
			"a",
			"button",
			"input",
			"textarea",
			"select",
			"details",
			"[tabindex]",
			"[contenteditable=\"true\"]"
		].map((e) => `${e}:not([tabindex^="-"])`).join(",");
		return this.find(t, e).filter((e) => !yn(e) && vn(e));
	},
	getSelectorFromElement(e) {
		let t = tr(e);
		return t && L.findOne(t) ? t : null;
	},
	getElementFromSelector(e) {
		let t = tr(e);
		return t ? L.findOne(t) : null;
	},
	getMultipleElementsFromSelector(e) {
		let t = tr(e);
		return t ? L.find(t) : [];
	}
}, nr = (e, t = "hide") => {
	let n = `click.dismiss${e.EVENT_KEY}`, r = e.NAME;
	I.on(document, n, `[data-bs-dismiss="${r}"]`, function(n) {
		if (["A", "AREA"].includes(this.tagName) && n.preventDefault(), yn(this)) return;
		let i = L.getElementFromSelector(this) || this.closest(`.${r}`);
		e.getOrCreateInstance(i)[t]();
	});
}, rr = "alert", ir = ".bs.alert", ar = `close${ir}`, or = `closed${ir}`, sr = "fade", cr = "show", lr = class e extends er {
	static get NAME() {
		return rr;
	}
	close() {
		if (I.trigger(this._element, ar).defaultPrevented) return;
		this._element.classList.remove(cr);
		let e = this._element.classList.contains(sr);
		this._queueCallback(() => this._destroyElement(), this._element, e);
	}
	_destroyElement() {
		this._element.remove(), I.trigger(this._element, or), this.dispose();
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this);
			if (typeof t == "string") {
				if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw TypeError(`No method named "${t}"`);
				n[t](this);
			}
		});
	}
};
nr(lr, "close"), Dn(lr);
var ur = "button", dr = ".bs.button", fr = ".data-api", pr = "active", mr = "[data-bs-toggle=\"button\"]", hr = `click${dr}${fr}`, gr = class e extends er {
	static get NAME() {
		return ur;
	}
	toggle() {
		this._element.setAttribute("aria-pressed", this._element.classList.toggle(pr));
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this);
			t === "toggle" && n[t]();
		});
	}
};
I.on(document, hr, mr, (e) => {
	e.preventDefault();
	let t = e.target.closest(mr);
	gr.getOrCreateInstance(t).toggle();
}), Dn(gr);
var _r = "swipe", vr = ".bs.swipe", yr = `touchstart${vr}`, br = `touchmove${vr}`, xr = `touchend${vr}`, Sr = `pointerdown${vr}`, Cr = `pointerup${vr}`, wr = "touch", Tr = "pen", Er = "pointer-event", Dr = 40, Or = {
	endCallback: null,
	leftCallback: null,
	rightCallback: null
}, kr = {
	endCallback: "(function|null)",
	leftCallback: "(function|null)",
	rightCallback: "(function|null)"
}, Ar = class e extends Qn {
	constructor(t, n) {
		super(), this._element = t, t && e.isSupported() && (this._config = this._getConfig(n), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
	}
	static get Default() {
		return Or;
	}
	static get DefaultType() {
		return kr;
	}
	static get NAME() {
		return _r;
	}
	dispose() {
		I.off(this._element, vr);
	}
	_start(e) {
		this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX;
	}
	_end(e) {
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), On(this._config.endCallback);
	}
	_move(e) {
		this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
	}
	_handleSwipe() {
		let e = Math.abs(this._deltaX);
		if (e <= Dr) return;
		let t = e / this._deltaX;
		this._deltaX = 0, t && On(t > 0 ? this._config.rightCallback : this._config.leftCallback);
	}
	_initEvents() {
		this._supportPointerEvents ? (I.on(this._element, Sr, (e) => this._start(e)), I.on(this._element, Cr, (e) => this._end(e)), this._element.classList.add(Er)) : (I.on(this._element, yr, (e) => this._start(e)), I.on(this._element, br, (e) => this._move(e)), I.on(this._element, xr, (e) => this._end(e)));
	}
	_eventIsPointerPenTouch(e) {
		return this._supportPointerEvents && (e.pointerType === Tr || e.pointerType === wr);
	}
	static isSupported() {
		return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
	}
}, jr = "carousel", Mr = ".bs.carousel", Nr = ".data-api", Pr = "ArrowLeft", Fr = "ArrowRight", Ir = 500, Lr = "next", Rr = "prev", zr = "left", Br = "right", Vr = `slide${Mr}`, Hr = `slid${Mr}`, Ur = `keydown${Mr}`, Wr = `mouseenter${Mr}`, Gr = `mouseleave${Mr}`, Kr = `dragstart${Mr}`, qr = `load${Mr}${Nr}`, Jr = `click${Mr}${Nr}`, Yr = "carousel", Xr = "active", Zr = "slide", Qr = "carousel-item-end", $r = "carousel-item-start", ei = "carousel-item-next", ti = "carousel-item-prev", ni = ".active", ri = ".carousel-item", ii = ".active.carousel-item", ai = ".carousel-item img", oi = ".carousel-indicators", si = "[data-bs-slide], [data-bs-slide-to]", ci = "[data-bs-ride=\"carousel\"]", li = {
	[Pr]: Br,
	[Fr]: zr
}, ui = {
	interval: 5e3,
	keyboard: !0,
	pause: "hover",
	ride: !1,
	touch: !0,
	wrap: !0
}, di = {
	interval: "(number|boolean)",
	keyboard: "boolean",
	pause: "(string|boolean)",
	ride: "(boolean|string)",
	touch: "boolean",
	wrap: "boolean"
}, fi = class e extends er {
	constructor(e, t) {
		super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = L.findOne(oi, this._element), this._addEventListeners(), this._config.ride === Yr && this.cycle();
	}
	static get Default() {
		return ui;
	}
	static get DefaultType() {
		return di;
	}
	static get NAME() {
		return jr;
	}
	next() {
		this._slide(Lr);
	}
	nextWhenVisible() {
		!document.hidden && vn(this._element) && this.next();
	}
	prev() {
		this._slide(Rr);
	}
	pause() {
		this._isSliding && hn(this._element), this._clearInterval();
	}
	cycle() {
		this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	}
	_maybeEnableCycle() {
		this._config.ride && (this._isSliding ? I.one(this._element, Hr, () => this.cycle()) : this.cycle());
	}
	to(e) {
		let t = this._getItems();
		if (e > t.length - 1 || e < 0) return;
		if (this._isSliding) {
			I.one(this._element, Hr, () => this.to(e));
			return;
		}
		let n = this._getItemIndex(this._getActive());
		if (n === e) return;
		let r = e > n ? Lr : Rr;
		this._slide(r, t[e]);
	}
	dispose() {
		this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.defaultInterval = e.interval, e;
	}
	_addEventListeners() {
		this._config.keyboard && I.on(this._element, Ur, (e) => this._keydown(e)), this._config.pause === "hover" && (I.on(this._element, Wr, () => this.pause()), I.on(this._element, Gr, () => this._maybeEnableCycle())), this._config.touch && Ar.isSupported() && this._addTouchEventListeners();
	}
	_addTouchEventListeners() {
		for (let e of L.find(ai, this._element)) I.on(e, Kr, (e) => e.preventDefault());
		let e = {
			leftCallback: () => this._slide(this._directionToOrder(zr)),
			rightCallback: () => this._slide(this._directionToOrder(Br)),
			endCallback: () => {
				this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Ir + this._config.interval));
			}
		};
		this._swipeHelper = new Ar(this._element, e);
	}
	_keydown(e) {
		if (/input|textarea/i.test(e.target.tagName)) return;
		let t = li[e.key];
		t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
	}
	_getItemIndex(e) {
		return this._getItems().indexOf(e);
	}
	_setActiveIndicatorElement(e) {
		if (!this._indicatorsElement) return;
		let t = L.findOne(ni, this._indicatorsElement);
		t.classList.remove(Xr), t.removeAttribute("aria-current");
		let n = L.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
		n && (n.classList.add(Xr), n.setAttribute("aria-current", "true"));
	}
	_updateInterval() {
		let e = this._activeElement || this._getActive();
		if (!e) return;
		let t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
		this._config.interval = t || this._config.defaultInterval;
	}
	_slide(e, t = null) {
		if (this._isSliding) return;
		let n = this._getActive(), r = e === Lr, i = t || An(this._getItems(), n, r, this._config.wrap);
		if (i === n) return;
		let a = this._getItemIndex(i), o = (t) => I.trigger(this._element, t, {
			relatedTarget: i,
			direction: this._orderToDirection(e),
			from: this._getItemIndex(n),
			to: a
		});
		if (o(Vr).defaultPrevented || !n || !i) return;
		let s = !!this._interval;
		this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = i;
		let c = r ? $r : Qr, l = r ? ei : ti;
		i.classList.add(l), Sn(i), n.classList.add(c), i.classList.add(c), this._queueCallback(() => {
			i.classList.remove(c, l), i.classList.add(Xr), n.classList.remove(Xr, l, c), this._isSliding = !1, o(Hr);
		}, n, this._isAnimated()), s && this.cycle();
	}
	_isAnimated() {
		return this._element.classList.contains(Zr);
	}
	_getActive() {
		return L.findOne(ii, this._element);
	}
	_getItems() {
		return L.find(ri, this._element);
	}
	_clearInterval() {
		this._interval &&= (clearInterval(this._interval), null);
	}
	_directionToOrder(e) {
		return En() ? e === zr ? Rr : Lr : e === zr ? Lr : Rr;
	}
	_orderToDirection(e) {
		return En() ? e === Rr ? zr : Br : e === Rr ? Br : zr;
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "number") n.to(t);
			else if (typeof t == "string") {
				if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
};
I.on(document, Jr, si, function(e) {
	let t = L.getElementFromSelector(this);
	if (!t || !t.classList.contains(Yr)) return;
	e.preventDefault();
	let n = fi.getOrCreateInstance(t), r = this.getAttribute("data-bs-slide-to");
	r ? (n.to(r), n._maybeEnableCycle()) : Zn.getDataAttribute(this, "slide") === "next" ? (n.next(), n._maybeEnableCycle()) : (n.prev(), n._maybeEnableCycle());
}), I.on(window, qr, () => {
	let e = L.find(ci);
	for (let t of e) fi.getOrCreateInstance(t);
}), Dn(fi);
var pi = "collapse", mi = ".bs.collapse", hi = ".data-api", gi = `show${mi}`, _i = `shown${mi}`, vi = `hide${mi}`, yi = `hidden${mi}`, bi = `click${mi}${hi}`, xi = "show", Si = "collapse", Ci = "collapsing", wi = "collapsed", Ti = `:scope .${Si} .${Si}`, Ei = "collapse-horizontal", Di = "width", Oi = "height", ki = ".collapse.show, .collapse.collapsing", Ai = "[data-bs-toggle=\"collapse\"]", ji = {
	parent: null,
	toggle: !0
}, Mi = {
	parent: "(null|element)",
	toggle: "boolean"
}, Ni = class e extends er {
	constructor(e, t) {
		super(e, t), this._isTransitioning = !1, this._triggerArray = [];
		let n = L.find(Ai);
		for (let e of n) {
			let t = L.getSelectorFromElement(e), n = L.find(t).filter((e) => e === this._element);
			t !== null && n.length && this._triggerArray.push(e);
		}
		this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
	}
	static get Default() {
		return ji;
	}
	static get DefaultType() {
		return Mi;
	}
	static get NAME() {
		return pi;
	}
	toggle() {
		this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (this._isTransitioning || this._isShown()) return;
		let t = [];
		if (this._config.parent && (t = this._getFirstLevelChildren(ki).filter((e) => e !== this._element).map((t) => e.getOrCreateInstance(t, { toggle: !1 }))), t.length && t[0]._isTransitioning || I.trigger(this._element, gi).defaultPrevented) return;
		for (let e of t) e.hide();
		let n = this._getDimension();
		this._element.classList.remove(Si), this._element.classList.add(Ci), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
		let r = () => {
			this._isTransitioning = !1, this._element.classList.remove(Ci), this._element.classList.add(Si, xi), this._element.style[n] = "", I.trigger(this._element, _i);
		}, i = `scroll${n[0].toUpperCase() + n.slice(1)}`;
		this._queueCallback(r, this._element, !0), this._element.style[n] = `${this._element[i]}px`;
	}
	hide() {
		if (this._isTransitioning || !this._isShown() || I.trigger(this._element, vi).defaultPrevented) return;
		let e = this._getDimension();
		this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Sn(this._element), this._element.classList.add(Ci), this._element.classList.remove(Si, xi);
		for (let e of this._triggerArray) {
			let t = L.getElementFromSelector(e);
			t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
		}
		this._isTransitioning = !0;
		let t = () => {
			this._isTransitioning = !1, this._element.classList.remove(Ci), this._element.classList.add(Si), I.trigger(this._element, yi);
		};
		this._element.style[e] = "", this._queueCallback(t, this._element, !0);
	}
	_isShown(e = this._element) {
		return e.classList.contains(xi);
	}
	_configAfterMerge(e) {
		return e.toggle = !!e.toggle, e.parent = _n(e.parent), e;
	}
	_getDimension() {
		return this._element.classList.contains(Ei) ? Di : Oi;
	}
	_initializeChildren() {
		if (!this._config.parent) return;
		let e = this._getFirstLevelChildren(Ai);
		for (let t of e) {
			let e = L.getElementFromSelector(t);
			e && this._addAriaAndCollapsedClass([t], this._isShown(e));
		}
	}
	_getFirstLevelChildren(e) {
		let t = L.find(Ti, this._config.parent);
		return L.find(e, this._config.parent).filter((e) => !t.includes(e));
	}
	_addAriaAndCollapsedClass(e, t) {
		if (e.length) for (let n of e) n.classList.toggle(wi, !t), n.setAttribute("aria-expanded", t);
	}
	static jQueryInterface(t) {
		let n = {};
		return typeof t == "string" && /show|hide/.test(t) && (n.toggle = !1), this.each(function() {
			let r = e.getOrCreateInstance(this, n);
			if (typeof t == "string") {
				if (r[t] === void 0) throw TypeError(`No method named "${t}"`);
				r[t]();
			}
		});
	}
};
I.on(document, bi, Ai, function(e) {
	(e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
	for (let e of L.getMultipleElementsFromSelector(this)) Ni.getOrCreateInstance(e, { toggle: !1 }).toggle();
}), Dn(Ni);
var Pi = "dropdown", Fi = ".bs.dropdown", Ii = ".data-api", Li = "Escape", Ri = "Tab", zi = "ArrowUp", Bi = "ArrowDown", Vi = 2, Hi = `hide${Fi}`, Ui = `hidden${Fi}`, Wi = `show${Fi}`, Gi = `shown${Fi}`, Ki = `click${Fi}${Ii}`, qi = `keydown${Fi}${Ii}`, Ji = `keyup${Fi}${Ii}`, Yi = "show", Xi = "dropup", Zi = "dropend", Qi = "dropstart", $i = "dropup-center", ea = "dropdown-center", ta = "[data-bs-toggle=\"dropdown\"]:not(.disabled):not(:disabled)", na = `${ta}.${Yi}`, ra = ".dropdown-menu", ia = ".navbar", aa = ".navbar-nav", oa = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", sa = En() ? "top-end" : "top-start", ca = En() ? "top-start" : "top-end", la = En() ? "bottom-end" : "bottom-start", ua = En() ? "bottom-start" : "bottom-end", da = En() ? "left-start" : "right-start", fa = En() ? "right-start" : "left-start", pa = "top", ma = "bottom", ha = {
	autoClose: !0,
	boundary: "clippingParents",
	display: "dynamic",
	offset: [0, 2],
	popperConfig: null,
	reference: "toggle"
}, ga = {
	autoClose: "(boolean|string)",
	boundary: "(string|element)",
	display: "string",
	offset: "(array|string|function)",
	popperConfig: "(null|object|function)",
	reference: "(string|element|object)"
}, _a = class e extends er {
	constructor(e, t) {
		super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = L.next(this._element, ra)[0] || L.prev(this._element, ra)[0] || L.findOne(ra, this._parent), this._inNavbar = this._detectNavbar();
	}
	static get Default() {
		return ha;
	}
	static get DefaultType() {
		return ga;
	}
	static get NAME() {
		return Pi;
	}
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (yn(this._element) || this._isShown()) return;
		let e = { relatedTarget: this._element };
		if (!I.trigger(this._element, Wi, e).defaultPrevented) {
			if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(aa)) for (let e of [].concat(...document.body.children)) I.on(e, "mouseover", xn);
			this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Yi), this._element.classList.add(Yi), I.trigger(this._element, Gi, e);
		}
	}
	hide() {
		if (yn(this._element) || !this._isShown()) return;
		let e = { relatedTarget: this._element };
		this._completeHide(e);
	}
	dispose() {
		this._popper && this._popper.destroy(), super.dispose();
	}
	update() {
		this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
	}
	_completeHide(e) {
		if (!I.trigger(this._element, Hi, e).defaultPrevented) {
			if ("ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) I.off(e, "mouseover", xn);
			this._popper && this._popper.destroy(), this._menu.classList.remove(Yi), this._element.classList.remove(Yi), this._element.setAttribute("aria-expanded", "false"), Zn.removeDataAttribute(this._menu, "popper"), I.trigger(this._element, Ui, e);
		}
	}
	_getConfig(e) {
		if (e = super._getConfig(e), typeof e.reference == "object" && !gn(e.reference) && typeof e.reference.getBoundingClientRect != "function") throw TypeError(`${Pi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		return e;
	}
	_createPopper() {
		if (an === void 0) throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
		let e = this._element;
		this._config.reference === "parent" ? e = this._parent : gn(this._config.reference) ? e = _n(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
		let t = this._getPopperConfig();
		this._popper = rn(e, this._menu, t);
	}
	_isShown() {
		return this._menu.classList.contains(Yi);
	}
	_getPlacement() {
		let e = this._parent;
		if (e.classList.contains(Zi)) return da;
		if (e.classList.contains(Qi)) return fa;
		if (e.classList.contains($i)) return pa;
		if (e.classList.contains(ea)) return ma;
		let t = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
		return e.classList.contains(Xi) ? t ? ca : sa : t ? ua : la;
	}
	_detectNavbar() {
		return this._element.closest(ia) !== null;
	}
	_getOffset() {
		let { offset: e } = this._config;
		return typeof e == "string" ? e.split(",").map((e) => Number.parseInt(e, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
	}
	_getPopperConfig() {
		let e = {
			placement: this._getPlacement(),
			modifiers: [{
				name: "preventOverflow",
				options: { boundary: this._config.boundary }
			}, {
				name: "offset",
				options: { offset: this._getOffset() }
			}]
		};
		return (this._inNavbar || this._config.display === "static") && (Zn.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
			name: "applyStyles",
			enabled: !1
		}]), {
			...e,
			...On(this._config.popperConfig, [void 0, e])
		};
	}
	_selectMenuItem({ key: e, target: t }) {
		let n = L.find(oa, this._menu).filter((e) => vn(e));
		n.length && An(n, t, e === Bi, !n.includes(t)).focus();
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (n[t] === void 0) throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
	static clearMenus(t) {
		if (t.button === Vi || t.type === "keyup" && t.key !== Ri) return;
		let n = L.find(na);
		for (let r of n) {
			let n = e.getInstance(r);
			if (!n || n._config.autoClose === !1) continue;
			let i = t.composedPath(), a = i.includes(n._menu);
			if (i.includes(n._element) || n._config.autoClose === "inside" && !a || n._config.autoClose === "outside" && a || n._menu.contains(t.target) && (t.type === "keyup" && t.key === Ri || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
			let o = { relatedTarget: n._element };
			t.type === "click" && (o.clickEvent = t), n._completeHide(o);
		}
	}
	static dataApiKeydownHandler(t) {
		let n = /input|textarea/i.test(t.target.tagName), r = t.key === Li, i = [zi, Bi].includes(t.key);
		if (!i && !r || n && !r) return;
		t.preventDefault();
		let a = this.matches(ta) ? this : L.prev(this, ta)[0] || L.next(this, ta)[0] || L.findOne(ta, t.delegateTarget.parentNode), o = e.getOrCreateInstance(a);
		i ? (t.stopPropagation(), o.show(), o._selectMenuItem(t)) : o._isShown() && (t.stopPropagation(), o.hide(), a.focus());
	}
};
I.on(document, qi, ta, _a.dataApiKeydownHandler), I.on(document, qi, ra, _a.dataApiKeydownHandler), I.on(document, Ki, _a.clearMenus), I.on(document, Ji, _a.clearMenus), I.on(document, Ki, ta, function(e) {
	e.preventDefault(), _a.getOrCreateInstance(this).toggle();
}), Dn(_a);
var va = "backdrop", ya = "fade", ba = "show", xa = `mousedown.bs.${va}`, Sa = {
	className: "modal-backdrop",
	clickCallback: null,
	isAnimated: !1,
	isVisible: !0,
	rootElement: "body"
}, Ca = {
	className: "string",
	clickCallback: "(function|null)",
	isAnimated: "boolean",
	isVisible: "boolean",
	rootElement: "(element|string)"
}, wa = class extends Qn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null;
	}
	static get Default() {
		return Sa;
	}
	static get DefaultType() {
		return Ca;
	}
	static get NAME() {
		return va;
	}
	show(e) {
		if (!this._config.isVisible) {
			On(e);
			return;
		}
		this._append();
		let t = this._getElement();
		this._config.isAnimated && Sn(t), t.classList.add(ba), this._emulateAnimation(() => {
			On(e);
		});
	}
	hide(e) {
		this._config.isVisible ? (this._getElement().classList.remove(ba), this._emulateAnimation(() => {
			this.dispose(), On(e);
		})) : On(e);
	}
	dispose() {
		this._isAppended &&= (I.off(this._element, xa), this._element.remove(), !1);
	}
	_getElement() {
		if (!this._element) {
			let e = document.createElement("div");
			e.className = this._config.className, this._config.isAnimated && e.classList.add(ya), this._element = e;
		}
		return this._element;
	}
	_configAfterMerge(e) {
		return e.rootElement = _n(e.rootElement), e;
	}
	_append() {
		if (this._isAppended) return;
		let e = this._getElement();
		this._config.rootElement.append(e), I.on(e, xa, () => {
			On(this._config.clickCallback);
		}), this._isAppended = !0;
	}
	_emulateAnimation(e) {
		kn(e, this._getElement(), this._config.isAnimated);
	}
}, Ta = "focustrap", Ea = ".bs.focustrap", Da = `focusin${Ea}`, Oa = `keydown.tab${Ea}`, ka = "Tab", Aa = "forward", ja = "backward", Ma = {
	autofocus: !0,
	trapElement: null
}, Na = {
	autofocus: "boolean",
	trapElement: "element"
}, Pa = class extends Qn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null;
	}
	static get Default() {
		return Ma;
	}
	static get DefaultType() {
		return Na;
	}
	static get NAME() {
		return Ta;
	}
	activate() {
		this._isActive ||= (this._config.autofocus && this._config.trapElement.focus(), I.off(document, Ea), I.on(document, Da, (e) => this._handleFocusin(e)), I.on(document, Oa, (e) => this._handleKeydown(e)), !0);
	}
	deactivate() {
		this._isActive && (this._isActive = !1, I.off(document, Ea));
	}
	_handleFocusin(e) {
		let { trapElement: t } = this._config;
		if (e.target === document || e.target === t || t.contains(e.target)) return;
		let n = L.focusableChildren(t);
		n.length === 0 ? t.focus() : this._lastTabNavDirection === ja ? n[n.length - 1].focus() : n[0].focus();
	}
	_handleKeydown(e) {
		e.key === ka && (this._lastTabNavDirection = e.shiftKey ? ja : Aa);
	}
}, Fa = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Ia = ".sticky-top", La = "padding-right", Ra = "margin-right", za = class {
	constructor() {
		this._element = document.body;
	}
	getWidth() {
		let e = document.documentElement.clientWidth;
		return Math.abs(window.innerWidth - e);
	}
	hide() {
		let e = this.getWidth();
		this._disableOverFlow(), this._setElementAttributes(this._element, La, (t) => t + e), this._setElementAttributes(Fa, La, (t) => t + e), this._setElementAttributes(Ia, Ra, (t) => t - e);
	}
	reset() {
		this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, La), this._resetElementAttributes(Fa, La), this._resetElementAttributes(Ia, Ra);
	}
	isOverflowing() {
		return this.getWidth() > 0;
	}
	_disableOverFlow() {
		this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
	}
	_setElementAttributes(e, t, n) {
		let r = this.getWidth();
		this._applyManipulationCallback(e, (e) => {
			if (e !== this._element && window.innerWidth > e.clientWidth + r) return;
			this._saveInitialAttribute(e, t);
			let i = window.getComputedStyle(e).getPropertyValue(t);
			e.style.setProperty(t, `${n(Number.parseFloat(i))}px`);
		});
	}
	_saveInitialAttribute(e, t) {
		let n = e.style.getPropertyValue(t);
		n && Zn.setDataAttribute(e, t, n);
	}
	_resetElementAttributes(e, t) {
		this._applyManipulationCallback(e, (e) => {
			let n = Zn.getDataAttribute(e, t);
			n === null ? e.style.removeProperty(t) : (Zn.removeDataAttribute(e, t), e.style.setProperty(t, n));
		});
	}
	_applyManipulationCallback(e, t) {
		if (gn(e)) t(e);
		else for (let n of L.find(e, this._element)) t(n);
	}
}, Ba = "modal", Va = ".bs.modal", Ha = ".data-api", Ua = "Escape", Wa = `hide${Va}`, Ga = `hidePrevented${Va}`, Ka = `hidden${Va}`, qa = `show${Va}`, Ja = `shown${Va}`, Ya = `resize${Va}`, Xa = `click.dismiss${Va}`, Za = `mousedown.dismiss${Va}`, Qa = `keydown.dismiss${Va}`, $a = `click${Va}${Ha}`, eo = "modal-open", to = "fade", no = "show", ro = "modal-static", io = ".modal.show", ao = ".modal-dialog", oo = ".modal-body", so = "[data-bs-toggle=\"modal\"]", co = {
	backdrop: !0,
	focus: !0,
	keyboard: !0
}, lo = {
	backdrop: "(boolean|string)",
	focus: "boolean",
	keyboard: "boolean"
}, uo = class e extends er {
	constructor(e, t) {
		super(e, t), this._dialog = L.findOne(ao, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new za(), this._addEventListeners();
	}
	static get Default() {
		return co;
	}
	static get DefaultType() {
		return lo;
	}
	static get NAME() {
		return Ba;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || this._isTransitioning || I.trigger(this._element, qa, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(eo), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
	}
	hide() {
		this._isShown && !this._isTransitioning && (I.trigger(this._element, Wa).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(no), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
	}
	dispose() {
		I.off(window, Va), I.off(this._dialog, Va), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	handleUpdate() {
		this._adjustDialog();
	}
	_initializeBackDrop() {
		return new wa({
			isVisible: !!this._config.backdrop,
			isAnimated: this._isAnimated()
		});
	}
	_initializeFocusTrap() {
		return new Pa({ trapElement: this._element });
	}
	_showElement(e) {
		document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
		let t = L.findOne(oo, this._dialog);
		t && (t.scrollTop = 0), Sn(this._element), this._element.classList.add(no), this._queueCallback(() => {
			this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, I.trigger(this._element, Ja, { relatedTarget: e });
		}, this._dialog, this._isAnimated());
	}
	_addEventListeners() {
		I.on(this._element, Qa, (e) => {
			e.key === Ua && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
		}), I.on(window, Ya, () => {
			this._isShown && !this._isTransitioning && this._adjustDialog();
		}), I.on(this._element, Za, (e) => {
			I.one(this._element, Xa, (t) => {
				this._element === e.target && this._element === t.target && (this._config.backdrop === "static" ? this._triggerBackdropTransition() : this._config.backdrop && this.hide());
			});
		});
	}
	_hideModal() {
		this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
			document.body.classList.remove(eo), this._resetAdjustments(), this._scrollBar.reset(), I.trigger(this._element, Ka);
		});
	}
	_isAnimated() {
		return this._element.classList.contains(to);
	}
	_triggerBackdropTransition() {
		if (I.trigger(this._element, Ga).defaultPrevented) return;
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._element.style.overflowY;
		t === "hidden" || this._element.classList.contains(ro) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(ro), this._queueCallback(() => {
			this._element.classList.remove(ro), this._queueCallback(() => {
				this._element.style.overflowY = t;
			}, this._dialog);
		}, this._dialog), this._element.focus());
	}
	_adjustDialog() {
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._scrollBar.getWidth(), n = t > 0;
		if (n && !e) {
			let e = En() ? "paddingLeft" : "paddingRight";
			this._element.style[e] = `${t}px`;
		}
		if (!n && e) {
			let e = En() ? "paddingRight" : "paddingLeft";
			this._element.style[e] = `${t}px`;
		}
	}
	_resetAdjustments() {
		this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
	}
	static jQueryInterface(t, n) {
		return this.each(function() {
			let r = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (r[t] === void 0) throw TypeError(`No method named "${t}"`);
				r[t](n);
			}
		});
	}
};
I.on(document, $a, so, function(e) {
	let t = L.getElementFromSelector(this);
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), I.one(t, qa, (e) => {
		e.defaultPrevented || I.one(t, Ka, () => {
			vn(this) && this.focus();
		});
	});
	let n = L.findOne(io);
	n && uo.getInstance(n).hide(), uo.getOrCreateInstance(t).toggle(this);
}), nr(uo), Dn(uo);
var fo = "offcanvas", po = ".bs.offcanvas", mo = ".data-api", ho = `load${po}${mo}`, go = "Escape", _o = "show", vo = "showing", yo = "hiding", bo = "offcanvas-backdrop", xo = ".offcanvas.show", So = `show${po}`, Co = `shown${po}`, wo = `hide${po}`, To = `hidePrevented${po}`, Eo = `hidden${po}`, Do = `resize${po}`, Oo = `click${po}${mo}`, ko = `keydown.dismiss${po}`, Ao = "[data-bs-toggle=\"offcanvas\"]", jo = {
	backdrop: !0,
	keyboard: !0,
	scroll: !1
}, Mo = {
	backdrop: "(boolean|string)",
	keyboard: "boolean",
	scroll: "boolean"
}, No = class e extends er {
	constructor(e, t) {
		super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
	}
	static get Default() {
		return jo;
	}
	static get DefaultType() {
		return Mo;
	}
	static get NAME() {
		return fo;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || I.trigger(this._element, So, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || new za().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(vo), this._queueCallback(() => {
			(!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(_o), this._element.classList.remove(vo), I.trigger(this._element, Co, { relatedTarget: e });
		}, this._element, !0));
	}
	hide() {
		this._isShown && !I.trigger(this._element, wo).defaultPrevented && (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(yo), this._backdrop.hide(), this._queueCallback(() => {
			this._element.classList.remove(_o, yo), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new za().reset(), I.trigger(this._element, Eo);
		}, this._element, !0));
	}
	dispose() {
		this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	_initializeBackDrop() {
		let e = () => {
			this._config.backdrop === "static" ? I.trigger(this._element, To) : this.hide();
		}, t = !!this._config.backdrop;
		return new wa({
			className: bo,
			isVisible: t,
			isAnimated: !0,
			rootElement: this._element.parentNode,
			clickCallback: t ? e : null
		});
	}
	_initializeFocusTrap() {
		return new Pa({ trapElement: this._element });
	}
	_addEventListeners() {
		I.on(this._element, ko, (e) => {
			e.key === go && (this._config.keyboard ? this.hide() : I.trigger(this._element, To));
		});
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw TypeError(`No method named "${t}"`);
				n[t](this);
			}
		});
	}
};
I.on(document, Oo, Ao, function(e) {
	let t = L.getElementFromSelector(this);
	if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), yn(this)) return;
	I.one(t, Eo, () => {
		vn(this) && this.focus();
	});
	let n = L.findOne(xo);
	n && n !== t && No.getInstance(n).hide(), No.getOrCreateInstance(t).toggle(this);
}), I.on(window, ho, () => {
	for (let e of L.find(xo)) No.getOrCreateInstance(e).show();
}), I.on(window, Do, () => {
	for (let e of L.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(e).position !== "fixed" && No.getOrCreateInstance(e).hide();
}), nr(No), Dn(No);
var Po = {
	"*": [
		"class",
		"dir",
		"id",
		"lang",
		"role",
		/^aria-[\w-]*$/i
	],
	a: [
		"target",
		"href",
		"title",
		"rel"
	],
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
	img: [
		"src",
		"srcset",
		"alt",
		"title",
		"width",
		"height"
	],
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
}, Fo = /* @__PURE__ */ new Set([
	"background",
	"cite",
	"href",
	"itemtype",
	"longdesc",
	"poster",
	"src",
	"xlink:href"
]), Io = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Lo = (e, t) => {
	let n = e.nodeName.toLowerCase();
	return t.includes(n) ? !Fo.has(n) || !!Io.test(e.nodeValue) : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
};
function Ro(e, t, n) {
	if (!e.length) return e;
	if (n && typeof n == "function") return n(e);
	let r = new window.DOMParser().parseFromString(e, "text/html"), i = [].concat(...r.body.querySelectorAll("*"));
	for (let e of i) {
		let n = e.nodeName.toLowerCase();
		if (!Object.keys(t).includes(n)) {
			e.remove();
			continue;
		}
		let r = [].concat(...e.attributes), i = [].concat(t["*"] || [], t[n] || []);
		for (let t of r) Lo(t, i) || e.removeAttribute(t.nodeName);
	}
	return r.body.innerHTML;
}
var zo = "TemplateFactory", Bo = {
	allowList: Po,
	content: {},
	extraClass: "",
	html: !1,
	sanitize: !0,
	sanitizeFn: null,
	template: "<div></div>"
}, Vo = {
	allowList: "object",
	content: "object",
	extraClass: "(string|function)",
	html: "boolean",
	sanitize: "boolean",
	sanitizeFn: "(null|function)",
	template: "string"
}, Ho = {
	entry: "(string|element|function|null)",
	selector: "(string|element)"
}, Uo = class extends Qn {
	constructor(e) {
		super(), this._config = this._getConfig(e);
	}
	static get Default() {
		return Bo;
	}
	static get DefaultType() {
		return Vo;
	}
	static get NAME() {
		return zo;
	}
	getContent() {
		return Object.values(this._config.content).map((e) => this._resolvePossibleFunction(e)).filter(Boolean);
	}
	hasContent() {
		return this.getContent().length > 0;
	}
	changeContent(e) {
		return this._checkContent(e), this._config.content = {
			...this._config.content,
			...e
		}, this;
	}
	toHtml() {
		let e = document.createElement("div");
		e.innerHTML = this._maybeSanitize(this._config.template);
		for (let [t, n] of Object.entries(this._config.content)) this._setContent(e, n, t);
		let t = e.children[0], n = this._resolvePossibleFunction(this._config.extraClass);
		return n && t.classList.add(...n.split(" ")), t;
	}
	_typeCheckConfig(e) {
		super._typeCheckConfig(e), this._checkContent(e.content);
	}
	_checkContent(e) {
		for (let [t, n] of Object.entries(e)) super._typeCheckConfig({
			selector: t,
			entry: n
		}, Ho);
	}
	_setContent(e, t, n) {
		let r = L.findOne(n, e);
		r && (t = this._resolvePossibleFunction(t), t ? gn(t) ? this._putElementInTemplate(_n(t), r) : this._config.html ? r.innerHTML = this._maybeSanitize(t) : r.textContent = t : r.remove());
	}
	_maybeSanitize(e) {
		return this._config.sanitize ? Ro(e, this._config.allowList, this._config.sanitizeFn) : e;
	}
	_resolvePossibleFunction(e) {
		return On(e, [void 0, this]);
	}
	_putElementInTemplate(e, t) {
		this._config.html ? (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent;
	}
}, Wo = "tooltip", Go = /* @__PURE__ */ new Set([
	"sanitize",
	"allowList",
	"sanitizeFn"
]), Ko = "fade", qo = "modal", Jo = "show", Yo = ".tooltip-inner", Xo = `.${qo}`, Zo = "hide.bs.modal", Qo = "hover", $o = "focus", es = "click", ts = "manual", ns = "hide", rs = "hidden", is = "show", as = "shown", ss = "inserted", cs = "click", ls = "focusin", us = "focusout", ds = "mouseenter", fs = "mouseleave", ps = {
	AUTO: "auto",
	TOP: "top",
	RIGHT: En() ? "left" : "right",
	BOTTOM: "bottom",
	LEFT: En() ? "right" : "left"
}, ms = {
	allowList: Po,
	animation: !0,
	boundary: "clippingParents",
	container: !1,
	customClass: "",
	delay: 0,
	fallbackPlacements: [
		"top",
		"right",
		"bottom",
		"left"
	],
	html: !1,
	offset: [0, 6],
	placement: "top",
	popperConfig: null,
	sanitize: !0,
	sanitizeFn: null,
	selector: !1,
	template: "<div class=\"tooltip\" role=\"tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
	title: "",
	trigger: "hover focus"
}, hs = {
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
}, gs = class e extends er {
	constructor(e, t) {
		if (an === void 0) throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
		super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
	}
	static get Default() {
		return ms;
	}
	static get DefaultType() {
		return hs;
	}
	static get NAME() {
		return Wo;
	}
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
		this._isEnabled && (this._isShown() ? this._leave() : this._enter());
	}
	dispose() {
		clearTimeout(this._timeout), I.off(this._element.closest(Xo), Zo, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
	}
	show() {
		if (this._element.style.display === "none") throw Error("Please use show on visible elements");
		if (!(this._isWithContent() && this._isEnabled)) return;
		let e = I.trigger(this._element, this.constructor.eventName(is)), t = (bn(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
		if (e.defaultPrevented || !t) return;
		this._disposePopper();
		let n = this._getTipElement();
		this._element.setAttribute("aria-describedby", n.getAttribute("id"));
		let { container: r } = this._config;
		if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(n), I.trigger(this._element, this.constructor.eventName(ss))), this._popper = this._createPopper(n), n.classList.add(Jo), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) I.on(e, "mouseover", xn);
		this._queueCallback(() => {
			I.trigger(this._element, this.constructor.eventName(as)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
		}, this.tip, this._isAnimated());
	}
	hide() {
		if (this._isShown() && !I.trigger(this._element, this.constructor.eventName(ns)).defaultPrevented) {
			if (this._getTipElement().classList.remove(Jo), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) I.off(e, "mouseover", xn);
			this._activeTrigger[es] = !1, this._activeTrigger[$o] = !1, this._activeTrigger[Qo] = !1, this._isHovered = null, this._queueCallback(() => {
				this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), I.trigger(this._element, this.constructor.eventName(rs)));
			}, this.tip, this._isAnimated());
		}
	}
	update() {
		this._popper && this._popper.update();
	}
	_isWithContent() {
		return !!this._getTitle();
	}
	_getTipElement() {
		return this.tip ||= this._createTipElement(this._newContent || this._getContentForTemplate()), this.tip;
	}
	_createTipElement(e) {
		let t = this._getTemplateFactory(e).toHtml();
		if (!t) return null;
		t.classList.remove(Ko, Jo), t.classList.add(`bs-${this.constructor.NAME}-auto`);
		let n = pn(this.constructor.NAME).toString();
		return t.setAttribute("id", n), this._isAnimated() && t.classList.add(Ko), t;
	}
	setContent(e) {
		this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
	}
	_getTemplateFactory(e) {
		return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new Uo({
			...this._config,
			content: e,
			extraClass: this._resolvePossibleFunction(this._config.customClass)
		}), this._templateFactory;
	}
	_getContentForTemplate() {
		return { [Yo]: this._getTitle() };
	}
	_getTitle() {
		return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
	}
	_initializeOnDelegatedTarget(e) {
		return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
	}
	_isAnimated() {
		return this._config.animation || this.tip && this.tip.classList.contains(Ko);
	}
	_isShown() {
		return this.tip && this.tip.classList.contains(Jo);
	}
	_createPopper(e) {
		let t = ps[On(this._config.placement, [
			this,
			e,
			this._element
		]).toUpperCase()];
		return rn(this._element, e, this._getPopperConfig(t));
	}
	_getOffset() {
		let { offset: e } = this._config;
		return typeof e == "string" ? e.split(",").map((e) => Number.parseInt(e, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
	}
	_resolvePossibleFunction(e) {
		return On(e, [this._element, this._element]);
	}
	_getPopperConfig(e) {
		let t = {
			placement: e,
			modifiers: [
				{
					name: "flip",
					options: { fallbackPlacements: this._config.fallbackPlacements }
				},
				{
					name: "offset",
					options: { offset: this._getOffset() }
				},
				{
					name: "preventOverflow",
					options: { boundary: this._config.boundary }
				},
				{
					name: "arrow",
					options: { element: `.${this.constructor.NAME}-arrow` }
				},
				{
					name: "preSetPlacement",
					enabled: !0,
					phase: "beforeMain",
					fn: (e) => {
						this._getTipElement().setAttribute("data-popper-placement", e.state.placement);
					}
				}
			]
		};
		return {
			...t,
			...On(this._config.popperConfig, [void 0, t])
		};
	}
	_setListeners() {
		let e = this._config.trigger.split(" ");
		for (let t of e) if (t === "click") I.on(this._element, this.constructor.eventName(cs), this._config.selector, (e) => {
			let t = this._initializeOnDelegatedTarget(e);
			t._activeTrigger[es] = !(t._isShown() && t._activeTrigger[es]), t.toggle();
		});
		else if (t !== ts) {
			let e = t === Qo ? this.constructor.eventName(ds) : this.constructor.eventName(ls), n = t === Qo ? this.constructor.eventName(fs) : this.constructor.eventName(us);
			I.on(this._element, e, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusin" ? $o : Qo] = !0, t._enter();
			}), I.on(this._element, n, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusout" ? $o : Qo] = t._element.contains(e.relatedTarget), t._leave();
			});
		}
		this._hideModalHandler = () => {
			this._element && this.hide();
		}, I.on(this._element.closest(Xo), Zo, this._hideModalHandler);
	}
	_fixTitle() {
		let e = this._element.getAttribute("title");
		e && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"));
	}
	_enter() {
		this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => {
			this._isHovered && this.show();
		}, this._config.delay.show));
	}
	_leave() {
		this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
			this._isHovered || this.hide();
		}, this._config.delay.hide));
	}
	_setTimeout(e, t) {
		clearTimeout(this._timeout), this._timeout = setTimeout(e, t);
	}
	_isWithActiveTrigger() {
		return Object.values(this._activeTrigger).includes(!0);
	}
	_getConfig(e) {
		let t = Zn.getDataAttributes(this._element);
		for (let e of Object.keys(t)) Go.has(e) && delete t[e];
		return e = {
			...t,
			...typeof e == "object" && e ? e : {}
		}, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	_configAfterMerge(e) {
		return e.container = e.container === !1 ? document.body : _n(e.container), typeof e.delay == "number" && (e.delay = {
			show: e.delay,
			hide: e.delay
		}), typeof e.title == "number" && (e.title = e.title.toString()), typeof e.content == "number" && (e.content = e.content.toString()), e;
	}
	_getDelegateConfig() {
		let e = {};
		for (let [t, n] of Object.entries(this._config)) this.constructor.Default[t] !== n && (e[t] = n);
		return e.selector = !1, e.trigger = "manual", e;
	}
	_disposePopper() {
		this._popper &&= (this._popper.destroy(), null), this.tip &&= (this.tip.remove(), null);
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (n[t] === void 0) throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
};
Dn(gs);
var _s = "popover", vs = ".popover-header", ys = ".popover-body", bs = {
	...gs.Default,
	content: "",
	offset: [0, 8],
	placement: "right",
	template: "<div class=\"popover\" role=\"tooltip\"><div class=\"popover-arrow\"></div><h3 class=\"popover-header\"></h3><div class=\"popover-body\"></div></div>",
	trigger: "click"
}, xs = {
	...gs.DefaultType,
	content: "(null|string|element|function)"
};
Dn(class e extends gs {
	static get Default() {
		return bs;
	}
	static get DefaultType() {
		return xs;
	}
	static get NAME() {
		return _s;
	}
	_isWithContent() {
		return this._getTitle() || this._getContent();
	}
	_getContentForTemplate() {
		return {
			[vs]: this._getTitle(),
			[ys]: this._getContent()
		};
	}
	_getContent() {
		return this._resolvePossibleFunction(this._config.content);
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (n[t] === void 0) throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
});
var Ss = "scrollspy", Cs = ".bs.scrollspy", ws = ".data-api", Ts = `activate${Cs}`, Es = `click${Cs}`, Ds = `load${Cs}${ws}`, Os = "dropdown-item", ks = "active", As = "[data-bs-spy=\"scroll\"]", js = "[href]", Ms = ".nav, .list-group", Ns = ".nav-link", Ps = `${Ns}, .nav-item > ${Ns}, .list-group-item`, Fs = ".dropdown", Is = ".dropdown-toggle", Ls = {
	offset: null,
	rootMargin: "0px 0px -25%",
	smoothScroll: !1,
	target: null,
	threshold: [
		.1,
		.5,
		1
	]
}, Rs = {
	offset: "(number|null)",
	rootMargin: "string",
	smoothScroll: "boolean",
	target: "element",
	threshold: "array"
}, zs = class e extends er {
	constructor(e, t) {
		super(e, t), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
			visibleEntryTop: 0,
			parentScrollTop: 0
		}, this.refresh();
	}
	static get Default() {
		return Ls;
	}
	static get DefaultType() {
		return Rs;
	}
	static get NAME() {
		return Ss;
	}
	refresh() {
		this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
		for (let e of this._observableSections.values()) this._observer.observe(e);
	}
	dispose() {
		this._observer.disconnect(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.target = _n(e.target) || document.body, e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin, typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map((e) => Number.parseFloat(e))), e;
	}
	_maybeEnableSmoothScroll() {
		this._config.smoothScroll && (I.off(this._config.target, Es), I.on(this._config.target, Es, js, (e) => {
			let t = this._observableSections.get(e.target.hash);
			if (t) {
				e.preventDefault();
				let n = this._rootElement || window, r = t.offsetTop - this._element.offsetTop;
				if (n.scrollTo) {
					n.scrollTo({
						top: r,
						behavior: "smooth"
					});
					return;
				}
				n.scrollTop = r;
			}
		}));
	}
	_getNewObserver() {
		let e = {
			root: this._rootElement,
			threshold: this._config.threshold,
			rootMargin: this._config.rootMargin
		};
		return new IntersectionObserver((e) => this._observerCallback(e), e);
	}
	_observerCallback(e) {
		let t = (e) => this._targetLinks.get(`#${e.target.id}`), n = (e) => {
			this._previousScrollData.visibleEntryTop = e.target.offsetTop, this._process(t(e));
		}, r = (this._rootElement || document.documentElement).scrollTop, i = r >= this._previousScrollData.parentScrollTop;
		this._previousScrollData.parentScrollTop = r;
		for (let a of e) {
			if (!a.isIntersecting) {
				this._activeTarget = null, this._clearActiveClass(t(a));
				continue;
			}
			let e = a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
			if (i && e) {
				if (n(a), !r) return;
			} else !i && !e && n(a);
		}
	}
	_initializeTargetsAndObservables() {
		this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
		let e = L.find(js, this._config.target);
		for (let t of e) {
			if (!t.hash || yn(t)) continue;
			let e = L.findOne(decodeURI(t.hash), this._element);
			vn(e) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e));
		}
	}
	_process(e) {
		this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(ks), this._activateParents(e), I.trigger(this._element, Ts, { relatedTarget: e }));
	}
	_activateParents(e) {
		if (e.classList.contains(Os)) L.findOne(Is, e.closest(Fs)).classList.add(ks);
		else for (let t of L.parents(e, Ms)) for (let e of L.prev(t, Ps)) e.classList.add(ks);
	}
	_clearActiveClass(e) {
		e.classList.remove(ks);
		let t = L.find(`${js}.${ks}`, e);
		for (let e of t) e.classList.remove(ks);
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
};
I.on(window, Ds, () => {
	for (let e of L.find(As)) zs.getOrCreateInstance(e);
}), Dn(zs);
var Bs = "tab", Vs = ".bs.tab", Hs = `hide${Vs}`, Us = `hidden${Vs}`, Ws = `show${Vs}`, Gs = `shown${Vs}`, Ks = `click${Vs}`, qs = `keydown${Vs}`, Js = `load${Vs}`, Ys = "ArrowLeft", Xs = "ArrowRight", Zs = "ArrowUp", Qs = "ArrowDown", $s = "Home", ec = "End", tc = "active", nc = "fade", rc = "show", ic = "dropdown", ac = ".dropdown-toggle", oc = ".dropdown-menu", sc = `:not(${ac})`, cc = ".list-group, .nav, [role=\"tablist\"]", lc = ".nav-item, .list-group-item", uc = `.nav-link${sc}, .list-group-item${sc}, [role="tab"]${sc}`, dc = "[data-bs-toggle=\"tab\"], [data-bs-toggle=\"pill\"], [data-bs-toggle=\"list\"]", fc = `${uc}, ${dc}`, pc = `.${tc}[data-bs-toggle="tab"], .${tc}[data-bs-toggle="pill"], .${tc}[data-bs-toggle="list"]`, mc = class e extends er {
	constructor(e) {
		super(e), this._parent = this._element.closest(cc), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), I.on(this._element, qs, (e) => this._keydown(e)));
	}
	static get NAME() {
		return Bs;
	}
	show() {
		let e = this._element;
		if (this._elemIsActive(e)) return;
		let t = this._getActiveElem(), n = t ? I.trigger(t, Hs, { relatedTarget: e }) : null;
		I.trigger(e, Ws, { relatedTarget: t }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(t, e), this._activate(e, t));
	}
	_activate(e, t) {
		e && (e.classList.add(tc), this._activate(L.getElementFromSelector(e)), this._queueCallback(() => {
			e.getAttribute("role") === "tab" ? (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), I.trigger(e, Gs, { relatedTarget: t })) : e.classList.add(rc);
		}, e, e.classList.contains(nc)));
	}
	_deactivate(e, t) {
		e && (e.classList.remove(tc), e.blur(), this._deactivate(L.getElementFromSelector(e)), this._queueCallback(() => {
			e.getAttribute("role") === "tab" ? (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), I.trigger(e, Us, { relatedTarget: t })) : e.classList.remove(rc);
		}, e, e.classList.contains(nc)));
	}
	_keydown(t) {
		if (![
			Ys,
			Xs,
			Zs,
			Qs,
			$s,
			ec
		].includes(t.key)) return;
		t.stopPropagation(), t.preventDefault();
		let n = this._getChildren().filter((e) => !yn(e)), r;
		if ([$s, ec].includes(t.key)) r = n[t.key === $s ? 0 : n.length - 1];
		else {
			let e = [Xs, Qs].includes(t.key);
			r = An(n, t.target, e, !0);
		}
		r && (r.focus({ preventScroll: !0 }), e.getOrCreateInstance(r).show());
	}
	_getChildren() {
		return L.find(fc, this._parent);
	}
	_getActiveElem() {
		return this._getChildren().find((e) => this._elemIsActive(e)) || null;
	}
	_setInitialAttributes(e, t) {
		this._setAttributeIfNotExists(e, "role", "tablist");
		for (let e of t) this._setInitialAttributesOnChild(e);
	}
	_setInitialAttributesOnChild(e) {
		e = this._getInnerElement(e);
		let t = this._elemIsActive(e), n = this._getOuterElement(e);
		e.setAttribute("aria-selected", t), n !== e && this._setAttributeIfNotExists(n, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e);
	}
	_setInitialAttributesOnTargetPanel(e) {
		let t = L.getElementFromSelector(e);
		t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
	}
	_toggleDropDown(e, t) {
		let n = this._getOuterElement(e);
		if (!n.classList.contains(ic)) return;
		let r = (e, r) => {
			let i = L.findOne(e, n);
			i && i.classList.toggle(r, t);
		};
		r(ac, tc), r(oc, rc), n.setAttribute("aria-expanded", t);
	}
	_setAttributeIfNotExists(e, t, n) {
		e.hasAttribute(t) || e.setAttribute(t, n);
	}
	_elemIsActive(e) {
		return e.classList.contains(tc);
	}
	_getInnerElement(e) {
		return e.matches(fc) ? e : L.findOne(fc, e);
	}
	_getOuterElement(e) {
		return e.closest(lc) || e;
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this);
			if (typeof t == "string") {
				if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
};
I.on(document, Ks, dc, function(e) {
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), !yn(this) && mc.getOrCreateInstance(this).show();
}), I.on(window, Js, () => {
	for (let e of L.find(pc)) mc.getOrCreateInstance(e);
}), Dn(mc);
var hc = "toast", gc = ".bs.toast", _c = `mouseover${gc}`, vc = `mouseout${gc}`, yc = `focusin${gc}`, bc = `focusout${gc}`, xc = `hide${gc}`, Sc = `hidden${gc}`, Cc = `show${gc}`, wc = `shown${gc}`, Tc = "fade", Ec = "hide", Dc = "show", Oc = "showing", kc = {
	animation: "boolean",
	autohide: "boolean",
	delay: "number"
}, Ac = {
	animation: !0,
	autohide: !0,
	delay: 5e3
}, jc = class e extends er {
	constructor(e, t) {
		super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
	}
	static get Default() {
		return Ac;
	}
	static get DefaultType() {
		return kc;
	}
	static get NAME() {
		return hc;
	}
	show() {
		I.trigger(this._element, Cc).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add(Tc), this._element.classList.remove(Ec), Sn(this._element), this._element.classList.add(Dc, Oc), this._queueCallback(() => {
			this._element.classList.remove(Oc), I.trigger(this._element, wc), this._maybeScheduleHide();
		}, this._element, this._config.animation));
	}
	hide() {
		this.isShown() && !I.trigger(this._element, xc).defaultPrevented && (this._element.classList.add(Oc), this._queueCallback(() => {
			this._element.classList.add(Ec), this._element.classList.remove(Oc, Dc), I.trigger(this._element, Sc);
		}, this._element, this._config.animation));
	}
	dispose() {
		this._clearTimeout(), this.isShown() && this._element.classList.remove(Dc), super.dispose();
	}
	isShown() {
		return this._element.classList.contains(Dc);
	}
	_maybeScheduleHide() {
		this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
			this.hide();
		}, this._config.delay)));
	}
	_onInteraction(e, t) {
		switch (e.type) {
			case "mouseover":
			case "mouseout":
				this._hasMouseInteraction = t;
				break;
			case "focusin":
			case "focusout": this._hasKeyboardInteraction = t;
		}
		if (t) {
			this._clearTimeout();
			return;
		}
		let n = e.relatedTarget;
		this._element === n || this._element.contains(n) || this._maybeScheduleHide();
	}
	_setListeners() {
		I.on(this._element, _c, (e) => this._onInteraction(e, !0)), I.on(this._element, vc, (e) => this._onInteraction(e, !1)), I.on(this._element, yc, (e) => this._onInteraction(e, !0)), I.on(this._element, bc, (e) => this._onInteraction(e, !1));
	}
	_clearTimeout() {
		clearTimeout(this._timeout), this._timeout = null;
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "string") {
				if (n[t] === void 0) throw TypeError(`No method named "${t}"`);
				n[t](this);
			}
		});
	}
};
nr(jc), Dn(jc);
// node_modules/mitt/dist/mitt.mjs
function Mc(e) {
	return {
		all: e ||= /* @__PURE__ */ new Map(),
		on: function(t, n) {
			var r = e.get(t);
			r ? r.push(n) : e.set(t, [n]);
		},
		off: function(t, n) {
			var r = e.get(t);
			r && (n ? r.splice(r.indexOf(n) >>> 0, 1) : e.set(t, []));
		},
		emit: function(t, n) {
			var r = e.get(t);
			r && r.slice().map(function(e) {
				e(n);
			}), (r = e.get("*")) && r.slice().map(function(e) {
				e(t, n);
			});
		}
	};
}
// src/components/helpers.js
function Nc(e, t) {
	for (let n in t) n !== "__proto__" && n !== "constructor" && n !== "prototype" && t[n] instanceof Object && n in e && Object.assign(t[n], Nc(e[n], t[n]));
	return Object.assign(e || {}, t);
}
function Pc(e, t, n, r) {
	try {
		return typeof e == "function" ? e(t, n, r) : e;
	} catch (e) {
		return console.error(e), null;
	}
}
async function Fc(e) {
	try {
		return {
			data: await e.json(),
			error: null
		};
	} catch (e) {
		return console.error("[vu-admin] JSON parse error:", e), {
			data: void 0,
			error: e
		};
	}
}
var Ic = {
	timeout: 3500,
	priority: "danger"
};
function Lc(e) {
	return `HTTP ${e.status}${e.statusText ? " " + e.statusText : ""}`;
}
function Rc(e) {
	return {
		message: e?.message || e,
		...Ic
	};
}
function zc(e, t) {
	for (let n of t) e.push(Rc(n));
}
function Bc(e) {
	return typeof e == "object" && !!e && Object.prototype.hasOwnProperty.call(e, "data") && Object.prototype.hasOwnProperty.call(e, "error");
}
function Vc(e, t) {
	let n = [];
	if (t?.errors) {
		if (Array.isArray(t.errors)) zc(n, t.errors);
		else if (typeof t.errors == "object") {
			if (Array.isArray(t.errors.exception)) zc(n, t.errors.exception);
			else for (let e in t.errors) Array.isArray(t.errors[e]) && zc(n, t.errors[e]);
		}
	} else t && typeof t.message == "string" && e.status >= 400 ? n.push(Rc(t.message)) : e.status >= 400 && e.status <= 511 && n.push(Rc(Lc(e)));
	return n.length > 0 ? n : null;
}
function Hc(e, t) {
	if (!e) return [Rc("Network error")];
	let n = Bc(t) ? t : null;
	return Vc(e, n ? n.data : t) || (n?.error ? [Rc(n.error.message || String(n.error))] : e.ok ? null : [Rc(Lc(e))]);
}
var Uc = Date.now() ^ (typeof performance < "u" && performance.now ? performance.now() : 0) << 16;
function Wc() {
	return Uc ^= Uc << 13, Uc ^= Uc >>> 17, Uc ^= Uc << 5, (Uc >>> 0) / 4294967295;
}
function Gc(e = 16) {
	let t = Math.max(0, e), n = new Uint8Array(t);
	if (typeof crypto < "u" && crypto.getRandomValues) return crypto.getRandomValues(n), n;
	for (let e = 0; e < t; e++) n[e] = Math.floor(Wc() * 256);
	return n;
}
function Kc() {
	let e = Gc(4);
	return ((e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]) >>> 0) / 4294967295;
}
function qc(e) {
	return !e || e <= 0 ? 0 : Math.floor(Kc() * e);
}
function Jc(e = 12, t = "abcdefghijklmnopqrstuvwxyz0123456789") {
	let n = Gc(e), r = "", i = t.length;
	for (let e = 0; e < n.length; e++) r += t[n[e] % i];
	return r;
}
function Yc(e, t, n, r) {
	if (t.options ||= {}, t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), r && r.header) for (let e of Object.keys(r.header)) t.options.headers[e] = r.header[e];
	return t.options.body = void 0, t.options.method = e, n && Object.assign(t.options, n), t.options.body instanceof FormData && delete t.options.headers["Content-Type"], t.debug && console.log("[vu-admin] fetch options:", e, t.options), t.options;
}
function Xc(e, t, n, r) {
	let i = !1, a = Object.assign({}, r || {});
	r && (r.filter && (a.filter = typeof r.filter == "string" ? r.filter : JSON.stringify(r.filter)), r.order && (a.order = typeof r.order == "string" ? r.order : JSON.stringify(r.order)), i = Object.keys(a).length);
	let o = t.url + (n ? "/" + n : "") + (i ? "?" + new URLSearchParams(a).toString() : "");
	return t.debug && console.log("[vu-admin] fetch url:", o), o;
}
function Zc(e, t = "-") {
	return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Qc(e) {
	let t = [];
	for (let n of e) t.push($c(n));
	return t;
}
function $c(e, t = "", n = {}) {
	for (let r in e) {
		let i = t ? t + "." + r : r;
		typeof e[r] == "object" && !Array.isArray(e[r]) ? $c(e[r], i, n) : n[i] = e[r];
	}
	return n;
}
function el(e) {
	let t = {};
	for (let n in e) {
		let r = n.split(".");
		r.reduce((t, i, a) => t[i] || (t[i] = isNaN(Number(r[a + 1])) ? r.length - 1 === a ? e[n] : {} : []), t);
	}
	return t;
}
function tl(e, t, n, r) {
	let i = (e, t) => {
		if (!e || !t) return e;
		let n = "", r = 0;
		for (; r < e.length;) {
			let i = e.indexOf("{", r);
			if (i === -1) {
				n += e.slice(r);
				break;
			}
			n += e.slice(r, i);
			let a = e.indexOf("}", i + 1);
			if (a === -1) {
				n += e.slice(i);
				break;
			}
			let o = e.slice(i + 1, a).trim();
			n += t[o] ? t[o] : "", r = a + 1;
		}
		return n;
	};
	return !t || (r ||= document.documentElement.lang, !r || !t[r]) || !t[r][e] ? i(e, n) : i(t[r][e]);
}
function nl(e, t, n = ";") {
	return [t.map((e) => e.title ? e.title : e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(n), ...e.map((r) => t.map((t) => {
		let n = r[t.name];
		return t.template ? t.template(n, r, e) : n === void 0 ? "" : n;
	}).join(n))].join("\n");
}
function rl(e, t = "export.csv") {
	e = "﻿" + e;
	let n = new Blob([e], { type: "text/csv;charset=utf-8;" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = t, i.click(), URL.revokeObjectURL(r);
}
function il(e) {
	return [...new Set(e)];
}
function al(e, t) {
	e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function ol(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 && e.push(n.value);
}
function sl(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 ? e.push(n.value) : e.splice(e.indexOf(n.value), 1);
}
function cl(e) {
	e.length = 0;
}
function ll(e, t) {
	t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function ul(e, t) {
	t < 0 || t >= e.length - 1 || ([e[t], e[t + 1]] = [e[t + 1], e[t]]);
}
function dl(e, t) {
	Object.keys(e).forEach((n) => {
		typeof e[n] == "function" && (e[n] = e[n](t));
	});
}
function fl(e, t) {
	let n = 1024, r = n * 1024, i = r * 1024;
	return e < n ? e + (t ? " Byte" : "") : e < r ? (e / n).toFixed(0) + (t ? "<span class=\"text-muted fw-light\"> KB</span>" : "") : e < i ? (e / r).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> MB</span>" : "") : (e / i).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> GB</span>" : "");
}
function pl(e) {
	return e.split(".").reverse()[0];
}
// src/components/formUploadHelpers.js
function ml(e) {
	if (typeof e?.url != "string" || !e.url) return null;
	let t = e.upload && typeof e.upload == "object" ? e.upload : {};
	return {
		fieldName: e.name,
		url: e.url,
		fileField: t.fileField || "file",
		jsonField: t.jsonField || "json",
		presetKeys: t.presets || t.presetKeys || null,
		persist: t.persist !== !1,
		meta: typeof t.meta == "function" ? t.meta : null,
		api: t.api || { url: e.url }
	};
}
function hl(e) {
	let t = {};
	if (!e?.form?.groups) return t;
	for (let n of e.form.groups) if (Array.isArray(n.fields)) for (let e of n.fields) e.type !== "image" && e.type !== "upload" || ml(e) || (e.upload === "blob" ? t[e.name] = "blob" : t[e.name] = "dataurl");
	return t;
}
function gl(e) {
	let t = {};
	if (!e?.form?.groups) return t;
	for (let n of e.form.groups) if (Array.isArray(n.fields)) for (let e of n.fields) {
		if (e.type !== "image" && e.type !== "upload") continue;
		let n = ml(e);
		n && (t[e.name] = n);
	}
	return t;
}
function _l(e) {
	if (!e || typeof e != "object") return e;
	let t = { ...e };
	if (t.types && typeof t.types == "object") {
		t.types = {};
		for (let n of Object.keys(e.types)) {
			let r = e.types[n];
			if (!r || typeof r != "object") continue;
			let i = { ...r };
			i.url && (delete i.data, delete i.blob), t.types[n] = i;
		}
	}
	return t;
}
function vl(e) {
	if (!e || typeof e != "object") return e;
	let t = { ...e };
	if (t.types && typeof t.types == "object") {
		t.types = {};
		for (let n of Object.keys(e.types)) {
			let r = e.types[n];
			r && typeof r == "object" && (t.types[n] = {
				slug: r.slug,
				extension: r.extension,
				mime: r.mime,
				width: r.width,
				height: r.height,
				bytes: r.bytes,
				quality: r.quality,
				crop: r.crop,
				ratio: r.ratio
			});
		}
	}
	return t;
}
function yl(e, t) {
	if (!e || typeof e != "object") return e;
	if (e.uploaded || !e.types) return _l(e);
	let n = { ...e };
	n.types = {};
	for (let r of Object.keys(e.types)) {
		let i = e.types[r];
		if (!i || typeof i != "object") continue;
		let a = { ...i };
		t === "blob" && delete a.data, delete a.blob, n.types[r] = a;
	}
	return n;
}
function bl(e, t) {
	if (!e || !t || !Object.keys(t).length) return e;
	let n = { ...e };
	for (let [r, i] of Object.entries(t)) {
		let t = e[r];
		Array.isArray(t) && (n[r] = t.map((e) => yl(e, i)));
	}
	return n;
}
function xl(e, t) {
	let n = Object.keys(gl(t)), r = hl(t), i = n.length ? Sl(e, n) : { ...e }, a = bl(e, r);
	for (let e of Object.keys(r)) a[e] != null && (i[e] = a[e]);
	return i;
}
function Sl(e, t) {
	if (!e || !t?.length) return e;
	let n = { ...e };
	for (let r of t) {
		let t = e[r];
		Array.isArray(t) && (n[r] = t.map((e) => e && (e.uploaded ? _l(e) : vl(e))));
	}
	return n;
}
function Cl(e, t) {
	let n = [];
	if (!e || !t || !Object.keys(t).length) return n;
	for (let [r, i] of Object.entries(t)) {
		let t = i.presetKeys, a = e[r];
		Array.isArray(a) && a.forEach((e, a) => {
			if (e && !e.uploaded && e.types) for (let o of Object.keys(e.types)) {
				if (t && !t.includes(o)) continue;
				let s = e.types[o];
				if (!s || s.url) continue;
				let c = s.blob instanceof Blob, l = typeof s.data == "string" && s.data.startsWith("data:");
				(c || l) && n.push({
					fieldName: r,
					fileIndex: a,
					typeKey: o,
					file: e,
					typeEntry: s,
					uploadConfig: i
				});
			}
		});
	}
	return n;
}
async function wl(e) {
	if (e.blob instanceof Blob) return e.blob;
	if (typeof e.data == "string" && e.data.startsWith("data:")) return await (await fetch(e.data)).blob();
	throw Error("No binary data for upload");
}
function Tl(e, t, n) {
	let r = n?.pkey || "id";
	return {
		entity: n?.entity || n?.name || null,
		pkey: r,
		[r]: t?.[r] ?? null,
		field: e.fieldName,
		fileIndex: e.fileIndex,
		typeKey: e.typeKey,
		file: {
			uid: e.file.uid,
			slug: e.file.slug,
			title: e.file.title,
			name: e.file.name,
			tags: e.file.tags,
			timestamp: e.file.timestamp,
			isImage: e.file.isImage,
			isDocument: e.file.isDocument,
			original: e.file.original
		},
		type: {
			slug: e.typeEntry.slug,
			extension: e.typeEntry.extension,
			mime: e.typeEntry.mime,
			width: e.typeEntry.width,
			height: e.typeEntry.height,
			bytes: e.typeEntry.bytes,
			quality: e.typeEntry.quality,
			crop: e.typeEntry.crop
		},
		item: t
	};
}
function El(e) {
	let t = e.typeEntry.extension || "bin";
	return `${e.typeEntry.slug || e.file.slug || "file"}.${t}`;
}
function Dl(e, t) {
	if (!e || typeof e != "object") return e;
	let n = t?.form?.api?.input?.item;
	return n && typeof n == "string" ? e[n] ?? e : e;
}
function Ol(e) {
	return e ? typeof e.url == "string" ? e.url : e.file && typeof e.file.url == "string" ? e.file.url : Array.isArray(e.files) && e.files[0]?.url ? e.files[0].url : null : null;
}
function kl(e, t) {
	if (!e?.fieldName) return t || "Upload";
	let n = e.typeKey ? `${e.fieldName}/${e.typeKey}` : e.fieldName;
	return `${t || "Upload"} (${n})`;
}
function Al(e, t, n, r) {
	let i = t?.data, a = Hc(e, t), o = a ? [...a] : [];
	i?.message && typeof i.message == "string" && (o.some((e) => e.message === i.message) || o.unshift({
		message: i.message,
		priority: "danger",
		timeout: 14500
	}));
	let s = e?.status, c = s ? `HTTP ${s}` : "HTTP error", l = kl(n, r);
	return o.length ? o.map((e) => ({
		...e,
		message: `${l} — ${c}: ${e.message}`,
		priority: "danger",
		timeout: e.timeout || 14500
	})) : null;
}
function jl(e, t, n, r) {
	let i = Al(e, t, n, r);
	if (i?.length) {
		let t = Error(i.map((e) => e.message).join("; "));
		throw t.uploadErrors = i, t.response = e, t;
	}
	if (!e.ok) {
		let i = /* @__PURE__ */ Error(`HTTP ${e.status}`);
		throw i.uploadErrors = Al(e, t, n, r) || [{
			message: `${kl(n, r)} — HTTP ${e.status}`,
			priority: "danger",
			timeout: 14500
		}], i.response = e, i;
	}
}
async function Ml({ tasks: e, savedItem: t, settings: n, auth: r, debug: i, onProgress: a }) {
	if (!e.length) return [];
	let o = [];
	for (let s = 0; s < e.length; s++) {
		let c = e[s], l = (t) => {
			if (!a) return;
			let n = c?.typeEntry;
			a({
				current: s + 1,
				total: e.length,
				uploadCompleted: t,
				task: c,
				uploadField: c.fieldName,
				uploadTypeKey: c.typeKey,
				uploadFileName: c.file?.title || c.file?.name || null,
				uploadFileIndex: c.fileIndex + 1,
				uploadPresetSize: n?.width && n?.height ? `${n.width}×${n.height}` : null,
				uploadExtension: n?.extension || null
			});
		};
		l(s);
		let u = c.uploadConfig, d = {
			url: u.url,
			options: { ...u.api?.options || {} },
			debug: u.api?.debug
		}, f = Tl(c, t, n), p = u.meta == null ? f : u.meta(f, c, t, n, r), m = new FormData();
		m.append(u.jsonField, JSON.stringify(p));
		let h = await wl(c.typeEntry);
		m.append(u.fileField, h, El(c)), i && console.log("[vu-admin] form upload POST", u.url, p);
		let g = await fetch(Xc("POST", d, null, {}), Yc("POST", d, { body: m }, r)), _ = await Fc(g);
		jl(g, _, c, "Upload");
		let v = Ol(_.data);
		if (!v) {
			let e = /* @__PURE__ */ Error(`${kl(c, "Upload")} — HTTP ${g.status}: missing url in response`);
			throw e.uploadErrors = [{
				message: e.message,
				priority: "danger",
				timeout: 14500
			}], e.response = g, e;
		}
		o.push({
			task: c,
			data: _.data,
			url: v
		}), l(s + 1);
	}
	return o;
}
function Nl(e) {
	if (!e?.types) return;
	let t = e.types;
	e.uploaded = Object.values(t).every((e) => e && (e.url || !e.data && !(e.blob instanceof Blob))), e.loaded = Object.values(t).some((e) => e && (e.url || e.data));
}
function Pl(e) {
	Nl(e);
}
function Fl(e, t, n) {
	if (!e || !n?.length) return e;
	for (let { task: t, url: r } of n) {
		if (!r || !Array.isArray(e[t.fieldName])) continue;
		let n = e[t.fieldName][t.fileIndex];
		n?.types?.[t.typeKey] && (n.types[t.typeKey] = {
			...n.types[t.typeKey],
			url: r
		}, delete n.types[t.typeKey].data, delete n.types[t.typeKey].blob, Pl(n));
	}
	return e;
}
async function Il({ savedItem: e, item: t, uploadFieldNames: n, fieldUploadMap: r, settings: i, auth: a, urlParams: o, debug: s }) {
	let c = i?.pkey || "id", l = e?.[c];
	if (!l || !n?.length) return e;
	let u = n.filter((e) => r[e]?.persist !== !1), d = i?.form?.api?.output?.fields;
	if (Array.isArray(d) && (u = u.filter((e) => d.includes(e))), !u.length) return e;
	let f = Sl(t, u);
	if (f = Object.fromEntries(u.filter((e) => f[e] != null).map((e) => [e, f[e]])), !Object.keys(f).length) return e;
	let p, m = i?.form?.api?.output?.item;
	p = JSON.stringify(m ? typeof m == "string" ? { [m]: f } : m(f, { persist: !0 }) : f), s && console.log("[vu-admin] persist upload fields PUT", l, JSON.parse(p));
	let h = await fetch(Xc("PUT", i.form.api, l, o || {}), Yc("PUT", i.form.api, { body: p }, a)), g = await Fc(h);
	return jl(h, g, null, "Save file URLs"), Dl(g.data, i);
}
function Ll(e, t, n, r) {
	let i = Dl(e, r);
	if (!i || typeof i != "object") return e;
	for (let e of n) t[e] != null && (i[e] = t[e]);
	let a = r?.form?.api?.input?.item;
	return typeof a == "string" && e && typeof e == "object" ? {
		...e,
		[a]: i
	} : i;
}
// src/components/buttonActions.js
function Rl(e) {
	switch (e) {
		case "TABLE_RESET_ORDERS":
		case "TABLE_RESET_FILTERS": return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
		case "TABLE_CLOSE_DETAILS": return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
		case "TABLE_ROW_EDIT": return "btn btn-sm btn-secondary text-nowrap mx-1";
		case "FORM_SUBMIT":
		case "TABLE_ROW_SAVE":
		case "TABLE_BULK_SAVE": return "btn btn-sm btn-primary text-nowrap mx-1";
		case "FORM_DELETE":
		case "TABLE_ROW_DELETE":
		case "TABLE_BULK_DELETE": return "btn btn-sm btn-danger text-nowrap mx-1";
		case "TABLE_ROW_DETAIL": return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
		case "FORM_RELOAD":
		case "TABLE_RELOAD": return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
		case "TABLE_COLUMNS": return "btn btn-sm btn-outline-secondary text-nowrap mx-1";
		case "TABLE_EXPORT": return "btn btn-sm btn-primary text-nowrap mx-1";
		default: return "btn btn-sm btn-outline-primary text-nowrap mx-1";
	}
}
function zl(e) {
	if (e == null || e === !1 || typeof e != "string") return e;
	let t = e.trim();
	return t && (/\bme-\d+\b/.test(t) ? t.replace(/\bme-\d+\b/g, "me-1") : `${t} me-1`);
}
function Bl(e) {
	let t;
	switch (e) {
		case "TABLE_RESET_ORDERS":
		case "TABLE_RESET_FILTERS":
			t = "bi bi-x";
			break;
		case "TABLE_CLOSE_DETAILS":
			t = "bi bi-chevron-compact-up";
			break;
		case "TABLE_ROW_EDIT":
			t = "bi bi-pencil-square";
			break;
		case "FORM_SUBMIT":
		case "TABLE_ROW_SAVE":
		case "TABLE_BULK_SAVE":
			t = "bi bi-save";
			break;
		case "FORM_DELETE":
		case "TABLE_ROW_DELETE":
		case "TABLE_BULK_DELETE":
			t = "bi bi-trash";
			break;
		case "TABLE_ROW_DETAIL":
			t = "bi bi-chevron-compact-down";
			break;
		case "FORM_RELOAD":
		case "TABLE_RELOAD":
			t = "bi bi-arrow-clockwise";
			break;
		case "TABLE_COLUMNS":
			t = "bi bi-table";
			break;
		case "TABLE_EXPORT":
			t = "bi bi-download";
			break;
		default: t = "bi bi-question";
	}
	return zl(t);
}
// node_modules/@tiptap/core/dist/rolldown-runtime-D7D4PA-g.js
var Vl = Object.defineProperty, Hl = (e, t) => {
	let n = {};
	for (var r in e) Vl(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Vl(n, Symbol.toStringTag, { value: "Module" }), n;
};
// node_modules/orderedmap/dist/index.js
function Ul(e) {
	this.content = e;
}
Ul.prototype = {
	constructor: Ul,
	find: function(e) {
		for (var t = 0; t < this.content.length; t += 2) if (this.content[t] === e) return t;
		return -1;
	},
	get: function(e) {
		var t = this.find(e);
		return t == -1 ? void 0 : this.content[t + 1];
	},
	update: function(e, t, n) {
		var r = n && n != e ? this.remove(n) : this, i = r.find(e), a = r.content.slice();
		return i == -1 ? a.push(n || e, t) : (a[i + 1] = t, n && (a[i] = n)), new Ul(a);
	},
	remove: function(e) {
		var t = this.find(e);
		if (t == -1) return this;
		var n = this.content.slice();
		return n.splice(t, 2), new Ul(n);
	},
	addToStart: function(e, t) {
		return new Ul([e, t].concat(this.remove(e).content));
	},
	addToEnd: function(e, t) {
		var n = this.remove(e).content.slice();
		return n.push(e, t), new Ul(n);
	},
	addBefore: function(e, t, n) {
		var r = this.remove(t), i = r.content.slice(), a = r.find(e);
		return i.splice(a == -1 ? i.length : a, 0, t, n), new Ul(i);
	},
	forEach: function(e) {
		for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1]);
	},
	prepend: function(e) {
		return e = Ul.from(e), e.size ? new Ul(e.content.concat(this.subtract(e).content)) : this;
	},
	append: function(e) {
		return e = Ul.from(e), e.size ? new Ul(this.subtract(e).content.concat(e.content)) : this;
	},
	subtract: function(e) {
		var t = this;
		e = Ul.from(e);
		for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
		return t;
	},
	toObject: function() {
		var e = {};
		return this.forEach(function(t, n) {
			e[t] = n;
		}), e;
	},
	get size() {
		return this.content.length >> 1;
	}
}, Ul.from = function(e) {
	if (e instanceof Ul) return e;
	var t = [];
	if (e) for (var n in e) t.push(n, e[n]);
	return new Ul(t);
};
// node_modules/prosemirror-model/dist/index.js
function Wl(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) n += i.nodeSize;
		else {
			if (!i.sameMarkup(a)) return n;
			if (i.isText && i.text != a.text) {
				let e = i.text, t = a.text, r = 0;
				for (; e[r] == t[r]; r++) n++;
				return r && r < e.length && r < t.length && ql(e.charCodeAt(r - 1)) && Kl(e.charCodeAt(r)) && n--, n;
			}
			if (i.content.size || a.content.size) {
				let e = Wl(i.content, a.content, n + 1);
				if (e != null) return e;
			}
			n += i.nodeSize;
		}
	}
}
function Gl(e, t, n, r) {
	for (let i = e.childCount, a = t.childCount;;) {
		if (i == 0 || a == 0) return i == a ? null : {
			a: n,
			b: r
		};
		let o = e.child(--i), s = t.child(--a), c = o.nodeSize;
		if (o == s) n -= c, r -= c;
		else {
			if (!o.sameMarkup(s)) return {
				a: n,
				b: r
			};
			if (o.isText && o.text != s.text) {
				let e = o.text, t = s.text, i = e.length, a = t.length;
				for (; i > 0 && a > 0 && e[i - 1] == t[a - 1];) i--, a--, n--, r--;
				return i && a && i < e.length && ql(e.charCodeAt(i - 1)) && Kl(e.charCodeAt(i)) && (n++, r++), {
					a: n,
					b: r
				};
			}
			if (o.content.size || s.content.size) {
				let e = Gl(o.content, s.content, n - 1, r - 1);
				if (e) return e;
			}
			n -= c, r -= c;
		}
	}
}
function Kl(e) {
	return e >= 56320 && e < 57344;
}
function ql(e) {
	return e >= 55296 && e < 56320;
}
var R = class e {
	constructor(e, t) {
		if (this.content = e, this.size = t || 0, t == null) for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize;
	}
	nodesBetween(e, t, n, r = 0, i) {
		for (let a = 0, o = 0; o < t; a++) {
			let s = this.content[a], c = o + s.nodeSize;
			if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
				let i = o + 1;
				s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i);
			}
			o = c;
		}
	}
	descendants(e) {
		this.nodesBetween(0, this.size, e);
	}
	textBetween(e, t, n, r) {
		let i = "", a = !0;
		return this.nodesBetween(e, t, (o, s) => {
			let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == "function" ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : "" : "";
			o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c;
		}, 0), i;
	}
	append(t) {
		if (!t.size) return this;
		if (!this.size) return t;
		let n = this.lastChild, r = t.firstChild, i = this.content.slice(), a = 0;
		for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
		return new e(i, this.size + t.size);
	}
	cut(t, n = this.size) {
		if (t == 0 && n == this.size) return this;
		let r = [], i = 0;
		if (n > t) for (let e = 0, a = 0; a < n; e++) {
			let o = this.content[e], s = a + o.nodeSize;
			s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s;
		}
		return new e(r, i);
	}
	cutByIndex(t, n) {
		return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n));
	}
	replaceChild(t, n) {
		let r = this.content[t];
		if (r == n) return this;
		let i = this.content.slice(), a = this.size + n.nodeSize - r.nodeSize;
		return i[t] = n, new e(i, a);
	}
	addToStart(t) {
		return new e([t].concat(this.content), this.size + t.nodeSize);
	}
	addToEnd(t) {
		return new e(this.content.concat(t), this.size + t.nodeSize);
	}
	eq(e) {
		if (this.content.length != e.content.length) return !1;
		for (let t = 0; t < this.content.length; t++) if (!this.content[t].eq(e.content[t])) return !1;
		return !0;
	}
	get firstChild() {
		return this.content.length ? this.content[0] : null;
	}
	get lastChild() {
		return this.content.length ? this.content[this.content.length - 1] : null;
	}
	get childCount() {
		return this.content.length;
	}
	child(e) {
		let t = this.content[e];
		if (!t) throw RangeError("Index " + e + " out of range for " + this);
		return t;
	}
	maybeChild(e) {
		return this.content[e] || null;
	}
	forEach(e) {
		for (let t = 0, n = 0; t < this.content.length; t++) {
			let r = this.content[t];
			e(r, n, t), n += r.nodeSize;
		}
	}
	findDiffStart(e, t = 0) {
		return Wl(this, e, t);
	}
	findDiffEnd(e, t = this.size, n = e.size) {
		return Gl(this, e, t, n);
	}
	findIndex(e) {
		if (e == 0) return Yl(0, e);
		if (e == this.size) return Yl(this.content.length, e);
		if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
		for (let t = 0, n = 0;; t++) {
			let r = this.child(t), i = n + r.nodeSize;
			if (i >= e) return i == e ? Yl(t + 1, i) : Yl(t, n);
			n = i;
		}
	}
	toString() {
		return "<" + this.toStringInner() + ">";
	}
	toStringInner() {
		return this.content.join(", ");
	}
	toJSON() {
		return this.content.length ? this.content.map((e) => e.toJSON()) : null;
	}
	static fromJSON(t, n) {
		if (!n) return e.empty;
		if (!Array.isArray(n)) throw RangeError("Invalid input for Fragment.fromJSON");
		return e.fromArray(n.map(t.nodeFromJSON));
	}
	static fromArray(t) {
		if (!t.length) return e.empty;
		let n, r = 0;
		for (let e = 0; e < t.length; e++) {
			let i = t[e];
			r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i);
		}
		return new e(n || t, r);
	}
	static from(t) {
		if (!t) return e.empty;
		if (t instanceof e) return t;
		if (Array.isArray(t)) return this.fromArray(t);
		if (t.attrs) return new e([t], t.nodeSize);
		throw RangeError("Can not convert " + t + " to a Fragment" + (t.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
	}
};
R.empty = new R([], 0);
var Jl = {
	index: 0,
	offset: 0
};
function Yl(e, t) {
	return Jl.index = e, Jl.offset = t, Jl;
}
function Xl(e, t) {
	if (e === t) return !0;
	if (!(e && typeof e == "object") || !(t && typeof t == "object")) return !1;
	let n = Array.isArray(e);
	if (Array.isArray(t) != n) return !1;
	if (n) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!Xl(e[n], t[n])) return !1;
	} else {
		for (let n in e) if (!(n in t) || !Xl(e[n], t[n])) return !1;
		for (let n in t) if (!(n in e)) return !1;
	}
	return !0;
}
var z = class e {
	constructor(e, t) {
		this.type = e, this.attrs = t;
	}
	addToSet(e) {
		let t, n = !1;
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.eq(i)) return e;
			if (this.type.excludes(i.type)) t ||= e.slice(0, r);
			else if (i.type.excludes(this.type)) return e;
			else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i);
		}
		return t ||= e.slice(), n || t.push(this), t;
	}
	removeFromSet(e) {
		for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
		return e;
	}
	isInSet(e) {
		for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
		return !1;
	}
	eq(e) {
		return this == e || this.type == e.type && Xl(this.attrs, e.attrs);
	}
	toJSON() {
		let e = { type: this.type.name };
		for (let t in this.attrs) {
			e.attrs = this.attrs;
			break;
		}
		return e;
	}
	static fromJSON(e, t) {
		if (!t) throw RangeError("Invalid input for Mark.fromJSON");
		let n = e.marks[t.type];
		if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
		return n.create(t.attrs);
	}
	static sameSet(e, t) {
		if (e == t) return !0;
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!e[n].eq(t[n])) return !1;
		return !0;
	}
	static setFrom(t) {
		if (!t || Array.isArray(t) && t.length == 0) return e.none;
		if (t instanceof e) return [t];
		let n = t.slice();
		return n.sort((e, t) => e.type.rank - t.type.rank), n;
	}
};
z.none = [];
var Zl = class extends Error {}, B = class e {
	constructor(e, t, n) {
		this.content = e, this.openStart = t, this.openEnd = n;
	}
	get size() {
		return this.content.size - this.openStart - this.openEnd;
	}
	insertAt(t, n) {
		let r = $l(this.content, t + this.openStart, n, this.openStart + 1, this.openEnd + 1);
		return r && new e(r, this.openStart, this.openEnd);
	}
	removeBetween(t, n) {
		return new e(Ql(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd);
	}
	eq(e) {
		return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
	}
	toString() {
		return this.content + "(" + this.openStart + "," + this.openEnd + ")";
	}
	toJSON() {
		if (!this.content.size) return null;
		let e = { content: this.content.toJSON() };
		return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
	}
	static fromJSON(t, n) {
		if (!n) return e.empty;
		let r = n.openStart || 0, i = n.openEnd || 0;
		if (typeof r != "number" || typeof i != "number") throw RangeError("Invalid input for Slice.fromJSON");
		return new e(R.fromJSON(t, n.content), r, i);
	}
	static maxOpen(t, n = !0) {
		let r = 0, i = 0;
		for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
		for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
		return new e(t, r, i);
	}
};
B.empty = new B(R.empty, 0, 0);
function Ql(e, t, n) {
	let { index: r, offset: i } = e.findIndex(t), a = e.maybeChild(r), { index: o, offset: s } = e.findIndex(n);
	if (i == t || a.isText) {
		if (s != n && !e.child(o).isText) throw RangeError("Removing non-flat range");
		return e.cut(0, t).append(e.cut(n));
	}
	if (r != o) throw RangeError("Removing non-flat range");
	return e.replaceChild(r, a.copy(Ql(a.content, t - i - 1, n - i - 1)));
}
function $l(e, t, n, r, i, a) {
	let { index: o, offset: s } = e.findIndex(t), c = e.maybeChild(o);
	if (s == t || c.isText) return a && r <= 0 && i <= 0 && !a.canReplace(o, o, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
	let l = $l(c.content, t - s - 1, n, o == 0 ? r - 1 : 0, o == e.childCount - 1 ? i - 1 : 0, c);
	return l && e.replaceChild(o, c.copy(l));
}
function eu(e, t, n) {
	if (n.openStart > e.depth) throw new Zl("Inserted content deeper than insertion position");
	if (e.depth - n.openStart != t.depth - n.openEnd) throw new Zl("Inconsistent open depths");
	return tu(e, t, n, 0);
}
function tu(e, t, n, r) {
	let i = e.index(r), a = e.node(r);
	if (i == t.index(r) && r < e.depth - n.openStart) {
		let o = tu(e, t, n, r + 1);
		return a.copy(a.content.replaceChild(i, o));
	}
	if (!n.content.size) return ou(a, cu(e, t, r));
	if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return ou(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	}
	{
		let { start: i, end: o } = lu(n, e);
		return ou(a, su(e, i, o, t, r));
	}
}
function nu(e, t) {
	if (!t.type.compatibleContent(e.type)) throw new Zl("Cannot join " + t.type.name + " onto " + e.type.name);
}
function ru(e, t, n) {
	let r = e.node(n);
	return nu(r, t.node(n)), r;
}
function iu(e, t) {
	let n = t.length - 1;
	n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e);
}
function au(e, t, n, r) {
	let i = (t || e).node(n), a = 0, o = t ? t.index(n) : i.childCount;
	e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (iu(e.nodeAfter, r), a++));
	for (let e = a; e < o; e++) iu(i.child(e), r);
	t && t.depth == n && t.textOffset && iu(t.nodeBefore, r);
}
function ou(e, t) {
	if (!e.type.validContent(t)) throw new Zl("Invalid content for node " + e.type.name);
	return e.copy(t);
}
function su(e, t, n, r, i) {
	let a = e.depth > i && ru(e, t, i + 1), o = r.depth > i && ru(n, r, i + 1), s = [];
	return au(null, e, i, s), a && o && t.index(i) == n.index(i) ? (nu(a, o), iu(ou(a, su(e, t, n, r, i + 1)), s)) : (a && iu(ou(a, cu(e, t, i + 1)), s), au(t, n, i, s), o && iu(ou(o, cu(n, r, i + 1)), s)), au(r, null, i, s), new R(s);
}
function cu(e, t, n) {
	let r = [];
	return au(null, e, n, r), e.depth > n && iu(ou(ru(e, t, n + 1), cu(e, t, n + 1)), r), au(t, null, n, r), new R(r);
}
function lu(e, t) {
	let n = t.depth - e.openStart, r = t.node(n).copy(e.content);
	for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(R.from(r));
	return {
		start: r.resolveNoCache(e.openStart + n),
		end: r.resolveNoCache(r.content.size - e.openEnd - n)
	};
}
var uu = class e {
	constructor(e, t, n) {
		this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1;
	}
	resolveDepth(e) {
		return e == null ? this.depth : e < 0 ? this.depth + e : e;
	}
	get parent() {
		return this.node(this.depth);
	}
	get doc() {
		return this.node(0);
	}
	node(e) {
		return this.path[this.resolveDepth(e) * 3];
	}
	index(e) {
		return this.path[this.resolveDepth(e) * 3 + 1];
	}
	indexAfter(e) {
		return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
	}
	start(e) {
		return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
	}
	end(e) {
		return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
	}
	before(e) {
		if (e = this.resolveDepth(e), !e) throw RangeError("There is no position before the top-level node");
		return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
	}
	after(e) {
		if (e = this.resolveDepth(e), !e) throw RangeError("There is no position after the top-level node");
		return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
	}
	get textOffset() {
		return this.pos - this.path[this.path.length - 1];
	}
	get nodeAfter() {
		let e = this.parent, t = this.index(this.depth);
		if (t == e.childCount) return null;
		let n = this.pos - this.path[this.path.length - 1], r = e.child(t);
		return n ? e.child(t).cut(n) : r;
	}
	get nodeBefore() {
		let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
		return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
	}
	posAtIndex(e, t) {
		t = this.resolveDepth(t);
		let n = this.path[t * 3], r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
		for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
		return r;
	}
	marks() {
		let e = this.parent, t = this.index();
		if (e.content.size == 0) return z.none;
		if (this.textOffset) return e.child(t).marks;
		let n = e.maybeChild(t - 1), r = e.maybeChild(t);
		if (!n) {
			let e = n;
			n = r, r = e;
		}
		let i = n.marks;
		for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive !== !1 || r && i[a].isInSet(r.marks) || (i = i[a--].removeFromSet(i));
		return i;
	}
	marksAcross(e) {
		let t = this.parent.maybeChild(this.index());
		if (!t || !t.isInline) return null;
		let n = t.marks, r = e.parent.maybeChild(e.index());
		for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive !== !1 || r && n[i].isInSet(r.marks) || (n = n[i--].removeFromSet(n));
		return n;
	}
	sharedDepth(e) {
		for (let t = this.depth; t > 0; t--) if (this.start(t) <= e && this.end(t) >= e) return t;
		return 0;
	}
	blockRange(e = this, t) {
		if (e.pos < this.pos) return e.blockRange(this);
		for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--) if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new mu(this, e, n);
		return null;
	}
	sameParent(e) {
		return this.pos - this.parentOffset == e.pos - e.parentOffset;
	}
	max(e) {
		return e.pos > this.pos ? e : this;
	}
	min(e) {
		return e.pos < this.pos ? e : this;
	}
	toString() {
		let e = "";
		for (let t = 1; t <= this.depth; t++) e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
		return e + ":" + this.parentOffset;
	}
	static resolve(t, n) {
		if (!(n >= 0 && n <= t.content.size)) throw RangeError("Position " + n + " out of range");
		let r = [], i = 0, a = n;
		for (let e = t;;) {
			let { index: t, offset: n } = e.content.findIndex(a), o = a - n;
			if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
			a = o - 1, i += n + 1;
		}
		return new e(n, r, a);
	}
	static resolveCached(t, n) {
		let r = pu.get(t);
		if (r) for (let e = 0; e < r.elts.length; e++) {
			let t = r.elts[e];
			if (t.pos == n) return t;
		}
		else pu.set(t, r = new du());
		let i = r.elts[r.i] = e.resolve(t, n);
		return r.i = (r.i + 1) % fu, i;
	}
}, du = class {
	constructor() {
		this.elts = [], this.i = 0;
	}
}, fu = 12, pu = /* @__PURE__ */ new WeakMap(), mu = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.depth = n;
	}
	get start() {
		return this.$from.before(this.depth + 1);
	}
	get end() {
		return this.$to.after(this.depth + 1);
	}
	get parent() {
		return this.$from.node(this.depth);
	}
	get startIndex() {
		return this.$from.index(this.depth);
	}
	get endIndex() {
		return this.$to.indexAfter(this.depth);
	}
}, hu = Object.create(null), gu = class e {
	constructor(e, t, n, r = z.none) {
		this.type = e, this.attrs = t, this.marks = r, this.content = n || R.empty;
	}
	get children() {
		return this.content.content;
	}
	get nodeSize() {
		return this.isLeaf ? 1 : 2 + this.content.size;
	}
	get childCount() {
		return this.content.childCount;
	}
	child(e) {
		return this.content.child(e);
	}
	maybeChild(e) {
		return this.content.maybeChild(e);
	}
	forEach(e) {
		this.content.forEach(e);
	}
	nodesBetween(e, t, n, r = 0) {
		this.content.nodesBetween(e, t, n, r, this);
	}
	descendants(e) {
		this.nodesBetween(0, this.content.size, e);
	}
	get textContent() {
		return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
	}
	textBetween(e, t, n, r) {
		return this.content.textBetween(e, t, n, r);
	}
	get firstChild() {
		return this.content.firstChild;
	}
	get lastChild() {
		return this.content.lastChild;
	}
	eq(e) {
		return this == e || this.sameMarkup(e) && this.content.eq(e.content);
	}
	sameMarkup(e) {
		return this.hasMarkup(e.type, e.attrs, e.marks);
	}
	hasMarkup(e, t, n) {
		return this.type == e && Xl(this.attrs, t || e.defaultAttrs || hu) && z.sameSet(this.marks, n || z.none);
	}
	copy(t = null) {
		return t == this.content ? this : new e(this.type, this.attrs, t, this.marks);
	}
	mark(t) {
		return t == this.marks ? this : new e(this.type, this.attrs, this.content, t);
	}
	cut(e, t = this.content.size) {
		return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
	}
	slice(e, t = this.content.size, n = !1) {
		if (e == t) return B.empty;
		let r = this.resolve(e), i = this.resolve(t), a = n ? 0 : r.sharedDepth(t), o = r.start(a);
		return new B(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a);
	}
	replace(e, t, n) {
		return eu(this.resolve(e), this.resolve(t), n);
	}
	nodeAt(e) {
		for (let t = this;;) {
			let { index: n, offset: r } = t.content.findIndex(e);
			if (t = t.maybeChild(n), !t) return null;
			if (r == e || t.isText) return t;
			e -= r + 1;
		}
	}
	childAfter(e) {
		let { index: t, offset: n } = this.content.findIndex(e);
		return {
			node: this.content.maybeChild(t),
			index: t,
			offset: n
		};
	}
	childBefore(e) {
		if (e == 0) return {
			node: null,
			index: 0,
			offset: 0
		};
		let { index: t, offset: n } = this.content.findIndex(e);
		if (n < e) return {
			node: this.content.child(t),
			index: t,
			offset: n
		};
		let r = this.content.child(t - 1);
		return {
			node: r,
			index: t - 1,
			offset: n - r.nodeSize
		};
	}
	resolve(e) {
		return uu.resolveCached(this, e);
	}
	resolveNoCache(e) {
		return uu.resolve(this, e);
	}
	rangeHasMark(e, t, n) {
		let r = !1;
		return t > e && this.nodesBetween(e, t, (e) => (n.isInSet(e.marks) && (r = !0), !r)), r;
	}
	get isBlock() {
		return this.type.isBlock;
	}
	get isTextblock() {
		return this.type.isTextblock;
	}
	get inlineContent() {
		return this.type.inlineContent;
	}
	get isInline() {
		return this.type.isInline;
	}
	get isText() {
		return this.type.isText;
	}
	get isLeaf() {
		return this.type.isLeaf;
	}
	get isAtom() {
		return this.type.isAtom;
	}
	toString() {
		if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
		let e = this.type.name;
		return this.content.size && (e += "(" + this.content.toStringInner() + ")"), vu(this.marks, e);
	}
	contentMatchAt(e) {
		let t = this.type.contentMatch.matchFragment(this.content, 0, e);
		if (!t) throw Error("Called contentMatchAt on a node with invalid content");
		return t;
	}
	canReplace(e, t, n = R.empty, r = 0, i = n.childCount) {
		let a = this.contentMatchAt(e).matchFragment(n, r, i), o = a && a.matchFragment(this.content, t);
		if (!o || !o.validEnd) return !1;
		for (let e = r; e < i; e++) if (!this.type.allowsMarks(n.child(e).marks)) return !1;
		return !0;
	}
	canReplaceWith(e, t, n, r) {
		if (r && !this.type.allowsMarks(r)) return !1;
		let i = this.contentMatchAt(e).matchType(n), a = i && i.matchFragment(this.content, t);
		return a ? a.validEnd : !1;
	}
	canAppend(e) {
		return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
	}
	check() {
		this.type.checkContent(this.content), yu(this.type.attrs, this.attrs, "node", this.type.name);
		let e = z.none;
		for (let t = 0; t < this.marks.length; t++) {
			let n = this.marks[t];
			yu(n.type.attrs, n.attrs, "mark", n.type.name), e = n.addToSet(e);
		}
		if (!z.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
		this.content.forEach((e) => e.check());
	}
	toJSON() {
		let e = { type: this.type.name };
		for (let t in this.attrs) {
			e.attrs = this.attrs;
			break;
		}
		return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((e) => e.toJSON())), e;
	}
	static fromJSON(e, t) {
		if (!t) throw RangeError("Invalid input for Node.fromJSON");
		let n;
		if (t.marks) {
			if (!Array.isArray(t.marks)) throw RangeError("Invalid mark data for Node.fromJSON");
			n = t.marks.map(e.markFromJSON);
		}
		if (t.type == "text") {
			if (typeof t.text != "string") throw RangeError("Invalid text node in JSON");
			return e.text(t.text, n);
		}
		let r = R.fromJSON(e, t.content);
		return e.nodeType(t.type).create(t.attrs, r, n);
	}
};
gu.prototype.text = void 0;
var _u = class e extends gu {
	constructor(e, t, n, r) {
		if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
		this.text = n;
	}
	toString() {
		return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : vu(this.marks, JSON.stringify(this.text));
	}
	get textContent() {
		return this.text;
	}
	textBetween(e, t) {
		return this.text.slice(e, t);
	}
	get nodeSize() {
		return this.text.length;
	}
	mark(t) {
		return t == this.marks ? this : new e(this.type, this.attrs, this.text, t);
	}
	withText(t) {
		return t == this.text ? this : new e(this.type, this.attrs, t, this.marks);
	}
	cut(e = 0, t = this.text.length) {
		return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
	}
	eq(e) {
		return this.sameMarkup(e) && this.text == e.text;
	}
	toJSON() {
		let e = super.toJSON();
		return e.text = this.text, e;
	}
};
function vu(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
function yu(e, t, n, r) {
	for (let i in t) if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
	for (let n in e) e[n].validate && e[n].validate(t[n]);
}
var bu = class e {
	constructor(e) {
		this.validEnd = e, this.next = [], this.wrapCache = [];
	}
	static parse(t, n) {
		let r = new xu(t, n);
		if (r.next == null) return e.empty;
		let i = Su(r);
		r.next && r.err("Unexpected trailing text");
		let a = Mu(ku(i));
		return Nu(a, r), a;
	}
	matchType(e) {
		for (let t = 0; t < this.next.length; t++) if (this.next[t].type == e) return this.next[t].next;
		return null;
	}
	matchFragment(e, t = 0, n = e.childCount) {
		let r = this;
		for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
		return r;
	}
	get inlineContent() {
		return this.next.length != 0 && this.next[0].type.isInline;
	}
	get defaultType() {
		for (let e = 0; e < this.next.length; e++) {
			let { type: t } = this.next[e];
			if (!(t.isText || t.hasRequiredAttrs())) return t;
		}
		return null;
	}
	compatible(e) {
		for (let t = 0; t < this.next.length; t++) for (let n = 0; n < e.next.length; n++) if (this.next[t].type == e.next[n].type) return !0;
		return !1;
	}
	fillBefore(e, t = !1, n = 0) {
		let r = [this];
		function i(a, o) {
			let s = a.matchFragment(e, n);
			if (s && (!t || s.validEnd)) return R.from(o.map((e) => e.createAndFill()));
			for (let e = 0; e < a.next.length; e++) {
				let { type: t, next: n } = a.next[e];
				if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
					r.push(n);
					let e = i(n, o.concat(t));
					if (e) return e;
				}
			}
			return null;
		}
		return i(this, []);
	}
	findWrapping(e) {
		for (let t = 0; t < this.wrapCache.length; t += 2) if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
		let t = this.computeWrapping(e);
		return this.wrapCache.push(e, t), t;
	}
	computeWrapping(e) {
		let t = Object.create(null), n = [{
			match: this,
			type: null,
			via: null
		}];
		for (; n.length;) {
			let r = n.shift(), i = r.match;
			if (i.matchType(e)) {
				let e = [];
				for (let t = r; t.type; t = t.via) e.push(t.type);
				return e.reverse();
			}
			for (let e = 0; e < i.next.length; e++) {
				let { type: a, next: o } = i.next[e];
				a.isLeaf || a.hasRequiredAttrs() || a.name in t || r.type && !o.validEnd || (n.push({
					match: a.contentMatch,
					type: a,
					via: r
				}), t[a.name] = !0);
			}
		}
		return null;
	}
	get edgeCount() {
		return this.next.length;
	}
	edge(e) {
		if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
		return this.next[e];
	}
	toString() {
		let e = [];
		function t(n) {
			e.push(n);
			for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next);
		}
		return t(this), e.map((t, n) => {
			let r = n + (t.validEnd ? "*" : " ") + " ";
			for (let n = 0; n < t.next.length; n++) r += (n ? ", " : "") + t.next[n].type.name + "->" + e.indexOf(t.next[n].next);
			return r;
		}).join("\n");
	}
};
bu.empty = new bu(!0);
var xu = class {
	constructor(e, t) {
		this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
	}
	get next() {
		return this.tokens[this.pos];
	}
	eat(e) {
		return this.next == e && (this.pos++ || !0);
	}
	err(e) {
		throw SyntaxError(e + " (in content expression '" + this.string + "')");
	}
};
function Su(e) {
	let t = [];
	do
		t.push(Cu(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function Cu(e) {
	let t = [];
	do
		t.push(wu(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function wu(e) {
	let t = Ou(e);
	for (;;) if (e.eat("+")) t = {
		type: "plus",
		expr: t
	};
	else if (e.eat("*")) t = {
		type: "star",
		expr: t
	};
	else if (e.eat("?")) t = {
		type: "opt",
		expr: t
	};
	else if (e.eat("{")) t = Eu(e, t);
	else break;
	return t;
}
function Tu(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function Eu(e, t) {
	let n = Tu(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : Tu(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function Du(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function Ou(e) {
	if (e.eat("(")) {
		let t = Su(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	}
	if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = Du(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function ku(e) {
	let t = [[]];
	return i(a(e, 0), n()), t;
	function n() {
		return t.push([]) - 1;
	}
	function r(e, n, r) {
		let i = {
			term: r,
			to: n
		};
		return t[e].push(i), i;
	}
	function i(e, t) {
		e.forEach((e) => e.to = t);
	}
	function a(e, t) {
		if (e.type == "choice") return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
		if (e.type == "seq") for (let r = 0;; r++) {
			let o = a(e.exprs[r], t);
			if (r == e.exprs.length - 1) return o;
			i(o, t = n());
		}
		else if (e.type == "star") {
			let o = n();
			return r(t, o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "plus") {
			let o = n();
			return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "opt") return [r(t)].concat(a(e.expr, t));
		else if (e.type == "range") {
			let o = t;
			for (let t = 0; t < e.min; t++) {
				let t = n();
				i(a(e.expr, o), t), o = t;
			}
			if (e.max == -1) i(a(e.expr, o), o);
			else for (let t = e.min; t < e.max; t++) {
				let t = n();
				r(o, t), i(a(e.expr, o), t), o = t;
			}
			return [r(o)];
		} else if (e.type == "name") return [r(t, void 0, e.value)];
		else throw Error("Unknown expr type");
	}
}
function Au(e, t) {
	return t - e;
}
function ju(e, t) {
	let n = [];
	return r(t), n.sort(Au);
	function r(t) {
		let i = e[t];
		if (i.length == 1 && !i[0].term) return r(i[0].to);
		n.push(t);
		for (let e = 0; e < i.length; e++) {
			let { term: t, to: a } = i[e];
			!t && n.indexOf(a) == -1 && r(a);
		}
	}
}
function Mu(e) {
	let t = Object.create(null);
	return n(ju(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				ju(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new bu(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(Au);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function Nu(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function Pu(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function Fu(e, t) {
	let n = Object.create(null);
	for (let r in e) {
		let i = e[r], a = t && t[r];
		if (a === void 0) {
			if (i.hasDefault) a = i.default;
			else throw RangeError("No value supplied for attribute " + r);
		} else i.validate && i.validate(a);
		n[r] = a;
	}
	return n;
}
function Iu(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new zu(e, r, t[r]);
	return n;
}
var Lu = class e {
	constructor(e, t, n) {
		this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = Iu(e, n.attrs), this.defaultAttrs = Pu(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
	}
	get isInline() {
		return !this.isBlock;
	}
	get isTextblock() {
		return this.isBlock && this.inlineContent;
	}
	get isLeaf() {
		return this.contentMatch == bu.empty;
	}
	get isAtom() {
		return this.isLeaf || !!this.spec.atom;
	}
	isInGroup(e) {
		return this.groups.indexOf(e) > -1;
	}
	get whitespace() {
		return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
	}
	hasRequiredAttrs() {
		for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
		return !1;
	}
	compatibleContent(e) {
		return this == e || this.contentMatch.compatible(e.contentMatch);
	}
	computeAttrs(e) {
		return !e && this.defaultAttrs ? this.defaultAttrs : Fu(this.attrs, e);
	}
	create(e = null, t, n) {
		if (this.isText) throw Error("NodeType.create can't construct text nodes");
		return new gu(this, this.computeAttrs(e), R.from(t), z.setFrom(n));
	}
	createChecked(e = null, t, n) {
		return t = R.from(t), this.checkContent(t), new gu(this, this.computeAttrs(e), t, z.setFrom(n));
	}
	createAndFill(e = null, t, n) {
		if (e = this.computeAttrs(e), t = R.from(t), t.size) {
			let e = this.contentMatch.fillBefore(t);
			if (!e) return null;
			t = e.append(t);
		}
		let r = this.contentMatch.matchFragment(t), i = r && r.fillBefore(R.empty, !0);
		return i ? new gu(this, e, t.append(i), z.setFrom(n)) : null;
	}
	validContent(e) {
		let t = this.contentMatch.matchFragment(e);
		if (!t || !t.validEnd) return !1;
		for (let t = 0; t < e.childCount; t++) if (!this.allowsMarks(e.child(t).marks)) return !1;
		return !0;
	}
	checkContent(e) {
		if (!this.validContent(e)) throw RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
	}
	checkAttrs(e) {}
	allowsMarkType(e) {
		return this.markSet == null || this.markSet.indexOf(e) > -1;
	}
	allowsMarks(e) {
		if (this.markSet == null) return !0;
		for (let t = 0; t < e.length; t++) if (!this.allowsMarkType(e[t].type)) return !1;
		return !0;
	}
	allowedMarks(e) {
		if (this.markSet == null) return e;
		let t;
		for (let n = 0; n < e.length; n++) this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t ||= e.slice(0, n);
		return t ? t.length ? t : z.none : e;
	}
	static compile(t, n) {
		let r = Object.create(null);
		t.forEach((t, i) => r[t] = new e(t, n, i));
		let i = n.spec.topNode || "doc";
		if (!r[i]) throw RangeError("Schema is missing its top node type ('" + i + "')");
		if (!r.text) throw RangeError("Every schema needs a 'text' type");
		for (let e in r.text.attrs) throw RangeError("The text node type should not have attributes");
		return r;
	}
};
function Ru(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
var zu = class {
	constructor(e, t, n) {
		this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? Ru(e, t, n.validate) : n.validate;
	}
	get isRequired() {
		return !this.hasDefault;
	}
}, Bu = class e {
	constructor(e, t, n, r) {
		this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Iu(e, r.attrs), this.excluded = null;
		let i = Pu(this.attrs);
		this.instance = i ? new z(this, i) : null;
	}
	create(e = null) {
		return !e && this.instance ? this.instance : new z(this, Fu(this.attrs, e));
	}
	static compile(t, n) {
		let r = Object.create(null), i = 0;
		return t.forEach((t, a) => r[t] = new e(t, i++, n, a)), r;
	}
	removeFromSet(e) {
		for (var t = 0; t < e.length; t++) e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
		return e;
	}
	isInSet(e) {
		for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
	}
	excludes(e) {
		return this.excluded.indexOf(e) > -1;
	}
}, Vu = class {
	constructor(e) {
		this.linebreakReplacement = null, this.cached = Object.create(null);
		let t = this.spec = {};
		for (let n in e) t[n] = e[n];
		t.nodes = Ul.from(e.nodes), t.marks = Ul.from(e.marks || {}), this.nodes = Lu.compile(this.spec.nodes, this), this.marks = Bu.compile(this.spec.marks, this);
		let n = Object.create(null);
		for (let e in this.nodes) {
			if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
			let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
			if (t.contentMatch = n[r] || (n[r] = bu.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
				if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
				if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
				this.linebreakReplacement = t;
			}
			t.markSet = i == "_" ? null : i ? Hu(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
		}
		for (let e in this.marks) {
			let t = this.marks[e], n = t.spec.excludes;
			t.excluded = n == null ? [t] : n == "" ? [] : Hu(this, n.split(" "));
		}
		this.nodeFromJSON = (e) => gu.fromJSON(this, e), this.markFromJSON = (e) => z.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
	}
	node(e, t = null, n, r) {
		if (typeof e == "string") e = this.nodeType(e);
		else if (!(e instanceof Lu)) throw RangeError("Invalid node type: " + e);
		else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
		return e.createChecked(t, n, r);
	}
	text(e, t) {
		let n = this.nodes.text;
		return new _u(n, n.defaultAttrs, e, z.setFrom(t));
	}
	mark(e, t) {
		return typeof e == "string" && (e = this.marks[e]), e.create(t);
	}
	nodeType(e) {
		let t = this.nodes[e];
		if (!t) throw RangeError("Unknown node type: " + e);
		return t;
	}
};
function Hu(e, t) {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e.marks[i], o = a;
		if (a) n.push(a);
		else for (let t in e.marks) {
			let r = e.marks[t];
			(i == "_" || r.spec.group && r.spec.group.split(" ").indexOf(i) > -1) && n.push(o = r);
		}
		if (!o) throw SyntaxError("Unknown mark type: '" + t[r] + "'");
	}
	return n;
}
function Uu(e) {
	return e.tag != null;
}
function Wu(e) {
	return e.style != null;
}
var Gu = class e {
	constructor(e, t) {
		this.schema = e, this.rules = t, this.tags = [], this.styles = [];
		let n = this.matchedStyles = [];
		t.forEach((e) => {
			if (Uu(e)) this.tags.push(e);
			else if (Wu(e)) {
				let t = /[^=]*/.exec(e.style)[0];
				n.indexOf(t) < 0 && n.push(t), this.styles.push(e);
			}
		}), this.normalizeLists = !this.tags.some((t) => {
			if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
			let n = e.nodes[t.node];
			return n.contentMatch.matchType(n);
		});
	}
	parse(e, t = {}) {
		let n = new ed(this, t, !1);
		return n.addAll(e, z.none, t.from, t.to), n.finish();
	}
	parseSlice(e, t = {}) {
		let n = new ed(this, t, !0);
		return n.addAll(e, z.none, t.from, t.to), B.maxOpen(n.finish());
	}
	matchTag(e, t, n) {
		for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
			let n = this.tags[r];
			if (nd(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
				if (n.getAttrs) {
					let t = n.getAttrs(e);
					if (t === !1) continue;
					n.attrs = t || void 0;
				}
				return n;
			}
		}
	}
	matchStyle(e, t, n, r) {
		for (let i = r ? this.styles.indexOf(r) + 1 : 0; i < this.styles.length; i++) {
			let r = this.styles[i], a = r.style;
			if (!(a.indexOf(e) != 0 || r.context && !n.matchesContext(r.context) || a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
				if (r.getAttrs) {
					let e = r.getAttrs(t);
					if (e === !1) continue;
					r.attrs = e || void 0;
				}
				return r;
			}
		}
	}
	static schemaRules(e) {
		let t = [];
		function n(e) {
			let n = e.priority == null ? 50 : e.priority, r = 0;
			for (; r < t.length; r++) {
				let e = t[r];
				if ((e.priority == null ? 50 : e.priority) < n) break;
			}
			t.splice(r, 0, e);
		}
		for (let t in e.marks) {
			let r = e.marks[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = rd(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
			});
		}
		for (let t in e.nodes) {
			let r = e.nodes[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = rd(e)), e.node || e.ignore || e.mark || (e.node = t);
			});
		}
		return t;
	}
	static fromSchema(t) {
		return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
	}
}, Ku = {
	address: !0,
	article: !0,
	aside: !0,
	blockquote: !0,
	body: !0,
	canvas: !0,
	dd: !0,
	div: !0,
	dl: !0,
	fieldset: !0,
	figcaption: !0,
	figure: !0,
	footer: !0,
	form: !0,
	h1: !0,
	h2: !0,
	h3: !0,
	h4: !0,
	h5: !0,
	h6: !0,
	header: !0,
	hgroup: !0,
	hr: !0,
	li: !0,
	noscript: !0,
	ol: !0,
	output: !0,
	p: !0,
	pre: !0,
	section: !0,
	table: !0,
	tfoot: !0,
	ul: !0
}, qu = {
	head: !0,
	noscript: !0,
	object: !0,
	script: !0,
	style: !0,
	title: !0
}, Ju = {
	ol: !0,
	ul: !0
}, Yu = 1, Xu = 2, Zu = 4;
function Qu(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? 3 : n & -5 : (t ? Yu : 0) | (t === "full" ? Xu : 0);
}
var $u = class {
	constructor(e, t, n, r, i, a) {
		this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = z.none, this.match = i || (a & Zu ? null : e.contentMatch);
	}
	findWrapping(e) {
		if (!this.match) {
			if (!this.type) return [];
			let t = this.type.contentMatch.fillBefore(R.from(e));
			if (t) this.match = this.type.contentMatch.matchFragment(t);
			else {
				let t = this.type.contentMatch, n;
				return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null;
			}
		}
		return this.match.findWrapping(e.type);
	}
	finish(e) {
		if (!(this.options & Yu)) {
			let e = this.content[this.content.length - 1], t;
			if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
				let n = e;
				e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length));
			}
		}
		let t = R.from(this.content);
		return !e && this.match && (t = t.append(this.match.fillBefore(R.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
	}
	inlineContext(e) {
		return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ku.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
	}
}, ed = class {
	constructor(e, t, n) {
		this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
		let r = t.topNode, i, a = Qu(null, t.preserveWhitespace, 0) | (n ? Zu : 0);
		i = r ? new $u(r.type, r.attrs, z.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new $u(null, null, z.none, !0, null, a) : new $u(e.schema.topNodeType, null, z.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
	}
	get top() {
		return this.nodes[this.open];
	}
	addDOM(e, t) {
		e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
	}
	addTextNode(e, t) {
		let n = e.nodeValue, r = this.top, i = r.options & Xu ? "full" : this.localPreserveWS || (r.options & Yu) > 0, { schema: a } = this.parser;
		if (i === "full" || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
			if (!i) {
				if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
					let t = r.content[r.content.length - 1], i = e.previousSibling;
					(!t || i && i.nodeName == "BR" || t.isText && /[ \t\r\n\u000c]$/.test(t.text)) && (n = n.slice(1));
				}
			} else if (i === "full") n = n.replace(/\r\n?/g, "\n");
			else if (a.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(a.linebreakReplacement.create())) {
				let e = n.split(/\r?\n|\r/);
				for (let n = 0; n < e.length; n++) n && this.insertNode(a.linebreakReplacement.create(), t, !0), e[n] && this.insertNode(a.text(e[n]), t, !/\S/.test(e[n]));
				n = "";
			} else n = n.replace(/\r?\n|\r/g, " ");
			n && this.insertNode(a.text(n), t, !/\S/.test(n)), this.findInText(e);
		} else this.findInside(e);
	}
	addElement(e, t, n) {
		let r = this.localPreserveWS, i = this.top;
		(e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
		let a = e.nodeName.toLowerCase(), o;
		Ju.hasOwnProperty(a) && this.parser.normalizeLists && td(e);
		let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
		out: if (s ? s.ignore : qu.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
		else if (!s || s.skip || s.closeParent) {
			s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
			let n, r = this.needsBlock;
			if (Ku.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
			else if (!e.firstChild) {
				this.leafFallback(e, t);
				break out;
			}
			let o = s && s.skip ? t : this.readStyles(e, t);
			o && this.addAll(e, o), n && this.sync(i), this.needsBlock = r;
		} else {
			let n = this.readStyles(e, t);
			n && this.addElementByRule(e, s, n, s.consuming === !1 ? o : void 0);
		}
		this.localPreserveWS = r;
	}
	leafFallback(e, t) {
		e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode("\n"), t);
	}
	ignoreFallback(e, t) {
		e.nodeName != "BR" || this.top.type && this.top.type.inlineContent || this.findPlace(this.parser.schema.text("-"), t, !0);
	}
	readStyles(e, t) {
		let n = e.style;
		if (n && n.length) for (let e = 0; e < this.parser.matchedStyles.length; e++) {
			let r = this.parser.matchedStyles[e], i = n.getPropertyValue(r);
			if (i) for (let e;;) {
				let n = this.parser.matchStyle(r, i, this, e);
				if (!n) break;
				if (n.ignore) return null;
				if (t = n.clearMark ? t.filter((e) => !n.clearMark(e)) : t.concat(this.parser.schema.marks[n.mark].create(n.attrs)), n.consuming === !1) e = n;
				else break;
			}
		}
		return t;
	}
	addElementByRule(e, t, n, r) {
		let i, a;
		if (t.node) {
			if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
			else {
				let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
				e && (i = !0, n = e);
			}
		} else {
			let e = this.parser.schema.marks[t.mark];
			n = n.concat(e.create(t.attrs));
		}
		let o = this.top;
		if (a && a.isLeaf) this.findInside(e);
		else if (r) this.addElement(e, n, r);
		else if (t.getContent) this.findInside(e), t.getContent(e, this.parser.schema).forEach((e) => this.insertNode(e, n, !1));
		else {
			let r = e;
			typeof t.contentElement == "string" ? r = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? r = t.contentElement(e) : t.contentElement && (r = t.contentElement), this.findAround(e, r, !0), this.addAll(r, n), this.findAround(e, r, !1);
		}
		i && this.sync(o) && this.open--;
	}
	addAll(e, t, n, r) {
		let i = n || 0;
		for (let a = n ? e.childNodes[n] : e.firstChild, o = r == null ? null : e.childNodes[r]; a != o; a = a.nextSibling, ++i) this.findAtPoint(e, i), this.addDOM(a, t);
		this.findAtPoint(e, i);
	}
	findPlace(e, t, n) {
		let r, i;
		for (let t = this.open, a = 0; t >= 0; t--) {
			let o = this.nodes[t], s = o.findWrapping(e);
			if (s && (!r || r.length > s.length + a) && (r = s, i = o, !s.length)) break;
			if (o.solid) {
				if (n) break;
				a += 2;
			}
		}
		if (!r) return null;
		this.sync(i);
		for (let e = 0; e < r.length; e++) t = this.enterInner(r[e], null, t, !1);
		return t;
	}
	insertNode(e, t, n) {
		if (e.isInline && this.needsBlock && !this.top.type) {
			let e = this.textblockFromContext();
			e && (t = this.enterInner(e, null, t));
		}
		let r = this.findPlace(e, t, n);
		if (r) {
			this.closeExtra();
			let t = this.top;
			t.match &&= t.match.matchType(e.type);
			let n = z.none;
			for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : id(i.type, e.type)) && (n = i.addToSet(n));
			return t.content.push(e.mark(n)), !0;
		}
		return !1;
	}
	enter(e, t, n, r) {
		let i = this.findPlace(e.create(t), n, !1);
		return i &&= this.enterInner(e, t, n, !0, r), i;
	}
	enterInner(e, t, n, r = !1, i) {
		this.closeExtra();
		let a = this.top;
		a.match = a.match && a.match.matchType(e);
		let o = Qu(e, i, a.options);
		a.options & Zu && a.content.length == 0 && (o |= Zu);
		let s = z.none;
		return n = n.filter((t) => !(a.type ? a.type.allowsMarkType(t.type) : id(t.type, e)) || (s = t.addToSet(s), !1)), this.nodes.push(new $u(e, t, s, r, null, o)), this.open++, n;
	}
	closeExtra(e = !1) {
		let t = this.nodes.length - 1;
		if (t > this.open) {
			for (; t > this.open; t--) this.nodes[t - 1].content.push(this.nodes[t].finish(e));
			this.nodes.length = this.open + 1;
		}
	}
	finish() {
		return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
	}
	sync(e) {
		for (let t = this.open; t >= 0; t--) if (this.nodes[t] == e) return this.open = t, !0;
		else this.localPreserveWS && (this.nodes[t].options |= Yu);
		return !1;
	}
	get currentPos() {
		this.closeExtra();
		let e = 0;
		for (let t = this.open; t >= 0; t--) {
			let n = this.nodes[t].content;
			for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
			t && e++;
		}
		return e;
	}
	findAtPoint(e, t) {
		if (this.find) for (let n = 0; n < this.find.length; n++) this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos);
	}
	findInside(e) {
		if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
	}
	findAround(e, t, n) {
		if (e != t && this.find) for (let r = 0; r < this.find.length; r++) this.find[r].pos == null && e.nodeType == 1 && e.contains(this.find[r].node) && t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) && (this.find[r].pos = this.currentPos);
	}
	findInText(e) {
		if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
	}
	matchesContext(e) {
		if (e.indexOf("|") > -1) return e.split(/\s*\|\s*/).some(this.matchesContext, this);
		let t = e.split("/"), n = this.options.context, r = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), i = -(n ? n.depth + 1 : 0) + +!r, a = (e, o) => {
			for (; e >= 0; e--) {
				let s = t[e];
				if (s == "") {
					if (e == t.length - 1 || e == 0) continue;
					for (; o >= i; o--) if (a(e - 1, o)) return !0;
					return !1;
				}
				{
					let e = o > 0 || o == 0 && r ? this.nodes[o].type : n && o >= i ? n.node(o - i).type : null;
					if (!e || e.name != s && !e.isInGroup(s)) return !1;
					o--;
				}
			}
			return !0;
		};
		return a(t.length - 1, this.open);
	}
	textblockFromContext() {
		let e = this.options.context;
		if (e) for (let t = e.depth; t >= 0; t--) {
			let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
			if (n && n.isTextblock && n.defaultAttrs) return n;
		}
		for (let e in this.parser.schema.nodes) {
			let t = this.parser.schema.nodes[e];
			if (t.isTextblock && t.defaultAttrs) return t;
		}
	}
};
function td(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && Ju.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function nd(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function rd(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function id(e, t) {
	let n = t.schema.nodes;
	for (let r in n) {
		let i = n[r];
		if (!i.allowsMarkType(e)) continue;
		let a = [], o = (e) => {
			a.push(e);
			for (let n = 0; n < e.edgeCount; n++) {
				let { type: r, next: i } = e.edge(n);
				if (r == t || a.indexOf(i) < 0 && o(i)) return !0;
			}
		};
		if (o(i.contentMatch)) return !0;
	}
}
var ad = class e {
	constructor(e, t) {
		this.nodes = e, this.marks = t;
	}
	serializeFragment(e, t = {}, n) {
		n ||= sd(t).createDocumentFragment();
		let r = n, i = [];
		return e.forEach((e) => {
			if (i.length || e.marks.length) {
				let n = 0, a = 0;
				for (; n < i.length && a < e.marks.length;) {
					let t = e.marks[a];
					if (!this.marks[t.type.name]) a++;
					else {
						if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
						n++, a++;
					}
				}
				for (; n < i.length;) r = i.pop()[1];
				for (; a < e.marks.length;) {
					let n = e.marks[a++], o = this.serializeMark(n, e.isInline, t);
					o && (i.push([n, r]), r.appendChild(o.dom), r = o.contentDOM || o.dom);
				}
			}
			r.appendChild(this.serializeNodeInner(e, t));
		}), n;
	}
	serializeNodeInner(e, t) {
		if (e.isText) return sd(t).createTextNode(e.text);
		let { dom: n, contentDOM: r } = dd(sd(t), this.nodes[e.type.name](e), null, e.attrs);
		if (r) {
			if (e.isLeaf) throw RangeError("Content hole not allowed in a leaf node spec");
			this.serializeFragment(e.content, t, r);
		}
		return n;
	}
	serializeNode(e, t = {}) {
		let n = this.serializeNodeInner(e, t);
		for (let r = e.marks.length - 1; r >= 0; r--) {
			let i = this.serializeMark(e.marks[r], e.isInline, t);
			i && ((i.contentDOM || i.dom).appendChild(n), n = i.dom);
		}
		return n;
	}
	serializeMark(e, t, n = {}) {
		let r = this.marks[e.type.name];
		return r && dd(sd(n), r(e, t), null, e.attrs);
	}
	static renderSpec(e, t, n = null, r) {
		return typeof t == "string" ? { dom: e.createTextNode(t) } : dd(e, t, n, r);
	}
	static fromSchema(t) {
		return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
	}
	static nodesFromSchema(e) {
		let t = od(e.nodes);
		return t.text ||= (e) => e.text, t;
	}
	static marksFromSchema(e) {
		return od(e.marks);
	}
};
function od(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function sd(e) {
	return e.document || window.document;
}
var cd = /* @__PURE__ */ new WeakMap();
function ld(e) {
	let t = cd.get(e);
	return t === void 0 && cd.set(e, t = ud(e)), t;
}
function ud(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") {
			if (Array.isArray(e)) {
				if (typeof e[0] == "string") t ||= [], t.push(e);
				else for (let t = 0; t < e.length; t++) n(e[t]);
			} else for (let t in e) n(e[t]);
		}
	}
	return n(e), t;
}
function dd(e, t, n, r) {
	if (t.nodeType == 1) return { dom: t };
	if (t.dom && t.dom.nodeType == 1) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = ld(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
	let o = i.indexOf(" ");
	o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
	let s, c = n ? e.createElementNS(n, i) : e.createElement(i), l = t[1], u = 1;
	if (l && typeof l == "object" && l.nodeType == null && !Array.isArray(l)) {
		u = 2;
		for (let e in l) if (l[e] != null) {
			let t = e.indexOf(" ");
			t > 0 ? c.setAttributeNS(e.slice(0, t), e.slice(t + 1), l[e]) : e == "style" && c.style ? c.style.cssText = l[e] : c.setAttribute(e, l[e]);
		}
	}
	for (let i = u; i < t.length; i++) {
		let a = t[i];
		if (a === 0) {
			if (i < t.length - 1 || i > u) throw RangeError("Content hole must be the only child of its parent node");
			return {
				dom: c,
				contentDOM: c
			};
		}
		if (typeof a == "string") c.appendChild(e.createTextNode(a));
		else {
			let { dom: t, contentDOM: i } = dd(e, a, n, r);
			if (c.appendChild(t), i) {
				if (s) throw RangeError("Multiple content holes");
				s = i;
			}
		}
	}
	return {
		dom: c,
		contentDOM: s
	};
}
// node_modules/prosemirror-transform/dist/index.js
var fd = 65535, pd = 2 ** 16;
function md(e, t) {
	return e + t * pd;
}
function hd(e) {
	return e & fd;
}
function gd(e) {
	return (e - (e & fd)) / pd;
}
var _d = 1, vd = 2, yd = 4, bd = 8, xd = class {
	constructor(e, t, n) {
		this.pos = e, this.delInfo = t, this.recover = n;
	}
	get deleted() {
		return (this.delInfo & bd) > 0;
	}
	get deletedBefore() {
		return (this.delInfo & 5) > 0;
	}
	get deletedAfter() {
		return (this.delInfo & 6) > 0;
	}
	get deletedAcross() {
		return (this.delInfo & yd) > 0;
	}
}, Sd = class e {
	constructor(t, n = !1) {
		if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
	}
	recover(e) {
		let t = 0, n = hd(e);
		if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
		return this.ranges[n * 3] + t + gd(e);
	}
	mapResult(e, t = 1) {
		return this._map(e, t, !1);
	}
	map(e, t = 1) {
		return this._map(e, t, !0);
	}
	_map(e, t, n) {
		let r = 0, i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
		for (let o = 0; o < this.ranges.length; o += 3) {
			let s = this.ranges[o] - (this.inverted ? r : 0);
			if (s > e) break;
			let c = this.ranges[o + i], l = this.ranges[o + a], u = s + c;
			if (e <= u) {
				let i = c ? e == s ? -1 : e == u ? 1 : t : t, a = s + r + (i < 0 ? 0 : l);
				if (n) return a;
				let d = e == (t < 0 ? s : u) ? null : md(o / 3, e - s), f = 0;
				return c && (f |= e == s ? vd : e == u ? _d : yd, (t < 0 ? e != s : e != u) && (f |= bd)), new xd(a, f, d);
			}
			r += l - c;
		}
		return n ? e + r : new xd(e + r, 0, null);
	}
	touches(e, t) {
		let n = 0, r = hd(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
		for (let t = 0; t < this.ranges.length; t += 3) {
			let o = this.ranges[t] - (this.inverted ? n : 0);
			if (o > e) break;
			let s = this.ranges[t + i];
			if (e <= o + s && t == r * 3) return !0;
			n += this.ranges[t + a] - s;
		}
		return !1;
	}
	forEach(e) {
		let t = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
		for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
			let a = this.ranges[r], o = a - (this.inverted ? i : 0), s = a + (this.inverted ? 0 : i), c = this.ranges[r + t], l = this.ranges[r + n];
			e(o, o + c, s, s + l), i += l - c;
		}
	}
	invert() {
		return new e(this.ranges, !this.inverted);
	}
	toString() {
		return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
	}
	static offset(t) {
		return t == 0 ? e.empty : new e(t < 0 ? [
			0,
			-t,
			0
		] : [
			0,
			0,
			t
		]);
	}
};
Sd.empty = new Sd([]);
var Cd = class e {
	constructor(e, t, n = 0, r = e ? e.length : 0) {
		this.mirror = t, this.from = n, this.to = r, this._maps = e || [], this.ownData = !(e || t);
	}
	get maps() {
		return this._maps;
	}
	slice(t = 0, n = this.maps.length) {
		return new e(this._maps, this.mirror, t, n);
	}
	appendMap(e, t) {
		this.ownData ||= (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
	}
	appendMapping(e) {
		for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
			let r = e.getMirror(t);
			this.appendMap(e._maps[t], r != null && r < t ? n + r : void 0);
		}
	}
	getMirror(e) {
		if (this.mirror) {
			for (let t = 0; t < this.mirror.length; t++) if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
		}
	}
	setMirror(e, t) {
		this.mirror ||= [], this.mirror.push(e, t);
	}
	appendMappingInverted(e) {
		for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
			let r = e.getMirror(t);
			this.appendMap(e._maps[t].invert(), r != null && r > t ? n - r - 1 : void 0);
		}
	}
	invert() {
		let t = new e();
		return t.appendMappingInverted(this), t;
	}
	map(e, t = 1) {
		if (this.mirror) return this._map(e, t, !0);
		for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
		return e;
	}
	mapResult(e, t = 1) {
		return this._map(e, t, !1);
	}
	_map(e, t, n) {
		let r = 0;
		for (let n = this.from; n < this.to; n++) {
			let i = this._maps[n].mapResult(e, t);
			if (i.recover != null) {
				let t = this.getMirror(n);
				if (t != null && t > n && t < this.to) {
					n = t, e = this._maps[t].recover(i.recover);
					continue;
				}
			}
			r |= i.delInfo, e = i.pos;
		}
		return n ? e : new xd(e, r, null);
	}
}, wd = Object.create(null), Td = class {
	getMap() {
		return Sd.empty;
	}
	merge(e) {
		return null;
	}
	static fromJSON(e, t) {
		if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
		let n = wd[t.stepType];
		if (!n) throw RangeError(`No step type ${t.stepType} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in wd) throw RangeError("Duplicate use of step JSON ID " + e);
		return wd[e] = t, t.prototype.jsonID = e, t;
	}
}, Ed = class e {
	constructor(e, t) {
		this.doc = e, this.failed = t;
	}
	static ok(t) {
		return new e(t, null);
	}
	static fail(t) {
		return new e(null, t);
	}
	static fromReplace(t, n, r, i) {
		try {
			return e.ok(t.replace(n, r, i));
		} catch (t) {
			if (t instanceof Zl) return e.fail(t.message);
			throw t;
		}
	}
};
function Dd(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(Dd(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return R.fromArray(r);
}
var Od = class e extends Td {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new B(Dd(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
		return Ed.fromReplace(e, this.from, this.to, i);
	}
	invert(t) {
		let n = [];
		return t.nodesBetween(this.from, this.to, (t, r) => {
			if (t.isInline && t.isAtom) {
				let i = this.mark.addToSet(t.marks);
				if (!z.sameSet(i, t.marks)) {
					let a = Math.max(this.from, r), o = Math.min(this.to, r + t.nodeSize);
					Ad(kd, a, o, this.mark, n);
					for (let r of t.marks) r.isInSet(i) || Ad(e, a, o, r, n);
				}
			}
		}), n.length == 1 ? n[0] : new jd(n);
	}
	map(t) {
		let n = t.map(this.from, 1), r = t.map(this.to, -1);
		return n >= r ? null : new e(n, r, this.mark);
	}
	merge(t) {
		return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
	}
	toJSON() {
		return {
			stepType: "addMark",
			mark: this.mark.toJSON(),
			from: this.from,
			to: this.to
		};
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for AddMarkStep.fromJSON");
		return new e(n.from, n.to, t.markFromJSON(n.mark));
	}
};
Td.jsonID("addMark", Od);
var kd = class e extends Td {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = new B(Dd(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
		return Ed.fromReplace(e, this.from, this.to, n);
	}
	invert(e) {
		let t = [];
		return e.nodesBetween(this.from, this.to, (e, n) => {
			e.isInline && e.isAtom && this.mark.isInSet(e.marks) && Ad(Od, Math.max(this.from, n), Math.min(this.to, n + e.nodeSize), this.mark, t);
		}), t.length == 1 ? t[0] : new jd(t);
	}
	map(t) {
		let n = t.map(this.from, 1), r = t.map(this.to, -1);
		return n >= r ? null : new e(n, r, this.mark);
	}
	merge(t) {
		return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
	}
	toJSON() {
		return {
			stepType: "removeMark",
			mark: this.mark.toJSON(),
			from: this.from,
			to: this.to
		};
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for RemoveMarkStep.fromJSON");
		return new e(n.from, n.to, t.markFromJSON(n.mark));
	}
};
Td.jsonID("removeMark", kd);
function Ad(e, t, n, r, i) {
	let a = i.length ? i[i.length - 1] : null;
	a && a instanceof e && a.to == t && a.mark.eq(r) ? i[i.length - 1] = new e(a.from, n, r) : i.push(new e(t, n, r));
}
var jd = class e extends Td {
	constructor(e) {
		super(), this.steps = e;
	}
	apply(e) {
		for (let t of this.steps) {
			let n = t.apply(e);
			if (!n.doc) return n;
			e = n.doc;
		}
		return new Ed(e, null);
	}
	invert(t) {
		return new e(this.steps.map((e) => e.invert(t)));
	}
	map(t) {
		let n = [];
		for (let e of this.steps) {
			let r = e.map(t);
			r && n.push(r);
		}
		return n.length ? new e(n) : null;
	}
	toJSON() {
		return {
			stepType: "markSet",
			steps: this.steps.map((e) => e.toJSON())
		};
	}
	static fromJSON(t, n) {
		if (!Array.isArray(n.steps) || !n.steps.every((e) => e.stepType == "addMark" || e.stepType == "removeMark")) throw RangeError("Invalid JSON for MarkSetStep");
		return new e(n.steps.map((e) => Td.fromJSON(t, e)));
	}
};
Td.jsonID("markSet", jd);
var Md = class e extends Td {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Ed.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
		return Ed.fromReplace(e, this.pos, this.pos + 1, new B(R.from(n), 0, +!t.isLeaf));
	}
	invert(t) {
		let n = t.nodeAt(this.pos);
		if (n) {
			let t = this.mark.addToSet(n.marks);
			if (t.length == n.marks.length) {
				for (let r = 0; r < n.marks.length; r++) if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
				return new e(this.pos, this.mark);
			}
		}
		return new Nd(this.pos, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.mark);
	}
	toJSON() {
		return {
			stepType: "addNodeMark",
			pos: this.pos,
			mark: this.mark.toJSON()
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for AddNodeMarkStep.fromJSON");
		return new e(n.pos, t.markFromJSON(n.mark));
	}
};
Td.jsonID("addNodeMark", Md);
var Nd = class e extends Td {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Ed.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
		return Ed.fromReplace(e, this.pos, this.pos + 1, new B(R.from(n), 0, +!t.isLeaf));
	}
	invert(e) {
		let t = e.nodeAt(this.pos);
		return !t || !this.mark.isInSet(t.marks) ? this : new Md(this.pos, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.mark);
	}
	toJSON() {
		return {
			stepType: "removeNodeMark",
			pos: this.pos,
			mark: this.mark.toJSON()
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
		return new e(n.pos, t.markFromJSON(n.mark));
	}
};
Td.jsonID("removeNodeMark", Nd);
var Pd = class e extends Td {
	constructor(e, t, n, r = !1) {
		super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
	}
	apply(e) {
		return this.structure && Id(e, this.from, this.to) ? Ed.fail("Structure replace would overwrite content") : Ed.fromReplace(e, this.from, this.to, this.slice);
	}
	getMap() {
		return new Sd([
			this.from,
			this.to - this.from,
			this.slice.size
		]);
	}
	invert(t) {
		return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to));
	}
	map(t) {
		let n = t.mapResult(this.to, -1), r = this.from == this.to && e.MAP_BIAS < 0 ? n : t.mapResult(this.from, 1);
		return r.deletedAcross && n.deletedAcross ? null : new e(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure);
	}
	merge(t) {
		if (!(t instanceof e) || t.structure || this.structure) return null;
		if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
			let n = this.slice.size + t.slice.size == 0 ? B.empty : new B(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
			return new e(this.from, this.to + (t.to - t.from), n, this.structure);
		}
		if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
			let n = this.slice.size + t.slice.size == 0 ? B.empty : new B(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
			return new e(t.from, this.to, n, this.structure);
		}
		return null;
	}
	toJSON() {
		let e = {
			stepType: "replace",
			from: this.from,
			to: this.to
		};
		return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for ReplaceStep.fromJSON");
		return new e(n.from, n.to, B.fromJSON(t, n.slice), !!n.structure);
	}
};
Pd.MAP_BIAS = 1, Td.jsonID("replace", Pd);
var Fd = class e extends Td {
	constructor(e, t, n, r, i, a, o = !1) {
		super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
	}
	apply(e) {
		if (this.structure && (Id(e, this.from, this.gapFrom) || Id(e, this.gapTo, this.to))) return Ed.fail("Structure gap-replace would overwrite content");
		let t = e.slice(this.gapFrom, this.gapTo);
		if (t.openStart || t.openEnd) return Ed.fail("Gap is not a flat range");
		let n = this.slice.insertAt(this.insert, t.content);
		return n ? Ed.fromReplace(e, this.from, this.to, n) : Ed.fail("Content does not fit in gap");
	}
	getMap() {
		return new Sd([
			this.from,
			this.gapFrom - this.from,
			this.insert,
			this.gapTo,
			this.to - this.gapTo,
			this.slice.size - this.insert
		]);
	}
	invert(t) {
		let n = this.gapTo - this.gapFrom;
		return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1), a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
		return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure);
	}
	toJSON() {
		let e = {
			stepType: "replaceAround",
			from: this.from,
			to: this.to,
			gapFrom: this.gapFrom,
			gapTo: this.gapTo,
			insert: this.insert
		};
		return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number") throw RangeError("Invalid input for ReplaceAroundStep.fromJSON");
		return new e(n.from, n.to, n.gapFrom, n.gapTo, B.fromJSON(t, n.slice), n.insert, !!n.structure);
	}
};
Td.jsonID("replaceAround", Fd);
function Id(e, t, n) {
	let r = e.resolve(t), i = n - t, a = r.depth;
	for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
	if (i > 0) {
		let e = r.node(a).maybeChild(r.indexAfter(a));
		for (; i > 0;) {
			if (!e || e.isLeaf) return !0;
			e = e.firstChild, i--;
		}
	}
	return !1;
}
function Ld(e, t, n, r) {
	let i = [];
	e.doc.nodesBetween(t, n, (e, a, o) => {
		if (!e.isInline) return;
		let s = e.marks;
		!r.isInSet(s) && o.type.allowsMarkType(r.type) && Ad(Od, Math.max(a, t), Math.min(a + e.nodeSize, n), r, i);
	}), i.forEach((t) => e.step(t));
}
function Rd(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline || !e.isAtom) return;
		a++;
		let s = null;
		if (r instanceof Bu) {
			let t = e.marks, n;
			for (; n = r.isInSet(t);) (s ||= []).push(n), t = n.removeFromSet(t);
		} else r ? r.isInSet(e.marks) && (s = [r]) : s = e.marks;
		if (s && s.length) {
			let r = Math.min(o + e.nodeSize, n);
			for (let e = 0; e < s.length; e++) {
				let n = s[e], c;
				for (let e = 0; e < i.length; e++) {
					let t = i[e];
					t.step == a - 1 && n.eq(i[e].style) && (c = t);
				}
				c ? (c.to = r, c.step = a) : i.push({
					style: n,
					from: Math.max(o, t),
					to: r,
					step: a
				});
			}
		}
	}), i.forEach((t) => e.step(new kd(t.from, t.to, t.style)));
}
function zd(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new Pd(s, l, B.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new kd(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new B(R.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new Pd(s + e.index, s + e.index + e[0].length, r));
			}
		}
		s = l;
	}
	if (!r.validEnd) {
		let t = r.fillBefore(R.empty, !0);
		e.replace(s, s, new B(t, 0, 0));
	}
	for (let t = o.length - 1; t >= 0; t--) e.step(o[t]);
}
function Bd(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function Vd(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !Bd(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function Hd(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = R.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = R.from(r.node(e).copy(u)), d++) : c--;
	let f = R.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = R.from(i.node(e).copy(f)), p++) : l++;
	e.step(new Fd(c, l, o, s, new B(u.append(f), d, p), u.size - d, !0));
}
function Ud(e, t, n = null, r = e) {
	let i = Gd(e, t), a = i && Kd(r, t);
	return a ? i.map(Wd).concat({
		type: t,
		attrs: n
	}).concat(a.map(Wd)) : null;
}
function Wd(e) {
	return {
		type: e,
		attrs: null
	};
}
function Gd(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function Kd(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function qd(e, t, n) {
	let r = R.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = R.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new Fd(i, a, i, a, new B(r, 0, 0), n.length, !0));
}
function Jd(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && Zd(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && Xd(e, t, n, a), zd(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new Fd(c, l, c + 1, l - 1, new B(R.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && Yd(e, t, n, a), !1;
		}
	});
}
function Yd(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.isText) {
			let o, s = /\r?\n|\r/g;
			for (; o = s.exec(i.text);) {
				let i = e.mapping.slice(r).map(n + 1 + a + o.index);
				e.replaceWith(i, i + 1, t.type.schema.linebreakReplacement.create());
			}
		}
	});
}
function Xd(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function Zd(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function Qd(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new Fd(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new B(R.from(o), 0, 0), 1, !0));
}
function $d(e, t, n = 1, r) {
	let i = e.resolve(t), a = i.depth - n, o = r && r[r.length - 1] || i.parent;
	if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
	for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
		let n = i.node(e), a = i.index(e);
		if (n.type.spec.isolating) return !1;
		let o = n.content.cutByIndex(a, n.childCount), s = r && r[t + 1];
		s && (o = o.replaceChild(0, s.type.create(s.attrs)));
		let c = r && r[t] || n;
		if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1;
	}
	let s = i.indexAfter(a), c = r && r[0];
	return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type);
}
function ef(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = R.empty, o = R.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = R.from(i.node(e).copy(a));
		let t = r && r[s];
		o = R.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new Pd(t, t, new B(a.append(o), n, n), !0));
}
function tf(e, t) {
	let n = e.resolve(t), r = n.index();
	return rf(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function nf(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function rf(e, t) {
	return !!(e && t && !e.isLeaf && nf(e, t));
}
function af(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && rf(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function of(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		Xd(e, r.node(), r.before(), s);
	}
	o.inlineContent && zd(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new Pd(l, c.map(t + n, -1), B.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		Yd(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function sf(e, t, n) {
	let r = e.resolve(t);
	if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
	if (r.parentOffset == 0) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.index(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
		if (t > 0) return null;
	}
	if (r.parentOffset == r.parent.content.size) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.indexAfter(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
		if (t < r.node(e).childCount) return null;
	}
	return null;
}
function cf(e, t, n) {
	let r = e.resolve(t);
	if (!n.content.size) return t;
	let i = n.content;
	for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
	for (let e = 1; e <= (n.openStart == 0 && n.size ? 2 : 1); e++) for (let t = r.depth; t >= 0; t--) {
		let n = t == r.depth ? 0 : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2 ? -1 : 1, a = r.index(t) + +(n > 0), o = r.node(t), s = !1;
		if (e == 1) s = o.canReplace(a, a, i);
		else {
			let e = o.contentMatchAt(a).findWrapping(i.firstChild.type);
			s = e && o.canReplaceWith(a, a, e[0]);
		}
		if (s) return n == 0 ? r.pos : n < 0 ? r.before(t + 1) : r.after(t + 1);
	}
	return null;
}
function lf(e, t, n = t, r = B.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return uf(i, a, r) ? new Pd(t, n, r) : new df(i, a, r).fit();
}
function uf(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
var df = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = R.empty;
		for (let t = 0; t <= e.depth; t++) {
			let n = e.node(t);
			this.frontier.push({
				type: n.type,
				match: n.contentMatchAt(e.indexAfter(t))
			});
		}
		for (let t = e.depth; t > 0; t--) this.placed = R.from(e.node(t).copy(this.placed));
	}
	get depth() {
		return this.frontier.length - 1;
	}
	fit() {
		for (; this.unplaced.size;) {
			let e = this.findFittable();
			e ? this.placeNodes(e) : this.openMore() || this.dropNode();
		}
		let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, n = this.$from, r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
		if (!r) return null;
		let i = this.placed, a = n.depth, o = r.depth;
		for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
		let s = new B(i, a, o);
		return e > -1 ? new Fd(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Pd(n.pos, r.pos, s) : null;
	}
	findFittable() {
		let e = this.unplaced.openStart;
		for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
			let i = t.firstChild;
			if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
				e = n;
				break;
			}
			t = i.content;
		}
		for (let t = 1; t <= 2; t++) for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
			let e, r = null;
			n ? (r = mf(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
			let i = e.firstChild;
			for (let e = this.depth; e >= 0; e--) {
				let { type: a, match: o } = this.frontier[e], s, c = null;
				if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(R.from(i), !1)) : r && a.compatibleContent(r.type))) return {
					sliceDepth: n,
					frontierDepth: e,
					parent: r,
					inject: c
				};
				if (t == 2 && i && (s = o.findWrapping(i.type))) return {
					sliceDepth: n,
					frontierDepth: e,
					parent: r,
					wrap: s
				};
				if (r && o.matchType(r.type)) break;
			}
		}
	}
	openMore() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced;
		return yf(e, -1) <= t ? !1 : (this.unplaced.size > 1 && yf(e, 1) > n && n++, this.unplaced = new B(e, t + 1, n), !0);
	}
	dropNode() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = mf(e, t);
		if (r.childCount <= 1 && t > 0) {
			let i = e.size - t <= t + r.size;
			this.unplaced = new B(ff(e, t - 1, 1), t - 1, i ? t - 1 : n);
		} else this.unplaced = new B(ff(e, t, 1), t, n);
	}
	placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: r, wrap: i }) {
		for (; this.depth > t;) this.closeFrontierNode();
		if (i) for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
		let a = this.unplaced, o = n ? n.content : a.content, s = a.openStart - e, c = 0, l = [], { match: u, type: d } = this.frontier[t];
		if (r) {
			for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
			u = u.matchFragment(r);
		}
		let f = o.size + e - (a.content.size - a.openEnd);
		for (; c < o.childCount;) {
			let e = o.child(c), t = u.matchType(e.type);
			if (!t) break;
			c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(hf(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
		}
		let p = c == o.childCount;
		p || (f = -1), this.placed = pf(this.placed, t, R.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
		for (let e = 0, t = o; e < f; e++) {
			let e = t.lastChild;
			this.frontier.push({
				type: e.type,
				match: e.contentMatchAt(e.childCount)
			}), t = e.content;
		}
		this.unplaced = p ? e == 0 ? B.empty : new B(ff(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new B(ff(a.content, e, c), a.openStart, a.openEnd);
	}
	mustMoveInline() {
		if (!this.$to.parent.isTextblock) return -1;
		let e = this.frontier[this.depth], t;
		if (!e.type.isTextblock || !gf(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
		let { depth: n } = this.$to, r = this.$to.after(n);
		for (; n > 1 && r == this.$to.end(--n);) ++r;
		return r;
	}
	findCloseLevel(e) {
		scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
			let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = gf(e, t, r, n, i);
			if (a) {
				for (let n = t - 1; n >= 0; n--) {
					let { match: t, type: r } = this.frontier[n], i = gf(e, n, r, t, !0);
					if (!i || i.childCount) continue scan;
				}
				return {
					depth: t,
					fit: a,
					move: i ? e.doc.resolve(e.after(t + 1)) : e
				};
			}
		}
	}
	close(e) {
		let t = this.findCloseLevel(e);
		if (!t) return null;
		for (; this.depth > t.depth;) this.closeFrontierNode();
		t.fit.childCount && (this.placed = pf(this.placed, t.depth, t.fit)), e = t.move;
		for (let n = t.depth + 1; n <= e.depth; n++) {
			let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
			this.openFrontierNode(t.type, t.attrs, r);
		}
		return e;
	}
	openFrontierNode(e, t = null, n) {
		let r = this.frontier[this.depth];
		r.match = r.match.matchType(e), this.placed = pf(this.placed, this.depth, R.from(e.create(t, n))), this.frontier.push({
			type: e,
			match: e.contentMatch
		});
	}
	closeFrontierNode() {
		let e = this.frontier.pop().match.fillBefore(R.empty, !0);
		e.childCount && (this.placed = pf(this.placed, this.frontier.length, e));
	}
};
function ff(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(ff(e.firstChild.content, t - 1, n)));
}
function pf(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(pf(e.lastChild.content, t - 1, n)));
}
function mf(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function hf(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, hf(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(R.empty, !0)))), e.copy(r);
}
function gf(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !_f(n, a.content, o) ? s : null;
}
function _f(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function vf(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function yf(e, t) {
	for (let n = 0;; n++) {
		let r = t < 0 ? e.firstChild : e.lastChild;
		if (!r || r.isAtom) return n;
		e = r.content;
	}
}
function bf(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (uf(i, a, r)) return e.step(new Pd(t, n, r));
	let o = wf(i, a);
	o[o.length - 1] == 0 && o.pop();
	let s = -(i.depth + 1);
	o.unshift(s);
	for (let e = i.depth, t = i.pos - 1; e > 0; e--, t--) {
		let n = i.node(e).type.spec;
		if (n.defining || n.definingAsContext || n.isolating) break;
		o.indexOf(e) > -1 ? s = e : i.before(e) == t && o.splice(1, 0, -e);
	}
	let c = o.indexOf(s), l = [], u = r.openStart;
	for (let e = r.content, t = 0;; t++) {
		let n = e.firstChild;
		if (l.push(n), t == r.openStart) break;
		e = n.content;
	}
	for (let e = u - 1; e >= 0; e--) {
		let t = l[e], n = vf(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new B(xf(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function xf(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(xf(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(R.empty, !0));
	}
	return e;
}
function Sf(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = sf(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new B(R.from(r), 0, 0));
}
function Cf(e, t, n) {
	let r = e.doc.resolve(t), i = e.doc.resolve(n);
	if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
		let a = r.sharedDepth(n), o = !1;
		for (let e = r.depth; e > a; e--) r.node(e).type.spec.isolating && (o = !0);
		for (let e = i.depth; e > a; e--) i.node(e).type.spec.isolating && (o = !0);
		if (!o) {
			for (let e = r.depth; e > 0 && t == r.start(e); e--) t = r.before(e);
			for (let e = i.depth; e > 0 && n == i.start(e); e--) n = i.before(e);
			r = e.doc.resolve(t), i = e.doc.resolve(n);
		}
	}
	let a = wf(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function wf(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var Tf = class e extends Td {
	constructor(e, t, n) {
		super(), this.pos = e, this.attr = t, this.value = n;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Ed.fail("No node at attribute step's position");
		let n = Object.create(null);
		for (let e in t.attrs) n[e] = t.attrs[e];
		n[this.attr] = this.value;
		let r = t.type.create(n, null, t.marks);
		return Ed.fromReplace(e, this.pos, this.pos + 1, new B(R.from(r), 0, +!t.isLeaf));
	}
	getMap() {
		return Sd.empty;
	}
	invert(t) {
		return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr]);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.attr, this.value);
	}
	toJSON() {
		return {
			stepType: "attr",
			pos: this.pos,
			attr: this.attr,
			value: this.value
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number" || typeof n.attr != "string") throw RangeError("Invalid input for AttrStep.fromJSON");
		return new e(n.pos, n.attr, n.value);
	}
};
Td.jsonID("attr", Tf);
var Ef = class e extends Td {
	constructor(e, t) {
		super(), this.attr = e, this.value = t;
	}
	apply(e) {
		let t = Object.create(null);
		for (let n in e.attrs) t[n] = e.attrs[n];
		t[this.attr] = this.value;
		let n = e.type.create(t, e.content, e.marks);
		return Ed.ok(n);
	}
	getMap() {
		return Sd.empty;
	}
	invert(t) {
		return new e(this.attr, t.attrs[this.attr]);
	}
	map(e) {
		return this;
	}
	toJSON() {
		return {
			stepType: "docAttr",
			attr: this.attr,
			value: this.value
		};
	}
	static fromJSON(t, n) {
		if (typeof n.attr != "string") throw RangeError("Invalid input for DocAttrStep.fromJSON");
		return new e(n.attr, n.value);
	}
};
Td.jsonID("docAttr", Ef);
var Df = class extends Error {};
Df = function e(t) {
	let n = Error.call(this, t);
	return n.__proto__ = e.prototype, n;
}, Df.prototype = Object.create(Error.prototype), Df.prototype.constructor = Df, Df.prototype.name = "TransformError";
var Of = class {
	constructor(e) {
		this.doc = e, this.steps = [], this.docs = [], this.mapping = new Cd();
	}
	get before() {
		return this.docs.length ? this.docs[0] : this.doc;
	}
	step(e) {
		let t = this.maybeStep(e);
		if (t.failed) throw new Df(t.failed);
		return this;
	}
	maybeStep(e) {
		let t = e.apply(this.doc);
		return t.failed || this.addStep(e, t.doc), t;
	}
	get docChanged() {
		return this.steps.length > 0;
	}
	changedRange() {
		let e = 1e9, t = -1e9;
		for (let n = 0; n < this.mapping.maps.length; n++) {
			let r = this.mapping.maps[n];
			n && (e = r.map(e, 1), t = r.map(t, -1)), r.forEach((n, r, i, a) => {
				e = Math.min(e, i), t = Math.max(t, a);
			});
		}
		return e == 1e9 ? null : {
			from: e,
			to: t
		};
	}
	addStep(e, t) {
		this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
	}
	replace(e, t = e, n = B.empty) {
		let r = lf(this.doc, e, t, n);
		return r && this.step(r), this;
	}
	replaceWith(e, t, n) {
		return this.replace(e, t, new B(R.from(n), 0, 0));
	}
	delete(e, t) {
		return this.replace(e, t, B.empty);
	}
	insert(e, t) {
		return this.replaceWith(e, e, t);
	}
	replaceRange(e, t, n) {
		return bf(this, e, t, n), this;
	}
	replaceRangeWith(e, t, n) {
		return Sf(this, e, t, n), this;
	}
	deleteRange(e, t) {
		return Cf(this, e, t), this;
	}
	lift(e, t) {
		return Hd(this, e, t), this;
	}
	join(e, t = 1) {
		return of(this, e, t), this;
	}
	wrap(e, t) {
		return qd(this, e, t), this;
	}
	setBlockType(e, t = e, n, r = null) {
		return Jd(this, e, t, n, r), this;
	}
	setNodeMarkup(e, t, n = null, r) {
		return Qd(this, e, t, n, r), this;
	}
	setNodeAttribute(e, t, n) {
		return this.step(new Tf(e, t, n)), this;
	}
	setDocAttribute(e, t) {
		return this.step(new Ef(e, t)), this;
	}
	addNodeMark(e, t) {
		return this.step(new Md(e, t)), this;
	}
	removeNodeMark(e, t) {
		let n = this.doc.nodeAt(e);
		if (!n) throw RangeError("No node at position " + e);
		if (t instanceof z) t.isInSet(n.marks) && this.step(new Nd(e, t));
		else {
			let r = n.marks, i, a = [];
			for (; i = t.isInSet(r);) a.push(new Nd(e, i)), r = i.removeFromSet(r);
			for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
		}
		return this;
	}
	split(e, t = 1, n) {
		return ef(this, e, t, n), this;
	}
	addMark(e, t, n) {
		return Ld(this, e, t, n), this;
	}
	removeMark(e, t, n) {
		return Rd(this, e, t, n), this;
	}
	clearIncompatible(e, t, n) {
		return zd(this, e, t, n), this;
	}
}, kf = Object.create(null), V = class {
	constructor(e, t, n) {
		this.$anchor = e, this.$head = t, this.ranges = n || [new Af(e.min(t), e.max(t))];
	}
	get anchor() {
		return this.$anchor.pos;
	}
	get head() {
		return this.$head.pos;
	}
	get from() {
		return this.$from.pos;
	}
	get to() {
		return this.$to.pos;
	}
	get $from() {
		return this.ranges[0].$from;
	}
	get $to() {
		return this.ranges[0].$to;
	}
	get empty() {
		let e = this.ranges;
		for (let t = 0; t < e.length; t++) if (e[t].$from.pos != e[t].$to.pos) return !1;
		return !0;
	}
	content() {
		return this.$from.doc.slice(this.from, this.to, !0);
	}
	replace(e, t = B.empty) {
		let n = t.content.lastChild, r = null;
		for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
		let i = e.steps.length, a = this.ranges;
		for (let o = 0; o < a.length; o++) {
			let { $from: s, $to: c } = a[o], l = e.mapping.slice(i);
			e.replaceRange(l.map(s.pos), l.map(c.pos), o ? B.empty : t), o == 0 && Rf(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
		}
	}
	replaceWith(e, t) {
		let n = e.steps.length, r = this.ranges;
		for (let i = 0; i < r.length; i++) {
			let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
			i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), Rf(e, n, t.isInline ? -1 : 1));
		}
	}
	static findFrom(e, t, n = !1) {
		let r = e.parent.inlineContent ? new H(e) : Lf(e.node(0), e.parent, e.pos, e.index(), t, n);
		if (r) return r;
		for (let r = e.depth - 1; r >= 0; r--) {
			let i = t < 0 ? Lf(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : Lf(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
			if (i) return i;
		}
		return null;
	}
	static near(e, t = 1) {
		return this.findFrom(e, t) || this.findFrom(e, -t) || new Ff(e.node(0));
	}
	static atStart(e) {
		return Lf(e, e, 0, 0, 1) || new Ff(e);
	}
	static atEnd(e) {
		return Lf(e, e, e.content.size, e.childCount, -1) || new Ff(e);
	}
	static fromJSON(e, t) {
		if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
		let n = kf[t.type];
		if (!n) throw RangeError(`No selection type ${t.type} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in kf) throw RangeError("Duplicate use of selection JSON ID " + e);
		return kf[e] = t, t.prototype.jsonID = e, t;
	}
	getBookmark() {
		return H.between(this.$anchor, this.$head).getBookmark();
	}
};
V.prototype.visible = !0;
var Af = class {
	constructor(e, t) {
		this.$from = e, this.$to = t;
	}
}, jf = !1;
function Mf(e) {
	!jf && !e.parent.inlineContent && (jf = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
var H = class e extends V {
	constructor(e, t = e) {
		Mf(e), Mf(t), super(e, t);
	}
	get $cursor() {
		return this.$anchor.pos == this.$head.pos ? this.$head : null;
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		if (!r.parent.inlineContent) return V.near(r);
		let i = t.resolve(n.map(this.anchor));
		return new e(i.parent.inlineContent ? i : r, r);
	}
	replace(e, t = B.empty) {
		if (super.replace(e, t), t == B.empty) {
			let t = this.$from.marksAcross(this.$to);
			t && e.ensureMarks(t);
		}
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor && t.head == this.head;
	}
	getBookmark() {
		return new Nf(this.anchor, this.head);
	}
	toJSON() {
		return {
			type: "text",
			anchor: this.anchor,
			head: this.head
		};
	}
	static fromJSON(t, n) {
		if (typeof n.anchor != "number" || typeof n.head != "number") throw RangeError("Invalid input for TextSelection.fromJSON");
		return new e(t.resolve(n.anchor), t.resolve(n.head));
	}
	static create(e, t, n = t) {
		let r = e.resolve(t);
		return new this(r, n == t ? r : e.resolve(n));
	}
	static between(t, n, r) {
		let i = t.pos - n.pos;
		if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
			let e = V.findFrom(n, r, !0) || V.findFrom(n, -r, !0);
			if (e) n = e.$head;
			else return V.near(n, r);
		}
		return t.parent.inlineContent || (i == 0 ? t = n : (t = (V.findFrom(t, -r, !0) || V.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n);
	}
};
V.jsonID("text", H);
var Nf = class e {
	constructor(e, t) {
		this.anchor = e, this.head = t;
	}
	map(t) {
		return new e(t.map(this.anchor), t.map(this.head));
	}
	resolve(e) {
		return H.between(e.resolve(this.anchor), e.resolve(this.head));
	}
}, U = class e extends V {
	constructor(e) {
		let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
		super(e, n), this.node = t;
	}
	map(t, n) {
		let { deleted: r, pos: i } = n.mapResult(this.anchor), a = t.resolve(i);
		return r ? V.near(a) : new e(a);
	}
	content() {
		return new B(R.from(this.node), 0, 0);
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor;
	}
	toJSON() {
		return {
			type: "node",
			anchor: this.anchor
		};
	}
	getBookmark() {
		return new Pf(this.anchor);
	}
	static fromJSON(t, n) {
		if (typeof n.anchor != "number") throw RangeError("Invalid input for NodeSelection.fromJSON");
		return new e(t.resolve(n.anchor));
	}
	static create(t, n) {
		return new e(t.resolve(n));
	}
	static isSelectable(e) {
		return !e.isText && e.type.spec.selectable !== !1;
	}
};
U.prototype.visible = !1, V.jsonID("node", U);
var Pf = class e {
	constructor(e) {
		this.anchor = e;
	}
	map(t) {
		let { deleted: n, pos: r } = t.mapResult(this.anchor);
		return n ? new Nf(r, r) : new e(r);
	}
	resolve(e) {
		let t = e.resolve(this.anchor), n = t.nodeAfter;
		return n && U.isSelectable(n) ? new U(t) : V.near(t);
	}
}, Ff = class e extends V {
	constructor(e) {
		super(e.resolve(0), e.resolve(e.content.size));
	}
	replace(e, t = B.empty) {
		if (t == B.empty) {
			e.delete(0, e.doc.content.size);
			let t = V.atStart(e.doc);
			t.eq(e.selection) || e.setSelection(t);
		} else super.replace(e, t);
	}
	toJSON() {
		return { type: "all" };
	}
	static fromJSON(t) {
		return new e(t);
	}
	map(t) {
		return new e(t);
	}
	eq(t) {
		return t instanceof e;
	}
	getBookmark() {
		return If;
	}
};
V.jsonID("all", Ff);
var If = {
	map() {
		return this;
	},
	resolve(e) {
		return new Ff(e);
	}
};
function Lf(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return H.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = Lf(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && U.isSelectable(r)) return U.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function Rf(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Pd || i instanceof Fd)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(V.near(e.doc.resolve(o), n));
}
var zf = 1, Bf = 2, Vf = 4, Hf = class extends Of {
	constructor(e) {
		super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
	}
	get selection() {
		return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
	}
	setSelection(e) {
		if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
		return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | zf) & -3, this.storedMarks = null, this;
	}
	get selectionSet() {
		return (this.updated & zf) > 0;
	}
	setStoredMarks(e) {
		return this.storedMarks = e, this.updated |= Bf, this;
	}
	ensureMarks(e) {
		return z.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
	}
	addStoredMark(e) {
		return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
	}
	removeStoredMark(e) {
		return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
	}
	get storedMarksSet() {
		return (this.updated & Bf) > 0;
	}
	addStep(e, t) {
		super.addStep(e, t), this.updated &= -3, this.storedMarks = null;
	}
	setTime(e) {
		return this.time = e, this;
	}
	replaceSelection(e) {
		return this.selection.replace(this, e), this;
	}
	replaceSelectionWith(e, t = !0) {
		let n = this.selection;
		return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || z.none))), n.replaceWith(this, e), this;
	}
	deleteSelection() {
		return this.selection.replace(this), this;
	}
	insertText(e, t, n) {
		let r = this.doc.type.schema;
		if (t == null) return e ? this.replaceSelectionWith(r.text(e), !0) : this.deleteSelection();
		{
			if (n ??= t, !e) return this.deleteRange(t, n);
			let i = this.storedMarks;
			if (!i) {
				let e = this.doc.resolve(t);
				i = n == t ? e.marks() : e.marksAcross(this.doc.resolve(n));
			}
			return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(V.near(this.selection.$to)), this;
		}
	}
	setMeta(e, t) {
		return this.meta[typeof e == "string" ? e : e.key] = t, this;
	}
	getMeta(e) {
		return this.meta[typeof e == "string" ? e : e.key];
	}
	get isGeneric() {
		for (let e in this.meta) return !1;
		return !0;
	}
	scrollIntoView() {
		return this.updated |= Vf, this;
	}
	get scrolledIntoView() {
		return (this.updated & Vf) > 0;
	}
};
function Uf(e, t) {
	return !t || !e ? e : e.bind(t);
}
var Wf = class {
	constructor(e, t, n) {
		this.name = e, this.init = Uf(t.init, n), this.apply = Uf(t.apply, n);
	}
}, Gf = [
	new Wf("doc", {
		init(e) {
			return e.doc || e.schema.topNodeType.createAndFill();
		},
		apply(e) {
			return e.doc;
		}
	}),
	new Wf("selection", {
		init(e, t) {
			return e.selection || V.atStart(t.doc);
		},
		apply(e) {
			return e.selection;
		}
	}),
	new Wf("storedMarks", {
		init(e) {
			return e.storedMarks || null;
		},
		apply(e, t, n, r) {
			return r.selection.$cursor ? e.storedMarks : null;
		}
	}),
	new Wf("scrollToSelection", {
		init() {
			return 0;
		},
		apply(e, t) {
			return e.scrolledIntoView ? t + 1 : t;
		}
	})
], Kf = class {
	constructor(e, t) {
		this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = Gf.slice(), t && t.forEach((e) => {
			if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
			this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new Wf(e.key, e.spec.state, e));
		});
	}
}, qf = class e {
	constructor(e) {
		this.config = e;
	}
	get schema() {
		return this.config.schema;
	}
	get plugins() {
		return this.config.plugins;
	}
	apply(e) {
		return this.applyTransaction(e).state;
	}
	filterTransaction(e, t = -1) {
		for (let n = 0; n < this.config.plugins.length; n++) if (n != t) {
			let t = this.config.plugins[n];
			if (t.spec.filterTransaction && !t.spec.filterTransaction.call(t, e, this)) return !1;
		}
		return !0;
	}
	applyTransaction(e) {
		if (!this.filterTransaction(e)) return {
			state: this,
			transactions: []
		};
		let t = [e], n = this.applyInner(e), r = null;
		for (;;) {
			let i = !1;
			for (let a = 0; a < this.config.plugins.length; a++) {
				let o = this.config.plugins[a];
				if (o.spec.appendTransaction) {
					let s = r ? r[a].n : 0, c = r ? r[a].state : this, l = s < t.length && o.spec.appendTransaction.call(o, s ? t.slice(s) : t, c, n);
					if (l && n.filterTransaction(l, a)) {
						if (l.setMeta("appendedTransaction", e), !r) {
							r = [];
							for (let e = 0; e < this.config.plugins.length; e++) r.push(e < a ? {
								state: n,
								n: t.length
							} : {
								state: this,
								n: 0
							});
						}
						t.push(l), n = n.applyInner(l), i = !0;
					}
					r && (r[a] = {
						state: n,
						n: t.length
					});
				}
			}
			if (!i) return {
				state: n,
				transactions: t
			};
		}
	}
	applyInner(t) {
		if (!t.before.eq(this.doc)) throw RangeError("Applying a mismatched transaction");
		let n = new e(this.config), r = this.config.fields;
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			n[i.name] = i.apply(t, this[i.name], this, n);
		}
		return n;
	}
	get tr() {
		return new Hf(this);
	}
	static create(t) {
		let n = new Kf(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
		for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
		return r;
	}
	reconfigure(t) {
		let n = new Kf(this.schema, t.plugins), r = n.fields, i = new e(n);
		for (let e = 0; e < r.length; e++) {
			let n = r[e].name;
			i[n] = this.hasOwnProperty(n) ? this[n] : r[e].init(t, i);
		}
		return i;
	}
	toJSON(e) {
		let t = {
			doc: this.doc.toJSON(),
			selection: this.selection.toJSON()
		};
		if (this.storedMarks && (t.storedMarks = this.storedMarks.map((e) => e.toJSON())), e && typeof e == "object") for (let n in e) {
			if (n == "doc" || n == "selection") throw RangeError("The JSON fields `doc` and `selection` are reserved");
			let r = e[n], i = r.spec.state;
			i && i.toJSON && (t[n] = i.toJSON.call(r, this[r.key]));
		}
		return t;
	}
	static fromJSON(t, n, r) {
		if (!n) throw RangeError("Invalid input for EditorState.fromJSON");
		if (!t.schema) throw RangeError("Required config field 'schema' missing");
		let i = new Kf(t.schema, t.plugins), a = new e(i);
		return i.fields.forEach((e) => {
			if (e.name == "doc") a.doc = gu.fromJSON(t.schema, n.doc);
			else if (e.name == "selection") a.selection = V.fromJSON(a.doc, n.selection);
			else if (e.name == "storedMarks") n.storedMarks && (a.storedMarks = n.storedMarks.map(t.schema.markFromJSON));
			else {
				if (r) for (let i in r) {
					let o = r[i], s = o.spec.state;
					if (o.key == e.name && s && s.fromJSON && Object.prototype.hasOwnProperty.call(n, i)) {
						a[e.name] = s.fromJSON.call(o, t, n[i], a);
						return;
					}
				}
				a[e.name] = e.init(t, a);
			}
		}), a;
	}
};
function Jf(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = Jf(i, t, {})), n[r] = i;
	}
	return n;
}
var W = class {
	constructor(e) {
		this.spec = e, this.props = {}, e.props && Jf(e.props, this, this.props), this.key = e.key ? e.key.key : Xf("plugin");
	}
	getState(e) {
		return e[this.key];
	}
}, Yf = Object.create(null);
function Xf(e) {
	return e in Yf ? e + "$" + ++Yf[e] : (Yf[e] = 0, e + "$");
}
var Zf = class {
	constructor(e = "key") {
		this.key = Xf(e);
	}
	get(e) {
		return e.config.pluginsByKey[this.key];
	}
	getState(e) {
		return e[this.key];
	}
}, Qf = (e, t) => !e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function $f(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
var ep = (e, t, n) => {
	let r = $f(e, n);
	if (!r) return !1;
	let i = op(r);
	if (!i) {
		let n = r.blockRange(), i = n && Vd(n);
		return i != null && (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
	}
	let a = i.nodeBefore;
	if (wp(e, i, t, -1)) return !0;
	if (r.parent.content.size == 0 && (ip(a, "end") || U.isSelectable(a))) for (let n = r.depth;; n--) {
		let o = lf(e.doc, r.before(n), r.after(n), B.empty);
		if (o && o.slice.size < o.to - o.from) {
			if (t) {
				let n = e.tr.step(o);
				n.setSelection(ip(a, "end") ? V.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : U.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
			}
			return !0;
		}
		if (n == 1 || r.node(n - 1).childCount > 1) break;
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, tp = (e, t, n) => {
	let r = $f(e, n);
	if (!r) return !1;
	let i = op(r);
	return i ? rp(e, i, t) : !1;
}, np = (e, t, n) => {
	let r = sp(e, n);
	if (!r) return !1;
	let i = up(r);
	return i ? rp(e, i, t) : !1;
};
function rp(e, t, n) {
	let r = t.nodeBefore, i = t.pos - 1;
	for (; !r.isTextblock; i--) {
		if (r.type.spec.isolating) return !1;
		let e = r.lastChild;
		if (!e) return !1;
		r = e;
	}
	let a = t.nodeAfter, o = t.pos + 1;
	for (; !a.isTextblock; o++) {
		if (a.type.spec.isolating) return !1;
		let e = a.firstChild;
		if (!e) return !1;
		a = e;
	}
	let s = lf(e.doc, i, o, B.empty);
	if (!s || s.from != i || s instanceof Pd && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(H.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function ip(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
var ap = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
		a = op(r);
	}
	let o = a && a.nodeBefore;
	return !o || !U.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(U.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
};
function op(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function sp(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
var cp = (e, t, n) => {
	let r = sp(e, n);
	if (!r) return !1;
	let i = up(r);
	if (!i) return !1;
	let a = i.nodeAfter;
	if (wp(e, i, t, 1)) return !0;
	if (r.parent.content.size == 0 && (ip(a, "start") || U.isSelectable(a))) {
		let n = lf(e.doc, r.before(), r.after(), B.empty);
		if (n && n.slice.size < n.to - n.from) {
			if (t) {
				let r = e.tr.step(n);
				r.setSelection(ip(a, "start") ? V.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : U.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
			}
			return !0;
		}
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
}, lp = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
		a = up(r);
	}
	let o = a && a.nodeAfter;
	return !o || !U.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(U.create(e.doc, a.pos)).scrollIntoView()), !0);
};
function up(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
var dp = (e, t) => {
	let n = e.selection, r = n instanceof U, i;
	if (r) {
		if (n.node.isTextblock || !tf(e.doc, n.from)) return !1;
		i = n.from;
	} else if (i = af(e.doc, n.from, -1), i == null) return !1;
	if (t) {
		let n = e.tr.join(i);
		r && n.setSelection(U.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
	}
	return !0;
}, fp = (e, t) => {
	let n = e.selection, r;
	if (n instanceof U) {
		if (n.node.isTextblock || !tf(e.doc, n.to)) return !1;
		r = n.to;
	} else if (r = af(e.doc, n.to, 1), r == null) return !1;
	return t && t(e.tr.join(r).scrollIntoView()), !0;
}, pp = (e, t) => {
	let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && Vd(i);
	return a != null && (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
}, mp = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
};
function hp(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var gp = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
	let i = n.node(-1), a = n.indexAfter(-1), o = hp(i.contentMatchAt(a));
	if (!o || !i.canReplaceWith(a, a, o)) return !1;
	if (t) {
		let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
		i.setSelection(V.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
	}
	return !0;
}, _p = (e, t) => {
	let n = e.selection, { $from: r, $to: i } = n;
	if (n instanceof Ff || r.parent.inlineContent || i.parent.inlineContent) return !1;
	let a = hp(i.parent.contentMatchAt(i.indexAfter()));
	if (!a || !a.isTextblock) return !1;
	if (t) {
		let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
		o.setSelection(H.create(o.doc, n + 1)), t(o.scrollIntoView());
	}
	return !0;
}, vp = (e, t) => {
	let { $cursor: n } = e.selection;
	if (!n || n.parent.content.size) return !1;
	if (n.depth > 1 && n.after() != n.end(-1)) {
		let r = n.before();
		if ($d(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
	}
	let r = n.blockRange(), i = r && Vd(r);
	return i != null && (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
};
function yp(e) {
	return (t, n) => {
		if (t.selection instanceof U && t.selection.node.isBlock) {
			let { $from: e } = t.selection;
			return !e.parentOffset || !$d(t.doc, e.pos) ? !1 : (n && n(t.tr.split(e.pos).scrollIntoView()), !0);
		}
		if (!t.selection.$from.depth) return !1;
		let r = t.tr;
		!t.selection.empty && (t.selection instanceof H || t.selection instanceof Ff) && r.deleteSelection();
		let { $from: i } = r.selection, a = r.steps.length, o = [], s, c, l = !1, u = !1;
		for (let t = i.depth;; t--) if (i.node(t).isBlock) {
			l = i.end(t) == i.pos + (i.depth - t), u = i.start(t) == i.pos - (i.depth - t), c = hp(i.node(t - 1).contentMatchAt(i.indexAfter(t - 1)));
			let n = e && e(i.parent, l, i);
			o.unshift(n || (l && c ? { type: c } : null)), s = t;
			break;
		} else {
			if (t == 1) return !1;
			o.unshift(null);
		}
		let d = i.pos, f = $d(r.doc, d, o.length, o);
		if (f ||= (o[0] = c ? { type: c } : null, $d(r.doc, d, o.length, o)), !f) return !1;
		if (r.split(d, o.length, o), !l && u && i.node(s).type != c) {
			let e = r.mapping.slice(a), t = e.map(i.before(s)), n = r.doc.resolve(t);
			c && i.node(s - 1).canReplaceWith(n.index(), n.index() + 1, c) && r.setNodeMarkup(e.map(i.before(s)), c);
		}
		return n && n(r.scrollIntoView()), !0;
	};
}
var bp = yp(), xp = (e, t) => {
	let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
	return a != 0 && (i = n.before(a), t && t(e.tr.setSelection(U.create(e.doc, i))), !0);
}, Sp = (e, t) => (t && t(e.tr.setSelection(new Ff(e.doc))), !0);
function Cp(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || tf(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function wp(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && Cp(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = R.empty;
			for (let e = o.length - 1; e >= 0; e--) s = R.from(o[e].create(null, s));
			s = R.from(i.copy(s));
			let c = e.tr.step(new Fd(t.pos - 1, r, t.pos, r, new B(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && tf(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : V.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && Vd(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && ip(a, "start", !0) && ip(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = R.empty;
				for (let e = o.length - 1; e >= 0; e--) r = R.from(o[e].copy(r));
				n(e.tr.step(new Fd(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new B(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function Tp(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(H.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
var Ep = Tp(-1), Dp = Tp(1);
function Op(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && Ud(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function kp(e, t = null) {
	return function(n, r) {
		let i = !1;
		for (let r = 0; r < n.selection.ranges.length && !i; r++) {
			let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
			n.doc.nodesBetween(a, o, (r, a) => {
				if (i) return !1;
				if (r.isTextblock && !r.hasMarkup(e, t)) {
					if (r.type == e) i = !0;
					else {
						let t = n.doc.resolve(a), r = t.index();
						i = t.parent.canReplaceWith(r, r + 1, e);
					}
				}
			});
		}
		if (!i) return !1;
		if (r) {
			let i = n.tr;
			for (let r = 0; r < n.selection.ranges.length; r++) {
				let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
				i.setBlockType(a, o, e, t);
			}
			r(i.scrollIntoView());
		}
		return !0;
	};
}
function Ap(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var jp = Ap(Qf, ep, ap), Mp = Ap(Qf, cp, lp), Np = {
	Enter: Ap(mp, _p, vp, bp),
	"Mod-Enter": gp,
	Backspace: jp,
	"Mod-Backspace": jp,
	"Shift-Backspace": jp,
	Delete: Mp,
	"Mod-Delete": Mp,
	"Mod-a": Sp
}, Pp = {
	"Ctrl-h": Np.Backspace,
	"Alt-Backspace": Np["Mod-Backspace"],
	"Ctrl-d": Np.Delete,
	"Ctrl-Alt-Backspace": Np["Mod-Delete"],
	"Alt-Delete": Np["Mod-Delete"],
	"Alt-d": Np["Mod-Delete"],
	"Ctrl-a": Ep,
	"Ctrl-e": Dp
};
for (let e in Np) Pp[e] = Np[e];
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
// node_modules/prosemirror-schema-list/dist/index.js
function Fp(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return Ip(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function Ip(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new mu(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new mu(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = Ud(a, n, r, t);
	return s ? (e && Lp(e, t, s, i, n), !0) : !1;
}
function Lp(e, t, n, r, i) {
	let a = R.empty;
	for (let e = n.length - 1; e >= 0; e--) a = R.from(n[e].type.create(n[e].attrs, a));
	e.step(new Fd(t.start - (r ? 2 : 0), t.end, t.start, t.end, new B(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && $d(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function Rp(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		return a ? n ? r.node(a.depth - 1).type == e ? zp(t, n, e, a) : Bp(t, n, a) : !0 : !1;
	};
}
function zp(e, t, n, r) {
	let i = e.tr, a = r.end, o = r.$to.end(r.depth);
	a < o && (i.step(new Fd(a - 1, o, a, o, new B(R.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new mu(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
	let s = Vd(r);
	if (s == null) return !1;
	i.lift(r, s);
	let c = i.doc.resolve(i.mapping.map(a, -1) - 1);
	return tf(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), t(i.scrollIntoView()), !0;
}
function Bp(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? R.empty : R.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new Fd(d - +!!s, f + +!!c, d + 1, f - 1, new B((s ? R.empty : R.from(i.copy(R.empty))).append(c ? R.empty : R.from(i.copy(R.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function Vp(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (c.type != e) return !1;
		if (n) {
			let r = c.lastChild && c.lastChild.type == s.type, i = R.from(r ? e.create() : null), o = new B(R.from(e.create(null, R.from(s.type.create(null, i)))), r ? 3 : 1, 0), l = a.start, u = a.end;
			n(t.tr.step(new Fd(l - (r ? 3 : 1), u, l, u, o, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
// node_modules/prosemirror-view/dist/index.js
var Hp = function(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}, Up = function(e) {
	let t = e.assignedSlot || e.parentNode;
	return t && t.nodeType == 11 ? t.host : t;
}, Wp = null, Gp = function(e, t, n) {
	let r = Wp ||= document.createRange();
	return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
}, Kp = function() {
	Wp = null;
}, qp = function(e, t, n, r) {
	return n && (Yp(e, t, n, r, -1) || Yp(e, t, n, r, 1));
}, Jp = /^(img|br|input|textarea|hr)$/i;
function Yp(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : Xp(e))) {
			let n = e.parentNode;
			if (!n || !G(n) || nm(e) || Jp.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = Hp(e) + (i < 0 ? 0 : 1), e = n;
		} else if (G(e)) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (G(n) && n.contentEditable == "false") {
				if (n.pmViewDesc?.ignoreForSelection) t += i;
				else return !1;
			} else e = n, t = i < 0 ? Xp(e) : 0;
		} else return !1;
	}
}
function Xp(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function G(e) {
	return e.nodeType == 1;
}
function Zp(e) {
	return e.nodeType == 3;
}
function Qp(e, t) {
	return t ? e.contains(G(t) ? t : t.parentNode) : !1;
}
function $p(e, t) {
	for (;;) {
		if (Zp(e) && t) return e;
		if (G(e) && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = Xp(e);
		} else if (e.parentNode && !nm(e)) t = Hp(e), e = e.parentNode;
		else return null;
	}
}
function em(e, t) {
	for (;;) {
		if (Zp(e) && t < e.nodeValue.length) return e;
		if (G(e) && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !nm(e)) t = Hp(e) + 1, e = e.parentNode;
		else return null;
	}
}
function tm(e, t, n) {
	for (let r = t == 0, i = t == Xp(e); r || i;) {
		if (e == n) return !0;
		let t = Hp(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == Xp(e);
	}
}
function nm(e) {
	let t;
	for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
	return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
var rm = function(e) {
	return e.focusNode && qp(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
};
function im(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function am(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function om(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(Xp(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(Xp(r.startContainer), r.startOffset)
		};
	}
}
var sm = typeof navigator < "u" ? navigator : null, cm = typeof document < "u" ? document : null, lm = sm && sm.userAgent || "", um = /Edge\/(\d+)/.exec(lm), dm = /MSIE \d/.exec(lm), fm = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(lm), pm = !!(dm || fm || um), mm = dm ? document.documentMode : fm ? +fm[1] : um ? +um[1] : 0, hm = !pm && /gecko\/(\d+)/i.test(lm);
hm && +(/Firefox\/(\d+)/.exec(lm) || [0, 0])[1];
var gm = !pm && /Chrome\/(\d+)/.exec(lm), _m = !!gm, vm = gm ? +gm[1] : 0, ym = !pm && !!sm && /Apple Computer/.test(sm.vendor), bm = ym && (/Mobile\/\w+/.test(lm) || !!sm && sm.maxTouchPoints > 2), xm = bm || (sm ? /Mac/.test(sm.platform) : !1), Sm = sm ? /Win/.test(sm.platform) : !1, Cm = /Android \d/.test(lm), wm = !!cm && "webkitFontSmoothing" in cm.documentElement.style, Tm = wm ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Em(e) {
	let t = e.defaultView && e.defaultView.visualViewport;
	return t ? {
		left: 0,
		right: t.width,
		top: 0,
		bottom: t.height
	} : {
		left: 0,
		right: e.documentElement.clientWidth,
		top: 0,
		bottom: e.documentElement.clientHeight
	};
}
function Dm(e, t) {
	return typeof e == "number" ? e : e[t];
}
function Om(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function km(e, t, n) {
	if (!Wm(t) && t.left == 0) return;
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (!G(o)) {
			o = Up(o);
			continue;
		}
		let e = o == a.body, n = e ? Em(a) : Om(o), s = 0, c = 0;
		if (t.top < n.top + Dm(r, "top") ? c = -(n.top - t.top + Dm(i, "top")) : t.bottom > n.bottom - Dm(r, "bottom") && (c = t.bottom - t.top > n.bottom - n.top ? t.top + Dm(i, "top") - n.top : t.bottom - n.bottom + Dm(i, "bottom")), t.left < n.left + Dm(r, "left") ? s = -(n.left - t.left + Dm(i, "left")) : t.right > n.right - Dm(r, "right") && (s = t.right - n.right + Dm(i, "right")), s || c) {
			if (e) a.defaultView.scrollBy(s, c);
			else {
				let e = o.scrollLeft, n = o.scrollTop;
				c && (o.scrollTop += c), s && (o.scrollLeft += s);
				let r = o.scrollLeft - e, i = o.scrollTop - n;
				t = {
					left: t.left - r,
					top: t.top - i,
					right: t.right - r,
					bottom: t.bottom - i
				};
			}
		}
		let l = e ? "fixed" : getComputedStyle(o).position;
		if (/^(fixed|sticky)$/.test(l)) break;
		o = l == "absolute" ? o.offsetParent : Up(o);
	}
}
function Am(e) {
	let t = e.dom.getBoundingClientRect(), n = Math.max(0, t.top), r, i;
	for (let a = (t.left + t.right) / 2, o = n + 1; o < Math.min(innerHeight, t.bottom); o += 5) {
		let t = e.root.elementFromPoint(a, o);
		if (!t || t == e.dom || !e.dom.contains(t)) continue;
		let s = t.getBoundingClientRect();
		if (s.top >= n - 20) {
			r = t, i = s.top;
			break;
		}
	}
	return {
		refDOM: r,
		refTop: i,
		stack: jm(e.dom)
	};
}
function jm(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = Up(r));
	return t;
}
function Mm({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	Nm(n, r == 0 ? 0 : r - t);
}
function Nm(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
var Pm = null;
function Fm(e) {
	if (e.setActive) return e.setActive();
	if (Pm) return e.focus(Pm);
	let t = jm(e);
	e.focus(Pm == null ? { get preventScroll() {
		return Pm = { preventScroll: !0 }, !0;
	} } : void 0), Pm || (Pm = !1, Nm(t, 0));
}
function Im(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (G(u)) e = u.getClientRects();
		else if (Zp(u)) e = Gp(u).getClientRects();
		else continue;
		for (let f = 0; f < e.length; f++) {
			let p = e[f];
			if (p.top <= o && p.bottom >= s) {
				o = Math.max(p.bottom, o), s = Math.min(p.top, s);
				let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
				if (e < r) {
					n = u, r = e, i = e && Zp(n) ? {
						left: p.right < t.left ? p.right : p.left,
						top: t.top
					} : t, G(u) && e && (a = d + +(t.left >= (p.left + p.right) / 2));
					continue;
				}
			} else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
				left: Math.max(p.left, Math.min(p.right, t.left)),
				top: p.top
			});
			!n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1);
		}
	}
	return !n && c && (n = c, i = l, r = 0), n && Zp(n) ? Lm(n, i) : !n || r ? {
		node: e,
		offset: a
	} : Im(n, i);
}
function Lm(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = Gm(r, 1);
		if (n.top != n.bottom && Rm(t, n)) {
			i = {
				node: e,
				offset: a + +(t.left >= (n.left + n.right) / 2)
			};
			break;
		}
	}
	return r.detach(), i || {
		node: e,
		offset: 0
	};
}
function Rm(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function zm(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function Bm(e, t, n) {
	let { node: r, offset: i } = Im(t, n), a = -1;
	if (G(r) && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function Vm(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (G(t.dom) && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function Hm(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (G(n)) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (Rm(t, i)) return Hm(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function Um(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = om(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o)) {
		let n = e.dom.getBoundingClientRect();
		if (!Rm(t, n) || (o = Hm(e.dom, t, n), !o)) return null;
	}
	if (ym) for (let e = o; r && e; e = Up(e)) e.draggable && (r = void 0);
	if (o = zm(o, t), r) {
		if (hm && G(r) && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		wm && i && G(r) && G(n = r.childNodes[i - 1]) && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && G(r.lastChild) && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : i != 0 && G(r) && r.childNodes[i - 1].nodeName == "BR" || (s = Vm(e, r, i, t));
	}
	s ??= Bm(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function Wm(e) {
	return e.top < e.bottom || e.left < e.right;
}
function Gm(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if (Wm(e)) return e;
	}
	return Array.prototype.find.call(n, Wm) || e.getBoundingClientRect();
}
var Km = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function qm(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = wm || hm;
	if (Zp(r)) {
		if (o && (Km.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
			let e = Gm(Gp(r, i, i), n);
			if (hm && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
				let t = Gm(Gp(r, i - 1, i - 1), -1);
				if (t.top == e.top) {
					let n = Gm(Gp(r, i, i + 1), -1);
					if (n.top != e.top) return Jm(n, n.left < t.left);
				}
			}
			return e;
		}
		{
			let e = i, t = i, a = n < 0 ? 1 : -1;
			return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, Jm(Gm(Gp(r, e, t), a), a < 0);
		}
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == Xp(r))) {
			let e = r.childNodes[i - 1];
			if (G(e)) return Ym(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < Xp(r)) {
			let e = r.childNodes[i];
			if (G(e)) return Ym(e.getBoundingClientRect(), !0);
		}
		return Ym(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == Xp(r))) {
		let e = r.childNodes[i - 1], t = Zp(e) ? Gp(e, Xp(e) - +!o) : G(e) && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return Jm(Gm(t, 1), !1);
	}
	if (a == null && i < Xp(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? Zp(e) ? Gp(e, 0, +!o) : G(e) ? e : null : null;
		if (t) return Jm(Gm(t, -1), !0);
	}
	return Jm(Gm(Zp(r) ? Gp(r) : r, -n), n >= 0);
}
function Jm(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function Ym(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function Xm(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function Zm(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return Xm(e, t, () => {
		let { node: t } = e.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
		for (;;) {
			let n = e.docView.nearestDesc(t, !0);
			if (!n) break;
			if (n.node.isBlock) {
				t = n.contentDOM || n.dom;
				break;
			}
			t = n.dom.parentNode;
		}
		let r = qm(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (G(e)) t = e.getClientRects();
			else if (Zp(e)) t = Gp(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
var Qm = /[\u0590-\u08ac]/;
function $m(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !Qm.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : Xm(e, t, () => {
		let { focusNode: t, focusOffset: i, anchorNode: a, anchorOffset: o } = e.domSelectionRange(), c = s.caretBidiLevel;
		s.modify("move", n, "character");
		let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: u, focusOffset: d } = e.domSelectionRange(), f = u && !Qp(l, u) || t == u && i == d;
		try {
			s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i);
		} catch {}
		return c != null && (s.caretBidiLevel = c), f;
	}) : r.pos == r.start() || r.pos == r.end();
}
var eh = null, th = null, nh = !1;
function rh(e, t, n) {
	return eh == t && th == n ? nh : (eh = t, th = n, nh = n == "up" || n == "down" ? Zm(e, t, n) : $m(e, t, n));
}
var ih = 0, ah = 1, oh = 2, sh = 3, ch = class {
	constructor(e, t, n, r) {
		this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = ih, n.pmViewDesc = this;
	}
	matchesWidget(e) {
		return !1;
	}
	matchesMark(e) {
		return !1;
	}
	matchesNode(e, t, n) {
		return !1;
	}
	matchesHack(e) {
		return !1;
	}
	parseRule(e) {
		return null;
	}
	stopEvent(e) {
		return !1;
	}
	get size() {
		let e = 0;
		for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
		return e;
	}
	get border() {
		return 0;
	}
	destroy() {
		this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
		for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
	}
	posBeforeChild(e) {
		for (let t = 0, n = this.posAtStart;; t++) {
			let r = this.children[t];
			if (r == e) return n;
			n += r.size;
		}
	}
	get posBefore() {
		return this.parent.posBeforeChild(this);
	}
	get posAtStart() {
		return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
	}
	get posAfter() {
		return this.posBefore + this.size;
	}
	get posAtEnd() {
		return this.posAtStart + this.size - 2 * this.border;
	}
	localPosFromDOM(e, t, n) {
		if (this.contentDOM && Qp(this.contentDOM, e)) {
			if (n < 0) {
				let n, r;
				if (e == this.contentDOM) n = e.childNodes[t - 1];
				else {
					for (; e.parentNode != this.contentDOM;) e = e.parentNode;
					n = e.previousSibling;
				}
				for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
				return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
			}
			{
				let n, r;
				if (e == this.contentDOM) n = e.childNodes[t];
				else {
					for (; e.parentNode != this.contentDOM;) e = e.parentNode;
					n = e.nextSibling;
				}
				for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
				return n ? this.posBeforeChild(r) : this.posAtEnd;
			}
		}
		let r;
		if (e == this.dom && this.contentDOM) r = t > Hp(this.contentDOM);
		else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
			let n = e.compareDocumentPosition(this.contentDOM);
			r = n & 16 ? t > Array.from(e.childNodes).findIndex((e) => e.contains(this.contentDOM)) : !(n & 4);
		} else if (this.dom.firstChild) {
			if (t == 0) for (let t = e;; t = t.parentNode) {
				if (t == this.dom) {
					r = !1;
					break;
				}
				if (t.previousSibling) break;
			}
			if (r == null && t == e.childNodes.length) for (let t = e;; t = t.parentNode) {
				if (t == this.dom) {
					r = !0;
					break;
				}
				if (t.nextSibling) break;
			}
		}
		return r ?? n > 0 ? this.posAtEnd : this.posAtStart;
	}
	nearestDesc(e, t = !1) {
		for (let n = !0, r = e; r; r = r.parentNode) {
			let i = this.getDesc(r), a;
			if (i && (!t || i.node)) {
				if (n && (a = i.nodeDOM) && !(G(a) ? Qp(a, e) : a == e)) n = !1;
				else return i;
			}
		}
	}
	getDesc(e) {
		let t = e.pmViewDesc;
		for (let e = t; e; e = e.parent) if (e == this) return t;
	}
	posFromDOM(e, t, n) {
		for (let r = e; r; r = r.parentNode) {
			let i = this.getDesc(r);
			if (i) return i.localPosFromDOM(e, t, n);
		}
		return -1;
	}
	descAt(e) {
		for (let t = 0, n = 0; t < this.children.length; t++) {
			let r = this.children[t], i = n + r.size;
			if (n == e && i != n) {
				for (; !r.border && r.children.length;) for (let e = 0; e < r.children.length; e++) {
					let t = r.children[e];
					if (t.size) {
						r = t;
						break;
					}
				}
				return r;
			}
			if (e < i) return r.descAt(e - n - r.border);
			n = i;
		}
	}
	domFromPos(e, t) {
		if (!this.contentDOM) return {
			node: this.dom,
			offset: 0,
			atom: e + 1
		};
		let n = 0, r = 0;
		for (let t = 0; n < this.children.length; n++) {
			let i = this.children[n], a = t + i.size;
			if (a > e) {
				r = e - t;
				break;
			}
			t = a;
		}
		if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
		for (; n > 0; n--) {
			let e = this.children[n - 1];
			if (e.size || !(e instanceof hh || e instanceof lh && e.side >= 0)) break;
		}
		if (t <= 0) {
			let e, r = !0;
			for (; e = n ? this.children[n - 1] : null, e && e.dom.parentNode != this.contentDOM; n--, r = !1);
			return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
				node: this.contentDOM,
				offset: e ? Hp(e.dom) + 1 : 0
			};
		}
		{
			let e, r = !0;
			for (; e = n < this.children.length ? this.children[n] : null, e && e.dom.parentNode != this.contentDOM; n++, r = !1);
			return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
				node: this.contentDOM,
				offset: e ? Hp(e.dom) : this.contentDOM.childNodes.length
			};
		}
	}
	parseRange(e, t, n = 0) {
		if (this.children.length == 0) return {
			node: this.contentDOM,
			from: e,
			to: t,
			fromOffset: 0,
			toOffset: this.contentDOM.childNodes.length
		};
		let r = -1, i = -1;
		for (let a = n, o = 0;; o++) {
			let n = this.children[o], s = a + n.size;
			if (r == -1 && e <= s) {
				let i = a + n.border;
				if (e >= i && t <= s - n.border && n.node && n.contentDOM && this.contentDOM.contains(n.contentDOM)) return n.parseRange(e, t, i);
				e = a;
				for (let t = o; t > 0; t--) {
					let n = this.children[t - 1];
					if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(1)) {
						r = Hp(n.dom) + 1;
						break;
					}
					e -= n.size;
				}
				r == -1 && (r = 0);
			}
			if (r > -1 && (s > t || o == this.children.length - 1)) {
				t = s;
				for (let e = o + 1; e < this.children.length; e++) {
					let n = this.children[e];
					if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(-1)) {
						i = Hp(n.dom);
						break;
					}
					t += n.size;
				}
				i == -1 && (i = this.contentDOM.childNodes.length);
				break;
			}
			a = s;
		}
		return {
			node: this.contentDOM,
			from: e,
			to: t,
			fromOffset: r,
			toOffset: i
		};
	}
	emptyChildAt(e) {
		if (this.border || !this.contentDOM || !this.children.length) return !1;
		let t = this.children[e < 0 ? 0 : this.children.length - 1];
		return t.size == 0 || t.emptyChildAt(e);
	}
	domAfterPos(e) {
		let { node: t, offset: n } = this.domFromPos(e, 0);
		if (!G(t) || n == t.childNodes.length) throw RangeError("No node after pos " + e);
		return t.childNodes[n];
	}
	setSelection(e, t, n, r = !1) {
		let i = Math.min(e, t), a = Math.max(e, t);
		for (let o = 0, s = 0; o < this.children.length; o++) {
			let c = this.children[o], l = s + c.size;
			if (i > s && a < l) return c.setSelection(e - s - c.border, t - s - c.border, n, r);
			s = l;
		}
		let o = this.domFromPos(e, e ? -1 : 1), s = t == e ? o : this.domFromPos(t, t ? -1 : 1), c = n.root.getSelection(), l = n.domSelectionRange(), u = !1;
		if ((hm || ym) && e == t) {
			let { node: e, offset: t } = o;
			if (Zp(e)) {
				if (u = !!(t && e.nodeValue[t - 1] == "\n"), u && t == e.nodeValue.length) for (let t = e, n; t; t = t.parentNode) {
					if (n = t.nextSibling) {
						n.nodeName == "BR" && (o = s = {
							node: n.parentNode,
							offset: Hp(n) + 1
						});
						break;
					}
					let e = t.pmViewDesc;
					if (e && e.node && e.node.isBlock) break;
				}
			} else {
				let n = e.childNodes[t - 1];
				u = n && (n.nodeName == "BR" || n.contentEditable == "false");
			}
		}
		if (hm && l.focusNode && l.focusNode != s.node && G(l.focusNode)) {
			let e = l.focusNode.childNodes[l.focusOffset];
			e && e.contentEditable == "false" && (r = !0);
		}
		if (!(r || u && ym) && qp(o.node, o.offset, l.anchorNode, l.anchorOffset) && qp(s.node, s.offset, l.focusNode, l.focusOffset)) return;
		let d = !1;
		if ((c.extend || e == t) && !(u && hm)) {
			c.collapse(o.node, o.offset);
			try {
				e != t && c.extend(s.node, s.offset), d = !0;
			} catch {}
		}
		if (!d) {
			if (e > t) {
				let e = o;
				o = s, s = e;
			}
			let n = document.createRange();
			n.setEnd(s.node, s.offset), n.setStart(o.node, o.offset), c.removeAllRanges(), c.addRange(n);
		}
	}
	ignoreMutation(e) {
		return !this.contentDOM && e.type != "selection";
	}
	get contentLost() {
		return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
	}
	markDirty(e, t) {
		for (let n = 0, r = 0; r < this.children.length; r++) {
			let i = this.children[r], a = n + i.size;
			if (n == a ? e <= a && t >= n : e < a && t > n) {
				let r = n + i.border, o = a - i.border;
				if (e >= r && t <= o) {
					this.dirty = e == n || t == a ? oh : ah, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = sh : i.markDirty(e - r, t - r);
					return;
				}
				i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? oh : sh;
			}
			n = a;
		}
		this.dirty = oh;
	}
	markParentsDirty() {
		let e = 1;
		for (let t = this.parent; t; t = t.parent, e++) {
			let n = e == 1 ? oh : ah;
			t.dirty < n && (t.dirty = n);
		}
	}
	get domAtom() {
		return !1;
	}
	get ignoreForCoords() {
		return !1;
	}
	get ignoreForSelection() {
		return !1;
	}
	isText(e) {
		return !1;
	}
}, lh = class extends ch {
	constructor(e, t, n, r) {
		let i, a = t.type.toDOM;
		if (typeof a == "function" && (a = a(n, () => {
			if (!i) return r;
			if (i.parent) return i.parent.posBeforeChild(i);
		})), !t.type.spec.raw) {
			let e = G(a) ? a : document.createElement("span");
			e != a && (e.appendChild(a), a = e), e.hasAttribute("contenteditable") || (e.contentEditable = "false"), e.classList.add("ProseMirror-widget");
		}
		super(e, [], a, null), this.widget = t, this.widget = t, i = this;
	}
	matchesWidget(e) {
		return this.dirty == ih && e.type.eq(this.widget.type);
	}
	parseRule() {
		return { ignore: !0 };
	}
	stopEvent(e) {
		let t = this.widget.spec.stopEvent;
		return t ? t(e) : !1;
	}
	ignoreMutation(e) {
		return e.type != "selection" || this.widget.spec.ignoreSelection;
	}
	destroy() {
		this.widget.type.destroy(this.dom), super.destroy();
	}
	get domAtom() {
		return !0;
	}
	get ignoreForSelection() {
		return !!this.widget.type.spec.relaxedSide;
	}
	get side() {
		return this.widget.type.side;
	}
}, uh = class extends ch {
	constructor(e, t, n, r) {
		super(e, [], t, null), this.textDOM = n, this.text = r;
	}
	get size() {
		return this.text.length;
	}
	localPosFromDOM(e, t) {
		return e == this.textDOM ? this.posAtStart + t : this.posAtStart + (t ? this.size : 0);
	}
	domFromPos(e) {
		return {
			node: this.textDOM,
			offset: e
		};
	}
	ignoreMutation(e) {
		return e.type === "characterData" && e.target.nodeValue == e.oldValue;
	}
}, dh = class e extends ch {
	constructor(e, t, n, r, i) {
		super(e, [], n, r), this.mark = t, this.spec = i;
	}
	static create(t, n, r, i) {
		let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
		return o && o.dom || (o = ad.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
	}
	parseRule() {
		return this.dirty & sh || this.mark.type.spec.reparseInView ? null : {
			mark: this.mark.type.name,
			attrs: this.mark.attrs,
			contentElement: this.contentDOM
		};
	}
	matchesMark(e) {
		return this.dirty != sh && this.mark.eq(e);
	}
	markDirty(e, t) {
		if (super.markDirty(e, t), this.dirty != ih) {
			let e = this.parent;
			for (; !e.node;) e = e.parent;
			e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = ih;
		}
	}
	slice(t, n, r) {
		let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
		n < o && (a = Mh(a, n, o, r)), t > 0 && (a = Mh(a, 0, t, r));
		for (let e = 0; e < a.length; e++) a[e].parent = i;
		return i.children = a, i;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
}, fh = class e extends ch {
	constructor(e, t, n, r, i, a, o) {
		super(e, [], i, a), this.node = t, this.outerDeco = n, this.innerDeco = r, this.nodeDOM = o;
	}
	static create(t, n, r, i, a, o) {
		let s = a.nodeViews[n.type.name], c, l = s && s(n, a, () => {
			if (!c) return o;
			if (c.parent) return c.parent.posBeforeChild(c);
		}, r, i), u = l && l.dom, d = l && l.contentDOM;
		if (n.isText) {
			if (!u) u = document.createTextNode(n.text);
			else if (!Zp(u)) throw RangeError("Text must be rendered as a DOM text node");
		} else if (!u) {
			let e = ad.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
			({dom: u, contentDOM: d} = e);
		}
		!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
		let f = u;
		return u = Ch(u, r, n), l ? c = new gh(t, n, r, i, u, d || null, f, l) : n.isText ? new mh(t, n, r, i, u, f) : new e(t, n, r, i, u, d || null, f);
	}
	parseRule(e) {
		if (this.node.type.spec.reparseInView) return null;
		let t = {
			node: this.node.type.name,
			attrs: this.node.attrs
		};
		if (this.node.type.whitespace == "pre" && (t.preserveWhitespace = "full"), !this.contentDOM) t.getContent = () => this.node.content;
		else if (!this.contentLost) t.contentElement = this.contentDOM;
		else {
			for (let e = this.children.length - 1; e >= 0; e--) {
				let n = this.children[e];
				if (this.dom.contains(n.dom.parentNode)) {
					t.contentElement = n.dom.parentNode;
					break;
				}
			}
			if (!t.contentElement) {
				let n = e && e.find((t) => G(t) && e.indexOf(t.parentNode) < 0 && this.dom.contains(t));
				n ? t.contentElement = n : t.getContent = () => R.empty;
			}
		}
		return t;
	}
	matchesNode(e, t, n) {
		return this.dirty == ih && e.eq(this.node) && wh(t, this.outerDeco) && n.eq(this.innerDeco);
	}
	get size() {
		return this.node.nodeSize;
	}
	get border() {
		return +!this.node.isLeaf;
	}
	updateChildren(e, t) {
		let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new Eh(this, a && a.node, e), c = this.node.inlineContent, l = c && this.node.isBlock;
		kh(this.node, this.innerDeco, (t, i, a) => {
			t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? z.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
		}, (t, a, u, d) => {
			s.syncToMarks(t.marks, n, e, d), l && t.isAtom && !t.isText && s.addHackNode("IMG", s.top);
			let f;
			s.findNodeMatch(t, a, u, d) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (f = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, u, f, e) || s.updateNextNode(t, a, u, e, d, r) || s.addNode(t, a, u, e, r), r += t.nodeSize, c && (l = t.isAtom && !t.isText);
		}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == oh) && (a && this.protectLocalComposition(e, a), _h(this.contentDOM, this.children, e), bm && Ah(this.dom));
	}
	localCompositionInfo(e, t) {
		let { from: n, to: r } = e.state.selection;
		if (!(e.state.selection instanceof H) || n < t || r > t + this.node.content.size) return null;
		let i = e.input.compositionNode;
		if (!i || !this.dom.contains(i.parentNode)) return null;
		if (this.node.inlineContent) {
			let e = i.nodeValue, a = jh(this.node.content, e, n - t, r - t);
			return a < 0 ? null : {
				node: i,
				pos: a,
				text: e
			};
		}
		return {
			node: i,
			pos: -1,
			text: ""
		};
	}
	protectLocalComposition(e, { node: t, pos: n, text: r }) {
		if (this.getDesc(t)) return;
		let i = t;
		for (; i.parentNode != this.contentDOM; i = i.parentNode) {
			for (; i.previousSibling;) i.parentNode.removeChild(i.previousSibling);
			for (; i.nextSibling;) i.parentNode.removeChild(i.nextSibling);
			i.pmViewDesc && (i.pmViewDesc = void 0);
		}
		let a = new uh(this, i, t, r);
		e.input.compositionNodes.push(a), this.children = Mh(this.children, n, n + r.length, e, a);
	}
	update(e, t, n, r) {
		return this.dirty == sh || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0);
	}
	updateInner(e, t, n, r) {
		this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = ih;
	}
	updateOuterDeco(e) {
		if (wh(e, this.outerDeco)) return;
		let t = !G(this.nodeDOM), n = this.dom;
		this.dom = xh(this.dom, this.nodeDOM, bh(this.outerDeco, this.node, t), bh(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
	}
	selectNode() {
		G(this.nodeDOM) && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
	}
	deselectNode() {
		G(this.nodeDOM) && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
	}
	get domAtom() {
		return this.node.isAtom;
	}
};
function ph(e, t, n, r, i) {
	Ch(r, t, e);
	let a = new fh(void 0, e, t, n, r, r, r);
	return a.contentDOM && a.updateChildren(i, 0), a;
}
var mh = class e extends fh {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, r, i, null, a);
	}
	parseRule() {
		let e = this.nodeDOM.parentNode;
		for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
		return { skip: e || !0 };
	}
	update(e, t, n, r) {
		return this.dirty == sh || this.dirty != ih && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != ih || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = ih, !0);
	}
	inParent() {
		let e = this.parent.contentDOM;
		for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
		return !1;
	}
	domFromPos(e) {
		return {
			node: this.nodeDOM,
			offset: e
		};
	}
	localPosFromDOM(e, t, n) {
		return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n);
	}
	ignoreMutation(e) {
		return e.type != "characterData" && e.type != "selection";
	}
	slice(t, n, r) {
		let i = this.node.cut(t, n), a = document.createTextNode(i.text);
		return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a);
	}
	markDirty(e, t) {
		super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = sh);
	}
	get domAtom() {
		return !1;
	}
	isText(e) {
		return this.node.text == e;
	}
}, hh = class extends ch {
	parseRule() {
		return { ignore: !0 };
	}
	matchesHack(e) {
		return this.dirty == ih && this.dom.nodeName == e;
	}
	get domAtom() {
		return !0;
	}
	get ignoreForCoords() {
		return this.dom.nodeName == "IMG";
	}
}, gh = class extends fh {
	constructor(e, t, n, r, i, a, o, s) {
		super(e, t, n, r, i, a, o), this.spec = s;
	}
	update(e, t, n, r) {
		if (this.dirty == sh) return !1;
		if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
			let i = this.spec.update(e, t, n);
			return i && this.updateInner(e, t, n, r), i;
		}
		return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, r);
	}
	selectNode() {
		this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
	}
	deselectNode() {
		this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
	}
	setSelection(e, t, n, r) {
		this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, r);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
	stopEvent(e) {
		return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
};
function _h(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = Th(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof dh) {
			let t = r ? r.previousSibling : e.lastChild;
			_h(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = Th(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
var vh = function(e) {
	e && (this.nodeName = e);
};
vh.prototype = Object.create(null);
var yh = [new vh()];
function bh(e, t, n) {
	if (e.length == 0) return yh;
	let r = n ? yh[0] : new vh(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new vh(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new vh(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function xh(e, t, n, r) {
	if (n == yh && r == yh) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName || (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = yh[0]), i = t;
		}
		Sh(i, o || yh[0], a);
	}
	return i;
}
function Sh(e, t, n) {
	for (let r in t) r != "class" && r != "style" && r != "nodeName" && !(r in n) && e.removeAttribute(r);
	for (let r in n) r != "class" && r != "style" && r != "nodeName" && n[r] != t[r] && e.setAttribute(r, n[r]);
	if (t.class != n.class) {
		let r = t.class ? t.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
		for (let t = 0; t < r.length; t++) i.indexOf(r[t]) == -1 && e.classList.remove(r[t]);
		for (let t = 0; t < i.length; t++) r.indexOf(i[t]) == -1 && e.classList.add(i[t]);
		e.classList.length == 0 && e.removeAttribute("class");
	}
	if (t.style != n.style) {
		if (t.style) {
			let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, r;
			for (; r = n.exec(t.style);) e.style.removeProperty(r[1]);
		}
		n.style && (e.style.cssText += n.style);
	}
}
function Ch(e, t, n) {
	return xh(e, e, yh, bh(t, n, !G(e)));
}
function wh(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function Th(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var Eh = class {
	constructor(e, t, n) {
		this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Dh(e.node.content, e);
	}
	destroyBetween(e, t) {
		if (e != t) {
			for (let n = e; n < t; n++) this.top.children[n].destroy();
			this.top.children.splice(e, t - e), this.changed = !0;
		}
	}
	destroyRest() {
		this.destroyBetween(this.index, this.top.children.length);
	}
	syncToMarks(e, t, n, r) {
		let i = 0, a = this.stack.length >> 1, o = Math.min(a, e.length);
		for (; i < o && (i == a - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1;) i++;
		for (; i < a;) this.destroyRest(), this.top.dirty = ih, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
		for (; a < e.length;) {
			this.stack.push(this.top, this.index + 1);
			let i = -1, o = this.top.children.length;
			r < this.preMatch.index && (o = Math.min(this.index + 3, o));
			for (let t = this.index; t < o; t++) {
				let n = this.top.children[t];
				if (n.matchesMark(e[a]) && !this.isLocked(n.dom)) {
					i = t;
					break;
				}
			}
			if (i < 0 && this.index < this.top.children.length) {
				let t = this.top.children[this.index];
				t instanceof dh && t.dirty != sh && t.mark.type == e[a].type && t.spec.update && !this.isLocked(t.dom) && t.spec.update(e[a]) && (t.mark = e[a], i = this.index, this.changed = !0);
			}
			if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
			else {
				let r = dh.create(this.top, e[a], t, n);
				this.top.children.splice(this.index, 0, r), this.top = r, this.changed = !0;
			}
			this.index = 0, a++;
		}
	}
	findNodeMatch(e, t, n, r) {
		let i = -1, a;
		if (r >= this.preMatch.index && (a = this.preMatch.matches[r - this.preMatch.index]).parent == this.top && a.matchesNode(e, t, n)) i = this.top.children.indexOf(a, this.index);
		else for (let r = this.index, a = Math.min(this.top.children.length, r + 5); r < a; r++) {
			let a = this.top.children[r];
			if (a.matchesNode(e, t, n) && !this.preMatch.matched.has(a)) {
				i = r;
				break;
			}
		}
		return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
	}
	updateNodeAt(e, t, n, r, i) {
		let a = this.top.children[r];
		return a.dirty == sh && a.dom == a.contentDOM && (a.dirty = oh), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
	}
	findIndexWithChild(e) {
		for (;;) {
			let t = e.parentNode;
			if (!t) return -1;
			if (t == this.top.contentDOM) {
				let t = e.pmViewDesc;
				if (t) {
					for (let e = this.index; e < this.top.children.length; e++) if (this.top.children[e] == t) return e;
				}
				return -1;
			}
			e = t;
		}
	}
	updateNextNode(e, t, n, r, i, a) {
		for (let o = this.index; o < this.top.children.length; o++) {
			let s = this.top.children[o];
			if (s instanceof fh) {
				let c = this.preMatch.matched.get(s);
				if (c != null && c != i) return !1;
				let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != sh && wh(t, s.outerDeco));
				if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
				if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = oh, u.updateChildren(r, a + 1), u.dirty = ih), this.changed = !0, this.index++, !0;
				break;
			}
		}
		return !1;
	}
	recreateWrapper(e, t, n, r, i, a) {
		if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !wh(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
		let o = fh.create(this.top, t, n, r, i, a);
		if (o.contentDOM) {
			o.children = e.children, e.children = [];
			for (let e of o.children) e.parent = o;
		}
		return e.destroy(), o;
	}
	addNode(e, t, n, r, i) {
		let a = fh.create(this.top, e, t, n, r, i);
		a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
	}
	placeWidget(e, t, n) {
		let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
		if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
		else {
			let r = new lh(this.top, e, t, n);
			this.top.children.splice(this.index++, 0, r), this.changed = !0;
		}
	}
	addTextblockHacks() {
		let e = this.top.children[this.index - 1], t = this.top;
		for (; e instanceof dh;) t = e, e = t.children[t.children.length - 1];
		(!e || !(e instanceof mh) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((ym || _m) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
	}
	addHackNode(e, t) {
		if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
		else {
			let n = document.createElement(e);
			e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
			let r = new hh(this.top, [], n, null);
			t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
		}
	}
	isLocked(e) {
		return this.lock && (e == this.lock || G(e) && e.contains(this.lock.parentNode));
	}
};
function Dh(e, t) {
	let n = t, r = n.children.length, i = e.childCount, a = /* @__PURE__ */ new Map(), o = [];
	outer: for (; i > 0;) {
		let s;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof dh) n = e, r = e.children.length;
			else {
				s = e, r--;
				break;
			}
		} else if (n == t) break outer;
		else r = n.parent.children.indexOf(n), n = n.parent;
		let c = s.node;
		if (c) {
			if (c != e.child(i - 1)) break;
			--i, a.set(s, i), o.push(s);
		}
	}
	return {
		index: i,
		matched: a,
		matches: o.reverse()
	};
}
function Oh(e, t) {
	return e.type.side - t.type.side;
}
function kh(e, t, n, r) {
	let i = t.locals(e), a = 0;
	if (i.length == 0) {
		for (let n = 0; n < e.childCount; n++) {
			let o = e.child(n);
			r(o, i, t.forChild(a, o), n), a += o.nodeSize;
		}
		return;
	}
	let o = 0, s = [], c = null;
	for (let l = 0;;) {
		let u, d;
		for (; o < i.length && i[o].to == a;) {
			let e = i[o++];
			e.widget && (u ? (d ||= [u]).push(e) : u = e);
		}
		if (u) {
			if (d) {
				d.sort(Oh);
				for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
			} else n(u, l, !!c);
		}
		let f, p;
		if (c) p = -1, f = c, c = null;
		else if (l < e.childCount) p = l, f = e.child(l++);
		else break;
		for (let e = 0; e < s.length; e++) s[e].to <= a && s.splice(e--, 1);
		for (; o < i.length && i[o].from <= a && i[o].to > a;) s.push(i[o++]);
		let m = a + f.nodeSize;
		if (f.isText) {
			let e = m;
			o < i.length && i[o].from < e && (e = i[o].from);
			for (let t = 0; t < s.length; t++) s[t].to < e && (e = s[t].to);
			e < m && (c = f.cut(e - a), f = f.cut(0, e - a), m = e, p = -1);
		} else for (; o < i.length && i[o].to < m;) o++;
		let h = f.isInline && !f.isLeaf ? s.filter((e) => !e.inline) : s.slice();
		r(f, h, t.forChild(a, f), p), a = m;
	}
}
function Ah(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function jh(e, t, n, r) {
	for (let i = 0, a = 0; i < e.childCount && a <= r;) {
		let o = e.child(i++), s = a;
		if (a += o.nodeSize, !o.isText) continue;
		let c = o.text;
		for (; i < e.childCount;) {
			let t = e.child(i++);
			if (a += t.nodeSize, !t.isText) break;
			c += t.text;
		}
		if (a >= n) {
			if (a >= r && c.slice(r - t.length - s, r - s) == t) return r - t.length;
			let e = s < r ? c.lastIndexOf(t, r - s - 1) : -1;
			if (e >= 0 && e + t.length + s >= n) return s + e;
			if (n == r && c.length >= r + t.length - s && c.slice(r - s, r - s + t.length) == t) return r;
		}
	}
	return -1;
}
function Mh(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function Nh(e, t = null) {
	let n = e.domSelectionRange(), r = e.state.doc;
	if (!n.focusNode) return null;
	let i = e.docView.nearestDesc(n.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if (rm(n)) {
		for (c = o; i && !i.node;) i = i.parent;
		if (i && i.node.isAtom && U.isSelectable(i.node) && i.parent && !(i.node.isInline && tm(n.focusNode, n.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new U(o == e ? s : r.resolve(e));
		} else if (hm && t == "key" && o > e.state.selection.to && G(n.focusNode) && n.focusOffset == n.focusNode.childNodes.length && i && i.posAtStart > e.state.selection.to) for (let e = n.focusNode;; e = e.parentNode) {
			if (getComputedStyle(e).overflow != "visible") {
				l = V.findFrom(r.resolve(i.posAtStart), 1);
				break;
			}
			if (e == i.dom || e.nextSibling || !e.parentNode || !G(e.parentNode)) break;
		}
	} else {
		if (n instanceof e.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
			let t = o, i = o;
			for (let r = 0; r < n.rangeCount; r++) {
				let a = n.getRangeAt(r);
				t = Math.min(t, e.docView.posFromDOM(a.startContainer, a.startOffset, 1)), i = Math.max(i, e.docView.posFromDOM(a.endContainer, a.endOffset, -1));
			}
			if (t < 0) return null;
			[c, o] = i == e.state.selection.anchor ? [i, t] : [t, i], s = r.resolve(o);
		} else c = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
		if (c < 0) return null;
	}
	let u = r.resolve(c);
	if (!l) {
		let n = t == "pointer" || e.state.selection.head < s.pos && !a ? 1 : -1;
		l = Wh(e, u, s, n);
	}
	return l;
}
function Ph(e) {
	return e.editable ? e.hasFocus() : Kh(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Fh(e, t = !1) {
	let n = e.state.selection;
	if (Hh(e, n), !Ph(e)) return;
	let r = e.input.mouseDown;
	if (!t && _m && r) {
		let t = e.domSelectionRange(), n = e.domObserver.currentSelection;
		if (t.anchorNode && n.anchorNode && qp(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset) && r.delaySelUpdate()) {
			e.domObserver.setCurSelection();
			return;
		}
	}
	if (e.domObserver.disconnectSelection(), e.cursorWrapper) Vh(e);
	else {
		let { anchor: r, head: i } = n, a, o;
		Ih && !(n instanceof H) && (n.$from.parent.inlineContent || (a = Lh(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = Lh(e, n.to))), e.docView.setSelection(r, i, e, t), Ih && (a && zh(a), o && zh(o)), n.visible ? e.dom.classList.remove("ProseMirror-hideselection") : (e.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Bh(e));
	}
	e.domObserver.setCurSelection(), e.domObserver.connectSelection();
}
var Ih = ym || _m && vm < 63;
function Lh(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (ym && i && i.contentEditable == "false") return Rh(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return Rh(i);
		if (a) return Rh(a);
	}
}
function Rh(e) {
	return e.contentEditable = "true", ym && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function zh(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function Bh(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Ph(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function Vh(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom, r = n.nodeName == "IMG";
	r ? t.collapse(n.parentNode, Hp(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && pm && mm <= 11 && (n.disabled = !0, n.disabled = !1);
}
function Hh(e, t) {
	if (t instanceof U) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && (Uh(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else Uh(e);
}
function Uh(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function Wh(e, t, n, r) {
	return e.someProp("createSelectionBetween", (r) => r(e, t, n)) || H.between(t, n, r);
}
function Gh(e) {
	return e.editable && !e.hasFocus() ? !1 : Kh(e);
}
function Kh(e) {
	let t = e.domSelectionRange();
	if (!t.anchorNode) return !1;
	try {
		return Qp(e.dom, t.anchorNode) && (e.editable || Qp(e.dom, t.focusNode));
	} catch {
		return !1;
	}
}
function qh(e) {
	let t = e.docView.domFromPos(e.state.selection.anchor, 0), n = e.domSelectionRange();
	return qp(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function Jh(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && V.findFrom(a, t);
}
function Yh(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function Xh(e, t, n) {
	let r = e.state.selection;
	if (r instanceof H) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return Yh(e, new H(r.$anchor, a));
		}
		if (!r.empty) return !1;
		if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = Jh(e.state, t);
			return n && n instanceof U ? Yh(e, n) : !1;
		}
		if (!xm || n.indexOf("m") < 0) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? U.isSelectable(i) ? Yh(e, new U(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : Yh(e, new H(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1;
		}
	} else if (r instanceof U && r.node.isInline) return Yh(e, new H(t > 0 ? r.$to : r.$from));
	else {
		let n = Jh(e.state, t);
		return n ? Yh(e, n) : !1;
	}
}
function Zh(e, t) {
	let n = e.pmViewDesc;
	return n ? n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR") : G(e) && e.contentEditable == "false";
}
function Qh(e, t) {
	return t < 0 ? $h(e) : eg(e);
}
function $h(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (hm && G(n) && r < Xp(n) && Zh(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (!G(n)) break;
		let e = n.childNodes[r - 1];
		if (Zh(e, -1)) i = n, a = --r;
		else if (Zp(e)) n = e, r = n.nodeValue.length;
		else break;
	} else if (tg(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && Zh(t, -1);) i = n.parentNode, a = Hp(t), t = t.previousSibling;
		if (t) n = t, r = Xp(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? ig(e, n, r) : i && ig(e, i, a);
}
function eg(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = Xp(n), a, o;
	for (;;) if (r < i) {
		if (!G(n)) break;
		let e = n.childNodes[r];
		if (Zh(e, 1)) a = n, o = ++r;
		else break;
	} else if (tg(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && Zh(t, 1);) a = t.parentNode, o = Hp(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = Xp(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && ig(e, a, o);
}
function tg(e) {
	let t = e.pmViewDesc;
	return t && t.node && t.node.isBlock;
}
function ng(e, t) {
	for (; e && t == e.childNodes.length && !nm(e);) t = Hp(e) + 1, e = e.parentNode;
	for (; e && t < e.childNodes.length;) {
		let n = e.childNodes[t];
		if (Zp(n)) return n;
		if (G(n) && n.contentEditable == "false") break;
		e = n, t = 0;
	}
}
function rg(e, t) {
	for (; e && !t && !nm(e);) t = Hp(e), e = e.parentNode;
	for (; e && t;) {
		let n = e.childNodes[t - 1];
		if (Zp(n)) return n;
		if (G(n) && n.contentEditable == "false") break;
		e = n, t = e.childNodes.length;
	}
}
function ig(e, t, n) {
	if (!Zp(t)) {
		let e, r;
		(r = ng(t, n)) ? (t = r, n = 0) : (e = rg(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection(), i = e.domSelectionRange();
	if (!r) return;
	rm(i) ? r.collapse(t, n) : r.extend && (r.collapse(i.anchorNode, i.anchorOffset), r.extend(t, n)), e.domObserver.setCurSelection();
	let { state: a } = e;
	setTimeout(() => {
		e.state == a && Fh(e);
	}, 50);
}
function ag(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(_m || Sm) && n.parent.inlineContent) {
		let r = e.coordsAtPos(t);
		if (t > n.start()) {
			let n = e.coordsAtPos(t - 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left < r.left ? "ltr" : "rtl";
		}
		if (t < n.end()) {
			let n = e.coordsAtPos(t + 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left > r.left ? "ltr" : "rtl";
		}
	}
	let r = e.dom;
	for (let t = n.depth; t > 0; t--) if (n.node(t).isBlock) {
		r = e.nodeDOM(n.before(t)) || r;
		break;
	}
	return getComputedStyle(r).direction == "rtl" ? "rtl" : "ltr";
}
function og(e, t, n) {
	let r = e.state.selection;
	if (r instanceof H && !r.empty || n.indexOf("s") > -1 || xm && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = Jh(e.state, t);
		if (n && n instanceof U) return Yh(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Ff ? V.near(n, t) : V.findFrom(n, t);
		return o ? Yh(e, o) : !1;
	}
	return !1;
}
function sg(e, t) {
	if (!(e.state.selection instanceof H)) return !0;
	let { $head: n, $anchor: r, empty: i } = e.state.selection;
	if (!n.sameParent(r)) return !0;
	if (!i) return !1;
	if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
	let a = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
	if (a && !a.isText) {
		let r = e.state.tr;
		return t < 0 ? r.delete(n.pos - a.nodeSize, n.pos) : r.delete(n.pos, n.pos + a.nodeSize), e.dispatch(r), !0;
	}
	return !1;
}
function cg(e, t, n) {
	e.domObserver.stop(), t.contentEditable = n, e.domObserver.start();
}
function lg(e) {
	if (!ym || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (t && G(t) && n == 0 && t.firstChild && G(t.firstChild) && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		cg(e, n, "true"), setTimeout(() => cg(e, n, "false"), 20);
	}
	return !1;
}
function ug(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function dg(e, t) {
	let n = t.keyCode, r = ug(t);
	if (n == 8 || xm && n == 72 && r == "c") return sg(e, -1) || Qh(e, -1);
	if (n == 46 && !t.shiftKey || xm && n == 68 && r == "c") return sg(e, 1) || Qh(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || xm && n == 66 && r == "c") {
		let t = n == 37 ? ag(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return Xh(e, t, r) || Qh(e, t);
	}
	if (n == 39 || xm && n == 70 && r == "c") {
		let t = n == 39 ? ag(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return Xh(e, t, r) || Qh(e, t);
	}
	return n == 38 || xm && n == 80 && r == "c" ? og(e, -1, r) || Qh(e, -1) : n == 40 || xm && n == 78 && r == "c" ? lg(e) || og(e, 1, r) || Qh(e, 1) : !(r != (xm ? "m" : "c") || n != 66 && n != 73 && n != 89 && n != 90);
}
function fg(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || ad.fromSchema(e.state.schema), s = Sg(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && G(l) && (u = xg[l.nodeName.toLowerCase()]);) {
		for (let e = u.length - 1; e >= 0; e--) {
			let t = s.createElement(u[e]);
			for (; c.firstChild;) t.appendChild(c.firstChild);
			c.appendChild(t), d++;
		}
		l = c.firstChild;
	}
	return l && G(l) && l.setAttribute("data-pm-slice", `${i} ${a}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`), {
		dom: c,
		text: e.someProp("clipboardTextSerializer", (n) => n(t, e)) || t.content.textBetween(0, t.content.size, "\n\n"),
		slice: t
	};
}
function pg(e, t, n, r, i) {
	let a = i.parent.type.spec.code, o, s;
	if (!n && !t) return null;
	let c = !!t && (r || a || !n);
	if (c) {
		if (e.someProp("transformPastedText", (n) => {
			t = n(t, a || r, e);
		}), a) return s = new B(R.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0), e.someProp("transformPasted", (t) => {
			s = t(s, e, !0);
		}), s;
		let n = e.someProp("clipboardTextParser", (n) => n(t, i, r, e));
		if (n) s = n;
		else {
			let n = i.marks(), { schema: r } = e.state, a = ad.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = Tg(n), wm && Eg(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && !G(e);) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || Gu.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !mg.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = Dg(bg(s, +u[1], +u[2]), u[4]);
	else if (s = B.maxOpen(hg(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = bg(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, c);
	}), s;
}
var mg = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function hg(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && _g(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = vg(a[a.length - 1], i.length));
				let n = gg(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return R.from(a);
	}
	return e;
}
function gg(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, R.from(e));
	return e;
}
function _g(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = _g(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(R.from(gg(n, e, i + 1))));
	}
}
function vg(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, vg(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(R.empty, !0);
	return e.copy(n.append(r));
}
function yg(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = yg(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(R.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function bg(e, t, n) {
	return t < e.openStart && (e = new B(yg(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new B(yg(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
var xg = {
	thead: ["table"],
	tbody: ["table"],
	tfoot: ["table"],
	caption: ["table"],
	colgroup: ["table"],
	col: ["table", "colgroup"],
	tr: ["table", "tbody"],
	td: [
		"table",
		"tbody",
		"tr"
	],
	th: [
		"table",
		"tbody",
		"tr"
	]
};
function Sg() {
	return document.implementation.createHTMLDocument("title");
}
var Cg = null;
function wg(e) {
	let t = window.trustedTypes;
	if (!t) return e;
	if (!Cg) {
		if (Cg = t.defaultPolicy) try {
			return Cg.createHTML(e);
		} catch {}
		Cg = t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e });
	}
	return Cg.createHTML(e);
}
function Tg(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = Sg(), r = n.body, i = /<([a-z][^>\s]+)/i.exec(e), a;
	if ((a = i && xg[i[1].toLowerCase()]) && (e = a.map((e) => "<" + e + ">").join("") + e + a.map((e) => "</" + e + ">").reverse().join("")), r.innerHTML = wg(e), a) for (let e = 0; e < a.length; e++) r = r.querySelector(a[e]) || r;
	for (let e = 0; e < n.styleSheets.length; e++) {
		let t = n.styleSheets[e];
		for (let e = 0; e < t.rules.length; e++) {
			let n = t.rules[e];
			if (n instanceof CSSStyleRule) {
				let e = r.querySelectorAll(n.selectorText);
				for (let t = 0; t < e.length; t++) e[t].style.cssText += n.style.cssText;
			}
		}
	}
	return r;
}
function Eg(e) {
	let t = e.querySelectorAll(_m ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function Dg(e, t) {
	if (!e.size) return e;
	let n = e.content.firstChild.type.schema, r;
	try {
		r = JSON.parse(t);
	} catch {
		return e;
	}
	let { content: i, openStart: a, openEnd: o } = e;
	for (let e = r.length - 2; e >= 0; e -= 2) {
		let t = n.nodes[r[e]];
		if (!t || t.hasRequiredAttrs()) break;
		try {
			i = R.from(t.create(r[e + 1], i));
		} catch {
			break;
		}
		a++, o++;
	}
	return new B(i, a, o);
}
var Og = {}, kg = {}, Ag = {
	touchstart: !0,
	touchmove: !0
}, jg = class {
	constructor() {
		this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = {
			time: 0,
			x: 0,
			y: 0,
			type: "",
			button: 0
		}, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = Object.create(null), this.hideSelectionGuard = null;
	}
};
function Mg(e) {
	for (let t in Og) {
		let n = Og[t];
		e.dom.addEventListener(t, e.input.eventHandlers[t] = (t) => {
			Lg(e, t) && !Ig(e, t) && (e.editable || !(t.type in kg)) && n(e, t);
		}, Ag[t] ? { passive: !0 } : void 0);
	}
	ym && e.dom.addEventListener("input", () => null), Fg(e);
}
function Ng(e, t) {
	e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now();
}
function Pg(e) {
	e.input.mouseDown && e.input.mouseDown.done(), e.domObserver.stop();
	for (let t in e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
	clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function Fg(e) {
	e.someProp("handleDOMEvents", (t) => {
		for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = (t) => Ig(e, t));
	});
}
function Ig(e, t) {
	return e.someProp("handleDOMEvents", (n) => {
		let r = n[t.type];
		return r ? r(e, t) || t.defaultPrevented : !1;
	});
}
function Lg(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target; n != e.dom; n = n.parentNode) if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
	return !0;
}
function Rg(e, t) {
	!Ig(e, t) && Og[t.type] && (e.editable || !(t.type in kg)) && Og[t.type](e, t);
}
kg.keydown = (e, t) => {
	let n = t;
	if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !t_(e) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), !(Cm && _m && n.keyCode == 13))) {
		if (n.keyCode != 229 && e.domObserver.forceFlush(), bm && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
			let t = Date.now();
			e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
				e.input.lastIOSEnter == t && (e.someProp("handleKeyDown", (t) => t(e, im(13, "Enter"))), e.input.lastIOSEnter = 0);
			}, 200);
		} else e.someProp("handleKeyDown", (t) => t(e, n)) || dg(e, n) ? n.preventDefault() : Ng(e, "key");
	}
}, kg.keyup = (e, t) => {
	t.keyCode == 16 && (e.input.shiftKey = !1);
}, kg.keypress = (e, t) => {
	let n = t;
	if (t_(e) || !n.charCode || n.ctrlKey && !n.altKey || xm && n.metaKey) return;
	if (e.someProp("handleKeyPress", (t) => t(e, n))) {
		n.preventDefault();
		return;
	}
	let r = e.state.selection;
	if (!(r instanceof H) || !r.$from.sameParent(r.$to)) {
		let t = String.fromCharCode(n.charCode), i = () => e.state.tr.insertText(t).scrollIntoView();
		!/[\r\n]/.test(t) && !e.someProp("handleTextInput", (n) => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault();
	}
};
function zg(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Bg(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function Vg(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function Hg(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	r.setMeta("pointer", !0), e.dispatch(r);
}
function Ug(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && U.isSelectable(r) ? (Hg(e, new U(n)), !0) : !1;
}
function Wg(e, t) {
	if (t == -1) return !1;
	let n = e.state.selection, r, i;
	n instanceof U && (r = n.node);
	let a = e.state.doc.resolve(t);
	for (let e = a.depth + 1; e > 0; e--) {
		let t = e > a.depth ? a.nodeAfter : a.node(e);
		if (U.isSelectable(t)) {
			i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
			break;
		}
	}
	return i != null && (Hg(e, U.create(e.state.doc, i)), !0);
}
function Gg(e, t, n, r, i) {
	return Vg(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? Wg(e, n) : Ug(e, n));
}
function Kg(e, t, n, r) {
	return Vg(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function qg(e, t, n, r) {
	return Vg(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r)) || Jg(e, n, r);
}
function Jg(e, t, n) {
	if (n.button != 0) return !1;
	let r = Yg(e, t, !0), i = e.state.doc;
	return r ? (Hg(e, r), r instanceof H && i.eq(e.state.doc) && (e.input.mouseDown = new e_(e, r)), !0) : !1;
}
function Yg(e, t, n) {
	let r = e.state.doc;
	if (t == -1) return r.inlineContent ? H.create(r, 0, r.content.size) : null;
	let i = r.resolve(t);
	for (let e = i.depth + 1; e > 0; e--) {
		let t = e > i.depth ? i.nodeAfter : i.node(e), a = i.before(e);
		if (t.inlineContent) return H.create(r, a + 1, a + 1 + t.content.size);
		if (n && U.isSelectable(t)) return U.create(r, a);
	}
	return null;
}
function Xg(e) {
	return s_(e);
}
var Zg = xm ? "metaKey" : "ctrlKey";
Og.mousedown = (e, t) => {
	let n = t;
	e.input.shiftKey = n.shiftKey;
	let r = Xg(e), i = Date.now(), a = "singleClick";
	i - e.input.lastClick.time < 500 && Bg(n, e.input.lastClick) && !n[Zg] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? a = "doubleClick" : e.input.lastClick.type == "doubleClick" && (a = "tripleClick")), e.input.lastClick = {
		time: i,
		x: n.clientX,
		y: n.clientY,
		type: a,
		button: n.button
	}, e.input.mouseDown && e.input.mouseDown.done();
	let o = e.posAtCoords(zg(n));
	o && (a == "singleClick" ? e.input.mouseDown = new $g(e, o, n, !!r) : (a == "doubleClick" ? Kg : qg)(e, o.pos, o.inside, n) ? n.preventDefault() : Ng(e, "pointer"));
};
var Qg = class {
	constructor(e) {
		this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
	}
	up(e) {
		this.done();
	}
	move(e) {
		e.buttons == 0 && this.done();
	}
	done() {
		this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
	}
	delaySelUpdate() {
		return !1;
	}
}, $g = class extends Qg {
	constructor(e, t, n, r) {
		super(e), this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!n[Zg], this.allowDefault = n.shiftKey;
		let i, a;
		if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
		else {
			let n = e.state.doc.resolve(t.pos);
			i = n.parent, a = n.depth ? n.before() : 0;
		}
		let o = r ? null : n.target, s = o ? e.docView.nearestDesc(o, !0) : null;
		this.target = s && G(s.nodeDOM) ? s.nodeDOM : null;
		let { selection: c } = e.state;
		n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof U && c.from <= a && c.to > a) && (this.mightDrag = {
			node: i,
			pos: a,
			addAttr: !(!this.target || this.target.draggable),
			setUneditable: !!(this.target && hm && !this.target.hasAttribute("contentEditable"))
		}), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
			this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
		}, 20), this.view.domObserver.start()), Ng(e, "pointer");
	}
	done() {
		super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
			this.view.isDestroyed || Fh(this.view);
		});
	}
	up(e) {
		if (this.done(), !this.view.dom.contains(e.target)) return;
		let t = this.pos;
		this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(zg(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Ng(this.view, "pointer") : Gg(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || ym && this.mightDrag && !this.mightDrag.node.isAtom || _m && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Hg(this.view, V.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Ng(this.view, "pointer");
	}
	move(e) {
		this.updateAllowDefault(e), Ng(this.view, "pointer"), super.move(e);
	}
	updateAllowDefault(e) {
		!this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
	}
	delaySelUpdate() {
		return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
	}
}, e_ = class extends Qg {
	constructor(e, t) {
		super(e), this.startSelection = t, this.startDoc = e.state.doc;
	}
	move(e) {
		if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
			this.done();
			return;
		}
		e.preventDefault(), Ng(this.view, "pointer");
		let t = this.view.posAtCoords(zg(e)), n = t && Yg(this.view, t.inside, !1);
		if (!n) return;
		let { doc: r } = this.view.state, i = this.startSelection, [a, o] = n.from < i.from ? [i.to, n.from] : [i.from, n.to];
		Hg(this.view, H.create(r, a, o));
	}
};
Og.touchstart = (e) => {
	e.input.lastTouch = Date.now(), Xg(e), Ng(e, "pointer");
}, Og.touchmove = (e) => {
	e.input.lastTouch = Date.now(), Ng(e, "pointer");
}, Og.contextmenu = (e) => Xg(e);
function t_(e, t) {
	return e.composing ? !0 : ym && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
var n_ = Cm ? 5e3 : -1;
kg.compositionstart = kg.compositionupdate = (e) => {
	if (!e.composing) {
		e.domObserver.flush();
		let { state: t } = e, n = t.selection.$to;
		if (t.selection instanceof H && t.selection.empty && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || _m && Sm && r_(e))) e.markCursor = e.state.storedMarks || n.marks(), s_(e, !0), e.markCursor = null;
		else if (s_(e, !t.selection.empty), hm && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
			let t = e.domSelectionRange();
			for (let n = t.focusNode, r = t.focusOffset; n && G(n) && r != 0;) {
				let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
				if (!t) break;
				if (Zp(t)) {
					let n = e.domSelection();
					n && n.collapse(t, t.nodeValue.length);
					break;
				}
				n = t, r = -1;
			}
		}
		e.input.composing = !0;
	}
	i_(e, n_);
};
function r_(e) {
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (!t || !G(t) || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return G(r) && r.contentEditable == "false";
}
kg.compositionend = (e, t) => {
	e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, i_(e, 20));
};
function i_(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => s_(e), t));
}
function a_(e) {
	for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty();
}
function o_(e) {
	let t = e.domSelectionRange();
	if (!t.focusNode) return null;
	let n = $p(t.focusNode, t.focusOffset), r = em(t.focusNode, t.focusOffset);
	if (n && r && n != r) {
		let t = r.pmViewDesc, i = e.domObserver.lastChangedTextNode;
		if (n == i || r == i) return i;
		if (!t || !t.isText(r.nodeValue)) return r;
		if (e.input.compositionNode == r) {
			let e = n.pmViewDesc;
			if (e && e.isText(n.nodeValue)) return r;
		}
	}
	return n || r;
}
function s_(e, t = !1) {
	if (!(Cm && e.domObserver.flushingSoon >= 0)) {
		if (e.domObserver.forceFlush(), a_(e), t || e.docView && e.docView.dirty) {
			let n = Nh(e), r = e.state.selection;
			return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0;
		}
		return !1;
	}
}
function c_(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
var l_ = pm && mm < 15 || bm && Tm < 604;
Og.copy = kg.cut = (e, t) => {
	let n = t, r = e.state.selection, i = n.type == "cut";
	if (r.empty) return;
	let a = l_ ? null : n.clipboardData, { dom: o, text: s } = fg(e, r.content());
	a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : c_(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function u_(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function d_(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? f_(e, r.value, null, i, t) : f_(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function f_(e, t, n, r, i) {
	let a = pg(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || B.empty))) return !0;
	if (!a) return !1;
	let o = u_(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function p_(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
kg.paste = (e, t) => {
	let n = t;
	if (e.composing && !Cm) return;
	let r = l_ ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
	r && f_(e, p_(r), r.getData("text/html"), i, n) ? n.preventDefault() : d_(e, n);
};
var m_ = class {
	constructor(e, t, n) {
		this.slice = e, this.move = t, this.node = n;
	}
}, h_ = xm ? "altKey" : "ctrlKey";
function g_(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[h_] : !n;
}
Og.dragstart = (e, t) => {
	let n = t, r = e.input.mouseDown;
	if (r && r.done(), !n.dataTransfer) return;
	let i = e.state.selection, a = i.empty ? null : e.posAtCoords(zg(n)), o;
	if (!(a && a.pos >= i.from && a.pos <= (i instanceof U ? i.to - 1 : i.to))) {
		if (r && r.mightDrag) o = U.create(e.state.doc, r.mightDrag.pos);
		else if (n.target && G(n.target)) {
			let t = e.docView.nearestDesc(n.target, !0);
			t && t.node.type.spec.draggable && t != e.docView && (o = U.create(e.state.doc, t.posBefore));
		}
	}
	let { dom: s, text: c, slice: l } = fg(e, (o || e.state.selection).content());
	(!n.dataTransfer.files.length || !_m || vm > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(l_ ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", l_ || n.dataTransfer.setData("text/plain", c), e.dragging = new m_(l, g_(e, n), o);
}, Og.dragend = (e) => {
	let t = e.dragging;
	window.setTimeout(() => {
		e.dragging == t && (e.dragging = null);
	}, 50);
}, kg.dragover = kg.dragenter = (e, t) => t.preventDefault(), kg.drop = (e, t) => {
	try {
		__(e, t, e.dragging);
	} finally {
		e.dragging = null;
	}
};
function __(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(zg(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = pg(e, p_(t.dataTransfer), l_ ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && g_(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || B.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? cf(e.state.doc, i.pos, a) : i.pos;
	s ??= i.pos;
	let c = e.state.tr;
	if (o) {
		let { node: e } = n;
		e ? e.replace(c) : c.deleteSelection();
	}
	let l = c.mapping.map(s), u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1, d = c.doc;
	if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
	let f = c.doc.resolve(l);
	if (u && U.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new U(f));
	else {
		let t = c.mapping.map(s);
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(Wh(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
Og.focus = (e) => {
	e.input.lastFocus = Date.now(), e.focused || (e.domObserver.stop(), e.dom.classList.add("ProseMirror-focused"), e.domObserver.start(), e.focused = !0, setTimeout(() => {
		e.docView && e.hasFocus() && !e.domObserver.currentSelection.eq(e.domSelectionRange()) && Fh(e);
	}, 20));
}, Og.blur = (e, t) => {
	let n = t;
	e.focused &&= (e.domObserver.stop(), e.dom.classList.remove("ProseMirror-focused"), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1);
}, Og.beforeinput = (e, t) => {
	if (Cm && t.inputType == "deleteContentBackward") {
		e.domObserver.flushSoon();
		let { domChangeCount: t } = e.input;
		setTimeout(() => {
			if (e.input.domChangeCount != t || (e.dom.blur(), e.focus(), e.someProp("handleKeyDown", (t) => t(e, im(8, "Backspace"))))) return;
			let { $cursor: n } = e.state.selection;
			n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
		}, 50);
	}
};
for (let e in kg) Og[e] = kg[e];
function v_(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
var y_ = class {
	constructor(e) {
		this.frag = e, this.index = 0, this.off = 0;
	}
	nodeAt(e) {
		for (; this.off <= e && this.index < this.frag.childCount;) {
			let t = this.frag.child(this.index);
			if (this.off == e) return t;
			this.off += t.nodeSize, this.index++;
		}
		return null;
	}
}, b_ = class e {
	constructor(e, t) {
		this.toDOM = e, this.spec = t || T_, this.side = this.spec.side || 0;
	}
	map(e, t, n, r) {
		let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
		return a ? null : new C_(i - n, i - n, this);
	}
	valid() {
		return !0;
	}
	eq(t) {
		return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && v_(this.spec, t.spec));
	}
	destroy(e) {
		this.spec.destroy && this.spec.destroy(e);
	}
}, x_ = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || T_;
	}
	map(e, t, n, r) {
		let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
		return i >= a ? null : new C_(i, a, this);
	}
	valid(e, t) {
		return t.from < t.to;
	}
	eq(t) {
		return this == t || t instanceof e && v_(this.attrs, t.attrs) && v_(this.spec, t.spec);
	}
	static is(t) {
		return t.type instanceof e;
	}
	destroy() {}
}, S_ = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || T_;
	}
	map(e, t, n, r) {
		let i = e.mapResult(t.from + r, 1);
		if (i.deleted) return null;
		let a = e.mapResult(t.to + r, -1);
		return a.deleted || a.pos <= i.pos ? null : new C_(i.pos - n, a.pos - n, this);
	}
	valid(e, t, n) {
		let r = n.nodeAt(t.from);
		return !!r && !r.isText && t.from + r.nodeSize == t.to;
	}
	eq(t) {
		return this == t || t instanceof e && v_(this.attrs, t.attrs) && v_(this.spec, t.spec);
	}
	destroy() {}
}, C_ = class e {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.type = n;
	}
	copy(t, n) {
		return new e(t, n, this.type);
	}
	eq(e, t = 0) {
		return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
	}
	map(e, t, n) {
		return this.type.map(e, this, t, n);
	}
	static widget(t, n, r) {
		return new e(t, t, new b_(n, r));
	}
	static inline(t, n, r, i) {
		return new e(t, n, new x_(r, i));
	}
	static node(t, n, r, i) {
		return new e(t, n, new S_(r, i));
	}
	get spec() {
		return this.type.spec;
	}
	get inline() {
		return this.type instanceof x_;
	}
	get widget() {
		return this.type instanceof b_;
	}
}, w_ = [], T_ = {}, K = class e {
	constructor(e, t) {
		this.local = e.length ? e : w_, this.children = t.length ? t : w_;
	}
	static create(e, t) {
		return t.length ? N_(t, e, 0, T_) : E_;
	}
	find(e, t, n) {
		let r = [];
		return this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r;
	}
	findInner(e, t, n, r, i) {
		for (let a = 0; a < this.local.length; a++) {
			let o = this.local[a];
			o.from <= t && o.to >= e && (!i || i(o.spec)) && n.push(o.copy(o.from + r, o.to + r));
		}
		for (let a = 0; a < this.children.length; a += 3) if (this.children[a] < t && this.children[a + 1] > e) {
			let o = this.children[a] + 1;
			this.children[a + 2].findInner(e - o, t - o, n, r + o, i);
		}
	}
	map(e, t, n) {
		return this == E_ || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || T_);
	}
	mapInner(t, n, r, i, a) {
		let o;
		if (this.local.length) {
			let e = new y_(n.content);
			for (let s = 0; s < this.local.length; s++) {
				let c = this.local[s].map(t, r, i);
				c && c.type.valid(n, c, e) ? (o ||= []).push(c) : a.onRemove && a.onRemove(this.local[s].spec);
			}
		}
		return this.children.length ? O_(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(P_), w_) : E_;
	}
	add(t, n) {
		return n.length ? this == E_ ? e.create(t, n) : this.addInner(t, n, 0) : this;
	}
	addInner(t, n, r) {
		let i, a = 0;
		t.forEach((e, t) => {
			let o = t + r, s;
			if (s = j_(n, e, o)) {
				for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
				i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, N_(s, e, o + 1, T_)), a += 3;
			}
		});
		let o = k_(a ? M_(n) : n, -r);
		if (o.length) {
			let e = new y_(t.content);
			for (let n = 0; n < o.length; n++) o[n].type.valid(t, o[n], e) || o.splice(n--, 1);
		}
		return new e(o.length ? this.local.concat(o).sort(P_) : this.local, i || this.children);
	}
	remove(e) {
		return e.length == 0 || this == E_ ? this : this.removeInner(e, 0);
	}
	removeInner(t, n) {
		let r = this.children, i = this.local;
		for (let e = 0; e < r.length; e += 3) {
			let i, a = r[e] + n, o = r[e + 1] + n;
			for (let e = 0, n; e < t.length; e++) (n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
			if (!i) continue;
			r == this.children && (r = this.children.slice());
			let s = r[e + 2].removeInner(i, a + 1);
			s == E_ ? (r.splice(e, 3), e -= 3) : r[e + 2] = s;
		}
		if (i.length) {
			for (let e = 0, r; e < t.length; e++) if (r = t[e]) for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
		}
		return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : E_;
	}
	forChild(t, n) {
		if (this == E_) return this;
		if (n.isLeaf) return e.empty;
		let r, i;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] >= t) {
			this.children[e] == t && (r = this.children[e + 2]);
			break;
		}
		let a = t + 1, o = a + n.content.size;
		for (let e = 0; e < this.local.length; e++) {
			let t = this.local[e];
			if (t.from < o && t.to > a && t.type instanceof x_) {
				let e = Math.max(a, t.from) - a, n = Math.min(o, t.to) - a;
				e < n && (i ||= []).push(t.copy(e, n));
			}
		}
		if (i) {
			let t = new e(i.sort(P_), w_);
			return r ? new D_([t, r]) : t;
		}
		return r || E_;
	}
	eq(t) {
		if (this == t) return !0;
		if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
		for (let e = 0; e < this.local.length; e++) if (!this.local[e].eq(t.local[e])) return !1;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
		return !0;
	}
	locals(e) {
		return F_(this.localsInner(e));
	}
	localsInner(e) {
		if (this == E_) return w_;
		if (e.inlineContent || !this.local.some(x_.is)) return this.local;
		let t = [];
		for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof x_ || t.push(this.local[e]);
		return t;
	}
	forEachSet(e) {
		e(this);
	}
};
K.empty = new K([], []), K.removeOverlap = F_;
var E_ = K.empty, D_ = class e {
	constructor(e) {
		this.members = e;
	}
	map(t, n) {
		let r = this.members.map((e) => e.map(t, n, T_));
		return e.from(r);
	}
	forChild(t, n) {
		if (n.isLeaf) return K.empty;
		let r = [];
		for (let i = 0; i < this.members.length; i++) {
			let a = this.members[i].forChild(t, n);
			a != E_ && (a instanceof e ? r = r.concat(a.members) : r.push(a));
		}
		return e.from(r);
	}
	eq(t) {
		if (!(t instanceof e) || t.members.length != this.members.length) return !1;
		for (let e = 0; e < this.members.length; e++) if (!this.members[e].eq(t.members[e])) return !1;
		return !0;
	}
	locals(e) {
		let t, n = !0;
		for (let r = 0; r < this.members.length; r++) {
			let i = this.members[r].localsInner(e);
			if (i.length) {
				if (!t) t = i;
				else {
					n &&= (t = t.slice(), !1);
					for (let e = 0; e < i.length; e++) t.push(i[e]);
				}
			}
		}
		return t ? F_(n ? t : t.sort(P_)) : w_;
	}
	static from(t) {
		switch (t.length) {
			case 0: return E_;
			case 1: return t[0];
			default: return new e(t.every((e) => e instanceof K) ? t : t.reduce((e, t) => e.concat(t instanceof K ? t : t.members), []));
		}
	}
	forEachSet(e) {
		for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
	}
};
function O_(e, t, n, r, i, a, o) {
	let s = e.slice();
	for (let e = 0, t = a; e < n.maps.length; e++) {
		let r = 0;
		n.maps[e].forEach((e, n, i, a) => {
			let o = a - i - (n - e);
			for (let i = 0; i < s.length; i += 3) {
				let a = s[i + 1];
				if (a < 0 || e > a + t - r) continue;
				let c = s[i] + t - r;
				n >= c ? s[i + 1] = e <= c ? -2 : -1 : e >= t && o && (s[i] += o, s[i + 1] += o);
			}
			r += o;
		}), t = n.maps[e].map(t, -1);
	}
	let c = !1;
	for (let t = 0; t < s.length; t += 3) if (s[t + 1] < 0) {
		if (s[t + 1] == -2) {
			c = !0, s[t + 1] = -1;
			continue;
		}
		let l = n.map(e[t] + a), u = l - i;
		if (u < 0 || u >= r.content.size) {
			c = !0;
			continue;
		}
		let d = n.map(e[t + 1] + a, -1) - i, { index: f, offset: p } = r.content.findIndex(u), m = r.maybeChild(f);
		if (m && p == u && p + m.nodeSize == d) {
			let r = s[t + 2].mapInner(n, m, l + 1, e[t] + a + 1, o);
			r == E_ ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r);
		} else c = !0;
	}
	if (c) {
		let c = N_(A_(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new K(t.sort(P_), s);
}
function k_(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new C_(i.from + t, i.to + t, i.type));
	}
	return n;
}
function A_(e, t, n, r, i, a, o) {
	function s(e, t) {
		for (let a = 0; a < e.local.length; a++) {
			let s = e.local[a].map(r, i, t);
			s ? n.push(s) : o.onRemove && o.onRemove(e.local[a].spec);
		}
		for (let n = 0; n < e.children.length; n += 3) s(e.children[n + 2], e.children[n] + t + 1);
	}
	for (let n = 0; n < e.length; n += 3) e[n + 1] == -1 && s(e[n + 2], t[n] + a + 1);
	return n;
}
function j_(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function M_(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function N_(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = j_(e, t, o + n);
		if (s) {
			a = !0;
			let e = N_(s, t, n + o + 1, r);
			e != E_ && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = k_(a ? M_(e) : e, -n).sort(P_);
	if (o.length) {
		let e = new y_(t.content);
		for (let n = 0; n < o.length; n++) o[n].type.valid(t, o[n], e) || (r.onRemove && r.onRemove(o[n].spec), o.splice(n--, 1));
	}
	return o.length || i.length ? new K(o, i) : E_;
}
function P_(e, t) {
	return e.from - t.from || e.to - t.to;
}
function F_(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), I_(t, i + 1, a.copy(r.to, a.to)));
			else {
				a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), I_(t, i, r.copy(a.from, r.to)));
				break;
			}
		}
	}
	return t;
}
function I_(e, t, n) {
	for (; t < e.length && P_(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function L_(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != E_ && t.push(r);
	}), e.cursorWrapper && t.push(K.create(e.state.doc, [e.cursorWrapper.deco])), D_.from(t);
}
var R_ = {
	childList: !0,
	characterData: !0,
	characterDataOldValue: !0,
	attributes: !0,
	attributeOldValue: !0,
	subtree: !0
}, z_ = pm && mm <= 11, B_ = class {
	constructor() {
		this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
	}
	set(e) {
		this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
	}
	clear() {
		this.anchorNode = this.focusNode = null;
	}
	eq(e) {
		return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
	}
}, V_ = class {
	constructor(e, t) {
		this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new B_(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((t) => {
			for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
			pm && mm <= 11 && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : ym && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
		}), z_ && (this.onCharData = (e) => {
			this.queue.push({
				target: e.target,
				type: "characterData",
				oldValue: e.prevValue
			}), this.flushSoon();
		}), this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	flushSoon() {
		this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
			this.flushingSoon = -1, this.flush();
		}, 20));
	}
	forceFlush() {
		this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
	}
	start() {
		this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, R_)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
	}
	stop() {
		if (this.observer) {
			let e = this.observer.takeRecords();
			if (e.length) {
				for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
				window.setTimeout(() => this.flush(), 20);
			}
			this.observer.disconnect();
		}
		this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
	}
	connectSelection() {
		this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
	}
	disconnectSelection() {
		this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
	}
	suppressSelectionUpdates() {
		this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
	}
	onSelectionChange() {
		if (Gh(this.view)) {
			if (this.suppressingSelectionUpdates) return Fh(this.view);
			if (pm && mm <= 11 && !this.view.state.selection.empty) {
				let e = this.view.domSelectionRange();
				if (e.focusNode && qp(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon();
			}
			this.flush();
		}
	}
	setCurSelection() {
		this.currentSelection.set(this.view.domSelectionRange());
	}
	ignoreSelectionChange(e) {
		if (!e.focusNode) return !0;
		let t = /* @__PURE__ */ new Set(), n;
		for (let n = e.focusNode; n; n = Up(n)) t.add(n);
		for (let r = e.anchorNode; r; r = Up(r)) if (t.has(r)) {
			n = r;
			break;
		}
		let r = n && this.view.docView.nearestDesc(n);
		if (r && r.ignoreMutation({
			type: "selection",
			target: Zp(n) ? n.parentNode : n
		})) return this.setCurSelection(), !0;
	}
	pendingRecords() {
		if (this.observer) for (let e of this.observer.takeRecords()) this.queue.push(e);
		return this.queue;
	}
	flush() {
		let { view: e } = this;
		if (!e.docView || this.flushingSoon > -1) return;
		let t = this.pendingRecords();
		t.length && (this.queue = []);
		let n, r = !1;
		!this.suppressingSelectionUpdates && Gh(e) && (n = e.domSelectionRange(), r = !this.currentSelection.eq(n) && !this.ignoreSelectionChange(n));
		let i = -1, a = -1, o = !1, s = [];
		if (e.editable) for (let e = 0; e < t.length; e++) {
			let n = this.registerMutation(t[e], s);
			n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0));
		}
		if (s.some((e) => e.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || _m && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some((e) => e.type == "childList" && e.removedNodes.length))) {
			for (let e of s) if (e.nodeName == "BR" && e.parentNode) {
				let t = e.nextSibling;
				for (; t && G(t);) {
					if (t.contentEditable == "false") {
						e.parentNode.removeChild(e);
						break;
					}
					t = t.firstChild;
				}
			}
		} else if (hm && s.length) {
			let t = s.filter((e) => e.nodeName == "BR");
			if (t.length == 2) {
				let [e, n] = t;
				e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove();
			} else {
				let { focusNode: n } = this.currentSelection;
				for (let r of t) {
					let t = r.parentNode;
					t && t.nodeName == "LI" && (!n || q_(e, n) != t) && r.remove();
				}
			}
		}
		let c = null;
		i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && rm(n) && (c = Nh(e)) && c.eq(V.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Fh(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), W_(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, J_(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : n && !this.currentSelection.eq(n) && Fh(e), n && this.currentSelection.set(n));
	}
	registerMutation(e, t) {
		if (t.indexOf(e.target) > -1) return null;
		let n = this.view.docView.nearestDesc(e.target);
		if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e)) return null;
		if (e.type == "childList") {
			for (let n = 0; n < e.addedNodes.length; n++) {
				let r = e.addedNodes[n];
				t.push(r), Zp(r) && (this.lastChangedTextNode = r);
			}
			if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return {
				from: n.posBefore,
				to: n.posAfter
			};
			let r = e.previousSibling, i = e.nextSibling;
			if (pm && mm <= 11 && e.addedNodes.length) for (let t = 0; t < e.addedNodes.length; t++) {
				let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
				(!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a);
			}
			let a = r && r.parentNode == e.target ? Hp(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? Hp(i) : e.target.childNodes.length;
			return {
				from: o,
				to: n.localPosFromDOM(e.target, s, 1)
			};
		}
		return e.type == "attributes" ? {
			from: n.posAtStart - n.border,
			to: n.posAtEnd + n.border
		} : (this.lastChangedTextNode = e.target, {
			from: n.posAtStart,
			to: n.posAtEnd,
			typeOver: e.target.nodeValue == e.oldValue
		});
	}
}, H_ = /* @__PURE__ */ new WeakMap(), U_ = !1;
function W_(e) {
	if (!H_.has(e) && (H_.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = hm, U_) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), U_ = !0;
	}
}
function G_(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return qp(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), {
		anchorNode: n,
		anchorOffset: r,
		focusNode: i,
		focusOffset: a
	};
}
function K_(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return G_(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? G_(e, n) : null;
}
function q_(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function J_(e, t) {
	let { focusNode: n, focusOffset: r } = e.domSelectionRange();
	for (let i of t) if (i.parentNode?.nodeName == "TR") {
		let t = i.nextSibling;
		for (; t && t.nodeName != "TD" && t.nodeName != "TH";) t = t.nextSibling;
		if (t) {
			let a = t;
			for (;;) {
				let e = a.firstChild;
				if (!e || !G(e) || e.contentEditable == "false" || /^(BR|IMG)$/.test(e.nodeName)) break;
				a = e;
			}
			a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r);
		} else i.parentNode.removeChild(i);
	}
}
function Y_(e, t, n, r) {
	let { node: i, fromOffset: a, toOffset: o, from: s, to: c } = e.docView.parseRange(t, n), l = e.domSelectionRange(), u, d = l.anchorNode;
	if (d && Qp(e.dom, d) && (u = [{
		node: d,
		offset: l.anchorOffset
	}], rm(l) || u.push({
		node: l.focusNode,
		offset: l.focusOffset
	})), _m && e.input.lastKeyCode === 8) for (let e = o; e > a; e--) {
		let t = i.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			o = e;
			break;
		}
		if (!n || n.size) break;
	}
	let f = e.state.doc, p = e.someProp("domParser") || Gu.fromSchema(e.state.schema), m = f.resolve(s), h = null, g = p.parse(i, {
		topNode: m.parent,
		topMatch: m.parent.contentMatchAt(m.index()),
		topOpen: !0,
		from: a,
		to: o,
		preserveWhitespace: m.parent.type.whitespace != "pre" || "full",
		findPositions: u,
		ruleFromNode: X_(r),
		context: m
	});
	if (u && u[0].pos != null) {
		let e = u[0].pos, t = u[1] && u[1].pos;
		t ??= e, h = {
			anchor: e + s,
			head: t + s
		};
	}
	return {
		doc: g,
		sel: h,
		from: s,
		to: c
	};
}
var X_ = (e) => (t) => {
	let n = t.pmViewDesc;
	if (n) return n.parseRule(e);
	if (t.nodeName == "BR" && t.parentNode) {
		if (ym && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
			let e = document.createElement("div");
			return e.appendChild(document.createElement("li")), { skip: e };
		}
		if (t.parentNode.lastChild == t || ym && /^(tr|table)$/i.test(t.parentNode.nodeName)) return { ignore: !0 };
	} else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder")) return { ignore: !0 };
	return null;
}, Z_ = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Q_(e, t, n, r, i) {
	let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = Nh(e, t);
		if (n && !e.state.selection.eq(n)) {
			if (_m && Cm && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && e.someProp("handleKeyDown", (t) => t(e, im(13, "Enter")))) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), a && r.setMeta("composition", a), e.dispatch(r);
		}
		return;
	}
	let o = e.state.doc.resolve(t), s = o.sharedDepth(n);
	t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
	let c = e.state.selection, l = Y_(e, t, n, i), u = e.state.doc, d = u.slice(l.from, l.to), f, p;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = "end") : (f = e.state.selection.from, p = "start"), e.input.lastKeyCode = null;
	let m = iv(d.content, l.doc.content, l.from, f, p);
	if (m && e.input.domChangeCount++, (bm && e.input.lastIOSEnter > Date.now() - 225 || Cm) && i.some((e) => G(e) && !Z_.test(e.nodeName)) && (!m || m.endA >= m.endB) && e.someProp("handleKeyDown", (t) => t(e, im(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!m) {
		if (r && c instanceof H && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
			start: c.from,
			endA: c.to,
			endB: c.to
		};
		else {
			if (l.sel) {
				let t = $_(e, e.state.doc, l.sel);
				if (t && !t.eq(e.state.selection)) {
					let n = e.state.tr.setSelection(t);
					a && n.setMeta("composition", a), e.dispatch(n);
				}
			}
			return;
		}
	}
	e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof H && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), pm && mm <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == " \xA0" && (m.start--, m.endA--, m.endB--);
	let h = l.doc.resolveNoCache(m.start - l.from), g = l.doc.resolveNoCache(m.endB - l.from), _ = u.resolve(m.start), v = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
	if ((bm && e.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !v && nv(l.doc, h.pos, g.pos)) && e.someProp("handleKeyDown", (t) => t(e, im(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > m.start && (v ? m.endA > m.start && m.endB == m.start : tv(u, m.start, m.endA, h, g)) && e.someProp("handleKeyDown", (t) => t(e, im(8, "Backspace")))) {
		Cm && _m && e.domObserver.suppressSelectionUpdates();
		return;
	}
	_m && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), Cm && !v && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => {
		e.someProp("handleKeyDown", function(t) {
			return t(e, im(13, "Enter"));
		});
	}, 20));
	let y = m.start, b = m.endA, x = (t) => {
		let n = t || e.state.tr.replace(y, b, l.doc.slice(m.start - l.from, m.endB - l.from));
		if (l.sel) {
			let t = $_(e, n.doc, l.sel);
			t && !(_m && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == y || t.head == n.mapping.map(b) - 1) || pm && t.empty && t.head == y) && n.setSelection(t);
		}
		return a && n.setMeta("composition", a), n.scrollIntoView();
	}, S;
	if (v) {
		if (h.pos == g.pos) {
			pm && mm <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Fh(e), 20));
			let t = x(e.state.tr.delete(y, b)), n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
			n && t.ensureMarks(n), e.dispatch(t);
		} else if (m.endA == m.endB && (S = ev(h.parent.content.cut(h.parentOffset, g.parentOffset), _.parent.content.cut(_.parentOffset, m.endA - _.start())))) {
			let t = x(e.state.tr);
			S.type == "add" ? t.addMark(y, b, S.mark) : t.removeMark(y, b, S.mark), e.dispatch(t);
		} else if (h.parent.child(h.index()).isText && h.index() == g.index() - +!g.textOffset) {
			let t = h.parent.textBetween(h.parentOffset, g.parentOffset), n = () => x(e.state.tr.insertText(t, y, b));
			e.someProp("handleTextInput", (r) => r(e, y, b, t, n)) || e.dispatch(n());
		} else e.dispatch(x());
	} else e.dispatch(x());
}
function $_(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : Wh(e, t.resolve(n.anchor), t.resolve(n.head));
}
function ev(e, t) {
	let n = e.firstChild.marks, r = t.firstChild.marks, i = n, a = r, o, s, c;
	for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
	for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
	if (i.length == 1 && a.length == 0) s = i[0], o = "add", c = (e) => e.mark(s.addToSet(e.marks));
	else if (i.length == 0 && a.length == 1) s = a[0], o = "remove", c = (e) => e.mark(s.removeFromSet(e.marks));
	else return null;
	let l = [];
	for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
	if (R.from(l).eq(e)) return {
		mark: s,
		type: o
	};
}
function tv(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || rv(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.inlineContent) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(rv(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || rv(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function nv(e, t, n) {
	let r = 0, i = 0;
	return e.nodesBetween(t, n, (e, a) => {
		e.isTextblock && a >= t && a < n ? r++ : (e.isText ? /\S/.test(e.text.slice(Math.max(0, t - a), Math.min(e.nodeSize, n - a))) : e.isLeaf) && i++;
	}), i == 0 && r == 1;
}
function rv(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function iv(e, t, n, r, i) {
	let a = e.findDiffStart(t, n), o = n + e.size, s = n + t.size;
	if (a == null) return null;
	let { a: c, b: l } = e.findDiffEnd(t, o, s);
	if (i == "end") {
		let e = Math.max(0, a - Math.min(c, l));
		r -= c + e - a;
	}
	if (c < a && o < s) {
		let e = r <= a && r >= c ? a - r : 0;
		a -= e, l = a + (l - c), c = a;
	} else if (l < a) {
		let e = r <= a && r >= l ? a - r : 0;
		a -= e, c = a + (c - l), l = a;
	}
	return {
		start: a,
		endA: c,
		endB: l
	};
}
var av = class {
	constructor(e, t) {
		this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new jg(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(fv), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = cv(this), sv(this), this.nodeViews = uv(this), this.docView = ph(this.state.doc, ov(this), L_(this), this.dom, this), this.domObserver = new V_(this, (e, t, n, r) => Q_(this, e, t, n, r)), this.domObserver.start(), Mg(this), this.updatePluginViews();
	}
	get composing() {
		return this.input.composing;
	}
	get props() {
		if (this._props.state != this.state) {
			let e = this._props;
			this._props = {};
			for (let t in e) this._props[t] = e[t];
			this._props.state = this.state;
		}
		return this._props;
	}
	update(e) {
		e.handleDOMEvents != this._props.handleDOMEvents && Fg(this);
		let t = this._props;
		this._props = e, e.plugins && (e.plugins.forEach(fv), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
	}
	setProps(e) {
		let t = {};
		for (let e in this._props) t[e] = this._props[e];
		t.state = this.state;
		for (let n in e) t[n] = e[n];
		this.update(t);
	}
	updateState(e) {
		this.updateStateInner(e, this._props);
	}
	updateStateInner(e, t) {
		let n = this.state, r = !1, i = !1;
		e.storedMarks && this.composing && (a_(this), i = !0), this.state = e;
		let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
		if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
			let e = uv(this);
			dv(e, this.nodeViews) && (this.nodeViews = e, r = !0);
		}
		(a || t.handleDOMEvents != this._props.handleDOMEvents) && Fg(this), this.editable = cv(this), sv(this);
		let o = L_(this), s = ov(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
		(l || !e.selection.eq(n.selection)) && (i = !0);
		let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && Am(this);
		if (i) {
			this.domObserver.stop();
			let t = l && (pm || _m) && !this.composing && !n.selection.empty && !e.selection.empty && lv(n.selection, e.selection);
			if (l) {
				let n = _m ? this.trackWrites = this.domSelectionRange().focusNode : null;
				this.composing && (this.input.compositionNode = o_(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = ph(e.doc, s, o, this.dom, this)), !n || this.trackWrites && this.dom.contains(this.trackWrites) || (t = !0);
			}
			let i = this.input.mouseDown;
			t || !(i && this.domObserver.currentSelection.eq(this.domSelectionRange()) && qh(this) && i.delaySelUpdate()) ? Fh(this, t) : (Hh(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
		}
		this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && Mm(u);
	}
	scrollToSelection() {
		let e = this.domSelectionRange().focusNode;
		if (e && Qp(this.dom, e) && !this.someProp("handleScrollToSelection", (e) => e(this))) {
			if (this.state.selection instanceof U) {
				let t = this.docView.domAfterPos(this.state.selection.from);
				G(t) && km(this, t.getBoundingClientRect(), e);
			} else km(this, this.coordsAtPos(this.state.selection.head, 1), e);
		}
	}
	destroyPluginViews() {
		let e;
		for (; e = this.pluginViews.pop();) e.destroy && e.destroy();
	}
	updatePluginViews(e) {
		if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
			this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
			for (let e = 0; e < this.directPlugins.length; e++) {
				let t = this.directPlugins[e];
				t.spec.view && this.pluginViews.push(t.spec.view(this));
			}
			for (let e = 0; e < this.state.plugins.length; e++) {
				let t = this.state.plugins[e];
				t.spec.view && this.pluginViews.push(t.spec.view(this));
			}
		} else for (let t = 0; t < this.pluginViews.length; t++) {
			let n = this.pluginViews[t];
			n.update && n.update(this, e);
		}
	}
	updateDraggedNode(e, t) {
		let n = e.node, r = -1;
		if (n.from < this.state.doc.content.size && this.state.doc.nodeAt(n.from) == n.node) r = n.from;
		else {
			let e = n.from + (this.state.doc.content.size - t.doc.content.size);
			(e > 0 && e < this.state.doc.content.size && this.state.doc.nodeAt(e)) == n.node && (r = e);
		}
		this.dragging = new m_(e.slice, e.move, r < 0 ? void 0 : U.create(this.state.doc, r));
	}
	someProp(e, t) {
		let n = this._props && this._props[e], r;
		if (n != null && (r = t ? t(n) : n)) return r;
		for (let n = 0; n < this.directPlugins.length; n++) {
			let i = this.directPlugins[n].props[e];
			if (i != null && (r = t ? t(i) : i)) return r;
		}
		let i = this.state.plugins;
		if (i) for (let n = 0; n < i.length; n++) {
			let a = i[n].props[e];
			if (a != null && (r = t ? t(a) : a)) return r;
		}
	}
	hasFocus() {
		if (pm) {
			let e = this.root.activeElement;
			if (e == this.dom) return !0;
			if (!e || !this.dom.contains(e)) return !1;
			for (; e && this.dom != e && this.dom.contains(e);) {
				if (e.contentEditable == "false") return !1;
				e = e.parentElement;
			}
			return !0;
		}
		return this.root.activeElement == this.dom;
	}
	focus() {
		this.domObserver.stop(), this.editable && Fm(this.dom), Fh(this), this.domObserver.start();
	}
	get root() {
		let e = this._root;
		if (e == null) {
			for (let e = this.dom.parentNode; e; e = e.parentNode) if (e.nodeType == 9 || e.nodeType == 11 && e.host) return e.getSelection || (Object.getPrototypeOf(e).getSelection = () => e.ownerDocument.getSelection()), this._root = e;
		}
		return e || document;
	}
	updateRoot() {
		this._root = null;
	}
	posAtCoords(e) {
		return Um(this, e);
	}
	coordsAtPos(e, t = 1) {
		return qm(this, e, t);
	}
	domAtPos(e, t = 0) {
		return this.docView.domFromPos(e, t);
	}
	nodeDOM(e) {
		let t = this.docView.descAt(e);
		return t ? t.nodeDOM : null;
	}
	posAtDOM(e, t, n = -1) {
		let r = this.docView.posFromDOM(e, t, n);
		if (r == null) throw RangeError("DOM position not inside the editor");
		return r;
	}
	endOfTextblock(e, t) {
		return rh(this, t || this.state, e);
	}
	pasteHTML(e, t) {
		return f_(this, "", e, !1, t || new ClipboardEvent("paste"));
	}
	pasteText(e, t) {
		return f_(this, e, null, !0, t || new ClipboardEvent("paste"));
	}
	serializeForClipboard(e) {
		return fg(this, e);
	}
	destroy() {
		this.docView && (Pg(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], L_(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Kp());
	}
	get isDestroyed() {
		return this.docView == null;
	}
	dispatchEvent(e) {
		return Rg(this, e);
	}
	domSelectionRange() {
		let e = this.dom.isConnected !== !1 && this.domSelection();
		return e ? ym && this.root.nodeType === 11 && am(this.dom.ownerDocument) == this.dom && K_(this, e) || e : {
			focusNode: null,
			focusOffset: 0,
			anchorNode: null,
			anchorOffset: 0
		};
	}
	domSelection() {
		return this.root.getSelection();
	}
};
av.prototype.dispatch = function(e) {
	let t = this._props.dispatchTransaction;
	t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function ov(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [C_.node(0, e.state.doc.content.size, t)];
}
function sv(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: C_.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function cv(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function lv(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function uv(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function dv(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function fv(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
for (var pv = {
	8: "Backspace",
	9: "Tab",
	10: "Enter",
	12: "NumLock",
	13: "Enter",
	16: "Shift",
	17: "Control",
	18: "Alt",
	20: "CapsLock",
	27: "Escape",
	32: " ",
	33: "PageUp",
	34: "PageDown",
	35: "End",
	36: "Home",
	37: "ArrowLeft",
	38: "ArrowUp",
	39: "ArrowRight",
	40: "ArrowDown",
	44: "PrintScreen",
	45: "Insert",
	46: "Delete",
	59: ";",
	61: "=",
	91: "Meta",
	92: "Meta",
	106: "*",
	107: "+",
	108: ",",
	109: "-",
	110: ".",
	111: "/",
	144: "NumLock",
	145: "ScrollLock",
	160: "Shift",
	161: "Shift",
	162: "Control",
	163: "Control",
	164: "Alt",
	165: "Alt",
	173: "-",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
}, mv = {
	48: ")",
	49: "!",
	50: "@",
	51: "#",
	52: "$",
	53: "%",
	54: "^",
	55: "&",
	56: "*",
	57: "(",
	59: ":",
	61: "+",
	173: "_",
	186: ":",
	187: "+",
	188: "<",
	189: "_",
	190: ">",
	191: "?",
	192: "~",
	219: "{",
	220: "|",
	221: "}",
	222: "\""
}, hv = typeof navigator < "u" && /Mac/.test(navigator.platform), gv = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), _v = 0; _v < 10; _v++) pv[48 + _v] = pv[96 + _v] = String(_v);
for (var _v = 1; _v <= 24; _v++) pv[_v + 111] = "F" + _v;
for (var _v = 65; _v <= 90; _v++) pv[_v] = String.fromCharCode(_v + 32), mv[_v] = String.fromCharCode(_v);
for (var vv in pv) mv.hasOwnProperty(vv) || (mv[vv] = pv[vv]);
function yv(e) {
	var t = !(hv && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || gv && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? mv : pv)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
// node_modules/prosemirror-keymap/dist/index.js
var bv = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), xv = typeof navigator < "u" && /Win/.test(navigator.platform);
function Sv(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) bv ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function Cv(e) {
	let t = Object.create(null);
	for (let n in e) t[Sv(n)] = e[n];
	return t;
}
function wv(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function Tv(e) {
	return new W({ props: { handleKeyDown: Ev(e) } });
}
function Ev(e) {
	let t = Cv(e);
	return function(e, n) {
		let r = yv(n), i, a = t[wv(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[wv(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(xv && n.ctrlKey && n.altKey) && (i = pv[n.keyCode]) && i != r) {
				let r = t[wv(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
// node_modules/rope-sequence/dist/index.js
var Dv = 200, Ov = function() {};
Ov.prototype.append = function(e) {
	return e.length ? (e = Ov.from(e), !this.length && e || e.length < Dv && this.leafAppend(e) || this.length < Dv && e.leafPrepend(this) || this.appendInner(e)) : this;
}, Ov.prototype.prepend = function(e) {
	return e.length ? Ov.from(e).append(this) : this;
}, Ov.prototype.appendInner = function(e) {
	return new Av(this, e);
}, Ov.prototype.slice = function(e, t) {
	return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? Ov.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
}, Ov.prototype.get = function(e) {
	if (!(e < 0 || e >= this.length)) return this.getInner(e);
}, Ov.prototype.forEach = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
}, Ov.prototype.map = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length);
	var r = [];
	return this.forEach(function(t, n) {
		return r.push(e(t, n));
	}, t, n), r;
}, Ov.from = function(e) {
	return e instanceof Ov ? e : e && e.length ? new kv(e) : Ov.empty;
};
var kv = /* @__PURE__ */ function(e) {
	function t(t) {
		e.call(this), this.values = t;
	}
	e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
	var n = {
		length: { configurable: !0 },
		depth: { configurable: !0 }
	};
	return t.prototype.flatten = function() {
		return this.values;
	}, t.prototype.sliceInner = function(e, n) {
		return e == 0 && n == this.length ? this : new t(this.values.slice(e, n));
	}, t.prototype.getInner = function(e) {
		return this.values[e];
	}, t.prototype.forEachInner = function(e, t, n, r) {
		for (var i = t; i < n; i++) if (e(this.values[i], r + i) === !1) return !1;
	}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
		for (var i = t - 1; i >= n; i--) if (e(this.values[i], r + i) === !1) return !1;
	}, t.prototype.leafAppend = function(e) {
		if (this.length + e.length <= Dv) return new t(this.values.concat(e.flatten()));
	}, t.prototype.leafPrepend = function(e) {
		if (this.length + e.length <= Dv) return new t(e.flatten().concat(this.values));
	}, n.length.get = function() {
		return this.values.length;
	}, n.depth.get = function() {
		return 0;
	}, Object.defineProperties(t.prototype, n), t;
}(Ov);
Ov.empty = new kv([]);
var Av = /* @__PURE__ */ function(e) {
	function t(t, n) {
		e.call(this), this.left = t, this.right = n, this.length = t.length + n.length, this.depth = Math.max(t.depth, n.depth) + 1;
	}
	return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t.prototype.flatten = function() {
		return this.left.flatten().concat(this.right.flatten());
	}, t.prototype.getInner = function(e) {
		return e < this.left.length ? this.left.get(e) : this.right.get(e - this.left.length);
	}, t.prototype.forEachInner = function(e, t, n, r) {
		var i = this.left.length;
		if (t < i && this.left.forEachInner(e, t, Math.min(n, i), r) === !1 || n > i && this.right.forEachInner(e, Math.max(t - i, 0), Math.min(this.length, n) - i, r + i) === !1) return !1;
	}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
		var i = this.left.length;
		if (t > i && this.right.forEachInvertedInner(e, t - i, Math.max(n, i) - i, r + i) === !1 || n < i && this.left.forEachInvertedInner(e, Math.min(t, i), n, r) === !1) return !1;
	}, t.prototype.sliceInner = function(e, t) {
		if (e == 0 && t == this.length) return this;
		var n = this.left.length;
		return t <= n ? this.left.slice(e, t) : e >= n ? this.right.slice(e - n, t - n) : this.left.slice(e, n).append(this.right.slice(0, t - n));
	}, t.prototype.leafAppend = function(e) {
		var n = this.right.leafAppend(e);
		if (n) return new t(this.left, n);
	}, t.prototype.leafPrepend = function(e) {
		var n = this.left.leafPrepend(e);
		if (n) return new t(n, this.right);
	}, t.prototype.appendInner = function(e) {
		return this.left.depth >= Math.max(this.right.depth, e.depth) + 1 ? new t(this.left, new t(this.right, e)) : new t(this, e);
	}, t;
}(Ov), jv = 500, Mv = class e {
	constructor(e, t) {
		this.items = e, this.eventCount = t;
	}
	popEvent(t, n) {
		if (this.eventCount == 0) return null;
		let r = this.items.length;
		for (;; r--) if (this.items.get(r - 1).selection) {
			--r;
			break;
		}
		let i, a;
		n && (i = this.remapping(r, this.items.length), a = i.maps.length);
		let o = t.tr, s, c, l = [], u = [];
		return this.items.forEach((t, n) => {
			if (!t.step) i || (i = this.remapping(r, n + 1), a = i.maps.length), a--, u.push(t);
			else {
				if (i) {
					u.push(new Pv(t.map));
					let e = t.step.map(i.slice(a)), n;
					e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new Pv(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
				} else o.maybeStep(t.step);
				if (t.selection) return s = i ? t.selection.map(i.slice(a)) : t.selection, c = new e(this.items.slice(0, r).append(u.reverse().concat(l)), this.eventCount - 1), !1;
			}
		}, this.items.length, 0), {
			remaining: c,
			transform: o,
			selection: s
		};
	}
	addTransform(t, n, r, i) {
		let a = [], o = this.eventCount, s = this.items, c = !i && s.length ? s.get(s.length - 1) : null;
		for (let e = 0; e < t.steps.length; e++) {
			let r = t.steps[e].invert(t.docs[e]), l = new Pv(t.mapping.maps[e], r, n), u;
			(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
		}
		let l = o - r.depth;
		return l > Iv && (s = Nv(s, l), o -= l), new e(s.append(a), o);
	}
	remapping(e, t) {
		let n = new Cd();
		return this.items.forEach((t, r) => {
			let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
			n.appendMap(t.map, i);
		}, e, t), n;
	}
	addMaps(t) {
		return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new Pv(e))), this.eventCount);
	}
	rebased(t, n) {
		if (!this.eventCount) return this;
		n = Math.min(this.items.length, n);
		let r = [], i = this.items.length - n, a = t.mapping, o = t.steps.length, s = this.eventCount;
		this.items.forEach((e) => {
			e.selection && s--;
		}, i);
		let c = n;
		this.items.forEach((e) => {
			let n = a.getMirror(--c);
			if (n == null) return;
			o = Math.min(o, n);
			let i = a.maps[n];
			if (e.step) {
				let o = t.steps[n].invert(t.docs[n]), l = e.selection && e.selection.map(a.slice(c + 1, n));
				l && s++, r.push(new Pv(i, o, l));
			} else r.push(new Pv(i));
		}, i);
		let l = [];
		for (let e = n; e < o; e++) l.push(new Pv(a.maps[e]));
		let u = this.items.slice(0, i).append(l).append(r), d = new e(u, s);
		return d.emptyItemCount() > jv && (d = d.compress(this.items.length - r.length)), d;
	}
	emptyItemCount() {
		let e = 0;
		return this.items.forEach((t) => {
			t.step || e++;
		}), e;
	}
	compress(t = this.items.length) {
		let n = this.remapping(0, t), r = n.maps.length, i = [], a = 0;
		return this.items.forEach((e, o) => {
			if (o >= t) i.push(e), e.selection && a++;
			else if (e.step) {
				let t = e.step.map(n.slice(r)), o = t && t.getMap();
				if (r--, o && n.appendMap(o, r), t) {
					let s = e.selection && e.selection.map(n.slice(r));
					s && a++;
					let c = new Pv(o.invert(), t, s), l, u = i.length - 1;
					(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
				}
			} else e.map && r--;
		}, this.items.length, 0), new e(Ov.from(i.reverse()), a);
	}
};
Mv.empty = new Mv(Ov.empty, 0);
function Nv(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
var Pv = class e {
	constructor(e, t, n, r) {
		this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
	}
	merge(t) {
		if (this.step && t.step && !t.selection) {
			let n = t.step.merge(this.step);
			if (n) return new e(n.getMap().invert(), n, this.selection);
		}
	}
}, Fv = class {
	constructor(e, t, n, r, i) {
		this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
	}
}, Iv = 20;
function Lv(e, t, n, r) {
	let i = n.getMeta(Kv), a;
	if (i) return i.historyState;
	n.getMeta(qv) && (e = new Fv(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(Kv)) return o.getMeta(Kv).redo ? new Fv(e.done.addTransform(n, void 0, r, Wv(t)), e.undone, zv(n.mapping.maps), e.prevTime, e.prevComposition) : new Fv(e.done, e.undone.addTransform(n, void 0, r, Wv(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !Rv(n, e.prevRanges)), s = o ? Bv(e.prevRanges, n.mapping) : zv(n.mapping.maps);
		return new Fv(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, Wv(t)), Mv.empty, s, n.time, i ?? e.prevComposition);
	}
	return (a = n.getMeta("rebased")) ? new Fv(e.done.rebased(n, a), e.undone.rebased(n, a), Bv(e.prevRanges, n.mapping), e.prevTime, e.prevComposition) : new Fv(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), Bv(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function Rv(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function zv(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function Bv(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function Vv(e, t, n) {
	let r = Wv(t), i = Kv.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, t.selection.getBookmark(), i, r), c = new Fv(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(Kv, {
		redo: n,
		historyState: c
	});
}
var Hv = !1, Uv = null;
function Wv(e) {
	let t = e.plugins;
	if (Uv != t) {
		Hv = !1, Uv = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			Hv = !0;
			break;
		}
	}
	return Hv;
}
function Gv(e) {
	return e.setMeta(qv, !0);
}
var Kv = new Zf("history"), qv = new Zf("closeHistory");
function Jv(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new W({
		key: Kv,
		state: {
			init() {
				return new Fv(Mv.empty, Mv.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return Lv(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? Xv : n == "historyRedo" ? Zv : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function Yv(e, t) {
	return (n, r) => {
		let i = Kv.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = Vv(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
var Xv = Yv(!1, !0), Zv = Yv(!0, !0);
function Qv(e) {
	return e.getMeta(Kv) != null;
}
// node_modules/@tiptap/core/dist/index.js
function $v(e) {
	let { state: t, transaction: n } = e, { selection: r } = n, { doc: i } = n, { storedMarks: a } = n;
	return {
		...t,
		apply: t.apply.bind(t),
		applyTransaction: t.applyTransaction.bind(t),
		plugins: t.plugins,
		schema: t.schema,
		reconfigure: t.reconfigure.bind(t),
		toJSON: t.toJSON.bind(t),
		get storedMarks() {
			return a;
		},
		get selection() {
			return r;
		},
		get doc() {
			return i;
		},
		get tr() {
			return r = n.selection, i = n.doc, a = n.storedMarks, n;
		}
	};
}
var ey = class e {
	constructor(e) {
		this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
	}
	get hasCustomState() {
		return !!this.customState;
	}
	get state() {
		return this.customState || this.editor.state;
	}
	get commands() {
		let { rawCommands: e, editor: t, state: n } = this, { view: r } = t, { tr: i } = n, a = this.buildProps(i);
		return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, (...e) => {
			let n = t(...e)(a);
			return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), n;
		}]));
	}
	get chain() {
		return () => this.createChain();
	}
	get can() {
		return () => this.createCan();
	}
	createChain(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = [], s = !!e, c = e || i.tr, l = () => (!s && t && !c.getMeta("preventDispatch") && !this.hasCustomState && a.dispatch(c), o.every((e) => e === !0)), u = {
			...Object.fromEntries(Object.entries(n).map(([e, n]) => [e, (...e) => {
				let r = this.buildProps(c, t), i = n(...e)(r);
				return o.push(i), u;
			}])),
			run: l
		};
		return u;
	}
	static createFakeChain() {
		let e = new Proxy({}, { get: (t, n) => {
			if (n !== "then") return n === "run" ? () => !1 : () => e;
		} });
		return e;
	}
	createCan(e) {
		let { rawCommands: t, state: n } = this, r = e || n.tr, i = this.buildProps(r, !1);
		return {
			...Object.fromEntries(Object.entries(t).map(([e, t]) => [e, (...e) => t(...e)({
				...i,
				dispatch: void 0
			})])),
			chain: () => this.createChain(r, !1)
		};
	}
	static createFallbackCan() {
		let t = e.createFakeChain();
		return new Proxy({ chain: () => t }, { get: (e, t) => {
			if (t !== "then") return t === "chain" ? e.chain : () => !1;
		} });
	}
	buildProps(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = {
			tr: e,
			editor: r,
			view: a,
			state: $v({
				state: i,
				transaction: e
			}),
			dispatch: t ? () => void 0 : void 0,
			chain: () => this.createChain(e, t),
			can: () => this.createCan(e),
			get commands() {
				return Object.fromEntries(Object.entries(n).map(([e, t]) => [e, (...e) => t(...e)(o)]));
			}
		};
		return o;
	}
}, ty = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
	if (!e.isDestroyed) {
		var n;
		t.dom.blur(), (n = window) == null || (n = n.getSelection()) == null || n.removeAllRanges();
	}
}), !0), ny = (e = !0) => ({ commands: t }) => t.setContent("", { emitUpdate: e }), ry = () => ({ state: e, tr: t, dispatch: n }) => {
	let { selection: r } = t, { ranges: i } = r;
	return n && i.forEach(({ $from: n, $to: r }) => {
		e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
			if (e.type.isText) return;
			let { doc: r, mapping: i } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
			if (!s) return;
			let c = Vd(s);
			if (e.type.isTextblock) {
				let { defaultType: e } = a.parent.contentMatchAt(a.index());
				t.setNodeMarkup(s.start, e);
			}
			(c || c === 0) && t.lift(s, c);
		});
	}), !0;
}, iy = (e) => (t) => e(t), ay = () => ({ state: e, dispatch: t }) => _p(e, t), oy = (e, t) => ({ editor: n, tr: r }) => {
	let { state: i } = n, a = i.doc.slice(e.from, e.to);
	r.deleteRange(e.from, e.to);
	let o = r.mapping.map(t);
	return r.insert(o, a.content), r.setSelection(new H(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, sy = () => ({ tr: e, dispatch: t }) => {
	let { selection: n } = e, r = n.$anchor.node();
	if (r.content.size > 0) return !1;
	let i = e.selection.$anchor;
	for (let n = i.depth; n > 0; --n) if (i.node(n).type === r.type) {
		if (t) {
			let t = i.before(n), r = i.after(n);
			e.delete(t, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
};
function cy(e, t) {
	if (typeof e == "string") {
		if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
		return t.nodes[e];
	}
	return e;
}
var ly = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let i = cy(e, n.schema), a = t.selection.$anchor;
	for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
		if (r) {
			let n = a.before(e), r = a.after(e);
			t.delete(n, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, uy = (e) => ({ tr: t, dispatch: n }) => {
	let { from: r, to: i } = e;
	return n && t.delete(r, i), !0;
}, dy = (e) => e.content ? /^text(\*|\+)/.test(e.content) : !1, fy = (e, t, n) => {
	if (!e.parent.isInline || n === "left" && e.pos > e.start() || n === "right" && e.pos < e.end()) return e.pos;
	let r = t.nodes[e.parent.type.name].spec;
	return dy(r) ? n === "left" ? e.start() - 1 : e.end() + 1 : e.pos;
}, py = (e, t, n) => ({
	from: fy(e, n, "left"),
	to: fy(t, n, "right")
}), my = () => ({ state: e, dispatch: t }) => {
	if (e.selection.empty) return !1;
	if (t) {
		let n = e.tr, { ranges: r } = e.selection, i = n.steps.length;
		r.forEach((t) => {
			let r = n.mapping.slice(i), { from: a, to: o } = py(n.doc.resolve(r.map(t.$from.pos)), n.doc.resolve(r.map(t.$to.pos)), e.schema);
			n.deleteRange(a, o);
		}), n.selection.empty || n.setSelection(H.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), t(n);
	}
	return !0;
}, hy = () => ({ commands: e }) => e.keyboardShortcut("Enter"), gy = () => ({ state: e, dispatch: t }) => gp(e, t);
function _y(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function vy(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return !r.length || r.every((r) => n.strict ? t[r] === e[r] : _y(t[r]) ? t[r].test(e[r]) : t[r] === e[r]);
}
function yy(e, t, n = {}) {
	return e.find((e) => e.type === t && vy(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function by(e, t, n = {}) {
	return !!yy(e, t, n);
}
function xy(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if (r.node && r.node.marks.some((e) => e.type === t) || (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t)) return;
	if (!n) {
		let e = r.node.marks.find((e) => e.type === t);
		e && (n = e.attrs);
	}
	if (!yy([...r.node.marks], t, n)) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && by([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && by([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function Sy(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
var Cy = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = Sy(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
	if (i) {
		let e = xy(c, a, t);
		if (e && e.from <= l && e.to >= u) {
			let t = H.create(o, e.from, e.to);
			n.setSelection(t);
		}
	}
	return !0;
}, wy = (e) => (t) => {
	let n = typeof e == "function" ? e(t) : e;
	for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
	return !1;
};
function Ty(e) {
	return e instanceof H;
}
function Ey(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function Dy(e, t = null) {
	if (!t) return null;
	let n = V.atStart(e), r = V.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? H.create(e, Ey(0, i, a), Ey(e.content.size, i, a)) : H.create(e, Ey(t, i, a), Ey(t, i, a));
}
function Oy() {
	return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function ky() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Ay() {
	return typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
var jy = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
	t = {
		scrollIntoView: !0,
		...t
	};
	let o = () => {
		(ky() || Oy()) && r.dom.focus(), Ay() && !ky() && !Oy() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
			n.isDestroyed || (r.focus(), t?.scrollIntoView && n.commands.scrollIntoView());
		});
	};
	try {
		if (r.hasFocus() && e === null || e === !1) return !0;
	} catch {
		return !1;
	}
	if (a && e === null && !Ty(n.state.selection)) return o(), !0;
	let s = Dy(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
	return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, My = (e, t) => (n) => e.every((e, r) => t(e, {
	...n,
	index: r
})), Ny = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
	from: n.selection.from,
	to: n.selection.to
}, e, t), Py = (e) => {
	let t = e.childNodes;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && Py(r);
	}
	return e;
};
function Fy(e) {
	if (typeof window > "u") throw Error("[tiptap error]: there is no window object available, so this function cannot be used");
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return Py(n);
}
function Iy(e) {
	return typeof e?.nodesBetween == "function";
}
function Ly(e, t, n) {
	if (Iy(e)) return e;
	let r = typeof e == "object" && !!e;
	n = {
		slice: !0,
		parseOptions: {},
		...n
	};
	let i = typeof e == "string";
	if (r) try {
		if (Array.isArray(e) && e.length > 0) return R.fromArray(e.map((e) => t.nodeFromJSON(e)));
		let r = t.nodeFromJSON(e);
		return n.errorOnInvalidContent && r.check(), r;
	} catch (r) {
		if (n.errorOnInvalidContent) throw Error("[tiptap error]: Invalid JSON content", { cause: r });
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), Ly("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new Vu({
				topNode: t.spec.topNode,
				marks: t.spec.marks,
				nodes: t.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
					content: "inline*",
					group: "block",
					parseDOM: [{
						tag: "*",
						getAttrs: (e) => (r = !0, i = typeof e == "string" ? e : e.outerHTML, null)
					}]
				} })
			});
			if (n.slice ? Gu.fromSchema(a).parseSlice(Fy(e), n.parseOptions) : Gu.fromSchema(a).parse(Fy(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = Gu.fromSchema(t);
		return n.slice ? r.parseSlice(Fy(e), n.parseOptions).content : r.parse(Fy(e), n.parseOptions);
	}
	return Ly("", t, n);
}
function Ry(e) {
	return !("type" in e);
}
function zy(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Pd || i instanceof Fd)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(V.near(e.doc.resolve(o), n));
}
var By = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
	if (i) {
		n = {
			parseOptions: a.options.parseOptions,
			updateSelection: !0,
			applyInputRules: !1,
			applyPasteRules: !1,
			...n
		};
		let i, o = (e) => {
			a.emit("contentError", {
				editor: a,
				error: e,
				disableCollaboration: () => {
					"collaboration" in a.storage && typeof a.storage.collaboration == "object" && a.storage.collaboration && (a.storage.collaboration.isDisabled = !0);
				}
			});
		}, s = {
			preserveWhitespace: "full",
			...n.parseOptions
		};
		if (!n.errorOnInvalidContent && !a.options.enableContentCheck && a.options.emitContentError) try {
			Ly(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: !0
			});
		} catch (e) {
			o(e);
		}
		try {
			i = Ly(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: n.errorOnInvalidContent ?? a.options.enableContentCheck
			});
		} catch (e) {
			return o(e), !1;
		}
		let { from: c, to: l } = typeof e == "number" ? {
			from: e,
			to: e
		} : {
			from: e.from,
			to: e.to
		}, u = !0, d = !0, f = Ry(i) ? i.content : [i];
		if (f.forEach((e) => {
			e.check(), u = u ? e.isText && e.marks.length === 0 : !1, d = d ? e.isBlock : !1;
		}), c === l && d) {
			let { parent: e } = r.doc.resolve(c);
			e.isTextblock && !e.type.spec.code && !e.childCount && (--c, l += 1);
		}
		let p;
		if (u) p = Array.isArray(t) ? t.map((e) => e.text || "").join("") : Iy(t) ? f.map((e) => e.text ?? "").join("") : typeof t == "object" && t && t.text ? t.text : t, r.insertText(p, c, l);
		else {
			p = R.from(f);
			let e = r.doc.resolve(c), t = e.node(), n = e.parentOffset === 0, i = t.isText || t.isTextblock, a = t.content.size > 0;
			n && i && a && d && (c = Math.max(0, c - 1)), r.replaceWith(c, l, f);
		}
		n.updateSelection && zy(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
			from: c,
			text: p
		}), n.applyPasteRules && r.setMeta("applyPasteRules", {
			from: c,
			text: p
		});
	}
	return !0;
};
function Vy(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var Hy = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
	let { pos: i, attrs: a, content: o, updateSelection: s = !0 } = e, c;
	c = typeof i == "number" ? t.doc.resolve(i) : i || t.selection.$from;
	let l = Vy(c.parent.contentMatchAt(c.index()));
	if (!l) return !1;
	let u = Object.keys(l.spec.attrs || {}), d = a ? Object.fromEntries(Object.entries(a).filter(([e]) => u.includes(e))) : {}, f;
	if (o) {
		let e = Ly(o, r.schema);
		f = l.createAndFill(d, e);
	} else f = l.createAndFill(d);
	return f ? (n && (t.insert(c.pos, f), s && zy(t, t.steps.length - 1, -1)), !0) : !1;
}, Uy = () => ({ state: e, dispatch: t }) => dp(e, t), Wy = () => ({ state: e, dispatch: t }) => fp(e, t), Gy = () => ({ state: e, dispatch: t }) => ep(e, t), Ky = () => ({ state: e, dispatch: t }) => cp(e, t), qy = (e, t) => {
	let n = e.resolve(t), r = n.nodeBefore, i = n.nodeAfter;
	return !r || !i ? !1 : !r.type.spec.isolating && !i.type.spec.isolating;
}, Jy = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = af(e.doc, e.selection.$from.pos, -1);
		return r == null || !qy(e.doc, r) ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Yy = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = af(e.doc, e.selection.$from.pos, 1);
		return r == null || !qy(e.doc, r) ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Xy = () => ({ state: e, dispatch: t }) => tp(e, t), Zy = () => ({ state: e, dispatch: t }) => np(e, t);
function Qy() {
	return typeof navigator < "u" && /Mac/.test(navigator.platform);
}
function $y(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) ky() || Qy() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
var eb = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
	let a = $y(e).split(/-(?!$)/), o = a.find((e) => ![
		"Alt",
		"Ctrl",
		"Meta",
		"Shift"
	].includes(e)), s = new KeyboardEvent("keydown", {
		key: o === "Space" ? " " : o,
		altKey: a.includes("Alt"),
		ctrlKey: a.includes("Ctrl"),
		metaKey: a.includes("Meta"),
		shiftKey: a.includes("Shift"),
		bubbles: !0,
		cancelable: !0
	});
	return t.captureTransaction(() => {
		n.someProp("handleKeyDown", (e) => e(n, s));
	})?.steps.forEach((e) => {
		let t = e.map(r.mapping);
		t && i && r.maybeStep(t);
	}), !0;
};
function tb(e, t, n = {}) {
	let { from: r, to: i, empty: a } = e.selection, o = t ? cy(t, e.schema) : null, s = [];
	e.doc.nodesBetween(r, i, (e, t) => {
		if (e.isText) return;
		let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize);
		s.push({
			node: e,
			from: n,
			to: a
		});
	});
	let c = i - r, l = s.filter((e) => !o || o.name === e.node.type.name).filter((e) => vy(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
var nb = (e, t = {}) => ({ state: n, dispatch: r }) => tb(n, cy(e, n.schema), t) ? pp(n, r) : !1, rb = () => ({ state: e, dispatch: t }) => vp(e, t), ib = (e) => ({ state: t, dispatch: n }) => Rp(cy(e, t.schema))(t, n), ab = () => ({ state: e, dispatch: t }) => mp(e, t);
function ob(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function sb(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
var cb = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = ob(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = cy(e, r.schema)), s === "mark" && (o = Sy(e, r.schema));
	let c = !1;
	return n.selection.ranges.forEach((e) => {
		r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
			a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, sb(e.attrs, t))), o && e.marks.length && e.marks.forEach((a) => {
				o === a.type && (c = !0, i && n.addMark(r, r + e.nodeSize, o.create(sb(a.attrs, t))));
			});
		});
	}), c;
}, lb = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), ub = () => ({ tr: e, dispatch: t }) => {
	if (t) {
		let t = new Ff(e.doc);
		e.setSelection(t);
	}
	return !0;
}, db = () => ({ state: e, dispatch: t }) => ap(e, t), fb = () => ({ state: e, dispatch: t }) => lp(e, t), pb = () => ({ state: e, dispatch: t }) => xp(e, t), mb = () => ({ state: e, dispatch: t }) => Dp(e, t), hb = () => ({ state: e, dispatch: t }) => Ep(e, t);
function gb(e, t, n = {}, r = {}) {
	return Ly(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
var _b = (e, { errorOnInvalidContent: t, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
	let { doc: c } = a;
	if (r.preserveWhitespace !== "full") {
		let s = gb(e, i.schema, r, { errorOnInvalidContent: t ?? i.options.enableContentCheck });
		if (o) {
			let e = Ry(s) ? s.content : [s];
			a.replaceWith(0, c.content.size, e).setMeta("preventUpdate", !n);
		}
		return !0;
	}
	return o && a.setMeta("preventUpdate", !n), s.insertContentAt({
		from: 0,
		to: c.content.size
	}, e, {
		parseOptions: r,
		errorOnInvalidContent: t ?? i.options.enableContentCheck
	});
};
function vb(e, t) {
	let n = Sy(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function yb(e, t) {
	let n = new Of(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function bb(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function xb(e, t) {
	for (let n = e.depth; n > 0; --n) {
		let r = e.node(n);
		if (t(r)) return {
			pos: n > 0 ? e.before(n) : 0,
			start: e.start(n),
			depth: n,
			node: r
		};
	}
}
function Sb(e) {
	return (t) => xb(t.$from, e);
}
function q(e, t, n) {
	return e.config[t] === void 0 && e.parent ? q(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
		...n,
		parent: e.parent ? q(e.parent, t, n) : null
	}) : e.config[t];
}
function Cb(e) {
	return e.map((e) => {
		let t = q(e, "addExtensions", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		return t ? [e, ...Cb(t())] : e;
	}).flat(10);
}
function wb(e, t) {
	let n = ad.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
function Tb(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = n.get(t.type) ?? /* @__PURE__ */ new Map();
		e.set(t.name, t), n.set(t.type, e);
	}
	return [...Object.values(t.nodes), ...Object.values(t.marks)].flatMap((e) => Object.entries(e.spec.attrs ?? {}).map(([t, r]) => {
		let i = n.get(e.name)?.get(t), a = Object.hasOwn(r, "default");
		return {
			type: e.name,
			name: t,
			attribute: {
				rendered: !0,
				renderHTML: null,
				parseHTML: null,
				keepOnSplit: !0,
				...i?.attribute,
				default: r.default,
				isRequired: !a,
				validate: r.validate
			}
		};
	}));
}
var Eb = {
	content: "string",
	marks: "string",
	group: "string",
	inline: "boolean",
	atom: "boolean",
	selectable: "boolean",
	draggable: "boolean",
	code: "boolean",
	whitespace: ["pre", "normal"],
	definingAsContext: "boolean",
	definingForContent: "boolean",
	defining: "boolean",
	isolating: "boolean",
	linebreakReplacement: "boolean"
}, Db = {
	inclusive: "boolean",
	excludes: "string",
	group: "string",
	spanning: "boolean",
	code: "boolean"
};
function Ob(e, t, n) {
	return Object.fromEntries(Object.entries(t).flatMap(([t, r]) => {
		let i = e[t];
		if (i === void 0) return [];
		if (!(typeof r == "string" ? typeof i === r : typeof i == "string" && r.includes(i))) throw RangeError(`Invalid schemaSpec field '${n}.${t}'`);
		return [[t, i]];
	}));
}
function kb(e, t, n, r) {
	return {
		...Object.fromEntries(Object.entries(t).filter(([e]) => e !== "attrs" && !Object.hasOwn(r, e))),
		...Ob(n, r, e),
		attrs: n.attrs
	};
}
function Ab(e, t, n) {
	for (let r of Object.keys(t)) if (!Object.hasOwn(e, r)) throw RangeError(`schemaSpec requires a local ${n} extension named '${r}'`);
	for (let r of Object.keys(e)) if (!Object.hasOwn(t, r)) throw RangeError(`Local ${n} extension '${r}' is not in schemaSpec`);
}
function jb(e, t) {
	Ab(e.nodes, t.nodes, "node"), Ab(e.marks, t.marks, "mark");
	let n = t.spec.nodes, r = t.spec.marks;
	return t.spec.nodes.forEach((t, r) => {
		n = n.update(t, kb(t, e.nodes[t], r, Eb));
	}), t.spec.marks.forEach((t, n) => {
		r = r.update(t, kb(t, e.marks[t], n, Db));
	}), {
		topNode: t.topNodeType.name,
		nodes: n,
		marks: r
	};
}
function Mb(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
function Nb(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function Pb(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = Nb(e), i = [...n, ...r], a = {
		default: null,
		validate: void 0,
		rendered: !0,
		renderHTML: null,
		parseHTML: null,
		keepOnSplit: !0,
		isRequired: !1
	}, o = n.filter((e) => e.name !== "text").map((e) => e.name), s = r.map((e) => e.name), c = [...o, ...s];
	return e.forEach((e) => {
		let n = q(e, "addGlobalAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage,
			extensions: i
		});
		n && n().forEach((e) => {
			let n;
			n = Array.isArray(e.types) ? e.types : e.types === "*" ? c : e.types === "nodes" ? o : e.types === "marks" ? s : [], n.forEach((n) => {
				Object.entries(e.attributes).forEach(([e, r]) => {
					t.push({
						type: n,
						name: e,
						attribute: {
							...a,
							...r
						}
					});
				});
			});
		});
	}), i.forEach((e) => {
		let n = q(e, "addAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		if (!n) return;
		let r = n();
		Object.entries(r).forEach(([n, r]) => {
			let i = {
				...a,
				...r
			};
			typeof i?.default == "function" && (i.default = i.default()), i?.isRequired && i?.default === void 0 && delete i.default, t.push({
				type: e.name,
				name: n,
				attribute: i
			});
		});
	}), t;
}
function Fb(e) {
	return typeof e == "function";
}
function J(e, t = void 0, ...n) {
	return Fb(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function Ib(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function Lb(e) {
	let t = [], n = "", r = !1, i = !1, a = 0, o = e.length;
	for (let s = 0; s < o; s += 1) {
		let o = e[s];
		if (o === "'" && !i) r = !r, n += o;
		else if (o === "\"" && !r) i = !i, n += o;
		else {
			if (!r && !i) {
				if (o === "(") {
					a += 1, n += o;
					continue;
				}
				if (o === ")" && a > 0) {
					--a, n += o;
					continue;
				}
				if (o === ";" && a === 0) {
					t.push(n), n = "";
					continue;
				}
			}
			n += o;
		}
	}
	return n && t.push(n), t;
}
function Rb(e) {
	let t = [], n = Lb(e || ""), r = n.length;
	for (let e = 0; e < r; e += 1) {
		let r = n[e], i = r.indexOf(":");
		if (i === -1) continue;
		let a = r.slice(0, i).trim(), o = r.slice(i + 1).trim();
		a && o && t.push([a, o]);
	}
	return t;
}
function Y(...e) {
	return e.filter((e) => !!e).reduce((e, t) => {
		let n = { ...e };
		return Object.entries(t).forEach(([e, t]) => {
			if (e === "__proto__") Object.defineProperty(n, e, {
				configurable: !0,
				enumerable: !0,
				value: t,
				writable: !0
			});
			else if (!n[e]) n[e] = t;
			else if (e === "class") {
				let r = t ? String(t).split(" ") : [], i = n[e] ? n[e].split(" ") : [], a = r.filter((e) => !i.includes(e));
				n[e] = [...i, ...a].join(" ");
			} else if (e === "style") {
				let r = new Map([...Rb(n[e]), ...Rb(t)]);
				n[e] = Array.from(r.entries()).map(([e, t]) => `${e}: ${t}`).join("; ");
			} else n[e] = t;
		}), n;
	}, {});
}
function zb(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => Y(e, t), {});
}
function Bb(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" || e !== "false" && e : e;
}
function Vb(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : Bb(n.getAttribute(t.name));
				return r == null ? e : {
					...e,
					[t.name]: r
				};
			}, {});
			return {
				...r,
				...i
			};
		}
	};
}
function Hb(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && Ib(t) ? !1 : t != null));
}
function Ub(e) {
	var t, n;
	let r = {};
	return !(e != null && (t = e.attribute) != null && t.isRequired) && "default" in (e?.attribute || {}) && (r.default = e.attribute.default), (e == null || (n = e.attribute) == null ? void 0 : n.validate) !== void 0 && (r.validate = e.attribute.validate), [e.name, r];
}
function Wb(e, t, n = Pb(e)) {
	let { nodeExtensions: r, markExtensions: i } = Nb(e);
	return {
		topNode: r.find((e) => q(e, "topNode"))?.name,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Hb({
				...e.reduce((e, t) => {
					let n = q(t, "extendNodeSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				content: J(q(r, "content", a)),
				marks: J(q(r, "marks", a)),
				group: J(q(r, "group", a)),
				inline: J(q(r, "inline", a)),
				atom: J(q(r, "atom", a)),
				selectable: J(q(r, "selectable", a)),
				draggable: J(q(r, "draggable", a)),
				code: J(q(r, "code", a)),
				whitespace: J(q(r, "whitespace", a)),
				linebreakReplacement: J(q(r, "linebreakReplacement", a)),
				defining: J(q(r, "defining", a)),
				isolating: J(q(r, "isolating", a)),
				attrs: Object.fromEntries(i.map(Ub))
			}), s = J(q(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => Vb(e, i)));
			let c = q(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: zb(e, i)
			}));
			let l = q(r, "renderText", a);
			return l && (o.toText = l), [r.name, o];
		})),
		marks: Object.fromEntries(i.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Hb({
				...e.reduce((e, t) => {
					let n = q(t, "extendMarkSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				inclusive: J(q(r, "inclusive", a)),
				excludes: J(q(r, "excludes", a)),
				group: J(q(r, "group", a)),
				spanning: J(q(r, "spanning", a)),
				code: J(q(r, "code", a)),
				attrs: Object.fromEntries(i.map(Ub))
			}), s = J(q(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => Vb(e, i)));
			let c = q(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: zb(e, i)
			})), [r.name, o];
		}))
	};
}
function Gb(e, t, n) {
	if (n === void 0) return new Vu(Wb(e, t));
	let r = Mb(e.filter((e) => e.type !== "extension").map((e) => e.name));
	if (r.length) throw RangeError(`Duplicate local schema types: ${r.join(", ")}`);
	let i = new Vu(n);
	return new Vu(jb(Wb(e, t, Tb(Pb(e), i)), i));
}
function Kb(e) {
	return e.sort((e, t) => {
		let n = q(e, "priority") || 100, r = q(t, "priority") || 100;
		return n > r ? -1 : +(n < r);
	});
}
function qb(e) {
	let t = Kb(Cb(e)), n = Mb(t.map((e) => e.name));
	return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((e) => `'${e}'`).join(", ")}]. This can lead to issues.`), t;
}
function Jb(e, t, n) {
	let { from: r, to: i } = t, { blockSeparator: a = "\n\n", textSerializers: o = {} } = n || {}, s = "";
	return e.nodesBetween(r, i, (e, n, c, l) => {
		e.isBlock && n > r && (s += a);
		let u = o?.[e.type.name];
		if (u) return c && (s += u({
			node: e,
			pos: n,
			parent: c,
			index: l,
			range: t
		})), !1;
		if (e.isText) {
			var d;
			s += e == null || (d = e.text) == null ? void 0 : d.slice(Math.max(r, n) - n, i - n);
		}
	}), s;
}
function Yb(e, t) {
	return Jb(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function Xb(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Zb(e, t) {
	let n = cy(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function Qb(e, t) {
	let n = ob(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? Zb(e, t) : n === "mark" ? vb(e, t) : {};
}
function $b(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function ex(e) {
	let t = $b(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function tx(e) {
	let { mapping: t, steps: n } = e, r = [];
	return t.maps.forEach((e, i) => {
		let a = [];
		if (e.ranges.length) e.forEach((e, t) => {
			a.push({
				from: e,
				to: t
			});
		});
		else {
			let { from: e, to: t } = n[i];
			if (e === void 0 || t === void 0) return;
			a.push({
				from: e,
				to: t
			});
		}
		a.forEach(({ from: e, to: n }) => {
			let a = t.slice(i).map(e, -1), o = t.slice(i).map(n), s = t.invert().map(a, -1), c = t.invert().map(o);
			r.push({
				oldRange: {
					from: s,
					to: c
				},
				newRange: {
					from: a,
					to: o
				}
			});
		});
	}), ex(r);
}
function nx(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = xy(n.resolve(e), t.type);
		i && r.push({
			mark: t,
			...i
		});
	}) : n.nodesBetween(e, t, (e, t) => {
		e && e?.nodeSize !== void 0 && r.push(...e.marks.map((n) => ({
			from: t,
			to: t + e.nodeSize,
			mark: n
		})));
	}), r;
}
var rx = (e, t, n, r = 20) => {
	let i = e.doc.resolve(n), a = r, o = null;
	for (; a > 0 && o === null;) {
		let e = i.node(a);
		e?.type.name === t ? o = e : --a;
	}
	return [o, a];
}, ix = (e) => {
	let t = e.depth - 1;
	if (t < 0) return null;
	let n = e.index(t);
	return n === 0 ? null : e.node(t).child(n - 1);
};
function ax(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function ox(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
var sx = (e, t = 500) => {
	let n = "", r = e.parentOffset;
	return e.parent.nodesBetween(Math.max(0, r - t), r, (e, t, i, a) => {
		var o;
		let s = (o = e.type.spec).toText?.call(o, {
			node: e,
			pos: t,
			parent: i,
			index: a
		}) || e.textContent || "%leaf%";
		n += e.isAtom && !e.isText ? s : s.slice(0, Math.max(0, r - t));
	}), n;
};
function cx(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? Sy(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => !a || a.name === e.type.name).find((e) => vy(e.attrs, n, { strict: !1 }));
	let o = 0, s = [];
	if (i.forEach(({ $from: t, $to: n }) => {
		let r = t.pos, i = n.pos;
		e.doc.nodesBetween(r, i, (e, t) => {
			if (a && e.inlineContent && !e.type.allowsMarkType(a)) return !1;
			if (!e.isText && !e.marks.length) return;
			let n = Math.max(r, t), c = Math.min(i, t + e.nodeSize), l = c - n;
			o += l, s.push(...e.marks.map((e) => ({
				mark: e,
				from: n,
				to: c
			})));
		});
	}), o === 0) return !1;
	let c = s.filter((e) => !a || a.name === e.mark.type.name).filter((e) => vy(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => !a || e.mark.type !== a && e.mark.type.excludes(a)).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function lx(e, t, n = {}) {
	if (!t) return tb(e, null, n) || cx(e, null, n);
	let r = ob(t, e.schema);
	return r === "node" ? tb(e, t, n) : r === "mark" && cx(e, t, n);
}
var ux = (e, t) => {
	let { $from: n, $to: r, $anchor: i } = e.selection;
	if (t) {
		let n = Sb((e) => e.type.name === t)(e.selection);
		if (!n) return !1;
		let r = e.doc.resolve(n.pos + 1);
		return i.pos + 1 === r.end();
	}
	return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, dx = (e) => {
	let { $from: t, $to: n } = e.selection;
	return !(t.parentOffset > 0 || t.pos !== n.pos);
};
function fx(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function px(e, t) {
	let { nodeExtensions: n } = Nb(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = J(q(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" && i.split(" ").includes("list");
}
function mx(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
	if (n) {
		if (e.type.name === "hardBreak") return !0;
		if (e.isText) return !/\S/.test(e.text ?? "");
	}
	if (e.isText) return !e.text;
	if (e.isAtom || e.isLeaf) return !1;
	if (e.content.childCount === 0) return !0;
	if (t) {
		let r = !0;
		return e.content.forEach((e) => {
			r !== !1 && (mx(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function hx(e) {
	return e instanceof U;
}
function gx(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.apply == "function" && typeof t.getMap == "function" && typeof t.invert == "function" && typeof t.map == "function" && typeof t.merge == "function" && typeof t.toJSON == "function";
}
function _x(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	if (!gx(t)) return !1;
	let n = t.toJSON();
	return !(typeof n != "object" || !n || n.stepType !== "replace");
}
var vx = class e {
	constructor(e) {
		this.position = e;
	}
	static fromJSON(t) {
		return new e(t.position);
	}
	toJSON() {
		return { position: this.position };
	}
};
function yx(e, t) {
	let n = t.mapping.mapResult(e.position);
	return {
		position: new vx(n.pos),
		mapResult: n
	};
}
function bx(e) {
	return new vx(e);
}
function xx(e, t, n) {
	let { selection: r } = t, i = null;
	if (Ty(r) && (i = r.$cursor), i) {
		let t = e.storedMarks ?? i.marks();
		return i.parent.type.allowsMarkType(n) && (!!n.isInSet(t) || !t.some((e) => e.type.excludes(n)));
	}
	let { ranges: a } = r;
	return a.some(({ $from: t, $to: r }) => {
		let i = t.depth === 0 && e.doc.inlineContent && e.doc.type.allowsMarkType(n);
		return e.doc.nodesBetween(t.pos, r.pos, (e, t, r) => {
			if (i) return !1;
			if (e.isInline) {
				let t = !r || r.type.allowsMarkType(n), a = !!n.isInSet(e.marks) || !e.marks.some((e) => e.type.excludes(n));
				i = t && a;
			}
			return !i;
		}), i;
	});
}
var Sx = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = n, { empty: o, ranges: s } = a, c = Sy(e, r.schema);
	if (i) {
		if (o) {
			let e = vb(r, c);
			n.addStoredMark(c.create({
				...e,
				...t
			}));
		} else s.forEach((e) => {
			let i = e.$from.pos, a = e.$to.pos;
			r.doc.nodesBetween(i, a, (e, r) => {
				let o = Math.max(r, i), s = Math.min(r + e.nodeSize, a);
				e.marks.find((e) => e.type === c) ? e.marks.forEach((e) => {
					c === e.type && n.addMark(o, s, c.create({
						...e.attrs,
						...t
					}));
				}) : n.addMark(o, s, c.create(t));
			});
		});
	}
	return xx(r, n, c);
}, Cx = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), wx = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
	let a = cy(e, n.schema), o;
	return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => kp(a, {
		...o,
		...t
	})(n) ? !0 : e.clearNodes()).command(({ state: e }) => kp(a, {
		...o,
		...t
	})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
}, Tx = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, r = Ey(e, 0, n.content.size), i = U.create(n, r);
		t.setSelection(i);
	}
	return !0;
}, Ex = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = r, o, s;
	return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = a.from, s = a.to), i && n.doc.nodesBetween(o, s, (t, r) => {
		t.isText || n.setNodeMarkup(r, void 0, {
			...t.attrs,
			dir: e
		});
	}), !0;
}, Dx = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
			from: e,
			to: e
		} : e, a = H.atStart(n).from, o = H.atEnd(n).to, s = Ey(r, a, o), c = Ey(i, a, o), l = H.create(n, s, c);
		t.setSelection(l);
	}
	return !0;
}, Ox = (e) => ({ state: t, dispatch: n }) => Vp(cy(e, t.schema))(t, n);
function kx(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
var Ax = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
	let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = ox(l, s.node().type.name, s.node().attrs);
	if (a instanceof U && a.node.isBlock) return !s.parentOffset || !$d(o, s.pos) ? !1 : (r && (e && kx(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
	if (!s.parent.isBlock) return !1;
	let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : Vy(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
		type: f,
		attrs: u
	}] : void 0, m = a instanceof H && !a.empty ? qf.create({
		doc: t.doc,
		selection: a
	}).tr.deleteSelection() : null, h = m ? m.doc : t.doc, g = m ? m.mapping.map(s.pos) : s.pos, _ = $d(h, g, 1, p);
	if (!p && !_ && $d(h, g, 1, f ? [{ type: f }] : void 0) && (_ = !0, p = f ? [{
		type: f,
		attrs: u
	}] : void 0), r) {
		if (_) {
			let e = t.steps.length;
			if (a instanceof H && t.deleteSelection(), t.split(t.mapping.slice(e).map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f) {
				let n = t.mapping.slice(e).map(s.before()), r = t.doc.resolve(n);
				s.node(-1).canReplaceWith(r.index(), r.index() + 1, f) && t.setNodeMarkup(t.mapping.slice(e).map(s.before()), f);
			}
		}
		e && kx(n, i.extensionManager.splittableMarks), t.scrollIntoView();
	}
	return _;
}, jx = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
	let o = cy(e, r.schema), { $from: s, $to: c } = r.selection, l = r.selection.node;
	if (l && l.isBlock || s.depth < 2 || !s.sameParent(c)) return !1;
	let u = s.node(-1);
	if (u.type !== o) return !1;
	let d = a.extensionManager.attributes;
	if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
		if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
		if (i) {
			let e = R.empty, r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
			for (let t = s.depth - r; t >= s.depth - 3; --t) e = R.from(s.node(t).copy(e));
			let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, a = {
				...ox(d, s.node().type.name, s.node().attrs),
				...t
			}, c = o.contentMatch.defaultType?.createAndFill(a) || void 0;
			e = e.append(R.from(o.createAndFill(null, c) || void 0));
			let l = s.before(s.depth - (r - 1));
			n.replace(l, s.after(-i), new B(e, 4 - r, 0));
			let u = -1;
			n.doc.nodesBetween(l, n.doc.content.size, (e, t) => {
				if (u > -1) return !1;
				e.isTextblock && e.content.size === 0 && (u = t + 1);
			}), u > -1 && n.setSelection(H.near(n.doc.resolve(u))), n.scrollIntoView();
		}
		return !0;
	}
	let f = c.pos === s.end() ? u.contentMatchAt(0).defaultType : null, p = {
		...ox(d, u.type.name, u.attrs),
		...t
	}, m = {
		...ox(d, s.node().type.name, s.node().attrs),
		...t
	}, h = s.parentOffset === 0 && s.index(-1) === 0, g = s.before(-1);
	n.delete(s.pos, c.pos);
	let _ = h ? u.attrs : p, v = f ? [{
		type: o,
		attrs: _
	}, {
		type: f,
		attrs: m
	}] : [{
		type: o,
		attrs: _
	}];
	if (!$d(n.doc, s.pos, 2)) return !1;
	if (i) {
		let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
		if (n.split(s.pos, 2, v).scrollIntoView(), h && n.setNodeMarkup(g, void 0, p), !c || !i) return !0;
		let l = c.filter((e) => o.includes(e.type.name));
		n.ensureMarks(l);
	}
	return !0;
};
function Mx(e, t, n) {
	if (!e.validContent(t)) return null;
	try {
		return e.create(n, t);
	} catch {
		return null;
	}
}
function Nx(e, t) {
	if (e.pendingContent.length === 0) return !0;
	let n = Mx(t, R.from(e.pendingContent));
	return n ? (e.items.push(n), e.pendingContent = [], !0) : !1;
}
function Px(e, t, n) {
	return n.validContent(R.from([...t.pendingContent, e])) ? (t.pendingContent.push(e), !0) : !Nx(t, n) || !n.validContent(R.from(e)) ? !1 : (t.pendingContent.push(e), !0);
}
function Fx(e, t, n, r) {
	let i = r(e, n);
	if (!i) return !1;
	let a = Mx(n.listType, R.from(i), e.attrs);
	return a ? n.itemType.validContent(R.from([...t.pendingContent, a])) ? (t.pendingContent.push(a), !0) : Nx(t, n.itemType) ? (t.items.push(...i), !0) : !1 : !1;
}
function Ix(e, t, n) {
	let r = {
		items: [],
		pendingContent: []
	};
	for (let i = 0; i < e.childCount; i += 1) {
		let a = e.child(i);
		if (!(t.isListNode(a) ? Fx(a, r, t, n) : Px(a, r, t.itemType))) return null;
	}
	return Nx(r, t.itemType) ? r.items : null;
}
function Lx(e, t) {
	let n = [];
	for (let r = 0; r < e.childCount; r += 1) {
		let i = Ix(e.child(r), t, Lx);
		if (!i) return null;
		n.push(...i);
	}
	return n;
}
function Rx(e, t) {
	let n = null;
	return e.descendants((e, r) => e !== t || (n = r, !1)), n;
}
function zx(e) {
	return !e || e === "1" ? null : e;
}
function Bx(e, t) {
	return zx(e) === zx(t);
}
var Vx = (e, t) => {
	let n = Sb((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return !(n.node.type === i?.type && tf(e.doc, n.pos)) || !Bx(n.node.attrs.type, i?.attrs.type) || e.join(n.pos), !0;
}, Hx = (e, t) => {
	let n = Sb((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(n.start).after(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return !(n.node.type === i?.type && tf(e.doc, r)) || !Bx(n.node.attrs.type, i?.attrs.type) || e.join(r), !0;
};
function Ux(e) {
	let t = e.doc, n = t.firstChild;
	if (!n) return null;
	let r = t.resolve(1), i = t.resolve(n.nodeSize - 1);
	return H.between(r, i);
}
var Wx = (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
	let { extensions: d, splittableMarks: f } = i.extensionManager, p = cy(e, o.schema), m = cy(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: v } = h, y = _.blockRange(v), b = g || h.$to.parentOffset && h.$from.marks();
	if (!y) return !1;
	let x = Sb((e) => px(e.type.name, d))(h), S = h.from === 0 && h.to === o.doc.content.size, C = o.doc.content.content, w = C.length === 1 ? C[0] : null, T = S && w && px(w.type.name, d) ? {
		node: w,
		pos: 0,
		depth: 0
	} : null, E = x ?? T, ee = !!x && y.depth >= 1 && y.depth - x.depth <= 1, te = !!T;
	if ((ee || te) && E) {
		if (E.node.type === p) return S && te ? c().command(({ tr: e, dispatch: t }) => {
			let n = Ux(e);
			return n ? (e.setSelection(n), t && t(e), !0) : !1;
		}).liftListItem(m).run() : l.liftListItem(m);
		if (px(E.node.type.name, d) && p.validContent(E.node.content)) return c().command(() => (a.setNodeMarkup(E.pos, p), !0)).command(() => Vx(a, p)).command(() => Hx(a, p)).run();
		if (px(E.node.type.name, d)) {
			let e = E.node.firstChild?.type;
			if (e && e !== m) {
				let e = Lx(E.node, {
					listType: p,
					itemType: m,
					isListNode: (e) => px(e.type.name, d)
				}), t = e ? R.from(e) : null;
				return !t || !p.validContent(t) ? !1 : c().command(() => {
					let { $anchor: e, $head: n } = a.selection, i = e.parent, o = n.parent, s = e.parentOffset, c = n.parentOffset, l;
					try {
						l = p.create(r, t);
					} catch {
						return !1;
					}
					if (a.replaceWith(E.pos, E.pos + E.node.nodeSize, l), i.inlineContent && o.inlineContent) {
						let e = Rx(l, i), t = Rx(l, o);
						if (e !== null && t !== null) {
							let n = E.pos + e + 2 + s, r = E.pos + t + 2 + c;
							a.setSelection(H.create(a.doc, n, r));
						}
					}
					return !0;
				}).command(() => Vx(a, p)).command(() => Hx(a, p)).run();
			}
		}
	}
	return !n || !b || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => Vx(a, p)).command(() => Hx(a, p)).run() : c().command(() => {
		let e = u().wrapInList(p, r), t = b.filter((e) => f.includes(e.type.name));
		return a.ensureMarks(t), e ? !0 : l.clearNodes();
	}).wrapInList(p, r).command(() => Vx(a, p)).command(() => Hx(a, p)).run();
}, Gx = (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
	let { extendEmptyMarkRange: a = !1 } = n, o = Sy(e, r.schema);
	return cx(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
}, Kx = (e, t, n = {}) => ({ state: r, commands: i }) => {
	let a = cy(e, r.schema), o = cy(t, r.schema), s = tb(r, a, n), c;
	return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
		...c,
		...n
	});
}, qx = (e, t = {}) => ({ state: n, commands: r }) => {
	let i = cy(e, n.schema);
	return tb(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
}, Jx = () => ({ state: e, dispatch: t }) => {
	let n = e.plugins;
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r], a;
		if (i.spec.isInputRules && (a = i.getState(e))) {
			if (t) {
				let t = e.tr, n = a.transform;
				for (let e = n.steps.length - 1; e >= 0; --e) t.step(n.steps[e].invert(n.docs[e]));
				if (a.text) {
					let n = t.doc.resolve(a.from).marks();
					t.replaceWith(a.from, a.to, e.schema.text(a.text, n));
				} else t.delete(a.from, a.to);
			}
			return !0;
		}
	}
	return !1;
}, Yx = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
	let { ignoreClearable: i = !1 } = e, { selection: a } = t, { empty: o, ranges: s } = a;
	if (o) return !0;
	let { nonClearableMarks: c } = r.extensionManager;
	if (n) {
		let e = Object.values(r.schema.marks).filter((e) => i || !c.includes(e.name));
		s.forEach((n) => {
			for (let r of e) t.removeMark(n.$from.pos, n.$to.pos, r);
		});
	}
	return !0;
}, Xx = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = Sy(e, r.schema), { $from: c, empty: l, ranges: u } = o;
	if (!i) return !0;
	if (l && a) {
		let { from: e, to: t } = o, r = xy(c, s, c.marks().find((e) => e.type === s)?.attrs);
		r && (e = r.from, t = r.to), n.removeMark(e, t, s);
	} else u.forEach((e) => {
		n.removeMark(e.$from.pos, e.$to.pos, s);
	});
	return n.removeStoredMark(s), !0;
}, Zx = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let { selection: i } = n, a, o;
	return typeof e == "number" ? (a = e, o = e) : e && "from" in e && "to" in e ? (a = e.from, o = e.to) : (a = i.from, o = i.to), r && t.doc.nodesBetween(a, o, (e, n) => {
		if (e.isText) return;
		let r = { ...e.attrs };
		delete r.dir, t.setNodeMarkup(n, void 0, r);
	}), !0;
}, Qx = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = ob(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = cy(e, r.schema)), s === "mark" && (o = Sy(e, r.schema));
	let c = !1;
	return n.selection.ranges.forEach((e) => {
		let s = e.$from.pos, l = e.$to.pos, u, d, f, p;
		n.selection.empty ? r.doc.nodesBetween(s, l, (e, t) => {
			a && a === e.type && (c = !0, f = Math.max(t, s), p = Math.min(t + e.nodeSize, l), u = t, d = e);
		}) : r.doc.nodesBetween(s, l, (e, r) => {
			r < s && a && a === e.type && (c = !0, f = Math.max(r, s), p = Math.min(r + e.nodeSize, l), u = r, d = e), r >= s && r <= l && (a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, {
				...e.attrs,
				...t
			})), o && e.marks.length && e.marks.forEach((a) => {
				if (o === a.type && (c = !0, i)) {
					let i = Math.max(r, s), c = Math.min(r + e.nodeSize, l);
					n.addMark(i, c, o.create({
						...a.attrs,
						...t
					}));
				}
			}));
		}), d && (u !== void 0 && i && n.setNodeMarkup(u, void 0, {
			...d.attrs,
			...t
		}), o && d.marks.length && d.marks.forEach((e) => {
			o === e.type && i && n.addMark(f, p, o.create({
				...e.attrs,
				...t
			}));
		}));
	}), c;
}, $x = new Zf("__tiptap_decorations__"), eS = (e) => ({ tr: t, dispatch: n }) => (n && t.setMeta($x, {
	type: "force",
	name: e
}), !0), tS = (e, t = {}) => ({ state: n, dispatch: r }) => Op(cy(e, n.schema), t)(n, r), nS = (e, t = {}) => ({ state: n, dispatch: r }) => Fp(cy(e, n.schema), t)(n, r), rS = /* @__PURE__ */ Hl({
	blur: () => ty,
	clearContent: () => ny,
	clearNodes: () => ry,
	command: () => iy,
	createParagraphNear: () => ay,
	cut: () => oy,
	deleteCurrentNode: () => sy,
	deleteNode: () => ly,
	deleteRange: () => uy,
	deleteSelection: () => my,
	enter: () => hy,
	exitCode: () => gy,
	extendMarkRange: () => Cy,
	first: () => wy,
	focus: () => jy,
	forEach: () => My,
	insertContent: () => Ny,
	insertContentAt: () => By,
	insertDefaultBlock: () => Hy,
	joinBackward: () => Gy,
	joinDown: () => Wy,
	joinForward: () => Ky,
	joinItemBackward: () => Jy,
	joinItemForward: () => Yy,
	joinTextblockBackward: () => Xy,
	joinTextblockForward: () => Zy,
	joinUp: () => Uy,
	keyboardShortcut: () => eb,
	lift: () => nb,
	liftEmptyBlock: () => rb,
	liftListItem: () => ib,
	newlineInCode: () => ab,
	resetAttributes: () => cb,
	scrollIntoView: () => lb,
	selectAll: () => ub,
	selectNodeBackward: () => db,
	selectNodeForward: () => fb,
	selectParentNode: () => pb,
	selectTextblockEnd: () => mb,
	selectTextblockStart: () => hb,
	setContent: () => _b,
	setMark: () => Sx,
	setMeta: () => Cx,
	setNode: () => wx,
	setNodeSelection: () => Tx,
	setTextDirection: () => Ex,
	setTextSelection: () => Dx,
	sinkListItem: () => Ox,
	splitBlock: () => Ax,
	splitListItem: () => jx,
	toggleList: () => Wx,
	toggleMark: () => Gx,
	toggleNode: () => Kx,
	toggleWrap: () => qx,
	undoInputRule: () => Jx,
	unsetAllMarks: () => Yx,
	unsetMark: () => Xx,
	unsetTextDirection: () => Zx,
	updateAttributes: () => Qx,
	updateDecorations: () => eS,
	wrapIn: () => tS,
	wrapInList: () => nS
}), iS = /* @__PURE__ */ new WeakMap();
function aS(e, t) {
	iS.set(e, (iS.get(e) ?? 0) + 1);
	try {
		return t();
	} finally {
		let t = (iS.get(e) ?? 1) - 1;
		t > 0 ? iS.set(e, t) : iS.delete(e);
	}
}
function oS(e) {
	return iS.has(e);
}
var sS = class {
	constructor() {
		this.callbacks = {};
	}
	on(e, t) {
		return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
	}
	emit(e, ...t) {
		let n = this.callbacks[e];
		return n && n.forEach((e) => e.apply(this, t)), this;
	}
	off(e, t) {
		let n = this.callbacks[e];
		return n && (t ? this.callbacks[e] = n.filter((e) => e !== t) : delete this.callbacks[e]), this;
	}
	once(e, t) {
		let n = (...r) => {
			this.off(e, n), t.apply(this, r);
		};
		return this.on(e, n);
	}
	removeAllListeners() {
		this.callbacks = {};
	}
}, cS = typeof process < "u" && process.env.NODE_ENV !== "production";
function lS(e) {
	return e.kind === "widget";
}
function uS(e, t) {
	let n = [], r = /* @__PURE__ */ new Set();
	for (let i of e) i.kind === "widget" && lS(i) && r.add(i.key), n.push(i.toPMDecoration(t));
	return {
		decorations: n,
		widgetKeys: r
	};
}
function dS(e, t, n) {
	let { decorations: r, widgetKeys: i } = uS(t, n);
	return {
		set: K.create(e, r),
		widgetKeys: i
	};
}
function fS({ position: e, from: t, to: n, docSize: r }) {
	return e < t ? !1 : e < n || e === n && n === r;
}
function pS({ decorations: e, from: t, to: n, docSize: r, extensionName: i, warnedExtensions: a }) {
	return e.filter((e) => fS({
		position: e.anchor,
		from: t,
		to: n,
		docSize: r
	}) ? !0 : (e.anchor === n || a.has(i) || (a.add(i), console.warn(`[tiptap warn]: Extension "${i}" returned a decoration outside the requested range [${t}, ${n}). It was ignored.`)), !1));
}
function mS(e) {
	let t = e.spec?.key;
	return typeof t == "string" ? t : void 0;
}
function hS(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e.find()) {
		let e = mS(r);
		if (!e) continue;
		let i = r.spec.extensionName ?? "unknown", a = t.get(e) ?? /* @__PURE__ */ new Set();
		a.add(i), t.set(e, a), n.set(e, (n.get(e) ?? 0) + 1);
	}
	return Array.from(t, ([e, t]) => ({
		key: e,
		extensions: t
	})).filter(({ key: e }) => (n.get(e) ?? 0) > 1);
}
function gS(e) {
	return e.jsonID === "attr";
}
function _S(e) {
	let t = !1;
	if (e.getMap().forEach(() => {
		t = !0;
	}), t || gS(e)) return !0;
	let n = e;
	return typeof n.from == "number" && typeof n.to == "number";
}
function vS(e, t) {
	let n = null, r = 0, i = 0;
	for (let a = 0; a < e.childCount && !(i > t.to); a += 1) {
		let o = i + e.child(a).nodeSize;
		o >= t.from && (n === null && (n = i), r = o), i = o;
	}
	return n === null ? null : {
		from: n,
		to: r
	};
}
function yS(e, t) {
	if (e.steps.some((e) => !_S(e))) return { type: "full" };
	let n = tx(e).map(({ newRange: e }) => e);
	e.steps.forEach((t, r) => {
		if (!gS(t)) return;
		let i = e.mapping.slice(r);
		n.push({
			from: i.map(t.pos, -1),
			to: i.map(t.pos + 1)
		});
	});
	let r = [];
	for (let e of n) {
		let n = vS(t, e);
		n && r.push(n);
	}
	r.sort((e, t) => e.from - t.from);
	let i = [];
	for (let e of r) {
		let t = i[i.length - 1];
		t && e.from <= t.to ? t.to = Math.max(t.to, e.to) : i.push({ ...e });
	}
	return {
		type: "ranges",
		ranges: i
	};
}
function bS(e, t, n, r) {
	return e.map(t, n, { onRemove: (e) => {
		let t = e?.key;
		typeof t == "string" && r.delete(t);
	} });
}
function xS(e, t, n) {
	let r = t.decorationSetsByExtension[e] ?? K.empty, i = new Set(t.widgetKeysByExtension[e] ?? []);
	return {
		set: bS(r, n.mapping, n.doc, i),
		widgetKeys: i
	};
}
function SS(e, t) {
	let n = Object.values(t).flatMap((e) => e.find());
	return K.create(e, n);
}
function CS(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Object.values(e)) for (let e of n) t.add(e);
	return t;
}
function wS(e, t) {
	switch (t.update ?? "document") {
		case "document":
			if (t.createInRange) throw Error(`[tiptap error]: Extension "${e}" provides createInRange() but does not use the "changedRanges" decoration update strategy.`);
			return;
		case "changedRanges":
			if (!t.createInRange) throw Error(`[tiptap error]: Extension "${e}" uses the "changedRanges" decoration update strategy but does not provide createInRange().`);
			return;
		case "manual":
			if (t.createInRange) throw Error(`[tiptap error]: Extension "${e}" uses the "manual" decoration update strategy, which is not compatible with createInRange(). createInRange() requires the "changedRanges" strategy.`);
			if (t.shouldUpdate) throw Error(`[tiptap error]: Extension "${e}" cannot combine the "manual" decoration update strategy with shouldUpdate().`);
			return;
		default: throw Error(`[tiptap error]: Extension "${e}" uses an unknown decoration update strategy. Expected "document", "changedRanges", or "manual".`);
	}
}
function TS(e, t, n) {
	return n ? !0 : e.update === "manual" ? !1 : e.shouldUpdate ? e.shouldUpdate(t) : t.tr.docChanged;
}
var ES = /* @__PURE__ */ new Set(), DS = class {
	constructor(e) {
		this.warnedWidgetKeys = /* @__PURE__ */ new Set(), this.warnedOutOfRangeExtensions = /* @__PURE__ */ new Set(), this.handleBeforeTransaction = ({ nextState: e }) => {
			let t = $x.getState(e);
			t && this.warnDuplicateWidgetKeys(t);
		}, this.editor = e.editor, this.entries = this.resolveEntries(e.entries), this.entries.forEach(({ name: e, spec: t }) => wS(e, t)), this.plugin = this.entries.length > 0 ? this.createPlugin() : null, this.editor.on("beforeTransaction", this.handleBeforeTransaction);
	}
	destroy() {
		this.editor.off("beforeTransaction", this.handleBeforeTransaction);
	}
	liveWidgetKeys() {
		return $x.getState(this.editor.state)?.widgetKeys ?? ES;
	}
	get mountedView() {
		return this.editor.isDestroyed ? null : this.editor.view;
	}
	resolveEntries(e) {
		let t = [];
		for (let { name: n, addDecorations: r } of e) {
			let e = r();
			e && t.push({
				name: n,
				spec: e
			});
		}
		return t;
	}
	createPlugin() {
		let { editor: e, entries: t } = this;
		return new W({
			key: $x,
			state: {
				init: (e, n) => {
					let r = {}, i = {};
					for (let { name: e, spec: a } of t) {
						let { set: t, widgetKeys: o } = this.buildFullSet(e, a, n);
						r[e] = t, i[e] = o;
					}
					let a = {
						decorationSetsByExtension: r,
						widgetKeysByExtension: i,
						mergedDecorationSet: this.buildMergedSet(n.doc, r),
						widgetKeys: CS(i)
					};
					return this.warnDuplicateWidgetKeys(a), a;
				},
				apply: (n, r, i, a) => {
					let o = n.getMeta($x), s = o?.type === "force" && !o.name, c = o?.type === "force" ? o.name : void 0, l = {}, u = {}, d = /* @__PURE__ */ new Set();
					return aS(e, () => {
						for (let { name: o, spec: f } of t) {
							let t = s || c === o;
							if (!TS(f, {
								editor: e,
								tr: n,
								oldState: i,
								newState: a
							}, t)) {
								let e = xS(o, r, n);
								l[o] = e.set, u[o] = e.widgetKeys;
							} else if (f.update === "changedRanges" && n.docChanged && !t) {
								let e = this.applyChangedRangesRecompute(o, f, r, n, a);
								l[o] = e.set, u[o] = e.widgetKeys, d.add(o);
							} else {
								let { set: e, widgetKeys: t } = this.buildFullSet(o, f, a);
								l[o] = e, u[o] = t, d.add(o);
							}
						}
					}), d.size === 0 && !n.docChanged ? r : {
						decorationSetsByExtension: l,
						widgetKeysByExtension: u,
						mergedDecorationSet: this.mergeAfterApply({
							entries: t,
							previous: r,
							tr: n,
							decorationSetsByExtension: l,
							recomputedNames: d
						}),
						widgetKeys: CS(u)
					};
				}
			},
			props: { decorations(e) {
				return $x.getState(e)?.mergedDecorationSet ?? K.empty;
			} }
		});
	}
	applyChangedRangesRecompute(e, t, n, r, i) {
		let a = yS(r, i.doc);
		return a.type === "full" ? this.buildFullSet(e, t, i) : this.rebuildRanges(e, t, n, r, i, a.ranges);
	}
	rebuildRanges(e, t, n, r, i, a) {
		let o = n.decorationSetsByExtension[e] ?? K.empty, s = new Set(n.widgetKeysByExtension[e] ?? []), c = bS(o, r.mapping, r.doc, s), l = i.doc.content.size;
		for (let { from: n, to: r } of a) {
			let a = c.find(n, r).filter((e) => fS({
				position: e.from,
				from: n,
				to: r,
				docSize: l
			}));
			for (let e of a) {
				let t = mS(e);
				t && s.delete(t);
			}
			c = c.remove(a);
			let { decorations: o, widgetKeys: u } = uS(pS({
				decorations: this.runCreate(e, "createInRange", () => t.createInRange({
					editor: this.editor,
					state: i,
					view: this.mountedView,
					from: n,
					to: r
				})),
				from: n,
				to: r,
				docSize: l,
				extensionName: e,
				warnedExtensions: this.warnedOutOfRangeExtensions
			}), e);
			c = c.add(i.doc, o);
			for (let e of u) s.add(e);
		}
		return {
			set: c,
			widgetKeys: s
		};
	}
	buildFullSet(e, t, n) {
		let r = this.runCreate(e, "create", () => t.create({
			editor: this.editor,
			state: n,
			view: this.mountedView
		}));
		return dS(n.doc, r, e);
	}
	runCreate(e, t, n) {
		try {
			return n();
		} catch (n) {
			return console.error(`[tiptap error]: Extension "${e}" threw in \`addDecorations().${t}()\`. Its decorations were dropped for this update.`, n), [];
		}
	}
	warnDuplicateWidgetKeys(e) {
		if (!cS) return;
		if (e.widgetKeys.size === 0) {
			this.warnedWidgetKeys.clear();
			return;
		}
		let t = hS(e.mergedDecorationSet), n = new Set(t.map(({ key: e }) => e));
		for (let { key: e, extensions: n } of t) {
			if (this.warnedWidgetKeys.has(e)) continue;
			let t = Array.from(n).map((e) => `"${e}"`).join(", ");
			console.warn(`[tiptap warn]: Duplicate widget decoration key "${e}" in extension${n.size === 1 ? "" : "s"} ${t}. Widget decoration keys must be globally unique, otherwise ProseMirror misplaces the widget DOM. Use a stable, unique key (e.g. \`comment-\${id}\`).`);
		}
		this.warnedWidgetKeys = n;
	}
	buildMergedSet(e, t) {
		let n = Object.keys(t);
		return n.length === 1 ? t[n[0]] : SS(e, t);
	}
	mergeAfterApply({ entries: e, previous: t, tr: n, decorationSetsByExtension: r, recomputedNames: i }) {
		return e.length === 1 ? r[e[0].name] : i.size === 0 ? t.mergedDecorationSet.map(n.mapping, n.doc) : SS(n.doc, r);
	}
};
function OS(e, t) {
	let { selection: n } = e, { $from: r } = n;
	if (n instanceof U) {
		let e = r.index();
		return r.parent.canReplaceWith(e, e + 1, t);
	}
	let i = r.depth;
	for (; i >= 0;) {
		let e = r.index(i);
		if (r.node(i).contentMatchAt(e).matchType(t)) return !0;
		--i;
	}
	return !1;
}
function kS(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
function AS(e) {
	return typeof e == "number";
}
function jS(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function MS(e) {
	return jS(e) === "Object" && e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype;
}
function NS(e) {
	return typeof e == "string" && e.trim().length > 0 && !/[;{}]/.test(e);
}
function PS(e, t, n) {
	let r = e.split("\n"), i = [], a = "", o = 0, s = t.baseIndentSize || 2;
	for (; o < r.length;) {
		let e = r[o], u = e.match(t.itemPattern);
		if (!u) {
			if (i.length > 0) break;
			if (e.trim() === "") {
				o += 1, a = `${a}${e}\n`;
				continue;
			}
			return;
		}
		let d = t.extractItemData(u), { indentLevel: f, mainContent: p } = d;
		a = `${a}${e}\n`;
		let m = [p];
		for (o += 1; o < r.length;) {
			var c;
			let e = r[o];
			if (e.trim() === "") {
				var l;
				let t = r.slice(o + 1).findIndex((e) => e.trim() !== "");
				if (t === -1) break;
				if ((((l = r[o + 1 + t].match(/^(\s*)/)) == null || (l = l[1]) == null ? void 0 : l.length) || 0) > f) {
					m.push(e), a = `${a}${e}\n`, o += 1;
					continue;
				}
				break;
			}
			if ((((c = e.match(/^(\s*)/)) == null || (c = c[1]) == null ? void 0 : c.length) || 0) > f) m.push(e), a = `${a}${e}\n`, o += 1;
			else break;
		}
		let h, g = m.slice(1);
		if (g.length > 0) {
			let e = g.map((e) => e.slice(f + s)).join("\n");
			e.trim() && (h = t.customNestedParser ? t.customNestedParser(e) : n.blockTokens(e));
		}
		let _ = t.createToken(d, h);
		i.push(_);
	}
	if (i.length !== 0) return {
		items: i,
		raw: a
	};
}
var FS = 4;
function IS(e) {
	let t = 0;
	for (let n of e) t = n === "	" ? t + FS - t % FS : t + 1;
	return t;
}
function LS(e, t, n, r, i) {
	if (!e || !Array.isArray(e.content)) return "";
	let a = typeof n == "function" ? n(r) : n, [o, ...s] = e.content, c = `${a}${t.renderChildren([o])}`;
	return s && s.length > 0 && s.forEach((e, n) => {
		let r = t.renderChild?.call(t, e, n + 1) ?? t.renderChildren([e]);
		if (r != null) {
			let n = (e) => {
				if (!i?.alignNestedToPrefix) return t.indent(e);
				let n = t.indent(""), r = IS(a);
				return (IS(n) >= r ? n : " ".repeat(r)) + e;
			}, o = r.split("\n").map((e) => n(e || "")).join("\n");
			c += e.type === "paragraph" ? `\n\n${o}` : `\n${o}`;
		}
	}), c;
}
function RS(e, t) {
	let n = { ...e };
	return MS(e) && MS(t) && Object.keys(t).forEach((r) => {
		MS(t[r]) && MS(e[r]) ? n[r] = RS(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function zS(e, t, n = {}) {
	let { state: r } = t, { doc: i, tr: a } = r, o = e;
	i.descendants((t, r) => {
		let i = a.mapping.map(r), s = a.mapping.map(r) + t.nodeSize, c = null;
		if (t.marks.forEach((e) => {
			if (e !== o) return !1;
			c = e;
		}), !c) return;
		let l = !1;
		if (Object.keys(n).forEach((e) => {
			n[e] !== c.attrs[e] && (l = !0);
		}), l) {
			let t = e.type.create({
				...e.attrs,
				...n
			});
			a.removeMark(i, s, e.type), a.addMark(i, s, t);
		}
	}), a.docChanged && t.view.dispatch(a);
}
var BS = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler, this.undoable = e.undoable ?? !0;
	}
}, VS = (e, t) => {
	if (_y(t)) return t.exec(e);
	let n = t(e);
	if (!n) return null;
	let r = [n.text];
	return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
};
function HS(e) {
	let { editor: t, from: n, to: r, text: i, insertText: a } = e;
	if (!a) return {
		inputTransaction: null,
		tr: t.view.state.tr
	};
	let o = t.view.state.tr.insertText(i, n, r);
	return {
		inputTransaction: o,
		tr: qf.create({
			doc: o.doc,
			selection: o.selection,
			storedMarks: o.storedMarks
		}).tr
	};
}
function US(e) {
	let { editor: t, from: n, to: r, text: i, rule: a, match: o, plugin: s, insertText: c } = e, { view: l } = t, { inputTransaction: u, tr: d } = HS({
		editor: t,
		from: n,
		to: r,
		text: i,
		insertText: c
	}), f = u ? n + i.length : r, p = $v({
		state: l.state,
		transaction: d
	}), m = {
		from: n - (o[0].length - i.length),
		to: f
	}, { commands: h, chain: g, can: _ } = new ey({
		editor: t,
		state: p
	});
	return a.handler({
		state: p,
		range: m,
		match: o,
		commands: h,
		chain: g,
		can: _
	}) === null || !d.steps.length ? !1 : (u && (l.dispatch(u), !l.state.doc.eq(u.doc)) || (Gv(d), d.setMeta("inputRule", !0), a.undoable && d.setMeta(s, {
		transform: d,
		from: n,
		to: f,
		text: i
	}), l.dispatch(d)), !0);
}
function WS(e, t, n) {
	let r = t[0].length - n.length;
	if (r <= 0) return !0;
	let i = e.parentOffset - r;
	return i >= 0 && e.parent.textBetween(i, e.parentOffset) === t[0].slice(0, r);
}
function GS(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o, insertText: s } = e, { view: c } = t;
	if (c.composing) return !1;
	let l = c.state.doc.resolve(n);
	if (l.parent.type.spec.code || (l.nodeBefore || l.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let u = sx(l) + i;
	for (let e of a) {
		let a = VS(u, e.find);
		if (a && WS(l, a, i) && US({
			editor: t,
			from: n,
			to: r,
			text: i,
			rule: e,
			match: a,
			plugin: o,
			insertText: s
		})) return !0;
	}
	return !1;
}
function KS(e) {
	let { editor: t, rules: n } = e, r = new W({
		state: {
			init() {
				return null;
			},
			apply(e, i, a) {
				let o = e.getMeta(r);
				if (o) return o;
				let s = e.getMeta("applyInputRules");
				return s && setTimeout(() => {
					let { text: e } = s;
					e = typeof e == "string" ? e : wb(R.from(e), a.schema);
					let { from: i } = s, o = i + e.length;
					GS({
						editor: t,
						from: i,
						to: o,
						text: e,
						rules: n,
						plugin: r
					});
				}), e.selectionSet || e.docChanged ? null : i;
			}
		},
		props: {
			handleTextInput(e, i, a, o) {
				return GS({
					editor: t,
					from: i,
					to: a,
					text: o,
					rules: n,
					plugin: r,
					insertText: !0
				});
			},
			handleDOMEvents: { compositionend: (e) => (setTimeout(() => {
				let { $cursor: i } = e.state.selection;
				i && GS({
					editor: t,
					from: i.pos,
					to: i.pos,
					text: "",
					rules: n,
					plugin: r
				});
			}), !1) },
			handleKeyDown(e, i) {
				if (i.key !== "Enter") return !1;
				let { $cursor: a } = e.state.selection;
				return a ? GS({
					editor: t,
					from: a.pos,
					to: a.pos,
					text: "\n",
					rules: n,
					plugin: r
				}) : !1;
			}
		},
		isInputRules: !0
	});
	return r;
}
var qS = class {
	constructor(e = {}) {
		this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name;
	}
	get options() {
		return { ...J(q(this, "addOptions", { name: this.name })) };
	}
	get storage() {
		return { ...J(q(this, "addStorage", {
			name: this.name,
			options: this.options
		})) };
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => RS(this.options, e)
		});
		return t.name = this.name, t.parent = this.parent, this.child = null, t;
	}
	extend(e = {}) {
		let t = new this.constructor({
			...this.config,
			...e
		});
		return t.parent = this, this.child = t, t.name = "name" in e ? e.name : t.parent.name, t;
	}
}, JS = class e extends qS {
	constructor(...e) {
		super(...e), this.type = "mark";
	}
	static create(t = {}) {
		let n = typeof t == "function" ? t() : t;
		return new e(n);
	}
	static handleExit({ editor: e, mark: t }) {
		let { tr: n } = e.state, r = e.state.selection.$from;
		if (r.pos === r.end()) {
			let i = r.marks();
			if (!i.find((e) => e?.type.name === t.name)) return !1;
			let a = i.find((e) => e?.type.name === t.name);
			return a && n.removeStoredMark(a), n.insertText(" ", r.pos), e.view.dispatch(n), !0;
		}
		return !1;
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
}, YS = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, XS = (e, t, n) => {
	if (_y(t)) return [...e.matchAll(t)];
	let r = t(e, n);
	return r ? r.map((t) => {
		let n = [t.text];
		return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
	}) : [];
};
function ZS(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new ey({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		var f;
		if ((f = e.type) != null && (f = f.spec) != null && f.code || !(e.isText || e.isTextblock || e.isInline)) return;
		let p = e.content?.size ?? e.nodeSize ?? 0, m = Math.max(r, t), h = Math.min(i, t + p);
		m >= h || XS(e.isText ? e.text || "" : e.textBetween(m - t, h - t, void 0, "￼"), a.find, o).forEach((e) => {
			if (e.index === void 0) return;
			let t = m + e.index + 1, r = t + e[0].length, i = {
				from: n.tr.mapping.map(t),
				to: n.tr.mapping.map(r)
			}, f = a.handler({
				state: n,
				range: i,
				match: e,
				commands: c,
				chain: l,
				can: u,
				pasteEvent: o,
				dropEvent: s
			});
			d.push(f);
		});
	}), d.every((e) => e !== null);
}
var QS = null, $S = (e) => {
	var t;
	let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
	return (t = n.clipboardData) == null || t.setData("text/html", e), n;
};
function eC(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr, l = $v({
			state: e,
			transaction: c
		});
		if (ZS({
			editor: t,
			state: l,
			from: Math.max(n - 1, 0),
			to: r.b - 1,
			rule: i,
			pasteEvent: a,
			dropEvent: s
		}) && c.steps.length) {
			try {
				s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
			} catch {
				s = null;
			}
			return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, c;
		}
	};
	return t.on("destroy", () => {
		QS === t && (QS = null);
	}), n.map((e) => new W({
		view(e) {
			let n = (n) => {
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (QS = t);
			}, i = () => {
				QS &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = QS;
					e?.isEditable && setTimeout(() => {
						if (e.isDestroyed) return;
						let t = e.state.selection;
						t && e.commands.deleteRange({
							from: t.from,
							to: t.to
						});
					}, 10);
				}
				return !1;
			},
			paste: (e, t) => {
				let n = t.clipboardData?.getData("text/html");
				return o = t, i = !!n?.includes("data-pm-slice"), !1;
			}
		} },
		appendTransaction: (t, n, r) => {
			let s = t[0], l = s.getMeta("uiEvent") === "paste" && !i, u = s.getMeta("uiEvent") === "drop" && !a, d = s.getMeta("applyPasteRules"), f = !!d;
			if (!l && !u && !f) return;
			if (f) {
				let { text: t } = d;
				t = typeof t == "string" ? t : wb(R.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = $S(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if (AS(p) && m && p !== m.b) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
var tC = class {
	constructor(e, t) {
		this.splittableMarks = [], this.nonClearableMarks = [], this.decorationManager = null, this.editor = t, this.baseExtensions = e, this.extensions = qb(e), this.hasSchemaSpec = t.options.schemaSpec !== void 0, this.schema = Gb(this.extensions, t, t.options.schemaSpec), this.setupExtensions();
	}
	get commands() {
		return this.extensions.reduce((e, t) => {
			let n = q(t, "addCommands", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: this.editor,
				type: ax(t.name, this.schema)
			});
			return n ? {
				...e,
				...n()
			} : e;
		}, {});
	}
	get plugins() {
		let { editor: e } = this, t = Kb([...this.extensions].reverse()).flatMap((t) => {
			let n = {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: ax(t.name, this.schema)
			}, r = [], i = q(t, "addKeyboardShortcuts", n), a = {};
			if (t.type === "mark" && q(t, "exitable", n) && (a.ArrowRight = () => JS.handleExit({
				editor: e,
				mark: t
			})), i) {
				let t = Object.fromEntries(Object.entries(i()).map(([t, n]) => [t, () => n({ editor: e })]));
				a = {
					...a,
					...t
				};
			}
			let o = Tv(a);
			r.push(o);
			let s = q(t, "addInputRules", n);
			if (fx(t, e.options.enableInputRules) && s) {
				let t = s();
				if (t && t.length) {
					let n = KS({
						editor: e,
						rules: t
					}), i = Array.isArray(n) ? n : [n];
					r.push(...i);
				}
			}
			let c = q(t, "addPasteRules", n);
			if (fx(t, e.options.enablePasteRules) && c) {
				let t = c();
				if (t && t.length) {
					let n = eC({
						editor: e,
						rules: t
					});
					r.push(...n);
				}
			}
			let l = q(t, "addProseMirrorPlugins", n);
			if (l) {
				let e = l();
				r.push(...e);
			}
			return r;
		}), n = this.createDecorationPlugin();
		return n && t.push(n), t;
	}
	createDecorationPlugin() {
		var e;
		let { editor: t } = this;
		(e = this.decorationManager) == null || e.destroy();
		let n = [];
		return this.extensions.forEach((e) => {
			let r = q(e, "addDecorations", {
				name: e.name,
				options: e.options,
				storage: this.editor.extensionStorage[e.name],
				editor: t,
				type: ax(e.name, this.schema)
			});
			r && n.push({
				name: e.name,
				addDecorations: r
			});
		}), this.decorationManager = new DS({
			editor: t,
			entries: n
		}), this.decorationManager.plugin;
	}
	get attributes() {
		let e = Pb(this.extensions);
		return this.hasSchemaSpec ? Tb(e, this.schema) : e;
	}
	get nodeViews() {
		let { editor: e } = this, { nodeExtensions: t } = Nb(this.extensions);
		return Object.fromEntries(t.filter((e) => !!q(e, "addNodeView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = q(t, "addNodeView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: cy(t.name, this.schema)
			});
			if (!r) return [];
			let i = r();
			return i ? [t.name, (r, a, o, s, c) => {
				let l = zb(r, n);
				return i({
					node: r,
					view: a,
					getPos: o,
					decorations: s,
					innerDecorations: c,
					editor: e,
					extension: t,
					HTMLAttributes: l
				});
			}] : [];
		}));
	}
	dispatchTransaction(e) {
		let { editor: t } = this;
		return Kb([...this.extensions].reverse()).reduceRight((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: ax(n.name, this.schema)
			}, i = q(n, "dispatchTransaction", r);
			return i ? (t) => {
				i.call(r, {
					transaction: t,
					next: e
				});
			} : e;
		}, e);
	}
	transformPastedHTML(e) {
		let { editor: t } = this;
		return Kb([...this.extensions]).reduce((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: ax(n.name, this.schema)
			}, i = q(n, "transformPastedHTML", r);
			return i ? (t, n) => {
				let a = e(t, n);
				return i.call(r, a);
			} : e;
		}, e || ((e) => e));
	}
	get markViews() {
		let { editor: e } = this, { markExtensions: t } = Nb(this.extensions);
		return Object.fromEntries(t.filter((e) => !!q(e, "addMarkView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = q(t, "addMarkView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: Sy(t.name, this.schema)
			});
			return r ? [t.name, (i, a, o) => {
				let s = zb(i, n);
				return r()({
					mark: i,
					view: a,
					inline: o,
					editor: e,
					extension: t,
					HTMLAttributes: s,
					updateAttributes: (t) => {
						zS(i, e, t);
					}
				});
			}] : [];
		}));
	}
	destroy() {
		var e;
		(e = this.decorationManager) == null || e.destroy(), this.extensions.forEach((e) => {
			let t = e;
			for (; t.parent;) {
				let e = t.parent;
				e.child === t && (e.child = null), t = e;
			}
		}), this.extensions = [], this.baseExtensions = [], this.decorationManager = null, this.schema = null, this.editor = null;
	}
	setupExtensions() {
		let e = this.extensions;
		this.editor.extensionStorage = Object.fromEntries(e.map((e) => [e.name, e.storage])), e.forEach((e) => {
			let t = {
				name: e.name,
				options: e.options,
				storage: this.editor.extensionStorage[e.name],
				editor: this.editor,
				type: ax(e.name, this.schema)
			};
			e.type === "mark" && ((J(q(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name), (J(q(e, "clearable", t)) ?? !0) || this.nonClearableMarks.push(e.name));
			let n = q(e, "onBeforeCreate", t), r = q(e, "onCreate", t), i = q(e, "onUpdate", t), a = q(e, "onSelectionUpdate", t), o = q(e, "onTransaction", t), s = q(e, "onFocus", t), c = q(e, "onBlur", t), l = q(e, "onDestroy", t);
			n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
		});
	}
};
tC.resolve = qb, tC.sort = Kb, tC.flatten = Cb;
var X = class e extends qS {
	constructor(...e) {
		super(...e), this.type = "extension";
	}
	static create(t = {}) {
		let n = typeof t == "function" ? t() : t;
		return new e(n);
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
}, nC = X.create({
	name: "clipboardTextSerializer",
	addOptions() {
		return { blockSeparator: void 0 };
	},
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("clipboardTextSerializer"),
			props: { clipboardTextSerializer: () => {
				let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, a = Xb(n), { blockSeparator: o } = this.options, s = {
					...o === void 0 ? {} : { blockSeparator: o },
					textSerializers: a
				};
				return [...i.ranges].sort((e, t) => e.$from.pos - t.$from.pos).map(({ $from: e, $to: t }) => Jb(r, {
					from: e.pos,
					to: t.pos
				}, s)).join(o ?? "\n\n");
			} }
		})];
	}
}), rC = X.create({
	name: "commands",
	addCommands() {
		return { ...rS };
	}
}), iC = X.create({
	name: "delete",
	onUpdate({ transaction: e, appendedTransactions: t }) {
		var n;
		let r = () => {
			var n, r;
			if (((n = this.editor.options.coreExtensionOptions) == null || (n = n.delete) == null || (r = n.filterTransaction) == null ? void 0 : r.call(n, e)) ?? e.getMeta("y-sync$")) return;
			let i = yb(e.before, [e, ...t]);
			tx(i).forEach((t) => {
				i.mapping.mapResult(t.oldRange.from).deletedAfter && i.mapping.mapResult(t.oldRange.to).deletedBefore && i.before.nodesBetween(t.oldRange.from, t.oldRange.to, (n, r) => {
					let a = r + n.nodeSize - 2, o = t.oldRange.from <= r && a <= t.oldRange.to;
					this.editor.emit("delete", {
						type: "node",
						node: n,
						from: r,
						to: a,
						newFrom: i.mapping.map(r),
						newTo: i.mapping.map(a),
						deletedRange: t.oldRange,
						newRange: t.newRange,
						partial: !o,
						editor: this.editor,
						transaction: e,
						combinedTransform: i
					});
				});
			});
			let a = i.mapping;
			i.steps.forEach((t, n) => {
				if (t instanceof kd) {
					let r = a.slice(n).map(t.from, -1), o = a.slice(n).map(t.to), s = a.invert().map(r, -1), c = a.invert().map(o), l = r > 0 && i.doc.nodeAt(r - 1)?.marks.some((e) => e.eq(t.mark)), u = i.doc.nodeAt(o)?.marks.some((e) => e.eq(t.mark));
					this.editor.emit("delete", {
						type: "mark",
						mark: t.mark,
						from: t.from,
						to: t.to,
						deletedRange: {
							from: s,
							to: c
						},
						newRange: {
							from: r,
							to: o
						},
						partial: !!(u || l),
						editor: this.editor,
						transaction: e,
						combinedTransform: i
					});
				}
			});
		};
		((n = this.editor.options.coreExtensionOptions) == null || (n = n.delete) == null ? void 0 : n.async) ?? !0 ? setTimeout(r, 0) : r();
	}
}), aC = X.create({
	name: "drop",
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("tiptapDrop"),
			props: { handleDrop: (e, t, n, r) => {
				this.editor.emit("drop", {
					editor: this.editor,
					event: t,
					slice: n,
					moved: r
				});
			} }
		})];
	}
}), oC = X.create({
	name: "editable",
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("editable"),
			props: { editable: () => this.editor.options.editable }
		})];
	}
}), sC = new Zf("focusEvents"), cC = X.create({
	name: "focusEvents",
	addProseMirrorPlugins() {
		let { editor: e } = this;
		return [new W({
			key: sC,
			props: { handleDOMEvents: {
				focus: (t, n) => {
					e.isFocused = !0;
					let r = e.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
					return t.dispatch(r), !1;
				},
				blur: (t, n) => {
					e.isFocused = !1;
					let r = e.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
					return t.dispatch(r), !1;
				}
			} }
		})];
	}
}), lC = X.create({
	name: "keymap",
	addKeyboardShortcuts() {
		let e = () => this.editor.commands.first(({ commands: e }) => [
			() => e.undoInputRule(),
			() => e.command(({ tr: t }) => {
				let { selection: n, doc: r } = t, { empty: i, $anchor: a } = n, { pos: o, parent: s } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : V.atStart(r).from === o;
				return !i || !s.type.isTextblock || s.textContent.length || !d || d && a.parent.type.name === "paragraph" ? !1 : e.clearNodes();
			}),
			() => e.deleteSelection(),
			() => e.joinBackward(),
			() => e.selectNodeBackward()
		]), t = () => this.editor.commands.first(({ commands: e }) => [
			() => e.deleteSelection(),
			() => e.deleteCurrentNode(),
			() => e.joinForward(),
			() => e.selectNodeForward()
		]), n = {
			Enter: () => this.editor.commands.first(({ commands: e }) => [
				() => e.newlineInCode(),
				() => e.createParagraphNear(),
				() => e.liftEmptyBlock(),
				() => e.splitBlock()
			]),
			"Mod-Enter": () => this.editor.commands.exitCode(),
			Backspace: e,
			"Mod-Backspace": e,
			"Shift-Backspace": e,
			Delete: t,
			"Mod-Delete": t,
			"Mod-a": () => this.editor.commands.selectAll()
		}, r = { ...n }, i = {
			...n,
			"Ctrl-h": e,
			"Alt-Backspace": e,
			"Ctrl-d": t,
			"Ctrl-Alt-Backspace": t,
			"Alt-Delete": t,
			"Alt-d": t,
			"Ctrl-a": () => this.editor.commands.selectTextblockStart(),
			"Ctrl-e": () => this.editor.commands.selectTextblockEnd()
		};
		return ky() || Qy() ? i : r;
	},
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("clearDocument"),
			appendTransaction: (e, t, n) => {
				if (e.some((e) => e.getMeta("composition"))) return;
				let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
				if (!r || i) return;
				let { empty: a, from: o, to: s } = t.selection, c = V.atStart(t.doc).from, l = V.atEnd(t.doc).to;
				if (a || o !== c || s !== l || !mx(n.doc)) return;
				let u = n.tr, d = $v({
					state: n,
					transaction: u
				}), { commands: f } = new ey({
					editor: this.editor,
					state: d
				});
				if (f.clearNodes(), u.steps.length) return u;
			}
		})];
	}
}), uC = X.create({
	name: "paste",
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("tiptapPaste"),
			props: { handlePaste: (e, t, n) => {
				this.editor.emit("paste", {
					editor: this.editor,
					event: t,
					slice: n
				});
			} }
		})];
	}
}), dC = X.create({
	name: "tabindex",
	addOptions() {
		return { value: void 0 };
	},
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("tabindex"),
			props: { attributes: () => !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: this.options.value ?? "0" } }
		})];
	}
}), fC = X.create({
	name: "textDirection",
	addOptions() {
		return { direction: void 0 };
	},
	addGlobalAttributes() {
		if (!this.options.direction) return [];
		let { nodeExtensions: e } = Nb(this.extensions);
		return [{
			types: e.filter((e) => e.name !== "text").map((e) => e.name),
			attributes: { dir: {
				default: this.options.direction,
				parseHTML: (e) => {
					let t = e.getAttribute("dir");
					return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
				},
				renderHTML: (e) => e.dir ? { dir: e.dir } : {}
			} }
		}];
	},
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("textDirection"),
			props: { attributes: () => {
				let e = this.options.direction;
				return e ? { dir: e } : {};
			} }
		})];
	}
}), pC = !1;
function mC(e) {
	if (pC) return;
	pC = !0;
	let t;
	try {
		let n = Pd.fromJSON(e, {
			from: 0,
			to: 0
		});
		if (!_x(n)) return;
		t = n.slice.content;
	} catch {
		return;
	}
	t instanceof R || console.warn("[tiptap warn]: prosemirror-model is loaded more than once. Wrapping and splitting nodes will fail. Deduplicate it in your lock file, or alias it to a single copy in your bundler.");
}
var hC = class e {
	get name() {
		return this.node.type.name;
	}
	constructor(e, t, n = !1, r = null) {
		this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = r;
	}
	get node() {
		return this.currentNode || this.resolvedPos.node();
	}
	get element() {
		return this.editor.view.domAtPos(this.pos).node;
	}
	get depth() {
		return this.actualDepth ?? this.resolvedPos.depth;
	}
	get pos() {
		return this.resolvedPos.pos;
	}
	get content() {
		return this.node.content;
	}
	set content(e) {
		let t = this.from, n = this.to;
		if (this.isBlock) {
			if (this.content.size === 0) {
				console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
				return;
			}
			t = this.from + 1, n = this.to - 1;
		}
		this.editor.commands.insertContentAt({
			from: t,
			to: n
		}, e);
	}
	get attributes() {
		return this.node.attrs;
	}
	get textContent() {
		return this.node.textContent;
	}
	get size() {
		return this.node.nodeSize;
	}
	get from() {
		return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
	}
	get range() {
		return {
			from: this.from,
			to: this.to
		};
	}
	get to() {
		return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + +!this.node.isText;
	}
	get parent() {
		if (this.depth === 0) return null;
		let t = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(t);
		return new e(n, this.editor);
	}
	get before() {
		let t = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
		return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.from - 3)), new e(t, this.editor);
	}
	get after() {
		let t = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
		return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.to + 3)), new e(t, this.editor);
	}
	get children() {
		let t = [];
		return this.node.content.forEach((n, r) => {
			let i = n.isBlock && !n.isTextblock, a = n.isAtom && !n.isText, o = n.isInline, s = this.pos + r + +!a;
			if (s < 0 || s > this.resolvedPos.doc.nodeSize - 2) return;
			let c = this.resolvedPos.doc.resolve(s);
			if (!i && !o && c.depth <= this.depth) return;
			let l = new e(c, this.editor, i, i || o ? n : null);
			i && (l.actualDepth = this.depth + 1), t.push(l);
		}), t;
	}
	get firstChild() {
		return this.children[0] || null;
	}
	get lastChild() {
		let e = this.children;
		return e[e.length - 1] || null;
	}
	closest(e, t = {}) {
		let n = null, r = this.parent;
		for (; r && !n;) {
			if (r.node.type.name === e) {
				if (Object.keys(t).length > 0) {
					let e = r.node.attrs, n = Object.keys(t);
					for (let r = 0; r < n.length; r += 1) {
						let i = n[r];
						if (e[i] !== t[i]) break;
					}
				} else n = r;
			}
			r = r.parent;
		}
		return n;
	}
	querySelector(e, t = {}) {
		return this.querySelectorAll(e, t, !0)[0] || null;
	}
	querySelectorAll(e, t = {}, n = !1) {
		let r = [];
		if (!this.children || this.children.length === 0) return r;
		let i = Object.keys(t);
		return this.children.forEach((a) => {
			n && r.length > 0 || (a.node.type.name === e && i.every((e) => t[e] === a.node.attrs[e]) && r.push(a), !(n && r.length > 0) && (r = r.concat(a.querySelectorAll(e, t, n))));
		}), r;
	}
	setAttribute(e) {
		let { tr: t } = this.editor.state;
		t.setNodeMarkup(this.from, void 0, {
			...this.node.attrs,
			...e
		}), this.editor.view.dispatch(t);
	}
}, gC = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}", _C = class extends sS {
	constructor(e = {}) {
		super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.hasWarnedStaleDecorationRead = !1, this.options = {
			element: typeof document < "u" ? document.createElement("div") : null,
			content: "",
			injectCSS: !0,
			injectNonce: void 0,
			extensions: [],
			autofocus: !1,
			editable: !0,
			textDirection: void 0,
			editorProps: {},
			parseOptions: {},
			coreExtensionOptions: {},
			enableInputRules: !0,
			enablePasteRules: !0,
			enableCoreExtensions: !0,
			enableContentCheck: !1,
			emitContentError: !1,
			onBeforeCreate: () => null,
			onCreate: () => null,
			onMount: () => null,
			onUnmount: () => null,
			onUpdate: () => null,
			onSelectionUpdate: () => null,
			onTransaction: () => null,
			onFocus: () => null,
			onBlur: () => null,
			onDestroy: () => null,
			onContentError: ({ error: e }) => {
				throw e;
			},
			onPaste: () => null,
			onDrop: () => null,
			onDelete: () => null,
			enableExtensionDispatchTransaction: !0
		}, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
			getUpdatedPosition: yx,
			createMappablePosition: bx
		}, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: e, slice: t, moved: n }) => this.options.onDrop(e, t, n)), this.on("paste", ({ event: e, slice: t }) => this.options.onPaste(e, t)), this.on("delete", this.options.onDelete);
		let t = this.createDoc();
		if (!this.editorState) {
			let e = Dy(t, this.options.autofocus);
			this.editorState = qf.create({
				doc: t,
				schema: this.schema,
				selection: e || void 0
			});
		}
		mC(this.schema), this.options.element && this.mount(this.options.element);
	}
	mount(e) {
		if (typeof document > "u") throw Error("[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.");
		this.createView(e), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
			this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
		}, 0);
	}
	unmount() {
		if (this.editorView) {
			this.editorState = this.editorView.state;
			let e = this.editorView.dom;
			e?.editor && delete e.editor, this.editorView.destroy();
		}
		if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length) try {
			typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
		} catch (e) {
			console.warn("Failed to remove CSS element:", e);
		}
		this.css = null, this.emit("unmount", { editor: this });
	}
	get storage() {
		return this.extensionStorage;
	}
	get commands() {
		return this.commandManager.commands;
	}
	chain() {
		return this.commandManager ? this.commandManager.chain() : ey.createFakeChain();
	}
	can() {
		return this.commandManager ? this.commandManager.can() : ey.createFallbackCan();
	}
	injectCSS() {
		this.options.injectCSS && typeof document < "u" && (this.css = kS(gC, this.options.injectNonce));
	}
	setOptions(e = {}) {
		this.options = {
			...this.options,
			...e
		}, this.editorView && this.state && !this.isDestroyed && (this.options.editorProps && this.view.setProps({
			...this.options.editorProps,
			attributes: this.getEditorViewAttributes()
		}), this.view.updateState(this.state));
	}
	setEditable(e, t = !0) {
		this.setOptions({ editable: e }), t && this.emit("update", {
			editor: this,
			transaction: this.state.tr,
			appendedTransactions: []
		});
	}
	get isEditable() {
		return this.options.editable && this.view && this.view.editable;
	}
	get view() {
		return this.editorView ? this.editorView : new Proxy({
			state: this.editorState,
			updateState: (e) => {
				this.editorState = e;
			},
			dispatch: (e) => {
				this.dispatchTransaction(e);
			},
			composing: !1,
			dragging: null,
			editable: !0,
			isDestroyed: !1
		}, { get: (e, t) => {
			if (this.editorView) return this.editorView[t];
			if (t === "state") return this.editorState;
			if (t in e) return Reflect.get(e, t);
			throw Error(`[tiptap error]: The editor view is not available. Cannot access view['${t}']. The editor may not be mounted yet.`);
		} });
	}
	get state() {
		return cS && !this.hasWarnedStaleDecorationRead && oS(this) && (this.hasWarnedStaleDecorationRead = !0, console.warn("[tiptap warn]: `editor.state` was read while decoration `create()` was running. It returns the pre-transaction document. Use the `state` argument passed to `create()` instead. Helpers like `editor.isActive()` read `editor.state` too, so pass `state` to their standalone versions instead of calling them on the editor.")), this.editorView && (this.editorState = this.view.state), this.editorState;
	}
	registerPlugin(e, t) {
		let n = Fb(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
		return this.view.updateState(r), r;
	}
	unregisterPlugin(e) {
		if (this.isDestroyed) return;
		let t = this.state.plugins, n = t;
		if ([].concat(e).forEach((e) => {
			let t = typeof e == "string" ? `${e}$` : e.key;
			n = n.filter((e) => !e.key.startsWith(t));
		}), t.length === n.length) return;
		let r = this.state.reconfigure({ plugins: n });
		return this.view.updateState(r), r;
	}
	createExtensionManager() {
		var e, t;
		let n = [...this.options.enableCoreExtensions ? [
			oC,
			nC.configure({ blockSeparator: (e = this.options.coreExtensionOptions) == null || (e = e.clipboardTextSerializer) == null ? void 0 : e.blockSeparator }),
			rC,
			cC,
			lC,
			dC.configure({ value: (t = this.options.coreExtensionOptions) == null || (t = t.tabindex) == null ? void 0 : t.value }),
			aC,
			uC,
			iC,
			fC.configure({ direction: this.options.textDirection })
		].filter((e) => typeof this.options.enableCoreExtensions != "object" || this.options.enableCoreExtensions[e.name] !== !1) : [], ...this.options.extensions].filter((e) => [
			"extension",
			"node",
			"mark"
		].includes(e?.type));
		this.extensionManager = new tC(n, this);
	}
	createCommandManager() {
		this.commandManager = new ey({ editor: this });
	}
	createSchema() {
		this.schema = this.extensionManager.schema;
	}
	createDoc() {
		let e;
		try {
			e = gb(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
		} catch (e) {
			if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message)) throw e;
			let t = gb(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
			return this.editorState = qf.create({
				doc: t,
				schema: this.schema,
				selection: Dy(t, this.options.autofocus) || void 0
			}), this.emit("contentError", {
				editor: this,
				error: e,
				disableCollaboration: () => {
					"collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
				}
			}), this.editorState.doc;
		}
		return e;
	}
	getEditorViewAttributes() {
		let e = this.options.editorProps?.attributes;
		return Fb(e) ? (t) => ({
			role: "textbox",
			...e(t)
		}) : {
			role: "textbox",
			...e
		};
	}
	createView(e) {
		let { editorProps: t, enableExtensionDispatchTransaction: n } = this.options, r = t.dispatchTransaction || this.dispatchTransaction.bind(this), i = n ? this.extensionManager.dispatchTransaction(r) : r, a = t.transformPastedHTML, o = this.extensionManager.transformPastedHTML(a);
		this.editorView = new av(e, {
			...t,
			attributes: this.getEditorViewAttributes(),
			dispatchTransaction: i,
			transformPastedHTML: o,
			state: this.editorState,
			markViews: this.extensionManager.markViews,
			nodeViews: this.extensionManager.nodeViews
		});
		let s = this.state.reconfigure({ plugins: this.extensionManager.plugins });
		this.view.updateState(s), this.prependClass(), this.injectCSS();
		let c = this.view.dom;
		c.editor = this;
	}
	createNodeViews() {
		this.view.isDestroyed || this.view.setProps({
			markViews: this.extensionManager.markViews,
			nodeViews: this.extensionManager.nodeViews
		});
	}
	prependClass() {
		this.view.dom.className = `${this.className} ${this.view.dom.className}`;
	}
	captureTransaction(e) {
		this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
		let t = this.capturedTransaction;
		return this.capturedTransaction = null, t;
	}
	dispatchTransaction(e) {
		if (this.view.isDestroyed) return;
		if (this.isCapturingTransaction) {
			if (!this.capturedTransaction) {
				this.capturedTransaction = e;
				return;
			}
			e.steps.forEach((e) => this.capturedTransaction?.step(e));
			return;
		}
		let { state: t, transactions: n } = this.state.applyTransaction(e), r = !this.state.selection.eq(t.selection), i = n.includes(e), a = this.state;
		if (this.emit("beforeTransaction", {
			editor: this,
			transaction: e,
			nextState: t
		}), !i) return;
		this.view.updateState(t), this.emit("transaction", {
			editor: this,
			transaction: e,
			appendedTransactions: n.slice(1)
		}), r && this.emit("selectionUpdate", {
			editor: this,
			transaction: e
		});
		let o = n.findLast((e) => e.getMeta("focus") || e.getMeta("blur")), s = o?.getMeta("focus"), c = o?.getMeta("blur");
		s && this.emit("focus", {
			editor: this,
			event: s.event,
			transaction: o
		}), c && this.emit("blur", {
			editor: this,
			event: c.event,
			transaction: o
		}), !(e.getMeta("preventUpdate") || !n.some((e) => e.docChanged) || a.doc.eq(t.doc)) && this.emit("update", {
			editor: this,
			transaction: e,
			appendedTransactions: n.slice(1)
		});
	}
	getAttributes(e) {
		return Qb(this.state, e);
	}
	isActive(e, t) {
		let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
		return lx(this.state, n, r);
	}
	getJSON() {
		return this.state.doc.toJSON();
	}
	getHTML() {
		return wb(this.state.doc.content, this.schema);
	}
	getText(e) {
		let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
		return Yb(this.state.doc, {
			blockSeparator: t,
			textSerializers: {
				...Xb(this.schema),
				...n
			}
		});
	}
	get isEmpty() {
		return mx(this.state.doc);
	}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.emit("destroy"), this.unmount(), this.removeAllListeners(), this.extensionManager.destroy(), this.extensionManager = null, this.schema = null, this.commandManager = null, this.extensionStorage = {});
	}
	get isDestroyed() {
		return this.editorView?.isDestroyed ?? !0;
	}
	$node(e, t) {
		return this.$doc?.querySelector(e, t) || null;
	}
	$nodes(e, t) {
		return this.$doc?.querySelectorAll(e, t) || null;
	}
	$pos(e) {
		let t = this.state.doc.resolve(e), n = e > 0 && t.nodeAfter && !t.nodeAfter.isText && t.nodeAfter.isAtom ? t.nodeAfter : null;
		return new hC(t, this, !1, n);
	}
	get $doc() {
		return this.$pos(0);
	}
};
function vC(e) {
	return new BS({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (nx(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		},
		undoable: e.undoable
	});
}
function yC(e) {
	return new BS({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r) || {}, { tr: a } = t, o = n.from, s = n.to, c = e.type.create(i);
			if (r[1]) {
				let e = o + r[0].lastIndexOf(r[1]);
				e > s ? e = s : s = e + r[1].length;
				let t = r[0][r[0].length - 1];
				a.insertText(t, o + r[0].length - 1), a.replaceWith(e, s, c);
			} else if (r[0]) {
				let t = e.type.isInline ? o : o - 1;
				a.insert(t, e.type.create(i)).delete(a.mapping.map(o), a.mapping.map(s));
			}
			a.scrollIntoView();
		},
		undoable: e.undoable
	});
}
function bC(e) {
	return new BS({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = J(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		},
		undoable: e.undoable
	});
}
function xC(e) {
	return new BS({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = J(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && Ud(s, e.type, a);
			if (!c) return null;
			if (o.wrap(s, c), e.keepMarks && e.editor) {
				let { selection: n, storedMarks: r } = t, { splittableMarks: i } = e.editor.extensionManager, a = r || n.$to.parentOffset && n.$from.marks();
				if (a) {
					let e = a.filter((e) => i.includes(e.type.name));
					o.ensureMarks(e);
				}
			}
			if (e.keepAttributes) {
				let t = e.type.name === "bulletList" || e.type.name === "orderedList" ? "listItem" : "taskList";
				i().updateAttributes(t, a).run();
			}
			let l = o.doc.resolve(n.from - 1).nodeBefore;
			l && l.type === e.type && tf(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		},
		undoable: e.undoable
	});
}
var SC = (e) => "touches" in e, CC = class {
	constructor(e) {
		var t;
		this.directions = [
			"bottom-left",
			"bottom-right",
			"top-left",
			"top-right"
		], this.minSize = {
			height: 8,
			width: 8
		}, this.preserveAspectRatio = !1, this.classNames = {
			container: "",
			wrapper: "",
			handle: "",
			resizing: ""
		}, this.initialWidth = 0, this.initialHeight = 0, this.aspectRatio = 1, this.isResizing = !1, this.activeHandle = null, this.startX = 0, this.startY = 0, this.startWidth = 0, this.startHeight = 0, this.isShiftKeyPressed = !1, this.lastEditableState = void 0, this.handleMap = /* @__PURE__ */ new Map(), this.handleMouseMove = (e) => {
			if (!this.isResizing || !this.activeHandle) return;
			let t = e.clientX - this.startX, n = e.clientY - this.startY;
			this.handleResize(t, n);
		}, this.handleTouchMove = (e) => {
			if (!this.isResizing || !this.activeHandle) return;
			let t = e.touches[0];
			if (!t) return;
			let n = t.clientX - this.startX, r = t.clientY - this.startY;
			this.handleResize(n, r);
		}, this.handleMouseUp = () => {
			if (!this.isResizing) return;
			let e = this.element.offsetWidth, t = this.element.offsetHeight;
			this.onCommit(e, t), this.isResizing = !1, this.activeHandle = null, this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
		}, this.handleKeyDown = (e) => {
			e.key === "Shift" && (this.isShiftKeyPressed = !0);
		}, this.handleKeyUp = (e) => {
			e.key === "Shift" && (this.isShiftKeyPressed = !1);
		}, this.node = e.node, this.editor = e.editor, this.element = e.element, this.element.draggable = !1, this.contentElement = e.contentElement, this.getPos = e.getPos, this.onResize = e.onResize, this.onCommit = e.onCommit, this.onUpdate = e.onUpdate, e.options?.min && (this.minSize = {
			...this.minSize,
			...e.options.min
		}), e.options?.max && (this.maxSize = e.options.max), e != null && (t = e.options) != null && t.directions && (this.directions = e.options.directions), e.options?.preserveAspectRatio && (this.preserveAspectRatio = e.options.preserveAspectRatio), e.options?.className && (this.classNames = {
			container: e.options.className.container || "",
			wrapper: e.options.className.wrapper || "",
			handle: e.options.className.handle || "",
			resizing: e.options.className.resizing || ""
		}), e.options?.createCustomHandle && (this.createCustomHandle = e.options.createCustomHandle), this.wrapper = this.createWrapper(), this.container = this.createContainer(), this.applyInitialSize(), this.attachHandles(), this.editor.on("update", this.handleEditorUpdate.bind(this));
	}
	get dom() {
		return this.container;
	}
	get contentDOM() {
		return this.contentElement ?? null;
	}
	handleEditorUpdate() {
		let e = this.editor.isEditable;
		e !== this.lastEditableState && (this.lastEditableState = e, e ? e && this.handleMap.size === 0 && this.attachHandles() : this.removeHandles());
	}
	update(e, t, n) {
		return e.type === this.node.type && (this.node = e, !this.onUpdate || this.onUpdate(e, t, n));
	}
	destroy() {
		this.isResizing && (this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp), this.isResizing = !1, this.activeHandle = null), this.editor.off("update", this.handleEditorUpdate.bind(this)), this.container.remove();
	}
	createContainer() {
		let e = document.createElement("div");
		return e.dataset.resizeContainer = "", e.dataset.node = this.node.type.name, e.style.display = this.node.type.isInline ? "inline-flex" : "flex", this.classNames.container && (e.className = this.classNames.container), e.appendChild(this.wrapper), e;
	}
	createWrapper() {
		let e = document.createElement("div");
		return e.style.position = "relative", e.style.display = "block", e.dataset.resizeWrapper = "", this.classNames.wrapper && (e.className = this.classNames.wrapper), e.appendChild(this.element), e;
	}
	createHandle(e) {
		let t = document.createElement("div");
		return t.dataset.resizeHandle = e, t.style.position = "absolute", this.classNames.handle && (t.className = this.classNames.handle), t;
	}
	positionHandle(e, t) {
		let n = t.includes("top"), r = t.includes("bottom"), i = t.includes("left"), a = t.includes("right");
		n && (e.style.top = "0"), r && (e.style.bottom = "0"), i && (e.style.left = "0"), a && (e.style.right = "0"), (t === "top" || t === "bottom") && (e.style.left = "0", e.style.right = "0"), (t === "left" || t === "right") && (e.style.top = "0", e.style.bottom = "0");
	}
	attachHandles() {
		this.directions.forEach((e) => {
			let t;
			t = this.createCustomHandle ? this.createCustomHandle(e) : this.createHandle(e), t instanceof HTMLElement || (console.warn(`[ResizableNodeView] createCustomHandle("${e}") did not return an HTMLElement. Falling back to default handle.`), t = this.createHandle(e)), this.createCustomHandle || this.positionHandle(t, e), t.addEventListener("mousedown", (t) => this.handleResizeStart(t, e)), t.addEventListener("touchstart", (t) => this.handleResizeStart(t, e)), this.handleMap.set(e, t), this.wrapper.appendChild(t);
		});
	}
	removeHandles() {
		this.handleMap.forEach((e) => e.remove()), this.handleMap.clear();
	}
	applyInitialSize() {
		let e = this.node.attrs.width, t = this.node.attrs.height;
		e ? (this.element.style.width = `${e}px`, this.initialWidth = e) : this.initialWidth = this.element.offsetWidth, t ? (this.element.style.height = `${t}px`, this.initialHeight = t) : this.initialHeight = this.element.offsetHeight, this.initialWidth > 0 && this.initialHeight > 0 && (this.aspectRatio = this.initialWidth / this.initialHeight);
	}
	handleResizeStart(e, t) {
		e.preventDefault(), e.stopPropagation(), this.isResizing = !0, this.activeHandle = t, SC(e) ? (this.startX = e.touches[0].clientX, this.startY = e.touches[0].clientY) : (this.startX = e.clientX, this.startY = e.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
	}
	handleResize(e, t) {
		if (!this.activeHandle) return;
		let n = this.preserveAspectRatio || this.isShiftKeyPressed, { width: r, height: i } = this.calculateNewDimensions(this.activeHandle, e, t), a = this.applyConstraints(r, i, n);
		this.element.style.width = `${a.width}px`, this.element.style.height = `${a.height}px`, this.onResize && this.onResize(a.width, a.height);
	}
	calculateNewDimensions(e, t, n) {
		let r = this.startWidth, i = this.startHeight, a = e.includes("right"), o = e.includes("left"), s = e.includes("bottom"), c = e.includes("top");
		return a ? r = this.startWidth + t : o && (r = this.startWidth - t), s ? i = this.startHeight + n : c && (i = this.startHeight - n), (e === "right" || e === "left") && (r = this.startWidth + (a ? t : -t)), (e === "top" || e === "bottom") && (i = this.startHeight + (s ? n : -n)), this.preserveAspectRatio || this.isShiftKeyPressed ? this.applyAspectRatio(r, i, e) : {
			width: r,
			height: i
		};
	}
	applyConstraints(e, t, n) {
		if (!n) {
			let n = Math.max(this.minSize.width, e), r = Math.max(this.minSize.height, t);
			return this.maxSize?.width && (n = Math.min(this.maxSize.width, n)), this.maxSize?.height && (r = Math.min(this.maxSize.height, r)), {
				width: n,
				height: r
			};
		}
		let r = e, i = t;
		return r < this.minSize.width && (r = this.minSize.width, i = r / this.aspectRatio), i < this.minSize.height && (i = this.minSize.height, r = i * this.aspectRatio), this.maxSize?.width && r > this.maxSize.width && (r = this.maxSize.width, i = r / this.aspectRatio), this.maxSize?.height && i > this.maxSize.height && (i = this.maxSize.height, r = i * this.aspectRatio), {
			width: r,
			height: i
		};
	}
	applyAspectRatio(e, t, n) {
		return n === "left" || n === "right" ? {
			width: e,
			height: e / this.aspectRatio
		} : n === "top" || n === "bottom" ? {
			width: t * this.aspectRatio,
			height: t
		} : {
			width: e,
			height: e / this.aspectRatio
		};
	}
}, wC = class e extends qS {
	constructor(...e) {
		super(...e), this.type = "node";
	}
	static create(t = {}) {
		let n = typeof t == "function" ? t() : t;
		return new e(n);
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
};
function TC(e) {
	return new YS({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = J(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let i = c.search(/\S/), u = n.from + c.indexOf(s), d = u + s.length;
				if (nx(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > u).length) return null;
				d < n.to && o.delete(d, n.to), u > n.from && o.delete(n.from + i, u), l = n.from + i + s.length, o.addMark(n.from + i, l, e.type.create(a || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(e.type);
			}
		}
	});
}
// node_modules/@tiptap/vue-3/dist/index.js
function EC(e) {
	return c((t, n) => ({
		get() {
			return t(), e;
		},
		set(t) {
			e = t, requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					n();
				});
			});
		}
	}));
}
var DC = class extends _C {
	constructor(e = {}) {
		return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = EC(this.view.state), this.reactiveExtensionStorage = EC(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
			this.reactiveState.value = e, this.reactiveExtensionStorage.value = this.extensionStorage;
		}), f(this);
	}
	get state() {
		return this.reactiveState ? this.reactiveState.value : this.view.state;
	}
	get storage() {
		return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
	}
	registerPlugin(e, t) {
		let n = super.registerPlugin(e, t);
		return this.reactiveState && (this.reactiveState.value = n), n;
	}
	unregisterPlugin(e) {
		let t = super.unregisterPlugin(e);
		return this.reactiveState && t && (this.reactiveState.value = t), t;
	}
}, OC = l({
	name: "EditorContent",
	props: { editor: {
		default: null,
		type: Object
	} },
	setup(e) {
		let t = v(), n = u();
		return te(() => {
			let r = e.editor;
			r && r.options.element && t.value && p(() => {
				if (!t.value || !r.view.dom?.parentNode) return;
				let e = S(t.value);
				t.value.append(...r.view.dom.parentNode.childNodes), r.contentComponent = n.ctx._, n && (r.appContext = {
					...n.appContext,
					provides: n.provides
				}), r.setOptions({ element: e }), r.createNodeViews();
			});
		}), g(() => {
			let t = e.editor;
			t && (t.contentComponent = null, t.appContext = null);
		}), { rootEl: t };
	},
	render() {
		return d("div", { ref: (e) => {
			this.rootEl = e;
		} });
	}
});
l({
	name: "NodeViewContent",
	props: { as: {
		type: String,
		default: "div"
	} },
	inject: { nodeViewContentRef: { default: void 0 } },
	mounted() {
		let e = this.nodeViewContentRef;
		e && this.$el && e(this.$el);
	},
	beforeUnmount() {
		let e = this.nodeViewContentRef;
		e && e(null);
	},
	render() {
		return d(this.as, {
			style: { whiteSpace: "pre-wrap" },
			"data-node-view-content": ""
		});
	}
}), l({
	name: "NodeViewWrapper",
	props: { as: {
		type: String,
		default: "div"
	} },
	inject: ["onDragStart", "decorationClasses"],
	render() {
		var e;
		return d(this.as, {
			class: this.decorationClasses,
			style: { whiteSpace: "normal" },
			"data-node-view-wrapper": "",
			onDragstart: this.onDragStart
		}, (e = this.$slots).default?.call(e));
	}
}), l({
	name: "MarkViewContent",
	props: { as: {
		type: String,
		default: "span"
	} },
	render() {
		return d(this.as, {
			style: { whiteSpace: "inherit" },
			"data-mark-view-content": ""
		});
	}
});
// node_modules/@tiptap/core/dist/jsx-runtime/jsx-runtime.js
var kC = /* @__PURE__ */ new WeakSet(), AC = /* @__PURE__ */ new WeakSet();
function jC(e) {
	let t = e;
	return kC.add(t), t;
}
function MC(e) {
	return Array.isArray(e) && kC.has(e);
}
function NC(e) {
	return e.flatMap((e) => e == null ? [] : Array.isArray(e) && AC.has(e) && !MC(e) ? NC(e) : [e]);
}
function PC(e, t) {
	if (e === "slot") return 0;
	if (e instanceof Function) {
		let n = e(t);
		return Array.isArray(n) && !MC(n) && !AC.has(n) ? jC(n) : n;
	}
	let { children: n, ...r } = t ?? {};
	if (e === "svg") throw Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
	if (Array.isArray(n)) {
		if (MC(n)) return jC([
			e,
			r,
			n
		]);
		if (n.length === 0) return jC([e, r]);
		let t = NC(n);
		return t.length === 0 ? jC([e, r]) : jC([
			e,
			r,
			...t
		]);
	}
	return jC(n == null ? [e, r] : [
		e,
		r,
		n
	]);
}
var FC = (e, t) => PC(e, t), IC = (e, t) => {
	let { state: n } = e, { selection: r } = n;
	if (!r.empty) return !1;
	let { $from: i } = r;
	if (i.parentOffset !== 0) return !1;
	let a = i.depth - 1;
	if (a < 0) return !1;
	let o = i.node(a), s = i.index(a);
	if (s === 0) return !1;
	if (o.type === t) return e.commands.lift(t.name);
	let c = o.child(s - 1);
	if (c.type !== t || !c.lastChild?.isTextblock) return !1;
	let l = i.before() - 1 - 1;
	return e.commands.command(({ tr: e, dispatch: t }) => {
		if (!t) return !0;
		let n = i.parent.content, r = new B(n, 0, 0);
		return e.replace(l, i.after(), r), e.setSelection(H.create(e.doc, l + n.size)), e.scrollIntoView(), t(e), !0;
	});
}, LC = /^\s*>\s$/, RC = wC.create({
	name: "blockquote",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	content: "block+",
	group: "block",
	defining: !0,
	parseHTML() {
		return [{ tag: "blockquote" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return /* @__PURE__ */ FC("blockquote", {
			...Y(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ FC("slot", {})
		});
	},
	parseMarkdown: (e, t) => {
		let n = t.parseBlockChildren ?? t.parseChildren;
		return t.createNode("blockquote", void 0, n(e.tokens || []));
	},
	renderMarkdown: (e, t) => {
		if (!e.content) return "";
		let n = [];
		return e.content.forEach((e, r) => {
			let i = (t.renderChild?.call(t, e, r) ?? t.renderChildren([e])).split("\n").map((e) => e.trim() === "" ? ">" : `> ${e}`);
			n.push(i.join("\n"));
		}), n.join("\n>\n");
	},
	addCommands() {
		return {
			setBlockquote: () => ({ commands: e }) => e.wrapIn(this.name),
			toggleBlockquote: () => ({ commands: e }) => e.toggleWrap(this.name),
			unsetBlockquote: () => ({ commands: e }) => e.lift(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
			Backspace: () => IC(this.editor, this.type)
		};
	},
	addInputRules() {
		return [xC({
			find: LC,
			type: this.type
		})];
	}
}), zC = RC, BC = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, VC = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, HC = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, UC = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, WC = JS.create({
	name: "bold",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "strong" },
			{
				tag: "b",
				getAttrs: (e) => e.style.fontWeight !== "normal" && null
			},
			{
				style: "font-weight=400",
				clearMark: (e) => e.type.name === this.name
			},
			{
				style: "font-weight",
				getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return /* @__PURE__ */ FC("strong", {
			...Y(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ FC("slot", {})
		});
	},
	markdownTokenName: "strong",
	parseMarkdown: (e, t) => t.applyMark("bold", t.parseInline(e.tokens || [])),
	markdownOptions: { htmlReopen: {
		open: "<strong>",
		close: "</strong>"
	} },
	renderMarkdown: (e, t) => `**${t.renderChildren(e)}**`,
	addCommands() {
		return {
			setBold: () => ({ commands: e }) => e.setMark(this.name),
			toggleBold: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetBold: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-b": () => this.editor.commands.toggleBold(),
			"Mod-B": () => this.editor.commands.toggleBold()
		};
	},
	addInputRules() {
		return [vC({
			find: BC,
			type: this.type
		}), vC({
			find: HC,
			type: this.type
		})];
	},
	addPasteRules() {
		return [TC({
			find: VC,
			type: this.type
		}), TC({
			find: UC,
			type: this.type
		})];
	}
}), GC = WC, KC = (e) => {
	let t = /`([^`]+)`(?!`)$/.exec(e);
	return !t || t.index > 0 && e[t.index - 1] === "`" ? null : {
		index: t.index,
		text: t[0],
		replaceWith: t[1]
	};
}, qC = (e) => {
	let t = /`([^`]+)`(?!`)/g, n = [], r;
	for (; (r = t.exec(e)) !== null;) r.index > 0 && e[r.index - 1] === "`" || n.push({
		index: r.index,
		text: r[0],
		replaceWith: r[1]
	});
	return n;
};
function JC(e) {
	let t = new Set((e.match(/`+/g) || []).map((e) => e.length)), n = 1;
	for (; t.has(n);) n += 1;
	return n;
}
var YC = JS.create({
	name: "code",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	excludes: "_",
	code: !0,
	exitable: !0,
	parseHTML() {
		return [{ tag: "code" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"code",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "codespan",
	parseMarkdown: (e, t) => t.applyMark("code", [{
		type: "text",
		text: e.text || ""
	}]),
	renderMarkdown: (e, t, n) => {
		var r;
		if (!e.content) return "";
		let i = typeof (n == null || (r = n.meta) == null ? void 0 : r.markText) == "string" ? n.meta.markText : "", a = "`".repeat(JC(i)), o = i.startsWith("`") || i.endsWith("`") ? " " : "";
		return `${a}${o}${t.renderChildren(e.content)}${o}${a}`;
	},
	addCommands() {
		return {
			setCode: () => ({ commands: e }) => e.setMark(this.name),
			toggleCode: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetCode: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-e": () => this.editor.commands.toggleCode() };
	},
	addInputRules() {
		return [vC({
			find: KC,
			type: this.type
		})];
	},
	addPasteRules() {
		return [TC({
			find: qC,
			type: this.type
		})];
	}
}), XC = 4, ZC = /^```([a-z]+)?[\s\n]$/, QC = /^~~~([a-z]+)?[\s\n]$/, $C = wC.create({
	name: "codeBlock",
	addOptions() {
		return {
			languageClassPrefix: "language-",
			exitOnTripleEnter: !0,
			exitOnArrowDown: !0,
			exitOnArrowUp: !0,
			defaultLanguage: null,
			enableTabIndentation: !1,
			tabSize: XC,
			HTMLAttributes: {}
		};
	},
	content: "text*",
	marks: "",
	group: "block",
	code: !0,
	defining: !0,
	addAttributes() {
		return { language: {
			default: this.options.defaultLanguage,
			parseHTML: (e) => {
				let { languageClassPrefix: t } = this.options;
				return t && [...e.firstElementChild?.classList || []].filter((e) => e.startsWith(t)).map((e) => e.replace(t, ""))[0] || null;
			},
			rendered: !1
		} };
	},
	parseHTML() {
		return [{
			tag: "pre",
			preserveWhitespace: "full"
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			"pre",
			Y(this.options.HTMLAttributes, t),
			[
				"code",
				{ class: e.attrs.language ? this.options.languageClassPrefix + e.attrs.language : null },
				0
			]
		];
	},
	markdownTokenName: "code",
	parseMarkdown: (e, t) => e.raw?.startsWith("```") === !1 && e.raw?.startsWith("~~~") === !1 && e.codeBlockStyle !== "indented" ? [] : t.createNode("codeBlock", { language: e.lang || null }, e.text ? [t.createTextNode(e.text)] : []),
	renderMarkdown: (e, t) => {
		let n = "", r = e.attrs?.language || "";
		return n = e.content ? [
			`\`\`\`${r}`,
			t.renderChildren(e.content),
			"```"
		].join("\n") : `\`\`\`${r}\n\n\`\`\``, n;
	},
	addCommands() {
		return {
			setCodeBlock: (e) => ({ commands: t }) => t.setNode(this.name, e),
			toggleCodeBlock: (e) => ({ commands: t }) => t.toggleNode(this.name, "paragraph", e)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
			Backspace: () => {
				let { empty: e, $anchor: t } = this.editor.state.selection, n = t.pos === 1;
				return !e || t.parent.type.name !== this.name ? !1 : n || !t.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
			},
			Tab: ({ editor: e }) => {
				if (!this.options.enableTabIndentation) return !1;
				let t = this.options.tabSize ?? XC, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
				if (i.parent.type !== this.type) return !1;
				let o = " ".repeat(t);
				return a ? e.commands.insertContent(o) : e.commands.command(({ tr: e }) => {
					let { from: t, to: i } = r, a = n.doc.textBetween(t, i, "\n", "\n").split("\n").map((e) => o + e).join("\n");
					return e.replaceWith(t, i, n.schema.text(a)), !0;
				});
			},
			"Shift-Tab": ({ editor: e }) => {
				if (!this.options.enableTabIndentation) return !1;
				let t = this.options.tabSize ?? XC, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
				return i.parent.type === this.type ? a ? e.commands.command(({ tr: e }) => {
					let { pos: r } = i, a = i.start(), o = i.end(), s = n.doc.textBetween(a, o, "\n", "\n").split("\n"), c = 0, l = 0, u = r - a;
					for (let e = 0; e < s.length; e += 1) {
						if (l + s[e].length >= u) {
							c = e;
							break;
						}
						l += s[e].length + 1;
					}
					let d = s[c].match(/^ */)?.[0] || "", f = Math.min(d.length, t);
					if (f === 0) return !0;
					let p = a;
					for (let e = 0; e < c; e += 1) p += s[e].length + 1;
					return e.delete(p, p + f), r - p <= f && e.setSelection(H.create(e.doc, p)), !0;
				}) : e.commands.command(({ tr: e }) => {
					let { from: i, to: a } = r, o = n.doc.textBetween(i, a, "\n", "\n").split("\n").map((e) => {
						let n = e.match(/^ */)?.[0] || "", r = Math.min(n.length, t);
						return e.slice(r);
					}).join("\n");
					return e.replaceWith(i, a, n.schema.text(o)), !0;
				}) : !1;
			},
			Enter: ({ editor: e }) => {
				if (!this.options.exitOnTripleEnter) return !1;
				let { state: t } = e, { selection: n } = t, { $from: r, empty: i } = n;
				if (!i || r.parent.type !== this.type) return !1;
				let a = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith("\n\n");
				return !a || !o ? !1 : e.chain().command(({ tr: e }) => (e.delete(r.pos - 2, r.pos), !0)).exitCode().run();
			},
			ArrowUp: ({ editor: e }) => {
				if (!this.options.exitOnArrowUp) return !1;
				let { state: t } = e, { selection: n } = t, { $from: r, empty: i } = n;
				if (!i || r.parent.type !== this.type || r.parentOffset !== 0) return !1;
				let a = r.before();
				return a > 0 ? !1 : e.commands.insertDefaultBlock({ pos: a });
			},
			ArrowDown: ({ editor: e }) => {
				if (!this.options.exitOnArrowDown) return !1;
				let { state: t } = e, { selection: n, doc: r } = t, { $from: i, empty: a } = n;
				if (!a || i.parent.type !== this.type || i.parentOffset !== i.parent.nodeSize - 2) return !1;
				let o = i.after();
				return o === void 0 ? !1 : r.nodeAt(o) ? e.commands.command(({ tr: e }) => (e.setSelection(V.near(r.resolve(o))), !0)) : e.commands.exitCode();
			}
		};
	},
	addInputRules() {
		return [bC({
			find: ZC,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		}), bC({
			find: QC,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		})];
	},
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("codeBlockVSCodeHandler"),
			props: { handlePaste: (e, t) => {
				if (!t.clipboardData || this.editor.isActive(this.type.name)) return !1;
				let n = t.clipboardData.getData("text/plain"), r = t.clipboardData.getData("vscode-editor-data"), i = (r ? JSON.parse(r) : void 0)?.mode;
				if (!n || !i) return !1;
				let { tr: a, schema: o } = e.state, s = o.text(n.replace(/\r\n?/g, "\n"));
				return a.replaceSelectionWith(this.type.create({ language: i }, s)), a.selection.$from.parent.type !== this.type && a.setSelection(H.near(a.doc.resolve(Math.max(0, a.selection.from - 2)))), a.setMeta("paste", !0), e.dispatch(a), !0;
			} }
		})];
	}
}), ew = wC.create({
	name: "doc",
	topNode: !0,
	content: "block+",
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n\n") : ""
}), tw = wC.create({
	name: "hardBreak",
	markdownTokenName: "br",
	addOptions() {
		return {
			keepMarks: !0,
			HTMLAttributes: {}
		};
	},
	inline: !0,
	group: "inline",
	selectable: !1,
	linebreakReplacement: !0,
	parseHTML() {
		return [{ tag: "br" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["br", Y(this.options.HTMLAttributes, e)];
	},
	renderText() {
		return "\n";
	},
	renderMarkdown: () => "  \n",
	parseMarkdown: () => ({ type: "hardBreak" }),
	addCommands() {
		return { setHardBreak: () => ({ commands: e, chain: t, state: n, editor: r }) => e.first([() => e.exitCode(), () => e.command(() => {
			let { selection: e, storedMarks: i } = n;
			if (e.$from.parent.type.spec.isolating) return !1;
			let { keepMarks: a } = this.options, { splittableMarks: o } = r.extensionManager, s = i || e.$to.parentOffset && e.$from.marks();
			return t().insertContent({ type: this.name }).command(({ tr: e, dispatch: t }) => {
				if (t && s && a) {
					let t = s.filter((e) => o.includes(e.type.name));
					e.ensureMarks(t);
				}
				return !0;
			}).scrollIntoView().run();
		})]) };
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Enter": () => this.editor.commands.setHardBreak(),
			"Shift-Enter": () => this.editor.commands.setHardBreak()
		};
	}
}), nw = wC.create({
	name: "heading",
	addOptions() {
		return {
			levels: [
				1,
				2,
				3,
				4,
				5,
				6
			],
			HTMLAttributes: {}
		};
	},
	content: "inline*",
	group: "block",
	defining: !0,
	addAttributes() {
		return { level: {
			default: 1,
			rendered: !1
		} };
	},
	parseHTML() {
		return this.options.levels.map((e) => ({
			tag: `h${e}`,
			attrs: { level: e }
		}));
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			`h${this.options.levels.includes(e.attrs.level) ? e.attrs.level : this.options.levels[0]}`,
			Y(this.options.HTMLAttributes, t),
			0
		];
	},
	parseMarkdown: (e, t) => t.createNode("heading", { level: e.depth || 1 }, t.parseInline(e.tokens || [])),
	renderMarkdown: (e, t) => {
		let n = e.attrs?.level ? parseInt(e.attrs.level, 10) : 1, r = "#".repeat(n);
		return e.content ? `${r} ${t.renderChildren(e.content)}` : "";
	},
	addCommands() {
		return {
			setHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.setNode(this.name, e) : !1,
			toggleHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.toggleNode(this.name, "paragraph", e) : !1
		};
	},
	addKeyboardShortcuts() {
		return this.options.levels.reduce((e, t) => ({
			...e,
			[`Mod-Alt-${t}`]: () => this.editor.commands.toggleHeading({ level: t })
		}), {});
	},
	addInputRules() {
		return this.options.levels.map((e) => bC({
			find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
			type: this.type,
			getAttributes: { level: e }
		}));
	}
}), rw = wC.create({
	name: "horizontalRule",
	addOptions() {
		return {
			HTMLAttributes: {},
			nextNodeType: "paragraph"
		};
	},
	group: "block",
	parseHTML() {
		return [{ tag: "hr" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["hr", Y(this.options.HTMLAttributes, e)];
	},
	markdownTokenName: "hr",
	parseMarkdown: (e, t) => t.createNode("horizontalRule"),
	renderMarkdown: () => "---",
	addCommands() {
		return { setHorizontalRule: () => ({ chain: e, state: t }) => {
			if (!OS(t, t.schema.nodes[this.name])) return !1;
			let { selection: n } = t, { $to: r } = n, i = e();
			return hx(n) ? i.insertContentAt(r.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: e, tr: t, dispatch: n }) => {
				if (n) {
					let { $to: n } = t.selection, r = n.end();
					if (n.nodeAfter) n.nodeAfter.isTextblock ? t.setSelection(H.create(t.doc, n.pos + 1)) : n.nodeAfter.isBlock ? t.setSelection(U.create(t.doc, n.pos)) : t.setSelection(H.create(t.doc, n.pos));
					else {
						let i = (e.schema.nodes[this.options.nextNodeType] || n.parent.type.contentMatch.defaultType)?.create();
						i && (t.insert(r, i), t.setSelection(H.create(t.doc, r + 1)));
					}
					t.scrollIntoView();
				}
				return !0;
			}).run();
		} };
	},
	addInputRules() {
		return [yC({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
}), iw = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, aw = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, ow = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, sw = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, cw = JS.create({
	name: "italic",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "em" },
			{
				tag: "i",
				getAttrs: (e) => e.style.fontStyle !== "normal" && null
			},
			{
				style: "font-style=normal",
				clearMark: (e) => e.type.name === this.name
			},
			{ style: "font-style=italic" }
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"em",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setItalic: () => ({ commands: e }) => e.setMark(this.name),
			toggleItalic: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetItalic: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	markdownTokenName: "em",
	parseMarkdown: (e, t) => t.applyMark("italic", t.parseInline(e.tokens || [])),
	markdownOptions: { htmlReopen: {
		open: "<em>",
		close: "</em>"
	} },
	renderMarkdown: (e, t) => `*${t.renderChildren(e)}*`,
	addKeyboardShortcuts() {
		return {
			"Mod-i": () => this.editor.commands.toggleItalic(),
			"Mod-I": () => this.editor.commands.toggleItalic()
		};
	},
	addInputRules() {
		return [vC({
			find: iw,
			type: this.type
		}), vC({
			find: ow,
			type: this.type
		})];
	},
	addPasteRules() {
		return [TC({
			find: aw,
			type: this.type
		}), TC({
			find: sw,
			type: this.type
		})];
	}
}), lw = cw, uw = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos6kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12b0cam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", dw = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", fw = "numeric", pw = "ascii", mw = "alpha", hw = "asciinumeric", gw = "alphanumeric", _w = "domain", vw = "emoji", yw = "scheme", bw = "slashscheme", xw = "whitespace";
function Sw(e, t) {
	return e in t || (t[e] = []), t[e];
}
function Cw(e, t, n) {
	t[fw] && (t[hw] = !0, t[gw] = !0), t[pw] && (t[hw] = !0, t[mw] = !0), t[hw] && (t[gw] = !0), t[mw] && (t[gw] = !0), t[gw] && (t[_w] = !0), t[vw] && (t[_w] = !0);
	for (let r in t) {
		let t = Sw(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function ww(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function Tw(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
Tw.groups = {}, Tw.prototype = {
	accepts() {
		return !!this.t;
	},
	go(e) {
		let t = this, n = t.j[e];
		if (n) return n;
		for (let n = 0; n < t.jr.length; n++) {
			let r = t.jr[n][0], i = t.jr[n][1];
			if (i && r.test(e)) return i;
		}
		return t.jd;
	},
	has(e, t = !1) {
		return t ? e in this.j : !!this.go(e);
	},
	ta(e, t, n, r) {
		for (let i = 0; i < e.length; i++) this.tt(e[i], t, n, r);
	},
	tr(e, t, n, r) {
		r ||= Tw.groups;
		let i;
		return t && t.j ? i = t : (i = new Tw(t), n && r && Cw(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= Tw.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new Tw(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new Tw(), a && (r && (o.t && typeof o.t == "string" ? Cw(a, Object.assign(ww(o.t, r), n), r) : n && Cw(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var Z = (e, t, n, r, i) => e.ta(t, n, r, i), Ew = (e, t, n, r, i) => e.tr(t, n, r, i), Dw = (e, t, n, r, i) => e.ts(t, n, r, i), Q = (e, t, n, r, i) => e.tt(t, n, r, i), Ow = "WORD", kw = "UWORD", Aw = "ASCIINUMERICAL", jw = "ALPHANUMERICAL", Mw = "LOCALHOST", Nw = "TLD", Pw = "UTLD", Fw = "SCHEME", Iw = "SLASH_SCHEME", Lw = "NUM", Rw = "WS", zw = "NL", Bw = "OPENBRACE", Vw = "CLOSEBRACE", Hw = "OPENBRACKET", Uw = "CLOSEBRACKET", Ww = "OPENPAREN", Gw = "CLOSEPAREN", Kw = "OPENANGLEBRACKET", qw = "CLOSEANGLEBRACKET", Jw = "FULLWIDTHLEFTPAREN", Yw = "FULLWIDTHRIGHTPAREN", Xw = "LEFTCORNERBRACKET", Zw = "RIGHTCORNERBRACKET", Qw = "LEFTWHITECORNERBRACKET", $w = "RIGHTWHITECORNERBRACKET", eT = "FULLWIDTHLESSTHAN", tT = "FULLWIDTHGREATERTHAN", nT = "AMPERSAND", rT = "APOSTROPHE", iT = "ASTERISK", aT = "AT", oT = "BACKSLASH", sT = "BACKTICK", cT = "CARET", lT = "COLON", uT = "COMMA", dT = "DOLLAR", fT = "DOT", pT = "EQUALS", mT = "EXCLAMATION", hT = "HYPHEN", gT = "PERCENT", _T = "PIPE", vT = "PLUS", yT = "POUND", bT = "QUERY", xT = "QUOTE", ST = "FULLWIDTHMIDDLEDOT", CT = "SEMI", wT = "SLASH", TT = "TILDE", ET = "UNDERSCORE", DT = "EMOJI", OT = "SYM", kT = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: jw,
	AMPERSAND: nT,
	APOSTROPHE: rT,
	ASCIINUMERICAL: Aw,
	ASTERISK: iT,
	AT: aT,
	BACKSLASH: oT,
	BACKTICK: sT,
	CARET: cT,
	CLOSEANGLEBRACKET: qw,
	CLOSEBRACE: Vw,
	CLOSEBRACKET: Uw,
	CLOSEPAREN: Gw,
	COLON: lT,
	COMMA: uT,
	DOLLAR: dT,
	DOT: fT,
	EMOJI: DT,
	EQUALS: pT,
	EXCLAMATION: mT,
	FULLWIDTHGREATERTHAN: tT,
	FULLWIDTHLEFTPAREN: Jw,
	FULLWIDTHLESSTHAN: eT,
	FULLWIDTHMIDDLEDOT: ST,
	FULLWIDTHRIGHTPAREN: Yw,
	HYPHEN: hT,
	LEFTCORNERBRACKET: Xw,
	LEFTWHITECORNERBRACKET: Qw,
	LOCALHOST: Mw,
	NL: zw,
	NUM: Lw,
	OPENANGLEBRACKET: Kw,
	OPENBRACE: Bw,
	OPENBRACKET: Hw,
	OPENPAREN: Ww,
	PERCENT: gT,
	PIPE: _T,
	PLUS: vT,
	POUND: yT,
	QUERY: bT,
	QUOTE: xT,
	RIGHTCORNERBRACKET: Zw,
	RIGHTWHITECORNERBRACKET: $w,
	SCHEME: Fw,
	SEMI: CT,
	SLASH: wT,
	SLASH_SCHEME: Iw,
	SYM: OT,
	TILDE: TT,
	TLD: Nw,
	UNDERSCORE: ET,
	UTLD: Pw,
	UWORD: kw,
	WORD: Ow,
	WS: Rw
}), AT = /[a-z]/, jT = /[a-z]/i, MT = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]|\u{FE0F}/u;
try {
	jT = /* @__PURE__ */ RegExp("\\p{L}", "u"), MT = /* @__PURE__ */ RegExp("\\p{Emoji}", "u");
} catch {}
var NT = /\d/, PT = /\s/, FT = "\r", IT = "\n", LT = "️", RT = "‍", zT = "￼", BT = null, VT = null;
function HT(e = []) {
	let t = {};
	Tw.groups = t;
	let n = new Tw();
	BT ??= KT(uw), VT ??= KT(dw), Q(n, "'", rT), Q(n, "{", Bw), Q(n, "}", Vw), Q(n, "[", Hw), Q(n, "]", Uw), Q(n, "(", Ww), Q(n, ")", Gw), Q(n, "<", Kw), Q(n, ">", qw), Q(n, "（", Jw), Q(n, "）", Yw), Q(n, "「", Xw), Q(n, "」", Zw), Q(n, "『", Qw), Q(n, "』", $w), Q(n, "＜", eT), Q(n, "＞", tT), Q(n, "&", nT), Q(n, "*", iT), Q(n, "@", aT), Q(n, "`", sT), Q(n, "^", cT), Q(n, ":", lT), Q(n, ",", uT), Q(n, "$", dT), Q(n, ".", fT), Q(n, "=", pT), Q(n, "!", mT), Q(n, "-", hT), Q(n, "%", gT), Q(n, "|", _T), Q(n, "+", vT), Q(n, "#", yT), Q(n, "?", bT), Q(n, "\"", xT), Q(n, "/", wT), Q(n, ";", CT), Q(n, "~", TT), Q(n, "_", ET), Q(n, "\\", oT), Q(n, "・", ST);
	let r = Ew(n, NT, Lw, { [fw]: !0 });
	Ew(r, NT, r);
	let i = Ew(r, AT, Aw, { [hw]: !0 }), a = Ew(r, jT, jw, { [gw]: !0 }), o = Ew(n, AT, Ow, { [pw]: !0 });
	Ew(o, NT, i), Ew(o, AT, o), Ew(i, NT, i), Ew(i, AT, i);
	let s = Ew(n, jT, kw, { [mw]: !0 });
	Ew(s, AT), Ew(s, NT, a), Ew(s, jT, s), Ew(a, NT, a), Ew(a, AT), Ew(a, jT, a);
	let c = Q(n, IT, zw, { [xw]: !0 }), l = Q(n, FT, Rw, { [xw]: !0 }), u = Ew(n, PT, Rw, { [xw]: !0 });
	Q(n, zT, u), Q(l, IT, c), Q(l, zT, u), Ew(l, PT, u), Q(u, FT), Q(u, IT), Ew(u, PT, u), Q(u, zT, u);
	let d = Ew(n, MT, DT, { [vw]: !0 });
	Q(d, "#"), Ew(d, MT, d), Q(d, LT, d);
	let f = Q(d, RT);
	Q(f, "#"), Ew(f, MT, d);
	let p = [[AT, o], [NT, i]], m = [
		[AT, null],
		[jT, s],
		[NT, a]
	];
	for (let e = 0; e < BT.length; e++) GT(n, BT[e], Nw, Ow, p);
	for (let e = 0; e < VT.length; e++) GT(n, VT[e], Pw, kw, m);
	Cw(Nw, {
		tld: !0,
		ascii: !0
	}, t), Cw(Pw, {
		utld: !0,
		alpha: !0
	}, t), GT(n, "file", Fw, Ow, p), GT(n, "mailto", Fw, Ow, p), GT(n, "http", Iw, Ow, p), GT(n, "https", Iw, Ow, p), GT(n, "ftp", Iw, Ow, p), GT(n, "ftps", Iw, Ow, p), Cw(Fw, {
		scheme: !0,
		ascii: !0
	}, t), Cw(Iw, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [yw]: !0 } : { [bw]: !0 };
		r.indexOf("-") >= 0 ? i[_w] = !0 : AT.test(r) ? NT.test(r) ? i[hw] = !0 : i[pw] = !0 : i[fw] = !0, Dw(n, r, r, i);
	}
	return Dw(n, "localhost", Mw, { ascii: !0 }), n.jd = new Tw(OT), {
		start: n,
		tokens: Object.assign({ groups: t }, kT)
	};
}
function UT(e, t) {
	let n = WT(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
	for (; o < r;) {
		let s = e, c = null, l = 0, u = null, d = -1, f = -1;
		for (; o < r && (c = s.go(n[o]));) s = c, s.accepts() ? (d = 0, f = 0, u = s) : d >= 0 && (d += n[o].length, f++), l += n[o].length, a += n[o].length, o++;
		a -= d, o -= f, l -= d, i.push({
			t: u.t,
			v: t.slice(a - l, a),
			s: a - l,
			e: a
		});
	}
	return i;
}
function WT(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function GT(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new Tw(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new Tw(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function KT(e) {
	let t = [], n = [], r = 0;
	for (; r < e.length;) {
		let i = 0;
		for (; "0123456789".indexOf(e[r + i]) >= 0;) i++;
		if (i > 0) {
			t.push(n.join(""));
			for (let t = parseInt(e.substring(r, r + i), 10); t > 0; t--) n.pop();
			r += i;
		} else n.push(e[r]), r++;
	}
	return t;
}
var qT = {
	defaultProtocol: "http",
	events: null,
	format: YT,
	formatHref: YT,
	nl2br: !1,
	tagName: "a",
	target: null,
	rel: null,
	validate: !0,
	truncate: Infinity,
	className: null,
	attributes: null,
	ignoreTags: [],
	ignoreClasses: [],
	render: null
};
function JT(e, t = null) {
	let n = Object.assign({}, qT);
	e && (n = Object.assign(n, e instanceof JT ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i, this.ignoreClasses = n.ignoreClasses.slice();
}
JT.prototype = {
	o: qT,
	ignoreTags: [],
	ignoreClasses: [],
	isIgnoredClass(e) {
		if (typeof e != "string" || this.ignoreClasses.length === 0) return !1;
		let t = e.split(/\s+/);
		for (let e = 0; e < t.length; e++) if (this.ignoreClasses.indexOf(t[e]) >= 0) return !0;
		return !1;
	},
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : qT[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
	},
	getObj(e, t, n) {
		let r = this.o[e];
		return typeof r == "function" && t != null && (r = r(t, n.t, n)), r;
	},
	render(e) {
		let t = e.render(this);
		return (this.get("render", null, e) || this.defaultRender)(t, e.t, e);
	}
};
function YT(e) {
	return e;
}
function XT(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
XT.prototype = {
	isLink: !1,
	toString() {
		return this.v;
	},
	toHref(e) {
		return this.toString();
	},
	toFormattedString(e) {
		let t = this.toString(), n = e.get("truncate", t, this), r = e.get("format", t, this);
		return n && r.length > n ? r.substring(0, n) + "…" : r;
	},
	toFormattedHref(e) {
		return e.get("formatHref", this.toHref(e.get("defaultProtocol")), this);
	},
	startIndex() {
		return this.tk[0].s;
	},
	endIndex() {
		return this.tk[this.tk.length - 1].e;
	},
	toObject(e = qT.defaultProtocol) {
		return {
			type: this.t,
			value: this.toString(),
			isLink: this.isLink,
			href: this.toHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	toFormattedObject(e) {
		return {
			type: this.t,
			value: this.toFormattedString(e),
			isLink: this.isLink,
			href: this.toFormattedHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	validate(e) {
		return e.get("validate", this.toString(), this);
	},
	render(e) {
		let t = this, n = this.toHref(e.get("defaultProtocol")), r = e.get("formatHref", n, this), i = e.get("tagName", n, t), a = this.toFormattedString(e), o = {}, s = e.get("className", n, t), c = e.get("target", n, t), l = e.get("rel", n, t), u = e.getObj("attributes", n, t), d = e.getObj("events", n, t);
		return o.href = r, s && (o.class = s), c && (o.target = c), l && (o.rel = l), u && Object.assign(o, u), {
			tagName: i,
			attributes: o,
			content: a,
			eventListeners: d
		};
	}
};
function ZT(e, t) {
	class n extends XT {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var QT = ZT("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), $T = ZT("text"), eE = ZT("nl"), tE = ZT("url", {
	isLink: !0,
	toHref(e = qT.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== Mw && e[1].t === lT;
	}
}), nE = (e) => new Tw(e);
function rE({ groups: e }) {
	let t = e.domain.concat([
		nT,
		iT,
		aT,
		oT,
		sT,
		cT,
		dT,
		pT,
		hT,
		Lw,
		gT,
		_T,
		vT,
		yT,
		wT,
		OT,
		TT,
		ET
	]), n = [
		rT,
		lT,
		uT,
		fT,
		mT,
		gT,
		bT,
		xT,
		CT,
		Kw,
		qw,
		Bw,
		Vw,
		Uw,
		Hw,
		Ww,
		Gw,
		Jw,
		Yw,
		Xw,
		Zw,
		Qw,
		$w,
		eT,
		tT
	], r = [
		nT,
		rT,
		iT,
		oT,
		sT,
		cT,
		dT,
		pT,
		hT,
		Bw,
		Vw,
		gT,
		_T,
		vT,
		yT,
		bT,
		wT,
		OT,
		TT,
		ET
	], i = nE(), a = Q(i, TT);
	Z(a, r, a), Z(a, e.domain, a);
	let o = nE(), s = nE(), c = nE();
	Z(i, e.domain, o), Z(i, e.scheme, s), Z(i, e.slashscheme, c), Z(o, r, a), Z(o, e.domain, o);
	let l = Q(o, aT);
	Q(a, aT, l), Q(s, aT, l), Q(c, aT, l);
	let u = Q(a, fT);
	Z(u, r, a), Z(u, e.domain, a);
	let d = nE();
	Z(l, e.domain, d), Z(d, e.domain, d);
	let f = Q(d, fT);
	Z(f, e.domain, d);
	let p = nE(QT);
	Z(f, e.tld, p), Z(f, e.utld, p), Q(l, Mw, p);
	let m = Q(d, hT);
	Q(m, hT, m), Z(m, e.domain, d), Z(p, e.domain, d), Q(p, fT, f), Q(p, hT, m);
	let h = Q(o, hT), g = Q(o, fT);
	Q(h, hT, h), Z(h, e.domain, o), Z(g, r, a), Z(g, e.domain, o);
	let _ = nE(tE);
	Z(g, e.tld, _), Z(g, e.utld, _), Z(_, e.domain, o), Z(_, r, a), Q(_, fT, g), Q(_, hT, h), Q(_, aT, l);
	let v = Q(_, lT), y = nE(tE);
	Z(v, e.numeric, y);
	let b = nE(tE), x = nE();
	Z(b, t, b), Z(b, n, x), Z(x, t, b), Z(x, n, x), Q(_, wT, b), Q(y, wT, b), Q(_, bT, x), Q(_, yT, b), Q(y, bT, x), Q(y, yT, b);
	let S = Q(s, lT), C = Q(Q(Q(c, lT), wT), wT);
	Z(s, e.domain, o), Q(s, fT, g), Q(s, hT, h), Z(c, e.domain, o), Q(c, fT, g), Q(c, hT, h), Z(S, e.domain, b), Q(S, wT, b), Q(S, bT, b), Z(C, e.domain, b), Z(C, t, b), Q(C, wT, b);
	let w = [
		[Bw, Vw],
		[Hw, Uw],
		[Ww, Gw],
		[Kw, qw],
		[Jw, Yw],
		[Xw, Zw],
		[Qw, $w],
		[eT, tT]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = Q(b, r);
		Q(x, r, a);
		let o = nE(tE);
		Z(a, t, o);
		let s = nE();
		Z(a, n, s), Q(a, i, b), Z(o, t, o), Z(o, n, s), Z(s, t, o), Z(s, n, s), Q(o, i, b), Q(s, i, b);
	}
	return Q(i, Mw, _), Q(i, zw, eE), {
		start: i,
		tokens: kT
	};
}
function iE(e, t, n) {
	let r = n.length, i = 0, a = [], o = [], s = [];
	for (; i < r;) {
		let c = e, l = null, u = null, d = 0, f = null, p = -1, m = [];
		for (; i < r && !(l = c.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (u = l || c.go(n[i].t));) if (l = null, c = u, i++, d++, c.accepts()) p = 0, f = c, m = [];
		else if (p >= 0 && p++, m.push(c), s[i] && s[i].has(c)) break;
		for (let e = 0, t = i - m.length + 1; e < m.length; e++, t++) (s[t] || (s[t] = /* @__PURE__ */ new Set())).add(m[e]);
		if (p < 0) i -= d, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(aE($T, t, o)), o = []), i -= p, d -= p;
			let e = f.t, r = n.slice(i - d, i);
			a.push(aE(e, t, r));
		}
	}
	return o.length > 0 && a.push(aE($T, t, o)), a;
}
function aE(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var oE = typeof console < "u" && console && console.warn || (() => {}), sE = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", $ = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function cE() {
	return Tw.groups = {}, $.scanner = null, $.parser = null, $.tokenQueue = [], $.pluginQueue = [], $.customSchemes = [], $.initialized = !1, $;
}
function lE(e, t = !1) {
	if ($.initialized && oE(`linkifyjs: already initialized - will not register custom scheme "${e}" ${sE}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	$.customSchemes.push([e, t]);
}
function uE() {
	$.scanner = HT($.customSchemes);
	for (let e = 0; e < $.tokenQueue.length; e++) $.tokenQueue[e][1]({ scanner: $.scanner });
	$.parser = rE($.scanner.tokens);
	for (let e = 0; e < $.pluginQueue.length; e++) $.pluginQueue[e][1]({
		scanner: $.scanner,
		parser: $.parser
	});
	return $.initialized = !0, $;
}
function dE(e) {
	return $.initialized || uE(), iE($.parser.start, e, UT($.scanner.start, e));
}
dE.scan = UT;
function fE(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new JT(n), i = dE(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
// node_modules/@tiptap/extension-link/dist/index.js
var pE = "[\0- \xA0 ᠎ -\u2029 　]", mE = new RegExp(pE), hE = RegExp(`${pE}$`), gE = RegExp(`${pE}+$`), _E = new RegExp(pE, "g");
function vE(e, t, n) {
	let r = e.doc.resolve(t.to);
	if (!r.nodeBefore?.isText) return;
	let i = e.doc.textBetween(t.from, t.to, "￼", "￼").match(gE)?.[0];
	if (!i) return;
	let a = t.to - i.length, o = nx(a, t.to, e.doc).filter((e) => e.mark.type === n);
	if (!o.length) return;
	let { nodeAfter: s } = r;
	if (s && o.some((e) => e.mark.isInSet(s.marks))) return;
	let c = e.storedMarks;
	e.removeMark(a, t.to, n), e.setStoredMarks(c), e.selection.empty && e.selection.from === t.to && e.removeStoredMark(n);
}
function yE(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function bE(e) {
	return new W({
		key: new Zf("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = yb(n.doc, [...t]);
			if (!t.some(Qv)) {
				let t = [];
				s.steps.forEach((e, n) => {
					if (!(e instanceof Pd) || !e.slice.size) return;
					let r = s.mapping.slice(n + 1), i = r.map(e.from, 1), a = r.map(e.from + e.slice.size, -1);
					i < a && t.push({
						from: i,
						to: a
					});
				}), t.sort((e, t) => t.to - e.to), t.forEach((t) => vE(o, t, e.type));
			}
			if (tx(s).forEach(({ newRange: t }) => {
				let n = bb(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!hE.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(mE).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = dE(n).map((t) => t.toObject(e.defaultProtocol));
					if (!yE(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						nx(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function xE(e) {
	return new W({
		key: new Zf("handleClickLink"),
		props: { handleClick: (t, n, r) => {
			if (r.button !== 0 || !t.editable) return !1;
			let i = null;
			if (r.target instanceof HTMLAnchorElement) i = r.target;
			else {
				let t = r.target;
				if (!t) return !1;
				let n = e.editor.view.dom;
				i = t.closest("a"), i && !n.contains(i) && (i = null);
			}
			if (!i) return !1;
			let a = !1;
			if (e.enableClickSelection && (a = e.editor.commands.extendMarkRange(e.type.name)), e.openOnClick) {
				let n = Qb(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var SE = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, CE = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function wE(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function TE(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`" || n === 0 && wE(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function EE(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || wE(e, t.index ?? 0) || TE(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function DE(e) {
	let [t, n, r, , i, a, o] = e, s = i ?? a ?? o;
	return {
		index: e.index ?? 0,
		text: t,
		replaceWith: n,
		data: {
			href: r,
			title: s || null,
			markdown: !0
		}
	};
}
function OE(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function kE(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function AE(e) {
	let t = vC({
		find: (t) => {
			let n = SE.exec(t);
			return !n || !EE(t, n, e.isAllowedHref) ? null : DE(n);
		},
		type: e.type,
		getAttributes: kE
	});
	return new BS({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function jE(e) {
	let t = TC({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(CE)) EE(t, r, e.isAllowedHref) && n.push(DE(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => OE(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: kE
	});
	return new YS({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function ME(e) {
	return new W({
		key: new Zf("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = fE(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function NE(e, t) {
	let n = [
		"http",
		"https",
		"ftp",
		"ftps",
		"mailto",
		"tel",
		"callto",
		"sms",
		"cid",
		"xmpp"
	];
	return t && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.scheme;
		t && n.push(t);
	}), !e || e.replace(_E, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var PE = JS.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			typeof e == "string" ? lE(e) : lE(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		cE();
	},
	inclusive() {
		return this.options.autolink;
	},
	addOptions() {
		return {
			openOnClick: !0,
			enableClickSelection: !1,
			linkOnPaste: !0,
			markdownLinks: !1,
			autolink: !0,
			protocols: [],
			defaultProtocol: "http",
			HTMLAttributes: {
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				class: null
			},
			isAllowedUri: (e, t) => !!NE(e, t.protocols),
			validate: (e) => !!e,
			shouldAutoLink: (e) => {
				let t = /^[a-z][a-z0-9+.-]*:\/\//i.test(e), n = /^[a-z][a-z0-9+.-]*:/i.test(e);
				if (t || n && !e.includes("@")) return !0;
				let r = (e.includes("@") ? e.split("@").pop() : e).split(/[/?#:]/)[0];
				return !(/^\d{1,3}(\.\d{1,3}){3}$/.test(r) || !/\./.test(r));
			}
		};
	},
	addAttributes() {
		return {
			href: {
				default: null,
				parseHTML(e) {
					return e.getAttribute("href");
				}
			},
			target: { default: this.options.HTMLAttributes.target ?? null },
			rel: { default: this.options.HTMLAttributes.rel ?? null },
			class: { default: this.options.HTMLAttributes.class ?? null },
			title: { default: null }
		};
	},
	parseHTML() {
		return [{
			tag: "a[href]",
			getAttrs: (e) => {
				let t = e.getAttribute("href");
				return !t || !this.options.isAllowedUri(t, {
					defaultValidate: (e) => !!NE(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!NE(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			Y(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			Y(this.options.HTMLAttributes, {
				...e,
				href: ""
			}),
			0
		];
	},
	markdownTokenName: "link",
	parseMarkdown: (e, t) => t.applyMark("link", t.parseInline(e.tokens || []), {
		href: e.href,
		title: e.title || null
	}),
	renderMarkdown: (e, t) => {
		let n = e.attrs?.href ?? "", r = e.attrs?.title ?? "", i = t.renderChildren(e);
		return r ? `[${i}](${n} "${r}")` : `[${i}](${n})`;
	},
	addCommands() {
		return {
			setLink: (e) => ({ chain: t }) => {
				let { href: n } = e;
				return this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!NE(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!NE(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addInputRules() {
		return this.options.markdownLinks ? [AE({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!NE(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			})
		})] : [];
	},
	addPasteRules() {
		let e = (e) => {
			let t = [];
			if (e) {
				let { protocols: n, defaultProtocol: r } = this.options;
				fE(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
					defaultValidate: (e) => !!NE(e, n),
					protocols: n,
					defaultProtocol: r
				})).forEach((e) => {
					this.options.shouldAutoLink(e.value) && t.push({
						text: e.value,
						data: { href: e.href },
						index: e.start
					});
				});
			}
			return t;
		};
		return this.options.markdownLinks ? [jE({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!NE(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [TC({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(bE({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!NE(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(xE({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(ME({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), FE = PE, IE = "listItem", LE = "textStyle", RE = /^\s*([-+*])\s$/, zE = wC.create({
	name: "bulletList",
	addOptions() {
		return {
			itemTypeName: "listItem",
			HTMLAttributes: {},
			keepMarks: !1,
			keepAttributes: !1
		};
	},
	group: "block list",
	content() {
		return `${this.options.itemTypeName}+`;
	},
	parseHTML() {
		return [{ tag: "ul" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ul",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list",
	parseMarkdown: (e, t) => e.type !== "list" || e.ordered ? [] : {
		type: "bulletList",
		content: e.items ? t.parseChildren(e.items) : []
	},
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(IE, this.editor.getAttributes(LE)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
	},
	addInputRules() {
		let e = xC({
			find: RE,
			type: this.type
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = xC({
			find: RE,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: () => this.editor.getAttributes(LE),
			editor: this.editor
		})), [e];
	}
}), BE = (e, t, n) => {
	let { selection: r } = e;
	if (!r.empty) return null;
	let { $from: i } = r;
	if (!i.parent.isTextblock || i.parentOffset !== i.parent.content.size) return null;
	let a = -1;
	for (let e = i.depth; e > 0; --e) if (i.node(e).type.name === t) {
		a = e;
		break;
	}
	if (a < 0) return null;
	let o = i.node(a), s = i.index(a);
	if (s + 1 >= o.childCount) return null;
	let c = o.child(s + 1);
	if (!n.includes(c.type.name)) return null;
	let l = e.schema.nodes[t], u = !1;
	if (c.forEach((e) => {
		e.type === l && e.childCount > 1 && (u = !0);
	}), !u) return null;
	let d = e.doc.resolve(i.after()).nodeAfter;
	if (!d || !n.includes(d.type.name)) return null;
	let f = [];
	return d.forEach((e) => {
		f.push(e);
	}), f.length === 0 ? null : {
		listItemDepth: a,
		nestedList: d,
		nestedListPos: i.after(),
		insertPos: i.after(a),
		items: f
	};
}, VE = (e, t, n, r) => {
	let i = BE(e, n, r);
	if (!i) return !1;
	let { selection: a } = e, { nestedList: o, nestedListPos: s, insertPos: c, items: l } = i, u = e.tr;
	u.delete(s, s + o.nodeSize);
	let d = u.mapping.map(c);
	return u.insert(d, R.from(l)), u.setSelection(a.map(u.doc, u.mapping)), t && t(u), !0;
}, HE = (e, t, n) => VE(e.state, e.view.dispatch, t, n), UE = (e, t) => X.create({
	name: `${e}BranchingDeleteKeymap`,
	priority: 101,
	addKeyboardShortcuts() {
		let n = () => HE(this.editor, e, t);
		return {
			Delete: n,
			"Mod-Delete": n
		};
	}
}), WE = [
	[1e3, "m"],
	[900, "cm"],
	[500, "d"],
	[400, "cd"],
	[100, "c"],
	[90, "xc"],
	[50, "l"],
	[40, "xl"],
	[10, "x"],
	[9, "ix"],
	[5, "v"],
	[4, "iv"],
	[1, "i"]
], GE = "abcdefghijklmnopqrstuvwxyz", KE = String.raw`\d+|[ivxlcdmIVXLCDM]+|${"[a-zA-Z]{1,2}"}`;
function qE(e) {
	let t = e, n = "";
	for (let [e, r] of WE) for (; t >= e;) n += r, t -= e;
	return n;
}
function JE(e) {
	return qE(e).toUpperCase();
}
function YE(e) {
	let t = e.toLowerCase(), n = 0, r = 0;
	for (; n < t.length;) {
		let e = !1;
		for (let [i, a] of WE) if (t.startsWith(a, n)) {
			r += i, n += a.length, e = !0;
			break;
		}
		if (!e) return 0;
	}
	return r;
}
function XE(e) {
	if (!/^[ivxlcdmIVXLCDM]+$/.test(e)) return !1;
	let t = YE(e);
	return t <= 0 ? !1 : (e === e.toLowerCase() ? qE(t) : JE(t)) === e;
}
function ZE(e) {
	let t = e.toLowerCase();
	if (t.length === 1) return t.charCodeAt(0) - 97 + 1;
	if (t.length === 2) {
		let e = t.charCodeAt(0) - 97, n = t.charCodeAt(1) - 97;
		return (e + 1) * 26 + n + 1;
	}
	return 0;
}
function QE(e) {
	if (e <= 26) return GE[e - 1];
	let t = Math.floor((e - 1) / 26) - 1, n = (e - 1) % 26;
	return t < 0 ? GE[n] : GE[t] + GE[n];
}
function $E(e) {
	if (e && !/^\d+$/.test(e)) {
		if (XE(e)) return e === e.toLowerCase() ? "i" : "I";
		if (/^[a-z]{1,2}$/.test(e)) return "a";
		if (/^[A-Z]{1,2}$/.test(e)) return "A";
	}
}
function eD(e) {
	if (/^\d+$/.test(e)) return parseInt(e, 10);
	let t = $E(e);
	if (t === "i" || t === "I") return YE(e);
	if (t === "a" || t === "A") {
		let t = ZE(e);
		return t > 0 ? t : 1;
	}
	let n = parseInt(e, 10);
	return Number.isNaN(n) ? 1 : n;
}
function tD(e, t) {
	if (e === "numeric") return String(t);
	switch (e) {
		case "a": return QE(t);
		case "A": return QE(t).toUpperCase();
		case "i": return qE(t);
		case "I": return JE(t);
		default: return String(t);
	}
}
function nD(e) {
	if (e.length === 0) return !1;
	let t = $E(e[0]) ?? "numeric", n = eD(e[0]);
	if (n < 1) return !1;
	for (let r = 0; r < e.length; r++) {
		let i = tD(t, n + r);
		if (e[r] !== i) return !1;
	}
	return !0;
}
function rD(e) {
	return {
		type: $E(e),
		start: eD(e)
	};
}
function iD(e) {
	let { type: t, start: n } = rD(e), r = {};
	return t && (r.type = t), n !== 1 && (r.start = n), r;
}
function aD(e, t, n = ". ") {
	let r = t + 1;
	if (!e || e === "1") return `${r}${n}`;
	switch (e) {
		case "a": return `${QE(r)}${n}`;
		case "A": return `${QE(r).toUpperCase()}${n}`;
		case "i": return `${qE(r)}${n}`;
		case "I": return `${JE(r)}${n}`;
		default: return `${r}${n}`;
	}
}
function oD(e) {
	let t = e.tokens?.[0];
	return !!(e.text && e.tokens?.length === 1 && t?.type === "list" && t.ordered && t.raw === e.text);
}
function sD(e, t) {
	return t.tokenizeInline ? t.parseInline(t.tokenizeInline(e)) : t.parseInline([{
		type: "text",
		raw: e,
		text: e
	}]);
}
var cD = wC.create({
	name: "listItem",
	addOptions() {
		return {
			HTMLAttributes: {},
			bulletListTypeName: "bulletList",
			orderedListTypeName: "orderedList"
		};
	},
	content: "paragraph block*",
	defining: !0,
	parseHTML() {
		return [{ tag: "li" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"li",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list_item",
	parseMarkdown: (e, t) => {
		if (e.type !== "list_item") return [];
		let n = t.parseBlockChildren ?? t.parseChildren, r = [];
		if (e.tokens && e.tokens.length > 0) {
			if (oD(e)) return {
				type: "listItem",
				content: [{
					type: "paragraph",
					content: sD(e.text || "", t)
				}]
			};
			if (e.tokens.some((e) => e.type === "paragraph")) r = n(e.tokens);
			else {
				let i = e.tokens[0];
				if (i && i.type === "text" && i.tokens && i.tokens.length > 0) {
					if (r = [{
						type: "paragraph",
						content: t.parseInline(i.tokens)
					}], e.tokens.length > 1) {
						let t = n(e.tokens.slice(1));
						r.push(...t);
					}
				} else r = n(e.tokens);
			}
		}
		return r.length === 0 && (r = [{
			type: "paragraph",
			content: []
		}]), {
			type: "listItem",
			content: r
		};
	},
	renderMarkdown: (e, t, n) => LS(e, t, (e) => {
		if (e.parentType === "bulletList") return "- ";
		if (e.parentType === "orderedList") {
			var t, n;
			let r = ((t = e.meta) == null || (t = t.parentAttrs) == null ? void 0 : t.start) || 1;
			return aD((n = e.meta) == null || (n = n.parentAttrs) == null ? void 0 : n.type, r - 1 + (e.index || 0), ". ");
		}
		return "- ";
	}, n, { alignNestedToPrefix: n?.parentType === "orderedList" }),
	addExtensions() {
		return [UE(this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName])];
	},
	addKeyboardShortcuts() {
		return {
			Enter: () => this.editor.commands.splitListItem(this.name),
			Tab: () => this.editor.commands.sinkListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
	}
}), lD = (e, t) => {
	let { $from: n } = t.selection, r = cy(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
	for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
	return s === null ? null : {
		$pos: t.doc.resolve(o),
		depth: s
	};
}, uD = (e, t) => {
	let n = lD(e, t);
	if (!n) return !1;
	let [, r] = rx(t, e, n.$pos.pos + 4);
	return r;
}, dD = (e, t, n) => {
	let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
	return !(!a || !n.includes(a.type.name));
}, fD = (e, t, n) => {
	if (e.commands.undoInputRule()) return !0;
	if (e.state.selection.from !== e.state.selection.to) return !1;
	if (!tb(e.state, t) && dD(e.state, t, n)) {
		let { $anchor: n } = e.state.selection, r = e.state.doc.resolve(n.before() - 1), i = [];
		r.node().descendants((e, n) => {
			e.type.name === t && i.push({
				node: e,
				pos: n
			});
		});
		let a = i.at(-1);
		if (!a) return !1;
		let o = e.state.doc.resolve(r.start() + a.pos + 1);
		return e.chain().cut({
			from: n.start() - 1,
			to: n.end() + 1
		}, o.end()).joinForward().run();
	}
	if (!tb(e.state, t) || !dx(e.state)) return !1;
	let { $from: r } = e.state.selection, i = r.depth - 1;
	return r.node(i).type !== e.schema.nodes[t] || r.index(i) !== 0 ? !1 : e.chain().liftListItem(t).run();
}, pD = (e, t) => {
	let n = uD(e, t), r = lD(e, t);
	return !r || !n ? !1 : n > r.depth;
}, mD = (e, t) => {
	let n = uD(e, t), r = lD(e, t);
	return !r || !n ? !1 : n < r.depth;
}, hD = (e, t) => {
	if (!tb(e.state, t) || !ux(e.state, t)) return !1;
	let { selection: n } = e.state, { $from: r, $to: i } = n;
	return !n.empty && r.sameParent(i) ? !1 : pD(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : mD(t, e.state) ? e.chain().joinForward().joinBackward().run() : e.commands.joinItemForward();
}, gD = (e, t, n) => {
	let { state: r } = e, { selection: i } = r;
	if (!i.empty) return !1;
	let { $from: a } = i;
	if (a.parentOffset !== 0 || !a.parent.isTextblock || tb(r, t)) return !1;
	let o = ix(a);
	if (!o || !n.includes(o.type.name)) return !1;
	let s = o.lastChild;
	if (!s || s.type.name !== t) return !1;
	let c = a.parent;
	if (!s.canReplace(s.childCount, s.childCount, R.from(c))) return !1;
	let l = a.before(), u = a.after(), d = l - 2;
	return e.commands.command(({ tr: e, dispatch: t }) => (t && (e.delete(l, u).insert(d, R.from(c)), e.setSelection(H.create(e.doc, d + 1)), e.scrollIntoView()), !0));
}, _D = X.create({
	name: "listKeymap",
	addOptions() {
		return { listTypes: [{
			itemName: "listItem",
			wrapperNames: ["bulletList", "orderedList"]
		}, {
			itemName: "taskItem",
			wrapperNames: ["taskList"]
		}] };
	},
	addKeyboardShortcuts() {
		return {
			Delete: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && hD(e, n) && (t = !0);
				}), t;
			},
			"Mod-Delete": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && hD(e, n) && (t = !0);
				}), t;
			},
			Backspace: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && fD(e, n, r) && (t = !0);
				}), t;
			},
			"Mod-Backspace": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && fD(e, n, r) && (t = !0);
				}), t;
			},
			Tab: ({ editor: e }) => {
				for (let { itemName: t, wrapperNames: n } of this.options.listTypes) if (e.state.schema.nodes[t] !== void 0 && gD(e, t, n)) return !0;
				return !1;
			}
		};
	}
}), vD = RegExp(`^(\\s*)(${KE})([.)])\\s+(.*)$`), yD = /^\s/, bD = {
	heading: /^#{1,6}(?:\s|$)/,
	bulletItem: /^[-+*]\s+/,
	codeFence: /^(?:```|~~~)/,
	blockMath: /^\$\$/,
	thematicBreak: /^(?:(?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/
};
function xD(e) {
	return vD.test(e.trimStart());
}
function SD(e) {
	let t = e.trimStart();
	return bD.bulletItem.test(t) || xD(t) || bD.heading.test(t) || bD.thematicBreak.test(t) && !t.startsWith("-") || /^>\s?/.test(t) || bD.codeFence.test(t) || bD.blockMath.test(t);
}
function CD(e) {
	return Object.values(bD).some((t) => t.test(e));
}
function wD(e) {
	let t = [], n = [], r = !1;
	return e.forEach((e) => {
		r ? n.push(e) : e.trim() === "" || t.length > 0 && SD(e) ? (r = !0, n.push(e)) : t.push(e);
	}), {
		paragraphLines: t,
		blockLines: n
	};
}
function TD(e) {
	let t = [], n = 0, r = 0;
	for (; n < e.length;) {
		let i = e[n], a = i.match(vD);
		if (!a) break;
		let [, o, s, c, l] = a, u = o.length, d = parseInt(s, 10), f = isNaN(d) ? $E(s) : void 0, p = isNaN(d) ? eD(s) : d, m = [l], h = n + 1, g = [i], _ = !1;
		for (; h < e.length;) {
			let t = e[h];
			if (t.match(vD)) break;
			if (t.trim() === "") g.push(t), m.push(""), _ = !0, h += 1;
			else if (t.match(yD)) {
				let e = t.length - t.trimStart().length, n = u + s.length + 1;
				g.push(t), m.push(t.slice(Math.min(e, n))), h += 1;
			} else {
				if (_ || CD(t)) break;
				g.push(t), m.push(t), h += 1;
			}
		}
		t.push({
			indent: u,
			number: p,
			type: f,
			content: m.join("\n").trim(),
			contentLines: m,
			raw: g.join("\n")
		}), r = h, n = h;
	}
	return [t, r];
}
var ED = RegExp(`^(${KE})([.)])\\s+(.+)$`);
function DD(e) {
	let t = e.split("\n").filter((e) => e.trim().length > 0);
	if (t.length === 0) return null;
	let n = [];
	for (let e of t) {
		let t = e.trim().match(ED);
		if (!t) return null;
		n.push({
			marker: t[1],
			content: t[3]
		});
	}
	return nD(n.map((e) => e.marker)) ? {
		type: "orderedList",
		attrs: iD(n[0].marker),
		content: n.map((e) => ({
			type: "listItem",
			content: [{
				type: "paragraph",
				content: [{
					type: "text",
					text: e.content
				}]
			}]
		}))
	} : null;
}
function OD(e, t, n) {
	let r = [], i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a.indent === t) {
			let { paragraphLines: o, blockLines: s } = wD(a.contentLines), c = o.join("\n").trim(), l = [];
			c && l.push({
				type: "paragraph",
				raw: c,
				tokens: n.inlineTokens(c)
			});
			let u = s.join("\n").trim();
			if (u) {
				let e = n.blockTokens(u);
				l.push(...e);
			}
			let d = i + 1, f = [];
			for (; d < e.length && e[d].indent > t;) f.push(e[d]), d += 1;
			if (f.length > 0) {
				let e = OD(f, Math.min(...f.map((e) => e.indent)), n);
				l.push({
					type: "list",
					ordered: !0,
					start: f[0].number,
					typeMarker: f[0].type,
					items: e,
					raw: f.map((e) => e.raw).join("\n")
				});
			}
			r.push({
				type: "list_item",
				raw: a.raw,
				tokens: l
			}), i = d;
		} else i += 1;
	}
	return r;
}
function kD(e, t) {
	return e.map((e) => {
		if (e.type !== "list_item") return t.parseChildren([e])[0];
		let n = [];
		return e.tokens && e.tokens.length > 0 && e.tokens.forEach((e) => {
			if (e.type === "paragraph" || e.type === "list" || e.type === "blockquote" || e.type === "code") n.push(...t.parseChildren([e]));
			else if (e.type === "text" && e.tokens) {
				let r = t.parseChildren([e]);
				n.push({
					type: "paragraph",
					content: r
				});
			} else {
				let r = t.parseChildren([e]);
				r.length > 0 && n.push(...r);
			}
		}), {
			type: "listItem",
			content: n
		};
	});
}
var AD = 64;
function jD(e, t) {
	let n = [], r = 0;
	for (; n.length < t;) {
		let t = e.indexOf("\n", r);
		if (t === -1) return n.push(e.slice(r)), n;
		n.push(e.slice(r, t)), r = t + 1;
	}
	return n;
}
function MD(e) {
	let t = e.indexOf("\n"), n = t === -1 ? e : e.slice(0, t);
	if (!vD.test(n)) return [
		[],
		0,
		[]
	];
	let r = AD, i = jD(e, r), a = TD(i);
	for (; a[1] === i.length && i.length === r;) r *= 2, i = jD(e, r), a = TD(i);
	return [
		a[0],
		a[1],
		i
	];
}
var ND = "listItem", PD = "textStyle", FD = /^(\d+)\.\s$/;
function ID(e) {
	let t = e.match(/list-style-type\s*:\s*([^;]+)/i);
	if (!t) return null;
	switch (t[1].trim().toLowerCase()) {
		case "upper-roman": return "I";
		case "lower-roman": return "i";
		case "upper-alpha":
		case "upper-latin": return "A";
		case "lower-alpha":
		case "lower-latin": return "a";
		default: return null;
	}
}
var LD = wC.create({
	name: "orderedList",
	addOptions() {
		return {
			itemTypeName: "listItem",
			HTMLAttributes: {},
			keepMarks: !1,
			keepAttributes: !1
		};
	},
	group: "block list",
	content() {
		return `${this.options.itemTypeName}+`;
	},
	addAttributes() {
		return {
			start: {
				default: 1,
				parseHTML: (e) => e.hasAttribute("start") ? parseInt(e.getAttribute("start") || "", 10) : 1
			},
			type: {
				default: null,
				parseHTML: (e) => {
					let t = e.getAttribute("type");
					if (t) return t;
					let n = e.getAttribute("style");
					if (n) {
						let e = ID(n);
						if (e) return e;
					}
					let r = e.querySelector("li");
					if (r) {
						let e = r.getAttribute("style");
						if (e) {
							let t = ID(e);
							if (t) return t;
						}
					}
					return null;
				}
			}
		};
	},
	parseHTML() {
		return [{ tag: "ol" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		let { start: t, type: n, ...r } = e, i = Y(this.options.HTMLAttributes, r);
		return t !== 1 && (i.start = t), n && n !== "1" && (i.type = n), [
			"ol",
			i,
			0
		];
	},
	markdownTokenName: "list",
	parseMarkdown: (e, t) => {
		if (e.type !== "list" || !e.ordered) return [];
		let n = e.start || 1, r = e.typeMarker, i = e.items ? kD(e.items, t) : [], a = {};
		return n !== 1 && (a.start = n), r && (a.type = r), Object.keys(a).length > 0 ? {
			type: "orderedList",
			attrs: a,
			content: i
		} : {
			type: "orderedList",
			content: i
		};
	},
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownTokenizer: {
		name: "orderedList",
		level: "block",
		start: () => -1,
		tokenize: (e, t, n) => {
			let [r, i, a] = MD(e);
			if (r.length === 0) return;
			let o = OD(r, r[0].indent, n);
			if (o.length !== 0) return {
				type: "list",
				ordered: !0,
				start: r[0]?.number || 1,
				typeMarker: r[0]?.type,
				items: o,
				raw: a.slice(0, i).join("\n")
			};
		}
	},
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ND, this.editor.getAttributes(PD)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
	},
	addProseMirrorPlugins() {
		return [new W({ props: { handlePaste: (e, t) => {
			if ((t.clipboardData?.getData("text/html"))?.trim()) return !1;
			let n = t.clipboardData?.getData("text/plain");
			if (!n) return !1;
			let r = DD(n);
			if (!r) return !1;
			try {
				let t = e.state.schema.nodeFromJSON(r), n = e.state.tr.replaceSelectionWith(t);
				return e.dispatch(n), !0;
			} catch {
				return !1;
			}
		} } })];
	},
	addInputRules() {
		let e = (e, t) => (!t.attrs.type || t.attrs.type === "1") && t.childCount + t.attrs.start === +e[1], t = xC({
			find: FD,
			type: this.type,
			getAttributes: (e) => ({ start: +e[1] }),
			joinPredicate: e
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (t = xC({
			find: FD,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: (e) => ({
				start: +e[1],
				...this.editor.getAttributes(PD)
			}),
			joinPredicate: e,
			editor: this.editor
		})), [t];
	}
}), RD = /^\s*(\[([( |x])?\])\s$/, zD = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0", BD = (e, t, n) => {
	var r;
	return (n == null || (r = n.checkboxLabel) == null ? void 0 : r.call(n, e, t)) || `Task item checkbox for ${e.textContent || "empty task item"}`;
}, VD = wC.create({
	name: "taskItem",
	addOptions() {
		return {
			nested: !1,
			HTMLAttributes: {},
			taskListTypeName: "taskList",
			a11y: void 0
		};
	},
	content() {
		return this.options.nested ? "paragraph block*" : "paragraph+";
	},
	defining: !0,
	addAttributes() {
		return { checked: {
			default: !1,
			keepOnSplit: !1,
			parseHTML: (e) => {
				let t = e.getAttribute("data-checked");
				return t === "" || t === "true";
			},
			renderHTML: (e) => ({ "data-checked": e.checked })
		} };
	},
	parseHTML() {
		return [{
			tag: `li[data-type="${this.name}"]`,
			priority: 51,
			contentElement: (e) => e.querySelector("div") ?? e
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			"li",
			Y(this.options.HTMLAttributes, t, { "data-type": this.name }),
			[
				"label",
				["input", {
					type: "checkbox",
					checked: e.attrs.checked ? "checked" : null
				}],
				["span"]
			],
			["div", 0]
		];
	},
	parseMarkdown: (e, t) => {
		let n = [];
		if (e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [t.createNode("text", { text: e.text })])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0) {
			let r = t.parseChildren(e.nestedTokens);
			n.push(...r);
		}
		return t.createNode("taskItem", { checked: e.checked || !1 }, n);
	},
	renderMarkdown: (e, t) => LS(e, t, `- [${e.attrs?.checked ? "x" : " "}] `),
	addExtensions() {
		return this.options.nested ? [UE(this.name, [this.options.taskListTypeName])] : [];
	},
	addKeyboardShortcuts() {
		let e = {
			Enter: () => this.editor.commands.splitListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
		return this.options.nested ? {
			...e,
			Tab: () => this.editor.commands.sinkListItem(this.name)
		} : e;
	},
	addNodeView() {
		return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
			let i = document.createElement("li"), a = document.createElement("label"), o = document.createElement("span"), s = document.createElement("input"), c = document.createElement("div");
			o.style.cssText = zD;
			let l = (e) => {
				let t = BD(e, e.attrs.checked, this.options.a11y);
				s.setAttribute("aria-label", t), o.textContent = t;
			};
			l(e), a.contentEditable = "false", s.type = "checkbox", s.addEventListener("mousedown", (e) => e.preventDefault()), s.addEventListener("change", (t) => {
				if (!r.isEditable && !this.options.onReadOnlyChecked) {
					s.checked = !s.checked;
					return;
				}
				let { checked: i } = t.target;
				r.isEditable && typeof n == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: e }) => {
					let t = n();
					if (typeof t != "number") return !1;
					let r = e.doc.nodeAt(t);
					return e.setNodeMarkup(t, void 0, {
						...r?.attrs,
						checked: i
					}), !0;
				}).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(e, i) || (s.checked = !s.checked));
			}), Object.entries(this.options.HTMLAttributes).forEach(([e, t]) => {
				i.setAttribute(e, t);
			}), i.dataset.checked = e.attrs.checked, s.checked = e.attrs.checked, a.append(s, o), i.append(a, c), Object.entries(t).forEach(([e, t]) => {
				i.setAttribute(e, t);
			});
			let u = new Set(Object.keys(t));
			return {
				dom: i,
				contentDOM: c,
				update: (e) => {
					if (e.type !== this.type) return !1;
					i.dataset.checked = e.attrs.checked, s.checked = e.attrs.checked, l(e);
					let t = r.extensionManager.attributes, n = zb(e, t), a = new Set(Object.keys(n)), o = this.options.HTMLAttributes;
					return u.forEach((e) => {
						a.has(e) || (e in o ? i.setAttribute(e, o[e]) : i.removeAttribute(e));
					}), Object.entries(n).forEach(([e, t]) => {
						t == null ? e in o ? i.setAttribute(e, o[e]) : i.removeAttribute(e) : i.setAttribute(e, t);
					}), u = a, !0;
				}
			};
		};
	},
	addInputRules() {
		return [xC({
			find: RD,
			type: this.type,
			getAttributes: (e) => ({ checked: e[e.length - 1] === "x" })
		})];
	}
}), HD = wC.create({
	name: "taskList",
	addOptions() {
		return {
			itemTypeName: "taskItem",
			HTMLAttributes: {}
		};
	},
	group: "block list",
	content() {
		return `${this.options.itemTypeName}+`;
	},
	parseHTML() {
		return [{
			tag: `ul[data-type="${this.name}"]`,
			priority: 51
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ul",
			Y(this.options.HTMLAttributes, e, { "data-type": this.name }),
			0
		];
	},
	parseMarkdown: (e, t) => t.createNode("taskList", {}, t.parseChildren(e.items || [])),
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownTokenizer: {
		name: "taskList",
		level: "block",
		start(e) {
			let t = e.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)?.index;
			return t === void 0 ? -1 : t;
		},
		tokenize(e, t, n) {
			let r = (e) => {
				let t = PS(e, {
					itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
					extractItemData: (e) => ({
						indentLevel: e[1].length,
						mainContent: e[4],
						checked: e[3].toLowerCase() === "x"
					}),
					createToken: (e, t) => ({
						type: "taskItem",
						raw: "",
						mainContent: e.mainContent,
						indentLevel: e.indentLevel,
						checked: e.checked,
						text: e.mainContent,
						tokens: n.inlineTokens(e.mainContent),
						nestedTokens: t
					}),
					customNestedParser: r
				}, n);
				if (t) {
					let r = {
						type: "taskList",
						raw: t.raw,
						items: t.items
					}, i = e.slice(t.raw.length);
					return i.trim() ? [r, ...n.blockTokens(i)] : [r];
				}
				return n.blockTokens(e);
			}, i = PS(e, {
				itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
				extractItemData: (e) => ({
					indentLevel: e[1].length,
					mainContent: e[4],
					checked: e[3].toLowerCase() === "x"
				}),
				createToken: (e, t) => ({
					type: "taskItem",
					raw: "",
					mainContent: e.mainContent,
					indentLevel: e.indentLevel,
					checked: e.checked,
					text: e.mainContent,
					tokens: n.inlineTokens(e.mainContent),
					nestedTokens: t
				}),
				customNestedParser: r
			}, n);
			if (i) return {
				type: "taskList",
				raw: i.raw,
				items: i.items
			};
		}
	},
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleTaskList: () => ({ commands: e }) => e.toggleList(this.name, this.options.itemTypeName) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-9": () => this.editor.commands.toggleTaskList() };
	}
});
X.create({
	name: "listKit",
	addExtensions() {
		let e = [];
		return this.options.bulletList !== !1 && e.push(zE.configure(this.options.bulletList)), this.options.listItem !== !1 && e.push(cD.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(_D.configure(this.options.listKeymap)), this.options.orderedList !== !1 && e.push(LD.configure(this.options.orderedList)), this.options.taskItem !== !1 && e.push(VD.configure(this.options.taskItem)), this.options.taskList !== !1 && e.push(HD.configure(this.options.taskList)), e;
	}
});
// node_modules/@tiptap/extension-paragraph/dist/index.js
var UD = "&nbsp;", WD = "\xA0", GD = wC.create({
	name: "paragraph",
	priority: 1e3,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	group: "block",
	content: "inline*",
	parseHTML() {
		return [{ tag: "p" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"p",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	parseMarkdown: (e, t) => {
		let n = e.tokens || [];
		if (n.length === 1 && n[0].type === "image") return t.parseChildren([n[0]]);
		let r = t.parseInline(n);
		return n.length === 1 && n[0].type === "text" && (n[0].raw === UD || n[0].text === UD || n[0].raw === WD || n[0].text === WD) && r.length === 1 && r[0].type === "text" && (r[0].text === UD || r[0].text === WD) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
	},
	renderMarkdown: (e, t, n) => {
		if (!e) return "";
		let r = Array.isArray(e.content) ? e.content : [];
		if (r.length === 0) {
			var i, a;
			let e = Array.isArray(n == null || (i = n.previousNode) == null ? void 0 : i.content) ? n.previousNode.content : [];
			return (n == null || (a = n.previousNode) == null ? void 0 : a.type) === "paragraph" && e.length === 0 ? UD : "";
		}
		return t.renderChildren(r);
	},
	addCommands() {
		return { setParagraph: () => ({ commands: e }) => e.setNode(this.name) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
	}
}), KD = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, qD = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, JD = JS.create({
	name: "strike",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "s" },
			{ tag: "del" },
			{ tag: "strike" },
			{
				style: "text-decoration",
				consuming: !1,
				getAttrs: (e) => e.includes("line-through") ? {} : !1
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"s",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "del",
	parseMarkdown: (e, t) => t.applyMark("strike", t.parseInline(e.tokens || [])),
	renderMarkdown: (e, t) => `~~${t.renderChildren(e)}~~`,
	addCommands() {
		return {
			setStrike: () => ({ commands: e }) => e.setMark(this.name),
			toggleStrike: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetStrike: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-s": () => this.editor.commands.toggleStrike() };
	},
	addInputRules() {
		return [vC({
			find: KD,
			type: this.type
		})];
	},
	addPasteRules() {
		return [TC({
			find: qD,
			type: this.type
		})];
	}
}), YD = JD, XD = wC.create({
	name: "text",
	group: "inline",
	parseMarkdown: (e) => ({
		type: "text",
		text: e.text || ""
	}),
	renderMarkdown: (e) => e.text || ""
}), ZD = JS.create({
	name: "underline",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "u" }, {
			style: "text-decoration",
			consuming: !1,
			getAttrs: (e) => e.includes("underline") ? {} : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"u",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	parseMarkdown(e, t) {
		return t.applyMark(this.name || "underline", t.parseInline(e.tokens || []));
	},
	renderMarkdown(e, t) {
		return `++${t.renderChildren(e)}++`;
	},
	markdownTokenizer: {
		name: "underline",
		level: "inline",
		start(e) {
			return e.indexOf("++");
		},
		tokenize(e, t, n) {
			let r = /^(\+\+)([\s\S]+?)(\+\+)/.exec(e);
			if (!r) return;
			let i = r[2].trim();
			return {
				type: "underline",
				raw: r[0],
				text: i,
				tokens: n.inlineTokens(i)
			};
		}
	},
	addCommands() {
		return {
			setUnderline: () => ({ commands: e }) => e.setMark(this.name),
			toggleUnderline: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetUnderline: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-u": () => this.editor.commands.toggleUnderline(),
			"Mod-U": () => this.editor.commands.toggleUnderline()
		};
	}
}), QD = ZD;
// node_modules/prosemirror-dropcursor/dist/index.js
function $D(e = {}) {
	return new W({ view(t) {
		return new eO(t, e);
	} });
}
var eO = class {
	constructor(e, t) {
		this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.lastDragEvent = null, this.width = t.width ?? 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = [
			"dragover",
			"dragend",
			"drop",
			"dragleave"
		].map((t) => {
			let n = (e) => {
				this[t](e);
			};
			return e.dom.addEventListener(t, n), {
				name: t,
				handler: n
			};
		});
	}
	destroy() {
		this.setCursor(null), this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
	}
	update(e, t) {
		if (this.cursorPos != null && t.doc != e.state.doc) {
			if (this.lastDragEvent) {
				let e = this.computeTarget(this.lastDragEvent);
				e == this.cursorPos ? this.updateOverlay() : this.setCursor(e);
			} else this.updateOverlay();
		}
	}
	setCursor(e) {
		e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
	}
	updateOverlay() {
		let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, n, r = this.editorView.dom, i = r.getBoundingClientRect(), a = i.width / r.offsetWidth, o = i.height / r.offsetHeight;
		if (t) {
			let t = e.nodeBefore, r = e.nodeAfter;
			if (t || r) {
				let e = this.editorView.nodeDOM(this.cursorPos - (t ? t.nodeSize : 0));
				if (e) {
					let i = e.getBoundingClientRect(), a = t ? i.bottom : i.top;
					t && r && (a = (a + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
					let s = this.width / 2 * o;
					n = {
						left: i.left,
						right: i.right,
						top: a - s,
						bottom: a + s
					};
				}
			}
		}
		if (!n) {
			let e = this.editorView.coordsAtPos(this.cursorPos), t = this.width / 2 * a;
			n = {
				left: e.left - t,
				right: e.left + t,
				top: e.top,
				bottom: e.bottom
			};
		}
		let s = this.editorView.dom.offsetParent;
		this.element || (this.element = s.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
		let c, l;
		if (!s || s == document.body && getComputedStyle(s).position == "static") c = -pageXOffset, l = -pageYOffset;
		else {
			let e = s.getBoundingClientRect(), t = e.width / s.offsetWidth, n = e.height / s.offsetHeight;
			c = e.left - s.scrollLeft * t, l = e.top - s.scrollTop * n;
		}
		this.element.style.left = (n.left - c) / a + "px", this.element.style.top = (n.top - l) / o + "px", this.element.style.width = (n.right - n.left) / a + "px", this.element.style.height = (n.bottom - n.top) / o + "px";
	}
	scheduleRemoval(e) {
		clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
	}
	computeTarget(e) {
		let t = this.editorView.posAtCoords({
			left: e.clientX,
			top: e.clientY
		}), n = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), r = n && n.type.spec.disableDropCursor, i = typeof r == "function" ? r(this.editorView, t, e) : r;
		if (!t || i) return null;
		let a = t.pos;
		if (this.editorView.dragging && this.editorView.dragging.slice) {
			let e = cf(this.editorView.state.doc, a, this.editorView.dragging.slice);
			e != null && (a = e);
		}
		return a;
	}
	dragover(e) {
		if (!this.editorView.editable) return;
		this.lastDragEvent = e;
		let t = this.computeTarget(e);
		t != null && (this.setCursor(t), this.scheduleRemoval(5e3));
	}
	dragend() {
		this.scheduleRemoval(20);
	}
	drop() {
		this.scheduleRemoval(20);
	}
	dragleave(e) {
		this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
	}
}, tO = class e extends V {
	constructor(e) {
		super(e, e);
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		return e.valid(r) ? new e(r) : V.near(r);
	}
	content() {
		return B.empty;
	}
	eq(t) {
		return t instanceof e && t.head == this.head;
	}
	toJSON() {
		return {
			type: "gapcursor",
			pos: this.head
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for GapCursor.fromJSON");
		return new e(t.resolve(n.pos));
	}
	getBookmark() {
		return new nO(this.anchor);
	}
	static valid(e) {
		let t = e.parent;
		if (t.inlineContent || !iO(e) || !aO(e)) return !1;
		let n = t.type.spec.allowGapCursor;
		if (n != null) return n;
		let r = t.contentMatchAt(e.index()).defaultType;
		return r && r.isTextblock;
	}
	static findGapCursorFrom(t, n, r = !1) {
		search: for (;;) {
			if (!r && e.valid(t)) return t;
			let i = t.pos, a = null;
			for (let r = t.depth;; r--) {
				let o = t.node(r);
				if (n > 0 ? t.indexAfter(r) < o.childCount : t.index(r) > 0) {
					a = o.child(n > 0 ? t.indexAfter(r) : t.index(r) - 1);
					break;
				}
				if (r == 0) return null;
				i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			for (;;) {
				let o = n > 0 ? a.firstChild : a.lastChild;
				if (!o) {
					if (a.isAtom && !a.isText && !U.isSelectable(a)) {
						t = t.doc.resolve(i + a.nodeSize * n), r = !1;
						continue search;
					}
					break;
				}
				a = o, i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			return null;
		}
	}
};
tO.prototype.visible = !1, tO.findFrom = tO.findGapCursorFrom, V.jsonID("gapcursor", tO);
var nO = class e {
	constructor(e) {
		this.pos = e;
	}
	map(t) {
		return new e(t.map(this.pos));
	}
	resolve(e) {
		let t = e.resolve(this.pos);
		return tO.valid(t) ? new tO(t) : V.near(t);
	}
};
function rO(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function iO(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
		} else for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || rO(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function aO(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
		} else for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || rO(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function oO() {
	return new W({ props: {
		decorations: dO,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && tO.valid(n) ? new tO(n) : null;
		},
		handleClick: lO,
		handleKeyDown: sO,
		handleDOMEvents: { beforeinput: uO }
	} });
}
var sO = Ev({
	ArrowLeft: cO("horiz", -1),
	ArrowRight: cO("horiz", 1),
	ArrowUp: cO("vert", -1),
	ArrowDown: cO("vert", 1)
});
function cO(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof H) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = tO.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new tO(c))), !0) : !1;
	};
}
function lO(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!tO.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && U.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new tO(r))), !0);
}
function uO(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof tO)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = R.empty;
	for (let e = r.length - 1; e >= 0; e--) i = R.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new B(i, 0, 0));
	return a.setSelection(H.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function dO(e) {
	if (!(e.selection instanceof tO)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", K.create(e.doc, [C_.widget(e.selection.head, t, { key: "gapcursor" })]);
}
X.create({
	name: "characterCount",
	addOptions() {
		return {
			limit: null,
			autoTrim: !0,
			mode: "textSize",
			textCounter: (e) => e.length,
			wordCounter: (e) => e.split(" ").filter((e) => e !== "").length
		};
	},
	addStorage() {
		return {
			characters: () => 0,
			words: () => 0
		};
	},
	onBeforeCreate() {
		this.storage.characters = (e) => {
			let t = e?.node || this.editor.state.doc;
			if ((e?.mode || this.options.mode) === "textSize") {
				let e = t.textBetween(0, t.content.size, void 0, " ");
				return this.options.textCounter(e);
			}
			return t.nodeSize;
		}, this.storage.words = (e) => {
			let t = e?.node || this.editor.state.doc, n = t.textBetween(0, t.content.size, " ", " ");
			return this.options.wordCounter(n);
		};
	},
	addProseMirrorPlugins() {
		let e = !1;
		return [new W({
			key: new Zf("characterCount"),
			appendTransaction: (t, n, r) => {
				if (e) return;
				let i = this.options.limit, a = this.options.autoTrim;
				if (i == null || i === 0 || a === !1) {
					e = !0;
					return;
				}
				let o = this.storage.characters({ node: r.doc });
				if (o > i) {
					let t = o - i;
					console.warn(`[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`);
					let n = r.tr.deleteRange(0, t);
					return e = !0, n;
				}
				e = !0;
			},
			filterTransaction: (e, t) => {
				let n = this.options.limit;
				if (!e.docChanged || n === 0 || n == null) return !0;
				let r = this.storage.characters({ node: t.doc }), i = this.storage.characters({ node: e.doc });
				if (i <= n || r > n && i > n && i <= r) return !0;
				if (r > n && i > n && i > r || !e.getMeta("paste")) return !1;
				let a = e.selection.$head.pos, o = a - (i - n), s = a;
				return e.deleteRange(o, s), !(this.storage.characters({ node: e.doc }) > n);
			}
		})];
	}
});
var fO = X.create({
	name: "dropCursor",
	addOptions() {
		return {
			color: "currentColor",
			width: 1,
			class: void 0
		};
	},
	addProseMirrorPlugins() {
		return [$D(this.options)];
	}
});
X.create({
	name: "focus",
	addOptions() {
		return {
			className: "has-focus",
			mode: "all"
		};
	},
	addProseMirrorPlugins() {
		return [new W({
			key: new Zf("focus"),
			props: { decorations: ({ doc: e, selection: t }) => {
				let { isEditable: n, isFocused: r } = this.editor, { anchor: i } = t, a = [];
				if (!n || !r) return K.create(e, []);
				let o = 0;
				this.options.mode === "deepest" && e.descendants((e, t) => {
					if (!e.isText) {
						if (!(i >= t && i <= t + e.nodeSize - 1)) return !1;
						o += 1;
					}
				});
				let s = 0;
				return e.descendants((e, t) => {
					if (e.isText || !(i >= t && i <= t + e.nodeSize - 1)) return !1;
					if (s += 1, this.options.mode === "deepest" && o - s > 0 || this.options.mode === "shallowest" && s > 1) return this.options.mode === "deepest";
					a.push(C_.node(t, t + e.nodeSize, { class: this.options.className }));
				}), K.create(e, a);
			} }
		})];
	}
});
var pO = X.create({
	name: "gapCursor",
	addProseMirrorPlugins() {
		return [oO()];
	},
	extendNodeSchema(e) {
		return { allowGapCursor: J(q(e, "allowGapCursor", {
			name: e.name,
			options: e.options,
			storage: e.storage
		})) ?? null };
	}
}), mO = "placeholder", hO = new Zf("tiptap__placeholder");
function gO(e) {
	let { editor: t, placeholder: n, dataAttribute: r, pos: i, node: a, isEmptyDoc: o, hasAnchor: s, classes: { emptyNode: c, emptyEditor: l } } = e, u = [c];
	return o && u.push(l), C_.node(i, i + a.nodeSize, {
		class: u.join(" "),
		[r]: typeof n == "function" ? n({
			editor: t,
			node: a,
			pos: i,
			hasAnchor: s
		}) : n
	});
}
function _O(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function vO({ editor: e, options: t, dataAttribute: n, doc: r, selection: i, from: a, to: o }) {
	let { anchor: s } = i, c = [], l = e.isEmpty;
	return r.nodesBetween(a, o, (r, i) => {
		let a = s >= i && s <= i + r.nodeSize, o = !r.isLeaf && mx(r);
		return r.type.isTextblock && (a || !t.showOnlyCurrent) && o && c.push(gO({
			editor: e,
			isEmptyDoc: l,
			dataAttribute: n,
			hasAnchor: a,
			placeholder: t.placeholder,
			classes: {
				emptyEditor: t.emptyEditorClass,
				emptyNode: _O(t.emptyNodeClass, {
					editor: e,
					node: r,
					pos: i,
					hasAnchor: a
				})
			},
			node: r,
			pos: i
		})), t.includeChildren;
	}), c;
}
function yO({ editor: e, options: t, dataAttribute: n, doc: r, selection: i }) {
	if (!e.isEditable && t.showOnlyWhenEditable) return null;
	let { anchor: a } = i, o = [], s = e.isEmpty;
	if (t.showOnlyCurrent && !t.includeChildren) {
		let i = r.resolve(a), c = i.depth > 0 ? i.node(1) : i.nodeAfter, l = i.depth > 0 ? i.before(1) : a;
		if (c && c.type.isTextblock && mx(c)) {
			let r = a >= l && a <= l + c.nodeSize;
			o.push(gO({
				editor: e,
				isEmptyDoc: s,
				dataAttribute: n,
				hasAnchor: r,
				placeholder: t.placeholder,
				classes: {
					emptyEditor: t.emptyEditorClass,
					emptyNode: _O(t.emptyNodeClass, {
						editor: e,
						node: c,
						pos: l,
						hasAnchor: r
					})
				},
				node: c,
				pos: l
			}));
		}
	} else o.push(...vO({
		editor: e,
		options: t,
		dataAttribute: n,
		doc: r,
		selection: i,
		from: 0,
		to: r.content.size
	}));
	return K.create(r, o);
}
function bO(e, t) {
	let n = e.resolve(t);
	if (n.depth === 0) {
		let e = n.nodeAfter ?? n.nodeBefore;
		if (!e) return {
			from: t,
			to: t
		};
		let r = n.nodeAfter ? t : t - e.nodeSize;
		return {
			from: r,
			to: r + e.nodeSize
		};
	}
	let r = n.before(1);
	return {
		from: r,
		to: r + n.node(1).nodeSize
	};
}
function xO(e, t) {
	return {
		from: Math.max(0, t.from - 1),
		to: Math.min(e.content.size, t.to - 1)
	};
}
function SO(e, t, n) {
	let r = [];
	return e.forEach((e, i) => {
		let a = i, o = a + e.nodeSize, s = a + 1, c = o + 1;
		s < n && c > t && r.push({
			from: a,
			to: o
		});
	}), r;
}
function CO(e) {
	if (e.length === 0) return [];
	let t = [...e].sort((e, t) => e.from - t.from), n = [{ ...t[0] }];
	for (let e = 1; e < t.length; e += 1) {
		let r = n[n.length - 1], i = t[e];
		i.from <= r.to ? r.to = Math.max(r.to, i.to) : n.push({ ...i });
	}
	return n;
}
function wO(e, t) {
	let n = SO(e, t.from, t.to);
	return n.push(xO(e, bO(e, t.from))), t.to > t.from ? n.push(xO(e, bO(e, Math.min(t.to, e.content.size + 1) - 1))) : t.from < e.content.size + 1 && n.push(xO(e, bO(e, Math.min(t.from + 1, e.content.size)))), n;
}
function TO(e, t, n) {
	let r = [];
	if (e.docChanged) {
		let t = tx(e);
		for (let e of t) r.push(...wO(n.doc, e.newRange));
	}
	return e.selectionSet && (r.push(xO(n.doc, bO(n.doc, e.mapping.map(t.selection.anchor)))), r.push(xO(n.doc, bO(n.doc, n.selection.anchor)))), CO(r);
}
function EO(e, t, n) {
	let r = Math.max(0, Math.min(e, n.content.size));
	return {
		from: r,
		to: Math.max(r, Math.min(t, n.content.size))
	};
}
function DO({ decorations: e, ranges: t, editor: n, options: r, dataAttribute: i, doc: a, selection: o }) {
	let s = e;
	for (let e of t) {
		let { from: t, to: c } = EO(e.from, e.to, a), l = s.find(t, c).filter((e) => e.from >= t && e.to <= c);
		l.length && (s = s.remove(l));
		let u = vO({
			editor: n,
			options: r,
			dataAttribute: i,
			doc: a,
			selection: o,
			from: t,
			to: c
		});
		u.length && (s = s.add(a, u));
	}
	return s;
}
function OO({ editor: e, options: t, dataAttribute: n }) {
	return {
		init(r, i) {
			return yO({
				editor: e,
				options: t,
				dataAttribute: n,
				doc: i.doc,
				selection: i.selection
			}) ?? K.empty;
		},
		apply(r, i, a, o) {
			return !r.docChanged && !r.selectionSet ? i : DO({
				decorations: i.map(r.mapping, r.doc),
				ranges: TO(r, a, o),
				editor: e,
				options: t,
				dataAttribute: n,
				doc: o.doc,
				selection: o.selection
			});
		}
	};
}
function kO(e) {
	return e.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
function AO({ editor: e, options: t }) {
	let n = t.dataAttribute ? `data-${kO(t.dataAttribute)}` : `data-${mO}`, r = t.showOnlyCurrent && !t.includeChildren;
	return new W({
		key: hO,
		...r ? {} : { state: OO({
			editor: e,
			options: t,
			dataAttribute: n
		}) },
		props: { decorations: r ? ({ doc: r, selection: i }) => yO({
			editor: e,
			options: t,
			dataAttribute: n,
			doc: r,
			selection: i
		}) : (n) => t.showOnlyWhenEditable && !e.isEditable ? K.empty : hO.getState(n) ?? K.empty }
	});
}
var jO = X.create({
	name: "placeholder",
	addOptions() {
		return {
			emptyEditorClass: "is-editor-empty",
			emptyNodeClass: "is-empty",
			dataAttribute: mO,
			placeholder: "Write something …",
			showOnlyWhenEditable: !0,
			showOnlyCurrent: !0,
			includeChildren: !1
		};
	},
	addProseMirrorPlugins() {
		return [AO({
			editor: this.editor,
			options: this.options
		})];
	}
});
function MO(e, t) {
	return !e.selection.empty && !hx(e.selection) && t.isEditable;
}
function NO(e, t) {
	return MO(e, t) && !t.isFocused && !t.view.dragging;
}
function PO() {
	var e;
	(e = window.getSelection()) == null || e.removeAllRanges();
}
function FO(e) {
	e.focus();
}
X.create({
	name: "selection",
	addOptions() {
		return { className: "selection" };
	},
	addProseMirrorPlugins() {
		let { editor: e, options: t } = this;
		return [new W({
			key: new Zf("selection"),
			props: {
				decorations(n) {
					return NO(n, e) ? K.create(n.doc, [C_.inline(n.selection.from, n.selection.to, { class: t.className })]) : null;
				},
				handleDOMEvents: {
					blur(t) {
						return MO(t.state, e) && PO(), !1;
					},
					focus(t) {
						return MO(t.state, e) && requestAnimationFrame(() => {
							!e.isDestroyed && t.hasFocus() && FO(t);
						}), !1;
					}
				}
			}
		})];
	}
});
function IO({ types: e, node: t }) {
	return t && Array.isArray(e) && e.includes(t.type) || t?.type === e;
}
var LO = X.create({
	name: "trailingNode",
	addOptions() {
		return {
			node: void 0,
			notAfter: []
		};
	},
	addProseMirrorPlugins() {
		let e = new Zf(this.name), t = this.options.node || this.editor.schema.topNodeType.contentMatch.defaultType?.name || "paragraph", n = Object.entries(this.editor.schema.nodes).map(([, e]) => e).filter((e) => (this.options.notAfter || []).concat(t).includes(e.name));
		return [new W({
			key: e,
			appendTransaction: (n, r, i) => {
				let { doc: a, tr: o, schema: s } = i, c = e.getState(i), l = a.content.size, u = s.nodes[t];
				if (!n.some((e) => e.getMeta("skipTrailingNode")) && c) return o.insert(l, u.create());
			},
			state: {
				init: (e, t) => {
					let r = t.tr.doc.lastChild;
					return !IO({
						node: r,
						types: n
					});
				},
				apply: (e, t) => {
					if (!e.docChanged || e.getMeta("__uniqueIDTransaction")) return t;
					let r = e.doc.lastChild;
					return !IO({
						node: r,
						types: n
					});
				}
			}
		})];
	}
}), RO = X.create({
	name: "undoRedo",
	addOptions() {
		return {
			depth: 100,
			newGroupDelay: 500
		};
	},
	addCommands() {
		return {
			undo: () => ({ state: e, dispatch: t }) => Xv(e, t),
			redo: () => ({ state: e, dispatch: t }) => Zv(e, t)
		};
	},
	addProseMirrorPlugins() {
		return [Jv(this.options)];
	},
	addKeyboardShortcuts() {
		return {
			"Mod-z": () => this.editor.commands.undo(),
			"Shift-Mod-z": () => this.editor.commands.redo(),
			"Mod-y": () => this.editor.commands.redo(),
			"Mod-я": () => this.editor.commands.undo(),
			"Shift-Mod-я": () => this.editor.commands.redo()
		};
	}
}), zO = X.create({
	name: "starterKit",
	addExtensions() {
		let e = [];
		return this.options.bold !== !1 && e.push(WC.configure(this.options.bold)), this.options.blockquote !== !1 && e.push(RC.configure(this.options.blockquote)), this.options.bulletList !== !1 && e.push(zE.configure(this.options.bulletList)), this.options.code !== !1 && e.push(YC.configure(this.options.code)), this.options.codeBlock !== !1 && e.push($C.configure(this.options.codeBlock)), this.options.document !== !1 && e.push(ew.configure(this.options.document)), this.options.dropcursor !== !1 && e.push(fO.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && e.push(pO.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && e.push(tw.configure(this.options.hardBreak)), this.options.heading !== !1 && e.push(nw.configure(this.options.heading)), this.options.undoRedo !== !1 && e.push(RO.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && e.push(rw.configure(this.options.horizontalRule)), this.options.italic !== !1 && e.push(cw.configure(this.options.italic)), this.options.listItem !== !1 && e.push(cD.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(_D.configure(this.options?.listKeymap)), this.options.link !== !1 && e.push(PE.configure(this.options?.link)), this.options.orderedList !== !1 && e.push(LD.configure(this.options.orderedList)), this.options.paragraph !== !1 && e.push(GD.configure(this.options.paragraph)), this.options.strike !== !1 && e.push(JD.configure(this.options.strike)), this.options.text !== !1 && e.push(XD.configure(this.options.text)), this.options.underline !== !1 && e.push(ZD.configure(this.options?.underline)), this.options.trailingNode !== !1 && e.push(LO.configure(this.options?.trailingNode)), e;
	}
}), BO = jO, VO = X.create({
	name: "textAlign",
	addOptions() {
		return {
			types: [],
			alignments: [
				"left",
				"center",
				"right",
				"justify"
			],
			defaultAlignment: null
		};
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { textAlign: {
				default: this.options.defaultAlignment,
				parseHTML: (e) => {
					let t = e.style.textAlign;
					return this.options.alignments.includes(t) ? t : this.options.defaultAlignment;
				},
				renderHTML: (e) => !NS(e.textAlign) || !this.options.alignments.includes(e.textAlign) ? {} : { style: `text-align: ${e.textAlign}` }
			} }
		}];
	},
	addCommands() {
		return {
			setTextAlign: (e) => ({ commands: t }) => this.options.alignments.includes(e) ? this.options.types.map((n) => t.updateAttributes(n, { textAlign: e })).some((e) => e) : !1,
			unsetTextAlign: () => ({ commands: e }) => this.options.types.map((t) => e.resetAttributes(t, "textAlign")).some((e) => e),
			toggleTextAlign: (e) => ({ editor: t, commands: n }) => this.options.alignments.includes(e) ? t.isActive({ textAlign: e }) ? n.unsetTextAlign() : n.setTextAlign(e) : !1
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
			"Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
			"Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
			"Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
		};
	}
}), HO = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, UO = wC.create({
	name: "image",
	addOptions() {
		return {
			inline: !1,
			allowBase64: !1,
			HTMLAttributes: {},
			resize: !1
		};
	},
	inline() {
		return this.options.inline;
	},
	group() {
		return this.options.inline ? "inline" : "block";
	},
	draggable: !0,
	addAttributes() {
		return {
			src: { default: null },
			alt: { default: null },
			title: { default: null },
			width: { default: null },
			height: { default: null }
		};
	},
	parseHTML() {
		return [{ tag: this.options.allowBase64 ? "img[src]" : "img[src]:not([src^=\"data:\"])" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["img", Y(this.options.HTMLAttributes, e)];
	},
	parseMarkdown: (e, t) => t.createNode("image", {
		src: e.href,
		title: e.title,
		alt: e.text
	}),
	renderMarkdown: (e) => {
		let t = e.attrs?.src ?? "", n = e.attrs?.alt ?? "", r = e.attrs?.title ?? "";
		return r ? `![${n}](${t} "${r}")` : `![${n}](${t})`;
	},
	addNodeView() {
		if (!this.options.resize || !this.options.resize.enabled || typeof document > "u") return null;
		let { directions: e, minWidth: t, minHeight: n, alwaysPreserveAspectRatio: r } = this.options.resize, i = /* @__PURE__ */ new Set([
			"src",
			"width",
			"height"
		]);
		return ({ node: a, getPos: o, HTMLAttributes: s, editor: c }) => {
			let l = document.createElement("img");
			l.draggable = !1;
			let u = Y(this.options.HTMLAttributes, s);
			Object.entries(u).forEach(([e, t]) => {
				if (t != null) switch (e) {
					case "src":
					case "width":
					case "height": break;
					default: l.setAttribute(e, t);
				}
			}), u.src !== null && (l.src = u.src);
			let d = { ...s }, f = (e) => {
				typeof e == "string" && e !== "" ? l.getAttribute("src") !== e && (l.src = e) : (l.hasAttribute("src") && l.removeAttribute("src"), l.src !== "" && (l.src = ""));
			};
			f(s.src);
			let p = new CC({
				element: l,
				editor: c,
				node: a,
				getPos: o,
				onResize: (e, t) => {
					l.style.width = `${e}px`, l.style.height = `${t}px`;
				},
				onCommit: (e, t) => {
					let n = o();
					n !== void 0 && this.editor.chain().setNodeSelection(n).updateAttributes(this.name, {
						width: e,
						height: t
					}).run();
				},
				onUpdate: (e) => {
					if (e.type !== a.type) return !1;
					let t = zb(e, c.extensionManager.attributes.filter((t) => t.type === e.type.name));
					return Object.keys(d).forEach((e) => {
						!i.has(e) && !(e in t) && l.removeAttribute(e);
					}), Object.entries(t).forEach(([e, t]) => {
						i.has(e) || (t == null ? l.removeAttribute(e) : l.setAttribute(e, t));
					}), f(t.src), d = t, !0;
				},
				options: {
					directions: e,
					min: {
						width: t,
						height: n
					},
					preserveAspectRatio: r === !0
				}
			}), m = p.dom, h = () => {
				m.style.visibility = "", m.style.pointerEvents = "";
			};
			return m.style.visibility = "hidden", m.style.pointerEvents = "none", l.complete && l.naturalWidth > 0 ? h() : (l.onload = h, l.onerror = h), p;
		};
	},
	addCommands() {
		return { setImage: (e) => ({ commands: t }) => t.insertContent({
			type: this.name,
			attrs: e
		}) };
	},
	addInputRules() {
		return [yC({
			find: HO,
			type: this.type,
			getAttributes: (e) => {
				let [, , t, n, r] = e;
				return {
					src: n,
					alt: t,
					title: r
				};
			}
		})];
	}
}), WO = {
	left: "text-start",
	center: "text-center",
	right: "text-end",
	justify: "text-justify"
}, GO = [
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
	"dark",
	"muted"
], KO = [
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
	"dark",
	"light"
], qO = [
	"",
	"m-0",
	"m-1",
	"m-2",
	"m-3",
	"m-4",
	"m-5",
	"mx-1",
	"mx-2",
	"mx-3",
	"mx-auto",
	"my-1",
	"my-2",
	"my-3",
	"my-4",
	"mt-2",
	"mb-2",
	"ms-2",
	"me-2"
], JO = [
	"secondary",
	"primary",
	"success",
	"danger",
	"warning",
	"info",
	"light",
	"dark"
], YO = [
	"float-start",
	"float-end",
	"float-none"
], XO = [
	"img-fluid",
	"img-thumbnail",
	"rounded",
	"rounded-circle",
	"rounded-0",
	"d-block",
	"d-inline-block",
	"mx-auto",
	"w-100",
	"shadow",
	"shadow-sm"
], ZO = [
	"",
	"p-0",
	"p-1",
	"p-2",
	"p-3",
	"p-4",
	"p-5",
	"px-1",
	"px-2",
	"px-3",
	"px-4",
	"py-1",
	"py-2",
	"py-3",
	"py-4",
	"pt-2",
	"pb-2",
	"ps-2",
	"pe-2"
];
function QO(e, t, n) {
	if (!e || !e.classList) return n;
	for (let n of t) {
		let t = WO[n];
		if (t && e.classList.contains(t)) return n;
	}
	let r = e.style && e.style.textAlign;
	return r && t.includes(r) ? r : n;
}
function $O(e) {
	if (!e || !e.classList) return "secondary";
	for (let t of JO) if (e.classList.contains(`alert-${t}`)) return t;
	return "secondary";
}
function ek(e) {
	if (!e || !e.classList) return null;
	for (let t of qO) if (t && e.classList.contains(t)) return t;
	return null;
}
function tk(e) {
	if (!e || !e.classList) return null;
	for (let t of ZO) if (t && e.classList.contains(t)) return t;
	return null;
}
function nk(e) {
	if (!e || !e.classList) return null;
	let t = [];
	for (let n of XO) e.classList.contains(n) && t.push(n);
	return t.length ? t.join(" ") : null;
}
function rk(e) {
	if (!e || !e.classList) return null;
	for (let t of YO) if (e.classList.contains(t)) return t;
	return e.classList.contains("float-left") ? "float-start" : e.classList.contains("float-right") ? "float-end" : null;
}
function ik(e) {
	let t = e.state.selection;
	return t instanceof U && t.node.type.name === "image";
}
var ak = UO.extend({
	atom: !0,
	addAttributes() {
		return {
			...this.parent?.(),
			imgClass: {
				default: null,
				rendered: !1,
				parseHTML: (e) => nk(e)
			}
		};
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let n = e.attrs.imgClass, r = Y(this.options.HTMLAttributes, t);
		return n && String(n).trim() ? ["img", Y(r, { class: String(n).trim() })] : ["img", r];
	}
}), ok = VO.extend({ addGlobalAttributes() {
	let e = this.options.alignments, t = this.options.types, n = this.options.defaultAlignment;
	return [{
		types: t,
		attributes: { textAlign: {
			default: n,
			parseHTML: (t) => QO(t, e, n),
			renderHTML: (e) => {
				if (!e.textAlign) return {};
				let t = WO[e.textAlign];
				return t ? { class: t } : {};
			}
		} }
	}];
} }), sk = GC.extend({
	parseHTML() {
		return [
			{
				tag: "span",
				getAttrs: (e) => e.classList && e.classList.contains("fw-bold") ? {} : !1
			},
			{ tag: "strong" },
			{
				tag: "b",
				getAttrs: (e) => e.style.fontWeight !== "normal" && null
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			Y(this.options.HTMLAttributes, e, { class: "fw-bold" }),
			0
		];
	}
}), ck = lw.extend({
	parseHTML() {
		return [
			{
				tag: "span",
				getAttrs: (e) => e.classList && e.classList.contains("fst-italic") ? {} : !1
			},
			{ tag: "em" },
			{
				tag: "i",
				getAttrs: (e) => e.style.fontStyle !== "normal" && null
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			Y(this.options.HTMLAttributes, e, { class: "fst-italic" }),
			0
		];
	}
}), lk = QD.extend({
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (e) => e.classList && e.classList.contains("text-decoration-underline") ? {} : !1
		}, { tag: "u" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			Y(this.options.HTMLAttributes, e, { class: "text-decoration-underline" }),
			0
		];
	}
}), uk = YD.extend({
	parseHTML() {
		return [
			{
				tag: "span",
				getAttrs: (e) => e.classList && e.classList.contains("text-decoration-line-through") ? {} : !1
			},
			{ tag: "s" },
			{ tag: "del" },
			{ tag: "strike" }
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			Y(this.options.HTMLAttributes, e, { class: "text-decoration-line-through" }),
			0
		];
	}
}), dk = zC.extend({
	addAttributes() {
		return { variant: {
			default: "secondary",
			rendered: !1,
			parseHTML: (e) => $O(e)
		} };
	},
	parseHTML() {
		return [{ tag: "blockquote" }, {
			tag: "div",
			getAttrs: (e) => typeof e == "string" || !e.classList ? !1 : e.classList.contains("alert") ? { variant: $O(e) } : !1
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let n = e.attrs.variant && JO.includes(e.attrs.variant) ? e.attrs.variant : "secondary";
		return [
			"div",
			Y(this.options.HTMLAttributes, t, {
				class: `alert alert-${n}`,
				role: "alert"
			}),
			0
		];
	}
}), fk = JS.create({
	name: "textColor",
	inclusive: !0,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	addAttributes() {
		return { variant: {
			default: null,
			rendered: !1,
			parseHTML: (e) => {
				if (!e.classList) return null;
				for (let t of GO) if (e.classList.contains(`text-${t}`)) return t;
				return null;
			}
		} };
	},
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (e) => {
				if (!e.classList) return !1;
				for (let t of GO) if (e.classList.contains(`text-${t}`)) return { variant: t };
				return !1;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e, mark: t }) {
		let n = t.attrs.variant;
		return n ? [
			"span",
			Y(this.options.HTMLAttributes, e, { class: `text-${n}` }),
			0
		] : [
			"span",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setTextColor: (e) => ({ commands: t }) => e ? t.setMark(this.name, { variant: e }) : t.unsetMark(this.name),
			toggleTextColor: (e) => ({ commands: t, editor: n }) => !e || n.isActive(this.name, { variant: e }) ? t.unsetMark(this.name) : t.setMark(this.name, { variant: e }),
			unsetTextColor: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	}
}), pk = JS.create({
	name: "backgroundColor",
	inclusive: !0,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	addAttributes() {
		return { variant: {
			default: null,
			rendered: !1,
			parseHTML: (e) => {
				if (!e.classList) return null;
				for (let t of KO) if (e.classList.contains(`bg-${t}`)) return t;
				return null;
			}
		} };
	},
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (e) => {
				if (!e.classList) return !1;
				for (let t of KO) if (e.classList.contains(`bg-${t}`)) return { variant: t };
				return !1;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e, mark: t }) {
		let n = t.attrs.variant;
		return n ? [
			"span",
			Y(this.options.HTMLAttributes, e, { class: `bg-${n}` }),
			0
		] : [
			"span",
			Y(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setBackgroundColor: (e) => ({ commands: t }) => e ? t.setMark(this.name, { variant: e }) : t.unsetMark(this.name),
			toggleBackgroundColor: (e) => ({ commands: t, editor: n }) => !e || n.isActive(this.name, { variant: e }) ? t.unsetMark(this.name) : t.setMark(this.name, { variant: e }),
			unsetBackgroundColor: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	}
}), mk = X.create({
	name: "blockMargin",
	addOptions() {
		return { types: [
			"paragraph",
			"heading",
			"blockquote"
		] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { marginClass: {
				default: null,
				parseHTML: (e) => ek(e),
				renderHTML: (e) => e.marginClass ? { class: e.marginClass } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBlockMarginClass: (e) => ({ editor: t, commands: n }) => {
				let r = e || null;
				return ik(t) ? n.updateAttributes("image", { marginClass: r }) : t.isActive("blockquote") ? n.updateAttributes("blockquote", { marginClass: r }) : t.isActive("heading") ? n.updateAttributes("heading", { marginClass: r }) : n.updateAttributes("paragraph", { marginClass: r });
			},
			unsetBlockMarginClass: () => ({ editor: e, commands: t }) => ik(e) ? t.resetAttributes("image", "marginClass") : e.isActive("blockquote") ? t.resetAttributes("blockquote", "marginClass") : e.isActive("heading") ? t.resetAttributes("heading", "marginClass") : t.resetAttributes("paragraph", "marginClass")
		};
	}
}), hk = X.create({
	name: "blockPadding",
	addOptions() {
		return { types: [
			"paragraph",
			"heading",
			"blockquote"
		] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { paddingClass: {
				default: null,
				parseHTML: (e) => tk(e),
				renderHTML: (e) => e.paddingClass ? { class: e.paddingClass } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBlockPaddingClass: (e) => ({ editor: t, commands: n }) => {
				let r = e || null;
				return ik(t) ? n.updateAttributes("image", { paddingClass: r }) : t.isActive("blockquote") ? n.updateAttributes("blockquote", { paddingClass: r }) : t.isActive("heading") ? n.updateAttributes("heading", { paddingClass: r }) : n.updateAttributes("paragraph", { paddingClass: r });
			},
			unsetBlockPaddingClass: () => ({ editor: e, commands: t }) => ik(e) ? t.resetAttributes("image", "paddingClass") : e.isActive("blockquote") ? t.resetAttributes("blockquote", "paddingClass") : e.isActive("heading") ? t.resetAttributes("heading", "paddingClass") : t.resetAttributes("paragraph", "paddingClass")
		};
	}
}), gk = X.create({
	name: "blockFloat",
	addOptions() {
		return { types: [
			"paragraph",
			"heading",
			"blockquote",
			"image"
		] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { floatClass: {
				default: null,
				parseHTML: (e) => rk(e),
				renderHTML: (e) => e.floatClass ? { class: e.floatClass } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBlockFloatClass: (e) => ({ editor: t, commands: n }) => {
				let r = e || null;
				return ik(t) ? n.updateAttributes("image", { floatClass: r }) : t.isActive("blockquote") ? n.updateAttributes("blockquote", { floatClass: r }) : t.isActive("heading") ? n.updateAttributes("heading", { floatClass: r }) : n.updateAttributes("paragraph", { floatClass: r });
			},
			unsetBlockFloatClass: () => ({ editor: e, commands: t }) => ik(e) ? t.resetAttributes("image", "floatClass") : e.isActive("blockquote") ? t.resetAttributes("blockquote", "floatClass") : e.isActive("heading") ? t.resetAttributes("heading", "floatClass") : t.resetAttributes("paragraph", "floatClass")
		};
	}
}), _k = GO, vk = KO, yk = qO, bk = ZO, xk = JO, Sk = [
	"www.youtube.com",
	"youtube.com",
	"www.youtube-nocookie.com",
	"player.vimeo.com",
	"www.facebook.com",
	"facebook.com"
], Ck = [
	{
		value: "21x9",
		orientation: "landscape",
		label: "21:9"
	},
	{
		value: "16x9",
		orientation: "landscape",
		label: "16:9"
	},
	{
		value: "4x3",
		orientation: "landscape",
		label: "4:3"
	},
	{
		value: "1x1",
		orientation: "square",
		label: "1:1"
	},
	{
		value: "4x5",
		orientation: "portrait",
		label: "4:5"
	},
	{
		value: "3x4",
		orientation: "portrait",
		label: "3:4"
	},
	{
		value: "9x16",
		orientation: "portrait",
		label: "9:16",
		phone: !0
	},
	{
		value: "9x19.5",
		orientation: "portrait",
		label: "9:19.5",
		phone: !0
	}
], wk = Ck.map((e) => e.value), Tk = [
	"1x1",
	"4x3",
	"16x9",
	"21x9"
];
function Ek(e) {
	let t = String(e || "").match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/);
	return t ? {
		w: parseFloat(t[1]),
		h: parseFloat(t[2])
	} : null;
}
function Dk(e) {
	return `ratio-${String(e).replace(".", "-")}`;
}
var Ok = {
	width: [
		"px",
		"%",
		"vw",
		"vh"
	],
	height: [
		"px",
		"vh",
		"vw"
	]
};
function kk(e, t = "width") {
	if (e == null || e === "") return null;
	let n = String(e).trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(px|%|vw|vh)?$/);
	if (!n) return null;
	let r = parseFloat(n[1]), i = n[2] || "px";
	return !(r > 0) || !Ok[t].includes(i) ? null : `${+r.toFixed(2)}${i}`;
}
function Ak(e, t = "width") {
	let n = kk(e, t);
	if (!n) return {
		value: "",
		unit: "px"
	};
	let r = n.match(/^([\d.]+)(.*)$/);
	return {
		value: r[1],
		unit: r[2]
	};
}
function jk(e) {
	let t = e && e.match(/^([\d.]+)px$/);
	return t ? Math.round(parseFloat(t[1])) : null;
}
function Mk(e, t, n) {
	let r = Ek(e);
	if (!r) return null;
	let i = [];
	Tk.includes(e) || i.push(`--bs-aspect-ratio: ${+(r.h / r.w * 100).toFixed(4)}%`);
	let a = kk(t, "width"), o = kk(n, "height"), s = null;
	if (o) {
		let e = jk(o);
		s = e ? `${Math.round(e * r.w / r.h)}px` : `calc(${o} * ${+(r.w / r.h).toFixed(4)})`;
	}
	let c = a && s ? `min(${a}, ${s})` : a || s;
	return c && i.push(`max-width: ${c}`), i.length ? i.join("; ") : null;
}
function Nk(e, t) {
	let n = kk(e, "width"), r = kk(t, "height"), i = [];
	return n && i.push(`width: ${n}`), r && i.push(`height: ${r}`), i.push("max-width: 100%"), i.join("; ");
}
function Pk(e) {
	let t = String(e || "");
	return /youtube\.com\/shorts\//i.test(t) || /facebook\.com\/(reel|share\/r)\//i.test(t) || /facebook\.com%2F(reel|share%2Fr)%2F/i.test(t) ? "9x16" : "16x9";
}
var Fk = /^[A-Za-z0-9_-]{6,}$/;
function Ik(e) {
	try {
		let t = new URL(e);
		return t.protocol === "https:" || t.protocol === "http:" ? t : null;
	} catch {
		return null;
	}
}
function Lk(e) {
	if (!e) return 0;
	if (/^\d+$/.test(e)) return parseInt(e, 10);
	let t = String(e).match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
	return t ? parseInt(t[1] || 0, 10) * 3600 + parseInt(t[2] || 0, 10) * 60 + parseInt(t[3] || 0, 10) : 0;
}
function Rk(e) {
	let t = e.hostname.replace(/^(www\.|m\.)/, ""), n = null;
	if (t === "youtu.be") n = e.pathname.split("/")[1];
	else if (t === "youtube.com" || t === "youtube-nocookie.com") {
		let t = e.pathname.split("/").filter(Boolean);
		t[0] === "watch" ? n = e.searchParams.get("v") : [
			"embed",
			"shorts",
			"live",
			"v"
		].includes(t[0]) && (n = t[1]);
	} else return null;
	if (!n || !Fk.test(n)) return null;
	let r = t === "youtube-nocookie.com" ? "www.youtube-nocookie.com" : "www.youtube.com", i = Lk(e.searchParams.get("start") || e.searchParams.get("t"));
	return `https://${r}/embed/${n}${i > 0 ? `?start=${i}` : ""}`;
}
function zk(e) {
	let t = e.hostname.replace(/^www\./, ""), n = e.pathname.split("/").filter(Boolean), r = null, i = e.searchParams.get("h");
	if (t === "player.vimeo.com" && n[0] === "video") r = n[1];
	else if (t === "vimeo.com") {
		let e = n.findIndex((e) => /^\d+$/.test(e));
		e >= 0 && (r = n[e], !i && n[e + 1] && /^[a-f0-9]+$/i.test(n[e + 1]) && (i = n[e + 1]));
	} else return null;
	return !r || !/^\d+$/.test(r) ? null : `https://player.vimeo.com/video/${r}${i ? `?h=${encodeURIComponent(i)}` : ""}`;
}
function Bk(e) {
	let t = e.hostname.replace(/^(www\.|m\.|web\.)/, "");
	if (t === "facebook.com" && e.pathname.replace(/\/+$/, "") === "/plugins/video.php") {
		let t = e.searchParams.get("href"), n = t && Ik(t);
		return n ? Bk(n) : null;
	}
	if (t !== "facebook.com" && t !== "fb.watch" || t === "facebook.com" && !/\/(videos|watch|reel|share\/v|share\/r)\b/.test(e.pathname)) return null;
	let n = `https://${t === "fb.watch" ? "fb.watch" : "www.facebook.com"}${e.pathname}${e.searchParams.get("v") ? `?v=${encodeURIComponent(e.searchParams.get("v"))}` : ""}`;
	return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(n)}&show_text=false`;
}
function Vk(e) {
	let t = String(e || "").trim();
	if (!t) return null;
	if (/^<iframe[\s>]/i.test(t)) {
		let e = t.match(/\ssrc\s*=\s*(["'])(.*?)\1/i);
		if (!e) return null;
		t = e[2].replace(/&amp;/g, "&");
	}
	t.startsWith("//") ? t = `https:${t}` : /^[a-z]+:\/\//i.test(t) || (t = `https://${t}`);
	let n = Ik(t);
	return n ? Rk(n) || zk(n) || Bk(n) : null;
}
var Hk = {
	"www.youtube.com": /^\/embed\/[A-Za-z0-9_-]+\/?$/,
	"youtube.com": /^\/embed\/[A-Za-z0-9_-]+\/?$/,
	"www.youtube-nocookie.com": /^\/embed\/[A-Za-z0-9_-]+\/?$/,
	"player.vimeo.com": /^\/video\/\d+\/?$/,
	"www.facebook.com": /^\/plugins\/video\.php$/,
	"facebook.com": /^\/plugins\/video\.php$/
};
function Uk(e, t = Sk) {
	let n = Ik(String(e || ""));
	if (!n || n.protocol !== "https:") return !1;
	let r = n.hostname.toLowerCase();
	if (!t.includes(r)) return !1;
	let i = Hk[r];
	return !i || i.test(n.pathname);
}
function Wk(e, t = Sk) {
	let n = Vk(e);
	if (n && Uk(n, t)) return n;
	let r = String(e || "").trim(), i = r.match(/^<iframe[\s\S]*?\ssrc\s*=\s*(["'])(.*?)\1/i);
	return i && (r = i[2].replace(/&amp;/g, "&")), Uk(r, t) ? r : null;
}
function Gk(e) {
	if (!e || !e.classList) return null;
	for (let t of wk) if (e.classList.contains(Dk(t))) return t;
	return "16x9";
}
function Kk(e, t, n) {
	return kk(e && e.getAttribute(`data-${n}`) || t && t.getAttribute(`data-${n}`), n) || kk(t && t.getAttribute(n), n);
}
var qk = wC.create({
	name: "videoEmbed",
	group: "block",
	atom: !0,
	draggable: !0,
	selectable: !0,
	addOptions() {
		return {
			allowedHosts: Sk,
			HTMLAttributes: {}
		};
	},
	addAttributes() {
		return {
			src: {
				default: null,
				rendered: !1
			},
			width: {
				default: null,
				rendered: !1
			},
			height: {
				default: null,
				rendered: !1
			},
			allowfullscreen: {
				default: !0,
				rendered: !1
			},
			title: {
				default: null,
				rendered: !1
			},
			ratio: {
				default: "16x9",
				rendered: !1
			}
		};
	},
	parseHTML() {
		let e = this.options.allowedHosts, t = (t, n, r = null) => {
			let i = t && t.getAttribute("src");
			return Uk(i, e) ? {
				src: i,
				width: Kk(r, t, "width"),
				height: Kk(r, t, "height"),
				allowfullscreen: t.hasAttribute("allowfullscreen"),
				title: t.getAttribute("title") || null,
				ratio: n
			} : !1;
		};
		return [{
			tag: "div",
			priority: 60,
			getAttrs: (e) => typeof e == "string" || !e.classList || !e.classList.contains("ratio") ? !1 : t(e.querySelector("iframe"), Gk(e), e)
		}, {
			tag: "iframe",
			getAttrs: (e) => typeof e != "string" && t(e, null)
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let { src: n, allowfullscreen: r, title: i, ratio: a } = e.attrs;
		if (!Uk(n, this.options.allowedHosts)) return ["div", { "data-video-embed": "blocked" }];
		let o = kk(e.attrs.width, "width"), s = kk(e.attrs.height, "height"), c = {
			"data-width": o,
			"data-height": s
		}, l = {
			src: n,
			width: jk(o),
			height: jk(s),
			title: i || null,
			frameborder: "0",
			loading: "lazy",
			referrerpolicy: "strict-origin-when-cross-origin",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
			allowfullscreen: r ? "true" : null
		};
		if (a && wk.includes(a)) {
			let e = {
				class: `ratio ${Dk(a)}`,
				style: Mk(a, o, s),
				...c
			};
			return [
				"div",
				Y(this.options.HTMLAttributes, t, e),
				["iframe", l]
			];
		}
		let u = {
			...l,
			...c,
			style: Nk(o, s)
		};
		return ["iframe", Y(this.options.HTMLAttributes, t, u)];
	},
	addNodeView() {
		return ({ node: e }) => {
			let t = document.createElement("div");
			t.className = "tiptap-video-embed", t.contentEditable = "false";
			let n = (e) => {
				t.innerHTML = "";
				let { src: n, width: r, height: i, ratio: a } = e.attrs, o = document.createElement("div");
				if (a && wk.includes(a) ? (o.className = `ratio ${Dk(a)}`, o.setAttribute("style", Mk(a, r, i) || "")) : o.setAttribute("style", Nk(r, i)), Uk(n, this.options.allowedHosts)) {
					let e = document.createElement("iframe");
					e.src = n, e.setAttribute("frameborder", "0"), e.setAttribute("loading", "lazy"), e.setAttribute("referrerpolicy", "strict-origin-when-cross-origin"), e.setAttribute("tabindex", "-1"), a || (e.width = "100%", e.height = "100%"), o.appendChild(e);
				}
				t.appendChild(o);
			};
			return n(e), {
				dom: t,
				update: (e) => e.type.name === this.name && (n(e), !0),
				ignoreMutation: () => !0
			};
		};
	},
	addCommands() {
		return { setVideoEmbed: (e) => ({ commands: t }) => !e || !Uk(e.src, this.options.allowedHosts) ? !1 : t.insertContent({
			type: this.name,
			attrs: e
		}) };
	}
}), Jk = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Yk = () => ({
	url: "",
	width: "",
	widthUnit: "px",
	height: "",
	heightUnit: "px",
	ratio: "auto",
	allowfullscreen: !0,
	title: ""
}), Xk = [
	{
		label: "Full width",
		width: "100%",
		height: null
	},
	{
		label: "Fit screen",
		width: "100%",
		height: "85vh",
		hint: "Full width, but at most 85% of the screen height (landscape phone, laptop)"
	},
	{
		label: "Half width",
		width: "50%",
		height: null
	},
	{
		label: "No size",
		width: null,
		height: null
	}
], Zk = [
	{
		orientation: "landscape",
		label: "Landscape"
	},
	{
		orientation: "square",
		label: "Square"
	},
	{
		orientation: "portrait",
		label: "Portrait"
	}
];
function Qk(e) {
	let t = (e || "").trim();
	if (!t || t === "<p></p>" || t === "<p><br></p>") return "";
	let n = document.createElement("div");
	return n.innerHTML = t, !(n.textContent || "").replace(/\u00a0/g, " ").trim() && !n.querySelector("img, iframe, video, hr, table") ? "" : t;
}
function $k(e) {
	return [...e].sort((e, t) => e.key === "default" ? -1 : t.key === "default" ? 1 : String(e.key).localeCompare(String(t.key)));
}
function eA(e, t) {
	if (!e || typeof e != "object") return "";
	let n = e.tag;
	if (typeof n == "string" && n.trim()) return n.trim();
	let r = e.tags;
	if (!Array.isArray(r) || !r.length) return "";
	let i = Array.isArray(t) ? t : [];
	return r.map((e) => {
		let t = i.find((t) => t && t.value === e);
		return t && typeof t.label == "string" && t.label.trim() ? t.label.trim() : String(e);
	}).filter(Boolean).join(", ");
}
var tA = {
	components: { EditorContent: OC },
	inheritAttrs: !1,
	props: {
		modelValue: [String, null],
		tiptapOptions: {
			type: Object,
			default: () => ({})
		},
		formItem: {
			type: Object,
			default: null
		},
		formSettings: {
			type: Object,
			default: null
		}
	},
	emits: ["update:modelValue"],
	data() {
		return {
			editor: null,
			imageModalOpen: !1,
			imageModalMode: "insert",
			editingImagePos: null,
			editOriginalSrc: "",
			selectedImageId: null,
			selectedPresetKey: "default",
			manualImageUrl: "",
			selectedImagePos: null,
			imageEditForm: {
				alt: "",
				width: "",
				height: "",
				imgClass: ""
			},
			htmlSourceModalOpen: !1,
			htmlSourceText: "",
			videoModalOpen: !1,
			videoModalMode: "insert",
			editingVideoPos: null,
			selectedVideoPos: null,
			videoForm: Yk(),
			videoSizeUnits: Ok,
			videoSizePresets: Xk,
			videoRatioGroups: Zk.map((e) => ({
				...e,
				options: Ck.filter((t) => t.orientation === e.orientation)
			})),
			textColorVariants: _k,
			bgVariants: vk,
			marginClasses: yk,
			paddingClasses: bk,
			imgUtilityClasses: XO,
			floatClasses: YO,
			alertVariants: xk
		};
	},
	computed: {
		imageModalTitle() {
			return this.imageModalMode === "edit" ? this.translate("Edit image") : this.translate("Insert image");
		},
		placeholderText() {
			return this.tiptapOptions && this.tiptapOptions.placeholder || "";
		},
		videoEnabled() {
			return !(this.tiptapOptions && this.tiptapOptions.video === !1);
		},
		videoAllowedHosts() {
			let e = this.tiptapOptions && this.tiptapOptions.video;
			return (e && typeof e == "object" && Array.isArray(e.allowedHosts) ? e.allowedHosts : Sk).map((e) => String(e).toLowerCase());
		},
		videoResolvedSrc() {
			return Wk(this.videoForm.url, this.videoAllowedHosts);
		},
		videoEffectiveRatio() {
			let e = this.videoForm.ratio;
			return e === "auto" ? Pk(this.videoForm.url) : e || null;
		},
		videoPreviewStyle() {
			let e = this.videoAttrsFromForm();
			return this.videoEffectiveRatio ? {
				wrapper: Mk(this.videoEffectiveRatio, e.width, e.height),
				iframe: null
			} : {
				wrapper: null,
				iframe: Nk(e.width, e.height)
			};
		},
		customToolbarButtons() {
			let e = this.tiptapOptions && this.tiptapOptions.toolbarButtons;
			return Array.isArray(e) ? e.filter((e) => e && typeof e.run == "function") : [];
		},
		imageSourceFieldFilter() {
			let e = this.tiptapOptions && this.tiptapOptions.imageSourceFields;
			return Array.isArray(e) && e.length ? e : null;
		},
		imageGalleryEntries() {
			let e = this.formItem, t = this.formSettings, n = this.imageSourceFieldFilter, r = [];
			if (!e || !t || !t.form || !Array.isArray(t.form.groups)) return r;
			for (let i of t.form.groups) {
				let t = i.fields;
				if (Array.isArray(t)) for (let i of t) {
					if (i.type !== "image" && i.type !== "upload" || n && !n.includes(i.name)) continue;
					let t = e[i.name];
					if (!Array.isArray(t)) continue;
					let a = i.params && i.params.thumbnail || "default";
					for (let e of t) {
						if (!e || !e.isImage || !e.loaded || !e.types) continue;
						let t = [];
						for (let n of Object.keys(e.types)) {
							let r = e.types[n], i = r && (r.url || r.data);
							typeof i == "string" && i.length > 0 && t.push({
								key: n,
								src: i
							});
						}
						if (!t.length) continue;
						let n = $k(t), o = e.types[a], s = o && (o.url || o.data) || n[0].src, c = typeof i.label == "string" && i.label ? i.label : i.name, l = i.params && Array.isArray(i.params.tags) ? i.params.tags : [];
						r.push({
							id: [
								i.name,
								e.uid,
								e.slug
							].filter(Boolean).join("__"),
							fieldName: i.name,
							fieldLabel: c,
							fileTitle: e.title || e.name || c,
							thumbSrc: s,
							file: e,
							tagOptions: l,
							presets: n
						});
					}
				}
			}
			return r;
		},
		selectedGalleryEntry() {
			return this.selectedImageId && this.imageGalleryEntries.find((e) => e.id === this.selectedImageId) || null;
		},
		modalResolvedSrc() {
			let e = this.selectedGalleryEntry;
			if (e && e.presets.length) {
				let t = e.presets.find((e) => e.key === this.selectedPresetKey) || e.presets[0];
				if (t && t.src) return t.src;
			}
			return (this.manualImageUrl || "").trim() || (this.imageModalMode === "edit" && this.editOriginalSrc ? this.editOriginalSrc : "");
		},
		canConfirmImageModal() {
			return !!this.modalResolvedSrc;
		},
		headingLevels() {
			return [
				1,
				2,
				3,
				4,
				5
			];
		},
		headingDropdownLabel() {
			if (!this.editor) return this.translate("Paragraph");
			for (let e of this.headingLevels) if (this.editor.isActive("heading", { level: e })) return `H${e}`;
			return this.translate("Paragraph");
		},
		listDropdownLabel() {
			return this.editor ? this.editor.isActive("bulletList") ? this.translate("Bullet list") : this.editor.isActive("orderedList") ? this.translate("Numbered list") : this.editor.isActive("blockquote") ? this.translate("Quote") : this.translate("List") : this.translate("List");
		},
		alignDropdownLabel() {
			if (!this.editor) return this.translate("Alignment");
			let e = [
				"left",
				"center",
				"right",
				"justify"
			], t = {
				left: "Align left",
				center: "Align center",
				right: "Align right",
				justify: "Align justify"
			};
			for (let n of e) if (this.editor.isActive({ textAlign: n })) return this.translate(t[n]);
			return this.translate("Alignment");
		},
		blockMarginCurrent() {
			if (!this.editor) return null;
			let e = this.editor.state.selection;
			return e instanceof U && e.node.type.name === "image" ? e.node.attrs.marginClass || null : this.editor.isActive("blockquote") ? this.editor.getAttributes("blockquote").marginClass || null : this.editor.isActive("heading") ? this.editor.getAttributes("heading").marginClass || null : this.editor.getAttributes("paragraph").marginClass || null;
		},
		blockMarginActive() {
			return !!this.blockMarginCurrent;
		},
		textColorDropdownLabel() {
			if (!this.editor) return this.translate("Text color");
			for (let e of this.textColorVariants) if (this.editor.isActive("textColor", { variant: e })) return `text-${e}`;
			return this.translate("Text color");
		},
		bgColorDropdownLabel() {
			if (!this.editor) return this.translate("Background");
			for (let e of this.bgVariants) if (this.editor.isActive("backgroundColor", { variant: e })) return `bg-${e}`;
			return this.translate("Background");
		},
		marginDropdownLabel() {
			return this.blockMarginCurrent || this.translate("Margin");
		},
		blockPaddingCurrent() {
			if (!this.editor) return null;
			let e = this.editor.state.selection;
			return e instanceof U && e.node.type.name === "image" ? e.node.attrs.paddingClass || null : this.editor.isActive("blockquote") ? this.editor.getAttributes("blockquote").paddingClass || null : this.editor.isActive("heading") ? this.editor.getAttributes("heading").paddingClass || null : this.editor.getAttributes("paragraph").paddingClass || null;
		},
		blockFloatCurrent() {
			if (!this.editor) return null;
			let e = this.editor.state.selection;
			return e instanceof U && e.node.type.name === "image" ? e.node.attrs.floatClass || null : this.editor.isActive("blockquote") ? this.editor.getAttributes("blockquote").floatClass || null : this.editor.isActive("heading") ? this.editor.getAttributes("heading").floatClass || null : this.editor.getAttributes("paragraph").floatClass || null;
		},
		blockFloatActive() {
			return !!this.blockFloatCurrent;
		},
		floatDropdownLabel() {
			return this.blockFloatCurrent || this.translate("Float");
		},
		blockPaddingActive() {
			return !!this.blockPaddingCurrent;
		},
		paddingDropdownLabel() {
			return this.blockPaddingCurrent || this.translate("Padding");
		},
		alertVariantDropdownLabel() {
			if (!this.editor) return this.translate("Alert style");
			let e = this.editor.getAttributes("blockquote").variant;
			return e ? `alert-${e}` : this.translate("Alert style");
		},
		linkStyleDropdownLabel() {
			if (!this.editor) return this.translate("Link style");
			let e = this.editor.getAttributes("link").class;
			return e ? String(e).split(/\s+/).slice(0, 2).join(" ") : this.translate("Link style");
		},
		linkHasButtonClass() {
			return this.editor ? !!this.editor.getAttributes("link").class : !1;
		}
	},
	mounted() {
		this.createEditor((this.modelValue || "").trim());
	},
	beforeUnmount() {
		this.editor?.destroy(), this.editor = null, this.selectedImagePos = null;
	},
	watch: {
		modelValue(e) {
			if (!this.editor) return;
			let t = (e || "").trim();
			t !== Qk(this.editor.getHTML()) && this.editor.commands.setContent(t || "<p></p>", !1);
		},
		placeholderText() {
			this.recreateEditor();
		},
		imageGalleryEntries() {
			this.selectedImageId && !this.imageGalleryEntries.some((e) => e.id === this.selectedImageId) && (this.selectedImageId = null);
		}
	},
	methods: {
		translate(e, t, n) {
			return tl(e, this.formSettings && this.formSettings.translate, t, n ?? (this.formSettings && this.formSettings.language));
		},
		setHeadingLevel(e) {
			this.editor && (e == null ? this.editor.chain().focus().setParagraph().run() : this.editor.chain().focus().setHeading({ level: e }).run());
		},
		toggleListType(e) {
			this.editor && (e === "bullet" ? this.editor.chain().focus().toggleBulletList().run() : e === "ordered" ? this.editor.chain().focus().toggleOrderedList().run() : e === "blockquote" && this.editor.chain().focus().toggleBlockquote().run());
		},
		setTextAlignValue(e) {
			this.editor && this.editor.chain().focus().setTextAlign(e).run();
		},
		setTextColorMark(e) {
			this.editor && (e == null || e === "" ? this.editor.chain().focus().unsetTextColor().run() : this.editor.chain().focus().setTextColor(e).run());
		},
		setBackgroundColorMark(e) {
			this.editor && (e == null || e === "" ? this.editor.chain().focus().unsetBackgroundColor().run() : this.editor.chain().focus().setBackgroundColor(e).run());
		},
		setBlockMarginCls(e) {
			this.editor && (e ? this.editor.chain().focus().setBlockMarginClass(e).run() : this.editor.chain().focus().unsetBlockMarginClass().run());
		},
		blockMarginIs(e) {
			return this.blockMarginCurrent === e;
		},
		setBlockPaddingCls(e) {
			this.editor && (e ? this.editor.chain().focus().setBlockPaddingClass(e).run() : this.editor.chain().focus().unsetBlockPaddingClass().run());
		},
		blockPaddingIs(e) {
			return this.blockPaddingCurrent === e;
		},
		setBlockFloatCls(e) {
			this.editor && (e ? this.editor.chain().focus().setBlockFloatClass(e).run() : this.editor.chain().focus().unsetBlockFloatClass().run());
		},
		blockFloatIs(e) {
			return this.blockFloatCurrent === e;
		},
		imageHasUtilityClass(e) {
			return (this.imageEditForm.imgClass || "").split(/\s+/).filter(Boolean).includes(e);
		},
		toggleImageUtilityClass(e) {
			let t = new Set((this.imageEditForm.imgClass || "").split(/\s+/).filter(Boolean));
			t.has(e) ? t.delete(e) : t.add(e);
			let n = this.imgUtilityClasses.filter((e) => t.has(e));
			this.imageEditForm = {
				...this.imageEditForm,
				imgClass: n.join(" ")
			};
		},
		setAlertVariant(e) {
			this.editor && this.editor.isActive("blockquote") && this.editor.chain().focus().updateAttributes("blockquote", { variant: e }).run();
		},
		setLinkButtonClass(e) {
			this.editor && this.editor.isActive("link") && this.editor.chain().focus().extendMarkRange("link").updateAttributes({ class: e || null }).run();
		},
		linkClassIs(e) {
			return this.editor ? this.editor.getAttributes("link").class === e : !1;
		},
		findGalleryMatchForSrc(e) {
			if (!e || typeof e != "string") return null;
			for (let t of this.imageGalleryEntries) for (let n of t.presets) if (n.src === e) return {
				entry: t,
				presetKey: n.key
			};
			return null;
		},
		getImageAttrsFromForm() {
			let e = parseInt(String(this.imageEditForm.width).trim(), 10), t = parseInt(String(this.imageEditForm.height).trim(), 10), n = String(this.imageEditForm.alt || "").trim(), r = String(this.imageEditForm.imgClass || "").trim();
			return {
				alt: n || null,
				title: n || null,
				width: Number.isFinite(e) && e > 0 ? e : null,
				height: Number.isFinite(t) && t > 0 ? t : null,
				imgClass: r || null
			};
		},
		getImageSelectionPos(e) {
			let t = e.selection;
			return t instanceof U && t.node.type.name === "image" ? t.from : null;
		},
		syncSelectedImageFromEditor() {
			if (!this.editor) return;
			let e = this.getImageSelectionPos(this.editor.state);
			e !== this.selectedImagePos && (this.selectedImagePos = e);
			let t = this.editor.state.selection, n = t instanceof U && t.node.type.name === "videoEmbed" ? t.from : null;
			n !== this.selectedVideoPos && (this.selectedVideoPos = n);
		},
		videoPosFromEvent(e, t) {
			let n = t.target;
			if (!e.editable || !(n instanceof Element)) return null;
			let r = n.closest(".tiptap-video-embed");
			if (!r || !e.dom.contains(r)) return null;
			let i = e.posAtDOM(r, 0);
			if (i == null || i < 0) return null;
			let a = e.state.doc.nodeAt(i);
			return a && a.type.name === "videoEmbed" ? i : null;
		},
		applyImageAttrsAt(e) {
			if (!this.editor || e == null) return;
			let t = this.getImageAttrsFromForm();
			this.editor.chain().focus().setNodeSelection(e).updateAttributes("image", t).run();
		},
		deleteSelectedImageAt(e) {
			this.editor && e != null && (this.editor.chain().focus().setNodeSelection(e).deleteSelection().run(), this.selectedImagePos === e && (this.selectedImagePos = null));
		},
		createEditor(e) {
			let t = e || "<p></p>", n = [
				zO.configure({
					heading: { levels: [
						1,
						2,
						3,
						4,
						5
					] },
					codeBlock: !1,
					horizontalRule: !0,
					bold: !1,
					italic: !1,
					strike: !1,
					underline: !1,
					blockquote: !1,
					link: !1
				}),
				FE.configure({
					openOnClick: !1,
					autolink: !0,
					defaultProtocol: "https",
					HTMLAttributes: {
						target: "_blank",
						rel: "noopener noreferrer nofollow",
						class: null
					}
				}),
				sk,
				ck,
				lk,
				uk,
				dk,
				ok.configure({
					types: [
						"heading",
						"paragraph",
						"blockquote"
					],
					alignments: [
						"left",
						"center",
						"right",
						"justify"
					]
				}),
				fk,
				pk,
				mk.configure({ types: [
					"paragraph",
					"heading",
					"blockquote",
					"image"
				] }),
				hk.configure({ types: [
					"paragraph",
					"heading",
					"blockquote",
					"image"
				] }),
				gk.configure({ types: [
					"paragraph",
					"heading",
					"blockquote",
					"image"
				] }),
				ak.configure({
					inline: !1,
					allowBase64: !0
				})
			];
			this.videoEnabled && n.push(qk.configure({ allowedHosts: this.videoAllowedHosts })), this.placeholderText && n.push(BO.configure({
				placeholder: this.placeholderText,
				showOnlyWhenEditable: !0,
				showOnlyCurrent: !1
			})), this.editor = new DC({
				content: t,
				extensions: this.resolveExtensions(n),
				editorProps: {
					attributes: {
						class: "tiptap-editor form-control",
						spellcheck: "true"
					},
					handleDOMEvents: {
						click: (e, t) => {
							let n = this.videoPosFromEvent(e, t);
							if (n != null) return e.dispatch(e.state.tr.setSelection(U.create(e.state.doc, n))), e.focus(), !0;
							let r = t.target;
							if (!e.editable || !(r instanceof Element) || r.tagName !== "IMG") return !1;
							let i = e.dom.querySelector?.(".ProseMirror");
							if (!i || !i.contains(r)) return !1;
							let a = e.posAtDOM(r, 0);
							if (a == null || a < 0) return !1;
							let o = e.state.doc.nodeAt(a);
							return !o || o.type.name !== "image" ? !1 : (e.dispatch(e.state.tr.setSelection(U.create(e.state.doc, a))), e.focus(), !0);
						},
						dblclick: (e, t) => {
							let n = this.videoPosFromEvent(e, t);
							if (n != null) return e.dispatch(e.state.tr.setSelection(U.create(e.state.doc, n))), e.focus(), this.openVideoModal("edit", n), !0;
							let r = t.target;
							if (!e.editable || !(r instanceof Element) || r.tagName !== "IMG") return !1;
							let i = e.dom.querySelector?.(".ProseMirror");
							if (!i || !i.contains(r)) return !1;
							let a = e.posAtDOM(r, 0);
							if (a == null || a < 0) return !1;
							let o = e.state.doc.nodeAt(a);
							return !o || o.type.name !== "image" ? !1 : (e.dispatch(e.state.tr.setSelection(U.create(e.state.doc, a))), e.focus(), this.openImageModal("edit", a), !0);
						}
					}
				},
				onUpdate: () => {
					let e = Qk(this.editor.getHTML());
					this.$emit("update:modelValue", e);
				},
				onSelectionUpdate: () => {
					this.syncSelectedImageFromEditor(), this.$forceUpdate();
				},
				onTransaction: () => {
					this.syncSelectedImageFromEditor(), this.$forceUpdate();
				}
			});
		},
		resolveExtensions(e) {
			let t = this.tiptapOptions && this.tiptapOptions.extensions;
			if (typeof t == "function") {
				let n = t(e, { editor: this });
				return Array.isArray(n) ? n : e;
			}
			return Array.isArray(t) && t.length ? [...e, ...t.filter(Boolean)] : e;
		},
		runCustomToolbarButton(e) {
			this.editor && e.run(this.editor, this);
		},
		openVideoModalFromToolbar() {
			this.selectedVideoPos === null ? this.openVideoModal("insert") : this.openVideoModal("edit", this.selectedVideoPos);
		},
		openVideoModal(e, t) {
			if (this.htmlSourceModalOpen && this.closeHtmlSourceModal(), this.imageModalOpen && this.closeImageModal(), this.videoModalMode = e === "edit" ? "edit" : "insert", this.editingVideoPos = this.videoModalMode === "edit" && t != null ? t : null, this.videoForm = Yk(), this.videoModalMode === "edit" && this.editingVideoPos != null && this.editor) {
				let e = this.editor.state.doc.nodeAt(this.editingVideoPos);
				if (!e || e.type.name !== "videoEmbed") {
					this.closeVideoModal();
					return;
				}
				let t = e.attrs;
				this.videoForm = {
					url: t.src || "",
					...this.videoSizeToForm(t.width, t.height),
					ratio: t.ratio || "",
					allowfullscreen: !!t.allowfullscreen,
					title: t.title || ""
				};
			}
			this.videoModalOpen = !0, this.$nextTick(() => {
				let e = this.$refs.videoUrlInput;
				e && typeof e.focus == "function" && e.focus();
			});
		},
		videoSizeToForm(e, t) {
			let n = Ak(e, "width"), r = Ak(t, "height");
			return {
				width: n.value,
				widthUnit: n.unit,
				height: r.value,
				heightUnit: r.unit
			};
		},
		applyVideoSizePreset(e) {
			this.videoForm = {
				...this.videoForm,
				...this.videoSizeToForm(e.width, e.height)
			};
		},
		videoSizePresetActive(e) {
			let t = this.videoAttrsFromForm();
			return t.width === kk(e.width, "width") && t.height === kk(e.height, "height");
		},
		videoRatioClass(e) {
			return Dk(e);
		},
		videoRatioLabel(e) {
			let t = Ck.find((t) => t.value === e);
			if (!t) return String(e || "").replace("x", ":");
			let n = this.translate(t.phone ? "portrait phone" : t.orientation);
			return `${t.label} · ${n}`;
		},
		closeVideoModal() {
			this.videoModalOpen = !1, this.videoModalMode = "insert", this.editingVideoPos = null, this.videoForm = Yk();
		},
		videoAttrsFromForm() {
			let e = this.videoForm, t = kk(e.width === "" ? null : `${e.width}${e.widthUnit}`, "width"), n = kk(e.height === "" ? null : `${e.height}${e.heightUnit}`, "height"), r = String(this.videoForm.title || "").trim();
			return {
				src: this.videoResolvedSrc,
				width: t,
				height: n,
				ratio: this.videoEffectiveRatio,
				allowfullscreen: !!this.videoForm.allowfullscreen,
				title: r || null
			};
		},
		confirmVideoModal() {
			if (!this.editor || !this.videoResolvedSrc) return;
			let e = this.videoAttrsFromForm();
			this.videoModalMode === "edit" && this.editingVideoPos != null ? this.editor.chain().focus().setNodeSelection(this.editingVideoPos).updateAttributes("videoEmbed", e).run() : this.editor.chain().focus().setVideoEmbed(e).run(), this.closeVideoModal();
		},
		deleteVideoFromModal() {
			this.editor && this.editingVideoPos != null && (this.editor.chain().focus().setNodeSelection(this.editingVideoPos).deleteSelection().run(), this.closeVideoModal());
		},
		recreateEditor() {
			let e = this.editor ? this.editor.getHTML() : this.modelValue || "";
			this.editor?.destroy(), this.editor = null, this.selectedImagePos = null, this.selectedVideoPos = null, this.imageEditForm = {
				alt: "",
				width: "",
				height: "",
				imgClass: ""
			}, this.$nextTick(() => {
				this.createEditor(Qk(e));
			});
		},
		openImageModalFromToolbar() {
			this.selectedImagePos === null ? this.openImageModal("insert") : this.openImageModal("edit", this.selectedImagePos);
		},
		openHtmlSourceModal() {
			this.editor && (this.imageModalOpen && this.closeImageModal(), this.htmlSourceText = this.editor.getHTML(), this.htmlSourceModalOpen = !0, this.$nextTick(() => {
				let e = this.$refs.htmlSourceTextarea;
				e && typeof e.focus == "function" && e.focus();
			}));
		},
		closeHtmlSourceModal() {
			this.htmlSourceModalOpen = !1, this.htmlSourceText = "";
		},
		applyHtmlSource() {
			if (!this.editor) return;
			let e = (this.htmlSourceText || "").trim();
			this.editor.commands.setContent(e || "<p></p>", !1);
			let t = Qk(this.editor.getHTML());
			this.$emit("update:modelValue", t), this.closeHtmlSourceModal(), this.editor.chain().focus().run();
		},
		toggleLink() {
			if (!this.editor) return;
			let e = this.editor.getAttributes("link").href, t = window.prompt(this.translate("Link URL:"), e || "https://");
			t !== null && (t === "" ? this.editor.chain().focus().extendMarkRange("link").unsetLink().run() : this.editor.chain().focus().extendMarkRange("link").setLink({ href: t }).run());
		},
		openImageModal(e, t) {
			if (this.htmlSourceModalOpen && this.closeHtmlSourceModal(), this.imageModalMode = e === "edit" ? "edit" : "insert", this.editingImagePos = e === "edit" && t != null ? t : null, this.imageModalMode === "edit" && this.editingImagePos != null && this.editor) {
				let e = this.editor.state.doc.nodeAt(this.editingImagePos);
				if (!e || e.type.name !== "image") {
					this.closeImageModal();
					return;
				}
				let t = e.attrs.src || "";
				this.editOriginalSrc = t, this.manualImageUrl = t.length > 2e3 && t.startsWith("data:") ? "" : t;
				let n = this.findGalleryMatchForSrc(t), r = e.attrs.alt && String(e.attrs.alt).trim() || "", i = n ? eA(n.entry.file, n.entry.tagOptions) : "";
				this.imageEditForm = {
					alt: r || i,
					width: e.attrs.width == null ? "" : String(e.attrs.width),
					height: e.attrs.height == null ? "" : String(e.attrs.height),
					imgClass: e.attrs.imgClass ? String(e.attrs.imgClass) : ""
				}, n ? (this.selectedImageId = n.entry.id, this.selectedPresetKey = n.presetKey) : (this.selectedImageId = null, this.selectedPresetKey = "default");
			} else this.editOriginalSrc = "", this.manualImageUrl = "", this.imageEditForm = {
				alt: "",
				width: "",
				height: "",
				imgClass: ""
			}, this.selectedImageId = null, this.selectedPresetKey = "default", this.imageGalleryEntries.length && this.selectGalleryEntry(this.imageGalleryEntries[0]);
			this.imageModalOpen = !0;
		},
		closeImageModal() {
			this.imageModalOpen = !1, this.imageModalMode = "insert", this.editingImagePos = null, this.editOriginalSrc = "", this.manualImageUrl = "";
		},
		syncManualFromPreset() {
			let e = this.selectedGalleryEntry;
			if (!e) return;
			let t = e.presets.find((e) => e.key === this.selectedPresetKey) || e.presets[0];
			t && t.src && (!t.src.startsWith("data:") || t.src.length < 4e3) && (this.manualImageUrl = t.src);
		},
		selectGalleryEntry(e) {
			this.selectedImageId = e.id;
			let t = e.presets.some((e) => e.key === "default");
			this.selectedPresetKey = t ? "default" : e.presets[0].key, this.syncManualFromPreset();
			let n = eA(e.file, e.tagOptions);
			this.imageEditForm = {
				...this.imageEditForm,
				alt: n
			};
		},
		confirmImageModalPrimary() {
			let e = this.modalResolvedSrc;
			if (!this.editor || !e) return;
			if (this.imageModalMode === "edit" && this.editingImagePos != null) {
				let t = {
					...this.getImageAttrsFromForm(),
					src: e
				};
				this.editor.chain().focus().setNodeSelection(this.editingImagePos).updateAttributes("image", t).run(), this.closeImageModal();
				return;
			}
			let t = {
				...this.getImageAttrsFromForm(),
				src: e
			};
			this.editor.chain().focus().setImage(t).run(), this.closeImageModal();
		},
		insertFromModalUrlOnly() {
			let e = (this.manualImageUrl || "").trim();
			if (!this.editor || !e) return;
			let t = {
				...this.getImageAttrsFromForm(),
				src: e
			};
			this.editor.chain().focus().setImage(t).run(), this.closeImageModal();
		},
		deleteImageFromModal() {
			this.editor && this.editingImagePos != null && (this.deleteSelectedImageAt(this.editingImagePos), this.closeImageModal());
		}
	}
}, nA = {
	key: 0,
	class: "tiptap-toolbar btn-toolbar flex-wrap gap-1 mb-1",
	role: "toolbar"
}, rA = { class: "btn-group btn-group-sm" }, iA = ["title"], aA = ["title"], oA = ["title"], sA = ["title"], cA = { class: "btn-group btn-group-sm" }, lA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, uA = { class: "dropdown-menu dropdown-menu-end" }, dA = ["onClick"], fA = { class: "btn-group btn-group-sm" }, pA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, mA = { class: "dropdown-menu dropdown-menu-end" }, hA = { class: "btn-group btn-group-sm" }, gA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, _A = { class: "dropdown-menu dropdown-menu-end" }, vA = { class: "btn-group btn-group-sm" }, yA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, bA = { class: "dropdown-menu dropdown-menu-end" }, xA = ["onClick"], SA = { class: "btn-group btn-group-sm" }, CA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, wA = { class: "dropdown-menu dropdown-menu-end" }, TA = ["onClick"], EA = { class: "btn-group btn-group-sm" }, DA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, OA = { class: "dropdown-menu dropdown-menu-end" }, kA = ["onClick"], AA = { class: "btn-group btn-group-sm" }, jA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, MA = { class: "dropdown-menu dropdown-menu-end" }, NA = ["onClick"], PA = { class: "btn-group btn-group-sm" }, FA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, IA = { class: "dropdown-menu dropdown-menu-end" }, LA = ["onClick"], RA = {
	key: 0,
	class: "btn-group btn-group-sm"
}, zA = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, BA = { class: "dropdown-menu dropdown-menu-end" }, VA = ["onClick"], HA = {
	class: "btn-group btn-group-sm",
	role: "group"
}, UA = ["title"], WA = ["title"], GA = ["disabled"], KA = { class: "dropdown-menu dropdown-menu-end" }, qA = { class: "btn-group btn-group-sm" }, JA = ["title"], YA = ["title"], XA = {
	key: 1,
	class: "btn-group btn-group-sm"
}, ZA = [
	"title",
	"onClick",
	"innerHTML"
], QA = { class: "btn-group btn-group-sm" }, $A = ["title"], ej = { class: "btn-group btn-group-sm" }, tj = ["title"], nj = ["title"], rj = { class: "tiptap-modal-header" }, ij = { class: "mb-0" }, aj = ["aria-label"], oj = { class: "tiptap-modal-body" }, sj = { class: "row g-2 mb-3" }, cj = { class: "col-12 col-md-5" }, lj = { class: "form-label small text-secondary mb-0" }, uj = ["placeholder"], dj = { class: "col-6 col-md-3" }, fj = { class: "form-label small text-secondary mb-0" }, pj = ["placeholder"], mj = { class: "col-6 col-md-3" }, hj = { class: "form-label small text-secondary mb-0" }, gj = ["placeholder"], _j = { class: "col-12 mt-2" }, vj = { class: "form-label small text-secondary mb-1" }, yj = { class: "d-flex flex-wrap gap-2 align-items-center" }, bj = [
	"id",
	"checked",
	"onChange"
], xj = ["for"], Sj = {
	key: 0,
	class: "text-secondary small mb-3"
}, Cj = {
	key: 1,
	class: "text-secondary small mb-2"
}, wj = {
	key: 2,
	class: "row g-2 mb-3"
}, Tj = ["onClick"], Ej = ["src", "alt"], Dj = ["title"], Oj = {
	class: "text-muted",
	style: { "font-size": "0.7rem" }
}, kj = {
	key: 3,
	class: "mb-3"
}, Aj = { class: "form-label small text-secondary mb-1" }, jj = { class: "d-flex flex-wrap gap-1" }, Mj = ["onClick"], Nj = { class: "border-top pt-3 mt-1" }, Pj = { class: "form-label small text-secondary" }, Fj = { class: "input-group input-group-sm" }, Ij = ["placeholder"], Lj = { class: "tiptap-modal-footer" }, Rj = ["disabled"], zj = { class: "tiptap-modal-header" }, Bj = { class: "mb-0" }, Vj = ["aria-label"], Hj = { class: "tiptap-modal-body" }, Uj = { class: "form-label small text-secondary mb-0" }, Wj = { class: "form-text" }, Gj = {
	key: 0,
	class: "text-danger small mt-1"
}, Kj = { class: "row g-2 mt-1" }, qj = { class: "col-12 col-md-4" }, Jj = { class: "form-label small text-secondary mb-0" }, Yj = { value: "auto" }, Xj = ["label"], Zj = ["value"], Qj = { value: "" }, $j = { class: "col-6 col-md-4" }, eM = { class: "form-label small text-secondary mb-0" }, tM = { class: "input-group input-group-sm" }, nM = ["placeholder"], rM = ["value"], iM = { class: "col-6 col-md-4" }, aM = { class: "form-label small text-secondary mb-0" }, oM = { class: "input-group input-group-sm" }, sM = ["placeholder"], cM = ["value"], lM = { class: "col-12" }, uM = { class: "d-flex flex-wrap gap-1 align-items-center" }, dM = { class: "small text-secondary me-1" }, fM = ["title", "onClick"], pM = { class: "form-text mt-1" }, mM = { class: "col-12 col-md-8" }, hM = { class: "form-label small text-secondary mb-0" }, gM = ["placeholder"], _M = { class: "col-12 col-md-4 d-flex align-items-end" }, vM = { class: "form-check mb-1" }, yM = {
	class: "form-check-label small",
	for: "tiptap-video-fs"
}, bM = {
	key: 1,
	class: "border-top pt-3 mt-3"
}, xM = ["title"], SM = ["src"], CM = { class: "tiptap-modal-footer" }, wM = ["disabled"], TM = { class: "tiptap-modal-header" }, EM = { class: "mb-0" }, DM = ["aria-label"], OM = { class: "tiptap-modal-body" }, kM = { class: "tiptap-modal-footer" };
function AM(t, o, s, c, l, u) {
	let d = b("editor-content");
	return _(), i("div", { class: m(["tiptap-html-editor", [t.$attrs.class]]) }, [
		t.editor ? (_(), i("div", nA, [
			a("span", rA, [
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("bold") }]),
					title: t.translate("Bold"),
					onClick: o[0] ||= (e) => t.editor.chain().focus().toggleBold().run()
				}, "B", 10, iA),
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("italic") }]),
					title: t.translate("Italic"),
					onClick: o[1] ||= (e) => t.editor.chain().focus().toggleItalic().run()
				}, [...o[63] ||= [a("i", null, "I", -1)]], 10, aA),
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("underline") }]),
					title: t.translate("Underline"),
					onClick: o[2] ||= (e) => t.editor.chain().focus().toggleUnderline().run()
				}, [...o[64] ||= [a("u", null, "U", -1)]], 10, oA),
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("strike") }]),
					title: t.translate("Strikethrough"),
					onClick: o[3] ||= (e) => t.editor.chain().focus().toggleStrike().run()
				}, [...o[65] ||= [a("s", null, "S", -1)]], 10, sA)
			]),
			a("div", cA, [a("button", lA, x(t.headingDropdownLabel), 1), a("ul", uA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.editor.isActive("heading") }]),
					onClick: o[4] ||= (e) => t.setHeadingLevel(null)
				}, x(t.translate("Normal text")), 3)]),
				o[66] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.headingLevels, (e) => (_(), i("li", { key: e }, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("heading", { level: e }) }]),
					onClick: (n) => t.setHeadingLevel(e)
				}, " H" + x(e), 11, dA)]))), 128))
			])]),
			a("div", fA, [a("button", pA, x(t.listDropdownLabel), 1), a("ul", mA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("bulletList") }]),
					onClick: o[5] ||= (e) => t.toggleListType("bullet")
				}, x(t.translate("Bullet list")), 3)]),
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("orderedList") }]),
					onClick: o[6] ||= (e) => t.toggleListType("ordered")
				}, x(t.translate("Numbered list")), 3)]),
				o[67] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("blockquote") }]),
					onClick: o[7] ||= (e) => t.toggleListType("blockquote")
				}, x(t.translate("Quote")), 3)])
			])]),
			a("div", hA, [a("button", gA, x(t.alignDropdownLabel), 1), a("ul", _A, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive({ textAlign: "left" }) }]),
					onClick: o[8] ||= (e) => t.setTextAlignValue("left")
				}, x(t.translate("Align left")), 3)]),
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive({ textAlign: "center" }) }]),
					onClick: o[9] ||= (e) => t.setTextAlignValue("center")
				}, x(t.translate("Align center")), 3)]),
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive({ textAlign: "right" }) }]),
					onClick: o[10] ||= (e) => t.setTextAlignValue("right")
				}, x(t.translate("Align right")), 3)]),
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive({ textAlign: "justify" }) }]),
					onClick: o[11] ||= (e) => t.setTextAlignValue("justify")
				}, x(t.translate("Align justify")), 3)])
			])]),
			a("div", vA, [a("button", yA, x(t.textColorDropdownLabel), 1), a("ul", bA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.editor.isActive("textColor") }]),
					onClick: o[12] ||= (e) => t.setTextColorMark(null)
				}, x(t.translate("Default")), 3)]),
				o[68] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.textColorVariants, (e) => (_(), i("li", { key: "tc-" + e }, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("textColor", { variant: e }) }]),
					onClick: (n) => t.setTextColorMark(e)
				}, " text-" + x(e), 11, xA)]))), 128))
			])]),
			a("div", SA, [a("button", CA, x(t.bgColorDropdownLabel), 1), a("ul", wA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.editor.isActive("backgroundColor") }]),
					onClick: o[13] ||= (e) => t.setBackgroundColorMark(null)
				}, x(t.translate("Default")), 3)]),
				o[69] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.bgVariants, (e) => (_(), i("li", { key: "bg-" + e }, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("backgroundColor", { variant: e }) }]),
					onClick: (n) => t.setBackgroundColorMark(e)
				}, " bg-" + x(e), 11, TA)]))), 128))
			])]),
			a("div", EA, [a("button", DA, x(t.marginDropdownLabel), 1), a("ul", OA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.blockMarginActive }]),
					onClick: o[14] ||= (e) => t.setBlockMarginCls("")
				}, x(t.translate("Default")), 3)]),
				o[70] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.marginClasses, (e) => (_(), i("li", { key: "mg-" + (e || "none") }, [e ? (_(), i("button", {
					key: 0,
					type: "button",
					class: m(["dropdown-item font-monospace small", { active: t.blockMarginIs(e) }]),
					onClick: (n) => t.setBlockMarginCls(e)
				}, x(e), 11, kA)) : r("", !0)]))), 128))
			])]),
			a("div", AA, [a("button", jA, x(t.paddingDropdownLabel), 1), a("ul", MA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.blockPaddingActive }]),
					onClick: o[15] ||= (e) => t.setBlockPaddingCls("")
				}, x(t.translate("Default")), 3)]),
				o[71] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.paddingClasses, (e) => (_(), i("li", { key: "pd-" + (e || "none") }, [e ? (_(), i("button", {
					key: 0,
					type: "button",
					class: m(["dropdown-item font-monospace small", { active: t.blockPaddingIs(e) }]),
					onClick: (n) => t.setBlockPaddingCls(e)
				}, x(e), 11, NA)) : r("", !0)]))), 128))
			])]),
			a("div", PA, [a("button", FA, x(t.floatDropdownLabel), 1), a("ul", IA, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.blockFloatActive }]),
					onClick: o[16] ||= (e) => t.setBlockFloatCls("")
				}, x(t.translate("Default")), 3)]),
				o[72] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.floatClasses, (e) => (_(), i("li", { key: "fl-" + e }, [a("button", {
					type: "button",
					class: m(["dropdown-item font-monospace small", { active: t.blockFloatIs(e) }]),
					onClick: (n) => t.setBlockFloatCls(e)
				}, x(e), 11, LA)]))), 128))
			])]),
			t.editor.isActive("blockquote") ? (_(), i("div", RA, [a("button", zA, x(t.alertVariantDropdownLabel), 1), a("ul", BA, [(_(!0), i(e, null, y(t.alertVariants, (e) => (_(), i("li", { key: "al-" + e }, [a("button", {
				type: "button",
				class: m(["dropdown-item", { active: t.editor.isActive("blockquote", { variant: e }) }]),
				onClick: (n) => t.setAlertVariant(e)
			}, " alert-" + x(e), 11, VA)]))), 128))])])) : r("", !0),
			a("div", HA, [
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary",
					title: t.translate("Link"),
					onClick: o[17] ||= (...e) => t.toggleLink && t.toggleLink(...e)
				}, "🔗", 8, UA),
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary",
					title: t.translate("Remove link"),
					onClick: o[18] ||= (e) => t.editor.chain().focus().unsetLink().run()
				}, "✕", 8, WA),
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary dropdown-toggle",
					"data-bs-toggle": "dropdown",
					"data-bs-auto-close": "true",
					"aria-expanded": "false",
					disabled: !t.editor.isActive("link")
				}, x(t.linkStyleDropdownLabel), 9, GA),
				a("ul", KA, [
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item", { active: !t.linkHasButtonClass }]),
						onClick: o[19] ||= (e) => t.setLinkButtonClass(null)
					}, x(t.translate("Default")), 3)]),
					o[73] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item font-monospace small", { active: t.linkClassIs("btn btn-primary btn-sm") }]),
						onClick: o[20] ||= (e) => t.setLinkButtonClass("btn btn-primary btn-sm")
					}, "btn-primary", 2)]),
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item font-monospace small", { active: t.linkClassIs("btn btn-outline-primary btn-sm") }]),
						onClick: o[21] ||= (e) => t.setLinkButtonClass("btn btn-outline-primary btn-sm")
					}, "btn-outline-primary", 2)]),
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item font-monospace small", { active: t.linkClassIs("btn btn-secondary btn-sm") }]),
						onClick: o[22] ||= (e) => t.setLinkButtonClass("btn btn-secondary btn-sm")
					}, "btn-secondary", 2)]),
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item font-monospace small", { active: t.linkClassIs("btn btn-outline-secondary btn-sm") }]),
						onClick: o[23] ||= (e) => t.setLinkButtonClass("btn btn-outline-secondary btn-sm")
					}, "btn-outline-secondary", 2)]),
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item font-monospace small", { active: t.linkClassIs("btn btn-danger btn-sm") }]),
						onClick: o[24] ||= (e) => t.setLinkButtonClass("btn btn-danger btn-sm")
					}, "btn-danger", 2)])
				])
			]),
			a("span", qA, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: t.selectedImagePos === null ? t.translate("Insert image") : t.translate("Edit image"),
				onClick: o[25] ||= (...e) => t.openImageModalFromToolbar && t.openImageModalFromToolbar(...e)
			}, "🖼", 8, JA), t.videoEnabled ? (_(), i("button", {
				key: 0,
				type: "button",
				class: m(["btn btn-sm btn-outline-secondary", { active: t.selectedVideoPos !== null }]),
				title: t.selectedVideoPos === null ? t.translate("Insert video") : t.translate("Edit video"),
				onClick: o[26] ||= (...e) => t.openVideoModalFromToolbar && t.openVideoModalFromToolbar(...e)
			}, "▶", 10, YA)) : r("", !0)]),
			t.customToolbarButtons.length ? (_(), i("span", XA, [(_(!0), i(e, null, y(t.customToolbarButtons, (e, n) => (_(), i("button", {
				key: "ctb-" + n,
				type: "button",
				class: m(["btn btn-sm btn-outline-secondary", [e.class, { active: typeof e.isActive == "function" && e.isActive(t.editor) }]]),
				title: e.title ? t.translate(e.title) : null,
				onClick: (n) => t.runCustomToolbarButton(e),
				innerHTML: e.label
			}, null, 10, ZA))), 128))])) : r("", !0),
			a("span", QA, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary font-monospace small",
				title: t.translate("HTML source"),
				onClick: o[27] ||= (...e) => t.openHtmlSourceModal && t.openHtmlSourceModal(...e)
			}, "HTML", 8, $A)]),
			a("span", ej, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: t.translate("Undo"),
				onClick: o[28] ||= (e) => t.editor.chain().focus().undo().run()
			}, "↶", 8, tj), a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: t.translate("Redo"),
				onClick: o[29] ||= (e) => t.editor.chain().focus().redo().run()
			}, "↷", 8, nj)])
		])) : r("", !0),
		t.editor ? (_(), n(d, {
			key: 1,
			editor: t.editor,
			class: "tiptap-content-wrap"
		}, null, 8, ["editor"])) : r("", !0),
		t.imageModalOpen ? (_(), i("div", {
			key: 2,
			class: "tiptap-modal-overlay",
			onClick: o[41] ||= O((...e) => t.closeImageModal && t.closeImageModal(...e), ["self"])
		}, [a("div", {
			class: "tiptap-modal-content",
			onClick: o[40] ||= O(() => {}, ["stop"])
		}, [
			a("div", rj, [a("h5", ij, x(t.imageModalTitle), 1), a("button", {
				type: "button",
				class: "btn-close",
				"aria-label": t.translate("Close"),
				onClick: o[30] ||= (...e) => t.closeImageModal && t.closeImageModal(...e)
			}, null, 8, aj)]),
			a("div", oj, [
				a("div", sj, [
					a("div", cj, [a("label", lj, x(t.translate("Alt text")), 1), D(a("input", {
						"onUpdate:modelValue": o[31] ||= (e) => t.imageEditForm.alt = e,
						type: "text",
						class: "form-control form-control-sm",
						placeholder: t.translate("Description for the image")
					}, null, 8, uj), [[E, t.imageEditForm.alt]])]),
					a("div", dj, [a("label", fj, x(t.translate("Width (px)")), 1), D(a("input", {
						"onUpdate:modelValue": o[32] ||= (e) => t.imageEditForm.width = e,
						type: "number",
						min: "1",
						class: "form-control form-control-sm",
						placeholder: t.translate("auto")
					}, null, 8, pj), [[E, t.imageEditForm.width]])]),
					a("div", mj, [a("label", hj, x(t.translate("Height (px)")), 1), D(a("input", {
						"onUpdate:modelValue": o[33] ||= (e) => t.imageEditForm.height = e,
						type: "number",
						min: "1",
						class: "form-control form-control-sm",
						placeholder: t.translate("auto")
					}, null, 8, gj), [[E, t.imageEditForm.height]])]),
					a("div", _j, [a("label", vj, x(t.translate("Image Bootstrap classes")), 1), a("div", yj, [(_(!0), i(e, null, y(t.imgUtilityClasses, (e) => (_(), i("div", {
						key: "imgc-" + e,
						class: "form-check form-check-inline mb-0"
					}, [a("input", {
						id: "tiptap-imgcls-" + e,
						class: "form-check-input",
						type: "checkbox",
						checked: t.imageHasUtilityClass(e),
						onChange: (n) => t.toggleImageUtilityClass(e)
					}, null, 40, bj), a("label", {
						class: "form-check-label small font-monospace",
						for: "tiptap-imgcls-" + e
					}, x(e), 9, xj)]))), 128))])])
				]),
				t.imageModalMode === "insert" && !t.imageGalleryEntries.length ? (_(), i("p", Sj, x(t.translate("No images in form fields yet. Upload an image or enter an image URL below.")), 1)) : t.imageModalMode === "edit" && !t.imageGalleryEntries.length ? (_(), i("p", Cj, x(t.translate("No images in form. You can edit the source in the URL field.")), 1)) : r("", !0),
				t.imageGalleryEntries.length ? (_(), i("div", wj, [(_(!0), i(e, null, y(t.imageGalleryEntries, (e) => (_(), i("div", {
					key: e.id,
					class: "col-6 col-md-4 col-lg-3"
				}, [a("button", {
					type: "button",
					class: m(["tiptap-gallery-card w-100 h-100 text-start p-2 border rounded", { "border-primary": t.selectedImageId === e.id }]),
					onClick: (n) => t.selectGalleryEntry(e)
				}, [
					a("img", {
						src: e.thumbSrc,
						class: "img-fluid rounded mb-1",
						style: {
							"max-height": "72px",
							"object-fit": "contain",
							width: "100%"
						},
						alt: e.fileTitle
					}, null, 8, Ej),
					a("div", {
						class: "small text-truncate",
						title: e.fileTitle
					}, x(e.fileTitle), 9, Dj),
					a("div", Oj, x(e.fieldLabel), 1)
				], 10, Tj)]))), 128))])) : r("", !0),
				t.selectedGalleryEntry && t.selectedGalleryEntry.presets.length ? (_(), i("div", kj, [a("label", Aj, x(t.translate("Preset (size / format)")), 1), a("div", jj, [(_(!0), i(e, null, y(t.selectedGalleryEntry.presets, (e) => (_(), i("button", {
					key: e.key,
					type: "button",
					class: m(["btn btn-sm", t.selectedPresetKey === e.key ? "btn-primary" : "btn-outline-secondary"]),
					onClick: (n) => {
						t.selectedPresetKey = e.key, t.syncManualFromPreset();
					}
				}, x(e.key), 11, Mj))), 128))])])) : r("", !0),
				a("div", Nj, [a("label", Pj, x(t.translate("Image URL")), 1), a("div", Fj, [D(a("input", {
					"onUpdate:modelValue": o[34] ||= (e) => t.manualImageUrl = e,
					type: "text",
					class: "form-control font-monospace",
					placeholder: t.translate("https:// or data: URL"),
					onKeydown: o[35] ||= ne(O((...e) => t.confirmImageModalPrimary && t.confirmImageModalPrimary(...e), ["prevent"]), ["enter"])
				}, null, 40, Ij), [[E, t.manualImageUrl]]), t.imageModalMode === "insert" ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-secondary",
					onClick: o[36] ||= (...e) => t.insertFromModalUrlOnly && t.insertFromModalUrlOnly(...e)
				}, x(t.translate("URL only")), 1)) : r("", !0)])])
			]),
			a("div", Lj, [
				t.imageModalMode === "edit" ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-danger me-auto",
					onClick: o[37] ||= (...e) => t.deleteImageFromModal && t.deleteImageFromModal(...e)
				}, x(t.translate("Delete image")), 1)) : r("", !0),
				a("button", {
					type: "button",
					class: "btn btn-secondary",
					onClick: o[38] ||= (...e) => t.closeImageModal && t.closeImageModal(...e)
				}, x(t.translate("Cancel")), 1),
				a("button", {
					type: "button",
					class: "btn btn-primary",
					disabled: !t.canConfirmImageModal,
					onClick: o[39] ||= (...e) => t.confirmImageModalPrimary && t.confirmImageModalPrimary(...e)
				}, x(t.imageModalMode === "edit" ? t.translate("Save") : t.translate("Insert")), 9, Rj)
			])
		])])) : r("", !0),
		t.videoModalOpen ? (_(), i("div", {
			key: 3,
			class: "tiptap-modal-overlay",
			onClick: o[56] ||= O((...e) => t.closeVideoModal && t.closeVideoModal(...e), ["self"])
		}, [a("div", {
			class: "tiptap-modal-content",
			onClick: o[55] ||= O(() => {}, ["stop"])
		}, [
			a("div", zj, [a("h5", Bj, x(t.videoModalMode === "edit" ? t.translate("Edit video") : t.translate("Insert video")), 1), a("button", {
				type: "button",
				class: "btn-close",
				"aria-label": t.translate("Close"),
				onClick: o[42] ||= (...e) => t.closeVideoModal && t.closeVideoModal(...e)
			}, null, 8, Vj)]),
			a("div", Hj, [
				a("label", Uj, x(t.translate("Video URL or embed code")), 1),
				D(a("textarea", {
					ref: "videoUrlInput",
					"onUpdate:modelValue": o[43] ||= (e) => t.videoForm.url = e,
					class: "form-control form-control-sm font-monospace",
					rows: "2",
					spellcheck: "false",
					placeholder: "https://www.youtube.com/watch?v=… / https://vimeo.com/… / https://www.facebook.com/…/videos/…",
					onKeydown: o[44] ||= ne(O((...e) => t.confirmVideoModal && t.confirmVideoModal(...e), ["exact", "prevent"]), ["enter"])
				}, null, 544), [[E, t.videoForm.url]]),
				a("div", Wj, x(t.translate("Supported: YouTube, Vimeo, Facebook")), 1),
				t.videoForm.url.trim() && !t.videoResolvedSrc ? (_(), i("div", Gj, x(t.translate("Unsupported or untrusted video URL.")), 1)) : r("", !0),
				a("div", Kj, [
					a("div", qj, [a("label", Jj, x(t.translate("Aspect ratio")), 1), D(a("select", {
						"onUpdate:modelValue": o[45] ||= (e) => t.videoForm.ratio = e,
						class: "form-select form-select-sm"
					}, [
						a("option", Yj, x(t.translate("Auto")) + x(t.videoForm.ratio === "auto" && t.videoForm.url.trim() ? " (" + t.videoRatioLabel(t.videoEffectiveRatio) + ")" : ""), 1),
						(_(!0), i(e, null, y(t.videoRatioGroups, (n) => (_(), i("optgroup", {
							key: "vrg-" + n.orientation,
							label: t.translate(n.label)
						}, [(_(!0), i(e, null, y(n.options, (e) => (_(), i("option", {
							key: "vr-" + e.value,
							value: e.value
						}, x(t.videoRatioLabel(e.value)), 9, Zj))), 128))], 8, Xj))), 128)),
						a("option", Qj, x(t.translate("Fixed size (no ratio)")), 1)
					], 512), [[T, t.videoForm.ratio]])]),
					a("div", $j, [a("label", eM, x(t.videoEffectiveRatio ? t.translate("Max. width") : t.translate("Width")), 1), a("div", tM, [D(a("input", {
						"onUpdate:modelValue": o[46] ||= (e) => t.videoForm.width = e,
						type: "number",
						min: "1",
						step: "any",
						class: "form-control",
						placeholder: t.translate("auto")
					}, null, 8, nM), [[E, t.videoForm.width]]), D(a("select", {
						"onUpdate:modelValue": o[47] ||= (e) => t.videoForm.widthUnit = e,
						class: "form-select tiptap-unit-select"
					}, [(_(!0), i(e, null, y(t.videoSizeUnits.width, (e) => (_(), i("option", {
						key: "vwu-" + e,
						value: e
					}, x(e), 9, rM))), 128))], 512), [[T, t.videoForm.widthUnit]])])]),
					a("div", iM, [a("label", aM, x(t.videoEffectiveRatio ? t.translate("Max. height") : t.translate("Height")), 1), a("div", oM, [D(a("input", {
						"onUpdate:modelValue": o[48] ||= (e) => t.videoForm.height = e,
						type: "number",
						min: "1",
						step: "any",
						class: "form-control",
						placeholder: t.translate("auto")
					}, null, 8, sM), [[E, t.videoForm.height]]), D(a("select", {
						"onUpdate:modelValue": o[49] ||= (e) => t.videoForm.heightUnit = e,
						class: "form-select tiptap-unit-select"
					}, [(_(!0), i(e, null, y(t.videoSizeUnits.height, (e) => (_(), i("option", {
						key: "vhu-" + e,
						value: e
					}, x(e), 9, cM))), 128))], 512), [[T, t.videoForm.heightUnit]])])]),
					a("div", lM, [a("div", uM, [a("span", dM, x(t.translate("Size presets")) + ":", 1), (_(!0), i(e, null, y(t.videoSizePresets, (e) => (_(), i("button", {
						key: "vsp-" + e.label,
						type: "button",
						class: m(["btn btn-sm", t.videoSizePresetActive(e) ? "btn-primary" : "btn-outline-secondary"]),
						title: e.hint ? t.translate(e.hint) : null,
						onClick: (n) => t.applyVideoSizePreset(e)
					}, x(t.translate(e.label)), 11, fM))), 128))]), a("div", pM, x(t.videoEffectiveRatio ? t.translate("px = fixed, % = of content width, vw / vh = of screen width / height. With both set, the smaller one wins, the ratio is kept and the video never overflows the content.") : t.translate("Fixed size: the iframe gets exactly the given width and height (never wider than the content).")), 1)]),
					a("div", mM, [a("label", hM, x(t.translate("Title")), 1), D(a("input", {
						"onUpdate:modelValue": o[50] ||= (e) => t.videoForm.title = e,
						type: "text",
						class: "form-control form-control-sm",
						placeholder: t.translate("Accessible title of the video")
					}, null, 8, gM), [[E, t.videoForm.title]])]),
					a("div", _M, [a("div", vM, [D(a("input", {
						id: "tiptap-video-fs",
						"onUpdate:modelValue": o[51] ||= (e) => t.videoForm.allowfullscreen = e,
						class: "form-check-input",
						type: "checkbox"
					}, null, 512), [[C, t.videoForm.allowfullscreen]]), a("label", yM, x(t.translate("Allow fullscreen")), 1)])])
				]),
				t.videoResolvedSrc ? (_(), i("div", bM, [a("div", {
					class: "small text-secondary font-monospace text-truncate mb-2",
					title: t.videoResolvedSrc
				}, x(t.videoResolvedSrc), 9, xM), a("div", {
					class: m(["tiptap-video-preview", t.videoEffectiveRatio ? "ratio " + t.videoRatioClass(t.videoEffectiveRatio) : ""]),
					style: h(t.videoPreviewStyle.wrapper)
				}, [a("iframe", {
					src: t.videoResolvedSrc,
					style: h(t.videoPreviewStyle.iframe),
					frameborder: "0",
					loading: "lazy",
					referrerpolicy: "strict-origin-when-cross-origin",
					allowfullscreen: ""
				}, null, 12, SM)], 6)])) : r("", !0)
			]),
			a("div", CM, [
				t.videoModalMode === "edit" ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-danger me-auto",
					onClick: o[52] ||= (...e) => t.deleteVideoFromModal && t.deleteVideoFromModal(...e)
				}, x(t.translate("Delete video")), 1)) : r("", !0),
				a("button", {
					type: "button",
					class: "btn btn-secondary",
					onClick: o[53] ||= (...e) => t.closeVideoModal && t.closeVideoModal(...e)
				}, x(t.translate("Cancel")), 1),
				a("button", {
					type: "button",
					class: "btn btn-primary",
					disabled: !t.videoResolvedSrc,
					onClick: o[54] ||= (...e) => t.confirmVideoModal && t.confirmVideoModal(...e)
				}, x(t.videoModalMode === "edit" ? t.translate("Save") : t.translate("Insert")), 9, wM)
			])
		])])) : r("", !0),
		t.htmlSourceModalOpen ? (_(), i("div", {
			key: 4,
			class: "tiptap-modal-overlay",
			onClick: o[62] ||= O((...e) => t.closeHtmlSourceModal && t.closeHtmlSourceModal(...e), ["self"])
		}, [a("div", {
			class: "tiptap-modal-content tiptap-html-modal-wide",
			onClick: o[61] ||= O(() => {}, ["stop"])
		}, [
			a("div", TM, [a("h5", EM, x(t.translate("HTML source")), 1), a("button", {
				type: "button",
				class: "btn-close",
				"aria-label": t.translate("Close"),
				onClick: o[57] ||= (...e) => t.closeHtmlSourceModal && t.closeHtmlSourceModal(...e)
			}, null, 8, DM)]),
			a("div", OM, [D(a("textarea", {
				ref: "htmlSourceTextarea",
				"onUpdate:modelValue": o[58] ||= (e) => t.htmlSourceText = e,
				class: "form-control font-monospace tiptap-html-source",
				rows: "18",
				spellcheck: "false"
			}, null, 512), [[E, t.htmlSourceText]])]),
			a("div", kM, [a("button", {
				type: "button",
				class: "btn btn-secondary",
				onClick: o[59] ||= (...e) => t.closeHtmlSourceModal && t.closeHtmlSourceModal(...e)
			}, x(t.translate("Cancel")), 1), a("button", {
				type: "button",
				class: "btn btn-primary",
				onClick: o[60] ||= (...e) => t.applyHtmlSource && t.applyHtmlSource(...e)
			}, x(t.translate("Apply")), 1)])
		])])) : r("", !0)
	], 2);
}
var jM = /*#__PURE__*/ Jk(tA, [["render", AM]]), MM = {
	props: { file: Object },
	data() {
		return {
			preview: {
				src: null,
				label: "",
				x: 0,
				y: 0
			},
			objectUrl: null
		};
	},
	beforeUnmount() {
		this.revokeObjectUrl();
	},
	methods: {
		roundFileSize(e, t) {
			let n = 1024, r = n * 1024, i = r * 1024;
			return e < n ? e + (t ? " Byte" : "") : e < r ? (e / n).toFixed(0) + (t ? "<span class=\"text-muted fw-light\"> KB</span>" : "") : e < i ? (e / r).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> MB</span>" : "") : (e / i).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> GB</span>" : "");
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
		getTypeImageUrl(e) {
			return e && (e.url || e.data) || null;
		},
		showPreview(e, t, n) {
			let r = this.getTypeImageUrl(t);
			r && (this.preview = {
				src: r,
				label: n,
				x: e.clientX + 16,
				y: e.clientY + 16
			});
		},
		movePreview(e) {
			this.preview.src && (this.preview.x = e.clientX + 16, this.preview.y = e.clientY + 16);
		},
		hidePreview() {
			this.preview.src = null, this.preview.label = "";
		},
		revokeObjectUrl() {
			this.objectUrl &&= (URL.revokeObjectURL(this.objectUrl), null);
		},
		openTypeImage(e) {
			if (e) {
				if (e.url) window.open(e.url, "_blank", "noopener,noreferrer");
				else if (e.data) {
					let t = window.open("", "_blank", "noopener,noreferrer");
					t && (t.document.write("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Preview</title></head><body style=\"margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh\"><img src=\"" + e.data.replace(/"/g, "&quot;") + "\" style=\"max-width:100%;max-height:100vh;height:auto\" alt=\"\"></body></html>"), t.document.close());
				} else e.blob && (this.revokeObjectUrl(), this.objectUrl = URL.createObjectURL(e.blob), window.open(this.objectUrl, "_blank", "noopener,noreferrer"));
			}
		}
	}
}, NM = {
	key: 0,
	class: "table table-sm w-100 vsa-file-info"
}, PM = { class: "text-nowrap text-center" }, FM = { class: "text-center" }, IM = { class: "text-nowrap text-end" }, LM = ["innerHTML"], RM = { class: "text-end" }, zM = [
	"onMouseenter",
	"onClick",
	"onKeydown"
], BM = { class: "text-nowrap text-center" }, VM = { class: "text-center" }, HM = { class: "text-end" }, UM = ["innerHTML"], WM = { class: "text-end" }, GM = {
	key: 0,
	class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, KM = { colspan: "3" }, qM = { class: "text-end" }, JM = ["innerHTML"], YM = { class: "d-flex justify-content-between text-nowrap" }, XM = { class: "d-flex justify-content-between text-nowrap" }, ZM = { class: "text-muted fw-light me-3" }, QM = {
	key: 1,
	class: "d-flex justify-content-between"
}, $M = ["src", "alt"], eN = {
	key: 0,
	class: "d-block text-center text-muted mt-1"
};
function tN(s, c, l, u, d, f) {
	return _(), i("div", null, [
		s.file ? (_(), i("table", NM, [
			c[5] ||= a("thead", null, [a("tr", null, [
				a("td", { class: "text-muted" }, " type "),
				a("td", { class: "text-muted text-center" }, " resolution "),
				a("td", { class: "text-muted text-center" }, " ratio "),
				a("td", { class: "text-muted text-end" }, " size "),
				a("td", { class: "text-muted text-end" }, " extension "),
				a("td", { class: "text-muted" }, " crop ")
			])], -1),
			a("tbody", null, [a("tr", null, [
				c[2] ||= a("td", null, " original ", -1),
				a("td", PM, x(s.file.original.width) + " x " + x(s.file.original.height), 1),
				a("td", FM, x(s.file.original.ratio), 1),
				a("td", IM, [a("span", { innerHTML: s.roundFileSize(s.file.original.bytes, !0) }, null, 8, LM)]),
				a("td", RM, x(s.file.original.extension), 1),
				c[3] ||= a("td", null, null, -1)
			]), (_(!0), i(e, null, y(s.file.types, (t, n) => (_(), i("tr", { key: n }, [
				a("td", null, [s.getTypeImageUrl(t) ? (_(), i("span", {
					key: 0,
					class: "vsa-file-info-preview-trigger",
					role: "button",
					tabindex: "0",
					onMouseenter: (e) => s.showPreview(e, t, n),
					onMousemove: c[0] ||= (e) => s.movePreview(e),
					onMouseleave: c[1] ||= (...e) => s.hidePreview && s.hidePreview(...e),
					onClick: O((e) => s.openTypeImage(t), ["prevent"]),
					onKeydown: ne(O((e) => s.openTypeImage(t), ["prevent"]), ["enter"])
				}, x(n), 41, zM)) : (_(), i(e, { key: 1 }, [o(x(n), 1)], 64))]),
				a("td", BM, x(t.width) + " x " + x(t.height), 1),
				a("td", VM, x(t.ratio), 1),
				a("td", HM, [a("span", {
					class: m(["text-nowrap", { "text-danger": t.bytes > s.file.original.bytes }]),
					innerHTML: s.roundFileSize(t.bytes, !0)
				}, null, 10, UM)]),
				a("td", WM, x(t.extension), 1),
				a("td", null, [t.crop ? (_(), i("small", GM, x(t.crop), 1)) : r("", !0)])
			]))), 128))]),
			a("tfoot", null, [a("tr", null, [
				a("td", KM, x(s.file.uploaded ? "uploaded" : "uploading"), 1),
				a("td", qM, [a("span", {
					class: "text-nowrap",
					innerHTML: s.roundFileSize(s.file.bytes, !0)
				}, null, 8, JM)]),
				c[4] ||= a("td", { colspan: "2" }, null, -1)
			])])
		])) : r("", !0),
		a("small", YM, [c[6] ||= a("span", { class: "text-muted fw-light me-3" }, "original filename", -1), o(" " + x(s.file.original.name), 1)]),
		a("small", XM, [
			a("span", ZM, x(s.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
			c[7] ||= o(),
			a("span", null, x(s.file.slug), 1)
		]),
		s.file.uploaded ? (_(), i("small", QM, [
			c[8] ||= a("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1),
			c[9] ||= o(),
			a("span", null, x(s.dateFormat(s.file.timestamp * 1e3)), 1)
		])) : r("", !0),
		(_(), n(t, { to: "body" }, [s.preview.src ? (_(), i("div", {
			key: 0,
			class: "vsa-file-info-preview",
			style: h({
				left: s.preview.x + "px",
				top: s.preview.y + "px"
			})
		}, [a("img", {
			src: s.preview.src,
			alt: s.preview.label
		}, null, 8, $M), s.preview.label ? (_(), i("small", eN, x(s.preview.label), 1)) : r("", !0)], 4)) : r("", !0)]))
	]);
}
var nN = /*#__PURE__*/ Jk(MM, [["render", tN]]), rN = {
	image: {
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		jfif: "image/jpeg",
		png: "image/png",
		webp: "image/webp",
		avif: "image/avif",
		gif: "image/gif",
		svg: "image/svg+xml"
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
}, iN = {
	props: {
		modelValue: Array,
		field: Object,
		settings: Object
	},
	inject: { setFormOverlayMessage: { default: null } },
	data: function() {
		return {
			files: [],
			editfile: null,
			count: 0,
			bytes: 0,
			wait: !1,
			uploadEvent: null,
			isDragging: !1,
			dragIndex: null,
			dragOverIndex: null,
			editor: { file: null },
			activeLanguage: null,
			isPasteZoneFocused: !1,
			uploadErrors: [],
			applyWatermarkOnUpload: !0,
			blurRadius: 20
		};
	},
	components: { VuAdminFileUploadInfo: nN },
	created() {
		let e = qc(1e5);
		this.uploadId = "image_upload_" + e, this.params = this.field.params, this.activeLanguage = this.hasLanguages() ? this.params.languages[0] : null;
		try {
			let e = parseInt(localStorage.getItem("vsa_editor_blur_radius"), 10);
			!isNaN(e) && e >= 2 && (this.blurRadius = Math.min(e, 120));
		} catch {}
	},
	mounted() {
		this.editfile = this.modelValue, this.editfile ||= [], document.addEventListener("paste", this.handlePaste), document.addEventListener("keydown", this.editorKeyDown);
	},
	beforeUnmount() {
		document.removeEventListener("paste", this.handlePaste), document.removeEventListener("keydown", this.editorKeyDown), this.setProcessingOverlay(null);
	},
	watch: { modelValue(e) {
		if (e == null) this.reset();
		else {
			for (let t of e) this.setDefaults(t);
			this.files = e;
		}
	} },
	methods: {
		setProcessingOverlay(e) {
			this.wait = !!e, typeof this.setFormOverlayMessage == "function" && this.setFormOverlayMessage(e);
		},
		roundFileSize(e, t) {
			return fl(e, t);
		},
		extensionByFilename(e) {
			return pl(e);
		},
		getAcceptMimeTypes(e) {
			let t = [];
			for (let n in rN) if (rN.hasOwnProperty(n)) {
				let r = rN[n];
				e.forEach((e) => {
					r[e] && t.push(r[e]);
				});
			}
			return t.join(",");
		},
		isExtensionAllowed(e) {
			if (!this.params.accept || !this.params.accept.length) return !0;
			let t = this.extensionByFilename(e.name).toLowerCase();
			return this.params.accept.map((e) => e.toLowerCase()).indexOf(t) >= 0;
		},
		setDefaults(e) {
			e && typeof e == "object" && (this.params && this.params.tags && !e.tags && (e.tags = []), this.normalizeTitle(e), Nl(e));
		},
		hasLanguages() {
			return !!(this.params && Array.isArray(this.params.languages) && this.params.languages.length > 1);
		},
		primaryLanguage() {
			return this.params.languages[0];
		},
		normalizeTitle(e) {
			if (e && this.hasLanguages()) {
				e.title && typeof e.title == "object" || (e.title = { [this.primaryLanguage()]: e.title || "" });
				for (let t of this.params.languages) e.title[t] === void 0 && (e.title[t] = "");
			}
		},
		titleText(e) {
			return this.hasLanguages() ? (this.normalizeTitle(e), e.title[this.activeLanguage] || e.title[this.primaryLanguage()] || "") : e.title || "";
		},
		fileTitle(e) {
			return this.hasLanguages() ? (this.normalizeTitle(e), e.title[this.activeLanguage] || "") : e.title;
		},
		setFileTitle(e, t) {
			this.hasLanguages() ? (this.normalizeTitle(e), e.title[this.activeLanguage] = t) : e.title = t;
		},
		cycleLanguage() {
			if (!this.hasLanguages()) return;
			let e = this.params.languages, t = e.indexOf(this.activeLanguage);
			this.activeLanguage = e[(t + 1) % e.length];
		},
		isSvgFile(e) {
			let t = e?.original?.extension || this.extensionByFilename(e?.name || ""), n = e?.original?.mime || e?.type || "";
			return t === "svg" || n === "image/svg+xml";
		},
		hasWatermarkPresets() {
			let e = this.params.presets;
			return !!(e && Object.values(e).some((e) => e && e.watermark && e.watermark.url));
		},
		detect(e) {
			this.setDefaults(e), e.bytes = 0, e.types = { default: {} };
			let t = e.name.split(".").slice(0, -1).join(".");
			if (this.hasLanguages()) {
				e.title = {};
				for (let n of this.params.languages) e.title[n] = n === this.primaryLanguage() ? t : "";
			} else e.title = t;
			e.uid = qc(9999999).toString(32) + Date.now().toString(32), e.slug = Zc(this.titleText(e)), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
				bytes: e.size,
				mime: e.type,
				name: e.name,
				modified: e.lastModified,
				extension: this.extensionByFilename(e.name)
			};
			let n = (e.original.extension || "").toLowerCase(), r = Object.values(rN.video).indexOf(e.original.mime) >= 0, i = Object.values(rN.image).indexOf(e.original.mime) >= 0, a = Object.values(rN.document).indexOf(e.original.mime) >= 0;
			if (!r && !i && !a) {
				let t = rN.image[n] || rN.video[n] || rN.document[n];
				t && (e.original.mime = t, i = !!rN.image[n], r = !!rN.video[n], a = !!rN.document[n]);
			}
			if (r ? e.isVideo = !0 : i ? e.isImage = !0 : a ? e.isDocument = !0 : e.isUnknown = !0, e.isUnknown) throw Error("Unsupported file type: " + (e.original.mime || e.original.extension));
			(e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
				width: 1920,
				height: 1920,
				extension: "webp",
				quality: .9
			});
		},
		async createThumbnail(e, t) {
			let n = document.createElement("video"), r = new FileReader();
			r.onload = (t) => {
				n.src = t.target.result, n.addEventListener("loadeddata", () => {
					n.currentTime = n.duration * Kc(), e.video = n;
				}), n.addEventListener("seeked", () => {
					this.forEachPresets(e, n, void 0, { watermark: this.applyWatermarkOnUpload }), e.loaded = !0, this.bytes += e.bytes;
				});
			}, r.readAsDataURL(e);
		},
		seekRandom(e) {
			e.video && (e.video.currentTime = e.video.duration * Kc());
		},
		async handleFileChange(e) {
			this.uploadEvent = e, this.count = this.files ? this.files.length : 0, this.uploadErrors = [];
			try {
				this.setProcessingOverlay(this.translate("Processing files..."));
				for (let t of e.target.files) if (!this.isExtensionAllowed(t)) this.uploadErrors.push(this.translate("File \"{name}\" has a disallowed extension. Allowed extensions: {ext}", {
					name: t.name,
					ext: this.params.accept.join(", ")
				}));
				else if (this.count++, this.count <= this.params.limit) {
					this.files.push(t);
					try {
						if (this.detect(t), t.isVideo) this.setProcessingOverlay(this.translate("Processing video: {name}", { name: t.name })), await this.createThumbnail(t);
						else if (t.isImage && this.isSvgFile(t)) this.setProcessingOverlay(this.translate("Loading image: {name}", { name: t.name })), await this.loadSvg(t);
						else if (t.isImage) await this.resizeImage(t);
						else if (t.isDocument) {
							this.setProcessingOverlay(this.translate("Loading file: {name}", { name: t.name }));
							let e = new FileReader();
							e.addEventListener("load", (e) => {
								t.types.default = {
									extension: t.original.extension,
									mime: t.original.mime,
									slug: Zc(this.titleText(t)) + "-" + t.uid,
									bytes: t.size,
									data: e.target.result
								}, t.loaded = !0, t.bytes += t.size, this.bytes += t.bytes;
							}), e.readAsDataURL(t);
						}
					} catch (e) {
						console.error("[vu-admin] handleFileChange:", t.name, e);
						let n = this.files.indexOf(t);
						n >= 0 && (this.bytes -= t.bytes || 0, this.files.splice(n, 1)), this.count--, this.uploadErrors.push(this.translate("Could not process file \"{name}\": it appears to be corrupted or is not a valid file of its type.", { name: t.name }));
					}
				}
				this.$emit("update:modelValue", this.files);
			} finally {
				this.setProcessingOverlay(null);
			}
			this.uploadEvent.target.value = "";
		},
		async forEachPresets(e, t, n, r = {}) {
			let i = r.watermark !== !1, a = document.createElement("canvas"), o = a.getContext("2d"), s = !!t.videoWidth, c, l;
			s ? (c = t.videoWidth, l = t.videoHeight) : (c = t.width, l = t.height), e.original.width = c, e.original.height = l, e.original.ratio = this.calculateAspectRatio(c, l);
			for (let r in this.params.presets) {
				let s = c, u = l, d = this.params.presets[r];
				d.key = r, d.width = d.width ? d.width : 1920;
				let f = d.width, p = d.height == null ? null : d.height, m;
				if (d.crop === "cover") {
					let e = Math.max(f / s, p / u), n = s * e, r = u * e, i = (n - f) / 2, c = (r - p) / 2;
					a.width = f, a.height = p, o.drawImage(t, -i, -c, n, r), m = {
						x: 0,
						y: 0,
						width: a.width,
						height: a.height
					};
				} else if (d.crop === "contain") {
					let e = Math.min(f / s, p / u), n = s * e, r = u * e, i = (f - n) / 2, c = (p - r) / 2;
					a.width = f, a.height = p, o.clearRect(0, 0, f, p), o.drawImage(t, i, c, n, r), m = {
						x: i,
						y: c,
						width: n,
						height: r
					};
				} else s > f && (u = Math.round(f / s * u), s = f), p != null && u > p && (s = Math.round(p / u * s), u = p), a.width = s, a.height = u, o.drawImage(t, 0, 0, s, u), m = {
					x: 0,
					y: 0,
					width: a.width,
					height: a.height
				};
				i && d.watermark && d.watermark.url && await this.applyWatermark(o, m, d.watermark), e.types[d.key] = {
					width: a.width,
					height: a.height,
					ratio: this.calculateAspectRatio(a.width, a.height),
					extension: d.extension ? d.extension : this.getExtensionByMimeType(d.convert || e.type),
					quality: d.quality ? d.quality : .9,
					crop: d.crop ? d.crop : null,
					watermarked: !!(d.watermark && d.watermark.url)
				}, e.types[d.key].watermarked && (e.hasWatermark = !0), e.types[d.key].slug = Zc(this.titleText(e)) + "-" + a.width + "x" + a.height + "-" + e.uid, e.types[d.key].mime = d.convert || this.getMimeTypeByExtension(e.types[d.key].extension), e.types[d.key].data = a.toDataURL(e.types[d.key].mime, e.types[d.key].quality), e.types[d.key].blob = await this.getBlob(a, e.types[d.key].mime, e.types[d.key].quality), e.types[d.key].blob && (e.types[d.key].bytes = e.types[d.key].blob.size), e.types[d.key].bytes && (e.bytes += e.types[d.key].bytes), n && n(d, e);
			}
		},
		getBlob(e, t, n) {
			return new Promise((r, i) => {
				e.toBlob(function(e) {
					e ? r(e) : i(/* @__PURE__ */ Error("Failed to convert canvas to Blob"));
				}, t, n);
			});
		},
		loadWatermarkImage(e) {
			return this._watermarkCache ||= {}, this._watermarkCache[e] || (this._watermarkCache[e] = new Promise((t) => {
				let n = new Image();
				n.crossOrigin = "anonymous", n.onload = () => t(n), n.onerror = () => {
					console.error("[vu-admin] Could not load watermark image:", e), t(null);
				}, n.src = e;
			})), this._watermarkCache[e];
		},
		resolveWatermarkSize(e, t, n) {
			let r = n.naturalWidth / n.naturalHeight, i = typeof e == "string" ? e.trim().match(/^([wh])(\d+(?:\.\d+)?)$/i) : null;
			if (i) {
				let e = i[1].toLowerCase(), n = Number(i[2]) / 100;
				if (e === "h") {
					let e = t.height * n;
					return {
						wmWidth: e * r,
						wmHeight: e
					};
				}
				let a = t.width * n;
				return {
					wmWidth: a,
					wmHeight: a / r
				};
			}
			let a = e ? Number(e) : n.naturalWidth;
			return {
				wmWidth: a,
				wmHeight: a / r
			};
		},
		async applyWatermark(e, t, n) {
			let r = await this.loadWatermarkImage(n.url);
			if (!r) return;
			let { wmWidth: i, wmHeight: a } = this.resolveWatermarkSize(n.width, t, r), o = n.margin == null ? Math.round(t.width * .03) : Number(n.margin), s = Math.max(0, t.width - o * 2), c = Math.max(0, t.height - o * 2), l = Math.min(1, i ? s / i : 1, a ? c / a : 1);
			l < 1 && (i *= l, a *= l);
			let u, d;
			switch (n.position || "right-bottom") {
				case "left-top":
					u = t.x + o, d = t.y + o;
					break;
				case "right-top":
					u = t.x + t.width - i - o, d = t.y + o;
					break;
				case "left-bottom":
					u = t.x + o, d = t.y + t.height - a - o;
					break;
				case "center":
					u = t.x + (t.width - i) / 2, d = t.y + (t.height - a) / 2;
					break;
				default: u = t.x + t.width - i - o, d = t.y + t.height - a - o;
			}
			let f = e.globalAlpha;
			e.globalAlpha = n.opacity == null ? 1 : Number(n.opacity), e.drawImage(r, u, d, i, a), e.globalAlpha = f;
		},
		async resizeImage(e) {
			if (this.isSvgFile(e)) {
				await this.loadSvg(e);
				return;
			}
			let t = await this.fileToBlob(e), n = await createImageBitmap(t);
			await this.forEachPresets(e, n, (t) => {
				let n = this.titleText(e) || e.name;
				this.setProcessingOverlay(this.translate("Resizing image: {name} ({preset})", {
					name: n,
					preset: t.key
				}));
			}, { watermark: this.applyWatermarkOnUpload }), e.loaded = !0, this.bytes += e.bytes;
		},
		async loadSvg(e) {
			let t = new FileReader();
			await new Promise((n) => {
				t.addEventListener("load", (t) => {
					let r = t.target.result, i = e.slice(0, e.size, "image/svg+xml"), a = {
						extension: "svg",
						mime: "image/svg+xml",
						slug: Zc(this.titleText(e)) + "-" + e.uid,
						bytes: e.size,
						data: r,
						blob: i,
						width: null,
						height: null,
						ratio: null,
						quality: 1
					};
					for (let t in this.params.presets) e.types[t] = {
						...a,
						slug: Zc(this.titleText(e)) + "-" + t + "-" + e.uid
					};
					e.types.default || (e.types.default = a), e.loaded = !0, e.bytes += e.size, this.bytes += e.bytes, n();
				}), t.readAsDataURL(e);
			});
		},
		fileToBlob(e) {
			return new Promise((t) => {
				let n = new FileReader();
				n.onload = (n) => {
					let r = e.original?.mime || e.type || e.mime || "";
					t(new Blob([n.target.result], { type: r }));
				}, n.readAsArrayBuffer(e);
			});
		},
		slug(e) {
			if (!e.uploaded) {
				e.slug = Zc(this.titleText(e));
				for (let t in e.types) {
					let n = this.params.presets[t];
					e.types[t].slug = Zc(this.titleText(e)) + "-" + n.width + "x" + n.height;
				}
				this.$forceUpdate();
			}
		},
		arrayItemMoveUp(e, t) {
			ll(e, t);
		},
		arrayItemMoveDown(e, t) {
			ul(e, t);
		},
		moveToPosition(e, t) {
			let n = parseInt(t.target.value) - 1;
			if (isNaN(n) || n < 0 || n >= this.files.length || n === e) {
				t.target.value = e + 1;
				return;
			}
			let r = this.files.splice(e, 1)[0];
			this.files.splice(n, 0, r), this.$forceUpdate();
		},
		itemDragStart(e) {
			this.dragIndex = e;
		},
		itemDragOver(e) {
			this.dragOverIndex = e;
		},
		itemDrop(e) {
			if (this.dragIndex === null || this.dragIndex === e) {
				this.dragIndex = null, this.dragOverIndex = null;
				return;
			}
			let t = this.files.splice(this.dragIndex, 1)[0];
			this.files.splice(e, 0, t), this.dragIndex = null, this.dragOverIndex = null, this.$forceUpdate();
		},
		itemDragEnd() {
			this.dragIndex = null, this.dragOverIndex = null;
		},
		onThumbnailClick(e, t) {
			e.isImage && !this.isSvgFile(e) && (t && (t.ctrlKey || t.metaKey || t.shiftKey || t.button !== 0) || (t && (t.preventDefault(), t.stopPropagation()), this.openEditor(e)));
		},
		openEditor(e) {
			if (this.isSvgFile(e)) return;
			let t = e.types && e.types.default, n = t ? t.data || t.url : null;
			if (!n) return;
			this.editor = {
				file: e,
				imgBitmap: null,
				rotate: 0,
				flipX: !1,
				flipY: !1,
				cropMode: !1,
				crop: null,
				dragging: !1,
				cropDrag: null,
				cropAnchor: null,
				scale: 1,
				hasWatermark: !!(t && t.watermarked),
				applyWatermark: !1,
				blurMode: !1,
				blurDrag: null
			};
			let r = new Image();
			r.crossOrigin = "anonymous", r.onload = async () => {
				try {
					let e = r.naturalWidth || 1920, t = r.naturalHeight || 1080, n = !r.naturalWidth || !r.naturalHeight ? {
						resizeWidth: e,
						resizeHeight: t
					} : void 0;
					this.editor.imgBitmap = await createImageBitmap(r, n), this.$nextTick(() => this.editorDraw());
				} catch (e) {
					console.error("[vu-admin] openEditor:", e), this.editor = { file: null };
				}
			}, r.onerror = () => {
				console.error("[vu-admin] openEditor: image load failed"), this.editor = { file: null };
			}, r.src = n;
		},
		editorLogicalSize(e, t = 0) {
			let n = t % 180 != 0;
			return {
				width: n ? e.height : e.width,
				height: n ? e.width : e.height
			};
		},
		editorDisplayToSourceRect(e, t, n, r, i) {
			let a = t / r, o = n / i, s = Math.max(0, Math.round(Math.min(e.x1, e.x2) * a)), c = Math.max(0, Math.round(Math.min(e.y1, e.y2) * o));
			return {
				bx: s,
				by: c,
				bw: Math.min(t - s, Math.max(1, Math.round(Math.abs(e.x2 - e.x1) * a))),
				bh: Math.min(n - c, Math.max(1, Math.round(Math.abs(e.y2 - e.y1) * o)))
			};
		},
		editorDraw(e = !1) {
			let t = this.$refs.editorCanvas;
			if (!t || !this.editor.imgBitmap) return;
			let n = this.editor.imgBitmap, r = this.editor.rotate, i = r % 180 != 0, a = i ? n.height : n.width, o = i ? n.width : n.height, s = Math.min(window.innerWidth * .9, 1400), c = window.innerHeight * .8, l = Math.min(s / a, c / o, 1);
			this.editor.scale = l;
			let u = Math.round(a * l), d = Math.round(o * l);
			(t.width !== u || t.height !== d) && (t.width = u, t.height = d), this.editor.displayWidth = t.width, this.editor.displayHeight = t.height;
			let f = t.getContext("2d");
			if (f.save(), f.translate(t.width / 2, t.height / 2), f.rotate(r * Math.PI / 180), f.scale(this.editor.flipX ? -1 : 1, this.editor.flipY ? -1 : 1), f.drawImage(n, -n.width * l / 2, -n.height * l / 2, n.width * l, n.height * l), f.restore(), !e && this.editor.cropMode && this.editor.crop) {
				let { x1: e, y1: n, x2: r, y2: i } = this.editor.crop, a = Math.min(e, r), o = Math.min(n, i), s = Math.abs(r - e), c = Math.abs(i - n);
				f.fillStyle = "rgba(0,0,0,0.55)", f.fillRect(0, 0, t.width, o), f.fillRect(0, o, a, c), f.fillRect(a + s, o, t.width - a - s, c), f.fillRect(0, o + c, t.width, t.height - o - c), f.strokeStyle = "rgba(255,255,255,0.9)", f.lineWidth = 1.5, f.setLineDash([5, 3]), f.strokeRect(a + .5, o + .5, s - 1, c - 1), f.setLineDash([]), f.strokeStyle = "rgba(255,255,255,0.25)", f.lineWidth = .5, f.beginPath(), f.moveTo(a + s / 3, o), f.lineTo(a + s / 3, o + c), f.moveTo(a + 2 * s / 3, o), f.lineTo(a + 2 * s / 3, o + c), f.moveTo(a, o + c / 3), f.lineTo(a + s, o + c / 3), f.moveTo(a, o + 2 * c / 3), f.lineTo(a + s, o + 2 * c / 3), f.stroke(), f.fillStyle = "white", [
					[a, o],
					[a + s, o],
					[a, o + c],
					[a + s, o + c]
				].forEach(([e, t]) => {
					f.fillRect(e - 7 / 2, t - 7 / 2, 7, 7);
				});
			}
			if (!e && this.editor.blurMode && this.editor.blurDrag) {
				let { x1: e, y1: t, x2: n, y2: r } = this.editor.blurDrag, i = Math.min(e, n), a = Math.min(t, r), o = Math.abs(n - e), s = Math.abs(r - t);
				f.fillStyle = "rgba(13, 202, 240, 0.2)", f.fillRect(i, a, o, s), f.strokeStyle = "rgba(13, 202, 240, 0.9)", f.lineWidth = 1.5, f.setLineDash([5, 3]), f.strokeRect(i + .5, a + .5, o - 1, s - 1), f.setLineDash([]);
			}
		},
		editorCanvasCoords(e) {
			let t = this.$refs.editorCanvas, n = t.getBoundingClientRect(), r = t.width / n.width, i = t.height / n.height;
			return {
				x: Math.max(0, Math.min((e.clientX - n.left) * r, t.width)),
				y: Math.max(0, Math.min((e.clientY - n.top) * i, t.height))
			};
		},
		editorCropRect(e) {
			return {
				cx: Math.min(e.x1, e.x2),
				cy: Math.min(e.y1, e.y2),
				cw: Math.abs(e.x2 - e.x1),
				ch: Math.abs(e.y2 - e.y1)
			};
		},
		editorHitCropHandle(e, t) {
			if (!this.editor.crop || !this.hasValidCrop(this.editor.crop)) return null;
			let { cx: n, cy: r, cw: i, ch: a } = this.editorCropRect(this.editor.crop), o = [
				[
					"nw",
					n,
					r
				],
				[
					"ne",
					n + i,
					r
				],
				[
					"sw",
					n,
					r + a
				],
				[
					"se",
					n + i,
					r + a
				]
			];
			for (let [n, r, i] of o) if (Math.abs(e - r) <= 10 && Math.abs(t - i) <= 10) return n;
			return null;
		},
		editorHandleCursor(e) {
			return {
				nw: "nwse-resize",
				ne: "nesw-resize",
				sw: "nesw-resize",
				se: "nwse-resize"
			}[e] || "crosshair";
		},
		editorMouseDown(e) {
			if (this.editor.blurMode) {
				let { x: t, y: n } = this.editorCanvasCoords(e);
				this.editor.dragging = !0, this.editor.blurDrag = {
					x1: t,
					y1: n,
					x2: t,
					y2: n
				};
				return;
			}
			if (!this.editor.cropMode) return;
			let { x: t, y: n } = this.editorCanvasCoords(e), r = this.editorHitCropHandle(t, n);
			if (r) {
				let e = this.editor.crop, t = Math.min(e.x1, e.x2), n = Math.min(e.y1, e.y2), i = Math.max(e.x1, e.x2), a = Math.max(e.y1, e.y2), o = {
					nw: {
						ax: i,
						ay: a
					},
					ne: {
						ax: t,
						ay: a
					},
					sw: {
						ax: i,
						ay: n
					},
					se: {
						ax: t,
						ay: n
					}
				};
				this.editor.cropAnchor = o[r], this.editor.cropDrag = r, this.editor.dragging = !0;
			} else this.editor.dragging = !0, this.editor.cropDrag = "new", this.editor.cropAnchor = null, this.editor.crop = {
				x1: t,
				y1: n,
				x2: t,
				y2: n
			};
		},
		editorMouseMove(e) {
			let t = this.$refs.editorCanvas;
			if (!t) return;
			if (this.editor.blurMode) {
				if (t.style.cursor = "crosshair", this.editor.dragging && this.editor.blurDrag) {
					let { x: t, y: n } = this.editorCanvasCoords(e);
					this.editor.blurDrag.x2 = t, this.editor.blurDrag.y2 = n, this.editorDraw();
				}
				return;
			}
			if (!this.editor.cropMode) return;
			let { x: n, y: r } = this.editorCanvasCoords(e);
			if (this.editor.dragging) {
				if (this.editor.cropDrag === "new") this.editor.crop.x2 = n, this.editor.crop.y2 = r;
				else if (this.editor.cropDrag && this.editor.cropAnchor) {
					let { ax: e, ay: i } = this.editor.cropAnchor, a = n, o = r;
					Math.abs(a - e) < 3 && (a = e + (a >= e ? 3 : -3)), Math.abs(o - i) < 3 && (o = i + (o >= i ? 3 : -3)), a = Math.max(0, Math.min(a, t.width)), o = Math.max(0, Math.min(o, t.height)), this.editor.crop = {
						x1: a,
						y1: o,
						x2: e,
						y2: i
					};
				}
				this.editorDraw();
			} else {
				let e = this.editorHitCropHandle(n, r);
				t.style.cursor = e ? this.editorHandleCursor(e) : "crosshair";
			}
		},
		editorMouseUp() {
			if (this.editor.blurMode && this.editor.dragging && this.hasValidCrop(this.editor.blurDrag)) {
				let e = this.$refs.editorCanvas, t = { ...this.editor.blurDrag }, n = e?.width || this.editor.displayWidth, r = e?.height || this.editor.displayHeight;
				this.editor.blurDrag = null, this.applyBlurRegion(t, n, r);
			}
			this.editor.dragging = !1, this.editor.cropDrag = null, this.editor.cropAnchor = null, this.editor.blurDrag = null;
		},
		editorRotate(e) {
			this.editor.rotate = (this.editor.rotate + e + 360) % 360, this.editor.crop = null, this.$nextTick(() => this.editorDraw());
		},
		editorFlip(e) {
			e === "x" ? this.editor.flipX = !this.editor.flipX : this.editor.flipY = !this.editor.flipY, this.$nextTick(() => this.editorDraw());
		},
		hasValidCrop(e) {
			return e ? Math.abs(e.x2 - e.x1) > 2 && Math.abs(e.y2 - e.y1) > 2 : !1;
		},
		editorToggleCrop() {
			this.editor.cropMode = !this.editor.cropMode, this.editor.cropMode || (this.editor.crop = null), this.editor.cropMode && (this.editor.blurMode = !1, this.editor.blurDrag = null), this.editorDraw();
		},
		editorCropButtonClick() {
			this.editor.cropMode && this.hasValidCrop(this.editor.crop) ? this.editorApplyCrop() : this.editorToggleCrop();
		},
		editorToggleBlur() {
			this.editor.blurMode = !this.editor.blurMode, this.editor.blurMode && (this.editor.cropMode = !1, this.editor.crop = null), this.editor.blurDrag = null, this.editorDraw();
		},
		editorKeyDown(e) {
			if (!this.editor?.file || e.ctrlKey || e.metaKey || e.altKey) return;
			let t = e.target?.tagName;
			t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.target?.isContentEditable || e.key.toLowerCase() === "b" && (e.preventDefault(), this.editorToggleBlur());
		},
		saveBlurRadius() {
			try {
				localStorage.setItem("vsa_editor_blur_radius", String(this.blurRadius));
			} catch {}
		},
		clampBlurRadius(e) {
			let t = e === void 0 ? this.blurRadius : e, n = parseInt(t, 10);
			this.blurRadius = isNaN(n) ? 20 : Math.max(2, Math.min(120, n)), this.saveBlurRadius();
		},
		adjustBlurRadius(e) {
			this.clampBlurRadius((this.blurRadius || 20) + e);
		},
		async applyBlurRegion(e, t, n) {
			if (!this.hasValidCrop(e)) return;
			this.editorDraw(!0);
			let r = this.$refs.editorCanvas;
			if (!r) return;
			let i = t || r.width, a = n || r.height;
			if (!i || !a) return;
			let o = Math.max(0, Math.round(Math.min(e.x1, e.x2))), s = Math.max(0, Math.round(Math.min(e.y1, e.y2))), c = Math.max(1, Math.min(i - o, Math.round(Math.abs(e.x2 - e.x1)))), l = Math.max(1, Math.min(a - s, Math.round(Math.abs(e.y2 - e.y1)))), u = this.editor.imgBitmap, { width: d, height: f } = this.editorLogicalSize(u, this.editor.rotate), p = d / i, m = f / a, h = Math.max(1, this.blurRadius || 20), g = Math.ceil(Math.max(h / p, h / m) * 3), _ = Math.max(0, o - g), v = Math.max(0, s - g), y = Math.min(i, o + c + g), b = Math.min(a, s + l + g), x = y - _, S = b - v, C = document.createElement("canvas");
			C.width = x, C.height = S, C.getContext("2d").drawImage(r, _, v, x, S, 0, 0, x, S);
			let w = Math.max(1, Math.round(x * p)), T = Math.max(1, Math.round(S * m)), E = document.createElement("canvas");
			E.width = w, E.height = T, E.getContext("2d").drawImage(C, 0, 0, x, S, 0, 0, w, T);
			let ee = document.createElement("canvas");
			ee.width = w, ee.height = T;
			let te = ee.getContext("2d");
			te.filter = `blur(${h}px)`, te.drawImage(E, 0, 0);
			let D = document.createElement("canvas");
			D.width = x, D.height = S, D.getContext("2d").drawImage(ee, 0, 0, w, T, 0, 0, x, S), r.getContext("2d").drawImage(D, o - _, s - v, c, l, o, s, c, l);
			let ne = document.createElement("canvas");
			ne.width = d, ne.height = f, ne.getContext("2d").drawImage(r, 0, 0, i, a, 0, 0, d, f), this.editor.imgBitmap = await createImageBitmap(ne), this.editor.rotate = 0, this.editor.flipX = !1, this.editor.flipY = !1, this.$nextTick(() => this.editorDraw());
		},
		editorRenderSource() {
			let e = this.editor.imgBitmap;
			if (!e) return null;
			let { rotate: t, flipX: n, flipY: r, crop: i } = this.editor, { width: a, height: o } = this.editorLogicalSize(e, t), s = this.editor.displayWidth || this.$refs.editorCanvas?.width, c = this.editor.displayHeight || this.$refs.editorCanvas?.height, l = document.createElement("canvas");
			l.width = a, l.height = o;
			let u = l.getContext("2d");
			if (u.translate(a / 2, o / 2), u.rotate(t * Math.PI / 180), u.scale(n ? -1 : 1, r ? -1 : 1), u.drawImage(e, -e.width / 2, -e.height / 2), !this.hasValidCrop(i) || !s || !c) return l;
			let { bx: d, by: f, bw: p, bh: m } = this.editorDisplayToSourceRect(i, a, o, s, c), h = document.createElement("canvas");
			return h.width = p, h.height = m, h.getContext("2d").drawImage(l, d, f, p, m, 0, 0, p, m), h;
		},
		async editorApplyCrop() {
			if (!this.hasValidCrop(this.editor.crop)) return;
			let e = this.editorRenderSource();
			e && (this.editor.imgBitmap = await createImageBitmap(e), this.editor.rotate = 0, this.editor.flipX = !1, this.editor.flipY = !1, this.editor.crop = null, this.editor.cropMode = !1, this.$nextTick(() => this.editorDraw()));
		},
		async editorApply() {
			let e = this.editor.file;
			if (!e || !this.editor.imgBitmap) return;
			let t = this.editorRenderSource();
			if (t) try {
				this.setProcessingOverlay(this.translate("Applying image edits...")), this.bytes -= e.bytes, e.bytes = 0, e.uploaded = !1, e.loaded = !1;
				let n = await createImageBitmap(t);
				await this.forEachPresets(e, n, (t) => {
					let n = this.titleText(e) || e.name;
					this.setProcessingOverlay(this.translate("Resizing image: {name} ({preset})", {
						name: n,
						preset: t.key
					}));
				}, { watermark: this.editor.applyWatermark }), e.loaded = !0, this.bytes += e.bytes, this.editor = { file: null }, this.$forceUpdate();
			} finally {
				this.setProcessingOverlay(null);
			}
		},
		editorClose() {
			this.editor = { file: null };
		},
		download(e, t) {
			let n = this.files[e].types[t.download ? t.download : "default"], r = document.createElement("a");
			r.href = n.url, r.download = n.slug + "." + n.extension, r.click();
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
			for (let t in rN) if (rN.hasOwnProperty(t)) {
				let n = rN[t];
				if (n[e]) return n[e];
			}
			return null;
		},
		getExtensionByMimeType(e) {
			for (let t in rN) if (rN.hasOwnProperty(t)) {
				let n = rN[t];
				for (let t in n) if (n[t] === e) return t;
			}
			return null;
		},
		calculateAspectRatio(e, t) {
			function n(e, t) {
				return t === 0 ? e : n(t, e % t);
			}
			if (e <= 0 || t <= 0) throw Error("Width and height must be positive numbers.");
			let r = n(e, t), i = e / r, a = t / r;
			if (i > 99 || a > 99) return "?";
			if (i === a) return "1:1";
			if (i % a === 0) return `${i / a}:1`;
			let o = `${i}:${a}`;
			return {
				"2.35:1": "2.35:1",
				"2.39:1": "2.39:1",
				"2.76:1": "2.76:1",
				"1.85:1": "1.85:1"
			}[o] || o;
		},
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
		},
		dropdownSelectToggleOne(e, t) {
			al(e, t), this.$forceUpdate();
		},
		dropdownSelectAll(e, t) {
			ol(e, t), this.$forceUpdate();
		},
		dropdownSelectInvert(e, t) {
			sl(e, t), this.$forceUpdate();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? cl(e) : e.value = null, this.$forceUpdate();
		},
		handleDrop(e) {
			e.preventDefault(), this.isDragging = !1;
			let t = e.dataTransfer.files;
			this.handleFileChange({ target: { files: t } });
		},
		handlePaste(e) {
			if (!this.isPasteZoneFocused || this.wait) return;
			let t = e.clipboardData && e.clipboardData.items;
			if (!t) return;
			let n = [];
			for (let e of t) if (e.kind === "file" && e.type.indexOf("image/") === 0) {
				let t = e.getAsFile();
				t && n.push(t);
			}
			n.length && (e.preventDefault(), this.handleFileChange({ target: { files: n } }));
		}
	}
}, aN = { class: "" }, oN = {
	key: 0,
	class: "vsa-image-editor p-2 text-center"
}, sN = { class: "row" }, cN = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, lN = { class: "badge bg-dark text-light fw-light mx-1" }, uN = { class: "badge bg-dark text-light fw-light mx-1" }, dN = ["src"], fN = { class: "row g-1" }, pN = { class: "col-md-6" }, mN = { class: "col-md-6" }, hN = { class: "col-md-6" }, gN = ["href"], _N = {
	key: 1,
	class: "alert alert-danger alert-dismissible py-2 px-3 mb-2",
	role: "alert"
}, vN = ["aria-label"], yN = {
	key: 2,
	class: "row g-2 mb-1"
}, bN = { key: 0 }, xN = { class: "table table-sm table-responsive table-borderless" }, SN = [
	"onDragstart",
	"onDragover",
	"onDrop"
], CN = { class: "align-middle px-0" }, wN = { class: "input-group border" }, TN = [
	"max",
	"value",
	"onChange"
], EN = {
	key: 0,
	class: "fs-5 mx-2"
}, DN = {
	key: 1,
	class: "fs-5 mx-2"
}, ON = {
	key: 2,
	class: "fs-5 mx-2"
}, kN = ["title"], AN = ["value", "onInput"], jN = {
	key: 4,
	class: "mx-0"
}, MN = [
	"href",
	"title",
	"onClick"
], NN = ["src", "alt"], PN = [
	"src",
	"alt",
	"title",
	"onClick"
], FN = {
	key: 5,
	class: "dropdown rounded-bottom"
}, IN = {
	class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, LN = { class: "text-nowrap" }, RN = { class: "dropdown-menu" }, zN = ["onClick"], BN = {
	key: 0,
	class: "bi bi-check-square"
}, VN = {
	key: 1,
	class: "bi bi-square"
}, HN = ["onClick"], UN = ["onClick"], WN = ["onClick"], GN = { class: "dropdown" }, KN = { class: "dropdown-menu vsa-file-actions-menu" }, qN = { class: "px-2 pt-2 pb-0" }, JN = { class: "d-flex gap-1" }, YN = ["onClick", "title"], XN = ["onClick", "title"], ZN = { class: "p-2 pt-0" }, QN = { class: "fw-light" }, $N = [
	"onDragstart",
	"onDragover",
	"onDrop"
], eP = {
	key: 0,
	class: "w-100 h-100 d-flex align-items-center flex-column"
}, tP = {
	key: 1,
	class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, nP = [
	"href",
	"title",
	"onClick"
], rP = ["src", "alt"], iP = [
	"src",
	"alt",
	"title",
	"onClick"
], aP = {
	key: 2,
	class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, oP = {
	key: 3,
	class: "input-group"
}, sP = ["title"], cP = ["value", "onInput"], lP = ["onUpdate:modelValue", "onInput"], uP = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, dP = [
	"max",
	"value",
	"onChange"
], fP = {
	key: 0,
	class: "dropdown border border-end-0 h-100 w-100"
}, pP = {
	class: "btn btn-sm rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, mP = { class: "text-nowrap" }, hP = { class: "dropdown-menu" }, gP = ["onClick"], _P = {
	key: 0,
	class: "bi bi-check-square"
}, vP = {
	key: 1,
	class: "bi bi-square"
}, yP = ["onClick"], bP = ["onClick"], xP = ["onClick"], SP = { class: "dropdown border h-100 w-100" }, CP = { class: "dropdown-menu vsa-file-actions-menu" }, wP = { class: "px-2 pt-2 pb-0" }, TP = { class: "d-flex gap-1" }, EP = ["onClick", "title"], DP = ["onClick", "title"], OP = { class: "p-2 pt-0" }, kP = { class: "fw-light" }, AP = {
	key: 1,
	class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, jP = { class: "row g-1" }, MP = { class: "col-12 d-flex align-items-center justify-content-center" }, NP = ["for"], PP = { key: 0 }, FP = { key: 0 }, IP = { class: "" }, LP = { class: "" }, RP = {
	key: 1,
	class: "fs-6"
}, zP = {
	key: 0,
	class: "bi bi-list-ol"
}, BP = {
	key: 1,
	class: "bi bi-grid"
}, VP = ["disabled"], HP = { class: "col-12 text-center" }, UP = { key: 0 }, WP = {
	key: 2,
	class: "form-check form-switch d-inline-flex align-items-center mt-1"
}, GP = ["id"], KP = ["for"], qP = ["id", "accept"], JP = {
	key: 0,
	class: "ms-1 small"
}, YP = {
	key: 0,
	class: "ms-1 small"
}, XP = {
	key: 1,
	class: "d-flex align-items-center text-light gap-1 ms-1"
}, ZP = { class: "input-group input-group-sm vsa-blur-input" }, QP = { class: "form-check form-switch d-inline-flex align-items-center text-light" }, $P = {
	class: "form-check-label ms-1",
	for: "editor_apply_watermark"
}, eF = { class: "ms-auto d-flex gap-2" }, tF = {
	key: 0,
	class: "alert alert-warning py-1 px-2 mb-0 rounded-0 small text-center",
	role: "alert"
}, nF = { class: "vsa-editor-canvas-area d-flex align-items-center justify-content-center flex-grow-1" };
function rF(t, n, c, l, u, d) {
	let f = b("VuAdminFileUploadInfo");
	return _(), i("div", aN, [a("div", { class: m(["vsa-upload", { wait: t.wait }]) }, [
		t.editfile && t.editfile.presets ? (_(), i("div", oN, [
			a("div", sN, [(_(!0), i(e, null, y(t.editfile.types, (e, n) => (_(), i("div", {
				class: "col-md-3",
				key: n
			}, [
				a("span", cN, x(e.extension), 1),
				a("span", lN, x(e.width) + " x " + x(e.height), 1),
				a("span", uN, "~" + x(t.roundFileSize(e.bytes)), 1),
				e ? (_(), i("img", {
					key: 0,
					class: "img-thumbnail rounded",
					src: e.url ? e.url : e.data
				}, null, 8, dN)) : r("", !0)
			]))), 128))]),
			D(a("input", {
				type: "text",
				class: "form-control form-control-sm w-100 mt-1",
				"onUpdate:modelValue": n[0] ||= (e) => t.editfile.title = e
			}, null, 512), [[E, t.editfile.title]]),
			a("div", fN, [
				a("div", pN, [a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: n[1] ||= (e) => t.editfile = null
				}, " Close ")]),
				a("div", mN, [a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: n[2] ||= (e) => t.remove(t.index)
				}, " Remove ")]),
				a("div", hN, [t.type && !t.type.url ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					onClick: n[3] ||= (e) => t.download(t.index, t.params)
				}, " Download ")) : r("", !0), t.type && t.type.url ? (_(), i("a", {
					key: 1,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					href: t.type.url
				}, " Download ", 8, gN)) : r("", !0)])
			])
		])) : r("", !0),
		t.uploadErrors && t.uploadErrors.length ? (_(), i("div", _N, [(_(!0), i(e, null, y(t.uploadErrors, (e, t) => (_(), i("div", {
			key: t,
			class: "small"
		}, x(e), 1))), 128)), a("button", {
			type: "button",
			class: "btn-close",
			"aria-label": t.translate("Close"),
			onClick: n[4] ||= (e) => t.uploadErrors = []
		}, null, 8, vN)])) : r("", !0),
		t.files && t.files.length ? (_(), i("div", yN, [t.params.ui === "list" ? (_(), i("div", bN, [a("table", xN, [a("tbody", null, [(_(!0), i(e, null, y(t.files, (c, l) => (_(), i("tr", {
			key: l,
			draggable: "true",
			onDragstart: (e) => t.itemDragStart(l),
			onDragover: O((e) => t.itemDragOver(l), ["prevent"]),
			onDrop: O((e) => t.itemDrop(l), ["prevent"]),
			onDragend: n[8] ||= (...e) => t.itemDragEnd && t.itemDragEnd(...e),
			class: m({
				"opacity-50": t.dragIndex === l,
				"table-primary": t.dragOverIndex === l && t.dragIndex !== l
			})
		}, [a("td", CN, [a("div", wN, [
			n[52] ||= a("span", {
				class: "cursor-move p-1 px-2 border-end d-flex align-items-center",
				title: "Drag to reorder"
			}, [a("i", { class: "bi bi-grip-vertical text-muted" })], -1),
			a("input", {
				type: "number",
				min: "1",
				max: t.files.length,
				value: l + 1,
				onChange: (e) => t.moveToPosition(l, e),
				onKeydown: n[5] ||= ne(O(() => {}, ["prevent"]), ["enter"]),
				class: "form-control form-control-sm text-center border-0 p-1 fw-bold",
				style: {
					width: "3rem",
					"-moz-appearance": "textfield"
				}
			}, null, 40, TN),
			c.isDocument ? (_(), i("span", EN, [a("i", { class: m(["bi bi-filetype-" + c.types.default.extension]) }, null, 2)])) : c.isImage ? (_(), i("span", DN, [...n[44] ||= [a("i", { class: "bi bi-file-image" }, null, -1)]])) : c.isVideo ? (_(), i("span", ON, [...n[45] ||= [a("i", { class: "bi bi-file-play" }, null, -1)]])) : r("", !0),
			t.hasLanguages() ? (_(), i("button", {
				key: 3,
				type: "button",
				class: "btn btn-sm btn-outline-secondary border-top-0 border-bottom-0 rounded-0 fw-bold text-uppercase px-2",
				style: { "min-width": "2.75rem" },
				onClick: n[6] ||= (e) => t.cycleLanguage(),
				title: t.translate("Switch language")
			}, x(t.activeLanguage), 9, kN)) : r("", !0),
			a("input", {
				required: "text",
				class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
				value: t.fileTitle(c),
				onInput: (e) => {
					t.setFileTitle(c, e.target.value), t.slug(c);
				},
				onKeydown: n[7] ||= ne(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, AN),
			!c.isDocument && c.types && c.types[t.params.thumbnail] ? (_(), i("span", jN, [c.types.default.url ? (_(), i("a", {
				key: 0,
				target: "_blank",
				href: c.types.default.url,
				class: m({ "vsa-thumb-editable": c.isImage && !t.isSvgFile(c) }),
				title: c.isImage && !t.isSvgFile(c) ? t.translate("Edit") : null,
				onClick: (e) => t.onThumbnailClick(c, e)
			}, [a("img", {
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: c.types[t.params.thumbnail].url,
				alt: c.name
			}, null, 8, NN)], 10, MN)) : (_(), i("img", {
				key: 1,
				height: "32",
				width: "auto",
				class: m(["transparent-background", { "vsa-thumb-editable": c.isImage && !t.isSvgFile(c) }]),
				src: c.types[t.params.thumbnail].data,
				alt: c.name,
				title: c.isImage && !t.isSvgFile(c) ? t.translate("Edit") : null,
				onClick: (e) => t.onThumbnailClick(c, e)
			}, null, 10, PN))])) : r("", !0),
			t.params.tags ? (_(), i("div", FN, [a("button", IN, [a("span", LN, [n[46] ||= a("i", { class: "bi bi-tag" }, null, -1), o(" " + x(c.tags ? c.tags.length : 0), 1)])]), a("ul", RN, [
				a("li", null, [(_(!0), i(e, null, y(t.params.tags, (e) => (_(), i("span", {
					key: e,
					class: "dropdown-item cursor-pointer",
					onClick: (n) => t.dropdownSelectToggleOne(c.tags, e.value)
				}, [c.tags && c.tags.indexOf(e.value) >= 0 ? (_(), i("i", BN)) : (_(), i("i", VN)), o(" " + x(t.translate(e.label ? e.label : e.value)), 1)], 8, zN))), 128))]),
				n[47] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectAll(c.tags, t.params.tags)
				}, x(t.translate("Select all")), 9, HN)]),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectClear(c.tags)
				}, x(t.translate("Unselect all")), 9, UN)]),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectInvert(c.tags, t.params.tags)
				}, x(t.translate("Invert all")), 9, WN)])
			])])) : r("", !0),
			a("div", GN, [n[51] ||= a("button", {
				class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 h-100",
				type: "button",
				"data-bs-toggle": "dropdown",
				"aria-expanded": "false"
			}, [a("i", { class: "bi bi-list" })], -1), a("ul", KN, [
				a("li", qN, [a("div", JN, [c.isImage && !t.isSvgFile(c) ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-secondary flex-fill",
					onClick: (e) => t.openEditor(c),
					title: t.translate("Edit")
				}, [n[48] ||= a("i", { class: "bi bi-pencil me-1" }, null, -1), o(x(t.translate("Edit")), 1)], 8, YN)) : r("", !0), a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger flex-fill",
					onClick: (e) => t.remove(l),
					title: t.translate("Delete")
				}, [n[49] ||= a("i", { class: "bi bi-x-circle me-1" }, null, -1), o(x(t.translate("Delete")), 1)], 8, XN)])]),
				n[50] ||= a("li", null, [a("hr", { class: "dropdown-divider my-2" })], -1),
				a("li", ZN, [a("small", QN, [s(f, { file: c }, null, 8, ["file"])])])
			])])
		])])], 42, SN))), 128))])])])) : (_(!0), i(e, { key: 1 }, y(t.files, (c, l) => (_(), i("div", {
			class: m([t.params.colclass ? t.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
			key: l,
			draggable: "true",
			onDragstart: (e) => t.itemDragStart(l),
			onDragover: O((e) => t.itemDragOver(l), ["prevent"]),
			onDrop: O((e) => t.itemDrop(l), ["prevent"]),
			onDragend: n[13] ||= (...e) => t.itemDragEnd && t.itemDragEnd(...e)
		}, [a("div", { class: m(["vsa-image-container h-100 position-relative", {
			"opacity-50": t.dragIndex === l,
			"vsa-drag-over": t.dragOverIndex === l && t.dragIndex !== l
		}]) }, [c.loaded ? (_(), i("div", eP, [
			r("", !0),
			c.types && c.types[t.params.thumbnail] ? (_(), i("div", tP, [c.types.default.url ? (_(), i("a", {
				key: 0,
				target: "_blank",
				href: c.types.default.url,
				class: m({ "vsa-thumb-editable": c.isImage && !t.isSvgFile(c) }),
				title: c.isImage && !t.isSvgFile(c) ? t.translate("Edit") : null,
				onClick: (e) => t.onThumbnailClick(c, e)
			}, [a("img", {
				class: "img-fluid transparent-background",
				src: c.types[t.params.thumbnail].url,
				alt: c.name
			}, null, 8, rP)], 10, nP)) : (_(), i("img", {
				key: 1,
				class: m(["img-fluid transparent-background", { "vsa-thumb-editable": c.isImage && !t.isSvgFile(c) }]),
				src: c.types[t.params.thumbnail].data,
				alt: c.name,
				title: c.isImage && !t.isSvgFile(c) ? t.translate("Edit") : null,
				onClick: (e) => t.onThumbnailClick(c, e)
			}, null, 10, iP))])) : r("", !0),
			c.isDocument ? (_(), i("div", aP, [a("i", { class: m(["bi bi-filetype-" + c.types.default.extension]) }, null, 2)])) : r("", !0),
			t.hasLanguages() ? (_(), i("div", oP, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary rounded-0 fw-bold text-uppercase px-2",
				onClick: n[9] ||= (e) => t.cycleLanguage(),
				title: t.translate("Switch language")
			}, x(t.activeLanguage), 9, sP), a("input", {
				required: "text",
				class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
				value: t.fileTitle(c),
				onInput: (e) => {
					t.setFileTitle(c, e.target.value), t.slug(c);
				},
				onKeydown: n[10] ||= ne(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, cP)])) : D((_(), i("input", {
				key: 4,
				required: "text",
				class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
				"onUpdate:modelValue": (e) => c.title = e,
				onInput: (e) => t.slug(c),
				onKeydown: n[11] ||= ne(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, lP)), [[E, c.title]]),
			a("div", uP, [
				n[62] ||= a("span", {
					class: "cursor-move p-1 px-2 border border-end-0 h-100 d-flex align-items-center",
					title: "Drag to reorder"
				}, [a("i", { class: "bi bi-grip-vertical text-muted" })], -1),
				a("input", {
					type: "number",
					min: "1",
					max: t.files.length,
					value: l + 1,
					onChange: (e) => t.moveToPosition(l, e),
					onKeydown: n[12] ||= ne(O(() => {}, ["prevent"]), ["enter"]),
					class: "form-control form-control-sm text-center rounded-0 border-end-0 p-1 h-100 fw-bold",
					style: {
						width: "3.5rem",
						"-moz-appearance": "textfield"
					}
				}, null, 40, dP),
				t.params.tags ? (_(), i("div", fP, [a("button", pP, [a("span", mP, [n[56] ||= a("i", { class: "bi bi-tag" }, null, -1), o(" " + x(c.tags ? c.tags.length : 0), 1)])]), a("ul", hP, [
					a("li", null, [(_(!0), i(e, null, y(t.params.tags, (e) => (_(), i("span", {
						key: e,
						class: "dropdown-item cursor-pointer",
						onClick: (n) => t.dropdownSelectToggleOne(c.tags, e.value)
					}, [c.tags && c.tags.indexOf(e.value) >= 0 ? (_(), i("i", _P)) : (_(), i("i", vP)), o(" " + x(t.translate(e.label ? e.label : e.value)), 1)], 8, gP))), 128))]),
					n[57] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectAll(c.tags, t.params.tags)
					}, x(t.translate("Select all")), 9, yP)]),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectClear(c.tags)
					}, x(t.translate("Unselect all")), 9, bP)]),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectInvert(c.tags, t.params.tags)
					}, x(t.translate("Invert all")), 9, xP)])
				])])) : r("", !0),
				a("div", SP, [n[61] ||= a("button", {
					class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
					type: "button",
					"data-bs-toggle": "dropdown",
					"aria-expanded": "false"
				}, [a("i", { class: "bi bi-list" })], -1), a("ul", CP, [
					a("li", wP, [a("div", TP, [c.isImage && !t.isSvgFile(c) ? (_(), i("button", {
						key: 0,
						type: "button",
						class: "btn btn-sm btn-outline-secondary flex-fill",
						onClick: (e) => t.openEditor(c),
						title: t.translate("Edit")
					}, [n[58] ||= a("i", { class: "bi bi-pencil me-1" }, null, -1), o(x(t.translate("Edit")), 1)], 8, EP)) : r("", !0), a("button", {
						type: "button",
						class: "btn btn-sm btn-outline-danger flex-fill",
						onClick: (e) => t.remove(l),
						title: t.translate("Delete")
					}, [n[59] ||= a("i", { class: "bi bi-x-circle me-1" }, null, -1), o(x(t.translate("Delete")), 1)], 8, DP)])]),
					n[60] ||= a("li", null, [a("hr", { class: "dropdown-divider my-2" })], -1),
					a("li", OP, [a("small", kP, [s(f, { file: c }, null, 8, ["file"])])])
				])])
			])
		])) : (_(), i("div", AP, [...n[63] ||= [a("span", null, null, -1)]]))], 2)], 42, $N))), 128))])) : r("", !0),
		a("div", jP, [a("div", MP, [
			a("label", {
				for: t.uploadId,
				class: m([
					{ "disabled bg-secondary": t.files && t.params.limit <= t.files.length },
					"btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone",
					{ "vsa-drop-zone-active": t.isDragging }
				]),
				onDragover: n[14] ||= O(() => {}, ["prevent"]),
				onDragenter: n[15] ||= O(() => {}, ["prevent"]),
				onDrop: n[16] ||= O((...e) => t.handleDrop && t.handleDrop(...e), ["prevent"])
			}, [t.files && t.params.limit > t.files.length ? (_(), i("span", PP, [
				n[67] ||= a("i", { class: "bi bi-upload me-2" }, null, -1),
				o(" " + x(t.params.text) + " ", 1),
				t.params.limit ? (_(), i("small", FP, [
					n[64] ||= o(" ( ", -1),
					a("strong", IP, x(t.files.length), 1),
					n[65] ||= o(" / ", -1),
					a("span", LP, x(t.params.limit), 1),
					n[66] ||= o(" ) ", -1)
				])) : r("", !0)
			])) : (_(), i("span", RP, [...n[68] ||= [a("i", { class: "bi bi-exclamation-circle" }, null, -1), o(" You've reached the upload limit ", -1)]]))], 42, NP),
			a("button", {
				type: "button",
				class: "btn btn-outline-primary ms-1",
				onClick: n[17] ||= (e) => t.toggleView()
			}, [t.params.ui == "list" ? r("", !0) : (_(), i("i", zP)), t.params.ui == "list" ? (_(), i("i", BP)) : r("", !0)]),
			a("button", {
				disabled: !t.files.length,
				type: "button",
				class: "btn btn-outline-danger ms-1",
				onClick: n[18] ||= (e) => t.resetConfirm()
			}, [...n[69] ||= [a("i", { class: "bi bi-trash" }, null, -1)]], 8, VP)
		]), a("div", HP, [a("small", null, [
			t.params.accept ? (_(), i("div", UP, [n[70] ||= a("span", { class: "text-secondary" }, "accept only", -1), (_(!0), i(e, null, y(t.params.accept, (e) => (_(), i("strong", {
				class: "ms-1 text-muted",
				key: e
			}, x(e), 1))), 128))])) : r("", !0),
			t.files && t.params.limit > t.files.length ? (_(), i("div", {
				key: 1,
				tabindex: "0",
				class: m(["vsa-paste-zone text-secondary cursor-pointer", { "vsa-paste-zone-active": t.isPasteZoneFocused }]),
				onFocus: n[19] ||= (e) => t.isPasteZoneFocused = !0,
				onBlur: n[20] ||= (e) => t.isPasteZoneFocused = !1
			}, [n[71] ||= a("i", { class: "bi bi-clipboard me-1" }, null, -1), o(x(t.translate("To paste from clipboard, click here and press Ctrl+V")), 1)], 34)) : r("", !0),
			t.hasWatermarkPresets() ? (_(), i("div", WP, [D(a("input", {
				class: "form-check-input",
				type: "checkbox",
				role: "switch",
				id: t.uploadId + "_watermark",
				"onUpdate:modelValue": n[21] ||= (e) => t.applyWatermarkOnUpload = e
			}, null, 8, GP), [[C, t.applyWatermarkOnUpload]]), a("label", {
				class: "form-check-label ms-1",
				for: t.uploadId + "_watermark"
			}, x(t.translate("Add watermark on upload")), 9, KP)])) : r("", !0),
			r("", !0)
		])])]),
		t.uploadId ? (_(), i("input", {
			key: 3,
			multiple: "",
			style: {
				opacity: "0",
				height: "1px",
				width: "1px"
			},
			id: t.uploadId,
			type: "file",
			accept: t.getAcceptMimeTypes(t.params.accept),
			onChange: n[22] ||= (...e) => t.handleFileChange && t.handleFileChange(...e)
		}, null, 40, qP)) : r("", !0),
		t.editor.file ? (_(), i("div", {
			key: 4,
			class: "vsa-editor-overlay",
			onMousemove: n[41] ||= O((...e) => t.editorMouseMove && t.editorMouseMove(...e), ["prevent"]),
			onMouseup: n[42] ||= (...e) => t.editorMouseUp && t.editorMouseUp(...e),
			onMouseleave: n[43] ||= (...e) => t.editorMouseUp && t.editorMouseUp(...e)
		}, [
			a("div", {
				class: "vsa-editor-toolbar d-flex align-items-center flex-wrap gap-1 p-2 bg-dark border-bottom border-secondary",
				onMousedown: n[37] ||= O(() => {}, ["stop"]),
				onMousemove: n[38] ||= O(() => {}, ["stop"]),
				onMouseup: n[39] ||= O(() => {}, ["stop"])
			}, [
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-light",
					onClick: n[23] ||= (e) => t.editorRotate(-90),
					title: "Rotate left 90°"
				}, [...n[73] ||= [a("i", { class: "bi bi-arrow-counterclockwise" }, null, -1)]]),
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-light",
					onClick: n[24] ||= (e) => t.editorRotate(90),
					title: "Rotate right 90°"
				}, [...n[74] ||= [a("i", { class: "bi bi-arrow-clockwise" }, null, -1)]]),
				n[84] ||= a("span", { class: "text-secondary mx-1" }, "|", -1),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.flipX ? "btn-light" : "btn-outline-light"]),
					onClick: n[25] ||= (e) => t.editorFlip("x"),
					title: "Flip horizontal"
				}, [...n[75] ||= [a("i", { class: "bi bi-symmetry-vertical" }, null, -1)]], 2),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.flipY ? "btn-light" : "btn-outline-light"]),
					onClick: n[26] ||= (e) => t.editorFlip("y"),
					title: "Flip vertical"
				}, [...n[76] ||= [a("i", { class: "bi bi-symmetry-horizontal" }, null, -1)]], 2),
				n[85] ||= a("span", { class: "text-secondary mx-1" }, "|", -1),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.cropMode ? "btn-warning" : "btn-outline-light"]),
					onClick: n[27] ||= (...e) => t.editorCropButtonClick && t.editorCropButtonClick(...e),
					title: "Crop"
				}, [n[77] ||= a("i", { class: "bi bi-crop" }, null, -1), t.editor.cropMode ? (_(), i("span", JP, x(t.editor.crop ? "Apply crop" : "Draw a crop area"), 1)) : r("", !0)], 2),
				t.editor.cropMode && t.editor.crop ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-warning",
					onClick: n[28] ||= (e) => {
						t.editor.crop = null, t.editorDraw();
					},
					title: "Clear crop"
				}, [...n[78] ||= [a("i", { class: "bi bi-x" }, null, -1)]])) : r("", !0),
				n[86] ||= a("span", { class: "text-secondary mx-1" }, "|", -1),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.blurMode ? "btn-warning" : "btn-outline-light"]),
					onClick: n[29] ||= (...e) => t.editorToggleBlur && t.editorToggleBlur(...e),
					title: "Blur (B)"
				}, [n[79] ||= a("i", { class: "bi bi-eye-slash" }, null, -1), t.editor.blurMode ? (_(), i("span", YP, "Draw a rectangle")) : r("", !0)], 2),
				t.editor.blurMode ? (_(), i("div", XP, [n[81] ||= a("i", { class: "bi bi-droplet-half" }, null, -1), a("div", ZP, [
					a("button", {
						type: "button",
						class: "btn btn-outline-light",
						onClick: n[30] ||= (e) => t.adjustBlurRadius(-5),
						title: "-5 px"
					}, "−"),
					D(a("input", {
						type: "number",
						class: "form-control text-center",
						min: "2",
						max: "120",
						step: "1",
						"onUpdate:modelValue": n[31] ||= (e) => t.blurRadius = e,
						onChange: n[32] ||= (e) => t.clampBlurRadius(),
						title: "Blur strength (source px)"
					}, null, 544), [[
						E,
						t.blurRadius,
						void 0,
						{ number: !0 }
					]]),
					n[80] ||= a("span", { class: "input-group-text" }, "px", -1),
					a("button", {
						type: "button",
						class: "btn btn-outline-light",
						onClick: n[33] ||= (e) => t.adjustBlurRadius(5),
						title: "+5 px"
					}, "+")
				])])) : r("", !0),
				t.hasWatermarkPresets() ? (_(), i(e, { key: 2 }, [n[82] ||= a("span", { class: "text-secondary mx-1" }, "|", -1), a("div", QP, [D(a("input", {
					class: "form-check-input",
					type: "checkbox",
					role: "switch",
					id: "editor_apply_watermark",
					"onUpdate:modelValue": n[34] ||= (e) => t.editor.applyWatermark = e
				}, null, 512), [[C, t.editor.applyWatermark]]), a("label", $P, x(t.translate("Add watermark on save")), 1)])], 64)) : r("", !0),
				a("div", eF, [a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary text-light border-secondary",
					onClick: n[35] ||= (...e) => t.editorClose && t.editorClose(...e)
				}, "Cancel"), a("button", {
					type: "button",
					class: "btn btn-sm btn-primary",
					onClick: n[36] ||= (...e) => t.editorApply && t.editorApply(...e)
				}, [...n[83] ||= [a("i", { class: "bi bi-check2 me-1" }, null, -1), o("Apply ", -1)]])])
			], 32),
			t.editor.hasWatermark ? (_(), i("div", tF, [n[87] ||= a("i", { class: "bi bi-exclamation-triangle me-1" }, null, -1), o(x(t.translate("This image has a watermark applied. Rotating or cropping may distort or cut off the watermark.")), 1)])) : r("", !0),
			a("div", nF, [a("canvas", {
				ref: "editorCanvas",
				class: "vsa-editor-canvas",
				style: h({ cursor: t.editor.cropMode || t.editor.blurMode ? "crosshair" : "default" }),
				onMousedown: n[40] ||= O((...e) => t.editorMouseDown && t.editorMouseDown(...e), ["prevent"])
			}, null, 36)])
		], 32)) : r("", !0)
	], 2)]);
}
var iF = /*#__PURE__*/ Jk(iN, [["render", rF]]), aF = {
	inject: { handleFormErrors: { default: null } },
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
	created() {},
	mounted() {
		this.loadOptions(), this.setNewItem(this.modelValue);
	},
	watch: { modelValue(e) {
		this.setNewItem(e);
	} },
	methods: {
		setNewItem(e) {
			this.newitem = this.optionValue === "object" ? e && e.value : e;
		},
		async loadOptions() {
			this.options = await this.selectOptions(this.field.options, this.field);
		},
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		},
		async selectOptions(e, t) {
			return typeof e == "function" ? await e(this.item, t, this) : e;
		},
		async fetchCustom(e, t) {
			let n = await fetch(Xc("GET", { url: e }, t), Yc("GET", this.settings.form.api, null, this.auth)).catch((e) => (console.error("[vu-admin] fetchCustom network error:", e), null)), r = await Fc(n), i = Hc(n, r);
			if (i) this.handleFormErrors && this.handleFormErrors(i);
			else return r.data;
		},
		handleChange(e) {
			if (this.optionValue === "object") {
				let e = this.options.find((e) => e.value === this.newitem);
				e && this.$emit("update:modelValue", e);
			} else this.$emit("update:modelValue", this.newitem);
		}
	},
	components: {}
}, oF = [
	"name",
	"id",
	"disabled",
	"readonly",
	"required"
], sF = ["value"];
function cF(t, n, r, a, o, s) {
	return D((_(), i("select", {
		class: m(["form-select", t.getValueOrFunction(t.field.inputclass ? t.field.inputclass : "", {
			field: t.field,
			item: t.item
		})]),
		name: t.field.name,
		id: t.formId + "_" + t.field.name,
		onChange: n[0] ||= (e) => t.handleChange(e),
		"onUpdate:modelValue": n[1] ||= (e) => t.newitem = e,
		disabled: t.field.disabled,
		readonly: t.field.readonly,
		required: t.field.required
	}, [(_(!0), i(e, null, y(t.options, (e) => (_(), i("option", {
		class: m(t.getValueOrFunction(t.field.optionclass ? t.field.optionclass : "", {
			field: t.field,
			item: t.item,
			option: e
		})),
		key: e,
		value: e.value
	}, x(e.label ? e.label : e.value), 11, sF))), 128))], 42, oF)), [[T, t.newitem]]);
}
var lF = /*#__PURE__*/ Jk(aF, [["render", cF]]), uF = {
	inject: { handleFormErrors: { default: null } },
	props: {
		modelValue: Array,
		field: Object,
		item: Object,
		settings: Object,
		formId: String
	},
	data: function() {
		return { value: [] };
	},
	created() {},
	mounted() {},
	computed: { addButton() {
		return Object.assign({
			class: "btn btn-sm btn-outline-primary my-1 w-100",
			icon: "bi bi-plus",
			wrapperClass: "col-2",
			label: null
		}, this.field.addButton || {});
	} },
	watch: { modelValue: {
		immediate: !0,
		handler(e) {
			this.value = e, this.value && typeof this.value == "object" || (this.value = []);
		}
	} },
	methods: {
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		},
		selectOptions(e, t) {
			return typeof e == "function" ? e(this.item, t, this) : e;
		},
		arrayAddNewItem(e, t) {
			if (typeof e.validateAdd == "function") {
				let t = e.validateAdd(e.elements);
				if (t) {
					this.handleFormErrors && this.handleFormErrors(t);
					return;
				}
			}
			let n = typeof e.validateAdd == "function", r = {};
			for (let t in e.elements) {
				let i = Object.assign({}, e.elements[t]).value, a = i != null && String(i).trim() !== "" ? i : null;
				if (a != null) r[t] = typeof a == "string" ? a.trim() : a;
				else if (n) r[t] = "";
				else {
					this.handleFormErrors && this.handleFormErrors("Fill in every field before adding a row.");
					return;
				}
			}
			this.value.push(r), this.$emit("update:modelValue", this.value);
			for (let t in e.elements) e.elements[t].value = null;
		},
		arrayRemoveItem(e, t) {
			e.splice(t, 1);
		},
		arrayItemMoveUp(e, t) {
			ll(e, t);
		},
		arrayItemMoveDown(e, t) {
			ul(e, t);
		}
	},
	components: { VuAdminFormSelect: lF }
}, dF = { class: "col" }, fF = { class: "row g-1 d-flex align-items-center justify-content-between" }, pF = ["innerHTML"], mF = {
	key: 1,
	class: "input-group input-group-sm"
}, hF = {
	key: 0,
	class: "input-group-text"
}, gF = [
	"type",
	"required",
	"placeholder",
	"onUpdate:modelValue"
], _F = {
	key: 3,
	class: "input-group-text"
}, vF = ["onClick"], yF = ["onClick"], bF = ["onClick"], xF = { key: 0 }, SF = { class: "row g-1 d-flex align-items-center justify-content-between" }, CF = { class: "col" }, wF = { class: "row g-1 d-flex align-items-center justify-content-between" }, TF = { class: "input-group input-group-sm" }, EF = {
	key: 0,
	class: "input-group-text"
}, DF = [
	"type",
	"placeholder",
	"onUpdate:modelValue"
], OF = {
	key: 3,
	class: "input-group-text"
}, kF = ["innerHTML"];
function AF(t, o, s, c, l, u) {
	let d = b("VuAdminFormSelect");
	return _(), i("div", null, [
		(_(!0), i(e, null, y(t.value, (s, c) => (_(), i("div", {
			class: "row g-1 d-flex align-items-center justify-content-between mb-1",
			key: c
		}, [a("div", dF, [a("div", fF, [(_(!0), i(e, null, y(t.field.elements, (e, a) => (_(), i("div", {
			key: a,
			class: m(e.class || "col")
		}, [e.template ? (_(), i("span", {
			key: 0,
			innerHTML: t.getValueOrFunction(e.template, t.value[c])
		}, null, 8, pF)) : (_(), i("div", mF, [
			e.prefix ? (_(), i("span", hF, x(e.prefix), 1)) : r("", !0),
			e.type == "select" && (!e.relation || e.relation.items) ? (_(), n(d, {
				key: 1,
				modelValue: t.value[c][a],
				"onUpdate:modelValue": (e) => t.value[c][a] = e,
				field: e,
				item: t.item,
				settings: t.settings,
				formId: t.formId,
				optionValue: "object"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"field",
				"item",
				"settings",
				"formId"
			])) : D((_(), i("input", {
				key: 2,
				type: e.type,
				required: e.required,
				placeholder: e.placeholder || "",
				class: "form-control",
				"onUpdate:modelValue": (e) => t.value[c][a] = e
			}, null, 8, gF)), [[w, t.value[c][a]]]),
			e.suffix ? (_(), i("span", _F, x(e.suffix), 1)) : r("", !0)
		]))], 2))), 128))])]), a("div", { class: m([t.addButton.wrapperClass, "text-nowrap text-end"]) }, [
			t.field.sortable ? (_(), i("button", {
				key: 0,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => t.arrayItemMoveUp(t.value, c)
			}, [...o[1] ||= [a("i", { class: "bi bi-arrow-up" }, null, -1)]], 8, vF)) : r("", !0),
			t.field.sortable ? (_(), i("button", {
				key: 1,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => t.arrayItemMoveDown(t.value, c)
			}, [...o[2] ||= [a("i", { class: "bi bi-arrow-down" }, null, -1)]], 8, yF)) : r("", !0),
			a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-danger p-1 me-1",
				onClick: (e) => t.arrayRemoveItem(t.value, c)
			}, [...o[3] ||= [a("i", { class: "bi bi-trash" }, null, -1)]], 8, bF)
		], 2)]))), 128)),
		t.item[t.field.name] && t.item[t.field.name].length ? (_(), i("hr", xF)) : r("", !0),
		a("div", SF, [a("div", CF, [a("div", wF, [(_(!0), i(e, null, y(t.field.elements, (e) => (_(), i("div", {
			key: e,
			class: m(e.class || "col")
		}, [a("div", TF, [
			e.prefix ? (_(), i("span", EF, x(e.prefix), 1)) : r("", !0),
			e.type == "select" && (!e.relation || e.relation && e.relation.items) ? (_(), n(d, {
				key: 1,
				modelValue: e.value,
				"onUpdate:modelValue": (t) => e.value = t,
				field: Object.assign({}, e, { required: !1 }),
				item: t.item,
				settings: t.settings,
				formId: t.formId,
				optionValue: "object"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"field",
				"item",
				"settings",
				"formId"
			])) : D((_(), i("input", {
				key: 2,
				type: e.type,
				placeholder: e.placeholder || "",
				class: "form-control form-control-sm",
				"onUpdate:modelValue": (t) => e.value = t
			}, null, 8, DF)), [[w, e.value]]),
			e.suffix ? (_(), i("span", OF, x(e.suffix), 1)) : r("", !0)
		]), r("", !0)], 2))), 128))])]), a("div", { class: m(t.addButton.wrapperClass) }, [a("button", {
			type: "button",
			class: m(t.addButton.class),
			onClick: o[0] ||= (e) => t.arrayAddNewItem(t.field, t.item)
		}, [t.addButton.icon ? (_(), i("i", {
			key: 0,
			class: m(t.addButton.icon)
		}, null, 2)) : r("", !0), t.addButton.label ? (_(), i("span", {
			key: 1,
			innerHTML: t.getValueOrFunction(t.addButton.label, t.item)
		}, null, 8, kF)) : r("", !0)], 2)], 2)])
	]);
}
// src/components/VuAdminFormGroup.vue
var jF = {
	props: {
		modelValue: Object,
		group: Object,
		formId: String,
		settings: Object,
		auth: Object
	},
	data: function() {
		return { item: {} };
	},
	created() {},
	mounted() {
		this.item = this.modelValue;
	},
	watch: { modelValue(e) {
		this.item = this.modelValue;
	} },
	methods: {
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
		},
		selectOptions(e, t) {
			return typeof e == "function" ? e(this.item, t, this) : e;
		},
		renderOptions(e, t, n) {
			let r = [];
			if (!e || !e.length) return [];
			for (let i of e) r.push({
				value: i[t],
				label: i[n] ? i[n] : i[t]
			});
			return r;
		},
		arrayAddNewItem(e, t) {
			t[e.name] && typeof t[e.name] == "object" || (t[e.name] = []);
			let n = {};
			for (let t in e.elements) {
				let r = e.elements[t];
				n[t] = r.value, r.value = void 0;
			}
			t[e.name].push(n);
		},
		arrayRemoveItem(e, t) {
			e.splice(t, 1);
		},
		arrayItemMoveUp(e, t) {
			ll(e, t);
		},
		arrayItemMoveDown(e, t) {
			ul(e, t);
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
		dropdownSelectToggleOne(e, t, n) {
			al(t, n.value ? n.value : n);
		},
		dropdownSelectAll(e, t) {
			ol(e, t);
		},
		dropdownSelectInvert(e, t) {
			sl(e, t);
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? cl(e) : e.value = null;
		}
	},
	components: {
		HtmlEditor: jM,
		FileUpload: iF,
		VuAdminFormSelect: lF,
		VuAdminFormList: /* @__PURE__ */ Jk(uF, [["render", AF]])
	}
}, MF = { class: "row m-1" }, NF = ["innerHTML"], PF = {
	key: 1,
	class: "row"
}, FF = { class: "form-group pb-3" }, IF = { key: 0 }, LF = {
	key: 0,
	class: "badge text-secondary fw-light"
}, RF = ["for", "innerHTML"], zF = {
	key: 1,
	class: "input-group"
}, BF = ["innerHTML"], VF = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"disabled",
	"readonly",
	"required"
], HF = [
	"name",
	"id",
	"onUpdate:modelValue",
	"min",
	"max",
	"step",
	"placeholder",
	"disabled",
	"readonly",
	"required"
], UF = [
	"type",
	"name",
	"id",
	"onUpdate:modelValue",
	"min",
	"max",
	"disabled",
	"readonly",
	"required"
], WF = {
	key: 4,
	class: "form-check"
}, GF = [
	"name",
	"id",
	"true-value",
	"false-value",
	"onUpdate:modelValue",
	"disabled",
	"readonly",
	"required"
], KF = ["for"], qF = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"readonly",
	"disabled",
	"required"
], JF = [
	"name",
	"id",
	"onUpdate:modelValue",
	"rows",
	"minlength",
	"maxlength",
	"placeholder",
	"disabled",
	"readonly",
	"required"
], YF = ["innerHTML"], XF = { key: 5 }, ZF = { class: "dropdown d-inline-block" }, QF = { class: "dropdown-menu" }, $F = ["onClick"], eI = {
	key: 0,
	class: "bi bi-check-square"
}, tI = {
	key: 1,
	class: "bi bi-square"
}, nI = ["onClick"], rI = ["onClick"], iI = ["onClick"], aI = ["onClick"], oI = { key: 6 }, sI = { key: 0 }, cI = ["for"], lI = [
	"name",
	"id",
	"onUpdate:modelValue"
], uI = ["onClick"], dI = ["innerHTML"], fI = {
	key: 8,
	class: "p-1"
}, pI = ["innerHTML"];
function mI(t, s, c, l, u, d) {
	let f = b("VuAdminFormSelect"), p = b("HtmlEditor"), h = b("FileUpload"), g = b("VuAdminFormList");
	return _(), i("div", MF, [(_(!0), i(e, null, y(t.settings.form.groups, (c) => (_(), i("div", {
		key: c,
		class: m([c.class ? c.class : "col-md-12"])
	}, [c.title ? (_(), i("h2", {
		key: 0,
		class: "form-row-title mb-4 fw-lighter",
		innerHTML: c.title ? c.title : ""
	}, null, 8, NF)) : r("", !0), t.item && c.fields ? (_(), i("div", PF, [(_(!0), i(e, null, y(c.fields, (c) => (_(), i("div", {
		class: m([t.getValueOrFunction(c.class ? c.class : "col-md-12"), "input_type_" + c.type]),
		key: c
	}, [a("div", FF, [
		c.label ? (_(), i("span", IF, [[
			"html",
			"image",
			"upload"
		].indexOf(c.type) >= 0 ? (_(), i("label", {
			key: 0,
			class: m([{ required: c.required }, "form-label text-secondary mb-1"])
		}, [o(x(c.label ? c.label : t.translate(c.name)) + " ", 1), c.maxlength ? (_(), i("span", LF, x(t.item[c.name] ? t.item[c.name].length : 0) + " / " + x(c.maxlength), 1)) : r("", !0)], 2)) : (_(), i("label", {
			key: 1,
			class: m([{ required: c.required }, "form-label text-secondary mb-1"]),
			for: t.formId + "_" + c.name,
			innerHTML: t.getValueOrFunction(c.label ? c.label : t.translate(c.name), {
				field: c,
				item: t.item
			})
		}, null, 10, RF))])) : r("", !0),
		[
			"html",
			"image",
			"list",
			"addresses",
			"template"
		].indexOf(c.type) < 0 ? (_(), i("div", zF, [
			c.prefix ? (_(), i("span", {
				key: 0,
				class: "input-group-text",
				innerHTML: t.getValueOrFunction(c.prefix, {
					field: c,
					item: t.item
				})
			}, null, 8, BF)) : r("", !0),
			c.type == "text" ? D((_(), i("input", {
				key: 1,
				class: m(["form-control", t.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: t.item
				})]),
				type: "text",
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				minlength: c.minlength,
				maxlength: c.maxlength,
				placeholder: c.placeholder ? c.placeholder : "",
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, VF)), [[E, t.item[c.name]]]) : r("", !0),
			c.type == "number" ? D((_(), i("input", {
				key: 2,
				class: m(["form-control", t.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: t.item
				})]),
				type: "number",
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				min: c.min,
				max: c.max,
				step: c.step,
				placeholder: c.placeholder ? c.placeholder : "",
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, HF)), [[E, t.item[c.name]]]) : r("", !0),
			[
				"date",
				"datetime",
				"datetime-local"
			].indexOf(c.type) >= 0 ? D((_(), i("input", {
				key: 3,
				class: m(["form-control", t.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: t.item
				})]),
				type: c.type,
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				min: c.min,
				max: c.max,
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, UF)), [[w, t.item[c.name]]]) : r("", !0),
			c.type == "checkbox" ? (_(), i("div", WF, [D(a("input", {
				class: m(["form-check-input", t.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: t.item
				})]),
				type: "checkbox",
				name: c.name,
				id: t.formId + "_" + c.name,
				"true-value": c.true == null || c.true,
				"false-value": c.false != null && c.false,
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, GF), [[C, t.item[c.name]]]), a("label", {
				class: "form-check-label cursor-pointer",
				for: t.formId + "_" + c.name
			}, x(c.checkbox), 9, KF)])) : r("", !0),
			c.type == "email" ? D((_(), i("input", {
				key: 5,
				autocomplete: "on",
				class: m(["form-control", t.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: t.item
				})]),
				type: "email",
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				minlength: c.minlength,
				maxlength: c.maxlength,
				placeholder: c.placeholder ? c.placeholder : "",
				readonly: c.readonly,
				disabled: c.disabled,
				required: c.required
			}, null, 10, qF)), [[E, t.item[c.name]]]) : r("", !0),
			c.type == "select" && (!c.relation || c.relation && c.relation.items) ? (_(), n(f, {
				key: 6,
				modelValue: t.item[c.name],
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				field: c,
				item: t.item,
				settings: t.settings,
				formId: t.formId,
				auth: t.auth
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"field",
				"item",
				"settings",
				"formId",
				"auth"
			])) : r("", !0),
			c.type == "textarea" ? D((_(), i("textarea", {
				key: 7,
				class: m(["form-control", t.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: t.item
				})]),
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => t.item[c.name] = e,
				rows: c.rows,
				minlength: c.minlength,
				maxlength: c.maxlength,
				placeholder: c.placeholder ? c.placeholder : "",
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, "              ", 10, JF)), [[E, t.item[c.name]]]) : r("", !0),
			c.suffix ? (_(), i("span", {
				key: 8,
				class: "input-group-text",
				innerHTML: t.getValueOrFunction(c.suffix, {
					field: c,
					item: t.item
				})
			}, null, 8, YF)) : r("", !0)
		])) : r("", !0),
		c.type == "html" ? (_(), n(p, {
			key: 2,
			modelValue: t.item[c.name],
			"onUpdate:modelValue": (e) => t.item[c.name] = e,
			tiptapOptions: c.tiptap,
			"form-item": t.item,
			"form-settings": t.settings
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"tiptapOptions",
			"form-item",
			"form-settings"
		])) : r("", !0),
		c.type == "image" || c.type == "upload" ? (_(), n(h, {
			key: 3,
			modelValue: t.item[c.name],
			"onUpdate:modelValue": (e) => t.item[c.name] = e,
			field: c,
			settings: t.settings
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"field",
			"settings"
		])) : r("", !0),
		c.type == "list" && (!c.relation || c.relation && c.relation.items) ? (_(), n(g, {
			key: 4,
			modelValue: t.item[c.name],
			"onUpdate:modelValue": (e) => t.item[c.name] = e,
			field: c,
			item: t.item,
			settings: t.settings,
			formId: t.formId
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"field",
			"item",
			"settings",
			"formId"
		])) : r("", !0),
		c.type == "dropdown" && t.item[c.name] ? (_(), i("div", XF, [a("div", ZF, [a("button", {
			class: m(["btn dropdown-toggle", [c.dropdown ? c.dropdown.class : ""]]),
			type: "button",
			"data-bs-auto-close": "outside",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false"
		}, [a("span", null, x(t.translate(t.getValueOrFunction(c.dropdown && c.dropdown.label !== void 0 ? c.dropdown.label : "Select", {
			field: c,
			item: t.item
		}))), 1)], 2), a("ul", QF, [
			a("li", null, [(_(!0), i(e, null, y(c.options, (e) => (_(), i("span", {
				key: e,
				class: m(["dropdown-item cursor-pointer", { selected: t.item[c.name].indexOf(e.value) >= 0 }]),
				onClick: (n) => t.dropdownSelectToggleOne(c, t.item[c.name], e)
			}, [t.item[c.name].indexOf(e.value) >= 0 ? (_(), i("i", eI)) : (_(), i("i", tI)), o(" " + x(t.translate(e.label ? e.label : e.value)), 1)], 10, $F))), 128))]),
			s[0] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
			a("li", null, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => t.dropdownSelectAll(t.item[c.name], c.options)
			}, x(t.translate("Select all")), 9, nI)]),
			a("li", null, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => t.dropdownSelectClear(t.item[c.name])
			}, x(t.translate("Unselect all")), 9, rI)]),
			a("li", null, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => t.dropdownSelectInvert(t.item[c.name], c.options)
			}, x(t.translate("Invert all")), 9, iI)])
		])]), t.item[c.name].length && !(c.list && c.list.hidden) ? (_(), i("span", {
			key: 0,
			class: m([c.list && c.list.wrapperClass ? c.list.wrapperClass : "d-block mt-1"])
		}, [(_(!0), i(e, null, y(t.item[c.name], (e) => (_(), i("span", {
			class: m(["cursor-pointer", [c.list ? c.list.class : ""]]),
			key: e,
			onClick: (n) => t.dropdownSelectToggleOne(c, t.item[c.name], e)
		}, [o(x(t.translate(e)) + " ", 1), s[1] ||= a("i", { class: "bi bi-x" }, null, -1)], 10, aI))), 128))], 2)) : r("", !0)])) : r("", !0),
		c.type == "addresses" ? (_(), i("span", oI, [t.item[c.name] ? (_(), i("div", sI, [(_(!0), i(e, null, y(t.item[c.name], (e) => (_(), i("div", { key: e }, [
			o(x(e) + " ", 1),
			a("label", {
				class: "form-label text-secondary mb-1",
				for: t.formId + "_" + c.name
			}, x(c.label), 9, cI),
			D(a("input", {
				class: "form-control",
				type: "text",
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (t) => e.country = t
			}, null, 8, lI), [[E, e.country]])
		]))), 128))])) : r("", !0), a("button", {
			type: "button",
			class: "btn btn-sm btn-secondary",
			onClick: (e) => t.insertAddress(c.name)
		}, " Add ", 8, uI)])) : r("", !0),
		c.type == "template" ? (_(), i("div", {
			key: 7,
			innerHTML: t.getValueOrFunction(c.template, {
				field: c,
				item: t.item
			})
		}, null, 8, dI)) : r("", !0),
		c.description ? (_(), i("div", fI, [a("small", null, [a("i", {
			class: "text-muted",
			innerHTML: t.getValueOrFunction(c.description, {
				field: c,
				item: t.item
			})
		}, null, 8, pI)])])) : r("", !0)
	])], 2))), 128))])) : r("", !0)], 2))), 128))]);
}
// src/components/VuAdminForm.vue
var hI = {
	props: {
		modelValue: Object,
		modalWindow: Object,
		saveItem: Function,
		reloadTable: Function,
		fetchRelation: Function,
		group: Object,
		formId: String,
		settings: Object,
		auth: Object,
		saveProgress: {
			type: Object,
			default: null
		}
	},
	computed: {
		saveProgressLabel() {
			let e = this.saveProgress;
			if (!e?.active) return "";
			if (e.phase === "upload" && e.uploadTotal > 0) {
				let t = `${e.uploadCurrent}/${e.uploadTotal}`, n = e.uploadField || "", r = e.uploadTypeKey || "", i = e.uploadPresetSize ? ` (${e.uploadPresetSize})` : "", a = e.uploadFileName ? ` — ${e.uploadFileName}` : "", o = [n, r].filter(Boolean).join(" / ");
				return `${this.translate("Uploading")} ${t}${o ? ` — ${o}${i}` : ""}${a}`;
			}
			return e.phase === "persist" ? this.translate("Saving uploaded files...") : this.translate("Saving...");
		},
		saveProgressPercent() {
			let e = this.saveProgress;
			if (!e?.uploadTotal) return 0;
			let t = e.uploadCompleted ?? e.uploadCurrent ?? 0;
			return Math.min(100, Math.round(t / e.uploadTotal * 100));
		},
		overlayCenterMessage() {
			return this.saveProgress?.active ? this.saveProgressLabel : this.fileOverlayMessage ? this.fileOverlayMessage : this.ui.wait.form ? this.translate("Loading...") : "";
		},
		overlayShowUploadProgress() {
			return !!(this.saveProgress?.active && this.saveProgress.uploadTotal > 0);
		}
	},
	provide() {
		return {
			setFormOverlayMessage: (e) => {
				this.fileOverlayMessage = e || null;
			},
			handleFormErrors: (e) => {
				this.handleFormErrors(e);
			}
		};
	},
	data: function() {
		return {
			item: {},
			loaded: !1,
			fileOverlayMessage: null,
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
	created() {},
	mounted() {
		this.item = this.modelValue;
		let e = this.item[this.settings.pkey];
		this.fetchItem(e, this.settings, this.auth);
	},
	watch: {
		modelValue(e) {
			this.item = this.modelValue;
		},
		saveProgress: {
			handler(e) {
				e?.active ? this.formWait(!0) : this.formNoWait();
			},
			deep: !0
		}
	},
	methods: {
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
		},
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		},
		getButtonClassByAction(e) {
			return Rl(e);
		},
		getButtonIconClassByAction(e) {
			return Bl(e);
		},
		buttonIconClass(e) {
			return zl(e);
		},
		formWait(e) {
			this.ui.wait.form = !0, this.ui.block.form = e;
		},
		formNoWait() {
			this.ui.wait.form = !1, this.ui.block.form = !1;
		},
		addFormMessage(e, t, n, r) {
			this.addMessage("form", e, t, n, r);
		},
		handleFormErrors(e) {
			if (e == null) return;
			let t = 14500, n = "danger";
			if (e instanceof Error) this.addFormMessage(e.message, t, n);
			else if (typeof e == "string") this.addFormMessage(e, t, n);
			else if (Array.isArray(e)) for (let r of e) r && typeof r == "object" && r.message ? this.addFormMessage(r.message, r.timeout || t, r.priority || n) : typeof r == "string" ? this.addFormMessage(r, t, n) : r && typeof r == "object" && this.addFormMessage(JSON.stringify(r), t, n);
			else typeof e == "object" && e.message ? this.addFormMessage(e.message, e.timeout || t, e.priority || n) : this.addFormMessage(String(e), t, n);
		},
		addMessage(e, t, n, r, i) {
			clearTimeout(this.messageTimeout);
			let a = `${Date.now().toString(36)}-${Jc(8)}`;
			this.message[e] = {
				uid: a,
				msg: t,
				timeout: n === void 0 ? 2500 : n,
				datetime: (/* @__PURE__ */ new Date()).toLocaleString("hu-HU"),
				priority: r || "secondary",
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
		async fetchItem(e, t, n) {
			try {
				if (t ||= this.settings, !t.form || !t.form.api) return !1;
				this.formWait(!0);
				let r;
				if (e) {
					let i = await fetch(Xc("GET", t.form.api, e), Yc("GET", t.form.api, null, n)).catch((e) => (console.error("[vu-admin] fetchItem network error:", e), null)), a = await Fc(i), o = Hc(i, a);
					if (o) return this.handleFormErrors(o), this.formNoWait(), !1;
					if (!a.data) return this.handleFormErrors(this.translate("Empty response")), this.formNoWait(), !1;
					t.form.default && (a.data = Object.assign({}, t.form.default, a.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(a.data, i), r = t.form.api.input.item ? typeof t.form.api.input.item == "string" ? a.data[t.form.api.input.item] : t.form.api.input.item(a.data, i) : a.data;
				} else r = t.form.default ? Object.assign({}, t.form.default) : {};
				let i = [];
				for (let e of t.form.groups) for (let a of e.fields) a.type === "dropdown" && a.name !== "__proto__" && a.name !== "constructor" && a.name !== "prototype" && !r[a.name] && (r[a.name] = []), a.relation && t.relations && t.relations[a.relation.config] && (a.relation = Nc(t.relations[a.relation.config], a.relation), i.push(this.fetchRelation(a, [r], n)));
				await Promise.all(i), t.debug && console.log("[vu-admin] fetchItem:", e, r), this.item = $c(r), this.itemOriginal = Object.assign({}, r), this.loaded = !0, this.formNoWait();
			} catch (e) {
				console.error("[vu-admin] fetchItem error:", e), this.handleFormErrors(e), this.formNoWait();
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
				let n = {};
				n = this.settings.form.api.input.item ? typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t) : t, n && (this.addFormMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${n[this.settings.pkey]} )</small>`, 2500), this.item = $c(n), this.itemOriginal = Object.assign({}, n)), e === !0 && this.modalWindow.hide(), this.reloadTable();
			}, (e) => {
				this.handleFormErrors(e);
			});
		},
		async deleteItem(e, t) {
			try {
				e ||= this.item;
				let n = e[this.settings.pkey];
				if (!n || !confirm("Are you sure you want to delete this item?")) return;
				this.formWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(e);
				let r = await fetch(Xc("DELETE", this.settings.form.api, n, t), Yc("DELETE", this.settings.form.api, null, this.auth)).catch((e) => (console.error("[vu-admin] deleteItem network error:", e), null)), i = await Fc(r), a = Hc(r, i);
				if (a) {
					this.handleFormErrors(a), this.formNoWait();
					return;
				}
				this.item && (this.item = {}, this.modalWindow.hide());
				let o = i.data === void 0 ? null : i.data;
				this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(o, r), this.reloadTable(), this.formNoWait();
			} catch (e) {
				console.error("[vu-admin] deleteItem error:", e), this.handleFormErrors(e), this.formNoWait();
			}
		},
		formAction(e, t) {
			t.$event && t.$event.stopPropagation();
			let n = e.action ? e.action : e.click ? e.click : null;
			if (n && typeof n != "string") n(t.item, t, this);
			else switch (n) {
				case "FORM_RELOAD":
					if (!this.item[this.settings.pkey]) return;
					this.reloadItem();
					break;
				case "FORM_NEW":
					this.createItem();
					break;
				case "FORM_COPY":
					this.copyItem();
					break;
				case "FORM_DELETE":
					if (!this.item[this.settings.pkey]) return;
					this.deleteItem();
					break;
				case "FORM_CLOSE":
					this.modalWindow.hide();
					break;
				case "FORM_SAVE":
					this.submit();
					break;
				case "FORM_SAVE_AND_CLOSE": this.submitAndClose();
			}
		}
	},
	components: { VuAdminFormGroup: /* @__PURE__ */ Jk(jF, [["render", mI]]) }
}, gI = ["id", "data-bs-theme"], _I = {
	key: 0,
	class: "vua-overlay-panel text-center px-4 py-3"
}, vI = { class: "vua-overlay-message" }, yI = {
	key: 0,
	class: "vua-overlay-preset text-muted small mt-2"
}, bI = { class: "badge bg-secondary-subtle text-secondary-emphasis text-uppercase" }, xI = {
	key: 0,
	class: "ms-2"
}, SI = {
	key: 1,
	class: "ms-1 text-uppercase"
}, CI = {
	key: 1,
	class: "progress mt-3 mx-auto",
	style: {
		width: "240px",
		height: "8px"
	}
}, wI = ["aria-valuenow", "aria-valuemax"], TI = { class: "modal-header" }, EI = {
	key: 0,
	class: "modal-title"
}, DI = ["innerHTML"], OI = { key: 1 }, kI = { key: 2 }, AI = {
	key: 3,
	class: "rounded border ms-2 px-2 py-0 fs-6"
}, jI = {
	key: 1,
	class: "d-inline-block ms-3 mt-1"
}, MI = ["innerHTML"], NI = {
	key: 2,
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, PI = ["disabled"], FI = {
	key: 0,
	class: "modal-header bg-body sticky-top"
}, II = {
	key: 0,
	class: "d-inline-block m-1"
}, LI = { class: "dropdown d-inline-block" }, RI = ["innerHTML"], zI = { class: "dropdown-menu text-start" }, BI = { class: "me-2 text-muted" }, VI = ["innerHTML"], HI = ["disabled", "onClick"], UI = {
	key: 1,
	class: "dropdown d-inline-block"
}, WI = ["disabled"], GI = { class: "mx-1" }, KI = { class: "dropdown-menu px-2" }, qI = ["onClick"], JI = {
	key: 1,
	class: "modal-body custom-scroll"
}, YI = {
	key: 2,
	class: "modal-footer d-flex justify-content-between"
}, XI = {
	key: 3,
	class: "bg-light text-dark"
};
function ZI(t, s, c, l, u, d) {
	let f = b("VuAdminFormGroup");
	return t.item ? (_(), i("form", {
		key: 0,
		ref: "form",
		id: t.formId,
		class: m(["form", [t.settings.form.class, { wait: t.ui.wait.form }]]),
		onSubmit: s[1] ||= O((...e) => t.submitItem && t.submitItem(...e), ["prevent"]),
		"data-bs-theme": [t.settings.theme]
	}, [
		a("div", { class: m(["vua-overlay", {
			blocked: !!t.overlayCenterMessage,
			immediate: !!t.overlayCenterMessage
		}]) }, [t.overlayCenterMessage ? (_(), i("div", _I, [
			s[2] ||= a("div", {
				class: "spinner-border text-primary mb-3",
				role: "status"
			}, [a("span", { class: "visually-hidden" }, "Loading...")], -1),
			a("div", vI, x(t.overlayCenterMessage), 1),
			t.saveProgress?.uploadTypeKey ? (_(), i("div", yI, [
				a("span", bI, x(t.saveProgress.uploadTypeKey), 1),
				t.saveProgress.uploadPresetSize ? (_(), i("span", xI, x(t.saveProgress.uploadPresetSize), 1)) : r("", !0),
				t.saveProgress.uploadExtension ? (_(), i("span", SI, "." + x(t.saveProgress.uploadExtension), 1)) : r("", !0)
			])) : r("", !0),
			t.overlayShowUploadProgress ? (_(), i("div", CI, [a("div", {
				class: "progress-bar progress-bar-striped progress-bar-animated",
				role: "progressbar",
				style: h({ width: t.saveProgressPercent + "%" }),
				"aria-valuenow": t.saveProgress.uploadCurrent,
				"aria-valuemin": 0,
				"aria-valuemax": t.saveProgress.uploadTotal
			}, null, 12, wI)])) : r("", !0)
		])) : r("", !0)], 2),
		a("div", TI, [
			t.loaded ? (_(), i("h5", EI, [
				t.settings.form.title && typeof t.settings.form.title == "function" ? (_(), i("span", {
					key: 0,
					innerHTML: t.settings.form.title(t.item, t.settings)
				}, null, 8, DI)) : r("", !0),
				t.settings.form.title && typeof t.settings.form.title == "string" ? (_(), i("span", OI, x(t.translate(t.settings.form.title)), 1)) : r("", !0),
				t.settings.form.title ? r("", !0) : (_(), i("span", kI, x(t.translate("Edit")), 1)),
				t.item[t.settings.pkey] ? (_(), i("small", AI, [s[3] ||= a("span", { class: "text-muted fw-light" }, "id", -1), o(" " + x(t.item[t.settings.pkey]), 1)])) : r("", !0)
			])) : r("", !0),
			t.message.form ? (_(), i("span", jI, [a("span", { class: m(["text-" + t.message.form.priority]) }, [s[4] ||= a("i", { class: "bi bi-envelope-fill me-2" }, null, -1), a("span", { innerHTML: t.message.form.msg }, null, 8, MI)], 2)])) : r("", !0),
			t.ui.wait.form && !t.overlayCenterMessage ? (_(), i("span", NI, [...s[5] ||= [a("span", { class: "visually-hidden" }, "Loading...", -1)]])) : r("", !0),
			a("button", {
				type: "button",
				class: "btn-close",
				"data-bs-dismiss": "modal",
				"aria-label": "Close",
				disabled: t.saveProgress?.active && t.saveProgress?.warnLeave
			}, null, 8, PI)
		]),
		t.item ? (_(), i("div", FI, [t.settings.form.control ? (_(), i("div", {
			key: 0,
			class: m(["w-100", t.settings.form.control.class == null ? "d-flex justify-content-center" : t.settings.form.control.class])
		}, [t.messages.form.length ? (_(), i("span", II, [a("div", LI, [a("button", {
			class: m(["btn btn-sm dropdown-toggle", ["btn-" + t.messages.form[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: t.messages.form.length + " " + (t.messages.form.length > 1 ? t.translate("messages") : t.translate("message"))
		}, null, 10, RI), a("ul", zI, [(_(!0), i(e, null, y(t.messages.form, (e) => (_(), i("li", { key: e }, [a("span", { class: m(["dropdown-item disabled", ["text-" + e.priority]]) }, [a("small", BI, x(e.datetime), 1), a("span", { innerHTML: e.msg }, null, 8, VI)], 2)]))), 128))])])])) : r("", !0), (_(!0), i(e, null, y(t.settings.form.control.buttons, (n) => (_(), i("span", { key: n.action }, [n.dropdowns ? r("", !0) : (_(), i("button", {
			key: 0,
			type: "button",
			disabled: t.saveProgress?.active || n.disabled !== void 0 && t.getValueOrFunction(n.disabled, {
				button: n,
				item: t.item,
				form: this
			}),
			class: m([n.class ? n.class : t.getButtonClassByAction(n.action)]),
			onClick: (e) => t.formAction(n, {
				button: n,
				item: t.item,
				form: this,
				$event: e
			})
		}, [a("i", { class: m(t.buttonIconClass(n.icon === void 0 ? t.getButtonIconClassByAction(n.action) : t.getValueOrFunction(n.icon, {
			button: n,
			item: t.item,
			form: this
		}))) }, null, 2), o(" " + x(t.translate(n.title)), 1)], 10, HI)), n.dropdowns ? (_(), i("div", UI, [a("button", {
			type: "button",
			class: m([[n.class], "dropdown-toggle"]),
			"data-bs-toggle": "dropdown",
			"data-bs-auto-close": "outside",
			"aria-expanded": "false",
			disabled: t.saveProgress?.active
		}, [a("span", GI, [a("i", { class: m(t.buttonIconClass(n.icon === void 0 ? t.getButtonIconClassByAction(n.action) : t.getValueOrFunction(n.icon, {
			button: n,
			table: this
		}))) }, null, 2), o(" " + x(t.translate(n.title)), 1)])], 10, WI), a("ul", KI, [(_(!0), i(e, null, y(n.dropdowns, (e) => (_(), i("li", { key: e }, [a("span", {
			class: m([e.class ? e.class : ""]),
			onClick: (r) => t.formAction(e, {
				button: n,
				item: t.item,
				form: this,
				$event: r
			})
		}, [e.icon ? (_(), i("i", {
			key: 0,
			class: m(t.buttonIconClass(e.icon))
		}, null, 2)) : r("", !0), o(" " + x(t.translate(e.title)), 1)], 10, qI)]))), 128))])])) : r("", !0)]))), 128))], 2)) : r("", !0)])) : r("", !0),
		t.settings.form ? (_(), i("div", JI, [t.settings.form.visible && t.settings.form.groups ? (_(), n(f, {
			key: 0,
			modelValue: t.item,
			"onUpdate:modelValue": s[0] ||= (e) => t.item = e,
			formid: t.formId,
			settings: t.settings
		}, null, 8, [
			"modelValue",
			"formid",
			"settings"
		])) : r("", !0)])) : r("", !0),
		t.item ? (_(), i("div", YI)) : r("", !0),
		t.settings.debug > 1 ? (_(), i("pre", XI, "        " + x(t.item) + "\n    ", 1)) : r("", !0)
	], 42, gI)) : r("", !0);
}
var QI = /*#__PURE__*/ Jk(hI, [["render", ZI]]), $I = {
	name: "VuAdminTablePagination",
	emits: [
		"setPage",
		"setPageLimit",
		"translate"
	],
	props: {
		config: Object,
		settings: Object,
		ui: Object
	},
	data() {
		return { isMobile: typeof window < "u" && window.matchMedia("(max-width: 767.98px)").matches };
	},
	mounted() {
		typeof window < "u" && (this._mq = window.matchMedia("(max-width: 767.98px)"), this._mqHandler = (e) => {
			this.isMobile = e.matches;
		}, this._mq.addEventListener("change", this._mqHandler));
	},
	beforeUnmount() {
		this._mq && this._mq.removeEventListener("change", this._mqHandler);
	},
	methods: {
		visiblePageNumbers() {
			let e = this.config.pagination.numbers;
			if (!this.isMobile || !e || e.length <= 3) return e;
			let t = e.indexOf(this.config.pagination.page) - 1;
			return t < 0 && (t = 0), t + 3 > e.length && (t = e.length - 3), e.slice(t, t + 3);
		},
		setPage(e) {
			this.$emit("setPage", e);
		},
		setPageLimit(e) {
			this.$emit("setPageLimit", e);
		},
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
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
}, eL = {
	key: 0,
	"aria-label": "Page navigation",
	class: "mt-2 d-flex flex-wrap align-items-center justify-content-between gap-2"
}, tL = { class: "d-flex align-items-center" }, nL = { class: "mx-1 small" }, rL = { key: 0 }, iL = {
	key: 0,
	class: "dropdown d-none d-md-inline-block m-1"
}, aL = {
	type: "button",
	class: "btn btn-sm btn-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, oL = { class: "ms-1" }, sL = { class: "dropdown-menu text-end" }, cL = ["onClick"], lL = { class: "ms-2" }, uL = {
	key: 0,
	class: "bi bi-check-circle-fill ms-2"
}, dL = {
	key: 1,
	class: "bi bi-circle ms-2"
}, fL = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, pL = { class: "pagination pagination-sm m-1" }, mL = { class: "page-item" }, hL = ["aria-label"], gL = ["innerHTML"], _L = { class: "page-item" }, vL = ["aria-label"], yL = ["innerHTML"], bL = ["onClick"], xL = { class: "page-item" }, SL = ["aria-label"], CL = ["innerHTML"], wL = {
	key: 0,
	class: "page-item"
}, TL = ["aria-label"], EL = ["innerHTML"];
function DL(t, n, o, s, c, l) {
	return o.config.pagination.hidden ? r("", !0) : (_(), i("nav", eL, [a("div", tL, [
		D(a("span", nL, [a("strong", null, x(o.config.pagination.from) + "-" + x(o.config.pagination.to), 1), o.config.pagination.total ? (_(), i("span", rL, " / " + x(o.config.pagination.total), 1)) : r("", !0)], 512), [[ee, o.config.pagination.from > 0]]),
		o.config.pagination.limits ? (_(), i("div", iL, [a("button", aL, [a("strong", null, x(o.config.pagination.limit), 1), a("small", oL, x(l.translate("row")) + "/" + x(l.translate("page")), 1)]), a("ul", sL, [a("li", null, [(_(!0), i(e, null, y(o.config.pagination.limits, (e) => (_(), i("span", {
			class: m(["dropdown-item cursor-pointer", { selected: o.config.pagination.limit == e }]),
			key: e,
			onClick: (t) => l.setPageLimit(e)
		}, [
			a("strong", null, x(e), 1),
			a("small", lL, x(l.translate("row")) + "/" + x(l.translate("page")), 1),
			o.config.pagination.limit == e ? (_(), i("i", uL)) : r("", !0),
			o.config.pagination.limit == e ? r("", !0) : (_(), i("i", dL))
		], 10, cL))), 128))])])])) : r("", !0),
		D(a("div", fL, [...n[4] ||= [a("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[ee, o.ui && o.ui.wait.table]])
	]), a("ul", pL, [
		a("li", mL, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.firstDisabled() }]),
			onClick: n[0] ||= (e) => l.setPage(1),
			"aria-label": l.translate("First")
		}, [a("span", {
			"aria-hidden": "true",
			class: "d-none d-md-inline",
			innerHTML: l.translate("First")
		}, null, 8, gL), n[5] ||= a("i", {
			"aria-hidden": "true",
			class: "bi bi-chevron-double-left d-md-none"
		}, null, -1)], 10, hL)]),
		a("li", _L, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.prevDisabled() }]),
			onClick: n[1] ||= (e) => l.setPage(o.config.pagination.page - 1),
			"aria-label": l.translate("Prev")
		}, [a("span", {
			"aria-hidden": "true",
			class: "d-none d-md-inline",
			innerHTML: l.translate("Prev")
		}, null, 8, yL), n[6] ||= a("i", {
			"aria-hidden": "true",
			class: "bi bi-chevron-left d-md-none"
		}, null, -1)], 10, vL)]),
		(_(!0), i(e, null, y(l.visiblePageNumbers(), (e) => (_(), i("li", {
			key: e,
			class: "page-item"
		}, [a("a", {
			class: m(["page-link cursor-pointer", {
				disabled: e > o.config.pagination.pages,
				current: e == o.config.pagination.page
			}]),
			onClick: (t) => l.setPage(e)
		}, x(e), 11, bL)]))), 128)),
		a("li", xL, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.nextDisabled() }]),
			onClick: n[2] ||= (e) => l.setPage(o.config.pagination.page + 1),
			"aria-label": l.translate("Next")
		}, [a("span", {
			"aria-hidden": "true",
			class: "d-none d-md-inline",
			innerHTML: l.translate("Next")
		}, null, 8, CL), n[7] ||= a("i", {
			"aria-hidden": "true",
			class: "bi bi-chevron-right d-md-none"
		}, null, -1)], 10, SL)]),
		o.config.pagination.total ? (_(), i("li", wL, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.lastDisabled() }]),
			onClick: n[3] ||= (e) => l.setPage(o.config.pagination.pages),
			"aria-label": l.translate("Last")
		}, [a("span", {
			"aria-hidden": "true",
			class: "d-none d-md-inline",
			innerHTML: l.translate("Last")
		}, null, 8, EL), n[8] ||= a("i", {
			"aria-hidden": "true",
			class: "bi bi-chevron-double-right d-md-none"
		}, null, -1)], 10, TL)])) : r("", !0)
	])]));
}
var OL = /*#__PURE__*/ Jk($I, [["render", DL]]), kL = {
	name: "VuAdminTableFilterField",
	props: {
		column: Object,
		settings: Object,
		items: [Array, Object],
		table: Object,
		reloadTable: Function,
		tableAction: Function
	},
	methods: {
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
		},
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this.table);
		},
		getButtonClassByAction(e) {
			return Rl(e);
		},
		getButtonIconClassByAction(e) {
			return Bl(e);
		},
		dropdownSelectToggleOne(e, t) {
			let n = t.value;
			e.multiple ? (Array.isArray(e.value) || (e.value = []), al(e.value, n)) : e.value = e.value === n ? null : n, this.reloadTable();
		},
		dropdownSelectAll(e, t) {
			ol(e, t), this.reloadTable();
		},
		dropdownSelectInvert(e, t) {
			sl(e, t), this.reloadTable();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? cl(e) : e.value = null, this.reloadTable();
		}
	}
}, AL = {
	key: 0,
	class: "input-group input-group-sm my-1"
}, jL = ["disabled"], ML = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, NL = ["disabled"], PL = { value: "=" }, FL = { value: ">" }, IL = { value: ">=" }, LL = { value: "<" }, RL = { value: "<=" }, zL = ["disabled"], BL = ["value"], VL = [
	"disabled",
	"min",
	"max"
], HL = ["disabled"], UL = { key: 2 }, WL = {
	key: 0,
	class: "dropdown"
}, GL = {
	class: "btn btn-sm btn-secondary dropdown-toggle my-1",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, KL = { class: "dropdown-menu" }, qL = ["onClick"], JL = {
	key: 0,
	class: "bi bi-check-square"
}, YL = {
	key: 1,
	class: "bi bi-square"
}, XL = { key: 0 }, ZL = { key: 1 }, QL = { key: 2 }, $L = { key: 3 }, eR = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, tR = ["multiple"], nR = ["value"], rR = ["disabled"], iR = {
	key: 3,
	class: "input-group input-group-sm my-1"
}, aR = { value: "=" }, oR = { value: ">" }, sR = { value: ">=" }, cR = { value: "<" }, lR = { value: "<=" }, uR = ["value"], dR = ["type"], fR = ["disabled"], pR = ["disabled", "onClick"];
function mR(t, n, s, c, l, u) {
	return _(), i("div", null, [
		s.column.filter && s.column.filter.type == "text" ? (_(), i("div", AL, [D(a("input", {
			type: "text",
			class: m([{ fixed: s.column.filter.fixed }, "form-control form-control-sm"]),
			"onUpdate:modelValue": n[0] ||= (e) => s.column.filter.value = e,
			onKeyup: n[1] ||= ne((e) => s.reloadTable(), ["enter"])
		}, null, 34), [[E, s.column.filter.value]]), s.column.filter.buttonx && s.column.filter.buttonx != 0 ? (_(), i("button", {
			key: 0,
			class: m(["btn btn-outline-secondary", { "opacity-25": s.column.filter.value == null }]),
			disabled: s.column.filter.value == null,
			onClick: n[2] ||= (e) => {
				s.column.filter.value = void 0, s.reloadTable();
			}
		}, [...n[25] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, jL)) : r("", !0)])) : r("", !0),
		s.column.filter && s.column.filter.type == "number" ? (_(), i("div", ML, [
			s.column.filter.operators == 1 ? D((_(), i("select", {
				key: 0,
				"onUpdate:modelValue": n[3] ||= (e) => s.column.filter.operator = e,
				disabled: s.column.filter.fixed,
				onChange: n[4] ||= (e) => s.reloadTable(),
				class: "form-select form-select-sm pe-0"
			}, [
				a("option", PL, x(u.translate("=")), 1),
				a("option", FL, x(u.translate(">")), 1),
				a("option", IL, x(u.translate(">=")), 1),
				a("option", LL, x(u.translate("<")), 1),
				a("option", RL, x(u.translate("<=")), 1)
			], 40, NL)), [[T, s.column.filter.operator]]) : r("", !0),
			s.column.filter.operators && s.column.filter.operators.length > 0 ? D((_(), i("select", {
				key: 1,
				"onUpdate:modelValue": n[5] ||= (e) => s.column.filter.operator = e,
				disabled: s.column.filter.fixed,
				onChange: n[6] ||= (e) => s.reloadTable(),
				class: "form-select form-select-sm pe-0"
			}, [(_(!0), i(e, null, y(s.column.filter.operators, (e) => (_(), i("option", {
				key: e,
				value: e.value
			}, x(e.label), 9, BL))), 128))], 40, zL)), [[T, s.column.filter.operator]]) : r("", !0),
			D(a("input", {
				type: "number",
				class: m(["form-control", { fixed: s.column.filter.fixed }]),
				"onUpdate:modelValue": n[7] ||= (e) => s.column.filter.value = e,
				disabled: s.column.filter.fixed,
				min: s.column.filter.min,
				max: s.column.filter.max,
				onChange: n[8] ||= (e) => s.reloadTable(),
				onKeyup: n[9] ||= ne((e) => s.reloadTable(), ["enter"])
			}, null, 42, VL), [[E, s.column.filter.value]]),
			!s.column.filter.fixed && s.column.filter.buttonx && s.column.filter.buttonx != 0 ? (_(), i("button", {
				key: 2,
				class: m(["btn btn-outline-secondary", { "opacity-25": s.column.filter.value == null }]),
				disabled: s.column.filter.value == null,
				onClick: n[10] ||= (e) => {
					s.column.filter.value = void 0, s.reloadTable();
				}
			}, [...n[26] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, HL)) : r("", !0)
		])) : r("", !0),
		s.column.filter && s.column.filter.type == "select" ? (_(), i("div", UL, [s.column.filter.dropdown ? (_(), i("div", WL, [a("button", GL, x(s.column.filter.multiple ? (s.column.filter.value || []).length + " selected" : s.column.filter.value ? s.column.filter.value : "not selected"), 1), a("ul", KL, [
			a("li", null, [(_(!0), i(e, null, y(s.column.filter.options, (e) => (_(), i("span", {
				key: e,
				class: m(["dropdown-item cursor-pointer", { selected: s.column.filter.multiple ? (s.column.filter.value || []).indexOf(e.value) >= 0 : s.column.filter.value === e.value }]),
				onClick: (t) => u.dropdownSelectToggleOne(s.column.filter, e)
			}, [(s.column.filter.multiple ? (s.column.filter.value || []).indexOf(e.value) >= 0 : s.column.filter.value === e.value) ? (_(), i("i", JL)) : (_(), i("i", YL)), o(" " + x(u.translate(e.label ? e.label : e.value)), 1)], 10, qL))), 128))]),
			s.column.filter.multiple ? (_(), i("li", XL, [...n[27] ||= [a("hr", { class: "dropdown-divider" }, null, -1)]])) : r("", !0),
			s.column.filter.multiple ? (_(), i("li", ZL, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: n[11] ||= (e) => u.dropdownSelectAll(s.column.filter.value, s.column.filter.options)
			}, x(u.translate("Select all")), 1)])) : r("", !0),
			s.column.filter.multiple ? (_(), i("li", QL, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: n[12] ||= (e) => u.dropdownSelectClear(s.column.filter.value)
			}, x(u.translate("Unselect all")), 1)])) : r("", !0),
			s.column.filter.multiple ? (_(), i("li", $L, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: n[13] ||= (e) => u.dropdownSelectInvert(s.column.filter.value, s.column.filter.options)
			}, x(u.translate("Invert all")), 1)])) : r("", !0)
		])])) : (_(), i("div", eR, [D(a("select", {
			"onUpdate:modelValue": n[14] ||= (e) => s.column.filter.value = e,
			onChange: n[15] ||= (e) => s.reloadTable(),
			multiple: s.column.filter.multiple,
			class: "form-select form-select-sm pe-0"
		}, [(_(!0), i(e, null, y(s.column.filter.options, (e) => (_(), i("option", {
			key: e,
			value: e.value
		}, x(u.translate(e.label ? e.label : e.value)), 9, nR))), 128))], 40, tR), [[T, s.column.filter.value]]), s.column.filter.buttonx && s.column.filter.buttonx != 0 ? (_(), i("button", {
			key: 0,
			class: m(["btn btn-outline-secondary", { "opacity-25": s.column.filter.value == null }]),
			disabled: s.column.filter.value == null,
			onClick: n[16] ||= (e) => {
				s.column.filter.value = void 0, s.reloadTable();
			}
		}, [...n[28] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, rR)) : r("", !0)]))])) : r("", !0),
		s.column.filter && (s.column.filter.type == "datetime-local" || s.column.filter.type == "date") ? (_(), i("div", iR, [
			s.column.filter.operators == 1 ? D((_(), i("select", {
				key: 0,
				"onUpdate:modelValue": n[17] ||= (e) => s.column.filter.operator = e,
				onChange: n[18] ||= (e) => s.reloadTable(),
				class: "form-select form-select-sm pe-0"
			}, [
				a("option", aR, x(u.translate("=")), 1),
				a("option", oR, x(u.translate(">")), 1),
				a("option", sR, x(u.translate(">=")), 1),
				a("option", cR, x(u.translate("<")), 1),
				a("option", lR, x(u.translate("<=")), 1)
			], 544)), [[T, s.column.filter.operator]]) : r("", !0),
			s.column.filter.operators && s.column.filter.operators.length > 0 ? D((_(), i("select", {
				key: 1,
				"onUpdate:modelValue": n[19] ||= (e) => s.column.filter.operator = e,
				onChange: n[20] ||= (e) => s.reloadTable(),
				class: "form-select form-select-sm pe-0"
			}, [(_(!0), i(e, null, y(s.column.filter.operators, (e) => (_(), i("option", {
				key: e,
				value: e.value
			}, x(u.translate(e.label)), 9, uR))), 128))], 544)), [[T, s.column.filter.operator]]) : r("", !0),
			D(a("input", {
				type: s.column.filter.type,
				class: m([{ fixed: s.column.filter.fixed }, "form-control form-control-sm"]),
				"onUpdate:modelValue": n[21] ||= (e) => s.column.filter.value = e,
				onChange: n[22] ||= (e) => s.reloadTable(),
				onKeyup: n[23] ||= ne((e) => s.reloadTable(), ["enter"])
			}, null, 42, dR), [[w, s.column.filter.value]]),
			a("button", {
				class: m(["btn btn-outline-secondary", { "opacity-25": !s.column.filter.value }]),
				disabled: !s.column.filter.value,
				onClick: n[24] ||= (e) => {
					s.column.filter.value = void 0, s.reloadTable();
				}
			}, [...n[29] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, fR)
		])) : r("", !0),
		s.column.filter && s.column.filter.buttons ? (_(), i("span", {
			key: 4,
			class: m(u.getValueOrFunction(s.column.filter.buttons, { column: s.column }))
		}, [(_(!0), i(e, null, y(s.column.filter.buttons, (e) => (_(), i("span", { key: e.action }, [a("button", {
			type: "button",
			disabled: e.disabled === void 0 ? null : u.getValueOrFunction(e.disabled),
			class: m([e.class ? e.class : u.getButtonClassByAction(e.action)]),
			onClick: (t) => s.tableAction(e, {
				items: s.items,
				$event: t
			})
		}, [a("i", { class: m([e.icon === void 0 ? u.getButtonIconClassByAction(e.action) : u.getValueOrFunction(e.icon, {
			button: e,
			column: s.column,
			table: s.table
		})]) }, null, 2), o(" " + x(u.translate(e.title)), 1)], 10, pR)]))), 128))], 2)) : r("", !0)
	]);
}
var hR = /*#__PURE__*/ Jk(kL, [["render", mR]]), gR = Mc(), _R = {
	name: "VuAdminTable",
	props: {
		settings: Object,
		auth: Object
	},
	components: {
		VuAdminForm: QI,
		VuAdminTablePagination: OL,
		VuAdminTableFilterField: hR
	},
	data() {
		return {
			item: {},
			items: {},
			selected: [],
			details: [],
			bulkitem: {},
			bulkinputs: [],
			config: {
				pagination: {
					total: void 0,
					page: 1,
					skip: 0,
					limit: 10,
					limits: [
						10,
						20,
						50,
						100
					],
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
			mobileFilterModalId: null,
			mobileFilterModalElement: null,
			mobileFilterModalWindow: null,
			messages: {
				table: [],
				form: []
			},
			message: {
				table: null,
				form: null
			},
			messageTimeOut: null,
			saveProgress: {
				active: !1,
				warnLeave: !1,
				phase: null,
				uploadCurrent: 0,
				uploadTotal: 0,
				uploadField: null,
				uploadTypeKey: null,
				uploadFileName: null,
				uploadFileIndex: null,
				uploadPresetSize: null,
				uploadExtension: null,
				uploadCompleted: 0
			}
		};
	},
	watch: { auth: {
		immediate: !0,
		handler(e, t) {
			e != t && this.init();
		}
	} },
	created() {
		let e = qc(1e5);
		this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e, this.mobileFilterModalId = "modal_filters_" + this.settings.entity + "_" + e;
	},
	mounted() {
		this.modalElement = document.getElementById(this.modalId), this.modalWindow = new uo(this.modalElement), this.mobileFilterModalElement = document.getElementById(this.mobileFilterModalId), this.mobileFilterModalWindow = new uo(this.mobileFilterModalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
			this.settings.form.visible = !1;
		}), this.modalElement.addEventListener("show.bs.modal", (e) => {
			this.settings.form.visible = !0;
		}), this.modalElement.addEventListener("hide.bs.modal", (e) => {
			if (this.saveProgress.active && this.saveProgress.warnLeave) {
				let t = this.translate("File upload is in progress. Are you sure you want to close?");
				confirm(t) || e.preventDefault();
			}
		}), this._handleBeforeUnload = (e) => {
			this.saveProgress.active && this.saveProgress.warnLeave && (e.preventDefault(), e.returnValue = "");
		};
	},
	beforeUnmount() {
		window.removeEventListener("beforeunload", this._handleBeforeUnload);
	},
	methods: {
		init() {
			if (!this.settings.table) return !1;
			this.settings.table.pagination && (this.config.pagination = Object.assign({}, this.config.pagination, this.settings.table.pagination)), this.setPage(this.config.pagination.page, !1), this.settings.table.order && (this.config.order = Object.assign({}, this.config.order, this.settings.table.order)), this.settings.table.header || (this.settings.table.header = {}), this.settings.api || (this.settings.api = {}), this.settings.api = Object.assign({
				url: null,
				input: {},
				output: {},
				options: {}
			}, this.settings.api), this.settings.table.api || (this.settings.table.api = {}), this.settings.form || (this.settings.form = {}), this.settings.form.api || (this.settings.form.api = {}), this.settings.table.api = Object.assign({}, this.settings.api, this.settings.table.api), this.settings.form.api = Object.assign({}, this.settings.api, this.settings.form.api), this.settings.initialized = !0, this.listenEvent(), this.resetTable();
		},
		authAndSettings() {
			return this.settings.initialized && this.auth && this.auth.success && this.settings && this.settings.table;
		},
		sendEvent(e, t, n) {
			gR.emit(e + "-" + t, {
				from: this.settings.entity,
				payload: n
			});
		},
		listenEvent() {
			if (gR.on(`EDIT-${this.settings.entity}`, (e) => {
				this.editItem(e.payload.item);
			}), this.settings.table && this.settings.table.filterListen) {
				let e = this.settings.table.filterListen, t = `FILTER-${this.settings.entity}`;
				this._filterListenerRegistered ||= (gR.on(t, (t) => {
					if (t.from === e.entity && t.payload) {
						let { field: e, value: n } = t.payload, r = this.settings.table.columns.find((t) => t.name === e);
						r && r.filter && (r.filter.value = n, r.filter.operator = r.filter.default_operator || "=", this.reloadTable());
					}
				}), !0);
			}
		},
		tableWait(e) {
			this.ui.wait.table = !0, this.ui.block.table = e;
		},
		tableNoWait() {
			this.ui.wait.table = !1, this.ui.block.table = !1;
		},
		countFilters() {
			return this.settings.table.columns.filter((e) => e.filter && !e.hidden).length;
		},
		filterableColumns() {
			return this.settings.table.columns.filter((e) => e.filter && !e.hidden);
		},
		sortableColumns() {
			return this.settings.table.columns.filter((e) => !e.hidden && this.isSortable(e));
		},
		countActiveFilters() {
			return this.settings.table.columns.filter((e) => !e.filter || e.filter.value === void 0 || e.filter.value === null ? !1 : Array.isArray(e.filter.value) ? e.filter.value.length > 0 : e.filter.value !== "").length;
		},
		countActiveSort() {
			return Object.keys(this.config.order).length;
		},
		openMobileFilters() {
			this.mobileFilterModalWindow.show();
		},
		applyMobileFilters() {
			this.reloadTable();
		},
		resetTable() {
			this.settings.table.pagination && (this.config.pagination.limit = this.settings.table.pagination.limit), this.resetFilter(), this.resetOrder(!0);
		},
		resetFilter(e) {
			if (this.settings.table.columns) {
				for (let e of this.settings.table.columns) e.filter && (e.filter.value = e.filter.default_value === void 0 ? e.filter.multiple ? [] : void 0 : e.filter.default_value, e.filter.operator = e.filter.default_operator === void 0 ? void 0 : e.filter.default_operator);
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
			if (this.config.pagination.items !== null && this.config.pagination.items !== void 0) {
				if (this.config.pagination.total !== null && this.config.pagination.total !== void 0 && (this.config.pagination.pages = Math.ceil(this.config.pagination.total / this.config.pagination.limit)), this.config.pagination.pages !== null) {
					let e = Math.floor((this.config.pagination.size - 1) / 2), t = this.config.pagination.page - e;
					this.config.pagination.page > this.config.pagination.pages && (this.config.pagination.page = this.config.pagination.pages), this.config.pagination.page < 1 && (this.config.pagination.page = 1), t + this.config.pagination.size > this.config.pagination.pages && (t = this.config.pagination.pages - this.config.pagination.size + 1), t < 1 && (t = 1), this.config.pagination.numbers = Array.from({ length: this.config.pagination.size }, (e, n) => t + n);
				}
				this.config.pagination.from = this.config.pagination.skip + 1, this.config.pagination.to = this.config.pagination.skip + (this.config.pagination.items === null ? this.config.pagination.limit : this.config.pagination.items);
			}
		},
		setPage(e, t) {
			t = t === void 0 || t, e < 1 && (e = 1), this.config.pagination.pages !== null && this.config.pagination.pages !== void 0 && e > this.config.pagination.pages && (e = this.config.pagination.pages), this.config.pagination.skip = (e - 1) * this.config.pagination.limit, this.config.pagination.page != e && t && (this.config.pagination.page = e, this.reloadTable());
		},
		setPageLimit(e) {
			e != this.config.pagination.limit && (this.config.pagination.limit = e, this.setPage(1), this.calcPage(), this.reloadTable());
		},
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		},
		getButtonClassByAction(e) {
			return Rl(e);
		},
		getButtonIconClassByAction(e) {
			return Bl(e);
		},
		buttonIconClass(e) {
			return zl(e);
		},
		tableCellValue(e, t, n, r) {
			try {
				return e === void 0 || t === void 0 ? void 0 : r.value ? r.value(e, t, n, r) : t[e] !== void 0 || !e.includes(".") ? t[e] : e.split(".").reduce((e, t) => e && e[t], t);
			} catch (e) {
				return console.error("[vu-admin] tableCellValue error:", e), e.message;
			}
		},
		tableCellTemplate(e, t, n, r) {
			try {
				return typeof e == "string" ? e : e(t[r.name], t, n, r);
			} catch (e) {
				return console.error("[vu-admin] tableCellTemplate error:", e), e.message;
			}
		},
		tableAction(e, t) {
			if (t.$event && t.$event.stopPropagation(), e.filterLink && t.item) {
				let n = t.item[e.filterLink.value || this.settings.pkey];
				n != null && this.sendEvent("FILTER", e.filterLink.entity, {
					field: e.filterLink.field,
					value: n
				});
				return;
			}
			let n = e.action ? e.action : e.click ? e.click : null;
			if (n && typeof n != "string") n(t.item, t, this);
			else switch (n) {
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
					this.saveItem(item, () => {
						this.addTableMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${t.item[this.settings.pkey]} )</small>`, 2500);
					}, (e) => {
						this.addTableMessage(e.message, 3500, "danger");
					}, e.params);
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
				case "TABLE_EXPORT": this.exportTable(e.params);
			}
		},
		tableBulkAction(e, t, n, r) {
			if (r && r.stopPropagation(), e && typeof e != "string") e(item, this);
			else switch (e) {
				case "TABLE_BULK_SAVE":
					this.saveBulk(() => {
						this.addTableMessage(this.translate("Saved all selected items"), 2500);
					});
					break;
				case "TABLE_BULK_DELETE": this.deleteItems(this.selected, (e) => {
					this.selected = [];
				});
			}
		},
		isSortable(e) {
			return e.sortable === void 0 || e.sortable;
		},
		sortTable(e) {
			this.config.order[e.name] && this.config.order[e.name].fixed || this.isSortable(e) && (this.config.order[e.name] === void 0 || this.config.order[e.name] === null ? this.config.order[e.name] = {
				dir: "ASC",
				idx: this.config.orderIndex++
			} : this.config.order[e.name].dir === "ASC" ? this.config.order[e.name] = {
				dir: "DESC",
				idx: this.config.orderIndex++
			} : delete this.config.order[e.name], Object.entries(this.config.order).sort((e, t) => e[1].idx - t[1].idx).forEach((e, t) => {
				e[1].idx = t;
			}), this.reloadTable());
		},
		getOrdersForFetch() {
			let e = [], t = !1;
			for (let n of Object.keys(this.config.order)) t = !0, e[this.config.order[n].idx] = {
				key: n,
				dir: this.config.order[n].dir
			};
			return t ? e : null;
		},
		getFiltersForFetch() {
			let e = {}, t = !1;
			for (let n of this.settings.table.columns) {
				if (!n.filter) continue;
				let r = n.filter.value;
				r != null && (Array.isArray(r) && r.length === 0 || r !== "" && (t = !0, e[n.name] = {
					type: n.filter.type,
					value: n.filter.onchange ? n.filter.onchange(n.filter) : n.filter.value,
					operator: n.filter.operator
				}));
			}
			return t ? e : null;
		},
		async fetchTableRelations(e) {
			if (!this.settings.relations) return;
			let t = [];
			for (let n of this.settings.table.columns) if (n.relation && this.settings.relations[n.relation.config]) {
				let r = [];
				n.relation = Nc(this.settings.relations[n.relation.config], n.relation);
				for (let t of e) t[n.relation.local] && r.push(t[n.relation.local]);
				n.relation.ids = il(r), t.push(this.fetchRelation(n, e, this.auth));
			}
			await Promise.all(t);
		},
		async fetchTable(e) {
			try {
				this.tableWait(!0), e ||= {}, e.filter = this.getFiltersForFetch(), e.order = this.getOrdersForFetch(), this.config.pagination.page !== null && this.config.pagination.page !== void 0 && (e.page = this.config.pagination.page), this.config.pagination.limit !== null && this.config.pagination.limit !== void 0 && (e.limit = this.config.pagination.limit), e.page && e.limit && (e.skip = (e.page - 1) * e.limit);
				let t = await this.fetchItems(this.settings, e, this.config, this.auth);
				if (t === !1) return this.tableNoWait(), !1;
				await this.fetchTableRelations(t), this.items = t, this.tableNoWait();
			} catch (e) {
				console.error(e), this.addTableMessage(e.message, 3500, "danger"), this.tableNoWait();
			}
		},
		async fetchItems(e, t, n, r) {
			e.events && e.events.beforeItemsLoad && e.events.beforeItemsLoad(t, e), e.debug && console.log("[vu-admin] fetchItems", Xc("GET", e.table.api, null, t), t);
			let i = await fetch(Xc("GET", e.table.api, null, t), Yc("GET", e.table.api, null, r)), a = await Fc(i), o = Hc(i, a);
			if (o) return this.handleTableErrors(o), !1;
			if (!a.data) return this.handleTableErrors(this.translate("Empty response")), !1;
			e.events && e.events.afterItemsLoad && e.events.afterItemsLoad(a.data, i);
			let s;
			s = e.table.api.input.items ? typeof e.table.api.input.items == "string" ? a.data[e.table.api.input.items] : e.table.api.input.items(a.data, i) : a.data, n && (e.table.api.input.total ? n.pagination.total = typeof e.table.api.input.total == "string" ? a.data[e.table.api.input.total] : e.table.api.input.total(a.data, i) : a.data.total && (n.pagination.total = a.data.total), n.pagination.items = s.length, this.calcPage());
			let c = Qc(s);
			return this.convertIn(e.table.columns, c), e.debug && console.log("[vu-admin] fetchItems response:", i.status, "items:", c.length, "total:", n?.pagination?.total), c;
		},
		async fetchRelation(e, t, n) {
			try {
				let r = e.relation.params ? e.relation.params : {};
				e.relation.columns && (r.columns = JSON.stringify(e.relation.columns));
				let i = {};
				e.relation.ids && e.relation.ids.length && (i[e.relation.foreign] = {
					type: "array",
					value: e.relation.ids,
					operator: "IN"
				}), r.filter = i, dl(r, { column: e });
				let a = await fetch(Xc("GET", e.relation.api, null, r), Yc("GET", e.relation.api, null, n)), o = await Fc(a), s = Hc(a, o);
				if (s) {
					this.handleTableErrors(s);
					return;
				}
				if (!o.data) return;
				if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? o.data[e.relation.api.input.items] : e.relation.api.input.items(o.data, a) : e.relation.items = o.data, t && t[0]) for (let n of t) n[e.relation.local] && (n[e.relation.entity] = e.relation.items.find((t, r, i) => t[e.relation.foreign] === n[e.relation.local]));
			} catch (e) {
				console.error("[vu-admin] fetchRelation error:", e), this.handleTableErrors(e.message || String(e));
			}
		},
		async editItem(e) {
			if (!this.settings.form || !this.settings.form.api) return !1;
			this.item = e, this.message.form = null, this.messages.form = [], this.modalWindow.show();
		},
		async deleteItem(e, t) {
			try {
				e ||= this.item;
				let n = e[this.settings.pkey];
				if (!n || !confirm("Are you sure you want to delete this item")) return;
				this.tableWait(!0), this.settings.events && this.settings.events.beforeItemDelete && this.settings.events.beforeItemDelete(e);
				let r = await fetch(Xc("DELETE", this.settings.form.api, n, t), Yc("DELETE", this.settings.form.api, null, this.auth)), i = await Fc(r), a = Hc(r, i);
				if (a) {
					this.handleTableErrors(a), this.tableNoWait();
					return;
				}
				let o = this.items.findIndex((e) => e[this.settings.pkey] === n);
				o >= 0 && this.items.splice(o, 1), this.item &&= {};
				let s = i.data === void 0 ? null : i.data;
				this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(s, r), this.reloadTable();
			} catch (e) {
				console.error("[vu-admin] deleteItem error:", e), this.tableNoWait(), this.handleTableErrors(e.message || String(e));
			}
		},
		async deleteItems(e, t) {
			try {
				if (!e || !confirm(this.translate("Are you sure you want to delete all selected items?"))) return;
				this.tableWait(!0);
				let n = await fetch(Xc("DELETE", this.settings.table.api), Yc("DELETE", this.settings.table.api, { body: JSON.stringify({ ids: e }) }, this.auth)), r = Hc(n, await Fc(n));
				if (r) {
					this.handleTableErrors(r), this.tableNoWait();
					return;
				}
				t && t(n), this.reloadTable(), this.tableNoWait();
			} catch (e) {
				console.error("[vu-admin] deleteItems error:", e), this.tableNoWait(), this.handleTableErrors(e.message || String(e));
			}
		},
		tableRowSave(e, t) {
			this.tableWait(), this.saveItem(e, () => {
				this.tableNoWait(), this.addTableMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${e[this.settings.pkey]} )</small>`, 2500);
			}, (e, t, n, r) => {
				this.tableNoWait(), this.handleTableErrors(e);
			}, t);
		},
		handleTableErrors(e) {
			if (e == null) return;
			let t = 3500, n = "danger";
			if (typeof e == "string") this.addTableMessage(e, t, n);
			else if (e instanceof Error) this.addTableMessage(e.message || String(e), t, n);
			else if (Array.isArray(e) && e.length > 0) for (let r of e) r && typeof r == "object" && r.message ? this.addTableMessage(r.message, r.timeout || t, r.priority || n) : typeof r == "string" && this.addTableMessage(r, t, n);
			else typeof e == "object" && e.message && this.addTableMessage(e.message, e.timeout || t, e.priority || n);
		},
		getColumnByName(e) {
			return this.settings.table.columns.find((t) => t.name === e);
		},
		createItem() {
			this.item = this.settings.form.default ? this.settings.form.default : {}, this.modalWindow.show(), setTimeout(() => {
				this.itemOriginal = Object.assign({}, this.item);
			}, 100);
		},
		beginSaveProgress({ warnLeave: e = !1, uploadTotal: t = 0 } = {}) {
			this.saveProgress = {
				active: !0,
				warnLeave: !!e,
				phase: "save",
				uploadCurrent: 0,
				uploadTotal: t || 0,
				uploadField: null,
				uploadTypeKey: null,
				uploadFileName: null,
				uploadFileIndex: null,
				uploadPresetSize: null,
				uploadExtension: null,
				uploadCompleted: 0
			}, e && window.addEventListener("beforeunload", this._handleBeforeUnload);
		},
		setSaveProgress(e) {
			Object.assign(this.saveProgress, e);
		},
		endSaveProgress() {
			this.saveProgress?.active && (window.removeEventListener("beforeunload", this._handleBeforeUnload), this.saveProgress = {
				active: !1,
				warnLeave: !1,
				phase: null,
				uploadCurrent: 0,
				uploadTotal: 0,
				uploadField: null,
				uploadTypeKey: null,
				uploadFileName: null,
				uploadFileIndex: null,
				uploadPresetSize: null,
				uploadExtension: null,
				uploadCompleted: 0
			});
		},
		async saveItem(e, t, n, r) {
			let i = gl(this.settings), a = Object.keys(i), o = a.length ? Cl(e, i) : [];
			this.beginSaveProgress({
				warnLeave: o.length > 0,
				uploadTotal: o.length
			});
			try {
				r ||= {};
				let s = {}, c = e[this.settings.pkey];
				if (this.settings.form.api.output && this.settings.form.api.output.fields) for (let t in e) this.settings.form.api.output.fields.includes(t) && (s[t] = e[t]);
				else Object.assign(s, e);
				let l, u;
				this.convertOut(this.settings.table.columns, [s]), this.settings.form.api.output.flatten && c || (s = el(s)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(s, r, e), this.setSaveProgress({ phase: "save" });
				let d = xl(s, this.settings);
				if (!this.settings.form.api.output.item) l = JSON.stringify(d);
				else if (typeof this.settings.form.api.output.item == "string") {
					let e = {};
					e[this.settings.form.api.output.item] = d, l = JSON.stringify(e);
				} else l = JSON.stringify(this.settings.form.api.output.item(s, options));
				let f = c ? "PUT" : "POST";
				this.settings.debug && console.log("[vu-admin] saveItem", f, Xc(f, this.settings.form.api, c, r), JSON.parse(l)), u = await fetch(Xc(f, this.settings.form.api, c, r), Yc(f, this.settings.form.api, { body: l }, this.auth));
				let p = await Fc(u), m = Hc(u, p);
				if (this.settings.debug && console.log("[vu-admin] saveItem response:", u.status, p.data), m) {
					n && n(m, e, r, u);
					return;
				}
				let h = p.data;
				if (a.length && o.length) try {
					this.setSaveProgress({
						phase: "upload",
						uploadCurrent: 0
					}), Fl(e, a, await Ml({
						tasks: o,
						savedItem: Dl(h, this.settings),
						settings: this.settings,
						auth: this.auth,
						debug: this.settings.debug,
						onProgress: (e) => {
							this.setSaveProgress({
								phase: "upload",
								uploadCurrent: e.current,
								uploadTotal: e.total,
								uploadCompleted: e.uploadCompleted,
								uploadField: e.uploadField || null,
								uploadTypeKey: e.uploadTypeKey || null,
								uploadFileName: e.uploadFileName || null,
								uploadFileIndex: e.uploadFileIndex || null,
								uploadPresetSize: e.uploadPresetSize || null,
								uploadExtension: e.uploadExtension || null
							});
						}
					})), h = Ll(h, e, a, this.settings), this.setSaveProgress({ phase: "persist" });
					let t = await Il({
						savedItem: Dl(h, this.settings),
						item: e,
						uploadFieldNames: a,
						fieldUploadMap: i,
						settings: this.settings,
						auth: this.auth,
						urlParams: r,
						debug: this.settings.debug
					});
					t && (h = Ll(h, t, a, this.settings));
				} catch (t) {
					console.error("[vu-admin] saveItem upload error:", t);
					let i = t.uploadErrors || [{
						message: t.message || String(t),
						priority: "danger",
						timeout: 14500
					}];
					n && n(i, e, r, t.response || u), this.endSaveProgress();
					return;
				}
				this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(h, r, this.auth), this.endSaveProgress(), t && t(h, u);
			} catch (t) {
				console.error("[vu-admin] saveItem error:", t), n && n(t, e, r);
			} finally {
				this.endSaveProgress();
			}
		},
		async saveBulk(e) {
			try {
				this.tableWait(!0);
				let t = {};
				this.settings.events && this.settings.events.beforeBulkSave && this.settings.events.beforeBulkSave(this.bulkitem);
				for (let e in this.bulkitem) this.bulkinputs.indexOf(e) >= 0 && this.settings.table.api.output.fields.includes(e) && (t[e] = this.bulkitem[e]);
				this.convertOut(this.settings.table.columns, [t]);
				let n = await fetch(Xc("PUT", this.settings.table.api), Yc("PUT", this.settings.table.api, { body: JSON.stringify({
					item: t,
					ids: this.selected
				}) }, this.auth)).catch((e) => (console.error("[vu-admin] saveBulk network error:", e), null)), r = await Fc(n), i = Hc(n, r);
				if (this.tableNoWait(), i) {
					this.handleTableErrors(i);
					return;
				}
				e && e(r.data), this.reloadTable();
			} catch (e) {
				console.error(e), this.addTableMessage(e.message, 3500, "danger", e), this.tableNoWait();
			}
		},
		countHiddenColumns() {
			return this.settings.table.columns.filter((e) => e.hidden === !0).length;
		},
		toggleColumn(e) {
			e === !0 ? this.settings.table.columns.map((e) => {
				e.hidden = !1;
			}) : e === !1 ? this.settings.table.columns.map((e) => {
				e.hidden = !0;
			}) : e.hidden = !e.hidden;
		},
		toggleSelectedAll() {
			this.selected = this.selected.length ? [] : this.items.map((e) => e[this.settings.pkey]);
		},
		toggleSelected(e) {
			let t = this.selected.indexOf(e);
			t >= 0 ? this.selected.splice(t, 1) : this.selected.push(e);
		},
		toggleSelectedRowInPage() {
			if (this.haveSelectedRowInPage()) for (let e of this.items) {
				let t = this.selected.indexOf(e[this.settings.pkey]);
				t >= 0 && this.selected.splice(t, 1);
			}
			else for (let e of this.items) this.selected.indexOf(e[this.settings.pkey]) < 0 && this.selected.push(e[this.settings.pkey]);
			this.selected.length || (this.bulkitem = {});
		},
		haveSelectedRowInPage() {
			if (!this.items || !this.items.length) return !1;
			for (let e of this.items) if (this.selected.indexOf(e[this.settings.pkey]) >= 0) return !0;
			return !1;
		},
		toggleDetail(e) {
			let t = this.details.indexOf(e);
			t >= 0 ? this.details.splice(t, 1) : this.details.push(e);
		},
		dropdownSelectToggleOne(e, t) {
			let n = t.value;
			e.multiple ? (Array.isArray(e.value) || (e.value = []), al(e.value, n)) : e.value = e.value === n ? null : n, this.reloadTable();
		},
		dropdownSelectAll(e, t) {
			ol(e, t), this.reloadTable();
		},
		dropdownSelectInvert(e, t) {
			sl(e, t), this.reloadTable();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? cl(e) : e.value = null, this.reloadTable();
		},
		async exportTable(e) {
			try {
				e.limit = this.config.pagination.total ? this.config.pagination.total : 0;
				let t = this.getFiltersForFetch(), n = this.getOrdersForFetch();
				this.selected.length > 0 && (t[this.settings.pkey] = {
					type: "string",
					value: this.selected,
					operator: "in"
				}), e.filter = t, e.order = n;
				let r = await this.fetchItems(this.settings, e, this.config, this.auth);
				this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(r), rl(nl(r, this.settings.table.exports[e.type].fields), this.settings.entity + ".csv");
			} catch (e) {
				console.error(e), this.addTableMessage(e.message, 3500, "danger");
			}
		},
		onRowInputChange(e, t, n, r) {
			t && t.input && (t.input.onchange && t.input.onchange(e, t, n), t.input.autosave && (this.tableWait(), this.saveItem(n, () => {
				this.tableNoWait(), this.addTableMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${n[this.settings.pkey]} )</small>`, 2500);
			}, (e, t, n, r) => {
				this.tableNoWait(), this.handleTableErrors(e);
			})));
		},
		onBulkInputChange(e, t, n) {
			n && n.input && n.input.onchange && n.input.onchange(e, n);
		},
		ifBulkInputClick(e) {
			let t = this.bulkinputs.indexOf(e.name);
			t < 0 ? this.bulkinputs.push(e.name) : this.bulkinputs.splice(t, 1), this.bulkitem[e.name] === void 0 ? this.bulkitem[e.name] = null : this.bulkitem[e.name] = void 0;
		},
		addTableMessage(e, t, n, r) {
			this.addMessage("table", e, t, n, r);
		},
		addMessage(e, t, n, r, i) {
			clearTimeout(this.messageTimeout);
			let a = `${Date.now().toString(36)}-${Jc(8)}`;
			this.message[e] = {
				uid: a,
				msg: t,
				timeout: n === void 0 ? 2500 : n,
				datetime: (/* @__PURE__ */ new Date()).toLocaleString("hu-HU"),
				priority: r || "secondary",
				details: i
			}, this.messages[e].unshift(this.message[e]), clearTimeout(this.messageTimeOut), this.messageTimeOut = setTimeout(() => {
				this.message[e] = null, this.messages[e].length > 10 && this.messages[e].splice(10);
			}, this.message[e].timeout);
		},
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
		},
		convertIn(e, t) {
			for (let n of e) if (n.convert && n.convert.in) for (let e of t) e[n.name] = n.convert.in(e[n.name], e, n);
		},
		convertOut(e, t) {
			for (let n of e) if (n.convert && n.convert.out) for (let e of t) e[n.name] = n.convert.out(e[n.name], e, n);
		}
	}
}, vR = ["data-bs-theme"], yR = { class: "vua-table-title" }, bR = { class: "d-flex align-items-center justify-content-between" }, xR = { class: "d-inline-block" }, SR = {
	key: 0,
	class: "card-title d-inline-block mb-2"
}, CR = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, wR = {
	key: 0,
	class: "d-inline-block"
}, TR = {
	key: 0,
	class: "d-inline-block px-1 mx-1"
}, ER = ["innerHTML"], DR = { class: "dropdown d-inline-block" }, OR = ["innerHTML"], kR = { class: "dropdown-menu text-start" }, AR = { class: "me-2 text-muted" }, jR = ["innerHTML"], MR = ["onClick"], NR = { class: "d-none d-md-inline" }, PR = {
	key: 1,
	class: "dropdown d-inline-block"
}, FR = { class: "mx-1" }, IR = { class: "d-none d-md-inline" }, LR = {
	key: 0,
	class: "badge text-bg-secondary ms-1"
}, RR = { class: "dropdown-menu" }, zR = ["onClick"], BR = {
	key: 0,
	class: "bi bi-check-square-fill me-2"
}, VR = {
	key: 1,
	class: "bi bi-x-square me-2 text-danger"
}, HR = { class: "badge text-secondary fw-normal" }, UR = {
	key: 2,
	class: "dropdown d-inline-block"
}, WR = { class: "mx-1" }, GR = { class: "d-none d-md-inline" }, KR = { class: "dropdown-menu" }, qR = ["onClick"], JR = { class: "d-none d-md-inline" }, YR = {
	key: 0,
	class: "badge text-bg-secondary ms-1"
}, XR = { class: "vua-table-header" }, ZR = ["width"], QR = ["onClick"], $R = ["innerHTML"], ez = {
	key: 0,
	class: "bi bi-arrow-down"
}, tz = {
	key: 1,
	class: "bi bi-arrow-up"
}, nz = { key: 0 }, rz = ["disabled", "onClick"], iz = {
	key: 0,
	class: "vua-table-filter"
}, az = ["width"], oz = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, sz = { class: "bi bi-check-all" }, cz = { class: "bi bi-x-lg" }, lz = { class: "align-middle" }, uz = [
	"data-label",
	"width",
	"onClick"
], dz = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, fz = ["innerHTML"], pz = { key: 1 }, mz = ["innerHTML"], hz = ["aria-valuenow", "aria-valuemax"], gz = { key: 0 }, _z = {
	key: 4,
	class: "input-group input-group-sm"
}, vz = ["innerHTML"], yz = {
	key: 1,
	class: "input-group-text"
}, bz = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], xz = [
	"type",
	"onChange",
	"onUpdate:modelValue"
], Sz = ["onChange", "onUpdate:modelValue"], Cz = ["value"], wz = ["innerHTML"], Tz = {
	key: 5,
	class: "input-group-text"
}, Ez = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], Dz = { key: 5 }, Oz = ["disabled", "onClick"], kz = ["innerHTML"], Az = { key: 2 }, jz = { key: 0 }, Mz = ["colspan"], Nz = { class: "row g-3 align-items-center" }, Pz = { class: "col-form-label" }, Fz = [
	"type",
	"onUpdate:modelValue",
	"onChange"
], Iz = ["onUpdate:modelValue", "onChange"], Lz = ["onUpdate:modelValue", "onChange"], Rz = ["value"], zz = ["innerHTML"], Bz = {
	key: 0,
	class: "bg-light text-dark"
}, Vz = {
	key: 0,
	class: "vua-table-bulk border-info"
}, Hz = ["data-label", "width"], Uz = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, Wz = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, Gz = [
	"type",
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], Kz = [
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], qz = ["value"], Jz = ["onClick"], Yz = {
	key: 0,
	class: "bi bi-square text-secondary"
}, Xz = {
	key: 1,
	class: "bi bi-check-square"
}, Zz = { key: 2 }, Qz = ["disabled", "onClick"], $z = ["innerHTML"], eB = { key: 2 }, tB = ["id"], nB = { class: "modal-dialog modal-xl" }, rB = { class: "modal-content h-100" }, iB = ["id"], aB = { class: "modal-dialog modal-dialog-scrollable" }, oB = {
	key: 0,
	class: "modal-content"
}, sB = { class: "modal-header" }, cB = { class: "modal-title" }, lB = { class: "modal-body" }, uB = { class: "text-secondary text-uppercase small mb-2" }, dB = { class: "form-label small fw-bold mb-1" }, fB = { class: "text-secondary text-uppercase small mb-2" }, pB = { class: "list-group mb-4" }, mB = ["onClick"], hB = ["innerHTML"], gB = {
	key: 0,
	class: "bi bi-arrow-down"
}, _B = {
	key: 1,
	class: "bi bi-arrow-up"
}, vB = { class: "text-secondary text-uppercase small mb-2" }, yB = {
	class: "btn-group flex-wrap mb-2",
	role: "group"
}, bB = ["onClick"], xB = { class: "modal-footer d-flex justify-content-between" };
function SB(t, c, l, u, d, f) {
	let p = b("VuAdminTableFilterField"), g = b("VuAdminTablePagination"), v = b("VuAdminForm");
	return _(), i("div", null, [
		f.authAndSettings() ? (_(), i("div", {
			key: 0,
			class: m(["vua-table-container", [l.settings.class]]),
			"data-bs-theme": [l.settings.theme]
		}, [
			a("div", { class: m(["vua-overlay", { blocked: d.ui.block.table }]) }, null, 2),
			a("div", yR, [a("div", bR, [a("div", xR, [l.settings.table.title ? (_(), i("h5", SR, x(l.settings.table.title), 1)) : r("", !0), D(a("div", CR, [...c[8] ||= [a("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[ee, d.ui.wait.table && l.settings.table.title]])]), d.messages.table.length ? (_(), i("div", wR, [d.message.table ? (_(), i("small", TR, [a("span", { class: m(["text-" + d.message.table.priority]) }, [a("span", {
				class: "fw-bold",
				innerHTML: d.message.table.msg
			}, null, 8, ER)], 2)])) : r("", !0), a("div", DR, [a("button", {
				class: m(["btn btn-sm dropdown-toggle", ["btn-" + d.messages.table[0].priority]]),
				type: "button",
				"data-bs-toggle": "dropdown",
				"aria-expanded": "false",
				innerHTML: d.messages.table.length + " " + (d.messages.table.length > 1 ? f.translate("messages") : f.translate("message"))
			}, null, 10, OR), a("ul", kR, [(_(!0), i(e, null, y(d.messages.table, (e) => (_(), i("li", { key: e }, [a("span", { class: m(["dropdown-item", ["text-" + e.priority]]) }, [a("small", AR, x(e.datetime), 1), a("span", {
				class: "fw-bold",
				innerHTML: e.msg
			}, null, 8, jR)], 2)]))), 128))])])])) : r("", !0)])]),
			l.settings.table.control ? (_(), i("div", {
				key: 0,
				class: m(["vua-table-control", [l.settings.table.control.class]])
			}, [(_(!0), i(e, null, y(l.settings.table.control.buttons, (t) => (_(), i("span", { key: t.action }, [
				t.action !== "TABLE_COLUMNS" && !t.dropdowns ? (_(), i("button", {
					key: 0,
					type: "button",
					class: m([t.class ? t.class : f.getButtonClassByAction(t.action)]),
					onClick: (e) => f.tableAction(t, {
						items: d.items,
						$event: e
					})
				}, [a("i", { class: m(f.buttonIconClass(t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
					button: t,
					table: this
				}))) }, null, 2), a("span", NR, x(f.translate(t.title)), 1)], 10, MR)) : r("", !0),
				t.action === "TABLE_COLUMNS" ? (_(), i("div", PR, [a("button", {
					type: "button",
					class: m([[t.class ? t.class : f.getButtonClassByAction(t.action)], "dropdown-toggle"]),
					"data-bs-toggle": "dropdown",
					"data-bs-auto-close": "outside",
					"aria-expanded": "false"
				}, [D(a("span", FR, [
					a("i", { class: m(f.buttonIconClass(t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
						button: t,
						table: this
					}))) }, null, 2),
					a("span", IR, x(f.translate(t.title)), 1),
					f.countHiddenColumns() ? (_(), i("span", LR, x(f.countHiddenColumns()), 1)) : r("", !0)
				], 512), [[ee, l.settings.table.columns.length > 0]])], 2), a("ul", RR, [
					(_(!0), i(e, null, y(l.settings.table.columns, (e) => (_(), i("li", { key: e }, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (t) => f.toggleColumn(e)
					}, [
						e.hidden ? r("", !0) : (_(), i("i", BR)),
						e.hidden ? (_(), i("i", VR)) : r("", !0),
						o(" " + x(e.title) + " ", 1),
						a("small", HR, x(e.name), 1)
					], 8, zR)]))), 128)),
					c[9] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: c[0] ||= (e) => f.toggleColumn(!0)
					}, x(f.translate("Visible all")), 1)]),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: c[1] ||= (e) => f.toggleColumn(!1)
					}, x(f.translate("Hidden all")), 1)])
				])])) : r("", !0),
				t.dropdowns ? (_(), i("div", UR, [a("button", {
					type: "button",
					class: m([[t.class], "dropdown-toggle"]),
					"data-bs-toggle": "dropdown",
					"data-bs-auto-close": "outside",
					"aria-expanded": "false"
				}, [a("span", WR, [
					a("i", { class: m(f.buttonIconClass(t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
						button: t,
						table: this
					}))) }, null, 2),
					c[10] ||= o(),
					a("span", GR, x(f.translate(t.title)), 1)
				])], 2), a("ul", KR, [(_(!0), i(e, null, y(t.dropdowns, (e) => (_(), i("li", { key: e }, [a("span", {
					class: m(["dropdown-item cursor-pointer", [e.class]]),
					onClick: (t) => f.tableAction(e, {
						items: d.items,
						$event: t
					})
				}, [e.icon ? (_(), i("i", {
					key: 0,
					class: m(f.buttonIconClass(e.icon))
				}, null, 2)) : r("", !0), o(" " + x(f.translate(e.title)), 1)], 10, qR)]))), 128))])])) : r("", !0)
			]))), 128)), f.filterableColumns().length || f.sortableColumns().length || d.config.pagination.limits && d.config.pagination.limits.length ? (_(), i("button", {
				key: 0,
				type: "button",
				class: "btn btn-outline-secondary d-md-none vua-mobile-filter-btn",
				onClick: c[2] ||= (e) => f.openMobileFilters()
			}, [
				c[11] ||= a("i", { class: "bi bi-funnel me-1" }, null, -1),
				a("span", JR, x(f.translate("Filter / Sort")), 1),
				f.countActiveFilters() + f.countActiveSort() > 0 ? (_(), i("span", YR, x(f.countActiveFilters() + f.countActiveSort()), 1)) : r("", !0)
			])) : r("", !0)], 2)) : r("", !0),
			l.settings.table ? (_(), i("table", {
				key: 1,
				class: m(["table vua-table vua-table-responsive mb-0", [l.settings.table.class]])
			}, [
				a("thead", null, [a("tr", XR, [(_(!0), i(e, null, y(l.settings.table.columns, (t) => (_(), i("th", {
					class: m(["", [t.header ? t.header.class : ""]]),
					style: h([t.hidden ? "display: none" : ""]),
					key: t,
					width: t.width
				}, [a("span", {
					class: m(["d-inline-block no-select text-nowrap", { "cursor-pointer": f.isSortable(t) }]),
					onClick: (e) => f.sortTable(t)
				}, [a("span", { innerHTML: t.header && t.header.title !== void 0 ? f.translate(t.header.title) : t.title ? f.translate(t.title) : f.translate(t.name) }, null, 8, $R), d.config.order[t.name] ? (_(), i("span", {
					key: 0,
					class: m(["badge text-bg-light ms-1 p-badge", { "opacity-50": d.config.order[t.name].fixed }])
				}, [
					d.config.order[t.name].dir === "ASC" ? (_(), i("i", ez)) : r("", !0),
					d.config.order[t.name].dir === "DESC" ? (_(), i("i", tz)) : r("", !0),
					o(" " + x(d.config.order[t.name].idx + 1), 1)
				], 2)) : r("", !0)], 10, QR), t.header && t.header.buttons ? (_(), i("span", nz, [(_(!0), i(e, null, y(t.header.buttons, (e) => (_(), i("button", {
					key: e.action,
					type: "button",
					disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
					class: m([e.class ? e.class : f.getButtonClassByAction(e.action)]),
					onClick: (t) => f.tableAction(e, {
						items: d.items,
						$event: t
					})
				}, [a("i", { class: m(f.buttonIconClass(e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
					button: e,
					column: t,
					table: this
				}))) }, null, 2), o(" " + x(f.translate(e.title)), 1)], 10, rz))), 128))])) : r("", !0)], 14, ZR))), 128))]), f.countFilters() ? (_(), i("tr", iz, [(_(!0), i(e, null, y(l.settings.table.columns, (e) => (_(), i("th", {
					style: h([e.hidden ? "display: none" : ""]),
					key: e,
					width: e.width,
					class: m([e.filter ? e.filter.class : ""])
				}, [e.index && e.click ? (_(), i("div", oz, [a("span", {
					class: m(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: f.haveSelectedRowInPage() }]),
					onClick: c[3] ||= (e) => f.toggleSelectedRowInPage()
				}, [D(a("i", sz, null, 512), [[ee, !f.haveSelectedRowInPage()]]), D(a("i", cz, null, 512), [[ee, f.haveSelectedRowInPage()]])], 2)])) : r("", !0), e.filter ? (_(), n(p, {
					key: 1,
					column: e,
					settings: l.settings,
					items: d.items,
					table: this,
					"reload-table": f.reloadTable,
					"table-action": f.tableAction
				}, null, 8, [
					"column",
					"settings",
					"items",
					"reload-table",
					"table-action"
				])) : r("", !0)], 14, az))), 128))])) : r("", !0)]),
				a("tbody", null, [(_(!0), i(e, null, y(this.items, (t, n) => (_(), i(e, { key: t.id }, [a("tr", lz, [(_(!0), i(e, null, y(l.settings.table.columns, (o) => (_(), i("td", {
					style: h([o.hidden ? "display: none" : ""]),
					key: o.name,
					"data-label": o.title ? o.title : f.translate(o.name),
					width: o.width,
					class: m(f.getValueOrFunction(o.class, {
						column: o,
						item: t
					})),
					onClick: (e) => f.tableAction(o, {
						item: t,
						index: n,
						$event: e
					})
				}, [
					o.index ? (_(), i("div", dz, [a("span", {
						class: m(["cursor-pointer badge border badge-index p-1 w-100", { selected: d.selected.indexOf(t[l.settings.pkey]) >= 0 }]),
						innerHTML: n + 1 + (d.config.pagination.page - 1) * d.config.pagination.limit
					}, null, 10, fz)])) : r("", !0),
					!o.template && !o.input && !o.progressbar ? (_(), i("span", pz, x(f.tableCellValue(o.name, t, n, o)), 1)) : r("", !0),
					o.template ? (_(), i("span", {
						key: 2,
						innerHTML: f.tableCellTemplate(o.template, t, n, o)
					}, null, 8, mz)) : r("", !0),
					o.progressbar ? (_(), i("div", {
						key: 3,
						class: "progress",
						role: "progressbar",
						"aria-label": "Warning example",
						"aria-valuenow": t[o.name],
						"aria-valuemax": o.progressbar.max
					}, [a("div", {
						class: m(["progress-bar", [o.progressbar.class]]),
						style: h({ width: Math.round(t[o.name] / o.progressbar.max * 100) + "%" })
					}, [o.progressbar.value ? (_(), i("span", gz, x(t[o.name]), 1)) : r("", !0)], 6)], 8, hz)) : r("", !0),
					o.input ? (_(), i("div", _z, [
						o.input.prefix ? (_(), i("span", {
							key: 0,
							class: "input-group-text",
							innerHTML: f.getValueOrFunction(o.input.prefix, {
								column: o,
								item: t
							})
						}, null, 8, vz)) : r("", !0),
						o.input.prefixcheck ? (_(), i("span", yz, [D(a("input", {
							class: "form-check p-0 m-0",
							type: "checkbox",
							name: o.input.prefixcheck.name,
							"onUpdate:modelValue": (e) => t[o.input.prefixcheck.name] = e,
							onChange: (e) => f.onRowInputChange(t[o.input.prefixcheck.name], o, t, n)
						}, null, 40, bz), [[C, t[o.input.prefixcheck.name]]])])) : r("", !0),
						[
							"text",
							"number",
							"date",
							"datetime-local"
						].indexOf(o.input.type) >= 0 ? D((_(), i("input", {
							key: 2,
							type: o.input.type,
							class: m(["form-control form-control-sm", f.getValueOrFunction(o.input.class, {
								column: o,
								item: t
							})]),
							onChange: (e) => f.onRowInputChange(t[o.name], o, t, n),
							"onUpdate:modelValue": (e) => t[o.name] = e
						}, null, 42, xz)), [[w, t[o.name]]]) : r("", !0),
						o.input.type == "select" ? D((_(), i("select", {
							key: 3,
							class: m(["form-select form-select-sm pe-0", f.getValueOrFunction(o.input.class, {
								column: o,
								item: t
							})]),
							onChange: (e) => f.onRowInputChange(t[o.name], o, t, n),
							"onUpdate:modelValue": (e) => t[o.name] = e
						}, [(_(!0), i(e, null, y(o.input.options, (e) => (_(), i("option", {
							value: e.value,
							key: e
						}, x(f.translate(e.label)), 9, Cz))), 128))], 42, Sz)), [[T, t[o.name]]]) : r("", !0),
						o.input.suffix ? (_(), i("span", {
							key: 4,
							class: "input-group-text",
							innerHTML: f.getValueOrFunction(o.input.suffix, {
								column: o,
								item: t
							})
						}, null, 8, wz)) : r("", !0),
						o.input.suffixcheck ? (_(), i("span", Tz, [D(a("input", {
							class: "form-check p-0 m-0",
							type: "checkbox",
							name: o.input.suffixcheck.name,
							"onUpdate:modelValue": (e) => t[o.input.suffixcheck.name] = e,
							onChange: (e) => f.onRowInputChange(t[o.input.suffixcheck.name], o, t, n)
						}, null, 40, Ez), [[C, t[o.input.suffixcheck.name]]])])) : r("", !0)
					])) : r("", !0),
					o.buttons ? (_(), i("span", Dz, [(_(!0), i(e, null, y(o.buttons, (e) => (_(), i("span", { key: e.action }, [e.hidden ? r("", !0) : (_(), i("button", {
						key: 0,
						type: "button",
						disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
						class: m([e.class ? f.getValueOrFunction(e.class, {
							button: e,
							column: o,
							item: t,
							table: this
						}) : f.getButtonClassByAction(e.action)]),
						onClick: (r) => f.tableAction(e, {
							column: o,
							item: t,
							index: n,
							$event: r
						})
					}, [e.icon === null ? r("", !0) : (_(), i("i", {
						key: 0,
						class: m(f.buttonIconClass(e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
							button: e,
							column: o,
							item: t,
							table: this
						})))
					}, null, 2)), e.template ? (_(), i("span", {
						key: 1,
						innerHTML: f.tableCellTemplate(e.template, t, n, o)
					}, null, 8, kz)) : (_(), i("span", Az, x(f.translate(e.title)), 1))], 10, Oz))]))), 128))])) : r("", !0)
				], 14, uz))), 128))]), l.settings.table.details && d.details.indexOf(t[l.settings.pkey]) >= 0 ? (_(), i("tr", jz, [a("td", {
					class: m([l.settings.table.details.class]),
					colspan: l.settings.table.columns.length
				}, [
					(_(!0), i(e, null, y(l.settings.table.details.fields, (o) => (_(), i("div", {
						class: "m-0",
						key: o
					}, [a("div", Nz, [a("div", { class: m(["col-12 col-md text-md-end", [o.class]]) }, [a("label", Pz, x(o.label), 1)], 2), a("div", { class: m(["col-12 col-md", [o.input.class]]) }, [
						["select", "textarea"].indexOf(o.input.type) < 0 ? D((_(), i("input", {
							key: 0,
							type: o.input.type,
							class: "form-control form-control-sm",
							"onUpdate:modelValue": (e) => t[o.name] = e,
							onChange: (e) => f.onRowInputChange(t[o.name], o, t, n)
						}, null, 40, Fz)), [[w, t[o.name]]]) : r("", !0),
						o.input.type == "textarea" ? D((_(), i("textarea", {
							key: 1,
							class: "form-control form-control-sm",
							rows: "3",
							"onUpdate:modelValue": (e) => t[o.name] = e,
							onChange: (e) => f.onRowInputChange(t[o.name], o, t, n)
						}, "\r\n                    ", 40, Iz)), [[E, t[o.name]]]) : r("", !0),
						o.input.type == "select" ? D((_(), i("select", {
							key: 2,
							class: "form-select form-select-sm pe-0",
							"onUpdate:modelValue": (e) => t[o.name] = e,
							onChange: (e) => f.onRowInputChange(t[o.name], o, t, n)
						}, [(_(!0), i(e, null, y(o.input.options, (e) => (_(), i("option", {
							value: e.value,
							key: e
						}, x(f.translate(e.label)), 9, Rz))), 128))], 40, Lz)), [[T, t[o.name]]]) : r("", !0)
					], 2)])]))), 128)),
					a("span", { innerHTML: l.settings.table.details.raw(t) }, null, 8, zz),
					l.settings.debug > 1 ? (_(), i("pre", Bz, "                  " + x(t) + "\n                ", 1)) : r("", !0)
				], 10, Mz)])) : r("", !0)], 64))), 128))]),
				a("tfoot", null, [d.selected.length > 0 ? (_(), i("tr", Vz, [(_(!0), i(e, null, y(l.settings.table.columns, (t) => (_(), i("td", {
					style: h([t.hidden ? "display: none" : ""]),
					key: t.name,
					"data-label": t.title,
					width: t.width,
					class: m(t.class)
				}, [
					t.index ? (_(), i("div", Uz, [a("span", {
						class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
						onClick: c[4] ||= (e) => f.toggleSelectedAll()
					}, x(d.selected.length), 1)])) : r("", !0),
					t.input && t.bulk && t.bulk.enabled ? (_(), i("div", Wz, [
						[
							"text",
							"number",
							"date",
							"datetime-local"
						].indexOf(t.input.type) >= 0 ? D((_(), i("input", {
							key: 0,
							type: t.input.type,
							class: m(["form-control form-control-sm", t.input.class]),
							disabled: d.bulkinputs.indexOf(t.name) < 0,
							onChange: (e) => f.onBulkInputChange(d.bulkitem[t.name], d.bulkitem, t),
							"onUpdate:modelValue": (e) => d.bulkitem[t.name] = e
						}, null, 42, Gz)), [[w, d.bulkitem[t.name]]]) : r("", !0),
						t.input.type == "select" ? D((_(), i("select", {
							key: 1,
							class: m(["form-select form-select-sm pe-0", t.input.class]),
							disabled: d.bulkinputs.indexOf(t.name) < 0,
							onChange: (e) => f.onBulkInputChange(d.bulkitem[t.name], d.bulkitem, t),
							"onUpdate:modelValue": (e) => d.bulkitem[t.name] = e
						}, [(_(!0), i(e, null, y(t.input.options, (e) => (_(), i("option", {
							value: e.value,
							key: e
						}, x(f.translate(e.label)), 9, qz))), 128))], 42, Kz)), [[T, d.bulkitem[t.name]]]) : r("", !0),
						a("span", {
							class: "input-group-text cursor-pointer",
							onClick: (e) => f.ifBulkInputClick(t)
						}, [d.bulkitem[t.name] === void 0 ? (_(), i("i", Yz)) : (_(), i("i", Xz))], 8, Jz)
					])) : r("", !0),
					t.bulk ? (_(), i("span", Zz, [(_(!0), i(e, null, y(t.bulk.buttons, (e) => (_(), i("span", { key: e.action }, [a("button", {
						type: "button",
						class: m([e.class ? e.class : f.getButtonClassByAction(e.action)]),
						disabled: e.action === "save" && !this.bulkinputs.length,
						onClick: (n) => f.tableBulkAction(e.action, d.bulkitem, t, n)
					}, [e.icon === null ? r("", !0) : (_(), i("i", {
						key: 0,
						class: m(f.buttonIconClass(e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
							button: e,
							column: t,
							table: this
						})))
					}, null, 2)), e.template ? (_(), i("span", {
						key: 1,
						innerHTML: f.tableCellTemplate(e.template, d.bulkitem, null, t)
					}, null, 8, $z)) : (_(), i("span", eB, x(f.translate(e.title)), 1))], 10, Qz)]))), 128))])) : r("", !0)
				], 14, Hz))), 128))])) : r("", !0)])
			], 2)) : r("", !0),
			s(g, {
				settings: l.settings,
				config: d.config,
				ui: d.ui,
				onSetPage: f.setPage,
				onSetPageLimit: f.setPageLimit,
				onTranslate: f.translate
			}, null, 8, [
				"settings",
				"config",
				"ui",
				"onSetPage",
				"onSetPageLimit",
				"onTranslate"
			])
		], 10, vR)) : r("", !0),
		a("div", {
			class: "modal shadow",
			id: d.modalId,
			tabindex: "-1"
		}, [a("div", nB, [a("div", rB, [f.authAndSettings() && l.settings.form.visible && l.settings.form.groups ? (_(), n(v, {
			key: 0,
			modelValue: d.item,
			"onUpdate:modelValue": c[5] ||= (e) => d.item = e,
			formid: d.formId,
			settings: l.settings,
			modalWindow: d.modalWindow,
			auth: l.auth,
			saveItem: f.saveItem,
			deleteItem: f.deleteItem,
			reloadTable: f.reloadTable,
			fetchRelation: f.fetchRelation,
			saveProgress: d.saveProgress
		}, null, 8, [
			"modelValue",
			"formid",
			"settings",
			"modalWindow",
			"auth",
			"saveItem",
			"deleteItem",
			"reloadTable",
			"fetchRelation",
			"saveProgress"
		])) : r("", !0)])])], 8, tB),
		a("div", {
			class: "modal shadow vua-mobile-filter-modal",
			id: d.mobileFilterModalId,
			tabindex: "-1"
		}, [a("div", aB, [f.authAndSettings() ? (_(), i("div", oB, [
			a("div", sB, [a("h5", cB, x(f.translate("Filter / Sort")), 1), c[12] ||= a("button", {
				type: "button",
				class: "btn-close",
				"data-bs-dismiss": "modal",
				"aria-label": "Close"
			}, null, -1)]),
			a("div", lB, [
				f.filterableColumns().length ? (_(), i(e, { key: 0 }, [a("h6", uB, x(f.translate("Filters")), 1), (_(!0), i(e, null, y(f.filterableColumns(), (e) => (_(), i("div", {
					class: "mb-3",
					key: "filter_" + e.name
				}, [a("label", dB, x(e.title ? f.translate(e.title) : f.translate(e.name)), 1), s(p, {
					column: e,
					settings: l.settings,
					items: d.items,
					table: this,
					"reload-table": f.reloadTable,
					"table-action": f.tableAction
				}, null, 8, [
					"column",
					"settings",
					"items",
					"reload-table",
					"table-action"
				])]))), 128))], 64)) : r("", !0),
				f.sortableColumns().length ? (_(), i(e, { key: 1 }, [a("h6", fB, x(f.translate("Sort")), 1), a("div", pB, [(_(!0), i(e, null, y(f.sortableColumns(), (e) => (_(), i("button", {
					type: "button",
					key: "sort_" + e.name,
					class: "list-group-item list-group-item-action d-flex align-items-center justify-content-between",
					onClick: (t) => f.sortTable(e)
				}, [a("span", { innerHTML: e.header && e.header.title !== void 0 ? f.translate(e.header.title) : e.title ? f.translate(e.title) : f.translate(e.name) }, null, 8, hB), d.config.order[e.name] ? (_(), i("span", {
					key: 0,
					class: m(["badge text-bg-light p-badge", { "opacity-50": d.config.order[e.name].fixed }])
				}, [
					d.config.order[e.name].dir === "ASC" ? (_(), i("i", gB)) : r("", !0),
					d.config.order[e.name].dir === "DESC" ? (_(), i("i", _B)) : r("", !0),
					o(" " + x(d.config.order[e.name].idx + 1), 1)
				], 2)) : r("", !0)], 8, mB))), 128))])], 64)) : r("", !0),
				d.config.pagination.limits && d.config.pagination.limits.length ? (_(), i(e, { key: 2 }, [a("h6", vB, x(f.translate("Rows per page")), 1), a("div", yB, [(_(!0), i(e, null, y(d.config.pagination.limits, (e) => (_(), i("button", {
					type: "button",
					key: "limit_" + e,
					class: m(["btn btn-sm", d.config.pagination.limit == e ? "btn-secondary" : "btn-outline-secondary"]),
					onClick: (t) => f.setPageLimit(e)
				}, x(e), 11, bB))), 128))])], 64)) : r("", !0)
			]),
			a("div", xB, [a("button", {
				type: "button",
				class: "btn btn-outline-secondary",
				onClick: c[6] ||= (e) => {
					f.resetFilter(!0), f.resetOrder(!0);
				}
			}, [c[13] ||= a("i", { class: "bi bi-x-circle me-1" }, null, -1), o(" " + x(f.translate("Reset")), 1)]), a("button", {
				type: "button",
				class: "btn btn-primary",
				"data-bs-dismiss": "modal",
				onClick: c[7] ||= (e) => f.applyMobileFilters()
			}, [c[14] ||= a("i", { class: "bi bi-check-lg me-1" }, null, -1), o(" " + x(f.translate("Apply")), 1)])])
		])) : r("", !0)])], 8, iB)
	]);
}
var CB = {
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
		auth: { type: Object }
	},
	init: (e) => {},
	watch: { auth: {
		immediate: !0,
		handler(e, t) {
			e != t && this.loadSettings();
		}
	} },
	data() {
		return {
			settings: void 0,
			defaults: {
				pkey: "id",
				theme: void 0,
				class: "my-1 p-3 rounded",
				init: null,
				language: document.documentElement ? document.documentElement.lang : "en",
				api: {
					auth: {},
					options: {},
					input: {
						item: void 0,
						items: void 0,
						total: void 0
					},
					output: {
						item: void 0,
						flatten: !0,
						fields: void 0
					}
				},
				translate: { hu: {
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
					"Filter / Sort": "Szűrés / Rendezés",
					Sort: "Rendezés",
					Filters: "Szűrők",
					"Rows per page": "Sor / oldal",
					Reset: "Alaphelyzet",
					Apply: "Alkalmaz",
					"=": "Egyenlő",
					">": "Nagyobb",
					">=": "Nagyobb vagy egyenlő",
					"<": "Kisebb",
					"<=": "Kisebb vagy egyenlő",
					"Are you sure you want to delete all selected items?": "Biztos hogy törölni akarod az összes kiválasztott elemet?"
				} },
				events: {
					afterSettingsInit: void 0,
					beforeItemsLoad: void 0,
					afterItemsLoad: void 0,
					afterItemLoad: void 0,
					beforeItemSave: void 0,
					afterItemSave: void 0,
					beforeItemDelete: void 0,
					afterItemDelete: void 0,
					beforeBulkSave: void 0,
					afterBulkSave: void 0,
					beforeItemsExport: void 0
				},
				relations: {},
				table: {
					title: null,
					columns: [],
					pagination: {
						size: 10,
						limit: 10,
						limits: [
							10,
							20,
							50,
							100
						]
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
	created() {},
	mounted() {},
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
			let e = this.auth.settings.entitiesVariable ? this.auth.settings.entitiesVariable : "VuEntities";
			this.loadScript(this.auth.settings.entities[this.entity], () => {
				window[e] && window[e][this.entity] ? this.init(window[e][this.entity](this.preset)) : console.error(`Entity config (${this.entity}) not found`);
			}, e);
		},
		loadScript(e, t, n) {
			if (window[n] && window[n][this.entity]) {
				t && t();
				return;
			}
			let r = document.createElement("script");
			r.async = !0, r.src = e, r.onload = () => {
				t && t();
			}, r.onerror = () => {
				console.error(`[vu-admin] failed to load entity script: ${e}`);
			}, document.head.appendChild(r);
		},
		init(e) {
			if (e) {
				if (this.settings = Nc(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
					let e = document.documentElement.getAttribute("data-bs-theme");
					this.settings.theme = e || "light";
				}
				this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && console.log(`[vu-admin] entity "${this.entity}" initialized`, this.settings.debug > 1 ? this.settings : "");
			} else console.error(`Entity config (${this.entity}) not found`);
			this.$forceUpdate();
		}
	},
	components: { VuAdminTable: /* @__PURE__ */ Jk(_R, [["render", SB]]) }
}, wB = { key: 0 }, TB = ["data-bs-theme"];
function EB(e, t, n, a, o, c) {
	let l = b("vu-admin-table");
	return e.entity && e.settings ? (_(), i("div", wB, [e.auth ? (_(), i("div", {
		key: 0,
		class: "vu-admin",
		"data-bs-theme": [e.settings.theme]
	}, [s(l, {
		settings: e.settings,
		auth: e.auth
	}, null, 8, ["settings", "auth"])], 8, TB)) : r("", !0)])) : r("", !0);
}
var DB = /*#__PURE__*/ Jk(CB, [["render", EB]]), OB = (/* @__PURE__ */ ie(((e, t) => {
	(function() {
		var e = "input is invalid type", n = typeof window == "object", r = n ? window : {};
		r.JS_SHA512_NO_WINDOW && (n = !1);
		var i = !n && typeof self == "object";
		!r.JS_SHA512_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node ? r = global : i && (r = self);
		var a = !r.JS_SHA512_NO_COMMON_JS && typeof t == "object" && t.exports, o = typeof define == "function" && define.amd, s = !r.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", c = "0123456789abcdef".split(""), l = [
			-2147483648,
			8388608,
			32768,
			128
		], u = [
			24,
			16,
			8,
			0
		], d = [
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
		], f = [
			"hex",
			"array",
			"digest",
			"arrayBuffer"
		], p = [], m = Array.isArray;
		(r.JS_SHA512_NO_NODE_JS || !m) && (m = function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		});
		var h = ArrayBuffer.isView;
		s && (r.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !h) && (h = function(e) {
			return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
		});
		var g = function(t) {
			var n = typeof t;
			if (n === "string") return [t, !0];
			if (n !== "object" || t === null) throw Error(e);
			if (s && t.constructor === ArrayBuffer) return [new Uint8Array(t), !1];
			if (!m(t) && !h(t)) throw Error(e);
			return [t, !1];
		}, _ = function(e, t) {
			return function(n) {
				return new x(t, !0).update(n)[e]();
			};
		}, v = function(e) {
			var t = _("hex", e);
			t.create = function() {
				return new x(e);
			}, t.update = function(e) {
				return t.create().update(e);
			};
			for (var n = 0; n < f.length; ++n) {
				var r = f[n];
				t[r] = _(r, e);
			}
			return t;
		}, y = function(e, t) {
			return function(n, r) {
				return new S(n, t, !0).update(r)[e]();
			};
		}, b = function(e) {
			var t = y("hex", e);
			t.create = function(t) {
				return new S(t, e);
			}, t.update = function(e, n) {
				return t.create(e).update(n);
			};
			for (var n = 0; n < f.length; ++n) {
				var r = f[n];
				t[r] = y(r, e);
			}
			return t;
		};
		function x(e, t) {
			t ? (p[0] = p[1] = p[2] = p[3] = p[4] = p[5] = p[6] = p[7] = p[8] = p[9] = p[10] = p[11] = p[12] = p[13] = p[14] = p[15] = p[16] = p[17] = p[18] = p[19] = p[20] = p[21] = p[22] = p[23] = p[24] = p[25] = p[26] = p[27] = p[28] = p[29] = p[30] = p[31] = p[32] = 0, this.blocks = p) : this.blocks = [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			], e == 384 ? (this.h0h = 3418070365, this.h0l = 3238371032, this.h1h = 1654270250, this.h1l = 914150663, this.h2h = 2438529370, this.h2l = 812702999, this.h3h = 355462360, this.h3l = 4144912697, this.h4h = 1731405415, this.h4l = 4290775857, this.h5h = 2394180231, this.h5l = 1750603025, this.h6h = 3675008525, this.h6l = 1694076839, this.h7h = 1203062813, this.h7l = 3204075428) : e == 256 ? (this.h0h = 573645204, this.h0l = 4230739756, this.h1h = 2673172387, this.h1l = 3360449730, this.h2h = 596883563, this.h2l = 1867755857, this.h3h = 2520282905, this.h3l = 1497426621, this.h4h = 2519219938, this.h4l = 2827943907, this.h5h = 3193839141, this.h5l = 1401305490, this.h6h = 721525244, this.h6l = 746961066, this.h7h = 246885852, this.h7l = 2177182882) : e == 224 ? (this.h0h = 2352822216, this.h0l = 424955298, this.h1h = 1944164710, this.h1l = 2312950998, this.h2h = 502970286, this.h2l = 855612546, this.h3h = 1738396948, this.h3l = 1479516111, this.h4h = 258812777, this.h4l = 2077511080, this.h5h = 2011393907, this.h5l = 79989058, this.h6h = 1067287976, this.h6l = 1780299464, this.h7h = 286451373, this.h7l = 2446758561) : (this.h0h = 1779033703, this.h0l = 4089235720, this.h1h = 3144134277, this.h1l = 2227873595, this.h2h = 1013904242, this.h2l = 4271175723, this.h3h = 2773480762, this.h3l = 1595750129, this.h4h = 1359893119, this.h4l = 2917565137, this.h5h = 2600822924, this.h5l = 725511199, this.h6h = 528734635, this.h6l = 4215389547, this.h7h = 1541459225, this.h7l = 327033209), this.bits = e, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1;
		}
		x.prototype.update = function(e) {
			if (this.finalized) throw Error("finalize already called");
			var t = g(e);
			e = t[0];
			for (var n = t[1], r, i = 0, a, o = e.length, s = this.blocks; i < o;) {
				if (this.hashed && (this.hashed = !1, s[0] = this.block, this.block = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = s[16] = s[17] = s[18] = s[19] = s[20] = s[21] = s[22] = s[23] = s[24] = s[25] = s[26] = s[27] = s[28] = s[29] = s[30] = s[31] = s[32] = 0), n) for (a = this.start; i < o && a < 128; ++i) r = e.charCodeAt(i), r < 128 ? s[a >>> 2] |= r << u[a++ & 3] : r < 2048 ? (s[a >>> 2] |= (192 | r >>> 6) << u[a++ & 3], s[a >>> 2] |= (128 | r & 63) << u[a++ & 3]) : r < 55296 || r >= 57344 ? (s[a >>> 2] |= (224 | r >>> 12) << u[a++ & 3], s[a >>> 2] |= (128 | r >>> 6 & 63) << u[a++ & 3], s[a >>> 2] |= (128 | r & 63) << u[a++ & 3]) : (r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++i) & 1023), s[a >>> 2] |= (240 | r >>> 18) << u[a++ & 3], s[a >>> 2] |= (128 | r >>> 12 & 63) << u[a++ & 3], s[a >>> 2] |= (128 | r >>> 6 & 63) << u[a++ & 3], s[a >>> 2] |= (128 | r & 63) << u[a++ & 3]);
				else for (a = this.start; i < o && a < 128; ++i) s[a >>> 2] |= e[i] << u[a++ & 3];
				this.lastByteIndex = a, this.bytes += a - this.start, a >= 128 ? (this.block = s[32], this.start = a - 128, this.hash(), this.hashed = !0) : this.start = a;
			}
			return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 | 0, this.bytes %= 4294967296), this;
		}, x.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var e = this.blocks, t = this.lastByteIndex;
				e[32] = this.block, e[t >>> 2] |= l[t & 3], this.block = e[32], t >= 112 && (this.hashed || this.hash(), e[0] = this.block, e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = e[16] = e[17] = e[18] = e[19] = e[20] = e[21] = e[22] = e[23] = e[24] = e[25] = e[26] = e[27] = e[28] = e[29] = e[30] = e[31] = e[32] = 0), e[30] = this.hBytes << 3 | this.bytes >>> 29, e[31] = this.bytes << 3, this.hash();
			}
		}, x.prototype.hash = function() {
			for (var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, c = this.h4h, l = this.h4l, u = this.h5h, f = this.h5l, p = this.h6h, m = this.h6l, h = this.h7h, g = this.h7l, _ = this.blocks, v = 32, y, b, x, S, C, w, T, E, ee, te, D, ne, O, re, ie, ae, oe, se, k, A, j, M, ce, le; v < 160; v += 2) k = _[v - 30], A = _[v - 29], y = (k >>> 1 | A << 31) ^ (k >>> 8 | A << 24) ^ k >>> 7, b = (A >>> 1 | k << 31) ^ (A >>> 8 | k << 24) ^ (A >>> 7 | k << 25), k = _[v - 4], A = _[v - 3], x = (k >>> 19 | A << 13) ^ (A >>> 29 | k << 3) ^ k >>> 6, S = (A >>> 19 | k << 13) ^ (k >>> 29 | A << 3) ^ (A >>> 6 | k << 26), k = _[v - 32], A = _[v - 31], j = _[v - 14], M = _[v - 13], C = (M & 65535) + (A & 65535) + (b & 65535) + (S & 65535), w = (M >>> 16) + (A >>> 16) + (b >>> 16) + (S >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (y & 65535) + (x & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (y >>> 16) + (x >>> 16) + (T >>> 16), _[v] = E << 16 | T & 65535, _[v + 1] = w << 16 | C & 65535;
			var ue = e, de = t, fe = n, N = r, pe = i, me = a, he = o, ge = s, _e = c, ve = l, ye = u, be = f, xe = p, Se = m, P = h, F = g;
			for (ie = fe & pe, ae = N & me, v = 0; v < 160; v += 8) y = (ue >>> 28 | de << 4) ^ (de >>> 2 | ue << 30) ^ (de >>> 7 | ue << 25), b = (de >>> 28 | ue << 4) ^ (ue >>> 2 | de << 30) ^ (ue >>> 7 | de << 25), x = (_e >>> 14 | ve << 18) ^ (_e >>> 18 | ve << 14) ^ (ve >>> 9 | _e << 23), S = (ve >>> 14 | _e << 18) ^ (ve >>> 18 | _e << 14) ^ (_e >>> 9 | ve << 23), ee = ue & fe, te = de & N, oe = ee ^ ue & pe ^ ie, se = te ^ de & me ^ ae, ce = _e & ye ^ ~_e & xe, le = ve & be ^ ~ve & Se, k = _[v], A = _[v + 1], j = d[v], M = d[v + 1], C = (M & 65535) + (A & 65535) + (le & 65535) + (S & 65535) + (F & 65535), w = (M >>> 16) + (A >>> 16) + (le >>> 16) + (S >>> 16) + (F >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (ce & 65535) + (x & 65535) + (P & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (ce >>> 16) + (x >>> 16) + (P >>> 16) + (T >>> 16), k = E << 16 | T & 65535, A = w << 16 | C & 65535, C = (se & 65535) + (b & 65535), w = (se >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), j = E << 16 | T & 65535, M = w << 16 | C & 65535, C = (ge & 65535) + (A & 65535), w = (ge >>> 16) + (A >>> 16) + (C >>> 16), T = (he & 65535) + (k & 65535) + (w >>> 16), E = (he >>> 16) + (k >>> 16) + (T >>> 16), P = E << 16 | T & 65535, F = w << 16 | C & 65535, C = (M & 65535) + (A & 65535), w = (M >>> 16) + (A >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (T >>> 16), he = E << 16 | T & 65535, ge = w << 16 | C & 65535, y = (he >>> 28 | ge << 4) ^ (ge >>> 2 | he << 30) ^ (ge >>> 7 | he << 25), b = (ge >>> 28 | he << 4) ^ (he >>> 2 | ge << 30) ^ (he >>> 7 | ge << 25), x = (P >>> 14 | F << 18) ^ (P >>> 18 | F << 14) ^ (F >>> 9 | P << 23), S = (F >>> 14 | P << 18) ^ (F >>> 18 | P << 14) ^ (P >>> 9 | F << 23), D = he & ue, ne = ge & de, oe = D ^ he & fe ^ ee, se = ne ^ ge & N ^ te, ce = P & _e ^ ~P & ye, le = F & ve ^ ~F & be, k = _[v + 2], A = _[v + 3], j = d[v + 2], M = d[v + 3], C = (M & 65535) + (A & 65535) + (le & 65535) + (S & 65535) + (Se & 65535), w = (M >>> 16) + (A >>> 16) + (le >>> 16) + (S >>> 16) + (Se >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (ce & 65535) + (x & 65535) + (xe & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (ce >>> 16) + (x >>> 16) + (xe >>> 16) + (T >>> 16), k = E << 16 | T & 65535, A = w << 16 | C & 65535, C = (se & 65535) + (b & 65535), w = (se >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), j = E << 16 | T & 65535, M = w << 16 | C & 65535, C = (me & 65535) + (A & 65535), w = (me >>> 16) + (A >>> 16) + (C >>> 16), T = (pe & 65535) + (k & 65535) + (w >>> 16), E = (pe >>> 16) + (k >>> 16) + (T >>> 16), xe = E << 16 | T & 65535, Se = w << 16 | C & 65535, C = (M & 65535) + (A & 65535), w = (M >>> 16) + (A >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (T >>> 16), pe = E << 16 | T & 65535, me = w << 16 | C & 65535, y = (pe >>> 28 | me << 4) ^ (me >>> 2 | pe << 30) ^ (me >>> 7 | pe << 25), b = (me >>> 28 | pe << 4) ^ (pe >>> 2 | me << 30) ^ (pe >>> 7 | me << 25), x = (xe >>> 14 | Se << 18) ^ (xe >>> 18 | Se << 14) ^ (Se >>> 9 | xe << 23), S = (Se >>> 14 | xe << 18) ^ (Se >>> 18 | xe << 14) ^ (xe >>> 9 | Se << 23), O = pe & he, re = me & ge, oe = O ^ pe & ue ^ D, se = re ^ me & de ^ ne, ce = xe & P ^ ~xe & _e, le = Se & F ^ ~Se & ve, k = _[v + 4], A = _[v + 5], j = d[v + 4], M = d[v + 5], C = (M & 65535) + (A & 65535) + (le & 65535) + (S & 65535) + (be & 65535), w = (M >>> 16) + (A >>> 16) + (le >>> 16) + (S >>> 16) + (be >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (ce & 65535) + (x & 65535) + (ye & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (ce >>> 16) + (x >>> 16) + (ye >>> 16) + (T >>> 16), k = E << 16 | T & 65535, A = w << 16 | C & 65535, C = (se & 65535) + (b & 65535), w = (se >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), j = E << 16 | T & 65535, M = w << 16 | C & 65535, C = (N & 65535) + (A & 65535), w = (N >>> 16) + (A >>> 16) + (C >>> 16), T = (fe & 65535) + (k & 65535) + (w >>> 16), E = (fe >>> 16) + (k >>> 16) + (T >>> 16), ye = E << 16 | T & 65535, be = w << 16 | C & 65535, C = (M & 65535) + (A & 65535), w = (M >>> 16) + (A >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (T >>> 16), fe = E << 16 | T & 65535, N = w << 16 | C & 65535, y = (fe >>> 28 | N << 4) ^ (N >>> 2 | fe << 30) ^ (N >>> 7 | fe << 25), b = (N >>> 28 | fe << 4) ^ (fe >>> 2 | N << 30) ^ (fe >>> 7 | N << 25), x = (ye >>> 14 | be << 18) ^ (ye >>> 18 | be << 14) ^ (be >>> 9 | ye << 23), S = (be >>> 14 | ye << 18) ^ (be >>> 18 | ye << 14) ^ (ye >>> 9 | be << 23), ie = fe & pe, ae = N & me, oe = ie ^ fe & he ^ O, se = ae ^ N & ge ^ re, ce = ye & xe ^ ~ye & P, le = be & Se ^ ~be & F, k = _[v + 6], A = _[v + 7], j = d[v + 6], M = d[v + 7], C = (M & 65535) + (A & 65535) + (le & 65535) + (S & 65535) + (ve & 65535), w = (M >>> 16) + (A >>> 16) + (le >>> 16) + (S >>> 16) + (ve >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (ce & 65535) + (x & 65535) + (_e & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (ce >>> 16) + (x >>> 16) + (_e >>> 16) + (T >>> 16), k = E << 16 | T & 65535, A = w << 16 | C & 65535, C = (se & 65535) + (b & 65535), w = (se >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), j = E << 16 | T & 65535, M = w << 16 | C & 65535, C = (de & 65535) + (A & 65535), w = (de >>> 16) + (A >>> 16) + (C >>> 16), T = (ue & 65535) + (k & 65535) + (w >>> 16), E = (ue >>> 16) + (k >>> 16) + (T >>> 16), _e = E << 16 | T & 65535, ve = w << 16 | C & 65535, C = (M & 65535) + (A & 65535), w = (M >>> 16) + (A >>> 16) + (C >>> 16), T = (j & 65535) + (k & 65535) + (w >>> 16), E = (j >>> 16) + (k >>> 16) + (T >>> 16), ue = E << 16 | T & 65535, de = w << 16 | C & 65535;
			C = (t & 65535) + (de & 65535), w = (t >>> 16) + (de >>> 16) + (C >>> 16), T = (e & 65535) + (ue & 65535) + (w >>> 16), E = (e >>> 16) + (ue >>> 16) + (T >>> 16), this.h0h = E << 16 | T & 65535, this.h0l = w << 16 | C & 65535, C = (r & 65535) + (N & 65535), w = (r >>> 16) + (N >>> 16) + (C >>> 16), T = (n & 65535) + (fe & 65535) + (w >>> 16), E = (n >>> 16) + (fe >>> 16) + (T >>> 16), this.h1h = E << 16 | T & 65535, this.h1l = w << 16 | C & 65535, C = (a & 65535) + (me & 65535), w = (a >>> 16) + (me >>> 16) + (C >>> 16), T = (i & 65535) + (pe & 65535) + (w >>> 16), E = (i >>> 16) + (pe >>> 16) + (T >>> 16), this.h2h = E << 16 | T & 65535, this.h2l = w << 16 | C & 65535, C = (s & 65535) + (ge & 65535), w = (s >>> 16) + (ge >>> 16) + (C >>> 16), T = (o & 65535) + (he & 65535) + (w >>> 16), E = (o >>> 16) + (he >>> 16) + (T >>> 16), this.h3h = E << 16 | T & 65535, this.h3l = w << 16 | C & 65535, C = (l & 65535) + (ve & 65535), w = (l >>> 16) + (ve >>> 16) + (C >>> 16), T = (c & 65535) + (_e & 65535) + (w >>> 16), E = (c >>> 16) + (_e >>> 16) + (T >>> 16), this.h4h = E << 16 | T & 65535, this.h4l = w << 16 | C & 65535, C = (f & 65535) + (be & 65535), w = (f >>> 16) + (be >>> 16) + (C >>> 16), T = (u & 65535) + (ye & 65535) + (w >>> 16), E = (u >>> 16) + (ye >>> 16) + (T >>> 16), this.h5h = E << 16 | T & 65535, this.h5l = w << 16 | C & 65535, C = (m & 65535) + (Se & 65535), w = (m >>> 16) + (Se >>> 16) + (C >>> 16), T = (p & 65535) + (xe & 65535) + (w >>> 16), E = (p >>> 16) + (xe >>> 16) + (T >>> 16), this.h6h = E << 16 | T & 65535, this.h6l = w << 16 | C & 65535, C = (g & 65535) + (F & 65535), w = (g >>> 16) + (F >>> 16) + (C >>> 16), T = (h & 65535) + (P & 65535) + (w >>> 16), E = (h >>> 16) + (P >>> 16) + (T >>> 16), this.h7h = E << 16 | T & 65535, this.h7l = w << 16 | C & 65535;
		}, x.prototype.hex = function() {
			this.finalize();
			var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, l = this.h4h, u = this.h4l, d = this.h5h, f = this.h5l, p = this.h6h, m = this.h6l, h = this.h7h, g = this.h7l, _ = this.bits, v = c[e >>> 28 & 15] + c[e >>> 24 & 15] + c[e >>> 20 & 15] + c[e >>> 16 & 15] + c[e >>> 12 & 15] + c[e >>> 8 & 15] + c[e >>> 4 & 15] + c[e & 15] + c[t >>> 28 & 15] + c[t >>> 24 & 15] + c[t >>> 20 & 15] + c[t >>> 16 & 15] + c[t >>> 12 & 15] + c[t >>> 8 & 15] + c[t >>> 4 & 15] + c[t & 15] + c[n >>> 28 & 15] + c[n >>> 24 & 15] + c[n >>> 20 & 15] + c[n >>> 16 & 15] + c[n >>> 12 & 15] + c[n >>> 8 & 15] + c[n >>> 4 & 15] + c[n & 15] + c[r >>> 28 & 15] + c[r >>> 24 & 15] + c[r >>> 20 & 15] + c[r >>> 16 & 15] + c[r >>> 12 & 15] + c[r >>> 8 & 15] + c[r >>> 4 & 15] + c[r & 15] + c[i >>> 28 & 15] + c[i >>> 24 & 15] + c[i >>> 20 & 15] + c[i >>> 16 & 15] + c[i >>> 12 & 15] + c[i >>> 8 & 15] + c[i >>> 4 & 15] + c[i & 15] + c[a >>> 28 & 15] + c[a >>> 24 & 15] + c[a >>> 20 & 15] + c[a >>> 16 & 15] + c[a >>> 12 & 15] + c[a >>> 8 & 15] + c[a >>> 4 & 15] + c[a & 15] + c[o >>> 28 & 15] + c[o >>> 24 & 15] + c[o >>> 20 & 15] + c[o >>> 16 & 15] + c[o >>> 12 & 15] + c[o >>> 8 & 15] + c[o >>> 4 & 15] + c[o & 15];
			return _ >= 256 && (v += c[s >>> 28 & 15] + c[s >>> 24 & 15] + c[s >>> 20 & 15] + c[s >>> 16 & 15] + c[s >>> 12 & 15] + c[s >>> 8 & 15] + c[s >>> 4 & 15] + c[s & 15]), _ >= 384 && (v += c[l >>> 28 & 15] + c[l >>> 24 & 15] + c[l >>> 20 & 15] + c[l >>> 16 & 15] + c[l >>> 12 & 15] + c[l >>> 8 & 15] + c[l >>> 4 & 15] + c[l & 15] + c[u >>> 28 & 15] + c[u >>> 24 & 15] + c[u >>> 20 & 15] + c[u >>> 16 & 15] + c[u >>> 12 & 15] + c[u >>> 8 & 15] + c[u >>> 4 & 15] + c[u & 15] + c[d >>> 28 & 15] + c[d >>> 24 & 15] + c[d >>> 20 & 15] + c[d >>> 16 & 15] + c[d >>> 12 & 15] + c[d >>> 8 & 15] + c[d >>> 4 & 15] + c[d & 15] + c[f >>> 28 & 15] + c[f >>> 24 & 15] + c[f >>> 20 & 15] + c[f >>> 16 & 15] + c[f >>> 12 & 15] + c[f >>> 8 & 15] + c[f >>> 4 & 15] + c[f & 15]), _ == 512 && (v += c[p >>> 28 & 15] + c[p >>> 24 & 15] + c[p >>> 20 & 15] + c[p >>> 16 & 15] + c[p >>> 12 & 15] + c[p >>> 8 & 15] + c[p >>> 4 & 15] + c[p & 15] + c[m >>> 28 & 15] + c[m >>> 24 & 15] + c[m >>> 20 & 15] + c[m >>> 16 & 15] + c[m >>> 12 & 15] + c[m >>> 8 & 15] + c[m >>> 4 & 15] + c[m & 15] + c[h >>> 28 & 15] + c[h >>> 24 & 15] + c[h >>> 20 & 15] + c[h >>> 16 & 15] + c[h >>> 12 & 15] + c[h >>> 8 & 15] + c[h >>> 4 & 15] + c[h & 15] + c[g >>> 28 & 15] + c[g >>> 24 & 15] + c[g >>> 20 & 15] + c[g >>> 16 & 15] + c[g >>> 12 & 15] + c[g >>> 8 & 15] + c[g >>> 4 & 15] + c[g & 15]), v;
		}, x.prototype.toString = x.prototype.hex, x.prototype.digest = function() {
			this.finalize();
			var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, c = this.h4h, l = this.h4l, u = this.h5h, d = this.h5l, f = this.h6h, p = this.h6l, m = this.h7h, h = this.h7l, g = this.bits, _ = [
				e >>> 24 & 255,
				e >>> 16 & 255,
				e >>> 8 & 255,
				e & 255,
				t >>> 24 & 255,
				t >>> 16 & 255,
				t >>> 8 & 255,
				t & 255,
				n >>> 24 & 255,
				n >>> 16 & 255,
				n >>> 8 & 255,
				n & 255,
				r >>> 24 & 255,
				r >>> 16 & 255,
				r >>> 8 & 255,
				r & 255,
				i >>> 24 & 255,
				i >>> 16 & 255,
				i >>> 8 & 255,
				i & 255,
				a >>> 24 & 255,
				a >>> 16 & 255,
				a >>> 8 & 255,
				a & 255,
				o >>> 24 & 255,
				o >>> 16 & 255,
				o >>> 8 & 255,
				o & 255
			];
			return g >= 256 && _.push(s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, s & 255), g >= 384 && _.push(c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, c & 255, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, l & 255, u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, u & 255, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, d & 255), g == 512 && _.push(f >>> 24 & 255, f >>> 16 & 255, f >>> 8 & 255, f & 255, p >>> 24 & 255, p >>> 16 & 255, p >>> 8 & 255, p & 255, m >>> 24 & 255, m >>> 16 & 255, m >>> 8 & 255, m & 255, h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, h & 255), _;
		}, x.prototype.array = x.prototype.digest, x.prototype.arrayBuffer = function() {
			this.finalize();
			var e = this.bits, t = /* @__PURE__ */ new ArrayBuffer(e / 8), n = new DataView(t);
			return n.setUint32(0, this.h0h), n.setUint32(4, this.h0l), n.setUint32(8, this.h1h), n.setUint32(12, this.h1l), n.setUint32(16, this.h2h), n.setUint32(20, this.h2l), n.setUint32(24, this.h3h), e >= 256 && n.setUint32(28, this.h3l), e >= 384 && (n.setUint32(32, this.h4h), n.setUint32(36, this.h4l), n.setUint32(40, this.h5h), n.setUint32(44, this.h5l)), e == 512 && (n.setUint32(48, this.h6h), n.setUint32(52, this.h6l), n.setUint32(56, this.h7h), n.setUint32(60, this.h7l)), t;
		}, x.prototype.clone = function() {
			var e = new x(this.bits, !1);
			return this.copyTo(e), e;
		}, x.prototype.copyTo = function(e) {
			var t = 0, n = [
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
			for (t = 0; t < n.length; ++t) e[n[t]] = this[n[t]];
			for (t = 0; t < this.blocks.length; ++t) e.blocks[t] = this.blocks[t];
		};
		function S(e, t, n) {
			var r, i = g(e);
			if (e = i[0], i[1]) {
				for (var a = [], o = e.length, s = 0, c, r = 0; r < o; ++r) c = e.charCodeAt(r), c < 128 ? a[s++] = c : c < 2048 ? (a[s++] = 192 | c >>> 6, a[s++] = 128 | c & 63) : c < 55296 || c >= 57344 ? (a[s++] = 224 | c >>> 12, a[s++] = 128 | c >>> 6 & 63, a[s++] = 128 | c & 63) : (c = 65536 + ((c & 1023) << 10 | e.charCodeAt(++r) & 1023), a[s++] = 240 | c >>> 18, a[s++] = 128 | c >>> 12 & 63, a[s++] = 128 | c >>> 6 & 63, a[s++] = 128 | c & 63);
				e = a;
			}
			e.length > 128 && (e = new x(t, !0).update(e).array());
			for (var l = [], u = [], r = 0; r < 128; ++r) {
				var d = e[r] || 0;
				l[r] = 92 ^ d, u[r] = 54 ^ d;
			}
			x.call(this, t, n), this.update(u), this.oKeyPad = l, this.inner = !0, this.sharedMemory = n;
		}
		S.prototype = new x(), S.prototype.finalize = function() {
			if (x.prototype.finalize.call(this), this.inner) {
				this.inner = !1;
				var e = this.array();
				x.call(this, this.bits, this.sharedMemory), this.update(this.oKeyPad), this.update(e), x.prototype.finalize.call(this);
			}
		}, S.prototype.clone = function() {
			var e = new S([], this.bits, !1);
			this.copyTo(e), e.inner = this.inner;
			for (var t = 0; t < this.oKeyPad.length; ++t) e.oKeyPad[t] = this.oKeyPad[t];
			return e;
		};
		var C = v(512);
		C.sha512 = C, C.sha384 = v(384), C.sha512_256 = v(256), C.sha512_224 = v(224), C.sha512.hmac = b(512), C.sha384.hmac = b(384), C.sha512_256.hmac = b(256), C.sha512_224.hmac = b(224), a ? t.exports = C : (r.sha512 = C.sha512, r.sha384 = C.sha384, r.sha512_256 = C.sha512_256, r.sha512_224 = C.sha512_224, o && define(function() {
			return C;
		}));
	})();
})))();
// src/components/VuAuth.vue
Mc();
var kB = {
	name: "VuAuth",
	props: { modelValue: Object },
	data() {
		return {
			theme: "light",
			auth: void 0,
			username: "",
			password: "",
			password_again: "",
			accepts: {},
			inputs: {},
			honeypot: "",
			twofaCode: "",
			twofaSession: "",
			twofaMethod: "",
			captchaError: !1,
			captcha: {
				loading: !1,
				items: [],
				question: "",
				token: "",
				answers: []
			},
			loading: !1,
			modalId: null,
			modalElement: null,
			modalWindow: null
		};
	},
	components: { VuAdminForm: QI },
	watch: {
		modelValue(e, t) {
			e != t && (this.auth = e, this.updateInputs(), this.$forceUpdate());
		},
		"auth.panel"() {
			this.captchaRequired && this.fetchCaptcha();
		}
	},
	computed: { captchaRequired() {
		let e = this.auth && this.auth.panel;
		return !this.settings || !this.settings.captcha || !this.settings.captcha.panels ? !1 : this.settings.captcha.panels.includes(e);
	} },
	methods: {
		detectQuery() {
			let e = new URL(window.location.href);
			if (e.searchParams.has("vuparams")) {
				let t = e.searchParams.get("vuparams");
				if (t) {
					let n = JSON.parse(t);
					n.panel && (this.auth.panel = n.panel, this.auth.visible = !0, this.auth.inputs = n.inputs ? n.inputs : null, this.updateInputs()), e.searchParams.delete("vuparams"), window.history.replaceState({}, "", e.toString());
				}
			}
		},
		updateInputs() {
			this.auth.inputs && (this.inputs = Object.assign(this.inputs, this.auth.inputs));
		},
		checkStorage() {
			let e = localStorage.getItem("vu-user"), t = localStorage.getItem("vu-header"), n = localStorage.getItem("vu-settings");
			typeof e == "string" && e && e[0] === "{" && (this.auth.user = JSON.parse(e)), typeof t == "string" && t && t[0] === "{" && (this.auth.header = JSON.parse(t)), typeof n == "string" && n && n[0] === "{" && (this.auth.settings = JSON.parse(n)), !this.auth.user || !this.auth.header ? this.logout() : this.settings.api && this.settings.api.profile ? this.loadProfile() : (this.auth.success = !0, this.authUpdate());
		},
		async loadProfile() {
			try {
				let e = await fetch(this.settings.api.profile, {
					method: "GET",
					headers: this.auth.header
				});
				await this.getStatusAndJson(e), e.ok ? (this.settings.onSuccess && this.settings.onSuccess.profile ? this.settings.onSuccess.profile(this.auth) : Object.assign(this.auth.user, this.auth.response.data), this.auth.success = !0, localStorage.setItem("vu-user", JSON.stringify(this.auth.user)), this.auth.settings && localStorage.setItem("vu-settings", JSON.stringify(this.auth.settings)), this.authUpdate()) : this.logout();
			} catch {
				this.logout();
			}
		},
		logout() {
			this.auth.success = !1, this.auth.header = null, this.auth.settings = null, this.auth.user = null, this.authUpdate(), localStorage.removeItem("vu-user"), localStorage.removeItem("vu-header"), localStorage.removeItem("vu-settings");
		},
		reset() {
			this.password = "", this.password_again = "", this.twofaCode = "", this.twofaSession = "", this.twofaMethod = "", this.auth.response = {};
		},
		close() {
			this.auth.visible = !1, this.authUpdate(), this.reset();
		},
		toggleClear() {
			this.auth.panel = "login", this.reset();
		},
		toggleForgotPassword() {
			this.auth.panel = this.auth.panel === "forgot" ? "login" : "forgot", this.reset();
		},
		toggleNewRegistration() {
			this.auth.panel = this.auth.panel === "registration" ? "login" : "registration", this.reset();
		},
		toggleType(e) {
			this.settings[e].type = this.settings[e].type === "password" ? "text" : "password", this.$forceUpdate();
		},
		async getStatusAndJson(e) {
			this.auth.response.code = e.status;
			try {
				this.auth.response.data = await e.json();
			} catch (e) {
				this.auth.response.data = null, console.error("Error parsing response:", e);
			}
		},
		onSuccess(e) {
			this.auth.response.ok = !0, this.settings.onSuccess && this.settings.onSuccess[e] && (this.settings.onSuccess[e](this.auth), this.auth.header || (this.auth.header = {}), this.auth.user.role ? this.auth.header["X-Auth-Role"] = this.auth.user.role : this.auth.user.roles && (this.auth.user.role = this.auth.user.roles[0], this.auth.header["X-Auth-Role"] = this.auth.user.role), this.auth.user.token && (this.auth.header["X-Auth-Token"] = this.auth.user.token), this.auth.success = !0, localStorage.setItem("vu-user", JSON.stringify(this.auth.user)), localStorage.setItem("vu-header", JSON.stringify(this.auth.header)), localStorage.setItem("vu-settings", JSON.stringify(this.auth.settings))), setTimeout(() => {
				this.authUpdate(), this.$forceUpdate();
			}, 0);
		},
		onError(e) {
			if (this.auth.success = !1, this.auth.response.ok = !1, this.settings.onError && this.settings.onError[e] && this.settings.onError[e](this.auth), !this.auth.response.message) {
				let e = Hc({ status: this.auth.response.code || 400 }, this.auth.response.data);
				e?.length && (this.auth.response.message = e.map((e) => e.message).join("<br>"));
			}
			setTimeout(() => {
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
			if (!(this.auth.panel !== "twofa" && this.honeypot)) {
				if (this.captchaRequired && this.captcha.answers.length !== 1) this.captchaError = !0;
				else {
					this.captchaError = !1, this.loading = !0;
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
							case "twofa":
								await this.handleTwofaSubmit();
								break;
							case "activation":
								await this.handleActivationSubmit();
								break;
							case "password": await this.handlePasswordSubmit();
						}
					} catch (e) {
						console.error("[auth] submit error", e);
					} finally {
						this.loading = !1, this.captchaRequired && this.auth.panel !== "twofa" && this.fetchCaptcha();
					}
				}
			}
		},
		async handleLogin() {
			if (this.auth.response = {}, !this.username || !this.password) return;
			let e = await fetch(this.settings.api.login, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: this.username,
					password: await this.hashPassword(this.password),
					accept: this.accepts,
					honeypot: this.honeypot,
					captchaToken: this.captcha.token,
					captchaAnswer: this.captcha.answers
				})
			});
			await this.getStatusAndJson(e), e.status === 202 && this.isTwofaPanel("login") ? (this.twofaSession = this.auth.response.data.twofaSession, this.twofaMethod = this.auth.response.data.twofa, this.auth.panel = "twofa") : e.ok ? (this.onSuccess("login"), this.close()) : this.onError("login");
		},
		async handleNewRegistrationSubmit() {
			if (this.auth.response = {}, !this.username || !this.password || !this.password_again || this.password !== this.password_again) return;
			let e = await fetch(this.settings.api.register, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: this.username,
					password: await this.hashPassword(this.password),
					accept: this.accepts,
					input: this.inputs,
					honeypot: this.honeypot,
					captchaToken: this.captcha.token,
					captchaAnswer: this.captcha.answers
				})
			});
			await this.getStatusAndJson(e), e.ok ? this.onSuccess("registration") : this.onError("registration");
		},
		async handleActivationSubmit() {
			this.auth.response = {};
			let e = await fetch(this.settings.api.activation, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(this.inputs)
			});
			await this.getStatusAndJson(e), e.ok ? (this.onSuccess("activation"), this.close()) : this.onError("activation");
		},
		async handleForgotPasswordSubmit() {
			this.auth.response = {};
			try {
				let e = await fetch(this.settings.api.forgot, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: this.username,
						honeypot: this.honeypot,
						captchaToken: this.captcha.token,
						captchaAnswer: this.captcha.answer
					})
				});
				await this.getStatusAndJson(e), e.ok ? this.onPasswordReset("forgot") : this.onError("forgot");
			} catch {
				this.onError("forgot");
			}
		},
		async handlePasswordSubmit() {
			if (this.auth.response = {}, this.password && this.password_again && this.password === this.password_again) try {
				let e = await fetch(this.settings.api.password, {
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
		async handleTwofaSubmit() {
			this.auth.response = {};
			let e = await fetch(this.settings.api.twofa, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					twofaSession: this.twofaSession,
					code: this.twofaCode
				})
			});
			await this.getStatusAndJson(e), e.ok ? (this.onSuccess("login"), this.close()) : this.onError("twofa");
		},
		async resendTwofa() {
			if (this.settings.api.twofaResend) try {
				let e = await fetch(this.settings.api.twofaResend, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ twofaSession: this.twofaSession })
				});
				await this.getStatusAndJson(e), e.ok && (this.auth.response.ok = !0, this.auth.response.message = this.auth.response.data?.message || "", this.$forceUpdate());
			} catch (e) {
				console.error("[auth] resend twofa error", e);
			}
		},
		async hashPassword(e) {
			return this.settings.password.hash = this.settings.password.hash === void 0 ? 0 : this.settings.password.hash, this.generateHash(e, this.settings.password.hash);
		},
		async generateHash(e, t) {
			let n = e;
			for (let e = 0; e < t; e++) n = (0, OB.sha512)(n);
			return n;
		},
		authUpdate() {
			this.$emit("update:modelValue", this.auth);
		},
		handleEscapeKey(e) {
			e.key === "Escape" && this.close();
		},
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return tl(e, this.settings.translate, t, n || this.settings.language);
		},
		isTwofaPanel(e) {
			return !this.settings.twofa || !this.settings.twofa.panels || this.settings.twofa.panels.includes(e);
		},
		async fetchCaptcha() {
			if (this.settings.captcha && this.settings.captcha.url) {
				this.captcha.loading = !0, this.captcha.answers = [], this.captchaError = !1;
				try {
					let e = await (await fetch(this.settings.captcha.url)).json();
					this.captcha.items = e.items, this.captcha.question = e.question, this.captcha.token = e.token;
				} catch (e) {
					console.error("[captcha] load failed", e);
				} finally {
					this.captcha.loading = !1;
				}
			}
		},
		toggleCaptchaAnswer(e) {
			let t = this.captcha.answers.indexOf(e);
			t >= 0 ? this.captcha.answers.splice(t, 1) : this.captcha.answers = [e];
		}
	},
	created() {
		window.VuSettings && window.VuSettings.auth && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", this.settings = window.VuSettings.auth);
		let e = qc(1e5);
		this.formId = "form_profil_" + e, this.modalId = "modal_profil_" + e;
	},
	mounted() {
		if (window.addEventListener("keydown", this.handleEscapeKey), this.recaptchaSiteKey && !document.querySelector("script[src=\"https://www.google.com/recaptcha/api.js\"]")) {
			let e = document.createElement("script");
			e.src = "https://www.google.com/recaptcha/api.js", e.async = !0, e.defer = !0, document.head.appendChild(e);
		}
		this.settings.username.value && (this.username = this.settings.username.value), this.auth ||= {
			user: void 0,
			header: void 0,
			settings: void 0,
			success: !1,
			response: {
				ok: !1,
				message: null,
				data: null
			}
		}, this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.detectQuery(), this.captchaRequired && this.fetchCaptcha();
	},
	beforeUnmount() {
		window.removeEventListener("keydown", this.handleEscapeKey);
	}
}, AB = ["data-bs-theme"], jB = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, MB = { class: "position-absolute top-0 end-0 p-0 m-2" }, NB = {
	key: 0,
	class: "spinner-border spinner-border-sm text-primary"
}, PB = { class: "text-center mt-2 mb-4" }, FB = {
	key: 0,
	class: "mb-3"
}, IB = {
	for: "email",
	class: "form-label text-primary"
}, LB = { class: "input-group" }, RB = [
	"type",
	"placeholder",
	"disabled"
], zB = ["innerHTML"], BB = { class: "mb-3" }, VB = {
	key: 0,
	for: "password",
	class: "form-label text-primary"
}, HB = { class: "input-group" }, UB = [
	"type",
	"placeholder",
	"pattern",
	"minlength",
	"disabled"
], WB = {
	key: 0,
	class: "bi bi-eye"
}, GB = {
	key: 1,
	class: "bi bi-eye-slash"
}, KB = ["innerHTML"], qB = {
	key: 0,
	class: "mb-4"
}, JB = {
	for: "password_again",
	class: "form-label text-primary"
}, YB = ["innerHTML"], XB = { class: "input-group" }, ZB = [
	"type",
	"placeholder",
	"minlength",
	"disabled"
], QB = {
	key: 0,
	class: "bi bi-eye"
}, $B = {
	key: 1,
	class: "bi bi-eye-slash"
}, eV = ["innerHTML"], tV = {
	key: 2,
	class: "mb-3"
}, nV = {
	key: 0,
	class: "text-center py-2"
}, rV = { key: 1 }, iV = ["innerHTML"], aV = { class: "d-flex justify-content-center gap-2 flex-wrap" }, oV = ["onClick"], sV = {
	key: 3,
	class: "text-danger text-center small mt-2 mb-3 fw-semibold"
}, cV = {
	key: 4,
	class: "mb-3"
}, lV = ["innerHTML"], uV = { class: "form-label text-primary" }, dV = { class: "input-group" }, fV = ["placeholder", "disabled"], pV = { class: "text-end mt-2" }, mV = ["disabled"], hV = {
	key: 5,
	class: "mb-4 text-center"
}, gV = ["innerHTML"], _V = {
	key: 6,
	class: "d-flex mb-4"
}, vV = ["innerHTML"], yV = { class: "row" }, bV = { class: "mb-3" }, xV = ["for", "innerHTML"], SV = { class: "input-group" }, CV = ["innerHTML"], wV = [
	"disabled",
	"required",
	"onUpdate:modelValue",
	"multiple"
], TV = ["value", "innerHTML"], EV = [
	"id",
	"name",
	"type",
	"onUpdate:modelValue",
	"placeholder",
	"required",
	"disabled"
], DV = ["innerHTML"], OV = ["innerHTML"], kV = {
	key: 0,
	class: "form-check"
}, AV = [
	"id",
	"name",
	"onUpdate:modelValue",
	"required",
	"disabled"
], jV = ["for", "innerHTML"], MV = {
	key: 7,
	class: "mt-4"
}, NV = ["innerHTML"], PV = {
	key: 8,
	class: "mt-3 text-center"
}, FV = ["innerHTML"], IV = { class: "mt-4 d-flex justify-content-between" }, LV = ["disabled"], RV = ["disabled"], zV = ["disabled"], BV = {
	key: 0,
	class: "bi bi-person-plus mx-1"
}, VV = {
	key: 1,
	class: "bi bi-arrow-right-square mx-1"
}, HV = { class: "mt-2 text-end" }, UV = ["disabled"], WV = ["id"], GV = { class: "modal-dialog modal-xl" }, KV = { class: "modal-content h-100" };
function qV(t, s, c, l, u, d) {
	let f = b("VuAdminForm");
	return t.auth && t.auth.visible ? (_(), i("div", {
		key: 0,
		class: "vua-auth",
		"data-bs-theme": [t.theme]
	}, [a("div", {
		class: "row d-flex justify-content-center align-items-center min-vh-100",
		onClick: s[16] ||= O((...e) => t.close && t.close(...e), ["stop"])
	}, [a("div", jB, [a("div", {
		class: "card shadow p-4 position-relative",
		onClick: s[15] ||= O(() => {}, ["stop"])
	}, [
		a("div", MB, [t.loading ? (_(), i("i", NB)) : r("", !0), a("button", {
			type: "button",
			class: "btn p-2",
			onClick: s[0] ||= O((...e) => t.close && t.close(...e), ["stop"])
		}, [...s[18] ||= [a("i", { class: "bi bi-x px-1 text-muted" }, null, -1)]])]),
		a("h1", PB, x(t.settings.title[t.auth.panel]), 1),
		a("form", {
			onSubmit: s[13] ||= O((e) => t.handleSubmit(), ["prevent"]),
			onClick: s[14] ||= O(() => {}, ["stop"])
		}, [
			t.auth.panel != "activation" && t.auth.panel != "password" && t.auth.panel != "twofa" ? (_(), i("div", FB, [
				a("label", IB, x(t.settings.username.label), 1),
				a("div", LB, [t.settings.username.icon ? (_(), i("span", {
					key: 0,
					class: m(["input-group-text", { "rounded-bottom-0": t.settings.username.help }])
				}, [a("i", { class: m([t.settings.username.icon]) }, null, 2)], 2)) : r("", !0), D(a("input", {
					id: "email",
					name: "email",
					type: t.settings.username.type,
					"onUpdate:modelValue": s[1] ||= (e) => t.username = e,
					class: m(["form-control", { "rounded-bottom-0": t.settings.username.help }]),
					placeholder: t.settings.username.placeholder,
					required: "",
					disabled: t.loading
				}, null, 10, RB), [[w, t.username]])]),
				t.settings.username.help ? (_(), i("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.settings.username.help
				}, null, 8, zB)) : r("", !0)
			])) : r("", !0),
			t.auth.panel != "forgot" && t.auth.panel != "activation" && t.auth.panel != "twofa" ? (_(), i(e, { key: 1 }, [a("div", BB, [
				t.settings.password.label ? (_(), i("label", VB, x(t.settings.password.label), 1)) : r("", !0),
				a("div", HB, [
					t.settings.password.icon ? (_(), i("span", {
						key: 0,
						class: m(["input-group-text", { "rounded-bottom-0": (t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password.help }])
					}, [a("i", { class: m([t.settings.password.icon]) }, null, 2)], 2)) : r("", !0),
					D(a("input", {
						id: "password",
						name: "password",
						type: t.settings.password.type,
						"onUpdate:modelValue": s[2] ||= (e) => t.password = e,
						class: m(["form-control", { "rounded-bottom-0": t.auth.panel == "registration" && t.settings.password.help }]),
						placeholder: t.settings.password.placeholder,
						pattern: t.settings.password.pattern,
						minlength: t.auth.panel == "registration" ? t.settings.password.minlength : 1,
						required: "",
						disabled: t.loading
					}, null, 10, UB), [[w, t.password]]),
					t.auth.panel == "registration" || t.auth.panel == "password" ? (_(), i("span", {
						key: 1,
						class: m(["input-group-text", { "rounded-bottom-0": (t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password.help }])
					}, [a("small", { class: m(["", {
						"text-success": t.password.length >= t.settings.password.minlength,
						"text-danger": t.password.length < t.settings.password.minlength
					}]) }, x(t.password.length), 3)], 2)) : r("", !0),
					a("span", {
						class: m(["cursor-pointer input-group-text", { "rounded-bottom-0": (t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password.help }]),
						onClick: s[3] ||= O((e) => t.toggleType("password"), ["stop"])
					}, [t.settings.password.type == "password" ? (_(), i("i", WB)) : (_(), i("i", GB))], 2)
				]),
				(t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password.help ? (_(), i("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.settings.password.help
				}, null, 8, KB)) : r("", !0)
			]), t.auth.panel === "registration" || t.auth.panel === "password" ? (_(), i("div", qB, [
				a("label", JB, [o(x(t.settings.password_again.label) + " ", 1), t.password_again.length > 0 && t.password_again != t.password ? (_(), i("small", {
					key: 0,
					class: "text-danger",
					innerHTML: t.settings.password_again.nomatch
				}, null, 8, YB)) : r("", !0)]),
				a("div", XB, [
					t.settings.password.icon ? (_(), i("span", {
						key: 0,
						class: m(["input-group-text", { "rounded-bottom-0": t.settings.password_again.help }])
					}, [a("i", { class: m([t.settings.password_again.icon]) }, null, 2)], 2)) : r("", !0),
					D(a("input", {
						id: "password_again",
						name: "password_again",
						type: t.settings.password_again.type,
						"onUpdate:modelValue": s[4] ||= (e) => t.password_again = e,
						class: m(["form-control", { "rounded-bottom-0": t.settings.password_again.help }]),
						placeholder: t.settings.password_again.placeholder,
						minlength: t.settings.password.minlength,
						required: "",
						disabled: t.loading
					}, null, 10, ZB), [[w, t.password_again]]),
					a("span", { class: m(["input-group-text", { "rounded-bottom-0": t.settings.password_again.help }]) }, [a("small", { class: m(["", {
						"text-success": t.password_again.length >= t.settings.password.minlength,
						"text-danger": t.password_again.length < t.settings.password.minlength
					}]) }, x(t.password_again.length), 3)], 2),
					a("span", {
						class: m(["cursor-pointer input-group-text", { "rounded-bottom-0": (t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password_again.help }]),
						onClick: s[5] ||= O((e) => t.toggleType("password_again"), ["stop"])
					}, [t.settings.password_again.type == "password" ? (_(), i("i", QB)) : (_(), i("i", $B))], 2)
				]),
				(t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password_again.help ? (_(), i("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.settings.password_again.help
				}, null, 8, eV)) : r("", !0)
			])) : r("", !0)], 64)) : r("", !0),
			t.captchaRequired ? (_(), i("div", tV, [t.captcha.loading ? (_(), i("div", nV, [...s[19] ||= [a("span", { class: "spinner-border spinner-border-sm text-secondary" }, null, -1)]])) : t.captcha.items.length ? (_(), i("div", rV, [a("div", {
				class: "text-center small mb-2",
				innerHTML: t.captcha.question
			}, null, 8, iV), a("div", aV, [(_(!0), i(e, null, y(t.captcha.items, (e) => (_(), i("button", {
				key: e.id,
				type: "button",
				class: m(["btn btn-outline-secondary px-2 py-1", { "btn-primary border-primary": t.captcha.answers.includes(e.id) }]),
				onClick: O((n) => {
					t.toggleCaptchaAnswer(e.id), t.captchaError = !1;
				}, ["stop"])
			}, [a("i", {
				class: m(["bi", e.icon]),
				style: {
					"font-size": "1.2rem",
					display: "block"
				}
			}, null, 2)], 10, oV))), 128))])])) : r("", !0)])) : r("", !0),
			t.captchaError ? (_(), i("p", sV, x(t.settings.captcha.error), 1)) : r("", !0),
			t.auth.panel === "twofa" && t.settings.twofa ? (_(), i("div", cV, [
				a("p", {
					class: "text-center small text-muted mb-3",
					innerHTML: t.settings.twofa.info
				}, null, 8, lV),
				a("label", uV, x(t.settings.twofa.label), 1),
				a("div", dV, [s[20] ||= a("span", { class: "input-group-text" }, [a("i", { class: "bi bi-shield-lock" })], -1), D(a("input", {
					type: "text",
					inputmode: "numeric",
					pattern: "[0-9]{6}",
					maxlength: "6",
					"onUpdate:modelValue": s[6] ||= (e) => t.twofaCode = e,
					class: "form-control text-center fw-bold fs-5",
					placeholder: t.settings.twofa.placeholder,
					required: "",
					disabled: t.loading,
					autocomplete: "one-time-code"
				}, null, 8, fV), [[E, t.twofaCode]])]),
				a("div", pV, [a("button", {
					type: "button",
					class: "btn btn-link btn-sm p-0 text-decoration-none",
					onClick: s[7] ||= O((...e) => t.resendTwofa && t.resendTwofa(...e), ["stop"]),
					disabled: t.loading
				}, [s[21] ||= a("i", { class: "bi bi-arrow-repeat me-1" }, null, -1), o(x(t.settings.submit.resend), 1)], 8, mV)])
			])) : r("", !0),
			D(a("input", {
				type: "text",
				name: "vu_b4t",
				tabindex: "-1",
				autocomplete: "new-password",
				"aria-hidden": "true",
				"onUpdate:modelValue": s[8] ||= (e) => t.honeypot = e,
				style: {
					position: "absolute",
					left: "-9999px",
					width: "1px",
					height: "1px",
					opacity: "0"
				}
			}, null, 512), [[E, t.honeypot]]),
			t.auth.panel == "login" && t.settings.password.forgot ? (_(), i("div", hV, [a("button", {
				type: "button",
				class: "btn btn-link p-0 text-decoration-none text-nowrap",
				onClick: s[9] ||= O((...e) => t.toggleForgotPassword && t.toggleForgotPassword(...e), ["stop"]),
				innerHTML: t.settings.password.forgot
			}, null, 8, gV)])) : r("", !0),
			t.auth.panel == "forgot" && t.settings.help && t.settings.help.forgot ? (_(), i("div", _V, [a("small", {
				class: "text-muted",
				innerHTML: t.settings.help.forgot
			}, null, 8, vV)])) : r("", !0),
			a("div", yV, [(_(!0), i(e, null, y(t.settings.inputs, (n, o) => (_(), i(e, { key: o }, [n.panels.indexOf(t.auth.panel) >= 0 && !n.hidden ? (_(), i("div", {
				key: 0,
				class: m([n.colclass ? n.colclass : "col-md-12"])
			}, [a("div", bV, [
				n.label ? (_(), i("label", {
					key: 0,
					for: o,
					class: m(["form-label text-primary", { required: n.required }]),
					innerHTML: t.getValueOrFunction(n.label)
				}, null, 10, xV)) : r("", !0),
				a("div", SV, [
					n.prefix ? (_(), i("span", {
						key: 0,
						class: m(["input-group-text", { "rounded-bottom-0": n.help }]),
						innerHTML: t.getValueOrFunction(n.prefix)
					}, null, 10, CV)) : r("", !0),
					n.type == "select" ? D((_(), i("select", {
						key: 1,
						class: "form-select",
						disabled: t.loading,
						required: n.required,
						"onUpdate:modelValue": (e) => t.inputs[o] = e,
						multiple: n.multiple
					}, [s[22] ||= a("option", null, null, -1), (_(!0), i(e, null, y(n.options, (e) => (_(), i("option", {
						key: e,
						value: e.value,
						innerHTML: t.getValueOrFunction(e.label)
					}, null, 8, TV))), 128))], 8, wV)), [[T, t.inputs[o]]]) : D((_(), i("input", {
						key: 2,
						id: o,
						name: o,
						type: n.type,
						"onUpdate:modelValue": (e) => t.inputs[o] = e,
						class: m(["form-control", { "rounded-bottom-0": n.help }]),
						placeholder: n.placeholder,
						required: n.required,
						disabled: t.loading
					}, null, 10, EV)), [[w, t.inputs[o]]]),
					n.suffix ? (_(), i("span", {
						key: 3,
						class: m(["input-group-text", { "rounded-bottom-0": n.help }]),
						innerHTML: t.getValueOrFunction(n.suffix)
					}, null, 10, DV)) : r("", !0)
				]),
				n.help ? (_(), i("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.getValueOrFunction(n.help)
				}, null, 8, OV)) : r("", !0)
			])], 2)) : r("", !0)], 64))), 128))]),
			(_(!0), i(e, null, y(t.settings.accepts, (e) => (_(), i("div", { key: e }, [e.panels.indexOf(t.auth.panel) >= 0 ? (_(), i("div", kV, [D(a("input", {
				type: "checkbox",
				class: "form-check-input",
				id: "accept_" + e.name,
				name: "accept_" + e.name,
				"onUpdate:modelValue": (n) => t.accepts[e.name] = n,
				required: e.required,
				disabled: t.loading
			}, null, 8, AV), [[C, t.accepts[e.name]]]), e.label ? (_(), i("label", {
				key: 0,
				class: "form-check-label",
				for: "accept_" + e.name,
				innerHTML: t.getValueOrFunction(e.label)
			}, null, 8, jV)) : r("", !0)])) : r("", !0)]))), 128)),
			t.auth.panel == "registration" && t.settings.help && t.settings.help.registration ? (_(), i("div", MV, [a("div", { innerHTML: t.getValueOrFunction(t.settings.help.registration) }, null, 8, NV)])) : r("", !0),
			t.auth.response.message ? (_(), i("div", PV, [a("div", {
				class: m({
					"text-danger": !t.auth.response.ok,
					"text-success": t.auth.response.ok
				}),
				innerHTML: t.auth.response.message
			}, null, 10, FV)])) : r("", !0),
			a("div", IV, [
				t.auth.panel != "login" && t.auth.panel != "activation" ? (_(), i("button", {
					key: 0,
					type: "button",
					onClick: s[10] ||= O((...e) => t.toggleClear && t.toggleClear(...e), ["stop"]),
					class: "btn btn-secondary w-100 me-2 text-nowrap",
					disabled: t.loading
				}, [s[23] ||= a("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1), o(" " + x(t.settings.submit.login), 1)], 8, LV)) : r("", !0),
				t.auth.panel == "login" && t.settings.registrationEnabled !== !1 ? (_(), i("button", {
					key: 1,
					type: "button",
					class: "btn btn-warning w-100 me-2 text-nowrap",
					onClick: s[11] ||= O((...e) => t.toggleNewRegistration && t.toggleNewRegistration(...e), ["stop"]),
					disabled: t.loading
				}, [s[24] ||= a("i", { class: "bi bi-person-plus mx-1" }, null, -1), o(" " + x(t.settings.submit.registration), 1)], 8, RV)) : r("", !0),
				a("button", {
					type: "submit",
					class: m(["btn w-100 text-nowrap", {
						"btn-primary": t.auth.panel != "registration",
						"btn-warning": t.auth.panel == "registration"
					}]),
					disabled: t.loading
				}, [o(x(t.settings.submit[t.auth.panel]) + " ", 1), t.auth.panel == "registration" ? (_(), i("i", BV)) : (_(), i("i", VV))], 10, zV)
			]),
			a("div", HV, [a("button", {
				type: "button",
				onClick: s[12] ||= O((...e) => t.close && t.close(...e), ["stop"]),
				class: "btn btn-light border w-100 me-1",
				disabled: t.loading
			}, [o(x(t.settings.submit.cancel) + " ", 1), s[25] ||= a("i", { class: "bi bi-x-square mx-1" }, null, -1)], 8, UV)])
		], 32)
	])])]), a("div", {
		class: "modal shadow",
		id: t.modalId,
		tabindex: "-1"
	}, [a("div", GV, [a("div", KV, [t.settings.form && t.settings.form.visible && t.settings.form.groups ? (_(), n(f, {
		key: 0,
		modelValue: t.item,
		"onUpdate:modelValue": s[17] ||= (e) => t.item = e,
		formid: t.formId,
		settings: t.settings,
		modalWindow: t.modalWindow,
		auth: t.auth,
		saveItem: t.saveItem,
		deleteItem: t.deleteItem,
		reloadTable: t.reloadTable,
		fetchRelation: t.fetchRelation
	}, null, 8, [
		"modelValue",
		"formid",
		"settings",
		"modalWindow",
		"auth",
		"saveItem",
		"deleteItem",
		"reloadTable",
		"fetchRelation"
	])) : r("", !0)])])], 8, WV)], 8, AB)) : r("", !0);
}
var JV = /*#__PURE__*/ Jk(kB, [["render", qV]]);
// src/components/VuUserButton.vue
Mc();
var YV = {
	name: "VuUserButton",
	props: {
		modelValue: Object,
		panel: String
	},
	data() {
		return {
			theme: "light",
			auth: {},
			settings: {},
			registrationEnabled: !0
		};
	},
	watch: { modelValue(e, t) {
		e != t && (this.auth = e, this.$forceUpdate());
	} },
	computed: {},
	methods: {
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
		dropdownAction(e, t) {
			t && t.stopPropagation(), e.action && e.action({
				dropdown: e,
				settings: this.settings
			}, this);
		},
		getValueOrFunction(e, t) {
			return Pc(e, t, this.settings, this);
		}
	},
	created() {
		window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel])), window.VuSettings && window.VuSettings.auth && window.VuSettings.auth.registrationEnabled === !1 && (this.registrationEnabled = !1);
	},
	mounted() {}
}, XV = ["data-bs-theme"], ZV = {
	key: 0,
	class: "dropdown"
}, QV = ["innerHTML"], $V = {
	class: "dropdown-menu dropdown-menu-end",
	"aria-labelledby": "userDropdown"
}, eH = ["innerHTML"], tH = ["onClick"], nH = ["onClick", "innerHTML"], rH = {
	key: 1,
	class: "d-inline-block"
}, iH = ["innerHTML"];
function aH(t, n, o, s, c, l) {
	return (t.panel != "registration" || t.registrationEnabled) && (!t.auth.user && t.panel != "login" || t.panel == "login") ? (_(), i("div", {
		key: 0,
		class: "vua-user-button d-inline-block",
		"data-bs-theme": [t.theme]
	}, [t.auth.user ? (_(), i("div", ZV, [a("button", {
		class: m(["dropdown-toggle", [t.settings.class]]),
		type: "button",
		id: "userDropdown",
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [a("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, QV)], 2), a("ul", $V, [(_(!0), i(e, null, y(t.settings.dropdowns, (n) => (_(), i(e, { key: n }, [n.action == "BUTTON_ROLES" ? (_(), i("li", {
		key: 0,
		class: m([[n.class], "d-flex items-align-center"])
	}, [a("span", {
		innerHTML: t.getValueOrFunction(n.label),
		class: "me-2"
	}, null, 8, eH), (_(!0), i(e, null, y(t.auth.user.roles, (e) => (_(), i("button", {
		key: e,
		onClick: (n) => t.setSelectedRole(e),
		class: m(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": e == t.auth.user.role }])
	}, x(e), 11, tH))), 128))], 2)) : (_(), i("li", {
		key: 1,
		class: m([n.class]),
		onClick: (e) => t.dropdownAction(n),
		innerHTML: t.getValueOrFunction(n.label)
	}, null, 10, nH))], 64))), 128))])])) : (_(), i("div", rH, [a("button", {
		class: m([t.settings.class]),
		type: "button",
		onClick: n[0] ||= (...e) => t.togglePanel && t.togglePanel(...e)
	}, [t.settings.icon ? (_(), i("i", {
		key: 0,
		class: m([t.settings.icon])
	}, null, 2)) : r("", !0), a("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, iH)], 2)]))], 8, XV)) : r("", !0);
}
var oH = /*#__PURE__*/ Jk(YV, [["render", aH]]), sH = {
	name: "VuAdminNav",
	props: {
		modelValue: Object,
		menu: {
			type: String,
			default: "admin"
		},
		url: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			auth: {},
			payload: null,
			loaded: !1
		};
	},
	computed: {
		navUrl() {
			return this.url ? this.url : typeof window < "u" && window.__VU_ADMIN_NAV_URL__ ? window.__VU_ADMIN_NAV_URL__ : (typeof window < "u" && window.__VU_ADMIN_PREFIX__ || "/szerk") + "/api/navs";
		},
		menuClass() {
			return this.payload && this.payload.class ? this.payload.class : "";
		},
		visibleItems() {
			return (this.payload && Array.isArray(this.payload.items) ? this.payload.items : []).filter((e) => !e.disabled);
		}
	},
	watch: { modelValue: {
		handler(e) {
			this.auth = e || {}, this.auth.success ? this.load() : (this.payload = null, this.loaded = !1);
		},
		deep: !0,
		immediate: !0
	} },
	methods: {
		visibleChildren(e) {
			return (Array.isArray(e.items) ? e.items.filter((e) => !e.disabled) : []).slice().sort((e, t) => String(e.name || "").localeCompare(String(t.name || "")));
		},
		async load() {
			if (this.loaded || !this.auth || !this.auth.success) return;
			let e = Yc("GET", { options: { headers: {} } }, {}, this.auth);
			try {
				let t = await fetch(this.navUrl, e);
				if (!t.ok) return;
				let n = await t.json();
				this.payload = n[this.menu] || { items: [] }, this.loaded = !0;
			} catch {
				this.payload = { items: [] };
			}
		}
	}
}, cH = {
	key: 0,
	class: "nav-item dropdown"
}, lH = ["innerHTML"], uH = { class: "dropdown-menu" }, dH = ["target", "href"], fH = ["innerHTML"], pH = {
	key: 1,
	class: "nav-item"
}, mH = ["target", "href"], hH = ["innerHTML"];
function gH(t, n, s, c, l, u) {
	return t.auth && t.auth.success && t.visibleItems.length ? (_(), i("ul", {
		key: 0,
		class: m(["navbar-nav me-auto mb-2 mb-lg-0", t.menuClass])
	}, [(_(!0), i(e, null, y(t.visibleItems, (n, r) => (_(), i(e, { key: r }, [n.items && n.items.length ? (_(), i("li", cH, [a("button", {
		class: m(["btn dropdown-toggle", n.class]),
		type: "button",
		"data-bs-toggle": "dropdown"
	}, [a("span", { innerHTML: n.icon }, null, 8, lH), a("span", null, x(n.name), 1)], 2), a("ul", uH, [(_(!0), i(e, null, y(t.visibleChildren(n), (e, t) => (_(), i("li", { key: t }, [a("a", {
		class: m(["dropdown-item", e.class]),
		target: e.target || "",
		href: e.href
	}, [a("span", { innerHTML: e.icon }, null, 8, fH), o(" " + x(e.name), 1)], 10, dH)]))), 128))])])) : (_(), i("li", pH, [a("a", {
		class: m(["nav-link scrollto", n.class]),
		target: n.target || "",
		href: n.href
	}, [a("span", { innerHTML: n.icon }, null, 8, hH), o(" " + x(n.name), 1)], 10, mH)]))], 64))), 128))], 2)) : r("", !0);
}
var _H = /*#__PURE__*/ Jk(sH, [["render", gH]]);
export { DB as VuAdmin, _H as VuAdminNav, JV as VuAuth, oH as VuUserButton };
