import { Fragment as e, Teleport as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, customRef as c, defineComponent as l, getCurrentInstance as u, h as d, markRaw as f, nextTick as p, normalizeClass as m, normalizeStyle as h, onBeforeUnmount as g, openBlock as _, ref as v, renderList as y, resolveComponent as b, toDisplayString as x, unref as S, vModelCheckbox as C, vModelDynamic as w, vModelSelect as T, vModelText as E, vShow as ee, watchEffect as te, withDirectives as D, withKeys as ne, withModifiers as O } from "vue";
//#region \0rolldown/runtime.js
var re = Object.defineProperty, ie = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ae = (e, t) => {
	let n = {};
	for (var r in e) re(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || re(n, Symbol.toStringTag, { value: "Module" }), n;
}, k = "bottom", oe = "right", A = "left", j = "auto", M = [
	"top",
	k,
	oe,
	A
], N = "start", se = "clippingParents", ce = "viewport", le = "popper", ue = "reference", de = /*#__PURE__*/ M.reduce(function(e, t) {
	return e.concat([t + "-" + N, t + "-end"]);
}, []), P = /*#__PURE__*/ [].concat(M, [j]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + N,
		t + "-end"
	]);
}, []), fe = "beforeRead", pe = "read", me = "afterRead", he = "beforeMain", ge = "main", _e = "afterMain", ve = "beforeWrite", ye = "write", be = "afterWrite", xe = [
	fe,
	pe,
	me,
	he,
	ge,
	_e,
	ve,
	ye,
	be
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function F(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function I(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function Se(e) {
	return e instanceof I(e).Element || e instanceof Element;
}
function Ce(e) {
	return e instanceof I(e).HTMLElement || e instanceof HTMLElement;
}
function we(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof I(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function Te(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!Ce(i) || !F(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function Ee(e) {
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
			!Ce(r) || !F(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var De = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: Te,
	effect: Ee,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function Oe(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var ke = Math.max, Ae = Math.min, je = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function Me() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function Ne() {
	return !/^((?!chrome|android).)*safari/i.test(Me());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function Pe(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && Ce(e) && (i = e.offsetWidth > 0 && je(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && je(r.height) / e.offsetHeight || 1);
	var o = (Se(e) ? I(e) : window).visualViewport, s = !Ne() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
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
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function Fe(e) {
	var t = Pe(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function Ie(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && we(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function Le(e) {
	return I(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Re(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(F(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function ze(e) {
	return ((Se(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function Be(e) {
	return F(e) === "html" ? e : e.assignedSlot || e.parentNode || (we(e) ? e.host : null) || ze(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function Ve(e) {
	return !Ce(e) || Le(e).position === "fixed" ? null : e.offsetParent;
}
function He(e) {
	var t = /firefox/i.test(Me());
	if (/Trident/i.test(Me()) && Ce(e) && Le(e).position === "fixed") return null;
	var n = Be(e);
	for (we(n) && (n = n.host); Ce(n) && ["html", "body"].indexOf(F(n)) < 0;) {
		var r = Le(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function Ue(e) {
	for (var t = I(e), n = Ve(e); n && Re(n) && Le(n).position === "static";) n = Ve(n);
	return n && (F(n) === "html" || F(n) === "body" && Le(n).position === "static") ? t : n || He(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function We(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function Ge(e, t, n) {
	return ke(e, Ae(t, n));
}
function Ke(e, t, n) {
	var r = Ge(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function qe() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function Je(e) {
	return Object.assign({}, qe(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function Ye(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var Xe = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Je(typeof e == "number" ? Ye(e, M) : e);
};
function Ze(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = Oe(n.placement), c = We(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = Xe(i.padding, n), d = Fe(a), f = c === "y" ? "top" : A, p = c === "y" ? k : oe, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = Ue(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = Ge(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function Qe(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Ie(t.elements.popper, r) && (t.elements.arrow = r));
}
var $e = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: Ze,
	effect: Qe,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function et(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var tt = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function nt(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: je(n * i) / i || 0,
		y: je(r * i) / i || 0
	};
}
function rt(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = A, b = "top", x = window;
	if (l) {
		var S = Ue(n), C = "clientHeight", w = "clientWidth";
		if (S === I(n) && (S = ze(n), Le(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = k;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = oe;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var ee = Object.assign({ position: s }, l && tt), te = u === !0 ? nt({
		x: p,
		y: h
	}, I(n)) : {
		x: p,
		y: h
	};
	if (p = te.x, h = te.y, c) {
		var D;
		return Object.assign({}, ee, (D = {}, D[b] = v ? "0" : "", D[y] = _ ? "0" : "", D.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", D));
	}
	return Object.assign({}, ee, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function it(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: Oe(t.placement),
		variation: et(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, rt(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, rt(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var at = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: it,
	data: {}
}, ot = { passive: !0 };
function st(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = I(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, ot);
	}), s && c.addEventListener("resize", n.update, ot), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, ot);
		}), s && c.removeEventListener("resize", n.update, ot);
	};
}
var ct = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: st,
	data: {}
}, lt = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ut(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return lt[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var dt = {
	start: "end",
	end: "start"
};
function ft(e) {
	return e.replace(/start|end/g, function(e) {
		return dt[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function pt(e) {
	var t = I(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function mt(e) {
	return Pe(ze(e)).left + pt(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function ht(e, t) {
	var n = I(e), r = ze(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = Ne();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + mt(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function gt(e) {
	var t = ze(e), n = pt(e), r = e.ownerDocument?.body, i = ke(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = ke(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + mt(e), s = -n.scrollTop;
	return Le(r || t).direction === "rtl" && (o += ke(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function _t(e) {
	var t = Le(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function vt(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(F(e)) >= 0 ? e.ownerDocument.body : Ce(e) && _t(e) ? e : vt(Be(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function yt(e, t) {
	t === void 0 && (t = []);
	var n = vt(e), r = n === e.ownerDocument?.body, i = I(n), a = r ? [i].concat(i.visualViewport || [], _t(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(yt(Be(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function bt(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function xt(e, t) {
	var n = Pe(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function St(e, t, n) {
	return t === "viewport" ? bt(ht(e, n)) : Se(t) ? xt(t, n) : bt(gt(ze(e)));
}
function Ct(e) {
	var t = yt(Be(e)), n = ["absolute", "fixed"].indexOf(Le(e).position) >= 0 && Ce(e) ? Ue(e) : e;
	return Se(n) ? t.filter(function(e) {
		return Se(e) && Ie(e, n) && F(e) !== "body";
	}) : [];
}
function wt(e, t, n, r) {
	var i = t === "clippingParents" ? Ct(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = St(e, n, r);
		return t.top = ke(i.top, t.top), t.right = Ae(i.right, t.right), t.bottom = Ae(i.bottom, t.bottom), t.left = ke(i.left, t.left), t;
	}, St(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Tt(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? Oe(r) : null, a = r ? et(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case k:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case oe:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case A:
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
	var l = i ? We(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case N:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end":
				c[l] = c[l] + (t[u] / 2 - n[u] / 2);
				break;
			default:
		}
	}
	return c;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function Et(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? se : s, l = n.rootBoundary, u = l === void 0 ? ce : l, d = n.elementContext, f = d === void 0 ? le : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = Je(typeof g == "number" ? Ye(g, M) : g), v = f === "popper" ? ue : le, y = e.rects.popper, b = e.elements[m ? v : f], x = wt(Se(b) ? b : b.contextElement || ze(e.elements.popper), c, u, o), S = Pe(e.elements.reference), C = Tt({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = bt(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
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
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Dt(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? P : c, u = et(r), d = u ? s ? de : de.filter(function(e) {
		return et(e) === u;
	}) : M, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = Et(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[Oe(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function Ot(e) {
	if (Oe(e) === "auto") return [];
	var t = ut(e);
	return [
		ft(e),
		t,
		ft(t)
	];
}
function kt(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, _ = Oe(g) === g, v = c || (_ || !m ? [ut(g)] : Ot(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(Oe(n) === "auto" ? Dt(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], ee = Oe(E), te = et(E) === N, D = ["top", k].indexOf(ee) >= 0, ne = D ? "width" : "height", O = Et(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), re = D ? te ? oe : A : te ? k : "top";
			b[ne] > x[ne] && (re = ut(re));
			var ie = ut(re), ae = [];
			if (a && ae.push(O[ee] <= 0), s && ae.push(O[re] <= 0, O[ie] <= 0), ae.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, ae);
		}
		if (C) for (var j = m ? 3 : 1, M = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, se = j; se > 0 && M(se) !== "break"; se--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var At = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: kt,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function jt(e, t, n) {
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
function Mt(e) {
	return [
		"top",
		oe,
		k,
		A
	].some(function(t) {
		return e[t] >= 0;
	});
}
function Nt(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = Et(t, { elementContext: "reference" }), s = Et(t, { altBoundary: !0 }), c = jt(o, r), l = jt(s, i, a), u = Mt(c), d = Mt(l);
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
var Pt = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: Nt
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function Ft(e, t, n) {
	var r = Oe(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function It(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = P.reduce(function(e, n) {
		return e[n] = Ft(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var Lt = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: It
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function Rt(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Tt({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var zt = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: Rt,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function Bt(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function Vt(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = Et(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = Oe(t.placement), v = et(t.placement), y = !v, b = We(_), x = Bt(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
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
			var D = b === "y" ? "top" : A, ne = b === "y" ? k : oe, O = b === "y" ? "height" : "width", re = S[b], ie = re + g[D], ae = re - g[ne], j = p ? -w[O] / 2 : 0, M = v === "start" ? C[O] : w[O], N = v === "start" ? -w[O] : -C[O], se = t.elements.arrow, ce = p && se ? Fe(se) : {
				width: 0,
				height: 0
			}, le = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : qe(), ue = le[D], de = le[ne], P = Ge(0, C[O], ce[O]), fe = y ? C[O] / 2 - j - P - ue - E.mainAxis : M - P - ue - E.mainAxis, pe = y ? -C[O] / 2 + j + P + de + E.mainAxis : N + P + de + E.mainAxis, me = t.elements.arrow && Ue(t.elements.arrow), he = me ? b === "y" ? me.clientTop || 0 : me.clientLeft || 0 : 0, ge = ee?.[b] ?? 0, _e = re + fe - ge - he, ve = re + pe - ge, ye = Ge(p ? Ae(ie, _e) : ie, re, p ? ke(ae, ve) : ae);
			S[b] = ye, te[b] = ye - re;
		}
		if (s) {
			var be = b === "x" ? "top" : A, xe = b === "x" ? k : oe, F = S[x], I = x === "y" ? "height" : "width", Se = F + g[be], Ce = F - g[xe], we = ["top", A].indexOf(_) !== -1, Te = ee?.[x] ?? 0, Ee = we ? Se : F - C[I] - w[I] - Te + E.altAxis, De = we ? F + C[I] + w[I] - Te - E.altAxis : Ce, je = p && we ? Ke(Ee, F, De) : Ge(p ? Ee : Se, F, p ? De : Ce);
			S[x] = je, te[x] = je - F;
		}
		t.modifiersData[r] = te;
	}
}
var Ht = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: Vt,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function Ut(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function Wt(e) {
	return e === I(e) || !Ce(e) ? pt(e) : Ut(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function Gt(e) {
	var t = e.getBoundingClientRect(), n = je(t.width) / e.offsetWidth || 1, r = je(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function Kt(e, t, n) {
	n === void 0 && (n = !1);
	var r = Ce(t), i = Ce(t) && Gt(t), a = ze(t), o = Pe(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((F(t) !== "body" || _t(a)) && (s = Wt(t)), Ce(t) ? (c = Pe(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = mt(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function qt(e) {
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
function Jt(e) {
	var t = qt(e);
	return xe.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function Yt(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function Xt(e) {
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
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var Zt = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function Qt() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function $t(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? Zt : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, Zt, a),
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
					reference: Se(e) ? yt(e) : e.contextElement ? yt(e.contextElement) : [],
					popper: yt(t)
				};
				var s = Jt(Xt([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (Qt(t, n)) {
						i.rects = {
							reference: Kt(t, Ue(n), i.options.strategy === "fixed"),
							popper: Fe(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) {
							if (i.reset === !0) {
								i.reset = !1, r = -1;
								continue;
							}
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
			update: Yt(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!Qt(e, t)) return c;
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
var en = /*#__PURE__*/ $t(), tn = /*#__PURE__*/ $t({ defaultModifiers: [
	ct,
	zt,
	at,
	De
] }), nn = /*#__PURE__*/ $t({ defaultModifiers: [
	ct,
	zt,
	at,
	De,
	Lt,
	At,
	Ht,
	$e,
	Pt
] }), rn = /* @__PURE__ */ ae({
	afterMain: () => _e,
	afterRead: () => me,
	afterWrite: () => be,
	applyStyles: () => De,
	arrow: () => $e,
	auto: () => j,
	basePlacements: () => M,
	beforeMain: () => he,
	beforeRead: () => fe,
	beforeWrite: () => ve,
	bottom: () => k,
	clippingParents: () => se,
	computeStyles: () => at,
	createPopper: () => nn,
	createPopperBase: () => en,
	createPopperLite: () => tn,
	detectOverflow: () => Et,
	end: () => "end",
	eventListeners: () => ct,
	flip: () => At,
	hide: () => Pt,
	left: () => A,
	main: () => ge,
	modifierPhases: () => xe,
	offset: () => Lt,
	placements: () => P,
	popper: () => le,
	popperGenerator: () => $t,
	popperOffsets: () => zt,
	preventOverflow: () => Ht,
	read: () => pe,
	reference: () => ue,
	right: () => oe,
	start: () => N,
	top: () => "top",
	variationPlacements: () => de,
	viewport: () => ce,
	write: () => ye
}), an = /* @__PURE__ */ new Map(), on = {
	set(e, t, n) {
		an.has(e) || an.set(e, /* @__PURE__ */ new Map());
		let r = an.get(e);
		if (!r.has(t) && r.size !== 0) {
			console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
			return;
		}
		r.set(t, n);
	},
	get(e, t) {
		return an.has(e) && an.get(e).get(t) || null;
	},
	remove(e, t) {
		if (!an.has(e)) return;
		let n = an.get(e);
		n.delete(t), n.size === 0 && an.delete(e);
	}
}, sn = 1e6, cn = 1e3, ln = "transitionend", un = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)), e), dn = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), fn = (e) => {
	do
		e += Math.floor(Math.random() * sn);
	while (document.getElementById(e));
	return e;
}, pn = (e) => {
	if (!e) return 0;
	let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
	return !Number.parseFloat(t) && !Number.parseFloat(n) ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * cn);
}, mn = (e) => {
	e.dispatchEvent(new Event(ln));
}, hn = (e) => !e || typeof e != "object" ? !1 : (e.jquery !== void 0 && (e = e[0]), e.nodeType !== void 0), gn = (e) => hn(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(un(e)) : null, _n = (e) => {
	if (!hn(e) || e.getClientRects().length === 0) return !1;
	let t = getComputedStyle(e).getPropertyValue("visibility") === "visible", n = e.closest("details:not([open])");
	if (!n) return t;
	if (n !== e) {
		let t = e.closest("summary");
		if (t && t.parentNode !== n || t === null) return !1;
	}
	return t;
}, vn = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : e.disabled === void 0 ? e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false" : e.disabled, yn = (e) => {
	if (!document.documentElement.attachShadow) return null;
	if (typeof e.getRootNode == "function") {
		let t = e.getRootNode();
		return t instanceof ShadowRoot ? t : null;
	}
	return e instanceof ShadowRoot ? e : e.parentNode ? yn(e.parentNode) : null;
}, bn = () => {}, xn = (e) => {
	e.offsetHeight;
}, Sn = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Cn = [], wn = (e) => {
	document.readyState === "loading" ? (Cn.length || document.addEventListener("DOMContentLoaded", () => {
		for (let e of Cn) e();
	}), Cn.push(e)) : e();
}, Tn = () => document.documentElement.dir === "rtl", En = (e) => {
	wn(() => {
		let t = Sn();
		/* istanbul ignore if */
		if (t) {
			let n = e.NAME, r = t.fn[n];
			t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
		}
	});
}, Dn = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, On = (e, t, n = !0) => {
	if (!n) {
		Dn(e);
		return;
	}
	let r = pn(t) + 5, i = !1, a = ({ target: n }) => {
		n === t && (i = !0, t.removeEventListener(ln, a), Dn(e));
	};
	t.addEventListener(ln, a), setTimeout(() => {
		i || mn(t);
	}, r);
}, kn = (e, t, n, r) => {
	let i = e.length, a = e.indexOf(t);
	return a === -1 ? !n && r ? e[i - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + i) % i), e[Math.max(0, Math.min(a, i - 1))]);
}, An = /[^.]*(?=\..*)\.|.*/, jn = /\..*/, Mn = /::\d+$/, Nn = {}, Pn = 1, Fn = {
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, In = /* @__PURE__ */ new Set(/* @__PURE__ */ "click.dblclick.mouseup.mousedown.contextmenu.mousewheel.DOMMouseScroll.mouseover.mouseout.mousemove.selectstart.selectend.keydown.keypress.keyup.orientationchange.touchstart.touchmove.touchend.touchcancel.pointerdown.pointermove.pointerup.pointerleave.pointercancel.gesturestart.gesturechange.gestureend.focus.blur.change.reset.select.submit.focusin.focusout.load.unload.beforeunload.resize.move.DOMContentLoaded.readystatechange.error.abort.scroll".split("."));
function Ln(e, t) {
	return t && `${t}::${Pn++}` || e.uidEvent || Pn++;
}
function Rn(e) {
	let t = Ln(e);
	return e.uidEvent = t, Nn[t] = Nn[t] || {}, Nn[t];
}
function zn(e, t) {
	return function n(r) {
		return qn(r, { delegateTarget: e }), n.oneOff && L.off(e, r.type, t), t.apply(e, [r]);
	};
}
function Bn(e, t, n) {
	return function r(i) {
		let a = e.querySelectorAll(t);
		for (let { target: o } = i; o && o !== this; o = o.parentNode) for (let s of a) if (s === o) return qn(i, { delegateTarget: o }), r.oneOff && L.off(e, i.type, t, n), n.apply(o, [i]);
	};
}
function Vn(e, t, n = null) {
	return Object.values(e).find((e) => e.callable === t && e.delegationSelector === n);
}
function Hn(e, t, n) {
	let r = typeof t == "string", i = r ? n : t || n, a = Kn(e);
	return In.has(a) || (a = e), [
		r,
		i,
		a
	];
}
function Un(e, t, n, r, i) {
	if (typeof t != "string" || !e) return;
	let [a, o, s] = Hn(t, n, r);
	t in Fn && (o = ((e) => function(t) {
		if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t);
	})(o));
	let c = Rn(e), l = c[s] || (c[s] = {}), u = Vn(l, o, a ? n : null);
	if (u) {
		u.oneOff = u.oneOff && i;
		return;
	}
	let d = Ln(o, t.replace(An, "")), f = a ? Bn(e, n, o) : zn(e, o);
	f.delegationSelector = a ? n : null, f.callable = o, f.oneOff = i, f.uidEvent = d, l[d] = f, e.addEventListener(s, f, a);
}
function Wn(e, t, n, r, i) {
	let a = Vn(t[n], r, i);
	a && (e.removeEventListener(n, a, !!i), delete t[n][a.uidEvent]);
}
function Gn(e, t, n, r) {
	let i = t[n] || {};
	for (let [a, o] of Object.entries(i)) a.includes(r) && Wn(e, t, n, o.callable, o.delegationSelector);
}
function Kn(e) {
	return e = e.replace(jn, ""), Fn[e] || e;
}
var L = {
	on(e, t, n, r) {
		Un(e, t, n, r, !1);
	},
	one(e, t, n, r) {
		Un(e, t, n, r, !0);
	},
	off(e, t, n, r) {
		if (typeof t != "string" || !e) return;
		let [i, a, o] = Hn(t, n, r), s = o !== t, c = Rn(e), l = c[o] || {}, u = t.startsWith(".");
		if (a !== void 0) {
			if (!Object.keys(l).length) return;
			Wn(e, c, o, a, i ? n : null);
			return;
		}
		if (u) for (let n of Object.keys(c)) Gn(e, c, n, t.slice(1));
		for (let [n, r] of Object.entries(l)) {
			let i = n.replace(Mn, "");
			(!s || t.includes(i)) && Wn(e, c, o, r.callable, r.delegationSelector);
		}
	},
	trigger(e, t, n) {
		if (typeof t != "string" || !e) return null;
		let r = Sn(), i = t !== Kn(t), a = null, o = !0, s = !0, c = !1;
		i && r && (a = r.Event(t, n), r(e).trigger(a), o = !a.isPropagationStopped(), s = !a.isImmediatePropagationStopped(), c = a.isDefaultPrevented());
		let l = qn(new Event(t, {
			bubbles: o,
			cancelable: !0
		}), n);
		return c && l.preventDefault(), s && e.dispatchEvent(l), l.defaultPrevented && a && a.preventDefault(), l;
	}
};
function qn(e, t = {}) {
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
function Jn(e) {
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
function Yn(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
var Xn = {
	setDataAttribute(e, t, n) {
		e.setAttribute(`data-bs-${Yn(t)}`, n);
	},
	removeDataAttribute(e, t) {
		e.removeAttribute(`data-bs-${Yn(t)}`);
	},
	getDataAttributes(e) {
		if (!e) return {};
		let t = {}, n = Object.keys(e.dataset).filter((e) => e.startsWith("bs") && !e.startsWith("bsConfig"));
		for (let r of n) {
			let n = r.replace(/^bs/, "");
			n = n.charAt(0).toLowerCase() + n.slice(1), t[n] = Jn(e.dataset[r]);
		}
		return t;
	},
	getDataAttribute(e, t) {
		return Jn(e.getAttribute(`data-bs-${Yn(t)}`));
	}
}, Zn = class {
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
		let n = hn(t) ? Xn.getDataAttribute(t, "config") : {};
		return {
			...this.constructor.Default,
			...typeof n == "object" ? n : {},
			...hn(t) ? Xn.getDataAttributes(t) : {},
			...typeof e == "object" ? e : {}
		};
	}
	_typeCheckConfig(e, t = this.constructor.DefaultType) {
		for (let [n, r] of Object.entries(t)) {
			let t = e[n], i = hn(t) ? "element" : dn(t);
			if (!new RegExp(r).test(i)) throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${i}" but expected type "${r}".`);
		}
	}
}, Qn = "5.3.8", $n = class extends Zn {
	constructor(e, t) {
		super(), e = gn(e), e && (this._element = e, this._config = this._getConfig(t), on.set(this._element, this.constructor.DATA_KEY, this));
	}
	dispose() {
		on.remove(this._element, this.constructor.DATA_KEY), L.off(this._element, this.constructor.EVENT_KEY);
		for (let e of Object.getOwnPropertyNames(this)) this[e] = null;
	}
	_queueCallback(e, t, n = !0) {
		On(e, t, n);
	}
	_getConfig(e) {
		return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	static getInstance(e) {
		return on.get(gn(e), this.DATA_KEY);
	}
	static getOrCreateInstance(e, t = {}) {
		return this.getInstance(e) || new this(e, typeof t == "object" ? t : null);
	}
	static get VERSION() {
		return Qn;
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
}, er = (e) => {
	let t = e.getAttribute("data-bs-target");
	if (!t || t === "#") {
		let n = e.getAttribute("href");
		if (!n || !n.includes("#") && !n.startsWith(".")) return null;
		n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
	}
	return t ? t.split(",").map((e) => un(e)).join(",") : null;
}, R = {
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
		return this.find(t, e).filter((e) => !vn(e) && _n(e));
	},
	getSelectorFromElement(e) {
		let t = er(e);
		return t && R.findOne(t) ? t : null;
	},
	getElementFromSelector(e) {
		let t = er(e);
		return t ? R.findOne(t) : null;
	},
	getMultipleElementsFromSelector(e) {
		let t = er(e);
		return t ? R.find(t) : [];
	}
}, tr = (e, t = "hide") => {
	let n = `click.dismiss${e.EVENT_KEY}`, r = e.NAME;
	L.on(document, n, `[data-bs-dismiss="${r}"]`, function(n) {
		if (["A", "AREA"].includes(this.tagName) && n.preventDefault(), vn(this)) return;
		let i = R.getElementFromSelector(this) || this.closest(`.${r}`);
		e.getOrCreateInstance(i)[t]();
	});
}, nr = "alert", rr = ".bs.alert", ir = `close${rr}`, ar = `closed${rr}`, or = "fade", sr = "show", cr = class e extends $n {
	static get NAME() {
		return nr;
	}
	close() {
		if (L.trigger(this._element, ir).defaultPrevented) return;
		this._element.classList.remove(sr);
		let e = this._element.classList.contains(or);
		this._queueCallback(() => this._destroyElement(), this._element, e);
	}
	_destroyElement() {
		this._element.remove(), L.trigger(this._element, ar), this.dispose();
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
tr(cr, "close"), En(cr);
var lr = "button", ur = ".bs.button", dr = ".data-api", fr = "active", pr = "[data-bs-toggle=\"button\"]", mr = `click${ur}${dr}`, hr = class e extends $n {
	static get NAME() {
		return lr;
	}
	toggle() {
		this._element.setAttribute("aria-pressed", this._element.classList.toggle(fr));
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this);
			t === "toggle" && n[t]();
		});
	}
};
L.on(document, mr, pr, (e) => {
	e.preventDefault();
	let t = e.target.closest(pr);
	hr.getOrCreateInstance(t).toggle();
}), En(hr);
var gr = "swipe", _r = ".bs.swipe", vr = `touchstart${_r}`, yr = `touchmove${_r}`, br = `touchend${_r}`, xr = `pointerdown${_r}`, Sr = `pointerup${_r}`, Cr = "touch", wr = "pen", Tr = "pointer-event", Er = 40, Dr = {
	endCallback: null,
	leftCallback: null,
	rightCallback: null
}, Or = {
	endCallback: "(function|null)",
	leftCallback: "(function|null)",
	rightCallback: "(function|null)"
}, kr = class e extends Zn {
	constructor(t, n) {
		super(), this._element = t, !(!t || !e.isSupported()) && (this._config = this._getConfig(n), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
	}
	static get Default() {
		return Dr;
	}
	static get DefaultType() {
		return Or;
	}
	static get NAME() {
		return gr;
	}
	dispose() {
		L.off(this._element, _r);
	}
	_start(e) {
		if (!this._supportPointerEvents) {
			this._deltaX = e.touches[0].clientX;
			return;
		}
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX);
	}
	_end(e) {
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), Dn(this._config.endCallback);
	}
	_move(e) {
		this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
	}
	_handleSwipe() {
		let e = Math.abs(this._deltaX);
		if (e <= Er) return;
		let t = e / this._deltaX;
		this._deltaX = 0, t && Dn(t > 0 ? this._config.rightCallback : this._config.leftCallback);
	}
	_initEvents() {
		this._supportPointerEvents ? (L.on(this._element, xr, (e) => this._start(e)), L.on(this._element, Sr, (e) => this._end(e)), this._element.classList.add(Tr)) : (L.on(this._element, vr, (e) => this._start(e)), L.on(this._element, yr, (e) => this._move(e)), L.on(this._element, br, (e) => this._end(e)));
	}
	_eventIsPointerPenTouch(e) {
		return this._supportPointerEvents && (e.pointerType === wr || e.pointerType === Cr);
	}
	static isSupported() {
		return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
	}
}, Ar = "carousel", jr = ".bs.carousel", Mr = ".data-api", Nr = "ArrowLeft", Pr = "ArrowRight", Fr = 500, Ir = "next", Lr = "prev", Rr = "left", zr = "right", Br = `slide${jr}`, Vr = `slid${jr}`, Hr = `keydown${jr}`, Ur = `mouseenter${jr}`, Wr = `mouseleave${jr}`, Gr = `dragstart${jr}`, Kr = `load${jr}${Mr}`, qr = `click${jr}${Mr}`, Jr = "carousel", Yr = "active", Xr = "slide", Zr = "carousel-item-end", Qr = "carousel-item-start", $r = "carousel-item-next", ei = "carousel-item-prev", ti = ".active", ni = ".carousel-item", ri = ".active.carousel-item", ii = ".carousel-item img", ai = ".carousel-indicators", oi = "[data-bs-slide], [data-bs-slide-to]", si = "[data-bs-ride=\"carousel\"]", ci = {
	[Nr]: zr,
	[Pr]: Rr
}, li = {
	interval: 5e3,
	keyboard: !0,
	pause: "hover",
	ride: !1,
	touch: !0,
	wrap: !0
}, ui = {
	interval: "(number|boolean)",
	keyboard: "boolean",
	pause: "(string|boolean)",
	ride: "(boolean|string)",
	touch: "boolean",
	wrap: "boolean"
}, di = class e extends $n {
	constructor(e, t) {
		super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = R.findOne(ai, this._element), this._addEventListeners(), this._config.ride === Jr && this.cycle();
	}
	static get Default() {
		return li;
	}
	static get DefaultType() {
		return ui;
	}
	static get NAME() {
		return Ar;
	}
	next() {
		this._slide(Ir);
	}
	nextWhenVisible() {
		!document.hidden && _n(this._element) && this.next();
	}
	prev() {
		this._slide(Lr);
	}
	pause() {
		this._isSliding && mn(this._element), this._clearInterval();
	}
	cycle() {
		this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	}
	_maybeEnableCycle() {
		if (this._config.ride) {
			if (this._isSliding) {
				L.one(this._element, Vr, () => this.cycle());
				return;
			}
			this.cycle();
		}
	}
	to(e) {
		let t = this._getItems();
		if (e > t.length - 1 || e < 0) return;
		if (this._isSliding) {
			L.one(this._element, Vr, () => this.to(e));
			return;
		}
		let n = this._getItemIndex(this._getActive());
		if (n === e) return;
		let r = e > n ? Ir : Lr;
		this._slide(r, t[e]);
	}
	dispose() {
		this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.defaultInterval = e.interval, e;
	}
	_addEventListeners() {
		this._config.keyboard && L.on(this._element, Hr, (e) => this._keydown(e)), this._config.pause === "hover" && (L.on(this._element, Ur, () => this.pause()), L.on(this._element, Wr, () => this._maybeEnableCycle())), this._config.touch && kr.isSupported() && this._addTouchEventListeners();
	}
	_addTouchEventListeners() {
		for (let e of R.find(ii, this._element)) L.on(e, Gr, (e) => e.preventDefault());
		let e = {
			leftCallback: () => this._slide(this._directionToOrder(Rr)),
			rightCallback: () => this._slide(this._directionToOrder(zr)),
			endCallback: () => {
				this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Fr + this._config.interval));
			}
		};
		this._swipeHelper = new kr(this._element, e);
	}
	_keydown(e) {
		if (/input|textarea/i.test(e.target.tagName)) return;
		let t = ci[e.key];
		t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
	}
	_getItemIndex(e) {
		return this._getItems().indexOf(e);
	}
	_setActiveIndicatorElement(e) {
		if (!this._indicatorsElement) return;
		let t = R.findOne(ti, this._indicatorsElement);
		t.classList.remove(Yr), t.removeAttribute("aria-current");
		let n = R.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
		n && (n.classList.add(Yr), n.setAttribute("aria-current", "true"));
	}
	_updateInterval() {
		let e = this._activeElement || this._getActive();
		if (!e) return;
		let t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
		this._config.interval = t || this._config.defaultInterval;
	}
	_slide(e, t = null) {
		if (this._isSliding) return;
		let n = this._getActive(), r = e === Ir, i = t || kn(this._getItems(), n, r, this._config.wrap);
		if (i === n) return;
		let a = this._getItemIndex(i), o = (t) => L.trigger(this._element, t, {
			relatedTarget: i,
			direction: this._orderToDirection(e),
			from: this._getItemIndex(n),
			to: a
		});
		if (o(Br).defaultPrevented || !n || !i) return;
		let s = !!this._interval;
		this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = i;
		let c = r ? Qr : Zr, l = r ? $r : ei;
		i.classList.add(l), xn(i), n.classList.add(c), i.classList.add(c), this._queueCallback(() => {
			i.classList.remove(c, l), i.classList.add(Yr), n.classList.remove(Yr, l, c), this._isSliding = !1, o(Vr);
		}, n, this._isAnimated()), s && this.cycle();
	}
	_isAnimated() {
		return this._element.classList.contains(Xr);
	}
	_getActive() {
		return R.findOne(ri, this._element);
	}
	_getItems() {
		return R.find(ni, this._element);
	}
	_clearInterval() {
		this._interval &&= (clearInterval(this._interval), null);
	}
	_directionToOrder(e) {
		return Tn() ? e === Rr ? Lr : Ir : e === Rr ? Ir : Lr;
	}
	_orderToDirection(e) {
		return Tn() ? e === Lr ? Rr : zr : e === Lr ? zr : Rr;
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this, t);
			if (typeof t == "number") {
				n.to(t);
				return;
			}
			if (typeof t == "string") {
				if (n[t] === void 0 || t.startsWith("_") || t === "constructor") throw TypeError(`No method named "${t}"`);
				n[t]();
			}
		});
	}
};
L.on(document, qr, oi, function(e) {
	let t = R.getElementFromSelector(this);
	if (!t || !t.classList.contains(Jr)) return;
	e.preventDefault();
	let n = di.getOrCreateInstance(t), r = this.getAttribute("data-bs-slide-to");
	if (r) {
		n.to(r), n._maybeEnableCycle();
		return;
	}
	if (Xn.getDataAttribute(this, "slide") === "next") {
		n.next(), n._maybeEnableCycle();
		return;
	}
	n.prev(), n._maybeEnableCycle();
}), L.on(window, Kr, () => {
	let e = R.find(si);
	for (let t of e) di.getOrCreateInstance(t);
}), En(di);
var fi = "collapse", pi = ".bs.collapse", mi = ".data-api", hi = `show${pi}`, gi = `shown${pi}`, _i = `hide${pi}`, vi = `hidden${pi}`, yi = `click${pi}${mi}`, bi = "show", xi = "collapse", Si = "collapsing", Ci = "collapsed", wi = `:scope .${xi} .${xi}`, Ti = "collapse-horizontal", Ei = "width", Di = "height", Oi = ".collapse.show, .collapse.collapsing", ki = "[data-bs-toggle=\"collapse\"]", Ai = {
	parent: null,
	toggle: !0
}, ji = {
	parent: "(null|element)",
	toggle: "boolean"
}, Mi = class e extends $n {
	constructor(e, t) {
		super(e, t), this._isTransitioning = !1, this._triggerArray = [];
		let n = R.find(ki);
		for (let e of n) {
			let t = R.getSelectorFromElement(e), n = R.find(t).filter((e) => e === this._element);
			t !== null && n.length && this._triggerArray.push(e);
		}
		this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
	}
	static get Default() {
		return Ai;
	}
	static get DefaultType() {
		return ji;
	}
	static get NAME() {
		return fi;
	}
	toggle() {
		this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (this._isTransitioning || this._isShown()) return;
		let t = [];
		if (this._config.parent && (t = this._getFirstLevelChildren(Oi).filter((e) => e !== this._element).map((t) => e.getOrCreateInstance(t, { toggle: !1 }))), t.length && t[0]._isTransitioning || L.trigger(this._element, hi).defaultPrevented) return;
		for (let e of t) e.hide();
		let n = this._getDimension();
		this._element.classList.remove(xi), this._element.classList.add(Si), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
		let r = () => {
			this._isTransitioning = !1, this._element.classList.remove(Si), this._element.classList.add(xi, bi), this._element.style[n] = "", L.trigger(this._element, gi);
		}, i = `scroll${n[0].toUpperCase() + n.slice(1)}`;
		this._queueCallback(r, this._element, !0), this._element.style[n] = `${this._element[i]}px`;
	}
	hide() {
		if (this._isTransitioning || !this._isShown() || L.trigger(this._element, _i).defaultPrevented) return;
		let e = this._getDimension();
		this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, xn(this._element), this._element.classList.add(Si), this._element.classList.remove(xi, bi);
		for (let e of this._triggerArray) {
			let t = R.getElementFromSelector(e);
			t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
		}
		this._isTransitioning = !0;
		let t = () => {
			this._isTransitioning = !1, this._element.classList.remove(Si), this._element.classList.add(xi), L.trigger(this._element, vi);
		};
		this._element.style[e] = "", this._queueCallback(t, this._element, !0);
	}
	_isShown(e = this._element) {
		return e.classList.contains(bi);
	}
	_configAfterMerge(e) {
		return e.toggle = !!e.toggle, e.parent = gn(e.parent), e;
	}
	_getDimension() {
		return this._element.classList.contains(Ti) ? Ei : Di;
	}
	_initializeChildren() {
		if (!this._config.parent) return;
		let e = this._getFirstLevelChildren(ki);
		for (let t of e) {
			let e = R.getElementFromSelector(t);
			e && this._addAriaAndCollapsedClass([t], this._isShown(e));
		}
	}
	_getFirstLevelChildren(e) {
		let t = R.find(wi, this._config.parent);
		return R.find(e, this._config.parent).filter((e) => !t.includes(e));
	}
	_addAriaAndCollapsedClass(e, t) {
		if (e.length) for (let n of e) n.classList.toggle(Ci, !t), n.setAttribute("aria-expanded", t);
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
L.on(document, yi, ki, function(e) {
	(e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
	for (let e of R.getMultipleElementsFromSelector(this)) Mi.getOrCreateInstance(e, { toggle: !1 }).toggle();
}), En(Mi);
var Ni = "dropdown", Pi = ".bs.dropdown", Fi = ".data-api", Ii = "Escape", Li = "Tab", Ri = "ArrowUp", zi = "ArrowDown", Bi = 2, Vi = `hide${Pi}`, Hi = `hidden${Pi}`, Ui = `show${Pi}`, Wi = `shown${Pi}`, Gi = `click${Pi}${Fi}`, Ki = `keydown${Pi}${Fi}`, qi = `keyup${Pi}${Fi}`, Ji = "show", Yi = "dropup", Xi = "dropend", Zi = "dropstart", Qi = "dropup-center", $i = "dropdown-center", ea = "[data-bs-toggle=\"dropdown\"]:not(.disabled):not(:disabled)", ta = `${ea}.${Ji}`, na = ".dropdown-menu", ra = ".navbar", ia = ".navbar-nav", aa = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", oa = Tn() ? "top-end" : "top-start", sa = Tn() ? "top-start" : "top-end", ca = Tn() ? "bottom-end" : "bottom-start", la = Tn() ? "bottom-start" : "bottom-end", ua = Tn() ? "left-start" : "right-start", da = Tn() ? "right-start" : "left-start", fa = "top", pa = "bottom", ma = {
	autoClose: !0,
	boundary: "clippingParents",
	display: "dynamic",
	offset: [0, 2],
	popperConfig: null,
	reference: "toggle"
}, ha = {
	autoClose: "(boolean|string)",
	boundary: "(string|element)",
	display: "string",
	offset: "(array|string|function)",
	popperConfig: "(null|object|function)",
	reference: "(string|element|object)"
}, ga = class e extends $n {
	constructor(e, t) {
		super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = R.next(this._element, na)[0] || R.prev(this._element, na)[0] || R.findOne(na, this._parent), this._inNavbar = this._detectNavbar();
	}
	static get Default() {
		return ma;
	}
	static get DefaultType() {
		return ha;
	}
	static get NAME() {
		return Ni;
	}
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (vn(this._element) || this._isShown()) return;
		let e = { relatedTarget: this._element };
		if (!L.trigger(this._element, Ui, e).defaultPrevented) {
			if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(ia)) for (let e of [].concat(...document.body.children)) L.on(e, "mouseover", bn);
			this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ji), this._element.classList.add(Ji), L.trigger(this._element, Wi, e);
		}
	}
	hide() {
		if (vn(this._element) || !this._isShown()) return;
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
		if (!L.trigger(this._element, Vi, e).defaultPrevented) {
			if ("ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) L.off(e, "mouseover", bn);
			this._popper && this._popper.destroy(), this._menu.classList.remove(Ji), this._element.classList.remove(Ji), this._element.setAttribute("aria-expanded", "false"), Xn.removeDataAttribute(this._menu, "popper"), L.trigger(this._element, Hi, e);
		}
	}
	_getConfig(e) {
		if (e = super._getConfig(e), typeof e.reference == "object" && !hn(e.reference) && typeof e.reference.getBoundingClientRect != "function") throw TypeError(`${Ni.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		return e;
	}
	_createPopper() {
		if (rn === void 0) throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
		let e = this._element;
		this._config.reference === "parent" ? e = this._parent : hn(this._config.reference) ? e = gn(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
		let t = this._getPopperConfig();
		this._popper = nn(e, this._menu, t);
	}
	_isShown() {
		return this._menu.classList.contains(Ji);
	}
	_getPlacement() {
		let e = this._parent;
		if (e.classList.contains(Xi)) return ua;
		if (e.classList.contains(Zi)) return da;
		if (e.classList.contains(Qi)) return fa;
		if (e.classList.contains($i)) return pa;
		let t = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
		return e.classList.contains(Yi) ? t ? sa : oa : t ? la : ca;
	}
	_detectNavbar() {
		return this._element.closest(ra) !== null;
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
		return (this._inNavbar || this._config.display === "static") && (Xn.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
			name: "applyStyles",
			enabled: !1
		}]), {
			...e,
			...Dn(this._config.popperConfig, [void 0, e])
		};
	}
	_selectMenuItem({ key: e, target: t }) {
		let n = R.find(aa, this._menu).filter((e) => _n(e));
		n.length && kn(n, t, e === zi, !n.includes(t)).focus();
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
		if (t.button === Bi || t.type === "keyup" && t.key !== Li) return;
		let n = R.find(ta);
		for (let r of n) {
			let n = e.getInstance(r);
			if (!n || n._config.autoClose === !1) continue;
			let i = t.composedPath(), a = i.includes(n._menu);
			if (i.includes(n._element) || n._config.autoClose === "inside" && !a || n._config.autoClose === "outside" && a || n._menu.contains(t.target) && (t.type === "keyup" && t.key === Li || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
			let o = { relatedTarget: n._element };
			t.type === "click" && (o.clickEvent = t), n._completeHide(o);
		}
	}
	static dataApiKeydownHandler(t) {
		let n = /input|textarea/i.test(t.target.tagName), r = t.key === Ii, i = [Ri, zi].includes(t.key);
		if (!i && !r || n && !r) return;
		t.preventDefault();
		let a = this.matches(ea) ? this : R.prev(this, ea)[0] || R.next(this, ea)[0] || R.findOne(ea, t.delegateTarget.parentNode), o = e.getOrCreateInstance(a);
		if (i) {
			t.stopPropagation(), o.show(), o._selectMenuItem(t);
			return;
		}
		o._isShown() && (t.stopPropagation(), o.hide(), a.focus());
	}
};
L.on(document, Ki, ea, ga.dataApiKeydownHandler), L.on(document, Ki, na, ga.dataApiKeydownHandler), L.on(document, Gi, ga.clearMenus), L.on(document, qi, ga.clearMenus), L.on(document, Gi, ea, function(e) {
	e.preventDefault(), ga.getOrCreateInstance(this).toggle();
}), En(ga);
var _a = "backdrop", va = "fade", ya = "show", ba = `mousedown.bs.${_a}`, xa = {
	className: "modal-backdrop",
	clickCallback: null,
	isAnimated: !1,
	isVisible: !0,
	rootElement: "body"
}, Sa = {
	className: "string",
	clickCallback: "(function|null)",
	isAnimated: "boolean",
	isVisible: "boolean",
	rootElement: "(element|string)"
}, Ca = class extends Zn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null;
	}
	static get Default() {
		return xa;
	}
	static get DefaultType() {
		return Sa;
	}
	static get NAME() {
		return _a;
	}
	show(e) {
		if (!this._config.isVisible) {
			Dn(e);
			return;
		}
		this._append();
		let t = this._getElement();
		this._config.isAnimated && xn(t), t.classList.add(ya), this._emulateAnimation(() => {
			Dn(e);
		});
	}
	hide(e) {
		if (!this._config.isVisible) {
			Dn(e);
			return;
		}
		this._getElement().classList.remove(ya), this._emulateAnimation(() => {
			this.dispose(), Dn(e);
		});
	}
	dispose() {
		this._isAppended &&= (L.off(this._element, ba), this._element.remove(), !1);
	}
	_getElement() {
		if (!this._element) {
			let e = document.createElement("div");
			e.className = this._config.className, this._config.isAnimated && e.classList.add(va), this._element = e;
		}
		return this._element;
	}
	_configAfterMerge(e) {
		return e.rootElement = gn(e.rootElement), e;
	}
	_append() {
		if (this._isAppended) return;
		let e = this._getElement();
		this._config.rootElement.append(e), L.on(e, ba, () => {
			Dn(this._config.clickCallback);
		}), this._isAppended = !0;
	}
	_emulateAnimation(e) {
		On(e, this._getElement(), this._config.isAnimated);
	}
}, wa = "focustrap", Ta = ".bs.focustrap", Ea = `focusin${Ta}`, Da = `keydown.tab${Ta}`, Oa = "Tab", ka = "forward", Aa = "backward", ja = {
	autofocus: !0,
	trapElement: null
}, Ma = {
	autofocus: "boolean",
	trapElement: "element"
}, Na = class extends Zn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null;
	}
	static get Default() {
		return ja;
	}
	static get DefaultType() {
		return Ma;
	}
	static get NAME() {
		return wa;
	}
	activate() {
		this._isActive ||= (this._config.autofocus && this._config.trapElement.focus(), L.off(document, Ta), L.on(document, Ea, (e) => this._handleFocusin(e)), L.on(document, Da, (e) => this._handleKeydown(e)), !0);
	}
	deactivate() {
		this._isActive && (this._isActive = !1, L.off(document, Ta));
	}
	_handleFocusin(e) {
		let { trapElement: t } = this._config;
		if (e.target === document || e.target === t || t.contains(e.target)) return;
		let n = R.focusableChildren(t);
		n.length === 0 ? t.focus() : this._lastTabNavDirection === Aa ? n[n.length - 1].focus() : n[0].focus();
	}
	_handleKeydown(e) {
		e.key === Oa && (this._lastTabNavDirection = e.shiftKey ? Aa : ka);
	}
}, Pa = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Fa = ".sticky-top", Ia = "padding-right", La = "margin-right", Ra = class {
	constructor() {
		this._element = document.body;
	}
	getWidth() {
		let e = document.documentElement.clientWidth;
		return Math.abs(window.innerWidth - e);
	}
	hide() {
		let e = this.getWidth();
		this._disableOverFlow(), this._setElementAttributes(this._element, Ia, (t) => t + e), this._setElementAttributes(Pa, Ia, (t) => t + e), this._setElementAttributes(Fa, La, (t) => t - e);
	}
	reset() {
		this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Ia), this._resetElementAttributes(Pa, Ia), this._resetElementAttributes(Fa, La);
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
		n && Xn.setDataAttribute(e, t, n);
	}
	_resetElementAttributes(e, t) {
		this._applyManipulationCallback(e, (e) => {
			let n = Xn.getDataAttribute(e, t);
			if (n === null) {
				e.style.removeProperty(t);
				return;
			}
			Xn.removeDataAttribute(e, t), e.style.setProperty(t, n);
		});
	}
	_applyManipulationCallback(e, t) {
		if (hn(e)) {
			t(e);
			return;
		}
		for (let n of R.find(e, this._element)) t(n);
	}
}, za = "modal", Ba = ".bs.modal", Va = ".data-api", Ha = "Escape", Ua = `hide${Ba}`, Wa = `hidePrevented${Ba}`, Ga = `hidden${Ba}`, Ka = `show${Ba}`, qa = `shown${Ba}`, Ja = `resize${Ba}`, Ya = `click.dismiss${Ba}`, Xa = `mousedown.dismiss${Ba}`, Za = `keydown.dismiss${Ba}`, Qa = `click${Ba}${Va}`, $a = "modal-open", eo = "fade", to = "show", no = "modal-static", ro = ".modal.show", io = ".modal-dialog", ao = ".modal-body", oo = "[data-bs-toggle=\"modal\"]", so = {
	backdrop: !0,
	focus: !0,
	keyboard: !0
}, co = {
	backdrop: "(boolean|string)",
	focus: "boolean",
	keyboard: "boolean"
}, lo = class e extends $n {
	constructor(e, t) {
		super(e, t), this._dialog = R.findOne(io, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Ra(), this._addEventListeners();
	}
	static get Default() {
		return so;
	}
	static get DefaultType() {
		return co;
	}
	static get NAME() {
		return za;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || this._isTransitioning || L.trigger(this._element, Ka, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add($a), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
	}
	hide() {
		!this._isShown || this._isTransitioning || L.trigger(this._element, Ua).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(to), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
	}
	dispose() {
		L.off(window, Ba), L.off(this._dialog, Ba), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	handleUpdate() {
		this._adjustDialog();
	}
	_initializeBackDrop() {
		return new Ca({
			isVisible: !!this._config.backdrop,
			isAnimated: this._isAnimated()
		});
	}
	_initializeFocusTrap() {
		return new Na({ trapElement: this._element });
	}
	_showElement(e) {
		document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
		let t = R.findOne(ao, this._dialog);
		t && (t.scrollTop = 0), xn(this._element), this._element.classList.add(to), this._queueCallback(() => {
			this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, L.trigger(this._element, qa, { relatedTarget: e });
		}, this._dialog, this._isAnimated());
	}
	_addEventListeners() {
		L.on(this._element, Za, (e) => {
			if (e.key === Ha) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				this._triggerBackdropTransition();
			}
		}), L.on(window, Ja, () => {
			this._isShown && !this._isTransitioning && this._adjustDialog();
		}), L.on(this._element, Xa, (e) => {
			L.one(this._element, Ya, (t) => {
				if (!(this._element !== e.target || this._element !== t.target)) {
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
			document.body.classList.remove($a), this._resetAdjustments(), this._scrollBar.reset(), L.trigger(this._element, Ga);
		});
	}
	_isAnimated() {
		return this._element.classList.contains(eo);
	}
	_triggerBackdropTransition() {
		if (L.trigger(this._element, Wa).defaultPrevented) return;
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._element.style.overflowY;
		t === "hidden" || this._element.classList.contains(no) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(no), this._queueCallback(() => {
			this._element.classList.remove(no), this._queueCallback(() => {
				this._element.style.overflowY = t;
			}, this._dialog);
		}, this._dialog), this._element.focus());
	}
	_adjustDialog() {
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._scrollBar.getWidth(), n = t > 0;
		if (n && !e) {
			let e = Tn() ? "paddingLeft" : "paddingRight";
			this._element.style[e] = `${t}px`;
		}
		if (!n && e) {
			let e = Tn() ? "paddingRight" : "paddingLeft";
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
L.on(document, Qa, oo, function(e) {
	let t = R.getElementFromSelector(this);
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), L.one(t, Ka, (e) => {
		e.defaultPrevented || L.one(t, Ga, () => {
			_n(this) && this.focus();
		});
	});
	let n = R.findOne(ro);
	n && lo.getInstance(n).hide(), lo.getOrCreateInstance(t).toggle(this);
}), tr(lo), En(lo);
var uo = "offcanvas", fo = ".bs.offcanvas", po = ".data-api", mo = `load${fo}${po}`, ho = "Escape", go = "show", _o = "showing", vo = "hiding", yo = "offcanvas-backdrop", bo = ".offcanvas.show", xo = `show${fo}`, So = `shown${fo}`, Co = `hide${fo}`, wo = `hidePrevented${fo}`, To = `hidden${fo}`, Eo = `resize${fo}`, Do = `click${fo}${po}`, Oo = `keydown.dismiss${fo}`, ko = "[data-bs-toggle=\"offcanvas\"]", Ao = {
	backdrop: !0,
	keyboard: !0,
	scroll: !1
}, jo = {
	backdrop: "(boolean|string)",
	keyboard: "boolean",
	scroll: "boolean"
}, Mo = class e extends $n {
	constructor(e, t) {
		super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
	}
	static get Default() {
		return Ao;
	}
	static get DefaultType() {
		return jo;
	}
	static get NAME() {
		return uo;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || L.trigger(this._element, xo, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || new Ra().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(_o), this._queueCallback(() => {
			(!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(go), this._element.classList.remove(_o), L.trigger(this._element, So, { relatedTarget: e });
		}, this._element, !0));
	}
	hide() {
		!this._isShown || L.trigger(this._element, Co).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(vo), this._backdrop.hide(), this._queueCallback(() => {
			this._element.classList.remove(go, vo), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Ra().reset(), L.trigger(this._element, To);
		}, this._element, !0));
	}
	dispose() {
		this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	_initializeBackDrop() {
		let e = () => {
			if (this._config.backdrop === "static") {
				L.trigger(this._element, wo);
				return;
			}
			this.hide();
		}, t = !!this._config.backdrop;
		return new Ca({
			className: yo,
			isVisible: t,
			isAnimated: !0,
			rootElement: this._element.parentNode,
			clickCallback: t ? e : null
		});
	}
	_initializeFocusTrap() {
		return new Na({ trapElement: this._element });
	}
	_addEventListeners() {
		L.on(this._element, Oo, (e) => {
			if (e.key === ho) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				L.trigger(this._element, wo);
			}
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
L.on(document, Do, ko, function(e) {
	let t = R.getElementFromSelector(this);
	if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), vn(this)) return;
	L.one(t, To, () => {
		_n(this) && this.focus();
	});
	let n = R.findOne(bo);
	n && n !== t && Mo.getInstance(n).hide(), Mo.getOrCreateInstance(t).toggle(this);
}), L.on(window, mo, () => {
	for (let e of R.find(bo)) Mo.getOrCreateInstance(e).show();
}), L.on(window, Eo, () => {
	for (let e of R.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(e).position !== "fixed" && Mo.getOrCreateInstance(e).hide();
}), tr(Mo), En(Mo);
var No = {
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
}, Po = /* @__PURE__ */ new Set([
	"background",
	"cite",
	"href",
	"itemtype",
	"longdesc",
	"poster",
	"src",
	"xlink:href"
]), Fo = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Io = (e, t) => {
	let n = e.nodeName.toLowerCase();
	return t.includes(n) ? !Po.has(n) || !!Fo.test(e.nodeValue) : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
};
function Lo(e, t, n) {
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
		for (let t of r) Io(t, i) || e.removeAttribute(t.nodeName);
	}
	return r.body.innerHTML;
}
var Ro = "TemplateFactory", zo = {
	allowList: No,
	content: {},
	extraClass: "",
	html: !1,
	sanitize: !0,
	sanitizeFn: null,
	template: "<div></div>"
}, Bo = {
	allowList: "object",
	content: "object",
	extraClass: "(string|function)",
	html: "boolean",
	sanitize: "boolean",
	sanitizeFn: "(null|function)",
	template: "string"
}, Vo = {
	entry: "(string|element|function|null)",
	selector: "(string|element)"
}, Ho = class extends Zn {
	constructor(e) {
		super(), this._config = this._getConfig(e);
	}
	static get Default() {
		return zo;
	}
	static get DefaultType() {
		return Bo;
	}
	static get NAME() {
		return Ro;
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
		}, Vo);
	}
	_setContent(e, t, n) {
		let r = R.findOne(n, e);
		if (r) {
			if (t = this._resolvePossibleFunction(t), !t) {
				r.remove();
				return;
			}
			if (hn(t)) {
				this._putElementInTemplate(gn(t), r);
				return;
			}
			if (this._config.html) {
				r.innerHTML = this._maybeSanitize(t);
				return;
			}
			r.textContent = t;
		}
	}
	_maybeSanitize(e) {
		return this._config.sanitize ? Lo(e, this._config.allowList, this._config.sanitizeFn) : e;
	}
	_resolvePossibleFunction(e) {
		return Dn(e, [void 0, this]);
	}
	_putElementInTemplate(e, t) {
		if (this._config.html) {
			t.innerHTML = "", t.append(e);
			return;
		}
		t.textContent = e.textContent;
	}
}, Uo = "tooltip", Wo = /* @__PURE__ */ new Set([
	"sanitize",
	"allowList",
	"sanitizeFn"
]), Go = "fade", Ko = "modal", qo = "show", Jo = ".tooltip-inner", Yo = `.${Ko}`, Xo = "hide.bs.modal", Zo = "hover", Qo = "focus", $o = "click", es = "manual", ts = "hide", ns = "hidden", rs = "show", is = "shown", as = "inserted", ss = "click", cs = "focusin", ls = "focusout", us = "mouseenter", ds = "mouseleave", fs = {
	AUTO: "auto",
	TOP: "top",
	RIGHT: Tn() ? "left" : "right",
	BOTTOM: "bottom",
	LEFT: Tn() ? "right" : "left"
}, ps = {
	allowList: No,
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
}, ms = {
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
}, hs = class e extends $n {
	constructor(e, t) {
		if (rn === void 0) throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
		super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
	}
	static get Default() {
		return ps;
	}
	static get DefaultType() {
		return ms;
	}
	static get NAME() {
		return Uo;
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
		if (this._isEnabled) {
			if (this._isShown()) {
				this._leave();
				return;
			}
			this._enter();
		}
	}
	dispose() {
		clearTimeout(this._timeout), L.off(this._element.closest(Yo), Xo, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
	}
	show() {
		if (this._element.style.display === "none") throw Error("Please use show on visible elements");
		if (!(this._isWithContent() && this._isEnabled)) return;
		let e = L.trigger(this._element, this.constructor.eventName(rs)), t = (yn(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
		if (e.defaultPrevented || !t) return;
		this._disposePopper();
		let n = this._getTipElement();
		this._element.setAttribute("aria-describedby", n.getAttribute("id"));
		let { container: r } = this._config;
		if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(n), L.trigger(this._element, this.constructor.eventName(as))), this._popper = this._createPopper(n), n.classList.add(qo), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) L.on(e, "mouseover", bn);
		this._queueCallback(() => {
			L.trigger(this._element, this.constructor.eventName(is)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
		}, this.tip, this._isAnimated());
	}
	hide() {
		if (!(!this._isShown() || L.trigger(this._element, this.constructor.eventName(ts)).defaultPrevented)) {
			if (this._getTipElement().classList.remove(qo), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) L.off(e, "mouseover", bn);
			this._activeTrigger[$o] = !1, this._activeTrigger[Qo] = !1, this._activeTrigger[Zo] = !1, this._isHovered = null, this._queueCallback(() => {
				this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), L.trigger(this._element, this.constructor.eventName(ns)));
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
		t.classList.remove(Go, qo), t.classList.add(`bs-${this.constructor.NAME}-auto`);
		let n = fn(this.constructor.NAME).toString();
		return t.setAttribute("id", n), this._isAnimated() && t.classList.add(Go), t;
	}
	setContent(e) {
		this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
	}
	_getTemplateFactory(e) {
		return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new Ho({
			...this._config,
			content: e,
			extraClass: this._resolvePossibleFunction(this._config.customClass)
		}), this._templateFactory;
	}
	_getContentForTemplate() {
		return { [Jo]: this._getTitle() };
	}
	_getTitle() {
		return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
	}
	_initializeOnDelegatedTarget(e) {
		return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
	}
	_isAnimated() {
		return this._config.animation || this.tip && this.tip.classList.contains(Go);
	}
	_isShown() {
		return this.tip && this.tip.classList.contains(qo);
	}
	_createPopper(e) {
		let t = fs[Dn(this._config.placement, [
			this,
			e,
			this._element
		]).toUpperCase()];
		return nn(this._element, e, this._getPopperConfig(t));
	}
	_getOffset() {
		let { offset: e } = this._config;
		return typeof e == "string" ? e.split(",").map((e) => Number.parseInt(e, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
	}
	_resolvePossibleFunction(e) {
		return Dn(e, [this._element, this._element]);
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
			...Dn(this._config.popperConfig, [void 0, t])
		};
	}
	_setListeners() {
		let e = this._config.trigger.split(" ");
		for (let t of e) if (t === "click") L.on(this._element, this.constructor.eventName(ss), this._config.selector, (e) => {
			let t = this._initializeOnDelegatedTarget(e);
			t._activeTrigger[$o] = !(t._isShown() && t._activeTrigger[$o]), t.toggle();
		});
		else if (t !== es) {
			let e = t === Zo ? this.constructor.eventName(us) : this.constructor.eventName(cs), n = t === Zo ? this.constructor.eventName(ds) : this.constructor.eventName(ls);
			L.on(this._element, e, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusin" ? Qo : Zo] = !0, t._enter();
			}), L.on(this._element, n, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusout" ? Qo : Zo] = t._element.contains(e.relatedTarget), t._leave();
			});
		}
		this._hideModalHandler = () => {
			this._element && this.hide();
		}, L.on(this._element.closest(Yo), Xo, this._hideModalHandler);
	}
	_fixTitle() {
		let e = this._element.getAttribute("title");
		e && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"));
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
	_setTimeout(e, t) {
		clearTimeout(this._timeout), this._timeout = setTimeout(e, t);
	}
	_isWithActiveTrigger() {
		return Object.values(this._activeTrigger).includes(!0);
	}
	_getConfig(e) {
		let t = Xn.getDataAttributes(this._element);
		for (let e of Object.keys(t)) Wo.has(e) && delete t[e];
		return e = {
			...t,
			...typeof e == "object" && e ? e : {}
		}, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	_configAfterMerge(e) {
		return e.container = e.container === !1 ? document.body : gn(e.container), typeof e.delay == "number" && (e.delay = {
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
En(hs);
var gs = "popover", _s = ".popover-header", vs = ".popover-body", ys = {
	...hs.Default,
	content: "",
	offset: [0, 8],
	placement: "right",
	template: "<div class=\"popover\" role=\"tooltip\"><div class=\"popover-arrow\"></div><h3 class=\"popover-header\"></h3><div class=\"popover-body\"></div></div>",
	trigger: "click"
}, bs = {
	...hs.DefaultType,
	content: "(null|string|element|function)"
};
En(class e extends hs {
	static get Default() {
		return ys;
	}
	static get DefaultType() {
		return bs;
	}
	static get NAME() {
		return gs;
	}
	_isWithContent() {
		return this._getTitle() || this._getContent();
	}
	_getContentForTemplate() {
		return {
			[_s]: this._getTitle(),
			[vs]: this._getContent()
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
var xs = "scrollspy", Ss = ".bs.scrollspy", Cs = ".data-api", ws = `activate${Ss}`, Ts = `click${Ss}`, Es = `load${Ss}${Cs}`, Ds = "dropdown-item", Os = "active", ks = "[data-bs-spy=\"scroll\"]", As = "[href]", js = ".nav, .list-group", Ms = ".nav-link", Ns = `${Ms}, .nav-item > ${Ms}, .list-group-item`, Ps = ".dropdown", Fs = ".dropdown-toggle", Is = {
	offset: null,
	rootMargin: "0px 0px -25%",
	smoothScroll: !1,
	target: null,
	threshold: [
		.1,
		.5,
		1
	]
}, Ls = {
	offset: "(number|null)",
	rootMargin: "string",
	smoothScroll: "boolean",
	target: "element",
	threshold: "array"
}, Rs = class e extends $n {
	constructor(e, t) {
		super(e, t), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
			visibleEntryTop: 0,
			parentScrollTop: 0
		}, this.refresh();
	}
	static get Default() {
		return Is;
	}
	static get DefaultType() {
		return Ls;
	}
	static get NAME() {
		return xs;
	}
	refresh() {
		this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
		for (let e of this._observableSections.values()) this._observer.observe(e);
	}
	dispose() {
		this._observer.disconnect(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.target = gn(e.target) || document.body, e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin, typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map((e) => Number.parseFloat(e))), e;
	}
	_maybeEnableSmoothScroll() {
		this._config.smoothScroll && (L.off(this._config.target, Ts), L.on(this._config.target, Ts, As, (e) => {
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
				continue;
			}
			!i && !e && n(a);
		}
	}
	_initializeTargetsAndObservables() {
		this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
		let e = R.find(As, this._config.target);
		for (let t of e) {
			if (!t.hash || vn(t)) continue;
			let e = R.findOne(decodeURI(t.hash), this._element);
			_n(e) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e));
		}
	}
	_process(e) {
		this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(Os), this._activateParents(e), L.trigger(this._element, ws, { relatedTarget: e }));
	}
	_activateParents(e) {
		if (e.classList.contains(Ds)) {
			R.findOne(Fs, e.closest(Ps)).classList.add(Os);
			return;
		}
		for (let t of R.parents(e, js)) for (let e of R.prev(t, Ns)) e.classList.add(Os);
	}
	_clearActiveClass(e) {
		e.classList.remove(Os);
		let t = R.find(`${As}.${Os}`, e);
		for (let e of t) e.classList.remove(Os);
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
L.on(window, Es, () => {
	for (let e of R.find(ks)) Rs.getOrCreateInstance(e);
}), En(Rs);
var zs = "tab", Bs = ".bs.tab", Vs = `hide${Bs}`, Hs = `hidden${Bs}`, Us = `show${Bs}`, Ws = `shown${Bs}`, Gs = `click${Bs}`, Ks = `keydown${Bs}`, qs = `load${Bs}`, Js = "ArrowLeft", Ys = "ArrowRight", Xs = "ArrowUp", Zs = "ArrowDown", Qs = "Home", $s = "End", ec = "active", tc = "fade", nc = "show", rc = "dropdown", ic = ".dropdown-toggle", ac = ".dropdown-menu", oc = `:not(${ic})`, sc = ".list-group, .nav, [role=\"tablist\"]", cc = ".nav-item, .list-group-item", lc = `.nav-link${oc}, .list-group-item${oc}, [role="tab"]${oc}`, uc = "[data-bs-toggle=\"tab\"], [data-bs-toggle=\"pill\"], [data-bs-toggle=\"list\"]", dc = `${lc}, ${uc}`, fc = `.${ec}[data-bs-toggle="tab"], .${ec}[data-bs-toggle="pill"], .${ec}[data-bs-toggle="list"]`, pc = class e extends $n {
	constructor(e) {
		super(e), this._parent = this._element.closest(sc), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), L.on(this._element, Ks, (e) => this._keydown(e)));
	}
	static get NAME() {
		return zs;
	}
	show() {
		let e = this._element;
		if (this._elemIsActive(e)) return;
		let t = this._getActiveElem(), n = t ? L.trigger(t, Vs, { relatedTarget: e }) : null;
		L.trigger(e, Us, { relatedTarget: t }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(t, e), this._activate(e, t));
	}
	_activate(e, t) {
		e && (e.classList.add(ec), this._activate(R.getElementFromSelector(e)), this._queueCallback(() => {
			if (e.getAttribute("role") !== "tab") {
				e.classList.add(nc);
				return;
			}
			e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), L.trigger(e, Ws, { relatedTarget: t });
		}, e, e.classList.contains(tc)));
	}
	_deactivate(e, t) {
		e && (e.classList.remove(ec), e.blur(), this._deactivate(R.getElementFromSelector(e)), this._queueCallback(() => {
			if (e.getAttribute("role") !== "tab") {
				e.classList.remove(nc);
				return;
			}
			e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), L.trigger(e, Hs, { relatedTarget: t });
		}, e, e.classList.contains(tc)));
	}
	_keydown(t) {
		if (![
			Js,
			Ys,
			Xs,
			Zs,
			Qs,
			$s
		].includes(t.key)) return;
		t.stopPropagation(), t.preventDefault();
		let n = this._getChildren().filter((e) => !vn(e)), r;
		if ([Qs, $s].includes(t.key)) r = n[t.key === Qs ? 0 : n.length - 1];
		else {
			let e = [Ys, Zs].includes(t.key);
			r = kn(n, t.target, e, !0);
		}
		r && (r.focus({ preventScroll: !0 }), e.getOrCreateInstance(r).show());
	}
	_getChildren() {
		return R.find(dc, this._parent);
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
		let t = R.getElementFromSelector(e);
		t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
	}
	_toggleDropDown(e, t) {
		let n = this._getOuterElement(e);
		if (!n.classList.contains(rc)) return;
		let r = (e, r) => {
			let i = R.findOne(e, n);
			i && i.classList.toggle(r, t);
		};
		r(ic, ec), r(ac, nc), n.setAttribute("aria-expanded", t);
	}
	_setAttributeIfNotExists(e, t, n) {
		e.hasAttribute(t) || e.setAttribute(t, n);
	}
	_elemIsActive(e) {
		return e.classList.contains(ec);
	}
	_getInnerElement(e) {
		return e.matches(dc) ? e : R.findOne(dc, e);
	}
	_getOuterElement(e) {
		return e.closest(cc) || e;
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
L.on(document, Gs, uc, function(e) {
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), !vn(this) && pc.getOrCreateInstance(this).show();
}), L.on(window, qs, () => {
	for (let e of R.find(fc)) pc.getOrCreateInstance(e);
}), En(pc);
var mc = "toast", hc = ".bs.toast", gc = `mouseover${hc}`, _c = `mouseout${hc}`, vc = `focusin${hc}`, yc = `focusout${hc}`, bc = `hide${hc}`, xc = `hidden${hc}`, Sc = `show${hc}`, Cc = `shown${hc}`, wc = "fade", Tc = "hide", Ec = "show", Dc = "showing", Oc = {
	animation: "boolean",
	autohide: "boolean",
	delay: "number"
}, kc = {
	animation: !0,
	autohide: !0,
	delay: 5e3
}, Ac = class e extends $n {
	constructor(e, t) {
		super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
	}
	static get Default() {
		return kc;
	}
	static get DefaultType() {
		return Oc;
	}
	static get NAME() {
		return mc;
	}
	show() {
		L.trigger(this._element, Sc).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add(wc), this._element.classList.remove(Tc), xn(this._element), this._element.classList.add(Ec, Dc), this._queueCallback(() => {
			this._element.classList.remove(Dc), L.trigger(this._element, Cc), this._maybeScheduleHide();
		}, this._element, this._config.animation));
	}
	hide() {
		!this.isShown() || L.trigger(this._element, bc).defaultPrevented || (this._element.classList.add(Dc), this._queueCallback(() => {
			this._element.classList.add(Tc), this._element.classList.remove(Dc, Ec), L.trigger(this._element, xc);
		}, this._element, this._config.animation));
	}
	dispose() {
		this._clearTimeout(), this.isShown() && this._element.classList.remove(Ec), super.dispose();
	}
	isShown() {
		return this._element.classList.contains(Ec);
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
			case "focusout":
				this._hasKeyboardInteraction = t;
				break;
		}
		if (t) {
			this._clearTimeout();
			return;
		}
		let n = e.relatedTarget;
		this._element === n || this._element.contains(n) || this._maybeScheduleHide();
	}
	_setListeners() {
		L.on(this._element, gc, (e) => this._onInteraction(e, !0)), L.on(this._element, _c, (e) => this._onInteraction(e, !1)), L.on(this._element, vc, (e) => this._onInteraction(e, !0)), L.on(this._element, yc, (e) => this._onInteraction(e, !1));
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
tr(Ac), En(Ac);
//#endregion
//#region node_modules/mitt/dist/mitt.mjs
function jc(e) {
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
//#endregion
//#region src/components/helpers.js
function Mc(e, t) {
	for (let n in t) n === "__proto__" || n === "constructor" || n === "prototype" || t[n] instanceof Object && n in e && Object.assign(t[n], Mc(e[n], t[n]));
	return Object.assign(e || {}, t);
}
function Nc(e, t, n, r) {
	try {
		return typeof e == "function" ? e(t, n, r) : e;
	} catch (e) {
		return console.error(e), null;
	}
}
async function Pc(e) {
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
var Fc = {
	timeout: 3500,
	priority: "danger"
};
function Ic(e) {
	return `HTTP ${e.status}${e.statusText ? " " + e.statusText : ""}`;
}
function Lc(e) {
	return {
		message: e?.message || e,
		...Fc
	};
}
function Rc(e, t) {
	for (let n of t) e.push(Lc(n));
}
function zc(e) {
	return typeof e == "object" && !!e && Object.prototype.hasOwnProperty.call(e, "data") && Object.prototype.hasOwnProperty.call(e, "error");
}
function Bc(e, t) {
	let n = [];
	if (t?.errors) {
		if (Array.isArray(t.errors)) Rc(n, t.errors);
		else if (typeof t.errors == "object") if (Array.isArray(t.errors.exception)) Rc(n, t.errors.exception);
		else for (let e in t.errors) Array.isArray(t.errors[e]) && Rc(n, t.errors[e]);
	} else t && typeof t.message == "string" && e.status >= 400 ? n.push(Lc(t.message)) : e.status >= 400 && e.status <= 511 && n.push(Lc(Ic(e)));
	return n.length > 0 ? n : null;
}
function Vc(e, t) {
	if (!e) return [Lc("Network error")];
	let n = zc(t) ? t : null;
	return Bc(e, n ? n.data : t) || (n?.error ? [Lc(n.error.message || String(n.error))] : e.ok ? null : [Lc(Ic(e))]);
}
var Hc = Date.now() ^ (typeof performance < "u" && performance.now ? performance.now() : 0) << 16;
function Uc() {
	return Hc ^= Hc << 13, Hc ^= Hc >>> 17, Hc ^= Hc << 5, (Hc >>> 0) / 4294967295;
}
function Wc(e = 16) {
	let t = Math.max(0, e), n = new Uint8Array(t);
	if (typeof crypto < "u" && crypto.getRandomValues) return crypto.getRandomValues(n), n;
	for (let e = 0; e < t; e++) n[e] = Math.floor(Uc() * 256);
	return n;
}
function Gc() {
	let e = Wc(4);
	return ((e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]) >>> 0) / 4294967295;
}
function Kc(e) {
	return !e || e <= 0 ? 0 : Math.floor(Gc() * e);
}
function qc(e = 12, t = "abcdefghijklmnopqrstuvwxyz0123456789") {
	let n = Wc(e), r = "", i = t.length;
	for (let e = 0; e < n.length; e++) r += t[n[e] % i];
	return r;
}
function Jc(e, t, n, r) {
	if (t.options ||= {}, t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), r && r.header) for (let e of Object.keys(r.header)) t.options.headers[e] = r.header[e];
	return t.options.body = void 0, t.options.method = e, n && Object.assign(t.options, n), t.options.body instanceof FormData && delete t.options.headers["Content-Type"], t.debug && console.log("[vu-admin] fetch options:", e, t.options), t.options;
}
function Yc(e, t, n, r) {
	let i = !1, a = Object.assign({}, r || {});
	r && (r.filter && (a.filter = JSON.stringify(r.filter)), r.order && (a.order = JSON.stringify(r.order)), i = Object.keys(a).length);
	let o = t.url + (n ? "/" + n : "") + (i ? "?" + new URLSearchParams(a).toString() : "");
	return t.debug && console.log("[vu-admin] fetch url:", o), o;
}
function Xc(e, t = "-") {
	return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Zc(e) {
	let t = [];
	for (let n of e) t.push(Qc(n));
	return t;
}
function Qc(e, t = "", n = {}) {
	for (let r in e) {
		let i = t ? t + "." + r : r;
		typeof e[r] == "object" && !Array.isArray(e[r]) ? Qc(e[r], i, n) : n[i] = e[r];
	}
	return n;
}
function $c(e) {
	let t = {};
	for (let n in e) {
		let r = n.split(".");
		r.reduce((t, i, a) => t[i] || (t[i] = isNaN(Number(r[a + 1])) ? r.length - 1 === a ? e[n] : {} : []), t);
	}
	return t;
}
function el(e, t, n, r) {
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
function tl(e, t, n = ";") {
	return [t.map((e) => e.title ? e.title : e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(n), ...e.map((r) => t.map((t) => {
		let n = r[t.name];
		return t.template ? t.template(n, r, e) : n === void 0 ? "" : n;
	}).join(n))].join("\n");
}
function nl(e, t = "export.csv") {
	e = "﻿" + e;
	let n = new Blob([e], { type: "text/csv;charset=utf-8;" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = t, i.click(), URL.revokeObjectURL(r);
}
function rl(e) {
	return [...new Set(e)];
}
function il(e, t) {
	e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function al(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 && e.push(n.value);
}
function ol(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 ? e.push(n.value) : e.splice(e.indexOf(n.value), 1);
}
function sl(e) {
	e.length = 0;
}
function cl(e, t) {
	t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function ll(e, t) {
	t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function ul(e, t) {
	Object.keys(e).forEach((n) => {
		typeof e[n] == "function" && (e[n] = e[n](t));
	});
}
function dl(e, t) {
	let n = 1024, r = n * 1024, i = r * 1024;
	return e < n ? e + (t ? " Byte" : "") : e < r ? (e / n).toFixed(0) + (t ? "<span class=\"text-muted fw-light\"> KB</span>" : "") : e < i ? (e / r).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> MB</span>" : "") : (e / i).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> GB</span>" : "");
}
function fl(e) {
	return e.split(".").reverse()[0];
}
//#endregion
//#region src/components/formUploadHelpers.js
function pl(e) {
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
function ml(e) {
	let t = {};
	if (!e?.form?.groups) return t;
	for (let n of e.form.groups) if (Array.isArray(n.fields)) for (let e of n.fields) e.type !== "image" && e.type !== "upload" || pl(e) || (e.upload === "blob" ? t[e.name] = "blob" : t[e.name] = "dataurl");
	return t;
}
function hl(e) {
	let t = {};
	if (!e?.form?.groups) return t;
	for (let n of e.form.groups) if (Array.isArray(n.fields)) for (let e of n.fields) {
		if (e.type !== "image" && e.type !== "upload") continue;
		let n = pl(e);
		n && (t[e.name] = n);
	}
	return t;
}
function gl(e) {
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
function _l(e) {
	if (!e || typeof e != "object") return e;
	let t = { ...e };
	if (t.types && typeof t.types == "object") {
		t.types = {};
		for (let n of Object.keys(e.types)) {
			let r = e.types[n];
			!r || typeof r != "object" || (t.types[n] = {
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
function vl(e, t) {
	if (!e || typeof e != "object") return e;
	if (e.uploaded || !e.types) return gl(e);
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
function yl(e, t) {
	if (!e || !t || !Object.keys(t).length) return e;
	let n = { ...e };
	for (let [r, i] of Object.entries(t)) {
		let t = e[r];
		Array.isArray(t) && (n[r] = t.map((e) => vl(e, i)));
	}
	return n;
}
function bl(e, t) {
	let n = Object.keys(hl(t)), r = ml(t), i = n.length ? xl(e, n) : { ...e }, a = yl(e, r);
	for (let e of Object.keys(r)) a[e] != null && (i[e] = a[e]);
	return i;
}
function xl(e, t) {
	if (!e || !t?.length) return e;
	let n = { ...e };
	for (let r of t) {
		let t = e[r];
		Array.isArray(t) && (n[r] = t.map((e) => e && (e.uploaded ? gl(e) : _l(e))));
	}
	return n;
}
function Sl(e, t) {
	let n = [];
	if (!e || !t || !Object.keys(t).length) return n;
	for (let [r, i] of Object.entries(t)) {
		let t = i.presetKeys, a = e[r];
		Array.isArray(a) && a.forEach((e, a) => {
			if (!(!e || e.uploaded || !e.types)) for (let o of Object.keys(e.types)) {
				if (t && !t.includes(o)) continue;
				let s = e.types[o];
				if (!s || s.url) continue;
				let c = s.blob instanceof Blob, l = typeof s.data == "string" && s.data.startsWith("data:");
				!c && !l || n.push({
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
async function Cl(e) {
	if (e.blob instanceof Blob) return e.blob;
	if (typeof e.data == "string" && e.data.startsWith("data:")) return await (await fetch(e.data)).blob();
	throw Error("No binary data for upload");
}
function wl(e, t, n) {
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
function Tl(e) {
	let t = e.typeEntry.extension || "bin";
	return `${e.typeEntry.slug || e.file.slug || "file"}.${t}`;
}
function El(e, t) {
	if (!e || typeof e != "object") return e;
	let n = t?.form?.api?.input?.item;
	return n && typeof n == "string" ? e[n] ?? e : e;
}
function Dl(e) {
	return e ? typeof e.url == "string" ? e.url : e.file && typeof e.file.url == "string" ? e.file.url : Array.isArray(e.files) && e.files[0]?.url ? e.files[0].url : null : null;
}
function Ol(e, t) {
	if (!e?.fieldName) return t || "Upload";
	let n = e.typeKey ? `${e.fieldName}/${e.typeKey}` : e.fieldName;
	return `${t || "Upload"} (${n})`;
}
function kl(e, t, n, r) {
	let i = t?.data, a = Vc(e, t), o = a ? [...a] : [];
	i?.message && typeof i.message == "string" && (o.some((e) => e.message === i.message) || o.unshift({
		message: i.message,
		priority: "danger",
		timeout: 14500
	}));
	let s = e?.status, c = s ? `HTTP ${s}` : "HTTP error", l = Ol(n, r);
	return o.length ? o.map((e) => ({
		...e,
		message: `${l} — ${c}: ${e.message}`,
		priority: "danger",
		timeout: e.timeout || 14500
	})) : null;
}
function Al(e, t, n, r) {
	let i = kl(e, t, n, r);
	if (i?.length) {
		let t = Error(i.map((e) => e.message).join("; "));
		throw t.uploadErrors = i, t.response = e, t;
	}
	if (!e.ok) {
		let i = /* @__PURE__ */ Error(`HTTP ${e.status}`);
		throw i.uploadErrors = kl(e, t, n, r) || [{
			message: `${Ol(n, r)} — HTTP ${e.status}`,
			priority: "danger",
			timeout: 14500
		}], i.response = e, i;
	}
}
async function jl({ tasks: e, savedItem: t, settings: n, auth: r, debug: i, onProgress: a }) {
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
		}, f = wl(c, t, n), p = u.meta == null ? f : u.meta(f, c, t, n, r), m = new FormData();
		m.append(u.jsonField, JSON.stringify(p));
		let h = await Cl(c.typeEntry);
		m.append(u.fileField, h, Tl(c)), i && console.log("[vu-admin] form upload POST", u.url, p);
		let g = await fetch(Yc("POST", d, null, {}), Jc("POST", d, { body: m }, r)), _ = await Pc(g);
		Al(g, _, c, "Upload");
		let v = Dl(_.data);
		if (!v) {
			let e = /* @__PURE__ */ Error(`${Ol(c, "Upload")} — HTTP ${g.status}: missing url in response`);
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
function Ml(e) {
	if (!e?.types) return;
	let t = e.types;
	e.uploaded = Object.values(t).every((e) => e && (e.url || !e.data && !(e.blob instanceof Blob))), e.loaded = Object.values(t).some((e) => e && (e.url || e.data));
}
function Nl(e) {
	Ml(e);
}
function Pl(e, t, n) {
	if (!e || !n?.length) return e;
	for (let { task: t, url: r } of n) {
		if (!r || !Array.isArray(e[t.fieldName])) continue;
		let n = e[t.fieldName][t.fileIndex];
		n?.types?.[t.typeKey] && (n.types[t.typeKey] = {
			...n.types[t.typeKey],
			url: r
		}, delete n.types[t.typeKey].data, delete n.types[t.typeKey].blob, Nl(n));
	}
	return e;
}
async function Fl({ savedItem: e, item: t, uploadFieldNames: n, fieldUploadMap: r, settings: i, auth: a, urlParams: o, debug: s }) {
	let c = i?.pkey || "id", l = e?.[c];
	if (!l || !n?.length) return e;
	let u = n.filter((e) => r[e]?.persist !== !1), d = i?.form?.api?.output?.fields;
	if (Array.isArray(d) && (u = u.filter((e) => d.includes(e))), !u.length) return e;
	let f = xl(t, u);
	if (f = Object.fromEntries(u.filter((e) => f[e] != null).map((e) => [e, f[e]])), !Object.keys(f).length) return e;
	let p, m = i?.form?.api?.output?.item;
	p = JSON.stringify(m ? typeof m == "string" ? { [m]: f } : m(f, { persist: !0 }) : f), s && console.log("[vu-admin] persist upload fields PUT", l, JSON.parse(p));
	let h = await fetch(Yc("PUT", i.form.api, l, o || {}), Jc("PUT", i.form.api, { body: p }, a)), g = await Pc(h);
	return Al(h, g, null, "Save file URLs"), El(g.data, i);
}
function Il(e, t, n, r) {
	let i = El(e, r);
	if (!i || typeof i != "object") return e;
	for (let e of n) t[e] != null && (i[e] = t[e]);
	let a = r?.form?.api?.input?.item;
	return typeof a == "string" && e && typeof e == "object" ? {
		...e,
		[a]: i
	} : i;
}
//#endregion
//#region src/components/buttonActions.js
function Ll(e) {
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
function Rl(e) {
	switch (e) {
		case "TABLE_RESET_ORDERS":
		case "TABLE_RESET_FILTERS": return "bi bi-x";
		case "TABLE_CLOSE_DETAILS": return "bi bi-chevron-compact-up";
		case "TABLE_ROW_EDIT": return "bi bi-pencil-square";
		case "FORM_SUBMIT":
		case "TABLE_ROW_SAVE":
		case "TABLE_BULK_SAVE": return "bi bi-save";
		case "FORM_DELETE":
		case "TABLE_ROW_DELETE":
		case "TABLE_BULK_DELETE": return "bi bi-trash";
		case "TABLE_ROW_DETAIL": return "bi bi-chevron-compact-down";
		case "FORM_RELOAD":
		case "TABLE_RELOAD": return "bi bi-arrow-clockwise";
		case "TABLE_COLUMNS": return "bi bi-table";
		case "TABLE_EXPORT": return "bi bi-download";
		default: return "bi bi-question";
	}
}
//#endregion
//#region node_modules/orderedmap/dist/index.js
function zl(e) {
	this.content = e;
}
zl.prototype = {
	constructor: zl,
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
		return i == -1 ? a.push(n || e, t) : (a[i + 1] = t, n && (a[i] = n)), new zl(a);
	},
	remove: function(e) {
		var t = this.find(e);
		if (t == -1) return this;
		var n = this.content.slice();
		return n.splice(t, 2), new zl(n);
	},
	addToStart: function(e, t) {
		return new zl([e, t].concat(this.remove(e).content));
	},
	addToEnd: function(e, t) {
		var n = this.remove(e).content.slice();
		return n.push(e, t), new zl(n);
	},
	addBefore: function(e, t, n) {
		var r = this.remove(t), i = r.content.slice(), a = r.find(e);
		return i.splice(a == -1 ? i.length : a, 0, t, n), new zl(i);
	},
	forEach: function(e) {
		for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1]);
	},
	prepend: function(e) {
		return e = zl.from(e), e.size ? new zl(e.content.concat(this.subtract(e).content)) : this;
	},
	append: function(e) {
		return e = zl.from(e), e.size ? new zl(this.subtract(e).content.concat(e.content)) : this;
	},
	subtract: function(e) {
		var t = this;
		e = zl.from(e);
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
}, zl.from = function(e) {
	if (e instanceof zl) return e;
	var t = [];
	if (e) for (var n in e) t.push(n, e[n]);
	return new zl(t);
};
//#endregion
//#region node_modules/prosemirror-model/dist/index.js
function Bl(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) {
			n += i.nodeSize;
			continue;
		}
		if (!i.sameMarkup(a)) return n;
		if (i.isText && i.text != a.text) {
			let e = i.text, t = a.text, r = 0;
			for (; e[r] == t[r]; r++) n++;
			return r && r < e.length && r < t.length && Ul(e.charCodeAt(r - 1)) && Hl(e.charCodeAt(r)) && n--, n;
		}
		if (i.content.size || a.content.size) {
			let e = Bl(i.content, a.content, n + 1);
			if (e != null) return e;
		}
		n += i.nodeSize;
	}
}
function Vl(e, t, n, r) {
	for (let i = e.childCount, a = t.childCount;;) {
		if (i == 0 || a == 0) return i == a ? null : {
			a: n,
			b: r
		};
		let o = e.child(--i), s = t.child(--a), c = o.nodeSize;
		if (o == s) {
			n -= c, r -= c;
			continue;
		}
		if (!o.sameMarkup(s)) return {
			a: n,
			b: r
		};
		if (o.isText && o.text != s.text) {
			let e = o.text, t = s.text, i = e.length, a = t.length;
			for (; i > 0 && a > 0 && e[i - 1] == t[a - 1];) i--, a--, n--, r--;
			return i && a && i < e.length && Ul(e.charCodeAt(i - 1)) && Hl(e.charCodeAt(i)) && (n++, r++), {
				a: n,
				b: r
			};
		}
		if (o.content.size || s.content.size) {
			let e = Vl(o.content, s.content, n - 1, r - 1);
			if (e) return e;
		}
		n -= c, r -= c;
	}
}
function Hl(e) {
	return e >= 56320 && e < 57344;
}
function Ul(e) {
	return e >= 55296 && e < 56320;
}
var z = class e {
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
		return Bl(this, e, t);
	}
	findDiffEnd(e, t = this.size, n = e.size) {
		return Vl(this, e, t, n);
	}
	findIndex(e) {
		if (e == 0) return Gl(0, e);
		if (e == this.size) return Gl(this.content.length, e);
		if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
		for (let t = 0, n = 0;; t++) {
			let r = this.child(t), i = n + r.nodeSize;
			if (i >= e) return i == e ? Gl(t + 1, i) : Gl(t, n);
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
z.empty = new z([], 0);
var Wl = {
	index: 0,
	offset: 0
};
function Gl(e, t) {
	return Wl.index = e, Wl.offset = t, Wl;
}
function Kl(e, t) {
	if (e === t) return !0;
	if (!(e && typeof e == "object") || !(t && typeof t == "object")) return !1;
	let n = Array.isArray(e);
	if (Array.isArray(t) != n) return !1;
	if (n) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!Kl(e[n], t[n])) return !1;
	} else {
		for (let n in e) if (!(n in t) || !Kl(e[n], t[n])) return !1;
		for (let n in t) if (!(n in e)) return !1;
	}
	return !0;
}
var B = class e {
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
		return this == e || this.type == e.type && Kl(this.attrs, e.attrs);
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
		let r = n.create(t.attrs);
		return n.checkAttrs(r.attrs), r;
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
B.none = [];
var ql = class extends Error {}, V = class e {
	constructor(e, t, n) {
		this.content = e, this.openStart = t, this.openEnd = n;
	}
	get size() {
		return this.content.size - this.openStart - this.openEnd;
	}
	insertAt(t, n) {
		let r = Yl(this.content, t + this.openStart, n, this.openStart + 1, this.openEnd + 1);
		return r && new e(r, this.openStart, this.openEnd);
	}
	removeBetween(t, n) {
		return new e(Jl(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
		return new e(z.fromJSON(t, n.content), r, i);
	}
	static maxOpen(t, n = !0) {
		let r = 0, i = 0;
		for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
		for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
		return new e(t, r, i);
	}
};
V.empty = new V(z.empty, 0, 0);
function Jl(e, t, n) {
	let { index: r, offset: i } = e.findIndex(t), a = e.maybeChild(r), { index: o, offset: s } = e.findIndex(n);
	if (i == t || a.isText) {
		if (s != n && !e.child(o).isText) throw RangeError("Removing non-flat range");
		return e.cut(0, t).append(e.cut(n));
	}
	if (r != o) throw RangeError("Removing non-flat range");
	return e.replaceChild(r, a.copy(Jl(a.content, t - i - 1, n - i - 1)));
}
function Yl(e, t, n, r, i, a) {
	let { index: o, offset: s } = e.findIndex(t), c = e.maybeChild(o);
	if (s == t || c.isText) return a && r <= 0 && i <= 0 && !a.canReplace(o, o, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
	let l = Yl(c.content, t - s - 1, n, o == 0 ? r - 1 : 0, o == e.childCount - 1 ? i - 1 : 0, c);
	return l && e.replaceChild(o, c.copy(l));
}
function Xl(e, t, n) {
	if (n.openStart > e.depth) throw new ql("Inserted content deeper than insertion position");
	if (e.depth - n.openStart != t.depth - n.openEnd) throw new ql("Inconsistent open depths");
	return Zl(e, t, n, 0);
}
function Zl(e, t, n, r) {
	let i = e.index(r), a = e.node(r);
	if (i == t.index(r) && r < e.depth - n.openStart) {
		let o = Zl(e, t, n, r + 1);
		return a.copy(a.content.replaceChild(i, o));
	} else if (!n.content.size) return nu(a, iu(e, t, r));
	else if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return nu(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	} else {
		let { start: i, end: o } = au(n, e);
		return nu(a, ru(e, i, o, t, r));
	}
}
function Ql(e, t) {
	if (!t.type.compatibleContent(e.type)) throw new ql("Cannot join " + t.type.name + " onto " + e.type.name);
}
function $l(e, t, n) {
	let r = e.node(n);
	return Ql(r, t.node(n)), r;
}
function eu(e, t) {
	let n = t.length - 1;
	n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e);
}
function tu(e, t, n, r) {
	let i = (t || e).node(n), a = 0, o = t ? t.index(n) : i.childCount;
	e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (eu(e.nodeAfter, r), a++));
	for (let e = a; e < o; e++) eu(i.child(e), r);
	t && t.depth == n && t.textOffset && eu(t.nodeBefore, r);
}
function nu(e, t) {
	if (!e.type.validContent(t)) throw new ql("Invalid content for node " + e.type.name);
	return e.copy(t);
}
function ru(e, t, n, r, i) {
	let a = e.depth > i && $l(e, t, i + 1), o = r.depth > i && $l(n, r, i + 1), s = [];
	return tu(null, e, i, s), a && o && t.index(i) == n.index(i) ? (Ql(a, o), eu(nu(a, ru(e, t, n, r, i + 1)), s)) : (a && eu(nu(a, iu(e, t, i + 1)), s), tu(t, n, i, s), o && eu(nu(o, iu(n, r, i + 1)), s)), tu(r, null, i, s), new z(s);
}
function iu(e, t, n) {
	let r = [];
	return tu(null, e, n, r), e.depth > n && eu(nu($l(e, t, n + 1), iu(e, t, n + 1)), r), tu(t, null, n, r), new z(r);
}
function au(e, t) {
	let n = t.depth - e.openStart, r = t.node(n).copy(e.content);
	for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(z.from(r));
	return {
		start: r.resolveNoCache(e.openStart + n),
		end: r.resolveNoCache(r.content.size - e.openEnd - n)
	};
}
var ou = class e {
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
		if (e.content.size == 0) return B.none;
		if (this.textOffset) return e.child(t).marks;
		let n = e.maybeChild(t - 1), r = e.maybeChild(t);
		if (!n) {
			let e = n;
			n = r, r = e;
		}
		let i = n.marks;
		for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
		return i;
	}
	marksAcross(e) {
		let t = this.parent.maybeChild(this.index());
		if (!t || !t.isInline) return null;
		let n = t.marks, r = e.parent.maybeChild(e.index());
		for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
		return n;
	}
	sharedDepth(e) {
		for (let t = this.depth; t > 0; t--) if (this.start(t) <= e && this.end(t) >= e) return t;
		return 0;
	}
	blockRange(e = this, t) {
		if (e.pos < this.pos) return e.blockRange(this);
		for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--) if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new uu(this, e, n);
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
		let r = lu.get(t);
		if (r) for (let e = 0; e < r.elts.length; e++) {
			let t = r.elts[e];
			if (t.pos == n) return t;
		}
		else lu.set(t, r = new su());
		let i = r.elts[r.i] = e.resolve(t, n);
		return r.i = (r.i + 1) % cu, i;
	}
}, su = class {
	constructor() {
		this.elts = [], this.i = 0;
	}
}, cu = 12, lu = /* @__PURE__ */ new WeakMap(), uu = class {
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
}, du = Object.create(null), fu = class e {
	constructor(e, t, n, r = B.none) {
		this.type = e, this.attrs = t, this.marks = r, this.content = n || z.empty;
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
		return this.type == e && Kl(this.attrs, t || e.defaultAttrs || du) && B.sameSet(this.marks, n || B.none);
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
		if (e == t) return V.empty;
		let r = this.resolve(e), i = this.resolve(t), a = n ? 0 : r.sharedDepth(t), o = r.start(a);
		return new V(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a);
	}
	replace(e, t, n) {
		return Xl(this.resolve(e), this.resolve(t), n);
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
		return ou.resolveCached(this, e);
	}
	resolveNoCache(e) {
		return ou.resolve(this, e);
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
		return this.content.size && (e += "(" + this.content.toStringInner() + ")"), mu(this.marks, e);
	}
	contentMatchAt(e) {
		let t = this.type.contentMatch.matchFragment(this.content, 0, e);
		if (!t) throw Error("Called contentMatchAt on a node with invalid content");
		return t;
	}
	canReplace(e, t, n = z.empty, r = 0, i = n.childCount) {
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
		this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
		let e = B.none;
		for (let t = 0; t < this.marks.length; t++) {
			let n = this.marks[t];
			n.type.checkAttrs(n.attrs), e = n.addToSet(e);
		}
		if (!B.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
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
		let r = z.fromJSON(e, t.content), i = e.nodeType(t.type).create(t.attrs, r, n);
		return i.type.checkAttrs(i.attrs), i;
	}
};
fu.prototype.text = void 0;
var pu = class e extends fu {
	constructor(e, t, n, r) {
		if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
		this.text = n;
	}
	toString() {
		return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : mu(this.marks, JSON.stringify(this.text));
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
function mu(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
var hu = class e {
	constructor(e) {
		this.validEnd = e, this.next = [], this.wrapCache = [];
	}
	static parse(t, n) {
		let r = new gu(t, n);
		if (r.next == null) return e.empty;
		let i = _u(r);
		r.next && r.err("Unexpected trailing text");
		let a = Du(wu(i));
		return Ou(a, r), a;
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
			if (s && (!t || s.validEnd)) return z.from(o.map((e) => e.createAndFill()));
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
				!a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
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
hu.empty = new hu(!0);
var gu = class {
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
function _u(e) {
	let t = [];
	do
		t.push(vu(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function vu(e) {
	let t = [];
	do
		t.push(yu(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function yu(e) {
	let t = Cu(e);
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
	else if (e.eat("{")) t = xu(e, t);
	else break;
	return t;
}
function bu(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function xu(e, t) {
	let n = bu(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : bu(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function Su(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function Cu(e) {
	if (e.eat("(")) {
		let t = _u(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	} else if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = Su(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function wu(e) {
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
function Tu(e, t) {
	return t - e;
}
function Eu(e, t) {
	let n = [];
	return r(t), n.sort(Tu);
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
function Du(e) {
	let t = Object.create(null);
	return n(Eu(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				Eu(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new hu(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(Tu);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function Ou(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function ku(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function Au(e, t) {
	let n = Object.create(null);
	for (let r in e) {
		let i = t && t[r];
		if (i === void 0) {
			let t = e[r];
			if (t.hasDefault) i = t.default;
			else throw RangeError("No value supplied for attribute " + r);
		}
		n[r] = i;
	}
	return n;
}
function ju(e, t, n, r) {
	for (let i in t) if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
	for (let n in e) e[n].validate && e[n].validate(t[n]);
}
function Mu(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new Fu(e, r, t[r]);
	return n;
}
var Nu = class e {
	constructor(e, t, n) {
		this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = Mu(e, n.attrs), this.defaultAttrs = ku(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
	}
	get isInline() {
		return !this.isBlock;
	}
	get isTextblock() {
		return this.isBlock && this.inlineContent;
	}
	get isLeaf() {
		return this.contentMatch == hu.empty;
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
		return !e && this.defaultAttrs ? this.defaultAttrs : Au(this.attrs, e);
	}
	create(e = null, t, n) {
		if (this.isText) throw Error("NodeType.create can't construct text nodes");
		return new fu(this, this.computeAttrs(e), z.from(t), B.setFrom(n));
	}
	createChecked(e = null, t, n) {
		return t = z.from(t), this.checkContent(t), new fu(this, this.computeAttrs(e), t, B.setFrom(n));
	}
	createAndFill(e = null, t, n) {
		if (e = this.computeAttrs(e), t = z.from(t), t.size) {
			let e = this.contentMatch.fillBefore(t);
			if (!e) return null;
			t = e.append(t);
		}
		let r = this.contentMatch.matchFragment(t), i = r && r.fillBefore(z.empty, !0);
		return i ? new fu(this, e, t.append(i), B.setFrom(n)) : null;
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
	checkAttrs(e) {
		ju(this.attrs, e, "node", this.name);
	}
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
		return t ? t.length ? t : B.none : e;
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
function Pu(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
var Fu = class {
	constructor(e, t, n) {
		this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? Pu(e, t, n.validate) : n.validate;
	}
	get isRequired() {
		return !this.hasDefault;
	}
}, Iu = class e {
	constructor(e, t, n, r) {
		this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Mu(e, r.attrs), this.excluded = null;
		let i = ku(this.attrs);
		this.instance = i ? new B(this, i) : null;
	}
	create(e = null) {
		return !e && this.instance ? this.instance : new B(this, Au(this.attrs, e));
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
	checkAttrs(e) {
		ju(this.attrs, e, "mark", this.name);
	}
	excludes(e) {
		return this.excluded.indexOf(e) > -1;
	}
}, Lu = class {
	constructor(e) {
		this.linebreakReplacement = null, this.cached = Object.create(null);
		let t = this.spec = {};
		for (let n in e) t[n] = e[n];
		t.nodes = zl.from(e.nodes), t.marks = zl.from(e.marks || {}), this.nodes = Nu.compile(this.spec.nodes, this), this.marks = Iu.compile(this.spec.marks, this);
		let n = Object.create(null);
		for (let e in this.nodes) {
			if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
			let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
			if (t.contentMatch = n[r] || (n[r] = hu.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
				if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
				if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
				this.linebreakReplacement = t;
			}
			t.markSet = i == "_" ? null : i ? Ru(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
		}
		for (let e in this.marks) {
			let t = this.marks[e], n = t.spec.excludes;
			t.excluded = n == null ? [t] : n == "" ? [] : Ru(this, n.split(" "));
		}
		this.nodeFromJSON = (e) => fu.fromJSON(this, e), this.markFromJSON = (e) => B.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
	}
	node(e, t = null, n, r) {
		if (typeof e == "string") e = this.nodeType(e);
		else if (!(e instanceof Nu)) throw RangeError("Invalid node type: " + e);
		else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
		return e.createChecked(t, n, r);
	}
	text(e, t) {
		let n = this.nodes.text;
		return new pu(n, n.defaultAttrs, e, B.setFrom(t));
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
function Ru(e, t) {
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
function zu(e) {
	return e.tag != null;
}
function Bu(e) {
	return e.style != null;
}
var Vu = class e {
	constructor(e, t) {
		this.schema = e, this.rules = t, this.tags = [], this.styles = [];
		let n = this.matchedStyles = [];
		t.forEach((e) => {
			if (zu(e)) this.tags.push(e);
			else if (Bu(e)) {
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
		let n = new Xu(this, t, !1);
		return n.addAll(e, B.none, t.from, t.to), n.finish();
	}
	parseSlice(e, t = {}) {
		let n = new Xu(this, t, !0);
		return n.addAll(e, B.none, t.from, t.to), V.maxOpen(n.finish());
	}
	matchTag(e, t, n) {
		for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
			let n = this.tags[r];
			if (Qu(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
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
				n(e = $u(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
			});
		}
		for (let t in e.nodes) {
			let r = e.nodes[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = $u(e)), e.node || e.ignore || e.mark || (e.node = t);
			});
		}
		return t;
	}
	static fromSchema(t) {
		return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
	}
}, Hu = {
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
}, Uu = {
	head: !0,
	noscript: !0,
	object: !0,
	script: !0,
	style: !0,
	title: !0
}, Wu = {
	ol: !0,
	ul: !0
}, Gu = 1, Ku = 2, qu = 4;
function Ju(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? 3 : n & -5 : (t ? Gu : 0) | (t === "full" ? Ku : 0);
}
var Yu = class {
	constructor(e, t, n, r, i, a) {
		this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = B.none, this.match = i || (a & qu ? null : e.contentMatch);
	}
	findWrapping(e) {
		if (!this.match) {
			if (!this.type) return [];
			let t = this.type.contentMatch.fillBefore(z.from(e));
			if (t) this.match = this.type.contentMatch.matchFragment(t);
			else {
				let t = this.type.contentMatch, n;
				return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null;
			}
		}
		return this.match.findWrapping(e.type);
	}
	finish(e) {
		if (!(this.options & Gu)) {
			let e = this.content[this.content.length - 1], t;
			if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
				let n = e;
				e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length));
			}
		}
		let t = z.from(this.content);
		return !e && this.match && (t = t.append(this.match.fillBefore(z.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
	}
	inlineContext(e) {
		return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Hu.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
	}
}, Xu = class {
	constructor(e, t, n) {
		this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
		let r = t.topNode, i, a = Ju(null, t.preserveWhitespace, 0) | (n ? qu : 0);
		i = r ? new Yu(r.type, r.attrs, B.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new Yu(null, null, B.none, !0, null, a) : new Yu(e.schema.topNodeType, null, B.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
	}
	get top() {
		return this.nodes[this.open];
	}
	addDOM(e, t) {
		e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
	}
	addTextNode(e, t) {
		let n = e.nodeValue, r = this.top, i = r.options & Ku ? "full" : this.localPreserveWS || (r.options & Gu) > 0, { schema: a } = this.parser;
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
		Wu.hasOwnProperty(a) && this.parser.normalizeLists && Zu(e);
		let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
		out: if (s ? s.ignore : Uu.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
		else if (!s || s.skip || s.closeParent) {
			s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
			let n, r = this.needsBlock;
			if (Hu.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
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
		e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
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
		if (t.node) if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
		else {
			let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
			e && (i = !0, n = e);
		}
		else {
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
			let n = B.none;
			for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : ed(i.type, e.type)) && (n = i.addToSet(n));
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
		let o = Ju(e, i, a.options);
		a.options & qu && a.content.length == 0 && (o |= qu);
		let s = B.none;
		return n = n.filter((t) => (a.type ? a.type.allowsMarkType(t.type) : ed(t.type, e)) ? (s = t.addToSet(s), !1) : !0), this.nodes.push(new Yu(e, t, s, r, null, o)), this.open++, n;
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
		else this.localPreserveWS && (this.nodes[t].options |= Gu);
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
				} else {
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
function Zu(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && Wu.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function Qu(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function $u(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function ed(e, t) {
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
var td = class e {
	constructor(e, t) {
		this.nodes = e, this.marks = t;
	}
	serializeFragment(e, t = {}, n) {
		n ||= rd(t).createDocumentFragment();
		let r = n, i = [];
		return e.forEach((e) => {
			if (i.length || e.marks.length) {
				let n = 0, a = 0;
				for (; n < i.length && a < e.marks.length;) {
					let t = e.marks[a];
					if (!this.marks[t.type.name]) {
						a++;
						continue;
					}
					if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
					n++, a++;
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
		if (e.isText) return rd(t).createTextNode(e.text);
		let { dom: n, contentDOM: r } = sd(rd(t), this.nodes[e.type.name](e), null, e.attrs);
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
		return r && sd(rd(n), r(e, t), null, e.attrs);
	}
	static renderSpec(e, t, n = null, r) {
		return typeof t == "string" ? { dom: e.createTextNode(t) } : sd(e, t, n, r);
	}
	static fromSchema(t) {
		return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
	}
	static nodesFromSchema(e) {
		let t = nd(e.nodes);
		return t.text ||= (e) => e.text, t;
	}
	static marksFromSchema(e) {
		return nd(e.marks);
	}
};
function nd(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function rd(e) {
	return e.document || window.document;
}
var id = /* @__PURE__ */ new WeakMap();
function ad(e) {
	let t = id.get(e);
	return t === void 0 && id.set(e, t = od(e)), t;
}
function od(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") if (Array.isArray(e)) if (typeof e[0] == "string") t ||= [], t.push(e);
		else for (let t = 0; t < e.length; t++) n(e[t]);
		else for (let t in e) n(e[t]);
	}
	return n(e), t;
}
function sd(e, t, n, r) {
	if (t.nodeType == 1) return { dom: t };
	if (t.dom && t.dom.nodeType == 1) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = ad(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
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
		} else if (typeof a == "string") c.appendChild(e.createTextNode(a));
		else {
			let { dom: t, contentDOM: i } = sd(e, a, n, r);
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
//#endregion
//#region node_modules/prosemirror-transform/dist/index.js
var cd = 65535, ld = 2 ** 16;
function ud(e, t) {
	return e + t * ld;
}
function dd(e) {
	return e & cd;
}
function fd(e) {
	return (e - (e & cd)) / ld;
}
var pd = 1, md = 2, hd = 4, gd = 8, _d = class {
	constructor(e, t, n) {
		this.pos = e, this.delInfo = t, this.recover = n;
	}
	get deleted() {
		return (this.delInfo & gd) > 0;
	}
	get deletedBefore() {
		return (this.delInfo & 5) > 0;
	}
	get deletedAfter() {
		return (this.delInfo & 6) > 0;
	}
	get deletedAcross() {
		return (this.delInfo & hd) > 0;
	}
}, vd = class e {
	constructor(t, n = !1) {
		if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
	}
	recover(e) {
		let t = 0, n = dd(e);
		if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
		return this.ranges[n * 3] + t + fd(e);
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
				let d = e == (t < 0 ? s : u) ? null : ud(o / 3, e - s), f = e == s ? md : e == u ? pd : hd;
				return (t < 0 ? e != s : e != u) && (f |= gd), new _d(a, f, d);
			}
			r += l - c;
		}
		return n ? e + r : new _d(e + r, 0, null);
	}
	touches(e, t) {
		let n = 0, r = dd(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
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
vd.empty = new vd([]);
var yd = class e {
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
		return n ? e : new _d(e, r, null);
	}
}, bd = Object.create(null), xd = class {
	getMap() {
		return vd.empty;
	}
	merge(e) {
		return null;
	}
	static fromJSON(e, t) {
		if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
		let n = bd[t.stepType];
		if (!n) throw RangeError(`No step type ${t.stepType} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in bd) throw RangeError("Duplicate use of step JSON ID " + e);
		return bd[e] = t, t.prototype.jsonID = e, t;
	}
}, Sd = class e {
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
			if (t instanceof ql) return e.fail(t.message);
			throw t;
		}
	}
};
function Cd(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(Cd(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return z.fromArray(r);
}
var wd = class e extends xd {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new V(Cd(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
		return Sd.fromReplace(e, this.from, this.to, i);
	}
	invert() {
		return new Td(this.from, this.to, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1);
		return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark);
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
xd.jsonID("addMark", wd);
var Td = class e extends xd {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = new V(Cd(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
		return Sd.fromReplace(e, this.from, this.to, n);
	}
	invert() {
		return new wd(this.from, this.to, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1);
		return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark);
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
xd.jsonID("removeMark", Td);
var Ed = class e extends xd {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Sd.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
		return Sd.fromReplace(e, this.pos, this.pos + 1, new V(z.from(n), 0, +!t.isLeaf));
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
		return new Dd(this.pos, this.mark);
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
xd.jsonID("addNodeMark", Ed);
var Dd = class e extends xd {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Sd.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
		return Sd.fromReplace(e, this.pos, this.pos + 1, new V(z.from(n), 0, +!t.isLeaf));
	}
	invert(e) {
		let t = e.nodeAt(this.pos);
		return !t || !this.mark.isInSet(t.marks) ? this : new Ed(this.pos, this.mark);
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
xd.jsonID("removeNodeMark", Dd);
var Od = class e extends xd {
	constructor(e, t, n, r = !1) {
		super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
	}
	apply(e) {
		return this.structure && Ad(e, this.from, this.to) ? Sd.fail("Structure replace would overwrite content") : Sd.fromReplace(e, this.from, this.to, this.slice);
	}
	getMap() {
		return new vd([
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
			let n = this.slice.size + t.slice.size == 0 ? V.empty : new V(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
			return new e(this.from, this.to + (t.to - t.from), n, this.structure);
		} else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
			let n = this.slice.size + t.slice.size == 0 ? V.empty : new V(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
			return new e(t.from, this.to, n, this.structure);
		} else return null;
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
		return new e(n.from, n.to, V.fromJSON(t, n.slice), !!n.structure);
	}
};
Od.MAP_BIAS = 1, xd.jsonID("replace", Od);
var kd = class e extends xd {
	constructor(e, t, n, r, i, a, o = !1) {
		super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
	}
	apply(e) {
		if (this.structure && (Ad(e, this.from, this.gapFrom) || Ad(e, this.gapTo, this.to))) return Sd.fail("Structure gap-replace would overwrite content");
		let t = e.slice(this.gapFrom, this.gapTo);
		if (t.openStart || t.openEnd) return Sd.fail("Gap is not a flat range");
		let n = this.slice.insertAt(this.insert, t.content);
		return n ? Sd.fromReplace(e, this.from, this.to, n) : Sd.fail("Content does not fit in gap");
	}
	getMap() {
		return new vd([
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
		return new e(n.from, n.to, n.gapFrom, n.gapTo, V.fromJSON(t, n.slice), n.insert, !!n.structure);
	}
};
xd.jsonID("replaceAround", kd);
function Ad(e, t, n) {
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
function jd(e, t, n, r) {
	let i = [], a = [], o, s;
	e.doc.nodesBetween(t, n, (e, c, l) => {
		if (!e.isInline) return;
		let u = e.marks;
		if (!r.isInSet(u) && l.type.allowsMarkType(r.type)) {
			let l = Math.max(c, t), d = Math.min(c + e.nodeSize, n), f = r.addToSet(u);
			for (let e = 0; e < u.length; e++) u[e].isInSet(f) || (o && o.to == l && o.mark.eq(u[e]) ? o.to = d : i.push(o = new Td(l, d, u[e])));
			s && s.to == l ? s.to = d : a.push(s = new wd(l, d, r));
		}
	}), i.forEach((t) => e.step(t)), a.forEach((t) => e.step(t));
}
function Md(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline) return;
		a++;
		let s = null;
		if (r instanceof Iu) {
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
	}), i.forEach((t) => e.step(new Td(t.from, t.to, t.style)));
}
function Nd(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new Od(s, l, V.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new Td(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new V(z.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new Od(s + e.index, s + e.index + e[0].length, r));
			}
		}
		s = l;
	}
	if (!r.validEnd) {
		let t = r.fillBefore(z.empty, !0);
		e.replace(s, s, new V(t, 0, 0));
	}
	for (let t = o.length - 1; t >= 0; t--) e.step(o[t]);
}
function Pd(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function Fd(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !Pd(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function Id(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = z.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = z.from(r.node(e).copy(u)), d++) : c--;
	let f = z.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = z.from(i.node(e).copy(f)), p++) : l++;
	e.step(new kd(c, l, o, s, new V(u.append(f), d, p), u.size - d, !0));
}
function Ld(e, t, n = null, r = e) {
	let i = zd(e, t), a = i && Bd(r, t);
	return a ? i.map(Rd).concat({
		type: t,
		attrs: n
	}).concat(a.map(Rd)) : null;
}
function Rd(e) {
	return {
		type: e,
		attrs: null
	};
}
function zd(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function Bd(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function Vd(e, t, n) {
	let r = z.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = z.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new kd(i, a, i, a, new V(r, 0, 0), n.length, !0));
}
function Hd(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && Gd(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && Wd(e, t, n, a), Nd(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new kd(c, l, c + 1, l - 1, new V(z.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && Ud(e, t, n, a), !1;
		}
	});
}
function Ud(e, t, n, r) {
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
function Wd(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function Gd(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function Kd(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new kd(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new V(z.from(o), 0, 0), 1, !0));
}
function qd(e, t, n = 1, r) {
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
function Jd(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = z.empty, o = z.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = z.from(i.node(e).copy(a));
		let t = r && r[s];
		o = z.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new Od(t, t, new V(a.append(o), n, n), !0));
}
function Yd(e, t) {
	let n = e.resolve(t), r = n.index();
	return Zd(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function Xd(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function Zd(e, t) {
	return !!(e && t && !e.isLeaf && Xd(e, t));
}
function Qd(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && Zd(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function $d(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		Wd(e, r.node(), r.before(), s);
	}
	o.inlineContent && Nd(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new Od(l, c.map(t + n, -1), V.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		Ud(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function ef(e, t, n) {
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
function tf(e, t, n) {
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
function nf(e, t, n = t, r = V.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return rf(i, a, r) ? new Od(t, n, r) : new af(i, a, r).fit();
}
function rf(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
var af = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = z.empty;
		for (let t = 0; t <= e.depth; t++) {
			let n = e.node(t);
			this.frontier.push({
				type: n.type,
				match: n.contentMatchAt(e.indexAfter(t))
			});
		}
		for (let t = e.depth; t > 0; t--) this.placed = z.from(e.node(t).copy(this.placed));
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
		let s = new V(i, a, o);
		return e > -1 ? new kd(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Od(n.pos, r.pos, s) : null;
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
			n ? (r = cf(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
			let i = e.firstChild;
			for (let e = this.depth; e >= 0; e--) {
				let { type: a, match: o } = this.frontier[e], s, c = null;
				if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(z.from(i), !1)) : r && a.compatibleContent(r.type))) return {
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
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = cf(e, t);
		return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new V(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0);
	}
	dropNode() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = cf(e, t);
		if (r.childCount <= 1 && t > 0) {
			let i = e.size - t <= t + r.size;
			this.unplaced = new V(of(e, t - 1, 1), t - 1, i ? t - 1 : n);
		} else this.unplaced = new V(of(e, t, 1), t, n);
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
			c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(lf(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
		}
		let p = c == o.childCount;
		p || (f = -1), this.placed = sf(this.placed, t, z.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
		for (let e = 0, t = o; e < f; e++) {
			let e = t.lastChild;
			this.frontier.push({
				type: e.type,
				match: e.contentMatchAt(e.childCount)
			}), t = e.content;
		}
		this.unplaced = p ? e == 0 ? V.empty : new V(of(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new V(of(a.content, e, c), a.openStart, a.openEnd);
	}
	mustMoveInline() {
		if (!this.$to.parent.isTextblock) return -1;
		let e = this.frontier[this.depth], t;
		if (!e.type.isTextblock || !uf(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
		let { depth: n } = this.$to, r = this.$to.after(n);
		for (; n > 1 && r == this.$to.end(--n);) ++r;
		return r;
	}
	findCloseLevel(e) {
		scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
			let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = uf(e, t, r, n, i);
			if (a) {
				for (let n = t - 1; n >= 0; n--) {
					let { match: t, type: r } = this.frontier[n], i = uf(e, n, r, t, !0);
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
		t.fit.childCount && (this.placed = sf(this.placed, t.depth, t.fit)), e = t.move;
		for (let n = t.depth + 1; n <= e.depth; n++) {
			let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
			this.openFrontierNode(t.type, t.attrs, r);
		}
		return e;
	}
	openFrontierNode(e, t = null, n) {
		let r = this.frontier[this.depth];
		r.match = r.match.matchType(e), this.placed = sf(this.placed, this.depth, z.from(e.create(t, n))), this.frontier.push({
			type: e,
			match: e.contentMatch
		});
	}
	closeFrontierNode() {
		let e = this.frontier.pop().match.fillBefore(z.empty, !0);
		e.childCount && (this.placed = sf(this.placed, this.frontier.length, e));
	}
};
function of(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(of(e.firstChild.content, t - 1, n)));
}
function sf(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(sf(e.lastChild.content, t - 1, n)));
}
function cf(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function lf(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, lf(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(z.empty, !0)))), e.copy(r);
}
function uf(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !df(n, a.content, o) ? s : null;
}
function df(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function ff(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function pf(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (rf(i, a, r)) return e.step(new Od(t, n, r));
	let o = _f(i, a);
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
		let t = l[e], n = ff(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new V(mf(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function mf(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(mf(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(z.empty, !0));
	}
	return e;
}
function hf(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = ef(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new V(z.from(r), 0, 0));
}
function gf(e, t, n) {
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
	let a = _f(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function _f(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var vf = class e extends xd {
	constructor(e, t, n) {
		super(), this.pos = e, this.attr = t, this.value = n;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Sd.fail("No node at attribute step's position");
		let n = Object.create(null);
		for (let e in t.attrs) n[e] = t.attrs[e];
		n[this.attr] = this.value;
		let r = t.type.create(n, null, t.marks);
		return Sd.fromReplace(e, this.pos, this.pos + 1, new V(z.from(r), 0, +!t.isLeaf));
	}
	getMap() {
		return vd.empty;
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
xd.jsonID("attr", vf);
var yf = class e extends xd {
	constructor(e, t) {
		super(), this.attr = e, this.value = t;
	}
	apply(e) {
		let t = Object.create(null);
		for (let n in e.attrs) t[n] = e.attrs[n];
		t[this.attr] = this.value;
		let n = e.type.create(t, e.content, e.marks);
		return Sd.ok(n);
	}
	getMap() {
		return vd.empty;
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
xd.jsonID("docAttr", yf);
var bf = class extends Error {};
bf = function e(t) {
	let n = Error.call(this, t);
	return n.__proto__ = e.prototype, n;
}, bf.prototype = Object.create(Error.prototype), bf.prototype.constructor = bf, bf.prototype.name = "TransformError";
var xf = class {
	constructor(e) {
		this.doc = e, this.steps = [], this.docs = [], this.mapping = new yd();
	}
	get before() {
		return this.docs.length ? this.docs[0] : this.doc;
	}
	step(e) {
		let t = this.maybeStep(e);
		if (t.failed) throw new bf(t.failed);
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
	replace(e, t = e, n = V.empty) {
		let r = nf(this.doc, e, t, n);
		return r && this.step(r), this;
	}
	replaceWith(e, t, n) {
		return this.replace(e, t, new V(z.from(n), 0, 0));
	}
	delete(e, t) {
		return this.replace(e, t, V.empty);
	}
	insert(e, t) {
		return this.replaceWith(e, e, t);
	}
	replaceRange(e, t, n) {
		return pf(this, e, t, n), this;
	}
	replaceRangeWith(e, t, n) {
		return hf(this, e, t, n), this;
	}
	deleteRange(e, t) {
		return gf(this, e, t), this;
	}
	lift(e, t) {
		return Id(this, e, t), this;
	}
	join(e, t = 1) {
		return $d(this, e, t), this;
	}
	wrap(e, t) {
		return Vd(this, e, t), this;
	}
	setBlockType(e, t = e, n, r = null) {
		return Hd(this, e, t, n, r), this;
	}
	setNodeMarkup(e, t, n = null, r) {
		return Kd(this, e, t, n, r), this;
	}
	setNodeAttribute(e, t, n) {
		return this.step(new vf(e, t, n)), this;
	}
	setDocAttribute(e, t) {
		return this.step(new yf(e, t)), this;
	}
	addNodeMark(e, t) {
		return this.step(new Ed(e, t)), this;
	}
	removeNodeMark(e, t) {
		let n = this.doc.nodeAt(e);
		if (!n) throw RangeError("No node at position " + e);
		if (t instanceof B) t.isInSet(n.marks) && this.step(new Dd(e, t));
		else {
			let r = n.marks, i, a = [];
			for (; i = t.isInSet(r);) a.push(new Dd(e, i)), r = i.removeFromSet(r);
			for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
		}
		return this;
	}
	split(e, t = 1, n) {
		return Jd(this, e, t, n), this;
	}
	addMark(e, t, n) {
		return jd(this, e, t, n), this;
	}
	removeMark(e, t, n) {
		return Md(this, e, t, n), this;
	}
	clearIncompatible(e, t, n) {
		return Nd(this, e, t, n), this;
	}
}, Sf = Object.create(null), H = class {
	constructor(e, t, n) {
		this.$anchor = e, this.$head = t, this.ranges = n || [new Cf(e.min(t), e.max(t))];
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
	replace(e, t = V.empty) {
		let n = t.content.lastChild, r = null;
		for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
		let i = e.steps.length, a = this.ranges;
		for (let o = 0; o < a.length; o++) {
			let { $from: s, $to: c } = a[o], l = e.mapping.slice(i);
			e.replaceRange(l.map(s.pos), l.map(c.pos), o ? V.empty : t), o == 0 && jf(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
		}
	}
	replaceWith(e, t) {
		let n = e.steps.length, r = this.ranges;
		for (let i = 0; i < r.length; i++) {
			let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
			i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), jf(e, n, t.isInline ? -1 : 1));
		}
	}
	static findFrom(e, t, n = !1) {
		let r = e.parent.inlineContent ? new U(e) : Af(e.node(0), e.parent, e.pos, e.index(), t, n);
		if (r) return r;
		for (let r = e.depth - 1; r >= 0; r--) {
			let i = t < 0 ? Af(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : Af(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
			if (i) return i;
		}
		return null;
	}
	static near(e, t = 1) {
		return this.findFrom(e, t) || this.findFrom(e, -t) || new Of(e.node(0));
	}
	static atStart(e) {
		return Af(e, e, 0, 0, 1) || new Of(e);
	}
	static atEnd(e) {
		return Af(e, e, e.content.size, e.childCount, -1) || new Of(e);
	}
	static fromJSON(e, t) {
		if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
		let n = Sf[t.type];
		if (!n) throw RangeError(`No selection type ${t.type} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in Sf) throw RangeError("Duplicate use of selection JSON ID " + e);
		return Sf[e] = t, t.prototype.jsonID = e, t;
	}
	getBookmark() {
		return U.between(this.$anchor, this.$head).getBookmark();
	}
};
H.prototype.visible = !0;
var Cf = class {
	constructor(e, t) {
		this.$from = e, this.$to = t;
	}
}, wf = !1;
function Tf(e) {
	!wf && !e.parent.inlineContent && (wf = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
var U = class e extends H {
	constructor(e, t = e) {
		Tf(e), Tf(t), super(e, t);
	}
	get $cursor() {
		return this.$anchor.pos == this.$head.pos ? this.$head : null;
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		if (!r.parent.inlineContent) return H.near(r);
		let i = t.resolve(n.map(this.anchor));
		return new e(i.parent.inlineContent ? i : r, r);
	}
	replace(e, t = V.empty) {
		if (super.replace(e, t), t == V.empty) {
			let t = this.$from.marksAcross(this.$to);
			t && e.ensureMarks(t);
		}
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor && t.head == this.head;
	}
	getBookmark() {
		return new Ef(this.anchor, this.head);
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
			let e = H.findFrom(n, r, !0) || H.findFrom(n, -r, !0);
			if (e) n = e.$head;
			else return H.near(n, r);
		}
		return t.parent.inlineContent || (i == 0 ? t = n : (t = (H.findFrom(t, -r, !0) || H.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n);
	}
};
H.jsonID("text", U);
var Ef = class e {
	constructor(e, t) {
		this.anchor = e, this.head = t;
	}
	map(t) {
		return new e(t.map(this.anchor), t.map(this.head));
	}
	resolve(e) {
		return U.between(e.resolve(this.anchor), e.resolve(this.head));
	}
}, W = class e extends H {
	constructor(e) {
		let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
		super(e, n), this.node = t;
	}
	map(t, n) {
		let { deleted: r, pos: i } = n.mapResult(this.anchor), a = t.resolve(i);
		return r ? H.near(a) : new e(a);
	}
	content() {
		return new V(z.from(this.node), 0, 0);
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
		return new Df(this.anchor);
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
W.prototype.visible = !1, H.jsonID("node", W);
var Df = class e {
	constructor(e) {
		this.anchor = e;
	}
	map(t) {
		let { deleted: n, pos: r } = t.mapResult(this.anchor);
		return n ? new Ef(r, r) : new e(r);
	}
	resolve(e) {
		let t = e.resolve(this.anchor), n = t.nodeAfter;
		return n && W.isSelectable(n) ? new W(t) : H.near(t);
	}
}, Of = class e extends H {
	constructor(e) {
		super(e.resolve(0), e.resolve(e.content.size));
	}
	replace(e, t = V.empty) {
		if (t == V.empty) {
			e.delete(0, e.doc.content.size);
			let t = H.atStart(e.doc);
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
		return kf;
	}
};
H.jsonID("all", Of);
var kf = {
	map() {
		return this;
	},
	resolve(e) {
		return new Of(e);
	}
};
function Af(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return U.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = Af(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && W.isSelectable(r)) return W.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function jf(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Od || i instanceof kd)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(H.near(e.doc.resolve(o), n));
}
var Mf = 1, Nf = 2, Pf = 4, Ff = class extends xf {
	constructor(e) {
		super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
	}
	get selection() {
		return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
	}
	setSelection(e) {
		if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
		return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Mf) & -3, this.storedMarks = null, this;
	}
	get selectionSet() {
		return (this.updated & Mf) > 0;
	}
	setStoredMarks(e) {
		return this.storedMarks = e, this.updated |= Nf, this;
	}
	ensureMarks(e) {
		return B.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
	}
	addStoredMark(e) {
		return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
	}
	removeStoredMark(e) {
		return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
	}
	get storedMarksSet() {
		return (this.updated & Nf) > 0;
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
		return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || B.none))), n.replaceWith(this, e), this;
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
			return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(H.near(this.selection.$to)), this;
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
		return this.updated |= Pf, this;
	}
	get scrolledIntoView() {
		return (this.updated & Pf) > 0;
	}
};
function If(e, t) {
	return !t || !e ? e : e.bind(t);
}
var Lf = class {
	constructor(e, t, n) {
		this.name = e, this.init = If(t.init, n), this.apply = If(t.apply, n);
	}
}, Rf = [
	new Lf("doc", {
		init(e) {
			return e.doc || e.schema.topNodeType.createAndFill();
		},
		apply(e) {
			return e.doc;
		}
	}),
	new Lf("selection", {
		init(e, t) {
			return e.selection || H.atStart(t.doc);
		},
		apply(e) {
			return e.selection;
		}
	}),
	new Lf("storedMarks", {
		init(e) {
			return e.storedMarks || null;
		},
		apply(e, t, n, r) {
			return r.selection.$cursor ? e.storedMarks : null;
		}
	}),
	new Lf("scrollToSelection", {
		init() {
			return 0;
		},
		apply(e, t) {
			return e.scrolledIntoView ? t + 1 : t;
		}
	})
], zf = class {
	constructor(e, t) {
		this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = Rf.slice(), t && t.forEach((e) => {
			if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
			this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new Lf(e.key, e.spec.state, e));
		});
	}
}, Bf = class e {
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
		return new Ff(this);
	}
	static create(t) {
		let n = new zf(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
		for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
		return r;
	}
	reconfigure(t) {
		let n = new zf(this.schema, t.plugins), r = n.fields, i = new e(n);
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
		let i = new zf(t.schema, t.plugins), a = new e(i);
		return i.fields.forEach((e) => {
			if (e.name == "doc") a.doc = fu.fromJSON(t.schema, n.doc);
			else if (e.name == "selection") a.selection = H.fromJSON(a.doc, n.selection);
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
function Vf(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = Vf(i, t, {})), n[r] = i;
	}
	return n;
}
var G = class {
	constructor(e) {
		this.spec = e, this.props = {}, e.props && Vf(e.props, this, this.props), this.key = e.key ? e.key.key : Uf("plugin");
	}
	getState(e) {
		return e[this.key];
	}
}, Hf = Object.create(null);
function Uf(e) {
	return e in Hf ? e + "$" + ++Hf[e] : (Hf[e] = 0, e + "$");
}
var Wf = class {
	constructor(e = "key") {
		this.key = Uf(e);
	}
	get(e) {
		return e.config.pluginsByKey[this.key];
	}
	getState(e) {
		return e[this.key];
	}
}, Gf = (e, t) => e.selection.empty ? !1 : (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function Kf(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
var qf = (e, t, n) => {
	let r = Kf(e, n);
	if (!r) return !1;
	let i = $f(r);
	if (!i) {
		let n = r.blockRange(), i = n && Fd(n);
		return i == null ? !1 : (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
	}
	let a = i.nodeBefore;
	if (_p(e, i, t, -1)) return !0;
	if (r.parent.content.size == 0 && (Zf(a, "end") || W.isSelectable(a))) for (let n = r.depth;; n--) {
		let o = nf(e.doc, r.before(n), r.after(n), V.empty);
		if (o && o.slice.size < o.to - o.from) {
			if (t) {
				let n = e.tr.step(o);
				n.setSelection(Zf(a, "end") ? H.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : W.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
			}
			return !0;
		}
		if (n == 1 || r.node(n - 1).childCount > 1) break;
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Jf = (e, t, n) => {
	let r = Kf(e, n);
	if (!r) return !1;
	let i = $f(r);
	return i ? Xf(e, i, t) : !1;
}, Yf = (e, t, n) => {
	let r = ep(e, n);
	if (!r) return !1;
	let i = rp(r);
	return i ? Xf(e, i, t) : !1;
};
function Xf(e, t, n) {
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
	let s = nf(e.doc, i, o, V.empty);
	if (!s || s.from != i || s instanceof Od && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(U.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function Zf(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
var Qf = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
		a = $f(r);
	}
	let o = a && a.nodeBefore;
	return !o || !W.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(W.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
};
function $f(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function ep(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
var tp = (e, t, n) => {
	let r = ep(e, n);
	if (!r) return !1;
	let i = rp(r);
	if (!i) return !1;
	let a = i.nodeAfter;
	if (_p(e, i, t, 1)) return !0;
	if (r.parent.content.size == 0 && (Zf(a, "start") || W.isSelectable(a))) {
		let n = nf(e.doc, r.before(), r.after(), V.empty);
		if (n && n.slice.size < n.to - n.from) {
			if (t) {
				let r = e.tr.step(n);
				r.setSelection(Zf(a, "start") ? H.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : W.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
			}
			return !0;
		}
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
}, np = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
		a = rp(r);
	}
	let o = a && a.nodeAfter;
	return !o || !W.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(W.create(e.doc, a.pos)).scrollIntoView()), !0);
};
function rp(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
var ip = (e, t) => {
	let n = e.selection, r = n instanceof W, i;
	if (r) {
		if (n.node.isTextblock || !Yd(e.doc, n.from)) return !1;
		i = n.from;
	} else if (i = Qd(e.doc, n.from, -1), i == null) return !1;
	if (t) {
		let n = e.tr.join(i);
		r && n.setSelection(W.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
	}
	return !0;
}, ap = (e, t) => {
	let n = e.selection, r;
	if (n instanceof W) {
		if (n.node.isTextblock || !Yd(e.doc, n.to)) return !1;
		r = n.to;
	} else if (r = Qd(e.doc, n.to, 1), r == null) return !1;
	return t && t(e.tr.join(r).scrollIntoView()), !0;
}, op = (e, t) => {
	let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && Fd(i);
	return a == null ? !1 : (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
}, sp = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
};
function cp(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var lp = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
	let i = n.node(-1), a = n.indexAfter(-1), o = cp(i.contentMatchAt(a));
	if (!o || !i.canReplaceWith(a, a, o)) return !1;
	if (t) {
		let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
		i.setSelection(H.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
	}
	return !0;
}, up = (e, t) => {
	let n = e.selection, { $from: r, $to: i } = n;
	if (n instanceof Of || r.parent.inlineContent || i.parent.inlineContent) return !1;
	let a = cp(i.parent.contentMatchAt(i.indexAfter()));
	if (!a || !a.isTextblock) return !1;
	if (t) {
		let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
		o.setSelection(U.create(o.doc, n + 1)), t(o.scrollIntoView());
	}
	return !0;
}, dp = (e, t) => {
	let { $cursor: n } = e.selection;
	if (!n || n.parent.content.size) return !1;
	if (n.depth > 1 && n.after() != n.end(-1)) {
		let r = n.before();
		if (qd(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
	}
	let r = n.blockRange(), i = r && Fd(r);
	return i == null ? !1 : (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
};
function fp(e) {
	return (t, n) => {
		let { $from: r, $to: i } = t.selection;
		if (t.selection instanceof W && t.selection.node.isBlock) return !r.parentOffset || !qd(t.doc, r.pos) ? !1 : (n && n(t.tr.split(r.pos).scrollIntoView()), !0);
		if (!r.depth) return !1;
		let a = [], o, s, c = !1, l = !1;
		for (let t = r.depth;; t--) if (r.node(t).isBlock) {
			c = r.end(t) == r.pos + (r.depth - t), l = r.start(t) == r.pos - (r.depth - t), s = cp(r.node(t - 1).contentMatchAt(r.indexAfter(t - 1)));
			let n = e && e(i.parent, c, r);
			a.unshift(n || (c && s ? { type: s } : null)), o = t;
			break;
		} else {
			if (t == 1) return !1;
			a.unshift(null);
		}
		let u = t.tr;
		(t.selection instanceof U || t.selection instanceof Of) && u.deleteSelection();
		let d = u.mapping.map(r.pos), f = qd(u.doc, d, a.length, a);
		if (f ||= (a[0] = s ? { type: s } : null, qd(u.doc, d, a.length, a)), !f) return !1;
		if (u.split(d, a.length, a), !c && l && r.node(o).type != s) {
			let e = u.mapping.map(r.before(o)), t = u.doc.resolve(e);
			s && r.node(o - 1).canReplaceWith(t.index(), t.index() + 1, s) && u.setNodeMarkup(u.mapping.map(r.before(o)), s);
		}
		return n && n(u.scrollIntoView()), !0;
	};
}
var pp = fp(), mp = (e, t) => {
	let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
	return a == 0 ? !1 : (i = n.before(a), t && t(e.tr.setSelection(W.create(e.doc, i))), !0);
}, hp = (e, t) => (t && t(e.tr.setSelection(new Of(e.doc))), !0);
function gp(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || Yd(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function _p(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && gp(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = z.empty;
			for (let e = o.length - 1; e >= 0; e--) s = z.from(o[e].create(null, s));
			s = z.from(i.copy(s));
			let c = e.tr.step(new kd(t.pos - 1, r, t.pos, r, new V(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && Yd(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : H.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && Fd(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && Zf(a, "start", !0) && Zf(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = z.empty;
				for (let e = o.length - 1; e >= 0; e--) r = z.from(o[e].copy(r));
				n(e.tr.step(new kd(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new V(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function vp(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(U.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
var yp = vp(-1), bp = vp(1);
function xp(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && Ld(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function Sp(e, t = null) {
	return function(n, r) {
		let i = !1;
		for (let r = 0; r < n.selection.ranges.length && !i; r++) {
			let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
			n.doc.nodesBetween(a, o, (r, a) => {
				if (i) return !1;
				if (!(!r.isTextblock || r.hasMarkup(e, t))) if (r.type == e) i = !0;
				else {
					let t = n.doc.resolve(a), r = t.index();
					i = t.parent.canReplaceWith(r, r + 1, e);
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
function Cp(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var wp = Cp(Gf, qf, Qf), Tp = Cp(Gf, tp, np), Ep = {
	Enter: Cp(sp, up, dp, pp),
	"Mod-Enter": lp,
	Backspace: wp,
	"Mod-Backspace": wp,
	"Shift-Backspace": wp,
	Delete: Tp,
	"Mod-Delete": Tp,
	"Mod-a": hp
}, Dp = {
	"Ctrl-h": Ep.Backspace,
	"Alt-Backspace": Ep["Mod-Backspace"],
	"Ctrl-d": Ep.Delete,
	"Ctrl-Alt-Backspace": Ep["Mod-Delete"],
	"Alt-Delete": Ep["Mod-Delete"],
	"Alt-d": Ep["Mod-Delete"],
	"Ctrl-a": yp,
	"Ctrl-e": bp
};
for (let e in Ep) Dp[e] = Ep[e];
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
//#endregion
//#region node_modules/prosemirror-schema-list/dist/index.js
function Op(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return kp(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function kp(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new uu(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new uu(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = Ld(a, n, r, t);
	return s ? (e && Ap(e, t, s, i, n), !0) : !1;
}
function Ap(e, t, n, r, i) {
	let a = z.empty;
	for (let e = n.length - 1; e >= 0; e--) a = z.from(n[e].type.create(n[e].attrs, a));
	e.step(new kd(t.start - (r ? 2 : 0), t.end, t.start, t.end, new V(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && qd(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function jp(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		return a ? n ? r.node(a.depth - 1).type == e ? Mp(t, n, e, a) : Np(t, n, a) : !0 : !1;
	};
}
function Mp(e, t, n, r) {
	let i = e.tr, a = r.end, o = r.$to.end(r.depth);
	a < o && (i.step(new kd(a - 1, o, a, o, new V(z.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new uu(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
	let s = Fd(r);
	if (s == null) return !1;
	i.lift(r, s);
	let c = i.doc.resolve(i.mapping.map(a, -1) - 1);
	return Yd(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), t(i.scrollIntoView()), !0;
}
function Np(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? z.empty : z.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new kd(d - +!!s, f + +!!c, d + 1, f - 1, new V((s ? z.empty : z.from(i.copy(z.empty))).append(c ? z.empty : z.from(i.copy(z.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function Pp(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (c.type != e) return !1;
		if (n) {
			let r = c.lastChild && c.lastChild.type == s.type, i = z.from(r ? e.create() : null), o = new V(z.from(e.create(null, z.from(s.type.create(null, i)))), r ? 3 : 1, 0), l = a.start, u = a.end;
			n(t.tr.step(new kd(l - (r ? 3 : 1), u, l, u, o, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
//#endregion
//#region node_modules/prosemirror-view/dist/index.js
var Fp = function(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}, Ip = function(e) {
	let t = e.assignedSlot || e.parentNode;
	return t && t.nodeType == 11 ? t.host : t;
}, Lp = null, Rp = function(e, t, n) {
	let r = Lp ||= document.createRange();
	return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
}, zp = function() {
	Lp = null;
}, Bp = function(e, t, n, r) {
	return n && (Hp(e, t, n, r, -1) || Hp(e, t, n, r, 1));
}, Vp = /^(img|br|input|textarea|hr)$/i;
function Hp(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : Up(e))) {
			let n = e.parentNode;
			if (!n || n.nodeType != 1 || qp(e) || Vp.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = Fp(e) + (i < 0 ? 0 : 1), e = n;
		} else if (e.nodeType == 1) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (n.nodeType == 1 && n.contentEditable == "false") if (n.pmViewDesc?.ignoreForSelection) t += i;
			else return !1;
			else e = n, t = i < 0 ? Up(e) : 0;
		} else return !1;
	}
}
function Up(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function Wp(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t) return e;
		if (e.nodeType == 1 && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = Up(e);
		} else if (e.parentNode && !qp(e)) t = Fp(e), e = e.parentNode;
		else return null;
	}
}
function Gp(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t < e.nodeValue.length) return e;
		if (e.nodeType == 1 && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !qp(e)) t = Fp(e) + 1, e = e.parentNode;
		else return null;
	}
}
function Kp(e, t, n) {
	for (let r = t == 0, i = t == Up(e); r || i;) {
		if (e == n) return !0;
		let t = Fp(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == Up(e);
	}
}
function qp(e) {
	let t;
	for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
	return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
var Jp = function(e) {
	return e.focusNode && Bp(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
};
function Yp(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function Xp(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function Zp(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(Up(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(Up(r.startContainer), r.startOffset)
		};
	}
}
var Qp = typeof navigator < "u" ? navigator : null, $p = typeof document < "u" ? document : null, em = Qp && Qp.userAgent || "", tm = /Edge\/(\d+)/.exec(em), nm = /MSIE \d/.exec(em), rm = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(em), im = !!(nm || rm || tm), am = nm ? document.documentMode : rm ? +rm[1] : tm ? +tm[1] : 0, om = !im && /gecko\/(\d+)/i.test(em);
om && +(/Firefox\/(\d+)/.exec(em) || [0, 0])[1];
var sm = !im && /Chrome\/(\d+)/.exec(em), cm = !!sm, lm = sm ? +sm[1] : 0, um = !im && !!Qp && /Apple Computer/.test(Qp.vendor), dm = um && (/Mobile\/\w+/.test(em) || !!Qp && Qp.maxTouchPoints > 2), fm = dm || (Qp ? /Mac/.test(Qp.platform) : !1), pm = Qp ? /Win/.test(Qp.platform) : !1, mm = /Android \d/.test(em), hm = !!$p && "webkitFontSmoothing" in $p.documentElement.style, gm = hm ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function _m(e) {
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
function vm(e, t) {
	return typeof e == "number" ? e : e[t];
}
function ym(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function bm(e, t, n) {
	if (!Fm(t) && t.left == 0) return;
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (o.nodeType != 1) {
			o = Ip(o);
			continue;
		}
		let e = o, n = e == a.body, s = n ? _m(a) : ym(e), c = 0, l = 0;
		if (t.top < s.top + vm(r, "top") ? l = -(s.top - t.top + vm(i, "top")) : t.bottom > s.bottom - vm(r, "bottom") && (l = t.bottom - t.top > s.bottom - s.top ? t.top + vm(i, "top") - s.top : t.bottom - s.bottom + vm(i, "bottom")), t.left < s.left + vm(r, "left") ? c = -(s.left - t.left + vm(i, "left")) : t.right > s.right - vm(r, "right") && (c = t.right - s.right + vm(i, "right")), c || l) if (n) a.defaultView.scrollBy(c, l);
		else {
			let n = e.scrollLeft, r = e.scrollTop;
			l && (e.scrollTop += l), c && (e.scrollLeft += c);
			let i = e.scrollLeft - n, a = e.scrollTop - r;
			t = {
				left: t.left - i,
				top: t.top - a,
				right: t.right - i,
				bottom: t.bottom - a
			};
		}
		let u = n ? "fixed" : getComputedStyle(o).position;
		if (/^(fixed|sticky)$/.test(u)) break;
		o = u == "absolute" ? o.offsetParent : Ip(o);
	}
}
function xm(e) {
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
		stack: Sm(e.dom)
	};
}
function Sm(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = Ip(r));
	return t;
}
function Cm({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	wm(n, r == 0 ? 0 : r - t);
}
function wm(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
var Tm = null;
function Em(e) {
	if (e.setActive) return e.setActive();
	if (Tm) return e.focus(Tm);
	let t = Sm(e);
	e.focus(Tm == null ? { get preventScroll() {
		return Tm = { preventScroll: !0 }, !0;
	} } : void 0), Tm || (Tm = !1, wm(t, 0));
}
function Dm(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (u.nodeType == 1) e = u.getClientRects();
		else if (u.nodeType == 3) e = Rp(u).getClientRects();
		else continue;
		for (let f = 0; f < e.length; f++) {
			let p = e[f];
			if (p.top <= o && p.bottom >= s) {
				o = Math.max(p.bottom, o), s = Math.min(p.top, s);
				let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
				if (e < r) {
					n = u, r = e, i = e && n.nodeType == 3 ? {
						left: p.right < t.left ? p.right : p.left,
						top: t.top
					} : t, u.nodeType == 1 && e && (a = d + +(t.left >= (p.left + p.right) / 2));
					continue;
				}
			} else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
				left: Math.max(p.left, Math.min(p.right, t.left)),
				top: p.top
			});
			!n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1);
		}
	}
	return !n && c && (n = c, i = l, r = 0), n && n.nodeType == 3 ? Om(n, i) : !n || r && n.nodeType == 1 ? {
		node: e,
		offset: a
	} : Dm(n, i);
}
function Om(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = Im(r, 1);
		if (n.top != n.bottom && km(t, n)) {
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
function km(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function Am(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function jm(e, t, n) {
	let { node: r, offset: i } = Dm(t, n), a = -1;
	if (r.nodeType == 1 && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function Mm(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (t.dom.nodeType == 1 && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function Nm(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (n.nodeType == 1) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (km(t, i)) return Nm(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function Pm(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = Zp(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o.nodeType == 1 ? o : o.parentNode)) {
		let n = e.dom.getBoundingClientRect();
		if (!km(t, n) || (o = Nm(e.dom, t, n), !o)) return null;
	}
	if (um) for (let e = o; r && e; e = Ip(e)) e.draggable && (r = void 0);
	if (o = Am(o, t), r) {
		if (om && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		hm && i && r.nodeType == 1 && (n = r.childNodes[i - 1]).nodeType == 1 && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (s = Mm(e, r, i, t));
	}
	s ??= jm(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function Fm(e) {
	return e.top < e.bottom || e.left < e.right;
}
function Im(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if (Fm(e)) return e;
	}
	return Array.prototype.find.call(n, Fm) || e.getBoundingClientRect();
}
var Lm = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Rm(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = hm || om;
	if (r.nodeType == 3) if (o && (Lm.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
		let e = Im(Rp(r, i, i), n);
		if (om && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
			let t = Im(Rp(r, i - 1, i - 1), -1);
			if (t.top == e.top) {
				let n = Im(Rp(r, i, i + 1), -1);
				if (n.top != e.top) return zm(n, n.left < t.left);
			}
		}
		return e;
	} else {
		let e = i, t = i, a = n < 0 ? 1 : -1;
		return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, zm(Im(Rp(r, e, t), a), a < 0);
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == Up(r))) {
			let e = r.childNodes[i - 1];
			if (e.nodeType == 1) return Bm(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < Up(r)) {
			let e = r.childNodes[i];
			if (e.nodeType == 1) return Bm(e.getBoundingClientRect(), !0);
		}
		return Bm(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == Up(r))) {
		let e = r.childNodes[i - 1], t = e.nodeType == 3 ? Rp(e, Up(e) - +!o) : e.nodeType == 1 && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return zm(Im(t, 1), !1);
	}
	if (a == null && i < Up(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? e.nodeType == 3 ? Rp(e, 0, +!o) : e.nodeType == 1 ? e : null : null;
		if (t) return zm(Im(t, -1), !0);
	}
	return zm(Im(r.nodeType == 3 ? Rp(r) : r, -n), n >= 0);
}
function zm(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function Bm(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function Vm(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function Hm(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return Vm(e, t, () => {
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
		let r = Rm(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (e.nodeType == 1) t = e.getClientRects();
			else if (e.nodeType == 3) t = Rp(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
var Um = /[\u0590-\u08ac]/;
function Wm(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !Um.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : Vm(e, t, () => {
		let { focusNode: t, focusOffset: i, anchorNode: a, anchorOffset: o } = e.domSelectionRange(), c = s.caretBidiLevel;
		s.modify("move", n, "character");
		let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: u, focusOffset: d } = e.domSelectionRange(), f = u && !l.contains(u.nodeType == 1 ? u : u.parentNode) || t == u && i == d;
		try {
			s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i);
		} catch {}
		return c != null && (s.caretBidiLevel = c), f;
	}) : r.pos == r.start() || r.pos == r.end();
}
var Gm = null, Km = null, qm = !1;
function Jm(e, t, n) {
	return Gm == t && Km == n ? qm : (Gm = t, Km = n, qm = n == "up" || n == "down" ? Hm(e, t, n) : Wm(e, t, n));
}
var Ym = 0, Xm = 1, Zm = 2, Qm = 3, $m = class {
	constructor(e, t, n, r) {
		this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = Ym, n.pmViewDesc = this;
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
	parseRule() {
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
		if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode)) if (n < 0) {
			let n, r;
			if (e == this.contentDOM) n = e.childNodes[t - 1];
			else {
				for (; e.parentNode != this.contentDOM;) e = e.parentNode;
				n = e.previousSibling;
			}
			for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
			return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
		} else {
			let n, r;
			if (e == this.contentDOM) n = e.childNodes[t];
			else {
				for (; e.parentNode != this.contentDOM;) e = e.parentNode;
				n = e.nextSibling;
			}
			for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
			return n ? this.posBeforeChild(r) : this.posAtEnd;
		}
		let r;
		if (e == this.dom && this.contentDOM) r = t > Fp(this.contentDOM);
		else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) r = e.compareDocumentPosition(this.contentDOM) & 2;
		else if (this.dom.firstChild) {
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
			if (i && (!t || i.node)) if (n && (a = i.nodeDOM) && !(a.nodeType == 1 ? a.contains(e.nodeType == 1 ? e : e.parentNode) : a == e)) n = !1;
			else return i;
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
			if (a > e || i instanceof oh) {
				r = e - t;
				break;
			}
			t = a;
		}
		if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
		for (let e; n && !(e = this.children[n - 1]).size && e instanceof eh && e.side >= 0; n--);
		if (t <= 0) {
			let e, r = !0;
			for (; e = n ? this.children[n - 1] : null, !(!e || e.dom.parentNode == this.contentDOM); n--, r = !1);
			return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
				node: this.contentDOM,
				offset: e ? Fp(e.dom) + 1 : 0
			};
		} else {
			let e, r = !0;
			for (; e = n < this.children.length ? this.children[n] : null, !(!e || e.dom.parentNode == this.contentDOM); n++, r = !1);
			return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
				node: this.contentDOM,
				offset: e ? Fp(e.dom) : this.contentDOM.childNodes.length
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
						r = Fp(n.dom) + 1;
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
						i = Fp(n.dom);
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
		if (t.nodeType != 1 || n == t.childNodes.length) throw RangeError("No node after pos " + e);
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
		if ((om || um) && e == t) {
			let { node: e, offset: t } = o;
			if (e.nodeType == 3) {
				if (u = !!(t && e.nodeValue[t - 1] == "\n"), u && t == e.nodeValue.length) for (let t = e, n; t; t = t.parentNode) {
					if (n = t.nextSibling) {
						n.nodeName == "BR" && (o = s = {
							node: n.parentNode,
							offset: Fp(n) + 1
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
		if (om && l.focusNode && l.focusNode != s.node && l.focusNode.nodeType == 1) {
			let e = l.focusNode.childNodes[l.focusOffset];
			e && e.contentEditable == "false" && (r = !0);
		}
		if (!(r || u && um) && Bp(o.node, o.offset, l.anchorNode, l.anchorOffset) && Bp(s.node, s.offset, l.focusNode, l.focusOffset)) return;
		let d = !1;
		if ((c.extend || e == t) && !(u && om)) {
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
					this.dirty = e == n || t == a ? Zm : Xm, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = Qm : i.markDirty(e - r, t - r);
					return;
				} else i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? Zm : Qm;
			}
			n = a;
		}
		this.dirty = Zm;
	}
	markParentsDirty() {
		let e = 1;
		for (let t = this.parent; t; t = t.parent, e++) {
			let n = e == 1 ? Zm : Xm;
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
}, eh = class extends $m {
	constructor(e, t, n, r) {
		let i, a = t.type.toDOM;
		if (typeof a == "function" && (a = a(n, () => {
			if (!i) return r;
			if (i.parent) return i.parent.posBeforeChild(i);
		})), !t.type.spec.raw) {
			if (a.nodeType != 1) {
				let e = document.createElement("span");
				e.appendChild(a), a = e;
			}
			a.contentEditable = "false", a.classList.add("ProseMirror-widget");
		}
		super(e, [], a, null), this.widget = t, this.widget = t, i = this;
	}
	matchesWidget(e) {
		return this.dirty == Ym && e.type.eq(this.widget.type);
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
}, th = class extends $m {
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
}, nh = class e extends $m {
	constructor(e, t, n, r, i) {
		super(e, [], n, r), this.mark = t, this.spec = i;
	}
	static create(t, n, r, i) {
		let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
		return (!o || !o.dom) && (o = td.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
	}
	parseRule() {
		return this.dirty & Qm || this.mark.type.spec.reparseInView ? null : {
			mark: this.mark.type.name,
			attrs: this.mark.attrs,
			contentElement: this.contentDOM
		};
	}
	matchesMark(e) {
		return this.dirty != Qm && this.mark.eq(e);
	}
	markDirty(e, t) {
		if (super.markDirty(e, t), this.dirty != Ym) {
			let e = this.parent;
			for (; !e.node;) e = e.parent;
			e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = Ym;
		}
	}
	slice(t, n, r) {
		let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
		n < o && (a = Ch(a, n, o, r)), t > 0 && (a = Ch(a, 0, t, r));
		for (let e = 0; e < a.length; e++) a[e].parent = i;
		return i.children = a, i;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
}, rh = class e extends $m {
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
			else if (u.nodeType != 3) throw RangeError("Text must be rendered as a DOM text node");
		} else if (!u) {
			let e = td.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
			({dom: u, contentDOM: d} = e);
		}
		!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
		let f = u;
		return u = mh(u, r, n), l ? c = new sh(t, n, r, i, u, d || null, f, l) : n.isText ? new ah(t, n, r, i, u, f) : new e(t, n, r, i, u, d || null, f);
	}
	parseRule() {
		if (this.node.type.spec.reparseInView) return null;
		let e = {
			node: this.node.type.name,
			attrs: this.node.attrs
		};
		if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM) e.getContent = () => this.node.content;
		else if (!this.contentLost) e.contentElement = this.contentDOM;
		else {
			for (let t = this.children.length - 1; t >= 0; t--) {
				let n = this.children[t];
				if (this.dom.contains(n.dom.parentNode)) {
					e.contentElement = n.dom.parentNode;
					break;
				}
			}
			e.contentElement || (e.getContent = () => z.empty);
		}
		return e;
	}
	matchesNode(e, t, n) {
		return this.dirty == Ym && e.eq(this.node) && hh(t, this.outerDeco) && n.eq(this.innerDeco);
	}
	get size() {
		return this.node.nodeSize;
	}
	get border() {
		return +!this.node.isLeaf;
	}
	updateChildren(e, t) {
		let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new _h(this, a && a.node, e);
		bh(this.node, this.innerDeco, (t, i, a) => {
			t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? B.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
		}, (t, a, c, l) => {
			s.syncToMarks(t.marks, n, e, l);
			let u;
			s.findNodeMatch(t, a, c, l) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (u = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, c, u, e) || s.updateNextNode(t, a, c, e, l, r) || s.addNode(t, a, c, e, r), r += t.nodeSize;
		}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == Zm) && (a && this.protectLocalComposition(e, a), ch(this.contentDOM, this.children, e), dm && xh(this.dom));
	}
	localCompositionInfo(e, t) {
		let { from: n, to: r } = e.state.selection;
		if (!(e.state.selection instanceof U) || n < t || r > t + this.node.content.size) return null;
		let i = e.input.compositionNode;
		if (!i || !this.dom.contains(i.parentNode)) return null;
		if (this.node.inlineContent) {
			let e = i.nodeValue, a = Sh(this.node.content, e, n - t, r - t);
			return a < 0 ? null : {
				node: i,
				pos: a,
				text: e
			};
		} else return {
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
			i.pmViewDesc &&= void 0;
		}
		let a = new th(this, i, t, r);
		e.input.compositionNodes.push(a), this.children = Ch(this.children, n, n + r.length, e, a);
	}
	update(e, t, n, r) {
		return this.dirty == Qm || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0);
	}
	updateInner(e, t, n, r) {
		this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = Ym;
	}
	updateOuterDeco(e) {
		if (hh(e, this.outerDeco)) return;
		let t = this.nodeDOM.nodeType != 1, n = this.dom;
		this.dom = fh(this.dom, this.nodeDOM, dh(this.outerDeco, this.node, t), dh(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
	}
	selectNode() {
		this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
	}
	deselectNode() {
		this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
	}
	get domAtom() {
		return this.node.isAtom;
	}
};
function ih(e, t, n, r, i) {
	mh(r, t, e);
	let a = new rh(void 0, e, t, n, r, r, r);
	return a.contentDOM && a.updateChildren(i, 0), a;
}
var ah = class e extends rh {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, r, i, null, a);
	}
	parseRule() {
		let e = this.nodeDOM.parentNode;
		for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
		return { skip: e || !0 };
	}
	update(e, t, n, r) {
		return this.dirty == Qm || this.dirty != Ym && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Ym || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = Ym, !0);
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
		super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = Qm);
	}
	get domAtom() {
		return !1;
	}
	isText(e) {
		return this.node.text == e;
	}
}, oh = class extends $m {
	parseRule() {
		return { ignore: !0 };
	}
	matchesHack(e) {
		return this.dirty == Ym && this.dom.nodeName == e;
	}
	get domAtom() {
		return !0;
	}
	get ignoreForCoords() {
		return this.dom.nodeName == "IMG";
	}
}, sh = class extends rh {
	constructor(e, t, n, r, i, a, o, s) {
		super(e, t, n, r, i, a, o), this.spec = s;
	}
	update(e, t, n, r) {
		if (this.dirty == Qm) return !1;
		if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
			let i = this.spec.update(e, t, n);
			return i && this.updateInner(e, t, n, r), i;
		} else if (!this.contentDOM && !e.isLeaf) return !1;
		else return super.update(e, t, n, r);
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
function ch(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = gh(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof nh) {
			let t = r ? r.previousSibling : e.lastChild;
			ch(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = gh(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
var lh = function(e) {
	e && (this.nodeName = e);
};
lh.prototype = Object.create(null);
var uh = [new lh()];
function dh(e, t, n) {
	if (e.length == 0) return uh;
	let r = n ? uh[0] : new lh(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new lh(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new lh(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function fh(e, t, n, r) {
	if (n == uh && r == uh) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName ? i = t : (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = uh[0], i = t);
		}
		ph(i, o || uh[0], a);
	}
	return i;
}
function ph(e, t, n) {
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
function mh(e, t, n) {
	return fh(e, e, uh, dh(t, n, e.nodeType != 1));
}
function hh(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function gh(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var _h = class {
	constructor(e, t, n) {
		this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = vh(e.node.content, e);
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
		for (; i < a;) this.destroyRest(), this.top.dirty = Ym, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
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
				t instanceof nh && t.dirty != Qm && t.mark.type == e[a].type && t.spec.update && !this.isLocked(t.dom) && t.spec.update(e[a]) && (t.mark = e[a], i = this.index, this.changed = !0);
			}
			if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
			else {
				let r = nh.create(this.top, e[a], t, n);
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
		return a.dirty == Qm && a.dom == a.contentDOM && (a.dirty = Zm), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
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
			if (s instanceof rh) {
				let c = this.preMatch.matched.get(s);
				if (c != null && c != i) return !1;
				let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != Qm && hh(t, s.outerDeco));
				if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
				if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = Zm, u.updateChildren(r, a + 1), u.dirty = Ym), this.changed = !0, this.index++, !0;
				break;
			}
		}
		return !1;
	}
	recreateWrapper(e, t, n, r, i, a) {
		if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !hh(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
		let o = rh.create(this.top, t, n, r, i, a);
		if (o.contentDOM) {
			o.children = e.children, e.children = [];
			for (let e of o.children) e.parent = o;
		}
		return e.destroy(), o;
	}
	addNode(e, t, n, r, i) {
		let a = rh.create(this.top, e, t, n, r, i);
		a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
	}
	placeWidget(e, t, n) {
		let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
		if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
		else {
			let r = new eh(this.top, e, t, n);
			this.top.children.splice(this.index++, 0, r), this.changed = !0;
		}
	}
	addTextblockHacks() {
		let e = this.top.children[this.index - 1], t = this.top;
		for (; e instanceof nh;) t = e, e = t.children[t.children.length - 1];
		(!e || !(e instanceof ah) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((um || cm) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
	}
	addHackNode(e, t) {
		if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
		else {
			let n = document.createElement(e);
			e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
			let r = new oh(this.top, [], n, null);
			t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
		}
	}
	isLocked(e) {
		return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
	}
};
function vh(e, t) {
	let n = t, r = n.children.length, i = e.childCount, a = /* @__PURE__ */ new Map(), o = [];
	outer: for (; i > 0;) {
		let s;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof nh) n = e, r = e.children.length;
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
function yh(e, t) {
	return e.type.side - t.type.side;
}
function bh(e, t, n, r) {
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
		if (u) if (d) {
			d.sort(yh);
			for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
		} else n(u, l, !!c);
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
function xh(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function Sh(e, t, n, r) {
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
function Ch(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function wh(e, t = null) {
	let n = e.domSelectionRange(), r = e.state.doc;
	if (!n.focusNode) return null;
	let i = e.docView.nearestDesc(n.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if (Jp(n)) {
		for (c = o; i && !i.node;) i = i.parent;
		let e = i.node;
		if (i && e.isAtom && W.isSelectable(e) && i.parent && !(e.isInline && Kp(n.focusNode, n.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new W(o == e ? s : r.resolve(e));
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
		l = Fh(e, u, s, n);
	}
	return l;
}
function Th(e) {
	return e.editable ? e.hasFocus() : Lh(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Eh(e, t = !1) {
	let n = e.state.selection;
	if (Nh(e, n), !Th(e)) return;
	let r = e.input.mouseDown;
	if (!t && cm && r) {
		let t = e.domSelectionRange(), n = e.domObserver.currentSelection;
		if (t.anchorNode && n.anchorNode && Bp(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset) && r.delaySelUpdate()) {
			e.domObserver.setCurSelection();
			return;
		}
	}
	if (e.domObserver.disconnectSelection(), e.cursorWrapper) Mh(e);
	else {
		let { anchor: r, head: i } = n, a, o;
		Dh && !(n instanceof U) && (n.$from.parent.inlineContent || (a = Oh(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = Oh(e, n.to))), e.docView.setSelection(r, i, e, t), Dh && (a && Ah(a), o && Ah(o)), n.visible ? e.dom.classList.remove("ProseMirror-hideselection") : (e.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && jh(e));
	}
	e.domObserver.setCurSelection(), e.domObserver.connectSelection();
}
var Dh = um || cm && lm < 63;
function Oh(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (um && i && i.contentEditable == "false") return kh(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return kh(i);
		if (a) return kh(a);
	}
}
function kh(e) {
	return e.contentEditable = "true", um && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function Ah(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function jh(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Th(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function Mh(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom, r = n.nodeName == "IMG";
	r ? t.collapse(n.parentNode, Fp(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && im && am <= 11 && (n.disabled = !0, n.disabled = !1);
}
function Nh(e, t) {
	if (t instanceof W) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && (Ph(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else Ph(e);
}
function Ph(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function Fh(e, t, n, r) {
	return e.someProp("createSelectionBetween", (r) => r(e, t, n)) || U.between(t, n, r);
}
function Ih(e) {
	return e.editable && !e.hasFocus() ? !1 : Lh(e);
}
function Lh(e) {
	let t = e.domSelectionRange();
	if (!t.anchorNode) return !1;
	try {
		return e.dom.contains(t.anchorNode.nodeType == 3 ? t.anchorNode.parentNode : t.anchorNode) && (e.editable || e.dom.contains(t.focusNode.nodeType == 3 ? t.focusNode.parentNode : t.focusNode));
	} catch {
		return !1;
	}
}
function Rh(e) {
	let t = e.docView.domFromPos(e.state.selection.anchor, 0), n = e.domSelectionRange();
	return Bp(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function zh(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && H.findFrom(a, t);
}
function Bh(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function Vh(e, t, n) {
	let r = e.state.selection;
	if (r instanceof U) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return Bh(e, new U(r.$anchor, a));
		} else if (!r.empty) return !1;
		else if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = zh(e.state, t);
			return n && n instanceof W ? Bh(e, n) : !1;
		} else if (!(fm && n.indexOf("m") > -1)) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? W.isSelectable(i) ? Bh(e, new W(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : hm ? Bh(e, new U(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1 : !1;
		}
	} else if (r instanceof W && r.node.isInline) return Bh(e, new U(t > 0 ? r.$to : r.$from));
	else {
		let n = zh(e.state, t);
		return n ? Bh(e, n) : !1;
	}
}
function Hh(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function Uh(e, t) {
	let n = e.pmViewDesc;
	return n && n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR");
}
function Wh(e, t) {
	return t < 0 ? Gh(e) : Kh(e);
}
function Gh(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (om && n.nodeType == 1 && r < Hh(n) && Uh(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (n.nodeType != 1) break;
		{
			let e = n.childNodes[r - 1];
			if (Uh(e, -1)) i = n, a = --r;
			else if (e.nodeType == 3) n = e, r = n.nodeValue.length;
			else break;
		}
	} else if (qh(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && Uh(t, -1);) i = n.parentNode, a = Fp(t), t = t.previousSibling;
		if (t) n = t, r = Hh(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? Xh(e, n, r) : i && Xh(e, i, a);
}
function Kh(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = Hh(n), a, o;
	for (;;) if (r < i) {
		if (n.nodeType != 1) break;
		let e = n.childNodes[r];
		if (Uh(e, 1)) a = n, o = ++r;
		else break;
	} else if (qh(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && Uh(t, 1);) a = t.parentNode, o = Fp(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = Hh(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && Xh(e, a, o);
}
function qh(e) {
	let t = e.pmViewDesc;
	return t && t.node && t.node.isBlock;
}
function Jh(e, t) {
	for (; e && t == e.childNodes.length && !qp(e);) t = Fp(e) + 1, e = e.parentNode;
	for (; e && t < e.childNodes.length;) {
		let n = e.childNodes[t];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = 0;
	}
}
function Yh(e, t) {
	for (; e && !t && !qp(e);) t = Fp(e), e = e.parentNode;
	for (; e && t;) {
		let n = e.childNodes[t - 1];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = e.childNodes.length;
	}
}
function Xh(e, t, n) {
	if (t.nodeType != 3) {
		let e, r;
		(r = Jh(t, n)) ? (t = r, n = 0) : (e = Yh(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection();
	if (!r) return;
	if (Jp(r)) {
		let e = document.createRange();
		e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e);
	} else r.extend && r.extend(t, n);
	e.domObserver.setCurSelection();
	let { state: i } = e;
	setTimeout(() => {
		e.state == i && Eh(e);
	}, 50);
}
function Zh(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(cm || pm) && n.parent.inlineContent) {
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
	return getComputedStyle(e.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Qh(e, t, n) {
	let r = e.state.selection;
	if (r instanceof U && !r.empty || n.indexOf("s") > -1 || fm && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = zh(e.state, t);
		if (n && n instanceof W) return Bh(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Of ? H.near(n, t) : H.findFrom(n, t);
		return o ? Bh(e, o) : !1;
	}
	return !1;
}
function $h(e, t) {
	if (!(e.state.selection instanceof U)) return !0;
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
function eg(e, t, n) {
	e.domObserver.stop(), t.contentEditable = n, e.domObserver.start();
}
function tg(e) {
	if (!um || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (t && t.nodeType == 1 && n == 0 && t.firstChild && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		eg(e, n, "true"), setTimeout(() => eg(e, n, "false"), 20);
	}
	return !1;
}
function ng(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function rg(e, t) {
	let n = t.keyCode, r = ng(t);
	if (n == 8 || fm && n == 72 && r == "c") return $h(e, -1) || Wh(e, -1);
	if (n == 46 && !t.shiftKey || fm && n == 68 && r == "c") return $h(e, 1) || Wh(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || fm && n == 66 && r == "c") {
		let t = n == 37 ? Zh(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return Vh(e, t, r) || Wh(e, t);
	} else if (n == 39 || fm && n == 70 && r == "c") {
		let t = n == 39 ? Zh(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return Vh(e, t, r) || Wh(e, t);
	} else if (n == 38 || fm && n == 80 && r == "c") return Qh(e, -1, r) || Wh(e, -1);
	else if (n == 40 || fm && n == 78 && r == "c") return tg(e) || Qh(e, 1, r) || Wh(e, 1);
	else if (r == (fm ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90)) return !0;
	return !1;
}
function ig(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || td.fromSchema(e.state.schema), s = mg(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && l.nodeType == 1 && (u = pg[l.nodeName.toLowerCase()]);) {
		for (let e = u.length - 1; e >= 0; e--) {
			let t = s.createElement(u[e]);
			for (; c.firstChild;) t.appendChild(c.firstChild);
			c.appendChild(t), d++;
		}
		l = c.firstChild;
	}
	return l && l.nodeType == 1 && l.setAttribute("data-pm-slice", `${i} ${a}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`), {
		dom: c,
		text: e.someProp("clipboardTextSerializer", (n) => n(t, e)) || t.content.textBetween(0, t.content.size, "\n\n"),
		slice: t
	};
}
function ag(e, t, n, r, i) {
	let a = i.parent.type.spec.code, o, s;
	if (!n && !t) return null;
	let c = !!t && (r || a || !n);
	if (c) {
		if (e.someProp("transformPastedText", (n) => {
			t = n(t, a || r, e);
		}), a) return s = new V(z.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0), e.someProp("transformPasted", (t) => {
			s = t(s, e, !0);
		}), s;
		let n = e.someProp("clipboardTextParser", (n) => n(t, i, r, e));
		if (n) s = n;
		else {
			let n = i.marks(), { schema: r } = e.state, a = td.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = _g(n), hm && vg(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && e.nodeType != 1;) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || Vu.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !og.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = yg(fg(s, +u[1], +u[2]), u[4]);
	else if (s = V.maxOpen(sg(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = fg(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, c);
	}), s;
}
var og = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function sg(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && lg(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = ug(a[a.length - 1], i.length));
				let n = cg(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return z.from(a);
	}
	return e;
}
function cg(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, z.from(e));
	return e;
}
function lg(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = lg(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(z.from(cg(n, e, i + 1))));
	}
}
function ug(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, ug(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(z.empty, !0);
	return e.copy(n.append(r));
}
function dg(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = dg(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(z.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function fg(e, t, n) {
	return t < e.openStart && (e = new V(dg(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new V(dg(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
var pg = {
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
function mg() {
	return document.implementation.createHTMLDocument("title");
}
var hg = null;
function gg(e) {
	let t = window.trustedTypes;
	return t ? (hg ||= t.defaultPolicy || t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e }), hg.createHTML(e)) : e;
}
function _g(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = mg(), r = n.body, i = /<([a-z][^>\s]+)/i.exec(e), a;
	if ((a = i && pg[i[1].toLowerCase()]) && (e = a.map((e) => "<" + e + ">").join("") + e + a.map((e) => "</" + e + ">").reverse().join("")), r.innerHTML = gg(e), a) for (let e = 0; e < a.length; e++) r = r.querySelector(a[e]) || r;
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
function vg(e) {
	let t = e.querySelectorAll(cm ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function yg(e, t) {
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
		i = z.from(t.create(r[e + 1], i)), a++, o++;
	}
	return new V(i, a, o);
}
var bg = {}, xg = {}, Sg = {
	touchstart: !0,
	touchmove: !0
}, Cg = class {
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
function wg(e) {
	for (let t in bg) {
		let n = bg[t];
		e.dom.addEventListener(t, e.input.eventHandlers[t] = (t) => {
			kg(e, t) && !Og(e, t) && (e.editable || !(t.type in xg)) && n(e, t);
		}, Sg[t] ? { passive: !0 } : void 0);
	}
	um && e.dom.addEventListener("input", () => null), Dg(e);
}
function Tg(e, t) {
	e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now();
}
function Eg(e) {
	e.input.mouseDown && e.input.mouseDown.done(), e.domObserver.stop();
	for (let t in e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
	clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function Dg(e) {
	e.someProp("handleDOMEvents", (t) => {
		for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = (t) => Og(e, t));
	});
}
function Og(e, t) {
	return e.someProp("handleDOMEvents", (n) => {
		let r = n[t.type];
		return r ? r(e, t) || t.defaultPrevented : !1;
	});
}
function kg(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target; n != e.dom; n = n.parentNode) if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
	return !0;
}
function Ag(e, t) {
	!Og(e, t) && bg[t.type] && (e.editable || !(t.type in xg)) && bg[t.type](e, t);
}
xg.keydown = (e, t) => {
	let n = t;
	if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !qg(e) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), !(mm && cm && n.keyCode == 13))) if (n.keyCode != 229 && e.domObserver.forceFlush(), dm && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
		let t = Date.now();
		e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
			e.input.lastIOSEnter == t && (e.someProp("handleKeyDown", (t) => t(e, Yp(13, "Enter"))), e.input.lastIOSEnter = 0);
		}, 200);
	} else e.someProp("handleKeyDown", (t) => t(e, n)) || rg(e, n) ? n.preventDefault() : Tg(e, "key");
}, xg.keyup = (e, t) => {
	t.keyCode == 16 && (e.input.shiftKey = !1);
}, xg.keypress = (e, t) => {
	let n = t;
	if (qg(e) || !n.charCode || n.ctrlKey && !n.altKey || fm && n.metaKey) return;
	if (e.someProp("handleKeyPress", (t) => t(e, n))) {
		n.preventDefault();
		return;
	}
	let r = e.state.selection;
	if (!(r instanceof U) || !r.$from.sameParent(r.$to)) {
		let t = String.fromCharCode(n.charCode), i = () => e.state.tr.insertText(t).scrollIntoView();
		!/[\r\n]/.test(t) && !e.someProp("handleTextInput", (n) => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault();
	}
};
function jg(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Mg(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function Ng(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function Pg(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	n == "pointer" && r.setMeta("pointer", !0), e.dispatch(r);
}
function Fg(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && W.isSelectable(r) ? (Pg(e, new W(n), "pointer"), !0) : !1;
}
function Ig(e, t) {
	if (t == -1) return !1;
	let n = e.state.selection, r, i;
	n instanceof W && (r = n.node);
	let a = e.state.doc.resolve(t);
	for (let e = a.depth + 1; e > 0; e--) {
		let t = e > a.depth ? a.nodeAfter : a.node(e);
		if (W.isSelectable(t)) {
			i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
			break;
		}
	}
	return i == null ? !1 : (Pg(e, W.create(e.state.doc, i), "pointer"), !0);
}
function Lg(e, t, n, r, i) {
	return Ng(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? Ig(e, n) : Fg(e, n));
}
function Rg(e, t, n, r) {
	return Ng(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function zg(e, t, n, r) {
	return Ng(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r)) || Bg(e, n, r);
}
function Bg(e, t, n) {
	if (n.button != 0) return !1;
	let r = Vg(e, t, !0), i = e.state.doc;
	return r ? (Pg(e, r, "pointer"), r instanceof U && i.eq(e.state.doc) && (e.input.mouseDown = new Kg(e, r)), !0) : !1;
}
function Vg(e, t, n) {
	let r = e.state.doc;
	if (t == -1) return r.inlineContent ? U.create(r, 0, r.content.size) : null;
	let i = r.resolve(t);
	for (let e = i.depth + 1; e > 0; e--) {
		let t = e > i.depth ? i.nodeAfter : i.node(e), a = i.before(e);
		if (t.inlineContent) return U.create(r, a + 1, a + 1 + t.content.size);
		if (n && W.isSelectable(t)) return W.create(r, a);
	}
	return null;
}
function Hg(e) {
	return $g(e);
}
var Ug = fm ? "metaKey" : "ctrlKey";
bg.mousedown = (e, t) => {
	let n = t;
	e.input.shiftKey = n.shiftKey;
	let r = Hg(e), i = Date.now(), a = "singleClick";
	i - e.input.lastClick.time < 500 && Mg(n, e.input.lastClick) && !n[Ug] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? a = "doubleClick" : e.input.lastClick.type == "doubleClick" && (a = "tripleClick")), e.input.lastClick = {
		time: i,
		x: n.clientX,
		y: n.clientY,
		type: a,
		button: n.button
	}, e.input.mouseDown && e.input.mouseDown.done();
	let o = e.posAtCoords(jg(n));
	o && (a == "singleClick" ? e.input.mouseDown = new Gg(e, o, n, !!r) : (a == "doubleClick" ? Rg : zg)(e, o.pos, o.inside, n) ? n.preventDefault() : Tg(e, "pointer"));
};
var Wg = class {
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
}, Gg = class extends Wg {
	constructor(e, t, n, r) {
		super(e), this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!n[Ug], this.allowDefault = n.shiftKey;
		let i, a;
		if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
		else {
			let n = e.state.doc.resolve(t.pos);
			i = n.parent, a = n.depth ? n.before() : 0;
		}
		let o = r ? null : n.target, s = o ? e.docView.nearestDesc(o, !0) : null;
		this.target = s && s.nodeDOM.nodeType == 1 ? s.nodeDOM : null;
		let { selection: c } = e.state;
		n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof W && c.from <= a && c.to > a) && (this.mightDrag = {
			node: i,
			pos: a,
			addAttr: !!(this.target && !this.target.draggable),
			setUneditable: !!(this.target && om && !this.target.hasAttribute("contentEditable"))
		}), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
			this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
		}, 20), this.view.domObserver.start()), Tg(e, "pointer");
	}
	done() {
		super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
			this.view.isDestroyed || Eh(this.view);
		});
	}
	up(e) {
		if (this.done(), !this.view.dom.contains(e.target)) return;
		let t = this.pos;
		this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(jg(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Tg(this.view, "pointer") : Lg(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || um && this.mightDrag && !this.mightDrag.node.isAtom || cm && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Pg(this.view, H.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : Tg(this.view, "pointer");
	}
	move(e) {
		this.updateAllowDefault(e), Tg(this.view, "pointer"), super.move(e);
	}
	updateAllowDefault(e) {
		!this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
	}
	delaySelUpdate() {
		return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
	}
}, Kg = class extends Wg {
	constructor(e, t) {
		super(e), this.startSelection = t, this.startDoc = e.state.doc;
	}
	move(e) {
		if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
			this.done();
			return;
		}
		e.preventDefault(), Tg(this.view, "pointer");
		let t = this.view.posAtCoords(jg(e)), n = t && Vg(this.view, t.inside, !1);
		if (!n) return;
		let { doc: r } = this.view.state, i = this.startSelection, [a, o] = n.from < i.from ? [i.to, n.from] : [i.from, n.to];
		Pg(this.view, U.create(r, a, o), "pointer");
	}
};
bg.touchstart = (e) => {
	e.input.lastTouch = Date.now(), Hg(e), Tg(e, "pointer");
}, bg.touchmove = (e) => {
	e.input.lastTouch = Date.now(), Tg(e, "pointer");
}, bg.contextmenu = (e) => Hg(e);
function qg(e, t) {
	return e.composing ? !0 : um && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
var Jg = mm ? 5e3 : -1;
xg.compositionstart = xg.compositionupdate = (e) => {
	if (!e.composing) {
		e.domObserver.flush();
		let { state: t } = e, n = t.selection.$to;
		if (t.selection instanceof U && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || cm && pm && Yg(e))) e.markCursor = e.state.storedMarks || n.marks(), $g(e, !0), e.markCursor = null;
		else if ($g(e, !t.selection.empty), om && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
			let t = e.domSelectionRange();
			for (let n = t.focusNode, r = t.focusOffset; n && n.nodeType == 1 && r != 0;) {
				let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
				if (!t) break;
				if (t.nodeType == 3) {
					let n = e.domSelection();
					n && n.collapse(t, t.nodeValue.length);
					break;
				} else n = t, r = -1;
			}
		}
		e.input.composing = !0;
	}
	Xg(e, Jg);
};
function Yg(e) {
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (!t || t.nodeType != 1 || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return r.nodeType == 1 && r.contentEditable == "false";
}
xg.compositionend = (e, t) => {
	e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, Xg(e, 20));
};
function Xg(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => $g(e), t));
}
function Zg(e) {
	for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty();
}
function Qg(e) {
	let t = e.domSelectionRange();
	if (!t.focusNode) return null;
	let n = Wp(t.focusNode, t.focusOffset), r = Gp(t.focusNode, t.focusOffset);
	if (n && r && n != r) {
		let t = r.pmViewDesc, i = e.domObserver.lastChangedTextNode;
		if (n == i || r == i) return i;
		if (!t || !t.isText(r.nodeValue)) return r;
		if (e.input.compositionNode == r) {
			let e = n.pmViewDesc;
			if (!(!e || !e.isText(n.nodeValue))) return r;
		}
	}
	return n || r;
}
function $g(e, t = !1) {
	if (!(mm && e.domObserver.flushingSoon >= 0)) {
		if (e.domObserver.forceFlush(), Zg(e), t || e.docView && e.docView.dirty) {
			let n = wh(e), r = e.state.selection;
			return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0;
		}
		return !1;
	}
}
function e_(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
var t_ = im && am < 15 || dm && gm < 604;
bg.copy = xg.cut = (e, t) => {
	let n = t, r = e.state.selection, i = n.type == "cut";
	if (r.empty) return;
	let a = t_ ? null : n.clipboardData, { dom: o, text: s } = ig(e, r.content());
	a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : e_(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function n_(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function r_(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? i_(e, r.value, null, i, t) : i_(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function i_(e, t, n, r, i) {
	let a = ag(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || V.empty))) return !0;
	if (!a) return !1;
	let o = n_(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function a_(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
xg.paste = (e, t) => {
	let n = t;
	if (e.composing && !mm) return;
	let r = t_ ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
	r && i_(e, a_(r), r.getData("text/html"), i, n) ? n.preventDefault() : r_(e, n);
};
var o_ = class {
	constructor(e, t, n) {
		this.slice = e, this.move = t, this.node = n;
	}
}, s_ = fm ? "altKey" : "ctrlKey";
function c_(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[s_] : !n;
}
bg.dragstart = (e, t) => {
	let n = t, r = e.input.mouseDown;
	if (r && r.done(), !n.dataTransfer) return;
	let i = e.state.selection, a = i.empty ? null : e.posAtCoords(jg(n)), o;
	if (!(a && a.pos >= i.from && a.pos <= (i instanceof W ? i.to - 1 : i.to))) {
		if (r && r.mightDrag) o = W.create(e.state.doc, r.mightDrag.pos);
		else if (n.target && n.target.nodeType == 1) {
			let t = e.docView.nearestDesc(n.target, !0);
			t && t.node.type.spec.draggable && t != e.docView && (o = W.create(e.state.doc, t.posBefore));
		}
	}
	let { dom: s, text: c, slice: l } = ig(e, (o || e.state.selection).content());
	(!n.dataTransfer.files.length || !cm || lm > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(t_ ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", t_ || n.dataTransfer.setData("text/plain", c), e.dragging = new o_(l, c_(e, n), o);
}, bg.dragend = (e) => {
	let t = e.dragging;
	window.setTimeout(() => {
		e.dragging == t && (e.dragging = null);
	}, 50);
}, xg.dragover = xg.dragenter = (e, t) => t.preventDefault(), xg.drop = (e, t) => {
	try {
		l_(e, t, e.dragging);
	} finally {
		e.dragging = null;
	}
};
function l_(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(jg(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = ag(e, a_(t.dataTransfer), t_ ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && c_(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || V.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? tf(e.state.doc, i.pos, a) : i.pos;
	s ??= i.pos;
	let c = e.state.tr;
	if (o) {
		let { node: e } = n;
		e ? e.replace(c) : c.deleteSelection();
	}
	let l = c.mapping.map(s), u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1, d = c.doc;
	if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
	let f = c.doc.resolve(l);
	if (u && W.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new W(f));
	else {
		let t = c.mapping.map(s);
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(Fh(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
bg.focus = (e) => {
	e.input.lastFocus = Date.now(), e.focused || (e.domObserver.stop(), e.dom.classList.add("ProseMirror-focused"), e.domObserver.start(), e.focused = !0, setTimeout(() => {
		e.docView && e.hasFocus() && !e.domObserver.currentSelection.eq(e.domSelectionRange()) && Eh(e);
	}, 20));
}, bg.blur = (e, t) => {
	let n = t;
	e.focused &&= (e.domObserver.stop(), e.dom.classList.remove("ProseMirror-focused"), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1);
}, bg.beforeinput = (e, t) => {
	if (cm && mm && t.inputType == "deleteContentBackward") {
		e.domObserver.flushSoon();
		let { domChangeCount: t } = e.input;
		setTimeout(() => {
			if (e.input.domChangeCount != t || (e.dom.blur(), e.focus(), e.someProp("handleKeyDown", (t) => t(e, Yp(8, "Backspace"))))) return;
			let { $cursor: n } = e.state.selection;
			n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
		}, 50);
	}
};
for (let e in xg) bg[e] = xg[e];
function u_(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
var d_ = class e {
	constructor(e, t) {
		this.toDOM = e, this.spec = t || g_, this.side = this.spec.side || 0;
	}
	map(e, t, n, r) {
		let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
		return a ? null : new m_(i - n, i - n, this);
	}
	valid() {
		return !0;
	}
	eq(t) {
		return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && u_(this.spec, t.spec));
	}
	destroy(e) {
		this.spec.destroy && this.spec.destroy(e);
	}
}, f_ = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || g_;
	}
	map(e, t, n, r) {
		let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
		return i >= a ? null : new m_(i, a, this);
	}
	valid(e, t) {
		return t.from < t.to;
	}
	eq(t) {
		return this == t || t instanceof e && u_(this.attrs, t.attrs) && u_(this.spec, t.spec);
	}
	static is(t) {
		return t.type instanceof e;
	}
	destroy() {}
}, p_ = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || g_;
	}
	map(e, t, n, r) {
		let i = e.mapResult(t.from + r, 1);
		if (i.deleted) return null;
		let a = e.mapResult(t.to + r, -1);
		return a.deleted || a.pos <= i.pos ? null : new m_(i.pos - n, a.pos - n, this);
	}
	valid(e, t) {
		let { index: n, offset: r } = e.content.findIndex(t.from), i;
		return r == t.from && !(i = e.child(n)).isText && r + i.nodeSize == t.to;
	}
	eq(t) {
		return this == t || t instanceof e && u_(this.attrs, t.attrs) && u_(this.spec, t.spec);
	}
	destroy() {}
}, m_ = class e {
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
		return new e(t, t, new d_(n, r));
	}
	static inline(t, n, r, i) {
		return new e(t, n, new f_(r, i));
	}
	static node(t, n, r, i) {
		return new e(t, n, new p_(r, i));
	}
	get spec() {
		return this.type.spec;
	}
	get inline() {
		return this.type instanceof f_;
	}
	get widget() {
		return this.type instanceof d_;
	}
}, h_ = [], g_ = {}, __ = class e {
	constructor(e, t) {
		this.local = e.length ? e : h_, this.children = t.length ? t : h_;
	}
	static create(e, t) {
		return t.length ? T_(t, e, 0, g_) : v_;
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
		return this == v_ || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || g_);
	}
	mapInner(t, n, r, i, a) {
		let o;
		for (let e = 0; e < this.local.length; e++) {
			let s = this.local[e].map(t, r, i);
			s && s.type.valid(n, s) ? (o ||= []).push(s) : a.onRemove && a.onRemove(this.local[e].spec);
		}
		return this.children.length ? b_(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(E_), h_) : v_;
	}
	add(t, n) {
		return n.length ? this == v_ ? e.create(t, n) : this.addInner(t, n, 0) : this;
	}
	addInner(t, n, r) {
		let i, a = 0;
		t.forEach((e, t) => {
			let o = t + r, s;
			if (s = C_(n, e, o)) {
				for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
				i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, T_(s, e, o + 1, g_)), a += 3;
			}
		});
		let o = x_(a ? w_(n) : n, -r);
		for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || o.splice(e--, 1);
		return new e(o.length ? this.local.concat(o).sort(E_) : this.local, i || this.children);
	}
	remove(e) {
		return e.length == 0 || this == v_ ? this : this.removeInner(e, 0);
	}
	removeInner(t, n) {
		let r = this.children, i = this.local;
		for (let e = 0; e < r.length; e += 3) {
			let i, a = r[e] + n, o = r[e + 1] + n;
			for (let e = 0, n; e < t.length; e++) (n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
			if (!i) continue;
			r == this.children && (r = this.children.slice());
			let s = r[e + 2].removeInner(i, a + 1);
			s == v_ ? (r.splice(e, 3), e -= 3) : r[e + 2] = s;
		}
		if (i.length) {
			for (let e = 0, r; e < t.length; e++) if (r = t[e]) for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
		}
		return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : v_;
	}
	forChild(t, n) {
		if (this == v_) return this;
		if (n.isLeaf) return e.empty;
		let r, i;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] >= t) {
			this.children[e] == t && (r = this.children[e + 2]);
			break;
		}
		let a = t + 1, o = a + n.content.size;
		for (let e = 0; e < this.local.length; e++) {
			let t = this.local[e];
			if (t.from < o && t.to > a && t.type instanceof f_) {
				let e = Math.max(a, t.from) - a, n = Math.min(o, t.to) - a;
				e < n && (i ||= []).push(t.copy(e, n));
			}
		}
		if (i) {
			let t = new e(i.sort(E_), h_);
			return r ? new y_([t, r]) : t;
		}
		return r || v_;
	}
	eq(t) {
		if (this == t) return !0;
		if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
		for (let e = 0; e < this.local.length; e++) if (!this.local[e].eq(t.local[e])) return !1;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
		return !0;
	}
	locals(e) {
		return D_(this.localsInner(e));
	}
	localsInner(e) {
		if (this == v_) return h_;
		if (e.inlineContent || !this.local.some(f_.is)) return this.local;
		let t = [];
		for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof f_ || t.push(this.local[e]);
		return t;
	}
	forEachSet(e) {
		e(this);
	}
};
__.empty = new __([], []), __.removeOverlap = D_;
var v_ = __.empty, y_ = class e {
	constructor(e) {
		this.members = e;
	}
	map(t, n) {
		let r = this.members.map((e) => e.map(t, n, g_));
		return e.from(r);
	}
	forChild(t, n) {
		if (n.isLeaf) return __.empty;
		let r = [];
		for (let i = 0; i < this.members.length; i++) {
			let a = this.members[i].forChild(t, n);
			a != v_ && (a instanceof e ? r = r.concat(a.members) : r.push(a));
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
			if (i.length) if (!t) t = i;
			else {
				n &&= (t = t.slice(), !1);
				for (let e = 0; e < i.length; e++) t.push(i[e]);
			}
		}
		return t ? D_(n ? t : t.sort(E_)) : h_;
	}
	static from(t) {
		switch (t.length) {
			case 0: return v_;
			case 1: return t[0];
			default: return new e(t.every((e) => e instanceof __) ? t : t.reduce((e, t) => e.concat(t instanceof __ ? t : t.members), []));
		}
	}
	forEachSet(e) {
		for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
	}
};
function b_(e, t, n, r, i, a, o) {
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
			r == v_ ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r);
		} else c = !0;
	}
	if (c) {
		let c = T_(S_(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new __(t.sort(E_), s);
}
function x_(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new m_(i.from + t, i.to + t, i.type));
	}
	return n;
}
function S_(e, t, n, r, i, a, o) {
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
function C_(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function w_(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function T_(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = C_(e, t, o + n);
		if (s) {
			a = !0;
			let e = T_(s, t, n + o + 1, r);
			e != v_ && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = x_(a ? w_(e) : e, -n).sort(E_);
	for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || (r.onRemove && r.onRemove(o[e].spec), o.splice(e--, 1));
	return o.length || i.length ? new __(o, i) : v_;
}
function E_(e, t) {
	return e.from - t.from || e.to - t.to;
}
function D_(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) {
				a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), O_(t, i + 1, a.copy(r.to, a.to)));
				continue;
			} else {
				a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), O_(t, i, r.copy(a.from, r.to)));
				break;
			}
		}
	}
	return t;
}
function O_(e, t, n) {
	for (; t < e.length && E_(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function k_(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != v_ && t.push(r);
	}), e.cursorWrapper && t.push(__.create(e.state.doc, [e.cursorWrapper.deco])), y_.from(t);
}
var A_ = {
	childList: !0,
	characterData: !0,
	characterDataOldValue: !0,
	attributes: !0,
	attributeOldValue: !0,
	subtree: !0
}, j_ = im && am <= 11, M_ = class {
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
}, N_ = class {
	constructor(e, t) {
		this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new M_(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((t) => {
			for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
			im && am <= 11 && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : um && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
		}), j_ && (this.onCharData = (e) => {
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
		this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, A_)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
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
		if (Ih(this.view)) {
			if (this.suppressingSelectionUpdates) return Eh(this.view);
			if (im && am <= 11 && !this.view.state.selection.empty) {
				let e = this.view.domSelectionRange();
				if (e.focusNode && Bp(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon();
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
		for (let n = e.focusNode; n; n = Ip(n)) t.add(n);
		for (let r = e.anchorNode; r; r = Ip(r)) if (t.has(r)) {
			n = r;
			break;
		}
		let r = n && this.view.docView.nearestDesc(n);
		if (r && r.ignoreMutation({
			type: "selection",
			target: n.nodeType == 3 ? n.parentNode : n
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
		let n = e.domSelectionRange(), r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && Ih(e) && !this.ignoreSelectionChange(n), i = -1, a = -1, o = !1, s = [];
		if (e.editable) for (let e = 0; e < t.length; e++) {
			let n = this.registerMutation(t[e], s);
			n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0));
		}
		if (s.some((e) => e.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || cm && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some((e) => e.type == "childList" && e.removedNodes.length))) {
			for (let e of s) if (e.nodeName == "BR" && e.parentNode) {
				let t = e.nextSibling;
				for (; t && t.nodeType == 1;) {
					if (t.contentEditable == "false") {
						e.parentNode.removeChild(e);
						break;
					}
					t = t.firstChild;
				}
			}
		} else if (om && s.length) {
			let t = s.filter((e) => e.nodeName == "BR");
			if (t.length == 2) {
				let [e, n] = t;
				e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove();
			} else {
				let { focusNode: n } = this.currentSelection;
				for (let r of t) {
					let t = r.parentNode;
					t && t.nodeName == "LI" && (!n || z_(e, n) != t) && r.remove();
				}
			}
		}
		let c = null;
		i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Jp(n) && (c = wh(e)) && c.eq(H.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Eh(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), I_(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, B_(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || Eh(e), this.currentSelection.set(n));
	}
	registerMutation(e, t) {
		if (t.indexOf(e.target) > -1) return null;
		let n = this.view.docView.nearestDesc(e.target);
		if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e)) return null;
		if (e.type == "childList") {
			for (let n = 0; n < e.addedNodes.length; n++) {
				let r = e.addedNodes[n];
				t.push(r), r.nodeType == 3 && (this.lastChangedTextNode = r);
			}
			if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return {
				from: n.posBefore,
				to: n.posAfter
			};
			let r = e.previousSibling, i = e.nextSibling;
			if (im && am <= 11 && e.addedNodes.length) for (let t = 0; t < e.addedNodes.length; t++) {
				let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
				(!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a);
			}
			let a = r && r.parentNode == e.target ? Fp(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? Fp(i) : e.target.childNodes.length;
			return {
				from: o,
				to: n.localPosFromDOM(e.target, s, 1)
			};
		} else if (e.type == "attributes") return {
			from: n.posAtStart - n.border,
			to: n.posAtEnd + n.border
		};
		else return this.lastChangedTextNode = e.target, {
			from: n.posAtStart,
			to: n.posAtEnd,
			typeOver: e.target.nodeValue == e.oldValue
		};
	}
}, P_ = /* @__PURE__ */ new WeakMap(), F_ = !1;
function I_(e) {
	if (!P_.has(e) && (P_.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = om, F_) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), F_ = !0;
	}
}
function L_(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return Bp(o.node, o.offset, i, a) && ([n, r, i, a] = [
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
function R_(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return L_(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? L_(e, n) : null;
}
function z_(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function B_(e, t) {
	let { focusNode: n, focusOffset: r } = e.domSelectionRange();
	for (let i of t) if (i.parentNode?.nodeName == "TR") {
		let t = i.nextSibling;
		for (; t && t.nodeName != "TD" && t.nodeName != "TH";) t = t.nextSibling;
		if (t) {
			let a = t;
			for (;;) {
				let e = a.firstChild;
				if (!e || e.nodeType != 1 || e.contentEditable == "false" || /^(BR|IMG)$/.test(e.nodeName)) break;
				a = e;
			}
			a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r);
		} else i.parentNode.removeChild(i);
	}
}
function V_(e, t, n) {
	let { node: r, fromOffset: i, toOffset: a, from: o, to: s } = e.docView.parseRange(t, n), c = e.domSelectionRange(), l, u = c.anchorNode;
	if (u && e.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (l = [{
		node: u,
		offset: c.anchorOffset
	}], Jp(c) || l.push({
		node: c.focusNode,
		offset: c.focusOffset
	})), cm && e.input.lastKeyCode === 8) for (let e = a; e > i; e--) {
		let t = r.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			a = e;
			break;
		}
		if (!n || n.size) break;
	}
	let d = e.state.doc, f = e.someProp("domParser") || Vu.fromSchema(e.state.schema), p = d.resolve(o), m = null, h = f.parse(r, {
		topNode: p.parent,
		topMatch: p.parent.contentMatchAt(p.index()),
		topOpen: !0,
		from: i,
		to: a,
		preserveWhitespace: p.parent.type.whitespace != "pre" || "full",
		findPositions: l,
		ruleFromNode: H_,
		context: p
	});
	if (l && l[0].pos != null) {
		let e = l[0].pos, t = l[1] && l[1].pos;
		t ??= e, m = {
			anchor: e + o,
			head: t + o
		};
	}
	return {
		doc: h,
		sel: m,
		from: o,
		to: s
	};
}
function H_(e) {
	let t = e.pmViewDesc;
	if (t) return t.parseRule();
	if (e.nodeName == "BR" && e.parentNode) {
		if (um && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
			let e = document.createElement("div");
			return e.appendChild(document.createElement("li")), { skip: e };
		} else if (e.parentNode.lastChild == e || um && /^(tr|table)$/i.test(e.parentNode.nodeName)) return { ignore: !0 };
	} else if (e.nodeName == "IMG" && e.getAttribute("mark-placeholder")) return { ignore: !0 };
	return null;
}
var U_ = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function W_(e, t, n, r, i) {
	let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = wh(e, t);
		if (n && !e.state.selection.eq(n)) {
			if (cm && mm && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && e.someProp("handleKeyDown", (t) => t(e, Yp(13, "Enter")))) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), a && r.setMeta("composition", a), e.dispatch(r);
		}
		return;
	}
	let o = e.state.doc.resolve(t), s = o.sharedDepth(n);
	t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
	let c = e.state.selection, l = V_(e, t, n), u = e.state.doc, d = u.slice(l.from, l.to), f, p;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = "end") : (f = e.state.selection.from, p = "start"), e.input.lastKeyCode = null;
	let m = Y_(d.content, l.doc.content, l.from, f, p);
	if (m && e.input.domChangeCount++, (dm && e.input.lastIOSEnter > Date.now() - 225 || mm) && i.some((e) => e.nodeType == 1 && !U_.test(e.nodeName)) && (!m || m.endA >= m.endB) && e.someProp("handleKeyDown", (t) => t(e, Yp(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!m) if (r && c instanceof U && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
		start: c.from,
		endA: c.to,
		endB: c.to
	};
	else {
		if (l.sel) {
			let t = G_(e, e.state.doc, l.sel);
			if (t && !t.eq(e.state.selection)) {
				let n = e.state.tr.setSelection(t);
				a && n.setMeta("composition", a), e.dispatch(n);
			}
		}
		return;
	}
	e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof U && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), im && am <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == " \xA0" && (m.start--, m.endA--, m.endB--);
	let h = l.doc.resolveNoCache(m.start - l.from), g = l.doc.resolveNoCache(m.endB - l.from), _ = u.resolve(m.start), v = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
	if ((dm && e.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !v && h.pos < l.doc.content.size && (!h.sameParent(g) || !h.parent.inlineContent) && h.pos < g.pos && !/\S/.test(l.doc.textBetween(h.pos, g.pos, "", ""))) && e.someProp("handleKeyDown", (t) => t(e, Yp(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > m.start && q_(u, m.start, m.endA, h, g) && e.someProp("handleKeyDown", (t) => t(e, Yp(8, "Backspace")))) {
		mm && cm && e.domObserver.suppressSelectionUpdates();
		return;
	}
	cm && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), mm && !v && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => {
		e.someProp("handleKeyDown", function(t) {
			return t(e, Yp(13, "Enter"));
		});
	}, 20));
	let y = m.start, b = m.endA, x = (t) => {
		let n = t || e.state.tr.replace(y, b, l.doc.slice(m.start - l.from, m.endB - l.from));
		if (l.sel) {
			let t = G_(e, n.doc, l.sel);
			t && !(cm && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == y || t.head == n.mapping.map(b) - 1) || im && t.empty && t.head == y) && n.setSelection(t);
		}
		return a && n.setMeta("composition", a), n.scrollIntoView();
	}, S;
	if (v) if (h.pos == g.pos) {
		im && am <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Eh(e), 20));
		let t = x(e.state.tr.delete(y, b)), n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
		n && t.ensureMarks(n), e.dispatch(t);
	} else if (m.endA == m.endB && (S = K_(h.parent.content.cut(h.parentOffset, g.parentOffset), _.parent.content.cut(_.parentOffset, m.endA - _.start())))) {
		let t = x(e.state.tr);
		S.type == "add" ? t.addMark(y, b, S.mark) : t.removeMark(y, b, S.mark), e.dispatch(t);
	} else if (h.parent.child(h.index()).isText && h.index() == g.index() - +!g.textOffset) {
		let t = h.parent.textBetween(h.parentOffset, g.parentOffset), n = () => x(e.state.tr.insertText(t, y, b));
		e.someProp("handleTextInput", (r) => r(e, y, b, t, n)) || e.dispatch(n());
	} else e.dispatch(x());
	else e.dispatch(x());
}
function G_(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : Fh(e, t.resolve(n.anchor), t.resolve(n.head));
}
function K_(e, t) {
	let n = e.firstChild.marks, r = t.firstChild.marks, i = n, a = r, o, s, c;
	for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
	for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
	if (i.length == 1 && a.length == 0) s = i[0], o = "add", c = (e) => e.mark(s.addToSet(e.marks));
	else if (i.length == 0 && a.length == 1) s = a[0], o = "remove", c = (e) => e.mark(s.removeFromSet(e.marks));
	else return null;
	let l = [];
	for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
	if (z.from(l).eq(e)) return {
		mark: s,
		type: o
	};
}
function q_(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || J_(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.isTextblock) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(J_(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || J_(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function J_(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function Y_(e, t, n, r, i) {
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
var X_ = class {
	constructor(e, t) {
		this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Cg(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(rv), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = $_(this), Q_(this), this.nodeViews = tv(this), this.docView = ih(this.state.doc, Z_(this), k_(this), this.dom, this), this.domObserver = new N_(this, (e, t, n, r) => W_(this, e, t, n, r)), this.domObserver.start(), wg(this), this.updatePluginViews();
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
		e.handleDOMEvents != this._props.handleDOMEvents && Dg(this);
		let t = this._props;
		this._props = e, e.plugins && (e.plugins.forEach(rv), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
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
		e.storedMarks && this.composing && (Zg(this), i = !0), this.state = e;
		let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
		if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
			let e = tv(this);
			nv(e, this.nodeViews) && (this.nodeViews = e, r = !0);
		}
		(a || t.handleDOMEvents != this._props.handleDOMEvents) && Dg(this), this.editable = $_(this), Q_(this);
		let o = k_(this), s = Z_(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
		(l || !e.selection.eq(n.selection)) && (i = !0);
		let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && xm(this);
		if (i) {
			this.domObserver.stop();
			let t = l && (im || cm) && !this.composing && !n.selection.empty && !e.selection.empty && ev(n.selection, e.selection);
			if (l) {
				let n = cm ? this.trackWrites = this.domSelectionRange().focusNode : null;
				this.composing && (this.input.compositionNode = Qg(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = ih(e.doc, s, o, this.dom, this)), n && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (t = !0);
			}
			let i = this.input.mouseDown;
			t || !(i && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Rh(this) && i.delaySelUpdate()) ? Eh(this, t) : (Nh(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
		}
		this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && Cm(u);
	}
	scrollToSelection() {
		let e = this.domSelectionRange().focusNode;
		if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode)) && !this.someProp("handleScrollToSelection", (e) => e(this))) if (this.state.selection instanceof W) {
			let t = this.docView.domAfterPos(this.state.selection.from);
			t.nodeType == 1 && bm(this, t.getBoundingClientRect(), e);
		} else bm(this, this.coordsAtPos(this.state.selection.head, 1), e);
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
		this.dragging = new o_(e.slice, e.move, r < 0 ? void 0 : W.create(this.state.doc, r));
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
		if (im) {
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
		this.domObserver.stop(), this.editable && Em(this.dom), Eh(this), this.domObserver.start();
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
		return Pm(this, e);
	}
	coordsAtPos(e, t = 1) {
		return Rm(this, e, t);
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
		return Jm(this, t || this.state, e);
	}
	pasteHTML(e, t) {
		return i_(this, "", e, !1, t || new ClipboardEvent("paste"));
	}
	pasteText(e, t) {
		return i_(this, e, null, !0, t || new ClipboardEvent("paste"));
	}
	serializeForClipboard(e) {
		return ig(this, e);
	}
	destroy() {
		this.docView && (Eg(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], k_(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, zp());
	}
	get isDestroyed() {
		return this.docView == null;
	}
	dispatchEvent(e) {
		return Ag(this, e);
	}
	domSelectionRange() {
		let e = this.domSelection();
		return e ? um && this.root.nodeType === 11 && Xp(this.dom.ownerDocument) == this.dom && R_(this, e) || e : {
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
X_.prototype.dispatch = function(e) {
	let t = this._props.dispatchTransaction;
	t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function Z_(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [m_.node(0, e.state.doc.content.size, t)];
}
function Q_(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: m_.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function $_(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function ev(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function tv(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function nv(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function rv(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
for (var iv = {
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
}, av = {
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
}, ov = typeof navigator < "u" && /Mac/.test(navigator.platform), sv = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), cv = 0; cv < 10; cv++) iv[48 + cv] = iv[96 + cv] = String(cv);
for (var cv = 1; cv <= 24; cv++) iv[cv + 111] = "F" + cv;
for (var cv = 65; cv <= 90; cv++) iv[cv] = String.fromCharCode(cv + 32), av[cv] = String.fromCharCode(cv);
for (var lv in iv) av.hasOwnProperty(lv) || (av[lv] = iv[lv]);
function uv(e) {
	var t = !(ov && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || sv && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? av : iv)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
//#endregion
//#region node_modules/prosemirror-keymap/dist/index.js
var dv = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), fv = typeof navigator < "u" && /Win/.test(navigator.platform);
function pv(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) dv ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function mv(e) {
	let t = Object.create(null);
	for (let n in e) t[pv(n)] = e[n];
	return t;
}
function hv(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function gv(e) {
	return new G({ props: { handleKeyDown: _v(e) } });
}
function _v(e) {
	let t = mv(e);
	return function(e, n) {
		let r = uv(n), i, a = t[hv(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[hv(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(fv && n.ctrlKey && n.altKey) && (i = iv[n.keyCode]) && i != r) {
				let r = t[hv(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
//#endregion
//#region node_modules/@tiptap/core/dist/index.js
var vv = Object.defineProperty, yv = (e, t) => {
	for (var n in t) vv(e, n, {
		get: t[n],
		enumerable: !0
	});
};
function bv(e) {
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
var xv = class {
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
	buildProps(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = {
			tr: e,
			editor: r,
			view: a,
			state: bv({
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
}, Sv = {};
yv(Sv, {
	blur: () => Cv,
	clearContent: () => wv,
	clearNodes: () => Tv,
	command: () => Ev,
	createParagraphNear: () => Dv,
	cut: () => Ov,
	deleteCurrentNode: () => kv,
	deleteNode: () => jv,
	deleteRange: () => Mv,
	deleteSelection: () => Iv,
	enter: () => Lv,
	exitCode: () => Rv,
	extendMarkRange: () => Gv,
	first: () => Kv,
	focus: () => $v,
	forEach: () => ey,
	insertContent: () => ty,
	insertContentAt: () => sy,
	joinBackward: () => uy,
	joinDown: () => ly,
	joinForward: () => dy,
	joinItemBackward: () => fy,
	joinItemForward: () => py,
	joinTextblockBackward: () => my,
	joinTextblockForward: () => hy,
	joinUp: () => cy,
	keyboardShortcut: () => vy,
	lift: () => by,
	liftEmptyBlock: () => xy,
	liftListItem: () => Sy,
	newlineInCode: () => Cy,
	resetAttributes: () => Ey,
	scrollIntoView: () => Dy,
	selectAll: () => Oy,
	selectNodeBackward: () => ky,
	selectNodeForward: () => Ay,
	selectParentNode: () => jy,
	selectTextblockEnd: () => My,
	selectTextblockStart: () => Ny,
	setContent: () => Fy,
	setMark: () => Ab,
	setMeta: () => jb,
	setNode: () => Mb,
	setNodeSelection: () => Nb,
	setTextDirection: () => Pb,
	setTextSelection: () => Fb,
	sinkListItem: () => Ib,
	splitBlock: () => Rb,
	splitListItem: () => zb,
	toggleList: () => Gb,
	toggleMark: () => Kb,
	toggleNode: () => qb,
	toggleWrap: () => Jb,
	undoInputRule: () => Yb,
	unsetAllMarks: () => Xb,
	unsetMark: () => Zb,
	unsetTextDirection: () => Qb,
	updateAttributes: () => $b,
	wrapIn: () => ex,
	wrapInList: () => tx
});
var Cv = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
	var n;
	e.isDestroyed || (t.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), wv = (e = !0) => ({ commands: t }) => t.setContent("", { emitUpdate: e }), Tv = () => ({ state: e, tr: t, dispatch: n }) => {
	let { selection: r } = t, { ranges: i } = r;
	return n && i.forEach(({ $from: n, $to: r }) => {
		e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
			if (e.type.isText) return;
			let { doc: r, mapping: i } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
			if (!s) return;
			let c = Fd(s);
			if (e.type.isTextblock) {
				let { defaultType: e } = a.parent.contentMatchAt(a.index());
				t.setNodeMarkup(s.start, e);
			}
			(c || c === 0) && t.lift(s, c);
		});
	}), !0;
}, Ev = (e) => (t) => e(t), Dv = () => ({ state: e, dispatch: t }) => up(e, t), Ov = (e, t) => ({ editor: n, tr: r }) => {
	let { state: i } = n, a = i.doc.slice(e.from, e.to);
	r.deleteRange(e.from, e.to);
	let o = r.mapping.map(t);
	return r.insert(o, a.content), r.setSelection(new U(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, kv = () => ({ tr: e, dispatch: t }) => {
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
function Av(e, t) {
	if (typeof e == "string") {
		if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
		return t.nodes[e];
	}
	return e;
}
var jv = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let i = Av(e, n.schema), a = t.selection.$anchor;
	for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
		if (r) {
			let n = a.before(e), r = a.after(e);
			t.delete(n, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, Mv = (e) => ({ tr: t, dispatch: n }) => {
	let { from: r, to: i } = e;
	return n && t.delete(r, i), !0;
}, Nv = (e) => e.content ? /^text(\*|\+)/.test(e.content) : !1, Pv = (e, t, n) => {
	if (!e.parent.isInline || n === "left" && e.pos > e.start() || n === "right" && e.pos < e.end()) return e.pos;
	let r = t.nodes[e.parent.type.name].spec;
	return Nv(r) ? n === "left" ? e.start() - 1 : e.end() + 1 : e.pos;
}, Fv = (e, t, n) => ({
	from: Pv(e, n, "left"),
	to: Pv(t, n, "right")
}), Iv = () => ({ state: e, dispatch: t }) => {
	if (e.selection.empty) return !1;
	if (t) {
		let n = e.tr, { ranges: r } = e.selection, i = n.steps.length;
		r.forEach((t) => {
			let r = n.mapping.slice(i), { from: a, to: o } = Fv(n.doc.resolve(r.map(t.$from.pos)), n.doc.resolve(r.map(t.$to.pos)), e.schema);
			n.deleteRange(a, o);
		}), n.scrollIntoView(), t(n);
	}
	return !0;
}, Lv = () => ({ commands: e }) => e.keyboardShortcut("Enter"), Rv = () => ({ state: e, dispatch: t }) => lp(e, t);
function zv(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function Bv(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return !r.length || r.every((r) => n.strict ? t[r] === e[r] : zv(t[r]) ? t[r].test(e[r]) : t[r] === e[r]);
}
function Vv(e, t, n = {}) {
	return e.find((e) => e.type === t && Bv(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function Hv(e, t, n = {}) {
	return !!Vv(e, t, n);
}
function Uv(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if ((!r.node || !r.node.marks.some((e) => e.type === t)) && (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t)) return;
	if (!n) {
		let e = r.node.marks.find((e) => e.type === t);
		e && (n = e.attrs);
	}
	if (!Vv([...r.node.marks], t, n)) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && Hv([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && Hv([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function Wv(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
var Gv = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = Wv(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
	if (i) {
		let e = Uv(c, a, t);
		if (e && e.from <= l && e.to >= u) {
			let t = U.create(o, e.from, e.to);
			n.setSelection(t);
		}
	}
	return !0;
}, Kv = (e) => (t) => {
	let n = typeof e == "function" ? e(t) : e;
	for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
	return !1;
};
function qv(e) {
	return e instanceof U;
}
function Jv(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function Yv(e, t = null) {
	if (!t) return null;
	let n = H.atStart(e), r = H.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? U.create(e, Jv(0, i, a), Jv(e.content.size, i, a)) : U.create(e, Jv(t, i, a), Jv(t, i, a));
}
function Xv() {
	return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Zv() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Qv() {
	return typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
var $v = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
	t = {
		scrollIntoView: !0,
		...t
	};
	let o = () => {
		(Zv() || Xv()) && r.dom.focus(), Qv() && !Zv() && !Xv() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
			n.isDestroyed || (r.focus(), t?.scrollIntoView && n.commands.scrollIntoView());
		});
	};
	try {
		if (r.hasFocus() && e === null || e === !1) return !0;
	} catch {
		return !1;
	}
	if (a && e === null && !qv(n.state.selection)) return o(), !0;
	let s = Yv(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
	return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, ey = (e, t) => (n) => e.every((e, r) => t(e, {
	...n,
	index: r
})), ty = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
	from: n.selection.from,
	to: n.selection.to
}, e, t), ny = (e) => {
	let t = e.childNodes;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && ny(r);
	}
	return e;
};
function ry(e) {
	if (typeof window > "u") throw Error("[tiptap error]: there is no window object available, so this function cannot be used");
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return ny(n);
}
function iy(e, t, n) {
	if (e instanceof fu || e instanceof z) return e;
	n = {
		slice: !0,
		parseOptions: {},
		...n
	};
	let r = typeof e == "object" && !!e, i = typeof e == "string";
	if (r) try {
		if (Array.isArray(e) && e.length > 0) return z.fromArray(e.map((e) => t.nodeFromJSON(e)));
		let r = t.nodeFromJSON(e);
		return n.errorOnInvalidContent && r.check(), r;
	} catch (r) {
		if (n.errorOnInvalidContent) throw Error("[tiptap error]: Invalid JSON content", { cause: r });
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), iy("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new Lu({
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
			if (n.slice ? Vu.fromSchema(a).parseSlice(ry(e), n.parseOptions) : Vu.fromSchema(a).parse(ry(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = Vu.fromSchema(t);
		return n.slice ? r.parseSlice(ry(e), n.parseOptions).content : r.parse(ry(e), n.parseOptions);
	}
	return iy("", t, n);
}
function ay(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Od || i instanceof kd)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(H.near(e.doc.resolve(o), n));
}
var oy = (e) => !("type" in e), sy = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
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
			iy(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: !0
			});
		} catch (e) {
			o(e);
		}
		try {
			i = iy(t, a.schema, {
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
		}, u = !0, d = !0;
		if ((oy(i) ? i : [i]).forEach((e) => {
			e.check(), u = u ? e.isText && e.marks.length === 0 : !1, d = d ? e.isBlock : !1;
		}), c === l && d) {
			let { parent: e } = r.doc.resolve(c);
			e.isTextblock && !e.type.spec.code && !e.childCount && (--c, l += 1);
		}
		let f;
		if (u) {
			if (Array.isArray(t)) f = t.map((e) => e.text || "").join("");
			else if (t instanceof z) {
				let e = "";
				t.forEach((t) => {
					t.text && (e += t.text);
				}), f = e;
			} else f = typeof t == "object" && t && t.text ? t.text : t;
			r.insertText(f, c, l);
		} else {
			f = i;
			let e = r.doc.resolve(c), t = e.node(), n = e.parentOffset === 0, a = t.isText || t.isTextblock, o = t.content.size > 0;
			n && a && o && d && (c = Math.max(0, c - 1)), r.replaceWith(c, l, f);
		}
		n.updateSelection && ay(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
			from: c,
			text: f
		}), n.applyPasteRules && r.setMeta("applyPasteRules", {
			from: c,
			text: f
		});
	}
	return !0;
}, cy = () => ({ state: e, dispatch: t }) => ip(e, t), ly = () => ({ state: e, dispatch: t }) => ap(e, t), uy = () => ({ state: e, dispatch: t }) => qf(e, t), dy = () => ({ state: e, dispatch: t }) => tp(e, t), fy = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = Qd(e.doc, e.selection.$from.pos, -1);
		return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, py = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = Qd(e.doc, e.selection.$from.pos, 1);
		return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, my = () => ({ state: e, dispatch: t }) => Jf(e, t), hy = () => ({ state: e, dispatch: t }) => Yf(e, t);
function gy() {
	return typeof navigator < "u" && /Mac/.test(navigator.platform);
}
function _y(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) Zv() || gy() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
var vy = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
	let a = _y(e).split(/-(?!$)/), o = a.find((e) => ![
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
function yy(e, t, n = {}) {
	let { from: r, to: i, empty: a } = e.selection, o = t ? Av(t, e.schema) : null, s = [];
	e.doc.nodesBetween(r, i, (e, t) => {
		if (e.isText) return;
		let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize);
		s.push({
			node: e,
			from: n,
			to: a
		});
	});
	let c = i - r, l = s.filter((e) => !o || o.name === e.node.type.name).filter((e) => Bv(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
var by = (e, t = {}) => ({ state: n, dispatch: r }) => yy(n, Av(e, n.schema), t) ? op(n, r) : !1, xy = () => ({ state: e, dispatch: t }) => dp(e, t), Sy = (e) => ({ state: t, dispatch: n }) => jp(Av(e, t.schema))(t, n), Cy = () => ({ state: e, dispatch: t }) => sp(e, t);
function wy(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function Ty(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
var Ey = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = wy(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = Av(e, r.schema)), s === "mark" && (o = Wv(e, r.schema));
	let c = !1;
	return n.selection.ranges.forEach((e) => {
		r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
			a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, Ty(e.attrs, t))), o && e.marks.length && e.marks.forEach((a) => {
				o === a.type && (c = !0, i && n.addMark(r, r + e.nodeSize, o.create(Ty(a.attrs, t))));
			});
		});
	}), c;
}, Dy = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), Oy = () => ({ tr: e, dispatch: t }) => {
	if (t) {
		let t = new Of(e.doc);
		e.setSelection(t);
	}
	return !0;
}, ky = () => ({ state: e, dispatch: t }) => Qf(e, t), Ay = () => ({ state: e, dispatch: t }) => np(e, t), jy = () => ({ state: e, dispatch: t }) => mp(e, t), My = () => ({ state: e, dispatch: t }) => bp(e, t), Ny = () => ({ state: e, dispatch: t }) => yp(e, t);
function Py(e, t, n = {}, r = {}) {
	return iy(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
var Fy = (e, { errorOnInvalidContent: t, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
	let { doc: c } = a;
	if (r.preserveWhitespace !== "full") {
		let s = Py(e, i.schema, r, { errorOnInvalidContent: t ?? i.options.enableContentCheck });
		return o && a.replaceWith(0, c.content.size, s).setMeta("preventUpdate", !n), !0;
	}
	return o && a.setMeta("preventUpdate", !n), s.insertContentAt({
		from: 0,
		to: c.content.size
	}, e, {
		parseOptions: r,
		errorOnInvalidContent: t ?? i.options.enableContentCheck
	});
};
function Iy(e, t) {
	let n = Wv(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function Ly(e, t) {
	let n = new xf(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function Ry(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
function zy(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function By(e, t) {
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
function Vy(e) {
	return (t) => By(t.$from, e);
}
function K(e, t, n) {
	return e.config[t] === void 0 && e.parent ? K(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
		...n,
		parent: e.parent ? K(e.parent, t, n) : null
	}) : e.config[t];
}
function Hy(e) {
	return e.map((e) => {
		let t = K(e, "addExtensions", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		return t ? [e, ...Hy(t())] : e;
	}).flat(10);
}
function Uy(e, t) {
	let n = td.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
function Wy(e) {
	return typeof e == "function";
}
function q(e, t = void 0, ...n) {
	return Wy(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function Gy(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function Ky(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function qy(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = Ky(e), i = [...n, ...r], a = {
		default: null,
		validate: void 0,
		rendered: !0,
		renderHTML: null,
		parseHTML: null,
		keepOnSplit: !0,
		isRequired: !1
	}, o = n.filter((e) => e.name !== "text").map((e) => e.name), s = r.map((e) => e.name), c = [...o, ...s];
	return e.forEach((e) => {
		let n = K(e, "addGlobalAttributes", {
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
		let n = K(e, "addAttributes", {
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
function Jy(e) {
	let t = [], n = "", r = !1, i = !1, a = 0, o = e.length;
	for (let s = 0; s < o; s += 1) {
		let o = e[s];
		if (o === "'" && !i) {
			r = !r, n += o;
			continue;
		}
		if (o === "\"" && !r) {
			i = !i, n += o;
			continue;
		}
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
	return n && t.push(n), t;
}
function Yy(e) {
	let t = [], n = Jy(e || ""), r = n.length;
	for (let e = 0; e < r; e += 1) {
		let r = n[e], i = r.indexOf(":");
		if (i === -1) continue;
		let a = r.slice(0, i).trim(), o = r.slice(i + 1).trim();
		a && o && t.push([a, o]);
	}
	return t;
}
function J(...e) {
	return e.filter((e) => !!e).reduce((e, t) => {
		let n = { ...e };
		return Object.entries(t).forEach(([e, t]) => {
			if (!n[e]) {
				n[e] = t;
				return;
			}
			if (e === "class") {
				let r = t ? String(t).split(" ") : [], i = n[e] ? n[e].split(" ") : [], a = r.filter((e) => !i.includes(e));
				n[e] = [...i, ...a].join(" ");
			} else if (e === "style") {
				let r = new Map([...Yy(n[e]), ...Yy(t)]);
				n[e] = Array.from(r.entries()).map(([e, t]) => `${e}: ${t}`).join("; ");
			} else n[e] = t;
		}), n;
	}, {});
}
function Xy(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => J(e, t), {});
}
function Zy(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" || e !== "false" && e : e;
}
function Qy(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : Zy(n.getAttribute(t.name));
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
function $y(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && Gy(t) ? !1 : t != null));
}
function eb(e) {
	let t = {};
	return !e?.attribute?.isRequired && "default" in (e?.attribute || {}) && (t.default = e.attribute.default), e?.attribute?.validate !== void 0 && (t.validate = e.attribute.validate), [e.name, t];
}
function tb(e, t) {
	let n = qy(e), { nodeExtensions: r, markExtensions: i } = Ky(e);
	return new Lu({
		topNode: r.find((e) => K(e, "topNode"))?.name,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = $y({
				...e.reduce((e, t) => {
					let n = K(t, "extendNodeSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				content: q(K(r, "content", a)),
				marks: q(K(r, "marks", a)),
				group: q(K(r, "group", a)),
				inline: q(K(r, "inline", a)),
				atom: q(K(r, "atom", a)),
				selectable: q(K(r, "selectable", a)),
				draggable: q(K(r, "draggable", a)),
				code: q(K(r, "code", a)),
				whitespace: q(K(r, "whitespace", a)),
				linebreakReplacement: q(K(r, "linebreakReplacement", a)),
				defining: q(K(r, "defining", a)),
				isolating: q(K(r, "isolating", a)),
				attrs: Object.fromEntries(i.map(eb))
			}), s = q(K(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => Qy(e, i)));
			let c = K(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: Xy(e, i)
			}));
			let l = K(r, "renderText", a);
			return l && (o.toText = l), [r.name, o];
		})),
		marks: Object.fromEntries(i.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = $y({
				...e.reduce((e, t) => {
					let n = K(t, "extendMarkSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				inclusive: q(K(r, "inclusive", a)),
				excludes: q(K(r, "excludes", a)),
				group: q(K(r, "group", a)),
				spanning: q(K(r, "spanning", a)),
				code: q(K(r, "code", a)),
				attrs: Object.fromEntries(i.map(eb))
			}), s = q(K(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => Qy(e, i)));
			let c = K(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: Xy(e, i)
			})), [r.name, o];
		}))
	});
}
function nb(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
function rb(e) {
	return e.sort((e, t) => {
		let n = K(e, "priority") || 100, r = K(t, "priority") || 100;
		return n > r ? -1 : +(n < r);
	});
}
function ib(e) {
	let t = rb(Hy(e)), n = nb(t.map((e) => e.name));
	return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((e) => `'${e}'`).join(", ")}]. This can lead to issues.`), t;
}
function ab(e, t, n) {
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
		e.isText && (s += (e?.text)?.slice(Math.max(r, n) - n, i - n));
	}), s;
}
function ob(e, t) {
	return ab(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function sb(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function cb(e, t) {
	let n = Av(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function lb(e, t) {
	let n = wy(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? cb(e, t) : n === "mark" ? Iy(e, t) : {};
}
function ub(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function db(e) {
	let t = ub(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function fb(e) {
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
	}), db(r);
}
function pb(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = Uv(n.resolve(e), t.type);
		i && r.push({
			mark: t,
			...i
		});
	}) : n.nodesBetween(e, t, (e, t) => {
		!e || e?.nodeSize === void 0 || r.push(...e.marks.map((n) => ({
			from: t,
			to: t + e.nodeSize,
			mark: n
		})));
	}), r;
}
var mb = (e, t, n, r = 20) => {
	let i = e.doc.resolve(n), a = r, o = null;
	for (; a > 0 && o === null;) {
		let e = i.node(a);
		e?.type.name === t ? o = e : --a;
	}
	return [o, a];
};
function hb(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function gb(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
var _b = (e, t = 500) => {
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
function vb(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? Wv(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => !a || a.name === e.type.name).find((e) => Bv(e.attrs, n, { strict: !1 }));
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
	let c = s.filter((e) => !a || a.name === e.mark.type.name).filter((e) => Bv(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => !a || e.mark.type !== a && e.mark.type.excludes(a)).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function yb(e, t, n = {}) {
	if (!t) return yy(e, null, n) || vb(e, null, n);
	let r = wy(t, e.schema);
	return r === "node" ? yy(e, t, n) : r === "mark" && vb(e, t, n);
}
var bb = (e, t) => {
	let { $from: n, $to: r, $anchor: i } = e.selection;
	if (t) {
		let n = Vy((e) => e.type.name === t)(e.selection);
		if (!n) return !1;
		let r = e.doc.resolve(n.pos + 1);
		return i.pos + 1 === r.end();
	}
	return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, xb = (e) => {
	let { $from: t, $to: n } = e.selection;
	return !(t.parentOffset > 0 || t.pos !== n.pos);
};
function Sb(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function Cb(e, t) {
	let { nodeExtensions: n } = Ky(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = q(K(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" && i.split(" ").includes("list");
}
function wb(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
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
			r !== !1 && (wb(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function Tb(e) {
	return e instanceof W;
}
var Eb = class e {
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
function Db(e, t) {
	let n = t.mapping.mapResult(e.position);
	return {
		position: new Eb(n.pos),
		mapResult: n
	};
}
function Ob(e) {
	return new Eb(e);
}
function kb(e, t, n) {
	let { selection: r } = t, i = null;
	if (qv(r) && (i = r.$cursor), i) {
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
var Ab = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = n, { empty: o, ranges: s } = a, c = Wv(e, r.schema);
	if (i) if (o) {
		let e = Iy(r, c);
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
	return kb(r, n, c);
}, jb = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), Mb = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
	let a = Av(e, n.schema), o;
	return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => Sp(a, {
		...o,
		...t
	})(n) ? !0 : e.clearNodes()).command(({ state: e }) => Sp(a, {
		...o,
		...t
	})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
}, Nb = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, r = Jv(e, 0, n.content.size), i = W.create(n, r);
		t.setSelection(i);
	}
	return !0;
}, Pb = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = r, o, s;
	return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = a.from, s = a.to), i && n.doc.nodesBetween(o, s, (t, r) => {
		t.isText || n.setNodeMarkup(r, void 0, {
			...t.attrs,
			dir: e
		});
	}), !0;
}, Fb = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
			from: e,
			to: e
		} : e, a = U.atStart(n).from, o = U.atEnd(n).to, s = Jv(r, a, o), c = Jv(i, a, o), l = U.create(n, s, c);
		t.setSelection(l);
	}
	return !0;
}, Ib = (e) => ({ state: t, dispatch: n }) => Pp(Av(e, t.schema))(t, n);
function Lb(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
var Rb = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
	let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = gb(l, s.node().type.name, s.node().attrs);
	if (a instanceof W && a.node.isBlock) return !s.parentOffset || !qd(o, s.pos) ? !1 : (r && (e && Lb(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
	if (!s.parent.isBlock) return !1;
	let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : Ry(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
		type: f,
		attrs: u
	}] : void 0, m = qd(t.doc, t.mapping.map(s.pos), 1, p);
	if (!p && !m && qd(t.doc, t.mapping.map(s.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
		type: f,
		attrs: u
	}] : void 0), r) {
		if (m && (a instanceof U && t.deleteSelection(), t.split(t.mapping.map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f)) {
			let e = t.mapping.map(s.before()), n = t.doc.resolve(e);
			s.node(-1).canReplaceWith(n.index(), n.index() + 1, f) && t.setNodeMarkup(t.mapping.map(s.before()), f);
		}
		e && Lb(n, i.extensionManager.splittableMarks), t.scrollIntoView();
	}
	return m;
}, zb = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
	let o = Av(e, r.schema), { $from: s, $to: c } = r.selection, l = r.selection.node;
	if (l && l.isBlock || s.depth < 2 || !s.sameParent(c)) return !1;
	let u = s.node(-1);
	if (u.type !== o) return !1;
	let d = a.extensionManager.attributes;
	if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
		if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
		if (i) {
			let e = z.empty, r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
			for (let t = s.depth - r; t >= s.depth - 3; --t) e = z.from(s.node(t).copy(e));
			let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, a = {
				...gb(d, s.node().type.name, s.node().attrs),
				...t
			}, c = o.contentMatch.defaultType?.createAndFill(a) || void 0;
			e = e.append(z.from(o.createAndFill(null, c) || void 0));
			let l = s.before(s.depth - (r - 1));
			n.replace(l, s.after(-i), new V(e, 4 - r, 0));
			let u = -1;
			n.doc.nodesBetween(l, n.doc.content.size, (e, t) => {
				if (u > -1) return !1;
				e.isTextblock && e.content.size === 0 && (u = t + 1);
			}), u > -1 && n.setSelection(U.near(n.doc.resolve(u))), n.scrollIntoView();
		}
		return !0;
	}
	let f = c.pos === s.end() ? u.contentMatchAt(0).defaultType : null, p = {
		...gb(d, u.type.name, u.attrs),
		...t
	}, m = {
		...gb(d, s.node().type.name, s.node().attrs),
		...t
	};
	n.delete(s.pos, c.pos);
	let h = f ? [{
		type: o,
		attrs: p
	}, {
		type: f,
		attrs: m
	}] : [{
		type: o,
		attrs: p
	}];
	if (!qd(n.doc, s.pos, 2)) return !1;
	if (i) {
		let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
		if (n.split(s.pos, 2, h).scrollIntoView(), !c || !i) return !0;
		let l = c.filter((e) => o.includes(e.type.name));
		n.ensureMarks(l);
	}
	return !0;
};
function Bb(e) {
	return !e || e === "1" ? null : e;
}
function Vb(e, t) {
	return Bb(e) === Bb(t);
}
var Hb = (e, t) => {
	let n = Vy((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return !(n.node.type === i?.type && Yd(e.doc, n.pos)) || !Vb(n.node.attrs.type, i?.attrs.type) || e.join(n.pos), !0;
}, Ub = (e, t) => {
	let n = Vy((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(n.start).after(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return !(n.node.type === i?.type && Yd(e.doc, r)) || !Vb(n.node.attrs.type, i?.attrs.type) || e.join(r), !0;
};
function Wb(e) {
	let t = e.doc, n = t.firstChild;
	if (!n) return null;
	let r = t.resolve(1), i = t.resolve(n.nodeSize - 1);
	return U.between(r, i);
}
var Gb = (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
	let { extensions: d, splittableMarks: f } = i.extensionManager, p = Av(e, o.schema), m = Av(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: v } = h, y = _.blockRange(v), b = g || h.$to.parentOffset && h.$from.marks();
	if (!y) return !1;
	let x = Vy((e) => Cb(e.type.name, d))(h), S = h.from === 0 && h.to === o.doc.content.size, C = o.doc.content.content, w = C.length === 1 ? C[0] : null, T = S && w && Cb(w.type.name, d) ? {
		node: w,
		pos: 0,
		depth: 0
	} : null, E = x ?? T, ee = !!x && y.depth >= 1 && y.depth - x.depth <= 1, te = !!T;
	if ((ee || te) && E) {
		if (E.node.type === p) return S && te ? c().command(({ tr: e, dispatch: t }) => {
			let n = Wb(e);
			return n ? (e.setSelection(n), t && t(e), !0) : !1;
		}).liftListItem(m).run() : l.liftListItem(m);
		if (Cb(E.node.type.name, d) && p.validContent(E.node.content)) return c().command(() => (a.setNodeMarkup(E.pos, p), !0)).command(() => Hb(a, p)).command(() => Ub(a, p)).run();
	}
	return !n || !b || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => Hb(a, p)).command(() => Ub(a, p)).run() : c().command(() => {
		let e = u().wrapInList(p, r), t = b.filter((e) => f.includes(e.type.name));
		return a.ensureMarks(t), e ? !0 : l.clearNodes();
	}).wrapInList(p, r).command(() => Hb(a, p)).command(() => Ub(a, p)).run();
}, Kb = (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
	let { extendEmptyMarkRange: a = !1 } = n, o = Wv(e, r.schema);
	return vb(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
}, qb = (e, t, n = {}) => ({ state: r, commands: i }) => {
	let a = Av(e, r.schema), o = Av(t, r.schema), s = yy(r, a, n), c;
	return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
		...c,
		...n
	});
}, Jb = (e, t = {}) => ({ state: n, commands: r }) => {
	let i = Av(e, n.schema);
	return yy(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
}, Yb = () => ({ state: e, dispatch: t }) => {
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
}, Xb = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
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
}, Zb = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = Wv(e, r.schema), { $from: c, empty: l, ranges: u } = o;
	if (!i) return !0;
	if (l && a) {
		let { from: e, to: t } = o, r = Uv(c, s, c.marks().find((e) => e.type === s)?.attrs);
		r && (e = r.from, t = r.to), n.removeMark(e, t, s);
	} else u.forEach((e) => {
		n.removeMark(e.$from.pos, e.$to.pos, s);
	});
	return n.removeStoredMark(s), !0;
}, Qb = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let { selection: i } = n, a, o;
	return typeof e == "number" ? (a = e, o = e) : e && "from" in e && "to" in e ? (a = e.from, o = e.to) : (a = i.from, o = i.to), r && t.doc.nodesBetween(a, o, (e, n) => {
		if (e.isText) return;
		let r = { ...e.attrs };
		delete r.dir, t.setNodeMarkup(n, void 0, r);
	}), !0;
}, $b = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = wy(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = Av(e, r.schema)), s === "mark" && (o = Wv(e, r.schema));
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
}, ex = (e, t = {}) => ({ state: n, dispatch: r }) => xp(Av(e, n.schema), t)(n, r), tx = (e, t = {}) => ({ state: n, dispatch: r }) => Op(Av(e, n.schema), t)(n, r), nx = class {
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
};
function rx(e, t) {
	let { selection: n } = e, { $from: r } = n;
	if (n instanceof W) {
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
function ix(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
function ax(e) {
	return typeof e == "number";
}
function ox(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function sx(e) {
	return ox(e) === "Object" && e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype;
}
yv({}, {
	createAtomBlockMarkdownSpec: () => ux,
	createBlockMarkdownSpec: () => dx,
	createInlineMarkdownSpec: () => mx,
	parseAttributes: () => cx,
	parseIndentedBlocks: () => hx,
	renderNestedMarkdownContent: () => gx,
	serializeAttributes: () => lx
});
function cx(e) {
	if (!e?.trim()) return {};
	let t = {}, n = [], r = e.replace(/["']([^"']*)["']/g, (e) => (n.push(e), `__QUOTED_${n.length - 1}__`)), i = r.match(/(?:^|\s)\.([\w-]+)/g);
	i && (t.class = i.map((e) => e.trim().slice(1)).join(" "));
	let a = r.match(/(?:^|\s)#([\w-]+)/);
	a && (t.id = a[1]), Array.from(r.matchAll(/([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g)).forEach(([, e, r]) => {
		let i = parseInt(r.match(/__QUOTED_(\d+)__/)?.[1] || "0", 10), a = n[i];
		a && (t[e] = a.slice(1, -1));
	});
	let o = r.replace(/(?:^|\s)\.([\w-]+)/g, "").replace(/(?:^|\s)#([\w-]+)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
	return o && o.split(/\s+/).filter(Boolean).forEach((e) => {
		e.match(/^[a-zA-Z][\w-]*$/) && (t[e] = !0);
	}), t;
}
function lx(e) {
	if (!e || Object.keys(e).length === 0) return "";
	let t = [];
	return e.class && String(e.class).split(/\s+/).filter(Boolean).forEach((e) => t.push(`.${e}`)), e.id && t.push(`#${e.id}`), Object.entries(e).forEach(([e, n]) => {
		e === "class" || e === "id" || (n === !0 ? t.push(e) : n !== !1 && n != null && t.push(`${e}="${String(n)}"`));
	}), t.join(" ");
}
function ux(e) {
	let { nodeName: t, name: n, parseAttributes: r = cx, serializeAttributes: i = lx, defaultAttributes: a = {}, requiredAttributes: o = [], allowedAttributes: s } = e, c = n || t, l = (e) => {
		if (!s) return e;
		let t = {};
		return s.forEach((n) => {
			n in e && (t[n] = e[n]);
		}), t;
	};
	return {
		parseMarkdown: (e, n) => {
			let r = {
				...a,
				...e.attributes
			};
			return n.createNode(t, r, []);
		},
		markdownTokenizer: {
			name: t,
			level: "block",
			start(e) {
				let t = RegExp(`^:::${c}(?:\\s|$)`, "m"), n = e.match(t)?.index;
				return n === void 0 ? -1 : n;
			},
			tokenize(e, n, i) {
				let a = RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), s = e.match(a);
				if (!s) return;
				let l = s[1] || "", u = r(l);
				if (!o.find((e) => !(e in u))) return {
					type: t,
					raw: s[0],
					attributes: u
				};
			}
		},
		renderMarkdown: (e) => {
			let t = l(e.attrs || {}), n = i(t), r = n ? ` {${n}}` : "";
			return `:::${c}${r} :::`;
		}
	};
}
function dx(e) {
	let { nodeName: t, name: n, getContent: r, parseAttributes: i = cx, serializeAttributes: a = lx, defaultAttributes: o = {}, content: s = "block", allowedAttributes: c } = e, l = n || t, u = (e) => {
		if (!c) return e;
		let t = {};
		return c.forEach((n) => {
			n in e && (t[n] = e[n]);
		}), t;
	};
	return {
		parseMarkdown: (e, n) => {
			let i;
			if (r) {
				let t = r(e);
				i = typeof t == "string" ? [{
					type: "text",
					text: t
				}] : t;
			} else i = s === "block" ? n.parseChildren(e.tokens || []) : n.parseInline(e.tokens || []);
			let a = {
				...o,
				...e.attributes
			};
			return n.createNode(t, a, i);
		},
		markdownTokenizer: {
			name: t,
			level: "block",
			start(e) {
				let t = RegExp(`^:::${l}`, "m"), n = e.match(t)?.index;
				return n === void 0 ? -1 : n;
			},
			tokenize(e, n, r) {
				let a = RegExp(`^:::${l}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), o = e.match(a);
				if (!o) return;
				let [c, u = ""] = o, d = i(u), f = 1, p = c.length, m = "", h = /^:::([\w-]*)(\s.*)?/gm, g = e.slice(p);
				for (h.lastIndex = 0;;) {
					let n = h.exec(g);
					if (n === null) break;
					let i = n.index, a = n[1];
					if (!n[2]?.endsWith(":::")) {
						if (a) f += 1;
						else if (--f, f === 0) {
							let a = g.slice(0, i);
							m = a.trim();
							let o = e.slice(0, p + i + n[0].length), c = [];
							if (m) if (s === "block") for (c = r.blockTokens(a), c.forEach((e) => {
								e.text && (!e.tokens || e.tokens.length === 0) && (e.tokens = r.inlineTokens(e.text));
							}); c.length > 0;) {
								let e = c[c.length - 1];
								if (e.type === "paragraph" && (!e.text || e.text.trim() === "")) c.pop();
								else break;
							}
							else c = r.inlineTokens(m);
							return {
								type: t,
								raw: o,
								attributes: d,
								content: m,
								tokens: c
							};
						}
					}
				}
			}
		},
		renderMarkdown: (e, t) => {
			let n = u(e.attrs || {}), r = a(n), i = r ? ` {${r}}` : "", o = t.renderChildren(e.content || [], "\n\n");
			return `:::${l}${i}

${o}

:::`;
		}
	};
}
function fx(e) {
	if (!e.trim()) return {};
	let t = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g, r = n.exec(e);
	for (; r !== null;) {
		let [, i, a, o] = r;
		t[i] = a || o, r = n.exec(e);
	}
	return t;
}
function px(e) {
	return Object.entries(e).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function mx(e) {
	let { nodeName: t, name: n, getContent: r, parseAttributes: i = fx, serializeAttributes: a = px, defaultAttributes: o = {}, selfClosing: s = !1, allowedAttributes: c } = e, l = n || t, u = (e) => {
		if (!c) return e;
		let t = {};
		return c.forEach((n) => {
			let r = typeof n == "string" ? n : n.name, i = typeof n == "string" ? void 0 : n.skipIfDefault;
			if (r in e) {
				let n = e[r];
				if (i !== void 0 && n === i) return;
				t[r] = n;
			}
		}), t;
	}, d = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return {
		parseMarkdown: (e, n) => {
			let i = {
				...o,
				...e.attributes
			};
			if (s) return n.createNode(t, i);
			let a = r ? r(e) : e.content || "";
			return a ? n.createNode(t, i, [n.createTextNode(a)]) : n.createNode(t, i, []);
		},
		markdownTokenizer: {
			name: t,
			level: "inline",
			start(e) {
				let t = RegExp(s ? `\\[${d}\\s*[^\\]]*\\]` : `\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`), n = e.match(t)?.index;
				return n === void 0 ? -1 : n;
			},
			tokenize(e, n, r) {
				let a = RegExp(s ? `^\\[${d}\\s*([^\\]]*)\\]` : `^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`), o = e.match(a);
				if (!o) return;
				let c = "", l = "";
				if (s) {
					let [, e] = o;
					l = e;
				} else {
					let [, e, t] = o;
					l = e, c = t || "";
				}
				let u = i(l.trim());
				return {
					type: t,
					raw: o[0],
					content: c.trim(),
					attributes: u
				};
			}
		},
		renderMarkdown: (e) => {
			let t = "";
			r ? t = r(e) : e.content && e.content.length > 0 && (t = e.content.filter((e) => e.type === "text").map((e) => e.text).join(""));
			let n = u(e.attrs || {}), i = a(n), o = i ? ` ${i}` : "";
			return s ? `[${l}${o}]` : `[${l}${o}]${t}[/${l}]`;
		}
	};
}
function hx(e, t, n) {
	let r = e.split("\n"), i = [], a = "", o = 0, s = t.baseIndentSize || 2;
	for (; o < r.length;) {
		let e = r[o], c = e.match(t.itemPattern);
		if (!c) {
			if (i.length > 0) break;
			if (e.trim() === "") {
				o += 1, a = `${a}${e}
`;
				continue;
			} else return;
		}
		let l = t.extractItemData(c), { indentLevel: u, mainContent: d } = l;
		a = `${a}${e}
`;
		let f = [d];
		for (o += 1; o < r.length;) {
			let e = r[o];
			if (e.trim() === "") {
				let t = r.slice(o + 1).findIndex((e) => e.trim() !== "");
				if (t === -1) break;
				if ((r[o + 1 + t].match(/^(\s*)/)?.[1]?.length || 0) > u) {
					f.push(e), a = `${a}${e}
`, o += 1;
					continue;
				} else break;
			}
			if ((e.match(/^(\s*)/)?.[1]?.length || 0) > u) f.push(e), a = `${a}${e}
`, o += 1;
			else break;
		}
		let p, m = f.slice(1);
		if (m.length > 0) {
			let e = m.map((e) => e.slice(u + s)).join("\n");
			e.trim() && (p = t.customNestedParser ? t.customNestedParser(e) : n.blockTokens(e));
		}
		let h = t.createToken(l, p);
		i.push(h);
	}
	if (i.length !== 0) return {
		items: i,
		raw: a
	};
}
function gx(e, t, n, r) {
	if (!e || !Array.isArray(e.content)) return "";
	let i = typeof n == "function" ? n(r) : n, [a, ...o] = e.content, s = `${i}${t.renderChildren([a])}`;
	return o && o.length > 0 && o.forEach((e, n) => {
		let r = t.renderChild?.call(t, e, n + 1) ?? t.renderChildren([e]);
		if (r != null) {
			let n = r.split("\n").map((e) => e ? t.indent(e) : t.indent("")).join("\n");
			s += e.type === "paragraph" ? `

${n}` : `
${n}`;
		}
	}), s;
}
function _x(e, t) {
	let n = { ...e };
	return sx(e) && sx(t) && Object.keys(t).forEach((r) => {
		sx(t[r]) && sx(e[r]) ? n[r] = _x(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function vx(e, t, n = {}) {
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
var yx = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler, this.undoable = e.undoable ?? !0;
	}
}, bx = (e, t) => {
	if (zv(t)) return t.exec(e);
	let n = t(e);
	if (!n) return null;
	let r = [n.text];
	return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
};
function xx(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o } = e, { view: s } = t;
	if (s.composing) return !1;
	let c = s.state.doc.resolve(n);
	if (c.parent.type.spec.code || (c.nodeBefore || c.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let l = !1, u = _b(c) + i;
	return a.forEach((e) => {
		if (l) return;
		let a = bx(u, e.find);
		if (!a) return;
		let c = s.state.tr, d = bv({
			state: s.state,
			transaction: c
		}), f = {
			from: n - (a[0].length - i.length),
			to: r
		}, { commands: p, chain: m, can: h } = new xv({
			editor: t,
			state: d
		});
		e.handler({
			state: d,
			range: f,
			match: a,
			commands: p,
			chain: m,
			can: h
		}) === null || !c.steps.length || (e.undoable && c.setMeta(o, {
			transform: c,
			from: n,
			to: r,
			text: i
		}), s.dispatch(c), l = !0);
	}), l;
}
function Sx(e) {
	let { editor: t, rules: n } = e, r = new G({
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
					e = typeof e == "string" ? e : Uy(z.from(e), a.schema);
					let { from: i } = s, o = i + e.length;
					xx({
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
				return xx({
					editor: t,
					from: i,
					to: a,
					text: o,
					rules: n,
					plugin: r
				});
			},
			handleDOMEvents: { compositionend: (e) => (setTimeout(() => {
				let { $cursor: i } = e.state.selection;
				i && xx({
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
				return a ? xx({
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
var Cx = class {
	constructor(e = {}) {
		this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name;
	}
	get options() {
		return { ...q(K(this, "addOptions", { name: this.name })) };
	}
	get storage() {
		return { ...q(K(this, "addStorage", {
			name: this.name,
			options: this.options
		})) };
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => _x(this.options, e)
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
}, wx = class e extends Cx {
	constructor() {
		super(...arguments), this.type = "mark";
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
}, Tx = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, Ex = (e, t, n) => {
	if (zv(t)) return [...e.matchAll(t)];
	let r = t(e, n);
	return r ? r.map((t) => {
		let n = [t.text];
		return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
	}) : [];
};
function Dx(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new xv({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		if (e.type?.spec?.code || !(e.isText || e.isTextblock || e.isInline)) return;
		let f = e.content?.size ?? e.nodeSize ?? 0, p = Math.max(r, t), m = Math.min(i, t + f);
		p >= m || Ex(e.isText ? e.text || "" : e.textBetween(p - t, m - t, void 0, "￼"), a.find, o).forEach((e) => {
			if (e.index === void 0) return;
			let t = p + e.index + 1, r = t + e[0].length, i = {
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
var Ox = null, kx = (e) => {
	var t;
	let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
	return (t = n.clipboardData) == null || t.setData("text/html", e), n;
};
function Ax(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr, l = bv({
			state: e,
			transaction: c
		});
		if (!(!Dx({
			editor: t,
			state: l,
			from: Math.max(n - 1, 0),
			to: r.b - 1,
			rule: i,
			pasteEvent: a,
			dropEvent: s
		}) || !c.steps.length)) {
			try {
				s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
			} catch {
				s = null;
			}
			return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, c;
		}
	};
	return n.map((e) => new G({
		view(e) {
			let n = (n) => {
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (Ox = t);
			}, i = () => {
				Ox &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = Ox;
					e?.isEditable && setTimeout(() => {
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
				t = typeof t == "string" ? t : Uy(z.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = kx(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if (!(!ax(p) || !m || p === m.b)) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
var jx = class {
	constructor(e, t) {
		this.splittableMarks = [], this.nonClearableMarks = [], this.editor = t, this.baseExtensions = e, this.extensions = ib(e), this.schema = tb(this.extensions, t), this.setupExtensions();
	}
	get commands() {
		return this.extensions.reduce((e, t) => {
			let n = K(t, "addCommands", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: this.editor,
				type: hb(t.name, this.schema)
			});
			return n ? {
				...e,
				...n()
			} : e;
		}, {});
	}
	get plugins() {
		let { editor: e } = this;
		return rb([...this.extensions].reverse()).flatMap((t) => {
			let n = {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: hb(t.name, this.schema)
			}, r = [], i = K(t, "addKeyboardShortcuts", n), a = {};
			if (t.type === "mark" && K(t, "exitable", n) && (a.ArrowRight = () => wx.handleExit({
				editor: e,
				mark: t
			})), i) {
				let t = Object.fromEntries(Object.entries(i()).map(([t, n]) => [t, () => n({ editor: e })]));
				a = {
					...a,
					...t
				};
			}
			let o = gv(a);
			r.push(o);
			let s = K(t, "addInputRules", n);
			if (Sb(t, e.options.enableInputRules) && s) {
				let t = s();
				if (t && t.length) {
					let n = Sx({
						editor: e,
						rules: t
					}), i = Array.isArray(n) ? n : [n];
					r.push(...i);
				}
			}
			let c = K(t, "addPasteRules", n);
			if (Sb(t, e.options.enablePasteRules) && c) {
				let t = c();
				if (t && t.length) {
					let n = Ax({
						editor: e,
						rules: t
					});
					r.push(...n);
				}
			}
			let l = K(t, "addProseMirrorPlugins", n);
			if (l) {
				let e = l();
				r.push(...e);
			}
			return r;
		});
	}
	get attributes() {
		return qy(this.extensions);
	}
	get nodeViews() {
		let { editor: e } = this, { nodeExtensions: t } = Ky(this.extensions);
		return Object.fromEntries(t.filter((e) => !!K(e, "addNodeView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = K(t, "addNodeView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: Av(t.name, this.schema)
			});
			if (!r) return [];
			let i = r();
			return i ? [t.name, (r, a, o, s, c) => {
				let l = Xy(r, n);
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
		return rb([...this.extensions].reverse()).reduceRight((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: hb(n.name, this.schema)
			}, i = K(n, "dispatchTransaction", r);
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
		return rb([...this.extensions]).reduce((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: hb(n.name, this.schema)
			}, i = K(n, "transformPastedHTML", r);
			return i ? (t, n) => {
				let a = e(t, n);
				return i.call(r, a);
			} : e;
		}, e || ((e) => e));
	}
	get markViews() {
		let { editor: e } = this, { markExtensions: t } = Ky(this.extensions);
		return Object.fromEntries(t.filter((e) => !!K(e, "addMarkView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = K(t, "addMarkView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: Wv(t.name, this.schema)
			});
			return r ? [t.name, (i, a, o) => {
				let s = Xy(i, n);
				return r()({
					mark: i,
					view: a,
					inline: o,
					editor: e,
					extension: t,
					HTMLAttributes: s,
					updateAttributes: (t) => {
						vx(i, e, t);
					}
				});
			}] : [];
		}));
	}
	destroy() {
		this.extensions.forEach((e) => {
			let t = e;
			for (; t.parent;) {
				let e = t.parent;
				e.child === t && (e.child = null), t = e;
			}
		}), this.extensions = [], this.baseExtensions = [], this.schema = null, this.editor = null;
	}
	setupExtensions() {
		let e = this.extensions;
		this.editor.extensionStorage = Object.fromEntries(e.map((e) => [e.name, e.storage])), e.forEach((e) => {
			let t = {
				name: e.name,
				options: e.options,
				storage: this.editor.extensionStorage[e.name],
				editor: this.editor,
				type: hb(e.name, this.schema)
			};
			e.type === "mark" && ((q(K(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name), (q(K(e, "clearable", t)) ?? !0) || this.nonClearableMarks.push(e.name));
			let n = K(e, "onBeforeCreate", t), r = K(e, "onCreate", t), i = K(e, "onUpdate", t), a = K(e, "onSelectionUpdate", t), o = K(e, "onTransaction", t), s = K(e, "onFocus", t), c = K(e, "onBlur", t), l = K(e, "onDestroy", t);
			n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
		});
	}
};
jx.resolve = ib, jx.sort = rb, jx.flatten = Hy, yv({}, {
	ClipboardTextSerializer: () => Mx,
	Commands: () => Nx,
	Delete: () => Px,
	Drop: () => Fx,
	Editable: () => Ix,
	FocusEvents: () => Rx,
	Keymap: () => zx,
	Paste: () => Bx,
	Tabindex: () => Vx,
	TextDirection: () => Hx,
	focusEventsPluginKey: () => Lx
});
var Y = class e extends Cx {
	constructor() {
		super(...arguments), this.type = "extension";
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
}, Mx = Y.create({
	name: "clipboardTextSerializer",
	addOptions() {
		return { blockSeparator: void 0 };
	},
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("clipboardTextSerializer"),
			props: { clipboardTextSerializer: () => {
				let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, a = sb(n), { blockSeparator: o } = this.options, s = {
					...o === void 0 ? {} : { blockSeparator: o },
					textSerializers: a
				};
				return [...i.ranges].sort((e, t) => e.$from.pos - t.$from.pos).map(({ $from: e, $to: t }) => ab(r, {
					from: e.pos,
					to: t.pos
				}, s)).join(o ?? "\n\n");
			} }
		})];
	}
}), Nx = Y.create({
	name: "commands",
	addCommands() {
		return { ...Sv };
	}
}), Px = Y.create({
	name: "delete",
	onUpdate({ transaction: e, appendedTransactions: t }) {
		let n = () => {
			var n;
			if (((n = this.editor.options.coreExtensionOptions?.delete)?.filterTransaction)?.call(n, e) ?? e.getMeta("y-sync$")) return;
			let r = Ly(e.before, [e, ...t]);
			fb(r).forEach((t) => {
				r.mapping.mapResult(t.oldRange.from).deletedAfter && r.mapping.mapResult(t.oldRange.to).deletedBefore && r.before.nodesBetween(t.oldRange.from, t.oldRange.to, (n, i) => {
					let a = i + n.nodeSize - 2, o = t.oldRange.from <= i && a <= t.oldRange.to;
					this.editor.emit("delete", {
						type: "node",
						node: n,
						from: i,
						to: a,
						newFrom: r.mapping.map(i),
						newTo: r.mapping.map(a),
						deletedRange: t.oldRange,
						newRange: t.newRange,
						partial: !o,
						editor: this.editor,
						transaction: e,
						combinedTransform: r
					});
				});
			});
			let i = r.mapping;
			r.steps.forEach((t, n) => {
				if (t instanceof Td) {
					let a = i.slice(n).map(t.from, -1), o = i.slice(n).map(t.to), s = i.invert().map(a, -1), c = i.invert().map(o), l = a > 0 && r.doc.nodeAt(a - 1)?.marks.some((e) => e.eq(t.mark)), u = r.doc.nodeAt(o)?.marks.some((e) => e.eq(t.mark));
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
							from: a,
							to: o
						},
						partial: !!(u || l),
						editor: this.editor,
						transaction: e,
						combinedTransform: r
					});
				}
			});
		};
		this.editor.options.coreExtensionOptions?.delete?.async ?? !0 ? setTimeout(n, 0) : n();
	}
}), Fx = Y.create({
	name: "drop",
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("tiptapDrop"),
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
}), Ix = Y.create({
	name: "editable",
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("editable"),
			props: { editable: () => this.editor.options.editable }
		})];
	}
}), Lx = new Wf("focusEvents"), Rx = Y.create({
	name: "focusEvents",
	addProseMirrorPlugins() {
		let { editor: e } = this;
		return [new G({
			key: Lx,
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
}), zx = Y.create({
	name: "keymap",
	addKeyboardShortcuts() {
		let e = () => this.editor.commands.first(({ commands: e }) => [
			() => e.undoInputRule(),
			() => e.command(({ tr: t }) => {
				let { selection: n, doc: r } = t, { empty: i, $anchor: a } = n, { pos: o, parent: s } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : H.atStart(r).from === o;
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
		return Zv() || gy() ? i : r;
	},
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("clearDocument"),
			appendTransaction: (e, t, n) => {
				if (e.some((e) => e.getMeta("composition"))) return;
				let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
				if (!r || i) return;
				let { empty: a, from: o, to: s } = t.selection, c = H.atStart(t.doc).from, l = H.atEnd(t.doc).to;
				if (a || !(o === c && s === l) || !wb(n.doc)) return;
				let u = n.tr, d = bv({
					state: n,
					transaction: u
				}), { commands: f } = new xv({
					editor: this.editor,
					state: d
				});
				if (f.clearNodes(), u.steps.length) return u;
			}
		})];
	}
}), Bx = Y.create({
	name: "paste",
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("tiptapPaste"),
			props: { handlePaste: (e, t, n) => {
				this.editor.emit("paste", {
					editor: this.editor,
					event: t,
					slice: n
				});
			} }
		})];
	}
}), Vx = Y.create({
	name: "tabindex",
	addOptions() {
		return { value: void 0 };
	},
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("tabindex"),
			props: { attributes: () => !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: this.options.value ?? "0" } }
		})];
	}
}), Hx = Y.create({
	name: "textDirection",
	addOptions() {
		return { direction: void 0 };
	},
	addGlobalAttributes() {
		if (!this.options.direction) return [];
		let { nodeExtensions: e } = Ky(this.extensions);
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
		return [new G({
			key: new Wf("textDirection"),
			props: { attributes: () => {
				let e = this.options.direction;
				return e ? { dir: e } : {};
			} }
		})];
	}
}), Ux = class e {
	constructor(e, t, n = !1, r = null) {
		this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = r;
	}
	get name() {
		return this.node.type.name;
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
				console.error(`You can\u2019t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
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
			if (r.node.type.name === e) if (Object.keys(t).length > 0) {
				let e = r.node.attrs, n = Object.keys(t);
				for (let r = 0; r < n.length; r += 1) {
					let i = n[r];
					if (e[i] !== t[i]) break;
				}
			} else n = r;
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
}, Wx = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}", Gx = class extends nx {
	constructor(e = {}) {
		super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
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
			getUpdatedPosition: Db,
			createMappablePosition: Ob
		}, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: e, slice: t, moved: n }) => this.options.onDrop(e, t, n)), this.on("paste", ({ event: e, slice: t }) => this.options.onPaste(e, t)), this.on("delete", this.options.onDelete);
		let t = this.createDoc(), n = Yv(t, this.options.autofocus);
		this.editorState = Bf.create({
			doc: t,
			schema: this.schema,
			selection: n || void 0
		}), this.options.element && this.mount(this.options.element);
	}
	mount(e) {
		if (typeof document > "u") throw Error("[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.");
		this.createView(e), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
			this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
		}, 0);
	}
	unmount() {
		if (this.editorView) {
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
		return this.commandManager.chain();
	}
	can() {
		return this.commandManager.can();
	}
	injectCSS() {
		this.options.injectCSS && typeof document < "u" && (this.css = ix(Wx, this.options.injectNonce));
	}
	setOptions(e = {}) {
		this.options = {
			...this.options,
			...e
		}, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
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
		return this.editorView && (this.editorState = this.view.state), this.editorState;
	}
	registerPlugin(e, t) {
		let n = Wy(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
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
		let e = [...this.options.enableCoreExtensions ? [
			Ix,
			Mx.configure({ blockSeparator: this.options.coreExtensionOptions?.clipboardTextSerializer?.blockSeparator }),
			Nx,
			Rx,
			zx,
			Vx.configure({ value: this.options.coreExtensionOptions?.tabindex?.value }),
			Fx,
			Bx,
			Px,
			Hx.configure({ direction: this.options.textDirection })
		].filter((e) => typeof this.options.enableCoreExtensions != "object" || this.options.enableCoreExtensions[e.name] !== !1) : [], ...this.options.extensions].filter((e) => [
			"extension",
			"node",
			"mark"
		].includes(e?.type));
		this.extensionManager = new jx(e, this);
	}
	createCommandManager() {
		this.commandManager = new xv({ editor: this });
	}
	createSchema() {
		this.schema = this.extensionManager.schema;
	}
	createDoc() {
		let e;
		try {
			e = Py(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
		} catch (t) {
			if (!(t instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(t.message)) throw t;
			this.emit("contentError", {
				editor: this,
				error: t,
				disableCollaboration: () => {
					"collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
				}
			}), e = Py(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
		}
		return e;
	}
	createView(e) {
		let { editorProps: t, enableExtensionDispatchTransaction: n } = this.options, r = t.dispatchTransaction || this.dispatchTransaction.bind(this), i = n ? this.extensionManager.dispatchTransaction(r) : r, a = t.transformPastedHTML, o = this.extensionManager.transformPastedHTML(a);
		this.editorView = new X_(e, {
			...t,
			attributes: {
				role: "textbox",
				...t?.attributes
			},
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
		return lb(this.state, e);
	}
	isActive(e, t) {
		let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
		return yb(this.state, n, r);
	}
	getJSON() {
		return this.state.doc.toJSON();
	}
	getHTML() {
		return Uy(this.state.doc.content, this.schema);
	}
	getText(e) {
		let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
		return ob(this.state.doc, {
			blockSeparator: t,
			textSerializers: {
				...sb(this.schema),
				...n
			}
		});
	}
	get isEmpty() {
		return wb(this.state.doc);
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
		let t = this.state.doc.resolve(e), n = e > 0 && t.nodeAfter && !t.nodeAfter.isText ? t.nodeAfter : null;
		return new Ux(t, this, !1, n);
	}
	get $doc() {
		return this.$pos(0);
	}
};
function Kx(e) {
	return new yx({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = q(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (pb(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		},
		undoable: e.undoable
	});
}
function qx(e) {
	return new yx({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = q(e.getAttributes, void 0, r) || {}, { tr: a } = t, o = n.from, s = n.to, c = e.type.create(i);
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
function Jx(e) {
	return new yx({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = q(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		},
		undoable: e.undoable
	});
}
function Yx(e) {
	return new yx({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = q(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && Ld(s, e.type, a);
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
			l && l.type === e.type && Yd(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		},
		undoable: e.undoable
	});
}
var Xx = (e) => "touches" in e, Zx = class {
	constructor(e) {
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
		}), e.options?.max && (this.maxSize = e.options.max), e?.options?.directions && (this.directions = e.options.directions), e.options?.preserveAspectRatio && (this.preserveAspectRatio = e.options.preserveAspectRatio), e.options?.className && (this.classNames = {
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
		return e.type === this.node.type ? (this.node = e, !this.onUpdate || this.onUpdate(e, t, n)) : !1;
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
		e.preventDefault(), e.stopPropagation(), this.isResizing = !0, this.activeHandle = t, Xx(e) ? (this.startX = e.touches[0].clientX, this.startY = e.touches[0].clientY) : (this.startX = e.clientX, this.startY = e.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
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
}, Qx = class e extends Cx {
	constructor() {
		super(...arguments), this.type = "node";
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
function $x(e) {
	return new Tx({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = q(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let i = c.search(/\S/), u = n.from + c.indexOf(s), d = u + s.length;
				if (pb(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > u).length) return null;
				d < n.to && o.delete(d, n.to), u > n.from && o.delete(n.from + i, u), l = n.from + i + s.length, o.addMark(n.from + i, l, e.type.create(a || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(e.type);
			}
		}
	});
}
//#endregion
//#region node_modules/@tiptap/vue-3/dist/index.js
function eS(e) {
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
var tS = class extends Gx {
	constructor(e = {}) {
		return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = eS(this.view.state), this.reactiveExtensionStorage = eS(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
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
}, nS = l({
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
//#endregion
//#region node_modules/@tiptap/core/dist/jsx-runtime/jsx-runtime.js
var rS = (e, t) => {
	if (e === "slot") return 0;
	if (e instanceof Function) return e(t);
	let { children: n, ...r } = t ?? {};
	if (e === "svg") throw Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
	return [
		e,
		r,
		n
	];
}, iS = (e, t) => {
	let { state: n, view: r } = e, { selection: i } = n;
	if (!i.empty) return !1;
	let { $from: a } = i;
	if (a.parentOffset !== 0) return !1;
	let o = a.depth - 1;
	if (o < 0) return !1;
	let s = a.node(o), c = a.index(o);
	if (c === 0) return !1;
	if (s.type === t) return e.commands.lift(t.name);
	let l = s.child(c - 1);
	if (l.type !== t || !l.lastChild?.isTextblock) return !1;
	let u = a.before(), d = u - 1 - 1, { tr: f } = n;
	return f.delete(u, a.after()).insert(d, a.parent.content), f.setSelection(U.create(f.doc, d)), r.dispatch(f.scrollIntoView()), !0;
}, aS = /^\s*>\s$/, oS = Qx.create({
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
		return /* @__PURE__ */ rS("blockquote", {
			...J(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ rS("slot", {})
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
			Backspace: () => iS(this.editor, this.type)
		};
	},
	addInputRules() {
		return [Yx({
			find: aS,
			type: this.type
		})];
	}
}), sS = oS, cS = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, lS = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, uS = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, dS = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, fS = wx.create({
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
		return /* @__PURE__ */ rS("strong", {
			...J(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ rS("slot", {})
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
		return [Kx({
			find: cS,
			type: this.type
		}), Kx({
			find: uS,
			type: this.type
		})];
	},
	addPasteRules() {
		return [$x({
			find: lS,
			type: this.type
		}), $x({
			find: dS,
			type: this.type
		})];
	}
}), pS = fS, mS = (e) => {
	let t = /`([^`]+)`(?!`)$/.exec(e);
	return !t || t.index > 0 && e[t.index - 1] === "`" ? null : {
		index: t.index,
		text: t[0],
		replaceWith: t[1]
	};
}, hS = (e) => {
	let t = /`([^`]+)`(?!`)/g, n = [], r;
	for (; (r = t.exec(e)) !== null;) r.index > 0 && e[r.index - 1] === "`" || n.push({
		index: r.index,
		text: r[0],
		replaceWith: r[1]
	});
	return n;
}, gS = wx.create({
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
			J(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "codespan",
	parseMarkdown: (e, t) => t.applyMark("code", [{
		type: "text",
		text: e.text || ""
	}]),
	renderMarkdown: (e, t) => e.content ? `\`${t.renderChildren(e.content)}\`` : "",
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
		return [Kx({
			find: mS,
			type: this.type
		})];
	},
	addPasteRules() {
		return [$x({
			find: hS,
			type: this.type
		})];
	}
}), _S = 4, vS = /^```([a-z]+)?[\s\n]$/, yS = /^~~~([a-z]+)?[\s\n]$/, bS = Qx.create({
	name: "codeBlock",
	addOptions() {
		return {
			languageClassPrefix: "language-",
			exitOnTripleEnter: !0,
			exitOnArrowDown: !0,
			defaultLanguage: null,
			enableTabIndentation: !1,
			tabSize: _S,
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
			J(this.options.HTMLAttributes, t),
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
		].join("\n") : `\`\`\`${r}

\`\`\``, n;
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
				let t = this.options.tabSize ?? _S, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
				if (i.parent.type !== this.type) return !1;
				let o = " ".repeat(t);
				return a ? e.commands.insertContent(o) : e.commands.command(({ tr: e }) => {
					let { from: t, to: i } = r, a = n.doc.textBetween(t, i, "\n", "\n").split("\n").map((e) => o + e).join("\n");
					return e.replaceWith(t, i, n.schema.text(a)), !0;
				});
			},
			"Shift-Tab": ({ editor: e }) => {
				if (!this.options.enableTabIndentation) return !1;
				let t = this.options.tabSize ?? _S, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
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
					return e.delete(p, p + f), r - p <= f && e.setSelection(U.create(e.doc, p)), !0;
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
			ArrowDown: ({ editor: e }) => {
				if (!this.options.exitOnArrowDown) return !1;
				let { state: t } = e, { selection: n, doc: r } = t, { $from: i, empty: a } = n;
				if (!a || i.parent.type !== this.type || i.parentOffset !== i.parent.nodeSize - 2) return !1;
				let o = i.after();
				return o === void 0 ? !1 : r.nodeAt(o) ? e.commands.command(({ tr: e }) => (e.setSelection(H.near(r.resolve(o))), !0)) : e.commands.exitCode();
			}
		};
	},
	addInputRules() {
		return [Jx({
			find: vS,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		}), Jx({
			find: yS,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		})];
	},
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("codeBlockVSCodeHandler"),
			props: { handlePaste: (e, t) => {
				if (!t.clipboardData || this.editor.isActive(this.type.name)) return !1;
				let n = t.clipboardData.getData("text/plain"), r = t.clipboardData.getData("vscode-editor-data"), i = (r ? JSON.parse(r) : void 0)?.mode;
				if (!n || !i) return !1;
				let { tr: a, schema: o } = e.state, s = o.text(n.replace(/\r\n?/g, "\n"));
				return a.replaceSelectionWith(this.type.create({ language: i }, s)), a.selection.$from.parent.type !== this.type && a.setSelection(U.near(a.doc.resolve(Math.max(0, a.selection.from - 2)))), a.setMeta("paste", !0), e.dispatch(a), !0;
			} }
		})];
	}
}), xS = Qx.create({
	name: "doc",
	topNode: !0,
	content: "block+",
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n\n") : ""
}), SS = Qx.create({
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
		return ["br", J(this.options.HTMLAttributes, e)];
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
			}).run();
		})]) };
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Enter": () => this.editor.commands.setHardBreak(),
			"Shift-Enter": () => this.editor.commands.setHardBreak()
		};
	}
}), CS = Qx.create({
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
			J(this.options.HTMLAttributes, t),
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
		return this.options.levels.map((e) => Jx({
			find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
			type: this.type,
			getAttributes: { level: e }
		}));
	}
}), wS = Qx.create({
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
		return ["hr", J(this.options.HTMLAttributes, e)];
	},
	markdownTokenName: "hr",
	parseMarkdown: (e, t) => t.createNode("horizontalRule"),
	renderMarkdown: () => "---",
	addCommands() {
		return { setHorizontalRule: () => ({ chain: e, state: t }) => {
			if (!rx(t, t.schema.nodes[this.name])) return !1;
			let { selection: n } = t, { $to: r } = n, i = e();
			return Tb(n) ? i.insertContentAt(r.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: e, tr: t, dispatch: n }) => {
				if (n) {
					let { $to: n } = t.selection, r = n.end();
					if (n.nodeAfter) n.nodeAfter.isTextblock ? t.setSelection(U.create(t.doc, n.pos + 1)) : n.nodeAfter.isBlock ? t.setSelection(W.create(t.doc, n.pos)) : t.setSelection(U.create(t.doc, n.pos));
					else {
						let i = (e.schema.nodes[this.options.nextNodeType] || n.parent.type.contentMatch.defaultType)?.create();
						i && (t.insert(r, i), t.setSelection(U.create(t.doc, r + 1)));
					}
					t.scrollIntoView();
				}
				return !0;
			}).run();
		} };
	},
	addInputRules() {
		return [qx({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
}), TS = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, ES = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, DS = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, OS = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, kS = wx.create({
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
			J(this.options.HTMLAttributes, e),
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
		return [Kx({
			find: TS,
			type: this.type
		}), Kx({
			find: DS,
			type: this.type
		})];
	},
	addPasteRules() {
		return [$x({
			find: ES,
			type: this.type
		}), $x({
			find: OS,
			type: this.type
		})];
	}
}), AS = kS, jS = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", MS = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", NS = "numeric", PS = "ascii", FS = "alpha", IS = "asciinumeric", LS = "alphanumeric", RS = "domain", zS = "emoji", BS = "scheme", VS = "slashscheme", HS = "whitespace";
function US(e, t) {
	return e in t || (t[e] = []), t[e];
}
function WS(e, t, n) {
	t[NS] && (t[IS] = !0, t[LS] = !0), t[PS] && (t[IS] = !0, t[FS] = !0), t[IS] && (t[LS] = !0), t[FS] && (t[LS] = !0), t[LS] && (t[RS] = !0), t[zS] && (t[RS] = !0);
	for (let r in t) {
		let t = US(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function GS(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function KS(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
KS.groups = {}, KS.prototype = {
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
		r ||= KS.groups;
		let i;
		return t && t.j ? i = t : (i = new KS(t), n && r && WS(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= KS.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new KS(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new KS(), a && (r && (o.t && typeof o.t == "string" ? WS(a, Object.assign(GS(o.t, r), n), r) : n && WS(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var X = (e, t, n, r, i) => e.ta(t, n, r, i), Z = (e, t, n, r, i) => e.tr(t, n, r, i), qS = (e, t, n, r, i) => e.ts(t, n, r, i), Q = (e, t, n, r, i) => e.tt(t, n, r, i), JS = "WORD", YS = "UWORD", XS = "ASCIINUMERICAL", ZS = "ALPHANUMERICAL", QS = "LOCALHOST", $S = "TLD", eC = "UTLD", tC = "SCHEME", nC = "SLASH_SCHEME", rC = "NUM", iC = "WS", aC = "NL", oC = "OPENBRACE", sC = "CLOSEBRACE", cC = "OPENBRACKET", lC = "CLOSEBRACKET", uC = "OPENPAREN", dC = "CLOSEPAREN", fC = "OPENANGLEBRACKET", pC = "CLOSEANGLEBRACKET", mC = "FULLWIDTHLEFTPAREN", hC = "FULLWIDTHRIGHTPAREN", gC = "LEFTCORNERBRACKET", _C = "RIGHTCORNERBRACKET", vC = "LEFTWHITECORNERBRACKET", yC = "RIGHTWHITECORNERBRACKET", bC = "FULLWIDTHLESSTHAN", xC = "FULLWIDTHGREATERTHAN", SC = "AMPERSAND", CC = "APOSTROPHE", wC = "ASTERISK", TC = "AT", EC = "BACKSLASH", DC = "BACKTICK", OC = "CARET", kC = "COLON", AC = "COMMA", jC = "DOLLAR", MC = "DOT", NC = "EQUALS", PC = "EXCLAMATION", FC = "HYPHEN", IC = "PERCENT", LC = "PIPE", RC = "PLUS", zC = "POUND", BC = "QUERY", VC = "QUOTE", HC = "FULLWIDTHMIDDLEDOT", UC = "SEMI", WC = "SLASH", GC = "TILDE", KC = "UNDERSCORE", qC = "EMOJI", JC = "SYM", YC = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: ZS,
	AMPERSAND: SC,
	APOSTROPHE: CC,
	ASCIINUMERICAL: XS,
	ASTERISK: wC,
	AT: TC,
	BACKSLASH: EC,
	BACKTICK: DC,
	CARET: OC,
	CLOSEANGLEBRACKET: pC,
	CLOSEBRACE: sC,
	CLOSEBRACKET: lC,
	CLOSEPAREN: dC,
	COLON: kC,
	COMMA: AC,
	DOLLAR: jC,
	DOT: MC,
	EMOJI: qC,
	EQUALS: NC,
	EXCLAMATION: PC,
	FULLWIDTHGREATERTHAN: xC,
	FULLWIDTHLEFTPAREN: mC,
	FULLWIDTHLESSTHAN: bC,
	FULLWIDTHMIDDLEDOT: HC,
	FULLWIDTHRIGHTPAREN: hC,
	HYPHEN: FC,
	LEFTCORNERBRACKET: gC,
	LEFTWHITECORNERBRACKET: vC,
	LOCALHOST: QS,
	NL: aC,
	NUM: rC,
	OPENANGLEBRACKET: fC,
	OPENBRACE: oC,
	OPENBRACKET: cC,
	OPENPAREN: uC,
	PERCENT: IC,
	PIPE: LC,
	PLUS: RC,
	POUND: zC,
	QUERY: BC,
	QUOTE: VC,
	RIGHTCORNERBRACKET: _C,
	RIGHTWHITECORNERBRACKET: yC,
	SCHEME: tC,
	SEMI: UC,
	SLASH: WC,
	SLASH_SCHEME: nC,
	SYM: JC,
	TILDE: GC,
	TLD: $S,
	UNDERSCORE: KC,
	UTLD: eC,
	UWORD: YS,
	WORD: JS,
	WS: iC
}), XC = /[a-z]/, ZC = /\p{L}/u, QC = /\p{Emoji}/u, $C = /\d/, ew = /\s/, tw = "\r", nw = "\n", rw = "️", iw = "‍", aw = "￼", ow = null, sw = null;
function cw(e = []) {
	let t = {};
	KS.groups = t;
	let n = new KS();
	ow ??= fw(jS), sw ??= fw(MS), Q(n, "'", CC), Q(n, "{", oC), Q(n, "}", sC), Q(n, "[", cC), Q(n, "]", lC), Q(n, "(", uC), Q(n, ")", dC), Q(n, "<", fC), Q(n, ">", pC), Q(n, "（", mC), Q(n, "）", hC), Q(n, "「", gC), Q(n, "」", _C), Q(n, "『", vC), Q(n, "』", yC), Q(n, "＜", bC), Q(n, "＞", xC), Q(n, "&", SC), Q(n, "*", wC), Q(n, "@", TC), Q(n, "`", DC), Q(n, "^", OC), Q(n, ":", kC), Q(n, ",", AC), Q(n, "$", jC), Q(n, ".", MC), Q(n, "=", NC), Q(n, "!", PC), Q(n, "-", FC), Q(n, "%", IC), Q(n, "|", LC), Q(n, "+", RC), Q(n, "#", zC), Q(n, "?", BC), Q(n, "\"", VC), Q(n, "/", WC), Q(n, ";", UC), Q(n, "~", GC), Q(n, "_", KC), Q(n, "\\", EC), Q(n, "・", HC);
	let r = Z(n, $C, rC, { [NS]: !0 });
	Z(r, $C, r);
	let i = Z(r, XC, XS, { [IS]: !0 }), a = Z(r, ZC, ZS, { [LS]: !0 }), o = Z(n, XC, JS, { [PS]: !0 });
	Z(o, $C, i), Z(o, XC, o), Z(i, $C, i), Z(i, XC, i);
	let s = Z(n, ZC, YS, { [FS]: !0 });
	Z(s, XC), Z(s, $C, a), Z(s, ZC, s), Z(a, $C, a), Z(a, XC), Z(a, ZC, a);
	let c = Q(n, nw, aC, { [HS]: !0 }), l = Q(n, tw, iC, { [HS]: !0 }), u = Z(n, ew, iC, { [HS]: !0 });
	Q(n, aw, u), Q(l, nw, c), Q(l, aw, u), Z(l, ew, u), Q(u, tw), Q(u, nw), Z(u, ew, u), Q(u, aw, u);
	let d = Z(n, QC, qC, { [zS]: !0 });
	Q(d, "#"), Z(d, QC, d), Q(d, rw, d);
	let f = Q(d, iw);
	Q(f, "#"), Z(f, QC, d);
	let p = [[XC, o], [$C, i]], m = [
		[XC, null],
		[ZC, s],
		[$C, a]
	];
	for (let e = 0; e < ow.length; e++) dw(n, ow[e], $S, JS, p);
	for (let e = 0; e < sw.length; e++) dw(n, sw[e], eC, YS, m);
	WS($S, {
		tld: !0,
		ascii: !0
	}, t), WS(eC, {
		utld: !0,
		alpha: !0
	}, t), dw(n, "file", tC, JS, p), dw(n, "mailto", tC, JS, p), dw(n, "http", nC, JS, p), dw(n, "https", nC, JS, p), dw(n, "ftp", nC, JS, p), dw(n, "ftps", nC, JS, p), WS(tC, {
		scheme: !0,
		ascii: !0
	}, t), WS(nC, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [BS]: !0 } : { [VS]: !0 };
		r.indexOf("-") >= 0 ? i[RS] = !0 : XC.test(r) ? $C.test(r) ? i[IS] = !0 : i[PS] = !0 : i[NS] = !0, qS(n, r, r, i);
	}
	return qS(n, "localhost", QS, { ascii: !0 }), n.jd = new KS(JC), {
		start: n,
		tokens: Object.assign({ groups: t }, YC)
	};
}
function lw(e, t) {
	let n = uw(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function uw(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function dw(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new KS(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new KS(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function fw(e) {
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
var pw = {
	defaultProtocol: "http",
	events: null,
	format: hw,
	formatHref: hw,
	nl2br: !1,
	tagName: "a",
	target: null,
	rel: null,
	validate: !0,
	truncate: Infinity,
	className: null,
	attributes: null,
	ignoreTags: [],
	render: null
};
function mw(e, t = null) {
	let n = Object.assign({}, pw);
	e && (n = Object.assign(n, e instanceof mw ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
mw.prototype = {
	o: pw,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : pw[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function hw(e) {
	return e;
}
function gw(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
gw.prototype = {
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
	toObject(e = pw.defaultProtocol) {
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
function _w(e, t) {
	class n extends gw {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var vw = _w("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), yw = _w("text"), bw = _w("nl"), xw = _w("url", {
	isLink: !0,
	toHref(e = pw.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== QS && e[1].t === kC;
	}
}), Sw = (e) => new KS(e);
function Cw({ groups: e }) {
	let t = e.domain.concat([
		SC,
		wC,
		TC,
		EC,
		DC,
		OC,
		jC,
		NC,
		FC,
		rC,
		IC,
		LC,
		RC,
		zC,
		WC,
		JC,
		GC,
		KC
	]), n = [
		CC,
		kC,
		AC,
		MC,
		PC,
		IC,
		BC,
		VC,
		UC,
		fC,
		pC,
		oC,
		sC,
		lC,
		cC,
		uC,
		dC,
		mC,
		hC,
		gC,
		_C,
		vC,
		yC,
		bC,
		xC
	], r = [
		SC,
		CC,
		wC,
		EC,
		DC,
		OC,
		jC,
		NC,
		FC,
		oC,
		sC,
		IC,
		LC,
		RC,
		zC,
		BC,
		WC,
		JC,
		GC,
		KC
	], i = Sw(), a = Q(i, GC);
	X(a, r, a), X(a, e.domain, a);
	let o = Sw(), s = Sw(), c = Sw();
	X(i, e.domain, o), X(i, e.scheme, s), X(i, e.slashscheme, c), X(o, r, a), X(o, e.domain, o);
	let l = Q(o, TC);
	Q(a, TC, l), Q(s, TC, l), Q(c, TC, l);
	let u = Q(a, MC);
	X(u, r, a), X(u, e.domain, a);
	let d = Sw();
	X(l, e.domain, d), X(d, e.domain, d);
	let f = Q(d, MC);
	X(f, e.domain, d);
	let p = Sw(vw);
	X(f, e.tld, p), X(f, e.utld, p), Q(l, QS, p);
	let m = Q(d, FC);
	Q(m, FC, m), X(m, e.domain, d), X(p, e.domain, d), Q(p, MC, f), Q(p, FC, m);
	let h = Q(o, FC), g = Q(o, MC);
	Q(h, FC, h), X(h, e.domain, o), X(g, r, a), X(g, e.domain, o);
	let _ = Sw(xw);
	X(g, e.tld, _), X(g, e.utld, _), X(_, e.domain, o), X(_, r, a), Q(_, MC, g), Q(_, FC, h), Q(_, TC, l);
	let v = Q(_, kC), y = Sw(xw);
	X(v, e.numeric, y);
	let b = Sw(xw), x = Sw();
	X(b, t, b), X(b, n, x), X(x, t, b), X(x, n, x), Q(_, WC, b), Q(y, WC, b);
	let S = Q(s, kC), C = Q(Q(Q(c, kC), WC), WC);
	X(s, e.domain, o), Q(s, MC, g), Q(s, FC, h), X(c, e.domain, o), Q(c, MC, g), Q(c, FC, h), X(S, e.domain, b), Q(S, WC, b), Q(S, BC, b), X(C, e.domain, b), X(C, t, b), Q(C, WC, b);
	let w = [
		[oC, sC],
		[cC, lC],
		[uC, dC],
		[fC, pC],
		[mC, hC],
		[gC, _C],
		[vC, yC],
		[bC, xC]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = Q(b, r);
		Q(x, r, a);
		let o = Sw(xw);
		X(a, t, o);
		let s = Sw();
		X(a, n, s), Q(a, i, b), X(o, t, o), X(o, n, s), X(s, t, o), X(s, n, s), Q(o, i, b), Q(s, i, b);
	}
	return Q(i, QS, _), Q(i, aC, bw), {
		start: i,
		tokens: YC
	};
}
function ww(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(Tw(yw, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(Tw(e, t, r));
		}
	}
	return o.length > 0 && a.push(Tw(yw, t, o)), a;
}
function Tw(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var Ew = typeof console < "u" && console && console.warn || (() => {}), Dw = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", $ = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function Ow() {
	return KS.groups = {}, $.scanner = null, $.parser = null, $.tokenQueue = [], $.pluginQueue = [], $.customSchemes = [], $.initialized = !1, $;
}
function kw(e, t = !1) {
	if ($.initialized && Ew(`linkifyjs: already initialized - will not register custom scheme "${e}" ${Dw}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	$.customSchemes.push([e, t]);
}
function Aw() {
	$.scanner = cw($.customSchemes);
	for (let e = 0; e < $.tokenQueue.length; e++) $.tokenQueue[e][1]({ scanner: $.scanner });
	$.parser = Cw($.scanner.tokens);
	for (let e = 0; e < $.pluginQueue.length; e++) $.pluginQueue[e][1]({
		scanner: $.scanner,
		parser: $.parser
	});
	return $.initialized = !0, $;
}
function jw(e) {
	return $.initialized || Aw(), ww($.parser.start, e, lw($.scanner.start, e));
}
jw.scan = lw;
function Mw(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new mw(n), i = jw(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var Nw = "[\0- \xA0 ᠎ -\u2029 　]", Pw = new RegExp(Nw), Fw = RegExp(`${Nw}$`), Iw = new RegExp(Nw, "g");
function Lw(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function Rw(e) {
	return new G({
		key: new Wf("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r;
			if (fb(Ly(n.doc, [...t])).forEach(({ newRange: t }) => {
				let n = zy(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!Fw.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(Pw).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = jw(n).map((t) => t.toObject(e.defaultProtocol));
					if (!Lw(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						pb(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function zw(e) {
	return new G({
		key: new Wf("handleClickLink"),
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
				let n = lb(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
function Bw(e) {
	return new G({
		key: new Wf("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = Mw(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function Vw(e, t) {
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
	}), !e || e.replace(Iw, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var Hw = wx.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				kw(e);
				return;
			}
			kw(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		Ow();
	},
	inclusive() {
		return this.options.autolink;
	},
	addOptions() {
		return {
			openOnClick: !0,
			enableClickSelection: !1,
			linkOnPaste: !0,
			autolink: !0,
			protocols: [],
			defaultProtocol: "http",
			HTMLAttributes: {
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				class: null
			},
			isAllowedUri: (e, t) => !!Vw(e, t.protocols),
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
					defaultValidate: (e) => !!Vw(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!Vw(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			J(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			J(this.options.HTMLAttributes, {
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
					defaultValidate: (e) => !!Vw(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!Vw(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addPasteRules() {
		return [$x({
			find: (e) => {
				let t = [];
				if (e) {
					let { protocols: n, defaultProtocol: r } = this.options, i = Mw(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
						defaultValidate: (e) => !!Vw(e, n),
						protocols: n,
						defaultProtocol: r
					}));
					i.length && i.forEach((e) => {
						this.options.shouldAutoLink(e.value) && t.push({
							text: e.value,
							data: { href: e.href },
							index: e.start
						});
					});
				}
				return t;
			},
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(Rw({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Vw(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(zw({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(Bw({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), Uw = Hw, Ww = Object.defineProperty, Gw = (e, t) => {
	for (var n in t) Ww(e, n, {
		get: t[n],
		enumerable: !0
	});
}, Kw = "listItem", qw = "textStyle", Jw = /^\s*([-+*])\s$/, Yw = Qx.create({
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
			J(this.options.HTMLAttributes, e),
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
		return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Kw, this.editor.getAttributes(qw)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
	},
	addInputRules() {
		let e = Yx({
			find: Jw,
			type: this.type
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = Yx({
			find: Jw,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: () => this.editor.getAttributes(qw),
			editor: this.editor
		})), [e];
	}
}), Xw = (e, t, n) => {
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
}, Zw = (e, t, n, r) => {
	let i = Xw(e, n, r);
	if (!i) return !1;
	let { selection: a } = e, { nestedList: o, nestedListPos: s, insertPos: c, items: l } = i, u = e.tr;
	u.delete(s, s + o.nodeSize);
	let d = u.mapping.map(c);
	return u.insert(d, z.from(l)), u.setSelection(a.map(u.doc, u.mapping)), t && t(u), !0;
}, Qw = (e, t, n) => Zw(e.state, e.view.dispatch, t, n), $w = (e, t) => Y.create({
	name: `${e}BranchingDeleteKeymap`,
	priority: 101,
	addKeyboardShortcuts() {
		let n = () => Qw(this.editor, e, t);
		return {
			Delete: n,
			"Mod-Delete": n
		};
	}
}), eT = [
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
], tT = "abcdefghijklmnopqrstuvwxyz", nT = String.raw`\d+|[ivxlcdmIVXLCDM]+|${"[a-zA-Z]{1,2}"}`;
function rT(e) {
	let t = e, n = "";
	for (let [e, r] of eT) for (; t >= e;) n += r, t -= e;
	return n;
}
function iT(e) {
	return rT(e).toUpperCase();
}
function aT(e) {
	let t = e.toLowerCase(), n = 0, r = 0;
	for (; n < t.length;) {
		let e = !1;
		for (let [i, a] of eT) if (t.startsWith(a, n)) {
			r += i, n += a.length, e = !0;
			break;
		}
		if (!e) return 0;
	}
	return r;
}
function oT(e) {
	if (!/^[ivxlcdmIVXLCDM]+$/.test(e)) return !1;
	let t = aT(e);
	return t <= 0 ? !1 : (e === e.toLowerCase() ? rT(t) : iT(t)) === e;
}
function sT(e) {
	let t = e.toLowerCase();
	if (t.length === 1) return t.charCodeAt(0) - 97 + 1;
	if (t.length === 2) {
		let e = t.charCodeAt(0) - 97, n = t.charCodeAt(1) - 97;
		return (e + 1) * 26 + n + 1;
	}
	return 0;
}
function cT(e) {
	if (e <= 26) return tT[e - 1];
	let t = Math.floor((e - 1) / 26) - 1, n = (e - 1) % 26;
	return t < 0 ? tT[n] : tT[t] + tT[n];
}
function lT(e) {
	if (!(!e || /^\d+$/.test(e))) {
		if (oT(e)) return e === e.toLowerCase() ? "i" : "I";
		if (/^[a-z]{1,2}$/.test(e)) return "a";
		if (/^[A-Z]{1,2}$/.test(e)) return "A";
	}
}
function uT(e) {
	if (/^\d+$/.test(e)) return parseInt(e, 10);
	let t = lT(e);
	if (t === "i" || t === "I") return aT(e);
	if (t === "a" || t === "A") {
		let t = sT(e);
		return t > 0 ? t : 1;
	}
	let n = parseInt(e, 10);
	return Number.isNaN(n) ? 1 : n;
}
function dT(e, t) {
	if (e === "numeric") return String(t);
	switch (e) {
		case "a": return cT(t);
		case "A": return cT(t).toUpperCase();
		case "i": return rT(t);
		case "I": return iT(t);
		default: return String(t);
	}
}
function fT(e) {
	if (e.length === 0) return !1;
	let t = lT(e[0]) ?? "numeric", n = uT(e[0]);
	if (n < 1) return !1;
	for (let r = 0; r < e.length; r++) {
		let i = dT(t, n + r);
		if (e[r] !== i) return !1;
	}
	return !0;
}
function pT(e) {
	return {
		type: lT(e),
		start: uT(e)
	};
}
function mT(e) {
	let { type: t, start: n } = pT(e), r = {};
	return t && (r.type = t), n !== 1 && (r.start = n), r;
}
function hT(e, t, n = ". ") {
	let r = t + 1;
	if (!e || e === "1") return `${r}${n}`;
	switch (e) {
		case "a": return `${cT(r)}${n}`;
		case "A": return `${cT(r).toUpperCase()}${n}`;
		case "i": return `${rT(r)}${n}`;
		case "I": return `${iT(r)}${n}`;
		default: return `${r}${n}`;
	}
}
function gT(e) {
	let t = e.tokens?.[0];
	return !!(e.text && e.tokens?.length === 1 && t?.type === "list" && t.ordered && t.raw === e.text);
}
function _T(e, t) {
	return t.tokenizeInline ? t.parseInline(t.tokenizeInline(e)) : t.parseInline([{
		type: "text",
		raw: e,
		text: e
	}]);
}
var vT = Qx.create({
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
			J(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list_item",
	parseMarkdown: (e, t) => {
		if (e.type !== "list_item") return [];
		let n = t.parseBlockChildren ?? t.parseChildren, r = [];
		if (e.tokens && e.tokens.length > 0) {
			if (gT(e)) return {
				type: "listItem",
				content: [{
					type: "paragraph",
					content: _T(e.text || "", t)
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
	renderMarkdown: (e, t, n) => gx(e, t, (e) => {
		if (e.parentType === "bulletList") return "- ";
		if (e.parentType === "orderedList") {
			let t = e.meta?.parentAttrs?.start || 1;
			return hT(e.meta?.parentAttrs?.type, t - 1 + (e.index || 0), ". ");
		}
		return "- ";
	}, n),
	addExtensions() {
		return [$w(this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName])];
	},
	addKeyboardShortcuts() {
		return {
			Enter: () => this.editor.commands.splitListItem(this.name),
			Tab: () => this.editor.commands.sinkListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
	}
});
Gw({}, {
	findListItemPos: () => yT,
	getNextListDepth: () => bT,
	handleBackspace: () => ST,
	handleDelete: () => TT,
	hasListBefore: () => xT,
	hasListItemAfter: () => ET,
	hasListItemBefore: () => DT,
	listItemHasSubList: () => OT,
	nextListIsDeeper: () => CT,
	nextListIsHigher: () => wT
});
var yT = (e, t) => {
	let { $from: n } = t.selection, r = Av(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
	for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
	return s === null ? null : {
		$pos: t.doc.resolve(o),
		depth: s
	};
}, bT = (e, t) => {
	let n = yT(e, t);
	if (!n) return !1;
	let [, r] = mb(t, e, n.$pos.pos + 4);
	return r;
}, xT = (e, t, n) => {
	let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
	return !(!a || !n.includes(a.type.name));
}, ST = (e, t, n) => {
	if (e.commands.undoInputRule()) return !0;
	if (e.state.selection.from !== e.state.selection.to) return !1;
	if (!yy(e.state, t) && xT(e.state, t, n)) {
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
	return !yy(e.state, t) || !xb(e.state) ? !1 : e.chain().liftListItem(t).run();
}, CT = (e, t) => {
	let n = bT(e, t), r = yT(e, t);
	return !r || !n ? !1 : n > r.depth;
}, wT = (e, t) => {
	let n = bT(e, t), r = yT(e, t);
	return !r || !n ? !1 : n < r.depth;
}, TT = (e, t) => {
	if (!yy(e.state, t) || !bb(e.state, t)) return !1;
	let { selection: n } = e.state, { $from: r, $to: i } = n;
	return !n.empty && r.sameParent(i) ? !1 : CT(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : wT(t, e.state) ? e.chain().joinForward().joinBackward().run() : e.commands.joinItemForward();
}, ET = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - n.parentOffset - 2);
	return !(r.index() === r.parent.childCount - 1 || r.nodeAfter?.type.name !== e);
}, DT = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - 2);
	return !(r.index() === 0 || r.nodeBefore?.type.name !== e);
}, OT = (e, t, n) => {
	if (!n) return !1;
	let r = Av(e, t.schema), i = !1;
	return n.descendants((e) => {
		e.type === r && (i = !0);
	}), i;
}, kT = Y.create({
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
					e.state.schema.nodes[n] !== void 0 && TT(e, n) && (t = !0);
				}), t;
			},
			"Mod-Delete": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && TT(e, n) && (t = !0);
				}), t;
			},
			Backspace: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && ST(e, n, r) && (t = !0);
				}), t;
			},
			"Mod-Backspace": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && ST(e, n, r) && (t = !0);
				}), t;
			}
		};
	}
}), AT = RegExp(`^(\\s*)(${nT})([.)])\\s+(.*)$`), jT = /^\s/, MT = {
	heading: /^#{1,6}(?:\s|$)/,
	bulletItem: /^[-+*]\s+/,
	codeFence: /^(?:```|~~~)/,
	thematicBreak: /^(?:(?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/
};
function NT(e) {
	return AT.test(e.trimStart());
}
function PT(e) {
	let t = e.trimStart();
	return MT.bulletItem.test(t) || NT(t) || MT.heading.test(t) || MT.thematicBreak.test(t) && !t.startsWith("-") || /^>\s?/.test(t) || MT.codeFence.test(t);
}
function FT(e) {
	return Object.values(MT).some((t) => t.test(e));
}
function IT(e) {
	let t = [], n = [], r = !1;
	return e.forEach((e) => {
		if (r) {
			n.push(e);
			return;
		}
		if (e.trim() === "") {
			r = !0, n.push(e);
			return;
		}
		if (t.length > 0 && PT(e)) {
			r = !0, n.push(e);
			return;
		}
		t.push(e);
	}), {
		paragraphLines: t,
		blockLines: n
	};
}
function LT(e) {
	let t = [], n = 0, r = 0;
	for (; n < e.length;) {
		let i = e[n], a = i.match(AT);
		if (!a) break;
		let [, o, s, c, l] = a, u = o.length, d = parseInt(s, 10), f = isNaN(d) ? lT(s) : void 0, p = isNaN(d) ? uT(s) : d, m = [l], h = n + 1, g = [i], _ = !1;
		for (; h < e.length;) {
			let t = e[h];
			if (t.match(AT)) break;
			if (t.trim() === "") g.push(t), m.push(""), _ = !0, h += 1;
			else if (t.match(jT)) {
				let e = t.length - t.trimStart().length, n = u + s.length + 1;
				g.push(t), m.push(t.slice(Math.min(e, n))), h += 1;
			} else {
				if (_ || FT(t)) break;
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
var RT = RegExp(`^(${nT})([.)])\\s+(.+)$`);
function zT(e) {
	let t = e.split("\n").filter((e) => e.trim().length > 0);
	if (t.length === 0) return null;
	let n = [];
	for (let e of t) {
		let t = e.trim().match(RT);
		if (!t) return null;
		n.push({
			marker: t[1],
			content: t[3]
		});
	}
	return fT(n.map((e) => e.marker)) ? {
		type: "orderedList",
		attrs: mT(n[0].marker),
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
function BT(e, t, n) {
	let r = [], i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a.indent === t) {
			let { paragraphLines: o, blockLines: s } = IT(a.contentLines), c = o.join("\n").trim(), l = [];
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
				let e = BT(f, Math.min(...f.map((e) => e.indent)), n);
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
function VT(e, t) {
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
var HT = "listItem", UT = "textStyle", WT = /^(\d+)\.\s$/;
function GT(e) {
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
var KT = Qx.create({
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
						let e = GT(n);
						if (e) return e;
					}
					let r = e.querySelector("li");
					if (r) {
						let e = r.getAttribute("style");
						if (e) {
							let t = GT(e);
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
		let { start: t, type: n, ...r } = e, i = J(this.options.HTMLAttributes, r);
		return t !== 1 && (i.start = t), n && n !== "1" && (i.type = n), [
			"ol",
			i,
			0
		];
	},
	markdownTokenName: "list",
	parseMarkdown: (e, t) => {
		if (e.type !== "list" || !e.ordered) return [];
		let n = e.start || 1, r = e.typeMarker, i = e.items ? VT(e.items, t) : [], a = {};
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
			let r = e.split("\n"), [i, a] = LT(r);
			if (i.length === 0) return;
			let o = BT(i, i[0].indent, n);
			if (o.length !== 0) return {
				type: "list",
				ordered: !0,
				start: i[0]?.number || 1,
				typeMarker: i[0]?.type,
				items: o,
				raw: r.slice(0, a).join("\n")
			};
		}
	},
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(HT, this.editor.getAttributes(UT)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
	},
	addProseMirrorPlugins() {
		return [new G({ props: { handlePaste: (e, t) => {
			if ((t.clipboardData?.getData("text/html"))?.trim()) return !1;
			let n = t.clipboardData?.getData("text/plain");
			if (!n) return !1;
			let r = zT(n);
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
		let e = (e, t) => (!t.attrs.type || t.attrs.type === "1") && t.childCount + t.attrs.start === +e[1], t = Yx({
			find: WT,
			type: this.type,
			getAttributes: (e) => ({ start: +e[1] }),
			joinPredicate: e
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (t = Yx({
			find: WT,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: (e) => ({
				start: +e[1],
				...this.editor.getAttributes(UT)
			}),
			joinPredicate: e,
			editor: this.editor
		})), [t];
	}
}), qT = /^\s*(\[([( |x])?\])\s$/, JT = Qx.create({
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
			priority: 51
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			"li",
			J(this.options.HTMLAttributes, t, { "data-type": this.name }),
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
	renderMarkdown: (e, t) => gx(e, t, `- [${e.attrs?.checked ? "x" : " "}] `),
	addExtensions() {
		return this.options.nested ? [$w(this.name, [this.options.taskListTypeName])] : [];
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
			let i = document.createElement("li"), a = document.createElement("label"), o = document.createElement("span"), s = document.createElement("input"), c = document.createElement("div"), l = (e) => {
				var t;
				s.ariaLabel = ((t = this.options.a11y)?.checkboxLabel)?.call(t, e, s.checked) || `Task item checkbox for ${e.textContent || "empty task item"}`;
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
					let t = r.extensionManager.attributes, n = Xy(e, t), a = new Set(Object.keys(n)), o = this.options.HTMLAttributes;
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
		return [Yx({
			find: qT,
			type: this.type,
			getAttributes: (e) => ({ checked: e[e.length - 1] === "x" })
		})];
	}
}), YT = Qx.create({
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
			J(this.options.HTMLAttributes, e, { "data-type": this.name }),
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
				let t = hx(e, {
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
			}, i = hx(e, {
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
Y.create({
	name: "listKit",
	addExtensions() {
		let e = [];
		return this.options.bulletList !== !1 && e.push(Yw.configure(this.options.bulletList)), this.options.listItem !== !1 && e.push(vT.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(kT.configure(this.options.listKeymap)), this.options.orderedList !== !1 && e.push(KT.configure(this.options.orderedList)), this.options.taskItem !== !1 && e.push(JT.configure(this.options.taskItem)), this.options.taskList !== !1 && e.push(YT.configure(this.options.taskList)), e;
	}
});
//#endregion
//#region node_modules/@tiptap/extension-paragraph/dist/index.js
var XT = "&nbsp;", ZT = "\xA0", QT = Qx.create({
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
			J(this.options.HTMLAttributes, e),
			0
		];
	},
	parseMarkdown: (e, t) => {
		let n = e.tokens || [];
		if (n.length === 1 && n[0].type === "image") return t.parseChildren([n[0]]);
		let r = t.parseInline(n);
		return n.length === 1 && n[0].type === "text" && (n[0].raw === XT || n[0].text === XT || n[0].raw === ZT || n[0].text === ZT) && r.length === 1 && r[0].type === "text" && (r[0].text === XT || r[0].text === ZT) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
	},
	renderMarkdown: (e, t, n) => {
		if (!e) return "";
		let r = Array.isArray(e.content) ? e.content : [];
		if (r.length === 0) {
			let e = Array.isArray(n?.previousNode?.content) ? n.previousNode.content : [];
			return n?.previousNode?.type === "paragraph" && e.length === 0 ? XT : "";
		}
		return t.renderChildren(r);
	},
	addCommands() {
		return { setParagraph: () => ({ commands: e }) => e.setNode(this.name) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
	}
}), $T = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, eE = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, tE = wx.create({
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
			J(this.options.HTMLAttributes, e),
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
		return [Kx({
			find: $T,
			type: this.type
		})];
	},
	addPasteRules() {
		return [$x({
			find: eE,
			type: this.type
		})];
	}
}), nE = tE, rE = Qx.create({
	name: "text",
	group: "inline",
	parseMarkdown: (e) => ({
		type: "text",
		text: e.text || ""
	}),
	renderMarkdown: (e) => e.text || ""
}), iE = wx.create({
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
			J(this.options.HTMLAttributes, e),
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
}), aE = iE;
//#endregion
//#region node_modules/prosemirror-dropcursor/dist/index.js
function oE(e = {}) {
	return new G({ view(t) {
		return new sE(t, e);
	} });
}
var sE = class {
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
		this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
	}
	update(e, t) {
		if (this.cursorPos != null && t.doc != e.state.doc) if (this.lastDragEvent) {
			let e = this.computeTarget(this.lastDragEvent);
			e == this.cursorPos ? this.updateOverlay() : this.setCursor(e);
		} else this.updateOverlay();
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
			let e = tf(this.editorView.state.doc, a, this.editorView.dragging.slice);
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
}, cE = class e extends H {
	constructor(e) {
		super(e, e);
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		return e.valid(r) ? new e(r) : H.near(r);
	}
	content() {
		return V.empty;
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
		return new lE(this.anchor);
	}
	static valid(e) {
		let t = e.parent;
		if (t.inlineContent || !dE(e) || !fE(e)) return !1;
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
				} else if (r == 0) return null;
				i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			for (;;) {
				let o = n > 0 ? a.firstChild : a.lastChild;
				if (!o) {
					if (a.isAtom && !a.isText && !W.isSelectable(a)) {
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
cE.prototype.visible = !1, cE.findFrom = cE.findGapCursorFrom, H.jsonID("gapcursor", cE);
var lE = class e {
	constructor(e) {
		this.pos = e;
	}
	map(t) {
		return new e(t.map(this.pos));
	}
	resolve(e) {
		let t = e.resolve(this.pos);
		return cE.valid(t) ? new cE(t) : H.near(t);
	}
};
function uE(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function dE(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || uE(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function fE(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || uE(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function pE() {
	return new G({ props: {
		decorations: vE,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && cE.valid(n) ? new cE(n) : null;
		},
		handleClick: gE,
		handleKeyDown: mE,
		handleDOMEvents: { beforeinput: _E }
	} });
}
var mE = _v({
	ArrowLeft: hE("horiz", -1),
	ArrowRight: hE("horiz", 1),
	ArrowUp: hE("vert", -1),
	ArrowDown: hE("vert", 1)
});
function hE(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof U) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = cE.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new cE(c))), !0) : !1;
	};
}
function gE(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!cE.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && W.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new cE(r))), !0);
}
function _E(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof cE)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = z.empty;
	for (let e = r.length - 1; e >= 0; e--) i = z.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new V(i, 0, 0));
	return a.setSelection(U.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function vE(e) {
	if (!(e.selection instanceof cE)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", __.create(e.doc, [m_.widget(e.selection.head, t, { key: "gapcursor" })]);
}
//#endregion
//#region node_modules/rope-sequence/dist/index.js
var yE = 200, bE = function() {};
bE.prototype.append = function(e) {
	return e.length ? (e = bE.from(e), !this.length && e || e.length < yE && this.leafAppend(e) || this.length < yE && e.leafPrepend(this) || this.appendInner(e)) : this;
}, bE.prototype.prepend = function(e) {
	return e.length ? bE.from(e).append(this) : this;
}, bE.prototype.appendInner = function(e) {
	return new SE(this, e);
}, bE.prototype.slice = function(e, t) {
	return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? bE.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
}, bE.prototype.get = function(e) {
	if (!(e < 0 || e >= this.length)) return this.getInner(e);
}, bE.prototype.forEach = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
}, bE.prototype.map = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length);
	var r = [];
	return this.forEach(function(t, n) {
		return r.push(e(t, n));
	}, t, n), r;
}, bE.from = function(e) {
	return e instanceof bE ? e : e && e.length ? new xE(e) : bE.empty;
};
var xE = /* @__PURE__ */ function(e) {
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
		if (this.length + e.length <= yE) return new t(this.values.concat(e.flatten()));
	}, t.prototype.leafPrepend = function(e) {
		if (this.length + e.length <= yE) return new t(e.flatten().concat(this.values));
	}, n.length.get = function() {
		return this.values.length;
	}, n.depth.get = function() {
		return 0;
	}, Object.defineProperties(t.prototype, n), t;
}(bE);
bE.empty = new xE([]);
var SE = /* @__PURE__ */ function(e) {
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
}(bE), CE = 500, wE = class e {
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
			if (!t.step) {
				i || (i = this.remapping(r, n + 1), a = i.maps.length), a--, u.push(t);
				return;
			}
			if (i) {
				u.push(new EE(t.map));
				let e = t.step.map(i.slice(a)), n;
				e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new EE(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
			} else o.maybeStep(t.step);
			if (t.selection) return s = i ? t.selection.map(i.slice(a)) : t.selection, c = new e(this.items.slice(0, r).append(u.reverse().concat(l)), this.eventCount - 1), !1;
		}, this.items.length, 0), {
			remaining: c,
			transform: o,
			selection: s
		};
	}
	addTransform(t, n, r, i) {
		let a = [], o = this.eventCount, s = this.items, c = !i && s.length ? s.get(s.length - 1) : null;
		for (let e = 0; e < t.steps.length; e++) {
			let r = t.steps[e].invert(t.docs[e]), l = new EE(t.mapping.maps[e], r, n), u;
			(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
		}
		let l = o - r.depth;
		return l > OE && (s = TE(s, l), o -= l), new e(s.append(a), o);
	}
	remapping(e, t) {
		let n = new yd();
		return this.items.forEach((t, r) => {
			let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
			n.appendMap(t.map, i);
		}, e, t), n;
	}
	addMaps(t) {
		return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new EE(e))), this.eventCount);
	}
	rebased(t, n) {
		if (!this.eventCount) return this;
		let r = [], i = Math.max(0, this.items.length - n), a = t.mapping, o = t.steps.length, s = this.eventCount;
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
				l && s++, r.push(new EE(i, o, l));
			} else r.push(new EE(i));
		}, i);
		let l = [];
		for (let e = n; e < o; e++) l.push(new EE(a.maps[e]));
		let u = this.items.slice(0, i).append(l).append(r), d = new e(u, s);
		return d.emptyItemCount() > CE && (d = d.compress(this.items.length - r.length)), d;
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
					let c = new EE(o.invert(), t, s), l, u = i.length - 1;
					(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
				}
			} else e.map && r--;
		}, this.items.length, 0), new e(bE.from(i.reverse()), a);
	}
};
wE.empty = new wE(bE.empty, 0);
function TE(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
var EE = class e {
	constructor(e, t, n, r) {
		this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
	}
	merge(t) {
		if (this.step && t.step && !t.selection) {
			let n = t.step.merge(this.step);
			if (n) return new e(n.getMap().invert(), n, this.selection);
		}
	}
}, DE = class {
	constructor(e, t, n, r, i) {
		this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
	}
}, OE = 20;
function kE(e, t, n, r) {
	let i = n.getMeta(LE), a;
	if (i) return i.historyState;
	n.getMeta(RE) && (e = new DE(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(LE)) return o.getMeta(LE).redo ? new DE(e.done.addTransform(n, void 0, r, IE(t)), e.undone, jE(n.mapping.maps), e.prevTime, e.prevComposition) : new DE(e.done, e.undone.addTransform(n, void 0, r, IE(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !AE(n, e.prevRanges)), s = o ? ME(e.prevRanges, n.mapping) : jE(n.mapping.maps);
		return new DE(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, IE(t)), wE.empty, s, n.time, i ?? e.prevComposition);
	} else if (a = n.getMeta("rebased")) return new DE(e.done.rebased(n, a), e.undone.rebased(n, a), ME(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
	else return new DE(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), ME(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function AE(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function jE(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function ME(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function NE(e, t, n) {
	let r = IE(t), i = LE.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, t.selection.getBookmark(), i, r), c = new DE(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(LE, {
		redo: n,
		historyState: c
	});
}
var PE = !1, FE = null;
function IE(e) {
	let t = e.plugins;
	if (FE != t) {
		PE = !1, FE = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			PE = !0;
			break;
		}
	}
	return PE;
}
var LE = new Wf("history"), RE = new Wf("closeHistory");
function zE(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new G({
		key: LE,
		state: {
			init() {
				return new DE(wE.empty, wE.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return kE(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? VE : n == "historyRedo" ? HE : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function BE(e, t) {
	return (n, r) => {
		let i = LE.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = NE(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
var VE = BE(!1, !0), HE = BE(!0, !0);
Y.create({
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
		return [new G({
			key: new Wf("characterCount"),
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
var UE = Y.create({
	name: "dropCursor",
	addOptions() {
		return {
			color: "currentColor",
			width: 1,
			class: void 0
		};
	},
	addProseMirrorPlugins() {
		return [oE(this.options)];
	}
});
Y.create({
	name: "focus",
	addOptions() {
		return {
			className: "has-focus",
			mode: "all"
		};
	},
	addProseMirrorPlugins() {
		return [new G({
			key: new Wf("focus"),
			props: { decorations: ({ doc: e, selection: t }) => {
				let { isEditable: n, isFocused: r } = this.editor, { anchor: i } = t, a = [];
				if (!n || !r) return __.create(e, []);
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
					a.push(m_.node(t, t + e.nodeSize, { class: this.options.className }));
				}), __.create(e, a);
			} }
		})];
	}
});
var WE = Y.create({
	name: "gapCursor",
	addProseMirrorPlugins() {
		return [pE()];
	},
	extendNodeSchema(e) {
		return { allowGapCursor: q(K(e, "allowGapCursor", {
			name: e.name,
			options: e.options,
			storage: e.storage
		})) ?? null };
	}
}), GE = "placeholder", KE = new Wf("tiptap__placeholder");
function qE(e) {
	let { editor: t, placeholder: n, dataAttribute: r, pos: i, node: a, isEmptyDoc: o, hasAnchor: s, classes: { emptyNode: c, emptyEditor: l } } = e, u = [c];
	return o && u.push(l), m_.node(i, i + a.nodeSize, {
		class: u.join(" "),
		[r]: typeof n == "function" ? n({
			editor: t,
			node: a,
			pos: i,
			hasAnchor: s
		}) : n
	});
}
function JE(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function YE({ editor: e, options: t, dataAttribute: n, doc: r, selection: i, from: a, to: o }) {
	let { anchor: s } = i, c = [], l = e.isEmpty;
	return r.nodesBetween(a, o, (r, i) => {
		let a = s >= i && s <= i + r.nodeSize, o = !r.isLeaf && wb(r);
		return r.type.isTextblock && (a || !t.showOnlyCurrent) && o && c.push(qE({
			editor: e,
			isEmptyDoc: l,
			dataAttribute: n,
			hasAnchor: a,
			placeholder: t.placeholder,
			classes: {
				emptyEditor: t.emptyEditorClass,
				emptyNode: JE(t.emptyNodeClass, {
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
function XE({ editor: e, options: t, dataAttribute: n, doc: r, selection: i }) {
	if (!(e.isEditable || !t.showOnlyWhenEditable)) return null;
	let { anchor: a } = i, o = [], s = e.isEmpty;
	if (t.showOnlyCurrent && !t.includeChildren) {
		let i = r.resolve(a), c = i.depth > 0 ? i.node(1) : i.nodeAfter, l = i.depth > 0 ? i.before(1) : a;
		if (c && c.type.isTextblock && wb(c)) {
			let r = a >= l && a <= l + c.nodeSize;
			o.push(qE({
				editor: e,
				isEmptyDoc: s,
				dataAttribute: n,
				hasAnchor: r,
				placeholder: t.placeholder,
				classes: {
					emptyEditor: t.emptyEditorClass,
					emptyNode: JE(t.emptyNodeClass, {
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
	} else o.push(...YE({
		editor: e,
		options: t,
		dataAttribute: n,
		doc: r,
		selection: i,
		from: 0,
		to: r.content.size
	}));
	return __.create(r, o);
}
function ZE(e, t) {
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
function QE(e, t) {
	return {
		from: Math.max(0, t.from - 1),
		to: Math.min(e.content.size, t.to - 1)
	};
}
function $E(e, t, n) {
	let r = [];
	return e.forEach((e, i) => {
		let a = i, o = a + e.nodeSize, s = a + 1, c = o + 1;
		s < n && c > t && r.push({
			from: a,
			to: o
		});
	}), r;
}
function eD(e) {
	if (e.length === 0) return [];
	let t = [...e].sort((e, t) => e.from - t.from), n = [{ ...t[0] }];
	for (let e = 1; e < t.length; e += 1) {
		let r = n[n.length - 1], i = t[e];
		i.from <= r.to ? r.to = Math.max(r.to, i.to) : n.push({ ...i });
	}
	return n;
}
function tD(e, t) {
	let n = $E(e, t.from, t.to);
	return n.push(QE(e, ZE(e, t.from))), t.to > t.from ? n.push(QE(e, ZE(e, Math.min(t.to, e.content.size + 1) - 1))) : t.from < e.content.size + 1 && n.push(QE(e, ZE(e, Math.min(t.from + 1, e.content.size)))), n;
}
function nD(e, t, n) {
	let r = [];
	if (e.docChanged) {
		let t = fb(e);
		for (let e of t) r.push(...tD(n.doc, e.newRange));
	}
	return e.selectionSet && (r.push(QE(n.doc, ZE(n.doc, e.mapping.map(t.selection.anchor)))), r.push(QE(n.doc, ZE(n.doc, n.selection.anchor)))), eD(r);
}
function rD(e, t, n) {
	let r = Math.max(0, Math.min(e, n.content.size));
	return {
		from: r,
		to: Math.max(r, Math.min(t, n.content.size))
	};
}
function iD({ decorations: e, ranges: t, editor: n, options: r, dataAttribute: i, doc: a, selection: o }) {
	let s = e;
	for (let e of t) {
		let { from: t, to: c } = rD(e.from, e.to, a), l = s.find(t, c).filter((e) => e.from >= t && e.to <= c);
		l.length && (s = s.remove(l));
		let u = YE({
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
function aD({ editor: e, options: t, dataAttribute: n }) {
	return {
		init(r, i) {
			return XE({
				editor: e,
				options: t,
				dataAttribute: n,
				doc: i.doc,
				selection: i.selection
			}) ?? __.empty;
		},
		apply(r, i, a, o) {
			return !r.docChanged && !r.selectionSet ? i : iD({
				decorations: i.map(r.mapping, r.doc),
				ranges: nD(r, a, o),
				editor: e,
				options: t,
				dataAttribute: n,
				doc: o.doc,
				selection: o.selection
			});
		}
	};
}
function oD(e) {
	return e.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
function sD({ editor: e, options: t }) {
	let n = t.dataAttribute ? `data-${oD(t.dataAttribute)}` : `data-${GE}`, r = t.showOnlyCurrent && !t.includeChildren;
	return new G({
		key: KE,
		...r ? {} : { state: aD({
			editor: e,
			options: t,
			dataAttribute: n
		}) },
		props: { decorations: r ? ({ doc: r, selection: i }) => XE({
			editor: e,
			options: t,
			dataAttribute: n,
			doc: r,
			selection: i
		}) : (n) => t.showOnlyWhenEditable && !e.isEditable ? __.empty : KE.getState(n) ?? __.empty }
	});
}
var cD = Y.create({
	name: "placeholder",
	addOptions() {
		return {
			emptyEditorClass: "is-editor-empty",
			emptyNodeClass: "is-empty",
			dataAttribute: GE,
			placeholder: "Write something …",
			showOnlyWhenEditable: !0,
			showOnlyCurrent: !0,
			includeChildren: !1
		};
	},
	addProseMirrorPlugins() {
		return [sD({
			editor: this.editor,
			options: this.options
		})];
	}
});
function lD(e, t) {
	return !e.selection.empty && !Tb(e.selection) && t.isEditable;
}
function uD(e, t) {
	return lD(e, t) && !t.isFocused && !t.view.dragging;
}
function dD() {
	var e;
	(e = window.getSelection()) == null || e.removeAllRanges();
}
function fD(e) {
	e.focus();
}
Y.create({
	name: "selection",
	addOptions() {
		return { className: "selection" };
	},
	addProseMirrorPlugins() {
		let { editor: e, options: t } = this;
		return [new G({
			key: new Wf("selection"),
			props: {
				decorations(n) {
					return uD(n, e) ? __.create(n.doc, [m_.inline(n.selection.from, n.selection.to, { class: t.className })]) : null;
				},
				handleDOMEvents: {
					blur(t) {
						return lD(t.state, e) && dD(), !1;
					},
					focus(t) {
						return lD(t.state, e) && requestAnimationFrame(() => {
							!e.isDestroyed && t.hasFocus() && fD(t);
						}), !1;
					}
				}
			}
		})];
	}
});
function pD({ types: e, node: t }) {
	return t && Array.isArray(e) && e.includes(t.type) || t?.type === e;
}
var mD = Y.create({
	name: "trailingNode",
	addOptions() {
		return {
			node: void 0,
			notAfter: []
		};
	},
	addProseMirrorPlugins() {
		let e = new Wf(this.name), t = this.options.node || this.editor.schema.topNodeType.contentMatch.defaultType?.name || "paragraph", n = Object.entries(this.editor.schema.nodes).map(([, e]) => e).filter((e) => (this.options.notAfter || []).concat(t).includes(e.name));
		return [new G({
			key: e,
			appendTransaction: (n, r, i) => {
				let { doc: a, tr: o, schema: s } = i, c = e.getState(i), l = a.content.size, u = s.nodes[t];
				if (!n.some((e) => e.getMeta("skipTrailingNode")) && c) return o.insert(l, u.create());
			},
			state: {
				init: (e, t) => {
					let r = t.tr.doc.lastChild;
					return !pD({
						node: r,
						types: n
					});
				},
				apply: (e, t) => {
					if (!e.docChanged || e.getMeta("__uniqueIDTransaction")) return t;
					let r = e.doc.lastChild;
					return !pD({
						node: r,
						types: n
					});
				}
			}
		})];
	}
}), hD = Y.create({
	name: "undoRedo",
	addOptions() {
		return {
			depth: 100,
			newGroupDelay: 500
		};
	},
	addCommands() {
		return {
			undo: () => ({ state: e, dispatch: t }) => VE(e, t),
			redo: () => ({ state: e, dispatch: t }) => HE(e, t)
		};
	},
	addProseMirrorPlugins() {
		return [zE(this.options)];
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
}), gD = Y.create({
	name: "starterKit",
	addExtensions() {
		let e = [];
		return this.options.bold !== !1 && e.push(fS.configure(this.options.bold)), this.options.blockquote !== !1 && e.push(oS.configure(this.options.blockquote)), this.options.bulletList !== !1 && e.push(Yw.configure(this.options.bulletList)), this.options.code !== !1 && e.push(gS.configure(this.options.code)), this.options.codeBlock !== !1 && e.push(bS.configure(this.options.codeBlock)), this.options.document !== !1 && e.push(xS.configure(this.options.document)), this.options.dropcursor !== !1 && e.push(UE.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && e.push(WE.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && e.push(SS.configure(this.options.hardBreak)), this.options.heading !== !1 && e.push(CS.configure(this.options.heading)), this.options.undoRedo !== !1 && e.push(hD.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && e.push(wS.configure(this.options.horizontalRule)), this.options.italic !== !1 && e.push(kS.configure(this.options.italic)), this.options.listItem !== !1 && e.push(vT.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(kT.configure(this.options?.listKeymap)), this.options.link !== !1 && e.push(Hw.configure(this.options?.link)), this.options.orderedList !== !1 && e.push(KT.configure(this.options.orderedList)), this.options.paragraph !== !1 && e.push(QT.configure(this.options.paragraph)), this.options.strike !== !1 && e.push(tE.configure(this.options.strike)), this.options.text !== !1 && e.push(rE.configure(this.options.text)), this.options.underline !== !1 && e.push(iE.configure(this.options?.underline)), this.options.trailingNode !== !1 && e.push(mD.configure(this.options?.trailingNode)), e;
	}
}), _D = cD, vD = Y.create({
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
				renderHTML: (e) => e.textAlign ? { style: `text-align: ${e.textAlign}` } : {}
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
}), yD = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, bD = Qx.create({
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
		return ["img", J(this.options.HTMLAttributes, e)];
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
		let { directions: e, minWidth: t, minHeight: n, alwaysPreserveAspectRatio: r } = this.options.resize;
		return ({ node: i, getPos: a, HTMLAttributes: o, editor: s }) => {
			let c = document.createElement("img");
			c.draggable = !1;
			let l = J(this.options.HTMLAttributes, o);
			Object.entries(l).forEach(([e, t]) => {
				if (t != null) switch (e) {
					case "width":
					case "height": break;
					default:
						c.setAttribute(e, t);
						break;
				}
			}), l.src !== null && (c.src = l.src);
			let u = new Zx({
				element: c,
				editor: s,
				node: i,
				getPos: a,
				onResize: (e, t) => {
					c.style.width = `${e}px`, c.style.height = `${t}px`;
				},
				onCommit: (e, t) => {
					let n = a();
					n !== void 0 && this.editor.chain().setNodeSelection(n).updateAttributes(this.name, {
						width: e,
						height: t
					}).run();
				},
				onUpdate: (e, t, n) => e.type === i.type,
				options: {
					directions: e,
					min: {
						width: t,
						height: n
					},
					preserveAspectRatio: r === !0
				}
			}), d = u.dom;
			return d.style.visibility = "hidden", d.style.pointerEvents = "none", c.onload = () => {
				d.style.visibility = "", d.style.pointerEvents = "";
			}, u;
		};
	},
	addCommands() {
		return { setImage: (e) => ({ commands: t }) => t.insertContent({
			type: this.name,
			attrs: e
		}) };
	},
	addInputRules() {
		return [qx({
			find: yD,
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
}), xD = {
	left: "text-start",
	center: "text-center",
	right: "text-end",
	justify: "text-justify"
}, SD = [
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
	"dark",
	"muted"
], CD = [
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
	"dark",
	"light"
], wD = [
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
], TD = [
	"secondary",
	"primary",
	"success",
	"danger",
	"warning",
	"info",
	"light",
	"dark"
], ED = [
	"float-start",
	"float-end",
	"float-none"
], DD = [
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
], OD = [
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
function kD(e, t, n) {
	if (!e || !e.classList) return n;
	for (let n of t) {
		let t = xD[n];
		if (t && e.classList.contains(t)) return n;
	}
	let r = e.style && e.style.textAlign;
	return r && t.includes(r) ? r : n;
}
function AD(e) {
	if (!e || !e.classList) return "secondary";
	for (let t of TD) if (e.classList.contains(`alert-${t}`)) return t;
	return "secondary";
}
function jD(e) {
	if (!e || !e.classList) return null;
	for (let t of wD) if (t && e.classList.contains(t)) return t;
	return null;
}
function MD(e) {
	if (!e || !e.classList) return null;
	for (let t of OD) if (t && e.classList.contains(t)) return t;
	return null;
}
function ND(e) {
	if (!e || !e.classList) return null;
	let t = [];
	for (let n of DD) e.classList.contains(n) && t.push(n);
	return t.length ? t.join(" ") : null;
}
function PD(e) {
	if (!e || !e.classList) return null;
	for (let t of ED) if (e.classList.contains(t)) return t;
	return e.classList.contains("float-left") ? "float-start" : e.classList.contains("float-right") ? "float-end" : null;
}
function FD(e) {
	let t = e.state.selection;
	return t instanceof W && t.node.type.name === "image";
}
var ID = bD.extend({
	atom: !0,
	addAttributes() {
		return {
			...this.parent?.(),
			imgClass: {
				default: null,
				rendered: !1,
				parseHTML: (e) => ND(e)
			}
		};
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let n = e.attrs.imgClass, r = J(this.options.HTMLAttributes, t);
		return n && String(n).trim() ? ["img", J(r, { class: String(n).trim() })] : ["img", r];
	}
}), LD = vD.extend({ addGlobalAttributes() {
	let e = this.options.alignments, t = this.options.types, n = this.options.defaultAlignment;
	return [{
		types: t,
		attributes: { textAlign: {
			default: n,
			parseHTML: (t) => kD(t, e, n),
			renderHTML: (e) => {
				if (!e.textAlign) return {};
				let t = xD[e.textAlign];
				return t ? { class: t } : {};
			}
		} }
	}];
} }), RD = pS.extend({
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
			J(this.options.HTMLAttributes, e, { class: "fw-bold" }),
			0
		];
	}
}), zD = AS.extend({
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
			J(this.options.HTMLAttributes, e, { class: "fst-italic" }),
			0
		];
	}
}), BD = aE.extend({
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (e) => e.classList && e.classList.contains("text-decoration-underline") ? {} : !1
		}, { tag: "u" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			J(this.options.HTMLAttributes, e, { class: "text-decoration-underline" }),
			0
		];
	}
}), VD = nE.extend({
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
			J(this.options.HTMLAttributes, e, { class: "text-decoration-line-through" }),
			0
		];
	}
}), HD = sS.extend({
	addAttributes() {
		return { variant: {
			default: "secondary",
			rendered: !1,
			parseHTML: (e) => AD(e)
		} };
	},
	parseHTML() {
		return [{ tag: "blockquote" }, {
			tag: "div",
			getAttrs: (e) => typeof e == "string" || !e.classList ? !1 : e.classList.contains("alert") ? { variant: AD(e) } : !1
		}];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let n = e.attrs.variant && TD.includes(e.attrs.variant) ? e.attrs.variant : "secondary";
		return [
			"div",
			J(this.options.HTMLAttributes, t, {
				class: `alert alert-${n}`,
				role: "alert"
			}),
			0
		];
	}
}), UD = wx.create({
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
				for (let t of SD) if (e.classList.contains(`text-${t}`)) return t;
				return null;
			}
		} };
	},
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (e) => {
				if (!e.classList) return !1;
				for (let t of SD) if (e.classList.contains(`text-${t}`)) return { variant: t };
				return !1;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e, mark: t }) {
		let n = t.attrs.variant;
		return n ? [
			"span",
			J(this.options.HTMLAttributes, e, { class: `text-${n}` }),
			0
		] : [
			"span",
			J(this.options.HTMLAttributes, e),
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
}), WD = wx.create({
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
				for (let t of CD) if (e.classList.contains(`bg-${t}`)) return t;
				return null;
			}
		} };
	},
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (e) => {
				if (!e.classList) return !1;
				for (let t of CD) if (e.classList.contains(`bg-${t}`)) return { variant: t };
				return !1;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e, mark: t }) {
		let n = t.attrs.variant;
		return n ? [
			"span",
			J(this.options.HTMLAttributes, e, { class: `bg-${n}` }),
			0
		] : [
			"span",
			J(this.options.HTMLAttributes, e),
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
}), GD = Y.create({
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
				parseHTML: (e) => jD(e),
				renderHTML: (e) => e.marginClass ? { class: e.marginClass } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBlockMarginClass: (e) => ({ editor: t, commands: n }) => {
				let r = e || null;
				return FD(t) ? n.updateAttributes("image", { marginClass: r }) : t.isActive("blockquote") ? n.updateAttributes("blockquote", { marginClass: r }) : t.isActive("heading") ? n.updateAttributes("heading", { marginClass: r }) : n.updateAttributes("paragraph", { marginClass: r });
			},
			unsetBlockMarginClass: () => ({ editor: e, commands: t }) => FD(e) ? t.resetAttributes("image", "marginClass") : e.isActive("blockquote") ? t.resetAttributes("blockquote", "marginClass") : e.isActive("heading") ? t.resetAttributes("heading", "marginClass") : t.resetAttributes("paragraph", "marginClass")
		};
	}
}), KD = Y.create({
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
				parseHTML: (e) => MD(e),
				renderHTML: (e) => e.paddingClass ? { class: e.paddingClass } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBlockPaddingClass: (e) => ({ editor: t, commands: n }) => {
				let r = e || null;
				return FD(t) ? n.updateAttributes("image", { paddingClass: r }) : t.isActive("blockquote") ? n.updateAttributes("blockquote", { paddingClass: r }) : t.isActive("heading") ? n.updateAttributes("heading", { paddingClass: r }) : n.updateAttributes("paragraph", { paddingClass: r });
			},
			unsetBlockPaddingClass: () => ({ editor: e, commands: t }) => FD(e) ? t.resetAttributes("image", "paddingClass") : e.isActive("blockquote") ? t.resetAttributes("blockquote", "paddingClass") : e.isActive("heading") ? t.resetAttributes("heading", "paddingClass") : t.resetAttributes("paragraph", "paddingClass")
		};
	}
}), qD = Y.create({
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
				parseHTML: (e) => PD(e),
				renderHTML: (e) => e.floatClass ? { class: e.floatClass } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBlockFloatClass: (e) => ({ editor: t, commands: n }) => {
				let r = e || null;
				return FD(t) ? n.updateAttributes("image", { floatClass: r }) : t.isActive("blockquote") ? n.updateAttributes("blockquote", { floatClass: r }) : t.isActive("heading") ? n.updateAttributes("heading", { floatClass: r }) : n.updateAttributes("paragraph", { floatClass: r });
			},
			unsetBlockFloatClass: () => ({ editor: e, commands: t }) => FD(e) ? t.resetAttributes("image", "floatClass") : e.isActive("blockquote") ? t.resetAttributes("blockquote", "floatClass") : e.isActive("heading") ? t.resetAttributes("heading", "floatClass") : t.resetAttributes("paragraph", "floatClass")
		};
	}
}), JD = SD, YD = CD, XD = wD, ZD = OD, QD = TD, $D = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
};
//#endregion
//#region src/components/VuAdminHtmlEditor.vue
function eO(e) {
	let t = (e || "").trim();
	if (!t || t === "<p></p>" || t === "<p><br></p>") return "";
	let n = document.createElement("div");
	return n.innerHTML = t, !(n.textContent || "").replace(/\u00a0/g, " ").trim() && !n.querySelector("img, iframe, video, hr, table") ? "" : t;
}
function tO(e) {
	return [...e].sort((e, t) => e.key === "default" ? -1 : t.key === "default" ? 1 : String(e.key).localeCompare(String(t.key)));
}
function nO(e, t) {
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
var rO = {
	components: { EditorContent: nS },
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
			textColorVariants: JD,
			bgVariants: YD,
			marginClasses: XD,
			paddingClasses: ZD,
			imgUtilityClasses: DD,
			floatClasses: ED,
			alertVariants: QD
		};
	},
	computed: {
		imageModalTitle() {
			return this.imageModalMode === "edit" ? this.translate("Edit image") : this.translate("Insert image");
		},
		placeholderText() {
			return this.tiptapOptions && this.tiptapOptions.placeholder || "";
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
						let n = tO(t), o = e.types[a], s = o && (o.url || o.data) || n[0].src, c = typeof i.label == "string" && i.label ? i.label : i.name, l = i.params && Array.isArray(i.params.tags) ? i.params.tags : [];
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
			return e instanceof W && e.node.type.name === "image" ? e.node.attrs.marginClass || null : this.editor.isActive("blockquote") ? this.editor.getAttributes("blockquote").marginClass || null : this.editor.isActive("heading") ? this.editor.getAttributes("heading").marginClass || null : this.editor.getAttributes("paragraph").marginClass || null;
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
			return e instanceof W && e.node.type.name === "image" ? e.node.attrs.paddingClass || null : this.editor.isActive("blockquote") ? this.editor.getAttributes("blockquote").paddingClass || null : this.editor.isActive("heading") ? this.editor.getAttributes("heading").paddingClass || null : this.editor.getAttributes("paragraph").paddingClass || null;
		},
		blockFloatCurrent() {
			if (!this.editor) return null;
			let e = this.editor.state.selection;
			return e instanceof W && e.node.type.name === "image" ? e.node.attrs.floatClass || null : this.editor.isActive("blockquote") ? this.editor.getAttributes("blockquote").floatClass || null : this.editor.isActive("heading") ? this.editor.getAttributes("heading").floatClass || null : this.editor.getAttributes("paragraph").floatClass || null;
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
			t !== eO(this.editor.getHTML()) && this.editor.commands.setContent(t || "<p></p>", !1);
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
			return el(e, this.formSettings && this.formSettings.translate, t, n ?? (this.formSettings && this.formSettings.language));
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
			!this.editor || !this.editor.isActive("blockquote") || this.editor.chain().focus().updateAttributes("blockquote", { variant: e }).run();
		},
		setLinkButtonClass(e) {
			!this.editor || !this.editor.isActive("link") || this.editor.chain().focus().extendMarkRange("link").updateAttributes({ class: e || null }).run();
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
			return t instanceof W && t.node.type.name === "image" ? t.from : null;
		},
		syncSelectedImageFromEditor() {
			if (!this.editor) return;
			let e = this.getImageSelectionPos(this.editor.state);
			e !== this.selectedImagePos && (this.selectedImagePos = e);
		},
		applyImageAttrsAt(e) {
			if (!this.editor || e == null) return;
			let t = this.getImageAttrsFromForm();
			this.editor.chain().focus().setNodeSelection(e).updateAttributes("image", t).run();
		},
		deleteSelectedImageAt(e) {
			!this.editor || e == null || (this.editor.chain().focus().setNodeSelection(e).deleteSelection().run(), this.selectedImagePos === e && (this.selectedImagePos = null));
		},
		createEditor(e) {
			let t = e || "<p></p>", n = [
				gD.configure({
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
				Uw.configure({
					openOnClick: !1,
					autolink: !0,
					defaultProtocol: "https",
					HTMLAttributes: {
						target: "_blank",
						rel: "noopener noreferrer nofollow",
						class: null
					}
				}),
				RD,
				zD,
				BD,
				VD,
				HD,
				LD.configure({
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
				UD,
				WD,
				GD.configure({ types: [
					"paragraph",
					"heading",
					"blockquote",
					"image"
				] }),
				KD.configure({ types: [
					"paragraph",
					"heading",
					"blockquote",
					"image"
				] }),
				qD.configure({ types: [
					"paragraph",
					"heading",
					"blockquote",
					"image"
				] }),
				ID.configure({
					inline: !1,
					allowBase64: !0
				})
			];
			this.placeholderText && n.push(_D.configure({
				placeholder: this.placeholderText,
				showOnlyWhenEditable: !0,
				showOnlyCurrent: !1
			})), this.editor = new tS({
				content: t,
				extensions: n,
				editorProps: {
					attributes: {
						class: "tiptap-editor form-control",
						spellcheck: "true"
					},
					handleDOMEvents: {
						click: (e, t) => {
							let n = t.target;
							if (!e.editable || !(n instanceof Element) || n.tagName !== "IMG") return !1;
							let r = e.dom.querySelector?.(".ProseMirror");
							if (!r || !r.contains(n)) return !1;
							let i = e.posAtDOM(n, 0);
							if (i == null || i < 0) return !1;
							let a = e.state.doc.nodeAt(i);
							return !a || a.type.name !== "image" ? !1 : (e.dispatch(e.state.tr.setSelection(W.create(e.state.doc, i))), e.focus(), !0);
						},
						dblclick: (e, t) => {
							let n = t.target;
							if (!e.editable || !(n instanceof Element) || n.tagName !== "IMG") return !1;
							let r = e.dom.querySelector?.(".ProseMirror");
							if (!r || !r.contains(n)) return !1;
							let i = e.posAtDOM(n, 0);
							if (i == null || i < 0) return !1;
							let a = e.state.doc.nodeAt(i);
							return !a || a.type.name !== "image" ? !1 : (e.dispatch(e.state.tr.setSelection(W.create(e.state.doc, i))), e.focus(), this.openImageModal("edit", i), !0);
						}
					}
				},
				onUpdate: () => {
					let e = eO(this.editor.getHTML());
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
		recreateEditor() {
			let e = this.editor ? this.editor.getHTML() : this.modelValue || "";
			this.editor?.destroy(), this.editor = null, this.selectedImagePos = null, this.imageEditForm = {
				alt: "",
				width: "",
				height: "",
				imgClass: ""
			}, this.$nextTick(() => {
				this.createEditor(eO(e));
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
			let t = eO(this.editor.getHTML());
			this.$emit("update:modelValue", t), this.closeHtmlSourceModal(), this.editor.chain().focus().run();
		},
		toggleLink() {
			if (!this.editor) return;
			let e = this.editor.getAttributes("link").href, t = window.prompt(this.translate("Link URL:"), e || "https://");
			if (t !== null) {
				if (t === "") {
					this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
					return;
				}
				this.editor.chain().focus().extendMarkRange("link").setLink({ href: t }).run();
			}
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
				let n = this.findGalleryMatchForSrc(t), r = e.attrs.alt && String(e.attrs.alt).trim() || "", i = n ? nO(n.entry.file, n.entry.tagOptions) : "";
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
			let n = nO(e.file, e.tagOptions);
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
			!this.editor || this.editingImagePos == null || (this.deleteSelectedImageAt(this.editingImagePos), this.closeImageModal());
		}
	}
}, iO = {
	key: 0,
	class: "tiptap-toolbar btn-toolbar flex-wrap gap-1 mb-1",
	role: "toolbar"
}, aO = { class: "btn-group btn-group-sm" }, oO = ["title"], sO = ["title"], cO = ["title"], lO = ["title"], uO = { class: "btn-group btn-group-sm" }, dO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, fO = { class: "dropdown-menu dropdown-menu-end" }, pO = ["onClick"], mO = { class: "btn-group btn-group-sm" }, hO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, gO = { class: "dropdown-menu dropdown-menu-end" }, _O = { class: "btn-group btn-group-sm" }, vO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, yO = { class: "dropdown-menu dropdown-menu-end" }, bO = { class: "btn-group btn-group-sm" }, xO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, SO = { class: "dropdown-menu dropdown-menu-end" }, CO = ["onClick"], wO = { class: "btn-group btn-group-sm" }, TO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, EO = { class: "dropdown-menu dropdown-menu-end" }, DO = ["onClick"], OO = { class: "btn-group btn-group-sm" }, kO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, AO = { class: "dropdown-menu dropdown-menu-end" }, jO = ["onClick"], MO = { class: "btn-group btn-group-sm" }, NO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, PO = { class: "dropdown-menu dropdown-menu-end" }, FO = ["onClick"], IO = { class: "btn-group btn-group-sm" }, LO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, RO = { class: "dropdown-menu dropdown-menu-end" }, zO = ["onClick"], BO = {
	key: 0,
	class: "btn-group btn-group-sm"
}, VO = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, HO = { class: "dropdown-menu dropdown-menu-end" }, UO = ["onClick"], WO = {
	class: "btn-group btn-group-sm",
	role: "group"
}, GO = ["title"], KO = ["title"], qO = ["disabled"], JO = { class: "dropdown-menu dropdown-menu-end" }, YO = { class: "btn-group btn-group-sm" }, XO = ["title"], ZO = { class: "btn-group btn-group-sm" }, QO = ["title"], $O = { class: "btn-group btn-group-sm" }, ek = ["title"], tk = ["title"], nk = { class: "tiptap-modal-header" }, rk = { class: "mb-0" }, ik = ["aria-label"], ak = { class: "tiptap-modal-body" }, ok = { class: "row g-2 mb-3" }, sk = { class: "col-12 col-md-5" }, ck = { class: "form-label small text-secondary mb-0" }, lk = ["placeholder"], uk = { class: "col-6 col-md-3" }, dk = { class: "form-label small text-secondary mb-0" }, fk = ["placeholder"], pk = { class: "col-6 col-md-3" }, mk = { class: "form-label small text-secondary mb-0" }, hk = ["placeholder"], gk = { class: "col-12 mt-2" }, _k = { class: "form-label small text-secondary mb-1" }, vk = { class: "d-flex flex-wrap gap-2 align-items-center" }, yk = [
	"id",
	"checked",
	"onChange"
], bk = ["for"], xk = {
	key: 0,
	class: "text-secondary small mb-3"
}, Sk = {
	key: 1,
	class: "text-secondary small mb-2"
}, Ck = {
	key: 2,
	class: "row g-2 mb-3"
}, wk = ["onClick"], Tk = ["src", "alt"], Ek = ["title"], Dk = {
	class: "text-muted",
	style: { "font-size": "0.7rem" }
}, Ok = {
	key: 3,
	class: "mb-3"
}, kk = { class: "form-label small text-secondary mb-1" }, Ak = { class: "d-flex flex-wrap gap-1" }, jk = ["onClick"], Mk = { class: "border-top pt-3 mt-1" }, Nk = { class: "form-label small text-secondary" }, Pk = { class: "input-group input-group-sm" }, Fk = ["placeholder"], Ik = { class: "tiptap-modal-footer" }, Lk = ["disabled"], Rk = { class: "tiptap-modal-header" }, zk = { class: "mb-0" }, Bk = ["aria-label"], Vk = { class: "tiptap-modal-body" }, Hk = { class: "tiptap-modal-footer" };
function Uk(t, o, s, c, l, u) {
	let d = b("editor-content");
	return _(), i("div", { class: m(["tiptap-html-editor", [t.$attrs.class]]) }, [
		t.editor ? (_(), i("div", iO, [
			a("span", aO, [
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("bold") }]),
					title: t.translate("Bold"),
					onClick: o[0] ||= (e) => t.editor.chain().focus().toggleBold().run()
				}, "B", 10, oO),
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("italic") }]),
					title: t.translate("Italic"),
					onClick: o[1] ||= (e) => t.editor.chain().focus().toggleItalic().run()
				}, [...o[47] ||= [a("i", null, "I", -1)]], 10, sO),
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("underline") }]),
					title: t.translate("Underline"),
					onClick: o[2] ||= (e) => t.editor.chain().focus().toggleUnderline().run()
				}, [...o[48] ||= [a("u", null, "U", -1)]], 10, cO),
				a("button", {
					type: "button",
					class: m(["btn btn-sm btn-outline-secondary", { active: t.editor.isActive("strike") }]),
					title: t.translate("Strikethrough"),
					onClick: o[3] ||= (e) => t.editor.chain().focus().toggleStrike().run()
				}, [...o[49] ||= [a("s", null, "S", -1)]], 10, lO)
			]),
			a("div", uO, [a("button", dO, x(t.headingDropdownLabel), 1), a("ul", fO, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.editor.isActive("heading") }]),
					onClick: o[4] ||= (e) => t.setHeadingLevel(null)
				}, x(t.translate("Normal text")), 3)]),
				o[50] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.headingLevels, (e) => (_(), i("li", { key: e }, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("heading", { level: e }) }]),
					onClick: (n) => t.setHeadingLevel(e)
				}, " H" + x(e), 11, pO)]))), 128))
			])]),
			a("div", mO, [a("button", hO, x(t.listDropdownLabel), 1), a("ul", gO, [
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
				o[51] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("blockquote") }]),
					onClick: o[7] ||= (e) => t.toggleListType("blockquote")
				}, x(t.translate("Quote")), 3)])
			])]),
			a("div", _O, [a("button", vO, x(t.alignDropdownLabel), 1), a("ul", yO, [
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
			a("div", bO, [a("button", xO, x(t.textColorDropdownLabel), 1), a("ul", SO, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.editor.isActive("textColor") }]),
					onClick: o[12] ||= (e) => t.setTextColorMark(null)
				}, x(t.translate("Default")), 3)]),
				o[52] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.textColorVariants, (e) => (_(), i("li", { key: "tc-" + e }, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("textColor", { variant: e }) }]),
					onClick: (n) => t.setTextColorMark(e)
				}, " text-" + x(e), 11, CO)]))), 128))
			])]),
			a("div", wO, [a("button", TO, x(t.bgColorDropdownLabel), 1), a("ul", EO, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.editor.isActive("backgroundColor") }]),
					onClick: o[13] ||= (e) => t.setBackgroundColorMark(null)
				}, x(t.translate("Default")), 3)]),
				o[53] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.bgVariants, (e) => (_(), i("li", { key: "bg-" + e }, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: t.editor.isActive("backgroundColor", { variant: e }) }]),
					onClick: (n) => t.setBackgroundColorMark(e)
				}, " bg-" + x(e), 11, DO)]))), 128))
			])]),
			a("div", OO, [a("button", kO, x(t.marginDropdownLabel), 1), a("ul", AO, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.blockMarginActive }]),
					onClick: o[14] ||= (e) => t.setBlockMarginCls("")
				}, x(t.translate("Default")), 3)]),
				o[54] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.marginClasses, (e) => (_(), i("li", { key: "mg-" + (e || "none") }, [e ? (_(), i("button", {
					key: 0,
					type: "button",
					class: m(["dropdown-item font-monospace small", { active: t.blockMarginIs(e) }]),
					onClick: (n) => t.setBlockMarginCls(e)
				}, x(e), 11, jO)) : r("", !0)]))), 128))
			])]),
			a("div", MO, [a("button", NO, x(t.paddingDropdownLabel), 1), a("ul", PO, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.blockPaddingActive }]),
					onClick: o[15] ||= (e) => t.setBlockPaddingCls("")
				}, x(t.translate("Default")), 3)]),
				o[55] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.paddingClasses, (e) => (_(), i("li", { key: "pd-" + (e || "none") }, [e ? (_(), i("button", {
					key: 0,
					type: "button",
					class: m(["dropdown-item font-monospace small", { active: t.blockPaddingIs(e) }]),
					onClick: (n) => t.setBlockPaddingCls(e)
				}, x(e), 11, FO)) : r("", !0)]))), 128))
			])]),
			a("div", IO, [a("button", LO, x(t.floatDropdownLabel), 1), a("ul", RO, [
				a("li", null, [a("button", {
					type: "button",
					class: m(["dropdown-item", { active: !t.blockFloatActive }]),
					onClick: o[16] ||= (e) => t.setBlockFloatCls("")
				}, x(t.translate("Default")), 3)]),
				o[56] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				(_(!0), i(e, null, y(t.floatClasses, (e) => (_(), i("li", { key: "fl-" + e }, [a("button", {
					type: "button",
					class: m(["dropdown-item font-monospace small", { active: t.blockFloatIs(e) }]),
					onClick: (n) => t.setBlockFloatCls(e)
				}, x(e), 11, zO)]))), 128))
			])]),
			t.editor.isActive("blockquote") ? (_(), i("div", BO, [a("button", VO, x(t.alertVariantDropdownLabel), 1), a("ul", HO, [(_(!0), i(e, null, y(t.alertVariants, (e) => (_(), i("li", { key: "al-" + e }, [a("button", {
				type: "button",
				class: m(["dropdown-item", { active: t.editor.isActive("blockquote", { variant: e }) }]),
				onClick: (n) => t.setAlertVariant(e)
			}, " alert-" + x(e), 11, UO)]))), 128))])])) : r("", !0),
			a("div", WO, [
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary",
					title: t.translate("Link"),
					onClick: o[17] ||= (...e) => t.toggleLink && t.toggleLink(...e)
				}, "🔗", 8, GO),
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary",
					title: t.translate("Remove link"),
					onClick: o[18] ||= (e) => t.editor.chain().focus().unsetLink().run()
				}, "✕", 8, KO),
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary dropdown-toggle",
					"data-bs-toggle": "dropdown",
					"data-bs-auto-close": "true",
					"aria-expanded": "false",
					disabled: !t.editor.isActive("link")
				}, x(t.linkStyleDropdownLabel), 9, qO),
				a("ul", JO, [
					a("li", null, [a("button", {
						type: "button",
						class: m(["dropdown-item", { active: !t.linkHasButtonClass }]),
						onClick: o[19] ||= (e) => t.setLinkButtonClass(null)
					}, x(t.translate("Default")), 3)]),
					o[57] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
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
			a("span", YO, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: t.selectedImagePos === null ? t.translate("Insert image") : t.translate("Edit image"),
				onClick: o[25] ||= (...e) => t.openImageModalFromToolbar && t.openImageModalFromToolbar(...e)
			}, "🖼", 8, XO)]),
			a("span", ZO, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary font-monospace small",
				title: t.translate("HTML source"),
				onClick: o[26] ||= (...e) => t.openHtmlSourceModal && t.openHtmlSourceModal(...e)
			}, "HTML", 8, QO)]),
			a("span", $O, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: t.translate("Undo"),
				onClick: o[27] ||= (e) => t.editor.chain().focus().undo().run()
			}, "↶", 8, ek), a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: t.translate("Redo"),
				onClick: o[28] ||= (e) => t.editor.chain().focus().redo().run()
			}, "↷", 8, tk)])
		])) : r("", !0),
		t.editor ? (_(), n(d, {
			key: 1,
			editor: t.editor,
			class: "tiptap-content-wrap"
		}, null, 8, ["editor"])) : r("", !0),
		t.imageModalOpen ? (_(), i("div", {
			key: 2,
			class: "tiptap-modal-overlay",
			onClick: o[40] ||= O((...e) => t.closeImageModal && t.closeImageModal(...e), ["self"])
		}, [a("div", {
			class: "tiptap-modal-content",
			onClick: o[39] ||= O(() => {}, ["stop"])
		}, [
			a("div", nk, [a("h5", rk, x(t.imageModalTitle), 1), a("button", {
				type: "button",
				class: "btn-close",
				"aria-label": t.translate("Close"),
				onClick: o[29] ||= (...e) => t.closeImageModal && t.closeImageModal(...e)
			}, null, 8, ik)]),
			a("div", ak, [
				a("div", ok, [
					a("div", sk, [a("label", ck, x(t.translate("Alt text")), 1), D(a("input", {
						"onUpdate:modelValue": o[30] ||= (e) => t.imageEditForm.alt = e,
						type: "text",
						class: "form-control form-control-sm",
						placeholder: t.translate("Description for the image")
					}, null, 8, lk), [[E, t.imageEditForm.alt]])]),
					a("div", uk, [a("label", dk, x(t.translate("Width (px)")), 1), D(a("input", {
						"onUpdate:modelValue": o[31] ||= (e) => t.imageEditForm.width = e,
						type: "number",
						min: "1",
						class: "form-control form-control-sm",
						placeholder: t.translate("auto")
					}, null, 8, fk), [[E, t.imageEditForm.width]])]),
					a("div", pk, [a("label", mk, x(t.translate("Height (px)")), 1), D(a("input", {
						"onUpdate:modelValue": o[32] ||= (e) => t.imageEditForm.height = e,
						type: "number",
						min: "1",
						class: "form-control form-control-sm",
						placeholder: t.translate("auto")
					}, null, 8, hk), [[E, t.imageEditForm.height]])]),
					a("div", gk, [a("label", _k, x(t.translate("Image Bootstrap classes")), 1), a("div", vk, [(_(!0), i(e, null, y(t.imgUtilityClasses, (e) => (_(), i("div", {
						key: "imgc-" + e,
						class: "form-check form-check-inline mb-0"
					}, [a("input", {
						id: "tiptap-imgcls-" + e,
						class: "form-check-input",
						type: "checkbox",
						checked: t.imageHasUtilityClass(e),
						onChange: (n) => t.toggleImageUtilityClass(e)
					}, null, 40, yk), a("label", {
						class: "form-check-label small font-monospace",
						for: "tiptap-imgcls-" + e
					}, x(e), 9, bk)]))), 128))])])
				]),
				t.imageModalMode === "insert" && !t.imageGalleryEntries.length ? (_(), i("p", xk, x(t.translate("No images in form fields yet. Upload an image or enter an image URL below.")), 1)) : t.imageModalMode === "edit" && !t.imageGalleryEntries.length ? (_(), i("p", Sk, x(t.translate("No images in form. You can edit the source in the URL field.")), 1)) : r("", !0),
				t.imageGalleryEntries.length ? (_(), i("div", Ck, [(_(!0), i(e, null, y(t.imageGalleryEntries, (e) => (_(), i("div", {
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
					}, null, 8, Tk),
					a("div", {
						class: "small text-truncate",
						title: e.fileTitle
					}, x(e.fileTitle), 9, Ek),
					a("div", Dk, x(e.fieldLabel), 1)
				], 10, wk)]))), 128))])) : r("", !0),
				t.selectedGalleryEntry && t.selectedGalleryEntry.presets.length ? (_(), i("div", Ok, [a("label", kk, x(t.translate("Preset (size / format)")), 1), a("div", Ak, [(_(!0), i(e, null, y(t.selectedGalleryEntry.presets, (e) => (_(), i("button", {
					key: e.key,
					type: "button",
					class: m(["btn btn-sm", t.selectedPresetKey === e.key ? "btn-primary" : "btn-outline-secondary"]),
					onClick: (n) => {
						t.selectedPresetKey = e.key, t.syncManualFromPreset();
					}
				}, x(e.key), 11, jk))), 128))])])) : r("", !0),
				a("div", Mk, [a("label", Nk, x(t.translate("Image URL")), 1), a("div", Pk, [D(a("input", {
					"onUpdate:modelValue": o[33] ||= (e) => t.manualImageUrl = e,
					type: "text",
					class: "form-control font-monospace",
					placeholder: t.translate("https:// or data: URL"),
					onKeydown: o[34] ||= ne(O((...e) => t.confirmImageModalPrimary && t.confirmImageModalPrimary(...e), ["prevent"]), ["enter"])
				}, null, 40, Fk), [[E, t.manualImageUrl]]), t.imageModalMode === "insert" ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-secondary",
					onClick: o[35] ||= (...e) => t.insertFromModalUrlOnly && t.insertFromModalUrlOnly(...e)
				}, x(t.translate("URL only")), 1)) : r("", !0)])])
			]),
			a("div", Ik, [
				t.imageModalMode === "edit" ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-danger me-auto",
					onClick: o[36] ||= (...e) => t.deleteImageFromModal && t.deleteImageFromModal(...e)
				}, x(t.translate("Delete image")), 1)) : r("", !0),
				a("button", {
					type: "button",
					class: "btn btn-secondary",
					onClick: o[37] ||= (...e) => t.closeImageModal && t.closeImageModal(...e)
				}, x(t.translate("Cancel")), 1),
				a("button", {
					type: "button",
					class: "btn btn-primary",
					disabled: !t.canConfirmImageModal,
					onClick: o[38] ||= (...e) => t.confirmImageModalPrimary && t.confirmImageModalPrimary(...e)
				}, x(t.imageModalMode === "edit" ? t.translate("Save") : t.translate("Insert")), 9, Lk)
			])
		])])) : r("", !0),
		t.htmlSourceModalOpen ? (_(), i("div", {
			key: 3,
			class: "tiptap-modal-overlay",
			onClick: o[46] ||= O((...e) => t.closeHtmlSourceModal && t.closeHtmlSourceModal(...e), ["self"])
		}, [a("div", {
			class: "tiptap-modal-content tiptap-html-modal-wide",
			onClick: o[45] ||= O(() => {}, ["stop"])
		}, [
			a("div", Rk, [a("h5", zk, x(t.translate("HTML source")), 1), a("button", {
				type: "button",
				class: "btn-close",
				"aria-label": t.translate("Close"),
				onClick: o[41] ||= (...e) => t.closeHtmlSourceModal && t.closeHtmlSourceModal(...e)
			}, null, 8, Bk)]),
			a("div", Vk, [D(a("textarea", {
				ref: "htmlSourceTextarea",
				"onUpdate:modelValue": o[42] ||= (e) => t.htmlSourceText = e,
				class: "form-control font-monospace tiptap-html-source",
				rows: "18",
				spellcheck: "false"
			}, null, 512), [[E, t.htmlSourceText]])]),
			a("div", Hk, [a("button", {
				type: "button",
				class: "btn btn-secondary",
				onClick: o[43] ||= (...e) => t.closeHtmlSourceModal && t.closeHtmlSourceModal(...e)
			}, x(t.translate("Cancel")), 1), a("button", {
				type: "button",
				class: "btn btn-primary",
				onClick: o[44] ||= (...e) => t.applyHtmlSource && t.applyHtmlSource(...e)
			}, x(t.translate("Apply")), 1)])
		])])) : r("", !0)
	], 2);
}
var Wk = /*#__PURE__*/ $D(rO, [["render", Uk]]), Gk = {
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
				if (e.url) {
					window.open(e.url, "_blank", "noopener,noreferrer");
					return;
				}
				if (e.data) {
					let t = window.open("", "_blank", "noopener,noreferrer");
					t && (t.document.write("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Preview</title></head><body style=\"margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh\"><img src=\"" + e.data.replace(/"/g, "&quot;") + "\" style=\"max-width:100%;max-height:100vh;height:auto\" alt=\"\"></body></html>"), t.document.close());
					return;
				}
				e.blob && (this.revokeObjectUrl(), this.objectUrl = URL.createObjectURL(e.blob), window.open(this.objectUrl, "_blank", "noopener,noreferrer"));
			}
		}
	}
}, Kk = {
	key: 0,
	class: "table table-sm w-100 vsa-file-info"
}, qk = { class: "text-nowrap text-center" }, Jk = { class: "text-center" }, Yk = { class: "text-nowrap text-end" }, Xk = ["innerHTML"], Zk = { class: "text-end" }, Qk = [
	"onMouseenter",
	"onClick",
	"onKeydown"
], $k = { class: "text-nowrap text-center" }, eA = { class: "text-center" }, tA = { class: "text-end" }, nA = ["innerHTML"], rA = { class: "text-end" }, iA = {
	key: 0,
	class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, aA = { colspan: "3" }, oA = { class: "text-end" }, sA = ["innerHTML"], cA = { class: "d-flex justify-content-between text-nowrap" }, lA = { class: "d-flex justify-content-between text-nowrap" }, uA = { class: "text-muted fw-light me-3" }, dA = {
	key: 1,
	class: "d-flex justify-content-between"
}, fA = ["src", "alt"], pA = {
	key: 0,
	class: "d-block text-center text-muted mt-1"
};
function mA(s, c, l, u, d, f) {
	return _(), i("div", null, [
		s.file ? (_(), i("table", Kk, [
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
				a("td", qk, x(s.file.original.width) + " x " + x(s.file.original.height), 1),
				a("td", Jk, x(s.file.original.ratio), 1),
				a("td", Yk, [a("span", { innerHTML: s.roundFileSize(s.file.original.bytes, !0) }, null, 8, Xk)]),
				a("td", Zk, x(s.file.original.extension), 1),
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
				}, x(n), 41, Qk)) : (_(), i(e, { key: 1 }, [o(x(n), 1)], 64))]),
				a("td", $k, x(t.width) + " x " + x(t.height), 1),
				a("td", eA, x(t.ratio), 1),
				a("td", tA, [a("span", {
					class: m(["text-nowrap", { "text-danger": t.bytes > s.file.original.bytes }]),
					innerHTML: s.roundFileSize(t.bytes, !0)
				}, null, 10, nA)]),
				a("td", rA, x(t.extension), 1),
				a("td", null, [t.crop ? (_(), i("small", iA, x(t.crop), 1)) : r("", !0)])
			]))), 128))]),
			a("tfoot", null, [a("tr", null, [
				a("td", aA, x(s.file.uploaded ? "uploaded" : "uploading"), 1),
				a("td", oA, [a("span", {
					class: "text-nowrap",
					innerHTML: s.roundFileSize(s.file.bytes, !0)
				}, null, 8, sA)]),
				c[4] ||= a("td", { colspan: "2" }, null, -1)
			])])
		])) : r("", !0),
		a("small", cA, [c[6] ||= a("span", { class: "text-muted fw-light me-3" }, "original filename", -1), o(" " + x(s.file.original.name), 1)]),
		a("small", lA, [
			a("span", uA, x(s.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
			c[7] ||= o(),
			a("span", null, x(s.file.slug), 1)
		]),
		s.file.uploaded ? (_(), i("small", dA, [
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
		}, null, 8, fA), s.preview.label ? (_(), i("small", pA, x(s.preview.label), 1)) : r("", !0)], 4)) : r("", !0)]))
	]);
}
var hA = /*#__PURE__*/ $D(Gk, [["render", mA]]), gA = {
	image: {
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
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
}, _A = {
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
			applyWatermarkOnUpload: !0
		};
	},
	components: { VuAdminFileUploadInfo: hA },
	created() {
		let e = Kc(1e5);
		this.uploadId = "image_upload_" + e, this.params = this.field.params, this.activeLanguage = this.hasLanguages() ? this.params.languages[0] : null;
	},
	mounted() {
		this.editfile = this.modelValue, this.editfile ||= [], document.addEventListener("paste", this.handlePaste);
	},
	beforeUnmount() {
		document.removeEventListener("paste", this.handlePaste), this.setProcessingOverlay(null);
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
			return dl(e, t);
		},
		extensionByFilename(e) {
			return fl(e);
		},
		getAcceptMimeTypes(e) {
			let t = [];
			for (let n in gA) if (gA.hasOwnProperty(n)) {
				let r = gA[n];
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
			!e || typeof e != "object" || (this.params && this.params.tags && !e.tags && (e.tags = []), this.normalizeTitle(e), Ml(e));
		},
		hasLanguages() {
			return !!(this.params && Array.isArray(this.params.languages) && this.params.languages.length > 1);
		},
		primaryLanguage() {
			return this.params.languages[0];
		},
		normalizeTitle(e) {
			if (!(!e || !this.hasLanguages())) {
				(!e.title || typeof e.title != "object") && (e.title = { [this.primaryLanguage()]: e.title || "" });
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
			if (!this.hasLanguages()) {
				e.title = t;
				return;
			}
			this.normalizeTitle(e), e.title[this.activeLanguage] = t;
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
			if (e.uid = Kc(9999999).toString(32) + Date.now().toString(32), e.slug = Xc(this.titleText(e)), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
				bytes: e.size,
				mime: e.type,
				name: e.name,
				modified: e.lastModified,
				extension: this.extensionByFilename(e.name)
			}, Object.values(gA.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(gA.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(gA.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, e.isUnknown) throw Error("Unsupported file type: " + (e.original.mime || e.original.extension));
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
					n.currentTime = n.duration * Gc(), e.video = n;
				}), n.addEventListener("seeked", () => {
					this.forEachPresets(e, n, void 0, { watermark: this.applyWatermarkOnUpload }), e.loaded = !0, this.bytes += e.bytes;
				});
			}, r.readAsDataURL(e);
		},
		seekRandom(e) {
			e.video && (e.video.currentTime = e.video.duration * Gc());
		},
		async handleFileChange(e) {
			this.uploadEvent = e, this.count = this.files ? this.files.length : 0, this.uploadErrors = [];
			try {
				this.setProcessingOverlay(this.translate("Processing files..."));
				for (let t of e.target.files) {
					if (!this.isExtensionAllowed(t)) {
						this.uploadErrors.push(this.translate("File \"{name}\" has a disallowed extension. Allowed extensions: {ext}", {
							name: t.name,
							ext: this.params.accept.join(", ")
						}));
						continue;
					}
					if (this.count++, this.count <= this.params.limit) {
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
										slug: Xc(this.titleText(t)) + "-" + t.uid,
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
				let s = this.params.presets[r];
				s.key = r, s.width = s.width ? s.width : 1920;
				let u = s.width, d = s.height == null ? null : s.height, f;
				if (s.crop === "cover") {
					let e = Math.max(u / c, d / l), n = c * e, r = l * e, i = (n - u) / 2, s = (r - d) / 2;
					a.width = u, a.height = d, o.drawImage(t, -i, -s, n, r), f = {
						x: 0,
						y: 0,
						width: a.width,
						height: a.height
					};
				} else if (s.crop === "contain") {
					let e = Math.min(u / c, d / l), n = c * e, r = l * e, i = (u - n) / 2, s = (d - r) / 2;
					a.width = u, a.height = d, o.clearRect(0, 0, u, d), o.drawImage(t, i, s, n, r), f = {
						x: i,
						y: s,
						width: n,
						height: r
					};
				} else c > u && (l = Math.round(u / c * l), c = u), d != null && l > d && (c = Math.round(d / l * c), l = d), a.width = c, a.height = l, o.drawImage(t, 0, 0, c, l), f = {
					x: 0,
					y: 0,
					width: a.width,
					height: a.height
				};
				i && s.watermark && s.watermark.url && await this.applyWatermark(o, f, s.watermark), e.types[s.key] = {
					width: a.width,
					height: a.height,
					ratio: this.calculateAspectRatio(a.width, a.height),
					extension: s.extension ? s.extension : this.getExtensionByMimeType(e.type),
					quality: s.quality ? s.quality : .9,
					crop: s.crop ? s.crop : null,
					watermarked: !!(s.watermark && s.watermark.url)
				}, e.types[s.key].watermarked && (e.hasWatermark = !0), e.types[s.key].slug = Xc(this.titleText(e)) + "-" + a.width + "x" + a.height + "-" + e.uid, e.types[s.key].mime = this.getMimeTypeByExtension(e.types[s.key].extension), e.types[s.key].data = a.toDataURL(e.types[s.key].mime, e.types[s.key].quality), e.types[s.key].blob = await this.getBlob(a, e.types[s.key].mime, e.types[s.key].quality), e.types[s.key].blob && (e.types[s.key].bytes = e.types[s.key].blob.size), e.types[s.key].bytes && (e.bytes += e.types[s.key].bytes), n && n(s, e);
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
				default:
					u = t.x + t.width - i - o, d = t.y + t.height - a - o;
					break;
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
						slug: Xc(this.titleText(e)) + "-" + e.uid,
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
						slug: Xc(this.titleText(e)) + "-" + t + "-" + e.uid
					};
					e.types.default || (e.types.default = a), e.loaded = !0, e.bytes += e.size, this.bytes += e.bytes, n();
				}), t.readAsDataURL(e);
			});
		},
		fileToBlob(e) {
			return new Promise((t) => {
				let n = new FileReader();
				n.onload = (n) => {
					t(new Blob([n.target.result], { type: e.mime }));
				}, n.readAsArrayBuffer(e);
			});
		},
		slug(e) {
			if (!e.uploaded) {
				e.slug = Xc(this.titleText(e));
				for (let t in e.types) {
					let n = this.params.presets[t];
					e.types[t].slug = Xc(this.titleText(e)) + "-" + n.width + "x" + n.height;
				}
				this.$forceUpdate();
			}
		},
		arrayItemMoveUp(e, t) {
			cl(e, t);
		},
		arrayItemMoveDown(e, t) {
			ll(e, t);
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
				applyWatermark: !1
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
		editorDraw(e = !1) {
			let t = this.$refs.editorCanvas;
			if (!t || !this.editor.imgBitmap) return;
			let n = this.editor.imgBitmap, r = this.editor.rotate, i = r % 180 != 0, a = i ? n.height : n.width, o = i ? n.width : n.height, s = Math.min(window.innerWidth * .9, 1400), c = window.innerHeight * .8, l = Math.min(s / a, c / o, 1);
			this.editor.scale = l, t.width = Math.round(a * l), t.height = Math.round(o * l);
			let u = t.getContext("2d");
			if (u.save(), u.translate(t.width / 2, t.height / 2), u.rotate(r * Math.PI / 180), u.scale(this.editor.flipX ? -1 : 1, this.editor.flipY ? -1 : 1), u.drawImage(n, -n.width * l / 2, -n.height * l / 2, n.width * l, n.height * l), u.restore(), !e && this.editor.cropMode && this.editor.crop) {
				let { x1: e, y1: n, x2: r, y2: i } = this.editor.crop, a = Math.min(e, r), o = Math.min(n, i), s = Math.abs(r - e), c = Math.abs(i - n);
				u.fillStyle = "rgba(0,0,0,0.55)", u.fillRect(0, 0, t.width, o), u.fillRect(0, o, a, c), u.fillRect(a + s, o, t.width - a - s, c), u.fillRect(0, o + c, t.width, t.height - o - c), u.strokeStyle = "rgba(255,255,255,0.9)", u.lineWidth = 1.5, u.setLineDash([5, 3]), u.strokeRect(a + .5, o + .5, s - 1, c - 1), u.setLineDash([]), u.strokeStyle = "rgba(255,255,255,0.25)", u.lineWidth = .5, u.beginPath(), u.moveTo(a + s / 3, o), u.lineTo(a + s / 3, o + c), u.moveTo(a + 2 * s / 3, o), u.lineTo(a + 2 * s / 3, o + c), u.moveTo(a, o + c / 3), u.lineTo(a + s, o + c / 3), u.moveTo(a, o + 2 * c / 3), u.lineTo(a + s, o + 2 * c / 3), u.stroke(), u.fillStyle = "white", [
					[a, o],
					[a + s, o],
					[a, o + c],
					[a + s, o + c]
				].forEach(([e, t]) => {
					u.fillRect(e - 7 / 2, t - 7 / 2, 7, 7);
				});
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
				return;
			}
			this.editor.dragging = !0, this.editor.cropDrag = "new", this.editor.cropAnchor = null, this.editor.crop = {
				x1: t,
				y1: n,
				x2: t,
				y2: n
			};
		},
		editorMouseMove(e) {
			if (!this.editor.cropMode) return;
			let t = this.$refs.editorCanvas;
			if (!t) return;
			let { x: n, y: r } = this.editorCanvasCoords(e);
			if (!this.editor.dragging) {
				let e = this.editorHitCropHandle(n, r);
				t.style.cursor = e ? this.editorHandleCursor(e) : "crosshair";
				return;
			}
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
		},
		editorMouseUp() {
			this.editor.dragging = !1, this.editor.cropDrag = null, this.editor.cropAnchor = null;
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
			this.editor.cropMode = !this.editor.cropMode, this.editor.cropMode || (this.editor.crop = null), this.editorDraw();
		},
		editorCropButtonClick() {
			if (this.editor.cropMode && this.hasValidCrop(this.editor.crop)) {
				this.editorApplyCrop();
				return;
			}
			this.editorToggleCrop();
		},
		editorRenderSource() {
			let e = this.editor.imgBitmap;
			if (!e) return null;
			let { rotate: t, flipX: n, flipY: r, crop: i } = this.editor, a = this.editor.scale || 1, o = t % 180 != 0, s = o ? e.height : e.width, c = o ? e.width : e.height, l = document.createElement("canvas");
			l.width = s, l.height = c;
			let u = l.getContext("2d");
			if (u.translate(s / 2, c / 2), u.rotate(t * Math.PI / 180), u.scale(n ? -1 : 1, r ? -1 : 1), u.drawImage(e, -e.width / 2, -e.height / 2), !this.hasValidCrop(i)) return l;
			let d = Math.max(0, Math.round(Math.min(i.x1, i.x2) / a)), f = Math.max(0, Math.round(Math.min(i.y1, i.y2) / a)), p = Math.min(s - d, Math.max(1, Math.round(Math.abs(i.x2 - i.x1) / a))), m = Math.min(c - f, Math.max(1, Math.round(Math.abs(i.y2 - i.y1) / a))), h = document.createElement("canvas");
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
			for (let t in gA) if (gA.hasOwnProperty(t)) {
				let n = gA[t];
				if (n[e]) return n[e];
			}
			return null;
		},
		getExtensionByMimeType(e) {
			for (let t in gA) if (gA.hasOwnProperty(t)) {
				let n = gA[t];
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
			return el(e, this.settings.translate, t, n || this.settings.language);
		},
		dropdownSelectToggleOne(e, t) {
			il(e, t), this.$forceUpdate();
		},
		dropdownSelectAll(e, t) {
			al(e, t), this.$forceUpdate();
		},
		dropdownSelectInvert(e, t) {
			ol(e, t), this.$forceUpdate();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? sl(e) : e.value = null, this.$forceUpdate();
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
}, vA = { class: "" }, yA = {
	key: 0,
	class: "vsa-image-editor p-2 text-center"
}, bA = { class: "row" }, xA = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, SA = { class: "badge bg-dark text-light fw-light mx-1" }, CA = { class: "badge bg-dark text-light fw-light mx-1" }, wA = ["src"], TA = { class: "row g-1" }, EA = { class: "col-md-6" }, DA = { class: "col-md-6" }, OA = { class: "col-md-6" }, kA = ["href"], AA = {
	key: 1,
	class: "alert alert-danger alert-dismissible py-2 px-3 mb-2",
	role: "alert"
}, jA = ["aria-label"], MA = {
	key: 2,
	class: "row g-2 mb-1"
}, NA = { key: 0 }, PA = { class: "table table-sm table-responsive table-borderless" }, FA = [
	"onDragstart",
	"onDragover",
	"onDrop"
], IA = { class: "align-middle px-0" }, LA = { class: "input-group border" }, RA = [
	"max",
	"value",
	"onChange"
], zA = {
	key: 0,
	class: "fs-5 mx-2"
}, BA = {
	key: 1,
	class: "fs-5 mx-2"
}, VA = {
	key: 2,
	class: "fs-5 mx-2"
}, HA = ["title"], UA = ["value", "onInput"], WA = {
	key: 4,
	class: "mx-0"
}, GA = ["href"], KA = ["src", "alt"], qA = ["src", "alt"], JA = {
	key: 5,
	class: "dropdown rounded-bottom"
}, YA = {
	class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, XA = { class: "text-nowrap" }, ZA = { class: "dropdown-menu" }, QA = ["onClick"], $A = {
	key: 0,
	class: "bi bi-check-square"
}, ej = {
	key: 1,
	class: "bi bi-square"
}, tj = ["onClick"], nj = ["onClick"], rj = ["onClick"], ij = { class: "dropdown" }, aj = { class: "dropdown-menu vsa-file-actions-menu" }, oj = { class: "px-2 pt-2 pb-0" }, sj = { class: "d-flex gap-1" }, cj = ["onClick", "title"], lj = ["onClick", "title"], uj = { class: "p-2 pt-0" }, dj = { class: "fw-light" }, fj = [
	"onDragstart",
	"onDragover",
	"onDrop"
], pj = {
	key: 0,
	class: "w-100 h-100 d-flex align-items-center flex-column"
}, mj = {
	key: 1,
	class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, hj = ["href"], gj = ["src", "alt"], _j = ["src", "alt"], vj = {
	key: 2,
	class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, yj = {
	key: 3,
	class: "input-group"
}, bj = ["title"], xj = ["value", "onInput"], Sj = ["onUpdate:modelValue", "onInput"], Cj = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, wj = [
	"max",
	"value",
	"onChange"
], Tj = {
	key: 0,
	class: "dropdown border border-end-0 h-100 w-100"
}, Ej = {
	class: "btn btn-sm rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, Dj = { class: "text-nowrap" }, Oj = { class: "dropdown-menu" }, kj = ["onClick"], Aj = {
	key: 0,
	class: "bi bi-check-square"
}, jj = {
	key: 1,
	class: "bi bi-square"
}, Mj = ["onClick"], Nj = ["onClick"], Pj = ["onClick"], Fj = { class: "dropdown border h-100 w-100" }, Ij = { class: "dropdown-menu vsa-file-actions-menu" }, Lj = { class: "px-2 pt-2 pb-0" }, Rj = { class: "d-flex gap-1" }, zj = ["onClick", "title"], Bj = ["onClick", "title"], Vj = { class: "p-2 pt-0" }, Hj = { class: "fw-light" }, Uj = {
	key: 1,
	class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, Wj = { class: "row g-1" }, Gj = { class: "col-12 d-flex align-items-center justify-content-center" }, Kj = ["for"], qj = { key: 0 }, Jj = { key: 0 }, Yj = { class: "" }, Xj = { class: "" }, Zj = {
	key: 1,
	class: "fs-6"
}, Qj = {
	key: 0,
	class: "bi bi-list-ol"
}, $j = {
	key: 1,
	class: "bi bi-grid"
}, eM = ["disabled"], tM = { class: "col-12 text-center" }, nM = { key: 0 }, rM = {
	key: 2,
	class: "form-check form-switch d-inline-flex align-items-center mt-1"
}, iM = ["id"], aM = ["for"], oM = ["id", "accept"], sM = { class: "vsa-editor-toolbar d-flex align-items-center flex-wrap gap-1 p-2 bg-dark border-bottom border-secondary" }, cM = {
	key: 0,
	class: "ms-1 small"
}, lM = { class: "form-check form-switch d-inline-flex align-items-center text-light" }, uM = {
	class: "form-check-label ms-1",
	for: "editor_apply_watermark"
}, dM = { class: "ms-auto d-flex gap-2" }, fM = {
	key: 0,
	class: "alert alert-warning py-1 px-2 mb-0 rounded-0 small text-center",
	role: "alert"
}, pM = { class: "vsa-editor-canvas-area d-flex align-items-center justify-content-center flex-grow-1" };
function mM(t, n, c, l, u, d) {
	let f = b("VuAdminFileUploadInfo");
	return _(), i("div", vA, [a("div", { class: m(["vsa-upload", { wait: t.wait }]) }, [
		t.editfile && t.editfile.presets ? (_(), i("div", yA, [
			a("div", bA, [(_(!0), i(e, null, y(t.editfile.types, (e, n) => (_(), i("div", {
				class: "col-md-3",
				key: n
			}, [
				a("span", xA, x(e.extension), 1),
				a("span", SA, x(e.width) + " x " + x(e.height), 1),
				a("span", CA, "~" + x(t.roundFileSize(e.bytes)), 1),
				e ? (_(), i("img", {
					key: 0,
					class: "img-thumbnail rounded",
					src: e.url ? e.url : e.data
				}, null, 8, wA)) : r("", !0)
			]))), 128))]),
			D(a("input", {
				type: "text",
				class: "form-control form-control-sm w-100 mt-1",
				"onUpdate:modelValue": n[0] ||= (e) => t.editfile.title = e
			}, null, 512), [[E, t.editfile.title]]),
			a("div", TA, [
				a("div", EA, [a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: n[1] ||= (e) => t.editfile = null
				}, " Close ")]),
				a("div", DA, [a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: n[2] ||= (e) => t.remove(t.index)
				}, " Remove ")]),
				a("div", OA, [t.type && !t.type.url ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					onClick: n[3] ||= (e) => t.download(t.index, t.params)
				}, " Download ")) : r("", !0), t.type && t.type.url ? (_(), i("a", {
					key: 1,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					href: t.type.url
				}, " Download ", 8, kA)) : r("", !0)])
			])
		])) : r("", !0),
		t.uploadErrors && t.uploadErrors.length ? (_(), i("div", AA, [(_(!0), i(e, null, y(t.uploadErrors, (e, t) => (_(), i("div", {
			key: t,
			class: "small"
		}, x(e), 1))), 128)), a("button", {
			type: "button",
			class: "btn-close",
			"aria-label": t.translate("Bezárás"),
			onClick: n[4] ||= (e) => t.uploadErrors = []
		}, null, 8, jA)])) : r("", !0),
		t.files && t.files.length ? (_(), i("div", MA, [t.params.ui === "list" ? (_(), i("div", NA, [a("table", PA, [a("tbody", null, [(_(!0), i(e, null, y(t.files, (c, l) => (_(), i("tr", {
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
		}, [a("td", IA, [a("div", LA, [
			n[44] ||= a("span", {
				class: "cursor-move p-1 px-2 border-end d-flex align-items-center",
				title: "Húzd a sorrendezéshez"
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
			}, null, 40, RA),
			c.isDocument ? (_(), i("span", zA, [a("i", { class: m(["bi bi-filetype-" + c.types.default.extension]) }, null, 2)])) : c.isImage ? (_(), i("span", BA, [...n[36] ||= [a("i", { class: "bi bi-file-image" }, null, -1)]])) : c.isVideo ? (_(), i("span", VA, [...n[37] ||= [a("i", { class: "bi bi-file-play" }, null, -1)]])) : r("", !0),
			t.hasLanguages() ? (_(), i("button", {
				key: 3,
				type: "button",
				class: "btn btn-sm btn-outline-secondary border-top-0 border-bottom-0 rounded-0 fw-bold text-uppercase px-2",
				style: { "min-width": "2.75rem" },
				onClick: n[6] ||= (e) => t.cycleLanguage(),
				title: t.translate("Nyelv váltása")
			}, x(t.activeLanguage), 9, HA)) : r("", !0),
			a("input", {
				required: "text",
				class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
				value: t.fileTitle(c),
				onInput: (e) => {
					t.setFileTitle(c, e.target.value), t.slug(c);
				},
				onKeydown: n[7] ||= ne(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, UA),
			!c.isDocument && c.types && c.types[t.params.thumbnail] ? (_(), i("span", WA, [c.types.default.url ? (_(), i("a", {
				key: 0,
				target: "_blank",
				href: c.types.default.url
			}, [a("img", {
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: c.types[t.params.thumbnail].url,
				alt: c.name
			}, null, 8, KA)], 8, GA)) : (_(), i("img", {
				key: 1,
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: c.types[t.params.thumbnail].data,
				alt: c.name
			}, null, 8, qA))])) : r("", !0),
			t.params.tags ? (_(), i("div", JA, [a("button", YA, [a("span", XA, [n[38] ||= a("i", { class: "bi bi-tag" }, null, -1), o(" " + x(c.tags ? c.tags.length : 0), 1)])]), a("ul", ZA, [
				a("li", null, [(_(!0), i(e, null, y(t.params.tags, (e) => (_(), i("span", {
					key: e,
					class: "dropdown-item cursor-pointer",
					onClick: (n) => t.dropdownSelectToggleOne(c.tags, e.value)
				}, [c.tags && c.tags.indexOf(e.value) >= 0 ? (_(), i("i", $A)) : (_(), i("i", ej)), o(" " + x(t.translate(e.label ? e.label : e.value)), 1)], 8, QA))), 128))]),
				n[39] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectAll(c.tags, t.params.tags)
				}, x(t.translate("Select all")), 9, tj)]),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectClear(c.tags)
				}, x(t.translate("Unselect all")), 9, nj)]),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectInvert(c.tags, t.params.tags)
				}, x(t.translate("Invert all")), 9, rj)])
			])])) : r("", !0),
			a("div", ij, [n[43] ||= a("button", {
				class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 h-100",
				type: "button",
				"data-bs-toggle": "dropdown",
				"aria-expanded": "false"
			}, [a("i", { class: "bi bi-list" })], -1), a("ul", aj, [
				a("li", oj, [a("div", sj, [c.isImage && !t.isSvgFile(c) ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-secondary flex-fill",
					onClick: (e) => t.openEditor(c),
					title: t.translate("Szerkesztés")
				}, [n[40] ||= a("i", { class: "bi bi-pencil me-1" }, null, -1), o(x(t.translate("Szerkesztés")), 1)], 8, cj)) : r("", !0), a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger flex-fill",
					onClick: (e) => t.remove(l),
					title: t.translate("Törlés")
				}, [n[41] ||= a("i", { class: "bi bi-x-circle me-1" }, null, -1), o(x(t.translate("Törlés")), 1)], 8, lj)])]),
				n[42] ||= a("li", null, [a("hr", { class: "dropdown-divider my-2" })], -1),
				a("li", uj, [a("small", dj, [s(f, { file: c }, null, 8, ["file"])])])
			])])
		])])], 42, FA))), 128))])])])) : (_(!0), i(e, { key: 1 }, y(t.files, (c, l) => (_(), i("div", {
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
		}]) }, [c.loaded ? (_(), i("div", pj, [
			r("", !0),
			c.types && c.types[t.params.thumbnail] ? (_(), i("div", mj, [c.types.default.url ? (_(), i("a", {
				key: 0,
				target: "_blank",
				href: c.types.default.url
			}, [a("img", {
				class: "img-fluid transparent-background",
				src: c.types[t.params.thumbnail].url,
				alt: c.name
			}, null, 8, gj)], 8, hj)) : (_(), i("img", {
				key: 1,
				class: "img-fluid transparent-background",
				src: c.types[t.params.thumbnail].data,
				alt: c.name
			}, null, 8, _j))])) : r("", !0),
			c.isDocument ? (_(), i("div", vj, [a("i", { class: m(["bi bi-filetype-" + c.types.default.extension]) }, null, 2)])) : r("", !0),
			t.hasLanguages() ? (_(), i("div", yj, [a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary rounded-0 fw-bold text-uppercase px-2",
				onClick: n[9] ||= (e) => t.cycleLanguage(),
				title: t.translate("Nyelv váltása")
			}, x(t.activeLanguage), 9, bj), a("input", {
				required: "text",
				class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
				value: t.fileTitle(c),
				onInput: (e) => {
					t.setFileTitle(c, e.target.value), t.slug(c);
				},
				onKeydown: n[10] ||= ne(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, xj)])) : D((_(), i("input", {
				key: 4,
				required: "text",
				class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
				"onUpdate:modelValue": (e) => c.title = e,
				onInput: (e) => t.slug(c),
				onKeydown: n[11] ||= ne(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, Sj)), [[E, c.title]]),
			a("div", Cj, [
				n[54] ||= a("span", {
					class: "cursor-move p-1 px-2 border border-end-0 h-100 d-flex align-items-center",
					title: "Húzd a sorrendezéshez"
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
				}, null, 40, wj),
				t.params.tags ? (_(), i("div", Tj, [a("button", Ej, [a("span", Dj, [n[48] ||= a("i", { class: "bi bi-tag" }, null, -1), o(" " + x(c.tags ? c.tags.length : 0), 1)])]), a("ul", Oj, [
					a("li", null, [(_(!0), i(e, null, y(t.params.tags, (e) => (_(), i("span", {
						key: e,
						class: "dropdown-item cursor-pointer",
						onClick: (n) => t.dropdownSelectToggleOne(c.tags, e.value)
					}, [c.tags && c.tags.indexOf(e.value) >= 0 ? (_(), i("i", Aj)) : (_(), i("i", jj)), o(" " + x(t.translate(e.label ? e.label : e.value)), 1)], 8, kj))), 128))]),
					n[49] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectAll(c.tags, t.params.tags)
					}, x(t.translate("Select all")), 9, Mj)]),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectClear(c.tags)
					}, x(t.translate("Unselect all")), 9, Nj)]),
					a("li", null, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectInvert(c.tags, t.params.tags)
					}, x(t.translate("Invert all")), 9, Pj)])
				])])) : r("", !0),
				a("div", Fj, [n[53] ||= a("button", {
					class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
					type: "button",
					"data-bs-toggle": "dropdown",
					"aria-expanded": "false"
				}, [a("i", { class: "bi bi-list" })], -1), a("ul", Ij, [
					a("li", Lj, [a("div", Rj, [c.isImage && !t.isSvgFile(c) ? (_(), i("button", {
						key: 0,
						type: "button",
						class: "btn btn-sm btn-outline-secondary flex-fill",
						onClick: (e) => t.openEditor(c),
						title: t.translate("Szerkesztés")
					}, [n[50] ||= a("i", { class: "bi bi-pencil me-1" }, null, -1), o(x(t.translate("Szerkesztés")), 1)], 8, zj)) : r("", !0), a("button", {
						type: "button",
						class: "btn btn-sm btn-outline-danger flex-fill",
						onClick: (e) => t.remove(l),
						title: t.translate("Törlés")
					}, [n[51] ||= a("i", { class: "bi bi-x-circle me-1" }, null, -1), o(x(t.translate("Törlés")), 1)], 8, Bj)])]),
					n[52] ||= a("li", null, [a("hr", { class: "dropdown-divider my-2" })], -1),
					a("li", Vj, [a("small", Hj, [s(f, { file: c }, null, 8, ["file"])])])
				])])
			])
		])) : (_(), i("div", Uj, [...n[55] ||= [a("span", null, null, -1)]]))], 2)], 42, fj))), 128))])) : r("", !0),
		a("div", Wj, [a("div", Gj, [
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
			}, [t.files && t.params.limit > t.files.length ? (_(), i("span", qj, [
				n[59] ||= a("i", { class: "bi bi-upload me-2" }, null, -1),
				o(" " + x(t.params.text) + " ", 1),
				t.params.limit ? (_(), i("small", Jj, [
					n[56] ||= o(" ( ", -1),
					a("strong", Yj, x(t.files.length), 1),
					n[57] ||= o(" / ", -1),
					a("span", Xj, x(t.params.limit), 1),
					n[58] ||= o(" ) ", -1)
				])) : r("", !0)
			])) : (_(), i("span", Zj, [...n[60] ||= [a("i", { class: "bi bi-exclamation-circle" }, null, -1), o(" You've reached the upload limit ", -1)]]))], 42, Kj),
			a("button", {
				type: "button",
				class: "btn btn-outline-primary ms-1",
				onClick: n[17] ||= (e) => t.toggleView()
			}, [t.params.ui == "list" ? r("", !0) : (_(), i("i", Qj)), t.params.ui == "list" ? (_(), i("i", $j)) : r("", !0)]),
			a("button", {
				disabled: !t.files.length,
				type: "button",
				class: "btn btn-outline-danger ms-1",
				onClick: n[18] ||= (e) => t.resetConfirm()
			}, [...n[61] ||= [a("i", { class: "bi bi-trash" }, null, -1)]], 8, eM)
		]), a("div", tM, [a("small", null, [
			t.params.accept ? (_(), i("div", nM, [n[62] ||= a("span", { class: "text-secondary" }, "accept only", -1), (_(!0), i(e, null, y(t.params.accept, (e) => (_(), i("strong", {
				class: "ms-1 text-muted",
				key: e
			}, x(e), 1))), 128))])) : r("", !0),
			t.files && t.params.limit > t.files.length ? (_(), i("div", {
				key: 1,
				tabindex: "0",
				class: m(["vsa-paste-zone text-secondary cursor-pointer", { "vsa-paste-zone-active": t.isPasteZoneFocused }]),
				onFocus: n[19] ||= (e) => t.isPasteZoneFocused = !0,
				onBlur: n[20] ||= (e) => t.isPasteZoneFocused = !1
			}, [n[63] ||= a("i", { class: "bi bi-clipboard me-1" }, null, -1), o(x(t.translate("Vágólapról beillesztéshez, kattints ide és nyomj Ctrl+V-t")), 1)], 34)) : r("", !0),
			t.hasWatermarkPresets() ? (_(), i("div", rM, [D(a("input", {
				class: "form-check-input",
				type: "checkbox",
				role: "switch",
				id: t.uploadId + "_watermark",
				"onUpdate:modelValue": n[21] ||= (e) => t.applyWatermarkOnUpload = e
			}, null, 8, iM), [[C, t.applyWatermarkOnUpload]]), a("label", {
				class: "form-check-label ms-1",
				for: t.uploadId + "_watermark"
			}, x(t.translate("Vízjel hozzáadása feltöltéskor")), 9, aM)])) : r("", !0),
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
		}, null, 40, oM)) : r("", !0),
		t.editor.file ? (_(), i("div", {
			key: 4,
			class: "vsa-editor-overlay",
			onMousemove: n[33] ||= O((...e) => t.editorMouseMove && t.editorMouseMove(...e), ["prevent"]),
			onMouseup: n[34] ||= (...e) => t.editorMouseUp && t.editorMouseUp(...e),
			onMouseleave: n[35] ||= (...e) => t.editorMouseUp && t.editorMouseUp(...e)
		}, [
			a("div", sM, [
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-light",
					onClick: n[23] ||= (e) => t.editorRotate(-90),
					title: "Forgatás balra 90°"
				}, [...n[65] ||= [a("i", { class: "bi bi-arrow-counterclockwise" }, null, -1)]]),
				a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-light",
					onClick: n[24] ||= (e) => t.editorRotate(90),
					title: "Forgatás jobbra 90°"
				}, [...n[66] ||= [a("i", { class: "bi bi-arrow-clockwise" }, null, -1)]]),
				n[73] ||= a("span", { class: "text-secondary mx-1" }, "|", -1),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.flipX ? "btn-light" : "btn-outline-light"]),
					onClick: n[25] ||= (e) => t.editorFlip("x"),
					title: "Vízszintes tükrözés"
				}, [...n[67] ||= [a("i", { class: "bi bi-symmetry-vertical" }, null, -1)]], 2),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.flipY ? "btn-light" : "btn-outline-light"]),
					onClick: n[26] ||= (e) => t.editorFlip("y"),
					title: "Függőleges tükrözés"
				}, [...n[68] ||= [a("i", { class: "bi bi-symmetry-horizontal" }, null, -1)]], 2),
				n[74] ||= a("span", { class: "text-secondary mx-1" }, "|", -1),
				a("button", {
					type: "button",
					class: m(["btn btn-sm", t.editor.cropMode ? "btn-warning" : "btn-outline-light"]),
					onClick: n[27] ||= (...e) => t.editorCropButtonClick && t.editorCropButtonClick(...e),
					title: "Vágás"
				}, [n[69] ||= a("i", { class: "bi bi-crop" }, null, -1), t.editor.cropMode ? (_(), i("span", cM, x(t.editor.crop ? "Terület kivágása" : "Rajzolj területet"), 1)) : r("", !0)], 2),
				t.editor.cropMode && t.editor.crop ? (_(), i("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-warning",
					onClick: n[28] ||= (e) => {
						t.editor.crop = null, t.editorDraw();
					},
					title: "Vágás törlése"
				}, [...n[70] ||= [a("i", { class: "bi bi-x" }, null, -1)]])) : r("", !0),
				t.hasWatermarkPresets() ? (_(), i(e, { key: 1 }, [n[71] ||= a("span", { class: "text-secondary mx-1" }, "|", -1), a("div", lM, [D(a("input", {
					class: "form-check-input",
					type: "checkbox",
					role: "switch",
					id: "editor_apply_watermark",
					"onUpdate:modelValue": n[29] ||= (e) => t.editor.applyWatermark = e
				}, null, 512), [[C, t.editor.applyWatermark]]), a("label", uM, x(t.translate("Vízjel hozzáadása mentéskor")), 1)])], 64)) : r("", !0),
				a("div", dM, [a("button", {
					type: "button",
					class: "btn btn-sm btn-outline-secondary text-light border-secondary",
					onClick: n[30] ||= (...e) => t.editorClose && t.editorClose(...e)
				}, "Mégse"), a("button", {
					type: "button",
					class: "btn btn-sm btn-primary",
					onClick: n[31] ||= (...e) => t.editorApply && t.editorApply(...e)
				}, [...n[72] ||= [a("i", { class: "bi bi-check2 me-1" }, null, -1), o("Alkalmaz ", -1)]])])
			]),
			t.editor.hasWatermark ? (_(), i("div", fM, [n[75] ||= a("i", { class: "bi bi-exclamation-triangle me-1" }, null, -1), o(x(t.translate("This image has a watermark applied. Rotating or cropping may distort or cut off the watermark.")), 1)])) : r("", !0),
			a("div", pM, [a("canvas", {
				ref: "editorCanvas",
				style: h({ cursor: t.editor.cropMode ? "crosshair" : "default" }),
				onMousedown: n[32] ||= O((...e) => t.editorMouseDown && t.editorMouseDown(...e), ["prevent"])
			}, null, 36)])
		], 32)) : r("", !0)
	], 2)]);
}
var hM = /*#__PURE__*/ $D(_A, [["render", mM]]), gM = {
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
			this.optionValue === "object" ? this.newitem = e && e.value : this.newitem = e;
		},
		async loadOptions() {
			this.options = await this.selectOptions(this.field.options, this.field);
		},
		getValueOrFunction(e, t) {
			return Nc(e, t, this.settings, this);
		},
		async selectOptions(e, t) {
			return typeof e == "function" ? await e(this.item, t, this) : e;
		},
		async fetchCustom(e, t) {
			let n = await fetch(Yc("GET", { url: e }, t), Jc("GET", this.settings.form.api, null, this.auth)).catch((e) => (console.error("[vu-admin] fetchCustom network error:", e), null)), r = await Pc(n), i = Vc(n, r);
			if (i) {
				this.handleFormErrors && this.handleFormErrors(i);
				return;
			}
			return r.data;
		},
		handleChange(e) {
			if (this.optionValue === "object") {
				let e = this.options.find((e) => e.value === this.newitem);
				e && this.$emit("update:modelValue", e);
			} else this.$emit("update:modelValue", this.newitem);
		}
	},
	components: {}
}, _M = [
	"name",
	"id",
	"disabled",
	"readonly",
	"required"
], vM = ["value"];
function yM(t, n, r, a, o, s) {
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
	}, x(e.label ? e.label : e.value), 11, vM))), 128))], 42, _M)), [[T, t.newitem]]);
}
var bM = /*#__PURE__*/ $D(gM, [["render", yM]]), xM = {
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
	watch: { modelValue(e) {
		this.value = e, (!this.value || typeof this.value != "object") && (this.value = []);
	} },
	methods: {
		getValueOrFunction(e, t) {
			return Nc(e, t, this.settings, this);
		},
		selectOptions(e, t) {
			return typeof e == "function" ? e(this.item, t, this) : e;
		},
		arrayAddNewItem(e, t) {
			let n = {};
			for (let t in e.elements) {
				let r = Object.assign({}, e.elements[t]), i = r.value ? r.value : null;
				if (i != null) n[t] = i;
				else return;
			}
			this.value.push(n), this.$emit("update:modelValue", this.value);
			for (let t in e.elements) e.elements[t].value = null;
		},
		arrayRemoveItem(e, t) {
			e.splice(t, 1);
		},
		arrayItemMoveUp(e, t) {
			cl(e, t);
		},
		arrayItemMoveDown(e, t) {
			ll(e, t);
		}
	},
	components: { VuAdminFormSelect: bM }
}, SM = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, CM = { class: "col-10" }, wM = { class: "row g-1 d-flex align-items-center justify-content-between" }, TM = { class: "col-10" }, EM = { class: "row g-1 d-flex align-items-center justify-content-between" }, DM = ["innerHTML"], OM = {
	key: 1,
	class: "input-group input-group-sm"
}, kM = [
	"type",
	"required",
	"placeholder",
	"onUpdate:modelValue"
], AM = { class: "col-2 text-nowrap text-end" }, jM = ["onClick"], MM = ["onClick"], NM = ["onClick"], PM = { key: 0 }, FM = { class: "row g-1 d-flex align-items-center justify-content-between" }, IM = { class: "col-10" }, LM = { class: "row g-1 d-flex align-items-center justify-content-between" }, RM = { class: "input-group input-group-sm" }, zM = {
	key: 0,
	class: "input-group-text"
}, BM = [
	"type",
	"placeholder",
	"onUpdate:modelValue"
], VM = {
	key: 3,
	class: "input-group-text"
}, HM = { class: "col-2" };
function UM(t, o, s, c, l, u) {
	let d = b("VuAdminFormSelect");
	return _(), i("div", null, [
		a("div", SM, [a("div", CM, [a("div", wM, [(_(!0), i(e, null, y(t.field.elements, (e) => (_(), i("div", {
			key: e,
			class: m(e.class || "col")
		}, [a("small", null, x(e.placeholder ? e.placeholder : e.prefix ? e.prefix : ""), 1)], 2))), 128))])]), o[1] ||= a("div", { class: "col-2 text-nowrap text-end" }, null, -1)]),
		(_(!0), i(e, null, y(t.value, (s, c) => (_(), i("div", {
			class: "row g-1 d-flex align-items-center justify-content-between mb-1",
			key: c
		}, [a("div", TM, [a("div", EM, [(_(!0), i(e, null, y(s, (e, r) => (_(), i("div", {
			key: r,
			class: m(t.field.elements[r].class || "col")
		}, [t.field.elements[r].template ? (_(), i("span", {
			key: 0,
			innerHTML: t.getValueOrFunction(t.field.elements[r].template, t.value[c])
		}, null, 8, DM)) : (_(), i("div", OM, [t.field.elements[r].type == "select" && t.value[c][r] ? (_(), n(d, {
			key: 0,
			modelValue: t.value[c][r],
			"onUpdate:modelValue": (e) => t.value[c][r] = e,
			field: t.field.elements[r],
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
			key: 1,
			type: t.field.elements[r].type,
			required: t.field.elements[r].required,
			placeholder: t.field.elements[r].placeholder || r,
			class: "form-control",
			"onUpdate:modelValue": (e) => t.value[c][r] = e
		}, null, 8, kM)), [[w, t.value[c][r]]])]))], 2))), 128))])]), a("div", AM, [
			t.field.sortable ? (_(), i("button", {
				key: 0,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => t.arrayItemMoveUp(t.value, c)
			}, [...o[2] ||= [a("i", { class: "bi bi-arrow-up" }, null, -1)]], 8, jM)) : r("", !0),
			t.field.sortable ? (_(), i("button", {
				key: 1,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => t.arrayItemMoveDown(t.value, c + 1)
			}, [...o[3] ||= [a("i", { class: "bi bi-arrow-down" }, null, -1)]], 8, MM)) : r("", !0),
			a("button", {
				type: "button",
				class: "btn btn-sm btn-outline-danger p-1 me-1",
				onClick: (e) => t.arrayRemoveItem(t.value, c)
			}, [...o[4] ||= [a("i", { class: "bi bi-trash" }, null, -1)]], 8, NM)
		])]))), 128)),
		t.item[t.field.name] && t.item[t.field.name].length ? (_(), i("hr", PM)) : r("", !0),
		a("div", FM, [a("div", IM, [a("div", LM, [(_(!0), i(e, null, y(t.field.elements, (e) => (_(), i("div", {
			key: e,
			class: m(e.class || "col")
		}, [a("div", RM, [
			e.prefix ? (_(), i("span", zM, x(e.prefix), 1)) : r("", !0),
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
				placeholder: e.placeholder || e.name,
				class: "form-control form-control-sm",
				"onUpdate:modelValue": (t) => e.value = t
			}, null, 8, BM)), [[w, e.value]]),
			e.suffix ? (_(), i("span", VM, x(e.suffix), 1)) : r("", !0)
		]), r("", !0)], 2))), 128))])]), a("div", HM, [a("button", {
			type: "button",
			class: "btn btn-sm btn-outline-primary my-1 w-100",
			onClick: o[0] ||= (e) => t.arrayAddNewItem(t.field, t.item)
		}, [...o[5] ||= [a("i", { class: "bi bi-plus" }, null, -1)]])])])
	]);
}
//#endregion
//#region src/components/VuAdminFormGroup.vue
var WM = {
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
			return Nc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return el(e, this.settings.translate, t, n || this.settings.language);
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
			(!t[e.name] || typeof t[e.name] != "object") && (t[e.name] = []);
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
			cl(e, t);
		},
		arrayItemMoveDown(e, t) {
			ll(e, t);
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
			il(t, n.value ? n.value : n);
		},
		dropdownSelectAll(e, t) {
			al(e, t);
		},
		dropdownSelectInvert(e, t) {
			ol(e, t);
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? sl(e) : e.value = null;
		}
	},
	components: {
		HtmlEditor: Wk,
		FileUpload: hM,
		VuAdminFormSelect: bM,
		VuAdminFormList: /* @__PURE__ */ $D(xM, [["render", UM]])
	}
}, GM = { class: "row m-1" }, KM = ["innerHTML"], qM = {
	key: 1,
	class: "row"
}, JM = { class: "form-group pb-3" }, YM = { key: 0 }, XM = {
	key: 0,
	class: "badge text-secondary fw-light"
}, ZM = ["for", "innerHTML"], QM = {
	key: 1,
	class: "input-group"
}, $M = ["innerHTML"], eN = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"disabled",
	"readonly",
	"required"
], tN = [
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
], nN = [
	"type",
	"name",
	"id",
	"onUpdate:modelValue",
	"min",
	"max",
	"disabled",
	"readonly",
	"required"
], rN = {
	key: 4,
	class: "form-check"
}, iN = [
	"name",
	"id",
	"true-value",
	"false-value",
	"onUpdate:modelValue",
	"disabled",
	"readonly",
	"required"
], aN = ["for"], oN = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"readonly",
	"disabled",
	"required"
], sN = [
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
], cN = ["innerHTML"], lN = { key: 5 }, uN = { class: "dropdown d-inline-block" }, dN = { class: "dropdown-menu" }, fN = ["onClick"], pN = {
	key: 0,
	class: "bi bi-check-square"
}, mN = {
	key: 1,
	class: "bi bi-square"
}, hN = ["onClick"], gN = ["onClick"], _N = ["onClick"], vN = ["onClick"], yN = { key: 6 }, bN = { key: 0 }, xN = ["for"], SN = [
	"name",
	"id",
	"onUpdate:modelValue"
], CN = ["onClick"], wN = ["innerHTML"], TN = {
	key: 8,
	class: "p-1"
}, EN = ["innerHTML"];
function DN(t, s, c, l, u, d) {
	let f = b("VuAdminFormSelect"), p = b("HtmlEditor"), h = b("FileUpload"), g = b("VuAdminFormList");
	return _(), i("div", GM, [(_(!0), i(e, null, y(t.settings.form.groups, (c) => (_(), i("div", {
		key: c,
		class: m([c.class ? c.class : "col-md-12"])
	}, [c.title ? (_(), i("h2", {
		key: 0,
		class: "form-row-title mb-4 fw-lighter",
		innerHTML: c.title ? c.title : ""
	}, null, 8, KM)) : r("", !0), t.item && c.fields ? (_(), i("div", qM, [(_(!0), i(e, null, y(c.fields, (c) => (_(), i("div", {
		class: m([t.getValueOrFunction(c.class ? c.class : "col-md-12"), "input_type_" + c.type]),
		key: c
	}, [a("div", JM, [
		c.label ? (_(), i("span", YM, [[
			"html",
			"image",
			"upload"
		].indexOf(c.type) >= 0 ? (_(), i("label", {
			key: 0,
			class: m([{ required: c.required }, "form-label text-secondary mb-1"])
		}, [o(x(c.label ? c.label : t.translate(c.name)) + " ", 1), c.maxlength ? (_(), i("span", XM, x(t.item[c.name] ? t.item[c.name].length : 0) + " / " + x(c.maxlength), 1)) : r("", !0)], 2)) : (_(), i("label", {
			key: 1,
			class: m([{ required: c.required }, "form-label text-secondary mb-1"]),
			for: t.formId + "_" + c.name,
			innerHTML: t.getValueOrFunction(c.label ? c.label : t.translate(c.name), {
				field: c,
				item: t.item
			})
		}, null, 10, ZM))])) : r("", !0),
		[
			"html",
			"image",
			"list",
			"addresses",
			"template"
		].indexOf(c.type) < 0 ? (_(), i("div", QM, [
			c.prefix ? (_(), i("span", {
				key: 0,
				class: "input-group-text",
				innerHTML: t.getValueOrFunction(c.prefix, {
					field: c,
					item: t.item
				})
			}, null, 8, $M)) : r("", !0),
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
			}, null, 10, eN)), [[E, t.item[c.name]]]) : r("", !0),
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
			}, null, 10, tN)), [[E, t.item[c.name]]]) : r("", !0),
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
			}, null, 10, nN)), [[w, t.item[c.name]]]) : r("", !0),
			c.type == "checkbox" ? (_(), i("div", rN, [D(a("input", {
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
			}, null, 10, iN), [[C, t.item[c.name]]]), a("label", {
				class: "form-check-label cursor-pointer",
				for: t.formId + "_" + c.name
			}, x(c.checkbox), 9, aN)])) : r("", !0),
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
			}, null, 10, oN)), [[E, t.item[c.name]]]) : r("", !0),
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
			}, "              ", 10, sN)), [[E, t.item[c.name]]]) : r("", !0),
			c.suffix ? (_(), i("span", {
				key: 8,
				class: "input-group-text",
				innerHTML: t.getValueOrFunction(c.suffix, {
					field: c,
					item: t.item
				})
			}, null, 8, cN)) : r("", !0)
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
		c.type == "dropdown" && t.item[c.name] ? (_(), i("div", lN, [a("div", uN, [a("button", {
			class: m(["btn dropdown-toggle", [c.dropdown ? c.dropdown.class : ""]]),
			type: "button",
			"data-bs-auto-close": "outside",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false"
		}, [a("span", null, x(t.translate(c.dropdown ? c.dropdown.label : "Select")), 1)], 2), a("ul", dN, [
			a("li", null, [(_(!0), i(e, null, y(c.options, (e) => (_(), i("span", {
				key: e,
				class: m(["dropdown-item cursor-pointer", { selected: t.item[c.name].indexOf(e.value) >= 0 }]),
				onClick: (n) => t.dropdownSelectToggleOne(c, t.item[c.name], e)
			}, [t.item[c.name].indexOf(e.value) >= 0 ? (_(), i("i", pN)) : (_(), i("i", mN)), o(" " + x(t.translate(e.label ? e.label : e.value)), 1)], 10, fN))), 128))]),
			s[0] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
			a("li", null, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => t.dropdownSelectAll(t.item[c.name], c.options)
			}, x(t.translate("Select all")), 9, hN)]),
			a("li", null, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => t.dropdownSelectClear(t.item[c.name])
			}, x(t.translate("Unselect all")), 9, gN)]),
			a("li", null, [a("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => t.dropdownSelectInvert(t.item[c.name], c.options)
			}, x(t.translate("Invert all")), 9, _N)])
		])]), t.item[c.name].length ? (_(), i("span", {
			key: 0,
			class: m([c.list && c.list.wrapperClass ? c.list.wrapperClass : "d-block mt-1"])
		}, [(_(!0), i(e, null, y(t.item[c.name], (e) => (_(), i("span", {
			class: m(["cursor-pointer", [c.list ? c.list.class : ""]]),
			key: e,
			onClick: (n) => t.dropdownSelectToggleOne(c, t.item[c.name], e)
		}, [o(x(t.translate(e)) + " ", 1), s[1] ||= a("i", { class: "bi bi-x" }, null, -1)], 10, vN))), 128))], 2)) : r("", !0)])) : r("", !0),
		c.type == "addresses" ? (_(), i("span", yN, [t.item[c.name] ? (_(), i("div", bN, [(_(!0), i(e, null, y(t.item[c.name], (e) => (_(), i("div", { key: e }, [
			o(x(e) + " ", 1),
			a("label", {
				class: "form-label text-secondary mb-1",
				for: t.formId + "_" + c.name
			}, x(c.label), 9, xN),
			D(a("input", {
				class: "form-control",
				type: "text",
				name: c.name,
				id: t.formId + "_" + c.name,
				"onUpdate:modelValue": (t) => e.country = t
			}, null, 8, SN), [[E, e.country]])
		]))), 128))])) : r("", !0), a("button", {
			type: "button",
			class: "btn btn-sm btn-secondary",
			onClick: (e) => t.insertAddress(c.name)
		}, " Add ", 8, CN)])) : r("", !0),
		c.type == "template" ? (_(), i("div", {
			key: 7,
			innerHTML: t.getValueOrFunction(c.template, {
				field: c,
				item: t.item
			})
		}, null, 8, wN)) : r("", !0),
		c.description ? (_(), i("div", TN, [a("small", null, [a("i", {
			class: "text-muted",
			innerHTML: t.getValueOrFunction(c.description, {
				field: c,
				item: t.item
			})
		}, null, 8, EN)])])) : r("", !0)
	])], 2))), 128))])) : r("", !0)], 2))), 128))]);
}
//#endregion
//#region src/components/VuAdminForm.vue
var ON = {
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
			return el(e, this.settings.translate, t, n || this.settings.language);
		},
		getValueOrFunction(e, t) {
			return Nc(e, t, this.settings, this);
		},
		getButtonClassByAction(e) {
			return Ll(e);
		},
		getButtonIconClassByAction(e) {
			return Rl(e);
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
			if (e instanceof Error) {
				this.addFormMessage(e.message, t, n);
				return;
			}
			if (typeof e == "string") {
				this.addFormMessage(e, t, n);
				return;
			}
			if (Array.isArray(e)) {
				for (let r of e) r && typeof r == "object" && r.message ? this.addFormMessage(r.message, r.timeout || t, r.priority || n) : typeof r == "string" ? this.addFormMessage(r, t, n) : r && typeof r == "object" && this.addFormMessage(JSON.stringify(r), t, n);
				return;
			}
			if (typeof e == "object" && e.message) {
				this.addFormMessage(e.message, e.timeout || t, e.priority || n);
				return;
			}
			this.addFormMessage(String(e), t, n);
		},
		addMessage(e, t, n, r, i) {
			clearTimeout(this.messageTimeout);
			let a = `${Date.now().toString(36)}-${qc(8)}`;
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
					let i = await fetch(Yc("GET", t.form.api, e), Jc("GET", t.form.api, null, n)).catch((e) => (console.error("[vu-admin] fetchItem network error:", e), null)), a = await Pc(i), o = Vc(i, a);
					if (o) return this.handleFormErrors(o), this.formNoWait(), !1;
					if (!a.data) return this.handleFormErrors(this.translate("Empty response")), this.formNoWait(), !1;
					t.form.default && (a.data = Object.assign({}, t.form.default, a.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(a.data, i), r = t.form.api.input.item ? typeof t.form.api.input.item == "string" ? a.data[t.form.api.input.item] : t.form.api.input.item(a.data, i) : a.data;
				} else r = t.form.default ? Object.assign({}, t.form.default) : {};
				let i = [];
				for (let e of t.form.groups) for (let a of e.fields) a.type === "dropdown" && a.name !== "__proto__" && a.name !== "constructor" && a.name !== "prototype" && !r[a.name] && (r[a.name] = []), a.relation && t.relations && t.relations[a.relation.config] && (a.relation = Mc(t.relations[a.relation.config], a.relation), i.push(this.fetchRelation(a, [r], n)));
				await Promise.all(i), t.debug && console.log("[vu-admin] fetchItem:", e, r), this.item = Qc(r), this.itemOriginal = Object.assign({}, r), this.loaded = !0, this.formNoWait();
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
				n = this.settings.form.api.input.item ? typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t) : t, n && (this.addFormMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${n[this.settings.pkey]} )</small>`, 2500), this.item = Qc(n), this.itemOriginal = Object.assign({}, n)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
				let r = await fetch(Yc("DELETE", this.settings.form.api, n, t), Jc("DELETE", this.settings.form.api, null, this.auth)).catch((e) => (console.error("[vu-admin] deleteItem network error:", e), null)), i = await Pc(r), a = Vc(r, i);
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
			if (n && typeof n != "string") {
				n(t.item, t, this);
				return;
			}
			switch (n) {
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
				case "FORM_SAVE_AND_CLOSE":
					this.submitAndClose();
					break;
			}
		}
	},
	components: { VuAdminFormGroup: /* @__PURE__ */ $D(WM, [["render", DN]]) }
}, kN = ["id", "data-bs-theme"], AN = {
	key: 0,
	class: "vua-overlay-panel text-center px-4 py-3"
}, jN = { class: "vua-overlay-message" }, MN = {
	key: 0,
	class: "vua-overlay-preset text-muted small mt-2"
}, NN = { class: "badge bg-secondary-subtle text-secondary-emphasis text-uppercase" }, PN = {
	key: 0,
	class: "ms-2"
}, FN = {
	key: 1,
	class: "ms-1 text-uppercase"
}, IN = {
	key: 1,
	class: "progress mt-3 mx-auto",
	style: {
		width: "240px",
		height: "8px"
	}
}, LN = ["aria-valuenow", "aria-valuemax"], RN = { class: "modal-header" }, zN = {
	key: 0,
	class: "modal-title"
}, BN = ["innerHTML"], VN = { key: 1 }, HN = { key: 2 }, UN = {
	key: 3,
	class: "rounded border ms-2 px-2 py-0 fs-6"
}, WN = {
	key: 1,
	class: "d-inline-block ms-3 mt-1"
}, GN = ["innerHTML"], KN = {
	key: 2,
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, qN = ["disabled"], JN = {
	key: 0,
	class: "modal-header bg-body sticky-top"
}, YN = {
	key: 0,
	class: "d-inline-block m-1"
}, XN = { class: "dropdown d-inline-block" }, ZN = ["innerHTML"], QN = { class: "dropdown-menu text-start" }, $N = { class: "me-2 text-muted" }, eP = ["innerHTML"], tP = ["disabled", "onClick"], nP = {
	key: 1,
	class: "dropdown d-inline-block"
}, rP = ["disabled"], iP = { class: "mx-1" }, aP = { class: "dropdown-menu px-2" }, oP = ["onClick"], sP = {
	key: 1,
	class: "modal-body custom-scroll"
}, cP = {
	key: 2,
	class: "modal-footer d-flex justify-content-between"
}, lP = {
	key: 3,
	class: "bg-light text-dark"
};
function uP(t, s, c, l, u, d) {
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
		}]) }, [t.overlayCenterMessage ? (_(), i("div", AN, [
			s[2] ||= a("div", {
				class: "spinner-border text-primary mb-3",
				role: "status"
			}, [a("span", { class: "visually-hidden" }, "Loading...")], -1),
			a("div", jN, x(t.overlayCenterMessage), 1),
			t.saveProgress?.uploadTypeKey ? (_(), i("div", MN, [
				a("span", NN, x(t.saveProgress.uploadTypeKey), 1),
				t.saveProgress.uploadPresetSize ? (_(), i("span", PN, x(t.saveProgress.uploadPresetSize), 1)) : r("", !0),
				t.saveProgress.uploadExtension ? (_(), i("span", FN, "." + x(t.saveProgress.uploadExtension), 1)) : r("", !0)
			])) : r("", !0),
			t.overlayShowUploadProgress ? (_(), i("div", IN, [a("div", {
				class: "progress-bar progress-bar-striped progress-bar-animated",
				role: "progressbar",
				style: h({ width: t.saveProgressPercent + "%" }),
				"aria-valuenow": t.saveProgress.uploadCurrent,
				"aria-valuemin": 0,
				"aria-valuemax": t.saveProgress.uploadTotal
			}, null, 12, LN)])) : r("", !0)
		])) : r("", !0)], 2),
		a("div", RN, [
			t.loaded ? (_(), i("h5", zN, [
				t.settings.form.title && typeof t.settings.form.title == "function" ? (_(), i("span", {
					key: 0,
					innerHTML: t.settings.form.title(t.item, t.settings)
				}, null, 8, BN)) : r("", !0),
				t.settings.form.title && typeof t.settings.form.title == "string" ? (_(), i("span", VN, x(t.translate(t.settings.form.title)), 1)) : r("", !0),
				t.settings.form.title ? r("", !0) : (_(), i("span", HN, x(t.translate("Edit")), 1)),
				t.item[t.settings.pkey] ? (_(), i("small", UN, [s[3] ||= a("span", { class: "text-muted fw-light" }, "id", -1), o(" " + x(t.item[t.settings.pkey]), 1)])) : r("", !0)
			])) : r("", !0),
			t.message.form ? (_(), i("span", WN, [a("span", { class: m(["text-" + t.message.form.priority]) }, [s[4] ||= a("i", { class: "bi bi-envelope-fill me-2" }, null, -1), a("span", { innerHTML: t.message.form.msg }, null, 8, GN)], 2)])) : r("", !0),
			t.ui.wait.form && !t.overlayCenterMessage ? (_(), i("span", KN, [...s[5] ||= [a("span", { class: "visually-hidden" }, "Loading...", -1)]])) : r("", !0),
			a("button", {
				type: "button",
				class: "btn-close",
				"data-bs-dismiss": "modal",
				"aria-label": "Close",
				disabled: t.saveProgress?.active && t.saveProgress?.warnLeave
			}, null, 8, qN)
		]),
		t.item ? (_(), i("div", JN, [t.settings.form.control ? (_(), i("div", {
			key: 0,
			class: m(["w-100", t.settings.form.control.class == null ? "d-flex justify-content-center" : t.settings.form.control.class])
		}, [t.messages.form.length ? (_(), i("span", YN, [a("div", XN, [a("button", {
			class: m(["btn btn-sm dropdown-toggle", ["btn-" + t.messages.form[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: t.messages.form.length + " " + (t.messages.form.length > 1 ? t.translate("messages") : t.translate("message"))
		}, null, 10, ZN), a("ul", QN, [(_(!0), i(e, null, y(t.messages.form, (e) => (_(), i("li", { key: e }, [a("span", { class: m(["dropdown-item disabled", ["text-" + e.priority]]) }, [a("small", $N, x(e.datetime), 1), a("span", { innerHTML: e.msg }, null, 8, eP)], 2)]))), 128))])])])) : r("", !0), (_(!0), i(e, null, y(t.settings.form.control.buttons, (n) => (_(), i("span", { key: n.action }, [n.dropdowns ? r("", !0) : (_(), i("button", {
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
		}, [a("i", { class: m([n.icon === void 0 ? t.getButtonIconClassByAction(n.action) : t.getValueOrFunction(n.icon, {
			button: n,
			item: t.item,
			form: this
		})]) }, null, 2), o(" " + x(t.translate(n.title)), 1)], 10, tP)), n.dropdowns ? (_(), i("div", nP, [a("button", {
			type: "button",
			class: m([[n.class], "dropdown-toggle"]),
			"data-bs-toggle": "dropdown",
			"data-bs-auto-close": "outside",
			"aria-expanded": "false",
			disabled: t.saveProgress?.active
		}, [a("span", iP, [a("i", { class: m([n.icon === void 0 ? t.getButtonIconClassByAction(n.action) : t.getValueOrFunction(n.icon, {
			button: n,
			table: this
		})]) }, null, 2), o(" " + x(t.translate(n.title)), 1)])], 10, rP), a("ul", aP, [(_(!0), i(e, null, y(n.dropdowns, (e) => (_(), i("li", { key: e }, [a("span", {
			class: m([e.class ? e.class : ""]),
			onClick: (r) => t.formAction(e, {
				button: n,
				item: t.item,
				form: this,
				$event: r
			})
		}, [e.icon ? (_(), i("i", {
			key: 0,
			class: m([e.icon])
		}, null, 2)) : r("", !0), o(" " + x(t.translate(e.title)), 1)], 10, oP)]))), 128))])])) : r("", !0)]))), 128))], 2)) : r("", !0)])) : r("", !0),
		t.settings.form ? (_(), i("div", sP, [t.settings.form.visible && t.settings.form.groups ? (_(), n(f, {
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
		t.item ? (_(), i("div", cP)) : r("", !0),
		t.settings.debug > 1 ? (_(), i("pre", lP, "        " + x(t.item) + "\n    ", 1)) : r("", !0)
	], 42, kN)) : r("", !0);
}
var dP = /*#__PURE__*/ $D(ON, [["render", uP]]), fP = {
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
	methods: {
		setPage(e) {
			this.$emit("setPage", e);
		},
		setPageLimit(e) {
			this.$emit("setPageLimit", e);
		},
		translate(e, t, n) {
			return el(e, this.settings.translate, t, n || this.settings.language);
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
}, pP = {
	key: 0,
	"aria-label": "Page navigation",
	class: "mt-2 d-flex align-items-center justify-content-between"
}, mP = { class: "dropdown d-inline-block m-1" }, hP = { class: "mx-1" }, gP = { key: 0 }, _P = {
	key: 0,
	class: "dropdown-menu text-end"
}, vP = ["onClick"], yP = { class: "ms-2" }, bP = {
	key: 0,
	class: "bi bi-check-circle-fill ms-2"
}, xP = {
	key: 1,
	class: "bi bi-circle ms-2"
}, SP = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, CP = { class: "pagination pagination-sm m-1" }, wP = { class: "page-item" }, TP = ["innerHTML"], EP = { class: "page-item" }, DP = ["innerHTML"], OP = ["onClick"], kP = { class: "page-item" }, AP = ["innerHTML"], jP = {
	key: 0,
	class: "page-item"
}, MP = ["innerHTML"];
function NP(t, n, o, s, c, l) {
	return o.config.pagination.hidden ? r("", !0) : (_(), i("nav", pP, [a("div", null, [a("div", mP, [a("button", {
		type: "button",
		class: m(["btn btn-sm btn-secondary", { "dropdown-toggle": o.config.pagination.limits }]),
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [D(a("span", hP, [a("strong", null, x(o.config.pagination.from) + "-" + x(o.config.pagination.to), 1), o.config.pagination.total ? (_(), i("span", gP, " / " + x(o.config.pagination.total), 1)) : r("", !0)], 512), [[ee, o.config.pagination.from > 0]])], 2), o.config.pagination.limits ? (_(), i("ul", _P, [a("li", null, [(_(!0), i(e, null, y(o.config.pagination.limits, (e) => (_(), i("span", {
		class: m(["dropdown-item cursor-pointer", { selected: o.config.pagination.limit == e }]),
		key: e,
		onClick: (t) => l.setPageLimit(e)
	}, [
		a("strong", null, x(e), 1),
		a("small", yP, x(l.translate("row")) + "/" + x(l.translate("page")), 1),
		o.config.pagination.limit == e ? (_(), i("i", bP)) : r("", !0),
		o.config.pagination.limit == e ? r("", !0) : (_(), i("i", xP))
	], 10, vP))), 128))])])) : r("", !0)]), D(a("div", SP, [...n[4] ||= [a("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[ee, o.ui && o.ui.wait.table]])]), a("ul", CP, [
		a("li", wP, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.firstDisabled() }]),
			onClick: n[0] ||= (e) => l.setPage(1),
			"aria-label": "{{  translate('First')  }}"
		}, [a("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("First")
		}, null, 8, TP)], 2)]),
		a("li", EP, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.prevDisabled() }]),
			onClick: n[1] ||= (e) => l.setPage(o.config.pagination.page - 1),
			"aria-label": "{{ translate('Prev')  }}"
		}, [a("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("Prev")
		}, null, 8, DP)], 2)]),
		(_(!0), i(e, null, y(o.config.pagination.numbers, (e) => (_(), i("li", {
			key: e,
			class: "page-item"
		}, [a("a", {
			class: m(["page-link cursor-pointer", {
				disabled: e > o.config.pagination.pages,
				current: e == o.config.pagination.page
			}]),
			onClick: (t) => l.setPage(e)
		}, x(e), 11, OP)]))), 128)),
		a("li", kP, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.nextDisabled() }]),
			onClick: n[2] ||= (e) => l.setPage(o.config.pagination.page + 1),
			"aria-label": "{{  translate('Next')  }}"
		}, [a("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("Next")
		}, null, 8, AP)], 2)]),
		o.config.pagination.total ? (_(), i("li", jP, [a("a", {
			class: m(["page-link cursor-pointer", { disabled: l.lastDisabled() }]),
			onClick: n[3] ||= (e) => l.setPage(o.config.pagination.total),
			"aria-label": "{{  translate('Last')  }}"
		}, [a("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("Last")
		}, null, 8, MP)], 2)])) : r("", !0)
	])]));
}
var PP = /*#__PURE__*/ $D(fP, [["render", NP]]), FP = jc(), IP = {
	name: "VuAdminTable",
	props: {
		settings: Object,
		auth: Object
	},
	components: {
		VuAdminForm: dP,
		VuAdminTablePagination: PP
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
		let e = Kc(1e5);
		this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e;
	},
	mounted() {
		this.modalElement = document.getElementById(this.modalId), this.modalWindow = new lo(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
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
			FP.emit(e + "-" + t, {
				from: this.settings.entity,
				payload: n
			});
		},
		listenEvent() {
			if (FP.on(`EDIT-${this.settings.entity}`, (e) => {
				this.editItem(e.payload.item);
			}), this.settings.table && this.settings.table.filterListen) {
				let e = this.settings.table.filterListen, t = `FILTER-${this.settings.entity}`;
				this._filterListenerRegistered ||= (FP.on(t, (t) => {
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
			if (!(this.config.pagination.items === null || this.config.pagination.items === void 0)) {
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
			return Nc(e, t, this.settings, this);
		},
		getButtonClassByAction(e) {
			return Ll(e);
		},
		getButtonIconClassByAction(e) {
			return Rl(e);
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
			if (n && typeof n != "string") {
				n(t.item, t, this);
				return;
			}
			switch (n) {
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
				case "TABLE_EXPORT":
					this.exportTable(e.params);
					break;
			}
		},
		tableBulkAction(e, t, n, r) {
			if (r && r.stopPropagation(), e && typeof e != "string") {
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
					this.deleteItems(this.selected, (e) => {
						this.selected = [];
					});
					break;
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
			for (let n of this.settings.table.columns) n.filter && n.filter.value !== void 0 && (t = !0, e[n.name] = {
				type: n.filter.type,
				value: n.filter.onchange ? n.filter.onchange(n.filter) : n.filter.value,
				operator: n.filter.operator
			});
			return t ? e : null;
		},
		async fetchTableRelations(e) {
			if (!this.settings.relations) return;
			let t = [];
			for (let n of this.settings.table.columns) if (n.relation && this.settings.relations[n.relation.config]) {
				let r = [];
				n.relation = Mc(this.settings.relations[n.relation.config], n.relation);
				for (let t of e) t[n.relation.local] && r.push(t[n.relation.local]);
				n.relation.ids = rl(r), t.push(this.fetchRelation(n, e, this.auth));
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
			e.events && e.events.beforeItemsLoad && e.events.beforeItemsLoad(t, e), e.debug && console.log("[vu-admin] fetchItems", Yc("GET", e.table.api, null, t), t);
			let i = await fetch(Yc("GET", e.table.api, null, t), Jc("GET", e.table.api, null, r)), a = await Pc(i), o = Vc(i, a);
			if (o) return this.handleTableErrors(o), !1;
			if (!a.data) return this.handleTableErrors(this.translate("Empty response")), !1;
			e.events && e.events.afterItemsLoad && e.events.afterItemsLoad(a.data, i);
			let s;
			s = e.table.api.input.items ? typeof e.table.api.input.items == "string" ? a.data[e.table.api.input.items] : e.table.api.input.items(a.data, i) : a.data, n && (e.table.api.input.total ? n.pagination.total = typeof e.table.api.input.total == "string" ? a.data[e.table.api.input.total] : e.table.api.input.total(a.data, i) : a.data.total && (n.pagination.total = a.data.total), n.pagination.items = s.length, this.calcPage());
			let c = Zc(s);
			return this.convertIn(e.table.columns, c), e.debug && console.log("[vu-admin] fetchItems response:", i.status, "items:", c.length, "total:", n?.pagination?.total), c;
		},
		async fetchRelation(e, t, n) {
			try {
				let r = e.relation.params ? e.relation.params : {};
				e.relation.columns && (r.columns = JSON.stringify(e.relation.columns));
				let i = {};
				if (e.relation.ids && e.relation.ids.length) {
					let t = (typeof e.relation.ids[0] == "string" ? "text" : "number") == "string" ? "'" + e.relation.ids.join("','") + "'" : e.relation.ids.join(",");
					i[e.relation.foreign] = {
						type: "array",
						value: t,
						operator: "IN"
					};
				}
				r.filter = JSON.stringify(i), ul(r, { column: e });
				let a = await fetch(Yc("GET", e.relation.api, null, r), Jc("GET", e.relation.api, null, n)), o = await Pc(a), s = Vc(a, o);
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
				let r = await fetch(Yc("DELETE", this.settings.form.api, n, t), Jc("DELETE", this.settings.form.api, null, this.auth)), i = await Pc(r), a = Vc(r, i);
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
				let n = await fetch(Yc("DELETE", this.settings.table.api), Jc("DELETE", this.settings.table.api, { body: JSON.stringify({ ids: e }) }, this.auth)), r = Vc(n, await Pc(n));
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
			if (typeof e == "string") {
				this.addTableMessage(e, t, n);
				return;
			}
			if (e instanceof Error) {
				this.addTableMessage(e.message || String(e), t, n);
				return;
			}
			if (Array.isArray(e) && e.length > 0) {
				for (let r of e) r && typeof r == "object" && r.message ? this.addTableMessage(r.message, r.timeout || t, r.priority || n) : typeof r == "string" && this.addTableMessage(r, t, n);
				return;
			}
			typeof e == "object" && e.message && this.addTableMessage(e.message, e.timeout || t, e.priority || n);
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
			let i = hl(this.settings), a = Object.keys(i), o = a.length ? Sl(e, i) : [];
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
				this.convertOut(this.settings.table.columns, [s]), (!this.settings.form.api.output.flatten || !c) && (s = $c(s)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(s, r, e), this.setSaveProgress({ phase: "save" });
				let d = bl(s, this.settings);
				if (!this.settings.form.api.output.item) l = JSON.stringify(d);
				else if (typeof this.settings.form.api.output.item == "string") {
					let e = {};
					e[this.settings.form.api.output.item] = d, l = JSON.stringify(e);
				} else l = JSON.stringify(this.settings.form.api.output.item(s, options));
				let f = c ? "PUT" : "POST";
				this.settings.debug && console.log("[vu-admin] saveItem", f, Yc(f, this.settings.form.api, c, r), JSON.parse(l)), u = await fetch(Yc(f, this.settings.form.api, c, r), Jc(f, this.settings.form.api, { body: l }, this.auth));
				let p = await Pc(u), m = Vc(u, p);
				if (this.settings.debug && console.log("[vu-admin] saveItem response:", u.status, p.data), m) {
					n && n(m, e, r, u);
					return;
				}
				let h = p.data;
				if (a.length && o.length) try {
					this.setSaveProgress({
						phase: "upload",
						uploadCurrent: 0
					}), Pl(e, a, await jl({
						tasks: o,
						savedItem: El(h, this.settings),
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
					})), h = Il(h, e, a, this.settings), this.setSaveProgress({ phase: "persist" });
					let t = await Fl({
						savedItem: El(h, this.settings),
						item: e,
						uploadFieldNames: a,
						fieldUploadMap: i,
						settings: this.settings,
						auth: this.auth,
						urlParams: r,
						debug: this.settings.debug
					});
					t && (h = Il(h, t, a, this.settings));
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
				let n = await fetch(Yc("PUT", this.settings.table.api), Jc("PUT", this.settings.table.api, { body: JSON.stringify({
					item: t,
					ids: this.selected
				}) }, this.auth)).catch((e) => (console.error("[vu-admin] saveBulk network error:", e), null)), r = await Pc(n), i = Vc(n, r);
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
			this.selected.length ? this.selected = [] : this.selected = this.items.map((e) => e[this.settings.pkey]);
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
			e.multiple ? il(e.value, n) : e.value = e.value === n ? null : n, this.reloadTable();
		},
		dropdownSelectAll(e, t) {
			al(e, t), this.reloadTable();
		},
		dropdownSelectInvert(e, t) {
			ol(e, t), this.reloadTable();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? sl(e) : e.value = null, this.reloadTable();
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
				this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(r), nl(tl(r, this.settings.table.exports[e.type].fields), this.settings.entity + ".csv");
			} catch (e) {
				console.error(e), this.addTableMessage(e.message, 3500, "danger");
			}
		},
		onRowInputChange(e, t, n, r) {
			!t || !t.input || (t.input.onchange && t.input.onchange(e, t, n), t.input.autosave && (this.tableWait(), this.saveItem(n, () => {
				this.tableNoWait(), this.addTableMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${n[this.settings.pkey]} )</small>`, 2500);
			}, (e, t, n, r) => {
				this.tableNoWait(), this.handleTableErrors(e);
			})));
		},
		onBulkInputChange(e, t, n) {
			!n || !n.input || n.input.onchange && n.input.onchange(e, n);
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
			let a = `${Date.now().toString(36)}-${qc(8)}`;
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
			return el(e, this.settings.translate, t, n || this.settings.language);
		},
		convertIn(e, t) {
			for (let n of e) if (n.convert && n.convert.in) for (let e of t) e[n.name] = n.convert.in(e[n.name], e, n);
		},
		convertOut(e, t) {
			for (let n of e) if (n.convert && n.convert.out) for (let e of t) e[n.name] = n.convert.out(e[n.name], e, n);
		}
	}
}, LP = ["data-bs-theme"], RP = { class: "vua-table-title" }, zP = { class: "d-flex align-items-center justify-content-between" }, BP = { class: "d-inline-block" }, VP = {
	key: 0,
	class: "card-title d-inline-block mb-2"
}, HP = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, UP = {
	key: 0,
	class: "d-inline-block"
}, WP = {
	key: 0,
	class: "d-inline-block px-1 mx-1"
}, GP = ["innerHTML"], KP = { class: "dropdown d-inline-block" }, qP = ["innerHTML"], JP = { class: "dropdown-menu text-start" }, YP = { class: "me-2 text-muted" }, XP = ["innerHTML"], ZP = ["onClick"], QP = {
	key: 1,
	class: "dropdown d-inline-block"
}, $P = { class: "mx-1" }, eF = { key: 0 }, tF = { class: "dropdown-menu" }, nF = ["onClick"], rF = {
	key: 0,
	class: "bi bi-check-square-fill me-2"
}, iF = {
	key: 1,
	class: "bi bi-x-square me-2 text-danger"
}, aF = { class: "badge text-secondary fw-normal" }, oF = {
	key: 2,
	class: "dropdown d-inline-block"
}, sF = { class: "mx-1" }, cF = { class: "dropdown-menu" }, lF = ["onClick"], uF = { class: "vua-table-header" }, dF = ["width"], fF = ["onClick"], pF = ["innerHTML"], mF = {
	key: 0,
	class: "bi bi-arrow-down"
}, hF = {
	key: 1,
	class: "bi bi-arrow-up"
}, gF = { key: 0 }, _F = ["disabled", "onClick"], vF = {
	key: 0,
	class: "vua-table-filter"
}, yF = ["width"], bF = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, xF = { class: "bi bi-check-all" }, SF = { class: "bi bi-x-lg" }, CF = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, wF = ["onUpdate:modelValue"], TF = ["disabled", "onClick"], EF = {
	key: 2,
	class: "input-group input-group-sm my-1"
}, DF = ["onUpdate:modelValue", "disabled"], OF = { value: "=" }, kF = { value: ">" }, AF = { value: ">=" }, jF = { value: "<" }, MF = { value: "<=" }, NF = ["onUpdate:modelValue", "disabled"], PF = ["value"], FF = [
	"onUpdate:modelValue",
	"disabled",
	"min",
	"max"
], IF = ["disabled", "onClick"], LF = { key: 3 }, RF = {
	key: 0,
	class: "dropdown"
}, zF = {
	class: "btn btn-sm btn-secondary dropdown-toggle my-1",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, BF = { class: "dropdown-menu" }, VF = ["onClick"], HF = {
	key: 0,
	class: "bi bi-check-square"
}, UF = {
	key: 1,
	class: "bi bi-square"
}, WF = { key: 0 }, GF = { key: 1 }, KF = ["onClick"], qF = { key: 2 }, JF = ["onClick"], YF = { key: 3 }, XF = ["onClick"], ZF = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, QF = ["onUpdate:modelValue", "multiple"], $F = ["value"], eI = ["disabled", "onClick"], tI = {
	key: 4,
	class: "input-group input-group-sm my-1"
}, nI = ["onUpdate:modelValue"], rI = { value: "=" }, iI = { value: ">" }, aI = { value: ">=" }, oI = { value: "<" }, sI = { value: "<=" }, cI = ["onUpdate:modelValue"], lI = ["value"], uI = ["type", "onUpdate:modelValue"], dI = ["disabled", "onClick"], fI = ["disabled", "onClick"], pI = { class: "align-middle" }, mI = [
	"data-label",
	"width",
	"onClick"
], hI = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, gI = ["innerHTML"], _I = { key: 1 }, vI = ["innerHTML"], yI = ["aria-valuenow", "aria-valuemax"], bI = { key: 0 }, xI = {
	key: 4,
	class: "input-group input-group-sm"
}, SI = ["innerHTML"], CI = {
	key: 1,
	class: "input-group-text"
}, wI = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], TI = [
	"type",
	"onChange",
	"onUpdate:modelValue"
], EI = ["onChange", "onUpdate:modelValue"], DI = ["value"], OI = ["innerHTML"], kI = {
	key: 5,
	class: "input-group-text"
}, AI = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], jI = { key: 5 }, MI = ["disabled", "onClick"], NI = ["innerHTML"], PI = { key: 2 }, FI = { key: 0 }, II = ["colspan"], LI = { class: "row g-3 align-items-center" }, RI = { class: "col-form-label" }, zI = [
	"type",
	"onUpdate:modelValue",
	"onChange"
], BI = ["onUpdate:modelValue", "onChange"], VI = ["onUpdate:modelValue", "onChange"], HI = ["value"], UI = ["innerHTML"], WI = {
	key: 0,
	class: "bg-light text-dark"
}, GI = {
	key: 0,
	class: "vua-table-bulk border-info"
}, KI = ["data-label", "width"], qI = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, JI = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, YI = [
	"type",
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], XI = [
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], ZI = ["value"], QI = ["onClick"], $I = {
	key: 0,
	class: "bi bi-square text-secondary"
}, eL = {
	key: 1,
	class: "bi bi-check-square"
}, tL = { key: 2 }, nL = ["disabled", "onClick"], rL = ["innerHTML"], iL = { key: 2 }, aL = ["id"], oL = { class: "modal-dialog modal-xl" }, sL = { class: "modal-content h-100" };
function cL(t, c, l, u, d, f) {
	let p = b("VuAdminTablePagination"), g = b("VuAdminForm");
	return _(), i("div", null, [f.authAndSettings() ? (_(), i("div", {
		key: 0,
		class: m(["vua-table-container", [l.settings.class]]),
		"data-bs-theme": [l.settings.theme]
	}, [
		a("div", { class: m(["vua-overlay", { blocked: d.ui.block.table }]) }, null, 2),
		a("div", RP, [a("div", zP, [a("div", BP, [l.settings.table.title ? (_(), i("h5", VP, x(l.settings.table.title), 1)) : r("", !0), D(a("div", HP, [...c[15] ||= [a("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[ee, d.ui.wait.table && l.settings.table.title]])]), d.messages.table.length ? (_(), i("div", UP, [d.message.table ? (_(), i("small", WP, [a("span", { class: m(["text-" + d.message.table.priority]) }, [a("span", {
			class: "fw-bold",
			innerHTML: d.message.table.msg
		}, null, 8, GP)], 2)])) : r("", !0), a("div", KP, [a("button", {
			class: m(["btn btn-sm dropdown-toggle", ["btn-" + d.messages.table[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: d.messages.table.length + " " + (d.messages.table.length > 1 ? f.translate("messages") : f.translate("message"))
		}, null, 10, qP), a("ul", JP, [(_(!0), i(e, null, y(d.messages.table, (e) => (_(), i("li", { key: e }, [a("span", { class: m(["dropdown-item", ["text-" + e.priority]]) }, [a("small", YP, x(e.datetime), 1), a("span", {
			class: "fw-bold",
			innerHTML: e.msg
		}, null, 8, XP)], 2)]))), 128))])])])) : r("", !0)])]),
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
			}, [a("i", { class: m([t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
				button: t,
				table: this
			})]) }, null, 2), o(" " + x(f.translate(t.title)), 1)], 10, ZP)) : r("", !0),
			t.action === "TABLE_COLUMNS" ? (_(), i("div", QP, [a("button", {
				type: "button",
				class: m([[t.class ? t.class : f.getButtonClassByAction(t.action)], "dropdown-toggle"]),
				"data-bs-toggle": "dropdown",
				"data-bs-auto-close": "outside",
				"aria-expanded": "false"
			}, [D(a("span", $P, [
				a("i", { class: m([t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
					button: t,
					table: this
				})]) }, null, 2),
				o(" " + x(f.translate(t.title)) + " ", 1),
				f.countHiddenColumns() ? (_(), i("span", eF, " ( " + x(f.countHiddenColumns()) + " " + x(f.translate("hidden")) + " ) ", 1)) : r("", !0)
			], 512), [[ee, l.settings.table.columns.length > 0]])], 2), a("ul", tF, [
				(_(!0), i(e, null, y(l.settings.table.columns, (e) => (_(), i("li", { key: e }, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (t) => f.toggleColumn(e)
				}, [
					e.hidden ? r("", !0) : (_(), i("i", rF)),
					e.hidden ? (_(), i("i", iF)) : r("", !0),
					o(" " + x(e.title) + " ", 1),
					a("small", aF, x(e.name), 1)
				], 8, nF)]))), 128)),
				c[16] ||= a("li", null, [a("hr", { class: "dropdown-divider" })], -1),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: c[0] ||= (e) => f.toggleColumn(!0)
				}, x(f.translate("Visible all")), 1)]),
				a("li", null, [a("span", {
					class: "dropdown-item cursor-pointer",
					onClick: c[1] ||= (e) => f.toggleColumn(!1)
				}, x(f.translate("Hidden all")), 1)])
			])])) : r("", !0),
			t.dropdowns ? (_(), i("div", oF, [a("button", {
				type: "button",
				class: m([[t.class], "dropdown-toggle"]),
				"data-bs-toggle": "dropdown",
				"data-bs-auto-close": "outside",
				"aria-expanded": "false"
			}, [a("span", sF, [a("i", { class: m([t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
				button: t,
				table: this
			})]) }, null, 2), o(" " + x(f.translate(t.title)), 1)])], 2), a("ul", cF, [(_(!0), i(e, null, y(t.dropdowns, (e) => (_(), i("li", { key: e }, [a("span", {
				class: m(["dropdown-item cursor-pointer", [e.class]]),
				onClick: (t) => f.tableAction(e, {
					items: d.items,
					$event: t
				})
			}, [e.icon ? (_(), i("i", {
				key: 0,
				class: m([e.icon])
			}, null, 2)) : r("", !0), o(" " + x(f.translate(e.title)), 1)], 10, lF)]))), 128))])])) : r("", !0)
		]))), 128))], 2)) : r("", !0),
		l.settings.table ? (_(), i("table", {
			key: 1,
			class: m(["table vua-table mb-0", [l.settings.table.class]])
		}, [
			a("thead", null, [a("tr", uF, [(_(!0), i(e, null, y(l.settings.table.columns, (t) => (_(), i("th", {
				class: m(["", [t.header ? t.header.class : ""]]),
				style: h([t.hidden ? "display: none" : ""]),
				key: t,
				width: t.width
			}, [a("span", {
				class: m(["d-inline-block no-select text-nowrap", { "cursor-pointer": f.isSortable(t) }]),
				onClick: (e) => f.sortTable(t)
			}, [a("span", { innerHTML: t.header && t.header.title !== void 0 ? f.translate(t.header.title) : t.title ? f.translate(t.title) : f.translate(t.name) }, null, 8, pF), d.config.order[t.name] ? (_(), i("span", {
				key: 0,
				class: m(["badge text-bg-light ms-1 p-badge", { "opacity-50": d.config.order[t.name].fixed }])
			}, [
				d.config.order[t.name].dir === "ASC" ? (_(), i("i", mF)) : r("", !0),
				d.config.order[t.name].dir === "DESC" ? (_(), i("i", hF)) : r("", !0),
				o(" " + x(d.config.order[t.name].idx + 1), 1)
			], 2)) : r("", !0)], 10, fF), t.header && t.header.buttons ? (_(), i("span", gF, [(_(!0), i(e, null, y(t.header.buttons, (e) => (_(), i("button", {
				key: e.action,
				type: "button",
				disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
				class: m([e.class ? e.class : f.getButtonClassByAction(e.action)]),
				onClick: (t) => f.tableAction(e, {
					items: d.items,
					$event: t
				})
			}, [a("i", { class: m([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
				button: e,
				column: t,
				table: this
			})]) }, null, 2), o(" " + x(f.translate(e.title)), 1)], 10, _F))), 128))])) : r("", !0)], 14, dF))), 128))]), f.countFilters() ? (_(), i("tr", vF, [(_(!0), i(e, null, y(l.settings.table.columns, (t) => (_(), i("th", {
				style: h([t.hidden ? "display: none" : ""]),
				key: t,
				width: t.width,
				class: m([t.filter ? t.filter.class : ""])
			}, [
				t.index && t.click ? (_(), i("div", bF, [a("span", {
					class: m(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: f.haveSelectedRowInPage() }]),
					onClick: c[2] ||= (e) => f.toggleSelectedRowInPage()
				}, [D(a("i", xF, null, 512), [[ee, !f.haveSelectedRowInPage()]]), D(a("i", SF, null, 512), [[ee, f.haveSelectedRowInPage()]])], 2)])) : r("", !0),
				t.filter && t.filter.type == "text" ? (_(), i("div", CF, [D(a("input", {
					type: "text",
					class: m([{ fixed: t.filter.fixed }, "form-control form-control-sm"]),
					"onUpdate:modelValue": (e) => t.filter.value = e,
					onKeyup: c[3] ||= ne((e) => f.reloadTable(), ["enter"])
				}, null, 42, wF), [[E, t.filter.value]]), t.filter.buttonx && t.filter.buttonx != 0 ? (_(), i("button", {
					key: 0,
					class: m(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
					disabled: t.filter.value == null,
					onClick: (e) => {
						t.filter.value = void 0, f.reloadTable();
					}
				}, [...c[17] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, TF)) : r("", !0)])) : r("", !0),
				t.filter && t.filter.type == "number" ? (_(), i("div", EF, [
					t.filter.operators == 1 ? D((_(), i("select", {
						key: 0,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						disabled: t.filter.fixed,
						onChange: c[4] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [
						a("option", OF, x(f.translate("=")), 1),
						a("option", kF, x(f.translate(">")), 1),
						a("option", AF, x(f.translate(">=")), 1),
						a("option", jF, x(f.translate("<")), 1),
						a("option", MF, x(f.translate("<=")), 1)
					], 40, DF)), [[T, t.filter.operator]]) : r("", !0),
					t.filter.operators && t.filter.operators.length > 0 ? D((_(), i("select", {
						key: 1,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						disabled: t.filter.fixed,
						onChange: c[5] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [(_(!0), i(e, null, y(t.filter.operators, (e) => (_(), i("option", {
						key: e,
						value: e.value
					}, x(e.label), 9, PF))), 128))], 40, NF)), [[T, t.filter.operator]]) : r("", !0),
					D(a("input", {
						type: "number",
						class: m(["form-control", { fixed: t.filter.fixed }]),
						"onUpdate:modelValue": (e) => t.filter.value = e,
						disabled: t.filter.fixed,
						min: t.filter.min,
						max: t.filter.max,
						onChange: c[6] ||= (e) => f.reloadTable(),
						onKeyup: c[7] ||= ne((e) => f.reloadTable(), ["enter"])
					}, null, 42, FF), [[E, t.filter.value]]),
					!t.filter.fixed && t.filter.buttonx && t.filter.buttonx != 0 ? (_(), i("button", {
						key: 2,
						class: m(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
						disabled: t.filter.value == null,
						onClick: (e) => {
							t.filter.value = void 0, f.reloadTable();
						}
					}, [...c[18] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, IF)) : r("", !0)
				])) : r("", !0),
				t.filter && t.filter.type == "select" ? (_(), i("div", LF, [t.filter.dropdown ? (_(), i("div", RF, [a("button", zF, x(t.filter.multiple ? t.filter.value.length + " selected" : t.filter.value ? t.filter.value : "not selected"), 1), a("ul", BF, [
					a("li", null, [(_(!0), i(e, null, y(t.filter.options, (e) => (_(), i("span", {
						key: e,
						class: m(["dropdown-item cursor-pointer", { selected: t.filter.multiple ? t.filter.value.indexOf(e.value) >= 0 : t.filter.value === e.value }]),
						onClick: (n) => f.dropdownSelectToggleOne(t.filter, e)
					}, [(t.filter.multiple ? t.filter.value.indexOf(e.value) >= 0 : t.filter.value === e.value) ? (_(), i("i", HF)) : (_(), i("i", UF)), o(" " + x(f.translate(e.label ? e.label : e.value)), 1)], 10, VF))), 128))]),
					t.filter.multiple ? (_(), i("li", WF, [...c[19] ||= [a("hr", { class: "dropdown-divider" }, null, -1)]])) : r("", !0),
					t.filter.multiple ? (_(), i("li", GF, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => f.dropdownSelectAll(t.filter.value, t.filter.options)
					}, x(f.translate("Select all")), 9, KF)])) : r("", !0),
					t.filter.multiple ? (_(), i("li", qF, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => f.dropdownSelectClear(t.filter.value)
					}, x(f.translate("Unselect all")), 9, JF)])) : r("", !0),
					t.filter.multiple ? (_(), i("li", YF, [a("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => f.dropdownSelectInvert(t.filter.value, t.filter.options)
					}, x(f.translate("Invert all")), 9, XF)])) : r("", !0)
				])])) : (_(), i("div", ZF, [D(a("select", {
					"onUpdate:modelValue": (e) => t.filter.value = e,
					onChange: c[8] ||= (e) => f.reloadTable(),
					multiple: t.filter.multiple,
					class: "form-select form-select-sm pe-0"
				}, [(_(!0), i(e, null, y(t.filter.options, (e) => (_(), i("option", {
					key: e,
					value: e.value
				}, x(f.translate(e.label ? e.label : e.value)), 9, $F))), 128))], 40, QF), [[T, t.filter.value]]), t.filter.buttonx && t.filter.buttonx != 0 ? (_(), i("button", {
					key: 0,
					class: m(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
					disabled: t.filter.value == null,
					onClick: (e) => {
						t.filter.value = void 0, f.reloadTable();
					}
				}, [...c[20] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, eI)) : r("", !0)]))])) : r("", !0),
				t.filter && (t.filter.type == "datetime-local" || t.filter.type == "date") ? (_(), i("div", tI, [
					t.filter.operators == 1 ? D((_(), i("select", {
						key: 0,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						onChange: c[9] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [
						a("option", rI, x(f.translate("=")), 1),
						a("option", iI, x(f.translate(">")), 1),
						a("option", aI, x(f.translate(">=")), 1),
						a("option", oI, x(f.translate("<")), 1),
						a("option", sI, x(f.translate("<=")), 1)
					], 40, nI)), [[T, t.filter.operator]]) : r("", !0),
					t.filter.operators && t.filter.operators.length > 0 ? D((_(), i("select", {
						key: 1,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						onChange: c[10] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [(_(!0), i(e, null, y(t.filter.operators, (e) => (_(), i("option", {
						key: e,
						value: e.value
					}, x(f.translate(e.label)), 9, lI))), 128))], 40, cI)), [[T, t.filter.operator]]) : r("", !0),
					D(a("input", {
						type: t.filter.type,
						class: m([{ fixed: t.filter.fixed }, "form-control form-control-sm"]),
						"onUpdate:modelValue": (e) => t.filter.value = e,
						onChange: c[11] ||= (e) => f.reloadTable(),
						onKeyup: c[12] ||= ne((e) => f.reloadTable(), ["enter"])
					}, null, 42, uI), [[w, t.filter.value]]),
					a("button", {
						class: m(["btn btn-outline-secondary", { "opacity-25": !t.filter.value }]),
						disabled: !t.filter.value,
						onClick: (e) => {
							t.filter.value = void 0, f.reloadTable();
						}
					}, [...c[21] ||= [a("i", { class: "bi bi-x" }, null, -1)]], 10, dI)
				])) : r("", !0),
				t.filter && t.filter.buttons ? (_(), i("span", {
					key: 5,
					class: m(f.getValueOrFunction(t.filter.buttons, { column: t }))
				}, [(_(!0), i(e, null, y(t.filter.buttons, (e) => (_(), i("span", { key: e.action }, [a("button", {
					type: "button",
					disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
					class: m([e.class ? e.class : f.getButtonClassByAction(e.action)]),
					onClick: (t) => f.tableAction(e, {
						items: d.items,
						$event: t
					})
				}, [a("i", { class: m([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
					button: e,
					column: t,
					table: this
				})]) }, null, 2), o(" " + x(f.translate(e.title)), 1)], 10, fI)]))), 128))], 2)) : r("", !0)
			], 14, yF))), 128))])) : r("", !0)]),
			a("tbody", null, [(_(!0), i(e, null, y(this.items, (t, n) => (_(), i(e, { key: t.id }, [a("tr", pI, [(_(!0), i(e, null, y(l.settings.table.columns, (o) => (_(), i("td", {
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
				o.index ? (_(), i("div", hI, [a("span", {
					class: m(["cursor-pointer badge border badge-index p-1 w-100", { selected: d.selected.indexOf(t[l.settings.pkey]) >= 0 }]),
					innerHTML: n + 1 + (d.config.pagination.page - 1) * d.config.pagination.limit
				}, null, 10, gI)])) : r("", !0),
				!o.template && !o.input && !o.progressbar ? (_(), i("span", _I, x(f.tableCellValue(o.name, t, n, o)), 1)) : r("", !0),
				o.template ? (_(), i("span", {
					key: 2,
					innerHTML: f.tableCellTemplate(o.template, t, n, o)
				}, null, 8, vI)) : r("", !0),
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
				}, [o.progressbar.value ? (_(), i("span", bI, x(t[o.name]), 1)) : r("", !0)], 6)], 8, yI)) : r("", !0),
				o.input ? (_(), i("div", xI, [
					o.input.prefix ? (_(), i("span", {
						key: 0,
						class: "input-group-text",
						innerHTML: f.getValueOrFunction(o.input.prefix, {
							column: o,
							item: t
						})
					}, null, 8, SI)) : r("", !0),
					o.input.prefixcheck ? (_(), i("span", CI, [D(a("input", {
						class: "form-check p-0 m-0",
						type: "checkbox",
						name: o.input.prefixcheck.name,
						"onUpdate:modelValue": (e) => t[o.input.prefixcheck.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.input.prefixcheck.name], o, t, n)
					}, null, 40, wI), [[C, t[o.input.prefixcheck.name]]])])) : r("", !0),
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
					}, null, 42, TI)), [[w, t[o.name]]]) : r("", !0),
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
					}, x(f.translate(e.label)), 9, DI))), 128))], 42, EI)), [[T, t[o.name]]]) : r("", !0),
					o.input.suffix ? (_(), i("span", {
						key: 4,
						class: "input-group-text",
						innerHTML: f.getValueOrFunction(o.input.suffix, {
							column: o,
							item: t
						})
					}, null, 8, OI)) : r("", !0),
					o.input.suffixcheck ? (_(), i("span", kI, [D(a("input", {
						class: "form-check p-0 m-0",
						type: "checkbox",
						name: o.input.suffixcheck.name,
						"onUpdate:modelValue": (e) => t[o.input.suffixcheck.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.input.suffixcheck.name], o, t, n)
					}, null, 40, AI), [[C, t[o.input.suffixcheck.name]]])])) : r("", !0)
				])) : r("", !0),
				o.buttons ? (_(), i("span", jI, [(_(!0), i(e, null, y(o.buttons, (e) => (_(), i("span", { key: e.action }, [e.hidden ? r("", !0) : (_(), i("button", {
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
					class: m([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
						button: e,
						column: o,
						item: t,
						table: this
					})])
				}, null, 2)), e.template ? (_(), i("span", {
					key: 1,
					innerHTML: f.tableCellTemplate(e.template, t, n, o)
				}, null, 8, NI)) : (_(), i("span", PI, x(f.translate(e.title)), 1))], 10, MI))]))), 128))])) : r("", !0)
			], 14, mI))), 128))]), l.settings.table.details && d.details.indexOf(t[l.settings.pkey]) >= 0 ? (_(), i("tr", FI, [a("td", {
				class: m([l.settings.table.details.class]),
				colspan: l.settings.table.columns.length
			}, [
				(_(!0), i(e, null, y(l.settings.table.details.fields, (o) => (_(), i("div", {
					class: "m-0",
					key: o
				}, [a("div", LI, [a("div", { class: m(["col text-end", [o.class]]) }, [a("label", RI, x(o.label), 1)], 2), a("div", { class: m(["col", [o.input.class]]) }, [
					["select", "textarea"].indexOf(o.input.type) < 0 ? D((_(), i("input", {
						key: 0,
						type: o.input.type,
						class: "form-control form-control-sm",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, n)
					}, null, 40, zI)), [[w, t[o.name]]]) : r("", !0),
					o.input.type == "textarea" ? D((_(), i("textarea", {
						key: 1,
						class: "form-control form-control-sm",
						rows: "3",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, n)
					}, "\r\n                    ", 40, BI)), [[E, t[o.name]]]) : r("", !0),
					o.input.type == "select" ? D((_(), i("select", {
						key: 2,
						class: "form-select form-select-sm pe-0",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, n)
					}, [(_(!0), i(e, null, y(o.input.options, (e) => (_(), i("option", {
						value: e.value,
						key: e
					}, x(f.translate(e.label)), 9, HI))), 128))], 40, VI)), [[T, t[o.name]]]) : r("", !0)
				], 2)])]))), 128)),
				a("span", { innerHTML: l.settings.table.details.raw(t) }, null, 8, UI),
				l.settings.debug > 1 ? (_(), i("pre", WI, "                  " + x(t) + "\n                ", 1)) : r("", !0)
			], 10, II)])) : r("", !0)], 64))), 128))]),
			a("tfoot", null, [d.selected.length > 0 ? (_(), i("tr", GI, [(_(!0), i(e, null, y(l.settings.table.columns, (t) => (_(), i("td", {
				style: h([t.hidden ? "display: none" : ""]),
				key: t.name,
				"data-label": t.title,
				width: t.width,
				class: m(t.class)
			}, [
				t.index ? (_(), i("div", qI, [a("span", {
					class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
					onClick: c[13] ||= (e) => f.toggleSelectedAll()
				}, x(d.selected.length), 1)])) : r("", !0),
				t.input && t.bulk && t.bulk.enabled ? (_(), i("div", JI, [
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
					}, null, 42, YI)), [[w, d.bulkitem[t.name]]]) : r("", !0),
					t.input.type == "select" ? D((_(), i("select", {
						key: 1,
						class: m(["form-select form-select-sm pe-0", t.input.class]),
						disabled: d.bulkinputs.indexOf(t.name) < 0,
						onChange: (e) => f.onBulkInputChange(d.bulkitem[t.name], d.bulkitem, t),
						"onUpdate:modelValue": (e) => d.bulkitem[t.name] = e
					}, [(_(!0), i(e, null, y(t.input.options, (e) => (_(), i("option", {
						value: e.value,
						key: e
					}, x(f.translate(e.label)), 9, ZI))), 128))], 42, XI)), [[T, d.bulkitem[t.name]]]) : r("", !0),
					a("span", {
						class: "input-group-text cursor-pointer",
						onClick: (e) => f.ifBulkInputClick(t)
					}, [d.bulkitem[t.name] === void 0 ? (_(), i("i", $I)) : (_(), i("i", eL))], 8, QI)
				])) : r("", !0),
				t.bulk ? (_(), i("span", tL, [(_(!0), i(e, null, y(t.bulk.buttons, (e) => (_(), i("span", { key: e.action }, [a("button", {
					type: "button",
					class: m([e.class ? e.class : f.getButtonClassByAction(e.action)]),
					disabled: e.action === "save" && !this.bulkinputs.length,
					onClick: (n) => f.tableBulkAction(e.action, d.bulkitem, t, n)
				}, [e.icon === null ? r("", !0) : (_(), i("i", {
					key: 0,
					class: m([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
						button: e,
						column: t,
						table: this
					})])
				}, null, 2)), e.template ? (_(), i("span", {
					key: 1,
					innerHTML: f.tableCellTemplate(e.template, d.bulkitem, null, t)
				}, null, 8, rL)) : (_(), i("span", iL, x(f.translate(e.title)), 1))], 10, nL)]))), 128))])) : r("", !0)
			], 14, KI))), 128))])) : r("", !0)])
		], 2)) : r("", !0),
		s(p, {
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
	], 10, LP)) : r("", !0), a("div", {
		class: "modal shadow",
		id: d.modalId,
		tabindex: "-1"
	}, [a("div", oL, [a("div", sL, [f.authAndSettings() && l.settings.form.visible && l.settings.form.groups ? (_(), n(g, {
		key: 0,
		modelValue: d.item,
		"onUpdate:modelValue": c[14] ||= (e) => d.item = e,
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
	])) : r("", !0)])])], 8, aL)]);
}
var lL = {
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
				language: document.documentElement ? document.documentElement.lang : "hu",
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
				if (this.settings = Mc(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
					let e = document.documentElement.getAttribute("data-bs-theme");
					this.settings.theme = e || "light";
				}
				this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && console.log(`[vu-admin] entity "${this.entity}" initialized`, this.settings.debug > 1 ? this.settings : "");
			} else console.error(`Entity config (${this.entity}) not found`);
			this.$forceUpdate();
		}
	},
	components: { VuAdminTable: /* @__PURE__ */ $D(IP, [["render", cL]]) }
}, uL = { key: 0 }, dL = ["data-bs-theme"];
function fL(e, t, n, a, o, c) {
	let l = b("vu-admin-table");
	return e.entity && e.settings ? (_(), i("div", uL, [e.auth ? (_(), i("div", {
		key: 0,
		class: "vu-admin",
		"data-bs-theme": [e.settings.theme]
	}, [s(l, {
		settings: e.settings,
		auth: e.auth
	}, null, 8, ["settings", "auth"])], 8, dL)) : r("", !0)])) : r("", !0);
}
var pL = /*#__PURE__*/ $D(lL, [["render", fL]]), mL = (/* @__PURE__ */ ie(((e, t) => {
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
			return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296), this;
		}, x.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var e = this.blocks, t = this.lastByteIndex;
				e[32] = this.block, e[t >>> 2] |= l[t & 3], this.block = e[32], t >= 112 && (this.hashed || this.hash(), e[0] = this.block, e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = e[16] = e[17] = e[18] = e[19] = e[20] = e[21] = e[22] = e[23] = e[24] = e[25] = e[26] = e[27] = e[28] = e[29] = e[30] = e[31] = e[32] = 0), e[30] = this.hBytes << 3 | this.bytes >>> 29, e[31] = this.bytes << 3, this.hash();
			}
		}, x.prototype.hash = function() {
			var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, c = this.h4h, l = this.h4l, u = this.h5h, f = this.h5l, p = this.h6h, m = this.h6l, h = this.h7h, g = this.h7l, _ = this.blocks, v, y, b, x, S, C, w, T, E, ee, te, D, ne, O, re, ie, ae, k, oe, A, j, M, N, se, ce;
			for (v = 32; v < 160; v += 2) A = _[v - 30], j = _[v - 29], y = (A >>> 1 | j << 31) ^ (A >>> 8 | j << 24) ^ A >>> 7, b = (j >>> 1 | A << 31) ^ (j >>> 8 | A << 24) ^ (j >>> 7 | A << 25), A = _[v - 4], j = _[v - 3], x = (A >>> 19 | j << 13) ^ (j >>> 29 | A << 3) ^ A >>> 6, S = (j >>> 19 | A << 13) ^ (A >>> 29 | j << 3) ^ (j >>> 6 | A << 26), A = _[v - 32], j = _[v - 31], M = _[v - 14], N = _[v - 13], C = (N & 65535) + (j & 65535) + (b & 65535) + (S & 65535), w = (N >>> 16) + (j >>> 16) + (b >>> 16) + (S >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (y & 65535) + (x & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (y >>> 16) + (x >>> 16) + (T >>> 16), _[v] = E << 16 | T & 65535, _[v + 1] = w << 16 | C & 65535;
			var le = e, ue = t, de = n, P = r, fe = i, pe = a, me = o, he = s, ge = c, _e = l, ve = u, ye = f, be = p, xe = m, F = h, I = g;
			for (ie = de & fe, ae = P & pe, v = 0; v < 160; v += 8) y = (le >>> 28 | ue << 4) ^ (ue >>> 2 | le << 30) ^ (ue >>> 7 | le << 25), b = (ue >>> 28 | le << 4) ^ (le >>> 2 | ue << 30) ^ (le >>> 7 | ue << 25), x = (ge >>> 14 | _e << 18) ^ (ge >>> 18 | _e << 14) ^ (_e >>> 9 | ge << 23), S = (_e >>> 14 | ge << 18) ^ (_e >>> 18 | ge << 14) ^ (ge >>> 9 | _e << 23), ee = le & de, te = ue & P, k = ee ^ le & fe ^ ie, oe = te ^ ue & pe ^ ae, se = ge & ve ^ ~ge & be, ce = _e & ye ^ ~_e & xe, A = _[v], j = _[v + 1], M = d[v], N = d[v + 1], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (I & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (I >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (F & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (F >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (oe & 65535) + (b & 65535), w = (oe >>> 16) + (b >>> 16) + (C >>> 16), T = (k & 65535) + (y & 65535) + (w >>> 16), E = (k >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (he & 65535) + (j & 65535), w = (he >>> 16) + (j >>> 16) + (C >>> 16), T = (me & 65535) + (A & 65535) + (w >>> 16), E = (me >>> 16) + (A >>> 16) + (T >>> 16), F = E << 16 | T & 65535, I = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), me = E << 16 | T & 65535, he = w << 16 | C & 65535, y = (me >>> 28 | he << 4) ^ (he >>> 2 | me << 30) ^ (he >>> 7 | me << 25), b = (he >>> 28 | me << 4) ^ (me >>> 2 | he << 30) ^ (me >>> 7 | he << 25), x = (F >>> 14 | I << 18) ^ (F >>> 18 | I << 14) ^ (I >>> 9 | F << 23), S = (I >>> 14 | F << 18) ^ (I >>> 18 | F << 14) ^ (F >>> 9 | I << 23), D = me & le, ne = he & ue, k = D ^ me & de ^ ee, oe = ne ^ he & P ^ te, se = F & ge ^ ~F & ve, ce = I & _e ^ ~I & ye, A = _[v + 2], j = _[v + 3], M = d[v + 2], N = d[v + 3], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (xe & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (xe >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (be & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (be >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (oe & 65535) + (b & 65535), w = (oe >>> 16) + (b >>> 16) + (C >>> 16), T = (k & 65535) + (y & 65535) + (w >>> 16), E = (k >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (pe & 65535) + (j & 65535), w = (pe >>> 16) + (j >>> 16) + (C >>> 16), T = (fe & 65535) + (A & 65535) + (w >>> 16), E = (fe >>> 16) + (A >>> 16) + (T >>> 16), be = E << 16 | T & 65535, xe = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), fe = E << 16 | T & 65535, pe = w << 16 | C & 65535, y = (fe >>> 28 | pe << 4) ^ (pe >>> 2 | fe << 30) ^ (pe >>> 7 | fe << 25), b = (pe >>> 28 | fe << 4) ^ (fe >>> 2 | pe << 30) ^ (fe >>> 7 | pe << 25), x = (be >>> 14 | xe << 18) ^ (be >>> 18 | xe << 14) ^ (xe >>> 9 | be << 23), S = (xe >>> 14 | be << 18) ^ (xe >>> 18 | be << 14) ^ (be >>> 9 | xe << 23), O = fe & me, re = pe & he, k = O ^ fe & le ^ D, oe = re ^ pe & ue ^ ne, se = be & F ^ ~be & ge, ce = xe & I ^ ~xe & _e, A = _[v + 4], j = _[v + 5], M = d[v + 4], N = d[v + 5], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (ye & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (ye >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (ve & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (ve >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (oe & 65535) + (b & 65535), w = (oe >>> 16) + (b >>> 16) + (C >>> 16), T = (k & 65535) + (y & 65535) + (w >>> 16), E = (k >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (P & 65535) + (j & 65535), w = (P >>> 16) + (j >>> 16) + (C >>> 16), T = (de & 65535) + (A & 65535) + (w >>> 16), E = (de >>> 16) + (A >>> 16) + (T >>> 16), ve = E << 16 | T & 65535, ye = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), de = E << 16 | T & 65535, P = w << 16 | C & 65535, y = (de >>> 28 | P << 4) ^ (P >>> 2 | de << 30) ^ (P >>> 7 | de << 25), b = (P >>> 28 | de << 4) ^ (de >>> 2 | P << 30) ^ (de >>> 7 | P << 25), x = (ve >>> 14 | ye << 18) ^ (ve >>> 18 | ye << 14) ^ (ye >>> 9 | ve << 23), S = (ye >>> 14 | ve << 18) ^ (ye >>> 18 | ve << 14) ^ (ve >>> 9 | ye << 23), ie = de & fe, ae = P & pe, k = ie ^ de & me ^ O, oe = ae ^ P & he ^ re, se = ve & be ^ ~ve & F, ce = ye & xe ^ ~ye & I, A = _[v + 6], j = _[v + 7], M = d[v + 6], N = d[v + 7], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (_e & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (_e >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (ge & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (ge >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (oe & 65535) + (b & 65535), w = (oe >>> 16) + (b >>> 16) + (C >>> 16), T = (k & 65535) + (y & 65535) + (w >>> 16), E = (k >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (ue & 65535) + (j & 65535), w = (ue >>> 16) + (j >>> 16) + (C >>> 16), T = (le & 65535) + (A & 65535) + (w >>> 16), E = (le >>> 16) + (A >>> 16) + (T >>> 16), ge = E << 16 | T & 65535, _e = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), le = E << 16 | T & 65535, ue = w << 16 | C & 65535;
			C = (t & 65535) + (ue & 65535), w = (t >>> 16) + (ue >>> 16) + (C >>> 16), T = (e & 65535) + (le & 65535) + (w >>> 16), E = (e >>> 16) + (le >>> 16) + (T >>> 16), this.h0h = E << 16 | T & 65535, this.h0l = w << 16 | C & 65535, C = (r & 65535) + (P & 65535), w = (r >>> 16) + (P >>> 16) + (C >>> 16), T = (n & 65535) + (de & 65535) + (w >>> 16), E = (n >>> 16) + (de >>> 16) + (T >>> 16), this.h1h = E << 16 | T & 65535, this.h1l = w << 16 | C & 65535, C = (a & 65535) + (pe & 65535), w = (a >>> 16) + (pe >>> 16) + (C >>> 16), T = (i & 65535) + (fe & 65535) + (w >>> 16), E = (i >>> 16) + (fe >>> 16) + (T >>> 16), this.h2h = E << 16 | T & 65535, this.h2l = w << 16 | C & 65535, C = (s & 65535) + (he & 65535), w = (s >>> 16) + (he >>> 16) + (C >>> 16), T = (o & 65535) + (me & 65535) + (w >>> 16), E = (o >>> 16) + (me >>> 16) + (T >>> 16), this.h3h = E << 16 | T & 65535, this.h3l = w << 16 | C & 65535, C = (l & 65535) + (_e & 65535), w = (l >>> 16) + (_e >>> 16) + (C >>> 16), T = (c & 65535) + (ge & 65535) + (w >>> 16), E = (c >>> 16) + (ge >>> 16) + (T >>> 16), this.h4h = E << 16 | T & 65535, this.h4l = w << 16 | C & 65535, C = (f & 65535) + (ye & 65535), w = (f >>> 16) + (ye >>> 16) + (C >>> 16), T = (u & 65535) + (ve & 65535) + (w >>> 16), E = (u >>> 16) + (ve >>> 16) + (T >>> 16), this.h5h = E << 16 | T & 65535, this.h5l = w << 16 | C & 65535, C = (m & 65535) + (xe & 65535), w = (m >>> 16) + (xe >>> 16) + (C >>> 16), T = (p & 65535) + (be & 65535) + (w >>> 16), E = (p >>> 16) + (be >>> 16) + (T >>> 16), this.h6h = E << 16 | T & 65535, this.h6l = w << 16 | C & 65535, C = (g & 65535) + (I & 65535), w = (g >>> 16) + (I >>> 16) + (C >>> 16), T = (h & 65535) + (F & 65535) + (w >>> 16), E = (h >>> 16) + (F >>> 16) + (T >>> 16), this.h7h = E << 16 | T & 65535, this.h7l = w << 16 | C & 65535;
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
//#endregion
//#region src/components/VuAuth.vue
jc();
var hL = {
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
	components: { VuAdminForm: dP },
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
				let e = Vc({ status: this.auth.response.code || 400 }, this.auth.response.data);
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
				if (this.captchaRequired && this.captcha.answers.length !== 1) {
					this.captchaError = !0;
					return;
				}
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
						case "password":
							await this.handlePasswordSubmit();
							break;
					}
				} catch (e) {
					console.error("[auth] submit error", e);
				} finally {
					this.loading = !1, this.captchaRequired && this.auth.panel !== "twofa" && this.fetchCaptcha();
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
			if (await this.getStatusAndJson(e), e.status === 202 && this.isTwofaPanel("login")) {
				this.twofaSession = this.auth.response.data.twofaSession, this.twofaMethod = this.auth.response.data.twofa, this.auth.panel = "twofa";
				return;
			}
			e.ok ? (this.onSuccess("login"), this.close()) : this.onError("login");
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
			if (this.auth.response = {}, !(!this.password || !this.password_again || this.password !== this.password_again)) try {
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
			for (let e = 0; e < t; e++) n = (0, mL.sha512)(n);
			return n;
		},
		authUpdate() {
			this.$emit("update:modelValue", this.auth);
		},
		handleEscapeKey(e) {
			e.key === "Escape" && this.close();
		},
		getValueOrFunction(e, t) {
			return Nc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return el(e, this.settings.translate, t, n || this.settings.language);
		},
		isTwofaPanel(e) {
			return !this.settings.twofa || !this.settings.twofa.panels || this.settings.twofa.panels.includes(e);
		},
		async fetchCaptcha() {
			if (!(!this.settings.captcha || !this.settings.captcha.url)) {
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
		let e = Kc(1e5);
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
}, gL = ["data-bs-theme"], _L = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, vL = { class: "position-absolute top-0 end-0 p-0 m-2" }, yL = {
	key: 0,
	class: "spinner-border spinner-border-sm text-primary"
}, bL = { class: "text-center mt-2 mb-4" }, xL = {
	key: 0,
	class: "mb-3"
}, SL = {
	for: "email",
	class: "form-label text-primary"
}, CL = { class: "input-group" }, wL = [
	"type",
	"placeholder",
	"disabled"
], TL = ["innerHTML"], EL = { class: "mb-3" }, DL = {
	key: 0,
	for: "password",
	class: "form-label text-primary"
}, OL = { class: "input-group" }, kL = [
	"type",
	"placeholder",
	"pattern",
	"minlength",
	"disabled"
], AL = {
	key: 0,
	class: "bi bi-eye"
}, jL = {
	key: 1,
	class: "bi bi-eye-slash"
}, ML = ["innerHTML"], NL = {
	key: 0,
	class: "mb-4"
}, PL = {
	for: "password_again",
	class: "form-label text-primary"
}, FL = ["innerHTML"], IL = { class: "input-group" }, LL = [
	"type",
	"placeholder",
	"minlength",
	"disabled"
], RL = {
	key: 0,
	class: "bi bi-eye"
}, zL = {
	key: 1,
	class: "bi bi-eye-slash"
}, BL = ["innerHTML"], VL = {
	key: 2,
	class: "mb-3"
}, HL = {
	key: 0,
	class: "text-center py-2"
}, UL = { key: 1 }, WL = ["innerHTML"], GL = { class: "d-flex justify-content-center gap-2 flex-wrap" }, KL = ["onClick"], qL = {
	key: 3,
	class: "text-danger text-center small mt-2 mb-3 fw-semibold"
}, JL = {
	key: 4,
	class: "mb-3"
}, YL = ["innerHTML"], XL = { class: "form-label text-primary" }, ZL = { class: "input-group" }, QL = ["placeholder", "disabled"], $L = { class: "text-end mt-2" }, eR = ["disabled"], tR = {
	key: 5,
	class: "mb-4 text-center"
}, nR = ["innerHTML"], rR = {
	key: 6,
	class: "d-flex mb-4"
}, iR = ["innerHTML"], aR = { class: "row" }, oR = { class: "mb-3" }, sR = ["for", "innerHTML"], cR = { class: "input-group" }, lR = ["innerHTML"], uR = [
	"disabled",
	"required",
	"onUpdate:modelValue",
	"multiple"
], dR = ["value", "innerHTML"], fR = [
	"id",
	"name",
	"type",
	"onUpdate:modelValue",
	"placeholder",
	"required",
	"disabled"
], pR = ["innerHTML"], mR = ["innerHTML"], hR = {
	key: 0,
	class: "form-check"
}, gR = [
	"id",
	"name",
	"onUpdate:modelValue",
	"required",
	"disabled"
], _R = ["for", "innerHTML"], vR = {
	key: 7,
	class: "mt-4"
}, yR = ["innerHTML"], bR = {
	key: 8,
	class: "mt-3 text-center"
}, xR = ["innerHTML"], SR = { class: "mt-4 d-flex justify-content-between" }, CR = ["disabled"], wR = ["disabled"], TR = ["disabled"], ER = {
	key: 0,
	class: "bi bi-person-plus mx-1"
}, DR = {
	key: 1,
	class: "bi bi-arrow-right-square mx-1"
}, OR = { class: "mt-2 text-end" }, kR = ["disabled"], AR = ["id"], jR = { class: "modal-dialog modal-xl" }, MR = { class: "modal-content h-100" };
function NR(t, s, c, l, u, d) {
	let f = b("VuAdminForm");
	return t.auth && t.auth.visible ? (_(), i("div", {
		key: 0,
		class: "vua-auth",
		"data-bs-theme": [t.theme]
	}, [a("div", {
		class: "row d-flex justify-content-center align-items-center min-vh-100",
		onClick: s[16] ||= O((...e) => t.close && t.close(...e), ["stop"])
	}, [a("div", _L, [a("div", {
		class: "card shadow p-4 position-relative",
		onClick: s[15] ||= O(() => {}, ["stop"])
	}, [
		a("div", vL, [t.loading ? (_(), i("i", yL)) : r("", !0), a("button", {
			type: "button",
			class: "btn p-2",
			onClick: s[0] ||= O((...e) => t.close && t.close(...e), ["stop"])
		}, [...s[18] ||= [a("i", { class: "bi bi-x px-1 text-muted" }, null, -1)]])]),
		a("h1", bL, x(t.settings.title[t.auth.panel]), 1),
		a("form", {
			onSubmit: s[13] ||= O((e) => t.handleSubmit(), ["prevent"]),
			onClick: s[14] ||= O(() => {}, ["stop"])
		}, [
			t.auth.panel != "activation" && t.auth.panel != "password" && t.auth.panel != "twofa" ? (_(), i("div", xL, [
				a("label", SL, x(t.settings.username.label), 1),
				a("div", CL, [t.settings.username.icon ? (_(), i("span", {
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
				}, null, 10, wL), [[w, t.username]])]),
				t.settings.username.help ? (_(), i("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.settings.username.help
				}, null, 8, TL)) : r("", !0)
			])) : r("", !0),
			t.auth.panel != "forgot" && t.auth.panel != "activation" && t.auth.panel != "twofa" ? (_(), i(e, { key: 1 }, [a("div", EL, [
				t.settings.password.label ? (_(), i("label", DL, x(t.settings.password.label), 1)) : r("", !0),
				a("div", OL, [
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
					}, null, 10, kL), [[w, t.password]]),
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
					}, [t.settings.password.type == "password" ? (_(), i("i", AL)) : (_(), i("i", jL))], 2)
				]),
				(t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password.help ? (_(), i("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.settings.password.help
				}, null, 8, ML)) : r("", !0)
			]), t.auth.panel === "registration" || t.auth.panel === "password" ? (_(), i("div", NL, [
				a("label", PL, [o(x(t.settings.password_again.label) + " ", 1), t.password_again.length > 0 && t.password_again != t.password ? (_(), i("small", {
					key: 0,
					class: "text-danger",
					innerHTML: t.settings.password_again.nomatch
				}, null, 8, FL)) : r("", !0)]),
				a("div", IL, [
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
					}, null, 10, LL), [[w, t.password_again]]),
					a("span", { class: m(["input-group-text", { "rounded-bottom-0": t.settings.password_again.help }]) }, [a("small", { class: m(["", {
						"text-success": t.password_again.length >= t.settings.password.minlength,
						"text-danger": t.password_again.length < t.settings.password.minlength
					}]) }, x(t.password_again.length), 3)], 2),
					a("span", {
						class: m(["cursor-pointer input-group-text", { "rounded-bottom-0": (t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password_again.help }]),
						onClick: s[5] ||= O((e) => t.toggleType("password_again"), ["stop"])
					}, [t.settings.password_again.type == "password" ? (_(), i("i", RL)) : (_(), i("i", zL))], 2)
				]),
				(t.auth.panel == "registration" || t.auth.panel == "password") && t.settings.password_again.help ? (_(), i("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.settings.password_again.help
				}, null, 8, BL)) : r("", !0)
			])) : r("", !0)], 64)) : r("", !0),
			t.captchaRequired ? (_(), i("div", VL, [t.captcha.loading ? (_(), i("div", HL, [...s[19] ||= [a("span", { class: "spinner-border spinner-border-sm text-secondary" }, null, -1)]])) : t.captcha.items.length ? (_(), i("div", UL, [a("div", {
				class: "text-center small mb-2",
				innerHTML: t.captcha.question
			}, null, 8, WL), a("div", GL, [(_(!0), i(e, null, y(t.captcha.items, (e) => (_(), i("button", {
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
			}, null, 2)], 10, KL))), 128))])])) : r("", !0)])) : r("", !0),
			t.captchaError ? (_(), i("p", qL, x(t.settings.captcha.error), 1)) : r("", !0),
			t.auth.panel === "twofa" && t.settings.twofa ? (_(), i("div", JL, [
				a("p", {
					class: "text-center small text-muted mb-3",
					innerHTML: t.settings.twofa.info
				}, null, 8, YL),
				a("label", XL, x(t.settings.twofa.label), 1),
				a("div", ZL, [s[20] ||= a("span", { class: "input-group-text" }, [a("i", { class: "bi bi-shield-lock" })], -1), D(a("input", {
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
				}, null, 8, QL), [[E, t.twofaCode]])]),
				a("div", $L, [a("button", {
					type: "button",
					class: "btn btn-link btn-sm p-0 text-decoration-none",
					onClick: s[7] ||= O((...e) => t.resendTwofa && t.resendTwofa(...e), ["stop"]),
					disabled: t.loading
				}, [s[21] ||= a("i", { class: "bi bi-arrow-repeat me-1" }, null, -1), o(x(t.settings.submit.resend), 1)], 8, eR)])
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
			t.auth.panel == "login" && t.settings.password.forgot ? (_(), i("div", tR, [a("button", {
				type: "button",
				class: "btn btn-link p-0 text-decoration-none text-nowrap",
				onClick: s[9] ||= O((...e) => t.toggleForgotPassword && t.toggleForgotPassword(...e), ["stop"]),
				innerHTML: t.settings.password.forgot
			}, null, 8, nR)])) : r("", !0),
			t.auth.panel == "forgot" && t.settings.help && t.settings.help.forgot ? (_(), i("div", rR, [a("small", {
				class: "text-muted",
				innerHTML: t.settings.help.forgot
			}, null, 8, iR)])) : r("", !0),
			a("div", aR, [(_(!0), i(e, null, y(t.settings.inputs, (n, o) => (_(), i(e, { key: o }, [n.panels.indexOf(t.auth.panel) >= 0 && !n.hidden ? (_(), i("div", {
				key: 0,
				class: m([n.colclass ? n.colclass : "col-md-12"])
			}, [a("div", oR, [
				n.label ? (_(), i("label", {
					key: 0,
					for: o,
					class: m(["form-label text-primary", { required: n.required }]),
					innerHTML: t.getValueOrFunction(n.label)
				}, null, 10, sR)) : r("", !0),
				a("div", cR, [
					n.prefix ? (_(), i("span", {
						key: 0,
						class: m(["input-group-text", { "rounded-bottom-0": n.help }]),
						innerHTML: t.getValueOrFunction(n.prefix)
					}, null, 10, lR)) : r("", !0),
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
					}, null, 8, dR))), 128))], 8, uR)), [[T, t.inputs[o]]]) : D((_(), i("input", {
						key: 2,
						id: o,
						name: o,
						type: n.type,
						"onUpdate:modelValue": (e) => t.inputs[o] = e,
						class: m(["form-control", { "rounded-bottom-0": n.help }]),
						placeholder: n.placeholder,
						required: n.required,
						disabled: t.loading
					}, null, 10, fR)), [[w, t.inputs[o]]]),
					n.suffix ? (_(), i("span", {
						key: 3,
						class: m(["input-group-text", { "rounded-bottom-0": n.help }]),
						innerHTML: t.getValueOrFunction(n.suffix)
					}, null, 10, pR)) : r("", !0)
				]),
				n.help ? (_(), i("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: t.getValueOrFunction(n.help)
				}, null, 8, mR)) : r("", !0)
			])], 2)) : r("", !0)], 64))), 128))]),
			(_(!0), i(e, null, y(t.settings.accepts, (e) => (_(), i("div", { key: e }, [e.panels.indexOf(t.auth.panel) >= 0 ? (_(), i("div", hR, [D(a("input", {
				type: "checkbox",
				class: "form-check-input",
				id: "accept_" + e.name,
				name: "accept_" + e.name,
				"onUpdate:modelValue": (n) => t.accepts[e.name] = n,
				required: e.required,
				disabled: t.loading
			}, null, 8, gR), [[C, t.accepts[e.name]]]), e.label ? (_(), i("label", {
				key: 0,
				class: "form-check-label",
				for: "accept_" + e.name,
				innerHTML: t.getValueOrFunction(e.label)
			}, null, 8, _R)) : r("", !0)])) : r("", !0)]))), 128)),
			t.auth.panel == "registration" && t.settings.help && t.settings.help.registration ? (_(), i("div", vR, [a("div", { innerHTML: t.getValueOrFunction(t.settings.help.registration) }, null, 8, yR)])) : r("", !0),
			t.auth.response.message ? (_(), i("div", bR, [a("div", {
				class: m({
					"text-danger": !t.auth.response.ok,
					"text-success": t.auth.response.ok
				}),
				innerHTML: t.auth.response.message
			}, null, 10, xR)])) : r("", !0),
			a("div", SR, [
				t.auth.panel != "login" && t.auth.panel != "activation" ? (_(), i("button", {
					key: 0,
					type: "button",
					onClick: s[10] ||= O((...e) => t.toggleClear && t.toggleClear(...e), ["stop"]),
					class: "btn btn-secondary w-100 me-2 text-nowrap",
					disabled: t.loading
				}, [s[23] ||= a("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1), o(" " + x(t.settings.submit.login), 1)], 8, CR)) : r("", !0),
				t.auth.panel == "login" && t.settings.registrationEnabled !== !1 ? (_(), i("button", {
					key: 1,
					type: "button",
					class: "btn btn-warning w-100 me-2 text-nowrap",
					onClick: s[11] ||= O((...e) => t.toggleNewRegistration && t.toggleNewRegistration(...e), ["stop"]),
					disabled: t.loading
				}, [s[24] ||= a("i", { class: "bi bi-person-plus mx-1" }, null, -1), o(" " + x(t.settings.submit.registration), 1)], 8, wR)) : r("", !0),
				a("button", {
					type: "submit",
					class: m(["btn w-100 text-nowrap", {
						"btn-primary": t.auth.panel != "registration",
						"btn-warning": t.auth.panel == "registration"
					}]),
					disabled: t.loading
				}, [o(x(t.settings.submit[t.auth.panel]) + " ", 1), t.auth.panel == "registration" ? (_(), i("i", ER)) : (_(), i("i", DR))], 10, TR)
			]),
			a("div", OR, [a("button", {
				type: "button",
				onClick: s[12] ||= O((...e) => t.close && t.close(...e), ["stop"]),
				class: "btn btn-light border w-100 me-1",
				disabled: t.loading
			}, [o(x(t.settings.submit.cancel) + " ", 1), s[25] ||= a("i", { class: "bi bi-x-square mx-1" }, null, -1)], 8, kR)])
		], 32)
	])])]), a("div", {
		class: "modal shadow",
		id: t.modalId,
		tabindex: "-1"
	}, [a("div", jR, [a("div", MR, [t.settings.form && t.settings.form.visible && t.settings.form.groups ? (_(), n(f, {
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
	])) : r("", !0)])])], 8, AR)], 8, gL)) : r("", !0);
}
var PR = /*#__PURE__*/ $D(hL, [["render", NR]]);
//#endregion
//#region src/components/VuUserButton.vue
jc();
var FR = {
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
			return Nc(e, t, this.settings, this);
		}
	},
	created() {
		window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel])), window.VuSettings && window.VuSettings.auth && window.VuSettings.auth.registrationEnabled === !1 && (this.registrationEnabled = !1);
	},
	mounted() {}
}, IR = ["data-bs-theme"], LR = {
	key: 0,
	class: "dropdown"
}, RR = ["innerHTML"], zR = {
	class: "dropdown-menu dropdown-menu-end",
	"aria-labelledby": "userDropdown"
}, BR = ["innerHTML"], VR = ["onClick"], HR = ["onClick", "innerHTML"], UR = {
	key: 1,
	class: "d-inline-block"
}, WR = ["innerHTML"];
function GR(t, n, o, s, c, l) {
	return (t.panel != "registration" || t.registrationEnabled) && (!t.auth.user && t.panel != "login" || t.panel == "login") ? (_(), i("div", {
		key: 0,
		class: "vua-user-button d-inline-block",
		"data-bs-theme": [t.theme]
	}, [t.auth.user ? (_(), i("div", LR, [a("button", {
		class: m(["dropdown-toggle", [t.settings.class]]),
		type: "button",
		id: "userDropdown",
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [a("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, RR)], 2), a("ul", zR, [(_(!0), i(e, null, y(t.settings.dropdowns, (n) => (_(), i(e, { key: n }, [n.action == "BUTTON_ROLES" ? (_(), i("li", {
		key: 0,
		class: m([[n.class], "d-flex items-align-center"])
	}, [a("span", {
		innerHTML: t.getValueOrFunction(n.label),
		class: "me-2"
	}, null, 8, BR), (_(!0), i(e, null, y(t.auth.user.roles, (e) => (_(), i("button", {
		key: e,
		onClick: (n) => t.setSelectedRole(e),
		class: m(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": e == t.auth.user.role }])
	}, x(e), 11, VR))), 128))], 2)) : (_(), i("li", {
		key: 1,
		class: m([n.class]),
		onClick: (e) => t.dropdownAction(n),
		innerHTML: t.getValueOrFunction(n.label)
	}, null, 10, HR))], 64))), 128))])])) : (_(), i("div", UR, [a("button", {
		class: m([t.settings.class]),
		type: "button",
		onClick: n[0] ||= (...e) => t.togglePanel && t.togglePanel(...e)
	}, [t.settings.icon ? (_(), i("i", {
		key: 0,
		class: m([t.settings.icon])
	}, null, 2)) : r("", !0), a("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, WR)], 2)]))], 8, IR)) : r("", !0);
}
var KR = /*#__PURE__*/ $D(FR, [["render", GR]]);
//#endregion
export { pL as VuAdmin, PR as VuAuth, KR as VuUserButton };
