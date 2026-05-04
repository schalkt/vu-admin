import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createTextVNode as a, createVNode as o, normalizeClass as s, normalizeStyle as c, openBlock as l, renderList as u, resolveComponent as d, toDisplayString as f, vModelCheckbox as p, vModelDynamic as m, vModelSelect as h, vModelText as g, vShow as _, withDirectives as v, withKeys as y, withModifiers as b } from "vue";
//#region \0rolldown/runtime.js
var x = Object.create, S = Object.defineProperty, C = Object.getOwnPropertyDescriptor, w = Object.getOwnPropertyNames, T = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty, D = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ee = (e, t) => {
	let n = {};
	for (var r in e) S(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || S(n, Symbol.toStringTag, { value: "Module" }), n;
}, te = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = w(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !E.call(e, s) && s !== n && S(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = C(t, s)) || r.enumerable
	});
	return e;
}, ne = (e, t, n) => (n = e == null ? {} : x(T(e)), te(t || !e || !e.__esModule ? S(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), re = "bottom", ie = "right", ae = "left", oe = "auto", O = [
	"top",
	re,
	ie,
	ae
], k = "start", A = "clippingParents", j = "viewport", M = "popper", N = "reference", P = /* @__PURE__ */ O.reduce(function(e, t) {
	return e.concat([t + "-" + k, t + "-end"]);
}, []), se = /* @__PURE__ */ [].concat(O, [oe]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + k,
		t + "-end"
	]);
}, []), ce = "beforeRead", F = "read", I = "afterRead", L = "beforeMain", R = "main", z = "afterMain", le = "beforeWrite", ue = "write", de = "afterWrite", fe = [
	ce,
	F,
	I,
	L,
	R,
	z,
	le,
	ue,
	de
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function B(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function V(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function H(e) {
	return e instanceof V(e).Element || e instanceof Element;
}
function U(e) {
	return e instanceof V(e).HTMLElement || e instanceof HTMLElement;
}
function W(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof V(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function G(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!U(i) || !B(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function pe(e) {
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
			!U(r) || !B(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var me = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: G,
	effect: pe,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function he(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var ge = Math.max, _e = Math.min, ve = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function ye() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function be() {
	return !/^((?!chrome|android).)*safari/i.test(ye());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function xe(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && U(e) && (i = e.offsetWidth > 0 && ve(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && ve(r.height) / e.offsetHeight || 1);
	var o = (H(e) ? V(e) : window).visualViewport, s = !be() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
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
function Se(e) {
	var t = xe(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function Ce(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && W(n)) {
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
function we(e) {
	return V(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Te(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(B(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function Ee(e) {
	return ((H(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function De(e) {
	return B(e) === "html" ? e : e.assignedSlot || e.parentNode || (W(e) ? e.host : null) || Ee(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function Oe(e) {
	return !U(e) || we(e).position === "fixed" ? null : e.offsetParent;
}
function ke(e) {
	var t = /firefox/i.test(ye());
	if (/Trident/i.test(ye()) && U(e) && we(e).position === "fixed") return null;
	var n = De(e);
	for (W(n) && (n = n.host); U(n) && ["html", "body"].indexOf(B(n)) < 0;) {
		var r = we(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function Ae(e) {
	for (var t = V(e), n = Oe(e); n && Te(n) && we(n).position === "static";) n = Oe(n);
	return n && (B(n) === "html" || B(n) === "body" && we(n).position === "static") ? t : n || ke(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function je(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function Me(e, t, n) {
	return ge(e, _e(t, n));
}
function Ne(e, t, n) {
	var r = Me(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function Pe() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function Fe(e) {
	return Object.assign({}, Pe(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function Ie(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var Le = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Fe(typeof e == "number" ? Ie(e, O) : e);
};
function Re(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = he(n.placement), c = je(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = Le(i.padding, n), d = Se(a), f = c === "y" ? "top" : ae, p = c === "y" ? re : ie, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = Ae(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = Me(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function ze(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Ce(t.elements.popper, r) && (t.elements.arrow = r));
}
var Be = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: Re,
	effect: ze,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function Ve(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var He = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function Ue(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: ve(n * i) / i || 0,
		y: ve(r * i) / i || 0
	};
}
function We(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = ae, b = "top", x = window;
	if (l) {
		var S = Ae(n), C = "clientHeight", w = "clientWidth";
		if (S === V(n) && (S = Ee(n), we(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = re;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = ie;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var D = Object.assign({ position: s }, l && He), ee = u === !0 ? Ue({
		x: p,
		y: h
	}, V(n)) : {
		x: p,
		y: h
	};
	if (p = ee.x, h = ee.y, c) {
		var te;
		return Object.assign({}, D, (te = {}, te[b] = v ? "0" : "", te[y] = _ ? "0" : "", te.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", te));
	}
	return Object.assign({}, D, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function Ge(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, a = n.adaptive, o = a === void 0 ? !0 : a, s = n.roundOffsets, c = s === void 0 ? !0 : s, l = {
		placement: he(t.placement),
		variation: Ve(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, We(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, We(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Ke = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: Ge,
	data: {}
}, qe = { passive: !0 };
function Je(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 ? !0 : i, o = r.resize, s = o === void 0 ? !0 : o, c = V(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, qe);
	}), s && c.addEventListener("resize", n.update, qe), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, qe);
		}), s && c.removeEventListener("resize", n.update, qe);
	};
}
var Ye = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: Je,
	data: {}
}, Xe = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Ze(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return Xe[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var Qe = {
	start: "end",
	end: "start"
};
function $e(e) {
	return e.replace(/start|end/g, function(e) {
		return Qe[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function et(e) {
	var t = V(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function tt(e) {
	return xe(Ee(e)).left + et(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function nt(e, t) {
	var n = V(e), r = Ee(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = be();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + tt(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function rt(e) {
	var t = Ee(e), n = et(e), r = e.ownerDocument?.body, i = ge(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = ge(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + tt(e), s = -n.scrollTop;
	return we(r || t).direction === "rtl" && (o += ge(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function it(e) {
	var t = we(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function at(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(B(e)) >= 0 ? e.ownerDocument.body : U(e) && it(e) ? e : at(De(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function ot(e, t) {
	t === void 0 && (t = []);
	var n = at(e), r = n === e.ownerDocument?.body, i = V(n), a = r ? [i].concat(i.visualViewport || [], it(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(ot(De(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function st(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function ct(e, t) {
	var n = xe(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function lt(e, t, n) {
	return t === "viewport" ? st(nt(e, n)) : H(t) ? ct(t, n) : st(rt(Ee(e)));
}
function ut(e) {
	var t = ot(De(e)), n = ["absolute", "fixed"].indexOf(we(e).position) >= 0 && U(e) ? Ae(e) : e;
	return H(n) ? t.filter(function(e) {
		return H(e) && Ce(e, n) && B(e) !== "body";
	}) : [];
}
function dt(e, t, n, r) {
	var i = t === "clippingParents" ? ut(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = lt(e, n, r);
		return t.top = ge(i.top, t.top), t.right = _e(i.right, t.right), t.bottom = _e(i.bottom, t.bottom), t.left = ge(i.left, t.left), t;
	}, lt(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function ft(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? he(r) : null, a = r ? Ve(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case re:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case ie:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case ae:
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
	var l = i ? je(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case k:
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
function pt(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? A : s, l = n.rootBoundary, u = l === void 0 ? j : l, d = n.elementContext, f = d === void 0 ? M : d, p = n.altBoundary, m = p === void 0 ? !1 : p, h = n.padding, g = h === void 0 ? 0 : h, _ = Fe(typeof g == "number" ? Ie(g, O) : g), v = f === "popper" ? N : M, y = e.rects.popper, b = e.elements[m ? v : f], x = dt(H(b) ? b : b.contextElement || Ee(e.elements.popper), c, u, o), S = xe(e.elements.reference), C = ft({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = st(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, D = e.modifiersData.offset;
	if (f === "popper" && D) {
		var ee = D[i];
		Object.keys(E).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			E[e] += ee[n] * t;
		});
	}
	return E;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function mt(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? se : c, u = Ve(r), d = u ? s ? P : P.filter(function(e) {
		return Ve(e) === u;
	}) : O, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = pt(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[he(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function ht(e) {
	if (he(e) === "auto") return [];
	var t = Ze(e);
	return [
		$e(e),
		t,
		$e(t)
	];
}
function gt(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !0 : o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, g = t.options.placement, _ = he(g) === g, v = c || (_ || !m ? [Ze(g)] : ht(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(he(n) === "auto" ? mt(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], D = he(E), ee = Ve(E) === k, te = ["top", re].indexOf(D) >= 0, ne = te ? "width" : "height", oe = pt(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), O = te ? ee ? ie : ae : ee ? re : "top";
			b[ne] > x[ne] && (O = Ze(O));
			var A = Ze(O), j = [];
			if (a && j.push(oe[D] <= 0), s && j.push(oe[O] <= 0, oe[A] <= 0), j.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, j);
		}
		if (C) for (var M = m ? 3 : 1, N = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, P = M; P > 0 && N(P) !== "break"; P--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var _t = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: gt,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function vt(e, t, n) {
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
function yt(e) {
	return [
		"top",
		ie,
		re,
		ae
	].some(function(t) {
		return e[t] >= 0;
	});
}
function bt(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = pt(t, { elementContext: "reference" }), s = pt(t, { altBoundary: !0 }), c = vt(o, r), l = vt(s, i, a), u = yt(c), d = yt(l);
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
var xt = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: bt
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function St(e, t, n) {
	var r = he(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function Ct(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = se.reduce(function(e, n) {
		return e[n] = St(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var wt = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: Ct
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function Tt(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = ft({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var Et = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: Tt,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function Dt(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function Ot(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !1 : o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 ? !0 : f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = pt(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = he(t.placement), v = Ve(t.placement), y = !v, b = je(_), x = Dt(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
		mainAxis: T,
		altAxis: T
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, T), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, ee = {
		x: 0,
		y: 0
	};
	if (S) {
		if (a) {
			var te = b === "y" ? "top" : ae, ne = b === "y" ? re : ie, oe = b === "y" ? "height" : "width", O = S[b], k = O + g[te], A = O - g[ne], j = p ? -w[oe] / 2 : 0, M = v === "start" ? C[oe] : w[oe], N = v === "start" ? -w[oe] : -C[oe], P = t.elements.arrow, se = p && P ? Se(P) : {
				width: 0,
				height: 0
			}, ce = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Pe(), F = ce[te], I = ce[ne], L = Me(0, C[oe], se[oe]), R = y ? C[oe] / 2 - j - L - F - E.mainAxis : M - L - F - E.mainAxis, z = y ? -C[oe] / 2 + j + L + I + E.mainAxis : N + L + I + E.mainAxis, le = t.elements.arrow && Ae(t.elements.arrow), ue = le ? b === "y" ? le.clientTop || 0 : le.clientLeft || 0 : 0, de = D?.[b] ?? 0, fe = O + R - de - ue, B = O + z - de, V = Me(p ? _e(k, fe) : k, O, p ? ge(A, B) : A);
			S[b] = V, ee[b] = V - O;
		}
		if (s) {
			var H = b === "x" ? "top" : ae, U = b === "x" ? re : ie, W = S[x], G = x === "y" ? "height" : "width", pe = W + g[H], me = W - g[U], ve = ["top", ae].indexOf(_) !== -1, ye = D?.[x] ?? 0, be = ve ? pe : W - C[G] - w[G] - ye + E.altAxis, xe = ve ? W + C[G] + w[G] - ye - E.altAxis : me, Ce = p && ve ? Ne(be, W, xe) : Me(p ? be : pe, W, p ? xe : me);
			S[x] = Ce, ee[x] = Ce - W;
		}
		t.modifiersData[r] = ee;
	}
}
var kt = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: Ot,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function At(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function jt(e) {
	return e === V(e) || !U(e) ? et(e) : At(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function Mt(e) {
	var t = e.getBoundingClientRect(), n = ve(t.width) / e.offsetWidth || 1, r = ve(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function Nt(e, t, n) {
	n === void 0 && (n = !1);
	var r = U(t), i = U(t) && Mt(t), a = Ee(t), o = xe(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((B(t) !== "body" || it(a)) && (s = jt(t)), U(t) ? (c = xe(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = tt(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function Pt(e) {
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
function Ft(e) {
	var t = Pt(e);
	return fe.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function It(e) {
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
function Lt(e) {
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
var Rt = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function zt() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function Bt(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? Rt : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, Rt, a),
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
					reference: H(e) ? ot(e) : e.contextElement ? ot(e.contextElement) : [],
					popper: ot(t)
				};
				var s = Ft(Lt([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (zt(t, n)) {
						i.rects = {
							reference: Nt(t, Ae(n), i.options.strategy === "fixed"),
							popper: Se(n)
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
			update: It(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!zt(e, t)) return c;
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
var Vt = /* @__PURE__ */ Bt(), Ht = /* @__PURE__ */ Bt({ defaultModifiers: [
	Ye,
	Et,
	Ke,
	me
] }), Ut = /* @__PURE__ */ Bt({ defaultModifiers: [
	Ye,
	Et,
	Ke,
	me,
	wt,
	_t,
	kt,
	Be,
	xt
] }), Wt = /* @__PURE__ */ ee({
	afterMain: () => z,
	afterRead: () => I,
	afterWrite: () => de,
	applyStyles: () => me,
	arrow: () => Be,
	auto: () => oe,
	basePlacements: () => O,
	beforeMain: () => L,
	beforeRead: () => ce,
	beforeWrite: () => le,
	bottom: () => re,
	clippingParents: () => A,
	computeStyles: () => Ke,
	createPopper: () => Ut,
	createPopperBase: () => Vt,
	createPopperLite: () => Ht,
	detectOverflow: () => pt,
	end: () => "end",
	eventListeners: () => Ye,
	flip: () => _t,
	hide: () => xt,
	left: () => ae,
	main: () => R,
	modifierPhases: () => fe,
	offset: () => wt,
	placements: () => se,
	popper: () => M,
	popperGenerator: () => Bt,
	popperOffsets: () => Et,
	preventOverflow: () => kt,
	read: () => F,
	reference: () => N,
	right: () => ie,
	start: () => k,
	top: () => "top",
	variationPlacements: () => P,
	viewport: () => j,
	write: () => ue
}), Gt = /* @__PURE__ */ new Map(), Kt = {
	set(e, t, n) {
		Gt.has(e) || Gt.set(e, /* @__PURE__ */ new Map());
		let r = Gt.get(e);
		if (!r.has(t) && r.size !== 0) {
			console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
			return;
		}
		r.set(t, n);
	},
	get(e, t) {
		return Gt.has(e) && Gt.get(e).get(t) || null;
	},
	remove(e, t) {
		if (!Gt.has(e)) return;
		let n = Gt.get(e);
		n.delete(t), n.size === 0 && Gt.delete(e);
	}
}, qt = 1e6, Jt = 1e3, Yt = "transitionend", Xt = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)), e), Zt = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), Qt = (e) => {
	do
		e += Math.floor(Math.random() * qt);
	while (document.getElementById(e));
	return e;
}, $t = (e) => {
	if (!e) return 0;
	let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
	return !Number.parseFloat(t) && !Number.parseFloat(n) ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * Jt);
}, en = (e) => {
	e.dispatchEvent(new Event(Yt));
}, tn = (e) => !e || typeof e != "object" ? !1 : (e.jquery !== void 0 && (e = e[0]), e.nodeType !== void 0), nn = (e) => tn(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(Xt(e)) : null, rn = (e) => {
	if (!tn(e) || e.getClientRects().length === 0) return !1;
	let t = getComputedStyle(e).getPropertyValue("visibility") === "visible", n = e.closest("details:not([open])");
	if (!n) return t;
	if (n !== e) {
		let t = e.closest("summary");
		if (t && t.parentNode !== n || t === null) return !1;
	}
	return t;
}, an = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : e.disabled === void 0 ? e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false" : e.disabled, on = (e) => {
	if (!document.documentElement.attachShadow) return null;
	if (typeof e.getRootNode == "function") {
		let t = e.getRootNode();
		return t instanceof ShadowRoot ? t : null;
	}
	return e instanceof ShadowRoot ? e : e.parentNode ? on(e.parentNode) : null;
}, sn = () => {}, cn = (e) => {
	e.offsetHeight;
}, ln = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, un = [], dn = (e) => {
	document.readyState === "loading" ? (un.length || document.addEventListener("DOMContentLoaded", () => {
		for (let e of un) e();
	}), un.push(e)) : e();
}, fn = () => document.documentElement.dir === "rtl", pn = (e) => {
	dn(() => {
		let t = ln();
		/* istanbul ignore if */
		if (t) {
			let n = e.NAME, r = t.fn[n];
			t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
		}
	});
}, mn = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, hn = (e, t, n = !0) => {
	if (!n) {
		mn(e);
		return;
	}
	let r = $t(t) + 5, i = !1, a = ({ target: n }) => {
		n === t && (i = !0, t.removeEventListener(Yt, a), mn(e));
	};
	t.addEventListener(Yt, a), setTimeout(() => {
		i || en(t);
	}, r);
}, gn = (e, t, n, r) => {
	let i = e.length, a = e.indexOf(t);
	return a === -1 ? !n && r ? e[i - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + i) % i), e[Math.max(0, Math.min(a, i - 1))]);
}, _n = /[^.]*(?=\..*)\.|.*/, vn = /\..*/, yn = /::\d+$/, bn = {}, xn = 1, Sn = {
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, Cn = new Set(/* @__PURE__ */ "click.dblclick.mouseup.mousedown.contextmenu.mousewheel.DOMMouseScroll.mouseover.mouseout.mousemove.selectstart.selectend.keydown.keypress.keyup.orientationchange.touchstart.touchmove.touchend.touchcancel.pointerdown.pointermove.pointerup.pointerleave.pointercancel.gesturestart.gesturechange.gestureend.focus.blur.change.reset.select.submit.focusin.focusout.load.unload.beforeunload.resize.move.DOMContentLoaded.readystatechange.error.abort.scroll".split("."));
function wn(e, t) {
	return t && `${t}::${xn++}` || e.uidEvent || xn++;
}
function Tn(e) {
	let t = wn(e);
	return e.uidEvent = t, bn[t] = bn[t] || {}, bn[t];
}
function En(e, t) {
	return function n(r) {
		return Pn(r, { delegateTarget: e }), n.oneOff && K.off(e, r.type, t), t.apply(e, [r]);
	};
}
function Dn(e, t, n) {
	return function r(i) {
		let a = e.querySelectorAll(t);
		for (let { target: o } = i; o && o !== this; o = o.parentNode) for (let s of a) if (s === o) return Pn(i, { delegateTarget: o }), r.oneOff && K.off(e, i.type, t, n), n.apply(o, [i]);
	};
}
function On(e, t, n = null) {
	return Object.values(e).find((e) => e.callable === t && e.delegationSelector === n);
}
function kn(e, t, n) {
	let r = typeof t == "string", i = r ? n : t || n, a = Nn(e);
	return Cn.has(a) || (a = e), [
		r,
		i,
		a
	];
}
function An(e, t, n, r, i) {
	if (typeof t != "string" || !e) return;
	let [a, o, s] = kn(t, n, r);
	t in Sn && (o = ((e) => function(t) {
		if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t);
	})(o));
	let c = Tn(e), l = c[s] || (c[s] = {}), u = On(l, o, a ? n : null);
	if (u) {
		u.oneOff = u.oneOff && i;
		return;
	}
	let d = wn(o, t.replace(_n, "")), f = a ? Dn(e, n, o) : En(e, o);
	f.delegationSelector = a ? n : null, f.callable = o, f.oneOff = i, f.uidEvent = d, l[d] = f, e.addEventListener(s, f, a);
}
function jn(e, t, n, r, i) {
	let a = On(t[n], r, i);
	a && (e.removeEventListener(n, a, !!i), delete t[n][a.uidEvent]);
}
function Mn(e, t, n, r) {
	let i = t[n] || {};
	for (let [a, o] of Object.entries(i)) a.includes(r) && jn(e, t, n, o.callable, o.delegationSelector);
}
function Nn(e) {
	return e = e.replace(vn, ""), Sn[e] || e;
}
var K = {
	on(e, t, n, r) {
		An(e, t, n, r, !1);
	},
	one(e, t, n, r) {
		An(e, t, n, r, !0);
	},
	off(e, t, n, r) {
		if (typeof t != "string" || !e) return;
		let [i, a, o] = kn(t, n, r), s = o !== t, c = Tn(e), l = c[o] || {}, u = t.startsWith(".");
		if (a !== void 0) {
			if (!Object.keys(l).length) return;
			jn(e, c, o, a, i ? n : null);
			return;
		}
		if (u) for (let n of Object.keys(c)) Mn(e, c, n, t.slice(1));
		for (let [n, r] of Object.entries(l)) {
			let i = n.replace(yn, "");
			(!s || t.includes(i)) && jn(e, c, o, r.callable, r.delegationSelector);
		}
	},
	trigger(e, t, n) {
		if (typeof t != "string" || !e) return null;
		let r = ln(), i = t !== Nn(t), a = null, o = !0, s = !0, c = !1;
		i && r && (a = r.Event(t, n), r(e).trigger(a), o = !a.isPropagationStopped(), s = !a.isImmediatePropagationStopped(), c = a.isDefaultPrevented());
		let l = Pn(new Event(t, {
			bubbles: o,
			cancelable: !0
		}), n);
		return c && l.preventDefault(), s && e.dispatchEvent(l), l.defaultPrevented && a && a.preventDefault(), l;
	}
};
function Pn(e, t = {}) {
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
function Fn(e) {
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
function In(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
var Ln = {
	setDataAttribute(e, t, n) {
		e.setAttribute(`data-bs-${In(t)}`, n);
	},
	removeDataAttribute(e, t) {
		e.removeAttribute(`data-bs-${In(t)}`);
	},
	getDataAttributes(e) {
		if (!e) return {};
		let t = {}, n = Object.keys(e.dataset).filter((e) => e.startsWith("bs") && !e.startsWith("bsConfig"));
		for (let r of n) {
			let n = r.replace(/^bs/, "");
			n = n.charAt(0).toLowerCase() + n.slice(1), t[n] = Fn(e.dataset[r]);
		}
		return t;
	},
	getDataAttribute(e, t) {
		return Fn(e.getAttribute(`data-bs-${In(t)}`));
	}
}, Rn = class {
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
		let n = tn(t) ? Ln.getDataAttribute(t, "config") : {};
		return {
			...this.constructor.Default,
			...typeof n == "object" ? n : {},
			...tn(t) ? Ln.getDataAttributes(t) : {},
			...typeof e == "object" ? e : {}
		};
	}
	_typeCheckConfig(e, t = this.constructor.DefaultType) {
		for (let [n, r] of Object.entries(t)) {
			let t = e[n], i = tn(t) ? "element" : Zt(t);
			if (!new RegExp(r).test(i)) throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${i}" but expected type "${r}".`);
		}
	}
}, zn = "5.3.8", Bn = class extends Rn {
	constructor(e, t) {
		super(), e = nn(e), e && (this._element = e, this._config = this._getConfig(t), Kt.set(this._element, this.constructor.DATA_KEY, this));
	}
	dispose() {
		Kt.remove(this._element, this.constructor.DATA_KEY), K.off(this._element, this.constructor.EVENT_KEY);
		for (let e of Object.getOwnPropertyNames(this)) this[e] = null;
	}
	_queueCallback(e, t, n = !0) {
		hn(e, t, n);
	}
	_getConfig(e) {
		return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	static getInstance(e) {
		return Kt.get(nn(e), this.DATA_KEY);
	}
	static getOrCreateInstance(e, t = {}) {
		return this.getInstance(e) || new this(e, typeof t == "object" ? t : null);
	}
	static get VERSION() {
		return zn;
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
}, Vn = (e) => {
	let t = e.getAttribute("data-bs-target");
	if (!t || t === "#") {
		let n = e.getAttribute("href");
		if (!n || !n.includes("#") && !n.startsWith(".")) return null;
		n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
	}
	return t ? t.split(",").map((e) => Xt(e)).join(",") : null;
}, q = {
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
		return this.find(t, e).filter((e) => !an(e) && rn(e));
	},
	getSelectorFromElement(e) {
		let t = Vn(e);
		return t && q.findOne(t) ? t : null;
	},
	getElementFromSelector(e) {
		let t = Vn(e);
		return t ? q.findOne(t) : null;
	},
	getMultipleElementsFromSelector(e) {
		let t = Vn(e);
		return t ? q.find(t) : [];
	}
}, Hn = (e, t = "hide") => {
	let n = `click.dismiss${e.EVENT_KEY}`, r = e.NAME;
	K.on(document, n, `[data-bs-dismiss="${r}"]`, function(n) {
		if (["A", "AREA"].includes(this.tagName) && n.preventDefault(), an(this)) return;
		let i = q.getElementFromSelector(this) || this.closest(`.${r}`);
		e.getOrCreateInstance(i)[t]();
	});
}, Un = "alert", Wn = ".bs.alert", Gn = `close${Wn}`, Kn = `closed${Wn}`, qn = "fade", Jn = "show", Yn = class e extends Bn {
	static get NAME() {
		return Un;
	}
	close() {
		if (K.trigger(this._element, Gn).defaultPrevented) return;
		this._element.classList.remove(Jn);
		let e = this._element.classList.contains(qn);
		this._queueCallback(() => this._destroyElement(), this._element, e);
	}
	_destroyElement() {
		this._element.remove(), K.trigger(this._element, Kn), this.dispose();
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
Hn(Yn, "close"), pn(Yn);
var Xn = "button", Zn = ".bs.button", Qn = ".data-api", $n = "active", er = "[data-bs-toggle=\"button\"]", tr = `click${Zn}${Qn}`, nr = class e extends Bn {
	static get NAME() {
		return Xn;
	}
	toggle() {
		this._element.setAttribute("aria-pressed", this._element.classList.toggle($n));
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this);
			t === "toggle" && n[t]();
		});
	}
};
K.on(document, tr, er, (e) => {
	e.preventDefault();
	let t = e.target.closest(er);
	nr.getOrCreateInstance(t).toggle();
}), pn(nr);
var rr = "swipe", ir = ".bs.swipe", ar = `touchstart${ir}`, or = `touchmove${ir}`, sr = `touchend${ir}`, cr = `pointerdown${ir}`, lr = `pointerup${ir}`, ur = "touch", dr = "pen", fr = "pointer-event", pr = 40, mr = {
	endCallback: null,
	leftCallback: null,
	rightCallback: null
}, hr = {
	endCallback: "(function|null)",
	leftCallback: "(function|null)",
	rightCallback: "(function|null)"
}, gr = class e extends Rn {
	constructor(t, n) {
		super(), this._element = t, !(!t || !e.isSupported()) && (this._config = this._getConfig(n), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
	}
	static get Default() {
		return mr;
	}
	static get DefaultType() {
		return hr;
	}
	static get NAME() {
		return rr;
	}
	dispose() {
		K.off(this._element, ir);
	}
	_start(e) {
		if (!this._supportPointerEvents) {
			this._deltaX = e.touches[0].clientX;
			return;
		}
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX);
	}
	_end(e) {
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), mn(this._config.endCallback);
	}
	_move(e) {
		this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
	}
	_handleSwipe() {
		let e = Math.abs(this._deltaX);
		if (e <= pr) return;
		let t = e / this._deltaX;
		this._deltaX = 0, t && mn(t > 0 ? this._config.rightCallback : this._config.leftCallback);
	}
	_initEvents() {
		this._supportPointerEvents ? (K.on(this._element, cr, (e) => this._start(e)), K.on(this._element, lr, (e) => this._end(e)), this._element.classList.add(fr)) : (K.on(this._element, ar, (e) => this._start(e)), K.on(this._element, or, (e) => this._move(e)), K.on(this._element, sr, (e) => this._end(e)));
	}
	_eventIsPointerPenTouch(e) {
		return this._supportPointerEvents && (e.pointerType === dr || e.pointerType === ur);
	}
	static isSupported() {
		return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
	}
}, _r = "carousel", vr = ".bs.carousel", yr = ".data-api", br = "ArrowLeft", xr = "ArrowRight", Sr = 500, Cr = "next", wr = "prev", Tr = "left", Er = "right", Dr = `slide${vr}`, Or = `slid${vr}`, kr = `keydown${vr}`, Ar = `mouseenter${vr}`, jr = `mouseleave${vr}`, Mr = `dragstart${vr}`, Nr = `load${vr}${yr}`, Pr = `click${vr}${yr}`, Fr = "carousel", Ir = "active", Lr = "slide", Rr = "carousel-item-end", zr = "carousel-item-start", Br = "carousel-item-next", Vr = "carousel-item-prev", Hr = ".active", Ur = ".carousel-item", Wr = Hr + Ur, Gr = ".carousel-item img", Kr = ".carousel-indicators", qr = "[data-bs-slide], [data-bs-slide-to]", Jr = "[data-bs-ride=\"carousel\"]", Yr = {
	[br]: Er,
	[xr]: Tr
}, Xr = {
	interval: 5e3,
	keyboard: !0,
	pause: "hover",
	ride: !1,
	touch: !0,
	wrap: !0
}, Zr = {
	interval: "(number|boolean)",
	keyboard: "boolean",
	pause: "(string|boolean)",
	ride: "(boolean|string)",
	touch: "boolean",
	wrap: "boolean"
}, Qr = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = q.findOne(Kr, this._element), this._addEventListeners(), this._config.ride === Fr && this.cycle();
	}
	static get Default() {
		return Xr;
	}
	static get DefaultType() {
		return Zr;
	}
	static get NAME() {
		return _r;
	}
	next() {
		this._slide(Cr);
	}
	nextWhenVisible() {
		!document.hidden && rn(this._element) && this.next();
	}
	prev() {
		this._slide(wr);
	}
	pause() {
		this._isSliding && en(this._element), this._clearInterval();
	}
	cycle() {
		this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	}
	_maybeEnableCycle() {
		if (this._config.ride) {
			if (this._isSliding) {
				K.one(this._element, Or, () => this.cycle());
				return;
			}
			this.cycle();
		}
	}
	to(e) {
		let t = this._getItems();
		if (e > t.length - 1 || e < 0) return;
		if (this._isSliding) {
			K.one(this._element, Or, () => this.to(e));
			return;
		}
		let n = this._getItemIndex(this._getActive());
		if (n === e) return;
		let r = e > n ? Cr : wr;
		this._slide(r, t[e]);
	}
	dispose() {
		this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.defaultInterval = e.interval, e;
	}
	_addEventListeners() {
		this._config.keyboard && K.on(this._element, kr, (e) => this._keydown(e)), this._config.pause === "hover" && (K.on(this._element, Ar, () => this.pause()), K.on(this._element, jr, () => this._maybeEnableCycle())), this._config.touch && gr.isSupported() && this._addTouchEventListeners();
	}
	_addTouchEventListeners() {
		for (let e of q.find(Gr, this._element)) K.on(e, Mr, (e) => e.preventDefault());
		let e = {
			leftCallback: () => this._slide(this._directionToOrder(Tr)),
			rightCallback: () => this._slide(this._directionToOrder(Er)),
			endCallback: () => {
				this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Sr + this._config.interval));
			}
		};
		this._swipeHelper = new gr(this._element, e);
	}
	_keydown(e) {
		if (/input|textarea/i.test(e.target.tagName)) return;
		let t = Yr[e.key];
		t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
	}
	_getItemIndex(e) {
		return this._getItems().indexOf(e);
	}
	_setActiveIndicatorElement(e) {
		if (!this._indicatorsElement) return;
		let t = q.findOne(Hr, this._indicatorsElement);
		t.classList.remove(Ir), t.removeAttribute("aria-current");
		let n = q.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
		n && (n.classList.add(Ir), n.setAttribute("aria-current", "true"));
	}
	_updateInterval() {
		let e = this._activeElement || this._getActive();
		if (!e) return;
		let t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
		this._config.interval = t || this._config.defaultInterval;
	}
	_slide(e, t = null) {
		if (this._isSliding) return;
		let n = this._getActive(), r = e === Cr, i = t || gn(this._getItems(), n, r, this._config.wrap);
		if (i === n) return;
		let a = this._getItemIndex(i), o = (t) => K.trigger(this._element, t, {
			relatedTarget: i,
			direction: this._orderToDirection(e),
			from: this._getItemIndex(n),
			to: a
		});
		if (o(Dr).defaultPrevented || !n || !i) return;
		let s = !!this._interval;
		this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = i;
		let c = r ? zr : Rr, l = r ? Br : Vr;
		i.classList.add(l), cn(i), n.classList.add(c), i.classList.add(c), this._queueCallback(() => {
			i.classList.remove(c, l), i.classList.add(Ir), n.classList.remove(Ir, l, c), this._isSliding = !1, o(Or);
		}, n, this._isAnimated()), s && this.cycle();
	}
	_isAnimated() {
		return this._element.classList.contains(Lr);
	}
	_getActive() {
		return q.findOne(Wr, this._element);
	}
	_getItems() {
		return q.find(Ur, this._element);
	}
	_clearInterval() {
		this._interval &&= (clearInterval(this._interval), null);
	}
	_directionToOrder(e) {
		return fn() ? e === Tr ? wr : Cr : e === Tr ? Cr : wr;
	}
	_orderToDirection(e) {
		return fn() ? e === wr ? Tr : Er : e === wr ? Er : Tr;
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
K.on(document, Pr, qr, function(e) {
	let t = q.getElementFromSelector(this);
	if (!t || !t.classList.contains(Fr)) return;
	e.preventDefault();
	let n = Qr.getOrCreateInstance(t), r = this.getAttribute("data-bs-slide-to");
	if (r) {
		n.to(r), n._maybeEnableCycle();
		return;
	}
	if (Ln.getDataAttribute(this, "slide") === "next") {
		n.next(), n._maybeEnableCycle();
		return;
	}
	n.prev(), n._maybeEnableCycle();
}), K.on(window, Nr, () => {
	let e = q.find(Jr);
	for (let t of e) Qr.getOrCreateInstance(t);
}), pn(Qr);
var $r = "collapse", ei = ".bs.collapse", ti = ".data-api", ni = `show${ei}`, ri = `shown${ei}`, ii = `hide${ei}`, ai = `hidden${ei}`, oi = `click${ei}${ti}`, si = "show", ci = "collapse", li = "collapsing", ui = "collapsed", di = `:scope .${ci} .${ci}`, fi = "collapse-horizontal", pi = "width", mi = "height", hi = ".collapse.show, .collapse.collapsing", gi = "[data-bs-toggle=\"collapse\"]", _i = {
	parent: null,
	toggle: !0
}, vi = {
	parent: "(null|element)",
	toggle: "boolean"
}, yi = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._isTransitioning = !1, this._triggerArray = [];
		let n = q.find(gi);
		for (let e of n) {
			let t = q.getSelectorFromElement(e), n = q.find(t).filter((e) => e === this._element);
			t !== null && n.length && this._triggerArray.push(e);
		}
		this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
	}
	static get Default() {
		return _i;
	}
	static get DefaultType() {
		return vi;
	}
	static get NAME() {
		return $r;
	}
	toggle() {
		this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (this._isTransitioning || this._isShown()) return;
		let t = [];
		if (this._config.parent && (t = this._getFirstLevelChildren(hi).filter((e) => e !== this._element).map((t) => e.getOrCreateInstance(t, { toggle: !1 }))), t.length && t[0]._isTransitioning || K.trigger(this._element, ni).defaultPrevented) return;
		for (let e of t) e.hide();
		let n = this._getDimension();
		this._element.classList.remove(ci), this._element.classList.add(li), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
		let r = () => {
			this._isTransitioning = !1, this._element.classList.remove(li), this._element.classList.add(ci, si), this._element.style[n] = "", K.trigger(this._element, ri);
		}, i = `scroll${n[0].toUpperCase() + n.slice(1)}`;
		this._queueCallback(r, this._element, !0), this._element.style[n] = `${this._element[i]}px`;
	}
	hide() {
		if (this._isTransitioning || !this._isShown() || K.trigger(this._element, ii).defaultPrevented) return;
		let e = this._getDimension();
		this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, cn(this._element), this._element.classList.add(li), this._element.classList.remove(ci, si);
		for (let e of this._triggerArray) {
			let t = q.getElementFromSelector(e);
			t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
		}
		this._isTransitioning = !0;
		let t = () => {
			this._isTransitioning = !1, this._element.classList.remove(li), this._element.classList.add(ci), K.trigger(this._element, ai);
		};
		this._element.style[e] = "", this._queueCallback(t, this._element, !0);
	}
	_isShown(e = this._element) {
		return e.classList.contains(si);
	}
	_configAfterMerge(e) {
		return e.toggle = !!e.toggle, e.parent = nn(e.parent), e;
	}
	_getDimension() {
		return this._element.classList.contains(fi) ? pi : mi;
	}
	_initializeChildren() {
		if (!this._config.parent) return;
		let e = this._getFirstLevelChildren(gi);
		for (let t of e) {
			let e = q.getElementFromSelector(t);
			e && this._addAriaAndCollapsedClass([t], this._isShown(e));
		}
	}
	_getFirstLevelChildren(e) {
		let t = q.find(di, this._config.parent);
		return q.find(e, this._config.parent).filter((e) => !t.includes(e));
	}
	_addAriaAndCollapsedClass(e, t) {
		if (e.length) for (let n of e) n.classList.toggle(ui, !t), n.setAttribute("aria-expanded", t);
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
K.on(document, oi, gi, function(e) {
	(e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
	for (let e of q.getMultipleElementsFromSelector(this)) yi.getOrCreateInstance(e, { toggle: !1 }).toggle();
}), pn(yi);
var bi = "dropdown", xi = ".bs.dropdown", Si = ".data-api", Ci = "Escape", wi = "Tab", Ti = "ArrowUp", Ei = "ArrowDown", Di = 2, Oi = `hide${xi}`, ki = `hidden${xi}`, Ai = `show${xi}`, ji = `shown${xi}`, Mi = `click${xi}${Si}`, Ni = `keydown${xi}${Si}`, Pi = `keyup${xi}${Si}`, Fi = "show", Ii = "dropup", Li = "dropend", Ri = "dropstart", zi = "dropup-center", Bi = "dropdown-center", Vi = "[data-bs-toggle=\"dropdown\"]:not(.disabled):not(:disabled)", Hi = `${Vi}.${Fi}`, Ui = ".dropdown-menu", Wi = ".navbar", Gi = ".navbar-nav", Ki = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", qi = fn() ? "top-end" : "top-start", Ji = fn() ? "top-start" : "top-end", Yi = fn() ? "bottom-end" : "bottom-start", Xi = fn() ? "bottom-start" : "bottom-end", Zi = fn() ? "left-start" : "right-start", Qi = fn() ? "right-start" : "left-start", $i = "top", ea = "bottom", ta = {
	autoClose: !0,
	boundary: "clippingParents",
	display: "dynamic",
	offset: [0, 2],
	popperConfig: null,
	reference: "toggle"
}, na = {
	autoClose: "(boolean|string)",
	boundary: "(string|element)",
	display: "string",
	offset: "(array|string|function)",
	popperConfig: "(null|object|function)",
	reference: "(string|element|object)"
}, ra = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = q.next(this._element, Ui)[0] || q.prev(this._element, Ui)[0] || q.findOne(Ui, this._parent), this._inNavbar = this._detectNavbar();
	}
	static get Default() {
		return ta;
	}
	static get DefaultType() {
		return na;
	}
	static get NAME() {
		return bi;
	}
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (an(this._element) || this._isShown()) return;
		let e = { relatedTarget: this._element };
		if (!K.trigger(this._element, Ai, e).defaultPrevented) {
			if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Gi)) for (let e of [].concat(...document.body.children)) K.on(e, "mouseover", sn);
			this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Fi), this._element.classList.add(Fi), K.trigger(this._element, ji, e);
		}
	}
	hide() {
		if (an(this._element) || !this._isShown()) return;
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
		if (!K.trigger(this._element, Oi, e).defaultPrevented) {
			if ("ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) K.off(e, "mouseover", sn);
			this._popper && this._popper.destroy(), this._menu.classList.remove(Fi), this._element.classList.remove(Fi), this._element.setAttribute("aria-expanded", "false"), Ln.removeDataAttribute(this._menu, "popper"), K.trigger(this._element, ki, e);
		}
	}
	_getConfig(e) {
		if (e = super._getConfig(e), typeof e.reference == "object" && !tn(e.reference) && typeof e.reference.getBoundingClientRect != "function") throw TypeError(`${bi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		return e;
	}
	_createPopper() {
		if (Wt === void 0) throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
		let e = this._element;
		this._config.reference === "parent" ? e = this._parent : tn(this._config.reference) ? e = nn(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
		let t = this._getPopperConfig();
		this._popper = Ut(e, this._menu, t);
	}
	_isShown() {
		return this._menu.classList.contains(Fi);
	}
	_getPlacement() {
		let e = this._parent;
		if (e.classList.contains(Li)) return Zi;
		if (e.classList.contains(Ri)) return Qi;
		if (e.classList.contains(zi)) return $i;
		if (e.classList.contains(Bi)) return ea;
		let t = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
		return e.classList.contains(Ii) ? t ? Ji : qi : t ? Xi : Yi;
	}
	_detectNavbar() {
		return this._element.closest(Wi) !== null;
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
		return (this._inNavbar || this._config.display === "static") && (Ln.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
			name: "applyStyles",
			enabled: !1
		}]), {
			...e,
			...mn(this._config.popperConfig, [void 0, e])
		};
	}
	_selectMenuItem({ key: e, target: t }) {
		let n = q.find(Ki, this._menu).filter((e) => rn(e));
		n.length && gn(n, t, e === Ei, !n.includes(t)).focus();
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
		if (t.button === Di || t.type === "keyup" && t.key !== wi) return;
		let n = q.find(Hi);
		for (let r of n) {
			let n = e.getInstance(r);
			if (!n || n._config.autoClose === !1) continue;
			let i = t.composedPath(), a = i.includes(n._menu);
			if (i.includes(n._element) || n._config.autoClose === "inside" && !a || n._config.autoClose === "outside" && a || n._menu.contains(t.target) && (t.type === "keyup" && t.key === wi || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
			let o = { relatedTarget: n._element };
			t.type === "click" && (o.clickEvent = t), n._completeHide(o);
		}
	}
	static dataApiKeydownHandler(t) {
		let n = /input|textarea/i.test(t.target.tagName), r = t.key === Ci, i = [Ti, Ei].includes(t.key);
		if (!i && !r || n && !r) return;
		t.preventDefault();
		let a = this.matches(Vi) ? this : q.prev(this, Vi)[0] || q.next(this, Vi)[0] || q.findOne(Vi, t.delegateTarget.parentNode), o = e.getOrCreateInstance(a);
		if (i) {
			t.stopPropagation(), o.show(), o._selectMenuItem(t);
			return;
		}
		o._isShown() && (t.stopPropagation(), o.hide(), a.focus());
	}
};
K.on(document, Ni, Vi, ra.dataApiKeydownHandler), K.on(document, Ni, Ui, ra.dataApiKeydownHandler), K.on(document, Mi, ra.clearMenus), K.on(document, Pi, ra.clearMenus), K.on(document, Mi, Vi, function(e) {
	e.preventDefault(), ra.getOrCreateInstance(this).toggle();
}), pn(ra);
var ia = "backdrop", aa = "fade", oa = "show", sa = `mousedown.bs.${ia}`, ca = {
	className: "modal-backdrop",
	clickCallback: null,
	isAnimated: !1,
	isVisible: !0,
	rootElement: "body"
}, la = {
	className: "string",
	clickCallback: "(function|null)",
	isAnimated: "boolean",
	isVisible: "boolean",
	rootElement: "(element|string)"
}, ua = class extends Rn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null;
	}
	static get Default() {
		return ca;
	}
	static get DefaultType() {
		return la;
	}
	static get NAME() {
		return ia;
	}
	show(e) {
		if (!this._config.isVisible) {
			mn(e);
			return;
		}
		this._append();
		let t = this._getElement();
		this._config.isAnimated && cn(t), t.classList.add(oa), this._emulateAnimation(() => {
			mn(e);
		});
	}
	hide(e) {
		if (!this._config.isVisible) {
			mn(e);
			return;
		}
		this._getElement().classList.remove(oa), this._emulateAnimation(() => {
			this.dispose(), mn(e);
		});
	}
	dispose() {
		this._isAppended &&= (K.off(this._element, sa), this._element.remove(), !1);
	}
	_getElement() {
		if (!this._element) {
			let e = document.createElement("div");
			e.className = this._config.className, this._config.isAnimated && e.classList.add(aa), this._element = e;
		}
		return this._element;
	}
	_configAfterMerge(e) {
		return e.rootElement = nn(e.rootElement), e;
	}
	_append() {
		if (this._isAppended) return;
		let e = this._getElement();
		this._config.rootElement.append(e), K.on(e, sa, () => {
			mn(this._config.clickCallback);
		}), this._isAppended = !0;
	}
	_emulateAnimation(e) {
		hn(e, this._getElement(), this._config.isAnimated);
	}
}, da = "focustrap", fa = ".bs.focustrap", pa = `focusin${fa}`, ma = `keydown.tab${fa}`, ha = "Tab", ga = "forward", _a = "backward", va = {
	autofocus: !0,
	trapElement: null
}, ya = {
	autofocus: "boolean",
	trapElement: "element"
}, ba = class extends Rn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null;
	}
	static get Default() {
		return va;
	}
	static get DefaultType() {
		return ya;
	}
	static get NAME() {
		return da;
	}
	activate() {
		this._isActive ||= (this._config.autofocus && this._config.trapElement.focus(), K.off(document, fa), K.on(document, pa, (e) => this._handleFocusin(e)), K.on(document, ma, (e) => this._handleKeydown(e)), !0);
	}
	deactivate() {
		this._isActive && (this._isActive = !1, K.off(document, fa));
	}
	_handleFocusin(e) {
		let { trapElement: t } = this._config;
		if (e.target === document || e.target === t || t.contains(e.target)) return;
		let n = q.focusableChildren(t);
		n.length === 0 ? t.focus() : this._lastTabNavDirection === _a ? n[n.length - 1].focus() : n[0].focus();
	}
	_handleKeydown(e) {
		e.key === ha && (this._lastTabNavDirection = e.shiftKey ? _a : ga);
	}
}, xa = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Sa = ".sticky-top", Ca = "padding-right", wa = "margin-right", Ta = class {
	constructor() {
		this._element = document.body;
	}
	getWidth() {
		let e = document.documentElement.clientWidth;
		return Math.abs(window.innerWidth - e);
	}
	hide() {
		let e = this.getWidth();
		this._disableOverFlow(), this._setElementAttributes(this._element, Ca, (t) => t + e), this._setElementAttributes(xa, Ca, (t) => t + e), this._setElementAttributes(Sa, wa, (t) => t - e);
	}
	reset() {
		this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Ca), this._resetElementAttributes(xa, Ca), this._resetElementAttributes(Sa, wa);
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
		n && Ln.setDataAttribute(e, t, n);
	}
	_resetElementAttributes(e, t) {
		this._applyManipulationCallback(e, (e) => {
			let n = Ln.getDataAttribute(e, t);
			if (n === null) {
				e.style.removeProperty(t);
				return;
			}
			Ln.removeDataAttribute(e, t), e.style.setProperty(t, n);
		});
	}
	_applyManipulationCallback(e, t) {
		if (tn(e)) {
			t(e);
			return;
		}
		for (let n of q.find(e, this._element)) t(n);
	}
}, Ea = "modal", Da = ".bs.modal", Oa = ".data-api", ka = "Escape", Aa = `hide${Da}`, ja = `hidePrevented${Da}`, Ma = `hidden${Da}`, Na = `show${Da}`, Pa = `shown${Da}`, Fa = `resize${Da}`, Ia = `click.dismiss${Da}`, La = `mousedown.dismiss${Da}`, Ra = `keydown.dismiss${Da}`, za = `click${Da}${Oa}`, Ba = "modal-open", Va = "fade", Ha = "show", Ua = "modal-static", Wa = ".modal.show", Ga = ".modal-dialog", Ka = ".modal-body", qa = "[data-bs-toggle=\"modal\"]", Ja = {
	backdrop: !0,
	focus: !0,
	keyboard: !0
}, Ya = {
	backdrop: "(boolean|string)",
	focus: "boolean",
	keyboard: "boolean"
}, Xa = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._dialog = q.findOne(Ga, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Ta(), this._addEventListeners();
	}
	static get Default() {
		return Ja;
	}
	static get DefaultType() {
		return Ya;
	}
	static get NAME() {
		return Ea;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || this._isTransitioning || K.trigger(this._element, Na, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Ba), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
	}
	hide() {
		!this._isShown || this._isTransitioning || K.trigger(this._element, Aa).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Ha), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
	}
	dispose() {
		K.off(window, Da), K.off(this._dialog, Da), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	handleUpdate() {
		this._adjustDialog();
	}
	_initializeBackDrop() {
		return new ua({
			isVisible: !!this._config.backdrop,
			isAnimated: this._isAnimated()
		});
	}
	_initializeFocusTrap() {
		return new ba({ trapElement: this._element });
	}
	_showElement(e) {
		document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
		let t = q.findOne(Ka, this._dialog);
		t && (t.scrollTop = 0), cn(this._element), this._element.classList.add(Ha), this._queueCallback(() => {
			this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, K.trigger(this._element, Pa, { relatedTarget: e });
		}, this._dialog, this._isAnimated());
	}
	_addEventListeners() {
		K.on(this._element, Ra, (e) => {
			if (e.key === ka) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				this._triggerBackdropTransition();
			}
		}), K.on(window, Fa, () => {
			this._isShown && !this._isTransitioning && this._adjustDialog();
		}), K.on(this._element, La, (e) => {
			K.one(this._element, Ia, (t) => {
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
			document.body.classList.remove(Ba), this._resetAdjustments(), this._scrollBar.reset(), K.trigger(this._element, Ma);
		});
	}
	_isAnimated() {
		return this._element.classList.contains(Va);
	}
	_triggerBackdropTransition() {
		if (K.trigger(this._element, ja).defaultPrevented) return;
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._element.style.overflowY;
		t === "hidden" || this._element.classList.contains(Ua) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Ua), this._queueCallback(() => {
			this._element.classList.remove(Ua), this._queueCallback(() => {
				this._element.style.overflowY = t;
			}, this._dialog);
		}, this._dialog), this._element.focus());
	}
	_adjustDialog() {
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._scrollBar.getWidth(), n = t > 0;
		if (n && !e) {
			let e = fn() ? "paddingLeft" : "paddingRight";
			this._element.style[e] = `${t}px`;
		}
		if (!n && e) {
			let e = fn() ? "paddingRight" : "paddingLeft";
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
K.on(document, za, qa, function(e) {
	let t = q.getElementFromSelector(this);
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), K.one(t, Na, (e) => {
		e.defaultPrevented || K.one(t, Ma, () => {
			rn(this) && this.focus();
		});
	});
	let n = q.findOne(Wa);
	n && Xa.getInstance(n).hide(), Xa.getOrCreateInstance(t).toggle(this);
}), Hn(Xa), pn(Xa);
var Za = "offcanvas", Qa = ".bs.offcanvas", $a = ".data-api", eo = `load${Qa}${$a}`, to = "Escape", no = "show", ro = "showing", io = "hiding", ao = "offcanvas-backdrop", oo = ".offcanvas.show", so = `show${Qa}`, co = `shown${Qa}`, lo = `hide${Qa}`, uo = `hidePrevented${Qa}`, fo = `hidden${Qa}`, po = `resize${Qa}`, mo = `click${Qa}${$a}`, ho = `keydown.dismiss${Qa}`, go = "[data-bs-toggle=\"offcanvas\"]", _o = {
	backdrop: !0,
	keyboard: !0,
	scroll: !1
}, vo = {
	backdrop: "(boolean|string)",
	keyboard: "boolean",
	scroll: "boolean"
}, yo = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
	}
	static get Default() {
		return _o;
	}
	static get DefaultType() {
		return vo;
	}
	static get NAME() {
		return Za;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || K.trigger(this._element, so, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || new Ta().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(ro), this._queueCallback(() => {
			(!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(no), this._element.classList.remove(ro), K.trigger(this._element, co, { relatedTarget: e });
		}, this._element, !0));
	}
	hide() {
		!this._isShown || K.trigger(this._element, lo).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(io), this._backdrop.hide(), this._queueCallback(() => {
			this._element.classList.remove(no, io), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Ta().reset(), K.trigger(this._element, fo);
		}, this._element, !0));
	}
	dispose() {
		this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	_initializeBackDrop() {
		let e = () => {
			if (this._config.backdrop === "static") {
				K.trigger(this._element, uo);
				return;
			}
			this.hide();
		}, t = !!this._config.backdrop;
		return new ua({
			className: ao,
			isVisible: t,
			isAnimated: !0,
			rootElement: this._element.parentNode,
			clickCallback: t ? e : null
		});
	}
	_initializeFocusTrap() {
		return new ba({ trapElement: this._element });
	}
	_addEventListeners() {
		K.on(this._element, ho, (e) => {
			if (e.key === to) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				K.trigger(this._element, uo);
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
K.on(document, mo, go, function(e) {
	let t = q.getElementFromSelector(this);
	if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), an(this)) return;
	K.one(t, fo, () => {
		rn(this) && this.focus();
	});
	let n = q.findOne(oo);
	n && n !== t && yo.getInstance(n).hide(), yo.getOrCreateInstance(t).toggle(this);
}), K.on(window, eo, () => {
	for (let e of q.find(oo)) yo.getOrCreateInstance(e).show();
}), K.on(window, po, () => {
	for (let e of q.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(e).position !== "fixed" && yo.getOrCreateInstance(e).hide();
}), Hn(yo), pn(yo);
var bo = {
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
}, xo = new Set([
	"background",
	"cite",
	"href",
	"itemtype",
	"longdesc",
	"poster",
	"src",
	"xlink:href"
]), So = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Co = (e, t) => {
	let n = e.nodeName.toLowerCase();
	return t.includes(n) ? xo.has(n) ? !!So.test(e.nodeValue) : !0 : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
};
function wo(e, t, n) {
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
		for (let t of r) Co(t, i) || e.removeAttribute(t.nodeName);
	}
	return r.body.innerHTML;
}
var To = "TemplateFactory", Eo = {
	allowList: bo,
	content: {},
	extraClass: "",
	html: !1,
	sanitize: !0,
	sanitizeFn: null,
	template: "<div></div>"
}, Do = {
	allowList: "object",
	content: "object",
	extraClass: "(string|function)",
	html: "boolean",
	sanitize: "boolean",
	sanitizeFn: "(null|function)",
	template: "string"
}, Oo = {
	entry: "(string|element|function|null)",
	selector: "(string|element)"
}, ko = class extends Rn {
	constructor(e) {
		super(), this._config = this._getConfig(e);
	}
	static get Default() {
		return Eo;
	}
	static get DefaultType() {
		return Do;
	}
	static get NAME() {
		return To;
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
		}, Oo);
	}
	_setContent(e, t, n) {
		let r = q.findOne(n, e);
		if (r) {
			if (t = this._resolvePossibleFunction(t), !t) {
				r.remove();
				return;
			}
			if (tn(t)) {
				this._putElementInTemplate(nn(t), r);
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
		return this._config.sanitize ? wo(e, this._config.allowList, this._config.sanitizeFn) : e;
	}
	_resolvePossibleFunction(e) {
		return mn(e, [void 0, this]);
	}
	_putElementInTemplate(e, t) {
		if (this._config.html) {
			t.innerHTML = "", t.append(e);
			return;
		}
		t.textContent = e.textContent;
	}
}, Ao = "tooltip", jo = new Set([
	"sanitize",
	"allowList",
	"sanitizeFn"
]), Mo = "fade", No = "modal", Po = "show", Fo = ".tooltip-inner", Io = `.${No}`, Lo = "hide.bs.modal", Ro = "hover", zo = "focus", Bo = "click", Vo = "manual", Ho = "hide", Uo = "hidden", Wo = "show", Go = "shown", Ko = "inserted", qo = "click", Jo = "focusin", Yo = "focusout", Xo = "mouseenter", Zo = "mouseleave", Qo = {
	AUTO: "auto",
	TOP: "top",
	RIGHT: fn() ? "left" : "right",
	BOTTOM: "bottom",
	LEFT: fn() ? "right" : "left"
}, $o = {
	allowList: bo,
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
}, es = {
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
}, ts = class e extends Bn {
	constructor(e, t) {
		if (Wt === void 0) throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
		super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
	}
	static get Default() {
		return $o;
	}
	static get DefaultType() {
		return es;
	}
	static get NAME() {
		return Ao;
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
		clearTimeout(this._timeout), K.off(this._element.closest(Io), Lo, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
	}
	show() {
		if (this._element.style.display === "none") throw Error("Please use show on visible elements");
		if (!(this._isWithContent() && this._isEnabled)) return;
		let e = K.trigger(this._element, this.constructor.eventName(Wo)), t = (on(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
		if (e.defaultPrevented || !t) return;
		this._disposePopper();
		let n = this._getTipElement();
		this._element.setAttribute("aria-describedby", n.getAttribute("id"));
		let { container: r } = this._config;
		if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(n), K.trigger(this._element, this.constructor.eventName(Ko))), this._popper = this._createPopper(n), n.classList.add(Po), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) K.on(e, "mouseover", sn);
		this._queueCallback(() => {
			K.trigger(this._element, this.constructor.eventName(Go)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
		}, this.tip, this._isAnimated());
	}
	hide() {
		if (!(!this._isShown() || K.trigger(this._element, this.constructor.eventName(Ho)).defaultPrevented)) {
			if (this._getTipElement().classList.remove(Po), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) K.off(e, "mouseover", sn);
			this._activeTrigger[Bo] = !1, this._activeTrigger[zo] = !1, this._activeTrigger[Ro] = !1, this._isHovered = null, this._queueCallback(() => {
				this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), K.trigger(this._element, this.constructor.eventName(Uo)));
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
		t.classList.remove(Mo, Po), t.classList.add(`bs-${this.constructor.NAME}-auto`);
		let n = Qt(this.constructor.NAME).toString();
		return t.setAttribute("id", n), this._isAnimated() && t.classList.add(Mo), t;
	}
	setContent(e) {
		this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
	}
	_getTemplateFactory(e) {
		return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new ko({
			...this._config,
			content: e,
			extraClass: this._resolvePossibleFunction(this._config.customClass)
		}), this._templateFactory;
	}
	_getContentForTemplate() {
		return { [Fo]: this._getTitle() };
	}
	_getTitle() {
		return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
	}
	_initializeOnDelegatedTarget(e) {
		return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
	}
	_isAnimated() {
		return this._config.animation || this.tip && this.tip.classList.contains(Mo);
	}
	_isShown() {
		return this.tip && this.tip.classList.contains(Po);
	}
	_createPopper(e) {
		let t = Qo[mn(this._config.placement, [
			this,
			e,
			this._element
		]).toUpperCase()];
		return Ut(this._element, e, this._getPopperConfig(t));
	}
	_getOffset() {
		let { offset: e } = this._config;
		return typeof e == "string" ? e.split(",").map((e) => Number.parseInt(e, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
	}
	_resolvePossibleFunction(e) {
		return mn(e, [this._element, this._element]);
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
			...mn(this._config.popperConfig, [void 0, t])
		};
	}
	_setListeners() {
		let e = this._config.trigger.split(" ");
		for (let t of e) if (t === "click") K.on(this._element, this.constructor.eventName(qo), this._config.selector, (e) => {
			let t = this._initializeOnDelegatedTarget(e);
			t._activeTrigger[Bo] = !(t._isShown() && t._activeTrigger[Bo]), t.toggle();
		});
		else if (t !== Vo) {
			let e = t === Ro ? this.constructor.eventName(Xo) : this.constructor.eventName(Jo), n = t === Ro ? this.constructor.eventName(Zo) : this.constructor.eventName(Yo);
			K.on(this._element, e, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusin" ? zo : Ro] = !0, t._enter();
			}), K.on(this._element, n, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusout" ? zo : Ro] = t._element.contains(e.relatedTarget), t._leave();
			});
		}
		this._hideModalHandler = () => {
			this._element && this.hide();
		}, K.on(this._element.closest(Io), Lo, this._hideModalHandler);
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
		let t = Ln.getDataAttributes(this._element);
		for (let e of Object.keys(t)) jo.has(e) && delete t[e];
		return e = {
			...t,
			...typeof e == "object" && e ? e : {}
		}, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	_configAfterMerge(e) {
		return e.container = e.container === !1 ? document.body : nn(e.container), typeof e.delay == "number" && (e.delay = {
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
pn(ts);
var ns = "popover", rs = ".popover-header", is = ".popover-body", as = {
	...ts.Default,
	content: "",
	offset: [0, 8],
	placement: "right",
	template: "<div class=\"popover\" role=\"tooltip\"><div class=\"popover-arrow\"></div><h3 class=\"popover-header\"></h3><div class=\"popover-body\"></div></div>",
	trigger: "click"
}, os = {
	...ts.DefaultType,
	content: "(null|string|element|function)"
};
pn(class e extends ts {
	static get Default() {
		return as;
	}
	static get DefaultType() {
		return os;
	}
	static get NAME() {
		return ns;
	}
	_isWithContent() {
		return this._getTitle() || this._getContent();
	}
	_getContentForTemplate() {
		return {
			[rs]: this._getTitle(),
			[is]: this._getContent()
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
var ss = "scrollspy", cs = ".bs.scrollspy", ls = ".data-api", us = `activate${cs}`, ds = `click${cs}`, fs = `load${cs}${ls}`, ps = "dropdown-item", ms = "active", hs = "[data-bs-spy=\"scroll\"]", gs = "[href]", _s = ".nav, .list-group", vs = ".nav-link", ys = `${vs}, .nav-item > ${vs}, .list-group-item`, bs = ".dropdown", xs = ".dropdown-toggle", Ss = {
	offset: null,
	rootMargin: "0px 0px -25%",
	smoothScroll: !1,
	target: null,
	threshold: [
		.1,
		.5,
		1
	]
}, Cs = {
	offset: "(number|null)",
	rootMargin: "string",
	smoothScroll: "boolean",
	target: "element",
	threshold: "array"
}, ws = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
			visibleEntryTop: 0,
			parentScrollTop: 0
		}, this.refresh();
	}
	static get Default() {
		return Ss;
	}
	static get DefaultType() {
		return Cs;
	}
	static get NAME() {
		return ss;
	}
	refresh() {
		this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
		for (let e of this._observableSections.values()) this._observer.observe(e);
	}
	dispose() {
		this._observer.disconnect(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.target = nn(e.target) || document.body, e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin, typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map((e) => Number.parseFloat(e))), e;
	}
	_maybeEnableSmoothScroll() {
		this._config.smoothScroll && (K.off(this._config.target, ds), K.on(this._config.target, ds, gs, (e) => {
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
		let e = q.find(gs, this._config.target);
		for (let t of e) {
			if (!t.hash || an(t)) continue;
			let e = q.findOne(decodeURI(t.hash), this._element);
			rn(e) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e));
		}
	}
	_process(e) {
		this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(ms), this._activateParents(e), K.trigger(this._element, us, { relatedTarget: e }));
	}
	_activateParents(e) {
		if (e.classList.contains(ps)) {
			q.findOne(xs, e.closest(bs)).classList.add(ms);
			return;
		}
		for (let t of q.parents(e, _s)) for (let e of q.prev(t, ys)) e.classList.add(ms);
	}
	_clearActiveClass(e) {
		e.classList.remove(ms);
		let t = q.find(`${gs}.${ms}`, e);
		for (let e of t) e.classList.remove(ms);
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
K.on(window, fs, () => {
	for (let e of q.find(hs)) ws.getOrCreateInstance(e);
}), pn(ws);
var Ts = "tab", Es = ".bs.tab", Ds = `hide${Es}`, Os = `hidden${Es}`, ks = `show${Es}`, As = `shown${Es}`, js = `click${Es}`, Ms = `keydown${Es}`, Ns = `load${Es}`, Ps = "ArrowLeft", Fs = "ArrowRight", Is = "ArrowUp", Ls = "ArrowDown", Rs = "Home", zs = "End", Bs = "active", Vs = "fade", Hs = "show", Us = "dropdown", Ws = ".dropdown-toggle", Gs = ".dropdown-menu", Ks = `:not(${Ws})`, qs = ".list-group, .nav, [role=\"tablist\"]", Js = ".nav-item, .list-group-item", Ys = `.nav-link${Ks}, .list-group-item${Ks}, [role="tab"]${Ks}`, Xs = "[data-bs-toggle=\"tab\"], [data-bs-toggle=\"pill\"], [data-bs-toggle=\"list\"]", Zs = `${Ys}, ${Xs}`, Qs = `.${Bs}[data-bs-toggle="tab"], .${Bs}[data-bs-toggle="pill"], .${Bs}[data-bs-toggle="list"]`, $s = class e extends Bn {
	constructor(e) {
		super(e), this._parent = this._element.closest(qs), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), K.on(this._element, Ms, (e) => this._keydown(e)));
	}
	static get NAME() {
		return Ts;
	}
	show() {
		let e = this._element;
		if (this._elemIsActive(e)) return;
		let t = this._getActiveElem(), n = t ? K.trigger(t, Ds, { relatedTarget: e }) : null;
		K.trigger(e, ks, { relatedTarget: t }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(t, e), this._activate(e, t));
	}
	_activate(e, t) {
		e && (e.classList.add(Bs), this._activate(q.getElementFromSelector(e)), this._queueCallback(() => {
			if (e.getAttribute("role") !== "tab") {
				e.classList.add(Hs);
				return;
			}
			e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), K.trigger(e, As, { relatedTarget: t });
		}, e, e.classList.contains(Vs)));
	}
	_deactivate(e, t) {
		e && (e.classList.remove(Bs), e.blur(), this._deactivate(q.getElementFromSelector(e)), this._queueCallback(() => {
			if (e.getAttribute("role") !== "tab") {
				e.classList.remove(Hs);
				return;
			}
			e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), K.trigger(e, Os, { relatedTarget: t });
		}, e, e.classList.contains(Vs)));
	}
	_keydown(t) {
		if (![
			Ps,
			Fs,
			Is,
			Ls,
			Rs,
			zs
		].includes(t.key)) return;
		t.stopPropagation(), t.preventDefault();
		let n = this._getChildren().filter((e) => !an(e)), r;
		if ([Rs, zs].includes(t.key)) r = n[t.key === Rs ? 0 : n.length - 1];
		else {
			let e = [Fs, Ls].includes(t.key);
			r = gn(n, t.target, e, !0);
		}
		r && (r.focus({ preventScroll: !0 }), e.getOrCreateInstance(r).show());
	}
	_getChildren() {
		return q.find(Zs, this._parent);
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
		let t = q.getElementFromSelector(e);
		t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
	}
	_toggleDropDown(e, t) {
		let n = this._getOuterElement(e);
		if (!n.classList.contains(Us)) return;
		let r = (e, r) => {
			let i = q.findOne(e, n);
			i && i.classList.toggle(r, t);
		};
		r(Ws, Bs), r(Gs, Hs), n.setAttribute("aria-expanded", t);
	}
	_setAttributeIfNotExists(e, t, n) {
		e.hasAttribute(t) || e.setAttribute(t, n);
	}
	_elemIsActive(e) {
		return e.classList.contains(Bs);
	}
	_getInnerElement(e) {
		return e.matches(Zs) ? e : q.findOne(Zs, e);
	}
	_getOuterElement(e) {
		return e.closest(Js) || e;
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
K.on(document, js, Xs, function(e) {
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), !an(this) && $s.getOrCreateInstance(this).show();
}), K.on(window, Ns, () => {
	for (let e of q.find(Qs)) $s.getOrCreateInstance(e);
}), pn($s);
var ec = "toast", tc = ".bs.toast", nc = `mouseover${tc}`, rc = `mouseout${tc}`, ic = `focusin${tc}`, ac = `focusout${tc}`, oc = `hide${tc}`, sc = `hidden${tc}`, cc = `show${tc}`, lc = `shown${tc}`, uc = "fade", dc = "hide", fc = "show", pc = "showing", mc = {
	animation: "boolean",
	autohide: "boolean",
	delay: "number"
}, hc = {
	animation: !0,
	autohide: !0,
	delay: 5e3
}, gc = class e extends Bn {
	constructor(e, t) {
		super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
	}
	static get Default() {
		return hc;
	}
	static get DefaultType() {
		return mc;
	}
	static get NAME() {
		return ec;
	}
	show() {
		K.trigger(this._element, cc).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add(uc), this._element.classList.remove(dc), cn(this._element), this._element.classList.add(fc, pc), this._queueCallback(() => {
			this._element.classList.remove(pc), K.trigger(this._element, lc), this._maybeScheduleHide();
		}, this._element, this._config.animation));
	}
	hide() {
		!this.isShown() || K.trigger(this._element, oc).defaultPrevented || (this._element.classList.add(pc), this._queueCallback(() => {
			this._element.classList.add(dc), this._element.classList.remove(pc, fc), K.trigger(this._element, sc);
		}, this._element, this._config.animation));
	}
	dispose() {
		this._clearTimeout(), this.isShown() && this._element.classList.remove(fc), super.dispose();
	}
	isShown() {
		return this._element.classList.contains(fc);
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
		K.on(this._element, nc, (e) => this._onInteraction(e, !0)), K.on(this._element, rc, (e) => this._onInteraction(e, !1)), K.on(this._element, ic, (e) => this._onInteraction(e, !0)), K.on(this._element, ac, (e) => this._onInteraction(e, !1));
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
Hn(gc), pn(gc);
//#endregion
//#region node_modules/mitt/dist/mitt.mjs
function _c(e) {
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
function vc(e, t) {
	for (let n in t) n === "__proto__" || n === "constructor" || n === "prototype" || t[n] instanceof Object && n in e && Object.assign(t[n], vc(e[n], t[n]));
	return Object.assign(e || {}, t);
}
function yc(e, t, n, r) {
	try {
		return typeof e == "function" ? e(t, n, r) : e;
	} catch (e) {
		return console.error(e), null;
	}
}
async function bc(e) {
	try {
		return {
			data: await e.json(),
			error: null
		};
	} catch (e) {
		return {
			data: void 0,
			error: e
		};
	}
}
function xc(e, t) {
	let n = [];
	if (t && t.errors) {
		if (Array.isArray(t.errors)) for (let e of t.errors) n.push({
			message: e.message || e,
			timeout: 3500,
			priority: "danger"
		});
		else if (typeof t.errors == "object") {
			if (Array.isArray(t.errors.exception)) for (let e of t.errors.exception) n.push({
				message: e.message || e,
				timeout: 3500,
				priority: "danger"
			});
			else for (let e in t.errors) if (Array.isArray(t.errors[e])) for (let r of t.errors[e]) n.push({
				message: r.message || r,
				timeout: 3500,
				priority: "danger"
			});
		}
	} else e.status >= 400 && e.status <= 511 && n.push({
		message: e.status + (e.statusText ? " " + e.statusText : ""),
		timeout: 3500,
		priority: "danger"
	});
	return n.length > 0 ? n : null;
}
var Sc = Date.now() ^ (typeof performance < "u" && performance.now ? performance.now() : 0) << 16;
function Cc() {
	return Sc ^= Sc << 13, Sc ^= Sc >>> 17, Sc ^= Sc << 5, (Sc >>> 0) / 4294967295;
}
function wc(e = 16) {
	let t = Math.max(0, e), n = new Uint8Array(t);
	if (typeof crypto < "u" && crypto.getRandomValues) return crypto.getRandomValues(n), n;
	for (let e = 0; e < t; e++) n[e] = Math.floor(Cc() * 256);
	return n;
}
function Tc() {
	let e = wc(4);
	return ((e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]) >>> 0) / 4294967295;
}
function Ec(e) {
	return !e || e <= 0 ? 0 : Math.floor(Tc() * e);
}
function Dc(e = 12, t = "abcdefghijklmnopqrstuvwxyz0123456789") {
	let n = wc(e), r = "", i = t.length;
	for (let e = 0; e < n.length; e++) r += t[n[e] % i];
	return r;
}
function Oc(e, t, n, r) {
	if (t.options ||= {}, t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), r && r.header) for (let e of Object.keys(r.header)) t.options.headers[e] = r.header[e];
	return t.options.body = void 0, t.options.method = e, n && Object.assign(t.options, n), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function kc(e, t, n, r) {
	let i = !1, a = Object.assign({}, r || {});
	return r && (r.filter && (a.filter = JSON.stringify(r.filter)), r.order && (a.order = JSON.stringify(r.order)), i = Object.keys(a).length), t.url + (n ? "/" + n : "") + (i ? "?" + new URLSearchParams(a).toString() : "");
}
function Ac(e, t = "-") {
	return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function jc(e) {
	let t = [];
	for (let n of e) t.push(Mc(n));
	return t;
}
function Mc(e, t = "", n = {}) {
	for (let r in e) {
		let i = t ? t + "." + r : r;
		typeof e[r] == "object" && !Array.isArray(e[r]) ? Mc(e[r], i, n) : n[i] = e[r];
	}
	return n;
}
function Nc(e) {
	let t = {};
	for (let n in e) {
		let r = n.split(".");
		r.reduce((t, i, a) => t[i] || (t[i] = isNaN(Number(r[a + 1])) ? r.length - 1 === a ? e[n] : {} : []), t);
	}
	return t;
}
function Pc(e, t, n, r) {
	let i = (e, t) => !e || !t ? e : e.replace(/{([^}]*)}/g, (e, n) => {
		let r = n.trim();
		return t[r] ? t[r] : "";
	});
	return !t || (r ||= document.documentElement.lang, !r || !t[r]) || !t[r][e] ? i(e, n) : i(t[r][e]);
}
function Fc(e, t, n = ";") {
	return [t.map((e) => e.title ? e.title : e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(n), ...e.map((r) => t.map((t) => {
		let n = r[t.name];
		return t.template ? t.template(n, r, e) : n === void 0 ? "" : n;
	}).join(n))].join("\n");
}
function Ic(e, t = "export.csv") {
	e = "﻿" + e;
	let n = new Blob([e], { type: "text/csv;charset=utf-8;" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = t, i.click(), URL.revokeObjectURL(r);
}
function Lc(e) {
	return [...new Set(e)];
}
function Rc(e, t) {
	e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function zc(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 && e.push(n.value);
}
function Bc(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 ? e.push(n.value) : e.splice(e.indexOf(n.value), 1);
}
function Vc(e) {
	e.length = 0;
}
function Hc(e, t) {
	t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Uc(e, t) {
	t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function Wc(e, t) {
	Object.keys(e).forEach((n) => {
		typeof e[n] == "function" && (e[n] = e[n](t));
	});
}
function Gc(e, t) {
	let n = 1024, r = n * 1024, i = r * 1024;
	return e < n ? e + (t ? " Byte" : "") : e < r ? (e / n).toFixed(0) + (t ? "<span class=\"text-muted fw-light\"> KB</span>" : "") : e < i ? (e / r).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> MB</span>" : "") : (e / i).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> GB</span>" : "");
}
function Kc(e) {
	return e.split(".").reverse()[0];
}
//#endregion
//#region node_modules/lodash-es/_freeGlobal.js
var qc = typeof global == "object" && global && global.Object === Object && global, Jc = typeof self == "object" && self && self.Object === Object && self, Yc = qc || Jc || Function("return this")(), Xc = Yc.Symbol, Zc = Object.prototype, Qc = Zc.hasOwnProperty, $c = Zc.toString, el = Xc ? Xc.toStringTag : void 0;
function tl(e) {
	var t = Qc.call(e, el), n = e[el];
	try {
		e[el] = void 0;
		var r = !0;
	} catch {}
	var i = $c.call(e);
	return r && (t ? e[el] = n : delete e[el]), i;
}
//#endregion
//#region node_modules/lodash-es/_objectToString.js
var nl = Object.prototype.toString;
function rl(e) {
	return nl.call(e);
}
//#endregion
//#region node_modules/lodash-es/_baseGetTag.js
var il = "[object Null]", al = "[object Undefined]", ol = Xc ? Xc.toStringTag : void 0;
function sl(e) {
	return e == null ? e === void 0 ? al : il : ol && ol in Object(e) ? tl(e) : rl(e);
}
//#endregion
//#region node_modules/lodash-es/isObjectLike.js
function cl(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region node_modules/lodash-es/isArray.js
var ll = Array.isArray;
//#endregion
//#region node_modules/lodash-es/isObject.js
function ul(e) {
	var t = typeof e;
	return e != null && (t == "object" || t == "function");
}
//#endregion
//#region node_modules/lodash-es/identity.js
function dl(e) {
	return e;
}
//#endregion
//#region node_modules/lodash-es/isFunction.js
var fl = "[object AsyncFunction]", pl = "[object Function]", ml = "[object GeneratorFunction]", hl = "[object Proxy]";
function gl(e) {
	if (!ul(e)) return !1;
	var t = sl(e);
	return t == pl || t == ml || t == fl || t == hl;
}
//#endregion
//#region node_modules/lodash-es/_coreJsData.js
var _l = Yc["__core-js_shared__"], vl = function() {
	var e = /[^.]+$/.exec(_l && _l.keys && _l.keys.IE_PROTO || "");
	return e ? "Symbol(src)_1." + e : "";
}();
function yl(e) {
	return !!vl && vl in e;
}
//#endregion
//#region node_modules/lodash-es/_toSource.js
var bl = Function.prototype.toString;
function xl(e) {
	if (e != null) {
		try {
			return bl.call(e);
		} catch {}
		try {
			return e + "";
		} catch {}
	}
	return "";
}
//#endregion
//#region node_modules/lodash-es/_baseIsNative.js
var Sl = /[\\^$.*+?()[\]{}|]/g, Cl = /^\[object .+?Constructor\]$/, wl = Function.prototype, Tl = Object.prototype, El = wl.toString, Dl = Tl.hasOwnProperty, Ol = RegExp("^" + El.call(Dl).replace(Sl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function kl(e) {
	return !ul(e) || yl(e) ? !1 : (gl(e) ? Ol : Cl).test(xl(e));
}
//#endregion
//#region node_modules/lodash-es/_getValue.js
function Al(e, t) {
	return e?.[t];
}
//#endregion
//#region node_modules/lodash-es/_getNative.js
function jl(e, t) {
	var n = Al(e, t);
	return kl(n) ? n : void 0;
}
//#endregion
//#region node_modules/lodash-es/_WeakMap.js
var Ml = jl(Yc, "WeakMap"), Nl = Object.create, Pl = function() {
	function e() {}
	return function(t) {
		if (!ul(t)) return {};
		if (Nl) return Nl(t);
		e.prototype = t;
		var n = new e();
		return e.prototype = void 0, n;
	};
}();
//#endregion
//#region node_modules/lodash-es/_apply.js
function Fl(e, t, n) {
	switch (n.length) {
		case 0: return e.call(t);
		case 1: return e.call(t, n[0]);
		case 2: return e.call(t, n[0], n[1]);
		case 3: return e.call(t, n[0], n[1], n[2]);
	}
	return e.apply(t, n);
}
//#endregion
//#region node_modules/lodash-es/_copyArray.js
function Il(e, t) {
	var n = -1, r = e.length;
	for (t ||= Array(r); ++n < r;) t[n] = e[n];
	return t;
}
//#endregion
//#region node_modules/lodash-es/_shortOut.js
var Ll = 800, Rl = 16, zl = Date.now;
function Bl(e) {
	var t = 0, n = 0;
	return function() {
		var r = zl(), i = Rl - (r - n);
		if (n = r, i > 0) {
			if (++t >= Ll) return arguments[0];
		} else t = 0;
		return e.apply(void 0, arguments);
	};
}
//#endregion
//#region node_modules/lodash-es/constant.js
function Vl(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/lodash-es/_defineProperty.js
var Hl = function() {
	try {
		var e = jl(Object, "defineProperty");
		return e({}, "", {}), e;
	} catch {}
}(), Ul = Bl(Hl ? function(e, t) {
	return Hl(e, "toString", {
		configurable: !0,
		enumerable: !1,
		value: Vl(t),
		writable: !0
	});
} : dl);
//#endregion
//#region node_modules/lodash-es/_arrayEach.js
function Wl(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1;);
	return e;
}
//#endregion
//#region node_modules/lodash-es/_isIndex.js
var Gl = 9007199254740991, Kl = /^(?:0|[1-9]\d*)$/;
function ql(e, t) {
	var n = typeof e;
	return t ??= Gl, !!t && (n == "number" || n != "symbol" && Kl.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
//#endregion
//#region node_modules/lodash-es/_baseAssignValue.js
function Jl(e, t, n) {
	t == "__proto__" && Hl ? Hl(e, t, {
		configurable: !0,
		enumerable: !0,
		value: n,
		writable: !0
	}) : e[t] = n;
}
//#endregion
//#region node_modules/lodash-es/eq.js
function Yl(e, t) {
	return e === t || e !== e && t !== t;
}
//#endregion
//#region node_modules/lodash-es/_assignValue.js
var Xl = Object.prototype.hasOwnProperty;
function Zl(e, t, n) {
	var r = e[t];
	(!(Xl.call(e, t) && Yl(r, n)) || n === void 0 && !(t in e)) && Jl(e, t, n);
}
//#endregion
//#region node_modules/lodash-es/_copyObject.js
function Ql(e, t, n, r) {
	var i = !n;
	n ||= {};
	for (var a = -1, o = t.length; ++a < o;) {
		var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
		c === void 0 && (c = e[s]), i ? Jl(n, s, c) : Zl(n, s, c);
	}
	return n;
}
//#endregion
//#region node_modules/lodash-es/_overRest.js
var $l = Math.max;
function eu(e, t, n) {
	return t = $l(t === void 0 ? e.length - 1 : t, 0), function() {
		for (var r = arguments, i = -1, a = $l(r.length - t, 0), o = Array(a); ++i < a;) o[i] = r[t + i];
		i = -1;
		for (var s = Array(t + 1); ++i < t;) s[i] = r[i];
		return s[t] = n(o), Fl(e, this, s);
	};
}
//#endregion
//#region node_modules/lodash-es/_baseRest.js
function tu(e, t) {
	return Ul(eu(e, t, dl), e + "");
}
//#endregion
//#region node_modules/lodash-es/isLength.js
var nu = 9007199254740991;
function ru(e) {
	return typeof e == "number" && e > -1 && e % 1 == 0 && e <= nu;
}
//#endregion
//#region node_modules/lodash-es/isArrayLike.js
function iu(e) {
	return e != null && ru(e.length) && !gl(e);
}
//#endregion
//#region node_modules/lodash-es/_isIterateeCall.js
function au(e, t, n) {
	if (!ul(n)) return !1;
	var r = typeof t;
	return (r == "number" ? iu(n) && ql(t, n.length) : r == "string" && t in n) ? Yl(n[t], e) : !1;
}
//#endregion
//#region node_modules/lodash-es/_createAssigner.js
function ou(e) {
	return tu(function(t, n) {
		var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
		for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && au(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i;) {
			var s = n[r];
			s && e(t, s, r, a);
		}
		return t;
	});
}
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
var su = Object.prototype;
function cu(e) {
	var t = e && e.constructor;
	return e === (typeof t == "function" && t.prototype || su);
}
//#endregion
//#region node_modules/lodash-es/_baseTimes.js
function lu(e, t) {
	for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
	return r;
}
//#endregion
//#region node_modules/lodash-es/_baseIsArguments.js
var uu = "[object Arguments]";
function du(e) {
	return cl(e) && sl(e) == uu;
}
//#endregion
//#region node_modules/lodash-es/isArguments.js
var fu = Object.prototype, pu = fu.hasOwnProperty, mu = fu.propertyIsEnumerable, hu = du(function() {
	return arguments;
}()) ? du : function(e) {
	return cl(e) && pu.call(e, "callee") && !mu.call(e, "callee");
};
//#endregion
//#region node_modules/lodash-es/stubFalse.js
function gu() {
	return !1;
}
//#endregion
//#region node_modules/lodash-es/isBuffer.js
var _u = typeof exports == "object" && exports && !exports.nodeType && exports, vu = _u && typeof module == "object" && module && !module.nodeType && module, yu = vu && vu.exports === _u ? Yc.Buffer : void 0, bu = (yu ? yu.isBuffer : void 0) || gu, xu = "[object Arguments]", Su = "[object Array]", Cu = "[object Boolean]", wu = "[object Date]", Tu = "[object Error]", Eu = "[object Function]", Du = "[object Map]", Ou = "[object Number]", ku = "[object Object]", Au = "[object RegExp]", ju = "[object Set]", Mu = "[object String]", Nu = "[object WeakMap]", Pu = "[object ArrayBuffer]", Fu = "[object DataView]", Iu = "[object Float32Array]", Lu = "[object Float64Array]", Ru = "[object Int8Array]", zu = "[object Int16Array]", Bu = "[object Int32Array]", Vu = "[object Uint8Array]", Hu = "[object Uint8ClampedArray]", Uu = "[object Uint16Array]", Wu = "[object Uint32Array]", J = {};
J[Iu] = J[Lu] = J[Ru] = J[zu] = J[Bu] = J[Vu] = J[Hu] = J[Uu] = J[Wu] = !0, J[xu] = J[Su] = J[Pu] = J[Cu] = J[Fu] = J[wu] = J[Tu] = J[Eu] = J[Du] = J[Ou] = J[ku] = J[Au] = J[ju] = J[Mu] = J[Nu] = !1;
function Gu(e) {
	return cl(e) && ru(e.length) && !!J[sl(e)];
}
//#endregion
//#region node_modules/lodash-es/_baseUnary.js
function Ku(e) {
	return function(t) {
		return e(t);
	};
}
//#endregion
//#region node_modules/lodash-es/_nodeUtil.js
var qu = typeof exports == "object" && exports && !exports.nodeType && exports, Ju = qu && typeof module == "object" && module && !module.nodeType && module, Yu = Ju && Ju.exports === qu && qc.process, Xu = function() {
	try {
		return Ju && Ju.require && Ju.require("util").types || Yu && Yu.binding && Yu.binding("util");
	} catch {}
}(), Zu = Xu && Xu.isTypedArray, Qu = Zu ? Ku(Zu) : Gu, $u = Object.prototype.hasOwnProperty;
function ed(e, t) {
	var n = ll(e), r = !n && hu(e), i = !n && !r && bu(e), a = !n && !r && !i && Qu(e), o = n || r || i || a, s = o ? lu(e.length, String) : [], c = s.length;
	for (var l in e) (t || $u.call(e, l)) && !(o && (l == "length" || i && (l == "offset" || l == "parent") || a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || ql(l, c))) && s.push(l);
	return s;
}
//#endregion
//#region node_modules/lodash-es/_overArg.js
function td(e, t) {
	return function(n) {
		return e(t(n));
	};
}
//#endregion
//#region node_modules/lodash-es/_nativeKeys.js
var nd = td(Object.keys, Object), rd = Object.prototype.hasOwnProperty;
function id(e) {
	if (!cu(e)) return nd(e);
	var t = [];
	for (var n in Object(e)) rd.call(e, n) && n != "constructor" && t.push(n);
	return t;
}
//#endregion
//#region node_modules/lodash-es/keys.js
function ad(e) {
	return iu(e) ? ed(e) : id(e);
}
//#endregion
//#region node_modules/lodash-es/_nativeKeysIn.js
function od(e) {
	var t = [];
	if (e != null) for (var n in Object(e)) t.push(n);
	return t;
}
//#endregion
//#region node_modules/lodash-es/_baseKeysIn.js
var sd = Object.prototype.hasOwnProperty;
function cd(e) {
	if (!ul(e)) return od(e);
	var t = cu(e), n = [];
	for (var r in e) r == "constructor" && (t || !sd.call(e, r)) || n.push(r);
	return n;
}
//#endregion
//#region node_modules/lodash-es/keysIn.js
function ld(e) {
	return iu(e) ? ed(e, !0) : cd(e);
}
//#endregion
//#region node_modules/lodash-es/_nativeCreate.js
var ud = jl(Object, "create");
//#endregion
//#region node_modules/lodash-es/_hashClear.js
function dd() {
	this.__data__ = ud ? ud(null) : {}, this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_hashDelete.js
function fd(e) {
	var t = this.has(e) && delete this.__data__[e];
	return this.size -= +!!t, t;
}
//#endregion
//#region node_modules/lodash-es/_hashGet.js
var pd = "__lodash_hash_undefined__", md = Object.prototype.hasOwnProperty;
function hd(e) {
	var t = this.__data__;
	if (ud) {
		var n = t[e];
		return n === pd ? void 0 : n;
	}
	return md.call(t, e) ? t[e] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_hashHas.js
var gd = Object.prototype.hasOwnProperty;
function _d(e) {
	var t = this.__data__;
	return ud ? t[e] !== void 0 : gd.call(t, e);
}
//#endregion
//#region node_modules/lodash-es/_hashSet.js
var vd = "__lodash_hash_undefined__";
function yd(e, t) {
	var n = this.__data__;
	return this.size += +!this.has(e), n[e] = ud && t === void 0 ? vd : t, this;
}
//#endregion
//#region node_modules/lodash-es/_Hash.js
function bd(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
bd.prototype.clear = dd, bd.prototype.delete = fd, bd.prototype.get = hd, bd.prototype.has = _d, bd.prototype.set = yd;
//#endregion
//#region node_modules/lodash-es/_listCacheClear.js
function xd() {
	this.__data__ = [], this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_assocIndexOf.js
function Sd(e, t) {
	for (var n = e.length; n--;) if (Yl(e[n][0], t)) return n;
	return -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheDelete.js
var Cd = Array.prototype.splice;
function wd(e) {
	var t = this.__data__, n = Sd(t, e);
	return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : Cd.call(t, n, 1), --this.size, !0);
}
//#endregion
//#region node_modules/lodash-es/_listCacheGet.js
function Td(e) {
	var t = this.__data__, n = Sd(t, e);
	return n < 0 ? void 0 : t[n][1];
}
//#endregion
//#region node_modules/lodash-es/_listCacheHas.js
function Ed(e) {
	return Sd(this.__data__, e) > -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheSet.js
function Dd(e, t) {
	var n = this.__data__, r = Sd(n, e);
	return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
//#endregion
//#region node_modules/lodash-es/_ListCache.js
function Od(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
Od.prototype.clear = xd, Od.prototype.delete = wd, Od.prototype.get = Td, Od.prototype.has = Ed, Od.prototype.set = Dd;
//#endregion
//#region node_modules/lodash-es/_Map.js
var kd = jl(Yc, "Map");
//#endregion
//#region node_modules/lodash-es/_mapCacheClear.js
function Ad() {
	this.size = 0, this.__data__ = {
		hash: new bd(),
		map: new (kd || Od)(),
		string: new bd()
	};
}
//#endregion
//#region node_modules/lodash-es/_isKeyable.js
function jd(e) {
	var t = typeof e;
	return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
//#endregion
//#region node_modules/lodash-es/_getMapData.js
function Md(e, t) {
	var n = e.__data__;
	return jd(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheDelete.js
function Nd(e) {
	var t = Md(this, e).delete(e);
	return this.size -= +!!t, t;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheGet.js
function Pd(e) {
	return Md(this, e).get(e);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheHas.js
function Fd(e) {
	return Md(this, e).has(e);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheSet.js
function Id(e, t) {
	var n = Md(this, e), r = n.size;
	return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
//#endregion
//#region node_modules/lodash-es/_MapCache.js
function Ld(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
Ld.prototype.clear = Ad, Ld.prototype.delete = Nd, Ld.prototype.get = Pd, Ld.prototype.has = Fd, Ld.prototype.set = Id;
//#endregion
//#region node_modules/lodash-es/_arrayPush.js
function Rd(e, t) {
	for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
	return e;
}
//#endregion
//#region node_modules/lodash-es/_getPrototype.js
var zd = td(Object.getPrototypeOf, Object), Bd = "[object Object]", Vd = Function.prototype, Hd = Object.prototype, Ud = Vd.toString, Wd = Hd.hasOwnProperty, Gd = Ud.call(Object);
function Kd(e) {
	if (!cl(e) || sl(e) != Bd) return !1;
	var t = zd(e);
	if (t === null) return !0;
	var n = Wd.call(t, "constructor") && t.constructor;
	return typeof n == "function" && n instanceof n && Ud.call(n) == Gd;
}
//#endregion
//#region node_modules/lodash-es/_stackClear.js
function qd() {
	this.__data__ = new Od(), this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_stackDelete.js
function Jd(e) {
	var t = this.__data__, n = t.delete(e);
	return this.size = t.size, n;
}
//#endregion
//#region node_modules/lodash-es/_stackGet.js
function Yd(e) {
	return this.__data__.get(e);
}
//#endregion
//#region node_modules/lodash-es/_stackHas.js
function Xd(e) {
	return this.__data__.has(e);
}
//#endregion
//#region node_modules/lodash-es/_stackSet.js
var Zd = 200;
function Qd(e, t) {
	var n = this.__data__;
	if (n instanceof Od) {
		var r = n.__data__;
		if (!kd || r.length < Zd - 1) return r.push([e, t]), this.size = ++n.size, this;
		n = this.__data__ = new Ld(r);
	}
	return n.set(e, t), this.size = n.size, this;
}
//#endregion
//#region node_modules/lodash-es/_Stack.js
function $d(e) {
	var t = this.__data__ = new Od(e);
	this.size = t.size;
}
$d.prototype.clear = qd, $d.prototype.delete = Jd, $d.prototype.get = Yd, $d.prototype.has = Xd, $d.prototype.set = Qd;
//#endregion
//#region node_modules/lodash-es/_baseAssign.js
function ef(e, t) {
	return e && Ql(t, ad(t), e);
}
//#endregion
//#region node_modules/lodash-es/_baseAssignIn.js
function tf(e, t) {
	return e && Ql(t, ld(t), e);
}
//#endregion
//#region node_modules/lodash-es/_cloneBuffer.js
var nf = typeof exports == "object" && exports && !exports.nodeType && exports, rf = nf && typeof module == "object" && module && !module.nodeType && module, af = rf && rf.exports === nf ? Yc.Buffer : void 0, of = af ? af.allocUnsafe : void 0;
function sf(e, t) {
	if (t) return e.slice();
	var n = e.length, r = of ? of(n) : new e.constructor(n);
	return e.copy(r), r;
}
//#endregion
//#region node_modules/lodash-es/_arrayFilter.js
function cf(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
		var o = e[n];
		t(o, n, e) && (a[i++] = o);
	}
	return a;
}
//#endregion
//#region node_modules/lodash-es/stubArray.js
function lf() {
	return [];
}
//#endregion
//#region node_modules/lodash-es/_getSymbols.js
var uf = Object.prototype.propertyIsEnumerable, df = Object.getOwnPropertySymbols, ff = df ? function(e) {
	return e == null ? [] : (e = Object(e), cf(df(e), function(t) {
		return uf.call(e, t);
	}));
} : lf;
//#endregion
//#region node_modules/lodash-es/_copySymbols.js
function pf(e, t) {
	return Ql(e, ff(e), t);
}
//#endregion
//#region node_modules/lodash-es/_getSymbolsIn.js
var mf = Object.getOwnPropertySymbols ? function(e) {
	for (var t = []; e;) Rd(t, ff(e)), e = zd(e);
	return t;
} : lf;
//#endregion
//#region node_modules/lodash-es/_copySymbolsIn.js
function hf(e, t) {
	return Ql(e, mf(e), t);
}
//#endregion
//#region node_modules/lodash-es/_baseGetAllKeys.js
function gf(e, t, n) {
	var r = t(e);
	return ll(e) ? r : Rd(r, n(e));
}
//#endregion
//#region node_modules/lodash-es/_getAllKeys.js
function _f(e) {
	return gf(e, ad, ff);
}
//#endregion
//#region node_modules/lodash-es/_getAllKeysIn.js
function vf(e) {
	return gf(e, ld, mf);
}
//#endregion
//#region node_modules/lodash-es/_DataView.js
var yf = jl(Yc, "DataView"), bf = jl(Yc, "Promise"), xf = jl(Yc, "Set"), Sf = "[object Map]", Cf = "[object Object]", wf = "[object Promise]", Tf = "[object Set]", Ef = "[object WeakMap]", Df = "[object DataView]", Of = xl(yf), kf = xl(kd), Af = xl(bf), jf = xl(xf), Mf = xl(Ml), Nf = sl;
(yf && Nf(new yf(/* @__PURE__ */ new ArrayBuffer(1))) != Df || kd && Nf(new kd()) != Sf || bf && Nf(bf.resolve()) != wf || xf && Nf(new xf()) != Tf || Ml && Nf(new Ml()) != Ef) && (Nf = function(e) {
	var t = sl(e), n = t == Cf ? e.constructor : void 0, r = n ? xl(n) : "";
	if (r) switch (r) {
		case Of: return Df;
		case kf: return Sf;
		case Af: return wf;
		case jf: return Tf;
		case Mf: return Ef;
	}
	return t;
});
var Pf = Nf, Ff = Object.prototype.hasOwnProperty;
function If(e) {
	var t = e.length, n = new e.constructor(t);
	return t && typeof e[0] == "string" && Ff.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
//#endregion
//#region node_modules/lodash-es/_Uint8Array.js
var Lf = Yc.Uint8Array;
//#endregion
//#region node_modules/lodash-es/_cloneArrayBuffer.js
function Rf(e) {
	var t = new e.constructor(e.byteLength);
	return new Lf(t).set(new Lf(e)), t;
}
//#endregion
//#region node_modules/lodash-es/_cloneDataView.js
function zf(e, t) {
	var n = t ? Rf(e.buffer) : e.buffer;
	return new e.constructor(n, e.byteOffset, e.byteLength);
}
//#endregion
//#region node_modules/lodash-es/_cloneRegExp.js
var Bf = /\w*$/;
function Vf(e) {
	var t = new e.constructor(e.source, Bf.exec(e));
	return t.lastIndex = e.lastIndex, t;
}
//#endregion
//#region node_modules/lodash-es/_cloneSymbol.js
var Hf = Xc ? Xc.prototype : void 0, Uf = Hf ? Hf.valueOf : void 0;
function Wf(e) {
	return Uf ? Object(Uf.call(e)) : {};
}
//#endregion
//#region node_modules/lodash-es/_cloneTypedArray.js
function Gf(e, t) {
	var n = t ? Rf(e.buffer) : e.buffer;
	return new e.constructor(n, e.byteOffset, e.length);
}
//#endregion
//#region node_modules/lodash-es/_initCloneByTag.js
var Kf = "[object Boolean]", qf = "[object Date]", Jf = "[object Map]", Yf = "[object Number]", Xf = "[object RegExp]", Zf = "[object Set]", Qf = "[object String]", $f = "[object Symbol]", ep = "[object ArrayBuffer]", tp = "[object DataView]", np = "[object Float32Array]", rp = "[object Float64Array]", ip = "[object Int8Array]", ap = "[object Int16Array]", op = "[object Int32Array]", sp = "[object Uint8Array]", cp = "[object Uint8ClampedArray]", lp = "[object Uint16Array]", up = "[object Uint32Array]";
function dp(e, t, n) {
	var r = e.constructor;
	switch (t) {
		case ep: return Rf(e);
		case Kf:
		case qf: return new r(+e);
		case tp: return zf(e, n);
		case np:
		case rp:
		case ip:
		case ap:
		case op:
		case sp:
		case cp:
		case lp:
		case up: return Gf(e, n);
		case Jf: return new r();
		case Yf:
		case Qf: return new r(e);
		case Xf: return Vf(e);
		case Zf: return new r();
		case $f: return Wf(e);
	}
}
//#endregion
//#region node_modules/lodash-es/_initCloneObject.js
function fp(e) {
	return typeof e.constructor == "function" && !cu(e) ? Pl(zd(e)) : {};
}
//#endregion
//#region node_modules/lodash-es/_baseIsMap.js
var pp = "[object Map]";
function mp(e) {
	return cl(e) && Pf(e) == pp;
}
//#endregion
//#region node_modules/lodash-es/isMap.js
var hp = Xu && Xu.isMap, gp = hp ? Ku(hp) : mp, _p = "[object Set]";
function vp(e) {
	return cl(e) && Pf(e) == _p;
}
//#endregion
//#region node_modules/lodash-es/isSet.js
var yp = Xu && Xu.isSet, bp = yp ? Ku(yp) : vp, xp = 1, Sp = 2, Cp = 4, wp = "[object Arguments]", Tp = "[object Array]", Ep = "[object Boolean]", Dp = "[object Date]", Op = "[object Error]", kp = "[object Function]", Ap = "[object GeneratorFunction]", jp = "[object Map]", Mp = "[object Number]", Np = "[object Object]", Pp = "[object RegExp]", Fp = "[object Set]", Ip = "[object String]", Lp = "[object Symbol]", Rp = "[object WeakMap]", zp = "[object ArrayBuffer]", Bp = "[object DataView]", Vp = "[object Float32Array]", Hp = "[object Float64Array]", Up = "[object Int8Array]", Wp = "[object Int16Array]", Gp = "[object Int32Array]", Kp = "[object Uint8Array]", qp = "[object Uint8ClampedArray]", Jp = "[object Uint16Array]", Yp = "[object Uint32Array]", Y = {};
Y[wp] = Y[Tp] = Y[zp] = Y[Bp] = Y[Ep] = Y[Dp] = Y[Vp] = Y[Hp] = Y[Up] = Y[Wp] = Y[Gp] = Y[jp] = Y[Mp] = Y[Np] = Y[Pp] = Y[Fp] = Y[Ip] = Y[Lp] = Y[Kp] = Y[qp] = Y[Jp] = Y[Yp] = !0, Y[Op] = Y[kp] = Y[Rp] = !1;
function Xp(e, t, n, r, i, a) {
	var o, s = t & xp, c = t & Sp, l = t & Cp;
	if (n && (o = i ? n(e, r, i, a) : n(e)), o !== void 0) return o;
	if (!ul(e)) return e;
	var u = ll(e);
	if (u) {
		if (o = If(e), !s) return Il(e, o);
	} else {
		var d = Pf(e), f = d == kp || d == Ap;
		if (bu(e)) return sf(e, s);
		if (d == Np || d == wp || f && !i) {
			if (o = c || f ? {} : fp(e), !s) return c ? hf(e, tf(o, e)) : pf(e, ef(o, e));
		} else {
			if (!Y[d]) return i ? e : {};
			o = dp(e, d, s);
		}
	}
	a ||= new $d();
	var p = a.get(e);
	if (p) return p;
	a.set(e, o), bp(e) ? e.forEach(function(r) {
		o.add(Xp(r, t, n, r, e, a));
	}) : gp(e) && e.forEach(function(r, i) {
		o.set(i, Xp(r, t, n, i, e, a));
	});
	var m = u ? void 0 : (l ? c ? vf : _f : c ? ld : ad)(e);
	return Wl(m || e, function(r, i) {
		m && (i = r, r = e[i]), Zl(o, i, Xp(r, t, n, i, e, a));
	}), o;
}
//#endregion
//#region node_modules/lodash-es/cloneDeep.js
var Zp = 1, Qp = 4;
function $p(e) {
	return Xp(e, Zp | Qp);
}
//#endregion
//#region node_modules/lodash-es/_setCacheAdd.js
var em = "__lodash_hash_undefined__";
function tm(e) {
	return this.__data__.set(e, em), this;
}
//#endregion
//#region node_modules/lodash-es/_setCacheHas.js
function nm(e) {
	return this.__data__.has(e);
}
//#endregion
//#region node_modules/lodash-es/_SetCache.js
function rm(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.__data__ = new Ld(); ++t < n;) this.add(e[t]);
}
rm.prototype.add = rm.prototype.push = tm, rm.prototype.has = nm;
//#endregion
//#region node_modules/lodash-es/_arraySome.js
function im(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
	return !1;
}
//#endregion
//#region node_modules/lodash-es/_cacheHas.js
function am(e, t) {
	return e.has(t);
}
//#endregion
//#region node_modules/lodash-es/_equalArrays.js
var om = 1, sm = 2;
function cm(e, t, n, r, i, a) {
	var o = n & om, s = e.length, c = t.length;
	if (s != c && !(o && c > s)) return !1;
	var l = a.get(e), u = a.get(t);
	if (l && u) return l == t && u == e;
	var d = -1, f = !0, p = n & sm ? new rm() : void 0;
	for (a.set(e, t), a.set(t, e); ++d < s;) {
		var m = e[d], h = t[d];
		if (r) var g = o ? r(h, m, d, t, e, a) : r(m, h, d, e, t, a);
		if (g !== void 0) {
			if (g) continue;
			f = !1;
			break;
		}
		if (p) {
			if (!im(t, function(e, t) {
				if (!am(p, t) && (m === e || i(m, e, n, r, a))) return p.push(t);
			})) {
				f = !1;
				break;
			}
		} else if (!(m === h || i(m, h, n, r, a))) {
			f = !1;
			break;
		}
	}
	return a.delete(e), a.delete(t), f;
}
//#endregion
//#region node_modules/lodash-es/_mapToArray.js
function lm(e) {
	var t = -1, n = Array(e.size);
	return e.forEach(function(e, r) {
		n[++t] = [r, e];
	}), n;
}
//#endregion
//#region node_modules/lodash-es/_setToArray.js
function um(e) {
	var t = -1, n = Array(e.size);
	return e.forEach(function(e) {
		n[++t] = e;
	}), n;
}
//#endregion
//#region node_modules/lodash-es/_equalByTag.js
var dm = 1, fm = 2, pm = "[object Boolean]", mm = "[object Date]", hm = "[object Error]", gm = "[object Map]", _m = "[object Number]", vm = "[object RegExp]", ym = "[object Set]", bm = "[object String]", xm = "[object Symbol]", Sm = "[object ArrayBuffer]", Cm = "[object DataView]", wm = Xc ? Xc.prototype : void 0, Tm = wm ? wm.valueOf : void 0;
function Em(e, t, n, r, i, a, o) {
	switch (n) {
		case Cm:
			if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
			e = e.buffer, t = t.buffer;
		case Sm: return !(e.byteLength != t.byteLength || !a(new Lf(e), new Lf(t)));
		case pm:
		case mm:
		case _m: return Yl(+e, +t);
		case hm: return e.name == t.name && e.message == t.message;
		case vm:
		case bm: return e == t + "";
		case gm: var s = lm;
		case ym:
			var c = r & dm;
			if (s ||= um, e.size != t.size && !c) return !1;
			var l = o.get(e);
			if (l) return l == t;
			r |= fm, o.set(e, t);
			var u = cm(s(e), s(t), r, i, a, o);
			return o.delete(e), u;
		case xm: if (Tm) return Tm.call(e) == Tm.call(t);
	}
	return !1;
}
//#endregion
//#region node_modules/lodash-es/_equalObjects.js
var Dm = 1, Om = Object.prototype.hasOwnProperty;
function km(e, t, n, r, i, a) {
	var o = n & Dm, s = _f(e), c = s.length;
	if (c != _f(t).length && !o) return !1;
	for (var l = c; l--;) {
		var u = s[l];
		if (!(o ? u in t : Om.call(t, u))) return !1;
	}
	var d = a.get(e), f = a.get(t);
	if (d && f) return d == t && f == e;
	var p = !0;
	a.set(e, t), a.set(t, e);
	for (var m = o; ++l < c;) {
		u = s[l];
		var h = e[u], g = t[u];
		if (r) var _ = o ? r(g, h, u, t, e, a) : r(h, g, u, e, t, a);
		if (!(_ === void 0 ? h === g || i(h, g, n, r, a) : _)) {
			p = !1;
			break;
		}
		m ||= u == "constructor";
	}
	if (p && !m) {
		var v = e.constructor, y = t.constructor;
		v != y && "constructor" in e && "constructor" in t && !(typeof v == "function" && v instanceof v && typeof y == "function" && y instanceof y) && (p = !1);
	}
	return a.delete(e), a.delete(t), p;
}
//#endregion
//#region node_modules/lodash-es/_baseIsEqualDeep.js
var Am = 1, jm = "[object Arguments]", Mm = "[object Array]", Nm = "[object Object]", Pm = Object.prototype.hasOwnProperty;
function Fm(e, t, n, r, i, a) {
	var o = ll(e), s = ll(t), c = o ? Mm : Pf(e), l = s ? Mm : Pf(t);
	c = c == jm ? Nm : c, l = l == jm ? Nm : l;
	var u = c == Nm, d = l == Nm, f = c == l;
	if (f && bu(e)) {
		if (!bu(t)) return !1;
		o = !0, u = !1;
	}
	if (f && !u) return a ||= new $d(), o || Qu(e) ? cm(e, t, n, r, i, a) : Em(e, t, c, n, r, i, a);
	if (!(n & Am)) {
		var p = u && Pm.call(e, "__wrapped__"), m = d && Pm.call(t, "__wrapped__");
		if (p || m) {
			var h = p ? e.value() : e, g = m ? t.value() : t;
			return a ||= new $d(), i(h, g, n, r, a);
		}
	}
	return f ? (a ||= new $d(), km(e, t, n, r, i, a)) : !1;
}
//#endregion
//#region node_modules/lodash-es/_baseIsEqual.js
function Im(e, t, n, r, i) {
	return e === t ? !0 : e == null || t == null || !cl(e) && !cl(t) ? e !== e && t !== t : Fm(e, t, n, r, Im, i);
}
//#endregion
//#region node_modules/lodash-es/_createBaseFor.js
function Lm(e) {
	return function(t, n, r) {
		for (var i = -1, a = Object(t), o = r(t), s = o.length; s--;) {
			var c = o[e ? s : ++i];
			if (n(a[c], c, a) === !1) break;
		}
		return t;
	};
}
//#endregion
//#region node_modules/lodash-es/_baseFor.js
var Rm = Lm();
//#endregion
//#region node_modules/lodash-es/_assignMergeValue.js
function zm(e, t, n) {
	(n !== void 0 && !Yl(e[t], n) || n === void 0 && !(t in e)) && Jl(e, t, n);
}
//#endregion
//#region node_modules/lodash-es/isArrayLikeObject.js
function Bm(e) {
	return cl(e) && iu(e);
}
//#endregion
//#region node_modules/lodash-es/_safeGet.js
function Vm(e, t) {
	if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__") return e[t];
}
//#endregion
//#region node_modules/lodash-es/toPlainObject.js
function Hm(e) {
	return Ql(e, ld(e));
}
//#endregion
//#region node_modules/lodash-es/_baseMergeDeep.js
function Um(e, t, n, r, i, a, o) {
	var s = Vm(e, n), c = Vm(t, n), l = o.get(c);
	if (l) {
		zm(e, n, l);
		return;
	}
	var u = a ? a(s, c, n + "", e, t, o) : void 0, d = u === void 0;
	if (d) {
		var f = ll(c), p = !f && bu(c), m = !f && !p && Qu(c);
		u = c, f || p || m ? ll(s) ? u = s : Bm(s) ? u = Il(s) : p ? (d = !1, u = sf(c, !0)) : m ? (d = !1, u = Gf(c, !0)) : u = [] : Kd(c) || hu(c) ? (u = s, hu(s) ? u = Hm(s) : (!ul(s) || gl(s)) && (u = fp(c))) : d = !1;
	}
	d && (o.set(c, u), i(u, c, r, a, o), o.delete(c)), zm(e, n, u);
}
//#endregion
//#region node_modules/lodash-es/_baseMerge.js
function Wm(e, t, n, r, i) {
	e !== t && Rm(t, function(a, o) {
		if (i ||= new $d(), ul(a)) Um(e, t, o, n, Wm, r, i);
		else {
			var s = r ? r(Vm(e, o), a, o + "", e, t, i) : void 0;
			s === void 0 && (s = a), zm(e, o, s);
		}
	}, ld);
}
//#endregion
//#region node_modules/lodash-es/isEqual.js
function Gm(e, t) {
	return Im(e, t);
}
//#endregion
//#region node_modules/lodash-es/merge.js
var Km = ou(function(e, t, n) {
	Wm(e, t, n);
}), qm = /* @__PURE__ */ ee({
	Attributor: () => Jm,
	AttributorStore: () => nh,
	BlockBlot: () => hh,
	ClassAttributor: () => $m,
	ContainerBlot: () => _h,
	EmbedBlot: () => vh,
	InlineBlot: () => ph,
	LeafBlot: () => oh,
	ParentBlot: () => uh,
	Registry: () => Zm,
	Scope: () => X,
	ScrollBlot: () => Sh,
	StyleAttributor: () => th,
	TextBlot: () => wh
}), X = /* @__PURE__ */ ((e) => (e[e.TYPE = 3] = "TYPE", e[e.LEVEL = 12] = "LEVEL", e[e.ATTRIBUTE = 13] = "ATTRIBUTE", e[e.BLOT = 14] = "BLOT", e[e.INLINE = 7] = "INLINE", e[e.BLOCK = 11] = "BLOCK", e[e.BLOCK_BLOT = 10] = "BLOCK_BLOT", e[e.INLINE_BLOT = 6] = "INLINE_BLOT", e[e.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", e[e.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", e[e.ANY = 15] = "ANY", e))(X || {}), Jm = class {
	constructor(e, t, n = {}) {
		this.attrName = e, this.keyName = t;
		let r = X.TYPE & X.ATTRIBUTE;
		this.scope = n.scope == null ? X.ATTRIBUTE : n.scope & X.LEVEL | r, n.whitelist != null && (this.whitelist = n.whitelist);
	}
	static keys(e) {
		return Array.from(e.attributes).map((e) => e.name);
	}
	add(e, t) {
		return this.canAdd(e, t) ? (e.setAttribute(this.keyName, t), !0) : !1;
	}
	canAdd(e, t) {
		return this.whitelist == null ? !0 : typeof t == "string" ? this.whitelist.indexOf(t.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(t) > -1;
	}
	remove(e) {
		e.removeAttribute(this.keyName);
	}
	value(e) {
		let t = e.getAttribute(this.keyName);
		return this.canAdd(e, t) && t ? t : "";
	}
}, Ym = class extends Error {
	constructor(e) {
		e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
	}
}, Xm = class e {
	constructor() {
		this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
	}
	static find(e, t = !1) {
		if (e == null) return null;
		if (this.blots.has(e)) return this.blots.get(e) || null;
		if (t) {
			let n = null;
			try {
				n = e.parentNode;
			} catch {
				return null;
			}
			return this.find(n, t);
		}
		return null;
	}
	create(t, n, r) {
		let i = this.query(n);
		if (i == null) throw new Ym(`Unable to create ${n} blot`);
		let a = i, o = new a(t, n instanceof Node || n.nodeType === Node.TEXT_NODE ? n : a.create(r), r);
		return e.blots.set(o.domNode, o), o;
	}
	find(t, n = !1) {
		return e.find(t, n);
	}
	query(e, t = X.ANY) {
		let n;
		return typeof e == "string" ? n = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof e == "number" ? e & X.LEVEL & X.BLOCK ? n = this.types.block : e & X.LEVEL & X.INLINE && (n = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((e) => (n = this.classes[e], !!n)), n ||= this.tags[e.tagName]), n == null ? null : "scope" in n && t & X.LEVEL & n.scope && t & X.TYPE & n.scope ? n : null;
	}
	register(...e) {
		return e.map((e) => {
			let t = "blotName" in e, n = "attrName" in e;
			if (!t && !n) throw new Ym("Invalid definition");
			if (t && e.blotName === "abstract") throw new Ym("Cannot register abstract class");
			let r = t ? e.blotName : n ? e.attrName : void 0;
			return this.types[r] = e, n ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : t && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((e) => e.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((t) => {
				(this.tags[t] == null || e.className == null) && (this.tags[t] = e);
			}))), e;
		});
	}
};
Xm.blots = /* @__PURE__ */ new WeakMap();
var Zm = Xm;
function Qm(e, t) {
	return (e.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
var $m = class extends Jm {
	static keys(e) {
		return (e.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
	}
	add(e, t) {
		return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
	}
	remove(e) {
		Qm(e, this.keyName).forEach((t) => {
			e.classList.remove(t);
		}), e.classList.length === 0 && e.removeAttribute("class");
	}
	value(e) {
		let t = (Qm(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
		return this.canAdd(e, t) ? t : "";
	}
};
function eh(e) {
	let t = e.split("-"), n = t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
	return t[0] + n;
}
var th = class extends Jm {
	static keys(e) {
		return (e.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
	}
	add(e, t) {
		return this.canAdd(e, t) ? (e.style[eh(this.keyName)] = t, !0) : !1;
	}
	remove(e) {
		e.style[eh(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
	}
	value(e) {
		let t = e.style[eh(this.keyName)];
		return this.canAdd(e, t) ? t : "";
	}
}, nh = class {
	constructor(e) {
		this.attributes = {}, this.domNode = e, this.build();
	}
	attribute(e, t) {
		t ? e.add(this.domNode, t) && (e.value(this.domNode) == null ? delete this.attributes[e.attrName] : this.attributes[e.attrName] = e) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
	}
	build() {
		this.attributes = {};
		let e = Zm.find(this.domNode);
		if (e == null) return;
		let t = Jm.keys(this.domNode), n = $m.keys(this.domNode), r = th.keys(this.domNode);
		t.concat(n).concat(r).forEach((t) => {
			let n = e.scroll.query(t, X.ATTRIBUTE);
			n instanceof Jm && (this.attributes[n.attrName] = n);
		});
	}
	copy(e) {
		Object.keys(this.attributes).forEach((t) => {
			let n = this.attributes[t].value(this.domNode);
			e.format(t, n);
		});
	}
	move(e) {
		this.copy(e), Object.keys(this.attributes).forEach((e) => {
			this.attributes[e].remove(this.domNode);
		}), this.attributes = {};
	}
	values() {
		return Object.keys(this.attributes).reduce((e, t) => (e[t] = this.attributes[t].value(this.domNode), e), {});
	}
}, rh = class {
	constructor(e, t) {
		this.scroll = e, this.domNode = t, Zm.blots.set(t, this), this.prev = null, this.next = null;
	}
	static create(e) {
		if (this.tagName == null) throw new Ym("Blot definition missing tagName");
		let t, n;
		return Array.isArray(this.tagName) ? (typeof e == "string" ? (n = e.toUpperCase(), parseInt(n, 10).toString() === n && (n = parseInt(n, 10))) : typeof e == "number" && (n = e), t = typeof n == "number" ? document.createElement(this.tagName[n - 1]) : n && this.tagName.indexOf(n) > -1 ? document.createElement(n) : document.createElement(this.tagName[0])) : t = document.createElement(this.tagName), this.className && t.classList.add(this.className), t;
	}
	get statics() {
		return this.constructor;
	}
	attach() {}
	clone() {
		let e = this.domNode.cloneNode(!1);
		return this.scroll.create(e);
	}
	detach() {
		this.parent != null && this.parent.removeChild(this), Zm.blots.delete(this.domNode);
	}
	deleteAt(e, t) {
		this.isolate(e, t).remove();
	}
	formatAt(e, t, n, r) {
		let i = this.isolate(e, t);
		if (this.scroll.query(n, X.BLOT) != null && r) i.wrap(n, r);
		else if (this.scroll.query(n, X.ATTRIBUTE) != null) {
			let e = this.scroll.create(this.statics.scope);
			i.wrap(e), e.format(n, r);
		}
	}
	insertAt(e, t, n) {
		let r = n == null ? this.scroll.create("text", t) : this.scroll.create(t, n), i = this.split(e);
		this.parent.insertBefore(r, i || void 0);
	}
	isolate(e, t) {
		let n = this.split(e);
		if (n == null) throw Error("Attempt to isolate at end");
		return n.split(t), n;
	}
	length() {
		return 1;
	}
	offset(e = this.parent) {
		return this.parent == null || this === e ? 0 : this.parent.children.offset(this) + this.parent.offset(e);
	}
	optimize(e) {
		this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
	}
	remove() {
		this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
	}
	replaceWith(e, t) {
		let n = typeof e == "string" ? this.scroll.create(e, t) : e;
		return this.parent != null && (this.parent.insertBefore(n, this.next || void 0), this.remove()), n;
	}
	split(e, t) {
		return e === 0 ? this : this.next;
	}
	update(e, t) {}
	wrap(e, t) {
		let n = typeof e == "string" ? this.scroll.create(e, t) : e;
		if (this.parent != null && this.parent.insertBefore(n, this.next || void 0), typeof n.appendChild != "function") throw new Ym(`Cannot wrap ${e}`);
		return n.appendChild(this), n;
	}
};
rh.blotName = "abstract";
var ih = rh, ah = class extends ih {
	static value(e) {
		return !0;
	}
	index(e, t) {
		return this.domNode === e || this.domNode.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
	}
	position(e, t) {
		let n = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
		return e > 0 && (n += 1), [this.parent.domNode, n];
	}
	value() {
		return { [this.statics.blotName]: this.statics.value(this.domNode) || !0 };
	}
};
ah.scope = X.INLINE_BLOT;
var oh = ah, sh = class {
	constructor() {
		this.head = null, this.tail = null, this.length = 0;
	}
	append(...e) {
		if (this.insertBefore(e[0], null), e.length > 1) {
			let t = e.slice(1);
			this.append(...t);
		}
	}
	at(e) {
		let t = this.iterator(), n = t();
		for (; n && e > 0;) --e, n = t();
		return n;
	}
	contains(e) {
		let t = this.iterator(), n = t();
		for (; n;) {
			if (n === e) return !0;
			n = t();
		}
		return !1;
	}
	indexOf(e) {
		let t = this.iterator(), n = t(), r = 0;
		for (; n;) {
			if (n === e) return r;
			r += 1, n = t();
		}
		return -1;
	}
	insertBefore(e, t) {
		e != null && (this.remove(e), e.next = t, t == null ? this.tail == null ? (e.prev = null, this.head = this.tail = e) : (this.tail.next = e, e.prev = this.tail, this.tail = e) : (e.prev = t.prev, t.prev != null && (t.prev.next = e), t.prev = e, t === this.head && (this.head = e)), this.length += 1);
	}
	offset(e) {
		let t = 0, n = this.head;
		for (; n != null;) {
			if (n === e) return t;
			t += n.length(), n = n.next;
		}
		return -1;
	}
	remove(e) {
		this.contains(e) && (e.prev != null && (e.prev.next = e.next), e.next != null && (e.next.prev = e.prev), e === this.head && (this.head = e.next), e === this.tail && (this.tail = e.prev), --this.length);
	}
	iterator(e = this.head) {
		return () => {
			let t = e;
			return e != null && (e = e.next), t;
		};
	}
	find(e, t = !1) {
		let n = this.iterator(), r = n();
		for (; r;) {
			let i = r.length();
			if (e < i || t && e === i && (r.next == null || r.next.length() !== 0)) return [r, e];
			e -= i, r = n();
		}
		return [null, 0];
	}
	forEach(e) {
		let t = this.iterator(), n = t();
		for (; n;) e(n), n = t();
	}
	forEachAt(e, t, n) {
		if (t <= 0) return;
		let [r, i] = this.find(e), a = e - i, o = this.iterator(r), s = o();
		for (; s && a < e + t;) {
			let r = s.length();
			e > a ? n(s, e - a, Math.min(t, a + r - e)) : n(s, 0, Math.min(r, e + t - a)), a += r, s = o();
		}
	}
	map(e) {
		return this.reduce((t, n) => (t.push(e(n)), t), []);
	}
	reduce(e, t) {
		let n = this.iterator(), r = n();
		for (; r;) t = e(t, r), r = n();
		return t;
	}
};
function ch(e, t) {
	let n = t.find(e);
	if (n) return n;
	try {
		return t.create(e);
	} catch {
		let n = t.create(X.INLINE);
		return Array.from(e.childNodes).forEach((e) => {
			n.domNode.appendChild(e);
		}), e.parentNode && e.parentNode.replaceChild(n.domNode, e), n.attach(), n;
	}
}
var lh = class e extends ih {
	constructor(e, t) {
		super(e, t), this.uiNode = null, this.build();
	}
	appendChild(e) {
		this.insertBefore(e);
	}
	attach() {
		super.attach(), this.children.forEach((e) => {
			e.attach();
		});
	}
	attachUI(t) {
		this.uiNode != null && this.uiNode.remove(), this.uiNode = t, e.uiClass && this.uiNode.classList.add(e.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
	}
	build() {
		this.children = new sh(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
			try {
				let t = ch(e, this.scroll);
				this.insertBefore(t, this.children.head || void 0);
			} catch (e) {
				if (e instanceof Ym) return;
				throw e;
			}
		});
	}
	deleteAt(e, t) {
		if (e === 0 && t === this.length()) return this.remove();
		this.children.forEachAt(e, t, (e, t, n) => {
			e.deleteAt(t, n);
		});
	}
	descendant(t, n = 0) {
		let [r, i] = this.children.find(n);
		return t.blotName == null && t(r) || t.blotName != null && r instanceof t ? [r, i] : r instanceof e ? r.descendant(t, i) : [null, -1];
	}
	descendants(t, n = 0, r = Number.MAX_VALUE) {
		let i = [], a = r;
		return this.children.forEachAt(n, r, (n, r, o) => {
			(t.blotName == null && t(n) || t.blotName != null && n instanceof t) && i.push(n), n instanceof e && (i = i.concat(n.descendants(t, r, a))), a -= o;
		}), i;
	}
	detach() {
		this.children.forEach((e) => {
			e.detach();
		}), super.detach();
	}
	enforceAllowedChildren() {
		let t = !1;
		this.children.forEach((n) => {
			t || this.statics.allowedChildren.some((e) => n instanceof e) || (n.statics.scope === X.BLOCK_BLOT ? (n.next != null && this.splitAfter(n), n.prev != null && this.splitAfter(n.prev), n.parent.unwrap(), t = !0) : n instanceof e ? n.unwrap() : n.remove());
		});
	}
	formatAt(e, t, n, r) {
		this.children.forEachAt(e, t, (e, t, i) => {
			e.formatAt(t, i, n, r);
		});
	}
	insertAt(e, t, n) {
		let [r, i] = this.children.find(e);
		if (r) r.insertAt(i, t, n);
		else {
			let e = n == null ? this.scroll.create("text", t) : this.scroll.create(t, n);
			this.appendChild(e);
		}
	}
	insertBefore(e, t) {
		e.parent != null && e.parent.children.remove(e);
		let n = null;
		this.children.insertBefore(e, t || null), e.parent = this, t != null && (n = t.domNode), (this.domNode.parentNode !== e.domNode || this.domNode.nextSibling !== n) && this.domNode.insertBefore(e.domNode, n), e.attach();
	}
	length() {
		return this.children.reduce((e, t) => e + t.length(), 0);
	}
	moveChildren(e, t) {
		this.children.forEach((n) => {
			e.insertBefore(n, t);
		});
	}
	optimize(e) {
		if (super.optimize(e), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0) if (this.statics.defaultChild != null) {
			let e = this.scroll.create(this.statics.defaultChild.blotName);
			this.appendChild(e);
		} else this.remove();
	}
	path(t, n = !1) {
		let [r, i] = this.children.find(t, n), a = [[this, t]];
		return r instanceof e ? a.concat(r.path(i, n)) : (r != null && a.push([r, i]), a);
	}
	removeChild(e) {
		this.children.remove(e);
	}
	replaceWith(t, n) {
		let r = typeof t == "string" ? this.scroll.create(t, n) : t;
		return r instanceof e && this.moveChildren(r), super.replaceWith(r);
	}
	split(e, t = !1) {
		if (!t) {
			if (e === 0) return this;
			if (e === this.length()) return this.next;
		}
		let n = this.clone();
		return this.parent && this.parent.insertBefore(n, this.next || void 0), this.children.forEachAt(e, this.length(), (e, r, i) => {
			let a = e.split(r, t);
			a != null && n.appendChild(a);
		}), n;
	}
	splitAfter(e) {
		let t = this.clone();
		for (; e.next != null;) t.appendChild(e.next);
		return this.parent && this.parent.insertBefore(t, this.next || void 0), t;
	}
	unwrap() {
		this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
	}
	update(e, t) {
		let n = [], r = [];
		e.forEach((e) => {
			e.target === this.domNode && e.type === "childList" && (n.push(...e.addedNodes), r.push(...e.removedNodes));
		}), r.forEach((e) => {
			if (e.parentNode != null && e.tagName !== "IFRAME" && document.body.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) return;
			let t = this.scroll.find(e);
			t != null && (t.domNode.parentNode == null || t.domNode.parentNode === this.domNode) && t.detach();
		}), n.filter((e) => e.parentNode === this.domNode && e !== this.uiNode).sort((e, t) => e === t ? 0 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((e) => {
			let t = null;
			e.nextSibling != null && (t = this.scroll.find(e.nextSibling));
			let n = ch(e, this.scroll);
			(n.next !== t || n.next == null) && (n.parent != null && n.parent.removeChild(this), this.insertBefore(n, t || void 0));
		}), this.enforceAllowedChildren();
	}
};
lh.uiClass = "";
var uh = lh;
function dh(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
var fh = class e extends uh {
	static create(e) {
		return super.create(e);
	}
	static formats(t, n) {
		let r = n.query(e.blotName);
		if (!(r != null && t.tagName === r.tagName)) {
			if (typeof this.tagName == "string") return !0;
			if (Array.isArray(this.tagName)) return t.tagName.toLowerCase();
		}
	}
	constructor(e, t) {
		super(e, t), this.attributes = new nh(this.domNode);
	}
	format(t, n) {
		if (t === this.statics.blotName && !n) this.children.forEach((t) => {
			t instanceof e || (t = t.wrap(e.blotName, !0)), this.attributes.copy(t);
		}), this.unwrap();
		else {
			let e = this.scroll.query(t, X.INLINE);
			if (e == null) return;
			e instanceof Jm ? this.attributes.attribute(e, n) : n && (t !== this.statics.blotName || this.formats()[t] !== n) && this.replaceWith(t, n);
		}
	}
	formats() {
		let e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
		return t != null && (e[this.statics.blotName] = t), e;
	}
	formatAt(e, t, n, r) {
		this.formats()[n] != null || this.scroll.query(n, X.ATTRIBUTE) ? this.isolate(e, t).format(n, r) : super.formatAt(e, t, n, r);
	}
	optimize(t) {
		super.optimize(t);
		let n = this.formats();
		if (Object.keys(n).length === 0) return this.unwrap();
		let r = this.next;
		r instanceof e && r.prev === this && dh(n, r.formats()) && (r.moveChildren(this), r.remove());
	}
	replaceWith(e, t) {
		let n = super.replaceWith(e, t);
		return this.attributes.copy(n), n;
	}
	update(e, t) {
		super.update(e, t), e.some((e) => e.target === this.domNode && e.type === "attributes") && this.attributes.build();
	}
	wrap(t, n) {
		let r = super.wrap(t, n);
		return r instanceof e && this.attributes.move(r), r;
	}
};
fh.allowedChildren = [fh, oh], fh.blotName = "inline", fh.scope = X.INLINE_BLOT, fh.tagName = "SPAN";
var ph = fh, mh = class e extends uh {
	static create(e) {
		return super.create(e);
	}
	static formats(t, n) {
		let r = n.query(e.blotName);
		if (!(r != null && t.tagName === r.tagName)) {
			if (typeof this.tagName == "string") return !0;
			if (Array.isArray(this.tagName)) return t.tagName.toLowerCase();
		}
	}
	constructor(e, t) {
		super(e, t), this.attributes = new nh(this.domNode);
	}
	format(t, n) {
		let r = this.scroll.query(t, X.BLOCK);
		r != null && (r instanceof Jm ? this.attributes.attribute(r, n) : t === this.statics.blotName && !n ? this.replaceWith(e.blotName) : n && (t !== this.statics.blotName || this.formats()[t] !== n) && this.replaceWith(t, n));
	}
	formats() {
		let e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
		return t != null && (e[this.statics.blotName] = t), e;
	}
	formatAt(e, t, n, r) {
		this.scroll.query(n, X.BLOCK) == null ? super.formatAt(e, t, n, r) : this.format(n, r);
	}
	insertAt(e, t, n) {
		if (n == null || this.scroll.query(t, X.INLINE) != null) super.insertAt(e, t, n);
		else {
			let r = this.split(e);
			if (r != null) {
				let e = this.scroll.create(t, n);
				r.parent.insertBefore(e, r);
			} else throw Error("Attempt to insertAt after block boundaries");
		}
	}
	replaceWith(e, t) {
		let n = super.replaceWith(e, t);
		return this.attributes.copy(n), n;
	}
	update(e, t) {
		super.update(e, t), e.some((e) => e.target === this.domNode && e.type === "attributes") && this.attributes.build();
	}
};
mh.blotName = "block", mh.scope = X.BLOCK_BLOT, mh.tagName = "P", mh.allowedChildren = [
	ph,
	mh,
	oh
];
var hh = mh, gh = class extends uh {
	checkMerge() {
		return this.next !== null && this.next.statics.blotName === this.statics.blotName;
	}
	deleteAt(e, t) {
		super.deleteAt(e, t), this.enforceAllowedChildren();
	}
	formatAt(e, t, n, r) {
		super.formatAt(e, t, n, r), this.enforceAllowedChildren();
	}
	insertAt(e, t, n) {
		super.insertAt(e, t, n), this.enforceAllowedChildren();
	}
	optimize(e) {
		super.optimize(e), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
	}
};
gh.blotName = "container", gh.scope = X.BLOCK_BLOT;
var _h = gh, vh = class extends oh {
	static formats(e, t) {}
	format(e, t) {
		super.formatAt(0, this.length(), e, t);
	}
	formatAt(e, t, n, r) {
		e === 0 && t === this.length() ? this.format(n, r) : super.formatAt(e, t, n, r);
	}
	formats() {
		return this.statics.formats(this.domNode, this.scroll);
	}
}, yh = {
	attributes: !0,
	characterData: !0,
	characterDataOldValue: !0,
	childList: !0,
	subtree: !0
}, bh = 100, xh = class extends uh {
	constructor(e, t) {
		super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((e) => {
			this.update(e);
		}), this.observer.observe(this.domNode, yh), this.attach();
	}
	create(e, t) {
		return this.registry.create(this, e, t);
	}
	find(e, t = !1) {
		let n = this.registry.find(e, t);
		return n ? n.scroll === this ? n : t ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
	}
	query(e, t = X.ANY) {
		return this.registry.query(e, t);
	}
	register(...e) {
		return this.registry.register(...e);
	}
	build() {
		this.scroll != null && super.build();
	}
	detach() {
		super.detach(), this.observer.disconnect();
	}
	deleteAt(e, t) {
		this.update(), e === 0 && t === this.length() ? this.children.forEach((e) => {
			e.remove();
		}) : super.deleteAt(e, t);
	}
	formatAt(e, t, n, r) {
		this.update(), super.formatAt(e, t, n, r);
	}
	insertAt(e, t, n) {
		this.update(), super.insertAt(e, t, n);
	}
	optimize(e = [], t = {}) {
		super.optimize(t);
		let n = t.mutationsMap || /* @__PURE__ */ new WeakMap(), r = Array.from(this.observer.takeRecords());
		for (; r.length > 0;) e.push(r.pop());
		let i = (e, t = !0) => {
			e == null || e === this || e.domNode.parentNode != null && (n.has(e.domNode) || n.set(e.domNode, []), t && i(e.parent));
		}, a = (e) => {
			n.has(e.domNode) && (e instanceof uh && e.children.forEach(a), n.delete(e.domNode), e.optimize(t));
		}, o = e;
		for (let t = 0; o.length > 0; t += 1) {
			if (t >= bh) throw Error("[Parchment] Maximum optimize iterations reached");
			for (o.forEach((e) => {
				let t = this.find(e.target, !0);
				t != null && (t.domNode === e.target && (e.type === "childList" ? (i(this.find(e.previousSibling, !1)), Array.from(e.addedNodes).forEach((e) => {
					let t = this.find(e, !1);
					i(t, !1), t instanceof uh && t.children.forEach((e) => {
						i(e, !1);
					});
				})) : e.type === "attributes" && i(t.prev)), i(t));
			}), this.children.forEach(a), o = Array.from(this.observer.takeRecords()), r = o.slice(); r.length > 0;) e.push(r.pop());
		}
	}
	update(e, t = {}) {
		e ||= this.observer.takeRecords();
		let n = /* @__PURE__ */ new WeakMap();
		e.map((e) => {
			let t = this.find(e.target, !0);
			return t == null ? null : n.has(t.domNode) ? (n.get(t.domNode).push(e), null) : (n.set(t.domNode, [e]), t);
		}).forEach((e) => {
			e != null && e !== this && n.has(e.domNode) && e.update(n.get(e.domNode) || [], t);
		}), t.mutationsMap = n, n.has(this.domNode) && super.update(n.get(this.domNode), t), this.optimize(e, t);
	}
};
xh.blotName = "scroll", xh.defaultChild = hh, xh.allowedChildren = [hh, _h], xh.scope = X.BLOCK_BLOT, xh.tagName = "DIV";
var Sh = xh, Ch = class e extends oh {
	static create(e) {
		return document.createTextNode(e);
	}
	static value(e) {
		return e.data;
	}
	constructor(e, t) {
		super(e, t), this.text = this.statics.value(this.domNode);
	}
	deleteAt(e, t) {
		this.domNode.data = this.text = this.text.slice(0, e) + this.text.slice(e + t);
	}
	index(e, t) {
		return this.domNode === e ? t : -1;
	}
	insertAt(e, t, n) {
		n == null ? (this.text = this.text.slice(0, e) + t + this.text.slice(e), this.domNode.data = this.text) : super.insertAt(e, t, n);
	}
	length() {
		return this.text.length;
	}
	optimize(t) {
		super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof e && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
	}
	position(e, t = !1) {
		return [this.domNode, e];
	}
	split(e, t = !1) {
		if (!t) {
			if (e === 0) return this;
			if (e === this.length()) return this.next;
		}
		let n = this.scroll.create(this.domNode.splitText(e));
		return this.parent.insertBefore(n, this.next || void 0), this.text = this.statics.value(this.domNode), n;
	}
	update(e, t) {
		e.some((e) => e.type === "characterData" && e.target === this.domNode) && (this.text = this.statics.value(this.domNode));
	}
	value() {
		return this.text;
	}
};
Ch.blotName = "text", Ch.scope = X.INLINE_BLOT;
var wh = Ch, Th = /* @__PURE__ */ D(((e, t) => {
	var n = -1, r = 1, i = 0;
	function a(e, t, n, r, a) {
		if (e === t) return e ? [[i, e]] : [];
		if (n != null) {
			var s = D(e, t, n);
			if (s) return s;
		}
		var c = l(e, t), u = e.substring(0, c);
		e = e.substring(c), t = t.substring(c), c = d(e, t);
		var f = e.substring(e.length - c);
		e = e.substring(0, e.length - c), t = t.substring(0, t.length - c);
		var m = o(e, t);
		return u && m.unshift([i, u]), f && m.push([i, f]), b(m, a), r && p(m), m;
	}
	function o(e, t) {
		var o;
		if (!e) return [[r, t]];
		if (!t) return [[n, e]];
		var c = e.length > t.length ? e : t, l = e.length > t.length ? t : e, u = c.indexOf(l);
		if (u !== -1) return o = [
			[r, c.substring(0, u)],
			[i, l],
			[r, c.substring(u + l.length)]
		], e.length > t.length && (o[0][0] = o[2][0] = n), o;
		if (l.length === 1) return [[n, e], [r, t]];
		var d = f(e, t);
		if (d) {
			var p = d[0], m = d[1], h = d[2], g = d[3], _ = d[4], v = a(p, h), y = a(m, g);
			return v.concat([[i, _]], y);
		}
		return s(e, t);
	}
	function s(e, t) {
		for (var i = e.length, a = t.length, o = Math.ceil((i + a) / 2), s = o, l = 2 * o, u = Array(l), d = Array(l), f = 0; f < l; f++) u[f] = -1, d[f] = -1;
		u[s + 1] = 0, d[s + 1] = 0;
		for (var p = i - a, m = p % 2 != 0, h = 0, g = 0, _ = 0, v = 0, y = 0; y < o; y++) {
			for (var b = -y + h; b <= y - g; b += 2) {
				for (var x = s + b, S = b === -y || b !== y && u[x - 1] < u[x + 1] ? u[x + 1] : u[x - 1] + 1, C = S - b; S < i && C < a && e.charAt(S) === t.charAt(C);) S++, C++;
				if (u[x] = S, S > i) g += 2;
				else if (C > a) h += 2;
				else if (m) {
					var w = s + p - b;
					if (w >= 0 && w < l && d[w] !== -1) {
						var T = i - d[w];
						if (S >= T) return c(e, t, S, C);
					}
				}
			}
			for (var E = -y + _; E <= y - v; E += 2) {
				for (var w = s + E, T = E === -y || E !== y && d[w - 1] < d[w + 1] ? d[w + 1] : d[w - 1] + 1, D = T - E; T < i && D < a && e.charAt(i - T - 1) === t.charAt(a - D - 1);) T++, D++;
				if (d[w] = T, T > i) v += 2;
				else if (D > a) _ += 2;
				else if (!m) {
					var x = s + p - E;
					if (x >= 0 && x < l && u[x] !== -1) {
						var S = u[x], C = s + S - x;
						if (T = i - T, S >= T) return c(e, t, S, C);
					}
				}
			}
		}
		return [[n, e], [r, t]];
	}
	function c(e, t, n, r) {
		var i = e.substring(0, n), o = t.substring(0, r), s = e.substring(n), c = t.substring(r), l = a(i, o), u = a(s, c);
		return l.concat(u);
	}
	function l(e, t) {
		if (!e || !t || e.charAt(0) !== t.charAt(0)) return 0;
		for (var n = 0, r = Math.min(e.length, t.length), i = r, a = 0; n < i;) e.substring(a, i) == t.substring(a, i) ? (n = i, a = n) : r = i, i = Math.floor((r - n) / 2 + n);
		return x(e.charCodeAt(i - 1)) && i--, i;
	}
	function u(e, t) {
		var n = e.length, r = t.length;
		if (n == 0 || r == 0) return 0;
		n > r ? e = e.substring(n - r) : n < r && (t = t.substring(0, n));
		var i = Math.min(n, r);
		if (e == t) return i;
		for (var a = 0, o = 1;;) {
			var s = e.substring(i - o), c = t.indexOf(s);
			if (c == -1) return a;
			o += c, (c == 0 || e.substring(i - o) == t.substring(0, o)) && (a = o, o++);
		}
	}
	function d(e, t) {
		if (!e || !t || e.slice(-1) !== t.slice(-1)) return 0;
		for (var n = 0, r = Math.min(e.length, t.length), i = r, a = 0; n < i;) e.substring(e.length - i, e.length - a) == t.substring(t.length - i, t.length - a) ? (n = i, a = n) : r = i, i = Math.floor((r - n) / 2 + n);
		return S(e.charCodeAt(e.length - i)) && i--, i;
	}
	function f(e, t) {
		var n = e.length > t.length ? e : t, r = e.length > t.length ? t : e;
		if (n.length < 4 || r.length * 2 < n.length) return null;
		function i(e, t, n) {
			for (var r = e.substring(n, n + Math.floor(e.length / 4)), i = -1, a = "", o, s, c, u; (i = t.indexOf(r, i + 1)) !== -1;) {
				var f = l(e.substring(n), t.substring(i)), p = d(e.substring(0, n), t.substring(0, i));
				a.length < p + f && (a = t.substring(i - p, i) + t.substring(i, i + f), o = e.substring(0, n - p), s = e.substring(n + f), c = t.substring(0, i - p), u = t.substring(i + f));
			}
			return a.length * 2 >= e.length ? [
				o,
				s,
				c,
				u,
				a
			] : null;
		}
		var a = i(n, r, Math.ceil(n.length / 4)), o = i(n, r, Math.ceil(n.length / 2)), s;
		if (!a && !o) return null;
		s = o ? a && a[4].length > o[4].length ? a : o : a;
		var c, u, f, p;
		e.length > t.length ? (c = s[0], u = s[1], f = s[2], p = s[3]) : (f = s[0], p = s[1], c = s[2], u = s[3]);
		var m = s[4];
		return [
			c,
			u,
			f,
			p,
			m
		];
	}
	function p(e) {
		for (var t = !1, a = [], o = 0, s = null, c = 0, l = 0, d = 0, f = 0, p = 0; c < e.length;) e[c][0] == i ? (a[o++] = c, l = f, d = p, f = 0, p = 0, s = e[c][1]) : (e[c][0] == r ? f += e[c][1].length : p += e[c][1].length, s && s.length <= Math.max(l, d) && s.length <= Math.max(f, p) && (e.splice(a[o - 1], 0, [n, s]), e[a[o - 1] + 1][0] = r, o--, o--, c = o > 0 ? a[o - 1] : -1, l = 0, d = 0, f = 0, p = 0, s = null, t = !0)), c++;
		for (t && b(e), y(e), c = 1; c < e.length;) {
			if (e[c - 1][0] == n && e[c][0] == r) {
				var m = e[c - 1][1], h = e[c][1], g = u(m, h), _ = u(h, m);
				g >= _ ? (g >= m.length / 2 || g >= h.length / 2) && (e.splice(c, 0, [i, h.substring(0, g)]), e[c - 1][1] = m.substring(0, m.length - g), e[c + 1][1] = h.substring(g), c++) : (_ >= m.length / 2 || _ >= h.length / 2) && (e.splice(c, 0, [i, m.substring(0, _)]), e[c - 1][0] = r, e[c - 1][1] = h.substring(0, h.length - _), e[c + 1][0] = n, e[c + 1][1] = m.substring(_), c++), c++;
			}
			c++;
		}
	}
	var m = /[^a-zA-Z0-9]/, h = /\s/, g = /[\r\n]/, _ = /\n\r?\n$/, v = /^\r?\n\r?\n/;
	function y(e) {
		function t(e, t) {
			if (!e || !t) return 6;
			var n = e.charAt(e.length - 1), r = t.charAt(0), i = n.match(m), a = r.match(m), o = i && n.match(h), s = a && r.match(h), c = o && n.match(g), l = s && r.match(g), u = c && e.match(_), d = l && t.match(v);
			return u || d ? 5 : c || l ? 4 : i && !o && s ? 3 : o || s ? 2 : i || a ? 1 : 0;
		}
		for (var n = 1; n < e.length - 1;) {
			if (e[n - 1][0] == i && e[n + 1][0] == i) {
				var r = e[n - 1][1], a = e[n][1], o = e[n + 1][1], s = d(r, a);
				if (s) {
					var c = a.substring(a.length - s);
					r = r.substring(0, r.length - s), a = c + a.substring(0, a.length - s), o = c + o;
				}
				for (var l = r, u = a, f = o, p = t(r, a) + t(a, o); a.charAt(0) === o.charAt(0);) {
					r += a.charAt(0), a = a.substring(1) + o.charAt(0), o = o.substring(1);
					var y = t(r, a) + t(a, o);
					y >= p && (p = y, l = r, u = a, f = o);
				}
				e[n - 1][1] != l && (l ? e[n - 1][1] = l : (e.splice(n - 1, 1), n--), e[n][1] = u, f ? e[n + 1][1] = f : (e.splice(n + 1, 1), n--));
			}
			n++;
		}
	}
	function b(e, t) {
		e.push([i, ""]);
		for (var a = 0, o = 0, s = 0, c = "", u = "", f; a < e.length;) {
			if (a < e.length - 1 && !e[a][1]) {
				e.splice(a, 1);
				continue;
			}
			switch (e[a][0]) {
				case r:
					s++, u += e[a][1], a++;
					break;
				case n:
					o++, c += e[a][1], a++;
					break;
				case i:
					var p = a - s - o - 1;
					if (t) {
						if (p >= 0 && w(e[p][1])) {
							var m = e[p][1].slice(-1);
							if (e[p][1] = e[p][1].slice(0, -1), c = m + c, u = m + u, !e[p][1]) {
								e.splice(p, 1), a--;
								var h = p - 1;
								e[h] && e[h][0] === r && (s++, u = e[h][1] + u, h--), e[h] && e[h][0] === n && (o++, c = e[h][1] + c, h--), p = h;
							}
						}
						if (C(e[a][1])) {
							var m = e[a][1].charAt(0);
							e[a][1] = e[a][1].slice(1), c += m, u += m;
						}
					}
					if (a < e.length - 1 && !e[a][1]) {
						e.splice(a, 1);
						break;
					}
					if (c.length > 0 || u.length > 0) {
						c.length > 0 && u.length > 0 && (f = l(u, c), f !== 0 && (p >= 0 ? e[p][1] += u.substring(0, f) : (e.splice(0, 0, [i, u.substring(0, f)]), a++), u = u.substring(f), c = c.substring(f)), f = d(u, c), f !== 0 && (e[a][1] = u.substring(u.length - f) + e[a][1], u = u.substring(0, u.length - f), c = c.substring(0, c.length - f)));
						var g = s + o;
						c.length === 0 && u.length === 0 ? (e.splice(a - g, g), a -= g) : c.length === 0 ? (e.splice(a - g, g, [r, u]), a = a - g + 1) : u.length === 0 ? (e.splice(a - g, g, [n, c]), a = a - g + 1) : (e.splice(a - g, g, [n, c], [r, u]), a = a - g + 2);
					}
					a !== 0 && e[a - 1][0] === i ? (e[a - 1][1] += e[a][1], e.splice(a, 1)) : a++, s = 0, o = 0, c = "", u = "";
					break;
			}
		}
		e[e.length - 1][1] === "" && e.pop();
		var _ = !1;
		for (a = 1; a < e.length - 1;) e[a - 1][0] === i && e[a + 1][0] === i && (e[a][1].substring(e[a][1].length - e[a - 1][1].length) === e[a - 1][1] ? (e[a][1] = e[a - 1][1] + e[a][1].substring(0, e[a][1].length - e[a - 1][1].length), e[a + 1][1] = e[a - 1][1] + e[a + 1][1], e.splice(a - 1, 1), _ = !0) : e[a][1].substring(0, e[a + 1][1].length) == e[a + 1][1] && (e[a - 1][1] += e[a + 1][1], e[a][1] = e[a][1].substring(e[a + 1][1].length) + e[a + 1][1], e.splice(a + 1, 1), _ = !0)), a++;
		_ && b(e, t);
	}
	function x(e) {
		return e >= 55296 && e <= 56319;
	}
	function S(e) {
		return e >= 56320 && e <= 57343;
	}
	function C(e) {
		return S(e.charCodeAt(0));
	}
	function w(e) {
		return x(e.charCodeAt(e.length - 1));
	}
	function T(e) {
		for (var t = [], n = 0; n < e.length; n++) e[n][1].length > 0 && t.push(e[n]);
		return t;
	}
	function E(e, t, a, o) {
		return w(e) || C(o) ? null : T([
			[i, e],
			[n, t],
			[r, a],
			[i, o]
		]);
	}
	function D(e, t, n) {
		var r = typeof n == "number" ? {
			index: n,
			length: 0
		} : n.oldRange, i = typeof n == "number" ? null : n.newRange, a = e.length, o = t.length;
		if (r.length === 0 && (i === null || i.length === 0)) {
			var s = r.index, c = e.slice(0, s), l = e.slice(s), u = i ? i.index : null;
			editBefore: {
				var d = s + o - a;
				if (u !== null && u !== d || d < 0 || d > o) break editBefore;
				var f = t.slice(0, d), p = t.slice(d);
				if (p !== l) break editBefore;
				var m = Math.min(s, d), h = c.slice(0, m), g = f.slice(0, m);
				if (h !== g) break editBefore;
				var _ = c.slice(m), v = f.slice(m);
				return E(h, _, v, l);
			}
			editAfter: {
				if (u !== null && u !== s) break editAfter;
				var y = s, f = t.slice(0, y), p = t.slice(y);
				if (f !== c) break editAfter;
				var b = Math.min(a - y, o - y), x = l.slice(l.length - b), S = p.slice(p.length - b);
				if (x !== S) break editAfter;
				var _ = l.slice(0, l.length - b), v = p.slice(0, p.length - b);
				return E(c, _, v, x);
			}
		}
		if (r.length > 0 && i && i.length === 0) replaceRange: {
			var h = e.slice(0, r.index), x = e.slice(r.index + r.length), m = h.length, b = x.length;
			if (o < m + b) break replaceRange;
			var g = t.slice(0, m), S = t.slice(o - b);
			if (h !== g || x !== S) break replaceRange;
			var _ = e.slice(m, a - b), v = t.slice(m, o - b);
			return E(h, _, v, x);
		}
		return null;
	}
	function ee(e, t, n, r) {
		return a(e, t, n, r, !0);
	}
	ee.INSERT = r, ee.DELETE = n, ee.EQUAL = i, t.exports = ee;
})), Eh = /* @__PURE__ */ D(((e, t) => {
	var n = 200, r = "__lodash_hash_undefined__", i = 9007199254740991, a = "[object Arguments]", o = "[object Array]", s = "[object Boolean]", c = "[object Date]", l = "[object Error]", u = "[object Function]", d = "[object GeneratorFunction]", f = "[object Map]", p = "[object Number]", m = "[object Object]", h = "[object Promise]", g = "[object RegExp]", _ = "[object Set]", v = "[object String]", y = "[object Symbol]", b = "[object WeakMap]", x = "[object ArrayBuffer]", S = "[object DataView]", C = "[object Float32Array]", w = "[object Float64Array]", T = "[object Int8Array]", E = "[object Int16Array]", D = "[object Int32Array]", ee = "[object Uint8Array]", te = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", re = "[object Uint32Array]", ie = /[\\^$.*+?()[\]{}|]/g, ae = /\w*$/, oe = /^\[object .+?Constructor\]$/, O = /^(?:0|[1-9]\d*)$/, k = {};
	k[a] = k[o] = k[x] = k[S] = k[s] = k[c] = k[C] = k[w] = k[T] = k[E] = k[D] = k[f] = k[p] = k[m] = k[g] = k[_] = k[v] = k[y] = k[ee] = k[te] = k[ne] = k[re] = !0, k[l] = k[u] = k[b] = !1;
	var A = typeof global == "object" && global && global.Object === Object && global, j = typeof self == "object" && self && self.Object === Object && self, M = A || j || Function("return this")(), N = typeof e == "object" && e && !e.nodeType && e, P = N && typeof t == "object" && t && !t.nodeType && t, se = P && P.exports === N;
	function ce(e, t) {
		return e.set(t[0], t[1]), e;
	}
	function F(e, t) {
		return e.add(t), e;
	}
	function I(e, t) {
		for (var n = -1, r = e ? e.length : 0; ++n < r && t(e[n], n, e) !== !1;);
		return e;
	}
	function L(e, t) {
		for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
		return e;
	}
	function R(e, t, n, r) {
		var i = -1, a = e ? e.length : 0;
		for (r && a && (n = e[++i]); ++i < a;) n = t(n, e[i], i, e);
		return n;
	}
	function z(e, t) {
		for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
		return r;
	}
	function le(e, t) {
		return e?.[t];
	}
	function ue(e) {
		var t = !1;
		if (e != null && typeof e.toString != "function") try {
			t = !!(e + "");
		} catch {}
		return t;
	}
	function de(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e, r) {
			n[++t] = [r, e];
		}), n;
	}
	function fe(e, t) {
		return function(n) {
			return e(t(n));
		};
	}
	function B(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e) {
			n[++t] = e;
		}), n;
	}
	var V = Array.prototype, H = Function.prototype, U = Object.prototype, W = M["__core-js_shared__"], G = function() {
		var e = /[^.]+$/.exec(W && W.keys && W.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}(), pe = H.toString, me = U.hasOwnProperty, he = U.toString, ge = RegExp("^" + pe.call(me).replace(ie, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), _e = se ? M.Buffer : void 0, ve = M.Symbol, ye = M.Uint8Array, be = fe(Object.getPrototypeOf, Object), xe = Object.create, Se = U.propertyIsEnumerable, Ce = V.splice, we = Object.getOwnPropertySymbols, Te = _e ? _e.isBuffer : void 0, Ee = fe(Object.keys, Object), De = Nt(M, "DataView"), Oe = Nt(M, "Map"), ke = Nt(M, "Promise"), Ae = Nt(M, "Set"), je = Nt(M, "WeakMap"), Me = Nt(Object, "create"), Ne = Ut(De), Pe = Ut(Oe), Fe = Ut(ke), Ie = Ut(Ae), Le = Ut(je), Re = ve ? ve.prototype : void 0, ze = Re ? Re.valueOf : void 0;
	function Be(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function Ve() {
		this.__data__ = Me ? Me(null) : {};
	}
	function He(e) {
		return this.has(e) && delete this.__data__[e];
	}
	function Ue(e) {
		var t = this.__data__;
		if (Me) {
			var n = t[e];
			return n === r ? void 0 : n;
		}
		return me.call(t, e) ? t[e] : void 0;
	}
	function We(e) {
		var t = this.__data__;
		return Me ? t[e] !== void 0 : me.call(t, e);
	}
	function Ge(e, t) {
		var n = this.__data__;
		return n[e] = Me && t === void 0 ? r : t, this;
	}
	Be.prototype.clear = Ve, Be.prototype.delete = He, Be.prototype.get = Ue, Be.prototype.has = We, Be.prototype.set = Ge;
	function Ke(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function qe() {
		this.__data__ = [];
	}
	function Je(e) {
		var t = this.__data__, n = ft(t, e);
		return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : Ce.call(t, n, 1), !0);
	}
	function Ye(e) {
		var t = this.__data__, n = ft(t, e);
		return n < 0 ? void 0 : t[n][1];
	}
	function Xe(e) {
		return ft(this.__data__, e) > -1;
	}
	function Ze(e, t) {
		var n = this.__data__, r = ft(n, e);
		return r < 0 ? n.push([e, t]) : n[r][1] = t, this;
	}
	Ke.prototype.clear = qe, Ke.prototype.delete = Je, Ke.prototype.get = Ye, Ke.prototype.has = Xe, Ke.prototype.set = Ze;
	function Qe(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function $e() {
		this.__data__ = {
			hash: new Be(),
			map: new (Oe || Ke)(),
			string: new Be()
		};
	}
	function et(e) {
		return Mt(this, e).delete(e);
	}
	function tt(e) {
		return Mt(this, e).get(e);
	}
	function nt(e) {
		return Mt(this, e).has(e);
	}
	function rt(e, t) {
		return Mt(this, e).set(e, t), this;
	}
	Qe.prototype.clear = $e, Qe.prototype.delete = et, Qe.prototype.get = tt, Qe.prototype.has = nt, Qe.prototype.set = rt;
	function it(e) {
		this.__data__ = new Ke(e);
	}
	function at() {
		this.__data__ = new Ke();
	}
	function ot(e) {
		return this.__data__.delete(e);
	}
	function st(e) {
		return this.__data__.get(e);
	}
	function ct(e) {
		return this.__data__.has(e);
	}
	function lt(e, t) {
		var r = this.__data__;
		if (r instanceof Ke) {
			var i = r.__data__;
			if (!Oe || i.length < n - 1) return i.push([e, t]), this;
			r = this.__data__ = new Qe(i);
		}
		return r.set(e, t), this;
	}
	it.prototype.clear = at, it.prototype.delete = ot, it.prototype.get = st, it.prototype.has = ct, it.prototype.set = lt;
	function ut(e, t) {
		var n = qt(e) || Kt(e) ? z(e.length, String) : [], r = n.length, i = !!r;
		for (var a in e) (t || me.call(e, a)) && !(i && (a == "length" || zt(a, r))) && n.push(a);
		return n;
	}
	function dt(e, t, n) {
		var r = e[t];
		(!(me.call(e, t) && Gt(r, n)) || n === void 0 && !(t in e)) && (e[t] = n);
	}
	function ft(e, t) {
		for (var n = e.length; n--;) if (Gt(e[n][0], t)) return n;
		return -1;
	}
	function pt(e, t) {
		return e && kt(t, tn(t), e);
	}
	function mt(e, t, n, r, i, o, s) {
		var c;
		if (r && (c = o ? r(e, i, o, s) : r(e)), c !== void 0) return c;
		if (!$t(e)) return e;
		var l = qt(e);
		if (l) {
			if (c = It(e), !t) return Ot(e, c);
		} else {
			var f = Ft(e), p = f == u || f == d;
			if (Xt(e)) return bt(e, t);
			if (f == m || f == a || p && !o) {
				if (ue(e)) return o ? e : {};
				if (c = Lt(p ? {} : e), !t) return At(e, pt(c, e));
			} else {
				if (!k[f]) return o ? e : {};
				c = Rt(e, f, mt, t);
			}
		}
		s ||= new it();
		var h = s.get(e);
		if (h) return h;
		if (s.set(e, c), !l) var g = n ? jt(e) : tn(e);
		return I(g || e, function(i, a) {
			g && (a = i, i = e[a]), dt(c, a, mt(i, t, n, r, a, e, s));
		}), c;
	}
	function ht(e) {
		return $t(e) ? xe(e) : {};
	}
	function gt(e, t, n) {
		var r = t(e);
		return qt(e) ? r : L(r, n(e));
	}
	function _t(e) {
		return he.call(e);
	}
	function vt(e) {
		return !$t(e) || Vt(e) ? !1 : (Zt(e) || ue(e) ? ge : oe).test(Ut(e));
	}
	function yt(e) {
		if (!Ht(e)) return Ee(e);
		var t = [];
		for (var n in Object(e)) me.call(e, n) && n != "constructor" && t.push(n);
		return t;
	}
	function bt(e, t) {
		if (t) return e.slice();
		var n = new e.constructor(e.length);
		return e.copy(n), n;
	}
	function xt(e) {
		var t = new e.constructor(e.byteLength);
		return new ye(t).set(new ye(e)), t;
	}
	function St(e, t) {
		var n = t ? xt(e.buffer) : e.buffer;
		return new e.constructor(n, e.byteOffset, e.byteLength);
	}
	function Ct(e, t, n) {
		return R(t ? n(de(e), !0) : de(e), ce, new e.constructor());
	}
	function wt(e) {
		var t = new e.constructor(e.source, ae.exec(e));
		return t.lastIndex = e.lastIndex, t;
	}
	function Tt(e, t, n) {
		return R(t ? n(B(e), !0) : B(e), F, new e.constructor());
	}
	function Et(e) {
		return ze ? Object(ze.call(e)) : {};
	}
	function Dt(e, t) {
		var n = t ? xt(e.buffer) : e.buffer;
		return new e.constructor(n, e.byteOffset, e.length);
	}
	function Ot(e, t) {
		var n = -1, r = e.length;
		for (t ||= Array(r); ++n < r;) t[n] = e[n];
		return t;
	}
	function kt(e, t, n, r) {
		n ||= {};
		for (var i = -1, a = t.length; ++i < a;) {
			var o = t[i], s = r ? r(n[o], e[o], o, n, e) : void 0;
			dt(n, o, s === void 0 ? e[o] : s);
		}
		return n;
	}
	function At(e, t) {
		return kt(e, Pt(e), t);
	}
	function jt(e) {
		return gt(e, tn, Pt);
	}
	function Mt(e, t) {
		var n = e.__data__;
		return Bt(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
	}
	function Nt(e, t) {
		var n = le(e, t);
		return vt(n) ? n : void 0;
	}
	var Pt = we ? fe(we, Object) : nn, Ft = _t;
	(De && Ft(new De(/* @__PURE__ */ new ArrayBuffer(1))) != S || Oe && Ft(new Oe()) != f || ke && Ft(ke.resolve()) != h || Ae && Ft(new Ae()) != _ || je && Ft(new je()) != b) && (Ft = function(e) {
		var t = he.call(e), n = t == m ? e.constructor : void 0, r = n ? Ut(n) : void 0;
		if (r) switch (r) {
			case Ne: return S;
			case Pe: return f;
			case Fe: return h;
			case Ie: return _;
			case Le: return b;
		}
		return t;
	});
	function It(e) {
		var t = e.length, n = e.constructor(t);
		return t && typeof e[0] == "string" && me.call(e, "index") && (n.index = e.index, n.input = e.input), n;
	}
	function Lt(e) {
		return typeof e.constructor == "function" && !Ht(e) ? ht(be(e)) : {};
	}
	function Rt(e, t, n, r) {
		var i = e.constructor;
		switch (t) {
			case x: return xt(e);
			case s:
			case c: return new i(+e);
			case S: return St(e, r);
			case C:
			case w:
			case T:
			case E:
			case D:
			case ee:
			case te:
			case ne:
			case re: return Dt(e, r);
			case f: return Ct(e, r, n);
			case p:
			case v: return new i(e);
			case g: return wt(e);
			case _: return Tt(e, r, n);
			case y: return Et(e);
		}
	}
	function zt(e, t) {
		return t ??= i, !!t && (typeof e == "number" || O.test(e)) && e > -1 && e % 1 == 0 && e < t;
	}
	function Bt(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	function Vt(e) {
		return !!G && G in e;
	}
	function Ht(e) {
		var t = e && e.constructor;
		return e === (typeof t == "function" && t.prototype || U);
	}
	function Ut(e) {
		if (e != null) {
			try {
				return pe.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	function Wt(e) {
		return mt(e, !0, !0);
	}
	function Gt(e, t) {
		return e === t || e !== e && t !== t;
	}
	function Kt(e) {
		return Yt(e) && me.call(e, "callee") && (!Se.call(e, "callee") || he.call(e) == a);
	}
	var qt = Array.isArray;
	function Jt(e) {
		return e != null && Qt(e.length) && !Zt(e);
	}
	function Yt(e) {
		return en(e) && Jt(e);
	}
	var Xt = Te || rn;
	function Zt(e) {
		var t = $t(e) ? he.call(e) : "";
		return t == u || t == d;
	}
	function Qt(e) {
		return typeof e == "number" && e > -1 && e % 1 == 0 && e <= i;
	}
	function $t(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function en(e) {
		return !!e && typeof e == "object";
	}
	function tn(e) {
		return Jt(e) ? ut(e) : yt(e);
	}
	function nn() {
		return [];
	}
	function rn() {
		return !1;
	}
	t.exports = Wt;
})), Dh = /* @__PURE__ */ D(((e, t) => {
	var n = 200, r = "__lodash_hash_undefined__", i = 1, a = 2, o = 9007199254740991, s = "[object Arguments]", c = "[object Array]", l = "[object AsyncFunction]", u = "[object Boolean]", d = "[object Date]", f = "[object Error]", p = "[object Function]", m = "[object GeneratorFunction]", h = "[object Map]", g = "[object Number]", _ = "[object Null]", v = "[object Object]", y = "[object Promise]", b = "[object Proxy]", x = "[object RegExp]", S = "[object Set]", C = "[object String]", w = "[object Symbol]", T = "[object Undefined]", E = "[object WeakMap]", D = "[object ArrayBuffer]", ee = "[object DataView]", te = "[object Float32Array]", ne = "[object Float64Array]", re = "[object Int8Array]", ie = "[object Int16Array]", ae = "[object Int32Array]", oe = "[object Uint8Array]", O = "[object Uint8ClampedArray]", k = "[object Uint16Array]", A = "[object Uint32Array]", j = /[\\^$.*+?()[\]{}|]/g, M = /^\[object .+?Constructor\]$/, N = /^(?:0|[1-9]\d*)$/, P = {};
	P[te] = P[ne] = P[re] = P[ie] = P[ae] = P[oe] = P[O] = P[k] = P[A] = !0, P[s] = P[c] = P[D] = P[u] = P[ee] = P[d] = P[f] = P[p] = P[h] = P[g] = P[v] = P[x] = P[S] = P[C] = P[E] = !1;
	var se = typeof global == "object" && global && global.Object === Object && global, ce = typeof self == "object" && self && self.Object === Object && self, F = se || ce || Function("return this")(), I = typeof e == "object" && e && !e.nodeType && e, L = I && typeof t == "object" && t && !t.nodeType && t, R = L && L.exports === I, z = R && se.process, le = function() {
		try {
			return z && z.binding && z.binding("util");
		} catch {}
	}(), ue = le && le.isTypedArray;
	function de(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
			var o = e[n];
			t(o, n, e) && (a[i++] = o);
		}
		return a;
	}
	function fe(e, t) {
		for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
		return e;
	}
	function B(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
		return !1;
	}
	function V(e, t) {
		for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
		return r;
	}
	function H(e) {
		return function(t) {
			return e(t);
		};
	}
	function U(e, t) {
		return e.has(t);
	}
	function W(e, t) {
		return e?.[t];
	}
	function G(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e, r) {
			n[++t] = [r, e];
		}), n;
	}
	function pe(e, t) {
		return function(n) {
			return e(t(n));
		};
	}
	function me(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e) {
			n[++t] = e;
		}), n;
	}
	var he = Array.prototype, ge = Function.prototype, _e = Object.prototype, ve = F["__core-js_shared__"], ye = ge.toString, be = _e.hasOwnProperty, xe = function() {
		var e = /[^.]+$/.exec(ve && ve.keys && ve.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}(), Se = _e.toString, Ce = RegExp("^" + ye.call(be).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), we = R ? F.Buffer : void 0, Te = F.Symbol, Ee = F.Uint8Array, De = _e.propertyIsEnumerable, Oe = he.splice, ke = Te ? Te.toStringTag : void 0, Ae = Object.getOwnPropertySymbols, je = we ? we.isBuffer : void 0, Me = pe(Object.keys, Object), Ne = Pt(F, "DataView"), Pe = Pt(F, "Map"), Fe = Pt(F, "Promise"), Ie = Pt(F, "Set"), Le = Pt(F, "WeakMap"), Re = Pt(Object, "create"), ze = Ut(Ne), Be = Ut(Pe), Ve = Ut(Fe), He = Ut(Ie), Ue = Ut(Le), We = Te ? Te.prototype : void 0, Ge = We ? We.valueOf : void 0;
	function Ke(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function qe() {
		this.__data__ = Re ? Re(null) : {}, this.size = 0;
	}
	function Je(e) {
		var t = this.has(e) && delete this.__data__[e];
		return this.size -= +!!t, t;
	}
	function Ye(e) {
		var t = this.__data__;
		if (Re) {
			var n = t[e];
			return n === r ? void 0 : n;
		}
		return be.call(t, e) ? t[e] : void 0;
	}
	function Xe(e) {
		var t = this.__data__;
		return Re ? t[e] !== void 0 : be.call(t, e);
	}
	function Ze(e, t) {
		var n = this.__data__;
		return this.size += +!this.has(e), n[e] = Re && t === void 0 ? r : t, this;
	}
	Ke.prototype.clear = qe, Ke.prototype.delete = Je, Ke.prototype.get = Ye, Ke.prototype.has = Xe, Ke.prototype.set = Ze;
	function Qe(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function $e() {
		this.__data__ = [], this.size = 0;
	}
	function et(e) {
		var t = this.__data__, n = bt(t, e);
		return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : Oe.call(t, n, 1), --this.size, !0);
	}
	function tt(e) {
		var t = this.__data__, n = bt(t, e);
		return n < 0 ? void 0 : t[n][1];
	}
	function nt(e) {
		return bt(this.__data__, e) > -1;
	}
	function rt(e, t) {
		var n = this.__data__, r = bt(n, e);
		return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
	}
	Qe.prototype.clear = $e, Qe.prototype.delete = et, Qe.prototype.get = tt, Qe.prototype.has = nt, Qe.prototype.set = rt;
	function it(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function at() {
		this.size = 0, this.__data__ = {
			hash: new Ke(),
			map: new (Pe || Qe)(),
			string: new Ke()
		};
	}
	function ot(e) {
		var t = Nt(this, e).delete(e);
		return this.size -= +!!t, t;
	}
	function st(e) {
		return Nt(this, e).get(e);
	}
	function ct(e) {
		return Nt(this, e).has(e);
	}
	function lt(e, t) {
		var n = Nt(this, e), r = n.size;
		return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
	}
	it.prototype.clear = at, it.prototype.delete = ot, it.prototype.get = st, it.prototype.has = ct, it.prototype.set = lt;
	function ut(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.__data__ = new it(); ++t < n;) this.add(e[t]);
	}
	function dt(e) {
		return this.__data__.set(e, r), this;
	}
	function ft(e) {
		return this.__data__.has(e);
	}
	ut.prototype.add = ut.prototype.push = dt, ut.prototype.has = ft;
	function pt(e) {
		var t = this.__data__ = new Qe(e);
		this.size = t.size;
	}
	function mt() {
		this.__data__ = new Qe(), this.size = 0;
	}
	function ht(e) {
		var t = this.__data__, n = t.delete(e);
		return this.size = t.size, n;
	}
	function gt(e) {
		return this.__data__.get(e);
	}
	function _t(e) {
		return this.__data__.has(e);
	}
	function vt(e, t) {
		var r = this.__data__;
		if (r instanceof Qe) {
			var i = r.__data__;
			if (!Pe || i.length < n - 1) return i.push([e, t]), this.size = ++r.size, this;
			r = this.__data__ = new it(i);
		}
		return r.set(e, t), this.size = r.size, this;
	}
	pt.prototype.clear = mt, pt.prototype.delete = ht, pt.prototype.get = gt, pt.prototype.has = _t, pt.prototype.set = vt;
	function yt(e, t) {
		var n = Kt(e), r = !n && Gt(e), i = !n && !r && Jt(e), a = !n && !r && !i && en(e), o = n || r || i || a, s = o ? V(e.length, String) : [], c = s.length;
		for (var l in e) (t || be.call(e, l)) && !(o && (l == "length" || i && (l == "offset" || l == "parent") || a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || Rt(l, c))) && s.push(l);
		return s;
	}
	function bt(e, t) {
		for (var n = e.length; n--;) if (Wt(e[n][0], t)) return n;
		return -1;
	}
	function xt(e, t, n) {
		var r = t(e);
		return Kt(e) ? r : fe(r, n(e));
	}
	function St(e) {
		return e == null ? e === void 0 ? T : _ : ke && ke in Object(e) ? Ft(e) : Ht(e);
	}
	function Ct(e) {
		return $t(e) && St(e) == s;
	}
	function wt(e, t, n, r, i) {
		return e === t ? !0 : e == null || t == null || !$t(e) && !$t(t) ? e !== e && t !== t : Tt(e, t, n, r, wt, i);
	}
	function Tt(e, t, n, r, a, o) {
		var l = Kt(e), u = Kt(t), d = l ? c : Lt(e), f = u ? c : Lt(t);
		d = d == s ? v : d, f = f == s ? v : f;
		var p = d == v, m = f == v, h = d == f;
		if (h && Jt(e)) {
			if (!Jt(t)) return !1;
			l = !0, p = !1;
		}
		if (h && !p) return o ||= new pt(), l || en(e) ? kt(e, t, n, r, a, o) : At(e, t, d, n, r, a, o);
		if (!(n & i)) {
			var g = p && be.call(e, "__wrapped__"), _ = m && be.call(t, "__wrapped__");
			if (g || _) {
				var y = g ? e.value() : e, b = _ ? t.value() : t;
				return o ||= new pt(), a(y, b, n, r, o);
			}
		}
		return h ? (o ||= new pt(), jt(e, t, n, r, a, o)) : !1;
	}
	function Et(e) {
		return !Qt(e) || Bt(e) ? !1 : (Xt(e) ? Ce : M).test(Ut(e));
	}
	function Dt(e) {
		return $t(e) && Zt(e.length) && !!P[St(e)];
	}
	function Ot(e) {
		if (!Vt(e)) return Me(e);
		var t = [];
		for (var n in Object(e)) be.call(e, n) && n != "constructor" && t.push(n);
		return t;
	}
	function kt(e, t, n, r, o, s) {
		var c = n & i, l = e.length, u = t.length;
		if (l != u && !(c && u > l)) return !1;
		var d = s.get(e);
		if (d && s.get(t)) return d == t;
		var f = -1, p = !0, m = n & a ? new ut() : void 0;
		for (s.set(e, t), s.set(t, e); ++f < l;) {
			var h = e[f], g = t[f];
			if (r) var _ = c ? r(g, h, f, t, e, s) : r(h, g, f, e, t, s);
			if (_ !== void 0) {
				if (_) continue;
				p = !1;
				break;
			}
			if (m) {
				if (!B(t, function(e, t) {
					if (!U(m, t) && (h === e || o(h, e, n, r, s))) return m.push(t);
				})) {
					p = !1;
					break;
				}
			} else if (!(h === g || o(h, g, n, r, s))) {
				p = !1;
				break;
			}
		}
		return s.delete(e), s.delete(t), p;
	}
	function At(e, t, n, r, o, s, c) {
		switch (n) {
			case ee:
				if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
				e = e.buffer, t = t.buffer;
			case D: return !(e.byteLength != t.byteLength || !s(new Ee(e), new Ee(t)));
			case u:
			case d:
			case g: return Wt(+e, +t);
			case f: return e.name == t.name && e.message == t.message;
			case x:
			case C: return e == t + "";
			case h: var l = G;
			case S:
				var p = r & i;
				if (l ||= me, e.size != t.size && !p) return !1;
				var m = c.get(e);
				if (m) return m == t;
				r |= a, c.set(e, t);
				var _ = kt(l(e), l(t), r, o, s, c);
				return c.delete(e), _;
			case w: if (Ge) return Ge.call(e) == Ge.call(t);
		}
		return !1;
	}
	function jt(e, t, n, r, a, o) {
		var s = n & i, c = Mt(e), l = c.length;
		if (l != Mt(t).length && !s) return !1;
		for (var u = l; u--;) {
			var d = c[u];
			if (!(s ? d in t : be.call(t, d))) return !1;
		}
		var f = o.get(e);
		if (f && o.get(t)) return f == t;
		var p = !0;
		o.set(e, t), o.set(t, e);
		for (var m = s; ++u < l;) {
			d = c[u];
			var h = e[d], g = t[d];
			if (r) var _ = s ? r(g, h, d, t, e, o) : r(h, g, d, e, t, o);
			if (!(_ === void 0 ? h === g || a(h, g, n, r, o) : _)) {
				p = !1;
				break;
			}
			m ||= d == "constructor";
		}
		if (p && !m) {
			var v = e.constructor, y = t.constructor;
			v != y && "constructor" in e && "constructor" in t && !(typeof v == "function" && v instanceof v && typeof y == "function" && y instanceof y) && (p = !1);
		}
		return o.delete(e), o.delete(t), p;
	}
	function Mt(e) {
		return xt(e, tn, It);
	}
	function Nt(e, t) {
		var n = e.__data__;
		return zt(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
	}
	function Pt(e, t) {
		var n = W(e, t);
		return Et(n) ? n : void 0;
	}
	function Ft(e) {
		var t = be.call(e, ke), n = e[ke];
		try {
			e[ke] = void 0;
			var r = !0;
		} catch {}
		var i = Se.call(e);
		return r && (t ? e[ke] = n : delete e[ke]), i;
	}
	var It = Ae ? function(e) {
		return e == null ? [] : (e = Object(e), de(Ae(e), function(t) {
			return De.call(e, t);
		}));
	} : nn, Lt = St;
	(Ne && Lt(new Ne(/* @__PURE__ */ new ArrayBuffer(1))) != ee || Pe && Lt(new Pe()) != h || Fe && Lt(Fe.resolve()) != y || Ie && Lt(new Ie()) != S || Le && Lt(new Le()) != E) && (Lt = function(e) {
		var t = St(e), n = t == v ? e.constructor : void 0, r = n ? Ut(n) : "";
		if (r) switch (r) {
			case ze: return ee;
			case Be: return h;
			case Ve: return y;
			case He: return S;
			case Ue: return E;
		}
		return t;
	});
	function Rt(e, t) {
		return t ??= o, !!t && (typeof e == "number" || N.test(e)) && e > -1 && e % 1 == 0 && e < t;
	}
	function zt(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	function Bt(e) {
		return !!xe && xe in e;
	}
	function Vt(e) {
		var t = e && e.constructor;
		return e === (typeof t == "function" && t.prototype || _e);
	}
	function Ht(e) {
		return Se.call(e);
	}
	function Ut(e) {
		if (e != null) {
			try {
				return ye.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	function Wt(e, t) {
		return e === t || e !== e && t !== t;
	}
	var Gt = Ct(function() {
		return arguments;
	}()) ? Ct : function(e) {
		return $t(e) && be.call(e, "callee") && !De.call(e, "callee");
	}, Kt = Array.isArray;
	function qt(e) {
		return e != null && Zt(e.length) && !Xt(e);
	}
	var Jt = je || rn;
	function Yt(e, t) {
		return wt(e, t);
	}
	function Xt(e) {
		if (!Qt(e)) return !1;
		var t = St(e);
		return t == p || t == m || t == l || t == b;
	}
	function Zt(e) {
		return typeof e == "number" && e > -1 && e % 1 == 0 && e <= o;
	}
	function Qt(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	function $t(e) {
		return typeof e == "object" && !!e;
	}
	var en = ue ? H(ue) : Dt;
	function tn(e) {
		return qt(e) ? yt(e) : Ot(e);
	}
	function nn() {
		return [];
	}
	function rn() {
		return !1;
	}
	t.exports = Yt;
})), Oh = /* @__PURE__ */ D(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = Eh(), n = Dh(), r;
	(function(e) {
		function r(e = {}, n = {}, r = !1) {
			typeof e != "object" && (e = {}), typeof n != "object" && (n = {});
			let i = t(n);
			r || (i = Object.keys(i).reduce((e, t) => (i[t] != null && (e[t] = i[t]), e), {}));
			for (let t in e) e[t] !== void 0 && n[t] === void 0 && (i[t] = e[t]);
			return Object.keys(i).length > 0 ? i : void 0;
		}
		e.compose = r;
		function i(e = {}, t = {}) {
			typeof e != "object" && (e = {}), typeof t != "object" && (t = {});
			let r = Object.keys(e).concat(Object.keys(t)).reduce((r, i) => (n(e[i], t[i]) || (r[i] = t[i] === void 0 ? null : t[i]), r), {});
			return Object.keys(r).length > 0 ? r : void 0;
		}
		e.diff = i;
		function a(e = {}, t = {}) {
			e ||= {};
			let n = Object.keys(t).reduce((n, r) => (t[r] !== e[r] && e[r] !== void 0 && (n[r] = t[r]), n), {});
			return Object.keys(e).reduce((n, r) => (e[r] !== t[r] && t[r] === void 0 && (n[r] = null), n), n);
		}
		e.invert = a;
		function o(e, t, n = !1) {
			if (typeof e != "object") return t;
			if (typeof t != "object") return;
			if (!n) return t;
			let r = Object.keys(t).reduce((n, r) => (e[r] === void 0 && (n[r] = t[r]), n), {});
			return Object.keys(r).length > 0 ? r : void 0;
		}
		e.transform = o;
	})(r ||= {}), e.default = r;
})), kh = /* @__PURE__ */ D(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t;
	(function(e) {
		function t(e) {
			return typeof e.delete == "number" ? e.delete : typeof e.retain == "number" ? e.retain : typeof e.retain == "object" && e.retain !== null ? 1 : typeof e.insert == "string" ? e.insert.length : 1;
		}
		e.length = t;
	})(t ||= {}), e.default = t;
})), Ah = /* @__PURE__ */ D(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = kh();
	e.default = class {
		constructor(e) {
			this.ops = e, this.index = 0, this.offset = 0;
		}
		hasNext() {
			return this.peekLength() < Infinity;
		}
		next(e) {
			e ||= Infinity;
			let n = this.ops[this.index];
			if (n) {
				let r = this.offset, i = t.default.length(n);
				if (e >= i - r ? (e = i - r, this.index += 1, this.offset = 0) : this.offset += e, typeof n.delete == "number") return { delete: e };
				{
					let t = {};
					return n.attributes && (t.attributes = n.attributes), typeof n.retain == "number" ? t.retain = e : typeof n.retain == "object" && n.retain !== null ? t.retain = n.retain : typeof n.insert == "string" ? t.insert = n.insert.substr(r, e) : t.insert = n.insert, t;
				}
			} else return { retain: Infinity };
		}
		peek() {
			return this.ops[this.index];
		}
		peekLength() {
			return this.ops[this.index] ? t.default.length(this.ops[this.index]) - this.offset : Infinity;
		}
		peekType() {
			let e = this.ops[this.index];
			return e ? typeof e.delete == "number" ? "delete" : typeof e.retain == "number" || typeof e.retain == "object" && e.retain !== null ? "retain" : "insert" : "retain";
		}
		rest() {
			if (!this.hasNext()) return [];
			if (this.offset === 0) return this.ops.slice(this.index);
			{
				let e = this.offset, t = this.index, n = this.next(), r = this.ops.slice(this.index);
				return this.offset = e, this.index = t, [n].concat(r);
			}
		}
	};
})), Z = /* @__PURE__ */ ne((/* @__PURE__ */ D(((e, t) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
	var n = Th(), r = Eh(), i = Dh(), a = Oh();
	e.AttributeMap = a.default;
	var o = kh();
	e.Op = o.default;
	var s = Ah();
	e.OpIterator = s.default;
	var c = "\0", l = (e, t) => {
		if (typeof e != "object" || !e) throw Error(`cannot retain a ${typeof e}`);
		if (typeof t != "object" || !t) throw Error(`cannot retain a ${typeof t}`);
		let n = Object.keys(e)[0];
		if (!n || n !== Object.keys(t)[0]) throw Error(`embed types not matched: ${n} != ${Object.keys(t)[0]}`);
		return [
			n,
			e[n],
			t[n]
		];
	}, u = class e {
		constructor(e) {
			Array.isArray(e) ? this.ops = e : e != null && Array.isArray(e.ops) ? this.ops = e.ops : this.ops = [];
		}
		static registerEmbed(e, t) {
			this.handlers[e] = t;
		}
		static unregisterEmbed(e) {
			delete this.handlers[e];
		}
		static getHandler(e) {
			let t = this.handlers[e];
			if (!t) throw Error(`no handlers for embed type "${e}"`);
			return t;
		}
		insert(e, t) {
			let n = {};
			return typeof e == "string" && e.length === 0 ? this : (n.insert = e, typeof t == "object" && t && Object.keys(t).length > 0 && (n.attributes = t), this.push(n));
		}
		delete(e) {
			return e <= 0 ? this : this.push({ delete: e });
		}
		retain(e, t) {
			if (typeof e == "number" && e <= 0) return this;
			let n = { retain: e };
			return typeof t == "object" && t && Object.keys(t).length > 0 && (n.attributes = t), this.push(n);
		}
		push(e) {
			let t = this.ops.length, n = this.ops[t - 1];
			if (e = r(e), typeof n == "object") {
				if (typeof e.delete == "number" && typeof n.delete == "number") return this.ops[t - 1] = { delete: n.delete + e.delete }, this;
				if (typeof n.delete == "number" && e.insert != null && (--t, n = this.ops[t - 1], typeof n != "object")) return this.ops.unshift(e), this;
				if (i(e.attributes, n.attributes)) {
					if (typeof e.insert == "string" && typeof n.insert == "string") return this.ops[t - 1] = { insert: n.insert + e.insert }, typeof e.attributes == "object" && (this.ops[t - 1].attributes = e.attributes), this;
					if (typeof e.retain == "number" && typeof n.retain == "number") return this.ops[t - 1] = { retain: n.retain + e.retain }, typeof e.attributes == "object" && (this.ops[t - 1].attributes = e.attributes), this;
				}
			}
			return t === this.ops.length ? this.ops.push(e) : this.ops.splice(t, 0, e), this;
		}
		chop() {
			let e = this.ops[this.ops.length - 1];
			return e && typeof e.retain == "number" && !e.attributes && this.ops.pop(), this;
		}
		filter(e) {
			return this.ops.filter(e);
		}
		forEach(e) {
			this.ops.forEach(e);
		}
		map(e) {
			return this.ops.map(e);
		}
		partition(e) {
			let t = [], n = [];
			return this.forEach((r) => {
				(e(r) ? t : n).push(r);
			}), [t, n];
		}
		reduce(e, t) {
			return this.ops.reduce(e, t);
		}
		changeLength() {
			return this.reduce((e, t) => t.insert ? e + o.default.length(t) : t.delete ? e - t.delete : e, 0);
		}
		length() {
			return this.reduce((e, t) => e + o.default.length(t), 0);
		}
		slice(t = 0, n = Infinity) {
			let r = [], i = new s.default(this.ops), a = 0;
			for (; a < n && i.hasNext();) {
				let e;
				a < t ? e = i.next(t - a) : (e = i.next(n - a), r.push(e)), a += o.default.length(e);
			}
			return new e(r);
		}
		compose(t) {
			let n = new s.default(this.ops), r = new s.default(t.ops), o = [], c = r.peek();
			if (c != null && typeof c.retain == "number" && c.attributes == null) {
				let e = c.retain;
				for (; n.peekType() === "insert" && n.peekLength() <= e;) e -= n.peekLength(), o.push(n.next());
				c.retain - e > 0 && r.next(c.retain - e);
			}
			let u = new e(o);
			for (; n.hasNext() || r.hasNext();) if (r.peekType() === "insert") u.push(r.next());
			else if (n.peekType() === "delete") u.push(n.next());
			else {
				let t = Math.min(n.peekLength(), r.peekLength()), o = n.next(t), s = r.next(t);
				if (s.retain) {
					let c = {};
					if (typeof o.retain == "number") c.retain = typeof s.retain == "number" ? t : s.retain;
					else if (typeof s.retain == "number") o.retain == null ? c.insert = o.insert : c.retain = o.retain;
					else {
						let t = o.retain == null ? "insert" : "retain", [n, r, i] = l(o[t], s.retain), a = e.getHandler(n);
						c[t] = { [n]: a.compose(r, i, t === "retain") };
					}
					let d = a.default.compose(o.attributes, s.attributes, typeof o.retain == "number");
					if (d && (c.attributes = d), u.push(c), !r.hasNext() && i(u.ops[u.ops.length - 1], c)) {
						let t = new e(n.rest());
						return u.concat(t).chop();
					}
				} else typeof s.delete == "number" && (typeof o.retain == "number" || typeof o.retain == "object" && o.retain !== null) && u.push(s);
			}
			return u.chop();
		}
		concat(t) {
			let n = new e(this.ops.slice());
			return t.ops.length > 0 && (n.push(t.ops[0]), n.ops = n.ops.concat(t.ops.slice(1))), n;
		}
		diff(t, r) {
			if (this.ops === t.ops) return new e();
			let o = [this, t].map((e) => e.map((n) => {
				if (n.insert != null) return typeof n.insert == "string" ? n.insert : c;
				throw Error("diff() called " + (e === t ? "on" : "with") + " non-document");
			}).join("")), l = new e(), u = n(o[0], o[1], r, !0), d = new s.default(this.ops), f = new s.default(t.ops);
			return u.forEach((e) => {
				let t = e[1].length;
				for (; t > 0;) {
					let r = 0;
					switch (e[0]) {
						case n.INSERT:
							r = Math.min(f.peekLength(), t), l.push(f.next(r));
							break;
						case n.DELETE:
							r = Math.min(t, d.peekLength()), d.next(r), l.delete(r);
							break;
						case n.EQUAL:
							r = Math.min(d.peekLength(), f.peekLength(), t);
							let e = d.next(r), o = f.next(r);
							i(e.insert, o.insert) ? l.retain(r, a.default.diff(e.attributes, o.attributes)) : l.push(o).delete(r);
							break;
					}
					t -= r;
				}
			}), l.chop();
		}
		eachLine(t, n = "\n") {
			let r = new s.default(this.ops), i = new e(), a = 0;
			for (; r.hasNext();) {
				if (r.peekType() !== "insert") return;
				let s = r.peek(), c = o.default.length(s) - r.peekLength(), l = typeof s.insert == "string" ? s.insert.indexOf(n, c) - c : -1;
				if (l < 0) i.push(r.next());
				else if (l > 0) i.push(r.next(l));
				else {
					if (t(i, r.next(1).attributes || {}, a) === !1) return;
					a += 1, i = new e();
				}
			}
			i.length() > 0 && t(i, {}, a);
		}
		invert(t) {
			let n = new e();
			return this.reduce((r, i) => {
				if (i.insert) n.delete(o.default.length(i));
				else if (typeof i.retain == "number" && i.attributes == null) return n.retain(i.retain), r + i.retain;
				else if (i.delete || typeof i.retain == "number") {
					let e = i.delete || i.retain;
					return t.slice(r, r + e).forEach((e) => {
						i.delete ? n.push(e) : i.retain && i.attributes && n.retain(o.default.length(e), a.default.invert(i.attributes, e.attributes));
					}), r + e;
				} else if (typeof i.retain == "object" && i.retain !== null) {
					let o = t.slice(r, r + 1), c = new s.default(o.ops).next(), [u, d, f] = l(i.retain, c.insert), p = e.getHandler(u);
					return n.retain({ [u]: p.invert(d, f) }, a.default.invert(i.attributes, c.attributes)), r + 1;
				}
				return r;
			}, 0), n.chop();
		}
		transform(t, n = !1) {
			if (n = !!n, typeof t == "number") return this.transformPosition(t, n);
			let r = t, i = new s.default(this.ops), c = new s.default(r.ops), l = new e();
			for (; i.hasNext() || c.hasNext();) if (i.peekType() === "insert" && (n || c.peekType() !== "insert")) l.retain(o.default.length(i.next()));
			else if (c.peekType() === "insert") l.push(c.next());
			else {
				let t = Math.min(i.peekLength(), c.peekLength()), r = i.next(t), o = c.next(t);
				if (r.delete) continue;
				if (o.delete) l.push(o);
				else {
					let i = r.retain, s = o.retain, c = typeof s == "object" && s ? s : t;
					if (typeof i == "object" && i && typeof s == "object" && s) {
						let t = Object.keys(i)[0];
						if (t === Object.keys(s)[0]) {
							let r = e.getHandler(t);
							r && (c = { [t]: r.transform(i[t], s[t], n) });
						}
					}
					l.retain(c, a.default.transform(r.attributes, o.attributes, n));
				}
			}
			return l.chop();
		}
		transformPosition(e, t = !1) {
			t = !!t;
			let n = new s.default(this.ops), r = 0;
			for (; n.hasNext() && r <= e;) {
				let i = n.peekLength(), a = n.peekType();
				if (n.next(), a === "delete") {
					e -= Math.min(i, e - r);
					continue;
				} else a === "insert" && (r < e || !t) && (e += i);
				r += i;
			}
			return e;
		}
	};
	u.Op = o.default, u.OpIterator = s.default, u.AttributeMap = a.default, u.handlers = {}, e.default = u, typeof t == "object" && (t.exports = u, t.exports.default = u);
})))(), 1), jh = class extends vh {
	static value() {}
	optimize() {
		(this.prev || this.next) && this.remove();
	}
	length() {
		return 0;
	}
	value() {
		return "";
	}
};
jh.blotName = "break", jh.tagName = "BR";
//#endregion
//#region node_modules/quill/blots/text.js
var Mh = class extends wh {}, Nh = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function Ph(e) {
	return e.replace(/[&<>"']/g, (e) => Nh[e]);
}
//#endregion
//#region node_modules/quill/blots/inline.js
var Fh = class e extends ph {
	static allowedChildren = [
		e,
		jh,
		vh,
		Mh
	];
	static order = [
		"cursor",
		"inline",
		"link",
		"underline",
		"strike",
		"italic",
		"bold",
		"script",
		"code"
	];
	static compare(t, n) {
		let r = e.order.indexOf(t), i = e.order.indexOf(n);
		return r >= 0 || i >= 0 ? r - i : t === n ? 0 : t < n ? -1 : 1;
	}
	formatAt(t, n, r, i) {
		if (e.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, X.BLOT)) {
			let e = this.isolate(t, n);
			i && e.wrap(r, i);
		} else super.formatAt(t, n, r, i);
	}
	optimize(t) {
		if (super.optimize(t), this.parent instanceof e && e.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
			let e = this.parent.isolate(this.offset(), this.length());
			this.moveChildren(e), e.wrap(this);
		}
	}
}, Ih = 1, Lh = class extends hh {
	cache = {};
	delta() {
		return this.cache.delta ?? (this.cache.delta = zh(this)), this.cache.delta;
	}
	deleteAt(e, t) {
		super.deleteAt(e, t), this.cache = {};
	}
	formatAt(e, t, n, r) {
		t <= 0 || (this.scroll.query(n, X.BLOCK) ? e + t === this.length() && this.format(n, r) : super.formatAt(e, Math.min(t, this.length() - e - 1), n, r), this.cache = {});
	}
	insertAt(e, t, n) {
		if (n != null) {
			super.insertAt(e, t, n), this.cache = {};
			return;
		}
		if (t.length === 0) return;
		let r = t.split("\n"), i = r.shift();
		i.length > 0 && (e < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(e, this.length() - 1), i) : this.children.tail.insertAt(this.children.tail.length(), i), this.cache = {});
		let a = this;
		r.reduce((e, t) => (a = a.split(e, !0), a.insertAt(0, t), t.length), e + i.length);
	}
	insertBefore(e, t) {
		let { head: n } = this.children;
		super.insertBefore(e, t), n instanceof jh && n.remove(), this.cache = {};
	}
	length() {
		return this.cache.length ?? (this.cache.length = super.length() + Ih), this.cache.length;
	}
	moveChildren(e, t) {
		super.moveChildren(e, t), this.cache = {};
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
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
		if (t && (e === 0 || e >= this.length() - Ih)) {
			let t = this.clone();
			return e === 0 ? (this.parent.insertBefore(t, this), this) : (this.parent.insertBefore(t, this.next), t);
		}
		let n = super.split(e, t);
		return this.cache = {}, n;
	}
};
Lh.blotName = "block", Lh.tagName = "P", Lh.defaultChild = jh, Lh.allowedChildren = [
	jh,
	Fh,
	vh,
	Mh
];
var Rh = class extends vh {
	attach() {
		super.attach(), this.attributes = new nh(this.domNode);
	}
	delta() {
		return new Z.default().insert(this.value(), {
			...this.formats(),
			...this.attributes.values()
		});
	}
	format(e, t) {
		let n = this.scroll.query(e, X.BLOCK_ATTRIBUTE);
		n != null && this.attributes.attribute(n, t);
	}
	formatAt(e, t, n, r) {
		this.format(n, r);
	}
	insertAt(e, t, n) {
		if (n != null) {
			super.insertAt(e, t, n);
			return;
		}
		let r = t.split("\n"), i = r.pop(), a = r.map((e) => {
			let t = this.scroll.create(Lh.blotName);
			return t.insertAt(0, e), t;
		}), o = this.split(e);
		a.forEach((e) => {
			this.parent.insertBefore(e, o);
		}), i && this.parent.insertBefore(this.scroll.create("text", i), o);
	}
};
Rh.scope = X.BLOCK_BLOT;
function zh(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
	return e.descendants(oh).reduce((e, n) => n.length() === 0 ? e : e.insert(n.value(), Bh(n, {}, t)), new Z.default()).insert("\n", Bh(e));
}
function Bh(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
	return e == null || ("formats" in e && typeof e.formats == "function" && (t = {
		...t,
		...e.formats()
	}, n && delete t["code-token"]), e.parent == null || e.parent.statics.blotName === "scroll" || e.parent.statics.scope !== e.statics.scope) ? t : Bh(e.parent, t, n);
}
//#endregion
//#region node_modules/quill/blots/cursor.js
var Vh = class e extends vh {
	static blotName = "cursor";
	static className = "ql-cursor";
	static tagName = "span";
	static CONTENTS = "﻿";
	static value() {}
	constructor(t, n, r) {
		super(t, n), this.selection = r, this.textNode = document.createTextNode(e.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
	}
	detach() {
		this.parent != null && this.parent.removeChild(this);
	}
	format(t, n) {
		if (this.savedLength !== 0) {
			super.format(t, n);
			return;
		}
		let r = this, i = 0;
		for (; r != null && r.statics.scope !== X.BLOCK_BLOT;) i += r.offset(r.parent), r = r.parent;
		r != null && (this.savedLength = e.CONTENTS.length, r.optimize(), r.formatAt(i, e.CONTENTS.length, t, n), this.savedLength = 0);
	}
	index(e, t) {
		return e === this.textNode ? 0 : super.index(e, t);
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
		let t = this.selection.getNativeRange();
		for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode;) this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
		let n = this.prev instanceof Mh ? this.prev : null, r = n ? n.length() : 0, i = this.next instanceof Mh ? this.next : null, a = i ? i.text : "", { textNode: o } = this, s = o.data.split(e.CONTENTS).join("");
		o.data = e.CONTENTS;
		let c;
		if (n) c = n, (s || i) && (n.insertAt(n.length(), s + a), i && i.remove());
		else if (i) c = i, i.insertAt(0, s);
		else {
			let e = document.createTextNode(s);
			c = this.scroll.create(e), this.parent.insertBefore(c, this);
		}
		if (this.remove(), t) {
			let e = (e, t) => n && e === n.domNode ? t : e === o ? r + t - 1 : i && e === i.domNode ? r + s.length + t : null, a = e(t.start.node, t.start.offset), l = e(t.end.node, t.end.offset);
			if (a !== null && l !== null) return {
				startNode: c.domNode,
				startOffset: a,
				endNode: c.domNode,
				endOffset: l
			};
		}
		return null;
	}
	update(e, t) {
		if (e.some((e) => e.type === "characterData" && e.target === this.textNode)) {
			let e = this.restore();
			e && (t.range = e);
		}
	}
	optimize(t) {
		super.optimize(t);
		let { parent: n } = this;
		for (; n;) {
			if (n.domNode.tagName === "A") {
				this.savedLength = e.CONTENTS.length, n.isolate(this.offset(n), this.length()).unwrap(), this.savedLength = 0;
				break;
			}
			n = n.parent;
		}
	}
	value() {
		return "";
	}
}, Hh = /* @__PURE__ */ ne((/* @__PURE__ */ D(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})))(), 1), Uh = /* @__PURE__ */ new WeakMap(), Wh = [
	"error",
	"warn",
	"log",
	"info"
], Gh = "warn";
function Kh(e) {
	if (Gh && Wh.indexOf(e) <= Wh.indexOf(Gh)) {
		var t = [...arguments].slice(1);
		console[e](...t);
	}
}
function qh(e) {
	return Wh.reduce((t, n) => (t[n] = Kh.bind(console, n, e), t), {});
}
qh.level = (e) => {
	Gh = e;
}, Kh.level = qh.level;
//#endregion
//#region node_modules/quill/core/emitter.js
var Jh = qh("quill:events");
[
	"selectionchange",
	"mousedown",
	"mouseup",
	"click"
].forEach((e) => {
	document.addEventListener(e, function() {
		var e = [...arguments];
		Array.from(document.querySelectorAll(".ql-container")).forEach((t) => {
			let n = Uh.get(t);
			n && n.emitter && n.emitter.handleDOM(...e);
		});
	});
});
var Q = class extends Hh.default {
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
		super(), this.domListeners = {}, this.on("error", Jh.error);
	}
	emit() {
		var e = [...arguments];
		return Jh.log.call(Jh, ...e), super.emit(...e);
	}
	handleDOM(e) {
		var t = [...arguments].slice(1);
		(this.domListeners[e.type] || []).forEach((n) => {
			let { node: r, handler: i } = n;
			(e.target === r || r.contains(e.target)) && i(e, ...t);
		});
	}
	listenDOM(e, t, n) {
		this.domListeners[e] || (this.domListeners[e] = []), this.domListeners[e].push({
			node: t,
			handler: n
		});
	}
}, Yh = qh("quill:selection"), Xh = class {
	constructor(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		this.index = e, this.length = t;
	}
}, Zh = class {
	constructor(e, t) {
		this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new Xh(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
			!this.mouseDown && !this.composing && setTimeout(this.update.bind(this, Q.sources.USER), 1);
		}), this.emitter.on(Q.events.SCROLL_BEFORE_UPDATE, () => {
			if (!this.hasFocus()) return;
			let e = this.getNativeRange();
			e != null && e.start.node !== this.cursor.textNode && this.emitter.once(Q.events.SCROLL_UPDATE, (t, n) => {
				try {
					this.root.contains(e.start.node) && this.root.contains(e.end.node) && this.setNativeRange(e.start.node, e.start.offset, e.end.node, e.end.offset);
					let r = n.some((e) => e.type === "characterData" || e.type === "childList" || e.type === "attributes" && e.target === this.root);
					this.update(r ? Q.sources.SILENT : t);
				} catch {}
			});
		}), this.emitter.on(Q.events.SCROLL_OPTIMIZE, (e, t) => {
			if (t.range) {
				let { startNode: e, startOffset: n, endNode: r, endOffset: i } = t.range;
				this.setNativeRange(e, n, r, i), this.update(Q.sources.SILENT);
			}
		}), this.update(Q.sources.SILENT);
	}
	handleComposition() {
		this.emitter.on(Q.events.COMPOSITION_BEFORE_START, () => {
			this.composing = !0;
		}), this.emitter.on(Q.events.COMPOSITION_END, () => {
			if (this.composing = !1, this.cursor.parent) {
				let e = this.cursor.restore();
				if (!e) return;
				setTimeout(() => {
					this.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset);
				}, 1);
			}
		});
	}
	handleDragging() {
		this.emitter.listenDOM("mousedown", document.body, () => {
			this.mouseDown = !0;
		}), this.emitter.listenDOM("mouseup", document.body, () => {
			this.mouseDown = !1, this.update(Q.sources.USER);
		});
	}
	focus() {
		this.hasFocus() || (this.root.focus({ preventScroll: !0 }), this.setRange(this.savedRange));
	}
	format(e, t) {
		this.scroll.update();
		let n = this.getNativeRange();
		if (!(n == null || !n.native.collapsed || this.scroll.query(e, X.BLOCK))) {
			if (n.start.node !== this.cursor.textNode) {
				let e = this.scroll.find(n.start.node, !1);
				if (e == null) return;
				if (e instanceof oh) {
					let t = e.split(n.start.offset);
					e.parent.insertBefore(this.cursor, t);
				} else e.insertBefore(this.cursor, n.start.node);
				this.cursor.attach();
			}
			this.cursor.format(e, t), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
		}
	}
	getBounds(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = this.scroll.length();
		e = Math.min(e, n - 1), t = Math.min(e + t, n - 1) - e;
		let r, [i, a] = this.scroll.leaf(e);
		if (i == null) return null;
		if (t > 0 && a === i.length()) {
			let [t] = this.scroll.leaf(e + 1);
			if (t) {
				let [n] = this.scroll.line(e), [r] = this.scroll.line(e + 1);
				n === r && (i = t, a = 0);
			}
		}
		[r, a] = i.position(a, !0);
		let o = document.createRange();
		if (t > 0) return o.setStart(r, a), [i, a] = this.scroll.leaf(e + t), i == null ? null : ([r, a] = i.position(a, !0), o.setEnd(r, a), o.getBoundingClientRect());
		let s = "left", c;
		if (r instanceof Text) {
			if (!r.data.length) return null;
			a < r.data.length ? (o.setStart(r, a), o.setEnd(r, a + 1)) : (o.setStart(r, a - 1), o.setEnd(r, a), s = "right"), c = o.getBoundingClientRect();
		} else {
			if (!(i.domNode instanceof Element)) return null;
			c = i.domNode.getBoundingClientRect(), a > 0 && (s = "right");
		}
		return {
			bottom: c.top + c.height,
			height: c.height,
			left: c[s],
			right: c[s],
			top: c.top,
			width: 0
		};
	}
	getNativeRange() {
		let e = document.getSelection();
		if (e == null || e.rangeCount <= 0) return null;
		let t = e.getRangeAt(0);
		if (t == null) return null;
		let n = this.normalizeNative(t);
		return Yh.info("getNativeRange", n), n;
	}
	getRange() {
		let e = this.scroll.domNode;
		if ("isConnected" in e && !e.isConnected) return [null, null];
		let t = this.getNativeRange();
		return t == null ? [null, null] : [this.normalizedToRange(t), t];
	}
	hasFocus() {
		return document.activeElement === this.root || document.activeElement != null && Qh(this.root, document.activeElement);
	}
	normalizedToRange(e) {
		let t = [[e.start.node, e.start.offset]];
		e.native.collapsed || t.push([e.end.node, e.end.offset]);
		let n = t.map((e) => {
			let [t, n] = e, r = this.scroll.find(t, !0), i = r.offset(this.scroll);
			return n === 0 ? i : r instanceof oh ? i + r.index(t, n) : i + r.length();
		}), r = Math.min(Math.max(...n), this.scroll.length() - 1), i = Math.min(r, ...n);
		return new Xh(i, r - i);
	}
	normalizeNative(e) {
		if (!Qh(this.root, e.startContainer) || !e.collapsed && !Qh(this.root, e.endContainer)) return null;
		let t = {
			start: {
				node: e.startContainer,
				offset: e.startOffset
			},
			end: {
				node: e.endContainer,
				offset: e.endOffset
			},
			native: e
		};
		return [t.start, t.end].forEach((e) => {
			let { node: t, offset: n } = e;
			for (; !(t instanceof Text) && t.childNodes.length > 0;) if (t.childNodes.length > n) t = t.childNodes[n], n = 0;
			else if (t.childNodes.length === n) t = t.lastChild, n = t instanceof Text ? t.data.length : t.childNodes.length > 0 ? t.childNodes.length : t.childNodes.length + 1;
			else break;
			e.node = t, e.offset = n;
		}), t;
	}
	rangeToNative(e) {
		let t = this.scroll.length(), n = (e, n) => {
			e = Math.min(t - 1, e);
			let [r, i] = this.scroll.leaf(e);
			return r ? r.position(i, n) : [null, -1];
		};
		return [...n(e.index, !1), ...n(e.index + e.length, !0)];
	}
	setNativeRange(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
		if (Yh.info("setNativeRange", e, t, n, r), e != null && (this.root.parentNode == null || e.parentNode == null || n.parentNode == null)) return;
		let a = document.getSelection();
		if (a != null) if (e != null) {
			this.hasFocus() || this.root.focus({ preventScroll: !0 });
			let { native: o } = this.getNativeRange() || {};
			if (o == null || i || e !== o.startContainer || t !== o.startOffset || n !== o.endContainer || r !== o.endOffset) {
				e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), n instanceof Element && n.tagName === "BR" && (r = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
				let i = document.createRange();
				i.setStart(e, t), i.setEnd(n, r), a.removeAllRanges(), a.addRange(i);
			}
		} else a.removeAllRanges(), this.root.blur();
	}
	setRange(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Q.sources.API;
		if (typeof t == "string" && (n = t, t = !1), Yh.info("setRange", e), e != null) {
			let n = this.rangeToNative(e);
			this.setNativeRange(...n, t);
		} else this.setNativeRange(null);
		this.update(n);
	}
	update() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Q.sources.USER, t = this.lastRange, [n, r] = this.getRange();
		if (this.lastRange = n, this.lastNative = r, this.lastRange != null && (this.savedRange = this.lastRange), !Gm(t, this.lastRange)) {
			if (!this.composing && r != null && r.native.collapsed && r.start.node !== this.cursor.textNode) {
				let e = this.cursor.restore();
				e && this.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset);
			}
			let n = [
				Q.events.SELECTION_CHANGE,
				$p(this.lastRange),
				$p(t),
				e
			];
			this.emitter.emit(Q.events.EDITOR_CHANGE, ...n), e !== Q.sources.SILENT && this.emitter.emit(...n);
		}
	}
};
function Qh(e, t) {
	try {
		t.parentNode;
	} catch {
		return !1;
	}
	return e.contains(t);
}
//#endregion
//#region node_modules/quill/core/editor.js
var $h = /^[ -~]*$/, eg = class {
	constructor(e) {
		this.scroll = e, this.delta = this.getDelta();
	}
	applyDelta(e) {
		this.scroll.update();
		let t = this.scroll.length();
		this.scroll.batchStart();
		let n = ag(e), r = new Z.default();
		return sg(n.ops.slice()).reduce((e, n) => {
			let i = Z.Op.length(n), a = n.attributes || {}, o = !1, s = !1;
			if (n.insert != null) {
				if (r.retain(i), typeof n.insert == "string") {
					let r = n.insert;
					s = !r.endsWith("\n") && (t <= e || !!this.scroll.descendant(Rh, e)[0]), this.scroll.insertAt(e, r);
					let [i, o] = this.scroll.line(e), c = Km({}, Bh(i));
					if (i instanceof Lh) {
						let [e] = i.descendant(oh, o);
						e && (c = Km(c, Bh(e)));
					}
					a = Z.AttributeMap.diff(c, a) || {};
				} else if (typeof n.insert == "object") {
					let r = Object.keys(n.insert)[0];
					if (r == null) return e;
					let i = this.scroll.query(r, X.INLINE) != null;
					if (i) (t <= e || this.scroll.descendant(Rh, e)[0]) && (s = !0);
					else if (e > 0) {
						let [t, n] = this.scroll.descendant(oh, e - 1);
						t instanceof Mh ? t.value()[n] !== "\n" && (o = !0) : t instanceof vh && t.statics.scope === X.INLINE_BLOT && (o = !0);
					}
					if (this.scroll.insertAt(e, r, n.insert[r]), i) {
						let [t] = this.scroll.descendant(oh, e);
						if (t) {
							let e = Km({}, Bh(t));
							a = Z.AttributeMap.diff(e, a) || {};
						}
					}
				}
				t += i;
			} else if (r.push(n), n.retain !== null && typeof n.retain == "object") {
				let t = Object.keys(n.retain)[0];
				if (t == null) return e;
				this.scroll.updateEmbedAt(e, t, n.retain[t]);
			}
			Object.keys(a).forEach((t) => {
				this.scroll.formatAt(e, i, t, a[t]);
			});
			let c = +!!o, l = +!!s;
			return t += c + l, r.retain(c), r.delete(l), e + i + c + l;
		}, 0), r.reduce((e, t) => typeof t.delete == "number" ? (this.scroll.deleteAt(e, t.delete), e) : e + Z.Op.length(t), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
	}
	deleteText(e, t) {
		return this.scroll.deleteAt(e, t), this.update(new Z.default().retain(e).delete(t));
	}
	formatLine(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		this.scroll.update(), Object.keys(n).forEach((r) => {
			this.scroll.lines(e, Math.max(t, 1)).forEach((e) => {
				e.format(r, n[r]);
			});
		}), this.scroll.optimize();
		let r = new Z.default().retain(e).retain(t, $p(n));
		return this.update(r);
	}
	formatText(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		Object.keys(n).forEach((r) => {
			this.scroll.formatAt(e, t, r, n[r]);
		});
		let r = new Z.default().retain(e).retain(t, $p(n));
		return this.update(r);
	}
	getContents(e, t) {
		return this.delta.slice(e, e + t);
	}
	getDelta() {
		return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new Z.default());
	}
	getFormat(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], r = [];
		t === 0 ? this.scroll.path(e).forEach((e) => {
			let [t] = e;
			t instanceof Lh ? n.push(t) : t instanceof oh && r.push(t);
		}) : (n = this.scroll.lines(e, t), r = this.scroll.descendants(oh, e, t));
		let [i, a] = [n, r].map((e) => {
			let t = e.shift();
			if (t == null) return {};
			let n = Bh(t);
			for (; Object.keys(n).length > 0;) {
				let t = e.shift();
				if (t == null) return n;
				n = rg(Bh(t), n);
			}
			return n;
		});
		return {
			...i,
			...a
		};
	}
	getHTML(e, t) {
		let [n, r] = this.scroll.line(e);
		if (n) {
			let i = n.length();
			return n.length() >= r + t && !(r === 0 && t === i) ? ng(n, r, t, !0) : ng(this.scroll, e, t, !0);
		}
		return "";
	}
	getText(e, t) {
		return this.getContents(e, t).filter((e) => typeof e.insert == "string").map((e) => e.insert).join("");
	}
	insertContents(e, t) {
		let n = ag(t), r = new Z.default().retain(e).concat(n);
		return this.scroll.insertContents(e, n), this.update(r);
	}
	insertEmbed(e, t, n) {
		return this.scroll.insertAt(e, t, n), this.update(new Z.default().retain(e).insert({ [t]: n }));
	}
	insertText(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		return t = t.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), this.scroll.insertAt(e, t), Object.keys(n).forEach((r) => {
			this.scroll.formatAt(e, t.length, r, n[r]);
		}), this.update(new Z.default().retain(e).insert(t, $p(n)));
	}
	isBlank() {
		if (this.scroll.children.length === 0) return !0;
		if (this.scroll.children.length > 1) return !1;
		let e = this.scroll.children.head;
		if (e?.statics.blotName !== Lh.blotName) return !1;
		let t = e;
		return t.children.length > 1 ? !1 : t.children.head instanceof jh;
	}
	removeFormat(e, t) {
		let n = this.getText(e, t), [r, i] = this.scroll.line(e + t), a = 0, o = new Z.default();
		r != null && (a = r.length() - i, o = r.delta().slice(i, i + a - 1).insert("\n"));
		let s = this.getContents(e, t + a).diff(new Z.default().insert(n).concat(o)), c = new Z.default().retain(e).concat(s);
		return this.applyDelta(c);
	}
	update(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, r = this.delta;
		if (t.length === 1 && t[0].type === "characterData" && t[0].target.data.match($h) && this.scroll.find(t[0].target)) {
			let i = this.scroll.find(t[0].target), a = Bh(i), o = i.offset(this.scroll), s = t[0].oldValue.replace(Vh.CONTENTS, ""), c = new Z.default().insert(s), l = new Z.default().insert(i.value()), u = n && {
				oldRange: og(n.oldRange, -o),
				newRange: og(n.newRange, -o)
			};
			e = new Z.default().retain(o).concat(c.diff(l, u)).reduce((e, t) => t.insert ? e.insert(t.insert, a) : e.push(t), new Z.default()), this.delta = r.compose(e);
		} else this.delta = this.getDelta(), (!e || !Gm(r.compose(e), this.delta)) && (e = r.diff(this.delta, n));
		return e;
	}
};
function tg(e, t, n) {
	if (e.length === 0) {
		let [e] = ig(n.pop());
		return t <= 0 ? `</li></${e}>` : `</li></${e}>${tg([], t - 1, n)}`;
	}
	let [{ child: r, offset: i, length: a, indent: o, type: s }, ...c] = e, [l, u] = ig(s);
	if (o > t) return n.push(s), o === t + 1 ? `<${l}><li${u}>${ng(r, i, a)}${tg(c, o, n)}` : `<${l}><li>${tg(e, t + 1, n)}`;
	let d = n[n.length - 1];
	if (o === t && s === d) return `</li><li${u}>${ng(r, i, a)}${tg(c, o, n)}`;
	let [f] = ig(n.pop());
	return `</li></${f}>${tg(e, t - 1, n)}`;
}
function ng(e, t, n) {
	let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
	if ("html" in e && typeof e.html == "function") return e.html(t, n);
	if (e instanceof Mh) return Ph(e.value().slice(t, t + n)).replaceAll(" ", "&nbsp;");
	if (e instanceof uh) {
		if (e.statics.blotName === "list-container") {
			let r = [];
			return e.children.forEachAt(t, n, (e, t, n) => {
				let i = "formats" in e && typeof e.formats == "function" ? e.formats() : {};
				r.push({
					child: e,
					offset: t,
					length: n,
					indent: i.indent || 0,
					type: i.list
				});
			}), tg(r, -1, []);
		}
		let i = [];
		if (e.children.forEachAt(t, n, (e, t, n) => {
			i.push(ng(e, t, n));
		}), r || e.statics.blotName === "list") return i.join("");
		let { outerHTML: a, innerHTML: o } = e.domNode, [s, c] = a.split(`>${o}<`);
		return s === "<table" ? `<table style="border: 1px solid #000;">${i.join("")}<${c}` : `${s}>${i.join("")}<${c}`;
	}
	return e.domNode instanceof Element ? e.domNode.outerHTML : "";
}
function rg(e, t) {
	return Object.keys(t).reduce((n, r) => {
		if (e[r] == null) return n;
		let i = t[r];
		return i === e[r] ? n[r] = i : Array.isArray(i) ? i.indexOf(e[r]) < 0 ? n[r] = i.concat([e[r]]) : n[r] = i : n[r] = [i, e[r]], n;
	}, {});
}
function ig(e) {
	let t = e === "ordered" ? "ol" : "ul";
	switch (e) {
		case "checked": return [t, " data-list=\"checked\""];
		case "unchecked": return [t, " data-list=\"unchecked\""];
		default: return [t, ""];
	}
}
function ag(e) {
	return e.reduce((e, t) => {
		if (typeof t.insert == "string") {
			let n = t.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
			return e.insert(n, t.attributes);
		}
		return e.push(t);
	}, new Z.default());
}
function og(e, t) {
	let { index: n, length: r } = e;
	return new Xh(n + t, r);
}
function sg(e) {
	let t = [];
	return e.forEach((e) => {
		typeof e.insert == "string" ? e.insert.split("\n").forEach((n, r) => {
			r && t.push({
				insert: "\n",
				attributes: e.attributes
			}), n && t.push({
				insert: n,
				attributes: e.attributes
			});
		}) : t.push(e);
	}), t;
}
//#endregion
//#region node_modules/quill/core/module.js
var cg = class {
	static DEFAULTS = {};
	constructor(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		this.quill = e, this.options = t;
	}
}, lg = "﻿", ug = class extends vh {
	constructor(e, t) {
		super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((e) => {
			this.contentNode.appendChild(e);
		}), this.leftGuard = document.createTextNode(lg), this.rightGuard = document.createTextNode(lg), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
	}
	index(e, t) {
		return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
	}
	restore(e) {
		let t = null, n, r = e.data.split(lg).join("");
		if (e === this.leftGuard) if (this.prev instanceof Mh) {
			let e = this.prev.length();
			this.prev.insertAt(e, r), t = {
				startNode: this.prev.domNode,
				startOffset: e + r.length
			};
		} else n = document.createTextNode(r), this.parent.insertBefore(this.scroll.create(n), this), t = {
			startNode: n,
			startOffset: r.length
		};
		else e === this.rightGuard && (this.next instanceof Mh ? (this.next.insertAt(0, r), t = {
			startNode: this.next.domNode,
			startOffset: r.length
		}) : (n = document.createTextNode(r), this.parent.insertBefore(this.scroll.create(n), this.next), t = {
			startNode: n,
			startOffset: r.length
		}));
		return e.data = lg, t;
	}
	update(e, t) {
		e.forEach((e) => {
			if (e.type === "characterData" && (e.target === this.leftGuard || e.target === this.rightGuard)) {
				let n = this.restore(e.target);
				n && (t.range = n);
			}
		});
	}
}, dg = class {
	isComposing = !1;
	constructor(e, t) {
		this.scroll = e, this.emitter = t, this.setupListeners();
	}
	setupListeners() {
		this.scroll.domNode.addEventListener("compositionstart", (e) => {
			this.isComposing || this.handleCompositionStart(e);
		}), this.scroll.domNode.addEventListener("compositionend", (e) => {
			this.isComposing && queueMicrotask(() => {
				this.handleCompositionEnd(e);
			});
		});
	}
	handleCompositionStart(e) {
		let t = e.target instanceof Node ? this.scroll.find(e.target, !0) : null;
		t && !(t instanceof ug) && (this.emitter.emit(Q.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(Q.events.COMPOSITION_START, e), this.isComposing = !0);
	}
	handleCompositionEnd(e) {
		this.emitter.emit(Q.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(Q.events.COMPOSITION_END, e), this.isComposing = !1;
	}
}, fg = class e {
	static DEFAULTS = { modules: {} };
	static themes = { default: e };
	modules = {};
	constructor(e, t) {
		this.quill = e, this.options = t;
	}
	init() {
		Object.keys(this.options.modules).forEach((e) => {
			this.modules[e] ?? this.addModule(e);
		});
	}
	addModule(e) {
		let t = this.quill.constructor.import(`modules/${e}`);
		return this.modules[e] = new t(this.quill, this.options.modules[e] || {}), this.modules[e];
	}
}, pg = (e) => e.parentElement || e.getRootNode().host || null, mg = (e) => {
	let t = e.getBoundingClientRect(), n = "offsetWidth" in e && Math.abs(t.width) / e.offsetWidth || 1, r = "offsetHeight" in e && Math.abs(t.height) / e.offsetHeight || 1;
	return {
		top: t.top,
		right: t.left + e.clientWidth * n,
		bottom: t.top + e.clientHeight * r,
		left: t.left
	};
}, hg = (e) => {
	let t = parseInt(e, 10);
	return Number.isNaN(t) ? 0 : t;
}, gg = (e, t, n, r, i, a) => e < n && t > r ? 0 : e < n ? -(n - e + i) : t > r ? t - e > r - n ? e + i - n : t - r + a : 0, _g = (e, t) => {
	let n = e.ownerDocument, r = t, i = e;
	for (; i;) {
		let e = i === n.body, t = e ? {
			top: 0,
			right: window.visualViewport?.width ?? n.documentElement.clientWidth,
			bottom: window.visualViewport?.height ?? n.documentElement.clientHeight,
			left: 0
		} : mg(i), a = getComputedStyle(i), o = gg(r.left, r.right, t.left, t.right, hg(a.scrollPaddingLeft), hg(a.scrollPaddingRight)), s = gg(r.top, r.bottom, t.top, t.bottom, hg(a.scrollPaddingTop), hg(a.scrollPaddingBottom));
		if (o || s) if (e) n.defaultView?.scrollBy(o, s);
		else {
			let { scrollLeft: e, scrollTop: t } = i;
			s && (i.scrollTop += s), o && (i.scrollLeft += o);
			let n = i.scrollLeft - e, a = i.scrollTop - t;
			r = {
				left: r.left - n,
				top: r.top - a,
				right: r.right - n,
				bottom: r.bottom - a
			};
		}
		i = e || a.position === "fixed" ? null : pg(i);
	}
}, vg = 100, yg = [
	"block",
	"break",
	"cursor",
	"inline",
	"scroll",
	"text"
], bg = (e, t, n) => {
	let r = new Zm();
	return yg.forEach((e) => {
		let n = t.query(e);
		n && r.register(n);
	}), e.forEach((e) => {
		let i = t.query(e);
		i || n.error(`Cannot register "${e}" specified in "formats" config. Are you sure it was registered?`);
		let a = 0;
		for (; i;) if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, a += 1, a > vg) {
			n.error(`Cycle detected in registering blot requiredContainer: "${e}"`);
			break;
		}
	}), r;
}, xg = qh("quill"), Sg = new Zm();
uh.uiClass = "ql-ui";
var $ = class e {
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
		registry: Sg,
		theme: "default"
	};
	static events = Q.events;
	static sources = Q.sources;
	static version = "2.0.3";
	static imports = {
		delta: Z.default,
		parchment: qm,
		"core/module": cg,
		"core/theme": fg
	};
	static debug(e) {
		e === !0 && (e = "log"), qh.level(e);
	}
	static find(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
		return Uh.get(e) || Sg.find(e, t);
	}
	static import(e) {
		return this.imports[e] ?? xg.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
	}
	static register() {
		if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
			let e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in e ? e.attrName : e.blotName;
			typeof n == "string" ? this.register(`formats/${n}`, e, t) : Object.keys(e).forEach((n) => {
				this.register(n, e[n], t);
			});
		} else {
			let e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
			this.imports[e] != null && !n && xg.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Sg.register(t), typeof t.register == "function" && t.register(Sg);
		}
	}
	constructor(t) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (this.options = Eg(t, n), this.container = this.options.container, this.container == null) {
			xg.error("Invalid Quill container", t);
			return;
		}
		this.options.debug && e.debug(this.options.debug);
		let r = this.container.innerHTML.trim();
		this.container.classList.add("ql-container"), this.container.innerHTML = "", Uh.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new Q();
		let i = Sh.blotName, a = this.options.registry.query(i);
		if (!a || !("blotName" in a)) throw Error(`Cannot initialize Quill without "${i}" blot`);
		if (this.scroll = new a(this.options.registry, this.root, { emitter: this.emitter }), this.editor = new eg(this.scroll), this.selection = new Zh(this.scroll, this.emitter), this.composition = new dg(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(Q.events.EDITOR_CHANGE, (e) => {
			e === Q.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
		}), this.emitter.on(Q.events.SCROLL_UPDATE, (e, t) => {
			let n = this.selection.lastRange, [r] = this.selection.getRange(), i = n && r ? {
				oldRange: n,
				newRange: r
			} : void 0;
			Dg.call(this, () => this.editor.update(null, t, i), e);
		}), this.emitter.on(Q.events.SCROLL_EMBED_UPDATE, (t, n) => {
			let r = this.selection.lastRange, [i] = this.selection.getRange(), a = r && i ? {
				oldRange: r,
				newRange: i
			} : void 0;
			Dg.call(this, () => {
				let e = new Z.default().retain(t.offset(this)).retain({ [t.statics.blotName]: n });
				return this.editor.update(e, [], a);
			}, e.sources.USER);
		}), r) {
			let e = this.clipboard.convert({
				html: `${r}<p><br></p>`,
				text: "\n"
			});
			this.setContents(e);
		}
		this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
	}
	addContainer(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
		if (typeof e == "string") {
			let t = e;
			e = document.createElement("div"), e.classList.add(t);
		}
		return this.container.insertBefore(e, t), e;
	}
	blur() {
		this.selection.setRange(null);
	}
	deleteText(e, t, n) {
		return [e, t, , n] = Og(e, t, n), Dg.call(this, () => this.editor.deleteText(e, t), n, e, -1 * t);
	}
	disable() {
		this.enable(!1);
	}
	editReadOnly(e) {
		this.allowReadOnlyEdits = !0;
		let t = e();
		return this.allowReadOnlyEdits = !1, t;
	}
	enable() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
		this.scroll.enable(e), this.container.classList.toggle("ql-disabled", !e);
	}
	focus() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		this.selection.focus(), e.preventScroll || this.scrollSelectionIntoView();
	}
	format(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Q.sources.API;
		return Dg.call(this, () => {
			let n = this.getSelection(!0), r = new Z.default();
			if (n == null) return r;
			if (this.scroll.query(e, X.BLOCK)) r = this.editor.formatLine(n.index, n.length, { [e]: t });
			else if (n.length === 0) return this.selection.format(e, t), r;
			else r = this.editor.formatText(n.index, n.length, { [e]: t });
			return this.setSelection(n, Q.sources.SILENT), r;
		}, n);
	}
	formatLine(e, t, n, r, i) {
		let a;
		return [e, t, a, i] = Og(e, t, n, r, i), Dg.call(this, () => this.editor.formatLine(e, t, a), i, e, 0);
	}
	formatText(e, t, n, r, i) {
		let a;
		return [e, t, a, i] = Og(e, t, n, r, i), Dg.call(this, () => this.editor.formatText(e, t, a), i, e, 0);
	}
	getBounds(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = null;
		if (n = typeof e == "number" ? this.selection.getBounds(e, t) : this.selection.getBounds(e.index, e.length), !n) return null;
		let r = this.container.getBoundingClientRect();
		return {
			bottom: n.bottom - r.top,
			height: n.height,
			left: n.left - r.left,
			right: n.right - r.left,
			top: n.top - r.top,
			width: n.width
		};
	}
	getContents() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - e;
		return [e, t] = Og(e, t), this.editor.getContents(e, t);
	}
	getFormat() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		return typeof e == "number" ? this.editor.getFormat(e, t) : this.editor.getFormat(e.index, e.length);
	}
	getIndex(e) {
		return e.offset(this.scroll);
	}
	getLength() {
		return this.scroll.length();
	}
	getLeaf(e) {
		return this.scroll.leaf(e);
	}
	getLine(e) {
		return this.scroll.line(e);
	}
	getLines() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
		return typeof e == "number" ? this.scroll.lines(e, t) : this.scroll.lines(e.index, e.length);
	}
	getModule(e) {
		return this.theme.modules[e];
	}
	getSelection() {
		return arguments.length > 0 && arguments[0] !== void 0 && arguments[0] && this.focus(), this.update(), this.selection.getRange()[0];
	}
	getSemanticHTML() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
		return typeof e == "number" && (t ??= this.getLength() - e), [e, t] = Og(e, t), this.editor.getHTML(e, t);
	}
	getText() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
		return typeof e == "number" && (t ??= this.getLength() - e), [e, t] = Og(e, t), this.editor.getText(e, t);
	}
	hasFocus() {
		return this.selection.hasFocus();
	}
	insertEmbed(t, n, r) {
		let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : e.sources.API;
		return Dg.call(this, () => this.editor.insertEmbed(t, n, r), i, t);
	}
	insertText(e, t, n, r, i) {
		let a;
		return [e, , a, i] = Og(e, 0, n, r, i), Dg.call(this, () => this.editor.insertText(e, t, a), i, e, t.length);
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
	removeFormat(e, t, n) {
		return [e, t, , n] = Og(e, t, n), Dg.call(this, () => this.editor.removeFormat(e, t), n, e);
	}
	scrollRectIntoView(e) {
		_g(this.root, e);
	}
	scrollIntoView() {
		console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."), this.scrollSelectionIntoView();
	}
	scrollSelectionIntoView() {
		let e = this.selection.lastRange, t = e && this.selection.getBounds(e.index, e.length);
		t && this.scrollRectIntoView(t);
	}
	setContents(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Q.sources.API;
		return Dg.call(this, () => {
			e = new Z.default(e);
			let t = this.getLength(), n = this.editor.deleteText(0, t), r = this.editor.insertContents(0, e), i = this.editor.deleteText(this.getLength() - 1, 1);
			return n.compose(r).compose(i);
		}, t);
	}
	setSelection(t, n, r) {
		t == null ? this.selection.setRange(null, n || e.sources.API) : ([t, n, , r] = Og(t, n, r), this.selection.setRange(new Xh(Math.max(0, t), n), r), r !== Q.sources.SILENT && this.scrollSelectionIntoView());
	}
	setText(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Q.sources.API, n = new Z.default().insert(e);
		return this.setContents(n, t);
	}
	update() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Q.sources.USER, t = this.scroll.update(e);
		return this.selection.update(e), t;
	}
	updateContents(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Q.sources.API;
		return Dg.call(this, () => (e = new Z.default(e), this.editor.applyDelta(e)), t, !0);
	}
};
function Cg(e) {
	return typeof e == "string" ? document.querySelector(e) : e;
}
function wg(e) {
	return Object.entries(e ?? {}).reduce((e, t) => {
		let [n, r] = t;
		return {
			...e,
			[n]: r === !0 ? {} : r
		};
	}, {});
}
function Tg(e) {
	return Object.fromEntries(Object.entries(e).filter((e) => e[1] !== void 0));
}
function Eg(e, t) {
	let n = Cg(e);
	if (!n) throw Error("Invalid Quill container");
	let r = !t.theme || t.theme === $.DEFAULTS.theme ? fg : $.import(`themes/${t.theme}`);
	if (!r) throw Error(`Invalid theme ${t.theme}. Did you register it?`);
	let { modules: i, ...a } = $.DEFAULTS, { modules: o, ...s } = r.DEFAULTS, c = wg(t.modules);
	c != null && c.toolbar && c.toolbar.constructor !== Object && (c = {
		...c,
		toolbar: { container: c.toolbar }
	});
	let l = Km({}, wg(i), wg(o), c), u = {
		...a,
		...Tg(s),
		...Tg(t)
	}, d = t.registry;
	return d ? t.formats && xg.warn("Ignoring \"formats\" option because \"registry\" is specified") : d = t.formats ? bg(t.formats, u.registry, xg) : u.registry, {
		...u,
		registry: d,
		container: n,
		theme: r,
		modules: Object.entries(l).reduce((e, t) => {
			let [n, r] = t;
			if (!r) return e;
			let i = $.import(`modules/${n}`);
			return i == null ? (xg.error(`Cannot load ${n} module. Are you sure you registered it?`), e) : {
				...e,
				[n]: Km({}, i.DEFAULTS || {}, r)
			};
		}, {}),
		bounds: Cg(u.bounds)
	};
}
function Dg(e, t, n, r) {
	if (!this.isEnabled() && t === Q.sources.USER && !this.allowReadOnlyEdits) return new Z.default();
	let i = n == null ? null : this.getSelection(), a = this.editor.delta, o = e();
	if (i != null && (n === !0 && (n = i.index), r == null ? i = kg(i, o, t) : r !== 0 && (i = kg(i, n, r, t)), this.setSelection(i, Q.sources.SILENT)), o.length() > 0) {
		let e = [
			Q.events.TEXT_CHANGE,
			o,
			a,
			t
		];
		this.emitter.emit(Q.events.EDITOR_CHANGE, ...e), t !== Q.sources.SILENT && this.emitter.emit(...e);
	}
	return o;
}
function Og(e, t, n, r, i) {
	let a = {};
	return typeof e.index == "number" && typeof e.length == "number" ? typeof t == "number" ? (t = e.length, e = e.index) : (i = r, r = n, n = t, t = e.length, e = e.index) : typeof t != "number" && (i = r, r = n, n = t, t = 0), typeof n == "object" ? (a = n, i = r) : typeof n == "string" && (r == null ? i = n : a[n] = r), i ||= Q.sources.API, [
		e,
		t,
		a,
		i
	];
}
function kg(e, t, n, r) {
	let i = typeof n == "number" ? n : 0;
	if (e == null) return null;
	let a, o;
	return t && typeof t.transformPosition == "function" ? [a, o] = [e.index, e.index + e.length].map((e) => t.transformPosition(e, r !== Q.sources.USER)) : [a, o] = [e.index, e.index + e.length].map((e) => e < t || e === t && r === Q.sources.USER ? e : i >= 0 ? e + i : Math.max(t, e + i)), new Xh(a, o - a);
}
//#endregion
//#region node_modules/quill/blots/container.js
var Ag = class extends _h {};
//#endregion
//#region node_modules/quill/blots/scroll.js
function jg(e) {
	return e instanceof Lh || e instanceof Rh;
}
function Mg(e) {
	return typeof e.updateContent == "function";
}
var Ng = class extends Sh {
	static blotName = "scroll";
	static className = "ql-editor";
	static tagName = "DIV";
	static defaultChild = Lh;
	static allowedChildren = [
		Lh,
		Rh,
		Ag
	];
	constructor(e, t, n) {
		let { emitter: r } = n;
		super(e, t), this.emitter = r, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (e) => this.handleDragStart(e));
	}
	batchStart() {
		Array.isArray(this.batch) || (this.batch = []);
	}
	batchEnd() {
		if (!this.batch) return;
		let e = this.batch;
		this.batch = !1, this.update(e);
	}
	emitMount(e) {
		this.emitter.emit(Q.events.SCROLL_BLOT_MOUNT, e);
	}
	emitUnmount(e) {
		this.emitter.emit(Q.events.SCROLL_BLOT_UNMOUNT, e);
	}
	emitEmbedUpdate(e, t) {
		this.emitter.emit(Q.events.SCROLL_EMBED_UPDATE, e, t);
	}
	deleteAt(e, t) {
		let [n, r] = this.line(e), [i] = this.line(e + t);
		if (super.deleteAt(e, t), i != null && n !== i && r > 0) {
			if (n instanceof Rh || i instanceof Rh) {
				this.optimize();
				return;
			}
			let e = i.children.head instanceof jh ? null : i.children.head;
			n.moveChildren(i, e), n.remove();
		}
		this.optimize();
	}
	enable() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
		this.domNode.setAttribute("contenteditable", e ? "true" : "false");
	}
	formatAt(e, t, n, r) {
		super.formatAt(e, t, n, r), this.optimize();
	}
	insertAt(e, t, n) {
		if (e >= this.length()) if (n == null || this.scroll.query(t, X.BLOCK) == null) {
			let e = this.scroll.create(this.statics.defaultChild.blotName);
			this.appendChild(e), n == null && t.endsWith("\n") ? e.insertAt(0, t.slice(0, -1), n) : e.insertAt(0, t, n);
		} else {
			let e = this.scroll.create(t, n);
			this.appendChild(e);
		}
		else super.insertAt(e, t, n);
		this.optimize();
	}
	insertBefore(e, t) {
		if (e.statics.scope === X.INLINE_BLOT) {
			let n = this.scroll.create(this.statics.defaultChild.blotName);
			n.appendChild(e), super.insertBefore(n, t);
		} else super.insertBefore(e, t);
	}
	insertContents(e, t) {
		let n = this.deltaToRenderBlocks(t.concat(new Z.default().insert("\n"))), r = n.pop();
		if (r == null) return;
		this.batchStart();
		let i = n.shift();
		if (i) {
			let t = i.type === "block" && (i.delta.length() === 0 || !this.descendant(Rh, e)[0] && e < this.length()), n = i.type === "block" ? i.delta : new Z.default().insert({ [i.key]: i.value });
			Pg(this, e, n);
			let r = +(i.type === "block"), a = e + n.length() + r;
			t && this.insertAt(a - 1, "\n");
			let o = Bh(this.line(e)[0]), s = Z.AttributeMap.diff(o, i.attributes) || {};
			Object.keys(s).forEach((e) => {
				this.formatAt(a - 1, 1, e, s[e]);
			}), e = a;
		}
		let [a, o] = this.children.find(e);
		if (n.length && (a && (a = a.split(o), o = 0), n.forEach((e) => {
			if (e.type === "block") Pg(this.createBlock(e.attributes, a || void 0), 0, e.delta);
			else {
				let t = this.create(e.key, e.value);
				this.insertBefore(t, a || void 0), Object.keys(e.attributes).forEach((n) => {
					t.format(n, e.attributes[n]);
				});
			}
		})), r.type === "block" && r.delta.length()) {
			let e = a ? a.offset(a.scroll) + o : this.length();
			Pg(this, e, r.delta);
		}
		this.batchEnd(), this.optimize();
	}
	isEnabled() {
		return this.domNode.getAttribute("contenteditable") === "true";
	}
	leaf(e) {
		let t = this.path(e).pop();
		if (!t) return [null, -1];
		let [n, r] = t;
		return n instanceof oh ? [n, r] : [null, -1];
	}
	line(e) {
		return e === this.length() ? this.line(e - 1) : this.descendant(jg, e);
	}
	lines() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, n = (e, t, r) => {
			let i = [], a = r;
			return e.children.forEachAt(t, r, (e, t, r) => {
				jg(e) ? i.push(e) : e instanceof _h && (i = i.concat(n(e, t, a))), a -= r;
			}), i;
		};
		return n(this, e, t);
	}
	optimize() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		this.batch || (super.optimize(e, t), e.length > 0 && this.emitter.emit(Q.events.SCROLL_OPTIMIZE, e, t));
	}
	path(e) {
		return super.path(e).slice(1);
	}
	remove() {}
	update(e) {
		if (this.batch) {
			Array.isArray(e) && (this.batch = this.batch.concat(e));
			return;
		}
		let t = Q.sources.USER;
		typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((e) => {
			let { target: t } = e, n = this.find(t, !0);
			return n && !Mg(n);
		}), e.length > 0 && this.emitter.emit(Q.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(Q.events.SCROLL_UPDATE, t, e);
	}
	updateEmbedAt(e, t, n) {
		let [r] = this.descendant((e) => e instanceof Rh, e);
		r && r.statics.blotName === t && Mg(r) && r.updateContent(n);
	}
	handleDragStart(e) {
		e.preventDefault();
	}
	deltaToRenderBlocks(e) {
		let t = [], n = new Z.default();
		return e.forEach((e) => {
			let r = e?.insert;
			if (r) if (typeof r == "string") {
				let i = r.split("\n");
				i.slice(0, -1).forEach((r) => {
					n.insert(r, e.attributes), t.push({
						type: "block",
						delta: n,
						attributes: e.attributes ?? {}
					}), n = new Z.default();
				});
				let a = i[i.length - 1];
				a && n.insert(a, e.attributes);
			} else {
				let i = Object.keys(r)[0];
				if (!i) return;
				this.query(i, X.INLINE) ? n.push(e) : (n.length() && t.push({
					type: "block",
					delta: n,
					attributes: {}
				}), n = new Z.default(), t.push({
					type: "blockEmbed",
					key: i,
					value: r[i],
					attributes: e.attributes ?? {}
				}));
			}
		}), n.length() && t.push({
			type: "block",
			delta: n,
			attributes: {}
		}), t;
	}
	createBlock(e, t) {
		let n, r = {};
		Object.entries(e).forEach((e) => {
			let [t, i] = e;
			this.query(t, X.BLOCK & X.BLOT) == null ? r[t] = i : n = t;
		});
		let i = this.create(n || this.statics.defaultChild.blotName, n ? e[n] : void 0);
		this.insertBefore(i, t || void 0);
		let a = i.length();
		return Object.entries(r).forEach((e) => {
			let [t, n] = e;
			i.formatAt(0, a, t, n);
		}), i;
	}
};
function Pg(e, t, n) {
	n.reduce((t, n) => {
		let r = Z.Op.length(n), i = n.attributes || {};
		if (n.insert != null) {
			if (typeof n.insert == "string") {
				let r = n.insert;
				e.insertAt(t, r);
				let [a] = e.descendant(oh, t), o = Bh(a);
				i = Z.AttributeMap.diff(o, i) || {};
			} else if (typeof n.insert == "object") {
				let r = Object.keys(n.insert)[0];
				if (r == null) return t;
				if (e.insertAt(t, r, n.insert[r]), e.scroll.query(r, X.INLINE) != null) {
					let [n] = e.descendant(oh, t), r = Bh(n);
					i = Z.AttributeMap.diff(r, i) || {};
				}
			}
		}
		return Object.keys(i).forEach((n) => {
			e.formatAt(t, r, n, i[n]);
		}), t + r;
	}, t);
}
//#endregion
//#region node_modules/quill/formats/align.js
var Fg = {
	scope: X.BLOCK,
	whitelist: [
		"right",
		"center",
		"justify"
	]
}, Ig = new Jm("align", "align", Fg), Lg = new $m("align", "ql-align", Fg), Rg = new th("align", "text-align", Fg), zg = class extends th {
	value(e) {
		let t = super.value(e);
		return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((e) => `00${parseInt(e, 10).toString(16)}`.slice(-2)).join("")}`) : t;
	}
}, Bg = new $m("color", "ql-color", { scope: X.INLINE }), Vg = new zg("color", "color", { scope: X.INLINE }), Hg = new $m("background", "ql-bg", { scope: X.INLINE }), Ug = new zg("background", "background-color", { scope: X.INLINE }), Wg = class extends Ag {
	static create(e) {
		let t = super.create(e);
		return t.setAttribute("spellcheck", "false"), t;
	}
	code(e, t) {
		return this.children.map((e) => e.length() <= 1 ? "" : e.domNode.innerText).join("\n").slice(e, e + t);
	}
	html(e, t) {
		return `<pre>\n${Ph(this.code(e, t))}\n</pre>`;
	}
}, Gg = class extends Lh {
	static TAB = "  ";
	static register() {
		$.register(Wg);
	}
}, Kg = class extends Fh {};
Kg.blotName = "code", Kg.tagName = "CODE", Gg.blotName = "code-block", Gg.className = "ql-code-block", Gg.tagName = "DIV", Wg.blotName = "code-block-container", Wg.className = "ql-code-block-container", Wg.tagName = "DIV", Wg.allowedChildren = [Gg], Gg.allowedChildren = [
	Mh,
	jh,
	Vh
], Gg.requiredContainer = Wg;
//#endregion
//#region node_modules/quill/formats/direction.js
var qg = {
	scope: X.BLOCK,
	whitelist: ["rtl"]
}, Jg = new Jm("direction", "dir", qg), Yg = new $m("direction", "ql-direction", qg), Xg = new th("direction", "direction", qg), Zg = {
	scope: X.INLINE,
	whitelist: ["serif", "monospace"]
}, Qg = new $m("font", "ql-font", Zg), $g = new class extends th {
	value(e) {
		return super.value(e).replace(/["']/g, "");
	}
}("font", "font-family", Zg), e_ = new $m("size", "ql-size", {
	scope: X.INLINE,
	whitelist: [
		"small",
		"large",
		"huge"
	]
}), t_ = new th("size", "font-size", {
	scope: X.INLINE,
	whitelist: [
		"10px",
		"18px",
		"32px"
	]
}), n_ = qh("quill:keyboard"), r_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", i_ = class e extends cg {
	static match(e, t) {
		return [
			"altKey",
			"ctrlKey",
			"metaKey",
			"shiftKey"
		].some((n) => !!t[n] !== e[n] && t[n] !== null) ? !1 : t.key === e.key || t.key === e.which;
	}
	constructor(e, t) {
		super(e, t), this.bindings = {}, Object.keys(this.options.bindings).forEach((e) => {
			this.options.bindings[e] && this.addBinding(this.options.bindings[e]);
		}), this.addBinding({
			key: "Enter",
			shiftKey: null
		}, this.handleEnter), this.addBinding({
			key: "Enter",
			metaKey: null,
			ctrlKey: null,
			altKey: null
		}, () => {}), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({ key: "Backspace" }, { collapsed: !0 }, this.handleBackspace), this.addBinding({ key: "Delete" }, { collapsed: !0 }, this.handleDelete)) : (this.addBinding({ key: "Backspace" }, {
			collapsed: !0,
			prefix: /^.?$/
		}, this.handleBackspace), this.addBinding({ key: "Delete" }, {
			collapsed: !0,
			suffix: /^.?$/
		}, this.handleDelete)), this.addBinding({ key: "Backspace" }, { collapsed: !1 }, this.handleDeleteRange), this.addBinding({ key: "Delete" }, { collapsed: !1 }, this.handleDeleteRange), this.addBinding({
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
	addBinding(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = l_(e);
		if (r == null) {
			n_.warn("Attempted to add invalid keyboard binding", r);
			return;
		}
		typeof t == "function" && (t = { handler: t }), typeof n == "function" && (n = { handler: n }), (Array.isArray(r.key) ? r.key : [r.key]).forEach((e) => {
			let i = {
				...r,
				key: e,
				...t,
				...n
			};
			this.bindings[i.key] = this.bindings[i.key] || [], this.bindings[i.key].push(i);
		});
	}
	listen() {
		this.quill.root.addEventListener("keydown", (t) => {
			if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
			let n = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((n) => e.match(t, n));
			if (n.length === 0) return;
			let r = $.find(t.target, !0);
			if (r && r.scroll !== this.quill.scroll) return;
			let i = this.quill.getSelection();
			if (i == null || !this.quill.hasFocus()) return;
			let [a, o] = this.quill.getLine(i.index), [s, c] = this.quill.getLeaf(i.index), [l, u] = i.length === 0 ? [s, c] : this.quill.getLeaf(i.index + i.length), d = s instanceof wh ? s.value().slice(0, c) : "", f = l instanceof wh ? l.value().slice(u) : "", p = {
				collapsed: i.length === 0,
				empty: i.length === 0 && a.length() <= 1,
				format: this.quill.getFormat(i),
				line: a,
				offset: o,
				prefix: d,
				suffix: f,
				event: t
			};
			n.some((e) => {
				if (e.collapsed != null && e.collapsed !== p.collapsed || e.empty != null && e.empty !== p.empty || e.offset != null && e.offset !== p.offset) return !1;
				if (Array.isArray(e.format)) {
					if (e.format.every((e) => p.format[e] == null)) return !1;
				} else if (typeof e.format == "object" && !Object.keys(e.format).every((t) => e.format[t] === !0 ? p.format[t] != null : e.format[t] === !1 ? p.format[t] == null : Gm(e.format[t], p.format[t]))) return !1;
				return e.prefix != null && !e.prefix.test(p.prefix) || e.suffix != null && !e.suffix.test(p.suffix) ? !1 : e.handler.call(this, i, p, e) !== !0;
			}) && t.preventDefault();
		});
	}
	handleBackspace(e, t) {
		let n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
		if (e.index === 0 || this.quill.getLength() <= 1) return;
		let r = {}, [i] = this.quill.getLine(e.index), a = new Z.default().retain(e.index - n).delete(n);
		if (t.offset === 0) {
			let [t] = this.quill.getLine(e.index - 1);
			if (t && !(t.statics.blotName === "block" && t.length() <= 1)) {
				let t = i.formats(), n = this.quill.getFormat(e.index - 1, 1);
				if (r = Z.AttributeMap.diff(t, n) || {}, Object.keys(r).length > 0) {
					let t = new Z.default().retain(e.index + i.length() - 2).retain(1, r);
					a = a.compose(t);
				}
			}
		}
		this.quill.updateContents(a, $.sources.USER), this.quill.focus();
	}
	handleDelete(e, t) {
		let n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
		if (e.index >= this.quill.getLength() - n) return;
		let r = {}, [i] = this.quill.getLine(e.index), a = new Z.default().retain(e.index).delete(n);
		if (t.offset >= i.length() - 1) {
			let [t] = this.quill.getLine(e.index + 1);
			if (t) {
				let n = i.formats(), o = this.quill.getFormat(e.index, 1);
				r = Z.AttributeMap.diff(n, o) || {}, Object.keys(r).length > 0 && (a = a.retain(t.length() - 1).retain(1, r));
			}
		}
		this.quill.updateContents(a, $.sources.USER), this.quill.focus();
	}
	handleDeleteRange(e) {
		u_({
			range: e,
			quill: this.quill
		}), this.quill.focus();
	}
	handleEnter(e, t) {
		let n = Object.keys(t.format).reduce((e, n) => (this.quill.scroll.query(n, X.BLOCK) && !Array.isArray(t.format[n]) && (e[n] = t.format[n]), e), {}), r = new Z.default().retain(e.index).delete(e.length).insert("\n", n);
		this.quill.updateContents(r, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.focus();
	}
};
i_.DEFAULTS = { bindings: {
	bold: s_("bold"),
	italic: s_("italic"),
	underline: s_("underline"),
	indent: {
		key: "Tab",
		format: [
			"blockquote",
			"indent",
			"list"
		],
		handler(e, t) {
			return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", $.sources.USER), !1);
		}
	},
	outdent: {
		key: "Tab",
		shiftKey: !0,
		format: [
			"blockquote",
			"indent",
			"list"
		],
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
			t.format.indent == null ? t.format.list != null && this.quill.format("list", !1, $.sources.USER) : this.quill.format("indent", "-1", $.sources.USER);
		}
	},
	"indent code-block": a_(!0),
	"outdent code-block": a_(!1),
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
			let n = new Z.default().retain(e.index).delete(e.length).insert("	");
			return this.quill.updateContents(n, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index + 1, $.sources.SILENT), !1;
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
			let n = { list: !1 };
			t.format.indent && (n.indent = !1), this.quill.formatLine(e.index, e.length, n, $.sources.USER);
		}
	},
	"checklist enter": {
		key: "Enter",
		collapsed: !0,
		format: { list: "checked" },
		handler(e) {
			let [t, n] = this.quill.getLine(e.index), r = {
				...t.formats(),
				list: "checked"
			}, i = new Z.default().retain(e.index).insert("\n", r).retain(t.length() - n - 1).retain(1, { list: "unchecked" });
			this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
		}
	},
	"header enter": {
		key: "Enter",
		collapsed: !0,
		format: ["header"],
		suffix: /^$/,
		handler(e, t) {
			let [n, r] = this.quill.getLine(e.index), i = new Z.default().retain(e.index).insert("\n", t.format).retain(n.length() - r - 1).retain(1, { header: null });
			this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
		}
	},
	"table backspace": {
		key: "Backspace",
		format: ["table"],
		collapsed: !0,
		offset: 0,
		handler() {}
	},
	"table delete": {
		key: "Delete",
		format: ["table"],
		collapsed: !0,
		suffix: /^$/,
		handler() {}
	},
	"table enter": {
		key: "Enter",
		shiftKey: null,
		format: ["table"],
		handler(e) {
			let t = this.quill.getModule("table");
			if (t) {
				let [n, r, i, a] = t.getTable(e), o = d_(n, r, i, a);
				if (o == null) return;
				let s = n.offset();
				if (o < 0) {
					let t = new Z.default().retain(s).insert("\n");
					this.quill.updateContents(t, $.sources.USER), this.quill.setSelection(e.index + 1, e.length, $.sources.SILENT);
				} else if (o > 0) {
					s += n.length();
					let e = new Z.default().retain(s).insert("\n");
					this.quill.updateContents(e, $.sources.USER), this.quill.setSelection(s, $.sources.USER);
				}
			}
		}
	},
	"table tab": {
		key: "Tab",
		shiftKey: null,
		format: ["table"],
		handler(e, t) {
			let { event: n, line: r } = t, i = r.offset(this.quill.scroll);
			n.shiftKey ? this.quill.setSelection(i - 1, $.sources.USER) : this.quill.setSelection(i + r.length(), $.sources.USER);
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
			let { length: n } = t.prefix, [r, i] = this.quill.getLine(e.index);
			if (i > n) return !0;
			let a;
			switch (t.prefix.trim()) {
				case "[]":
				case "[ ]":
					a = "unchecked";
					break;
				case "[x]":
					a = "checked";
					break;
				case "-":
				case "*":
					a = "bullet";
					break;
				default: a = "ordered";
			}
			this.quill.insertText(e.index, " ", $.sources.USER), this.quill.history.cutoff();
			let o = new Z.default().retain(e.index - i).delete(n + 1).retain(r.length() - 2 - i).retain(1, { list: a });
			return this.quill.updateContents(o, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(e.index - n, $.sources.SILENT), !1;
		}
	},
	"code exit": {
		key: "Enter",
		collapsed: !0,
		format: ["code-block"],
		prefix: /^$/,
		suffix: /^\s*$/,
		handler(e) {
			let [t, n] = this.quill.getLine(e.index), r = 2, i = t;
			for (; i != null && i.length() <= 1 && i.formats()["code-block"];) if (i = i.prev, --r, r <= 0) {
				let r = new Z.default().retain(e.index + t.length() - n - 2).retain(1, { "code-block": null }).delete(1);
				return this.quill.updateContents(r, $.sources.USER), this.quill.setSelection(e.index - 1, $.sources.SILENT), !1;
			}
			return !0;
		}
	},
	"embed left": o_("ArrowLeft", !1),
	"embed left shift": o_("ArrowLeft", !0),
	"embed right": o_("ArrowRight", !1),
	"embed right shift": o_("ArrowRight", !0),
	"table down": c_(!1),
	"table up": c_(!0)
} };
function a_(e) {
	return {
		key: "Tab",
		shiftKey: !e,
		format: { "code-block": !0 },
		handler(t, n) {
			let { event: r } = n, { TAB: i } = this.quill.scroll.query("code-block");
			if (t.length === 0 && !r.shiftKey) {
				this.quill.insertText(t.index, i, $.sources.USER), this.quill.setSelection(t.index + i.length, $.sources.SILENT);
				return;
			}
			let a = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t), { index: o, length: s } = t;
			a.forEach((t, n) => {
				e ? (t.insertAt(0, i), n === 0 ? o += i.length : s += i.length) : t.domNode.textContent.startsWith(i) && (t.deleteAt(0, i.length), n === 0 ? o -= i.length : s -= i.length);
			}), this.quill.update($.sources.USER), this.quill.setSelection(o, s, $.sources.SILENT);
		}
	};
}
function o_(e, t) {
	return {
		key: e,
		shiftKey: t,
		altKey: null,
		[e === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
		handler(n) {
			let { index: r } = n;
			e === "ArrowRight" && (r += n.length + 1);
			let [i] = this.quill.getLeaf(r);
			return i instanceof vh ? (e === "ArrowLeft" ? t ? this.quill.setSelection(n.index - 1, n.length + 1, $.sources.USER) : this.quill.setSelection(n.index - 1, $.sources.USER) : t ? this.quill.setSelection(n.index, n.length + 1, $.sources.USER) : this.quill.setSelection(n.index + n.length + 1, $.sources.USER), !1) : !0;
		}
	};
}
function s_(e) {
	return {
		key: e[0],
		shortKey: !0,
		handler(t, n) {
			this.quill.format(e, !n.format[e], $.sources.USER);
		}
	};
}
function c_(e) {
	return {
		key: e ? "ArrowUp" : "ArrowDown",
		collapsed: !0,
		format: ["table"],
		handler(t, n) {
			let r = e ? "prev" : "next", i = n.line, a = i.parent[r];
			if (a != null) {
				if (a.statics.blotName === "table-row") {
					let e = a.children.head, t = i;
					for (; t.prev != null;) t = t.prev, e = e.next;
					let r = e.offset(this.quill.scroll) + Math.min(n.offset, e.length() - 1);
					this.quill.setSelection(r, 0, $.sources.USER);
				}
			} else {
				let t = i.table()[r];
				t != null && (e ? this.quill.setSelection(t.offset(this.quill.scroll) + t.length() - 1, 0, $.sources.USER) : this.quill.setSelection(t.offset(this.quill.scroll), 0, $.sources.USER));
			}
			return !1;
		}
	};
}
function l_(e) {
	if (typeof e == "string" || typeof e == "number") e = { key: e };
	else if (typeof e == "object") e = $p(e);
	else return null;
	return e.shortKey && (e[r_] = e.shortKey, delete e.shortKey), e;
}
function u_(e) {
	let { quill: t, range: n } = e, r = t.getLines(n), i = {};
	if (r.length > 1) {
		let e = r[0].formats(), t = r[r.length - 1].formats();
		i = Z.AttributeMap.diff(t, e) || {};
	}
	t.deleteText(n, $.sources.USER), Object.keys(i).length > 0 && t.formatLine(n.index, 1, i, $.sources.USER), t.setSelection(n.index, $.sources.SILENT);
}
function d_(e, t, n, r) {
	return t.prev == null && t.next == null ? n.prev == null && n.next == null ? r === 0 ? -1 : 1 : n.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
//#endregion
//#region node_modules/quill/modules/normalizeExternalHTML/normalizers/googleDocs.js
var f_ = /font-weight:\s*normal/, p_ = [
	"P",
	"OL",
	"UL"
], m_ = (e) => e && p_.includes(e.tagName), h_ = (e) => {
	Array.from(e.querySelectorAll("br")).filter((e) => m_(e.previousElementSibling) && m_(e.nextElementSibling)).forEach((e) => {
		e.parentNode?.removeChild(e);
	});
}, g_ = (e) => {
	Array.from(e.querySelectorAll("b[style*=\"font-weight\"]")).filter((e) => e.getAttribute("style")?.match(f_)).forEach((t) => {
		let n = e.createDocumentFragment();
		n.append(...t.childNodes), t.parentNode?.replaceChild(n, t);
	});
};
function __(e) {
	e.querySelector("[id^=\"docs-internal-guid-\"]") && (g_(e), h_(e));
}
//#endregion
//#region node_modules/quill/modules/normalizeExternalHTML/normalizers/msWord.js
var v_ = /\bmso-list:[^;]*ignore/i, y_ = /\bmso-list:[^;]*\bl(\d+)/i, b_ = /\bmso-list:[^;]*\blevel(\d+)/i, x_ = (e, t) => {
	let n = e.getAttribute("style"), r = n?.match(y_);
	if (!r) return null;
	let i = Number(r[1]), a = n?.match(b_), o = a ? Number(a[1]) : 1, s = RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), c = t.match(s);
	return {
		id: i,
		indent: o,
		type: c && c[1] === "bullet" ? "bullet" : "ordered",
		element: e
	};
}, S_ = (e) => {
	let t = Array.from(e.querySelectorAll("[style*=mso-list]")), n = [], r = [];
	t.forEach((e) => {
		(e.getAttribute("style") || "").match(v_) ? n.push(e) : r.push(e);
	}), n.forEach((e) => e.parentNode?.removeChild(e));
	let i = e.documentElement.innerHTML, a = r.map((e) => x_(e, i)).filter((e) => e);
	for (; a.length;) {
		let e = [], t = a.shift();
		for (; t;) e.push(t), t = a.length && a[0]?.element === t.element.nextElementSibling && a[0].id === t.id ? a.shift() : null;
		let n = document.createElement("ul");
		e.forEach((e) => {
			let t = document.createElement("li");
			t.setAttribute("data-list", e.type), e.indent > 1 && t.setAttribute("class", `ql-indent-${e.indent - 1}`), t.innerHTML = e.element.innerHTML, n.appendChild(t);
		});
		let r = e[0]?.element, { parentNode: i } = r ?? {};
		r && i?.replaceChild(n, r), e.slice(1).forEach((e) => {
			let { element: t } = e;
			i?.removeChild(t);
		});
	}
};
function C_(e) {
	e.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && S_(e);
}
//#endregion
//#region node_modules/quill/modules/normalizeExternalHTML/index.js
var w_ = [C_, __], T_ = (e) => {
	e.documentElement && w_.forEach((t) => {
		t(e);
	});
}, E_ = qh("quill:clipboard"), D_ = [
	[Node.TEXT_NODE, Y_],
	[Node.TEXT_NODE, K_],
	["br", V_],
	[Node.ELEMENT_NODE, K_],
	[Node.ELEMENT_NODE, B_],
	[Node.ELEMENT_NODE, z_],
	[Node.ELEMENT_NODE, q_],
	["li", W_],
	["ol, ul", G_],
	["pre", H_],
	["tr", J_],
	["b", R_("bold")],
	["i", R_("italic")],
	["strike", R_("strike")],
	["style", U_]
], O_ = [Ig, Jg].reduce((e, t) => (e[t.keyName] = t, e), {}), k_ = [
	Rg,
	Ug,
	Vg,
	Xg,
	$g,
	t_
].reduce((e, t) => (e[t.keyName] = t, e), {}), A_ = class extends cg {
	static DEFAULTS = { matchers: [] };
	constructor(e, t) {
		super(e, t), this.quill.root.addEventListener("copy", (e) => this.onCaptureCopy(e, !1)), this.quill.root.addEventListener("cut", (e) => this.onCaptureCopy(e, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], D_.concat(this.options.matchers ?? []).forEach((e) => {
			let [t, n] = e;
			this.addMatcher(t, n);
		});
	}
	addMatcher(e, t) {
		this.matchers.push([e, t]);
	}
	convert(e) {
		let { html: t, text: n } = e, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (r[Gg.blotName]) return new Z.default().insert(n || "", { [Gg.blotName]: r[Gg.blotName] });
		if (!t) return new Z.default().insert(n || "", r);
		let i = this.convertHTML(t);
		return M_(i, "\n") && (i.ops[i.ops.length - 1].attributes == null || r.table) ? i.compose(new Z.default().retain(i.length() - 1).delete(1)) : i;
	}
	normalizeHTML(e) {
		T_(e);
	}
	convertHTML(e) {
		let t = new DOMParser().parseFromString(e, "text/html");
		this.normalizeHTML(t);
		let n = t.body, r = /* @__PURE__ */ new WeakMap(), [i, a] = this.prepareMatching(n, r);
		return L_(this.quill.scroll, n, i, a, r);
	}
	dangerouslyPasteHTML(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $.sources.API;
		if (typeof e == "string") {
			let n = this.convert({
				html: e,
				text: ""
			});
			this.quill.setContents(n, t), this.quill.setSelection(0, $.sources.SILENT);
		} else {
			let r = this.convert({
				html: t,
				text: ""
			});
			this.quill.updateContents(new Z.default().retain(e).concat(r), n), this.quill.setSelection(e + r.length(), $.sources.SILENT);
		}
	}
	onCaptureCopy(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
		if (e.defaultPrevented) return;
		e.preventDefault();
		let [n] = this.quill.selection.getRange();
		if (n == null) return;
		let { html: r, text: i } = this.onCopy(n, t);
		e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", r), t && u_({
			range: n,
			quill: this.quill
		});
	}
	normalizeURIList(e) {
		return e.split(/\r?\n/).filter((e) => e[0] !== "#").join("\n");
	}
	onCapturePaste(e) {
		if (e.defaultPrevented || !this.quill.isEnabled()) return;
		e.preventDefault();
		let t = this.quill.getSelection(!0);
		if (t == null) return;
		let n = e.clipboardData?.getData("text/html"), r = e.clipboardData?.getData("text/plain");
		if (!n && !r) {
			let t = e.clipboardData?.getData("text/uri-list");
			t && (r = this.normalizeURIList(t));
		}
		let i = Array.from(e.clipboardData?.files || []);
		if (!n && i.length > 0) {
			this.quill.uploader.upload(t, i);
			return;
		}
		if (n && i.length > 0) {
			let e = new DOMParser().parseFromString(n, "text/html");
			if (e.body.childElementCount === 1 && e.body.firstElementChild?.tagName === "IMG") {
				this.quill.uploader.upload(t, i);
				return;
			}
		}
		this.onPaste(t, {
			html: n,
			text: r
		});
	}
	onCopy(e) {
		let t = this.quill.getText(e);
		return {
			html: this.quill.getSemanticHTML(e),
			text: t
		};
	}
	onPaste(e, t) {
		let { text: n, html: r } = t, i = this.quill.getFormat(e.index), a = this.convert({
			text: n,
			html: r
		}, i);
		E_.log("onPaste", a, {
			text: n,
			html: r
		});
		let o = new Z.default().retain(e.index).delete(e.length).concat(a);
		this.quill.updateContents(o, $.sources.USER), this.quill.setSelection(o.length() - e.length, $.sources.SILENT), this.quill.scrollSelectionIntoView();
	}
	prepareMatching(e, t) {
		let n = [], r = [];
		return this.matchers.forEach((i) => {
			let [a, o] = i;
			switch (a) {
				case Node.TEXT_NODE:
					r.push(o);
					break;
				case Node.ELEMENT_NODE:
					n.push(o);
					break;
				default:
					Array.from(e.querySelectorAll(a)).forEach((e) => {
						t.has(e) ? t.get(e)?.push(o) : t.set(e, [o]);
					});
					break;
			}
		}), [n, r];
	}
};
function j_(e, t, n, r) {
	return r.query(t) ? e.reduce((e, r) => {
		if (!r.insert) return e;
		if (r.attributes && r.attributes[t]) return e.push(r);
		let i = n ? { [t]: n } : {};
		return e.insert(r.insert, {
			...i,
			...r.attributes
		});
	}, new Z.default()) : e;
}
function M_(e, t) {
	let n = "";
	for (let r = e.ops.length - 1; r >= 0 && n.length < t.length; --r) {
		let t = e.ops[r];
		if (typeof t.insert != "string") break;
		n = t.insert + n;
	}
	return n.slice(-1 * t.length) === t;
}
function N_(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = t.query(e);
	return n && n.prototype instanceof vh ? !1 : (/* @__PURE__ */ "address.article.blockquote.canvas.dd.div.dl.dt.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.iframe.li.main.nav.ol.output.p.pre.section.table.td.tr.ul.video".split(".")).includes(e.tagName.toLowerCase());
}
function P_(e, t) {
	return e.previousElementSibling && e.nextElementSibling && !N_(e.previousElementSibling, t) && !N_(e.nextElementSibling, t);
}
var F_ = /* @__PURE__ */ new WeakMap();
function I_(e) {
	return e == null ? !1 : (F_.has(e) || (e.tagName === "PRE" ? F_.set(e, !0) : F_.set(e, I_(e.parentNode))), F_.get(e));
}
function L_(e, t, n, r, i) {
	return t.nodeType === t.TEXT_NODE ? r.reduce((n, r) => r(t, n, e), new Z.default()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((a, o) => {
		let s = L_(e, o, n, r, i);
		return o.nodeType === t.ELEMENT_NODE && (s = n.reduce((t, n) => n(o, t, e), s), s = (i.get(o) || []).reduce((t, n) => n(o, t, e), s)), a.concat(s);
	}, new Z.default()) : new Z.default();
}
function R_(e) {
	return (t, n, r) => j_(n, e, !0, r);
}
function z_(e, t, n) {
	let r = Jm.keys(e), i = $m.keys(e), a = th.keys(e), o = {};
	return r.concat(i).concat(a).forEach((t) => {
		let r = n.query(t, X.ATTRIBUTE);
		r != null && (o[r.attrName] = r.value(e), o[r.attrName]) || (r = O_[t], r != null && (r.attrName === t || r.keyName === t) && (o[r.attrName] = r.value(e) || void 0), r = k_[t], r != null && (r.attrName === t || r.keyName === t) && (r = k_[t], o[r.attrName] = r.value(e) || void 0));
	}), Object.entries(o).reduce((e, t) => {
		let [r, i] = t;
		return j_(e, r, i, n);
	}, t);
}
function B_(e, t, n) {
	let r = n.query(e);
	if (r == null) return t;
	if (r.prototype instanceof vh) {
		let t = {}, i = r.value(e);
		if (i != null) return t[r.blotName] = i, new Z.default().insert(t, r.formats(e, n));
	} else if (r.prototype instanceof hh && !M_(t, "\n") && t.insert("\n"), "blotName" in r && "formats" in r && typeof r.formats == "function") return j_(t, r.blotName, r.formats(e, n), n);
	return t;
}
function V_(e, t) {
	return M_(t, "\n") || t.insert("\n"), t;
}
function H_(e, t, n) {
	let r = n.query("code-block");
	return j_(t, "code-block", r && "formats" in r && typeof r.formats == "function" ? r.formats(e, n) : !0, n);
}
function U_() {
	return new Z.default();
}
function W_(e, t, n) {
	let r = n.query(e);
	if (r == null || r.blotName !== "list" || !M_(t, "\n")) return t;
	let i = -1, a = e.parentNode;
	for (; a != null;) ["OL", "UL"].includes(a.tagName) && (i += 1), a = a.parentNode;
	return i <= 0 ? t : t.reduce((e, t) => t.insert ? t.attributes && typeof t.attributes.indent == "number" ? e.push(t) : e.insert(t.insert, {
		indent: i,
		...t.attributes || {}
	}) : e, new Z.default());
}
function G_(e, t, n) {
	let r = e, i = r.tagName === "OL" ? "ordered" : "bullet", a = r.getAttribute("data-checked");
	return a && (i = a === "true" ? "checked" : "unchecked"), j_(t, "list", i, n);
}
function K_(e, t, n) {
	if (!M_(t, "\n")) {
		if (N_(e, n) && (e.childNodes.length > 0 || e instanceof HTMLParagraphElement)) return t.insert("\n");
		if (t.length() > 0 && e.nextSibling) {
			let r = e.nextSibling;
			for (; r != null;) {
				if (N_(r, n)) return t.insert("\n");
				let e = n.query(r);
				if (e && e.prototype instanceof Rh) return t.insert("\n");
				r = r.firstChild;
			}
		}
	}
	return t;
}
function q_(e, t, n) {
	let r = {}, i = e.style || {};
	return i.fontStyle === "italic" && (r.italic = !0), i.textDecoration === "underline" && (r.underline = !0), i.textDecoration === "line-through" && (r.strike = !0), (i.fontWeight?.startsWith("bold") || parseInt(i.fontWeight, 10) >= 700) && (r.bold = !0), t = Object.entries(r).reduce((e, t) => {
		let [r, i] = t;
		return j_(e, r, i, n);
	}, t), parseFloat(i.textIndent || 0) > 0 ? new Z.default().insert("	").concat(t) : t;
}
function J_(e, t, n) {
	let r = e.parentElement?.tagName === "TABLE" ? e.parentElement : e.parentElement?.parentElement;
	return r == null ? t : j_(t, "table", Array.from(r.querySelectorAll("tr")).indexOf(e) + 1, n);
}
function Y_(e, t, n) {
	let r = e.data;
	if (e.parentElement?.tagName === "O:P") return t.insert(r.trim());
	if (!I_(e)) {
		if (r.trim().length === 0 && r.includes("\n") && !P_(e, n)) return t;
		r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (e.previousSibling == null && e.parentElement != null && N_(e.parentElement, n) || e.previousSibling instanceof Element && N_(e.previousSibling, n)) && (r = r.replace(/^ /, "")), (e.nextSibling == null && e.parentElement != null && N_(e.parentElement, n) || e.nextSibling instanceof Element && N_(e.nextSibling, n)) && (r = r.replace(/ $/, "")), r = r.replaceAll("\xA0", " ");
	}
	return t.insert(r);
}
//#endregion
//#region node_modules/quill/modules/history.js
var X_ = class extends cg {
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
	constructor(e, t) {
		super(e, t), this.quill.on($.events.EDITOR_CHANGE, (e, t, n, r) => {
			e === $.events.SELECTION_CHANGE ? t && r !== $.sources.SILENT && (this.currentRange = t) : e === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || r === $.sources.USER ? this.record(t, n) : this.transform(t)), this.currentRange = ev(this.currentRange, t));
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
		}, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (e) => {
			e.inputType === "historyUndo" ? (this.undo(), e.preventDefault()) : e.inputType === "historyRedo" && (this.redo(), e.preventDefault());
		});
	}
	change(e, t) {
		if (this.stack[e].length === 0) return;
		let n = this.stack[e].pop();
		if (!n) return;
		let r = this.quill.getContents(), i = n.delta.invert(r);
		this.stack[t].push({
			delta: i,
			range: ev(n.range, i)
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
	record(e, t) {
		if (e.ops.length === 0) return;
		this.stack.redo = [];
		let n = e.invert(t), r = this.currentRange, i = Date.now();
		if (this.lastRecorded + this.options.delay > i && this.stack.undo.length > 0) {
			let e = this.stack.undo.pop();
			e && (n = n.compose(e.delta), r = e.range);
		} else this.lastRecorded = i;
		n.length() !== 0 && (this.stack.undo.push({
			delta: n,
			range: r
		}), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
	}
	redo() {
		this.change("redo", "undo");
	}
	transform(e) {
		Z_(this.stack.undo, e), Z_(this.stack.redo, e);
	}
	undo() {
		this.change("undo", "redo");
	}
	restoreSelection(e) {
		if (e.range) this.quill.setSelection(e.range, $.sources.USER);
		else {
			let t = $_(this.quill.scroll, e.delta);
			this.quill.setSelection(t, $.sources.USER);
		}
	}
};
function Z_(e, t) {
	let n = t;
	for (let t = e.length - 1; t >= 0; --t) {
		let r = e[t];
		e[t] = {
			delta: n.transform(r.delta, !0),
			range: r.range && ev(r.range, n)
		}, n = r.delta.transform(n), e[t].delta.length() === 0 && e.splice(t, 1);
	}
}
function Q_(e, t) {
	let n = t.ops[t.ops.length - 1];
	return n == null ? !1 : n.insert == null ? n.attributes == null ? !1 : Object.keys(n.attributes).some((t) => e.query(t, X.BLOCK) != null) : typeof n.insert == "string" && n.insert.endsWith("\n");
}
function $_(e, t) {
	let n = t.reduce((e, t) => e + (t.delete || 0), 0), r = t.length() - n;
	return Q_(e, t) && --r, r;
}
function ev(e, t) {
	if (!e) return e;
	let n = t.transformPosition(e.index);
	return {
		index: n,
		length: t.transformPosition(e.index + e.length) - n
	};
}
//#endregion
//#region node_modules/quill/modules/uploader.js
var tv = class extends cg {
	constructor(e, t) {
		super(e, t), e.root.addEventListener("drop", (t) => {
			t.preventDefault();
			let n = null;
			if (document.caretRangeFromPoint) n = document.caretRangeFromPoint(t.clientX, t.clientY);
			else if (document.caretPositionFromPoint) {
				let e = document.caretPositionFromPoint(t.clientX, t.clientY);
				n = document.createRange(), n.setStart(e.offsetNode, e.offset), n.setEnd(e.offsetNode, e.offset);
			}
			let r = n && e.selection.normalizeNative(n);
			if (r) {
				let n = e.selection.normalizedToRange(r);
				t.dataTransfer?.files && this.upload(n, t.dataTransfer.files);
			}
		});
	}
	upload(e, t) {
		let n = [];
		Array.from(t).forEach((e) => {
			e && this.options.mimetypes?.includes(e.type) && n.push(e);
		}), n.length > 0 && this.options.handler.call(this, e, n);
	}
};
tv.DEFAULTS = {
	mimetypes: ["image/png", "image/jpeg"],
	handler(e, t) {
		if (!this.quill.scroll.query("image")) return;
		let n = t.map((e) => new Promise((t) => {
			let n = new FileReader();
			n.onload = () => {
				t(n.result);
			}, n.readAsDataURL(e);
		}));
		Promise.all(n).then((t) => {
			let n = t.reduce((e, t) => e.insert({ image: t }), new Z.default().retain(e.index).delete(e.length));
			this.quill.updateContents(n, Q.sources.USER), this.quill.setSelection(e.index + t.length, Q.sources.SILENT);
		});
	}
};
//#endregion
//#region node_modules/quill/modules/input.js
var nv = ["insertText", "insertReplacementText"], rv = class extends cg {
	constructor(e, t) {
		super(e, t), e.root.addEventListener("beforeinput", (e) => {
			this.handleBeforeInput(e);
		}), /Android/i.test(navigator.userAgent) || e.on($.events.COMPOSITION_BEFORE_START, () => {
			this.handleCompositionStart();
		});
	}
	deleteRange(e) {
		u_({
			range: e,
			quill: this.quill
		});
	}
	replaceText(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
		if (e.length === 0) return !1;
		if (t) {
			let n = this.quill.getFormat(e.index, 1);
			this.deleteRange(e), this.quill.updateContents(new Z.default().retain(e.index).insert(t, n), $.sources.USER);
		} else this.deleteRange(e);
		return this.quill.setSelection(e.index + t.length, 0, $.sources.SILENT), !0;
	}
	handleBeforeInput(e) {
		if (this.quill.composition.isComposing || e.defaultPrevented || !nv.includes(e.inputType)) return;
		let t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
		if (!t || t.collapsed === !0) return;
		let n = iv(e);
		if (n == null) return;
		let r = this.quill.selection.normalizeNative(t), i = r ? this.quill.selection.normalizedToRange(r) : null;
		i && this.replaceText(i, n) && e.preventDefault();
	}
	handleCompositionStart() {
		let e = this.quill.getSelection();
		e && this.replaceText(e);
	}
};
function iv(e) {
	return typeof e.data == "string" ? e.data : e.dataTransfer?.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
}
//#endregion
//#region node_modules/quill/modules/uiNode.js
var av = /Mac/i.test(navigator.platform), ov = (e) => !!(e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Home" || av && e.key === "a" && e.ctrlKey === !0), sv = class extends cg {
	isListening = !1;
	selectionChangeDeadline = 0;
	constructor(e, t) {
		super(e, t), this.handleArrowKeys(), this.handleNavigationShortcuts();
	}
	handleArrowKeys() {
		this.quill.keyboard.addBinding({
			key: ["ArrowLeft", "ArrowRight"],
			offset: 0,
			shiftKey: null,
			handler(e, t) {
				let { line: n, event: r } = t;
				if (!(n instanceof uh) || !n.uiNode) return !0;
				let i = getComputedStyle(n.domNode).direction === "rtl";
				return i && r.key !== "ArrowRight" || !i && r.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + +!!r.shiftKey, $.sources.USER), !1);
			}
		});
	}
	handleNavigationShortcuts() {
		this.quill.root.addEventListener("keydown", (e) => {
			!e.defaultPrevented && ov(e) && this.ensureListeningToSelectionChange();
		});
	}
	ensureListeningToSelectionChange() {
		this.selectionChangeDeadline = Date.now() + 100, !this.isListening && (this.isListening = !0, document.addEventListener("selectionchange", () => {
			this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
		}, { once: !0 }));
	}
	handleSelectionChange() {
		let e = document.getSelection();
		if (!e) return;
		let t = e.getRangeAt(0);
		if (t.collapsed !== !0 || t.startOffset !== 0) return;
		let n = this.quill.scroll.find(t.startContainer);
		if (!(n instanceof uh) || !n.uiNode) return;
		let r = document.createRange();
		r.setStartAfter(n.uiNode), r.setEndAfter(n.uiNode), e.removeAllRanges(), e.addRange(r);
	}
};
//#endregion
//#region node_modules/quill/core.js
$.register({
	"blots/block": Lh,
	"blots/block/embed": Rh,
	"blots/break": jh,
	"blots/container": Ag,
	"blots/cursor": Vh,
	"blots/embed": ug,
	"blots/inline": Fh,
	"blots/scroll": Ng,
	"blots/text": Mh,
	"modules/clipboard": A_,
	"modules/history": X_,
	"modules/keyboard": i_,
	"modules/uploader": tv,
	"modules/input": rv,
	"modules/uiNode": sv
});
var cv = $, lv = new class extends $m {
	add(e, t) {
		let n = 0;
		if (t === "+1" || t === "-1") {
			let r = this.value(e) || 0;
			n = t === "+1" ? r + 1 : r - 1;
		} else typeof t == "number" && (n = t);
		return n === 0 ? (this.remove(e), !0) : super.add(e, n.toString());
	}
	canAdd(e, t) {
		return super.canAdd(e, t) || super.canAdd(e, parseInt(t, 10));
	}
	value(e) {
		return parseInt(super.value(e), 10) || void 0;
	}
}("indent", "ql-indent", {
	scope: X.BLOCK,
	whitelist: [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8
	]
}), uv = class extends Lh {
	static blotName = "blockquote";
	static tagName = "blockquote";
}, dv = class extends Lh {
	static blotName = "header";
	static tagName = [
		"H1",
		"H2",
		"H3",
		"H4",
		"H5",
		"H6"
	];
	static formats(e) {
		return this.tagName.indexOf(e.tagName) + 1;
	}
}, fv = class extends Ag {};
fv.blotName = "list-container", fv.tagName = "OL";
var pv = class extends Lh {
	static create(e) {
		let t = super.create();
		return t.setAttribute("data-list", e), t;
	}
	static formats(e) {
		return e.getAttribute("data-list") || void 0;
	}
	static register() {
		$.register(fv);
	}
	constructor(e, t) {
		super(e, t);
		let n = t.ownerDocument.createElement("span"), r = (n) => {
			if (!e.isEnabled()) return;
			let r = this.statics.formats(t, e);
			r === "checked" ? (this.format("list", "unchecked"), n.preventDefault()) : r === "unchecked" && (this.format("list", "checked"), n.preventDefault());
		};
		n.addEventListener("mousedown", r), n.addEventListener("touchstart", r), this.attachUI(n);
	}
	format(e, t) {
		e === this.statics.blotName && t ? this.domNode.setAttribute("data-list", t) : super.format(e, t);
	}
};
pv.blotName = "list", pv.tagName = "LI", fv.allowedChildren = [pv], pv.requiredContainer = fv;
//#endregion
//#region node_modules/quill/formats/bold.js
var mv = class extends Fh {
	static blotName = "bold";
	static tagName = ["STRONG", "B"];
	static create() {
		return super.create();
	}
	static formats() {
		return !0;
	}
	optimize(e) {
		super.optimize(e), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
	}
}, hv = class extends mv {
	static blotName = "italic";
	static tagName = ["EM", "I"];
}, gv = class extends Fh {
	static blotName = "link";
	static tagName = "A";
	static SANITIZED_URL = "about:blank";
	static PROTOCOL_WHITELIST = [
		"http",
		"https",
		"mailto",
		"tel",
		"sms"
	];
	static create(e) {
		let t = super.create(e);
		return t.setAttribute("href", this.sanitize(e)), t.setAttribute("rel", "noopener noreferrer"), t.setAttribute("target", "_blank"), t;
	}
	static formats(e) {
		return e.getAttribute("href");
	}
	static sanitize(e) {
		return _v(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
	}
	format(e, t) {
		e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
	}
};
function _v(e, t) {
	let n = document.createElement("a");
	n.href = e;
	let r = n.href.slice(0, n.href.indexOf(":"));
	return t.indexOf(r) > -1;
}
//#endregion
//#region node_modules/quill/formats/script.js
var vv = class extends Fh {
	static blotName = "script";
	static tagName = ["SUB", "SUP"];
	static create(e) {
		return e === "super" ? document.createElement("sup") : e === "sub" ? document.createElement("sub") : super.create(e);
	}
	static formats(e) {
		if (e.tagName === "SUB") return "sub";
		if (e.tagName === "SUP") return "super";
	}
}, yv = class extends mv {
	static blotName = "strike";
	static tagName = ["S", "STRIKE"];
}, bv = class extends Fh {
	static blotName = "underline";
	static tagName = "U";
}, xv = class extends ug {
	static blotName = "formula";
	static className = "ql-formula";
	static tagName = "SPAN";
	static create(e) {
		if (window.katex == null) throw Error("Formula module requires KaTeX.");
		let t = super.create(e);
		return typeof e == "string" && (window.katex.render(e, t, {
			throwOnError: !1,
			errorColor: "#f00"
		}), t.setAttribute("data-value", e)), t;
	}
	static value(e) {
		return e.getAttribute("data-value");
	}
	html() {
		let { formula: e } = this.value();
		return `<span>${e}</span>`;
	}
}, Sv = [
	"alt",
	"height",
	"width"
], Cv = class extends vh {
	static blotName = "image";
	static tagName = "IMG";
	static create(e) {
		let t = super.create(e);
		return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
	}
	static formats(e) {
		return Sv.reduce((t, n) => (e.hasAttribute(n) && (t[n] = e.getAttribute(n)), t), {});
	}
	static match(e) {
		return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
	}
	static sanitize(e) {
		return _v(e, [
			"http",
			"https",
			"data"
		]) ? e : "//:0";
	}
	static value(e) {
		return e.getAttribute("src");
	}
	format(e, t) {
		Sv.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
	}
}, wv = ["height", "width"], Tv = class extends Rh {
	static blotName = "video";
	static className = "ql-video";
	static tagName = "IFRAME";
	static create(e) {
		let t = super.create(e);
		return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
	}
	static formats(e) {
		return wv.reduce((t, n) => (e.hasAttribute(n) && (t[n] = e.getAttribute(n)), t), {});
	}
	static sanitize(e) {
		return gv.sanitize(e);
	}
	static value(e) {
		return e.getAttribute("src");
	}
	format(e, t) {
		wv.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
	}
	html() {
		let { video: e } = this.value();
		return `<a href="${e}">${e}</a>`;
	}
}, Ev = new $m("code-token", "hljs", { scope: X.INLINE }), Dv = class e extends Fh {
	static formats(e, t) {
		for (; e != null && e !== t.domNode;) {
			if (e.classList && e.classList.contains(Gg.className)) return super.formats(e, t);
			e = e.parentNode;
		}
	}
	constructor(e, t, n) {
		super(e, t, n), Ev.add(this.domNode, n);
	}
	format(t, n) {
		t === e.blotName ? n ? Ev.add(this.domNode, n) : (Ev.remove(this.domNode), this.domNode.classList.remove(this.statics.className)) : super.format(t, n);
	}
	optimize() {
		super.optimize(...arguments), Ev.value(this.domNode) || this.unwrap();
	}
};
Dv.blotName = "code-token", Dv.className = "ql-token";
var Ov = class extends Gg {
	static create(e) {
		let t = super.create(e);
		return typeof e == "string" && t.setAttribute("data-language", e), t;
	}
	static formats(e) {
		return e.getAttribute("data-language") || "plain";
	}
	static register() {}
	format(e, t) {
		e === this.statics.blotName && t ? this.domNode.setAttribute("data-language", t) : super.format(e, t);
	}
	replaceWith(e, t) {
		return this.formatAt(0, this.length(), Dv.blotName, !1), super.replaceWith(e, t);
	}
}, kv = class extends Wg {
	attach() {
		super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
	}
	format(e, t) {
		e === Ov.blotName && (this.forceNext = !0, this.children.forEach((n) => {
			n.format(e, t);
		}));
	}
	formatAt(e, t, n, r) {
		n === Ov.blotName && (this.forceNext = !0), super.formatAt(e, t, n, r);
	}
	highlight(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
		if (this.children.head == null) return;
		let n = `${Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).map((e) => e.textContent).join("\n")}\n`, r = Ov.formats(this.children.head.domNode);
		if (t || this.forceNext || this.cachedText !== n) {
			if (n.trim().length > 0 || this.cachedText == null) {
				let t = this.children.reduce((e, t) => e.concat(zh(t, !1)), new Z.default()), i = e(n, r);
				t.diff(i).reduce((e, t) => {
					let { retain: n, attributes: r } = t;
					return n ? (r && Object.keys(r).forEach((t) => {
						[Ov.blotName, Dv.blotName].includes(t) && this.formatAt(e, n, t, r[t]);
					}), e + n) : e;
				}, 0);
			}
			this.cachedText = n, this.forceNext = !1;
		}
	}
	html(e, t) {
		let [n] = this.children.find(e);
		return `<pre data-language="${n ? Ov.formats(n.domNode) : "plain"}">\n${Ph(this.code(e, t))}\n</pre>`;
	}
	optimize(e) {
		if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
			let e = Ov.formats(this.children.head.domNode);
			e !== this.uiNode.value && (this.uiNode.value = e);
		}
	}
};
kv.allowedChildren = [Ov], Ov.requiredContainer = kv, Ov.allowedChildren = [
	Dv,
	Vh,
	Mh,
	jh
];
var Av = (e, t, n) => {
	if (typeof e.versionString == "string") {
		let r = e.versionString.split(".")[0];
		if (parseInt(r, 10) >= 11) return e.highlight(n, { language: t }).value;
	}
	return e.highlight(t, n).value;
}, jv = class extends cg {
	static register() {
		$.register(Dv, !0), $.register(Ov, !0), $.register(kv, !0);
	}
	constructor(e, t) {
		if (super(e, t), this.options.hljs == null) throw Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
		this.languages = this.options.languages.reduce((e, t) => {
			let { key: n } = t;
			return e[n] = !0, e;
		}, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
	}
	initListener() {
		this.quill.on($.events.SCROLL_BLOT_MOUNT, (e) => {
			if (!(e instanceof kv)) return;
			let t = this.quill.root.ownerDocument.createElement("select");
			this.options.languages.forEach((e) => {
				let { key: n, label: r } = e, i = t.ownerDocument.createElement("option");
				i.textContent = r, i.setAttribute("value", n), t.appendChild(i);
			}), t.addEventListener("change", () => {
				e.format(Ov.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
			}), e.uiNode ?? (e.attachUI(t), e.children.head && (t.value = Ov.formats(e.children.head.domNode)));
		});
	}
	initTimer() {
		let e = null;
		this.quill.on($.events.SCROLL_OPTIMIZE, () => {
			e && clearTimeout(e), e = setTimeout(() => {
				this.highlight(), e = null;
			}, this.options.interval);
		});
	}
	highlight() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
		if (this.quill.selection.composing) return;
		this.quill.update($.sources.USER);
		let n = this.quill.getSelection();
		(e == null ? this.quill.scroll.descendants(kv) : [e]).forEach((e) => {
			e.highlight(this.highlightBlot, t);
		}), this.quill.update($.sources.SILENT), n != null && this.quill.setSelection(n, $.sources.SILENT);
	}
	highlightBlot(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
		if (t = this.languages[t] ? t : "plain", t === "plain") return Ph(e).split("\n").reduce((e, n, r) => (r !== 0 && e.insert("\n", { [Gg.blotName]: t }), e.insert(n)), new Z.default());
		let n = this.quill.root.ownerDocument.createElement("div");
		return n.classList.add(Gg.className), n.innerHTML = Av(this.options.hljs, t, e), L_(this.quill.scroll, n, [(e, t) => {
			let n = Ev.value(e);
			return n ? t.compose(new Z.default().retain(t.length(), { [Dv.blotName]: n })) : t;
		}], [(e, n) => e.data.split("\n").reduce((e, n, r) => (r !== 0 && e.insert("\n", { [Gg.blotName]: t }), e.insert(n)), n)], /* @__PURE__ */ new WeakMap());
	}
};
jv.DEFAULTS = {
	hljs: window.hljs,
	interval: 1e3,
	languages: [
		{
			key: "plain",
			label: "Plain"
		},
		{
			key: "bash",
			label: "Bash"
		},
		{
			key: "cpp",
			label: "C++"
		},
		{
			key: "cs",
			label: "C#"
		},
		{
			key: "css",
			label: "CSS"
		},
		{
			key: "diff",
			label: "Diff"
		},
		{
			key: "xml",
			label: "HTML/XML"
		},
		{
			key: "java",
			label: "Java"
		},
		{
			key: "javascript",
			label: "JavaScript"
		},
		{
			key: "markdown",
			label: "Markdown"
		},
		{
			key: "php",
			label: "PHP"
		},
		{
			key: "python",
			label: "Python"
		},
		{
			key: "ruby",
			label: "Ruby"
		},
		{
			key: "sql",
			label: "SQL"
		}
	]
};
//#endregion
//#region node_modules/quill/formats/table.js
var Mv = class e extends Lh {
	static blotName = "table";
	static tagName = "TD";
	static create(e) {
		let t = super.create();
		return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", Iv()), t;
	}
	static formats(e) {
		if (e.hasAttribute("data-row")) return e.getAttribute("data-row");
	}
	cellOffset() {
		return this.parent ? this.parent.children.indexOf(this) : -1;
	}
	format(t, n) {
		t === e.blotName && n ? this.domNode.setAttribute("data-row", n) : super.format(t, n);
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
}, Nv = class extends Ag {
	static blotName = "table-row";
	static tagName = "TR";
	checkMerge() {
		if (super.checkMerge() && this.next.children.head != null) {
			let e = this.children.head.formats(), t = this.children.tail.formats(), n = this.next.children.head.formats(), r = this.next.children.tail.formats();
			return e.table === t.table && e.table === n.table && e.table === r.table;
		}
		return !1;
	}
	optimize(e) {
		super.optimize(e), this.children.forEach((e) => {
			if (e.next == null) return;
			let t = e.formats(), n = e.next.formats();
			if (t.table !== n.table) {
				let t = this.splitAfter(e);
				t && t.optimize(), this.prev && this.prev.optimize();
			}
		});
	}
	rowOffset() {
		return this.parent ? this.parent.children.indexOf(this) : -1;
	}
	table() {
		return this.parent && this.parent.parent;
	}
}, Pv = class extends Ag {
	static blotName = "table-body";
	static tagName = "TBODY";
}, Fv = class extends Ag {
	static blotName = "table-container";
	static tagName = "TABLE";
	balanceCells() {
		let e = this.descendants(Nv), t = e.reduce((e, t) => Math.max(t.children.length, e), 0);
		e.forEach((e) => {
			Array(t - e.children.length).fill(0).forEach(() => {
				let t;
				e.children.head != null && (t = Mv.formats(e.children.head.domNode));
				let n = this.scroll.create(Mv.blotName, t);
				e.appendChild(n), n.optimize();
			});
		});
	}
	cells(e) {
		return this.rows().map((t) => t.children.at(e));
	}
	deleteColumn(e) {
		let [t] = this.descendant(Pv);
		t == null || t.children.head == null || t.children.forEach((t) => {
			t.children.at(e)?.remove();
		});
	}
	insertColumn(e) {
		let [t] = this.descendant(Pv);
		t == null || t.children.head == null || t.children.forEach((t) => {
			let n = t.children.at(e), r = Mv.formats(t.children.head.domNode), i = this.scroll.create(Mv.blotName, r);
			t.insertBefore(i, n);
		});
	}
	insertRow(e) {
		let [t] = this.descendant(Pv);
		if (t == null || t.children.head == null) return;
		let n = Iv(), r = this.scroll.create(Nv.blotName);
		t.children.head.children.forEach(() => {
			let e = this.scroll.create(Mv.blotName, n);
			r.appendChild(e);
		});
		let i = t.children.at(e);
		t.insertBefore(r, i);
	}
	rows() {
		let e = this.children.head;
		return e == null ? [] : e.children.map((e) => e);
	}
};
Fv.allowedChildren = [Pv], Pv.requiredContainer = Fv, Pv.allowedChildren = [Nv], Nv.requiredContainer = Pv, Nv.allowedChildren = [Mv], Mv.requiredContainer = Nv;
function Iv() {
	return `row-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
//#region node_modules/quill/modules/table.js
var Lv = class extends cg {
	static register() {
		$.register(Mv), $.register(Nv), $.register(Pv), $.register(Fv);
	}
	constructor() {
		super(...arguments), this.listenBalanceCells();
	}
	balanceTables() {
		this.quill.scroll.descendants(Fv).forEach((e) => {
			e.balanceCells();
		});
	}
	deleteColumn() {
		let [e, , t] = this.getTable();
		t != null && (e.deleteColumn(t.cellOffset()), this.quill.update($.sources.USER));
	}
	deleteRow() {
		let [, e] = this.getTable();
		e != null && (e.remove(), this.quill.update($.sources.USER));
	}
	deleteTable() {
		let [e] = this.getTable();
		if (e == null) return;
		let t = e.offset();
		e.remove(), this.quill.update($.sources.USER), this.quill.setSelection(t, $.sources.SILENT);
	}
	getTable() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
		if (e == null) return [
			null,
			null,
			null,
			-1
		];
		let [t, n] = this.quill.getLine(e.index);
		if (t == null || t.statics.blotName !== Mv.blotName) return [
			null,
			null,
			null,
			-1
		];
		let r = t.parent;
		return [
			r.parent.parent,
			r,
			t,
			n
		];
	}
	insertColumn(e) {
		let t = this.quill.getSelection();
		if (!t) return;
		let [n, r, i] = this.getTable(t);
		if (i == null) return;
		let a = i.cellOffset();
		n.insertColumn(a + e), this.quill.update($.sources.USER);
		let o = r.rowOffset();
		e === 0 && (o += 1), this.quill.setSelection(t.index + o, t.length, $.sources.SILENT);
	}
	insertColumnLeft() {
		this.insertColumn(0);
	}
	insertColumnRight() {
		this.insertColumn(1);
	}
	insertRow(e) {
		let t = this.quill.getSelection();
		if (!t) return;
		let [n, r, i] = this.getTable(t);
		if (i == null) return;
		let a = r.rowOffset();
		n.insertRow(a + e), this.quill.update($.sources.USER), e > 0 ? this.quill.setSelection(t, $.sources.SILENT) : this.quill.setSelection(t.index + r.children.length, t.length, $.sources.SILENT);
	}
	insertRowAbove() {
		this.insertRow(0);
	}
	insertRowBelow() {
		this.insertRow(1);
	}
	insertTable(e, t) {
		let n = this.quill.getSelection();
		if (n == null) return;
		let r = Array(e).fill(0).reduce((e) => {
			let n = Array(t).fill("\n").join("");
			return e.insert(n, { table: Iv() });
		}, new Z.default().retain(n.index));
		this.quill.updateContents(r, $.sources.USER), this.quill.setSelection(n.index, $.sources.SILENT), this.balanceTables();
	}
	listenBalanceCells() {
		this.quill.on($.events.SCROLL_OPTIMIZE, (e) => {
			e.some((e) => [
				"TD",
				"TR",
				"TBODY",
				"TABLE"
			].includes(e.target.tagName) ? (this.quill.once($.events.TEXT_CHANGE, (e, t, n) => {
				n === $.sources.USER && this.balanceTables();
			}), !0) : !1);
		});
	}
}, Rv = qh("quill:toolbar"), zv = class extends cg {
	constructor(e, t) {
		if (super(e, t), Array.isArray(this.options.container)) {
			let t = document.createElement("div");
			t.setAttribute("role", "toolbar"), Vv(t, this.options.container), e.container?.parentNode?.insertBefore(t, e.container), this.container = t;
		} else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
		if (!(this.container instanceof HTMLElement)) {
			Rv.error("Container required for toolbar", this.options);
			return;
		}
		this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((e) => {
			let t = this.options.handlers?.[e];
			t && this.addHandler(e, t);
		}), Array.from(this.container.querySelectorAll("button, select")).forEach((e) => {
			this.attach(e);
		}), this.quill.on($.events.EDITOR_CHANGE, () => {
			let [e] = this.quill.selection.getRange();
			this.update(e);
		});
	}
	addHandler(e, t) {
		this.handlers[e] = t;
	}
	attach(e) {
		let t = Array.from(e.classList).find((e) => e.indexOf("ql-") === 0);
		if (!t) return;
		if (t = t.slice(3), e.tagName === "BUTTON" && e.setAttribute("type", "button"), this.handlers[t] == null && this.quill.scroll.query(t) == null) {
			Rv.warn("ignoring attaching to nonexistent format", t, e);
			return;
		}
		let n = e.tagName === "SELECT" ? "change" : "click";
		e.addEventListener(n, (n) => {
			let r;
			if (e.tagName === "SELECT") {
				if (e.selectedIndex < 0) return;
				let t = e.options[e.selectedIndex];
				r = t.hasAttribute("selected") ? !1 : t.value || !1;
			} else r = e.classList.contains("ql-active") ? !1 : e.value || !e.hasAttribute("value"), n.preventDefault();
			this.quill.focus();
			let [i] = this.quill.selection.getRange();
			if (this.handlers[t] != null) this.handlers[t].call(this, r);
			else if (this.quill.scroll.query(t).prototype instanceof vh) {
				if (r = prompt(`Enter ${t}`), !r) return;
				this.quill.updateContents(new Z.default().retain(i.index).delete(i.length).insert({ [t]: r }), $.sources.USER);
			} else this.quill.format(t, r, $.sources.USER);
			this.update(i);
		}), this.controls.push([t, e]);
	}
	update(e) {
		let t = e == null ? {} : this.quill.getFormat(e);
		this.controls.forEach((n) => {
			let [r, i] = n;
			if (i.tagName === "SELECT") {
				let n = null;
				if (e == null) n = null;
				else if (t[r] == null) n = i.querySelector("option[selected]");
				else if (!Array.isArray(t[r])) {
					let e = t[r];
					typeof e == "string" && (e = e.replace(/"/g, "\\\"")), n = i.querySelector(`option[value="${e}"]`);
				}
				n == null ? (i.value = "", i.selectedIndex = -1) : n.selected = !0;
			} else if (e == null) i.classList.remove("ql-active"), i.setAttribute("aria-pressed", "false");
			else if (i.hasAttribute("value")) {
				let e = t[r], n = e === i.getAttribute("value") || e != null && e.toString() === i.getAttribute("value") || e == null && !i.getAttribute("value");
				i.classList.toggle("ql-active", n), i.setAttribute("aria-pressed", n.toString());
			} else {
				let e = t[r] != null;
				i.classList.toggle("ql-active", e), i.setAttribute("aria-pressed", e.toString());
			}
		});
	}
};
zv.DEFAULTS = {};
function Bv(e, t, n) {
	let r = document.createElement("button");
	r.setAttribute("type", "button"), r.classList.add(`ql-${t}`), r.setAttribute("aria-pressed", "false"), n == null ? r.setAttribute("aria-label", t) : (r.value = n, r.setAttribute("aria-label", `${t}: ${n}`)), e.appendChild(r);
}
function Vv(e, t) {
	Array.isArray(t[0]) || (t = [t]), t.forEach((t) => {
		let n = document.createElement("span");
		n.classList.add("ql-formats"), t.forEach((e) => {
			if (typeof e == "string") Bv(n, e);
			else {
				let t = Object.keys(e)[0], r = e[t];
				Array.isArray(r) ? Hv(n, t, r) : Bv(n, t, r);
			}
		}), e.appendChild(n);
	});
}
function Hv(e, t, n) {
	let r = document.createElement("select");
	r.classList.add(`ql-${t}`), n.forEach((e) => {
		let t = document.createElement("option");
		e === !1 ? t.setAttribute("selected", "selected") : t.setAttribute("value", String(e)), r.appendChild(t);
	}), e.appendChild(r);
}
zv.DEFAULTS = {
	container: null,
	handlers: {
		clean() {
			let e = this.quill.getSelection();
			if (e != null) if (e.length === 0) {
				let e = this.quill.getFormat();
				Object.keys(e).forEach((e) => {
					this.quill.scroll.query(e, X.INLINE) != null && this.quill.format(e, !1, $.sources.USER);
				});
			} else this.quill.removeFormat(e.index, e.length, $.sources.USER);
		},
		direction(e) {
			let { align: t } = this.quill.getFormat();
			e === "rtl" && t == null ? this.quill.format("align", "right", $.sources.USER) : !e && t === "right" && this.quill.format("align", !1, $.sources.USER), this.quill.format("direction", e, $.sources.USER);
		},
		indent(e) {
			let t = this.quill.getSelection(), n = this.quill.getFormat(t), r = parseInt(n.indent || 0, 10);
			if (e === "+1" || e === "-1") {
				let t = e === "+1" ? 1 : -1;
				n.direction === "rtl" && (t *= -1), this.quill.format("indent", r + t, $.sources.USER);
			}
		},
		link(e) {
			e === !0 && (e = prompt("Enter link URL:")), this.quill.format("link", e, $.sources.USER);
		},
		list(e) {
			let t = this.quill.getSelection(), n = this.quill.getFormat(t);
			e === "check" ? n.list === "checked" || n.list === "unchecked" ? this.quill.format("list", !1, $.sources.USER) : this.quill.format("list", "unchecked", $.sources.USER) : this.quill.format("list", e, $.sources.USER);
		}
	}
};
//#endregion
//#region node_modules/quill/ui/icons.js
var Uv = "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"13\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"9\" y1=\"4\" y2=\"4\"/></svg>", Wv = "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"15\" x2=\"3\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"14\" x2=\"4\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"12\" x2=\"6\" y1=\"4\" y2=\"4\"/></svg>", Gv = "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"15\" x2=\"3\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"15\" x2=\"5\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"15\" x2=\"9\" y1=\"4\" y2=\"4\"/></svg>", Kv = "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"15\" x2=\"3\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"15\" x2=\"3\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"15\" x2=\"3\" y1=\"4\" y2=\"4\"/></svg>", qv = "<svg viewbox=\"0 0 18 18\"><g class=\"ql-fill ql-color-label\"><polygon points=\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\"/><rect height=\"1\" width=\"1\" x=\"4\" y=\"4\"/><polygon points=\"6.817 5 6 5 6 6 6.38 6 6.817 5\"/><rect height=\"1\" width=\"1\" x=\"2\" y=\"6\"/><rect height=\"1\" width=\"1\" x=\"3\" y=\"5\"/><rect height=\"1\" width=\"1\" x=\"4\" y=\"7\"/><polygon points=\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\"/><rect height=\"1\" width=\"1\" x=\"2\" y=\"12\"/><rect height=\"1\" width=\"1\" x=\"2\" y=\"9\"/><rect height=\"1\" width=\"1\" x=\"2\" y=\"15\"/><polygon points=\"4.63 10 4 10 4 11 4.192 11 4.63 10\"/><rect height=\"1\" width=\"1\" x=\"3\" y=\"8\"/><path d=\"M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z\"/><path d=\"M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z\"/><path d=\"M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z\"/><rect height=\"1\" width=\"1\" x=\"12\" y=\"2\"/><rect height=\"1\" width=\"1\" x=\"11\" y=\"3\"/><path d=\"M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z\"/><rect height=\"1\" width=\"1\" x=\"2\" y=\"3\"/><rect height=\"1\" width=\"1\" x=\"6\" y=\"2\"/><rect height=\"1\" width=\"1\" x=\"3\" y=\"2\"/><rect height=\"1\" width=\"1\" x=\"5\" y=\"3\"/><rect height=\"1\" width=\"1\" x=\"9\" y=\"2\"/><rect height=\"1\" width=\"1\" x=\"15\" y=\"14\"/><polygon points=\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\"/><rect height=\"1\" width=\"1\" x=\"13\" y=\"7\"/><rect height=\"1\" width=\"1\" x=\"15\" y=\"5\"/><rect height=\"1\" width=\"1\" x=\"14\" y=\"6\"/><rect height=\"1\" width=\"1\" x=\"15\" y=\"8\"/><rect height=\"1\" width=\"1\" x=\"14\" y=\"9\"/><path d=\"M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z\"/><rect height=\"1\" width=\"1\" x=\"14\" y=\"3\"/><polygon points=\"12 6.868 12 6 11.62 6 12 6.868\"/><rect height=\"1\" width=\"1\" x=\"15\" y=\"2\"/><rect height=\"1\" width=\"1\" x=\"12\" y=\"5\"/><rect height=\"1\" width=\"1\" x=\"13\" y=\"4\"/><polygon points=\"12.933 9 13 9 13 8 12.495 8 12.933 9\"/><rect height=\"1\" width=\"1\" x=\"9\" y=\"14\"/><rect height=\"1\" width=\"1\" x=\"8\" y=\"15\"/><path d=\"M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z\"/><rect height=\"1\" width=\"1\" x=\"5\" y=\"15\"/><path d=\"M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z\"/><rect height=\"1\" width=\"1\" x=\"11\" y=\"15\"/><path d=\"M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z\"/><rect height=\"1\" width=\"1\" x=\"14\" y=\"15\"/><rect height=\"1\" width=\"1\" x=\"15\" y=\"11\"/></g><polyline class=\"ql-stroke\" points=\"5.5 13 9 5 12.5 13\"/><line class=\"ql-stroke\" x1=\"11.63\" x2=\"6.38\" y1=\"11\" y2=\"11\"/></svg>", Jv = "<svg viewbox=\"0 0 18 18\"><rect class=\"ql-fill ql-stroke\" height=\"3\" width=\"3\" x=\"4\" y=\"5\"/><rect class=\"ql-fill ql-stroke\" height=\"3\" width=\"3\" x=\"11\" y=\"5\"/><path class=\"ql-even ql-fill ql-stroke\" d=\"M7,8c0,4.031-3,5-3,5\"/><path class=\"ql-even ql-fill ql-stroke\" d=\"M14,8c0,4.031-3,5-3,5\"/></svg>", Yv = "<svg viewbox=\"0 0 18 18\"><path class=\"ql-stroke\" d=\"M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z\"/><path class=\"ql-stroke\" d=\"M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z\"/></svg>", Xv = "<svg class=\"\" viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"5\" x2=\"13\" y1=\"3\" y2=\"3\"/><line class=\"ql-stroke\" x1=\"6\" x2=\"9.35\" y1=\"12\" y2=\"3\"/><line class=\"ql-stroke\" x1=\"11\" x2=\"15\" y1=\"11\" y2=\"15\"/><line class=\"ql-stroke\" x1=\"15\" x2=\"11\" y1=\"11\" y2=\"15\"/><rect class=\"ql-fill\" height=\"1\" rx=\"0.5\" ry=\"0.5\" width=\"7\" x=\"2\" y=\"14\"/></svg>", Zv = "<svg viewbox=\"0 0 18 18\"><polyline class=\"ql-even ql-stroke\" points=\"5 7 3 9 5 11\"/><polyline class=\"ql-even ql-stroke\" points=\"13 7 15 9 13 11\"/><line class=\"ql-stroke\" x1=\"10\" x2=\"8\" y1=\"5\" y2=\"13\"/></svg>", Qv = {
	align: {
		"": Uv,
		center: Wv,
		right: Gv,
		justify: Kv
	},
	background: qv,
	blockquote: Jv,
	bold: Yv,
	clean: Xv,
	code: Zv,
	"code-block": Zv,
	color: "<svg viewbox=\"0 0 18 18\"><line class=\"ql-color-label ql-stroke ql-transparent\" x1=\"3\" x2=\"15\" y1=\"15\" y2=\"15\"/><polyline class=\"ql-stroke\" points=\"5.5 11 9 3 12.5 11\"/><line class=\"ql-stroke\" x1=\"11.63\" x2=\"6.38\" y1=\"9\" y2=\"9\"/></svg>",
	direction: {
		"": "<svg viewbox=\"0 0 18 18\"><polygon class=\"ql-stroke ql-fill\" points=\"3 11 5 9 3 7 3 11\"/><line class=\"ql-stroke ql-fill\" x1=\"15\" x2=\"11\" y1=\"4\" y2=\"4\"/><path class=\"ql-fill\" d=\"M11,3a3,3,0,0,0,0,6h1V3H11Z\"/><rect class=\"ql-fill\" height=\"11\" width=\"1\" x=\"11\" y=\"4\"/><rect class=\"ql-fill\" height=\"11\" width=\"1\" x=\"13\" y=\"4\"/></svg>",
		rtl: "<svg viewbox=\"0 0 18 18\"><polygon class=\"ql-stroke ql-fill\" points=\"15 12 13 10 15 8 15 12\"/><line class=\"ql-stroke ql-fill\" x1=\"9\" x2=\"5\" y1=\"4\" y2=\"4\"/><path class=\"ql-fill\" d=\"M5,3A3,3,0,0,0,5,9H6V3H5Z\"/><rect class=\"ql-fill\" height=\"11\" width=\"1\" x=\"5\" y=\"4\"/><rect class=\"ql-fill\" height=\"11\" width=\"1\" x=\"7\" y=\"4\"/></svg>"
	},
	formula: "<svg viewbox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z\"/><rect class=\"ql-fill\" height=\"1.6\" rx=\"0.8\" ry=\"0.8\" width=\"5\" x=\"5.15\" y=\"6.2\"/><path class=\"ql-fill\" d=\"M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z\"/></svg>",
	header: {
		1: "<svg viewBox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z\"/></svg>",
		2: "<svg viewBox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z\"/></svg>",
		3: "<svg viewBox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z\"/></svg>",
		4: "<svg viewBox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z\"/></svg>",
		5: "<svg viewBox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z\"/></svg>",
		6: "<svg viewBox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z\"/></svg>"
	},
	italic: "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"7\" x2=\"13\" y1=\"4\" y2=\"4\"/><line class=\"ql-stroke\" x1=\"5\" x2=\"11\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"8\" x2=\"10\" y1=\"14\" y2=\"4\"/></svg>",
	image: "<svg viewbox=\"0 0 18 18\"><rect class=\"ql-stroke\" height=\"10\" width=\"12\" x=\"3\" y=\"4\"/><circle class=\"ql-fill\" cx=\"6\" cy=\"7\" r=\"1\"/><polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"/></svg>",
	indent: {
		"+1": "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"4\" y2=\"4\"/><line class=\"ql-stroke\" x1=\"9\" x2=\"15\" y1=\"9\" y2=\"9\"/><polyline class=\"ql-fill ql-stroke\" points=\"3 7 3 11 5 9 3 7\"/></svg>",
		"-1": "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"4\" y2=\"4\"/><line class=\"ql-stroke\" x1=\"9\" x2=\"15\" y1=\"9\" y2=\"9\"/><polyline class=\"ql-stroke\" points=\"5 7 5 11 3 9 5 7\"/></svg>"
	},
	link: "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"7\" x2=\"11\" y1=\"7\" y2=\"11\"/><path class=\"ql-even ql-stroke\" d=\"M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z\"/><path class=\"ql-even ql-stroke\" d=\"M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z\"/></svg>",
	list: {
		bullet: "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"6\" x2=\"15\" y1=\"4\" y2=\"4\"/><line class=\"ql-stroke\" x1=\"6\" x2=\"15\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"6\" x2=\"15\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"3\" y1=\"4\" y2=\"4\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"3\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"3\" x2=\"3\" y1=\"14\" y2=\"14\"/></svg>",
		check: "<svg class=\"\" viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"9\" x2=\"15\" y1=\"4\" y2=\"4\"/><polyline class=\"ql-stroke\" points=\"3 4 4 5 6 3\"/><line class=\"ql-stroke\" x1=\"9\" x2=\"15\" y1=\"14\" y2=\"14\"/><polyline class=\"ql-stroke\" points=\"3 14 4 15 6 13\"/><line class=\"ql-stroke\" x1=\"9\" x2=\"15\" y1=\"9\" y2=\"9\"/><polyline class=\"ql-stroke\" points=\"3 9 4 10 6 8\"/></svg>",
		ordered: "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke\" x1=\"7\" x2=\"15\" y1=\"4\" y2=\"4\"/><line class=\"ql-stroke\" x1=\"7\" x2=\"15\" y1=\"9\" y2=\"9\"/><line class=\"ql-stroke\" x1=\"7\" x2=\"15\" y1=\"14\" y2=\"14\"/><line class=\"ql-stroke ql-thin\" x1=\"2.5\" x2=\"4.5\" y1=\"5.5\" y2=\"5.5\"/><path class=\"ql-fill\" d=\"M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z\"/><path class=\"ql-stroke ql-thin\" d=\"M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156\"/><path class=\"ql-stroke ql-thin\" d=\"M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109\"/></svg>"
	},
	script: {
		sub: "<svg viewbox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z\"/><path class=\"ql-fill\" d=\"M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z\"/></svg>",
		super: "<svg viewbox=\"0 0 18 18\"><path class=\"ql-fill\" d=\"M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z\"/><path class=\"ql-fill\" d=\"M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z\"/></svg>"
	},
	strike: "<svg viewbox=\"0 0 18 18\"><line class=\"ql-stroke ql-thin\" x1=\"15.5\" x2=\"2.5\" y1=\"8.5\" y2=\"9.5\"/><path class=\"ql-fill\" d=\"M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z\"/><path class=\"ql-fill\" d=\"M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z\"/></svg>",
	table: "<svg viewbox=\"0 0 18 18\"><rect class=\"ql-stroke\" height=\"12\" width=\"12\" x=\"3\" y=\"3\"/><rect class=\"ql-fill\" height=\"2\" width=\"3\" x=\"5\" y=\"5\"/><rect class=\"ql-fill\" height=\"2\" width=\"4\" x=\"9\" y=\"5\"/><g class=\"ql-fill ql-transparent\"><rect height=\"2\" width=\"3\" x=\"5\" y=\"8\"/><rect height=\"2\" width=\"4\" x=\"9\" y=\"8\"/><rect height=\"2\" width=\"3\" x=\"5\" y=\"11\"/><rect height=\"2\" width=\"4\" x=\"9\" y=\"11\"/></g></svg>",
	underline: "<svg viewbox=\"0 0 18 18\"><path class=\"ql-stroke\" d=\"M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3\"/><rect class=\"ql-fill\" height=\"1\" rx=\"0.5\" ry=\"0.5\" width=\"12\" x=\"3\" y=\"15\"/></svg>",
	video: "<svg viewbox=\"0 0 18 18\"><rect class=\"ql-stroke\" height=\"12\" width=\"12\" x=\"3\" y=\"3\"/><rect class=\"ql-fill\" height=\"12\" width=\"1\" x=\"5\" y=\"3\"/><rect class=\"ql-fill\" height=\"12\" width=\"1\" x=\"12\" y=\"3\"/><rect class=\"ql-fill\" height=\"2\" width=\"8\" x=\"5\" y=\"8\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"3\" y=\"5\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"3\" y=\"7\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"3\" y=\"10\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"3\" y=\"12\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"12\" y=\"5\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"12\" y=\"7\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"12\" y=\"10\"/><rect class=\"ql-fill\" height=\"1\" width=\"3\" x=\"12\" y=\"12\"/></svg>"
}, $v = "<svg viewbox=\"0 0 18 18\"><polygon class=\"ql-stroke\" points=\"7 11 9 13 11 11 7 11\"/><polygon class=\"ql-stroke\" points=\"7 7 9 5 11 7 7 7\"/></svg>", ey = 0;
function ty(e, t) {
	e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
}
var ny = class {
	constructor(e) {
		this.select = e, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
			this.togglePicker();
		}), this.label.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "Enter":
					this.togglePicker();
					break;
				case "Escape":
					this.escape(), e.preventDefault();
					break;
				default:
			}
		}), this.select.addEventListener("change", this.update.bind(this));
	}
	togglePicker() {
		this.container.classList.toggle("ql-expanded"), ty(this.label, "aria-expanded"), ty(this.options, "aria-hidden");
	}
	buildItem(e) {
		let t = document.createElement("span");
		t.tabIndex = "0", t.setAttribute("role", "button"), t.classList.add("ql-picker-item");
		let n = e.getAttribute("value");
		return n && t.setAttribute("data-value", n), e.textContent && t.setAttribute("data-label", e.textContent), t.addEventListener("click", () => {
			this.selectItem(t, !0);
		}), t.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "Enter":
					this.selectItem(t, !0), e.preventDefault();
					break;
				case "Escape":
					this.escape(), e.preventDefault();
					break;
				default:
			}
		}), t;
	}
	buildLabel() {
		let e = document.createElement("span");
		return e.classList.add("ql-picker-label"), e.innerHTML = $v, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
	}
	buildOptions() {
		let e = document.createElement("span");
		e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${ey}`, ey += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
			let n = this.buildItem(t);
			e.appendChild(n), t.selected === !0 && this.selectItem(n);
		}), this.container.appendChild(e);
	}
	buildPicker() {
		Array.from(this.select.attributes).forEach((e) => {
			this.container.setAttribute(e.name, e.value);
		}), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
	}
	escape() {
		this.close(), setTimeout(() => this.label.focus(), 1);
	}
	close() {
		this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
	}
	selectItem(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = this.container.querySelector(".ql-selected");
		e !== n && (n?.classList.remove("ql-selected"), e != null && (e.classList.add("ql-selected"), this.select.selectedIndex = Array.from(e.parentNode.children).indexOf(e), e.hasAttribute("data-value") ? this.label.setAttribute("data-value", e.getAttribute("data-value")) : this.label.removeAttribute("data-value"), e.hasAttribute("data-label") ? this.label.setAttribute("data-label", e.getAttribute("data-label")) : this.label.removeAttribute("data-label"), t && (this.select.dispatchEvent(new Event("change")), this.close())));
	}
	update() {
		let e;
		if (this.select.selectedIndex > -1) {
			let t = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
			e = this.select.options[this.select.selectedIndex], this.selectItem(t);
		} else this.selectItem(null);
		let t = e != null && e !== this.select.querySelector("option[selected]");
		this.label.classList.toggle("ql-active", t);
	}
}, ry = class extends ny {
	constructor(e, t) {
		super(e), this.label.innerHTML = t, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((e) => {
			e.classList.add("ql-primary");
		});
	}
	buildItem(e) {
		let t = super.buildItem(e);
		return t.style.backgroundColor = e.getAttribute("value") || "", t;
	}
	selectItem(e, t) {
		super.selectItem(e, t);
		let n = this.label.querySelector(".ql-color-label"), r = e && e.getAttribute("data-value") || "";
		n && (n.tagName === "line" ? n.style.stroke = r : n.style.fill = r);
	}
}, iy = class extends ny {
	constructor(e, t) {
		super(e), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((e) => {
			e.innerHTML = t[e.getAttribute("data-value") || ""];
		}), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
	}
	selectItem(e, t) {
		super.selectItem(e, t);
		let n = e || this.defaultItem;
		if (n != null) {
			if (this.label.innerHTML === n.innerHTML) return;
			this.label.innerHTML = n.innerHTML;
		}
	}
}, ay = (e) => {
	let { overflowY: t } = getComputedStyle(e, null);
	return t !== "visible" && t !== "clip";
}, oy = class {
	constructor(e, t) {
		this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, ay(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
			this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
		}), this.hide();
	}
	hide() {
		this.root.classList.add("ql-hidden");
	}
	position(e) {
		let t = e.left + e.width / 2 - this.root.offsetWidth / 2, n = e.bottom + this.quill.root.scrollTop;
		this.root.style.left = `${t}px`, this.root.style.top = `${n}px`, this.root.classList.remove("ql-flip");
		let r = this.boundsContainer.getBoundingClientRect(), i = this.root.getBoundingClientRect(), a = 0;
		if (i.right > r.right && (a = r.right - i.right, this.root.style.left = `${t + a}px`), i.left < r.left && (a = r.left - i.left, this.root.style.left = `${t + a}px`), i.bottom > r.bottom) {
			let t = i.bottom - i.top, r = e.bottom - e.top + t;
			this.root.style.top = `${n - r}px`, this.root.classList.add("ql-flip");
		}
		return a;
	}
	show() {
		this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
	}
}, sy = [
	!1,
	"center",
	"right",
	"justify"
], cy = /* @__PURE__ */ "#000000.#e60000.#ff9900.#ffff00.#008a00.#0066cc.#9933ff.#ffffff.#facccc.#ffebcc.#ffffcc.#cce8cc.#cce0f5.#ebd6ff.#bbbbbb.#f06666.#ffc266.#ffff66.#66b966.#66a3e0.#c285ff.#888888.#a10000.#b26b00.#b2b200.#006100.#0047b2.#6b24b2.#444444.#5c0000.#663d00.#666600.#003700.#002966.#3d1466".split("."), ly = [
	!1,
	"serif",
	"monospace"
], uy = [
	"1",
	"2",
	"3",
	!1
], dy = [
	"small",
	!1,
	"large",
	"huge"
], fy = class extends fg {
	constructor(e, t) {
		super(e, t);
		let n = (t) => {
			if (!document.body.contains(e.root)) {
				document.body.removeEventListener("click", n);
				return;
			}
			this.tooltip != null && !this.tooltip.root.contains(t.target) && document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((e) => {
				e.container.contains(t.target) || e.close();
			});
		};
		e.emitter.listenDOM("click", document.body, n);
	}
	addModule(e) {
		let t = super.addModule(e);
		return e === "toolbar" && this.extendToolbar(t), t;
	}
	buildButtons(e, t) {
		Array.from(e).forEach((e) => {
			(e.getAttribute("class") || "").split(/\s+/).forEach((n) => {
				if (n.startsWith("ql-") && (n = n.slice(3), t[n] != null)) if (n === "direction") e.innerHTML = t[n][""] + t[n].rtl;
				else if (typeof t[n] == "string") e.innerHTML = t[n];
				else {
					let r = e.value || "";
					r != null && t[n][r] && (e.innerHTML = t[n][r]);
				}
			});
		});
	}
	buildPickers(e, t) {
		this.pickers = Array.from(e).map((e) => {
			if (e.classList.contains("ql-align") && (e.querySelector("option") ?? hy(e, sy), typeof t.align == "object")) return new iy(e, t.align);
			if (e.classList.contains("ql-background") || e.classList.contains("ql-color")) {
				let n = e.classList.contains("ql-background") ? "background" : "color";
				return e.querySelector("option") ?? hy(e, cy, n === "background" ? "#ffffff" : "#000000"), new ry(e, t[n]);
			}
			return e.querySelector("option") ?? (e.classList.contains("ql-font") ? hy(e, ly) : e.classList.contains("ql-header") ? hy(e, uy) : e.classList.contains("ql-size") && hy(e, dy)), new ny(e);
		}), this.quill.on(Q.events.EDITOR_CHANGE, () => {
			this.pickers.forEach((e) => {
				e.update();
			});
		});
	}
};
fy.DEFAULTS = Km({}, fg.DEFAULTS, { modules: { toolbar: { handlers: {
	formula() {
		this.quill.theme.tooltip.edit("formula");
	},
	image() {
		let e = this.container.querySelector("input.ql-image[type=file]");
		e ?? (e = document.createElement("input"), e.setAttribute("type", "file"), e.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), e.classList.add("ql-image"), e.addEventListener("change", () => {
			let t = this.quill.getSelection(!0);
			this.quill.uploader.upload(t, e.files), e.value = "";
		}), this.container.appendChild(e)), e.click();
	},
	video() {
		this.quill.theme.tooltip.edit("video");
	}
} } } });
var py = class extends oy {
	constructor(e, t) {
		super(e, t), this.textbox = this.root.querySelector("input[type=\"text\"]"), this.listen();
	}
	listen() {
		this.textbox.addEventListener("keydown", (e) => {
			e.key === "Enter" ? (this.save(), e.preventDefault()) : e.key === "Escape" && (this.cancel(), e.preventDefault());
		});
	}
	cancel() {
		this.hide(), this.restoreFocus();
	}
	edit() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
		if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
		t == null ? e !== this.root.getAttribute("data-mode") && (this.textbox.value = "") : this.textbox.value = t;
		let n = this.quill.getBounds(this.quill.selection.savedRange);
		n != null && this.position(n), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${e}`) || ""), this.root.setAttribute("data-mode", e);
	}
	restoreFocus() {
		this.quill.focus({ preventScroll: !0 });
	}
	save() {
		let { value: e } = this.textbox;
		switch (this.root.getAttribute("data-mode")) {
			case "link": {
				let { scrollTop: t } = this.quill.root;
				this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, Q.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, Q.sources.USER)), this.quill.root.scrollTop = t;
				break;
			}
			case "video": e = my(e);
			case "formula": {
				if (!e) break;
				let t = this.quill.getSelection(!0);
				if (t != null) {
					let n = t.index + t.length;
					this.quill.insertEmbed(n, this.root.getAttribute("data-mode"), e, Q.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", Q.sources.USER), this.quill.setSelection(n + 2, Q.sources.USER);
				}
				break;
			}
			default:
		}
		this.textbox.value = "", this.hide();
	}
};
function my(e) {
	let t = e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
	return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = e.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : e;
}
function hy(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
	t.forEach((t) => {
		let r = document.createElement("option");
		t === n ? r.setAttribute("selected", "selected") : r.setAttribute("value", String(t)), e.appendChild(r);
	});
}
//#endregion
//#region node_modules/quill/themes/bubble.js
var gy = [[
	"bold",
	"italic",
	"link"
], [
	{ header: 1 },
	{ header: 2 },
	"blockquote"
]], _y = class extends py {
	static TEMPLATE = [
		"<span class=\"ql-tooltip-arrow\"></span>",
		"<div class=\"ql-tooltip-editor\">",
		"<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">",
		"<a class=\"ql-close\"></a>",
		"</div>"
	].join("");
	constructor(e, t) {
		super(e, t), this.quill.on(Q.events.EDITOR_CHANGE, (e, t, n, r) => {
			if (e === Q.events.SELECTION_CHANGE) if (t != null && t.length > 0 && r === Q.sources.USER) {
				this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
				let e = this.quill.getLines(t.index, t.length);
				if (e.length === 1) {
					let e = this.quill.getBounds(t);
					e != null && this.position(e);
				} else {
					let n = e[e.length - 1], r = this.quill.getIndex(n), i = Math.min(n.length() - 1, t.index + t.length - r), a = this.quill.getBounds(new Xh(r, i));
					a != null && this.position(a);
				}
			} else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
		});
	}
	listen() {
		super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
			this.root.classList.remove("ql-editing");
		}), this.quill.on(Q.events.SCROLL_OPTIMIZE, () => {
			setTimeout(() => {
				if (this.root.classList.contains("ql-hidden")) return;
				let e = this.quill.getSelection();
				if (e != null) {
					let t = this.quill.getBounds(e);
					t != null && this.position(t);
				}
			}, 1);
		});
	}
	cancel() {
		this.show();
	}
	position(e) {
		let t = super.position(e), n = this.root.querySelector(".ql-tooltip-arrow");
		return n.style.marginLeft = "", t !== 0 && (n.style.marginLeft = `${-1 * t - n.offsetWidth / 2}px`), t;
	}
}, vy = class extends fy {
	constructor(e, t) {
		t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = gy), super(e, t), this.quill.container.classList.add("ql-bubble");
	}
	extendToolbar(e) {
		this.tooltip = new _y(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), Qv), this.buildPickers(e.container.querySelectorAll("select"), Qv));
	}
};
vy.DEFAULTS = Km({}, fy.DEFAULTS, { modules: { toolbar: { handlers: { link(e) {
	e ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, $.sources.USER);
} } } } });
//#endregion
//#region node_modules/quill/themes/snow.js
var yy = [
	[{ header: [
		"1",
		"2",
		"3",
		!1
	] }],
	[
		"bold",
		"italic",
		"underline",
		"link"
	],
	[{ list: "ordered" }, { list: "bullet" }],
	["clean"]
], by = class extends py {
	static TEMPLATE = [
		"<a class=\"ql-preview\" rel=\"noopener noreferrer\" target=\"_blank\" href=\"about:blank\"></a>",
		"<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">",
		"<a class=\"ql-action\"></a>",
		"<a class=\"ql-remove\"></a>"
	].join("");
	preview = this.root.querySelector("a.ql-preview");
	listen() {
		super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
			this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
		}), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
			if (this.linkRange != null) {
				let e = this.linkRange;
				this.restoreFocus(), this.quill.formatText(e, "link", !1, Q.sources.USER), delete this.linkRange;
			}
			e.preventDefault(), this.hide();
		}), this.quill.on(Q.events.SELECTION_CHANGE, (e, t, n) => {
			if (e != null) {
				if (e.length === 0 && n === Q.sources.USER) {
					let [t, n] = this.quill.scroll.descendant(gv, e.index);
					if (t != null) {
						this.linkRange = new Xh(e.index - n, t.length());
						let r = gv.formats(t.domNode);
						this.preview.textContent = r, this.preview.setAttribute("href", r), this.show();
						let i = this.quill.getBounds(this.linkRange);
						i != null && this.position(i);
						return;
					}
				} else delete this.linkRange;
				this.hide();
			}
		});
	}
	show() {
		super.show(), this.root.removeAttribute("data-mode");
	}
}, xy = class extends fy {
	constructor(e, t) {
		t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = yy), super(e, t), this.quill.container.classList.add("ql-snow");
	}
	extendToolbar(e) {
		e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), Qv), this.buildPickers(e.container.querySelectorAll("select"), Qv), this.tooltip = new by(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
			key: "k",
			shortKey: !0
		}, (t, n) => {
			e.handlers.link.call(e, !n.format.link);
		}));
	}
};
xy.DEFAULTS = Km({}, fy.DEFAULTS, { modules: { toolbar: { handlers: { link(e) {
	if (e) {
		let e = this.quill.getSelection();
		if (e == null || e.length === 0) return;
		let t = this.quill.getText(e);
		/^\S+@\S+\.\S+$/.test(t) && t.indexOf("mailto:") !== 0 && (t = `mailto:${t}`);
		let { tooltip: n } = this.quill.theme;
		n.edit("link", t);
	} else this.quill.format("link", !1, $.sources.USER);
} } } } }), cv.register({
	"attributors/attribute/direction": Jg,
	"attributors/class/align": Lg,
	"attributors/class/background": Hg,
	"attributors/class/color": Bg,
	"attributors/class/direction": Yg,
	"attributors/class/font": Qg,
	"attributors/class/size": e_,
	"attributors/style/align": Rg,
	"attributors/style/background": Ug,
	"attributors/style/color": Vg,
	"attributors/style/direction": Xg,
	"attributors/style/font": $g,
	"attributors/style/size": t_
}, !0), cv.register({
	"formats/align": Lg,
	"formats/direction": Yg,
	"formats/indent": lv,
	"formats/background": Ug,
	"formats/color": Vg,
	"formats/font": Qg,
	"formats/size": e_,
	"formats/blockquote": uv,
	"formats/code-block": Gg,
	"formats/header": dv,
	"formats/list": pv,
	"formats/bold": mv,
	"formats/code": Kg,
	"formats/italic": hv,
	"formats/link": gv,
	"formats/script": vv,
	"formats/strike": yv,
	"formats/underline": bv,
	"formats/formula": xv,
	"formats/image": Cv,
	"formats/video": Tv,
	"modules/syntax": jv,
	"modules/table": Lv,
	"modules/toolbar": zv,
	"themes/bubble": vy,
	"themes/snow": xy,
	"ui/icons": Qv,
	"ui/picker": ny,
	"ui/icon-picker": iy,
	"ui/color-picker": ry,
	"ui/tooltip": oy
}, !0);
var Sy = cv, Cy = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
};
//#endregion
//#region src/components/VuAdminHtmlEditor.vue
function wy(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ty(e, t) {
	if (!wy(t)) return e;
	let n = { ...e };
	for (let r of Object.keys(t)) {
		let i = t[r], a = e[r];
		wy(i) && wy(a) ? n[r] = Ty(a, i) : n[r] = i;
	}
	return n;
}
var Ey = {
	props: {
		modelValue: [String, null],
		quillOptions: {
			type: Object,
			default: () => ({})
		}
	},
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
	watch: { modelValue(e) {
		if (e ||= "", this.quill) {
			let t = (e || "").trim();
			this.getCleanHtmlContent() !== t && this.setHtmlContent(t);
		}
	} },
	methods: {
		initQuillEditor() {
			let e = Sy.import("blots/block");
			class t extends e {}
			t.tagName = "div", Sy.register(t, !0);
			let n = Sy.import("blots/embed");
			class r extends n {
				static create(e) {
					let t = document.createElement("iframe");
					if (typeof e == "string") {
						let n = document.createElement("div");
						n.innerHTML = e;
						let r = n.querySelector("iframe");
						if (r) return Array.from(r.attributes).forEach((e) => {
							t.setAttribute(e.name, e.value);
						}), t;
						t.setAttribute("src", e);
					} else Object.keys(e).forEach((n) => {
						n === "url" || n === "src" ? t.setAttribute("src", e[n]) : e[n] !== void 0 && e[n] !== null && t.setAttribute(n, e[n]);
					});
					return t.getAttribute("style") || t.setAttribute("style", "max-width: 100%; border: none;"), t;
				}
				static value(e) {
					let t = {};
					return Array.from(e.attributes).forEach((e) => {
						t[e.name] = e.value;
					}), t;
				}
			}
			r.blotName = "iframe", r.tagName = "iframe", r.className = "ql-iframe", Sy.register(r);
			let i = Ty({
				theme: "snow",
				modules: { toolbar: {
					container: [
						[{ header: [
							1,
							2,
							3,
							4,
							5,
							6,
							!1
						] }],
						["blockquote", "code-block"],
						[{ font: [] }, { size: [
							"small",
							!1,
							"large",
							"huge"
						] }],
						[
							"bold",
							"italic",
							"underline",
							"strike"
						],
						[{ color: [] }, { background: [] }],
						[{ script: "sub" }, { script: "super" }],
						[
							"link",
							"image",
							"iframe"
						],
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
				} },
				formats: [
					"header",
					"blockquote",
					"code-block",
					"font",
					"size",
					"bold",
					"italic",
					"underline",
					"strike",
					"color",
					"background",
					"script",
					"link",
					"image",
					"iframe",
					"list",
					"indent",
					"align"
				]
			}, this.quillOptions || {});
			this.quill = new Sy(this.$refs.editor, i);
			let a = (this.modelValue || "").trim();
			this.setHtmlContent(a), this.$nextTick(() => {
				let e = this.$refs.editor.parentElement.querySelector(".ql-toolbar");
				if (e) {
					let t = e.querySelector("button[class*=\"iframe\"], .ql-iframe");
					t && (t.innerHTML = "\n              <svg viewBox=\"0 0 18 18\">\n                <rect class=\"ql-stroke\" height=\"10\" width=\"12\" x=\"3\" y=\"4\"></rect>\n                <line class=\"ql-stroke\" x1=\"9\" x2=\"9\" y1=\"4\" y2=\"14\"></line>\n                <line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"7\" y2=\"7\"></line>\n                <line class=\"ql-stroke\" x1=\"3\" x2=\"15\" y1=\"11\" y2=\"11\"></line>\n              </svg>\n            ");
					let n = e.querySelector("button[class*=\"html\"], .ql-html");
					n && (n.innerHTML = "\n              <svg viewBox=\"0 0 18 18\">\n                <polyline class=\"ql-stroke\" points=\"5 7 3 9 5 11\"></polyline>\n                <polyline class=\"ql-stroke\" points=\"13 7 15 9 13 11\"></polyline>\n                <line class=\"ql-stroke\" x1=\"10\" x2=\"8\" y1=\"5\" y2=\"13\"></line>\n              </svg>\n            ", n.setAttribute("title", "HTML szerkesztés"));
				}
			}), this.quill.on("text-change", () => {
				let e = this.getCleanHtmlContent();
				this.$emit("update:modelValue", e);
			});
		},
		getCleanHtmlContent() {
			if (!this.quill) return "";
			let e = this.quill.root.innerHTML, t = document.createElement("div");
			t.innerHTML = e;
			let n = (t.textContent || "").replace(/\u200B/g, "").trim().length > 0, r = !!t.querySelector("img, video, audio, iframe, embed, object, svg"), i = t.innerHTML.trim();
			return !n && !r ? "" : i;
		},
		openHtmlModal() {
			let e = this.getCleanHtmlContent();
			this.htmlContent = e || "", this.showHtmlModal = !0, this.$nextTick(() => {
				this.$refs.htmlTextarea && this.$refs.htmlTextarea.focus();
			});
		},
		closeHtmlModal() {
			this.showHtmlModal = !1;
		},
		applyHtmlContent() {
			if (this.quill) {
				let e = (this.htmlContent || "").trim();
				this.setHtmlContent(e);
				let t = this.getCleanHtmlContent();
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
			if (!this.iframeHtml || !this.iframeHtml.trim()) return;
			let e = this.quill.getSelection(!0), t = e ? e.index : this.quill.getLength(), n = document.createElement("div");
			n.innerHTML = this.iframeHtml.trim();
			let r = n.querySelector("iframe");
			if (r) {
				let e = {};
				Array.from(r.attributes).forEach((t) => {
					e[t.name] = t.value;
				}), this.quill.insertText(t, "\n"), this.quill.insertEmbed(t + 1, "iframe", e), this.quill.insertText(t + 2, "\n"), this.quill.setSelection(t + 3);
				let n = this.getCleanHtmlContent();
				this.$emit("update:modelValue", n);
			} else {
				this.quill.insertText(t, "\n");
				let e = document.createElement("div");
				e.innerHTML = this.iframeHtml.trim();
				let n = e.firstElementChild;
				if (n) {
					this.quill.root.insertBefore(n, this.quill.root.childNodes[t + 1]), this.quill.setSelection(t + 2);
					let e = this.getCleanHtmlContent();
					this.$emit("update:modelValue", e);
				}
			}
			this.closeIframeModal();
		},
		setHtmlContent(e) {
			if (!this.quill) return;
			let t = (e || "").trim();
			if (!t) {
				this.quill.setContents([]);
				return;
			}
			this.quill.clipboard.dangerouslyPasteHTML(t);
		}
	}
}, Dy = { class: "ql-editor-container" }, Oy = {
	class: "",
	ref: "editor"
}, ky = { class: "html-modal-header" }, Ay = { class: "html-modal-body" }, jy = { class: "html-modal-footer" }, My = { class: "html-modal-header" }, Ny = { class: "html-modal-body" }, Py = { class: "html-modal-footer" };
function Fy(e, t, a, o, s, c) {
	return l(), r("div", Dy, [
		i("div", Oy, null, 512),
		e.showHtmlModal ? (l(), r("div", {
			key: 0,
			class: "html-modal-overlay",
			onClick: t[5] ||= (...t) => e.closeHtmlModal && e.closeHtmlModal(...t)
		}, [i("div", {
			class: "html-modal-content",
			onClick: t[4] ||= b(() => {}, ["stop"])
		}, [
			i("div", ky, [t[12] ||= i("h5", null, "HTML szerkesztés", -1), i("button", {
				type: "button",
				class: "btn-close",
				onClick: t[0] ||= (...t) => e.closeHtmlModal && e.closeHtmlModal(...t)
			})]),
			i("div", Ay, [v(i("textarea", {
				ref: "htmlTextarea",
				class: "form-control html-textarea",
				"onUpdate:modelValue": t[1] ||= (t) => e.htmlContent = t,
				rows: "15"
			}, null, 512), [[g, e.htmlContent]])]),
			i("div", jy, [i("button", {
				type: "button",
				class: "btn btn-secondary",
				onClick: t[2] ||= (...t) => e.closeHtmlModal && e.closeHtmlModal(...t)
			}, "Mégse"), i("button", {
				type: "button",
				class: "btn btn-primary",
				onClick: t[3] ||= (...t) => e.applyHtmlContent && e.applyHtmlContent(...t)
			}, "Alkalmaz")])
		])])) : n("", !0),
		e.showIframeModal ? (l(), r("div", {
			key: 1,
			class: "html-modal-overlay",
			onClick: t[11] ||= (...t) => e.closeIframeModal && e.closeIframeModal(...t)
		}, [i("div", {
			class: "html-modal-content",
			onClick: t[10] ||= b(() => {}, ["stop"])
		}, [
			i("div", My, [t[13] ||= i("h5", null, "Iframe beillesztése", -1), i("button", {
				type: "button",
				class: "btn-close",
				onClick: t[6] ||= (...t) => e.closeIframeModal && e.closeIframeModal(...t)
			})]),
			i("div", Ny, [t[14] ||= i("label", { class: "form-label" }, "Iframe HTML kód:", -1), v(i("textarea", {
				ref: "iframeTextarea",
				class: "form-control html-textarea",
				"onUpdate:modelValue": t[7] ||= (t) => e.iframeHtml = t,
				rows: "5",
				placeholder: "<iframe src=\"...\" width=\"...\" height=\"...\"></iframe>"
			}, null, 512), [[g, e.iframeHtml]])]),
			i("div", Py, [i("button", {
				type: "button",
				class: "btn btn-secondary",
				onClick: t[8] ||= (...t) => e.closeIframeModal && e.closeIframeModal(...t)
			}, "Mégse"), i("button", {
				type: "button",
				class: "btn btn-primary",
				onClick: t[9] ||= (...t) => e.insertIframe && e.insertIframe(...t)
			}, "Beillesztés")])
		])])) : n("", !0)
	]);
}
var Iy = /* @__PURE__ */ Cy(Ey, [["render", Fy]]), Ly = {
	props: { file: Object },
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
		}
	}
}, Ry = {
	key: 0,
	class: "table table-sm w-100 vsa-file-info"
}, zy = { class: "text-nowrap text-center" }, By = { class: "text-center" }, Vy = { class: "text-nowrap text-end" }, Hy = ["innerHTML"], Uy = { class: "text-end" }, Wy = { class: "text-nowrap text-center" }, Gy = { class: "text-center" }, Ky = { class: "text-end" }, qy = ["innerHTML"], Jy = { class: "text-end" }, Yy = {
	key: 0,
	class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, Xy = { colspan: "3" }, Zy = { class: "text-end" }, Qy = ["innerHTML"], $y = { class: "d-flex justify-content-between text-nowrap" }, eb = { class: "d-flex justify-content-between text-nowrap" }, tb = { class: "text-muted fw-light me-3" }, nb = {
	key: 1,
	class: "d-flex justify-content-between"
};
function rb(t, o, c, d, p, m) {
	return l(), r("div", null, [
		t.file ? (l(), r("table", Ry, [
			o[3] ||= i("thead", null, [i("tr", null, [
				i("td", { class: "text-muted" }, " type "),
				i("td", { class: "text-muted text-center" }, " resolution "),
				i("td", { class: "text-muted text-center" }, " ratio "),
				i("td", { class: "text-muted text-end" }, " size "),
				i("td", { class: "text-muted text-end" }, " extension "),
				i("td", { class: "text-muted" }, " crop ")
			])], -1),
			i("tbody", null, [i("tr", null, [
				o[0] ||= i("td", null, " original ", -1),
				i("td", zy, f(t.file.original.width) + " x " + f(t.file.original.height), 1),
				i("td", By, f(t.file.original.ratio), 1),
				i("td", Vy, [i("span", { innerHTML: t.roundFileSize(t.file.original.bytes, !0) }, null, 8, Hy)]),
				i("td", Uy, f(t.file.original.extension), 1),
				o[1] ||= i("td", null, null, -1)
			]), (l(!0), r(e, null, u(t.file.types, (e, a) => (l(), r("tr", { key: e }, [
				i("td", null, f(a), 1),
				i("td", Wy, f(e.width) + " x " + f(e.height), 1),
				i("td", Gy, f(e.ratio), 1),
				i("td", Ky, [i("span", {
					class: s(["text-nowrap", { "text-danger": e.bytes > t.file.original.bytes }]),
					innerHTML: t.roundFileSize(e.bytes, !0)
				}, null, 10, qy)]),
				i("td", Jy, f(e.extension), 1),
				i("td", null, [e.crop ? (l(), r("small", Yy, f(e.crop), 1)) : n("", !0)])
			]))), 128))]),
			i("tfoot", null, [i("tr", null, [
				i("td", Xy, f(t.file.uploaded ? "uploaded" : "uploading"), 1),
				i("td", Zy, [i("span", {
					class: "text-nowrap",
					innerHTML: t.roundFileSize(t.file.bytes, !0)
				}, null, 8, Qy)]),
				o[2] ||= i("td", { colspan: "2" }, null, -1)
			])])
		])) : n("", !0),
		i("small", $y, [o[4] ||= i("span", { class: "text-muted fw-light me-3" }, "original filename", -1), a(" " + f(t.file.original.name), 1)]),
		i("small", eb, [
			i("span", tb, f(t.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
			o[5] ||= a(),
			i("span", null, f(t.file.slug), 1)
		]),
		t.file.uploaded ? (l(), r("small", nb, [
			o[6] ||= i("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1),
			o[7] ||= a(),
			i("span", null, f(t.dateFormat(t.file.timestamp * 1e3)), 1)
		])) : n("", !0)
	]);
}
var ib = /* @__PURE__ */ Cy(Ly, [["render", rb]]), ab = {
	image: {
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		png: "image/png",
		webp: "image/webp",
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
}, ob = {
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
	components: { VuAdminFileUploadInfo: ib },
	created() {
		let e = Ec(1e5);
		this.uploadId = "image_upload_" + e, this.params = this.field.params;
	},
	mounted() {
		this.editfile = this.modelValue, this.editfile ||= [];
	},
	watch: { modelValue(e) {
		if (e == null) this.reset();
		else {
			for (let t of e) this.setDefaults(t);
			this.files = e;
		}
	} },
	methods: {
		roundFileSize(e, t) {
			return Gc(e, t);
		},
		extensionByFilename(e) {
			return Kc(e);
		},
		getAcceptMimeTypes(e) {
			let t = [];
			for (let n in ab) if (ab.hasOwnProperty(n)) {
				let r = ab[n];
				e.forEach((e) => {
					r[e] && t.push(r[e]);
				});
			}
			return t.join(",");
		},
		setDefaults(e) {
			!e || typeof e != "object" || (this.params && this.params.tags && !e.tags && (e.tags = []), !e.loaded && e.types && (e.loaded = Object.values(e.types).some((e) => e.data || e.url)));
		},
		detect(e) {
			this.setDefaults(e), e.bytes = 0, e.types = { default: {} }, e.title = e.name.split(".").slice(0, -1).join("."), e.uid = Ec(9999999).toString(32) + Date.now().toString(32), e.slug = Ac(e.title), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
				bytes: e.size,
				mime: e.type,
				name: e.name,
				modified: e.lastModified,
				extension: this.extensionByFilename(e.name)
			}, Object.values(ab.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(ab.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(ab.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, (e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
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
					n.currentTime = n.duration * Tc(), e.video = n;
				}), n.addEventListener("seeked", () => {
					this.forEachPresets(e, n), e.loaded = !0, this.bytes += e.bytes;
				});
			}, r.readAsDataURL(e);
		},
		seekRandom(e) {
			e.video && (e.video.currentTime = e.video.duration * Tc());
		},
		async handleFileChange(e) {
			this.uploadEvent = e, this.count = this.files ? this.files.length : 0, this.wait = !0;
			for (let t of e.target.files) if (this.count++, this.count <= this.params.limit) {
				if (this.files.push(t), this.detect(t), t.isVideo) await this.createThumbnail(t);
				else if (t.isImage && t.original.extension === "svg") await this.loadSvg(t);
				else if (t.isImage) await this.resizeImage(t);
				else if (t.isDocument) {
					let e = new FileReader();
					e.addEventListener("load", (e) => {
						t.types.default = {
							extension: t.original.extension,
							mime: t.original.mime,
							slug: Ac(t.title) + "-" + t.uid,
							bytes: t.size,
							data: e.target.result
						}, t.loaded = !0, t.bytes += t.size, this.bytes += t.bytes;
					}), e.readAsDataURL(t);
				}
			}
			this.$emit("update:modelValue", this.files), this.wait = !1, this.uploadEvent.target.value = "";
		},
		async forEachPresets(e, t, n) {
			let r = document.createElement("canvas"), i = r.getContext("2d"), a = !!t.videoWidth, o, s;
			a ? (o = t.videoWidth, s = t.videoHeight) : (o = t.width, s = t.height), e.original.width = o, e.original.height = s, e.original.ratio = this.calculateAspectRatio(o, s);
			for (let a in this.params.presets) {
				let c = this.params.presets[a];
				c.key = a, c.width = c.width ? c.width : 1920, c.height = c.height ? c.height : 1080;
				let l = c.width, u = c.height;
				if (c.crop === "cover") {
					let e = Math.max(l / o, u / s), n = o * e, a = s * e, c = (n - l) / 2, d = (a - u) / 2;
					r.width = l, r.height = u, i.drawImage(t, -c, -d, n, a);
				} else if (c.crop === "contain") {
					let e = Math.min(l / o, u / s), n = o * e, a = s * e, c = (l - n) / 2, d = (u - a) / 2;
					r.width = l, r.height = u, i.clearRect(0, 0, l, u), i.drawImage(t, c, d, n, a);
				} else o > l && (s = Math.round(l / o * s), o = l), s > u && (o = Math.round(u / s * o), s = u), r.width = o, r.height = s, i.drawImage(t, 0, 0, o, s);
				e.types[c.key] = {
					width: r.width,
					height: r.height,
					ratio: this.calculateAspectRatio(r.width, r.height),
					extension: c.extension ? c.extension : this.getExtensionByMimeType(e.type),
					quality: c.quality ? c.quality : .9,
					crop: c.crop ? c.crop : null
				}, e.types[c.key].slug = Ac(e.title) + "-" + r.width + "x" + r.height + "-" + e.uid, e.types[c.key].mime = this.getMimeTypeByExtension(e.types[c.key].extension), e.types[c.key].data = r.toDataURL(e.types[c.key].mime, e.types[c.key].quality), e.types[c.key].blob = await this.getBlob(r, e.types[c.key].mime, e.types[c.key].quality), e.types[c.key].blob && (e.types[c.key].bytes = e.types[c.key].blob.size), e.types[c.key].bytes && (e.bytes += e.types[c.key].bytes), n && n(c, e);
			}
		},
		getBlob(e, t, n) {
			return new Promise((r, i) => {
				e.toBlob(function(e) {
					e ? r(e) : i(/* @__PURE__ */ Error("Failed to convert canvas to Blob"));
				}, t, n);
			});
		},
		async resizeImage(e) {
			let t = await this.fileToBlob(e), n = await createImageBitmap(t);
			await this.forEachPresets(e, n), e.loaded = !0, this.bytes += e.bytes;
		},
		async loadSvg(e) {
			let t = new FileReader();
			await new Promise((n) => {
				t.addEventListener("load", (t) => {
					let r = t.target.result, i = e.slice(0, e.size, "image/svg+xml"), a = {
						extension: "svg",
						mime: "image/svg+xml",
						slug: Ac(e.title) + "-" + e.uid,
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
						slug: Ac(e.title) + "-" + t + "-" + e.uid
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
				e.slug = Ac(e.title);
				for (let t in e.types) {
					let n = this.params.presets[t];
					e.types[t].slug = Ac(e.title) + "-" + n.width + "x" + n.height;
				}
				this.$forceUpdate();
			}
		},
		arrayItemMoveUp(e, t) {
			Hc(e, t);
		},
		arrayItemMoveDown(e, t) {
			Uc(e, t);
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
			for (let t in ab) if (ab.hasOwnProperty(t)) {
				let n = ab[t];
				if (n[e]) return n[e];
			}
			return null;
		},
		getExtensionByMimeType(e) {
			for (let t in ab) if (ab.hasOwnProperty(t)) {
				let n = ab[t];
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
			return Pc(e, this.settings.translate, t, n || this.settings.language);
		},
		dropdownSelectToggleOne(e, t) {
			Rc(e, t), this.$forceUpdate();
		},
		dropdownSelectAll(e, t) {
			zc(e, t), this.$forceUpdate();
		},
		dropdownSelectInvert(e, t) {
			Bc(e, t), this.$forceUpdate();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? Vc(e) : e.value = null, this.$forceUpdate();
		},
		handleDrop(e) {
			e.preventDefault(), this.isDragging = !1;
			let t = e.dataTransfer.files;
			this.handleFileChange({ target: { files: t } });
		}
	}
}, sb = { class: "" }, cb = {
	key: 0,
	class: "vsa-image-editor p-2 text-center"
}, lb = { class: "row" }, ub = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, db = { class: "badge bg-dark text-light fw-light mx-1" }, fb = { class: "badge bg-dark text-light fw-light mx-1" }, pb = ["src"], mb = { class: "row g-1" }, hb = { class: "col-md-6" }, gb = { class: "col-md-6" }, _b = { class: "col-md-6" }, vb = ["href"], yb = {
	key: 1,
	class: "row g-2 mb-1"
}, bb = { key: 0 }, xb = { class: "table table-sm table-responsive table-borderless" }, Sb = { class: "align-middle px-0" }, Cb = { class: "input-group border" }, wb = { class: "d-block p-1 px-2" }, Tb = ["onClick"], Eb = ["onClick"], Db = {
	key: 0,
	class: "fs-5 mx-2"
}, Ob = {
	key: 1,
	class: "fs-5 mx-2"
}, kb = {
	key: 2,
	class: "fs-5 mx-2"
}, Ab = ["onUpdate:modelValue", "onInput"], jb = {
	key: 3,
	class: "mx-0"
}, Mb = ["href"], Nb = ["src", "alt"], Pb = ["src", "alt"], Fb = {
	key: 4,
	class: "dropdown rounded-bottom"
}, Ib = {
	class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, Lb = { class: "dropdown-menu" }, Rb = ["onClick"], zb = {
	key: 0,
	class: "bi bi-check-square"
}, Bb = {
	key: 1,
	class: "bi bi-square"
}, Vb = ["onClick"], Hb = ["onClick"], Ub = ["onClick"], Wb = { class: "dropdown" }, Gb = { class: "dropdown-menu" }, Kb = { class: "p-2" }, qb = { class: "fw-light" }, Jb = ["onClick"], Yb = { class: "vsa-image-container h-100 position-relative" }, Xb = {
	key: 0,
	class: "w-100 h-100 d-flex align-items-center flex-column"
}, Zb = {
	key: 1,
	class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, Qb = ["href"], $b = ["src", "alt"], ex = ["src", "alt"], tx = {
	key: 2,
	class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, nx = ["onUpdate:modelValue", "onInput"], rx = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, ix = { class: "p-1 px-2 border border-end-0 h-100" }, ax = ["onClick"], ox = ["onClick"], sx = {
	key: 0,
	class: "dropdown border border-end-0 h-100 w-100"
}, cx = {
	class: "btn btn-sm rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, lx = { class: "dropdown-menu" }, ux = ["onClick"], dx = {
	key: 0,
	class: "bi bi-check-square"
}, fx = {
	key: 1,
	class: "bi bi-square"
}, px = ["onClick"], mx = ["onClick"], hx = ["onClick"], gx = { class: "dropdown border h-100 w-100" }, _x = { class: "dropdown-menu" }, vx = { class: "p-2" }, yx = { class: "fw-light" }, bx = ["onClick"], xx = {
	key: 1,
	class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, Sx = { class: "row g-1" }, Cx = { class: "col-12 d-flex align-items-center justify-content-center" }, wx = ["for"], Tx = { key: 0 }, Ex = { key: 0 }, Dx = { class: "" }, Ox = { class: "" }, kx = {
	key: 1,
	class: "fs-6"
}, Ax = {
	key: 0,
	class: "bi bi-list-ol"
}, jx = {
	key: 1,
	class: "bi bi-grid"
}, Mx = ["disabled"], Nx = { class: "col-12 text-center" }, Px = { key: 0 }, Fx = ["id", "accept"];
function Ix(t, c, p, m, h, _) {
	let x = d("VuAdminFileUploadInfo");
	return l(), r("div", sb, [i("div", { class: s(["vsa-upload", { wait: t.wait }]) }, [
		t.editfile && t.editfile.presets ? (l(), r("div", cb, [
			i("div", lb, [(l(!0), r(e, null, u(t.editfile.types, (e, a) => (l(), r("div", {
				class: "col-md-3",
				key: a
			}, [
				i("span", ub, f(e.extension), 1),
				i("span", db, f(e.width) + " x " + f(e.height), 1),
				i("span", fb, "~" + f(t.roundFileSize(e.bytes)), 1),
				e ? (l(), r("img", {
					key: 0,
					class: "img-thumbnail rounded",
					src: e.url ? e.url : e.data
				}, null, 8, pb)) : n("", !0)
			]))), 128))]),
			v(i("input", {
				type: "text",
				class: "form-control form-control-sm w-100 mt-1",
				"onUpdate:modelValue": c[0] ||= (e) => t.editfile.title = e
			}, null, 512), [[g, t.editfile.title]]),
			i("div", mb, [
				i("div", hb, [i("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: c[1] ||= (e) => t.editfile = null
				}, " Close ")]),
				i("div", gb, [i("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: c[2] ||= (e) => t.remove(t.index)
				}, " Remove ")]),
				i("div", _b, [t.type && !t.type.url ? (l(), r("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					onClick: c[3] ||= (e) => t.download(t.index, t.params)
				}, " Download ")) : n("", !0), t.type && t.type.url ? (l(), r("a", {
					key: 1,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					href: t.type.url
				}, " Download ", 8, vb)) : n("", !0)])
			])
		])) : n("", !0),
		t.files && t.files.length ? (l(), r("div", yb, [t.params.ui === "list" ? (l(), r("div", bb, [i("table", xb, [i("tbody", null, [(l(!0), r(e, null, u(t.files, (d, p) => (l(), r("tr", { key: p }, [i("td", Sb, [i("div", Cb, [
			i("span", wb, f(p + 1), 1),
			i("span", {
				class: "cursor-pointer p-1 border-start border-end h-100",
				onClick: (e) => t.arrayItemMoveDown(t.files, p)
			}, [i("i", { class: s(["bi bi-arrow-up", { "opacity-25": p < 1 }]) }, null, 2)], 8, Tb),
			i("span", {
				class: "cursor-pointer p-1 border-start border-end h-100",
				onClick: (e) => t.arrayItemMoveUp(t.files, p + 1)
			}, [i("i", { class: s(["bi bi-arrow-down", { "opacity-25": p >= t.files.length - 1 }]) }, null, 2)], 8, Eb),
			d.isDocument ? (l(), r("span", Db, [i("i", { class: s(["bi bi-filetype-" + d.types.default.extension]) }, null, 2)])) : d.isImage ? (l(), r("span", Ob, [...c[12] ||= [i("i", { class: "bi bi-file-image" }, null, -1)]])) : d.isVideo ? (l(), r("span", kb, [...c[13] ||= [i("i", { class: "bi bi-file-play" }, null, -1)]])) : n("", !0),
			v(i("input", {
				required: "text",
				class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
				"onUpdate:modelValue": (e) => d.title = e,
				onInput: (e) => t.slug(d),
				onKeydown: c[4] ||= y(b(() => {}, ["prevent"]), ["enter"])
			}, null, 40, Ab), [[g, d.title]]),
			!d.isDocument && d.types && d.types[t.params.thumbnail] ? (l(), r("span", jb, [d.types.default.url ? (l(), r("a", {
				key: 0,
				target: "_blank",
				href: d.types.default.url
			}, [i("img", {
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: d.types[t.params.thumbnail].url,
				alt: d.name
			}, null, 8, Nb)], 8, Mb)) : (l(), r("img", {
				key: 1,
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: d.types[t.params.thumbnail].data,
				alt: d.name
			}, null, 8, Pb))])) : n("", !0),
			t.params.tags ? (l(), r("div", Fb, [i("button", Ib, [c[14] ||= i("i", { class: "bi bi-tag" }, null, -1), a(" " + f(d.tags ? d.tags.length : 0), 1)]), i("ul", Lb, [
				i("li", null, [(l(!0), r(e, null, u(t.params.tags, (e) => (l(), r("span", {
					key: e,
					class: "dropdown-item cursor-pointer",
					onClick: (n) => t.dropdownSelectToggleOne(d.tags, e.value)
				}, [d.tags && d.tags.indexOf(e.value) >= 0 ? (l(), r("i", zb)) : (l(), r("i", Bb)), a(" " + f(t.translate(e.label ? e.label : e.value)), 1)], 8, Rb))), 128))]),
				c[15] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectAll(d.tags, t.params.tags)
				}, f(t.translate("Select all")), 9, Vb)]),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectClear(d.tags)
				}, f(t.translate("Unselect all")), 9, Hb)]),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectInvert(d.tags, t.params.tags)
				}, f(t.translate("Invert all")), 9, Ub)])
			])])) : n("", !0),
			i("div", Wb, [c[16] ||= i("button", {
				class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100",
				type: "button",
				"data-bs-toggle": "dropdown",
				"aria-expanded": "false"
			}, [i("i", { class: "bi bi-list" })], -1), i("ul", Gb, [i("li", Kb, [i("small", qb, [o(x, { file: d }, null, 8, ["file"])])])])]),
			i("button", {
				class: "btn btn-sm btn-outline-danger border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 px-2",
				onClick: (e) => t.remove(p),
				type: "button"
			}, [...c[17] ||= [i("i", { class: "bi bi-x-circle" }, null, -1)]], 8, Jb)
		])])]))), 128))])])])) : (l(!0), r(e, { key: 1 }, u(t.files, (d, p) => (l(), r("div", {
			class: s([t.params.colclass ? t.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
			key: p
		}, [i("div", Yb, [d.loaded ? (l(), r("div", Xb, [
			n("", !0),
			d.types && d.types[t.params.thumbnail] ? (l(), r("div", Zb, [d.types.default.url ? (l(), r("a", {
				key: 0,
				target: "_blank",
				href: d.types.default.url
			}, [i("img", {
				class: "img-fluid transparent-background",
				src: d.types[t.params.thumbnail].url,
				alt: d.name
			}, null, 8, $b)], 8, Qb)) : (l(), r("img", {
				key: 1,
				class: "img-fluid transparent-background",
				src: d.types[t.params.thumbnail].data,
				alt: d.name
			}, null, 8, ex))])) : n("", !0),
			d.isDocument ? (l(), r("div", tx, [i("i", { class: s(["bi bi-filetype-" + d.types.default.extension]) }, null, 2)])) : n("", !0),
			v(i("input", {
				required: "text",
				class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
				"onUpdate:modelValue": (e) => d.title = e,
				onInput: (e) => t.slug(d),
				onKeydown: c[5] ||= y(b(() => {}, ["prevent"]), ["enter"])
			}, null, 40, nx), [[g, d.title]]),
			i("div", rx, [
				i("span", ix, f(p + 1), 1),
				i("span", {
					class: "cursor-pointer p-1 border border-end-0 h-100",
					onClick: (e) => t.arrayItemMoveDown(t.files, p)
				}, [i("i", { class: s(["bi bi-arrow-up", { "opacity-25": p < 1 }]) }, null, 2)], 8, ax),
				i("span", {
					class: "cursor-pointer p-1 border border-end-0 h-100",
					onClick: (e) => t.arrayItemMoveUp(t.files, p + 1)
				}, [i("i", { class: s(["bi bi-arrow-down", { "opacity-25": p >= t.files.length - 1 }]) }, null, 2)], 8, ox),
				t.params.tags ? (l(), r("div", sx, [i("button", cx, [c[21] ||= i("i", { class: "bi bi-tag" }, null, -1), a(" " + f(d.tags ? d.tags.length : 0), 1)]), i("ul", lx, [
					i("li", null, [(l(!0), r(e, null, u(t.params.tags, (e) => (l(), r("span", {
						key: e,
						class: "dropdown-item cursor-pointer",
						onClick: (n) => t.dropdownSelectToggleOne(d.tags, e.value)
					}, [d.tags && d.tags.indexOf(e.value) >= 0 ? (l(), r("i", dx)) : (l(), r("i", fx)), a(" " + f(t.translate(e.label ? e.label : e.value)), 1)], 8, ux))), 128))]),
					c[22] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
					i("li", null, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectAll(d.tags, t.params.tags)
					}, f(t.translate("Select all")), 9, px)]),
					i("li", null, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectClear(d.tags)
					}, f(t.translate("Unselect all")), 9, mx)]),
					i("li", null, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectInvert(d.tags, t.params.tags)
					}, f(t.translate("Invert all")), 9, hx)])
				])])) : n("", !0),
				i("div", gx, [c[23] ||= i("button", {
					class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
					type: "button",
					"data-bs-toggle": "dropdown",
					"aria-expanded": "false"
				}, [i("i", { class: "bi bi-list" })], -1), i("ul", _x, [i("li", vx, [i("small", yx, [o(x, { file: d }, null, 8, ["file"])])])])]),
				i("button", {
					class: "btn btn-outline-danger border rounded-0 border-start-0 px-2 py-1",
					onClick: (e) => t.remove(p),
					type: "button"
				}, [...c[24] ||= [i("i", { class: "bi bi-x-circle" }, null, -1)]], 8, bx)
			])
		])) : (l(), r("div", xx, [...c[25] ||= [i("span", null, null, -1)]]))])], 2))), 128))])) : n("", !0),
		i("div", Sx, [i("div", Cx, [
			i("label", {
				for: t.uploadId,
				class: s([
					{ "disabled bg-secondary": t.files && t.params.limit <= t.files.length },
					"btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone",
					{ "vsa-drop-zone-active": t.isDragging }
				]),
				onDragover: c[6] ||= b(() => {}, ["prevent"]),
				onDragenter: c[7] ||= b(() => {}, ["prevent"]),
				onDrop: c[8] ||= b((...e) => t.handleDrop && t.handleDrop(...e), ["prevent"])
			}, [t.files && t.params.limit > t.files.length ? (l(), r("span", Tx, [
				c[29] ||= i("i", { class: "bi bi-upload me-2" }, null, -1),
				a(" " + f(t.params.text) + " ", 1),
				t.params.limit ? (l(), r("small", Ex, [
					c[26] ||= a(" ( ", -1),
					i("strong", Dx, f(t.files.length), 1),
					c[27] ||= a(" / ", -1),
					i("span", Ox, f(t.params.limit), 1),
					c[28] ||= a(" ) ", -1)
				])) : n("", !0)
			])) : (l(), r("span", kx, [...c[30] ||= [i("i", { class: "bi bi-exclamation-circle" }, null, -1), a(" You've reached the upload limit ", -1)]]))], 42, wx),
			i("button", {
				type: "button",
				class: "btn btn-outline-primary ms-1",
				onClick: c[9] ||= (e) => t.toggleView()
			}, [t.params.ui == "list" ? n("", !0) : (l(), r("i", Ax)), t.params.ui == "list" ? (l(), r("i", jx)) : n("", !0)]),
			i("button", {
				disabled: !t.files.length,
				type: "button",
				class: "btn btn-outline-danger ms-1",
				onClick: c[10] ||= (e) => t.resetConfirm()
			}, [...c[31] ||= [i("i", { class: "bi bi-trash" }, null, -1)]], 8, Mx)
		]), i("div", Nx, [i("small", null, [t.params.accept ? (l(), r("div", Px, [c[32] ||= i("span", { class: "text-secondary" }, "accept only", -1), (l(!0), r(e, null, u(t.params.accept, (e) => (l(), r("strong", {
			class: "ms-1 text-muted",
			key: e
		}, f(e), 1))), 128))])) : n("", !0), n("", !0)])])]),
		t.uploadId ? (l(), r("input", {
			key: 2,
			multiple: "",
			style: {
				opacity: "0",
				height: "1px",
				width: "1px"
			},
			id: t.uploadId,
			type: "file",
			accept: t.getAcceptMimeTypes(t.params.accept),
			onChange: c[11] ||= (...e) => t.handleFileChange && t.handleFileChange(...e)
		}, null, 40, Fx)) : n("", !0)
	], 2)]);
}
var Lx = /* @__PURE__ */ Cy(ob, [["render", Ix]]), Rx = {
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
			return yc(e, t, this.settings, this);
		},
		async selectOptions(e, t) {
			return typeof e == "function" ? await e(this.item, t, this) : e;
		},
		async fetchCustom(e, t) {
			let n = await fetch(kc("GET", { url: e }, t), Oc("GET", this.settings.form.api, null, this.auth)), r = await bc(n);
			if (!xc(n, r.data)) return r.data;
		},
		handleChange(e) {
			if (this.optionValue === "object") {
				let e = this.options.find((e) => e.value === this.newitem);
				e && this.$emit("update:modelValue", e);
			} else this.$emit("update:modelValue", this.newitem);
		}
	},
	components: {}
}, zx = [
	"name",
	"id",
	"disabled",
	"readonly",
	"required"
], Bx = ["value"];
function Vx(t, n, i, a, o, c) {
	return v((l(), r("select", {
		class: s(["form-select", t.getValueOrFunction(t.field.inputclass ? t.field.inputclass : "", {
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
	}, [(l(!0), r(e, null, u(t.options, (e) => (l(), r("option", {
		class: s(t.getValueOrFunction(t.field.optionclass ? t.field.optionclass : "", {
			field: t.field,
			item: t.item,
			option: e
		})),
		key: e,
		value: e.value
	}, f(e.label ? e.label : e.value), 11, Bx))), 128))], 42, zx)), [[h, t.newitem]]);
}
var Hx = /* @__PURE__ */ Cy(Rx, [["render", Vx]]), Ux = {
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
			return yc(e, t, this.settings, this);
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
			Hc(e, t);
		},
		arrayItemMoveDown(e, t) {
			Uc(e, t);
		}
	},
	components: { VuAdminFormSelect: Hx }
}, Wx = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, Gx = { class: "col-10" }, Kx = { class: "row g-1 d-flex align-items-center justify-content-between" }, qx = { class: "col-10" }, Jx = { class: "row g-1 d-flex align-items-center justify-content-between" }, Yx = ["innerHTML"], Xx = {
	key: 1,
	class: "input-group input-group-sm"
}, Zx = [
	"type",
	"required",
	"placeholder",
	"onUpdate:modelValue"
], Qx = { class: "col-2 text-nowrap text-end" }, $x = ["onClick"], eS = ["onClick"], tS = ["onClick"], nS = { key: 0 }, rS = { class: "row g-1 d-flex align-items-center justify-content-between" }, iS = { class: "col-10" }, aS = { class: "row g-1 d-flex align-items-center justify-content-between" }, oS = { class: "input-group input-group-sm" }, sS = {
	key: 0,
	class: "input-group-text"
}, cS = [
	"type",
	"placeholder",
	"onUpdate:modelValue"
], lS = {
	key: 3,
	class: "input-group-text"
}, uS = { class: "col-2" };
function dS(a, o, c, p, h, g) {
	let _ = d("VuAdminFormSelect");
	return l(), r("div", null, [
		i("div", Wx, [i("div", Gx, [i("div", Kx, [(l(!0), r(e, null, u(a.field.elements, (e) => (l(), r("div", {
			key: e,
			class: s(e.class || "col")
		}, [i("small", null, f(e.placeholder ? e.placeholder : e.prefix ? e.prefix : ""), 1)], 2))), 128))])]), o[1] ||= i("div", { class: "col-2 text-nowrap text-end" }, null, -1)]),
		(l(!0), r(e, null, u(a.value, (c, d) => (l(), r("div", {
			class: "row g-1 d-flex align-items-center justify-content-between mb-1",
			key: d
		}, [i("div", qx, [i("div", Jx, [(l(!0), r(e, null, u(c, (e, n) => (l(), r("div", {
			key: n,
			class: s(a.field.elements[n].class || "col")
		}, [a.field.elements[n].template ? (l(), r("span", {
			key: 0,
			innerHTML: a.getValueOrFunction(a.field.elements[n].template, a.value[d])
		}, null, 8, Yx)) : (l(), r("div", Xx, [a.field.elements[n].type == "select" && a.value[d][n] ? (l(), t(_, {
			key: 0,
			modelValue: a.value[d][n],
			"onUpdate:modelValue": (e) => a.value[d][n] = e,
			field: a.field.elements[n],
			item: a.item,
			settings: a.settings,
			formId: a.formId,
			optionValue: "object"
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"field",
			"item",
			"settings",
			"formId"
		])) : v((l(), r("input", {
			key: 1,
			type: a.field.elements[n].type,
			required: a.field.elements[n].required,
			placeholder: a.field.elements[n].placeholder || n,
			class: "form-control",
			"onUpdate:modelValue": (e) => a.value[d][n] = e
		}, null, 8, Zx)), [[m, a.value[d][n]]])]))], 2))), 128))])]), i("div", Qx, [
			a.field.sortable ? (l(), r("button", {
				key: 0,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => a.arrayItemMoveUp(a.value, d)
			}, [...o[2] ||= [i("i", { class: "bi bi-arrow-up" }, null, -1)]], 8, $x)) : n("", !0),
			a.field.sortable ? (l(), r("button", {
				key: 1,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => a.arrayItemMoveDown(a.value, d + 1)
			}, [...o[3] ||= [i("i", { class: "bi bi-arrow-down" }, null, -1)]], 8, eS)) : n("", !0),
			i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-danger p-1 me-1",
				onClick: (e) => a.arrayRemoveItem(a.value, d)
			}, [...o[4] ||= [i("i", { class: "bi bi-trash" }, null, -1)]], 8, tS)
		])]))), 128)),
		a.item[a.field.name] && a.item[a.field.name].length ? (l(), r("hr", nS)) : n("", !0),
		i("div", rS, [i("div", iS, [i("div", aS, [(l(!0), r(e, null, u(a.field.elements, (e) => (l(), r("div", {
			key: e,
			class: s(e.class || "col")
		}, [i("div", oS, [
			e.prefix ? (l(), r("span", sS, f(e.prefix), 1)) : n("", !0),
			e.type == "select" && (!e.relation || e.relation && e.relation.items) ? (l(), t(_, {
				key: 1,
				modelValue: e.value,
				"onUpdate:modelValue": (t) => e.value = t,
				field: e,
				item: a.item,
				settings: a.settings,
				formId: a.formId,
				optionValue: "object"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"field",
				"item",
				"settings",
				"formId"
			])) : v((l(), r("input", {
				key: 2,
				type: e.type,
				placeholder: e.placeholder || e.name,
				class: "form-control form-control-sm",
				"onUpdate:modelValue": (t) => e.value = t
			}, null, 8, cS)), [[m, e.value]]),
			e.suffix ? (l(), r("span", lS, f(e.suffix), 1)) : n("", !0)
		]), n("", !0)], 2))), 128))])]), i("div", uS, [i("button", {
			type: "button",
			class: "btn btn-sm btn-outline-primary my-1 w-100",
			onClick: o[0] ||= (e) => a.arrayAddNewItem(a.field, a.item)
		}, [...o[5] ||= [i("i", { class: "bi bi-plus" }, null, -1)]])])])
	]);
}
//#endregion
//#region src/components/VuAdminFormGroup.vue
var fS = {
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
			return yc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return Pc(e, this.settings.translate, t, n || this.settings.language);
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
			Hc(e, t);
		},
		arrayItemMoveDown(e, t) {
			Uc(e, t);
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
			Rc(t, n.value ? n.value : n);
		},
		dropdownSelectAll(e, t) {
			zc(e, t);
		},
		dropdownSelectInvert(e, t) {
			Bc(e, t);
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? Vc(e) : e.value = null;
		}
	},
	components: {
		HtmlEditor: Iy,
		FileUpload: Lx,
		VuAdminFormSelect: Hx,
		VuAdminFormList: /* @__PURE__ */ Cy(Ux, [["render", dS]])
	}
}, pS = { class: "row m-1" }, mS = ["innerHTML"], hS = {
	key: 1,
	class: "row"
}, gS = { class: "form-group pb-3" }, _S = { key: 0 }, vS = {
	key: 0,
	class: "badge text-secondary fw-light"
}, yS = ["for", "innerHTML"], bS = {
	key: 1,
	class: "input-group"
}, xS = ["innerHTML"], SS = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"disabled",
	"readonly",
	"required"
], CS = [
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
], wS = [
	"type",
	"name",
	"id",
	"onUpdate:modelValue",
	"min",
	"max",
	"disabled",
	"readonly",
	"required"
], TS = {
	key: 4,
	class: "form-check"
}, ES = [
	"name",
	"id",
	"true-value",
	"false-value",
	"onUpdate:modelValue",
	"disabled",
	"readonly",
	"required"
], DS = ["for"], OS = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"readonly",
	"disabled",
	"required"
], kS = [
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
], AS = ["innerHTML"], jS = { class: "dropdown d-inline-block" }, MS = { class: "dropdown-menu" }, NS = ["onClick"], PS = {
	key: 0,
	class: "bi bi-check-square"
}, FS = {
	key: 1,
	class: "bi bi-square"
}, IS = ["onClick"], LS = ["onClick"], RS = ["onClick"], zS = ["onClick"], BS = { key: 6 }, VS = { key: 0 }, HS = ["for"], US = [
	"name",
	"id",
	"onUpdate:modelValue"
], WS = ["onClick"], GS = ["innerHTML"], KS = {
	key: 8,
	class: "p-1"
}, qS = ["innerHTML"];
function JS(o, c, h, _, y, b) {
	let x = d("VuAdminFormSelect"), S = d("HtmlEditor"), C = d("FileUpload"), w = d("VuAdminFormList");
	return l(), r("div", pS, [(l(!0), r(e, null, u(o.settings.form.groups, (d) => (l(), r("div", {
		key: d,
		class: s([d.class ? d.class : "col-md-12"])
	}, [d.title ? (l(), r("h2", {
		key: 0,
		class: "form-row-title mb-4 fw-lighter",
		innerHTML: d.title ? d.title : ""
	}, null, 8, mS)) : n("", !0), o.item && d.fields ? (l(), r("div", hS, [(l(!0), r(e, null, u(d.fields, (d) => (l(), r("div", {
		class: s([o.getValueOrFunction(d.class ? d.class : "col-md-12"), "input_type_" + d.type]),
		key: d
	}, [i("div", gS, [
		d.label ? (l(), r("span", _S, [[
			"html",
			"image",
			"upload"
		].indexOf(d.type) >= 0 ? (l(), r("label", {
			key: 0,
			class: s([{ required: d.required }, "form-label text-secondary mb-1"])
		}, [a(f(d.label ? d.label : o.translate(d.name)) + " ", 1), d.maxlength ? (l(), r("span", vS, f(o.item[d.name] ? o.item[d.name].length : 0) + " / " + f(d.maxlength), 1)) : n("", !0)], 2)) : (l(), r("label", {
			key: 1,
			class: s([{ required: d.required }, "form-label text-secondary mb-1"]),
			for: o.formId + "_" + d.name,
			innerHTML: o.getValueOrFunction(d.label ? d.label : o.translate(d.name), {
				field: d,
				item: o.item
			})
		}, null, 10, yS))])) : n("", !0),
		[
			"html",
			"image",
			"list",
			"addresses",
			"template"
		].indexOf(d.type) < 0 ? (l(), r("div", bS, [
			d.prefix ? (l(), r("span", {
				key: 0,
				class: "input-group-text",
				innerHTML: o.getValueOrFunction(d.prefix, {
					field: d,
					item: o.item
				})
			}, null, 8, xS)) : n("", !0),
			d.type == "text" ? v((l(), r("input", {
				key: 1,
				class: s(["form-control", o.getValueOrFunction(d.inputclass ? d.inputclass : "", {
					field: d,
					item: o.item
				})]),
				type: "text",
				name: d.name,
				id: o.formId + "_" + d.name,
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				minlength: d.minlength,
				maxlength: d.maxlength,
				placeholder: d.placeholder ? d.placeholder : "",
				disabled: d.disabled,
				readonly: d.readonly,
				required: d.required
			}, null, 10, SS)), [[g, o.item[d.name]]]) : n("", !0),
			d.type == "number" ? v((l(), r("input", {
				key: 2,
				class: s(["form-control", o.getValueOrFunction(d.inputclass ? d.inputclass : "", {
					field: d,
					item: o.item
				})]),
				type: "number",
				name: d.name,
				id: o.formId + "_" + d.name,
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				min: d.min,
				max: d.max,
				step: d.step,
				placeholder: d.placeholder ? d.placeholder : "",
				disabled: d.disabled,
				readonly: d.readonly,
				required: d.required
			}, null, 10, CS)), [[g, o.item[d.name]]]) : n("", !0),
			[
				"date",
				"datetime",
				"datetime-local"
			].indexOf(d.type) >= 0 ? v((l(), r("input", {
				key: 3,
				class: s(["form-control", o.getValueOrFunction(d.inputclass ? d.inputclass : "", {
					field: d,
					item: o.item
				})]),
				type: d.type,
				name: d.name,
				id: o.formId + "_" + d.name,
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				min: d.min,
				max: d.max,
				disabled: d.disabled,
				readonly: d.readonly,
				required: d.required
			}, null, 10, wS)), [[m, o.item[d.name]]]) : n("", !0),
			d.type == "checkbox" ? (l(), r("div", TS, [v(i("input", {
				class: s(["form-check-input", o.getValueOrFunction(d.inputclass ? d.inputclass : "", {
					field: d,
					item: o.item
				})]),
				type: "checkbox",
				name: d.name,
				id: o.formId + "_" + d.name,
				"true-value": d.true == null ? !0 : d.true,
				"false-value": d.false == null ? !1 : d.false,
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				disabled: d.disabled,
				readonly: d.readonly,
				required: d.required
			}, null, 10, ES), [[p, o.item[d.name]]]), i("label", {
				class: "form-check-label cursor-pointer",
				for: o.formId + "_" + d.name
			}, f(d.checkbox), 9, DS)])) : n("", !0),
			d.type == "email" ? v((l(), r("input", {
				key: 5,
				autocomplete: "on",
				class: s(["form-control", o.getValueOrFunction(d.inputclass ? d.inputclass : "", {
					field: d,
					item: o.item
				})]),
				type: "email",
				name: d.name,
				id: o.formId + "_" + d.name,
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				minlength: d.minlength,
				maxlength: d.maxlength,
				placeholder: d.placeholder ? d.placeholder : "",
				readonly: d.readonly,
				disabled: d.disabled,
				required: d.required
			}, null, 10, OS)), [[g, o.item[d.name]]]) : n("", !0),
			d.type == "select" && (!d.relation || d.relation && d.relation.items) ? (l(), t(x, {
				key: 6,
				modelValue: o.item[d.name],
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				field: d,
				item: o.item,
				settings: o.settings,
				formId: o.formId,
				auth: o.auth
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"field",
				"item",
				"settings",
				"formId",
				"auth"
			])) : n("", !0),
			d.type == "textarea" ? v((l(), r("textarea", {
				key: 7,
				class: s(["form-control", o.getValueOrFunction(d.inputclass ? d.inputclass : "", {
					field: d,
					item: o.item
				})]),
				name: d.name,
				id: o.formId + "_" + d.name,
				"onUpdate:modelValue": (e) => o.item[d.name] = e,
				rows: d.rows,
				minlength: d.minlength,
				maxlength: d.maxlength,
				placeholder: d.placeholder ? d.placeholder : "",
				disabled: d.disabled,
				readonly: d.readonly,
				required: d.required
			}, "              ", 10, kS)), [[g, o.item[d.name]]]) : n("", !0),
			d.suffix ? (l(), r("span", {
				key: 8,
				class: "input-group-text",
				innerHTML: o.getValueOrFunction(d.suffix, {
					field: d,
					item: o.item
				})
			}, null, 8, AS)) : n("", !0)
		])) : n("", !0),
		d.type == "html" ? (l(), t(S, {
			key: 2,
			modelValue: o.item[d.name],
			"onUpdate:modelValue": (e) => o.item[d.name] = e,
			class: s([d.class]),
			quillOptions: d.quill
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"class",
			"quillOptions"
		])) : n("", !0),
		d.type == "image" || d.type == "upload" ? (l(), t(C, {
			key: 3,
			modelValue: o.item[d.name],
			"onUpdate:modelValue": (e) => o.item[d.name] = e,
			class: s([d.class]),
			field: d,
			settings: o.settings
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"class",
			"field",
			"settings"
		])) : n("", !0),
		d.type == "list" && (!d.relation || d.relation && d.relation.items) ? (l(), t(w, {
			key: 4,
			modelValue: o.item[d.name],
			"onUpdate:modelValue": (e) => o.item[d.name] = e,
			field: d,
			item: o.item,
			settings: o.settings,
			formId: o.formId
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"field",
			"item",
			"settings",
			"formId"
		])) : n("", !0),
		d.type == "dropdown" && o.item[d.name] ? (l(), r("div", {
			key: 5,
			class: s([d.class])
		}, [i("div", jS, [i("button", {
			class: s(["btn dropdown-toggle", [d.dropdown ? d.dropdown.class : ""]]),
			type: "button",
			"data-bs-auto-close": "outside",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false"
		}, [i("span", null, f(o.translate(d.dropdown ? d.dropdown.label : "Select")), 1)], 2), i("ul", MS, [
			i("li", null, [(l(!0), r(e, null, u(d.options, (e) => (l(), r("span", {
				key: e,
				class: s(["dropdown-item cursor-pointer", { selected: o.item[d.name].indexOf(e.value) >= 0 }]),
				onClick: (t) => o.dropdownSelectToggleOne(d, o.item[d.name], e)
			}, [o.item[d.name].indexOf(e.value) >= 0 ? (l(), r("i", PS)) : (l(), r("i", FS)), a(" " + f(o.translate(e.label ? e.label : e.value)), 1)], 10, NS))), 128))]),
			c[0] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
			i("li", null, [i("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => o.dropdownSelectAll(o.item[d.name], d.options)
			}, f(o.translate("Select all")), 9, IS)]),
			i("li", null, [i("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => o.dropdownSelectClear(o.item[d.name])
			}, f(o.translate("Unselect all")), 9, LS)]),
			i("li", null, [i("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => o.dropdownSelectInvert(o.item[d.name], d.options)
			}, f(o.translate("Invert all")), 9, RS)])
		])]), o.item[d.name].length ? (l(), r("span", {
			key: 0,
			class: s([d.list && d.list.wrapperClass ? d.list.wrapperClass : "d-block mt-1"])
		}, [(l(!0), r(e, null, u(o.item[d.name], (e) => (l(), r("span", {
			class: s(["cursor-pointer", [d.list ? d.list.class : ""]]),
			key: e,
			onClick: (t) => o.dropdownSelectToggleOne(d, o.item[d.name], e)
		}, [a(f(o.translate(e)) + " ", 1), c[1] ||= i("i", { class: "bi bi-x" }, null, -1)], 10, zS))), 128))], 2)) : n("", !0)], 2)) : n("", !0),
		d.type == "addresses" ? (l(), r("span", BS, [o.item[d.name] ? (l(), r("div", VS, [(l(!0), r(e, null, u(o.item[d.name], (e) => (l(), r("div", { key: e }, [
			a(f(e) + " ", 1),
			i("label", {
				class: "form-label text-secondary mb-1",
				for: o.formId + "_" + d.name
			}, f(d.label), 9, HS),
			v(i("input", {
				class: "form-control",
				type: "text",
				name: d.name,
				id: o.formId + "_" + d.name,
				"onUpdate:modelValue": (t) => e.country = t
			}, null, 8, US), [[g, e.country]])
		]))), 128))])) : n("", !0), i("button", {
			type: "button",
			class: "btn btn-sm btn-secondary",
			onClick: (e) => o.insertAddress(d.name)
		}, " Add ", 8, WS)])) : n("", !0),
		d.type == "template" ? (l(), r("div", {
			key: 7,
			innerHTML: o.getValueOrFunction(d.template, {
				field: d,
				item: o.item
			})
		}, null, 8, GS)) : n("", !0),
		d.description ? (l(), r("div", KS, [i("small", null, [i("i", {
			class: "text-muted",
			innerHTML: o.getValueOrFunction(d.description, {
				field: d,
				item: o.item
			})
		}, null, 8, qS)])])) : n("", !0)
	])], 2))), 128))])) : n("", !0)], 2))), 128))]);
}
//#endregion
//#region src/components/VuAdminForm.vue
var YS = {
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
	created() {},
	mounted() {
		this.item = this.modelValue;
		let e = this.item[this.settings.pkey];
		this.fetchItem(e, this.settings, this.auth);
	},
	watch: { modelValue(e) {
		this.item = this.modelValue;
	} },
	methods: {
		translate(e, t, n) {
			return Pc(e, this.settings.translate, t, n || this.settings.language);
		},
		getValueOrFunction(e, t) {
			return yc(e, t, this.settings, this);
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
			let a = `${Date.now().toString(36)}-${Dc(8)}`;
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
				let r = await fetch(kc("GET", t.form.api, e), Oc("GET", t.api, null, n)).catch((e) => {}), i = await bc(r);
				if (xc(r, i.data, "form") || !i.data) return this.formNoWait(), !1;
				t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, r);
				let a;
				a = t.form.api.input.item ? typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, r) : i.data;
				for (let e of t.form.groups) for (let r of e.fields) r.type === "dropdown" && r.name !== "__proto__" && r.name !== "constructor" && r.name !== "prototype" && !a[r.name] && (a[r.name] = []), r.relation && t.relations[r.relation.config] && (r.relation = vc(t.relations[r.relation.config], r.relation), console.log(r.relation, n), await this.fetchRelation(r, [a], n));
				this.item = Mc(a), this.itemOriginal = Object.assign({}, a), this.loaded = !0, this.formNoWait();
			} catch (e) {
				console.error(e), this.formNoWait();
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
				n = this.settings.form.api.input.item ? typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t, response) : t, n && (this.addFormMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${n[this.settings.pkey]} )</small>`, 2500), this.item = Mc(n), this.itemOriginal = Object.assign({}, n)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
				let r = await fetch(kc("DELETE", this.settings.form.api, n, t), Oc("DELETE", this.settings.api, null, this.auth));
				if (r.status !== 200) throw Error(this.translate("Response status: " + r.status));
				this.item && (this.item = {}, this.modalWindow.hide());
				let i = await r.json();
				this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(i, r), this.reloadTable(), this.formNoWait();
			} catch (e) {
				console.error(e.message), this.formNoWait();
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
	components: { VuAdminFormGroup: /* @__PURE__ */ Cy(fS, [["render", JS]]) }
}, XS = ["id", "data-bs-theme"], ZS = { class: "modal-header" }, QS = {
	key: 0,
	class: "modal-title"
}, $S = ["innerHTML"], eC = { key: 1 }, tC = { key: 2 }, nC = {
	key: 3,
	class: "rounded border ms-2 px-2 py-0 fs-6"
}, rC = {
	key: 1,
	class: "d-inline-block ms-3 mt-1"
}, iC = ["innerHTML"], aC = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, oC = {
	key: 0,
	class: "modal-header bg-body sticky-top"
}, sC = {
	key: 0,
	class: "d-inline-block m-1"
}, cC = { class: "dropdown d-inline-block" }, lC = ["innerHTML"], uC = { class: "dropdown-menu text-start" }, dC = { class: "me-2 text-muted" }, fC = ["innerHTML"], pC = ["disabled", "onClick"], mC = {
	key: 1,
	class: "dropdown d-inline-block"
}, hC = { class: "mx-1" }, gC = { class: "dropdown-menu px-2" }, _C = ["onClick"], vC = {
	key: 1,
	class: "modal-body custom-scroll"
}, yC = {
	key: 2,
	class: "modal-footer d-flex justify-content-between"
}, bC = {
	key: 3,
	class: "bg-light text-dark"
};
function xC(o, c, p, m, h, g) {
	let y = d("VuAdminFormGroup");
	return o.item ? (l(), r("form", {
		key: 0,
		ref: "form",
		id: o.formId,
		class: s(["form", [o.settings.form.class, { wait: o.ui.wait.form }]]),
		onSubmit: c[1] ||= b((...e) => o.submitItem && o.submitItem(...e), ["prevent"]),
		"data-bs-theme": [o.settings.theme]
	}, [
		i("div", { class: s(["vua-overlay", { blocked: o.ui.block.form }]) }, null, 2),
		i("div", ZS, [
			o.loaded ? (l(), r("h5", QS, [
				o.settings.form.title && typeof o.settings.form.title == "function" ? (l(), r("span", {
					key: 0,
					innerHTML: o.settings.form.title(o.item, o.settings)
				}, null, 8, $S)) : n("", !0),
				o.settings.form.title && typeof o.settings.form.title == "string" ? (l(), r("span", eC, f(o.translate(o.settings.form.title)), 1)) : n("", !0),
				o.settings.form.title ? n("", !0) : (l(), r("span", tC, f(o.translate("Edit")), 1)),
				o.item[o.settings.pkey] ? (l(), r("small", nC, [c[2] ||= i("span", { class: "text-muted fw-light" }, "id", -1), a(" " + f(o.item[o.settings.pkey]), 1)])) : n("", !0)
			])) : n("", !0),
			o.message.form ? (l(), r("span", rC, [i("span", { class: s(["text-" + o.message.form.priority]) }, [c[3] ||= i("i", { class: "bi bi-envelope-fill me-2" }, null, -1), i("span", { innerHTML: o.message.form.msg }, null, 8, iC)], 2)])) : n("", !0),
			v(i("span", aC, [...c[4] ||= [i("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[_, o.ui.wait.form]]),
			c[5] ||= i("button", {
				type: "button",
				class: "btn-close",
				"data-bs-dismiss": "modal",
				"aria-label": "Close"
			}, null, -1)
		]),
		o.item ? (l(), r("div", oC, [o.settings.form.control ? (l(), r("div", {
			key: 0,
			class: s(["w-100", o.settings.form.control.class == null ? "d-flex justify-content-center" : o.settings.form.control.class])
		}, [o.messages.form.length ? (l(), r("span", sC, [i("div", cC, [i("button", {
			class: s(["btn btn-sm dropdown-toggle", ["btn-" + o.messages.form[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: o.messages.form.length + " " + (o.messages.form.length > 1 ? o.translate("messages") : o.translate("message"))
		}, null, 10, lC), i("ul", uC, [(l(!0), r(e, null, u(o.messages.form, (e) => (l(), r("li", { key: e }, [i("span", { class: s(["dropdown-item disabled", ["text-" + e.priority]]) }, [i("small", dC, f(e.datetime), 1), i("span", { innerHTML: e.msg }, null, 8, fC)], 2)]))), 128))])])])) : n("", !0), (l(!0), r(e, null, u(o.settings.form.control.buttons, (t) => (l(), r("span", { key: t.action }, [t.dropdowns ? n("", !0) : (l(), r("button", {
			key: 0,
			type: "button",
			disabled: t.disabled === void 0 ? !1 : o.getValueOrFunction(t.disabled, {
				button: t,
				item: o.item,
				form: this
			}),
			class: s([t.class ? t.class : o.getButtonClassByAction(t.action)]),
			onClick: (e) => o.formAction(t, {
				button: t,
				item: o.item,
				form: this,
				$event: e
			})
		}, [i("i", { class: s([t.icon === void 0 ? o.getButtonIconClassByAction(t.action) : o.getValueOrFunction(t.icon, {
			button: t,
			item: o.item,
			form: this
		})]) }, null, 2), a(" " + f(o.translate(t.title)), 1)], 10, pC)), t.dropdowns ? (l(), r("div", mC, [i("button", {
			type: "button",
			class: s([[t.class], "dropdown-toggle"]),
			"data-bs-toggle": "dropdown",
			"data-bs-auto-close": "outside",
			"aria-expanded": "false"
		}, [i("span", hC, [i("i", { class: s([t.icon === void 0 ? o.getButtonIconClassByAction(t.action) : o.getValueOrFunction(t.icon, {
			button: t,
			table: this
		})]) }, null, 2), a(" " + f(o.translate(t.title)), 1)])], 2), i("ul", gC, [(l(!0), r(e, null, u(t.dropdowns, (e) => (l(), r("li", { key: e }, [i("span", {
			class: s([e.class ? e.class : ""]),
			onClick: (n) => o.formAction(e, {
				button: t,
				item: o.item,
				form: this,
				$event: n
			})
		}, [e.icon ? (l(), r("i", {
			key: 0,
			class: s([e.icon])
		}, null, 2)) : n("", !0), a(" " + f(o.translate(e.title)), 1)], 10, _C)]))), 128))])])) : n("", !0)]))), 128))], 2)) : n("", !0)])) : n("", !0),
		o.settings.form ? (l(), r("div", vC, [o.settings.form.visible && o.settings.form.groups ? (l(), t(y, {
			key: 0,
			modelValue: o.item,
			"onUpdate:modelValue": c[0] ||= (e) => o.item = e,
			formid: o.formId,
			settings: o.settings
		}, null, 8, [
			"modelValue",
			"formid",
			"settings"
		])) : n("", !0)])) : n("", !0),
		o.item ? (l(), r("div", yC)) : n("", !0),
		o.settings.debug > 1 ? (l(), r("pre", bC, "        " + f(o.item) + "\n    ", 1)) : n("", !0)
	], 42, XS)) : n("", !0);
}
var SC = /* @__PURE__ */ Cy(YS, [["render", xC]]), CC = {
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
			return Pc(e, this.settings.translate, t, n || this.settings.language);
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
}, wC = {
	key: 0,
	"aria-label": "Page navigation",
	class: "mt-2 d-flex align-items-center justify-content-between"
}, TC = { class: "dropdown d-inline-block m-1" }, EC = { class: "mx-1" }, DC = { key: 0 }, OC = {
	key: 0,
	class: "dropdown-menu text-end"
}, kC = ["onClick"], AC = { class: "ms-2" }, jC = {
	key: 0,
	class: "bi bi-check-circle-fill ms-2"
}, MC = {
	key: 1,
	class: "bi bi-circle ms-2"
}, NC = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, PC = { class: "pagination pagination-sm m-1" }, FC = { class: "page-item" }, IC = ["innerHTML"], LC = { class: "page-item" }, RC = ["innerHTML"], zC = ["onClick"], BC = { class: "page-item" }, VC = ["innerHTML"], HC = {
	key: 0,
	class: "page-item"
}, UC = ["innerHTML"];
function WC(t, a, o, c, d, p) {
	return o.config.pagination.hidden ? n("", !0) : (l(), r("nav", wC, [i("div", null, [i("div", TC, [i("button", {
		type: "button",
		class: s(["btn btn-sm btn-secondary", { "dropdown-toggle": o.config.pagination.limits }]),
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [v(i("span", EC, [i("strong", null, f(o.config.pagination.from) + "-" + f(o.config.pagination.to), 1), o.config.pagination.total ? (l(), r("span", DC, " / " + f(o.config.pagination.total), 1)) : n("", !0)], 512), [[_, o.config.pagination.from > 0]])], 2), o.config.pagination.limits ? (l(), r("ul", OC, [i("li", null, [(l(!0), r(e, null, u(o.config.pagination.limits, (e) => (l(), r("span", {
		class: s(["dropdown-item cursor-pointer", { selected: o.config.pagination.limit == e }]),
		key: e,
		onClick: (t) => p.setPageLimit(e)
	}, [
		i("strong", null, f(e), 1),
		i("small", AC, f(p.translate("row")) + "/" + f(p.translate("page")), 1),
		o.config.pagination.limit == e ? (l(), r("i", jC)) : n("", !0),
		o.config.pagination.limit == e ? n("", !0) : (l(), r("i", MC))
	], 10, kC))), 128))])])) : n("", !0)]), v(i("div", NC, [...a[4] ||= [i("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[_, o.ui && o.ui.wait.table]])]), i("ul", PC, [
		i("li", FC, [i("a", {
			class: s(["page-link cursor-pointer", { disabled: p.firstDisabled() }]),
			onClick: a[0] ||= (e) => p.setPage(1),
			"aria-label": "{{  translate('First')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: p.translate("First")
		}, null, 8, IC)], 2)]),
		i("li", LC, [i("a", {
			class: s(["page-link cursor-pointer", { disabled: p.prevDisabled() }]),
			onClick: a[1] ||= (e) => p.setPage(o.config.pagination.page - 1),
			"aria-label": "{{ translate('Prev')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: p.translate("Prev")
		}, null, 8, RC)], 2)]),
		(l(!0), r(e, null, u(o.config.pagination.numbers, (e) => (l(), r("li", {
			key: e,
			class: "page-item"
		}, [i("a", {
			class: s(["page-link cursor-pointer", {
				disabled: e > o.config.pagination.pages,
				current: e == o.config.pagination.page
			}]),
			onClick: (t) => p.setPage(e)
		}, f(e), 11, zC)]))), 128)),
		i("li", BC, [i("a", {
			class: s(["page-link cursor-pointer", { disabled: p.nextDisabled() }]),
			onClick: a[2] ||= (e) => p.setPage(o.config.pagination.page + 1),
			"aria-label": "{{  translate('Next')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: p.translate("Next")
		}, null, 8, VC)], 2)]),
		o.config.pagination.total ? (l(), r("li", HC, [i("a", {
			class: s(["page-link cursor-pointer", { disabled: p.lastDisabled() }]),
			onClick: a[3] ||= (e) => p.setPage(o.config.pagination.total),
			"aria-label": "{{  translate('Last')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: p.translate("Last")
		}, null, 8, UC)], 2)])) : n("", !0)
	])]));
}
var GC = /* @__PURE__ */ Cy(CC, [["render", WC]]), KC = _c(), qC = {
	name: "VuAdminTable",
	props: {
		settings: Object,
		auth: Object
	},
	components: {
		VuAdminForm: SC,
		VuAdminTablePagination: GC
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
			messageTimeOut: null
		};
	},
	watch: { auth: {
		immediate: !0,
		handler(e, t) {
			e != t && this.init();
		}
	} },
	created() {
		let e = Ec(1e5);
		this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e;
	},
	mounted() {
		this.modalElement = document.getElementById(this.modalId), this.modalWindow = new Xa(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
			this.settings.form.visible = !1;
		}), this.modalElement.addEventListener("show.bs.modal", (e) => {
			this.settings.form.visible = !0;
		});
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
			KC.emit(e + "-" + t, {
				from: this.settings.entity,
				payload: n
			});
		},
		listenEvent() {
			if (KC.on(`EDIT-${this.settings.entity}`, (e) => {
				this.editItem(e.payload.item);
			}), this.settings.table && this.settings.table.filterListen) {
				let e = this.settings.table.filterListen, t = `FILTER-${this.settings.entity}`;
				this._filterListenerRegistered ||= (KC.on(t, (t) => {
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
			t = t === void 0 ? !0 : t, e < 1 && (e = 1), this.config.pagination.pages !== null && this.config.pagination.pages !== void 0 && e > this.config.pagination.pages && (e = this.config.pagination.pages), this.config.pagination.skip = (e - 1) * this.config.pagination.limit, this.config.pagination.page != e && t && (this.config.pagination.page = e, this.reloadTable());
		},
		setPageLimit(e) {
			e != this.config.pagination.limit && (this.config.pagination.limit = e, this.setPage(1), this.calcPage(), this.reloadTable());
		},
		getValueOrFunction(e, t) {
			return yc(e, t, this.settings, this);
		},
		getButtonClassByAction(e) {
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
				case "TABLE_COLUMNS": return "btn btn-sm btn-outline-dark text-nowrap mx-1";
				case "TABLE_EXPORT": return "btn btn-sm btn-primary text-nowrap mx-1";
				default: return "btn btn-sm btn-outline-primary text-nowrap mx-1";
			}
		},
		getButtonIconClassByAction(e) {
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
				case "TABLE_COLUMNS": return "bi bi-table";
				case "TABLE_EXPORT": return "bi bi-download";
				default: return "bi bi-question";
			}
		},
		tableCellValue(e, t, n, r) {
			try {
				return e === void 0 || t === void 0 ? void 0 : r.value ? r.value(e, t, n, r) : t[e] !== void 0 || !e.includes(".") ? t[e] : e.split(".").reduce((e, t) => e && e[t], t);
			} catch (e) {
				return e.message;
			}
		},
		tableCellTemplate(e, t, n, r) {
			try {
				return typeof e == "string" ? e : e(t[r.name], t, n, r);
			} catch (e) {
				return e.message;
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
			for (let t of this.settings.table.columns) if (t.relation && this.settings.relations[t.relation.config]) {
				let n = [];
				t.relation = vc(this.settings.relations[t.relation.config], t.relation);
				for (let r of e) r[t.relation.local] && n.push(r[t.relation.local]);
				t.relation.ids = Lc(n), await this.fetchRelation(t, e, this.auth);
			}
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
			e.events && e.events.beforeItemsLoad && e.events.beforeItemsLoad(t, e);
			let i = await fetch(kc("GET", e.table.api, null, t), Oc("GET", e.table.api, null, r)), a = await bc(i), o = xc(i, a.data);
			if (o) {
				this.handleTableErrors(o);
				return;
			}
			if (a.error) {
				this.handleTableErrors(a.error);
				return;
			}
			e.events && e.events.afterItemsLoad && e.events.afterItemsLoad(a.data, i);
			let s;
			s = e.table.api.input.items ? typeof e.table.api.input.items == "string" ? a.data[e.table.api.input.items] : e.table.api.input.items(a.data, i) : a.data, n && (e.table.api.input.total ? n.pagination.total = typeof e.table.api.input.total == "string" ? a.data[e.table.api.input.total] : e.table.api.input.total(a.data, i) : a.data.total && (n.pagination.total = a.data.total), n.pagination.items = s.length, this.calcPage());
			let c = jc(s);
			return this.convertIn(e.table.columns, c), c;
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
				r.filter = JSON.stringify(i), Wc(r, { column: e });
				let a = await fetch(kc("GET", e.relation.api, null, r), Oc("GET", e.relation.api, null, n));
				if (a.status !== 200) throw Error(this.translate("Response status: " + a.status));
				let o = await bc(a);
				if (xc(a, o.data) || !o.data) return;
				if (e.relation.api.input.items ? e.relation.items = typeof e.relation.api.input.items == "string" ? o.data[e.relation.api.input.items] : e.relation.api.input.items(o.data, a) : e.relation.items = o.data, t && t[0]) for (let n of t) n[e.relation.local] && (n[e.relation.entity] = e.relation.items.find((t, r, i) => t[e.relation.foreign] === n[e.relation.local]));
			} catch (e) {
				console.error(e);
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
				let r = await fetch(kc("DELETE", this.settings.form.api, n, t), Oc("DELETE", this.settings.api, null, this.auth));
				if (r.status !== 200) throw Error(this.translate("Response status: " + r.status));
				let i = this.items.find((e) => e[this.settings.pkey] === n);
				i >= 0 && this.items.splice(i, 1), this.item &&= {};
				let a = await r.json();
				this.settings.events && this.settings.events.afterItemDelete && this.settings.events.afterItemDelete(a, r), this.reloadTable();
			} catch (e) {
				console.error(e), this.tableNoWait();
			}
		},
		async deleteItems(e, t) {
			try {
				if (!e || !confirm(this.translate("Are you sure you want to delete all selected items?"))) return;
				this.tableWait(!0);
				let n = await fetch(kc("DELETE", this.settings.table.api), Oc("DELETE", this.settings.api, { body: JSON.stringify({ ids: e }) }, this.auth));
				if (n.status !== 200) throw Error(this.translate("Response status: " + n.status));
				t && t(n), this.reloadTable(), this.tableNoWait();
			} catch (e) {
				console.error(e), this.tableNoWait();
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
			if (console.log(e), e != null) {
				if (typeof e == "string") {
					this.addTableMessage(e, 3500, "danger");
					return;
				}
				if (e.length > 0) for (let t of e) this.addTableMessage(t.message, t.timeout, t.priority);
			}
		},
		handleFormErrors() {
			if (errors != null) {
				if (typeof errors == "string") {
					this.addTableMessage(errors, 3500, "danger");
					return;
				}
				if (errors.length > 0) for (let e of errors) this.addTableMessage(e.message, e.timeout, e.priority);
			}
		},
		getColumnByName(e) {
			return this.settings.table.columns.find((t) => t.name === e);
		},
		createItem() {
			this.item = this.settings.form.default ? this.settings.form.default : {}, this.modalWindow.show(), setTimeout(() => {
				this.itemOriginal = Object.assign({}, this.item);
			}, 100);
		},
		async saveItem(e, t, n, r) {
			try {
				r ||= {};
				let i = {}, a = e[this.settings.pkey];
				if (this.settings.form.api.output && this.settings.form.api.output.fields) for (let t in e) this.settings.form.api.output.fields.includes(t) && (i[t] = e[t]);
				else Object.assign(i, e);
				let o, s;
				if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !a) && (i = Nc(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, r, e), !this.settings.form.api.output.item) o = JSON.stringify(i);
				else if (typeof this.settings.form.api.output.item == "string") {
					let e = {};
					e[this.settings.form.api.output.item] = i, o = JSON.stringify(e);
				} else o = JSON.stringify(this.settings.form.api.output.item(i, options));
				let c = a ? "PUT" : "POST";
				s = await fetch(kc(c, this.settings.form.api, a, r), Oc(c, this.settings.form.api, { body: o }, this.auth));
				let l = await bc(s), u = xc(s, l.data);
				if (u) {
					n && n(u, e, r, s);
					return;
				}
				if (l.error) {
					n && n(l.error, e, r, s);
					return;
				}
				this.settings.events && this.settings.events.afterItemSave && this.settings.events.afterItemSave(l.data, r, this.auth), t && t(l.data, s);
			} catch (t) {
				n && n(t, e, r);
			}
		},
		async saveBulk(e) {
			try {
				this.tableWait(!0);
				let t = {};
				this.settings.events && this.settings.events.beforeBulkSave && this.settings.events.beforeBulkSave(this.bulkitem);
				for (let e in this.bulkitem) this.bulkinputs.indexOf(e) >= 0 && this.settings.table.api.output.fields.includes(e) && (t[e] = this.bulkitem[e]);
				this.convertOut(this.settings.table.columns, [t]);
				let n = await fetch(kc("PUT", this.settings.table.api), Oc("PUT", this.settings.table.api, { body: JSON.stringify({
					item: t,
					ids: this.selected
				}) }, this.auth)).catch((e) => {
					console.error(e), this.addTableMessage(e.message, 3500, "danger", e);
				}), r = await bc(n), i = xc(n, r.data);
				if (this.tableNoWait(), i) return;
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
			e.multiple ? Rc(e.value, n) : e.value = e.value === n ? null : n, this.reloadTable();
		},
		dropdownSelectAll(e, t) {
			zc(e, t), this.reloadTable();
		},
		dropdownSelectInvert(e, t) {
			Bc(e, t), this.reloadTable();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? Vc(e) : e.value = null, this.reloadTable();
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
				this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(r), Ic(Fc(r, this.settings.table.exports[e.type].fields), this.settings.entity + ".csv");
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
			let a = `${Date.now().toString(36)}-${Dc(8)}`;
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
			return Pc(e, this.settings.translate, t, n || this.settings.language);
		},
		convertIn(e, t) {
			for (let n of e) if (n.convert && n.convert.in) for (let e of t) e[n.name] = n.convert.in(e[n.name], e, n);
		},
		convertOut(e, t) {
			for (let n of e) if (n.convert && n.convert.out) for (let e of t) e[n.name] = n.convert.out(e[n.name], e, n);
		}
	}
}, JC = ["data-bs-theme"], YC = { class: "vua-table-title" }, XC = { class: "d-flex align-items-center justify-content-between" }, ZC = { class: "d-inline-block" }, QC = {
	key: 0,
	class: "card-title d-inline-block mb-2"
}, $C = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, ew = {
	key: 0,
	class: "d-inline-block"
}, tw = {
	key: 0,
	class: "d-inline-block px-1 mx-1"
}, nw = ["innerHTML"], rw = { class: "dropdown d-inline-block" }, iw = ["innerHTML"], aw = { class: "dropdown-menu text-start" }, ow = { class: "me-2 text-muted" }, sw = ["innerHTML"], cw = ["onClick"], lw = {
	key: 1,
	class: "dropdown d-inline-block"
}, uw = { class: "mx-1" }, dw = { key: 0 }, fw = { class: "dropdown-menu" }, pw = ["onClick"], mw = {
	key: 0,
	class: "bi bi-check-square-fill me-2"
}, hw = {
	key: 1,
	class: "bi bi-x-square me-2 text-danger"
}, gw = { class: "badge text-secondary fw-normal" }, _w = {
	key: 2,
	class: "dropdown d-inline-block"
}, vw = { class: "mx-1" }, yw = { class: "dropdown-menu" }, bw = ["onClick"], xw = { class: "vua-table-header" }, Sw = ["width"], Cw = ["onClick"], ww = ["innerHTML"], Tw = {
	key: 0,
	class: "bi bi-arrow-down"
}, Ew = {
	key: 1,
	class: "bi bi-arrow-up"
}, Dw = { key: 0 }, Ow = ["disabled", "onClick"], kw = {
	key: 0,
	class: "vua-table-filter"
}, Aw = ["width"], jw = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, Mw = { class: "bi bi-check-all" }, Nw = { class: "bi bi-x-lg" }, Pw = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, Fw = ["onUpdate:modelValue"], Iw = ["disabled", "onClick"], Lw = {
	key: 2,
	class: "input-group input-group-sm my-1"
}, Rw = ["onUpdate:modelValue", "disabled"], zw = { value: "=" }, Bw = { value: ">" }, Vw = { value: ">=" }, Hw = { value: "<" }, Uw = { value: "<=" }, Ww = ["onUpdate:modelValue", "disabled"], Gw = ["value"], Kw = [
	"onUpdate:modelValue",
	"disabled",
	"min",
	"max"
], qw = ["disabled", "onClick"], Jw = { key: 3 }, Yw = {
	key: 0,
	class: "dropdown"
}, Xw = {
	class: "btn btn-sm btn-secondary dropdown-toggle my-1",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, Zw = { class: "dropdown-menu" }, Qw = ["onClick"], $w = {
	key: 0,
	class: "bi bi-check-square"
}, eT = {
	key: 1,
	class: "bi bi-square"
}, tT = { key: 0 }, nT = { key: 1 }, rT = ["onClick"], iT = { key: 2 }, aT = ["onClick"], oT = { key: 3 }, sT = ["onClick"], cT = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, lT = ["onUpdate:modelValue", "multiple"], uT = ["value"], dT = ["disabled", "onClick"], fT = {
	key: 4,
	class: "input-group input-group-sm my-1"
}, pT = ["onUpdate:modelValue"], mT = { value: "=" }, hT = { value: ">" }, gT = { value: ">=" }, _T = { value: "<" }, vT = { value: "<=" }, yT = ["onUpdate:modelValue"], bT = ["value"], xT = ["type", "onUpdate:modelValue"], ST = ["disabled", "onClick"], CT = ["disabled", "onClick"], wT = { class: "align-middle" }, TT = [
	"data-label",
	"width",
	"onClick"
], ET = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, DT = ["innerHTML"], OT = { key: 1 }, kT = ["innerHTML"], AT = ["aria-valuenow", "aria-valuemax"], jT = { key: 0 }, MT = {
	key: 4,
	class: "input-group input-group-sm"
}, NT = ["innerHTML"], PT = {
	key: 1,
	class: "input-group-text"
}, FT = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], IT = [
	"type",
	"onChange",
	"onUpdate:modelValue"
], LT = ["onChange", "onUpdate:modelValue"], RT = ["value"], zT = ["innerHTML"], BT = {
	key: 5,
	class: "input-group-text"
}, VT = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], HT = { key: 5 }, UT = ["disabled", "onClick"], WT = ["innerHTML"], GT = { key: 2 }, KT = { key: 0 }, qT = ["colspan"], JT = { class: "row g-3 align-items-center" }, YT = { class: "col-form-label" }, XT = [
	"type",
	"onUpdate:modelValue",
	"onChange"
], ZT = ["onUpdate:modelValue", "onChange"], QT = ["onUpdate:modelValue", "onChange"], $T = ["value"], eE = ["innerHTML"], tE = {
	key: 0,
	class: "bg-light text-dark"
}, nE = {
	key: 0,
	class: "vua-table-bulk border-info"
}, rE = ["data-label", "width"], iE = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, aE = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, oE = [
	"type",
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], sE = [
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], cE = ["value"], lE = ["onClick"], uE = {
	key: 0,
	class: "bi bi-square text-secondary"
}, dE = {
	key: 1,
	class: "bi bi-check-square"
}, fE = { key: 2 }, pE = ["disabled", "onClick"], mE = ["innerHTML"], hE = { key: 2 }, gE = ["id"], _E = { class: "modal-dialog modal-xl" }, vE = { class: "modal-content h-100" };
function yE(b, x, S, C, w, T) {
	let E = d("VuAdminTablePagination"), D = d("VuAdminForm");
	return l(), r("div", null, [T.authAndSettings() ? (l(), r("div", {
		key: 0,
		class: s(["vua-table-container", [S.settings.class]]),
		"data-bs-theme": [S.settings.theme]
	}, [
		i("div", { class: s(["vua-overlay", { blocked: w.ui.block.table }]) }, null, 2),
		i("div", YC, [i("div", XC, [i("div", ZC, [S.settings.table.title ? (l(), r("h5", QC, f(S.settings.table.title), 1)) : n("", !0), v(i("div", $C, [...x[15] ||= [i("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[_, w.ui.wait.table && S.settings.table.title]])]), w.messages.table.length ? (l(), r("div", ew, [w.message.table ? (l(), r("small", tw, [i("span", { class: s(["text-" + w.message.table.priority]) }, [i("span", {
			class: "fw-bold",
			innerHTML: w.message.table.msg
		}, null, 8, nw)], 2)])) : n("", !0), i("div", rw, [i("button", {
			class: s(["btn btn-sm dropdown-toggle", ["btn-" + w.messages.table[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: w.messages.table.length + " " + (w.messages.table.length > 1 ? T.translate("messages") : T.translate("message"))
		}, null, 10, iw), i("ul", aw, [(l(!0), r(e, null, u(w.messages.table, (e) => (l(), r("li", { key: e }, [i("span", { class: s(["dropdown-item", ["text-" + e.priority]]) }, [i("small", ow, f(e.datetime), 1), i("span", {
			class: "fw-bold",
			innerHTML: e.msg
		}, null, 8, sw)], 2)]))), 128))])])])) : n("", !0)])]),
		S.settings.table.control ? (l(), r("div", {
			key: 0,
			class: s(["vua-table-control", [S.settings.table.control.class]])
		}, [(l(!0), r(e, null, u(S.settings.table.control.buttons, (t) => (l(), r("span", { key: t.action }, [
			t.action !== "TABLE_COLUMNS" && !t.dropdowns ? (l(), r("button", {
				key: 0,
				type: "button",
				class: s([t.class ? t.class : T.getButtonClassByAction(t.action)]),
				onClick: (e) => T.tableAction(t, {
					items: w.items,
					$event: e
				})
			}, [i("i", { class: s([t.icon === void 0 ? T.getButtonIconClassByAction(t.action) : T.getValueOrFunction(t.icon, {
				button: t,
				table: this
			})]) }, null, 2), a(" " + f(T.translate(t.title)), 1)], 10, cw)) : n("", !0),
			t.action === "TABLE_COLUMNS" ? (l(), r("div", lw, [i("button", {
				type: "button",
				class: s([[t.class ? t.class : T.getButtonClassByAction(t.action)], "dropdown-toggle"]),
				"data-bs-toggle": "dropdown",
				"data-bs-auto-close": "outside",
				"aria-expanded": "false"
			}, [v(i("span", uw, [
				i("i", { class: s([t.icon === void 0 ? T.getButtonIconClassByAction(t.action) : T.getValueOrFunction(t.icon, {
					button: t,
					table: this
				})]) }, null, 2),
				a(" " + f(T.translate(t.title)) + " ", 1),
				T.countHiddenColumns() ? (l(), r("span", dw, " ( " + f(T.countHiddenColumns()) + " " + f(T.translate("hidden")) + " ) ", 1)) : n("", !0)
			], 512), [[_, S.settings.table.columns.length > 0]])], 2), i("ul", fw, [
				(l(!0), r(e, null, u(S.settings.table.columns, (e) => (l(), r("li", { key: e }, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (t) => T.toggleColumn(e)
				}, [
					e.hidden ? n("", !0) : (l(), r("i", mw)),
					e.hidden ? (l(), r("i", hw)) : n("", !0),
					a(" " + f(e.title) + " ", 1),
					i("small", gw, f(e.name), 1)
				], 8, pw)]))), 128)),
				x[16] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: x[0] ||= (e) => T.toggleColumn(!0)
				}, f(T.translate("Visible all")), 1)]),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: x[1] ||= (e) => T.toggleColumn(!1)
				}, f(T.translate("Hidden all")), 1)])
			])])) : n("", !0),
			t.dropdowns ? (l(), r("div", _w, [i("button", {
				type: "button",
				class: s([[t.class], "dropdown-toggle"]),
				"data-bs-toggle": "dropdown",
				"data-bs-auto-close": "outside",
				"aria-expanded": "false"
			}, [i("span", vw, [i("i", { class: s([t.icon === void 0 ? T.getButtonIconClassByAction(t.action) : T.getValueOrFunction(t.icon, {
				button: t,
				table: this
			})]) }, null, 2), a(" " + f(T.translate(t.title)), 1)])], 2), i("ul", yw, [(l(!0), r(e, null, u(t.dropdowns, (e) => (l(), r("li", { key: e }, [i("span", {
				class: s(["dropdown-item cursor-pointer", [e.class]]),
				onClick: (t) => T.tableAction(e, {
					items: w.items,
					$event: t
				})
			}, [e.icon ? (l(), r("i", {
				key: 0,
				class: s([e.icon])
			}, null, 2)) : n("", !0), a(" " + f(T.translate(e.title)), 1)], 10, bw)]))), 128))])])) : n("", !0)
		]))), 128))], 2)) : n("", !0),
		S.settings.table ? (l(), r("table", {
			key: 1,
			class: s(["table vua-table mb-0", [S.settings.table.class]])
		}, [
			i("thead", null, [i("tr", xw, [(l(!0), r(e, null, u(S.settings.table.columns, (t) => (l(), r("th", {
				class: s(["", [t.header ? t.header.class : ""]]),
				style: c([t.hidden ? "display: none" : ""]),
				key: t,
				width: t.width
			}, [i("span", {
				class: s(["d-inline-block no-select text-nowrap", { "cursor-pointer": T.isSortable(t) }]),
				onClick: (e) => T.sortTable(t)
			}, [i("span", { innerHTML: t.header && t.header.title !== void 0 ? T.translate(t.header.title) : t.title ? T.translate(t.title) : T.translate(t.name) }, null, 8, ww), w.config.order[t.name] ? (l(), r("span", {
				key: 0,
				class: s(["badge text-bg-light ms-1 p-badge", { "opacity-50": w.config.order[t.name].fixed }])
			}, [
				w.config.order[t.name].dir === "ASC" ? (l(), r("i", Tw)) : n("", !0),
				w.config.order[t.name].dir === "DESC" ? (l(), r("i", Ew)) : n("", !0),
				a(" " + f(w.config.order[t.name].idx + 1), 1)
			], 2)) : n("", !0)], 10, Cw), t.header && t.header.buttons ? (l(), r("span", Dw, [(l(!0), r(e, null, u(t.header.buttons, (e) => (l(), r("button", {
				key: e.action,
				type: "button",
				disabled: e.disabled === void 0 ? null : T.getValueOrFunction(e.disabled),
				class: s([e.class ? e.class : T.getButtonClassByAction(e.action)]),
				onClick: (t) => T.tableAction(e, {
					items: w.items,
					$event: t
				})
			}, [i("i", { class: s([e.icon === void 0 ? T.getButtonIconClassByAction(e.action) : T.getValueOrFunction(e.icon, {
				button: e,
				column: t,
				table: this
			})]) }, null, 2), a(" " + f(T.translate(e.title)), 1)], 10, Ow))), 128))])) : n("", !0)], 14, Sw))), 128))]), T.countFilters() ? (l(), r("tr", kw, [(l(!0), r(e, null, u(S.settings.table.columns, (t) => (l(), r("th", {
				style: c([t.hidden ? "display: none" : ""]),
				key: t,
				width: t.width,
				class: s([t.filter ? t.filter.class : ""])
			}, [
				t.index && t.click ? (l(), r("div", jw, [i("span", {
					class: s(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: T.haveSelectedRowInPage() }]),
					onClick: x[2] ||= (e) => T.toggleSelectedRowInPage()
				}, [v(i("i", Mw, null, 512), [[_, !T.haveSelectedRowInPage()]]), v(i("i", Nw, null, 512), [[_, T.haveSelectedRowInPage()]])], 2)])) : n("", !0),
				t.filter && t.filter.type == "text" ? (l(), r("div", Pw, [v(i("input", {
					type: "text",
					class: s([{ fixed: t.filter.fixed }, "form-control form-control-sm"]),
					"onUpdate:modelValue": (e) => t.filter.value = e,
					onKeyup: x[3] ||= y((e) => T.reloadTable(), ["enter"])
				}, null, 42, Fw), [[g, t.filter.value]]), t.filter.buttonx && t.filter.buttonx != 0 ? (l(), r("button", {
					key: 0,
					class: s(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
					disabled: t.filter.value == null,
					onClick: (e) => {
						t.filter.value = void 0, T.reloadTable();
					}
				}, [...x[17] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, Iw)) : n("", !0)])) : n("", !0),
				t.filter && t.filter.type == "number" ? (l(), r("div", Lw, [
					t.filter.operators == 1 ? v((l(), r("select", {
						key: 0,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						disabled: t.filter.fixed,
						onChange: x[4] ||= (e) => T.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [
						i("option", zw, f(T.translate("=")), 1),
						i("option", Bw, f(T.translate(">")), 1),
						i("option", Vw, f(T.translate(">=")), 1),
						i("option", Hw, f(T.translate("<")), 1),
						i("option", Uw, f(T.translate("<=")), 1)
					], 40, Rw)), [[h, t.filter.operator]]) : n("", !0),
					t.filter.operators && t.filter.operators.length > 0 ? v((l(), r("select", {
						key: 1,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						disabled: t.filter.fixed,
						onChange: x[5] ||= (e) => T.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [(l(!0), r(e, null, u(t.filter.operators, (e) => (l(), r("option", {
						key: e,
						value: e.value
					}, f(e.label), 9, Gw))), 128))], 40, Ww)), [[h, t.filter.operator]]) : n("", !0),
					v(i("input", {
						type: "number",
						class: s(["form-control", { fixed: t.filter.fixed }]),
						"onUpdate:modelValue": (e) => t.filter.value = e,
						disabled: t.filter.fixed,
						min: t.filter.min,
						max: t.filter.max,
						onChange: x[6] ||= (e) => T.reloadTable(),
						onKeyup: x[7] ||= y((e) => T.reloadTable(), ["enter"])
					}, null, 42, Kw), [[g, t.filter.value]]),
					!t.filter.fixed && t.filter.buttonx && t.filter.buttonx != 0 ? (l(), r("button", {
						key: 2,
						class: s(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
						disabled: t.filter.value == null,
						onClick: (e) => {
							t.filter.value = void 0, T.reloadTable();
						}
					}, [...x[18] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, qw)) : n("", !0)
				])) : n("", !0),
				t.filter && t.filter.type == "select" ? (l(), r("div", Jw, [t.filter.dropdown ? (l(), r("div", Yw, [i("button", Xw, f(t.filter.multiple ? t.filter.value.length + " selected" : t.filter.value ? t.filter.value : "not selected"), 1), i("ul", Zw, [
					i("li", null, [(l(!0), r(e, null, u(t.filter.options, (e) => (l(), r("span", {
						key: e,
						class: s(["dropdown-item cursor-pointer", { selected: t.filter.multiple ? t.filter.value.indexOf(e.value) >= 0 : t.filter.value === e.value }]),
						onClick: (n) => T.dropdownSelectToggleOne(t.filter, e)
					}, [(t.filter.multiple ? t.filter.value.indexOf(e.value) >= 0 : t.filter.value === e.value) ? (l(), r("i", $w)) : (l(), r("i", eT)), a(" " + f(T.translate(e.label ? e.label : e.value)), 1)], 10, Qw))), 128))]),
					t.filter.multiple ? (l(), r("li", tT, [...x[19] ||= [i("hr", { class: "dropdown-divider" }, null, -1)]])) : n("", !0),
					t.filter.multiple ? (l(), r("li", nT, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => T.dropdownSelectAll(t.filter.value, t.filter.options)
					}, f(T.translate("Select all")), 9, rT)])) : n("", !0),
					t.filter.multiple ? (l(), r("li", iT, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => T.dropdownSelectClear(t.filter.value)
					}, f(T.translate("Unselect all")), 9, aT)])) : n("", !0),
					t.filter.multiple ? (l(), r("li", oT, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => T.dropdownSelectInvert(t.filter.value, t.filter.options)
					}, f(T.translate("Invert all")), 9, sT)])) : n("", !0)
				])])) : (l(), r("div", cT, [v(i("select", {
					"onUpdate:modelValue": (e) => t.filter.value = e,
					onChange: x[8] ||= (e) => T.reloadTable(),
					multiple: t.filter.multiple,
					class: "form-select form-select-sm pe-0"
				}, [(l(!0), r(e, null, u(t.filter.options, (e) => (l(), r("option", {
					key: e,
					value: e.value
				}, f(T.translate(e.label ? e.label : e.value)), 9, uT))), 128))], 40, lT), [[h, t.filter.value]]), t.filter.buttonx && t.filter.buttonx != 0 ? (l(), r("button", {
					key: 0,
					class: s(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
					disabled: t.filter.value == null,
					onClick: (e) => {
						t.filter.value = void 0, T.reloadTable();
					}
				}, [...x[20] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, dT)) : n("", !0)]))])) : n("", !0),
				t.filter && (t.filter.type == "datetime-local" || t.filter.type == "date") ? (l(), r("div", fT, [
					t.filter.operators == 1 ? v((l(), r("select", {
						key: 0,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						onChange: x[9] ||= (e) => T.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [
						i("option", mT, f(T.translate("=")), 1),
						i("option", hT, f(T.translate(">")), 1),
						i("option", gT, f(T.translate(">=")), 1),
						i("option", _T, f(T.translate("<")), 1),
						i("option", vT, f(T.translate("<=")), 1)
					], 40, pT)), [[h, t.filter.operator]]) : n("", !0),
					t.filter.operators && t.filter.operators.length > 0 ? v((l(), r("select", {
						key: 1,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						onChange: x[10] ||= (e) => T.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [(l(!0), r(e, null, u(t.filter.operators, (e) => (l(), r("option", {
						key: e,
						value: e.value
					}, f(T.translate(e.label)), 9, bT))), 128))], 40, yT)), [[h, t.filter.operator]]) : n("", !0),
					v(i("input", {
						type: t.filter.type,
						class: s([{ fixed: t.filter.fixed }, "form-control form-control-sm"]),
						"onUpdate:modelValue": (e) => t.filter.value = e,
						onChange: x[11] ||= (e) => T.reloadTable(),
						onKeyup: x[12] ||= y((e) => T.reloadTable(), ["enter"])
					}, null, 42, xT), [[m, t.filter.value]]),
					i("button", {
						class: s(["btn btn-outline-secondary", { "opacity-25": !t.filter.value }]),
						disabled: !t.filter.value,
						onClick: (e) => {
							t.filter.value = void 0, T.reloadTable();
						}
					}, [...x[21] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, ST)
				])) : n("", !0),
				t.filter && t.filter.buttons ? (l(), r("span", {
					key: 5,
					class: s(T.getValueOrFunction(t.filter.buttons, { column: t }))
				}, [(l(!0), r(e, null, u(t.filter.buttons, (e) => (l(), r("span", { key: e.action }, [i("button", {
					type: "button",
					disabled: e.disabled === void 0 ? null : T.getValueOrFunction(e.disabled),
					class: s([e.class ? e.class : T.getButtonClassByAction(e.action)]),
					onClick: (t) => T.tableAction(e, {
						items: w.items,
						$event: t
					})
				}, [i("i", { class: s([e.icon === void 0 ? T.getButtonIconClassByAction(e.action) : T.getValueOrFunction(e.icon, {
					button: e,
					column: t,
					table: this
				})]) }, null, 2), a(" " + f(T.translate(e.title)), 1)], 10, CT)]))), 128))], 2)) : n("", !0)
			], 14, Aw))), 128))])) : n("", !0)]),
			i("tbody", null, [(l(!0), r(e, null, u(this.items, (t, a) => (l(), r(e, { key: t.id }, [i("tr", wT, [(l(!0), r(e, null, u(S.settings.table.columns, (o) => (l(), r("td", {
				style: c([o.hidden ? "display: none" : ""]),
				key: o.name,
				"data-label": o.title ? o.title : T.translate(o.name),
				width: o.width,
				class: s(T.getValueOrFunction(o.class, {
					column: o,
					item: t
				})),
				onClick: (e) => T.tableAction(o, {
					item: t,
					index: a,
					$event: e
				})
			}, [
				o.index ? (l(), r("div", ET, [i("span", {
					class: s(["cursor-pointer badge border badge-index p-1 w-100", { selected: w.selected.indexOf(t[S.settings.pkey]) >= 0 }]),
					innerHTML: a + 1 + (w.config.pagination.page - 1) * w.config.pagination.limit
				}, null, 10, DT)])) : n("", !0),
				!o.template && !o.input && !o.progressbar ? (l(), r("span", OT, f(T.tableCellValue(o.name, t, a, o)), 1)) : n("", !0),
				o.template ? (l(), r("span", {
					key: 2,
					innerHTML: T.tableCellTemplate(o.template, t, a, o)
				}, null, 8, kT)) : n("", !0),
				o.progressbar ? (l(), r("div", {
					key: 3,
					class: "progress",
					role: "progressbar",
					"aria-label": "Warning example",
					"aria-valuenow": t[o.name],
					"aria-valuemax": o.progressbar.max
				}, [i("div", {
					class: s(["progress-bar", [o.progressbar.class]]),
					style: c({ width: Math.round(t[o.name] / o.progressbar.max * 100) + "%" })
				}, [o.progressbar.value ? (l(), r("span", jT, f(t[o.name]), 1)) : n("", !0)], 6)], 8, AT)) : n("", !0),
				o.input ? (l(), r("div", MT, [
					o.input.prefix ? (l(), r("span", {
						key: 0,
						class: "input-group-text",
						innerHTML: T.getValueOrFunction(o.input.prefix, {
							column: o,
							item: t
						})
					}, null, 8, NT)) : n("", !0),
					o.input.prefixcheck ? (l(), r("span", PT, [v(i("input", {
						class: "form-check p-0 m-0",
						type: "checkbox",
						name: o.input.prefixcheck.name,
						"onUpdate:modelValue": (e) => t[o.input.prefixcheck.name] = e,
						onChange: (e) => T.onRowInputChange(t[o.input.prefixcheck.name], o, t, a)
					}, null, 40, FT), [[p, t[o.input.prefixcheck.name]]])])) : n("", !0),
					[
						"text",
						"number",
						"date",
						"datetime-local"
					].indexOf(o.input.type) >= 0 ? v((l(), r("input", {
						key: 2,
						type: o.input.type,
						class: s(["form-control form-control-sm", T.getValueOrFunction(o.input.class, {
							column: o,
							item: t
						})]),
						onChange: (e) => T.onRowInputChange(t[o.name], o, t, a),
						"onUpdate:modelValue": (e) => t[o.name] = e
					}, null, 42, IT)), [[m, t[o.name]]]) : n("", !0),
					o.input.type == "select" ? v((l(), r("select", {
						key: 3,
						class: s(["form-select form-select-sm pe-0", T.getValueOrFunction(o.input.class, {
							column: o,
							item: t
						})]),
						onChange: (e) => T.onRowInputChange(t[o.name], o, t, a),
						"onUpdate:modelValue": (e) => t[o.name] = e
					}, [(l(!0), r(e, null, u(o.input.options, (e) => (l(), r("option", {
						value: e.value,
						key: e
					}, f(T.translate(e.label)), 9, RT))), 128))], 42, LT)), [[h, t[o.name]]]) : n("", !0),
					o.input.suffix ? (l(), r("span", {
						key: 4,
						class: "input-group-text",
						innerHTML: T.getValueOrFunction(o.input.suffix, {
							column: o,
							item: t
						})
					}, null, 8, zT)) : n("", !0),
					o.input.suffixcheck ? (l(), r("span", BT, [v(i("input", {
						class: "form-check p-0 m-0",
						type: "checkbox",
						name: o.input.suffixcheck.name,
						"onUpdate:modelValue": (e) => t[o.input.suffixcheck.name] = e,
						onChange: (e) => T.onRowInputChange(t[o.input.suffixcheck.name], o, t, a)
					}, null, 40, VT), [[p, t[o.input.suffixcheck.name]]])])) : n("", !0)
				])) : n("", !0),
				o.buttons ? (l(), r("span", HT, [(l(!0), r(e, null, u(o.buttons, (e) => (l(), r("span", { key: e.action }, [e.hidden ? n("", !0) : (l(), r("button", {
					key: 0,
					type: "button",
					disabled: e.disabled === void 0 ? null : T.getValueOrFunction(e.disabled),
					class: s([e.class ? T.getValueOrFunction(e.class, {
						button: e,
						column: o,
						item: t,
						table: this
					}) : T.getButtonClassByAction(e.action)]),
					onClick: (n) => T.tableAction(e, {
						column: o,
						item: t,
						index: a,
						$event: n
					})
				}, [e.icon === null ? n("", !0) : (l(), r("i", {
					key: 0,
					class: s([e.icon === void 0 ? T.getButtonIconClassByAction(e.action) : T.getValueOrFunction(e.icon, {
						button: e,
						column: o,
						item: t,
						table: this
					})])
				}, null, 2)), e.template ? (l(), r("span", {
					key: 1,
					innerHTML: T.tableCellTemplate(e.template, t, a, o)
				}, null, 8, WT)) : (l(), r("span", GT, f(T.translate(e.title)), 1))], 10, UT))]))), 128))])) : n("", !0)
			], 14, TT))), 128))]), S.settings.table.details && w.details.indexOf(t[S.settings.pkey]) >= 0 ? (l(), r("tr", KT, [i("td", {
				class: s([S.settings.table.details.class]),
				colspan: S.settings.table.columns.length
			}, [
				(l(!0), r(e, null, u(S.settings.table.details.fields, (o) => (l(), r("div", {
					class: "m-0",
					key: o
				}, [i("div", JT, [i("div", { class: s(["col text-end", [o.class]]) }, [i("label", YT, f(o.label), 1)], 2), i("div", { class: s(["col", [o.input.class]]) }, [
					["select", "textarea"].indexOf(o.input.type) < 0 ? v((l(), r("input", {
						key: 0,
						type: o.input.type,
						class: "form-control form-control-sm",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => T.onRowInputChange(t[o.name], o, t, a)
					}, null, 40, XT)), [[m, t[o.name]]]) : n("", !0),
					o.input.type == "textarea" ? v((l(), r("textarea", {
						key: 1,
						class: "form-control form-control-sm",
						rows: "3",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => T.onRowInputChange(t[o.name], o, t, a)
					}, "\r\n                    ", 40, ZT)), [[g, t[o.name]]]) : n("", !0),
					o.input.type == "select" ? v((l(), r("select", {
						key: 2,
						class: "form-select form-select-sm pe-0",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => T.onRowInputChange(t[o.name], o, t, a)
					}, [(l(!0), r(e, null, u(o.input.options, (e) => (l(), r("option", {
						value: e.value,
						key: e
					}, f(T.translate(e.label)), 9, $T))), 128))], 40, QT)), [[h, t[o.name]]]) : n("", !0)
				], 2)])]))), 128)),
				i("span", { innerHTML: S.settings.table.details.raw(t) }, null, 8, eE),
				S.settings.debug > 1 ? (l(), r("pre", tE, "                  " + f(t) + "\n                ", 1)) : n("", !0)
			], 10, qT)])) : n("", !0)], 64))), 128))]),
			i("tfoot", null, [w.selected.length > 0 ? (l(), r("tr", nE, [(l(!0), r(e, null, u(S.settings.table.columns, (t) => (l(), r("td", {
				style: c([t.hidden ? "display: none" : ""]),
				key: t.name,
				"data-label": t.title,
				width: t.width,
				class: s(t.class)
			}, [
				t.index ? (l(), r("div", iE, [i("span", {
					class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
					onClick: x[13] ||= (e) => T.toggleSelectedAll()
				}, f(w.selected.length), 1)])) : n("", !0),
				t.input && t.bulk && t.bulk.enabled ? (l(), r("div", aE, [
					[
						"text",
						"number",
						"date",
						"datetime-local"
					].indexOf(t.input.type) >= 0 ? v((l(), r("input", {
						key: 0,
						type: t.input.type,
						class: s(["form-control form-control-sm", t.input.class]),
						disabled: w.bulkinputs.indexOf(t.name) < 0,
						onChange: (e) => T.onBulkInputChange(w.bulkitem[t.name], w.bulkitem, t),
						"onUpdate:modelValue": (e) => w.bulkitem[t.name] = e
					}, null, 42, oE)), [[m, w.bulkitem[t.name]]]) : n("", !0),
					t.input.type == "select" ? v((l(), r("select", {
						key: 1,
						class: s(["form-select form-select-sm pe-0", t.input.class]),
						disabled: w.bulkinputs.indexOf(t.name) < 0,
						onChange: (e) => T.onBulkInputChange(w.bulkitem[t.name], w.bulkitem, t),
						"onUpdate:modelValue": (e) => w.bulkitem[t.name] = e
					}, [(l(!0), r(e, null, u(t.input.options, (e) => (l(), r("option", {
						value: e.value,
						key: e
					}, f(T.translate(e.label)), 9, cE))), 128))], 42, sE)), [[h, w.bulkitem[t.name]]]) : n("", !0),
					i("span", {
						class: "input-group-text cursor-pointer",
						onClick: (e) => T.ifBulkInputClick(t)
					}, [w.bulkitem[t.name] === void 0 ? (l(), r("i", uE)) : (l(), r("i", dE))], 8, lE)
				])) : n("", !0),
				t.bulk ? (l(), r("span", fE, [(l(!0), r(e, null, u(t.bulk.buttons, (e) => (l(), r("span", { key: e.action }, [i("button", {
					type: "button",
					class: s([e.class ? e.class : T.getButtonClassByAction(e.action)]),
					disabled: e.action === "save" && !this.bulkinputs.length,
					onClick: (n) => T.tableBulkAction(e.action, w.bulkitem, t, n)
				}, [e.icon === null ? n("", !0) : (l(), r("i", {
					key: 0,
					class: s([e.icon === void 0 ? T.getButtonIconClassByAction(e.action) : T.getValueOrFunction(e.icon, {
						button: e,
						column: t,
						table: this
					})])
				}, null, 2)), e.template ? (l(), r("span", {
					key: 1,
					innerHTML: T.tableCellTemplate(e.template, w.bulkitem, null, t)
				}, null, 8, mE)) : (l(), r("span", hE, f(T.translate(e.title)), 1))], 10, pE)]))), 128))])) : n("", !0)
			], 14, rE))), 128))])) : n("", !0)])
		], 2)) : n("", !0),
		o(E, {
			settings: S.settings,
			config: w.config,
			ui: w.ui,
			onSetPage: T.setPage,
			onSetPageLimit: T.setPageLimit,
			onTranslate: T.translate
		}, null, 8, [
			"settings",
			"config",
			"ui",
			"onSetPage",
			"onSetPageLimit",
			"onTranslate"
		])
	], 10, JC)) : n("", !0), i("div", {
		class: "modal shadow",
		id: w.modalId,
		tabindex: "-1"
	}, [i("div", _E, [i("div", vE, [T.authAndSettings() && S.settings.form.visible && S.settings.form.groups ? (l(), t(D, {
		key: 0,
		modelValue: w.item,
		"onUpdate:modelValue": x[14] ||= (e) => w.item = e,
		formid: w.formId,
		settings: S.settings,
		modalWindow: w.modalWindow,
		auth: S.auth,
		saveItem: T.saveItem,
		deleteItem: T.deleteItem,
		reloadTable: T.reloadTable,
		fetchRelation: T.fetchRelation
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
	])) : n("", !0)])])], 8, gE)]);
}
var bE = {
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
			}, r.onerror = () => {}, document.head.appendChild(r);
		},
		init(e) {
			if (e) {
				if (this.settings = vc(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
					let e = document.documentElement.getAttribute("data-bs-theme");
					this.settings.theme = e || "light";
				}
				this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log(`Entity config (${this.entity}) initialized`), this.settings.debug > 1 && console.log(this.settings));
			} else console.error(`Entity config (${this.entity}) not found`);
			this.$forceUpdate();
		}
	},
	components: { VuAdminTable: /* @__PURE__ */ Cy(qC, [["render", yE]]) }
}, xE = { key: 0 }, SE = ["data-bs-theme"];
function CE(e, t, i, a, s, c) {
	let u = d("vu-admin-table");
	return e.entity && e.settings ? (l(), r("div", xE, [e.auth ? (l(), r("div", {
		key: 0,
		class: "vu-admin",
		"data-bs-theme": [e.settings.theme]
	}, [o(u, {
		settings: e.settings,
		auth: e.auth
	}, null, 8, ["settings", "auth"])], 8, SE)) : n("", !0)])) : n("", !0);
}
var wE = /* @__PURE__ */ Cy(bE, [["render", CE]]), TE = (/* @__PURE__ */ D(((e, t) => {
	(function() {
		var e = "input is invalid type", n = "finalize already called", r = typeof window == "object", i = r ? window : {};
		i.JS_SHA512_NO_WINDOW && (r = !1);
		var a = !r && typeof self == "object";
		!i.JS_SHA512_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node ? i = global : a && (i = self);
		var o = !i.JS_SHA512_NO_COMMON_JS && typeof t == "object" && t.exports, s = typeof define == "function" && define.amd, c = !i.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", l = "0123456789abcdef".split(""), u = [
			-2147483648,
			8388608,
			32768,
			128
		], d = [
			24,
			16,
			8,
			0
		], f = [
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
		], p = [
			"hex",
			"array",
			"digest",
			"arrayBuffer"
		], m = [], h = Array.isArray;
		(i.JS_SHA512_NO_NODE_JS || !h) && (h = function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		});
		var g = ArrayBuffer.isView;
		c && (i.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !g) && (g = function(e) {
			return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
		});
		var _ = function(t) {
			var n = typeof t;
			if (n === "string") return [t, !0];
			if (n !== "object" || t === null) throw Error(e);
			if (c && t.constructor === ArrayBuffer) return [new Uint8Array(t), !1];
			if (!h(t) && !g(t)) throw Error(e);
			return [t, !1];
		}, v = function(e, t) {
			return function(n) {
				return new S(t, !0).update(n)[e]();
			};
		}, y = function(e) {
			var t = v("hex", e);
			t.create = function() {
				return new S(e);
			}, t.update = function(e) {
				return t.create().update(e);
			};
			for (var n = 0; n < p.length; ++n) {
				var r = p[n];
				t[r] = v(r, e);
			}
			return t;
		}, b = function(e, t) {
			return function(n, r) {
				return new C(n, t, !0).update(r)[e]();
			};
		}, x = function(e) {
			var t = b("hex", e);
			t.create = function(t) {
				return new C(t, e);
			}, t.update = function(e, n) {
				return t.create(e).update(n);
			};
			for (var n = 0; n < p.length; ++n) {
				var r = p[n];
				t[r] = b(r, e);
			}
			return t;
		};
		function S(e, t) {
			t ? (m[0] = m[1] = m[2] = m[3] = m[4] = m[5] = m[6] = m[7] = m[8] = m[9] = m[10] = m[11] = m[12] = m[13] = m[14] = m[15] = m[16] = m[17] = m[18] = m[19] = m[20] = m[21] = m[22] = m[23] = m[24] = m[25] = m[26] = m[27] = m[28] = m[29] = m[30] = m[31] = m[32] = 0, this.blocks = m) : this.blocks = [
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
		S.prototype.update = function(e) {
			if (this.finalized) throw Error(n);
			var t = _(e);
			e = t[0];
			for (var r = t[1], i, a = 0, o, s = e.length, c = this.blocks; a < s;) {
				if (this.hashed && (this.hashed = !1, c[0] = this.block, this.block = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = c[16] = c[17] = c[18] = c[19] = c[20] = c[21] = c[22] = c[23] = c[24] = c[25] = c[26] = c[27] = c[28] = c[29] = c[30] = c[31] = c[32] = 0), r) for (o = this.start; a < s && o < 128; ++a) i = e.charCodeAt(a), i < 128 ? c[o >>> 2] |= i << d[o++ & 3] : i < 2048 ? (c[o >>> 2] |= (192 | i >>> 6) << d[o++ & 3], c[o >>> 2] |= (128 | i & 63) << d[o++ & 3]) : i < 55296 || i >= 57344 ? (c[o >>> 2] |= (224 | i >>> 12) << d[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << d[o++ & 3], c[o >>> 2] |= (128 | i & 63) << d[o++ & 3]) : (i = 65536 + ((i & 1023) << 10 | e.charCodeAt(++a) & 1023), c[o >>> 2] |= (240 | i >>> 18) << d[o++ & 3], c[o >>> 2] |= (128 | i >>> 12 & 63) << d[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << d[o++ & 3], c[o >>> 2] |= (128 | i & 63) << d[o++ & 3]);
				else for (o = this.start; a < s && o < 128; ++a) c[o >>> 2] |= e[a] << d[o++ & 3];
				this.lastByteIndex = o, this.bytes += o - this.start, o >= 128 ? (this.block = c[32], this.start = o - 128, this.hash(), this.hashed = !0) : this.start = o;
			}
			return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296), this;
		}, S.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var e = this.blocks, t = this.lastByteIndex;
				e[32] = this.block, e[t >>> 2] |= u[t & 3], this.block = e[32], t >= 112 && (this.hashed || this.hash(), e[0] = this.block, e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = e[16] = e[17] = e[18] = e[19] = e[20] = e[21] = e[22] = e[23] = e[24] = e[25] = e[26] = e[27] = e[28] = e[29] = e[30] = e[31] = e[32] = 0), e[30] = this.hBytes << 3 | this.bytes >>> 29, e[31] = this.bytes << 3, this.hash();
			}
		}, S.prototype.hash = function() {
			var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, c = this.h4h, l = this.h4l, u = this.h5h, d = this.h5l, p = this.h6h, m = this.h6l, h = this.h7h, g = this.h7l, _ = this.blocks, v, y, b, x, S, C, w, T, E, D, ee, te, ne, re, ie, ae, oe, O, k, A, j, M, N, P, se;
			for (v = 32; v < 160; v += 2) A = _[v - 30], j = _[v - 29], y = (A >>> 1 | j << 31) ^ (A >>> 8 | j << 24) ^ A >>> 7, b = (j >>> 1 | A << 31) ^ (j >>> 8 | A << 24) ^ (j >>> 7 | A << 25), A = _[v - 4], j = _[v - 3], x = (A >>> 19 | j << 13) ^ (j >>> 29 | A << 3) ^ A >>> 6, S = (j >>> 19 | A << 13) ^ (A >>> 29 | j << 3) ^ (j >>> 6 | A << 26), A = _[v - 32], j = _[v - 31], M = _[v - 14], N = _[v - 13], C = (N & 65535) + (j & 65535) + (b & 65535) + (S & 65535), w = (N >>> 16) + (j >>> 16) + (b >>> 16) + (S >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (y & 65535) + (x & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (y >>> 16) + (x >>> 16) + (T >>> 16), _[v] = E << 16 | T & 65535, _[v + 1] = w << 16 | C & 65535;
			var ce = e, F = t, I = n, L = r, R = i, z = a, le = o, ue = s, de = c, fe = l, B = u, V = d, H = p, U = m, W = h, G = g;
			for (ae = I & R, oe = L & z, v = 0; v < 160; v += 8) y = (ce >>> 28 | F << 4) ^ (F >>> 2 | ce << 30) ^ (F >>> 7 | ce << 25), b = (F >>> 28 | ce << 4) ^ (ce >>> 2 | F << 30) ^ (ce >>> 7 | F << 25), x = (de >>> 14 | fe << 18) ^ (de >>> 18 | fe << 14) ^ (fe >>> 9 | de << 23), S = (fe >>> 14 | de << 18) ^ (fe >>> 18 | de << 14) ^ (de >>> 9 | fe << 23), D = ce & I, ee = F & L, O = D ^ ce & R ^ ae, k = ee ^ F & z ^ oe, P = de & B ^ ~de & H, se = fe & V ^ ~fe & U, A = _[v], j = _[v + 1], M = f[v], N = f[v + 1], C = (N & 65535) + (j & 65535) + (se & 65535) + (S & 65535) + (G & 65535), w = (N >>> 16) + (j >>> 16) + (se >>> 16) + (S >>> 16) + (G >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (P & 65535) + (x & 65535) + (W & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (P >>> 16) + (x >>> 16) + (W >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (O & 65535) + (y & 65535) + (w >>> 16), E = (O >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (ue & 65535) + (j & 65535), w = (ue >>> 16) + (j >>> 16) + (C >>> 16), T = (le & 65535) + (A & 65535) + (w >>> 16), E = (le >>> 16) + (A >>> 16) + (T >>> 16), W = E << 16 | T & 65535, G = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), le = E << 16 | T & 65535, ue = w << 16 | C & 65535, y = (le >>> 28 | ue << 4) ^ (ue >>> 2 | le << 30) ^ (ue >>> 7 | le << 25), b = (ue >>> 28 | le << 4) ^ (le >>> 2 | ue << 30) ^ (le >>> 7 | ue << 25), x = (W >>> 14 | G << 18) ^ (W >>> 18 | G << 14) ^ (G >>> 9 | W << 23), S = (G >>> 14 | W << 18) ^ (G >>> 18 | W << 14) ^ (W >>> 9 | G << 23), te = le & ce, ne = ue & F, O = te ^ le & I ^ D, k = ne ^ ue & L ^ ee, P = W & de ^ ~W & B, se = G & fe ^ ~G & V, A = _[v + 2], j = _[v + 3], M = f[v + 2], N = f[v + 3], C = (N & 65535) + (j & 65535) + (se & 65535) + (S & 65535) + (U & 65535), w = (N >>> 16) + (j >>> 16) + (se >>> 16) + (S >>> 16) + (U >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (P & 65535) + (x & 65535) + (H & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (P >>> 16) + (x >>> 16) + (H >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (O & 65535) + (y & 65535) + (w >>> 16), E = (O >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (z & 65535) + (j & 65535), w = (z >>> 16) + (j >>> 16) + (C >>> 16), T = (R & 65535) + (A & 65535) + (w >>> 16), E = (R >>> 16) + (A >>> 16) + (T >>> 16), H = E << 16 | T & 65535, U = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), R = E << 16 | T & 65535, z = w << 16 | C & 65535, y = (R >>> 28 | z << 4) ^ (z >>> 2 | R << 30) ^ (z >>> 7 | R << 25), b = (z >>> 28 | R << 4) ^ (R >>> 2 | z << 30) ^ (R >>> 7 | z << 25), x = (H >>> 14 | U << 18) ^ (H >>> 18 | U << 14) ^ (U >>> 9 | H << 23), S = (U >>> 14 | H << 18) ^ (U >>> 18 | H << 14) ^ (H >>> 9 | U << 23), re = R & le, ie = z & ue, O = re ^ R & ce ^ te, k = ie ^ z & F ^ ne, P = H & W ^ ~H & de, se = U & G ^ ~U & fe, A = _[v + 4], j = _[v + 5], M = f[v + 4], N = f[v + 5], C = (N & 65535) + (j & 65535) + (se & 65535) + (S & 65535) + (V & 65535), w = (N >>> 16) + (j >>> 16) + (se >>> 16) + (S >>> 16) + (V >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (P & 65535) + (x & 65535) + (B & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (P >>> 16) + (x >>> 16) + (B >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (O & 65535) + (y & 65535) + (w >>> 16), E = (O >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (L & 65535) + (j & 65535), w = (L >>> 16) + (j >>> 16) + (C >>> 16), T = (I & 65535) + (A & 65535) + (w >>> 16), E = (I >>> 16) + (A >>> 16) + (T >>> 16), B = E << 16 | T & 65535, V = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), I = E << 16 | T & 65535, L = w << 16 | C & 65535, y = (I >>> 28 | L << 4) ^ (L >>> 2 | I << 30) ^ (L >>> 7 | I << 25), b = (L >>> 28 | I << 4) ^ (I >>> 2 | L << 30) ^ (I >>> 7 | L << 25), x = (B >>> 14 | V << 18) ^ (B >>> 18 | V << 14) ^ (V >>> 9 | B << 23), S = (V >>> 14 | B << 18) ^ (V >>> 18 | B << 14) ^ (B >>> 9 | V << 23), ae = I & R, oe = L & z, O = ae ^ I & le ^ re, k = oe ^ L & ue ^ ie, P = B & H ^ ~B & W, se = V & U ^ ~V & G, A = _[v + 6], j = _[v + 7], M = f[v + 6], N = f[v + 7], C = (N & 65535) + (j & 65535) + (se & 65535) + (S & 65535) + (fe & 65535), w = (N >>> 16) + (j >>> 16) + (se >>> 16) + (S >>> 16) + (fe >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (P & 65535) + (x & 65535) + (de & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (P >>> 16) + (x >>> 16) + (de >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (O & 65535) + (y & 65535) + (w >>> 16), E = (O >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (F & 65535) + (j & 65535), w = (F >>> 16) + (j >>> 16) + (C >>> 16), T = (ce & 65535) + (A & 65535) + (w >>> 16), E = (ce >>> 16) + (A >>> 16) + (T >>> 16), de = E << 16 | T & 65535, fe = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), ce = E << 16 | T & 65535, F = w << 16 | C & 65535;
			C = (t & 65535) + (F & 65535), w = (t >>> 16) + (F >>> 16) + (C >>> 16), T = (e & 65535) + (ce & 65535) + (w >>> 16), E = (e >>> 16) + (ce >>> 16) + (T >>> 16), this.h0h = E << 16 | T & 65535, this.h0l = w << 16 | C & 65535, C = (r & 65535) + (L & 65535), w = (r >>> 16) + (L >>> 16) + (C >>> 16), T = (n & 65535) + (I & 65535) + (w >>> 16), E = (n >>> 16) + (I >>> 16) + (T >>> 16), this.h1h = E << 16 | T & 65535, this.h1l = w << 16 | C & 65535, C = (a & 65535) + (z & 65535), w = (a >>> 16) + (z >>> 16) + (C >>> 16), T = (i & 65535) + (R & 65535) + (w >>> 16), E = (i >>> 16) + (R >>> 16) + (T >>> 16), this.h2h = E << 16 | T & 65535, this.h2l = w << 16 | C & 65535, C = (s & 65535) + (ue & 65535), w = (s >>> 16) + (ue >>> 16) + (C >>> 16), T = (o & 65535) + (le & 65535) + (w >>> 16), E = (o >>> 16) + (le >>> 16) + (T >>> 16), this.h3h = E << 16 | T & 65535, this.h3l = w << 16 | C & 65535, C = (l & 65535) + (fe & 65535), w = (l >>> 16) + (fe >>> 16) + (C >>> 16), T = (c & 65535) + (de & 65535) + (w >>> 16), E = (c >>> 16) + (de >>> 16) + (T >>> 16), this.h4h = E << 16 | T & 65535, this.h4l = w << 16 | C & 65535, C = (d & 65535) + (V & 65535), w = (d >>> 16) + (V >>> 16) + (C >>> 16), T = (u & 65535) + (B & 65535) + (w >>> 16), E = (u >>> 16) + (B >>> 16) + (T >>> 16), this.h5h = E << 16 | T & 65535, this.h5l = w << 16 | C & 65535, C = (m & 65535) + (U & 65535), w = (m >>> 16) + (U >>> 16) + (C >>> 16), T = (p & 65535) + (H & 65535) + (w >>> 16), E = (p >>> 16) + (H >>> 16) + (T >>> 16), this.h6h = E << 16 | T & 65535, this.h6l = w << 16 | C & 65535, C = (g & 65535) + (G & 65535), w = (g >>> 16) + (G >>> 16) + (C >>> 16), T = (h & 65535) + (W & 65535) + (w >>> 16), E = (h >>> 16) + (W >>> 16) + (T >>> 16), this.h7h = E << 16 | T & 65535, this.h7l = w << 16 | C & 65535;
		}, S.prototype.hex = function() {
			this.finalize();
			var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, c = this.h4h, u = this.h4l, d = this.h5h, f = this.h5l, p = this.h6h, m = this.h6l, h = this.h7h, g = this.h7l, _ = this.bits, v = l[e >>> 28 & 15] + l[e >>> 24 & 15] + l[e >>> 20 & 15] + l[e >>> 16 & 15] + l[e >>> 12 & 15] + l[e >>> 8 & 15] + l[e >>> 4 & 15] + l[e & 15] + l[t >>> 28 & 15] + l[t >>> 24 & 15] + l[t >>> 20 & 15] + l[t >>> 16 & 15] + l[t >>> 12 & 15] + l[t >>> 8 & 15] + l[t >>> 4 & 15] + l[t & 15] + l[n >>> 28 & 15] + l[n >>> 24 & 15] + l[n >>> 20 & 15] + l[n >>> 16 & 15] + l[n >>> 12 & 15] + l[n >>> 8 & 15] + l[n >>> 4 & 15] + l[n & 15] + l[r >>> 28 & 15] + l[r >>> 24 & 15] + l[r >>> 20 & 15] + l[r >>> 16 & 15] + l[r >>> 12 & 15] + l[r >>> 8 & 15] + l[r >>> 4 & 15] + l[r & 15] + l[i >>> 28 & 15] + l[i >>> 24 & 15] + l[i >>> 20 & 15] + l[i >>> 16 & 15] + l[i >>> 12 & 15] + l[i >>> 8 & 15] + l[i >>> 4 & 15] + l[i & 15] + l[a >>> 28 & 15] + l[a >>> 24 & 15] + l[a >>> 20 & 15] + l[a >>> 16 & 15] + l[a >>> 12 & 15] + l[a >>> 8 & 15] + l[a >>> 4 & 15] + l[a & 15] + l[o >>> 28 & 15] + l[o >>> 24 & 15] + l[o >>> 20 & 15] + l[o >>> 16 & 15] + l[o >>> 12 & 15] + l[o >>> 8 & 15] + l[o >>> 4 & 15] + l[o & 15];
			return _ >= 256 && (v += l[s >>> 28 & 15] + l[s >>> 24 & 15] + l[s >>> 20 & 15] + l[s >>> 16 & 15] + l[s >>> 12 & 15] + l[s >>> 8 & 15] + l[s >>> 4 & 15] + l[s & 15]), _ >= 384 && (v += l[c >>> 28 & 15] + l[c >>> 24 & 15] + l[c >>> 20 & 15] + l[c >>> 16 & 15] + l[c >>> 12 & 15] + l[c >>> 8 & 15] + l[c >>> 4 & 15] + l[c & 15] + l[u >>> 28 & 15] + l[u >>> 24 & 15] + l[u >>> 20 & 15] + l[u >>> 16 & 15] + l[u >>> 12 & 15] + l[u >>> 8 & 15] + l[u >>> 4 & 15] + l[u & 15] + l[d >>> 28 & 15] + l[d >>> 24 & 15] + l[d >>> 20 & 15] + l[d >>> 16 & 15] + l[d >>> 12 & 15] + l[d >>> 8 & 15] + l[d >>> 4 & 15] + l[d & 15] + l[f >>> 28 & 15] + l[f >>> 24 & 15] + l[f >>> 20 & 15] + l[f >>> 16 & 15] + l[f >>> 12 & 15] + l[f >>> 8 & 15] + l[f >>> 4 & 15] + l[f & 15]), _ == 512 && (v += l[p >>> 28 & 15] + l[p >>> 24 & 15] + l[p >>> 20 & 15] + l[p >>> 16 & 15] + l[p >>> 12 & 15] + l[p >>> 8 & 15] + l[p >>> 4 & 15] + l[p & 15] + l[m >>> 28 & 15] + l[m >>> 24 & 15] + l[m >>> 20 & 15] + l[m >>> 16 & 15] + l[m >>> 12 & 15] + l[m >>> 8 & 15] + l[m >>> 4 & 15] + l[m & 15] + l[h >>> 28 & 15] + l[h >>> 24 & 15] + l[h >>> 20 & 15] + l[h >>> 16 & 15] + l[h >>> 12 & 15] + l[h >>> 8 & 15] + l[h >>> 4 & 15] + l[h & 15] + l[g >>> 28 & 15] + l[g >>> 24 & 15] + l[g >>> 20 & 15] + l[g >>> 16 & 15] + l[g >>> 12 & 15] + l[g >>> 8 & 15] + l[g >>> 4 & 15] + l[g & 15]), v;
		}, S.prototype.toString = S.prototype.hex, S.prototype.digest = function() {
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
		}, S.prototype.array = S.prototype.digest, S.prototype.arrayBuffer = function() {
			this.finalize();
			var e = this.bits, t = /* @__PURE__ */ new ArrayBuffer(e / 8), n = new DataView(t);
			return n.setUint32(0, this.h0h), n.setUint32(4, this.h0l), n.setUint32(8, this.h1h), n.setUint32(12, this.h1l), n.setUint32(16, this.h2h), n.setUint32(20, this.h2l), n.setUint32(24, this.h3h), e >= 256 && n.setUint32(28, this.h3l), e >= 384 && (n.setUint32(32, this.h4h), n.setUint32(36, this.h4l), n.setUint32(40, this.h5h), n.setUint32(44, this.h5l)), e == 512 && (n.setUint32(48, this.h6h), n.setUint32(52, this.h6l), n.setUint32(56, this.h7h), n.setUint32(60, this.h7l)), t;
		}, S.prototype.clone = function() {
			var e = new S(this.bits, !1);
			return this.copyTo(e), e;
		}, S.prototype.copyTo = function(e) {
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
		function C(e, t, n) {
			var r, i = _(e);
			if (e = i[0], i[1]) {
				for (var a = [], o = e.length, s = 0, c, r = 0; r < o; ++r) c = e.charCodeAt(r), c < 128 ? a[s++] = c : c < 2048 ? (a[s++] = 192 | c >>> 6, a[s++] = 128 | c & 63) : c < 55296 || c >= 57344 ? (a[s++] = 224 | c >>> 12, a[s++] = 128 | c >>> 6 & 63, a[s++] = 128 | c & 63) : (c = 65536 + ((c & 1023) << 10 | e.charCodeAt(++r) & 1023), a[s++] = 240 | c >>> 18, a[s++] = 128 | c >>> 12 & 63, a[s++] = 128 | c >>> 6 & 63, a[s++] = 128 | c & 63);
				e = a;
			}
			e.length > 128 && (e = new S(t, !0).update(e).array());
			for (var l = [], u = [], r = 0; r < 128; ++r) {
				var d = e[r] || 0;
				l[r] = 92 ^ d, u[r] = 54 ^ d;
			}
			S.call(this, t, n), this.update(u), this.oKeyPad = l, this.inner = !0, this.sharedMemory = n;
		}
		C.prototype = new S(), C.prototype.finalize = function() {
			if (S.prototype.finalize.call(this), this.inner) {
				this.inner = !1;
				var e = this.array();
				S.call(this, this.bits, this.sharedMemory), this.update(this.oKeyPad), this.update(e), S.prototype.finalize.call(this);
			}
		}, C.prototype.clone = function() {
			var e = new C([], this.bits, !1);
			this.copyTo(e), e.inner = this.inner;
			for (var t = 0; t < this.oKeyPad.length; ++t) e.oKeyPad[t] = this.oKeyPad[t];
			return e;
		};
		var w = y(512);
		w.sha512 = w, w.sha384 = y(384), w.sha512_256 = y(256), w.sha512_224 = y(224), w.sha512.hmac = x(512), w.sha384.hmac = x(384), w.sha512_256.hmac = x(256), w.sha512_224.hmac = x(224), o ? t.exports = w : (i.sha512 = w.sha512, i.sha384 = w.sha384, i.sha512_256 = w.sha512_256, i.sha512_224 = w.sha512_224, s && define(function() {
			return w;
		}));
	})();
})))();
//#endregion
//#region src/components/VuAuth.vue
_c();
var EE = {
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
	components: { VuAdminForm: SC },
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
			if (console.log("[auth] handleSubmit called, panel:", this.auth.panel), console.log("[auth] honeypot:", JSON.stringify(this.honeypot)), console.log("[auth] captchaRequired:", this.captchaRequired), console.log("[auth] captcha.answers:", this.captcha.answers), console.log("[auth] captcha.token:", this.captcha.token), this.auth.panel !== "twofa" && this.honeypot) {
				console.log("[auth] blocked by honeypot");
				return;
			}
			if (this.captchaRequired && this.captcha.answers.length !== 1) {
				console.log("[auth] captcha incomplete, answers count:", this.captcha.answers.length), this.captchaError = !0;
				return;
			}
			this.captchaError = !1, this.loading = !0;
			try {
				switch (console.log("[auth] calling handler for panel:", this.auth.panel), this.auth.panel) {
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
			if (this.auth.response = {}, console.log("[auth] registration: username:", this.username, "password len:", this.password.length, "password_again len:", this.password_again.length, "match:", this.password === this.password_again), !this.username || !this.password || !this.password_again || this.password !== this.password_again) {
				console.log("[auth] registration: validation failed — returning early");
				return;
			}
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
			await this.getStatusAndJson(e), console.log("[auth] registration response status:", e.status, "ok:", e.ok, "data:", this.auth.response.data), e.ok ? this.onSuccess("registration") : this.onError("registration");
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
			for (let e = 0; e < t; e++) n = (0, TE.sha512)(n);
			return n;
		},
		authUpdate() {
			this.$emit("update:modelValue", this.auth);
		},
		handleEscapeKey(e) {
			e.key === "Escape" && this.close();
		},
		getValueOrFunction(e, t) {
			return yc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return Pc(e, this.settings.translate, t, n || this.settings.language);
		},
		isTwofaPanel(e) {
			return !this.settings.twofa || !this.settings.twofa.panels ? !0 : this.settings.twofa.panels.includes(e);
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
		let e = Ec(1e5);
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
		}, console.log(this.auth), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.detectQuery(), this.captchaRequired && this.fetchCaptcha(), this.settings.debug && console.log("vu-auth mounted ", "1.4.2");
	},
	beforeUnmount() {
		window.removeEventListener("keydown", this.handleEscapeKey);
	}
}, DE = ["data-bs-theme"], OE = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, kE = { class: "position-absolute top-0 end-0 p-0 m-2" }, AE = {
	key: 0,
	class: "spinner-border spinner-border-sm text-primary"
}, jE = { class: "text-center mt-2 mb-4" }, ME = {
	key: 0,
	class: "mb-3"
}, NE = {
	for: "email",
	class: "form-label text-primary"
}, PE = { class: "input-group" }, FE = [
	"type",
	"placeholder",
	"disabled"
], IE = ["innerHTML"], LE = { class: "mb-3" }, RE = {
	key: 0,
	for: "password",
	class: "form-label text-primary"
}, zE = { class: "input-group" }, BE = [
	"type",
	"placeholder",
	"pattern",
	"minlength",
	"disabled"
], VE = {
	key: 0,
	class: "bi bi-eye"
}, HE = {
	key: 1,
	class: "bi bi-eye-slash"
}, UE = ["innerHTML"], WE = {
	key: 0,
	class: "mb-4"
}, GE = {
	for: "password_again",
	class: "form-label text-primary"
}, KE = ["innerHTML"], qE = { class: "input-group" }, JE = [
	"type",
	"placeholder",
	"minlength",
	"disabled"
], YE = {
	key: 0,
	class: "bi bi-eye"
}, XE = {
	key: 1,
	class: "bi bi-eye-slash"
}, ZE = ["innerHTML"], QE = {
	key: 2,
	class: "mb-3"
}, $E = {
	key: 0,
	class: "text-center py-2"
}, eD = { key: 1 }, tD = ["innerHTML"], nD = { class: "d-flex justify-content-center gap-2 flex-wrap" }, rD = ["onClick"], iD = {
	key: 3,
	class: "text-danger text-center small mt-2 mb-3 fw-semibold"
}, aD = {
	key: 4,
	class: "mb-3"
}, oD = ["innerHTML"], sD = { class: "form-label text-primary" }, cD = { class: "input-group" }, lD = ["placeholder", "disabled"], uD = { class: "text-end mt-2" }, dD = ["disabled"], fD = {
	key: 5,
	class: "mb-4 text-center"
}, pD = ["innerHTML"], mD = {
	key: 6,
	class: "d-flex mb-4"
}, hD = ["innerHTML"], gD = { class: "row" }, _D = { class: "mb-3" }, vD = ["for", "innerHTML"], yD = { class: "input-group" }, bD = ["innerHTML"], xD = [
	"disabled",
	"required",
	"onUpdate:modelValue",
	"multiple"
], SD = ["value", "innerHTML"], CD = [
	"id",
	"name",
	"type",
	"onUpdate:modelValue",
	"placeholder",
	"required",
	"disabled"
], wD = ["innerHTML"], TD = ["innerHTML"], ED = {
	key: 0,
	class: "form-check"
}, DD = [
	"id",
	"name",
	"onUpdate:modelValue",
	"required",
	"disabled"
], OD = ["for", "innerHTML"], kD = {
	key: 7,
	class: "mt-4"
}, AD = ["innerHTML"], jD = {
	key: 8,
	class: "mt-3 text-center"
}, MD = ["innerHTML"], ND = { class: "mt-4 d-flex justify-content-between" }, PD = ["disabled"], FD = ["disabled"], ID = ["disabled"], LD = {
	key: 0,
	class: "bi bi-person-plus mx-1"
}, RD = {
	key: 1,
	class: "bi bi-arrow-right-square mx-1"
}, zD = { class: "mt-2 text-end" }, BD = ["disabled"], VD = ["id"], HD = { class: "modal-dialog modal-xl" }, UD = { class: "modal-content h-100" };
function WD(o, c, _, y, x, S) {
	let C = d("VuAdminForm");
	return o.auth && o.auth.visible ? (l(), r("div", {
		key: 0,
		class: "vua-auth",
		"data-bs-theme": [o.theme]
	}, [i("div", {
		class: "row d-flex justify-content-center align-items-center min-vh-100",
		onClick: c[16] ||= b((...e) => o.close && o.close(...e), ["stop"])
	}, [i("div", OE, [i("div", {
		class: "card shadow p-4 position-relative",
		onClick: c[15] ||= b(() => {}, ["stop"])
	}, [
		i("div", kE, [o.loading ? (l(), r("i", AE)) : n("", !0), i("button", {
			type: "button",
			class: "btn p-2",
			onClick: c[0] ||= b((...e) => o.close && o.close(...e), ["stop"])
		}, [...c[18] ||= [i("i", { class: "bi bi-x px-1 text-muted" }, null, -1)]])]),
		i("h1", jE, f(o.settings.title[o.auth.panel]), 1),
		i("form", {
			onSubmit: c[13] ||= b((e) => o.handleSubmit(), ["prevent"]),
			onClick: c[14] ||= b(() => {}, ["stop"])
		}, [
			o.auth.panel != "activation" && o.auth.panel != "password" && o.auth.panel != "twofa" ? (l(), r("div", ME, [
				i("label", NE, f(o.settings.username.label), 1),
				i("div", PE, [o.settings.username.icon ? (l(), r("span", {
					key: 0,
					class: s(["input-group-text", { "rounded-bottom-0": o.settings.username.help }])
				}, [i("i", { class: s([o.settings.username.icon]) }, null, 2)], 2)) : n("", !0), v(i("input", {
					id: "email",
					name: "email",
					type: o.settings.username.type,
					"onUpdate:modelValue": c[1] ||= (e) => o.username = e,
					class: s(["form-control", { "rounded-bottom-0": o.settings.username.help }]),
					placeholder: o.settings.username.placeholder,
					required: "",
					disabled: o.loading
				}, null, 10, FE), [[m, o.username]])]),
				o.settings.username.help ? (l(), r("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.settings.username.help
				}, null, 8, IE)) : n("", !0)
			])) : n("", !0),
			o.auth.panel != "forgot" && o.auth.panel != "activation" && o.auth.panel != "twofa" ? (l(), r(e, { key: 1 }, [i("div", LE, [
				o.settings.password.label ? (l(), r("label", RE, f(o.settings.password.label), 1)) : n("", !0),
				i("div", zE, [
					o.settings.password.icon ? (l(), r("span", {
						key: 0,
						class: s(["input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help }])
					}, [i("i", { class: s([o.settings.password.icon]) }, null, 2)], 2)) : n("", !0),
					v(i("input", {
						id: "password",
						name: "password",
						type: o.settings.password.type,
						"onUpdate:modelValue": c[2] ||= (e) => o.password = e,
						class: s(["form-control", { "rounded-bottom-0": o.auth.panel == "registration" && o.settings.password.help }]),
						placeholder: o.settings.password.placeholder,
						pattern: o.settings.password.pattern,
						minlength: o.auth.panel == "registration" ? o.settings.password.minlength : 1,
						required: "",
						disabled: o.loading
					}, null, 10, BE), [[m, o.password]]),
					o.auth.panel == "registration" || o.auth.panel == "password" ? (l(), r("span", {
						key: 1,
						class: s(["input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help }])
					}, [i("small", { class: s(["", {
						"text-success": o.password.length >= o.settings.password.minlength,
						"text-danger": o.password.length < o.settings.password.minlength
					}]) }, f(o.password.length), 3)], 2)) : n("", !0),
					i("span", {
						class: s(["cursor-pointer input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help }]),
						onClick: c[3] ||= b((e) => o.toggleType("password"), ["stop"])
					}, [o.settings.password.type == "password" ? (l(), r("i", VE)) : (l(), r("i", HE))], 2)
				]),
				(o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help ? (l(), r("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.settings.password.help
				}, null, 8, UE)) : n("", !0)
			]), o.auth.panel === "registration" || o.auth.panel === "password" ? (l(), r("div", WE, [
				i("label", GE, [a(f(o.settings.password_again.label) + " ", 1), o.password_again.length > 0 && o.password_again != o.password ? (l(), r("small", {
					key: 0,
					class: "text-danger",
					innerHTML: o.settings.password_again.nomatch
				}, null, 8, KE)) : n("", !0)]),
				i("div", qE, [
					o.settings.password.icon ? (l(), r("span", {
						key: 0,
						class: s(["input-group-text", { "rounded-bottom-0": o.settings.password_again.help }])
					}, [i("i", { class: s([o.settings.password_again.icon]) }, null, 2)], 2)) : n("", !0),
					v(i("input", {
						id: "password_again",
						name: "password_again",
						type: o.settings.password_again.type,
						"onUpdate:modelValue": c[4] ||= (e) => o.password_again = e,
						class: s(["form-control", { "rounded-bottom-0": o.settings.password_again.help }]),
						placeholder: o.settings.password_again.placeholder,
						minlength: o.settings.password.minlength,
						required: "",
						disabled: o.loading
					}, null, 10, JE), [[m, o.password_again]]),
					i("span", { class: s(["input-group-text", { "rounded-bottom-0": o.settings.password_again.help }]) }, [i("small", { class: s(["", {
						"text-success": o.password_again.length >= o.settings.password.minlength,
						"text-danger": o.password_again.length < o.settings.password.minlength
					}]) }, f(o.password_again.length), 3)], 2),
					i("span", {
						class: s(["cursor-pointer input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password_again.help }]),
						onClick: c[5] ||= b((e) => o.toggleType("password_again"), ["stop"])
					}, [o.settings.password_again.type == "password" ? (l(), r("i", YE)) : (l(), r("i", XE))], 2)
				]),
				(o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password_again.help ? (l(), r("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.settings.password_again.help
				}, null, 8, ZE)) : n("", !0)
			])) : n("", !0)], 64)) : n("", !0),
			o.captchaRequired ? (l(), r("div", QE, [o.captcha.loading ? (l(), r("div", $E, [...c[19] ||= [i("span", { class: "spinner-border spinner-border-sm text-secondary" }, null, -1)]])) : o.captcha.items.length ? (l(), r("div", eD, [i("div", {
				class: "text-center small mb-2",
				innerHTML: o.captcha.question
			}, null, 8, tD), i("div", nD, [(l(!0), r(e, null, u(o.captcha.items, (e) => (l(), r("button", {
				key: e.id,
				type: "button",
				class: s(["btn btn-outline-secondary px-2 py-1", { "btn-primary border-primary": o.captcha.answers.includes(e.id) }]),
				onClick: b((t) => {
					o.toggleCaptchaAnswer(e.id), o.captchaError = !1;
				}, ["stop"])
			}, [i("i", {
				class: s(["bi", e.icon]),
				style: {
					"font-size": "1.2rem",
					display: "block"
				}
			}, null, 2)], 10, rD))), 128))])])) : n("", !0)])) : n("", !0),
			o.captchaError ? (l(), r("p", iD, f(o.settings.captcha.error), 1)) : n("", !0),
			o.auth.panel === "twofa" && o.settings.twofa ? (l(), r("div", aD, [
				i("p", {
					class: "text-center small text-muted mb-3",
					innerHTML: o.settings.twofa.info
				}, null, 8, oD),
				i("label", sD, f(o.settings.twofa.label), 1),
				i("div", cD, [c[20] ||= i("span", { class: "input-group-text" }, [i("i", { class: "bi bi-shield-lock" })], -1), v(i("input", {
					type: "text",
					inputmode: "numeric",
					pattern: "[0-9]{6}",
					maxlength: "6",
					"onUpdate:modelValue": c[6] ||= (e) => o.twofaCode = e,
					class: "form-control text-center fw-bold fs-5",
					placeholder: o.settings.twofa.placeholder,
					required: "",
					disabled: o.loading,
					autocomplete: "one-time-code"
				}, null, 8, lD), [[g, o.twofaCode]])]),
				i("div", uD, [i("button", {
					type: "button",
					class: "btn btn-link btn-sm p-0 text-decoration-none",
					onClick: c[7] ||= b((...e) => o.resendTwofa && o.resendTwofa(...e), ["stop"]),
					disabled: o.loading
				}, [c[21] ||= i("i", { class: "bi bi-arrow-repeat me-1" }, null, -1), a(f(o.settings.submit.resend), 1)], 8, dD)])
			])) : n("", !0),
			v(i("input", {
				type: "text",
				name: "vu_b4t",
				tabindex: "-1",
				autocomplete: "new-password",
				"aria-hidden": "true",
				"onUpdate:modelValue": c[8] ||= (e) => o.honeypot = e,
				style: {
					position: "absolute",
					left: "-9999px",
					width: "1px",
					height: "1px",
					opacity: "0"
				}
			}, null, 512), [[g, o.honeypot]]),
			o.auth.panel == "login" && o.settings.password.forgot ? (l(), r("div", fD, [i("button", {
				type: "button",
				class: "btn btn-link p-0 text-decoration-none text-nowrap",
				onClick: c[9] ||= b((...e) => o.toggleForgotPassword && o.toggleForgotPassword(...e), ["stop"]),
				innerHTML: o.settings.password.forgot
			}, null, 8, pD)])) : n("", !0),
			o.auth.panel == "forgot" && o.settings.help && o.settings.help.forgot ? (l(), r("div", mD, [i("small", {
				class: "text-muted",
				innerHTML: o.settings.help.forgot
			}, null, 8, hD)])) : n("", !0),
			i("div", gD, [(l(!0), r(e, null, u(o.settings.inputs, (t, a) => (l(), r(e, { key: a }, [t.panels.indexOf(o.auth.panel) >= 0 && !t.hidden ? (l(), r("div", {
				key: 0,
				class: s([t.colclass ? t.colclass : "col-md-12"])
			}, [i("div", _D, [
				t.label ? (l(), r("label", {
					key: 0,
					for: a,
					class: s(["form-label text-primary", { required: t.required }]),
					innerHTML: o.getValueOrFunction(t.label)
				}, null, 10, vD)) : n("", !0),
				i("div", yD, [
					t.prefix ? (l(), r("span", {
						key: 0,
						class: s(["input-group-text", { "rounded-bottom-0": t.help }]),
						innerHTML: o.getValueOrFunction(t.prefix)
					}, null, 10, bD)) : n("", !0),
					t.type == "select" ? v((l(), r("select", {
						key: 1,
						class: "form-select",
						disabled: o.loading,
						required: t.required,
						"onUpdate:modelValue": (e) => o.inputs[a] = e,
						multiple: t.multiple
					}, [c[22] ||= i("option", null, null, -1), (l(!0), r(e, null, u(t.options, (e) => (l(), r("option", {
						key: e,
						value: e.value,
						innerHTML: o.getValueOrFunction(e.label)
					}, null, 8, SD))), 128))], 8, xD)), [[h, o.inputs[a]]]) : v((l(), r("input", {
						key: 2,
						id: a,
						name: a,
						type: t.type,
						"onUpdate:modelValue": (e) => o.inputs[a] = e,
						class: s(["form-control", { "rounded-bottom-0": t.help }]),
						placeholder: t.placeholder,
						required: t.required,
						disabled: o.loading
					}, null, 10, CD)), [[m, o.inputs[a]]]),
					t.suffix ? (l(), r("span", {
						key: 3,
						class: s(["input-group-text", { "rounded-bottom-0": t.help }]),
						innerHTML: o.getValueOrFunction(t.suffix)
					}, null, 10, wD)) : n("", !0)
				]),
				t.help ? (l(), r("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.getValueOrFunction(t.help)
				}, null, 8, TD)) : n("", !0)
			])], 2)) : n("", !0)], 64))), 128))]),
			(l(!0), r(e, null, u(o.settings.accepts, (e) => (l(), r("div", { key: e }, [e.panels.indexOf(o.auth.panel) >= 0 ? (l(), r("div", ED, [v(i("input", {
				type: "checkbox",
				class: "form-check-input",
				id: "accept_" + e.name,
				name: "accept_" + e.name,
				"onUpdate:modelValue": (t) => o.accepts[e.name] = t,
				required: e.required,
				disabled: o.loading
			}, null, 8, DD), [[p, o.accepts[e.name]]]), e.label ? (l(), r("label", {
				key: 0,
				class: "form-check-label",
				for: "accept_" + e.name,
				innerHTML: o.getValueOrFunction(e.label)
			}, null, 8, OD)) : n("", !0)])) : n("", !0)]))), 128)),
			o.auth.panel == "registration" && o.settings.help && o.settings.help.registration ? (l(), r("div", kD, [i("div", { innerHTML: o.getValueOrFunction(o.settings.help.registration) }, null, 8, AD)])) : n("", !0),
			o.auth.response.message ? (l(), r("div", jD, [i("div", {
				class: s({
					"text-danger": !o.auth.response.ok,
					"text-success": o.auth.response.ok
				}),
				innerHTML: o.auth.response.message
			}, null, 10, MD)])) : n("", !0),
			i("div", ND, [
				o.auth.panel != "login" && o.auth.panel != "activation" ? (l(), r("button", {
					key: 0,
					type: "button",
					onClick: c[10] ||= b((...e) => o.toggleClear && o.toggleClear(...e), ["stop"]),
					class: "btn btn-secondary w-100 me-2 text-nowrap",
					disabled: o.loading
				}, [c[23] ||= i("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1), a(" " + f(o.settings.submit.login), 1)], 8, PD)) : n("", !0),
				o.auth.panel == "login" ? (l(), r("button", {
					key: 1,
					type: "button",
					class: "btn btn-warning w-100 me-2 text-nowrap",
					onClick: c[11] ||= b((...e) => o.toggleNewRegistration && o.toggleNewRegistration(...e), ["stop"]),
					disabled: o.loading
				}, [c[24] ||= i("i", { class: "bi bi-person-plus mx-1" }, null, -1), a(" " + f(o.settings.submit.registration), 1)], 8, FD)) : n("", !0),
				i("button", {
					type: "submit",
					class: s(["btn w-100 text-nowrap", {
						"btn-primary": o.auth.panel != "registration",
						"btn-warning": o.auth.panel == "registration"
					}]),
					disabled: o.loading
				}, [a(f(o.settings.submit[o.auth.panel]) + " ", 1), o.auth.panel == "registration" ? (l(), r("i", LD)) : (l(), r("i", RD))], 10, ID)
			]),
			i("div", zD, [i("button", {
				type: "button",
				onClick: c[12] ||= b((...e) => o.close && o.close(...e), ["stop"]),
				class: "btn btn-light border w-100 me-1",
				disabled: o.loading
			}, [a(f(o.settings.submit.cancel) + " ", 1), c[25] ||= i("i", { class: "bi bi-x-square mx-1" }, null, -1)], 8, BD)])
		], 32)
	])])]), i("div", {
		class: "modal shadow",
		id: o.modalId,
		tabindex: "-1"
	}, [i("div", HD, [i("div", UD, [o.settings.form && o.settings.form.visible && o.settings.form.groups ? (l(), t(C, {
		key: 0,
		modelValue: o.item,
		"onUpdate:modelValue": c[17] ||= (e) => o.item = e,
		formid: o.formId,
		settings: o.settings,
		modalWindow: o.modalWindow,
		auth: o.auth,
		saveItem: o.saveItem,
		deleteItem: o.deleteItem,
		reloadTable: o.reloadTable,
		fetchRelation: o.fetchRelation
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
	])) : n("", !0)])])], 8, VD)], 8, DE)) : n("", !0);
}
var GD = /* @__PURE__ */ Cy(EE, [["render", WD]]);
//#endregion
//#region src/components/VuUserButton.vue
_c();
var KD = {
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
			return yc(e, t, this.settings, this);
		}
	},
	created() {
		window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel]));
	},
	mounted() {}
}, qD = ["data-bs-theme"], JD = {
	key: 0,
	class: "dropdown"
}, YD = ["innerHTML"], XD = {
	class: "dropdown-menu dropdown-menu-end",
	"aria-labelledby": "userDropdown"
}, ZD = ["innerHTML"], QD = ["onClick"], $D = ["onClick", "innerHTML"], eO = {
	key: 1,
	class: "d-inline-block"
}, tO = ["innerHTML"];
function nO(t, a, o, c, d, p) {
	return !t.auth.user && t.panel != "login" || t.panel == "login" ? (l(), r("div", {
		key: 0,
		class: "vua-user-button d-inline-block",
		"data-bs-theme": [t.theme]
	}, [t.auth.user ? (l(), r("div", JD, [i("button", {
		class: s(["dropdown-toggle", [t.settings.class]]),
		type: "button",
		id: "userDropdown",
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [i("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, YD)], 2), i("ul", XD, [(l(!0), r(e, null, u(t.settings.dropdowns, (n) => (l(), r(e, { key: n }, [n.action == "BUTTON_ROLES" ? (l(), r("li", {
		key: 0,
		class: s([[n.class], "d-flex items-align-center"])
	}, [i("span", {
		innerHTML: t.getValueOrFunction(n.label),
		class: "me-2"
	}, null, 8, ZD), (l(!0), r(e, null, u(t.auth.user.roles, (e) => (l(), r("button", {
		key: e,
		onClick: (n) => t.setSelectedRole(e),
		class: s(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": e == t.auth.user.role }])
	}, f(e), 11, QD))), 128))], 2)) : (l(), r("li", {
		key: 1,
		class: s([n.class]),
		onClick: (e) => t.dropdownAction(n),
		innerHTML: t.getValueOrFunction(n.label)
	}, null, 10, $D))], 64))), 128))])])) : (l(), r("div", eO, [i("button", {
		class: s([t.settings.class]),
		type: "button",
		onClick: a[0] ||= (...e) => t.togglePanel && t.togglePanel(...e)
	}, [t.settings.icon ? (l(), r("i", {
		key: 0,
		class: s([t.settings.icon])
	}, null, 2)) : n("", !0), i("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, tO)], 2)]))], 8, qD)) : n("", !0);
}
var rO = /* @__PURE__ */ Cy(KD, [["render", nO]]);
//#endregion
export { wE as VuAdmin, GD as VuAuth, rO as VuUserButton };
